export type BMForm3KaranganPendekSectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

export interface BMForm3KaranganPendekSection {
  id: BMForm3KaranganPendekSectionId;
  folderTitle: string;
  lessonTitle: string;
  description: string;
}

export const BM_FORM3_KARANGAN_PENDEK_SECTIONS: BMForm3KaranganPendekSection[] = [
  {
    id: "asas-formula",
    folderTitle: "Asas & Formula",
    lessonTitle: "Asas Karangan Pendek Tingkatan 3",
    description: "Fahami format, bahan rangsangan dan formula 1-3-1 sebelum mula menulis.",
  },
  {
    id: "teknik-menjawab",
    folderTitle: "Teknik Menjawab",
    lessonTitle: "Teknik Menulis Ayat Gramatis dan Matang",
    description: "Kembangkan kata kunci menjadi ayat yang jelas, matang dan gramatis.",
  },
  {
    id: "contoh-latihan",
    folderTitle: "Contoh & Latihan",
    lessonTitle: "Bank Model dan Latihan Karangan Pendek",
    description: "Analisis model jawapan dan kukuhkan kemahiran melalui latihan Tingkatan 3.",
  },
];

export const ASAS_OBJECTIVES = [
  "Mengenal pasti format Karangan Pendek",
  "Memahami bahan rangsangan",
  "Menentukan tema dan kata kunci",
  "Membina struktur karangan yang memenuhi kehendak peperiksaan",
  "Menulis antara 50 hingga 80 patah perkataan",
];

export const ASAS_STEPS = [
  {
    title: "Analisis Bahan",
    text: "Lihat bahan dan kenal pasti mesej utamanya.",
    items: ["gambar", "poster", "peta minda", "jadual", "petikan ringkas"],
  },
  {
    title: "Kesan Kata Kunci",
    text: "Cari antara tiga hingga empat maklumat utama yang perlu digunakan dalam karangan.",
    items: [],
  },
  {
    title: "Tentukan Tema",
    text: "Kenal pasti tema yang menyatukan semua maklumat bahan rangsangan.",
    items: [
      "kesihatan mental",
      "keselamatan siber",
      "alam sekitar",
      "semangat kejiranan",
      "amalan membaca",
    ],
  },
  {
    title: "Susun Isi",
    text: "Susun maklumat mengikut urutan yang logik sebelum membina ayat.",
    items: [],
  },
  {
    title: "Bina Perenggan",
    text: "Gabungkan semua maklumat menjadi satu perenggan yang lengkap dan gramatis.",
    items: [],
  },
];

export const FORMULA_131_ROWS = [
  ["1 ayat pendahuluan", "Nyatakan tema umum"],
  ["3 ayat isi", "Huraikan maklumat bahan rangsangan"],
  ["1 ayat penutup", "Berikan cadangan, harapan atau rumusan ringkas"],
];

export const ASAS_MISTAKES = [
  "Menulis dalam bentuk poin, bukan perenggan.",
  "Tidak menggunakan semua maklumat penting.",
  "Menulis terlalu panjang sehingga melebihi had.",
  "Tiada pendahuluan atau penutup.",
  "Mengulang isi yang sama.",
  "Banyak kesalahan ejaan dan tanda baca.",
];

export const ASAS_CHECKLIST = [
  "Adakah karangan ditulis dalam satu perenggan?",
  "Adakah semua maklumat bahan rangsangan digunakan?",
  "Adakah tema dikenal pasti dengan betul?",
  "Adakah jumlah perkataan antara 50 hingga 80?",
  "Adakah ayat mempunyai subjek dan predikat?",
  "Adakah ejaan dan tanda baca telah disemak?",
];

export const TEKNIK_OBJECTIVES = [
  "Mengembangkan kata kunci menjadi ayat lengkap",
  "Menggunakan penanda wacana",
  "Membina ayat majmuk",
  "Menghasilkan pendahuluan dan penutup ringkas",
  "Menyemak kesalahan bahasa",
];

export const TEKNIK_STEPS = [
  {
    title: "Gunakan Penanda Wacana",
    text: "Pilih penanda wacana mengikut fungsi dan elakkan pengulangan.",
    items: ["Antaranya", "Selain itu", "Seterusnya", "Di samping itu", "Oleh itu", "Kesimpulannya"],
  },
  {
    title: "Kembangkan Kata Kunci",
    text: "Gunakan kata hubung untuk melengkapkan hubungan antara idea.",
    items: ["agar", "supaya", "kerana", "untuk", "dan", "manakala"],
  },
  {
    title: "Bina Ayat Majmuk",
    text: "Gabungkan dua idea yang berkaitan tanpa menghasilkan ayat terlalu panjang.",
    items: [],
  },
  {
    title: "Hasilkan Pendahuluan Ringkas",
    text: "Pendahuluan cukup satu ayat yang memperkenalkan tema.",
    items: [],
  },
  {
    title: "Hasilkan Penutup Ringkas",
    text: "Penutup boleh mengandungi cadangan, harapan atau rumusan.",
    items: [],
  },
  {
    title: "Semak Jawapan",
    text: "Semak ejaan, tanda baca, struktur ayat, pengulangan kata dan jumlah perkataan.",
    items: [],
  },
];

export const VOCABULARY_ROWS = [
  ["baik", "berkesan / bermanfaat"],
  ["tempat belajar yang baik", "persekitaran pembelajaran yang kondusif"],
  ["penting", "mustahak / signifikan"],
  ["menjaga", "memelihara / melindungi"],
  ["menggunakan", "memanfaatkan"],
  ["masalah", "isu / cabaran"],
];

export const TEKNIK_MISTAKES = [
  "Mengulang penanda wacana yang sama.",
  "Menggunakan kosa kata sukar secara tidak tepat.",
  "Membina ayat terlalu panjang sehingga maksud kabur.",
  "Ayat tergantung tanpa subjek atau predikat.",
  "Menyalin kata kunci tanpa mengembangkannya.",
];

export const TEKNIK_CHECKLIST = [
  "Adakah semua kata kunci telah dikembangkan?",
  "Adakah penanda wacana digunakan dengan tepat?",
  "Adakah ayat mempunyai subjek dan predikat?",
  "Adakah pendahuluan dan penutup ringkas?",
  "Adakah kosa kata sesuai dengan maksud?",
  "Adakah jawapan telah disemak?",
];

export interface KaranganModel {
  title: string;
  theme: string;
  information: string[];
  outlineHeaders: [string, string];
  outline: string[][];
  essay: string;
}

export const KARANGAN_MODELS: KaranganModel[] = [
  {
    title: "Contoh 1 — Bahan Rangsangan Berbentuk Poster",
    theme: "Keselamatan Siber — Waspada Penipuan Dalam Talian",
    information: [
      "jangan berkongsi kata laluan",
      "rahsiakan maklumat peribadi",
      "laporkan penipuan kepada pihak berkuasa",
    ],
    outlineHeaders: ["Bahagian", "Rangka"],
    outline: [
      ["Pendahuluan", "Keselamatan siber amat penting pada masa kini."],
      ["Isi 1", "Rahsiakan maklumat peribadi daripada orang asing."],
      ["Isi 2", "Jangan berkongsi kata laluan akaun."],
      ["Isi 3", "Laporkan kejadian penipuan kepada pihak berkuasa."],
      ["Penutup", "Gunakan teknologi secara bijak agar tidak menjadi mangsa."],
    ],
    essay:
      "Keselamatan siber amat penting pada masa kini. Kita mestilah merahsiakan maklumat peribadi daripada orang yang tidak dikenali. Selain itu, jangan sesekali berkongsi kata laluan akaun media sosial dengan pihak lain. Seterusnya, sebarang cubaan penipuan perlu dilaporkan kepada ibu bapa, guru atau pihak berkuasa. Kesimpulannya, kita hendaklah menggunakan teknologi secara bijak agar tidak menjadi mangsa penipuan dalam talian.",
  },
  {
    title: "Contoh 2 — Tema Alam Sekitar",
    theme: "Alam Sekitar",
    information: ["amalan kitar semula", "gotong-royong", "menanam pokok"],
    outlineHeaders: ["Bahagian", "Isi"],
    outline: [
      ["Pendahuluan", "Alam sekitar yang bersih menjamin kesejahteraan hidup."],
      ["Isi 1", "Mengamalkan kitar semula."],
      ["Isi 2", "Menyertai aktiviti gotong-royong."],
      ["Isi 3", "Menanam lebih banyak pokok."],
      ["Penutup", "Semua pihak perlu bekerjasama menjaga alam sekitar."],
    ],
    essay:
      "Alam sekitar yang bersih menjamin kesejahteraan hidup. Antara langkah yang boleh diambil ialah mengamalkan kitar semula bagi mengurangkan pembuangan sampah. Seterusnya, kita perlulah menyertai aktiviti gotong-royong untuk membersihkan kawasan perumahan. Selain itu, penanaman pokok dapat menyegarkan udara. Kesimpulannya, semua pihak haruslah berganding bahu menjaga alam sekitar demi generasi masa hadapan.",
  },
];

export const WEAK_ANSWER_CORRECTIONS = [
  {
    weak: "Kita mesti kitar semula.",
    problems: ["terlalu umum", "tiada tujuan", "tiada kesan"],
    better:
      "Kita hendaklah memupuk amalan kitar semula bagi mengurangkan jumlah sampah dan pencemaran alam.",
  },
  {
    weak: "Jangan kongsi kata laluan.",
    problems: [],
    better:
      "Pengguna Internet tidak seharusnya berkongsi kata laluan dengan orang lain bagi melindungi keselamatan akaun.",
  },
  {
    weak: "Kita mesti tolong jiran.",
    problems: [],
    better:
      "Masyarakat perlu saling membantu jiran untuk mengeratkan hubungan dan mewujudkan kawasan kejiranan yang harmoni.",
  },
];

export const LATIHAN_CHECKLIST = [
  "Saya mengenal pasti tema.",
  "Saya menggunakan semua isi rangsangan.",
  "Saya membina rangka sebelum menulis.",
  "Saya menggunakan penanda wacana.",
  "Saya menulis satu perenggan.",
  "Saya mematuhi had perkataan.",
  "Saya menyemak bahasa.",
];

export const LATIHAN_MISTAKES = [
  "Meninggalkan satu atau lebih isi rangsangan.",
  "Menulis kurang daripada jumlah yang ditetapkan.",
  "Menulis terlalu panjang.",
  "Menggunakan bahasa pasar.",
  "Tidak menyemak ejaan dan tanda baca.",
];

export function countKaranganWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getBMForm3KaranganPendekSection(id: string) {
  return BM_FORM3_KARANGAN_PENDEK_SECTIONS.find((section) => section.id === id);
}
