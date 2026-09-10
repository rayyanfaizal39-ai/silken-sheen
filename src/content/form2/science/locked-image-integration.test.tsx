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

/**
 * The original locked pack: baked-in ENGLISH labels, so it ships on the DLP
 * surface only.
 */
const ENGLISH_LABELLED_ASSETS = [
  "chapter-4/chapter4_infectious_disease_transmission.webp",
  "chapter-4/chapter4_vector_pathogen_disease.webp",
  "chapter-4/chapter4_three_lines_body_defence.webp",
  "chapter-5/chapter5_capillary_action.webp",
  "chapter-5/chapter5_electrolysis_of_water.webp",
  "chapter-5/chapter5_evaporation_factors.webp",
  "chapter-5/chapter5_solution_suspension_colloid.webp",
  "chapter-5/chapter5_dilute_concentrated_saturated.webp",
  "chapter-6/chapter6_acid_metal_hydrogen_test.webp",
  "chapter-6/chapter6_ph_testing_methods.webp",
  "chapter-6/chapter6_uses_of_acids_and_alkalis.webp",
];

/**
 * A later, Chapter 5 visual pass added three TEXT-FREE assets — states of
 * water, applications of evaporation, and the water-treatment journey (which
 * replaced the earlier English-labelled `chapter5_water_treatment_system`).
 * Because no language is baked into the artwork, these three are shared by
 * both BM and DLP from one file each, closing part of the BM asset gap the
 * English-labelled pack left open.
 *
 * The Chapter 6 visual-integration pass added three more of the same kind —
 * properties of acids/alkalis, the role of water, and applications of
 * neutralisation — also shared from one file each. `science-f2-ch6-role-of-water`
 * replaces the earlier `why-water-matters-acids-alkalis`, which (unlike this
 * one) really was English-labelled and so never reached BM.
 *
 * A follow-up QA pass then retired `chapter6_acid_alkali_titration` (baked-in
 * English, DLP-only) in favour of `science-f2-ch6-titration` — drawn with
 * blank label boxes instead, so the same file now serves BM too, with every
 * word rendered as a UI overlay (`overlayHeadings`) in the reader's language.
 */
const SHARED_TEXT_FREE_ASSETS = [
  "chapter-5/chapter5_states_of_water.webp",
  "chapter-5/chapter5_evaporation_applications.webp",
  "chapter-5/chapter5_water_treatment_journey.webp",
  "chapter-6/science-f2-ch6-properties-acids-alkalis.webp",
  "chapter-6/science-f2-ch6-role-of-water.webp",
  "chapter-6/science-f2-ch6-neutralisation-applications.webp",
  "chapter-6/science-f2-ch6-titration.webp",
];

/**
 * Of the shared text-free assets, these use `spotlight` mode rather than the
 * shared-asset default `labels` — each highlights one concept's region(s)
 * while dimming the rest, which direct chips can't do (a property that spans
 * both an acid AND an alkali column, or a peer set of five application panels
 * that must never all show full names at once).
 */
const SPOTLIGHT_MODE_ASSETS = [
  "chapter-6/science-f2-ch6-properties-acids-alkalis.webp",
  "chapter-6/science-f2-ch6-role-of-water.webp",
  "chapter-6/science-f2-ch6-neutralisation-applications.webp",
];

/** Every expected asset, by the semantic filename it ships under. */
const EXPECTED_ASSETS = [...ENGLISH_LABELLED_ASSETS, ...SHARED_TEXT_FREE_ASSETS];

const ASSET_ROOT = resolve(process.cwd(), "src/assets/notes/form2-science");

/**
 * Every approved figure a chapter renders, from both slots it can live in:
 * the standalone `images` array, and the `image` a concept block carries when
 * the artwork has replaced that block's own schematic.
 */
type Figure = Omit<AnnotatedImageBlock, "annotations"> & { annotations: ImageAnnotation[] };

function imagesOf(content: ScienceF2InteractiveContent): Figure[] {
  return content.sections.flatMap((section) => {
    const standalone: Figure[] = [
      ...(section.images ?? []),
      // The "recognise it, then understand it" leading slot — used by the
      // Chapter 5 visual-order fix so a figure can lead its section, ahead of
      // any cards or experiment.
      ...(section.contextImages ?? []),
    ].map((image) => ({ ...image }));

    if (section.conceptSelector?.image) {
      standalone.push({
        src: section.conceptSelector.image.src,
        alt: section.conceptSelector.image.alt,
        size: section.conceptSelector.image.size,
        aspect: section.conceptSelector.image.aspect,
        legendLabel: section.conceptSelector.image.legendLabel,
        annotationMode: section.conceptSelector.image.annotationMode,
        annotations: section.conceptSelector.concepts,
      });
    }

    const blocks = [
      section.capillaryDiagram && {
        image: section.capillaryDiagram.image,
        items: section.capillaryDiagram.labels,
      },
      section.electrolysisDiagram && {
        image: section.electrolysisDiagram.image,
        items: section.electrolysisDiagram.labels,
      },
      // The rendered button label is composed from the column + water
      // headings (see `DryVsAqueous.tsx`), not the raw `substance` string.
      section.dryVsAqueous && {
        image: section.dryVsAqueous.image,
        items: section.dryVsAqueous.panels.map((p) => {
          const dry = section.dryVsAqueous!;
          const group = (p.id.startsWith("acid") ? dry.acidColumnLabel : dry.alkaliColumnLabel)
            .split("—")[0]
            .trim();
          const water = p.withWater ? dry.withWaterLabel : dry.withoutWaterLabel;
          return { id: p.id, label: `${group}: ${water.toLocaleLowerCase()}`, note: p.note };
        }),
      },
      section.titrationSchematic && {
        image: section.titrationSchematic.image,
        items: section.titrationSchematic.labels,
      },
      section.mixtureComparison && {
        image: section.mixtureComparison.image,
        items: section.mixtureComparison.kinds.map((k) => ({
          id: k.id,
          label: k.name,
          note: k.note,
        })),
      },
      section.waterTreatmentFlow && {
        image: section.waterTreatmentFlow.image,
        items: section.waterTreatmentFlow.stages.map((s) => ({
          id: s.id,
          label: s.name,
          note: s.fn,
        })),
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
          return {
            id: item.id,
            label: item.label,
            note: item.note,
            x: point?.x,
            y: point?.y,
            w: point?.w,
            h: point?.h,
          };
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

/** Just the filename (no directory), so it can be matched against a src URL regardless of path-separator style. */
function basename(assetPath: string): string {
  return assetPath.split("/").pop()!;
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

  it("integrates exactly the 18 assets in the locked pack, each exactly once (DLP)", () => {
    const used = DLP.flatMap(([, content]) =>
      imagesOf(content).map((image) => repoPathOf(image.src)),
    );
    expect(used).toHaveLength(EXPECTED_ASSETS.length);
    expect(new Set(used).size).toBe(EXPECTED_ASSETS.length);
  });

  it("BM uses exactly the 7 shared text-free assets, each exactly once", () => {
    const used = BM.flatMap(([, content]) =>
      imagesOf(content).map((image) => repoPathOf(image.src)),
    );
    expect(used).toHaveLength(SHARED_TEXT_FREE_ASSETS.length);
    expect(new Set(used).size).toBe(SHARED_TEXT_FREE_ASSETS.length);
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

  it.each(DLP)(
    "%s sizes every figure explicitly rather than filling the column",
    (_name, content) => {
      for (const image of imagesOf(content)) {
        expect(image.size, image.alt).toBeDefined();
        // An aspect ratio reserves the box before the file loads, so a figure
        // cannot shift the section as it arrives.
        expect(image.aspect, image.alt).toBeDefined();
      }
    },
  );
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
    "%s annotates English-labelled artwork with regions, never with chips or pins over its printed labels",
    (_name, content) => {
      for (const image of imagesOf(content)) {
        if (image.annotations.length === 0) continue;
        const isSharedTextFree = SHARED_TEXT_FREE_ASSETS.some((asset) =>
          image.src.includes(basename(asset)),
        );
        // The water-treatment journey packs six stages into one wide strip,
        // too many full-text labels to fit side by side, so it alone uses
        // `markers` — a numbered badge per stage plus one floating full name
        // for whichever is active. The titration artwork is drawn with its
        // own blank label boxes (text rendered entirely via `overlayHeadings`
        // instead of chips), so it alone keeps `regions` despite being shared
        // text-free artwork. The other shared text-free assets use `labels`
        // (the chip IS the on-image label) unless listed in
        // `SPOTLIGHT_MODE_ASSETS`, and every English-labelled asset keeps
        // `regions`.
        const isWaterTreatment = image.src.includes(
          basename("chapter5_water_treatment_journey.webp"),
        );
        const isTitration = image.src.includes(basename("science-f2-ch6-titration.webp"));
        const isSpotlight = SPOTLIGHT_MODE_ASSETS.some((asset) =>
          image.src.includes(basename(asset)),
        );
        const expectedMode = isWaterTreatment
          ? "markers"
          : isTitration
            ? "regions"
            : isSpotlight
              ? "spotlight"
              : isSharedTextFree
                ? "labels"
                : "regions";
        expect(image.annotationMode, image.alt).toBe(expectedMode);
      }
    },
  );

  it("keeps four of the eighteen figures deliberately static", () => {
    const staticFigures = DLP.flatMap(([, content]) =>
      imagesOf(content).filter((image) => image.annotations.length === 0),
    );
    expect(staticFigures).toHaveLength(4);
  });
});

describe("locked image pack — BM / DLP", () => {
  it.each(BM)("%s renders none of the English-labelled locked assets", (_name, content) => {
    const usedBasenames = imagesOf(content).map((image) => basename(image.src.split("?")[0]));
    for (const asset of ENGLISH_LABELLED_ASSETS) {
      expect(usedBasenames, asset).not.toContain(basename(asset));
    }
  });

  it.each(BM)("%s markup references no English-labelled locked asset file", (_name, content) => {
    const markup = renderChapter(content, "bm");
    for (const asset of ENGLISH_LABELLED_ASSETS) {
      expect(markup).not.toContain(asset.split("/")[1]);
    }
  });

  const CH5_SHARED_ASSETS = SHARED_TEXT_FREE_ASSETS.filter((a) => a.startsWith("chapter-5/"));
  const CH6_SHARED_ASSETS = SHARED_TEXT_FREE_ASSETS.filter((a) => a.startsWith("chapter-6/"));

  it("ch5 bm renders exactly the three shared text-free assets", () => {
    const usedBasenames = imagesOf(scienceF2C5InteractiveBM)
      .map((image) => basename(image.src.split("?")[0]))
      .sort();
    const expectedBasenames = CH5_SHARED_ASSETS.map(basename).sort();
    expect(usedBasenames).toEqual(expectedBasenames);
  });

  it("ch6 bm renders exactly the four shared text-free assets", () => {
    const usedBasenames = imagesOf(scienceF2C6InteractiveBM)
      .map((image) => basename(image.src.split("?")[0]))
      .sort();
    const expectedBasenames = CH6_SHARED_ASSETS.map(basename).sort();
    expect(usedBasenames).toEqual(expectedBasenames);
  });

  it("ch4 bm still renders no images at all", () => {
    expect(imagesOf(scienceF2C4InteractiveBM)).toEqual([]);
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

  it("ch5 bm renders each shared figure lazily, with its alt text and an enlarge control", () => {
    const markup = renderChapter(scienceF2C5InteractiveBM, "bm");
    const images = imagesOf(scienceF2C5InteractiveBM);
    expect(images.length).toBe(3);
    for (const image of images) {
      expect(markup, image.alt).toContain(`alt="${html(image.alt)}"`);
      // BM's enlarge-control copy is "Besarkan", not the DLP "Enlarge".
      expect(markup, image.alt).toContain(`aria-label="Besarkan — ${html(image.alt)}"`);
    }
    expect(markup.match(/loading="lazy"/g)?.length ?? 0).toBeGreaterThanOrEqual(images.length);
  });

  it("ch5 bm renders every shared-figure hotspot as a labelled control", () => {
    const markup = renderChapter(scienceF2C5InteractiveBM, "bm");
    for (const image of imagesOf(scienceF2C5InteractiveBM)) {
      for (const annotation of image.annotations) {
        expect(markup, annotation.id).toContain(html(annotation.label));
      }
    }
  });

  it("ch6 bm renders each shared figure lazily, with its alt text and an enlarge control", () => {
    const markup = renderChapter(scienceF2C6InteractiveBM, "bm");
    const images = imagesOf(scienceF2C6InteractiveBM);
    expect(images.length).toBe(4);
    for (const image of images) {
      expect(markup, image.alt).toContain(`alt="${html(image.alt)}"`);
      expect(markup, image.alt).toContain(`aria-label="Besarkan — ${html(image.alt)}"`);
    }
    expect(markup.match(/loading="lazy"/g)?.length ?? 0).toBeGreaterThanOrEqual(images.length);
  });

  it("ch6 bm renders every shared-figure hotspot as a labelled control", () => {
    const markup = renderChapter(scienceF2C6InteractiveBM, "bm");
    for (const image of imagesOf(scienceF2C6InteractiveBM)) {
      for (const annotation of image.annotations) {
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
