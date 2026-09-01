// Content for Geography Form 1, Bab 4 — Lakaran Peta Malaysia.
// Geography has no official DLP/English textbook — BM only.

export interface StateCapital {
  state: string;
  capital: string;
  region: "Semenanjung Malaysia" | "Pulau Borneo";
}

export interface MalaysiaMapStep {
  step: number;
  title: string;
  instruction: string;
}

export interface Geo4Content {
  hook: { title: string; body: string };
  malaysiaPosition: {
    region: string;
    peninsularBorders: string;
    borneoBorders: string;
    seaDivision: string;
    totalStates: number;
    totalFederalTerritories: number;
    federalTerritories: string[];
    peninsularStates: string[];
    borneoStates: string[];
  };
  stateCapitals: StateCapital[];
  nationalCapital: {
    definition: string;
    kualaLumpurFacts: string[];
    putrajayaFacts: string[];
    putrajayaNameOrigin: string;
  };
  mapDrawing: {
    introduction: string;
    steps: MalaysiaMapStep[];
    requiredElements: string[];
  };
  jupemFact: string;
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo4Content: Geo4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Boleh anda namakan kesemua 13 negeri Malaysia dan ibu negeri masing-masing? Bab ini membina asas pengetahuan tentang negara sendiri — kedudukan negeri, sempadan antarabangsa, pusat pentadbiran dan cara melakar peta Malaysia.",
  },
  malaysiaPosition: {
    region: "Malaysia ialah sebuah negara yang terletak di Asia Tenggara.",
    peninsularBorders:
      "Semenanjung Malaysia bersempadan dengan negara Thailand di utara dan Singapura di selatan.",
    borneoBorders:
      "Sabah dan Sarawak terletak di Pulau Borneo, bersempadan dengan Kalimantan (Indonesia) dan Brunei Darussalam.",
    seaDivision: "Semenanjung Malaysia dan Sabah serta Sarawak dipisahkan oleh Laut China Selatan.",
    totalStates: 13,
    totalFederalTerritories: 3,
    federalTerritories: ["Kuala Lumpur", "Putrajaya", "Labuan"],
    peninsularStates: [
      "Perlis",
      "Kedah",
      "Pulau Pinang",
      "Perak",
      "Selangor",
      "Negeri Sembilan",
      "Melaka",
      "Johor",
      "Pahang",
      "Terengganu",
      "Kelantan",
    ],
    borneoStates: ["Sabah", "Sarawak"],
  },
  stateCapitals: [
    { state: "Perlis", capital: "Kangar", region: "Semenanjung Malaysia" },
    { state: "Kedah", capital: "Alor Setar", region: "Semenanjung Malaysia" },
    { state: "Pulau Pinang", capital: "Georgetown", region: "Semenanjung Malaysia" },
    { state: "Perak", capital: "Ipoh", region: "Semenanjung Malaysia" },
    { state: "Selangor", capital: "Shah Alam", region: "Semenanjung Malaysia" },
    { state: "Negeri Sembilan", capital: "Seremban", region: "Semenanjung Malaysia" },
    { state: "Melaka", capital: "Bandaraya Melaka", region: "Semenanjung Malaysia" },
    { state: "Johor", capital: "Johor Bahru", region: "Semenanjung Malaysia" },
    { state: "Pahang", capital: "Kuantan", region: "Semenanjung Malaysia" },
    { state: "Terengganu", capital: "Kuala Terengganu", region: "Semenanjung Malaysia" },
    { state: "Kelantan", capital: "Kota Bharu", region: "Semenanjung Malaysia" },
    { state: "Sabah", capital: "Kota Kinabalu", region: "Pulau Borneo" },
    { state: "Sarawak", capital: "Kuching", region: "Pulau Borneo" },
  ],
  nationalCapital: {
    definition:
      "Ibu negeri berperanan sebagai pusat pentadbiran bagi sesebuah negeri. Ibu negara pula ialah pusat pentadbiran bagi seluruh negara.",
    kualaLumpurFacts: [
      "Pada tahun 1963, Kuala Lumpur telah diiktiraf sebagai ibu negara Malaysia.",
      "Kuala Lumpur berfungsi sebagai pusat pentadbiran negara, pusat perniagaan, kebudayaan dan kewangan.",
    ],
    putrajayaFacts: [
      "Pada tahun 2001, Pusat Pentadbiran Kerajaan Persekutuan telah dipindahkan ke Wilayah Persekutuan Putrajaya.",
    ],
    putrajayaNameOrigin:
      "Nama Putrajaya diambil bersempena dengan nama Perdana Menteri Malaysia yang pertama, iaitu Tunku Abdul Rahman Putra Al-Haj.",
  },
  mapDrawing: {
    introduction:
      "Lakaran peta Malaysia perlu berpandukan peta sebenar seperti peta JUPEM atau atlas supaya bentuk, imbangan dan kedudukan geografinya tepat.",
    steps: [
      {
        step: 1,
        title: "Sediakan grid",
        instruction:
          "Lukis pemidang dan grid yang sesuai supaya Semenanjung Malaysia, Sabah dan Sarawak seimbang.",
      },
      {
        step: 2,
        title: "Lakar garis pantai",
        instruction:
          "Lakar bentuk luar Semenanjung Malaysia di barat, kemudian Sabah dan Sarawak di timur.",
      },
      {
        step: 3,
        title: "Masukkan sempadan negeri",
        instruction: "Lukis garisan sempadan yang membahagikan kesemua 13 buah negeri.",
      },
      {
        step: 4,
        title: "Tandakan pusat penting",
        instruction:
          "Gunakan simbol titik untuk ibu negeri, Kuala Lumpur dan Putrajaya pada kedudukan yang betul.",
      },
      {
        step: 5,
        title: "Lengkapkan ciri peta",
        instruction: "Masukkan tajuk, arah Utara, petunjuk dan pemidang peta.",
      },
    ],
    requiredElements: ["Tajuk peta", "Arah Utara", "Petunjuk peta", "Pemidang peta"],
  },
  jupemFact:
    "JUPEM ialah Jabatan Ukur dan Pemetaan Malaysia. Jabatan ini menjalankan kerja pengukuran dan pemetaan serta menjadi penasihat kerajaan dalam bidang tersebut.",
  keyExamFacts: [
    "Malaysia terletak di Asia Tenggara.",
    "Semenanjung Malaysia bersempadan dengan Thailand di utara dan Singapura di selatan.",
    "Sabah dan Sarawak di Pulau Borneo bersempadan dengan Kalimantan (Indonesia) dan Brunei Darussalam.",
    "Malaysia mempunyai 13 buah negeri dan 3 Wilayah Persekutuan: Kuala Lumpur, Putrajaya dan Labuan.",
    "Setiap negeri mempunyai ibu negeri sendiri sebagai pusat pentadbiran negeri.",
    "Kuala Lumpur diiktiraf sebagai ibu negara Malaysia pada tahun 1963.",
    "Pusat Pentadbiran Kerajaan Persekutuan dipindahkan ke Putrajaya pada tahun 2001.",
    "Putrajaya dinamakan bersempena dengan Tunku Abdul Rahman Putra Al-Haj.",
    "Lakaran peta Malaysia mesti dilengkapi tajuk, arah Utara, petunjuk dan pemidang.",
  ],
  keyTerms: [
    "Negeri",
    "Wilayah Persekutuan",
    "Ibu negeri",
    "Ibu negara",
    "Pusat Pentadbiran Kerajaan Persekutuan",
    "Sempadan",
    "Semenanjung Malaysia",
    "JUPEM",
  ],
  chapterSummary:
    "Bab 4 merangkumi kedudukan Malaysia di Asia Tenggara, sempadan antarabangsanya, 13 negeri dan 3 Wilayah Persekutuan, senarai lengkap ibu negeri, peranan Kuala Lumpur dan Putrajaya, serta langkah melakar peta Malaysia dengan ciri peta yang lengkap.",
};

export default geo4Content;
