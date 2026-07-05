// The 6 standalone service pages (mirrors the reference site's service-page count)
// plus the grouped offerings shown on the Services index + mega menu.

export const services = [
  {
    slug: "social-media-and-performance-marketing",
    name: "Social Media & Performance Marketing",
    short: "Social + paid growth that compounds",
    icon: "spark",
    tagline: "Turn scrolls into pipeline.",
    hero: "We pair always-on social storytelling with performance media that is measured to the last rupee, so every post, every ad, and every rupee of spend ladders up to revenue.",
    intro:
      "Social and paid no longer live in separate boxes. We run them as one engine: organic content earns attention and trust, performance campaigns capture and convert it. The result is lower acquisition costs and an audience that actually sticks around.",
    offerings: [
      "Paid social on Meta, LinkedIn, X, Pinterest & TikTok",
      "Google Search, Performance Max & YouTube campaigns",
      "Organic content calendars & community management",
      "Creator and influencer partnerships",
      "Conversion-focused creative testing",
      "Full-funnel reporting & attribution",
    ],
    process: [
      { t: "Audit & benchmark", d: "We map your funnel, audiences, and current spend to find the leaks worth fixing first." },
      { t: "Channel & creative plan", d: "A media mix and content system built around how your buyers actually decide." },
      { t: "Launch & test", d: "We ship fast, run structured creative and audience tests, and kill losers early." },
      { t: "Scale & report", d: "Winning angles get more budget; you get a dashboard you'll actually read." },
    ],
    stats: [
      { k: "3.4x", v: "avg. return on ad spend" },
      { k: "-38%", v: "cost per acquisition" },
      { k: "12M+", v: "monthly impressions managed" },
    ],
    faqs: [
      { q: "Do you handle both content and ads?", a: "Yes. We run organic social and paid performance as one team so creative, targeting, and budget stay aligned." },
      { q: "Which platforms do you cover?", a: "Meta, Google, YouTube, LinkedIn, X, TikTok and Pinterest, we recommend the mix based on where your buyers are, not where it's trendy." },
      { q: "How soon will we see results?", a: "Paid signals show up in weeks; durable, compounding gains build over 2–3 months as we learn your audience." },
    ],
  },
  {
    slug: "brand-video-production-agency",
    name: "Brand Video Production",
    short: "Films, ads & explainers that move people",
    icon: "play",
    tagline: "Stories worth pressing play on.",
    hero: "From scroll-stopping short form to polished brand films and TV-ready commercials, we write, shoot, and edit video that earns attention and drives action.",
    intro:
      "Video is the most persuasive medium you have, and the most wasted when it's an afterthought. We treat every frame as a decision: what to say, who says it, and the exact second your viewer feels something. Concept to final cut, in-house.",
    offerings: [
      "Brand films & corporate stories",
      "TV commercials & OTT ad films",
      "Explainer & product videos",
      "Short-form social video (Reels, Shorts)",
      "Motion graphics & animation",
      "Scripting, storyboarding & art direction",
    ],
    process: [
      { t: "Story & script", d: "We find the one idea your audience will remember and build the script around it." },
      { t: "Pre-production", d: "Storyboards, casting, locations, and a shot list so the shoot day runs tight." },
      { t: "Production", d: "A lean, senior crew captures it right, with directing focused on the edit, not just the day." },
      { t: "Post & delivery", d: "Editing, color, sound, and platform cuts delivered ready to publish." },
    ],
    stats: [
      { k: "500+", v: "videos produced" },
      { k: "2x", v: "avg. watch-through vs. category" },
      { k: "14 days", v: "typical concept-to-cut" },
    ],
    faqs: [
      { q: "Do you write the script too?", a: "Always. Strategy and script are where a video is won or lost, so they're included in every project." },
      { q: "Can you make platform-specific cuts?", a: "Yes, we deliver aspect ratios and lengths tailored to each channel from a single shoot." },
      { q: "Do you do animation as well as live action?", a: "Both. Many projects blend filmed footage with motion graphics for clarity and polish." },
    ],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    short: "Own the map and the neighborhood",
    icon: "pin",
    tagline: "Get found where buyers are searching.",
    hero: "We help multi-location and single-storefront brands dominate local search, from Google Business Profile to map-pack rankings and the reviews that close the deal.",
    intro:
      "When someone searches 'near me', the business that shows up wins the visit. Local SEO is part technical, part reputation, part relentless consistency. We handle all three so your locations rank, get called, and get visited.",
    offerings: [
      "Google Business Profile optimization",
      "Map-pack & local ranking strategy",
      "Local citations & directory consistency",
      "Review generation & response management",
      "Location landing pages at scale",
      "Local link building & PR",
    ],
    process: [
      { t: "Local audit", d: "We assess your profiles, citations, reviews, and on-page signals across every location." },
      { t: "Fix the foundations", d: "Consistent NAP data, optimized profiles, and clean technical signals come first." },
      { t: "Build authority", d: "Reviews, local links, and content that tell Google you're the relevant local choice." },
      { t: "Track & grow", d: "Rank tracking by location and grid so you see exactly where you're winning." },
    ],
    stats: [
      { k: "Top 3", v: "map pack for core terms" },
      { k: "+120%", v: "avg. profile actions" },
      { k: "4.8★", v: "avg. review rating lift" },
    ],
    faqs: [
      { q: "Do you manage multiple locations?", a: "Yes, from a single storefront to hundreds of locations with templated, localized landing pages." },
      { q: "Can you help with bad reviews?", a: "We build a review generation system and a response playbook so the overall rating climbs over time." },
      { q: "How is this different from regular SEO?", a: "Local SEO adds map-pack ranking, profile optimization, and proximity signals on top of classic on-page and links." },
    ],
  },
  {
    slug: "b2b-seo",
    name: "B2B SEO",
    short: "Pipeline-grade organic search",
    icon: "graph",
    tagline: "Rank for the searches that fill your pipeline.",
    hero: "B2B buying cycles are long, technical, and committee-driven. We build SEO programs that earn rankings for high-intent terms and nurture every stakeholder along the way.",
    intro:
      "In B2B, ranking #1 for a vanity keyword means nothing if it doesn't move a deal. We reverse-engineer your sales pipeline into a content and technical strategy that targets the exact problems your buyers search, then prove it in revenue, not just rankings.",
    offerings: [
      "Pipeline-driven keyword & topic strategy",
      "Technical SEO for complex sites",
      "Bottom-of-funnel & comparison content",
      "Thought-leadership & demand content",
      "Digital PR & authority link building",
      "SEO + CRM attribution reporting",
    ],
    process: [
      { t: "Map the buying journey", d: "We align keywords to each stage and stakeholder in your sales cycle." },
      { t: "Technical & content audit", d: "Find what's blocking rankings and which pages can win fastest." },
      { t: "Build & publish", d: "Authority content and on-page work that targets revenue terms first." },
      { t: "Earn authority", d: "Digital PR and links that lift your whole domain, not just one page." },
    ],
    stats: [
      { k: "+210%", v: "organic MQLs" },
      { k: "Page 1", v: "for core revenue terms" },
      { k: "5:1", v: "SEO pipeline-to-cost ratio" },
    ],
    faqs: [
      { q: "Can you tie SEO to revenue?", a: "Yes. We connect organic traffic to your CRM so you see pipeline and closed-won, not just sessions." },
      { q: "Our product is highly technical, can you write about it?", a: "We embed with your subject-matter experts to produce content that's accurate and ranks." },
      { q: "How long until B2B SEO pays off?", a: "Expect early wins in 3 months and compounding pipeline impact from 6 months onward." },
    ],
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    short: "Custom web apps, built to scale",
    icon: "code",
    tagline: "From idea to product, engineered right.",
    hero: "We design and build fast, secure, scalable web applications, customer portals, dashboards, SaaS products, and internal tools that your team and users actually love.",
    intro:
      "A web app is a promise that has to keep working every day. We build with modern, maintainable stacks, ship in tight iterations, and obsess over the details, speed, security, and a UX that makes complex things feel simple.",
    offerings: [
      "Custom SaaS & platform development",
      "Customer & partner portals",
      "Dashboards & data visualization",
      "API design & third-party integrations",
      "Progressive web apps (PWA)",
      "Cloud architecture & DevOps",
    ],
    process: [
      { t: "Discovery & scope", d: "We pin down the jobs-to-be-done, success metrics, and an MVP worth shipping." },
      { t: "Design & architecture", d: "UX flows, system design, and a stack chosen for the long run." },
      { t: "Agile build", d: "Two-week sprints with working software you can test at every step." },
      { t: "Launch & support", d: "Hardened, monitored deploys plus ongoing iteration and care." },
    ],
    stats: [
      { k: "99.9%", v: "uptime delivered" },
      { k: "<1.5s", v: "median load time" },
      { k: "40+", v: "apps shipped" },
    ],
    faqs: [
      { q: "What tech stack do you use?", a: "Modern, well-supported tools, typically React, Node, and managed cloud, chosen to fit the project, not the other way around." },
      { q: "Can you take over an existing app?", a: "Yes. We audit the codebase, stabilize it, and build a roadmap before adding features." },
      { q: "Do you offer ongoing maintenance?", a: "We offer support retainers covering monitoring, fixes, and continuous improvement." },
    ],
  },
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    short: "Sites that look stunning and convert",
    icon: "layout",
    tagline: "Your best salesperson, online 24/7.",
    hero: "We design and build marketing websites that are beautiful, blazing fast, and engineered to convert, from corporate sites to ecommerce storefronts and everything between.",
    intro:
      "Your website is usually the first real impression and the hardest-working asset you own. We blend brand design, conversion strategy, and clean engineering to ship sites that load fast, rank well, and turn visitors into customers.",
    offerings: [
      "Corporate & brand websites",
      "Ecommerce storefronts",
      "Landing pages & campaign sites",
      "CMS & headless builds",
      "Conversion rate optimization",
      "Core Web Vitals & performance tuning",
    ],
    process: [
      { t: "Strategy & sitemap", d: "We define goals, audiences, and a structure that guides visitors to action." },
      { t: "Design", d: "On-brand, conversion-led design with prototypes you can click before we build." },
      { t: "Build", d: "Accessible, fast, SEO-ready front-end with an editor your team can own." },
      { t: "Optimize", d: "Post-launch testing and tuning to keep conversion climbing." },
    ],
    stats: [
      { k: "95+", v: "avg. Lighthouse score" },
      { k: "+64%", v: "avg. conversion lift" },
      { k: "100%", v: "responsive & accessible" },
    ],
    faqs: [
      { q: "Which platforms do you build on?", a: "From custom React builds to WordPress, Webflow, and Shopify, we match the platform to your team and goals." },
      { q: "Will I be able to edit it myself?", a: "Yes. We hand over a clean CMS and training so your team can update content without us." },
      { q: "Do you handle SEO during the build?", a: "Technical SEO and performance are baked into every build, not bolted on later." },
    ],
  },
];

// Grouped capability list shown on the Services index and in the mega menu.
export const serviceGroups = [
  {
    title: "Creative & Brand",
    items: [
      "Brand Strategy",
      "Logo & Identity Design",
      "Brand Communication",
      "Packaging & Collateral",
      "Art Direction",
      "Motion & Animation",
    ],
  },
  {
    title: "SEO & Performance",
    items: [
      "SEO Services",
      "B2B SEO",
      "Local SEO & GMB",
      "Ecommerce SEO",
      "Generative Engine Optimization",
      "Performance Marketing",
    ],
  },
  {
    title: "Advertising",
    items: [
      "Search Advertising",
      "Social Advertising",
      "Display & Video",
      "Media Buying",
      "Lead-Based Campaigns",
      "Product Listing Ads",
    ],
  },
  {
    title: "Social Media",
    items: [
      "Instagram Marketing",
      "Facebook Marketing",
      "LinkedIn Marketing",
      "Influencer & UGC",
      "Social Branding",
      "Social + Performance Combo",
    ],
  },
  {
    title: "Web & Apps",
    items: [
      "Website Design",
      "Ecommerce Websites",
      "Web App Development",
      "Mobile App Development",
      "CMS & Headless",
      "CRO",
    ],
  },
  {
    title: "Content & Video",
    items: [
      "Brand Video Production",
      "TV & OTT Commercials",
      "Explainer Videos",
      "SEO Copywriting",
      "Video Scripts",
      "Marketing Collaterals",
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
