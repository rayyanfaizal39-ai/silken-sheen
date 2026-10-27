// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UnrevealedCosmicCard } from "./UnrevealedCosmicCard";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: false }) as unknown as MediaQueryList);
});
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

async function mount() {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => root!.render(<UnrevealedCosmicCard />));
  const button = host.querySelector<HTMLButtonElement>("button.ucc-button")!;
  const card = () => host.querySelector(".ucc-card")!;
  return { host, button, card };
}

describe("Unrevealed Cosmic Card", () => {
  it("starts on the hidden companion and flips to the locked back and back again on click or tap", async () => {
    const { button, card } = await mount();
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(card().getAttribute("data-flipped")).toBe("false");
    expect(button.getAttribute("aria-label")).toContain("hidden companion in the mist");
    await act(async () => button.click());
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(card().getAttribute("data-flipped")).toBe("true");
    expect(button.getAttribute("aria-label")).toContain("Identity locked");
    await act(async () => button.click());
    expect(card().getAttribute("data-flipped")).toBe("false");
  });

  it("is a native, focusable button so Enter and Space flip it from the keyboard", async () => {
    const { button } = await mount();
    expect(button.type).toBe("button");
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it("only shows placeholders and never a creature or real card data", async () => {
    const { host } = await mount();
    expect(host.querySelector("img")).toBeNull();
    expect(host.textContent).toContain("?");
    expect(host.textContent).toContain("Identity locked");
    expect(host.textContent).toContain("Your companion is waiting to be discovered.");
    expect(host.textContent).toContain("Tap to flip your card");
  });
});
