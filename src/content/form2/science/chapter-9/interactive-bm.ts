import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch9-haba.png";

export const scienceF2C9InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Blog Sains — Beruang Kutub Yang Tersembunyi",
    body: "Kamera inframerah mengesan haba yang disinarkan daripada haiwan — tetapi beruang kutub memerangkap haba begitu berkesan di bawah bulu dan lemaknya sehingga ia hampir tidak kelihatan pada pengimejan terma, walaupun dalam habitat yang membeku.",
    imagePath: chapterImage,
  },
  keywords: [
    "Haba",
    "Suhu",
    "Konduksi",
    "Perolakan",
    "Sinaran",
    "Konduktor haba",
    "Penebat haba",
    "Keseimbangan terma",
    "Bayu laut",
    "Bayu darat",
    "Pengembangan",
    "Pengecutan",
    "Jalur dwilogam",
    "Bangunan Hijau",
  ],
  sections: [
    {
      number: "9.1",
      title: "Haba dan Suhu",
      intro:
        "Haba ialah satu bentuk tenaga yang mengalir daripada kawasan bersuhu tinggi ke kawasan bersuhu rendah. Suhu pula ialah sukatan darjah kepanasan atau kesejukan sesuatu objek. Kedua-duanya berkait, tetapi ia bukan perkara yang sama — dua bikar air pada suhu yang sama boleh mengandungi kuantiti haba yang sangat berbeza, bergantung kepada berapa banyak air itu.",
      cards: [
        {
          title: "🔥 Haba",
          body: "Satu bentuk tenaga. Kuantiti haba bergantung pada jenis bahan, kuantiti bahan dan suhu.",
          detail: "Diukur dalam joule (J).",
        },
        {
          title: "🌡️ Suhu",
          body: "Darjah kepanasan atau kesejukan sesuatu objek. Suhu bergantung pada darjah pergerakan zarah-zarah di dalam bahan itu.",
          detail: "Diukur dalam darjah Celsius (°C) atau kelvin (K).",
        },
        {
          title: "⚖️ Keseimbangan terma",
          body: "Apabila dua objek bersentuhan, tenaga haba dipindahkan daripada objek bersuhu tinggi kepada objek bersuhu rendah. Apabila pemindahan haba antara kedua-duanya menjadi sifar, kedua-dua objek berada dalam keseimbangan terma dan mempunyai suhu yang sama.",
        },
      ],
      checks: [
        { question: "Adakah sentuhan cara yang boleh dipercayai untuk memeriksa sama ada seseorang demam?", hint: "Tidak begitu — sentuhan bersifat subjektif dan dipengaruhi oleh suhu tangan anda sendiri. Termometer memberikan bacaan suhu yang objektif." },
        { question: "Air dalam dua bikar (100 ml dan 200 ml) dididihkan. Adakah suhunya sama? Adakah kuantiti habanya sama?", hint: "Suhunya sama (100 °C), tetapi bikar 200 ml mengandungi lebih banyak haba kerana kuantiti bahannya lebih besar." },
      ],
    },
    {
      number: "9.2",
      title: "Konduksi",
      intro:
        "Konduksi ialah proses pengaliran haba dari kawasan panas ke kawasan sejuk melalui medium pepejal. Zarah-zarah yang menerima tenaga haba bergetar dengan lebih cepat dan berlanggar dengan zarah jiran dengan lebih kerap, lalu memindahkan tenaga itu ke seluruh medium.",
      conductionDiagram: {
        title: "🔗 Bagaimana haba merambat melalui pepejal",
        instruction: "Tekan setiap peringkat untuk melihat tenaga merambat di sepanjang rod.",
        particleCount: 9,
        hotLabel: "Hujung panas",
        coldLabel: "Hujung sejuk",
        mechanismNote:
          "Perhatikan bahawa zarah-zarah kekal di kedudukannya. Yang merambat di sepanjang rod ialah tenaga, bukan zarah — zarah hanya bergetar di tempatnya dan menyerahkan tenaga kepada jirannya.",
        stages: [
          { id: "start", label: "Mula dipanaskan", note: "Zarah di hujung panas menerima tenaga haba dan mula bergetar dengan lebih cepat." },
          { id: "middle", label: "Tenaga merambat", note: "Zarah yang bergetar lebih cepat berlanggar dengan zarah jiran dengan lebih kerap, memindahkan tenaga ke bahagian tengah rod." },
          { id: "full", label: "Seluruh rod panas", note: "Perlanggaran berterusan zarah demi zarah membawa tenaga haba sehingga ke hujung yang sejuk." },
        ],
        caption: "Zarah kekal di kedudukannya — hanya tenaga yang merambat.",
        hint: "Pilih satu peringkat untuk melihat apa yang berlaku.",
      },
      checks: [
        { question: "Mengapakah sudu logam menjadi panas apabila dibiarkan di dalam semangkuk sup panas?", hint: "Zarah di hujung sudu yang terendam bergetar lebih cepat dan berlanggar dengan zarah jiran, memindahkan tenaga haba di sepanjang sudu secara konduksi." },
        { question: "Adakah zarah logam bergerak dari hujung panas ke hujung sejuk semasa konduksi?", hint: "Tidak. Zarah kekal di kedudukannya dan hanya bergetar; tenaga sahaja yang dipindahkan melalui perlanggaran." },
      ],
    },
    {
      number: "9.2",
      title: "Perolakan dan Sinaran",
      intro:
        "Haba juga boleh mengalir tanpa melalui pepejal. Dalam bendalir, perolakan membawa haba melalui pergerakan bendalir itu sendiri. Sinaran pula tidak memerlukan sebarang medium — inilah satu-satunya cara haba boleh merambat menerusi ruang kosong.",
      convectionRadiation: {
        title: "🌀 Dua cara haba mengalir tanpa pepejal",
        instruction: "Tekan setiap cara untuk melihat bagaimana haba bergerak.",
        warmLabel: "Panas",
        coolLabel: "Sejuk",
        modes: [
          {
            id: "convection",
            label: "Perolakan",
            note: "Haba dialirkan melalui pergerakan bendalir — cecair dan gas — dari kawasan panas ke kawasan sejuk.",
            detail:
              "Bahagian bendalir yang menerima haba akan mengembang, menjadi kurang tumpat, lalu naik ke atas. Bahagian bendalir yang lebih sejuk dan lebih tumpat akan turun ke bawah untuk menggantikannya. Peredaran naik dan turun yang berterusan ini dikenali sebagai arus perolakan.",
          },
          {
            id: "radiation",
            label: "Sinaran",
            note: "Proses pemindahan haba tanpa memerlukan sebarang medium.",
            detail:
              "Haba boleh merambat menerusi ruang kosong atau vakum. Itulah sebabnya tenaga haba dari Matahari dapat sampai ke Bumi walaupun merentasi ruang angkasa yang kosong. Jenis permukaan, suhu dan luas permukaan objek mempengaruhi kadar pengaliran haba secara sinaran.",
          },
        ],
        caption: "Perolakan memerlukan bendalir; sinaran tidak memerlukan apa-apa pun.",
        hint: "Pilih satu cara untuk melihat mekanismenya.",
      },
      checks: [
        { question: "Mengapakah gegelung pemanas dalam cerek elektrik diletakkan di bahagian bawah?", hint: "Air yang dipanaskan di bahagian bawah mengembang, menjadi kurang tumpat dan naik; air sejuk yang lebih tumpat turun menggantikannya, mewujudkan arus perolakan yang memanaskan seluruh cerek." },
        { question: "Bagaimanakah tenaga haba dari Matahari sampai ke Bumi?", hint: "Melalui sinaran. Ruang angkasa ialah vakum, jadi konduksi dan perolakan tidak boleh berlaku — hanya sinaran yang dapat merambat menerusi ruang kosong." },
      ],
    },
    {
      number: "9.2",
      title: "Bayu Laut dan Bayu Darat",
      intro:
        "Pembentukan bayu laut dan bayu darat merupakan contoh perolakan yang berlaku secara semula jadi. Kuncinya ialah darat memanas dan menyejuk dengan lebih cepat berbanding laut.",
      breezeDiagram: {
        title: "🌬️ Bayu laut dan bayu darat",
        instruction: "Tekan setiap bayu untuk melihat arah pergerakan udara.",
        landLabel: "Darat",
        seaLabel: "Laut",
        risesLabel: "Udara panas naik",
        breezes: [
          {
            id: "sea",
            label: "☀️ Bayu laut",
            warmerSide: "land",
            timeOfDay: "Waktu siang",
            note: "Pada waktu siang, Matahari memanaskan darat lebih cepat berbanding laut. Udara panas di darat mengembang, menjadi kurang tumpat dan naik ke atas. Udara sejuk yang lebih tumpat bergerak dari permukaan laut ke darat untuk menggantikannya — inilah bayu laut.",
          },
          {
            id: "land",
            label: "🌙 Bayu darat",
            warmerSide: "sea",
            timeOfDay: "Waktu malam",
            note: "Pada waktu malam, darat menjadi sejuk dengan lebih cepat berbanding laut. Udara di permukaan laut yang lebih panas menjadi kurang tumpat lalu naik ke atas. Udara sejuk yang lebih tumpat dari darat bergerak ke laut — inilah bayu darat.",
          },
        ],
        caption: "Bayu dinamakan mengikut arah ia bertiup datang: bayu laut datang dari laut, bayu darat datang dari darat.",
        hint: "Pilih satu bayu untuk melihat arah pergerakan udaranya.",
      },
      checks: [
        { question: "Mengapakah bayu laut bertiup dari laut ke darat pada waktu siang?", hint: "Darat memanas lebih cepat, jadi udara panas di darat naik dan udara sejuk yang lebih tumpat dari laut bergerak masuk menggantikannya." },
        { question: "Pada waktu malam, ke arah manakah bayu darat bertiup, dan mengapa?", hint: "Dari darat ke laut. Darat menyejuk lebih cepat, jadi udara yang lebih panas di atas laut naik dan udara sejuk dari darat bergerak menggantikannya." },
      ],
    },
    {
      number: "9.2",
      title: "Konduktor dan Penebat Haba",
      intro:
        "Bahan yang boleh mengalirkan haba dengan mudah dikenali sebagai konduktor haba. Bahan yang boleh menghalang atau melambatkan pengaliran haba pula dikenali sebagai penebat haba.",
      cards: [
        {
          title: "🔥 Konduktor haba",
          body: "Bahan yang membenarkan haba mengalir melaluinya dengan mudah. Logam seperti kuprum, aluminium dan besi ialah konduktor haba yang baik.",
          detail: "Contoh: dasar kuali logam, tapak seterika logam.",
        },
        {
          title: "🧊 Penebat haba",
          body: "Bahan yang menghalang atau melambatkan pengaliran haba. Kayu, kapas, kain felt, gentian kaca dan polistirena ialah penebat haba yang baik.",
          detail: "Contoh: sarung tangan ketuhar, dinding kotak ais, pemegang kayu pada peralatan dapur.",
        },
      ],
      matcher: {
        title: "🔌 Padankan bahan dengan fungsinya",
        instruction: "Pilih jenis bahan, kemudian pilih barangan harian yang menggunakannya.",
        pairs: [
          { id: "pan", label: "🔥 Konduktor haba — memasak makanan dengan cepat", match: "Dasar kuali logam" },
          { id: "iron", label: "🔥 Konduktor haba — menggosok pakaian dengan cepat", match: "Tapak seterika logam" },
          { id: "gloves", label: "🧊 Penebat haba — melindungi tangan", match: "Sarung tangan ketuhar" },
          { id: "icebox", label: "🧊 Penebat haba — mengekalkan kesejukan", match: "Dinding kotak ais (gentian kaca/polistirena)" },
        ],
      },
      checks: [
        { question: "Mengapakah pemegang periuk sering diperbuat daripada kayu atau plastik?", hint: "Kayu dan plastik ialah penebat haba — keduanya menghalang haba daripada mengalir ke tangan semasa memasak." },
        { question: "Sebuah kajian membandingkan kapas, kain felt dan kerajang aluminium sebagai pembalut kelalang berisi air panas. Bahan manakah menjadi penebat terbaik?", hint: "Kapas dan kain felt — keduanya melambatkan pengaliran haba, jadi suhu air kekal tinggi lebih lama. Kerajang aluminium ialah konduktor haba, jadi haba hilang dengan lebih cepat." },
      ],
    },
    {
      number: "9.3",
      title: "Pengembangan dan Pengecutan Jirim",
      intro:
        "Apabila jirim dipanaskan, zarah-zarahnya memperoleh tenaga, bergerak atau bergetar dengan lebih cepat, dan jarak antara zarah bertambah — jadi jirim itu mengembang. Apabila disejukkan, zarah bergerak lebih perlahan, jarak antara zarah berkurang, dan jirim mengecut. Ini berlaku pada pepejal, cecair dan gas.",
      expansionParticles: {
        title: "🌡️ Zarah semasa pemanasan dan penyejukan",
        instruction: "Pilih keadaan jirim, kemudian tekan panaskan atau sejukkan.",
        heatedLabel: "Dipanaskan",
        cooledLabel: "Disejukkan",
        misconceptionNote:
          "Perhatikan saiz setiap zarah tidak pernah berubah. Yang berubah hanyalah jarak antara zarah — jirim mengembang kerana zarahnya menjauh, bukan kerana zarah itu sendiri membesar.",
        states: [
          { id: "solid", label: "Pepejal", note: "Zarah bergetar pada kedudukan tetap. Pemanasan menjadikannya bergetar lebih cepat dan menolak sedikit lebih jauh antara satu sama lain, jadi pepejal mengembang." },
          { id: "liquid", label: "Cecair", note: "Zarah sudah bebas bergerak antara satu sama lain. Pemanasan menjadikannya bergerak lebih pantas dan lebih berjauhan, jadi cecair mengembang." },
          { id: "gas", label: "Gas", note: "Zarah bergerak bebas dan jauh berjauhan. Pemanasan menjadikannya bergerak jauh lebih pantas, jadi gas mengembang paling banyak antara ketiga-tiga keadaan." },
        ],
        caption: "Saiz zarah kekal sama; hanya jarak antara zarah yang berubah.",
        hint: "Pilih satu keadaan jirim untuk melihat kelakuan zarahnya.",
      },
      checks: [
        { question: "Penutup botol logam tersekat ketat. Bagaimanakah air panas membantu membukanya?", hint: "Haba menyebabkan logam penutup itu mengembang sedikit, jadi cengkamannya melonggar dan penutup lebih mudah dibuka." },
        { question: "Sebiji bola pingpong yang kemik dimasukkan ke dalam air panas dan kembali pulih. Mengapa?", hint: "Haba menyebabkan udara di dalam bola itu mengembang, lalu menolak permukaan yang kemik itu keluar semula." },
      ],
    },
    {
      number: "9.3",
      title: "Kegunaan Pengembangan dan Pengecutan",
      intro:
        "Prinsip pengembangan dan pengecutan jirim digunakan — dan perlu diambil kira — dalam banyak keadaan harian.",
      bimetallicStrip: {
        title: "🔔 Jalur dwilogam dalam penggera kebakaran",
        instruction: "Tekan setiap keadaan untuk melihat kelakuan jalur itu.",
        fasterMetal: "Kuprum",
        slowerMetal: "Besi",
        contactLabel: "Skru sentuhan",
        alarmLabel: "Penggera",
        states: [
          { id: "room", label: "Suhu bilik", note: "Pada suhu bilik jalur itu lurus dan tidak menyentuh skru sentuhan. Litar tidak lengkap, jadi penggera tidak berbunyi." },
          { id: "heated", label: "Dipanaskan oleh api", note: "Apabila terdedah kepada haba kebakaran, kuprum mengembang lebih cepat berbanding besi. Perbezaan ini menyebabkan jalur membengkok ke arah skru sentuhan, melengkapkan litar dan membunyikan penggera." },
        ],
        caption: "Logam yang mengembang lebih cepat berada di bahagian luar lengkungan.",
        hint: "Pilih satu keadaan untuk melihat kelakuan jalur itu.",
      },
      accordions: [
        {
          title: "🌡️ Termometer merkuri",
          body: "Merkuri mengembang dan mengecut secara seragam apabila suhu berubah, dan ia mengesan perubahan suhu dengan cepat. Ketinggian turus merkuri di dalam tiub itulah yang digunakan untuk mengukur suhu.",
          detail: "Ingat: termometer mengukur suhu, bukan haba.",
        },
        { title: "🚂 Ruang pada landasan kereta api", body: "Ruang kecil ditinggalkan antara bahagian rel supaya landasan boleh mengembang pada hari yang panas tanpa membengkok atau terangkat." },
        { title: "🌉 Penggolek pada jambatan keluli", body: "Satu hujung jambatan diletakkan di atas penggolek supaya seluruh struktur boleh mengembang dan mengecut dengan selamat mengikut perubahan suhu." },
      ],
      checks: [
        { question: "Dalam jalur dwilogam penggera kebakaran, logam manakah mengembang lebih cepat, dan ke arah manakah jalur itu membengkok?", hint: "Kuprum mengembang lebih cepat berbanding besi, jadi jalur itu membengkok ke arah skru sentuhan lalu melengkapkan litar." },
        { question: "Apakah yang diukur oleh sebuah termometer?", hint: "Suhu. Termometer mengukur darjah kepanasan atau kesejukan, bukan kuantiti haba." },
      ],
    },
    {
      number: "9.4",
      title: "Penyerapan dan Pembebasan Haba",
      intro:
        "Keupayaan sesuatu objek untuk menyerap dan membebaskan haba bergantung pada jenis dan warna permukaannya. Apabila objek menyerap haba, suhunya meningkat; apabila objek membebaskan haba, suhunya menurun. Permukaan yang gelap dan kusam merupakan penyerap dan pembebas haba yang lebih baik berbanding permukaan yang cerah dan berkilat.",
      surfaceComparison: {
        title: "⬛⬜ Permukaan gelap berbanding permukaan berkilat",
        instruction: "Tekan untuk beralih antara menyerap haba dan membebaskan haba.",
        darkLabel: "Gelap dan kusam",
        shinyLabel: "Cerah dan berkilat",
        betterLabel: "Lebih baik",
        poorerLabel: "Kurang baik",
        modes: [
          {
            id: "absorb",
            label: "Menyerap haba",
            note: "Apabila dua tin yang sama tetapi berlainan warna diletakkan pada jarak yang sama dari sumber haba, tin hitam menunjukkan kenaikan suhu yang lebih besar — permukaan gelap dan kusam menyerap haba dengan lebih baik.",
          },
          {
            id: "emit",
            label: "Membebaskan haba",
            note: "Apabila kedua-dua tin diisi air panas yang sama banyak, tin hitam menunjukkan penurunan suhu yang lebih besar — permukaan gelap dan kusam membebaskan haba dengan lebih baik.",
          },
        ],
        caption: "Permukaan yang sama boleh menjadi penyerap yang baik dan pembebas yang baik.",
        hint: "Pilih menyerap atau membebaskan untuk membandingkan kedua-dua permukaan.",
      },
      cards: [
        {
          title: "Kegunaan harian",
          body: "Lori tangki minyak dicat dengan warna cerah seperti putih atau perak. Warna cerah tidak menyerap banyak haba, jadi penyejatan minyak dapat dikurangkan.",
          detail: "Sebaliknya, pemanas air solar menggunakan panel berwarna gelap supaya menyerap haba matahari sebanyak mungkin.",
        },
      ],
      checks: [
        { question: "Mengapakah pakaian berwarna cerah terasa lebih selesa semasa cuaca panas?", hint: "Permukaan cerah menyerap kurang haba daripada Matahari berbanding permukaan gelap, jadi badan tidak menjadi terlalu panas." },
        { question: "Apakah ciri permukaan dinding kelalang termos yang membantu mengekalkan suhu air panas?", hint: "Permukaan berkilat — ia pembebas haba yang kurang baik, jadi haba lebih lambat hilang dari air di dalamnya." },
      ],
    },
    {
      number: "9.4",
      title: "Konsep Bangunan Hijau",
      intro:
        "Konsep Bangunan Hijau ialah idea yang dijana untuk mengurangkan kesan pembangunan yang pesat terhadap alam sekitar dan kesihatan manusia. Konsep haba yang anda pelajari dalam bab ini digunakan secara langsung: sebuah rumah hijau direka supaya tenaga yang diperlukan untuk menyejukkan atau memanaskannya dapat dikurangkan.",
      tabs: [
        {
          title: "⚡ Kecekapan tenaga",
          body: "Bangunan hijau mempunyai kecekapan tenaga yang tinggi, contohnya melalui penggunaan tenaga solar atau tenaga lain yang boleh diperbaharui. Penebat haba pada dinding dan bumbung mengurangkan pengaliran haba masuk, jadi kurang tenaga diperlukan untuk penyaman udara.",
        },
        {
          title: "💧 Kecekapan air",
          body: "Sistem pengaliran air yang baik, termasuk penuaian air hujan dan kitar semula air, mengurangkan penggunaan air bersih.",
        },
        {
          title: "🏗️ Tapak dan bahan binaan",
          body: "Tapak pembinaan yang lestari dan penggunaan bahan binaan kitar semula mengurangkan kesan terhadap alam sekitar. Bumbung dan dinding berwarna cerah memantulkan lebih banyak haba matahari.",
        },
        {
          title: "💡 Peredaran udara dan inovasi",
          body: "Sistem peredaran udara dan pencahayaan semula jadi yang baik membolehkan arus perolakan membawa udara panas keluar tanpa kipas atau penyaman udara. Inovasi reka bentuk seperti ini menjadikan rumah lebih selesa dengan tenaga yang lebih sedikit.",
        },
      ],
      checks: [
        { question: "Bagaimanakah penebat haba pada bumbung mengurangkan penggunaan tenaga sebuah rumah?", hint: "Penebat melambatkan pengaliran haba dari bumbung yang panas ke dalam rumah, jadi kurang tenaga diperlukan untuk menyejukkan ruang di dalamnya." },
        { question: "Mengapakah bumbung dan dinding berwarna cerah membantu menyejukkan sebuah rumah?", hint: "Permukaan cerah dan berkilat ialah penyerap haba yang kurang baik, jadi kurang haba matahari diserap ke dalam bangunan itu." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membezakan haba dengan suhu, termasuk unitnya.",
    "Saya boleh menerangkan konduksi menggunakan getaran dan perlanggaran zarah.",
    "Saya boleh menerangkan perolakan menggunakan perubahan ketumpatan bendalir.",
    "Saya boleh menerangkan mengapa sinaran tidak memerlukan medium.",
    "Saya boleh menerangkan pembentukan bayu laut dan bayu darat.",
    "Saya boleh mentakrifkan konduktor haba dan penebat haba serta memberikan contohnya.",
    "Saya boleh menerangkan pengembangan dan pengecutan pepejal, cecair dan gas.",
    "Saya boleh menerangkan kegunaan pengembangan dan pengecutan dalam kehidupan harian.",
    "Saya boleh menerangkan hubungan jenis permukaan dengan penyerapan dan pembebasan haba.",
    "Saya boleh menerangkan bagaimana Konsep Bangunan Hijau menggunakan konsep haba.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Haba dan suhu bermaksud perkara yang sama persis.",
      answer: false,
      explanation: "Haba ialah satu bentuk tenaga yang diukur dalam joule; suhu ialah darjah kepanasan atau kesejukan yang diukur dalam °C atau K. Kedua-duanya berkait, tetapi tidak sama.",
    },
    {
      type: "multiple-choice",
      question: "Kaedah pemindahan haba yang manakah tidak memerlukan sebarang medium?",
      options: ["Konduksi", "Perolakan", "Sinaran", "Kesemuanya"],
      answerIndex: 2,
      explanation: "Sinaran adalah cara haba daripada Matahari merentasi ruang kosong untuk sampai ke Bumi — tiada medium diperlukan.",
    },
    {
      type: "multiple-choice",
      question: "Apakah yang diukur oleh sebuah termometer?",
      options: ["Kuantiti haba dalam objek", "Suhu objek", "Tenaga kinetik jumlah objek", "Kadar pengaliran haba"],
      answerIndex: 1,
      explanation: "Termometer mengukur suhu — darjah kepanasan atau kesejukan — dan bukan kuantiti haba yang terkandung dalam objek itu.",
    },
  ],
};
