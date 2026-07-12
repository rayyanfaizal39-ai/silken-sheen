// bab7-content.ts
// Source-verified content for Chapter 7 / Bab 7 — Air / Udara
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 194-218)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 194-218, official KSSM counterpart)
// This is content data only — no presentation markup. Components read from this.

export interface CompositionGasEntry {
  color: string;       // hex, matches donut segment
  name: string;
  percentage: string;
}

export interface RevealCard {
  chipLabel: string;
  accent: 'violet' | 'amber' | 'blue';
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

export interface CombustionSection {
  definition: string;
  triangle: { heat: string; oxygen: string; fuel: string };
  methods: MethodCard[];
  extinguisherTable: ExtinguisherRow[];
  safetyChecklist: string[];
}

export interface SourceCard {
  from: string;
  pollutants: string[];
}

export interface EffectCategory {
  heading: string;
  category: 'health' | 'buildings' | 'plants' | 'climate';
  items: string[];
}

export interface PreventCategory {
  heading: string;
  items: string[];
}

export interface ApiRow {
  range: string;
  label: string;
  severity: 'good' | 'moderate' | 'unhealthy' | 'veryUnhealthy' | 'hazardous';
}

export interface Bab7Content {
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
  hook: {
    title: "Why this matters",
    body: "Every breath you take is only ~21% oxygen — that's why astronauts, divers, and even candles all depend on getting that ratio exactly right. This chapter shows you how air actually works, why fires behave the way they do, and how pollution throws all of it off balance."
  },
  composition: {
    legend: [
      { color: "#4fb0ff", name: "Nitrogen", percentage: "78%" },
      { color: "#8b6bff", name: "Oxygen", percentage: "21%" },
      { color: "#fbbf5a", name: "Carbon dioxide", percentage: "0.03%" },
      { color: "#4ade80", name: "Inert gases & others", percentage: "0.97%" }
    ],
    reveals: [
      {
        chipLabel: "💡 Formal definition",
        accent: "violet",
        body: "Air is a mixture of gases that surrounds the Earth. Other components — water vapour, dust and microorganisms — are also present in small, variable amounts depending on place and time (e.g. more water vapour in forests or after rain)."
      },
      {
        chipLabel: "🧪 What's inside \"inert gases\"?",
        accent: "amber",
        body: "Helium, Neon, Argon, Krypton and Xenon — five separate gases grouped together because they rarely react. Each has its own specific job later in this chapter."
      },
      {
        chipLabel: "🔬 Mixture or compound?",
        accent: "blue",
        body: "Air is a mixture, not a compound — because its gases can be separated by a physical method called fractional distillation (separating a liquid mixture into fractions with different boiling points, through boiling and condensation)."
      }
    ]
  },
  experiment: {
    aim: "To determine the percentage of oxygen in the air",
    steps: [
      { emoji: "🕯️", caption: "A lit candle is placed inside an upturned gas jar (marked into 5 equal parts), standing in water" },
      { emoji: "💨", caption: "The candle burns for a while, then goes out on its own" },
      { emoji: "📈", caption: "Water rises into the jar as it cools" }
    ],
    predictQuestion: "Quick check — before you scroll, predict: how far does the water rise?",
    predictOptions: [
      { label: "About half (2.5/5 parts)", correct: false },
      { label: "About a fifth (1/5 parts)", correct: true },
      { label: "Almost all (4.5/5 parts)", correct: false }
    ],
    predictFeedback: "Right — water rises to 1/5 of the gas jar. That's proof: oxygen was used up during combustion, and it makes up roughly 20% of air."
  },
  uses: {
    tabs: [
      {
        symbol: "O₂", name: "Oxygen",
        uses: [
          { icon: "🫁", label: "Respiration" },
          { icon: "🚀", label: "Rocket engines", sub: "combustion at high altitude" },
          { icon: "⚡", label: "Welding & steel cutting" },
          { icon: "🧪", label: "Compound preparation" }
        ]
      },
      {
        symbol: "CO₂", name: "Carbon dioxide",
        uses: [
          { icon: "🌿", label: "Photosynthesis" },
          { icon: "🥤", label: "Carbonated drinks" },
          { icon: "🧯", label: "Fire extinguishers" },
          { icon: "🔄", label: "Carbon cycle" }
        ]
      },
      {
        symbol: "N₂", name: "Nitrogen",
        uses: [
          { icon: "🧪", label: "Nitric acid & ammonia", sub: "fertiliser production" },
          { icon: "🔄", label: "Nitrogen cycle" },
          { icon: "❄️", label: "Liquid nitrogen", sub: "cooling agent" }
        ]
      },
      {
        symbol: "◆", name: "Inert gases",
        uses: [
          { icon: "🎈", label: "Helium", sub: "hot air & weather balloons" },
          { icon: "💡", label: "Neon", sub: "advertising lights" },
          { icon: "💡", label: "Argon", sub: "light bulbs" },
          { icon: "◇", label: "Krypton & Xenon", sub: "present in air as inert gases" }
        ]
      }
    ]
  },
  cycles: {
    carbonCycle: {
      heading: "Carbon Cycle",
      steps: [
        "Green plants absorb CO₂ through photosynthesis",
        "Animals eat plants and obtain carbon from them",
        "Dead plants & animals decompose (bacteria/fungi), releasing CO₂",
        "Burning fossil fuels (coal, petrol) releases CO₂",
        "Respiration releases CO₂ — balanced again by photosynthesis"
      ]
    },
    oxygenCycle: {
      heading: "Oxygen Cycle",
      steps: [
        "Respiration, rusting, combustion & decomposition all use O₂",
        "Photosynthesis is the only process that releases O₂ back",
        "This constant give-and-take keeps oxygen levels stable"
      ]
    },
    balanceActions: [
      "Prohibit illegal logging",
      "Reforestation",
      "Don't burn forests",
      "Avoid excessive pesticides",
      "Prevent excess vehicle smoke"
    ]
  },
  combustion: {
    definition: "Combustion is the reaction that occurs when a substance is heated in the presence of oxygen, producing heat energy and light energy.",
    triangle: { heat: "Heat", oxygen: "Oxygen", fuel: "Fuel" },
    methods: [
      { icon: "🧊", heading: "Cooling", body: "Spray water or a layer of CO₂ onto the burning surface to remove heat" },
      { icon: "🛑", heading: "Covering", body: "Cut off oxygen using a fire blanket, wet sack, mud, sand, soil or foam" },
      { icon: "📦", heading: "Reducing fuel", body: "Separate burning material, keep unburnt material away, cut off gas/oil supply" }
    ],
    extinguisherTable: [
      { material: "Solid", examples: "Wood, cloth, paper", extinguishers: ["Water", "Dry powder"] },
      { material: "Liquid", examples: "Oil, varnish, paint", extinguishers: ["Foam", "Dry powder", "CO₂"] },
      { material: "Gas", examples: "Propane, acetylene, methane", extinguishers: ["Foam", "Dry powder", "CO₂"] },
      { material: "Metal", examples: "Potassium, sodium, magnesium, calcium", extinguishers: ["Dry powder", "Dry sand"] }
    ],
    safetyChecklist: [
      "Keep flammable substances away from fire",
      "Keep matches & lighters in a safe place",
      "Always be aware of electrical appliances",
      "Never discard burning cigarette butts",
      "Install a fire alarm / smoke detector",
      "Don't overload a single electrical socket"
    ]
  },
  pollutionSources: [
    { from: "Vehicle exhaust & factories", pollutants: ["Smoke", "Soot", "CO", "SO₂", "NO₂", "Lead"] },
    { from: "Open burning, cigarettes, forest fires", pollutants: ["Dust", "Soot", "Smoke"] },
    { from: "Construction, asbestos factories, quarries", pollutants: ["Dust", "Soot"] },
    { from: "Nuclear power plants", pollutants: ["Radioactive materials"] },
    { from: "Agriculture & plantation activity", pollutants: ["Aerosol spray", "Chemical fertiliser"] },
    { from: "A/C, fridges, aerosol sprays, electronics factories", pollutants: ["CFC"] }
  ],
  pollutionEffects: [
    {
      heading: "Health", category: "health",
      items: [
        "Smoke & dust — breathing problems",
        "Sulfur dioxide — respiratory problems",
        "Carbon monoxide — headache, mental retardation, death",
        "Asbestos particles — lung cancer",
        "Lead particles — intellectual disability in children & babies"
      ]
    },
    {
      heading: "Buildings & Infrastructure", category: "buildings",
      items: [
        "Dust & soot stain buildings",
        "Acid rain corrodes concrete & limestone",
        "Acid rain speeds up iron rusting"
      ]
    },
    {
      heading: "Plants & Animals", category: "plants",
      items: [
        "Acid rain makes soil acidic & less fertile",
        "Acid rain makes water acidic — unsuitable for aquatic life",
        "Smoke & haze reduce sunlight — slows photosynthesis"
      ]
    },
    {
      heading: "Climate", category: "climate",
      items: [
        "Smoke from factories, vehicles & burning → haze",
        "Excess CO₂ → greenhouse effect",
        "Excess CFC → thinning ozone layer",
        "SO₂ & NO₂ → acid rain"
      ]
    }
  ],
  prevention: [
    {
      heading: "Law Enforcement",
      items: [
        "Fine smokers in restricted areas",
        "Fine open burning",
        "Fine vehicles emitting excess smoke",
        "Prohibit factories in housing areas"
      ]
    },
    {
      heading: "Education",
      items: [
        "Teach students the effects & prevention of pollution",
        "Anti-smoking campaigns",
        "Encourage walking / cycling",
        "Encourage public transport / carpooling"
      ]
    },
    {
      heading: "Science & Technology",
      items: [
        "Hybrid vehicle technology",
        "HCFC instead of CFC in refrigerators",
        "Install filters in factory chimneys",
        "Catalytic converters on vehicles",
        "Biological pest control instead of pesticides"
      ]
    }
  ],
  api: [
    { range: "0–50", label: "Good", severity: "good" },
    { range: "51–100", label: "Moderate", severity: "moderate" },
    { range: "101–200", label: "Unhealthy", severity: "unhealthy" },
    { range: "201–300", label: "Very Unhealthy", severity: "veryUnhealthy" },
    { range: ">300", label: "Hazardous", severity: "hazardous" }
  ],
  keyExamFacts: [
    "Nitrogen is the largest part of air, at 78%",
    "Air is a mixture — separable by fractional distillation",
    "Photosynthesis removes CO₂ and releases oxygen",
    "Fire needs heat, oxygen and fuel — remove one, fire stops",
    "Carbon monoxide reduces oxygen carried in the blood",
    "SO₂ and NO₂ both contribute to acid rain",
    "Excess CO₂ causes the greenhouse effect; excess CFC thins the ozone layer",
    "Hybrid vehicles & catalytic converters reduce air pollution"
  ],
  keyTerms: [
    "Air", "Atmosphere", "Nitrogen", "Oxygen", "Carbon dioxide", "Inert gas",
    "Fractional distillation", "Carbon cycle", "Oxygen cycle", "Photosynthesis",
    "Respiration", "Combustion", "Fire triangle", "Fire extinguisher",
    "Air pollution", "Air Pollutant Index", "Acid rain", "Greenhouse effect",
    "Ozone layer", "CFC", "Catalytic converter"
  ],
  chapterSummary: "Chapter 7 covers the composition of air and why air is a mixture, the importance of each gas, the carbon and oxygen cycles that keep them balanced, how combustion and fire safety work, and the sources, effects, and control of air pollution — including the Air Pollutant Index used to monitor it."
};

const bm: Bab7Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap nafas yang anda ambil hanya mengandungi kira-kira 21% oksigen — itulah sebabnya angkasawan, penyelam, malah lilin juga bergantung pada nisbah ini. Bab ini menunjukkan bagaimana udara sebenarnya berfungsi, mengapa api berkelakuan sedemikian, dan bagaimana pencemaran mengganggu keseimbangan ini."
  },
  composition: {
    legend: [
      { color: "#4fb0ff", name: "Nitrogen", percentage: "78%" },
      { color: "#8b6bff", name: "Oksigen", percentage: "21%" },
      { color: "#fbbf5a", name: "Karbon dioksida", percentage: "0.03%" },
      { color: "#4ade80", name: "Gas nadir & bahan lain", percentage: "0.97%" }
    ],
    reveals: [
      {
        chipLabel: "💡 Definisi rasmi",
        accent: "violet",
        body: "Udara ialah campuran gas yang mengelilingi Bumi. Komponen lain — wap air, habuk dan mikroorganisma — turut wujud dalam kuantiti kecil yang berubah mengikut tempat dan masa (cth: wap air lebih banyak di hutan atau selepas hujan)."
      },
      {
        chipLabel: "🧪 Apa yang ada dalam \"gas nadir\"?",
        accent: "amber",
        body: "Helium, Neon, Argon, Kripton dan Xenon — lima gas berasingan yang dikumpulkan kerana jarang bertindak balas. Setiap satu mempunyai kegunaan tersendiri nanti dalam bab ini."
      },
      {
        chipLabel: "🔬 Campuran atau sebatian?",
        accent: "blue",
        body: "Udara ialah campuran, bukan sebatian — kerana komponennya boleh diasingkan melalui kaedah fizikal iaitu penyulingan berperingkat (mengasingkan campuran kepada pecahan berlainan takat didih, melalui pendidihan dan kondensasi)."
      }
    ]
  },
  experiment: {
    aim: "Menentukan peratusan oksigen dalam udara",
    steps: [
      { emoji: "🕯️", caption: "Lilin yang menyala diletakkan di dalam balang gas terbalik (ditanda 5 bahagian sama), berdiri di dalam air" },
      { emoji: "💨", caption: "Lilin terbakar seketika, kemudian terpadam dengan sendirinya" },
      { emoji: "📈", caption: "Air naik ke dalam balang apabila menyejuk" }
    ],
    predictQuestion: "Semak cepat — sebelum menatal, ramalkan: berapa jauh air akan naik?",
    predictOptions: [
      { label: "Kira-kira separuh (2.5/5 bahagian)", correct: false },
      { label: "Kira-kira satu perlima (1/5 bahagian)", correct: true },
      { label: "Hampir semua (4.5/5 bahagian)", correct: false }
    ],
    predictFeedback: "Betul — air naik ke 1/5 balang gas. Ini membuktikan oksigen telah digunakan semasa pembakaran, dan ia merangkumi kira-kira 20% udara."
  },
  uses: {
    tabs: [
      {
        symbol: "O₂", name: "Oksigen",
        uses: [
          { icon: "🫁", label: "Pernafasan" },
          { icon: "🚀", label: "Enjin roket", sub: "pembakaran pada altitud tinggi" },
          { icon: "⚡", label: "Kimpalan & pemotongan keluli" },
          { icon: "🧪", label: "Penyediaan sebatian" }
        ]
      },
      {
        symbol: "CO₂", name: "Karbon dioksida",
        uses: [
          { icon: "🌿", label: "Fotosintesis" },
          { icon: "🥤", label: "Minuman berkarbonat" },
          { icon: "🧯", label: "Alat pemadam api" },
          { icon: "🔄", label: "Kitar karbon" }
        ]
      },
      {
        symbol: "N₂", name: "Nitrogen",
        uses: [
          { icon: "🧪", label: "Asid nitrik & ammonia", sub: "penghasilan baja" },
          { icon: "🔄", label: "Kitar nitrogen" },
          { icon: "❄️", label: "Nitrogen cecair", sub: "agen penyejuk" }
        ]
      },
      {
        symbol: "◆", name: "Gas nadir",
        uses: [
          { icon: "🎈", label: "Helium", sub: "belon udara & belon kaji cuaca" },
          { icon: "💡", label: "Neon", sub: "lampu iklan" },
          { icon: "💡", label: "Argon", sub: "mentol lampu" },
          { icon: "◇", label: "Kripton & Xenon", sub: "wujud dalam udara sebagai gas nadir" }
        ]
      }
    ]
  },
  cycles: {
    carbonCycle: {
      heading: "Kitar Karbon",
      steps: [
        "Tumbuhan hijau menyerap CO₂ melalui fotosintesis",
        "Haiwan memakan tumbuhan dan memperoleh karbon daripadanya",
        "Tumbuhan & haiwan mati akan mereput (bakteria/kulat), membebaskan CO₂",
        "Pembakaran bahan api fosil (arang batu, petroleum) membebaskan CO₂",
        "Respirasi membebaskan CO₂ — diseimbangkan semula oleh fotosintesis"
      ]
    },
    oxygenCycle: {
      heading: "Kitar Oksigen",
      steps: [
        "Respirasi, pengaratan, pembakaran & pereputan semuanya menggunakan O₂",
        "Fotosintesis satu-satunya proses yang membebaskan semula O₂",
        "Pertukaran berterusan ini mengekalkan kandungan oksigen"
      ]
    },
    balanceActions: [
      "Larang pembalakan haram",
      "Program penghutanan semula",
      "Elak pembakaran hutan",
      "Elak penggunaan racun serangga berlebihan",
      "Elak asap kenderaan berlebihan"
    ]
  },
  combustion: {
    definition: "Pembakaran ialah tindak balas yang berlaku apabila sesuatu bahan dipanaskan dengan kehadiran oksigen, menghasilkan tenaga haba dan tenaga cahaya.",
    triangle: { heat: "Haba", oxygen: "Oksigen", fuel: "Bahan api" },
    methods: [
      { icon: "🧊", heading: "Mendinginkan", body: "Semburkan air atau lapisan CO₂ pada permukaan terbakar untuk menyingkirkan haba" },
      { icon: "🛑", heading: "Menyelimuti", body: "Putuskan bekalan oksigen menggunakan selimut api, karung basah, lumpur, pasir, tanah atau busa" },
      { icon: "📦", heading: "Mengurangkan bahan api", body: "Asingkan bahan terbakar, jauhkan bahan belum terbakar, tutup bekalan gas/minyak" }
    ],
    extinguisherTable: [
      { material: "Pepejal", examples: "Kayu, kain, kertas", extinguishers: ["Air", "Serbuk kering"] },
      { material: "Cecair", examples: "Minyak, varnis, cat", extinguishers: ["Busa", "Serbuk kering", "CO₂"] },
      { material: "Gas", examples: "Propana, asetilena, metana", extinguishers: ["Busa", "Serbuk kering", "CO₂"] },
      { material: "Logam", examples: "Kalium, natrium, magnesium, kalsium", extinguishers: ["Serbuk kering", "Pasir kering"] }
    ],
    safetyChecklist: [
      "Jauhkan bahan mudah terbakar daripada api",
      "Simpan mancis & pemetik api di tempat selamat",
      "Sentiasa peka terhadap barangan elektrik",
      "Jangan buang puntung rokok yang masih menyala",
      "Pasang penggera kebakaran / pengesan asap",
      "Jangan letak terlalu banyak beban pada satu sumber elektrik"
    ]
  },
  pollutionSources: [
    { from: "Ekzos kenderaan & kilang", pollutants: ["Asap", "Jelaga", "CO", "SO₂", "NO₂", "Plumbum"] },
    { from: "Pembakaran terbuka, rokok, kebakaran hutan", pollutants: ["Habuk", "Jelaga", "Asap"] },
    { from: "Tapak pembinaan, kilang asbestos, kuari batu kapur", pollutants: ["Habuk", "Jelaga"] },
    { from: "Loji kuasa nuklear", pollutants: ["Bahan radioaktif"] },
    { from: "Aktiviti pertanian & perladangan", pollutants: ["Semburan aerosol", "Baja kimia"] },
    { from: "Penyaman udara, peti sejuk, semburan aerosol, kilang elektronik", pollutants: ["CFC"] }
  ],
  pollutionEffects: [
    {
      heading: "Kesihatan", category: "health",
      items: [
        "Asap & habuk — masalah kesesakan nafas",
        "Sulfur dioksida — penyakit salur pernafasan",
        "Karbon monoksida — sakit kepala, kerencatan akal, maut",
        "Zarah asbestos — kanser peparu",
        "Zarah plumbum — kerencatan akal kanak-kanak & bayi"
      ]
    },
    {
      heading: "Bangunan & Infrastruktur", category: "buildings",
      items: [
        "Habuk & jelaga mengotorkan bangunan",
        "Hujan asid mengakis konkrit & batu kapur",
        "Hujan asid mempercepat pengaratan besi"
      ]
    },
    {
      heading: "Tumbuhan & Haiwan", category: "plants",
      items: [
        "Hujan asid menjadikan tanah berasid & kurang subur",
        "Hujan asid menjadikan air berasid — tidak sesuai untuk hidupan akuatik",
        "Asap & jerebu mengurangkan cahaya matahari — melambatkan fotosintesis"
      ]
    },
    {
      heading: "Iklim", category: "climate",
      items: [
        "Asap kilang, kenderaan & pembakaran → jerebu",
        "CO₂ berlebihan → kesan rumah hijau",
        "CFC berlebihan → penipisan lapisan ozon",
        "SO₂ & NO₂ → hujan asid"
      ]
    }
  ],
  prevention: [
    {
      heading: "Undang-undang",
      items: [
        "Denda perokok di kawasan larangan",
        "Denda pembakaran terbuka",
        "Denda kenderaan yang mengeluarkan asap berlebihan",
        "Larang kilang dibina di kawasan perumahan"
      ]
    },
    {
      heading: "Pendidikan",
      items: [
        "Didik pelajar tentang kesan & pencegahan pencemaran",
        "Program antimerokok",
        "Galakan berjalan kaki / berbasikal",
        "Galakan pengangkutan awam / kongsi kereta"
      ]
    },
    {
      heading: "Sains & Teknologi",
      items: [
        "Teknologi kenderaan hibrid",
        "HCFC menggantikan CFC dalam peti sejuk",
        "Pasang penapis di cerobong kilang",
        "Penukar bermangkin pada kenderaan",
        "Kawalan biologi menggantikan pestisid"
      ]
    }
  ],
  api: [
    { range: "0–50", label: "Baik", severity: "good" },
    { range: "51–100", label: "Sederhana", severity: "moderate" },
    { range: "101–200", label: "Tidak sihat", severity: "unhealthy" },
    { range: "201–300", label: "Sangat tidak sihat", severity: "veryUnhealthy" },
    { range: ">300", label: "Berbahaya", severity: "hazardous" }
  ],
  keyExamFacts: [
    "Nitrogen adalah komponen terbesar udara, iaitu 78%",
    "Udara ialah campuran — boleh diasingkan melalui penyulingan berperingkat",
    "Fotosintesis menyingkirkan CO₂ dan membebaskan oksigen",
    "Api memerlukan haba, oksigen dan bahan api — singkirkan satu, api padam",
    "Karbon monoksida mengurangkan oksigen dalam darah",
    "SO₂ dan NO₂ kedua-duanya menyebabkan hujan asid",
    "CO₂ berlebihan menyebabkan kesan rumah hijau; CFC berlebihan menipiskan lapisan ozon",
    "Kenderaan hibrid & penukar bermangkin mengurangkan pencemaran udara"
  ],
  keyTerms: [
    "Udara", "Atmosfera", "Nitrogen", "Oksigen", "Karbon dioksida", "Gas nadir",
    "Penyulingan berperingkat", "Kitar karbon", "Kitar oksigen", "Fotosintesis",
    "Respirasi", "Pembakaran", "Segi tiga api", "Alat pemadam api",
    "Pencemaran udara", "Indeks Pencemaran Udara", "Hujan asid", "Kesan rumah hijau",
    "Lapisan ozon", "CFC", "Penukar bermangkin"
  ],
  chapterSummary: "Bab 7 merangkumi komposisi udara dan sebab udara ialah campuran, kepentingan setiap gas, kitar karbon dan oksigen yang mengekalkan keseimbangan, cara pembakaran dan keselamatan kebakaran berfungsi, serta punca, kesan dan kawalan pencemaran udara — termasuk Indeks Pencemaran Udara."
};

export const bab7Content = { en, bm };
export default bab7Content;
