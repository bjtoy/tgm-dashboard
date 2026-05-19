import { useState } from "react";

export default function Tooltip({
  text,
  position = "top",
  children,
  style = {},
}) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: "8px",
    },
    bottom: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: "8px",
    },
    left: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginRight: "8px",
    },
    right: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginLeft: "8px",
    },
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
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
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 999,
            pointerEvents: "none",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.15s ease",
            textShadow: "0 0 4px rgba(255, 46, 46, 0.4)",
            ...positions[position],
            ...style,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
