import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { toolsByCategory } from "./toolsData";
import { symbolFor } from "./MaterialIcon";
import MaterialIcon from "./MaterialIcon";
import BrandLogo from "../components/BrandLogo";

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

function ToolsHeader() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const groups = toolsByCategory();
  const loc = useLocation();
  useEffect(() => { setOpen(false); setMobile(false); }, [loc.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-main shadow-sm">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-8">
          <Link to={toolLink()} className="flex items-center">
            <BrandLogo tone="color" height={30} />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <button className="flex items-center gap-1 py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">
                PDF Tools <MaterialIcon name="expand_more" className="text-[18px]" />
              </button>
              {open && (
                <div className="absolute left-0 top-full z-50 w-[620px] rounded-xl border border-border-subtle bg-surface-main p-5 shadow-xl">
                  <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                    {groups.filter((g) => g.id.includes("PDF")).map((g) => (
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
            <NavLink to={toolLink("invoice-generator")} className="py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">Invoice Gen</NavLink>
            <NavLink to={toolLink("audio-to-text")} className="py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">Transcription</NavLink>
            <Link to="/blogs" className="py-1 text-sm font-semibold uppercase tracking-wide text-on-surface-variant transition-colors hover:text-primary">Resources</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link to={toolLink()} className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:block">All tools</Link>
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
            <Link to="/" className="mt-4 block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-on-primary">Agency site</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ToolsFooter() {
  const groups = toolsByCategory();
  return (
    <footer className="border-t border-border-subtle bg-surface-main pb-12 pt-20">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <BrandLogo tone="color" height={28} />
            <p className="mt-6 max-w-xs text-on-surface-variant">
              Sophisticated, browser-based utilities for creators who value privacy, speed, and clean design.
            </p>
            <div className="mt-8 flex gap-4">
              {[["/", "public"], ["/contact", "mail"], ["/apps", "share"]].map(([to, icon]) => (
                <Link key={icon} to={to} className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface-variant transition-all hover:bg-primary hover:text-on-primary">
                  <MaterialIcon name={icon} className="text-[20px]" />
                </Link>
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
