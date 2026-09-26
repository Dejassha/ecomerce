import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5500",
        changeOrigin: true,
      },
      "/media": {
        target: "http://127.0.0.1:5500",
        changeOrigin: true,
      },
    },
  },
});
