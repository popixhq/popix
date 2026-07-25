// Free browser tools. Add an entry here + a route in App.jsx to ship a new one.
// Everything runs in the visitor's browser — files never leave their device.

export const tools = [
  {
    slug: "pdf-password-remover",
    name: "PDF Password Remover",
    tagline: "Unlock a password-protected PDF",
    desc: "Remove the password from a PDF you can already open, and download an unlocked copy. Runs entirely in your browser.",
    icon: "lock",
    category: "PDF",
    status: "live",
    accent: "#4E5FB5",
  },
  {
    slug: "audio-to-text",
    name: "Audio to Text",
    tagline: "Transcribe audio files",
    desc: "Turn an audio recording into text with on-device speech recognition — no uploads, no account.",
    icon: "wave",
    category: "Transcribe",
    status: "soon",
    accent: "#0EA5A5",
  },
  {
    slug: "video-to-text",
    name: "Video to Text",
    tagline: "Transcribe video files",
    desc: "Pull a clean transcript out of a video, right in your browser. Great for captions and notes.",
    icon: "play",
    category: "Transcribe",
    status: "soon",
    accent: "#E5397E",
  },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);
