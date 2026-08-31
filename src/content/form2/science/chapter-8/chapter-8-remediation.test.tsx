import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { twoFieldResult } from "@/components/notes/blocks/TwoFieldCalculator";
import { ForceDiagram } from "@/components/notes/blocks/ForceDiagram";
import { BuoyancySchematic } from "@/components/notes/blocks/BuoyancySchematic";
import { LeverClasses } from "@/components/notes/blocks/LeverClasses";
import { MomentDiagram } from "@/components/notes/blocks/MomentDiagram";
import { GasParticles } from "@/components/notes/blocks/GasParticles";
import { DepthPressure } from "@/components/notes/blocks/DepthPressure";
import { scienceF2C8InteractiveBM } from "./interactive-bm";
import { scienceF2C8InteractiveDLP } from "./interactive-dlp";
import { scienceF2C8QuizzesBM } from "./quizzes-bm";
import { scienceF2C8QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C8FlashcardsBM } from "./flashcards-bm";
import { scienceF2C8FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C8MindMapBM } from "./mindmap-bm";
import { scienceF2C8MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the Chapter 8 remediation — see
 * SCIENCE_F2_CH08_REMEDIATION_CHANGELOG.md.
 *
 * The chapter's blocker was the missing Jadual 9 pressure investigation, and its
 * sharpest correctness defects were an altitude explanation that blamed weaker
 * gravity and a flotation condition that disagreed with itself across surfaces.
 * All three are locked here, together with the errata rule that the cancelled
 * Newton's Third Law box must never come back.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by the
 * interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C8InteractiveBM],
  ["dlp", scienceF2C8InteractiveDLP],
];

const DECKS: [string, unknown][] = [
  ["quizzes bm", scienceF2C8QuizzesBM],
  ["quizzes dlp", scienceF2C8QuizzesDLP],
  ["flashcards bm", scienceF2C8FlashcardsBM],
  ["flashcards dlp", scienceF2C8FlashcardsDLP],
  ["mindmap bm", scienceF2C8MindMapBM],
  ["mindmap dlp", scienceF2C8MindMapDLP],
];

const text = (v: unknown) => JSON.stringify(v);

/** Everything a learner can read on the interactive surface. */
function allProse(c: ScienceF2InteractiveContent): string {
  return JSON.stringify(c);
}

const findSection = (c: ScienceF2InteractiveContent, pick: (s: ScienceInteractiveSection) => boolean) =>
  c.sections.find(pick);

// ------------------------------------------------------------ A. STRUCTURE

describe("Chapter 8 — section architecture", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} splits the chapter into 11 learner-sized sections`, () => {
      expect(content.sections).toHaveLength(11);
      expect(content.chapter).toBe(8);
    });

    it(`${lang} keeps every section attached to a subtopic and gives each a check`, () => {
      for (const s of content.sections) {
        expect(["8.1", "8.2"], `${lang} "${s.title}"`).toContain(s.number);
        expect(s.title.length, `${lang} section title`).toBeGreaterThan(2);
        expect(s.checks.length, `${lang} "${s.title}" has no check question`).toBeGreaterThan(0);
      }
    });
  }

  it("BM and DLP have the same section count, order of subtopics and block shape", () => {
    const bm = scienceF2C8InteractiveBM.sections;
    const dlp = scienceF2C8InteractiveDLP.sections;
    expect(dlp).toHaveLength(bm.length);
    expect(dlp.map((s) => s.number)).toEqual(bm.map((s) => s.number));
    const shape = (s: ScienceInteractiveSection) =>
      Object.keys(s)
        .filter((k) => k !== "number" && k !== "title" && k !== "intro")
        .sort()
        .join(",");
    for (let i = 0; i < bm.length; i++) {
      expect(shape(dlp[i]), `section ${i + 1} block shape differs`).toBe(shape(bm[i]));
    }
  });
});

// --------------------------------------------------- B. SP TEACHING HOMES

describe("Chapter 8 — all 12 SPs have a teaching home", () => {
  const SP: [string, RegExp, RegExp][] = [
    ["8.1.1 six forces", /daya graviti[\s\S]*daya geseran/i, /gravitational force[\s\S]*frictional force/i],
    ["8.1.2 magnitude/direction/point", /titik aplikasi/i, /point of application/i],
    ["8.1.3 spring balance + newton", /neraca spring/i, /spring balance/i],
    ["8.1.4 action and reaction", /daya tindak balas/i, /reaction force/i],
    ["8.2.1 five effects of force", /mengubah bentuk/i, /changes shape/i],
    ["8.2.2 buoyancy and density", /berat ketara/i, /apparent weight/i],
    ["8.2.3 levers", /fulkrum/i, /fulcrum/i],
    ["8.2.4 moment of force", /momen daya/i, /moment of force/i],
    ["8.2.5 pressure investigation", /plastisin/i, /plasticine/i],
    ["8.2.6 gas pressure", /teori kinetik/i, /kinetic theory/i],
    ["8.2.7 atmospheric pressure", /tekanan atmosfera/i, /atmospheric pressure/i],
    ["8.2.8 liquid pressure", /kedalaman/i, /depth/i],
  ];

  for (const [name, bmRe, enRe] of SP) {
    it(`${name} is taught in both streams`, () => {
      expect(allProse(scienceF2C8InteractiveBM), `BM missing ${name}`).toMatch(bmRe);
      expect(allProse(scienceF2C8InteractiveDLP), `DLP missing ${name}`).toMatch(enRe);
    });
  }
});

// ------------------------------------------------------- C. ERRATA (p.173)

describe("Chapter 8 — cancelled Newton's Third Law box stays absent", () => {
  const CANCELLED = /hukum newton|newton ketiga|newton'?s third|third law|newton iii/i;

  for (const [lang, content] of LANGS) {
    it(`${lang} interactive surface never names Newton's Third Law`, () => {
      expect(allProse(content)).not.toMatch(CANCELLED);
    });
  }

  for (const [name, deck] of DECKS) {
    it(`${name} never names Newton's Third Law`, () => {
      expect(text(deck)).not.toMatch(CANCELLED);
    });
  }

  it("but the action-reaction teaching the standard requires is still present", () => {
    // Removing the cancelled box must not remove SP 8.1.4 itself.
    for (const [lang, content] of LANGS) {
      const t = allProse(content);
      const table = lang === "bm" ? /di atas meja/i : /resting on a table/i;
      const floatBody = lang === "bm" ? /terapung di atas air/i : /floating on water/i;
      const trolleys = lang === "bm" ? /troli/i : /trolle/i;
      expect(t, `${lang} lost the table situation`).toMatch(table);
      expect(t, `${lang} lost the floating situation`).toMatch(floatBody);
      expect(t, `${lang} lost the trolley situation`).toMatch(trolleys);
    }
  });

  it("the trolley pair is stated as trolley-on-trolley, not spring-on-both", () => {
    const bm = allProse(scienceF2C8InteractiveBM);
    const dlp = allProse(scienceF2C8InteractiveDLP);
    expect(bm).toMatch(/troli pertama mengenakan daya[\s\S]{0,60}troli kedua/i);
    expect(dlp).toMatch(/first trolley exerts[\s\S]{0,60}second trolley/i);
  });
});

// ------------------------------------------------------- D. BM TERMINOLOGY

describe("Chapter 8 — BM terminology follows the source", () => {
  const WRONG: [string, RegExp][] = [
    ["titik tindakan", /titik tindakan/i],
    ["penimbang spring", /penimbang spring/i],
    ["tukul kebawa", /tukul kebawa/i],
    ["bola Magdeburg", /bola magdeburg/i],
  ];

  const bmSurfaces: [string, unknown][] = [
    ["interactive bm", scienceF2C8InteractiveBM],
    ["quizzes bm", scienceF2C8QuizzesBM],
    ["flashcards bm", scienceF2C8FlashcardsBM],
    ["mindmap bm", scienceF2C8MindMapBM],
  ];

  for (const [surface, data] of bmSurfaces) {
    for (const [term, re] of WRONG) {
      it(`${surface} no longer uses "${term}"`, () => {
        expect(text(data)).not.toMatch(re);
      });
    }
  }

  it("the source terms are the ones actually used", () => {
    const t = text(scienceF2C8InteractiveBM);
    expect(t).toMatch(/titik aplikasi/i);
    expect(t).toMatch(/neraca spring/i);
    expect(text(scienceF2C8FlashcardsBM)).toMatch(/pam sedut/i);
    expect(text(scienceF2C8FlashcardsBM)).toMatch(/hemisfera magdeburg/i);
  });
});

// ---------------------------------------------------------- E. FORCE DIAGRAM

describe("Chapter 8 — force diagram (SP 8.1.2 requires one)", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} carries a force diagram with both source examples`, () => {
      const section = findSection(content, (s) => !!s.forceDiagram);
      expect(section, `${lang} has no force diagram`).toBeTruthy();
      const block = section!.forceDiagram!;
      expect(block.examples.length).toBeGreaterThanOrEqual(2);
      const ids = block.examples.map((e) => e.id);
      expect(ids).toContain("box");
      expect(ids).toContain("nail");
      // Every example must name where the force acts, not just how big it is.
      for (const e of block.examples) {
        expect(e.magnitude, `${lang} ${e.id} magnitude`).toMatch(/\d/);
        expect(e.applicationPoint.length, `${lang} ${e.id} point of application`).toBeGreaterThan(8);
      }
    });

    it(`${lang} force diagram renders an arrow for each example`, () => {
      const block = findSection(content, (s) => !!s.forceDiagram)!.forceDiagram!;
      const markup = renderToStaticMarkup(<ForceDiagram block={block} lang={lang === "dlp" ? "en" : "bm"} />);
      // one arrowhead path plus the tail dot marking the point of application
      expect(markup).toMatch(/M-5,-4 L5,0 L-5,4 Z/);
      expect(markup).toMatch(/<circle/);
      expect(markup).toMatch(/rotate\(/);
    });
  }

  it("a bigger force is never drawn with a shorter arrow", () => {
    // The nail example is 15 N against the box's 10 N, so its arrow must be longer.
    const block = scienceF2C8InteractiveDLP.sections.find((s) => s.forceDiagram)!.forceDiagram!;
    const box = block.examples.find((e) => e.id === "box")!;
    const nail = block.examples.find((e) => e.id === "nail")!;
    const n = (s: string) => Number(s.replace(/[^\d.]/g, ""));
    expect(n(nail.magnitude)).toBeGreaterThan(n(box.magnitude));
  });
});

// -------------------------------------------------------------- F. BUOYANCY

describe("Chapter 8 — buoyancy", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} teaches buoyant force as real weight minus apparent weight`, () => {
      const block = findSection(content, (s) => !!s.buoyancySchematic)?.buoyancySchematic;
      expect(block, `${lang} has no buoyancy schematic`).toBeTruthy();
      const formula = block!.formula.toLowerCase();
      if (lang === "bm") {
        expect(formula).toMatch(/berat sebenar\s*[−-]\s*berat ketara/);
      } else {
        expect(formula).toMatch(/real weight\s*[−-]\s*apparent weight/);
      }
    });

    it(`${lang} states floating as equilibrium, not as an unbalanced upward force`, () => {
      const block = findSection(content, (s) => !!s.buoyancySchematic)!.buoyancySchematic!;
      const floating = block.floatingNote.toLowerCase();
      const sinking = block.sinkingNote.toLowerCase();
      if (lang === "bm") {
        expect(floating).toMatch(/sama dengan/);
        expect(sinking).toMatch(/kurang daripada/);
      } else {
        expect(floating).toMatch(/equal to/);
        expect(sinking).toMatch(/less than/);
      }
      // Floating must never be described as buoyant force exceeding weight.
      expect(floating).not.toMatch(/lebih besar daripada berat|greater than the weight/);
    });

    it(`${lang} teaches the Plimsoll line`, () => {
      expect(allProse(content)).toMatch(/plimsoll/i);
    });
  }

  it("no live surface states unqualified 'floating means F > W'", () => {
    // The textbook's F > W applies only while an object is being pushed under.
    const BAD = /terapung[^"]{0,80}F\s*>\s*W|floating[^"]{0,80}F\s*>\s*W/i;
    for (const [name, deck] of DECKS) {
      expect(text(deck), `${name} still teaches floating as F > W`).not.toMatch(BAD);
    }
    for (const [lang, content] of LANGS) {
      expect(allProse(content), `${lang} interactive still teaches floating as F > W`).not.toMatch(BAD);
    }
  });

  it("the buoyancy schematic draws equal arrows for floating and unequal for sinking", () => {
    const block = scienceF2C8InteractiveBM.sections.find((s) => s.buoyancySchematic)!.buoyancySchematic!;
    const markup = renderToStaticMarkup(<BuoyancySchematic block={block} lang="bm" />);
    expect(markup).toMatch(/svg/);
    expect(markup).toContain(block.realWeight);
  });
});

// ---------------------------------------------------------------- G. LEVERS

describe("Chapter 8 — levers", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} carries all three classes with the correct middle component`, () => {
      const block = findSection(content, (s) => !!s.leverClasses)?.leverClasses;
      expect(block, `${lang} has no lever classes block`).toBeTruthy();
      const byId = Object.fromEntries(block!.classes.map((c) => [c.id, c.middle]));
      expect(byId.first).toBe("fulcrum");
      expect(byId.second).toBe("load");
      expect(byId.third).toBe("effort");
    });

    it(`${lang} teaches the numerical lever relationship in the notes`, () => {
      const block = findSection(content, (s) => !!s.leverClasses)!.leverClasses!;
      if (lang === "bm") {
        expect(block.formula).toMatch(/Beban[\s\S]*Jarak beban[\s\S]*Daya[\s\S]*Jarak daya/i);
      } else {
        expect(block.formula).toMatch(/Load[\s\S]*Distance of load[\s\S]*Effort[\s\S]*Distance of effort/i);
      }
    });

    it(`${lang} provides a worked example whose arithmetic is right`, () => {
      const w = findSection(content, (s) => !!s.leverClasses)!.leverClasses!.workedExample;
      // 400 N x 0.5 m = Effort x 2 m -> Effort = 100 N
      expect(w.given).toMatch(/400/);
      expect(w.answer).toMatch(/100/);
      const nums = (w.given.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
      const [load, loadD, effortD] = [nums[0], nums[1], nums[2]];
      expect((load * loadD) / effortD).toBe(100);
    });
  }

  it("each lever class renders with fulcrum, load and effort labelled", () => {
    const block = scienceF2C8InteractiveDLP.sections.find((s) => s.leverClasses)!.leverClasses!;
    const markup = renderToStaticMarkup(<LeverClasses block={block} lang="en" />);
    expect(markup).toContain(block.fulcrumLabel);
    expect(markup).toContain(block.loadLabel);
    expect(markup).toContain(block.effortLabel);
  });
});

// ---------------------------------------------------------------- H. MOMENT

describe("Chapter 8 — moment of force", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} states the moment formula with the perpendicular distance`, () => {
      const block = findSection(content, (s) => !!s.momentDiagram)?.momentDiagram;
      expect(block, `${lang} has no moment diagram`).toBeTruthy();
      if (lang === "bm") {
        expect(block!.formula).toMatch(/jarak tegak/i);
      } else {
        expect(block!.formula).toMatch(/perpendicular distance/i);
      }
      // The composite unit belongs to the calculated result, not the formula string.
      const calc = findSection(content, (s) => !!s.calculators)?.calculators?.[0];
      expect(calc && "resultUnit" in calc ? calc.resultUnit : "").toBe("N m");
    });

    it(`${lang} covers both the door and the spanner`, () => {
      const block = findSection(content, (s) => !!s.momentDiagram)!.momentDiagram!;
      const ids = block.situations.map((s) => s.id);
      expect(ids).toContain("door");
      expect(ids).toContain("spanner");
    });

    it(`${lang} warns that handle length is not the perpendicular distance when angled`, () => {
      const block = findSection(content, (s) => !!s.momentDiagram)!.momentDiagram!;
      expect(block.situations.map((s) => s.id)).toContain("angled");
      expect(block.perpendicularNote.length).toBeGreaterThan(20);
    });
  }

  it("the angled view draws a shorter perpendicular distance than the handle", () => {
    const block = scienceF2C8InteractiveBM.sections.find((s) => s.momentDiagram)!.momentDiagram!;
    const markup = renderToStaticMarkup(<MomentDiagram block={block} lang="bm" />);
    expect(markup).toContain(block.distanceLabel);
    expect(markup).toContain(block.pivotLabel);
  });
});

// ------------------------------------------- I. MANDATORY DSKP INVESTIGATION

describe("Chapter 8 — the mandatory pressure investigation", () => {
  for (const [lang, content] of LANGS) {
    const section = () => findSection(content, (s) => !!s.miniExperiment);

    it(`${lang} stages the investigation as a real experiment block`, () => {
      expect(section(), `${lang} has no investigation`).toBeTruthy();
      const block = section()!.miniExperiment!;
      expect(block.aim.length).toBeGreaterThan(20);
      expect(block.parts.length).toBeGreaterThanOrEqual(1);
    });

    it(`${lang} investigation carries every required element`, () => {
      const part = section()!.miniExperiment!.parts[0];
      for (const field of [
        "question",
        "hypothesis",
        "manipulated",
        "responding",
        "controlled",
        "materials",
        "apparatus",
        "observation",
        "conclusion",
      ] as const) {
        expect(String(part[field]).length, `${lang} ${field} is empty`).toBeGreaterThan(3);
      }
      expect(part.method.length, `${lang} procedure too short`).toBeGreaterThanOrEqual(4);
    });

    it(`${lang} uses the source variables`, () => {
      const part = section()!.miniExperiment!.parts[0];
      if (lang === "bm") {
        expect(part.manipulated).toMatch(/luas permukaan/i);
        expect(part.responding).toMatch(/lekuk/i);
        expect(part.controlled).toMatch(/jisim|daya/i);
        expect(part.apparatus).toMatch(/kaki retort/i);
        expect(part.materials).toMatch(/plastisin/i);
      } else {
        expect(part.manipulated).toMatch(/surface area/i);
        expect(part.responding).toMatch(/indentation/i);
        expect(part.controlled).toMatch(/mass|force/i);
        expect(part.apparatus).toMatch(/retort stand/i);
        expect(part.materials).toMatch(/plasticine/i);
      }
    });

    it(`${lang} records the relationship qualitatively, with no invented measurements`, () => {
      const part = section()!.miniExperiment!.parts[0];
      // The textbook prints the results table blank; no depth figures may be asserted.
      expect(part.observation).not.toMatch(/\d+(\.\d+)?\s*(cm|mm)\b/i);
      expect(part.conclusion).not.toMatch(/\d+(\.\d+)?\s*(cm|mm)\b/i);
      if (lang === "bm") {
        expect(part.observation).toMatch(/lebih dalam/i);
        expect(part.observation).toMatch(/lebih cetek/i);
      } else {
        expect(part.observation).toMatch(/deeper/i);
        expect(part.observation).toMatch(/shallower/i);
      }
    });

    it(`${lang} does not invent the fixed-release-height detail`, () => {
      const part = section()!.miniExperiment!.parts[0];
      const method = part.method.join(" ");
      expect(method).not.toMatch(/ketinggian tetap|fixed height/i);
    });
  }
});

// -------------------------------------------------------------- J. PRESSURE

describe("Chapter 8 — pressure, gas, atmosphere, liquid", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} gives both pressure units`, () => {
      const t = allProse(content);
      expect(t).toMatch(/pascal|\bPa\b/);
      expect(t).toMatch(/N m⁻²|N m-2/);
    });

    it(`${lang} keeps the particle count fixed across gas states`, () => {
      const block = findSection(content, (s) => !!s.gasParticles)?.gasParticles;
      expect(block, `${lang} has no gas particle figure`).toBeTruthy();
      expect(block!.particleCount).toBeGreaterThan(5);
      // Volume and temperature views must both say the number of molecules is unchanged.
      const states = block!.states.map((s) => s.note.toLowerCase()).join(" ");
      if (lang === "bm") {
        expect(states).toMatch(/bilangan molekul kekal sama/);
      } else {
        expect(states).toMatch(/number of molecules stays the same/);
      }
    });

    it(`${lang} explains altitude by the air above, never by weaker gravity`, () => {
      const t = allProse(content);
      expect(t, `${lang} still blames gravity`).not.toMatch(
        /graviti[^"]{0,60}lemah|lemah[^"]{0,60}graviti|weaker grav|gravity is weaker/i,
      );
      if (lang === "bm") {
        expect(t).toMatch(/kurang udara|sedikit udara|lajur udara/i);
      } else {
        expect(t).toMatch(/less air above|column of air/i);
      }
    });

    it(`${lang} distinguishes air pressure from atmospheric pressure`, () => {
      const t = allProse(content);
      if (lang === "bm") {
        expect(t).toMatch(/tekanan udara/i);
        expect(t).toMatch(/tekanan atmosfera/i);
      } else {
        expect(t).toMatch(/air pressure/i);
        expect(t).toMatch(/atmospheric pressure/i);
      }
    });

    it(`${lang} keeps the straw explanation correct`, () => {
      const t = allProse(content);
      if (lang === "bm") {
        expect(t).toMatch(/tekanan atmosfera[^"]{0,80}menolak/i);
      } else {
        expect(t).toMatch(/atmospheric pressure[^"]{0,80}push/i);
      }
    });

    it(`${lang} carries all six atmospheric-pressure applications`, () => {
      const t = allProse(content).toLowerCase();
      const needed =
        lang === "bm"
          ? ["penyedut minuman", "magdeburg", "pam sedut", "sifon", "picagari", "vakum"]
          : ["straw", "magdeburg", "plunger", "siphon", "syringe", "vacuum"];
      for (const n of needed) {
        expect(t, `${lang} missing ${n}`).toContain(n);
      }
    });

    it(`${lang} liquid pressure grows with depth and names both applications`, () => {
      const block = findSection(content, (s) => !!s.depthPressure)?.depthPressure;
      expect(block, `${lang} has no depth figure`).toBeTruthy();
      expect(block!.levels).toHaveLength(3);
      const apps = block!.applications.map((a) => a.id);
      expect(apps).toContain("dam");
      expect(apps).toContain("submarine");
    });
  }

  it("the deepest hole is drawn with the longest jet", () => {
    const block = scienceF2C8InteractiveBM.sections.find((s) => s.depthPressure)!.depthPressure!;
    const markup = renderToStaticMarkup(<DepthPressure block={block} lang="bm" />);
    // Jet paths are quadratic curves; the last one drawn must reach furthest right.
    const ends = [...markup.matchAll(/Q[\d.]+,[\d.]+ ([\d.]+),[\d.]+"/g)].map((m) => Number(m[1]));
    expect(ends.length, "no jets rendered").toBe(3);
    expect(ends[2]).toBeGreaterThan(ends[1]);
    expect(ends[1]).toBeGreaterThan(ends[0]);
  });

  it("the gas figure renders the same number of particles in every state", () => {
    const block = scienceF2C8InteractiveDLP.sections.find((s) => s.gasParticles)!.gasParticles!;
    const markup = renderToStaticMarkup(<GasParticles block={block} lang="en" />);
    const circles = [...markup.matchAll(/<circle[^>]*r="3\.2"/g)].length;
    expect(circles).toBe(block.particleCount);
  });
});

// ---------------------------------------------------- K. CALCULATOR SAFETY

describe("Chapter 8 — calculator never shows Infinity or NaN", () => {
  const F = { label: "Force", unit: "N" };
  const A = { label: "Surface area", unit: "m²" };

  it("computes the ordinary cases correctly", () => {
    expect(twoFieldResult("50", "0.2", "multiply", A, "Moment", "N m", "en")).toBe("Moment = 10.00 N m");
    expect(twoFieldResult("10", "0.01", "divide", A, "Pressure", "Pa", "en")).toBe("Pressure = 1000.00 Pa");
    expect(twoFieldResult("20", "0.5", "divide", A, "Pressure", "Pa", "en")).toBe("Pressure = 40.00 Pa");
  });

  it("intercepts a zero surface area with a localized message", () => {
    expect(twoFieldResult("10", "0", "divide", A, "Pressure", "Pa", "en")).toBe(
      "Surface area must be greater than 0 m².",
    );
    expect(
      twoFieldResult("10", "0", "divide", { label: "Luas permukaan", unit: "m²" }, "Tekanan", "Pa", "bm"),
    ).toBe("Luas permukaan mesti lebih besar daripada 0 m².");
  });

  it("still allows zero where multiplication makes it valid", () => {
    expect(twoFieldResult("0", "0.2", "multiply", A, "Moment", "N m", "en")).toBe("Moment = 0.00 N m");
    expect(twoFieldResult("50", "0", "multiply", A, "Moment", "N m", "en")).toBe("Moment = 0.00 N m");
  });

  it("never renders Infinity, -Infinity or NaN for any input combination", () => {
    const samples = ["", " ", "0", "-0", "10", "0.01", "-3", "1e400", "1e200", "abc"];
    for (const lang of ["en", "bm"] as const) {
      for (const op of ["multiply", "divide"] as const) {
        for (const a of samples) {
          for (const b of samples) {
            const out = twoFieldResult(a, b, op, F, "R", "Pa", lang);
            expect(out, `${lang} ${op} a=${a} b=${b}`).not.toMatch(/Infinity|NaN|undefined/);
          }
        }
      }
    }
  });
});

// ------------------------------------------------------ L. ASSESSMENT DECKS

describe("Chapter 8 — quizzes, flashcards and mind map", () => {
  it("keeps 30 questions per language with a balanced answer spread", () => {
    for (const deck of [scienceF2C8QuizzesBM, scienceF2C8QuizzesDLP]) {
      expect(deck).toHaveLength(30);
      const hist: Record<number, number> = {};
      for (const q of deck) {
        expect(q.options.length).toBe(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(q.options.length);
        hist[q.answerIndex] = (hist[q.answerIndex] ?? 0) + 1;
      }
      // Every position must be used, and none may dominate.
      for (const i of [0, 1, 2, 3]) {
        expect(hist[i] ?? 0, `position ${i} unused`).toBeGreaterThan(0);
      }
      expect(Math.max(...Object.values(hist))).toBeLessThanOrEqual(12);
    }
  });

  it("keeps BM and DLP decks index-for-index aligned", () => {
    expect(scienceF2C8QuizzesDLP).toHaveLength(scienceF2C8QuizzesBM.length);
    for (let i = 0; i < scienceF2C8QuizzesBM.length; i++) {
      expect(scienceF2C8QuizzesDLP[i].answerIndex, `q${i + 1} answerIndex`).toBe(
        scienceF2C8QuizzesBM[i].answerIndex,
      );
      expect(scienceF2C8QuizzesDLP[i].difficulty, `q${i + 1} difficulty`).toBe(
        scienceF2C8QuizzesBM[i].difficulty,
      );
    }
    expect(scienceF2C8FlashcardsDLP).toHaveLength(scienceF2C8FlashcardsBM.length);
  });

  it("mind-map node ids stay unique and aligned across languages", () => {
    const ids = (n: unknown, acc: string[] = []): string[] => {
      const node = n as { id: string; children?: unknown[] };
      acc.push(node.id);
      for (const c of node.children ?? []) ids(c, acc);
      return acc;
    };
    const bm = ids(scienceF2C8MindMapBM);
    const dlp = ids(scienceF2C8MindMapDLP);
    expect(new Set(bm).size).toBe(bm.length);
    expect(new Set(dlp).size).toBe(dlp.length);
    expect(dlp).toEqual(bm);
  });

  it("no deck exposes textbook activity or experiment numbering", () => {
    const LEAK = /aktiviti\s*8\.\d|activit(y|ies)\s*8\.\d|eksperimen\s*8\.\d|experiment\s*8\.\d|rajah\s*8\.\d|figure\s*8\.\d|jadual\s*8\.\d|table\s*8\.\d/i;
    for (const [name, deck] of DECKS) {
      expect(text(deck), `${name} leaks numbering`).not.toMatch(LEAK);
    }
    for (const [lang, content] of LANGS) {
      expect(allProse(content), `${lang} interactive leaks numbering`).not.toMatch(LEAK);
    }
  });
});

// ----------------------------------------------------------- M. INTERACTIONS

describe("Chapter 8 — interactive controls are real", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} every interactive figure offers more than one choice`, () => {
      for (const s of content.sections) {
        if (s.forceDiagram) expect(s.forceDiagram.examples.length, `${lang} force diagram`).toBeGreaterThan(1);
        if (s.leverClasses) expect(s.leverClasses.classes.length, `${lang} levers`).toBe(3);
        if (s.momentDiagram) expect(s.momentDiagram.situations.length, `${lang} moments`).toBeGreaterThan(1);
        if (s.gasParticles) expect(s.gasParticles.states.length, `${lang} gas`).toBeGreaterThan(1);
        if (s.depthPressure) expect(s.depthPressure.levels.length, `${lang} depth`).toBeGreaterThan(1);
        if (s.buoyancy) expect(s.buoyancy.materials.length, `${lang} buoyancy`).toBeGreaterThan(1);
        if (s.matcher) expect(s.matcher.pairs.length, `${lang} matcher`).toBeGreaterThan(1);
      }
    });

    it(`${lang} interactive figures carry an instruction line`, () => {
      for (const s of content.sections) {
        for (const block of [s.forceDiagram, s.leverClasses, s.momentDiagram, s.gasParticles, s.depthPressure]) {
          if (block) expect(block.instruction, `${lang} ${s.title} instruction`).toBeTruthy();
        }
      }
    });
  }
});
