import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import {
  CH9_FIGURE_GEOMETRY,
  CH9_FIGURE_ORDER,
  type Ch9FigureId,
} from "@/components/notes/blocks/ch9-approved-figure-geometry";
import { spotlightBounds } from "@/components/notes/blocks/spotlight-shapes";
import { Chapter9SpotlightFigure } from "@/components/notes/blocks/Chapter9SpotlightFigure";
import { HeatFlowDirection } from "@/components/notes/blocks/HeatFlowDirection";
import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH9_IMAGES } from "../visual-assets";
import { scienceF2C9InteractiveBM } from "./interactive-bm";
import { scienceF2C9InteractiveDLP } from "./interactive-dlp";

/**
 * Guards the three approved Chapter 9 figures — the three-methods triptych, the
 * Sun warming the Earth, and conductors versus insulators — plus the
 * deterministic heat-flow figure the master remediation added beside them.
 *
 * What has to hold, and what this file therefore checks:
 *
 *  1. **One file per figure, shared by both languages.** None of the artwork
 *     carries a baked-in word, so BM and DLP must reference the identical WebP
 *     and differ only in the strings around it — labels, alt text, captions and
 *     the explanation for each region.
 *  2. **Every control lights something up.** A concept id with no region in
 *     `CH9_FIGURE_GEOMETRY` would render a button that changes nothing on the
 *     picture, which is worse than no button at all.
 *  3. **The frame matches the artwork.** A figure whose declared aspect ratio
 *     disagrees with its file gets letterboxed, and then every percentage
 *     hotspot points at the wrong place. Checked against the real files.
 *  4. **One concept, one primary visual.** The scenes these replaced — the
 *     kitchen photograph and the two-beaker comparison — must not still be
 *     placed anywhere in content.
 *  5. **No fabricated data, and no overclaimed insulation.** The insulation
 *     investigation ranks its four flasks qualitatively and never says an
 *     insulator stops heat.
 */

const LANGS: [string, "bm" | "en", ScienceF2InteractiveContent][] = [
  ["bm", "bm", scienceF2C9InteractiveBM],
  ["dlp", "en", scienceF2C9InteractiveDLP],
];

const PUBLIC_ROOT = resolve(process.cwd(), "public");

const APPROVED: [Ch9FigureId, string][] = [
  ["heat-transfer", SCIENCE_F2_CH9_IMAGES.heatTransferMethods],
  ["sun-earth", SCIENCE_F2_CH9_IMAGES.sunEarthRadiation],
  ["conductor-insulator", SCIENCE_F2_CH9_IMAGES.conductorsInsulators],
];

/** The scenes the approved figures displaced. Still on disk, never in content. */
const DISPLACED = [
  SCIENCE_F2_CH9_IMAGES.kitchenHeatTransfer,
  SCIENCE_F2_CH9_IMAGES.conductorInsulator,
];

const figureOf = (c: ScienceF2InteractiveContent, id: Ch9FigureId) => {
  const block = c.sections.map((s) => s.ch9SpotlightFigure).find((f) => f?.figure === id);
  expect(block, `no ${id} figure`).toBeTruthy();
  return block!;
};

const flowBlocks = (c: ScienceF2InteractiveContent) =>
  c.sections.map((s) => s.heatFlowDirection).filter((b) => !!b);

/** Renders a two-state figure with the named stage/state selected first. */
function renderState<B extends { [k: string]: unknown }>(
  Component: (props: { block: B; lang?: string }) => ReturnType<typeof HeatFlowDirection>,
  block: B,
  listKey: string,
  id: string,
  lang: string,
) {
  const list = block[listKey] as { id: string }[];
  const target = list.find((x) => x.id === id)!;
  return renderToStaticMarkup(
    createElement(Component, {
      block: { ...block, [listKey]: [target, ...list.filter((x) => x.id !== id)] } as B,
      lang,
    }),
  );
}

const experimentOf = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.miniExperiment)!.miniExperiment!;

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

// --------------------------------------------------------------- A. THE FILES

describe("Chapter 9 approved figures — files on disk", () => {
  it.each(APPROVED)("%s exists, is WebP, and is not empty", (_id, src) => {
    expect(src.endsWith(".webp"), src).toBe(true);
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    expect(existsSync(file), file).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(4096);
  });

  it.each(APPROVED)("%s ships no PNG beside it", (_id, src) => {
    // The source PNGs are inputs, not production assets.
    const png = resolve(PUBLIC_ROOT, src.replace(/^\//, "").replace(/\.webp$/, ".png"));
    expect(existsSync(png)).toBe(false);
  });

  it("lives under the Chapter 9 asset directory the pack already established", () => {
    for (const [, src] of APPROVED) {
      expect(src.startsWith("/science/form2/chapter-9/")).toBe(true);
    }
  });
});

// --------------------------------------------- B. ONE FILE, TWO LANGUAGES

describe("Chapter 9 approved figures — BM and DLP share the artwork, not the words", () => {
  it.each(APPROVED)("%s is the same file in both languages", (id, src) => {
    for (const [, , content] of LANGS) expect(figureOf(content, id).src).toBe(src);
  });

  it.each(APPROVED)("%s is placed exactly once per language", (_id, src) => {
    for (const [name, , content] of LANGS) {
      const uses = JSON.stringify(content).split(`"${src}"`).length - 1;
      expect(uses, `${name} places ${src} ${uses} times`).toBe(1);
    }
  });

  it.each(APPROVED)("%s carries different words in each language", (id) => {
    const bm = figureOf(scienceF2C9InteractiveBM, id);
    const dlp = figureOf(scienceF2C9InteractiveDLP, id);
    expect(bm.alt).not.toBe(dlp.alt);
    expect(bm.title).not.toBe(dlp.title);
    for (let i = 0; i < bm.concepts.length; i++) {
      expect(bm.concepts[i].note).not.toBe(dlp.concepts[i].note);
    }
  });

  it.each(APPROVED)("%s exposes the same region ids to both languages", (id) => {
    const ids = (c: ScienceF2InteractiveContent) => figureOf(c, id).concepts.map((x) => x.id);
    expect(ids(scienceF2C9InteractiveBM)).toEqual(ids(scienceF2C9InteractiveDLP));
  });
});

// ------------------------------------------------------------- C. THE GEOMETRY

describe("Chapter 9 approved figures — geometry", () => {
  it.each(APPROVED)("%s declares the aspect ratio its file actually has", async (id, src) => {
    // Guessing wrong here letterboxes the artwork inside its frame, and every
    // percentage hotspot then points somewhere the subject is not.
    const sharp = (await import("sharp")).default;
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    const { width = 0, height = 0 } = await sharp(file).metadata();
    const [w, h] = CH9_FIGURE_GEOMETRY[id].aspect.split("/").map((n) => Number(n.trim()));
    expect(w / h, `${id} declares ${w}/${h}, file is ${width}x${height}`).toBeCloseTo(
      width / height,
      3,
    );
  });

  it.each(APPROVED)("%s keeps every shape inside the picture", (id) => {
    for (const shapes of Object.values(CH9_FIGURE_GEOMETRY[id].regions)) {
      const box = spotlightBounds(shapes);
      expect(box.minX, id).toBeGreaterThanOrEqual(0);
      expect(box.minY, id).toBeGreaterThanOrEqual(0);
      expect(box.maxX, id).toBeLessThanOrEqual(100);
      expect(box.maxY, id).toBeLessThanOrEqual(100);
    }
  });

  it.each(APPROVED)("%s gives every region real area", (id) => {
    for (const [key, shapes] of Object.entries(CH9_FIGURE_GEOMETRY[id].regions)) {
      const box = spotlightBounds(shapes);
      // A sliver is a hotspot nobody can see light up.
      expect(box.maxX - box.minX, `${id}/${key} width`).toBeGreaterThan(5);
      expect(box.maxY - box.minY, `${id}/${key} height`).toBeGreaterThan(5);
    }
  });

  it.each(APPROVED)("%s dims peers without hiding them", (id) => {
    // Comparison IS the teaching on these figures, so the unselected regions
    // must stay readable rather than disappear behind the scrim.
    const dim = CH9_FIGURE_GEOMETRY[id].dim;
    expect(dim, id).toBeGreaterThan(0.3);
    expect(dim, id).toBeLessThanOrEqual(0.65);
  });

  it.each(APPROVED)("%s sets a readability floor its regions can survive", (id) => {
    // On a 375px phone the column is ~270px wide. Without a floor the triptych
    // renders each of its three panels at ~90px, which is not a readable
    // apparatus drawing; with one, the frame keeps its width and scrolls inside
    // its own wrapper. The floors below give each subject at least ~110px.
    const { minWidth } = CH9_FIGURE_GEOMETRY[id];
    const subjects = CH9_FIGURE_ORDER[id].length;
    expect(minWidth / subjects, `${id} floor per subject`).toBeGreaterThanOrEqual(110);
    // And never so wide that a desktop column has to scroll: `panel` caps at 660.
    expect(minWidth, id).toBeLessThanOrEqual(660);
  });

  it.each(APPROVED)("%s asks the frame for that floor", (id) => {
    // The floor only works if it actually reaches `AnnotatedImage`, which is
    // also what puts the frame inside a horizontally scrolling wrapper.
    const markup = renderToStaticMarkup(
      createElement(Chapter9SpotlightFigure, {
        block: figureOf(scienceF2C9InteractiveDLP, id),
        lang: "en",
      }),
    );
    expect(markup).toContain(`min-width:${CH9_FIGURE_GEOMETRY[id].minWidth}px`);
    expect(markup, `${id} has no scroll wrapper for its floor`).toContain("overflow-x-auto");
  });

  it.each(APPROVED)("%s content ids match the painted regions, in order", (id) => {
    const order = CH9_FIGURE_ORDER[id];
    expect(Object.keys(CH9_FIGURE_GEOMETRY[id].regions).sort()).toEqual([...order].sort());
    for (const [name, , content] of LANGS) {
      expect(
        figureOf(content, id).concepts.map((c) => c.id),
        name,
      ).toEqual([...order]);
    }
  });

  it("the triptych's three panels do not overlap, and run left to right", () => {
    const regions = CH9_FIGURE_GEOMETRY["heat-transfer"].regions;
    const boxes = CH9_FIGURE_ORDER["heat-transfer"].map((key) => spotlightBounds(regions[key]));
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].minX, "panels out of order or overlapping").toBeGreaterThanOrEqual(
        boxes[i - 1].maxX,
      );
    }
  });

  it("the vacuum band stops short of the Earth it delivers heat to", () => {
    // "No medium is required" is a claim about the gap. Painting it over the
    // Earth would say the receiving body is part of the emptiness.
    const { vacuum, earth, sun } = CH9_FIGURE_GEOMETRY["sun-earth"].regions;
    const gap = spotlightBounds(vacuum);
    const globe = spotlightBounds(earth);
    const disc = spotlightBounds(sun);
    expect(gap.maxX).toBeLessThanOrEqual(globe.minX);
    expect(gap.minX).toBeGreaterThanOrEqual(disc.maxX);
  });
});

// -------------------------------------------------------------- D. THE CONTENT

describe("Chapter 9 approved figures — what each region teaches", () => {
  it.each(APPROVED)("%s gives every region a real explanation", (id) => {
    for (const [name, , content] of LANGS) {
      for (const concept of figureOf(content, id).concepts) {
        expect(concept.note.length, `${name} ${id}/${concept.id}`).toBeGreaterThan(60);
        expect(concept.label.length, `${name} ${id}/${concept.id}`).toBeGreaterThan(2);
      }
    }
  });

  it.each(APPROVED)("%s describes the picture in its alt text", (id) => {
    for (const [name, , content] of LANGS) {
      const figure = figureOf(content, id);
      expect(figure.alt.length, `${name} ${id} alt`).toBeGreaterThan(80);
      expect(figure.instruction, `${name} ${id} instruction`).toBeTruthy();
    }
  });

  it("the three methods are named, and only radiation needs no medium", () => {
    const dlp = figureOf(scienceF2C9InteractiveDLP, "heat-transfer");
    const note = (id: string) => dlp.concepts.find((c) => c.id === id)!.note.toLowerCase();
    expect(note("conduction")).toMatch(/solid/);
    expect(note("conduction"), "conduction must not migrate particles").toMatch(
      /do not travel|fixed position/,
    );
    expect(note("convection")).toMatch(/less dense/);
    expect(note("radiation")).toMatch(/vacuum|without requiring/);
    // Conduction and convection must not be described as medium-free.
    expect(note("conduction")).not.toMatch(/no medium|without a medium/);
    expect(note("convection")).not.toMatch(/no medium|without a medium/);
  });

  it("names two conductors and two insulators on the four-object scene", () => {
    for (const [name, lang, content] of LANGS) {
      const figure = figureOf(content, "conductor-insulator");
      const captions = figure.concepts.map((c) => (c.spotlightCaption ?? "").toLowerCase());
      const conductor = lang === "bm" ? "konduktor" : "conductor";
      const insulator = lang === "bm" ? "penebat" : "insulator";
      expect(captions.filter((c) => c === conductor).length, `${name} conductors`).toBe(2);
      expect(captions.filter((c) => c === insulator).length, `${name} insulators`).toBe(2);
    }
  });
});

// ------------------------------------------------ E. THE DISPLACED VISUALS

describe("Chapter 9 approved figures — the visuals they replaced are gone", () => {
  it.each(LANGS)("%s places neither the kitchen scene nor the two beakers", (name, _l, content) => {
    const json = JSON.stringify(content);
    for (const src of DISPLACED) expect(json, `${name} still places ${src}`).not.toContain(src);
  });

  it.each(LANGS)("%s no longer carries a convectionRadiation block", (name, _l, content) => {
    expect(
      content.sections.filter((s) => s.convectionRadiation),
      `${name} still teaches convection and radiation separately`,
    ).toHaveLength(0);
  });

  it.each(LANGS)("%s teaches all three methods in one section", (name, _l, content) => {
    const section = content.sections.find((s) => s.ch9SpotlightFigure?.figure === "heat-transfer")!;
    // The retained conduction particle model is secondary, in the same section
    // as the triptych rather than in a section of its own.
    expect(section.conductionDiagram, `${name} lost the conduction particle model`).toBeTruthy();
    expect(
      content.sections.filter((s) => s.conductionDiagram),
      `${name} has a stray second conduction figure`,
    ).toHaveLength(1);
  });
});

// ---------------------------------------------------- F. THE HEAT-FLOW FIGURE

describe("Chapter 9 — which way heat flows", () => {
  it.each(LANGS)("%s establishes the direction before naming a mechanism", (name, _l, content) => {
    const blocks = flowBlocks(content);
    expect(blocks, `${name} heat-flow figures`).toHaveLength(2);
    // The first is the one-stage statement at the head of 9.2.
    expect(
      blocks[0]!.stages.map((s) => s.id),
      name,
    ).toEqual(["flow"]);
    expect(
      blocks[1]!.stages.map((s) => s.id),
      name,
    ).toEqual(["flow", "equilibrium"]);
  });

  it.each(LANGS)("%s keeps the picture and the temperatures in agreement", (name, _l, content) => {
    for (const block of flowBlocks(content)) {
      for (const stage of block!.stages) {
        const equal = stage.leftTemperature === stage.rightTemperature;
        expect(equal, `${name} ${stage.id} temperatures`).toBe(stage.id === "equilibrium");
      }
    }
  });

  it.each(LANGS)("%s says equilibrium is no NET flow, not no flow", (name, lang, content) => {
    const settled = flowBlocks(content)[1]!.stages.find((s) => s.id === "equilibrium")!;
    const note = settled.note.toLowerCase();
    if (lang === "bm") {
      expect(note, name).toMatch(/tiada pemindahan bersih/);
      // "Both directions cancel out" is the too-advanced framing the chapter
      // deliberately no longer teaches: equilibrium is same temperature + no
      // net transfer, not two flows that happen to net to zero.
      expect(note, `${name} still teaches heat crossing both ways at equilibrium`).not.toMatch(
        /kedua-dua arah|saling membatalkan/,
      );
    } else {
      expect(note, name).toMatch(/no net transfer/);
      expect(note, `${name} still teaches heat crossing both ways at equilibrium`).not.toMatch(
        /both directions|cancel/,
      );
    }
  });

  it("draws one arrow while heat flows and a plain connector once it has settled", () => {
    const content = scienceF2C9InteractiveDLP;
    const section = content.sections.find((s) => (s.heatFlowDirection?.stages.length ?? 0) > 1)!;
    const block = section.heatFlowDirection!;
    const flowing = renderState(HeatFlowDirection, block, "stages", "flow", "en");
    const settled = renderState(HeatFlowDirection, block, "stages", "equilibrium", "en");

    // Flowing: exactly one directional arrow, hot -> cold.
    expect(flowing).toContain('data-ch9-flow="hot-to-cold"');
    expect(flowing).not.toContain('data-ch9-flow="none"');
    expect(flowing).toContain("ch9-flow-head)");
    expect(flowing).not.toContain("ch9-flow-head-back");

    // Settled: no arrowhead at all — a pair of opposing arrows would still
    // read as "heat is moving", which is the misconception, not the concept.
    expect(settled).toContain('data-ch9-flow="none"');
    expect(settled).not.toContain('data-ch9-flow="hot-to-cold"');
    expect(settled).not.toContain("ch9-flow-head-back");
    expect(settled).not.toContain("markerEnd");

    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...content, sections: [section] },
        lang: "en",
      }),
    );
    // Opens on the flowing stage: hot -> cold is the claim the chapter rests on.
    expect(markup).toContain('data-ch9-flow="hot-to-cold"');
    expect(markup).not.toContain('data-ch9-flow="none"');
    expect(markup).toContain('data-ch9-flow-control="equilibrium"');
  });

  it("offers no control for the single-stage figure", () => {
    // One stage is a statement, not a choice; a lone button would imply there
    // is something else to look at.
    const content = scienceF2C9InteractiveDLP;
    const section = content.sections.find((s) => s.heatFlowDirection?.stages.length === 1)!;
    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...content, sections: [section] },
        lang: "en",
      }),
    );
    expect(markup).toContain('data-ch9-flow-stage="flow"');
    expect(markup).not.toContain("data-ch9-flow-control=");
  });
});

// ------------------------------------------- G. THE INSULATION INVESTIGATION

describe("Chapter 9 — the insulation investigation", () => {
  it.each(LANGS)("%s tests four flasks, K to N", (name, _l, content) => {
    const part = experimentOf(content).parts[0];
    const method = part.method.join(" ");
    for (const flask of ["K", "L", "M", "N"]) {
      expect(method, `${name} flask ${flask}`).toContain(flask);
    }
    expect(part.controlled.length, `${name} controlled variables`).toBeGreaterThan(30);
  });

  it.each(LANGS)(
    "%s ranks the flasks without inventing a temperature reading",
    (name, _l, content) => {
      const part = experimentOf(content).parts[0];
      const text = `${part.observation} ${part.conclusion}`;
      // No fabricated temperature data: the source gives none.
      expect(text, `${name} invents a temperature reading`).not.toMatch(/\d+(\.\d+)?\s*°\s*C/);
      // The formal responding variable is the final temperature after a named
      // duration, so the duration itself is expected here — but it must be the
      // experiment's own duration everywhere it appears, never a second,
      // invented one.
      for (const m of text.matchAll(/(\d+)\s*(?:minit|minutes|min)\b/g)) {
        expect(m[1], `${name} names a duration other than the experiment's own 10 minutes`).toBe(
          "10",
        );
      }
    },
  );

  it.each(LANGS)("%s never claims insulation stops heat", (name, lang, content) => {
    const part = experimentOf(content).parts[0];
    const conclusion = part.conclusion.toLowerCase();
    if (lang === "bm") {
      expect(conclusion, name).toMatch(/melambatkan/);
      expect(conclusion, name).toMatch(/bukan menghentikannya|tetap menyejuk/);
    } else {
      expect(conclusion, name).toMatch(/slows/);
      expect(conclusion, name).toMatch(/does not stop it|still cools/);
    }
  });
});

// ------------------------------------------------------------ H. THE RENDER

describe("Chapter 9 approved figures — as rendered", () => {
  it.each(LANGS)("%s renders all three approved figures", (name, lang, content) => {
    const markup = markupOf(content, lang);
    for (const [, src] of APPROVED) {
      expect(markup, `${name} does not render ${src}`).toContain(`src="${src}"`);
    }
    for (const src of DISPLACED) {
      expect(markup, `${name} still renders ${src}`).not.toContain(`src="${src}"`);
    }
  });

  it.each(LANGS)("%s opens each figure on its first region", (name, lang, content) => {
    for (const [id] of APPROVED) {
      const section = content.sections.find((s) => s.ch9SpotlightFigure?.figure === id)!;
      const figure = section.ch9SpotlightFigure!;
      const markup = renderToStaticMarkup(
        createElement(ScienceF2InteractiveNotesBlock, {
          content: { ...content, sections: [section] },
          lang,
        }),
      );
      const pressed = [...markup.matchAll(/<button[^>]*aria-pressed="true"[^>]*>([^<]*)/g)].map(
        (m) => m[1],
      );
      // An unselected comparison figure reads as broken, not as an invitation.
      expect(pressed.length, `${name} ${id} has no selected region`).toBeGreaterThan(0);
      expect(markup, `${name} ${id} explanation panel`).toContain('aria-live="polite"');
      expect(markup).toContain(figure.concepts[0].note.slice(0, 40));
    }
  });

  it.each(LANGS)(
    "%s gives every region control a tap target and a focus ring",
    (name, lang, content) => {
      // The figure alone, so the assertion is about ITS controls rather than
      // about whatever else the surrounding section happens to render.
      for (const [id] of APPROVED) {
        const block = figureOf(content, id);
        const markup = renderToStaticMarkup(
          createElement(Chapter9SpotlightFigure, { block, lang }),
        );
        const buttons = [...markup.matchAll(/<button[^>]*>/g)].map((m) => m[0]);
        const regionControls = buttons.filter((b) => b.includes("aria-pressed="));
        expect(regionControls.length, `${name} ${id}`).toBe(CH9_FIGURE_ORDER[id].length);
        for (const button of regionControls) {
          expect(button, `${name} ${id}`).toContain("min-h-11");
          expect(button, `${name} ${id}`).toContain("focus-visible:ring-2");
        }
      }
    },
  );

  it.each(LANGS)("%s shows the whole picture rather than cropping it", (name, lang, content) => {
    // Every hotspot is in the artwork's own coordinates, so a crop would move
    // the regions off the things they name.
    for (const [id] of APPROVED) {
      const markup = renderToStaticMarkup(
        createElement(Chapter9SpotlightFigure, { block: figureOf(content, id), lang }),
      );
      expect(markup, `${name} ${id}`).toContain("object-contain");
      expect(markup, `${name} ${id}`).not.toContain("object-cover");
    }
  });
});
