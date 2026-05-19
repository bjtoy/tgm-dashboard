import { useRoles } from "../context/RoleContext.jsx";

export default function ModDashboard() {
  const { user, roles } = useRoles();

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Moderator Dashboard</h2>

      <div className="card">
        <h3>Moderator</h3>
        <p style={{ fontSize: "20px", marginBottom: "6px" }}>
          {user?.username || "Moderator"}
        </p>
        <p style={{ color: "var(--text-muted)" }}>
          Roles: {roles?.length ? roles.join(", ") : "None"}
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Reports Today</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Active Cases</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Warnings Issued</h3>
          <div className="value">—</div>
        </div>
      </div>

      <div className="card">
        <h3>Moderator Tools</h3>

        <button className="btn" style={{ marginRight: "12px" }}>
          Review Reports
        </button>

        <button className="btn" style={{ marginRight: "12px" }}>
          Manage Users
        </button>

        <button className="btn">Issue Warning</button>
      </div>
    </div>
  );
}
