import {
  chapter2Organelles,
  chapter2Organisms,
  chapter2Organisation,
  chapter2SpecialisedCells,
  localize,
  type BilingualText,
  type Chapter2Lang,
  type Chapter2Sp,
} from "./chapter2-canonical";

export type Chapter2InteractionKind =
  | "cell-organelle"
  | "cell-sort"
  | "organism-sort"
  | "specialised-cell"
  | "organisation-order"
  | "respiration-equation"
  | "photosynthesis-requirements"
  | "starch-test"
  | "process-sort"
  | "complementary-process";

export const chapter2InteractionCoverage: Record<Chapter2InteractionKind, Chapter2Sp[]> = {
  "cell-organelle": ["2.1.3"],
  "cell-sort": ["2.1.3"],
  "organism-sort": ["2.1.4"],
  "specialised-cell": ["2.1.5"],
  "organisation-order": ["2.1.6"],
  "respiration-equation": ["2.2.1"],
  "photosynthesis-requirements": ["2.2.2"],
  "starch-test": ["2.2.2"],
  "process-sort": ["2.2.3"],
  "complementary-process": ["2.2.4"],
};

interface BilingualPair {
  id: string;
  label: BilingualText;
  match: BilingualText;
}

interface BilingualCategoryItem {
  id: string;
  label: BilingualText;
  category: string;
}

export interface LocalizedInteractionPair {
  id: string;
  label: string;
  match: string;
}

export interface LocalizedCategoryItem {
  id: string;
  label: string;
  category: string;
}

const organellePairs: BilingualPair[] = chapter2Organelles.map((organelle) => ({
  id: organelle.id,
  label: organelle.name,
  match: organelle.function,
}));

const specialisedPairs: BilingualPair[] = chapter2SpecialisedCells
  .filter((cell) =>
    ["red-blood", "nerve", "palisade", "root-hair", "guard", "white-blood"].includes(cell.id),
  )
  .map((cell) => ({ id: cell.id, label: cell.name, match: cell.description }));

const cellSortItems: BilingualCategoryItem[] = [
  {
    id: "animal-shape",
    label: { en: "No fixed shape", bm: "Bentuk tidak tetap" },
    category: "animal",
  },
  { id: "animal-wall", label: { en: "No cell wall", bm: "Tiada dinding sel" }, category: "animal" },
  { id: "both-nucleus", label: { en: "Nucleus", bm: "Nukleus" }, category: "both" },
  { id: "both-membrane", label: { en: "Cell membrane", bm: "Membran sel" }, category: "both" },
  { id: "both-cytoplasm", label: { en: "Cytoplasm", bm: "Sitoplasma" }, category: "both" },
  { id: "both-mitochondria", label: { en: "Mitochondria", bm: "Mitokondria" }, category: "both" },
  { id: "plant-wall", label: { en: "Cell wall", bm: "Dinding sel" }, category: "plant" },
  { id: "plant-chloroplast", label: { en: "Chloroplast", bm: "Kloroplas" }, category: "plant" },
  {
    id: "plant-vacuole",
    label: { en: "Vacuole filled with cell sap", bm: "Vakuol dipenuhi sap sel" },
    category: "plant",
  },
];

const organismSortItems: BilingualCategoryItem[] = chapter2Organisms.map((organism) => ({
  id: organism.id,
  label: organism.name,
  category: organism.cellCount,
}));

const processSortItems: BilingualCategoryItem[] = [
  {
    id: "resp-mito",
    label: { en: "Occurs in mitochondria", bm: "Berlaku dalam mitokondria" },
    category: "respiration",
  },
  {
    id: "resp-release",
    label: { en: "Releases energy", bm: "Membebaskan tenaga" },
    category: "respiration",
  },
  {
    id: "resp-glucose",
    label: { en: "Breaks down glucose", bm: "Menguraikan glukosa" },
    category: "respiration",
  },
  {
    id: "photo-chloro",
    label: { en: "Occurs in chloroplast", bm: "Berlaku dalam kloroplas" },
    category: "photosynthesis",
  },
  {
    id: "photo-absorb",
    label: { en: "Absorbs light energy", bm: "Menyerap tenaga cahaya" },
    category: "photosynthesis",
  },
  {
    id: "photo-synth",
    label: { en: "Synthesises glucose", bm: "Mensintesis glukosa" },
    category: "photosynthesis",
  },
];

const complementaryItems: BilingualCategoryItem[] = [
  {
    id: "co2",
    label: { en: "Carbon dioxide from respiration", bm: "Karbon dioksida daripada respirasi" },
    category: "to-photosynthesis",
  },
  {
    id: "water",
    label: { en: "Water from respiration", bm: "Air daripada respirasi" },
    category: "to-photosynthesis",
  },
  {
    id: "oxygen",
    label: { en: "Oxygen from photosynthesis", bm: "Oksigen daripada fotosintesis" },
    category: "to-respiration",
  },
  {
    id: "glucose",
    label: { en: "Glucose from photosynthesis", bm: "Glukosa daripada fotosintesis" },
    category: "to-respiration",
  },
];

function pairs(items: BilingualPair[], lang: Chapter2Lang): LocalizedInteractionPair[] {
  return items.map((item) => ({
    id: item.id,
    label: localize(item.label, lang),
    match: localize(item.match, lang),
  }));
}

function categories(items: BilingualCategoryItem[], lang: Chapter2Lang): LocalizedCategoryItem[] {
  return items.map((item) => ({
    id: item.id,
    label: localize(item.label, lang),
    category: item.category,
  }));
}

export function getChapter2InteractionData(lang: Chapter2Lang) {
  return {
    organellePairs: pairs(organellePairs, lang),
    cellSortItems: categories(cellSortItems, lang),
    organismSortItems: categories(organismSortItems, lang),
    specialisedPairs: pairs(specialisedPairs, lang),
    organisationSequences: [
      {
        id: "animal",
        title: lang === "bm" ? "Haiwan" : "Animal",
        items: chapter2Organisation.animal.map((item, index) => ({
          id: `animal-${index}`,
          label: localize(item, lang),
          order: index,
        })),
      },
      {
        id: "plant",
        title: lang === "bm" ? "Tumbuhan" : "Plant",
        items: chapter2Organisation.plant.map((item, index) => ({
          id: `plant-${index}`,
          label: localize(item, lang),
          order: index,
        })),
      },
    ],
    respirationEquation: {
      options:
        lang === "bm"
          ? [
              "Glukosa + oksigen → karbon dioksida + air + tenaga",
              "Karbon dioksida + air → glukosa + oksigen",
              "Oksigen + air → glukosa + tenaga",
            ]
          : [
              "Glucose + oxygen → carbon dioxide + water + energy",
              "Carbon dioxide + water → glucose + oxygen",
              "Oxygen + water → glucose + energy",
            ],
      answerIndex: 0,
    },
    photosynthesisRequirements: {
      options:
        lang === "bm"
          ? ["Tenaga cahaya", "Karbon dioksida", "Air", "Klorofil", "Oksigen", "Kanji"]
          : ["Light energy", "Carbon dioxide", "Water", "Chlorophyll", "Oxygen", "Starch"],
      answerIndexes: [0, 1, 2, 3],
    },
    starchChecks: [
      {
        id: "reagent",
        prompt:
          lang === "bm"
            ? "Reagen manakah digunakan untuk menguji kanji dalam daun?"
            : "Which reagent tests a leaf for starch?",
        options:
          lang === "bm"
            ? ["Larutan iodin", "Larutan kanji", "Air suling"]
            : ["Iodine solution", "Starch solution", "Distilled water"],
        answerIndex: 0,
      },
      {
        id: "result",
        prompt:
          lang === "bm"
            ? "Apakah keputusan positif bagi kanji?"
            : "What is the positive result for starch?",
        options:
          lang === "bm"
            ? ["Perang kepada biru tua", "Biru tua kepada perang", "Tidak berwarna kepada hijau"]
            : ["Brown to dark blue", "Dark blue to brown", "Colourless to green"],
        answerIndex: 0,
      },
    ],
    processSortItems: categories(processSortItems, lang),
    complementaryItems: categories(complementaryItems, lang),
  };
}
