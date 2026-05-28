import { Link, useLocation } from "react-router-dom";
import { useRoles } from "../context/RoleContext.jsx";

export default function Sidebar() {
  const { user } = useRoles();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">UnderbossHQ</h2>
      </div>

      <nav className="sidebar-nav">

        {/* MEMBER */}
        <Link
          to="/member"
          className={`sidebar-link ${isActive("/member") ? "active" : ""}`}
        >
          Member Dashboard
        </Link>

        {/* MODERATOR */}
        {(user?.role === "moderator" || user?.role === "admin") && (
          <Link
            to="/moderator"
            className={`sidebar-link ${isActive("/moderator") ? "active" : ""}`}
          >
            Moderator Tools
          </Link>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className={`sidebar-link ${isActive("/admin") ? "active" : ""}`}
          >
            Admin Panel
          </Link>
        )}

      </nav>
    </aside>
  );
}
