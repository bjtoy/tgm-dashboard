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
    hasAnyRole,
    hasPermission,
    guildId,
  } = useRoles();

  const location = useLocation();

  // Loading user session
  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow select guild page WITHOUT guild selected
  const isGuildSelectionPage =
    location.pathname === "/select-guild";

  // Require guild everywhere else
  if (!guildId && !isGuildSelectionPage) {
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