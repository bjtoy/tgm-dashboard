import { useRoles } from "../context/RoleContext.jsx";

export default function AdminDashboard() {
  const { user, roles } = useRoles();

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Admin Control Panel</h2>

      <div className="card">
        <h3>Logged in as</h3>
        <p style={{ fontSize: "20px", marginBottom: "6px" }}>
          {user?.username || "Admin"}
        </p>
        <p style={{ color: "var(--text-muted)" }}>
          Roles: {roles?.length ? roles.join(", ") : "None"}
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Users</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Active Moderators</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Pending Reports</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>System Status</h3>
          <div className="value">OK</div>
        </div>
      </div>

      <div className="card">
        <h3>Admin Actions</h3>

        <button className="btn" style={{ marginRight: "12px" }}>
          Manage Users
        </button>

        <button className="btn" style={{ marginRight: "12px" }}>
          View Logs
        </button>

        <button className="btn">System Settings</button>
      </div>
    </div>
  );
}
