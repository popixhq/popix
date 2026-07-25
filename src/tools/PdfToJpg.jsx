import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("pdf-to-jpg").accent;
let mupdfPromise = null;
const loadMupdf = () => (mupdfPromise ||= import("mupdf"));

export default function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function convert() {
    if (!file) return;
    setBusy(true); setError("");
    let doc;
    try {
      const mupdf = await loadMupdf();
      const JSZip = (await import("jszip")).default;
      const buf = new Uint8Array(await file.arrayBuffer());
      doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      if (doc.needsPassword && doc.needsPassword()) {
        setError("This PDF is password-protected. Unlock it first with Unlock PDF.");
        return;
      }
      const zip = new JSZip();
      const base = file.name.replace(/\.pdf$/i, "");
      const pages = doc.countPages();
      const matrix = mupdf.Matrix.scale(scale, scale);
      for (let i = 0; i < pages; i++) {
        const page = doc.loadPage(i);
        const pix = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false);
        const png = pix.asPNG();
        const jpg = await pngToJpeg(png);
        zip.file(`${base}-page-${i + 1}.jpg`, jpg);
        pix.destroy?.();
        page.destroy?.();
      }
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `${base}-images.zip`);
    } catch (e) {
      setError("Couldn't convert this PDF. It may be corrupted.");
    } finally {
      doc?.destroy?.();
      setBusy(false);
    }
  }

  return (
    <ToolShell slug="pdf-to-jpg">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Each page becomes a JPG" files={file ? [file] : []} />
        {file && (
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700"><span>Quality (resolution)</span><span>{scale}x</span></div>
              <input type="range" min="1" max="4" step="1" value={scale} onChange={(e) => setScale(+e.target.value)} className="mt-1 w-full" style={{ accentColor: ACCENT }} />
            </div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button onClick={convert} disabled={busy} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
              {busy ? "Converting…" : "Convert to JPG & download zip"}
            </button>
          </div>
        )}
        {error && !file && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </div>
    </ToolShell>
  );
}

async function pngToJpeg(pngBytes) {
  const bmp = await createImageBitmap(new Blob([pngBytes], { type: "image/png" }));
  const c = document.createElement("canvas");
  c.width = bmp.width; c.height = bmp.height;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bmp, 0, 0);
  return await new Promise((r) => c.toBlob(r, "image/jpeg", 0.9));
}
