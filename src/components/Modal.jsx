import { useEffect } from "react";

export default function Modal({
  open = false,
  onClose = () => {},
  title = null,
  children,
  style = {},
}) {
  // Close on ESC key
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "20px",
          width: "90%",
          maxWidth: "480px",
          boxShadow: "0 0 20px rgba(255, 46, 46, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          ...style,
        }}
      >
        {title && (
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--red-neon)",
              textShadow: "0 0 6px rgba(255, 46, 46, 0.6)",
            }}
          >
            {title}
          </div>
        )}

        <div>{children}</div>

        <button
          onClick={onClose}
          style={{
            marginTop: "8px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.2s ease",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
