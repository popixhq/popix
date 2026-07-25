import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob, prettyBytes } from "./helpers";

const ACCENT = getTool("jpg-to-pdf").accent;

export default function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function add(list) {
    setError("");
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    setFiles((p) => [...p, ...imgs]);
  }
  const move = (i, dir) => setFiles((p) => {
    const a = [...p]; const j = i + dir; if (j < 0 || j >= a.length) return p;
    [a[i], a[j]] = [a[j], a[i]]; return a;
  });
  const remove = (i) => setFiles((p) => p.filter((_, k) => k !== i));

  async function make() {
    if (!files.length) return;
    setBusy(true); setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const isPng = f.type === "image/png";
        const img = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(await toJpeg(f));
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const out = await pdf.save();
      downloadBlob(new Blob([out], { type: "application/pdf" }), "images.pdf");
    } catch (e) {
      setError("Couldn't build the PDF. Please use JPG or PNG images.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="jpg-to-pdf">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={add} accept="image/*" multiple accent={ACCENT} label="Drop images here, or click to choose" hint="JPG or PNG, add as many as you like" />
        {files.length > 0 && (
          <ul className="mt-5 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-black/5 bg-slate-50 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-xs font-bold text-slate-500">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{f.name}</span>
                <span className="text-xs text-slate-400">{prettyBytes(f.size)}</span>
                <button onClick={() => move(i, -1)} className="px-1 text-slate-400 hover:text-slate-700">&uarr;</button>
                <button onClick={() => move(i, 1)} className="px-1 text-slate-400 hover:text-slate-700">&darr;</button>
                <button onClick={() => remove(i)} className="px-1 text-slate-400 hover:text-red-500">&times;</button>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        <button onClick={make} disabled={busy || !files.length} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
          {busy ? "Building…" : "Create PDF & download"}
        </button>
      </div>
    </ToolShell>
  );
}

// pdf-lib only embeds baseline JPG/PNG; re-encode anything else to JPEG via canvas.
async function toJpeg(file) {
  const bmp = await createImageBitmap(file);
  const c = document.createElement("canvas");
  c.width = bmp.width; c.height = bmp.height;
  c.getContext("2d").drawImage(bmp, 0, 0);
  const blob = await new Promise((r) => c.toBlob(r, "image/jpeg", 0.92));
  return new Uint8Array(await blob.arrayBuffer());
}
