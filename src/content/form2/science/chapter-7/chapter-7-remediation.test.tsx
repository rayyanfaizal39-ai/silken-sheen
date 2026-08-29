import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  BAR_FIELD_ARCS,
  BAR_MAGNET_POLES,
  BAR_MAGNET_RECT,
  MagnetFieldDiagram,
} from "@/components/notes/blocks/MagnetFieldDiagram";
import { ohmsLawResult } from "@/components/notes/blocks/OhmsLawCalculator";
import { CurrentFieldPatterns } from "@/components/notes/blocks/CurrentFieldPatterns";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import { scienceF2C7QuizzesBM } from "./quizzes-bm";
import { scienceF2C7QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C7FlashcardsBM } from "./flashcards-bm";
import { scienceF2C7FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C7MindMapBM } from "./mindmap-bm";
import { scienceF2C7MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 7 remediation — see
 * SCIENCE_F2_CH07_REMEDIATION_CHANGELOG.md.
 *
 * The chapter's blocker was a Jadual 9 mandatory experiment taught only as its
 * conclusions, and its sharpest correctness defect was the right-hand grip rule
 * stated with current as the output rather than the input. Both are locked here,
 * along with the meter-connection rule the chapter previously never stated.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by the
 * interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

const text = (v: unknown) => JSON.stringify(v);

/** Prose a learner reads as a statement — question stems and answers excluded. */
function assertedProse(c: ScienceF2InteractiveContent): string {
  const out: string[] = [];
  for (const s of c.sections) {
    if (s.intro) out.push(s.intro);
    for (const card of s.cards ?? []) out.push(card.title, card.body, card.detail ?? "");
    for (const a of s.accordions ?? []) out.push(a.title, a.body, a.detail ?? "");
    for (const t of s.tabs ?? []) out.push(t.title, t.body);
    for (const f of s.flipCards ?? []) out.push(f.label, f.fact);
  }
  return out.join(" \n ");
}

// ---------------------------------------------------------------- A. COVERAGE

describe("Chapter 7 — structure and SP teaching homes", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: notes are split into 9-11 sections, not the original 3`, () => {
      expect(content.sections.length).toBeGreaterThanOrEqual(9);
      expect(content.sections.length).toBeLessThanOrEqual(11);
    });

    it(`${lang}: every section has a title and at least one learning block`, () => {
      for (const s of content.sections) {
        expect(s.title.trim().length).toBeGreaterThan(0);
        const hasBlock =
          s.cards || s.flipCards || s.tabs || s.accordions || s.calculators ||
          s.circuitMeterDiagram || s.seriesParallel || s.magnetFieldDiagram ||
          s.currentFieldPatterns || s.apparatusDiagram || s.miniExperiment;
        expect(hasBlock, `section "${s.title}" has no learning block`).toBeTruthy();
      }
    });

    it(`${lang}: energy sources are taught, and kept distinct from forms`, () => {
      const prose = assertedProse(content);
      const sources = lang === "bm"
        ? ["Matahari", "angin", "radioaktif", "fosil", "geoterma", "biojisim", "ombak"]
        : ["sun", "wind", "radioactive", "fossil", "geothermal", "biomass", "wave"];
      for (const s of sources) expect(prose).toMatch(new RegExp(s, "i"));
      expect(prose).toMatch(
        lang === "bm" ? /[Ss]umber tenaga ialah dari mana/ : /source of energy is where/i,
      );
    });

    it(`${lang}: the three missing electrostatic applications are taught`, () => {
      const prose = assertedProse(content);
      expect(prose).toMatch(/Faraday/);
      expect(prose).toMatch(lang === "bm" ? /petrol/i : /refuel|petrol/i);
      expect(prose).toMatch(lang === "bm" ? /cuaca kering|kelembapan|wap air/i : /dry weather|humid|water vapour/i);
    });

    it(`${lang}: the Faraday explanation does not credit rubber tyres`, () => {
      const prose = assertedProse(content);
      expect(prose).toMatch(lang === "bm" ? /bukan daripada tayar getah/i : /not from the rubber tyres/i);
    });

    it(`${lang}: conventional current and electron direction are both given, and opposed`, () => {
      const prose = assertedProse(content);
      expect(prose).toMatch(lang === "bm" ? /positif ke terminal negatif/i : /positive terminal to the negative/i);
      expect(prose).toMatch(lang === "bm" ? /negatif ke terminal positif/i : /negative terminal to the positive/i);
    });
  }

  it("BM and DLP stay in lockstep on section count and order", () => {
    expect(scienceF2C7InteractiveDLP.sections.length).toBe(scienceF2C7InteractiveBM.sections.length);
    expect(scienceF2C7InteractiveDLP.sections.map((s) => s.number)).toEqual(
      scienceF2C7InteractiveBM.sections.map((s) => s.number),
    );
  });

  it("BM and DLP carry the same block types in the same sections", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        ([
          "cards", "flipCards", "tabs", "accordions", "calculators",
          "circuitMeterDiagram", "seriesParallel", "magnetFieldDiagram",
          "currentFieldPatterns", "apparatusDiagram", "miniExperiment",
        ] as const).filter((k) => s[k] !== undefined).join(","),
      );
    expect(shape(scienceF2C7InteractiveDLP)).toEqual(shape(scienceF2C7InteractiveBM));
  });
});

// ------------------------------------------------------------- B. CORRECTNESS

describe("Chapter 7 — meter connections", () => {
  for (const [lang, content] of LANGS) {
    const blk = content.sections.find((s) => s.circuitMeterDiagram)?.circuitMeterDiagram;

    it(`${lang}: a circuit meter diagram exists`, () => {
      expect(blk, "no circuitMeterDiagram block").toBeTruthy();
      expect(blk!.labels.map((l) => l.id).sort()).toEqual([
        "ammeter", "bulb", "cell", "switch", "voltmeter",
      ]);
    });

    it(`${lang}: the ammeter is stated as SERIES`, () => {
      const a = blk!.labels.find((l) => l.id === "ammeter")!;
      expect(a.note).toMatch(lang === "bm" ? /BERSIRI/ : /IN SERIES/i);
      expect(a.note).not.toMatch(lang === "bm" ? /SELARI/ : /IN PARALLEL/i);
    });

    it(`${lang}: the voltmeter is stated as PARALLEL`, () => {
      const v = blk!.labels.find((l) => l.id === "voltmeter")!;
      expect(v.note).toMatch(lang === "bm" ? /SELARI/ : /IN PARALLEL/i);
      expect(v.note).not.toMatch(lang === "bm" ? /BERSIRI/ : /IN SERIES/i);
    });

    it(`${lang}: the rule caption states both connections`, () => {
      expect(blk!.ruleCaption).toMatch(lang === "bm" ? /BERSIRI/ : /SERIES/i);
      expect(blk!.ruleCaption).toMatch(lang === "bm" ? /SELARI/ : /PARALLEL/i);
    });

    it(`${lang}: the quantity cards carry the connection too`, () => {
      const prose = assertedProse(content);
      expect(prose).toMatch(lang === "bm" ? /ammeter · Sambungan: bersiri/i : /ammeter · Connection: in series/i);
      expect(prose).toMatch(lang === "bm" ? /voltmeter · Sambungan: selari/i : /voltmeter · Connection: in parallel/i);
    });
  }
});

describe("Chapter 7 — Ohm's Law and circuit formulas", () => {
  for (const [lang, content] of LANGS) {
    const prose = assertedProse(content);

    it(`${lang}: V = IR is stated with its rearrangements`, () => {
      expect(prose).toMatch(/V = IR/);
      expect(prose).toMatch(/I = V ÷ R/);
      expect(prose).toMatch(/R = V ÷ I/);
    });

    it(`${lang}: series and parallel formulas are correct`, () => {
      const sp = content.sections.find((s) => s.seriesParallel)?.seriesParallel;
      expect(sp, "no seriesParallel block").toBeTruthy();
      const series = sp!.kinds.find((k) => k.id === "series")!;
      const parallel = sp!.kinds.find((k) => k.id === "parallel")!;
      expect(series.currentRule).toBe("I = I₁ = I₂");
      expect(series.voltageRule).toBe("V = V₁ + V₂");
      expect(series.resistanceRule).toBe("R = R₁ + R₂");
      expect(parallel.currentRule).toBe("I = I₁ + I₂");
      expect(parallel.voltageRule).toBe("V = V₁ = V₂");
      expect(parallel.resistanceRule).toBe("1/R = 1/R₁ + 1/R₂");
    });

    it(`${lang}: household wiring is attributed to parallel`, () => {
      expect(prose).toMatch(lang === "bm" ? /rumah menggunakan litar selari/i : /wiring uses parallel/i);
    });
  }
});

describe("Chapter 7 — magnetism", () => {
  for (const [lang, content] of LANGS) {
    const mf = content.sections.find((s) => s.magnetFieldDiagram)?.magnetFieldDiagram;
    const cf = content.sections.find((s) => s.currentFieldPatterns)?.currentFieldPatterns;

    it(`${lang}: the magnet field diagram covers all required shapes`, () => {
      expect(mf, "no magnetFieldDiagram block").toBeTruthy();
      expect(mf!.shapes.map((s) => s.id).sort()).toEqual([
        "bar", "horseshoe", "like-poles", "magnadur",
      ]);
    });

    it(`${lang}: field-line properties include direction, spacing, never-cross and neutral point`, () => {
      expect(mf!.features.map((f) => f.id).sort()).toEqual([
        "density", "direction", "neutral", "no-cross",
      ]);
      const dir = mf!.features.find((f) => f.id === "direction")!;
      expect(dir.note).toMatch(lang === "bm" ? /utara ke kutub selatan/i : /north pole to the south/i);
      const neutral = mf!.features.find((f) => f.id === "neutral")!;
      expect(neutral.note).toMatch(lang === "bm" ? /titik neutral/i : /neutral point/i);
    });

    it(`${lang}: the right-hand grip rule takes CURRENT as input and FIELD as output`, () => {
      expect(cf, "no currentFieldPatterns block").toBeTruthy();
      const [first, second] = cf!.gripRule.steps;
      // step 1 must be about the thumb and the current
      expect(first).toMatch(lang === "bm" ? /ibu jari/i : /thumb/i);
      expect(first).toMatch(lang === "bm" ? /arus/i : /current/i);
      // step 2 must be about the fingers and the field
      expect(second).toMatch(lang === "bm" ? /jari/i : /fingers/i);
      expect(second).toMatch(lang === "bm" ? /medan magnet/i : /magnetic field/i);
      // and the inverted phrasing must not reappear anywhere in asserted prose
      expect(assertedProse(content)).not.toMatch(
        lang === "bm"
          ? /[Ll]engkungkan jari[^.]{0,50}arah medan magnet/
          : /[Cc]url your right hand's fingers in the direction of the magnetic field/,
      );
    });

    it(`${lang}: straight, loop and solenoid patterns are all present`, () => {
      expect(cf!.conductors.map((c) => c.id).sort()).toEqual(["loop", "solenoid", "straight"]);
      const straight = cf!.conductors.find((c) => c.id === "straight")!;
      expect(straight.pattern).toMatch(lang === "bm" ? /bulatan sepusat/i : /concentric circles/i);
    });

    it(`${lang}: reversing current changes direction but not pattern`, () => {
      expect(cf!.keyPoint).toMatch(lang === "bm" ? /ARAH medan magnet/ : /DIRECTION of the magnetic field/);
      expect(cf!.keyPoint).toMatch(lang === "bm" ? /corak.{0,30}kekal sama/i : /pattern.{0,30}stays the same/i);
    });

    it(`${lang}: the distance relationship is NOT attached to the turns factor`, () => {
      const exp = content.sections.find((s) => s.miniExperiment)?.miniExperiment;
      const turns = exp!.parts.find((p) => p.id === "turns")!;
      expect(turns.conclusion).not.toMatch(lang === "bm" ? /jauh|jarak/i : /distance|further/i);
    });
  }
});

// -------------------------------------------------------------- C. EXPERIMENT

describe("Chapter 7 — mandatory DSKP experiment", () => {
  for (const [lang, content] of LANGS) {
    const exp = content.sections.find((s) => s.miniExperiment)?.miniExperiment;

    it(`${lang}: the investigation exists with both parts`, () => {
      expect(exp, "no miniExperiment block").toBeTruthy();
      expect(exp!.parts.map((p) => p.id).sort()).toEqual(["current", "turns"]);
    });

    it(`${lang}: Part A — current: hypothesis and all three variables`, () => {
      const a = exp!.parts.find((p) => p.id === "current")!;
      expect(a.hypothesis).toMatch(lang === "bm" ? /[Ss]emakin besar arus/ : /greater the current/i);
      expect(a.manipulated).toMatch(lang === "bm" ? /^Arus$/i : /^Current$/i);
      expect(a.responding).toMatch(lang === "bm" ? /jarum peniti/i : /pins attracted/i);
      expect(a.controlled).toMatch(/10/);
      expect(a.method.join(" ")).toMatch(/0\.5 A/);
      expect(a.method.join(" ")).toMatch(/2\.5 A/);
    });

    it(`${lang}: Part B — turns: hypothesis and all three variables`, () => {
      const b = exp!.parts.find((p) => p.id === "turns")!;
      expect(b.hypothesis).toMatch(lang === "bm" ? /[Ss]emakin banyak bilangan lilitan/ : /greater the number of coil turns/i);
      expect(b.manipulated).toMatch(lang === "bm" ? /lilitan/i : /coil turns/i);
      expect(b.responding).toMatch(lang === "bm" ? /jarum peniti/i : /pins attracted/i);
      expect(b.controlled).toMatch(/0\.5 A/);
      expect(b.method.join(" ")).toMatch(/50/);
    });

    it(`${lang}: the two parts manipulate different variables and control the other`, () => {
      const a = exp!.parts.find((p) => p.id === "current")!;
      const b = exp!.parts.find((p) => p.id === "turns")!;
      expect(a.manipulated).not.toBe(b.manipulated);
      expect(a.responding).toBe(b.responding);
    });

    it(`${lang}: source apparatus terms are used`, () => {
      const app = exp!.parts.map((p) => p.apparatus + " " + p.materials).join(" ");
      const terms = lang === "bm"
        ? ["ammeter", "reostat", "piring Petri", "rod besi", "dawai kuprum", "jarum peniti", "kaki retort"]
        : ["ammeter", "rheostat", "Petri dish", "iron rod", "copper wire", "pins", "retort stand"];
      for (const t of terms) expect(app).toMatch(new RegExp(t, "i"));
    });

    it(`${lang}: conclusions state the direction of each effect`, () => {
      for (const p of exp!.parts) {
        expect(p.conclusion.trim().length).toBeGreaterThan(15);
        expect(p.observation.trim().length).toBeGreaterThan(15);
      }
    });

    it(`${lang}: an apparatus diagram accompanies the investigation`, () => {
      const ap = content.sections.find((s) => s.apparatusDiagram)?.apparatusDiagram;
      expect(ap, "no apparatusDiagram block").toBeTruthy();
      const ids = ap!.parts.map((p) => p.id).sort();
      for (const need of ["ammeter", "coil", "pins", "rheostat", "rod", "supply", "switch"]) {
        expect(ids, `apparatus missing ${need}`).toContain(need);
      }
    });

    it(`${lang}: no pin counts are fabricated`, () => {
      // The source gives no pin dataset, so the chapter must stay qualitative.
      const blob = text(exp);
      expect(blob).not.toMatch(/\d+\s*(jarum peniti|pins)\b/i);
    });
  }
});

// ----------------------------------------------------------------- D. LEAKAGE

describe("Chapter 7 — no learner-facing source leakage", () => {
  const SURFACES: [string, unknown][] = [
    ["interactive bm", scienceF2C7InteractiveBM],
    ["interactive dlp", scienceF2C7InteractiveDLP],
    ["quizzes bm", scienceF2C7QuizzesBM],
    ["quizzes dlp", scienceF2C7QuizzesDLP],
    ["flashcards bm", scienceF2C7FlashcardsBM],
    ["flashcards dlp", scienceF2C7FlashcardsDLP],
    ["mindmap bm", scienceF2C7MindMapBM],
    ["mindmap dlp", scienceF2C7MindMapDLP],
  ];

  for (const [name, surface] of SURFACES) {
    it(`${name}: no textbook experiment/activity numbers`, () => {
      const t = text(surface);
      // "Activities 7.7" must trip too, so the plural is matched explicitly.
      expect(t, `${name} leaks a numbered reference`).not.toMatch(
        /(Eksperimen|Aktiviti|Experiments?|Activit(y|ies)|Rajah|Jadual)\s*\d+(\.\d+)?/i,
      );
    });

    it(`${name}: no curriculum metadata`, () => {
      const t = text(surface);
      expect(t).not.toMatch(/DSKP|Standard Pembelajaran|Standard Kandungan/i);
      expect(t).not.toMatch(/\b7\.\d\.\d\b/);
    });
  }
});

// ------------------------------------------------------------------ E. PARITY

describe("Chapter 7 — assessment and parity", () => {
  const QUIZZES: [string, typeof scienceF2C7QuizzesBM][] = [
    ["bm", scienceF2C7QuizzesBM],
    ["dlp", scienceF2C7QuizzesDLP],
  ];

  for (const [lang, quiz] of QUIZZES) {
    it(`${lang}: 30 items, every answer index in range, ids unique`, () => {
      expect(quiz).toHaveLength(30);
      const ids = new Set<string>();
      for (const q of quiz) {
        expect(q.answerIndex, `${q.id} answerIndex`).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, `${q.id} answerIndex`).toBeLessThan(q.options.length);
        expect(ids.has(q.id), `duplicate quiz id ${q.id}`).toBe(false);
        ids.add(q.id);
      }
    });

    it(`${lang}: difficulty stays balanced at 10/10/10`, () => {
      const count = (d: string) => quiz.filter((q) => q.difficulty === d).length;
      expect(count("Easy")).toBe(10);
      expect(count("Medium")).toBe(10);
      expect(count("Hard")).toBe(10);
    });

    it(`${lang}: the newly required areas are assessed`, () => {
      const t = text(quiz);
      expect(t, "ammeter connection not assessed").toMatch(lang === "bm" ? /bersiri dengan mentol/i : /series with the bulb/i);
      expect(t, "voltmeter connection not assessed").toMatch(lang === "bm" ? /selari dengan mentol/i : /parallel with the bulb/i);
      expect(t, "Faraday not assessed").toMatch(/Faraday|badan logam|metal body/i);
      expect(t, "neutral point not assessed").toMatch(lang === "bm" ? /titik neutral/i : /neutral point/i);
      expect(t, "experiment variables not assessed").toMatch(lang === "bm" ? /dimalarkan/i : /controlled variable/i);
    });

    it(`${lang}: the fire-alarm item now keys to parallel`, () => {
      const item = quiz.find((q) => /penggera kebakaran|fire alarm/i.test(q.question));
      if (item) {
        expect(item.options[item.answerIndex]).toMatch(lang === "bm" ? /selari/i : /parallel/i);
      }
    });
  }

  it("the notes' fire-alarm answer is parallel, not series", () => {
    for (const [lang, content] of LANGS) {
      const check = content.sections
        .flatMap((s) => s.checks)
        .find((c) => /penggera kebakaran|fire alarm/i.test(c.question));
      expect(check, `${lang} fire-alarm check missing`).toBeTruthy();
      expect(check!.hint).toMatch(lang === "bm" ? /[Ll]itar selari/ : /parallel circuit/i);
    }
  });

  it("flashcards and mind maps stay in parity", () => {
    expect(scienceF2C7FlashcardsDLP.length).toBe(scienceF2C7FlashcardsBM.length);
    const count = (n: unknown): number => {
      const node = n as { children?: unknown[] };
      return 1 + (node.children ?? []).reduce<number>((a, c) => a + count(c), 0);
    };
    expect(count(scienceF2C7MindMapDLP)).toBe(count(scienceF2C7MindMapBM));
  });

  it("mind-map node ids are unique in both languages", () => {
    const ids = (n: unknown, acc: string[] = []): string[] => {
      const node = n as { id: string; children?: unknown[] };
      acc.push(node.id);
      for (const c of node.children ?? []) ids(c, acc);
      return acc;
    };
    for (const [lang, map] of [["bm", scienceF2C7MindMapBM], ["dlp", scienceF2C7MindMapDLP]] as const) {
      const all = ids(map);
      expect(new Set(all).size, `${lang} mind map has duplicate node ids`).toBe(all.length);
    }
  });

  it("mind maps carry the newly added concepts", () => {
    for (const [lang, map] of [["bm", scienceF2C7MindMapBM], ["dlp", scienceF2C7MindMapDLP]] as const) {
      const t = text(map);
      expect(t, `${lang} missing neutral point`).toMatch(lang === "bm" ? /[Tt]itik neutral/ : /[Nn]eutral point/);
      expect(t, `${lang} missing Faraday`).toMatch(/Faraday/);
      expect(t, `${lang} missing meter connection`).toMatch(lang === "bm" ? /BERSIRI/ : /IN SERIES/);
    }
  });
});

// ------------------------------------------------- H. POST-GATE FIXES (N-01/N-02)

/**
 * The final release gate found the bar-magnet diagram drawing its two lower
 * external field lines from S to N, contradicting its own caption, and found
 * 86/86 tests passing because not one of them looked at an arrow. These guards
 * close that gap: they assert the drawn direction against the drawn poles, so
 * they fail if either the arrows or the poles move independently.
 */
describe("N-01 — bar magnet external field direction", () => {
  const northCentre = (BAR_MAGNET_POLES.north.x1 + BAR_MAGNET_POLES.north.x2) / 2;
  const southCentre = (BAR_MAGNET_POLES.south.x1 + BAR_MAGNET_POLES.south.x2) / 2;

  /** Unit vector an arrowhead points along, from its rotation in degrees. */
  const heading = (deg: number) => ({
    x: Math.cos((deg * Math.PI) / 180),
    y: Math.sin((deg * Math.PI) / 180),
  });

  const magnetBlock = (c: ScienceF2InteractiveContent) =>
    c.sections.find((s) => s.magnetFieldDiagram)?.magnetFieldDiagram;

  it("the two poles are horizontally separated, N left of S", () => {
    expect(southCentre).toBeGreaterThan(northCentre);
  });

  it("every external arrowhead points from the north pole toward the south pole", () => {
    expect(BAR_FIELD_ARCS).toHaveLength(4);
    for (const arc of BAR_FIELD_ARCS) {
      const h = heading(arc.deg);
      // Horizontal at the arc midpoint, and heading the way S lies from N.
      expect(Math.abs(h.y), `arc ${arc.d} is not horizontal at its arrowhead`).toBeLessThan(1e-6);
      expect(
        Math.sign(h.x),
        `arc ${arc.d} points away from the south pole (deg=${arc.deg})`,
      ).toBe(Math.sign(southCentre - northCentre));
    }
  });

  it("the arcs below the magnet point the same way as the arcs above it", () => {
    const magnetMidY = BAR_MAGNET_RECT.y + BAR_MAGNET_RECT.h / 2;
    const above = BAR_FIELD_ARCS.filter((a) => a.a[1] < magnetMidY);
    const below = BAR_FIELD_ARCS.filter((a) => a.a[1] > magnetMidY);
    expect(above.length, "expected arcs drawn above the magnet").toBeGreaterThan(0);
    expect(below.length, "expected arcs drawn below the magnet").toBeGreaterThan(0);
    // The loop under the magnet is not a mirror image — it still runs N -> S.
    for (const arc of below) {
      expect(arc.deg, "a lower arc regressed to the reversed direction").toBe(above[0].deg);
    }
  });

  it("the arrowhead glyph itself points along its own +x axis", () => {
    // Guards the other half of the pair: flipping the path would reverse every
    // arrow on the diagram without any rotation value changing.
    const markup = renderToStaticMarkup(
      <MagnetFieldDiagram block={magnetBlock(scienceF2C7InteractiveBM)!} lang="bm" />,
    );
    const glyph = markup.match(/d="M-?[\d.]+,-?[\d.]+ L(-?[\d.]+),(-?[\d.]+) L-?[\d.]+,-?[\d.]+ Z"/);
    expect(glyph, "arrowhead glyph not found in the rendered diagram").not.toBeNull();
    expect(Number(glyph![1]), "arrowhead apex is no longer on the +x side").toBeGreaterThan(0);
    expect(Number(glyph![2]), "arrowhead apex is no longer on the centre line").toBe(0);
  });

  for (const [lang, content] of LANGS) {
    it(`${lang} renders the bar magnet by default with no reversed arrow`, () => {
      const block = magnetBlock(content);
      expect(block, `${lang} has no magnet field diagram`).toBeTruthy();
      expect(block!.shapes[0].id, `${lang} does not open on the bar magnet`).toBe("bar");

      const markup = renderToStaticMarkup(
        <MagnetFieldDiagram block={block!} lang={lang === "dlp" ? "en" : "bm"} />,
      );
      const rotations = [...markup.matchAll(/rotate\((-?[\d.]+)\)/g)].map((m) => Number(m[1]));
      expect(rotations.length, `${lang} rendered no arrowheads`).toBe(BAR_FIELD_ARCS.length);
      for (const deg of rotations) {
        expect(deg % 360, `${lang} rendered an arrow pointing back toward the north pole`).not.toBe(180);
      }
      expect(new Set(rotations).size, `${lang} arrows disagree with each other`).toBe(1);
    });

    it(`${lang} caption and drawing agree on the field direction`, () => {
      const direction = magnetBlock(content)!.features.find((f) => f.id === "direction");
      expect(direction, `${lang} has no direction feature`).toBeTruthy();
      // Prose says N -> S; the geometry above asserts the arrows do the same.
      expect(direction!.note).toMatch(
        lang === "bm" ? /kutub utara ke kutub selatan/i : /north pole to (the )?south pole/i,
      );
    });
  }
});

/**
 * N-02 — the shared Ohm's Law calculator rendered "Infinity" at I = 0. Which
 * quantity is solved depends on which box is left empty, so zero is only
 * invalid for the two division branches; V = I x R must still accept it.
 */
describe("N-02 — Ohm's Law calculator zero-denominator handling", () => {
  const V = (v: string, i: string, r: string) => ({ v, i, r });

  it("keeps the known-good calculations unchanged", () => {
    expect(ohmsLawResult(V("12", "0.025", ""), "en")).toBe("R = 480.00 Ω");
    expect(ohmsLawResult(V("6", "", "3"), "en")).toBe("I = 2.000 A");
    expect(ohmsLawResult(V("", "2", "4"), "en")).toBe("V = 8.00 V");
    expect(ohmsLawResult(V("12", "0.025", ""), "bm")).toBe("R = 480.00 Ω");
    expect(ohmsLawResult(V("6", "", "3"), "bm")).toBe("I = 2.000 A");
    expect(ohmsLawResult(V("", "2", "4"), "bm")).toBe("V = 8.00 V");
  });

  it("intercepts R = V / I when the current is zero", () => {
    expect(ohmsLawResult(V("12", "0", ""), "en")).toBe(
      "Current must be greater than 0 A to calculate resistance.",
    );
    expect(ohmsLawResult(V("12", "0", ""), "bm")).toBe(
      "Arus mesti lebih besar daripada 0 A untuk mengira rintangan.",
    );
    expect(ohmsLawResult(V("12", "-0", ""), "en")).not.toMatch(/Infinity/);
  });

  it("intercepts I = V / R when the resistance is zero", () => {
    expect(ohmsLawResult(V("12", "", "0"), "en")).toBe(
      "Resistance must be greater than 0 Ω to calculate current.",
    );
    expect(ohmsLawResult(V("12", "", "0"), "bm")).toBe(
      "Rintangan mesti lebih besar daripada 0 Ω untuk mengira arus.",
    );
  });

  it("still allows zero where multiplication makes it mathematically valid", () => {
    expect(ohmsLawResult(V("", "0", "5"), "en")).toBe("V = 0.00 V");
    expect(ohmsLawResult(V("", "3", "0"), "en")).toBe("V = 0.00 V");
    expect(ohmsLawResult(V("", "0", "0"), "bm")).toBe("V = 0.00 V");
  });

  it("never shows Infinity, NaN or undefined for any input combination", () => {
    const samples = ["", " ", "0", "-0", "0.0", "12", "0.025", "-3", "1e400", "1e200", "abc"];
    for (const lang of ["en", "bm"] as const) {
      for (const v of samples) {
        for (const i of samples) {
          for (const r of samples) {
            const out = ohmsLawResult(V(v, i, r), lang);
            expect(out, `${lang} v=${v} i=${i} r=${r}`).not.toMatch(/Infinity|NaN|undefined/);
          }
        }
      }
    }
  });

  it("localises every message — no English leaking into BM", () => {
    const cases = [V("", "", ""), V("12", "0", ""), V("12", "", "0"), V("", "1e200", "1e200")];
    for (const c of cases) {
      const bm = ohmsLawResult(c, "bm");
      const en = ohmsLawResult(c, "en");
      expect(bm, `BM and EN returned the same message for ${JSON.stringify(c)}`).not.toBe(en);
      expect(bm).not.toMatch(/\b(must be|greater than|Fill in|too large)\b/);
    }
  });

  it("both languages accept and reject exactly the same inputs", () => {
    const samples = ["", "0", "-0", "12", "0.025", "5"];
    const isAnswer = (s: string) => /^[VIR] = /.test(s);
    for (const v of samples) {
      for (const i of samples) {
        for (const r of samples) {
          const en = ohmsLawResult(V(v, i, r), "en");
          const bm = ohmsLawResult(V(v, i, r), "bm");
          // A numeric answer is language-independent; a validation message is not.
          expect(isAnswer(en), `${v}/${i}/${r} disagree across languages`).toBe(isAnswer(bm));
          if (isAnswer(en)) expect(bm).toBe(en);
        }
      }
    }
  });
});

// ------------------------------------------------- I. POST-GATE FIX (N-04)

/**
 * N-04 — pole letters were hardcoded, so the DLP stream showed "U" (Utara) where
 * English convention is "N". The letter now comes from figureCopy, which means
 * these guards must exercise every view that draws one, in both languages, not
 * just the default view. Each view is forced to render by putting it first in
 * the shapes/conductors list, which is what the component's initial state reads.
 */
describe("N-04 — magnet pole label localization", () => {
  /** Every drawn pole letter, paired with its accessible name. */
  const poleLabels = (markup: string) =>
    [...markup.matchAll(/<text[^>]*aria-label="([^"]+)"[^>]*>([^<]*)<\/text>/g)].map((m) => ({
      name: m[1],
      letter: m[2],
    }));

  const magnetBlock = (c: ScienceF2InteractiveContent) =>
    c.sections.find((s) => s.magnetFieldDiagram)!.magnetFieldDiagram!;
  const patternsBlock = (c: ScienceF2InteractiveContent) =>
    c.sections.find((s) => s.currentFieldPatterns)!.currentFieldPatterns!;

  /** Render one magnet view by making it the initial shape. */
  const renderShape = (c: ScienceF2InteractiveContent, shapeId: string, lang: string) => {
    const block = magnetBlock(c);
    const target = block.shapes.find((s) => s.id === shapeId);
    expect(target, `missing shape ${shapeId}`).toBeTruthy();
    const reordered = {
      ...block,
      shapes: [target!, ...block.shapes.filter((s) => s.id !== shapeId)],
    };
    return renderToStaticMarkup(<MagnetFieldDiagram block={reordered} lang={lang} />);
  };

  const EXPECTED = {
    bm: { north: "U", south: "S", northName: "Kutub utara", southName: "Kutub selatan" },
    en: { north: "N", south: "S", northName: "North pole", southName: "South pole" },
  } as const;

  // lang as the route passes it: BM stream -> "bm", DLP stream -> "en".
  const STREAMS: [string, string, ScienceF2InteractiveContent][] = [
    ["BM", "bm", scienceF2C7InteractiveBM],
    ["DLP", "en", scienceF2C7InteractiveDLP],
  ];

  // Every magnet view, with how many of each pole it draws.
  const VIEWS: [string, number, number][] = [
    ["bar", 1, 1],
    ["horseshoe", 1, 1],
    ["magnadur", 1, 1],
    ["like-poles", 2, 2], // two magnets: outer poles N, inner poles S
  ];

  for (const [stream, lang, content] of STREAMS) {
    const want = EXPECTED[lang as "bm" | "en"];

    for (const [shapeId, nNorth, nSouth] of VIEWS) {
      it(`${stream} ${shapeId} draws ${want.north}/${want.south}`, () => {
        const markup = renderShape(content, shapeId, lang);
        const labels = poleLabels(markup);
        const north = labels.filter((l) => l.name === want.northName);
        const south = labels.filter((l) => l.name === want.southName);

        expect(north.length, `${stream} ${shapeId} north pole count`).toBe(nNorth);
        expect(south.length, `${stream} ${shapeId} south pole count`).toBe(nSouth);
        for (const l of north) {
          expect(l.letter, `${stream} ${shapeId} north letter`).toBe(want.north);
        }
        for (const l of south) {
          expect(l.letter, `${stream} ${shapeId} south letter`).toBe(want.south);
        }
      });
    }

    it(`${stream} solenoid draws ${want.north}/${want.south}`, () => {
      const block = patternsBlock(content);
      const sol = block.conductors.find((c) => c.id === "solenoid");
      expect(sol, `${stream} has no solenoid conductor`).toBeTruthy();
      const reordered = {
        ...block,
        conductors: [sol!, ...block.conductors.filter((c) => c.id !== "solenoid")],
      };
      const labels = poleLabels(renderToStaticMarkup(<CurrentFieldPatterns block={reordered} lang={lang} />));
      const north = labels.filter((l) => l.name === want.northName);
      const south = labels.filter((l) => l.name === want.southName);
      expect(north.length, `${stream} solenoid north pole`).toBe(1);
      expect(south.length, `${stream} solenoid south pole`).toBe(1);
      expect(north[0].letter).toBe(want.north);
      expect(south[0].letter).toBe(want.south);
    });
  }

  it("the DLP stream never renders the BM north-pole letter", () => {
    // The regression this guards: DLP falling back to "U" (Utara).
    for (const [shapeId] of VIEWS) {
      const labels = poleLabels(renderShape(scienceF2C7InteractiveDLP, shapeId, "en"));
      expect(labels.length, `DLP ${shapeId} drew no pole letters`).toBeGreaterThan(0);
      for (const l of labels) {
        expect(l.letter, `DLP ${shapeId} regressed to a BM pole letter`).not.toBe("U");
      }
    }
  });

  it("the BM stream never renders the English north-pole letter", () => {
    for (const [shapeId] of VIEWS) {
      const labels = poleLabels(renderShape(scienceF2C7InteractiveBM, shapeId, "bm"));
      for (const l of labels) {
        expect(l.letter, `BM ${shapeId} regressed to an English pole letter`).not.toBe("N");
      }
    }
  });

  it("no English accessibility text carries a BM pole name, and vice versa", () => {
    for (const [shapeId] of VIEWS) {
      const en = renderShape(scienceF2C7InteractiveDLP, shapeId, "en");
      expect(en, `DLP ${shapeId} leaked a BM pole name`).not.toMatch(/aria-label="Kutub/);
      const bm = renderShape(scienceF2C7InteractiveBM, shapeId, "bm");
      expect(bm, `BM ${shapeId} leaked an English pole name`).not.toMatch(/aria-label="(North|South) pole"/);
    }
  });

  it("the like-poles view still faces two south poles, so the neutral point stands", () => {
    // Physics guard: the neutral point only exists between like poles. If the
    // localization edit had flipped a magnet, the inner poles would differ.
    for (const [stream, lang, content] of STREAMS) {
      const want = EXPECTED[lang as "bm" | "en"];
      const labels = poleLabels(renderShape(content, "like-poles", lang));
      expect(labels.filter((l) => l.name === want.southName).length, `${stream} inner poles`).toBe(2);
      expect(labels.filter((l) => l.name === want.northName).length, `${stream} outer poles`).toBe(2);
    }
  });

  it("localizing the letters did not move any pole or arrow (N-01 intact)", () => {
    for (const [stream, lang, content] of STREAMS) {
      const markup = renderShape(content, "bar", lang);
      // Pole rectangles unchanged: N red on the left, S blue on the right.
      const rects = [...markup.matchAll(/<rect x="(\d+)"[^>]*fill="(#d4544a|#4a7fd4)"/g)].map((m) => ({
        x: Number(m[1]),
        pole: m[2] === "#d4544a" ? "N" : "S",
      }));
      const N = rects.find((r) => r.pole === "N")!;
      const S = rects.find((r) => r.pole === "S")!;
      expect(N.x, `${stream} north pole moved`).toBe(BAR_MAGNET_POLES.north.x1);
      expect(S.x, `${stream} south pole moved`).toBe(BAR_MAGNET_POLES.south.x1);
      expect(N.x, `${stream} poles swapped sides`).toBeLessThan(S.x);
      // Arrow directions unchanged.
      const rotations = [...markup.matchAll(/rotate\((-?[\d.]+)\)/g)].map((m) => Number(m[1]));
      expect(rotations.length, `${stream} arrowhead count changed`).toBe(BAR_FIELD_ARCS.length);
      for (const deg of rotations) {
        expect(deg % 360, `${stream} arrow direction regressed`).not.toBe(180);
      }
    }
  });
});
