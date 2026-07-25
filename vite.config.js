import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // mupdf ships its own WASM and uses top-level await → needs a modern target.
  build: { target: "esnext" },
  optimizeDeps: { exclude: ["mupdf"], esbuildOptions: { target: "esnext" } },
});
