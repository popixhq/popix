import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import Reveal, { stagger, item } from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { services, serviceGroups } from "../data/services";

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to grow, under one roof."
        sub="Strategy, creative, media, and engineering — integrated so your marketing actually compounds instead of working against itself."
      />

      <section className="wrap pb-8">
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((s) => (
            <motion.div key={s.slug} variants={item}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-card p-7 transition-colors hover:border-brand/60"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-light">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm text-white/60">{s.hero}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Explore service
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="wrap py-20">
        <Reveal>
          <span className="eyebrow">Full capability list</span>
          <h2 className="heading mt-4 text-3xl sm:text-4xl">Every lever we can pull for you.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="card h-full">
                <h3 className="font-display text-lg font-semibold text-brand-light">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-white/70">
                      <Icon name="check" className="mt-0.5 h-4 w-4 text-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
