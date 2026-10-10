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
const COUNTS = [15, 30, 29] as const;

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
  it("retains all 180 questions while adding only the 148 reviewed visual placements", () => {
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
        expect(description).toContain("There is no suggested angle");
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
      const description = describeMathQuestionVisual(visual, "dlp");
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
