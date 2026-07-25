// Distinct line icons per tool. Each entry is an array of SVG path `d` strings.
const icons = {
  lock: [
    "M7 11V8a5 5 0 0 1 10 0v3",
    "M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z",
  ],
  image: [
    "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
    "M3 16l5-5 4 4 3-3 6 6",
    "M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  ],
  compress: [
    "M4 9h4V5", "M20 9h-4V5", "M4 15h4v4", "M20 15h-4v4",
    "M8 9L4 5", "M16 9l4-4", "M8 15l-4 4", "M16 15l4 4",
  ],
  merge: [
    "M4 5h7v6H4z", "M13 13h7v6h-7z", "M11 8h5a2 2 0 0 1 2 2v3",
  ],
  split: [
    "M8 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3", "M16 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3", "M12 3v18",
  ],
  invoice: [
    "M6 3h9l3 3v15l-2-1-2 1-2-1-2 1-2-1-2 1V4a1 1 0 0 1 1-1z",
    "M9 8h6", "M9 12h6", "M9 16h4",
  ],
  sheet: [
    "M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
    "M4 9h16", "M4 15h16", "M10 3v18",
  ],
  table: [
    "M4 5h16v14H4z", "M4 10h16", "M4 15h16", "M9 5v14", "M15 5v14",
  ],
  wave: ["M4 12h2M8 8v8M12 4v16M16 8v8M18 12h2"],
  play: ["M8 5v14l11-7z"],
  file: ["M6 2h9l3 3v17H6z", "M15 2v4h4"],
  wand: ["M15 4V2M15 10v-2M11 6H9M21 6h-2", "M4 20l9-9", "M13 7l4 4"],
  flatten: ["M12 3l8 4-8 4-8-4 8-4z", "M4 12l8 4 8-4", "M4 16.5l8 4 8-4"],
  txt: ["M6 2h9l3 3v17H6z", "M15 2v4h4", "M9 12h6", "M9 16h6"],
  html: ["M6 2h9l3 3v17H6z", "M15 2v4h4", "M10 12l-2 2 2 2", "M14 12l2 2-2 2"],
  zip: ["M4 4h6l2 2h8v14H4z", "M12 10v1M12 13v1M12 16v1"],
  word: ["M6 2h9l3 3v17H6z", "M15 2v4h4", "M8.5 12l1 5 1.5-4 1.5 4 1-5"],
  ppt: ["M6 2h9l3 3v17H6z", "M15 2v4h4", "M9 11h5a2 2 0 0 1 0 4H9zM9 15v3"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z", "M9 12l2 2 4-4"],
  stamp: ["M9 3h6v5l2 4H7l2-4z", "M5 16h14v3H5z", "M12 12v4"],
  sign: ["M3 19c3 0 3-10 6-10s3 8 6 6", "M4 21h16"],
};

export default function ToolIcon({ name, className = "h-6 w-6" }) {
  const d = icons[name] || icons.file;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
