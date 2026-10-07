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

// Geografi Tingkatan 1 Bab 6 — Bentuk Muka Bumi di Malaysia (DSKP SK 2.2). The live bank is the
// `quizzes` export of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter6 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 6",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter6.find((q) => q.id === `geo-f1-c6-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter6.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c6-q${i + 1}`);

// DSKP 2.2: 6.1 ciri, 6.2 lokasi, 6.3 kepentingan (primary focus of each question).
const SECTION: Record<string, number[]> = {
  ciri: [1, 2, 8, 13, 14, 16, 18, 19, 20, 28],
  lokasi: [3, 4, 5, 9, 10, 21, 23],
  kepentingan: [6, 7, 11, 12, 15, 17, 22, 24, 25, 26, 27, 29, 30],
};
// The four landform groups; 1, 29 and 30 span several groups.
const GROUP: Record<string, number[]> = {
  tanahTinggi: [2, 3, 4, 5, 6, 7, 25, 26],
  tanahPamah: [8, 9, 10, 11, 12, 21, 27],
  pinggirLaut: [13, 14, 15, 16, 17, 19, 28],
  saliran: [18, 20, 22, 23, 24],
  gabungan: [1, 29, 30],
};
const HARD = [5, 25, 28, 29];
const MEDIUM = [3, 7, 9, 11, 12, 16, 19, 20, 21, 22, 27, 30];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");

describe("Geografi Form 1 Bab 6 question IDs", () => {
  // Regression: the old bank shipped geo-f1-c6-q22 twice and no q28, which still totals 30 records.
  it("uses q1-q30 exactly once each, with no duplicate, missing or stray ID", () => {
    const ids = chapter6.map((q) => q.id);
    expect(ids).toHaveLength(30);
    expect(new Set(ids).size).toBe(30);
    expect([...ids].sort()).toEqual([...EXPECTED_IDS].sort());
    expect(ids.filter((id) => id === "geo-f1-c6-q22")).toHaveLength(1);
    expect(ids).toContain("geo-f1-c6-q28");
    // No other record anywhere in the live bank claims a Chapter 6 ID.
    const prefixed = quizzes.filter((q) => q.id.startsWith("geo-f1-c6-")).map((q) => q.id);
    expect(prefixed.sort()).toEqual([...EXPECTED_IDS].sort());
  });

  it("keeps the IDs in sequence and q28 holds the coastal-erosion question", () => {
    expect(chapter6.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(byId(28).question).toMatch(/gua/);
    expect(byId(22).question).toMatch(/Sungai Rajang dan Sungai Baram/);
  });

  it("can be snapshotted now that IDs are unique", () => {
    expect(createAttemptSnapshot("geography-f1-c6", "attempt-1", chapter6)).not.toBeNull();
  });
});

describe("Geografi Form 1 Bab 6 quiz bank integrity", () => {
  it("is served by the registry in full", () => {
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 6").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter6) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 6"]);
    }
    expect(new Set(chapter6.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, diagram or labelled feature", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|ditanda|dilabel|berlabel|berlorek|kawasan [A-Z] (pada|dalam) (peta|rajah)/i,
    );
    for (const q of chapter6) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM", () => {
    expect(allText).not.toMatch(/\b(the|which|natural|lake|highland|lowland|coast|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|sangat ideal|efisien|lebuh raya sungai|portfolio|impak maut|kontemporari|klimatorlogi|\(LRA\)/i,
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

describe("Geografi Form 1 Bab 6 textbook coverage", () => {
  it("assigns every question to one DSKP section and one landform grouping", () => {
    const all = (m: Record<string, number[]>) =>
      Object.values(m)
        .flat()
        .sort((a, b) => a - b);
    const oneToThirty = Array.from({ length: 30 }, (_, i) => i + 1);
    expect(all(SECTION)).toEqual(oneToThirty);
    expect(all(GROUP)).toEqual(oneToThirty);
    for (const ids of Object.values(SECTION)) expect(ids.length).toBeGreaterThanOrEqual(7);
  });

  it("keeps saliran from crowding out the other three landform groups", () => {
    for (const group of ["tanahTinggi", "tanahPamah", "pinggirLaut"]) {
      expect(GROUP[group].length, group).toBeGreaterThanOrEqual(6);
    }
    expect(GROUP.saliran.length).toBeLessThanOrEqual(6);
    // Detailed river records belong to Bab 7.
    expect(allText).not.toMatch(/terpanjang|paling panjang/i);
  });

  it("6.1: four landform types with the 180 m boundary", () => {
    expect(correct(1)).toBe("Empat kategori");
    for (const group of ["tanah tinggi", "tanah pamah", "pinggir laut", "saliran"]) {
      expect(byId(1).explanation).toContain(group);
    }
    expect(correct(2)).toBe("180 meter");
    expect(byId(2).question).toMatch(/melebihi/);
    expect(correct(8)).toBe("Tidak melebihi 180 meter dari aras laut");
    expect(correct(18)).toBe("Sungai dan tasik");
    expect(correct(20)).toBe("Tasik Bera semula jadi; Tasik Kenyir buatan manusia");
    // Any coastline length mentioned must be the textbook's 4,800 km.
    for (const m of allText.matchAll(/(\d[\d,]*) km/g)) expect(m[1]).toBe("4,800");
  });

  it("6.1: coastal features, including the erosion sequence, and Pentas Sunda", () => {
    expect(correct(13)).toBe("Tanjung");
    expect(correct(14)).toBe("Teluk");
    expect(correct(19)).toBe("Gerbang laut");
    expect(correct(28)).toBe("Batu tunggul, kemudian batu sisa");
    expect(byId(28).explanation).toMatch(/gerbang laut.*batu tunggul.*batu sisa/is);
    expect(correct(16)).toBe("Pentas Sunda, sehingga 180 m");
  });

  it("6.2: locates highlands and lowlands across Semenanjung, Sabah and Sarawak", () => {
    expect(correct(3)).toBe("Banjaran Titiwangsa");
    expect(byId(3).question).toMatch(/tulang belakang/);
    expect(correct(4)).toBe("Sabah");
    expect(byId(4).question).toMatch(/Gunung Kinabalu/);
    expect(byId(4).explanation).toMatch(/4,095 m/);
    expect(correct(5)).toBe("Gunung Tahan – tanah tinggi – Semenanjung");
    expect(byId(5).explanation).toMatch(/Gunung Mulu dan Delta Rajang terletak di Sarawak/);
    expect(correct(10)).toBe("Dataran Kedah–Perlis");
    expect(correct(9)).toBe("Tanih aluvium");
    expect(correct(21)).toBe("Sarawak dan Sabah");
    expect(byId(21).question).toMatch(/Delta Rajang dan Delta Segama/);
    expect(correct(23)).toBe("Sungai Golok");
  });

  it("6.3: importance of each landform, taught through textbook examples", () => {
    // Tanah tinggi
    expect(correct(6)).toBe("Cameron Highlands");
    expect(correct(7)).toMatch(/tadahan hujan/);
    expect(correct(26)).toBe("Penjanaan kuasa hidroelektrik");
    // Tanah pamah
    expect(correct(11)).toBe("Petempatan");
    expect(correct(12)).toBe("Tanah pamah");
    expect(byId(12).question).toMatch(/Lebuhraya Utara–Selatan/);
    expect(correct(27)).toBe("Getah dan kelapa sawit");
    // Pinggir laut
    expect(correct(15)).toBe("Pelabuhan");
    expect(correct(17)).toBe("Pelancongan dan rekreasi");
    expect(byId(30).explanation).toMatch(/perikanan/);
    // Saliran
    expect(correct(24)).toBe("Bekalan air domestik dan industri");
    expect(correct(22)).toBe("Pengangkutan dan perhubungan");
    expect(byId(22).explanation).toMatch(/protein air tawar/);
    expect(byId(23).explanation).toMatch(/sempadan semula jadi/);
  });

  it("6.3: compares importance across landforms (DSKP 2.2.3)", () => {
    expect(correct(29)).toBe("X: penanaman padi; Y: pertanian hawa sederhana");
    expect(correct(30)).toBe("Tanah pamah untuk petempatan; pinggir laut untuk perikanan");
    expect(correct(25)).toBe("Pertanian hawa sederhana dan hidroelektrik");
  });

  it("drops imported climatology, ecology, tectonics and pollution crossovers", () => {
    expect(allText).not.toMatch(/6[.,]5\s*°C|1,000 meter/);
    expect(allText).not.toMatch(/plankton|fotosintesis|cahaya matahari/i);
    expect(allText).not.toMatch(/Lingkaran Api|Plat Sunda|tektonik/i);
    expect(allText).not.toMatch(/pencemaran|biosfera|hidrosfera|ekosistem|rantaian makanan/i);
  });
});

describe("Geografi Form 1 Bab 6 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter6)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter6.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter6.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter6.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter6) {
      const lengths = q.options.map(len);
      // Short names (a feature, a river) cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /salji|tanpa menggunakan minyak|\bangin\b|ikan paus|nuklear|turbin|radio|lumba-lumba|udang galah|luncur|kuari|granit|kutub|simen|geotermal|suria|Teh Jepun/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter6.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 6 difficulty and catalog", () => {
  it("keeps 14 Easy / 12 Medium / 4 Hard", () => {
    for (const q of chapter6) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter6.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      14, 12, 4,
    ]);
  });

  it("uses Hard only for questions that combine several taught facts", () => {
    // q5: landform type and state must both be right for one of four classifications.
    expect(byId(5).options.every((o) => o.split(" – ").length === 3)).toBe(true);
    // q25: three physical clues point to one landform and two of its uses.
    expect(byId(25).question).toMatch(/180 m.*suhu rendah.*empangan/);
    // q28: a four-step erosion sequence.
    expect(byId(28).question).toMatch(/tebing tinggi.*gua.*runtuh/);
    // q29: two areas classified, then their uses compared.
    expect(byId(29).question).toMatch(/Kawasan X.*Kawasan Y/);
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 6",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 14,
      mediumCount: 12,
      hardCount: 4,
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
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 6', 'bm', 30, 14, 12, 4, true, 1125`,
    );
  });
});

describe("Geografi Form 1 Bab 6 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter6, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter6, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter6, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c6", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c6", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c7", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter6) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
