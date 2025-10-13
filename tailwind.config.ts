import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6D28D9",
          dark: "#5B21B6",
          light: "#8B5CF6"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(109,40,217,0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;
