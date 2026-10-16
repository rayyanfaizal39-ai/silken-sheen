import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathGeometryVisual } from "@/components/quiz/MathGeometryVisual";
import type { MathGeometryVisual as GeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import { textFor } from "@/features/quiz/visuals/mathQuestionVisual";
import { MATH_F2_C5_BANK } from "./flashcard-bank";
import { mathF2C5FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C5FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 5 flashcards", () => {
  it("contains 60 cards in each language with stable IDs", () => {
    for (const [lang, deck] of [["dlp", mathF2C5FlashcardsDLP], ["bm", mathF2C5FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(card => card.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c5-${lang}-f${i + 1}`));
    }
  });
  it("combines all three circle subtopics across modes", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C5_BANK.filter(card => card.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(card => card.subtopic))).toEqual(new Set(["5.1", "5.2", "5.3"]));
    }
  });
  it("keeps BM/DLP aligned and challenges multi-part", () => {
    mathF2C5FlashcardsDLP.forEach((dlp, i) => {
      const bm = mathF2C5FlashcardsBM[i];
      expect(dlp.subtopic).toBe(bm.subtopic);
      expect(dlp.reviewMode).toBe(bm.reviewMode);
      if (dlp.reviewMode === "challenge") {
        expect(dlp.structured?.parts).toHaveLength(3);
        expect(dlp.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
      }
    });
  });

  it("adds compact circle diagrams to every practice and challenge card and 11 of 12 concepts", () => {
    const withVisual = (mode: string) =>
      mathF2C5FlashcardsDLP.filter(card => card.reviewMode === mode && card.structured?.visuals?.length);
    expect(withVisual("practice")).toHaveLength(33);
    expect(withVisual("challenge")).toHaveLength(15);
    expect(withVisual("concept")).toHaveLength(11);
    // The cm² unit question gains nothing from a picture.
    expect(mathF2C5FlashcardsDLP[42].structured?.visuals).toBeUndefined();
    mathF2C5FlashcardsDLP.forEach((dlp, i) => {
      expect(mathF2C5FlashcardsBM[i].structured?.visuals).toEqual(dlp.structured?.visuals);
      const visual = dlp.structured?.visuals?.[0] as GeometryVisual | undefined;
      if (!visual) return;
      expect(visual.kind).toBe("geometry-diagram");
      expect(visual.layout).toBe("compact");
      const [panel] = visual.panels;
      const [width, height] = panel.viewBox!;
      expect(width).toBe(180);
      expect(height).toBeLessThanOrEqual(160);
      for (const l of panel.labels) {
        expect(l.at[0]).toBeGreaterThanOrEqual(0);
        expect(l.at[0]).toBeLessThanOrEqual(width);
        expect(l.at[1]).toBeLessThanOrEqual(height);
      }
    });
  });
  it("labels diagrams only with the question's own givens, never the answer", () => {
    MATH_F2_C5_BANK.forEach((entry, i) => {
      const visual = mathF2C5FlashcardsDLP[i].structured?.visuals?.[0] as GeometryVisual | undefined;
      if (!visual) return;
      for (const lang of ["dlp", "bm"] as const) {
        const side = entry[lang];
        const question = [side.prompt, ...(side.parts ?? [])].join(" ");
        const answer = side.answer.flat().join(" ");
        for (const l of visual.panels[0].labels) {
          const value = textFor(l.text, lang);
          const measure = /^(\d+) (cm|mm|m)$/.exec(value);
          if (measure) expect(question).toContain(value);
          else expect(value).toMatch(/^(O|\?|r|d|2r|[rdCA] = \?|1 (lap|pusingan) = \?)$/);
          if (value.length > 1 && value !== "O") expect(answer).not.toContain(`= ${value}`);
        }
      }
    });
  });
  it("renders compact markup, with the scale note only on measured diagrams", () => {
    const html = (i: number, lang: "dlp" | "bm") =>
      renderToStaticMarkup(createElement(MathGeometryVisual, {
        visual: mathF2C5FlashcardsDLP[i].structured!.visuals![0] as GeometryVisual,
        lang,
      })).replace(/aria-label="[^"]*"/, "");
    expect(html(0, "dlp")).toContain('data-layout="compact"');
    expect(html(0, "dlp")).not.toContain("not to scale");
    expect(html(0, "bm")).not.toContain("tidak mengikut skala");
    expect(html(57, "dlp").split("not to scale")).toHaveLength(2);
    expect(html(57, "bm")).toContain("Taman bulat dengan kolam");
    expect(html(57, "bm")).toContain('fill-rule="evenodd"');
  });
});
