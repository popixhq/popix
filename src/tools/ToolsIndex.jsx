import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { tools } from "./toolsData";
import { toolLink } from "./toolsBase";
import ToolIcon from "./ToolIcon";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function ToolsIndex() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-8 sm:px-8 sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Free · private · no sign-up
        </span>
        <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Simple tools that run in your browser.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Small, useful utilities from Polished Pixels. Your files never get uploaded —
          everything happens on your device, so it's fast and private.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {tools.map((t) => {
            const live = t.status === "live";
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: `${t.accent}1a`, color: t.accent }}
                  >
                    <ToolIcon name={t.icon} />
                  </span>
                  {!live && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      Soon
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold">{t.name}</h2>
                <p className="mt-1 flex-1 text-sm text-slate-600">{t.desc}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: live ? t.accent : "#94a3b8" }}
                >
                  {live ? "Open tool →" : "Coming soon"}
                </span>
              </>
            );
            const cls =
              "group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all";
            return (
              <motion.div key={t.slug} variants={card}>
                {live ? (
                  <Link to={toolLink(t.slug)} className={`${cls} hover:-translate-y-1 hover:shadow-lg`}>
                    {inner}
                  </Link>
                ) : (
                  <div className={`${cls} cursor-default opacity-70`}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
