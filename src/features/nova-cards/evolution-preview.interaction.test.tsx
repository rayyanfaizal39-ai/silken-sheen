// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it } from "vitest";
import { EvolutionPreview } from "./EvolutionPreview";
import { DEMO_CARDS } from "./model";

it("switches each fictional companion independently without changing its saved card data", async () => {
  const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
  env.IS_REACT_ACT_ENVIRONMENT = true;
  const before = JSON.stringify(DEMO_CARDS);
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => root.render(<EvolutionPreview />));
    const rayyan = container.querySelector('section[aria-labelledby="demo-rayyan-study"]')!;
    const mia = container.querySelector('section[aria-labelledby="demo-mia-study"]')!;
    const choose = async (section: Element, text: string) => {
      const button = [...section.querySelectorAll("button")].find((b) => b.textContent === text)!;
      await act(async () => button.click());
      expect(button.getAttribute("aria-pressed")).toBe("true");
    };
    expect(rayyan.querySelectorAll("figure")).toHaveLength(2);
    expect(mia.querySelectorAll("figure")).toHaveLength(2);
    await choose(rayyan, "Stage 2 — Awakened");
    expect(rayyan.querySelectorAll("figure")).toHaveLength(1);
    expect(rayyan.querySelector(".nova-preview-art")!.getAttribute("alt")).toContain(
      "Stage 2 — Awakened",
    );
    expect(mia.querySelectorAll("figure")).toHaveLength(2);
    await choose(mia, "Stage 1 — Origin");
    expect(mia.querySelectorAll("figure")).toHaveLength(1);
    expect(mia.querySelector(".nova-preview-art")!.getAttribute("alt")).toContain(
      "Stage 1 — Origin",
    );
    expect(rayyan.querySelector(".nova-preview-art")!.getAttribute("alt")).toContain(
      "Stage 2 — Awakened",
    );
    await choose(rayyan, "Compare both");
    expect(rayyan.querySelectorAll("figure")).toHaveLength(2);
    expect(mia.querySelectorAll("figure")).toHaveLength(1);
    expect(JSON.stringify(DEMO_CARDS)).toBe(before);
  } finally {
    await act(async () => root.unmount());
    container.remove();
    delete env.IS_REACT_ACT_ENVIRONMENT;
  }
});
