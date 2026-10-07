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

// Geografi Tingkatan 1 Bab 11 — Penduduk dan Petempatan di Asia Tenggara (DSKP SK 4.2).
// The live bank is the `quizzes` export of src/data/content.ts (the registry reads it);
// src/data/quizzes.ts holds a stale copy. The quiz follows the textbook's historical framing
// (e.g. Jakarta as ibu negara); map labelling (TP2) cannot be assessed by text MCQ.
const chapter11 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 11",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter11.find((q) => q.id === `geo-f1-c11-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter11.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c11-q${i + 1}`);

// 11.1 taburan penduduk, 11.2 fungsi bandar utama, then TP4/TP5 comparisons.
const SECTION: Record<string, number[]> = {
  taburan: [1, 2, 3, 4, 5, 7, 17, 19, 20, 21, 22, 23, 24, 28],
  fungsiBandar: [6, 8, 9, 12, 13, 14, 15, 18, 26, 29],
  perbandingan: [10, 11, 16, 25, 27, 30],
};
const HARD = [10, 11, 16, 25, 27, 30];
const MEDIUM = [4, 6, 7, 9, 14, 17, 19, 22, 23, 24, 26, 29];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const FUNCTION_LABELS = [
  "Pusat Pentadbiran",
  "Pusat Perdagangan",
  "Pusat Pelancongan",
  "Pusat Perindustrian",
  "Pusat Perhubungan dan Pengangkutan",
];
const isFunctionLabelSet = (o: string[]) => o.every((x) => FUNCTION_LABELS.includes(x));

describe("Geografi Form 1 Bab 11 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter11.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c11-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 11").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter11) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 11"]);
    }
    expect(new Set(chapter11.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map or shaded area", () => {
    expect(allText).not.toMatch(
      /pada peta|di atas peta|peta (berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|dilabel|berlabel|berlorek|kawasan P\b/i,
    );
    for (const q of chapter11) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM", () => {
    expect(allText).not.toMatch(/\b(the|which|city|cities|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|\bhub\b|\bhab\b|\burban\b|\bmega\b|mobiliti|magnet|drastik|penambakan|kolar putih|overurban|slums|governan/i,
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

describe("Geografi Form 1 Bab 11 — 11.1 taburan penduduk", () => {
  it("assigns every question to 11.1, 11.2 or comparison", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.taburan.length).toBeGreaterThanOrEqual(12);
    expect(SECTION.fungsiBandar.length + SECTION.perbandingan.length).toBeGreaterThanOrEqual(13);
  });

  it("defines taburan penduduk and states it is uneven", () => {
    expect(correct(20)).toBe("Sebaran penduduk di sesuatu kawasan di muka bumi");
    expect(correct(1)).toBe("Tidak sekata dan berbeza mengikut kawasan");
  });

  it("padat: Java, west Peninsular Malaysia, capitals and fertile deltas", () => {
    expect(correct(2)).toBe("Pulau Jawa, Indonesia");
    expect(correct(5)).toBe("Pantai barat Semenanjung Malaysia");
    expect(correct(4)).toBe("Tanahnya subur dan sesuai untuk pertanian");
    expect(byId(4).question).toMatch(/Delta Mekong, Delta Irrawaddy dan Lembah Menam Chao Phraya/);
    expect(correct(23)).toBe("Menjadi tumpuan kegiatan ekonomi dan perhubungan");
  });

  it("sederhana: east Peninsular Malaysia, west Sumatra, Arakan Yoma coast, Mekong fringe", () => {
    expect(correct(17)).toBe("Pantai timur Semenanjung Malaysia");
    expect(correct(24)).toBe("Kawasan pertanian, pinggir bandar dan bandar baharu");
    expect(byId(19).question).toMatch(
      /Pantai barat Sumatera, pantai Arakan Yoma dan pinggir Sungai Mekong/,
    );
    expect(correct(19)).toBe("Sederhana");
  });

  it("jarang: interior Sabah and Sarawak, East Sumatra swamp, Banjaran Annam", () => {
    expect(correct(3)).toBe("Kawasan pedalaman berhutan dengan perhubungan terhad");
    expect(correct(22)).toBe("Kawasannya berpaya dan sukar didiami");
    expect(correct(21)).toBe("Banjaran Annam");
  });

  it("uses the Chapter 11 categories, not Chapter 8's Malaysian density thresholds", () => {
    expect(allText).not.toMatch(/km²|orang\/km|200 orang|50 orang/);
    // Checked per string: q19 legitimately offers "Sederhana" and "Padat" as separate options.
    for (const q of chapter11) {
      for (const s of [q.question, ...q.options, q.explanation ?? ""]) {
        expect(s, q.id).not.toMatch(/sederhana padat/i);
      }
    }
  });

  it("labels 2016 figures as historical and uses transmigration at most once", () => {
    for (const q of chapter11) {
      const t = text(num(q));
      if (/2016|640 juta|8\.62/.test(t)) expect(q.question, q.id).toMatch(/Jun 2016/);
    }
    expect(correct(28)).toBe("Indonesia");
    expect(chapter11.filter((q) => /Transmigrasi/i.test(text(num(q))))).toHaveLength(1);
    expect(correct(7)).toBe("Mengurangkan kepadatan penduduk di Pulau Jawa");
  });
});

describe("Geografi Form 1 Bab 11 — 11.2 fungsi bandar utama", () => {
  it("assesses all five textbook urban functions", () => {
    for (const fn of [
      /pusat pentadbiran|ibu negara/i,
      /pusat perdagangan/i,
      /pusat pelancongan/i,
      /pusat perindustrian/i,
      /pusat perhubungan dan pengangkutan/i,
    ]) {
      expect(allText).toMatch(fn);
    }
    expect(correct(15)).toBe("Pusat pemerintahan dan pentadbiran");
    expect(correct(13)).toBe("Pusat Perdagangan");
    expect(byId(13).question).toMatch(/Bandung, Surabaya, Johor Bahru dan Orchard Road/);
    expect(correct(9)).toBe("Pusat Pelancongan");
    expect(correct(26)).toBe("Tarikan panorama, budaya dan sejarah");
    expect(correct(12)).toBe("Pemasangan kenderaan dan besi keluli");
    expect(byId(12).explanation).toMatch(
      /elektrik, elektronik dan makanan pula ialah contoh di Bangkok/,
    );
    expect(correct(14)).toBe("KLIA dan Soekarno-Hatta");
    expect(correct(18)).toBe("Jaringan telekomunikasi yang lengkap");
  });

  it("covers the five textbook city profiles", () => {
    expect(correct(8)).toBe("Perindustrian, perdagangan dan pendidikan");
    expect(byId(8).explanation).toMatch(/Sungai Klang dan Sungai Gombak/);
    expect(correct(6)).toBe("Pusat perdagangan antarabangsa dan pelabuhan");
    for (const city of ["Kuala Lumpur", "Jakarta", "Bangkok", "Manila", "Singapura"]) {
      expect(allText).toContain(city);
    }
    expect(byId(15).question).toMatch(/Menurut buku teks/);
  });

  it("keeps urban problems to a single question", () => {
    expect(chapter11.filter((q) => /setinggan|kesesakan/i.test(q.options.join(" ")))).toHaveLength(
      1,
    );
    expect(correct(29)).toBe("Kesesakan, kekurangan tanah dan setinggan");
  });
});

describe("Geografi Form 1 Bab 11 — comparisons (TP4/TP5)", () => {
  it("compares areas and cities using several taught facts", () => {
    expect(correct(10)).toBe("X padat, contohnya Bangkok; Y jarang, contohnya Banjaran Annam");
    expect(correct(11)).toBe(
      "Pulau Jawa – padat; paya Sumatera Timur – jarang; pantai timur Semenanjung – sederhana",
    );
    expect(correct(16)).toBe(
      "Kedua-duanya ibu negara; Jakarta mempunyai Soekarno-Hatta, Manila memasang kenderaan",
    );
    expect(correct(25)).toBe(
      "Bangkok: ibu negara dan industri elektronik; Singapura: perdagangan antarabangsa dan pelabuhan",
    );
    expect(correct(27)).toBe(
      "Kuala Lumpur: pertemuan Sungai Klang dan Gombak; Jakarta: Lapangan Terbang Soekarno-Hatta",
    );
    expect(correct(30)).toBe(
      "Perdagangan – Orchard Road; Perindustrian – Manila; Pengangkutan – KLIA",
    );
  });
});

describe("Geografi Form 1 Bab 11 cross-chapter and current-affairs regression", () => {
  it("does not re-test Chapter 8 factors, Chapter 9 patterns or Chapter 10 river mechanics", () => {
    expect(allText).not.toMatch(
      /berpusat|terpusat|berkelompok|berjajar|berselerak|corak petempatan/i,
    );
    expect(allText).not.toMatch(/luar bandar/i);
    expect(allText).not.toMatch(/hospital|kesihatan|universiti/i);
    expect(allText).not.toMatch(/zon ekonomi khas|insentif|dasar kerajaan/i);
    expect(allText).not.toMatch(/lebuh raya air|komuter|logistik/i);
    expect(allText).not.toMatch(/Putrajaya|Lembah Klang|\bLRT\b|\bMRT\b/);
  });

  it("does not score modern capital changes or unsupported statistics", () => {
    expect(allText).not.toMatch(/Nusantara|Naypyidaw|Yangon|memindahkan ibu/i);
    expect(allText).not.toMatch(/100%|urbanisasi|pembandaran/i);
    expect(allText).not.toMatch(/Sungai Red|Sungai Merah|gaya hidup|Pasifik/i);
  });
});

describe("Geografi Form 1 Bab 11 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter11)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter11.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter11.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter11.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter11) {
      const lengths = q.options.map(len);
      // Short names and the five textbook function labels cannot be balanced by length.
      if (Math.min(...lengths) < 12 || isFunctionLabelSet(q.options)) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /salji|tiada udara|kereta kuda|\bunta\b|barter|angkasawan|mikrocip|aeroangkasa|runtuh|percuma|sifar|tidur di luar|kapal wap/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter11.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 11 difficulty and catalog", () => {
  it("keeps 12 Easy / 12 Medium / 6 Hard", () => {
    for (const q of chapter11) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter11.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      12, 12, 6,
    ]);
  });

  it("uses Hard only for multi-fact comparison; Transmigrasi is not Hard", () => {
    expect(normalizeQuizDifficulty(byId(7).difficulty)).not.toBe("hard");
    for (const n of [11, 30]) {
      expect(
        byId(n).options.every((o) => o.split("; ").length === 3),
        `q${n}`,
      ).toBe(true);
    }
    for (const n of [10, 16, 25, 27]) {
      expect(
        byId(n).options.every((o) => o.split("; ").length === 2),
        `q${n}`,
      ).toBe(true);
    }
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 11",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 12,
      mediumCount: 12,
      hardCount: 6,
      maxXp: 1165,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 11', 'bm', 30, 12, 12, 6, true, 1165`,
    );
  });
});

describe("Geografi Form 1 Bab 11 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter11, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter11, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter11, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c11", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c11", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c12", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter11) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
