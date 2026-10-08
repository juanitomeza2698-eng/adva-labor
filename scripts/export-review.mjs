import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Package the compiled review as a single offline artifact. Source remains in Git.
const root = fileURLToPath(new URL("..", import.meta.url));
const built = path.join(root, "dist/review");
const output =
  process.argv[2] || path.join(root, "dist", "ADVA-Interactive-Prototype.html");
const index = fs.readFileSync(path.join(built, "index.html"), "utf8");
const jsPath = index.match(/src="([^"]+\.js)"/)?.[1];
const cssPath = index.match(/href="([^"]+\.css)"/)?.[1];
if (!jsPath || !cssPath) throw new Error("Run npm run review:build first.");
let js = fs.readFileSync(path.join(built, jsPath), "utf8");
let css = fs.readFileSync(path.join(built, cssPath), "utf8");
const dir = path.join(root, "public/redesign");
const mime = {
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};
function walk(folder) {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(folder, entry.name))
        : [path.join(folder, entry.name)],
    );
}
let assets = 0;
for (const file of walk(dir)) {
  const type = mime[path.extname(file)];
  if (!type) continue;
  const bytes = fs.readFileSync(file);
  if (!bytes.length) throw new Error(`Empty asset: ${path.basename(file)}`);
  const source =
    "/redesign/" + path.relative(dir, file).split(path.sep).join("/");
  const data = `data:${type};base64,${bytes.toString("base64")}`;
  js = js.split(source).join(data);
  css = css.split(source).join(data);
  assets++;
}
const icon = `data:image/svg+xml;base64,${fs.readFileSync(path.join(dir, "favicon.svg")).toString("base64")}`;
const licenses = ["Archivo-OFL.txt", "IBM-Plex-Mono-OFL.txt"]
  .map((name) => fs.readFileSync(path.join(dir, "fonts", name), "utf8"))
  .join("\n\n");
const html = `<!doctype html><html lang="en" data-transport="local"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>ADVA Labor — Interactive Design Prototype</title><link rel="icon" href="${icon}"><style>${css.replaceAll("</style", "<\\/style")}</style></head><body style="margin:0"><div id="root"></div><noscript>This design prototype requires JavaScript. Bid requests are never sent.</noscript><script type="module">${js.replaceAll("</script", "<\\/script")}</script><!-- FONT LICENSES\n${licenses.replaceAll("-->", "-- >")}\n--></body></html>`;
if (/https?:\/\//.test(js))
  console.log(
    "Note: library informational references may remain; the offline app does not fetch external assets.",
  );
fs.writeFileSync(output, html);
console.log(
  JSON.stringify({
    output,
    bytes: Buffer.byteLength(html),
    embeddedAssets: assets,
  }),
);
