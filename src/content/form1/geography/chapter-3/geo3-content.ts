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
  category: 'fizikal' | 'budaya';
  examples: string[];
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
    body: "Peta lakar ialah bahasa visual geografi — cara untuk merakam sesuatu kawasan menggunakan simbol yang semua orang faham, tanpa perlu melukis setiap butiran sebenar. Bab ini mengajar anda cara membaca dan melukis peta lakar dengan betul."
  },
  definition: {
    meaning: "Peta lakar ialah gambaran permukaan bumi yang dilukis dari pandangan atas. Peta lakar mewakili kawasan lingkungan yang berskala besar bagi menggambarkan ciri-ciri pandang darat fizikal dan ciri-ciri pandang darat budaya di sesuatu kawasan.",
    purpose: "Peta lakar dilukis dengan menggunakan simbol atau singkatan perkataan untuk menggantikan ciri sebenar."
  },
  characteristics: [
    { num: 1, name: "Tajuk", description: "Nama peta lakar tersebut, biasanya menyatakan kawasan yang dipaparkan" },
    { num: 2, name: "Pemidang", description: "Garis sempadan yang membatasi kawasan peta lakar" },
    { num: 3, name: "Arah mata angin", description: "Menunjukkan orientasi peta, biasanya arah Utara" },
    { num: 4, name: "Simbol", description: "Lambang yang mewakili ciri-ciri sebenar dalam kawasan tersebut" },
    { num: 5, name: "Petunjuk", description: "Senarai yang menerangkan maksud setiap simbol yang digunakan" }
  ],
  symbols: {
    definition: "Simbol merupakan lambang yang mewakili ciri-ciri dalam peta lakar. Terdapat empat jenis simbol yang biasa digunakan.",
    types: [
      { type: "Simbol titik", description: "Mewakili tempat atau tapak tertentu", examples: ["Masjid", "Kilang", "Petempatan", "Kuil", "Gereja", "Tokong"] },
      { type: "Simbol garisan", description: "Mewakili ciri-ciri yang berbentuk garis", examples: ["Jalan raya", "Jalan kereta api", "Sungai", "Sempadan", "Tali air", "Lorong jalan kaki"] },
      { type: "Simbol kawasan", description: "Mewakili kawasan tertentu", examples: ["Sawah padi", "Ladang getah", "Hutan", "Paya bakau", "Kelapa sawit", "Rumput"] },
      { type: "Singkatan perkataan", description: "Perkataan pendek menggantikan nama penuh", examples: ["Sek. = Sekolah", "P.P. = Pejabat Pos", "B.P. = Balai Polis", "Ldg. = Ladang"] }
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
      { short: "Tk.", full: "Teluk" }
    ]
  },
  landscapes: {
    definition: "Simbol pada peta lakar mewakili pandang darat fizikal dan pandang darat budaya. Pandang darat fizikal ialah ciri-ciri semula jadi manakala pandang darat budaya ialah ciri-ciri buatan manusia.",
    physical: { category: "fizikal", examples: ["Bentuk muka bumi", "Saliran", "Tumbuh-tumbuhan semula jadi", "Hutan", "Paya bakau", "Sungai", "Gunung", "Tasik", "Kontur", "Nipah", "Rumput"] },
    cultural: { category: "budaya", examples: ["Petempatan", "Pengangkutan", "Kegiatan ekonomi", "Kilang", "Jalan raya", "Sawah padi", "Sekolah", "Jambatan", "Kelapa", "Kelapa sawit", "Getah"] }
  },
  drawingSteps: [
    { step: 1, instruction: "Tulis tajuk peta lakar serta lukis pemidang peta" },
    { step: 2, instruction: "Masukkan arah mata angin" },
    { step: 3, instruction: "Pilih simbol dan singkatan perkataan yang sesuai" },
    { step: 4, instruction: "Lukis ciri-ciri geografi dengan menggunakan simbol dan singkatan perkataan yang sesuai" },
    { step: 5, instruction: "Lukis petunjuk" }
  ],
  keyExamFacts: [
    "Peta lakar ialah gambaran permukaan bumi dari pandangan atas, menggunakan simbol menggantikan ciri sebenar",
    "5 ciri peta lakar: tajuk, pemidang, arah mata angin, simbol, petunjuk",
    "4 jenis simbol: simbol titik, simbol garisan, simbol kawasan, singkatan perkataan",
    "Pandang darat fizikal = ciri semula jadi (bentuk muka bumi, saliran, tumbuh-tumbuhan)",
    "Pandang darat budaya = ciri buatan manusia (petempatan, pengangkutan, kegiatan ekonomi)",
    "5 langkah melukis peta lakar: tajuk+pemidang → arah mata angin → simbol → ciri geografi → petunjuk"
  ],
  keyTerms: [
    "Peta lakar", "Tajuk", "Pemidang", "Simbol", "Petunjuk", "Simbol titik",
    "Simbol garisan", "Simbol kawasan", "Singkatan perkataan", "Pandang darat fizikal",
    "Pandang darat budaya"
  ],
  chapterSummary: "Bab 3 memperkenalkan peta lakar — gambaran permukaan bumi dari atas menggunakan simbol. Merangkumi 5 ciri peta lakar, 4 jenis simbol (titik, garisan, kawasan, singkatan perkataan), perbezaan antara pandang darat fizikal dan budaya, serta 5 langkah untuk melukis peta lakar yang lengkap."
};

export default geo3Content;
