import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CTASection({
  title = "Let's build something worth pressing play on.",
  sub = "Book a free 30-minute strategy call and a no-strings audit of your current marketing.",
  primary = { to: "/contact", label: "Get your free audit" },
  secondary = { to: "/services", label: "Explore services" },
}) {
  return (
    <section className="wrap py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand/20 via-ink-card to-ink-card p-10 sm:p-14">
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative max-w-2xl">
            <h2 className="heading text-3xl sm:text-4xl">{title}</h2>
            <p className="mt-4 text-white/70">{sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={primary.to} className="btn-primary">
                {primary.label} <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to={secondary.to} className="btn-ghost">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
