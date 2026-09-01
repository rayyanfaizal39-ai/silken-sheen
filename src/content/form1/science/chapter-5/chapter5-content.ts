// chapter5-content.ts
// Source-verified content for Chapter 5 / Bab 5 — Matter / Jirim
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 136-159)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 136-159, official KSSM counterpart)
// Content data only — no presentation markup.

export interface PropertyExample {
  icon: string;
  label: string;
  detail: string;
}

export interface DensityClassRow {
  substance: string;
  higherDensity: string;
  lowerDensity: string;
}

export interface MeltBoilRow {
  substance: string;
  meltingPoint: string;
  boilingPoint: string;
}

export interface StateProperty {
  state: string;
  shape: string;
  mass: string;
  volume: string;
  compressibility: string;
  spaceBetweenParticles: string;
  particleArrangement: string;
  particleMovement: string;
}

export interface DiffusionResult {
  state: string;
  observation: string;
  rate: string;
}

export interface ChangeOfState {
  name: string;
  initialState: string;
  finalState: string;
  thermalAction: string;
  description: string[];
}

export interface MatterEvidence {
  title: string;
  method: string;
  conclusion: string;
}

export interface ConservationExperiment {
  title: string;
  procedure: string;
  observation: string;
}

export interface Chapter5Content {
  hook: { title: string; body: string };
  matterInNature: {
    definition: string;
    nonMatterExamples: string[];
    evidenceActivities: MatterEvidence[];
    physicalProperties: PropertyExample[];
    chemicalProperties: PropertyExample[];
    classificationCharacteristics: string[];
    densityClassification: DensityClassRow[];
    meltingBoilingPoints: MeltBoilRow[];
    solubilityDefinition: string;
  };
  statesOfMatter: {
    kineticTheory: string;
    stateProperties: StateProperty[];
    diffusionDefinition: string;
    diffusionResults: DiffusionResult[];
    changesOfState: ChangeOfState[];
    constantFacts: string[];
    conservationExperiments: ConservationExperiment[];
    everydayExamples: { icon: string; label: string; process: string }[];
    activeRecall: { question: string; answer: string }[];
  };
}

const en: Chapter5Content = {
  hook: {
    title: "Why this matters",
    body: "Every material around you — the chair you're sitting on, the water you drink, the air you breathe — is matter, and it all follows the same rules of particles. Once you understand how those particles behave, you can predict how anything will act when heated, cooled, or mixed.",
  },
  matterInNature: {
    definition:
      "Matter is a substance that has mass and occupies space. All living things (humans, plants, animals) and non-living things (water, soil, rocks, air) are matter.",
    nonMatterExamples: ["Light", "Sound", "Heat", "Shadows"],
    evidenceActivities: [
      {
        title: "Activity 5.1 - soil, water, and bean sprouts",
        method:
          "Place each sample in a beaker to show it occupies space, then weigh it on a balance.",
        conclusion:
          "Living and non-living samples occupy space and have measurable mass, so both are matter.",
      },
      {
        title: "Experiment 5.2 - air in balloons",
        method:
          "Balance two inflated balloons, prick one slowly, and observe the rod tilt towards the still-inflated balloon.",
        conclusion:
          "Inflation shows air occupies space; the balance tilt after air escapes shows air has mass.",
      },
    ],
    physicalProperties: [
      {
        icon: "🌡️",
        label: "Boiling point",
        detail: "Different liquids have different boiling points — water boils at 100°C",
      },
      {
        icon: "🧊",
        label: "Melting point",
        detail: "The temperature at which a solid changes into liquid at a certain pressure",
      },
      { icon: "🍬", label: "Solubility", detail: "Sugar can dissolve in coffee" },
      {
        icon: "🔥",
        label: "Heat conduction",
        detail:
          "A pan handle is made of heat insulator (plastic); the pan itself is a heat conductor (steel)",
      },
    ],
    chemicalProperties: [
      { icon: "🔩", label: "Rusting", detail: "Occurs on iron when exposed to water and air" },
      { icon: "⛽", label: "Flammability", detail: "Petrol is a flammable matter" },
    ],
    classificationCharacteristics: ["Density", "Melting point", "Boiling point", "Solubility"],
    densityClassification: [
      { substance: "Glycerol and water", higherDensity: "Glycerol", lowerDensity: "Water" },
      { substance: "Petrol and mercury", higherDensity: "Mercury", lowerDensity: "Petrol" },
      { substance: "Sand and water", higherDensity: "Sand", lowerDensity: "Water" },
      { substance: "Oil and cork", higherDensity: "Oil", lowerDensity: "Cork" },
    ],
    meltingBoilingPoints: [
      { substance: "Water", meltingPoint: "0°C", boilingPoint: "100°C" },
      { substance: "Alcohol", meltingPoint: "-117°C", boilingPoint: "78°C" },
      { substance: "Copper", meltingPoint: "1085°C", boilingPoint: "2562°C" },
      { substance: "Oxygen", meltingPoint: "-218°C", boilingPoint: "-183°C" },
    ],
    solubilityDefinition:
      "Solubility is the ability of a substance (solute) to dissolve in a given amount of solvent to form a solution — e.g. sugar (solute) dissolved in coffee (solvent).",
  },
  statesOfMatter: {
    kineticTheory:
      "Matter is made up of constantly moving small and discrete particles. When heat is supplied, particles move faster; when cooled, particles move slower.",
    stateProperties: [
      {
        state: "Solid",
        shape: "Fixed shape",
        mass: "Fixed mass",
        volume: "Fixed volume",
        compressibility: "Incompressible",
        spaceBetweenParticles: "Small",
        particleArrangement: "Very close",
        particleMovement: "Vibrate in a fixed position",
      },
      {
        state: "Liquid",
        shape: "Takes shape of container",
        mass: "Fixed mass",
        volume: "Fixed volume",
        compressibility: "Difficult to compress",
        spaceBetweenParticles: "Moderate",
        particleArrangement: "Close",
        particleMovement: "Move freely and collide with one another",
      },
      {
        state: "Gas",
        shape: "Takes shape of container",
        mass: "Fixed for a fixed amount",
        volume: "Fills the container",
        compressibility: "Easily compressed",
        spaceBetweenParticles: "Very large",
        particleArrangement: "Very loose and far apart",
        particleMovement: "Move randomly in all directions at high speed",
      },
    ],
    diffusionDefinition:
      "Diffusion is a process in which particles of a substance move from a high concentration area to a low concentration area.",
    diffusionResults: [
      {
        state: "Solid",
        observation: "Copper(II) sulphate crystals in gel — gel turns blue after a few days",
        rate: "Low",
      },
      {
        state: "Liquid",
        observation:
          "Copper(II) sulphate in distilled water spreads throughout in about 15 minutes",
        rate: "Fast",
      },
      {
        state: "Gas",
        observation: "Gas particles spread through available space in seconds",
        rate: "Fastest",
      },
    ],
    changesOfState: [
      {
        name: "Melting",
        initialState: "Solid",
        finalState: "Liquid",
        thermalAction: "Absorbs heat",
        description: [
          "Particles gain kinetic energy and vibrate faster",
          "Heat overcomes attraction at the melting point",
        ],
      },
      {
        name: "Boiling",
        initialState: "Liquid",
        finalState: "Gas",
        thermalAction: "Absorbs heat",
        description: [
          "Occurs throughout the liquid at boiling point",
          "Particles gain enough energy to overcome attraction",
        ],
      },
      {
        name: "Evaporation",
        initialState: "Liquid",
        finalState: "Gas",
        thermalAction: "Absorbs heat",
        description: [
          "Occurs slowly at any temperature below boiling point",
          "Only particles at the liquid surface escape",
        ],
      },
      {
        name: "Condensation",
        initialState: "Gas",
        finalState: "Liquid",
        thermalAction: "Releases heat",
        description: [
          "Particles lose energy and move slower",
          "Attractive forces pull particles closer together",
        ],
      },
      {
        name: "Freezing",
        initialState: "Liquid",
        finalState: "Solid",
        thermalAction: "Releases heat",
        description: [
          "Particles lose energy at the freezing point",
          "Particles settle into fixed positions",
        ],
      },
      {
        name: "Sublimation",
        initialState: "Solid",
        finalState: "Gas",
        thermalAction: "Absorbs heat (reverse releases heat)",
        description: [
          "A solid changes directly into gas without becoming liquid",
          "Examples include dry ice and shrinking mothballs",
        ],
      },
    ],
    constantFacts: [
      "Temperature remains constant during freezing, melting, and boiling — heat is used to overcome or form attraction between particles, not to raise temperature",
      "Mass remains constant during physical changes (melting, dissolving, expansion) because the quantity of particles does not change — only their kinetic energy changes",
    ],
    conservationExperiments: [
      {
        title: "Ice melts",
        procedure:
          "Weigh a beaker of ice, allow it to melt completely, then weigh the same beaker again.",
        observation:
          "Mass before melting equals mass after melting because no particles were lost.",
      },
      {
        title: "Salt dissolves",
        procedure:
          "Weigh water and salt together, dissolve all the salt, then weigh the salt solution.",
        observation: "The combined starting mass equals the mass of the final solution.",
      },
      {
        title: "A solid expands",
        procedure:
          "Weigh a metal ball and ring, heat the ball until it no longer fits through the ring, then weigh them again.",
        observation:
          "Heating increases particle spacing and volume, but mass and particle number remain unchanged.",
      },
    ],
    everydayExamples: [
      { icon: "🍦", label: "Freezing", process: "Sweet cream freezes to become ice-cream" },
      {
        icon: "🧊",
        label: "Sublimation",
        process: "Dry ice is used by ice-cream vendors to keep ice-cream cold without melting it",
      },
      {
        icon: "🌫️",
        label: "Sublimation",
        process: "Moth balls shrinking over time — solid changing directly to gas",
      },
      {
        icon: "💧",
        label: "Condensation",
        process: "Dew forms when water vapour in the air condenses into water droplets",
      },
    ],
    activeRecall: [
      {
        question: "Why does a wet towel dry below 100°C?",
        answer:
          "Evaporation occurs at any temperature at the surface; wind removes water vapour and speeds the process.",
      },
      {
        question: "How do particles move in each state?",
        answer:
          "Solid particles vibrate in fixed positions, liquid particles slide past one another, and gas particles move randomly at high speed.",
      },
      {
        question: "Why is ethanol heated in a water bath?",
        answer: "Ethanol is highly flammable, so direct heating over a flame is dangerous.",
      },
      {
        question: "How can seawater provide drinking water?",
        answer:
          "Evaporate the seawater and cool the vapour on a plastic sheet so condensed water drips into a separate cup.",
      },
    ],
  },
};

const bm: Chapter5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bahan di sekeliling anda — kerusi yang anda duduki, air yang anda minum, udara yang anda hidu — semuanya jirim, dan semuanya mengikut peraturan zarah yang sama. Apabila anda memahami bagaimana zarah ini berkelakuan, anda boleh meramalkan bagaimana sesuatu bahan akan bertindak apabila dipanaskan, disejukkan, atau dicampur.",
  },
  matterInNature: {
    definition:
      "Jirim ialah bahan yang mempunyai jisim dan memenuhi ruang. Semua benda hidup (manusia, tumbuhan, haiwan) dan benda bukan hidup (air, tanah, batu, udara) adalah jirim.",
    nonMatterExamples: ["Cahaya", "Bunyi", "Haba", "Bayang-bayang"],
    evidenceActivities: [
      {
        title: "Aktiviti 5.1 - tanah, air, dan tauge",
        method:
          "Letakkan setiap sampel dalam bikar untuk menunjukkan sampel memenuhi ruang, kemudian timbang dengan neraca.",
        conclusion:
          "Sampel hidup dan bukan hidup memenuhi ruang serta mempunyai jisim yang boleh diukur, maka kedua-duanya ialah jirim.",
      },
      {
        title: "Eksperimen 5.2 - udara dalam belon",
        method:
          "Seimbangkan dua belon yang ditiup, cucuk satu belon secara perlahan, dan perhatikan rod condong ke arah belon yang masih berisi udara.",
        conclusion:
          "Belon mengembang membuktikan udara memenuhi ruang; kecondongan neraca selepas udara terlepas membuktikan udara mempunyai jisim.",
      },
    ],
    physicalProperties: [
      {
        icon: "🌡️",
        label: "Takat didih",
        detail: "Cecair berlainan mempunyai takat didih berbeza — air mendidih pada 100°C",
      },
      {
        icon: "🧊",
        label: "Takat lebur",
        detail: "Suhu apabila pepejal bertukar menjadi cecair pada tekanan tertentu",
      },
      { icon: "🍬", label: "Keterlarutan", detail: "Gula boleh larut dalam kopi" },
      {
        icon: "🔥",
        label: "Pengalir haba",
        detail:
          "Pemegang kuali diperbuat daripada penebat haba (plastik); badan kuali pula konduktor haba (keluli)",
      },
    ],
    chemicalProperties: [
      {
        icon: "🔩",
        label: "Pengaratan",
        detail: "Berlaku pada besi apabila terdedah kepada air dan udara",
      },
      { icon: "⛽", label: "Kebolehbakaran", detail: "Petrol ialah bahan yang mudah terbakar" },
    ],
    classificationCharacteristics: ["Ketumpatan", "Takat lebur", "Takat didih", "Keterlarutan"],
    densityClassification: [
      { substance: "Gliserol dan air", higherDensity: "Gliserol", lowerDensity: "Air" },
      { substance: "Petrol dan merkuri", higherDensity: "Merkuri", lowerDensity: "Petrol" },
      { substance: "Pasir dan air", higherDensity: "Pasir", lowerDensity: "Air" },
      { substance: "Minyak dan gabus", higherDensity: "Minyak", lowerDensity: "Gabus" },
    ],
    meltingBoilingPoints: [
      { substance: "Air", meltingPoint: "0°C", boilingPoint: "100°C" },
      { substance: "Alkohol", meltingPoint: "-117°C", boilingPoint: "78°C" },
      { substance: "Kuprum", meltingPoint: "1085°C", boilingPoint: "2562°C" },
      { substance: "Oksigen", meltingPoint: "-218°C", boilingPoint: "-183°C" },
    ],
    solubilityDefinition:
      "Keterlarutan ialah kebolehan sesuatu bahan (solut) untuk larut dalam sejumlah pelarut untuk membentuk larutan — cth: gula (solut) larut dalam kopi (pelarut).",
  },
  statesOfMatter: {
    kineticTheory:
      "Jirim terdiri daripada zarah-zarah kecil dan diskret yang sentiasa bergerak. Apabila haba dibekalkan, zarah bergerak lebih laju; apabila disejukkan, zarah bergerak lebih perlahan.",
    stateProperties: [
      {
        state: "Pepejal",
        shape: "Bentuk tetap",
        mass: "Jisim tetap",
        volume: "Isi padu tetap",
        compressibility: "Tidak boleh dimampatkan",
        spaceBetweenParticles: "Kecil",
        particleArrangement: "Sangat rapat",
        particleMovement: "Bergetar pada kedudukan tetap",
      },
      {
        state: "Cecair",
        shape: "Mengikut bentuk bekas",
        mass: "Jisim tetap",
        volume: "Isi padu tetap",
        compressibility: "Sukar dimampatkan",
        spaceBetweenParticles: "Sederhana",
        particleArrangement: "Rapat",
        particleMovement: "Bergerak bebas dan berlanggar antara satu sama lain",
      },
      {
        state: "Gas",
        shape: "Mengikut bentuk bekas",
        mass: "Tetap bagi kuantiti tetap",
        volume: "Memenuhi bekas",
        compressibility: "Mudah dimampatkan",
        spaceBetweenParticles: "Sangat besar",
        particleArrangement: "Sangat longgar dan berjauhan",
        particleMovement: "Bergerak rawak ke semua arah pada kelajuan tinggi",
      },
    ],
    diffusionDefinition:
      "Resapan ialah proses zarah-zarah sesuatu bahan bergerak daripada kawasan berkepekatan tinggi ke kawasan berkepekatan rendah.",
    diffusionResults: [
      {
        state: "Pepejal",
        observation:
          "Kristal kuprum(II) sulfat dalam agar-agar — agar-agar bertukar biru selepas beberapa hari",
        rate: "Rendah",
      },
      {
        state: "Cecair",
        observation:
          "Kuprum(II) sulfat dalam air suling tersebar sepenuhnya dalam kira-kira 15 minit",
        rate: "Cepat",
      },
      {
        state: "Gas",
        observation: "Zarah gas tersebar memenuhi ruang yang ada dalam beberapa saat",
        rate: "Paling cepat",
      },
    ],
    changesOfState: [
      {
        name: "Peleburan",
        initialState: "Pepejal",
        finalState: "Cecair",
        thermalAction: "Menyerap haba",
        description: [
          "Zarah memperoleh tenaga kinetik dan bergetar lebih laju",
          "Haba mengatasi daya tarikan pada takat lebur",
        ],
      },
      {
        name: "Pendidihan",
        initialState: "Cecair",
        finalState: "Gas",
        thermalAction: "Menyerap haba",
        description: [
          "Berlaku di seluruh cecair pada takat didih",
          "Zarah memperoleh tenaga mencukupi untuk mengatasi daya tarikan",
        ],
      },
      {
        name: "Penyejatan",
        initialState: "Cecair",
        finalState: "Gas",
        thermalAction: "Menyerap haba",
        description: [
          "Berlaku perlahan pada sebarang suhu di bawah takat didih",
          "Hanya zarah pada permukaan cecair terlepas",
        ],
      },
      {
        name: "Kondensasi",
        initialState: "Gas",
        finalState: "Cecair",
        thermalAction: "Membebaskan haba",
        description: [
          "Zarah kehilangan tenaga dan bergerak lebih perlahan",
          "Daya tarikan menarik zarah lebih rapat",
        ],
      },
      {
        name: "Pembekuan",
        initialState: "Cecair",
        finalState: "Pepejal",
        thermalAction: "Membebaskan haba",
        description: [
          "Zarah kehilangan tenaga pada takat beku",
          "Zarah tersusun pada kedudukan tetap",
        ],
      },
      {
        name: "Pemejalwapan",
        initialState: "Pepejal",
        finalState: "Gas",
        thermalAction: "Menyerap haba (proses songsang membebaskan haba)",
        description: [
          "Pepejal berubah terus menjadi gas tanpa menjadi cecair",
          "Contoh termasuk ais kering dan kapur barus yang mengecil",
        ],
      },
    ],
    constantFacts: [
      "Suhu kekal malar semasa pembekuan, peleburan, dan pendidihan — haba digunakan untuk mengatasi atau membentuk daya tarikan antara zarah, bukan untuk menaikkan suhu",
      "Jisim kekal malar semasa perubahan fizikal (peleburan, pelarutan, pengembangan) kerana bilangan zarah tidak berubah — hanya tenaga kinetiknya berubah",
    ],
    conservationExperiments: [
      {
        title: "Ais melebur",
        procedure:
          "Timbang bikar berisi ais, biarkan ais melebur sepenuhnya, kemudian timbang bikar yang sama sekali lagi.",
        observation:
          "Jisim sebelum peleburan sama dengan jisim selepas peleburan kerana tiada zarah hilang.",
      },
      {
        title: "Garam melarut",
        procedure:
          "Timbang air dan garam bersama-sama, larutkan semua garam, kemudian timbang larutan garam.",
        observation: "Jumlah jisim awal sama dengan jisim larutan akhir.",
      },
      {
        title: "Pepejal mengembang",
        procedure:
          "Timbang bola logam dan gelang, panaskan bola sehingga tidak lagi muat melalui gelang, kemudian timbang semula.",
        observation:
          "Pemanasan menambah jarak zarah dan isi padu, tetapi jisim serta bilangan zarah kekal.",
      },
    ],
    everydayExamples: [
      { icon: "🍦", label: "Pembekuan", process: "Krim manis membeku untuk menjadi aiskrim" },
      {
        icon: "🧊",
        label: "Pemejalwapan",
        process:
          "Ais kering digunakan oleh peniaga aiskrim untuk mengekalkan kesejukan tanpa melebur",
      },
      {
        icon: "🌫️",
        label: "Pemejalwapan",
        process: "Kapur barus mengecil dari semasa ke semasa — pepejal bertukar terus menjadi gas",
      },
      {
        icon: "💧",
        label: "Kondensasi",
        process: "Embun terbentuk apabila wap air di udara terkondensasi menjadi titisan air",
      },
    ],
    activeRecall: [
      {
        question: "Mengapa tuala basah kering pada suhu di bawah 100°C?",
        answer:
          "Penyejatan berlaku pada sebarang suhu di permukaan; angin menyingkirkan wap air dan mempercepat proses.",
      },
      {
        question: "Bagaimanakah zarah bergerak dalam setiap keadaan?",
        answer:
          "Zarah pepejal bergetar pada kedudukan tetap, zarah cecair meluncur antara satu sama lain, dan zarah gas bergerak rawak dengan laju.",
      },
      {
        question: "Mengapa etanol dipanaskan dalam kukus air?",
        answer:
          "Etanol sangat mudah terbakar, maka pemanasan terus dengan nyalaan adalah berbahaya.",
      },
      {
        question: "Bagaimanakah air laut boleh menghasilkan air minuman?",
        answer:
          "Sejatkan air laut dan sejukkan wap pada kepingan plastik supaya air terkondensasi menitis ke dalam cawan berasingan.",
      },
    ],
  },
};

export const chapter5Content = { en, bm };
export default chapter5Content;
