export default function Breadcrumbs({
  items = [],
  separator = "/",
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        color: "rgba(255,255,255,0.7)",
        userSelect: "none",
        ...style,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Label */}
            <span
              onClick={item.onClick}
              style={{
                cursor: item.onClick ? "pointer" : "default",
                color: isLast ? "#fff" : "rgba(255,255,255,0.7)",
                textShadow: isLast
                  ? "0 0 6px rgba(255,255,255,0.6)"
                  : "none",
                transition: "0.2s ease",
              }}
            >
              {item.label}
            </span>

            {/* Separator (not after last item) */}
            {!isLast && (
              <span
                style={{
                  opacity: 0.5,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {separator}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
