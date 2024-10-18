export function Patreon(props: { width?: number; height?: number }) {
  const { width = 18, height = 18 } = props;
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      fill="currentColor"
      width={width || "18"}
      height={height || "18"}
      y="0px"
      viewBox="0 0 1080 1080"
      style={
        {
          // enableBackground: "new 0 0 1080 1080",
        }
      }
      xmlSpace="preserve"
    >
      <path
        d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2
    C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33
    c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"
      ></path>
    </svg>
  );
}
