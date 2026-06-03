import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // Trata los .xlsx como assets para poder importarlos con ?url
  assetsInclude: ["**/*.xlsx"],
});
