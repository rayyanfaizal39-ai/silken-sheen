// geo-chapter11-content.ts
// Source-verified content for Geography Form 1, Bab 11 — Penduduk dan Petempatan di Asia Tenggara
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 120-131)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface CountryPopulation {
  country: string;
  population: string;
}

export interface DensityCategory {
  category: string;
  reason: string;
  examples: string[];
}

export interface UrbanFunction {
  name: string;
  description: string;
  examples: string[];
}

export interface Geo11Content {
  hook: { title: string; body: string };
  overview: {
    definition: string;
    totalPopulation: string;
    percentOfWorld: string;
    asOf: string;
  };
  populationByCountry: CountryPopulation[];
  densityCategories: DensityCategory[];
  urbanFunctions: UrbanFunction[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo11Content: Geo11Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Lebih 640 juta orang tinggal di Asia Tenggara — hampir 9% daripada seluruh populasi dunia. Tetapi seperti Malaysia, taburan ini tidak sekata. Bab ini menunjukkan corak yang sama merentasi seluruh rantau: bandar utama padat, pedalaman jarang, dan setiap bandar besar mempunyai peranannya sendiri."
  },
  overview: {
    definition: "Taburan penduduk merujuk kepada sebaran penduduk di sesuatu kawasan di muka bumi. Taburan penduduk di Asia Tenggara adalah berbeza-beza mengikut kawasan.",
    totalPopulation: "Melebihi 640 juta orang",
    percentOfWorld: "8.62% daripada keseluruhan populasi dunia",
    asOf: "Jun 2016"
  },
  populationByCountry: [
    { country: "Indonesia", population: "260,834,826" },
    { country: "Filipina", population: "102,395,857" },
    { country: "Vietnam", population: "94,528,565" },
    { country: "Thailand", population: "68,164,086" },
    { country: "Myanmar", population: "54,407,086" },
    { country: "Malaysia", population: "30,791,098" },
    { country: "Kemboja", population: "15,850,684" },
    { country: "Laos", population: "6,929,312" },
    { country: "Singapura", population: "5,705,230" },
    { country: "Brunei Darussalam", population: "428,408" },
    { country: "Timor Leste", population: "1,213,743" }
  ],
  densityCategories: [
    {
      category: "Padat",
      reason: "Ibu negara dan bandar utama; sungai sebagai jalan perhubungan; delta dan lembah sungai yang subur; dataran pantai untuk perikanan",
      examples: ["Pantai barat Semenanjung Malaysia", "Pulau Jawa (Indonesia)", "Bangkok (Thailand)"]
    },
    {
      category: "Sederhana",
      reason: "Kawasan pinggir bandar, kawasan bandar baharu, kawasan pertanian",
      examples: ["Pantai timur Semenanjung Malaysia", "Pantai barat Sumatera (Indonesia)", "Pantai Arakan Yoma (Myanmar)", "Pinggir Sungai Mekong (Vietnam)"]
    },
    {
      category: "Jarang",
      reason: "Kawasan pedalaman dengan perhubungan terhad; kawasan pergunungan dan banjaran; kawasan berpaya dan berhutan tebal",
      examples: ["Pedalaman Sarawak dan Sabah (Malaysia)", "Kawasan paya Sumatera Timur (Indonesia)", "Banjaran Annam (Vietnam)"]
    }
  ],
  urbanFunctions: [
    { name: "Ibu Negara dan Pusat Pentadbiran", description: "Kebanyakan bandar utama di Asia Tenggara merupakan ibu negara dan berfungsi sebagai pusat pentadbiran", examples: ["Jakarta (Indonesia)", "Bangkok (Thailand)", "Manila (Filipina)"] },
    { name: "Pusat Perdagangan", description: "Terdapat pusat perniagaan, gedung beli-belah dan aktiviti import dan eksport", examples: ["Bandung dan Surabaya (Indonesia)", "Johor Bahru (Johor)", "Orchard Road (Singapura)"] },
    { name: "Pusat Pelancongan", description: "Bandar utama menjadi daya tarikan pelancong yang datang setiap tahun untuk menikmati panorama bandar", examples: ["Kuala Lumpur (Malaysia)", "Jakarta (Indonesia)", "Bangkok (Thailand)"] },
    { name: "Pusat Perindustrian", description: "Perindustrian ialah sektor sekunder penting dalam pembangunan ekonomi negara; bandar utama menjadi pusat perindustrian", examples: ["Manila (Filipina) — pemasangan kenderaan bermotor dan besi keluli", "Bangkok (Thailand) — elektrik, elektronik, dan industri makanan"] },
    { name: "Pusat Perhubungan dan Pengangkutan", description: "Bandar utama mempunyai rangkaian pengangkutan, Internet dan telekomunikasi yang lengkap", examples: ["Lapangan Terbang Antarabangsa Soekarno-Hatta, Jakarta (Indonesia)", "Lapangan Terbang Antarabangsa Kuala Lumpur (Malaysia)"] }
  ],
  keyExamFacts: [
    "Penduduk Asia Tenggara dianggarkan melebihi 640 juta orang (Jun 2016), iaitu 8.62% populasi dunia",
    "Indonesia mempunyai jumlah penduduk terbesar di Asia Tenggara; Brunei Darussalam terkecil",
    "Taburan penduduk Asia Tenggara terbahagi kepada padat, sederhana, dan jarang",
    "Kawasan padat biasanya di ibu negara, bandar utama, dan lembah sungai subur",
    "Kawasan jarang biasanya di pedalaman, pergunungan, dan kawasan berpaya/berhutan tebal",
    "Bandar utama di Asia Tenggara mempunyai 5 fungsi utama: pentadbiran, perdagangan, pelancongan, perindustrian, perhubungan/pengangkutan"
  ],
  keyTerms: [
    "Taburan penduduk", "Populasi", "Kepadatan padat", "Kepadatan sederhana",
    "Kepadatan jarang", "Ibu negara", "Pusat pentadbiran", "Pusat perdagangan",
    "Pusat pelancongan", "Pusat perindustrian", "Pusat perhubungan dan pengangkutan"
  ],
  chapterSummary: "Bab 11 merangkumi taburan penduduk Asia Tenggara (melebihi 640 juta orang, 8.62% populasi dunia), jumlah penduduk mengikut negara, tiga kategori kepadatan (padat, sederhana, jarang) dengan sebab dan contoh, serta lima fungsi utama bandar-bandar besar di Asia Tenggara — pentadbiran, perdagangan, pelancongan, perindustrian, dan perhubungan/pengangkutan."
};

export default geo11Content;
