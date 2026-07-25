import { Link } from "react-router-dom";
import { getRelated } from "./toolsData";
import { toolLink } from "./toolsBase";
import ToolIcon from "./ToolIcon";

export default function RelatedTools({ slug }) {
  const related = getRelated(slug, 4);
  if (!related.length) return null;
  return (
    <div className="mt-14 border-t border-black/5 pt-8">
      <h2 className="font-display text-lg font-semibold text-slate-800">More free tools</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((t) => (
          <Link
            key={t.slug}
            to={toolLink(t.slug)}
            className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
              style={{ background: `${t.accent}1a`, color: t.accent }}
            >
              <ToolIcon name={t.icon} className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-800">{t.name}</span>
              <span className="block text-xs text-slate-500">{t.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
      <Link to={toolLink()} className="mt-4 inline-block text-sm font-semibold text-slate-500 hover:text-slate-800">
        Browse all tools
      </Link>
    </div>
  );
}
