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
  description: string[];
}

export interface Chapter5Content {
  hook: { title: string; body: string };
  matterInNature: {
    definition: string;
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
    everydayExamples: { icon: string; label: string; process: string }[];
  };
}

const en: Chapter5Content = {
  hook: {
    title: "Why this matters",
    body: "Every material around you — the chair you're sitting on, the water you drink, the air you breathe — is matter, and it all follows the same rules of particles. Once you understand how those particles behave, you can predict how anything will act when heated, cooled, or mixed."
  },
  matterInNature: {
    definition: "Matter is a substance that has mass and occupies space. All living things (humans, plants, animals) and non-living things (water, soil, rocks, air) are matter.",
    physicalProperties: [
      { icon: "🌡️", label: "Boiling point", detail: "Different liquids have different boiling points — water boils at 100°C" },
      { icon: "🧊", label: "Melting point", detail: "The temperature at which a solid changes into liquid at a certain pressure" },
      { icon: "🍬", label: "Solubility", detail: "Sugar can dissolve in coffee" },
      { icon: "🔥", label: "Heat conduction", detail: "A pan handle is made of heat insulator (plastic); the pan itself is a heat conductor (steel)" }
    ],
    chemicalProperties: [
      { icon: "🔩", label: "Rusting", detail: "Occurs on iron when exposed to water and air" },
      { icon: "⛽", label: "Flammability", detail: "Petrol is a flammable matter" }
    ],
    classificationCharacteristics: ["Density", "Melting point", "Boiling point", "Solubility"],
    densityClassification: [
      { substance: "Glycerol and water", higherDensity: "Glycerol", lowerDensity: "Water" },
      { substance: "Petrol and mercury", higherDensity: "Mercury", lowerDensity: "Petrol" },
      { substance: "Sand and water", higherDensity: "Sand", lowerDensity: "Water" },
      { substance: "Oil and cork", higherDensity: "Oil", lowerDensity: "Cork" }
    ],
    meltingBoilingPoints: [
      { substance: "Water", meltingPoint: "0°C", boilingPoint: "100°C" },
      { substance: "Alcohol", meltingPoint: "-117°C", boilingPoint: "78°C" },
      { substance: "Copper", meltingPoint: "1085°C", boilingPoint: "2562°C" },
      { substance: "Oxygen", meltingPoint: "-218°C", boilingPoint: "-183°C" }
    ],
    solubilityDefinition: "Solubility is the ability of a substance (solute) to dissolve in a given amount of solvent to form a solution — e.g. sugar (solute) dissolved in coffee (solvent)."
  },
  statesOfMatter: {
    kineticTheory: "Matter is made up of constantly moving small and discrete particles. When heat is supplied, particles move faster; when cooled, particles move slower.",
    stateProperties: [
      { state: "Solid", shape: "Fixed shape", mass: "Fixed mass", volume: "Fixed volume", compressibility: "Incompressible", spaceBetweenParticles: "Small", particleArrangement: "Very close", particleMovement: "Vibrate in a fixed position" },
      { state: "Liquid", shape: "Takes shape of container", mass: "Fixed mass", volume: "Fixed volume", compressibility: "Difficult to compress", spaceBetweenParticles: "Moderate", particleArrangement: "Close", particleMovement: "Move freely and collide with one another" },
      { state: "Gas", shape: "Takes shape of container", mass: "No fixed mass", volume: "Follows volume of container", compressibility: "Compressible", spaceBetweenParticles: "Large", particleArrangement: "Very loose", particleMovement: "Move randomly and collide with one another" }
    ],
    diffusionDefinition: "Diffusion is a process in which particles of a substance move from a high concentration area to a low concentration area.",
    diffusionResults: [
      { state: "Solid", observation: "Copper(II) sulphate crystals in gel — gel turns blue after a few days", rate: "Low" },
      { state: "Liquid", observation: "Copper(II) sulphate crystals in water — water turns blue after two hours", rate: "Higher than solid" },
      { state: "Gas", observation: "Bromine gas fills both gas jars after 15 minutes", rate: "Highest" }
    ],
    changesOfState: [
      { name: "Melting", description: ["Solid absorbs heat when heated", "Particles gain energy and vibrate faster", "Heat overcomes the force of attraction between particles", "Solid turns into liquid at melting point"] },
      { name: "Boiling", description: ["Occurs when liquid temperature equals its boiling point", "Liquid absorbs heat and particles move faster", "Heat breaks the bond between liquid particles", "Liquid turns into gas"] },
      { name: "Evaporation", description: ["Occurs at any temperature", "Liquid absorbs heat from surroundings", "Particles gain energy and move faster", "Liquid slowly turns into gas"] },
      { name: "Condensation", description: ["Heat is released when gas is cooled", "Particles lose energy and move slower, closer together", "Gas turns into liquid at or below boiling point"] },
      { name: "Freezing", description: ["Liquid releases heat when cooled", "Particles lose energy and move slower", "Particles vibrate at a fixed position at freezing point", "Liquid turns into solid"] },
      { name: "Sublimation", description: ["A solid changes directly into gas, or gas directly into solid, without passing through the liquid state"] }
    ],
    constantFacts: [
      "Temperature remains constant during freezing, melting, and boiling — heat is used to overcome or form attraction between particles, not to raise temperature",
      "Mass remains constant during physical changes (melting, dissolving, expansion) because the quantity of particles does not change — only their kinetic energy changes"
    ],
    everydayExamples: [
      { icon: "🍦", label: "Freezing", process: "Sweet cream freezes to become ice-cream" },
      { icon: "🧊", label: "Sublimation", process: "Dry ice is used by ice-cream vendors to keep ice-cream cold without melting it" },
      { icon: "🌫️", label: "Sublimation", process: "Moth balls shrinking over time — solid changing directly to gas" },
      { icon: "💧", label: "Condensation", process: "Dew forms when water vapour in the air condenses into water droplets" }
    ]
  }
};

const bm: Chapter5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap bahan di sekeliling anda — kerusi yang anda duduki, air yang anda minum, udara yang anda hidu — semuanya jirim, dan semuanya mengikut peraturan zarah yang sama. Apabila anda memahami bagaimana zarah ini berkelakuan, anda boleh meramalkan bagaimana sesuatu bahan akan bertindak apabila dipanaskan, disejukkan, atau dicampur."
  },
  matterInNature: {
    definition: "Jirim ialah bahan yang mempunyai jisim dan memenuhi ruang. Semua benda hidup (manusia, tumbuhan, haiwan) dan benda bukan hidup (air, tanah, batu, udara) adalah jirim.",
    physicalProperties: [
      { icon: "🌡️", label: "Takat didih", detail: "Cecair berlainan mempunyai takat didih berbeza — air mendidih pada 100°C" },
      { icon: "🧊", label: "Takat lebur", detail: "Suhu apabila pepejal bertukar menjadi cecair pada tekanan tertentu" },
      { icon: "🍬", label: "Keterlarutan", detail: "Gula boleh larut dalam kopi" },
      { icon: "🔥", label: "Pengalir haba", detail: "Pemegang kuali diperbuat daripada penebat haba (plastik); badan kuali pula konduktor haba (keluli)" }
    ],
    chemicalProperties: [
      { icon: "🔩", label: "Pengaratan", detail: "Berlaku pada besi apabila terdedah kepada air dan udara" },
      { icon: "⛽", label: "Kebolehbakaran", detail: "Petrol ialah bahan yang mudah terbakar" }
    ],
    classificationCharacteristics: ["Ketumpatan", "Takat lebur", "Takat didih", "Keterlarutan"],
    densityClassification: [
      { substance: "Gliserol dan air", higherDensity: "Gliserol", lowerDensity: "Air" },
      { substance: "Petrol dan merkuri", higherDensity: "Merkuri", lowerDensity: "Petrol" },
      { substance: "Pasir dan air", higherDensity: "Pasir", lowerDensity: "Air" },
      { substance: "Minyak dan gabus", higherDensity: "Minyak", lowerDensity: "Gabus" }
    ],
    meltingBoilingPoints: [
      { substance: "Air", meltingPoint: "0°C", boilingPoint: "100°C" },
      { substance: "Alkohol", meltingPoint: "-117°C", boilingPoint: "78°C" },
      { substance: "Kuprum", meltingPoint: "1085°C", boilingPoint: "2562°C" },
      { substance: "Oksigen", meltingPoint: "-218°C", boilingPoint: "-183°C" }
    ],
    solubilityDefinition: "Keterlarutan ialah kebolehan sesuatu bahan (solut) untuk larut dalam sejumlah pelarut untuk membentuk larutan — cth: gula (solut) larut dalam kopi (pelarut)."
  },
  statesOfMatter: {
    kineticTheory: "Jirim terdiri daripada zarah-zarah kecil dan diskret yang sentiasa bergerak. Apabila haba dibekalkan, zarah bergerak lebih laju; apabila disejukkan, zarah bergerak lebih perlahan.",
    stateProperties: [
      { state: "Pepejal", shape: "Bentuk tetap", mass: "Jisim tetap", volume: "Isi padu tetap", compressibility: "Tidak boleh dimampatkan", spaceBetweenParticles: "Kecil", particleArrangement: "Sangat rapat", particleMovement: "Bergetar pada kedudukan tetap" },
      { state: "Cecair", shape: "Mengikut bentuk bekas", mass: "Jisim tetap", volume: "Isi padu tetap", compressibility: "Sukar dimampatkan", spaceBetweenParticles: "Sederhana", particleArrangement: "Rapat", particleMovement: "Bergerak bebas dan berlanggar antara satu sama lain" },
      { state: "Gas", shape: "Mengikut bentuk bekas", mass: "Jisim tidak tetap", volume: "Mengikut isi padu bekas", compressibility: "Boleh dimampatkan", spaceBetweenParticles: "Besar", particleArrangement: "Sangat longgar", particleMovement: "Bergerak secara rawak dan berlanggar antara satu sama lain" }
    ],
    diffusionDefinition: "Resapan ialah proses zarah-zarah sesuatu bahan bergerak daripada kawasan berkepekatan tinggi ke kawasan berkepekatan rendah.",
    diffusionResults: [
      { state: "Pepejal", observation: "Kristal kuprum(II) sulfat dalam agar-agar — agar-agar bertukar biru selepas beberapa hari", rate: "Rendah" },
      { state: "Cecair", observation: "Kristal kuprum(II) sulfat dalam air — air bertukar biru selepas dua jam", rate: "Lebih tinggi daripada pepejal" },
      { state: "Gas", observation: "Gas bromin memenuhi kedua-dua balang gas selepas 15 minit", rate: "Paling tinggi" }
    ],
    changesOfState: [
      { name: "Peleburan", description: ["Pepejal menyerap haba apabila dipanaskan", "Zarah memperoleh tenaga dan bergetar lebih laju", "Haba mengatasi daya tarikan antara zarah", "Pepejal bertukar menjadi cecair pada takat lebur"] },
      { name: "Pendidihan", description: ["Berlaku apabila suhu cecair menyamai takat didihnya", "Cecair menyerap haba dan zarah bergerak lebih laju", "Haba memutuskan ikatan antara zarah cecair", "Cecair bertukar menjadi gas"] },
      { name: "Penyejatan", description: ["Berlaku pada sebarang suhu", "Cecair menyerap haba daripada persekitaran", "Zarah memperoleh tenaga dan bergerak lebih laju", "Cecair perlahan-lahan bertukar menjadi gas"] },
      { name: "Kondensasi", description: ["Haba dibebaskan apabila gas disejukkan", "Zarah kehilangan tenaga dan bergerak lebih perlahan, lebih rapat", "Gas bertukar menjadi cecair pada atau di bawah takat didih"] },
      { name: "Pembekuan", description: ["Cecair membebaskan haba apabila disejukkan", "Zarah kehilangan tenaga dan bergerak lebih perlahan", "Zarah bergetar pada kedudukan tetap pada takat beku", "Cecair bertukar menjadi pepejal"] },
      { name: "Pemejalwapan", description: ["Pepejal bertukar terus menjadi gas, atau gas bertukar terus menjadi pepejal, tanpa melalui keadaan cecair"] }
    ],
    constantFacts: [
      "Suhu kekal malar semasa pembekuan, peleburan, dan pendidihan — haba digunakan untuk mengatasi atau membentuk daya tarikan antara zarah, bukan untuk menaikkan suhu",
      "Jisim kekal malar semasa perubahan fizikal (peleburan, pelarutan, pengembangan) kerana bilangan zarah tidak berubah — hanya tenaga kinetiknya berubah"
    ],
    everydayExamples: [
      { icon: "🍦", label: "Pembekuan", process: "Krim manis membeku untuk menjadi aiskrim" },
      { icon: "🧊", label: "Pemejalwapan", process: "Ais kering digunakan oleh peniaga aiskrim untuk mengekalkan kesejukan tanpa melebur" },
      { icon: "🌫️", label: "Pemejalwapan", process: "Kapur barus mengecil dari semasa ke semasa — pepejal bertukar terus menjadi gas" },
      { icon: "💧", label: "Kondensasi", process: "Embun terbentuk apabila wap air di udara terkondensasi menjadi titisan air" }
    ]
  }
};

export const chapter5Content = { en, bm };
export default chapter5Content;
