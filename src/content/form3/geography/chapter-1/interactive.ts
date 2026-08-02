import type { GeoF3InteractiveContent } from "../interactive-types";

export const geographyF3C1Interactive: GeoF3InteractiveContent = {
  chapter: 1,
  blogHighlight: {
    title: "📊 Tahukah Anda? — Graf Garisan Pertama Dunia",
    body: "Graf garisan pertama yang pernah dicipta adalah hasil karya William Playfair pada tahun 1786 — jauh sebelum wujudnya perisian komputer, beliau melukis semuanya menggunakan tangan untuk menunjukkan data ekonomi England.",
  },
  keywords: ["Jadual", "Graf Bar Mudah", "Graf Garisan Mudah", "Graf Gabungan", "Jadual Kekerapan"],
  sections: [
    {
      number: "1.1",
      title: "Ciri-ciri dan Kegunaan Jadual",
      intro:
        "Jadual merupakan cara untuk mempersembahkan sesuatu data dan maklumat lebih tersusun. Data dan maklumat yang dipersembahkan dalam bentuk jadual lebih mudah dibaca, difahami dan ditafsir. Sebuah jadual perlu mempunyai tajuk, data dan maklumat serta sumber yang bersesuaian — pengkelasan maklumat dalam jadual ini menjadikannya lebih tersusun dan mudah menarik perhatian orang yang melihat. Jadual juga digunakan untuk menghasilkan graf mengikut kesesuaian, serta melihat perubahan dan pertalian antara dua set maklumat. Sebelum sesuatu jadual dapat dibina, data dan maklumat perlu dikumpulkan dahulu — terdapat lima kaedah utama untuk mengumpul maklumat, seperti berikut.",
      flipCards: [
        {
          id: "pemerhatian",
          icon: "👀",
          label: "Pemerhatian",
          fact: "Kaedah paling mudah dan cepat dilakukan — maklumat diperoleh dengan memerhati dan mencatat perkara yang berkaitan dengan maklumat yang hendak dikumpulkan.",
        },
        {
          id: "temubual",
          icon: "🎤",
          label: "Temu Bual",
          fact: "Pengumpulan maklumat secara lisan melalui perjumpaan atau soal jawab dengan seseorang — sesuai untuk mendapatkan berita, pendapat atau nasihat.",
        },
        {
          id: "banci",
          icon: "📋",
          label: "Banci",
          fact: "Kaedah pengumpulan maklumat yang berkaitan dengan sesuatu jumlah yang dihitung — digunakan oleh Jabatan Perangkaan Malaysia untuk menghitung jumlah penduduk mengikut umur, pekerjaan, pendapatan dan bangsa.",
        },
        {
          id: "soalselidik",
          icon: "📝",
          label: "Soal Selidik",
          fact: "Dilakukan dengan mengedarkan borang soal selidik kepada orang ramai. Borang yang telah diisi perlu dikumpulkan semula.",
        },
        {
          id: "rujukan",
          icon: "📚",
          label: "Rujukan Kepustakaan",
          fact: "Kaedah pengumpulan maklumat yang dilakukan dengan merujuk bahan-bahan yang sudah diterbitkan seperti buku, majalah, risalah, keratan akhbar, laman web atau cakera padat.",
        },
      ],
      checks: [
        {
          question: "Apakah kepentingan menyusun data dalam bentuk jadual?",
          hint: "Data yang disusun dalam jadual lebih mudah dibaca, difahami dan ditafsir berbanding data mentah yang tidak tersusun.",
        },
      ],
    },
    {
      number: "1.2",
      title: "Ciri-ciri dan Kegunaan Graf",
      intro:
        "Data boleh dipersembahkan dalam pelbagai bentuk graf, antaranya ialah graf bar mudah, graf garisan mudah dan graf gabungan. Graf digunakan untuk mempersembahkan data yang boleh dikira seperti orang, kereta atau rumah, dan juga untuk menunjukkan perbezaan antara komponen yang dikaji. Ketiga-tiga jenis graf ini mempunyai ciri dan kegunaan yang berbeza — pilih setiap jenis di bawah untuk membandingkannya.",
      zoneExplorer: {
        title: "📈 Tiga jenis graf, tiga fungsi berbeza",
        instruction: "Pilih satu jenis graf untuk melihat ciri-ciri dan kegunaannya.",
        activitiesLabel: "Kegunaan",
        zones: [
          {
            name: "Graf Bar Mudah",
            description:
              "Mempunyai paksi menegak, paksi mendatar, tajuk dan petunjuk. Bar-bar dilukis secara menegak atau mendatar, dan ketinggian bar mewakili kuantiti sesuatu komponen.",
            activities: [
              "Mempersembahkan data yang boleh dikira satu persatu, seperti bilangan orang, kereta atau rumah",
              "Menunjukkan perbezaan antara komponen yang dikaji",
            ],
          },
          {
            name: "Graf Garisan Mudah",
            description:
              "Dilukis secara garisan yang panjang. Garisan yang curam menggambarkan perubahan yang besar manakala garisan yang landai menggambarkan perubahan yang kecil — garisan mendatar bermakna tiada perubahan berlaku. Graf garisan mudah tidak memerlukan petunjuk kerana ia hanya mempunyai satu garisan.",
            activities: [
              "Menunjukkan sesuatu perkara yang mengalami perubahan jumlah atau nilai secara berterusan",
              "Sesuai untuk min suhu bulanan, perubahan penduduk, jualan produk dan pengeluaran hasil tanaman",
            ],
          },
          {
            name: "Graf Gabungan",
            description:
              "Merupakan gabungan graf bar mudah dan graf garisan mudah dalam satu graf yang sama, dengan paksi menegak di sebelah kiri untuk satu maklumat dan paksi menegak di sebelah kanan untuk maklumat kedua.",
            activities: [
              "Menunjukkan dua maklumat yang berlainan dalam satu graf",
              "Menunjukkan perubahan atau perbezaan antara dua perkara yang saling berkaitan, contohnya jumlah hujan dan min suhu bulanan",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Bezakan ciri-ciri dan kegunaan antara graf bar mudah dengan graf gabungan.",
          hint: "Graf bar mudah menunjukkan satu set maklumat menggunakan bar sahaja, manakala graf gabungan menggabungkan bar dan garisan untuk menunjukkan dua maklumat berlainan (contohnya hujan dan suhu) dalam satu graf.",
        },
      ],
    },
    {
      number: "1.3",
      title: "Langkah-langkah Membina Jadual",
      intro:
        "Data dan maklumat yang diperoleh harus disusun dalam bentuk jadual supaya mudah dibaca, difahami dan ditafsir. Jadual dibina daripada data mentah melalui tiga langkah utama — buka setiap langkah di bawah untuk memahaminya.",
      accordions: [
        {
          title: "1️⃣ Kumpul data mentah",
          body: "Contohnya, senarai nama murid dan cara mereka datang ke sekolah — data ini masih dalam bentuk mentah dan sukar dibaca secara terus.",
        },
        {
          title: "2️⃣ Bina jadual kekerapan",
          body: "Kira kekerapan setiap kategori (contohnya, bilangan murid bagi setiap cara datang ke sekolah) menggunakan tanda gundalan seperti \"llll ll\".",
        },
        {
          title: "3️⃣ Ringkaskan jadual",
          body: "Tukar tanda kekerapan kepada angka, dan susun dalam bentuk jadual yang lebih mudah dibaca lengkap dengan jumlah keseluruhan.",
        },
      ],
      checks: [
        {
          question: "Nyatakan tiga langkah untuk membina jadual berdasarkan maklumat yang diperoleh.",
          hint: "Kumpul data mentah, bina jadual kekerapan, kemudian ringkaskan jadual dalam bentuk yang lebih mudah difahami.",
        },
      ],
    },
    {
      number: "1.4",
      title: "Langkah-langkah Membina Graf Bar Mudah, Graf Garisan Mudah dan Graf Gabungan",
      intro:
        "Walaupun graf bar mudah, graf garisan mudah dan graf gabungan kelihatan berbeza, langkah membinanya berkongsi asas yang sama: lukis paksi, pilih skala yang sesuai, plotkan data, kemudian lengkapkan dengan label dan tajuk. Tidak terdapat satu cara yang khusus untuk menghasilkan sesuatu graf — langkah di bawah boleh dijadikan sebagai rujukan.",
      accordions: [
        {
          title: "📊 Graf Bar Mudah",
          body: "Langkah 1: Lukis paksi mendatar dan paksi menegak di atas kertas graf, pilih skala yang sesuai. Langkah 2: Lukis bar mengikut kategori — tinggi bar mewakili kuantiti sesuatu komponen. Langkah 3: Lorek atau warnakan setiap bar dengan lorekan/warna berlainan, kemudian labelkan paksi mendatar, paksi menegak, skala graf bar dan tajuk, serta sediakan petunjuk bagi setiap bar.",
        },
        {
          title: "📈 Graf Garisan Mudah",
          body: "Langkah 1: Lukis paksi mendatar (biasanya mewakili masa) dan paksi menegak (mewakili nilai), pilih skala yang sesuai. Langkah 2: Tandakan titik di atas kertas graf bagi setiap nilai data. Langkah 3: Sambungkan semua titik yang ditandakan itu dengan satu garisan, kemudian labelkan paksi menegak, paksi mendatar dan berikan tajuk yang sesuai.",
        },
        {
          title: "📉 Graf Gabungan",
          body: "Langkah 1: Lukis dua paksi menegak (kiri dan kanan) serta satu paksi mendatar. Langkah 2: Pilih skala yang bersesuaian bagi kedua-dua jenis maklumat — contohnya skala hujan 1 cm mewakili 25 mm pada paksi kiri, dan skala suhu 1 cm mewakili 5°C pada paksi kanan. Langkah 3: Lukis bar bagi satu maklumat, kemudian plotkan titik dan sambungkan dengan garisan bagi maklumat kedua. Langkah 4: Lengkapkan dengan tajuk dan label.",
        },
      ],
      checks: [
        {
          question: "Mengapakah graf garisan mudah tidak memerlukan petunjuk?",
          hint: "Kerana graf ini hanya mempunyai satu garisan yang menunjukkan tinggi atau rendah nilai sesuatu komponen — tiada keperluan membezakan pelbagai kategori seperti dalam graf bar.",
        },
      ],
    },
    {
      number: "1.5",
      title: "Mentafsir Jadual, Graf Bar Mudah, Graf Garisan Mudah dan Graf Gabungan",
      intro:
        "Tafsiran perlu dibuat untuk memahami data dalam jadual, graf bar mudah, graf garisan mudah dan graf gabungan. Tafsiran yang baik dapat membantu mengembangkan data secara terperinci — bukan sekadar membaca angka, tetapi turut menghuraikan sebab dan kesan di sebalik pola data tersebut. Ikuti tujuh langkah di bawah, langkah demi langkah, untuk berlatih mentafsir sesebuah jadual atau graf.",
      sequence: {
        title: "Tujuh langkah mentafsir",
        instruction: "Klik setiap langkah untuk melihat penerangannya.",
        steps: [
          { title: "1. Perhatikan tajuk", body: "Tajuk memberikan konteks tentang apa yang sedang ditunjukkan oleh jadual atau graf tersebut." },
          { title: "2. Perhatikan maklumat dalam jadual", body: "Kenal pasti kategori dan nilai yang terdapat dalam jadual atau graf." },
          { title: "3. Perhatikan paksi menegak dan mendatar", body: "Fahami apa yang diwakili oleh setiap paksi serta skala yang digunakan." },
          { title: "4. Kenal pasti nilai maksimum dan minimum", body: "Tentukan kategori atau tempoh masa dengan nilai tertinggi dan terendah." },
          { title: "5. Huraikan aliran perubahan data", body: "Untuk graf garisan, terangkan sama ada nilai meningkat, menurun atau tidak berubah dari semasa ke semasa." },
          { title: "6. Huraikan isi tersirat", body: "Rungkaikan soalan \"mengapa\" dan \"kenapa\" sesuatu trend data berkelakuan sedemikian, berdasarkan faktor yang munasabah." },
          { title: "7. Buat rumusan keseluruhan", body: "Rumuskan pola utama data tersebut dalam satu atau dua ayat penutup." },
        ],
      },
      cards: [
        {
          title: "Contoh tafsiran ringkas",
          body: "Jadual menunjukkan cara murid Tingkatan 3 Mutiara datang ke sekolah: berjalan kaki (12 orang) adalah cara paling ramai, diikuti bas (7), kereta (5), berbasikal (4) dan motosikal (2 — paling sedikit). Ramai yang berjalan kaki kerana rumah mereka berhampiran sekolah, manakala yang menaiki bas atau kereta tinggal lebih jauh dari sekolah.",
        },
      ],
      checks: [
        {
          question: "Apakah langkah pertama yang perlu dilakukan semasa mentafsir sesebuah jadual atau graf?",
          hint: "Perhatikan tajuk jadual atau graf tersebut terlebih dahulu, kerana tajuk memberikan konteks tentang apa yang sedang ditunjukkan.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan ciri-ciri dan kegunaan jadual serta graf.",
    "Saya dapat membina jadual berdasarkan maklumat yang diperoleh.",
    "Saya dapat membina graf bar mudah, graf garisan mudah dan graf gabungan berdasarkan jadual.",
    "Saya dapat mentafsir jadual, graf bar mudah, graf garisan mudah dan graf gabungan.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Graf gabungan hanya mempunyai satu paksi menegak.",
      answer: false,
      explanation: "Graf gabungan mempunyai DUA paksi menegak (kiri dan kanan) dan satu paksi mendatar — itulah sebabnya ia boleh menunjukkan dua maklumat berlainan serentak.",
    },
    {
      type: "multiple-choice",
      question: "Kaedah pengumpulan maklumat manakah yang paling sesuai untuk mengumpul pendapat orang ramai?",
      options: ["Pemerhatian", "Banci", "Temu bual atau soal selidik", "Rujukan kepustakaan"],
      answerIndex: 2,
      explanation: "Temu bual atau soal selidik sesuai untuk mengumpul data berkaitan berita, pendapat atau nasihat daripada seseorang.",
    },
  ],
};
