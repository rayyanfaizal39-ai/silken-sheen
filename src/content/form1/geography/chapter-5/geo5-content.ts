// geo5-content.ts
// Source-verified content for Geography Form 1, Bab 5 — Bumi (Earth)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 42-55)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface EarthSphere {
  name: string;
  description: string;
}

export interface AtmosphereLayer {
  name: string;
}

export interface EarthLayer {
  name: string;
  facts: string[];
}

export interface Continent {
  name: string;
  facts: string[];
}

export interface Ocean {
  name: string;
  facts: string[];
}

export interface SeaOrStrait {
  name: string;
  facts: string[];
}

export interface CrustMovementEffect {
  name: string;
  process: string[];
}

export interface Geo5Content {
  hook: { title: string; body: string };
  physicalSystem: {
    surfaceArea: string;
    waterVsLand: string;
    spheres: EarthSphere[];
    atmosphereLayers: AtmosphereLayer[];
  };
  structure: {
    layers: EarthLayer[];
  };
  continentsOceans: {
    definition: string;
    continents: Continent[];
    oceans: Ocean[];
    seasAndStraits: SeaOrStrait[];
  };
  crustMovement: {
    definition: string;
    keyTerms: { term: string; definition: string }[];
    continentalDrift: string;
    effects: CrustMovementEffect[];
    earthquakeFacts: string[];
    tsunamiFact: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo5Content: Geo5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Bumi yang anda pijak sebenarnya sentiasa bergerak — plat-plat besar yang membentuk kerak bumi bergeser secara perlahan, mencipta gunung, mencetuskan gempa bumi, dan menggerakkan benua. Bab ini menerangkan struktur planet ini dan kuasa yang membentuknya."
  },
  physicalSystem: {
    surfaceArea: "Bumi ialah planet yang berbentuk sfera dan mempunyai anggaran keluasan permukaan 510 juta km persegi.",
    waterVsLand: "Air meliputi 71% daripada permukaan bumi manakala 29% ialah daratan.",
    spheres: [
      { name: "Atmosfera", description: "Lapisan udara yang menyelubungi bumi, mengandungi pelbagai jenis gas, debu, habuk, asap serta wap air" },
      { name: "Litosfera", description: "Lapisan luar bumi yang merangkumi bahagian kerak bumi dan bahagian atas mantel, mengandungi pelbagai jenis batuan dan mineral" },
      { name: "Hidrosfera", description: "Meliputi semua bahagian air yang wujud di bumi — air laut, air tasik, air sungai, air bawah tanah, air paya dan litupan ais" },
      { name: "Biosfera", description: "Kawasan yang didiami oleh semua benda hidup — manusia, haiwan dan tumbuhan, melibatkan bahagian kerak bumi dan atmosfera" }
    ],
    atmosphereLayers: [
      { name: "Eksosfera" }, { name: "Termosfera" }, { name: "Mesosfera" }, { name: "Stratosfera" }, { name: "Troposfera" }
    ]
  },
  structure: {
    layers: [
      { name: "Kerak Bumi", facts: ["Lapisan bumi yang paling keras dan pejal", "Terdiri daripada dua lapisan: sial (silika dan aluminium) di bahagian atas, membentuk benua; dan sima (silika dan magnesium) di bawah sial dan di dasar lautan"] },
      { name: "Mantel", facts: ["Terletak di bawah lapisan kerak bumi", "Merangkumi dua pertiga jisim bumi", "Bersifat pepejal tetapi lapisan luarnya bersifat separa cecair"] },
      { name: "Teras Bumi", facts: ["Lapisan yang paling dalam", "Mengalami tekanan yang kuat dan suhu yang sangat tinggi", "Terbahagi kepada dua: teras luar dan teras dalam"] }
    ]
  },
  continentsOceans: {
    definition: "Benua merupakan daratan yang sangat luas pada permukaan bumi. Terdapat tujuh benua yang dikelilingi oleh lima lautan luas.",
    continents: [
      { name: "Asia", facts: ["Benua terbesar di dunia", "Meliputi keluasan kira-kira 55.8 juta kilometer persegi"] },
      { name: "Afrika", facts: ["Benua kedua terbesar di dunia", "Meliputi keluasan kira-kira 30 juta kilometer persegi"] },
      { name: "Amerika Utara", facts: ["Benua ketiga terbesar di dunia", "Meliputi kawasan seluas kira-kira 24.5 juta kilometer persegi"] },
      { name: "Amerika Selatan", facts: ["Benua keempat terbesar di dunia", "Meliputi kawasan seluas kira-kira 17.8 juta kilometer persegi"] },
      { name: "Antartika", facts: ["Benua yang terletak paling selatan", "Meliputi kawasan seluas kira-kira 14 juta kilometer persegi"] },
      { name: "Eropah", facts: ["Benua kedua terkecil di dunia", "Meliputi keluasan kira-kira 10.4 juta kilometer persegi"] },
      { name: "Australia", facts: ["Benua yang paling mendatar di dunia", "Meliputi keluasan kira-kira 7.6 juta kilometer persegi"] }
    ],
    oceans: [
      { name: "Lautan Pasifik", facts: ["Lautan terbesar di dunia", "Purata kedalaman 4300 m"] },
      { name: "Lautan Atlantik", facts: ["Lautan kedua terbesar di dunia", "Memanjang dari utara ke selatan dan membentuk seakan-akan huruf 'S'"] },
      { name: "Lautan Hindi", facts: ["Lautan ketiga terbesar di dunia", "Bersempadan dengan benua Asia, Afrika dan Australia", "Purata kedalaman 3900 m"] },
      { name: "Lautan Selatan", facts: ["Lautan yang mengelilingi benua Antartika"] },
      { name: "Lautan Artik", facts: ["Lautan terkecil dan tercetek di dunia", "Terletak berdekatan dengan Kutub Utara"] }
    ],
    seasAndStraits: [
      { name: "Laut China Selatan", facts: ["Terletak dalam lingkungan Lautan Pasifik", "Merangkumi perairan bermula dari Selat Melaka hingga ke Selat Taiwan"] },
      { name: "Laut Sulu", facts: ["Terletak di bahagian barat daya Filipina, berhampiran Pulau Borneo"] },
      { name: "Selat Melaka", facts: ["Terletak di perairan antara Semenanjung Malaysia dengan Pulau Sumatera (Indonesia)", "Selat terpanjang di dunia"] },
      { name: "Selat Tebrau", facts: ["Kawasan perairan sempit yang memisahkan Semenanjung Malaysia dengan Singapura"] }
    ]
  },
  crustMovement: {
    definition: "Permukaan bumi terdiri daripada lapisan kerak bumi yang dikenali sebagai plat, terbahagi kepada plat daratan dan plat lautan. Arus perolakan di lapisan mantel menyebabkan plat bumi bergerak, melibatkan proses pertembungan dan pencapahan.",
    keyTerms: [
      { term: "Pertembungan", definition: "Perlanggaran antara plat-plat di kerak bumi secara serentak" },
      { term: "Pencapahan", definition: "Perpisahan dan pergerakan plat-plat di kerak bumi" },
      { term: "Sesaran", definition: "Pergerakan plat-plat bumi secara berselisih di sepanjang garis gelinciran" }
    ],
    continentalDrift: "Hanyutan Benua: Pencapahan atau pemisahan plat menyebabkan berlakunya perubahan kedudukan benua. Walaupun proses pemisahan plat terjadi dengan sangat perlahan, ahli sains membuktikan kemungkinan kedudukan benua pada masa sekarang adalah kesan daripada hanyutan benua (proses ini berlangsung sejak 200 juta tahun dahulu).",
    effects: [
      { name: "Gunung Lipat", process: ["Pergerakan dan pertembungan plat bumi menyebabkan pembentukan gunung lipat", "Berlaku apabila terdapat daya mampatan pada kerak bumi", "Tolakan serta himpitan dua plat dari arah bertentangan menyebabkan kerak bumi termampat, membentuk banjaran gunung lipat"] },
      { name: "Gunung Bongkah", process: ["Terbentuk akibat pergerakan kerak bumi yang disebut gelinciran atau sesaran", "Proses gelinciran berlaku di sempadan plat bumi akibat pengaruh daya tegangan atau mampatan", "Menghasilkan gunung bongkah dan lurah gelinciran"] },
      { name: "Gunung Berapi", process: ["Terbentuk apabila berlakunya pertembungan dua plat yang mewujudkan zon benam", "Salah satu plat akan terjunam ke bawah, bertemu lapisan mantel, membentuk magma dan lava", "Plat yang terangkat akibat pertembungan membentuk gunung dan rekahan", "Magma keluar memenuhi rekahan pada plat bumi, membentuk gunung berapi"] }
    ],
    earthquakeFacts: [
      "Gempa bumi berlaku apabila wujudnya daya tekanan akibat pertembungan dan himpitan antara plat",
      "Proses tersebut menghasilkan gegaran di kawasan sempadan plat",
      "Kejadian gempa bumi di dasar laut berpotensi mengakibatkan tsunami"
    ],
    tsunamiFact: "Gelombang tsunami boleh mencapai kelajuan sebuah jet, iaitu melebihi 800 km/j di laut dalam — cukup laju untuk menyeberangi Lautan Pasifik dalam masa kurang daripada satu hari."
  },
  keyExamFacts: [
    "Bumi mempunyai keluasan permukaan kira-kira 510 juta km persegi — 71% air, 29% daratan",
    "Empat komponen sistem fizikal Bumi: atmosfera, litosfera, hidrosfera, biosfera",
    "Bumi terdiri daripada tiga lapisan utama: kerak bumi, mantel, teras bumi",
    "Kerak bumi mempunyai dua lapisan: sial (atas, membentuk benua) dan sima (bawah, dasar lautan)",
    "Terdapat tujuh benua dan lima lautan di dunia",
    "Asia ialah benua terbesar; Lautan Pasifik ialah lautan terbesar",
    "Selat Melaka ialah selat terpanjang di dunia, antara Semenanjung Malaysia dan Sumatera",
    "Pergerakan plat bumi (pertembungan dan pencapahan) membentuk gunung lipat, gunung bongkah, dan gunung berapi",
    "Gempa bumi di dasar laut berpotensi mengakibatkan tsunami"
  ],
  keyTerms: [
    "Atmosfera", "Litosfera", "Hidrosfera", "Biosfera", "Kerak bumi", "Mantel",
    "Teras bumi", "Sial", "Sima", "Benua", "Lautan", "Selat", "Plat",
    "Pertembungan", "Pencapahan", "Sesaran", "Hanyutan benua", "Gunung lipat",
    "Gunung bongkah", "Gunung berapi", "Gempa bumi", "Tsunami", "Magma", "Lava"
  ],
  chapterSummary: "Bab 5 merangkumi sistem fizikal Bumi (atmosfera, litosfera, hidrosfera, biosfera), struktur tiga lapisan Bumi (kerak, mantel, teras), tujuh benua dan lima lautan di dunia berserta laut dan selat penting, dan kesan pergerakan kerak bumi termasuk hanyutan benua, gunung lipat, gunung bongkah, gunung berapi, gempa bumi dan tsunami."
};

export default geo5Content;
