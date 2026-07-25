import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob, prettyBytes } from "./helpers";

const ACCENT = getTool("merge-pdf").accent;

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function addFiles(list) {
    setError("");
    const pdfs = list.filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    setFiles((prev) => [...prev, ...pdfs]);
  }
  const move = (i, dir) => {
    setFiles((prev) => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return prev;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  };
  const remove = (i) => setFiles((prev) => prev.filter((_, k) => k !== i));

  async function merge() {
    if (files.length < 2) return;
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "merged.pdf");
    } catch (e) {
      setError("Couldn't merge these files. Make sure they're valid, unlocked PDFs.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolShell slug="merge-pdf">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={addFiles} accept="application/pdf,.pdf" multiple accent={ACCENT} label="Drop PDFs here, or click to choose" hint="Add two or more PDFs" />

        {files.length > 0 && (
          <ul className="mt-5 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-black/5 bg-slate-50 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-xs font-bold text-slate-500">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{f.name}</span>
                <span className="text-xs text-slate-400">{prettyBytes(f.size)}</span>
                <button onClick={() => move(i, -1)} className="px-1 text-slate-400 hover:text-slate-700" aria-label="Move up">&uarr;</button>
                <button onClick={() => move(i, 1)} className="px-1 text-slate-400 hover:text-slate-700" aria-label="Move down">&darr;</button>
                <button onClick={() => remove(i)} className="px-1 text-slate-400 hover:text-red-500" aria-label="Remove">&times;</button>
              </li>
            ))}
          </ul>
        )}

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <button onClick={merge} disabled={busy || files.length < 2} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
          {busy ? "Merging…" : `Merge ${files.length || ""} PDFs & download`}
        </button>
      </div>
    </ToolShell>
  );
}
