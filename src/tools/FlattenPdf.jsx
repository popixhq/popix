import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("flatten-pdf").accent;

export default function FlattenPdf() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onFiles(f) { setError(""); setDone(false); setFile(f[0] || null); }

  async function flatten() {
    if (!file) return;
    setBusy(true); setError(""); setDone(false);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      try {
        const form = pdf.getForm();
        form.flatten();
      } catch { /* no form fields, nothing to flatten */ }
      const out = await pdf.save();
      downloadBlob(new Blob([out], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "-flattened.pdf");
      setDone(true);
    } catch (e) {
      setError("Couldn't flatten this PDF. Make sure it is a valid, unlocked file.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="flatten-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Flattens form fields into the page" files={file ? [file] : []} />
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Flattening turns fillable form fields into fixed page content, so the values can no longer be edited and the PDF looks the same in every viewer.
        </p>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {done && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Done. Your flattened PDF has downloaded.</p>}
        {file && (
          <button onClick={flatten} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Flattening…" : "Flatten PDF & download"}
          </button>
        )}
      </div>
    </ToolShell>
  );
}
