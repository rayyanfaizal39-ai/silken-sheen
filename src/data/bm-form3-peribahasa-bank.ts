export type BMForm3PeribahasaSectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

export interface BMForm3PeribahasaSection {
  id: BMForm3PeribahasaSectionId;
  folderTitle: "Asas & Formula" | "Teknik Menjawab" | "Contoh & Latihan";
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_PERIBAHASA_SECTIONS: BMForm3PeribahasaSection[] = [
  {
    id: "asas-formula",
    folderTitle: "Asas & Formula",
    lessonTitle: "Asas Penggunaan Peribahasa Tingkatan 3",
    description: "Fahami jenis, maksud dan pemilihan peribahasa mengikut tema serta konteks.",
  },
  {
    id: "teknik-menjawab",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Teknik Menggunakan Peribahasa Dalam Karangan",
    description: "Sisipkan peribahasa secara gramatis dalam pendahuluan, isi dan penutup.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Bank Peribahasa Mengikut Tema Tingkatan 3",
    description: "Kuasai maksud, contoh ayat dan penggunaan melalui latihan bertema.",
  },
];

export const PERIBAHASA_ASAS_OBJECTIVES = [
  "Memahami maksud peribahasa",
  "Membezakan jenis-jenis peribahasa",
  "Memilih peribahasa mengikut tema",
  "Menggunakan peribahasa dalam karangan secara gramatis",
  "Meningkatkan nilai bahasa dan estetik penulisan",
];

export const PERIBAHASA_ASAS_STEPS = [
  {
    title: "Fahami Maksud",
    text: "Jangan menghafal perkataan sahaja. Pastikan maksud sebenar peribahasa difahami.",
    items: ["maksud sebenar", "bukan hafalan semata-mata"],
  },
  {
    title: "Kenal Pasti Tema",
    text: "Tentukan tema karangan sebelum mencari peribahasa yang sesuai.",
    items: [
      "Pendidikan",
      "Keluarga",
      "Perpaduan",
      "Alam Sekitar",
      "Kesihatan",
      "Teknologi",
      "Keselamatan Siber",
      "Kerajinan",
      "Persahabatan",
    ],
  },
  {
    title: "Pilih Peribahasa yang Tepat",
    text: "Pastikan maksud peribahasa benar-benar menyokong isi yang hendak dihuraikan.",
    items: ["selari dengan tema", "menyokong isi"],
  },
  {
    title: "Gunakan Dalam Ayat",
    text: "Masukkan peribahasa secara semula jadi pada bahagian yang sesuai.",
    items: ["pendahuluan", "huraian", "penutup"],
  },
  {
    title: "Semak Semula",
    text: "Semak ejaan, susunan kata dan ketepatan maksud sebelum menyiapkan jawapan.",
    items: ["ejaan tepat", "susunan tidak berubah", "maksud tidak tersasar"],
  },
];

export const PERIBAHASA_TYPE_ROWS = [
  ["Pepatah", "Nasihat atau pedoman hidup"],
  ["Bidalan", "Sindiran atau pengajaran"],
  ["Perumpamaan", "Menggunakan unsur perbandingan"],
  ["Simpulan Bahasa", "Gabungan dua perkataan yang membawa maksud tertentu"],
];

export const PERIBAHASA_ASAS_MISTAKES = [
  "Menukar susunan perkataan peribahasa.",
  "Menggunakan peribahasa yang salah maksud.",
  "Memasukkan peribahasa yang tidak berkaitan.",
  "Menggunakan terlalu banyak peribahasa sehingga mengganggu kelancaran karangan.",
];

export const PERIBAHASA_ASAS_CHECKLIST = [
  "Saya memahami maksud peribahasa.",
  "Saya memilih peribahasa yang sesuai dengan tema.",
  "Saya menggunakan peribahasa secara gramatis.",
  "Saya tidak mengubah susunan perkataan.",
  "Saya tidak menggunakan terlalu banyak peribahasa.",
];

export const PERIBAHASA_TEKNIK_STEPS = [
  {
    title: "Pilih Isi",
    text: "Kenal pasti isi utama terlebih dahulu.",
    items: ["isi utama"],
  },
  {
    title: "Pilih Peribahasa",
    text: "Cari peribahasa yang mempunyai maksud sama dengan isi.",
    items: ["maksud sepadan"],
  },
  {
    title: "Masukkan Dalam Ayat",
    text: "Gunakan frasa penghubung yang sesuai supaya peribahasa hadir secara semula jadi.",
    items: [
      "Bak kata peribahasa...",
      "Seperti yang diungkapkan dalam peribahasa...",
      "Hal ini bertepatan dengan peribahasa...",
    ],
  },
  {
    title: "Huraikan Maksud",
    text: "Jelaskan hubungan antara peribahasa dengan isi yang dibincangkan.",
    items: ["kaitkan dengan isi", "jelaskan maksud"],
  },
  {
    title: "Penegasan",
    text: "Gunakan peribahasa sebagai pengukuh isi atau penutup.",
    items: ["pengukuh isi", "penutup"],
  },
];

export const PERIBAHASA_TEKNIK_MISTAKES = [
  "Menggunakan peribahasa tanpa menerangkan kaitannya.",
  "Menggunakan dua atau tiga peribahasa dalam satu ayat.",
  "Menyalin peribahasa tetapi maksudnya tidak sesuai.",
  "Menggunakan bahasa pasar bersama peribahasa.",
];

export const PERIBAHASA_TEKNIK_CHECKLIST = [
  "Peribahasa sesuai dengan isi.",
  "Peribahasa dimasukkan secara gramatis.",
  "Maksudnya diterangkan.",
  "Tidak digunakan secara berlebihan.",
];

export const PERIBAHASA_BANK_ROWS = [
  [
    "Pendidikan",
    "Belakang parang pun kalau diasah nescaya tajam",
    "Orang yang rajin belajar akan berjaya",
    "Murid yang tekun mengulang kaji pasti berjaya kerana belakang parang pun kalau diasah nescaya tajam.",
  ],
  [
    "Kerajinan",
    "Di mana ada kemahuan, di situ ada jalan",
    "Kesungguhan membawa kejayaan",
    "Dengan usaha yang gigih, segala cabaran dapat diatasi kerana di mana ada kemahuan, di situ ada jalan.",
  ],
  [
    "Perpaduan",
    "Bagai aur dengan tebing",
    "Saling membantu",
    "Penduduk kampung hidup bagai aur dengan tebing ketika menjayakan gotong-royong.",
  ],
  [
    "Persahabatan",
    "Seperti isi dengan kuku",
    "Sangat rapat",
    "Mereka berkawan seperti isi dengan kuku sejak kecil.",
  ],
  [
    "Keluarga",
    "Bagaimana acuan, begitulah kuihnya",
    "Anak mengikut didikan ibu bapa",
    "Anak yang berbudi bahasa menunjukkan bagaimana acuan, begitulah kuihnya.",
  ],
  [
    "Keselamatan",
    "Sediakan payung sebelum hujan",
    "Bersedia sebelum berlaku sesuatu",
    "Kita perlu membuat salinan data penting kerana sediakan payung sebelum hujan.",
  ],
  [
    "Teknologi",
    "Beringat sebelum kena",
    "Sentiasa berhati-hati",
    "Pengguna Internet perlu berhati-hati ketika melayari laman web kerana beringat sebelum kena.",
  ],
  [
    "Alam Sekitar",
    "Berat sama dipikul, ringan sama dijinjing",
    "Bekerjasama",
    "Penduduk mengamalkan sikap berat sama dipikul, ringan sama dijinjing ketika membersihkan taman perumahan.",
  ],
];

export const PERIBAHASA_LATIHAN_MISTAKES = [
  "Salah memilih peribahasa.",
  "Menukar susunan perkataan.",
  "Menggunakan peribahasa tanpa memahami maksud.",
  "Menggunakan terlalu banyak peribahasa.",
];

export const PERIBAHASA_LATIHAN_CHECKLIST = [
  "Saya mengetahui maksud setiap peribahasa.",
  "Saya boleh memadankan tema dengan peribahasa.",
  "Saya boleh membina ayat sendiri.",
  "Saya boleh menggunakan peribahasa dalam karangan.",
];
