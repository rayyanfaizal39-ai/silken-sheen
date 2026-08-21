import { describe, expect, it } from "vitest";
import { getChapter } from "@/content/registry";
import { parseWordEquation } from "@/components/notes/blocks/EquationFlow";
import { chapter2PracticalAreas } from "./chapter2-activities";
import {
  chapter2Coverage,
  chapter2Organelles,
  chapter2Organisms,
  chapter2Organisation,
  chapter2Terminology,
  type Chapter2Sp,
} from "./chapter2-canonical";
import { chapter2Content } from "./chapter2-content";
import { chapter2InteractionCoverage } from "./chapter2-interactives";
import { scienceF1C2MindMapBM } from "./mindmap-bm";
import { scienceF1C2MindMapDLP } from "./mindmap-dlp";
import { getChapter2MindMapSemanticIds } from "./mindmap-shared";

const expectedStandards: Chapter2Sp[] = [
  "2.1.1",
  "2.1.2",
  "2.1.3",
  "2.1.4",
  "2.1.5",
  "2.1.6",
  "2.1.7",
  "2.2.1",
  "2.2.2",
  "2.2.3",
  "2.2.4",
];

function flatten(root: {
  id: string;
  label: string;
  children?: Array<{ id: string; label: string; children?: unknown[] }>;
}) {
  const nodes = [{ id: root.id, label: root.label }];
  for (const child of root.children ?? []) nodes.push(...flatten(child as typeof root));
  return nodes;
}

describe("Science Form 1 Chapter 2 canonical remediation", () => {
  it("declares all eleven learning standards exactly once", () => {
    expect(chapter2Coverage.map((entry) => entry.standard)).toEqual(expectedStandards);
    expect(new Set(chapter2Coverage.map((entry) => entry.standard)).size).toBe(11);
    expect(chapter2Coverage.every((entry) => entry.source.includes("DSKP"))).toBe(true);
  });

  it("keeps exactly two genuine physical practical areas", () => {
    expect(chapter2PracticalAreas.map((area) => [area.id, area.standard])).toEqual([
      ["cell-slide-preparation", "2.1.2"],
      ["photosynthesis-investigation-hub", "2.2.2"],
    ]);
    expect(chapter2PracticalAreas[1].investigations?.map((item) => item.id)).toEqual([
      "starch",
      "light",
      "chlorophyll",
      "carbon-dioxide",
      "water",
    ]);
    expect(
      chapter2PracticalAreas.every((area) => area.practicalNotice.bm.includes("tidak membuktikan")),
    ).toBe(true);
    expect(
      chapter2Coverage
        .filter((entry) => entry.modes.includes("PRACTICAL_EXPERIMENT"))
        .map((entry) => entry.standard),
    ).toEqual(["2.1.2", "2.2.2"]);
  });

  it("maps the ten compact interactions to appropriate Chapter 2 standards", () => {
    expect(Object.keys(chapter2InteractionCoverage)).toHaveLength(10);
    const represented = new Set(Object.values(chapter2InteractionCoverage).flat());
    for (const standard of [
      "2.1.3",
      "2.1.4",
      "2.1.5",
      "2.1.6",
      "2.2.1",
      "2.2.2",
      "2.2.3",
      "2.2.4",
    ] as Chapter2Sp[]) {
      expect(represented.has(standard)).toBe(true);
      expect(chapter2Coverage.find((entry) => entry.standard === standard)?.modes).toContain(
        "INTERACTIVE",
      );
    }
  });

  it("uses the source-supported organelle membership and BM terminology", () => {
    expect(chapter2Organelles.find((item) => item.id === "cell-membrane")?.inPlant).toBe(true);
    expect(chapter2Organelles.find((item) => item.id === "vacuole")?.function.bm).toContain(
      "sap sel",
    );
    expect(chapter2Terminology.rootHairCell.bm).toBe("sel rerambut akar");
    expect(chapter2Terminology.respiratorySystem.bm).toBe("sistem respirasi");
    expect(chapter2Terminology.lymphaticSystem.bm).toBe("sistem limfa");
    expect(chapter2Terminology.iodineSolution.bm).toBe("larutan iodin");
    expect(chapter2Terminology.darkBlue.bm).toBe("biru tua");
    expect(chapter2Content.bm.photosynthesis.starchTestNote).toContain("Larutan iodin");
    expect(chapter2Content.bm.photosynthesis.starchTestNote).toContain("biru tua");
  });

  it("keeps organism classifications source-faithful", () => {
    const classification = Object.fromEntries(
      chapter2Organisms.map((item) => [item.id, item.cellCount]),
    );
    expect(classification).toMatchObject({
      amoeba: "unicellular",
      paramecium: "unicellular",
      chlamydomonas: "unicellular",
      euglena: "unicellular",
      mucor: "multicellular",
      spirogyra: "multicellular",
      hydra: "multicellular",
    });
    expect(chapter2Organisms.find((item) => item.id === "euglena")?.note.bm).toContain(
      "tumbuhan dan haiwan",
    );
  });

  it("contains parallel animal and plant organisation pathways", () => {
    expect(chapter2Organisation.animal.map((item) => item.bm)).toEqual([
      "Sel epitelium",
      "Tisu epitelium",
      "Perut",
      "Sistem pencernaan",
      "Haiwan",
    ]);
    expect(chapter2Organisation.plant.map((item) => item.bm)).toEqual([
      "Sel epidermis",
      "Tisu epidermis",
      "Daun",
      "Sistem pengangkutan",
      "Tumbuhan",
    ]);
    expect(chapter2Content.en.organisationExamples.animal).toHaveLength(5);
    expect(chapter2Content.en.organisationExamples.plant).toHaveLength(5);
  });

  it("renders photosynthesis equation conditions as parsed data", () => {
    const parsed = parseWordEquation(chapter2Content.bm.photosynthesis.wordEquation);
    expect(parsed).toEqual({
      reactants: "Karbon dioksida + Air",
      conditions: "Tenaga cahaya + Klorofil",
      products: "Glukosa + Oksigen",
    });
  });

  it("derives BM and DLP mind maps from identical semantic topology", () => {
    const expectedCount = getChapter2MindMapSemanticIds().length;
    const bmNodes = flatten(scienceF1C2MindMapBM);
    const dlpNodes = flatten(scienceF1C2MindMapDLP);
    expect(bmNodes).toHaveLength(expectedCount);
    expect(dlpNodes).toHaveLength(expectedCount);
    expect(bmNodes.map((node) => node.id.replace("science-c2-bm-", ""))).toEqual(
      dlpNodes.map((node) => node.id.replace("science-c2-en-", "")),
    );
    expect(bmNodes.map((node) => node.label).join(" ")).toContain("Mucor");
    expect(bmNodes.map((node) => node.label).join(" ")).not.toMatch(
      /Pleurococcus|Mukor|Paku pakis/,
    );
  });

  it("standardises live titles and preserves the heart/jantung human-review hold", () => {
    expect(getChapter("science", "Chapter 2", "bm", "Form 1")?.title).toBe(
      "Sel sebagai Unit Asas Hidupan",
    );
    expect(getChapter("science", "Chapter 2", "dlp", "Form 1")?.mindMap?.title).toBe(
      "Cell as the Basic Unit of Life",
    );
    expect(
      chapter2Content.bm.bodySystems.find((system) => system.name === "Sistem rangka")?.function,
    ).toContain("jantung");
    expect(
      chapter2Content.en.bodySystems.find((system) => system.name === "Skeletal system")?.function,
    ).toContain("heart");
  });

  it("removes the unsupported precise opening statistic", () => {
    expect(`${chapter2Content.bm.hook.body} ${chapter2Content.en.hook.body}`).not.toMatch(
      /37\s*(trilion|trillion)/i,
    );
  });
});
