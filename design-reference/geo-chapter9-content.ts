// geo-chapter9-content.ts
// Source-verified content for Geography Form 1, Bab 9 — Petempatan di Malaysia
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 96-107)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface SettlementType {
  type: 'bandar' | 'luar bandar';
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
  category: 'ekonomi' | 'sosial' | 'kerajaan';
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
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo9Content: Geo9Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kenapa sesetengah bandar dikenali sebagai bandar pelabuhan, sementara yang lain menjadi bandar teknologi maklumat atau bandar diraja? Bab ini menunjukkan bahawa setiap petempatan mempunyai fungsi tersendiri — dan cara ia disusun bergantung pada bentuk muka bumi dan ekonomi sekelilingnya."
  },
  overview: "Pertambahan jumlah penduduk pada setiap tahun menyebabkan berlakunya perubahan dan pertambahan kawasan kediaman atau petempatan. Petempatan di Malaysia terbahagi kepada dua jenis: petempatan bandar dan petempatan luar bandar.",
  settlementTypes: [
    {
      type: "bandar",
      populationThreshold: "Jumlah penduduk melebihi 10,000 orang",
      characteristics: [
        "Mempunyai kemudahan asas yang pelbagai",
        "Kawasan kediaman berciri moden",
        "Kegiatan ekonomi: perindustrian, perniagaan, pembinaan, pentadbiran, perkhidmatan"
      ]
    },
    {
      type: "luar bandar",
      populationThreshold: "Jumlah penduduk kurang daripada 10,000 orang",
      characteristics: [
        "Kemudahan asas yang minimum",
        "Kawasan kediaman sederhana dan berciri tradisional",
        "Kegiatan ekonomi terhad: pertanian, penternakan, industri desa"
      ]
    }
  ],
  settlementPatterns: [
    {
      name: "Berpusat",
      description: ["Rumah atau bangunan dibina secara rapat di kawasan yang menjadi tumpuan penduduk", "Terdapat di kawasan persimpangan jalan raya atau taman perumahan", "Terdapat kemudahan pusat perniagaan, pelabuhan dan rumah ibadat"],
      examples: ["Bandar Tun Razak, Kuala Lumpur"]
    },
    {
      name: "Berkelompok",
      description: ["Susun atur rumah secara berkelompok dan terancang di sesuatu kawasan"],
      examples: ["Felda Trolak (Perak)", "Felda Air Tawar (Johor)", "Felda Sahabat (Sabah)"]
    },
    {
      name: "Berjajar",
      description: ["Rumah atau bangunan dibina di sepanjang jalan raya dan di tepi pantai", "Kelihatan tersusun secara deretan dan hampir seragam"],
      examples: ["Sepanjang Sungai Rajang (Sarawak)", "Pesisir pantai Kuala Besut (Terengganu)"]
    },
    {
      name: "Berselerak",
      description: ["Rumah dan bangunan dibina secara berselerak dan berjauhan antara satu sama lain", "Kelihatan bertaburan dan tidak seragam"],
      examples: ["Bukit Tinggi (Pahang)", "Kundasang (Sabah)"]
    }
  ],
  urbanFunctions: [
    { name: "Bandar Pelancongan", category: "ekonomi", description: "Terkenal dengan pelbagai aktiviti pelancongan; menawarkan peluang pekerjaan dalam sektor peniagaan dan pelancongan", examples: ["Port Dickson (N.Sembilan)", "Bandaraya Melaka (Melaka)"] },
    { name: "Bandar Pelabuhan", category: "ekonomi", description: "Melibatkan urusan import dan eksport; penduduk terlibat dalam sektor perkapalan dan penguatkuasaan maritim", examples: ["Pasir Gudang (Johor)", "Klang (Selangor)", "Georgetown (P.Pinang)", "Bintulu (Sarawak)", "Teluk Sepanggar (Sabah)"] },
    { name: "Bandar Perlombongan", category: "ekonomi", description: "Berkembang akibat penerokaan sumber mineral; menawarkan peluang pekerjaan dalam perlombongan dan cari gali", examples: ["Bintulu (Sarawak)", "Kerteh (Terengganu) — perlombongan petroleum dan gas asli"] },
    { name: "Bandar Perindustrian", category: "ekonomi", description: "Mempunyai pelbagai kegiatan industri; kebanyakan penduduk bekerja dalam pengeluaran, kejuruteraan dan teknikal", examples: ["Shah Alam (Selangor)", "Perai (P.Pinang)"] },
    { name: "Bandar Teknologi Maklumat", category: "ekonomi", description: "Berperanan mengembangkan teknologi maklumat dan telekomunikasi (ICT)", examples: ["Cyberjaya (Selangor)", "Taman Teknologi Malaysia (Kuala Lumpur)"] },
    { name: "Bandar Diraja", category: "sosial", description: "Bandar tempat terletaknya istana, kediaman rasmi sultan atau raja", examples: ["Pekan (Pahang)", "Kuala Kangsar (Perak)", "Arau (Perlis)"] },
    { name: "Bandar Satelit", category: "sosial", description: "Berperanan sebagai bandar sokongan kepada bandar utama", examples: ["Petaling Jaya (Selangor)", "Senawang (N.Sembilan)"] },
    { name: "Bandar Pendidikan", category: "sosial", description: "Terdapat institusi pendidikan tinggi menawarkan peluang pendidikan dan pekerjaan sebagai pensyarah", examples: ["Universiti Pendidikan Sultan Idris (UPSI), Tanjung Malim, Perak"] },
    { name: "Bandar Pertahanan", category: "kerajaan", description: "Menempatkan pangkalan tentera yang menjadikan bandar berkembang sebagai kawasan petempatan lebih besar", examples: ["Lumut (Perak)", "Port Dickson (N.Sembilan)"] },
    { name: "Bandar Sempadan", category: "kerajaan", description: "Berfungsi sebagai pintu keluar masuk negara; kegiatan pelancongan dan perdagangan yang rancak", examples: ["Rantau Panjang (Kelantan)", "Padang Besar (Perlis)"] },
    { name: "Bandar Pentadbiran", category: "kerajaan", description: "Berfungsi sebagai ibu negeri, ibu negara atau pusat pentadbiran", examples: ["Putrajaya — Pusat Pentadbiran Kerajaan Persekutuan", "Kota Kinabalu, Kuantan, Kangar — ibu negeri"] }
  ],
  ruralFunctions: [
    { category: "Ekonomi", points: ["Pertanian, penternakan, perlombongan dan industri desa", "Pertanian merangkumi penanaman padi, getah, kelapa sawit dan sayur-sayuran", "Penternakan lembu, kambing serta ikan air tawar", "Industri desa — kraftangan dan makanan"] },
    { category: "Sosial", points: ["Kemudahan sosial seperti rumah ibadat, klinik kesihatan, perkhidmatan pos, bekalan air dan elektrik"] },
    { category: "Kerajaan/Governan", points: ["Perkhidmatan pengurusan pentadbiran melalui pejabat penghulu, ketua kampung, tok batin, tuai rumah atau penggawa", "Balai raya berperanan sebagai pusat kegiatan kemasyarakatan"] }
  ],
  keyExamFacts: [
    "Petempatan bandar: penduduk melebihi 10,000 orang; petempatan luar bandar: kurang daripada 10,000 orang",
    "4 pola petempatan di Malaysia: berpusat, berkelompok, berjajar, berselerak",
    "Fungsi petempatan merangkumi 3 aspek: ekonomi, sosial, kerajaan/governan",
    "10 jenis bandar mengikut fungsi: pelancongan, pelabuhan, perlombongan, perindustrian, teknologi maklumat, diraja, satelit, pendidikan, pertahanan, sempadan, pentadbiran",
    "Petempatan luar bandar menjalankan fungsi pentadbiran melalui penghulu, ketua kampung, tok batin, tuai rumah atau penggawa"
  ],
  keyTerms: [
    "Petempatan bandar", "Petempatan luar bandar", "Pola petempatan", "Berpusat",
    "Berkelompok", "Berjajar", "Berselerak", "Fungsi petempatan", "Bandar pelancongan",
    "Bandar pelabuhan", "Bandar perlombongan", "Bandar perindustrian", "Bandar teknologi maklumat",
    "Bandar diraja", "Bandar satelit", "Bandar pendidikan", "Bandar pertahanan",
    "Bandar sempadan", "Bandar pentadbiran", "Penghulu", "Balai raya"
  ],
  chapterSummary: "Bab 9 membezakan petempatan bandar dan luar bandar berdasarkan jumlah penduduk dan kemudahan, merangkumi 4 pola petempatan (berpusat, berkelompok, berjajar, berselerak) dengan contoh sebenar, serta fungsi petempatan bandar (10 jenis mengikut ekonomi, sosial, kerajaan) dan luar bandar (pertanian, penternakan, kemudahan sosial, pentadbiran tempatan)."
};

export default geo9Content;
