import { describe, expect, it } from "vitest";
import { mergePagesHeaders, pagesRouteConfig } from "./pages-output.mjs";

describe("Pages deployment output", () => {
  it("sends hashed assets through the worker and keeps document routes on it", () => {
    const routes = pagesRouteConfig();
    expect(routes.include).toEqual(["/*"]);
    expect(routes.exclude).not.toContain("/assets/*");
    expect(routes.exclude).toContain("/sw.js");
    expect(routes.exclude).toContain("/index.html");
    expect(routes.exclude).toContain("/card/*.png");
  });

  it("revalidates the shell and worker while keeping hashed assets immutable", () => {
    const headers = mergePagesHeaders(
      "/assets/*\n  cache-control: public, max-age=31536000, immutable\n",
    );

    expect(headers).toContain("/assets/*\n  cache-control: public, max-age=31536000, immutable");
    expect(headers).toContain("/index.html\n  cache-control: no-cache, must-revalidate");
    expect(headers).toContain("/sw.js\n  cache-control: no-cache, no-store, must-revalidate");
    expect(headers).toContain(
      "/workbox-*.js\n  cache-control: no-cache, no-store, must-revalidate",
    );
    expect(headers).toContain("/site.webmanifest\n  cache-control: no-cache, must-revalidate");
    expect(headers.match(/\/assets\/\*/g)).toHaveLength(1);
    expect(headers).not.toContain("max-age=31536000, immutable\n\n/sw.js");
  });

  it("does not weaken an existing service-worker revalidation rule", () => {
    const headers = mergePagesHeaders(
      "/sw.js\n  cache-control: no-cache, no-store, must-revalidate\n",
    );
    expect(headers.match(/\/sw\.js/g)).toHaveLength(1);
    expect(headers).toContain("no-store");
  });
});
