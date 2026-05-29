import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/**
 * AUTH
 */
import LoginPage from "./pages/LoginPage.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";

/**
 * DASHBOARDS
 */
import MemberHome from "./pages/MemberHome.jsx";
import ModDashboard from "./pages/ModDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

/**
 * ACCESS
 */
import NotAuthorized from "./pages/NotAuthorized.jsx";

/**
 * LAYOUT
 */
import DashboardLayout from "./layouts/DashboardLayout.jsx";

/**
 * PROTECTION
 */
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {

  return (
    <Router>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* CALLBACK */}
        <Route
          path="/auth/callback"
          element={<AuthCallback />}
        />

        {/* MEMBER */}
        <Route
          path="/member"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MemberHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* MODERATOR */}
        <Route
          path="/moderator"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ModDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ACCESS DENIED */}
        <Route
          path="/not-authorized"
          element={
            <NotAuthorized />
          }
        />

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            <Navigate
              to="/member"
              replace
            />
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </Router>
  );
}