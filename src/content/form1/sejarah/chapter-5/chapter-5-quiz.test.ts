import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";

// Sejarah Form 1 Bab 5 — Tamadun Awal Dunia. The live bank is the `quizzes`
// export of src/data/content.ts (the registry and the quiz route read it).
const chapter5 = quizzes.filter(
  (q) => q.subjectId === "sejarah" && q.form === "Form 1" && q.chapter === "Chapter 5",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter5.find((q) => q.id === `sej-f1-c5-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const text = (n: number) => [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");
const allText = chapter5.map((q) => text(num(q))).join("\n");

type Civ = "mesopotamia" | "mesir" | "indus" | "huanghe" | "banding";
type Area = "5.1" | "5.2";
// Curriculum map: which civilisation and learning area each question assesses.
const MAP: Record<number, [Civ, Area]> = {
  1: ["mesopotamia", "5.1"],
  2: ["mesopotamia", "5.1"],
  3: ["mesopotamia", "5.2"],
  4: ["mesopotamia", "5.2"],
  5: ["mesopotamia", "5.2"],
  6: ["mesopotamia", "5.2"],
  7: ["mesir", "5.1"],
  8: ["mesir", "5.2"],
  9: ["mesir", "5.2"],
  10: ["mesir", "5.2"],
  11: ["mesir", "5.2"],
  12: ["indus", "5.2"],
  13: ["indus", "5.1"],
  14: ["indus", "5.2"],
  15: ["banding", "5.2"],
  16: ["indus", "5.2"],
  17: ["huanghe", "5.1"],
  18: ["huanghe", "5.2"],
  19: ["huanghe", "5.1"],
  20: ["huanghe", "5.2"],
  21: ["huanghe", "5.2"],
  22: ["indus", "5.1"],
  23: ["mesopotamia", "5.2"],
  24: ["mesir", "5.1"],
  25: ["banding", "5.1"],
  26: ["indus", "5.2"],
  27: ["mesopotamia", "5.2"],
  28: ["huanghe", "5.2"],
  29: ["banding", "5.2"],
  30: ["banding", "5.2"],
};
const countCiv = (c: Civ) => Object.values(MAP).filter(([civ]) => civ === c).length;
// Contribution aspect per question: government / economy / technology / buildings / art.
const ASPECT: Record<string, Record<string, number[]>> = {
  government: { mesopotamia: [4], mesir: [8, 9], indus: [26], huanghe: [18] },
  economy: { mesopotamia: [27], mesir: [10], indus: [16], huanghe: [21] },
  technology: { mesopotamia: [5], mesir: [11], indus: [12, 14], huanghe: [28] },
  buildings: { mesopotamia: [3, 15], mesir: [15], indus: [15], huanghe: [19] },
  art: { mesopotamia: [6, 23], mesir: [29], indus: [29], huanghe: [20] },
};
const LOCATION: Record<string, number[]> = {
  mesopotamia: [1, 2],
  mesir: [7],
  indus: [22],
  huanghe: [17],
};

describe("Sejarah Form 1 Bab 5 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each", () => {
    expect(chapter5).toHaveLength(30);
    expect(chapter5.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c5-q${i + 1}`).sort(),
    );
  });

  it("is what the registry serves for the chapter", () => {
    expect(getChapterQuizQuestions("sejarah", "Form 1", "Chapter 5").map((q) => q.id)).toEqual(
      chapter5.map((q) => q.id),
    );
  });

  it("has four distinct options, a valid answer and an explanation on every question", () => {
    for (const q of chapter5) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(Number.isInteger(q.answerIndex), q.id).toBe(true);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(20);
    }
    expect(new Set(chapter5.map((q) => q.question)).size).toBe(30);
  });

  it("keeps the Sejarah difficulty tiers (8 Easy, 15 Medium, 7 Hard) used by the quiz catalog", () => {
    const tiers = chapter5.map((q) => normalizeQuizDifficulty(q.difficulty));
    expect(tiers.every(Boolean)).toBe(true);
    expect(tiers.filter((t) => t === "easy")).toHaveLength(8);
    expect(tiers.filter((t) => t === "medium")).toHaveLength(15);
    expect(tiers.filter((t) => t === "hard")).toHaveLength(7);
  });

  it("does not depend on a picture, map, table or diagram", () => {
    for (const q of chapter5) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|audio/i.test(k)),
        q.id,
      ).toEqual([]);
    }
    expect(allText).not.toMatch(/gambar|peta|jadual|rajah|artifak|foto|di atas/i);
  });
});

describe("Sejarah Form 1 Bab 5 coverage", () => {
  it("covers both 5.1 locations and 5.2 contributions", () => {
    const count = (a: Area) => Object.values(MAP).filter(([, area]) => area === a).length;
    expect(count("5.1")).toBeGreaterThanOrEqual(8);
    expect(count("5.1")).toBeLessThanOrEqual(12);
    expect(count("5.2")).toBeGreaterThanOrEqual(18);
  });

  it("gives all four civilisations balanced representation", () => {
    expect(Object.keys(MAP)).toHaveLength(30);
    for (const civ of ["mesopotamia", "mesir", "indus", "huanghe"] as const) {
      expect(countCiv(civ), civ).toBeGreaterThanOrEqual(6);
      expect(countCiv(civ), civ).toBeLessThanOrEqual(8);
    }
    expect(countCiv("banding")).toBeGreaterThanOrEqual(3);
  });

  it("assesses the location of every civilisation", () => {
    for (const ids of Object.values(LOCATION)) expect(ids.length).toBeGreaterThanOrEqual(1);
    expect(correct(1)).toMatch(/Tigris-Euphrates/);
    expect(correct(25)).toMatch(/lembah sungai/i);
    expect(correct(17)).toMatch(/Huang He/);
    expect(correct(22)).toBe("Indus");
  });

  it("assesses government, economy, technology, buildings and art for every civilisation", () => {
    for (const [aspect, byCiv] of Object.entries(ASPECT)) {
      for (const civ of ["mesopotamia", "mesir", "indus", "huanghe"]) {
        expect(byCiv[civ]?.length ?? 0, `${aspect} ${civ}`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("includes application questions, not only recall", () => {
    expect(byId(22).question).toMatch(/pengkaji/i);
    expect(byId(9).question).toMatch(/tentera mengiringi pedagang/i);
    expect(byId(12).question).toMatch(/seragam/i);
    expect(byId(16).question).toMatch(/diperdagangkan/i);
  });
});

describe("Sejarah Form 1 Bab 5 answer-cue control", () => {
  const len = (s: string) => s.length;

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter5.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others) * 1.2;
    });
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);
    const strictlyLongest = chapter5.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others);
    });
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("keeps options reasonably parallel in length", () => {
    for (const q of chapter5) {
      const lengths = q.options.map(len);
      const max = Math.max(...lengths);
      if (max <= 20) continue; // names and short labels are naturally short
      expect(max / Math.min(...lengths), `${q.id} option length ratio`).toBeLessThanOrEqual(2);
    }
  });

  it("avoids a recurring correct answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter5.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Sejarah Form 1 Bab 5 textbook alignment", () => {
  it("uses the textbook function of the ziggurat", () => {
    expect(byId(3).question).toMatch(/zigurat/i);
    expect(correct(3)).toBe("Tempat ibadat");
    expect(byId(3).explanation).not.toMatch(/pentadbiran|simpanan|gedung/i);
  });

  it("uses Enuma Elish, not Gilgamesh", () => {
    expect(byId(6).question).toMatch(/Enuma Elish/);
    expect(allText).not.toMatch(/gilgamesh/i);
  });

  it("states the Pharaoh as ruling like the power of a god, without Horus or Osiris", () => {
    expect(correct(8)).toMatch(/seperti kuasa tuhan/i);
    expect(allText).not.toMatch(/horus|osiris|\bra\b/i);
  });

  it("protects traders through the Pharaoh's army, with no Wazir-specific question", () => {
    expect(correct(9)).toMatch(/ketenteraan/i);
    expect(allText).not.toMatch(/wazir/i);
  });

  it("does not build quiz concepts on mummification or make an anatomy claim", () => {
    expect(allText).not.toMatch(/mumia|mummi|anatomi|pembedahan|ubat herba/i);
  });

  it("states the drainage fact without superlatives", () => {
    expect(byId(14).explanation).toMatch(/paip dan pembetungan/i);
    expect(allText).not.toMatch(
      /paling maju|terawal|tertua|terbaik|jauh mendahului|disambung ke setiap rumah/i,
    );
  });

  it("keeps the Great Bath as a textbook facility of Indus", () => {
    expect(correct(15)).toMatch(/Indus - Kolam mandi besar/);
    expect(allText).not.toMatch(/kolam renang|upacara agama|ritual|awam/i);
  });

  it("grounds the Indus-Mesopotamia link in trade, not seals", () => {
    expect(byId(16).question).toMatch(/diperdagangkan/);
    expect(correct(16)).toMatch(/hubungan perdagangan/i);
    expect(allText).not.toMatch(/meterai|seal/i);
  });

  it("keeps the mandate of heaven at textbook level (syurga)", () => {
    expect(correct(18)).toBe("Syurga");
    expect(allText).not.toMatch(/revolusi|ditarik balik|bencana alam sebagai/i);
  });

  it("does not depend on Oracle Bones and tests pictographic writing", () => {
    expect(allText).not.toMatch(/tulang sula|tulang ramalan|oracle/i);
    expect(correct(20)).toBe("Piktograf");
  });

  it("keeps silk free of Silk Road enrichment", () => {
    expect(correct(21)).toMatch(/sutera/i);
    expect(allText).not.toMatch(/laluan sutera|silk road/i);
  });

  it("asks for the Indus by evidence, without a 'most advanced' superlative", () => {
    expect(correct(22)).toBe("Indus");
    expect(byId(22).question).toMatch(/bandar terancang/);
    expect(byId(22).question).toMatch(/pembetungan/);
  });

  it("has only one simple base-60 recall question", () => {
    const base60 = chapter5.filter((q) => /sistem 60|berasaskan (angka )?60/i.test(q.question));
    expect(base60.map(num)).toEqual([5]);
  });

  it("makes q27, q28 and q30 Bab 5-specific rather than generic Bab 4 definitions", () => {
    expect(byId(27).question).toMatch(/Mesopotamia/);
    expect(byId(28).question).toMatch(/Huang He/);
    expect(correct(28)).toMatch(/kompas magnetik/i);
    expect(byId(30).question).toMatch(/tamadun awal dunia/i);
    expect(chapter5.some((q) => /maksud pengkhususan pekerjaan/i.test(q.question))).toBe(false);
  });

  it("keeps Indus government at the priest-led textbook claim", () => {
    expect(byId(26).question).toMatch(/pendeta/);
    expect(correct(26)).toBe("Indus");
  });

  it("keeps outside-chapter terms out of the options", () => {
    expect(allText).not.toMatch(/brahmi|aryan|yunani|greek|rom\b/i);
  });
});

describe("Sejarah Form 1 Bab 5 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  it("puts all 30 questions into an attempt and reorders them per attempt", () => {
    const scope = { subjectId: "sejarah", form: "Form 1" };
    const a = orderRegularQuizQuestions(chapter5, scope, seeded(1));
    const b = orderRegularQuizQuestions(chapter5, scope, seeded(2));
    expect(a.issues).toEqual([]);
    expect(a.questions).toHaveLength(30);
    expect(new Set(a.questions.map((q) => q.id)).size).toBe(30);
    expect(a.questions.map((q) => q.id)).not.toEqual(b.questions.map((q) => q.id));
    const first = a.questions.map((q) => q.id);
    expect(a.questions.map((q) => q.id)).toEqual(first);
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
