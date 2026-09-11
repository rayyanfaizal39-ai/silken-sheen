import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import {
  LEARNING_IMAGE_VARIANTS,
  parseAspectRatio,
  type LearningImageSize,
} from "@/components/notes/blocks/learning-image";
import type { AnnotatedImageBlock, ScienceF2InteractiveContent } from "./interactive-types";
import {
  SCIENCE_F2_CH7_IMAGES,
  SCIENCE_F2_CH9_IMAGES,
  SCIENCE_F2_CH10_IMAGES,
  SCIENCE_F2_VISUAL_ASSETS,
} from "./visual-assets";
import { scienceF2C7InteractiveBM } from "./chapter-7/interactive-bm";
import { scienceF2C7InteractiveDLP } from "./chapter-7/interactive-dlp";
import { scienceF2C8InteractiveBM } from "./chapter-8/interactive-bm";
import { scienceF2C9InteractiveBM } from "./chapter-9/interactive-bm";
import { scienceF2C9InteractiveDLP } from "./chapter-9/interactive-dlp";
import { scienceF2C10InteractiveBM } from "./chapter-10/interactive-bm";
import { scienceF2C10InteractiveDLP } from "./chapter-10/interactive-dlp";
import { scienceF2C11InteractiveBM } from "./chapter-11/interactive-bm";
import { scienceF2C12InteractiveBM } from "./chapter-12/interactive-bm";
import { scienceF2C13InteractiveBM } from "./chapter-13/interactive-bm";

/**
 * Guards the contextual visual pack integrated into Form 2 Science Chapters 7,
 * 9 and 10 — see SCIENCE_F2_CH07_CH09_CH10_VISUAL_IMPLEMENTATION_CHANGELOG.md.
 *
 * Unlike the Chapters 4-6 pack, none of this artwork carries baked-in text, so
 * BM and DLP ship the SAME twenty-four files and every label, caption and alt
 * string comes from chapter content. The parity assertions below are what stop
 * that drifting: the two languages must reference identical files in identical
 * sections, with different words.
 */

const CH7_ASSETS: string[] = Object.values(SCIENCE_F2_CH7_IMAGES);

/**
 * Chapter 7's remaining contextual scenes — the ones rendered through
 * `AnnotatedImage`, which everything in this file is about. The old
 * four-panel "dailyLife" composite was removed from the learner-facing
 * content in the final correction pass (it duplicated the approved lightning
 * visual and the daily-life accordions), so it is no longer expected here.
 * The other three files are apparatus photographs carrying a generated SVG
 * teaching layer, a different component with different rules; they are
 * guarded by chapter-7/chapter-7-field-overlays.test.tsx.
 */
const CH7_CONTEXT_ASSETS: string[] = [
  SCIENCE_F2_CH7_IMAGES.chargeTransfer,
  SCIENCE_F2_CH7_IMAGES.meterPlacement,
  SCIENCE_F2_CH7_IMAGES.electromagnetUses,
];
const CH9_ASSETS: string[] = Object.values(SCIENCE_F2_CH9_IMAGES);

/**
 * Chapter 9's figures rendered through `AnnotatedImage`, which is what this
 * file is about. Its other files either lead the chapter page (the hero) or
 * are the base a deterministic SVG teaching layer is drawn on; both are
 * different components with different rules, and are guarded by
 * chapter-9/chapter-9-heat-visuals.test.tsx.
 */
const CH9_CONTEXT_ASSETS: string[] = [
  SCIENCE_F2_CH9_IMAGES.heatVsTemperature,
  SCIENCE_F2_CH9_IMAGES.conductorInsulator,
  SCIENCE_F2_CH9_IMAGES.expansionUses,
  SCIENCE_F2_CH9_IMAGES.greenBuilding,
];
const CH10_ASSETS: string[] = Object.values(SCIENCE_F2_CH10_IMAGES);

const PUBLIC_ROOT = resolve(process.cwd(), "public");

/** The size variants this pack is allowed to use, with their spec ceilings. */
const CONTEXTUAL_SIZES: Record<string, { maxWidth: number; maxHeight: number }> = {
  // Single-scene contextual images: <=600px wide, ~340-360px tall.
  scene: { maxWidth: 600, maxHeight: 360 },
  // The bell jar, whose 4:3 shape makes the height budget bind first.
  sceneTall: { maxWidth: 560, maxHeight: 380 },
  // Multi-panel comparisons: <=660px wide, ~370-380px tall.
  panel: { maxWidth: 660, maxHeight: 380 },
  // One half of the sea-breeze / land-breeze pair.
  pair: { maxWidth: 460, maxHeight: 300 },
};

type Placed = { sectionIndex: number; sectionNumber: string; slot: string } & AnnotatedImageBlock;

/** Every figure from this pack that a chapter renders, in render order. */
function figuresOf(content: ScienceF2InteractiveContent): Placed[] {
  return content.sections.flatMap((section, sectionIndex) =>
    (
      [
        ["contextImages", section.contextImages ?? []],
        ["contextImagePair", section.contextImagePair ?? []],
        ["images", section.images ?? []],
      ] as const
    ).flatMap(([slot, images]) =>
      images
        .filter((image) => SCIENCE_F2_VISUAL_ASSETS.includes(image.src))
        .map((image) => ({
          ...image,
          slot,
          sectionIndex,
          sectionNumber: section.number,
        })),
    ),
  );
}

/**
 * The sectioned shell renders one section body at a time, so a whole-chapter
 * render only carries the first. Rendering section by section and joining the
 * markup is the pattern the rest of this suite uses.
 */
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

/** Escapes a content string so it can be matched inside rendered HTML. */
function html(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const CHAPTERS: {
  name: string;
  expected: string[];
  bm: ScienceF2InteractiveContent;
  dlp: ScienceF2InteractiveContent;
}[] = [
  {
    name: "chapter 7",
    expected: CH7_CONTEXT_ASSETS,
    bm: scienceF2C7InteractiveBM,
    dlp: scienceF2C7InteractiveDLP,
  },
  {
    name: "chapter 9",
    expected: CH9_CONTEXT_ASSETS,
    bm: scienceF2C9InteractiveBM,
    dlp: scienceF2C9InteractiveDLP,
  },
  {
    name: "chapter 10",
    expected: CH10_ASSETS,
    bm: scienceF2C10InteractiveBM,
    dlp: scienceF2C10InteractiveDLP,
  },
];

const EVERY_VIEW: [string, ScienceF2InteractiveContent, "bm" | "en"][] = CHAPTERS.flatMap(
  ({ name, bm, dlp }) =>
    [
      [`${name} bm`, bm, "bm"],
      [`${name} dlp`, dlp, "en"],
    ] as [string, ScienceF2InteractiveContent, "bm" | "en"][],
);

describe("Science F2 Ch7/9/10 — assets on disk", () => {
  it("ships exactly twenty-seven files", () => {
    // Twenty-four in the original pack, plus the three later approved Chapter 7
    // figures (electroscope, lightning formation, electromagnet investigation).
    // Those three are not `contextImages`, so they are guarded by
    // chapter-7/chapter-7-approved-figures.test.tsx rather than by the
    // placement and authoring assertions below.
    expect(SCIENCE_F2_VISUAL_ASSETS).toHaveLength(27);
    expect(new Set(SCIENCE_F2_VISUAL_ASSETS).size).toBe(27);
  });

  it.each(SCIENCE_F2_VISUAL_ASSETS)("%s exists and is not empty", (src) => {
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(1024);
  });

  it("references WebP only — no production PNG for this pack", () => {
    for (const src of SCIENCE_F2_VISUAL_ASSETS) {
      expect(src.endsWith(".webp")).toBe(true);
    }
  });

  it("ships no PNG duplicate beside any converted file", () => {
    for (const src of SCIENCE_F2_VISUAL_ASSETS) {
      const png = resolve(PUBLIC_ROOT, src.replace(/^\//, "").replace(/\.webp$/, ".png"));
      expect(existsSync(png)).toBe(false);
    }
  });
});

describe("Science F2 Ch7/9/10 — placement", () => {
  it.each(CHAPTERS)("$name integrates each of its images exactly once, in both languages", ({
    expected,
    bm,
    dlp,
  }) => {
    for (const content of [bm, dlp]) {
      const srcs = figuresOf(content).map((figure) => figure.src);
      expect(srcs.slice().sort()).toEqual(expected.slice().sort());
    }
  });

  it.each(EVERY_VIEW)("%s carries no image belonging to another chapter", (_name, content) => {
    const own =
      content.chapter === 7 ? CH7_ASSETS : content.chapter === 9 ? CH9_ASSETS : CH10_ASSETS;
    const foreign = SCIENCE_F2_VISUAL_ASSETS.filter((src) => !own.includes(src));
    const srcs = new Set(figuresOf(content).map((figure) => figure.src));
    for (const src of foreign) expect(srcs.has(src)).toBe(false);
  });

  it.each(CHAPTERS)("$name places every image in the same section in BM and DLP", ({ bm, dlp }) => {
    const place = (content: ScienceF2InteractiveContent) =>
      Object.fromEntries(
        figuresOf(content).map((figure) => [
          figure.src,
          `${figure.sectionIndex}:${figure.sectionNumber}:${figure.slot}`,
        ]),
      );
    expect(place(bm)).toEqual(place(dlp));
  });

  it("keeps the sea-breeze and land-breeze photographs, one per breeze", () => {
    // They used to sit above the breeze figure as a static pair, beside a
    // schematic that mirrored them. Each is now the surface its own breeze is
    // taught on, so the pair slot is empty and the photographs live in the
    // figure — same two files, same order, one fewer thing to reconcile.
    for (const content of [scienceF2C9InteractiveBM, scienceF2C9InteractiveDLP]) {
      expect(content.sections.filter((section) => section.contextImagePair?.length)).toHaveLength(0);
      const breeze = content.sections.find((section) => section.breezeDiagram)!.breezeDiagram!;
      expect(breeze.breezes.map((b) => b.image.src)).toEqual([
        SCIENCE_F2_CH9_IMAGES.seaBreeze,
        SCIENCE_F2_CH9_IMAGES.landBreeze,
      ]);
    }
  });

  it("leaves chapters 8, 11, 12 and 13 free of this pack", () => {
    for (const content of [
      scienceF2C8InteractiveBM,
      scienceF2C11InteractiveBM,
      scienceF2C12InteractiveBM,
      scienceF2C13InteractiveBM,
    ]) {
      expect(figuresOf(content)).toHaveLength(0);
    }
  });
});

describe("Science F2 Ch7/9/10 — figure authoring", () => {
  it.each(EVERY_VIEW)("%s gives every figure alt text and a caption", (_name, content) => {
    for (const figure of figuresOf(content)) {
      expect(figure.alt.trim().length).toBeGreaterThan(20);
      expect((figure.caption ?? "").trim().length).toBeGreaterThan(10);
    }
  });

  it.each(CHAPTERS)("$name writes its own words for each language", ({ bm, dlp }) => {
    const bmFigures = new Map(figuresOf(bm).map((figure) => [figure.src, figure]));
    for (const figure of figuresOf(dlp)) {
      const other = bmFigures.get(figure.src);
      expect(other).toBeDefined();
      expect(other?.alt).not.toBe(figure.alt);
      expect(other?.caption).not.toBe(figure.caption);
    }
  });

  it.each(EVERY_VIEW)("%s declares an explicit contextual size and aspect", (_name, content) => {
    for (const figure of figuresOf(content)) {
      expect(figure.size).toBeDefined();
      expect(Object.keys(CONTEXTUAL_SIZES)).toContain(figure.size);
      expect(figure.aspect).toMatch(/^\d+ \/ \d+$/);
    }
  });

  it.each(EVERY_VIEW)("%s stays inside the agreed size ceilings", (_name, content) => {
    for (const figure of figuresOf(content)) {
      const size = figure.size as LearningImageSize;
      const spec = CONTEXTUAL_SIZES[size];
      const variant = LEARNING_IMAGE_VARIANTS[size];
      const ratio = parseAspectRatio(figure.aspect ?? "3 / 2");
      // The rendered width is the smaller of the variant cap and
      // heightBudget * ratio; the height then follows from the ratio.
      const budget = Number(/min\((?:[\d.]+vh), (\d+)px\)/.exec(variant.heightBudget)?.[1]);
      const width = Math.min(variant.maxWidth, budget * ratio);
      expect(width).toBeLessThanOrEqual(spec.maxWidth);
      expect(width / ratio).toBeLessThanOrEqual(spec.maxHeight);
    }
  });

  it.each(EVERY_VIEW)("%s adds no marker over the artwork", (_name, content) => {
    // These are recognition visuals sitting beside a precise diagram, not
    // labelled figures. A hotspot here would be a second, competing label set.
    // The one exception is the green building, where the picture IS the
    // lesson — every feature it names is a thing to find on the house — so it
    // is the figure being pointed at rather than one sitting beside a diagram.
    for (const figure of figuresOf(content)) {
      if (figure.src === SCIENCE_F2_CH9_IMAGES.greenBuilding) {
        expect(figure.annotations.length).toBeGreaterThan(0);
        continue;
      }
      expect(figure.annotations, figure.src).toEqual([]);
    }
  });

  it.each(EVERY_VIEW)("%s loads its leading figure eagerly and the rest lazily", (_name, content) => {
    for (const figure of figuresOf(content)) {
      expect(figure.priority).toBe(figure.slot !== "images");
    }
  });
});

describe("Science F2 Ch7/9/10 — rendering", () => {
  it.each(EVERY_VIEW)("%s renders every figure with its alt text", (_name, content, lang) => {
    const markup = markupOf(content, lang);
    for (const figure of figuresOf(content)) {
      expect(markup).toContain(`src="${figure.src}"`);
      expect(markup, figure.src).toContain(`alt="${html(figure.alt)}"`);
      expect(markup, figure.src).toContain(html(figure.caption ?? ""));
    }
  });

  it.each(EVERY_VIEW)("%s offers an enlarge control on every figure", (_name, content, lang) => {
    const markup = markupOf(content, lang);
    const enlargeLabel = lang === "bm" ? "Besarkan" : "Enlarge";
    for (const figure of figuresOf(content)) {
      expect(markup, figure.src).toContain(
        `aria-label="${enlargeLabel} — ${html(figure.alt)}"`,
      );
    }
  });

  it.each(EVERY_VIEW)("%s defers only the figures that do not lead a section", (_name, content, lang) => {
    const markup = markupOf(content, lang);
    for (const figure of figuresOf(content)) {
      const tag = markup.slice(markup.indexOf(`src="${figure.src}"`));
      const attrs = tag.slice(0, tag.indexOf(">"));
      expect(attrs, figure.src).toContain(figure.priority ? 'loading="eager"' : 'loading="lazy"');
      expect(attrs, figure.src).toContain('decoding="async"');
    }
  });

  it.each(EVERY_VIEW)("%s renders no broken or PNG image reference", (_name, content, lang) => {
    const markup = markupOf(content, lang);
    expect(markup).not.toContain('src=""');
    for (const src of SCIENCE_F2_VISUAL_ASSETS) {
      expect(markup).not.toContain(src.replace(/\.webp$/, ".png"));
    }
  });

  it.each(EVERY_VIEW)("%s still renders every section title", (_name, content, lang) => {
    const markup = markupOf(content, lang);
    for (const section of content.sections) {
      expect(markup, section.title).toContain(html(section.title));
    }
  });

  it("still offers the paired layout, unused now that each breeze owns its photograph", () => {
    // The layout is kept for the next matched pair a chapter needs; what
    // changed is that Chapter 9 no longer has one to render.
    const source = readFileSync(
      resolve(process.cwd(), "src/components/notes/ScienceF2InteractiveNotesBlock.tsx"),
      "utf8",
    );
    expect(source).toContain('data-figure-pair=""');
    expect(source).toContain("grid gap-3 sm:grid-cols-2");
    expect(markupOf(scienceF2C9InteractiveDLP, "en")).not.toContain('data-figure-pair=""');
  });
});
