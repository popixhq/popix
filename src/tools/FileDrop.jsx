import { useState } from "react";
import MaterialIcon from "./MaterialIcon";

// Reusable file dropzone in the Stitch style. Calls onFiles(File[]).
export default function FileDrop({
  onFiles,
  accept = "",
  multiple = false,
  label = "Click to upload or drag and drop",
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
      className={`group relative flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
        over ? "border-primary bg-surface-container-low" : "border-outline-variant bg-surface-main hover:border-primary"
      }`}
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-surface-container text-primary transition-transform group-hover:scale-110">
        <MaterialIcon name="upload_file" className="text-[40px]" />
      </span>
      <span>
        <span className="block font-jakarta text-xl font-semibold text-primary">
          {files.length ? (files.length === 1 ? files[0].name : `${files.length} files selected`) : label}
        </span>
        <span className="mt-1 block text-sm text-text-muted">{hint}</span>
      </span>
      <input type="file" accept={accept} multiple={multiple} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={(e) => handle(e.target.files)} />
    </label>
  );
}
