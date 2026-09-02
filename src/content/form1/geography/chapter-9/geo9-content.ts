export interface SettlementType {
  type: "bandar" | "luar bandar";
  populationThreshold: string;
  characteristics: string[];
}

export interface SettlementPattern {
  name: string;
  description: string[];
  examples: string[];
}

export interface UrbanFunction {
  name: string;
  category: "ekonomi" | "sosial" | "kerajaan";
  description: string;
  examples: string[];
}

export interface RuralFunction {
  category: string;
  points: string[];
}

export interface Geo9Content {
  hook: { title: string; body: string };
  overview: string;
  settlementTypes: SettlementType[];
  settlementPatterns: SettlementPattern[];
  urbanFunctions: UrbanFunction[];
  ruralFunctions: RuralFunction[];
  ruralDevelopment: { name: string; agency: string; vision: string };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo9Content: Geo9Content = {
  hook: {
    title: "Petempatan berubah bersama penduduk",
    body: "Pertambahan penduduk mengubah dan memperluas kawasan kediaman. Bab ini membantu kita mengenal jenis, pola dan fungsi petempatan yang membentuk ruang kehidupan di Malaysia.",
  },
  overview:
    "Petempatan ialah kawasan kediaman manusia. Di Malaysia, petempatan dibahagikan kepada petempatan bandar dan petempatan luar bandar.",
  settlementTypes: [
    {
      type: "bandar",
      populationThreshold: "Melebihi 10,000 orang",
      characteristics: [
        "Kepadatan penduduk tinggi dengan bangunan komersial dan kediaman moden yang padat",
        "Kemudahan perkhidmatan dan sosial lebih moden, lengkap dan maju",
        "Kegiatan ekonomi: perindustrian, perniagaan, pelancongan, teknologi maklumat dan perkhidmatan",
      ],
    },
    {
      type: "luar bandar",
      populationThreshold: "Kurang daripada 10,000 orang",
      characteristics: [
        "Kepadatan rendah dengan kediaman sederhana, berjarak dan berciri tradisional",
        "Kemudahan perkhidmatan sosial pada tahap minimum",
        "Kegiatan ekonomi primer: pertanian, penternakan, perlombongan dan industri desa",
      ],
    },
  ],
  settlementPatterns: [
    {
      name: "Berpusat",
      description: [
        "Rumah atau bangunan rapat dan padat di kawasan tumpuan",
        "Lazim di persimpangan jalan raya atau taman perumahan",
        "Dilengkapi pusat perniagaan, pelabuhan, rumah ibadat dan kemudahan sosial",
      ],
      examples: ["Bandar Tun Razak (Kuala Lumpur)"],
    },
    {
      name: "Berkelompok",
      description: [
        "Rumah dibina rapat tetapi tersusun dan terancang dalam satu kelompok",
        "Lazim di rancangan pembangunan tanah persekutuan",
      ],
      examples: ["Felda Trolak (Perak)", "Felda Air Tawar (Johor)", "Felda Sahabat (Sabah)"],
    },
    {
      name: "Berjajar",
      description: [
        "Rumah membentuk barisan atau deretan yang hampir seragam",
        "Terletak sepanjang jalan raya, tepi pantai atau tebing sungai",
      ],
      examples: ["Tebing Sungai Rajang (Sarawak)", "Pesisir Kuala Besut (Terengganu)"],
    },
    {
      name: "Berselerak",
      description: [
        "Rumah berjauhan, bertaburan dan tidak mempunyai susun atur seragam",
        "Lazim di kawasan pertanian, kebun getah dan kebun sayur",
      ],
      examples: ["Bukit Tinggi (Pahang)", "Kundasang (Sabah)"],
    },
  ],
  urbanFunctions: [
    {
      name: "Bandar Perindustrian",
      category: "ekonomi",
      description:
        "Pusat kilang dan pembuatan dengan pekerjaan pengeluaran, kejuruteraan dan teknikal.",
      examples: ["Shah Alam (Selangor)", "Perai (Pulau Pinang)"],
    },
    {
      name: "Bandar Pelancongan",
      category: "ekonomi",
      description:
        "Tarikan semula jadi atau buatan menjana pekerjaan perniagaan, perhotelan dan pelancongan.",
      examples: [],
    },
    {
      name: "Bandar Satelit",
      category: "ekonomi",
      description:
        "Bandar sokongan yang menampung limpahan penduduk dan industri dari bandar utama.",
      examples: ["Petaling Jaya (Selangor)", "Senawang (Negeri Sembilan)"],
    },
    {
      name: "Bandar Teknologi Maklumat",
      category: "ekonomi",
      description: "Pusat perkembangan teknologi maklumat dan telekomunikasi negara.",
      examples: ["Cyberjaya (Selangor)", "Taman Teknologi Malaysia (Kuala Lumpur)"],
    },
    {
      name: "Bandar Pelabuhan & Perlombongan",
      category: "ekonomi",
      description:
        "Pusat perdagangan maritim antarabangsa serta penerokaan sumber mineral seperti petroleum dan gas asli.",
      examples: [],
    },
    {
      name: "Bandar Pendidikan",
      category: "sosial",
      description: "Hab atau pusat pengajian tinggi seperti universiti dan kolej antarabangsa.",
      examples: [],
    },
    {
      name: "Bandar Diraja",
      category: "sosial",
      description: "Menempatkan istana atau kediaman rasmi sultan atau raja.",
      examples: ["Pekan (Pahang)", "Kuala Kangsar (Perak)", "Arau (Perlis)"],
    },
    {
      name: "Bandar Pentadbiran",
      category: "kerajaan",
      description:
        "Pusat pentadbiran negeri atau negara yang menempatkan kementerian dan perkhidmatan awam.",
      examples: [
        "Kuala Lumpur — ibu negara",
        "Putrajaya — Pusat Pentadbiran Kerajaan Persekutuan",
        "Kota Kinabalu, Kuantan dan Kangar — ibu negeri",
      ],
    },
    {
      name: "Bandar Sempadan",
      category: "kerajaan",
      description:
        "Pintu keluar masuk negara dengan kawalan keselamatan, kastam dan perdagangan rentas sempadan.",
      examples: ["Rantau Panjang (Kelantan)", "Padang Besar (Perlis)"],
    },
  ],
  ruralFunctions: [
    {
      category: "Ekonomi",
      points: [
        "Mengeluarkan makanan dan bahan mentah seperti padi, sayur-sayuran, getah, kelapa sawit dan kayu balak",
        "Penternakan dan akuakultur membekalkan daging serta ikan air tawar",
        "Petempatan nelayan membekalkan hasil laut",
        "Industri desa atau IKS menghasilkan kraf tangan dan makanan tradisional; Kuala Kangsar terkenal dengan Labu Sayong",
      ],
    },
    {
      category: "Sosial",
      points: [
        "Kediaman tradisional dengan semangat kemasyarakatan yang kuat",
        "Kemudahan asas termasuk sekolah rendah, klinik desa, rumah ibadat dan balai raya",
      ],
    },
    {
      category: "Kerajaan/Governan",
      points: [
        "Kebajikan dan urusan kampung diurus oleh penghulu, ketua kampung atau JKKK",
        "Balai polis komuniti atau pondok polis membantu menjaga keselamatan tempatan",
      ],
    },
  ],
  ruralDevelopment: {
    name: "Pelan Induk Pembangunan Luar Bandar (PIPLB)",
    agency: "Kementerian Kemajuan Luar Bandar dan Wilayah",
    vision:
      "Membangunkan ekonomi luar bandar yang berdaya maju, masyarakat sejahtera dan persekitaran lestari.",
  },
  keyExamFacts: [
    "Bandar mempunyai lebih 10,000 orang; luar bandar mempunyai kurang 10,000 orang",
    "Empat pola petempatan ialah berpusat, berkelompok, berjajar dan berselerak",
    "Fungsi petempatan merangkumi aspek ekonomi, sosial dan kerajaan atau governan",
    "Bandar Satelit ialah fungsi ekonomi yang menyokong bandar utama",
    "Pentadbiran luar bandar berlaku di peringkat akar umbi melalui penghulu, ketua kampung atau JKKK",
  ],
  keyTerms: [
    "Petempatan bandar",
    "Petempatan luar bandar",
    "Pola petempatan",
    "Berpusat",
    "Berkelompok",
    "Berjajar",
    "Berselerak",
    "Fungsi ekonomi",
    "Fungsi sosial",
    "Fungsi governan",
    "PIPLB",
    "JKKK",
  ],
  chapterSummary:
    "Bab 9 membezakan petempatan bandar dan luar bandar berdasarkan jumlah penduduk, landskap, kemudahan dan kegiatan ekonomi. Empat pola petempatan ialah berpusat, berkelompok, berjajar dan berselerak. Setiap petempatan menjalankan fungsi ekonomi, sosial dan kerajaan atau governan yang saling melengkapi.",
};

export default geo9Content;
