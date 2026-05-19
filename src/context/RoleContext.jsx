import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const RoleContext = createContext();

// Provider component
export function RoleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user + roles + permissions from backend
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          setRoles([]);
          setPermissions([]);
          setLoading(false);
          return;
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

    loadUser();
  }, []);

  // Helper: check if user has a specific role
  function hasRole(roleName) {
    return roles.includes(roleName);
  }

  // Helper: check if user has ANY role from a list
  function hasAnyRole(roleList) {
    return roleList.some((r) => roles.includes(r));
  }

  // Helper: check if user has a specific permission
  function hasPermission(permissionName) {
    return permissions.includes(permissionName);
  }

  const value = {
    user,
    roles,
    permissions,
    loading,
    hasRole,
    hasAnyRole,
    hasPermission,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

// Hook for easy access
export function useRoles() {
  return useContext(RoleContext);
}
