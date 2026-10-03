/** Hashed Vite output. A missing file here must not be replaced with the HTML shell. */
export function isHashedAssetPath(pathname: string): boolean {
  return pathname === "/assets" || pathname.startsWith("/assets/");
}

/**
 * Pages' SPA fallback answers a missing /assets/*.js with 200 text/html.
 * Treat that, and a real 404, as an asset miss so the browser never accepts
 * HTML as a module script or caches it as the chunk.
 */
export function isHtmlAssetMiss(status: number, contentType: string | null): boolean {
  if (status === 404) return true;
  return (contentType ?? "").toLowerCase().includes("text/html");
}

export function missingAssetResponse(): Response {
  return new Response("Not found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

type AssetBinding = { fetch(request: Request): Promise<Response> };

export function readAssetBinding(env: unknown): AssetBinding | null {
  if (!env || typeof env !== "object" || !("ASSETS" in env)) return null;
  const assets = (env as { ASSETS?: { fetch?: unknown } }).ASSETS;
  if (!assets || typeof assets.fetch !== "function") return null;
  return assets as AssetBinding;
}

export async function fetchHashedAsset(request: Request, env: unknown): Promise<Response | null> {
  const url = new URL(request.url);
  if (!isHashedAssetPath(url.pathname)) return null;
  const assets = readAssetBinding(env);
  if (!assets) return null;
  try {
    const asset = await assets.fetch(request);
    const contentType = asset.headers.get("content-type");
    if (isHtmlAssetMiss(asset.status, contentType)) return missingAssetResponse();
    return asset;
  } catch {
    return missingAssetResponse();
  }
}
