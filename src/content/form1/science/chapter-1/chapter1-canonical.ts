export type Chapter1Lang = "en" | "bm";

export interface BilingualText {
  en: string;
  bm: string;
}

export type Chapter1LearningMode =
  | "NOTES"
  | "ACTIVITY"
  | "EXPERIMENT"
  | "QUIZ"
  | "PRACTICE"
  | "INTERACTIVE"
  | "MIND_MAP";

export interface Chapter1CoverageEntry {
  standard: `1.${number}.${number}`;
  modes: Chapter1LearningMode[];
  source: string;
}

export interface CanonicalApparatus {
  id:
    | "boiling-tube"
    | "test-tube"
    | "beaker"
    | "conical-flask"
    | "flat-bottom-flask"
    | "measuring-cylinder"
    | "burette"
    | "pipette"
    | "tripod-stand"
    | "wire-gauze"
    | "filter-funnel"
    | "gas-jar"
    | "retort-stand"
    | "evaporating-dish";
  name: BilingualText;
  function: BilingualText;
}

export type HazardKind = "irritant" | "radioactive" | "corrosive" | "toxic" | "explosive" | "flammable";

export interface CanonicalHazard {
  kind: HazardKind;
  name: BilingualText;
  body: BilingualText;
  examples: BilingualText;
}

export interface CanonicalProcessSkill {
  id: string;
  name: BilingualText;
  description: BilingualText;
}

export interface CanonicalInvestigationStep {
  id: string;
  step: number;
  heading: BilingualText;
  body: BilingualText;
}

export const chapter1Sources = {
  dskp: {
    chapterStandards: "DSKP KSSM Sains Tingkatan 1, printed pages 38-46 (PDF pages 50-58)",
    processSkills: "DSKP KSSM Sains Tingkatan 1, printed pages 10-11 (PDF pages 22-23)",
  },
  textbook: {
    chapter: "Buku Teks KSSM Sains Tingkatan 1, Bab 1, printed pages 4-42 (PDF pages 14-52)",
  },
} as const;

export const chapter1Terminology = {
  science: { en: "Science", bm: "Sains" },
  physicalQuantity: { en: "physical quantity", bm: "kuantiti fizik" },
  accuracy: { en: "Accuracy", bm: "Kejituan" },
  precision: { en: "Precision", bm: "Kepersisan" },
  sensitivity: { en: "Sensitivity", bm: "Kepekaan" },
  higherAccuracyTool: { en: "Higher-accuracy tool", bm: "Alat pengukur yang lebih jitu" },
  volume: { en: "volume", bm: "isi padu" },
  waterDisplacement: { en: "water displacement method", bm: "kaedah sesaran air" },
} as const;

export const scienceDefinition: BilingualText = {
  en: "Science is a discipline of knowledge involving systematic observations and experiments on natural phenomena.",
  bm: "Sains ialah disiplin ilmu yang melibatkan pemerhatian dan eksperimen yang sistematik terhadap fenomena alam semula jadi.",
};

export const scienceDailyConnections: BilingualText[] = [
  {
    en: "Hydroponic methods, fertilisers and pesticides help increase crop yields.",
    bm: "Kaedah hidroponik, baja dan racun serangga membantu meningkatkan hasil tanaman.",
  },
  {
    en: "Vaccines and antibiotics help control infectious diseases and reduce the death rate.",
    bm: "Vaksin dan antibiotik membantu mengawal penyakit berjangkit dan mengurangkan kadar kematian.",
  },
  {
    en: "Satellites make communication faster and more effective.",
    bm: "Satelit menjadikan komunikasi lebih cepat dan berkesan.",
  },
  {
    en: "Engineering knowledge supports the construction of sophisticated tall buildings.",
    bm: "Pengetahuan kejuruteraan menyokong pembinaan bangunan tinggi yang canggih.",
  },
];

export const laboratoryApparatus: CanonicalApparatus[] = [
  { id: "boiling-tube", name: { en: "Boiling tube", bm: "Tabung didih" }, function: { en: "Heats a small quantity of chemicals", bm: "Memanaskan bahan kimia dalam kuantiti yang kecil" } },
  { id: "test-tube", name: { en: "Test tube", bm: "Tabung uji" }, function: { en: "Holds a small quantity of chemicals", bm: "Mengisi bahan kimia dalam kuantiti yang kecil" } },
  { id: "beaker", name: { en: "Beaker", bm: "Bikar" }, function: { en: "Holds a large quantity of chemicals", bm: "Mengisi bahan kimia dalam kuantiti yang besar" } },
  { id: "conical-flask", name: { en: "Conical flask", bm: "Kelalang kon" }, function: { en: "Holds a large quantity of chemicals", bm: "Mengisi bahan kimia dalam kuantiti yang besar" } },
  { id: "flat-bottom-flask", name: { en: "Flat-bottom flask", bm: "Kelalang dasar leper" }, function: { en: "Holds a large quantity of chemicals", bm: "Mengisi bahan kimia dalam kuantiti yang besar" } },
  { id: "measuring-cylinder", name: { en: "Measuring cylinder", bm: "Silinder penyukat" }, function: { en: "Measures liquid volume", bm: "Menyukat isi padu cecair" } },
  { id: "burette", name: { en: "Burette", bm: "Buret" }, function: { en: "Measures liquid volume accurately", bm: "Menyukat isi padu cecair dengan tepat" } },
  { id: "pipette", name: { en: "Pipette", bm: "Pipet" }, function: { en: "Measures a fixed volume of liquid", bm: "Menyukat isi padu cecair yang tetap" } },
  { id: "tripod-stand", name: { en: "Tripod stand", bm: "Tungku kaki tiga" }, function: { en: "Supports apparatus during heating", bm: "Menyokong radas semasa pemanasan" } },
  { id: "wire-gauze", name: { en: "Wire gauze", bm: "Kasa dawai" }, function: { en: "Spreads heat evenly during heating", bm: "Membantu menyebarkan haba dengan sekata semasa pemanasan" } },
  { id: "filter-funnel", name: { en: "Filter funnel", bm: "Corong turas" }, function: { en: "Filters insoluble solids from a mixture", bm: "Menuras atau menapis pepejal tidak larut daripada campuran" } },
  { id: "gas-jar", name: { en: "Gas jar", bm: "Balang gas" }, function: { en: "Collects gas", bm: "Mengumpul gas" } },
  { id: "retort-stand", name: { en: "Retort stand", bm: "Kaki retort" }, function: { en: "Holds or supports apparatus", bm: "Memegang atau menyokong sesuatu radas" } },
  { id: "evaporating-dish", name: { en: "Evaporating dish", bm: "Piring sejat" }, function: { en: "Used for evaporation", bm: "Untuk tujuan penyejatan" } },
];

export const laboratoryHazards: CanonicalHazard[] = [
  {
    kind: "irritant",
    name: { en: "Irritant", bm: "Bahan merengsa" },
    body: { en: "Its vapour or fumes can hurt the eyes, nose and throat. Avoid inhaling them and use the chemical in a fume chamber.", bm: "Wap atau wasapnya boleh memedihkan mata, hidung dan tekak. Elakkan menghidu dan gunakan bahan kimia di dalam kebuk wasap." },
    examples: { en: "Chloroform, ammonia", bm: "Kloroform, ammonia" },
  },
  {
    kind: "radioactive",
    name: { en: "Radioactive", bm: "Bahan radioaktif" },
    body: { en: "Emits radioactive radiation that can cause cancer.", bm: "Mengeluarkan sinaran radioaktif yang dapat menyebabkan kanser." },
    examples: { en: "Uranium, plutonium", bm: "Uranium, plutonium" },
  },
  {
    kind: "corrosive",
    name: { en: "Corrosive", bm: "Bahan mengakis" },
    body: { en: "Do not touch it because it burns skin. If it contacts skin, wash the area with plenty of water.", bm: "Jangan sentuh kerana bahan ini akan melecurkan kulit. Jika terkena kulit, cuci bahagian itu dengan air yang banyak." },
    examples: { en: "Concentrated acids and alkalis", bm: "Asid dan alkali pekat" },
  },
  {
    kind: "toxic",
    name: { en: "Poisonous / toxic", bm: "Bahan beracun / toksik" },
    body: { en: "Do not drink, eat, inhale or taste this substance.", bm: "Jangan minum, makan, menghidu atau merasa bahan ini." },
    examples: { en: "Mercury, chlorine", bm: "Merkuri, klorin" },
  },
  {
    kind: "explosive",
    name: { en: "Explosive", bm: "Bahan mudah meletup" },
    body: { en: "Use this substance carefully according to instructions.", bm: "Gunakan bahan ini mengikut arahan dengan cermat." },
    examples: { en: "Hydrogen gas, butane gas", bm: "Gas hidrogen, gas butana" },
  },
  {
    kind: "flammable",
    name: { en: "Flammable", bm: "Bahan mudah terbakar" },
    body: { en: "Vaporises and burns easily. Keep it away from fire or heat and follow instructions carefully.", bm: "Mudah mengewap dan terbakar. Jauhkan daripada sumber api atau haba dan ikut arahan dengan cermat." },
    examples: { en: "Alcohol, petrol", bm: "Alkohol, petrol" },
  },
];

export const scienceProcessSkills: CanonicalProcessSkill[] = [
  { id: "observing", name: { en: "Observing", bm: "Memerhatikan" }, description: { en: "Uses sight, hearing, touch, taste or smell to collect information about objects and phenomena.", bm: "Menggunakan deria penglihatan, pendengaran, sentuhan, rasa atau bau untuk mengumpulkan maklumat tentang objek dan fenomena." } },
  { id: "classifying", name: { en: "Classifying", bm: "Mengelaskan" }, description: { en: "Groups objects or phenomena by similarities and differences found through observation.", bm: "Mengumpulkan objek atau fenomena berdasarkan persamaan dan perbezaan yang diperhatikan." } },
  { id: "measuring", name: { en: "Measuring and using numbers", bm: "Mengukur dan menggunakan nombor" }, description: { en: "Makes quantitative observations using numbers and instruments with standard units.", bm: "Membuat pemerhatian kuantitatif menggunakan nombor dan alat berunit piawai." } },
  { id: "inferring", name: { en: "Making inferences", bm: "Membuat inferens" }, description: { en: "Uses collected data and past experience to explain an event and form a conclusion.", bm: "Menggunakan data yang dikumpulkan dan pengalaman lalu untuk menerangkan peristiwa dan membuat kesimpulan." } },
  { id: "predicting", name: { en: "Predicting", bm: "Meramalkan" }, description: { en: "Makes an expectation about an event from observations, past experience or reliable data.", bm: "Membuat jangkaan tentang peristiwa berdasarkan pemerhatian, pengalaman lalu atau data yang boleh dipercayai." } },
  { id: "communicating", name: { en: "Communicating", bm: "Berkomunikasi" }, description: { en: "Uses words or graphic symbols such as tables, graphs, diagrams or models to explain actions, objects or events.", bm: "Menggunakan perkataan atau simbol grafik seperti jadual, graf, rajah atau model untuk menerangkan tindakan, objek atau peristiwa." } },
  { id: "space-time", name: { en: "Using space-time relationships", bm: "Menggunakan perhubungan ruang dan masa" }, description: { en: "Describes how parameters such as location, direction, shape, size, volume, weight or mass change with time.", bm: "Memperihalkan perubahan parameter seperti lokasi, arah, bentuk, saiz, isi padu, berat atau jisim dengan masa." } },
  { id: "interpreting", name: { en: "Interpreting data", bm: "Mentafsir data" }, description: { en: "Gives a rational explanation of objects, events or patterns from collected data.", bm: "Memberi penerangan yang rasional tentang objek, peristiwa atau pola daripada data yang dikumpulkan." } },
  { id: "operational", name: { en: "Defining operationally", bm: "Mendefinisi secara operasi" }, description: { en: "Interprets a concept by stating what is done and what is observed.", bm: "Memberi tafsiran tentang konsep dengan menyatakan perkara yang dilakukan dan diperhatikan." } },
  { id: "variables", name: { en: "Controlling variables", bm: "Mengawal pemboleh ubah" }, description: { en: "Identifies the manipulated, responding and constant variables; one variable is changed while the others are kept constant.", bm: "Mengenal pasti pemboleh ubah dimanipulasikan, bergerak balas dan dimalarkan; satu pemboleh ubah diubah sementara yang lain dimalarkan." } },
  { id: "hypothesis", name: { en: "Making a hypothesis", bm: "Membuat hipotesis" }, description: { en: "States a testable relationship between the manipulated and responding variables.", bm: "Menyatakan hubungan yang boleh diuji antara pemboleh ubah dimanipulasikan dengan pemboleh ubah bergerak balas." } },
  { id: "experimenting", name: { en: "Experimenting", bm: "Mengeksperimen" }, description: { en: "Plans and carries out an activity to test a hypothesis, collect and interpret data, and reach a conclusion.", bm: "Merancang dan menjalankan aktiviti untuk menguji hipotesis, mengumpul dan mentafsir data, serta membuat rumusan." } },
];

export const scientificInvestigationSteps: CanonicalInvestigationStep[] = [
  { id: "identify-problem", step: 1, heading: { en: "Identify a problem", bm: "Mengenal pasti masalah" }, body: { en: "Identify a problem that can be tested through a scientific investigation.", bm: "Mengenal pasti masalah yang boleh diuji melalui penyiasatan saintifik." } },
  { id: "hypothesis", step: 2, heading: { en: "Construct a hypothesis", bm: "Membina hipotesis" }, body: { en: "Form a testable initial explanation of the observation or phenomenon.", bm: "Membina penerangan awal yang boleh diuji tentang pemerhatian atau fenomena." } },
  { id: "variables", step: 3, heading: { en: "Control variables", bm: "Mengawal pemboleh ubah" }, body: { en: "Identify the manipulated, responding and constant variables.", bm: "Mengenal pasti pemboleh ubah dimanipulasikan, bergerak balas dan dimalarkan." } },
  { id: "plan", step: 4, heading: { en: "Plan an experiment", bm: "Merancang eksperimen" }, body: { en: "Plan the experimental design and select suitable materials and apparatus.", bm: "Merancang reka bentuk eksperimen serta memilih bahan dan radas yang sesuai." } },
  { id: "conduct", step: 5, heading: { en: "Conduct the experiment", bm: "Menjalankan eksperimen" }, body: { en: "Carry out the procedure carefully while observing safety precautions.", bm: "Menjalankan prosedur dengan cermat sambil mematuhi langkah keselamatan." } },
  { id: "collect", step: 6, heading: { en: "Collect data", bm: "Mengumpul data" }, body: { en: "Record data carefully with suitable instruments and repeat measurements at least three times when required.", bm: "Merekod data dengan cermat menggunakan alat yang sesuai dan mengulang pengukuran sekurang-kurangnya tiga kali apabila diperlukan." } },
  { id: "analyse", step: 7, heading: { en: "Analyse and interpret data", bm: "Menganalisis dan mentafsir data" }, body: { en: "Use tables or graphs to analyse and interpret the collected data.", bm: "Menggunakan jadual atau graf untuk menganalisis dan mentafsir data yang dikumpulkan." } },
  { id: "conclude", step: 8, heading: { en: "Make a conclusion", bm: "Membuat kesimpulan" }, body: { en: "Decide whether the hypothesis is accepted or rejected from the analysis.", bm: "Menentukan sama ada hipotesis diterima atau ditolak berdasarkan analisis." } },
  { id: "report", step: 9, heading: { en: "Write a report", bm: "Menulis laporan" }, body: { en: "Include the problem, hypothesis, aim, variables, materials and apparatus, procedure, results, analysis and conclusion.", bm: "Menyertakan masalah, hipotesis, tujuan, pemboleh ubah, bahan dan radas, prosedur, keputusan, analisis dan kesimpulan." } },
];

export const chapter1Coverage: Chapter1CoverageEntry[] = [
  { standard: "1.1.1", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.39; textbook pp.4-5" },
  { standard: "1.1.2", modes: ["NOTES", "QUIZ", "MIND_MAP"], source: "DSKP p.39; textbook p.4" },
  { standard: "1.1.3", modes: ["NOTES", "MIND_MAP"], source: "DSKP p.39; textbook p.5" },
  { standard: "1.1.4", modes: ["NOTES", "QUIZ", "MIND_MAP"], source: "DSKP p.39; textbook p.6" },
  { standard: "1.1.5", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.39; textbook p.7" },
  { standard: "1.1.6", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.39; textbook p.7" },
  { standard: "1.1.7", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.39; textbook p.8" },
  { standard: "1.2.1", modes: ["NOTES", "INTERACTIVE", "PRACTICE", "QUIZ", "MIND_MAP"], source: "DSKP p.40; textbook pp.10-11" },
  { standard: "1.2.2", modes: ["NOTES", "INTERACTIVE", "QUIZ", "MIND_MAP"], source: "DSKP p.40; textbook pp.11-12" },
  { standard: "1.2.3", modes: ["PRACTICE"], source: "DSKP p.40; textbook p.11" },
  { standard: "1.2.4", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.40; textbook pp.13-14" },
  { standard: "1.3.1", modes: ["NOTES", "QUIZ", "MIND_MAP"], source: "DSKP p.41; textbook p.15" },
  { standard: "1.3.2", modes: ["NOTES", "INTERACTIVE", "QUIZ", "MIND_MAP"], source: "DSKP p.41; textbook p.16" },
  { standard: "1.3.3", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.41; textbook p.16" },
  { standard: "1.3.4", modes: ["NOTES", "MIND_MAP"], source: "DSKP p.41; textbook pp.15,17-18" },
  { standard: "1.4.1", modes: ["NOTES", "EXPERIMENT"], source: "DSKP p.42; textbook pp.19-21" },
  { standard: "1.4.2", modes: ["NOTES", "INTERACTIVE", "EXPERIMENT", "QUIZ", "MIND_MAP"], source: "DSKP p.42; textbook pp.22-25" },
  { standard: "1.4.3", modes: ["NOTES", "INTERACTIVE", "QUIZ", "MIND_MAP"], source: "DSKP p.42; textbook p.26" },
  { standard: "1.4.4", modes: ["NOTES", "PRACTICE", "MIND_MAP"], source: "DSKP p.42; textbook pp.26-27" },
  { standard: "1.4.5", modes: ["NOTES", "INTERACTIVE", "MIND_MAP"], source: "DSKP p.42; textbook p.28" },
  { standard: "1.5.1", modes: ["NOTES", "EXPERIMENT", "MIND_MAP"], source: "DSKP p.43; textbook pp.29-30" },
  { standard: "1.5.2", modes: ["NOTES", "INTERACTIVE", "EXPERIMENT", "MIND_MAP"], source: "DSKP p.43; textbook p.30" },
  { standard: "1.5.3", modes: ["NOTES", "EXPERIMENT"], source: "DSKP p.43; textbook p.29" },
  { standard: "1.5.4", modes: ["NOTES", "EXPERIMENT", "QUIZ", "MIND_MAP"], source: "DSKP p.43; textbook pp.30-31" },
  { standard: "1.5.5", modes: ["NOTES", "MIND_MAP"], source: "DSKP p.43; textbook p.32" },
  { standard: "1.5.6", modes: ["ACTIVITY", "MIND_MAP"], source: "DSKP p.43; textbook p.32" },
  { standard: "1.6.1", modes: ["NOTES", "INTERACTIVE", "QUIZ"], source: "DSKP p.44 and pp.10-11; textbook p.33" },
  { standard: "1.6.2", modes: ["NOTES", "INTERACTIVE", "EXPERIMENT", "QUIZ", "MIND_MAP"], source: "DSKP p.44; textbook pp.34-35" },
  { standard: "1.6.3", modes: ["EXPERIMENT"], source: "DSKP p.44; textbook p.36" },
  { standard: "1.7.1", modes: ["NOTES", "INTERACTIVE", "QUIZ", "MIND_MAP"], source: "DSKP p.45; textbook pp.37-38" },
  { standard: "1.7.2", modes: ["NOTES"], source: "DSKP p.45; textbook pp.37-38" },
  { standard: "1.7.3", modes: ["PRACTICE"], source: "DSKP p.45; textbook pp.37-38" },
];

export function localize(text: BilingualText, lang: Chapter1Lang): string {
  return text[lang];
}
