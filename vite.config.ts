import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://52.78.53.247:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("[Proxy Error]", err);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log("[Proxy Request]", req.method, req.url);
              // CORS 헤더 추가
              proxyReq.setHeader("Origin", "http://localhost:5173");
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log("[Proxy Response]", proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            utils: ["axios", "zustand", "@tanstack/react-query"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
