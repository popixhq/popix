import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal, { stagger, item } from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { services } from "../data/services";
import { industries } from "../data/industries";
import { caseStudies } from "../data/caseStudies";

const marqueeWords = [
  "Strategy",
  "SEO",
  "Performance Media",
  "Brand Video",
  "Social",
  "Web & Apps",
  "Content",
  "Creative",
  "Analytics",
];

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
        <motion.div
          className="absolute right-10 top-40 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="wrap text-center">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Full-service digital agency
        </motion.span>

        <motion.h1
          className="heading mx-auto mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          We make brands <span className="gradient-text">impossible to scroll past.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Polished Pixels blends strategy, creative, and performance to grow ambitious
          businesses — from SEO and paid media to brand video, social, and web.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link to="/contact" className="btn-primary">
            Get your free audit <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link to="/services" className="btn-ghost">
            Explore services
          </Link>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {[
            { k: "250+", v: "brands grown" },
            { k: "3.4x", v: "avg. ROAS" },
            { k: "12M+", v: "monthly reach" },
            { k: "98%", v: "client retention" },
          ].map((s) => (
            <motion.div key={s.v} variants={item}>
              <p className="font-display text-3xl font-bold text-white">{s.k}</p>
              <p className="text-sm text-white/60">{s.v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="border-y border-white/10 bg-ink-soft/60 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...marqueeWords, ...marqueeWords].map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg text-white/40">
            {w} <span className="text-brand">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <section className="wrap py-24">
      <Reveal>
        <span className="eyebrow">What we do</span>
        <h2 className="heading mt-4 max-w-2xl text-3xl sm:text-4xl">
          One team for every part of your growth.
        </h2>
      </Reveal>

      <motion.div
        className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {services.map((s) => (
          <motion.div key={s.slug} variants={item}>
            <Link
              to={`/services/${s.slug}`}
              className="group block h-full rounded-2xl border border-white/10 bg-ink-card p-6 transition-colors hover:border-brand/60"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-light">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm text-white/60">{s.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Learn more
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Approach() {
  const steps = [
    { n: "01", t: "Listen & audit", d: "We dig into your goals, data, and market before proposing a single tactic." },
    { n: "02", t: "Strategy", d: "A clear plan tied to revenue — not vanity metrics or guesswork." },
    { n: "03", t: "Create & launch", d: "Creative and campaigns built to perform, shipped fast." },
    { n: "04", t: "Measure & scale", d: "We double down on what works and report it in plain English." },
  ];
  return (
    <section className="border-y border-white/10 bg-ink-soft/40 py-24">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">How we work</span>
          <h2 className="heading mt-4 max-w-2xl text-3xl sm:text-4xl">
            A process that turns spend into growth.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="card h-full">
                <span className="font-display text-3xl font-bold text-brand">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = caseStudies.slice(0, 3);
  return (
    <section className="wrap py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="heading mt-4 text-3xl sm:text-4xl">Results we're proud of.</h2>
          </div>
          <Link to="/case-studies" className="btn-ghost">
            All case studies
          </Link>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featured.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              to={`/case-studies/${c.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-card"
            >
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-brand/30 to-accent/20">
                <span className="font-display text-2xl font-bold text-white/90">{c.result}</span>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-brand-light">{c.industry}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{c.client}</h3>
                <p className="mt-2 text-sm text-white/60">{c.summary}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IndustriesStrip() {
  return (
    <section className="border-t border-white/10 py-24">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Industries</span>
          <h2 className="heading mt-4 max-w-2xl text-3xl sm:text-4xl">
            Specialists in the sectors we serve.
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {industries.map((i, idx) => (
            <Reveal key={i.slug} delay={idx * 0.03}>
              <Link
                to={`/industries/${i.slug}`}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-brand hover:text-white"
              >
                {i.name}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesGrid />
      <Approach />
      <FeaturedWork />
      <IndustriesStrip />
      <CTASection />
    </>
  );
}
