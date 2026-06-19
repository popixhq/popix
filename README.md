# Polished Pixels — popixhq.com

Marketing website for **Polished Pixels**, a full-service digital marketing & creative agency.
Built with **Vite + React + Tailwind CSS + Motion**. Deploys free on **Cloudflare Pages**.

## Pages

- Home, About, Services (index) + **6 service pages**, Industries (index) + 12 industry pages,
  11 location pages, Case Studies (index) + 11 case studies, Careers, Blog, Contact, 404.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Deploy to Cloudflare Pages (free)

1. Push this repo to GitHub (already at `github.com/popixhq/popix`).
2. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the `popix` repo and use these build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare gives you a `*.pages.dev` URL immediately.
5. **Custom domain:** Pages → your project → **Custom domains → Set up a domain** →
   enter `popixhq.com` (and `www.popixhq.com`). If your domain's DNS is on Cloudflare,
   the records are added automatically; otherwise point your DNS as Cloudflare instructs.
   SSL is automatic and free.

Every push to `main` triggers an automatic rebuild and deploy.

> `public/_redirects` (`/* /index.html 200`) makes client-side routing work so deep links
> like `/services/b2b-seo` load correctly.

## Customize before launch

- **Contact form:** set `ENDPOINT` in `src/pages/Contact.jsx` to a free
  [Formspree](https://formspree.io) endpoint (or a Cloudflare Pages Function).
- **Contact details / socials:** `src/data/nav.js` (email, phone, social links).
- **Case studies:** `src/data/caseStudies.js` — replace the sample names and numbers
  with your real client work.
- **Copy & services:** `src/data/services.js`, `industries.js`, `locations.js`.
- **Brand colors / fonts:** `tailwind.config.js`.
- **Logo / favicon:** `public/favicon.svg`.

## Structure

```
src/
  data/         # services, industries, locations, case studies, nav (drives every page)
  components/   # Navbar, Footer, PageHero, CTASection, Reveal, Icon, ScrollToTop
  pages/        # one file per route
  App.jsx       # routing
public/
  _redirects    # SPA routing for Cloudflare Pages
  robots.txt, sitemap.xml, favicon.svg
```
