import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* AUTH FLOW */
import LoginPage from "./pages/LoginPage.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import SelectGuild from "./pages/SelectGuild.jsx";

/* DASHBOARDS */
import MemberHome from "./pages/MemberHome.jsx";
import ModDashboard from "./pages/ModDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

/* ACCESS CONTROL */
import NotAuthorized from "./pages/NotAuthorized.jsx";

/* LAYOUT */
import DashboardLayout from "./layouts/DashboardLayout.jsx";

/* CONTEXT */
import { useRoles } from "./context/RoleContext.jsx";

/* ROLE-BASED ROUTE WRAPPER */
function ProtectedRoute({ children, roles }) {
  const { user, loading } = useRoles();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN FLOW */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/select-guild"
          element={
            <ProtectedRoute>
              <SelectGuild />
            </ProtectedRoute>
          }
        />

        {/* MEMBER DASHBOARD */}
        <Route
          path="/member"
          element={
            <ProtectedRoute roles={["member", "moderator", "admin"]}>
              <DashboardLayout>
                <MemberHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* MODERATOR DASHBOARD */}
        <Route
          path="/moderator"
          element={
            <ProtectedRoute roles={["moderator", "admin"]}>
              <DashboardLayout>
                <ModDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ACCESS DENIED */}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* DEFAULT → LOGIN */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}
