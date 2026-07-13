// chapter9-content.ts
// Source-verified content for Chapter 9 / Bab 9 — Earth / Bumi
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 254-269)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 254-269, official KSSM counterpart)
// Content data only — no presentation markup.

export interface EarthSphere {
  name: string;
  description: string;
}

export interface AtmosphereLayer {
  name: string;
  altitude: string;
  facts: string[];
}

export interface OceanZone {
  name: string;
  depth: string;
  facts: string[];
}

export interface EarthLayer {
  name: string;
  subLayers?: string[];
}

export interface RockType {
  name: string;
  formation: string;
  characteristics: string[];
}

export interface EarthProcess {
  name: string;
  description: string;
  examples: string[];
}

export interface Geohazard {
  name: string;
  context: string;
}

export interface Chapter9Content {
  hook: { title: string; body: string };
  earthSystem: {
    spheres: EarthSphere[];
    atmosphereLayers: AtmosphereLayer[];
    altitudeFact: string;
    oceanZones: OceanZone[];
    waterCycleSteps: string[];
    waterConstancyFact: string;
    earthLayers: EarthLayer[];
    whyEarthSustainsLife: string[];
  };
  composition: {
    rockTypes: RockType[];
    rockCycleSteps: string[];
  };
  mainProcesses: {
    exogenic: EarthProcess;
    endogenic: EarthProcess;
    plateTectonicsNote: string;
    mantleConvectionNote: string;
  };
  geohazards: {
    types: Geohazard[];
    earlyWarningTech: { device: string; purpose: string }[];
    impacts: string[];
  };
  ageOfEarth: {
    estimatedAge: string;
    ageMethod: string;
    fossilDefinition: string;
    fossilImportance: string[];
    lifeTimeline: { period: string; note: string }[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Chapter9Content = {
  hook: {
    title: "Why this matters",
    body: "Earth is the only known place in the universe that can sustain life — and it's built in distinct layers, from the atmosphere above your head to the core 6,000 km beneath your feet. This chapter shows you what each layer is made of, why the ground beneath you constantly reshapes itself, and how scientists know the planet is 4.5 billion years old."
  },
  earthSystem: {
    spheres: [
      { name: "Atmosphere", description: "The air zone covering Earth's surface" },
      { name: "Biosphere", description: "The life zone — humans, animals, plants and microorganisms" },
      { name: "Hydrosphere", description: "The water zone — rivers, lakes, seas, ice, underground water, and water vapour in the atmosphere" },
      { name: "Geosphere", description: "The rock and soil zone on Earth's surface" }
    ],
    atmosphereLayers: [
      { name: "Exosphere", altitude: "480 km and above", facts: ["Contains light gases like helium and hydrogen", "Air becomes thinner towards space", "Communication satellites orbit here, enabling phone calls and TV broadcasts"] },
      { name: "Thermosphere", altitude: "80-480 km", facts: ["Also called the ionosphere — contains ions that reflect radio waves", "Auroras occur here from charged particles reacting with Earth's magnetic field"] },
      { name: "Mesosphere", altitude: "50-80 km", facts: ["Meteorites burn up and are destroyed in this layer"] },
      { name: "Stratosphere", altitude: "13-50 km", facts: ["Stable layer suitable for aircraft flights", "Contains the ozone layer, which absorbs harmful UV rays", "Ozone depletes when CFCs from pesticides, refrigerators and air-conditioners break down ozone molecules"] },
      { name: "Troposphere", altitude: "0-13 km", facts: ["Where living organisms breathe", "Where wind blows and clouds, rain and snow form"] }
    ],
    altitudeFact: "From troposphere to stratosphere, air pressure decreases as altitude increases, and temperature also decreases with altitude.",
    oceanZones: [
      { name: "Surface zone", depth: "0-200 m", facts: ["Water is shallow and light can penetrate", "Suitable habitat for plants"] },
      { name: "Twilight zone", depth: "200-1,000 m", facts: ["Little to no light", "Difficult for plants to survive", "Habitat for large marine animals like giant squids and whales"] },
      { name: "Dark zone", depth: "1,000+ m", facts: ["Very deep, no light reaches it", "Most animals here have shimmering or glow-in-the-dark bodies"] }
    ],
    waterCycleSteps: ["Seawater evaporates from sunlight", "Water vapour is carried to the mainland by clouds", "Water condenses and falls as rain", "Rainwater flows into rivers and seeps into the ground as groundwater", "Rivers flow back into the ocean"],
    waterConstancyFact: "The total amount of water on Earth, on its surface, and in its atmosphere is always constant — the water cycle is continuous.",
    earthLayers: [
      { name: "Crust" },
      { name: "Mantle", subLayers: ["Lithosphere (covers crust and top of mantle)", "Asthenosphere", "Mesosphere"] },
      { name: "Outer core" },
      { name: "Inner core" }
    ],
    whyEarthSustainsLife: ["Earth's temperature is not too hot or too cold, due to its position — not too near or too far from the Sun", "Presence of water", "Presence of oxygen"]
  },
  composition: {
    rockTypes: [
      { name: "Igneous rock", formation: "Formed from cooling and freezing of magma or lava flowing out of the mantle", characteristics: ["Contains various minerals"] },
      { name: "Sedimentary rock", formation: "Formed by compression of deposited materials carried by rivers, glaciers and wind", characteristics: ["Consists of many layers, sometimes hollow", "Can contain fossils"] },
      { name: "Metamorphic rock", formation: "Formed when igneous or sedimentary rocks are exposed to very high pressure and temperature", characteristics: ["Usually harder than the original rocks that formed them"] }
    ],
    rockCycleSteps: ["Magma cools and freezes → igneous rock", "Igneous rock undergoes weathering and erosion → eroded materials transported and sedimented → sedimentary rock", "Sedimentary or igneous rock exposed to heat and pressure → metamorphic rock", "Metamorphic rock melts under extreme heat → back to magma", "The cycle repeats continuously"]
  },
  mainProcesses: {
    exogenic: {
      name: "Exogenic process",
      description: "A process that occurs on Earth's surface",
      examples: ["Weathering — rock fragmentation/decay from temperature changes, rainwater, frost, and microorganisms", "Erosion — wearing away of Earth's surface by moving agents like water, wind and waves", "Mass and land depletion — soil movement down a slope due to gravity", "Transport and sedimentation — eroded materials are moved and deposited when the transporting agent slows down"]
    },
    endogenic: {
      name: "Endogenic process",
      description: "A process caused by forces from within the Earth that forms and changes Earth's surface",
      examples: ["Mantle convection — high temperature in the mantle/core produces convection currents in the asthenosphere, moving Earth's crust", "Earth's crust movement (Plate Tectonics) — crust plates constantly move, causing collisions, divergence, and continental drift", "Magma activity — volcanoes are vents where molten magma erupts and forms volcanic cones"]
    },
    plateTectonicsNote: "According to Plate Tectonics theory, Earth's crust is divided into several plates that constantly move, producing various landforms and continental drift.",
    mantleConvectionNote: "The high temperature in the mantle and core produces convection currents in the asthenosphere layer, which are strong enough to move Earth's crust above it."
  },
  geohazards: {
    types: [
      { name: "Earthquake", context: "Caused by sudden movement of Earth's crust (endogenic process consequence)" },
      { name: "Landslide", context: "Consequence of endogenic processes affecting slopes" },
      { name: "Tsunami", context: "Often triggered by undersea earthquakes" },
      { name: "Volcanism", context: "Eruption of magma through Earth's crust" },
      { name: "Global warming", context: "Long-term rise in Earth's average temperature" },
      { name: "Sinkhole", context: "Sudden collapse of ground surface" },
      { name: "Quicksand", context: "Usually occurs in wetlands" },
      { name: "Acid rain", context: "Usually occurs in industrial areas" }
    ],
    earlyWarningTech: [
      { device: "Landslide detector (acoustic sensor + steel waveguide)", purpose: "Placed on hill slopes to detect deforming slopes via acoustic emissions from gravel, giving early warning of landslides" },
      { device: "Tsunami detector", purpose: "Placed at the shoreline to give early warnings of tsunami via satellite" }
    ],
    impacts: ["Loss of life", "Diseases", "Starvation", "Damage to properties", "Example: the 2004 Sumatra earthquake and tsunami killed 43 Malaysians and destroyed many homes"]
  },
  ageOfEarth: {
    estimatedAge: "4.5 billion years, estimated based on meteorites obtained",
    ageMethod: "Geologists define long periods of time as eras, each divided into several periods, forming the geological time scale used to date Earth's history",
    fossilDefinition: "Fossils are Earth's materials such as plants, animals and insects that have been submerged and buried for a very long period of time. The word 'fossil' comes from the Latin 'fossilis', meaning 'obtained from digging'.",
    fossilImportance: ["Fossil records show how animal and plant species have evolved over millions of years", "Fossil records provide information about species that have gone extinct"],
    lifeTimeline: [
      { period: "5,000 million years ago", note: "Origin of Earth" },
      { period: "~4,000 million years ago", note: "Origin of life; bacteria and protozoa" },
      { period: "~1,000-2,000 million years ago", note: "Seaweed, jellyfish appear" },
      { period: "~500 million years ago", note: "Fish appear" },
      { period: "Later periods", note: "Insects, flowering plants, dinosaurs, and eventually humans appear" }
    ]
  },
  keyExamFacts: [
    "Earth's system has four spheres: atmosphere, biosphere, hydrosphere, and geosphere",
    "The atmosphere has five layers: troposphere, stratosphere (contains the ozone layer), mesosphere, thermosphere (ionosphere), and exosphere",
    "Air pressure and temperature both decrease as altitude increases",
    "The ocean has three zones: surface, twilight, and dark — light penetration decreases with depth",
    "Earth's main layers are the crust, mantle (lithosphere, asthenosphere, mesosphere), outer core, and inner core",
    "Rocks are igneous, sedimentary, or metamorphic, and continuously transform into each other via the rock cycle",
    "Exogenic processes (weathering, erosion) happen on Earth's surface; endogenic processes (mantle convection, plate tectonics, magma activity) come from within",
    "Geohazards like earthquakes, tsunamis, landslides and volcanism are consequences of endogenic processes",
    "Earth is estimated to be 4.5 billion years old, based on meteorite dating",
    "Fossils reveal how species evolved and which species have gone extinct"
  ],
  keyTerms: [
    "Atmosphere", "Biosphere", "Hydrosphere", "Geosphere", "Troposphere",
    "Stratosphere", "Ozone layer", "Mesosphere", "Thermosphere", "Exosphere",
    "Crust", "Mantle", "Core", "Igneous rock", "Sedimentary rock", "Metamorphic rock",
    "Rock cycle", "Exogenic process", "Endogenic process", "Plate Tectonics",
    "Geohazard", "Fossil", "Geological time scale"
  ],
  chapterSummary: "Chapter 9 explores Earth's structure and history — the four spheres of the Earth system, the five atmospheric layers and three ocean zones, Earth's crust/mantle/core layers, how the three rock types form and cycle into one another, the exogenic and endogenic processes that reshape Earth's surface, the geohazards that result from these processes, and how scientists estimate Earth's age at 4.5 billion years using fossils and geological time scales."
};

const bm: Chapter9Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Bumi ialah satu-satunya tempat yang diketahui di alam semesta yang dapat menampung kehidupan — dan ia dibina dalam lapisan yang jelas, daripada atmosfera di atas kepala anda hingga teras 6,000 km di bawah kaki anda. Bab ini menunjukkan bahan setiap lapisan, sebab tanah di bawah anda sentiasa berubah bentuk, dan bagaimana saintis tahu planet ini berusia 4.5 bilion tahun."
  },
  earthSystem: {
    spheres: [
      { name: "Atmosfera", description: "Zon udara yang meliputi permukaan Bumi" },
      { name: "Biosfera", description: "Zon hidupan — manusia, haiwan, tumbuhan dan mikroorganisma" },
      { name: "Hidrosfera", description: "Zon air — sungai, tasik, laut, ais, air bawah tanah, dan wap air di atmosfera" },
      { name: "Geosfera", description: "Zon batu dan tanah di permukaan Bumi" }
    ],
    atmosphereLayers: [
      { name: "Eksosfera", altitude: "480 km ke atas", facts: ["Mengandungi gas ringan seperti helium dan hidrogen", "Udara semakin nipis ke arah angkasa", "Satelit komunikasi mengorbit di sini, membolehkan panggilan telefon dan siaran TV"] },
      { name: "Termosfera", altitude: "80-480 km", facts: ["Juga dikenali sebagai ionosfera — mengandungi ion yang memantulkan gelombang radio", "Aurora berlaku di sini akibat zarah bercas bertindak balas dengan medan magnet Bumi"] },
      { name: "Mesosfera", altitude: "50-80 km", facts: ["Meteorit terbakar dan musnah dalam lapisan ini"] },
      { name: "Stratosfera", altitude: "13-50 km", facts: ["Lapisan stabil yang sesuai untuk penerbangan pesawat", "Mengandungi lapisan ozon, yang menyerap sinar UV berbahaya", "Ozon terjejas apabila CFC daripada racun serangga, peti sejuk dan penyaman udara memecahkan molekul ozon"] },
      { name: "Troposfera", altitude: "0-13 km", facts: ["Tempat organisma hidup bernafas", "Tempat angin bertiup dan awan, hujan serta salji terbentuk"] }
    ],
    altitudeFact: "Daripada troposfera ke stratosfera, tekanan udara berkurang apabila altitud meningkat, dan suhu turut berkurang dengan altitud.",
    oceanZones: [
      { name: "Zon permukaan", depth: "0-200 m", facts: ["Air cetek dan cahaya boleh menembusi", "Habitat sesuai untuk tumbuhan"] },
      { name: "Zon senja", depth: "200-1,000 m", facts: ["Sedikit atau tiada cahaya", "Sukar untuk tumbuhan hidup", "Habitat haiwan marin besar seperti sotong gergasi dan ikan paus"] },
      { name: "Zon gelap", depth: "1,000+ m", facts: ["Sangat dalam, tiada cahaya sampai", "Kebanyakan haiwan di sini berkilau atau bercahaya dalam gelap"] }
    ],
    waterCycleSteps: ["Air laut menyejat oleh cahaya matahari", "Wap air dibawa ke daratan oleh awan", "Air terkondensasi dan turun sebagai hujan", "Air hujan mengalir ke sungai dan meresap ke dalam tanah sebagai air bawah tanah", "Sungai mengalir semula ke laut"],
    waterConstancyFact: "Jumlah keseluruhan air di Bumi, di permukaannya, dan di atmosferanya sentiasa malar — kitaran air berterusan.",
    earthLayers: [
      { name: "Kerak" },
      { name: "Mantel", subLayers: ["Litosfera (meliputi kerak dan bahagian atas mantel)", "Astenosfera", "Mesosfera"] },
      { name: "Teras luar" },
      { name: "Teras dalam" }
    ],
    whyEarthSustainsLife: ["Suhu Bumi tidak terlalu panas atau sejuk, disebabkan kedudukannya — tidak terlalu dekat atau jauh daripada Matahari", "Kehadiran air", "Kehadiran oksigen"]
  },
  composition: {
    rockTypes: [
      { name: "Batuan igneus", formation: "Terbentuk daripada penyejukan dan pembekuan magma atau lava yang mengalir keluar daripada mantel", characteristics: ["Mengandungi pelbagai mineral"] },
      { name: "Batuan enapan (sedimen)", formation: "Terbentuk melalui mampatan bahan terenap yang dibawa oleh sungai, glasier dan angin", characteristics: ["Terdiri daripada banyak lapisan, kadangkala berongga", "Boleh mengandungi fosil"] },
      { name: "Batuan metamorfik", formation: "Terbentuk apabila batuan igneus atau enapan terdedah kepada tekanan dan suhu yang sangat tinggi", characteristics: ["Biasanya lebih keras daripada batuan asal yang membentuknya"] }
    ],
    rockCycleSteps: ["Magma menyejuk dan membeku → batuan igneus", "Batuan igneus mengalami luluhawa dan hakisan → bahan terhakis diangkut dan terenap → batuan enapan", "Batuan enapan atau igneus terdedah kepada haba dan tekanan → batuan metamorfik", "Batuan metamorfik melebur pada haba melampau → kembali kepada magma", "Kitaran ini berulang secara berterusan"]
  },
  mainProcesses: {
    exogenic: {
      name: "Proses eksogen",
      description: "Proses yang berlaku di permukaan Bumi",
      examples: ["Luluhawa — pecahan dan pereputan batuan akibat perubahan suhu, air hujan, salji dan mikroorganisma", "Hakisan — pengikisan permukaan Bumi oleh agen bergerak seperti air, angin dan ombak", "Susutan jisim dan tanah — pergerakan tanah menuruni cerun akibat graviti", "Pengangkutan dan pengenapan — bahan terhakis diangkut dan terenap apabila kelajuan agen berkurang"]
    },
    endogenic: {
      name: "Proses endogen",
      description: "Proses yang disebabkan oleh daya dari dalam Bumi yang membentuk dan mengubah permukaan Bumi",
      examples: ["Perolakan mantel — suhu tinggi dalam mantel/teras menghasilkan arus perolakan dalam astenosfera, menggerakkan kerak Bumi", "Pergerakan kerak Bumi (Tektonik Plat) — plat kerak sentiasa bergerak, menyebabkan perlanggaran, percapahan, dan hanyutan benua", "Aktiviti magma — gunung berapi ialah lubang tempat magma cair meletus dan membentuk kon gunung berapi"]
    },
    plateTectonicsNote: "Menurut teori Tektonik Plat, kerak Bumi terbahagi kepada beberapa plat yang sentiasa bergerak, menghasilkan pelbagai bentuk muka bumi dan hanyutan benua.",
    mantleConvectionNote: "Suhu tinggi dalam mantel dan teras menghasilkan arus perolakan dalam lapisan astenosfera, yang cukup kuat untuk menggerakkan kerak Bumi di atasnya."
  },
  geohazards: {
    types: [
      { name: "Gempa bumi", context: "Disebabkan pergerakan mendadak kerak Bumi (akibat proses endogen)" },
      { name: "Tanah runtuh", context: "Akibat proses endogen yang menjejaskan cerun" },
      { name: "Tsunami", context: "Selalunya dicetuskan oleh gempa bumi bawah laut" },
      { name: "Kegiatan gunung berapi", context: "Letusan magma melalui kerak Bumi" },
      { name: "Pemanasan global", context: "Peningkatan jangka panjang suhu purata Bumi" },
      { name: "Lubang benam", context: "Keruntuhan mendadak permukaan tanah" },
      { name: "Tanah jerlus", context: "Biasanya berlaku di tanah lembap" },
      { name: "Hujan asid", context: "Biasanya berlaku di kawasan perindustrian" }
    ],
    earlyWarningTech: [
      { device: "Pengesan tanah runtuh (sensor akustik + pandu gelombang keluli)", purpose: "Diletakkan di cerun bukit untuk mengesan cerun yang berubah bentuk melalui pancaran akustik daripada kelikir, memberi amaran awal tanah runtuh" },
      { device: "Pengesan tsunami", purpose: "Diletakkan di persisiran pantai untuk memberi amaran awal tsunami melalui satelit" }
    ],
    impacts: ["Kehilangan nyawa", "Penyakit", "Kebuluran", "Kerosakan harta benda", "Contoh: gempa bumi dan tsunami Sumatera 2004 meragut nyawa 43 rakyat Malaysia dan memusnahkan banyak rumah"]
  },
  ageOfEarth: {
    estimatedAge: "4.5 bilion tahun, dianggarkan berdasarkan meteorit yang diperoleh",
    ageMethod: "Ahli geologi mentakrifkan tempoh masa yang panjang sebagai era, setiap era dibahagikan kepada beberapa zaman, membentuk skala masa geologi yang digunakan untuk menentukan usia sejarah Bumi",
    fossilDefinition: "Fosil ialah bahan Bumi seperti tumbuhan, haiwan dan serangga yang telah terendam dan tertimbus untuk tempoh masa yang sangat lama. Perkataan 'fosil' berasal daripada perkataan Latin 'fossilis', bermaksud 'diperoleh daripada menggali'.",
    fossilImportance: ["Rekod fosil menunjukkan bagaimana spesies haiwan dan tumbuhan berevolusi selama berjuta-juta tahun", "Rekod fosil memberikan maklumat tentang spesies yang telah pupus"],
    lifeTimeline: [
      { period: "5,000 juta tahun dahulu", note: "Asal usul Bumi" },
      { period: "~4,000 juta tahun dahulu", note: "Asal usul hidupan; bakteria dan protozoa" },
      { period: "~1,000-2,000 juta tahun dahulu", note: "Rumpair, obor-obor muncul" },
      { period: "~500 juta tahun dahulu", note: "Ikan muncul" },
      { period: "Zaman kemudian", note: "Serangga, tumbuhan berbunga, dinosaur, dan akhirnya manusia muncul" }
    ]
  },
  keyExamFacts: [
    "Sistem Bumi mempunyai empat sfera: atmosfera, biosfera, hidrosfera, dan geosfera",
    "Atmosfera mempunyai lima lapisan: troposfera, stratosfera (mengandungi lapisan ozon), mesosfera, termosfera (ionosfera), dan eksosfera",
    "Tekanan udara dan suhu kedua-duanya berkurang apabila altitud meningkat",
    "Lautan mempunyai tiga zon: permukaan, senja, dan gelap — penembusan cahaya berkurang dengan kedalaman",
    "Lapisan utama Bumi ialah kerak, mantel (litosfera, astenosfera, mesosfera), teras luar, dan teras dalam",
    "Batuan terbahagi kepada igneus, enapan, atau metamorfik, dan bertukar secara berterusan antara satu sama lain melalui kitar batuan",
    "Proses eksogen (luluhawa, hakisan) berlaku di permukaan Bumi; proses endogen (perolakan mantel, tektonik plat, aktiviti magma) berasal dari dalam",
    "Geobahaya seperti gempa bumi, tsunami, tanah runtuh dan kegiatan gunung berapi adalah akibat proses endogen",
    "Bumi dianggarkan berusia 4.5 bilion tahun, berdasarkan penentuan usia meteorit",
    "Fosil mendedahkan bagaimana spesies berevolusi dan spesies mana yang telah pupus"
  ],
  keyTerms: [
    "Atmosfera", "Biosfera", "Hidrosfera", "Geosfera", "Troposfera",
    "Stratosfera", "Lapisan ozon", "Mesosfera", "Termosfera", "Eksosfera",
    "Kerak", "Mantel", "Teras", "Batuan igneus", "Batuan enapan", "Batuan metamorfik",
    "Kitar batuan", "Proses eksogen", "Proses endogen", "Tektonik Plat",
    "Geobahaya", "Fosil", "Skala masa geologi"
  ],
  chapterSummary: "Bab 9 meneroka struktur dan sejarah Bumi — empat sfera sistem Bumi, lima lapisan atmosfera dan tiga zon lautan, lapisan kerak/mantel/teras Bumi, cara tiga jenis batuan terbentuk dan berkitar antara satu sama lain, proses eksogen dan endogen yang membentuk semula permukaan Bumi, geobahaya akibat proses ini, dan cara saintis menganggarkan usia Bumi pada 4.5 bilion tahun menggunakan fosil dan skala masa geologi."
};

export const chapter9Content = { en, bm };
export default chapter9Content;
