import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PageHero from "../components/PageHero";
import { stagger, item } from "../components/Reveal";
import CTASection from "../components/CTASection";

// Placeholder posts, wire to a CMS or markdown later.
const posts = [
  { t: "How to build a performance marketing engine that compounds", cat: "Performance", read: "7 min" },
  { t: "Local SEO in 2026: the map pack playbook", cat: "SEO", read: "6 min" },
  { t: "Why your brand video isn't converting (and how to fix it)", cat: "Video", read: "5 min" },
  { t: "B2B SEO: turning search traffic into pipeline", cat: "SEO", read: "8 min" },
  { t: "The creative tests that actually move ROAS", cat: "Creative", read: "6 min" },
  { t: "A founder's guide to choosing a digital agency", cat: "Strategy", read: "9 min" },
];

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas, playbooks & lessons from the work."
        sub="Practical thinking on growth, creative, and the craft of modern marketing, no fluff."
      />
      <section className="wrap pb-12">
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {posts.map((p, i) => (
            <motion.article key={i} variants={item}>
              <Link
                to="/contact"
                className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-colors hover:border-brand/60"
              >
                <div className="h-36 bg-gradient-to-br from-brand/25 to-accent/15" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-brand-light">{p.cat}</span>
                    <span className="text-white/40">{p.read} read</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug">{p.t}</h2>
                  <span className="mt-3 inline-block text-sm font-semibold text-accent">Read article →</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
      <CTASection title="Want this kind of thinking on your account?" />
    </>
  );
}
