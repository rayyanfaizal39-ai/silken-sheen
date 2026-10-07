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

// Geografi Tingkatan 1 Bab 7 — Saliran di Malaysia (DSKP SK 2.3). The live bank is the `quizzes`
// export of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter7 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 7",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter7.find((q) => q.id === `geo-f1-c7-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter7.map((q) => text(num(q))).join("\n");
const EXPECTED_IDS = Array.from({ length: 30 }, (_, i) => `geo-f1-c7-q${i + 1}`);

// DSKP 2.3: 2.3.1 peringkat aliran sungai, 2.3.2 sungai dan tasik utama, 2.3.3 kepentingan.
const SECTION: Record<string, number[]> = {
  peringkatSungai: [1, 2, 4, 5, 6, 10, 11, 13, 24, 26, 27, 29],
  sungaiTasikUtama: [3, 7, 8, 9, 12, 14, 15, 19, 28],
  kepentingan: [16, 17, 18, 20, 21, 22, 23, 25, 30],
};
const HARD = [13, 29, 30];
const MEDIUM = [4, 5, 8, 9, 11, 14, 19, 21, 22, 24, 25, 26, 28];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");

describe("Geografi Form 1 Bab 7 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter7.map((q) => q.id)).toEqual(EXPECTED_IDS);
    expect(quizzes.filter((q) => q.id.startsWith("geo-f1-c7-")).map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 7").map((q) => q.id)).toEqual(
      EXPECTED_IDS,
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter7) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 7"]);
    }
    expect(new Set(chapter7.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, diagram or lettered river or lake", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|rajah \d|dilabel|berlabel|[Ss]ungai [A-Z]\b|[Tt]asik [A-Z]\b/,
    );
    for (const q of chapter7) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural textbook BM", () => {
    // "River Cruise" is the textbook's own name for the Sungai Melaka attraction.
    expect(allText).not.toMatch(/\b(the|which|meander|oxbow|wetlands?|houseboat|TODO|lorem)\b/i);
    expect(allText).not.toMatch(
      /\.\.\.\?|\?\?|sangat vital|arteri|syurga|ekosistem|krisis|migrasi|\bhub\b|lebuh raya/i,
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

describe("Geografi Form 1 Bab 7 textbook coverage", () => {
  it("gives river stages the largest share of the bank", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(SECTION.peringkatSungai.length).toBeGreaterThanOrEqual(11);
    expect(SECTION.sungaiTasikUtama.length).toBeGreaterThanOrEqual(8);
    expect(SECTION.kepentingan.length).toBeGreaterThanOrEqual(8);
  });

  it("2.3.1 hulu: lurah V, steep slopes, fast flow, jeram, air terjun and lubang periuk", () => {
    expect(correct(1)).toBe("Lurah V, cerun curam dan aliran deras");
    expect(correct(2)).toBe("Deras di hulu, perlahan dan berliku di hilir");
    expect(correct(4)).toBe("Pusaran air dan geseran batu kerikil");
    expect(byId(4).question).toMatch(/lubang periuk/);
    expect(correct(5)).toBe("Batuan keras dan lembut berselang-seli");
    expect(byId(5).question).toMatch(/jeram dan air terjun/);
  });

  it("2.3.1 tengah: lurah U, gentler slopes, hakisan mendatar and susuh bukit berpanca", () => {
    expect(correct(6)).toBe("Peringkat tengah");
    expect(byId(6).question).toMatch(/Susuh bukit berpanca/);
    expect(byId(6).explanation).toMatch(/lurah berbentuk U.*cerun semakin landai.*likuan/);
    expect(correct(11)).toBe("Hulu – hakisan menegak; tengah – hakisan mendatar");
  });

  it("2.3.1 hilir: deposition dominates, with likuan terpenggal, tasik ladam, tetambak and delta", () => {
    expect(correct(10)).toBe("Pemendapan");
    expect(byId(10).explanation).toMatch(/Hakisan menegak dominan di hulu/);
    expect(correct(27)).toBe("Tasik ladam, tetambak dan delta");
    expect(byId(27).explanation).toMatch(/likuan terpenggal/);
    expect(correct(13)).toBe("Q sahaja");
  });

  it("assesses the tasik ladam process, including its full sequence", () => {
    expect(byId(24).question).toMatch(/likuan terpenggal/);
    expect(correct(24)).toBe("Pemendapan menutup kedua-dua hujung likuan terpenggal");
    const sequence = byId(29).question;
    expect(sequence).toMatch(/P: Air memotong pangkal likuan semasa banjir/);
    expect(sequence).toMatch(/Q: Pemendapan menutup kedua-dua hujung likuan terpenggal/);
    expect(sequence).toMatch(/R: Likuan semakin melengkung/);
    expect(sequence).toMatch(/S: Hakisan berlaku di bahagian luar likuan/);
    expect(correct(29)).toBe("S → R → P → Q");
  });

  it("assesses delta formation at the river mouth", () => {
    expect(byId(26).question).toMatch(/delta.*muara/);
    expect(correct(26)).toBe("Aliran perlahan menyebabkan sedimen dimendapkan");
    expect(byId(26).explanation).toMatch(/dataran rendah yang luas/);
  });

  it("2.3.2: major rivers and lakes by location, not a run of record recall", () => {
    expect(correct(3)).toBe("Sungai Pahang");
    expect(correct(7)).toBe("Sungai Rajang (563 km)");
    expect(correct(8)).toBe("Sungai Rajang – Banjaran Iran");
    expect(byId(8).explanation).toMatch(/Gunung Liang Timur/);
    expect(correct(9)).toBe("Laut Sulu");
    expect(correct(19)).toBe("Sungai Bernam – Perak dan Selangor");
    expect(byId(19).explanation).toMatch(/Sungai Endau ialah sempadan antara Johor dan Pahang/);
    expect(correct(12)).toBe("Tasik Bera");
    expect(correct(14)).toBe("Tasik Bera, Tasik Chini dan Loagan Bunut");
    expect(correct(15)).toBe("Tasik Kenyir");
    expect(correct(28)).toBe("Tasik Temenggor – Perak");
    // Record-style stems stay limited.
    const records = chapter7.filter((q) => /terpanjang|terbesar/.test(q.question));
    expect(records.map(num)).toEqual([3, 7, 12, 15]);
  });

  it("drops the unsupported Sabah superlative and tributary trivia", () => {
    expect(allText).not.toMatch(/terpanjang di (negeri )?Sabah/i);
    expect(allText).not.toMatch(/Jelai|Tembeling|Kuala Tembeling/);
  });

  it("2.3.3: every textbook importance of rivers and lakes is assessed", () => {
    expect(correct(17)).toBe("Penjanaan kuasa hidroelektrik");
    expect(byId(17).question).toMatch(/Empangan Pelagus.*Empangan Kenering/);
    expect(correct(22)).toBe("Menanam padi dua kali setahun");
    expect(byId(22).question).toMatch(/Sungai Muda/);
    expect(correct(16)).toBe("Kegunaan domestik");
    expect(correct(18)).toBe("Thailand");
    expect(correct(20)).toBe("Pengangkutan dan perhubungan");
    expect(byId(20).question).toMatch(/Kapit/);
    expect(correct(23)).toBe("Rekreasi dan pelancongan");
    expect(correct(25)).toBe("Sukan air di Tasik Kenyir");
    expect(correct(21)).toBe("Ikan patin dan kelah dari sungai");
  });

  it("2.3.3: compares river and lake importance (membandingkan)", () => {
    expect(correct(30)).toBe(
      "Kedua-duanya menjana hidroelektrik; hanya sungai menjadi sempadan semula jadi",
    );
    expect(byId(30).explanation).toMatch(/Sungai dan tasik sama-sama/);
  });

  it("drops off-scope statistics, treaties, culture, wildlife and environmental management", () => {
    expect(allText).not.toMatch(/RAMSAR|tanah lembap|konvensyen/i);
    expect(allText).not.toMatch(/Orang Asli|legenda|naga|Jakun/i);
    expect(allText).not.toMatch(/90%|2,500 mm|Khatulistiwa/);
    expect(allText).not.toMatch(/rumah hijau|mesra alam|bahan api fosil/i);
    expect(allText).not.toMatch(/Bakun/);
    expect(allText).not.toMatch(/\bspan\b|limpahan banjir|menyerap air/i);
    expect(allText).not.toMatch(/loji|\bLRA\b|pencemaran|tercemar/i);
    expect(allText).not.toMatch(/akuakultur/i);
    expect(allText).not.toMatch(/warganegara|sivik|membuang sampah/i);
    expect(allText).not.toMatch(/pembalakan|kayu balak|Gajah|Monyet|Pygmy|biodiversiti/i);
    expect(allText).not.toMatch(/Titiwangsa|kelestarian/i);
  });
});

describe("Geografi Form 1 Bab 7 answer-cue control", () => {
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
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter7.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter7) {
      const lengths = q.options.map(len);
      // Short names (a river, a lake) cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("has no joke or out-of-domain distractors", () => {
    expect(allText).not.toMatch(
      /Kutub Utara|percuma|kapal terbang|ikan paus|lumba-lumba|nuklear|nitrogen|Salmon|\bKod\b|Vulkanisme|Meteorologi|garam|rumput laut|rumpai laut|Olimpik/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter7.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 7 difficulty and catalog", () => {
  it("keeps 14 Easy / 13 Medium / 3 Hard", () => {
    for (const q of chapter7) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter7.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      14, 13, 3,
    ]);
  });

  it("uses Hard only for multi-step river reasoning", () => {
    // q13: four landforms classified by stage; q29: four-step sequence; q30: two importance lists.
    expect(byId(13).question.match(/\([PQRS]\)/g)).toHaveLength(4);
    expect(byId(29).question.match(/\b[PQRS]:/g)).toHaveLength(4);
    expect(byId(30).options.every((o) => /^Kedua-duanya .+; hanya /.test(o))).toBe(true);
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 7",
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
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 7', 'bm', 30, 14, 13, 3, true, 1115`,
    );
  });
});

describe("Geografi Form 1 Bab 7 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter7, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter7, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter7, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c7", "attempt-1", a)!;
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot, "geography-f1-c7", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c8", a)).toBeNull();
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
