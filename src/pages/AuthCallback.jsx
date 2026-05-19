import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { refreshUser } = useRoles();

  useEffect(() => {
    async function processLogin() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        // No OAuth code → redirect to login
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Exchange code for session cookie
        const res = await fetch("/api/auth/callback", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          navigate("/login", { replace: true });
          return;
        }

        // Refresh user data from backend
        await refreshUser();

        // Redirect to dashboard
        navigate("/", { replace: true });
      } catch (err) {
        console.error("OAuth callback error:", err);
        navigate("/login", { replace: true });
      }
    }

    processLogin();
  }, [navigate, refreshUser]);

  return (
    <div
      className="app-container"
      style={{ textAlign: "center", marginTop: "80px" }}
    >
      <h1 className="header-title" style={{ fontSize: "42px" }}>
        Processing Login…
      </h1>

      <p style={{ marginTop: "20px", color: "var(--text-muted)" }}>
        Please wait while we complete your authentication.
      </p>
    </div>
  );
}
