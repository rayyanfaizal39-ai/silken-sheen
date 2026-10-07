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

// Geografi Tingkatan 1 Bab 9 — Petempatan di Malaysia (DSKP SK 3.2). The live bank is the `quizzes`
// export of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter9 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 9",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter9.find((q) => q.id === `geo-f1-c9-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter9.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c9-q${i + 1}`);

// DSKP 3.2: 3.2.1 jenis petempatan, 3.2.2 pola petempatan, 3.2.3 fungsi bandar dan luar bandar.
const SECTION: Record<string, number[]> = {
  jenis: [1, 2, 3, 4, 5, 6, 29],
  pola: [7, 9, 10, 11, 12, 13, 14, 15, 24, 28],
  fungsiBandar: [8, 16, 17, 18, 23, 25, 26, 27],
  fungsiLuarBandar: [19, 20, 21, 22, 30],
};
const HARD = [24, 27, 30];
const MEDIUM = [4, 6, 8, 9, 11, 13, 14, 15, 19, 20, 21, 22, 28, 29];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const PATTERNS = ["Berpusat", "Berkelompok", "Berjajar", "Berselerak"];

describe("Geografi Form 1 Bab 9 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter9.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c9-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 9").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter9) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 9"]);
    }
    expect(new Set(chapter9.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: patterns are described in words, never shown in a picture", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar|lakaran) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|ditunjukkan dalam|dilabel|berlabel/i,
    );
    for (const q of chapter9) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM and the textbook pattern names", () => {
    expect(allText).not.toMatch(/\b(the|which|town|city|pattern|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|\bmega\b|\bhab\b|memicu|jaminan makanan|jentera|simbiosis|berstrata|pencakar langit/i,
    );
    // The textbook uses "berpusat" and "berjajar", not "terpusat" or "linear".
    expect(allText).not.toMatch(/terpusat|linear/i);
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
    const isPatternSet = (o: string[]) => [...o].sort().join() === [...PATTERNS].sort().join();
    for (let i = 1; i <= 30; i += 1) {
      for (let j = i + 1; j <= 30; j += 1) {
        const a = words(byId(i).question);
        const b = words(byId(j).question);
        const shared = [...a].filter((w) => b.has(w)).length;
        expect(shared / Math.min(a.size, b.size), `q${i}/q${j} stems`).toBeLessThan(0.85);
        // Pattern-identification questions legitimately offer the four official patterns.
        if (!isPatternSet(byId(i).options)) {
          expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
            [...byId(j).options].sort().join("|"),
          );
        }
      }
    }
  });
});

describe("Geografi Form 1 Bab 9 textbook coverage", () => {
  it("assigns every question to one of the three DSKP standards", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.jenis.length).toBeGreaterThanOrEqual(6);
    expect(SECTION.pola.length).toBeGreaterThanOrEqual(9);
    expect(SECTION.fungsiBandar.length + SECTION.fungsiLuarBandar.length).toBeGreaterThanOrEqual(
      12,
    );
  });

  it("9.1: bandar is 'melebihi 10,000', luar bandar 'kurang daripada 10,000', nothing at exactly 10,000", () => {
    expect(byId(3).question).not.toMatch(/minimum/i);
    expect(correct(3)).toBe("Melebihi 10,000 orang");
    expect(byId(3).explanation).toMatch(/melebihi 10,000 orang/);
    expect(byId(3).explanation).toMatch(/kurang daripada 10,000 orang/);
    expect(correct(5)).toBe("Kurang daripada 10,000 orang");
    expect(allText).not.toMatch(
      /mencecah|10,000 orang atau lebih|tepat 10,000|sekurang-kurangnya 10,000|≥|>=/i,
    );
  });

  it("9.1: urban and rural characteristics follow the textbook", () => {
    expect(correct(1)).toBe("Kawasan kediaman manusia");
    expect(correct(2)).toBe("Petempatan bandar dan luar bandar");
    expect(correct(4)).toBe("Kemudahan asas yang pelbagai dan kediaman moden");
    expect(correct(6)).toBe("Pertanian, penternakan dan industri desa");
    expect(correct(29)).toBe("Bandar: kemudahan pelbagai; luar bandar: kemudahan minimum");
  });

  it("9.2: defines pola petempatan and assesses all four official patterns", () => {
    expect(correct(7)).toBe("Corak susunan kawasan kediaman manusia");
    expect(byId(7).explanation).toMatch(/berpusat, berkelompok, berjajar dan berselerak/);
    // Berpusat: description, Bandar Tun Razak, road junction.
    expect(correct(14)).toBe("Rumah rapat dan padat di kawasan tumpuan penduduk");
    expect(correct(15)).toBe("Bandar Tun Razak, Kuala Lumpur");
    expect(byId(28).question).toMatch(/persimpangan jalan raya/);
    expect(correct(28)).toBe("Berpusat");
    // Berkelompok: description and the FELDA examples.
    expect(correct(12)).toBe("Berkelompok");
    expect(byId(13).question).toMatch(/Felda Trolak.*Felda Air Tawar.*Felda Sahabat/);
    expect(correct(13)).toBe("Berkelompok");
    // Berjajar: description and Kuala Besut / Sungai Rajang.
    expect(correct(10)).toBe("Berjajar");
    expect(correct(11)).toBe("Pesisir Kuala Besut, Terengganu");
    expect(byId(11).explanation).toMatch(/Sungai Rajang/);
    // Berselerak: Bukit Tinggi and Kundasang.
    expect(byId(9).question).toMatch(/Bukit Tinggi.*Kundasang/);
    expect(correct(9)).toBe("Berselerak");
  });

  it("9.3: urban functions across ekonomi, sosial and kerajaan/governan with textbook examples", () => {
    const functions = [
      "pelancongan",
      "pelabuhan",
      "perlombongan",
      "perindustrian",
      "teknologi maklumat",
      "diraja",
      "satelit",
      "pendidikan",
      "pertahanan",
      "sempadan",
      "pentadbiran",
    ];
    for (const f of functions) expect(allText, f).toMatch(new RegExp(`bandar ${f}`, "i"));
    expect(correct(8)).toBe("Pasir Gudang – Bandar Pelabuhan");
    expect(correct(16)).toBe("Bandar Pentadbiran");
    expect(correct(17)).toBe("Bandar Teknologi Maklumat");
    expect(byId(17).question).toMatch(/Cyberjaya dan Taman Teknologi Malaysia/);
    expect(correct(18)).toBe("Menjadi pusat kilang dan pembuatan");
    expect(byId(18).question).toMatch(/Shah Alam dan Perai/);
    expect(correct(23)).toBe("Bandar Pendidikan");
    expect(byId(23).question).toMatch(/Tanjung Malim.*UPSI/);
    expect(byId(23).explanation).toMatch(/Petaling Jaya dan Senawang/);
    expect(byId(23).explanation).toMatch(/Pekan, Kuala Kangsar dan Arau/);
    expect(correct(25)).toBe("Bandar Pertahanan");
    expect(byId(25).question).toMatch(/Lumut dan Port Dickson/);
    expect(correct(26)).toBe("Bandar Sempadan");
    expect(byId(26).question).toMatch(/Rantau Panjang.*Padang Besar/);
    expect(correct(27)).toBe(
      "Bandar Sempadan dan Bandar Pertahanan ialah fungsi kerajaan; Bandar Diraja ialah fungsi sosial",
    );
  });

  it("does not score the category of Bandar Satelit, where the sources disagree", () => {
    expect(allText).not.toMatch(/satelit[^.;]*fungsi (ekonomi|sosial|kerajaan)/i);
  });

  it("9.3: rural functions across ekonomi, sosial and kerajaan/governan, compared with urban", () => {
    expect(correct(19)).toBe("Mengeluarkan padi, getah dan kelapa sawit");
    expect(correct(20)).toBe("Kraf tangan dan makanan tradisional");
    expect(correct(21)).toBe("Sekolah rendah, klinik desa dan balai raya");
    expect(correct(22)).toBe("Penghulu, ketua kampung atau JKKK");
    expect(correct(30)).toBe(
      "P bandar (fungsi ekonomi); Q luar bandar (fungsi ekonomi dan kerajaan)",
    );
  });

  it("drops off-standard examples and topics", () => {
    expect(allText).not.toMatch(/Kuala Lumpur[^.]*(kewangan|bursa)/i);
    expect(allText).not.toMatch(/Bangi|Sintok|UKM|UUM/);
    expect(allText).not.toMatch(/Wan Mat Saman/);
    expect(allText).not.toMatch(/Kuching|kepadatan/i);
    expect(allText).not.toMatch(/evolusi|bertukar status|timbal balik|saling bergantung/i);
    expect(allText).not.toMatch(/lot tanah|saiz pemilikan|bentuk muka bumi beralun/i);
    expect(chapter9.filter((q) => /PIPLB/.test(text(num(q)))).length).toBeLessThanOrEqual(1);
  });
});

describe("Geografi Form 1 Bab 9 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter9)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter9.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter9.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter9.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter9) {
      const lengths = q.options.map(len);
      // Pattern names and short function names cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no absurd or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /\bgua\b|terapung|\bpaku\b|peluru|aeroangkasa|satelit komunikasi|bursa saham|\bLRT\b|\bMRT\b|bertaraf dunia|kapal terbang|bermusuhan|mikrocip|bercakap/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter9.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 9 difficulty and catalog", () => {
  it("keeps 13 Easy / 14 Medium / 3 Hard", () => {
    for (const q of chapter9) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter9.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      13, 14, 3,
    ]);
  });

  it("uses Hard only for integrated classification", () => {
    // q24: three settlements to classify by pattern; q27: three functions by category;
    // q30: two settlements by type and function group. FELDA alone is no longer Hard.
    expect(byId(24).question).toMatch(/Petempatan X.*Petempatan Y.*Petempatan Z/);
    expect(byId(27).options.every((o) => o.split("; ").length === 2)).toBe(true);
    expect(byId(30).question).toMatch(/Petempatan P.*Petempatan Q/);
    expect(normalizeQuizDifficulty(byId(13).difficulty)).not.toBe("hard");
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 9",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 13,
      mediumCount: 14,
      hardCount: 3,
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
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 9', 'bm', 30, 13, 14, 3, true, 1125`,
    );
  });
});

describe("Geografi Form 1 Bab 9 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter9, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter9, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter9, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c9", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c9", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c10", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter9) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
