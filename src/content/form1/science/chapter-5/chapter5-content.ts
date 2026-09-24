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
  id: string;
  from: number;
  to: number;
  heat: "absorbed" | "released";
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
  id: "ice" | "salt" | "metal";
  materials: string;
  before: string;
  after: string;
  action: string;
  title: string;
  procedure: string;
  observation: string;
}

export interface Chapter5Content {
  structure: { title: string; subtopics: [string, string] };
  hook: { title: string; body: string };
  matterInNature: {
    matterExamples: string[];
    evidenceSamples: string[];
    propertyDefinitions: { physical: string; chemical: string };
    labels: {
      matter: string;
      nonMatter: string;
      mass: string;
      space: string;
      sample: string;
      container: string;
      balance: string;
      before: string;
      after: string;
      physical: string;
      chemical: string;
      classify: string;
      density: string;
      higher: string;
      lower: string;
      points: string;
      substance: string;
      solubility: string;
      solute: string;
      solvent: string;
      solution: string;
      sugar: string;
      coffee: string;
      conclusion: string;
    };
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
    particlePresentation: {
      heading: string;
      chooseState: string;
      comparison: string;
      behaviour: string;
      modelNote: string;
      particles: string;
      heating: string;
      cooling: string;
      lessEnergy: string;
      moreEnergy: string;
      slower: string;
      faster: string;
      properties: Record<Exclude<keyof StateProperty, "state">, string>;
    };
    diffusionPresentation: {
      heading: string;
      before: string;
      after: string;
      high: string;
      spread: string;
      even: string;
      air: string;
      bromine: string;
      mixture: string;
      lid: string;
      crystal: string;
      gel: string;
      water: string;
      relationship: string;
    };
    kineticTheory: string;
    stateProperties: StateProperty[];
    diffusionDefinition: string;
    diffusionResults: DiffusionResult[];
    pass3Presentation: {
      heading: string;
      mechanism: string;
      comparison: string;
      constant: string;
      conservation: string;
      examples: string;
      recall: string;
      absorbed: string;
      released: string;
      before: string;
      after: string;
      sameMass: string;
      sameTemperature: string;
      thermometer: string;
      water: string;
      balance: string;
      tripleBalance: string;
      ice: string;
      salt: string;
      ballRing: string;
      glassRod: string;
      choose: string;
      model: string;
    };
    boilingActivity: { title: string; materials: string; procedure: string };
    applicationActivity: { title: string; task: string };
    constantProcesses: string[];
    changesOfState: ChangeOfState[];
    constantFacts: string[];
    conservationExperiments: ConservationExperiment[];
    everydayExamples: { icon: string; id: string; label: string; process: string }[];
    activeRecall: { question: string; answer: string }[];
  };
}

const en: Chapter5Content = {
  structure: { title: "Matter", subtopics: ["5.1 Matter in Nature", "5.2 Three States of Matter"] },
  hook: {
    title: "Why this matters",
    body: "Every material around you — the chair you're sitting on, the water you drink, the air you breathe — is matter, and it all follows the same rules of particles. Once you understand how those particles behave, you can predict how anything will act when heated, cooled, or mixed.",
  },
  matterInNature: {
    // Labels/excerpts from the existing definition, activities and textbook pp. 138–144.
    matterExamples: ["Living things", "Water", "Soil", "Rocks", "Air"],
    evidenceSamples: ["Soil", "Water", "Bean sprouts"],
    propertyDefinitions: {
      physical:
        "Physical properties are properties that can be identified using the five senses or measuring tools. They depend on the type of material the matter is made of.",
      chemical:
        "Chemical properties are properties that become evident when a substance changes into a new substance. They depend on the reaction that occurs.",
    },
    labels: {
      matter: "Matter",
      nonMatter: "Not matter",
      mass: "Has mass",
      space: "Occupies space",
      sample: "Sample",
      container: "Beaker",
      balance: "Lever balance",
      before: "Before",
      after: "After",
      physical: "Physical properties",
      chemical: "Chemical properties",
      classify: "Classification of materials by characteristic",
      density: "Density",
      higher: "Higher density",
      lower: "Lower density",
      points: "Melting and boiling points",
      substance: "Substance",
      solubility: "Solubility",
      solute: "Solute",
      solvent: "Solvent",
      solution: "Solution",
      sugar: "Sugar",
      coffee: "Coffee",
      conclusion: "Conclusion",
    },
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
    // Pass 2 labels: supplied brief and textbook pp. 145–150. Facts remain canonical.
    particlePresentation: {
      heading: "Kinetic theory of matter",
      chooseState: "Choose a state",
      comparison: "Comparison of three states of matter",
      behaviour: "Physical properties",
      modelNote: "Particle diagrams are models and are not drawn to scale.",
      particles: "Particles",
      heating: "Heating",
      cooling: "Cooling",
      lessEnergy: "Less kinetic energy",
      moreEnergy: "More kinetic energy",
      slower: "Particles move slower",
      faster: "Particles move faster",
      properties: {
        shape: "Shape",
        mass: "Mass",
        volume: "Volume",
        compressibility: "Compressibility",
        spaceBetweenParticles: "Space between particles",
        particleArrangement: "Particle arrangement",
        particleMovement: "Particle movement",
      },
    },
    diffusionPresentation: {
      heading: "Diffusion Rate in Three States of Matter",
      before: "Before",
      after: "After",
      high: "High concentration",
      spread: "Particles spread",
      even: "More even distribution",
      air: "Air",
      bromine: "Bromine gas",
      mixture: "Mixture of bromine gas and air",
      lid: "Lid",
      crystal: "Copper(II) sulphate crystals",
      gel: "Colourless gel",
      water: "Distilled water",
      relationship: "Gas > Liquid > Solid",
    },
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
        mass: "No fixed mass",
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
        observation: "Water turns blue after two hours.",
        rate: "Fast",
      },
      {
        state: "Gas",
        observation: "Bromine gas fills both gas jars after 15 minutes.",
        rate: "Fastest",
      },
    ],
    pass3Presentation: {
      heading: "The effect of heat on matter",
      mechanism: "Changes in the arrangement of particles when heated or cooled",
      comparison: "Boiling / Evaporation",
      constant: "Temperature remains constant",
      conservation: "Activity 5.6 B — Mass remains unchanged during physical change",
      examples: "Examples of change of state of matter",
      recall: "Chapter Check",
      absorbed: "Heat is absorbed",
      released: "Heat is released",
      before: "Before",
      after: "After",
      sameMass: "Mass before = mass after",
      sameTemperature: "Temperature remains constant",
      thermometer: "Thermometer",
      water: "100 ml of water",
      balance: "Lever balance",
      tripleBalance: "Triple beam balance",
      ice: "Ice cubes",
      salt: "100 ml of water + 10 spatulas of fine salt",
      ballRing: "Metal ball and ring",
      glassRod: "Glass rod",
      choose: "Choose a change of state",
      model: "Schematic / not to scale",
    },
    boilingActivity: {
      title: "Activity 5.6 A — Temperature remains constant during boiling of water",
      materials:
        "Bunsen burner, tripod stand, wire gauze, beaker, thermometer, 100 ml water, retort stand and clamp.",
      procedure:
        "Record the initial temperature of 100 ml water. Heat it and record the temperature every 10 minutes until it remains constant.",
    },
    applicationActivity: {
      title: "Activity 5.7",
      task: "In groups, find two daily-life examples for each change of state and present the discussion using multimedia.",
    },
    constantProcesses: ["melting", "freezing", "boiling"],
    changesOfState: [
      {
        id: "melting",
        name: "Melting",
        initialState: "Solid",
        finalState: "Liquid",
        heat: "absorbed",
        thermalAction: "Absorbs heat",
        description: [
          "Solid absorbs heat when heated.",
          "Particles gain energy and vibrate faster.",
          "Heat overcomes the force of attraction between particles.",
          "At the melting point, particles move freely and the solid becomes liquid.",
        ],
        from: 0,
        to: 1,
      },
      {
        id: "boiling",
        name: "Boiling",
        initialState: "Liquid",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Absorbs heat",
        description: [
          "Boiling occurs at the boiling point.",
          "Liquid absorbs heat; particles gain energy and move faster.",
          "Heat overcomes attraction between liquid particles.",
          "Particles move freely and randomly as the liquid becomes gas.",
        ],
        from: 1,
        to: 2,
      },
      {
        id: "evaporation",
        name: "Evaporation",
        initialState: "Liquid",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Absorbs heat",
        description: [
          "Evaporation occurs at any temperature.",
          "Liquid absorbs heat from the surroundings.",
          "Particles gain energy and move faster.",
          "Liquid slowly evaporates into gas.",
        ],
        from: 1,
        to: 2,
      },
      {
        id: "condensation",
        name: "Condensation",
        initialState: "Gas",
        finalState: "Liquid",
        heat: "released",
        thermalAction: "Releases heat",
        description: [
          "Gas releases heat when cooled.",
          "Particles lose energy, move more slowly and come closer together.",
          "At or below the boiling point, gas becomes liquid.",
        ],
        from: 2,
        to: 1,
      },
      {
        id: "freezing",
        name: "Freezing",
        initialState: "Liquid",
        finalState: "Solid",
        heat: "released",
        thermalAction: "Releases heat",
        description: [
          "Liquid releases heat when cooled.",
          "Particles lose energy and move more slowly.",
          "At the freezing point, particles vibrate at fixed positions and the liquid becomes solid.",
        ],
        from: 1,
        to: 0,
      },
      {
        id: "sublimation",
        name: "Sublimation",
        initialState: "Solid",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Absorbs heat",
        description: ["A solid changes directly into gas."],
        from: 0,
        to: 2,
      },
      {
        id: "sublimation-reverse",
        name: "Sublimation",
        initialState: "Gas",
        finalState: "Solid",
        heat: "released",
        thermalAction: "Releases heat",
        description: ["A gas changes directly into solid."],
        from: 2,
        to: 0,
      },
    ],
    constantFacts: [
      "Temperature remains constant during freezing, melting and boiling. Heat is absorbed or released to overcome or form attraction between particles.",
      "Mass remains unchanged during physical changes.",
    ],
    conservationExperiments: [
      {
        id: "ice",
        title: "Change in mass when ice melts into water",
        materials: "Ice cubes, beaker, lever balance.",
        procedure:
          "Weigh the empty beaker, then the beaker containing ice. Allow all the ice to melt and weigh the same beaker with water.",
        before: "Beaker + ice",
        after: "Beaker + water",
        action: "Melting",
        observation: "Mass remains unchanged during physical changes.",
      },
      {
        id: "salt",
        title: "Change in mass when salt dissolves",
        materials: "Ten spatulas of fine salt, 100 ml water, glass rod, beaker, lever balance.",
        procedure:
          "Weigh the beaker with 100 ml water. Add ten spatulas of fine salt and weigh again. Stir with a glass rod until the salt dissolves, then weigh the solution.",
        before: "Beaker + water + salt",
        after: "Beaker + salt solution",
        action: "Dissolving",
        observation: "Mass remains unchanged during physical changes.",
      },
      {
        id: "metal",
        title: "Change in mass during the expansion of solid",
        materials: "Metal ball and ring, Bunsen burner, triple beam balance.",
        procedure:
          "Weigh the metal ball together with its ring. Heat the ball for five minutes, then weigh the hot ball together with its ring.",
        before: "Metal ball + ring",
        after: "Hot metal ball + ring",
        action: "Heat the ball for 5 minutes",
        observation: "Mass remains unchanged during physical changes.",
      },
    ],
    everydayExamples: [
      {
        icon: "🍦",
        id: "ice-cream",
        label: "Freezing",
        process: "Sweet cream freezes to become ice-cream.",
      },
      {
        icon: "🧊",
        id: "dry-ice",
        label: "Sublimation",
        process: "Dry ice is used to prevent ice-cream from melting.",
      },
      {
        icon: "🌫️",
        id: "mothballs",
        label: "Sublimation",
        process: "Mothballs become smaller as solid changes directly into gas.",
      },
      {
        icon: "💧",
        id: "dew",
        label: "Condensation",
        process: "Water vapour in the air condenses into dew droplets.",
      },
      {
        icon: "👕",
        id: "clothes",
        label: "Evaporation",
        process: "Water from wet clothes evaporates into the air.",
      },
    ],
    activeRecall: [
      {
        question: "Why does a wet towel dry below 100°C?",
        answer:
          "Evaporation occurs at any temperature. Water in the wet towel slowly evaporates into gas.",
      },
      {
        question: "Why is the temperature constant during boiling?",
        answer:
          "Temperature remains constant during freezing, melting and boiling. Heat is absorbed or released to overcome or form attraction between particles.",
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
  structure: { title: "Jirim", subtopics: ["5.1 Jirim dalam Alam", "5.2 Tiga Keadaan Jirim"] },
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bahan di sekeliling anda — kerusi yang anda duduki, air yang anda minum, udara yang anda hidu — semuanya jirim, dan semuanya mengikut peraturan zarah yang sama. Apabila anda memahami bagaimana zarah ini berkelakuan, anda boleh meramalkan bagaimana sesuatu bahan akan bertindak apabila dipanaskan, disejukkan, atau dicampur.",
  },
  matterInNature: {
    matterExamples: ["Benda hidup", "Air", "Tanah", "Batu", "Udara"],
    evidenceSamples: ["Tanah", "Air", "Tauge"],
    propertyDefinitions: {
      physical:
        "Sifat fizik ialah sifat yang dapat dikenal pasti dengan menggunakan lima deria manusia atau alat pengukur. Sifat fizik bergantung pada jenis bahan yang membentuk jirim tersebut.",
      chemical:
        "Sifat kimia ialah sifat sesuatu bahan yang menjadi jelas apabila bahan itu berubah menjadi bahan baharu. Sifat kimia bergantung pada tindak balas yang berlaku.",
    },
    labels: {
      matter: "Jirim",
      nonMatter: "Bukan jirim",
      mass: "Mempunyai jisim",
      space: "Memenuhi ruang",
      sample: "Sampel",
      container: "Bikar",
      balance: "Neraca tuas",
      before: "Sebelum",
      after: "Selepas",
      physical: "Sifat Fizik Jirim",
      chemical: "Sifat Kimia Jirim",
      classify: "Pengelasan bahan berdasarkan ciri",
      density: "Ketumpatan",
      higher: "Lebih tumpat",
      lower: "Kurang tumpat",
      points: "Takat Lebur dan Takat Didih",
      substance: "Bahan",
      solubility: "Keterlarutan",
      solute: "Bahan larut",
      solvent: "Pelarut",
      solution: "Larutan",
      sugar: "Gula",
      coffee: "Air kopi",
      conclusion: "Kesimpulan",
    },
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
        label: "Kekonduksian haba",
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
    particlePresentation: {
      heading: "Teori kinetik jirim",
      chooseState: "Pilih satu keadaan",
      comparison: "Perbandingan tiga keadaan jirim",
      behaviour: "Sifat fizik",
      modelNote: "Rajah zarah ialah model dan bukan dilukis mengikut skala.",
      particles: "Zarah",
      heating: "Pemanasan",
      cooling: "Penyejukan",
      lessEnergy: "Tenaga kinetik berkurang",
      moreEnergy: "Tenaga kinetik bertambah",
      slower: "Zarah bergerak lebih perlahan",
      faster: "Zarah bergerak lebih laju",
      properties: {
        shape: "Bentuk",
        mass: "Jisim",
        volume: "Isi padu",
        compressibility: "Kebolehmampatan",
        spaceBetweenParticles: "Ruang antara zarah",
        particleArrangement: "Susunan zarah",
        particleMovement: "Pergerakan zarah",
      },
    },
    diffusionPresentation: {
      heading: "Kadar Resapan dalam Tiga Keadaan Jirim",
      before: "Sebelum",
      after: "Selepas",
      high: "Kepekatan tinggi",
      spread: "Zarah tersebar",
      even: "Taburan lebih sekata",
      air: "Udara",
      bromine: "Gas bromin",
      mixture: "Campuran gas bromin dan udara",
      lid: "Penutup balang gas",
      crystal: "Hablur kuprum(II) sulfat",
      gel: "Agar-agar tidak berwarna",
      water: "Air suling",
      relationship: "Gas > Cecair > Pepejal",
    },
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
        mass: "Tiada jisim tetap",
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
        observation: "Air bertukar menjadi warna biru selepas dua jam.",
        rate: "Cepat",
      },
      {
        state: "Gas",
        observation: "Gas bromin memenuhi kedua-dua balang gas selepas 15 minit.",
        rate: "Paling cepat",
      },
    ],
    pass3Presentation: {
      heading: "Kesan haba kepada jirim",
      mechanism: "Perubahan susunan zarah apabila dipanaskan dan disejukkan",
      comparison: "Pendidihan / Penyejatan",
      constant: "Suhu tidak berubah",
      conservation: "Aktiviti 5.6 B — Jisim tidak berubah semasa perubahan fizikal",
      examples: "Contoh perubahan keadaan jirim dalam kehidupan harian",
      recall: "Semak Bab",
      absorbed: "Haba diserap",
      released: "Haba dibebaskan",
      before: "Sebelum",
      after: "Selepas",
      sameMass: "Jisim sebelum = jisim selepas",
      sameTemperature: "Suhu tidak berubah",
      thermometer: "Termometer",
      water: "100 ml air",
      balance: "Neraca tuas",
      tripleBalance: "Neraca tiga alur",
      ice: "Kiub ais",
      salt: "100 ml air + 10 spatula garam halus",
      ballRing: "Bebola logam dan gelang",
      glassRod: "Rod kaca",
      choose: "Pilih perubahan keadaan",
      model: "Skema / bukan mengikut skala",
    },
    boilingActivity: {
      title: "Aktiviti 5.6 A — Suhu tidak berubah semasa pendidihan air",
      materials:
        "Penunu Bunsen, tungku kaki tiga, kasa dawai, bikar, termometer, 100 ml air, kaki retort dan pengapit.",
      procedure:
        "Catat suhu awal 100 ml air. Panaskan air dan catat suhu setiap 10 minit sehingga suhu tidak berubah.",
    },
    applicationActivity: {
      title: "Aktiviti 5.7",
      task: "Secara berkumpulan, cari dua contoh perubahan keadaan jirim dalam kehidupan harian bagi setiap proses dan persembahkan hasil perbincangan menggunakan multimedia.",
    },
    constantProcesses: ["melting", "freezing", "boiling"],
    changesOfState: [
      {
        id: "melting",
        name: "Peleburan",
        initialState: "Pepejal",
        finalState: "Cecair",
        heat: "absorbed",
        thermalAction: "Menyerap haba",
        description: [
          "Pepejal menyerap haba apabila dipanaskan.",
          "Zarah-zarah memperoleh tenaga dan bergetar dengan lebih kuat.",
          "Tenaga haba digunakan untuk mengatasi daya tarikan antara zarah-zarah pepejal.",
          "Zarah-zarah bergerak bebas apabila suhu meningkat hingga ke takat lebur. Pepejal berubah menjadi cecair.",
        ],
        from: 0,
        to: 1,
      },
      {
        id: "boiling",
        name: "Pendidihan",
        initialState: "Cecair",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Menyerap haba",
        description: [
          "Pendidihan berlaku apabila suhu cecair mencapai takat didih.",
          "Cecair menyerap haba apabila dipanaskan.",
          "Zarah-zarah memperoleh tenaga dan bergerak lebih laju.",
          "Tenaga haba digunakan untuk mengatasi daya tarikan antara zarah-zarah cecair.",
          "Apabila suhu meningkat ke takat didih, zarah-zarah pun bergerak secara bebas dan rawak. Cecair berubah menjadi gas.",
        ],
        from: 1,
        to: 2,
      },
      {
        id: "evaporation",
        name: "Penyejatan",
        initialState: "Cecair",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Menyerap haba",
        description: [
          "Penyejatan berlaku pada sebarang suhu.",
          "Cecair menyerap haba apabila dipanaskan.",
          "Zarah-zarah memperoleh tenaga dan bergerak lebih laju.",
          "Cecair tersejat secara perlahan dan berubah menjadi gas.",
        ],
        from: 1,
        to: 2,
      },
      {
        id: "condensation",
        name: "Kondensasi",
        initialState: "Gas",
        finalState: "Cecair",
        heat: "released",
        thermalAction: "Membebaskan haba",
        description: [
          "Haba dibebaskan apabila gas disejukkan.",
          "Zarah-zarah akan kehilangan tenaga dan bergerak dengan lebih perlahan dan menghampiri antara satu sama lain.",
          "Apabila suhu mencapai di bawah takat didih, gas akan bertukar menjadi cecair.",
        ],
        from: 2,
        to: 1,
      },
      {
        id: "freezing",
        name: "Pembekuan",
        initialState: "Cecair",
        finalState: "Pepejal",
        heat: "released",
        thermalAction: "Membebaskan haba",
        description: [
          "Cecair membebaskan haba apabila disejukkan.",
          "Zarah-zarah kehilangan tenaga dan bergerak dengan lebih perlahan.",
          "Apabila suhu mencapai takat beku, zarah-zarah akan bergetar pada kedudukan yang tetap. Cecair berubah menjadi pepejal.",
        ],
        from: 1,
        to: 0,
      },
      {
        id: "sublimation",
        name: "Pemejalwapan",
        initialState: "Pepejal",
        finalState: "Gas",
        heat: "absorbed",
        thermalAction: "Menyerap haba",
        description: ["Pemejalwapan ialah proses pepejal berubah secara langsung menjadi gas."],
        from: 0,
        to: 2,
      },
      {
        id: "sublimation-reverse",
        name: "Pemejalwapan",
        initialState: "Gas",
        finalState: "Pepejal",
        heat: "released",
        thermalAction: "Membebaskan haba",
        description: ["Proses gas berubah menjadi pepejal juga disebut sebagai pemejalwapan."],
        from: 2,
        to: 0,
      },
    ],
    constantFacts: [
      "Suhu tidak akan berubah ketika mencapai takat beku, takat lebur dan takat didih semasa proses pembekuan, peleburan dan pendidihan. Haba diserap atau dibebaskan untuk memastikan daya tarikan antara zarah-zarah diatasi atau dibentuk.",
      "Jisim kekal tidak berubah semasa perubahan fizikal.",
    ],
    conservationExperiments: [
      {
        id: "ice",
        title: "Perubahan jisim semasa ais bertukar menjadi air",
        materials: "Kiub ais, bikar, neraca tuas.",
        procedure:
          "Timbang jisim bikar kosong. Masukkan ais dan timbang bikar bersama ais. Biarkan sehingga semua ais melebur menjadi air, kemudian timbang bikar bersama air.",
        before: "Bikar + ais",
        after: "Bikar + air",
        action: "Peleburan",
        observation: "Jisim kekal tidak berubah semasa perubahan fizikal.",
      },
      {
        id: "salt",
        title: "Perubahan jisim semasa garam melarut",
        materials: "Sepuluh spatula garam halus, 100 ml air, rod kaca, bikar, neraca tuas.",
        procedure:
          "Timbang bikar bersama 100 ml air. Masukkan sepuluh spatula garam halus dan timbang semula. Kacau dengan rod kaca sehingga semua garam melarut, kemudian timbang larutan tersebut.",
        before: "Bikar + air + garam",
        after: "Bikar + larutan garam",
        action: "Pelarutan",
        observation: "Jisim kekal tidak berubah semasa perubahan fizikal.",
      },
      {
        id: "metal",
        title: "Perubahan jisim semasa pengembangan pepejal",
        materials: "Bebola logam dan gelang, penunu Bunsen, neraca tiga alur.",
        procedure:
          "Timbang bebola logam bersama gelang. Panaskan bebola logam selama lima minit, kemudian timbang bebola logam yang panas bersama gelang.",
        before: "Bebola logam + gelang",
        after: "Bebola logam panas + gelang",
        action: "Panaskan bebola logam selama 5 minit",
        observation: "Jisim kekal tidak berubah semasa perubahan fizikal.",
      },
    ],
    everydayExamples: [
      {
        icon: "🍦",
        id: "ice-cream",
        label: "Pembekuan",
        process: "Pembekuan membolehkan krim manis membeku menjadi aiskrim.",
      },
      {
        icon: "🧊",
        id: "dry-ice",
        label: "Pemejalwapan",
        process:
          "Ais kering digunakan oleh peniaga aiskrim untuk mengelakkan aiskrim daripada cair.",
      },
      {
        icon: "🌫️",
        id: "mothballs",
        label: "Pemejalwapan",
        process:
          "Ubat gegat yang semakin mengecil ialah contoh perubahan pepejal secara langsung menjadi gas melalui proses pemejalwapan.",
      },
      {
        icon: "💧",
        id: "dew",
        label: "Kondensasi",
        process: "Embun terbentuk apabila wap air dalam udara terkondensasi menjadi titisan air.",
      },
      {
        icon: "👕",
        id: "clothes",
        label: "Penyejatan",
        process:
          "Air daripada pakaian yang basah tersejat menjadi wap ke udara melalui proses penyejatan.",
      },
    ],
    activeRecall: [
      {
        question: "Mengapa tuala basah kering pada suhu di bawah 100°C?",
        answer:
          "Penyejatan berlaku pada sebarang suhu. Air dalam tuala basah tersejat secara perlahan dan berubah menjadi gas.",
      },
      {
        question: "Mengapakah suhu tidak berubah semasa pendidihan?",
        answer:
          "Suhu tidak akan berubah ketika mencapai takat beku, takat lebur dan takat didih semasa proses pembekuan, peleburan dan pendidihan. Haba diserap atau dibebaskan untuk memastikan daya tarikan antara zarah-zarah diatasi atau dibentuk.",
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
