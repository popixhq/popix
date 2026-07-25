import { useState } from "react";
import ToolShell from "./ToolShell";
import FileDrop from "./FileDrop";
import { getTool } from "./toolsData";
import { downloadBlob } from "./helpers";

// Whisper model runs fully in the browser. Loaded once, then cached.
const MODEL = "Xenova/whisper-tiny.en";
let pipePromise = null;

async function getTranscriber(onProgress) {
  if (pipePromise) return pipePromise;
  pipePromise = (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");
    env.allowLocalModels = false;
    const device = typeof navigator !== "undefined" && navigator.gpu ? "webgpu" : "wasm";
    return pipeline("automatic-speech-recognition", MODEL, { device, progress_callback: onProgress });
  })();
  return pipePromise;
}

// Decode any audio/video file to a 16kHz mono Float32Array for Whisper.
async function decodeTo16k(file) {
  const buf = await file.arrayBuffer();
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  const decoded = await ctx.decodeAudioData(buf);
  ctx.close?.();
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const off = new Offline(1, Math.ceil(decoded.duration * 16000), 16000);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const rendered = await off.startRendering();
  return rendered.getChannelData(0);
}

export default function Transcribe({ slug }) {
  const tool = getTool(slug);
  const ACCENT = tool.accent;
  const isVideo = slug === "video-to-text";
  const [file, setFile] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | model | decode | run | done | error
  const [pct, setPct] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function onFiles(f) { setError(""); setText(""); setPhase("idle"); setFile(f[0] || null); }

  async function run() {
    if (!file) return;
    setError(""); setText("");
    try {
      setPhase("model");
      const transcriber = await getTranscriber((p) => {
        if (p.status === "progress" && p.total) setPct(Math.round((p.loaded / p.total) * 100));
      });
      setPhase("decode");
      let audio;
      try {
        audio = await decodeTo16k(file);
      } catch {
        throw new Error(isVideo
          ? "Couldn't read the audio from this video. Try an MP4 or WebM file."
          : "Couldn't read this audio file. Try MP3, WAV, M4A or WebM.");
      }
      setPhase("run");
      const out = await transcriber(audio, { chunk_length_s: 30, stride_length_s: 5 });
      setText((out.text || "").trim() || "(no speech detected)");
      setPhase("done");
    } catch (e) {
      setError(e.message || "Something went wrong while transcribing.");
      setPhase("error");
    }
  }

  const busy = ["model", "decode", "run"].includes(phase);
  const phaseLabel = {
    model: pct ? `Loading speech model, ${pct}% (first time only)` : "Loading speech model (first time only)",
    decode: "Reading the audio",
    run: "Transcribing on your device",
  }[phase];

  return (
    <ToolShell slug={slug}>
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <FileDrop
          onFiles={onFiles}
          accept={isVideo ? "video/*" : "audio/*"}
          accent={ACCENT}
          label={isVideo ? "Drop a video here, or click to choose" : "Drop an audio file here, or click to choose"}
          hint={isVideo ? "MP4, WebM, MOV" : "MP3, WAV, M4A, WebM"}
          files={file ? [file] : []}
        />

        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          The first run downloads a small speech model (about 40 MB) from a CDN, then it is cached.
          Your {isVideo ? "video" : "audio"} is processed on your device and never uploaded. Best on
          clear English speech and shorter clips.
        </p>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        {file && phase !== "done" && (
          <button onClick={run} disabled={busy} className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60" style={{ background: ACCENT }}>
            {busy ? phaseLabel : "Transcribe"}
          </button>
        )}

        {text && (
          <div className="mt-6">
            <textarea readOnly value={text} rows={10} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => navigator.clipboard?.writeText(text)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Copy text</button>
              <button onClick={() => downloadBlob(new Blob([text], { type: "text/plain" }), file.name.replace(/\.[^.]+$/, "") + ".txt")} className="rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ background: ACCENT }}>Download .txt</button>
              <button onClick={() => { setText(""); setPhase("idle"); }} className="rounded-xl px-4 py-2 text-sm text-slate-500 hover:text-slate-800">Transcribe another</button>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
