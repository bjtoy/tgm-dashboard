import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Access Denied
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        You do not have permission to view this page.
      </p>

      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#5865F2",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
