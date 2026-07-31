import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch5-pengangkutan-di-malaysia.png";

export const geographyF2C5Interactive: GeoF2InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "🚇 Tahukah Anda? — Terowong SMART",
    body: "Terowong Pengurusan Air Banjir dan Jalan Raya (SMART) di Kuala Lumpur berfungsi dua peranan sekaligus — laluan kenderaan dan saliran air banjir kilat — menjadikannya terowong lencongan air terpanjang di Asia Tenggara.",
    imagePath: chapterImage,
  },
  keywords: ["Jaringan Pengangkutan", "Bandar Satelit", "Pengangkutan Lestari", "e-panggilan", "Rel Bersepadu"],
  sections: [
    {
      number: "5.1",
      title: "Pengangkutan Darat di Malaysia",
      intro:
        "Malaysia mempunyai jaringan jalan raya yang maju, lebih tertumpu di pantai barat berbanding pantai timur Semenanjung Malaysia. Terdapat empat jenis jalan: jalan raya persekutuan, jalan bandaran, jalan berturap dan jalan tidak berturap. Antara lebuh raya utama ialah Lebuhraya Utara-Selatan (Bukit Kayu Hitam, Kedah ke Johor Bahru, Johor — 847.7 km, terpanjang di Malaysia), Lebuhraya Pantai Timur, Lebuhraya Timur-Barat dan Lebuhraya Pan Borneo (dalam pembinaan, Sabah dan Sarawak). Landasan kereta api pertama Malaysia (13 km, dibuka 1885 oleh Syarikat Perlombongan Bijih Timah, Port Weld ke Bukit Berapit) mengangkut bijih timah; kini landasan utama Semenanjung menganjur dari Padang Besar ke Johor Bahru, dengan Stesen Kereta Api Gemas sebagai persimpangan pantai timur dan pantai barat. Di Sabah, Jabatan Keretapi Negeri Sabah menghubungkan Tanjung Aru, Papar, Beaufort dan Tenom.",
      checks: [
        {
          question: "Mengapakah tiada perkhidmatan kereta api di Terengganu dan Sarawak?",
          hint: "Bentuk muka bumi yang bertanah tinggi dan berhutan tebal menyukarkan dan meningkatkan kos pembinaan landasan kereta api di kawasan tersebut.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Pengangkutan Udara dan Air di Malaysia",
      intro:
        "Malaysia mempunyai sistem lapangan terbang yang lengkap dan bertaraf dunia: 6 lapangan terbang antarabangsa (Kuala Lumpur, klia2, Pulau Pinang, Senai, Kota Kinabalu, Kuching, Langkawi), 16 lapangan terbang domestik dan 18 padang terbang. Pelabuhan merupakan rangkaian pengangkutan penting untuk urusan perdagangan — Pelabuhan Klang (Pusat Muatan Negara, terdiri daripada Northport dan Westport), Pelabuhan Tanjung Pelepas (terminal kontena paling canggih, Port/Terminal of the Year 2017), Pelabuhan Bintulu (laluan tunggal eksport gas asli cecair/LNG) dan Pelabuhan Kontena Teluk Sepanggar (kendalikan ~70% eksport-import kontena Sabah) antara yang utama.",
      cards: [
        {
          title: "Ciri-ciri pelabuhan yang baik",
          body: "Terletak di kawasan perairan yang terlindung, mempunyai jaringan dengan kaedah pengangkutan lain, serta mempunyai perkhidmatan sokongan yang lengkap.",
        },
      ],
      checks: [
        {
          question: "Apakah kepentingan pelabuhan di Malaysia?",
          hint: "Merancakkan ekonomi negara melalui urusan perdagangan import dan eksport, serta menghubungkan Malaysia dengan negara luar.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Pengangkutan Awam di Malaysia",
      intro:
        "Pengangkutan awam di Malaysia terbahagi kepada tiga kategori mengikut medium: darat, air dan udara. Darat merangkumi jalan raya (bas, teksi, e-panggilan) dan rel bersepadu (Monorel, KTM Komuter, KTM Antarabandar, LRT, MRT, KLIA Ekspres/Transit, ETS); air merangkumi feri dan bot ekspres; udara merangkumi kapal terbang. e-panggilan (e-hailing) bermaksud proses menempah kereta, teksi atau pengangkutan awam lain melalui komputer atau peranti bergerak.",
      flipCards: [
        {
          id: "jalan-raya",
          icon: "🚕",
          label: "Jalan Raya",
          fact: "Bas, teksi, e-panggilan (e-hailing).",
        },
        {
          id: "rel-bersepadu",
          icon: "🚆",
          label: "Rel Bersepadu",
          fact: "Monorel, KTM Komuter, KTM Antarabandar, LRT, MRT, KLIA Ekspres/Transit, ETS.",
        },
        {
          id: "udara-air",
          icon: "✈️",
          label: "Udara & Air",
          fact: "Kapal terbang, feri, bot ekspres.",
        },
      ],
      checks: [
        {
          question: "Namakan tiga contoh perkhidmatan rel bersepadu di Malaysia.",
          hint: "Sebarang tiga daripada: Monorel, KTM Komuter, KTM Antarabandar, LRT, MRT, ERL, ETS.",
        },
      ],
    },
    {
      number: "5.4",
      title: "Faktor-faktor yang Mempengaruhi Jaringan Pengangkutan di Malaysia",
      intro:
        "Jaringan pengangkutan di Malaysia dipengaruhi oleh empat faktor utama: bentuk muka bumi, kemajuan teknologi, dasar kerajaan dan kegiatan ekonomi. Tapkan setiap faktor untuk melihat kesannya terhadap pembinaan jaringan pengangkutan.",
      accordions: [
        {
          title: "⛰️ Bentuk muka bumi",
          body: "Tanah tinggi: pembinaan sukar dan mahal. Tanah pamah: rata dan sesuai. Lembangan sungai berpaya: perlu ditambak dan dibina jambatan, menelan kos tinggi. Pinggir laut yang terlindung: sesuai dijadikan pelabuhan. Jalan raya di Sabah dan Sarawak lebih tertumpu di pantai kerana pedalaman bertanah tinggi dan berhutan tebal.",
        },
        {
          title: "💡 Kemajuan teknologi",
          body: "Membolehkan pembinaan seperti Terowong SMART (saliran air + laluan kenderaan), Jambatan Sultan Abdul Halim Muadzam Shah di Pulau Pinang (jambatan terpanjang di Malaysia, 24 km), Lebuh Raya Timur-Barat merentasi tanah tinggi dan sungai, serta laluan bawah tanah MRT.",
        },
        {
          title: "📜 Dasar kerajaan",
          body: "Suruhanjaya Pengangkutan Awam Darat (SPAD) bertanggungjawab terhadap pengangkutan awam darat. Kerajaan memperuntukkan RM5.6 bilion untuk East Coast Rail Line (ECRL) menghubungkan Lembah Klang ke pantai timur Semenanjung. Dasar Penswastaan seperti pembinaan Lebuhraya Utara-Selatan oleh PLUS Berhad dan perkhidmatan LRT/bas oleh Prasarana Malaysia Berhad.",
        },
        {
          title: "💰 Kegiatan ekonomi",
          body: "Jaringan pengangkutan dibina di kawasan sumber mineral (Kerteh, Bintulu) dan kawasan pertanian untuk memudahkan penghantaran hasil. Kawasan giat ekonomi seperti Lembah Klang, Georgetown dan Ipoh mempunyai jaringan pengangkutan yang lebih padat.",
        },
      ],
      checks: [
        {
          question: "Mengapakah lapangan terbang selalunya dibina di kawasan tanah pamah?",
          hint: "Kerana keadaan tanah yang rata memudahkan pembinaan landasan dan infrastruktur berbanding tanah tinggi atau berpaya.",
        },
      ],
    },
    {
      number: "5.5–5.6",
      title: "Kepentingan Pengangkutan Darat, Udara, Air dan Awam",
      intro:
        "Setiap moda pengangkutan menyumbang secara berbeza kepada pembangunan negara. Pengangkutan darat membawa penumpang dan barangan, membangunkan bandar satelit (bandar yang bergantung kepada industri tempatan tetapi berkait ekonomi dengan bandar raya berhampiran) dan koridor ekonomi seperti ECER, SCORE dan SDC. Pengangkutan udara menggalakkan integrasi nasional antara Semenanjung dengan Sabah dan Sarawak. Pengangkutan air menghubungkan kawasan pedalaman (Sungai Rajang, Sungai Kinabatangan) dan mengendalikan urusan perdagangan eksport-import.",
      cards: [
        {
          title: "🛣️ Darat",
          body: "Menghubungkan pedalaman, membangunkan bandar satelit, menarik pelabur dan meningkatkan darjah ketersampaian.",
        },
        {
          title: "✈️ Udara",
          body: "Menggalakkan integrasi nasional, menjimatkan masa perjalanan, menghubungkan Semenanjung–Sabah–Sarawak.",
        },
        {
          title: "🚢 Air",
          body: "Menghubungkan pedalaman Sabah/Sarawak, mengendalikan urusan perdagangan import/eksport, kos lebih murah untuk kargo pukal.",
        },
        {
          title: "🚦 Mengurangkan kesesakan",
          body: "Sistem pengangkutan awam bersepadu mengurangkan bilangan kenderaan di jalan raya.",
        },
        {
          title: "🏖️ Memajukan pelancongan",
          body: "Perkhidmatan teksi, bas dan rel bersepadu memudahkan pergerakan pelancong dalam negara.",
        },
        {
          title: "🌬️ Mengurangkan pencemaran",
          body: "Rel bersepadu menggunakan tenaga elektrik, mengurangkan pelepasan asap kenderaan persendirian.",
        },
        {
          title: "💼 Peluang pekerjaan",
          body: "Perkhidmatan teksi, bas dan rel bersepadu menawarkan peluang pekerjaan kepada penduduk tempatan.",
        },
      ],
      checks: [
        {
          question: "Bagaimana pengangkutan darat membantu membangunkan bandar satelit seperti Petaling Jaya?",
          hint: "Jaringan jalan raya dan rel yang menghubungkannya dengan Kuala Lumpur membolehkan Petaling Jaya berkembang sebagai kawasan kediaman dan perindustrian yang menyokong bandar raya berhampiran.",
        },
      ],
    },
    {
      number: "5.7",
      title: "Amalan Pengangkutan Lestari",
      intro:
        "Lestari bermaksud tidak berubah-ubah, kekal atau tetap. Sistem pengangkutan lestari penting untuk mengurangkan kos bahan api, meningkatkan keselamatan, mengurangkan hakisan, memelihara flora dan fauna, mengurangkan pelepasan bahan pencemar dan mengelakkan kesesakan lalu lintas.",
      flipCards: [
        {
          id: "elektrik-hibrid",
          icon: "🔋",
          label: "Kereta Elektrik & Hibrid",
          fact: "Memelihara alam sekitar dengan mengurangkan pembebasan karbon monoksida, dan menjimatkan penggunaan bahan api.",
        },
        {
          id: "kongsi-kereta",
          icon: "🚗",
          label: "Berkongsi Kereta",
          fact: "Mengurangkan bilangan kenderaan di jalan raya dan pembebasan gas karbon monoksida ke udara.",
        },
        {
          id: "pengangkutan-awam",
          icon: "🚌",
          label: "Pengangkutan Awam",
          fact: "Mengurangkan kesesakan lalu lintas — contohnya bas percuma GO KL.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah amalan pengangkutan lestari dapat diterapkan dalam kalangan rakyat Malaysia?",
          hint: "Contohnya, dengan lebih ramai memilih berkongsi kereta, menggunakan kenderaan elektrik/hibrid, dan memanfaatkan pengangkutan awam percuma seperti bas GO KL.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti jaringan pengangkutan darat, udara dan air di Malaysia.",
    "Saya dapat menghuraikan faktor yang mempengaruhi jaringan pengangkutan.",
    "Saya dapat membezakan kepentingan pengangkutan darat, udara dan air.",
    "Saya dapat mencadangkan amalan pengangkutan dan perjalanan lestari.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Jaringan jalan raya di Malaysia lebih tertumpu di pantai timur berbanding pantai barat Semenanjung.",
      answer: false,
      explanation: "Sebaliknya — jaringan jalan raya lebih tertumpu di pantai barat Semenanjung Malaysia.",
    },
    {
      type: "multiple-choice",
      question: "Apakah organisasi yang bertanggungjawab terhadap pengangkutan awam darat di Malaysia?",
      options: ["SPAD", "SKMM", "KTMB sahaja", "JUPEM"],
      answerIndex: 0,
      explanation: "Suruhanjaya Pengangkutan Awam Darat (SPAD).",
    },
  ],
};
