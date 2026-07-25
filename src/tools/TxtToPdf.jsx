import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";

const ACCENT = getTool("txt-to-pdf").accent;

export default function TxtToPdf() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setFile(f[0] || null); }

  async function convert() {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const text = await file.text();
      const jspdfMod = await import("jspdf");
      const jsPDF = jspdfMod.jsPDF || jspdfMod.default;
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 48;
      const width = pdf.internal.pageSize.getWidth() - margin * 2;
      const height = pdf.internal.pageSize.getHeight() - margin * 2;
      pdf.setFont("courier", "normal");
      pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(text.replace(/\t/g, "    "), width);
      const lineH = 15;
      let y = margin;
      for (const line of lines) {
        if (y > margin + height) { pdf.addPage(); y = margin; }
        pdf.text(line, margin, y);
        y += lineH;
      }
      pdf.save(file.name.replace(/\.[^.]+$/, "") + ".pdf");
    } catch (e) {
      setError("Couldn't convert this file.");
    } finally { setBusy(false); }
  }

  return (
    <ToolShell slug="txt-to-pdf">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept=".txt,text/plain" accent={ACCENT} label="Drop a .txt file here, or click to choose" hint="Plain text" files={file ? [file] : []} />
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {file && (
          <button onClick={convert} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Converting…" : "Convert to PDF & download"}
          </button>
        )}
      </div>
    </ToolShell>
  );
}
