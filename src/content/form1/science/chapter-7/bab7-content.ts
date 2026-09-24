// bab7-content.ts
// Source-verified content for Chapter 7 / Bab 7 — Air / Udara
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 194-218)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 194-218, official KSSM counterpart)
// This is content data only — no presentation markup. Components read from this.

export interface CompositionGasEntry {
  color: string; // hex, matches donut segment
  name: string;
  percentage: string;
}

export interface RevealCard {
  chipLabel: string;
  accent: "violet" | "amber" | "blue";
  body: string;
}

export interface CompositionSection {
  legend: CompositionGasEntry[];
  reveals: RevealCard[];
}

export interface ExperimentStep {
  emoji: string;
  caption: string;
}

export interface PredictOption {
  label: string;
  correct: boolean;
}

export interface ExperimentSection {
  aim: string;
  steps: ExperimentStep[];
  predictQuestion: string;
  predictOptions: PredictOption[];
  predictFeedback: string;
}

export interface GasUseItem {
  icon: string;
  label: string;
  sub?: string;
}

export interface GasTab {
  symbol: string;
  name: string;
  uses: GasUseItem[];
}

export interface UsesSection {
  tabs: GasTab[];
}

export interface CycleBox {
  heading: string;
  steps: string[];
}

export interface CyclesSection {
  carbonCycle: CycleBox;
  oxygenCycle: CycleBox;
  balanceActions: string[];
}

export interface MethodCard {
  icon: string;
  heading: string;
  body: string;
}

export interface ExtinguisherRow {
  material: string;
  examples: string;
  extinguishers: string[];
}

export type FireCondition = "heat" | "oxygen" | "fuel";
export interface CombustionInvestigation {
  id: FireCondition;
  heading: string;
  apparatus: string[];
  procedure: string[];
  observation: string;
  observationIsQuestion: boolean;
  conclusion: string;
}
export interface CombustionLesson {
  triangleTitle: string;
  required: string;
  stopped: string;
  remove: string;
  reset: string;
  activityTitle: string;
  aim: string;
  investigations: CombustionInvestigation[];
  fuelMaterials: { id: string; label: string; isFuel: boolean }[];
  fuel: string;
  nonFuel: string;
  labels: {
    apparatus: string;
    setup: string;
    observation: string;
    conclusion: string;
    before: string;
    after: string;
    test: string;
    coldMatch: string;
    ordinaryMatch: string;
    matchbox: string;
  };
  extinguisherTitle: string;
  tableTitle: string;
  tableHeaders: string[];
  oilTitle: string;
  oilWarning: string;
  oilLabels: string[];
  methodsTitle: string;
  blanketTitle: string;
  blanket: string;
  blanketSteps: string[];
  preventionTitle: string;
  poster: { title: string; aim: string; instructions: string[] };
  practiceTitle: string;
  questions: string[];
  paraffinAnswer: string;
}
export interface CombustionSection {
  lesson: CombustionLesson;
  definition: string;
  triangle: { heat: string; oxygen: string; fuel: string };
  methods: (MethodCard & { removes: FireCondition })[];
  extinguisherTable: ExtinguisherRow[];
  safetyChecklist: string[];
}

export interface SourceCard {
  from: string;
  pollutants: string[];
}

export interface EffectCategory {
  heading: string;
  category: "health" | "buildings" | "plants" | "climate";
  items: string[];
}

export interface PreventCategory {
  heading: string;
  items: string[];
}

export interface ApiRow {
  range: string;
  label: string;
  severity: "good" | "moderate" | "unhealthy" | "veryUnhealthy" | "hazardous";
}

export interface AirCycle {
  definition: string;
  nodes: { id: string; label: string }[];
  edges: {
    id: string;
    from: string;
    to: string;
    label: string;
    role: "uses" | "returns" | "transfer";
  }[];
  legend: { uses: string; returns: string };
}
export interface AirLesson {
  title: string;
  subtopics: { code: string; title: string }[];
  compositionTitle: string;
  variableTitle: string;
  mixtureTitle: string;
  distillation: string[];
  activityTitle: string;
  apparatus: { id: string; label: string }[];
  stages: string[];
  stageCaptions: string[];
  apparatusLabel: string;
  procedureLabel: string;
  originalWater: string;
  finalWater: string;
  estimate: string;
  chartOxygen: string;
  usesTitle: string;
  carbon: AirCycle;
  oxygen: AirCycle;
  research: { title: string; aim: string; instructions: string[] };
  interference: { title: string; causes: string[]; increase: string; effects: string[] };
  practice: { title: string; questions: string[] };
}

export interface Bab7Content {
  airLesson: AirLesson;
  hook: { title: string; body: string };
  composition: CompositionSection;
  experiment: ExperimentSection;
  uses: UsesSection;
  cycles: CyclesSection;
  combustion: CombustionSection;
  pollutionSources: SourceCard[];
  pollutionEffects: EffectCategory[];
  prevention: PreventCategory[];
  api: ApiRow[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Bab7Content = {
  airLesson: {
    title: "Air",
    subtopics: [
      {
        code: "7.1",
        title: "Composition of Air",
      },
      {
        code: "7.2",
        title: "Combustion",
      },
      {
        code: "7.3",
        title: "Air Pollution",
      },
    ],
    compositionTitle: "Composition of air",
    variableTitle: "Other components",
    mixtureTitle: "Is Air a Mixture?",
    distillation: [
      "Liquid mixture",
      "Fractions with different boiling points",
      "Boiling and condensation",
    ],
    activityTitle: "Activity 7.1",
    apparatus: [
      {
        id: "candle",
        label: "Candle",
      },
      {
        id: "plasticine",
        label: "Plasticine",
      },
      {
        id: "matches",
        label: "Matches",
      },
      {
        id: "basin",
        label: "Glass basin",
      },
      {
        id: "marker",
        label: "Permanent marker",
      },
      {
        id: "jar",
        label: "Gas jar",
      },
      {
        id: "stand",
        label: "Gas jar stand",
      },
      {
        id: "water",
        label: "Water",
      },
    ],
    stages: ["Before", "During", "After"],
    stageCaptions: [
      "Light the candle. The gas jar is marked into five equal parts.",
      "Invert the gas jar over the burning candle.",
      "The flame extinguishes. Water rises to one fifth of the gas jar.",
    ],
    apparatusLabel: "Materials and apparatus",
    procedureLabel: "Procedure",
    originalWater: "Original water level",
    finalWater: "Water rises by 1/5",
    estimate: "Activity 7.1: 1/5 ≈ 20% oxygen",
    chartOxygen: "Composition of air: 21% oxygen",
    usesTitle: "Importance of Gases in Daily Life",
    carbon: {
      definition:
        "The carbon cycle maintains the carbon dioxide content in the air by continuously taking carbon dioxide from the air and returning it to the air.",
      nodes: [
        {
          id: "atmosphere",
          label: "Carbon dioxide in the atmosphere",
        },
        {
          id: "plants",
          label: "Green plants",
        },
        {
          id: "animals",
          label: "Animals",
        },
        {
          id: "dead",
          label: "Dead organisms",
        },
        {
          id: "fossil",
          label: "Fossil fuels: petroleum, natural gas and coal",
        },
      ],
      edges: [
        {
          id: "photosynthesis",
          from: "atmosphere",
          to: "plants",
          label: "Photosynthesis",
          role: "uses",
        },
        {
          id: "plant-respiration",
          from: "plants",
          to: "atmosphere",
          label: "Respiration",
          role: "returns",
        },
        {
          id: "animal-respiration",
          from: "animals",
          to: "atmosphere",
          label: "Respiration",
          role: "returns",
        },
        {
          id: "feeding",
          from: "plants",
          to: "animals",
          label: "Eaten",
          role: "transfer",
        },
        {
          id: "plant-death",
          from: "plants",
          to: "dead",
          label: "Dead organisms",
          role: "transfer",
        },
        {
          id: "animal-death",
          from: "animals",
          to: "dead",
          label: "Dead organisms",
          role: "transfer",
        },
        {
          id: "decomposition",
          from: "dead",
          to: "atmosphere",
          label: "Decomposition: bacteria and fungi",
          role: "returns",
        },
        {
          id: "formation",
          from: "dead",
          to: "fossil",
          label: "Formation",
          role: "transfer",
        },
        {
          id: "combustion",
          from: "fossil",
          to: "atmosphere",
          label: "Combustion of fossil fuels",
          role: "returns",
        },
      ],
      legend: {
        uses: "Uses carbon dioxide",
        returns: "Releases carbon dioxide",
      },
    },
    oxygen: {
      definition:
        "The oxygen cycle involves taking oxygen from the air and returning oxygen to the air continuously.",
      nodes: [
        {
          id: "oxygen",
          label: "Oxygen in the atmosphere",
        },
        {
          id: "plants",
          label: "Green plants",
        },
        {
          id: "carbon",
          label: "Carbon dioxide in the atmosphere",
        },
        {
          id: "respiration",
          label: "Respiration",
        },
        {
          id: "rusting",
          label: "Rusting",
        },
        {
          id: "combustion",
          label: "Combustion",
        },
        {
          id: "decomposition",
          label: "Decomposition of waste and dead organisms",
        },
      ],
      edges: [
        {
          id: "photosynthesis",
          from: "plants",
          to: "oxygen",
          label: "Photosynthesis",
          role: "returns",
        },
        {
          id: "carbon-uptake",
          from: "carbon",
          to: "plants",
          label: "Photosynthesis",
          role: "transfer",
        },
        {
          id: "respiration",
          from: "oxygen",
          to: "respiration",
          label: "Respiration",
          role: "uses",
        },
        {
          id: "rusting",
          from: "oxygen",
          to: "rusting",
          label: "Rusting",
          role: "uses",
        },
        {
          id: "combustion",
          from: "oxygen",
          to: "combustion",
          label: "Combustion",
          role: "uses",
        },
        {
          id: "decomposition",
          from: "oxygen",
          to: "decomposition",
          label: "Decomposition",
          role: "uses",
        },
        {
          id: "respiration-carbon",
          from: "respiration",
          to: "carbon",
          label: "Respiration",
          role: "transfer",
        },
        {
          id: "combustion-carbon",
          from: "combustion",
          to: "carbon",
          label: "Combustion",
          role: "transfer",
        },
        {
          id: "decomposition-carbon",
          from: "decomposition",
          to: "carbon",
          label: "Decomposition",
          role: "transfer",
        },
      ],
      legend: {
        uses: "Uses oxygen",
        returns: "Releases oxygen",
      },
    },
    research: {
      title: "Activity 7.2",
      aim: "Interpret and share information on the importance of gases in daily life, the oxygen cycle and the carbon cycle.",
      instructions: [
        "Carry out this activity in groups.",
        "Find information on the importance of oxygen, carbon dioxide, nitrogen and inert gases in daily life.",
        "Record the information in a suitable thinking map.",
        "Find information about the oxygen cycle and carbon cycle. How do these cycles maintain the percentage of gases in the atmosphere?",
        "Present it in class.",
      ],
    },
    interference: {
      title: "Steps to Prevent Interference in the Oxygen Cycle and Carbon Cycle",
      causes: ["Logging", "Uncontrolled use of pesticides in agriculture"],
      increase: "Increase in carbon dioxide; interference in the oxygen cycle and carbon cycle",
      effects: ["Global warming", "Greenhouse effect"],
    },
    practice: {
      title: "Formative Practice 7.1",
      questions: [
        "List the composition of air.",
        "How do you identify oxygen and carbon dioxide gases?",
        "What is the importance of carbon dioxide to plants?",
        "What is the effect of an increase in carbon dioxide in the air on humans?",
        "Suggest ways to maintain the balance of carbon dioxide and oxygen in the air.",
      ],
    },
  },
  hook: {
    title: "Air",
    body: "Clean air has no colour and smell. Air is a mixture of gases.",
  },
  composition: {
    legend: [
      {
        color: "#4fb0ff",
        name: "Nitrogen",
        percentage: "78%",
      },
      {
        color: "#8b6bff",
        name: "Oxygen",
        percentage: "21%",
      },
      {
        color: "#fbbf5a",
        name: "Carbon dioxide",
        percentage: "0.03%",
      },
      {
        color: "#4ade80",
        name: "Inert gases",
        percentage: "0.97%",
      },
    ],
    reveals: [
      {
        chipLabel: "Other components",
        accent: "violet",
        body: "Air also contains water vapour, dust and microorganisms in small quantities. The quantity of these components varies with place and time. For example, forests or areas after rain have more water vapour than on a hot day.",
      },
      {
        chipLabel: "Inert gases",
        accent: "amber",
        body: "Helium, argon, neon, xenon and krypton.",
      },
      {
        chipLabel: "Is Air a Mixture?",
        accent: "blue",
        body: "Air is a mixture because the components of air can be separated by a physical method, which is fractional distillation. Fractional distillation separates a liquid mixture into fractions with different boiling points through boiling and condensation.",
      },
    ],
  },
  experiment: {
    aim: "To determine the percentage of oxygen in the air",
    steps: [
      {
        emoji: "",
        caption: "Prepare the apparatus as shown in Figure 7.2(a).",
      },
      {
        emoji: "",
        caption: "Divide the gas jar into five equal parts and mark with a permanent marker.",
      },
      {
        emoji: "",
        caption: "Light the candle and invert the gas jar over it.",
      },
      {
        emoji: "",
        caption: "Record the change in water level when the flame extinguishes.",
      },
      {
        emoji: "",
        caption: "Make a conclusion on the percentage of oxygen in the air.",
      },
    ],
    predictQuestion: "What is the percentage of oxygen in the air based on this activity?",
    predictOptions: [],
    predictFeedback:
      "The water level rises to one fifth of the gas jar. Approximately 20% of air is oxygen. Only oxygen in the air is used during combustion.",
  },
  uses: {
    tabs: [
      {
        symbol: "O₂",
        name: "Oxygen",
        uses: [
          {
            icon: "🫁",
            label: "Respiration",
          },
          {
            icon: "🚀",
            label: "Combustion of rocket engines at high altitudes",
          },
          {
            icon: "⚡",
            label: "Welding and steel cutting in industries",
          },
          {
            icon: "🧪",
            label: "Preparation of various compounds",
          },
        ],
      },
      {
        symbol: "CO₂",
        name: "Carbon dioxide",
        uses: [
          {
            icon: "🌿",
            label: "Photosynthesis",
          },
          {
            icon: "🥤",
            label: "Manufacture of carbonated drinks",
          },
          {
            icon: "🧯",
            label: "Fire extinguishers",
          },
          {
            icon: "🔄",
            label: "Carbon cycle",
          },
        ],
      },
      {
        symbol: "N₂",
        name: "Nitrogen",
        uses: [
          {
            icon: "🧪",
            label: "Production of nitric acid and ammonia",
            sub: "Nitrogen fertiliser",
          },
          {
            icon: "🔄",
            label: "Nitrogen cycle",
          },
          {
            icon: "❄️",
            label: "Liquid nitrogen as a cooling agent",
          },
        ],
      },
      {
        symbol: "◆",
        name: "Inert gases",
        uses: [
          {
            icon: "🎈",
            label: "Helium",
            sub: "Hot-air balloons and weather balloons",
          },
          {
            icon: "💡",
            label: "Neon",
            sub: "Advertising lights",
          },
          {
            icon: "💡",
            label: "Argon",
            sub: "Light bulbs",
          },
        ],
      },
    ],
  },
  cycles: {
    carbonCycle: {
      heading: "Carbon Cycle",
      steps: [
        "Green plants absorb carbon dioxide through photosynthesis.",
        "Animals obtain carbon by eating plants.",
        "Dead plants and animals decompose. Bacteria and fungi in the soil release carbon dioxide during decomposition.",
        "Burning fossil fuels such as coal and petroleum releases carbon dioxide.",
        "All plants and animals release carbon dioxide during respiration. Decomposition, combustion and respiration are balanced by photosynthesis.",
      ],
    },
    oxygenCycle: {
      heading: "Oxygen Cycle",
      steps: [
        "Oxygen needed for respiration, rusting, combustion and decomposition is obtained from photosynthesis.",
      ],
    },
    balanceActions: [
      "Prevent illegal logging",
      "Reforestation",
      "Avoid forest burning",
      "Avoid excessive use of pesticides",
      "Prevent excessive release of vehicle smoke",
    ],
  },
  combustion: {
    definition:
      "Combustion is the reaction that occurs when a substance is heated in the presence of oxygen which produces heat energy and light energy.",
    triangle: {
      heat: "Heat",
      oxygen: "Oxygen",
      fuel: "Fuel",
    },
    methods: [
      {
        icon: "",
        heading: "Covering",
        removes: "oxygen",
        body: "Cutting off the contact of the fuel with oxygen or air. For example, covering the surface of fuel with fire blanket, wet sack, mud, sand, soil or foam.",
      },
      {
        icon: "",
        heading: "Cooling",
        removes: "heat",
        body: "Cooling the surface of burning materials by spraying water or a layer of carbon dioxide.",
      },
      {
        icon: "",
        heading: "Reducing the amount of burning materials/cutting off the source of fuel",
        removes: "fuel",
        body: "Separating the burning materials, keeping away materials that have not burnt yet and cutting off the supply of gas or oil.",
      },
    ],
    extinguisherTable: [
      {
        material: "Solid",
        examples: "Wood, cloth, paper",
        extinguishers: ["Water", "Dry powder"],
      },
      {
        material: "Liquid",
        examples: "Oil, varnish, paint",
        extinguishers: ["Foam", "Dry powder", "Carbon dioxide"],
      },
      {
        material: "Gas",
        examples: "Propane, acetylene, methane",
        extinguishers: ["Foam", "Dry powder", "Carbon dioxide"],
      },
      {
        material: "Metal",
        examples: "Potassium, sodium, magnesium, calcium",
        extinguishers: ["Dry powder", "Dry sand"],
      },
    ],
    safetyChecklist: [
      "Keep away flammable substances from fire",
      "Keep matches and lighters in a safe place",
      "Always be aware of your electrical appliances",
      "Do not throw away cigarette butts when they are still burning",
      "Install fire alarm and smoke detector at home",
      "Do not plug in too many electrical appliances to a single electrical source",
    ],
    lesson: {
      triangleTitle: "Three conditions needed for combustion",
      required: "Combustion needs oxygen, heat and fuel.",
      stopped: "Fire can be extinguished by removing one of the conditions needed for combustion.",
      remove: "Remove",
      reset: "All three conditions",
      activityTitle: "Activity 7.3",
      aim: "To prove that fuel, oxygen and heat are needed for combustion",
      investigations: [
        {
          id: "fuel",
          heading: "I — Fuel is needed for combustion",
          apparatus: ["Bunsen burner", "Tongs", "Lighter", "Glass rod", "Wood", "Candle", "Stone"],
          procedure: [
            "Light a Bunsen burner.",
            "Hold a glass rod over the fire by using tongs.",
            "Observe whether or not the glass rod burns.",
            "Record your observation in a table.",
            "Repeat steps 2 to 4 by using wood, candle and stone.",
          ],
          observation: "Wood and candle burn; the glass rod and stone do not.",
          observationIsQuestion: false,
          conclusion: "Fuel is needed for combustion.",
        },
        {
          id: "oxygen",
          heading: "II — Oxygen is needed for combustion",
          apparatus: [
            "Gas jar",
            "Two white tiles",
            "Two candles of the same size",
            "Plasticine",
            "Lighter",
          ],
          procedure: [
            "Hold two candles of the same size on white tiles by using plasticine.",
            "Light candles X and Y.",
            "Turn a gas jar over candle X.",
            "Observe which candle extinguishes first.",
          ],
          observation:
            "Candle X extinguishes first. Candle Y burns longer because it has a continuous supply of oxygen.",
          observationIsQuestion: false,
          conclusion: "Oxygen is needed for combustion.",
        },
        {
          id: "heat",
          heading: "III — Heat is needed for combustion",
          apparatus: [
            "Match stick",
            "Match stick which has been stored inside the refrigerator",
            "Matchbox",
          ],
          procedure: [
            "Label the match stick which has been stored inside the refrigerator as P and the other match stick as Q.",
            "Light match sticks P and Q. Observe the changes that occur.",
          ],
          observation: "Do both match sticks ignite? Why?",
          observationIsQuestion: true,
          conclusion: "Heat is needed for combustion.",
        },
      ],
      fuelMaterials: [
        {
          id: "glass",
          label: "Glass rod",
          isFuel: false,
        },
        {
          id: "wood",
          label: "Wood",
          isFuel: true,
        },
        {
          id: "candle",
          label: "Candle",
          isFuel: true,
        },
        {
          id: "stone",
          label: "Stone",
          isFuel: false,
        },
      ],
      fuel: "Fuel",
      nonFuel: "Non-fuel",
      labels: {
        apparatus: "Materials and apparatus",
        setup: "Instruction",
        observation: "Observation",
        conclusion: "Conclusion",
        before: "Before",
        after: "After",
        test: "Observe the changes that occur",
        coldMatch: "P — Match stick stored in the refrigerator",
        ordinaryMatch: "Q — Match stick",
        matchbox: "Matchbox",
      },
      extinguisherTitle: "Fire Extinguisher",
      tableTitle: "Table 7.1 Types of fire extinguisher for different sources of fire",
      tableHeaders: ["Material on fire", "Example of material", "Type of fire extinguisher"],
      oilTitle: "Science in Life",
      oilWarning:
        "Do not pour water onto an oil fire. Water is denser than oil and it will sink below the oil. The fire will not be extinguished. We must use foam!",
      oilLabels: ["Oil", "Water", "Foam"],
      methodsTitle: "Fire Extinguisher",
      blanketTitle: "Fire blanket",
      blanket:
        "Fire blanket is a special blanket made of fire resistant substances. This blanket covers the fire and prevents oxygen from seeping below the blanket which will eventually extinguish the fire.",
      blanketSteps: [
        "Fire-resistant blanket",
        "Covers the fire",
        "Prevents oxygen from entering",
        "Fire extinguishes",
      ],
      preventionTitle: "Safety Measures to Prevent the Occurrence of Fire",
      poster: {
        title: "Activity 7.4",
        aim: "To make a poster on causes of fire and ways to prevent it",
        instructions: [
          "Prepare a poster entitled ‘Causes of Fire and Ways to Prevent it’ in a group.",
          "Present the best three posters on the science board of your class.",
        ],
      },
      practiceTitle: "Formative Practice 7.2",
      questions: [
        "Define combustion.",
        "What are the conditions needed for combustion?",
        "Luqman uses a fire blanket to put out a small fire at his house. How does the fire blanket work?",
        "Give four ways to prevent fire.",
        "Metals like potassium and sodium are kept in paraffin oil. Why?",
      ],
      paraffinAnswer: "Potassium and sodium metals are flammable when exposed to the air.",
    },
  },
  pollutionSources: [
    {
      from: "Vehicle exhaust & factories",
      pollutants: ["Smoke", "Soot", "CO", "SO₂", "NO₂", "Lead"],
    },
    { from: "Open burning, cigarettes, forest fires", pollutants: ["Dust", "Soot", "Smoke"] },
    { from: "Construction, asbestos factories, quarries", pollutants: ["Dust", "Soot"] },
    { from: "Nuclear power plants", pollutants: ["Radioactive materials"] },
    {
      from: "Agriculture & plantation activity",
      pollutants: ["Aerosol spray", "Chemical fertiliser"],
    },
    { from: "A/C, fridges, aerosol sprays, electronics factories", pollutants: ["CFC"] },
  ],
  pollutionEffects: [
    {
      heading: "Health",
      category: "health",
      items: [
        "Smoke & dust — breathing problems",
        "Sulfur dioxide — respiratory problems",
        "Carbon monoxide — headache, mental retardation, death",
        "Asbestos particles — lung cancer",
        "Lead particles — intellectual disability in children & babies",
      ],
    },
    {
      heading: "Buildings & Infrastructure",
      category: "buildings",
      items: [
        "Dust & soot stain buildings",
        "Acid rain corrodes concrete & limestone",
        "Acid rain speeds up iron rusting",
      ],
    },
    {
      heading: "Plants & Animals",
      category: "plants",
      items: [
        "Acid rain makes soil acidic & less fertile",
        "Acid rain makes water acidic — unsuitable for aquatic life",
        "Smoke & haze reduce sunlight — slows photosynthesis",
      ],
    },
    {
      heading: "Climate",
      category: "climate",
      items: [
        "Smoke from factories, vehicles & burning → haze",
        "Excess CO₂ → greenhouse effect",
        "Excess CFC → thinning ozone layer",
        "SO₂ & NO₂ → acid rain",
      ],
    },
  ],
  prevention: [
    {
      heading: "Law Enforcement",
      items: [
        "Fine smokers in restricted areas",
        "Fine open burning",
        "Fine vehicles emitting excess smoke",
        "Prohibit factories in housing areas",
      ],
    },
    {
      heading: "Education",
      items: [
        "Teach students the effects & prevention of pollution",
        "Anti-smoking campaigns",
        "Encourage walking / cycling",
        "Encourage public transport / carpooling",
      ],
    },
    {
      heading: "Science & Technology",
      items: [
        "Hybrid vehicle technology",
        "HCFC instead of CFC in refrigerators",
        "Install filters in factory chimneys",
        "Catalytic converters on vehicles",
        "Biological pest control instead of pesticides",
      ],
    },
  ],
  api: [
    { range: "0–50", label: "Good", severity: "good" },
    { range: "51–100", label: "Moderate", severity: "moderate" },
    { range: "101–200", label: "Unhealthy", severity: "unhealthy" },
    { range: "201–300", label: "Very Unhealthy", severity: "veryUnhealthy" },
    { range: ">300", label: "Hazardous", severity: "hazardous" },
  ],
  keyExamFacts: [
    "Nitrogen is the largest part of air, at 78%",
    "Air is a mixture — separable by fractional distillation",
    "Photosynthesis removes CO₂ and releases oxygen",
    "Fire needs heat, oxygen and fuel — remove one, fire stops",
    "Carbon monoxide reduces oxygen carried in the blood",
    "SO₂ and NO₂ both contribute to acid rain",
    "Excess CO₂ causes the greenhouse effect; excess CFC thins the ozone layer",
    "Hybrid vehicles & catalytic converters reduce air pollution",
  ],
  keyTerms: [
    "Air",
    "Atmosphere",
    "Nitrogen",
    "Oxygen",
    "Carbon dioxide",
    "Inert gas",
    "Fractional distillation",
    "Carbon cycle",
    "Oxygen cycle",
    "Photosynthesis",
    "Respiration",
    "Combustion",
    "Fire triangle",
    "Fire extinguisher",
    "Air pollution",
    "Air Pollutant Index",
    "Acid rain",
    "Greenhouse effect",
    "Ozone layer",
    "CFC",
    "Catalytic converter",
  ],
  chapterSummary:
    "Chapter 7 covers the composition of air and why air is a mixture, the importance of each gas, the carbon and oxygen cycles that keep them balanced, how combustion and fire safety work, and the sources, effects, and control of air pollution — including the Air Pollutant Index used to monitor it.",
};

const bm: Bab7Content = {
  airLesson: {
    title: "Udara",
    subtopics: [
      {
        code: "7.1",
        title: "Komposisi Udara",
      },
      {
        code: "7.2",
        title: "Pembakaran",
      },
      {
        code: "7.3",
        title: "Pencemaran Udara",
      },
    ],
    compositionTitle: "Komposisi udara",
    variableTitle: "Komponen lain",
    mixtureTitle: "Adakah Udara Suatu Campuran?",
    distillation: [
      "Campuran cecair",
      "Pecahan yang berlainan berdasarkan takat didih",
      "Pendidihan dan kondensasi semula",
    ],
    activityTitle: "Aktiviti 7.1",
    apparatus: [
      {
        id: "candle",
        label: "Lilin",
      },
      {
        id: "plasticine",
        label: "Plastisin",
      },
      {
        id: "matches",
        label: "Mancis",
      },
      {
        id: "basin",
        label: "Besen kaca",
      },
      {
        id: "marker",
        label: "Pen penanda kekal",
      },
      {
        id: "jar",
        label: "Balang gas",
      },
      {
        id: "stand",
        label: "Pelapik balang gas",
      },
      {
        id: "water",
        label: "Air",
      },
    ],
    stages: ["Sebelum", "Semasa", "Selepas"],
    stageCaptions: [
      "Nyalakan lilin. Balang gas ditandakan kepada lima bahagian yang sama.",
      "Telangkupkan balang gas ke atas lilin yang menyala.",
      "Api lilin terpadam. Air meningkat kepada satu perlima balang gas.",
    ],
    apparatusLabel: "Bahan dan radas",
    procedureLabel: "Prosedur",
    originalWater: "Aras air asal",
    finalWater: "Air meningkat sebanyak 1/5",
    estimate: "Aktiviti 7.1: 1/5 ≈ 20% oksigen",
    chartOxygen: "Komposisi udara: 21% oksigen",
    usesTitle: "Kepentingan Gas dalam Kehidupan Harian",
    carbon: {
      definition:
        "Kitar karbon ialah kitar yang mengekalkan kandungan karbon dioksida dalam udara dengan mengambil karbon dioksida dari udara dan mengembalikannya semula ke udara secara berterusan.",
      nodes: [
        {
          id: "atmosphere",
          label: "Gas karbon dioksida dalam atmosfera",
        },
        {
          id: "plants",
          label: "Tumbuhan hijau",
        },
        {
          id: "animals",
          label: "Haiwan",
        },
        {
          id: "dead",
          label: "Organisma yang mati",
        },
        {
          id: "fossil",
          label: "Bahan api fosil: petroleum, gas asli dan arang batu",
        },
      ],
      edges: [
        {
          id: "photosynthesis",
          from: "atmosphere",
          to: "plants",
          label: "Fotosintesis",
          role: "uses",
        },
        {
          id: "plant-respiration",
          from: "plants",
          to: "atmosphere",
          label: "Respirasi",
          role: "returns",
        },
        {
          id: "animal-respiration",
          from: "animals",
          to: "atmosphere",
          label: "Respirasi",
          role: "returns",
        },
        {
          id: "feeding",
          from: "plants",
          to: "animals",
          label: "Dimakan",
          role: "transfer",
        },
        {
          id: "plant-death",
          from: "plants",
          to: "dead",
          label: "Organisma yang mati",
          role: "transfer",
        },
        {
          id: "animal-death",
          from: "animals",
          to: "dead",
          label: "Organisma yang mati",
          role: "transfer",
        },
        {
          id: "decomposition",
          from: "dead",
          to: "atmosphere",
          label: "Pereputan: bakteria dan kulat",
          role: "returns",
        },
        {
          id: "formation",
          from: "dead",
          to: "fossil",
          label: "Membentuk",
          role: "transfer",
        },
        {
          id: "combustion",
          from: "fossil",
          to: "atmosphere",
          label: "Pembakaran bahan api fosil",
          role: "returns",
        },
      ],
      legend: {
        uses: "Menggunakan karbon dioksida",
        returns: "Membebaskan karbon dioksida",
      },
    },
    oxygen: {
      definition:
        "Kitar oksigen ialah kitar yang melibatkan pengambilan oksigen daripada udara dan pengembalian oksigen semula ke udara secara berterusan.",
      nodes: [
        {
          id: "oxygen",
          label: "Gas oksigen dalam atmosfera",
        },
        {
          id: "plants",
          label: "Tumbuhan hijau",
        },
        {
          id: "carbon",
          label: "Gas karbon dioksida dalam atmosfera",
        },
        {
          id: "respiration",
          label: "Respirasi",
        },
        {
          id: "rusting",
          label: "Pengaratan",
        },
        {
          id: "combustion",
          label: "Pembakaran",
        },
        {
          id: "decomposition",
          label: "Pereputan bahan kumuh dan organisma yang mati",
        },
      ],
      edges: [
        {
          id: "photosynthesis",
          from: "plants",
          to: "oxygen",
          label: "Fotosintesis",
          role: "returns",
        },
        {
          id: "carbon-uptake",
          from: "carbon",
          to: "plants",
          label: "Fotosintesis",
          role: "transfer",
        },
        {
          id: "respiration",
          from: "oxygen",
          to: "respiration",
          label: "Respirasi",
          role: "uses",
        },
        {
          id: "rusting",
          from: "oxygen",
          to: "rusting",
          label: "Pengaratan",
          role: "uses",
        },
        {
          id: "combustion",
          from: "oxygen",
          to: "combustion",
          label: "Pembakaran",
          role: "uses",
        },
        {
          id: "decomposition",
          from: "oxygen",
          to: "decomposition",
          label: "Pereputan",
          role: "uses",
        },
        {
          id: "respiration-carbon",
          from: "respiration",
          to: "carbon",
          label: "Respirasi",
          role: "transfer",
        },
        {
          id: "combustion-carbon",
          from: "combustion",
          to: "carbon",
          label: "Pembakaran",
          role: "transfer",
        },
        {
          id: "decomposition-carbon",
          from: "decomposition",
          to: "carbon",
          label: "Pereputan",
          role: "transfer",
        },
      ],
      legend: {
        uses: "Menggunakan oksigen",
        returns: "Membebaskan oksigen",
      },
    },
    research: {
      title: "Aktiviti 7.2",
      aim: "Mentafsir dan berkongsi maklumat mengenai kepentingan gas dalam kehidupan harian serta maklumat mengenai kitar oksigen dan kitar karbon.",
      instructions: [
        "Lakukan aktiviti ini secara berkumpulan.",
        "Cari maklumat mengenai kepentingan oksigen, karbon dioksida, nitrogen dan gas nadir dalam kehidupan harian.",
        "Catatkan maklumat yang diperoleh dalam mana-mana bentuk peta pemikiran yang sesuai.",
        "Cari maklumat berkaitan kitar oksigen dan kitar karbon. Bagaimanakah kitar-kitar tersebut mengekalkan peratusan gas dalam atmosfera?",
      ],
    },
    interference: {
      title: "Langkah-langkah Mengelakkan Gangguan kepada Kitar Oksigen dan Kitar Karbon",
      causes: [
        "Penebangan pokok",
        "Penggunaan racun serangga dalam pertanian secara tidak terkawal",
      ],
      increase: "Peningkatan gas karbon dioksida; gangguan kepada kitar oksigen dan kitar karbon",
      effects: ["Pemanasan global", "Kesan rumah hijau"],
    },
    practice: {
      title: "Praktis Formatif 7.1",
      questions: [
        "Senaraikan komposisi udara.",
        "Apakah cara anda mengenal pasti gas oksigen dan gas karbon dioksida?",
        "Apakah kepentingan karbon dioksida kepada tumbuhan?",
        "Apakah kesan peningkatan karbon dioksida dalam udara kepada manusia?",
        "Sebagai seorang murid yang menghargai kepentingan kitar karbon dan kitar oksigen, cadangkan beberapa cara untuk memastikan keseimbangan kandungan karbon dioksida dan oksigen dalam udara.",
      ],
    },
  },
  hook: {
    title: "Udara",
    body: "Udara yang bersih tidak mempunyai warna dan bau. Udara merupakan campuran beberapa jenis gas.",
  },
  composition: {
    legend: [
      {
        color: "#4fb0ff",
        name: "Nitrogen",
        percentage: "78%",
      },
      {
        color: "#8b6bff",
        name: "Oksigen",
        percentage: "21%",
      },
      {
        color: "#fbbf5a",
        name: "Karbon dioksida",
        percentage: "0.03%",
      },
      {
        color: "#4ade80",
        name: "Gas nadir",
        percentage: "0.97%",
      },
    ],
    reveals: [
      {
        chipLabel: "Komponen lain",
        accent: "violet",
        body: "Udara juga mengandungi wap air, habuk dan mikroorganisma dalam kuantiti yang kecil. Kuantiti komponen-komponen ini berubah-ubah mengikut tempat dan masa. Contohnya, kawasan hutan atau selepas hujan mengandungi lebih banyak wap air berbanding dengan hari panas di gurun.",
      },
      {
        chipLabel: "Gas nadir",
        accent: "amber",
        body: "Helium, argon, neon, xenon dan kripton.",
      },
      {
        chipLabel: "Adakah Udara Suatu Campuran?",
        accent: "blue",
        body: "Udara merupakan campuran kerana komponen udara boleh diasingkan melalui kaedah fizikal, iaitu penyulingan berperingkat. Penyulingan berperingkat merupakan proses mengasingkan campuran kepada pecahan yang berlainan berdasarkan takat didih melalui pendidihan dan kondensasi semula.",
      },
    ],
  },
  experiment: {
    aim: "Menentukan peratusan oksigen dalam udara",
    steps: [
      {
        emoji: "",
        caption: "Sediakan radas seperti yang ditunjukkan dalam Rajah 7.2(a).",
      },
      {
        emoji: "",
        caption:
          "Bahagikan balang gas kepada lima bahagian yang sama dan tandakan dengan pen penanda kekal.",
      },
      {
        emoji: "",
        caption: "Nyalakan lilin dan telangkupkan balang gas ke atas lilin.",
      },
      {
        emoji: "",
        caption: "Rekodkan perubahan aras air apabila api lilin terpadam.",
      },
      {
        emoji: "",
        caption: "Buat kesimpulan tentang peratusan oksigen dalam udara.",
      },
    ],
    predictQuestion: "Berapakah peratusan oksigen dalam udara berdasarkan aktiviti ini?",
    predictOptions: [],
    predictFeedback:
      "Aras air meningkat kepada satu perlima balang gas. Kira-kira 20% daripada kandungan udara ialah oksigen. Hanya oksigen dalam udara digunakan untuk pembakaran.",
  },
  uses: {
    tabs: [
      {
        symbol: "O₂",
        name: "Oksigen",
        uses: [
          {
            icon: "🫁",
            label: "Pernafasan",
          },
          {
            icon: "🚀",
            label: "Pembakaran enjin roket pada altitud tinggi",
          },
          {
            icon: "⚡",
            label: "Kimpalan dan pemotongan logam dalam industri",
          },
          {
            icon: "🧪",
            label: "Penyediaan pelbagai sebatian",
          },
        ],
      },
      {
        symbol: "CO₂",
        name: "Karbon dioksida",
        uses: [
          {
            icon: "🌿",
            label: "Fotosintesis",
          },
          {
            icon: "🥤",
            label: "Pembuatan minuman berkarbonat",
          },
          {
            icon: "🧯",
            label: "Alat pemadam api",
          },
          {
            icon: "🔄",
            label: "Kitar karbon",
          },
        ],
      },
      {
        symbol: "N₂",
        name: "Nitrogen",
        uses: [
          {
            icon: "🧪",
            label: "Penghasilan asid nitrik dan ammonia",
            sub: "Baja bernitrogen",
          },
          {
            icon: "🔄",
            label: "Kitar nitrogen",
          },
          {
            icon: "❄️",
            label: "Nitrogen cecair sebagai agen penyejuk",
          },
        ],
      },
      {
        symbol: "◆",
        name: "Gas nadir",
        uses: [
          {
            icon: "🎈",
            label: "Helium",
            sub: "Belon udara dan belon kaji cuaca",
          },
          {
            icon: "💡",
            label: "Neon",
            sub: "Lampu iklan",
          },
          {
            icon: "💡",
            label: "Argon",
            sub: "Mentol",
          },
        ],
      },
    ],
  },
  cycles: {
    carbonCycle: {
      heading: "Kitar Karbon",
      steps: [
        "Tumbuhan hijau mengambil gas karbon dioksida melalui proses fotosintesis.",
        "Haiwan yang memakan tumbuhan memperoleh unsur-unsur karbon daripadanya.",
        "Apabila tumbuhan dan haiwan mati, tumbuhan dan haiwan akan mereput. Pereputan yang dilakukan oleh bakteria dan kulat dalam tanah membebaskan karbon dioksida.",
        "Pembakaran bahan api fosil yang mengandungi karbon seperti arang batu dan petroleum juga membebaskan karbon dioksida.",
        "Semasa respirasi, kesemua tumbuhan dan haiwan juga membebaskan karbon dioksida. Proses-proses seperti pereputan, pembakaran dan respirasi diseimbangkan oleh fotosintesis.",
      ],
    },
    oxygenCycle: {
      heading: "Kitar Oksigen",
      steps: [
        "Oksigen yang diperlukan untuk proses respirasi, pengaratan, pembakaran dan pereputan diperoleh daripada hasil fotosintesis.",
      ],
    },
    balanceActions: [
      "Mencegah pembalakan haram",
      "Menanam semula pokok",
      "Tidak melakukan pembakaran hutan",
      "Mengelakkan penggunaan racun serangga yang berleluasa",
      "Mengelakkan pembebasan asap kenderaan yang berlebihan",
    ],
  },
  combustion: {
    definition:
      "Pembakaran bermaksud tindak balas yang berlaku apabila suatu bahan dipanaskan dengan kehadiran oksigen dan membebaskan tenaga haba dan tenaga cahaya.",
    triangle: {
      heat: "Haba",
      oxygen: "Oksigen",
      fuel: "Bahan api",
    },
    methods: [
      {
        icon: "",
        heading: "Menyelimuti",
        removes: "oxygen",
        body: "Memutuskan hubungan bahan bakar dengan oksigen atau udara. Contohnya, menutup permukaan bahan bakar dengan selimut api, karung basah, lumpur, pasir, tanah atau busa.",
      },
      {
        icon: "",
        heading: "Mendinginkan",
        removes: "heat",
        body: "Mendinginkan permukaan bahan yang terbakar dengan menyemburkan air atau lapisan karbon dioksida.",
      },
      {
        icon: "",
        heading: "Mengurangkan jumlah bahan yang terbakar/memutuskan sumber bahan bakar",
        removes: "fuel",
        body: "Memisahkan benda yang terbakar, menjauhkan benda yang belum terbakar dan menutup punca bekalan gas atau minyak.",
      },
    ],
    extinguisherTable: [
      {
        material: "Pepejal",
        examples: "Kayu, kain, kertas",
        extinguishers: ["Air", "Serbuk kering"],
      },
      {
        material: "Cecair",
        examples: "Minyak, varnis, cat",
        extinguishers: ["Busa", "Serbuk kering", "Karbon dioksida"],
      },
      {
        material: "Gas",
        examples: "Propana, asetilena, metana",
        extinguishers: ["Busa", "Serbuk kering", "Karbon dioksida"],
      },
      {
        material: "Logam",
        examples: "Kalium, natrium, magnesium, kalsium",
        extinguishers: ["Serbuk kering", "Pasir kering"],
      },
    ],
    safetyChecklist: [
      "Jauhkan bahan yang mudah terbakar daripada api",
      "Simpan mancis dan pemetik api di tempat yang selamat",
      "Sentiasa peka terhadap barangan elektrik yang digunakan",
      "Tidak membuang puntung rokok ketika apinya masih menyala",
      "Memasang alat pengesan asap dan penggera kebakaran di rumah",
      "Tidak meletakkan terlalu banyak beban pada satu sumber elektrik",
    ],
    lesson: {
      triangleTitle: "Tiga keperluan pembakaran",
      required: "Pembakaran memerlukan oksigen, haba dan bahan api.",
      stopped:
        "Prinsip pemadaman api adalah dengan menghapuskan salah satu faktor penyebab kebakaran.",
      remove: "Singkirkan",
      reset: "Ketiga-tiga syarat",
      activityTitle: "Aktiviti 7.3",
      aim: "Membuktikan bahawa bahan api, oksigen dan haba diperlukan untuk pembakaran berlaku",
      investigations: [
        {
          id: "fuel",
          heading: "A — Menentukan bahan api diperlukan untuk pembakaran",
          apparatus: [
            "Penunu Bunsen",
            "Penyepit besi",
            "Pemetik api",
            "Rod kaca",
            "Kayu",
            "Lilin",
            "Batu",
          ],
          procedure: [
            "Nyalakan api penunu Bunsen.",
            "Letakkan rod kaca pada nyalaan api penunu Bunsen dengan menggunakan penyepit.",
            "Perhatikan sama ada rod kaca terbakar atau tidak.",
            "Rekodkan pemerhatian anda dalam jadual.",
            "Ulang langkah 2 hingga 4 dengan menggunakan kayu, lilin dan batu.",
          ],
          observation: "Kayu dan lilin terbakar; rod kaca dan batu tidak terbakar.",
          observationIsQuestion: false,
          conclusion: "Bahan api diperlukan untuk pembakaran.",
        },
        {
          id: "oxygen",
          heading: "B — Menentukan oksigen diperlukan untuk pembakaran",
          apparatus: [
            "Balang gas",
            "Dua jubin putih",
            "Dua batang lilin yang sama saiz",
            "Plastisin",
            "Mancis",
          ],
          procedure: [
            "Dua batang lilin yang sama saiz dilekatkan pada jubin putih dengan menggunakan plastisin.",
            "Nyalakan lilin X dan Y.",
            "Telangkupkan balang gas di atas lilin X.",
            "Perhatikan lilin yang padam terlebih dahulu.",
          ],
          observation:
            "Lilin X padam terlebih dahulu. Lilin Y menyala lebih lama kerana mendapat bekalan oksigen yang berterusan.",
          observationIsQuestion: false,
          conclusion: "Oksigen diperlukan untuk pembakaran.",
        },
        {
          id: "heat",
          heading: "C — Menentukan bahawa haba diperlukan untuk pembakaran",
          apparatus: [
            "Mancis",
            "Mancis yang telah disimpan di bahagian penyejuk beku peti sejuk",
            "Kotak mancis",
          ],
          procedure: [
            "Labelkan P pada mancis yang telah disimpan dalam bahagian penyejuk beku peti sejuk dan sebatang mancis lain sebagai Q.",
            "Nyalakan mancis P dan Q. Perhatikan perubahan yang berlaku.",
          ],
          observation: "Adakah mancis P dan Q menyala? Mengapa?",
          observationIsQuestion: true,
          conclusion: "Haba diperlukan untuk pembakaran.",
        },
      ],
      fuelMaterials: [
        {
          id: "glass",
          label: "Rod kaca",
          isFuel: false,
        },
        {
          id: "wood",
          label: "Kayu",
          isFuel: true,
        },
        {
          id: "candle",
          label: "Lilin",
          isFuel: true,
        },
        {
          id: "stone",
          label: "Batu",
          isFuel: false,
        },
      ],
      fuel: "Bahan api",
      nonFuel: "Bukan bahan api",
      labels: {
        apparatus: "Bahan dan radas",
        setup: "Arahan",
        observation: "Pemerhatian",
        conclusion: "Kesimpulan",
        before: "Sebelum",
        after: "Selepas",
        test: "Perhatikan perubahan yang berlaku",
        coldMatch: "P — Mancis dari bahagian penyejuk beku peti sejuk",
        ordinaryMatch: "Q — Mancis",
        matchbox: "Kotak mancis",
      },
      extinguisherTitle: "Alat Pemadam Api",
      tableTitle: "Jadual 7.1 Jenis kebakaran dan alat pemadam api yang sesuai digunakan",
      tableHeaders: ["Bahan yang terbakar", "Contoh bahan", "Alat pemadam api yang digunakan"],
      oilTitle: "Sains dan Saya",
      oilWarning:
        "Jangan tuangkan air pada kebakaran minyak. Air lebih tumpat daripada minyak dan akan tenggelam di bawah minyak. Jadi, api tidak akan terpadam. Kita perlu menggunakan busa!",
      oilLabels: ["Minyak", "Air", "Busa"],
      methodsTitle: "Alat Pemadam Api",
      blanketTitle: "Selimut api",
      blanket:
        "Selimut api merupakan selimut khas yang diperbuat daripada bahan kalis api. Selimut ini menutupi api dan menghalang oksigen daripada masuk ke bawah selimut sehingga akhirnya menyebabkan api terpadam.",
      blanketSteps: [
        "Selimut kalis api",
        "Menutupi api",
        "Menghalang oksigen daripada masuk",
        "Api terpadam",
      ],
      preventionTitle: "Amalan Sikap Berjaga-jaga untuk Mengelakkan Kebakaran",
      poster: {
        title: "Aktiviti 7.4",
        aim: "Membuat poster kesedaran tentang punca kebakaran dan langkah-langkah pencegahan kebakaran",
        instructions: [
          "Sediakan satu poster yang bertajuk ‘Punca kebakaran dan langkah pencegahan kebakaran’ secara berkumpulan.",
          "Persembahkan tiga poster terbaik pada papan kenyataan sains di dalam kelas.",
        ],
      },
      practiceTitle: "Praktis Formatif 7.2",
      questions: [
        "Berikan maksud pembakaran.",
        "Apakah syarat-syarat pembakaran?",
        "Luqman menggunakan selimut api untuk memadamkan suatu kebakaran kecil di rumahnya. Bagaimanakah selimut api itu berfungsi?",
        "Berikan empat langkah berjaga-jaga yang boleh diambil bagi mengelakkan kebakaran.",
        "Logam seperti kalium dan natrium disimpan dalam minyak parafin. Mengapa?",
      ],
      paraffinAnswer: "Logam kalium dan natrium mudah terbakar apabila terdedah kepada udara.",
    },
  },
  pollutionSources: [
    {
      from: "Ekzos kenderaan & kilang",
      pollutants: ["Asap", "Jelaga", "CO", "SO₂", "NO₂", "Plumbum"],
    },
    { from: "Pembakaran terbuka, rokok, kebakaran hutan", pollutants: ["Habuk", "Jelaga", "Asap"] },
    { from: "Tapak pembinaan, kilang asbestos, kuari batu kapur", pollutants: ["Habuk", "Jelaga"] },
    { from: "Loji kuasa nuklear", pollutants: ["Bahan radioaktif"] },
    { from: "Aktiviti pertanian & perladangan", pollutants: ["Semburan aerosol", "Baja kimia"] },
    {
      from: "Penyaman udara, peti sejuk, semburan aerosol, kilang elektronik",
      pollutants: ["CFC"],
    },
  ],
  pollutionEffects: [
    {
      heading: "Kesihatan",
      category: "health",
      items: [
        "Asap & habuk — masalah kesesakan nafas",
        "Sulfur dioksida — penyakit salur pernafasan",
        "Karbon monoksida — sakit kepala, kerencatan akal, maut",
        "Zarah asbestos — kanser peparu",
        "Zarah plumbum — kerencatan akal kanak-kanak & bayi",
      ],
    },
    {
      heading: "Bangunan & Infrastruktur",
      category: "buildings",
      items: [
        "Habuk & jelaga mengotorkan bangunan",
        "Hujan asid mengakis konkrit & batu kapur",
        "Hujan asid mempercepat pengaratan besi",
      ],
    },
    {
      heading: "Tumbuhan & Haiwan",
      category: "plants",
      items: [
        "Hujan asid menjadikan tanah berasid & kurang subur",
        "Hujan asid menjadikan air berasid — tidak sesuai untuk hidupan akuatik",
        "Asap & jerebu mengurangkan cahaya matahari — melambatkan fotosintesis",
      ],
    },
    {
      heading: "Iklim",
      category: "climate",
      items: [
        "Asap kilang, kenderaan & pembakaran → jerebu",
        "CO₂ berlebihan → kesan rumah hijau",
        "CFC berlebihan → penipisan lapisan ozon",
        "SO₂ & NO₂ → hujan asid",
      ],
    },
  ],
  prevention: [
    {
      heading: "Undang-undang",
      items: [
        "Denda perokok di kawasan larangan",
        "Denda pembakaran terbuka",
        "Denda kenderaan yang mengeluarkan asap berlebihan",
        "Larang kilang dibina di kawasan perumahan",
      ],
    },
    {
      heading: "Pendidikan",
      items: [
        "Didik pelajar tentang kesan & pencegahan pencemaran",
        "Program antimerokok",
        "Galakan berjalan kaki / berbasikal",
        "Galakan pengangkutan awam / kongsi kereta",
      ],
    },
    {
      heading: "Sains & Teknologi",
      items: [
        "Teknologi kenderaan hibrid",
        "HCFC menggantikan CFC dalam peti sejuk",
        "Pasang penapis di cerobong kilang",
        "Penukar bermangkin pada kenderaan",
        "Kawalan biologi menggantikan pestisid",
      ],
    },
  ],
  api: [
    { range: "0–50", label: "Baik", severity: "good" },
    { range: "51–100", label: "Sederhana", severity: "moderate" },
    { range: "101–200", label: "Tidak sihat", severity: "unhealthy" },
    { range: "201–300", label: "Sangat tidak sihat", severity: "veryUnhealthy" },
    { range: ">300", label: "Berbahaya", severity: "hazardous" },
  ],
  keyExamFacts: [
    "Nitrogen adalah komponen terbesar udara, iaitu 78%",
    "Udara ialah campuran — boleh diasingkan melalui penyulingan berperingkat",
    "Fotosintesis menyingkirkan CO₂ dan membebaskan oksigen",
    "Api memerlukan haba, oksigen dan bahan api — singkirkan satu, api padam",
    "Karbon monoksida mengurangkan oksigen dalam darah",
    "SO₂ dan NO₂ kedua-duanya menyebabkan hujan asid",
    "CO₂ berlebihan menyebabkan kesan rumah hijau; CFC berlebihan menipiskan lapisan ozon",
    "Kenderaan hibrid & penukar bermangkin mengurangkan pencemaran udara",
  ],
  keyTerms: [
    "Udara",
    "Atmosfera",
    "Nitrogen",
    "Oksigen",
    "Karbon dioksida",
    "Gas nadir",
    "Penyulingan berperingkat",
    "Kitar karbon",
    "Kitar oksigen",
    "Fotosintesis",
    "Respirasi",
    "Pembakaran",
    "Segi tiga api",
    "Alat pemadam api",
    "Pencemaran udara",
    "Indeks Pencemaran Udara",
    "Hujan asid",
    "Kesan rumah hijau",
    "Lapisan ozon",
    "CFC",
    "Penukar bermangkin",
  ],
  chapterSummary:
    "Bab 7 merangkumi komposisi udara dan sebab udara ialah campuran, kepentingan setiap gas, kitar karbon dan oksigen yang mengekalkan keseimbangan, cara pembakaran dan keselamatan kebakaran berfungsi, serta punca, kesan dan kawalan pencemaran udara — termasuk Indeks Pencemaran Udara.",
};

export const bab7Content = { en, bm };

export interface Bab7Supplement {
  pollutionDefinition: string;
  activeRecall: { question: string; answer: string }[];
}
const supplementEn: Bab7Supplement = {
  pollutionDefinition:
    "Air pollution is the introduction of harmful chemicals, particulate matter, or biological contaminants into the atmosphere, causing discomfort, disease, or environmental damage.",
  activeRecall: [
    {
      question: "Why can cave explorers use a burning torch as well as an electric torch?",
      answer:
        "A flame needs oxygen. If oxygen falls to an unsafe level, the flame flickers or goes out and provides an early warning.",
    },
  ],
};
const supplementBm: Bab7Supplement = {
  pollutionDefinition:
    "Pencemaran udara ialah kemasukan bahan kimia, zarah, atau bahan cemar biologi yang berbahaya ke atmosfera sehingga menyebabkan ketidakselesaan, penyakit, atau kerosakan alam sekitar.",
  activeRecall: [
    {
      question: "Mengapakah peneroka gua boleh membawa obor bernyala selain lampu elektrik?",
      answer:
        "Nyalaan memerlukan oksigen. Jika oksigen turun ke aras tidak selamat, nyalaan berkelip atau terpadam lalu memberi amaran awal.",
    },
  ],
};
export const bab7Supplement = { en: supplementEn, bm: supplementBm };
export default bab7Content;
