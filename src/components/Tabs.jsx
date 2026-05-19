export default function Tabs({
  tabs = [],
  active = null,
  onChange = () => {},
  size = "medium",
  fullWidth = false,
  style = {},
}) {
  const sizes = {
    small: { fontSize: 12, paddingY: 4 },
    medium: { fontSize: 14, paddingY: 6 },
    large: { fontSize: 16, paddingY: 8 },
  };

  const s = sizes[size] || sizes.medium;

  return (
    <div
      style={{
        display: "flex",
        gap: "22px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "8px",
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const id = tab.id ?? tab.value; // backward compatibility
        const isActive = id === active;

        return (
          <div
            key={id}
            onClick={() => onChange(id)}
            style={{
              cursor: "pointer",
              padding: `${s.paddingY}px 0`,
              fontSize: s.fontSize,
              fontWeight: isActive ? "600" : "500",
              color: isActive ? "var(--red-neon)" : "rgba(255,255,255,0.6)",
              textShadow: isActive
                ? "0 0 6px rgba(255, 46, 46, 0.6)"
                : "none",
              borderBottom: isActive
                ? "2px solid var(--red-neon)"
                : "2px solid transparent",
              transition: "0.25s ease",
              flex: fullWidth ? 1 : "unset",
              textAlign: fullWidth ? "center" : "left",
              position: "relative",
            }}
          >
            {tab.label}

            {/* Neon underline animation */}
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  height: 2,
                  width: "100%",
                  background: "var(--red-neon)",
                  boxShadow: "0 0 8px var(--red-neon)",
                  animation: "tabGlow 0.4s ease",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Animations */}
      <style>
        {`
          @keyframes tabGlow {
            from { opacity: 0; width: 0; }
            to { opacity: 1; width: 100%; }
          }
        `}
      </style>
    </div>
  );
}
