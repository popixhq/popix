import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { getIndustry, industries } from "../data/industries";
import { services } from "../data/services";

export default function IndustryDetail() {
  const { slug } = useParams();
  const ind = getIndustry(slug);

  if (!ind) {
    return (
      <div className="wrap pt-40 pb-24 text-center">
        <h1 className="heading text-3xl">Industry not found</h1>
        <Link to="/industries" className="btn-primary mt-6">
          Back to industries
        </Link>
      </div>
    );
  }

  const others = industries.filter((i) => i.slug !== slug).slice(0, 6);

  return (
    <>
      <PageHero eyebrow={`${ind.name} marketing`} title={`Digital marketing for ${ind.name}`} sub={ind.hero}>
        <Link to="/contact" className="btn-primary">
          Talk to a specialist <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Why it works</span>
            <h2 className="heading mt-4 text-3xl">Built for how {ind.name.toLowerCase()} buyers decide.</h2>
            <p className="mt-4 text-white/70">
              We combine sector insight with our full marketing stack to win attention,
              earn trust, and convert demand — without the long ramp-up of a generalist agency.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-lg font-semibold">What we focus on</h3>
            <ul className="mt-5 grid gap-3">
              {ind.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                  <Icon name="check" className="mt-0.5 h-4 w-4 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-soft/40 py-16">
        <div className="wrap">
          <Reveal>
            <h2 className="heading text-2xl">Services we bring to {ind.name}</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 hover:border-brand hover:text-white"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="heading text-2xl">Other industries</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((i) => (
            <Link
              key={i.slug}
              to={`/industries/${i.slug}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-brand hover:text-white"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
