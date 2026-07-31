import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch2-peta-topografi.png";

export const geographyF2C2Interactive: GeoF2InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "🧭 Tahukah Anda? — JUPEM",
    body: "Jabatan Ukur dan Pemetaan Malaysia (JUPEM) bertanggungjawab menerbitkan semua peta topografi rasmi negara — digunakan untuk perancangan bandar, pengurusan sumber asli, hingga keselamatan negara.",
    imagePath: chapterImage,
  },
  keywords: [
    "Peta Topografi",
    "Garisan Timuran",
    "Garisan Utaraan",
    "Rujukan Grid",
    "Ciri Pandang Darat Fizikal",
    "Ciri Pandang Darat Budaya",
  ],
  sections: [
    {
      number: "2.1",
      title: "Maksud Peta Topografi",
      intro:
        "Peta topografi ialah peta yang menunjukkan keadaan bentuk muka bumi sesebuah kawasan dan mempunyai garisan grid secara melintang dan menegak. Peta ini menggambarkan ciri pandang darat fizikal dan ciri pandang darat budaya sesuatu kawasan, dilukis menggunakan skala dan simbol-simbol tertentu. Setiap peta topografi yang lengkap mesti mempunyai tiga elemen wajib: tajuk peta, petunjuk dan skala — sama seperti elemen wajib pada peta lakar yang telah dipelajari dalam Bab 1.",
      checks: [
        {
          question: "Senaraikan ciri yang mesti ada pada sebuah peta topografi yang lengkap.",
          hint: "Tajuk, petunjuk, skala, dan garisan grid (timuran dan utaraan).",
        },
      ],
    },
    {
      number: "2.2",
      title: "Garisan Timuran dan Garisan Utaraan",
      intro:
        "Garisan grid ialah garisan-garisan dalam peta topografi yang dilukis secara menegak dan melintang, terbahagi kepada dua jenis: garisan timuran dan garisan utaraan.",
      tabs: [
        {
          title: "Garisan Timuran",
          body: "Garisan grid yang dilukis secara menegak, menunjukkan kedudukan sesuatu tempat ke arah timur. Nilainya bertambah ke arah timur.",
        },
        {
          title: "Garisan Utaraan",
          body: "Garisan grid yang dilukis secara melintang, menunjukkan kedudukan sesuatu tempat ke arah utara. Nilainya bertambah ke arah utara.",
        },
      ],
      checks: [
        {
          question: "Apakah yang dimaksudkan dengan garisan timuran?",
          hint: "Garisan grid menegak yang menunjukkan kedudukan sesuatu tempat ke arah timur, dengan nilai bertambah ke arah timur.",
        },
      ],
    },
    {
      number: "2.3",
      title: "Rujukan Grid",
      intro:
        "Rujukan grid ialah kombinasi antara nilai garisan timuran dengan nilai garisan utaraan pada titik persilangan — dengan itu kita dapat menentukan kedudukan sesuatu tempat atau objek dengan mudah pada peta. Peraturan penting: nilai garisan timuran SENTIASA dibaca dan ditulis dahulu, diikuti garisan utaraan (dikenali sebagai 'Right then Up').",
      cards: [
        {
          title: "Rujukan Grid 4 Angka",
          body: "Sesuai digunakan untuk menentukan kedudukan sesuatu kawasan yang luas seperti kawasan hutan, kawasan pertanian dan perlombongan. Terdiri daripada 2 digit nilai garisan timuran diikuti 2 digit nilai garisan utaraan.",
          detail: "cth: RG 3153",
        },
        {
          title: "Rujukan Grid 6 Angka",
          body: "Digunakan untuk menentukan kedudukan sesuatu objek yang spesifik seperti sekolah, masjid, puncak bukit dan kilang. Terdiri daripada 3 digit nilai garisan timuran diikuti 3 digit nilai garisan utaraan — setiap segi empat grid dibahagikan kepada 10 bahagian yang sekata untuk mendapatkan ketepatan ini.",
          detail: "cth: RG 314533",
        },
      ],
      gridReference: {
        title: "📍 Baca rujukan grid sendiri",
        instruction: "Kilang ditandakan pada grid di bawah. Cuba baca rujukan gridnya — mula dengan rujukan grid 4 angka.",
        eastingLines: [30, 31, 32, 33],
        northingLines: [52, 53, 54, 55],
        point: { icon: "🏭", label: "Kilang", easting: 31.4, northing: 53.3 },
        fourFigure: {
          options: [
            { label: "RG 3153", correct: true },
            { label: "RG 3253", correct: false },
            { label: "RG 3053", correct: false },
            { label: "RG 3154", correct: false },
          ],
          correctFeedback: "✓ Betul! Garisan timuran 31, garisan utaraan 53.",
          incorrectFeedback: "✗ Cuba lihat semula — nilai timuran dibaca dahulu (31), diikuti utaraan (53).",
        },
        sixFigure: {
          options: [
            { label: "RG 314533", correct: true },
            { label: "RG 315343", correct: false },
            { label: "RG 313522", correct: false },
            { label: "RG 314353", correct: false },
          ],
          correctFeedback: "✓ Tepat! RG 314533 — bahagian kecil dalam grid dibaca dengan lebih spesifik.",
          incorrectFeedback: "✗ Belum tepat — lihat kedudukan titik dalam segi empat grid dengan lebih teliti.",
        },
      },
      checks: [
        {
          question: "Nilai manakah yang dibaca dahulu — garisan timuran atau garisan utaraan?",
          hint: "Garisan timuran dibaca dahulu, diikuti garisan utaraan.",
        },
      ],
    },
    {
      number: "2.4",
      title: "Ciri Pandang Darat Fizikal dan Ciri Pandang Darat Budaya",
      intro:
        "Ciri pandang darat fizikal merujuk pelbagai bentuk muka bumi semula jadi seperti saliran dan tumbuh-tumbuhan semula jadi. Ciri pandang darat budaya pula merujuk ciri buatan manusia seperti guna tanah, kegiatan ekonomi penduduk, petempatan, kemudahan sosial serta pengangkutan dan perhubungan. Pada umumnya, ciri pandang darat fizikal akan mempengaruhi kewujudan ciri pandang darat budaya di sesuatu kawasan — contohnya, tanah pamah yang subur menggalakkan pertanian padi sawah dan petempatan yang padat.",
      cards: [
        {
          title: "🏔️ Ciri Pandang Darat Fizikal",
          body: "Bentuk muka bumi, saliran dan tumbuh-tumbuhan semula jadi.",
          detail: "Contoh: bukit, sungai, hutan, paya bakau",
        },
        {
          title: "🏘️ Ciri Pandang Darat Budaya",
          body: "Guna tanah, kegiatan ekonomi, petempatan dan kemudahan sosial buatan manusia.",
          detail: "Contoh: jalan raya, sekolah, ladang getah, jambatan",
        },
      ],
      accordions: [
        {
          title: "🌾 Tanah pamah",
          body: "Pertanian (padi sawah, nanas), pengangkutan (jalan raya, lapangan terbang), petempatan dan kemudahan sosial.",
        },
        {
          title: "⛰️ Tanah beralun",
          body: "Pertanian getah dan kelapa sawit, petempatan.",
        },
        {
          title: "🏔️ Tanah tinggi",
          body: "Pertanian teh dan sayur-sayuran hawa sederhana, pelancongan, kuasa hidroelektrik (empangan).",
        },
        {
          title: "🌊 Pinggir laut",
          body: "Perikanan (petempatan nelayan, pelabuhan), pelancongan (jeti, tempat berkelah).",
        },
      ],
      checks: [
        {
          question: "Mengapa ladang getah lebih banyak terdapat di tanah beralun berbanding tanah pamah?",
          hint: "Tanah beralun mempunyai saliran yang baik dan sesuai untuk tanaman getah, berbanding tanah pamah yang lebih sesuai untuk padi sawah.",
        },
      ],
    },
    {
      number: "2.5",
      title: "Mentafsir Peta Topografi",
      intro:
        "Mentafsir peta topografi bermaksud mengenal pasti dan menghubungkaitkan ciri pandang darat fizikal dengan ciri pandang darat budaya sesuatu kawasan berdasarkan maklumat yang terdapat pada peta, bagi memahami taburan penduduk, kedudukan dan pola petempatan sesuatu kawasan.",
      accordions: [
        {
          title: "1️⃣ Perhatikan peta secara keseluruhan",
          body: "Dapatkan gambaran umum tentang kawasan kajian.",
        },
        {
          title: "2️⃣ Kenal pasti ciri-ciri",
          body: "Cari ciri pandang darat fizikal dan ciri pandang darat budaya yang terdapat dalam peta.",
        },
        {
          title: "3️⃣ Kaitkan kedua-duanya",
          body: "Hubungkaitkan ciri fizikal dengan ciri budaya — contohnya, kenapa petempatan tertumpu di tanah pamah.",
        },
        {
          title: "4️⃣ Tafsirkan",
          body: "Buat kesimpulan menggunakan maklumat dan bukti yang terdapat dalam peta, termasuk rujukan grid jika berkaitan.",
        },
      ],
      checks: [
        {
          question: "Sebuah pekan mempunyai pola petempatan berpusat dengan sekolah, klinik dan balai polis. Apakah ini menunjukkan tentang kawasan itu?",
          hint: "Ia menunjukkan kawasan tersebut menjadi tumpuan penduduk kerana kemudahan sosial yang lengkap.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menyatakan maksud peta topografi.",
    "Saya dapat membaca rujukan grid 4 angka dan 6 angka.",
    "Saya dapat menganalisis hubung kait ciri fizikal dan ciri budaya.",
    "Saya dapat mentafsir peta topografi secara keseluruhan.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Garisan utaraan dilukis secara menegak.",
      answer: false,
      explanation: "Garisan utaraan dilukis secara melintang — garisan timuranlah yang menegak.",
    },
    {
      type: "multiple-choice",
      question: "Rujukan grid manakah yang lebih spesifik untuk menentukan kedudukan sebuah sekolah?",
      options: ["Rujukan grid 4 angka", "Rujukan grid 6 angka", "Kedua-duanya sama spesifik", "Tiada satu pun"],
      answerIndex: 1,
      explanation: "Rujukan grid 6 angka membahagikan setiap segi empat grid kepada 10 bahagian lagi — lebih spesifik untuk objek tertentu seperti sekolah.",
    },
  ],
};
