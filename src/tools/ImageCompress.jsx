import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob, prettyBytes } from "./helpers";

const ACCENT = getTool("compress-image").accent;

export default function ImageCompress() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [maxW, setMaxW] = useState(2000);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  async function onFiles(files) {
    setResult(null);
    const f = files[0];
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
  }

  async function compress() {
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, maxW / bitmap.width);
      const w = Math.round(bitmap.width * scale);
      const h = Math.round(bitmap.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0, w, h);
      const type = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await new Promise((res) =>
        canvas.toBlob(res, type === "image/png" ? "image/webp" : "image/jpeg", quality / 100)
      );
      const outType = type === "image/png" ? "webp" : "jpg";
      const name = file.name.replace(/\.[^.]+$/, "") + "-compressed." + outType;
      setResult({ blob, name, from: file.size, to: blob.size, w, h });
    } finally {
      setBusy(false);
    }
  }

  const saved = result ? Math.max(0, Math.round((1 - result.to / result.from) * 100)) : 0;

  return (
    <ToolShell slug="compress-image">
      <div className="rounded-2xl border border-border-subtle bg-surface-main p-6 shadow-sm sm:p-8">
        <FileDrop
          onFiles={onFiles}
          accept="image/*"
          accent={ACCENT}
          label="Drop an image here, or click to choose"
          hint="JPG, PNG or WebP"
          files={file ? [file] : []}
        />

        {file && (
          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700">
                <span>Quality</span>
                <span>{quality}%</span>
              </div>
              <input type="range" min="30" max="95" value={quality} onChange={(e) => setQuality(+e.target.value)} className="mt-1 w-full" style={{ accentColor: ACCENT }} />
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700">
                <span>Max width</span>
                <span>{maxW}px</span>
              </div>
              <input type="range" min="600" max="4000" step="100" value={maxW} onChange={(e) => setMaxW(+e.target.value)} className="mt-1 w-full" style={{ accentColor: ACCENT }} />
            </div>
            <button onClick={compress} disabled={busy} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
              {busy ? "Compressing…" : "Compress image"}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
            <p className="font-display text-lg font-semibold text-emerald-800">
              {prettyBytes(result.from)} &rarr; {prettyBytes(result.to)} ({saved}% smaller)
            </p>
            <p className="mt-1 text-sm text-emerald-700">{result.w}&times;{result.h}px</p>
            <button onClick={() => downloadBlob(result.blob, result.name)} className="mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white" style={{ background: ACCENT }}>
              Download {result.name}
            </button>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
