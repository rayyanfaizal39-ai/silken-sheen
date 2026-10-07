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

// Geografi Tingkatan 1 Bab 10 — Bentuk Muka Bumi dan Saliran di Asia Tenggara (DSKP SK 4.1).
// The live bank is the `quizzes` export of src/data/content.ts (the registry reads it);
// src/data/quizzes.ts holds a stale copy. DSKP 4.1.1 (completing a map) cannot be assessed by
// text MCQ, so country knowledge is tested through names, grouping and features instead.
const chapter10 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 10",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter10.find((q) => q.id === `geo-f1-c10-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter10.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c10-q${i + 1}`);

// Textbook sections: 10.1 negara, 10.2 bentuk muka bumi, 10.3 sungai, 10.3 tasik.
const SECTION: Record<string, number[]> = {
  negara: [1, 2, 3, 29],
  bentukMukaBumi: [4, 5, 6, 7, 8, 18, 19, 22, 23, 24, 28],
  sungai: [9, 10, 11, 12, 13, 14, 26, 27, 30],
  tasik: [15, 16, 17, 20, 21, 25],
};
const HARD = [6, 25, 27, 29, 30];
const MEDIUM = [2, 7, 10, 11, 12, 13, 14, 16, 17, 19, 20, 21, 24, 26];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const COUNTRIES = [
  "Malaysia",
  "Myanmar",
  "Thailand",
  "Laos",
  "Kemboja",
  "Vietnam",
  "Singapura",
  "Brunei Darussalam",
  "Indonesia",
  "Filipina",
  "Timor Leste",
];

describe("Geografi Form 1 Bab 10 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter10.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c10-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 10").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter10) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 10"]);
    }
    expect(new Set(chapter10.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, shading or labelled country", () => {
    expect(allText).not.toMatch(
      /pada peta|di atas peta|peta (berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|dilabel|berlabel|berlorek/i,
    );
    for (const q of chapter10) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM", () => {
    expect(allText).not.toMatch(/\b(the|which|landlocked|archipelago|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|nadi komersial|aset sosial|premium|strategik|jajaran|morfologi|geologi relatif|sosioekonomi/i,
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

describe("Geografi Form 1 Bab 10 textbook coverage", () => {
  it("assigns every question to one of the textbook sections", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.bentukMukaBumi.length).toBeGreaterThanOrEqual(10);
    expect(SECTION.sungai.length).toBeGreaterThanOrEqual(8);
    expect(SECTION.tasik.length).toBeGreaterThanOrEqual(5);
  });

  it("10.1: 11 countries, Laos without a coastline, one clean mainland grouping", () => {
    expect(correct(1)).toBe("11 buah negara");
    for (const country of COUNTRIES) expect(byId(1).explanation).toContain(country);
    expect(correct(3)).toBe("Laos");
    expect(byId(3).question).toMatch(/tidak mempunyai pinggir laut/);
    expect(correct(2)).toBe("Myanmar, Thailand, Laos, Kemboja dan Vietnam");
    // Malaysia spans both mainland and islands, so it is never scored as wholly either.
    expect(byId(2).explanation).toMatch(/Semenanjung Malaysia.*Sabah dan Sarawak/);
    expect(chapter10.filter((q) => /Tanah Besar|Kepulauan Asia/i.test(q.question))).toHaveLength(1);
    expect(allText).not.toMatch(/ASEAN/);
  });

  it("10.2: all four landform groups with the textbook lowland examples", () => {
    expect(byId(18).options).toEqual([
      "Tanah tinggi",
      "Tanah pamah",
      "Pinggir laut",
      "Gunung berapi",
    ]);
    expect(correct(18)).toBe("Tanah pamah");
    expect(byId(18).explanation).toMatch(/Delta Sungai Mekong di Vietnam/);
    expect(byId(18).explanation).toMatch(/Delta Sungai Irrawaddy di Myanmar/);
    expect(correct(7)).toBe("Diliputi tanih mendapan yang dibawa sungai");
    expect(correct(8)).toBe("Petempatan dan pengangkutan mudah dibangunkan");
    expect(correct(23)).toBe("Pentas benua");
    expect(correct(28)).toBe("Laut Jawa");
  });

  it("10.2: highlands from the Himalaya via Arakan Yoma, with range-country matching", () => {
    expect(correct(4)).toBe("Banjaran Himalaya");
    expect(byId(4).explanation).toMatch(/Arakan Yoma di Myanmar/);
    expect(correct(19)).toBe("Vietnam dan Thailand");
    expect(byId(19).question).toMatch(/Annam.*Bilauktaung/);
    expect(correct(6)).toBe("Arakan Yoma – Myanmar; Crocker – Malaysia; Mayon – Filipina");
    expect(correct(24)).toBe("Lipat muda sejak 35 juta tahun; lipat tua sejak 200 juta tahun");
    // Young fold mountains are not scored as earthquake-prone or unstable.
    expect(allText).not.toMatch(/tidak stabil|berisiko gempa/i);
  });

  it("10.2: volcanoes are concentrated in Indonesia and the Philippines", () => {
    expect(correct(5)).toBe("Indonesia dan Filipina");
    expect(correct(22)).toBe("Indonesia");
    expect(byId(22).question).toMatch(/Merapi.*Kerinci.*Krakatau/);
    expect(byId(22).explanation).toMatch(/Mayon dan Gunung Pinatubo pula terletak di Filipina/);
  });

  it("10.3: the three textbook rivers with location and importance", () => {
    expect(correct(9)).toBe("Sungai Mekong");
    expect(byId(9).explanation).toMatch(/4,880 km/);
    expect(correct(10)).toBe("Vietnam");
    expect(byId(10).explanation).toMatch(
      /Dataran Tibet.*Yunan.*Myanmar, Thailand, Laos dan Kemboja/,
    );
    expect(correct(11)).toBe("Tanahnya subur dan bekalan air mencukupi");
    expect(byId(11).explanation).toMatch(/ikan air tawar/);
    expect(correct(12)).toBe("Sungai Irrawaddy");
    expect(byId(12).question).toMatch(/Laut Andaman/);
    expect(correct(13)).toBe("Pengangkutan, sumber air dan sumber protein");
    expect(correct(14)).toBe("Teluk Siam");
    expect(correct(26)).toBe("Terusannya menjadi jalan pengangkutan dan pasar terapung");
    expect(byId(18).explanation).toMatch(/penanaman padi/);
  });

  it("10.3: Tonle Sap and Danau Toba, the two textbook lake case studies", () => {
    expect(correct(15)).toBe("Tonle Sap (Kemboja)");
    expect(correct(16)).toBe("Air Sungai Mekong mengalir masuk ke tasik");
    expect(byId(16).explanation).toMatch(/10,000 km²/);
    expect(correct(17)).toBe("Bekalan air, pengairan padi dan perikanan");
    expect(byId(17).explanation).toMatch(/pelancongan/);
    expect(correct(20)).toBe("Letusan gunung berapi purba");
    expect(byId(20).explanation).toMatch(/tasik vulkanik/);
    expect(byId(20).question).toMatch(/Indonesia/);
    expect(correct(21)).toBe("Bekalan air, pertanian dan pelancongan");
  });

  it("compares countries, rivers, deltas and lakes (TP5)", () => {
    expect(correct(25)).toBe(
      "Tonle Sap: tasik air tawar di Kemboja; Danau Toba: tasik vulkanik di Indonesia",
    );
    expect(correct(27)).toBe(
      "Mekong – terpanjang di Asia Tenggara; Irrawaddy – ke Laut Andaman; Chao Phraya – pasar terapung",
    );
    expect(correct(29)).toBe("X Myanmar; Y Thailand");
    expect(correct(30)).toBe(
      "Mekong di Vietnam, Irrawaddy di Myanmar; kedua-duanya subur untuk padi",
    );
  });

  it("drops record trivia, tourism enrichment and unsupported claims", () => {
    expect(allText).not.toMatch(/Hkakabo/);
    expect(allText).not.toMatch(/Bateri|Battery|Ha Long|UNESCO|\bBali\b/i);
    expect(allText).not.toMatch(/mengurangkan risiko banjir|takungan semula jadi/i);
    expect(allText).not.toMatch(/andosol/i);
    expect(allText).not.toMatch(/Lingkaran Api/i);
    expect(allText).not.toMatch(
      /paling luas|seragam|mangkuk nasi|bakul padi|berkali-kali|kali setahun/i,
    );
  });
});

describe("Geografi Form 1 Bab 10 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter10)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter10.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter10.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter10.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter10) {
      const lengths = q.options.map(len);
      // Country, river and sea names cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /kubu tentera|mendidih|nuklear|salji|angkasa|pam gergasi|kutub utara|\bemas\b|Eropah|kapal selam|seramik|robotik|Sungai Amazon|Musi/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter10.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 10 difficulty and catalog", () => {
  it("keeps 11 Easy / 14 Medium / 5 Hard", () => {
    for (const q of chapter10) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter10.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      11, 14, 5,
    ]);
  });

  it("uses Hard only for multi-fact comparison, never single-fact recall", () => {
    // Laos, Tonle Sap's monsoon expansion and the Mekong route are no longer Hard.
    for (const n of [3, 10, 16]) {
      expect(normalizeQuizDifficulty(byId(n).difficulty), `q${n}`).not.toBe("hard");
    }
    // q6 and q27: each option makes three claims; q25 and q30: two claims each.
    for (const n of [6, 27]) {
      expect(
        byId(n).options.every((o) => o.split("; ").length === 3),
        `q${n}`,
      ).toBe(true);
    }
    expect(byId(29).question).toMatch(/Negara X.*Negara Y/);
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 10",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 11,
      mediumCount: 14,
      hardCount: 5,
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
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 10', 'bm', 30, 11, 14, 5, true, 1165`,
    );
  });
});

describe("Geografi Form 1 Bab 10 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter10, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter10, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter10, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c10", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c10", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c11", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter10) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
