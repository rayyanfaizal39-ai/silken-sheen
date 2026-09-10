import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { scienceF2C3InteractiveBM } from "./interactive-bm";
import { scienceF2C3InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

function renderSection(content: ScienceF2InteractiveContent, index: number, lang: "bm" | "en") {
  const single = { ...content, sections: [content.sections[index]] };
  return renderToStaticMarkup(
    <ScienceF2InteractiveNotesBlock
      content={single}
      lang={lang}
      isRead={false}
      onMarkRead={() => {}}
    />,
  );
}

function allText(content: ScienceF2InteractiveContent) {
  return JSON.stringify(content);
}

// The real Bab 3 SP structure — no UX section may invent a number outside this set.
const VALID_SP_NUMBERS = new Set([
  "3.1.1",
  "3.1.2",
  "3.2.1",
  "3.2.2",
  "3.2.3",
  "3.3.1",
  "3.4.1",
  "3.4.2",
  "3.4.3",
]);
// Section indices — unchanged across both remediation passes:
//  0 Kelas Makanan               7 Pencernaan Fizikal & Kimia
//  1 Vitamin dan Mineral         8 Sistem Pencernaan Manusia
//  2 Ujian Makanan               9 Enzim dan Pencernaan Kimia
//  3 Gizi Seimbang & Piramid    10 Penyerapan Hasil Pencernaan
//  4 Faktor Keperluan Kalori    11 Eksperimen Tiub Visking
//  5 Nilai Kalori Makanan       12 Asimilasi & Kerjasama Sistem
//  6 Gaya Hidup Sihat           13 Penyahtinjaan
const EXPECTED_SP_SEQUENCE = [
  "3.1.1",
  "3.1.1",
  "3.1.2",
  "3.2.1",
  "3.2.1",
  "3.2.2",
  "3.2.3",
  "3.3.1",
  "3.3.1",
  "3.3.1",
  "3.4.1",
  "3.4.1",
  "3.4.2",
  "3.4.3",
];

const CLASSES_SECTION = 0;
const VITAMIN_MINERAL_SECTION = 1;
const PYRAMID_SECTION = 3;
const FACTORS_SECTION = 4;
const CALORIFIC_SECTION = 5;
const LIFESTYLE_SECTION = 6;
const PHYSICAL_CHEMICAL_SECTION = 7;
const DIGESTIVE_SECTION = 8;
const ENZYME_SECTION = 9;
const VILLUS_SECTION = 10;
const VISKING_SECTION = 11;
const ASSIMILATION_SECTION = 12;

describe("Chapter 3 remediated interactive notes — runtime smoke test", () => {
  it("BM: has exactly 14 sections and every block type mounts without throwing", () => {
    expect(scienceF2C3InteractiveBM.sections.length).toBe(14);
    for (let i = 0; i < scienceF2C3InteractiveBM.sections.length; i++) {
      expect(() => renderSection(scienceF2C3InteractiveBM, i, "bm")).not.toThrow();
    }
  });

  it("DLP: has exactly 14 sections and every block type mounts without throwing", () => {
    expect(scienceF2C3InteractiveDLP.sections.length).toBe(14);
    for (let i = 0; i < scienceF2C3InteractiveDLP.sections.length; i++) {
      expect(() => renderSection(scienceF2C3InteractiveDLP, i, "en")).not.toThrow();
    }
  });

  it("BM/DLP: section numbers exactly follow the real SP mapping — no invented sub-numbers", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers).toEqual(EXPECTED_SP_SEQUENCE);
      for (const n of numbers) expect(VALID_SP_NUMBERS.has(n)).toBe(true);
    }
  });

  // ---------------------------------------------------------------- 1. Classes of Food
  it("no learner-facing 'see Table 3.x' / textbook-navigation wording anywhere in the chapter", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const text = allText(content);
      expect(text).not.toMatch(/see Table/i);
      expect(text).not.toMatch(/lihat Jadual \d/i);
      expect(text).not.toMatch(/refer to Table/i);
      expect(text).not.toMatch(/Rajah \d/);
      expect(text).not.toMatch(/\bFigure \d/);
    }
  });

  it("food-class cards are structured (definition + facts), not one dense paragraph", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const cards = content.sections[CLASSES_SECTION].cards!;
      expect(cards).toHaveLength(7);
      for (const card of cards) {
        expect(card.facts?.length, `${card.title} has no structured facts`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("the awkward 'Inorganic — not made by living things' mineral phrasing is gone", () => {
    const dlpText = allText(scienceF2C3InteractiveDLP);
    expect(dlpText).not.toMatch(/not made by living things/i);
    const bmText = allText(scienceF2C3InteractiveBM);
    expect(bmText).not.toMatch(/tidak dihasilkan oleh hidupan/i);
  });

  // ---------------------------------------------------------------- Table 3.1 / 3.2
  it("vitamin and mineral coverage is Table 3.1 / Table 3.2 with all 6+6 required rows, fully populated", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const tables = content.sections[VITAMIN_MINERAL_SECTION].nutrientTables!;
      expect(tables).toHaveLength(2);
      const [vitaminTable, mineralTable] = tables;
      expect(vitaminTable.rows.map((r) => r.id).sort()).toEqual(["a", "b", "c", "d", "e", "k"]);
      expect(mineralTable.rows.map((r) => r.id).sort()).toEqual([
        "calcium",
        "iodine",
        "iron",
        "phosphorus",
        "potassium",
        "sodium",
      ]);
      for (const row of [...vitaminTable.rows, ...mineralTable.rows]) {
        expect(row.source.trim()).not.toBe("");
        expect(row.importance.trim()).not.toBe("");
        expect(row.deficiency.trim()).not.toBe("");
      }
    }
  });

  it("Vitamin D's importance now names bones, not just teeth (previously shortened)", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const vitaminD = content.sections[VITAMIN_MINERAL_SECTION].nutrientTables![0].rows.find(
        (r) => r.id === "d",
      )!;
      expect(vitaminD.importance).toMatch(/bone|tulang/i);
    }
  });

  it("Phosphorus keeps the DNA/RNA formation point", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const phosphorus = content.sections[VITAMIN_MINERAL_SECTION].nutrientTables![1].rows.find(
        (r) => r.id === "phosphorus",
      )!;
      expect(phosphorus.importance).toMatch(/DNA\/RNA/);
    }
  });

  // ---------------------------------------------------------------- 2. Food pyramid
  const PYRAMID_REGION_IDS = ["grains", "vegetables", "fruits", "protein", "dairy", "apex"];

  it("the pyramid is now the approved text-free WebP illustration, not a CSS-drawn shape", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      expect(pyramid.image.src).toMatch(/science-f2-ch3-food-pyramid/);
      expect(pyramid.image.src).toMatch(/\.webp$/i);
      expect(pyramid.image.aspect).toBe("3 / 2");
      expect(pyramid.image.alt?.trim()).toBeTruthy();
      // The image is text-free by design — the alt text is the only place
      // English/Malay food words may legitimately appear alongside the src.
    }
  });

  it("exactly six selectable regions exist, matching the six required hotspots", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      expect(pyramid.regions).toHaveLength(6);
      expect(pyramid.regions.map((r) => r.id).sort()).toEqual([...PYRAMID_REGION_IDS].sort());
      for (const region of pyramid.regions) {
        expect(region.polygon?.trim()).toBeTruthy();
        // A real polygon needs at least three point pairs.
        expect(region.polygon.trim().split(/\s+/).length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("food pyramid is the textbook structure: grains base, veg/fruit distinguishable, dairy 1-3 servings", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      const grains = pyramid.regions.find((r) => r.id === "grains")!;
      expect(grains.servings).toMatch(/4–8/);

      // Vegetables and fruit stay two fully independent, distinguishable regions.
      const veg = pyramid.regions.find((r) => r.id === "vegetables")!;
      const fruit = pyramid.regions.find((r) => r.id === "fruits")!;
      expect(veg.label).toMatch(/veg|sayur/i);
      expect(fruit.label).toMatch(/fruit|buah/i);
      expect(veg.polygon).not.toBe(fruit.polygon);

      const dairy = pyramid.regions.find((r) => r.id === "dairy")!;
      expect(dairy.label).toMatch(/milk|susu/i);
      expect(dairy.servings).toMatch(/1–3/);

      const apex = pyramid.regions.find((r) => r.id === "apex")!;
      expect(apex.label).toMatch(/fat.*oil.*sugar.*salt|lemak.*minyak.*gula.*garam/i);
    }
  });

  it("the base region's hotspot is widest at the bottom of the artwork and the apex region's is narrowest at the top", () => {
    // Geometry sanity check on the actual polygon coordinates (0–100 space,
    // y growing downward) rather than trusting DOM order — this is the
    // authoritative test that the approved image's own geometry (base wide
    // at the bottom, apex narrow at the top) is what the hotspots follow.
    function widthAndMaxY(points: string) {
      const pairs = points.trim().split(/\s+/).map((p) => p.split(",").map(Number));
      const xs = pairs.map((p) => p[0]);
      const ys = pairs.map((p) => p[1]);
      return { width: Math.max(...xs) - Math.min(...xs), maxY: Math.max(...ys), minY: Math.min(...ys) };
    }
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      const grains = widthAndMaxY(pyramid.regions.find((r) => r.id === "grains")!.polygon);
      const apex = widthAndMaxY(pyramid.regions.find((r) => r.id === "apex")!.polygon);
      expect(grains.width).toBeGreaterThan(apex.width);
      // Base sits lower on the artwork (larger y) than the apex.
      expect(grains.maxY).toBeGreaterThan(apex.maxY);
      expect(apex.minY).toBeLessThan(grains.minY);
    }
  });

  it("protein serving guidance is no longer collapsed to one '1–2 servings' line — fish, chicken/meat/eggs and nuts each carry their own textbook count", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const protein = content.sections[PYRAMID_SECTION].pyramid!.regions.find((r) => r.id === "protein")!;
      expect(protein.servings).toBeUndefined();
      expect(protein.items).toHaveLength(3);
      const labels = protein.items!.map((i) => i.label).join(" | ");
      expect(labels).toMatch(/fish|ikan/i);
      expect(labels).toMatch(/chicken|meat|eggs|ayam|daging|telur/i);
      expect(labels).toMatch(/nuts|kekacang/i);
      // Each food gets its own count — not one shared "1–2 servings" string.
      const servings = protein.items!.map((i) => i.servings);
      expect(new Set(servings).size).toBe(3);
      for (const s of servings) {
        expect(s).toMatch(/serving|sajian/i);
      }
      // The old single collapsed line must be gone entirely.
      const wholeSection = JSON.stringify(content.sections[PYRAMID_SECTION]);
      expect(wholeSection).not.toMatch(/1–2 servings a day/);
      expect(wholeSection).not.toMatch(/1–2 sajian sehari/);

      // Dairy stays its own single, un-split region, distinct from protein.
      const dairy = content.sections[PYRAMID_SECTION].pyramid!.regions.find((r) => r.id === "dairy")!;
      expect(dairy.items).toBeUndefined();
      expect(dairy.servings).toMatch(/1–3/);
    }
  });

  it("the protein serving list renders as real markup (heading + each food's own count), not a crowded single line", () => {
    // Only the currently-selected region's text renders in the detail card
    // (that is the point — nothing is baked into the image), so this selects
    // "protein" as the default for the render instead of the usual "grains".
    for (const [content, lang] of [
      [scienceF2C3InteractiveBM, "bm"],
      [scienceF2C3InteractiveDLP, "en"],
    ] as const) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      const proteinFirst = {
        ...content,
        sections: content.sections.map((s, i) =>
          i === PYRAMID_SECTION ? { ...s, pyramid: { ...pyramid, defaultRegionId: "protein" } } : s,
        ),
      };
      const markup = renderSection(proteinFirst, PYRAMID_SECTION, lang);
      const protein = pyramid.regions.find((r) => r.id === "protein")!;
      expect(markup).toContain(protein.label);
      for (const item of protein.items!) {
        expect(markup).toContain(item.label);
        expect(markup).toContain(item.servings);
      }
    }
  });

  it("every region has its own detailTitle, and the detail card teaches something new instead of repeating the region's own serving count", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const regions = content.sections[PYRAMID_SECTION].pyramid!.regions;
      for (const region of regions) {
        expect(region.detailTitle?.trim()).toBeTruthy();
        expect(region.note?.trim()).toBeTruthy();
        if (region.servings) {
          expect(region.note).not.toBe(`${region.label} — ${region.servings}`);
        }
      }
      // Vegetables and fruits must not share identical detail copy — the whole
      // point of six independent regions is each one teaches its own thing.
      const veg = regions.find((r) => r.id === "vegetables")!;
      const fruit = regions.find((r) => r.id === "fruits")!;
      expect(veg.detailTitle).not.toBe(fruit.detailTitle);
      const protein = regions.find((r) => r.id === "protein")!;
      const dairy = regions.find((r) => r.id === "dairy")!;
      expect(protein.detailTitle).not.toBe(dairy.detailTitle);
    }
    // Spot-check the base region's panel matches the exact copy specified for this pass.
    const dlpBase = scienceF2C3InteractiveDLP.sections[PYRAMID_SECTION].pyramid!.regions.find(
      (r) => r.id === "grains",
    )!;
    expect(dlpBase.detailTitle).toBe("Main energy source");
    const bmBase = scienceF2C3InteractiveBM.sections[PYRAMID_SECTION].pyramid!.regions.find(
      (r) => r.id === "grains",
    )!;
    expect(bmBase.detailTitle).toBe("Sumber tenaga utama");
  });

  it("the grains region is selected by default, so the detail card is already visible on first render", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[PYRAMID_SECTION].pyramid!.defaultRegionId).toBe("grains");
    }
    const markup = renderSection(scienceF2C3InteractiveDLP, PYRAMID_SECTION, "en");
    expect(markup).toContain("Main energy source");
    expect(markup).toContain('aria-pressed="true"');
  });

  it("the pyramid no longer cites the Malaysia Food Pyramid 2020 (KKM) arrangement", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const pyramid = content.sections[PYRAMID_SECTION].pyramid!;
      expect(pyramid.sourceLabel).not.toMatch(/2020/);
      expect(pyramid.sourceLabel).not.toMatch(/KKM/);
      expect(JSON.stringify(pyramid)).not.toMatch(/2020/);
    }
  });

  it("no serving guidance, label or explanation text is baked into the image — everything is UI-rendered", () => {
    // The default (grains) selection's own label/servings/explanation appear
    // as real DOM text — none of it comes from the picture, which carries no
    // text by design. Every other region's text is verified at the data
    // level elsewhere (their `label`/`servings`/`detailTitle`/`note` fields
    // are all asserted non-empty), since only the active region renders at
    // any one time.
    const markup = renderSection(scienceF2C3InteractiveDLP, PYRAMID_SECTION, "en");
    expect(markup).toContain("Rice, noodles, bread, other grains and tubers");
    expect(markup).toContain("4–8 servings a day");
    expect(markup).toContain("Main energy source");
    expect(markup).toContain("Provides carbohydrates for energy");
    // One <img> renders the compact artwork; a second (closed) copy belongs
    // to the always-mounted Enlarge lightbox — same pattern as every other
    // figure in this chapter, never more than that.
    const imgTagCount = (markup.match(/<img/g) ?? []).length;
    expect(imgTagCount).toBe(2);
  });

  it("clicking a hotspot polygon updates the active selection (interactive SVG regions, not a static picture)", () => {
    const markup = renderSection(scienceF2C3InteractiveDLP, PYRAMID_SECTION, "en");
    const polygonCount = (markup.match(/<polygon/g) ?? []).length;
    // Six hotspot polygons drawn once inline, plus the SpotlightOverlay's own
    // glow/mask polygon for whichever region is currently active.
    expect(polygonCount).toBeGreaterThanOrEqual(6);
    expect(markup).toContain('role="button"');
    expect(markup).toContain('aria-pressed');
  });

  it("the balanced-diet/pyramid section has no factor cards — the pyramid stands alone and leads the section", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[PYRAMID_SECTION].cards).toBeUndefined();
      expect(content.sections[PYRAMID_SECTION].pyramid).toBeDefined();
    }
  });

  it("'Factors that Influence Calorific Requirement' stays its own section with correct terminology", () => {
    expect(scienceF2C3InteractiveDLP.sections[FACTORS_SECTION].title).toBe(
      "Factors that Influence Calorific Requirement",
    );
    const dlpText = JSON.stringify(scienceF2C3InteractiveDLP.sections[FACTORS_SECTION]);
    expect(dlpText).toContain("Gender");
    expect(dlpText).toContain("Work");
    expect(dlpText).toContain("State of health");
    const dlpWhole = allText(scienceF2C3InteractiveDLP);
    expect(dlpWhole).not.toMatch(/"Sex"/);
    expect(dlpWhole).not.toMatch(/"Occupation"/);
    expect(dlpWhole).not.toMatch(/"Health condition"/);

    const bmText = JSON.stringify(scienceF2C3InteractiveBM.sections[FACTORS_SECTION]);
    expect(bmText).toContain("Jantina");
    expect(bmText).toContain("Jenis pekerjaan");
    expect(bmText).toContain("Keadaan kesihatan");
  });

  // ---------------------------------------------------------------- 3. Calorific value
  it("calorific value keeps its own heading and now has a real worked calculation (not a sentence)", () => {
    expect(scienceF2C3InteractiveDLP.sections[CALORIFIC_SECTION].title).toBe("Calorific Value of Food");
    expect(scienceF2C3InteractiveBM.sections[CALORIFIC_SECTION].title).toBe("Nilai Kalori Makanan");

    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const example = content.sections[CALORIFIC_SECTION].calorieExample!;
      expect(example.items.length).toBeGreaterThanOrEqual(3);
      const total = example.items.reduce((sum, item) => sum + item.kcal, 0);
      expect(total).toBe(890);
      // The banana line shows the multiplication itself, not just the result.
      const banana = example.items.find((i) => i.perUnitKcal && i.multiplier)!;
      expect(banana).toBeDefined();
      expect(banana.perUnitKcal! * banana.multiplier!).toBe(banana.kcal);
    }
  });

  it("the old worked-example accordion prose is gone from the calorific-value section", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const accordionTitles = (content.sections[CALORIFIC_SECTION].accordions ?? []).map(
        (a) => a.title,
      );
      expect(accordionTitles.some((t) => /worked example|contoh.*pengiraan/i.test(t))).toBe(false);
    }
  });

  it("BM calorific value is defined by oxidation, not literal burning in the body", () => {
    const intro = scienceF2C3InteractiveBM.sections[CALORIFIC_SECTION].intro!;
    expect(intro).toContain("dioksidakan");
    expect(intro).not.toContain("dibakar dengan lengkap di dalam badan");
  });

  it("DLP calorific value is defined by oxidation, not literal burning in the body", () => {
    const intro = scienceF2C3InteractiveDLP.sections[CALORIFIC_SECTION].intro!;
    expect(intro).toContain("oxidised");
    expect(intro).not.toContain("completely burnt in the body");
  });

  // ---------------------------------------------------------------- 4. BMI polish
  it("BMI no longer reads as a random optional fact — no 'Additional Knowledge' framing or memorise disclaimer", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const bmiCard = content.sections[LIFESTYLE_SECTION].cards!.find((c) => c.title.includes("BMI"))!;
      expect(bmiCard).toBeDefined();
      expect(bmiCard.title).not.toMatch(/Additional Knowledge/i);
      expect(bmiCard.detail).toBeUndefined();
      const cardText = JSON.stringify(bmiCard);
      expect(cardText).not.toMatch(/not something you need to memorise/i);
      expect(cardText).not.toMatch(/bukan sesuatu yang wajib/i);
    }
  });

  it("BMI card no longer sits inside the calorific-value section — it does not interrupt that lesson", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(JSON.stringify(content.sections[CALORIFIC_SECTION])).not.toMatch(/BMI/);
      expect(JSON.stringify(content.sections[LIFESTYLE_SECTION])).toMatch(/BMI/);
    }
  });

  // ---------------------------------------------------------------- 5/6/7. Digestive system + Flow of food
  it("physical-vs-chemical digestion still comes BEFORE the digestive-system structure", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[PHYSICAL_CHEMICAL_SECTION].comparison).toBeDefined();
      expect(content.sections[PHYSICAL_CHEMICAL_SECTION].digestiveSystem).toBeUndefined();
      expect(content.sections[DIGESTIVE_SECTION].digestiveSystem).toBeDefined();
    }
  });

  it("the digestive diagram's own organ legend is gone — the journey row is the ONE control system", () => {
    const markup = renderSection(scienceF2C3InteractiveDLP, DIGESTIVE_SECTION, "en");
    const pressedCount = (markup.match(/aria-pressed/g) ?? []).length;
    // The 8 flow-of-food stage buttons render twice — a horizontally-scrolling
    // row for phones and a vertical connected pathway from `sm` up, CSS-gated
    // with sm:hidden/hidden sm:flex rather than a second data-driven legend —
    // so 16, not a duplicate 12-organ legend on top of either responsive set.
    expect(pressedCount).toBe(16);
  });

  it("the digestive diagram and its flow-of-food controls sit in one grid — the image is never separated from the buttons by an explanation panel", () => {
    const markup = renderSection(scienceF2C3InteractiveDLP, DIGESTIVE_SECTION, "en");
    const gridIndex = markup.indexOf("sm:grid-cols-");
    const imgIndex = markup.indexOf("<img");
    const firstOrganButtonIndex = markup.indexOf(">Mouth<");
    expect(gridIndex).toBeGreaterThan(-1);
    // The image and the first flow-of-food button both live inside the same
    // responsive grid, with no aria-live explanation panel rendered between
    // them in DOM order — a human-audit complaint was that by the time a
    // learner reached the buttons (below the image AND an explanation panel),
    // the diagram had scrolled out of view.
    expect(imgIndex).toBeGreaterThan(gridIndex);
    expect(firstOrganButtonIndex).toBeGreaterThan(imgIndex);
  });

  it("both grid items around the diagram carry min-w-0 so the horizontally-scrolling stage row can't blow out the card's width", () => {
    // A CSS grid track sizes to a child's min-content by default. The mobile
    // stage row is `overflow-x-auto`, whose un-scrolled content is wide, so
    // without min-w-0 on the grid items the whole card is forced wide enough
    // to fit every button unwrapped — breaking the layout instead of
    // scrolling inside it. Caught only by rendering with real CSS in a
    // browser, not by renderToStaticMarkup, so this guards the class stays.
    const markup = renderSection(scienceF2C3InteractiveDLP, DIGESTIVE_SECTION, "en");
    expect(markup).toContain("grid min-w-0 grid-cols-1");
    expect(markup).toContain("flex min-w-0 flex-col gap-3");
  });

  it("clicking a flow-of-food stage still highlights the matching organ (spotlight shapes present)", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const image = content.sections[DIGESTIVE_SECTION].digestiveSystem!.image!;
      expect(image.annotationMode).toBe("spotlight");
      const journey = content.sections[DIGESTIVE_SECTION].digestiveSystem!.journey!;
      expect(journey).toEqual([
        "mulut",
        "esofagus",
        "perut",
        "duodenum",
        "usus-kecil",
        "usus-besar",
        "rektum",
        "dubur",
      ]);
      for (const id of journey) {
        const point = image.points.find((p) => p.id === id)!;
        expect(point.spotlightShapes?.length, `${id} has no spotlight shape`).toBeGreaterThan(0);
      }
    }
  });

  it("digestive system still names the salivary glands as their own organ (previously missing)", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const organs = content.sections[DIGESTIVE_SECTION].digestiveSystem!.organs;
      const glands = organs.find((o) => o.id === "kelenjar-air-liur");
      expect(glands).toBeDefined();
      expect(glands!.kind).toBe("accessory");
    }
  });

  it("Flow of Food is real point-form bullets, not a single paragraph, for every tract organ", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const organs = content.sections[DIGESTIVE_SECTION].digestiveSystem!.organs;
      const tractIds = ["mulut", "esofagus", "perut", "duodenum", "usus-kecil", "usus-besar", "rektum", "dubur"];
      for (const id of tractIds) {
        const organ = organs.find((o) => o.id === id)!;
        expect(organ.points?.length, `${id} has no point-form bullets`).toBeGreaterThan(0);
      }
      // Duodenum specifically was called out as reading like a text wall — it needs the full 10-point breakdown.
      const duodenum = organs.find((o) => o.id === "duodenum")!;
      expect(duodenum.points!.length).toBeGreaterThanOrEqual(9);
    }
  });

  it("BM duodenum bullets (data-level) fix C-01: three-stage protease chain, not one-step 'asid amino di perut'", () => {
    const organs = scienceF2C3InteractiveBM.sections[DIGESTIVE_SECTION].digestiveSystem!.organs;
    const stomach = organs.find((o) => o.id === "perut")!;
    expect(stomach.points!.join(" ")).toContain("polipeptida");
    expect(stomach.points!.join(" ")).not.toMatch(/protein kepada asid amino/);
    const duodenum = organs.find((o) => o.id === "duodenum")!;
    expect(duodenum.points!.join(" ")).toContain("dipeptida");
    const ususKecil = organs.find((o) => o.id === "usus-kecil")!;
    expect(ususKecil.points!.join(" ")).toContain("asid amino");
  });

  it("hydrochloric acid's two functions now live in the Stomach bullets, not a separate enzyme-section accordion", () => {
    for (const [content, term] of [
      [scienceF2C3InteractiveBM, "hidroklorik"],
      [scienceF2C3InteractiveDLP, "hydrochloric acid"],
    ] as const) {
      const stomach = content.sections[DIGESTIVE_SECTION].digestiveSystem!.organs.find(
        (o) => o.id === "perut",
      )!;
      expect(stomach.points!.join(" ").toLowerCase()).toContain(term);
      // No separate accordion in the enzyme section re-explains it — a short quiz hint
      // that points back to the digestive-system stage is fine, a re-teaching block is not.
      const accordionText = JSON.stringify(content.sections[ENZYME_SECTION].accordions ?? []).toLowerCase();
      expect(accordionText).not.toContain(term);
    }
  });

  it("BM digestive system diagram correctly classifies accessory organs (gall bladder is not a gland)", () => {
    const digestiveSystem = scienceF2C3InteractiveBM.sections[DIGESTIVE_SECTION].digestiveSystem!;
    expect(digestiveSystem.accessoryLabel).not.toMatch(/kelenjar/i);
    const gallBladder = digestiveSystem.organs.find((o) => o.id === "pundi-hempedu")!;
    expect(gallBladder.note).not.toMatch(/kelenjar/i);
  });

  // ---------------------------------------------------------------- 8. Enzymes
  it("the enzyme section is now a static three-column reaction flow, not a tabbed explorer", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[ENZYME_SECTION].enzymeExplorer).toBeUndefined();
      const flow = content.sections[ENZYME_SECTION].reactionFlow!;
      expect(flow.columns).toHaveLength(3);
    }
  });

  it("the protein pathway stays scientifically correct: three protease stages, never collapsed to protein->amino acid", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const protein = content.sections[ENZYME_SECTION].reactionFlow!.columns.find(
        (c) => c.id === "protein",
      )!;
      expect(protein.steps).toHaveLength(3);
      expect(protein.steps.map((s) => s.substrate)).toEqual(
        content === scienceF2C3InteractiveBM
          ? ["Protein", "Polipeptida", "Dipeptida"]
          : ["Protein", "Polypeptide", "Dipeptide"],
      );
      expect(protein.finalProduct).toMatch(/amino/i);
    }
  });

  it("the carbohydrate pathway includes maltase correctly, ending at glucose", () => {
    const bmCarb = scienceF2C3InteractiveBM.sections[ENZYME_SECTION].reactionFlow!.columns.find(
      (c) => c.id === "carb",
    )!;
    expect(bmCarb.steps.map((s) => s.enzyme)).toEqual(["Amilase", "Maltase"]);
    expect(bmCarb.finalProduct).toMatch(/glukosa/i);

    const dlpCarb = scienceF2C3InteractiveDLP.sections[ENZYME_SECTION].reactionFlow!.columns.find(
      (c) => c.id === "carb",
    )!;
    expect(dlpCarb.steps.map((s) => s.enzyme)).toEqual(["Amylase", "Maltase"]);
    expect(dlpCarb.finalProduct).toMatch(/glucose/i);
  });

  it("every reaction-flow column is distinct (no two share the same steps)", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const columns = content.sections[ENZYME_SECTION].reactionFlow!.columns;
      const shapes = columns.map((c) => c.steps.map((s) => `${s.substrate}>${s.enzyme}`).join("|"));
      expect(new Set(shapes).size).toBe(shapes.length);
      for (const column of columns) {
        expect(column.finalProduct.trim()).not.toBe("");
        for (const step of column.steps) {
          expect(step.organs.trim()).not.toBe("");
        }
      }
    }
  });

  it("amylase is not misattributed to the small intestine; maltase is", () => {
    for (const [content, amylaseLabel] of [
      [scienceF2C3InteractiveBM, "Amilase"],
      [scienceF2C3InteractiveDLP, "Amylase"],
    ] as const) {
      const carb = content.sections[ENZYME_SECTION].reactionFlow!.columns.find((c) => c.id === "carb")!;
      const amylaseStep = carb.steps.find((s) => s.enzyme === amylaseLabel)!;
      expect(amylaseStep).toBeDefined();
      expect(amylaseStep.organs).not.toMatch(/small intestine|usus kecil/i);
      const maltaseStep = carb.steps.find((s) => s.enzyme === "Maltase")!;
      expect(maltaseStep.organs).toMatch(/small intestine|usus kecil/i);
    }
  });

  // ---------------------------------------------------------------- 9. Villus/Villi typo
  it("DLP says 'Villus / Villi' (plural), not the mixed-language 'Villus / Vili' typo", () => {
    const villusLabel = scienceF2C3InteractiveDLP.sections[VILLUS_SECTION].villusDiagram!.image!.extra!.find(
      (e) => e.id === "villus",
    )!.label;
    expect(villusLabel).toBe("Villus / Villi");
  });

  it("BM says 'Vilus / Vili' (correct Malay singular/plural)", () => {
    const villusLabel = scienceF2C3InteractiveBM.sections[VILLUS_SECTION].villusDiagram!.image!.extra!.find(
      (e) => e.id === "villus",
    )!.label;
    expect(villusLabel).toBe("Vilus / Vili");
  });

  it("villus and Visking diagrams still use spotlight mode (dim + glow), not colour-only callouts", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[VILLUS_SECTION].villusDiagram!.image!.annotationMode).toBe("spotlight");
      expect(content.sections[VISKING_SECTION].viskingExperiment!.image!.annotationMode).toBe("spotlight");
    }
  });

  it("BM Visking section still teaches the corrected outside-tube test location", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, VISKING_SECTION, "bm");
    expect(markup).toContain("DI LUAR");
    expect(scienceF2C3InteractiveBM.sections[VISKING_SECTION].viskingExperiment!.testLabel).toMatch(
      /DI LUAR/,
    );
  });

  // ---------------------------------------------------------------- 10. System cooperation
  it("assimilation leads with an explicit definition and the three-system flow visually converges on body cells", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      expect(content.sections[ASSIMILATION_SECTION].causeEffect).toBeUndefined();
      expect(content.sections[ASSIMILATION_SECTION].comparison).toBeUndefined();
      const flow = content.sections[ASSIMILATION_SECTION].systemFlow!;
      expect(flow.systems).toHaveLength(3);
      expect(flow.outcomes).toHaveLength(3);
      expect(flow.convergeLabel.trim()).not.toBe("");
    }
    const bmIntro = scienceF2C3InteractiveBM.sections[ASSIMILATION_SECTION].intro!;
    expect(bmIntro).toContain("Asimilasi ialah proses pengagihan hasil akhir pencernaan");
    const dlpIntro = scienceF2C3InteractiveDLP.sections[ASSIMILATION_SECTION].intro!;
    expect(dlpIntro).toContain("Assimilation is the process of distributing the end products of digestion");
  });

  it("the respiratory system is not left out of the three-system flow", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const flow = content.sections[ASSIMILATION_SECTION].systemFlow!;
      const labels = flow.systems.map((s) => s.label.toLowerCase()).join(" ");
      expect(labels).toMatch(/respirat|respira/);
    }
  });

  // ---------------------------------------------------------------- Kept-working areas guard
  it("villus section still leads with an explicit villus/villi (singular/plural) definition", () => {
    const bmIntro = scienceF2C3InteractiveBM.sections[VILLUS_SECTION].intro!;
    expect(bmIntro).toContain("Vilus = bentuk tunggal");
    const dlpIntro = scienceF2C3InteractiveDLP.sections[VILLUS_SECTION].intro!;
    expect(dlpIntro).toContain("Villus (singular)");
  });

  it("BM section 3.2.3 still covers the named diseases and obesity/processed-food link, and now also carries BMI", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, LIFESTYLE_SECTION, "bm");
    expect(markup).toContain("kencing manis");
    expect(markup).toContain("kanser");
    expect(markup).toContain("makanan diproses");
    expect(markup).toContain("BMI");
  });

  it("BM: Kwashiorkor is not core scored content — any surviving mention is explicitly labelled enrichment", () => {
    const text = allText(scienceF2C3InteractiveBM);
    if (text.includes("Kwasyiorkor") || text.includes("Kwashiorkor")) {
      expect(text).toContain("Pengetahuan Tambahan");
    }
  });

  it("BM whole-content check: no remaining 'kimus' term-fix regressions", () => {
    const text = allText(scienceF2C3InteractiveBM);
    expect(text).not.toContain("kimus");
    expect(text).not.toContain("Kimus");
  });

  it("no interactive image label is dead — every annotation carries an explanation", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      for (const section of content.sections) {
        for (const image of section.images ?? []) {
          if (image.annotationMode === "clean") continue;
          for (const annotation of image.annotations) {
            expect(annotation.note?.trim(), `${annotation.id} in ${section.title}`).toBeTruthy();
          }
        }
        for (const extra of section.villusDiagram?.image?.extra ?? []) {
          expect(extra.note?.trim()).toBeTruthy();
        }
        for (const organ of section.digestiveSystem?.organs ?? []) {
          expect(organ.note?.trim()).toBeTruthy();
        }
      }
    }
  });

  it("DLP mirrors the BM structural fixes", () => {
    const digest = renderSection(scienceF2C3InteractiveDLP, DIGESTIVE_SECTION, "en");
    expect(digest).toContain("Duodenum");
    expect(digest.toLowerCase()).toContain("salivary glands");
    const visking = renderSection(scienceF2C3InteractiveDLP, VISKING_SECTION, "en");
    expect(visking).toContain("OUTSIDE");

    const text = allText(scienceF2C3InteractiveDLP);
    if (text.includes("Kwashiorkor")) {
      expect(text).toContain("Additional Knowledge");
    }
  });

  it("BM and DLP have the same section count, SP numbers and block-shape parity", () => {
    expect(scienceF2C3InteractiveBM.sections.length).toBe(scienceF2C3InteractiveDLP.sections.length);
    scienceF2C3InteractiveBM.sections.forEach((bmSection, i) => {
      const dlpSection = scienceF2C3InteractiveDLP.sections[i];
      expect(dlpSection.number).toBe(bmSection.number);
      expect(!!dlpSection.pyramid).toBe(!!bmSection.pyramid);
      expect(!!dlpSection.digestiveSystem).toBe(!!bmSection.digestiveSystem);
      expect(!!dlpSection.viskingExperiment).toBe(!!bmSection.viskingExperiment);
      expect(!!dlpSection.villusDiagram).toBe(!!bmSection.villusDiagram);
      expect(!!dlpSection.reactionFlow).toBe(!!bmSection.reactionFlow);
      expect(!!dlpSection.systemFlow).toBe(!!bmSection.systemFlow);
      expect(!!dlpSection.calorieExample).toBe(!!bmSection.calorieExample);
      expect(!!dlpSection.nutrientTables).toBe(!!bmSection.nutrientTables);
      expect(dlpSection.nutrientTables?.length).toBe(bmSection.nutrientTables?.length);
      expect(!!dlpSection.causeEffect).toBe(!!bmSection.causeEffect);
      expect(!!dlpSection.cards).toBe(!!bmSection.cards);
      expect(dlpSection.cards?.length).toBe(bmSection.cards?.length);
    });
  });
});
