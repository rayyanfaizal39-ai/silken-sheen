// chapter2-content.ts
// Source-verified content for Chapter 2 / Bab 2 — Cell as the Basic Unit of Life / Sel Sebagai Unit Asas Hidupan
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 44-67)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 44-67, official KSSM counterpart)
// Content data only — no presentation markup.

export interface CellStructure {
  name: string;
  function: string;
  inAnimal: boolean;
  inPlant: boolean;
}

export interface CellTypeCard {
  name: string;
  description: string;
}

export interface OrganismExample {
  icon: string;
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
  };
  cellStructures: CellStructure[];
  animalVsPlant: {
    animalOnly: string[];
    plantOnly: string[];
    shared: string[];
  };
  unicellularMulticellular: {
    unicellular: OrganismExample[];
    multicellular: OrganismExample[];
  };
  animalCellTypes: CellTypeCard[];
  plantCellTypes: CellTypeCard[];
  organisationHierarchy: OrganisationLevel[];
  bodySystems: BodySystem[];
  respiration: {
    definition: string;
    wordEquation: string;
  };
  photosynthesis: {
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

const en: Chapter2Content = {
  hook: {
    title: "Why this matters",
    body: "You're made of roughly 37 trillion cells, each one a microscopic factory running thousands of chemical reactions right now. Understanding how a single cell works is the first step to understanding how your entire body — and every living thing — actually functions."
  },
  cellBasics: {
    definition: "A cell is the basic structural and functional unit of living things. Living things are composed of cells that carry out life's functions and undergo cell division.",
    discoveryHistory: "In 1665, English scientist Robert Hooke invented a simple microscope to observe cork, seeing small box-shaped structures he named 'cells'. In 1674, Antonie van Leeuwenhoek invented a more powerful microscope and observed moving microorganisms in rainwater.",
    lifeFunctions: ["Growth", "Respiration", "Reproduction", "Excretion"]
  },
  cellStructures: [
    { name: "Nucleus", function: "Controls all activities in the cell. Contains chromosomes made of DNA carrying genetic information.", inAnimal: true, inPlant: true },
    { name: "Cell membrane", function: "Controls the flow of materials in and out of the cell.", inAnimal: true, inPlant: true },
    { name: "Cytoplasm", function: "Acts as a medium where chemical reactions occur.", inAnimal: true, inPlant: true },
    { name: "Mitochondria", function: "Produces energy for reactions.", inAnimal: true, inPlant: true },
    { name: "Cell wall", function: "Provides support, protection and fixed shape to the cell.", inAnimal: false, inPlant: true },
    { name: "Chloroplast", function: "Absorbs light energy for photosynthesis.", inAnimal: false, inPlant: true },
    { name: "Vacuole", function: "Provides support to cells when filled with cell sap.", inAnimal: false, inPlant: true }
  ],
  animalVsPlant: {
    animalOnly: ["No cell wall", "No chloroplast", "No vacuole (or only small ones with different contents)", "No fixed shape"],
    plantOnly: ["Has cell wall", "Has chloroplast", "Has vacuole", "Has fixed shape"],
    shared: ["Nucleus", "Cell membrane", "Cytoplasm", "Mitochondria"]
  },
  unicellularMulticellular: {
    unicellular: [
      { icon: "🦠", name: "Amoeba", note: "Lives in watery areas" },
      { icon: "🦠", name: "Paramecium", note: "Lives in watery areas" },
      { icon: "🦠", name: "Euglena", note: "Has characteristics of both plants and animals — makes its own food like plants and moves like animals" },
      { icon: "🦠", name: "Chlamydomonas", note: "Unicellular organism in the plant kingdom" }
    ],
    multicellular: [
      { icon: "🧫", name: "Mucor", note: "A mould/fungus" },
      { icon: "🌿", name: "Spirogyra", note: "A type of algae" },
      { icon: "🐙", name: "Hydra", note: "A small freshwater organism" }
    ]
  },
  animalCellTypes: [
    { name: "Nerve cells", description: "Contain long fibres that carry information in the form of impulses to all parts of the body" },
    { name: "Epithelial cells", description: "Form a layer that protects organs in the body and secrete mucus" },
    { name: "Muscle cells", description: "Contract and relax to enable movement" },
    { name: "Red blood cells", description: "No nucleus; biconcave disc shaped to increase surface area; contain haemoglobin to transport oxygen; also transport carbon dioxide to the lungs" },
    { name: "White blood cells", description: "Change their form to surround and destroy foreign particles" },
    { name: "Reproductive cells", description: "Sperm carries male genetic material; ovum carries female genetic material" }
  ],
  plantCellTypes: [
    { name: "Epidermal cells", description: "Reduce water loss, allow gaseous exchange and absorption of water and nutrients" },
    { name: "Palisade cells", description: "Contain chlorophyll to absorb sunlight for photosynthesis" },
    { name: "Guard cells", description: "Control the opening and closing of the stoma — usually open during the day for photosynthesis, closed at night or on hot days to reduce water loss" },
    { name: "Root hair cells", description: "Increase surface area to absorb more water and nutrients from the soil" }
  ],
  organisationHierarchy: [
    { level: "Cell", description: "Most cells inside an organism have specific functions (e.g. epithelial cell)" },
    { level: "Tissue", description: "Cells with the same function combine to form a tissue (e.g. epithelial tissue)" },
    { level: "Organ", description: "Different tissues working together to perform a specific function form an organ (e.g. stomach)" },
    { level: "System", description: "A few organs with related functions working together form a system (e.g. digestive system)" },
    { level: "Organism", description: "All systems work together to support the organism" }
  ],
  bodySystems: [
    { name: "Excretory system", organs: "Skin, lung, kidney", function: "Removes excretory waste from the body" },
    { name: "Skeletal system", organs: "Skull, bone", function: "Supports the body and protects inner organs such as the lung and heart" },
    { name: "Lymphatic system", organs: "Lymph", function: "Drains lymphatic fluid into blood vessels to protect the body from infections" },
    { name: "Digestive system", organs: "Mouth, oesophagus, stomach, small intestine, large intestine", function: "Breaks down complex food into simpler form for easier absorption" },
    { name: "Muscular system", organs: "Muscle", function: "Helps in the movement of the body and inner organs" },
    { name: "Integumentary system", organs: "Skin", function: "Protects the body from dehydration and regulates body temperature" },
    { name: "Nervous system", organs: "Brain, spinal cord, nerve", function: "Carries information from the brain to the entire body as impulses" },
    { name: "Blood circulatory system", organs: "Heart, blood vessel", function: "Carries oxygen, nutrients and hormones to all parts of the body" },
    { name: "Respiratory system", organs: "Nose, lung", function: "Absorbs oxygen and releases carbon dioxide from the body" },
    { name: "Endocrine system", organs: "Pituitary, thyroid, adrenal, pancreas, ovary, testis", function: "Produces hormones required to coordinate reactions in the body" },
    { name: "Reproductive system", organs: "Ovary, testis, penis", function: "Produces sperm and ovum to produce offspring" }
  ],
  respiration: {
    definition: "Cell respiration is the process of breaking down food to release energy used for all life processes. External respiration (breathing) is the exchange of gases between the organism and environment; internal respiration (cell respiration) is the oxidation and breakdown of glucose inside living cells.",
    wordEquation: "Glucose + Oxygen → Carbon dioxide + Water + Energy"
  },
  photosynthesis: {
    requirements: ["Light energy", "Carbon dioxide", "Water", "Chlorophyll"],
    wordEquation: "Carbon dioxide + Water --(Light energy, Chlorophyll)--> Glucose + Oxygen",
    starchTestNote: "Iodine solution changes from brown to dark blue if starch is present — this confirms photosynthesis has occurred, since plants store food as starch."
  },
  comparisonTable: [
    { characteristic: "Location", respiration: "Occurs in mitochondria", photosynthesis: "Occurs in chloroplast" },
    { characteristic: "Purpose", respiration: "Releases energy", photosynthesis: "Absorbs energy" },
    { characteristic: "Energy source", respiration: "Uses chemical energy in food", photosynthesis: "Uses energy from light" },
    { characteristic: "Occurs in", respiration: "Humans, animals, plants and microorganisms", photosynthesis: "Plants and microorganisms only" },
    { characteristic: "Glucose", respiration: "Breaks down glucose to produce energy", photosynthesis: "Synthesises glucose" },
    { characteristic: "Inputs/outputs", respiration: "Uses glucose and oxygen to produce CO₂, water and energy", photosynthesis: "Uses CO₂ and water to produce oxygen and glucose" },
    { characteristic: "Timing", respiration: "Occurs at all times", photosynthesis: "Occurs only in the presence of light" }
  ],
  complementaryRelationship: "Cell respiration and photosynthesis complement each other: respiration absorbs oxygen and releases CO₂, which plants then use for photosynthesis; photosynthesis produces the oxygen that all organisms need for respiration.",
  keyExamFacts: [
    "A cell is the basic structural and functional unit of living things",
    "Plant cells have a cell wall, chloroplast and vacuole; animal cells do not",
    "Unicellular organisms consist of one cell; multicellular organisms consist of many",
    "Cell organisation order: Cell → Tissue → Organ → System → Organism",
    "Cell respiration occurs in mitochondria and releases energy; photosynthesis occurs in chloroplast and absorbs energy",
    "Photosynthesis needs light energy, carbon dioxide, water and chlorophyll",
    "The word equation for respiration: Glucose + Oxygen → Carbon dioxide + Water + Energy",
    "Respiration and photosynthesis complement each other through the exchange of oxygen and carbon dioxide"
  ],
  keyTerms: [
    "Cell", "Nucleus", "Cytoplasm", "Cell membrane", "Mitochondria", "Cell wall",
    "Chloroplast", "Vacuole", "Unicellular organism", "Multicellular organism",
    "Tissue", "Organ", "System", "Organism", "Cell respiration", "Photosynthesis",
    "Chlorophyll", "Starch"
  ],
  chapterSummary: "Chapter 2 explains that cells are the basic unit of life, covering the structures and functions inside animal and plant cells, the differences between unicellular and multicellular organisms, the specialised cell types in the human body and plants, the hierarchy from cell to organism, the systems in the human body, and how cell respiration and photosynthesis work together to sustain life."
};

const bm: Chapter2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Badan anda terdiri daripada kira-kira 37 trilion sel, setiap satu ialah kilang mikroskopik yang menjalankan beribu-ribu tindak balas kimia pada saat ini. Memahami cara satu sel berfungsi adalah langkah pertama untuk memahami bagaimana seluruh badan anda — dan setiap benda hidup — benar-benar berfungsi."
  },
  cellBasics: {
    definition: "Sel ialah unit struktur dan fungsi asas benda hidup. Benda hidup terdiri daripada sel yang menjalankan fungsi kehidupan dan mengalami pembahagian sel.",
    discoveryHistory: "Pada tahun 1665, saintis Inggeris Robert Hooke mencipta mikroskop mudah untuk memerhati gabus, dan melihat struktur berbentuk kotak kecil yang dinamakannya 'sel'. Pada tahun 1674, Antonie van Leeuwenhoek mencipta mikroskop yang lebih berkuasa dan memerhati mikroorganisma bergerak dalam air hujan.",
    lifeFunctions: ["Pertumbuhan", "Respirasi", "Pembiakan", "Perkumuhan"]
  },
  cellStructures: [
    { name: "Nukleus", function: "Mengawal semua aktiviti dalam sel. Mengandungi kromosom yang diperbuat daripada DNA yang membawa maklumat genetik.", inAnimal: true, inPlant: true },
    { name: "Membran sel", function: "Mengawal pergerakan bahan masuk dan keluar sel.", inAnimal: true, inPlant: true },
    { name: "Sitoplasma", function: "Bertindak sebagai medium tempat tindak balas kimia berlaku.", inAnimal: true, inPlant: true },
    { name: "Mitokondria", function: "Menghasilkan tenaga untuk tindak balas.", inAnimal: true, inPlant: true },
    { name: "Dinding sel", function: "Memberi sokongan, perlindungan dan bentuk tetap kepada sel.", inAnimal: false, inPlant: true },
    { name: "Kloroplas", function: "Menyerap tenaga cahaya untuk fotosintesis.", inAnimal: false, inPlant: true },
    { name: "Vakuol", function: "Memberi sokongan kepada sel apabila dipenuhi getah sel.", inAnimal: false, inPlant: true }
  ],
  animalVsPlant: {
    animalOnly: ["Tiada dinding sel", "Tiada kloroplas", "Tiada vakuol (atau hanya vakuol kecil dengan kandungan berbeza)", "Tiada bentuk tetap"],
    plantOnly: ["Ada dinding sel", "Ada kloroplas", "Ada vakuol", "Ada bentuk tetap"],
    shared: ["Nukleus", "Membran sel", "Sitoplasma", "Mitokondria"]
  },
  unicellularMulticellular: {
    unicellular: [
      { icon: "🦠", name: "Amoeba", note: "Hidup di kawasan berair" },
      { icon: "🦠", name: "Paramecium", note: "Hidup di kawasan berair" },
      { icon: "🦠", name: "Euglena", note: "Mempunyai ciri tumbuhan dan haiwan — membuat makanan sendiri seperti tumbuhan dan bergerak seperti haiwan" },
      { icon: "🦠", name: "Chlamydomonas", note: "Organisma bersel tunggal dalam alam tumbuhan" }
    ],
    multicellular: [
      { icon: "🧫", name: "Mucor", note: "Sejenis kulat" },
      { icon: "🌿", name: "Spirogyra", note: "Sejenis alga" },
      { icon: "🐙", name: "Hydra", note: "Organisma air tawar yang kecil" }
    ]
  },
  animalCellTypes: [
    { name: "Sel saraf", description: "Mengandungi gentian panjang yang membawa maklumat dalam bentuk impuls ke seluruh badan" },
    { name: "Sel epitelium", description: "Membentuk lapisan yang melindungi organ dalam badan dan merembes mukus" },
    { name: "Sel otot", description: "Mengecut dan mengendur untuk membolehkan pergerakan" },
    { name: "Sel darah merah", description: "Tiada nukleus; berbentuk cakera bikonkaf untuk meningkatkan luas permukaan; mengandungi hemoglobin untuk mengangkut oksigen; turut mengangkut karbon dioksida ke paru-paru" },
    { name: "Sel darah putih", description: "Menukar bentuknya untuk mengelilingi dan memusnahkan zarah asing" },
    { name: "Sel pembiakan", description: "Sperma membawa bahan genetik jantan; ovum membawa bahan genetik betina" }
  ],
  plantCellTypes: [
    { name: "Sel epidermis", description: "Mengurangkan kehilangan air, membenarkan pertukaran gas dan penyerapan air serta nutrien" },
    { name: "Sel palisad", description: "Mengandungi klorofil untuk menyerap cahaya matahari bagi fotosintesis" },
    { name: "Sel pengawal", description: "Mengawal pembukaan dan penutupan stoma — biasanya terbuka pada waktu siang untuk fotosintesis, tertutup pada waktu malam atau hari panas untuk mengurangkan kehilangan air" },
    { name: "Sel rambut akar", description: "Meningkatkan luas permukaan untuk menyerap lebih banyak air dan nutrien daripada tanah" }
  ],
  organisationHierarchy: [
    { level: "Sel", description: "Kebanyakan sel dalam organisma mempunyai fungsi tertentu (cth: sel epitelium)" },
    { level: "Tisu", description: "Sel dengan fungsi sama bergabung membentuk tisu (cth: tisu epitelium)" },
    { level: "Organ", description: "Tisu berlainan bekerjasama untuk melaksanakan fungsi tertentu membentuk organ (cth: perut)" },
    { level: "Sistem", description: "Beberapa organ dengan fungsi berkaitan bekerjasama membentuk sistem (cth: sistem pencernaan)" },
    { level: "Organisma", description: "Semua sistem bekerjasama untuk menyokong organisma" }
  ],
  bodySystems: [
    { name: "Sistem perkumuhan", organs: "Kulit, paru-paru, buah pinggang", function: "Menyingkirkan bahan buangan daripada badan" },
    { name: "Sistem rangka", organs: "Tengkorak, tulang", function: "Menyokong badan dan melindungi organ dalaman seperti paru-paru dan jantung" },
    { name: "Sistem limfatik", organs: "Limfa", function: "Mengalirkan cecair limfa ke saluran darah untuk melindungi badan daripada jangkitan" },
    { name: "Sistem pencernaan", organs: "Mulut, esofagus, perut, usus kecil, usus besar", function: "Memecahkan makanan kompleks kepada bentuk lebih ringkas untuk penyerapan yang lebih mudah" },
    { name: "Sistem otot", organs: "Otot", function: "Membantu pergerakan badan dan organ dalaman" },
    { name: "Sistem integumen", organs: "Kulit", function: "Melindungi badan daripada dehidrasi dan mengawal suhu badan" },
    { name: "Sistem saraf", organs: "Otak, saraf tunjang, saraf", function: "Membawa maklumat daripada otak ke seluruh badan dalam bentuk impuls" },
    { name: "Sistem peredaran darah", organs: "Jantung, saluran darah", function: "Membawa oksigen, nutrien dan hormon ke seluruh badan" },
    { name: "Sistem pernafasan", organs: "Hidung, paru-paru", function: "Menyerap oksigen dan membebaskan karbon dioksida daripada badan" },
    { name: "Sistem endokrin", organs: "Pituitari, tiroid, adrenal, pankreas, ovari, testis", function: "Menghasilkan hormon yang diperlukan untuk menyelaraskan tindak balas dalam badan" },
    { name: "Sistem pembiakan", organs: "Ovari, testis, penis", function: "Menghasilkan sperma dan ovum untuk menghasilkan zuriat" }
  ],
  respiration: {
    definition: "Respirasi sel ialah proses pemecahan makanan untuk membebaskan tenaga yang digunakan untuk semua proses hidup. Respirasi luaran (pernafasan) ialah pertukaran gas antara organisma dan persekitaran; respirasi dalaman (respirasi sel) ialah proses pengoksidaan dan pemecahan glukosa di dalam sel hidup.",
    wordEquation: "Glukosa + Oksigen → Karbon dioksida + Air + Tenaga"
  },
  photosynthesis: {
    requirements: ["Tenaga cahaya", "Karbon dioksida", "Air", "Klorofil"],
    wordEquation: "Karbon dioksida + Air --(Tenaga cahaya, Klorofil)--> Glukosa + Oksigen",
    starchTestNote: "Larutan kanji bertukar daripada perang kepada biru gelap jika kanji hadir — ini mengesahkan fotosintesis telah berlaku, kerana tumbuhan menyimpan makanan sebagai kanji."
  },
  comparisonTable: [
    { characteristic: "Lokasi", respiration: "Berlaku dalam mitokondria", photosynthesis: "Berlaku dalam kloroplas" },
    { characteristic: "Tujuan", respiration: "Membebaskan tenaga", photosynthesis: "Menyerap tenaga" },
    { characteristic: "Sumber tenaga", respiration: "Menggunakan tenaga kimia dalam makanan", photosynthesis: "Menggunakan tenaga daripada cahaya" },
    { characteristic: "Berlaku pada", respiration: "Manusia, haiwan, tumbuhan dan mikroorganisma", photosynthesis: "Tumbuhan dan mikroorganisma sahaja" },
    { characteristic: "Glukosa", respiration: "Memecahkan glukosa untuk menghasilkan tenaga", photosynthesis: "Mensintesis glukosa" },
    { characteristic: "Input/output", respiration: "Menggunakan glukosa dan oksigen untuk menghasilkan CO₂, air dan tenaga", photosynthesis: "Menggunakan CO₂ dan air untuk menghasilkan oksigen dan glukosa" },
    { characteristic: "Masa", respiration: "Berlaku pada setiap masa", photosynthesis: "Hanya berlaku dengan kehadiran cahaya" }
  ],
  complementaryRelationship: "Respirasi sel dan fotosintesis saling melengkapi: respirasi menyerap oksigen dan membebaskan CO₂, yang kemudian digunakan tumbuhan untuk fotosintesis; fotosintesis pula menghasilkan oksigen yang diperlukan semua organisma untuk respirasi.",
  keyExamFacts: [
    "Sel ialah unit struktur dan fungsi asas benda hidup",
    "Sel tumbuhan mempunyai dinding sel, kloroplas dan vakuol; sel haiwan tidak",
    "Organisma unisel terdiri daripada satu sel; organisma multisel terdiri daripada banyak sel",
    "Susunan organisasi sel: Sel → Tisu → Organ → Sistem → Organisma",
    "Respirasi sel berlaku dalam mitokondria dan membebaskan tenaga; fotosintesis berlaku dalam kloroplas dan menyerap tenaga",
    "Fotosintesis memerlukan tenaga cahaya, karbon dioksida, air dan klorofil",
    "Persamaan perkataan bagi respirasi: Glukosa + Oksigen → Karbon dioksida + Air + Tenaga",
    "Respirasi dan fotosintesis saling melengkapi melalui pertukaran oksigen dan karbon dioksida"
  ],
  keyTerms: [
    "Sel", "Nukleus", "Sitoplasma", "Membran sel", "Mitokondria", "Dinding sel",
    "Kloroplas", "Vakuol", "Organisma unisel", "Organisma multisel",
    "Tisu", "Organ", "Sistem", "Organisma", "Respirasi sel", "Fotosintesis",
    "Klorofil", "Kanji"
  ],
  chapterSummary: "Bab 2 menerangkan bahawa sel adalah unit asas kehidupan, merangkumi struktur dan fungsi dalam sel haiwan dan tumbuhan, perbezaan antara organisma unisel dan multisel, jenis sel khusus dalam badan manusia dan tumbuhan, hierarki daripada sel kepada organisma, sistem dalam badan manusia, serta bagaimana respirasi sel dan fotosintesis bekerjasama untuk mengekalkan kehidupan."
};

export const chapter2Content = { en, bm };
export default chapter2Content;
