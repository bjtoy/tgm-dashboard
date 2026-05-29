import React, {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useRoles,
} from "../context/RoleContext.jsx";

import { api } from "../api/api.js";

export default function LoginPage() {

  const navigate = useNavigate();

  const {
    user,
    loading,
    setGuildId,
  } = useRoles();

  // =========================
  // AUTO REDIRECT
  // =========================
  useEffect(() => {

    if (loading) return;

    if (!user) return;

    async function initialise() {

      try {

        const data =
          await api.guilds.list();

        if (
          data?.success &&
          Array.isArray(data.guilds) &&
          data.guilds.length > 0
        ) {

          const firstGuild =
            data.guilds[0];

          localStorage.setItem(
            "guildId",
            firstGuild.id
          );

          setGuildId(firstGuild.id);

          navigate("/member", {
            replace: true,
          });

          return;
        }

        console.error(
          "No guilds available"
        );

      } catch (error) {

        console.error(
          "Guild initialisation failed:",
          error
        );
      }
    }

    initialise();

  }, [
    user,
    loading,
    navigate,
    setGuildId,
  ]);

  // =========================
  // LOGIN
  // =========================
  function handleLogin() {

    window.location.href =
      `${import.meta.env.VITE_API_URL}/api/auth/login`;
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="app-container"
      style={{
        textAlign: "center",
        marginTop: "120px",
      }}
    >

      <h1
        className="header-title"
        style={{
          fontSize: "48px",
        }}
      >
        TGM BOT CONTROL PANEL
      </h1>

      <h2
        className="header-subtitle"
        style={{
          marginTop: "10px",
        }}
      >
        Login Required
      </h2>

      <p
        style={{
          marginTop: "20px",
          color: "var(--text-muted)",
        }}
      >
        Sign in with Discord to access
        your dashboard.
      </p>

      <button
        className="btn"
        style={{
          marginTop: "40px",
          padding: "12px 28px",
        }}
        onClick={handleLogin}
      >
        Login with Discord
      </button>

    </div>
  );
}