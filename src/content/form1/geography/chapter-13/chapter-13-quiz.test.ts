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

// Geografi Tingkatan 1 Bab 13 — Sisa Domestik (DSKP SK 5.2). The live bank is the `quizzes` export
// of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter13 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 13",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter13.find((q) => q.id === `geo-f1-c13-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
// Built from the records directly so a missing ID fails an assertion instead of crashing the file.
const allText = chapter13
  .map((q) => [q.question, ...q.options, q.explanation].join(" "))
  .join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c13-q${i + 1}`);

// 13.1/13.2 jenis dan contoh, 13.3 kesan, 13.4 langkah.
const SECTION: Record<string, number[]> = {
  jenis: [1, 2, 3, 4, 5, 6, 17, 23],
  kesan: [7, 8, 9, 10, 18, 24, 25, 29],
  langkah: [11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 26, 27, 28, 30],
};
const HARD = [23, 26, 29, 30];
const MEDIUM = [4, 5, 7, 8, 9, 13, 14, 15, 16, 19, 20, 21, 27];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");

describe("Geografi Form 1 Bab 13 quiz bank integrity", () => {
  it("uses geo-f1-c13-q1..q30 exactly once, keeps the real q18, and is served by the registry", () => {
    expect(chapter13.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c13-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(quizzes.filter((q) => q.id === "geo-f1-c13-q18").map((q) => q.chapter)).toEqual([
      "Chapter 13",
    ]);
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 13").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter13) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 13"]);
    }
    expect(new Set(chapter13.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen picture or diagram", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|dilabel|berlabel/i,
    );
  });

  it("uses natural textbook BM with no specialist English terms", () => {
    expect(allText).not.toMatch(/ and |\b(the|which|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /greywater|blackwater|leachate|air lindi|e-waste|logam berat|biodiesel|teknologi mesra alam|kesihatan emosi|\.\.\.\?/i,
    );
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
});

describe("Geografi Form 1 Bab 13 textbook coverage", () => {
  it("assigns every question to one of the textbook sections", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.jenis.length).toBeGreaterThanOrEqual(8);
    expect(SECTION.kesan.length).toBeGreaterThanOrEqual(8);
    expect(SECTION.langkah.length).toBeGreaterThanOrEqual(12);
  });

  it("defines sisa domestik as waste from residential areas only", () => {
    expect(correct(1)).toBe("Sisa yang terhasil dari kawasan perumahan");
    expect(correct(1)).not.toMatch(/institusi|kilang|kedai|industri/i);
  });

  it("uses both classification systems: organik/bukan organik and pepejal/cecair", () => {
    expect(correct(2)).toBe("Bahan organik dan bahan bukan organik");
    expect(byId(2).options).toContain("Sisa pepejal dan sisa cecair");
    expect(byId(2).explanation).toMatch(/sisa pepejal dan sisa cecair/);
    expect(correct(3)).toBe("Sisa makanan");
    expect(byId(3).explanation).toMatch(/kertas ialah bahan organik/);
    expect(correct(4)).toBe("Mudah diuraikan; berasal daripada haiwan atau tumbuhan");
    expect(correct(5)).toBe("Sukar diuraikan secara semula jadi");
    expect(correct(6)).toBe("Kumbahan dan minyak masak");
    expect(correct(17)).toBe("Tin susu aluminium");
    expect(correct(23)).toBe(
      "Sisa makanan – organik; botol plastik – bukan organik; minyak masak – cecair",
    );
  });

  it("13.3: all four textbook effects, with water, air and odour pollution", () => {
    expect(correct(24)).toBe("Pencemaran air sungai");
    expect(correct(7)).toBe("Pencemaran udara oleh asap");
    expect(correct(18)).toBe("Pencemaran bau");
    expect(correct(8)).toBe("Menjadi tempat pembiakan tikus, lipas dan lalat");
    expect(correct(25)).toBe("Taun, demam denggi dan malaria");
    expect(correct(9)).toBe("Sampah menyumbat dan menyekat aliran air");
    expect(correct(10)).toBe("Peningkatan kos penyelenggaraan");
    expect(correct(29)).toBe(
      "Sampah dalam longkang → banjir kilat; timbunan sampah terbuka → wabak penyakit",
    );
  });

  it("13.4: all five textbook measures, with unambiguous 3R examples", () => {
    // 3R
    expect(correct(11)).toBe("Mengurangkan penggunaan bahan yang menghasilkan sampah");
    expect(correct(12)).toBe("Reuse");
    expect(correct(13)).toBe("Memproses barangan terbuang menjadi barangan baharu");
    expect(correct(28)).toBe("Reduce");
    expect(byId(28).question).toMatch(/Menolak beg plastik/);
    expect(correct(21)).toBe("Recycle");
    expect(byId(21).question).toMatch(/baja kompos/);
    // The ambiguous cloth-bag example (Reduce or Reuse?) is never scored.
    expect(allText).not.toMatch(/beg kain|bakul sendiri/i);
    // Teknologi terkini
    expect(correct(16)).toBe("Membakar sisa untuk menjana tenaga elektrik");
    expect(byId(16).explanation).toMatch(/Menurut buku teks.*85%/);
    expect(correct(19)).toBe("Polistirena yang sukar diurai");
    // Penguatkuasaan undang-undang
    expect(correct(14)).toBe("Penguatkuasaan undang-undang");
    expect(byId(14).explanation).toMatch(/Akta 672/);
    expect(byId(14).explanation).toMatch(/Akta 673/);
    expect(correct(15)).toBe("Pihak Berkuasa Tempatan (PBT)");
    // Kempen kesedaran
    expect(correct(22)).toBe("Kempen kesedaran masyarakat");
    expect(correct(27)).toBe("Kempen 3R");
    // Pendidikan
    expect(correct(20)).toBe("Pendidikan alam sekitar dan aktiviti kitar semula");
    expect(correct(26)).toBe(
      "Tapak pelupusan penuh – WtE; buang sampah haram – penguatkuasaan; murid kurang sedar – pendidikan",
    );
    expect(correct(30)).toBe(
      "Amalkan 3R, jalankan kempen kesedaran dan kuatkuasakan denda pembuangan haram",
    );
  });

  it("drops off-syllabus measures, chemistry and generic morals", () => {
    // Compost is Recycle, never "technology".
    expect(byId(21).options).not.toContain("Penggunaan teknologi terkini");
    expect(allText).not.toMatch(/pengasingan sisa di punca/i);
    expect(allText).not.toMatch(/metana|hidrogen sulfida|karbon monoksida|plumbum|merkuri/i);
    expect(allText).not.toMatch(/nyamuk Aedes|vektor (bagi|untuk) demam denggi/i);
    expect(allText).not.toMatch(/cepat penuh|jangka hayat tapak/i);
    expect(allText).not.toMatch(/perubahan sikap|komponen paling utama/i);
    // The January 2016 tonnage is not scored; if added later it must carry its date.
    for (const q of chapter13) {
      if (/33,000|tan metrik/.test([q.question, ...q.options].join(" "))) {
        expect(q.question, q.id).toMatch(/Januari 2016/);
      }
    }
  });
});

describe("Geografi Form 1 Bab 13 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter13)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter13.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter13.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter13.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter13) {
      const lengths = q.options.map(len);
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no absurd distractors", () => {
    expect(allText).not.toMatch(
      /cip komputer|ketulan logam|peti sejuk|berbau .*wangi|lebih segar|kos .* sifar|mencairkan ais|air mineral|Rethink|Replace/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter13.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 13 difficulty and catalog", () => {
  it("keeps 13 Easy / 13 Medium / 4 Hard, with Act recall and the flood chain not Hard", () => {
    for (const q of chapter13) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter13.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      13, 13, 4,
    ]);
    expect(normalizeQuizDifficulty(byId(9).difficulty)).not.toBe("hard");
    expect(normalizeQuizDifficulty(byId(14).difficulty)).not.toBe("hard");
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 13",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 13,
      mediumCount: 13,
      hardCount: 4,
      maxXp: 1135,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 13', 'bm', 30, 13, 13, 4, true, 1135`,
    );
  });
});

describe("Geografi Form 1 Bab 13 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter13, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter13, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter13, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c13", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c13", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c12", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter13) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});

// Final check across the whole Geografi Tingkatan 1 quiz bank (Bab 1–13).
describe("Geografi Form 1 full-bank integrity", () => {
  const geoF1 = quizzes.filter((q) => q.subjectId === "geography" && q.form === "Form 1");
  const chapters = Array.from({ length: 13 }, (_, i) => i + 1);

  it("has 30 live questions in every chapter, 390 in total, with globally unique IDs", () => {
    expect(geoF1).toHaveLength(390);
    expect(new Set(geoF1.map((q) => q.id)).size).toBe(390);
    for (const c of chapters) {
      const ids = geoF1.filter((q) => q.chapter === `Chapter ${c}`).map((q) => q.id);
      expect(ids, `Chapter ${c}`).toEqual(
        Array.from({ length: 30 }, (_, i) => `geo-f1-c${c}-q${i + 1}`),
      );
      expect(
        getChapterQuizQuestions("geography", "Form 1", `Chapter ${c}`).map((q) => q.id),
        `registry Chapter ${c}`,
      ).toEqual(ids);
    }
  });

  it("keeps every chapter's catalog row in step with its live tier counts", () => {
    const catalog = buildQuizCatalog().quizzes;
    for (const c of chapters) {
      const rows = geoF1.filter((q) => q.chapter === `Chapter ${c}`);
      const count = (t: string) =>
        rows.filter((q) => normalizeQuizDifficulty(q.difficulty) === t).length;
      const key = buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: `Chapter ${c}`,
        lang: "bm",
        set: "default",
        difficulty: "All",
      });
      expect(
        catalog.find((q) => q.quizKey === key),
        `Chapter ${c}`,
      ).toMatchObject({
        totalQuestions: 30,
        easyCount: count("easy"),
        mediumCount: count("medium"),
        hardCount: count("hard"),
      });
    }
  });

  it("shuffles and snapshots every chapter safely", () => {
    const rng = () => 0.37;
    for (const c of chapters) {
      const rows = geoF1.filter((q) => q.chapter === `Chapter ${c}`);
      const { questions, issues } = orderRegularQuizQuestions(
        rows,
        { subjectId: "geography", form: "Form 1" },
        rng,
      );
      expect(issues, `Chapter ${c}`).toEqual([]);
      expect(questions, `Chapter ${c}`).toHaveLength(30);
      const snapshot = createAttemptSnapshot(`geography-f1-c${c}`, "attempt-1", questions);
      expect(snapshot, `Chapter ${c}`).not.toBeNull();
      expect(restoreAttemptOrder(snapshot!, `geography-f1-c${c}`, questions)).toEqual(questions);
    }
  });
});
