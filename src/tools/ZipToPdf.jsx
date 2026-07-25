import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("zip-to-pdf").accent;

export default function ZipToPdf() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function convert() {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const JSZip = (await import("jszip")).default;
      const { PDFDocument } = await import("pdf-lib");
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const entries = Object.values(zip.files)
        .filter((e) => !e.dir && /\.(jpe?g|png)$/i.test(e.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      if (!entries.length) { setError("No JPG or PNG images were found in that zip."); return; }
      const pdf = await PDFDocument.create();
      for (const e of entries) {
        const bytes = await e.async("uint8array");
        const isPng = /\.png$/i.test(e.name);
        const img = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const out = await pdf.save();
      downloadBlob(new Blob([out], { type: "application/pdf" }), file.name.replace(/\.zip$/i, "") + ".pdf");
    } catch (e) {
      setError("Couldn't read that zip. Make sure it contains JPG or PNG images.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="zip-to-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept=".zip,application/zip" accent={ACCENT} label="Drop a .zip here, or click to choose" hint="A zip of JPG or PNG images" files={file ? [file] : []} />
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {file && (
          <button onClick={convert} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Building…" : "Convert to PDF & download"}
          </button>
        )}
      </div>
    </ToolShell>
  );
}
