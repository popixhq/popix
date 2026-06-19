// Location / region landing pages — mirrors the reference site's geo coverage.

export const locations = [
  { slug: "india", name: "India", blurb: "Our home base — full-service digital marketing across India." },
  { slug: "usa", name: "United States", blurb: "Performance and brand growth for US-based companies." },
  { slug: "new-york", name: "New York", blurb: "SEO and paid media built for the NYC market." },
  { slug: "los-angeles", name: "Los Angeles", blurb: "Creative-led growth for LA brands." },
  { slug: "miami", name: "Miami", blurb: "Digital marketing for Florida's fastest-growing businesses." },
  { slug: "uk", name: "United Kingdom", blurb: "Search and social growth across the UK." },
  { slug: "europe", name: "Europe", blurb: "Multilingual campaigns across European markets." },
  { slug: "uae", name: "UAE & Dubai", blurb: "High-impact marketing for the Gulf region." },
  { slug: "australia", name: "Australia", blurb: "Full-funnel growth for Australian brands." },
  { slug: "canada", name: "Canada", blurb: "Bilingual digital marketing across Canada." },
  { slug: "south-africa", name: "South Africa", blurb: "Performance marketing for the South African market." },
];

export const getLocation = (slug) => locations.find((l) => l.slug === slug);
