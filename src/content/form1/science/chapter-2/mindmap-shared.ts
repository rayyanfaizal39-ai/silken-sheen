import type { MindNode } from "@/components/MindMap";
import {
  chapter2BodySystemNames,
  chapter2Organelles,
  chapter2Organisms,
  chapter2Organisation,
  chapter2Processes,
  chapter2SpecialisedCells,
  chapter2Terminology,
  localize,
  type BilingualText,
  type Chapter2Lang,
} from "./chapter2-canonical";

interface SemanticMindNode {
  id: string;
  label: BilingualText;
  children?: SemanticMindNode[];
}

const semanticMindMap: SemanticMindNode = {
  id: "root",
  label: chapter2Terminology.title,
  children: [
    {
      id: "cell-basic-unit",
      label: { en: "Cells are the basic unit of life", bm: "Sel ialah unit asas hidupan" },
      children: [
        {
          id: "life-functions",
          label: {
            en: "Life functions: growth, respiration, reproduction, excretion",
            bm: "Fungsi hidup: pertumbuhan, respirasi, pembiakan, perkumuhan",
          },
        },
        {
          id: "division",
          label: {
            en: "Cell division forms new cells and replaces damaged cells",
            bm: "Pembahagian sel membentuk sel baharu dan menggantikan sel rosak",
          },
        },
        {
          id: "cancer",
          label: {
            en: "Uncontrolled cell division can form cancer",
            bm: "Pembahagian sel tanpa kawalan boleh membentuk kanser",
          },
        },
        {
          id: "slides",
          label: {
            en: "Prepare, observe, draw and label cheek-cell and onion-cell slides",
            bm: "Sediakan, perhatikan, lukis dan label slaid sel pipi dan sel bawang",
          },
        },
      ],
    },
    {
      id: "structures",
      label: { en: "Cell structures and functions", bm: "Struktur dan fungsi sel" },
      children: chapter2Organelles.map((organelle) => ({
        id: organelle.id,
        label: {
          en: `${organelle.name.en}: ${organelle.function.en}`,
          bm: `${organelle.name.bm}: ${organelle.function.bm}`,
        },
      })),
    },
    {
      id: "comparison",
      label: { en: "Animal and plant cells", bm: "Sel haiwan dan sel tumbuhan" },
      children: [
        {
          id: "shared",
          label: {
            en: "Both: nucleus, cell membrane, cytoplasm, mitochondria",
            bm: "Kedua-dua: nukleus, membran sel, sitoplasma, mitokondria",
          },
        },
        {
          id: "plant",
          label: {
            en: "Plant: cell wall, chloroplast, vacuole, fixed shape",
            bm: "Tumbuhan: dinding sel, kloroplas, vakuol, bentuk tetap",
          },
        },
        {
          id: "animal",
          label: {
            en: "Animal: no cell wall, no chloroplast, no fixed shape",
            bm: "Haiwan: tiada dinding sel, tiada kloroplas, bentuk tidak tetap",
          },
        },
      ],
    },
    {
      id: "organisms",
      label: { en: "Unicellular and multicellular organisms", bm: "Organisma unisel dan multisel" },
      children: [
        {
          id: "unicellular",
          label: { en: "Unicellular: one cell", bm: "Unisel: satu sel" },
          children: chapter2Organisms
            .filter((organism) => organism.cellCount === "unicellular")
            .map((organism) => ({ id: organism.id, label: organism.name })),
        },
        {
          id: "multicellular",
          label: {
            en: "Multicellular: more than one cell",
            bm: "Multisel: lebih daripada satu sel",
          },
          children: chapter2Organisms
            .filter((organism) => organism.cellCount === "multicellular")
            .map((organism) => ({ id: organism.id, label: organism.name })),
        },
      ],
    },
    {
      id: "specialised-cells",
      label: {
        en: "Specialised animal and plant cells",
        bm: "Sel haiwan dan tumbuhan yang khusus",
      },
      children: [
        {
          id: "animal-cells",
          label: { en: "Animal cells", bm: "Sel haiwan" },
          children: chapter2SpecialisedCells
            .filter((cell) => cell.group === "animal")
            .map((cell) => ({
              id: cell.id,
              label: {
                en: `${cell.name.en}: ${cell.description.en}`,
                bm: `${cell.name.bm}: ${cell.description.bm}`,
              },
            })),
        },
        {
          id: "plant-cells",
          label: { en: "Plant cells", bm: "Sel tumbuhan" },
          children: chapter2SpecialisedCells
            .filter((cell) => cell.group === "plant")
            .map((cell) => ({
              id: cell.id,
              label: {
                en: `${cell.name.en}: ${cell.description.en}`,
                bm: `${cell.name.bm}: ${cell.description.bm}`,
              },
            })),
        },
      ],
    },
    {
      id: "organisation",
      label: {
        en: "Organisation: cell → tissue → organ → system → organism",
        bm: "Organisasi: sel → tisu → organ → sistem → organisma",
      },
      children: [
        {
          id: "animal-path",
          label: {
            en: chapter2Organisation.animal.map((item) => item.en).join(" → "),
            bm: chapter2Organisation.animal.map((item) => item.bm).join(" → "),
          },
        },
        {
          id: "plant-path",
          label: {
            en: chapter2Organisation.plant.map((item) => item.en).join(" → "),
            bm: chapter2Organisation.plant.map((item) => item.bm).join(" → "),
          },
        },
        {
          id: "body-systems",
          label: {
            en: "Eleven coordinated human body systems",
            bm: "Sebelas sistem badan manusia yang berkoordinasi",
          },
          children: chapter2BodySystemNames.map((system, index) => ({
            id: `system-${index + 1}`,
            label: system,
          })),
        },
        {
          id: "appreciation",
          label: {
            en: "Appreciate the variety and benefits of organisms",
            bm: "Mengagumi dan menghargai kepelbagaian serta manfaat organisma",
          },
        },
      ],
    },
    {
      id: "respiration-photosynthesis",
      label: { en: "Cell respiration and photosynthesis", bm: "Respirasi sel dan fotosintesis" },
      children: [
        {
          id: "respiration",
          label: { en: "Cell respiration releases energy", bm: "Respirasi sel membebaskan tenaga" },
          children: [
            {
              id: "respiration-equation",
              label: {
                en: `${chapter2Processes.respiration.reactants.en} → ${chapter2Processes.respiration.products.en}`,
                bm: `${chapter2Processes.respiration.reactants.bm} → ${chapter2Processes.respiration.products.bm}`,
              },
            },
          ],
        },
        {
          id: "photosynthesis",
          label: {
            en: "Photosynthesis absorbs light energy",
            bm: "Fotosintesis menyerap tenaga cahaya",
          },
          children: [
            {
              id: "photosynthesis-equation",
              label: {
                en: `${chapter2Processes.photosynthesis.reactants.en} → ${chapter2Processes.photosynthesis.products.en} (light energy and chlorophyll)`,
                bm: `${chapter2Processes.photosynthesis.reactants.bm} → ${chapter2Processes.photosynthesis.products.bm} (tenaga cahaya dan klorofil)`,
              },
            },
            {
              id: "requirements",
              label: {
                en: "Requires light energy, carbon dioxide, water and chlorophyll",
                bm: "Memerlukan tenaga cahaya, karbon dioksida, air dan klorofil",
              },
            },
            {
              id: "starch-test",
              label: {
                en: "Iodine solution: brown → dark blue when starch is present",
                bm: "Larutan iodin: perang → biru tua apabila kanji hadir",
              },
            },
          ],
        },
        {
          id: "difference",
          label: {
            en: "Respiration releases energy; photosynthesis absorbs energy",
            bm: "Respirasi membebaskan tenaga; fotosintesis menyerap tenaga",
          },
        },
        {
          id: "complement",
          label: {
            en: "The products of each process supply materials for the other",
            bm: "Hasil setiap proses membekalkan bahan untuk proses yang satu lagi",
          },
        },
      ],
    },
  ],
};

function localizeNode(node: SemanticMindNode, lang: Chapter2Lang): MindNode {
  return {
    id: `science-c2-${lang}-${node.id}`,
    label: localize(node.label, lang),
    children: node.children?.map((child) => localizeNode(child, lang)),
  };
}

export function buildChapter2MindMap(lang: Chapter2Lang): MindNode {
  return localizeNode(semanticMindMap, lang);
}

export function getChapter2MindMapSemanticIds(): string[] {
  const ids: string[] = [];
  const visit = (node: SemanticMindNode) => {
    ids.push(node.id);
    node.children?.forEach(visit);
  };
  visit(semanticMindMap);
  return ids;
}
