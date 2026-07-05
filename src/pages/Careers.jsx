import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

const roles = [
  { t: "Performance Marketing Manager", loc: "Remote", type: "Full-time" },
  { t: "Senior Brand Designer", loc: "Remote", type: "Full-time" },
  { t: "SEO Strategist", loc: "Remote", type: "Full-time" },
  { t: "Video Editor & Motion Designer", loc: "Remote", type: "Contract" },
  { t: "Front-end Developer (React)", loc: "Remote", type: "Full-time" },
  { t: "Account & Project Lead", loc: "Remote", type: "Full-time" },
];

const perks = [
  "Remote-first, async-friendly",
  "Senior team, real ownership",
  "Learning & conference budget",
  "Flexible time off",
  "Modern tooling, no busywork",
  "Profit-share for the whole team",
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do the best work of your career."
        sub="We're a senior, remote-first team that values craft, ownership, and honesty. If that sounds like you, let's talk."
      />

      <section className="wrap py-12">
        <Reveal>
          <h2 className="heading text-2xl">Open roles</h2>
        </Reveal>
        <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-ink-card">
          {roles.map((r) => (
            <div key={r.t} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-display text-lg font-semibold">{r.t}</p>
                <p className="text-sm text-white/55">
                  {r.loc} · {r.type}
                </p>
              </div>
              <Link to="/contact" className="btn-ghost">
                Apply <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Why join us</span>
            <h2 className="heading mt-4 text-3xl">Perks that respect your time.</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <Icon name="check" className="h-4 w-4 text-accent" />
                {p}
              </div>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-white/60">
              Don't see your role?{" "}
              <Link to="/contact" className="text-accent">
                Send us your portfolio
              </Link>{" "}
             , we're always meeting great people.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
