export default function Spinner({
  size = 32,
  color = "var(--red-neon)",
  thickness = 3,
  style = {},
}) {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${thickness}px solid rgba(255,255,255,0.15)`,
    borderTop: `${thickness}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <div style={spinnerStyle} />

      {/* Keyframes injected inline */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
