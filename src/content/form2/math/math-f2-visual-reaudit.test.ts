import { describe, expect, it } from "vitest";
import { buildPairedQuizBank } from "./paired-quiz-bank";
import { mathF2VisualForSeed } from "./quiz-visuals";
import { mathF2C3PairedSeeds as c3 } from "./chapter-3/quiz-bank";
import { mathF2C4PairedSeeds as c4 } from "./chapter-4/quiz-bank";
import { mathF2C5PairedSeeds as c5 } from "./chapter-5/quiz-bank";
import { mathF2C6PairedSeeds as c6 } from "./chapter-6/quiz-bank";
import { mathF2C7PairedSeeds as c7 } from "./chapter-7/quiz-bank";
import { mathF2C8PairedSeeds as c8 } from "./chapter-8/quiz-bank";
import { mathF2C9PairedSeeds as c9 } from "./chapter-9/quiz-bank";
import { mathF2C10PairedSeeds as c10 } from "./chapter-10/quiz-bank";
import { mathF2C11PairedSeeds as c11 } from "./chapter-11/quiz-bank";
import { mathF2C12PairedSeeds as c12 } from "./chapter-12/quiz-bank";
import { mathF2C13PairedSeeds as c13 } from "./chapter-13/quiz-bank";

const chapters = [
  [3, c3], [4, c4], [5, c5], [6, c6], [7, c7], [8, c8],
  [9, c9], [10, c10], [11, c11], [12, c12], [13, c13],
] as const;

describe("Math Form 2 visual re-audit", () => {
  for (const [chapter, seeds] of chapters) {
    it(`Chapter ${chapter}: preserves 90 BM and 90 DLP questions, answer keys and progression`, () => {
      const bm = buildPairedQuizBank(chapter, "bm", seeds);
      const dlp = buildPairedQuizBank(chapter, "dlp", seeds);
      expect(bm).toHaveLength(90);
      expect(dlp).toHaveLength(90);
      expect(new Set(bm.map((q) => q.id)).size).toBe(90);
      expect(new Set(dlp.map((q) => q.id)).size).toBe(90);
      for (const [index, q] of bm.entries()) {
        const en = dlp[index];
        expect(q.difficulty).toBe(en.difficulty);
        expect(q.difficulty).toBe(index < 30 ? "Easy" : index < 75 ? "Medium" : "Hard");
        expect(q.id).toBe(`bm-f2-c${chapter}-${index < 30 ? "f" : index < 60 ? "p" : "c"}${String(index % 30 + 1).padStart(2, "0")}`);
        expect(en.id).toBe(q.id.replace(/^bm-/, "dlp-"));
        expect(q.options).toHaveLength(4);
        expect(en.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(new Set(en.options).size).toBe(4);
        expect(q.answerIndex).toBe(en.answerIndex);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(q.options[q.answerIndex]).toBeTruthy();
        expect(en.options[en.answerIndex]).toBeTruthy();
        expect(q.explanation?.trim()).toBeTruthy();
        expect(en.explanation?.trim()).toBeTruthy();
        expect(q.visual).toEqual(en.visual);
      }
    });
  }

  it("attaches exactly 28 bilingual pair diagrams, only where the premises match", () => {
    const expectedCounts = new Map<number, number>([
      [3, 0], [4, 2], [5, 3], [6, 2], [7, 2], [8, 2],
      [9, 0], [10, 2], [11, 5], [12, 10], [13, 0],
    ]);
    let total = 0;
    for (const [chapter, seeds] of chapters) {
      const bm = buildPairedQuizBank(chapter, "bm", seeds);
      const count = bm.filter((q) => q.visual).length;
      expect(count, `Chapter ${chapter} visual count`).toBe(expectedCounts.get(chapter));
      total += count;
      for (let i = 0; i < 90; i++) {
        expect(bm[i].visual).toEqual(mathF2VisualForSeed(chapter, seeds[i].question[0]));
      }
    }
    expect(total).toBe(28);
  });

  it("corrects the misleading radius/chord construction in both languages", () => {
    const bm = buildPairedQuizBank(5, "bm", c5);
    const dlp = buildPairedQuizBank(5, "dlp", c5);
    const index = bm.findIndex((q) => q.question.includes("Garis OP dari pusat"));
    expect(index).toBeGreaterThanOrEqual(0);
    expect(dlp[index].question).toContain("Line OP from the centre");
    expect(bm[index].options[bm[index].answerIndex]).toBe("AP = PB");
    expect(bm[index].visual?.kind).toBe("geometry-diagram");
  });

  it("does not offer an alternative congruent verdict as a distractor", () => {
    const bm = buildPairedQuizBank(11, "bm", c11);
    const dl = buildPairedQuizBank(11, "dlp", c11);
    for (const bank of [bm, dl]) {
      const items = bank.filter((q) => /Segi tiga A\d+ bersisi|Triangle A\d+ has sides/.test(q.question));
      expect(items).toHaveLength(5);
      for (const q of items) {
        expect(q.options).not.toContain("Kongruen kerana kedua-duanya segi tiga");
        expect(q.options).not.toContain("Congruent because both are triangles");
      }
    }
  });
});
