import { useParams, Link } from "react-router-dom";
import { getApp } from "./appsData";
import { appLink } from "./appBase";
import { Squircle } from "./AppsUI";
import { appIcons } from "./appIcons";

export default function AppTerms() {
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

  const t = app.terms;

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
                {app.name} Terms of Service
              </h1>
              {t?.updated && (
                <p className="mt-1 text-sm text-slate-500">Last updated: {t.updated}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="font-bricolage text-xl font-bold">The short version</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            Pocket Play is a free offline games app made for your enjoyment. Play as much as you
            like, keep your progress on your device, and please don't resell or tamper with the app.
            The full terms are below.
          </p>

          {t?.intro && <p className="mt-4 leading-relaxed text-slate-600">{t.intro}</p>}

          {t?.sections?.map((s) => (
            <div key={s.h} className="mt-8">
              <h3 className="font-bricolage text-lg font-bold">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.p}</p>
            </div>
          ))}

          {!t && (
            <p className="mt-6 leading-relaxed text-slate-600">
              This app's specific terms will be published here before it launches.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
