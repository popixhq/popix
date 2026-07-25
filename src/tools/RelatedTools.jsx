import { Link } from "react-router-dom";
import { getRelated } from "./toolsData";
import { toolLink } from "./toolsBase";
import MaterialIcon, { symbolFor } from "./MaterialIcon";

export default function RelatedTools({ slug }) {
  const related = getRelated(slug, 4);
  if (!related.length) return null;
  return (
    <div className="mt-16 border-t border-border-subtle pt-10">
      <h2 className="font-jakarta text-xl font-semibold text-primary">More free tools</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((t) => (
          <Link key={t.slug} to={toolLink(t.slug)} className="group flex items-center gap-4 rounded-xl border border-border-subtle bg-surface-main p-4 transition-all hover:-translate-y-0.5 hover:border-primary">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <MaterialIcon name={symbolFor(t.slug)} className="text-[22px]" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-primary">{t.name}</span>
              <span className="block text-xs text-text-muted">{t.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
      <Link to={toolLink()} className="mt-5 inline-block text-sm font-semibold text-on-surface-variant hover:text-primary">Browse all tools</Link>
    </div>
  );
}
