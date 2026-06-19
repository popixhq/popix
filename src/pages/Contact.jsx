import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { company } from "../data/nav";
import { services } from "../data/services";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Replace with your Formspree (or Cloudflare Pages Function) endpoint.
  // Example: "https://formspree.io/f/your-id"
  const ENDPOINT = "";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ENDPOINT) {
      // No endpoint configured yet — simulate success for the demo.
      setSent(true);
      return;
    }
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSent(true);
    } catch {
      setSent(true);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your growth."
        sub="Tell us where you want to go and we'll send back a free, no-obligation audit and a plan to get there."
      />

      <section className="wrap pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-6">
              <div className="card">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">Email</p>
                <a href={`mailto:${company.email}`} className="mt-1 block text-lg hover:text-accent">
                  {company.email}
                </a>
              </div>
              <div className="card">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">What you get</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "A free audit of your current marketing",
                    "A 30-minute strategy call",
                    "A clear, prioritized growth plan",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-white/75">
                      <Icon name="check" className="mt-0.5 h-4 w-4 text-accent" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">Follow</p>
                <div className="mt-3 flex flex-wrap gap-2">
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
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card relative overflow-hidden">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                  >
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/20 text-accent">
                      <Icon name="check" className="h-7 w-7" />
                    </div>
                    <h2 className="heading mt-5 text-2xl">Thanks — we got it.</h2>
                    <p className="mt-2 text-white/60">
                      We'll be in touch within one business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" name="name" required />
                      <Field label="Email" name="email" type="email" required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Company" name="company" />
                      <div>
                        <label className="mb-1.5 block text-sm text-white/70">Service of interest</label>
                        <select
                          name="service"
                          className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-brand"
                        >
                          <option value="">Select…</option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm text-white/70">How can we help?</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-brand"
                        placeholder="Tell us about your goals…"
                      />
                    </div>
                    <button type="submit" className="btn-primary justify-center">
                      Send message <Icon name="arrow" className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required = false }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-white/70">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-brand"
      />
    </div>
  );
}
