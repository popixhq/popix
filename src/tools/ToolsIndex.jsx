import { Link } from "react-router-dom";
import { toolsByCategory } from "./toolsData";
import { toolLink } from "./toolsBase";
import MaterialIcon, { symbolFor } from "./MaterialIcon";

export function slugifyCat(id) {
  return "cat-" + id.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ToolsIndex() {
  const groups = toolsByCategory();
  return (
    <>
      {/* Hero */}
      <header className="pb-8 pt-16 md:pt-20">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2 text-sm font-bold uppercase tracking-wide text-on-secondary-container shadow-sm">
            <MaterialIcon name="verified" className="text-[18px]" fill /> Free, private, no sign-up
          </div>
          <h1 className="mb-6 max-w-3xl font-jakarta text-[32px] font-bold leading-[1.1] tracking-tight text-primary md:text-5xl md:leading-[1.05]">
            Simple tools that run in your browser.
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-on-surface-variant">
            Small, useful utilities from Polished Pixels. Your files never get uploaded.
            Everything happens on your device, so it is fast and private.
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.id} href={`#${slugifyCat(g.id)}`} className="rounded-full border border-border-subtle bg-surface-main px-5 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:shadow-sm">
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Category sections */}
      <main className="mx-auto max-w-container-max space-y-20 px-margin-mobile pb-24 md:px-margin-desktop">
        {groups.map((g) => {
          const items = g.items.filter((t) => t.status === "live");
          return (
            <section key={g.id} id={slugifyCat(g.id)} className="scroll-mt-24">
              <div className="mb-8 flex items-center justify-between border-b border-border-subtle pb-4">
                <h2 className="font-jakarta text-2xl font-semibold tracking-tight text-primary">{g.label}</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((t) => <ToolCard key={t.slug} t={t} />)}
              </div>
            </section>
          );
        })}

        <PrivacySection />
      </main>
    </>
  );
}

function ToolCard({ t }) {
  return (
    <Link to={toolLink(t.slug)} className="group flex h-full flex-col rounded-xl border border-border-subtle bg-surface-main p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
        <MaterialIcon name={symbolFor(t.slug)} className="text-[28px]" />
      </div>
      <h3 className="mb-2 font-jakarta text-xl font-semibold text-primary">{t.name}</h3>
      <p className="mb-8 flex-grow text-sm text-on-surface-variant">{t.desc}</p>
      <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container-low py-3 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
        Launch Tool <MaterialIcon name="arrow_forward" className="text-[18px]" />
      </span>
    </Link>
  );
}

function PrivacySection() {
  const cards = [
    ["pdf-password-remover", "vpn_key", "Unlock", "Remove PDF passwords."],
    ["protect-pdf", "verified_user", "Protect", "Add a password."],
    ["watermark-pdf", "branding_watermark", "Watermark", "Stamp text on pages."],
    ["flatten-pdf", "layers_clear", "Flatten", "Lock in form fields."],
  ];
  return (
    <section className="scroll-mt-24" id="cat-privacy">
      <div className="rounded-3xl border border-border-subtle bg-surface-container p-10 md:p-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-on-primary">
              <MaterialIcon name="shield" className="text-[14px]" /> Privacy by design
            </div>
            <h2 className="mb-6 font-jakarta text-[32px] font-bold tracking-tight text-primary">Your files stay on your device.</h2>
            <p className="mb-10 text-lg text-on-surface-variant">
              Your files are processed right here in your browser and are never uploaded.
              No account, no tracking, and no data collection.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[["lock", "Zero Uploads", "Files never leave your device."], ["no_accounts", "No Accounts", "No tracking or profile building."]].map(([i, h, d]) => (
                <div key={h} className="flex items-start gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/10 text-secondary"><MaterialIcon name={i} className="text-[20px]" /></span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">{h}</h4>
                    <p className="text-sm text-on-surface-variant">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cards.map(([slug, i, h, d]) => (
              <Link key={h} to={toolLink(slug)} className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <MaterialIcon name={i} className="mb-4 text-[32px] text-primary" />
                <h4 className="mb-1 text-sm font-semibold text-primary">{h}</h4>
                <p className="text-xs text-on-surface-variant">{d}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
