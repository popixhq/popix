import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("watermark-pdf").accent;

export default function WatermarkPdf() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(20);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function apply() {
    if (!file || !text) return;
    setBusy(true); setError("");
    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");
      const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      for (const page of pdf.getPages()) {
        const { width, height } = page.getSize();
        const size = Math.max(24, Math.min(width, height) / 10);
        const tw = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: width / 2 - tw / 2,
          y: height / 2,
          size,
          font,
          color: rgb(0.5, 0.5, 0.5),
          rotate: degrees(45),
          opacity: opacity / 100,
        });
      }
      const out = await pdf.save();
      downloadBlob(new Blob([out], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
    } catch (e) {
      setError("Couldn't watermark this PDF. Make sure it is a valid, unlocked file.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="watermark-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Your PDF stays on your device" files={file ? [file] : []} />
        {file && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Watermark text</label>
              <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm outline-none focus:border-slate-400" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700"><span>Opacity</span><span>{opacity}%</span></div>
              <input type="range" min="5" max="60" value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="mt-1 w-full" style={{ accentColor: ACCENT }} />
            </div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button onClick={apply} disabled={busy || !text} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
              {busy ? "Applying…" : "Add watermark & download"}
            </button>
          </div>
        )}
        {error && !file && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </div>
    </ToolShell>
  );
}
