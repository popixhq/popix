import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import CTASection from "../components/CTASection";
import { getLocation, locations } from "../data/locations";
import { services } from "../data/services";

export default function LocationDetail() {
  const { slug } = useParams();
  const loc = getLocation(slug);

  if (!loc) {
    return (
      <div className="wrap pt-40 pb-24 text-center">
        <h1 className="heading text-3xl">Location not found</h1>
        <Link to="/" className="btn-primary mt-6">
          Back home
        </Link>
      </div>
    );
  }

  const others = locations.filter((l) => l.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={`${loc.name}`}
        title={`Digital marketing agency in ${loc.name}`}
        sub={loc.blurb}
      >
        <Link to="/contact" className="btn-primary">
          Get a free audit <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="wrap py-16">
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed text-white/80">
            Wherever your customers are, we help you reach them. Our team runs strategy,
            creative, and performance campaigns for brands across {loc.name}, blending
            global best practice with local market nuance.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { k: "Local", v: "market & cultural insight" },
            { k: "Global", v: "agency standards" },
            { k: "Full-funnel", v: "from awareness to revenue" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <div className="card">
                <p className="font-display text-2xl font-bold text-brand-light">{s.k}</p>
                <p className="mt-1 text-sm text-white/60">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-soft/40 py-16">
        <div className="wrap">
          <h2 className="heading text-2xl">Services in {loc.name}</h2>
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
        <h2 className="heading text-2xl">Other regions we serve</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((l) => (
            <Link
              key={l.slug}
              to={`/locations/${l.slug}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-brand hover:text-white"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
