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
import { geo4Content } from "./geo4-content";

// Geografi Tingkatan 1 Bab 4 — Lakaran Peta Malaysia (DSKP SK 1.4). The live bank is the `quizzes`
// export of src/data/content.ts (the registry reads it); src/data/quizzes.ts holds a stale copy.
const chapter4 = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1" && q.chapter === "Chapter 4",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter4.find((q) => q.id === `geo-f1-c4-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter4.map((q) => text(num(q))).join("\n");
// What each question asserts as true: its stem, correct answer and explanation (not distractors).
const asserted = (n: number) => [byId(n).question, correct(n), byId(n).explanation].join(" ");

// Primary focus of every question: A negeri/WP, B lokasi, C ibu negeri, D KL/Putrajaya/Labuan,
// E lakaran peta.
const SECTION: Record<string, number[]> = {
  negeriWp: [3, 4, 5, 7],
  lokasi: [1, 2, 6, 9, 10, 12, 28],
  ibuNegeri: [11, 13, 14, 16, 17, 18, 19, 20, 21],
  peranan: [8, 15, 30],
  lakaran: [22, 23, 24, 25, 26, 27, 29],
};
const HARD = [29];
const MEDIUM = [5, 11, 12, 13, 19, 20, 23, 24, 25, 27, 28];
const tierOf = (n: number) => (HARD.includes(n) ? "hard" : MEDIUM.includes(n) ? "medium" : "easy");
const CAPITALS = Object.fromEntries(geo4Content.stateCapitals.map((s) => [s.state, s.capital]));

describe("Geografi Form 1 Bab 4 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each, served by the registry", () => {
    expect(chapter4).toHaveLength(30);
    expect(chapter4.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `geo-f1-c4-q${i + 1}`).sort(),
    );
    expect(getChapterQuizQuestions("geography", "Form 1", "Chapter 4").map((q) => q.id)).toEqual(
      chapter4.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter4) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
      expect([q.subjectId, q.form, q.chapter]).toEqual(["geography", "Form 1", "Chapter 4"]);
    }
    expect(new Set(chapter4.map((q) => q.question)).size).toBe(30);
  });

  it("is self-contained: no unseen map, outline, shading or lettered region", () => {
    expect(allText).not.toMatch(
      /(peta|rajah|gambar) (di atas|berikut|ini)|berdasarkan (peta|rajah|gambar)|berlorek|dilorek|garis luar|kawasan [A-Z]\b|(ditanda|dilabel|berlabel) [A-Z]\b/i,
    );
    for (const q of chapter4) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|figure/i.test(k)),
        q.id,
      ).toEqual([]);
    }
  });

  it("uses natural BM without leftover English or placeholder text", () => {
    expect(allText).not.toMatch(
      /\b(the|which|state|capital|map|administrative|centre|offshore|TODO|lorem)\b/i,
    );
    expect(allText).not.toMatch(/\.\.\.\?|\?\?|\//);
    expect(allText).not.toMatch(/George Town/);
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

describe("Geografi Form 1 Bab 4 textbook coverage", () => {
  it("assigns every question to one of the five focus areas", () => {
    expect(
      Object.values(SECTION)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    for (const ids of Object.values(SECTION)) expect(ids.length).toBeGreaterThanOrEqual(3);
  });

  it("Malaysia has 13 states and 3 Federal Territories: Kuala Lumpur, Putrajaya, Labuan", () => {
    expect(correct(1)).toBe("Asia Tenggara");
    expect(correct(3)).toBe("13 negeri dan 3 Wilayah Persekutuan");
    expect(byId(3).explanation).toBe(
      "Malaysia terdiri daripada 13 buah negeri dan 3 Wilayah Persekutuan, iaitu Kuala Lumpur, Putrajaya dan Labuan.",
    );
    expect(correct(4)).toBe("Kuala Lumpur, Putrajaya dan Labuan");
    expect(correct(7)).toBe("11 buah");
    expect(correct(25)).toBe("Tiga Wilayah Persekutuan");
  });

  it("Kuala Lumpur is the ibu negara and Putrajaya the Pusat Pentadbiran Kerajaan Persekutuan", () => {
    expect(correct(30)).toBe("Kuala Lumpur");
    expect(correct(15)).toBe("Putrajaya");
    expect(correct(16)).toBe("Putrajaya");
    for (let n = 1; n <= 30; n += 1) {
      const said = asserted(n);
      expect(said, `q${n}`).not.toMatch(/Putrajaya (ialah|sebagai|menjadi) ibu negara/i);
      expect(said, `q${n}`).not.toMatch(
        /Kuala Lumpur (ialah|sebagai) (ibu negeri|Pusat Pentadbiran)/i,
      );
    }
    expect(allText).not.toMatch(/ibu negeri Malaysia/i);
  });

  it("Labuan is a Federal Territory on Pulau Borneo, never a state", () => {
    expect(correct(5)).toBe("Labuan");
    expect(correct(8)).toBe("Labuan");
    for (let n = 1; n <= 30; n += 1) {
      expect(asserted(n), `q${n}`).not.toMatch(/Labuan (ialah|sebagai) (sebuah )?negeri/i);
      expect(asserted(n), `q${n}`).not.toMatch(/(Sabah|Sarawak) ialah Wilayah Persekutuan/i);
    }
    expect(byId(8).explanation).toMatch(/Kuala Lumpur dan Putrajaya terletak di Semenanjung/);
  });

  it("places Sabah and Sarawak on Pulau Borneo and the Peninsula's neighbours correctly", () => {
    expect(correct(6)).toBe("Sarawak");
    expect(correct(27)).toBe("Sabah dan Sarawak");
    expect(correct(2)).toBe("Laut China Selatan");
    expect(correct(9)).toBe("Thailand di utara, Singapura di selatan");
    expect(correct(10)).toBe("Johor");
    expect(correct(12)).toBe("Terengganu dan Kelantan");
    expect(correct(23)).toBe("Di sebelah barat");
    expect(correct(28)).toBe("Brunei Darussalam dan Kalimantan");
    expect(byId(28).explanation).toMatch(/Kalimantan \(Indonesia\)/);
    for (const q of chapter4) {
      expect(q.options[q.answerIndex], q.id).not.toMatch(/Thailand di selatan|Singapura di utara/);
    }
  });

  it("every state-capital pair the bank asserts matches the textbook", () => {
    const states = Object.keys(CAPITALS).sort((a, b) => b.length - a.length);
    const capitals = Object.values(CAPITALS).sort((a, b) => b.length - a.length);
    const end = String.raw`(?=[.,;]| manakala| dan |$)`;
    // [regex, group holding the state, group holding the capital]
    const patterns: [RegExp, number, number][] = [
      [
        new RegExp(
          String.raw`[Ii]bu negeri (?:bagi )?([A-Z][\w ]*?) (?:pula )?ialah ([A-Z][\w ]*?)${end}`,
          "g",
        ),
        1,
        2,
      ],
      [
        new RegExp(
          String.raw`([A-Z][\w ]*?) (?:ialah )?ibu negeri (?:bagi )?([A-Z][\w ]*?)${end}`,
          "g",
        ),
        2,
        1,
      ],
      [new RegExp(String.raw`([A-Z][\w ]*?) – ([A-Z][\w ]*?)${end}`, "g"), 1, 2],
    ];
    let checked = 0;
    for (let n = 1; n <= 30; n += 1) {
      for (const [pattern, s, c] of patterns) {
        for (const m of asserted(n).matchAll(pattern)) {
          const state = states.find((x) => m[s].endsWith(x));
          const capital = capitals.find((x) => m[c].endsWith(x));
          if (!state || !capital) continue;
          expect(capital, `q${n}: ${m[0]}`).toBe(CAPITALS[state]);
          checked += 1;
        }
      }
    }
    // Guards against the parser silently matching nothing.
    expect(checked).toBeGreaterThanOrEqual(15);
  });

  it("represents all 13 state-capital pairs somewhere in the bank", () => {
    expect(Object.keys(CAPITALS)).toHaveLength(13);
    for (const [state, capital] of Object.entries(CAPITALS)) {
      const pairedIn = chapter4.filter((q) => {
        const said = asserted(num(q));
        return said.includes(state) && said.includes(capital);
      });
      expect(pairedIn.length, `${state} – ${capital}`).toBeGreaterThanOrEqual(1);
    }
    expect(correct(11)).toBe("Shah Alam");
    expect(correct(14)).toBe("Georgetown");
    expect(correct(17)).toBe("Alor Setar dan Kangar");
    expect(correct(18)).toBe("Perak dan Selangor");
    expect(correct(19)).toBe("Kuantan, Kuala Terengganu dan Kota Bharu");
    expect(correct(20)).toBe("Sarawak – Kuching");
    expect(correct(13)).toBe("Negeri Sembilan – Seremban");
  });

  it("assesses capitals through varied formats, not a run of identical recall stems", () => {
    const singleRecall = chapter4.filter((q) =>
      /^Apakah ibu negeri [A-Z][\w ]*\?$/.test(q.question),
    );
    expect(singleRecall.map(num)).toEqual([14]);
    const capitalFocused = chapter4.filter((q) =>
      /ibu negeri|padanan|Pasangan manakah/i.test(q.question),
    );
    expect(capitalFocused.length).toBeLessThanOrEqual(12);
    // Error diagnosis, matching, odd-one-out and ordered pairs all appear.
    expect(byId(11).question).toMatch(/Seorang murid menulis/);
    expect(byId(16).question).toMatch(/tidak berfungsi sebagai ibu negeri/);
    expect(byId(19).question).toMatch(/mengikut susunan/);
  });

  it("assesses the sketching prerequisites without pretending to replace the drawing task", () => {
    expect(correct(22)).toMatch(/^Peta sebenar/);
    expect(correct(24)).toBe("Kedudukan ibu negeri");
    expect(correct(26)).toBe("Tajuk, arah Utara, petunjuk dan pemidang");
    for (const element of ["Tajuk", "Arah Utara", "Petunjuk", "Pemidang"]) {
      expect(correct(26).toLowerCase()).toContain(element.toLowerCase());
    }
    // Map-style trivia from the old bank (font case, drawing direction) stays out.
    expect(allText).not.toMatch(/huruf besar|utara (membawa|turun) ke selatan|bingkai/i);
  });

  it("stays inside SK 1.4: no royal towns, dates, history, flags, rulers or state trivia", () => {
    expect(allText).not.toMatch(
      /bandar diraja|\b(Arau|Kuala Kangsar|Klang|Pekan|Seri Menanti|Muar|Bandar Maharani|Anak Bukit|Kubang Kerian)\b/i,
    );
    expect(allText).not.toMatch(
      /\b1[89]\d\d\b|\b20\d\d\b|MA63|Perjanjian Malaysia|merdeka|ditubuhkan|dipindahkan/i,
    );
    expect(allText).not.toMatch(
      /\b(bendera|sultan|raja|Yang di-Pertua|Menteri Besar|Ketua Menteri)\b/i,
    );
    expect(allText).not.toMatch(
      /keluasan|(paling|yang) (kecil|besar)|jelapang|bijih timah|\badat\b|kepadatan|penduduk|kewangan|Gunung Kinabalu|pelancong|perindustrian|Seberang Perai/i,
    );
  });
});

describe("Geografi Form 1 Bab 4 answer-cue control", () => {
  const len = (s: string) => s.length;
  const others = (q: (typeof chapter4)[number]) =>
    q.options.filter((_, i) => i !== q.answerIndex).map(len);

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter4.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)) * 1.25,
    );
    // q2 keeps the textbook water bodies; "Laut China Selatan" is simply a longer name.
    expect(clearlyLongest.map((q) => q.id)).toEqual(["geo-f1-c4-q2"]);
    expect(byId(2).options).toEqual([
      "Selat Melaka",
      "Selat Tebrau",
      "Laut Sulu",
      "Laut China Selatan",
    ]);
    const strictlyLongest = chapter4.filter(
      (q) => len(q.options[q.answerIndex]) > Math.max(...others(q)),
    );
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("does not reward picking the shortest or the most detailed option either", () => {
    const strictlyShortest = chapter4.filter(
      (q) => len(q.options[q.answerIndex]) < Math.min(...others(q)),
    );
    expect(strictlyShortest.length).toBeLessThanOrEqual(10);
    for (const q of chapter4) {
      const lengths = q.options.map(len);
      // Place names cannot be balanced by length.
      if (Math.min(...lengths) < 12) continue;
      expect(Math.max(...lengths) / Math.min(...lengths), q.id).toBeLessThanOrEqual(1.7);
    }
  });

  it("uses distractors from the same Malaysian administrative domain", () => {
    expect(allText).not.toMatch(
      /Tokyo|London|New York|Asia Barat Daya|padi huma|automotif|ramalan cuaca|kelajuan kenderaan|memadam|harga peta|nama pelukis|haiwan/i,
    );
  });

  it("avoids a recurring stored answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter4.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(10);
    expect(Math.min(...slots)).toBeGreaterThanOrEqual(5);
  });
});

describe("Geografi Form 1 Bab 4 difficulty and catalog", () => {
  it("keeps 18 Easy / 11 Medium / 1 Hard", () => {
    for (const q of chapter4) {
      expect(normalizeQuizDifficulty(q.difficulty), q.id).toBe(tierOf(num(q)));
    }
    const count = (t: string) =>
      chapter4.filter((q) => normalizeQuizDifficulty(q.difficulty) === t);
    expect([count("easy").length, count("medium").length, count("hard").length]).toEqual([
      18, 11, 1,
    ]);
  });

  it("uses the sole Hard question to diagnose labels by category, role and location", () => {
    const hard = byId(29);
    for (const label of ["Shah Alam", "Kuala Lumpur", "Putrajaya", "Labuan", "Pulau Borneo"]) {
      expect(hard.question).toContain(label);
    }
    expect(correct(29)).toBe("S sahaja");
    expect(hard.explanation).toMatch(/Labuan ialah Wilayah Persekutuan, bukan negeri/);
    // Wrong options each correspond to a real confusion (Selangor/KL, KL/Putrajaya roles).
    expect(hard.options).toEqual(expect.arrayContaining(["P sahaja", "Q dan R", "R dan S"]));
  });

  it("matches the server catalog rows and the seeded SQL", () => {
    const key = (difficulty: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "geography",
        form: "Form 1",
        chapterKey: "Chapter 4",
        lang: "bm",
        set: "default",
        difficulty: difficulty as "All",
      });
    const catalog = buildQuizCatalog().quizzes;
    expect(catalog.find((q) => q.quizKey === key("All"))).toMatchObject({
      totalQuestions: 30,
      easyCount: 18,
      mediumCount: 11,
      hardCount: 1,
      maxXp: 1055,
    });
    const seed = readFileSync(
      new URL(
        "../../../../../supabase/migrations/20260924154253_seed_quiz_catalog.sql",
        import.meta.url,
      ),
      "utf8",
    );
    expect(seed).toContain(
      `'${key("All")}', 'standard', 'standard', 'geography', 1, 'Chapter 4', 'bm', 30, 18, 11, 1, true, 1055`,
    );
  });
});

describe("Geografi Form 1 Bab 4 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const scope = { subjectId: "geography", form: "Form 1" };

  it("mixes the full pool across tiers instead of Easy, Medium, Hard blocks", () => {
    const rank = { easy: 0, medium: 1, hard: 2 } as const;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { questions, issues } = orderRegularQuizQuestions(chapter4, scope, seeded(seed));
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
    const a = orderRegularQuizQuestions(chapter4, scope, seeded(1)).questions;
    const b = orderRegularQuizQuestions(chapter4, scope, seeded(2)).questions;
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const snapshot = createAttemptSnapshot("geography-f1-c4", "attempt-1", a)!;
    expect(restoreAttemptOrder(snapshot, "geography-f1-c4", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "geography-f1-c5", a)).toBeNull();
  });

  it("keeps the correct answer attached to its text after option shuffling", () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      for (const q of chapter4) {
        const shuffled = shuffleQuestionOptions(q, seeded(seed * 31 + num(q)));
        expect(shuffled.options[shuffled.answerIndex], `${q.id} seed ${seed}`).toBe(
          q.options[q.answerIndex],
        );
        expect([...shuffled.options].sort()).toEqual([...q.options].sort());
      }
    }
  });
});
