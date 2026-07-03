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
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        bricolage: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
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
