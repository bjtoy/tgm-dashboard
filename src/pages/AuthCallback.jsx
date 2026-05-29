import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { refreshUser } = useRoles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function finishLogin() {
      try {
        // Give Safari time to persist cookies
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await refreshUser();

        if (!mounted) return;

        setLoading(false);

        // Redirect AFTER state hydration
        navigate("/select-guild", {
          replace: true,
        });

      } catch (error) {
        console.error("OAuth callback failed:", error);

        if (!mounted) return;

        navigate("/login", {
          replace: true,
        });
      }
    }

    finishLogin();

    return () => {
      mounted = false;
    };
  }, [navigate, refreshUser]);

  return (
    <div
      className="loading-screen"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
      }}
    >
      Finalising Discord login...
    </div>
  );
}