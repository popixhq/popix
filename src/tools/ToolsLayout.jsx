import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { tools, toolsByCategory } from "./toolsData";
import BrandLogo from "../components/BrandLogo";
import ToolIcon from "./ToolIcon";

export default function ToolsLayout() {
  useEffect(() => {
    document.body.classList.add("tools-theme");
    return () => document.body.classList.remove("tools-theme");
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-body text-[#101828]">
      <ToolsHeader />
      <Outlet />
      <ToolsFooter />
    </div>
  );
}

function ToolsHeader() {
  const [open, setOpen] = useState(false);
  const groups = toolsByCategory();
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F7F8FA]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link to={toolLink()} className="flex items-center">
          <BrandLogo tone="color" height={24} suffix="/ Tools" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <div className="relative hidden sm:block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className="rounded-lg px-3 py-2 font-medium text-slate-500 hover:text-slate-900">Categories</button>
            {open && (
              <div className="absolute right-0 top-full z-50 mt-1 w-[640px] rounded-2xl border border-black/5 bg-white p-5 shadow-xl">
                <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                  {groups.map((g) => (
                    <div key={g.id}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{g.label}</p>
                      <ul className="mt-2 space-y-1">
                        {g.items.map((t) => (
                          <li key={t.slug}>
                            {t.status === "live" ? (
                              <Link to={toolLink(t.slug)} className="flex items-center gap-2 rounded-md px-1 py-0.5 text-sm text-slate-600 hover:text-slate-900">
                                <ToolIcon name={t.icon} className="h-4 w-4 opacity-70" /> {t.name}
                              </Link>
                            ) : (
                              <span className="flex items-center gap-2 px-1 py-0.5 text-sm text-slate-300">
                                <ToolIcon name={t.icon} className="h-4 w-4 opacity-40" /> {t.name}
                                <span className="text-[10px] font-semibold">SOON</span>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink
            to={toolLink()}
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 font-medium transition-colors ${
                isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`
            }
          >
            All tools
          </NavLink>
          <Link to="/" className="rounded-lg px-3 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900">
            popixhq.com
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ToolsFooter() {
  const cols = toolsByCategory()
    .map((g) => ({ title: g.label, items: g.items.filter((t) => t.status === "live") }))
    .filter((c) => c.items.length);
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.items.map((t) => (
                  <li key={t.slug}>
                    <Link to={toolLink(t.slug)} className="text-sm text-slate-600 hover:text-slate-900">{t.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Polished Pixels</p>
            <ul className="mt-3 space-y-2">
              {[["/", "Agency site"], ["/apps", "Apps"], ["/services", "Services"], ["/blogs", "Blogs"], ["/contact", "Contact"]].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-slate-600 hover:text-slate-900">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-black/5 pt-6 text-sm text-slate-500 sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded bg-emerald-500/15 text-[11px] text-emerald-600">&#10003;</span>
            Everything runs in your browser. Files never leave your device.
          </span>
          <span>© {new Date().getFullYear()} Polished Pixels</span>
        </div>
      </div>
    </footer>
  );
}
