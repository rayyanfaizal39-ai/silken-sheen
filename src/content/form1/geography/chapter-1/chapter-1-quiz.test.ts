import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import { buildQuizCatalog } from "@/features/quiz/catalog/buildQuizCatalog";
import {
  createAttemptSnapshot,
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  restoreAttemptOrder,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";

// Geografi Tingkatan 1 Bab 1 — Arah. The live bank is the `quizzes` export of src/data/content.ts
// (the registry reads it); src/data/quizzes.ts holds a stale copy that is not served.
const chapter1 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 1",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter1.find((q) => q.id === `geo-f1-c1-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter1.map((q) => text(num(q))).join("\n");

// DSKP skill of every question: 1.1.1 directions, 1.1.2 Sun, 1.1.3 compass, 1.1.4 bearing.
const SKILL: Record<string, number[]> = {
  directions: [1, 2, 3, 7, 8, 9, 10, 13],
  sun: [5, 6, 15, 16],
  compass: [18, 19, 20, 22, 23, 24, 25, 29],
  bearing: [4, 11, 12, 14, 17, 21, 26, 27, 28, 30],
};
const TIERS = [
  "easy",
  "easy",
  "easy",
  "easy",
  "easy",
  "medium",
  "medium",
  "medium",
  "medium",
  "easy",
  "easy",
  "easy",
  "medium",
  "easy",
  "medium",
  "medium",
  "medium",
  "medium",
  "easy",
  "medium",
  "easy",
  "easy",
  "medium",
  "medium",
  "medium",
  "medium",
  "hard",
  "hard",
  "medium",
  "medium",
];

describe("Geografi Form 1 Bab 1 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter1).toHaveLength(30);
    expect(chapter1.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `geo-f1-c1-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 1").map((q) => q.id)).toEqual(
      chapter1.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter1) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 1"]);
    }
    expect(new Set(chapter1.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no picture, map or diagram dependency", () => {
    expect(allText).not.toMatch(
      /gambar|foto|rajah di atas|peta di atas|berdasarkan (peta|rajah|gambar)|titik P\b/i,
    );
    for (const q of chapter1) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("has no semantic near-duplicates", () => {
    const words = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s]/gu, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    for (let i = 1; i <= 30; i += 1) {
      for (let j = i + 1; j <= 30; j += 1) {
        const a = words(byId(i).question);
        const b = words(byId(j).question);
        const shared = [...a].filter((w) => b.has(w)).length;
        expect(shared / Math.min(a.size, b.size), `q${i}/q${j} stems`).toBeLessThan(0.85);
        // Several single-direction questions legitimately share the four main directions.
        if (byId(i).options.some((o) => o.length > 10)) {
          expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
            [...byId(j).options].sort().join("|"),
          );
        }
      }
    }
  });
});

describe("Geografi Form 1 Bab 1 DSKP coverage", () => {
  it("covers every question once across the four official skills", () => {
    expect(
      Object.values(SKILL)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SKILL.directions.length).toBeGreaterThanOrEqual(7);
    expect(SKILL.sun.length).toBeGreaterThanOrEqual(4);
    expect(SKILL.compass.length).toBeGreaterThanOrEqual(7);
    expect(SKILL.bearing.length).toBeGreaterThanOrEqual(10);
  });

  it("tests the Sun method as a procedure, not as Earth-rotation theory", () => {
    expect(byId(6).question).toMatch(/langkah/i);
    expect(correct(6)).toMatch(
      /Menghadap Matahari terbit.*Timur di hadapan.*tangan kiri ialah Utara/,
    );
    expect(byId(6).question).not.toMatch(/mengapakah|berputar/i);
    expect(chapter1.filter((q) => /berputar|mengelilingi Bumi/.test(q.question))).toEqual([]);
    expect(correct(15)).toBe("Barat");
    expect(correct(16)).toBe("Utara");
  });

  it("does not spend two questions on the same compass magnetism mechanism", () => {
    const magnetism = chapter1.filter((q) => /magnet/i.test(q.options[q.answerIndex]));
    expect(magnetism.map(num)).toEqual([18]);
    expect(correct(18)).toMatch(/medan magnet Bumi/);
    expect(correct(22)).toMatch(/utara/);
  });

  it("covers compass use with an integrated procedure instead of only micro-steps", () => {
    expect(byId(20).question).toMatch(/Susunan langkah/);
    // Exactly one correct order: face object, flat, away from iron, align U, read.
    expect(correct(20)).toBe(
      "Menghadap kantin; letakkan kompas mendatar; jauhi besi; orientasikan jarum ke U; baca arah",
    );
    const microSteps = chapter1.filter((q) =>
      /permukaan yang rata|pagar besi|sejajar dengan tanda|menara hendak ditentukan/i.test(
        q.question,
      ),
    );
    expect(microSteps.length).toBeLessThanOrEqual(3);
    expect(chapter1.some((q) => /Arah menara hendak ditentukan/.test(q.question))).toBe(false);
  });

  it("tests the bearing procedure and error diagnosis, not a hidden-angle arithmetic trick", () => {
    expect(byId(27).question).toMatch(/pusat jangka sudut di sekolah/);
    expect(correct(27)).toBe("Letakkan pusat jangka sudut di rumah");
    expect(chapter1.some((q) => /dari Selatan ke Barat|40°/.test(q.question))).toBe(false);
    expect(correct(28)).toBe("315°");
    expect(byId(28).question).toMatch(/melawan arah jam/);
    expect(byId(28).explanation).toMatch(/360° - 45° = 315°/);
    expect(correct(17)).toBe("Di rumah");
    expect(byId(17).explanation).toMatch(/titik rujukan/);
  });

  it("keeps the bearing and direction facts right", () => {
    expect(correct(13)).toBe("Utara"); // Buruj Biduk
    expect(correct(21)).toBe("090°"); // East
    expect(correct(26)).toBe("Barat Daya"); // 225° = SW
    expect(correct(30)).toBe("135°"); // between East and South
    expect(correct(11)).toBe("Mengikut arah jam dari Utara.");
    expect(correct(12)).toBe("Darjah");
    expect(correct(14)).toBe("Jangka sudut");
    expect(correct(9)).toBe("Barat Daya");
    expect(correct(10)).toBe("Tenggara");
    expect(correct(8)).toBe("Timur");
    expect(correct(2)).toBe("8");
    expect(byId(26).explanation).toMatch(/Selatan \(180°\).*Barat \(270°\)/);
    expect(byId(30).explanation).toMatch(/Timur \(090°\).*Selatan \(180°\)/);
  });
});

describe("Geografi Form 1 Bab 1 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter1)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter1.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter1.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter1.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter1) {
      const lengths = q.options.map(len);
      // Very short labels (a place, a unit) cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("keeps same-type options: directions, bearings, instruments, procedures", () => {
    const directions = /^(Utara|Selatan|Timur|Barat|Timur Laut|Tenggara|Barat Daya|Barat Laut)$/;
    for (const n of [3, 5, 8, 9, 10, 13, 15, 16, 26, 29]) {
      expect(
        byId(n).options.every((o) => directions.test(o)),
        `q${n}`,
      ).toBe(true);
    }
    for (const n of [21, 28, 30]) {
      expect(
        byId(n).options.every((o) => /^\d{3}°$/.test(o)),
        `q${n}`,
      ).toBe(true);
    }
    expect(byId(20).options.every((o) => o.split("; ").length === 5)).toBe(true);
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter1.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Geografi Form 1 Bab 1 difficulty and catalog", () => {
  it("keeps 12 Easy / 16 Medium / 2 Hard", () => {
    for (const q of chapter1) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(TIERS[num(q) - 1]);
    }
    const count = (t: string) =>
      chapter1.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      12, 16, 2,
    ]);
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 1",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 12,
      mediumCount: 16,
      hardCount: 2,
      maxXp: 1125,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 1', 'bm', 30, 12, 16, 2, true, 1125`,
    );
  });
});

describe("Geografi Form 1 Bab 1 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter1, scope, seeded(seed));
      expect(issues).toEqual([]);
      expect(questions).toHaveLength(30);
      expect(new Set(questions.map((q) => q.id)).size).toBe(30);
      const ranks = questions.map((q) => rank[normalizeQuizDifficulty(q.difficulty)!]);
      expect(ranks).not.toEqual([...ranks].sort((a, b) => a - b));
      for (const q of questions) {
        expect(normalizeQuizDifficulty(q.difficulty)).toBe(TIERS[num(q) - 1]);
      }
    }
  });

  it("gives a new order for a new attempt and restores a saved attempt unchanged", () => {
    const a = orderRegularQuizQuestions(chapter1, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter1, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c1", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c1", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c2", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter1) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
