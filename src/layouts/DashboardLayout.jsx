import { NavLink } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";
import mascot from "../assets/images/redthornelogo1.png";

export default function DashboardLayout({ children }) {
  const { user, roles, loading, logout } = useRoles();

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading your dashboard…</h2>
      </div>
    );
  }

  const isMod = roles.includes("Moderator") || roles.includes("Admin");
  const isAdmin = roles.includes("Admin");

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">TGM BOT CONTROL PANEL</h1>
          <h2 className="header-subtitle">Dashboard</h2>
          <p className="welcome-text">
            Welcome back, <strong>{user?.username || "Member"}</strong>
          </p>
        </div>

        {/* HERO MASCOT */}
        <div className="header-art">
          <img src={mascot} alt="Mascot" className="mascot-img" />
        </div>
      </header>

      {/* SIDEBAR */}
      <nav className="sidebar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>

        {/* Guides (everyone) */}
        <NavLink
          to="/guides"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Guides
        </NavLink>

        {/* Create Guide (Mods + Admins) */}
        {isMod && (
          <NavLink
            to="/guides/create"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Create Guide
          </NavLink>
        )}

        {/* Drafts */}
        {isMod && (
          <NavLink
            to="/guides/drafts"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Drafts
          </NavLink>
        )}

        {/* Publish Guide */}
        {isMod && (
          <NavLink
            to="/guides/publish"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Publish Guide
          </NavLink>
        )}

        {/* Moderator Tools */}
        {isMod && (
          <>
            <div className="sidebar-section-label">Moderator</div>
            <NavLink
              to="/moderator"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Moderation Tools
            </NavLink>
          </>
        )}

        {/* Admin Tools */}
        {isAdmin && (
          <>
            <div className="sidebar-section-label">Admin</div>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Admin Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              User Management
            </NavLink>

            <NavLink
              to="/admin/roles"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Role Management
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Guide Categories
            </NavLink>

            <NavLink
              to="/admin/logs"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              System Logs
            </NavLink>
          </>
        )}

        {/* Logout */}
        <button className="btn logout-btn" onClick={logout}>
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="app-container">{children}</main>
    </>
  );
}
