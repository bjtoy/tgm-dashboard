import { NavLink, useNavigate } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function DashboardLayout({ children }) {
  const { user } = useRoles();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  return (
    <>
      {/* Header */}
      <header>
        <h1 className="header-title">The Grand Mafia</h1>
        <h2 className="header-subtitle">Dashboard</h2>
        <p>Welcome back, {user?.username || "Member"}</p>

        {/* Navigation */}
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/moderator"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Moderator
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Admin
          </NavLink>

          <button className="btn" style={{ marginLeft: "auto" }} onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="app-container">{children}</main>
    </>
  );
}
