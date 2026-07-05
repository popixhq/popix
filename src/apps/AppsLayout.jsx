import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { appLink, MAIN_SITE_URL } from "./appBase";
import BrandLogo, { LogoMark } from "../components/BrandLogo";

export default function AppsLayout() {
  // Switch the body background to the light Apps theme while in this section.
  useEffect(() => {
    document.body.classList.add("apps-theme");
    return () => document.body.classList.remove("apps-theme");
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-body text-[#0E1525]">
      <AppsHeader />
      <Outlet />
      <AppsFooter />
    </div>
  );
}

function AppsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F4F6FB]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to={appLink()} className="flex items-center">
          <BrandLogo tone="color" height={26} suffix="/ Apps" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink
            to={appLink()}
            end
            className={({ isActive }) =>
              `rounded-full px-4 py-2 font-medium transition-colors ${
                isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`
            }
          >
            All apps
          </NavLink>
          <a
            href={MAIN_SITE_URL}
            className="rounded-full px-4 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Agency site ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

function AppsFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:px-8">
        <span className="flex items-center gap-2 font-bricolage font-semibold text-slate-800">
          <LogoMark size={22} tone="color" /> Polished Pixels Apps
        </span>
        <p>© {new Date().getFullYear()} Polished Pixels · Built with care.</p>
        <a href={MAIN_SITE_URL} className="hover:text-slate-900">
          popixhq.com
        </a>
      </div>
    </footer>
  );
}
