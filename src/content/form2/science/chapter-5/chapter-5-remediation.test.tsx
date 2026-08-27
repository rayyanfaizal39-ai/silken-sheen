import { describe, expect, it } from "vitest";
import { scienceF2C5InteractiveBM } from "./interactive-bm";
import { scienceF2C5InteractiveDLP } from "./interactive-dlp";
import { scienceF2C5QuizzesBM } from "./quizzes-bm";
import { scienceF2C5QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C5FlashcardsBM } from "./flashcards-bm";
import { scienceF2C5FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C5MindMapBM } from "./mindmap-bm";
import { scienceF2C5MindMapDLP } from "./mindmap-dlp";
import type {
  ScienceF2InteractiveContent,
  ScienceInteractiveSection,
} from "../interactive-types";

/**
 * Regression guards for the Chapter 5 remediation — see
 * SCIENCE_F2_CH05_REMEDIATION_CHANGELOG.md.
 *
 * These lock in what the deep audit found missing, and equally lock in what it
 * found already correct. The solubility-vs-rate guards matter most: the chapter
 * got that distinction right before remediation, and the biggest risk in adding
 * solubility-as-a-quantity content was blurring it.
 *
 * Only the live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by
 * the interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C5InteractiveBM],
  ["dlp", scienceF2C5InteractiveDLP],
];

const text = (v: unknown) => JSON.stringify(v);
const allText = (c: ScienceF2InteractiveContent) => text(c);

const sectionsWith = (
  c: ScienceF2InteractiveContent,
  key: keyof ScienceInteractiveSection,
) => c.sections.filter((s) => s[key] !== undefined);

describe("Chapter 5 — structure", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: notes are split into 9-12 sections, not the original 3`, () => {
      expect(content.sections.length).toBeGreaterThanOrEqual(9);
      expect(content.sections.length).toBeLessThanOrEqual(12);
    });

    it(`${lang}: every section has a title and at least one learning block`, () => {
      for (const s of content.sections) {
        expect(s.title.trim().length).toBeGreaterThan(0);
        const hasBlock =
          s.cards ||
          s.flipCards ||
          s.tabs ||
          s.accordions ||
          s.miniExperiment ||
          s.comparisonMatrix ||
          s.methodCards ||
          s.conceptContrast ||
          s.capillaryDiagram ||
          s.electrolysisDiagram ||
          s.mixtureComparison ||
          s.waterTreatmentFlow ||
          s.matcher ||
          s.sequence;
        expect(hasBlock, `section "${s.title}" has no learning block`).toBeTruthy();
      }
    });

    it(`${lang}: no learner-facing SP code such as 5.2.2 is exposed`, () => {
      expect(allText(content)).not.toMatch(/\b5\.\d\.\d\b/);
    });
  }

  it("BM and DLP stay in lockstep on section count and order", () => {
    expect(scienceF2C5InteractiveDLP.sections.length).toBe(
      scienceF2C5InteractiveBM.sections.length,
    );
    expect(scienceF2C5InteractiveDLP.sections.map((s) => s.number)).toEqual(
      scienceF2C5InteractiveBM.sections.map((s) => s.number),
    );
  });

  it("BM and DLP carry the same block types in the same sections", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        (
          [
            "cards",
            "flipCards",
            "tabs",
            "miniExperiment",
            "comparisonMatrix",
            "methodCards",
            "conceptContrast",
            "capillaryDiagram",
            "electrolysisDiagram",
            "mixtureComparison",
            "waterTreatmentFlow",
            "matcher",
          ] as const
        )
          .filter((k) => s[k] !== undefined)
          .join(","),
      );
    expect(shape(scienceF2C5InteractiveDLP)).toEqual(shape(scienceF2C5InteractiveBM));
  });
});

describe("Chapter 5 — solubility vs rate of dissolving (regression protection)", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: solubility is defined as a maximum quantity per 100 ml`, () => {
      const t = allText(content);
      expect(t).toMatch(lang === "bm" ? /kuantiti maksimum/i : /maximum amount/i);
      expect(t).toMatch(/100 ml/i);
    });

    it(`${lang}: the two concepts are contrasted side by side`, () => {
      const contrasts = sectionsWith(content, "conceptContrast");
      expect(contrasts.length).toBeGreaterThanOrEqual(1);
      const block = contrasts[0]!.conceptContrast!;
      const pair = `${text(block.left)} ${text(block.right)}`;
      expect(pair).toMatch(lang === "bm" ? /berapa banyak/i : /HOW MUCH/);
      expect(pair).toMatch(lang === "bm" ? /berapa cepat/i : /HOW FAST/);
    });

    it(`${lang}: never claims stirring or particle size increases solubility itself`, () => {
      const t = allText(content);
      // The banned claim in English. "rate of solubility" is a separate, held
      // term (see interactive-dlp.ts) and must not be caught by this guard.
      expect(t).not.toMatch(/stirring[^".]{0,40}increases (the )?solubility(?! ?rate)/i);
      expect(t).not.toMatch(/(smaller|particle size)[^".]{0,40}increases (the )?solubility\b(?!\s*rate)/i);
      // And in BM: "kacauan ... meningkatkan keterlarutan" without "kadar".
      expect(t).not.toMatch(/kacauan[^".]{0,40}meningkatkan keterlarutan/i);
      expect(t).not.toMatch(/saiz[^".]{0,40}meningkatkan keterlarutan(?! ?nya)/i);
    });

    it(`${lang}: the three factors are framed as affecting the rate`, () => {
      const rateSections = content.sections.filter((s) =>
        (s.flipCards ?? []).some((f) => f.id.startsWith("sol-")),
      );
      expect(rateSections.length).toBe(1);
      const facts = (rateSections[0]!.flipCards ?? []).map((f) => f.fact).join(" ");
      const fasterHits = facts.match(lang === "bm" ? /lebih (cepat|pantas)/gi : /faster|quickly/gi);
      expect(fasterHits?.length ?? 0).toBeGreaterThanOrEqual(3);
    });

    it(`${lang}: temperature's effect on solubility itself is taught (the q23 gap)`, () => {
      const t = allText(content);
      expect(t).toMatch(
        lang === "bm"
          ? /suhu yang lebih tinggi|pada suhu yang lebih tinggi/i
          : /at a higher temperature/i,
      );
      expect(t).toMatch(lang === "bm" ? /tidak lagi tepu/i : /no longer saturated/i);
    });
  }
});

describe("Chapter 5 — mandatory experiments are staged", () => {
  for (const [lang, content] of LANGS) {
    const experiments = sectionsWith(content, "miniExperiment");

    it(`${lang}: both compulsory experiments are present`, () => {
      expect(experiments.length).toBe(2);
    });

    it(`${lang}: the evaporation experiment covers all four factors`, () => {
      const evaporation = experiments.find((s) =>
        (s.miniExperiment!.parts ?? []).some((p) => p.id === "humidity"),
      );
      expect(evaporation, "no evaporation experiment found").toBeTruthy();
      const ids = evaporation!.miniExperiment!.parts.map((p) => p.id).sort();
      expect(ids).toEqual(["air-movement", "humidity", "surface-area", "temperature"]);
    });

    it(`${lang}: the rate-of-dissolving experiment covers all three factors`, () => {
      const dissolving = experiments.find((s) =>
        (s.miniExperiment!.parts ?? []).some((p) => p.id === "stir"),
      );
      expect(dissolving, "no rate-of-dissolving experiment found").toBeTruthy();
      const ids = dissolving!.miniExperiment!.parts.map((p) => p.id).sort();
      expect(ids).toEqual(["size", "stir", "temp"]);
    });

    it(`${lang}: every experiment part names a hypothesis and all three variables`, () => {
      for (const s of experiments) {
        for (const part of s.miniExperiment!.parts) {
          expect(part.hypothesis.trim().length, `${part.id} hypothesis`).toBeGreaterThan(10);
          expect(part.manipulated.trim().length, `${part.id} manipulated`).toBeGreaterThan(2);
          expect(part.responding.trim().length, `${part.id} responding`).toBeGreaterThan(2);
          expect(part.controlled.trim().length, `${part.id} controlled`).toBeGreaterThan(10);
          expect(part.method.length, `${part.id} method`).toBeGreaterThanOrEqual(3);
          expect(part.conclusion.trim().length, `${part.id} conclusion`).toBeGreaterThan(10);
        }
      }
    });

    it(`${lang}: the dissolving experiment's responding variable is the rate, never plain solubility`, () => {
      const dissolving = experiments.find((s) =>
        (s.miniExperiment!.parts ?? []).some((p) => p.id === "stir"),
      )!;
      for (const part of dissolving.miniExperiment!.parts) {
        expect(part.responding).toMatch(lang === "bm" ? /^Kadar keterlarutan$/i : /^Rate of/i);
      }
    });
  }
});

describe("Chapter 5 — previously missing content is now taught", () => {
  for (const [lang, content] of LANGS) {
    const t = allText(content);

    it(`${lang}: alternative water supplies cover all three methods`, () => {
      const cards = sectionsWith(content, "methodCards")[0]?.methodCards;
      expect(cards, "no methodCards block").toBeTruthy();
      const ids = cards!.cards.map((c) => c.id).sort();
      expect(ids).toEqual(["fog", "recycling", "reverse-osmosis"]);
      // each option answers the same three questions
      for (const c of cards!.cards) {
        expect(c.what.trim().length).toBeGreaterThan(10);
        expect(c.how.trim().length).toBeGreaterThan(10);
        expect(c.when.trim().length).toBeGreaterThan(10);
      }
    });

    it(`${lang}: ether is present in the non-water solvent list`, () => {
      expect(t).toMatch(lang === "bm" ? /"Eter"/ : /"Ether"/);
    });

    it(`${lang}: all five non-water solvents are listed`, () => {
      const names = lang === "bm"
        ? ["Alkohol", "Kerosin", "Aseton", "Turpentin", "Eter"]
        : ["Alcohol", "Kerosene", "Acetone", "Turpentine", "Ether"];
      const solventTabs = content.sections.flatMap((s) => s.tabs ?? []).map((x) => x.title);
      for (const n of names) expect(solventTabs).toContain(n);
    });

    it(`${lang}: the Minamata case is taught`, () => {
      expect(t).toMatch(/Minamata/);
      expect(t).toMatch(lang === "bm" ? /merkuri/i : /mercury/i);
    });

    it(`${lang}: a water audit is taught`, () => {
      expect(t).toMatch(lang === "bm" ? /audit air/i : /water audit/i);
    });

    it(`${lang}: purification is explained as producing pure water`, () => {
      expect(t).toMatch(lang === "bm" ? /penulenan/i : /purification means/i);
    });

    it(`${lang}: the purification comparison covers all four methods and four criteria`, () => {
      const matrix = sectionsWith(content, "comparisonMatrix")[0]?.comparisonMatrix;
      expect(matrix, "no comparisonMatrix block").toBeTruthy();
      expect(matrix!.columns.length).toBe(4);
      expect(matrix!.rows.map((r) => r.id).sort()).toEqual([
        "boiling",
        "chlorination",
        "distillation",
        "filtration",
      ]);
      // distillation is the only row that is yes on every criterion
      const allYes = matrix!.rows.filter((r) => r.values.every((v) => v === "yes"));
      expect(allYes.map((r) => r.id)).toEqual(["distillation"]);
    });
  }
});

describe("Chapter 5 — water treatment terminology and order", () => {
  const EXPECTED_ORDER = [
    "reservoir",
    "screening",
    "oxidation",
    "coagulation",
    "sedimentation",
    "filtration",
    "chlorination",
    "homes",
  ];

  for (const [lang, content] of LANGS) {
    const flow = sectionsWith(content, "waterTreatmentFlow")[0]?.waterTreatmentFlow;

    it(`${lang}: the treatment flow keeps the source stage order`, () => {
      expect(flow, "no waterTreatmentFlow block").toBeTruthy();
      expect(flow!.stages.map((s) => s.id)).toEqual(EXPECTED_ORDER);
    });

    it(`${lang}: every stage explains what it does`, () => {
      for (const s of flow!.stages) expect(s.fn.trim().length).toBeGreaterThan(15);
    });

    it(`${lang}: coagulation names both chemicals and their jobs`, () => {
      const coag = flow!.stages.find((s) => s.id === "coagulation")!;
      expect(coag.chemical).toBeTruthy();
      expect(coag.chemical!).toMatch(lang === "bm" ? /[Aa]lum/ : /[Aa]lum/);
      expect(coag.chemical!).toMatch(lang === "bm" ? /kapur mati/i : /slaked lime/i);
    });

    it(`${lang}: chlorination names chlorine and sodium fluoride`, () => {
      const chl = flow!.stages.find((s) => s.id === "chlorination")!;
      expect(chl.chemical!).toMatch(lang === "bm" ? /[Kk]lorin/ : /[Cc]hlorine/);
      expect(chl.chemical!).toMatch(lang === "bm" ? /natrium fluorida/i : /sodium fluoride/i);
    });
  }

  it("BM uses the source stage names, not the earlier non-source ones", () => {
    const t = allText(scienceF2C5InteractiveBM);
    for (const term of ["Penapisan", "Pengoksidaan", "Penggumpalan", "Pengenapan", "Penurasan"]) {
      expect(t, `missing source term ${term}`).toContain(term);
    }
    expect(t, "non-source term 'Kogulasi' is back").not.toMatch(/Kogulasi/i);
    expect(t, "non-source term 'kapur terhidrat' is back").not.toMatch(/kapur terhidrat/i);
  });

  it("BM no longer contains the 'kekeasidan' typo", () => {
    expect(allText(scienceF2C5InteractiveBM)).not.toMatch(/kekeasidan/i);
    expect(allText(scienceF2C5InteractiveBM)).toMatch(/keasidan/i);
  });
});

describe("Chapter 5 — cohesion and adhesion are not reversed", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: cohesion is water-to-water and adhesion is water-to-surface`, () => {
      const diagram = sectionsWith(content, "capillaryDiagram")[0]?.capillaryDiagram;
      expect(diagram, "no capillaryDiagram block").toBeTruthy();

      const cohesion = diagram!.labels.find((l) => l.id === "cohesion")!;
      const adhesion = diagram!.labels.find((l) => l.id === "adhesion")!;

      if (lang === "bm") {
        expect(cohesion.label).toBe("Daya lekitan");
        expect(adhesion.label).toBe("Daya lekatan");
        expect(cohesion.note).toMatch(/molekul air dengan molekul air/i);
        expect(adhesion.note).toMatch(/permukaan yang berbeza|xilem/i);
      } else {
        expect(cohesion.label).toBe("Cohesive force");
        expect(adhesion.label).toBe("Adhesive force");
        expect(cohesion.note).toMatch(/water molecules and other water molecules/i);
        expect(adhesion.note).toMatch(/different surface|xylem/i);
      }
      // capillary action is the combined effect, not a third independent force
      const capillary = diagram!.labels.find((l) => l.id === "capillary")!;
      expect(capillary.note).toMatch(lang === "bm" ? /gabungan/i : /combined/i);
    });
  }
});

describe("Chapter 5 — electrolysis stays correct", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: oxygen at the anode, hydrogen at the cathode, ratio 2:1`, () => {
      const d = sectionsWith(content, "electrolysisDiagram")[0]?.electrolysisDiagram;
      expect(d, "no electrolysisDiagram block").toBeTruthy();

      const anode = d!.labels.find((l) => l.id === "anode")!;
      const cathode = d!.labels.find((l) => l.id === "cathode")!;
      expect(anode.note).toMatch(lang === "bm" ? /[Oo]ksigen/ : /[Oo]xygen/);
      expect(anode.note).toMatch(lang === "bm" ? /positif/i : /positive/i);
      expect(cathode.note).toMatch(lang === "bm" ? /[Hh]idrogen/ : /[Hh]ydrogen/);
      expect(cathode.note).toMatch(lang === "bm" ? /negatif/i : /negative/i);
      expect(d!.ratioCaption).toMatch(/2\s*:\s*1/);
    });
  }
});

describe("Chapter 5 — impurities and colloid stay correct", () => {
  for (const [lang, content] of LANGS) {
    const t = allText(content);

    it(`${lang}: salt lowers the melting point and raises the boiling point`, () => {
      expect(t).toMatch(
        lang === "bm"
          ? /menurunkan takat lebur[^"]*meningkatkan takat didih/i
          : /lowers the melting point[^"]*raises the boiling point/i,
      );
    });

    it(`${lang}: the colloid keeps both source features and claims no light behaviour`, () => {
      const kinds = sectionsWith(content, "mixtureComparison")[0]?.mixtureComparison?.kinds;
      expect(kinds, "no mixtureComparison block").toBeTruthy();
      const colloid = kinds!.find((k) => k.id === "colloid")!;
      expect(colloid.lightPasses).toBe("between");
      expect(colloid.note).toMatch(lang === "bm" ? /tidak.*jernih/i : /not clear/i);
      expect(colloid.note).toMatch(lang === "bm" ? /mendakan/i : /precipitate/i);

      const solution = kinds!.find((k) => k.id === "solution")!;
      const suspension = kinds!.find((k) => k.id === "suspension")!;
      expect(solution.lightPasses).toBe("yes");
      expect(suspension.lightPasses).toBe("no");
    });
  }
});

describe("Chapter 5 — assessment integrity", () => {
  const QUIZZES: [string, typeof scienceF2C5QuizzesBM][] = [
    ["bm", scienceF2C5QuizzesBM],
    ["dlp", scienceF2C5QuizzesDLP],
  ];

  for (const [lang, quiz] of QUIZZES) {
    it(`${lang}: every answer index is within range and ids are unique`, () => {
      const ids = new Set<string>();
      for (const q of quiz) {
        expect(q.answerIndex, `${q.id} answerIndex`).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, `${q.id} answerIndex`).toBeLessThan(q.options.length);
        expect(ids.has(q.id), `duplicate quiz id ${q.id}`).toBe(false);
        ids.add(q.id);
      }
    });

    it(`${lang}: the experiment-variable items survive`, () => {
      const joined = text(quiz);
      expect(joined).toMatch(lang === "bm" ? /bergerak balas/i : /responding variable/i);
    });
  }

  it("BM and DLP quizzes stay the same length", () => {
    expect(scienceF2C5QuizzesDLP.length).toBe(scienceF2C5QuizzesBM.length);
  });

  it("the protected quiz items are still present and unweakened", () => {
    const find = (id: string) => scienceF2C5QuizzesBM.find((q) => q.id === id);

    // q23 — heating a saturated solution. Solubility as a quantity.
    const q23 = find("sci-f2-c5-bm-q23")!;
    expect(q23, "q23 was removed").toBeTruthy();
    expect(q23.difficulty).toBe("Hard");
    expect(q23.options[q23.answerIndex]).toMatch(/keterlarutan secara umum meningkat/i);

    // q22 — electrolysis conductivity. q28 — alternative supply.
    expect(find("sci-f2-c5-bm-q22"), "q22 was removed").toBeTruthy();
    expect(find("sci-f2-c5-bm-q28"), "q28 was removed").toBeTruthy();
  });

  it("flashcards keep the solubility definition and stay in BM/DLP parity", () => {
    expect(scienceF2C5FlashcardsDLP.length).toBe(scienceF2C5FlashcardsBM.length);
    const f18bm = scienceF2C5FlashcardsBM.find((f) => f.id === "sci-f2-c5-bm-f18")!;
    expect(f18bm.back).toMatch(/maksimum/i);
    expect(f18bm.back).toMatch(/100 ml/);
    const f18dlp = scienceF2C5FlashcardsDLP.find((f) => f.id === "sci-f2-c5-dlp-f18")!;
    expect(f18dlp.back).toMatch(/maximum/i);
    expect(f18dlp.back).toMatch(/100 ml/);
  });

  it("mind maps carry the alternative supplies and sustainability anchors", () => {
    for (const [lang, map] of [
      ["bm", scienceF2C5MindMapBM],
      ["dlp", scienceF2C5MindMapDLP],
    ] as const) {
      const t = text(map);
      expect(t, `${lang} mind map missing Minamata`).toMatch(/Minamata/);
      expect(t, `${lang} mind map missing reverse osmosis`).toMatch(
        lang === "bm" ? /[Oo]smosis berbalik/ : /[Rr]everse osmosis/,
      );
      expect(t, `${lang} mind map missing fog`).toMatch(lang === "bm" ? /kabus/i : /fog/i);
      expect(t, `${lang} mind map still uses a non-source stage name`).not.toMatch(/Kogulasi/i);
    }
  });
});
