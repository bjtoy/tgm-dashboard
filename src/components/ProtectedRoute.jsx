import { Navigate, useLocation } from "react-router-dom";

import { useRoles } from "../context/RoleContext.jsx";

export default function ProtectedRoute({
  roles = null,
  permissions = null,
  children,
}) {

  const location = useLocation();

  const {
    user,
    loading,
    guildId,
    hasAnyRole,
    hasPermission,
  } = useRoles();

  /**
   * ROUTES THAT DO NOT REQUIRE
   * GUILD SELECTION
   */
  const guildOptionalRoutes = [
    "/select-guild",
    "/login",
    "/not-authorized",
  ];

  // =========================
  // WAIT FOR AUTH HYDRATION
  // =========================
  if (loading) {

    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // REQUIRE GUILD
  // =========================
  const requiresGuild =
    !guildOptionalRoutes.includes(
      location.pathname
    );

  if (requiresGuild && !guildId) {

    return (
      <Navigate
        to="/select-guild"
        replace
      />
    );
  }

  // =========================
  // ROLE CHECK
  // =========================
  if (
    roles &&
    !hasAnyRole(roles)
  ) {

    return (
      <Navigate
        to="/not-authorized"
        replace
      />
    );
  }

  // =========================
  // PERMISSION CHECK
  // =========================
  if (
    permissions &&
    !hasPermission(permissions)
  ) {

    return (
      <Navigate
        to="/not-authorized"
        replace
      />
    );
  }

  return children;
}