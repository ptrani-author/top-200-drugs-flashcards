// FILE: tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071E59",
        blue: "#092A72",
        gold: "#F4D04E",
        deepNavy: "#031447",
        white: "#FFFFFF"
      },
      boxShadow: {
        premium: "0 12px 30px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;
