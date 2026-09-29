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

export interface PollutionActivity {
  title: string;
  aim: string;
  context?: string;
  instructions: string[];
}
export interface PollutionLesson {
  definition: string;
  sourceStatement: string;
  labels: {
    sources: string;
    pollutants: string;
    effects: string;
    effect: string;
    controls: string;
    control: string;
    check: string;
    correct: string;
    retry: string;
    choose: string;
    review: string;
    terms: string;
  };
  sources: (SourceCard & { id: number; origins: string[] })[];
  activity75: PollutionActivity;
  effects: EffectCategory[];
  pathways: { id: string; pollutant: string; effect: string }[];
  photosynthesis: string[];
  controls: PreventCategory[];
  activity76: PollutionActivity;
  api: { title: string; guidance: string; bands: ApiRow[] };
  practice: {
    title: string;
    questions: string[];
    matches: { pollutant: string; effect: string }[];
    choices: { text: string; correct: boolean }[];
  };
}

export interface Bab7Content {
  pollution: PollutionLesson;
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

const pollutionEN: PollutionLesson = {
  definition:
    "Air pollution is a situation which involves the presence of any pollutants in the air. This brings harm and discomfort to living things and destroys the environment.",
  sourceStatement: "Air pollutants come from various sources.",
  labels: {
    sources: "Sources",
    pollutants: "Air pollutants",
    effects: "Causes and effects of air pollution",
    effect: "Effect",
    controls: "Ways to prevent and control air pollution",
    control: "Control",
    check: "Check answers",
    correct: "Correct",
    retry: "Try again",
    choose: "Choose an effect",
    review: "Summary",
    terms: "Keywords",
  },
  sources: [
    {
      id: 0,
      from: "Exhaust of vehicles · Factories",
      origins: ["Exhaust of vehicles", "Factories"],
      pollutants: [
        "Smoke",
        "Soot",
        "Dust",
        "Carbon monoxide",
        "Sulphur dioxide",
        "Nitrogen dioxide",
        "Plumbum",
      ],
    },
    {
      id: 1,
      from: "Open burning · Cigarettes · Forest fires",
      origins: ["Open burning", "Cigarettes", "Forest fires"],
      pollutants: ["Dust", "Soot", "Smoke"],
    },
    {
      id: 2,
      from: "Construction sites · Asbestos factories · Limestone quarries",
      origins: ["Construction sites", "Asbestos factories", "Limestone quarries"],
      pollutants: ["Dust", "Soot"],
    },
    {
      id: 3,
      from: "Nuclear power plants",
      origins: ["Nuclear power plants"],
      pollutants: ["Radioactive materials"],
    },
    {
      id: 4,
      from: "Agriculture and plantation activities",
      origins: ["Agriculture and plantation activities"],
      pollutants: ["Aerosol spray", "Chemical fertilisers"],
    },
    {
      id: 5,
      from: "Air-conditioners · Refrigerators · Aerosol sprays · Electronic factories",
      origins: ["Air-conditioners", "Refrigerators", "Aerosol sprays", "Electronic factories"],
      pollutants: ["Chlorofluorocarbon (CFC)"],
    },
  ],
  activity75: {
    title: "Activity 7.5",
    aim: "To discuss air pollution problems in Malaysia",
    context: "Textbook context: Kuala Lumpur, 2015",
    instructions: [
      "Discuss in groups the definition of air pollution and sources of air pollutants which cause haze.",
      "Then, present your discussion in class.",
    ],
  },
  effects: [
    {
      heading: "Health",
      category: "health",
      items: [
        "Smoke and dust can cause breathing problems",
        "Sulphur dioxide can cause respiratory problems",
        "Carbon monoxide can cause headache, mental retardation and death",
        "Asbestos particles can cause lung cancer",
        "Lead particles can cause intellectual disability among children and babies",
      ],
    },
    {
      heading: "Buildings and infrastructures",
      category: "buildings",
      items: [
        "Dust and soot stain buildings",
        "Acid rain corrodes concrete and limestone buildings",
        "Acid rain speeds up iron rusting",
      ],
    },
    {
      heading: "Plants and animals",
      category: "plants",
      items: [
        "Acid rain makes the soil acidic and less fertile",
        "Acid rain makes the source of water acidic and not suitable for aquatic life",
        "Smoke and haze decrease the amount of sunlight reaching the Earth and decrease the rate of photosynthesis.",
      ],
    },
    {
      heading: "Climate",
      category: "climate",
      items: [
        "Smoke from factories, vehicles and open burning lead to haze",
        "Excessive carbon dioxide contributes to greenhouse effect",
        "Excessive chlorofluorocarbons (CFC) causes the thinning of the ozone layer",
        "Sulphur dioxide and nitrogen dioxide cause acid rain",
      ],
    },
  ],
  pathways: [
    {
      id: "haze",
      pollutant: "Smoke",
      effect: "Haze",
    },
    {
      id: "greenhouse",
      pollutant: "Excessive carbon dioxide",
      effect: "Greenhouse effect",
    },
    {
      id: "ozone",
      pollutant: "Excessive chlorofluorocarbons (CFC)",
      effect: "Thinning of the ozone layer",
    },
    {
      id: "acid",
      pollutant: "Sulphur dioxide + Nitrogen dioxide",
      effect: "Acid rain",
    },
  ],
  photosynthesis: ["Smoke and haze", "Less sunlight", "Decreased rate of photosynthesis"],
  controls: [
    {
      heading: "Law Enforcement",
      items: [
        "Fine smokers who smoke at restricted areas",
        "Fine individuals who conduct open burning",
        "Fine drivers whose vehicles emit excessive smoke",
        "Prohibit factories from being built at housing areas",
      ],
    },
    {
      heading: "Education",
      items: [
        "Educate students about the effects of air pollution and ways to prevent it",
        "Organise anti-smoking campaigns",
        "Encourage the public to walk or ride bicycles",
        "Encourage the usage of public transport or car pooling",
      ],
    },
    {
      heading: "Science and Technology",
      items: [
        "Implement hybrid technology in vehicles",
        "Choose refrigerators which use hydrochlorofluorocarbons (HCFC) instead of chlorofluorocarbons (CFC)",
        "Install filters in smoke chimneys at factories",
        "Use catalytic converters on vehicles",
        "Replace the use of pesticide with biological control to control pest",
      ],
    },
  ],
  activity76: {
    title: "Activity 7.6",
    aim: "To gather information on effects of air pollution on living things and the environment, and the steps taken by authorities in controlling air pollution.",
    instructions: [
      "Work in groups.",
      "Each group has to choose an area in Malaysia which has a high rate of air pollution.",
      "Gather the information below from your chosen area:",
      "The effects of air pollution towards the health of the community, animals, plants, buildings and infrastructures.",
      "Efforts taken by the authority, for instance Jabatan Alam Sekitar, to overcome the air pollution problem.",
      "Present your findings in class.",
    ],
  },
  api: {
    title: "Air Pollutant Index (API) in Malaysia",
    guidance: "A guide to air-quality level and its impact on health.",
    bands: [
      {
        range: "0–50",
        label: "Good",
        severity: "good",
      },
      {
        range: "51–100",
        label: "Moderate",
        severity: "moderate",
      },
      {
        range: "101–200",
        label: "Unhealthy",
        severity: "unhealthy",
      },
      {
        range: "201–300",
        label: "Very Unhealthy",
        severity: "veryUnhealthy",
      },
      {
        range: ">300",
        label: "Hazardous",
        severity: "hazardous",
      },
    ],
  },
  practice: {
    title: "Formative Practice 7.3",
    questions: [
      "What are the pollutants that can cause haze?",
      "As a student, how can you increase the awareness of air pollution in the community?",
      "Give three reasons why it is important to keep the air clean.",
      "Littering can also cause air pollution. Explain how littering causes air pollution.",
      "Match each pollutant to its effect.",
      "Tick (✓) the correct statement on how to control and reduce air pollution.",
    ],
    matches: [
      {
        pollutant: "Carbon dioxide",
        effect: "Greenhouse effect",
      },
      {
        pollutant: "Nitrogen dioxide",
        effect: "Acid rain",
      },
      {
        pollutant: "Chlorofluorocarbons",
        effect: "Thinning of the ozone layer",
      },
    ],
    choices: [
      {
        text: "Use materials free of chlorofluorocarbons (CFC).",
        correct: true,
      },
      {
        text: "Use public transport.",
        correct: true,
      },
      {
        text: "Conduct open burning.",
        correct: false,
      },
      {
        text: "Practise reusing and recycling items.",
        correct: true,
      },
      {
        text: "Use petrol and diesel that contain lead.",
        correct: false,
      },
    ],
  },
};

const pollutionBM: PollutionLesson = {
  definition:
    "Pencemaran udara merupakan satu keadaan yang melibatkan kehadiran sebarang bahan pencemar dalam udara. Keadaan ini boleh menyebabkan kemudaratan dan ketidakselesaan kepada manusia atau organisma hidup lain serta merosakkan alam sekitar apabila dibebaskan ke atmosfera.",
  sourceStatement: "Bahan pencemar udara berasal daripada pelbagai punca.",
  labels: {
    sources: "Punca",
    pollutants: "Bahan pencemar udara",
    effects: "Punca dan kesan buruk pencemaran udara",
    effect: "Kesan",
    controls: "Langkah-langkah mencegah dan mengawal pencemaran udara",
    control: "Kawalan",
    check: "Semak jawapan",
    correct: "Betul",
    retry: "Cuba lagi",
    choose: "Pilih kesan",
    review: "Rumusan",
    terms: "Kata kunci",
  },
  sources: [
    {
      id: 0,
      from: "Ekzos kenderaan · Kilang",
      origins: ["Ekzos kenderaan", "Kilang"],
      pollutants: [
        "Asap",
        "Jelaga",
        "Habuk",
        "Karbon monoksida",
        "Sulfur dioksida",
        "Nitrogen dioksida",
        "Plumbum",
      ],
    },
    {
      id: 1,
      from: "Pembakaran terbuka · Rokok · Kebakaran hutan",
      origins: ["Pembakaran terbuka", "Rokok", "Kebakaran hutan"],
      pollutants: ["Habuk", "Jelaga", "Asap", "Zarah logam"],
    },
    {
      id: 2,
      from: "Tapak pembinaan · Kilang asbestos · Kuari batu kapur",
      origins: ["Tapak pembinaan", "Kilang asbestos", "Kuari batu kapur"],
      pollutants: ["Habuk dan debu"],
    },
    {
      id: 3,
      from: "Loji kuasa nuklear",
      origins: ["Loji kuasa nuklear"],
      pollutants: ["Bahan radioaktif"],
    },
    {
      id: 4,
      from: "Aktiviti pertanian dan perladangan",
      origins: ["Aktiviti pertanian dan perladangan"],
      pollutants: ["Bahan semburan pestisid", "Baja kimia"],
    },
    {
      id: 5,
      from: "Alat pendingin udara · Peti sejuk · Semburan aerosol · Kilang elektronik",
      origins: ["Alat pendingin udara", "Peti sejuk", "Semburan aerosol", "Kilang elektronik"],
      pollutants: ["Klorofluorokarbon (CFC)"],
    },
  ],
  activity75: {
    title: "Aktiviti 7.5",
    aim: "Berbincang tentang masalah pencemaran udara di Malaysia",
    context: "Konteks buku teks: Kuala Lumpur, 2015",
    instructions: [
      "Bincangkan secara berkumpulan mengenai maksud pencemaran udara dan punca bahan pencemar udara yang menyebabkan jerebu tersebut.",
      "Kemudian, bentangkan hasil perbincangan di hadapan kelas.",
    ],
  },
  effects: [
    {
      heading: "Kesihatan manusia",
      category: "health",
      items: [
        "Asap dan jelaga menyebabkan masalah kesesakan nafas",
        "Sulfur dioksida menyebabkan penyakit berkaitan salur pernafasan",
        "Karbon monoksida menyebabkan sakit kepala, kerencatan akal atau membawa maut",
        "Zarah asbestos menyebabkan kanser peparu",
        "Zarah plumbum menyebabkan kerencatan akal pada kanak-kanak dan bayi",
      ],
    },
    {
      heading: "Bangunan dan infrastruktur",
      category: "buildings",
      items: [
        "Habuk dan jelaga mengotorkan bangunan",
        "Hujan asid mengakis struktur konkrit dan batu kapur",
        "Hujan asid mempercepat pengaratan besi",
      ],
    },
    {
      heading: "Tumbuhan dan haiwan",
      category: "plants",
      items: [
        "Hujan asid menyebabkan tanah berasid dan kurang subur",
        "Hujan asid menyebabkan sumber air berasid dan tidak sesuai untuk hidupan akuatik",
        "Asap dan jerebu mengurangkan cahaya matahari sampai ke Bumi dan menyebabkan kadar fotosintesis menjadi rendah",
      ],
    },
    {
      heading: "Iklim bumi",
      category: "climate",
      items: [
        "Pembebasan asap dari kilang, ekzos kenderaan dan pembakaran terbuka menyebabkan jerebu",
        "Karbon dioksida yang berlebihan menyebabkan kesan rumah hijau",
        "Klorofluorokarbon yang berlebihan menyebabkan penipisan lapisan ozon",
        "Gas sulfur dioksida dan nitrogen dioksida menyebabkan hujan asid",
      ],
    },
  ],
  pathways: [
    {
      id: "haze",
      pollutant: "Asap",
      effect: "Jerebu",
    },
    {
      id: "greenhouse",
      pollutant: "Karbon dioksida yang berlebihan",
      effect: "Kesan rumah hijau",
    },
    {
      id: "ozone",
      pollutant: "Klorofluorokarbon yang berlebihan",
      effect: "Penipisan lapisan ozon",
    },
    {
      id: "acid",
      pollutant: "Sulfur dioksida + Nitrogen dioksida",
      effect: "Hujan asid",
    },
  ],
  photosynthesis: [
    "Asap dan jerebu",
    "Cahaya matahari berkurang",
    "Kadar fotosintesis menjadi rendah",
  ],
  controls: [
    {
      heading: "Melalui undang-undang",
      items: [
        "Denda kepada perokok yang merokok di kawasan larangan",
        "Denda kepada individu yang melakukan pembakaran terbuka",
        "Denda kepada pemandu kenderaan yang ekzosnya mengeluarkan asap berlebihan",
        "Tidak membenarkan kilang dibangunkan di kawasan perumahan",
      ],
    },
    {
      heading: "Melalui pendidikan",
      items: [
        "Pendidikan di sekolah yang menekankan pencemaran udara dan langkah-langkah pengawalannya",
        "Program antimerokok",
        "Galakan untuk berjalan kaki atau menunggang basikal",
        "Galakan menggunakan pengangkutan awam atau berkongsi kereta",
      ],
    },
    {
      heading: "Melalui sains dan teknologi",
      items: [
        "Teknologi kenderaan hibrid",
        "Teknologi peti sejuk menggunakan hidroklorofluorokarbon (HCFC) menggantikan klorofluorokarbon (CFC)",
        "Pemasangan penapis cerobong asap di kilang",
        "Penggunaan penukar bermangkin pada kenderaan bermotor",
        "Menggantikan kaedah penggunaan pestisid dengan kaedah kawalan biologi untuk mengawal haiwan perosak",
      ],
    },
  ],
  activity76: {
    title: "Aktiviti 7.6",
    aim: "Berkongsi maklumat mengenai kesan buruk pencemaran udara dan langkah-langkah yang diambil oleh pihak berkuasa dalam mengawal pencemaran udara",
    instructions: [
      "Lakukan aktiviti ini secara berkumpulan.",
      "Setiap kumpulan perlu memilih satu kawasan di Malaysia yang mempunyai tahap pencemaran udara yang tinggi.",
      "Kumpulkan maklumat-maklumat yang berikut di kawasan yang dipilih:",
      "Kesan buruk terhadap kesihatan penduduk sekitar, haiwan, tumbuhan, bangunan dan infrastruktur.",
      "Langkah-langkah penyelesaian yang diambil oleh pihak berkuasa seperti Jabatan Alam Sekitar untuk menangani masalah pencemaran udara tersebut.",
      "Bentangkan hasil maklumat yang anda perolehi dalam kelas.",
    ],
  },
  api: {
    title: "Indeks Pencemaran Udara (IPU) Malaysia",
    guidance: "Panduan tahap kualiti udara dan kesannya terhadap kesihatan.",
    bands: [
      {
        range: "0–50",
        label: "Baik",
        severity: "good",
      },
      {
        range: "51–100",
        label: "Sederhana",
        severity: "moderate",
      },
      {
        range: "101–200",
        label: "Tidak sihat",
        severity: "unhealthy",
      },
      {
        range: "201–300",
        label: "Sangat tidak sihat",
        severity: "veryUnhealthy",
      },
      {
        range: ">300",
        label: "Berbahaya",
        severity: "hazardous",
      },
    ],
  },
  practice: {
    title: "Praktis Formatif 7.3",
    questions: [
      "Apakah bahan pencemar udara yang menyebabkan jerebu?",
      "Sebagai seorang murid, apakah langkah-langkah yang perlu diambil bagi menambahkan kesedaran masyarakat mengenai pencemaran udara?",
      "Berikan tiga kepentingan mengekalkan udara supaya sentiasa bersih.",
      "Membuang sampah di merata-rata tempat juga boleh menyebabkan pencemaran udara. Terangkan.",
      "Padankan setiap bahan pencemar yang berikut dengan kesannya.",
      "Tandakan (✓) pada pernyataan yang betul mengenai cara-cara untuk mengawal dan mengurangkan pencemaran udara.",
    ],
    matches: [
      {
        pollutant: "Karbon dioksida",
        effect: "Kesan rumah hijau",
      },
      {
        pollutant: "Nitrogen dioksida",
        effect: "Hujan asid",
      },
      {
        pollutant: "Klorofluorokarbon",
        effect: "Penipisan lapisan ozon",
      },
    ],
    choices: [
      {
        text: "Menggunakan bahan bebas klorofluorokarbon (CFC)",
        correct: true,
      },
      {
        text: "Menggunakan pengangkutan awam",
        correct: true,
      },
      {
        text: "Melakukan pembakaran terbuka",
        correct: false,
      },
      {
        text: "Mengamalkan kitar semula dan guna semula barangan",
        correct: true,
      },
      {
        text: "Menggunakan minyak dan petrol berplumbum",
        correct: false,
      },
    ],
  },
};

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
  pollution: pollutionEN,
  // Compatibility aliases for the legacy Notes renderer; canonical ownership is pollution.
  pollutionSources: pollutionEN.sources,
  pollutionEffects: pollutionEN.effects,
  prevention: pollutionEN.controls,
  api: pollutionEN.api.bands,
  keyExamFacts: [...pollutionEN.effects[3].items],
  keyTerms: [
    "Oxygen",
    "Carbon dioxide",
    "Nitrogen",
    "Inert gases",
    "Helium",
    "Neon",
    "Argon",
    "Krypton",
    "Xenon",
    "Carbon cycle",
    "Oxygen cycle",
    "Global warming",
    "Greenhouse effect",
    "Combustion",
    "Fire extinguisher",
    "Air pollution",
  ],
  chapterSummary: "Composition of Air \u00b7 Combustion \u00b7 Air Pollution",
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
  pollution: pollutionBM,
  // Compatibility aliases for the legacy Notes renderer; canonical ownership is pollution.
  pollutionSources: pollutionBM.sources,
  pollutionEffects: pollutionBM.effects,
  prevention: pollutionBM.controls,
  api: pollutionBM.api.bands,
  keyExamFacts: [...pollutionBM.effects[3].items],
  keyTerms: [
    "Oksigen",
    "Karbon dioksida",
    "Nitrogen",
    "Gas nadir",
    "Helium",
    "Neon",
    "Argon",
    "Kripton",
    "Xenon",
    "Kitar karbon",
    "Kitar oksigen",
    "Pemanasan global",
    "Kesan rumah hijau",
    "Pembakaran",
    "Alat pemadam api",
    "Pencemaran udara",
  ],
  chapterSummary: "Komposisi Udara \u00b7 Pembakaran \u00b7 Pencemaran Udara",
};

export const bab7Content = { en, bm };

// Legacy adapter only: no independent factual supplement.
export const bab7Supplement = {
  en: { pollutionDefinition: en.pollution.definition, activeRecall: [] },
  bm: { pollutionDefinition: bm.pollution.definition, activeRecall: [] },
};
export default bab7Content;
