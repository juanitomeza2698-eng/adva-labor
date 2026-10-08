import { defineConfig, type Plugin } from "vite";
import { fileURLToPath } from "node:url";
import { POST } from "../app/api/redesign/bid/route";

const previewApi: Plugin = {
  name: "adva-preview-bid-validation",
  configureServer(server) {
    server.middlewares.use("/api/redesign/bid", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Allow", "POST");
        res.end("Method not allowed");
        return;
      }
      const chunks: Uint8Array[] = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 16384) {
          res.statusCode = 413;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "The request is too large." }));
          return;
        }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers))
        if (value)
          headers.set(key, Array.isArray(value) ? value.join(",") : value);
      const request = new Request(
        `http://${req.headers.host}/api/redesign/bid`,
        { method: "POST", headers, body: Buffer.concat(chunks) },
      );
      const result = await POST(request);
      res.statusCode = result.status;
      result.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(await result.text());
    });
  },
};

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  base: "./",
  plugins: [previewApi],
  resolve: {
    alias: { "@": fileURLToPath(new URL("../src", import.meta.url)) },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    fs: { allow: [fileURLToPath(new URL("..", import.meta.url))] },
  },
  build: {
    outDir: fileURLToPath(new URL("../dist/review", import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
  oxc: { jsx: { runtime: "automatic" } },
});
