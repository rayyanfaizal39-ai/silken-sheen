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

export interface CityProfile {
  city: string;
  country: string;
  population: string;
  facts: string[];
}

export interface Geo11Content {
  hook: { title: string; body: string };
  overview: {
    definition: string;
    totalPopulation: string;
    percentOfWorld: string;
    asOf: string;
    regionArea: string;
  };
  populationByCountry: CountryPopulation[];
  densityCategories: DensityCategory[];
  transmigration: { purpose: string; movement: string };
  urbanFunctions: UrbanFunction[];
  cityProfiles: CityProfile[];
  capitals: Array<{ country: string; capital: string }>;
  urbanChallenges: { problems: string[]; solutions: string[] };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo11Content: Geo11Content = {
  hook: {
    title: "Penduduk membentuk bandar dan rantau",
    body: "Lebih 640 juta orang tinggal di Asia Tenggara, tetapi mereka tidak tersebar secara sekata. Bentuk muka bumi, peluang ekonomi dan jaringan perhubungan menentukan kawasan tumpuan serta fungsi bandar utama.",
  },
  overview: {
    definition:
      "Taburan penduduk merujuk kepada sebaran penduduk di sesuatu kawasan. Taburan penduduk Asia Tenggara berbeza-beza mengikut lokasi.",
    totalPopulation: "Melebihi 640 juta orang",
    percentOfWorld: "8.62% daripada populasi dunia",
    asOf: "Jun 2016",
    regionArea: "4 506 600 km²",
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
    { country: "Timor Leste", population: "1,213,743" },
    { country: "Brunei Darussalam", population: "428,408" },
  ],
  densityCategories: [
    {
      category: "Padat",
      reason:
        "Ibu negara, bandar raya utama, lembah dan delta sungai yang subur, dataran pantai serta kawasan berketersampaian tinggi.",
      examples: [
        "Pulau Jawa (Indonesia) — kira-kira 60% penduduk Indonesia",
        "Pantai barat Semenanjung Malaysia",
        "Bangkok, Manila dan Jakarta",
        "Delta Mekong, Delta Irrawaddy dan Lembah Menam Chao Phraya",
      ],
    },
    {
      category: "Sederhana Padat",
      reason:
        "Kawasan pertanian, pinggir bandar, bandar baharu dan lembangan sungai yang kurang sesak.",
      examples: [
        "Pantai timur Semenanjung Malaysia",
        "Pantai barat Sumatera (Indonesia)",
        "Pantai Arakan Yoma (Myanmar)",
        "Pinggir Sungai Mekong (Vietnam)",
      ],
    },
    {
      category: "Jarang",
      reason:
        "Pedalaman, pergunungan, banjaran, kawasan berpaya dan hutan tebal dengan kemudahan perhubungan terhad.",
      examples: [
        "Pedalaman Sabah dan Sarawak (Malaysia)",
        "Kawasan paya Sumatera Timur (Indonesia)",
        "Banjaran Annam (Vietnam)",
      ],
    },
  ],
  transmigration: {
    purpose: "Mengurangkan kepadatan penduduk yang terlalu tinggi di Pulau Jawa.",
    movement: "Memindahkan sebahagian penduduk ke pulau lain di Indonesia yang kurang padat.",
  },
  urbanFunctions: [
    {
      name: "Ibu Negara & Pusat Pentadbiran",
      description: "Menjadi pusat pemerintahan dan pentadbiran kerajaan.",
      examples: ["Jakarta", "Bangkok", "Manila", "Kuala Lumpur"],
    },
    {
      name: "Pusat Perdagangan & Kewangan",
      description: "Mengurus import, eksport, pelaburan dan perniagaan antarabangsa.",
      examples: ["Singapura", "Jakarta", "Kuala Lumpur"],
    },
    {
      name: "Pusat Perindustrian",
      description:
        "Menumpukan kegiatan pembuatan kerana infrastruktur dan tenaga kerja yang ramai.",
      examples: [
        "Manila — pemasangan kenderaan dan besi keluli",
        "Bangkok — elektrik, elektronik dan makanan",
        "Kuala Lumpur — perindustrian dan perdagangan",
      ],
    },
    {
      name: "Pusat Pelancongan",
      description: "Menawarkan tarikan panorama, budaya dan sejarah.",
      examples: ["Kuala Lumpur", "Jakarta", "Bangkok — Pasar Terapung"],
    },
    {
      name: "Pusat Perhubungan & Pengangkutan",
      description:
        "Menjadi pintu masuk dan hab udara, laut serta darat dengan telekomunikasi lengkap.",
      examples: ["KLIA (Malaysia)", "Lapangan Terbang Soekarno-Hatta (Jakarta)"],
    },
  ],
  cityProfiles: [
    {
      city: "Kuala Lumpur",
      country: "Malaysia",
      population: "1.76 juta",
      facts: [
        "Pertemuan Sungai Klang dan Sungai Gombak",
        "Metropolitan terbesar di Malaysia",
        "Pusat perindustrian, perdagangan, pendidikan dan ibu negara",
      ],
    },
    {
      city: "Jakarta",
      country: "Indonesia",
      population: "10.4 juta",
      facts: [
        "Muara Sungai Tjiliwung di Pulau Jawa",
        "Metropolitan terbesar di Indonesia",
        "Pusat ekonomi, pendidikan, perdagangan dan ibu negara",
      ],
    },
    {
      city: "Bangkok",
      country: "Thailand",
      population: "9.44 juta",
      facts: [
        "Timur tebing Menam Chao Phraya",
        "Digelar Venice Timur",
        "Ibu negara, pusat ekonomi dan pelabuhan",
      ],
    },
    {
      city: "Manila",
      country: "Filipina",
      population: "13.1 juta",
      facts: [
        "Timur Teluk Manila di Pulau Luzon",
        "Bandar raya kosmopolitan",
        "Pusat ekonomi utama dan ibu negara",
      ],
    },
    {
      city: "Singapura",
      country: "Singapura",
      population: "5.70 juta",
      facts: [
        "Selatan Semenanjung Malaysia, dipisahkan oleh Selat Tebrau",
        "Metropolitan dan pelabuhan penting dunia",
        "Pusat kewangan dan perdagangan antarabangsa",
      ],
    },
  ],
  capitals: [
    { country: "Malaysia", capital: "Kuala Lumpur" },
    { country: "Indonesia", capital: "Jakarta" },
    { country: "Filipina", capital: "Manila" },
    { country: "Thailand", capital: "Bangkok" },
    { country: "Vietnam", capital: "Hanoi" },
    { country: "Myanmar", capital: "Naypyidaw" },
    { country: "Laos", capital: "Vientiane" },
    { country: "Kemboja", capital: "Phnom Penh" },
    { country: "Brunei Darussalam", capital: "Bandar Seri Begawan" },
    { country: "Singapura", capital: "Bandar Raya Singapura" },
    { country: "Timor Leste", capital: "Dili" },
  ],
  urbanChallenges: {
    problems: ["Kekurangan tanah", "Kesesakan petempatan", "Masalah setinggan"],
    solutions: [
      "Membina petempatan terancang dan mampu milik",
      "Menyediakan kemudahan asas yang lengkap",
      "Memberi bantuan perumahan kepada penduduk setinggan",
      "Membina bandar baharu untuk menyuraikan kepadatan",
    ],
  },
  keyExamFacts: [
    "Penduduk Asia Tenggara melebihi 640 juta orang pada Jun 2016",
    "Indonesia mempunyai penduduk paling ramai; Brunei Darussalam paling sedikit",
    "Pulau Jawa menempatkan kira-kira 60% penduduk Indonesia",
    "Taburan penduduk terbahagi kepada padat, sederhana padat dan jarang",
    "Lima fungsi bandar ialah pentadbiran, perdagangan dan kewangan, perindustrian, pelancongan serta perhubungan dan pengangkutan",
    "Transmigrasi memindahkan penduduk Jawa ke pulau lain yang kurang padat",
  ],
  keyTerms: [
    "Taburan penduduk",
    "Populasi",
    "Padat",
    "Sederhana padat",
    "Jarang",
    "Transmigrasi",
    "Bandar metropolitan",
    "Bandar kosmopolitan",
    "Setinggan",
    "Bandar baharu",
  ],
  chapterSummary:
    "Bab 11 menerangkan taburan dan jumlah penduduk Asia Tenggara, tiga kategori tumpuan penduduk serta fungsi bandar utama. Profil bandar, ibu negara dan langkah mengatasi kesesakan menunjukkan hubungan antara pertumbuhan penduduk dengan pembangunan petempatan.",
};

export default geo11Content;
