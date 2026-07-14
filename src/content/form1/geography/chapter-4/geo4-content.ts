// geo4-content.ts
// Source-verified content for Geography Form 1, Bab 4 — Lakaran Peta Malaysia
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 34-41)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface StateCapital {
  state: string;
  capital: string;
}

export interface Geo4Content {
  hook: { title: string; body: string };
  malaysiaPosition: {
    region: string;
    peninsularBorders: string;
    borneoBorders: string;
    totalStates: number;
    totalFederalTerritories: number;
    federalTerritories: string[];
  };
  stateCapitals: StateCapital[];
  nationalCapital: {
    definition: string;
    kualaLumpurFacts: string[];
    putrajayaFacts: string[];
    putrajayaNameOrigin: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo4Content: Geo4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Boleh anda namakan kesemua 13 negeri Malaysia dan ibu negeri masing-masing? Bab ini membina asas pengetahuan tentang negara sendiri — kedudukan negeri, sempadan antarabangsa, dan pusat pentadbiran yang menjalankan kerajaan."
  },
  malaysiaPosition: {
    region: "Malaysia ialah sebuah negara yang terletak di Asia Tenggara.",
    peninsularBorders: "Semenanjung Malaysia bersempadan dengan negara Thailand di utara dan Singapura di selatan.",
    borneoBorders: "Sabah dan Sarawak terletak di Pulau Borneo, bersempadan dengan Kalimantan (Indonesia) dan Brunei Darussalam.",
    totalStates: 13,
    totalFederalTerritories: 3,
    federalTerritories: ["Kuala Lumpur", "Putrajaya", "Labuan"]
  },
  stateCapitals: [
    { state: "Perlis", capital: "Kangar" },
    { state: "Kedah", capital: "Alor Setar" },
    { state: "Pulau Pinang", capital: "Georgetown" },
    { state: "Perak", capital: "Ipoh" },
    { state: "Selangor", capital: "Shah Alam" },
    { state: "Negeri Sembilan", capital: "Seremban" },
    { state: "Melaka", capital: "Bandaraya Melaka" },
    { state: "Johor", capital: "Johor Bahru" },
    { state: "Pahang", capital: "Kuantan" },
    { state: "Terengganu", capital: "Kuala Terengganu" },
    { state: "Kelantan", capital: "Kota Bharu" },
    { state: "Sabah", capital: "Kota Kinabalu" },
    { state: "Sarawak", capital: "Kuching" }
  ],
  nationalCapital: {
    definition: "Ibu negeri berperanan sebagai pusat pentadbiran bagi sesebuah negeri. Ibu negara pula ialah pusat pentadbiran bagi seluruh negara.",
    kualaLumpurFacts: [
      "Pada tahun 1963, Kuala Lumpur telah diiktiraf sebagai ibu negara Malaysia",
      "Kuala Lumpur berfungsi sebagai pusat pentadbiran negara, pusat perniagaan, kebudayaan dan kewangan"
    ],
    putrajayaFacts: [
      "Pada tahun 2001, Pusat Pentadbiran Kerajaan Persekutuan telah dipindahkan ke Wilayah Persekutuan Putrajaya"
    ],
    putrajayaNameOrigin: "Nama Putrajaya diambil bersempena dengan nama Perdana Menteri Malaysia yang pertama, iaitu Tunku Abdul Rahman Putra Al-Haj."
  },
  keyExamFacts: [
    "Malaysia terletak di Asia Tenggara",
    "Semenanjung Malaysia bersempadan dengan Thailand (utara) dan Singapura (selatan)",
    "Sabah dan Sarawak di Pulau Borneo bersempadan dengan Kalimantan (Indonesia) dan Brunei Darussalam",
    "Malaysia mempunyai 13 buah negeri dan 3 wilayah persekutuan (Kuala Lumpur, Putrajaya, Labuan)",
    "Setiap negeri mempunyai ibu negeri sendiri sebagai pusat pentadbiran negeri",
    "Kuala Lumpur diiktiraf sebagai ibu negara Malaysia pada 1963",
    "Pusat Pentadbiran Kerajaan Persekutuan dipindahkan ke Putrajaya pada 2001",
    "Putrajaya dinamakan sempena Perdana Menteri pertama Malaysia, Tunku Abdul Rahman Putra Al-Haj"
  ],
  keyTerms: [
    "Negeri", "Wilayah persekutuan", "Ibu negeri", "Ibu negara",
    "Pusat Pentadbiran Kerajaan Persekutuan", "Sempadan", "Semenanjung Malaysia"
  ],
  chapterSummary: "Bab 4 merangkumi kedudukan Malaysia di Asia Tenggara, sempadan antarabangsanya, 13 negeri dan 3 wilayah persekutuan, senarai lengkap ibu negeri bagi setiap negeri, serta sejarah dan peranan Kuala Lumpur sebagai ibu negara dan Putrajaya sebagai Pusat Pentadbiran Kerajaan Persekutuan."
};

export default geo4Content;
