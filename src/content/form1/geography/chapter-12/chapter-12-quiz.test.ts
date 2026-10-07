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

// Geografi Tingkatan 1 Bab 12 — Sumber Air (DSKP SK 5.1). The live bank is the `quizzes` export
// of src/data/content.ts (the registry reads it). src/data/quizzes.ts is a stale copy in which the
// q18 record is mislabelled geo-f1-c13-q18; the live bank must never repeat that.
const chapter12 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 12",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter12.find((q) => q.id === `geo-f1-c12-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
// Built from the records directly so a missing ID fails an assertion instead of crashing the file.
const allText = chapter12
  .map((q) => [q.question, ...q.options, q.explanation].join(" "))
  .join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c12-q${i + 1}`);

// 12.1 sumber, 12.2 punca, 12.3 kesan, 12.4 langkah, then integrated cause-effect-measure items.
const SECTION: Record<string, number[]> = {
  sumber: [1, 2, 3, 4, 18, 21, 22],
  punca: [5, 6, 7, 8, 9, 19],
  kesan: [10, 11, 12, 24],
  langkah: [13, 14, 15, 16, 17, 20, 25, 27],
  bersepadu: [23, 26, 28, 29, 30],
};
const HARD = [23, 26, 28, 29, 30];
const MEDIUM = [3, 5, 6, 9, 11, 13, 14, 16, 17, 18, 19, 24, 25];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");

describe("Geografi Form 1 Bab 12 question IDs", () => {
  it("uses geo-f1-c12-q1..q30 exactly once, including q18, with no foreign prefix", () => {
    const ids = chapter12.map((q) => q.id);
    expect(ids).toEqual(EXPECTED_IDS);
    expect(ids).toContain("geo-f1-c12-q18");
    expect(ids.filter((id) => !id.startsWith("geo-f1-c12-"))).toEqual([]);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c12-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("leaves Chapter 13's own q18 as the only geo-f1-c13-q18", () => {
    const c13q18 = quizzes.filter((q) => q.id === "geo-f1-c13-q18");
    expect(c13q18).toHaveLength(1);
    expect(c13q18[0].chapter).toBe("Chapter 13");
  });

  it("keeps every Geografi Form 1 quiz ID unique across chapters", () => {
    const ids = quizzes
      .filter((q) => q.subjectId === "geography" && q.form === "Form 1")
      .map((q) => q.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

describe("Geografi Form 1 Bab 12 quiz bank integrity", () => {
  it("is served by the registry in full", () => {
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 12").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter12) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 12"]);
    }
    expect(new Set(chapter12.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, diagram or picture", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|dilabel|berlabel/i,
    );
    for (const q of chapter12) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM with no stray English", () => {
    expect(allText).not.toMatch(/ and |\b(the|which|Non-Revenue|sustainability|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|memicu|\bhub\b|rizab kapasiti|hidrik|reforestasi|mekanisasi|gred domestik|implikasi negatif|keghairahan|luapan pengisian/i,
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

describe("Geografi Form 1 Bab 12 textbook coverage", () => {
  it("assigns every question to one of the four sections or the integrated set", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.sumber.length).toBeGreaterThanOrEqual(6);
  });

  it("12.1: two source types, aquifers, 97% and 3% as textbook facts", () => {
    expect(correct(1)).toBe("Air permukaan");
    expect(byId(1).question).toMatch(/^Menurut buku teks/);
    expect(correct(21)).toBe("Air yang didapati di permukaan daratan");
    expect(correct(2)).toBe("Sungai dan tasik");
    expect(correct(3)).toBe("Akuifer");
    expect(correct(4)).toBe("Sekitar 3%");
    expect(byId(4).question).toMatch(/^Menurut buku teks/);
    expect(correct(18)).toBe("Infiltrasi");
    expect(byId(18).explanation).toMatch(/Intersepsi/);
    expect(correct(22)).toBe("Harian, perindustrian dan pengairan");
    // Rain is part of the process, not a third official source category.
    expect(allText).not.toMatch(/air hujan tadahan peribadi/i);
    expect(allText).not.toMatch(/pada masa kini/i);
  });

  it("12.2: all six textbook causes of the water crisis", () => {
    expect(correct(5)).toBe("Hakisan berlaku dan kelodak mendap di empangan");
    expect(correct(8)).toBe("El Nino");
    expect(byId(8).question).toMatch(/2016/);
    expect(correct(6)).toBe("Loji rawatan air ditutup dan bekalan air terganggu");
    expect(correct(9)).toBe("Permintaan tinggi sektor perindustrian");
    expect(correct(19)).toBe("Sungai tercemar dengan serius");
    expect(byId(19).question).toMatch(/baja kimia dan racun serangga/);
    expect(correct(7)).toBe("Permintaan terhadap air bertambah");
    expect(byId(7).question).toMatch(/populasi penduduk/);
  });

  it("12.3: all four textbook effects", () => {
    expect(correct(10)).toBe("Catuan bekalan air secara berjadual");
    expect(correct(24)).toBe("Tanah menjadi kering dan teksturnya berubah");
    expect(correct(11)).toBe("Hidupan akuatik mati dan ekosistem tidak seimbang");
    expect(correct(12)).toBe("Taun, demam kepialu dan leptospirosis");
  });

  it("12.4: all six textbook measures, with textbook examples", () => {
    expect(correct(13)).toBe("Hutan itu berperanan sebagai kawasan tadahan hujan");
    expect(byId(13).explanation).toMatch(/Padang Terap.*Empangan Pedu/);
    expect(correct(14)).toBe("Akta Kualiti Alam Sekeliling 1974");
    expect(byId(14).explanation).toMatch(/Akta Industri Perkhidmatan Air 2006/);
    expect(correct(16)).toBe("Merawat sisa kumbahan sebelum dilepaskan ke sungai");
    expect(byId(16).question).toMatch(/Indah Water Konsortium/);
    expect(correct(27)).toBe("Telaga tiub");
    expect(correct(15)).toBe("Kempen Cintai Sungai Kita");
    expect(correct(17)).toBe("Penyelidikan dan pembangunan");
    expect(byId(17).question).toMatch(/Penuaian air hujan dan penyahgaraman air laut/);
    expect(correct(25)).toBe("Air terawat yang hilang akibat paip bocor atau pecah");
    expect(correct(20)).toBe("Mengurangkan pembaziran air bersih");
  });

  it("integrates cause, effect, source and measure in the Hard tier", () => {
    expect(correct(23)).toBe("Penebangan hutan tadahan – pemeliharaan kawasan tadahan hujan");
    expect(correct(29)).toBe(
      "Air mentah tercemar → loji rawatan air ditutup → kekurangan bekalan air bersih",
    );
    expect(correct(30)).toBe("Pencemaran baja dan racun – kempen kesedaran dan penguatkuasaan");
    expect(correct(28)).toBe(
      "Air bawah tanah melalui telaga tiub, kerana air itu tersimpan dalam akuifer",
    );
    expect(correct(26)).toBe(
      "Kilang didenda – penguatkuasaan; telaga tiub – air bawah tanah; Cintai Sungai Kita – kempen kesedaran",
    );
  });

  it("drops advanced science, unsupported claims and Chapter 13 content", () => {
    expect(allText).not.toMatch(/eutrofikasi|alga|\bBOD\b|oksigen terlarut|toksik organ/i);
    expect(allText).not.toMatch(/Lembah Klang|peratusan .*terbesar|sektor .*terbesar/i);
    expect(allText).not.toMatch(/SPAHL|Jabatan Alam Sekitar|\bJAS\b/);
    expect(allText).not.toMatch(/konkrit|berturap|pengisian semula/i);
    expect(allText).not.toMatch(/bukan air minuman|tidak selamat diminum|air minuman utama/i);
    expect(allText).not.toMatch(
      /banjir kilat|tersumbat|\b3R\b|kitar semula|tapak pelupusan|vektor|\blalat\b/i,
    );
    expect(allText).not.toMatch(
      /khazanah|generasi masa depan|Tasik Kenyir|Tasik Chini|Tasik Bera/i,
    );
    // Dated textbook statistics stay out unless their year is given.
    expect(allText).not.toMatch(/229|473|35 juta|2020/);
  });
});

describe("Geografi Form 1 Bab 12 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter12)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter12.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter12.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter12.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter12) {
      const lengths = q.options.map(len);
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /salji|air mineral|angin monsun|luar negara|percuma|\bemas\b|nikel|rabun|kristal|Zon Magna/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter12.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 12 difficulty and catalog", () => {
  it("keeps 12 Easy / 13 Medium / 5 Hard", () => {
    for (const q of chapter12) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter12.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      12, 13, 5,
    ]);
  });

  it("does not use direct Act recall as Hard", () => {
    expect(normalizeQuizDifficulty(byId(14).difficulty)).not.toBe("hard");
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 12",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 12,
      mediumCount: 13,
      hardCount: 5,
      maxXp: 1155,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 12', 'bm', 30, 12, 13, 5, true, 1155`,
    );
  });
});

describe("Geografi Form 1 Bab 12 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter12, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter12, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter12, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c12", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c12", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c13", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter12) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
