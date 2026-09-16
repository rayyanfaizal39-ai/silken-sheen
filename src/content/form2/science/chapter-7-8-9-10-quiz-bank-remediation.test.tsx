import { describe, expect, it } from "vitest";
import { scienceF2C7QuizzesBM } from "./chapter-7/quizzes-bm";
import { scienceF2C7QuizzesDLP } from "./chapter-7/quizzes-dlp";
import { scienceF2C8QuizzesBM } from "./chapter-8/quizzes-bm";
import { scienceF2C8QuizzesDLP } from "./chapter-8/quizzes-dlp";
import { scienceF2C9QuizzesBM } from "./chapter-9/quizzes-bm";
import { scienceF2C9QuizzesDLP } from "./chapter-9/quizzes-dlp";
import { scienceF2C10QuizzesBM } from "./chapter-10/quizzes-bm";
import { scienceF2C10QuizzesDLP } from "./chapter-10/quizzes-dlp";
import type { QuizQuestion } from "@/data/content";

/**
 * Regression guards for the Chapters 7-10 master quiz-bank textbook-only
 * remediation. See the task's own 58-point brief for the full rationale;
 * this file locks in the count, structural and per-chapter fixes that are
 * cheap and durable to check by code.
 */

type Bank = [string, QuizQuestion[]];

const CHAPTERS: [number, Bank, Bank][] = [
  [7, ["bm", scienceF2C7QuizzesBM], ["dlp", scienceF2C7QuizzesDLP]],
  [8, ["bm", scienceF2C8QuizzesBM], ["dlp", scienceF2C8QuizzesDLP]],
  [9, ["bm", scienceF2C9QuizzesBM], ["dlp", scienceF2C9QuizzesDLP]],
  [10, ["bm", scienceF2C10QuizzesBM], ["dlp", scienceF2C10QuizzesDLP]],
];

const text = (v: unknown) => JSON.stringify(v);

describe("Chapters 7-10 quiz banks — exact final counts", () => {
  for (const [chapter, [, bm], [, dlp]] of CHAPTERS) {
    it(`Chapter ${chapter}: BM = 30, DLP = 30`, () => {
      expect(bm.length, `ch${chapter} bm`).toBe(30);
      expect(dlp.length, `ch${chapter} dlp`).toBe(30);
    });
  }
});

describe("Chapters 7-10 quiz banks — structural integrity", () => {
  for (const [chapter, [, bm], [, dlp]] of CHAPTERS) {
    for (const [lang, bank] of [
      ["bm", bm],
      ["dlp", dlp],
    ] as const) {
      it(`ch${chapter} ${lang}: every question has exactly 4 options and a valid answerIndex`, () => {
        for (const q of bank) {
          expect(q.options.length, q.id).toBe(4);
          expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
          expect(q.answerIndex, q.id).toBeLessThan(4);
        }
      });

      it(`ch${chapter} ${lang}: no duplicate ids`, () => {
        const ids = bank.map((q) => q.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it(`ch${chapter} ${lang}: no question has duplicate option text`, () => {
        for (const q of bank) {
          expect(new Set(q.options).size, q.id).toBe(q.options.length);
        }
      });

      it(`ch${chapter} ${lang}: no two questions are worded identically`, () => {
        // A shared distractor pool (e.g. the four Form 2 force names, or the
        // four states of matter) legitimately gets reused, in a different
        // order, across several genuinely different discrimination
        // questions — that is not a duplicate. An identical QUESTION STEM
        // would be.
        const seen = new Map<string, string>();
        const dupes: string[] = [];
        for (const q of bank) {
          const prev = seen.get(q.question);
          if (prev) dupes.push(`${prev} = ${q.id}`);
          else seen.set(q.question, q.id);
        }
        expect(dupes, dupes.join("\n")).toEqual([]);
      });

      it(`ch${chapter} ${lang}: no learner-facing Activity/Experiment/Figure number leakage`, () => {
        const t = text(bank);
        expect(t).not.toMatch(/Aktiviti\s*\d+\.\d+/i);
        expect(t).not.toMatch(/Activity\s*\d+\.\d+/i);
        expect(t).not.toMatch(/Eksperimen\s*\d+\.\d+/i);
        expect(t).not.toMatch(/Experiment\s*\d+\.\d+/i);
        expect(t).not.toMatch(/Rajah\s*\d+\.\d+|Figure\s*\d+\.\d+/i);
        expect(t).not.toMatch(/according to the textbook|menurut buku teks/i);
      });
    }

    it(`ch${chapter}: BM and DLP carry the same question numbers, only language differs`, () => {
      const numbers = (bank: QuizQuestion[], prefix: string) =>
        bank.map((q) => q.id.replace(`sci-f2-c${chapter}-${prefix}-`, "")).sort();
      expect(numbers(bm, "bm")).toEqual(numbers(dlp, "dlp"));
    });

    it(`ch${chapter}: BM and DLP agree on difficulty and answerIndex per question number`, () => {
      const byNumber = (bank: QuizQuestion[], prefix: string) => {
        const map = new Map<string, { difficulty: string; answerIndex: number }>();
        for (const q of bank) {
          map.set(q.id.replace(`sci-f2-c${chapter}-${prefix}-`, ""), {
            difficulty: q.difficulty,
            answerIndex: q.answerIndex,
          });
        }
        return map;
      };
      const bmMap = byNumber(bm, "bm");
      const dlpMap = byNumber(dlp, "dlp");
      for (const [n, v] of bmMap) {
        expect(dlpMap.get(n), `q${n}`).toEqual(v);
      }
    });
  }
});

describe("Chapter 7 — required fixes", () => {
  const BANKS = [
    ["bm", scienceF2C7QuizzesBM],
    ["dlp", scienceF2C7QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: energy forms/sources are represented, replacing the redundant ammeter-function recall`, () => {
      const q = bank.find((x) => /(compressed spring|spring yang dimampatkan)/i.test(text(x)));
      expect(q, "energy-forms question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/elastic|kenyal/i);
    });

    it(`${lang}: ammeter connection-in-series is still preserved (the more important rule)`, () => {
      const q = bank.find((x) => /(series with the bulb|bersiri dengan mentol)/i.test(text(x)));
      expect(q, "ammeter series-connection question missing").toBeTruthy();
    });

    it(`${lang}: voltmeter connected in parallel is preserved`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /selari dengan mentol/i : /parallel with the bulb/i);
    });

    it(`${lang}: the Faraday-cage question tests the shelter CONCEPT, not an unqualified "metal car is safest" claim`, () => {
      const q = bank.find((x) => /Faraday|sangkar Faraday/i.test(x.question));
      expect(q, "Faraday-cage question missing").toBeTruthy();
      expect(q!.question).toMatch(
        lang === "bm" ? /perlindungan paling selamat/i : /safest shelter/i,
      );
      expect(q!.question).not.toMatch(
        lang === "bm"
          ? /^Semasa ribut petir, mengapakah berada di dalam kereta berbadan logam lebih selamat\?$/
          : /^During a thunderstorm, why is being inside a metal-bodied car safer\?$/,
      );
    });

    it(`${lang}: the lightning conductor never overclaims ("guarantees lightning will never strike")`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/guarantees? lightning will never strike|menjamin kilat tidak akan/i);
    });

    it(`${lang}: conventional current and electron flow are opposite and unambiguous`, () => {
      const q = bank.find((x) =>
        /(direction of current flow|arah aliran arus elektrik)/i.test(x.question),
      );
      expect(q, "current-vs-electron question missing").toBeTruthy();
    });

    it(`${lang}: Ohm's Law is present with no power/energy/Kirchhoff content`, () => {
      const t = text(bank);
      expect(t).toMatch(/Ohm/i);
      expect(t).not.toMatch(/Kirchhoff|kilowatt-hour|kWh/i);
    });

    it(`${lang}: series and parallel formulas are preserved`, () => {
      const t = text(bank);
      expect(t).toMatch(/R\s*=\s*R.?\s*\+\s*R|R₁\s*\+\s*R₂/);
      expect(t).toMatch(/I\s*=\s*I.?\s*\+\s*I|I₁\s*\+\s*I₂/);
    });

    it(`${lang}: right-hand grip rule is preserved`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /petua tangan kanan/i : /right-hand grip rule/i);
    });

    it(`${lang}: the electromagnet-strength experiment variables are preserved with no invented pin-count results`, () => {
      const q = bank.find(
        (x) =>
          /(number of turns|bilangan lilitan)/i.test(x.question) &&
          /(responding|bergerak balas)/i.test(x.question),
      );
      expect(q, "electromagnet-experiment variables question missing").toBeTruthy();
      expect(text(bank)).not.toMatch(/\d+\s*(pins|jarum peniti)\s*(attracted|ditarik)/i);
    });
  }
});

describe("Chapter 8 — required fixes", () => {
  const BANKS = [
    ["bm", scienceF2C8QuizzesBM],
    ["dlp", scienceF2C8QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: a normal floating object is taught as F = W, never a blanket F > W`, () => {
      const q = bank.find((x) => /(float in a fluid|terapung dalam bendalir)/i.test(x.question));
      expect(q, "floating-condition question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(
        lang === "bm" ? /cukup untuk menampung beratnya/i : /enough to support its weight/i,
      );
      const t = text(bank);
      expect(t).not.toMatch(/floating object has F > W|objek terapung.*F\s*>\s*W/i);
    });

    it(`${lang}: actual weight minus apparent weight is preserved`, () => {
      const q = bank.find((x) =>
        /(formula for buoyant force|formula bagi daya keapungan)/i.test(x.question),
      );
      expect(q, "buoyant-force formula question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(
        lang === "bm" ? /berat sebenar.*berat ketara/i : /actual weight.*apparent weight/i,
      );
    });

    it(`${lang}: the pressure experiment (surface area vs pressure) contains no invented fixed height or numerical dent-depth results`, () => {
      const q = bank.find((x) =>
        /(surface area and pressure|luas permukaan dan tekanan)/i.test(x.question),
      );
      expect(q, "pressure-experiment question missing").toBeTruthy();
      const joined = `${q!.question} ${q!.options.join(" ")}`;
      expect(joined).not.toMatch(/dropped from|released from a height|dijatuhkan dari ketinggian/i);
      expect(joined).not.toMatch(/\d+\s*(mm|cm)\s*(dent|lekukan)/i);
      expect(joined).not.toMatch(/Experiment 8\.\d|Eksperimen 8\.\d/i);
    });

    it(`${lang}: no learner-facing "Newton's Third Law" heading — action-reaction pairs only`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/Newton'?s Third Law|Hukum Newton Ketiga/i);
      expect(t).toMatch(
        lang === "bm" ? /pasangan tindakan-tindak balas/i : /action-reaction pair/i,
      );
    });

    it(`${lang}: pressure applications use only textbook-traceable examples (no unverified elephant example)`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/elephant|gajah/i);
      expect(t).toMatch(lang === "bm" ? /traktor/i : /tractor/i);
    });

    it(`${lang}: no Archimedes' Principle or Pascal's principle / hydraulic-system terminology`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/Archimedes|Pascal'?s [Pp]rinciple|hydraulic (system|press)/i);
    });

    it(`${lang}: moment-of-force uses perpendicular distance, and the simple one-step substitution is Medium not Hard`, () => {
      const q = bank.find((x) => /50\s*N/i.test(x.question) && /(0\.2\s*m)/i.test(x.question));
      expect(q, "simple moment-of-force calculation missing").toBeTruthy();
      expect(q!.difficulty).toBe("Medium");
      expect(text(bank)).toMatch(/perpendicular distance|jarak tegak/i);
    });

    it(`${lang}: liquid pressure increases with depth, applied via dam walls, with no hydrostatic equation`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /empangan/i : /dam wall/i);
      expect(t).not.toMatch(/ρgh|rho\s*g\s*h/i);
    });
  }
});

describe("Chapter 9 — required fixes", () => {
  const BANKS = [
    ["bm", scienceF2C9QuizzesBM],
    ["dlp", scienceF2C9QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: a thermometer is never said to measure heat`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/thermometer measures heat|termometer mengukur haba/i);
    });

    it(`${lang}: heat and temperature units are compared in one question, not two separate unit-recall questions`, () => {
      const unitQuestions = bank.filter((q) =>
        (lang === "bm"
          ? /diukur dalam unit\.\.\.$|membandingkan.*unit haba dan suhu/i
          : /^Heat is measured in|^Temperature is measured in|compares the units of heat and temperature/i
        ).test(q.question),
      );
      expect(unitQuestions.length, unitQuestions.map((q) => q.id).join(",")).toBe(1);
    });

    it(`${lang}: Table 9.1 reasoning — quantity of material affects amount of heat at the same temperature`, () => {
      const q = bank.find((x) => /(500\s*ml|bikar P)/i.test(x.question));
      expect(q, "quantity-affects-heat question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/greater quantity|kuantiti.*lebih banyak/i);
    });

    it(`${lang}: Sun-to-Earth radiation is directly assessed`, () => {
      const q = bank.find(
        (x) =>
          /(Sun|Matahari)/.test(x.question) &&
          /(Earth|Bumi)/.test(x.question) &&
          /radiat|sinaran/i.test(text(x)),
      );
      expect(q, "Sun-to-Earth radiation question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/radiation|sinaran/i);
    });

    it(`${lang}: conductor/insulator is compared once, not as two near-inverse recall questions`, () => {
      const compareQuestions = bank.filter((q) =>
        (lang === "bm"
          ? /membandingkan.*konduktor haba dan penebat haba/i
          : /compares heat conductors and heat insulators/i
        ).test(q.question),
      );
      expect(compareQuestions.length).toBe(1);
    });

    it(`${lang}: no Activity/Experiment N.N leakage anywhere`, () => {
      const t = text(bank);
      expect(t).not.toMatch(
        /Activity\s*9\.\d|Experiment\s*9\.\d|Aktiviti\s*9\.\d|Eksperimen\s*9\.\d/i,
      );
    });

    it(`${lang}: dark/dull vs white/shiny absorption and emission are not reversed`, () => {
      const absorption = bank.find(
        (x) =>
          /painted white|dicat putih/i.test(text(x)) && /painted black|dicat hitam/i.test(text(x)),
      );
      expect(absorption, "absorption investigation question missing").toBeTruthy();
      expect(absorption!.options[absorption!.answerIndex]).toMatch(
        lang === "bm" ? /gelap dan kusam menyerap/i : /dark and dull surfaces (absorb|are better)/i,
      );
    });

    it(`${lang}: the Green Building concept is preserved with DSKP-supported features only`, () => {
      const q = bank.find((x) => /Green Building|Bangunan Hijau/i.test(x.question));
      expect(q, "Green Building question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/energy efficiency|kecekapan tenaga/i);
    });
  }
});

describe("Chapter 10 — required fixes", () => {
  const BANKS = [
    ["bm", scienceF2C10QuizzesBM],
    ["dlp", scienceF2C10QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: no Activity N.N leakage anywhere`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/Activity\s*10\.\d|Aktiviti\s*10\.\d/i);
    });

    it(`${lang}: BM uses O.S.K., never the English C.R.O. abbreviation`, () => {
      if (lang !== "bm") return;
      const t = text(bank);
      expect(t).toMatch(/O\.S\.K\./);
      expect(t).not.toMatch(/C\.R\.O\./);
    });

    it(`${lang}: DLP uses C.R.O.`, () => {
      if (lang !== "dlp") return;
      const t = text(bank);
      expect(t).toMatch(/C\.R\.O\./);
    });

    it(`${lang}: megaphone is present (confirmed in the supplied textbook, not incorrectly deleted)`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /megafon/i : /megaphone/i);
    });

    it(`${lang}: musical-instrument pitch reasoning (guitar string) is assessed`, () => {
      const q = bank.find((x) => /(guitar|gitar)/i.test(x.question));
      expect(q, "guitar/musical-instrument question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/higher frequency|frekuensi.*lebih tinggi/i);
    });

    it(`${lang}: reflector/absorber is compared once, not as two near-inverse recall questions`, () => {
      const compareQuestions = bank.filter((q) =>
        (lang === "bm"
          ? /membandingkan dengan betul pemantul bunyi dan penyerap bunyi/i
          : /compares sound reflectors and sound absorbers/i
        ).test(q.question),
      );
      expect(compareQuestions.length).toBe(1);
    });

    it(`${lang}: no angle-of-incidence-equals-angle-of-reflection law is imported`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/angle of incidence|sudut tuju/i);
    });

    it(`${lang}: the ultrasound medical (sonogram) question's correct answer stays within textbook-supported benefits, with no X-ray comparison in its reasoning`, () => {
      const q = bank.find((x) => /(sonogram|foetus|fetus)/i.test(x.question));
      expect(q, "sonogram question missing").toBeTruthy();
      // A distractor may correctly note that ultrasound does NOT require
      // X-rays (a true, textbook-safe distinction) — the defect being
      // guarded against is the CORRECT answer's reasoning citing "without
      // exposing the patient to hazards such as X-rays" as its justification.
      const correctReasoning = `${q!.options[q!.answerIndex]} ${q!.explanation ?? ""}`;
      expect(correctReasoning).not.toMatch(/X-ray|sinar-X/i);
      expect(q!.options[q!.answerIndex]).toMatch(
        lang === "bm" ? /tidak membahayakan fetus/i : /not harmful to the foetus/i,
      );
    });

    it(`${lang}: human hearing range is 20 Hz - 20 000 Hz`, () => {
      const t = text(bank);
      expect(t).toMatch(/20\s*Hz.{0,15}20,?000\s*Hz/i);
    });

    it(`${lang}: Doppler effect is taught without equations`, () => {
      const t = text(bank);
      expect(t).toMatch(/Doppler/i);
      expect(t).not.toMatch(/f\s*=\s*\(v|Δf|delta f/i);
    });
  }
});
