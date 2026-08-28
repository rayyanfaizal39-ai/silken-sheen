import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import type { AnnotatedImageBlock, ScienceF2InteractiveContent } from "./interactive-types";
import type { ImageAnnotation } from "@/components/notes/blocks/AnnotatedImage";
import { scienceF2C4InteractiveBM } from "./chapter-4/interactive-bm";
import { scienceF2C4InteractiveDLP } from "./chapter-4/interactive-dlp";
import { scienceF2C5InteractiveBM } from "./chapter-5/interactive-bm";
import { scienceF2C5InteractiveDLP } from "./chapter-5/interactive-dlp";
import { scienceF2C6InteractiveBM } from "./chapter-6/interactive-bm";
import { scienceF2C6InteractiveDLP } from "./chapter-6/interactive-dlp";

/**
 * Guards the locked instructional-image pack integrated into Form 2 Science
 * Chapters 4-6 — see SCIENCE_F2_CH04_CH05_CH06_VISUAL_INTEGRATION_CHANGELOG.md.
 *
 * The pack's artwork carries baked-in ENGLISH labels, so it ships on the DLP
 * surface only. The BM surface keeps its existing data-driven visuals until a
 * BM-labelled pack exists, and that exclusion is asserted here so a later edit
 * cannot quietly put an English infographic on a Malay page.
 *
 * Rendering assertions use `renderToStaticMarkup`, the pattern the rest of this
 * suite uses — the repo has no DOM test environment, so open/close of the
 * shared lightbox is covered by browser QA rather than here.
 */

const DLP: [string, ScienceF2InteractiveContent][] = [
  ["ch4 dlp", scienceF2C4InteractiveDLP],
  ["ch5 dlp", scienceF2C5InteractiveDLP],
  ["ch6 dlp", scienceF2C6InteractiveDLP],
];

const BM: [string, ScienceF2InteractiveContent][] = [
  ["ch4 bm", scienceF2C4InteractiveBM],
  ["ch5 bm", scienceF2C5InteractiveBM],
  ["ch6 bm", scienceF2C6InteractiveBM],
];

const PAIRS: [string, ScienceF2InteractiveContent, ScienceF2InteractiveContent][] = [
  ["chapter 4", scienceF2C4InteractiveBM, scienceF2C4InteractiveDLP],
  ["chapter 5", scienceF2C5InteractiveBM, scienceF2C5InteractiveDLP],
  ["chapter 6", scienceF2C6InteractiveBM, scienceF2C6InteractiveDLP],
];

/** Every expected asset, by the semantic filename it ships under. */
const EXPECTED_ASSETS = [
  "chapter-4/chapter4_infectious_disease_transmission.webp",
  "chapter-4/chapter4_vector_pathogen_disease.webp",
  "chapter-4/chapter4_three_lines_body_defence.webp",
  "chapter-5/chapter5_capillary_action.webp",
  "chapter-5/chapter5_electrolysis_of_water.webp",
  "chapter-5/chapter5_evaporation_factors.webp",
  "chapter-5/chapter5_solution_suspension_colloid.webp",
  "chapter-5/chapter5_dilute_concentrated_saturated.webp",
  "chapter-5/chapter5_water_treatment_system.webp",
  "chapter-6/chapter6_acid_metal_hydrogen_test.webp",
  "chapter-6/chapter6_ph_testing_methods.webp",
  "chapter-6/chapter6_acid_alkali_titration.webp",
  "chapter-6/chapter6_uses_of_acids_and_alkalis.webp",
];

const ASSET_ROOT = resolve(process.cwd(), "src/assets/notes/form2-science");

/**
 * Every approved figure a chapter renders, from both slots it can live in:
 * the standalone `images` array, and the `image` a concept block carries when
 * the artwork has replaced that block's own schematic.
 */
type Figure = Omit<AnnotatedImageBlock, "annotations"> & { annotations: ImageAnnotation[] };

function imagesOf(content: ScienceF2InteractiveContent): Figure[] {
  return content.sections.flatMap((section) => {
    const standalone: Figure[] = (section.images ?? []).map((image) => ({ ...image }));

    const blocks = [
      section.capillaryDiagram && { image: section.capillaryDiagram.image, items: section.capillaryDiagram.labels },
      section.electrolysisDiagram && { image: section.electrolysisDiagram.image, items: section.electrolysisDiagram.labels },
      section.titrationSchematic && { image: section.titrationSchematic.image, items: section.titrationSchematic.labels },
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
    ];

    const embedded: Figure[] = blocks.flatMap((entry) => {
      if (!entry?.image) return [];
      const image = entry.image;
      const annotations: ImageAnnotation[] = [
        ...entry.items.map((item) => {
          const point = image.points.find((p) => p.id === item.id);
          return { id: item.id, label: item.label, note: item.note, x: point?.x, y: point?.y, w: point?.w, h: point?.h };
        }),
        ...(image.extra ?? []),
      ];
      return [
        {
          src: image.src,
          alt: image.alt,
          size: image.size,
          aspect: image.aspect,
          legendLabel: image.legendLabel,
          annotationMode: image.annotationMode,
          annotations,
        },
      ];
    });

    return [...standalone, ...embedded];
  });
}

/** Turns a bundled asset URL back into the repo path Vite resolved it from. */
function repoPathOf(src: string): string {
  const withoutQuery = src.split("?")[0];
  const index = withoutQuery.indexOf("src/assets/");
  return index === -1 ? withoutQuery : resolve(process.cwd(), withoutQuery.slice(index));
}

/**
 * The sectioned shell renders one section body at a time, so a whole-chapter
 * render only carries the first. Rendering section by section and joining the
 * markup is the pattern the chapter remediation suites already use.
 */
function renderChapter(content: ScienceF2InteractiveContent, lang: "bm" | "en"): string {
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
    .replace(/"/g, "&quot;");
}

describe("locked image pack — assets", () => {
  it.each(EXPECTED_ASSETS)("%s exists as a WebP", (relative) => {
    expect(existsSync(resolve(ASSET_ROOT, relative))).toBe(true);
  });

  it("integrates exactly the 13 assets in the locked pack, each exactly once", () => {
    const used = DLP.flatMap(([, content]) => imagesOf(content).map((image) => repoPathOf(image.src)));
    expect(used).toHaveLength(EXPECTED_ASSETS.length);
    expect(new Set(used).size).toBe(EXPECTED_ASSETS.length);
  });

  it.each(DLP)("%s resolves every image src to a real file", (_name, content) => {
    for (const image of imagesOf(content)) {
      expect(existsSync(repoPathOf(image.src)), image.src).toBe(true);
    }
  });

  it.each(DLP)("%s ships no runtime PNG path for a locked asset", (_name, content) => {
    for (const image of imagesOf(content)) {
      expect(image.src.split("?")[0].endsWith(".webp"), image.src).toBe(true);
    }
  });

  it.each(DLP)("%s gives every figure a non-empty src and alt", (_name, content) => {
    for (const image of imagesOf(content)) {
      expect(image.src.length).toBeGreaterThan(0);
      expect(image.alt.trim().length).toBeGreaterThan(0);
    }
  });

  it.each(DLP)("%s sizes every figure explicitly rather than filling the column", (_name, content) => {
    for (const image of imagesOf(content)) {
      expect(image.size, image.alt).toBeDefined();
      // An aspect ratio reserves the box before the file loads, so a figure
      // cannot shift the section as it arrives.
      expect(image.aspect, image.alt).toBeDefined();
    }
  });
});

describe("locked image pack — hotspots", () => {
  it.each(DLP)("%s has unique hotspot ids within each figure", (_name, content) => {
    for (const image of imagesOf(content)) {
      const ids = image.annotations.map((annotation) => annotation.id);
      expect(new Set(ids).size, image.alt).toBe(ids.length);
    }
  });

  it.each(DLP)("%s has no dead hotspot", (_name, content) => {
    for (const image of imagesOf(content)) {
      for (const annotation of image.annotations) {
        // A hotspot that explains nothing opens a blank panel, so it must not
        // exist at all.
        expect(
          annotation.note?.trim().length ?? 0,
          `${image.alt} · ${annotation.id}`,
        ).toBeGreaterThan(0);
        expect(annotation.label.trim().length, annotation.id).toBeGreaterThan(0);
      }
    }
  });

  it.each(DLP)("%s keeps every hotspot inside the artwork", (_name, content) => {
    for (const image of imagesOf(content)) {
      for (const annotation of image.annotations) {
        // A concept the artwork does not depict is control-only: it has no
        // coordinates and draws nothing on the picture.
        if (annotation.x === undefined || annotation.y === undefined) continue;
        const width = annotation.w ?? 24;
        const height = annotation.h ?? 24;
        expect(annotation.x - width / 2, annotation.id).toBeGreaterThanOrEqual(-1);
        expect(annotation.x + width / 2, annotation.id).toBeLessThanOrEqual(101);
        expect(annotation.y - height / 2, annotation.id).toBeGreaterThanOrEqual(-1);
        expect(annotation.y + height / 2, annotation.id).toBeLessThanOrEqual(101);
      }
    }
  });

  it.each(DLP)(
    "%s annotates locked artwork with regions, never with chips or pins over its printed labels",
    (_name, content) => {
      for (const image of imagesOf(content)) {
        if (image.annotations.length === 0) continue;
        expect(image.annotationMode, image.alt).toBe("regions");
      }
    },
  );

  it("keeps four of the thirteen figures deliberately static", () => {
    const staticFigures = DLP.flatMap(([, content]) =>
      imagesOf(content).filter((image) => image.annotations.length === 0),
    );
    expect(staticFigures).toHaveLength(4);
  });
});

describe("locked image pack — BM / DLP", () => {
  it.each(BM)("%s renders none of the English-labelled locked assets", (_name, content) => {
    expect(imagesOf(content)).toEqual([]);
  });

  it.each(BM)("%s markup references no locked asset file", (_name, content) => {
    const markup = renderChapter(content, "bm");
    for (const asset of EXPECTED_ASSETS) {
      expect(markup).not.toContain(asset.split("/")[1]);
    }
  });

  it.each(PAIRS)("%s keeps BM and DLP section parity", (_name, bm, dlp) => {
    expect(bm.sections.length).toBe(dlp.sections.length);
    expect(bm.sections.map((section) => section.number)).toEqual(
      dlp.sections.map((section) => section.number),
    );
  });
});

describe("locked image pack — rendering", () => {
  it.each(DLP)("%s still renders every section title", (_name, content) => {
    const markup = renderChapter(content, "en");
    for (const section of content.sections) {
      expect(markup, section.title).toContain(html(section.title));
    }
  });

  it.each(DLP)("%s renders each figure lazily, with its alt text", (_name, content) => {
    const markup = renderChapter(content, "en");
    for (const image of imagesOf(content)) {
      expect(markup).toContain(`alt="${html(image.alt)}"`);
      expect(markup).toContain(image.src.split("?")[0]);
    }
    // Every image in the chapter defers until it is scrolled to.
    expect(markup.match(/loading="lazy"/g)?.length ?? 0).toBeGreaterThanOrEqual(
      imagesOf(content).length,
    );
    expect(markup.match(/decoding="async"/g)?.length ?? 0).toBeGreaterThanOrEqual(
      imagesOf(content).length,
    );
  });

  it.each(DLP)("%s offers an enlarge control on every figure", (_name, content) => {
    const markup = renderChapter(content, "en");
    for (const image of imagesOf(content)) {
      expect(markup, image.alt).toContain(`aria-label="Enlarge — ${html(image.alt)}"`);
    }
  });

  it.each(DLP)("%s renders every hotspot as a labelled control", (_name, content) => {
    const markup = renderChapter(content, "en");
    for (const image of imagesOf(content)) {
      for (const annotation of image.annotations) {
        // Every concept is reachable by name — as a region on the artwork when
        // it has one, and always as a button under the picture.
        expect(markup, annotation.id).toContain(html(annotation.label));
      }
    }
  });

  it("gives a static figure no hotspot controls and no explanation panel", () => {
    const evaporation = imagesOf(scienceF2C5InteractiveDLP).find((image) =>
      image.src.includes("evaporation_factors"),
    )!;
    const markup = renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: {
          ...scienceF2C5InteractiveDLP,
          sections: [
            {
              number: "5.1",
              title: "Evaporation of Water",
              images: [evaporation],
              checks: [],
            },
          ],
        },
        lang: "en" as const,
      }),
    );

    expect(markup).toContain(`alt="${html(evaporation.alt)}"`);
    expect(markup).toContain(`aria-label="Enlarge — ${html(evaporation.alt)}"`);
    expect(markup).not.toContain('aria-live="polite"');
  });
});
