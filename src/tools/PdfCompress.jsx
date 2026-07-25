import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob, prettyBytes } from "./helpers";

const ACCENT = getTool("compress-pdf").accent;
let mupdfPromise = null;
const loadMupdf = () => (mupdfPromise ||= import("mupdf"));

export default function PdfCompress() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function onFiles(files) {
    setResult(null);
    setError("");
    setFile(files[0] || null);
  }

  async function compress() {
    if (!file) return;
    setBusy(true);
    setError("");
    setResult(null);
    let doc;
    try {
      const mupdf = await loadMupdf();
      const buf = new Uint8Array(await file.arrayBuffer());
      doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      if (doc.needsPassword && doc.needsPassword()) {
        setError("This PDF is password-protected. Unlock it first with the PDF Password Remover.");
        return;
      }
      const out = doc
        .saveToBuffer("compress,compress-images,compress-fonts,garbage=compact,sanitize")
        .asUint8Array();
      const blob = new Blob([out], { type: "application/pdf" });
      const name = file.name.replace(/\.pdf$/i, "") + "-compressed.pdf";
      setResult({ blob, name, from: file.size, to: blob.size });
    } catch (e) {
      setError("Couldn't compress this PDF. It may be corrupted.");
    } finally {
      doc?.destroy?.();
      setBusy(false);
    }
  }

  const saved = result ? Math.round((1 - result.to / result.from) * 100) : 0;

  return (
    <ToolShell slug="compress-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Your PDF stays on your device" files={file ? [file] : []} />

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        {file && !result && (
          <button onClick={compress} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Compressing…" : "Compress PDF"}
          </button>
        )}

        {result && (
          <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
            <p className="font-display text-lg font-semibold text-emerald-800">
              {prettyBytes(result.from)} &rarr; {prettyBytes(result.to)}
              {saved > 0 ? ` (${saved}% smaller)` : ""}
            </p>
            {saved <= 0 && (
              <p className="mt-1 text-sm text-emerald-700">This PDF was already well optimized.</p>
            )}
            <button onClick={() => downloadBlob(result.blob, result.name)} className="mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white" style={{ background: ACCENT }}>
              Download {result.name}
            </button>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
