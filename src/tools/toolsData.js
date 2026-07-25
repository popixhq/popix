// Free browser tools, grouped by category. Add an entry here plus (for live
// tools) a route in App.jsx. Everything runs in the visitor's browser.
//
// status: "live"  = built and working
//         "soon"  = shown in the menu/hub, needs a conversion engine or is queued

export const categories = [
  { id: "Organize PDF", label: "Organize PDF" },
  { id: "Convert to PDF", label: "Convert to PDF" },
  { id: "Convert from PDF", label: "Convert from PDF" },
  { id: "PDF Security", label: "PDF Security" },
  { id: "Image", label: "Image" },
  { id: "Generate", label: "Generate" },
  { id: "Transcribe", label: "Transcribe" },
];

export const tools = [
  // ---- Organize PDF ----
  { slug: "merge-pdf", name: "Merge PDF", tagline: "Combine PDFs into one", desc: "Join several PDF files into a single document, in the order you choose.", icon: "merge", category: "Organize PDF", status: "live", accent: "#7C5CFF" },
  { slug: "split-pdf", name: "Split PDF", tagline: "Extract or split pages", desc: "Pull out a page range, or split a PDF into separate pages and download them as a zip.", icon: "split", category: "Organize PDF", status: "live", accent: "#E5397E" },
  { slug: "compress-pdf", name: "Compress PDF", tagline: "Reduce PDF file size", desc: "Squeeze a heavy PDF down so it is easy to email or upload, all in your browser.", icon: "compress", category: "Organize PDF", status: "live", accent: "#4E5FB5" },
  { slug: "flatten-pdf", name: "Flatten PDF", tagline: "Flatten forms and layers", desc: "Flatten form fields and annotations into the page so the PDF looks the same everywhere.", icon: "flatten", category: "Organize PDF", status: "live", accent: "#6366F1" },

  // ---- Convert to PDF ----
  { slug: "jpg-to-pdf", name: "JPG to PDF", tagline: "Images into a PDF", desc: "Turn JPG or PNG images into a single PDF, in the order you pick.", icon: "image", category: "Convert to PDF", status: "live", accent: "#0EA5A5" },
  { slug: "txt-to-pdf", name: "TXT to PDF", tagline: "Plain text to PDF", desc: "Convert a .txt file into a clean, paginated PDF.", icon: "txt", category: "Convert to PDF", status: "live", accent: "#0D9488" },
  { slug: "html-to-pdf", name: "HTML to PDF", tagline: "Web page to PDF", desc: "Convert an HTML file into a PDF snapshot of the page.", icon: "html", category: "Convert to PDF", status: "live", accent: "#F97316" },
  { slug: "excel-to-pdf", name: "Excel to PDF", tagline: "Spreadsheets to PDF", desc: "Turn an Excel or CSV file into a tidy, shareable PDF table.", icon: "sheet", category: "Convert to PDF", status: "live", accent: "#16A34A" },
  { slug: "ods-to-pdf", name: "ODS to PDF", tagline: "OpenDocument sheet to PDF", desc: "Convert an OpenDocument spreadsheet (.ods) into a clean PDF table.", icon: "sheet", category: "Convert to PDF", status: "live", accent: "#16A34A" },
  { slug: "zip-to-pdf", name: "ZIP to PDF", tagline: "Zipped images to PDF", desc: "Upload a .zip of images and combine them into one PDF.", icon: "zip", category: "Convert to PDF", status: "live", accent: "#8B5CF6" },
  { slug: "word-to-pdf", name: "Word to PDF", tagline: "DOCX to PDF", desc: "Convert Word documents to PDF.", icon: "word", category: "Convert to PDF", status: "soon", accent: "#2563EB" },
  { slug: "ppt-to-pdf", name: "PPT to PDF", tagline: "Slides to PDF", desc: "Convert PowerPoint decks to PDF.", icon: "ppt", category: "Convert to PDF", status: "soon", accent: "#EA580C" },
  { slug: "rtf-to-pdf", name: "RTF to PDF", tagline: "Rich text to PDF", desc: "Convert RTF documents to PDF.", icon: "txt", category: "Convert to PDF", status: "soon", accent: "#0D9488" },
  { slug: "odt-to-pdf", name: "ODT to PDF", tagline: "OpenDocument text to PDF", desc: "Convert OpenDocument text files (.odt) to PDF.", icon: "word", category: "Convert to PDF", status: "soon", accent: "#2563EB" },
  { slug: "odp-to-pdf", name: "ODP to PDF", tagline: "OpenDocument slides to PDF", desc: "Convert OpenDocument presentations (.odp) to PDF.", icon: "ppt", category: "Convert to PDF", status: "soon", accent: "#EA580C" },
  { slug: "epub-to-pdf", name: "EPUB to PDF", tagline: "Ebooks to PDF", desc: "Convert EPUB ebooks to PDF.", icon: "file", category: "Convert to PDF", status: "soon", accent: "#0EA5A5" },
  { slug: "hwp-to-pdf", name: "HWP to PDF", tagline: "Hangul docs to PDF", desc: "Convert Hangul (HWP) documents to PDF.", icon: "word", category: "Convert to PDF", status: "soon", accent: "#2563EB" },

  // ---- Convert from PDF ----
  { slug: "pdf-to-jpg", name: "PDF to JPG", tagline: "PDF pages to images", desc: "Turn each page of a PDF into a JPG image, downloaded as a zip.", icon: "image", category: "Convert from PDF", status: "live", accent: "#0EA5A5" },
  { slug: "pdf-to-excel", name: "PDF to Excel", tagline: "Tables to a spreadsheet", desc: "Pull the text and tables out of a PDF into an editable Excel file. Best on simple layouts.", icon: "table", category: "Convert from PDF", status: "live", accent: "#059669" },
  { slug: "pdf-to-word", name: "PDF to Word", tagline: "PDF to editable DOCX", desc: "Convert a PDF into an editable Word document.", icon: "word", category: "Convert from PDF", status: "soon", accent: "#2563EB" },
  { slug: "pdf-to-ppt", name: "PDF to PPT", tagline: "PDF to slides", desc: "Convert a PDF into a PowerPoint deck.", icon: "ppt", category: "Convert from PDF", status: "soon", accent: "#EA580C" },

  // ---- PDF Security ----
  { slug: "protect-pdf", name: "Protect PDF", tagline: "Add a password", desc: "Encrypt a PDF with a password so only people with it can open the file.", icon: "shield", category: "PDF Security", status: "live", accent: "#1E3A8A" },
  { slug: "pdf-password-remover", name: "Unlock PDF", tagline: "Remove a password", desc: "Remove the password from a PDF you can already open, and download an unlocked copy.", icon: "lock", category: "PDF Security", status: "live", accent: "#2563EB" },
  { slug: "watermark-pdf", name: "Watermark PDF", tagline: "Stamp text on pages", desc: "Add a text watermark across every page of a PDF.", icon: "stamp", category: "PDF Security", status: "live", accent: "#DB2777" },
  { slug: "sign-pdf", name: "Sign PDF", tagline: "Add your signature", desc: "Place a signature image onto a PDF page.", icon: "sign", category: "PDF Security", status: "soon", accent: "#0F766E" },

  // ---- Image ----
  { slug: "compress-image", name: "Compress Image", tagline: "Shrink JPG, PNG, WebP", desc: "Make images smaller without a visible drop in quality. Great for faster sites and email.", icon: "image", category: "Image", status: "live", accent: "#0EA5A5" },

  // ---- Generate ----
  { slug: "invoice-generator", name: "Invoice Generator", tagline: "Create invoices in seconds", desc: "Fill in your details, pick one of 10 templates, and download a clean PDF invoice.", icon: "invoice", category: "Generate", status: "live", accent: "#F59E0B" },

  // ---- Transcribe ----
  { slug: "audio-to-text", name: "Audio to Text", tagline: "Transcribe audio", desc: "Turn a recording into text with on-device speech recognition, no uploads and no account.", icon: "wave", category: "Transcribe", status: "soon", accent: "#0EA5A5" },
  { slug: "video-to-text", name: "Video to Text", tagline: "Transcribe video", desc: "Pull a clean transcript out of a video, right in your browser.", icon: "play", category: "Transcribe", status: "soon", accent: "#EF4444" },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);

export function toolsByCategory() {
  return categories
    .map((c) => ({ ...c, items: tools.filter((t) => t.category === c.id) }))
    .filter((c) => c.items.length);
}

// Recommend other tools: same category first, then other live tools.
export function getRelated(slug, limit = 4) {
  const self = getTool(slug);
  const live = tools.filter((t) => t.slug !== slug && t.status === "live");
  if (!self) return live.slice(0, limit);
  const sameCat = live.filter((t) => t.category === self.category);
  const rest = live.filter((t) => t.category !== self.category);
  return [...sameCat, ...rest].slice(0, limit);
}
