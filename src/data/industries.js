// Industry landing pages, mirrors the reference site's industry coverage.

export const industries = [
  {
    slug: "ecommerce",
    name: "Ecommerce",
    blurb: "Full-funnel growth for online stores.",
    hero: "From first click to repeat purchase, we grow ecommerce brands with performance media, SEO, and conversion-led storefronts.",
    points: ["Shopping & PMax campaigns", "Ecommerce SEO & feed optimization", "CRO & retention email", "Marketplace growth"],
  },
  {
    slug: "automotive",
    name: "Automotive",
    blurb: "Drive showroom and online demand.",
    hero: "We help dealerships, OEMs, and mobility brands generate qualified leads and book test drives at scale.",
    points: ["Local & inventory campaigns", "Lead-gen funnels", "Video & creative", "Reputation management"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb: "Compliant marketing that builds trust.",
    hero: "Patient-first digital marketing for clinics, hospitals, and health brands, built around trust and compliance.",
    points: ["Local SEO for clinics", "Patient acquisition ads", "Reputation & reviews", "Educational content"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    blurb: "Sell projects faster, online.",
    hero: "Lead generation and brand campaigns for developers, brokers, and property platforms.",
    points: ["Project launch campaigns", "Qualified lead funnels", "Walkthrough video", "Landing pages that convert"],
  },
  {
    slug: "finance",
    name: "Finance & Fintech",
    blurb: "Performance with compliance built in.",
    hero: "Acquisition and trust-building for banks, fintechs, and advisory firms in a tightly regulated space.",
    points: ["Compliant paid media", "SEO & thought leadership", "Conversion optimization", "Analytics & attribution"],
  },
  {
    slug: "education",
    name: "Education",
    blurb: "Fill seats and grow enrollments.",
    hero: "Enrollment-driven marketing for schools, ed-tech, and universities across every stage of the funnel.",
    points: ["Admissions lead-gen", "Always-on social", "Counsellor enablement", "SEO & content"],
  },
  {
    slug: "beauty-skincare",
    name: "Beauty & Skincare",
    blurb: "Build a brand people obsess over.",
    hero: "Creator-led social, performance media, and storytelling for beauty and skincare brands.",
    points: ["Influencer & UGC", "Performance social", "Brand films", "Ecommerce growth"],
  },
  {
    slug: "travel-tourism",
    name: "Travel & Tourism",
    blurb: "Inspire trips and fill bookings.",
    hero: "Demand generation for hotels, OTAs, and destinations that turns wanderlust into reservations.",
    points: ["Seasonal campaigns", "Destination content", "Metasearch & paid", "Loyalty & retention"],
  },
  {
    slug: "food-fmcg",
    name: "Food & FMCG",
    blurb: "Win attention and shelf preference.",
    hero: "Mass-reach creative and performance for food and fast-moving consumer goods brands.",
    points: ["Brand campaigns", "Quick-commerce growth", "Creator content", "Packaging & design"],
  },
  {
    slug: "home-decor",
    name: "Home & Decor",
    blurb: "Make spaces, and sales, beautiful.",
    hero: "Visual-first marketing for furniture, decor, and interior brands.",
    points: ["Catalogue & shopping ads", "Lifestyle content", "Showroom local SEO", "CRO"],
  },
  {
    slug: "b2b",
    name: "B2B & SaaS",
    blurb: "Pipeline, not just impressions.",
    hero: "Demand generation and SEO that fills the pipeline for B2B and SaaS companies.",
    points: ["ABM & LinkedIn ads", "B2B SEO", "Demand content", "CRM attribution"],
  },
  {
    slug: "electric-vehicles",
    name: "Electric Vehicles",
    blurb: "Power the shift to electric.",
    hero: "Awareness-to-purchase marketing for EV makers, charging networks, and mobility startups.",
    points: ["Category education", "Lead generation", "Launch campaigns", "Sustainability storytelling"],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
