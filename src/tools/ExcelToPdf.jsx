import { useRef, useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { elementToPdf } from "./helpers";

const ACCENT = getTool("excel-to-pdf").accent;

export default function ExcelToPdf() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const stageRef = useRef(null);

  function onFiles(files) {
    setError("");
    setFile(files[0] || null);
  }

  async function convert() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const stage = stageRef.current;
      stage.innerHTML = "";
      wb.SheetNames.forEach((name) => {
        const html = XLSX.utils.sheet_to_html(wb.Sheets[name], { editable: false });
        const block = document.createElement("div");
        block.style.marginBottom = "24px";
        block.innerHTML =
          `<h2 style="font:600 16px Inter,system-ui;margin:0 0 8px;color:#101828">${name}</h2>` + html;
        const table = block.querySelector("table");
        if (table) {
          table.style.cssText =
            "width:100%;border-collapse:collapse;font:12px Inter,system-ui;color:#101828";
          block.querySelectorAll("td,th").forEach((c) => {
            c.style.cssText = "border:1px solid #e2e8f0;padding:6px 8px;text-align:left";
          });
        }
        stage.appendChild(block);
      });
      await elementToPdf(stage, file.name.replace(/\.[^.]+$/, "") + ".pdf");
    } catch (e) {
      setError("Couldn't convert this file. Please use a valid .xlsx, .xls or .csv.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolShell slug="excel-to-pdf">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <FileDrop onFiles={onFiles} accept=".xlsx,.xls,.csv" accent={ACCENT} label="Drop a spreadsheet here, or click to choose" hint="XLSX, XLS or CSV" files={file ? [file] : []} />
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {file && (
          <button onClick={convert} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Converting…" : "Convert to PDF & download"}
          </button>
        )}
      </div>
      {/* off-screen render stage for the PDF snapshot */}
      <div ref={stageRef} style={{ position: "fixed", left: -99999, top: 0, width: 760, background: "#fff", padding: 24 }} aria-hidden="true" />
    </ToolShell>
  );
}
