import { isSafeArtworkUrl } from "./public-card";

const PRIVATE_HEADERS = {
  "cache-control": "private, no-store, max-age=0",
  "referrer-policy": "no-referrer",
};

export function previewNotAvailable(): Response {
  return new Response(null, { status: 404, headers: PRIVATE_HEADERS });
}

async function inlineArtwork(url: string): Promise<string | null> {
  if (!isSafeArtworkUrl(url)) return null;
  if (url.startsWith("data:image/")) return url;
  try {
    const response = await fetch(url, { redirect: "error" });
    if (!response.ok) return null;
    const type = response.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength === 0 || bytes.byteLength > 1_500_000) return null;
    const mime = type.split(";")[0];
    return `data:${mime};base64,${Buffer.from(bytes).toString("base64")}`;
  } catch {
    return null;
  }
}

type SharpModule = {
  default?: (input: Buffer) => {
    png: () => { toBuffer: () => Promise<Buffer> };
  };
};

/** PNG when the image library is installed. Otherwise the portrait SVG. Never a static import. */
export async function renderPreviewImage(svg: string): Promise<Response> {
  try {
    const moduleName = "sh" + "arp";
    const load = new Function("name", "return import(name)") as (
      name: string,
    ) => Promise<SharpModule>;
    const loaded = await load(moduleName);
    const sharp = loaded.default;
    if (!sharp) throw new Error("preview encoder missing");
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(new Uint8Array(png), {
      headers: { ...PRIVATE_HEADERS, "content-type": "image/png" },
    });
  } catch {
    return new Response(svg, {
      headers: { ...PRIVATE_HEADERS, "content-type": "image/svg+xml; charset=utf-8" },
    });
  }
}

export async function artworkHrefForPreview(url: string | null): Promise<string | null> {
  if (!url) return null;
  return inlineArtwork(url);
}
