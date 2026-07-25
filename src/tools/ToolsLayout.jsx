import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { toolLink, MAIN_SITE_URL } from "./toolsBase";
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
          <a
            href={MAIN_SITE_URL}
            className="rounded-lg px-3 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            popixhq.com ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

function ToolsFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:px-8">
        <span className="inline-flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded bg-emerald-500/15 text-[11px] text-emerald-600">✓</span>
          Everything runs in your browser. Files never leave your device.
        </span>
        <a href={MAIN_SITE_URL} className="hover:text-slate-900">
          © {new Date().getFullYear()} Polished Pixels
        </a>
      </div>
    </footer>
  );
}
