// chapter1-content.ts
// Source-verified content for Chapter 1 / Bab 1 — Introduction to Scientific Investigation / Pengenalan kepada Penyiasatan Saintifik
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 2-41)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 2-41, official KSSM counterpart)
// Content data only — no presentation markup.

export interface FieldCard {
  icon: string;
  name: string;
  examples: string[];
}

export interface HazardSymbol {
  name: string;
  body: string;
  examples: string;
}

export interface ApparatusItem {
  name: string;
  function: string;
}

export interface BaseQuantityRow {
  quantity: string;
  unit: string;
  symbol: string;
}

export interface PrefixRow {
  prefix: string;
  value: string;
  standardForm: string;
  symbol: string;
}

export interface InstrumentCard {
  quantity: string;
  standardTool: string;
  higherAccuracyTool?: string;
  note: string;
}

export interface DensityRow {
  material: string;
  density: string;
}

export interface InvestigationStep {
  step: number;
  heading: string;
  body: string;
}

export interface Chapter1Content {
  hook: { title: string; body: string };
  scienceInLife: {
    importance: string[];
    fields: FieldCard[];
    careers: { field: string; jobs: string[] }[];
  };
  laboratory: {
    apparatus: ApparatusItem[];
    hazardSymbols: HazardSymbol[];
    rules: string[];
    safetyMeasures: string[];
    accidentSteps: string[];
  };
  quantitiesAndUnits: {
    baseQuantities: BaseQuantityRow[];
    prefixes: PrefixRow[];
    siImportance: string;
  };
  measuringInstruments: {
    definitions: { term: string; body: string }[];
    instruments: InstrumentCard[];
    errorTypes: { type: string; examples: string[]; waysToOvercome: string[] }[];
    estimationMethods: { quantity: string; method: string }[];
  };
  density: {
    formula: string;
    table: DensityRow[];
    everydayExamples: string[];
  };
  investigationSteps: {
    processSkills: string[];
    steps: InvestigationStep[];
  };
  attitudesAndValues: {
    core: string[];
    additional: string[];
    purpose: string;
  };
}

const en: Chapter1Content = {
  hook: {
    title: "Why this matters",
    body: "Every building, vaccine, and satellite you rely on exists because someone followed a rigorous process to test an idea. This chapter is your toolkit for thinking like a scientist — from lab safety to the exact steps that turn a question into a trustworthy answer."
  },
  scienceInLife: {
    importance: [
      "Engineering — construction of tall buildings",
      "Communication — invention of satellites",
      "Agriculture — fertilisers, pesticides, hydroponic methods increase crop yields",
      "Medicine — vaccines and antibiotics control infectious diseases and reduce death rate"
    ],
    fields: [
      { icon: "⚛️", name: "Physics", examples: ["Study of energy and its influence on matter", "Example: Engineering"] },
      { icon: "🧬", name: "Biology", examples: ["Study of living things", "Examples: Zoology, microbiology, physiology, botany"] },
      { icon: "🧪", name: "Chemistry", examples: ["Study of matter and its reactions", "Examples: Pharmacology, forensics, toxicology"] },
      { icon: "🪨", name: "Geology", examples: ["Study of rocks, soil and minerals", "Examples: Geochemistry, geomorphology, geophysics"] },
      { icon: "🔭", name: "Astronomy", examples: ["Study of planets, stars and other objects in the universe", "Example: Astrophysics"] },
      { icon: "🌦️", name: "Meteorology", examples: ["Study of weather and climate change", "Example: Hydrometeorology"] }
    ],
    careers: [
      { field: "Physics", jobs: ["Astronomer", "Oceanographer", "Teacher", "Meteorologist", "Engineer", "Physicist"] },
      { field: "Biology", jobs: ["Medical doctor", "Botanist", "Zoologist", "Teacher", "Oceanographer", "Microbiologist", "Biologist"] },
      { field: "Chemistry", jobs: ["Pharmacist", "Oceanographer", "Teacher", "Forensic scientist", "Chemist"] },
      { field: "Geology", jobs: ["Geologist", "Teacher"] }
    ]
  },
  laboratory: {
    apparatus: [
      { name: "Boiling tube", function: "To heat small amounts of chemicals" },
      { name: "Test tube", function: "To hold small amounts of chemicals" },
      { name: "Beaker", function: "To hold larger amounts of chemicals" },
      { name: "Conical flask", function: "To hold larger amounts of chemicals" },
      { name: "Flat-bottom flask", function: "To hold larger amounts of chemicals" },
      { name: "Measuring cylinder", function: "To measure volume of liquid" },
      { name: "Burette", function: "To measure volume of liquid accurately" },
      { name: "Pipette", function: "To measure a fixed volume of liquid" },
      { name: "Tripod stand", function: "To support apparatus during heating" },
      { name: "Wire gauze", function: "To spread heat evenly during heating" },
      { name: "Filter funnel", function: "To filter or separate insoluble solids from mixtures" },
      { name: "Gas jar", function: "To contain gas" },
      { name: "Retort stand with clamp", function: "To hold or support apparatus" },
      { name: "Evaporating dish", function: "To evaporate excess solvent" }
    ],
    hazardSymbols: [
      { name: "Irritant", body: "Gives out vapour or fumes that hurt eyes, nose and throat. Avoid inhaling; use inside a fume chamber.", examples: "Chloroform, ammonia" },
      { name: "Radioactive", body: "Emits radioactive rays that can cause cancer.", examples: "Uranium, plutonium" },
      { name: "Corrosive", body: "Do not touch — will burn skin. Wash affected area with lots of water if contacted.", examples: "Concentrated acid and alkali" },
      { name: "Poison / Toxic", body: "Do not drink, eat, smell or taste.", examples: "Mercury, chlorine" },
      { name: "Explosive", body: "Use according to instructions carefully.", examples: "Hydrogen gas, butane gas" },
      { name: "Flammable", body: "Easily vaporises and is flammable — keep away from fire or heat sources.", examples: "Alcohol, petrol" }
    ],
    rules: [
      "Do not enter the laboratory without permission",
      "Never start an experiment without the teacher's instructions",
      "Read and understand the instructions beforehand",
      "Use chemicals and apparatus correctly and carefully",
      "Eating, drinking and playing are prohibited",
      "Do not take apparatus or chemicals out of the laboratory",
      "Keep apparatus and chemicals in their original places after use",
      "Keep the experiment area neat and clean",
      "Wash apparatus and dispose of waste according to correct procedures",
      "Wash your hands with soap and water before leaving"
    ],
    safetyMeasures: [
      "Do not point the mouth of a test tube at your face or others",
      "Use safety goggles when mixing or heating chemicals",
      "Keep highly flammable chemicals away from heat sources",
      "Do not taste or smell anything unless allowed by the teacher"
    ],
    accidentSteps: [
      "Report spilled chemicals to the teacher immediately",
      "Avoid contact with the chemical",
      "If chemical contacts skin, rinse with plenty of water"
    ]
  },
  quantitiesAndUnits: {
    baseQuantities: [
      { quantity: "Length", unit: "metre", symbol: "m" },
      { quantity: "Mass", unit: "kilogram", symbol: "kg" },
      { quantity: "Time", unit: "second", symbol: "s" },
      { quantity: "Temperature", unit: "kelvin", symbol: "K" },
      { quantity: "Electric current", unit: "ampere", symbol: "A" }
    ],
    prefixes: [
      { prefix: "giga", value: "1 000 000 000", standardForm: "10⁹", symbol: "G" },
      { prefix: "mega", value: "1 000 000", standardForm: "10⁶", symbol: "M" },
      { prefix: "kilo", value: "1 000", standardForm: "10³", symbol: "k" },
      { prefix: "deci", value: "0.1", standardForm: "10⁻¹", symbol: "d" },
      { prefix: "centi", value: "0.01", standardForm: "10⁻²", symbol: "c" },
      { prefix: "milli", value: "0.001", standardForm: "10⁻³", symbol: "m" },
      { prefix: "micro", value: "0.000 001", standardForm: "10⁻⁶", symbol: "µ" },
      { prefix: "nano", value: "0.000 000 001", standardForm: "10⁻⁹", symbol: "n" }
    ],
    siImportance: "S.I. units (Système Internationale d'Unités) have been the standard since 1960, preventing the confusion of non-standard units like span, fathom, pace and cubit, and allowing accurate exchange of data and scientific knowledge worldwide."
  },
  measuringInstruments: {
    definitions: [
      { term: "Accuracy", body: "The ability of a measuring instrument to obtain a value closest to the actual value." },
      { term: "Consistency", body: "The ability of a measuring instrument to give the same readings with repeated measurements." },
      { term: "Sensitivity", body: "The ability of a measuring instrument to detect a small change in the measurement quantity." }
    ],
    instruments: [
      { quantity: "Length", standardTool: "Ruler / measuring tape", higherAccuracyTool: "Vernier calipers (0.01 cm) / Micrometer screw gauge (0.001 cm)", note: "Eyes must be perpendicular to the scale to avoid parallax error" },
      { quantity: "Mass", standardTool: "Lever balance / triple beam balance", higherAccuracyTool: "Digital electronic balance", note: "S.I. unit is kilogram (kg)" },
      { quantity: "Time", standardTool: "Stopwatch (0.1s or 0.2s accuracy)", higherAccuracyTool: "Digital stopwatch (0.01s accuracy)", note: "S.I. unit is second (s)" },
      { quantity: "Temperature", standardTool: "Laboratory thermometer (1°C) / clinical thermometer (0.1°C)", higherAccuracyTool: "Digital thermometer (0.1°C)", note: "Convert °C to K by adding 273" },
      { quantity: "Electric current", standardTool: "Ammeter", higherAccuracyTool: "Digital ammeter (0.01A accuracy)", note: "Used to measure current in a circuit" },
      { quantity: "Volume", standardTool: "Measuring cylinder", note: "Read at eye level, perpendicular to scale, to avoid parallax error" }
    ],
    errorTypes: [
      { type: "Systematic errors", examples: ["Zero error", "Inaccurate measuring instrument"], waysToOvercome: ["Conduct experiments with caution", "Repeat using different measuring instruments"] },
      { type: "Random errors", examples: ["Parallax error", "Carelessness of observer", "Wrong technique"], waysToOvercome: ["Take several readings and average them", "Keep eyes perpendicular to the scale"] }
    ],
    estimationMethods: [
      { quantity: "Length", method: "Use a known small object (e.g. a pencil) to estimate before using a ruler for the actual measurement" },
      { quantity: "Area", method: "Regular shapes: use formulae. Irregular shapes: use the graph paper method, counting squares half-or-more covered" },
      { quantity: "Mass", method: "Estimate using a known reference (e.g. mass of 100 sheets of paper ÷ 100 = mass of 1 sheet)" },
      { quantity: "Volume", method: "Regular shapes: use formula (height × width × length). Irregular shapes: use the water displacement method" }
    ]
  },
  density: {
    formula: "Density (g cm⁻³) = Mass (g) ÷ Volume (cm³)",
    table: [
      { material: "Gold", density: "19.30" },
      { material: "Mercury", density: "13.60" },
      { material: "Lead", density: "11.30" },
      { material: "Copper", density: "8.92" },
      { material: "Aluminium", density: "2.70" },
      { material: "Seawater", density: "1.03" },
      { material: "Pure water (40°C)", density: "1.00" },
      { material: "Ice", density: "0.92" },
      { material: "Petrol", density: "0.80" },
      { material: "Cork", density: "0.24" }
    ],
    everydayExamples: [
      "Ice is less dense than water, so ice floats on the surface",
      "Helium-filled balloons float in air because helium is less dense than air",
      "Timber can be transported by water because timber is less dense than water",
      "The Dead Sea has extremely high salt content, making its water denser — this is why people float on it easily"
    ]
  },
  investigationSteps: {
    processSkills: ["Observing", "Classifying", "Measuring and using numbers", "Making inferences", "Predicting", "Communicating", "Using space-time relationships", "Interpreting data", "Defining operationally", "Controlling variables", "Making a hypothesis", "Experimenting"],
    steps: [
      { step: 1, heading: "Identify a problem", body: "Identify a problem that could be tested with a scientific investigation." },
      { step: 2, heading: "Construct a hypothesis", body: "Build an initial explanation of the observation or phenomenon being investigated. The hypothesis must be testable." },
      { step: 3, heading: "Control variables", body: "Identify the manipulated variable, responding variable, and constant variables involved." },
      { step: 4, heading: "Plan an experiment", body: "Design the experiment carefully and choose the right materials and apparatus." },
      { step: 5, heading: "Conduct the experiment", body: "Follow safety measures and take precautions throughout to obtain accurate data." },
      { step: 6, heading: "Collect data", body: "Collect data carefully with suitable instruments, accounting for random or systematic error. Take at least three readings for accuracy." },
      { step: 7, heading: "Analyse and interpret data", body: "Use graphs and tables to communicate and interpret the data effectively." },
      { step: 8, heading: "Make a conclusion", body: "Conclude whether the hypothesis is accepted or rejected. If rejected, form a new hypothesis and repeat." },
      { step: 9, heading: "Write a report", body: "Include problem statement, hypothesis, aim, variables, materials/apparatus, procedure, results, analysis, and conclusion." }
    ]
  },
  attitudesAndValues: {
    core: [
      "Be interested and curious about surroundings",
      "Be honest and accurate while recording and validating data",
      "Be responsible for your own and others' safety as well as for the environment"
    ],
    additional: [
      "Realise that scientific knowledge is one way to understand our environment",
      "Appreciate and practise a clean and healthy lifestyle",
      "Appreciate the balance in the natural environment",
      "Be polite and respect each other",
      "Be grateful that the natural environment is a gift from God"
    ],
    purpose: "Practising scientific attitudes and values leads to more accurate results, effective decision-making, willingness to adapt to new ideas, and becoming a responsible, creative researcher and problem solver."
  }
};

const bm: Chapter1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bangunan, vaksin dan satelit yang anda bergantung kepadanya wujud kerana seseorang mengikuti proses yang teliti untuk menguji sesuatu idea. Bab ini adalah asas untuk berfikir seperti seorang saintis — daripada keselamatan makmal hingga langkah tepat yang mengubah soalan menjadi jawapan yang boleh dipercayai."
  },
  scienceInLife: {
    importance: [
      "Kejuruteraan — pembinaan bangunan tinggi",
      "Komunikasi — penciptaan satelit",
      "Pertanian — baja, racun serangga, kaedah hidroponik meningkatkan hasil tanaman",
      "Perubatan — vaksin dan antibiotik mengawal penyakit berjangkit dan mengurangkan kadar kematian"
    ],
    fields: [
      { icon: "⚛️", name: "Fizik", examples: ["Kajian tentang tenaga dan pengaruhnya terhadap jirim", "Contoh: Kejuruteraan"] },
      { icon: "🧬", name: "Biologi", examples: ["Kajian tentang benda hidup", "Contoh: Zoologi, mikrobiologi, fisiologi, botani"] },
      { icon: "🧪", name: "Kimia", examples: ["Kajian tentang jirim dan tindak balasnya", "Contoh: Farmakologi, forensik, toksikologi"] },
      { icon: "🪨", name: "Geologi", examples: ["Kajian tentang batuan, tanah dan mineral", "Contoh: Geokimia, geomorfologi, geofizik"] },
      { icon: "🔭", name: "Astronomi", examples: ["Kajian tentang planet, bintang dan objek lain di alam semesta", "Contoh: Astrofizik"] },
      { icon: "🌦️", name: "Meteorologi", examples: ["Kajian tentang cuaca dan perubahan iklim", "Contoh: Hidrometeorologi"] }
    ],
    careers: [
      { field: "Fizik", jobs: ["Ahli astronomi", "Oseanografer", "Guru", "Ahli meteorologi", "Jurutera", "Ahli fizik"] },
      { field: "Biologi", jobs: ["Doktor perubatan", "Ahli botani", "Ahli zoologi", "Guru", "Oseanografer", "Ahli mikrobiologi", "Ahli biologi"] },
      { field: "Kimia", jobs: ["Ahli farmasi", "Oseanografer", "Guru", "Saintis forensik", "Ahli kimia"] },
      { field: "Geologi", jobs: ["Ahli geologi", "Guru"] }
    ]
  },
  laboratory: {
    apparatus: [
      { name: "Tabung didih", function: "Untuk memanaskan sedikit bahan kimia" },
      { name: "Tabung uji", function: "Untuk menyimpan sedikit bahan kimia" },
      { name: "Bikar", function: "Untuk menyimpan bahan kimia dalam jumlah besar" },
      { name: "Kelalang kon", function: "Untuk menyimpan bahan kimia dalam jumlah besar" },
      { name: "Kelalang dasar leper", function: "Untuk menyimpan bahan kimia dalam jumlah besar" },
      { name: "Silinder penyukat", function: "Untuk mengukur isi padu cecair" },
      { name: "Buret", function: "Untuk mengukur isi padu cecair dengan tepat" },
      { name: "Pipet", function: "Untuk mengukur isi padu cecair yang tetap" },
      { name: "Kaki tiga", function: "Untuk menyokong radas semasa pemanasan" },
      { name: "Kasa dawai", function: "Untuk menyebarkan haba secara sekata semasa pemanasan" },
      { name: "Corong turas", function: "Untuk menuras atau mengasingkan pepejal tak terlarut daripada campuran" },
      { name: "Balang gas", function: "Untuk menyimpan gas" },
      { name: "Kaki retort dengan pengapit", function: "Untuk menyokong radas" },
      { name: "Piring pemejalwapan", function: "Untuk memejalwapkan lebihan pelarut" }
    ],
    hazardSymbols: [
      { name: "Bahan merengsa", body: "Menghasilkan wap atau wasap yang memedihkan mata, hidung dan tekak. Elakkan menghidu; gunakan di dalam kebuk wasap.", examples: "Kloroform, ammonia" },
      { name: "Bahan radioaktif", body: "Mengeluarkan sinaran radioaktif yang boleh menyebabkan kanser.", examples: "Uranium, plutonium" },
      { name: "Bahan mengakis", body: "Jangan sentuh — akan melecurkan kulit. Cuci dengan air yang banyak jika terkena kulit.", examples: "Asid dan alkali pekat" },
      { name: "Bahan beracun / toksik", body: "Jangan minum, makan, menghidu atau merasa.", examples: "Merkuri, klorin" },
      { name: "Bahan mudah meletup", body: "Gunakan mengikut arahan dengan cermat.", examples: "Gas hidrogen, gas butana" },
      { name: "Bahan mudah terbakar", body: "Mudah mengewap dan terbakar — jauhkan daripada sumber api atau haba.", examples: "Alkohol, petrol" }
    ],
    rules: [
      "Jangan masuk ke dalam makmal tanpa kebenaran",
      "Jangan mulakan eksperimen sebelum diarahkan oleh guru",
      "Baca dan fahami arahan terlebih dahulu",
      "Gunakan bahan kimia dan radas dengan betul dan cermat",
      "Dilarang makan, minum dan bermain-main di dalam makmal",
      "Dilarang mengeluarkan radas dan bahan kimia dari makmal",
      "Kembalikan radas dan bahan kimia ke tempat asal selepas digunakan",
      "Pastikan tempat eksperimen sentiasa kemas dan bersih",
      "Cuci radas dan buang bahan buangan mengikut kaedah yang betul",
      "Cuci tangan dengan sabun dan air sebelum meninggalkan makmal"
    ],
    safetyMeasures: [
      "Jangan hala mulut tabung uji ke muka anda atau orang lain",
      "Gunakan goggle keselamatan semasa mencampur atau memanaskan bahan kimia",
      "Jauhkan bahan kimia mudah terbakar daripada sumber haba",
      "Jangan merasa atau menghidu apa-apa kecuali dibenarkan oleh guru"
    ],
    accidentSteps: [
      "Laporkan bahan kimia yang tertumpah kepada guru dengan segera",
      "Elakkan sebarang sentuhan dengan bahan kimia",
      "Jika bahan kimia terkena kulit, bilas dengan air yang banyak"
    ]
  },
  quantitiesAndUnits: {
    baseQuantities: [
      { quantity: "Panjang", unit: "meter", symbol: "m" },
      { quantity: "Jisim", unit: "kilogram", symbol: "kg" },
      { quantity: "Masa", unit: "saat", symbol: "s" },
      { quantity: "Suhu", unit: "kelvin", symbol: "K" },
      { quantity: "Arus elektrik", unit: "ampere", symbol: "A" }
    ],
    prefixes: [
      { prefix: "giga", value: "1 000 000 000", standardForm: "10⁹", symbol: "G" },
      { prefix: "mega", value: "1 000 000", standardForm: "10⁶", symbol: "M" },
      { prefix: "kilo", value: "1 000", standardForm: "10³", symbol: "k" },
      { prefix: "desi", value: "0.1", standardForm: "10⁻¹", symbol: "d" },
      { prefix: "senti", value: "0.01", standardForm: "10⁻²", symbol: "c" },
      { prefix: "mili", value: "0.001", standardForm: "10⁻³", symbol: "m" },
      { prefix: "mikro", value: "0.000 001", standardForm: "10⁻⁶", symbol: "µ" },
      { prefix: "nano", value: "0.000 000 001", standardForm: "10⁻⁹", symbol: "n" }
    ],
    siImportance: "Unit S.I. (Système Internationale d'Unités) telah menjadi unit piawai sejak 1960, mengelakkan kekeliruan unit tidak piawai seperti jengkal, depa, tapak dan hasta, serta membolehkan pertukaran data dan ilmu sains yang tepat di seluruh dunia."
  },
  measuringInstruments: {
    definitions: [
      { term: "Kejituan", body: "Kebolehan alat pengukur untuk mendapatkan bacaan menghampiri atau menepati nilai sebenarnya." },
      { term: "Kepersisan", body: "Kebolehan alat pengukur memberikan bacaan yang hampir sama apabila pengukuran diulang." },
      { term: "Kepekaan", body: "Kebolehan alat pengukur mengesan perubahan kecil sesuatu kuantiti yang diukur." }
    ],
    instruments: [
      { quantity: "Panjang", standardTool: "Pembaris / pita pengukur", higherAccuracyTool: "Angkup vernier (0.01 cm) / Tolok skru mikrometer (0.001 cm)", note: "Mata mesti berserenjang dengan skala untuk mengelakkan ralat paralaks" },
      { quantity: "Jisim", standardTool: "Neraca tuas / neraca tiga alur", higherAccuracyTool: "Neraca elektronik digital", note: "Unit S.I. ialah kilogram (kg)" },
      { quantity: "Masa", standardTool: "Jam randik (ketepatan 0.1s atau 0.2s)", higherAccuracyTool: "Jam randik digital (ketepatan 0.01s)", note: "Unit S.I. ialah saat (s)" },
      { quantity: "Suhu", standardTool: "Termometer makmal (1°C) / termometer klinikal (0.1°C)", higherAccuracyTool: "Termometer digital (0.1°C)", note: "Tukar °C ke K dengan menambah 273" },
      { quantity: "Arus elektrik", standardTool: "Ammeter", higherAccuracyTool: "Ammeter digital (ketepatan 0.01A)", note: "Digunakan untuk mengukur arus dalam litar" },
      { quantity: "Isi padu", standardTool: "Silinder penyukat", note: "Baca pada aras mata, berserenjang dengan skala, untuk mengelakkan ralat paralaks" }
    ],
    errorTypes: [
      { type: "Ralat sistematik", examples: ["Ralat sifar", "Alat pengukur yang tidak jitu"], waysToOvercome: ["Jalankan eksperimen dengan berhati-hati", "Ulang menggunakan alat pengukur berlainan"] },
      { type: "Ralat rawak", examples: ["Ralat paralaks", "Kecuaian pemerhati", "Teknik yang salah"], waysToOvercome: ["Ambil beberapa bacaan dan kira purata", "Pastikan mata berserenjang dengan skala"] }
    ],
    estimationMethods: [
      { quantity: "Panjang", method: "Gunakan objek kecil yang diketahui (cth: pensel) untuk menganggar sebelum menggunakan pembaris untuk ukuran sebenar" },
      { quantity: "Luas", method: "Bentuk sekata: gunakan rumus. Bentuk tak sekata: gunakan kaedah kertas graf, kira petak yang diliputi separuh atau lebih" },
      { quantity: "Jisim", method: "Anggarkan menggunakan rujukan yang diketahui (cth: jisim 100 helai kertas ÷ 100 = jisim 1 helai kertas)" },
      { quantity: "Isi padu", method: "Bentuk sekata: gunakan rumus (tinggi × lebar × panjang). Bentuk tak sekata: gunakan kaedah anjakan air" }
    ]
  },
  density: {
    formula: "Ketumpatan (g cm⁻³) = Jisim (g) ÷ Isi padu (cm³)",
    table: [
      { material: "Emas", density: "19.30" },
      { material: "Merkuri", density: "13.60" },
      { material: "Plumbum", density: "11.30" },
      { material: "Kuprum", density: "8.92" },
      { material: "Aluminium", density: "2.70" },
      { material: "Air laut", density: "1.03" },
      { material: "Air tulen (40°C)", density: "1.00" },
      { material: "Ais", density: "0.92" },
      { material: "Petrol", density: "0.80" },
      { material: "Gabus", density: "0.24" }
    ],
    everydayExamples: [
      "Ais kurang tumpat daripada air, jadi ais terapung di permukaan",
      "Belon berisi gas helium terapung di udara kerana helium kurang tumpat daripada udara",
      "Kayu balak boleh diangkut melalui air kerana kayu balak kurang tumpat berbanding air",
      "Laut Mati mempunyai kandungan garam yang sangat tinggi, menjadikan airnya lebih tumpat — sebab itu orang mudah terapung di dalamnya"
    ]
  },
  investigationSteps: {
    processSkills: ["Memerhati", "Mengelas", "Mengukur dan menggunakan nombor", "Membuat inferens", "Meramal", "Berkomunikasi", "Menggunakan perhubungan ruang-masa", "Mentafsir data", "Mentakrif secara operasi", "Mengawal pemboleh ubah", "Membuat hipotesis", "Mengeksperimen"],
    steps: [
      { step: 1, heading: "Mengenal pasti masalah", body: "Mengenal pasti masalah yang boleh diuji melalui penyiasatan saintifik." },
      { step: 2, heading: "Membina hipotesis", body: "Membina penjelasan awal tentang pemerhatian atau fenomena yang dikaji. Hipotesis mesti boleh diuji." },
      { step: 3, heading: "Mengawal pemboleh ubah", body: "Kenal pasti pemboleh ubah dimanipulasi, bergerak balas, dan dimalarkan yang terlibat." },
      { step: 4, heading: "Merancang eksperimen", body: "Rancang eksperimen dengan teliti dan pilih bahan serta radas yang sesuai." },
      { step: 5, heading: "Menjalankan eksperimen", body: "Patuhi langkah keselamatan dan berhati-hati sepanjang eksperimen untuk mendapatkan data yang tepat." },
      { step: 6, heading: "Mengumpul data", body: "Kumpul data dengan berhati-hati menggunakan alat yang sesuai, mengambil kira ralat rawak atau sistematik. Ambil sekurang-kurangnya tiga bacaan untuk ketepatan." },
      { step: 7, heading: "Menganalisis dan mentafsirkan data", body: "Gunakan graf dan jadual untuk menyampaikan dan mentafsir data dengan berkesan." },
      { step: 8, heading: "Membuat kesimpulan", body: "Simpulkan sama ada hipotesis diterima atau ditolak. Jika ditolak, bina hipotesis baharu dan ulangi." },
      { step: 9, heading: "Menulis laporan", body: "Sertakan pernyataan masalah, hipotesis, tujuan, pemboleh ubah, bahan/radas, prosedur, keputusan, analisis, dan kesimpulan." }
    ]
  },
  attitudesAndValues: {
    core: [
      "Berminat dan bersifat ingin tahu tentang alam sekeliling",
      "Jujur dan tepat dalam merekod dan mengesahkan data",
      "Bertanggungjawab terhadap keselamatan diri dan rakan serta terhadap alam sekitar"
    ],
    additional: [
      "Menyedari bahawa ilmu sains adalah salah satu cara memahami alam sekeliling",
      "Menghargai dan mengamalkan cara hidup bersih dan sihat",
      "Menghargai keseimbangan alam semula jadi",
      "Bersopan santun dan saling menghormati",
      "Bersyukur kerana alam semula jadi adalah kurniaan Tuhan"
    ],
    purpose: "Mengamalkan sikap saintifik dan nilai murni membawa kepada keputusan yang lebih tepat, pembuatan keputusan yang berkesan, kesediaan menerima idea baharu, serta menjadi penyelidik dan penyelesai masalah yang bertanggungjawab dan kreatif."
  }
};

export const chapter1Content = { en, bm };
export default chapter1Content;
