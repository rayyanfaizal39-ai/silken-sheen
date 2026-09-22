// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { ACADEMY_LOADING_CRITICAL_CSS } from "@/components/AcadeMYLoadingScreen";
import { removeLoaderError, renderLoaderError } from "@/components/AppBootGate";

function flushMicrotasks() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

describe("Mission control loader — decorative overlay", () => {
  it("marks the animated starfield layer as pointer-events:none so it can't intercept clicks", () => {
    const starsRule = ACADEMY_LOADING_CRITICAL_CSS.match(/\.academy-static-stars\{[^}]*\}/)?.[0];
    expect(starsRule).toBeDefined();
    expect(starsRule).toContain("pointer-events:none");
  });

  it("does not disable pointer-events on the real error/retry content", () => {
    const errorRule = ACADEMY_LOADING_CRITICAL_CSS.match(/\.academy-static-error\{[^}]*\}/)?.[0];
    const actionsRule = ACADEMY_LOADING_CRITICAL_CSS.match(
      /\.academy-static-actions\{[^}]*\}/,
    )?.[0];
    expect(errorRule).not.toContain("pointer-events:none");
    expect(actionsRule).not.toContain("pointer-events:none");
  });

  it("gives the loading/error content an explicit stacking order above the decorative layer", () => {
    const loadingRule = ACADEMY_LOADING_CRITICAL_CSS.match(
      /\.academy-static-loading\{[^}]*\}/,
    )?.[0];
    const errorRule = ACADEMY_LOADING_CRITICAL_CSS.match(/\.academy-static-error\{[^}]*\}/)?.[0];
    expect(loadingRule).toContain("z-index:1");
    expect(errorRule).toContain("z-index:1");
  });
});

describe("Mission control loader — Retry button", () => {
  function setup() {
    const loader = document.createElement("div");
    document.body.appendChild(loader);
    return loader;
  }

  it('renders a real <button type="button"> for Retry, not a styled div/span', () => {
    const loader = setup();
    renderLoaderError(loader, () => Promise.resolve());

    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]");
    expect(retryButton).toBeInstanceOf(HTMLButtonElement);
    expect(retryButton?.tagName).toBe("BUTTON");
    expect(retryButton?.type).toBe("button");
    expect(retryButton?.textContent).toBe("Retry");
    expect(retryButton?.disabled).toBe(false);
  });

  it("shows Mission control's heading and message copy", () => {
    const loader = setup();
    renderLoaderError(loader, () => Promise.resolve());

    expect(loader.querySelector("h1")?.textContent).toBe("Mission control needs a moment");
    expect(loader.querySelector("[data-loading-error]")?.textContent).toBe(
      "AcadeMY could not finish loading this screen.",
    );
  });

  it("calls the real retry/refetch function when clicked", async () => {
    const loader = setup();
    const onRetry = vi.fn(() => Promise.resolve());
    renderLoaderError(loader, onRetry);

    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]")!;
    retryButton.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables the button and shows 'Retrying…' while the retry is in flight", async () => {
    const loader = setup();
    let resolveRetry: () => void = () => {};
    const onRetry = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRetry = resolve;
        }),
    );
    renderLoaderError(loader, onRetry);

    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]")!;
    retryButton.click();

    expect(retryButton.disabled).toBe(true);
    expect(retryButton.textContent).toBe("Retrying…");

    resolveRetry();
    await flushMicrotasks();

    expect(retryButton.disabled).toBe(false);
    expect(retryButton.textContent).toBe("Retry");
  });

  it("ignores extra clicks while a retry is already in flight", () => {
    const loader = setup();
    const onRetry = vi.fn(() => new Promise<void>(() => {}));
    renderLoaderError(loader, onRetry);

    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]")!;
    retryButton.click();
    retryButton.click();
    retryButton.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("re-enables the button and restores 'Retry' if the retry fails again", async () => {
    const loader = setup();
    const onRetry = vi.fn(() => Promise.reject(new Error("still down")));
    renderLoaderError(loader, onRetry);

    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]")!;
    retryButton.click();
    await flushMicrotasks();

    expect(retryButton.disabled).toBe(false);
    expect(retryButton.textContent).toBe("Retry");
  });

  it("also renders a real Reload button that reloads the page", () => {
    const loader = setup();
    renderLoaderError(loader, () => Promise.resolve());

    const reloadButton = loader.querySelector<HTMLButtonElement>("[data-loading-reload]");
    expect(reloadButton?.tagName).toBe("BUTTON");
    expect(reloadButton?.type).toBe("button");
  });

  it("removeLoaderError clears the error block so a later render can rebuild it fresh", () => {
    const loader = setup();
    renderLoaderError(loader, () => Promise.resolve());
    expect(loader.querySelector("[data-loading-error-block]")).not.toBeNull();

    removeLoaderError(loader);
    expect(loader.querySelector("[data-loading-error-block]")).toBeNull();

    renderLoaderError(loader, () => Promise.resolve());
    const retryButton = loader.querySelector<HTMLButtonElement>("[data-loading-retry]");
    expect(retryButton?.disabled).toBe(false);
    expect(retryButton?.textContent).toBe("Retry");
  });
});
