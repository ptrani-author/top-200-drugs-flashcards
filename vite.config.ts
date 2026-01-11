// FILE: vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base makes assets work on GitHub Pages under any repo path,
// as long as you do NOT rely on client-side routing (we don't).
export default defineConfig({
  base: "./",
  plugins: [react()]
});
