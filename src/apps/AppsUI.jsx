// Shared building blocks for the Apps section (light theme, per-app accent).

// Squircle app icon with a soft colored glow — the section's signature element.
export function Squircle({ glyph, accent, size = 72, icon = null, className = "" }) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 blur-xl opacity-50"
        style={{ background: accent, borderRadius: size * 0.42 }}
      />
      {icon ? (
        <span
          className="grid h-full w-full place-items-center overflow-hidden"
          style={{ borderRadius: size * 0.28, boxShadow: "0 10px 24px rgba(2,10,40,.14)" }}
        >
          {icon}
        </span>
      ) : (
        <span
          className="grid h-full w-full place-items-center font-bricolage font-extrabold text-white"
          style={{
            background: `linear-gradient(150deg, ${accent}, ${shade(accent, -18)})`,
            borderRadius: size * 0.28,
            fontSize: size * 0.34,
            boxShadow: "inset 0 2px 6px rgba(255,255,255,.35), 0 10px 24px rgba(2,10,40,.14)",
          }}
        >
          {glyph}
        </span>
      )}
    </span>
  );
}

// A phone frame with a gradient "screen" and a label — used for mockups.
export function PhoneMockup({ from, to, label, className = "", floating = false }) {
  return (
    <div
      className={`relative aspect-[9/19] w-full max-w-[240px] rounded-[2rem] border border-black/10 bg-black p-2 shadow-2xl ${
        floating ? "animate-[bob_6s_ease-in-out_infinite]" : ""
      } ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/40" />
      <div
        className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden rounded-[1.6rem]"
        style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,#fff,transparent_45%)]" />
        <span className="mb-8 rounded-full bg-white/85 px-4 py-1.5 text-sm font-semibold text-slate-800 shadow">
          {label}
        </span>
      </div>
    </div>
  );
}

// Custom "Get it on Google Play"–style button. Swap for the official badge
// asset before launch if you want the exact Google branding.
export function PlayButton({ href = "", accent = "#0E1525", comingSoon = false }) {
  const content = (
    <>
      <svg viewBox="0 0 40 44" className="h-6 w-6" aria-hidden>
        <path d="M3 2.5 24 22 3 41.5c-.7-.3-1.2-1-1.2-2V4.5c0-1 .5-1.7 1.2-2Z" fill="#34D399" />
        <path d="M31 15 24 22 3 2.5C3.6 2.2 4.4 2.3 5 2.7L31 15Z" fill="#60A5FA" />
        <path d="M31 29 5 41.3c-.6.4-1.4.5-2 .2L24 22l7 7Z" fill="#F87171" />
        <path d="m31 15 6.5 3.8c1.4.8 1.4 2.6 0 3.4L31 29l-7-7 7-7Z" fill="#FBBF24" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide opacity-70">
          {comingSoon ? "Coming soon on" : "Get it on"}
        </span>
        <span className="block font-bricolage text-base font-bold">Google Play</span>
      </span>
    </>
  );

  const cls =
    "inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5";

  if (comingSoon || !href) {
    return (
      <span className={`${cls} cursor-default opacity-80`} aria-disabled="true">
        {content}
      </span>
    );
  }
  return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

// Faint dotted "pixel-canvas" background — a nod to Polished Pixels.
export function DottedCanvas({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{
        backgroundImage: "radial-gradient(rgba(14,21,37,.06) 1.4px, transparent 1.4px)",
        backgroundSize: "22px 22px",
        maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
      }}
    />
  );
}

// darken/lighten a hex color by percent (-100..100)
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct) / 100;
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  const to = (c) => Math.round((t - c) * p) + c;
  return `#${((1 << 24) + (to(r) << 16) + (to(g) << 8) + to(b)).toString(16).slice(1)}`;
}
