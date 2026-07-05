import type { QuizQuestion } from "./types";

// ─── BM Tingkatan 2 — Kuiz Objektif UASA Kertas 1 Bahagian A ─────────────────
// Struktur: 15 soalan mengikut format UASA sebenar (berasingan sepenuhnya
// daripada bank soalan Tingkatan 1 — tiada perkataan/soalan dikongsi).
//   S1–S10  — Sistem Bahasa: morfologi, frasa, sintaksis, peribahasa,
//             melengkapkan ayat, kesalahan bahasa/ejaan
//   S11–S15 — Pemahaman Petikan / Antologi KOMSAS Tingkatan 2

// ─── Set A (Mudah) — Q1–15 supplied verbatim, do not paraphrase ────────────
// S1–10 Sistem Bahasa, S11–15 Pemahaman Petikan (KOMSAS). Original to Form 2.
const SET_A_PETIKAN = `Baca petikan pantun di bawah dengan teliti.

PANTUN ALAM REMAJA

Elok rupanya kumbang jati,
Dibawa itik pulang petang;
Tidak terkatakan besar hati,
Melihat ibu sudah pulang.

Dibawa itik pulang petang,
Dapat di rumput bilang-bilang;
Melihat ibu sudah pulang,
Hati cemas menjadi hilang.

Kemudian, jawab Soalan 11 hingga Soalan 15 berdasarkan petikan tersebut.`;

const setA: QuizQuestion[] = [
  {
    id: "bm-f2-obj1-q01",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "“__________ mestilah bekerjasama untuk menyiapkan tugasan kumpulan ini,” kata Amir kepada rakan-rakannya.",
    options: ["Saya", "Beliau", "Kita", "Baginda"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj1-q02",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Adik menangis ketakutan apabila melihat seekor __________ yang besar membuat sarang di bucu siling biliknya.",
    options: ["rerama", "lelabah", "jejentik", "pepijat"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj1-q03",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Murid yang __________ itu sering menghabiskan masa lapangnya dengan membaca buku di perpustakaan.",
    options: ["rajin", "lemah", "kasar", "bising"],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q04",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Baju yang dibeli oleh ibu pada tahun lepas sudah menjadi __________ kerana badan adik semakin besar.",
    options: ["tebal", "luas", "sempit", "besar"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj1-q05",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Pilih ayat yang menggunakan perkataan “tebal” dengan betul.\n\nI. Kamus dewan itu sangat tebal.\nII. Hutan di belakang rumah datuk sangat tebal.\nIII. Pendapatan tebal syarikat itu telah dikira.\nIV. Kakak menyapu mekap yang tebal pada wajahnya.",
    options: ["I dan II sahaja", "III dan IV sahaja", "I, II, dan IV sahaja", "Semua di atas"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj1-q06",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Bahagian yang bergaris mungkin mengandungi kesalahan bahasa. Tandakan jawapan yang betul.\n\nBuku cerita yang menarik itu telah dibaca oleh saya.",
    options: ["telah saya baca", "saya telah baca", "telah dibaca saya", "telah dibaca oleh saya"],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q07",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Pilih ayat-ayat yang betul.\n\nI. Berbagai-bagai jenis lauk pauk dihidangkan di atas meja.\nII. Mereka-mereka sedang bermain bola di padang.\nIII. Ibu memotong roti menggunakan pisau yang tajam.\nIV. Ali ialah pelajar yang paling tercerdas di dalam kelas.",
    options: ["I dan III sahaja", "II dan IV sahaja", "I, II dan III sahaja", "II, III dan IV sahaja"],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q08",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Pilih pola ayat yang betul bagi ayat di bawah.\n\nEncik Hisham seorang petani moden.",
    options: [
      "Frasa Nama + Frasa Nama (FN + FN)",
      "Frasa Nama + Frasa Kerja (FN + FK)",
      "Frasa Nama + Frasa Adjektif (FN + FA)",
      "Frasa Nama + Frasa Sendi Nama (FN + FS)",
    ],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q09",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Pilih ayat yang mempunyai maksud yang sama dengan ayat yang dicetak tebal.\n\nMasa itu emas dan kita tidak sepatutnya membazir masa.",
    options: [
      "Emas sangat berharga seperti masa yang kita ada.",
      "Janganlah membazir emas kerana ia sangat mahal.",
      "Masa sangat berharga, oleh itu janganlah kita membuang masa.",
      "Masa dan emas adalah perkara yang sama penting dalam hidup.",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj1-q10",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question:
      "Pilih peribahasa atau kata hikmat yang paling sesuai.\n\nWalaupun Zahar gagal dalam peperiksaan SPM, dia tetap gigih belajar di IKM sehingga berjaya membuka bengkel sendiri. Sikap Zahar ini sesuai dengan kata hikmat...",
    options: [
      "Di mana ada kemahuan, di situ ada jalan.",
      "Masa itu emas.",
      "Bersatu teguh, bercerai roboh.",
      "Biar lambat asal selamat.",
    ],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q11",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question: `${SET_A_PETIKAN}\n\nSoalan 11: Berdasarkan petikan, rangkai kata "besar hati" membawa maksud...`,
    options: ["berasa bangga.", "berasa cemas.", "berasa sangat gembira.", "berasa tidak sabar."],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj1-q12",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question: `${SET_A_PETIKAN}\n\nSoalan 12: Mengapakah anak-anak berasa gembira dalam pantun tersebut?`,
    options: [
      "Kerana mendapat hadiah baju baharu.",
      "Kerana melihat ibu mereka pulang ke rumah.",
      "Kerana dapat bermain dengan rakan-rakan.",
      "Kerana waktu petang telah tiba.",
    ],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj1-q13",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question: `${SET_A_PETIKAN}\n\nSoalan 13: Apakah yang berlaku kepada perasaan cemas anak-anak apabila ibu pulang?`,
    options: [
      "Perasaan cemas itu hilang.",
      "Anak-anak menjadi semakin takut.",
      "Anak-anak mula menangis.",
      "Perasaan cemas itu bertambah.",
    ],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q14",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question: `${SET_A_PETIKAN}\n\nSoalan 14: Nilai murni yang paling utama terdapat dalam petikan pantun ini ialah...`,
    options: ["Kasih sayang.", "Keberanian.", "Kerajinan.", "Kebijaksanaan."],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj1-q15",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Easy",
    question: `${SET_A_PETIKAN}\n\nSoalan 15: Antara pernyataan berikut, yang manakah benar tentang petikan pantun tersebut?`,
    options: [
      "Ibu bapa sering memarahi anak-anak mereka.",
      "Kepulangan ibu ke rumah amat dinantikan oleh anak-anak.",
      "Anak-anak berasa sedih apabila ibu mereka pulang.",
      "Anak-anak suka bermain itik pada waktu petang.",
    ],
    answerIndex: 1,
  },
];

// ─── Set B (Sederhana) — Q1–15 supplied verbatim, do not paraphrase ────────
// S1–10 Sistem Bahasa, S11–15 Pemahaman Petikan (Hikayat). Original to Form 2.
const SET_B_PETIKAN = `Baca petikan di bawah dengan teliti.

"Fikir Syah Alam di Rimba, 'Itulah akan memerang ini, selalu sahaja ia membuat aniaya ke atas ikan-ikan itu, terlalu runsing hatiku mendengar pengaduannya kepada Nabi Allah Sulaiman, jikalau begitu; baiklah aku perbuat pakatan dengan dia.' Setelah sudah ia fikir itu, dengan takdir Allah Subhanahuwataala melakukan kudrat-NYA hendak memanjangkan cerita ini, bunyilah burung bubut terlalu banyak bunyinya bersahut-sahutan sahaja."

Kemudian, jawab Soalan 11 hingga Soalan 15 berdasarkan petikan tersebut.`;

const setB: QuizQuestion[] = [
  {
    id: "bm-f2-obj2-q01",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Sebagai rakyat yang patriotik, __________ seharusnya membuktikan taat setia kepada negara dengan mendaulatkan bahasa kebangsaan.",
    options: ["saya", "kalian", "kita", "mereka"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q02",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pihak polis sedang __________ kejadian pencerobohan di kawasan hutan simpan itu yang dilaporkan berlaku pada awal pagi tadi.",
    options: ["menyiasatkan", "menyiasati", "menyiasat", "disiasat"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q03",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Walaupun usianya masih muda, namun dia mempunyai pemikiran yang tidak __________ kerana sering memberikan idea yang bernas dalam perbincangan.",
    options: ["tebal", "kasar", "sempit", "lancar"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q04",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Bahagian yang bergaris dalam ayat di bawah mungkin mengandungi kesalahan penggunaan bahasa.\n\nSurat daripada pegawai pertanian itu telah dibaca oleh saya di anjung rumah petang tadi.",
    options: ["telah saya baca", "saya telah baca", "telah dibaca saya", "telah dibaca oleh saya"],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj2-q05",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      'Pilih ayat yang menggunakan perkataan "kasar" dengan betul.\n\nI. Puan Ella menegur anaknya kerana berkelakuan kasar terhadap jiran.\nII. Keuntungan kasar syarikat itu telah dibentangkan dalam mesyuarat.\nIII. Kraf tangan itu tahan lama walaupun kasar buatannya.\nIV. Udara di kawasan tanah tinggi itu sungguh kasar dan menyegarkan.',
    options: ["I dan II sahaja", "III dan IV sahaja", "I, II, dan III sahaja", "Semua di atas"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q06",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat-ayat yang betul.\n\nI. Berbagai jenis lauk-pauk dijual di restoran itu.\nII. Mesyuarat itu dipengerusikan oleh Datuk Majid.\nIII. Murid-murid sedang berterbangan mengelilingi taman itu.\nIV. Kami kurang jelas tentang punca kejadian tersebut.",
    options: ["I dan III sahaja", "II dan IV sahaja", "I, II, dan III sahaja", "II, III dan IV sahaja"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj2-q07",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih pola ayat yang betul bagi ayat di bawah.\n\nBas ekspres itu dari Kuala Lumpur ke Kelantan.",
    options: [
      "Frasa Nama + Frasa Nama (FN + FN)",
      "Frasa Nama + Frasa Kerja (FN + FK)",
      "Frasa Nama + Frasa Adjektif (FN + FA)",
      "Frasa Nama + Frasa Sendi Nama (FN + FS)",
    ],
    answerIndex: 3,
  },
  {
    id: "bm-f2-obj2-q08",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih peribahasa atau kata-kata hikmat yang paling sesuai.\n\nSwee Yong melaporkan perbuatan sahabat baiknya yang mencuri wang kepada guru disiplin kerana dia berpegang pada prinsip __________.",
    options: [
      "Bertangguh pencuri masa",
      "Keadilan tidak mengenal kawan",
      "Sabar itu separuh daripada iman",
      "Di mana ada kemahuan, di situ ada jalan",
    ],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj2-q09",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang mempunyai maksud yang sama dengan ayat yang dicetak tebal.\n\nSektor perindustrian yang semakin maju mampu meningkatkan imej negara di persada dunia.",
    options: [
      "Imej negara akan meningkat sekiranya kita bersaing dalam sektor perindustrian.",
      "Kemajuan dunia bergantung pada kecemerlangan sektor perindustrian negara.",
      "Imej negara di peringkat antarabangsa dapat ditingkatkan melalui kemajuan sektor perindustrian.",
      "Persada dunia akan mengenali negara kita jika sektor perindustrian tidak statik.",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q10",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Kerajaan menyeru agar penggunaan bahasa Melayu yang __________ digunakan seluas-luasnya dalam pelbagai bidang pendidikan dan perniagaan.",
    options: ["bestari", "bermutu", "megah", "yakin"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj2-q11",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question: `${SET_B_PETIKAN}\n\nSoalan 11: Berdasarkan petikan, rangkai kata "memanjangkan cerita" membawa maksud...`,
    options: [
      "menceritakan kisah yang lama.",
      "menyampaikan berita kepada orang lain.",
      "menjadikan sesuatu peristiwa itu berlarutan.",
      "menambah-nambah fakta dalam sesuatu berita.",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q12",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question: `${SET_B_PETIKAN}\n\nSoalan 12: Mengapakah Syah Alam di Rimba berasa runsing?`,
    options: [
      "Kerana anak-anak memerang telah mati dipijak.",
      "Kerana burung bubut berbunyi terlalu bising.",
      "Kerana memerang sering melakukan penganiayaan terhadap ikan.",
      "Kerana Nabi Allah Sulaiman akan menjatuhkan hukuman kepadanya.",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj2-q13",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question: `${SET_B_PETIKAN}\n\nSoalan 13: Apakah tindakan Syah Alam di Rimba apabila mendengar bunyi burung bubut?`,
    options: [
      "Dia terus memencak silat sehingga memijak anak memerang.",
      "Dia pergi mencari mak bapa memerang di lubang itu.",
      "Dia membuat pakatan dengan ikan-ikan di dalam sungai.",
      "Dia segera menghadap Nabi Allah Sulaiman untuk mengadu.",
    ],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj2-q14",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question: `${SET_B_PETIKAN}\n\nSoalan 14: Nilai murni yang ditunjukkan oleh Nabi Allah Sulaiman sebagai seorang pemimpin ialah...`,
    options: ["Keadilan.", "Keberanian.", "Kasih sayang.", "Kerajinan."],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj2-q15",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question: `${SET_B_PETIKAN}\n\nSoalan 15: Antara pernyataan berikut, yang manakah benar tentang petikan tersebut?`,
    options: [
      "Mak bapa memerang pergi ke hutan untuk bermain-main.",
      "Syah Alam di Rimba merupakan menteri yang masyhur kebijaksanaannya.",
      "Kematian anak memerang adalah disebabkan oleh ancaman musuh besar.",
      "Nabi Allah Sulaiman menolak aduan yang dibawa oleh mak bapa memerang.",
    ],
    answerIndex: 1,
  },
];

// ─── Set C (Sukar) — Q1–15 supplied verbatim, do not paraphrase ────────────
// S1–10 Sistem Bahasa, S11–15 Pemahaman Petikan (Syair). Original to Form 2.
const SET_C_PETIKAN = `Baca petikan syair di bawah dengan teliti.

"Tamatlah kitab dikarang orang,
menjadi penyuluh buat dipegang;
Jika anakanda menjadi raja,
hati yang betul hendaklah disahaja.

Kerja kebajikan janganlah malas,
zahir dan batin janganlah culas;
Hendak menghukumkan tiada tahu,
hendak diam hati tak mahu.

Ilmu itu banyak manfaatnya,
perkara yang batil boleh dibezanya;
Setelah sudah ia fikir itu,
seperti air di dalam gelas."

Kemudian, jawab Soalan 11 hingga Soalan 15 berdasarkan petikan tersebut.`;

const setC: QuizQuestion[] = [
  {
    id: "bm-f2-obj3-q01",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Hakim telah __________ pesalah itu hukuman penjara seumur hidup selepas terbukti melakukan penyelewengan dana syarikat.",
    options: ["menjatuhkan", "menjatuhi", "dijatuhkan", "terjatuh"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q02",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      'Pilih ayat yang menggunakan perkataan "kasar" dengan betul.\n\nI. Pendapatan kasar syarikat itu perlu diteliti oleh juruaudit.\nII. Kraf tangan yang dihasilkan oleh penduduk asli itu agak kasar buatannya.\nIII. Dia ditegur kerana sering berkelakuan kasar terhadap warga tua.\nIV. Udara di puncak gunung itu sangat kasar sehingga menusuk ke tulang.',
    options: ["I dan II sahaja", "III dan IV sahaja", "I, II, dan III sahaja", "Semua di atas"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q03",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Bahagian yang bergaris dalam ayat di bawah mengandungi kesalahan penggunaan bahasa.\n\nLaporan audit yang lengkap itu telah pihak kami sediakan sejak minggu lepas lagi.",
    options: ["telah kami sediakan", "kami telah sediakan", "telah disediakan oleh kami", "disediakan oleh pihak kami"],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj3-q04",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Gejala sosial yang melanda remaja hari ini perlu dibincangkan __________ masyarakat bagi mencari penyelesaian yang tuntas.",
    options: ["di kalangan", "dalam kalangan", "antara kalangan", "di dalam kalangan"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q05",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Pilih ayat-ayat yang betul.\n\nI. Pelbagai langkah-langkah telah diambil untuk memartabatkan bahasa kebangsaan.\nII. Dia bukan sahaja bijak, malah sangat berbudi pekerti mulia.\nIII. Saufi menggunakan teleskopnya untuk melihat bintang yang bertaburan di angkasa.\nIV. Berbagai jenis juadah tradisional dihidangkan semasa majlis perkahwinan itu.",
    options: ["I dan II sahaja", "III dan IV sahaja", "II dan III sahaja", "I, II dan III sahaja"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q06",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: "Pilih pola ayat yang betul bagi ayat di bawah.\n\nWawasan pemuda itu sangat luar biasa.",
    options: [
      "Frasa Nama + Frasa Nama (FN + FN)",
      "Frasa Nama + Frasa Kerja (FN + FK)",
      "Frasa Nama + Frasa Adjektif (FN + FA)",
      "Frasa Nama + Frasa Sendi Nama (FN + FS)",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q07",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Pilih ayat yang mempunyai maksud yang sama dengan ayat yang dicetak tebal.\n\nSektor perindustrian yang dinamik mampu melonjakkan imej negara di peringkat antarabangsa melalui persaingan yang sihat.",
    options: [
      "Imej negara akan meningkat sekiranya kita bersaing dalam sektor perindustrian secara global.",
      "Imej negara di persada dunia dapat ditingkatkan melalui kemajuan sektor perindustrian yang berdaya saing.",
      "Persada dunia akan mengenali negara kita jika sektor perindustrian menjadi semakin statik.",
      "Kemajuan dunia bergantung sepenuhnya pada kecemerlangan sektor perindustrian di negara kita.",
    ],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q08",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Sebagai seorang pemimpin, kita tidak seharusnya menghebahkan kejayaan kecil secara berlebih-lebihan, bak kata pepatah __________.",
    options: [
      "jangan diikut resmi padi, makin berisi makin tunduk.",
      "jangan diikut resmi ayam, bertelur sebiji riuh sekampung.",
      "di mana ada kemahuan, di situ ada jalan.",
      "alang-alang menyeluk pekasam, biar sampai ke pangkal lengan.",
    ],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q09",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      'Dalam ayat "Dialah yang memenangi pertandingan itu," perkataan "-lah" berfungsi sebagai __________.',
    options: ["Kata Pembenda", "Kata Penekan", "Kata Pascakata", "Kata Penguat"],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q10",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question:
      "Walaupun usianya masih muda, namun fikirannya tidak __________ kerana dia sentiasa mempunyai pandangan yang jauh ke hadapan.",
    options: ["tebal", "kasar", "sempit", "lancar"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q11",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: `${SET_C_PETIKAN}\n\nSoalan 11: Berdasarkan petikan, rangkai kata "perkara yang batil" membawa maksud...`,
    options: [
      "perkara yang benar dan sahih.",
      "perkara yang salah atau tidak benar.",
      "perkara yang membanggakan rakyat.",
      "perkara yang sulit untuk difahami.",
    ],
    answerIndex: 1,
  },
  {
    id: "bm-f2-obj3-q12",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: `${SET_C_PETIKAN}\n\nSoalan 12: Apakah kesan jika seorang pemimpin menganggap remeh ilmu pengetahuan berdasarkan syair tersebut?`,
    options: [
      "Pemimpin itu akan dipuji oleh rakyat kerana sikap rendah diri.",
      "Rakyat akan berasa senang hati kerana perbicaraan dilakukan dengan cepat.",
      "Pemimpin tidak akan dapat menyelesaikan masalah rakyat dan akan dicela.",
      "Pemimpin itu akan disembunyikan di dalam istana oleh hulubalang.",
    ],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q13",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: `${SET_C_PETIKAN}\n\nSoalan 13: Unsur gaya bahasa yang manakah terdapat dalam baris "seperti air di dalam gelas"?`,
    options: ["Personifikasi", "Metafora", "Simile", "Inversi"],
    answerIndex: 2,
  },
  {
    id: "bm-f2-obj3-q14",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: `${SET_C_PETIKAN}\n\nSoalan 14: Nilai murni yang paling ditekankan oleh penyair kepada anaknya sekiranya dilantik menjadi menteri atau raja ialah...`,
    options: ["Keadilan dan Berilmu.", "Keberanian dan Kekuatan.", "Kesabaran dan Ketabahan.", "Kerajinan dan Kesederhanaan."],
    answerIndex: 0,
  },
  {
    id: "bm-f2-obj3-q15",
    subjectId: "bm",
    form: "Form 2",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Hard",
    question: `${SET_C_PETIKAN}\n\nSoalan 15: Antara pernyataan berikut, yang manakah benar tentang kandungan syair tersebut?`,
    options: [
      "Penyair menyarankan agar anaknya menjauhi hukum syarak dalam pengadilan.",
      "Pemimpin yang adil akan sentiasa dikeji oleh rakyat bawahan.",
      "Ilmu pengetahuan memudahkan urusan pentadbiran dan menjamin keadilan.",
      "Seorang ketua tidak perlu memerhatikan tingkah laku pegawai bawahannya.",
    ],
    answerIndex: 2,
  },
];

export const bmF2ObjektifKuiz1: QuizQuestion[] = setA;
export const bmF2ObjektifKuiz2: QuizQuestion[] = setB;
export const bmF2ObjektifKuiz3: QuizQuestion[] = setC;
