// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CompanionArtworkImage } from "./CompanionArtworkImage";
import { NOVA_ARTWORK_SIGNED_URL_SECONDS } from "./artwork-signing";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("companion artwork image", () => {
  it("keeps signed artwork URLs long enough for a full student session", () => {
    expect(NOVA_ARTWORK_SIGNED_URL_SECONDS).toBeGreaterThanOrEqual(3600);
  });

  it("shows a loading placeholder instead of an empty frame, then reveals the portrait", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    await act(async () => {
      root.render(
        <CompanionArtworkImage
          src="https://example.test/aria.png"
          alt="Aria the Unicorn"
          companionLabel="Aria the Unicorn"
        />,
      );
    });
    expect(host.querySelector('[data-artwork-status="loading"]')).toBeTruthy();
    expect(host.textContent).toContain("Loading portrait");
    expect(host.textContent).not.toContain("FICTIONAL");
    const img = host.querySelector("img")!;
    expect(img.getAttribute("src")).toBe("https://example.test/aria.png");
    expect(img.hasAttribute("hidden")).toBe(true);
    await act(async () => {
      Object.defineProperty(img, "complete", { configurable: true, value: true });
      Object.defineProperty(img, "naturalWidth", { configurable: true, value: 1024 });
      Object.defineProperty(img, "naturalHeight", { configurable: true, value: 1536 });
      img.dispatchEvent(new Event("load"));
    });
    expect(host.querySelector('[data-artwork-status="ready"]')).toBeTruthy();
    expect(img.hasAttribute("hidden")).toBe(false);
    await act(async () => root.unmount());
    host.remove();
  });

  it("reveals a portrait that finished loading before onLoad could attach (cached /art)", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const rafQueue: FrameRequestCallback[] = [];
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        rafQueue.push(cb);
        return rafQueue.length;
      });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    await act(async () => {
      root.render(
        <CompanionArtworkImage
          src="/card/c/f2c18bdb-9de8-44fd-89b7-61b56bb52964/art"
          alt="Comet the Dragon"
          companionLabel="Comet the Dragon"
        />,
      );
    });
    const img = host.querySelector("img")!;
    Object.defineProperty(img, "complete", { configurable: true, value: true });
    Object.defineProperty(img, "naturalWidth", { configurable: true, value: 1024 });
    Object.defineProperty(img, "naturalHeight", { configurable: true, value: 1536 });
    // Missed load event: only the complete-check / rAF sync may recover.
    await act(async () => {
      while (rafQueue.length) rafQueue.shift()!(0);
    });
    expect(host.querySelector('[data-artwork-status="ready"]')).toBeTruthy();
    expect(host.textContent).not.toContain("Loading portrait");
    expect(img.hasAttribute("hidden")).toBe(false);
    raf.mockRestore();
    await act(async () => root.unmount());
    host.remove();
  });

  it("refreshes an expired signed URL once, and never substitutes demo artwork", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const onRefresh = vi.fn(async () => "https://example.test/aria-fresh.png");
    await act(async () => {
      root.render(
        <CompanionArtworkImage
          src="https://example.test/aria-expired.png"
          alt="Aria the Unicorn"
          companionLabel="Aria the Unicorn"
          onRefresh={onRefresh}
        />,
      );
    });
    const first = host.querySelector("img")!;
    await act(async () => {
      first.dispatchEvent(new Event("error"));
    });
    expect(onRefresh).toHaveBeenCalledTimes(1);
    const refreshed = host.querySelector("img")!;
    expect(refreshed.getAttribute("src")).toBe("https://example.test/aria-fresh.png");
    expect(host.textContent).not.toMatch(/demo|fictional/i);
    await act(async () => root.unmount());
    host.remove();
  });

  it("offers Retry when refresh cannot restore the portrait", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const onRefresh = vi.fn(async () => null);
    await act(async () => {
      root.render(
        <CompanionArtworkImage
          src="https://example.test/broken.png"
          alt="Aria"
          onRefresh={onRefresh}
        />,
      );
    });
    await act(async () => {
      host.querySelector("img")!.dispatchEvent(new Event("error"));
    });
    expect(host.querySelector('[data-artwork-status="failed"]')).toBeTruthy();
    expect(host.textContent).toContain("Portrait could not load");
    const retry = host.querySelector<HTMLButtonElement>(".nova-art-retry")!;
    expect(retry).toBeTruthy();
    await act(async () => {
      retry.click();
    });
    expect(onRefresh).toHaveBeenCalledTimes(2);
    await act(async () => root.unmount());
    host.remove();
  });

  it("offers Retry for same-origin public art even without an onRefresh hook", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    await act(async () => {
      root.render(
        <CompanionArtworkImage
          src="/card/c/f2c18bdb-9de8-44fd-89b7-61b56bb52964/art"
          alt="Comet"
          companionLabel="Comet the Dragon"
        />,
      );
    });
    await act(async () => {
      host.querySelector("img")!.dispatchEvent(new Event("error"));
    });
    expect(host.querySelector('[data-artwork-status="failed"]')).toBeTruthy();
    const retry = host.querySelector<HTMLButtonElement>(".nova-art-retry")!;
    expect(retry.disabled).toBe(false);
    await act(async () => {
      retry.click();
    });
    expect(host.querySelector("img")!.getAttribute("src")).toMatch(/retry=\d+/);
    await act(async () => root.unmount());
    host.remove();
  });
});
