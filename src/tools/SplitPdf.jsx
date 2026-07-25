import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("split-pdf").accent;

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("range"); // "range" | "each"
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(files) {
    setError("");
    const f = files[0];
    if (!f) return;
    setFile(f);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setCount(doc.getPageCount());
    } catch {
      setError("Couldn't read this PDF.");
      setCount(0);
    }
  }

  // parse "1-3,5,8-10" into zero-based indices
  function parseRange(str, max) {
    const out = new Set();
    for (const part of str.split(",").map((s) => s.trim()).filter(Boolean)) {
      const m = part.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) continue;
      const a = +m[1];
      const b = m[2] ? +m[2] : a;
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) if (i >= 1 && i <= max) out.add(i - 1);
    }
    return [...out].sort((x, y) => x - y);
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const base = file.name.replace(/\.pdf$/i, "");

      if (mode === "range") {
        const idx = parseRange(range, count);
        if (!idx.length) { setError("Enter a valid page range, for example 1-3, 5."); return; }
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, idx);
        pages.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), `${base}-pages.pdf`);
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        for (let i = 0; i < count; i++) {
          const out = await PDFDocument.create();
          const [p] = await out.copyPages(src, [i]);
          out.addPage(p);
          const bytes = await out.save();
          zip.file(`${base}-page-${i + 1}.pdf`, bytes);
        }
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, `${base}-pages.zip`);
      }
    } catch (e) {
      setError("Couldn't split this PDF. Make sure it's a valid, unlocked file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolShell slug="split-pdf">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Your PDF stays on your device" files={file ? [file] : []} />

        {count > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-500">This PDF has {count} page{count === 1 ? "" : "s"}.</p>
            <div className="flex gap-2">
              {[["range", "Extract a page range"], ["each", "Split into single pages (zip)"]].map(([m, label]) => (
                <button key={m} onClick={() => setMode(m)} className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium ${mode === m ? "text-white" : "border-slate-200 bg-white text-slate-600"}`} style={mode === m ? { background: ACCENT, borderColor: ACCENT } : {}}>
                  {label}
                </button>
              ))}
            </div>
            {mode === "range" && (
              <input value={range} onChange={(e) => setRange(e.target.value)} placeholder="e.g. 1-3, 5, 8-10" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
            )}
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button onClick={run} disabled={busy} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
              {busy ? "Working…" : mode === "range" ? "Extract pages & download" : "Split & download zip"}
            </button>
          </div>
        )}
        {error && count === 0 && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </div>
    </ToolShell>
  );
}
