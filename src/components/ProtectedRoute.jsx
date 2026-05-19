import { Navigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function ProtectedRoute({ roles = null, children }) {
  const { user, loading, hasAnyRole } = useRoles();

  // Still loading user data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are required but user doesn't have them
  if (roles && !hasAnyRole(roles)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // User is allowed
  return children;
}
