import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { toolsByCategory } from "./toolsData";
import MaterialIcon, { symbolFor } from "./MaterialIcon";
import BrandLogo from "../components/BrandLogo";
import { company } from "../data/nav";

const isPdf = (g) => g.id.includes("PDF");

export default function ToolsLayout() {
  useEffect(() => {
    document.body.classList.add("tools-theme");
    return () => document.body.classList.remove("tools-theme");
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-on-surface">
      <ToolsHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <ToolsFooter />
    </div>
  );
}

function NavDropdown({ label, groups }) {
  const [open, setOpen] = useState(false);
  const cols = Math.min(groups.length, 3);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">
        {label} <MaterialIcon name="expand_more" className="text-[18px]" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 rounded-xl border border-border-subtle bg-surface-main p-5 shadow-xl" style={{ width: cols * 200 }}>
          <div className="grid gap-x-5 gap-y-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
            {groups.map((g) => (
              <div key={g.id}>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{g.label}</p>
                <ul className="mt-2 space-y-1">
                  {g.items.filter((t) => t.status === "live").map((t) => (
                    <li key={t.slug}>
                      <Link to={toolLink(t.slug)} className="flex items-center gap-2 rounded-md px-1 py-0.5 text-sm text-on-surface-variant hover:text-primary">
                        <MaterialIcon name={symbolFor(t.slug)} className="text-[18px] opacity-70" /> {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ToolsHeader() {
  const [mobile, setMobile] = useState(false);
  const groups = toolsByCategory();
  const pdf = groups.filter(isPdf);
  const other = groups.filter((g) => !isPdf(g));
  const loc = useLocation();
  useEffect(() => setMobile(false), [loc.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-main shadow-sm">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-8">
          <Link to={toolLink()} className="flex items-center" aria-label="Polished Pixels Tools">
            <BrandLogo tone="color" height={32} />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavDropdown label="PDF Tools" groups={pdf} />
            <NavDropdown label="Other tools" groups={other} />
            <NavLink to={toolLink()} end className="py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">All tools</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/apps" className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary sm:block">Apps</Link>
          <Link to="/" className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md active:scale-95 sm:block">Agency site</Link>
          <button className="grid h-10 w-10 place-items-center rounded-lg text-primary hover:bg-surface-container-low md:hidden" onClick={() => setMobile((v) => !v)} aria-label="Menu">
            <MaterialIcon name={mobile ? "close" : "menu"} className="text-[24px]" />
          </button>
        </div>
      </div>

      {mobile && (
        <div className="border-t border-border-subtle bg-surface-main md:hidden">
          <div className="max-h-[70vh] overflow-y-auto px-margin-mobile py-4">
            <Link to={toolLink()} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-surface-container-low">All tools</Link>
            {groups.map((g) => (
              <div key={g.id} className="mt-2">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-text-muted">{g.label}</p>
                {g.items.filter((t) => t.status === "live").map((t) => (
                  <Link key={t.slug} to={toolLink(t.slug)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary">
                    <MaterialIcon name={symbolFor(t.slug)} className="text-[18px] opacity-70" /> {t.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link to="/apps" className="mt-4 block rounded-lg border border-border-subtle px-3 py-2.5 text-center text-sm font-semibold text-primary">Apps</Link>
            <Link to="/" className="mt-2 block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-on-primary">Agency site</Link>
          </div>
        </div>
      )}
    </header>
  );
}

const SOCIAL_PATH = {
  Instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM17.8 6.2h.01",
  LinkedIn: "M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.3 8.65 22 11 22 14.1V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z",
  X: "M18.9 2h3.1l-6.77 7.73L23 22h-6.2l-4.86-6.36L6.4 22H3.3l7.24-8.27L2 2h6.36l4.4 5.82zm-1.09 18h1.72L7.28 3.9H5.44z",
  YouTube: "M23 12s0-3.1-.4-4.5a2.5 2.5 0 0 0-1.77-1.77C19.4 5.3 12 5.3 12 5.3s-7.4 0-8.83.43A2.5 2.5 0 0 0 1.4 7.5C1 8.9 1 12 1 12s0 3.1.4 4.5a2.5 2.5 0 0 0 1.77 1.77C4.6 18.7 12 18.7 12 18.7s7.4 0 8.83-.43A2.5 2.5 0 0 0 22.6 16.5C23 15.1 23 12 23 12zM9.75 15.5v-7L15.8 12z",
  YouTube_fill: true,
  Facebook: "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.48-4.1 4.2v2.34H7.7V14h2.74v8z",
};

function SocialIcon({ name }) {
  const filled = ["LinkedIn", "X", "YouTube", "Facebook"].includes(name);
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={SOCIAL_PATH[name]} />
    </svg>
  );
}

function ToolsFooter() {
  const groups = toolsByCategory();
  return (
    <footer className="border-t border-border-subtle bg-surface-main pb-12 pt-20">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to={toolLink()} className="inline-flex" aria-label="Polished Pixels">
              <BrandLogo tone="color" height={40} />
            </Link>
            <p className="mt-6 max-w-xs text-on-surface-variant">
              Sophisticated, browser-based utilities for creators who value privacy, speed, and clean design.
            </p>
            <div className="mt-8 flex gap-3">
              {company.socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface-variant transition-all hover:bg-primary hover:text-on-primary">
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {groups.slice(0, 3).map((g) => (
            <div key={g.id}>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">{g.label}</h4>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {g.items.filter((t) => t.status === "live").slice(0, 5).map((t) => (
                  <li key={t.slug}><Link to={toolLink(t.slug)} className="transition-colors hover:text-primary">{t.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">Company</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              {[["/", "Agency site"], ["/about", "About"], ["/apps", "Apps"], ["/blogs", "Blogs"], ["/contact", "Contact"]].map(([to, label]) => (
                <li key={label}><Link to={to} className="transition-colors hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 md:flex-row">
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} Polished Pixels. Built with privacy as the first priority.</p>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
            <MaterialIcon name="verified" className="text-[16px]" /> On-device processing
          </span>
        </div>
      </div>
    </footer>
  );
}
