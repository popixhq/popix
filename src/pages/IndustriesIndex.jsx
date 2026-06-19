import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import { stagger, item } from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { industries } from "../data/industries";

export default function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Marketing that speaks your industry's language."
        sub="We've grown brands across a dozen sectors. That means less time explaining your business and more time growing it."
      />
      <section className="wrap pb-12">
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {industries.map((ind) => (
            <motion.div key={ind.slug} variants={item}>
              <Link
                to={`/industries/${ind.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-card p-6 transition-colors hover:border-brand/60"
              >
                <h2 className="font-display text-lg font-semibold">{ind.name}</h2>
                <p className="mt-2 flex-1 text-sm text-white/60">{ind.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  View industry
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <CTASection />
    </>
  );
}
