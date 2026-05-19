export default function SectionTitle({
  children,
  subtitle = null,
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: subtitle ? "4px" : "0px",
        marginBottom: "16px",
        ...style,
      }}
    >
      <h2
        style={{
          margin: 0,
          padding: 0,
          fontSize: "20px",
          fontWeight: "600",
          color: "var(--red-neon)",
          textShadow: "0 0 6px rgba(255, 46, 46, 0.6)",
        }}
      >
        {children}
      </h2>

      {subtitle && (
        <div
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
