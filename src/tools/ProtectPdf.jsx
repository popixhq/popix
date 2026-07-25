import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

const ACCENT = getTool("protect-pdf").accent;
let mupdfPromise = null;
const loadMupdf = () => (mupdfPromise ||= import("mupdf"));

export default function ProtectPdf() {
  const [file, setFile] = useState(null);
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function protect() {
    if (!file || !pw) return;
    setBusy(true); setError("");
    let doc;
    try {
      const mupdf = await loadMupdf();
      const buf = new Uint8Array(await file.arrayBuffer());
      doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      if (doc.needsPassword && doc.needsPassword()) {
        setError("This PDF already has a password.");
        return;
      }
      const esc = pw.replace(/,/g, "");
      const out = doc.saveToBuffer(`encrypt=aes-256,user-password=${esc},owner-password=${esc}`).asUint8Array();
      downloadBlob(new Blob([out], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "-protected.pdf");
    } catch (e) {
      setError("Couldn't protect this PDF. It may be corrupted.");
    } finally { doc?.destroy?.(); setBusy(false); }
  }

  return (
    <ToolShell slug="protect-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept="application/pdf,.pdf" accent={ACCENT} label="Drop a PDF here, or click to choose" hint="Your PDF stays on your device" files={file ? [file] : []} />
        {file && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Choose a password for the PDF" className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm outline-none focus:border-slate-400" />
              <p className="mt-1 text-xs text-slate-400">Commas are removed. Keep your password safe, it cannot be recovered.</p>
            </div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button onClick={protect} disabled={busy || !pw} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
              {busy ? "Protecting…" : "Protect PDF & download"}
            </button>
          </div>
        )}
        {error && !file && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </div>
    </ToolShell>
  );
}
