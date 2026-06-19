import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { mainNav, company } from "../data/nav";
import { services, serviceGroups } from "../data/services";
import Icon from "./Icon";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={company.name}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent text-ink">
        <span className="text-lg font-black">P</span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Polished<span className="text-brand-light">Pixels</span>
      </span>
    </Link>
  );
}

function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-40 mt-3 w-[min(960px,92vw)] -translate-x-1/2 rounded-2xl border border-white/10 bg-ink-soft/95 p-6 shadow-2xl backdrop-blur"
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {serviceGroups.map((g) => (
          <div key={g.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-light">
              {g.title}
            </p>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it} className="text-sm text-white/70">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 hover:border-brand hover:text-white"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <Link to="/services" className="text-sm font-semibold text-accent">
          All services →
        </Link>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [loc.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-white/10 bg-ink/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((n) =>
            n.mega ? (
              <div
                key={n.to}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
                <AnimatePresence>{mega && <MegaMenu />}</AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {n.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
            Get a free audit <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 lg:hidden"
          >
            <div className="wrap flex flex-col gap-1 py-4">
              {mainNav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-2">
                Get a free audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
