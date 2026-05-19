export default function Tag({
  label = "",
  variant = "default",
  onClick = null,
  style = {},
}) {
  const colors = {
    default: "rgba(255,255,255,0.25)",
    success: "var(--green-neon, #00ff78)",
    warning: "var(--yellow-neon, #ffcc00)",
    error: "var(--red-neon, #ff2e2e)",
    info: "var(--blue-neon, #4db8ff)",
  };

  const color = colors[variant] || colors.default;

  return (
    <div
      onClick={onClick || undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        fontSize: "13px",
        borderRadius: "999px",
        border: `1px solid ${color}`,
        color: "#fff",
        background: "rgba(0,0,0,0.6)",
        boxShadow: `0 0 8px ${color}`,
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        transition: "0.2s ease",
        ...style,
      }}
    >
      {label}
    </div>
  );
}
