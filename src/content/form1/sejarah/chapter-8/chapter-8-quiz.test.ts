import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import { buildQuizCatalog } from "@/features/quiz/catalog/buildQuizCatalog";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";

// Sejarah Form 1 Bab 8 — Tamadun Islam dan Sumbangannya. The live bank is the `quizzes` export of
// src/data/content.ts (the registry's sejarahQuizzesFor reads it); quizzes.ts holds a stale copy.
const chapter8 = quizzes.filter(
  (q) => q.subjectId === "sejarah" && q.form === "Form 1" && q.chapter === "Chapter 8",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter8.find((q) => q.id === `sej-f1-c8-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter8.map((q) => text(num(q))).join("\n");

const SECTION: Record<string, number[]> = {
  "8.1": [1, 2, 3, 26],
  "8.2": [4, 5, 6, 13, 20, 21, 24, 27, 30],
  "8.3": [7, 10, 22, 23, 28],
  "8.4": [8, 9, 11, 12, 18, 19, 25, 29],
  "8.5": [14, 15, 16, 17],
};
const TIERS = [
  "easy",
  "medium",
  "medium",
  "easy",
  "medium",
  "hard",
  "hard",
  "hard",
  "easy",
  "hard",
  "easy",
  "medium",
  "medium",
  "easy",
  "medium",
  "medium",
  "hard",
  "easy",
  "easy",
  "medium",
  "hard",
  "medium",
  "medium",
  "medium",
  "medium",
  "medium",
  "hard",
  "medium",
  "medium",
  "easy",
];

describe("Sejarah Form 1 Bab 8 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter8).toHaveLength(30);
    expect(chapter8.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c8-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("sejarah", "Form 1", "Chapter 8").map((q) => q.id)).toEqual(
      chapter8.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter8) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      for (const option of q.options) expect(option.trim().length, q.id).toBeGreaterThan(2);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(20);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["sejarah", "Form 1", "Chapter 8"]);
    }
    expect(new Set(chapter8.map((q) => q.question)).size).toBe(30);
    expect(allText).not.toMatch(/gambar|\bpeta\b|jadual|rajah|foto|di atas/i);
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
        expect(correct(i), `q${i}/q${j} same answer`).not.toBe(correct(j));
        expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
          [...byId(j).options].sort().join("|"),
        );
      }
    }
  });
});

describe("Sejarah Form 1 Bab 8 coverage", () => {
  it("covers all five official sections and every question once", () => {
    const ids = Object.values(SECTION)
      .flat()
      .sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION["8.1"].length).toBeGreaterThanOrEqual(4);
    expect(SECTION["8.2"].length).toBeGreaterThanOrEqual(6);
    expect(SECTION["8.3"].length).toBeGreaterThanOrEqual(4);
    expect(SECTION["8.4"].length).toBeGreaterThanOrEqual(7);
    expect(SECTION["8.5"].length).toBeGreaterThanOrEqual(4);
  });

  it("tests the Khulafa al-Rasyidin, later kingdoms and the factors of spread", () => {
    expect(allText).toMatch(/Abu Bakar/);
    expect(allText).toMatch(/Umar/);
    expect(allText).toMatch(/Uthman/);
    expect(byId(20).question).toMatch(/Abu Bakar/);
    expect(byId(21).question).toMatch(/khalifah/);
    for (const k of [/Umaiyah/, /Abbasiyah/, /Uthmaniyah/])
      expect(byId(27).options.join(" ")).toMatch(k);
    expect(correct(13)).toBe("Umaiyah, Abbasiyah, Uthmaniyah");
    expect(correct(6)).toBe("Diplomasi");
    expect(byId(6).options).toEqual(
      expect.arrayContaining(["Dakwah", "Perdagangan", "Pembukaan wilayah baharu"]),
    );
  });

  it("tests all four leadership aspects of Nabi Muhammad SAW", () => {
    expect([...byId(10).options].sort()).toEqual(
      ["Pembangun Ekonomi", "Pemimpin Masyarakat", "Pemimpin Negara", "Pemimpin Tentera"].sort(),
    );
    expect(correct(10)).toBe("Pemimpin Negara");
    expect(byId(22).question).toMatch(/pembangun ekonomi/);
    expect(byId(23).question).toMatch(/pemimpin tentera/);
    expect(correct(28)).toMatch(/Muhajirin dengan Ansar/);
  });

  it("covers pre-Islamic society, the revelation and the dakwah stages", () => {
    expect(correct(2)).toMatch(/keturunan kabilah/);
    expect(correct(26)).toMatch(/Hadhari: tinggal di kota.*Badwi: hidup nomad/);
    expect(correct(3)).toBe("Pusat dagangan baharu");
    expect(correct(4)).toBe("Gua Hira'");
    expect(correct(5)).toMatch(/pembacaan/);
    expect(correct(24)).toBe("Abu Lahab");
    expect(correct(30)).toBe("Amanah");
  });

  it("covers the contributions: ummah, syura, Baitulmal, women, economy and intellectual centres", () => {
    expect(correct(8)).toBe("Ummah");
    expect(correct(9)).toBe("Syura");
    expect(correct(11)).toMatch(/hasil dan perbelanjaan negara/);
    expect(correct(12)).toMatch(/wanita/);
    expect(correct(29)).toMatch(/menipu/);
    expect(correct(25)).toMatch(/sains dan falsafah/);
  });

  it("keeps scholars and architecture to a minority and textbook-aligned", () => {
    const scholars = chapter8.filter((q) =>
      /Khawarizmi|Ibn Sina|Al-Kindi|Al-Biruni|Al-Battani|Jabir|Ibn Battuta/.test(q.question),
    );
    expect(scholars.length).toBeLessThanOrEqual(3);
    expect(correct(18)).toBe("Algebra");
    expect(correct(19)).toBe("Ibn Sina");
    expect(SECTION["8.5"].length).toBeLessThanOrEqual(6);
    expect(correct(15)).toBe("Mihrab");
    expect(correct(16)).toMatch(/azan didengari jauh/);
    expect(correct(14)).toBe("Seni kaligrafi");
    expect(correct(17)).toBe("Malaysia: iklim; China: budaya");
  });
});

describe("Sejarah Form 1 Bab 8 source discipline", () => {
  it("keeps the unsupported items found by the audit out of the quiz", () => {
    expect(allText).not.toMatch(/al-Basus|Basus/i);
    expect(allText).not.toMatch(/perlembagaan (bertulis )?pertama|first constitution/i);
    expect(allText).not.toMatch(/kontrak sosial|social contract/i);
    expect(allText).not.toMatch(/kasta|berhala|perniagaan berhala|kepentingan ekonomi Quraisy/i);
    expect(allText).not.toMatch(/demokrasi Islam|Islamic democracy|diktator|dictator/i);
    expect(allText).not.toMatch(/Salman/i);
    expect(allText).not.toMatch(/kuasa beli|pengagihan semula|redistribut/i);
    expect(allText).not.toMatch(/ketenteraan.*jizyah|jizyah.*perkhidmatan/i);
    expect(allText).not.toMatch(/larangan (imej|patung|menggambar)|dilarang melukis/i);
    expect(allText).not.toMatch(/ketakterhinggaan|infiniti|sifat Allah/i);
    expect(allText).not.toMatch(/akustik|gema|pembesar suara/i);
    expect(allText).not.toMatch(/Haytham|Haitham/i);
    expect(allText).not.toMatch(/algoritma|algorithm|komputer/i);
    expect(allText).not.toMatch(/Bapa Perubatan|Father of/i);
    expect(allText).not.toMatch(/takwim|Hijri|Hijrah bermula/i);
    expect(allText).not.toMatch(/Renaissance|Zaman Gelap|Dark Ages|Kebangkitan Eropah/i);
    expect(allText).not.toMatch(/gladiator|demokrasi/i);
    expect(allText).not.toMatch(/darkness|kegelapan moral|kegelapan rohani/i);
  });

  it("states Jahiliah, assabiyah and the Piagam in the textbook's own terms", () => {
    expect(byId(1).explanation).toMatch(/tidak mempunyai nabi dan kitab suci/);
    expect(byId(2).explanation).toMatch(/berdasarkan keturunan/);
    expect(byId(7).explanation).toMatch(/negara Islam yang adil dan maju di Madinah/);
    expect(byId(7).explanation).toMatch(/kebebasan mengamalkan agama/);
    expect(byId(11).explanation).toMatch(/perbendaharaan negara/);
  });

  it("does not present the Jahiliah society as having no positive values", () => {
    expect(allText).not.toMatch(/tiada nilai|tidak mempunyai sebarang nilai|sama sekali tiada/i);
  });

  it("avoids absolute claims the source does not make", () => {
    expect(allText).not.toMatch(/\b(paling|sentiasa|terbesar|terhebat)\b/i);
    expect(allText).not.toMatch(/sumbangan terbesar|asas demokrasi/i);
  });
});

describe("Sejarah Form 1 Bab 8 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter8)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter8.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter8.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter8.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter8) {
      const lengths = q.options.map(len);
      if (Math.max(...lengths) <= 24) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.9);
    }
  });

  it("keeps same-domain options (scholars, architecture, roles, kingdoms, caliphs)", () => {
    expect(byId(19).options.every((o) => /^(Al-|Ibn|Jabir)/.test(o))).toBe(true);
    expect(byId(15).options).toEqual(expect.arrayContaining(["Mimbar", "Menara", "Kubah"]));
    expect(byId(21).options.every((o) => /^(Umar|Abu Bakar|Ali)/.test(o))).toBe(true);
    expect(byId(27).options.every((o) => /: .*; .*: /.test(o))).toBe(true);
    expect(byId(2).options.every((o) => /^Penyatuan masyarakat berasaskan/.test(o))).toBe(true);
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter8.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Sejarah Form 1 Bab 8 difficulty, catalog and XP", () => {
  it("keeps 8 Easy / 15 Medium / 7 Hard by cognitive demand", () => {
    for (const q of chapter8) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(TIERS[num(q) - 1]);
    }
    const count = (t: string) =>
      chapter8.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      8, 15, 7,
    ]);
  });

  it("matches the server catalog row and its XP cap", () => {
    const key = buildCanonicalQuizKey({
      kind: "standard",
      subjectId: "sejarah",
      form: "Form 1",
      chapterKey: "Chapter 8",
      lang: "bm",
      set: "default",
      difficulty: "All",
    });
    expect(buildQuizCatalog().quizzes.find((q) => q.quizKey === key)).toMatchObject({
      totalQuestions: 30,
      easyCount: 8,
      mediumCount: 15,
      hardCount: 7,
      maxXp: 1215,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key}', 'standard', 'standard', 'sejarah', 1, 'Chapter 8', 'bm', 30, 8, 15, 7, true, 1215`,
    );
  });
});

describe("Sejarah Form 1 Bab 8 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "sejarah", form: "Form 1" };

  it("puts all 30 into the attempt and mixes tiers instead of grouping them", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter8, scope, seeded(seed));
      expect(issues).toEqual([]);
      expect(questions).toHaveLength(30);
      expect(new Set(questions.map((q) => q.id)).size).toBe(30);
      const ranks = questions.map((q) => rank[normalizeQuizDifficulty(q.difficulty)!]);
      expect(ranks).not.toEqual([...ranks].sort((a, b) => a - b));
      for (const q of questions) {
        expect(normalizeQuizDifficulty(q.difficulty)).toBe(TIERS[num(q) - 1]);
      }
    }
    const a = orderRegularQuizQuestions(chapter8, scope, seeded(1)).questions.map((q) => q.id);
    const b = orderRegularQuizQuestions(chapter8, scope, seeded(2)).questions.map((q) => q.id);
    expect(a).not.toEqual(b);
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter8) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
