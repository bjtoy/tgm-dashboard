import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function LoginPage() {
  const { user, loading } = useRoles();
  const navigate = useNavigate();

  // If already logged in, redirect to home
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Login</h1>
      <p>Login with Discord to access the dashboard</p>

      <a
        href="/api/auth/login"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "#5865F2",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        Login with Discord
      </a>
    </div>
  );
}
