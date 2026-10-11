import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C11_QUIZ_VISUALS as V } from "./quiz-visuals";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
type Objective = typeof OBJECTIVES[number];
type Lang = typeof LANGS[number];

const bank = (objective: Objective, lang: Lang) =>
  resolveMathObjectiveQuestions({
    form: "Form 1", chapter: "Chapter 11",
    mathObjectiveId: objective, lang, scienceLang: lang,
  }).questions;

const slots = {
  "objective-1": { 14: "structure" },
  "objective-2": {
    2: "oddNumbers", 6: "letterB", 14: "structure", 18: "smallEvens",
  },
  "objective-3": { 3: "lettersA", 15: "firstFour" },
} as const;
const keyOf = (visual: unknown) =>
  Object.entries(V).find(([, v]) => v === visual)?.[0] ?? null;

describe("Form 1 Mathematics Chapter 11 — accessible Venn diagrams", () => {
  it("keeps all six 30-question banks, every ID, difficulty and answer key intact", () => {
    for (const lang of LANGS) for (const objective of OBJECTIVES) {
      const questions = bank(objective, lang);
      expect(questions).toHaveLength(30);
      questions.forEach((q, index) => {
        expect(q.id).toBe(`math-f1-c11-${objective}-${lang}-q${index + 1}`);
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options)).toHaveProperty("size", 4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(q.explanation?.trim()).toBeTruthy();
      });
    }
  });

  it("places 7 helpful diagrams per language, at identical question positions", () => {
    for (const lang of LANGS) for (const objective of OBJECTIVES) {
      const expected = slots[objective] as Record<number, keyof typeof V>;
      const questions = bank(objective, lang);
      questions.forEach((q, index) => {
        const visual = expected[index + 1] ? V[expected[index + 1]] : undefined;
        expect(q.visual, q.id).toBe(visual);
      });
      expect(questions.filter(q => q.visual)).toHaveLength(Object.keys(expected).length);
    }
    const bmKeys = OBJECTIVES.flatMap(o => bank(o, "bm").map(q => keyOf(q.visual)));
    const dlpKeys = OBJECTIVES.flatMap(o => bank(o, "dlp").map(q => keyOf(q.visual)));
    expect(bmKeys).toEqual(dlpKeys);
    expect(new Set(bmKeys.filter(Boolean))).toEqual(new Set(Object.keys(V)));
  });

  it("keeps exact universal-set membership, with no duplicates or invented elements", () => {
    const expected: Record<keyof typeof V, { inside: string[]; outside: string[] }> = {
      structure: { inside: [], outside: [] },
      oddNumbers: { inside: ["1","3","5","7","9"], outside: [] },
      letterB: { inside: ["a","c","e","g"], outside: [] },
      smallEvens: { inside: ["2","4","6"], outside: [] },
      lettersA: { inside: ["a","c","e","g"], outside: [] },
      firstFour: { inside: ["1","2","3","4"], outside: [] },
    };
    for (const [key, visual] of Object.entries(V)) {
      expect(visual.kind).toBe("venn-one-set");
      expect(visual.inside).toEqual(expected[key as keyof typeof V].inside);
      expect(visual.outside).toEqual(expected[key as keyof typeof V].outside);
      const union = [...visual.inside, ...visual.outside];
      expect(new Set(union).size).toBe(union.length);
      expect(visual.inside.length).toBeLessThanOrEqual(9);
      expect(visual.outside.length).toBeLessThanOrEqual(10);
    }
  });

  it("renders large static diagrams with screen-reader membership data, without a solved complement", () => {
    for (const visual of Object.values(V)) for (const lang of LANGS) {
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
      expect(html).toContain('data-math-visual="venn-one-set"');
      expect(html).toContain('role="img"');
      expect(html).toContain("<svg");
      expect(html).toContain("max-w-[440px]");
      expect(html).not.toMatch(/<img|<canvas|<animate|<script/);
      const description = describeMathQuestionVisual(visual, lang);
      expect(description).toContain(visual.title[lang]);
      expect(description).not.toMatch(/A['′]\s*=|B['′]\s*=|n\(A['′]\)\s*=|n\(B['′]\)\s*=/);
    }
  });

  it("never draws more than the question states: the given set only, no complement", () => {
    // A′ is what these questions ask for, so the outside region stays empty,
    // and the circle shows exactly the set literal written in the stem.
    for (const lang of LANGS) for (const objective of OBJECTIVES) {
      for (const q of bank(objective, lang)) {
        if (q.visual?.kind !== "venn-one-set") continue;
        expect(q.visual.outside, q.id).toEqual([]);
        if (!q.visual.inside.length) continue;
        const literal = new RegExp(`\\b${q.visual.setName} = \\{([^}]*)\\}`).exec(q.question);
        expect(literal, `${q.id}: stem must list ${q.visual.setName}`).not.toBeNull();
        const given = literal![1].split(",").map((item) => item.trim());
        expect(q.visual.inside, q.id).toEqual(given);
      }
    }
  });

  it("does not announce an empty region as an empty set", () => {
    for (const visual of Object.values(V)) for (const lang of LANGS) {
      expect(describeMathQuestionVisual(visual, lang)).not.toContain("—");
    }
  });
});
