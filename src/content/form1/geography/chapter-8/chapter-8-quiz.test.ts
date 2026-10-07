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

// Geografi Tingkatan 1 Bab 8 — Penduduk di Malaysia (DSKP SK 3.1). The live bank is the `quizzes`
// export of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter8 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 8",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter8.find((q) => q.id === `geo-f1-c8-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter8.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c8-q${i + 1}`);

// Textbook thresholds: padat > 200, sederhana padat 50–200 inclusive, jarang < 50 (orang/km²).
const classify = (density: number) =>
  density > 200 ? "padat" : density >= 50 ? "sederhana padat" : "jarang";

// 8.1 taburan and kepadatan, then the four 8.2 factor groups, then integrated comparisons.
const SECTION: Record<string, number[]> = {
  taburan: [1, 2, 3, 4, 5, 6, 7, 8, 10, 22, 23, 28],
  fizikal: [9, 11, 20, 29],
  ekonomi: [12, 13, 14, 21, 27],
  sosial: [15, 16, 26],
  dasarKerajaan: [17, 18, 19, 25],
  gabungan: [24, 30],
};
const HARD = [10, 24, 30];
const MEDIUM = [4, 6, 9, 11, 13, 15, 17, 19, 21, 23, 27, 28, 29];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");

describe("Geografi Form 1 Bab 8 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter8.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c8-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 8").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter8) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 8"]);
    }
    expect(new Set(chapter8.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map or shaded area", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|berlorek|dilorek|dilabel|berlabel/i,
    );
    for (const q of chapter8) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM", () => {
    expect(allText).not.toMatch(/\b(the|which|density|population|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|lubuk emas hitam|ekosistem|\bhub\b|logistik|metropolitan|pangkalan petempatan|era moden|paling dominan|\(Governan\)/i,
    );
    // The textbook category is "sederhana padat", never a bare "penduduk sederhana".
    expect(allText).not.toMatch(/penduduk sederhana(?! padat)/i);
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

describe("Geografi Form 1 Bab 8 — 8.1 taburan dan kepadatan penduduk", () => {
  it("defines taburan penduduk and states Malaysia's distribution is tidak sekata", () => {
    expect(correct(1)).toBe("Sebaran penduduk di sesuatu kawasan atau negara");
    expect(correct(2)).toBe("Tidak sekata antara kawasan");
    for (const category of ["berpenduduk padat", "sederhana padat", "berpenduduk jarang"]) {
      expect(byId(2).explanation).toContain(category);
    }
  });

  it("states the three thresholds once each (q28 no longer repeats q7)", () => {
    expect(correct(3)).toBe("Lebih daripada 200 orang/km²");
    expect(correct(5)).toBe("50 hingga 200 orang/km²");
    expect(correct(7)).toBe("Kurang daripada 50 orang/km²");
    const thresholdStems = chapter8.filter((q) =>
      /kepadatan penduduk sebanyak|julat kepadatan|had kepadatan/.test(q.question),
    );
    expect(thresholdStems.map(num)).toEqual([3, 5, 7]);
  });

  it("treats exactly 50 and exactly 200 as sederhana padat", () => {
    expect(classify(50)).toBe("sederhana padat");
    expect(classify(200)).toBe("sederhana padat");
    expect(classify(201)).toBe("padat");
    expect(classify(49)).toBe("jarang");
    // q23 sits on the 200 boundary and must not be scored as padat.
    expect(correct(23)).toBe("Berpenduduk sederhana padat");
    expect(byId(23).explanation).toMatch(/= 200 orang\/km²/);
  });

  it("assesses the formula and calculation, with every worked answer arithmetically right", () => {
    expect(correct(22)).toBe("Jumlah penduduk ÷ keluasan kawasan");
    const worked = [10, 23, 28];
    for (const n of worked) {
      const steps = [...(byId(n).explanation ?? "").matchAll(/([\d,]+) ÷ ([\d,]+) = ([\d,]+)/g)];
      expect(steps.length, `q${n}`).toBeGreaterThan(0);
      for (const [, people, area, density] of steps) {
        const value = (s: string) => Number(s.replace(/,/g, ""));
        expect(value(people) / value(area), `q${n}`).toBe(value(density));
      }
    }
    expect(correct(28)).toBe(`300 orang/km² – berpenduduk ${classify(60000 / 200)}`);
    expect(correct(10)).toBe(`A ${classify(45000 / 150)}; B ${classify(18000 / 450)}`);
  });

  it("uses textbook examples for each density category", () => {
    expect(correct(4)).toBe("Kuala Lumpur dan Kota Kinabalu");
    expect(correct(6)).toBe("Kawasan pertanian, perikanan dan pinggir bandar");
    expect(correct(8)).toBe("Banjaran Tahan");
  });
});

describe("Geografi Form 1 Bab 8 — 8.2 faktor taburan penduduk", () => {
  it("covers all four factor groups and keeps section sizes balanced", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.taburan.length).toBeGreaterThanOrEqual(9);
    for (const group of ["fizikal", "ekonomi", "sosial", "dasarKerajaan"]) {
      expect(SECTION[group].length, group).toBeGreaterThanOrEqual(3);
    }
  });

  it("fizikal: tanah pamah, tanah tinggi, pinggir laut and saliran, and swampy areas", () => {
    expect(correct(9)).toBe("Sesuai untuk petempatan dan kegiatan ekonomi");
    expect(correct(20)).toBe("Tanah tinggi yang sukar dihubungi");
    expect(byId(20).question).toMatch(/Ulu Tembeling dan Banjaran Kapuas Hulu/);
    expect(byId(20).explanation).toMatch(/darjah ketersampaian/i);
    expect(correct(11)).toMatch(/^Berpenduduk sederhana padat/);
    expect(correct(29)).toBe("Kawasannya berpaya");
  });

  it("ekonomi: pertanian, perlombongan (Kerteh and Miri), perikanan and perindustrian", () => {
    expect(correct(12)).toBe("Pertanian");
    expect(byId(13).question).toMatch(/Kerteh di Terengganu dan Miri di Sarawak/);
    expect(allText).not.toMatch(/Bintulu/);
    expect(correct(13)).toBe("Perlombongan petroleum");
    expect(correct(21)).toBe("Perikanan");
    expect(byId(21).question).toMatch(/Semporna, Tumpat dan Kemaman/);
    expect(correct(14)).toBe("Peluang pekerjaan");
    expect(correct(27)).toBe("Shah Alam, Batu Berendam dan Nilai");
  });

  it("sosial: infrastruktur and pendidikan only", () => {
    expect(correct(16)).toBe("Infrastruktur");
    expect(byId(16).question).toMatch(/bekalan air, elektrik, telekomunikasi dan pengangkutan/);
    expect(correct(15)).toBe("Pusat pengajian tinggi");
    expect(byId(15).explanation).toMatch(/UPSI.*UKM/);
    expect(correct(26)).toBe("Pendidikan");
    expect(allText).not.toMatch(/hospital|perubatan|kesihatan/i);
  });

  it("dasar kerajaan: bandar baharu, tanah rancangan and protected areas", () => {
    expect(correct(18)).toBe("Faktor dasar kerajaan");
    expect(correct(17)).toBe("Kawasan jarang menjadi sederhana padat");
    expect(byId(17).explanation).toMatch(/Felda Kampung Sertik dan Felda Sahabat/);
    expect(correct(19)).toBe("Hutan Simpan Royal Belum");
    expect(correct(25)).toBe("Diwartakan untuk pemuliharaan");
  });

  it("compares dense and sparse areas by factor (TP5)", () => {
    expect(correct(24)).toBe(
      "X padat – faktor fizikal, ekonomi dan sosial; Y jarang – faktor fizikal dan sosial",
    );
    expect(correct(30)).toBe(
      "Kerteh – perlombongan; UTM Skudai – pendidikan; Putrajaya – dasar kerajaan",
    );
  });

  it("drops Chapter 9 settlement patterns, enrichment examples and unsupported causes", () => {
    expect(allText).not.toMatch(/corak|linear|bergaris|pola petempatan/i);
    expect(allText).not.toMatch(/dominan/i);
    expect(allText).not.toMatch(/Cameron|Banjaran Iran|Tok Bali|George Town|Lembah Klang/);
    expect(allText).not.toMatch(/ibu negeri/i);
    expect(allText).not.toMatch(/31\.7|2016|juta orang/);
  });
});

describe("Geografi Form 1 Bab 8 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter8)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter8.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    // q18 offers the four textbook factor-group names; "dasar kerajaan" is simply longer.
    expect(clearlyLongest.map((q) => q.id)).toEqual(["geo-f1-c8-q18"]);
    expect(byId(18).options).toEqual([
      "Faktor fizikal",
      "Faktor ekonomi",
      "Faktor sosial",
      "Faktor dasar kerajaan",
    ]);
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
      // Short names and the four factor-group labels cannot be balanced by length.
      if (Math.min(...lengths) < 15) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /graviti|takat beku|Formula 1|oksigen|peluru berpandu|toksik|kuarantin|salji|undang-undang dikenakan|\bemas\b|Celcius|kayu jati|lada hitam|diraja/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter8.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 8 difficulty and catalog", () => {
  it("keeps 14 Easy / 13 Medium / 3 Hard", () => {
    for (const q of chapter8) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter8.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      14, 13, 3,
    ]);
  });

  it("uses Hard only for calculation, comparison and integrated classification", () => {
    expect(byId(10).question).toMatch(/Kawasan A.*Kawasan B/);
    expect(byId(24).question).toMatch(/Kawasan X.*Kawasan Y/);
    // q30: every distractor has exactly one wrong pairing.
    const pairs = (o: string) => o.split("; ");
    for (const option of byId(30).options) {
      if (option === correct(30)) continue;
      const wrong = pairs(option).filter((p) => !pairs(correct(30)).includes(p));
      expect(wrong, option).toHaveLength(1);
    }
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 8",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 14,
      mediumCount: 13,
      hardCount: 3,
      maxXp: 1115,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 8', 'bm', 30, 14, 13, 3, true, 1115`,
    );
  });
});

describe("Geografi Form 1 Bab 8 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter8, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter8, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter8, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c8", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c8", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c9", a)).toBeNull();
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
