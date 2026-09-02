// geo3-content.ts
// Source-verified content for Geography Form 1, Bab 3 — Peta Lakar (Sketch Maps)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 24-33)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface SketchMapCharacteristic {
  num: number;
  name: string;
  description: string;
}

export interface SymbolType {
  type: string;
  description: string;
  examples: string[];
}

export interface Abbreviation {
  short: string;
  full: string;
}

export interface LandscapeFeature {
  category: "fizikal" | "budaya";
  examples: string[];
  groups: { name: string; examples: string[] }[];
}

export interface DrawingStep {
  step: number;
  instruction: string;
}

export interface Geo3Content {
  hook: { title: string; body: string };
  definition: {
    meaning: string;
    purpose: string;
  };
  characteristics: SketchMapCharacteristic[];
  symbols: {
    definition: string;
    types: SymbolType[];
    abbreviations: Abbreviation[];
  };
  landscapes: {
    definition: string;
    physical: LandscapeFeature;
    cultural: LandscapeFeature;
  };
  drawingSteps: DrawingStep[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo3Content: Geo3Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Peta lakar ialah bahasa visual geografi — cara untuk merakam sesuatu kawasan menggunakan simbol yang semua orang faham, tanpa perlu melukis setiap butiran sebenar. Bab ini mengajar anda cara membaca dan melukis peta lakar dengan betul.",
  },
  definition: {
    meaning:
      "Peta lakar ialah gambaran permukaan bumi yang dilukis dari pandangan atas. Peta lakar mewakili kawasan lingkungan yang berskala besar bagi menggambarkan ciri-ciri pandang darat fizikal dan ciri-ciri pandang darat budaya di sesuatu kawasan.",
    purpose:
      "Peta lakar dilukis dengan menggunakan simbol atau singkatan perkataan untuk menggantikan ciri sebenar.",
  },
  characteristics: [
    {
      num: 1,
      name: "Tajuk",
      description: "Nama peta lakar tersebut, biasanya menyatakan kawasan yang dipaparkan",
    },
    { num: 2, name: "Pemidang", description: "Garis sempadan yang membatasi kawasan peta lakar" },
    {
      num: 3,
      name: "Arah mata angin",
      description: "Menunjukkan orientasi peta, biasanya arah Utara",
    },
    {
      num: 4,
      name: "Simbol",
      description: "Lambang yang mewakili ciri-ciri sebenar dalam kawasan tersebut",
    },
    {
      num: 5,
      name: "Petunjuk",
      description: "Senarai yang menerangkan maksud setiap simbol yang digunakan",
    },
  ],
  symbols: {
    definition:
      "Simbol merupakan lambang yang mewakili ciri-ciri dalam peta lakar. Terdapat empat jenis simbol yang biasa digunakan.",
    types: [
      {
        type: "Simbol titik",
        description: "Mewakili tempat, tapak, atau nilai tertentu yang berbentuk titik",
        examples: [
          "Masjid",
          "Kilang",
          "Petempatan",
          "Gereja",
          "Kuil",
          "Tokong",
          "Stesen trigonometri",
          "Tanda tinggi",
          "Tanda aras",
        ],
      },
      {
        type: "Simbol garisan",
        description: "Mewakili ciri geografi yang memanjang atau berbentuk garis",
        examples: [
          "Jalan raya",
          "Jalan kereta api",
          "Benteng",
          "Lorong jalan kaki",
          "Tali air",
          "Sungai",
          "Sempadan",
          "Jambatan",
          "Pantai",
        ],
      },
      {
        type: "Simbol kawasan",
        description: "Mewakili ciri geografi yang meliputi kawasan luas atau bertaburan",
        examples: [
          "Sawah padi",
          "Ladang getah",
          "Ladang kelapa",
          "Ladang kelapa sawit",
          "Hutan",
          "Paya bakau",
          "Nipah",
          "Rumput",
          "Kontur",
        ],
      },
      {
        type: "Singkatan perkataan",
        description: "Perkataan pendek menggantikan nama penuh",
        examples: ["Sek. = Sekolah", "P.P. = Pejabat Pos", "B.P. = Balai Polis", "Ldg. = Ladang"],
      },
    ],
    abbreviations: [
      { short: "Sek.", full: "Sekolah" },
      { short: "P.P.", full: "Pejabat Pos" },
      { short: "B.P.", full: "Balai Polis" },
      { short: "Ldg.", full: "Ladang" },
      { short: "Disp.", full: "Dispensari" },
      { short: "R.R.", full: "Rumah Rehat" },
      { short: "Hosp.", full: "Hospital" },
      { short: "Sg.", full: "Sungai" },
      { short: "Tg.", full: "Tanjung" },
      { short: "K.", full: "Kuala" },
      { short: "Kg.", full: "Kampung" },
      { short: "T.A.", full: "Tali Air" },
      { short: "Pt.", full: "Parit" },
      { short: "A.", full: "Alur" },
      { short: "P.", full: "Pulau" },
      { short: "Tk.", full: "Teluk" },
    ],
  },
  landscapes: {
    definition:
      "Simbol pada peta lakar mewakili pandang darat fizikal dan pandang darat budaya. Pandang darat fizikal ialah ciri-ciri semula jadi manakala pandang darat budaya ialah ciri-ciri buatan manusia.",
    physical: {
      category: "fizikal",
      examples: [
        "Gunung",
        "Bukit",
        "Kontur",
        "Sungai",
        "Tasik",
        "Paya",
        "Hutan",
        "Paya bakau",
        "Nipah",
        "Rumput",
      ],
      groups: [
        { name: "Bentuk muka bumi", examples: ["Gunung", "Bukit", "Kontur"] },
        { name: "Saliran", examples: ["Sungai", "Tasik", "Paya"] },
        {
          name: "Tumbuh-tumbuhan semula jadi",
          examples: ["Hutan", "Paya bakau", "Nipah", "Rumput"],
        },
      ],
    },
    cultural: {
      category: "budaya",
      examples: [
        "Rumah",
        "Kampung",
        "Bangunan",
        "Bandar",
        "Jalan raya",
        "Jalan kereta api",
        "Jambatan",
        "Sawah padi",
        "Getah",
        "Kelapa",
        "Kelapa sawit",
        "Kilang",
        "Sekolah",
        "Hospital",
        "Masjid",
        "Pejabat pos",
        "Dispensari",
      ],
      groups: [
        { name: "Petempatan", examples: ["Rumah", "Kampung", "Bangunan", "Bandar"] },
        {
          name: "Pengangkutan",
          examples: ["Jalan raya", "Jalan kereta api", "Jambatan", "Lorong jalan kaki"],
        },
        {
          name: "Kegiatan ekonomi",
          examples: ["Sawah padi", "Getah", "Kelapa", "Kelapa sawit", "Kilang"],
        },
        {
          name: "Kemudahan sosial",
          examples: ["Sekolah", "Hospital", "Masjid", "Pejabat pos", "Dispensari"],
        },
      ],
    },
  },
  drawingSteps: [
    { step: 1, instruction: "Buat tinjauan di kawasan kajian untuk mengumpul maklumat geografi" },
    { step: 2, instruction: "Tulis tajuk peta lakar serta bina pemidang peta" },
    {
      step: 3,
      instruction: "Pilih simbol titik, garisan, kawasan dan singkatan perkataan yang sesuai",
    },
    {
      step: 4,
      instruction: "Lukis ciri-ciri geografi fizikal dan budaya pada kedudukan yang betul",
    },
    { step: 5, instruction: "Masukkan arah mata angin yang menunjukkan Utara (U)" },
    { step: 6, instruction: "Bina petunjuk di dalam pemidang untuk menerangkan semua simbol" },
  ],
  keyExamFacts: [
    "Peta lakar ialah gambaran permukaan bumi dari pandangan atas, menggunakan simbol menggantikan ciri sebenar",
    "5 ciri peta lakar: tajuk, pemidang, arah mata angin, simbol, petunjuk",
    "4 jenis simbol: simbol titik, simbol garisan, simbol kawasan, singkatan perkataan",
    "Pandang darat fizikal = ciri semula jadi (bentuk muka bumi, saliran, tumbuh-tumbuhan)",
    "Pandang darat budaya = ciri buatan manusia (petempatan, pengangkutan, kegiatan ekonomi)",
    "6 langkah melukis peta lakar: tinjauan → tajuk+pemidang → pilih simbol → lukis ciri → arah Utara → petunjuk",
  ],
  keyTerms: [
    "Peta lakar",
    "Tajuk",
    "Pemidang",
    "Simbol",
    "Petunjuk",
    "Simbol titik",
    "Simbol garisan",
    "Simbol kawasan",
    "Singkatan perkataan",
    "Pandang darat fizikal",
    "Pandang darat budaya",
  ],
  chapterSummary:
    "Bab 3 memperkenalkan peta lakar sebagai gambaran pandangan atas yang menggunakan simbol. Bab ini merangkumi lima ciri peta lakar, empat jenis simbol, perbezaan pandang darat fizikal dengan budaya, serta enam langkah menghasilkan peta lakar lengkap bermula dengan tinjauan kawasan dan berakhir dengan petunjuk.",
};

export default geo3Content;
