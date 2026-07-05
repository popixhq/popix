// Polished Pixels brand logo — uses the real artwork (public/brand/*),
// generated from the official file. "light" tone = white version for dark
// backgrounds; "color" = original slate for light backgrounds.

const ASSETS = {
  full: { color: "/brand/logo-h-color.png", light: "/brand/logo-h-white.png" },
  mark: { color: "/brand/logo-mark.png", light: "/brand/logo-mark-white.png" },
};

export function LogoMark({ size = 32, tone = "color", className = "" }) {
  const src = tone === "light" ? ASSETS.mark.light : ASSETS.mark.color;
  return (
    <img
      src={src}
      alt="Polished Pixels"
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}

export default function BrandLogo({
  variant = "full",
  tone = "color",
  height = 26,
  suffix = null,
  className = "",
}) {
  const key = tone === "light" ? "light" : "color";
  const src = variant === "mark" ? ASSETS.mark[key] : ASSETS.full[key];
  const suffixColor = tone === "light" ? "text-white/50" : "text-slate-400";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={src} alt="Polished Pixels" style={{ height, width: "auto", display: "block" }} />
      {suffix && (
        <span className={`font-display font-semibold ${suffixColor}`} style={{ fontSize: height * 0.5 }}>
          {suffix}
        </span>
      )}
    </span>
  );
}
