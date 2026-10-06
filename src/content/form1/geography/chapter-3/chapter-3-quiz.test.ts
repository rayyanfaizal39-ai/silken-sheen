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

// Geografi Tingkatan 1 Bab 3 — Peta Lakar. The live bank is the `quizzes` export of
// src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy that is not served.
const chapter3 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 3",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter3.find((q) => q.id === `geo-f1-c3-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter3.map((q) => text(num(q))).join("\n");

// Textbook section of every question: 3.1 ciri, 3.2 simbol, 3.3 pandang darat, 3.4 melukis.
const SECTION: Record<string, number[]> = {
  ciri: [1, 2, 3, 4, 21, 23],
  simbol: [5, 6, 7, 8, 9, 10, 19, 22, 28],
  pandangDarat: [11, 12, 13, 14, 15, 16, 17, 18],
  melukis: [20, 24, 25, 26, 27, 29, 30],
};
const HARD = [29];
const MEDIUM = [3, 8, 9, 10, 15, 18, 20, 22, 24, 25, 30];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const SYMBOL_TYPES = ["Simbol titik", "Simbol garisan", "Simbol kawasan", "Singkatan perkataan"];

describe("Geografi Form 1 Bab 3 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter3).toHaveLength(30);
    expect(chapter3.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `geo-f1-c3-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 3").map((q) => q.id)).toEqual(
      chapter3.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter3) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 3"]);
    }
    expect(new Set(chapter3.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no picture, map or symbol-drawing dependency", () => {
    expect(allText).not.toMatch(
      /(gambar|foto) (di atas|berikut|ini)|rajah|peta (di atas|berikut)|berdasarkan (peta|rajah|gambar)|simbol (ini|berikut|di atas)|batang padi|segi ?tiga|berpalang/i,
    );
    for (const q of chapter3) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural BM without leftover English or placeholder text", () => {
    expect(allText).not.toMatch(/\b(the|which|symbol|map|legend|scale|TODO|lorem)\b/i);
    expect(allText).not.toMatch(/\.\.\.\?|\?\?/);
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
    const isSymbolTypeSet = (o: string[]) =>
      [...o].sort().join() === [...SYMBOL_TYPES].sort().join();
    for (let i = 1; i <= 30; i += 1) {
      for (let j = i + 1; j <= 30; j += 1) {
        const a = words(byId(i).question);
        const b = words(byId(j).question);
        const shared = [...a].filter((w) => b.has(w)).length;
        expect(shared / Math.min(a.size, b.size), `q${i}/q${j} stems`).toBeLessThan(0.85);
        // q5-q7 legitimately share the four official symbol types as options.
        if (!isSymbolTypeSet(byId(i).options)) {
          expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
            [...byId(j).options].sort().join("|"),
          );
        }
      }
    }
  });
});

describe("Geografi Form 1 Bab 3 textbook coverage", () => {
  it("assigns every question to one of the four textbook sections", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    for (const ids of Object.values(SECTION)) expect(ids.length).toBeGreaterThanOrEqual(6);
  });

  it("3.1: defines peta lakar and tests the five features by function", () => {
    expect(correct(1)).toMatch(/permukaan bumi.*pandangan atas/);
    expect(correct(2)).toBe("Tajuk, pemidang, arah mata angin, simbol dan petunjuk");
    expect(byId(2).explanation).not.toMatch(/wajib/i);
    for (const feature of ["Tajuk", "pemidang", "arah mata angin", "simbol", "petunjuk"]) {
      expect(correct(2)).toContain(feature);
    }
    // Scale is never a required peta-lakar component.
    for (const q of chapter3) expect(q.options[q.answerIndex], q.id).not.toMatch(/skala/i);
    // No formatting trivia about where the title goes or that it is underlined.
    expect(allText).not.toMatch(/digariskan|di bahagian atas peta/i);
    expect(correct(3)).toBe("Tajuk");
    expect(correct(4)).toMatch(/Menggantikan ciri sebenar/);
    expect(correct(21)).toMatch(/maksud simbol/);
    expect(correct(23)).toMatch(/arah Utara/);
  });

  it("3.2: official symbol types are titik, garisan, kawasan and singkatan perkataan", () => {
    expect(correct(19)).toBe(
      "Simbol titik, simbol garisan, simbol kawasan dan singkatan perkataan",
    );
    // "Simbol bergambar" is not an official category and must not appear at all.
    expect(allText).not.toMatch(/bergambar/i);
    expect(chapter3.filter((q) => q.options.join() === SYMBOL_TYPES.join()).map(num)).toEqual([
      5, 6, 7,
    ]);
    expect([correct(5), correct(6), correct(7)]).toEqual(SYMBOL_TYPES.slice(0, 3));
    expect(correct(9)).toBe("Kelapa sawit");
    expect(correct(10)).toMatch(/memanjang/);
    expect(correct(22)).toBe("Sawah padi – simbol kawasan");
    expect(correct(30)).toBe("Garisan, titik, kawasan");
  });

  it("3.2: caps abbreviation-meaning questions so they do not dominate", () => {
    const abbreviationMeaning = chapter3.filter(
      (q) => /singkatan/i.test(q.question) && /maksud|merujuk|mewakili/i.test(q.question),
    );
    expect(abbreviationMeaning.map(num)).toEqual([8]);
    expect(correct(8)).toBe("Tg. – Tanjung");
    expect(chapter3.filter((q) => /singkatan/i.test(q.question)).length).toBeLessThanOrEqual(3);
    expect(correct(28)).toMatch(/Menjimatkan ruang/);
  });

  it("3.3: physical is natural, cultural is human-made, sawah padi is cultural", () => {
    expect(correct(11)).toMatch(/semula jadi/);
    expect(correct(13)).toMatch(/buatan manusia/);
    expect(correct(12)).toBe("Paya bakau");
    expect(correct(14)).toBe("Petempatan");
    expect(correct(16)).toBe("Pengangkutan");
    expect(correct(17)).toBe("Saliran");
    expect(correct(18)).toBe("Gunung, tasik dan paya bakau");
    expect(byId(15).question).toMatch(/sawah padi/i);
    expect(correct(15)).toMatch(/diusahakan oleh manusia/);
    expect(byId(12).options.filter((o) => o !== "Paya bakau")).toContain("Sawah padi");
  });

  it("3.3: does not drift into land-use relationships or ecosystem functions", () => {
    expect(allText).not.toMatch(/tadahan/i);
    expect(allText).not.toMatch(/\bteh\b|pelancongan/i);
    expect(allText).not.toMatch(/perikanan|jeti|pinggir laut/i);
    expect(allText).not.toMatch(/merancang pembangunan|potensi alam|ekosistem|tanah pamah/i);
    expect(chapter3.some((q) => /jambatan.*merentasi/i.test(q.question))).toBe(false);
  });

  it("3.4: the first overall drawing step is buat tinjauan", () => {
    expect(byId(27).question).toMatch(/langkah pertama/i);
    expect(correct(27)).toMatch(/^Buat tinjauan/);
    expect(byId(27).options).toContain("Tulis tajuk dan buat pemidang");
    // Tajuk and pemidang may only be the answer when the stem says tinjauan is already done.
    for (const q of chapter3) {
      if (/tajuk dan (buat|melukis) pemidang/i.test(q.options[q.answerIndex])) {
        expect(q.question, q.id).toMatch(/Selepas tinjauan/);
      }
    }
    expect(correct(24)).toBe("Tulis tajuk dan buat pemidang");
    expect(correct(25)).toBe("Tinjauan → tajuk dan pemidang → lukis ciri → petunjuk");
    expect(correct(26)).toMatch(/mengenal pasti ciri/);
    expect(correct(20)).toMatch(/simbol yang digunakan/);
  });
});

describe("Geografi Form 1 Bab 3 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter3)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter3.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter3.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter3.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter3) {
      const lengths = q.options.map(len);
      // Very short labels (a feature, a group name) cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no throwaway distractors", () => {
    expect(allText).not.toMatch(
      /harga peta|cantik|mengelirukan|zaman purba|tidak sesuai untuk sebarang|berwarna hijau|merahsiakan/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter3.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Geografi Form 1 Bab 3 difficulty and catalog", () => {
  it("keeps 18 Easy / 11 Medium / 1 Hard", () => {
    for (const q of chapter3) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter3.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      18, 11, 1,
    ]);
  });

  it("uses the sole Hard question to diagnose a flawed peta lakar, not symbol trivia", () => {
    const hard = byId(29);
    expect(hard.question).toMatch(/petunjuk/);
    expect(hard.question).toMatch(/simbol titik/);
    expect(correct(29)).toBe(
      "Lukis ladang getah dengan simbol kawasan dan masukkannya dalam petunjuk",
    );
    expect(allText).not.toMatch(/stesen trigonometri\)? mewakili|segi ?tiga dengan titik/i);
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 3",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 18,
      mediumCount: 11,
      hardCount: 1,
      maxXp: 1055,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 3', 'bm', 30, 18, 11, 1, true, 1055`,
    );
  });
});

describe("Geografi Form 1 Bab 3 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter3, scope, seeded(seed));
      expect(issues).toEqual([]);
      expect(questions).toHaveLength(30);
      expect(new Set(questions.map((q) => q.id)).size).toBe(30);
      const ranks = questions.map((q) => rank[normalizeQuizDifficulty(q.difficulty)!]);
      expect(ranks).not.toEqual([...ranks].sort((a, b) => a - b));
      for (const q of questions) {
        expect(normalizeQuizDifficulty(q.difficulty)).toBe(tierOf(num(q)));
      }
    }
  });

  it("gives a new order for a new attempt and restores a saved attempt unchanged", () => {
    const a = orderRegularQuizQuestions(chapter3, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter3, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c3", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c3", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c4", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter3) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
