export type Chapter2Lang = "en" | "bm";

export type Chapter2Sp =
  | "2.1.1"
  | "2.1.2"
  | "2.1.3"
  | "2.1.4"
  | "2.1.5"
  | "2.1.6"
  | "2.1.7"
  | "2.2.1"
  | "2.2.2"
  | "2.2.3"
  | "2.2.4";

export type Chapter2LearningMode =
  | "NOTES"
  | "INTERACTIVE"
  | "PRACTICAL_EXPERIMENT"
  | "QUIZ_PRACTICE"
  | "MIND_MAP";

export interface BilingualText {
  en: string;
  bm: string;
}

export interface Chapter2CoverageEntry {
  standard: Chapter2Sp;
  modes: Chapter2LearningMode[];
  source: string;
}

export interface CanonicalOrganelle {
  id:
    | "nucleus"
    | "cell-membrane"
    | "cytoplasm"
    | "mitochondria"
    | "cell-wall"
    | "chloroplast"
    | "vacuole";
  name: BilingualText;
  function: BilingualText;
  inAnimal: boolean;
  inPlant: boolean;
}

export interface CanonicalOrganism {
  id: string;
  cellCount: "unicellular" | "multicellular";
  name: BilingualText;
  note: BilingualText;
}

export interface CanonicalSpecialisedCell {
  id: string;
  group: "animal" | "plant";
  name: BilingualText;
  description: BilingualText;
}

export const chapter2Sources = {
  dskp: "DSKP KSSM Sains Tingkatan 1, printed pages 48-49 (PDF pages 60-61)",
  textbook: "Buku Teks KSSM Sains Tingkatan 1, Bab 2, printed pages 43-69 (PDF pages 53-79)",
  dlpBoundary:
    "No official DLP textbook was supplied. English content is a semantic translation of the source-verified BM content.",
} as const;

export const chapter2Coverage: Chapter2CoverageEntry[] = [
  {
    standard: "2.1.1",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.1.2",
    modes: ["NOTES", "PRACTICAL_EXPERIMENT", "QUIZ_PRACTICE"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.1.3",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.1.4",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.1.5",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.1.6",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  { standard: "2.1.7", modes: ["NOTES", "INTERACTIVE"], source: chapter2Sources.dskp },
  {
    standard: "2.2.1",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.2.2",
    modes: ["NOTES", "INTERACTIVE", "PRACTICAL_EXPERIMENT", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.2.3",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
  {
    standard: "2.2.4",
    modes: ["NOTES", "INTERACTIVE", "QUIZ_PRACTICE", "MIND_MAP"],
    source: chapter2Sources.dskp,
  },
];

export const chapter2Terminology = {
  title: { en: "Cell as the Basic Unit of Life", bm: "Sel sebagai Unit Asas Hidupan" },
  cellSap: { en: "cell sap", bm: "sap sel" },
  rootHairCell: { en: "root hair cell", bm: "sel rerambut akar" },
  respiratorySystem: { en: "respiratory system", bm: "sistem respirasi" },
  lymphaticSystem: { en: "lymphatic system", bm: "sistem limfa" },
  lung: { en: "lung", bm: "peparu" },
  kidney: { en: "kidney", bm: "ginjal" },
  penis: { en: "penis", bm: "zakar" },
  biconcaveDisc: { en: "biconcave disc", bm: "cakera dwicekung" },
  iodineSolution: { en: "iodine solution", bm: "larutan iodin" },
  darkBlue: { en: "dark blue", bm: "biru tua" },
} as const satisfies Record<string, BilingualText>;

export const chapter2Organelles: CanonicalOrganelle[] = [
  {
    id: "nucleus",
    name: { en: "Nucleus", bm: "Nukleus" },
    function: {
      en: "Controls all cell activities and contains chromosomes made of DNA that carry genetic information.",
      bm: "Mengawal keseluruhan aktiviti sel dan mengandungi kromosom yang terdiri daripada DNA yang membawa maklumat genetik.",
    },
    inAnimal: true,
    inPlant: true,
  },
  {
    id: "cell-membrane",
    name: { en: "Cell membrane", bm: "Membran sel" },
    function: {
      en: "Controls the movement of substances into and out of the cell.",
      bm: "Mengawal pergerakan bahan ke dalam dan ke luar sel.",
    },
    inAnimal: true,
    inPlant: true,
  },
  {
    id: "cytoplasm",
    name: { en: "Cytoplasm", bm: "Sitoplasma" },
    function: {
      en: "Acts as the medium where chemical reactions occur.",
      bm: "Bertindak sebagai medium tindak balas kimia berlaku.",
    },
    inAnimal: true,
    inPlant: true,
  },
  {
    id: "mitochondria",
    name: { en: "Mitochondria", bm: "Mitokondria" },
    function: {
      en: "Produces energy for reactions.",
      bm: "Menghasilkan tenaga untuk tindak balas.",
    },
    inAnimal: true,
    inPlant: true,
  },
  {
    id: "cell-wall",
    name: { en: "Cell wall", bm: "Dinding sel" },
    function: {
      en: "Provides support, protection and a fixed shape to the cell.",
      bm: "Memberikan sokongan, perlindungan dan bentuk yang tetap kepada sel.",
    },
    inAnimal: false,
    inPlant: true,
  },
  {
    id: "chloroplast",
    name: { en: "Chloroplast", bm: "Kloroplas" },
    function: {
      en: "Absorbs light energy for photosynthesis.",
      bm: "Menyerap tenaga cahaya untuk proses fotosintesis.",
    },
    inAnimal: false,
    inPlant: true,
  },
  {
    id: "vacuole",
    name: { en: "Vacuole", bm: "Vakuol" },
    function: {
      en: "Supports the cell when filled with cell sap.",
      bm: "Memberikan sokongan kepada sel apabila dipenuhi sap sel.",
    },
    inAnimal: false,
    inPlant: true,
  },
];

export const chapter2Organisms: CanonicalOrganism[] = [
  {
    id: "amoeba",
    cellCount: "unicellular",
    name: { en: "Amoeba", bm: "Amoeba" },
    note: {
      en: "An animal-like organism that lives in watery areas",
      bm: "Organisma alam haiwan yang hidup di kawasan berair",
    },
  },
  {
    id: "paramecium",
    cellCount: "unicellular",
    name: { en: "Paramecium", bm: "Paramecium" },
    note: {
      en: "An animal-like organism that lives in watery areas",
      bm: "Organisma alam haiwan yang hidup di kawasan berair",
    },
  },
  {
    id: "chlamydomonas",
    cellCount: "unicellular",
    name: { en: "Chlamydomonas", bm: "Chlamydomonas" },
    note: {
      en: "A unicellular organism in the plant kingdom",
      bm: "Organisma unisel dalam alam tumbuhan",
    },
  },
  {
    id: "euglena",
    cellCount: "unicellular",
    name: { en: "Euglena", bm: "Euglena" },
    note: {
      en: "Has both plant and animal characteristics",
      bm: "Mempunyai ciri-ciri tumbuhan dan haiwan",
    },
  },
  {
    id: "mucor",
    cellCount: "multicellular",
    name: { en: "Mucor", bm: "Mucor" },
    note: { en: "A multicellular organism", bm: "Organisma multisel" },
  },
  {
    id: "spirogyra",
    cellCount: "multicellular",
    name: { en: "Spirogyra", bm: "Spirogyra" },
    note: { en: "A multicellular organism", bm: "Organisma multisel" },
  },
  {
    id: "hydra",
    cellCount: "multicellular",
    name: { en: "Hydra", bm: "Hydra" },
    note: { en: "A multicellular organism", bm: "Organisma multisel" },
  },
];

export const chapter2SpecialisedCells: CanonicalSpecialisedCell[] = [
  {
    id: "nerve",
    group: "animal",
    name: { en: "Nerve cell", bm: "Sel saraf" },
    description: {
      en: "Has long fibres that carry information as impulses throughout the body.",
      bm: "Mempunyai gentian panjang yang membawa maklumat dalam bentuk impuls ke seluruh badan.",
    },
  },
  {
    id: "epithelial",
    group: "animal",
    name: { en: "Epithelial cell", bm: "Sel epitelium" },
    description: {
      en: "Forms a layer that protects body organs and secretes mucus.",
      bm: "Membentuk lapisan yang melindungi organ badan dan merembeskan mukus.",
    },
  },
  {
    id: "muscle",
    group: "animal",
    name: { en: "Muscle cell", bm: "Sel otot" },
    description: {
      en: "Contracts and relaxes to cause movement.",
      bm: "Mengecut dan mengendur untuk menyebabkan pergerakan.",
    },
  },
  {
    id: "red-blood",
    group: "animal",
    name: { en: "Red blood cell", bm: "Sel darah merah" },
    description: {
      en: "Has no nucleus, is shaped as a biconcave disc and contains haemoglobin to transport oxygen.",
      bm: "Tiada nukleus, berbentuk cakera dwicekung dan mengandungi hemoglobin untuk mengangkut oksigen.",
    },
  },
  {
    id: "white-blood",
    group: "animal",
    name: { en: "White blood cell", bm: "Sel darah putih" },
    description: {
      en: "Changes shape to surround and destroy foreign particles.",
      bm: "Berubah bentuk untuk mengelilingi dan memusnahkan partikel asing.",
    },
  },
  {
    id: "reproductive",
    group: "animal",
    name: { en: "Reproductive cells", bm: "Sel pembiakan" },
    description: {
      en: "Sperm carries male genetic material and the ovum carries female genetic material.",
      bm: "Sperma membawa bahan genetik lelaki dan ovum membawa bahan genetik perempuan.",
    },
  },
  {
    id: "epidermal",
    group: "plant",
    name: { en: "Epidermal cell", bm: "Sel epidermis" },
    description: {
      en: "Reduces water loss and enables gas exchange and the absorption of water and nutrients.",
      bm: "Mengurangkan kehilangan air serta membolehkan pertukaran gas dan penyerapan air dan nutrien.",
    },
  },
  {
    id: "palisade",
    group: "plant",
    name: { en: "Palisade cell", bm: "Sel palisad" },
    description: {
      en: "Contains chlorophyll to absorb light for photosynthesis.",
      bm: "Mengandungi klorofil untuk menyerap cahaya dan menjalankan fotosintesis.",
    },
  },
  {
    id: "guard",
    group: "plant",
    name: { en: "Guard cell", bm: "Sel pengawal" },
    description: {
      en: "Controls the opening and closing of the stoma.",
      bm: "Mengawal pembukaan dan penutupan stoma.",
    },
  },
  {
    id: "root-hair",
    group: "plant",
    name: { en: "Root hair cell", bm: "Sel rerambut akar" },
    description: {
      en: "Increases surface area to absorb more water and nutrients from the soil.",
      bm: "Meningkatkan luas permukaan untuk menyerap lebih banyak air dan nutrien dari tanah.",
    },
  },
];

export const chapter2Organisation = {
  sequence: [
    { en: "Cell", bm: "Sel" },
    { en: "Tissue", bm: "Tisu" },
    { en: "Organ", bm: "Organ" },
    { en: "System", bm: "Sistem" },
    { en: "Organism", bm: "Organisma" },
  ] satisfies BilingualText[],
  animal: [
    { en: "Epithelial cell", bm: "Sel epitelium" },
    { en: "Epithelial tissue", bm: "Tisu epitelium" },
    { en: "Stomach", bm: "Perut" },
    { en: "Digestive system", bm: "Sistem pencernaan" },
    { en: "Animal", bm: "Haiwan" },
  ] satisfies BilingualText[],
  plant: [
    { en: "Epidermal cell", bm: "Sel epidermis" },
    { en: "Epidermal tissue", bm: "Tisu epidermis" },
    { en: "Leaf", bm: "Daun" },
    { en: "Transport system", bm: "Sistem pengangkutan" },
    { en: "Plant", bm: "Tumbuhan" },
  ] satisfies BilingualText[],
} as const;

export const chapter2BodySystemNames: BilingualText[] = [
  { en: "Nervous system", bm: "Sistem saraf" },
  { en: "Digestive system", bm: "Sistem pencernaan" },
  { en: "Skeletal system", bm: "Sistem rangka" },
  { en: "Excretory system", bm: "Sistem perkumuhan" },
  { en: "Respiratory system", bm: "Sistem respirasi" },
  { en: "Reproductive system", bm: "Sistem pembiakan" },
  { en: "Lymphatic system", bm: "Sistem limfa" },
  { en: "Blood circulatory system", bm: "Sistem peredaran darah" },
  { en: "Muscular system", bm: "Sistem otot" },
  { en: "Endocrine system", bm: "Sistem endokrin" },
  { en: "Integumentary system", bm: "Sistem integumen" },
];

export const chapter2Processes = {
  respiration: {
    reactants: { en: "Glucose + Oxygen", bm: "Glukosa + Oksigen" },
    products: { en: "Carbon dioxide + Water + Energy", bm: "Karbon dioksida + Air + Tenaga" },
  },
  photosynthesis: {
    reactants: { en: "Carbon dioxide + Water", bm: "Karbon dioksida + Air" },
    conditions: { en: "Light energy + Chlorophyll", bm: "Tenaga cahaya + Klorofil" },
    products: { en: "Glucose + Oxygen", bm: "Glukosa + Oksigen" },
    requirements: [
      { en: "Light energy", bm: "Tenaga cahaya" },
      { en: "Carbon dioxide", bm: "Karbon dioksida" },
      { en: "Water", bm: "Air" },
      { en: "Chlorophyll", bm: "Klorofil" },
    ] satisfies BilingualText[],
  },
} as const;

export function localize(text: BilingualText, lang: Chapter2Lang): string {
  return text[lang];
}
