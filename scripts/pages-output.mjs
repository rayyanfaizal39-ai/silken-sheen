/** Paths served as static files. /assets/* is intentionally absent: the Worker must 404 a missing hashed chunk instead of letting Pages substitute index.html. */
export const PAGES_ROUTE_EXCLUDES = [
  "/companions/*",
  "/favicon.ico",
  "/index.html",
  "/sw.js",
  "/workbox-*.js",
  "/*.png",
  "/*.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
];

export function pagesRouteConfig() {
  return {
    version: 1,
    description:
      "Run the SSR Worker for documents and hashed assets; serve other static files directly.",
    include: ["/*"],
    exclude: PAGES_ROUTE_EXCLUDES,
  };
}

const HEADER_BLOCKS = [
  ["/assets/*", "  cache-control: public, max-age=31536000, immutable"],
  ["/index.html", "  cache-control: no-cache, must-revalidate"],
  ["/sw.js", "  cache-control: no-cache, no-store, must-revalidate"],
  ["/workbox-*.js", "  cache-control: no-cache, no-store, must-revalidate"],
  ["/site.webmanifest", "  cache-control: no-cache, must-revalidate"],
];

function hasHeaderPath(text, path) {
  return text.split("\n").some((line) => line.trim() === path);
}

/** Adds any missing cache rule without weakening a rule that is already present. */
export function mergePagesHeaders(existing) {
  let text = existing.trim();
  for (const [path, rule] of HEADER_BLOCKS) {
    if (hasHeaderPath(text, path)) continue;
    text = `${text}\n\n${path}\n${rule}`.trim();
  }
  return `${text}\n`;
}
