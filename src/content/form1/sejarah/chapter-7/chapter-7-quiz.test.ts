import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import { quizzes as legacyQuizzes } from "@/data/quizzes";
import { buildQuizCatalog } from "@/features/quiz/catalog/buildQuizCatalog";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";
import { sej7Quizzes } from "./sej7-revision";

// Sejarah Form 1 Bab 7 — Peningkatan Tamadun India dan China. The quiz records are the shared
// `sej7Quizzes`, consumed by both legacy data files; explanations derive from sej7-content.ts.
const chapter7 = quizzes.filter(
  (q) => q.subjectId === "sejarah" && q.form === "Form 1" && q.chapter === "Chapter 7",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter7.find((q) => q.id === `sej-f1-c7-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter7.map((q) => text(num(q))).join("\n");

const INDIA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 24, 29];
const CHINA = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 30];
const TIERS = [
  "easy",
  "medium",
  "hard",
  "easy",
  "medium",
  "easy",
  "medium",
  "medium",
  "hard",
  "easy",
  "easy",
  "medium",
  "medium",
  "easy",
  "medium",
  "medium",
  "easy",
  "medium",
  "medium",
  "medium",
  "hard",
  "medium",
  "hard",
  "hard",
  "medium",
  "easy",
  "hard",
  "medium",
  "medium",
  "hard",
];

describe("Sejarah Form 1 Bab 7 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, owned by the shared records", () => {
    expect(chapter7).toHaveLength(30);
    expect(chapter7.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c7-q${i + 1}`).sort(),
    );
    expect(chapter7).toEqual(sej7Quizzes);
    expect(legacyQuizzes.filter((q) => q.id.startsWith("sej-f1-c7-"))).toEqual(sej7Quizzes);
    expect(getChapterQuizQuestions("sejarah", "Form 1", "Chapter 7")).toEqual(sej7Quizzes);
  });

  it("has four distinct options, a valid answer and a source-derived explanation", () => {
    for (const q of chapter7) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      for (const option of q.options) expect(option.trim().length, q.id).toBeGreaterThan(2);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(20);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["sejarah", "Form 1", "Chapter 7"]);
    }
    expect(new Set(chapter7.map((q) => q.question)).size).toBe(30);
    expect(allText).not.toMatch(/gambar|\bpeta\b|jadual|rajah|foto|di atas/i);
  });

  it("has no semantic near-duplicates: stems, correct answers and option sets differ", () => {
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
        expect(shared / Math.min(a.size, b.size), `q${i}/q${j} stems`).toBeLessThan(0.8);
        expect(correct(i), `q${i}/q${j} same answer`).not.toBe(correct(j));
        expect([...byId(i).options].sort().join("|"), `q${i}/q${j} identical option sets`).not.toBe(
          [...byId(j).options].sort().join("|"),
        );
      }
    }
  });

  it("keeps the repaired Maurya statistic, Asoka and examination clusters distinct", () => {
    // Q3/Q5: the 600,000-infantry statistic is tested once; Q3 now tests a factor.
    expect(chapter7.filter((q) => /600,000/.test(text(num(q)))).map(num)).toEqual([5]);
    expect(byId(3).question).toMatch(/perbendaharaan/);
    expect(correct(3)).toBe("Kewangan");
    // Q7 cause, Q8 outcome figures, Q23 situation: three different reasoning tasks.
    expect(correct(7)).toBe("Perang Kalinga");
    expect(correct(8)).toMatch(/150,000 orang kehilangan harta benda/);
    expect(correct(8)).toMatch(/100,000 orang terbunuh/);
    expect(correct(23)).toBe("Perluasan keagamaan oleh Asoka");
    expect(chapter7.filter((q) => /Agama apakah/.test(q.question))).toEqual([]);
    // Q17 (who may sit) and Q24 (Nanda territory) no longer overlap; no second eligibility item.
    expect(chapter7.filter((q) => /dibenarkan menduduki/.test(q.question)).map(num)).toEqual([17]);
  });
});

describe("Sejarah Form 1 Bab 7 coverage", () => {
  it("balances India and China", () => {
    expect([...INDIA, ...CHINA].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 30 }, (_, i) => i + 1),
    );
    expect(INDIA.length).toBeGreaterThanOrEqual(14);
    expect(INDIA.length).toBeLessThanOrEqual(15);
    expect(CHINA.length).toBeGreaterThanOrEqual(15);
    expect(CHINA.length).toBeLessThanOrEqual(16);
  });

  it("covers the major India areas", () => {
    for (const term of [
      /Janapada/,
      /Magadha/,
      /Ganges/,
      /perluasan kuasa/,
      /Kewangan/,
      /Fizikal dan keagamaan/,
      /Nanda/,
      /Maurya/,
      /Kalinga/,
      /Tiang|tiang batu/,
      /Gupta/,
      /Arthasastra/,
      /Pataliputra/,
    ]) {
      expect(allText).toMatch(term);
    }
  });

  it("covers the major China areas", () => {
    for (const term of [
      /Shi Huangdi/,
      /Dinasti Han/,
      /Konfusius/,
      /Pendidikan Rendah/,
      /matlamat pendidikan/i,
      /Xiucai/,
      /Juren/,
      /Jinshi/,
      /Empat Buku dan Lima Kitab/,
      /Sima Qian/,
      /Dong Zhongshu/,
      /kertas/,
      /Peperiksaan perkhidmatan awam/,
      /Maharaja Wu/,
      /dikurung/,
    ]) {
      expect(allText).toMatch(term);
    }
  });

  it("keeps examination-table trivia to a minority of the quiz", () => {
    const tableDetail = chapter7.filter((q) =>
      /berapa lama|berapa kerap|bilangan calon|kadar kelulusan|butang/i.test(q.question),
    );
    expect(tableDetail.length).toBeLessThanOrEqual(3);
    expect(
      chapter7.filter((q) => /Xiucai|Juren|Jinshi/.test(q.question)).length,
    ).toBeLessThanOrEqual(5);
  });
});

describe("Sejarah Form 1 Bab 7 source discipline", () => {
  it("keeps outside or unsourced enrichment out of the quiz", () => {
    expect(allText).not.toMatch(
      /Chanakya|Bindusara|Mysore|261 SM|Dasar Dharma|hukuman mati|tiga hari tiga malam|disebat|dipenjarakan/i,
    );
    expect(allText).not.toMatch(/Horus|kemanusiaan sejagat|hak asasi/i);
  });

  it("invents no Jinshi candidate count or pass ratio and no confinement duration", () => {
    for (const q of chapter7.filter((item) => /Jinshi/.test(text(num(item))))) {
      expect(text(num(q)), q.id).not.toMatch(/\d{1,3},\d{3}\s*orang|1:\d+|kadar kelulusan/i);
    }
    expect(allText).not.toMatch(/dikurung[^.]*(hari|malam|minggu|bulan)/i);
    expect(allText).not.toMatch(/setiap dua tahun|dua tahun sekali/i);
  });

  it("preserves the textbook examination chronology instead of repairing it", () => {
    expect(correct(16)).toBe("Maharaja Wu, Dinasti Han");
    expect(byId(16).explanation).toMatch(/29 SM/);
    expect(byId(16).explanation).not.toMatch(/Qin|Han Wu Di/);
  });

  it("keeps Kalinga's two figures separate", () => {
    expect(byId(8).explanation).toMatch(
      /150,000 orang kehilangan harta benda dan 100,000 orang terbunuh/,
    );
    expect(allText).not.toMatch(/150,000 orang terbunuh dan 100,000 orang terbunuh/);
    expect(correct(8)).not.toMatch(/150,000 orang terbunuh/);
  });

  it("keeps Magadha at the sourced strategic reason", () => {
    expect(correct(2)).toMatch(/laluan perdagangan Sungai Ganges/);
    expect(byId(2).explanation).toMatch(/540-490 SM/);
  });
});

describe("Sejarah Form 1 Bab 7 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter7)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter7.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter7.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
    // The previously risky answer sets are balanced.
    for (const n of [14, 15, 20, 21, 25, 27]) {
      const q = byId(n);
      expect(len(q.options[q.answerIndex]) / Math.max(...others(q)), `q${n}`).toBeLessThan(1.25);
    }
  });

  it("does not reward picking the shortest option or the most detailed option either", () => {
    const strictlyShortest = chapter7.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter7) {
      const lengths = q.options.map(len);
      if (Math.max(...lengths) <= 24) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.9);
    }
  });

  it("keeps parallel same-domain options for the education-stage, eligibility and goal items", () => {
    expect(
      byId(14).options.every((o) => /^(Menulis|Mempelajari|Menghafal|Menterjemah)/.test(o)),
    ).toBe(true);
    expect(byId(17).options.every((o) => /^Lelaki/.test(o))).toBe(true);
    expect(byId(21).options.every((o) => !/sahaja/.test(o))).toBe(true);
    expect(byId(25).options.every((o) => /^(Meningkatkan|Memupuk|Melatih|Meluaskan)/.test(o))).toBe(
      true,
    );
    expect(byId(29).options.every((o) => /^Usaha raja/.test(o))).toBe(true);
    expect(byId(11).options.every((o) => / dan /.test(o))).toBe(true);
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter7.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Sejarah Form 1 Bab 7 difficulty, catalog and XP", () => {
  it("assigns 8 Easy / 15 Medium / 7 Hard, per question", () => {
    for (const q of chapter7) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(TIERS[num(q) - 1]);
    }
    const count = (t: string) =>
      chapter7.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      8, 15, 7,
    ]);
  });

  it("matches the server catalog row and its XP cap", () => {
    const key = buildCanonicalQuizKey({
      kind: "standard",
      subjectId: "sejarah",
      form: "Form 1",
      chapterKey: "Chapter 7",
      lang: "bm",
      set: "default",
      difficulty: "All",
    });
    const row = buildQuizCatalog().quizzes.find((q) => q.quizKey === key);
    expect(row).toMatchObject({
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
      `'${key}', 'standard', 'standard', 'sejarah', 1, 'Chapter 7', 'bm', 30, 8, 15, 7, true, 1215`,
    );
  });
});

describe("Sejarah Form 1 Bab 7 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "sejarah", form: "Form 1" };

  it("puts all 30 into the attempt and mixes tiers instead of grouping them", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter7, scope, seeded(seed));
      expect(issues).toEqual([]);
      expect(questions).toHaveLength(30);
      expect(new Set(questions.map((q) => q.id)).size).toBe(30);
      const ranks = questions.map((q) => rank[normalizeQuizDifficulty(q.difficulty)!]);
      expect(ranks).not.toEqual([...ranks].sort((a, b) => a - b));
      for (const q of questions) {
        expect(normalizeQuizDifficulty(q.difficulty)).toBe(TIERS[num(q) - 1]);
      }
    }
    const a = orderRegularQuizQuestions(chapter7, scope, seeded(1)).questions.map((q) => q.id);
    const b = orderRegularQuizQuestions(chapter7, scope, seeded(2)).questions.map((q) => q.id);
    expect(a).not.toEqual(b);
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter7) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
