import {
  Navigate,
} from "react-router-dom";

import {
  useRoles,
} from "../context/RoleContext.jsx";

export default function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useRoles();

  /**
   * WAIT FOR AUTH
   */
  if (loading) {

    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  /**
   * NOT LOGGED IN
   */
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /**
   * ALLOW ACCESS
   */
  return children;
}