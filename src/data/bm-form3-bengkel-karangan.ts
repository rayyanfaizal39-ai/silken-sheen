export type BMForm3BengkelKaranganSectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

export interface BMForm3BengkelKaranganSection {
  id: BMForm3BengkelKaranganSectionId;
  folderTitle: "Asas & Formula" | "Teknik Menjawab" | "Contoh & Latihan";
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_BENGKEL_KARANGAN_SECTIONS: BMForm3BengkelKaranganSection[] = [
  {
    id: "asas-formula",
    folderTitle: "Asas & Formula",
    lessonTitle: "Fondasi Karangan Matang Tingkatan 3",
    description: "Analisis TFT, rangka 1-3-1 dan formula I-H-C-P untuk karangan yang utuh.",
  },
  {
    id: "teknik-menjawab",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Strategi Meningkatkan Kualiti Karangan",
    description: "Kembangkan isi, pilih contoh dan gunakan penanda wacana mengikut fungsi.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Galeri Transformasi Ayat dan Latihan Intensif",
    description: "Baiki ayat, perkaya kosa kata dan latih perenggan I-H-C-P.",
  },
];

export const BENGKEL_ASAS_OBJECTIVES = [
  "Mengenal pasti struktur lengkap karangan",
  "Menganalisis Tema, Format dan Tugasan",
  "Membina rangka sebelum menulis",
  "Menggunakan formula I-H-C-P",
  "Merancang masa menulis dan menyemak",
  "Membina ayat majmuk yang sesuai dengan tahap Tingkatan 3",
];

export const BENGKEL_ASAS_STEPS = [
  {
    title: "Analisis TFT",
    text: "Kenal pasti Tema, Format dan Tugasan yang sebenar sebelum merancang jawapan.",
    items: ["T — Tema", "F — Format", "T — Tugasan"],
  },
  {
    title: "Rancang Masa",
    text: "Bahagikan masa untuk menganalisis dan merangka, menulis serta menyemak.",
    items: ["analisis dan rangka", "menulis", "menyemak"],
  },
  {
    title: "Bina Rangka",
    text: "Sediakan satu pendahuluan, tiga hingga empat isi utama dan satu penutup.",
    items: ["satu pendahuluan", "tiga hingga empat isi", "satu penutup"],
  },
  {
    title: "Aplikasi I-H-C-P",
    text: "Gunakan Isi, Huraian, Contoh dan Penegasan bagi setiap perenggan isi.",
    items: ["Isi", "Huraian", "Contoh", "Penegasan"],
  },
  {
    title: "Semak Keselarasan",
    text: "Pastikan isi menjawab tugasan, huraian berkaitan dengan contoh dan tiada idea berulang.",
    items: [
      "satu isi utama setiap perenggan",
      "huraian dan contoh berkaitan",
      "tiada isi berulang",
    ],
  },
];

export const FORMULA_131_BENGKEL_ROWS = [
  ["1 perenggan pendahuluan", "Ayat rangsangan, ayat isu dan ayat arahan atau fokus tugasan"],
  ["3–4 perenggan isi", "Setiap perenggan menggunakan Isi, Huraian, Contoh dan Penegasan"],
  ["1 perenggan penutup", "Ayat rumusan, ayat cadangan dan ayat harapan"],
];

export const BENGKEL_ASAS_MISTAKES = [
  "Menulis isi tanpa huraian.",
  "Tidak membuat pemerengganan sehingga karangan menjadi satu blok.",
  "Menggabungkan beberapa isi berbeza dalam satu perenggan.",
  "Membina ayat terlalu panjang dan sukar difahami.",
  "Tidak memahami format atau tugasan soalan.",
  "Tidak menyediakan rangka sebelum menulis.",
];

export const BENGKEL_ASAS_CHECKLIST = [
  "Saya telah menganalisis TFT.",
  "Saya mempunyai satu pendahuluan.",
  "Saya mempunyai sekurang-kurangnya tiga isi.",
  "Setiap isi menggunakan I-H-C-P.",
  "Saya mempunyai penutup lengkap.",
  "Saya menggunakan ayat majmuk dengan tepat.",
  "Saya telah menyediakan masa untuk menyemak.",
];

export const BENGKEL_TEKNIK_OBJECTIVES = [
  "Menghuraikan isi menggunakan 5W1H",
  "Memilih contoh yang relevan",
  "Menggunakan penanda wacana yang pelbagai",
  "Membina kesan kepada diri, masyarakat atau negara",
  "Menyemak ejaan, tatabahasa dan tanda baca",
  "Menggunakan peribahasa dan kosa kata matang secara tepat",
];

export const BENGKEL_TEKNIK_STEPS = [
  {
    title: "Teknik 5W1H",
    text: "Gunakan soalan panduan untuk mengembangkan isi, terutama mengapa, bagaimana dan kesannya.",
    items: ["Apa?", "Siapa?", "Bila?", "Di mana?", "Mengapa?", "Bagaimana?"],
  },
  {
    title: "Memilih Contoh",
    text: "Pilih contoh yang berkaitan, logik, dekat dengan kehidupan remaja dan mudah dihuraikan.",
    items: ["relevan", "logik", "sesuai untuk remaja", "tanpa statistik tidak disahkan"],
  },
  {
    title: "Penanda Wacana",
    text: "Gunakan penanda wacana berdasarkan fungsinya untuk memulakan, menghuraikan, memberikan contoh atau menegaskan.",
    items: ["memulakan isi", "menghuraikan", "memberikan contoh", "menegaskan"],
  },
  {
    title: "Teknik Kesan Berganda",
    text: "Jika relevan, lanjutkan kesan daripada individu kepada keluarga, sekolah, masyarakat atau negara.",
    items: ["diri", "keluarga", "sekolah", "masyarakat", "negara"],
  },
];

export const PENANDA_WACANA_BENGKEL = [
  {
    function: "Memulakan isi",
    items: ["Selain itu", "Di samping itu", "Seterusnya", "Dalam pada itu"],
  },
  {
    function: "Menghuraikan",
    items: [
      "Hal ini dikatakan demikian kerana",
      "Dalam konteks ini",
      "Keadaan ini menyebabkan",
      "Kesannya",
    ],
  },
  {
    function: "Memberikan contoh",
    items: ["Contohnya", "Sebagai contoh", "Misalnya", "Sebagai bukti"],
  },
  {
    function: "Menegaskan",
    items: ["Jelaslah bahawa", "Oleh itu", "Tegasnya", "Sesungguhnya"],
  },
];

export const BENGKEL_TEKNIK_MISTAKES = [
  "Menggunakan peribahasa yang tidak sesuai.",
  "Membina ayat tergantung tanpa subjek atau predikat.",
  "Mengulang penanda wacana yang sama.",
  "Huraian hanya mengulang isi.",
  "Memberikan contoh yang tidak berkaitan dengan tema.",
  "Menggunakan perkataan sukar secara salah.",
  "Memaksa rujukan KOMSAS ke dalam karangan.",
];

export const BENGKEL_TEKNIK_CHECKLIST = [
  "Adakah huraian menjawab ‘mengapa’ atau ‘bagaimana’?",
  "Adakah contoh saya relevan?",
  "Adakah saya menerangkan kesan?",
  "Adakah penanda wacana digunakan dengan tepat?",
  "Adakah setiap ayat mempunyai subjek dan predikat?",
  "Adakah peribahasa sesuai jika digunakan?",
  "Adakah ejaan dan tanda baca telah disemak?",
];

export const TRANSFORMASI_AYAT_ROWS = [
  [
    "Kita mesti jaga alam sekitar supaya bersih.",
    "Kita seyogianya memelihara alam sekitar agar kebersihan dan keseimbangan ekosistem sentiasa terjamin.",
  ],
  [
    "Remaja suka guna Internet untuk belajar.",
    "Remaja kini memanfaatkan teknologi maklumat sebagai medium pembelajaran yang berkesan.",
  ],
  [
    "Murid kena hormat guru.",
    "Murid hendaklah menghormati guru sebagai tanda menghargai jasa dan pengorbanan mereka.",
  ],
  [
    "Kita mesti bantu jiran.",
    "Masyarakat perlu saling membantu jiran yang menghadapi kesusahan demi mewujudkan kawasan kejiranan yang harmoni.",
  ],
];

export const KOSA_KATA_MATANG_ROWS = [
  ["masalah", "isu / kemelut", "Perkara atau keadaan yang memerlukan penyelesaian"],
  ["penting", "mustahak / signifikan", "Sesuatu yang perlu diberikan perhatian"],
  ["alat", "medium / kemudahan", "Perantara atau sesuatu yang membantu urusan"],
  ["menghadapi", "mendepani", "Berhadapan dengan keadaan atau cabaran"],
  ["kerjasama", "muafakat / usaha bersama", "Tindakan yang dilakukan secara bersama"],
  ["menjaga", "memelihara / melindungi", "Memastikan sesuatu kekal baik atau selamat"],
  ["menggunakan", "memanfaatkan", "Menggunakan sesuatu untuk memperoleh faedah"],
  ["baik", "berkesan / bermanfaat", "Memberikan hasil atau faedah yang sesuai mengikut konteks"],
];

export const BENGKEL_LATIHAN_MISTAKES = [
  "Menggantikan semua perkataan mudah dengan istilah sukar.",
  "Menggunakan perkataan matang dengan maksud yang salah.",
  "Membina ayat terlalu panjang.",
  "Menggunakan penanda wacana yang tidak sesuai.",
  "Menghasilkan huraian yang tidak berkaitan dengan isi.",
];

export const BENGKEL_LATIHAN_CHECKLIST = [
  "Saya menggunakan bahasa baku.",
  "Saya memilih kosa kata yang tepat.",
  "Saya membina ayat majmuk yang jelas.",
  "Saya menggunakan I-H-C-P.",
  "Saya memberikan contoh yang relevan.",
  "Saya menerangkan kesan isi.",
  "Saya menggunakan penanda wacana dengan betul.",
  "Saya telah menyemak ejaan dan tanda baca.",
];

export function getBMForm3BengkelKaranganSection(id: string) {
  return BM_FORM3_BENGKEL_KARANGAN_SECTIONS.find((section) => section.id === id);
}
