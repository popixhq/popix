import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("pdf-to-excel").accent;
let mupdfPromise = null;
const loadMupdf = () => (mupdfPromise ||= import("mupdf"));

export default function PdfToExcel() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(files) {
    setError("");
    setFile(files[0] || null);
  }

  async function convert() {
    if (!file) return;
    setBusy(true);
    setError("");
    let doc;
    try {
      const mupdf = await loadMupdf();
      const XLSX = await import("xlsx");
      const buf = new Uint8Array(await file.arrayBuffer());
      doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      if (doc.needsPassword && doc.needsPassword()) {
        setError("This PDF is password-protected. Unlock it first with the PDF Password Remover.");
        return;
      }
      const wb = XLSX.utils.book_new();
      const pages = doc.countPages();
      for (let i = 0; i < pages; i++) {
        const page = doc.loadPage(i);
        const stext = page.toStructuredText("preserve-whitespace");
        const data = JSON.parse(stext.asJSON());
        const rows = [];
        for (const block of data.blocks || []) {
          for (const line of block.lines || []) {
            const text = (line.text || "").replace(/\s+$/, "");
            if (text.trim() === "") continue;
            // split into cells on runs of 2+ spaces (common table gap)
            rows.push(text.split(/\s{2,}/).map((c) => c.trim()));
          }
        }
        stext.destroy?.();
        page.destroy?.();
        const ws = XLSX.utils.aoa_to_sheet(rows.length ? rows : [[""]]);
        XLSX.utils.book_append_sheet(wb, ws, `Page ${i + 1}`.slice(0, 31));
      }
      const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      downloadBlob(new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), file.name.replace(/\.pdf$/i, "") + ".xlsx");
    } catch (e) {
      setError("Couldn't read this PDF. Scanned or image-only PDFs have no extractable text.");
    } finally {
      doc?.destroy?.();
      setBusy(false);
    }
  }

  return (
    <ToolShell slug="pdf-to-excel">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Your PDF stays on your device" files={file ? [file] : []} />
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Works best on PDFs with real text and simple tables. Scanned or image-only PDFs won't have extractable text.
        </p>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {file && (
          <button onClick={convert} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Extracting…" : "Convert to Excel & download"}
          </button>
        )}
      </div>
    </ToolShell>
  );
}
