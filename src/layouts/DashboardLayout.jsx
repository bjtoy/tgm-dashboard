import { NavLink } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

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
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">The Grand Mafia</h1>
          <h2 className="header-subtitle">Dashboard</h2>
        </div>

        <div className="header-center">
          <p className="welcome-text">
            Welcome back, <strong>{user?.username || "Member"}</strong>
          </p>
        </div>

        <div className="header-right">
          <button className="btn logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>

        {/* Guides (everyone can view) */}
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

        {/* Drafts (Mods + Admins) */}
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

        {/* Publish Guide (Mods + Admins) */}
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
          <NavLink
            to="/moderator"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Moderator Tools
          </NavLink>
        )}

        {/* Admin Section */}
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
      </nav>

      {/* Main Content */}
      <main className="app-container">{children}</main>
    </>
  );
}
