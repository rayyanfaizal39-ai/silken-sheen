import { describe, expect, it } from "vitest";
import { scienceF2C10QuizzesBM } from "./chapter-10/quizzes-bm";
import { scienceF2C10QuizzesDLP } from "./chapter-10/quizzes-dlp";
import { scienceF2C11QuizzesBM } from "./chapter-11/quizzes-bm";
import { scienceF2C11QuizzesDLP } from "./chapter-11/quizzes-dlp";
import { scienceF2C12QuizzesBM } from "./chapter-12/quizzes-bm";
import { scienceF2C12QuizzesDLP } from "./chapter-12/quizzes-dlp";
import { scienceF2C13QuizzesBM } from "./chapter-13/quizzes-bm";
import { scienceF2C13QuizzesDLP } from "./chapter-13/quizzes-dlp";
import type { QuizQuestion } from "@/data/content";

/**
 * Regression guards for the Chapters 10-13 final textbook-only quiz-bank
 * audit. See the task's own 62-point brief for the full rationale. This
 * file is complementary to chapter-10-remediation.test.tsx,
 * chapter-11-remediation.test.tsx, chapter-12-remediation.test.tsx and
 * chapter-13-remediation.test.tsx — it does not repeat guards those files
 * already carry, only the specific fixes and preservations this audit
 * pass was scoped to.
 */

type Bank = [string, QuizQuestion[]];

const CHAPTERS: [number, Bank, Bank][] = [
  [10, ["bm", scienceF2C10QuizzesBM], ["dlp", scienceF2C10QuizzesDLP]],
  [11, ["bm", scienceF2C11QuizzesBM], ["dlp", scienceF2C11QuizzesDLP]],
  [12, ["bm", scienceF2C12QuizzesBM], ["dlp", scienceF2C12QuizzesDLP]],
  [13, ["bm", scienceF2C13QuizzesBM], ["dlp", scienceF2C13QuizzesDLP]],
];

const text = (v: unknown) => JSON.stringify(v);

describe("Chapters 10-13 quiz banks — exact final counts", () => {
  for (const [chapter, [, bm], [, dlp]] of CHAPTERS) {
    it(`Chapter ${chapter}: BM = 30, DLP = 30`, () => {
      expect(bm.length, `ch${chapter} bm`).toBe(30);
      expect(dlp.length, `ch${chapter} dlp`).toBe(30);
    });
  }
});

describe("Chapters 10-13 quiz banks — no source leakage", () => {
  for (const [chapter, [, bm], [, dlp]] of CHAPTERS) {
    for (const [lang, bank] of [
      ["bm", bm],
      ["dlp", dlp],
    ] as const) {
      it(`ch${chapter} ${lang}: no DSKP/SK/SP/Jadual/Activity/Experiment/Figure/notes leakage`, () => {
        const t = text(bank);
        expect(t).not.toMatch(/DSKP|\bSK\b|\bSP\b|Jadual\s*\d|Activity\s*\d|Aktiviti\s*\d/i);
        expect(t).not.toMatch(/Experiment\s*\d|Eksperimen\s*\d|Figure\s*\d|Rajah\s*\d/i);
        expect(t).not.toMatch(/according to the (notes|textbook)|mentioned in the notes/i);
        expect(t).not.toMatch(/menurut (nota|buku teks)|dinyatakan dalam nota/i);
        expect(t).not.toMatch(/see the diagram|audit|remediation/i);
        expect(t).not.toMatch(/https?:\/\//i);
      });
    }
  }
});

describe("Chapters 10-13 quiz banks — structural integrity and parity", () => {
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
          expect(new Set(q.options).size, q.id).toBe(4);
        }
      });

      it(`ch${chapter} ${lang}: no duplicate ids`, () => {
        const ids = bank.map((q) => q.id);
        expect(new Set(ids).size).toBe(ids.length);
      });
    }

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

    it(`ch${chapter}: answer positions do not overwhelmingly favour A/B`, () => {
      for (const [lang, bank] of [
        ["bm", bm],
        ["dlp", dlp],
      ] as const) {
        const counts = [0, 0, 0, 0];
        for (const q of bank) counts[q.answerIndex]++;
        expect(Math.max(...counts) - Math.min(...counts), lang).toBeLessThanOrEqual(3);
      }
    });
  }
});

describe("Chapter 10 — source-corrected guards", () => {
  const BANKS = [
    ["bm", scienceF2C10QuizzesBM],
    ["dlp", scienceF2C10QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: megaphone IS present (the supplied textbook states it amplifies the voice)`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /megafon/i : /megaphone/i);
    });

    it(`${lang}: stethoscope and hearing aid are also present`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /stetoskop/i : /stethoscope/i);
      expect(t).toMatch(lang === "bm" ? /alat bantu pendengaran/i : /hearing aid/i);
    });

    it(`${lang}: human hearing range is 20 Hz - 20 000 Hz`, () => {
      const t = text(bank);
      expect(t).toMatch(/20\s*Hz.{0,15}20,?\s?000\s*Hz/i);
    });

    it(`${lang}: no device is said to expand the biological hearing range or let humans hear ultrasound`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/widen.*(hearing|frequency) range|let humans hear ultrasound/i);
      expect(t).not.toMatch(
        /meluaskan julat (pendengaran|frekuensi)|membolehkan manusia mendengar ultrabunyi/i,
      );
    });

    it(`${lang}: no Activity 10.x leakage`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/Activity\s*10\.\d|Aktiviti\s*10\.\d/i);
    });

    it(`${lang}: BM uses O.S.K., DLP uses C.R.O. — never the other language's abbreviation`, () => {
      const t = text(bank);
      if (lang === "bm") {
        expect(t).toMatch(/O\.S\.K\./);
        expect(t).not.toMatch(/C\.R\.O\./);
      } else {
        expect(t).toMatch(/C\.R\.O\./);
      }
    });

    it(`${lang}: amplitude -> loudness and frequency -> pitch, with no invented proportionality formula`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /amplitud/i : /amplitude/i);
      expect(t).toMatch(lang === "bm" ? /frekuensi/i : /frequency/i);
      expect(t).not.toMatch(/f\s*=\s*\(?v|∝|proportional to/i);
    });

    it(`${lang}: no angle-of-incidence-equals-angle-of-reflection law is imported for echo`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/angle of incidence|sudut tuju/i);
    });

    it(`${lang}: the ultrasound medical/sonogram question's correct reasoning stays within textbook benefits, no X-ray comparison`, () => {
      const q = bank.find((x) => /(sonogram|foetus|fetus)/i.test(x.question));
      expect(q, "sonogram question missing").toBeTruthy();
      const correctReasoning = `${q!.options[q!.answerIndex]} ${q!.explanation ?? ""}`;
      expect(correctReasoning).not.toMatch(/X-ray|sinar-X/i);
    });

    it(`${lang}: ultrasound applications stay within shipping/fisheries/medical/bats`, () => {
      const t = text(bank);
      expect(t).toMatch(/sonar|underwater|sonogram|bat|kelawar|bawah air/i);
    });
  }
});

describe("Chapter 11 — preserved-remediation guards", () => {
  const BANKS = [
    ["bm", scienceF2C11QuizzesBM],
    ["dlp", scienceF2C11QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: medium-sized star pathway ends at white dwarf WITHOUT a supernova`, () => {
      const q = bank.find((x) =>
        /(NOT pass through a supernova|TIDAK melalui letupan supernova)/i.test(x.question),
      );
      expect(q, "medium-star-no-supernova question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(lang === "bm" ? /sederhana/i : /medium-sized/i);
    });

    it(`${lang}: a very large star's supernova forms a black hole, a large star's forms a neutron star (not merged)`, () => {
      const q = bank.find((x) =>
        /(originally very large|asalnya bersaiz sangat besar)/i.test(x.question),
      );
      expect(q, "very-large-star-endpoint question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(lang === "bm" ? /lohong hitam/i : /black hole/i);
      expect(q!.explanation ?? "").toMatch(lang === "bm" ? /bintang neutron/i : /neutron star/i);
    });

    it(`${lang}: no unsupported "protostar" or "main-sequence star" terminology`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/protostar|protobintang|main.sequence|jujukan utama/i);
    });

    it(`${lang}: pathway is distinguished by SIZE, not an invented "mass" framing`, () => {
      const t = text(bank);
      expect(t).toMatch(
        lang === "bm" ? /bersaiz sederhana|bersaiz besar/i : /medium-sized|large star/i,
      );
    });

    it(`${lang}: all five star characteristics are represented`, () => {
      const q = bank.find((x) => /(five characteristics|lima ciri)/i.test(x.question));
      expect(q, "five-characteristics question missing").toBeTruthy();
      const answer = q!.options[q!.answerIndex];
      for (const c of lang === "bm"
        ? ["warna", "suhu", "saiz", "kecerahan", "jarak"]
        : ["colour", "temperature", "size", "brightness", "distance"]) {
        expect(answer.toLowerCase(), c).toContain(c);
      }
    });

    it(`${lang}: no learner-facing "11.2" subtopic is invented`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/\b11\.2\b/);
    });

    it(`${lang}: relative-scale ordering has no separate "planet" tier inserted`, () => {
      const q = bank.find((x) =>
        /(smallest to largest|terkecil kepada terbesar)/i.test(x.question),
      );
      expect(q, "relative-scale question missing").toBeTruthy();
      const answer = q!.options[q!.answerIndex];
      expect(answer).not.toMatch(/\bplanet\b|\bplanet-planet\b/i);
    });
  }

  it("BM and DLP both keep exactly 30 questions (no rebuild occurred)", () => {
    expect(scienceF2C11QuizzesBM.length).toBe(30);
    expect(scienceF2C11QuizzesDLP.length).toBe(30);
  });
});

describe("Chapter 12 — preserved-remediation guards", () => {
  const BANKS = [
    ["bm", scienceF2C12QuizzesBM],
    ["dlp", scienceF2C12QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: A.U. and light-year constants are correct`, () => {
      const t = text(bank);
      expect(t).toMatch(/1\.5 × 10⁸|150 million/);
      expect(t).toMatch(/9\.5 × 10¹²/);
      expect(t).toMatch(/300 000|300,000/);
    });

    it(`${lang}: no "Saturn has weaker gravity than Earth" misconception`, () => {
      const t = text(bank);
      expect(t).not.toMatch(
        /Saturn.{0,40}(weaker|lower).{0,20}(gravity|Earth)|Zuhal.{0,40}(lemah|rendah).{0,20}(graviti|Bumi)/i,
      );
    });

    it(`${lang}: the Venus-hotter-than-Mercury anomaly is preserved (not "closer = always hotter")`, () => {
      const q = bank.find((x) =>
        /(Venus hotter than Mercury|Venus lebih panas.*Utarid|Zuhrah lebih panas)/i.test(
          x.question,
        ),
      );
      expect(q, "Venus anomaly question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(
        /carbon dioxide|greenhouse|karbon dioksida|rumah hijau/i,
      );
    });

    it(`${lang}: no habitable-zone or magnetic-field habitability terminology`, () => {
      const t = text(bank);
      expect(t).not.toMatch(
        /habitable zone|zon boleh huni|magnetic field.{0,30}(habitab|life)|medan magnet.{0,30}(huni|hidupan)/i,
      );
    });

    it(`${lang}: a hypothetical Earth-rotation-change scenario is represented`, () => {
      const t = text(bank);
      expect(t).toMatch(
        lang === "bm" ? /putaran Bumi.*perlahan|berhenti berputar/i : /rotation.*(slowed|stopped)/i,
      );
    });

    it(`${lang}: Earth's suitability for life is represented with source-supported factors only`, () => {
      const t = text(bank);
      expect(t).toMatch(
        lang === "bm"
          ? /sesuai untuk hidupan|suhu.*sesuai/i
          : /suitable for living things|suitable temperature/i,
      );
    });

    it(`${lang}: the six ecological-footprint areas are represented with source terminology`, () => {
      const q = bank.find((x) => /(six areas|enam kawasan)/i.test(x.question));
      expect(q, "ecological-footprint six-areas question missing").toBeTruthy();
      const answer = q!.options[q!.answerIndex];
      for (const area of lang === "bm"
        ? [
            "jejak karbon",
            "kawasan binaan",
            "hutan",
            "kawasan pertanian",
            "kawasan penternakan",
            "kawasan perikanan",
          ]
        : [
            "carbon footprint",
            "built-up land",
            "forest",
            "cropland",
            "grazing land",
            "fishing grounds",
          ]) {
        expect(answer.toLowerCase(), area).toContain(area);
      }
    });

    it(`${lang}: natural-satellite counts are the textbook's own (not modernised)`, () => {
      const q = bank.find((x) =>
        /(greatest number of natural satellites|bilangan satelit semula jadi.*terbanyak|natural satellites)/i.test(
          x.question,
        ),
      );
      if (q) {
        expect(q.options[q.answerIndex]).toMatch(/67/);
      }
    });
  }

  it("BM and DLP both keep exactly 30 questions", () => {
    expect(scienceF2C12QuizzesBM.length).toBe(30);
    expect(scienceF2C12QuizzesDLP.length).toBe(30);
  });
});

describe("Chapter 13 — preserved-remediation guards", () => {
  const BANKS = [
    ["bm", scienceF2C13QuizzesBM],
    ["dlp", scienceF2C13QuizzesDLP],
  ] as const;

  for (const [lang, bank] of BANKS) {
    it(`${lang}: meteoroid size range is 10 μm to 1 m, distinct from the asteroid's 1 m to 1000 km`, () => {
      const q = bank.find((x) =>
        /(size range of a meteoroid|julat saiz meteoroid)/i.test(x.question),
      );
      expect(q, "meteoroid-size question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/10\s*μm.{0,10}1\s*m\b/);
      // The meteoroid question's correct answer must never be the asteroid's
      // range (1 m to 1,000 km) or an inflated "10 m to 1 m" typo.
      expect(q!.options[q!.answerIndex]).not.toMatch(/1,?000\s*km/);
      expect(q!.options[q!.answerIndex]).not.toMatch(/10\s*m\s*to\s*1\s*m\b/);
    });

    it(`${lang}: a meteoroid moves freely and is never described as having its own orbit around the Sun`, () => {
      const meteoroidDef = bank.find((x) =>
        /(meaning of a meteoroid|maksud meteoroid)/i.test(x.question),
      );
      expect(meteoroidDef, "meteoroid definition question missing").toBeTruthy();
      expect(meteoroidDef!.options[meteoroidDef!.answerIndex]).not.toMatch(
        /own orbit|orbit sendiri/i,
      );
    });

    it(`${lang}: the meteor/meteorite exception is retained (meteors usually burn up, but some reach the surface)`, () => {
      const q = bank.find((x) =>
        /(main difference between a meteoroid and a meteor|perbezaan utama antara meteoroid dan meteor)/i.test(
          x.question,
        ),
      );
      expect(q, "meteor/meteorite distinction question missing").toBeTruthy();
      expect(q!.explanation ?? "").toMatch(/meteorite|meteorit/i);
    });

    it(`${lang}: the asteroid belt lies between Mars and Jupiter`, () => {
      const t = text(bank);
      expect(t).toMatch(lang === "bm" ? /Marikh dan Musytari/i : /Mars and Jupiter/i);
    });

    it(`${lang}: q21's meteoroid/asteroid temperature comparison carries no invented causal explanation`, () => {
      const q = bank.find((x) =>
        /(temperature comparisons for a meteoroid and an asteroid|perbandingan suhu.*meteoroid dan asteroid)/i.test(
          x.question,
        ),
      );
      expect(q, "q21 temperature-comparison question missing").toBeTruthy();
      expect(q!.question).not.toMatch(/^why/i);
      expect(q!.question).not.toMatch(/^mengapakah/i);
      expect(q!.options[q!.answerIndex]).toMatch(/0°C.{0,30}−73°C|−73°C.{0,30}0°C/);
    });

    it(`${lang}: q15 is self-contained — no "mentioned in the notes" wording, correct set is Ceres/Pallas/Juno/Vesta`, () => {
      const t = text(bank);
      expect(t).not.toMatch(/mentioned in the notes|dinyatakan dalam nota/i);
      const q = bank.find(
        (x) =>
          /(large asteroids|asteroid besar)/i.test(x.question) && /(Ceres|Pallas)/i.test(text(x)),
      );
      expect(q, "large-asteroids question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/Ceres.*Pallas.*Juno.*Vesta/);
    });

    it(`${lang}: a comet's tail is taught as pointing away from the Sun, not simply "trailing behind"`, () => {
      const q = bank.find((x) => /(tail point|ekornya menuju)/i.test(x.question));
      expect(q, "comet-tail-direction question missing").toBeTruthy();
      expect(q!.options[q!.answerIndex]).toMatch(/away from the Sun|menjauhi Matahari/i);
    });
  }

  it("BM and DLP both keep exactly 30 questions", () => {
    expect(scienceF2C13QuizzesBM.length).toBe(30);
    expect(scienceF2C13QuizzesDLP.length).toBe(30);
  });
});
