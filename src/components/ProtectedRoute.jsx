import { Navigate } from "react-router-dom";
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

  // WAIT FOR AUTH HYDRATION
  if (loading || user === undefined) {

    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  // NOT LOGGED IN
  if (user === null) {

    return <Navigate to="/login" replace />;
  }

  // REQUIRE GUILD
  if (!guildId &&
      window.location.pathname !== "/select-guild") {

    return (
      <Navigate
        to="/select-guild"
        replace
      />
    );
  }

  // ROLE CHECK
  if (roles && !hasAnyRole(roles)) {

    return (
      <Navigate
        to="/not-authorized"
        replace
      />
    );
  }

  // PERMISSION CHECK
  if (permissions &&
      !hasPermission(permissions)) {

    return (
      <Navigate
        to="/not-authorized"
        replace
      />
    );
  }

  return children;
}