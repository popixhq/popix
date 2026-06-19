import { motion } from "motion/react";
import Reveal from "./Reveal";

// Reusable inner-page hero with animated gradient backdrop.
export default function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="wrap">
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="heading mt-5 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{title}</h1>
          {sub && <p className="mt-5 max-w-2xl text-lg text-white/70">{sub}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
