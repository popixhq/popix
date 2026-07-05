import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { apps, appCategories } from "./appsData";
import { Squircle, DottedCanvas } from "./AppsUI";
import { appLink } from "./appBase";
import { appIcons } from "./appIcons";

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <DottedCanvas />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Made by Polished Pixels
          </span>
          <h1 className="mt-5 font-bricolage text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Small apps,
            <br />
            <span className="text-slate-400">seriously</span> polished.
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-600">
            A little studio of Android apps built to be fast, private, and a pleasure to
            use. No clutter, no dark patterns — just tools and games worth keeping.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#gallery" className="rounded-2xl bg-[#0E1525] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              Browse the apps
            </a>
            <span className="text-sm text-slate-500">
              {apps.length} app{apps.length === 1 ? "" : "s"} and counting
            </span>
          </div>
        </div>

        {/* Floating squircle cluster */}
        <div className="relative mx-auto grid h-72 w-full max-w-sm place-items-center">
          {apps.slice(0, 3).map((a, i) => {
            const pos = [
              "left-2 top-6",
              "right-4 top-16",
              "bottom-2 left-1/3",
            ][i];
            return (
              <motion.div
                key={a.slug}
                className={`absolute ${pos}`}
                animate={reduce ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <Link to={appLink(a.slug)} aria-label={a.name}>
                  <Squircle glyph={a.glyph} icon={appIcons[a.slug]} accent={a.accent} size={i === 1 ? 108 : 84} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AppCard({ app }) {
  return (
    <Link
      to={appLink(app.slug)}
      className="group relative flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <Squircle glyph={app.glyph} icon={appIcons[app.slug]} accent={app.accent} size={60} />
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: app.accentSoft, color: app.accent }}
        >
          {app.status === "live" ? "Live" : "Coming soon"}
        </span>
      </div>
      <h3 className="mt-5 font-bricolage text-xl font-bold">{app.name}</h3>
      <p className="mt-1 text-sm font-medium text-slate-500">{app.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-slate-600">{app.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-sm">
        <span className="font-medium text-slate-500">{app.category}</span>
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: app.accent }}>
          View app
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function AppsIndex() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? apps : apps.filter((a) => a.category === filter);

  return (
    <>
      <Hero />

      <section id="gallery" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-8">
          {["All", ...appCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "bg-[#0E1525] text-white"
                  : "border border-black/10 bg-white text-slate-600 hover:text-slate-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </>
  );
}
