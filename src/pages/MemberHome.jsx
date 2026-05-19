import { useRoles } from "../context/RoleContext.jsx";

export default function MemberHome() {
  const { user, roles } = useRoles();

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Member Dashboard</h2>

      <div className="card">
        <h3>Welcome</h3>
        <p style={{ fontSize: "20px", marginBottom: "6px" }}>
          {user?.username || "Member"}
        </p>
        <p style={{ color: "var(--text-muted)" }}>
          Roles: {roles?.length ? roles.join(", ") : "None"}
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Your Rank</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Faction</h3>
          <div className="value">—</div>
        </div>

        <div className="card">
          <h3>Daily Tasks</h3>
          <div className="value">—</div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <button className="btn" style={{ marginRight: "12px" }}>
          View Profile
        </button>
        <button className="btn">Check Messages</button>
      </div>
    </div>
  );
}
