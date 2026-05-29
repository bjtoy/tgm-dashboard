import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { registerAuthHandlers } from "../api/api.js";

const RoleContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function RoleProvider({ children }) {

  // =========================
  // AUTH STATE
  // =========================
  const [user, setUser] = useState(undefined);

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // GUILD STATE
  // =========================
  const [guildId, setGuildId] = useState(() => {
    return localStorage.getItem("guildId") || null;
  });

  // =========================
  // LOAD USER
  // =========================
  async function loadUser() {

    try {

      const response = await fetch(
        `${API_URL}/api/auth/me`,
        {
          credentials: "include",
        }
      );

      // NOT LOGGED IN
      if (response.status === 401) {

        setUser(null);
        setRoles([]);
        setPermissions([]);

        return;
      }

      const data = await response.json();

      // SUCCESS
      setUser(data.user || null);

      setRoles(
        Array.isArray(data.roles)
          ? data.roles
          : []
      );

      setPermissions(
        Array.isArray(data.permissions)
          ? data.permissions
          : []
      );

    } catch (error) {

      console.error(
        "Failed loading auth state:",
        error
      );

      setUser(null);

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {

    loadUser();

  }, []);

  // =========================
  // HELPERS
  // =========================
  function hasRole(roleName) {

    return roles.includes(roleName);
  }

  function hasAnyRole(roleList) {

    return roleList.some(
      (role) => roles.includes(role)
    );
  }

  function hasPermission(permission) {

    return permissions.includes(permission);
  }

  // =========================
  // LOGOUT
  // =========================
  async function logout() {

    try {

      await fetch(
        `${API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

    } catch (error) {

      console.error(error);
    }

    setUser(null);

    localStorage.removeItem("guildId");

    window.location.href = "/login";
  }

  // =========================
  // API REGISTRATION
  // =========================
  useEffect(() => {

    registerAuthHandlers({
      logout,
      refreshUser: loadUser,
    });

  }, []);

  return (
    <RoleContext.Provider
      value={{
        user,
        roles,
        permissions,
        guildId,
        setGuildId,
        loading,
        hasRole,
        hasAnyRole,
        hasPermission,
        refreshUser: loadUser,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {

  return useContext(RoleContext);
}