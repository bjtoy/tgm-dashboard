import { Navigate, useLocation } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function ProtectedRoute({
  roles = null,
  permissions = null,
  children,
}) {
  const {
    user,
    loading,
    guildId,
    hasAnyRole,
    hasPermission,
  } = useRoles();

  const location = useLocation();

  // Wait until auth fully loads
  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow guild selection page
  if (location.pathname === "/select-guild") {
    return children;
  }

  // Require guild everywhere else
  if (!guildId) {
    return <Navigate to="/select-guild" replace />;
  }

  // Role protection
  if (roles && !hasAnyRole(roles)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Permission protection
  if (permissions && !hasPermission(permissions)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}