// ===============================
// Grand Mafia Dashboard API Helper
// ===============================
//
// Handles:
// - GET + POST requests
// - Sends cookies (session)
// - Auto-redirect on 401/403
// - Global error handling
// - Clean, reusable API calls
//

const API_BASE = "/api";

async function request(method, endpoint, body = null) {
  const options = {
    method,
    credentials: "include", // send session cookies
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  // Auto-handle auth errors
  if (res.status === 401) {
    window.location.href = "/login";
    return;
  }

  if (res.status === 403) {
    window.location.href = "/not-authorized";
    return;
  }

  // Parse JSON safely
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.error || "API request failed");
  }

  return data;
}

export const api = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, body) => request("POST", endpoint, body),
};
