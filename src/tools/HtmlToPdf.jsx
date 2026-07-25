import { useRef, useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { elementToPdf } from "./helpers";

const ACCENT = getTool("html-to-pdf").accent;

export default function HtmlToPdf() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const stageRef = useRef(null);

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function convert() {
    if (!file) return;
    setBusy(true); setError("");
    try {
      let html = await file.text();
      // keep only the body content if a full document was provided
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) html = bodyMatch[1];
      const stage = stageRef.current;
      stage.innerHTML = html;
      await elementToPdf(stage, file.name.replace(/\.[^.]+$/, "") + ".pdf");
    } catch (e) {
      setError("Couldn't convert this file. Try an HTML file with inline styles.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="html-to-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept=".html,.htm,text/html" accent={ACCENT} label="Drop an HTML file here, or click to choose" hint="Works best with self-contained, inline-styled HTML" files={file ? [file] : []} />
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          External stylesheets, fonts and images that are not embedded in the file will not load. For best results use HTML with inline styles.
        </p>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {file && (
          <button onClick={convert} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Converting…" : "Convert to PDF & download"}
          </button>
        )}
      </div>
      <div ref={stageRef} style={{ position: "fixed", left: -99999, top: 0, width: 760, background: "#fff", padding: 24 }} aria-hidden="true" />
    </ToolShell>
  );
}
