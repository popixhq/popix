// Free browser tools. Add an entry here plus a route in App.jsx to ship one.
// Everything runs in the visitor's browser, so files never leave their device.

export const tools = [
  {
    slug: "compress-image",
    name: "Compress Image",
    tagline: "Shrink JPG, PNG and WebP",
    desc: "Make images smaller without a visible drop in quality. Great for faster sites and email.",
    icon: "image",
    category: "Image",
    status: "live",
    accent: "#0EA5A5",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    tagline: "Reduce PDF file size",
    desc: "Squeeze a heavy PDF down so it's easy to email or upload, all in your browser.",
    icon: "compress",
    category: "PDF",
    status: "live",
    accent: "#4E5FB5",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    tagline: "Combine PDFs into one",
    desc: "Join several PDF files into a single document, in the order you choose.",
    icon: "merge",
    category: "PDF",
    status: "live",
    accent: "#7C5CFF",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    tagline: "Extract or split pages",
    desc: "Pull out a page range, or split a PDF into separate pages and download them as a zip.",
    icon: "split",
    category: "PDF",
    status: "live",
    accent: "#E5397E",
  },
  {
    slug: "pdf-password-remover",
    name: "PDF Password Remover",
    tagline: "Unlock a protected PDF",
    desc: "Remove the password from a PDF you can already open, and download an unlocked copy.",
    icon: "lock",
    category: "PDF",
    status: "live",
    accent: "#2563EB",
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    tagline: "Create invoices in seconds",
    desc: "Fill in your details, pick one of 10 templates, and download a clean PDF invoice.",
    icon: "invoice",
    category: "Generate",
    status: "live",
    accent: "#F59E0B",
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    tagline: "Convert spreadsheets to PDF",
    desc: "Turn an Excel or CSV file into a tidy, shareable PDF table.",
    icon: "sheet",
    category: "Convert",
    status: "live",
    accent: "#16A34A",
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    tagline: "Extract tables to a spreadsheet",
    desc: "Pull the text and tables out of a PDF into an editable Excel file. Works best on simple layouts.",
    icon: "table",
    category: "Convert",
    status: "live",
    accent: "#059669",
  },
  {
    slug: "audio-to-text",
    name: "Audio to Text",
    tagline: "Transcribe audio files",
    desc: "Turn a recording into text with on-device speech recognition, no uploads and no account.",
    icon: "wave",
    category: "Transcribe",
    status: "soon",
    accent: "#0EA5A5",
  },
  {
    slug: "video-to-text",
    name: "Video to Text",
    tagline: "Transcribe video files",
    desc: "Pull a clean transcript out of a video, right in your browser.",
    icon: "play",
    category: "Transcribe",
    status: "soon",
    accent: "#EF4444",
  },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);

// Recommend other tools: same category first, then fill with other live tools.
export function getRelated(slug, limit = 4) {
  const self = getTool(slug);
  if (!self) return tools.filter((t) => t.status === "live").slice(0, limit);
  const live = tools.filter((t) => t.slug !== slug && t.status === "live");
  const sameCat = live.filter((t) => t.category === self.category);
  const rest = live.filter((t) => t.category !== self.category);
  return [...sameCat, ...rest].slice(0, limit);
}
