import { Link } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { getTool } from "./toolsData";
import MaterialIcon, { symbolFor } from "./MaterialIcon";
import RelatedTools from "./RelatedTools";
import { useAppSeo } from "../apps/useAppSeo";

const FEATURES = [
  ["verified_user", "Private by design", "Files are processed on your device and are never uploaded to a server."],
  ["money_off", "Free, no sign-up", "Every tool is completely free to use, with no account required."],
  ["bolt", "Simple and fast", "One focused tool that does its job in seconds, right in your browser."],
];

export default function ToolShell({ slug, children, wide = false }) {
  const tool = getTool(slug);
  useAppSeo({
    title: `${tool?.name || "Tool"} | Free browser tool | Polished Pixels`,
    description: tool?.desc,
    url: typeof window !== "undefined" ? window.location.href : `https://popixhq.com/tools/${slug}`,
  });

  return (
    <main className="px-margin-mobile py-12 md:px-margin-desktop">
      <div className={`mx-auto w-full ${wide ? "max-w-container-max" : "max-w-4xl"}`}>
        <Link to={toolLink()} className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary">
          <MaterialIcon name="arrow_back" className="text-[18px]" /> All tools
        </Link>

        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-xl bg-surface-container text-primary">
            <MaterialIcon name={symbolFor(slug)} className="text-[32px]" />
          </div>
          <h1 className="mb-4 font-jakarta text-[32px] font-bold tracking-tight text-primary md:text-5xl md:leading-tight">{tool?.name}</h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">{tool?.desc}</p>
        </div>

        {children}

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map(([icon, h, d]) => (
            <div key={h} className="flex flex-col items-start gap-3">
              <MaterialIcon name={icon} className="text-[28px] text-secondary" />
              <h3 className="font-jakarta text-xl font-semibold text-primary">{h}</h3>
              <p className="text-sm text-text-muted">{d}</p>
            </div>
          ))}
        </div>

        <RelatedTools slug={slug} />
      </div>
    </main>
  );
}
