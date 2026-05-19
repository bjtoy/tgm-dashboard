// =======================================
// FRONTEND API WRAPPER
// Centralized fetch helpers for the dashboard
// =======================================

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Helper for GET requests
async function get(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

// Helper for POST requests
async function post(path, body = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

// =======================================
// API NAMESPACE
// =======================================

export const api = {
  // ============================
  // BOT → MODERATOR ENDPOINTS
  // ============================
  bot: {
    mod: {
      overview: () => get("/bot/mod/overview"),
      activeCases: () => get("/bot/mod/active-cases"),
      warnings: (userId) => get(`/bot/mod/warnings/${userId}`),

      warn: (data) => post("/bot/mod/warn", data),
      kick: (data) => post("/bot/mod/kick", data),
      ban: (data) => post("/bot/mod/ban", data),
    },

    // ============================
    // BOT → ADMIN ENDPOINTS
    // ============================
    admin: {
      status: () => get("/bot/admin/status"),
      guildInfo: () => get("/bot/admin/guild-info"),

      reloadConfig: () => post("/bot/admin/reload-config"),
      syncRoles: () => post("/bot/admin/sync-roles"),
    },

    // ============================
    // BOT → LOGS ENDPOINTS
    // ============================
    logs: {
      recent: () => get("/bot/logs/recent"),
      cases: () => get("/bot/logs/cases"),
    },
  },
};
