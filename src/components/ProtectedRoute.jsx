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

  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    !guildId &&
    location.pathname !== "/select-guild"
  ) {
    return <Navigate to="/select-guild" replace />;
  }

  if (roles && !hasAnyRole(roles)) {
    return <Navigate to="/not-authorized" replace />;
  }

  if (
    permissions &&
    !permissions.some((p) => hasPermission(p))
  ) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
