import { Link } from "react-router-dom";
import { company } from "../data/nav";
import { services } from "../data/services";
import { industries } from "../data/industries";
import { locations } from "../data/locations";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-soft">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-display text-xl font-bold">
              Polished<span className="text-brand-light">Pixels</span>
            </span>
            <p className="mt-3 max-w-sm text-sm text-white/60">{company.tagline}</p>
            <p className="mt-4 text-sm text-white/60">
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {company.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:border-brand hover:text-white"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" links={services.map((s) => ({ to: `/services/${s.slug}`, label: s.name }))} />
          <FooterCol title="Industries" links={industries.slice(0, 7).map((i) => ({ to: `/industries/${i.slug}`, label: i.name }))} />
          <FooterCol
            title="Company"
            links={[
              { to: "/about", label: "About" },
              { to: "/case-studies", label: "Work" },
              { to: "/careers", label: "Careers" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Where we work
          </p>
          <div className="flex flex-wrap gap-2">
            {locations.map((l) => (
              <Link
                key={l.slug}
                to={`/locations/${l.slug}`}
                className="text-xs text-white/50 hover:text-white"
              >
                {l.name}
                <span className="px-1.5 text-white/20">·</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Polished Pixels · {company.domain}</p>
          <p>Digital marketing & creative agency</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-white/60 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
