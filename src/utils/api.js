import { getRoles } from "../utils/roles.js";
import { toastError } from "./toastHelper.js";

const API_BASE = "/api";

function hasRequiredRole(requiredRoles) {
  const userRoles = getRoles();
  if (!requiredRoles || requiredRoles.length === 0) return true;
  return requiredRoles.some((role) => userRoles.includes(role));
}

async function request(method, endpoint, body = null, requiredRoles = null) {
  if (!hasRequiredRole(requiredRoles)) {
    window.location.href = "/not-authorized";
    return;
  }

  const options = {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (res.status === 401) {
    window.location.href = "/login";
    return;
  }

  if (res.status === 403) {
    window.location.href = "/not-authorized";
    return;
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    toastError(data?.error || "API request failed");
    throw new Error(data?.error || "API request failed");
  }

  return data;
}

export const api = {
  get: (endpoint, roles = null) => request("GET", endpoint, null, roles),
  post: (endpoint, body, roles = null) =>
    request("POST", endpoint, body, roles),
};
