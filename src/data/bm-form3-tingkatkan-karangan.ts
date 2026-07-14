export type BMForm3TingkatkanKaranganSectionId =
  | "asas-formula"
  | "teknik-menjawab"
  | "contoh-latihan";

export interface BMForm3TingkatkanKaranganSection {
  id: BMForm3TingkatkanKaranganSectionId;
  folderTitle: "Asas & Formula" | "Teknik Menjawab" | "Contoh & Latihan";
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS: BMForm3TingkatkanKaranganSection[] = [
  {
    id: "asas-formula",
    folderTitle: "Asas & Formula",
    lessonTitle: "Rahsia Karangan Matang Tingkatan 3",
    description: "Kuasai ayat gramatis, formula I-H-C-P dan penutup R-C-H.",
  },
  {
    id: "teknik-menjawab",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Teknik Eskalasi Penulisan Cemerlang",
    description: "Hubungkan idea dengan 5W1H, penanda wacana dan bahasa yang matang.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Galeri Transformasi Ayat & Praktis Intensif",
    description: "Teliti transformasi ayat dan kukuhkan kemahiran melalui latihan.",
  },
];

export const TINGKATKAN_ASAS_OBJECTIVES = [
  "Membezakan ayat biasa dengan ayat matang",
  "Menguasai formula I-H-C-P",
  "Membina huraian yang gramatis",
  "Menghasilkan penutup menggunakan formula R-C-H",
  "Meningkatkan kematangan penulisan",
];

export const TINGKATKAN_ASAS_STEPS = [
  "Analisis tugasan dengan mengenal pasti tema dan kehendak soalan.",
  "Bina ayat gramatis yang mempunyai subjek dan predikat lengkap.",
  "Gunakan ayat majmuk untuk menunjukkan kematangan bahasa.",
  "Pilih kosa kata yang lebih tepat dan luas.",
  "Semak semula tatabahasa, ejaan dan struktur ayat.",
];

export const TINGKATKAN_IHCP_ROWS = [
  ["I (Isi)", "Fokus kepada satu idea utama setiap perenggan."],
  ["H (Huraian)", "Jelaskan mengapa dan bagaimana menggunakan teknik 5W1H."],
  ["C (Contoh)", "Berikan contoh atau situasi sebenar yang relevan."],
  ["P (Penegasan)", "Rumuskan isi dengan ayat penegas yang kukuh."],
];

export const TINGKATKAN_RCH_ROWS = [
  ["R (Rumusan)", "Rumuskan keseluruhan karangan."],
  ["C (Cadangan)", "Berikan cadangan yang membina."],
  ["H (Harapan)", "Nyatakan harapan untuk masa hadapan."],
];

export const TINGKATKAN_ASAS_MISTAKES = [
  "Ayat tergantung tanpa subjek atau predikat.",
  "Kesalahan struktur songsang yang mengelirukan pembaca.",
  "Penggunaan kosa kata yang berulang.",
];

export const TINGKATKAN_ASAS_CHECKLIST = [
  "Adakah ayat mempunyai subjek dan predikat?",
  "Adakah saya menggunakan ayat majmuk?",
  "Adakah kosa kata yang digunakan pelbagai?",
  "Adakah setiap perenggan menggunakan I-H-C-P?",
];

export const TINGKATKAN_TEKNIK_OBJECTIVES = [
  "Menghasilkan pendahuluan yang menarik",
  "Menghuraikan isi menggunakan teknik 5W1H",
  "Menghubungkan perenggan dengan baik",
  "Menggunakan bahasa yang gramatis dan matang",
];

export const TINGKATKAN_TEKNIK_STEPS = [
  "Mulakan pendahuluan dengan definisi atau isu semasa.",
  "Gunakan teknik 5W1H untuk mengembangkan isi.",
  "Hubungkan idea menggunakan penanda wacana yang sesuai.",
  "Sisipkan peribahasa secara semula jadi.",
  "Semak ejaan, tanda baca dan tatabahasa sebelum menghantar jawapan.",
];

export const TINGKATKAN_TEKNIK_GROUPS = [
  {
    title: "Pendahuluan Menarik",
    items: ["Definisi isu", "Statistik ringkas", "Peribahasa", "Kata hikmat"],
  },
  {
    title: "Mengembangkan Isi — 5W1H",
    items: ["Apa", "Mengapa", "Bagaimana", "Siapa", "Bila", "Di mana"],
  },
  {
    title: "Penanda Wacana",
    items: [
      "Antaranya",
      "Di samping itu",
      "Sehubungan dengan itu",
      "Lantaran itu",
      "Dalam pada itu",
    ],
  },
  {
    title: "Estetik Bahasa",
    items: ["Peribahasa", "Ungkapan menarik", "Ayat majmuk", "Sinonim"],
  },
];

export const TINGKATKAN_TEKNIK_MISTAKES = [
  "Menggunakan bahasa pasar.",
  "Menggunakan singkatan.",
  "Kesalahan ejaan kata nama khas.",
  "Penanda wacana digunakan secara berulang.",
];

export const TINGKATKAN_TRANSFORMATIONS = [
  [
    "Kita mesti menjaga alam sekitar supaya udara bersih.",
    "Setiap individu seyogianya melestarikan alam sekitar agar kualiti udara sentiasa terpelihara demi kesejahteraan ummah.",
  ],
  [
    "Sampah banyak menyebabkan pencemaran air.",
    "Pembuangan sisa domestik secara tidak terancang merupakan polemik utama yang menjejaskan ekosistem akuatik.",
  ],
];

export const TINGKATKAN_PENANDA_GROUPS = [
  {
    title: "Memulakan Isi",
    items: ["Antaranya", "Di samping itu", "Sehubungan dengan itu"],
  },
  {
    title: "Menghuraikan Contoh",
    items: ["Tamsilnya", "Sebagai bukti", "Hal ini dapat dilihat menerusi"],
  },
  {
    title: "Peribahasa",
    items: ["Bagai aur dengan tebing", "Sediakan payung sebelum hujan"],
  },
];

export const TINGKATKAN_LATIHAN_MISTAKES = [
  "Ayat terlalu pendek.",
  "Huraian tidak berkembang.",
  "Contoh tidak relevan.",
  "Peribahasa digunakan tanpa kaitan dengan isi.",
];

export const TINGKATKAN_LATIHAN_CHECKLIST = [
  "Saya menggunakan ayat majmuk.",
  "Saya menggunakan I-H-C-P.",
  "Saya menggunakan penanda wacana yang pelbagai.",
  "Saya menggunakan kosa kata yang matang.",
  "Saya menyemak ejaan dan tanda baca.",
];
