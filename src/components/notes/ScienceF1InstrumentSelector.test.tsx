import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { ScienceF1Chapter1VisualNotesBlock } from "./ScienceF1Chapter1VisualNotesBlock";

// Select each of the existing live component's six tab states during SSR.
// Keep React's actual hook calls; only override the fourth (instrument) state value.
// This is live-component render coverage, not browser click/keyboard QA.
const selection = vi.hoisted(() => ({ index: 0, calls: 0 }));
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => {
      const result = actual.useState(initial);
      return selection.calls++ === 3 ? [selection.index, result[1]] : result;
    },
  };
});

function render(index: number, lang: "bm" | "en") {
  selection.index = index;
  selection.calls = 0;
  const html = renderToStaticMarkup(
    createElement(ScienceF1Chapter1VisualNotesBlock, { content: chapter1Content, lang }),
  );
  const cards = html.match(/<article[^>]*data-instrument-card="[^"]+"[^>]*>[\s\S]*?<\/article>/g)!;
  expect(html).toContain(`data-instrument-comparison="${index}"`);
  return { html, cards };
}
const expectedVisuals = [
  ["instrument-0", "instrument-6"],
  ["mechanical-balances", "digital-balance"],
  ["instrument-2", "digital-stopwatch"],
  ["laboratory-thermometer", "clinical-digital-thermometers"],
  ["instrument-4", "digital-ammeter"],
  ["measuring-cylinder"],
];

describe("Science Form 1 §1.4 — all six selector states in the current live renderer", () => {
  for (const lang of ["bm", "en"] as const) {
    it.each([0, 1, 2, 3, 4, 5])(
      `${lang}: tab %i has meaningful visuals and one visible heading per card`,
      (index) => {
        const { html, cards } = render(index, lang);
        expect(cards).toHaveLength(index === 5 ? 1 : 2);
        for (const marker of expectedVisuals[index])
          expect(cards.join("")).toContain(`="${marker}"`);
        for (const card of cards) {
          expect(card.match(/data-instrument-heading/g)).toHaveLength(1);
          expect(card).not.toContain("<figcaption");
          expect(card).toContain('role="img"');
          expect(card).toContain("aria-label=");
          expect(card).toContain("<title>");
        }
        expect(html).toMatch(new RegExp(`aria-selected="true" id="measurement-tab-${index}"`));
        expect(html).toContain(`aria-labelledby="measurement-tab-${index}"`);
        // Detailed teaching elsewhere in §1.4 remains available on every selector state.
        for (const marker of ["vernier-reading", "micrometer-reading", "parallax-meniscus"])
          expect(html).toContain(`data-chapter1-diagram="${marker}"`);
        if (index === 5) {
          expect(cards.join("")).not.toContain('data-instrument-card="higher"');
          expect(cards.join("")).not.toContain("—");
          expect(cards[0]).not.toMatch(/burette|pipette|buret|pipet/i);
        }
      },
    );
  }
  it.each([0, 1, 2, 3, 4, 5])("tab %i shares geometry and layout between BM and DLP", (index) => {
    const geometry = (lang: "bm" | "en") =>
      render(index, lang)
        .cards.join("")
        .match(/<(?:path|rect|circle|ellipse)[^>]*>/g);
    expect(geometry("bm")).toEqual(geometry("en"));
  });
  it("retains all source-backed resolution values, without inventing a balance resolution", () => {
    for (const lang of ["bm", "en"] as const) {
      const text = (i: number) =>
        render(i, lang)
          .cards.join("")
          .replace(/<[^>]+>/g, "");
      for (const value of ["0.01 cm", "0.1 mm", "0.001 cm", "0.01 mm"])
        expect(text(0)).toContain(value);
      expect(text(2)).toContain("0.1 s");
      expect(text(2)).toContain("0.2 s");
      expect(text(2)).toContain("0.01 s");
      expect(text(3)).toContain("1°C");
      expect(text(3)).toContain("0.1°C");
      expect(text(4)).toContain("0.01 A");
      expect(render(1, lang).cards[1]).toContain("data-illustrative-display");
      expect(text(1)).not.toMatch(/(?:resolution|resolusi)\s*:?\s*[\d.]+/i);
    }
  });
  it("places only the laboratory thermometer in the standard temperature card", () => {
    for (const lang of ["bm", "en"] as const) {
      const { cards } = render(3, lang);
      expect(cards[0]).not.toMatch(/clinical|klinik|digital/i);
      expect(cards[1]).toMatch(/clinical|klinik/i);
      expect(cards[1]).toContain("digital");
      expect(cards[1]).toContain("data-illustrative-display");
    }
  });
});
