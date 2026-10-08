import { parseBid, validateBid } from "../../../../src/redesign/bid-schema";

// Preview endpoint. Deliberately cannot send mail or persist contact information.
export const runtime = "nodejs";
const buckets = new Map<string, { count: number; expires: number }>();
const response = (body: object, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return response({ message: "Request origin is not allowed." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response({ message: "Use a JSON request." }, 415);
  if (Number(request.headers.get("content-length")) > 16384)
    return response({ message: "The request is too large." }, 413);
  const now = Date.now();
  for (const [key, value] of buckets)
    if (value.expires < now) buckets.delete(key);
  // A coarse, ephemeral preview limit; replace with an infrastructure-backed limit before launch.
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "preview";
  const bucket = buckets.get(key) || { count: 0, expires: now + 60000 };
  bucket.count++;
  buckets.set(key, bucket);
  if (bucket.count > 20)
    return response(
      { message: "Too many preview validations. Try again in a minute." },
      429,
    );
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return response({ message: "The request could not be read." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return response({ message: "The request is too large." }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    const raw = new TextDecoder().decode(bytes);
    const draft = parseBid(JSON.parse(raw));
    const errors = validateBid(draft);
    if (Object.keys(errors).length)
      return response({ message: "Review the project details.", errors }, 422);
    return response({
      mode: "preview",
      sent: false,
      stored: false,
      reference: `DRAFT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    });
  } catch {
    return response(
      { message: "The request could not be read. Please try again." },
      400,
    );
  }
}
