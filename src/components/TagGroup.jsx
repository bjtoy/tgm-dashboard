export default function TagGroup({
  tags = [],
  gap = 10,
  wrap = true,
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: gap,
        alignItems: "center",
        ...style,
      }}
    >
      {tags.map((tag, index) => (
        <div key={index}>
          <tag.component
            label={tag.label}
            variant={tag.variant}
            onClick={tag.onClick}
            style={tag.style}
          />
        </div>
      ))}
    </div>
  );
}