import { describe, expect, it } from "vitest";
import type { QuizQuestion } from "@/data/content";
import { scienceF2C2QuizzesBM } from "./chapter-2/quizzes-bm";
import { scienceF2C2QuizzesDLP } from "./chapter-2/quizzes-dlp";
import { scienceF2C3QuizzesBM } from "./chapter-3/quizzes-bm";
import { scienceF2C3QuizzesDLP } from "./chapter-3/quizzes-dlp";
import { scienceF2C4QuizzesBM } from "./chapter-4/quizzes-bm";
import { scienceF2C4QuizzesDLP } from "./chapter-4/quizzes-dlp";
import { scienceF2C5QuizzesBM } from "./chapter-5/quizzes-bm";
import { scienceF2C5QuizzesDLP } from "./chapter-5/quizzes-dlp";

/**
 * Guards for the targeted quiz-question replacement pass across Form 2
 * Science Chapters 2-5 (21 approved question pairs). This is a content
 * correction, not a restructuring: ids, counts, metadata and array order
 * must all be exactly as before, and only question/options/answerIndex/
 * explanation change for the 21 replaced ids per language.
 */

type Bank = { chapter: string; bm: QuizQuestion[]; dlp: QuizQuestion[]; expectedLength: number };

const BANKS: Bank[] = [
  {
    chapter: "Chapter 2",
    bm: scienceF2C2QuizzesBM,
    dlp: scienceF2C2QuizzesDLP,
    expectedLength: 30,
  },
  {
    chapter: "Chapter 3",
    bm: scienceF2C3QuizzesBM,
    dlp: scienceF2C3QuizzesDLP,
    expectedLength: 30,
  },
  {
    chapter: "Chapter 4",
    bm: scienceF2C4QuizzesBM,
    dlp: scienceF2C4QuizzesDLP,
    expectedLength: 30,
  },
  {
    chapter: "Chapter 5",
    bm: scienceF2C5QuizzesBM,
    dlp: scienceF2C5QuizzesDLP,
    expectedLength: 36,
  },
];

const REPLACED_QNUMS: Record<string, number[]> = {
  "Chapter 2": [9, 16, 18, 26, 28],
  "Chapter 3": [3, 6, 10, 13, 26],
  "Chapter 4": [3, 20, 24, 29, 30],
  "Chapter 5": [7, 9, 19, 23, 26, 29],
};

describe("Form 2 Science Chapters 2-5 quiz bank — structural integrity", () => {
  for (const { chapter, bm, dlp, expectedLength } of BANKS) {
    describe(chapter, () => {
      it("keeps the exact same question count as before this replacement pass", () => {
        expect(bm.length, `${chapter} BM count`).toBe(expectedLength);
        expect(dlp.length, `${chapter} DLP count`).toBe(expectedLength);
      });

      it("BM and DLP have the same length", () => {
        expect(dlp.length).toBe(bm.length);
      });

      it("BM and DLP ids match position-for-position", () => {
        bm.forEach((q, i) => {
          const bmSuffix = q.id.replace(/^sci-f2-c\d+-bm-/, "");
          const dlpSuffix = dlp[i].id.replace(/^sci-f2-c\d+-dlp-/, "");
          expect(dlpSuffix, `index ${i}`).toBe(bmSuffix);
        });
      });

      for (const [lang, quiz] of [
        ["bm", bm],
        ["dlp", dlp],
      ] as const) {
        it(`${lang}: every id is unique`, () => {
          const ids = new Set<string>();
          for (const q of quiz) {
            expect(ids.has(q.id), `duplicate id ${q.id}`).toBe(false);
            ids.add(q.id);
          }
        });

        it(`${lang}: every question has exactly 4 non-blank options`, () => {
          for (const q of quiz) {
            expect(q.options.length, q.id).toBe(4);
            for (const opt of q.options) expect(opt.trim().length, q.id).toBeGreaterThan(0);
          }
        });

        it(`${lang}: answerIndex is in range 0-3 and question/explanation are non-blank`, () => {
          for (const q of quiz) {
            expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
            expect(q.answerIndex, q.id).toBeLessThanOrEqual(3);
            expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
            expect(q.question.trim().length, q.id).toBeGreaterThan(0);
            expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(0);
          }
        });

        it(`${lang}: subjectId/form/chapter/lang metadata is unchanged`, () => {
          for (const q of quiz) {
            expect(q.subjectId, q.id).toBe("science");
            expect(q.form, q.id).toBe("Form 2");
            expect(q.chapter, q.id).toBe(chapter);
            expect(q.lang, q.id).toBe(lang);
          }
        });
      }

      it("the 21-pair replacement scope kept every other question's id/metadata untouched in position", () => {
        const replaced = new Set(REPLACED_QNUMS[chapter]);
        bm.forEach((q, i) => {
          const match = /-q(\d+)$/.exec(q.id);
          const num = match ? Number(match[1]) : -1;
          if (!replaced.has(num)) {
            // id and position must still line up with DLP for untouched questions too
            expect(dlp[i].id.replace(/-dlp-/, "-bm-"), `untouched ${q.id}`).toBe(q.id);
          }
        });
      });
    });
  }
});

describe("Form 2 Science quiz replacements — approved content spot-checks", () => {
  const find = (bank: QuizQuestion[], id: string) => {
    const q = bank.find((item) => item.id === id)!;
    expect(q, id).toBeTruthy();
    return q;
  };

  it("CH2 Q9 uses living/non-living wording, not biotic/abiotic", () => {
    const bm = find(scienceF2C2QuizzesBM, "sci-f2-c2-bm-q9");
    const dlp = find(scienceF2C2QuizzesDLP, "sci-f2-c2-dlp-q9");
    expect(bm.question + bm.options.join(" ") + bm.explanation).not.toMatch(/biotik|abiotik/i);
    expect(dlp.question + dlp.options.join(" ") + dlp.explanation).not.toMatch(/biotic|abiotic/i);
    expect(dlp.question).toMatch(/living component/i);
    expect(dlp.question).toMatch(/non-living component/i);
  });

  it("CH3 Q13 uses Millon's test, not Biuret", () => {
    const bm = find(scienceF2C3QuizzesBM, "sci-f2-c3-bm-q13");
    const dlp = find(scienceF2C3QuizzesDLP, "sci-f2-c3-dlp-q13");
    expect(bm.question).toMatch(/millon/i);
    expect(dlp.question).toMatch(/millon/i);
    expect(bm.question + dlp.question).not.toMatch(/biuret/i);
  });

  it("CH3 Q26 tests Visking tubing / absorption", () => {
    const bm = find(scienceF2C3QuizzesBM, "sci-f2-c3-bm-q26");
    const dlp = find(scienceF2C3QuizzesDLP, "sci-f2-c3-dlp-q26");
    expect(bm.question).toMatch(/visking/i);
    expect(dlp.question).toMatch(/visking/i);
  });

  it("CH4 Q20 tests the vaccination/artificial-active-immunity concept, not age/schedule trivia", () => {
    const dlp = find(scienceF2C4QuizzesDLP, "sci-f2-c4-dlp-q20");
    expect(dlp.question).toMatch(/vaccination/i);
    expect(dlp.question).not.toMatch(/aged \d+ years/i);
  });

  it("CH4 Q29 tests prescribed antibiotic dosage/timing", () => {
    const bm = find(scienceF2C4QuizzesBM, "sci-f2-c4-bm-q29");
    const dlp = find(scienceF2C4QuizzesDLP, "sci-f2-c4-dlp-q29");
    expect(bm.question).toMatch(/antibiotik/i);
    expect(bm.question).toMatch(/dos/i);
    expect(dlp.question).toMatch(/antibiotic/i);
    expect(dlp.question).toMatch(/dose|schedule/i);
  });

  it("CH4 Q30 does not claim immunity is automatically lifelong", () => {
    const bm = find(scienceF2C4QuizzesBM, "sci-f2-c4-bm-q30");
    const dlp = find(scienceF2C4QuizzesDLP, "sci-f2-c4-dlp-q30");
    const bmText = bm.question + bm.options.join(" ") + bm.explanation;
    const dlpText = dlp.question + dlp.options.join(" ") + dlp.explanation;
    expect(bmText).not.toMatch(/sepanjang hayat|kekal lama/i);
    expect(dlpText).not.toMatch(/lifelong|for life\b/i);
  });

  it("CH5 Q7 defines saturated solution correctly (maximum dissolvable amount)", () => {
    const dlp = find(scienceF2C5QuizzesDLP, "sci-f2-c5-dlp-q7");
    const correct = dlp.options[dlp.answerIndex];
    expect(correct).toMatch(/maximum amount of solute/i);
  });

  it("CH5 Q9 does not claim water dissolves every/almost every substance", () => {
    const bm = find(scienceF2C5QuizzesBM, "sci-f2-c5-bm-q9");
    const dlp = find(scienceF2C5QuizzesDLP, "sci-f2-c5-dlp-q9");
    const bmCorrect = bm.options[bm.answerIndex];
    const dlpCorrect = dlp.options[dlp.answerIndex];
    expect(bmCorrect).not.toMatch(/hampir semua|setiap bahan/i);
    expect(dlpCorrect).not.toMatch(/almost all|every substance/i);
    expect(dlpCorrect).toMatch(/many different substances/i);
  });

  it("CH5 Q23 tests rate of dissolving, not maximum solubility, and does not tie it to stirring", () => {
    const dlp = find(scienceF2C5QuizzesDLP, "sci-f2-c5-dlp-q23");
    const correct = dlp.options[dlp.answerIndex];
    expect(correct).toMatch(/rate at which/i);
    expect(dlp.question + dlp.options.join(" ")).not.toMatch(/stirring increases.*solubility/i);
  });

  it("CH5 Q26 tests slaked lime + fluoride functions", () => {
    const bm = find(scienceF2C5QuizzesBM, "sci-f2-c5-bm-q26");
    const dlp = find(scienceF2C5QuizzesDLP, "sci-f2-c5-dlp-q26");
    expect(bm.question).toMatch(/kapur mati/i);
    expect(bm.question).toMatch(/fluorida/i);
    expect(dlp.question).toMatch(/slaked lime/i);
    expect(dlp.question).toMatch(/fluoride/i);
  });

  it("every replaced question's BM and DLP correct answer sits at the same option position", () => {
    const PAIRS: [QuizQuestion[], QuizQuestion[], string][] = [
      [scienceF2C2QuizzesBM, scienceF2C2QuizzesDLP, "c2"],
      [scienceF2C3QuizzesBM, scienceF2C3QuizzesDLP, "c3"],
      [scienceF2C4QuizzesBM, scienceF2C4QuizzesDLP, "c4"],
      [scienceF2C5QuizzesBM, scienceF2C5QuizzesDLP, "c5"],
    ];
    for (const [bmBank, dlpBank, tag] of PAIRS) {
      const chapterNum = tag.replace("c", "");
      for (const num of REPLACED_QNUMS[`Chapter ${chapterNum}`]) {
        const bm = find(bmBank, `sci-f2-${tag}-bm-q${num}`);
        const dlp = find(dlpBank, `sci-f2-${tag}-dlp-q${num}`);
        expect(dlp.answerIndex, `${tag} q${num}`).toBe(bm.answerIndex);
      }
    }
  });
});
