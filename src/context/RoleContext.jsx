import { createContext, useContext, useEffect, useState } from "react";
import { registerAuthHandlers } from "../utils/api.js";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // LOAD USER FROM BACKEND SESSION
  // ================================
  async function loadUser() {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // IMPORTANT: use session cookies
      });

      if (res.status === 401) {
        // Not logged in
        setUser(null);
        setRoles([]);
        setPermissions([]);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();

      setUser(data.user || null);
      setRoles(data.roles || []);
      setPermissions(data.permissions || []);
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
      setRoles([]);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  // ================================
  // HELPERS
  // ================================
  function hasRole(roleName) {
    return roles.includes(roleName);
  }

  function hasAnyRole(roleList) {
    return roleList.some((r) => roles.includes(r));
  }

  function hasPermission(permissionName) {
    return permissions.includes(permissionName);
  }

  // ================================
  // LOGOUT (SESSION-BASED)
  // ================================
  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUser(null);
    setRoles([]);
    setPermissions([]);
    window.location.href = "/login";
  }

  // Register handlers with API helper
  registerAuthHandlers({
    logout,
    refreshUser: loadUser,
  });

  const value = {
    user,
    roles,
    permissions,
    loading,
    hasRole,
    hasAnyRole,
    hasPermission,
    refreshUser: loadUser,
    logout,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {
  return useContext(RoleContext);
}
