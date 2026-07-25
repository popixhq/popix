import { Link } from "react-router-dom";
import { toolLink } from "./toolsBase";
import { getTool } from "./toolsData";
import ToolIcon from "./ToolIcon";
import RelatedTools from "./RelatedTools";
import { useAppSeo } from "../apps/useAppSeo";

// Shared wrapper for every tool page: header, body, privacy note, related tools.
export default function ToolShell({ slug, children, wide = false }) {
  const tool = getTool(slug);
  const accent = tool?.accent || "#4E5FB5";

  useAppSeo({
    title: `${tool?.name || "Tool"} | Free browser tool | Polished Pixels`,
    description: tool?.desc,
    url: typeof window !== "undefined" ? window.location.href : `https://popixhq.com/tools/${slug}`,
  });

  return (
    <section className={`mx-auto px-5 py-14 sm:px-8 ${wide ? "max-w-4xl" : "max-w-2xl"}`}>
      <Link to={toolLink()} className="text-sm font-medium text-slate-500 hover:text-slate-900">
        &larr; All tools
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${accent}1a`, color: accent }}>
          <ToolIcon name={tool?.icon || "file"} />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{tool?.name}</h1>
          <p className="text-slate-600">{tool?.tagline}</p>
        </div>
      </div>

      <div className="mt-8">{children}</div>

      <p className="mt-6 flex items-start gap-2 text-sm text-slate-500">
        <span className="mt-0.5 text-emerald-600">&#10003;</span>
        100% private. Everything runs in your browser, so your files are never uploaded.
      </p>

      <RelatedTools slug={slug} />
    </section>
  );
}
