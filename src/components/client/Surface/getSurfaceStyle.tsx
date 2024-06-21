export function getSurfaceStyle(): React.CSSProperties {
  return {
    background:
      "linear-gradient(132deg, rgb(from var(--accent-2) r g b / 40%) 15%, rgb(from var(--accent-1) r g b / 60%))",
    boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(5px)",
  };
}
