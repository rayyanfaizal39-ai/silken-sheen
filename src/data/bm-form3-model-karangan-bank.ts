export type BMForm3ModelKaranganSectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

export interface BMForm3ModelKaranganSection {
  id: BMForm3ModelKaranganSectionId;
  folderTitle: "Asas & Formula" | "Teknik Menjawab" | "Contoh & Latihan";
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_MODEL_KARANGAN_SECTIONS: BMForm3ModelKaranganSection[] = [
  {
    id: "asas-formula",
    folderTitle: "Asas & Formula",
    lessonTitle: "Kompas Karangan Cemerlang Tingkatan 3",
    description: "Kuasai TFT, I-H-C-P dan R-C-H untuk merancang karangan yang kukuh.",
  },
  {
    id: "teknik-menjawab",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Modul Penguasaan Format Karangan",
    description: "Kenali struktur, nada dan teknik bagi karangan berformat dan tidak berformat.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Galeri Penulisan dan Latihan Intensif",
    description:
      "Analisis model lengkap, baiki ayat dan bina karangan melalui latihan berperingkat.",
  },
];

export const MODEL_ASAS_OBJECTIVES = [
  "Mengenal pasti jenis dan format karangan Tingkatan 3",
  "Menganalisis soalan menggunakan teknik TFT",
  "Membina rangka karangan",
  "Menggunakan formula I-H-C-P bagi perenggan isi",
  "Menggunakan formula R-C-H bagi penutup",
  "Merancang masa menulis dan menyemak",
];

export const MODEL_ASAS_STEPS = [
  {
    title: "Analisis Soalan Menggunakan TFT",
    text: "Kenal pasti Tema, Format dan Tugasan sebenar sebelum merancang jawapan.",
    items: ["T — Tema", "F — Format", "T — Tugasan"],
  },
  {
    title: "Membina Rangka",
    text: "Catat satu pendahuluan, tiga hingga empat isi dan satu penutup.",
    items: ["satu pendahuluan", "tiga hingga empat isi", "satu penutup"],
  },
  {
    title: "Memilih Isi",
    text: "Pilih isi yang berbeza, menjawab tugasan, mudah dihuraikan dan mempunyai contoh relevan.",
    items: ["berbeza", "relevan", "mudah dihuraikan", "mempunyai contoh"],
  },
  {
    title: "Mengurus Masa",
    text: "Bahagikan masa latihan untuk menganalisis dan merangka, menulis serta menyemak.",
    items: ["analisis dan rangka", "menulis", "menyemak"],
  },
  {
    title: "Menyemak",
    text: "Semak format, pemerengganan, isi, ejaan, tanda baca, tatabahasa dan jumlah perkataan jika diperlukan.",
    items: ["format", "pemerengganan", "bahasa", "jumlah perkataan jika diperlukan"],
  },
];

export const IHCP_ROWS = [
  ["I", "Isi Utama", "Nyatakan idea yang menjawab tugasan"],
  ["H", "Huraian", "Terangkan mengapa atau bagaimana isi itu berlaku"],
  ["C", "Contoh", "Berikan situasi atau bukti yang relevan"],
  ["P", "Penegasan", "Tegaskan semula isi dengan ayat penutup perenggan"],
];

export const RCH_ROWS = [
  ["R", "Rumusan", "Ringkaskan keseluruhan isu"],
  ["C", "Cadangan", "Berikan tindakan yang wajar"],
  ["H", "Harapan", "Nyatakan hasil positif yang diharapkan"],
];

export const MODEL_ASAS_MISTAKES = [
  "Memberikan isi tanpa huraian.",
  "Tidak mengasingkan isi mengikut perenggan.",
  "Salah mengenal pasti format.",
  "Terkeluar daripada tugasan.",
  "Mengulang isi yang sama.",
  "Penutup tidak mengandungi rumusan, cadangan atau harapan.",
];

export const MODEL_ASAS_CHECKLIST = [
  "Adakah saya mengenal pasti Tema, Format dan Tugasan?",
  "Adakah saya mematuhi format yang diminta?",
  "Adakah saya mempunyai sekurang-kurangnya tiga isi?",
  "Adakah setiap perenggan menggunakan I-H-C-P?",
  "Adakah penutup menggunakan R-C-H?",
  "Adakah semua isi menjawab tugasan?",
  "Adakah ejaan dan tanda baca telah disemak?",
  "Adakah panjang karangan mematuhi keperluan yang disahkan dalam sumber rasmi projek?",
];

export const FORMAT_ROWS = [
  [
    "Fakta / Pendapat",
    "Gunakan hujah logik, isi relevan dan I-H-C-P",
    "Hal ini dikatakan demikian kerana; Oleh itu",
  ],
  [
    "Perbincangan",
    "Bincangkan dua sudut secara seimbang",
    "Namun begitu; Sebaliknya; Di sudut yang lain",
  ],
  ["Pengalaman", "Gunakan kronologi, konflik, emosi dan nilai", "Pada mulanya; Kemudian; Akhirnya"],
  [
    "Surat Rasmi",
    "Gunakan format rasmi, tajuk perkara dan bahasa baku",
    "Tujuan surat ini ditulis adalah untuk",
  ],
  ["Surat Tidak Rasmi", "Gunakan nada mesra tetapi sopan", "Menemui sahabatku; Akhir kata"],
  ["Ucapan", "Gunakan kata alu-aluan, sapaan dan penghargaan", "Hadirin yang dihormati"],
  [
    "Syarahan / Ceramah",
    "Gunakan nada memujuk, hujah dan sapaan khalayak",
    "Hadirin sekalian; Tuan-tuan dan puan-puan",
  ],
  [
    "Laporan",
    "Gunakan tajuk, fakta aktiviti, kronologi dan pengesahan pelapor",
    "Laporan ini disediakan untuk",
  ],
  [
    "Artikel",
    "Gunakan tajuk, pendahuluan jelas dan gaya informatif",
    "Dalam konteks ini; Kesimpulannya",
  ],
  [
    "Dialog",
    "Gunakan nama watak, titik bertindih dan percakapan konsisten",
    "Tidak perlu penanda wacana formal pada setiap baris",
  ],
];

export const MODEL_TEKNIK_MISTAKES = [
  "Menulis laporan dalam bentuk surat.",
  "Menggunakan bahasa pasar seperti ‘tak’, ‘nak’ dan ‘yg’.",
  "Tidak menulis tajuk atau perkara apabila format memerlukannya.",
  "Menggunakan gaya mesra dalam surat rasmi.",
  "Dialog tidak menggunakan nama watak dan titik bertindih.",
  "Ucapan tidak mempunyai kata alu-aluan.",
];

export const MODEL_TEKNIK_CHECKLIST = [
  "Adakah saya mengenal pasti jenis karangan?",
  "Adakah format yang digunakan betul?",
  "Adakah nada bahasa sesuai?",
  "Adakah semua komponen wajib hadir?",
  "Adakah isi menjawab tugasan?",
  "Adakah penanda wacana sesuai?",
  "Adakah bahasa baku digunakan?",
];

export const WEAK_ANSWER_ROWS = [
  [
    "Kita mesti jaga alam sekitar supaya tidak kotor.",
    "Kita seyogianya memelihara alam sekitar agar kebersihan dan keseimbangan ekosistem sentiasa terjamin.",
  ],
  [
    "Kita jangan kongsi kata laluan.",
    "Pengguna tidak seharusnya berkongsi kata laluan dengan pihak lain bagi melindungi keselamatan akaun.",
  ],
  [
    "Disiplin penting untuk murid.",
    "Disiplin amat penting kerana dapat membentuk murid yang bertanggungjawab dan mampu mengurus masa dengan baik.",
  ],
];

export const VOCABULARY_ROWS = [
  ["signifikan", "penting"],
  ["polemik", "isu yang diperdebatkan"],
  ["impak", "kesan"],
  ["wahana", "alat atau medium"],
  ["mendepani", "menghadapi"],
  ["sinergi", "kerjasama yang menghasilkan kesan lebih baik"],
];

export const MODEL_ESSAY_PARAGRAPHS = [
  "Dalam era teknologi maklumat yang berkembang pesat, Internet telah menjadi sebahagian daripada kehidupan remaja. Walau bagaimanapun, kemudahan ini turut membuka ruang kepada penipuan dalam talian yang boleh menyebabkan kehilangan wang dan pencerobohan akaun. Oleh itu, remaja perlu mengetahui langkah-langkah yang berkesan untuk melindungi diri ketika menggunakan Internet.",
  "Antara langkah utama ialah remaja perlu merahsiakan maklumat peribadi. Hal ini penting kerana maklumat tersebut boleh disalahgunakan oleh penjenayah siber untuk menyamar atau menceroboh akaun. Contohnya, pengguna tidak seharusnya berkongsi nombor kad pengenalan, nombor telefon, kata laluan atau lokasi semasa dengan orang asing. Jelaslah bahawa kerahsiaan data merupakan benteng pertama bagi mengelakkan penipuan dalam talian.",
  "Selain itu, remaja hendaklah menggunakan kata laluan yang kukuh bagi setiap akaun. Kata laluan yang mudah diteka seperti nama sendiri atau tarikh lahir memudahkan pihak tidak bertanggungjawab mengambil alih akaun. Sebagai contoh, pengguna boleh menggabungkan huruf besar, huruf kecil, nombor dan simbol serta menggunakan kata laluan yang berbeza. Tegasnya, kata laluan yang kukuh dapat mengurangkan risiko pencerobohan akaun.",
  "Seterusnya, pengguna perlu berhati-hati sebelum menekan pautan yang diterima melalui mesej atau media sosial. Pautan mencurigakan mungkin membawa pengguna ke laman palsu yang cuba mencuri maklumat sulit. Contohnya, remaja hendaklah menyemak alamat laman sesawang dan tidak terburu-buru memberikan butiran akaun apabila ditawarkan hadiah. Oleh itu, sikap berwaspada dapat mengelakkan pengguna daripada terperangkap dalam helah penipu.",
  "Di samping itu, remaja perlu mendapatkan bantuan orang dewasa apabila berhadapan dengan cubaan penipuan. Ibu bapa dan guru dapat membantu menilai keadaan serta menentukan tindakan yang selamat. Sebagai contoh, mesej, nombor telefon dan tangkap layar boleh disimpan sebagai bukti sebelum laporan dibuat kepada platform atau pihak berkuasa. Jelaslah bahawa tindakan meminta bantuan dan membuat laporan dapat melindungi mangsa serta pengguna lain.",
  "Kesimpulannya, setiap pengguna Internet perlu sentiasa berwaspada ketika berada di ruang digital. Ibu bapa dan pihak sekolah hendaklah meningkatkan pendidikan keselamatan siber agar remaja mampu mengenal pasti taktik penipuan. Diharapkan kerjasama semua pihak dapat mewujudkan persekitaran dalam talian yang lebih selamat untuk generasi muda.",
];

export function countMalayWords(text: string) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

export const MODEL_ESSAY_WORD_COUNT = countMalayWords(MODEL_ESSAY_PARAGRAPHS.join(" "));

export const MODEL_LATIHAN_MISTAKES = [
  "Menggunakan istilah sukar secara salah.",
  "Mengabaikan format.",
  "Menulis isi tanpa contoh.",
  "Karangan pengalaman tiada konflik atau pengajaran.",
  "Dialog terlalu pendek dan tidak mempunyai tujuan.",
  "Penutup tidak berkaitan dengan isi.",
];

export const MODEL_LATIHAN_CHECKLIST = [
  "Saya telah menganalisis TFT.",
  "Saya mengenal pasti format.",
  "Saya mempunyai rangka lengkap.",
  "Setiap isi menggunakan I-H-C-P.",
  "Penutup menggunakan R-C-H.",
  "Contoh yang digunakan relevan.",
  "Bahasa baku digunakan.",
  "Ejaan dan tanda baca telah disemak.",
];
