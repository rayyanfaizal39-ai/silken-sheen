import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import {
  attractedPins,
  coilTurnLayout,
  COIL_TURNS_BY_STEP,
  COIL_TURNS_CONTROLLED,
  ELECTROMAGNET_ART,
  ELECTROMAGNET_CORE,
  ELECTROMAGNET_PARTS,
  ELECTROMAGNET_STEPS,
  ELECTROSCOPE_DIM_OPACITY,
  ELECTROSCOPE_PANELS,
  fieldCueRings,
  LIGHTNING_DIM_OPACITY,
  LIGHTNING_STAGES,
  PIN_SHAPE,
} from "@/components/notes/blocks/ch7-approved-figure-geometry";
import { spotlightBounds, type SpotlightShape } from "@/components/notes/blocks/spotlight-shapes";
import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH7_IMAGES } from "../visual-assets";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";

/**
 * Guards the three approved Chapter 7 figures — the electroscope triptych, the
 * lightning-formation scene, and the electromagnet-strength investigation
 * apparatus.
 *
 * What actually has to hold, and what this file therefore checks:
 *
 *  1. **One file per figure, shared by both languages.** The artwork carries no
 *     baked-in words, so BM and DLP must reference the identical WebP and
 *     differ only in the strings around it.
 *  2. **The picture responds.** Every control has geometry to light up, so no
 *     control can look interactive while changing nothing on the artwork.
 *  3. **One concept, one primary visual.** The schematics these photographs
 *     replaced must not still be rendered underneath them.
 *  4. **No fabricated data.** The source gives no pin dataset, so the pin and
 *     field response stays a rank — more pins, never a number of pins.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

const PUBLIC_ROOT = resolve(process.cwd(), "public");

const APPROVED = [
  SCIENCE_F2_CH7_IMAGES.electroscope,
  SCIENCE_F2_CH7_IMAGES.lightningFormation,
  SCIENCE_F2_CH7_IMAGES.electromagnetInvestigation,
];

const electroscopeOf = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.electroscope)!.electroscope!;
const lightningOf = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.lightningFormation)!.lightningFormation!;
const experimentOf = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.miniExperiment)!.miniExperiment!;
const apparatusOf = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.apparatusDiagram)!.apparatusDiagram!;

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

function html(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// --------------------------------------------------------------- A. THE FILES

describe("Chapter 7 approved figures — files on disk", () => {
  it.each(APPROVED)("%s exists, is WebP, and is not empty", (src) => {
    expect(src.endsWith(".webp"), src).toBe(true);
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    expect(existsSync(file), file).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(4096);
  });

  it.each(APPROVED)("%s ships no PNG beside it", (src) => {
    // The source PNGs are inputs, not production assets.
    const png = resolve(PUBLIC_ROOT, src.replace(/^\//, "").replace(/\.webp$/, ".png"));
    expect(existsSync(png)).toBe(false);
  });

  it("lives under the Chapter 7 asset directory the pack already established", () => {
    for (const src of APPROVED) expect(src.startsWith("/science/form2/chapter-7/")).toBe(true);
  });
});

// ------------------------------------------------------- B. ONE FILE, TWO LANGUAGES

describe("Chapter 7 approved figures — BM and DLP share the artwork, not the words", () => {
  it("references the same three files from the same three blocks", () => {
    for (const [, content] of LANGS) {
      expect(electroscopeOf(content).image!.src).toBe(SCIENCE_F2_CH7_IMAGES.electroscope);
      expect(lightningOf(content).image.src).toBe(SCIENCE_F2_CH7_IMAGES.lightningFormation);
      expect(experimentOf(content).apparatusImage!.src).toBe(
        SCIENCE_F2_CH7_IMAGES.electromagnetInvestigation,
      );
    }
  });

  it("writes its own alt text and captions per language", () => {
    const bm = scienceF2C7InteractiveBM;
    const dlp = scienceF2C7InteractiveDLP;
    const pairs: [string, string][] = [
      [electroscopeOf(bm).image!.alt, electroscopeOf(dlp).image!.alt],
      [electroscopeOf(bm).image!.caption!, electroscopeOf(dlp).image!.caption!],
      [lightningOf(bm).image.alt, lightningOf(dlp).image.alt],
      [lightningOf(bm).image.caption!, lightningOf(dlp).image.caption!],
      [experimentOf(bm).apparatusImage!.alt, experimentOf(dlp).apparatusImage!.alt],
    ];
    for (const [a, b] of pairs) {
      expect(a.trim().length).toBeGreaterThan(20);
      expect(b.trim().length).toBeGreaterThan(20);
      expect(a).not.toBe(b);
    }
  });

  it("keeps identical structure — same stages, same ids, same order", () => {
    const ids = (c: ScienceF2InteractiveContent) => ({
      electroscope: electroscopeOf(c).stages.map((s) => s.id),
      lightning: lightningOf(c).stages.map((s) => s.id),
      parts: apparatusOf(c).parts.map((p) => p.id),
      values: experimentOf(c).parts.map((p) => p.values),
    });
    expect(ids(scienceF2C7InteractiveBM)).toEqual(ids(scienceF2C7InteractiveDLP));
  });

  it("leaks neither language into the other", () => {
    // A handful of unmistakable markers each way, over the new blocks only.
    const bmText = JSON.stringify([
      electroscopeOf(scienceF2C7InteractiveBM),
      lightningOf(scienceF2C7InteractiveBM),
      experimentOf(scienceF2C7InteractiveBM).apparatusImage,
    ]);
    const dlpText = JSON.stringify([
      electroscopeOf(scienceF2C7InteractiveDLP),
      lightningOf(scienceF2C7InteractiveDLP),
      experimentOf(scienceF2C7InteractiveDLP).apparatusImage,
    ]);
    for (const english of [
      /\bgold leaf\b/i,
      /\bcloud\b/i,
      /\bpins are attracted\b/i,
      /\bthe electroscope is\b/i,
    ]) {
      expect(bmText, `BM carries ${english}`).not.toMatch(english);
    }
    for (const malay of [/\bkerajang\b/i, /\bawan\b/i, /jarum peniti/i, /\belektroskop itu\b/i]) {
      expect(dlpText, `DLP carries ${malay}`).not.toMatch(malay);
    }
  });
});

// ----------------------------------------------------------- C. THE ELECTROSCOPE

describe("Chapter 7 approved figures — electroscope", () => {
  for (const [lang, content] of LANGS) {
    const block = electroscopeOf(content);

    it(`${lang}: the approved photograph is the figure, with an aspect that matches the artwork`, () => {
      expect(block.image).toBeDefined();
      expect(block.image!.aspect).toBe("16 / 9");
      expect(block.image!.size).toBe("panel");
    });

    it(`${lang}: all three stages light up their own panel`, () => {
      expect(block.stages).toHaveLength(3);
      for (const stage of block.stages) {
        const shapes = ELECTROSCOPE_PANELS[stage.id];
        expect(shapes, `no panel geometry for ${stage.id}`).toBeDefined();
        expect(shapes.length).toBeGreaterThan(0);
      }
    });

    it(`${lang}: the three panels are disjoint and in left-to-right stage order`, () => {
      const order = ["uncharged", "charged", "diverged"] as const;
      expect(block.stages.map((s) => s.id)).toEqual([...order]);
      const spans = order.map((id) => spotlightBounds(ELECTROSCOPE_PANELS[id]));
      for (let i = 1; i < spans.length; i += 1) {
        expect(spans[i].minX, `panel ${order[i]} overlaps ${order[i - 1]}`).toBeGreaterThan(
          spans[i - 1].maxX,
        );
      }
    });

    it(`${lang}: charge is introduced by electrons LEAVING, not by positive charge moving`, () => {
      const charged = block.stages.find((s) => s.id === "charged")!;
      expect(charged.note).toMatch(lang === "bm" ? /[Ee]lektron/ : /electrons/i);
      // The misconception this figure must not teach: positive charge flowing
      // through the conductor.
      expect(charged.note).not.toMatch(
        lang === "bm" ? /cas positif (bergerak|mengalir)/i : /positive charges? (move|flow)/i,
      );
    });

    it(`${lang}: divergence is explained by repulsion, and greater divergence by more charge`, () => {
      const diverged = block.stages.find((s) => s.id === "diverged")!;
      expect(diverged.note).toMatch(lang === "bm" ? /menolak/i : /repel/i);
      expect(diverged.note).not.toMatch(lang === "bm" ? /menarik/i : /attract/i);
      expect(diverged.note).toMatch(lang === "bm" ? /[Cc]apahan/ : /divergence/i);
    });
  }

  it("dims the unselected panels rather than blacking them out", () => {
    // Peer panels: comparing the three is half the teaching, so the two that
    // are not selected must stay readable.
    expect(ELECTROSCOPE_DIM_OPACITY).toBeGreaterThan(0.2);
    expect(ELECTROSCOPE_DIM_OPACITY).toBeLessThan(0.6);
  });
});

// -------------------------------------------------------------- D. THE LIGHTNING

describe("Chapter 7 approved figures — lightning formation", () => {
  for (const [lang, content] of LANGS) {
    const block = lightningOf(content);

    it(`${lang}: the four stages are in formation order and each lights up the artwork`, () => {
      expect(block.stages.map((s) => s.id)).toEqual([
        "friction",
        "separation",
        "induced",
        "discharge",
      ]);
      for (const stage of block.stages) {
        const shapes = LIGHTNING_STAGES[stage.id];
        expect(shapes, `no geometry for ${stage.id}`).toBeDefined();
        expect(shapes.length).toBeGreaterThan(0);
      }
    });

    it(`${lang}: friction is between the cloud and the surrounding AIR`, () => {
      const friction = block.stages.find((s) => s.id === "friction")!;
      expect(friction.note).toMatch(lang === "bm" ? /udara/i : /air/i);
      // The error this replaces: "two clouds rub together".
      expect(friction.note).not.toMatch(
        lang === "bm" ? /dua awan|antara awan dengan awan/i : /two clouds|clouds rub together/i,
      );
    });

    it(`${lang}: charge separation names the upper part positive and the lower part negative`, () => {
      const separation = block.stages.find((s) => s.id === "separation")!;
      expect(separation.note).toMatch(lang === "bm" ? /bahagian atas/i : /upper part/i);
      expect(separation.note).toMatch(lang === "bm" ? /bahagian bawah/i : /lower part/i);
      expect(separation.note).toMatch(lang === "bm" ? /positif/i : /positive/i);
      expect(separation.note).toMatch(lang === "bm" ? /negatif/i : /negative/i);
    });

    it(`${lang}: the ground charge is induced, and the discharge is what we see as lightning`, () => {
      const induced = block.stages.find((s) => s.id === "induced")!;
      expect(induced.note).toMatch(lang === "bm" ? /aruh/i : /induces?/i);
      const discharge = block.stages.find((s) => s.id === "discharge")!;
      expect(discharge.note).toMatch(lang === "bm" ? /nyahcas/i : /discharge/i);
      expect(discharge.note).toMatch(lang === "bm" ? /kilat/i : /lightning/i);
    });

    it(`${lang}: the summary states all four steps of the mechanism`, () => {
      expect(block.summary).toHaveLength(4);
      for (const line of block.summary) expect(line.trim().length).toBeGreaterThan(20);
    });

    it(`${lang}: teaches formation only — no conductor, petrol station, Faraday cage or clothing`, () => {
      const text = JSON.stringify(block);
      for (const foreign of [
        /konduktor kilat|lightning conductor/i,
        /petrol|refuel/i,
        /Faraday/i,
        /pakaian|clothing|carpet|karpet/i,
      ]) {
        expect(text, `lightning formation drifted into ${foreign}`).not.toMatch(foreign);
      }
    });
  }

  it("lights up the airflow on BOTH sides of the cloud for friction", () => {
    const shapes = LIGHTNING_STAGES.friction;
    expect(shapes).toHaveLength(2);
    const [left, right] = shapes.map((s) => spotlightBounds([s]));
    expect(left.minX).toBeLessThan(10);
    expect(right.maxX).toBeGreaterThan(90);
  });

  it("puts the induced charge below the cloud and the bolt between the two", () => {
    const ground = spotlightBounds(LIGHTNING_STAGES.induced);
    const cloud = spotlightBounds(LIGHTNING_STAGES.separation);
    const bolt = spotlightBounds(LIGHTNING_STAGES.discharge);
    expect(ground.minY).toBeGreaterThan(cloud.maxY);
    expect(bolt.minY).toBeGreaterThanOrEqual(cloud.maxY - 5);
    expect(bolt.maxY).toBeLessThanOrEqual(ground.maxY);
  });

  it("dims the rest of the scene without hiding the context", () => {
    expect(LIGHTNING_DIM_OPACITY).toBeGreaterThan(0.3);
    expect(LIGHTNING_DIM_OPACITY).toBeLessThan(0.7);
  });
});

// ------------------------------------------------- E. THE ELECTROMAGNET APPARATUS

describe("Chapter 7 approved figures — electromagnet investigation apparatus", () => {
  for (const [lang, content] of LANGS) {
    const experiment = experimentOf(content);
    const apparatus = apparatusOf(content);

    it(`${lang}: the investigation owns the approved apparatus photograph`, () => {
      expect(experiment.apparatusImage).toBeDefined();
    });

    it(`${lang}: every named piece of apparatus has a region on the picture`, () => {
      expect(apparatus.parts.length).toBeGreaterThanOrEqual(8);
      for (const part of apparatus.parts) {
        const shapes = ELECTROMAGNET_PARTS[part.id];
        expect(shapes, `no geometry for apparatus part ${part.id}`).toBeDefined();
        expect(shapes.length).toBeGreaterThan(0);
        expect(part.note.trim().length).toBeGreaterThan(20);
      }
    });

    it(`${lang}: the apparatus roles are not duplicated into the image block`, () => {
      // The names and roles live in `apparatusDiagram` alone; the image block
      // must not grow a second copy that can drift from it. Its `alt` text is
      // the one place the apparatus is named again, and has to be — it is the
      // description of the photograph.
      const { alt, ...rest } = experiment.apparatusImage!;
      const image = JSON.stringify(rest);
      expect(alt.length).toBeGreaterThan(20);
      for (const part of apparatus.parts) {
        expect(image, `${part.id} role duplicated`).not.toContain(part.note);
        expect(image, `${part.id} label duplicated`).not.toContain(part.label);
      }
    });

    it(`${lang}: one qualitative response per tested value, and never a pin count`, () => {
      const labels = experiment.apparatusImage!.responseLabels;
      expect(labels).toHaveLength(ELECTROMAGNET_STEPS);
      for (const part of experiment.parts) expect(part.values).toHaveLength(ELECTROMAGNET_STEPS);
      for (const label of labels) {
        expect(label.trim().length).toBeGreaterThan(15);
        expect(label, "a pin count was fabricated").not.toMatch(/\d+\s*(jarum peniti|pins)\b/i);
      }
    });

    it(`${lang}: the response strengthens monotonically in words, weakest first`, () => {
      const labels = experiment.apparatusImage!.responseLabels;
      const weakest = lang === "bm" ? /paling lemah/i : /weakest/i;
      const strongest = lang === "bm" ? /paling kuat/i : /strongest/i;
      expect(labels[0]).toMatch(weakest);
      expect(labels[labels.length - 1]).toMatch(strongest);
    });

    it(`${lang}: the tested values are exactly the investigation's own`, () => {
      const current = experiment.parts.find((p) => p.id === "current")!;
      const turns = experiment.parts.find((p) => p.id === "turns")!;
      expect(current.values).toEqual(["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"]);
      expect(turns.values).toEqual(["10", "20", "30", "40", "50"]);
    });
  }

  it("places every hotspot inside the artwork", () => {
    for (const [id, shapes] of Object.entries(ELECTROMAGNET_PARTS)) {
      const { minX, minY, maxX, maxY } = spotlightBounds(shapes);
      expect(minX, id).toBeGreaterThanOrEqual(0);
      expect(minY, id).toBeGreaterThanOrEqual(0);
      expect(maxX, id).toBeLessThanOrEqual(100);
      expect(maxY, id).toBeLessThanOrEqual(100);
    }
  });

  it("keeps every hotspot distinct — no two parts share a region", () => {
    const boxes = Object.entries(ELECTROMAGNET_PARTS).map(
      ([id, shapes]) => [id, spotlightBounds(shapes)] as const,
    );
    for (const [idA, a] of boxes) {
      for (const [idB, b] of boxes) {
        if (idA >= idB) continue;
        const identical =
          a.minX === b.minX && a.minY === b.minY && a.maxX === b.maxX && a.maxY === b.maxY;
        expect(identical, `${idA} and ${idB} share one region`).toBe(false);
      }
    }
  });
});

// -------------------------------------------------- F. THE GENERATED RESPONSE LAYER

describe("Chapter 7 approved figures — the response the picture draws", () => {
  it("adds pins as the field strengthens, never rearranges them", () => {
    let previous: string[] = [];
    for (let step = 0; step < ELECTROMAGNET_STEPS; step += 1) {
      const ids = attractedPins(step).map((p) => p.id);
      expect(ids.length, `step ${step}`).toBeGreaterThan(previous.length);
      // Every pin already drawn stays drawn, in the same place: a stronger
      // field must read as MORE pins, not as a different picture.
      expect(ids.slice(0, previous.length)).toEqual(previous);
      previous = ids;
    }
  });

  it("clamps out-of-range steps instead of drawing nothing", () => {
    expect(attractedPins(-1)).toEqual(attractedPins(0));
    expect(attractedPins(99)).toEqual(attractedPins(ELECTROMAGNET_STEPS - 1));
  });

  it("hangs every pin off the bare iron below the coil, not off the copper", () => {
    for (const pin of attractedPins(ELECTROMAGNET_STEPS - 1)) {
      expect(pin.y, `${pin.id} is level with the winding`).toBeGreaterThan(
        ELECTROMAGNET_CORE.coilBottomY,
      );
      expect(pin.y, `${pin.id} is below the core`).toBeLessThanOrEqual(
        ELECTROMAGNET_CORE.bottomY + 4,
      );
      // Touching the rod, within a pin head of its surface.
      expect(pin.x).toBeGreaterThanOrEqual(ELECTROMAGNET_CORE.left - PIN_SHAPE.headRadius);
      expect(pin.x).toBeLessThanOrEqual(ELECTROMAGNET_CORE.right + PIN_SHAPE.headRadius);
    }
  });

  it("keeps every drawn pin inside the artwork", () => {
    for (const pin of attractedPins(ELECTROMAGNET_STEPS - 1)) {
      const rad = (pin.deg * Math.PI) / 180;
      const tipX = pin.x + Math.cos(rad) * PIN_SHAPE.length;
      const tipY = pin.y + Math.sin(rad) * PIN_SHAPE.length;
      expect(tipX).toBeGreaterThan(0);
      expect(tipX).toBeLessThan(ELECTROMAGNET_ART.width);
      expect(tipY).toBeGreaterThan(0);
      expect(tipY).toBeLessThan(ELECTROMAGNET_ART.height);
    }
  });

  it("draws the investigation's own turn counts, at the density they imply", () => {
    expect([...COIL_TURNS_BY_STEP]).toEqual([10, 20, 30, 40, 50]);
    expect(COIL_TURNS_CONTROLLED).toBe(10);
    let previousPitch = Infinity;
    for (const turns of COIL_TURNS_BY_STEP) {
      const { turns: loops, strokeWidth } = coilTurnLayout(turns);
      expect(loops).toHaveLength(turns);
      // Every loop sits inside the coil band on the rod.
      for (const loop of loops) {
        expect(loop.cy).toBeGreaterThanOrEqual(ELECTROMAGNET_CORE.coilTopY);
        expect(loop.cy).toBeLessThanOrEqual(ELECTROMAGNET_CORE.coilBottomY);
      }
      const pitch = loops.length > 1 ? loops[1].cy - loops[0].cy : Infinity;
      expect(pitch, "more turns must pack tighter").toBeLessThan(previousPitch);
      previousPitch = pitch;
      expect(strokeWidth).toBeGreaterThan(0);
    }
  });

  it("widens and brightens the field cue as the field strengthens", () => {
    let previousCount = 0;
    let previousPeak = 0;
    for (let step = 0; step < ELECTROMAGNET_STEPS; step += 1) {
      const rings = fieldCueRings(step);
      expect(rings.length).toBeGreaterThan(previousCount);
      const peak = Math.max(...rings.map((r) => r.opacity));
      expect(peak, `step ${step} is not brighter than ${step - 1}`).toBeGreaterThan(previousPeak);
      for (const ring of rings) {
        expect(ring.opacity).toBeGreaterThan(0);
        expect(ring.opacity).toBeLessThanOrEqual(1);
      }
      previousCount = rings.length;
      previousPeak = peak;
    }
  });

  it("keeps every percentage shape inside the artwork", () => {
    const all: SpotlightShape[] = [
      ...Object.values(ELECTROSCOPE_PANELS).flat(),
      ...Object.values(LIGHTNING_STAGES).flat(),
      ...Object.values(ELECTROMAGNET_PARTS).flat(),
    ];
    for (const shape of all) {
      const { minX, minY, maxX, maxY } = spotlightBounds([shape]);
      expect(minX, shape.id).toBeGreaterThanOrEqual(0);
      expect(minY, shape.id).toBeGreaterThanOrEqual(0);
      expect(maxX, shape.id).toBeLessThanOrEqual(100);
      expect(maxY, shape.id).toBeLessThanOrEqual(100);
      expect(maxX - minX, `${shape.id} has no width`).toBeGreaterThan(0);
      expect(maxY - minY, `${shape.id} has no height`).toBeGreaterThan(0);
    }
  });
});

// ------------------------------------------------------------------ G. RENDERING

describe("Chapter 7 approved figures — rendering", () => {
  const VIEWS: [string, ScienceF2InteractiveContent, "bm" | "en"][] = [
    ["bm", scienceF2C7InteractiveBM, "bm"],
    ["dlp", scienceF2C7InteractiveDLP, "en"],
  ];

  it.each(VIEWS)(
    "%s renders all three figures, eagerly, with their alt text",
    (_n, content, lang) => {
      const markup = markupOf(content, lang);
      for (const src of APPROVED) {
        expect(markup, src).toContain(`src="${src}"`);
        const tag = markup.slice(markup.indexOf(`src="${src}"`));
        const attrs = tag.slice(0, tag.indexOf(">"));
        // Each leads the teaching it belongs to, so it is always above the fold.
        expect(attrs, src).toContain('loading="eager"');
        expect(attrs, src).toContain('decoding="async"');
      }
      expect(markup).toContain(html(electroscopeOf(content).image!.alt));
      expect(markup).toContain(html(lightningOf(content).image.alt));
      expect(markup).toContain(html(experimentOf(content).apparatusImage!.alt));
    },
  );

  it.each(VIEWS)("%s renders no PNG and no empty image source", (_n, content, lang) => {
    const markup = markupOf(content, lang);
    expect(markup).not.toContain('src=""');
    for (const src of APPROVED) expect(markup).not.toContain(src.replace(/\.webp$/, ".png"));
  });

  it.each(VIEWS)("%s replaces the schematics rather than stacking on them", (_n, content, lang) => {
    const markup = markupOf(content, lang);
    // Only the electroscope schematic draws this viewBox...
    expect(markup, "the old electroscope drawing is still on screen").not.toContain(
      'viewBox="0 0 140 170"',
    );
    // ...and only the apparatus schematic draws this one.
    expect(markup, "the old apparatus schematic is still on screen").not.toContain(
      'viewBox="0 0 320 190"',
    );
  });

  it.each(VIEWS)(
    "%s gives every control a pressed state and a touch-sized target",
    (_n, content, lang) => {
      const markup = markupOf(content, lang);
      const labels = [
        ...electroscopeOf(content).stages.map((s) => s.label),
        ...lightningOf(content).stages.map((s) => s.label),
        ...apparatusOf(content).parts.map((p) => p.label),
      ];
      for (const label of labels) {
        expect(markup, `no control for ${label}`).toContain(html(label));
      }
      // The shared control style carries the pressed state, the 44px minimum and
      // a visible focus ring; assert the figures actually use it.
      expect(markup).toContain('aria-pressed="true"');
      expect(markup).toContain('aria-pressed="false"');
      expect(markup).toContain("min-h-11");
      expect(markup).toContain("focus-visible:ring-primary");
    },
  );

  it.each(VIEWS)(
    "%s keeps the apparatus hotspots and the variable control on one figure",
    (_n, content, lang) => {
      const markup = markupOf(content, lang);
      // The manipulated-variable slider and the apparatus photograph must be in
      // the same block — a slider that changed a picture elsewhere on the page
      // would not read as changing the apparatus at all.
      const experiment = experimentOf(content);
      const at = markup.indexOf(`src="${experiment.apparatusImage!.src}"`);
      expect(at).toBeGreaterThan(-1);
      const after = markup.slice(at);
      expect(after).toContain('type="range"');
      expect(after).toContain(html(apparatusOf(content).parts[0].label));
    },
  );

  it.each(VIEWS)(
    "%s offers an enlarge control on the two spotlight figures",
    (_n, content, lang) => {
      const markup = markupOf(content, lang);
      const enlarge = lang === "bm" ? "Besarkan" : "Enlarge";
      for (const alt of [electroscopeOf(content).image!.alt, lightningOf(content).image.alt]) {
        expect(markup, alt).toContain(`aria-label="${enlarge} — ${html(alt)}"`);
      }
    },
  );
});
