import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { InteractiveFigureCard } from "@/components/notes/blocks/InteractiveFigureCard";
import type { ScienceF2InteractiveContent } from "./interactive-types";
import { scienceF2C1InteractiveBM } from "./chapter-1/interactive-bm";
import { scienceF2C1InteractiveDLP } from "./chapter-1/interactive-dlp";
import { scienceF2C2InteractiveBM } from "./chapter-2/interactive-bm";
import { scienceF2C2InteractiveDLP } from "./chapter-2/interactive-dlp";
import { scienceF2C3InteractiveBM } from "./chapter-3/interactive-bm";
import { scienceF2C3InteractiveDLP } from "./chapter-3/interactive-dlp";
import { scienceF2C4InteractiveBM } from "./chapter-4/interactive-bm";
import { scienceF2C4InteractiveDLP } from "./chapter-4/interactive-dlp";
import { scienceF2C5InteractiveBM } from "./chapter-5/interactive-bm";
import { scienceF2C5InteractiveDLP } from "./chapter-5/interactive-dlp";
import { scienceF2C6InteractiveBM } from "./chapter-6/interactive-bm";
import { scienceF2C6InteractiveDLP } from "./chapter-6/interactive-dlp";

/**
 * Guards the Chapters 1-6 interactive-figure cleanup — see
 * SCIENCE_F2_CH01_CH06_INTERACTIVE_VISUAL_UX_CHANGELOG.md.
 *
 * Two things are protected here. First, ONE CONCEPT = ONE PRIMARY VISUAL:
 * where approved artwork replaced a schematic, the schematic must be gone, not
 * stacked above it. Second, the affordance: an interactive figure has to say it
 * is interactive, in the reader's own language, with controls that all lead
 * somewhere.
 */

type Pair = {
  name: string;
  bm: ScienceF2InteractiveContent;
  dlp: ScienceF2InteractiveContent;
};

const CHAPTERS: Pair[] = [
  { name: "chapter 2", bm: scienceF2C2InteractiveBM, dlp: scienceF2C2InteractiveDLP },
  { name: "chapter 3", bm: scienceF2C3InteractiveBM, dlp: scienceF2C3InteractiveDLP },
  { name: "chapter 4", bm: scienceF2C4InteractiveBM, dlp: scienceF2C4InteractiveDLP },
  { name: "chapter 5", bm: scienceF2C5InteractiveBM, dlp: scienceF2C5InteractiveDLP },
  { name: "chapter 6", bm: scienceF2C6InteractiveBM, dlp: scienceF2C6InteractiveDLP },
];

/**
 * The six concepts where approved artwork took over from a schematic, with a
 * marker string that only the schematic renders. If a marker comes back, the
 * old drawing is on screen again.
 */
const REPLACED = [
  {
    concept: "capillary action",
    chapter: () => scienceF2C5InteractiveDLP,
    bm: () => scienceF2C5InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.capillaryDiagram,
    schematicMarker: 'viewBox="0 0 300 200"',
  },
  {
    concept: "electrolysis of water",
    chapter: () => scienceF2C5InteractiveDLP,
    bm: () => scienceF2C5InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.electrolysisDiagram,
    schematicMarker: 'viewBox="0 0 320 200"',
  },
  {
    concept: "solution / suspension / colloid",
    chapter: () => scienceF2C5InteractiveDLP,
    bm: () => scienceF2C5InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.mixtureComparison,
    schematicMarker: 'viewBox="0 0 110 74"',
  },
  {
    concept: "water treatment system",
    chapter: () => scienceF2C5InteractiveDLP,
    bm: () => scienceF2C5InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.waterTreatmentFlow,
    schematicMarker: '<ol class="flex flex-wrap items-stretch gap-1"',
  },
  {
    concept: "acid-alkali titration",
    chapter: () => scienceF2C6InteractiveDLP,
    bm: () => scienceF2C6InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.titrationSchematic,
    schematicMarker: 'viewBox="0 0 240 200"',
  },
  {
    concept: "why water matters",
    chapter: () => scienceF2C6InteractiveDLP,
    bm: () => scienceF2C6InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.dryVsAqueous,
    schematicMarker: 'viewBox="0 0 92 66"',
  },
  {
    concept: "three lines of body defence",
    chapter: () => scienceF2C4InteractiveDLP,
    bm: () => scienceF2C4InteractiveBM,
    block: (s: ScienceF2InteractiveContent["sections"][number]) => s.defenceLines,
    // Only the schematic groups the lines into specific / non-specific
    // <section>s; the figure card renders one role="group" control row.
    schematicMarker: "<section aria-label=",
  },
];

/** The sectioned shell shows one section body at a time, so render per section. */
function render(content: ScienceF2InteractiveContent, lang: "bm" | "en"): string {
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
 * Chapter 1's figures live past the first section, and the sectioned shell only
 * renders the open one, so the card is exercised directly with Chapter 1's own
 * image data instead.
 */
function renderChapterOneFigure(lang: "bm" | "en"): string {
  const content = lang === "bm" ? scienceF2C1InteractiveBM : scienceF2C1InteractiveDLP;
  const block = content.classificationImages!.animalOverview!;
  return renderToStaticMarkup(
    createElement(InteractiveFigureCard, {
      lang,
      concepts: block.annotations,
      showControls: false,
      image: {
        src: block.src,
        alt: block.alt,
        size: block.size,
        aspect: block.aspect,
        legendLabel: block.legendLabel,
        annotationMode: block.annotationMode ?? "labels",
      },
    }),
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

function occurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/** Every approved WebP a chapter renders, by bundled filename. */
function assetFilenames(markup: string): string[] {
  return [...markup.matchAll(/src="([^"]*chapter[1-6][^"]*\.webp[^"]*)"/g)].map((m) =>
    m[1].split("/").pop()!.split("?")[0],
  );
}

describe("duplicate visual cleanup", () => {
  it.each(REPLACED)(
    "$concept renders the approved artwork and not the old schematic",
    ({ chapter, block, schematicMarker }) => {
      const content = chapter();
      const section = content.sections.find((s) => block(s));
      expect(section, "section carrying the block").toBeDefined();

      const carried = block(section!)!;
      expect(carried.image, "approved artwork attached to the block").toBeDefined();

      const markup = renderToStaticMarkup(
        createElement(ScienceF2InteractiveNotesBlock, {
          content: { ...content, sections: [section!] },
          lang: "en" as const,
        }),
      );

      expect(markup).toContain(carried.image!.src.split("?")[0]);
      expect(markup, "old schematic must not render beside the artwork").not.toContain(
        schematicMarker,
      );
    },
  );

  it.each(REPLACED)(
    "$concept keeps its schematic on the BM surface, which has no approved artwork",
    ({ bm, block, schematicMarker }) => {
      const content = bm();
      const section = content.sections.find((s) => block(s));
      expect(section).toBeDefined();
      expect(block(section!)!.image, "BM must not carry the English-labelled artwork").toBeUndefined();

      const markup = renderToStaticMarkup(
        createElement(ScienceF2InteractiveNotesBlock, {
          content: { ...content, sections: [section!] },
          lang: "bm" as const,
        }),
      );
      expect(markup, "BM keeps the visual it already had").toContain(schematicMarker);
    },
  );

  it.each(REPLACED)("$concept lists its artwork in one slot only", ({ chapter, block }) => {
    const content = chapter();
    const section = content.sections.find((s) => block(s))!;
    const src = block(section)!.image!.src;
    // The same file must not also sit in the section's standalone image list —
    // that would put the picture on screen twice.
    expect((section.images ?? []).map((image) => image.src)).not.toContain(src);
  });

  it.each(CHAPTERS)("$name renders every approved asset exactly once", ({ dlp }) => {
    const markup = render(dlp, "en");
    const files = assetFilenames(markup);
    for (const file of new Set(files)) {
      expect(occurrences(markup, file), file).toBe(1);
    }
  });
});

describe("interactive figure affordance", () => {
  it.each(CHAPTERS)("$name announces every interactive figure in DLP", ({ dlp }) => {
    const markup = render(dlp, "en");
    const badges = occurrences(markup, ">Interactive<");
    expect(badges, "at least one figure carries the interactive badge").toBeGreaterThan(0);
    // Each badge is paired with an instruction line and an explanation panel.
    expect(occurrences(markup, 'aria-live="polite"')).toBeGreaterThanOrEqual(badges);
  });

  it("chapter 1 announces its interactive figures in both languages", () => {
    const en = renderChapterOneFigure("en");
    expect(en).toContain(">Interactive<");
    expect(en).toContain("Tap a concept to explore.");
    expect(en).toContain("Tap a concept above to see what it does.");
    expect(en).not.toContain(">Interaktif<");

    const bm = renderChapterOneFigure("bm");
    expect(bm).toContain(">Interaktif<");
    expect(bm).toContain("Tekan konsep untuk meneroka.");
    expect(bm).toContain("Tekan konsep di atas untuk melihat penerangannya.");
    expect(bm, "English chrome must not leak onto a BM figure").not.toContain(">Interactive<");
  });

  it.each(CHAPTERS)("$name uses BM interaction copy on the BM surface", ({ bm }) => {
    const markup = render(bm, "bm");
    if (!markup.includes(">Interaktif<")) return; // chapter has no figure card
    expect(markup, "English badge must not leak onto a BM page").not.toContain(">Interactive<");
    expect(markup).not.toContain("Tap a concept");
    expect(markup).not.toContain("aria-label=\"Enlarge");
  });

  it.each(CHAPTERS)("$name gives every concept button something to say", ({ dlp }) => {
    for (const section of dlp.sections) {
      const groups = [
        section.capillaryDiagram && {
          image: section.capillaryDiagram.image,
          items: section.capillaryDiagram.labels,
        },
        section.electrolysisDiagram && {
          image: section.electrolysisDiagram.image,
          items: section.electrolysisDiagram.labels,
        },
        section.titrationSchematic && {
          image: section.titrationSchematic.image,
          items: section.titrationSchematic.labels,
        },
        section.mixtureComparison && {
          image: section.mixtureComparison.image,
          items: section.mixtureComparison.kinds.map((k) => ({ id: k.id, label: k.name, note: k.note })),
        },
        section.waterTreatmentFlow && {
          image: section.waterTreatmentFlow.image,
          items: section.waterTreatmentFlow.stages.map((s) => ({ id: s.id, label: s.name, note: s.fn })),
        },
        section.defenceLines && {
          image: section.defenceLines.image,
          items: section.defenceLines.lines.map((l) => ({ id: l.id, label: l.name, note: l.note })),
        },
        section.dryVsAqueous && {
          image: section.dryVsAqueous.image,
          items: section.dryVsAqueous.panels.map((p) => ({
            id: p.id,
            label: p.substance,
            note: p.note,
          })),
        },
      ];

      for (const group of groups) {
        if (!group?.image) continue;
        const ids = [...group.items.map((i) => i.id), ...(group.image.extra ?? []).map((e) => e.id)];
        expect(new Set(ids).size, "concept ids are unique within a figure").toBe(ids.length);
        for (const item of group.items) {
          expect(item.note?.trim().length ?? 0, `${item.id} has an explanation`).toBeGreaterThan(0);
          expect(item.label.trim().length, `${item.id} has a label`).toBeGreaterThan(0);
        }
        for (const extra of group.image.extra ?? []) {
          expect(extra.note?.trim().length ?? 0, `${extra.id} has an explanation`).toBeGreaterThan(0);
        }
        // Every point maps to a concept that actually exists.
        for (const point of group.image.points) {
          expect(ids, `point ${point.id} matches a concept`).toContain(point.id);
        }
      }

      for (const image of section.images ?? []) {
        const ids = image.annotations.map((a) => a.id);
        expect(new Set(ids).size, "concept ids are unique within a figure").toBe(ids.length);
        for (const annotation of image.annotations) {
          expect(annotation.note?.trim().length ?? 0, annotation.id).toBeGreaterThan(0);
        }
      }
    }
  });

  it.each(CHAPTERS)("$name renders concept buttons as real pressable controls", ({ dlp }) => {
    const markup = render(dlp, "en");
    if (!markup.includes(">Interactive<")) return;
    // Buttons declare their selected state, and are sized for a thumb.
    expect(markup).toContain('aria-pressed="false"');
    expect(markup).toContain("min-h-11");
  });

  it("water treatment keeps the two stages the artwork does not depict", () => {
    const section = scienceF2C5InteractiveDLP.sections.find((s) => s.waterTreatmentFlow)!;
    const flow = section.waterTreatmentFlow!;
    const depicted = new Set(flow.image!.points.map((p) => p.id));
    const undepicted = flow.stages.filter((stage) => !depicted.has(stage.id));

    // They are control-only, but they must still be taught.
    expect(undepicted.map((s) => s.id)).toEqual(["reservoir"]);
    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...scienceF2C5InteractiveDLP, sections: [section] },
        lang: "en" as const,
      }),
    );
    for (const stage of flow.stages) {
      expect(markup, stage.id).toContain(html(stage.name));
    }
  });

  it("solution / suspension / colloid keeps the comparison table it replaced", () => {
    const section = scienceF2C5InteractiveDLP.sections.find((s) => s.mixtureComparison)!;
    const block = section.mixtureComparison!;
    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...scienceF2C5InteractiveDLP, sections: [section] },
        lang: "en" as const,
      }),
    );
    // The drawn beakers are gone; every fact they sat beside is still authored.
    for (const kind of block.kinds) {
      expect(kind.appearance.length).toBeGreaterThan(0);
      expect(kind.filtration.length).toBeGreaterThan(0);
      expect(kind.example.length).toBeGreaterThan(0);
      expect(markup).toContain(html(kind.name));
    }
  });
});

describe("why water matters — visual replacement", () => {
  const section = scienceF2C6InteractiveDLP.sections.find((s) => s.dryVsAqueous)!;
  const block = section.dryVsAqueous!;

  it("ships the approved WebP, with no runtime PNG reference", () => {
    expect(block.image, "approved artwork attached").toBeDefined();
    const src = block.image!.src.split("?")[0];
    expect(src.endsWith(".webp"), src).toBe(true);
    expect(src).toContain("why-water-matters-acids-alkalis");
    const index = src.indexOf("src/assets/");
    expect(existsSync(resolve(process.cwd(), src.slice(index))), src).toBe(true);
  });

  it("carries the required DLP alt text", () => {
    expect(block.image!.alt).toBe(
      "Four-panel comparison showing that acids and alkalis show their characteristic properties only in the presence of water.",
    );
  });

  it("keeps all four cases, each with an explanation and a region", () => {
    expect(block.panels).toHaveLength(4);
    expect(block.panels.map((p) => p.id)).toEqual([
      "acid-dry",
      "acid-wet",
      "alkali-dry",
      "alkali-wet",
    ]);
    for (const panel of block.panels) {
      expect(panel.note.trim().length, panel.id).toBeGreaterThan(0);
      expect(block.image!.points.map((p) => p.id), panel.id).toContain(panel.id);
    }
  });

  it("labels the four buttons from the chapter's own localised strings", () => {
    for (const [content, lang, expected] of [
      [scienceF2C6InteractiveDLP, "en", ["Acid: without water", "Acid: with water", "Alkali: without water", "Alkali: with water"]],
      [scienceF2C6InteractiveBM, "bm", ["Asid: tanpa air", "Asid: dengan air", "Alkali: tanpa air", "Alkali: dengan air"]],
    ] as const) {
      const dry = content.sections.find((s) => s.dryVsAqueous)!.dryVsAqueous!;
      const composed = dry.panels.map((panel) => {
        const group = (panel.id.startsWith("acid") ? dry.acidColumnLabel : dry.alkaliColumnLabel)
          .split("—")[0]
          .trim();
        const water = panel.withWater ? dry.withWaterLabel : dry.withoutWaterLabel;
        return `${group}: ${water.toLocaleLowerCase()}`;
      });
      expect(composed, lang).toEqual(expected);
    }
  });

  it("renders the artwork on DLP and the schematic on BM, never both", () => {
    const dlp = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...scienceF2C6InteractiveDLP, sections: [section] },
        lang: "en" as const,
      }),
    );
    expect(dlp).toContain(block.image!.src.split("?")[0]);
    expect(dlp, "old four-panel SVG must be gone").not.toContain('viewBox="0 0 92 66"');
    expect(occurrences(dlp, "why-water-matters-acids-alkalis")).toBe(1);

    const bmSection = scienceF2C6InteractiveBM.sections.find((s) => s.dryVsAqueous)!;
    expect(bmSection.dryVsAqueous!.image, "BM must not carry the English artwork").toBeUndefined();
    const bm = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...scienceF2C6InteractiveBM, sections: [bmSection] },
        lang: "bm" as const,
      }),
    );
    expect(bm).toContain('viewBox="0 0 92 66"');
    expect(bm).not.toContain("why-water-matters");
  });
});

describe("preserved interactions", () => {
  it("chapter 4 still renders the primary and secondary immune response graph", () => {
    const section = scienceF2C4InteractiveDLP.sections.find((s) => s.immuneResponseGraph);
    expect(section, "immune response graph section").toBeDefined();
    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...scienceF2C4InteractiveDLP, sections: [section!] },
        lang: "en" as const,
      }),
    );
    expect(markup).toContain(html(section!.immuneResponseGraph!.title));
    // ...and no second visual was added beside it.
    expect(assetFilenames(markup)).toEqual([]);
  });

  it.each([
    ["pH slider", (s: ScienceF2InteractiveContent["sections"][number]) => s.phSlider],
    ["indicator table", (s: ScienceF2InteractiveContent["sections"][number]) => s.indicatorTable],
    ["dry versus aqueous", (s: ScienceF2InteractiveContent["sections"][number]) => s.dryVsAqueous],
    ["strong versus weak", (s: ScienceF2InteractiveContent["sections"][number]) => s.strengthComparison],
  ])("chapter 6 preserves its %s interaction", (_name, pick) => {
    for (const content of [scienceF2C6InteractiveBM, scienceF2C6InteractiveDLP]) {
      expect(content.sections.some((section) => pick(section))).toBe(true);
    }
  });

  it.each(CHAPTERS)("$name keeps BM and DLP section parity", ({ bm, dlp }) => {
    expect(bm.sections.length).toBe(dlp.sections.length);
    expect(bm.sections.map((s) => s.number)).toEqual(dlp.sections.map((s) => s.number));
  });
});
