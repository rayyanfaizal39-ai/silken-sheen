import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch9-pemanasan-global.png";

export const geographyF2C9Interactive: GeoF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "🌡️ Tahukah Anda? — Tahun Terpanas dalam Sejarah",
    body: "Tahun 2016 mencatatkan suhu permukaan bumi terpanas sejak rekod moden bermula pada 1980 — peningkatan sekitar 1.1°C berbanding purata jangka panjang, menurut data NASA.",
    imagePath: chapterImage,
  },
  keywords: ["Pemanasan Global", "Gas Rumah Hijau", "Penyahhutanan", "Amalan 5R", "Protokol Kyoto"],
  sections: [
    {
      number: "9.1",
      title: "Maksud Pemanasan Global",
      intro:
        "Pemanasan global ialah peningkatan suhu atmosfera bumi secara berterusan akibat kesan rumah hijau — melibatkan pertambahan gas karbon dioksida (CO₂), klorofluorokarbon (CFC) dan bahan pencemar lain yang memerangkap haba dalam atmosfera. Sebahagian pancaran matahari terbebas ke angkasa dan sebahagian lagi dipantulkan semula oleh bumi, tetapi gas rumah hijau menyerap dan menyebarkan haba ini ke semua arah — menjadikan bumi semakin panas dari semasa ke semasa.",
      checks: [
        {
          question: "Mengapakah fenomena pemanasan global lebih dirasai di kawasan perindustrian dan perbandaran?",
          hint: "Kawasan ini melepaskan lebih banyak gas rumah hijau daripada kenderaan bermotor, kilang dan pembakaran bahan api fosil, sekali gus memerangkap lebih banyak haba.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Faktor-faktor Pemanasan Global",
      intro:
        "Faktor-faktor pemanasan global terbahagi kepada dua kategori: faktor aktiviti manusia dan faktor semula jadi. Kedua-duanya menyumbang gas rumah hijau ke atmosfera, tetapi aktiviti perindustrian melepaskan paling banyak jenis gas (CO₂, NO₂, CFC), manakala pertanian dan penternakan melepaskan metana (CH₄) dan nitrus oksida (N₂O).",
      tabGroups: [
        {
          title: "Manusia dan alam semula jadi, kedua-duanya menyumbang",
          tabs: [
            {
              title: "Faktor Manusia",
              body: "Aktiviti pertanian menggunakan racun serangga dan baja kimia berlebihan; penyahhutanan besar-besaran bagi pertanian, petempatan dan perindustrian; pembebasan asap oleh kenderaan bermotor dan perindustrian; pembakaran terbuka.",
            },
            {
              title: "Faktor Semula Jadi",
              body: "Letusan gunung berapi yang mengeluarkan asap dan debu menyelubungi atmosfera; penerimaan pancaran matahari yang berlebihan; kebakaran hutan secara semula jadi.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Apakah perkaitan antara gas rumah hijau dengan peningkatan suhu secara global?",
          hint: "Gas rumah hijau memerangkap haba yang sepatutnya dipantulkan semula ke angkasa — semakin banyak gas ini dilepaskan, semakin banyak haba terperangkap, menyebabkan suhu bumi meningkat.",
        },
      ],
    },
    {
      number: "9.3",
      title: "Kesan-kesan Pemanasan Global",
      intro:
        "Pemanasan global mengakibatkan empat kesan utama: peningkatan aras laut (akibat pencairan ais kutub, cth. Greenland), kemerosotan sumber makanan (air laut panas mengganggu ekosistem marin, banjir musnahkan pertanian), gangguan cuaca (taburan hujan tidak menentu, cth. banjir besar Pakistan 2010 yang menjejaskan ~20 juta penduduk) dan masalah kesihatan (gelombang haba, cth. 135 kematian di India pada April 2016 akibat strok haba). Tapkan setiap kesan untuk memahami puncanya.",
      flipCards: [
        {
          id: "aras-laut",
          icon: "🌊",
          label: "Peningkatan Aras Laut",
          fact: "Pencairan ais di kutub dan peningkatan suhu air laut mengakibatkan banjir besar, hakisan, dan menenggelamkan kawasan daratan (cth. Greenland).",
        },
        {
          id: "sumber-makanan",
          icon: "🌾",
          label: "Kemerosotan Sumber Makanan",
          fact: "Air laut yang lebih panas mengganggu ekosistem marin; banjir dan tanah tandus memusnahkan kawasan pertanian.",
        },
        {
          id: "gangguan-cuaca",
          icon: "🌪️",
          label: "Gangguan Cuaca",
          fact: "Peningkatan suhu menyebabkan taburan hujan tidak menentu — banjir besar di sesetengah kawasan, kemarau teruk di kawasan lain.",
        },
        {
          id: "kesihatan",
          icon: "🏥",
          label: "Masalah Kesihatan",
          fact: "Gelombang haba menyebabkan strok haba dan dehidrasi; turut meningkatkan risiko katarak dan kanser kulit.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah pemanasan global boleh mempengaruhi kemerosotan sumber makanan?",
          hint: "Air laut yang lebih panas mengganggu ekosistem marin, manakala banjir dan tanah yang menjadi tandus memusnahkan kawasan pertanian — kedua-duanya mengancam sumber makanan dunia.",
        },
      ],
    },
    {
      number: "9.4",
      title: "Langkah-langkah Mengurangkan Kesan Pemanasan Global",
      intro:
        "Langkah mengurangkan pemanasan global merangkumi pelbagai peringkat — daripada tindakan individu harian sehingga perjanjian antarabangsa yang mengikat banyak negara. Amalan 5R (Rethink, Repair, Reuse, Reduce, Recycle) dan penggunaan tenaga mesra alam (suria, angin, ombak menggantikan bahan api fosil) boleh dimulakan di peringkat individu, manakala kerjasama antarabangsa (Protokol Kyoto 1997, IPCC, Persidangan Paris) dan penguatkuasaan undang-undang memerlukan komitmen kerajaan dan global.",
      accordions: [
        {
          title: "🙋 Tindakan individu",
          body: "Menanam pokok, berkongsi kenderaan, menggunakan pengangkutan awam, amalan kitar semula (5R), kempen bebas plastik.",
        },
        {
          title: "⚡ Tenaga mesra alam",
          body: "Menggantikan bahan api fosil (petroleum, gas asli, arang batu) dengan tenaga suria, angin dan ombak.",
        },
        {
          title: "🌍 Kerjasama antarabangsa",
          body: "Protokol Kyoto 1997, Panel Antara Kerajaan tentang Perubahan Iklim (IPCC), Sidang Kemuncak Bumi Rio 1992, Persidangan Perubahan Iklim Paris 2015 (ditandatangani 30 buah negara).",
        },
        {
          title: "⚖️ Penguatkuasaan undang-undang",
          body: "Akta Perlombongan Petroleum 1966, Akta Perhutanan Negara 1984, Akta Jalan, Parit dan Bangunan (Pindaan) 2012, Akta Kualiti Alam Sekeliling (Pindaan) 2012.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah pendidikan alam sekitar membantu mengurangkan kesan pemanasan global?",
          hint: "Pendidikan alam sekitar yang diserap di peringkat sekolah dan komuniti membentuk kesedaran dan tabiat mesra alam sejak dini, mendorong tindakan jangka panjang untuk mengurangkan pemanasan global.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menyatakan konsep pemanasan global.",
    "Saya dapat menghuraikan faktor manusia dan faktor semula jadi penyebab pemanasan global.",
    "Saya dapat menilai kesan pemanasan global.",
    "Saya dapat membahaskan langkah-langkah mengurangkan pemanasan global.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Penggunaan tenaga solar menyebabkan kenaikan suhu bumi.",
      answer: false,
      explanation: "Tenaga solar adalah tenaga mesra alam yang membantu MENGURANGKAN pemanasan global, bukan menyebabkannya.",
    },
    {
      type: "multiple-choice",
      question: "Apakah nama perjanjian antarabangsa 1997 untuk mengurangkan pencemaran udara dan kesan rumah hijau?",
      options: ["Protokol Kyoto", "Akta Perhutanan", "Dasar Teknologi Hijau", "IPCC"],
      answerIndex: 0,
      explanation: "Protokol Kyoto 1997 — perjanjian antarabangsa untuk mengambil langkah mengurangkan pencemaran udara dan kesan rumah hijau.",
    },
  ],
};
