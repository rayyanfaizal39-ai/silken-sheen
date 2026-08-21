import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { AnimalPlantCellVisual } from "./Chapter2LearningVisuals";

describe("AnimalPlantCellVisual", () => {
  it("renders the complete English structure set as direct interactive labels", () => {
    const markup = renderToStaticMarkup(
      <AnimalPlantCellVisual content={chapter2Content.en} lang="en" />,
    );

    for (const label of [
      "Nucleus",
      "Cell membrane",
      "Cytoplasm",
      "Mitochondria",
      "Cell wall",
      "Chloroplast",
      "Vacuole",
    ]) {
      expect(markup).toContain(label);
    }

    expect(markup.match(/<line/g)).toHaveLength(11);
    expect(markup).toContain('aria-label="Plant cell, Cell membrane"');
    expect(markup).not.toContain("Visual key");
  });

  it("uses the canonical BM labels", () => {
    const markup = renderToStaticMarkup(
      <AnimalPlantCellVisual content={chapter2Content.bm} lang="bm" />,
    );

    for (const label of [
      "Nukleus",
      "Membran sel",
      "Sitoplasma",
      "Mitokondria",
      "Dinding sel",
      "Kloroplas",
      "Vakuol",
    ]) {
      expect(markup).toContain(label);
    }

    expect(markup).toContain('aria-label="Sel tumbuhan, Membran sel"');
  });
});
