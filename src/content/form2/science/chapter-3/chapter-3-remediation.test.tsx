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
const EXPECTED_SP_SEQUENCE = [
  "3.1.1", // Kelas Makanan
  "3.1.1", // Vitamin dan Mineral
  "3.1.2", // Ujian Makanan
  "3.2.1", // Gizi Seimbang
  "3.2.2", // Nilai Kalori & Perancangan Diet
  "3.2.3", // Gaya Hidup Sihat
  "3.3.1", // Sistem Pencernaan
  "3.3.1", // Pencernaan Fizikal & Kimia
  "3.3.1", // Enzim & Pencernaan Kimia
  "3.4.1", // Penyerapan Hasil Pencernaan
  "3.4.1", // Eksperimen Tiub Visking
  "3.4.2", // Asimilasi & Kerjasama Sistem
  "3.4.3", // Penyahtinjaan
];

describe("Chapter 3 remediated interactive notes — runtime smoke test", () => {
  it("BM: has exactly 13 sections and every block type mounts without throwing", () => {
    expect(scienceF2C3InteractiveBM.sections.length).toBe(13);
    for (let i = 0; i < scienceF2C3InteractiveBM.sections.length; i++) {
      expect(() => renderSection(scienceF2C3InteractiveBM, i, "bm")).not.toThrow();
    }
  });

  it("DLP: has exactly 13 sections and every block type mounts without throwing", () => {
    expect(scienceF2C3InteractiveDLP.sections.length).toBe(13);
    for (let i = 0; i < scienceF2C3InteractiveDLP.sections.length; i++) {
      expect(() => renderSection(scienceF2C3InteractiveDLP, i, "en")).not.toThrow();
    }
  });

  it("BM section 3.3.1 diagram always shows the accessory organs (C-02) regardless of click state", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, 6, "bm"); // index 6 = 3.3.1 Sistem Pencernaan
    expect(markup).toContain("Duodenum");
    expect(markup).toContain("Pankreas");
    expect(markup).toContain("Hati");
    expect(markup).toContain("Pundi hempedu");
  });

  it("BM digestion journey (data-level) fixes C-01: three-stage protease chain, not one-step 'asid amino di perut'", () => {
    const journey = scienceF2C3InteractiveBM.sections[6].sequence!;
    const bodies = journey.steps.map((s) => s.body).join(" ");
    expect(bodies).toContain("protein kepada polipeptida sahaja");
    expect(bodies).not.toMatch(/protein kepada asid amino/);
    const duodenumStep = journey.steps.find((s) => s.title === "Duodenum");
    expect(duodenumStep).toBeDefined();
    expect(duodenumStep!.body).toContain("polipeptida→dipeptida");
    const ususKecilStep = journey.steps.find((s) => s.title === "Usus kecil");
    expect(ususKecilStep!.body).toContain("dipeptida→asid amino");
  });

  it("BM enzyme tabs (data-level) give precise secretion sources for amilase/protease/lipase (M-02)", () => {
    const tabs = scienceF2C3InteractiveBM.sections[8].tabs!; // index 8 = 3.3.1 Enzim
    const amilase = tabs.find((t) => t.title === "Amilase")!;
    expect(amilase.body).toContain("kelenjar air liur");
    expect(amilase.body).toContain("pankreas");
    const protease = tabs.find((t) => t.title === "Protease")!;
    expect(protease.body).toContain("PERUT");
    expect(protease.body).toContain("PANKREAS");
    expect(protease.body).toContain("USUS KECIL");
    const lipase = tabs.find((t) => t.title === "Lipase")!;
    expect(lipase.body).toContain("pankreas");
  });

  it("BM Visking section teaches the corrected outside-tube test location (fixes the NotebookLM error)", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, 10, "bm"); // index 10 = 3.4.1 Eksperimen Tiub Visking
    expect(markup).toContain("Visking");
    expect(markup).toContain("DI LUAR");
    const visking = scienceF2C3InteractiveBM.sections[10].viskingExperiment!;
    expect(visking.testLabel).toMatch(/DI LUAR/);
  });

  it("BM section 3.4.2 covers assimilation and three-system cooperation (C-05)", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, 11, "bm"); // index 11 = 3.4.2 Asimilasi & Kerjasama Sistem
    expect(markup).toContain("Sistem respirasi");
    expect(markup).toContain("Asimilasi");
  });

  it("BM section 3.2.3 covers the named diseases and obesity/processed-food link (C-03)", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, 5, "bm"); // index 5 = 3.2.3 Gaya Hidup Sihat
    expect(markup).toContain("kencing manis");
    expect(markup).toContain("kanser");
    expect(markup).toContain("makanan diproses");
  });

  it("BM pyramid section uses the current Malaysia Food Pyramid 2020 tiers and servings, not the old table", () => {
    const markup = renderSection(scienceF2C3InteractiveBM, 3, "bm"); // index 3 = 3.2.1 Gizi Seimbang
    expect(markup).toContain("Piramid Makanan Malaysia 2020");
    expect(markup).toContain("Sayur-sayuran");
    expect(markup).not.toContain("4–8 sajian");
    expect(markup).not.toContain("4-8 sajian");

    const pyramid = scienceF2C3InteractiveBM.sections[3].pyramid!;
    expect(pyramid.tiers).toHaveLength(4); // official KKM pyramid: 4 tiers
    expect(pyramid.tiers[0].groups.map((g) => g.label)).toEqual(["Sayur-sayuran", "Buah-buahan"]);
    expect(pyramid.tiers[0].groups[0].servings).toMatch(/3 sajian/);
    expect(pyramid.tiers[0].groups[1].servings).toBe("2 sajian sehari");
    expect(pyramid.tiers[1].groups[0].label).toContain("Nasi");
    expect(pyramid.tiers[1].groups[0].servings).toBe("3–5 sajian sehari");
    // Protein + dairy share one tier — dairy must NOT be rendered as a separate fifth tier.
    const proteinDairyTier = pyramid.tiers.find((t) => t.id === "protein-dairy");
    expect(proteinDairyTier).toBeDefined();
    expect(proteinDairyTier!.groups.map((g) => g.label)).toEqual([
      "Ikan",
      "Ayam, telur atau daging",
      "Kekacang (legum)",
      "Susu dan produk tenusu",
    ]);
    expect(proteinDairyTier!.groups.map((g) => g.servings)).toEqual([
      "1 sajian sehari",
      "1–2 sajian sehari",
      "1 sajian sehari",
      "2 sajian sehari",
    ]);
    expect(pyramid.baseNote).toMatch(/6–8 gelas/);
    expect(pyramid.baseNote).toMatch(/250 ml/);
    // Source label must not misattribute the 2020 arrangement to the textbook's Rajah 3.7.
    expect(pyramid.sourceLabel).not.toContain("Rajah 3.7");
    expect(pyramid.sourceLabel).toContain("2020");
  });

  it("BM pyramid apex guidance is not replaced by a vague 'avoid processed food' statement", () => {
    const pyramid = scienceF2C3InteractiveBM.sections[3].pyramid!;
    const apex = pyramid.tiers[pyramid.tiers.length - 1];
    expect(apex.groups[0].label).toBe("Lemak, minyak, gula dan garam");
    expect(pyramid.limitNote).toMatch(/ultra-proses/);
    expect(pyramid.limitNote).not.toMatch(/^Elakkan makanan diproses/);
  });

  it("BM digestive system diagram correctly classifies accessory organs (gall bladder is not a gland)", () => {
    const digestiveSystem = scienceF2C3InteractiveBM.sections[6].digestiveSystem!;
    expect(digestiveSystem.accessoryLabel).not.toMatch(/kelenjar/i);
    expect(digestiveSystem.instruction).not.toMatch(/kelenjar bantuan/i);
    const gallBladder = digestiveSystem.organs.find((o) => o.id === "pundi-hempedu")!;
    expect(gallBladder.note).not.toMatch(/kelenjar/i);
  });

  it("BM calorific value is defined by oxidation, not literal burning in the body", () => {
    const intro = scienceF2C3InteractiveBM.sections[4].intro!; // index 4 = 3.2.2
    expect(intro).toContain("dioksidakan");
    expect(intro).not.toContain("dibakar dengan lengkap di dalam badan");
  });

  it("BM: Kwashiorkor is not core scored content — quiz-equivalent core surfaces avoid it, mind map/notes label it as enrichment", () => {
    const text = allText(scienceF2C3InteractiveBM);
    // Any surviving mention must be explicitly labelled as non-core.
    if (text.includes("Kwasyiorkor") || text.includes("Kwashiorkor")) {
      expect(text).toContain("Pengetahuan Tambahan");
    }
  });

  it("BM whole-content check: no remaining 'kimus' term-fix regressions, and no fake SP numbers", () => {
    const text = allText(scienceF2C3InteractiveBM);
    expect(text).not.toContain("kimus");
    expect(text).not.toContain("Kimus");
  });

  it("BM/DLP: section numbers exactly follow the real SP mapping — no invented sub-numbers", () => {
    for (const content of [scienceF2C3InteractiveBM, scienceF2C3InteractiveDLP]) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers).toEqual(EXPECTED_SP_SEQUENCE);
      for (const n of numbers) {
        expect(VALID_SP_NUMBERS.has(n)).toBe(true);
      }
      // These specific invented numbers must never reappear.
      expect(numbers).not.toContain("3.1.3");
      expect(numbers).not.toContain("3.3.2");
      expect(numbers).not.toContain("3.3.3");
      expect(numbers).not.toContain("3.4.4");
    }
  });

  it("DLP mirrors the same structural fixes in English", () => {
    const digest = renderSection(scienceF2C3InteractiveDLP, 6, "en");
    expect(digest).toContain("Duodenum");
    expect(digest).toContain("Pancreas");
    expect(digest).toContain("Gall bladder");

    const journey = scienceF2C3InteractiveDLP.sections[6].sequence!;
    const bodies = journey.steps.map((s) => s.body).join(" ");
    expect(bodies).toContain("polypeptide only at this stage");
    expect(bodies).not.toMatch(/protein into amino acids/);

    const visking = renderSection(scienceF2C3InteractiveDLP, 10, "en");
    expect(visking).toContain("OUTSIDE");
  });

  it("DLP pyramid, gall-bladder classification and calorific wording mirror the BM fixes", () => {
    const markup = renderSection(scienceF2C3InteractiveDLP, 3, "en");
    expect(markup).toContain("Malaysia Food Pyramid 2020");
    expect(markup).not.toContain("4–8 servings");
    expect(markup).not.toContain("4-8 servings");

    const pyramid = scienceF2C3InteractiveDLP.sections[3].pyramid!;
    expect(pyramid.tiers).toHaveLength(4);
    expect(pyramid.sourceLabel).not.toContain("Rajah 3.7");

    const digestiveSystem = scienceF2C3InteractiveDLP.sections[6].digestiveSystem!;
    expect(digestiveSystem.accessoryLabel).not.toMatch(/accessory glands?$/i);
    expect(digestiveSystem.instruction).not.toMatch(/accessory glands/i);

    const intro = scienceF2C3InteractiveDLP.sections[4].intro!;
    expect(intro).toContain("oxidised");
    expect(intro).not.toContain("completely burnt in the body");

    const text = allText(scienceF2C3InteractiveDLP);
    if (text.includes("Kwashiorkor")) {
      expect(text).toContain("Additional Knowledge");
    }
  });

  it("BM and DLP have the same section count, SP numbers and block-shape parity", () => {
    expect(scienceF2C3InteractiveBM.sections.length).toBe(
      scienceF2C3InteractiveDLP.sections.length,
    );
    scienceF2C3InteractiveBM.sections.forEach((bmSection, i) => {
      const dlpSection = scienceF2C3InteractiveDLP.sections[i];
      expect(dlpSection.number).toBe(bmSection.number);
      expect(!!dlpSection.pyramid).toBe(!!bmSection.pyramid);
      expect(!!dlpSection.digestiveSystem).toBe(!!bmSection.digestiveSystem);
      expect(!!dlpSection.viskingExperiment).toBe(!!bmSection.viskingExperiment);
      expect(!!dlpSection.villusDiagram).toBe(!!bmSection.villusDiagram);
      expect(!!dlpSection.sequence).toBe(!!bmSection.sequence);
      expect(!!dlpSection.tabs).toBe(!!bmSection.tabs);
      expect(!!dlpSection.causeEffect).toBe(!!bmSection.causeEffect);
    });
  });
});
