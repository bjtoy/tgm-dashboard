export default function Input({
  label = null,
  error = null,
  helper = null,
  type = "text",
  style = {},
  ...props
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          style={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          background: "#0f0f0f",
          border: error
            ? "2px solid var(--red-neon)"
            : "2px solid rgba(255,255,255,0.15)",
          color: "#fff",
          fontSize: "15px",
          outline: "none",
          transition: "0.2s ease",
          ...style,
        }}
        {...props}
      />

      {helper && !error && (
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {helper}
        </div>
      )}

      {error && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--red-neon)",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
