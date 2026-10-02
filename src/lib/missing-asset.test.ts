import { describe, expect, it } from "vitest";
import { fetchHashedAsset, isHashedAssetPath, isHtmlAssetMiss } from "./missing-asset";

function request(path: string) {
  return new Request(`https://www.myacademy.my${path}`);
}

describe("hashed asset fallback", () => {
  it("only treats Vite asset URLs as hashed assets", () => {
    expect(isHashedAssetPath("/assets/dashboard-old.js")).toBe(true);
    expect(isHashedAssetPath("/assets/app.css")).toBe(true);
    expect(isHashedAssetPath("/dashboard")).toBe(false);
    expect(isHashedAssetPath("/flashcards")).toBe(false);
    expect(isHashedAssetPath("/")).toBe(false);
  });

  it("treats an HTML body for a script URL as a miss", () => {
    expect(isHtmlAssetMiss(200, "text/html; charset=utf-8")).toBe(true);
    expect(isHtmlAssetMiss(404, "text/plain")).toBe(true);
    expect(isHtmlAssetMiss(200, "application/javascript")).toBe(false);
    expect(isHtmlAssetMiss(200, "text/css")).toBe(false);
  });

  it("returns a non-cached 404 instead of the HTML shell for a missing chunk", async () => {
    const response = await fetchHashedAsset(request("/assets/dashboard-OLDHASH.js"), {
      ASSETS: {
        fetch: async () =>
          new Response("<!doctype html><title>AcadeMY</title>", {
            status: 200,
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
      },
    });

    expect(response?.status).toBe(404);
    expect(response?.headers.get("content-type")).toContain("text/plain");
    expect(response?.headers.get("cache-control")).toBe("no-store");
    expect(await response?.text()).not.toContain("<html");
  });

  it("serves a real hashed asset unchanged and leaves app routes alone", async () => {
    const asset = new Response("console.log(1)", {
      status: 200,
      headers: {
        "content-type": "application/javascript",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
    const served = await fetchHashedAsset(request("/assets/dashboard-new.js"), {
      ASSETS: { fetch: async () => asset },
    });
    expect(served).toBe(asset);

    const navigation = await fetchHashedAsset(request("/dashboard"), {
      ASSETS: { fetch: async () => asset },
    });
    expect(navigation).toBeNull();
  });
});
