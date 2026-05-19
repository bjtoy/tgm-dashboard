export default function Chip({
  label = "",
  selected = false,
  onClick = null,
  onRemove = null,
  variant = "default",
  size = "medium",
  style = {},
}) {
  const colors = {
    default: "rgba(255,255,255,0.25)",
    success: "var(--green-neon, #00ff78)",
    warning: "var(--yellow-neon, #ffcc00)",
    error: "var(--red-neon, #ff2e2e)",
    info: "var(--blue-neon, #4db8ff)",
  };

  const sizes = {
    small: { fontSize: 11, padding: "3px 8px" },
    medium: { fontSize: 13, padding: "5px 10px" },
    large: { fontSize: 15, padding: "7px 14px" },
  };

  const color = colors[variant] || colors.default;
  const s = sizes[size] || sizes.medium;

  return (
    <div
      onClick={onClick || undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        padding: s.padding,
        fontSize: s.fontSize,
        background: selected
          ? "rgba(0,0,0,0.6)"
          : "rgba(255,255,255,0.08)",
        border: `1px solid ${
          selected ? color : "rgba(255,255,255,0.25)"
        }`,
        color: "#fff",
        cursor: onClick ? "pointer" : "default",
        boxShadow: selected ? `0 0 8px ${color}` : "none",
        transition: "0.2s ease",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Label */}
      <span>{label}</span>

      {/* Remove button */}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            opacity: 0.8,
            transition: "0.2s ease",
          }}
        >
          ×
        </span>
      )}
    </div>
  );
}
