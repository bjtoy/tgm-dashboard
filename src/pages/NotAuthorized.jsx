export default function NotAuthorized() {
  return (
    <div className="app-container" style={{ textAlign: "center", marginTop: "80px" }}>
      <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ color: "var(--red-neon)", marginBottom: "10px" }}>
          Access Denied
        </h2>

        <p style={{ marginBottom: "20px", color: "var(--text-muted)" }}>
          You do not have permission to view this page.
        </p>

        <a href="/" className="btn">
          Return Home
        </a>
      </div>
    </div>
  );
}
