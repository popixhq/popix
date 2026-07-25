/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0b12",
          soft: "#14141f",
          card: "#1a1a28",
        },
        brand: {
          DEFAULT: "#7c5cff",
          light: "#a896ff",
          dark: "#5a3ee0",
        },
        accent: {
          DEFAULT: "#19e3c4",
          warm: "#ff7a59",
        },
        paper: "#f6f5ff",
        // Tools design system (from the Stitch mockups)
        primary: "#0F172A",
        "on-primary": "#ffffff",
        secondary: "#006c49",
        "secondary-container": "#6cf8bb",
        "on-secondary-container": "#00563a",
        surface: "#f8f9fb",
        "surface-main": "#ffffff",
        "surface-container": "#edeef0",
        "surface-container-low": "#f2f4f6",
        "on-surface": "#191c1e",
        "on-surface-variant": "#45474c",
        "border-subtle": "#E2E8F0",
        "text-muted": "#64748B",
        "outline-variant": "#c6c6cd",
        "error-tools": "#ba1a1a",
        "error-container": "#ffdad6",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        bricolage: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "1200px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-40px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blob: "blob 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
