import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathGeometryVisual } from "@/components/quiz/MathGeometryVisual";
import type { MathGeometryVisual as GeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import { MATH_F2_C4_BANK } from "./flashcard-bank";
import { mathF2C4FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C4FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 4 structured polygon flashcards", () => {
  it("provides stable 60-card IDs in both languages", () => {
    for (const [lang, cards] of [["dlp", mathF2C4FlashcardsDLP], ["bm", mathF2C4FlashcardsBM]] as const) {
      expect(cards).toHaveLength(60);
      expect(new Set(cards.map(card => card.id)).size).toBe(60);
      cards.forEach((card, i) => expect(card.id).toBe(`math-f2-c4-${lang}-f${i + 1}`));
    }
  });
  it("covers 3 subtopics and 12 concept / 33 practice / 15 challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C4_BANK.filter(card => card.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(card => card.subtopic))).toEqual(new Set(["4.1", "4.2", "4.3"]));
    }
  });
  it("includes matching diagrams and structured solutions in DLP and BM", () => {
    mathF2C4FlashcardsDLP.forEach((dlp, i) => {
      const bm = mathF2C4FlashcardsBM[i];
      expect(dlp.reviewMode).toBe(bm.reviewMode);
      expect(dlp.structured?.visuals).toEqual(bm.structured?.visuals);
      expect(dlp.structured?.visuals?.[0]?.kind).toBe("geometry-diagram");
      expect(dlp.structured?.answer.length).toBe(dlp.reviewMode === "challenge" ? 3 : 1);
      expect(bm.structured?.answer.length).toBe(dlp.structured?.answer.length);
    });
  });
  it("draws compact, centred, regular polygons with the n label clear beneath", () => {
    for (const entry of MATH_F2_C4_BANK) {
      const visual = entry.visuals[0] as GeometryVisual;
      expect(visual.layout).toBe("compact");
      expect(visual.panels).toHaveLength(1);
      const [panel] = visual.panels;
      const [width, height] = panel.viewBox!;
      expect(width).toBeLessThanOrEqual(200);
      expect(height).toBeLessThanOrEqual(200);
      const points = panel.paths![0].points;
      const n = Number(/(\d+)-sided/.exec(panel.title.dlp)![1]);
      expect(points).toHaveLength(n);
      expect(panel.labels.map(l => l.text)).toEqual([`n = ${n}`]);
      // Regular: every side has the same length.
      const sides = points.map(([x, y], i) => {
        const [x2, y2] = points[(i + 1) % n];
        return Math.hypot(x2 - x, y2 - y);
      });
      sides.forEach(side => expect(side).toBeCloseTo(sides[0], 0));
      // Centred horizontally, filling most of the canvas, inside its bounds.
      const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
      expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo(width / 2, 0);
      expect(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))).toBeGreaterThan(width * 0.7);
      expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
      expect(Math.min(...ys)).toBeGreaterThanOrEqual(0);
      // Label sits beneath the lowest vertex (13px text) and inside the canvas.
      const [labelX, labelY] = panel.labels[0].at;
      expect(labelX).toBe(width / 2);
      expect(labelY - 13 - Math.max(...ys)).toBeGreaterThanOrEqual(6);
      expect(labelY).toBeLessThanOrEqual(height);
    }
  });
  it("renders a single not-to-scale note per diagram in both languages", () => {
    const visual = MATH_F2_C4_BANK[5].visuals[0] as GeometryVisual;
    for (const [lang, note] of [["dlp", "not to scale"], ["bm", "tidak mengikut skala"]] as const) {
      const html = renderToStaticMarkup(createElement(MathGeometryVisual, { visual, lang }));
      expect(html).toContain("data-layout=\"compact\"");
      expect(html).toContain("viewBox=\"0 0 180 174\"");
      expect(html.replace(/aria-label="[^"]*"/, "").split(note)).toHaveLength(2);
    }
  });
});
