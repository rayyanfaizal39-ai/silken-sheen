import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { MATH_F1_C2_QUIZ_VISUALS as V } from "./quiz-visuals";
import { MathQuestionVisual } from "@/components/quiz/MathQuestionVisual";
import { describeMathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

const OBJECTIVES = ["objective-1", "objective-2", "objective-3"] as const;
const LANGS = ["bm", "dlp"] as const;
const expectedCounts = [3, 5, 7] as const;

const bank = (objective: (typeof OBJECTIVES)[number], lang: (typeof LANGS)[number]) =>
  resolveMathObjectiveQuestions({
    form: "Form 1",
    chapter: "Chapter 2",
    mathObjectiveId: objective,
    lang,
    scienceLang: lang,
  }).questions;

const visualName = (visual: unknown) =>
  Object.entries(V).find(([, value]) => value === visual)?.[0];

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

describe("Mathematics Form 1 Chapter 2 selective quiz visuals", () => {
  it("retains 30 answerable questions per objective in both languages, with 15 selective visuals", () => {
    for (const lang of LANGS) {
      OBJECTIVES.forEach((objective, index) => {
        const questions = bank(objective, lang);
        expect(questions, `${objective}/${lang}`).toHaveLength(30);
        const selected = questions.filter((question) => question.visual);
        expect(selected, `${objective}/${lang}`).toHaveLength(expectedCounts[index]);
        for (const question of questions) {
          expect(question.options).toHaveLength(4);
          expect(question.answerIndex).toBeGreaterThanOrEqual(0);
          expect(question.answerIndex).toBeLessThan(4);
          if (question.visual) expect(visualName(question.visual), question.id).toBeDefined();
        }
      });
    }
  });

  it("uses exactly the same diagrams in BM and DLP without affecting unrelated chapters", () => {
    const selected = (lang: "bm" | "dlp") =>
      OBJECTIVES.map((objective) =>
        bank(objective, lang)
          .filter((question) => question.visual)
          .map((question) => visualName(question.visual))
          .sort(),
      );
    expect(selected("bm")).toEqual(selected("dlp"));
    const used = new Set(selected("bm").flat());
    expect(used).toEqual(new Set(Object.keys(V)));
    for (const lang of LANGS) {
      const chapter1 = resolveMathObjectiveQuestions({
        form: "Form 1", chapter: "Chapter 1", mathObjectiveId: "objective-2", lang, scienceLang: lang,
      }).questions;
      expect(chapter1.some((question) => Object.values(V).includes(question.visual as never))).toBe(false);
    }
  });

  it("does not give away the LCM in recurring-event diagrams", () => {
    for (const visual of Object.values(V)) {
      if (visual.kind !== "multiple-tracks") continue;
      expect(visual.tracks.length).toBeGreaterThanOrEqual(2);
      const meetingPoint = visual.tracks.map((track) => track.every).reduce(lcm);
      expect(visual.upTo, visual.title.dlp).toBeLessThan(meetingPoint);
      for (const track of visual.tracks) {
        expect(Number.isInteger(track.every) && track.every > 0).toBe(true);
        expect(visual.upTo).toBeGreaterThanOrEqual(track.every);
      }
    }
  });

  it("draws exact item counts with neutral ten-column rows, without pregrouping answers", () => {
    for (const visual of Object.values(V)) {
      if (visual.kind !== "item-arrays") continue;
      expect(visual.groups.length).toBeGreaterThan(0);
      for (const group of visual.groups) {
        expect(Number.isInteger(group.count) && group.count > 0 && group.count <= 36).toBe(true);
      }
      const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang: "dlp" }));
      const count = [...html.matchAll(/<circle\s/g)].length;
      expect(count, visual.title.dlp).toBe(visual.groups.reduce((total, g) => total + g.count, 0));
    }
  });

  it("renders bilingual, accessible static SVGs for every chosen question", () => {
    for (const visual of Object.values(V)) {
      for (const lang of LANGS) {
        const html = renderToStaticMarkup(createElement(MathQuestionVisual, { visual, lang }));
        expect(html).toContain(`data-math-visual="${visual.kind}"`);
        expect(html).toContain('role="img"');
        expect(html).toContain("<svg");
        expect(html).not.toMatch(/<img|<canvas|<animate|animation:|transition:/);
        expect(describeMathQuestionVisual(visual, lang)).toContain(visual.title[lang]);
        if (visual.kind === "multiple-tracks") {
          for (const track of visual.tracks) {
            expect(html).toContain(String(track.every));
            const label = lang === "bm" ? "Setiap" : "Every";
            expect(html).toContain(`${label} ${track.every}`);
          }
        }
      }
    }
  });

  it("keeps representative factual answers intact", () => {
    const check = (objective: (typeof OBJECTIVES)[number], text: string, answer: string) => {
      const question = bank(objective, "dlp").find((entry) => entry.question.startsWith(text));
      expect(question, text).toBeDefined();
      expect(question!.options[question!.answerIndex]).toBe(answer);
    };
    check("objective-1", "The HCF of 12 and 18 is:", "6");
    check("objective-1", "The LCM of 4 and 6 is:", "12");
    check("objective-2", "The HCF of 16 and 24 is:", "8");
    check("objective-2", "The LCM of 6 and 8 is:", "24");
    check("objective-3", "Ali has 24 pencils and 36 pens.", "12");
    check("objective-3", "Bell A rings every 6 minutes", "24 minutes");
    check("objective-3", "A red light flashes every 9 seconds", "36 seconds");
  });
});
