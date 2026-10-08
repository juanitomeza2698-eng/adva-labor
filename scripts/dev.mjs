import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
const args = process.argv.slice(2);
// Keep normal Next development. The supervised review forwards Vite-specific flags.
const isReview = args.includes("--strictPort");
const command = isReview
  ? [
      "node_modules/vite/bin/vite.js",
      "--config",
      "preview/vite.config.ts",
      ...args,
    ]
  : ["node_modules/next/dist/bin/next", "dev", "--turbo", ...args];
const child = spawn(process.execPath, command, {
  stdio: "inherit",
  cwd: fileURLToPath(new URL("..", import.meta.url)),
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
