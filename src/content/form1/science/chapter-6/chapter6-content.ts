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

export type SeparationMethodId =
  | "filtration"
  | "distillation"
  | "magnet"
  | "sedimentation"
  | "floatation"
  | "chromatography"
  | "sieving";

export interface SeparationMethod {
  id: SeparationMethodId;
  activity?: string;
  materials: string;
  apparatus: { id: string; label: string }[];
  steps: string[];
  observation: string;
  notes: string[];
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
    physicalSeparation: string;
    labels: Record<string, string>;
    decision: string[];
    formativePractice: { mixture: string; method: SeparationMethodId }[];
    reasoning: { question: string; answer: string };
  };
  compounds: {
    definition: string;
    formations: CompoundFormation[];
    alkaliMetalNote: string;
    alkaliFormations: CompoundFormation[];
    massConservationNote: string;
    electrolysisDefinition: string;
    labels: Record<string, string>;
    examples: string[];
    everyday: { id: string; elements: string; compound: string; object: string }[];
    rust: string;
    mineralNote: string;
    separation: string;
    activity610: { title: string; instructions: string[] };
    activity611: {
      title: string;
      materials: string;
      apparatus: { id: string; label: string }[];
      steps: string[];
      safety?: string;
    };
    activity612: { title: string; instructions: string[] };
    electrolysis: {
      setup: string[];
      products: { id: "anode" | "cathode"; electrode: string; gas: string }[];
      labels: Record<string, string>;
    };
    activeRecall: { question: string; answer: string }[];
  };
  physicalVsChemicalChange: {
    comparison: ChangeComparisonRow[];
    common: string[];
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
    definition: "A mixture consists of two or more elements or compounds mixed physically.",
    examples: [
      "Cocktail (solid and liquid)",
      "Air batu campur (solid and liquid)",
      "Salad",
      "Sandwich",
    ],
    physicalSeparation: "As the mixture is formed physically, it can be separated physically too.",
    labels: {
      overview: "Methods to Separate Mixtures",
      choose: "Choose a separation method",
      mixture: "Mixture",
      componentA: "Component A",
      componentB: "Component B",
      physical: "Mixed physically",
      separate: "Separated physically",
      selection: "The separation method depends on:",
      method: "Separation method",
      property: "Type of mixture / physical properties",
      example: "Example",
      materials: "Materials and apparatus",
      instruction: "Instruction",
      observation: "Observation",
      practice: "Formative Practice 6.2",
      match: "Match the following mixtures according to its suitable separation method.",
      answer: "Answer",
      correct: "Correct",
      retry: "Try again",
      exploration: "Science Exploration",
      schematic: "Schematic / not to scale",
    },
    separationMethods: [
      {
        id: "filtration",
        name: "Filtration",
        usedFor: "Separating an insoluble solid from a mixture of solid and liquid.",
        example: "Filter paper separates coffee powder from a coffee drink.",
        materials:
          "Sand, distilled water, filter paper, filter funnel, two 50 ml beakers, spatula, glass rod, retort stand with clamp.",
        apparatus: [
          {
            id: "mixture",
            label: "Mixture of sand and water",
          },
          {
            id: "paper",
            label: "Filter paper",
          },
          {
            id: "funnel",
            label: "Filter funnel",
          },
          {
            id: "residue",
            label: "Residue",
          },
          {
            id: "filtrate",
            label: "Filtrate",
          },
          {
            id: "rod",
            label: "Glass rod",
          },
          {
            id: "stand",
            label: "Retort stand with clamp",
          },
          {
            id: "beaker",
            label: "50 ml beaker",
          },
          {
            id: "spatula",
            label: "Spatula",
          },
        ],
        steps: [
          "Add two spatulas of sand to 30 ml of water in a beaker. Stir for two minutes.",
          "Filter the mixture.",
          "Record your observation.",
        ],
        observation: "Insoluble sand remains as the residue; water passes through as the filtrate.",
        notes: [],
        activity: "6.4",
      },
      {
        id: "distillation",
        name: "Distillation",
        usedFor:
          "Separating a completely miscible liquid-liquid mixture with different boiling points.",
        example: "Separating water and alcohol; producing perfume from rose petals.",
        materials:
          "Mixture of water and alcohol, porcelain chips, thermometer, tripod stand, Bunsen burner, wire gauze, Liebig condenser, retort stand with clamp, round-bottom flask, beaker.",
        apparatus: [
          {
            id: "flask",
            label: "Round-bottom flask",
          },
          {
            id: "mixture",
            label: "Water + alcohol",
          },
          {
            id: "chips",
            label: "Porcelain chips",
          },
          {
            id: "thermometer",
            label: "Thermometer",
          },
          {
            id: "burner",
            label: "Bunsen burner",
          },
          {
            id: "gauze",
            label: "Wire gauze",
          },
          {
            id: "tripod",
            label: "Tripod stand",
          },
          {
            id: "condenser",
            label: "Liebig condenser",
          },
          {
            id: "in",
            label: "Water in",
          },
          {
            id: "out",
            label: "Water out",
          },
          {
            id: "beaker",
            label: "Beaker",
          },
          {
            id: "stand",
            label: "Retort stand with clamp",
          },
        ],
        steps: [
          "Half-fill the round-bottom flask with water and alcohol. Add porcelain chips. Flow water through the Liebig condenser.",
          "Heat the mixture: the component with the lower boiling point vaporises and enters the condenser.",
          "The vapour cools in the condenser. Collect the liquid in a beaker.",
        ],
        observation:
          "Record the temperature of the liquid. Determine the boiling point of the liquid.",
        notes: [],
        activity: "6.5",
      },
      {
        id: "magnet",
        name: "Separation using magnet",
        usedFor: "Separating two solids: a magnetic substance and a non-magnetic substance.",
        example: "Iron nails separated from sand.",
        materials: "Mixture of iron and sulphur powder, spatula, Petri dish, magnet bar, paper.",
        apparatus: [
          {
            id: "iron",
            label: "Iron powder",
          },
          {
            id: "sulphur",
            label: "Sulphur powder",
          },
          {
            id: "dish",
            label: "Petri dish",
          },
          {
            id: "paper",
            label: "Paper",
          },
          {
            id: "magnet",
            label: "Magnet bar",
          },
          {
            id: "spatula",
            label: "Spatula",
          },
        ],
        steps: [
          "Put one spatula of iron powder and sulphur powder into a Petri dish.",
          "Hold a magnet bar near the mixture.",
          "Iron is attracted to the magnet; sulphur remains in the Petri dish.",
        ],
        observation: "The substances are mixed physically.",
        notes: [
          "Iron, nickel and cobalt are magnetic metals.",
          "Gold, bronze and aluminium are non-magnetic metals.",
        ],
        activity: "6.6",
      },
      {
        id: "sedimentation",
        name: "Sedimentation",
        usedFor:
          "Separating a liquid and an insoluble solid that has a higher density and settles at the base.",
        example: "Sand deposited at the base of a beaker filled with water.",
        materials: "Silty solution, two 100 ml beakers, glass rod.",
        apparatus: [
          {
            id: "mixture",
            label: "Silty solution",
          },
          {
            id: "water",
            label: "Clear water",
          },
          {
            id: "sediment",
            label: "Sediment",
          },
          {
            id: "rod",
            label: "Glass rod",
          },
          {
            id: "beaker",
            label: "100 ml beaker",
          },
        ],
        steps: [
          "Pour 50 ml of silty solution into a 100 ml beaker. Stir using a glass rod.",
          "Observe the water and silt after a while.",
          "Slowly pour the clear water into another beaker. Observe the sediment left inside the beaker.",
        ],
        observation: "The insoluble solid settles at the base; clear water is above it.",
        notes: [],
        activity: "6.7",
      },
      {
        id: "floatation",
        name: "Floatation",
        usedFor:
          "Floatation method can be used to separate soluble and insoluble materials in water.",
        example: "Oil floats on water and can be separated using a separating funnel.",
        materials:
          "Mixture of water and oil, beakers, separating funnel, 100 ml measuring cylinder, retort stand with clamp.",
        apparatus: [
          {
            id: "oil",
            label: "Oil",
          },
          {
            id: "water",
            label: "Water",
          },
          {
            id: "funnel",
            label: "Separating funnel",
          },
          {
            id: "tap",
            label: "Tap",
          },
          {
            id: "beaker",
            label: "Beaker",
          },
          {
            id: "stand",
            label: "Retort stand with clamp",
          },
        ],
        steps: [
          "Pour 100 ml water and oil mixture into a beaker. Record your observation.",
          "Pour the mixture into a separating funnel. Oil is above water.",
          "Separate water and oil using different beakers. Water flows out through the tap.",
        ],
        observation:
          "Oil has a lower density than water. Therefore, oil floats on the water surface.",
        notes: [],
        activity: "6.8",
      },
      {
        id: "chromatography",
        name: "Chromatography",
        usedFor: "Separating small amounts of a mixture by separating the colours in ink.",
        example:
          "Checking document fraud by separating ink colours; detecting harmful food colourings.",
        materials:
          "250 ml beaker, distilled water, filter paper, ruler, whiteboard marker pens (red, green and blue ink), skewer.",
        apparatus: [
          {
            id: "paper",
            label: "Filter paper: 5 cm × 12 cm",
          },
          {
            id: "baseline",
            label: "Pencil line: 1.5 cm from the edge",
          },
          {
            id: "dots",
            label: "Ink dots",
          },
          {
            id: "water",
            label: "Distilled water",
          },
          {
            id: "beaker",
            label: "250 ml beaker",
          },
          {
            id: "skewer",
            label: "Skewer",
          },
          {
            id: "ruler",
            label: "Ruler",
          },
          {
            id: "pens",
            label: "Whiteboard marker pens",
          },
        ],
        steps: [
          "Prepare the paper and pencil line. Draw three ink dots. Hang the paper using a skewer. The water must not touch the dots.",
          "The water moves up the paper, separating components of the ink. Observe for 30 minutes.",
          "Record your observation. What are the colours produced on the filter paper?",
        ],
        observation: "Is the colour produced the same as the ink of the whiteboard marker pen?",
        notes: [
          "Urine samples are tested to detect drug content in the body using chromatography.",
        ],
        activity: "6.9",
      },
      {
        id: "sieving",
        name: "Sieving",
        usedFor: "Separating impurities from flour by sieving.",
        example: "Impurities can be removed from flour by the sieving method.",
        materials: "Flour and impurities; sieve.",
        apparatus: [
          {
            id: "flour",
            label: "Flour",
          },
          {
            id: "impurities",
            label: "Impurities",
          },
          {
            id: "sieve",
            label: "Sieve",
          },
        ],
        steps: [
          "Flour and impurities.",
          "Sieve the flour.",
          "Fine flour passes through; larger impurities remain.",
        ],
        observation: "Impurities are separated from flour.",
        notes: [],
      },
    ],
    selectionFactors: [
      "Physical properties of the substances present in the mixture",
      "Substance(s) to be obtained from the mixture",
    ],
    decision: [
      "Substances in the mixture",
      "Physical properties and states of matter",
      "Substance(s) to be obtained",
      "Choose a separation method",
    ],
    formativePractice: [
      {
        mixture: "Paper clips and glass fragments",
        method: "magnet",
      },
      {
        mixture: "Water and ethanol",
        method: "distillation",
      },
      {
        mixture: "Three types of water-soluble ink",
        method: "chromatography",
      },
      {
        mixture: "Soil and water",
        method: "sedimentation",
      },
      {
        mixture: "Oil and water",
        method: "floatation",
      },
      {
        mixture: "Coffee powder and water",
        method: "filtration",
      },
    ],
    reasoning: {
      question:
        "If you were given a mixture that contains rice and sand, can you separate them using filtration method? Why?",
      answer:
        "No. Rice and sand are both solids. Filtration separates an insoluble solid from a liquid.",
    },
  },
  compounds: {
    definition:
      "A compound consists of two or more elements that are mixed chemically. This newly formed product has its own characteristics.",
    formations: [
      {
        reactants: "magnesium + oxygen",
        product: "magnesium oxide",
      },
      {
        reactants: "aluminium + oxygen",
        product: "aluminium oxide",
      },
      {
        reactants: "zinc + oxygen",
        product: "zinc oxide",
      },
      {
        reactants: "iron + oxygen",
        product: "iron oxide",
      },
      {
        reactants: "copper + oxygen",
        product: "copper oxide",
      },
      {
        reactants: "iron + sulphur",
        product: "iron sulphide",
      },
    ],
    alkaliMetalNote:
      "There are some metals that react with water to form alkali compounds and release hydrogen gas. These elements are known as alkali metals.",
    massConservationNote:
      "The total mass before and after heating is the same and does not change. Mass is conserved during a chemical change.",
    electrolysisDefinition:
      "Electrolysis is a chemical decomposition of a compound to its elements by passing an electric current through the compound.",
    alkaliFormations: [
      {
        reactants: "lithium + water",
        product: "lithium hydroxide + hydrogen gas",
      },
      {
        reactants: "sodium + water",
        product: "sodium hydroxide + hydrogen gas",
      },
      {
        reactants: "potassium + water",
        product: "potassium hydroxide + hydrogen gas",
      },
    ],
    labels: {
      everyday: "Examples of compounds",
      formation: "How do metal and non-metal elements combine chemically to form a compound?",
      metalEquation: "metal + oxygen → metal oxide",
      before: "Before heating",
      after: "After heating",
      heat: "Heat",
      iron: "Iron powder",
      sulphur: "Sulphur powder",
      mixture: "Mixture",
      compound: "Compound",
      initialMass: "Initial mass",
      finalMass: "Final mass",
      materials: "Materials and apparatus",
      procedure: "Procedure",
      separation: "Methods to Separate Compounds",
      physicalSeparation: "Physical separation",
      chemicalSeparation: "Chemical separation",
      electrolysis: "Electrolysis of water",
      changes: "Physical Change and Chemical Change",
      physical: "Physical change",
      chemical: "Chemical change",
      comparison: "Differences between Mixtures and Compounds",
      characteristic: "Characteristic",
      recall: "Formative Practice 6.3",
      answer: "Answer",
      facts: "Summary",
      terms: "Terms",
      schematic: "Schematic / not to scale",
      table: "Table 6.2",
      answerKey: "Formative Practice 6.3 — Answers",
    },
    examples: ["Salt", "Sugar", "Chalk", "Marble", "Polythene", "Water"],
    everyday: [
      {
        id: "blocks",
        elements: "Carbon + hydrogen",
        compound: "Polythene",
        object: "Building blocks",
      },
      {
        id: "water",
        elements: "Hydrogen + oxygen",
        compound: "Water",
        object: "Water",
      },
      {
        id: "tiles",
        elements: "Calcium + carbon + oxygen",
        compound: "Marble",
        object: "Tiles",
      },
    ],
    rust: "Rust is a compound formed by a chemical reaction between iron and oxygen.",
    mineralNote:
      "All mineral salts that are found in nature exist in the form of compounds due to the chemical reaction that occurs, except for gold, silver and platinum.",
    separation:
      "Compounds cannot be separated physically like mixtures because the elements in a compound are bonded chemically. Therefore, a compound can only be separated chemically by electrolysis.",
    activity610: {
      title: "Activity 6.10",
      instructions: [
        "Work in groups.",
        "Prepare a multimedia presentation on the examples of compounds that exist around you.",
        "Present to your class.",
      ],
    },
    activity611: {
      title: "Activity 6.11",
      materials:
        "Sulphur powder, iron powder, Bunsen burner, crucible with lid, tripod stand, pipeclay triangle, weighing balance.",
      apparatus: [
        {
          id: "lid",
          label: "Lid",
        },
        {
          id: "crucible",
          label: "Crucible",
        },
        {
          id: "triangle",
          label: "Pipeclay triangle",
        },
        {
          id: "tripod",
          label: "Tripod stand",
        },
        {
          id: "burner",
          label: "Bunsen burner",
        },
        {
          id: "balance",
          label: "Weighing balance",
        },
      ],
      steps: [
        "Put one spatula of sulphur powder and one spatula of iron powder into the crucible. Stir well. Record the colour of the mixture.",
        "Weigh the mixture. Record the initial mass.",
        "Heat the mixture until the colour changes.",
        "Let the product cool. Weigh and record the final mass of the product.",
      ],
    },
    activity612: {
      title: "Activity 6.12",
      instructions: [
        "Work in groups.",
        "Compare and contrast between mixtures and compounds.",
        "Include pictures and graphics to show your understanding of this topic.",
        "Prepare a multimedia presentation of your discussion.",
        "Present your discussion in class.",
      ],
    },
    electrolysis: {
      setup: ["Water + sulphuric acid", "Dry cells", "Ammeter"],
      products: [
        {
          id: "anode",
          electrode: "Positive electrode (anode)",
          gas: "Oxygen",
        },
        {
          id: "cathode",
          electrode: "Negative electrode (cathode)",
          gas: "Hydrogen",
        },
      ],
      labels: {
        water: "Water + sulphuric acid",
        battery: "Dry cells",
        ammeter: "Ammeter",
        electrodes: "Electrodes",
      },
    },
    activeRecall: [
      {
        question: "Define compound.",
        answer:
          "A compound consists of two or more elements that are mixed chemically. This newly formed product has its own characteristics.",
      },
      {
        question: "List five examples of compounds.",
        answer: "Salt, Sugar, Chalk, Marble, Polythene.",
      },
      {
        question: "How can you separate a compound?",
        answer:
          "Electrolysis is a chemical decomposition of a compound to its elements by passing an electric current through the compound.",
      },
      {
        question: "State the differences between a mixture and a compound.",
        answer:
          "A mixture is formed physically and does not form a new substance. A compound is formed chemically and forms a new substance.",
      },
    ],
  },
  physicalVsChemicalChange: {
    comparison: [
      {
        characteristic: "New substance",
        physicalChange: "Does not form new substance",
        chemicalChange: "Forms new substance",
      },
      {
        characteristic: "Properties of substances and products",
        physicalChange: "Remain the same",
        chemicalChange: "Not the same",
      },
      {
        characteristic: "Chemical composition",
        physicalChange: "Remains the same",
        chemicalChange: "Different",
      },
      {
        characteristic: "Energy",
        physicalChange: "Needs less energy",
        chemicalChange: "Needs more energy",
      },
    ],
    common: ["Occurs to matter", "Needs energy"],
    physicalExamples: ["Ice melting", "Water freezing", "Water boiling"],
    chemicalExamples: ["Rusting of iron", "Photosynthesis", "Decaying of leaf", "Cell respiration"],
  },
  mixturesVsCompounds: [
    {
      characteristic: "Formation of new substances",
      mixture: "No",
      compound: "Yes",
    },
    {
      characteristic: "Chemical bond",
      mixture: "No",
      compound: "Yes",
    },
    {
      characteristic: "Separation method",
      mixture: "Physical",
      compound: "Chemical",
    },
    {
      characteristic: "Properties of new substances compared to the original",
      mixture: "Same",
      compound: "Different",
    },
    {
      characteristic: "Heat changes during formation",
      mixture: "No heat changes",
      compound: "Heat changes during formation",
    },
    {
      characteristic: "Combination of components",
      mixture: "Components mixed randomly",
      compound: "Elements combine in a fixed proportion",
    },
  ],
  keyExamFacts: [
    "The nucleus has an overall positive charge from its protons. The number of electrons equals the number of protons, making the atom neutral overall.",
    "An element is the simplest form of substance — it cannot be divided into two or more simpler substances, and contains only one type of atom.",
    "A compound consists of two or more elements that are mixed chemically. This newly formed product has its own characteristics.",
    "As the mixture is formed physically, it can be separated physically too.",
    "Seven mixture separation methods: Filtration, Distillation, Separation using magnet, Sedimentation, Floatation, Chromatography, Sieving.",
    "The total mass before and after heating is the same and does not change. Mass is conserved during a chemical change.",
    "Electrolysis is a chemical decomposition of a compound to its elements by passing an electric current through the compound.",
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
    "Separation using magnet",
    "Sieving",
    "Electrolysis",
    "Physical change",
    "Chemical change",
  ],
  chapterSummary:
    "All matter consists of atoms. An element contains one type of atom. Mixtures form and separate physically through the seven methods shown in Figure 6.19, including sieving. Compounds form chemically and are separated chemically. Mass is conserved during chemical change.",
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
      "Campuran terdiri daripada dua atau lebih unsur atau sebatian yang bercampur secara fizikal.",
    examples: [
      "Koktel (pepejal dan cecair)",
      "Air batu campur (pepejal dan cecair)",
      "Salad",
      "Sandwic",
    ],
    physicalSeparation:
      "Disebabkan campuran terbentuk secara fizikal, campuran juga dapat diasingkan secara fizikal.",
    labels: {
      overview: "Kaedah Pengasingan Campuran",
      choose: "Pilih kaedah pemisahan",
      mixture: "Campuran",
      componentA: "Komponen A",
      componentB: "Komponen B",
      physical: "Bercampur secara fizikal",
      separate: "Diasingkan secara fizikal",
      selection: "Teknik pengasingan campuran bergantung pada:",
      method: "Teknik pengasingan",
      property: "Jenis campuran / sifat-sifat fizik",
      example: "Contoh",
      materials: "Bahan dan radas",
      instruction: "Arahan",
      observation: "Pemerhatian",
      practice: "Praktis Formatif 6.2",
      match: "Padankan jenis-jenis campuran di bawah ini dengan kaedah pengasingan yang sesuai.",
      answer: "Jawapan",
      correct: "Betul",
      retry: "Cuba lagi",
      exploration: "Eksplorasi Sains",
      schematic: "Skema / bukan mengikut skala",
    },
    separationMethods: [
      {
        id: "filtration",
        name: "Penurasan",
        usedFor:
          "Mengasingkan bahan pepejal yang tidak larut daripada cecair di dalam suatu campuran antara cecair dan pepejal.",
        example: "Kertas turas memisahkan serdak kopi daripada air kopi.",
        materials:
          "Pasir, air suling, kertas turas, corong turas, bikar 50 ml, spatula, rod kaca, kaki retort dan pengapit.",
        apparatus: [
          {
            id: "mixture",
            label: "Campuran pasir dan air",
          },
          {
            id: "paper",
            label: "Kertas turas",
          },
          {
            id: "funnel",
            label: "Corong turas",
          },
          {
            id: "residue",
            label: "Baki turasan",
          },
          {
            id: "filtrate",
            label: "Hasil turasan",
          },
          {
            id: "rod",
            label: "Rod kaca",
          },
          {
            id: "stand",
            label: "Kaki retort dan pengapit",
          },
          {
            id: "beaker",
            label: "Bikar 50 ml",
          },
          {
            id: "spatula",
            label: "Spatula",
          },
        ],
        steps: [
          "Masukkan 30 ml air dan dua spatula pasir ke dalam sebuah bikar. Kacau selama dua minit.",
          "Turas campuran tersebut.",
          "Catatkan pemerhatian anda.",
        ],
        observation:
          "Pasir yang tidak larut kekal sebagai baki turasan; air melalui kertas turas sebagai hasil turasan.",
        notes: [],
        activity: "6.4",
      },
      {
        id: "distillation",
        name: "Penyulingan",
        usedFor:
          "Mengasingkan campuran cecair dan cecair yang terlarut campur dan mempunyai takat didih berbeza.",
        example:
          "Memisahkan air dan alkohol; menghasilkan minyak wangi daripada kelopak bunga ros.",
        materials:
          "Campuran air dan alkohol, serpihan porselin, termometer, bikar, tungku kaki tiga, penunu Bunsen, kasa dawai, kondenser Liebig, kaki retort dengan pengapit, kelalang dasar bulat.",
        apparatus: [
          {
            id: "flask",
            label: "Kelalang dasar bulat",
          },
          {
            id: "mixture",
            label: "Air + alkohol",
          },
          {
            id: "chips",
            label: "Serpihan porselin",
          },
          {
            id: "thermometer",
            label: "Termometer",
          },
          {
            id: "burner",
            label: "Penunu Bunsen",
          },
          {
            id: "gauze",
            label: "Kasa dawai",
          },
          {
            id: "tripod",
            label: "Tungku kaki tiga",
          },
          {
            id: "condenser",
            label: "Kondenser Liebig",
          },
          {
            id: "in",
            label: "Air masuk",
          },
          {
            id: "out",
            label: "Air keluar",
          },
          {
            id: "beaker",
            label: "Bikar",
          },
          {
            id: "stand",
            label: "Kaki retort dengan pengapit",
          },
        ],
        steps: [
          "Isi kelalang dasar bulat sehingga separuh penuh dengan air dan alkohol. Tambahkan serpihan porselin. Alirkan air paip melalui kondenser Liebig.",
          "Panaskan campuran: komponen dengan takat didih lebih rendah menjadi wap dan memasuki kondenser.",
          "Wap menyejuk di dalam kondenser. Kumpulkan cecair menggunakan bikar.",
        ],
        observation:
          "Rekodkan suhu cecair ketika cecair mula keluar dari kondenser. Tentukan takat didih cecair tersebut.",
        notes: [],
        activity: "6.5",
      },
      {
        id: "magnet",
        name: "Pemisahan menggunakan magnet",
        usedFor:
          "Mengasingkan dua bahan pepejal yang bersifat bahan magnet dan tidak bersifat bahan magnet.",
        example: "Paku besi dipisahkan daripada pasir.",
        materials:
          "Campuran serbuk besi dan serbuk sulfur, spatula, piring Petri, magnet bar, kertas.",
        apparatus: [
          {
            id: "iron",
            label: "Serbuk besi",
          },
          {
            id: "sulphur",
            label: "Serbuk sulfur",
          },
          {
            id: "dish",
            label: "Piring Petri",
          },
          {
            id: "paper",
            label: "Kertas",
          },
          {
            id: "magnet",
            label: "Magnet bar",
          },
          {
            id: "spatula",
            label: "Spatula",
          },
        ],
        steps: [
          "Letakkan satu spatula campuran serbuk besi dan serbuk sulfur ke dalam piring Petri.",
          "Letakkan magnet bar dekat dengan campuran tersebut.",
          "Serbuk besi tertarik pada magnet; serbuk sulfur tertinggal di dalam piring Petri.",
        ],
        observation: "Bahan-bahan bercampur secara fizikal.",
        notes: [
          "Besi, nikel dan kobalt ialah logam yang bersifat bahan magnet.",
          "Emas, gangsa dan aluminium ialah logam yang tidak bersifat magnet.",
        ],
        activity: "6.6",
      },
      {
        id: "sedimentation",
        name: "Pengenapan",
        usedFor:
          "Mengasingkan campuran cecair dan bahan pepejal yang tidak larut dalam cecair itu dan terenap di dasar.",
        example:
          "Pasir tidak larut di dalam air dan mempunyai ketumpatan yang lebih tinggi daripada air.",
        materials: "Larutan berkelodak, dua bikar 100 ml, rod kaca.",
        apparatus: [
          {
            id: "mixture",
            label: "Larutan berkelodak",
          },
          {
            id: "water",
            label: "Air jernih",
          },
          {
            id: "sediment",
            label: "Kelodak",
          },
          {
            id: "rod",
            label: "Rod kaca",
          },
          {
            id: "beaker",
            label: "Bikar 100 ml",
          },
        ],
        steps: [
          "Masukkan 50 ml air berkelodak ke dalam bikar 100 ml. Kacau menggunakan rod kaca.",
          "Perhatikan air dan kelodak selepas seketika.",
          "Tuangkan air jernih secara perlahan-lahan ke dalam bikar yang lain. Perhatikan baki yang tertinggal di dasar bikar.",
        ],
        observation:
          "Bahan pepejal yang tidak larut terenap di dasar; air jernih berada di bahagian atas.",
        notes: [],
        activity: "6.7",
      },
      {
        id: "floatation",
        name: "Pengapungan",
        usedFor:
          "Kaedah pengapungan boleh digunakan untuk mengasingkan bahan yang tidak larut dan terapung di atas permukaan air.",
        example: "Minyak terapung di atas air dan dapat diasingkan menggunakan corong pemisah.",
        materials: "Campuran air dan minyak, bikar dan corong pemisah.",
        apparatus: [
          {
            id: "oil",
            label: "Minyak",
          },
          {
            id: "water",
            label: "Air",
          },
          {
            id: "funnel",
            label: "Corong pemisah",
          },
          {
            id: "tap",
            label: "Pili",
          },
          {
            id: "beaker",
            label: "Bikar",
          },
          {
            id: "stand",
            label: "Kaki retort dan pengapit",
          },
        ],
        steps: [
          "Tuang 100 ml campuran air dan minyak ke dalam sebuah bikar. Catatkan pemerhatian.",
          "Masukkan campuran ke dalam corong pemisah. Minyak berada di atas air.",
          "Asingkan air dan minyak menggunakan bikar yang berbeza. Air mengalir keluar melalui pili.",
        ],
        observation:
          "Minyak mempunyai ketumpatan yang lebih rendah daripada air. Oleh itu, minyak terapung di atas permukaan air.",
        notes: [],
        activity: "6.8",
      },
      {
        id: "chromatography",
        name: "Kromatografi",
        usedFor:
          "Mengasingkan jumlah campuran yang sedikit dengan mengasingkan pewarna-pewarna dalam dakwat pen.",
        example:
          "Memeriksa pemalsuan dokumen dengan mengasingkan pewarna dakwat; memeriksa bahan pewarna makanan yang berbahaya.",
        materials:
          "Bikar 250 ml, air suling, kertas turas, pembaris, pen penanda papan putih; lidi ditunjukkan dalam Rajah 6.27.",
        apparatus: [
          {
            id: "paper",
            label: "Kertas turas: 5 cm × 12 cm",
          },
          {
            id: "baseline",
            label: "Garis pensel: 1.5 cm dari tepi kertas",
          },
          {
            id: "dots",
            label: "Titik-titik dakwat",
          },
          {
            id: "water",
            label: "Air suling",
          },
          {
            id: "beaker",
            label: "Bikar 250 ml",
          },
          {
            id: "skewer",
            label: "Lidi",
          },
          {
            id: "ruler",
            label: "Pembaris",
          },
          {
            id: "pens",
            label: "Pen penanda papan putih",
          },
        ],
        steps: [
          "Sediakan kertas dan garis pensel. Buat tiga titik dakwat. Gantungkan kertas menggunakan lidi. Pastikan air suling tidak terkena pada titik-titik dakwat.",
          "Air bergerak ke atas kertas, mengasingkan komponen dakwat. Perhatikan selama 30 minit.",
          "Rekodkan pemerhatian anda. Apakah warna yang terhasil pada kertas turas?",
        ],
        observation: "Adakah warna-warna yang terhasil sama pada setiap dakwat pen yang digunakan?",
        notes: [
          "Sampel air kencing diuji untuk mengesan kandungan dadah dalam badan dengan menggunakan kaedah kromatografi.",
        ],
        activity: "6.9",
      },
      {
        id: "sieving",
        name: "Penapisan",
        usedFor: "Mengasingkan bahan bendasing daripada tepung dengan mengayak tepung.",
        example: "Bahan bendasing dapat diasingkan daripada tepung dengan mengayak tepung.",
        materials: "Tepung dan bahan bendasing; pengayak.",
        apparatus: [
          {
            id: "flour",
            label: "Tepung",
          },
          {
            id: "impurities",
            label: "Bahan bendasing",
          },
          {
            id: "sieve",
            label: "Pengayak",
          },
        ],
        steps: [
          "Tepung dan bahan bendasing.",
          "Ayak tepung.",
          "Tepung halus melalui pengayak; bahan bendasing yang lebih besar tertinggal.",
        ],
        observation: "Bahan bendasing diasingkan daripada tepung.",
        notes: [],
      },
    ],
    selectionFactors: [
      "Sifat-sifat fizik dan keadaan jirim bahan-bahan yang terkandung dalam campuran",
      "Bahan yang hendak diperoleh daripada campuran tersebut",
    ],
    decision: [
      "Bahan-bahan dalam campuran",
      "Sifat-sifat fizik dan keadaan jirim",
      "Bahan yang hendak diperoleh",
      "Pilih kaedah pemisahan",
    ],
    formativePractice: [
      {
        mixture: "Klip kertas besi dan serpihan kaca",
        method: "magnet",
      },
      {
        mixture: "Air dan etanol",
        method: "distillation",
      },
      {
        mixture: "Tiga jenis pewarna yang larut air",
        method: "chromatography",
      },
      {
        mixture: "Tanah dan air",
        method: "sedimentation",
      },
      {
        mixture: "Minyak dan air",
        method: "floatation",
      },
      {
        mixture: "Serbuk kopi dan air",
        method: "filtration",
      },
    ],
    reasoning: {
      question:
        "Jika anda diberi suatu campuran yang mengandungi beras dan pasir, bolehkah anda mengasingkan kedua-duanya dengan menggunakan kaedah penurasan? Mengapa?",
      answer:
        "Tidak. Beras dan pasir ialah pepejal. Penurasan mengasingkan bahan pepejal yang tidak larut daripada cecair.",
    },
  },
  compounds: {
    definition:
      "Sebatian terdiri daripada dua atau lebih unsur yang bercampur secara kimia. Bahan baharu yang terbentuk ini mempunyai ciri-ciri tersendiri yang berbeza daripada unsur-unsur yang membentuknya.",
    formations: [
      {
        reactants: "magnesium + oksigen",
        product: "magnesium oksida",
      },
      {
        reactants: "aluminium + oksigen",
        product: "aluminium oksida",
      },
      {
        reactants: "zink + oksigen",
        product: "zink oksida",
      },
      {
        reactants: "besi + oksigen",
        product: "besi oksida",
      },
      {
        reactants: "kuprum + oksigen",
        product: "kuprum oksida",
      },
      {
        reactants: "besi + sulfur",
        product: "besi sulfida",
      },
    ],
    alkaliMetalNote:
      "Terdapat unsur logam yang bertindak balas dengan air untuk menghasilkan sebatian yang bersifat alkali dan membebaskan gas hidrogen. Unsur-unsur tersebut disebut sebagai logam alkali.",
    massConservationNote:
      "Jisim campuran sebelum dan selepas dipanaskan adalah sama dan tidak berubah. Jisim diabadikan semasa perubahan kimia.",
    electrolysisDefinition:
      "Elektrolisis ialah proses penguraian sesuatu sebatian kepada unsur-unsurnya apabila arus elektrik mengalir melaluinya.",
    alkaliFormations: [
      {
        reactants: "litium + air",
        product: "litium hidroksida + gas hidrogen",
      },
      {
        reactants: "natrium + air",
        product: "natrium hidroksida + gas hidrogen",
      },
      {
        reactants: "kalium + air",
        product: "kalium hidroksida + gas hidrogen",
      },
    ],
    labels: {
      everyday: "Contoh-contoh sebatian dalam kehidupan harian",
      formation:
        "Bagaimanakah unsur logam dan unsur bukan logam bergabung secara kimia dan membentuk suatu sebatian?",
      metalEquation: "logam + oksigen → logam oksida",
      before: "Sebelum pemanasan",
      after: "Selepas pemanasan",
      heat: "Panaskan",
      iron: "Serbuk besi",
      sulphur: "Serbuk sulfur",
      mixture: "Campuran",
      compound: "Sebatian",
      initialMass: "Jisim awal",
      finalMass: "Jisim akhir",
      materials: "Bahan dan radas",
      procedure: "Arahan",
      separation: "Kaedah Pengasingan Sebatian",
      physicalSeparation: "Kaedah fizikal",
      chemicalSeparation: "Kaedah kimia",
      electrolysis: "Elektrolisis air",
      changes: "Perubahan Fizik dan Perubahan Kimia",
      physical: "Perubahan fizik",
      chemical: "Perubahan kimia",
      comparison: "Perbezaan antara Campuran dengan Sebatian",
      characteristic: "Perbezaan",
      recall: "Praktis Formatif 6.3",
      answer: "Jawapan",
      facts: "Rumusan",
      terms: "Istilah",
      schematic: "Skema / bukan mengikut skala",
      table: "Jadual 6.2",
      answerKey: "Praktis Formatif 6.3 — Jawapan",
    },
    examples: ["Garam", "Gula", "Kapur tulis", "Marmar", "Politena", "Air tulen"],
    everyday: [
      {
        id: "blocks",
        elements: "Karbon + hidrogen",
        compound: "Politena",
        object: "Permainan blok",
      },
      {
        id: "water",
        elements: "Hidrogen + oksigen",
        compound: "Air tulen",
        object: "Air tulen",
      },
      {
        id: "tiles",
        elements: "Kalsium + karbon + oksigen",
        compound: "Marmar",
        object: "Jubin",
      },
    ],
    rust: "Karat merupakan contoh sebatian yang terbentuk daripada tindak balas kimia antara besi dengan oksigen.",
    mineralNote:
      "Semua garam mineral yang dijumpai di Bumi wujud dalam bentuk sebatian akibat daripada tindak balas kimia yang berlaku, kecuali emas, perak dan platinum.",
    separation:
      "Sebatian tidak dapat diasingkan melalui kaedah fizikal seperti campuran kerana unsur-unsur dalam sebatian telah digabungkan secara kimia. Oleh itu, sebatian hanya boleh diasingkan menggunakan kaedah kimia melalui proses elektrolisis.",
    activity610: {
      title: "Aktiviti 6.10",
      instructions: [
        "Lakukan aktiviti ini secara berkumpulan.",
        "Buat satu persembahan multimedia mengenai contoh-contoh sebatian yang wujud di sekeliling anda.",
        "Persembahkan kepada rakan-rakan sekelas dan guru.",
      ],
    },
    activity611: {
      title: "Aktiviti 6.11",
      materials:
        "Serbuk sulfur, serbuk besi, penunu Bunsen, mangkuk pijar dengan penutup, tungku kaki tiga, alas segi tiga tanah liat, penimbang.",
      apparatus: [
        {
          id: "lid",
          label: "Penutup",
        },
        {
          id: "crucible",
          label: "Mangkuk pijar",
        },
        {
          id: "triangle",
          label: "Alas segi tiga tanah liat",
        },
        {
          id: "tripod",
          label: "Tungku kaki tiga",
        },
        {
          id: "burner",
          label: "Penunu Bunsen",
        },
        {
          id: "balance",
          label: "Penimbang",
        },
      ],
      steps: [
        "Masukkan satu spatula serbuk sulfur dan satu spatula serbuk besi ke dalam mangkuk pijar. Kacau sehingga sebati. Catatkan warna campuran.",
        "Timbang campuran. Catatkan jisim awal campuran.",
        "Panaskan campuran sehingga campuran itu bertukar warna.",
        "Sejukkan hasil yang diperoleh. Timbang dan catatkan jisim akhir bahan tersebut.",
      ],
      safety: "Aktiviti haruslah dijalankan di dalam kebuk wasap.",
    },
    activity612: {
      title: "Aktiviti 6.12",
      instructions: [
        "Lakukan aktiviti ini secara berkumpulan.",
        "Bincangkan perbandingan antara campuran dengan sebatian.",
        "Masukkan gambar dan lukisan grafik untuk menunjukkan pemahaman anda.",
        "Buat satu persembahan multimedia tentang hasil perbincangan anda.",
        "Bentangkan di hadapan guru dan rakan-rakan.",
      ],
    },
    electrolysis: {
      setup: ["Air + larutan asid sulfurik", "Sel kering", "Ammeter"],
      products: [
        {
          id: "anode",
          electrode: "Elektrod positif (anod)",
          gas: "Oksigen",
        },
        {
          id: "cathode",
          electrode: "Elektrod negatif (katod)",
          gas: "Hidrogen",
        },
      ],
      labels: {
        water: "Air + larutan asid sulfurik",
        battery: "Sel kering",
        ammeter: "Ammeter",
        electrodes: "Elektrod",
      },
    },
    activeRecall: [
      {
        question: "Berikan definisi sebatian.",
        answer:
          "Sebatian terdiri daripada dua atau lebih unsur yang bercampur secara kimia. Bahan baharu yang terbentuk ini mempunyai ciri-ciri tersendiri yang berbeza daripada unsur-unsur yang membentuknya.",
      },
      {
        question: "Senaraikan lima contoh sebatian dalam kehidupan harian anda.",
        answer: "Garam, Gula, Kapur tulis, Marmar, Politena.",
      },
      {
        question: "Bagaimanakah anda boleh mengasingkan sebatian?",
        answer:
          "Elektrolisis ialah proses penguraian sesuatu sebatian kepada unsur-unsurnya apabila arus elektrik mengalir melaluinya.",
      },
      {
        question: "Nyatakan perbezaan antara campuran dengan sebatian.",
        answer:
          "Campuran terbentuk secara fizikal dan tidak membentuk bahan baharu. Sebatian terbentuk secara kimia dan membentuk bahan baharu.",
      },
    ],
  },
  physicalVsChemicalChange: {
    comparison: [
      {
        characteristic: "Bahan baharu",
        physicalChange: "Tidak membentuk bahan baharu",
        chemicalChange: "Membentuk bahan baharu",
      },
      {
        characteristic: "Sifat bahan dan hasil",
        physicalChange: "Sama",
        chemicalChange: "Berbeza",
      },
      {
        characteristic: "Komposisi kimia bahan dan hasil",
        physicalChange: "Sama",
        chemicalChange: "Berbeza",
      },
      {
        characteristic: "Tenaga",
        physicalChange: "Memerlukan tenaga yang sedikit",
        chemicalChange: "Memerlukan tenaga yang banyak",
      },
    ],
    common: ["Berlaku kepada jirim", "Perubahan tenaga berlaku"],
    physicalExamples: ["Peleburan ais", "Pembekuan air", "Kondensasi", "Pendidihan air"],
    chemicalExamples: ["Pengaratan besi", "Fotosintesis", "Pereputan daun", "Respirasi sel"],
  },
  mixturesVsCompounds: [
    {
      characteristic: "Pembentukan bahan baharu",
      mixture: "Tidak",
      compound: "Ya",
    },
    {
      characteristic: "Ikatan kimia terbentuk",
      mixture: "Tiada",
      compound: "Ya",
    },
    {
      characteristic: "Kaedah pengasingan",
      mixture: "Kaedah fizikal",
      compound: "Kaedah kimia",
    },
    {
      characteristic: "Sifat bahan baharu berbanding dengan sifat asal",
      mixture: "Tiada perbezaan",
      compound: "Ada perbezaan",
    },
    {
      characteristic: "Perubahan haba semasa pembentukan",
      mixture: "Tiada perubahan haba",
      compound: "Haba diserap",
    },
    {
      characteristic: "Penggabungan komponen",
      mixture: "Komponen dicampur pada sebarang nisbah",
      compound: "Unsur yang membentuk sebatian berpadu mengikut nisbah tetap",
    },
  ],
  keyExamFacts: [
    "Nukleus mempunyai cas positif keseluruhan daripada proton. Bilangan elektron sama dengan bilangan proton, menjadikan atom neutral secara keseluruhan.",
    "Unsur ialah bahan yang paling ringkas — tidak boleh diuraikan secara kimia kepada dua atau lebih bahan yang lebih ringkas, dan mengandungi hanya satu jenis atom.",
    "Sebatian terdiri daripada dua atau lebih unsur yang bercampur secara kimia. Bahan baharu yang terbentuk ini mempunyai ciri-ciri tersendiri yang berbeza daripada unsur-unsur yang membentuknya.",
    "Disebabkan campuran terbentuk secara fizikal, campuran juga dapat diasingkan secara fizikal.",
    "Tujuh teknik pengasingan campuran: Penurasan, Penyulingan, Pemisahan menggunakan magnet, Pengenapan, Pengapungan, Kromatografi, Penapisan.",
    "Jisim campuran sebelum dan selepas dipanaskan adalah sama dan tidak berubah. Jisim diabadikan semasa perubahan kimia.",
    "Elektrolisis ialah proses penguraian sesuatu sebatian kepada unsur-unsurnya apabila arus elektrik mengalir melaluinya.",
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
    "Pemisahan menggunakan magnet",
    "Penapisan",
    "Elektrolisis",
    "Perubahan fizik",
    "Perubahan kimia",
  ],
  chapterSummary:
    "Semua jirim terdiri daripada atom. Unsur mengandungi satu jenis atom. Campuran terbentuk dan diasingkan secara fizikal melalui tujuh teknik pengasingan yang ditunjukkan dalam Rajah 6.19, termasuk penapisan. Sebatian terbentuk secara kimia dan diasingkan melalui kaedah kimia. Jisim diabadikan semasa perubahan kimia.",
};

export const chapter6Content = { en, bm };

// Reference-only compatibility view. Live 6.3 reads audited compounds directly.
export type Chapter6Supplement = Pick<
  Chapter6Content["compounds"],
  "electrolysis" | "activeRecall"
>;
export const chapter6Supplement: { en: Chapter6Supplement; bm: Chapter6Supplement } = {
  en: { electrolysis: en.compounds.electrolysis, activeRecall: en.compounds.activeRecall },
  bm: { electrolysis: bm.compounds.electrolysis, activeRecall: bm.compounds.activeRecall },
};
export default chapter6Content;
