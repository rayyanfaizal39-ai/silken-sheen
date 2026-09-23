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
  category: "metal" | "nonmetal" | "inert";
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

export interface ClassificationContent {
  labels: {
    atom: string;
    molecule: string;
    nucleus: string;
    choose: string;
    charge: string;
    location: string;
    neutral: string;
    protons: string;
    electrons: string;
    oxygenAtom: string;
    oxygenMolecule: string;
    element: string;
    compound: string;
    salt: string;
    sodium: string;
    chlorine: string;
    model: string;
    microscope: string;
    table: string;
    context: string;
    history: string;
    comparison: string;
    property: string;
    metal: string;
    nonmetal: string;
    semi: string;
    inert: string;
    applications: string;
    experiment: string;
    conclusion: string;
    appreciation: string;
    sandpaper: string;
    hammer: string;
    wood: string;
    ammeter: string;
    dryCell: string;
    switch: string;
    clips: string;
    candle: string;
    wax: string;
    thumbtack: string;
    stand: string;
    crucible: string;
    thermometer: string;
    tripod: string;
    triangle: string;
    burner: string;
    fume: string;
    stopwatch: string;
  };
  microscopeAnalogy: string;
  history: { scientist: string; contribution: string }[];
  arrangement: string;
  regions: { id: string; name: string; location: string }[];
  regionRows: string[];
  applications: { id: string; element: string; properties: string; uses: string }[];
  experiments: {
    id: string;
    title: string;
    materials: string;
    procedure: string;
    samples: { name: string; material: string; effect: string; outcome: string }[];
    safety?: string;
  }[];
  appreciation: string[];
}

export interface Chapter6Content {
  structure: { title: string; subtopics: [string, string, string] };
  classification: ClassificationContent;
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
  structure: {
    title: "Periodic Table",
    subtopics: ["6.1 Classification of Elements", "6.2 Mixtures", "6.3 Compounds"],
  },
  classification: {
    labels: {
      atom: "Atom",
      molecule: "Molecule",
      nucleus: "Nucleus",
      choose: "Choose a subatomic particle",
      charge: "Charge",
      location: "Location",
      neutral: "Neutral atom",
      protons: "Number of protons",
      electrons: "Number of electrons",
      oxygenAtom: "Oxygen atom",
      oxygenMolecule: "Oxygen molecule",
      element: "What is an Element?",
      compound: "What is a Compound?",
      salt: "Salt",
      sodium: "Sodium",
      chlorine: "Chlorine",
      model: "Diagram is a model and is not drawn to scale.",
      microscope: "Electron microscope",
      table: "Periodic Table",
      context: "Textbook context: as of 2016",
      history: "History of the Periodic Table",
      comparison: "Differences between Metals and Non-metals",
      property: "Property",
      metal: "Metal",
      nonmetal: "Non-metal",
      semi: "Semi-metal",
      inert: "Inert gases",
      applications: "Examples of metals and non-metals",
      experiment: "Experiment 6.2 — Metals and Non-metals",
      conclusion: "Conclusion",
      appreciation: "Appreciate the Order of Elements that Exist in Nature",
      sandpaper: "Sandpaper",
      hammer: "Hammer",
      wood: "Wooden block",
      ammeter: "Ammeter",
      dryCell: "Dry cell",
      switch: "Switch",
      clips: "Crocodile clips",
      candle: "Candle",
      wax: "Wax",
      thumbtack: "Thumbtack",
      stand: "Retort stand and clamp",
      crucible: "Crucible",
      thermometer: "Thermometer",
      tripod: "Tripod stand",
      triangle: "Pipeclay triangle",
      burner: "Bunsen burner",
      fume: "Fume chamber",
      stopwatch: "Stopwatch",
    },
    microscopeAnalogy:
      "The textbook compares an orange enlarged to the size of Earth with the magnification needed to see an atom using an electron microscope.",
    history: [
      {
        scientist: "Antoine Lavoisier",
        contribution: "Classified materials as metals and non-metals.",
      },
      {
        scientist: "Dmitri Mendeleev · 1869",
        contribution:
          "Arranged 63 known elements using cards containing properties and atomic weights. Left gaps for undiscovered elements and predicted their properties.",
      },
      {
        scientist: "1886 · Germanium",
        contribution: "The discovery of germanium supported his prediction.",
      },
    ],
    arrangement: "Elements are arranged systematically in the Periodic Table.",
    regions: [
      {
        id: "metal",
        name: "Metals",
        location: "Left and centre",
      },
      {
        id: "nonmetal",
        name: "Non-metals",
        location: "Right side; hydrogen at the upper left",
      },
      {
        id: "semi",
        name: "Semi-metals",
        location: "Between metals and non-metals",
      },
      {
        id: "inert",
        name: "Inert gases",
        location: "Far-right column",
      },
    ],
    regionRows: [
      "N................I",
      "MM..........SNNNNI",
      "MM..........MSNNNI",
      "MMMMMMMMMMMMMSSNNI",
      "MMMMMMMMMMMMMMSSNI",
      "MMMMMMMMMMMMMMMSNI",
      "MMMMMMMMMMMMMMMMNI",
    ],
    applications: [
      {
        id: "aluminium",
        element: "Aluminium",
        properties: "Malleable; strong and light; grey and shiny",
        uses: "Aluminium foil",
      },
      {
        id: "iron",
        element: "Iron",
        properties: "Strong; malleable; magnetic; good electrical conductor; grey",
        uses: "Hoe",
      },
      {
        id: "copper",
        element: "Copper",
        properties: "Strong; rustproof; ductile; good electrical conductor; brown",
        uses: "Copper wire",
      },
      {
        id: "zinc",
        element: "Zinc",
        properties: "Strong; grey; good electrical conductor",
        uses: "Zinc roof",
      },
      {
        id: "carbon",
        element: "Carbon",
        properties: "Black; smooth; light; conducts electricity",
        uses: "Pencil lead and racquets",
      },
      {
        id: "sulphur",
        element: "Sulphur",
        properties: "Yellow powder; poisonous",
        uses: "Hardens rubber tyres",
      },
      {
        id: "chlorine",
        element: "Chlorine",
        properties: "Greenish-yellow gas; bleaching agent; poisonous",
        uses: "Bleach",
      },
      {
        id: "iodine",
        element: "Iodine",
        properties: "Black crystals; poisonous; antiseptic",
        uses: "Prevents bacterial infection of wounds",
      },
    ],
    experiments: [
      {
        id: "lustre",
        title: "Appearance of metals and non-metals",
        materials: "Copper rod, carbon rod, sandpaper.",
        procedure: "Rub both rods with sandpaper and observe their surfaces.",
        samples: [
          {
            name: "Copper rod",
            material: "copper",
            effect: "shine",
            outcome: "Shiny",
          },
          {
            name: "Carbon rod",
            material: "carbon",
            effect: "dull",
            outcome: "Dull",
          },
        ],
      },
      {
        id: "ductility",
        title: "Ductility",
        materials: "Copper wire, pencil lead.",
        procedure: "Bend copper wire into a circle. Repeat with pencil lead.",
        samples: [
          {
            name: "Copper wire",
            material: "copper",
            effect: "bend",
            outcome: "Ductile",
          },
          {
            name: "Pencil lead",
            material: "carbon",
            effect: "break",
            outcome: "Brittle",
          },
        ],
      },
      {
        id: "malleability",
        title: "Malleability",
        materials: "Iron, copper and sulphur pieces, hammer, wooden block.",
        procedure: "Hammer each piece on a wooden block and observe its change in shape.",
        samples: [
          {
            name: "Iron piece",
            material: "iron",
            effect: "flat",
            outcome: "Malleable",
          },
          {
            name: "Copper piece",
            material: "copper",
            effect: "flat",
            outcome: "Malleable",
          },
          {
            name: "Sulphur piece",
            material: "sulphur",
            effect: "break",
            outcome: "Non-malleable",
          },
        ],
      },
      {
        id: "electricity",
        title: "Electrical conductivity",
        materials: "Dry cell, switch, ammeter, crocodile clips, iron, carbon and sulphur rods.",
        procedure:
          "Connect each rod between the crocodile clips. Observe the deflection of the ammeter needle.",
        samples: [
          {
            name: "Iron rod",
            material: "iron",
            effect: "current",
            outcome: "Good electrical conductor",
          },
          {
            name: "Carbon rod",
            material: "carbon",
            effect: "current",
            outcome: "Conducts electricity: carbon exception",
          },
          {
            name: "Sulphur rod",
            material: "sulphur",
            effect: "none",
            outcome: "Poor electrical conductor",
          },
        ],
      },
      {
        id: "heat",
        title: "Heat conductivity",
        materials:
          "Carbon, iron and copper rods, candle, wax, thumbtack, stopwatch, retort stand and clamp.",
        procedure:
          "Clamp a rod and fix a thumbtack with wax at one end. Heat the other end with a candle and record the time for the thumbtack to drop. Repeat for each rod.",
        samples: [
          {
            name: "Carbon rod",
            material: "carbon",
            effect: "slow",
            outcome: "Poor heat conductor",
          },
          {
            name: "Iron rod",
            material: "iron",
            effect: "drop",
            outcome: "Good heat conductor",
          },
          {
            name: "Copper rod",
            material: "copper",
            effect: "drop",
            outcome: "Good heat conductor",
          },
        ],
      },
      {
        id: "melting",
        title: "Melting point",
        materials:
          "Thermometer (0–360°C), crucible, Bunsen burner, pipeclay triangle, tripod stand, tin powder, sulphur powder.",
        procedure:
          "Heat tin powder in a crucible. Observe and record its melting point. Repeat with sulphur powder.",
        samples: [
          {
            name: "Tin powder",
            material: "tin",
            effect: "higher",
            outcome: "Higher melting point",
          },
          {
            name: "Sulphur powder",
            material: "sulphur",
            effect: "lower",
            outcome: "Lower melting point",
          },
        ],
        safety: "This activity may produce poisonous gases. Carry it out in a fume chamber.",
      },
    ],
    appreciation: [
      "Gold, silver and platinum are used for jewellery.",
      "Elements are used in construction, transportation, health, medicine, agriculture and industry.",
      "Appreciate the scientists who researched and arranged the elements systematically.",
    ],
  },
  hook: {
    title: "Why this matters",
    body: "Every material you can name — salt, water, the metal in your phone — is built from around 118 known elements arranged in one elegant table. Once you understand how atoms combine and how mixtures differ from compounds, you can explain almost everything in your kitchen, your bag, and your body.",
  },
  atomsAndMolecules: {
    definition:
      "All matter consists of small, discrete particles called atoms. An atom cannot be seen with the naked eye — it can only be seen using an electron microscope at millions of times magnification.",
    subatomicParticles: [
      { name: "Proton", charge: "Positive", location: "Inside the nucleus" },
      { name: "Neutron", charge: "Neutral (no charge)", location: "Inside the nucleus" },
      { name: "Electron", charge: "Negative", location: "Circles around the nucleus" },
    ],
    neutralityNote:
      "The nucleus has an overall positive charge from its protons. The number of electrons equals the number of protons, making the atom neutral overall.",
    moleculeDefinition:
      "Molecules are neutral particles made up of two or more atoms — e.g. an oxygen molecule (O₂) is made of two oxygen atoms.",
  },
  elementsAndCompounds: {
    elementDefinition:
      "An element is the simplest form of substance — it cannot be divided into two or more simpler substances, and contains only one type of atom.",
    elementExamples: ["Iron", "Oxygen", "Hydrogen", "Aluminium", "Carbon", "Copper"],
    compoundDefinition:
      "A compound consists of two or more elements combined chemically, produced through a chemical reaction. It can be made in the laboratory or occur naturally.",
    compoundExamples: [
      "Aluminium oxide",
      "Zinc sulphide",
      "Iron chloride",
      "Sugar",
      "Water",
      "Salt",
    ],
    separationNote:
      "The elements in a compound cannot be separated physically — only chemically, e.g. using electrical energy (electrolysis).",
  },
  periodicTable: {
    history:
      "During the 18th and 19th centuries, scientists discovered many elements and arranged them into the Periodic Table in an orderly, systematic manner — still used today.",
    totalDiscovered: "As of 2016, approximately 118 elements had been discovered.",
    exampleElements: [
      { symbol: "H", name: "Hydrogen", category: "nonmetal" },
      { symbol: "He", name: "Helium", category: "inert" },
      { symbol: "Na", name: "Sodium", category: "metal" },
      { symbol: "O", name: "Oxygen", category: "nonmetal" },
      { symbol: "Fe", name: "Iron", category: "metal" },
      { symbol: "Cl", name: "Chlorine", category: "nonmetal" },
      { symbol: "Ar", name: "Argon", category: "inert" },
      { symbol: "Cu", name: "Copper", category: "metal" },
    ],
    namingNote:
      "New element names must be approved by the International Union of Pure and Applied Chemistry (IUPAC), typically named after the discoverer, place of discovery, or a well-known scientist (e.g. Rutherfordium after Ernest Rutherford, Seaborgium after Glenn Seaborg).",
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
      { property: "Melting/boiling point", metal: "High", nonMetal: "Low" },
    ],
    semiMetalNote:
      "Some elements, like germanium and silicon, cannot be classified as purely metal or non-metal — these are semi-metals, possessing characteristics of both.",
  },
  mixtures: {
    definition:
      "A mixture consists of two or more elements or compounds mixed physically, and can be separated back into its components by physical methods.",
    examples: [
      "Cocktail (solid and liquid)",
      "Air batu campur (solid and liquid)",
      "Salad",
      "Sandwich",
    ],
    separationMethods: [
      {
        name: "Filtration",
        usedFor: "Separating an insoluble solid from a liquid mixture",
        example: "Filter paper separates coffee powder from coffee",
      },
      {
        name: "Distillation",
        usedFor: "Separating a miscible liquid-liquid mixture with different boiling points",
        example: "Separating water and alcohol; producing perfume from rose petals",
      },
      {
        name: "Separation using magnet",
        usedFor: "Separating a magnetic solid from a non-magnetic solid",
        example: "Iron nails separated from sand",
      },
      {
        name: "Sedimentation",
        usedFor: "Separating an insoluble solid from a liquid, using density differences",
        example: "Sand settling at the bottom of water",
      },
      {
        name: "Floatation",
        usedFor: "Separating substances of different densities in water",
        example: "Oil floating on water, separated using a separating funnel",
      },
      {
        name: "Chromatography",
        usedFor: "Separating small amounts of a mixture, especially by colour",
        example:
          "Detecting harmful food colouring; checking document fraud by separating ink colours",
      },
    ],
    selectionFactors: [
      "Physical properties of the substances present in the mixture",
      "The substance(s) to be obtained from the mixture",
    ],
  },
  compounds: {
    definition:
      "A compound consists of two or more elements mixed chemically, forming a newly formed product with its own characteristics, different from the original substances.",
    formations: [
      { reactants: "Magnesium + Oxygen", product: "Magnesium oxide" },
      { reactants: "Aluminium + Oxygen", product: "Aluminium oxide" },
      { reactants: "Zinc + Oxygen", product: "Zinc oxide" },
      { reactants: "Iron + Oxygen", product: "Iron oxide" },
      { reactants: "Copper + Oxygen", product: "Copper oxide" },
      { reactants: "Iron + Sulphur (heated)", product: "Iron sulphide" },
    ],
    alkaliMetalNote:
      "Alkali metals (lithium, sodium, potassium) react with water to form alkali compounds and release hydrogen gas — e.g. sodium + water → sodium hydroxide + hydrogen gas.",
    massConservationNote:
      "When a metal and non-metal combine to form a compound, the total mass before and after the reaction remains the same — mass is conserved.",
    electrolysisDefinition:
      "Electrolysis is the chemical decomposition of a compound into its elements by passing an electric current through the compound — e.g. water decomposes into hydrogen (at the cathode) and oxygen (at the anode).",
  },
  physicalVsChemicalChange: {
    comparison: [
      { characteristic: "New substance formed?", physicalChange: "No", chemicalChange: "Yes" },
      {
        characteristic: "Properties of substance",
        physicalChange: "Remain the same",
        chemicalChange: "Not the same as original",
      },
      {
        characteristic: "Chemical composition",
        physicalChange: "Remains the same",
        chemicalChange: "Different composition",
      },
      {
        characteristic: "Energy required",
        physicalChange: "Needs less energy",
        chemicalChange: "Needs more energy",
      },
    ],
    physicalExamples: ["Ice melting", "Water freezing", "Water boiling"],
    chemicalExamples: ["Rusting of iron", "Photosynthesis", "Decaying of leaf", "Cell respiration"],
  },
  mixturesVsCompounds: [
    { characteristic: "Formation of new substance", mixture: "No", compound: "Yes" },
    { characteristic: "Chemical bond", mixture: "No", compound: "Yes" },
    { characteristic: "Separation method", mixture: "Physical", compound: "Chemical" },
    { characteristic: "Properties vs original substances", mixture: "Same", compound: "Different" },
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
    "Physical changes don't form a new substance; chemical changes do",
  ],
  keyTerms: [
    "Atom",
    "Molecule",
    "Proton",
    "Neutron",
    "Electron",
    "Element",
    "Compound",
    "Periodic Table",
    "Metal",
    "Non-metal",
    "Semi-metal",
    "Inert gas",
    "Mixture",
    "Filtration",
    "Distillation",
    "Sedimentation",
    "Floatation",
    "Chromatography",
    "Electrolysis",
    "Physical change",
    "Chemical change",
  ],
  chapterSummary:
    "Chapter 6 explains that all matter is made of atoms, which combine to form elements and compounds. It covers the structure of the Periodic Table and the differences between metals, non-metals, and semi-metals, how mixtures are formed and separated through six physical methods, how compounds form through chemical reactions with mass conservation, and the key differences between physical and chemical changes, and between mixtures and compounds.",
};

const bm: Chapter6Content = {
  structure: {
    title: "Jadual Berkala",
    subtopics: ["6.1 Pengelasan Unsur", "6.2 Campuran", "6.3 Sebatian"],
  },
  classification: {
    labels: {
      atom: "Atom",
      molecule: "Molekul",
      nucleus: "Nukleus",
      choose: "Pilih zarah subatom",
      charge: "Cas",
      location: "Lokasi",
      neutral: "Atom neutral",
      protons: "Bilangan proton",
      electrons: "Bilangan elektron",
      oxygenAtom: "Atom oksigen",
      oxygenMolecule: "Molekul oksigen",
      element: "Apakah itu Unsur?",
      compound: "Apakah itu Sebatian?",
      salt: "Garam",
      sodium: "Natrium",
      chlorine: "Klorin",
      model: "Rajah ialah model dan bukan dilukis mengikut skala.",
      microscope: "Mikroskop elektron",
      table: "Jadual Berkala",
      context: "Konteks buku teks: sehingga tahun 2016",
      history: "Sejarah Jadual Berkala",
      comparison: "Perbezaan Ciri-ciri Logam dan Bukan Logam",
      property: "Ciri",
      metal: "Logam",
      nonmetal: "Bukan logam",
      semi: "Separuh logam",
      inert: "Gas nadir",
      applications: "Contoh-contoh bahan logam dan bukan logam",
      experiment: "Eksperimen 6.2 — Logam dan Bukan Logam",
      conclusion: "Kesimpulan",
      appreciation: "Menghargai Ketertiban Unsur yang Wujud dalam Alam Ini",
      sandpaper: "Kertas pasir",
      hammer: "Tukul",
      wood: "Bongkah kayu",
      ammeter: "Ammeter",
      dryCell: "Sel kering",
      switch: "Suis",
      clips: "Klip buaya",
      candle: "Lilin",
      wax: "Lilin",
      thumbtack: "Paku tekan",
      stand: "Kaki retort dan pengapit",
      crucible: "Mangkuk pijar",
      thermometer: "Termometer",
      tripod: "Tungku kaki tiga",
      triangle: "Alas segi tiga tanah liat",
      burner: "Penunu Bunsen",
      fume: "Kebuk wasap",
      stopwatch: "Jam randik",
    },
    microscopeAnalogy:
      "Andaikan sebiji buah oren ialah suatu atom, ia akan dibesarkan sebesar saiz Bumi dengan menggunakan mikroskop elektron.",
    history: [
      {
        scientist: "Antoine Lavoisier",
        contribution: "Mengelaskan bahan-bahan kepada logam dan bukan logam.",
      },
      {
        scientist: "Dmitri Mendeleev · 1869",
        contribution:
          "Menyusun 63 unsur pada kad yang mengandungi sifat dan berat atom. Meninggalkan ruang kosong untuk unsur yang belum ditemui dan meramalkan sifatnya.",
      },
      {
        scientist: "1886 · Germanium",
        contribution: "Penemuan germanium menepati ramalan Mendeleev.",
      },
    ],
    arrangement: "Unsur-unsur disusun secara teratur dan sistematik dalam Jadual Berkala.",
    regions: [
      {
        id: "metal",
        name: "Logam",
        location: "Bahagian kiri dan tengah",
      },
      {
        id: "nonmetal",
        name: "Bukan logam",
        location: "Bahagian kanan; hidrogen di kiri atas",
      },
      {
        id: "semi",
        name: "Separuh logam",
        location: "Antara logam dengan bukan logam",
      },
      {
        id: "inert",
        name: "Gas nadir",
        location: "Lajur paling kanan",
      },
    ],
    regionRows: [
      "N................I",
      "MM..........SNNNNI",
      "MM..........MSNNNI",
      "MMMMMMMMMMMMMSSNNI",
      "MMMMMMMMMMMMMMSSNI",
      "MMMMMMMMMMMMMMMSNI",
      "MMMMMMMMMMMMMMMMNI",
    ],
    applications: [
      {
        id: "aluminium",
        element: "Aluminium",
        properties: "Boleh ditempa; kuat dan ringan; kelabu dan berkilat",
        uses: "Kerajang aluminium",
      },
      {
        id: "iron",
        element: "Besi",
        properties: "Kuat; mudah ditempa; bahan magnet; konduktor elektrik yang baik; kelabu",
        uses: "Cangkul",
      },
      {
        id: "copper",
        element: "Kuprum",
        properties: "Kuat; tahan karat; mulur; konduktor elektrik yang baik; coklat kemerahan",
        uses: "Wayar kuprum",
      },
      {
        id: "zinc",
        element: "Zink",
        properties: "Kuat; kelabu; konduktor elektrik yang baik",
        uses: "Atap zink",
      },
      {
        id: "carbon",
        element: "Karbon",
        properties: "Hitam; licin; ringan; konduktor elektrik yang baik",
        uses: "Mata pensel dan raket",
      },
      {
        id: "sulphur",
        element: "Sulfur",
        properties: "Serbuk kuning; beracun",
        uses: "Membuatkan tayar getah menjadi lebih keras",
      },
      {
        id: "chlorine",
        element: "Klorin",
        properties: "Gas kuning kehijauan; peluntur warna; beracun",
        uses: "Bahan peluntur",
      },
      {
        id: "iodine",
        element: "Iodin",
        properties: "Hablur hitam; beracun; antiseptik",
        uses: "Mencegah luka daripada jangkitan bakteria",
      },
    ],
    experiments: [
      {
        id: "lustre",
        title: "Kekilauan permukaan",
        materials: "Rod kuprum, rod karbon, kertas pasir.",
        procedure:
          "Gosokkan permukaan kedua-dua rod dengan kertas pasir dan perhatikan kekilauannya.",
        samples: [
          {
            name: "Rod kuprum",
            material: "copper",
            effect: "shine",
            outcome: "Berkilau",
          },
          {
            name: "Rod karbon",
            material: "carbon",
            effect: "dull",
            outcome: "Pudar",
          },
        ],
      },
      {
        id: "ductility",
        title: "Kemuluran",
        materials: "Dawai kuprum dan grafit pensel.",
        procedure:
          "Bengkokkan dawai kuprum untuk membentuk satu bulatan. Lakukan perkara yang sama pada grafit pensel.",
        samples: [
          {
            name: "Dawai kuprum",
            material: "copper",
            effect: "bend",
            outcome: "Mulur",
          },
          {
            name: "Grafit pensel",
            material: "carbon",
            effect: "break",
            outcome: "Rapuh",
          },
        ],
      },
      {
        id: "malleability",
        title: "Kebolehtempaan",
        materials: "Kepingan besi, kuprum dan sulfur, tukul, bongkah kayu.",
        procedure:
          "Ketukkan setiap kepingan di atas bongkah kayu dengan tukul. Perhatikan perubahan bentuknya.",
        samples: [
          {
            name: "Kepingan besi",
            material: "iron",
            effect: "flat",
            outcome: "Boleh ditempa",
          },
          {
            name: "Kepingan kuprum",
            material: "copper",
            effect: "flat",
            outcome: "Boleh ditempa",
          },
          {
            name: "Kepingan sulfur",
            material: "sulphur",
            effect: "break",
            outcome: "Tidak boleh ditempa",
          },
        ],
      },
      {
        id: "electricity",
        title: "Kekonduksian elektrik",
        materials: "Sel kering, suis, ammeter, klip buaya, rod besi, karbon dan sulfur.",
        procedure:
          "Sambungkan kedua-dua hujung setiap rod dengan klip buaya. Perhatikan pesongan jarum ammeter.",
        samples: [
          {
            name: "Rod besi",
            material: "iron",
            effect: "current",
            outcome: "Konduktor elektrik yang baik",
          },
          {
            name: "Rod karbon",
            material: "carbon",
            effect: "current",
            outcome: "Mengkonduksikan elektrik: pengecualian karbon",
          },
          {
            name: "Rod sulfur",
            material: "sulphur",
            effect: "none",
            outcome: "Konduktor elektrik yang lemah",
          },
        ],
      },
      {
        id: "heat",
        title: "Kekonduksian haba",
        materials:
          "Rod karbon, besi dan kuprum, lilin, paku tekan, jam randik, kaki retort dan pengapit.",
        procedure:
          "Pasangkan rod pada kaki retort. Lekatkan paku tekan dengan lilin pada satu hujung rod. Panaskan hujung yang lain dan rekodkan masa paku tekan jatuh. Ulang dengan setiap rod.",
        samples: [
          {
            name: "Rod karbon",
            material: "carbon",
            effect: "slow",
            outcome: "Konduktor haba yang lemah",
          },
          {
            name: "Rod besi",
            material: "iron",
            effect: "drop",
            outcome: "Konduktor haba yang baik",
          },
          {
            name: "Rod kuprum",
            material: "copper",
            effect: "drop",
            outcome: "Konduktor haba yang baik",
          },
        ],
      },
      {
        id: "melting",
        title: "Takat lebur",
        materials:
          "Termometer (0–360°C), mangkuk pijar, penunu Bunsen, alas segi tiga tanah liat, tungku kaki tiga, serbuk timah, serbuk sulfur.",
        procedure:
          "Panaskan serbuk timah dalam mangkuk pijar. Perhatikan dan rekod takat leburnya. Ulang dengan serbuk sulfur.",
        samples: [
          {
            name: "Serbuk timah",
            material: "tin",
            effect: "higher",
            outcome: "Takat lebur lebih tinggi",
          },
          {
            name: "Serbuk sulfur",
            material: "sulphur",
            effect: "lower",
            outcome: "Takat lebur lebih rendah",
          },
        ],
        safety:
          "Aktiviti ini menghasilkan gas berbahaya. Oleh itu, lakukan aktiviti ini di dalam kebuk wasap.",
      },
    ],
    appreciation: [
      "Emas, perak dan platinum digunakan untuk membuat barang perhiasan.",
      "Unsur digunakan dalam bidang pembinaan, pengangkutan, kesihatan, perubatan, pertanian dan perindustrian.",
      "Hargai jasa ahli sains yang telah menemukan dan menyusun unsur dengan teratur dalam Jadual Berkala.",
    ],
  },
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bahan yang boleh anda namakan — garam, air, logam dalam telefon anda — dibina daripada kira-kira 118 unsur yang diketahui, disusun dalam satu jadual yang elegan. Apabila anda memahami bagaimana atom bergabung dan bagaimana campuran berbeza daripada sebatian, anda boleh menerangkan hampir semua yang ada di dapur, beg, dan badan anda.",
  },
  atomsAndMolecules: {
    definition:
      "Semua jirim terdiri daripada zarah kecil dan diskret yang dipanggil atom. Atom tidak dapat dilihat dengan mata kasar — ia hanya boleh dilihat menggunakan mikroskop elektron pada pembesaran berjuta kali.",
    subatomicParticles: [
      { name: "Proton", charge: "Positif", location: "Di dalam nukleus" },
      { name: "Neutron", charge: "Neutral (tiada cas)", location: "Di dalam nukleus" },
      { name: "Elektron", charge: "Negatif", location: "Mengelilingi nukleus" },
    ],
    neutralityNote:
      "Nukleus mempunyai cas positif keseluruhan daripada proton. Bilangan elektron sama dengan bilangan proton, menjadikan atom neutral secara keseluruhan.",
    moleculeDefinition:
      "Molekul ialah zarah neutral yang terdiri daripada dua atau lebih atom — cth: molekul oksigen (O₂) terdiri daripada dua atom oksigen.",
  },
  elementsAndCompounds: {
    elementDefinition:
      "Unsur ialah bahan yang paling ringkas — tidak boleh diuraikan secara kimia kepada dua atau lebih bahan yang lebih ringkas, dan mengandungi hanya satu jenis atom.",
    elementExamples: ["Besi", "Oksigen", "Hidrogen", "Aluminium", "Karbon", "Kuprum"],
    compoundDefinition:
      "Sebatian terdiri daripada dua atau lebih unsur yang bergabung secara kimia, terhasil daripada tindak balas kimia. Ia boleh dihasilkan di makmal atau berlaku secara semula jadi.",
    compoundExamples: ["Aluminium oksida", "Zink sulfida", "Besi klorida", "Gula", "Air", "Garam"],
    separationNote:
      "Unsur-unsur dalam sebatian tidak boleh dipisahkan secara fizikal — hanya secara kimia, cth menggunakan tenaga elektrik (elektrolisis).",
  },
  periodicTable: {
    history:
      "Sepanjang abad ke-18 dan ke-19, saintis menemui banyak unsur dan menyusunnya dalam Jadual Berkala secara teratur dan sistematik — masih digunakan sehingga kini.",
    totalDiscovered: "Sehingga tahun 2016, lebih kurang 118 unsur telah ditemui.",
    exampleElements: [
      { symbol: "H", name: "Hidrogen", category: "nonmetal" },
      { symbol: "He", name: "Helium", category: "inert" },
      { symbol: "Na", name: "Natrium", category: "metal" },
      { symbol: "O", name: "Oksigen", category: "nonmetal" },
      { symbol: "Fe", name: "Ferum", category: "metal" },
      { symbol: "Cl", name: "Klorin", category: "nonmetal" },
      { symbol: "Ar", name: "Argon", category: "inert" },
      { symbol: "Cu", name: "Kuprum", category: "metal" },
    ],
    namingNote:
      "Nama unsur baharu perlu diluluskan oleh International Union of Pure and Applied Chemistry (IUPAC), biasanya dinamakan sempena penemunya, tempat penemuan, atau saintis terkenal (cth: Rutherfordium sempena Ernest Rutherford, Seaborgium sempena Glenn Seaborg).",
  },
  metalsVsNonMetals: {
    comparison: [
      { property: "Kekilauan", metal: "Berkilau", nonMetal: "Pudar" },
      { property: "Kemuluran", metal: "Mulur", nonMetal: "Rapuh" },
      { property: "Kebolehtempaan", metal: "Boleh ditempa", nonMetal: "Tidak boleh ditempa" },
      { property: "Kekuatan regangan", metal: "Kuat", nonMetal: "Rendah (mudah patah)" },
      { property: "Kekonduksian elektrik", metal: "Baik", nonMetal: "Lemah (kecuali karbon)" },
      { property: "Kekonduksian haba", metal: "Baik", nonMetal: "Lemah" },
      { property: "Ketumpatan", metal: "Tinggi", nonMetal: "Rendah" },
      { property: "Takat lebur dan takat didih", metal: "Tinggi", nonMetal: "Rendah" },
    ],
    semiMetalNote:
      "Sesetengah unsur, seperti germanium dan silikon, tidak dapat dikelaskan sepenuhnya sebagai logam atau bukan logam — ini ialah separuh logam, memiliki ciri-ciri kedua-duanya.",
  },
  mixtures: {
    definition:
      "Campuran terdiri daripada dua atau lebih unsur atau sebatian yang bercampur secara fizikal, dan boleh dipisahkan semula kepada komponennya melalui kaedah fizikal.",
    examples: [
      "Koktel (pepejal dan cecair)",
      "Air batu campur (pepejal dan cecair)",
      "Salad",
      "Sandwic",
    ],
    separationMethods: [
      {
        name: "Penurasan",
        usedFor: "Memisahkan pepejal tak terlarut daripada campuran cecair",
        example: "Kertas turas memisahkan serbuk kopi daripada air kopi",
      },
      {
        name: "Penyulingan",
        usedFor:
          "Memisahkan campuran cecair-cecair yang boleh bercampur dengan takat didih berbeza",
        example: "Memisahkan air dan alkohol; menghasilkan minyak wangi daripada kelopak bunga ros",
      },
      {
        name: "Pemisahan menggunakan magnet",
        usedFor: "Memisahkan pepejal bermagnet daripada pepejal tidak bermagnet",
        example: "Paku besi dipisahkan daripada pasir",
      },
      {
        name: "Pengenapan",
        usedFor:
          "Memisahkan pepejal tak terlarut daripada cecair, menggunakan perbezaan ketumpatan",
        example: "Pasir mendap di dasar air",
      },
      {
        name: "Pengapungan",
        usedFor: "Memisahkan bahan berlainan ketumpatan dalam air",
        example: "Minyak terapung di atas air, dipisahkan menggunakan corong pemisah",
      },
      {
        name: "Kromatografi",
        usedFor: "Memisahkan sedikit campuran, terutamanya mengikut warna",
        example:
          "Mengesan pewarna makanan berbahaya; menyemak penipuan dokumen dengan memisahkan warna dakwat",
      },
    ],
    selectionFactors: [
      "Sifat fizikal bahan yang terdapat dalam campuran",
      "Bahan yang ingin diperoleh daripada campuran",
    ],
  },
  compounds: {
    definition:
      "Sebatian terdiri daripada dua atau lebih unsur yang bercampur secara kimia, membentuk produk baharu dengan ciri tersendiri, berbeza daripada bahan asal.",
    formations: [
      { reactants: "Magnesium + Oksigen", product: "Magnesium oksida" },
      { reactants: "Aluminium + Oksigen", product: "Aluminium oksida" },
      { reactants: "Zink + Oksigen", product: "Zink oksida" },
      { reactants: "Ferum + Oksigen", product: "Ferum oksida" },
      { reactants: "Kuprum + Oksigen", product: "Kuprum oksida" },
      { reactants: "Ferum + Sulfur (dipanaskan)", product: "Ferum sulfida" },
    ],
    alkaliMetalNote:
      "Logam alkali (litium, natrium, kalium) bertindak balas dengan air membentuk sebatian alkali dan membebaskan gas hidrogen — cth: natrium + air → natrium hidroksida + gas hidrogen.",
    massConservationNote:
      "Apabila logam dan bukan logam bergabung membentuk sebatian, jumlah jisim sebelum dan selepas tindak balas kekal sama — jisim dikekalkan.",
    electrolysisDefinition:
      "Elektrolisis ialah penguraian kimia sesuatu sebatian kepada unsurnya dengan melalukan arus elektrik melalui sebatian tersebut — cth: air terurai kepada hidrogen (di katod) dan oksigen (di anod).",
  },
  physicalVsChemicalChange: {
    comparison: [
      { characteristic: "Bahan baharu terbentuk?", physicalChange: "Tidak", chemicalChange: "Ya" },
      {
        characteristic: "Sifat bahan",
        physicalChange: "Kekal sama",
        chemicalChange: "Tidak sama dengan asal",
      },
      {
        characteristic: "Komposisi kimia",
        physicalChange: "Kekal sama",
        chemicalChange: "Komposisi berbeza",
      },
      {
        characteristic: "Tenaga diperlukan",
        physicalChange: "Memerlukan kurang tenaga",
        chemicalChange: "Memerlukan lebih tenaga",
      },
    ],
    physicalExamples: ["Ais melebur", "Air membeku", "Air mendidih"],
    chemicalExamples: ["Pengaratan besi", "Fotosintesis", "Pereputan daun", "Respirasi sel"],
  },
  mixturesVsCompounds: [
    { characteristic: "Pembentukan bahan baharu", mixture: "Tidak", compound: "Ya" },
    { characteristic: "Ikatan kimia", mixture: "Tidak", compound: "Ya" },
    { characteristic: "Kaedah pemisahan", mixture: "Fizikal", compound: "Kimia" },
    { characteristic: "Sifat berbanding bahan asal", mixture: "Sama", compound: "Berbeza" },
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
    "Perubahan fizikal tidak membentuk bahan baharu; perubahan kimia membentuknya",
  ],
  keyTerms: [
    "Atom",
    "Molekul",
    "Proton",
    "Neutron",
    "Elektron",
    "Unsur",
    "Sebatian",
    "Jadual Berkala",
    "Logam",
    "Bukan logam",
    "Semilogam",
    "Gas nadir",
    "Campuran",
    "Penurasan",
    "Penyulingan",
    "Pengenapan",
    "Pengapungan",
    "Kromatografi",
    "Elektrolisis",
    "Perubahan fizikal",
    "Perubahan kimia",
  ],
  chapterSummary:
    "Bab 6 menerangkan bahawa semua jirim diperbuat daripada atom, yang bergabung membentuk unsur dan sebatian. Ia merangkumi struktur Jadual Berkala dan perbezaan antara logam, bukan logam, dan semilogam, bagaimana campuran terbentuk dan dipisahkan melalui enam kaedah fizikal, bagaimana sebatian terbentuk melalui tindak balas kimia dengan pengekalan jisim, serta perbezaan utama antara perubahan fizikal dan kimia, dan antara campuran dan sebatian.",
};

export const chapter6Content = { en, bm };

export interface Chapter6Supplement {
  electrolysis: {
    setup: string[];
    products: { electrode: string; gas: string; test: string }[];
    volumeRatio: string;
  };
  activeRecall: { question: string; answer: string }[];
}

const supplementEn: Chapter6Supplement = {
  electrolysis: {
    setup: [
      "Add a little dilute sulphuric acid to water so it conducts electricity.",
      "Connect two electrodes to a direct-current supply and collect the gases separately.",
    ],
    products: [
      {
        electrode: "Cathode (−)",
        gas: "Hydrogen gas",
        test: "A burning splint gives a ‘pop’ sound",
      },
      { electrode: "Anode (+)", gas: "Oxygen gas", test: "A glowing splint relights" },
    ],
    volumeRatio: "Hydrogen : oxygen = 2 : 1 by volume.",
  },
  activeRecall: [
    {
      question: "How can sand, iron filings, salt, and sawdust be separated?",
      answer:
        "Use a magnet for iron. Add water so sawdust floats and salt dissolves. Remove the sawdust, filter out sand, then evaporate the water to recover salt.",
    },
    {
      question: "Why is air a mixture?",
      answer:
        "Its gases are physically combined, are not chemically bonded, keep their own properties, and can be separated by fractional distillation.",
    },
    {
      question: "Why can a magnet not separate iron from iron sulphide?",
      answer:
        "Heating forms a new compound with different properties; the iron is chemically bonded to sulphur and no longer behaves as free iron.",
    },
  ],
};

const supplementBm: Chapter6Supplement = {
  electrolysis: {
    setup: [
      "Tambahkan sedikit asid sulfurik cair ke dalam air supaya air mengkonduksi elektrik.",
      "Sambungkan dua elektrod kepada bekalan arus terus dan kumpulkan gas secara berasingan.",
    ],
    products: [
      {
        electrode: "Katod (−)",
        gas: "Gas hidrogen",
        test: "Kayu uji bernyala menghasilkan bunyi ‘pop’",
      },
      { electrode: "Anod (+)", gas: "Gas oksigen", test: "Kayu uji berbara menyala semula" },
    ],
    volumeRatio: "Hidrogen : oksigen = 2 : 1 mengikut isi padu.",
  },
  activeRecall: [
    {
      question: "Bagaimanakah pasir, serbuk ferum, garam, dan habuk kayu dapat dipisahkan?",
      answer:
        "Gunakan magnet untuk ferum. Tambah air supaya habuk kayu terapung dan garam larut. Keluarkan habuk kayu, turas pasir, kemudian sejatkan air untuk memperoleh garam.",
    },
    {
      question: "Mengapakah udara ialah campuran?",
      answer:
        "Gas-gasnya bercampur secara fizikal, tidak terikat secara kimia, mengekalkan sifat sendiri, dan boleh dipisahkan melalui penyulingan berperingkat.",
    },
    {
      question: "Mengapakah magnet tidak dapat memisahkan ferum daripada ferum sulfida?",
      answer:
        "Pemanasan membentuk sebatian baharu dengan sifat berbeza; ferum terikat secara kimia kepada sulfur dan tidak lagi bertindak sebagai ferum bebas.",
    },
  ],
};

export const chapter6Supplement = { en: supplementEn, bm: supplementBm };
export default chapter6Content;
