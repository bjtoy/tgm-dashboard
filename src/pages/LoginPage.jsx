export default function LoginPage() {
  return (
    <div className="app-container" style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 className="header-title" style={{ fontSize: "48px" }}>The Grand Mafia</h1>
      <h2 className="header-subtitle" style={{ fontSize: "28px", marginBottom: "30px" }}>
        Dashboard Login
      </h2>

      <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h3>Login Required</h3>
        <p style={{ marginBottom: "20px", color: "var(--text-muted)" }}>
          Please log in using your Discord account.
        </p>

        <a href="/api/auth/login" className="btn">
          Login with Discord
        </a>
      </div>
    </div>
  );
}
