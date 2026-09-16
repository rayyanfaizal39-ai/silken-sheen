import { describe, expect, it } from "vitest";
import { scienceF2C6QuizzesBM } from "./quizzes-bm";
import { scienceF2C6QuizzesDLP } from "./quizzes-dlp";

/**
 * Regression guards for the Chapter 6 QUIZ BANK textbook-only remediation
 * (34 -> 30 questions per language). See the task's own 35-point brief for
 * the full rationale; this file locks in only the parts that are cheap and
 * durable to check by code — count, structure, answer-key integrity, scope,
 * and the specific facts the remediation was most at risk of losing.
 *
 * Complementary to chapter-6-remediation.test.tsx, which already guards the
 * acid/alkali strength misconception, indicator colours, salt pairs and
 * "no Activity N.N leakage" across every Chapter 6 surface including these
 * two quiz files. This file does not repeat those guards.
 */

type Quiz = typeof scienceF2C6QuizzesDLP;

const BANKS: [string, Quiz][] = [
  ["bm", scienceF2C6QuizzesBM],
  ["dlp", scienceF2C6QuizzesDLP],
];

const text = (v: unknown) => JSON.stringify(v);

describe("Chapter 6 quiz bank — exact final count", () => {
  it("BM has exactly 30 questions", () => {
    expect(scienceF2C6QuizzesBM.length).toBe(30);
  });

  it("DLP has exactly 30 questions", () => {
    expect(scienceF2C6QuizzesDLP.length).toBe(30);
  });
});

describe("Chapter 6 quiz bank — answer-key integrity", () => {
  for (const [lang, bank] of BANKS) {
    it(`${lang}: every question has exactly 4 options`, () => {
      for (const q of bank) expect(q.options.length, q.id).toBe(4);
    });

    it(`${lang}: every answerIndex is in range`, () => {
      for (const q of bank) {
        expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      }
    });

    it(`${lang}: no question has duplicate option text`, () => {
      for (const q of bank) {
        expect(new Set(q.options).size, q.id).toBe(q.options.length);
      }
    });

    it(`${lang}: no duplicate ids`, () => {
      const ids = bank.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it(`${lang}: no two questions share an identical option set`, () => {
      const seen = new Map<string, string>();
      const dupes: string[] = [];
      for (const q of bank) {
        const key = [...q.options].sort().join("|");
        const prev = seen.get(key);
        if (prev) dupes.push(`${prev} = ${q.id}`);
        else seen.set(key, q.id);
      }
      expect(dupes, dupes.join("\n")).toEqual([]);
    });
  }
});

describe("Chapter 6 quiz bank — BM/DLP parity", () => {
  it("both banks have the same length", () => {
    expect(scienceF2C6QuizzesBM.length).toBe(scienceF2C6QuizzesDLP.length);
  });

  it("both banks carry the same question numbers (ids), only the lang segment differs", () => {
    const numbers = (bank: Quiz, prefix: string) =>
      bank.map((q) => q.id.replace(`sci-f2-c6-${prefix}-`, "")).sort();
    expect(numbers(scienceF2C6QuizzesBM, "bm")).toEqual(numbers(scienceF2C6QuizzesDLP, "dlp"));
  });

  it("both banks have the same difficulty for the same question number", () => {
    const byNumber = (bank: Quiz, prefix: string) => {
      const map = new Map<string, string>();
      for (const q of bank) map.set(q.id.replace(`sci-f2-c6-${prefix}-`, ""), q.difficulty);
      return map;
    };
    const bm = byNumber(scienceF2C6QuizzesBM, "bm");
    const dlp = byNumber(scienceF2C6QuizzesDLP, "dlp");
    for (const [n, difficulty] of bm) {
      expect(dlp.get(n), `q${n} difficulty mismatch`).toBe(difficulty);
    }
  });

  it("both banks have the same answerIndex for the same question number", () => {
    const byNumber = (bank: Quiz, prefix: string) => {
      const map = new Map<string, number>();
      for (const q of bank) map.set(q.id.replace(`sci-f2-c6-${prefix}-`, ""), q.answerIndex);
      return map;
    };
    const bm = byNumber(scienceF2C6QuizzesBM, "bm");
    const dlp = byNumber(scienceF2C6QuizzesDLP, "dlp");
    for (const [n, answerIndex] of bm) {
      expect(dlp.get(n), `q${n} answerIndex mismatch`).toBe(answerIndex);
    }
  });
});

describe("Chapter 6 quiz bank — no learner-facing Activity references", () => {
  for (const [lang, bank] of BANKS) {
    it(`${lang}: no "Activity 6.x" / "Aktiviti 6.x" leakage`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/Aktiviti\s*\d\.\d/i);
      expect(t).not.toMatch(/\bActivity\s*\d\.\d/i);
    });
  }
});

describe("Chapter 6 quiz bank — removed low-value items stay removed", () => {
  for (const [lang, bank] of BANKS) {
    const t = text(bank);

    it(`${lang}: no separate etymology question for "acid"`, () => {
      expect(t).not.toMatch(lang === "bm" ? /bahasa apakah.*"asid"/i : /which language.*"acid"/i);
    });

    it(`${lang}: no separate etymology question for "alkali"`, () => {
      expect(t).not.toMatch(
        lang === "bm" ? /bahasa apakah.*"alkali"/i : /which language.*"alkali"/i,
      );
    });

    it(`${lang}: taste is tested once, as a comparison, not as two separate recall questions`, () => {
      // Scoped to questions that directly ASK about taste (not ones that merely
      // mention a sour taste in passing, like the vinegar-strength question).
      const tasteQuestions = bank.filter((q) =>
        (lang === "bm"
          ? /apakah rasa|perbandingan.*betul antara sifat/i
          : /taste of an (acid|alkali)|compares the properties/i
        ).test(q.question),
      );
      expect(tasteQuestions.length, tasteQuestions.map((q) => q.id).join(",")).toBe(1);
      // and it must compare both acid and alkali in the same question
      expect(tasteQuestions[0].question).toMatch(
        lang === "bm" ? /asid.*alkali|alkali.*asid/i : /acids.*alkalis|alkalis.*acids/i,
      );
    });
  }
});

describe("Chapter 6 quiz bank — required concepts still exist", () => {
  for (const [lang, bank] of BANKS) {
    const t = text(bank);

    it(`${lang}: the same-concentration condition is tested`, () => {
      expect(t).toMatch(lang === "bm" ? /kepekatan yang sama/i : /same concentration/i);
    });

    it(`${lang}: vinegar / ethanoic acid is never classified as a strong acid`, () => {
      const q = bank.find((x) => /(cuka|vinegar)/i.test(x.question))!;
      expect(q, "vinegar/ethanoic acid question missing").toBeTruthy();
      expect(q.options[q.answerIndex]).toMatch(lang === "bm" ? /asid lemah/i : /weak acid/i);
      expect(q.options[q.answerIndex]).not.toMatch(lang === "bm" ? /asid kuat/i : /strong acid/i);
    });

    it(`${lang}: ethanoic acid is correctly treated as weak in the equal-concentration comparison`, () => {
      const q = bank.find(
        (x) =>
          /(etanoik|ethanoic)/i.test(x.question) && /(hidroklorik|hydrochloric)/i.test(x.question),
      )!;
      expect(q, "HCl vs ethanoic comparison question missing").toBeTruthy();
      expect(q.options[q.answerIndex]).toMatch(lang === "bm" ? /asid lemah/i : /weak acid/i);
    });

    it(`${lang}: ammonia solution is correctly treated as a weak alkali in the equal-concentration comparison`, () => {
      const q = bank.find(
        (x) =>
          /ammonia/i.test(x.question) && /(natrium hidroksida|sodium hydroxide)/i.test(x.question),
      )!;
      expect(q, "NaOH vs ammonia comparison question missing").toBeTruthy();
      expect(q.options[q.answerIndex]).toMatch(
        lang === "bm" ? /larutan ammonia/i : /ammonia solution/i,
      );
    });

    it(`${lang}: the titration endpoint remains pink -> colourless`, () => {
      const q = bank.find((x) => /(takat akhir|end point)/i.test(x.question))!;
      expect(q, "titration endpoint question missing").toBeTruthy();
      expect(q.options[q.answerIndex]).toMatch(
        lang === "bm" ? /merah jambu.*tidak berwarna/i : /pink.*colourless/i,
      );
    });

    it(`${lang}: toothpaste remains`, () => {
      expect(t).toMatch(lang === "bm" ? /ubat gigi/i : /toothpaste/i);
    });

    it(`${lang}: fabric softener remains`, () => {
      expect(t).toMatch(lang === "bm" ? /pelembut fabrik/i : /fabric softener/i);
    });

    it(`${lang}: acidic soil / slaked lime remains`, () => {
      expect(t).toMatch(lang === "bm" ? /tanah/i : /soil/i);
      expect(t).toMatch(lang === "bm" ? /kapur mati/i : /slaked lime/i);
    });

    it(`${lang}: industrial waste treatment remains, without unsupported ecosystem/biodiversity claims`, () => {
      const q = bank.find((x) => /(kilang|factory)/i.test(x.question))!;
      expect(q, "industrial waste question missing").toBeTruthy();
      const joined = `${q.question} ${q.options.join(" ")} ${q.explanation ?? ""}`;
      expect(joined).not.toMatch(
        /ecosystem|biodivers|aquatic|hidupan akuatik|ekosistem|biodiversiti/i,
      );
    });

    it(`${lang}: no unsupported wasp example`, () => {
      expect(t).not.toMatch(/tebuan|wasp/i);
    });

    it(`${lang}: the pH meter gives a direct reading is tested`, () => {
      const q = bank.find((x) => /(bacaan terus|direct.*reading)/i.test(x.question));
      expect(q, "direct pH reading question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(lang === "bm" ? /meter pH/i : /pH meter/i);
    });

    it(`${lang}: an advantage of universal indicator over litmus is tested`, () => {
      const q = bank.find((x) =>
        /(kelebihan.*penunjuk semesta|advantage.*universal indicator)/i.test(x.question),
      );
      expect(q, "universal indicator advantage question missing").toBeTruthy();
    });

    it(`${lang}: phenolphthalein's colourless ambiguity (acid vs neutral) is tested`, () => {
      const q = bank.find(
        (x) =>
          /fenolftalein|phenolphthalein/i.test(x.question) &&
          /(neutral|berasid|acidic)/i.test(x.question),
      );
      expect(q, "phenolphthalein ambiguity question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(lang === "bm" ? /neutral/i : /neutral/i);
    });

    it(`${lang}: the ammonia-gas-requires-water reasoning question is present`, () => {
      const q = bank.find((x) => /(gas ammonia|ammonia gas)/i.test(x.question));
      expect(q, "ammonia gas question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(lang === "bm" ? /air/i : /water/i);
    });

    it(`${lang}: no old facial-cleanser/toner question remains`, () => {
      expect(t).not.toMatch(lang === "bm" ? /pencuci muka/i : /face cleanser/i);
    });

    it(`${lang}: no old hair-conditioner question remains`, () => {
      expect(t).not.toMatch(lang === "bm" ? /pelembut rambut/i : /hair conditioner/i);
    });
  }
});

describe("Chapter 6 quiz bank — scope discipline (no outside chemistry)", () => {
  for (const [lang, bank] of BANKS) {
    const t = text(bank);

    it(`${lang}: no ionic equations, H+/OH-, molarity or stoichiometry`, () => {
      expect(t).not.toMatch(/H\+|OH-|mol dm|molarity|kemolaran|stoikiometri|stoichiometry/i);
    });

    it(`${lang}: no Haber process or ammonium-salt industrial chemistry`, () => {
      expect(t).not.toMatch(/Haber|ammonium salt|garam ammonium/i);
    });

    it(`${lang}: no modern indicator transition-range chemistry`, () => {
      expect(t).not.toMatch(/transition range|julat peralihan|pKa/i);
    });
  }
});

describe("Chapter 6 quiz bank — difficulty labels are defensible", () => {
  for (const [lang, bank] of BANKS) {
    it(`${lang}: routine daily-life applications are not labelled Hard`, () => {
      const routineApplications = bank.filter((q) =>
        (lang === "bm"
          ? /ubat gigi|pelembut fabrik|kapur mati/i
          : /toothpaste|fabric softener|slaked lime/i
        ).test(q.question),
      );
      expect(routineApplications.length).toBeGreaterThan(0);
      for (const q of routineApplications) {
        expect(q.difficulty, q.id).not.toBe("Hard");
      }
    });

    it(`${lang}: the same-concentration reasoning question is labelled Hard`, () => {
      const q = bank.find((x) =>
        /(kepekatan yang sama.*penting|matter when comparing)/i.test(x.question),
      );
      expect(q, "same-concentration reasoning question missing").toBeTruthy();
      expect(q!.difficulty).toBe("Hard");
    });

    it(`${lang}: the ammonia-gas reasoning question is labelled Hard`, () => {
      const q = bank.find((x) => /(gas ammonia|ammonia gas)/i.test(x.question));
      expect(q!.difficulty).toBe("Hard");
    });

    it(`${lang}: difficulty distribution has a real spread across Easy/Medium/Hard`, () => {
      const counts = { Easy: 0, Medium: 0, Hard: 0 } as Record<string, number>;
      for (const q of bank) counts[q.difficulty] = (counts[q.difficulty] ?? 0) + 1;
      expect(counts.Easy).toBeGreaterThan(0);
      expect(counts.Medium).toBeGreaterThan(0);
      expect(counts.Hard).toBeGreaterThan(0);
    });
  }
});
