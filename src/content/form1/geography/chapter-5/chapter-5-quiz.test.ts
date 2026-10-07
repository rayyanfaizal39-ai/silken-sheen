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
import { geo5Content } from "./geo5-content";

// Geografi Tingkatan 1 Bab 5 — Bumi (DSKP SK 2.1). The live bank is the `quizzes` export of
// src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter5 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 5",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter5.find((q) => q.id === `geo-f1-c5-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter5.map((q) => text(num(q))).join("\n");
// What each question asserts as true: its stem, correct answer and explanation (not distractors).
const asserted = (n: number) => [byId(n).question, correct(n), byId(n).explanation].join(" ");
const allAsserted = chapter5.map((q) => asserted(num(q))).join("\n");

// Textbook section of every question: 5.1 sistem fizikal, 5.2 struktur, 5.3 benua/lautan/laut/selat,
// 5.4 kesan pergerakan kerak bumi.
const SECTION: Record<string, number[]> = {
  sistemFizikal: [1, 2, 3, 4, 5, 6, 7, 30],
  struktur: [8, 9, 10, 11, 12, 13],
  benuaLautan: [14, 15, 16, 19, 20, 21, 22, 23],
  pergerakanKerak: [17, 18, 24, 25, 26, 27, 28, 29],
};
const HARD = [18, 30];
const MEDIUM = [3, 7, 9, 10, 12, 17, 19, 20, 23, 24, 25, 26, 27];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const SPHERES = ["Atmosfera", "Hidrosfera", "Litosfera", "Biosfera"];

describe("Geografi Form 1 Bab 5 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter5).toHaveLength(30);
    expect(chapter5.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `geo-f1-c5-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 5").map((q) => q.id)).toEqual(
      chapter5.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter5) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 5"]);
    }
    expect(new Set(chapter5.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, diagram or labelled layer", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|ditanda|dilabel|berlabel|berlorek/i,
    );
    for (const q of chapter5) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural BM without English parentheticals or awkward phrasing", () => {
    expect(allText).not.toMatch(
      /\b(the|which|convection|continental|drift|currents|layer|crust|mantle|core|TODO|lorem)\b/i,
    );
    expect(allText).not.toMatch(/\.\.\.\?|\?\?|merusuh|\(cth/i);
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
    const isSphereSet = (o: string[]) => [...o].sort().join() === [...SPHERES].sort().join();
    for (let i = 1; i <= 30; i += 1) {
      for (let j = i + 1; j <= 30; j += 1) {
        const a = words(byId(i).question);
        const b = words(byId(j).question);
        const shared = [...a].filter((w) => b.has(w)).length;
        expect(shared / Math.min(a.size, b.size), `q${i}/q${j} stems`).toBeLessThan(0.85);
        // q2 and q6 legitimately offer the four physical systems as options.
        if (!isSphereSet(byId(i).options)) {
          expect([...byId(i).options].sort().join("|"), `q${i}/q${j} option sets`).not.toBe(
            [...byId(j).options].sort().join("|"),
          );
        }
      }
    }
  });
});

describe("Geografi Form 1 Bab 5 textbook coverage", () => {
  it("assigns every question to one of the four textbook sections", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    for (const ids of Object.values(SECTION)) expect(ids.length).toBeGreaterThanOrEqual(6);
  });

  it("5.1: four physical systems, defined as the textbook defines them", () => {
    expect(correct(1)).toBe("Empat komponen");
    for (const sphere of SPHERES) expect(byId(1).explanation).toMatch(new RegExp(sphere, "i"));
    expect(correct(2)).toBe("Atmosfera");
    expect(correct(3)).toBe("Atmosfera – gas, debu dan wap air");
    // Ice cover is part of the hydrosphere, never the odd one out.
    expect(correct(4)).toBe("Batuan dan mineral");
    expect(byId(4).options).toContain("Litupan ais");
    expect(byId(4).explanation).toMatch(/litupan ais/);
    expect(correct(5)).toBe("71%");
    expect(byId(5).explanation).toMatch(/29%/);
    // Litosfera is the crust plus the upper mantle, not just the crust.
    expect(correct(6)).toBe("Litosfera");
    expect(byId(6).question).toMatch(/kerak bumi dan bahagian atas mantel/);
    expect(correct(7)).toBe("Kawasan yang didiami oleh benda hidup");
  });

  it("5.1: does not import Science detail such as atmospheric gas percentages", () => {
    expect(allText).not.toMatch(/nitrogen|oksigen|78%|21%|argon|ultraungu/i);
  });

  it("5.2: crust, mantle and core with sial and sima placed correctly", () => {
    expect(correct(8)).toBe("Kerak bumi, mantel dan teras bumi");
    expect(correct(9)).toBe("Sial (silika dan aluminium), sima (silika dan magnesium)");
    expect(correct(10)).toBe("Sial dan sima");
    expect(byId(10).explanation).toMatch(/Sial .*membentuk benua/);
    expect(byId(10).explanation).toMatch(/Sima .*di bawah sial dan di dasar lautan/);
    expect(correct(11)).toBe("Mantel");
    expect(byId(11).question).toMatch(/dua pertiga jisim Bumi/);
    expect(correct(12)).toMatch(/lapisan luarnya separa cecair/);
    expect(correct(13)).toBe("Teras bumi");
    expect(byId(13).explanation).toMatch(/teras luar dan teras dalam/);
  });

  it("5.2: drops the 80% volume claim, the magma label and the inner-core solidity reason", () => {
    expect(allText).not.toMatch(/80%|isi padu/i);
    expect(allText).not.toMatch(/pepejal walaupun|tekanan melampau|teras luar \(cecair\)/i);
    expect(byId(12).options.join(" ")).not.toMatch(/magma/i);
    expect(allAsserted).not.toMatch(/paling tebal/i);
  });

  it("5.3: seven continents and five oceans using the textbook name Australia", () => {
    expect(correct(14)).toBe("7 benua dan 5 lautan");
    for (const continent of geo5Content.continentsOceans.continents) {
      expect(byId(14).explanation).toContain(continent.name);
    }
    for (const ocean of ["Pasifik", "Atlantik", "Hindi", "Selatan", "Artik"]) {
      expect(byId(14).explanation).toContain(ocean);
    }
    expect(allText).not.toMatch(/Oceania/i);
    expect(correct(15)).toBe("Asia dan Lautan Pasifik");
    expect(correct(16)).toBe("Australia");
    expect(byId(16).question).toMatch(/paling mendatar/);
    expect(correct(20)).toBe("Artik berdekatan Kutub Utara; Selatan mengelilingi Antartika");
  });

  it("5.3: assesses all four textbook seas and straits by location", () => {
    expect(correct(19)).toBe("Lautan Pasifik");
    expect(byId(19).question).toMatch(/Laut China Selatan/);
    expect(correct(21)).toBe("Pulau Sumatera");
    expect(byId(21).question).toMatch(/Selat Melaka/);
    expect(correct(22)).toBe("Selat Tebrau");
    expect(correct(23)).toBe("Di barat daya Filipina, berhampiran Pulau Borneo");
    expect(byId(23).question).toMatch(/Laut Sulu/);
  });

  it("5.3: avoids superlatives the canonical notes do not back", () => {
    // The textbook calls Selat Melaka the longest strait; geo5-content.ts does not. The quiz
    // assesses its location instead of scoring the disputed superlative.
    expect(allText).not.toMatch(/terpanjang|paling panjang|terdalam|paling dalam di dunia/i);
    expect(allAsserted).not.toMatch(/Australia[^.]*(terkecil|paling kecil)/i);
  });

  it("5.4: plate movement, its three processes and all six effects", () => {
    expect(correct(24)).toBe("Arus perolakan di lapisan mantel");
    expect(allAsserted).toMatch(/pertembungan/i);
    expect(allAsserted).toMatch(/pencapahan/i);
    expect(allAsserted).toMatch(/sesaran/i);
    expect(correct(25)).toBe("Hanyutan benua");
    expect(byId(25).question).toMatch(/^Pencapahan plat/);
    expect(correct(26)).toBe("Gunung lipat");
    expect(byId(26).question).toMatch(/arah bertentangan/);
    expect(correct(17)).toBe("Gunung bongkah dan lurah gelinciran");
    expect(byId(17).question).toMatch(/Sesaran/);
    expect(correct(27)).toBe("Bertemu mantel lalu membentuk magma");
    expect(byId(27).explanation).toMatch(/zon benam/);
    expect(byId(27).explanation).toMatch(/rekahan/);
    expect(correct(28)).toBe("Gempa bumi");
    expect(correct(29)).toBe("Tsunami");
    expect(byId(29).explanation).toMatch(/gegaran di dasar laut/);
  });

  it("5.4: does not drift into Pangaea, Wegener, Richter or warning systems", () => {
    expect(allText).not.toMatch(
      /Pangaea|Wegener|Richter|episent|hiposent|amaran|juta tahun|vulkanisme|tektonik/i,
    );
  });

  it("keeps superlative recall from dominating the bank", () => {
    const superlativeStems = chapter5.filter((q) => /terbesar|terkecil|paling/i.test(q.question));
    expect(superlativeStems.length).toBeLessThanOrEqual(3);
  });
});

describe("Geografi Form 1 Bab 5 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter5)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter5.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter5.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter5.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter5) {
      const lengths = q.options.map(len);
      // Short names (a layer, an ocean) cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no throwaway distractors from outside the domain", () => {
    expect(allText).not.toMatch(
      /Sakarosa|Lombong|Paya Air Tawar|El Nino|Pemanasan Global|monsun|graviti bulan|azali|mikroorganisma|Petroleum|Stratosfera/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter5.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 5 difficulty and catalog", () => {
  it("keeps 15 Easy / 13 Medium / 2 Hard", () => {
    for (const q of chapter5) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter5.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      15, 13, 2,
    ]);
  });

  it("uses Hard for multi-step reasoning with taught facts", () => {
    // q18: two process-to-landform links must both be right.
    expect(correct(18)).toBe(
      "Proses itu membentuk gunung berapi; gunung bongkah terbentuk melalui sesaran",
    );
    expect(byId(18).question).toMatch(/terjunam ke dalam mantel/);
    // q30: one scenario, three systems; each distractor swaps in hidrosfera.
    expect(correct(30)).toBe("Litosfera, atmosfera dan biosfera");
    for (const option of byId(30).options) {
      if (option !== correct(30)) expect(option).toMatch(/hidrosfera/i);
    }
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 5",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 15,
      mediumCount: 13,
      hardCount: 2,
      maxXp: 1095,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 5', 'bm', 30, 15, 13, 2, true, 1095`,
    );
  });
});

describe("Geografi Form 1 Bab 5 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter5, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter5, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter5, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c5", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c5", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c6", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter5) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
