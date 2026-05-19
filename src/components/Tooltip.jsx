import { useState } from "react";

export default function Tooltip({
  text = "",
  position = "top",
  children,
  style = {},
}) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  };

  const pos = positions[position] || positions.top;

  return (
    <div
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          style={{
            position: "absolute",
            padding: "6px 10px",
            background: "rgba(0,0,0,0.85)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: 12,
            whiteSpace: "nowrap",
            zIndex: 999,
            pointerEvents: "none",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.2s ease",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            ...pos,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
