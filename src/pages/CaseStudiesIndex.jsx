import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import { stagger, item } from "../components/Reveal";
import CTASection from "../components/CTASection";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudiesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Growth you can put a number on."
        sub="A selection of the brands we've helped scale across paid, organic, creative, and product."
      />
      <section className="wrap pb-12">
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {caseStudies.map((c) => (
            <motion.div key={c.slug} variants={item}>
              <Link
                to={`/case-studies/${c.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-colors hover:border-brand/60"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand/30 to-accent/20">
                  <span className="font-display text-2xl font-bold text-white/90">{c.result}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-brand-light">{c.industry}</span>
                    <span className="text-white/40">{c.service}</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold">{c.client}</h2>
                  <p className="mt-2 text-sm text-white/60">{c.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <CTASection title="Want results like these?" />
    </>
  );
}
