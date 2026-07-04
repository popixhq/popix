import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { getApp, apps } from "./appsData";
import { Squircle, PhoneMockup, PlayButton, DottedCanvas } from "./AppsUI";
import { appLink } from "./appBase";
import Reveal from "../components/Reveal";

function Faq({ q, a, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-bricolage text-lg font-semibold">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-2xl" style={{ color: accent }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppLanding() {
  const { slug } = useParams();
  const app = getApp(slug);

  if (!app) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:px-8">
        <h1 className="font-bricolage text-3xl font-bold">App not found</h1>
        <Link to={appLink()} className="mt-6 inline-block rounded-2xl bg-[#0E1525] px-6 py-3 text-sm font-semibold text-white">
          Back to all apps
        </Link>
      </div>
    );
  }

  const others = apps.filter((a) => a.slug !== slug).slice(0, 3);
  const live = app.status === "live";

  return (
    <>
      {/* Hero — tinted with the app's accent */}
      <section className="relative overflow-hidden" style={{ background: app.accentSoft }}>
        <DottedCanvas />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <Link to={appLink()} className="text-sm font-medium text-slate-500 hover:text-slate-900">
              ← All apps
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <Squircle glyph={app.glyph} accent={app.accent} size={76} />
              <div>
                <h1 className="font-bricolage text-4xl font-extrabold leading-none">{app.name}</h1>
                <p className="mt-1 font-medium text-slate-600">{app.category}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-lg text-slate-700">{app.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PlayButton href={app.playUrl} comingSoon={!live} accent={app.accent} />
              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">{app.rating}</span> rating
                <span className="px-2 text-slate-300">·</span>
                <span className="font-bold text-slate-900">{app.installs}</span> installs
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Android 10+ · Free to download</p>
          </div>

          <div className="flex justify-center gap-4">
            <PhoneMockup {...app.screens[0]} floating />
            {app.screens[1] && (
              <PhoneMockup {...app.screens[1]} className="mt-10 hidden sm:block" />
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-5 rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:grid-cols-3">
          {app.highlights.map((h, i) => (
            <Reveal key={h.v} delay={i * 0.08}>
              <p className="font-bricolage text-4xl font-extrabold" style={{ color: app.accent }}>
                {h.k}
              </p>
              <p className="mt-1 text-sm text-slate-600">{h.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
        <Reveal>
          <h2 className="font-bricolage text-3xl font-bold">Why you'll like it</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {app.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span
                  className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-lg font-bold"
                  style={{ background: app.accentSoft, color: app.accent }}
                >
                  ✓
                </span>
                <div>
                  <h3 className="font-bricolage text-lg font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Screens */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <h2 className="font-bricolage text-3xl font-bold">Take a look</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap justify-center gap-6 sm:justify-start">
          {app.screens.map((s) => (
            <PhoneMockup key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-bricolage text-3xl font-bold">Good to know</h2>
            <p className="mt-3 text-slate-600">Quick answers before you install.</p>
          </Reveal>
          <div>
            {app.faqs.map((f) => (
              <Faq key={f.q} {...f} accent={app.accent} />
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 text-center"
          style={{ background: `linear-gradient(140deg, ${app.accent}, ${app.accentSoft})` }}
        >
          <h2 className="font-bricolage text-3xl font-extrabold text-white sm:text-4xl">
            {live ? `Get ${app.name} today` : `${app.name} is almost here`}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            {live
              ? "Free to download, private by design, and built to last."
              : "Launching soon on Google Play. Check back shortly."}
          </p>
          <div className="mt-7 flex justify-center">
            <PlayButton href={app.playUrl} comingSoon={!live} accent={app.accent} />
          </div>
        </div>
      </section>

      {/* Other apps */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <h2 className="font-bricolage text-2xl font-bold">More from Polished Pixels</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {others.map((a) => (
            <Link
              key={a.slug}
              to={appLink(a.slug)}
              className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Squircle glyph={a.glyph} accent={a.accent} size={52} />
              <div>
                <h3 className="font-bricolage font-bold">{a.name}</h3>
                <p className="text-sm text-slate-500">{a.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
