import { useRoles } from "../context/RoleContext.jsx";

export default function ModDashboard() {
  const { user, roles } = useRoles();

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Moderator Dashboard
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        Welcome back, {user?.username || "Moderator"}.
      </p>

      <div
        style={{
          display: "inline-block",
          padding: "16px 24px",
          background: "#1e1e1e",
          color: "white",
          borderRadius: "10px",
          fontSize: "16px",
          marginBottom: "30px",
        }}
      >
        <strong>Your Roles:</strong>
        <br />
        {roles.length > 0 ? roles.join(", ") : "No roles assigned"}
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "18px" }}>
          Moderator tools will appear here soon.
        </p>
      </div>
    </div>
  );
}
