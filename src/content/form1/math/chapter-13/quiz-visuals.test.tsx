import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C13_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const MAPS = [V.foundation, V.practice, V.challenge] as const;
const COUNTS = [23, 30, 30] as const;

function questions(objective: (typeof OBJECTIVES)[number], lang: (typeof LANGS)[number]) {
  return resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter: "Chapter 13",
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;
}

describe("Math Form 1 Chapter 13 bilingual Pythagoras diagrams", () => {
  it("retains all 180 questions while adding only the 166 reviewed visual placements", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, i) => {
        const bank = questions(objective, lang);
        expect(bank, `${objective}/${lang}`).toHaveLength(30);
        expect(bank.filter((q) => q.visual)).toHaveLength(COUNTS[i]);
        bank.forEach((q, j) => {
          expect(q.id).toBe(`math-f1-c13-${objective}-${lang}-q${j + 1}`);
          expect(q.options).toHaveLength(4);
          expect(q.answerIndex).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex).toBeLessThan(4);
          expect(q.visual).toBe((MAPS[i] as Record<number, unknown>)[j + 1]);
        });
      });
    }
  });

  it("uses exactly the same diagram for every BM and DLP counterpart", () => {
    OBJECTIVES.forEach((objective) => {
      const bm = questions(objective, "bm");
      const dlp = questions(objective, "dlp");
      bm.forEach((q, i) => {
        expect(q.visual).toBe(dlp[i].visual);
        if (q.visual) {
          expect(q.visual.kind).toBe("geometry-diagram");
          expect(q.visual.panels).toHaveLength(1);
        }
      });
    });
  });

  it("does not identify the right angle in classification questions", () => {
    for (const visual of [V.foundation[6], V.foundation[16], V.foundation[17], V.foundation[29],
      V.challenge[1], V.challenge[2], V.challenge[3], V.challenge[9],
      V.challenge[11], V.challenge[12], V.challenge[13], V.challenge[15], V.challenge[30]]) {
      expect(visual?.kind).toBe("geometry-diagram");
      if (visual?.kind === "geometry-diagram") {
        expect(visual.panels[0].paths).toHaveLength(3);
        const description = describeMathQuestionVisual(visual, "dlp");
        expect(description).toContain("not a connected triangle or an angle");
      }
    }
  });

  it("keeps unknowns and computed answers out of the diagrams", () => {
    const cases = [
      [V.practice[1], "9 cm", "12 cm", "15 cm"],
      [V.practice[5], "13 m", "5 m", "12 m"],
      [V.practice[13], "6 m", "5 m", "4 m"],
      [V.challenge[4], "13 cm", "24 cm", "5 cm"],
      [V.challenge[19], "16 m", "6 m", "8 m"],
      [V.challenge[24], "16 m", "21 m", "25.6 m"],
    ] as const;
    for (const [visual, givenA, givenB, answer] of cases) {
      const description = describeMathQuestionVisual(visual!, "dlp");
      expect(description).toContain(givenA);
      expect(description).toContain(givenB);
      expect(description).not.toContain(answer);
    }
  });

  it("renders static, mobile-readable SVGs with a bilingual accessible description", () => {
    for (const bank of MAPS) {
      for (const visual of Object.values(bank)) {
        for (const lang of LANGS) {
          const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
          expect(html).toContain('data-math-visual="geometry-diagram"');
          expect(html).toContain('role="img"');
          expect(html).toContain("<svg");
          expect(html).not.toMatch(/<canvas|<animate|animation:|transition:/);
          expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
        }
      }
    }
  });

  it("renders accurate scale relationships between independent side segments", () => {
    for (const diagram of [V.challenge[1], V.challenge[2], V.challenge[12]]) {
      expect(diagram?.kind).toBe("geometry-diagram");
      if (diagram?.kind !== "geometry-diagram") continue;
      const paths = diagram.panels[0].paths ?? [];
      expect(paths).toHaveLength(3);
      expect(paths.every((path) => path.points.length === 2)).toBe(true);
      const distances = paths.map((path) => path.points[1][0] - path.points[0][0]);
      expect(distances[0]).toBeLessThan(distances[1]);
      expect(distances[1]).toBeLessThan(distances[2]);
    }
  });

  it("draws genuinely acute and obtuse Foundation triangle sketches", () => {
    const apexDot = (number: 13 | 14) => {
      const diagram = V.foundation[number];
      if (!diagram || diagram.kind !== "geometry-diagram") throw new Error("Expected geometry");
      const [a, b, c] = diagram.panels[0].paths![0].points;
      return (b[0] - a[0]) * (c[0] - a[0]) + (b[1] - a[1]) * (c[1] - a[1]);
    };
    expect(apexDot(13)).toBeGreaterThan(0);
    expect(apexDot(14)).toBeLessThan(0);
    const angles = describeMathQuestionVisual(V.foundation[27]!, "dlp");
    expect(angles).toContain("30°");
    expect(angles).toContain("60°");
    expect(angles).toContain("90°");
  });

  it("illustrates two linked triangles correctly without revealing AC or AD", () => {
    const diagram = V.challenge[7];
    expect(diagram?.kind).toBe("geometry-diagram");
    if (diagram?.kind !== "geometry-diagram") return;
    const accessible = describeMathQuestionVisual(diagram, "dlp");
    for (const given of ["AB = 6 cm", "BC = 8 cm", "CD = 24 cm", "AC = ?", "AD = ?"]) {
      expect(accessible).toContain(given);
    }
    expect(accessible).not.toContain("10 cm");
    expect(accessible).not.toContain("26 cm");
    const paths = diagram.panels[0].paths!;
    expect(paths).toHaveLength(4);
    // The second right-angle marker is two perpendicular short segments.
    const [a, b, c] = paths[3].points;
    const one = [b[0] - a[0], b[1] - a[1]];
    const two = [c[0] - b[0], c[1] - b[1]];
    expect(one[0] * two[0] + one[1] * two[1]).toBe(0);
  });

  it("never adds visuals from this chapter into unrelated chapters", () => {
    for (const chapter of ["Chapter 2", "Chapter 3", "Chapter 12"]) {
      const bank = resolveMathObjectiveQuestions({
        form: "Form 1", chapter, mathObjectiveId: "objective-1",
        lang: "dlp", scienceLang: "dlp",
      }).questions;
      expect(bank.some((q) => Object.values(V.foundation).includes(q.visual as never))).toBe(false);
    }
  });
});
