import type { GeoF3InteractiveContent } from "../interactive-types";

export const geographyF3C6Interactive: GeoF3InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "🌊 Tahukah Anda? — Potensi Tenaga Ombak",
    body: "Perairan Laut China Selatan yang merangkumi Pahang, Terengganu, Kelantan, Sabah dan Sarawak berpotensi untuk penjanaan tenaga ombak pada masa hadapan — kerana mempunyai laut terbuka yang menerima jumlah angin dan arus yang kuat sepanjang tahun.",
  },
  keywords: [
    "Sumber Semula Jadi",
    "Sumber Boleh Baharu",
    "Sumber Tidak Boleh Baharu",
    "Industri Hiliran",
    "Biomas",
    "Geoterma",
  ],
  sections: [
    {
      number: "6.1",
      title: "Sumber Semula Jadi di Malaysia",
      intro:
        "Sumber semula jadi merujuk bahan atau punca yang terdapat di sekeliling kita, sama ada di atas permukaan bumi, di dalam bumi atau di dalam air, yang boleh dimanfaatkan oleh manusia. Sumber semula jadi terbahagi kepada dua jenis utama berdasarkan keupayaannya untuk diperbaharu — sumber boleh baharu dan sumber tidak boleh baharu. Memahami perbezaan antara kedua-duanya penting untuk merancang penerokaan sumber secara mampan.",
      toggles: [
        {
          title: "Dua jenis sumber semula jadi",
          instruction: "Pilih satu jenis sumber untuk melihat penerangan dan contohnya.",
          options: [
            {
              id: "boleh-baharu",
              label: "Sumber Boleh Baharu",
              body: "Sumber semula jadi yang tidak akan habis walaupun diambil dan digunakan secara berterusan — ia boleh diperbaharu melalui beberapa kaedah semula jadi. Contoh: hutan, suria, tanih dan air (sungai, paya, laut, empangan). Sumber tenaga alternatif seperti hidroelektrik, biomas, angin dan geoterma juga tergolong di sini.",
            },
            {
              id: "tidak-boleh-baharu",
              label: "Sumber Tidak Boleh Baharu",
              body: "Sumber semula jadi yang akan habis dalam jangka waktu tertentu sekiranya penerokaan tidak dikawal dan dirancang dengan baik. Terbahagi kepada mineral logam (emas, bijih timah, bijih besi, kuprum, bauksit) dan mineral bukan logam (petroleum, gas asli, arang batu, pasir, batu granit, kaolin).",
            },
          ],
        },
      ],
      matcher: {
        title: "⛏️ Padankan mineral dengan jenisnya",
        instruction:
          "Pilih satu mineral, kemudian pilih sama ada ia mineral logam atau bukan logam.",
        pairs: [
          { id: "emas", label: "Emas", match: "Logam" },
          { id: "bijih-timah", label: "Bijih Timah", match: "Logam" },
          { id: "bauksit", label: "Bauksit", match: "Logam" },
          { id: "petroleum", label: "Petroleum", match: "Bukan Logam" },
          { id: "gas-asli", label: "Gas Asli", match: "Bukan Logam" },
          { id: "batu-granit", label: "Batu Granit", match: "Bukan Logam" },
        ],
      },
      checks: [
        {
          question:
            "Jelaskan perbezaan antara sumber boleh baharu dengan sumber tidak boleh baharu.",
          hint: "Sumber boleh baharu tidak akan habis walaupun digunakan secara berterusan kerana boleh diperbaharu semula secara semula jadi, manakala sumber tidak boleh baharu akan habis dalam jangka masa tertentu jika penerokaannya tidak dikawal.",
        },
      ],
    },
    {
      number: "6.2",
      title: "Taburan Sumber Boleh Baharu dan Sumber Tidak Boleh Baharu di Malaysia",
      intro:
        "Taburan sumber semula jadi di Malaysia dipengaruhi oleh kedudukan geografi dan struktur geologi negara. Sumber boleh baharu seperti air tertumpu di kawasan yang menerima hujan lebat, manakala sumber tidak boleh baharu seperti mineral logam dan bukan logam tertumpu di kawasan tertentu berdasarkan formasi batuan yang terbentuk berjuta-juta tahun lalu.",
      cards: [
        {
          title: "💧 Air — kuasa hidroelektrik",
          body: "Jumlah hujan kira-kira 2,600 mm setahun menjadikan Malaysia amat berpotensi membangunkan kuasa hidroelektrik.",
          detail:
            "Empangan Bakun (Sarawak) merupakan empangan terbesar Malaysia, mampu menjana 2,400 MV — pada 2020, dianggarkan 60% penjanaan tenaga elektrik Sarawak bersumberkan hidroelektrik.",
        },
      ],
      accordions: [
        {
          title: "🛢️ Petroleum",
          body: "Diterokai di kawasan luar pesisir (offshore) Kelantan, Terengganu, Sabah dan Sarawak — menjadi sumber pendapatan eksport utama negara melalui Petronas.",
        },
        {
          title: "🔥 Gas Asli",
          body: "Diterokai bersama petroleum di kawasan luar pesisir yang sama — Kelantan, Terengganu, Sabah dan Sarawak — dan diproses di kilang seperti Kompleks Petrokimia Kerteh.",
        },
        {
          title: "🥇 Emas",
          body: "Kawasan pengeluaran utama termasuk Raub dan Kuala Lipis (Pahang) serta Bau (Sarawak), yang telah diterokai sejak era penjajahan British.",
        },
        {
          title: "⚫ Arang Batu",
          body: "Diterokai di Silimpopon (Sabah) dan Bintulu (Sarawak), digunakan terutamanya sebagai bahan api untuk penjanaan kuasa elektrik.",
        },
      ],
      checks: [
        {
          question: "Apakah tujuan pembinaan stesen jana kuasa hidroelektrik di Malaysia?",
          hint: "Memanfaatkan jumlah hujan yang tinggi untuk menghasilkan tenaga elektrik secara mampan — air sungai yang diempang dilepaskan untuk memutarkan turbin dan menjana elektrik.",
        },
      ],
    },
    {
      number: "6.3",
      title: "Kepentingan Sumber Semula Jadi dalam Pembangunan Ekonomi di Malaysia",
      intro:
        "Sumber semula jadi merupakan tunjang penting kepada pembangunan ekonomi Malaysia sejak zaman sebelum merdeka hinggalah kini. Daripada bahan mentah industri kepada pembukaan bandar baharu, kekayaan sumber semula jadi negara telah membentuk landskap ekonomi dan infrastruktur yang kita nikmati hari ini.",
      flipCards: [
        {
          id: "bahan-mentah",
          icon: "📦",
          label: "Sumber Bahan Mentah",
          fact: "Petroleum menjadi bahan mentah industri petrokimia, pasir untuk pembinaan, dan kayu balak untuk industri perabot.",
        },
        {
          id: "peluang-pekerjaan",
          icon: "💼",
          label: "Peluang Pekerjaan",
          fact: "Sektor perkhidmatan menampung 55.3% pekerja negara; sumber semula jadi turut membuka peluang pekerjaan di sektor pembuatan, pertanian dan perlombongan.",
        },
        {
          id: "pendapatan-negara",
          icon: "💰",
          label: "Menjana Pendapatan Negara",
          fact: "Sektor yang berkaitan dengan bahan mentah seperti petroleum dan gas asli menyumbang secara besar-besaran kepada Keluaran Dalam Negara Kasar (KDNK) negara.",
        },
        {
          id: "infrastruktur",
          icon: "🏗️",
          label: "Kemajuan Infrastruktur",
          fact: "Pendapatan hasil sumber semula jadi membiayai pembangunan jalan raya, pelabuhan, lapangan terbang dan landasan kereta api.",
        },
        {
          id: "kawasan-baharu",
          icon: "🏙️",
          label: "Pembukaan Kawasan Baharu",
          fact: "Penerokaan sumber semula jadi membawa kepada pembangunan bandar baharu seperti Kerteh, Paka, Bintulu dan Sandakan.",
        },
      ],
      checks: [
        {
          question: "Berikan dua contoh industri hiliran yang terdapat di Malaysia.",
          hint: "Contohnya: industri petrokimia (daripada petroleum dan gas asli) dan industri pembuatan perabot (daripada kayu balak).",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menamakan sumber semula jadi di Malaysia.",
    "Saya dapat mengenal pasti taburan sumber boleh baharu dan tidak boleh baharu.",
    "Saya dapat menghuraikan sumber boleh baharu dan tidak boleh baharu.",
    "Saya dapat merumuskan kepentingan sumber semula jadi dalam pembangunan ekonomi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Petroleum tergolong dalam sumber mineral logam.",
      answer: false,
      explanation:
        "Salah — petroleum ialah mineral bukan logam; mineral logam termasuk emas, bijih timah, bijih besi, kuprum dan bauksit.",
    },
    {
      type: "multiple-choice",
      question: "Empangan manakah yang merupakan empangan hidroelektrik terbesar di Malaysia?",
      options: ["Empangan Kenyir", "Empangan Bakun", "Empangan Temenggor", "Empangan Chenderoh"],
      answerIndex: 1,
      explanation:
        "Empangan Bakun (Sarawak) — mampu menjana 2,400 MV tenaga elektrik, menjadikannya empangan hidroelektrik terbesar di Malaysia.",
    },
  ],
};
