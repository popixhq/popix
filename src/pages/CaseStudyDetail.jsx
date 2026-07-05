import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { getCaseStudy, caseStudies } from "../data/caseStudies";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const c = getCaseStudy(slug);

  if (!c) {
    return (
      <div className="wrap pt-40 pb-24 text-center">
        <h1 className="heading text-3xl">Case study not found</h1>
        <Link to="/case-studies" className="btn-primary mt-6">
          Back to work
        </Link>
      </div>
    );
  }

  const more = caseStudies.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={`${c.industry} · ${c.service}`} title={c.client} sub={c.summary}>
        <Link to="/contact" className="btn-primary">
          Start your project <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="wrap">
        <div className="grid gap-5 rounded-2xl border border-white/10 bg-ink-card p-8 sm:grid-cols-3">
          {c.metrics.map((m, i) => (
            <Reveal key={m.v} delay={i * 0.08}>
              <p className="font-display text-4xl font-bold text-brand-light">{m.k}</p>
              <p className="mt-1 text-sm text-white/60">{m.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-brand-light">The challenge</h2>
            <p className="mt-3 text-white/70">
              {c.client} came to us wanting measurable growth in {c.industry.toLowerCase()} -
              not more activity, but real outcomes tied to the bottom line.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-xl font-semibold text-brand-light">What we did</h2>
            <p className="mt-3 text-white/70">
              We led with {c.service.toLowerCase()}, building a strategy around their audience
              and tightening the funnel at every step, from first impression to conversion.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="font-display text-xl font-semibold text-brand-light">The outcome</h2>
            <p className="mt-3 text-white/70">
              The headline result: <span className="text-white">{c.result}</span>, alongside
              compounding gains across the metrics above and a partnership that's still going.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap pb-8">
        <h2 className="heading text-2xl">More work</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {more.map((m) => (
            <Link
              key={m.slug}
              to={`/case-studies/${m.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-colors hover:border-brand/60"
            >
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-brand/30 to-accent/20">
                <span className="font-display text-xl font-bold text-white/90">{m.result}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold">{m.client}</h3>
                <p className="mt-1 text-sm text-white/55">{m.industry}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
