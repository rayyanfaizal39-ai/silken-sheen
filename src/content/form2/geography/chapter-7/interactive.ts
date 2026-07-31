import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch7-kepelbagaian-iklim-di-asia.png";

export const geographyF2C7Interactive: GeoF2InteractiveContent = {
  chapter: 7,
  blogHighlight: {
    title: "🥶 Tahukah Anda? — Tempat Paling Sejuk Didiami Manusia",
    body: "Oymyakon di Rusia merupakan petempatan manusia paling sejuk di dunia (-67.7°C) — lebih sejuk daripada mana-mana bandar lain yang berpenghuni, walaupun masih tidak sesejuk Vostok di Antartika (-89.2°C), tempat paling sejuk di dunia keseluruhannya.",
    imagePath: chapterImage,
  },
  keywords: ["Zon Iklim", "Iklim Tundra", "Iklim Laurentia", "Iklim China", "Iklim Gurun Panas", "Oasis", "Kerpasan"],
  sections: [
    {
      number: "7.1",
      title: "Kepelbagaian Iklim di Asia",
      intro:
        "Benua Asia yang luas merentasi banyak garis lintang — daripada Garisan Artik di utara hingga berhampiran Khatulistiwa di selatan — menghasilkan empat zon iklim utama: zon sejuk, zon sejuk sederhana, zon panas sederhana dan zon panas. Secara keseluruhan, Asia mengalami sembilan jenis iklim (Tundra, Siberia, Laurentia, Mediterranean, Steppe, China, Gurun Panas, Monsun Tropika dan Khatulistiwa), tersusun mengikut latitud — semakin jauh dari Khatulistiwa, semakin sejuk iklimnya. Setiap zon mempunyai ciri suhu dan hujan yang sangat berbeza, membentuk cara hidup yang berlainan bagi penduduknya.",
      checks: [
        {
          question: "Mengapakah terdapat kepelbagaian iklim di Asia?",
          hint: "Kerana Benua Asia merentasi garis lintang yang sangat luas — dari kawasan Artik yang sejuk hingga kawasan khatulistiwa yang panas — setiap kawasan menerima pancaran matahari yang berbeza.",
        },
      ],
    },
    {
      number: "7.2–7.6",
      title: "Ciri Iklim Mengikut Zon di Asia",
      intro:
        "Setiap zon iklim mempunyai ciri suhu, hujan dan angin yang tersendiri, yang seterusnya membentuk kegiatan ekonomi penduduknya. Zon sejuk (iklim Tundra) mengalami musim sejuk yang panjang (lapan bulan, -32°C hingga -55°C) dan hujan tahunan yang sedikit (250-300 mm) — pertanian hampir mustahil, jadi penduduk seperti orang Eskimo di Siberia bergantung kepada perikanan dan pemburuan. Zon sejuk sederhana (iklim Laurentia, China utara/Korea Utara/Jepun utara) mengalami empat musim dengan musim panas sederhana (21°C-26°C) yang sesuai untuk tanaman jangka pendek. Zon panas sederhana (iklim China) menerima hujan lebih banyak (508-1520 mm, kebanyakannya hujan siklon) dan musim panas lebih panas (28°C), sesuai untuk padi, gandum dan penternakan. Zon panas (iklim Gurun Panas di Arab Saudi) pula panas dan kering sepanjang tahun (32°C-38°C, hujan kurang 250 mm) — pertanian hanya tertumpu di kawasan oasis yang subur berair.",
      zoneExplorer: {
        title: "🌍 Terokai setiap zon iklim",
        instruction: "Pilih satu zon untuk melihat ciri suhu, hujan, negara contoh dan kegiatan ekonomi penduduknya.",
        examplesLabel: "Negara contoh",
        activitiesLabel: "Kegiatan ekonomi",
        zones: [
          {
            name: "Zon Sejuk (Tundra)",
            facts: [
              { label: "Suhu musim panas", value: "Tidak melebihi 10°C (Mei–Ogos)" },
              { label: "Suhu musim sejuk", value: "-32°C hingga -55°C (8 bulan)" },
              { label: "Hujan tahunan", value: "250–300 mm, kebanyakan salji" },
            ],
            examples: ["Rusia (utara)", "Siberia (Artik)"],
            activities: [
              "🎣 Menangkap ikan salmon dan kod menggunakan harpoon pada musim panas yang pendek",
              "🏹 Memburu walrus dan beruang kutub pada musim sejuk untuk daging, kulit dan lemak",
            ],
          },
          {
            name: "Zon Sejuk Sederhana (Laurentia)",
            facts: [
              { label: "Suhu musim panas", value: "21°C–26°C" },
              { label: "Suhu musim sejuk", value: "-6°C hingga -10°C" },
              { label: "Hujan tahunan", value: "500–1000 mm" },
            ],
            examples: ["China (utara)", "Korea Utara", "Jepun (utara)"],
            activities: [
              "🌾 Penanaman sayur-sayuran dan buah-buahan di Hokkaido dan Dataran Manchuria",
              "🐟 Perikanan kaya hasil di Lautan Pasifik — Hakodate, Wakkanai dan Kushiro",
            ],
          },
          {
            name: "Zon Panas Sederhana (China)",
            facts: [
              { label: "Suhu musim panas", value: "28°C (Mei–September)" },
              { label: "Suhu musim sejuk", value: "~5°C (Oktober–April)" },
              { label: "Hujan tahunan", value: "508–1520 mm, kebanyakan hujan siklon" },
            ],
            examples: ["China (tengah/selatan)", "Korea Selatan", "Jepun (selatan)", "Taiwan (utara)"],
            activities: [
              "🌾 Padi di Lembah Sungai Yangtze; gandum dan teh di Dataran China Tengah",
              "🐄 Penternakan lembu, ayam dan khinzir di Shandong, Hunan dan sekitarnya",
            ],
          },
          {
            name: "Zon Panas (Gurun Panas)",
            facts: [
              { label: "Suhu musim panas", value: "32°C hingga 38°C" },
              { label: "Suhu musim sejuk", value: "~16°C" },
              { label: "Hujan tahunan", value: "Kurang daripada 250 mm" },
            ],
            examples: ["Arab Saudi (Gurun Arab)"],
            activities: [
              "🌴 Penanaman pokok kurma secara ladang di kawasan oasis (Qasim)",
              "🐫 Penternakan unta, kambing dan biri-biri tahan kemarau untuk daging, susu dan kulit",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah kegiatan pertanian amat terhad di kawasan Gurun Panas?",
          hint: "Jumlah hujan tahunan yang kurang daripada 250 mm menyebabkan keadaan gersang — hanya tanaman tahan kemarau seperti pokok kurma yang dapat tumbuh, itu pun terhad di kawasan oasis.",
        },
        {
          question: "Mengapa kegiatan perikanan penting di kawasan beriklim sejuk (Tundra)?",
          hint: "Kerana pertanian hampir mustahil dijalankan akibat suhu ekstrem — perikanan dan pemburuan menjadi sumber protein utama penduduk seperti orang Eskimo.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti kepelbagaian iklim di Asia.",
    "Saya dapat menerangkan ciri setiap zon iklim di Asia.",
    "Saya dapat menunjukkan negara yang mengalami setiap zon iklim.",
    "Saya dapat membandingkan pengaruh iklim terhadap kegiatan manusia di Asia.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Musim sejuk di kawasan beriklim Tundra adalah panjang, iaitu selama lapan bulan.",
      answer: true,
      explanation: "Betul — musim sejuk Tundra sangat panjang dan sejuk, antara -32°C hingga -55°C.",
    },
    {
      type: "multiple-choice",
      question: "Tanaman padi di China ditanam terutamanya di kawasan manakah?",
      options: ["Lembah Sungai Yangtze", "Gurun Gobi", "Dataran China Tengah", "Pergunungan Himalaya"],
      answerIndex: 0,
      explanation: "Lembah Sungai Yangtze — suhu musim panas 28°C dan hujan tahunan melebihi 1,000 mm sesuai untuk penanaman padi.",
    },
  ],
};
