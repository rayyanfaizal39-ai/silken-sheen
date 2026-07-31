import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch4-cuaca-dan-iklim-di-malaysia.png";

export const geographyF2C4Interactive: GeoF2InteractiveContent = {
  chapter: 4,
  blogHighlight: {
    title: "🌧️ Tahukah Anda? — Hujan Terbanyak di Malaysia",
    body: "Cerun bukit di pedalaman Sarawak menerima purata hujan tahunan melebihi 5,000 mm — lebih tiga kali ganda daripada Kuala Pilah, Negeri Sembilan, kawasan yang menerima hujan paling sedikit di negara ini.",
    imagePath: chapterImage,
  },
  keywords: [
    "Iklim Khatulistiwa",
    "Monsun",
    "Angin Tempatan",
    "Kesan Rumah Hijau",
    "Pulau Haba",
    "Hujan Asid",
    "El Nino",
    "La Nina",
  ],
  sections: [
    {
      number: "4.1",
      title: "Jenis dan Ciri Iklim di Malaysia",
      intro:
        "Malaysia mengalami iklim Khatulistiwa kerana terletak berhampiran Garisan Khatulistiwa — bercirikan panas dan lembap sepanjang tahun. Iklim ialah purata suhu, hujan, tekanan udara dan angin sesuatu tempat selama 30 tahun. Min suhu tahunan Malaysia biasanya melebihi 21°C (27.8°C pada 2016) dengan julat suhu tahunan dan harian yang kecil. Jumlah hujan tahunan melebihi 2 600 mm, dengan hujan maksimum semasa peralihan monsun (hujung Mac–awal Mei dan Oktober–pertengahan November). Dua jenis hujan utama ialah hujan perolakan (permukaan panas → wap air naik → sejuk → awan kumulonimbus, biasanya lewat petang disertai kilat dan petir) dan hujan bukit (udara lembap dipaksa naik cerun bukit yang menghadap laut — bahagian cerun terlindung menerima hujan sedikit, dikenali kawasan lindungan hujan).",
      cards: [
        {
          title: "🌡️ Suhu",
          body: "Min suhu tahunan melebihi 21°C. Julat suhu tahunan dan julat suhu harian adalah kecil.",
        },
        {
          title: "🌧️ Hujan",
          body: "Jumlah hujan tahunan melebihi 2 600 mm. Taburan tidak sekata; maksimum semasa peralihan monsun.",
        },
      ],
      tabGroups: [
        {
          title: "💨 Angin yang membentuk cuaca kita",
          instruction: "Tapkan setiap jenis angin untuk lihat ciri dan kesannya.",
          tabs: [
            {
              title: "Monsun Timur Laut",
              body: "Bertiup awal November hingga Mac dari pedalaman Benua Asia, merentasi Laut China Selatan. Membawa hujan lebat ke pantai timur Semenanjung Malaysia, barat Sarawak serta pantai utara dan timur Sabah.",
            },
            {
              title: "Monsun Barat Daya",
              body: "Bertiup pertengahan Mei hingga akhir September dari Benua Australia, merentasi Lautan Hindi. Membawa hujan sederhana lebat kerana dihalang oleh tanah tinggi di Sumatera.",
            },
            {
              title: "Angin Sumatera",
              body: "Bertiup April hingga September dari Sumatera. Dikenali sebagai 'skuall' — bertiup kencang secara tiba-tiba, membawa hujan lebat berserta kilat dan petir ke pantai barat Semenanjung, terutamanya Selangor hingga Johor Bahru.",
            },
          ],
        },
        {
          title: "🌊 Bayu laut dan bayu darat",
          instruction: "Angin tempatan ini berlaku setiap hari akibat perbezaan tekanan udara antara laut dan daratan.",
          tabs: [
            {
              title: "☀️ Siang (Bayu Laut)",
              body: "Permukaan tanah cepat panas pada siang hari, menyebabkan tekanan udara rendah di daratan. Udara bergerak dari laut (tekanan tinggi) ke daratan (tekanan rendah) — inilah bayu laut.",
            },
            {
              title: "🌙 Malam (Bayu Darat)",
              body: "Daratan sejuk dengan cepat pada waktu malam, menyebabkan tekanan udara rendah di lautan. Udara bergerak dari darat (tekanan tinggi) ke laut (tekanan rendah) — inilah bayu darat.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Mengapakah nelayan pantai timur Semenanjung Malaysia tidak dapat turun ke laut semasa musim tengkujuh?",
          hint: "Angin Monsun Timur Laut menyebabkan Laut China Selatan bergelora, menjadikannya bahaya untuk menangkap ikan.",
        },
      ],
    },
    {
      number: "4.2",
      title: "Pengaruh Cuaca dan Iklim terhadap Kegiatan Manusia di Malaysia",
      intro:
        "Iklim Khatulistiwa yang panas dan lembap sepanjang tahun mempengaruhi pelbagai kegiatan manusia di Malaysia — daripada apa yang boleh ditanam, sehingga bila nelayan boleh turun ke laut. Kawasan tanah tinggi bersuhu 18°C–21°C pula sesuai untuk tanaman hawa sederhana seperti teh dan sayur-sayuran, contohnya di Cameron Highlands dan Kundasang.",
      flipCards: [
        {
          id: "pertanian",
          icon: "🌾",
          label: "Pertanian",
          fact: "Iklim panas dan lembap sepanjang tahun menggalakkan penanaman padi sawah, getah, kelapa sawit, koko dan lada hitam.",
        },
        {
          id: "pembalakan",
          icon: "🪵",
          label: "Pembalakan",
          fact: "Suhu tinggi dan hujan banyak menggalakkan pertumbuhan hutan hujan tropika kaya kayu keras seperti cengal dan meranti.",
        },
        {
          id: "perikanan",
          icon: "🎣",
          label: "Perikanan",
          fact: "Nelayan pantai timur terjejas semasa Monsun Timur Laut, tetapi nelayan pantai barat dapat menangkap ikan sepanjang tahun kerana terlindung oleh Banjaran Titiwangsa.",
        },
        {
          id: "pelancongan",
          icon: "🏖️",
          label: "Pelancongan",
          fact: "Iklim panas dan suhu laut yang sesuai (24°C–30°C) menarik pelancong dan menggalakkan pertumbuhan batu karang untuk aktiviti menyelam skuba.",
        },
      ],
      checks: [
        {
          question: "Mengapakah kegiatan pertanian di Malaysia dapat dijalankan sepanjang tahun?",
          hint: "Kerana Malaysia menerima hujan dan cahaya matahari yang banyak sepanjang tahun akibat iklim Khatulistiwa — tiada musim sejuk yang menghalang pertumbuhan tanaman.",
        },
      ],
    },
    {
      number: "4.3",
      title: "Kesan Kegiatan Manusia terhadap Cuaca dan Iklim di Malaysia",
      intro:
        "Kegiatan manusia turut memberi kesan kepada cuaca dan iklim Malaysia. Pembakaran bahan api fosil, pelupusan sampah, pembakaran sisa pertanian dan pembalakan meningkatkan pelepasan gas rumah hijau (karbon dioksida, metana, CFC, nitrus oksida) ke atmosfera, menyebabkan empat fenomena utama berikut.",
      accordions: [
        {
          title: "🌡️ Kesan Rumah Hijau",
          body: "Peningkatan suhu bumi akibat banyak haba terperangkap dalam atmosfera. Gas rumah hijau penting untuk mengekalkan suhu bumi, tetapi pelepasan berlebihan akibat aktiviti manusia menyebabkan peningkatan suhu dan perubahan iklim.",
        },
        {
          title: "🏙️ Pulau Haba",
          body: "Fenomena suhu kawasan tepu bina bandar lebih panas berbanding kawasan sekitarnya — disebabkan bangunan konkrit menyerap haba, kesesakan jalan raya melepaskan haba kenderaan, dan kekurangan tumbuhan mengurangkan proses perpeluhan/evaporasi yang menyederhanakan suhu.",
        },
        {
          title: "🌧️ Hujan Asid",
          body: "Hujan yang mengandungi asid lemah dengan nilai pH kurang daripada 5.6. Pembakaran bahan api seperti petroleum dan arang batu membebaskan sulfur dioksida dan karbon dioksida yang terlarut dalam wap air menjadi asid sulfurik dan asid nitrik — memusnahkan tanaman, mengakis bangunan dan menjejaskan hidupan akuatik.",
        },
        {
          title: "😷 Jerebu",
          body: "Zarah-zarah halus yang terampai di atmosfera dalam kepekatan tinggi. Punca termasuk pembakaran hutan, pembakaran terbuka, pembakaran bahan api fosil dan letusan gunung berapi di negara jiran — mengurangkan jarak penglihatan dan menjejaskan kesihatan (cth. jerebu Kuala Lumpur 2015).",
        },
      ],
      checks: [
        {
          question: "Cadangkan dua langkah untuk mengurangkan kesan jerebu.",
          hint: "Kurangkan pembakaran terbuka, dan kuatkuasakan undang-undang terhadap pembakaran hutan untuk pembukaan tanah.",
        },
      ],
    },
    {
      number: "4.4",
      title: "Perubahan Cuaca dan Iklim di Malaysia",
      intro:
        "Fenomena El Nino dan La Nina dikaitkan dengan perubahan suhu permukaan air Lautan Pasifik yang menyebabkan perubahan tekanan udara dan pola tiupan angin. Dalam keadaan normal, angin Timuran yang stabil membawa hujan lebat ke Asia Tenggara, Australia dan Papua New Guinea — El Nino dan La Nina mengganggu corak ini dengan kesan yang bertentangan terhadap Malaysia.",
      tabGroups: [
        {
          title: "El Nino dan La Nina",
          instruction: "Kedua-dua fenomena ini berkait dengan perubahan suhu permukaan Lautan Pasifik — tetapi memberi kesan bertentangan kepada Malaysia.",
          tabs: [
            {
              title: "El Nino",
              body: "Peningkatan suhu luar biasa (0.5°C–2°C) di Lautan Pasifik melemahkan angin Timuran, menyebabkan Malaysia mengalami kemarau walaupun sepatutnya menerima hujan lebat. Berlaku dalam kitaran 4-8 tahun, biasanya berlangsung 6-18 bulan.",
            },
            {
              title: "La Nina",
              body: "Penurunan suhu permukaan laut di Lautan Pasifik tengah dan timur menyebabkan pembentukan awan tebal dan hujan lebat luar biasa — meningkatkan risiko banjir besar, seperti yang berlaku di Malaysia pada 2014.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Kenapa El Nino menyebabkan kemarau di Malaysia sedangkan ia berlaku jauh di Lautan Pasifik?",
          hint: "Kerana El Nino melemahkan angin Timuran yang biasa membawa hujan ke Asia Tenggara — tanpa angin ini, kawasan seperti Malaysia menerima kurang hujan daripada biasa.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti jenis dan ciri iklim di Malaysia.",
    "Saya dapat menghuraikan pengaruh cuaca dan iklim terhadap kegiatan manusia.",
    "Saya dapat menilai kesan kegiatan manusia terhadap cuaca dan iklim.",
    "Saya dapat merumuskan perubahan cuaca dan iklim di Malaysia.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Angin Monsun Barat Daya berasal dari Benua Asia.",
      answer: false,
      explanation: "Angin Monsun Barat Daya berasal dari Benua Australia — Monsun Timur Lautlah yang berasal dari Benua Asia.",
    },
    {
      type: "multiple-choice",
      question: "Fenomena manakah yang menyebabkan kemarau di Malaysia?",
      options: ["El Nino", "La Nina", "Kesan rumah hijau", "Pulau haba"],
      answerIndex: 0,
      explanation: "El Nino melemahkan angin Timuran yang membawa hujan ke Asia Tenggara, menyebabkan kemarau di Malaysia.",
    },
  ],
};
