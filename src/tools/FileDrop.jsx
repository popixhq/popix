import { useState } from "react";
import ToolIcon from "./ToolIcon";

// Reusable file dropzone. Calls onFiles(File[]).
export default function FileDrop({
  onFiles,
  accept = "",
  multiple = false,
  accent = "#4E5FB5",
  label = "Drop a file here, or click to choose",
  hint = "Your file stays on your device",
  files = [],
}) {
  const [over, setOver] = useState(false);

  const handle = (list) => {
    const arr = Array.from(list || []);
    if (arr.length) onFiles(arr);
  };

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        over ? "bg-black/[0.03]" : "border-slate-200 hover:border-slate-300"
      }`}
      style={{ borderColor: over ? accent : undefined }}
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-500">
        <ToolIcon name="file" className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium text-slate-700">
        {files.length ? (files.length === 1 ? files[0].name : `${files.length} files selected`) : label}
      </span>
      <span className="text-xs text-slate-400">{hint}</span>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
    </label>
  );
}
