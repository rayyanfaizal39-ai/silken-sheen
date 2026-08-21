import {
  chapter2Organelles,
  chapter2Organisms,
  chapter2Organisation,
  chapter2Processes,
  chapter2SpecialisedCells,
  localize,
  type Chapter2Lang,
} from "./chapter2-canonical";

// BM facts and terminology are grounded in the supplied official DSKP and BM textbook.
// No official DLP textbook was supplied; English is a semantic translation for parity.

export interface CellStructure {
  id: string;
  name: string;
  function: string;
  inAnimal: boolean;
  inPlant: boolean;
}

export interface CellTypeCard {
  id: string;
  name: string;
  description: string;
}

export interface OrganismExample {
  id: string;
  name: string;
  note?: string;
}

export interface OrganisationLevel {
  level: string;
  description: string;
}

export interface BodySystem {
  name: string;
  organs: string;
  function: string;
}

export interface RespirationPhotosynthesisRow {
  characteristic: string;
  respiration: string;
  photosynthesis: string;
}

export interface Chapter2Content {
  hook: { title: string; body: string };
  cellBasics: {
    definition: string;
    discoveryHistory: string;
    lifeFunctions: string[];
    divisionTitle: string;
    divisionBody: string;
    cancerBody: string;
  };
  cellStructures: CellStructure[];
  animalVsPlant: { animalOnly: string[]; plantOnly: string[]; shared: string[] };
  unicellularMulticellular: {
    definition: string;
    unicellular: OrganismExample[];
    multicellular: OrganismExample[];
  };
  animalCellTypes: CellTypeCard[];
  plantCellTypes: CellTypeCard[];
  organisationHierarchy: OrganisationLevel[];
  organisationExamples: {
    animalTitle: string;
    animal: string[];
    plantTitle: string;
    plant: string[];
  };
  bodySystems: BodySystem[];
  appreciation: { title: string; body: string; reflectionItems: string[] };
  respiration: { definition: string; wordEquation: string };
  photosynthesis: {
    definition: string;
    requirements: string[];
    wordEquation: string;
    starchTestNote: string;
  };
  comparisonTable: RespirationPhotosynthesisRow[];
  complementaryRelationship: string;
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

function localizeStructures(lang: Chapter2Lang): CellStructure[] {
  return chapter2Organelles.map((structure) => ({
    id: structure.id,
    name: localize(structure.name, lang),
    function: localize(structure.function, lang),
    inAnimal: structure.inAnimal,
    inPlant: structure.inPlant,
  }));
}

function localizeOrganisms(
  lang: Chapter2Lang,
  cellCount: "unicellular" | "multicellular",
): OrganismExample[] {
  return chapter2Organisms
    .filter((organism) => organism.cellCount === cellCount)
    .map((organism) => ({
      id: organism.id,
      name: localize(organism.name, lang),
      note: localize(organism.note, lang),
    }));
}

function localizeCells(lang: Chapter2Lang, group: "animal" | "plant"): CellTypeCard[] {
  return chapter2SpecialisedCells
    .filter((cell) => cell.group === group)
    .map((cell) => ({
      id: cell.id,
      name: localize(cell.name, lang),
      description: localize(cell.description, lang),
    }));
}

function equation(lang: Chapter2Lang, kind: "respiration" | "photosynthesis"): string {
  if (kind === "respiration") {
    return `${localize(chapter2Processes.respiration.reactants, lang)} → ${localize(chapter2Processes.respiration.products, lang)}`;
  }
  return `${localize(chapter2Processes.photosynthesis.reactants, lang)} --(${localize(chapter2Processes.photosynthesis.conditions, lang)})--> ${localize(chapter2Processes.photosynthesis.products, lang)}`;
}

const en: Chapter2Content = {
  hook: {
    title: "Why this matters",
    body: "Every living thing is built from cells. Understanding how cells are structured, organised and supplied with energy helps us explain how whole organisms stay alive.",
  },
  cellBasics: {
    definition:
      "A cell is the basic structural and functional unit of living things. Cells carry out life functions and undergo cell division.",
    discoveryHistory:
      "In 1665, Robert Hooke observed cork with a simple microscope and named the small box-shaped structures cells. In 1674, Antonie van Leeuwenhoek observed moving microorganisms in rainwater with a more powerful microscope.",
    lifeFunctions: ["Growth", "Respiration", "Reproduction", "Excretion"],
    divisionTitle: "Cell division, growth and repair",
    divisionBody:
      "Cells divide to form new cells and replace old or damaged cells. One cell divides into two cells, and the process continues.",
    cancerBody:
      "Normal cell division is controlled. Cancer forms when normal cells continue to divide without control, and a mass of cells called a tumour may form.",
  },
  cellStructures: localizeStructures("en"),
  animalVsPlant: {
    animalOnly: ["No cell wall", "No chloroplast", "No large plant vacuole", "No fixed shape"],
    plantOnly: ["Cell wall present", "Chloroplast present", "Vacuole present", "Fixed shape"],
    shared: ["Nucleus", "Cell membrane", "Cytoplasm", "Mitochondria"],
  },
  unicellularMulticellular: {
    definition:
      "A unicellular organism consists of one cell that carries out all life processes. A multicellular organism consists of more than one cell, with cells that can perform specialised functions.",
    unicellular: localizeOrganisms("en", "unicellular"),
    multicellular: localizeOrganisms("en", "multicellular"),
  },
  animalCellTypes: localizeCells("en", "animal"),
  plantCellTypes: localizeCells("en", "plant"),
  organisationHierarchy: [
    {
      level: "Cell",
      description: "Most cells in a multicellular organism have specific functions.",
    },
    { level: "Tissue", description: "Cells with the same function combine to form a tissue." },
    { level: "Organ", description: "Different tissues work together to perform one function." },
    { level: "System", description: "Related organs work together for a particular purpose." },
    { level: "Organism", description: "All systems work together so the organism functions well." },
  ],
  organisationExamples: {
    animalTitle: "Example in an animal",
    animal: chapter2Organisation.animal.map((item) => localize(item, "en")),
    plantTitle: "Example in a plant",
    plant: chapter2Organisation.plant.map((item) => localize(item, "en")),
  },
  bodySystems: [
    {
      name: "Excretory system",
      organs: "Skin, lung, kidney",
      function: "Removes excess waste from the body",
    },
    {
      name: "Skeletal system",
      organs: "Skull, bone",
      function: "Supports the body and protects inner organs such as the lung and heart",
    },
    {
      name: "Lymphatic system",
      organs: "Lymph",
      function: "Drains lymphatic fluid into blood vessels and defends the body from infection",
    },
    {
      name: "Digestive system",
      organs: "Mouth, oesophagus, stomach, small intestine, large intestine",
      function: "Breaks complex food into simpler substances for absorption",
    },
    {
      name: "Muscular system",
      organs: "Muscle",
      function: "Helps move the body and internal organs",
    },
    {
      name: "Integumentary system",
      organs: "Skin",
      function: "Protects the body from dehydration and regulates body temperature",
    },
    {
      name: "Nervous system",
      organs: "Brain, spinal cord, nerve",
      function: "Carries information from the brain throughout the body as impulses",
    },
    {
      name: "Blood circulatory system",
      organs: "Heart, blood vessel",
      function: "Transports oxygen, nutrients and hormones throughout the body",
    },
    {
      name: "Respiratory system",
      organs: "Nose, lung",
      function: "Takes in oxygen and removes carbon dioxide from body cells",
    },
    {
      name: "Endocrine system",
      organs: "Pituitary, thyroid, adrenal, pancreas, ovary, testis",
      function: "Produces hormones that coordinate reactions in the body",
    },
    {
      name: "Reproductive system",
      organs: "Ovary, testis, penis",
      function: "Produces sperm and ova for reproduction",
    },
  ],
  appreciation: {
    title: "Appreciating the variety of organisms",
    body: "Cell organisation produces many different organisms. Their different structures and roles contribute to life around us.",
    reflectionItems: [
      "I can identify one way a unicellular organism carries out life processes.",
      "I can describe one benefit that a multicellular organism provides to its surroundings or to people.",
      "I can state one action that shows care for living organisms and their habitats.",
    ],
  },
  respiration: {
    definition:
      "Cell respiration is the oxidation and breakdown of glucose in living cells to release energy for life processes. It requires glucose and oxygen and produces carbon dioxide, water and energy.",
    wordEquation: equation("en", "respiration"),
  },
  photosynthesis: {
    definition:
      "Green plants synthesise glucose through photosynthesis and store some of it as starch. The presence of starch in a leaf shows that photosynthesis has occurred.",
    requirements: chapter2Processes.photosynthesis.requirements.map((item) => localize(item, "en")),
    wordEquation: equation("en", "photosynthesis"),
    starchTestNote:
      "Iodine solution changes from brown to dark blue when starch is present. This result shows that photosynthesis has occurred in the tested part of the leaf.",
  },
  comparisonTable: [
    { characteristic: "Location", respiration: "Mitochondria", photosynthesis: "Chloroplast" },
    {
      characteristic: "Energy",
      respiration: "Releases energy",
      photosynthesis: "Absorbs light energy",
    },
    {
      characteristic: "Reactants",
      respiration: "Glucose and oxygen",
      photosynthesis: "Carbon dioxide and water",
    },
    {
      characteristic: "Products",
      respiration: "Carbon dioxide, water and energy",
      photosynthesis: "Glucose and oxygen",
    },
    {
      characteristic: "Occurs in",
      respiration: "Humans, animals, plants and microorganisms",
      photosynthesis: "Plants and microorganisms",
    },
    {
      characteristic: "Timing",
      respiration: "Occurs at all times",
      photosynthesis: "Occurs when light is present",
    },
  ],
  complementaryRelationship:
    "Cell respiration and photosynthesis complement each other. Carbon dioxide and water produced during respiration are used in photosynthesis, while glucose and oxygen produced during photosynthesis are used in respiration.",
  keyExamFacts: [
    "Cells carry out life functions and divide to form new cells and replace damaged cells.",
    "Uncontrolled cell division can form cancer.",
    "Plant and animal cells both have a cell membrane, cytoplasm, nucleus and mitochondria.",
    "Plant cells also have a cell wall, chloroplast and vacuole.",
    "Unicellular organisms have one cell; multicellular organisms have more than one cell.",
    "Organisation in animals and plants follows: cell → tissue → organ → system → organism.",
    "Cell respiration releases energy; photosynthesis absorbs light energy.",
    "Photosynthesis requires light energy, carbon dioxide, water and chlorophyll.",
    "Iodine solution turns from brown to dark blue when starch is present.",
    "Respiration and photosynthesis provide materials for each other.",
  ],
  keyTerms: [
    "Cell",
    "Cell division",
    "Cancer",
    "Nucleus",
    "Cytoplasm",
    "Cell membrane",
    "Mitochondria",
    "Cell wall",
    "Chloroplast",
    "Vacuole",
    "Unicellular organism",
    "Multicellular organism",
    "Specialised cell",
    "Tissue",
    "Organ",
    "System",
    "Organism",
    "Cell respiration",
    "Photosynthesis",
    "Chlorophyll",
    "Starch",
  ],
  chapterSummary:
    "Chapter 2 explains cells as the basic unit of life, cell division, animal and plant cell structures, unicellular and multicellular organisms, specialised cells, organisation in animals and plants, and the complementary processes of cell respiration and photosynthesis.",
};

const bm: Chapter2Content = {
  hook: {
    title: "Mengapa ini penting",
    body: "Setiap benda hidup dibina daripada sel. Memahami struktur, organisasi dan cara sel memperoleh tenaga membantu kita menerangkan bagaimana organisma terus hidup.",
  },
  cellBasics: {
    definition:
      "Sel ialah unit struktur dan fungsi asas benda hidup. Sel menjalankan fungsi hidup dan mengalami pembahagian sel.",
    discoveryHistory:
      "Pada tahun 1665, Robert Hooke memerhati gabus menggunakan mikroskop mudah dan menamakan struktur kecil berbentuk kotak itu sebagai sel. Pada tahun 1674, Antonie van Leeuwenhoek memerhati mikroorganisma bergerak di dalam air hujan menggunakan mikroskop yang lebih berkuasa.",
    lifeFunctions: ["Pertumbuhan", "Respirasi", "Pembiakan", "Perkumuhan"],
    divisionTitle: "Pembahagian sel, pertumbuhan dan pembaikan",
    divisionBody:
      "Sel membahagi untuk membentuk sel baharu dan menggantikan sel yang tua atau rosak. Satu sel membahagi menjadi dua sel dan proses ini berterusan.",
    cancerBody:
      "Pembahagian sel normal berlaku secara terkawal. Kanser terbentuk apabila sel normal terus membahagi tanpa kawalan dan suatu jisim sel yang disebut tumor boleh terbentuk.",
  },
  cellStructures: localizeStructures("bm"),
  animalVsPlant: {
    animalOnly: [
      "Tiada dinding sel",
      "Tiada kloroplas",
      "Tiada vakuol tumbuhan yang besar",
      "Bentuk tidak tetap",
    ],
    plantOnly: ["Ada dinding sel", "Ada kloroplas", "Ada vakuol", "Bentuk tetap"],
    shared: ["Nukleus", "Membran sel", "Sitoplasma", "Mitokondria"],
  },
  unicellularMulticellular: {
    definition:
      "Organisma unisel terdiri daripada satu sel yang menjalankan semua proses hidup. Organisma multisel terdiri daripada lebih daripada satu sel dan sel-selnya boleh menjalankan fungsi khusus.",
    unicellular: localizeOrganisms("bm", "unicellular"),
    multicellular: localizeOrganisms("bm", "multicellular"),
  },
  animalCellTypes: localizeCells("bm", "animal"),
  plantCellTypes: localizeCells("bm", "plant"),
  organisationHierarchy: [
    {
      level: "Sel",
      description: "Kebanyakan sel dalam organisma multisel mempunyai fungsi khusus.",
    },
    { level: "Tisu", description: "Sel yang mempunyai fungsi sama bergabung membentuk tisu." },
    { level: "Organ", description: "Tisu berlainan bekerjasama untuk menjalankan satu fungsi." },
    { level: "Sistem", description: "Organ yang berkaitan bekerjasama untuk tujuan tertentu." },
    {
      level: "Organisma",
      description: "Semua sistem bekerjasama supaya organisma berfungsi dengan baik.",
    },
  ],
  organisationExamples: {
    animalTitle: "Contoh dalam haiwan",
    animal: chapter2Organisation.animal.map((item) => localize(item, "bm")),
    plantTitle: "Contoh dalam tumbuhan",
    plant: chapter2Organisation.plant.map((item) => localize(item, "bm")),
  },
  bodySystems: [
    {
      name: "Sistem perkumuhan",
      organs: "Kulit, peparu, ginjal",
      function: "Menyingkirkan bahan buangan yang berlebihan daripada badan",
    },
    {
      name: "Sistem rangka",
      organs: "Tengkorak, tulang",
      function: "Menyokong badan dan melindungi organ dalaman seperti peparu dan jantung",
    },
    {
      name: "Sistem limfa",
      organs: "Limfa",
      function:
        "Mengalirkan bendalir limfa ke dalam saluran darah dan mempertahankan badan daripada jangkitan",
    },
    {
      name: "Sistem pencernaan",
      organs: "Mulut, esofagus, perut, usus kecil, usus besar",
      function: "Memecahkan makanan kompleks kepada bahan yang lebih ringkas untuk penyerapan",
    },
    {
      name: "Sistem otot",
      organs: "Otot",
      function: "Membantu pergerakan badan dan organ dalaman",
    },
    {
      name: "Sistem integumen",
      organs: "Kulit",
      function: "Melindungi badan daripada kekeringan dan mengawal suhu badan",
    },
    {
      name: "Sistem saraf",
      organs: "Otak, saraf tunjang, saraf",
      function: "Membawa maklumat dari otak ke seluruh badan dalam bentuk impuls",
    },
    {
      name: "Sistem peredaran darah",
      organs: "Jantung, salur darah",
      function: "Mengangkut oksigen, nutrien dan hormon ke seluruh badan",
    },
    {
      name: "Sistem respirasi",
      organs: "Hidung, peparu",
      function: "Mengambil oksigen dan mengeluarkan karbon dioksida dari sel dalam badan",
    },
    {
      name: "Sistem endokrin",
      organs: "Pituitari, tiroid, adrenal, pankreas, ovari, testis",
      function: "Menghasilkan hormon untuk menyelaraskan tindak balas dalam badan",
    },
    {
      name: "Sistem pembiakan",
      organs: "Ovari, testis, zakar",
      function: "Menghasilkan sperma dan ovum untuk pembentukan zuriat",
    },
  ],
  appreciation: {
    title: "Mengagumi dan menghargai kepelbagaian organisma",
    body: "Organisasi sel membentuk pelbagai organisma. Struktur dan peranan yang berbeza menyumbang kepada kehidupan di sekeliling kita.",
    reflectionItems: [
      "Saya boleh mengenal pasti satu cara organisma unisel menjalankan proses hidup.",
      "Saya boleh menerangkan satu manfaat organisma multisel kepada persekitaran atau manusia.",
      "Saya boleh menyatakan satu tindakan yang menunjukkan sikap menghargai organisma dan habitatnya.",
    ],
  },
  respiration: {
    definition:
      "Respirasi sel ialah proses pengoksidaan dan penguraian glukosa di dalam sel hidup untuk membebaskan tenaga bagi proses hidup. Proses ini memerlukan glukosa dan oksigen serta menghasilkan karbon dioksida, air dan tenaga.",
    wordEquation: equation("bm", "respiration"),
  },
  photosynthesis: {
    definition:
      "Tumbuhan hijau mensintesis glukosa melalui fotosintesis dan menyimpan sebahagiannya dalam bentuk kanji. Kehadiran kanji dalam daun menunjukkan fotosintesis telah berlaku.",
    requirements: chapter2Processes.photosynthesis.requirements.map((item) => localize(item, "bm")),
    wordEquation: equation("bm", "photosynthesis"),
    starchTestNote:
      "Larutan iodin berubah daripada perang kepada biru tua apabila kanji hadir. Keputusan ini menunjukkan fotosintesis telah berlaku pada bahagian daun yang diuji.",
  },
  comparisonTable: [
    { characteristic: "Lokasi", respiration: "Mitokondria", photosynthesis: "Kloroplas" },
    {
      characteristic: "Tenaga",
      respiration: "Membebaskan tenaga",
      photosynthesis: "Menyerap tenaga cahaya",
    },
    {
      characteristic: "Bahan tindak balas",
      respiration: "Glukosa dan oksigen",
      photosynthesis: "Karbon dioksida dan air",
    },
    {
      characteristic: "Hasil",
      respiration: "Karbon dioksida, air dan tenaga",
      photosynthesis: "Glukosa dan oksigen",
    },
    {
      characteristic: "Berlaku pada",
      respiration: "Manusia, haiwan, tumbuhan dan mikroorganisma",
      photosynthesis: "Tumbuhan dan mikroorganisma",
    },
    {
      characteristic: "Masa",
      respiration: "Sentiasa berlaku",
      photosynthesis: "Berlaku ketika ada cahaya",
    },
  ],
  complementaryRelationship:
    "Respirasi sel dan fotosintesis saling melengkapi. Karbon dioksida dan air yang dihasilkan semasa respirasi digunakan dalam fotosintesis, manakala glukosa dan oksigen yang dihasilkan semasa fotosintesis digunakan dalam respirasi.",
  keyExamFacts: [
    "Sel menjalankan fungsi hidup dan membahagi untuk membentuk sel baharu serta menggantikan sel rosak.",
    "Pembahagian sel tanpa kawalan boleh membentuk kanser.",
    "Sel tumbuhan dan sel haiwan mempunyai membran sel, sitoplasma, nukleus dan mitokondria.",
    "Sel tumbuhan turut mempunyai dinding sel, kloroplas dan vakuol.",
    "Organisma unisel mempunyai satu sel; organisma multisel mempunyai lebih daripada satu sel.",
    "Organisasi dalam haiwan dan tumbuhan mengikut urutan: sel → tisu → organ → sistem → organisma.",
    "Respirasi sel membebaskan tenaga; fotosintesis menyerap tenaga cahaya.",
    "Fotosintesis memerlukan tenaga cahaya, karbon dioksida, air dan klorofil.",
    "Larutan iodin berubah daripada perang kepada biru tua apabila kanji hadir.",
    "Respirasi dan fotosintesis membekalkan bahan antara satu sama lain.",
  ],
  keyTerms: [
    "Sel",
    "Pembahagian sel",
    "Kanser",
    "Nukleus",
    "Sitoplasma",
    "Membran sel",
    "Mitokondria",
    "Dinding sel",
    "Kloroplas",
    "Vakuol",
    "Organisma unisel",
    "Organisma multisel",
    "Sel khusus",
    "Tisu",
    "Organ",
    "Sistem",
    "Organisma",
    "Respirasi sel",
    "Fotosintesis",
    "Klorofil",
    "Kanji",
  ],
  chapterSummary:
    "Bab 2 menerangkan sel sebagai unit asas hidupan, pembahagian sel, struktur sel haiwan dan tumbuhan, organisma unisel dan multisel, sel khusus, organisasi dalam haiwan dan tumbuhan, serta proses respirasi sel dan fotosintesis yang saling melengkapi.",
};

export const chapter2Content = { en, bm };
export default chapter2Content;
