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

// Geografi Tingkatan 1 Bab 2 — Kedudukan. The live bank is the `quizzes` export of
// src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter2 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 2",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter2.find((q) => q.id === `geo-f1-c2-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter2.map((q) => text(num(q))).join("\n");

const TOPIC: Record<string, number[]> = {
  "relative position (2.1)": [1, 2, 3, 4, 5, 28],
  latitude: [6, 7, 8, 9, 10, 11, 13, 26],
  "longitude, GMP, GTA": [14, 15, 17, 18, 19],
  "coordinate reading and application": [12, 16, 20, 21, 22, 23, 24, 25, 27, 29, 30],
};
const TIERS = [
  "easy",
  "easy",
  "easy",
  "medium",
  "medium",
  "easy",
  "easy",
  "easy",
  "medium",
  "medium",
  "medium",
  "hard",
  "easy",
  "easy",
  "easy",
  "medium",
  "easy",
  "medium",
  "medium",
  "easy",
  "easy",
  "easy",
  "hard",
  "easy",
  "medium",
  "medium",
  "medium",
  "easy",
  "hard",
  "medium",
];

describe("Geografi Form 1 Bab 2 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter2).toHaveLength(30);
    expect(chapter2.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `geo-f1-c2-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 2").map((q) => q.id)).toEqual(
      chapter2.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter2) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 2"]);
    }
    expect(new Set(chapter2.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no picture, map or diagram dependency", () => {
    expect(allText).not.toMatch(
      /gambar|foto|rajah di atas|peta di atas|berdasarkan (peta|rajah|gambar)/i,
    );
    for (const q of chapter2) {
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
        expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
          [...byId(j).options].sort().join("|"),
        );
      }
    }
  });

  it("uses natural Bahasa Melayu without English connectors", () => {
    expect(allText).not.toMatch(/\d°\s?[UTBS]\s(and|to)\s/);
    expect(allText).not.toMatch(/\bTo follow\b|\bThe\b|\band\b(?=\s\d)/);
    expect(allText).not.toMatch(/bahagian atas bumi|bahagian bawah bumi/i);
  });
});

describe("Geografi Form 1 Bab 2 coverage", () => {
  it("covers every question once across relative position, latitude, longitude and coordinates", () => {
    expect(
      Object.values(TOPIC)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(TOPIC["relative position (2.1)"].length).toBeGreaterThanOrEqual(6);
    expect(TOPIC.latitude.length).toBeGreaterThanOrEqual(6);
    expect(TOPIC["longitude, GMP, GTA"].length).toBeGreaterThanOrEqual(5);
    expect(TOPIC["coordinate reading and application"].length).toBeGreaterThanOrEqual(9);
  });

  it("makes changing the reference point a tested idea, with no building-front rule", () => {
    expect(byId(5).question).toMatch(/titik rujukan/);
    expect(correct(5)).toMatch(/Kedudukan relatif murid lain/);
    expect(byId(5).explanation).toMatch(/titik rujukan ditukar/);
    expect(allText).not.toMatch(
      /pintu depan|pintu masuk|hadapan.*bangunan|bangunan seperti masjid/i,
    );
    expect(correct(28)).toBe("Sebelah kanan masjid.");
    expect(correct(2)).toBe("Titik rujukan.");
    expect(correct(4)).toBe("Sebelah kanan Siti.");
  });

  it("keeps the latitude and longitude facts as the textbook prints them", () => {
    expect(correct(7)).toBe("Garisan Khatulistiwa.");
    expect(correct(8)).toBe("Hemisfera Utara dan Hemisfera Selatan.");
    expect(correct(9)).toBe("66 ½° Utara.");
    expect(correct(11)).toBe("Garisan Jadi.");
    expect(correct(13)).toBe("90°.");
    expect(correct(15)).toBe("Garisan Meridian Pangkal.");
    expect(correct(17)).toBe("Timur dan Barat.");
    expect(correct(18)).toBe("180° T/B.");
    expect(correct(19)).toBe("Memisahkan tarikh dan waktu di bumi.");
    expect(byId(18).explanation).toMatch(/180° T\/B/);
    expect(byId(15).explanation).toMatch(/Greenwich/);
  });

  it("does not over-test isolated latitude values", () => {
    const valueRecall = chapter2.filter((q) =>
      /nilai darjah|terletak pada nilai|berada pada nilai/i.test(q.question),
    );
    expect(valueRecall.length).toBeLessThanOrEqual(3);
    expect(correct(10)).toBe("Garisan Antartik.");
    expect(byId(10).question).toMatch(/Hemisfera Selatan/);
  });

  it("removes the unsupported GTA geometry, date arithmetic and Greenwich trivia", () => {
    expect(chapter2.map((q) => q.question).join(" ")).not.toMatch(/bengkang|zigzag|bengkok/i);
    expect(allText).not.toMatch(/waktu akan berhenti|waktu berhenti/i);
    expect(allText).not.toMatch(
      /merentasi.*Garisan Tarikh|dari Timur ke Barat.*tarikh|sehari lebih lewat/i,
    );
    expect(allText).not.toMatch(/Balai Cerap|Royal Observatory|saintis yang menemuinya/i);
    expect(
      chapter2.filter((q) => /Garisan Tarikh Antarabangsa|GTA/.test(q.question)).length,
    ).toBeLessThanOrEqual(2);
  });

  it("replaces the mnemonic with real coordinate interpretation", () => {
    expect(allText).not.toMatch(/superhero|tips|akronim|mnemonik/i);
    expect(correct(22)).toBe("Latitud dahulu, kemudian longitud.");
    expect(correct(24)).toBe("4° U, 102° T.");
    expect(correct(21)).toBe("Persilangan antara latitud dan longitud.");
    expect(correct(20)).toBe("Latitud dan longitud.");
  });

  it("tests coordinate reading: hemispheres, possible coordinates, reversed order and intervals", () => {
    expect(correct(27)).toBe("Hemisfera Selatan dan sebelah timur GMP.");
    expect(byId(27).question).toMatch(/60° S dan 35° T/);
    expect(correct(29)).toBe("25° S, 60° B.");
    expect(byId(29).question).toMatch(/selatan Khatulistiwa dan di barat GMP/);
    expect(byId(12).question).toMatch(/105° T, 5° U/);
    expect(correct(12)).toBe("Longitud ditulis sebelum latitud.");
    expect(correct(23)).toBe("11° U.");
    expect(correct(25)).toMatch(/Membahagikan ruang antara dua garisan/);
    expect(correct(26)).toBe("Kawasan di selatan Garisan Khatulistiwa.");
    expect(correct(30)).toMatch(/persilangan garisan yang tetap/);
    expect(correct(16)).toMatch(/Latitud ialah garisan melintang; longitud ialah garisan menegak/);
  });

  it("does not let GPS or GIS consume scored questions", () => {
    expect(
      chapter2.filter((q) => /GPS|GIS|satelit/i.test(text(num(q)))).length,
    ).toBeLessThanOrEqual(1);
  });
});

describe("Geografi Form 1 Bab 2 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter2)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter2.filter(
      (q) =>
        Math.max(...q.options.map(len)) > 24 &&
        len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter2.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter2.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter2) {
      const lengths = q.options.map(len);
      if (Math.min(...lengths) < 14) continue; // short labels cannot be balanced by length
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.8);
    }
  });

  it("keeps same-type options: coordinates, hemispheres, positions, lines", () => {
    for (const n of [12, 24, 29]) {
      expect(byId(n).options.length).toBe(4);
    }
    expect(byId(29).options.every((o) => /^\d+° [US], \d+° [TB]\.$/.test(o))).toBe(true);
    expect(byId(24).options.every((o) => /°/.test(o))).toBe(true);
    expect(
      byId(27).options.every((o) =>
        /^Hemisfera (Utara|Selatan) dan sebelah (timur|barat) GMP\.$/.test(o),
      ),
    ).toBe(true);
    expect(byId(10).options.every((o) => /^Garisan /.test(o))).toBe(true);
    expect(byId(28).options.every((o) => /masjid\.$/.test(o))).toBe(true);
    expect(byId(23).options.every((o) => /^\d+° [US]\.$/.test(o))).toBe(true);
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter2.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Geografi Form 1 Bab 2 difficulty and catalog", () => {
  it("keeps 15 Easy / 12 Medium / 3 Hard", () => {
    for (const q of chapter2) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(TIERS[num(q) - 1]);
    }
    const count = (t: string) =>
      chapter2.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      15, 12, 3,
    ]);
  });

  it("matches the server catalog row (max XP 1105) and the seeded SQL", () => {
    const key = buildCanonicalQuizKey({
      kind: "standard",
      subjectId: "geography",
      form: "Form 1",
      chapterKey: "Chapter 2",
      lang: "bm",
      set: "default",
      difficulty: "All",
    });
    expect(buildQuizCatalog().quizzes.find((q) => q.quizKey === key)).toMatchObject({
      totalQuestions: 30,
      easyCount: 15,
      mediumCount: 12,
      hardCount: 3,
      maxXp: 1105,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key}', 'standard', 'standard', 'geography', 1, 'Chapter 2', 'bm', 30, 15, 12, 3, true, 1105`,
    );
  });
});

describe("Geografi Form 1 Bab 2 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter2, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter2, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter2, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c2", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c2", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c1", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter2) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
