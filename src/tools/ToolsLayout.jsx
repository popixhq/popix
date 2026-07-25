import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { tools } from "./toolsData";
import BrandLogo from "../components/BrandLogo";

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
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F7F8FA]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link to={toolLink()} className="flex items-center">
          <BrandLogo tone="color" height={24} suffix="/ Tools" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
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
          <Link
            to="/"
            className="rounded-lg px-3 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            popixhq.com
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ToolsFooter() {
  const live = tools.filter((t) => t.status === "live");
  const cols = [
    { title: "PDF tools", items: live.filter((t) => t.category === "PDF") },
    { title: "Convert", items: live.filter((t) => t.category === "Convert") },
    { title: "More", items: live.filter((t) => ["Image", "Generate"].includes(t.category)) },
  ];
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
