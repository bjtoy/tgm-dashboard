import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();

  const {
    refreshUser,
    setGuildId,
  } = useRoles();

  useEffect(() => {
    let isMounted = true;

    async function finishLogin() {
      try {
        // Clear previous guild selection
        localStorage.removeItem("guildId");
        setGuildId(null);

        // Refresh authenticated user
        await refreshUser();

        if (!isMounted) return;

        // ALWAYS go to guild selector
        navigate("/select-guild", {
          replace: true,
        });

      } catch (error) {
        console.error(
          "Login finalisation failed:",
          error
        );

        if (!isMounted) return;

        navigate("/login", {
          replace: true,
        });
      }
    }

    finishLogin();

    return () => {
      isMounted = false;
    };
  }, [navigate, refreshUser, setGuildId]);

  return (
    <div
      className="app-container"
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1
        className="header-title"
        style={{
          fontSize: "42px",
        }}
      >
        Signing you in...
      </h1>

      <p
        style={{
          marginTop: "20px",
          color: "var(--text-muted)",
        }}
      >
        Please wait while we load your dashboard.
      </p>
    </div>
  );
}