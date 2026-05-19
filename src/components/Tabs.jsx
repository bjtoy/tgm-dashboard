export default function Tabs({
  tabs = [],
  active = null,
  onChange = () => {},
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "18px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "8px",
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active;

        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{
              cursor: "pointer",
              padding: "6px 0",
              fontSize: "15px",
              fontWeight: isActive ? "600" : "500",
              color: isActive ? "var(--red-neon)" : "rgba(255,255,255,0.6)",
              textShadow: isActive
                ? "0 0 6px rgba(255, 46, 46, 0.6)"
                : "none",
              borderBottom: isActive
                ? "2px solid var(--red-neon)"
                : "2px solid transparent",
              transition: "0.2s ease",
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
