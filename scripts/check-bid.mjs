import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

// Execute the same schema and route used by Next and the review server.
function loadModule(path, dependencies = {}) {
  const source = fs.readFileSync(new URL(path, import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", output)(
    (name) => {
      if (!(name in dependencies))
        throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    module,
    module.exports,
  );
  return module.exports;
}
const schema = loadModule("../src/redesign/bid-schema.ts");
const route = loadModule("../app/api/redesign/bid/route.ts", {
  "../../../../src/redesign/bid-schema": schema,
});
const valid = {
  ...schema.emptyBid,
  projectName: "Sample test project",
  projectType: "Infrastructure",
  location: "Aurora, Colorado",
  scopes: ["earthwork"],
  description: "Sample scope for validation testing only.",
  bidDeadline: "2026-12-15",
  anticipatedStart: "2027-02-01",
  schedule: "To be confirmed",
  company: "Example Estimating Co.",
  contactName: "Alex Example",
  email: "estimating@example.com",
};
let checks = 0;
const check = (name, fn) => {
  fn();
  checks++;
  console.log(`PASS ${name}`);
};
check("valid complete draft", () =>
  assert.deepEqual(schema.validateBid(valid), {}),
);
check("trim incoming text", () =>
  assert.equal(
    schema.parseBid({ ...valid, company: "  Example  " }).company,
    "Example",
  ),
);
check("reject unlisted project type", () =>
  assert.ok(
    schema.validateBid({ ...valid, projectType: "unknown" }).projectType,
  ),
);
check("reject unlisted scope", () =>
  assert.ok(schema.validateBid({ ...valid, scopes: ["unknown"] }).scopes),
);
check("require business email", () =>
  assert.ok(schema.validateBid({ ...valid, email: "invalid" }).email),
);
check("reject invalid calendar date", () =>
  assert.ok(
    schema.validateBid({ ...valid, bidDeadline: "2026-02-30" }).bidDeadline,
  ),
);
check("reject start before deadline", () =>
  assert.ok(
    schema.validateBid({ ...valid, anticipatedStart: "2026-01-01" })
      .anticipatedStart,
  ),
);
check("reject long scope text", () =>
  assert.ok(
    schema.validateBid({ ...valid, description: "x".repeat(5001) }).description,
  ),
);
check("optional phone validation", () =>
  assert.ok(schema.validateBid({ ...valid, phone: "call me" }).phone),
);
check("honeypot check", () =>
  assert.ok(schema.validateBid({ ...valid, website: "spam" }).website),
);
check("handle malformed payload", () =>
  assert.ok(schema.validateBid(schema.parseBid(null)).projectName),
);
let requestId = 0;
async function post(body = JSON.stringify(valid), headers = {}) {
  return route.POST(
    new Request("https://preview.example/api/redesign/bid", {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
        origin: "https://preview.example",
        "x-forwarded-for": `case-${++requestId}`,
        ...headers,
      },
    }),
  );
}
async function apiCheck(name, fn) {
  await fn();
  checks++;
  console.log(`PASS ${name}`);
}
await apiCheck("preview success cannot send or store", async () => {
  const r = await post();
  assert.equal(r.status, 200);
  const data = await r.json();
  assert.equal(data.mode, "preview");
  assert.equal(data.sent, false);
  assert.equal(data.stored, false);
  assert.match(data.reference, /^DRAFT-[A-F0-9]{8}$/);
  assert.equal(r.headers.get("cache-control"), "no-store");
});
await apiCheck("validation status and field errors", async () => {
  const r = await post(JSON.stringify({ ...valid, email: "invalid" }));
  assert.equal(r.status, 422);
  assert.ok((await r.json()).errors.email);
});
await apiCheck("foreign origin rejected", async () =>
  assert.equal(
    (await post(undefined, { origin: "https://foreign.example" })).status,
    403,
  ),
);
await apiCheck("wrong content type rejected", async () =>
  assert.equal(
    (await post(undefined, { "content-type": "text/plain" })).status,
    415,
  ),
);
await apiCheck("invalid JSON rejected", async () =>
  assert.equal((await post("{invalid")).status, 400),
);
await apiCheck("stream size bounded without content-length", async () =>
  assert.equal((await post("x".repeat(17000))).status, 413),
);
await apiCheck("preview rate limit", async () => {
  for (let i = 0; i < 20; i++)
    assert.equal(
      (await post(undefined, { "x-forwarded-for": "limit-case" })).status,
      200,
    );
  assert.equal(
    (await post(undefined, { "x-forwarded-for": "limit-case" })).status,
    429,
  );
});
console.log(
  `${checks} bid checks passed. No email or persistence was exercised.`,
);
