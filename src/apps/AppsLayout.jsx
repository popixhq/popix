import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

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
        <Link to="/apps" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[0.6rem] bg-[#0E1525] font-bricolage text-sm font-extrabold text-white">
            P
          </span>
          <span className="font-bricolage text-lg font-bold tracking-tight">
            Polished Pixels <span className="text-slate-400">/ Apps</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink
            to="/apps"
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
            href="/"
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
        <p className="font-bricolage font-semibold text-slate-800">Polished Pixels Apps</p>
        <p>© {new Date().getFullYear()} Polished Pixels · Built with care.</p>
        <a href="/" className="hover:text-slate-900">
          popixhq.com
        </a>
      </div>
    </footer>
  );
}
