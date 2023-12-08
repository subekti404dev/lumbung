import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA as vitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePWA({
      registerType: "autoUpdate",
      filename: "service-worker.js",
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: false,
        globPatterns: ["**/*.{js,css,ico,png,svg}"],
      },
    }),
  ],
  server: {
    port: 3003,
  },
});
