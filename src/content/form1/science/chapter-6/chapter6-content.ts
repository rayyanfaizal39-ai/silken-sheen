// chapter6-content.ts
// Source-verified content for Chapter 6 / Bab 6 — Periodic Table / Jadual Berkala
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 162-190)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 162-190, official KSSM counterpart)
// Content data only — no presentation markup.

export interface SubatomicParticle {
  name: string;
  charge: string;
  location: string;
}

export interface ElementExample {
  symbol: string;
  name: string;
  category: 'metal' | 'nonmetal' | 'inert';
}

export interface PropertyComparisonRow {
  property: string;
  metal: string;
  nonMetal: string;
}

export interface SeparationMethod {
  name: string;
  usedFor: string;
  example: string;
}

export interface CompoundFormation {
  reactants: string;
  product: string;
}

export interface ChangeComparisonRow {
  characteristic: string;
  physicalChange: string;
  chemicalChange: string;
}

export interface MixtureCompoundRow {
  characteristic: string;
  mixture: string;
  compound: string;
}

export interface Chapter6Content {
  hook: { title: string; body: string };
  atomsAndMolecules: {
    definition: string;
    subatomicParticles: SubatomicParticle[];
    neutralityNote: string;
    moleculeDefinition: string;
  };
  elementsAndCompounds: {
    elementDefinition: string;
    elementExamples: string[];
    compoundDefinition: string;
    compoundExamples: string[];
    separationNote: string;
  };
  periodicTable: {
    history: string;
    totalDiscovered: string;
    exampleElements: ElementExample[];
    namingNote: string;
  };
  metalsVsNonMetals: {
    comparison: PropertyComparisonRow[];
    semiMetalNote: string;
  };
  mixtures: {
    definition: string;
    examples: string[];
    separationMethods: SeparationMethod[];
    selectionFactors: string[];
  };
  compounds: {
    definition: string;
    formations: CompoundFormation[];
    alkaliMetalNote: string;
    massConservationNote: string;
    electrolysisDefinition: string;
  };
  physicalVsChemicalChange: {
    comparison: ChangeComparisonRow[];
    physicalExamples: string[];
    chemicalExamples: string[];
  };
  mixturesVsCompounds: MixtureCompoundRow[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Chapter6Content = {
  hook: {
    title: "Why this matters",
    body: "Every material you can name — salt, water, the metal in your phone — is built from around 118 known elements arranged in one elegant table. Once you understand how atoms combine and how mixtures differ from compounds, you can explain almost everything in your kitchen, your bag, and your body."
  },
  atomsAndMolecules: {
    definition: "All matter consists of small, discrete particles called atoms. An atom cannot be seen with the naked eye — it can only be seen using an electron microscope at millions of times magnification.",
    subatomicParticles: [
      { name: "Proton", charge: "Positive", location: "Inside the nucleus" },
      { name: "Neutron", charge: "Neutral (no charge)", location: "Inside the nucleus" },
      { name: "Electron", charge: "Negative", location: "Circles around the nucleus" }
    ],
    neutralityNote: "The nucleus has an overall positive charge from its protons. The number of electrons equals the number of protons, making the atom neutral overall.",
    moleculeDefinition: "Molecules are neutral particles made up of two or more atoms — e.g. an oxygen molecule (O₂) is made of two oxygen atoms."
  },
  elementsAndCompounds: {
    elementDefinition: "An element is the simplest form of substance — it cannot be divided into two or more simpler substances, and contains only one type of atom.",
    elementExamples: ["Iron", "Oxygen", "Hydrogen", "Aluminium", "Carbon", "Copper"],
    compoundDefinition: "A compound consists of two or more elements combined chemically, produced through a chemical reaction. It can be made in the laboratory or occur naturally.",
    compoundExamples: ["Aluminium oxide", "Zinc sulphide", "Iron chloride", "Sugar", "Water", "Salt"],
    separationNote: "The elements in a compound cannot be separated physically — only chemically, e.g. using electrical energy (electrolysis)."
  },
  periodicTable: {
    history: "During the 18th and 19th centuries, scientists discovered many elements and arranged them into the Periodic Table in an orderly, systematic manner — still used today.",
    totalDiscovered: "As of 2016, 118 elements have been discovered.",
    exampleElements: [
      { symbol: "H", name: "Hydrogen", category: "nonmetal" },
      { symbol: "He", name: "Helium", category: "inert" },
      { symbol: "Na", name: "Sodium", category: "metal" },
      { symbol: "O", name: "Oxygen", category: "nonmetal" },
      { symbol: "Fe", name: "Iron", category: "metal" },
      { symbol: "Cl", name: "Chlorine", category: "nonmetal" },
      { symbol: "Ar", name: "Argon", category: "inert" },
      { symbol: "Cu", name: "Copper", category: "metal" }
    ],
    namingNote: "New element names must be approved by the International Union of Pure and Applied Chemistry (IUPAC), typically named after the discoverer, place of discovery, or a well-known scientist (e.g. Rutherfordium after Ernest Rutherford, Seaborgium after Glenn Seaborg)."
  },
  metalsVsNonMetals: {
    comparison: [
      { property: "Appearance", metal: "Shiny", nonMetal: "Dull" },
      { property: "Ductility", metal: "Ductile", nonMetal: "Brittle" },
      { property: "Malleability", metal: "Malleable", nonMetal: "Non-malleable" },
      { property: "Tensile strength", metal: "High", nonMetal: "Low (breaks easily)" },
      { property: "Electrical conductivity", metal: "Good", nonMetal: "Poor (except carbon)" },
      { property: "Heat conductivity", metal: "Good", nonMetal: "Poor" },
      { property: "Density", metal: "High", nonMetal: "Low" },
      { property: "Melting/boiling point", metal: "High", nonMetal: "Low" }
    ],
    semiMetalNote: "Some elements, like germanium and silicon, cannot be classified as purely metal or non-metal — these are semi-metals, possessing characteristics of both."
  },
  mixtures: {
    definition: "A mixture consists of two or more elements or compounds mixed physically, and can be separated back into its components by physical methods.",
    examples: ["Cocktail (solid and liquid)", "Air batu campur (solid and liquid)", "Salad", "Sandwich"],
    separationMethods: [
      { name: "Filtration", usedFor: "Separating an insoluble solid from a liquid mixture", example: "Filter paper separates coffee powder from coffee" },
      { name: "Distillation", usedFor: "Separating a miscible liquid-liquid mixture with different boiling points", example: "Separating water and alcohol; producing perfume from rose petals" },
      { name: "Separation using magnet", usedFor: "Separating a magnetic solid from a non-magnetic solid", example: "Iron nails separated from sand" },
      { name: "Sedimentation", usedFor: "Separating an insoluble solid from a liquid, using density differences", example: "Sand settling at the bottom of water" },
      { name: "Floatation", usedFor: "Separating substances of different densities in water", example: "Oil floating on water, separated using a separating funnel" },
      { name: "Chromatography", usedFor: "Separating small amounts of a mixture, especially by colour", example: "Detecting harmful food colouring; checking document fraud by separating ink colours" }
    ],
    selectionFactors: ["Physical properties of the substances present in the mixture", "The substance(s) to be obtained from the mixture"]
  },
  compounds: {
    definition: "A compound consists of two or more elements mixed chemically, forming a newly formed product with its own characteristics, different from the original substances.",
    formations: [
      { reactants: "Magnesium + Oxygen", product: "Magnesium oxide" },
      { reactants: "Aluminium + Oxygen", product: "Aluminium oxide" },
      { reactants: "Zinc + Oxygen", product: "Zinc oxide" },
      { reactants: "Iron + Oxygen", product: "Iron oxide" },
      { reactants: "Copper + Oxygen", product: "Copper oxide" },
      { reactants: "Iron + Sulphur (heated)", product: "Iron sulphide" }
    ],
    alkaliMetalNote: "Alkali metals (lithium, sodium, potassium) react with water to form alkali compounds and release hydrogen gas — e.g. sodium + water → sodium hydroxide + hydrogen gas.",
    massConservationNote: "When a metal and non-metal combine to form a compound, the total mass before and after the reaction remains the same — mass is conserved.",
    electrolysisDefinition: "Electrolysis is the chemical decomposition of a compound into its elements by passing an electric current through the compound — e.g. water decomposes into hydrogen (at the cathode) and oxygen (at the anode)."
  },
  physicalVsChemicalChange: {
    comparison: [
      { characteristic: "New substance formed?", physicalChange: "No", chemicalChange: "Yes" },
      { characteristic: "Properties of substance", physicalChange: "Remain the same", chemicalChange: "Not the same as original" },
      { characteristic: "Chemical composition", physicalChange: "Remains the same", chemicalChange: "Different composition" },
      { characteristic: "Energy required", physicalChange: "Needs less energy", chemicalChange: "Needs more energy" }
    ],
    physicalExamples: ["Ice melting", "Water freezing", "Water boiling"],
    chemicalExamples: ["Rusting of iron", "Photosynthesis", "Decaying of leaf", "Cell respiration"]
  },
  mixturesVsCompounds: [
    { characteristic: "Formation of new substance", mixture: "No", compound: "Yes" },
    { characteristic: "Chemical bond", mixture: "No", compound: "Yes" },
    { characteristic: "Separation method", mixture: "Physical", compound: "Chemical" },
    { characteristic: "Properties vs original substances", mixture: "Same", compound: "Different" }
  ],
  keyExamFacts: [
    "All matter consists of atoms; atoms contain protons, neutrons, and electrons",
    "An atom is neutral because the number of electrons equals the number of protons",
    "An element contains only one type of atom and cannot be broken into simpler substances",
    "A compound forms from two or more elements combined chemically, and can only be separated chemically",
    "The Periodic Table classifies elements as metals, non-metals, semi-metals, and inert gases",
    "Metals are shiny, ductile, malleable, and good conductors; non-metals are generally the opposite",
    "A mixture is formed and separated physically; separation methods include filtration, distillation, magnetic separation, sedimentation, floatation, and chromatography",
    "Mass is conserved when elements combine to form a compound",
    "Physical changes don't form a new substance; chemical changes do"
  ],
  keyTerms: [
    "Atom", "Molecule", "Proton", "Neutron", "Electron", "Element", "Compound",
    "Periodic Table", "Metal", "Non-metal", "Semi-metal", "Inert gas", "Mixture",
    "Filtration", "Distillation", "Sedimentation", "Floatation", "Chromatography",
    "Electrolysis", "Physical change", "Chemical change"
  ],
  chapterSummary: "Chapter 6 explains that all matter is made of atoms, which combine to form elements and compounds. It covers the structure of the Periodic Table and the differences between metals, non-metals, and semi-metals, how mixtures are formed and separated through six physical methods, how compounds form through chemical reactions with mass conservation, and the key differences between physical and chemical changes, and between mixtures and compounds."
};

const bm: Chapter6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bahan yang boleh anda namakan — garam, air, logam dalam telefon anda — dibina daripada kira-kira 118 unsur yang diketahui, disusun dalam satu jadual yang elegan. Apabila anda memahami bagaimana atom bergabung dan bagaimana campuran berbeza daripada sebatian, anda boleh menerangkan hampir semua yang ada di dapur, beg, dan badan anda."
  },
  atomsAndMolecules: {
    definition: "Semua jirim terdiri daripada zarah kecil dan diskret yang dipanggil atom. Atom tidak dapat dilihat dengan mata kasar — ia hanya boleh dilihat menggunakan mikroskop elektron pada pembesaran berjuta kali.",
    subatomicParticles: [
      { name: "Proton", charge: "Positif", location: "Di dalam nukleus" },
      { name: "Neutron", charge: "Neutral (tiada cas)", location: "Di dalam nukleus" },
      { name: "Elektron", charge: "Negatif", location: "Mengelilingi nukleus" }
    ],
    neutralityNote: "Nukleus mempunyai cas positif keseluruhan daripada proton. Bilangan elektron sama dengan bilangan proton, menjadikan atom neutral secara keseluruhan.",
    moleculeDefinition: "Molekul ialah zarah neutral yang terdiri daripada dua atau lebih atom — cth: molekul oksigen (O₂) terdiri daripada dua atom oksigen."
  },
  elementsAndCompounds: {
    elementDefinition: "Unsur ialah bahan yang paling ringkas — tidak boleh dipecahkan kepada dua atau lebih bahan yang lebih ringkas, dan mengandungi hanya satu jenis atom.",
    elementExamples: ["Besi", "Oksigen", "Hidrogen", "Aluminium", "Karbon", "Kuprum"],
    compoundDefinition: "Sebatian terdiri daripada dua atau lebih unsur yang bergabung secara kimia, terhasil daripada tindak balas kimia. Ia boleh dihasilkan di makmal atau berlaku secara semula jadi.",
    compoundExamples: ["Aluminium oksida", "Zink sulfida", "Ferum klorida", "Gula", "Air", "Garam"],
    separationNote: "Unsur-unsur dalam sebatian tidak boleh dipisahkan secara fizikal — hanya secara kimia, cth menggunakan tenaga elektrik (elektrolisis)."
  },
  periodicTable: {
    history: "Sepanjang abad ke-18 dan ke-19, saintis menemui banyak unsur dan menyusunnya dalam Jadual Berkala secara teratur dan sistematik — masih digunakan sehingga kini.",
    totalDiscovered: "Sehingga 2016, 118 unsur telah ditemui.",
    exampleElements: [
      { symbol: "H", name: "Hidrogen", category: "nonmetal" },
      { symbol: "He", name: "Helium", category: "inert" },
      { symbol: "Na", name: "Natrium", category: "metal" },
      { symbol: "O", name: "Oksigen", category: "nonmetal" },
      { symbol: "Fe", name: "Ferum", category: "metal" },
      { symbol: "Cl", name: "Klorin", category: "nonmetal" },
      { symbol: "Ar", name: "Argon", category: "inert" },
      { symbol: "Cu", name: "Kuprum", category: "metal" }
    ],
    namingNote: "Nama unsur baharu perlu diluluskan oleh International Union of Pure and Applied Chemistry (IUPAC), biasanya dinamakan sempena penemunya, tempat penemuan, atau saintis terkenal (cth: Rutherfordium sempena Ernest Rutherford, Seaborgium sempena Glenn Seaborg)."
  },
  metalsVsNonMetals: {
    comparison: [
      { property: "Penampilan", metal: "Berkilat", nonMetal: "Kusam" },
      { property: "Kemuluran", metal: "Mulur", nonMetal: "Rapuh" },
      { property: "Kebolehtempaan", metal: "Boleh ditempa", nonMetal: "Tidak boleh ditempa" },
      { property: "Kekuatan tegangan", metal: "Tinggi", nonMetal: "Rendah (mudah patah)" },
      { property: "Kekonduksian elektrik", metal: "Baik", nonMetal: "Lemah (kecuali karbon)" },
      { property: "Kekonduksian haba", metal: "Baik", nonMetal: "Lemah" },
      { property: "Ketumpatan", metal: "Tinggi", nonMetal: "Rendah" },
      { property: "Takat lebur/didih", metal: "Tinggi", nonMetal: "Rendah" }
    ],
    semiMetalNote: "Sesetengah unsur, seperti germanium dan silikon, tidak dapat dikelaskan sepenuhnya sebagai logam atau bukan logam — ini adalah semilogam, memiliki ciri-ciri kedua-duanya."
  },
  mixtures: {
    definition: "Campuran terdiri daripada dua atau lebih unsur atau sebatian yang bercampur secara fizikal, dan boleh dipisahkan semula kepada komponennya melalui kaedah fizikal.",
    examples: ["Koktel (pepejal dan cecair)", "Air batu campur (pepejal dan cecair)", "Salad", "Sandwic"],
    separationMethods: [
      { name: "Penurasan", usedFor: "Memisahkan pepejal tak terlarut daripada campuran cecair", example: "Kertas turas memisahkan serbuk kopi daripada air kopi" },
      { name: "Penyulingan", usedFor: "Memisahkan campuran cecair-cecair yang boleh bercampur dengan takat didih berbeza", example: "Memisahkan air dan alkohol; menghasilkan minyak wangi daripada kelopak bunga ros" },
      { name: "Pemisahan menggunakan magnet", usedFor: "Memisahkan pepejal bermagnet daripada pepejal tidak bermagnet", example: "Paku besi dipisahkan daripada pasir" },
      { name: "Pengenapan", usedFor: "Memisahkan pepejal tak terlarut daripada cecair, menggunakan perbezaan ketumpatan", example: "Pasir mendap di dasar air" },
      { name: "Pengapungan", usedFor: "Memisahkan bahan berlainan ketumpatan dalam air", example: "Minyak terapung di atas air, dipisahkan menggunakan corong pemisah" },
      { name: "Kromatografi", usedFor: "Memisahkan sedikit campuran, terutamanya mengikut warna", example: "Mengesan pewarna makanan berbahaya; menyemak penipuan dokumen dengan memisahkan warna dakwat" }
    ],
    selectionFactors: ["Sifat fizikal bahan yang terdapat dalam campuran", "Bahan yang ingin diperoleh daripada campuran"]
  },
  compounds: {
    definition: "Sebatian terdiri daripada dua atau lebih unsur yang bercampur secara kimia, membentuk produk baharu dengan ciri tersendiri, berbeza daripada bahan asal.",
    formations: [
      { reactants: "Magnesium + Oksigen", product: "Magnesium oksida" },
      { reactants: "Aluminium + Oksigen", product: "Aluminium oksida" },
      { reactants: "Zink + Oksigen", product: "Zink oksida" },
      { reactants: "Ferum + Oksigen", product: "Ferum oksida" },
      { reactants: "Kuprum + Oksigen", product: "Kuprum oksida" },
      { reactants: "Ferum + Sulfur (dipanaskan)", product: "Ferum sulfida" }
    ],
    alkaliMetalNote: "Logam alkali (litium, natrium, kalium) bertindak balas dengan air membentuk sebatian alkali dan membebaskan gas hidrogen — cth: natrium + air → natrium hidroksida + gas hidrogen.",
    massConservationNote: "Apabila logam dan bukan logam bergabung membentuk sebatian, jumlah jisim sebelum dan selepas tindak balas kekal sama — jisim dikekalkan.",
    electrolysisDefinition: "Elektrolisis ialah penguraian kimia sesuatu sebatian kepada unsurnya dengan melalukan arus elektrik melalui sebatian tersebut — cth: air terurai kepada hidrogen (di katod) dan oksigen (di anod)."
  },
  physicalVsChemicalChange: {
    comparison: [
      { characteristic: "Bahan baharu terbentuk?", physicalChange: "Tidak", chemicalChange: "Ya" },
      { characteristic: "Sifat bahan", physicalChange: "Kekal sama", chemicalChange: "Tidak sama dengan asal" },
      { characteristic: "Komposisi kimia", physicalChange: "Kekal sama", chemicalChange: "Komposisi berbeza" },
      { characteristic: "Tenaga diperlukan", physicalChange: "Memerlukan kurang tenaga", chemicalChange: "Memerlukan lebih tenaga" }
    ],
    physicalExamples: ["Ais melebur", "Air membeku", "Air mendidih"],
    chemicalExamples: ["Pengaratan besi", "Fotosintesis", "Pereputan daun", "Respirasi sel"]
  },
  mixturesVsCompounds: [
    { characteristic: "Pembentukan bahan baharu", mixture: "Tidak", compound: "Ya" },
    { characteristic: "Ikatan kimia", mixture: "Tidak", compound: "Ya" },
    { characteristic: "Kaedah pemisahan", mixture: "Fizikal", compound: "Kimia" },
    { characteristic: "Sifat berbanding bahan asal", mixture: "Sama", compound: "Berbeza" }
  ],
  keyExamFacts: [
    "Semua jirim terdiri daripada atom; atom mengandungi proton, neutron dan elektron",
    "Atom bersifat neutral kerana bilangan elektron sama dengan bilangan proton",
    "Unsur mengandungi hanya satu jenis atom dan tidak boleh dipecahkan kepada bahan lebih ringkas",
    "Sebatian terbentuk daripada dua atau lebih unsur yang bergabung secara kimia, dan hanya boleh dipisahkan secara kimia",
    "Jadual Berkala mengelaskan unsur sebagai logam, bukan logam, semilogam, dan gas nadir",
    "Logam berkilat, mulur, boleh ditempa, dan konduktor yang baik; bukan logam secara umumnya sebaliknya",
    "Campuran terbentuk dan dipisahkan secara fizikal; kaedah pemisahan termasuk penurasan, penyulingan, pemisahan magnet, pengenapan, pengapungan, dan kromatografi",
    "Jisim dikekalkan apabila unsur bergabung membentuk sebatian",
    "Perubahan fizikal tidak membentuk bahan baharu; perubahan kimia membentuknya"
  ],
  keyTerms: [
    "Atom", "Molekul", "Proton", "Neutron", "Elektron", "Unsur", "Sebatian",
    "Jadual Berkala", "Logam", "Bukan logam", "Semilogam", "Gas nadir", "Campuran",
    "Penurasan", "Penyulingan", "Pengenapan", "Pengapungan", "Kromatografi",
    "Elektrolisis", "Perubahan fizikal", "Perubahan kimia"
  ],
  chapterSummary: "Bab 6 menerangkan bahawa semua jirim diperbuat daripada atom, yang bergabung membentuk unsur dan sebatian. Ia merangkumi struktur Jadual Berkala dan perbezaan antara logam, bukan logam, dan semilogam, bagaimana campuran terbentuk dan dipisahkan melalui enam kaedah fizikal, bagaimana sebatian terbentuk melalui tindak balas kimia dengan pengekalan jisim, serta perbezaan utama antara perubahan fizikal dan kimia, dan antara campuran dan sebatian."
};

export const chapter6Content = { en, bm };
export default chapter6Content;
