import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch3-pergerakan-bumi-cuaca-iklim.png";

export const geographyF2C3Interactive: GeoF2InteractiveContent = {
  chapter: 3,
  blogHighlight: {
    title: "🌗 Tahukah Anda? — Gerhana Matahari 2016",
    body: "Pada 9 Mac 2016, gerhana matahari penuh dapat dilihat di beberapa kawasan Asia Tenggara — semasa gerhana penuh, langit menjadi hampir gelap sepenuhnya kecuali seberkas cahaya terang di sekeliling matahari yang dikenali sebagai Korona.",
    imagePath: chapterImage,
  },
  keywords: ["Putaran Bumi", "Peredaran Bumi", "Paksi Bumi", "Daya Koriolis", "Ekuinoks", "Solstis", "Orbit"],
  sections: [
    {
      number: "3.1",
      title: "Pergerakan Bumi",
      intro:
        "Sistem suria terdiri daripada Matahari dan lapan buah planet utama yang beredar mengelilingi Matahari mengikut orbit masing-masing — orbit ialah laluan yang dilalui oleh sesuatu planet atau satelit dalam pergerakannya. Bumi bergerak melalui dua cara serentak: berputar pada paksinya sambil beredar mengelilingi Matahari mengikut orbitnya yang berbentuk elips (bujur) — kedua-dua pergerakan ini berlaku pada masa yang sama, tidak berasingan.",
      flipCards: [
        {
          id: "putaran",
          icon: "🌎",
          label: "Putaran Bumi",
          fact: "Bumi berputar pada paksinya sendiri — dari barat ke timur, mengambil masa 24 jam (sehari) untuk satu pusingan lengkap.",
        },
        {
          id: "peredaran",
          icon: "☀️",
          label: "Peredaran Bumi",
          fact: "Bumi bergerak mengelilingi Matahari mengikut orbit berbentuk elips, mengambil masa 365¼ hari (setahun) untuk satu peredaran lengkap.",
        },
      ],
      checks: [
        {
          question: "Nyatakan dua cara pergerakan bumi.",
          hint: "Putaran bumi (pada paksinya) dan peredaran bumi (mengelilingi matahari).",
        },
      ],
    },
    {
      number: "3.2",
      title: "Putaran Bumi",
      intro:
        "Bumi berputar pada paksinya yang condong pada sudut 23½° pada satah ekliptika, dari arah barat ke timur (lawan pusingan jam). Satu putaran lengkap mengambil masa 24 jam — satu hari. Kecondongan paksi ini tidak berubah sepanjang putaran dan peredaran Bumi, dan menjadi punca utama kewujudan empat musim yang akan dipelajari dalam 3.3.",
      accordions: [
        {
          title: "🌗 Kejadian siang dan malam",
          body: "Bahagian bumi yang menghadap matahari mengalami waktu siang; bahagian yang tidak menerima pancaran matahari mengalami waktu malam. Kerana Bumi berputar berterusan, setiap bahagian permukaan Bumi mengalami siang dan malam secara bergilir-gilir dalam tempoh 24 jam.",
        },
        {
          title: "🕐 Perbezaan waktu tempatan",
          body: "Bumi mengambil masa 24 jam melengkapkan satu putaran (360°), jadi setiap 15° longitud bersamaan dengan 1 jam perbezaan waktu. Kawasan yang terletak lebih ke timur mengalami waktu yang lebih awal berbanding kawasan di sebelah barat, kerana Bumi berputar dari barat ke timur.",
        },
        {
          title: "💨 Pembiasan angin lazim",
          body: "Putaran Bumi dari barat ke timur menyebabkan kewujudan Daya Koriolis, yang membiaskan arah tiupan angin lazim dan arus laut — ke kanan daripada arah tujuannya di hemisfera utara, ke kiri daripada arah asalnya di hemisfera selatan.",
        },
        {
          title: "🌊 Kejadian pasang surut",
          body: "Tarikan graviti Bulan (dan Matahari) menarik jasad air di Bumi, menyebabkan sebahagian kawasan mengalami air pasang manakala kawasan lain mengalami air surut pada masa yang sama — berlaku dua kali pasang dan dua kali surut dalam tempoh 24 jam.",
        },
      ],
      tabGroups: [
        {
          title: "🌊 Dua jenis pasang surut",
          tabs: [
            {
              title: "Pasang Perbani",
              body: "Berlaku apabila Bulan, Bumi dan Matahari berada dalam kedudukan satu garis lurus — menghasilkan air pasang besar.",
            },
            {
              title: "Pasang Anak",
              body: "Berlaku apabila Bulan, Matahari dan Bumi berada pada sudut tegak antara satu sama lain — menghasilkan pasang yang lebih kecil.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Mengapakah perlawanan sukan di Brazil disiarkan pada waktu berbeza di negara lain?",
          hint: "Kerana putaran bumi mewujudkan zon waktu berbeza — setiap tempat mengalami waktu tempatan yang berlainan berdasarkan kedudukan longitudnya (setiap 15° = 1 jam).",
        },
      ],
    },
    {
      number: "3.3",
      title: "Peredaran Bumi",
      intro:
        "Bumi beredar mengelilingi Matahari mengikut orbit berbentuk elips (bujur) dan arah lawan jam. Satu peredaran lengkap mengambil masa 365¼ hari — satu tahun. Perihelion (kedudukan Bumi paling hampir dengan Matahari, kira-kira 147 juta km) berlaku pada bulan Januari; Aphelion (kedudukan paling jauh, kira-kira 152 juta km) berlaku pada bulan Julai. Peredaran Bumi dan kecondongan paksinya menyebabkan kedudukan Matahari tengah hari berubah-ubah sepanjang tahun, menghasilkan kejadian empat musim di kawasan beriklim sederhana (musim bunga, musim panas, musim luruh dan musim sejuk) serta fenomena gerhana.",
      sequence: {
        title: "🌍 Ikuti kedudukan bumi sepanjang tahun",
        instruction: "Langkah demi langkah, lihat bagaimana kedudukan bumi menentukan musim di setiap hemisfera.",
        steps: [
          {
            title: "Ekuinoks Musim Bunga",
            body: "21 Mac — matahari tengah hari tegak di Garisan Khatulistiwa. Hemisfera utara: musim bunga. Hemisfera selatan: musim luruh. Siang dan malam sama panjang hampir di seluruh bumi.",
            detail: "🌸",
          },
          {
            title: "Solstis Musim Panas",
            body: "21 Jun — matahari tengah hari tegak di Garisan Sartan (23½°U). Hemisfera utara: musim panas (siang lebih panjang). Hemisfera selatan: musim sejuk. Kutub Utara: 24 jam siang.",
            detail: "☀️",
          },
          {
            title: "Ekuinoks Musim Luruh",
            body: "23 September — matahari tengah hari tegak di Garisan Khatulistiwa semula. Hemisfera utara: musim luruh. Hemisfera selatan: musim bunga. Siang dan malam sama panjang lagi.",
            detail: "🍂",
          },
          {
            title: "Solstis Musim Sejuk",
            body: "22 Disember — matahari tengah hari tegak di Garisan Jadi (23½°S). Hemisfera utara: musim sejuk (malam lebih panjang). Hemisfera selatan: musim panas. Kutub Selatan: 24 jam siang.",
            detail: "❄️",
          },
        ],
      },
      tabGroups: [
        {
          title: "🌑 Fenomena gerhana",
          tabs: [
            {
              title: "Gerhana Bulan",
              body: "Bumi berada di antara Matahari dan Bulan (Matahari–Bumi–Bulan segaris) — bayang-bayang Bumi menutupi Bulan, menghalang cahaya Matahari daripada terpancar ke Bulan.",
            },
            {
              title: "Gerhana Matahari",
              body: "Bulan berada di antara Matahari dan Bumi (Matahari–Bulan–Bumi segaris) — bayang-bayang Bulan melindungi sebahagian Bumi. Kerana Bulan lebih kecil daripada Bumi, gerhana matahari hanya kelihatan di kawasan tertentu (zon umbra/penumbra), tidak meliputi seluruh permukaan Bumi.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "John meraikan Krismas pada musim panas di Perth, Australia. Apakah musim yang dialami Andrew di London pada hari yang sama?",
          hint: "Musim sejuk — kerana Perth berada di hemisfera selatan dan London di hemisfera utara, kedua-duanya mengalami musim bertentangan pada masa yang sama.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti dua cara pergerakan bumi.",
    "Saya dapat menerangkan putaran bumi dan peredaran bumi.",
    "Saya dapat menunjukkan kesan putaran bumi dan peredaran bumi.",
    "Saya dapat membahaskan kesan pergerakan bumi terhadap cuaca dan iklim.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Satu peredaran bumi mengelilingi matahari mengambil masa 24 jam.",
      answer: false,
      explanation: "24 jam adalah tempoh putaran bumi. Peredaran bumi mengelilingi matahari mengambil masa 365¼ hari.",
    },
    {
      type: "multiple-choice",
      question: "Pada 22 Disember, matahari tengah hari tegak di atas garisan manakah?",
      options: ["Garisan Khatulistiwa", "Garisan Sartan", "Garisan Jadi", "Garisan Tarikh Antarabangsa"],
      answerIndex: 2,
      explanation: "Solstis musim sejuk (22 Disember) — matahari tengah hari tegak di atas Garisan Jadi (23½°S), menyebabkan hemisfera utara mengalami musim sejuk.",
    },
  ],
};
