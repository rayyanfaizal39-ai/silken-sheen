import {
  chapter1Terminology,
  laboratoryApparatus,
  laboratoryHazards,
  localize,
  scienceDailyConnections,
  scienceDefinition,
  scienceProcessSkills,
  scientificInvestigationSteps,
  type Chapter1Lang,
  type HazardKind,
} from "./chapter1-canonical";
import {
  chapter1LearningExperiences,
  type Chapter1LearningExperience,
  type Chapter1Section,
} from "./chapter1-activities";

export interface FieldCard {
  icon: string;
  name: string;
  description: string;
  examples: string[];
}

export interface HazardSymbol {
  kind: HazardKind;
  name: string;
  body: string;
  examples: string;
}

export interface ApparatusItem {
  id: (typeof laboratoryApparatus)[number]["id"];
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

export interface ProcessSkill {
  name: string;
  description: string;
}

export interface LocalizedLearningExperience {
  id: string;
  standards: string[];
  mode: Chapter1LearningExperience["mode"];
  title: string;
  purpose: string;
  instructions: string[];
  studentOutput: string;
  practicalNotice?: string;
}

export interface Chapter1Content {
  hook: { title: string; body: string };
  scienceInLife: {
    definition: string;
    dailyConnections: string[];
    importance: string[];
    fields: FieldCard[];
    careers: { field: string; subject: string; jobs: string[] }[];
    innovation: { definition: string; examples: string[] };
  };
  laboratory: {
    apparatus: ApparatusItem[];
    hazardSymbols: HazardSymbol[];
    rules: string[];
    safetyMeasures: string[];
    accidentSteps: string[];
  };
  quantitiesAndUnits: {
    physicalQuantityDefinition: string;
    baseQuantities: BaseQuantityRow[];
    prefixes: PrefixRow[];
    conversions: { question: string; working: string; answer: string }[];
    siImportance: string;
  };
  measuringInstruments: {
    definitions: { term: string; body: string }[];
    instruments: InstrumentCard[];
    errorTypes: { type: string; definition: string; examples: string[]; waysToOvercome: string[] }[];
    estimationMethods: { quantity: string; method: string }[];
    innovation: string;
  };
  density: {
    definition: string;
    operationalDefinition: string;
    formula: string;
    workedExample: { problem: string; working: string[]; answer: string };
    waterDisplacement: string[];
    table: DensityRow[];
    everydayExamples: string[];
  };
  investigationSteps: {
    processSkills: ProcessSkill[];
    steps: InvestigationStep[];
  };
  attitudesAndValues: {
    core: string[];
    additional: string[];
    purpose: string;
  };
  learningExperiences: Record<Chapter1Section, LocalizedLearningExperience[]>;
}

function localizeExperiences(lang: Chapter1Lang): Record<Chapter1Section, LocalizedLearningExperience[]> {
  const sections: Chapter1Section[] = ["science", "laboratory", "units", "measurement", "density", "investigation", "values"];
  return Object.fromEntries(
    sections.map((section) => [
      section,
      chapter1LearningExperiences
        .filter((experience) => experience.section === section)
        .map((experience) => ({
          id: experience.id,
          standards: experience.standards,
          mode: experience.mode,
          title: localize(experience.title, lang),
          purpose: localize(experience.purpose, lang),
          instructions: experience.instructions.map((instruction) => localize(instruction, lang)),
          studentOutput: localize(experience.studentOutput, lang),
          practicalNotice: experience.practicalNotice ? localize(experience.practicalNotice, lang) : undefined,
        })),
    ]),
  ) as Record<Chapter1Section, LocalizedLearningExperience[]>;
}

const commonPrefixes = {
  en: [
    { prefix: "giga", value: "1 000 000 000", standardForm: "10⁹", symbol: "G" },
    { prefix: "mega", value: "1 000 000", standardForm: "10⁶", symbol: "M" },
    { prefix: "kilo", value: "1 000", standardForm: "10³", symbol: "k" },
    { prefix: "deci", value: "0.1", standardForm: "10⁻¹", symbol: "d" },
    { prefix: "centi", value: "0.01", standardForm: "10⁻²", symbol: "c" },
    { prefix: "milli", value: "0.001", standardForm: "10⁻³", symbol: "m" },
    { prefix: "micro", value: "0.000 001", standardForm: "10⁻⁶", symbol: "µ" },
    { prefix: "nano", value: "0.000 000 001", standardForm: "10⁻⁹", symbol: "n" },
  ],
  bm: [
    { prefix: "giga", value: "1 000 000 000", standardForm: "10⁹", symbol: "G" },
    { prefix: "mega", value: "1 000 000", standardForm: "10⁶", symbol: "M" },
    { prefix: "kilo", value: "1 000", standardForm: "10³", symbol: "k" },
    { prefix: "desi", value: "0.1", standardForm: "10⁻¹", symbol: "d" },
    { prefix: "senti", value: "0.01", standardForm: "10⁻²", symbol: "c" },
    { prefix: "mili", value: "0.001", standardForm: "10⁻³", symbol: "m" },
    { prefix: "mikro", value: "0.000 001", standardForm: "10⁻⁶", symbol: "µ" },
    { prefix: "nano", value: "0.000 000 001", standardForm: "10⁻⁹", symbol: "n" },
  ],
} satisfies Record<Chapter1Lang, PrefixRow[]>;

const densityTables: Record<Chapter1Lang, DensityRow[]> = {
  en: [
    { material: "Gold", density: "19.30" },
    { material: "Mercury", density: "13.60" },
    { material: "Lead", density: "11.30" },
    { material: "Copper", density: "8.92" },
    { material: "Aluminium", density: "2.70" },
    { material: "Seawater", density: "1.03" },
    { material: "Pure water (40°C)", density: "1.00" },
    { material: "Ice", density: "0.92" },
    { material: "Petrol", density: "0.80" },
    { material: "Cork", density: "0.24" },
  ],
  bm: [
    { material: "Emas", density: "19.30" },
    { material: "Merkuri", density: "13.60" },
    { material: "Plumbum", density: "11.30" },
    { material: "Kuprum", density: "8.92" },
    { material: "Aluminium", density: "2.70" },
    { material: "Air laut", density: "1.03" },
    { material: "Air tulen (40°C)", density: "1.00" },
    { material: "Ais", density: "0.92" },
    { material: "Petrol", density: "0.80" },
    { material: "Gabus", density: "0.24" },
  ],
};

function buildContent(lang: Chapter1Lang): Chapter1Content {
  const en = lang === "en";
  const tr = <T extends { en: string; bm: string }>(value: T) => localize(value, lang);

  return {
    hook: en
      ? {
          title: "Why this matters",
          body: "Science connects daily observations to systematic investigation. In this chapter, you will learn laboratory safety, measurement, density and the method used to carry out a scientific investigation.",
        }
      : {
          title: "Mengapa ini penting",
          body: "Sains menghubungkan pemerhatian harian dengan penyiasatan yang sistematik. Dalam bab ini, anda akan mempelajari keselamatan makmal, pengukuran, ketumpatan dan kaedah menjalankan penyiasatan saintifik.",
        },
    scienceInLife: {
      definition: tr(scienceDefinition),
      dailyConnections: scienceDailyConnections.map(tr),
      importance: en
        ? [
            "Helps us understand ourselves and our surroundings",
            "Supports engineering, communication, agriculture and medicine",
            "Helps solve problems in daily life and the environment",
          ]
        : [
            "Membantu kita memahami diri sendiri dan alam sekeliling",
            "Menyokong bidang kejuruteraan, komunikasi, pertanian dan perubatan",
            "Membantu menyelesaikan masalah kehidupan harian dan alam sekitar",
          ],
      fields: en
        ? [
            { icon: "⚛️", name: "Physics", description: "Study of energy and its effects on matter", examples: ["Engineering", "Electrical energy"] },
            { icon: "🧬", name: "Biology", description: "Study of living things", examples: ["Zoology", "Microbiology", "Physiology", "Botany"] },
            { icon: "🧪", name: "Chemistry", description: "Study of matter and the reactions that occur", examples: ["Pharmacology", "Forensics", "Toxicology"] },
            { icon: "🪨", name: "Geology", description: "Study of rocks, soil and minerals", examples: ["Geochemistry", "Geomorphology", "Geophysics"] },
            { icon: "🔭", name: "Astronomy", description: "Study of planets, stars and other objects in the universe", examples: ["Astrophysics"] },
            { icon: "🌦️", name: "Meteorology", description: "Study of weather and climate change", examples: ["Hydrometeorology"] },
          ]
        : [
            { icon: "⚛️", name: "Fizik", description: "Kajian tentang tenaga dan kesannya terhadap jirim", examples: ["Kejuruteraan", "Tenaga elektrik"] },
            { icon: "🧬", name: "Biologi", description: "Kajian tentang benda hidup", examples: ["Zoologi", "Mikrobiologi", "Fisiologi", "Botani"] },
            { icon: "🧪", name: "Kimia", description: "Kajian tentang jirim dan tindak balas yang berlaku", examples: ["Farmakologi", "Forensik", "Toksikologi"] },
            { icon: "🪨", name: "Geologi", description: "Kajian tentang batuan, tanih dan mineral", examples: ["Geokimia", "Geomorfologi", "Geofizik"] },
            { icon: "🔭", name: "Astronomi", description: "Kajian tentang planet, bintang dan objek lain dalam alam semesta", examples: ["Astrofizik"] },
            { icon: "🌦️", name: "Meteorologi", description: "Kajian tentang perubahan cuaca dan iklim", examples: ["Hidrometeorologi"] },
          ],
      careers: en
        ? [
            { field: "Physics", subject: "Physics", jobs: ["Astronomer", "Oceanographer", "Teacher", "Meteorologist", "Engineer", "Physicist"] },
            { field: "Biology", subject: "Biology", jobs: ["Medical doctor", "Botanist", "Zoologist", "Teacher", "Oceanographer", "Microbiologist", "Biologist"] },
            { field: "Chemistry", subject: "Chemistry", jobs: ["Pharmacist", "Oceanographer", "Teacher", "Forensic scientist", "Chemist"] },
            { field: "Geology", subject: "Geology", jobs: ["Geologist", "Teacher"] },
          ]
        : [
            { field: "Fizik", subject: "Fizik", jobs: ["Ahli astronomi", "Ahli oseanografi", "Guru", "Ahli meteorologi", "Jurutera", "Ahli fizik"] },
            { field: "Biologi", subject: "Biologi", jobs: ["Doktor perubatan", "Ahli botani", "Ahli zoologi", "Guru", "Ahli oseanografi", "Ahli mikrobiologi", "Ahli biologi"] },
            { field: "Kimia", subject: "Kimia", jobs: ["Ahli farmasi", "Ahli oseanografi", "Guru", "Ahli forensik", "Ahli kimia"] },
            { field: "Geologi", subject: "Geologi", jobs: ["Ahli geologi", "Guru"] },
          ],
      innovation: en
        ? {
            definition: "Machines and tools created through science help solve problems in daily life.",
            examples: ["Cars", "Aeroplanes", "Telephones", "Computers", "Robots that help repair electrical appliances or tidy a home"],
          }
        : {
            definition: "Mesin dan alat yang dihasilkan melalui sains membantu menyelesaikan masalah kehidupan harian.",
            examples: ["Kereta", "Kapal terbang", "Telefon", "Komputer", "Robot yang membantu membaiki alat elektrik atau mengemas rumah"],
          },
    },
    laboratory: {
      apparatus: laboratoryApparatus.map((item) => ({ id: item.id, name: tr(item.name), function: tr(item.function) })),
      hazardSymbols: laboratoryHazards.map((item) => ({ kind: item.kind, name: tr(item.name), body: tr(item.body), examples: tr(item.examples) })),
      rules: en
        ? [
            "Do not enter the laboratory without permission",
            "Do not start an experiment before the teacher instructs you",
            "Read and understand the experiment instructions first",
            "Use all chemicals and apparatus correctly and carefully",
            "Do not eat, drink or play in the laboratory",
            "Do not remove apparatus or chemicals from the laboratory",
            "Return apparatus and chemicals to their original storage places",
            "Keep the experiment area neat and clean",
            "Clean apparatus and dispose of waste using the correct method",
            "Wash hands with soap and water before leaving",
          ]
        : [
            "Jangan masuk ke dalam makmal tanpa kebenaran",
            "Jangan mulakan eksperimen sebelum diarahkan oleh guru",
            "Baca dan fahami arahan eksperimen terlebih dahulu",
            "Gunakan semua bahan kimia dan radas dengan betul dan cermat",
            "Dilarang makan, minum dan bermain-main di dalam makmal",
            "Dilarang mengeluarkan radas dan bahan kimia dari makmal",
            "Kembalikan radas dan bahan kimia ke tempat simpanan asal",
            "Pastikan tempat eksperimen sentiasa kemas dan bersih",
            "Cuci radas dan buang bahan buangan mengikut kaedah yang betul",
            "Cuci tangan dengan air dan sabun sebelum meninggalkan makmal",
          ],
      safetyMeasures: en
        ? [
            "Do not point the mouth of a test tube towards yourself or another person because hot liquid or gas may be ejected and cause injury",
            "Wear safety goggles when mixing or heating chemicals to protect the eyes from splashes and hot material",
            "Keep flammable chemicals away from fire because their vapour can ignite easily",
            "Do not taste or smell a substance unless the teacher permits it because an unknown chemical may be toxic or irritating",
          ]
        : [
            "Jangan halakan hujung tabung uji ke arah diri sendiri atau orang lain kerana cecair atau gas panas mungkin terpancut dan menyebabkan kecederaan",
            "Gunakan cermin pelindung mata ketika mencampurkan atau memanaskan bahan kimia untuk melindungi mata daripada percikan dan bahan panas",
            "Jauhkan bahan kimia yang mudah terbakar daripada sumber api kerana wapnya mudah menyala",
            "Jangan merasa atau menghidu bahan kecuali dibenarkan oleh guru kerana bahan kimia yang tidak diketahui mungkin beracun atau merengsa",
          ],
      accidentSteps: en
        ? [
            "Do not panic; stop the activity and inform the teacher immediately",
            "Report any chemical spill to the teacher",
            "If a chemical enters the mouth or contacts another body part, rinse the affected part with plenty of water and tell the teacher",
            "If there is a fire, leave the danger area, inform the teacher and follow the laboratory emergency instruction",
            "For a cut or suspected poisonous-gas exposure, stop work, alert the teacher immediately and follow the laboratory emergency instruction",
          ]
        : [
            "Jangan panik; hentikan aktiviti dan maklumkan guru dengan segera",
            "Laporkan sebarang tumpahan bahan kimia kepada guru",
            "Jika bahan kimia masuk ke dalam mulut atau terkena bahagian badan, bilas bahagian itu dengan air yang banyak dan beritahu guru",
            "Jika berlaku kebakaran, tinggalkan kawasan bahaya, maklumkan guru dan ikut arahan kecemasan makmal",
            "Jika berlaku luka atau disyaki terhidu gas beracun, hentikan kerja, maklumkan guru dengan segera dan ikut arahan kecemasan makmal",
          ],
    },
    quantitiesAndUnits: {
      physicalQuantityDefinition: en
        ? "A physical quantity is a physical property that can be measured or calculated."
        : "Kuantiti fizik ialah sifat fizikal yang boleh diukur atau dikira.",
      baseQuantities: en
        ? [
            { quantity: "Length", unit: "metre", symbol: "m" },
            { quantity: "Mass", unit: "kilogram", symbol: "kg" },
            { quantity: "Time", unit: "second", symbol: "s" },
            { quantity: "Temperature", unit: "kelvin", symbol: "K" },
            { quantity: "Electric current", unit: "ampere", symbol: "A" },
          ]
        : [
            { quantity: "Panjang", unit: "meter", symbol: "m" },
            { quantity: "Jisim", unit: "kilogram", symbol: "kg" },
            { quantity: "Masa", unit: "saat", symbol: "s" },
            { quantity: "Suhu", unit: "kelvin", symbol: "K" },
            { quantity: "Arus elektrik", unit: "ampere", symbol: "A" },
          ],
      prefixes: commonPrefixes[lang],
      conversions: en
        ? [
            { question: "1.9 kg to g", working: "1.9 × 1 000", answer: "1 900 g" },
            { question: "600 cm to m", working: "600 ÷ 100", answer: "6 m" },
            { question: "7 min to s", working: "7 × 60", answer: "420 s" },
            { question: "450 s to h", working: "450 ÷ 60 ÷ 60", answer: "0.125 h" },
          ]
        : [
            { question: "1.9 kg kepada g", working: "1.9 × 1 000", answer: "1 900 g" },
            { question: "600 cm kepada m", working: "600 ÷ 100", answer: "6 m" },
            { question: "7 min kepada s", working: "7 × 60", answer: "420 s" },
            { question: "450 s kepada j", working: "450 ÷ 60 ÷ 60", answer: "0.125 j" },
          ],
      siImportance: en
        ? "Standard S.I. units prevent confusion caused by different non-standard units and allow scientific data and knowledge to be exchanged accurately worldwide."
        : "Unit S.I. yang piawai mengelakkan kekeliruan akibat unit tidak seragam dan membolehkan data serta pengetahuan saintifik dipertukarkan dengan tepat di seluruh dunia.",
    },
    measuringInstruments: {
      definitions: en
        ? [
            { term: chapter1Terminology.accuracy.en, body: "The ability to obtain a reading close to the actual value." },
            { term: chapter1Terminology.precision.en, body: "The ability to obtain readings that are close to one another when a measurement is repeated." },
            { term: chapter1Terminology.sensitivity.en, body: "The ability of an instrument to detect a small change in the measured quantity; relate this to its smallest scale division." },
          ]
        : [
            { term: chapter1Terminology.accuracy.bm, body: "Keupayaan memperoleh bacaan yang hampir kepada nilai sebenar." },
            { term: chapter1Terminology.precision.bm, body: "Keupayaan memperoleh bacaan yang hampir antara satu sama lain apabila pengukuran diulang." },
            { term: chapter1Terminology.sensitivity.bm, body: "Keupayaan alat mengesan perubahan kecil pada kuantiti yang diukur; hubungkan dengan nilai senggatan terkecil alat." },
          ],
      instruments: en
        ? [
            { quantity: "Length", standardTool: "Ruler / measuring tape", higherAccuracyTool: "Vernier calipers (0.01 cm) / micrometer screw gauge (0.001 cm)", note: "Keep the eye perpendicular to the scale to avoid parallax error" },
            { quantity: "Mass", standardTool: "Lever balance / triple-beam balance", higherAccuracyTool: "Digital balance", note: "S.I. unit: kilogram (kg)" },
            { quantity: "Time", standardTool: "Stopwatch (0.1 s or 0.2 s)", higherAccuracyTool: "Digital stopwatch (0.01 s)", note: "S.I. unit: second (s)" },
            { quantity: "Temperature", standardTool: "Laboratory thermometer (1°C) / clinical thermometer (0.1°C)", higherAccuracyTool: "Digital thermometer (0.1°C)", note: "Kelvin = °C + 273" },
            { quantity: "Electric current", standardTool: "Ammeter", higherAccuracyTool: "Digital ammeter (0.01 A)", note: "Measures current in a circuit" },
            { quantity: "Liquid volume", standardTool: "Measuring cylinder", note: "Read with the eye perpendicular to the scale" },
          ]
        : [
            { quantity: "Panjang", standardTool: "Pembaris / pita pengukur", higherAccuracyTool: "Angkup vernier (0.01 cm) / tolok skru mikrometer (0.001 cm)", note: "Pastikan mata berserenjang dengan skala untuk mengelakkan ralat paralaks" },
            { quantity: "Jisim", standardTool: "Neraca tuas / neraca tiga alur", higherAccuracyTool: "Penimbang digital", note: "Unit S.I.: kilogram (kg)" },
            { quantity: "Masa", standardTool: "Jam randik (0.1 s atau 0.2 s)", higherAccuracyTool: "Jam randik digital (0.01 s)", note: "Unit S.I.: saat (s)" },
            { quantity: "Suhu", standardTool: "Termometer makmal (1°C) / termometer klinik (0.1°C)", higherAccuracyTool: "Termometer digital (0.1°C)", note: "Kelvin = °C + 273" },
            { quantity: "Arus elektrik", standardTool: "Ammeter", higherAccuracyTool: "Ammeter digital (0.01 A)", note: "Menyukat arus dalam litar" },
            { quantity: "Isi padu cecair", standardTool: "Silinder penyukat", note: "Baca dengan mata berserenjang dengan skala" },
          ],
      errorTypes: en
        ? [
            { type: "Systematic error", definition: "A constant error from an instrument in repeated measurements.", examples: ["Zero error", "An instrument that is not accurate"], waysToOvercome: ["Conduct the experiment carefully", "Repeat with a different measuring instrument", "Correct the reading for zero error"] },
            { type: "Random error", definition: "Measurement uncertainty caused by the observer while taking a reading.", examples: ["Parallax error", "Observer carelessness", "Wrong technique"], waysToOvercome: ["Take several readings and calculate the average", "Keep the eye perpendicular to the scale"] },
          ]
        : [
            { type: "Ralat sistematik", definition: "Ralat yang malar pada alat bagi pengukuran yang diulang.", examples: ["Ralat sifar", "Alat pengukur yang tidak jitu"], waysToOvercome: ["Jalankan eksperimen dengan berhati-hati", "Ulang menggunakan alat pengukur yang berbeza", "Betulkan bacaan dengan mengambil kira ralat sifar"] },
            { type: "Ralat rawak", definition: "Ketidakpastian pengukuran yang disebabkan oleh pemerhati semasa mengambil bacaan.", examples: ["Ralat paralaks", "Kecuaian pemerhati", "Teknik yang salah"], waysToOvercome: ["Ambil beberapa bacaan dan hitung purata", "Pastikan mata berserenjang dengan skala"] },
          ],
      estimationMethods: en
        ? [
            { quantity: "Length", method: "Estimate with a known object such as a pencil, then measure with a ruler" },
            { quantity: "Area", method: "Use a formula for a regular shape; count full and half-or-more squares on graph paper for an irregular shape" },
            { quantity: "Mass", method: "Use a known group, for example mass of 100 sheets ÷ 100" },
            { quantity: "Volume", method: "Use a formula for a regular object and water displacement for an irregular object" },
          ]
        : [
            { quantity: "Panjang", method: "Anggar menggunakan objek diketahui seperti pensel, kemudian ukur dengan pembaris" },
            { quantity: "Luas", method: "Gunakan rumus bagi bentuk sekata; kira petak penuh dan petak separuh atau lebih pada kertas graf bagi bentuk tidak sekata" },
            { quantity: "Jisim", method: "Gunakan kumpulan diketahui, contohnya jisim 100 helai ÷ 100" },
            { quantity: "Isi padu", method: "Gunakan rumus bagi objek sekata dan kaedah sesaran air bagi objek tidak sekata" },
          ],
      innovation: en
        ? "A digital blood pressure monitor makes a blood-pressure reading available within seconds without a hospital or clinic visit."
        : "Monitor tekanan darah digital membolehkan bacaan tekanan darah diperoleh dalam beberapa saat tanpa perlu ke hospital atau klinik.",
    },
    density: {
      definition: en ? "Density is the mass per unit volume of a substance." : "Ketumpatan sesuatu bahan ialah jisim per unit isi padu bahan itu.",
      operationalDefinition: en
        ? "In the equal-volume cube activity, density is defined operationally by measuring each cube's mass, calculating mass per unit volume and observing whether it floats or sinks in water."
        : "Dalam aktiviti kubus yang sama isi padu, ketumpatan didefinisikan secara operasi dengan mengukur jisim setiap kubus, menghitung jisim per unit isi padu dan memerhatikan sama ada kubus terapung atau tenggelam di dalam air.",
      formula: en ? "Density (g cm⁻³) = Mass (g) ÷ Volume (cm³)" : "Ketumpatan (g cm⁻³) = Jisim (g) ÷ Isi padu (cm³)",
      workedExample: en
        ? {
            problem: "A measuring cylinder has a mass of 230 g. With 50 cm³ of liquid X, the total mass is 320 g. Find the liquid's density.",
            working: ["Mass of liquid X = 320 g - 230 g = 90 g", "Density = 90 g ÷ 50 cm³"],
            answer: "1.8 g cm⁻³",
          }
        : {
            problem: "Sebuah silinder penyukat berjisim 230 g. Bersama 50 cm³ cecair X, jumlah jisim ialah 320 g. Tentukan ketumpatan cecair.",
            working: ["Jisim cecair X = 320 g - 230 g = 90 g", "Ketumpatan = 90 g ÷ 50 cm³"],
            answer: "1.8 g cm⁻³",
          },
      waterDisplacement: en
        ? [
            "Measure the mass of the irregular object.",
            "Record the initial water volume in a measuring cylinder.",
            "Fully submerge the object and record the final volume.",
            "Object volume = final volume - initial volume; 1 ml = 1 cm³.",
            "Calculate density = mass ÷ object volume.",
          ]
        : [
            "Ukur jisim objek tidak sekata.",
            "Rekod isi padu awal air di dalam silinder penyukat.",
            "Tenggelamkan objek sepenuhnya dan rekod isi padu akhir.",
            "Isi padu objek = isi padu akhir - isi padu awal; 1 ml = 1 cm³.",
            "Hitung ketumpatan = jisim ÷ isi padu objek.",
          ],
      table: densityTables[lang],
      everydayExamples: en
        ? [
            "Ice floats because it is less dense than water",
            "A helium-filled balloon floats because helium is less dense than air",
            "Timber is transported by water because it is less dense than water",
            "The high salt content makes Dead Sea water very dense, so people float more easily",
          ]
        : [
            "Ais terapung kerana kurang tumpat daripada air",
            "Belon helium terapung kerana helium kurang tumpat daripada udara",
            "Kayu balak diangkut menggunakan air kerana kurang tumpat daripada air",
            "Kandungan garam yang tinggi menjadikan air Laut Mati sangat tumpat, maka manusia lebih mudah terapung",
          ],
    },
    investigationSteps: {
      processSkills: scienceProcessSkills.map((skill) => ({ name: tr(skill.name), description: tr(skill.description) })),
      steps: scientificInvestigationSteps.map((step) => ({ step: step.step, heading: tr(step.heading), body: tr(step.body) })),
    },
    attitudesAndValues: en
      ? {
          core: [
            "Be interested and curious about the surroundings",
            "Be honest and accurate when recording and validating data",
            "Be responsible for personal safety, friends and the environment",
          ],
          additional: [
            "Recognise science as one way to understand the environment",
            "Appreciate and practise a clean and healthy lifestyle",
            "Appreciate balance in nature",
            "Be polite and respectful",
            "Be grateful for the natural environment as a gift from God",
          ],
          purpose: "These attitudes support more accurate results, effective decisions, willingness to adapt to new ideas and responsible, creative problem solving.",
        }
      : {
          core: [
            "Berminat dan bersifat ingin tahu tentang alam sekeliling",
            "Jujur dan tepat semasa merekod dan mengesahkan data",
            "Bertanggungjawab terhadap keselamatan diri, rakan dan alam sekitar",
          ],
          additional: [
            "Menyedari bahawa pengetahuan sains ialah satu cara memahami alam",
            "Menghargai dan mengamalkan cara hidup bersih dan sihat",
            "Menghargai keseimbangan dalam alam semula jadi",
            "Berhemah tinggi dan hormat-menghormati",
            "Mensyukuri nikmat alam semula jadi kurniaan Tuhan",
          ],
          purpose: "Sikap ini membantu memperoleh keputusan yang lebih tepat, membuat keputusan berkesan, menyesuaikan diri dengan idea baharu dan menyelesaikan masalah secara bertanggungjawab serta kreatif.",
        },
    learningExperiences: localizeExperiences(lang),
  };
}

const en = buildContent("en");
const bm = buildContent("bm");

export const chapter1Content = { en, bm };
export default chapter1Content;
