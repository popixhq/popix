import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import Reveal, { stagger, item } from "../components/Reveal";
import CTASection from "../components/CTASection";

const values = [
  { t: "Outcomes over output", d: "We're judged on growth, not how many deliverables we ship." },
  { t: "Clarity over jargon", d: "Plain English, honest reporting, no smoke and mirrors." },
  { t: "Craft in everything", d: "From a headline to a homepage, the details are the work." },
  { t: "Partners, not vendors", d: "We win when you win — so we act like it's our business too." },
];

const timeline = [
  { y: "The start", d: "Founded by a small crew of marketers, designers, and engineers tired of agencies that overpromised." },
  { y: "Growing up", d: "Expanded into a full-service team spanning strategy, creative, media, and product." },
  { y: "Today", d: "A senior, remote-first team partnering with ambitious brands worldwide." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A growth partner that actually sweats the details."
        sub="Polished Pixels is a full-service digital agency built on a simple idea: marketing should be beautiful, measurable, and tied to revenue."
      />

      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="heading mt-4 text-3xl">Built by people who've sat in your chair.</h2>
            <p className="mt-4 text-white/70">
              We started Polished Pixels because too many brands were paying for activity
              instead of outcomes. We bring strategy, creative, media, and engineering
              under one roof so nothing falls through the cracks — and everything points at growth.
            </p>
            <p className="mt-4 text-white/70">
              No bloated retainers, no vanity dashboards. Just a senior team that treats
              your budget like our own and reports the truth, good or bad.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {timeline.map((t, i) => (
                <div key={i} className="card">
                  <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-light">
                    {t.y}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{t.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-soft/40 py-16">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What we value</span>
            <h2 className="heading mt-4 text-3xl">The principles behind the work.</h2>
          </Reveal>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {values.map((v) => (
              <motion.div key={v.t} variants={item} className="card h-full">
                <h3 className="font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-white/60">{v.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-5 rounded-2xl border border-white/10 bg-ink-card p-8 sm:grid-cols-4">
          {[
            { k: "250+", v: "brands served" },
            { k: "40+", v: "team members" },
            { k: "11", v: "industries" },
            { k: "98%", v: "client retention" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <p className="font-display text-3xl font-bold text-brand-light">{s.k}</p>
              <p className="mt-1 text-sm text-white/60">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection title="Let's grow your brand together." />
    </>
  );
}
