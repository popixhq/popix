import { useParams, Link } from "react-router-dom";
import { getApp } from "./appsData";
import { appLink } from "./appBase";
import { Squircle } from "./AppsUI";
import { appIcons } from "./appIcons";

export default function AppPrivacy() {
  const { slug } = useParams();
  const app = getApp(slug);

  if (!app) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
        <h1 className="font-bricolage text-3xl font-bold">App not found</h1>
        <Link
          to={appLink()}
          className="mt-6 inline-block rounded-2xl bg-[#0E1525] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to all apps
        </Link>
      </div>
    );
  }

  const p = app.privacy;

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: app.accentSoft }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <Link
            to={appLink(app.slug)}
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to {app.name}
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <Squircle glyph={app.glyph} icon={appIcons[app.slug]} accent={app.accent} size={60} />
            <div>
              <h1 className="font-bricolage text-3xl font-extrabold leading-tight">
                {app.name} Privacy Policy
              </h1>
              {p?.updated && (
                <p className="mt-1 text-sm text-slate-500">Last updated: {p.updated}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="font-bricolage text-xl font-bold">Our commitment</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Polished Pixels builds privacy-first software. Across every app we publish, the same
            promise holds: we do not collect, sell, or share your personal data, we run no advertising
            or third-party trackers, and we keep your content on your device wherever it is
            technically possible.
          </p>

          {p?.intro && <p className="mt-4 leading-relaxed text-slate-600">{p.intro}</p>}

          {p?.sections?.map((s) => (
            <div key={s.h} className="mt-8">
              <h3 className="font-bricolage text-lg font-bold">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.p}</p>
            </div>
          ))}

          {!p && (
            <p className="mt-6 leading-relaxed text-slate-600">
              This app's specific privacy details will be published here before it launches. Our
              studio-wide commitment above applies.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
