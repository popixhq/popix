// Minimal inline icon set (stroke-based, currentColor).
const paths = {
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2",
  play: "M8 5v14l11-7z",
  pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  graph: "M4 19V5M4 19h16M8 16v-4M12 16V9M16 16v-7",
  code: "M9 18l-6-6 6-6M15 6l6 6-6 6",
  layout: "M3 4h18v16H3zM3 9h18M9 9v11",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l4 4 10-10",
  star: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z",
};

export default function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}
