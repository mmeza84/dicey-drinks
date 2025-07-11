import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
    },
  },
});
