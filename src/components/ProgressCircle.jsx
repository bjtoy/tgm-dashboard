export default function ProgressCircle({
  value = 0,
  size = 70,
  strokeWidth = 6,
  color = "var(--red-neon, #ff2e2e)",
  backgroundColor = "rgba(255,255,255,0.1)",
  showLabel = true,
  style = {},
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.4s ease",
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <div
          style={{
            position: "absolute",
            color: "#fff",
            fontSize: size * 0.22,
            fontWeight: "600",
            textShadow: "0 0 6px rgba(255,255,255,0.6)",
          }}
        >
          {Math.round(value)}%
        </div>
      )}
    </div>
  );
}
