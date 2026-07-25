import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toolLink } from "./toolsBase";
import ToolIcon from "./ToolIcon";

const ACCENT = "#4E5FB5";

// mupdf is a large WASM module, loaded only when the tool is actually used.
let mupdfPromise = null;
const loadMupdf = () => (mupdfPromise ||= import("mupdf"));

export default function PdfUnlock() {
  const [file, setFile] = useState(null);
  const [needsPassword, setNeedsPassword] = useState(null); // null = unknown
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { url, name }
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function reset() {
    setNeedsPassword(null);
    setPassword("");
    setError("");
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
  }

  async function onPick(f) {
    reset();
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("That doesn't look like a PDF. Please choose a .pdf file.");
      return;
    }
    setFile(f);
    setBusy(true);
    try {
      const mupdf = await loadMupdf();
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      const requires = doc.needsPassword();
      doc.destroy?.();
      setNeedsPassword(requires);
    } catch (e) {
      setError("Couldn't read this PDF. It may be corrupted.");
    } finally {
      setBusy(false);
    }
  }

  async function unlock() {
    if (!file) return;
    setBusy(true);
    setError("");
    let doc;
    try {
      const mupdf = await loadMupdf();
      const buf = new Uint8Array(await file.arrayBuffer());
      doc = mupdf.PDFDocument.openDocument(buf, "application/pdf");
      if (doc.needsPassword()) {
        if (!doc.authenticatePassword(password)) {
          setError("That password didn't work. Double-check and try again.");
          return;
        }
      }
      const out = doc.saveToBuffer("encrypt=none,garbage=compact").asUint8Array();
      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.pdf$/i, "") + "-unlocked.pdf";
      setResult({ url, name });
    } catch (e) {
      setError("Something went wrong while unlocking. Please try another file.");
    } finally {
      doc?.destroy?.();
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <Link to={toolLink()} className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← All tools
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${ACCENT}1a`, color: ACCENT }}>
          <ToolIcon name="lock" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">PDF Password Remover</h1>
          <p className="text-slate-600">Remove the password from a PDF you can open.</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        {/* Dropzone */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); onPick(e.dataTransfer.files?.[0]); }}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver ? "border-[color:var(--a)] bg-[color:var(--a)]/5" : "border-border-subtle hover:border-slate-300"
          }`}
          style={{ "--a": ACCENT }}
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <ToolIcon name="file" className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-slate-700">
            {file ? file.name : "Drop a PDF here, or click to choose"}
          </span>
          <span className="text-xs text-slate-400">Your file stays on your device</span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0])}
          />
        </button>

        {/* Password (only if required) */}
        <AnimatePresence>
          {needsPassword && !result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="mt-5 block text-sm font-medium text-slate-700">Password for this PDF</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && password && unlock()}
                placeholder="Enter the password you use to open it"
                autoFocus
                className="mt-1.5 w-full rounded-xl border border-border-subtle px-4 py-3 text-sm outline-none focus:border-[color:var(--a)]"
                style={{ "--a": ACCENT }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {needsPassword === false && !result && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            This PDF has no open-password. Click below to remove any editing/printing
            restrictions and download a clean copy.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        {/* Action / result */}
        {result ? (
          <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
            <p className="font-display text-lg font-semibold text-emerald-800">Unlocked ✓</p>
            <p className="mt-1 text-sm text-emerald-700">Your PDF is ready to download.</p>
            <a
              href={result.url}
              download={result.name}
              className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: ACCENT }}
            >
              Download {result.name}
            </a>
            <button onClick={reset} className="mt-3 block w-full text-sm text-slate-500 hover:text-slate-800">
              Unlock another PDF
            </button>
          </div>
        ) : (
          needsPassword !== null && (
            <button
              onClick={unlock}
              disabled={busy || (needsPassword && !password)}
              className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ background: ACCENT }}
            >
              {busy ? "Working…" : "Remove password & download"}
            </button>
          )
        )}

        {busy && needsPassword === null && (
          <p className="mt-4 text-center text-sm text-slate-500">Reading your PDF…</p>
        )}
      </div>

      <div className="mt-6 space-y-2 text-sm text-slate-500">
        <p className="flex items-start gap-2">
          <span className="mt-0.5 text-emerald-600">✓</span>
          100% private. The PDF is processed in your browser and never uploaded.
        </p>
        <p className="flex items-start gap-2">
          <span className="mt-0.5 text-emerald-600">✓</span>
          Only works on PDFs you can already open. You provide the password, so this tool
          never cracks or bypasses protection you don't have.
        </p>
      </div>
    </section>
  );
}
