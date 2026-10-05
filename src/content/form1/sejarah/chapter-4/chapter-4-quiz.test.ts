import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes } from "@/data/content";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";

// Sejarah Form 1 Bab 4 — Mengenali Tamadun. The live bank is the `quizzes`
// export of src/data/content.ts (the registry and the quiz route read it).
const chapter4 = quizzes.filter(
  (q) => q.subjectId === "sejarah" && q.form === "Form 1" && q.chapter === "Chapter 4",
);
const num = (q: { id: string }) => Number(q.id.match(/q(\d+)$/)![1]);
const byId = (n: number) => chapter4.find((q) => q.id === `sej-f1-c4-q${n}`)!;
const correct = (n: number) => byId(n).options[byId(n).answerIndex];
const allText = (n: number) =>
  [byId(n).question, ...byId(n).options, byId(n).explanation].join(" ");

// Textbook section / official characteristic per question (curriculum map).
const SECTION: Record<number, "4.1" | "4.2" | "4.3"> = {
  1: "4.1",
  2: "4.1",
  17: "4.1",
  19: "4.1",
  24: "4.1",
  26: "4.1",
  30: "4.1",
  5: "4.2",
  6: "4.2",
  7: "4.2",
  8: "4.2",
  23: "4.2",
  28: "4.2",
  3: "4.3",
  4: "4.3",
  9: "4.3",
  10: "4.3",
  11: "4.3",
  12: "4.3",
  13: "4.3",
  14: "4.3",
  15: "4.3",
  16: "4.3",
  18: "4.3",
  20: "4.3",
  21: "4.3",
  22: "4.3",
  25: "4.3",
  27: "4.3",
  29: "4.3",
};
const CHARACTERISTIC: Record<string, number[]> = {
  "pertanian dan perdagangan": [3, 9],
  "sistem pemerintahan": [4, 11, 25],
  "pembentukan bandar": [10],
  "pengkhususan pekerjaan": [12, 29],
  teknologi: [13, 20],
  "organisasi sosial": [14, 15],
  "agama dan kepercayaan": [16, 27],
  "tulisan dan penyimpanan rekod": [18, 22],
  "kesenian dan kesusasteraan": [21],
};

describe("Sejarah Form 1 Bab 4 quiz bank integrity", () => {
  it("has exactly 30 questions with ids q1-q30 once each", () => {
    expect(chapter4).toHaveLength(30);
    expect(chapter4.map((q) => q.id).sort()).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c4-q${i + 1}`).sort(),
    );
  });

  it("is what the registry serves for the chapter", () => {
    const served = getChapterQuizQuestions("sejarah", "Form 1", "Chapter 4");
    expect(served.map((q) => q.id)).toEqual(chapter4.map((q) => q.id));
  });

  it("keeps four distinct options, a valid answer and text on every question", () => {
    for (const q of chapter4) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(4);
      expect(Number.isInteger(q.answerIndex), q.id).toBe(true);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect(q.question.trim().length, q.id).toBeGreaterThan(10);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(20);
    }
    expect(new Set(chapter4.map((q) => q.question)).size).toBe(30);
  });

  it("keeps the Sejarah difficulty tiers (8 Easy, 15 Medium, 7 Hard) used by the quiz catalog", () => {
    const tiers = chapter4.map((q) => normalizeQuizDifficulty(q.difficulty));
    expect(tiers.every(Boolean)).toBe(true);
    expect(tiers.filter((t) => t === "easy")).toHaveLength(8);
    expect(tiers.filter((t) => t === "medium")).toHaveLength(15);
    expect(tiers.filter((t) => t === "hard")).toHaveLength(7);
  });

  it("has no image or media dependency", () => {
    for (const q of chapter4) {
      expect(
        Object.keys(q).filter((k) => /image|img|media|video|audio/i.test(k)),
        q.id,
      ).toEqual([]);
      expect(allText(num(q)), q.id).not.toMatch(
        /\.(png|jpe?g|svg|webp)|gambar rajah di atas|lihat gambar/i,
      );
    }
  });

  it("covers sections 4.1, 4.2 and 4.3 in roughly 7 / 6 / 17", () => {
    expect(Object.keys(SECTION)).toHaveLength(30);
    const count = (s: string) => Object.values(SECTION).filter((v) => v === s).length;
    expect(count("4.1")).toBeGreaterThanOrEqual(6);
    expect(count("4.2")).toBeGreaterThanOrEqual(5);
    expect(count("4.3")).toBeGreaterThanOrEqual(16);
    expect(count("4.3")).toBeLessThanOrEqual(18);
  });

  it("covers all nine characteristics of early civilisations", () => {
    expect(Object.keys(CHARACTERISTIC)).toHaveLength(9);
    for (const [name, ids] of Object.entries(CHARACTERISTIC)) {
      expect(ids.length, name).toBeGreaterThanOrEqual(1);
      for (const id of ids) expect(SECTION[id], `${name} q${id}`).toBe("4.3");
    }
    expect(CHARACTERISTIC["pertanian dan perdagangan"].length).toBeGreaterThanOrEqual(2);
    expect(CHARACTERISTIC["tulisan dan penyimpanan rekod"].length).toBeGreaterThanOrEqual(2);
  });
});

describe("Sejarah Form 1 Bab 4 answer-cue control", () => {
  const len = (s: string) => s.length;

  it("does not reward picking the longest option", () => {
    const clearlyLongest = chapter4.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others) * 1.2;
    });
    expect(clearlyLongest.map((q) => q.id)).toEqual([]);

    const strictlyLongest = chapter4.filter((q) => {
      const others = q.options.filter((_, i) => i !== q.answerIndex).map(len);
      return len(q.options[q.answerIndex]) > Math.max(...others);
    });
    // Chance level is 25%; stay well under half the bank.
    expect(strictlyLongest.length).toBeLessThanOrEqual(10);
  });

  it("keeps distractors reasonably parallel in length", () => {
    for (const q of chapter4) {
      const lengths = q.options.map(len);
      const min = Math.min(...lengths);
      const max = Math.max(...lengths);
      // Single-word-pair options (names of groups) are naturally short.
      if (max <= 20) continue;
      expect(max / min, `${q.id} option length ratio`).toBeLessThanOrEqual(2.2);
    }
  });

  it("avoids a recurring correct answer slot", () => {
    const slots = [0, 1, 2, 3].map((s) => chapter4.filter((q) => q.answerIndex === s).length);
    expect(Math.max(...slots)).toBeLessThanOrEqual(12);
  });
});

describe("Sejarah Form 1 Bab 4 textbook alignment", () => {
  it("never presents Mudun/Madain/Madana as a single-word 'Madana' definition", () => {
    expect(chapter4.some((q) => /maksud\s+'?madana/i.test(q.question))).toBe(false);
    expect(byId(17).question).toMatch(/mudun, madain dan madana/i);
    expect(correct(17)).toMatch(/budi bahasa/i);
    expect(correct(17)).toMatch(/pembukaan bandar/i);
    expect(
      chapter4.some((q) => q.options.includes("Pembukaan bandar dan luhur budi pekerti")),
    ).toBe(false);
  });

  it("states Toynbee's concept with politics, economy, society, arts and culture only", () => {
    expect(byId(8).question).toMatch(/Toynbee/);
    expect(correct(8)).toMatch(/politik/i);
    expect(correct(8)).toMatch(/ekonomi/i);
    expect(correct(8)).toMatch(/sosial/i);
    expect(correct(8)).toMatch(/kesenian/i);
    expect(correct(8)).toMatch(/kebudayaan/i);
    expect(allText(8)).not.toMatch(/sains/i);
  });

  it("does not call the king an absolute ruler", () => {
    for (const q of chapter4) {
      expect(allText(num(q))).not.toMatch(/berkuasa mutlak|kuasa mutlak/i);
    }
    expect(correct(11)).toMatch(/pendeta memimpin/i);
    expect(correct(11)).toMatch(/raja mengambil alih/i);
    expect(correct(25)).toMatch(/bangsawan/i);
    expect(correct(25)).toMatch(/pendeta/i);
  });

  it("explains slaves with the textbook categories, not debt", () => {
    expect(correct(15)).toBe("Hamba");
    expect(byId(15).explanation).toMatch(/hamba perang/i);
    expect(byId(15).explanation).toMatch(/dijual/i);
    expect(chapter4.some((q) => /hutang/i.test(allText(num(q))))).toBe(false);
  });

  it("tests the idea of many gods without the unlisted term 'politeisme'", () => {
    expect(correct(16)).toMatch(/banyak tuhan/i);
    expect(chapter4.some((q) => /politeisme/i.test(allText(num(q))))).toBe(false);
  });

  it("keeps Bab 5 civilisation-specific trivia out of Bab 4", () => {
    const bab5 =
      /ziggurat|piramid|pyramid|hieroglif|sfinks|hammurabi|kod hammurabi|mohenjo|harappa|tigris|euphrates|mesopotamia|firaun/i;
    for (const q of chapter4) {
      expect(allText(num(q)), q.id).not.toMatch(bab5);
    }
  });

  it("tests writing as a generic Bab 4 characteristic", () => {
    expect(correct(18)).toMatch(/rekod/i);
    expect(byId(22).question).toMatch(/piktograf/i);
    expect(correct(22)).toMatch(/prasejarah/i);
  });

  it("tests technology through Bab 4 examples", () => {
    expect(correct(20)).toMatch(/logam/i);
    expect(correct(20)).toMatch(/bajak/i);
    expect(correct(13)).toMatch(/pengangkutan/i);
  });

  it("distinguishes hadharah (values) from madaniyyah (material)", () => {
    const answer = correct(23);
    expect(answer).toMatch(/^Hadharah menekankan nilai dan prinsip/);
    expect(answer).toMatch(/madaniyyah menjurus kepada kebendaan/);
    expect(byId(23).explanation).toMatch(
      /akidah, syarak, akhlak, falsafah, kebudayaan dan peradaban/,
    );
    expect(allText(23)).not.toMatch(/kawasan|kota|taraf kehidupan/i);
  });

  it("tests trade as growing out of agriculture, not currency", () => {
    expect(correct(3)).toMatch(/pertukaran barangan/i);
    expect(byId(9).explanation).toMatch(/pertanian/i);
    expect(byId(9).explanation).toMatch(/perdagangan/i);
    for (const q of chapter4) {
      expect(correct(num(q))).not.toMatch(/mata wang|barter/i);
    }
  });

  it("does not claim a calendar belongs to Bab 4 technology", () => {
    for (const q of chapter4) {
      expect(allText(num(q)), q.id).not.toMatch(/kalendar/i);
    }
  });

  it("keeps the Malay 'peradaban' meaning apart from the Islamic concept", () => {
    expect(byId(19).question).toMatch(/bahasa Melayu/i);
    expect(correct(19)).toMatch(/kebendaan/i);
    expect(correct(19)).toMatch(/pemikiran/i);
    expect(correct(19)).not.toMatch(/rohani|rohaniah|al-Quran|hadis/i);
  });

  it("asks for a civic value instead of the fall of civilisations", () => {
    expect(byId(30).question).toMatch(/nilai/i);
    expect(correct(30)).toMatch(/bekerjasama/i);
    for (const q of chapter4) {
      expect(allText(num(q))).not.toMatch(/kejatuhan|runtuh|keruntuhan/i);
    }
  });
});

describe("Sejarah Form 1 Bab 4 shuffled attempts", () => {
  const seeded = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  it("puts all 30 questions into an attempt and reorders them per attempt", () => {
    const scope = { subjectId: "sejarah", form: "Form 1" };
    const a = orderRegularQuizQuestions(chapter4, scope, seeded(1));
    const b = orderRegularQuizQuestions(chapter4, scope, seeded(2));
    expect(a.issues).toEqual([]);
    expect(a.questions).toHaveLength(30);
    expect(new Set(a.questions.map((q) => q.id)).size).toBe(30);
    expect(a.questions.map((q) => q.id)).not.toEqual(b.questions.map((q) => q.id));
    // The created attempt is a fixed array: reading it again never reorders it.
    const first = a.questions.map((q) => q.id);
    expect(a.questions.map((q) => q.id)).toEqual(first);
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
    const moved = chapter4.filter(
      (q) => shuffleQuestionOptions(q, seeded(7)).options.join("|") !== q.options.join("|"),
    );
    expect(moved.length).toBeGreaterThan(20);
  });
});
