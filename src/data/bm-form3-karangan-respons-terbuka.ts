export type BMForm3ResponsTerbukaSectionId = "asas" | "langkah-menulis" | "contoh-latihan";

export interface BMForm3ResponsTerbukaSection {
  id: BMForm3ResponsTerbukaSectionId;
  folderTitle: "Asas & Formula" | "Teknik Menjawab" | "Contoh & Latihan";
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_RESPONS_TERBUKA_SECTIONS: BMForm3ResponsTerbukaSection[] = [
  {
    id: "asas",
    folderTitle: "Asas & Formula",
    lessonTitle: "Fondasi Karangan Respons Terbuka",
    description: "Analisis TFT, bina rangka dan kembangkan isi menggunakan formula I-H-C-P.",
  },
  {
    id: "langkah-menulis",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Teknik Penulisan Kreatif dan Matang",
    description: "Kuasai pendahuluan, huraian, ayat majmuk, penanda wacana dan penutup.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Bank Model Karangan Cemerlang",
    description: "Analisis model keselamatan siber dan praktikkan kemahiran melalui latihan.",
  },
];

export const ASAS_RESPONS_OBJECTIVES = [
  "Menganalisis tema, format dan tugasan",
  "Memilih tajuk yang sesuai",
  "Menyediakan rangka lengkap",
  "Membina perenggan menggunakan I-H-C-P",
  "Mengelakkan karangan terkeluar daripada tajuk",
];

export const ASAS_RESPONS_STEPS = [
  {
    title: "Pilih Tajuk",
    text: "Pilih soalan yang paling difahami dan boleh dihuraikan dengan contoh yang sesuai.",
    items: [
      "paling difahami",
      "mempunyai isi yang mencukupi",
      "sesuai dengan pengetahuan murid",
      "mudah diberikan contoh",
    ],
  },
  {
    title: "Analisis TFT",
    text: "Kenal pasti Tema, Format dan Tugasan sebenar sebelum membina rangka.",
    items: ["T — Tema", "F — Format", "T — Tugasan"],
  },
  {
    title: "Bina Rangka",
    text: "Sediakan satu pendahuluan, sekurang-kurangnya tiga isi utama dan satu penutup.",
    items: ["pendahuluan", "sekurang-kurangnya tiga isi", "penutup"],
  },
  {
    title: "Gunakan Formula I-H-C-P",
    text: "Kembangkan setiap perenggan isi menggunakan Isi, Huraian, Contoh dan Penegasan.",
    items: [],
  },
  {
    title: "Semak Keselarasan",
    text: "Pastikan semua isi menjawab tugasan yang sama dan tidak terkeluar daripada tajuk.",
    items: [],
  },
];

export const IHCP_ROWS = [
  ["I — Isi", "Nyatakan idea utama perenggan"],
  ["H — Huraian", "Terangkan mengapa atau bagaimana isi itu berlaku"],
  ["C — Contoh", "Berikan situasi atau bukti yang relevan"],
  ["P — Penegasan", "Tegaskan semula isi dengan ayat penutup perenggan"],
];

export const ASAS_RESPONS_MISTAKES = [
  "Menulis tanpa pemerengganan.",
  "Terkeluar daripada tugasan soalan.",
  "Menggunakan format yang salah.",
  "Memberikan beberapa isi yang sebenarnya membawa maksud sama.",
  "Menulis isi tanpa huraian atau contoh.",
  "Memilih tajuk yang tidak benar-benar difahami.",
];

export const ASAS_RESPONS_CHECKLIST = [
  "Adakah saya mengenal pasti tema?",
  "Adakah format dikenal pasti dengan betul?",
  "Adakah saya memahami tugasan?",
  "Adakah saya mempunyai sekurang-kurangnya tiga isi?",
  "Adakah setiap isi berbeza?",
  "Adakah rangka mempunyai pendahuluan dan penutup?",
  "Adakah setiap isi boleh dihuraikan dengan I-H-C-P?",
];

export const TEKNIK_RESPONS_OBJECTIVES = [
  "Menghasilkan pendahuluan yang relevan",
  "Menggunakan teknik 5W1H",
  "Membina ayat majmuk",
  "Menggunakan penanda wacana yang pelbagai",
  "Menulis penutup yang mempunyai rumusan, cadangan dan harapan",
];

export const TEKNIK_RESPONS_STEPS = [
  {
    title: "Bina Pendahuluan Menarik",
    text: "Perkenalkan tema secara terus melalui definisi, situasi semasa, kenyataan umum, persoalan atau peribahasa yang sesuai.",
    items: ["definisi", "situasi semasa", "kenyataan umum", "persoalan", "peribahasa yang sesuai"],
  },
  {
    title: "Gunakan Teknik 5W1H",
    text: "Gunakan soalan panduan untuk memperincikan isi, dengan tumpuan pada mengapa, bagaimana dan kesan.",
    items: ["Apa?", "Siapa?", "Bila?", "Di mana?", "Mengapa?", "Bagaimana?"],
  },
  {
    title: "Berikan Contoh Relevan",
    text: "Pilih contoh yang logik, dekat dengan kehidupan murid, menyokong isi dan tidak terlalu panjang.",
    items: ["logik", "dekat dengan kehidupan murid", "menyokong isi", "ringkas"],
  },
  {
    title: "Gunakan Ayat Penegasan",
    text: "Akhiri perenggan dengan penegasan yang mengikat huraian kepada isi utama.",
    items: ["Jelaslah bahawa", "Oleh itu", "Tegasnya", "Sesungguhnya"],
  },
  {
    title: "Hubungkan Perenggan",
    text: "Gunakan penanda wacana yang pelbagai dan sesuai tanpa memaksakan frasa yang terlalu sukar.",
    items: [
      "Selain itu",
      "Di samping itu",
      "Seterusnya",
      "Dalam pada itu",
      "Sehubungan dengan itu",
      "Namun begitu",
      "Oleh sebab itu",
    ],
  },
  {
    title: "Bina Penutup Lengkap",
    text: "Gabungkan rumusan, cadangan dan harapan dalam penutup yang berkaitan dengan tajuk.",
    items: ["rumusan", "cadangan", "harapan"],
  },
];

export const TEKNIK_RESPONS_MISTAKES = [
  "Memberikan contoh yang tidak relevan.",
  "Mengulang penanda wacana yang sama.",
  "Pendahuluan terlalu panjang sehingga mengambil ruang isi.",
  "Huraian hanya mengulang ayat isi.",
  "Penutup hanya satu ayat tanpa cadangan atau harapan.",
  "Menggunakan perkataan sukar secara salah.",
  "Memasukkan peribahasa secara paksa.",
];

export const TEKNIK_RESPONS_CHECKLIST = [
  "Adakah pendahuluan berkaitan dengan tema?",
  "Adakah setiap isi dihuraikan?",
  "Adakah contoh menyokong isi?",
  "Adakah penanda wacana bervariasi?",
  "Adakah ayat majmuk digunakan dengan betul?",
  "Adakah penutup mempunyai rumusan, cadangan dan harapan?",
  "Adakah peribahasa digunakan secara tepat jika dimasukkan?",
];

export const MODEL_ESSAY_PARAGRAPHS = [
  "Dalam era teknologi maklumat yang berkembang pesat, Internet telah menjadi sebahagian daripada kehidupan remaja. Walau bagaimanapun, kemudahan ini turut membawa risiko seperti penipuan dalam talian, kecurian data dan pencerobohan akaun. Oleh itu, setiap remaja perlu mengetahui langkah-langkah yang berkesan untuk melindungi diri daripada ancaman siber.",
  "Antara langkah utama yang perlu diamalkan ialah merahsiakan maklumat peribadi di media sosial. Hal ini penting kerana maklumat seperti nombor kad pengenalan, alamat rumah dan lokasi semasa boleh disalahgunakan oleh penjenayah siber. Contohnya, remaja tidak seharusnya memberikan butiran diri kepada orang asing yang baru dikenali dalam talian. Jelaslah bahawa kerahsiaan data peribadi merupakan benteng penting untuk menjaga keselamatan pengguna.",
  "Selain itu, remaja perlu menggunakan kata laluan yang kukuh bagi melindungi akaun mereka. Kata laluan yang mudah diteka seperti nama sendiri atau tarikh lahir boleh memudahkan pihak tidak bertanggungjawab menceroboh akaun. Sebagai contoh, pengguna boleh menggabungkan huruf besar, huruf kecil, nombor dan simbol serta menggunakan kata laluan yang berbeza bagi setiap akaun. Tegasnya, penggunaan kata laluan yang kukuh dapat mengurangkan risiko kecurian akaun.",
  "Seterusnya, remaja hendaklah mengelakkan pautan atau lampiran yang mencurigakan. Pautan palsu mungkin membawa pengguna ke laman yang direka untuk mencuri maklumat log masuk atau memasang perisian berbahaya. Sebelum menekan sesuatu pautan, pengguna perlu menyemak alamat laman dan identiti pengirim terlebih dahulu. Oleh itu, sikap berhati-hati dapat mengelakkan remaja daripada terperangkap dalam penipuan dalam talian.",
  "Di samping itu, remaja perlu mendapatkan bantuan apabila berhadapan dengan ancaman siber. Mereka tidak sepatutnya menyembunyikan kejadian seperti ugutan, buli siber atau pencerobohan akaun kerana masalah tersebut boleh menjadi semakin serius. Contohnya, remaja boleh menyimpan bukti dan melaporkan kejadian kepada ibu bapa, guru, penyedia platform atau pihak berkuasa. Sesungguhnya, tindakan segera membolehkan bantuan yang sesuai diberikan.",
  "Kesimpulannya, keselamatan siber perlu menjadi tanggungjawab setiap pengguna Internet. Remaja hendaklah merahsiakan data peribadi, menggunakan kata laluan yang kukuh, mengelakkan pautan mencurigakan dan mendapatkan bantuan apabila berhadapan dengan ancaman. Diharapkan kesedaran yang tinggi serta kerjasama semua pihak dapat mewujudkan persekitaran digital yang lebih selamat dan harmoni.",
];

export const WEAK_RESPONS_CORRECTIONS = [
  {
    weak: "Kita mesti jaga alam sekitar supaya tidak kotor.",
    better:
      "Kita seyogianya memelihara alam sekitar agar kebersihan dan keseimbangan ekosistem sentiasa terjamin.",
  },
  {
    weak: "Kita jangan bagi kata laluan.",
    better:
      "Pengguna tidak seharusnya berkongsi kata laluan dengan pihak lain bagi melindungi keselamatan akaun.",
  },
  {
    weak: "Sekolah kena ajar pasal Internet.",
    better:
      "Pihak sekolah perlu memberikan pendidikan keselamatan siber supaya murid dapat menggunakan Internet secara bijak dan bertanggungjawab.",
  },
];

export const LATIHAN_RESPONS_MISTAKES = [
  "Menyalin semula soalan sebagai pendahuluan tanpa pengembangan.",
  "Menulis isi yang terlalu umum.",
  "Memberikan satu ayat sahaja bagi setiap isi.",
  "Menggunakan bahasa pasar.",
  "Penutup tidak berkaitan dengan tajuk.",
  "Terlalu banyak peribahasa atau frasa berbunga.",
];

export const LATIHAN_RESPONS_CHECKLIST = [
  "Saya telah menganalisis TFT.",
  "Saya mempunyai rangka lengkap.",
  "Setiap perenggan isi menggunakan I-H-C-P.",
  "Saya menggunakan penanda wacana yang pelbagai.",
  "Contoh saya relevan dan logik.",
  "Penutup mempunyai rumusan, cadangan dan harapan.",
  "Saya telah menyemak ejaan dan tanda baca.",
  "Karangan melebihi 180 patah perkataan seperti yang disahkan dalam modul rasmi projek.",
];

export function countResponsTerbukaWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getBMForm3ResponsTerbukaSection(id: string) {
  return BM_FORM3_RESPONS_TERBUKA_SECTIONS.find((section) => section.id === id);
}
