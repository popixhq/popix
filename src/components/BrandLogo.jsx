// Polished Pixels brand mark + lockup.
// Recreated as scalable SVG so it stays razor-sharp everywhere and can be
// tinted for dark or light backgrounds. Swap MARK_PATH / gradients here if you
// later drop in the official vector — every placement updates automatically.

const MARK_PATH =
  "M34 88 V20 C34 14 40 12 48 12 C64 12 72 22 72 33 C72 44 62 52 47 52 H34";

export function LogoMark({ size = 32, tone = "color", className = "" }) {
  const stroke =
    tone === "dark" ? "#3B4A53" : tone === "light" ? "url(#pp-light)" : "url(#pp-color)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Polished Pixels"
    >
      <defs>
        <linearGradient id="pp-color" x1="78" y1="12" x2="24" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93A3AD" />
          <stop offset="1" stopColor="#3A4852" />
        </linearGradient>
        <linearGradient id="pp-light" x1="78" y1="12" x2="24" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C2CCD3" />
        </linearGradient>
      </defs>
      <path
        d={MARK_PATH}
        stroke={stroke}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Full lockup: mark + "Polished Pixels" wordmark.
// tone: "color" (slate, for light bg) | "light" (white, for dark bg) | "dark" (solid slate)
export default function BrandLogo({
  variant = "full",
  tone = "color",
  height = 26,
  suffix = null,
  className = "",
}) {
  const primary = tone === "light" ? "text-white" : "text-[#37454E]";
  const secondary = tone === "light" ? "text-white/55" : "text-[#8A96A0]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={height * 1.2} tone={tone} />
      {variant === "full" && (
        <span className="font-display leading-none" style={{ fontSize: height * 0.72 }}>
          <span className={`font-bold tracking-tight ${primary}`}>Polished</span>
          <span className={`font-semibold ${secondary}`}> Pixels</span>
          {suffix && <span className={secondary}> {suffix}</span>}
        </span>
      )}
    </span>
  );
}
