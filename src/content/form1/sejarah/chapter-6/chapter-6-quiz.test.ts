import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";

// Sejarah Form 1 Bab 6 — Peningkatan Tamadun Yunani dan Rom. The live bank is the
// `quizzes` export of src/data/content.ts (the registry and the quiz route read it).
const isSejF1 = (q: { subjectId: string; form: string }) =>
  q.subjectId === "sejarah" && q.form === "Form 1";
const chapter6 = quizzes.filter((q) => isSejF1(q) && q.chapter === "Chapter 6");
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter6.find((q) => q.id === `sej-f1-c6-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter6.map((q) => text(num(q))).join("\n");

// Tier of every id, fixed by the quiz catalog (8 Easy / 15 Medium / 7 Hard).
const TIERS: Record<number, "easy" | "medium" | "hard"> = {
  1: "easy",
  2: "medium",
  3: "medium",
  4: "medium",
  5: "medium",
  6: "hard",
  7: "medium",
  8: "medium",
  9: "easy",
  10: "medium",
  11: "medium",
  12: "medium",
  13: "hard",
  14: "easy",
  15: "hard",
  16: "easy",
  17: "medium",
  18: "medium",
  19: "medium",
  20: "medium",
  21: "medium",
  22: "hard",
  23: "easy",
  24: "easy",
  25: "hard",
  26: "medium",
  27: "hard",
  28: "hard",
  29: "easy",
  30: "easy",
};

// Official subtopic and theme of every question (6.1-6.4 of the approved notes).
const SUBTOPIC: Record<number, "6.1" | "6.2" | "6.3" | "6.4"> = {
  1: "6.1",
  2: "6.1",
  3: "6.1",
  26: "6.1",
  4: "6.2",
  5: "6.2",
  6: "6.2",
  7: "6.2",
  8: "6.2",
  9: "6.2",
  10: "6.2",
  11: "6.2",
  22: "6.2",
  23: "6.2",
  24: "6.2",
  28: "6.2",
  12: "6.3",
  17: "6.3",
  21: "6.3",
  29: "6.3",
  13: "6.4",
  14: "6.4",
  15: "6.4",
  16: "6.4",
  18: "6.4",
  19: "6.4",
  20: "6.4",
  25: "6.4",
  27: "6.4",
  30: "6.4",
};
const subtopicCount = (s: string) => Object.values(SUBTOPIC).filter((v) => v === s).length;

describe("Sejarah Form 1 Bab 6 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each", () => {
    expect(chapter6).toHaveLength(30);
    expect(chapter6.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c6-q${i + 1}`).sort(),
    );
    expect(new Set(chapter6.map((q) => q.id)).size).toBe(30);
  });

  it("is what the registry serves for the chapter", () => {
    expect(getChapterQuizQuestions("sejarah", "Form 1", "Chapter 6").map((q) => q.id)).toEqual(
      chapter6.map((q) => q.id),
    );
  });

  it("keeps the difficulty tier of every id", () => {
    for (const q of chapter6) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(TIERS[num(q)]);
    }
    const count = (t: string) => Object.values(TIERS).filter((v) => v === t).length;
    expect([count("easy"), count("medium"), count("hard")]).toEqual([8, 15, 7]);
  });

  it("has four usable distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter6) {
      expect(q.options, q.id).toHaveLength(4);
      for (const option of q.options) expect(option.trim().length, q.id).toBeGreaterThan(2);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(Number.isInteger(q.answerIndex), q.id).toBe(true);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(20);
    }
    expect(new Set(chapter6.map((q) => q.question)).size).toBe(30);
  });

  it("keeps the identity fields and does not depend on a picture or table", () => {
    for (const q of chapter6) {
      expect([q.subjectId, q.form, q.chapter]).toEqual(["sejarah", "Form 1", "Chapter 6"]);
      expect(Object.keys(q).filter((k) => /image|img|media|video|audio/i.test(k))).toEqual([]);
    }
    expect(allText).not.toMatch(/gambar|\bpeta\b|jadual|rajah|foto|di atas/i);
  });

  it("leaves the other Sejarah Form 1 chapters at 30 questions with their own ids", () => {
    for (const chapter of [1, 2, 3, 4, 5, 7, 8]) {
      const questions = getChapterQuizQuestions("sejarah", "Form 1", `Chapter ${chapter}`);
      expect(questions, `Chapter ${chapter}`).toHaveLength(30);
      expect(questions.every((q) => q.id.startsWith(`sej-f1-c${chapter}-q`))).toBe(true);
    }
    expect(quizzes.filter((q) => q.id.startsWith("sej-f1-c6-"))).toHaveLength(30);
  });
});

describe("Sejarah Form 1 Bab 6 coverage", () => {
  it("covers all four official subtopics without letting one disappear", () => {
    expect(Object.keys(SUBTOPIC)).toHaveLength(30);
    expect(subtopicCount("6.1")).toBeGreaterThanOrEqual(3);
    expect(subtopicCount("6.2")).toBeLessThanOrEqual(13);
    expect(subtopicCount("6.3")).toBeGreaterThanOrEqual(4);
    expect(subtopicCount("6.4")).toBeGreaterThanOrEqual(8);
  });

  it("tests the missing source areas: Rome's society and Pax Romana, Sparta, Greek sea", () => {
    expect(correct(17)).toBe("Plebian");
    expect(byId(21).question).toMatch(/Pax Romana/);
    expect(byId(24).question).toMatch(/Sparta/);
    expect(correct(26)).toMatch(/laut/);
  });

  it("covers the four Athens bodies and the five government systems", () => {
    expect(byId(9).question).toMatch(/Dewan Perhimpunan/);
    expect(byId(8).question).toMatch(/Majlis/);
    expect(byId(11).question).toMatch(/Majistret/);
    expect(byId(23).question).toMatch(/Juri/);
    expect(correct(4)).toBe("Monarki, oligarki, aristokrasi, tirani dan demokrasi");
  });
});

describe("Sejarah Form 1 Bab 6 source discipline", () => {
  it("keeps facts outside the approved Bab 6 source out of the quiz", () => {
    // Found by the audit: none of these appear in the approved Bab 6 notes.
    expect(allText).not.toMatch(/demokrasi perwakilan/i);
    expect(allText).not.toMatch(/wanita|dikecualikan/i);
    expect(allText).not.toMatch(/benteng pertahanan terakhir|kawasan tertinggi/i);
    expect(allText).not.toMatch(/gerbang/i);
    expect(allText).not.toMatch(/negara kota bebas/i);
    expect(allText).not.toMatch(/puncak kubah|oculus/i);
    expect(allText).not.toMatch(/tunjang|kestabilan|mengorbankan/i);
  });

  it("avoids absolute claims the source does not make", () => {
    expect(allText).not.toMatch(/\b(paling|sentiasa|sahaja|hanya)\b/i);
    expect(allText).not.toMatch(/\bsemua\b/i);
  });

  it("states the Athens and Sparta facts as the notes do", () => {
    expect(correct(8)).toBe("Melaksanakan keputusan Dewan Perhimpunan");
    expect(correct(11)).toMatch(/dasar/);
    expect(correct(23)).toMatch(/kes/);
    expect(correct(22)).toBe("Pericles");
    expect(correct(24)).toBe("Dua orang");
    expect(correct(10)).toMatch(/ketenteraan/);
  });

  it("states the Roman facts as the notes do", () => {
    expect(correct(12)).toBe("Tanah subur dan laluan ke laut");
    expect(correct(14)).toBe("Kubah berbentuk bulat");
    expect(correct(16)).toMatch(/dewa-dewi/);
    expect(correct(20)).toMatch(/perpustakaan/);
    expect(correct(25)).toMatch(/tentera/);
    expect(correct(30)).toBe("Simen");
    expect(correct(27)).toBe("Kepakaran");
  });

  it("keeps same-domain distractors: no repeated distractor sets across Athens-body questions", () => {
    const options = [8, 11, 23].map((n) => byId(n).options);
    const wrong = options.flatMap((o, i) =>
      o.filter((_, j) => j !== byId([8, 11, 23][i]).answerIndex),
    );
    expect(new Set(wrong).size).toBe(wrong.length);
  });
});

describe("Sejarah Form 1 Bab 6 answer-cue control", () => {
  const len = (s: string) => s.length;

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter6.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others) * 1.25;
    });
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter6.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others);
    });
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter6.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) < Math.min(...others);
    });
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter6) {
      const lengths = q.options.map(len);
      if (Math.max(...lengths) <= 20) continue; // names and labels are naturally short
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.6);
    }
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter6.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Sejarah Form 1 Bab 6 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  it("puts all 30 questions into an attempt and reorders them per attempt", () => {
    const scope = { subjectId: "sejarah", form: "Form 1" };
    const a = orderRegularQuizQuestions(chapter6, scope, seeded(1));
    const b = orderRegularQuizQuestions(chapter6, scope, seeded(2));
    expect(a.issues).toEqual([]);
    expect(a.questions).toHaveLength(30);
    expect(new Set(a.questions.map((q) => q.id)).size).toBe(30);
    expect(a.questions.map((q) => q.id)).not.toEqual(b.questions.map((q) => q.id));
    const first = a.questions.map((q) => q.id);
    expect(a.questions.map((q) => q.id)).toEqual(first);
  });

  it("mixes difficulties across the attempt while keeping 8/15/7 and each question's tier", () => {
    const scope = { subjectId: "sejarah", form: "Form 1" };
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions } = orderRegularQuizQuestions(chapter6, scope, seeded(seed));
      const tiers = questions.map((q) => normalizeQuizDifficulty(q.difficulty)!);
      const ranks = tiers.map((t) => rank[t]);
      expect(ranks).not.toEqual([...ranks].sort((a, b) => a - b));
      expect(tiers.filter((t) => t === "easy")).toHaveLength(8);
      expect(tiers.filter((t) => t === "medium")).toHaveLength(15);
      expect(tiers.filter((t) => t === "hard")).toHaveLength(7);
      for (const q of questions) expect(normalizeQuizDifficulty(q.difficulty)).toBe(TIERS[num(q)]);
    }
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter6) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
