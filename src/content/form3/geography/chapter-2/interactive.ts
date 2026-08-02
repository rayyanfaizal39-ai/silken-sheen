import type { GeoF3InteractiveContent } from "../interactive-types";

export const geographyF3C2Interactive: GeoF3InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "🥧 Tahukah Anda? — Pencipta Carta Pai",
    body: "Carta pai dicipta lebih 200 tahun yang lalu oleh seorang ahli statistik grafik bernama William Playfair pada tahun 1801 — jauh sebelum wujudnya perisian hamparan elektronik seperti yang kita gunakan hari ini.",
  },
  keywords: ["Carta Pai", "Sektor", "Saiz Sudut"],
  sections: [
    {
      number: "2.1",
      title: "Ciri-ciri dan Kegunaan Carta Pai",
      intro:
        "Carta pai ialah sejenis gambar rajah atau perwakilan grafik untuk memaparkan pembahagian atau pecahan data dan maklumat dalam bentuk bulatan yang dibahagikan kepada beberapa sektor. Setiap sektor mewakili maklumat tertentu, dan saiz sudut setiap sektor adalah berdasarkan kuantiti maklumat tersebut. Nilai setiap sektor dinyatakan dalam peratus (%), manakala nilai keseluruhan bulatan ialah 360° yang mewakili 100%.",
      cards: [
        {
          title: "Ciri-ciri Carta Pai",
          body: "Setiap sektor mewakili maklumat tertentu. Saiz sudut setiap sektor berdasarkan kuantiti maklumat. Nilai setiap sektor dinyatakan dalam peratus (%). Nilai keseluruhan bulatan ialah 360° yang mewakili 100%. Mempunyai tajuk, petunjuk dan jumlah keseluruhan.",
        },
        {
          title: "Kegunaan Carta Pai",
          body: "Mewakilkan data kepada informasi yang lebih mudah dan menarik. Menunjukkan perbandingan data dan maklumat dengan lebih jelas. Sesuai untuk menunjukkan sumbangan sektor ekonomi kepada pendapatan negara, negara asal pelancong asing ke Malaysia, dan destinasi import atau eksport utama Malaysia.",
        },
      ],
      checks: [
        {
          question: "Berapakah nilai keseluruhan bulatan sesebuah carta pai, dalam darjah dan peratus?",
          hint: "360° yang mewakili 100%.",
        },
      ],
    },
    {
      number: "2.2",
      title: "Langkah-langkah Membina Carta Pai",
      intro:
        "Sebelum sesebuah carta pai dapat dibina, nilai mutlak dalam jadual perlu ditukar kepada peratus, kemudian saiz sudut setiap sektor perlu dikira menggunakan formula Peratus = (Nilai ÷ Jumlah) × 100% dan Saiz Sudut = (Peratus ÷ 100) × 360°. Ikuti tujuh langkah di bawah untuk menghasilkan sebuah carta pai yang lengkap.",
      sequence: {
        title: "Tujuh langkah membina carta pai",
        instruction: "Klik setiap langkah untuk melihat penerangannya.",
        steps: [
          { title: "1. Tukar nilai kepada peratus", body: "Tukarkan nilai mutlak dalam jadual kepada peratus menggunakan formula Peratus = (Nilai ÷ Jumlah) × 100%." },
          { title: "2. Tentukan saiz sudut setiap sektor", body: "Kira saiz sudut setiap sektor menggunakan formula Saiz Sudut = (Peratus ÷ 100) × 360°." },
          { title: "3. Lukis bulatan", body: "Tentukan jejari yang sesuai dan lukis sebuah bulatan dengan menggunakan jangka lukis." },
          { title: "4. Lukis jejari", body: "Lukiskan jejari dari pusat bulatan tegak ke atas sebagai titik permulaan." },
          { title: "5. Lukis setiap sektor", body: "Lukiskan setiap sektor daripada nilai yang terbesar kepada nilai yang terkecil mengikut arah putaran jam, menggunakan jangka sudut." },
          { title: "6. Warna dan label sektor", body: "Warna atau lorekkan setiap sektor dan tuliskan nilai peratus pada setiap sektor." },
          { title: "7. Lengkapkan carta pai", body: "Lengkapkan carta pai dengan tajuk, petunjuk dan jumlah keseluruhan. Sekiranya terdapat data untuk kategori \"lain-lain\", ia perlu diletakkan sebagai sektor terakhir tanpa mengambil kira saiz sudutnya." },
        ],
      },
      pieCalculator: {
        title: "🧮 Kira peratus dan saiz sudut sendiri",
        instruction: "Formula: Peratus = (Nilai ÷ Jumlah) × 100% dan Saiz sudut = (Peratus ÷ 100) × 360°. Masukkan nilai sektor dan jumlah keseluruhan untuk cuba sendiri.",
        valueField: { label: "Nilai sektor (cth: bilangan pelancong)", default: 238378 },
        totalField: { label: "Jumlah keseluruhan", default: 347197 },
      },
      checks: [
        {
          question: "Sebuah sektor mewakili 25% daripada jumlah keseluruhan. Berapakah saiz sudutnya?",
          hint: "(25 ÷ 100) × 360° = 90°. Cuba sahkan jawapan ini menggunakan kalkulator di atas dengan nilai sektor 25 dan jumlah 100!",
        },
      ],
    },
    {
      number: "2.3",
      title: "Mentafsir Carta Pai",
      intro:
        "Sama seperti jadual dan graf, sesebuah carta pai juga perlu ditafsir supaya maklumat yang terkandung di dalamnya dapat difahami dengan lebih mendalam — bukan sekadar membaca nilai peratus setiap sektor, tetapi turut menghuraikan sebab di sebalik perbezaan antara sektor.",
      cards: [
        {
          title: "Enam langkah mentafsir carta pai",
          body: "Kenal pasti tajuk. Kenal pasti sektor. Nyatakan nilai keseluruhan dan nilai setiap sektor. Nyatakan sektor tertinggi dan terendah. Nyatakan perbezaan antara sektor. Buat rumusan keseluruhan.",
        },
        {
          title: "Contoh tafsiran ringkas",
          body: "Carta pai menunjukkan kedatangan pelancong ke Pahang pada 2016: Jepun (69%, 238,378 orang) adalah tertinggi, diikuti Thailand (21%), Australia (7%) dan Amerika Syarikat (3%, terendah). Perbezaan antara Jepun dan Amerika Syarikat adalah 66% (226,536 orang) — kemungkinan disebabkan pelancong Jepun tertarik dengan iklim tropika yang berbeza daripada negara mereka.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah anda mentafsir sebuah carta pai secara ringkas?",
          hint: "Kenal pasti tajuk dan sektor, nyatakan nilai keseluruhan dan setiap sektor, bandingkan sektor tertinggi dan terendah, huraikan isi tersirat, kemudian buat rumusan keseluruhan.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan ciri-ciri dan kegunaan carta pai.",
    "Saya dapat membina carta pai berdasarkan jadual.",
    "Saya dapat mentafsir carta pai.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Setiap sektor carta pai dilukis mengikut arah lawan jam, daripada nilai terkecil kepada terbesar.",
      answer: false,
      explanation: "Sektor dilukis mengikut ARAH PUTARAN JAM, daripada nilai TERBESAR kepada TERKECIL.",
    },
    {
      type: "multiple-choice",
      question: "Jika satu sektor mewakili 50% daripada data, berapakah saiz sudutnya?",
      options: ["90°", "180°", "270°", "360°"],
      answerIndex: 1,
      explanation: "(50 ÷ 100) × 360° = 180° — separuh daripada bulatan.",
    },
  ],
};
