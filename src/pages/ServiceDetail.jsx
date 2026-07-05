import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { getService, services } from "../data/services";

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-lg font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-2xl text-brand">
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
            <p className="pb-5 text-white/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) {
    return (
      <div className="wrap pt-40 pb-24 text-center">
        <h1 className="heading text-3xl">Service not found</h1>
        <Link to="/services" className="btn-primary mt-6">
          Back to services
        </Link>
      </div>
    );
  }

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={service.tagline} title={service.name} sub={service.hero}>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Get a free audit <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link to="/services" className="btn-ghost">
            All services
          </Link>
        </div>
      </PageHero>

      {/* Stats */}
      <section className="wrap">
        <div className="grid gap-5 rounded-2xl border border-white/10 bg-ink-card p-8 sm:grid-cols-3">
          {service.stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <p className="font-display text-4xl font-bold text-brand-light">{s.k}</p>
              <p className="mt-1 text-sm text-white/60">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Intro + offerings */}
      <section className="wrap py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-xl leading-relaxed text-white/80">{service.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-xl font-semibold">What's included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <li key={o} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/10 bg-ink-soft/40 py-20">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="heading mt-4 text-3xl sm:text-4xl">Our {service.name.toLowerCase()} process.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="card h-full">
                  <span className="font-display text-2xl font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-white/60">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="wrap py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="heading mt-4 text-3xl">Questions, answered.</h2>
            <p className="mt-4 text-white/60">
              Still curious? <Link to="/contact" className="text-accent">Talk to us</Link>, no pressure, no jargon.
            </p>
          </Reveal>
          <div>
            {service.faqs.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="wrap pb-8">
        <Reveal>
          <h2 className="heading text-2xl">Explore more services</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group rounded-2xl border border-white/10 bg-ink-card p-6 transition-colors hover:border-brand/60"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand/15 text-brand-light">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-white/55">{s.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
