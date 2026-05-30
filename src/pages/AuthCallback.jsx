import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();

  const {
    user,
    loading,
  } = useRoles();

  useEffect(() => {
    if (loading) return;

    if (user) {
      navigate("/member", {
        replace: true,
      });
      return;
    }

    navigate("/login", {
      replace: true,
    });
  }, [
    user,
    loading,
    navigate,
  ]);

  return (
    <div className="loading-screen">
      Finalising login...
    </div>
  );
}