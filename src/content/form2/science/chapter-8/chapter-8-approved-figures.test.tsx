import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { DepthPressure } from "@/components/notes/blocks/DepthPressure";
import {
  CHAPTER8_IMAGES,
  CHAPTER8_IMAGE_LIST,
  chapter8ImageAspect,
  chapter8ImageSize,
} from "@/components/notes/chapter8/chapter8-assets";
import {
  ACTION_REACTION_SITUATIONS,
  CHAPTER8_HOTSPOT_GEOMETRY,
  CHAPTER8_VISUAL_ASSETS,
  Chapter8ContextFigure,
  EFFECTS_PANEL_ORDER,
  TYPES_FORCE_CUES,
  TYPES_PANEL_ORDER,
  chapter8Concepts,
  forceCueHead,
  type Chapter8FigureKind,
} from "@/components/notes/chapter8/Chapter8ContextFigure";
import type { ScienceF2InteractiveContent } from "../interactive-types";
import { scienceF2C8InteractiveBM } from "./interactive-bm";
import { scienceF2C8InteractiveDLP } from "./interactive-dlp";

/**
 * Guards the four approved Chapter 8 figures — types of forces, effects of
 * force, the action–reaction triptych, and the diver.
 *
 * What has to hold:
 *
 *  1. **One file per figure, shared by both languages.** None of the artwork
 *     carries a baked-in word, so BM and DLP must reference the identical WebP
 *     and differ only in the strings around it.
 *  2. **Every painted panel is a real state, and every state has a panel.** The
 *     two figures this pass replaced each had a panel set that did not match the
 *     teaching: four force examples for six core forces (one of them magnetic,
 *     which is enrichment), and four effect panels for five effects. That
 *     mismatch is what pushed the missing concepts into lesser treatments.
 *  3. **Nothing is taught twice.** No separate plasticine figure beside a scene
 *     that already paints it; no retired artwork still rendered.
 *  4. **The remediated content underneath is untouched** — six forces, five
 *     effects, three liquid-pressure applications, and the depth-and-jet figure.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C8InteractiveBM],
  ["dlp", scienceF2C8InteractiveDLP],
];

const DIR = "public/science/form2/chapter-8";

const APPROVED = [
  CHAPTER8_IMAGES.typesOfForces,
  CHAPTER8_IMAGES.effectsOfForce,
  CHAPTER8_IMAGES.actionReactionPairs,
  CHAPTER8_IMAGES.diverLiquidPressure,
];

/** Artwork this pass and the one before it took out of service. */
const RETIRED = [
  "01_effects_of_force.webp",
  "05_types_of_forces.webp",
  "06_action_reaction_palms_touching.webp",
  "science-f2-ch8-force-changes-shape.webp",
];

const sectionWith = <K extends keyof ScienceF2InteractiveContent["sections"][number]>(
  content: ScienceF2InteractiveContent,
  key: K,
) => content.sections.find((section) => section[key] !== undefined)!;

const sectionTitled = (content: ScienceF2InteractiveContent, re: RegExp) =>
  content.sections.find((section) => re.test(section.title))!;

const typesSection = (content: ScienceF2InteractiveContent) =>
  sectionTitled(content, /types of forces|jenis-jenis daya/i);
const effectsSection = (content: ScienceF2InteractiveContent) =>
  sectionTitled(content, /effects of force|kesan daya/i);

/** The sectioned shell renders one section body at a time, so render per section. */
function markupOf(content: ScienceF2InteractiveContent, lang: "bm" | "en") {
  return content.sections
    .map((section) =>
      renderToStaticMarkup(
        createElement(ScienceF2InteractiveNotesBlock, {
          content: { ...content, sections: [section] },
          lang,
        }),
      ),
    )
    .join("");
}

/**
 * The sectioned shell only server-renders the ACTIVE section, which is always
 * the first — so figures keyed by section index are asserted on the figure
 * component itself, the pattern the rest of this suite uses.
 */
function figureMarkup(
  kind: Chapter8FigureKind,
  content: ScienceF2InteractiveContent,
  lang: "bm" | "en",
  initialSelection: string | null,
) {
  const section =
    kind === "types"
      ? typesSection(content)
      : kind === "effects"
        ? effectsSection(content)
        : sectionWith(content, "actionReactionPairs");
  return renderToStaticMarkup(
    createElement(Chapter8ContextFigure, { kind, section, lang, initialSelection }),
  );
}

function html(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ---------------------------------------------------------------- A. THE FILES

describe("Chapter 8 approved figures — files and registration", () => {
  it.each(APPROVED)("%s exists on disk, as WebP, and is not empty", (url) => {
    expect(url.endsWith(".webp"), url).toBe(true);
    const file = path.join(DIR, path.basename(url));
    expect(existsSync(file), "missing asset: " + file).toBe(true);
    expect(statSync(file).size, url).toBeGreaterThan(10000);
  });

  it("registers all four, each exactly once", () => {
    for (const url of APPROVED) {
      expect(CHAPTER8_IMAGE_LIST).toContain(url);
      expect(CHAPTER8_IMAGE_LIST.filter((entry) => entry === url)).toHaveLength(1);
    }
  });

  it("ships no PNG beside any of them", () => {
    // The source PNGs are inputs, not production assets.
    for (const url of APPROVED) {
      const png = path.join(DIR, path.basename(url).replace(/\.webp$/, ".png"));
      expect(existsSync(png), png).toBe(false);
    }
  });

  it("has no broken registered image reference — every entry is a real file", () => {
    for (const url of CHAPTER8_IMAGE_LIST) {
      const file = path.join(DIR, path.basename(url));
      expect(existsSync(file), "registered but missing: " + url).toBe(true);
    }
  });

  it.each(RETIRED)("%s is no longer registered or served to a figure", (name) => {
    expect(CHAPTER8_IMAGE_LIST.some((url) => url.includes(name))).toBe(false);
    expect(Object.values(CHAPTER8_VISUAL_ASSETS).some((url) => url.includes(name))).toBe(false);
  });

  it("declares the right natural size for each approved figure", () => {
    // A frame that does not match its artwork letterboxes it, and every
    // percentage hotspot on that artwork then points at the wrong place.
    for (const key of ["typesOfForces", "effectsOfForce", "diverLiquidPressure"] as const) {
      expect(chapter8ImageSize(key), key).toEqual({ width: 1672, height: 941 });
      expect(chapter8ImageAspect(key), key).toBeUndefined();
    }
    // the triptych is the one panorama
    expect(chapter8ImageSize("actionReactionPairs")).toEqual({ width: 2048, height: 768 });
    expect(chapter8ImageAspect("actionReactionPairs")).toBe("2048 / 768");
  });

  it("keeps the approved files in the chapter's own asset directory", () => {
    for (const url of APPROVED) expect(url.startsWith("/science/form2/chapter-8/")).toBe(true);
    const shipped = readdirSync(DIR);
    for (const url of APPROVED) expect(shipped).toContain(path.basename(url));
  });
});

// -------------------------------------------------------- B. ONE FILE, TWO LANGUAGES

describe("Chapter 8 approved figures — BM and DLP share the artwork, not the words", () => {
  it("uses the identical file for each figure, in both languages", () => {
    // The figure resolves its own artwork by kind, so the two languages cannot
    // drift onto different files for types, effects or action-reaction.
    expect(CHAPTER8_VISUAL_ASSETS.types).toBe(CHAPTER8_IMAGES.typesOfForces);
    expect(CHAPTER8_VISUAL_ASSETS.effects).toBe(CHAPTER8_IMAGES.effectsOfForce);
    expect(CHAPTER8_VISUAL_ASSETS["action-reaction"]).toBe(CHAPTER8_IMAGES.actionReactionPairs);
    for (const [, content] of LANGS) {
      const diver = sectionWith(content, "depthPressure").depthPressure!.applications.find(
        (a) => a.id === "diver",
      )!;
      expect(diver.image?.key).toBe("diverLiquidPressure");
    }
  });

  it("shares panel geometry, so a panel means the same thing in both languages", () => {
    for (const [, content] of LANGS) {
      for (const kind of ["types", "effects"] as const) {
        const section = kind === "types" ? typesSection(content) : effectsSection(content);
        const ids = chapter8Concepts(kind, section, "en").map((c) => c.id);
        expect(ids).toEqual(CHAPTER8_HOTSPOT_GEOMETRY[kind].map((g) => g.id));
      }
    }
  });

  it("writes its own alt text per language", () => {
    const source = readFileSync("src/components/notes/chapter8/Chapter8ContextFigure.tsx", "utf8");
    // Alt text is figure chrome, held in the component's own bilingual map.
    expect(source).toMatch(/Six examples of force/);
    expect(source).toMatch(/Enam contoh daya/);
    expect(source).toMatch(/Five effects of force/);
    expect(source).toMatch(/Lima kesan daya/);
  });

  it("keeps identical structure — same ids, same order, same counts", () => {
    const shape = (content: ScienceF2InteractiveContent) => ({
      forces: (typesSection(content).flipCards ?? []).map((c) => c.id),
      effects: (effectsSection(content).flipCards ?? []).map((c) => c.id),
      situations: sectionWith(content, "actionReactionPairs").actionReactionPairs!.situations.map(
        (s) => s.id,
      ),
      applications: sectionWith(content, "depthPressure").depthPressure!.applications.map((a) => [
        a.id,
        a.image?.key ?? null,
      ]),
    });
    expect(shape(scienceF2C8InteractiveBM)).toEqual(shape(scienceF2C8InteractiveDLP));
  });

  it("leaks neither language into the other", () => {
    const words = (content: ScienceF2InteractiveContent) =>
      [
        ...(typesSection(content).flipCards ?? []).flatMap((c) => [c.label, c.fact]),
        ...(effectsSection(content).flipCards ?? []).flatMap((c) => [c.label, c.fact]),
      ].join(" | ");
    const bm = words(scienceF2C8InteractiveBM);
    const dlp = words(scienceF2C8InteractiveDLP);
    for (const english of [/\bforce\b/i, /\bweight\b/i, /\bplasticine\b/i, /\bcrate\b/i]) {
      expect(bm, `BM carries ${english}`).not.toMatch(english);
    }
    for (const malay of [/\bdaya\b/i, /\bberat\b/i, /\bplastisin\b/i, /\bpeti\b/i]) {
      expect(dlp, `DLP carries ${malay}`).not.toMatch(malay);
    }
  });
});

// ------------------------------------------------------------- C. TYPES OF FORCES

describe("Chapter 8 approved figures — types of forces", () => {
  it("paints one panel per core force, in the chapter's own order", () => {
    expect([...TYPES_PANEL_ORDER]).toEqual([
      "gravitational",
      "weight",
      "normal",
      "frictional",
      "elastic",
      "buoyant",
    ]);
    expect(CHAPTER8_HOTSPOT_GEOMETRY.types.map((g) => g.id)).toEqual([...TYPES_PANEL_ORDER]);
  });

  for (const [lang, content] of LANGS) {
    it(`${lang}: all six forces are selector states, read from the section's own cards`, () => {
      const section = typesSection(content);
      const items = chapter8Concepts("types", section, lang === "bm" ? "bm" : "en");
      expect(items.map((item) => item.id)).toEqual([...TYPES_PANEL_ORDER]);
      const byId = Object.fromEntries((section.flipCards ?? []).map((c) => [c.id, c]));
      for (const item of items) {
        // one source of truth: the label and definition come from the card
        expect(item.label, item.id).toBe(byId[item.id].label);
        expect(item.note, item.id).toBe(byId[item.id].fact);
        expect(item.note.trim().length, item.id).toBeGreaterThan(25);
      }
    });

    it(`${lang}: magnetic force is not one of the six states and has no panel`, () => {
      const items = chapter8Concepts("types", typesSection(content), lang === "bm" ? "bm" : "en");
      expect(items.map((i) => i.id)).not.toContain("magnetic");
      expect(CHAPTER8_HOTSPOT_GEOMETRY.types.map((g) => g.id)).not.toContain("magnetic");
      expect(TYPES_FORCE_CUES.magnetic).toBeUndefined();
      // and the six core forces themselves still exclude it
      expect((typesSection(content).flipCards ?? []).map((c) => c.id)).not.toContain("magnetic");
    });

    it(`${lang}: the remediated definitions are unchanged`, () => {
      const byId = Object.fromEntries(
        (typesSection(content).flipCards ?? []).map((c) => [c.id, c.fact]),
      );
      const expected: Record<string, RegExp> =
        lang === "bm"
          ? {
              gravitational: /pusat [Bb]umi/,
              weight: /graviti/i,
              normal: /permukaan/i,
              frictional: /merintangi pergerakan/i,
              elastic: /diregang|dimampat/i,
              buoyant: /tujah/i,
            }
          : {
              gravitational: /centre of the Earth/i,
              weight: /gravitational force/i,
              normal: /surface/i,
              frictional: /opposes motion/i,
              elastic: /stretched or compressed/i,
              buoyant: /upward thrust/i,
            };
      for (const [id, re] of Object.entries(expected)) {
        expect(byId[id], id).toMatch(re);
      }
    });
  }

  it("gives a force vector only where one helps, and keeps it inside its panel", () => {
    for (const [id, cues] of Object.entries(TYPES_FORCE_CUES)) {
      const panel = CHAPTER8_HOTSPOT_GEOMETRY.types.find((g) => g.id === id)!;
      expect(panel, `cue for unknown panel ${id}`).toBeDefined();
      const left = panel.x - panel.w / 2;
      const right = panel.x + panel.w / 2;
      const top = panel.y - panel.h / 2;
      const bottom = panel.y + panel.h / 2;
      for (const cue of cues) {
        for (const x of [cue.x1, cue.x2]) {
          expect(x, `${id} x`).toBeGreaterThanOrEqual(left);
          expect(x, `${id} x`).toBeLessThanOrEqual(right);
        }
        for (const y of [cue.y1, cue.y2]) {
          expect(y, `${id} y`).toBeGreaterThanOrEqual(top);
          expect(y, `${id} y`).toBeLessThanOrEqual(bottom);
        }
        // axis aligned, so the stretched viewBox cannot skew it
        expect(cue.x1 === cue.x2 || cue.y1 === cue.y2, `${id} is diagonal`).toBe(true);
        expect(Math.hypot(cue.x2 - cue.x1, cue.y2 - cue.y1), `${id} has no length`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it("points weight down and normal force up — the pair learners conflate", () => {
    const [weight] = TYPES_FORCE_CUES.weight;
    const [normal] = TYPES_FORCE_CUES.normal;
    expect(weight.y2).toBeGreaterThan(weight.y1); // downward
    expect(normal.y2).toBeLessThan(normal.y1); // upward
    // gravitational pulls toward the Earth, buoyant force pushes up
    expect(TYPES_FORCE_CUES.gravitational[0].y2).toBeGreaterThan(
      TYPES_FORCE_CUES.gravitational[0].y1,
    );
    expect(TYPES_FORCE_CUES.buoyant[0].y2).toBeLessThan(TYPES_FORCE_CUES.buoyant[0].y1);
  });

  it("draws friction opposing the motion, not alongside it", () => {
    const [motion, friction] = TYPES_FORCE_CUES.frictional;
    expect(friction.opposing).toBe(true);
    expect(motion.opposing).toBeUndefined();
    // opposite horizontal senses
    expect(Math.sign(motion.x2 - motion.x1)).toBe(-Math.sign(friction.x2 - friction.x1));
  });

  it("pulls the elastic band back towards its unstretched length from both ends", () => {
    const [a, b] = TYPES_FORCE_CUES.elastic;
    // both point inwards, so neither reads as a push
    expect(Math.sign(a.x2 - a.x1)).toBe(-Math.sign(b.x2 - b.x1));
    expect(a.x1).toBeLessThan(b.x1);
    expect(a.x2).toBeGreaterThan(a.x1);
    expect(b.x2).toBeLessThan(b.x1);
  });

  it("draws an arrowhead at the head of the vector, whichever way it points", () => {
    expect(forceCueHead({ x1: 10, y1: 20, x2: 10, y2: 40 })).toContain("L10,40");
    expect(forceCueHead({ x1: 10, y1: 20, x2: 30, y2: 20 })).toContain("L30,20");
  });
});

// ------------------------------------------------------------ D. EFFECTS OF FORCE

describe("Chapter 8 approved figures — effects of force", () => {
  it("paints one panel per effect, in the chapter's own order", () => {
    expect([...EFFECTS_PANEL_ORDER]).toEqual(["moves", "stops", "speed", "direction", "shape"]);
    expect(CHAPTER8_HOTSPOT_GEOMETRY.effects.map((g) => g.id)).toEqual([...EFFECTS_PANEL_ORDER]);
  });

  for (const [lang, content] of LANGS) {
    const section = effectsSection(content);

    it(`${lang}: still exactly five effects, in order, and no sixth`, () => {
      expect((section.flipCards ?? []).map((card) => card.id)).toEqual([
        "moves",
        "stops",
        "speed",
        "direction",
        "shape",
      ]);
      expect(section.flipCards).toHaveLength(5);
      // exactly one Effects of Force section, not a duplicated one
      expect(
        content.sections.filter((s) => (s.flipCards ?? []).some((c) => c.id === "shape")),
      ).toHaveLength(1);
    });

    it(`${lang}: all five are states of ONE selector, read from the section's own cards`, () => {
      const items = chapter8Concepts("effects", section, lang === "bm" ? "bm" : "en");
      expect(items.map((item) => item.id)).toEqual([...EFFECTS_PANEL_ORDER]);
      const byId = Object.fromEntries((section.flipCards ?? []).map((c) => [c.id, c]));
      for (const item of items) {
        expect(item.label, item.id).toBe(byId[item.id].label);
        expect(item.note, item.id).toBe(byId[item.id].fact);
      }
    });

    it(`${lang}: each explanation leads with the concept, then the panel's own example`, () => {
      const byId = Object.fromEntries((section.flipCards ?? []).map((c) => [c.id, c.fact]));
      const marker = lang === "bm" ? "Contoh:" : "Example:";
      for (const id of EFFECTS_PANEL_ORDER) {
        expect(byId[id], id).toContain(marker);
        // the concept sentence comes first
        expect(byId[id].indexOf(marker), id).toBeGreaterThan(25);
      }
      // and the examples are what the artwork actually paints
      expect(byId.moves).toMatch(lang === "bm" ? /peti/i : /crate/i);
      expect(byId.stops).toMatch(lang === "bm" ? /brek basikal/i : /bicycle brakes/i);
      expect(byId.speed).toMatch(lang === "bm" ? /kereta/i : /car/i);
      expect(byId.direction).toMatch(lang === "bm" ? /raket tenis/i : /tennis racket/i);
      expect(byId.shape).toMatch(lang === "bm" ? /plastisin/i : /plasticine/i);
    });

    it(`${lang}: the fifth effect is named for shape AND size`, () => {
      const shape = (section.flipCards ?? []).find((c) => c.id === "shape")!;
      expect(shape.label).toMatch(lang === "bm" ? /bentuk dan saiz/i : /shape and size/i);
    });

    it(`${lang}: there is no separate plasticine block left beside the scene`, () => {
      // The five-panel scene paints the plasticine itself, so a second
      // before/after figure would teach the same effect twice.
      expect((section as Record<string, unknown>).forceShapeChange).toBeUndefined();
      expect(JSON.stringify(section)).not.toMatch(/Before force|Sebelum daya/i);
    });
  }

  it("no longer ships the standalone plasticine figure component", () => {
    expect(existsSync("src/components/notes/chapter8/Chapter8ShapeChangeFigure.tsx")).toBe(false);
    const source = readFileSync("src/components/notes/ScienceF2InteractiveNotesBlock.tsx", "utf8");
    expect(source).not.toContain("Chapter8ShapeChangeFigure");
    expect(source).not.toContain("forceShapeChange");
    // and the stand-in before/after sketch it once needed is gone too
    expect(source).not.toContain("ch8-shape-arrow");
  });
});

// ----------------------------------------------------------- E. PANEL GEOMETRY

describe("Chapter 8 approved figures — panel geometry", () => {
  const MULTI = ["types", "effects", "action-reaction"] as const;

  it.each(MULTI)("%s keeps every panel inside the artwork", (kind) => {
    for (const panel of CHAPTER8_HOTSPOT_GEOMETRY[kind]) {
      expect(panel.x - panel.w / 2, panel.id).toBeGreaterThanOrEqual(0);
      expect(panel.x + panel.w / 2, panel.id).toBeLessThanOrEqual(100);
      expect(panel.y - panel.h / 2, panel.id).toBeGreaterThanOrEqual(0);
      expect(panel.y + panel.h / 2, panel.id).toBeLessThanOrEqual(100);
    }
  });

  it.each(MULTI)("%s orders its panels left to right, without overlapping", (kind) => {
    const panels = CHAPTER8_HOTSPOT_GEOMETRY[kind];
    for (let i = 1; i < panels.length; i += 1) {
      const previous = panels[i - 1];
      const current = panels[i];
      expect(current.x, `${current.id} is left of ${previous.id}`).toBeGreaterThan(previous.x);
      expect(
        current.x - current.w / 2,
        `${current.id} overlaps ${previous.id}`,
      ).toBeGreaterThanOrEqual(previous.x + previous.w / 2 - 0.6);
    }
  });

  it.each(MULTI)("%s gives its panels an even pitch, as the artwork does", (kind) => {
    const xs = CHAPTER8_HOTSPOT_GEOMETRY[kind].map((p) => p.x);
    const pitches = xs.slice(1).map((x, i) => x - xs[i]);
    const mean = pitches.reduce((a, b) => a + b, 0) / pitches.length;
    for (const pitch of pitches) expect(Math.abs(pitch - mean)).toBeLessThan(0.6);
  });

  it("uses percentages throughout — no viewport-fixed pixels in the geometry", () => {
    for (const panel of Object.values(CHAPTER8_HOTSPOT_GEOMETRY).flat()) {
      for (const value of [panel.x, panel.y, panel.w, panel.h]) {
        expect(value).toBeGreaterThan(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
  });
});

// ------------------------------------------------------------------ F. THE DIVER

describe("Chapter 8 approved figures — the diver application", () => {
  for (const [lang, content] of LANGS) {
    const block = sectionWith(content, "depthPressure").depthPressure!;

    it(`${lang}: liquid pressure still teaches dam, submarine and diver`, () => {
      expect(block.applications.map((a) => a.id)).toEqual(["dam", "submarine", "diver"]);
    });

    it(`${lang}: only the diver carries approved artwork`, () => {
      const withImages = block.applications.filter((a) => a.image);
      expect(withImages.map((a) => a.id)).toEqual(["diver"]);
      expect(withImages[0].image!.key).toBe("diverLiquidPressure");
    });

    it(`${lang}: the depth-and-jet figure remains the concept visual`, () => {
      expect(block.levels.map((l) => l.id)).toEqual(["shallow", "middle", "deep"]);
      const markup = renderToStaticMarkup(
        createElement(DepthPressure, { block, lang: lang === "bm" ? "bm" : "en" }),
      );
      expect(markup).toContain("16_liquid_pressure_tank.webp");
      for (const level of block.levels) expect(markup).toContain(`data-jet="${level.id}"`);
      for (const application of block.applications) {
        expect(markup, application.id).toContain(`data-ch8-application="${application.id}"`);
      }
    });
  }
});

// --------------------------------------------------------------- G. THE TRIPTYCH

describe("Chapter 8 approved figures — action–reaction triptych", () => {
  for (const [lang, content] of LANGS) {
    const block = sectionWith(content, "actionReactionPairs").actionReactionPairs!;

    it(`${lang}: still teaches the three textbook situations with two forces each`, () => {
      expect(block.situations.map((s) => s.id)).toEqual(["book", "floating", "trolleys"]);
      for (const situation of block.situations) {
        expect(situation.forces, situation.id).toHaveLength(2);
      }
    });

    it(`${lang}: the floating block stays at equilibrium — F = W`, () => {
      const floating = block.situations.find((s) => s.id === "floating")!;
      expect(floating.note).toMatch(lang === "bm" ? /sama dengan berat/i : /equals its weight/i);
    });
  }

  it("keeps the pair equal in length for every situation", () => {
    for (const [id, arrows] of Object.entries(ACTION_REACTION_SITUATIONS)) {
      const [a, b] = arrows.map((arrow) => Math.hypot(arrow.x2 - arrow.x1, arrow.y2 - arrow.y1));
      expect(a, id).toBeCloseTo(b, 6);
    }
  });
});

// ---------------------------------------------------------------- H. RENDERING

describe("Chapter 8 approved figures — rendering", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C8InteractiveBM, "bm"],
    ["dlp", scienceF2C8InteractiveDLP, "en"],
  ];

  it.each(VIEWS)(
    "%s renders the six-panel types scene, not the retired artwork",
    (_name, content, lang) => {
      const markup = figureMarkup("types", content, lang, "weight");
      expect(markup).toContain(`src="${CHAPTER8_IMAGES.typesOfForces}"`);
      expect(markup).not.toContain("05_types_of_forces");
      expect(markup).toContain('width="1672"');
      expect(markup).toContain('loading="eager"');
      expect(markup).toContain("object-contain");
      // one hotspot and one control per core force
      for (const id of TYPES_PANEL_ORDER) {
        expect(markup, id).toContain(`data-ch8-hotspot="${id}"`);
        expect(markup, id).toContain(`data-ch8-control="${id}"`);
      }
      expect(markup).not.toContain('data-ch8-hotspot="magnetic"');
      // the selected panel is bright and outlined while its siblings dim
      expect(markup).toContain('data-ch8-selection="weight"');
      expect(markup).toContain('data-ch8-dim="weight"');
      expect(markup).toContain("ring-amber-300/70");
      // and its force vector is drawn
      expect(markup).toContain('data-force-cue="weight"');
    },
  );

  it.each(VIEWS)(
    "%s renders the five-panel effects scene, not the retired artwork",
    (_name, content, lang) => {
      const markup = figureMarkup("effects", content, lang, "shape");
      expect(markup).toContain(`src="${CHAPTER8_IMAGES.effectsOfForce}"`);
      expect(markup).not.toContain("01_effects_of_force");
      expect(markup).not.toContain("science-f2-ch8-force-changes-shape");
      for (const id of EFFECTS_PANEL_ORDER) {
        expect(markup, id).toContain(`data-ch8-hotspot="${id}"`);
        expect(markup, id).toContain(`data-ch8-control="${id}"`);
      }
      expect(markup).toContain('data-ch8-selection="shape"');
      expect(markup).toContain('data-ch8-dim="shape"');
    },
  );

  it.each(VIEWS)(
    "%s has no magnetic-force card at all, not even as enrichment text",
    (_name, content, lang) => {
      const markup = figureMarkup("types", content, lang, null);
      expect(markup).not.toContain('data-ch8-enrichment="magnetic"');
      expect(markup).not.toContain("Magnetic force");
      expect(markup).not.toContain("Daya magnet");
      expect(markup).not.toContain('data-ch8-control="magnetic"');
      expect(markup).not.toContain('data-ch8-hotspot="magnetic"');
    },
  );

  it.each(VIEWS)(
    "%s scopes each wide scene's horizontal scroll to its own wrapper",
    (_name, content, lang) => {
      // A readability floor means the frame can be wider than a phone. The
      // scroll must live on this wrapper so the PAGE never scrolls sideways.
      for (const [kind, floor] of [
        ["types", 680],
        ["effects", 600],
      ] as const) {
        const markup = figureMarkup(kind, content, lang, null);
        expect(markup, kind).toContain(`data-ch8-figure-scroll="${kind}"`);
        expect(markup, kind).toContain("overflow-x-auto");
        expect(markup, kind).toMatch(new RegExp(`min-width:\\s*${floor}px`));
        expect(markup, kind).toContain('data-ch8-figure-variant="panorama"');
      }
    },
  );

  it.each(VIEWS)(
    "%s gives every panel control a pressed state and a touch target",
    (_name, content, lang) => {
      for (const kind of ["types", "effects"] as const) {
        const section = kind === "types" ? typesSection(content) : effectsSection(content);
        const markup = figureMarkup(kind, content, lang, null);
        for (const card of section.flipCards ?? []) {
          expect(markup, card.label).toContain(html(card.label));
        }
        expect(markup, kind).toContain('aria-pressed="false"');
        expect(markup, kind).toContain("min-h-11");
        expect(markup, kind).toContain("focus-visible:ring-amber-300");
        // the on-image regions are labelled controls too
        expect(markup, kind).toContain("aria-label=");
      }
    },
  );

  it.each(VIEWS)(
    "%s renders no retired or PNG image reference anywhere",
    (_name, content, lang) => {
      const markup =
        markupOf(content, lang) +
        figureMarkup("types", content, lang, null) +
        figureMarkup("effects", content, lang, null) +
        figureMarkup("action-reaction", content, lang, null);
      for (const name of RETIRED) expect(markup, name).not.toContain(name);
      expect(markup).not.toContain('src=""');
      for (const url of CHAPTER8_IMAGE_LIST) {
        expect(markup).not.toContain(url.replace(/\.webp$/, ".png"));
      }
    },
  );

  it.each(VIEWS)(
    "%s leaves no effect demoted into the lesser 'other concepts' list",
    (_name, content, lang) => {
      // Every effect is now a painted panel, so none of them is pushed into the
      // plain-text list beneath the picture.
      const markup = markupOf(content, lang);
      const other =
        lang === "bm" ? "Konsep lain yang perlu diingati" : "Other concepts to remember";
      const otherAt = markup.indexOf(other);
      if (otherAt !== -1) {
        const tail = markup.slice(otherAt, otherAt + 4000);
        for (const card of effectsSection(content).flipCards ?? []) {
          expect(tail, card.label).not.toContain(html(card.label));
        }
      }
    },
  );
});

// ------------------------------------ E. TYPES OF FORCES — NO DUPLICATION

describe("Chapter 8 approved figures — Types of Forces has ONE unified interactive, not a repeat", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C8InteractiveBM, "bm"],
    ["dlp", scienceF2C8InteractiveDLP, "en"],
  ];

  it.each(VIEWS)(
    "%s never renders a flip-card grid for Types of Forces — the image is the only teaching surface",
    (_name, content, lang) => {
      const markup = markupOf(content, lang);
      // FlipCardGrid's flip-card markup carries this exact structural marker
      // ([perspective:1000px] + [backface-visibility:hidden]); the six-panel
      // image renders none of it.
      expect(markup).not.toContain("[perspective:1000px]");
      expect(markup).not.toContain("[backface-visibility:hidden]");
    },
  );

  it.each(VIEWS)(
    "%s never demotes a core force into the lesser 'other concepts' list",
    (_name, content, lang) => {
      const markup = markupOf(content, lang);
      const other =
        lang === "bm" ? "Konsep lain yang perlu diingati" : "Other concepts to remember";
      const otherAt = markup.indexOf(other);
      if (otherAt !== -1) {
        const tail = markup.slice(otherAt, otherAt + 4000);
        for (const card of typesSection(content).flipCards ?? []) {
          expect(tail, card.label).not.toContain(html(card.label));
        }
      }
    },
  );

  it.each(VIEWS)(
    "%s renders the six-panel image exactly once for Types of Forces",
    (_name, content, lang) => {
      const markup = markupOf(content, lang);
      const occurrences = markup.split(`src="${CHAPTER8_IMAGES.typesOfForces}"`).length - 1;
      expect(occurrences).toBe(1);
    },
  );

  it.each(VIEWS)(
    "%s shows exactly one interaction instruction, not two",
    (_name, content, lang) => {
      const markup = figureMarkup("types", content, lang, null);
      const instruction =
        lang === "bm"
          ? "Interaktif — Tekan daya untuk meneroka."
          : "Interactive — Tap a force to explore.";
      const genericInstruction =
        lang === "bm"
          ? "Interaktif — Tekan konsep untuk meneroka."
          : "Interactive — Tap a concept to explore.";
      const genericPrompt =
        lang === "bm"
          ? "Pilih satu situasi untuk melihat hubungan saintifiknya."
          : "Choose a scene to reveal the scientific relationship.";
      expect(markup).toContain(instruction);
      expect(markup).not.toContain(genericInstruction);
      expect(markup).not.toContain(genericPrompt);
      // exactly one Sparkles-icon instruction line (the figcaption)
      expect(markup.split(instruction).length - 1).toBe(1);
    },
  );

  it.each(VIEWS)(
    "%s gives each selected force one definition AND one distinct short example",
    (_name, content, lang) => {
      const section = typesSection(content);
      for (const card of section.flipCards ?? []) {
        expect(card.example, `${card.id} missing example`).toBeTruthy();
        expect(card.example, card.id).not.toBe(card.fact);
        // an example is a short standalone sentence, not a repeat of the definition
        expect(card.fact.toLowerCase()).not.toContain(card.example!.toLowerCase());
      }
      const markup = figureMarkup("types", content, lang, "gravitational");
      const grav = (section.flipCards ?? []).find((c) => c.id === "gravitational")!;
      expect(markup).toContain(html(grav.fact));
      expect(markup).toContain(html(grav.example!));
    },
  );

  it("BM and DLP keep the same six-force structure — only wording differs", () => {
    const bmIds = (typesSection(scienceF2C8InteractiveBM).flipCards ?? []).map((c) => c.id);
    const dlpIds = (typesSection(scienceF2C8InteractiveDLP).flipCards ?? []).map((c) => c.id);
    expect(bmIds).toEqual(dlpIds);
    const bmHasExample = (typesSection(scienceF2C8InteractiveBM).flipCards ?? []).every(
      (c) => !!c.example,
    );
    const dlpHasExample = (typesSection(scienceF2C8InteractiveDLP).flipCards ?? []).every(
      (c) => !!c.example,
    );
    expect(bmHasExample).toBe(true);
    expect(dlpHasExample).toBe(true);
  });
});

// ------------------------------------ F. EFFECTS MAPPING (no off-by-one)

describe("Chapter 8 approved figures — Effects of Force selection never drifts", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C8InteractiveBM, "bm"],
    ["dlp", scienceF2C8InteractiveDLP, "en"],
  ];

  it.each(VIEWS)(
    "%s: every one of the five states shows its OWN button, panel, title and explanation together",
    (_name, content, lang) => {
      const section = effectsSection(content);
      const byId = Object.fromEntries((section.flipCards ?? []).map((c) => [c.id, c]));
      for (const id of EFFECTS_PANEL_ORDER) {
        const markup = figureMarkup("effects", content, lang, id);
        const card = byId[id];
        // 1. the button for THIS state is pressed
        expect(markup, `${id} control`).toContain(`data-ch8-control="${id}" aria-pressed="true"`);
        // 2. the panel for THIS state (and no other) is selected/dimmed
        expect(markup, `${id} selection`).toContain(`data-ch8-selection="${id}"`);
        expect(markup, `${id} dim`).toContain(`data-ch8-dim="${id}"`);
        for (const otherId of EFFECTS_PANEL_ORDER) {
          if (otherId === id) continue;
          expect(markup, `${id} vs ${otherId} selection`).not.toContain(
            `data-ch8-selection="${otherId}"`,
          );
        }
        // 3. the title shown is THIS state's own label
        expect(markup, `${id} title`).toContain(html(card.label));
        // 4. the explanation shown is THIS state's own fact, not a neighbour's
        expect(markup, `${id} note`).toContain(html(card.fact));
        for (const otherId of EFFECTS_PANEL_ORDER) {
          if (otherId === id) continue;
          expect(markup, `${id} must not show ${otherId}'s note`).not.toContain(
            html(byId[otherId].fact),
          );
        }
      }
    },
  );
});

// --------------------------------- G. ACTION-REACTION — NO DUPLICATE TEXT

describe("Chapter 8 approved figures — Action-Reaction has no duplicate accordion lesson", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C8InteractiveBM, "bm"],
    ["dlp", scienceF2C8InteractiveDLP, "en"],
  ];

  it.each(VIEWS)(
    "%s: the three-panel image is the only place the three situations are explained",
    (_name, content, lang) => {
      const section = sectionWith(content, "actionReactionPairs");
      expect(section.accordions, "accordions field should still exist as data").toBeTruthy();
      const markup = markupOf(content, lang);
      // None of the three accordion bodies (the old duplicate teaching) may
      // appear anywhere in the rendered Action-Reaction section's markup.
      for (const item of section.accordions ?? []) {
        expect(markup, item.title).not.toContain(html(item.title));
      }
    },
  );

  it("Atmospheric Pressure's own accordions (a different section) still render normally", () => {
    // The fix must only suppress accordions for the section that also has
    // actionReactionPairs — every other chapter-8 accordion list (e.g. the
    // six atmospheric-pressure applications) must be unaffected.
    const atmosphere = scienceF2C8InteractiveDLP.sections.find((s) => s.altitudePressure)!;
    expect(atmosphere.accordions?.length, "atmosphere should have its 6 applications").toBe(6);
    const markup = markupOf(scienceF2C8InteractiveDLP, "en");
    for (const item of atmosphere.accordions ?? []) {
      expect(markup, item.title).toContain(html(item.title));
    }
  });
});

// -------------------------------------------- H. LEVER PRINCIPLE RENDERS

describe("Chapter 8 approved figures — Lever Principle actually renders, before Check Yourself", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C8InteractiveBM, "bm"],
    ["dlp", scienceF2C8InteractiveDLP, "en"],
  ];

  /** markupOf renders every section; this isolates just the Levers section's
   * own markup, so "Check yourself" from an earlier section cannot be
   * mistaken for the Levers section's own check-yourself heading. */
  function leversMarkup(content: ScienceF2InteractiveContent, lang: "bm" | "en") {
    const section = content.sections.find((s) => s.leverClasses)!;
    return renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...content, sections: [section] },
        lang,
      }),
    );
  }

  it.each(VIEWS)(
    "%s: the formula and worked example render on screen, in the right order",
    (_name, content, lang) => {
      const section = content.sections.find((s) => s.leverClasses)!;
      const markup = leversMarkup(content, lang);
      const heading = lang === "bm" ? "Prinsip Momen bagi Tuas" : "Principle of Moments for Levers";
      expect(markup, "heading").toContain(heading);
      expect(markup, "formula").toContain(html(section.leverClasses!.formula));
      expect(markup, "symbolic form").toContain("L × dL = E × dE");
      expect(markup, "worked example given").toContain(
        html(section.leverClasses!.workedExample.given),
      );
      expect(markup, "worked example answer").toContain(
        html(section.leverClasses!.workedExample.answer),
      );

      const headingAt = markup.indexOf(heading);
      const firstCheckAt = markup.indexOf(lang === "bm" ? "Semak diri" : "Check yourself");
      expect(headingAt, "heading must exist").toBeGreaterThan(-1);
      expect(firstCheckAt, "check-yourself heading must exist").toBeGreaterThan(-1);
      expect(headingAt, "principle must render before Check Yourself").toBeLessThan(firstCheckAt);
    },
  );

  it.each(VIEWS)(
    "%s: the worked example is question-first, not solution-first",
    (_name, content, lang) => {
      const section = content.sections.find((s) => s.leverClasses)!;
      const markup = leversMarkup(content, lang);
      const givenAt = markup.indexOf(html(section.leverClasses!.workedExample.given));
      const answerAt = markup.indexOf(html(section.leverClasses!.workedExample.answer));
      expect(givenAt, "given/question must render").toBeGreaterThan(-1);
      expect(answerAt, "answer must render").toBeGreaterThan(-1);
      expect(givenAt, "question must come before the answer").toBeLessThan(answerAt);
    },
  );
});
