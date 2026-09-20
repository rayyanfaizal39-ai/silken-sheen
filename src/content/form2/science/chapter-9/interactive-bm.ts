import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH9_IMAGES, SCIENCE_F2_VISUAL_ASPECT } from "../visual-assets";

export const scienceF2C9InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Blog Sains — Permaidani atau Marmar: Mana Lebih Panas?",
    body: "Mengapakah permaidani terasa lebih panas daripada lantai marmar walaupun kedua-duanya berada pada suhu bilik yang sama? **Marmar mengalirkan haba daripada kaki anda dengan lebih cepat** berbanding permaidani. Permaidani ialah konduktor haba yang lebih lemah, jadi haba meninggalkan kaki anda dengan lebih perlahan — bukan kerana permaidani itu sebenarnya bersuhu lebih tinggi.",
    imagePath: SCIENCE_F2_CH9_IMAGES.polarBear,
    imageAlt:
      "Seekor beruang kutub berdiri di atas ais laut pada waktu malam, dengan keratan pengimejan terma menunjukkan haba yang terperangkap di dalam badannya sementara bulunya kekal sejuk.",
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
      conceptQuestion: "Apakah Haba dan Suhu?",
      intro:
        "Haba ialah **satu bentuk tenaga** yang mengalir daripada kawasan yang lebih panas ke kawasan yang lebih sejuk. Suhu pula ialah **ukuran darjah kepanasan atau kesejukan** sesuatu objek. Kedua-duanya berkait, tetapi ia bukan perkara yang sama.",
      remember:
        "Haba ialah satu bentuk tenaga yang diukur dalam joule (J); suhu ialah darjah kepanasan atau kesejukan yang diukur dalam °C atau K. Kedua-duanya berkait, tetapi bukan perkara yang sama.",
      quickExplanation:
        "Kedua-dua sampel mempunyai suhu yang sama, tetapi lebih banyak tenaga haba diperlukan untuk memanaskan kuantiti air yang lebih besar kepada suhu tersebut.",
      differencesTable: {
        title: "Jadual 9.1 — Perbezaan Antara Haba dengan Suhu",
        headers: ["Haba", "Suhu"],
        rows: [
          {
            label: "Makna",
            left: "Satu bentuk tenaga",
            right: "Darjah kepanasan atau kesejukan sesuatu objek",
          },
          {
            label: "Unit",
            left: "joule (J)",
            right: "darjah Celsius (°C) atau kelvin (K)",
          },
          {
            label: "Bergantung pada",
            left: ["jenis bahan", "kuantiti bahan", "suhu"],
            right: "darjah pergerakan zarah dalam bahan itu",
          },
        ],
      },
      comparison: {
        title: "Suhu Sama, Kuantiti Berbeza",
        columns: [
          {
            title: "Bekas A",
            body: "100 mL air pada 100 °C.",
            facts: [
              { label: "Isi padu", value: "100 mL" },
              { label: "Suhu", value: "100 °C" },
            ],
          },
          {
            title: "Bekas B",
            body: "200 mL air pada 100 °C.",
            facts: [
              { label: "Isi padu", value: "200 mL" },
              { label: "Suhu", value: "100 °C" },
            ],
          },
        ],
      },
      checks: [
        {
          question:
            "Adakah sentuhan cara yang boleh dipercayai untuk memeriksa sama ada seseorang demam?",
          hint: "Tidak begitu — sentuhan bersifat subjektif dan dipengaruhi oleh suhu tangan anda sendiri. Termometer memberikan bacaan suhu yang objektif.",
        },
        {
          question:
            "Air dalam dua bikar (100 ml dan 200 ml) dididihkan. Adakah suhunya sama? Adakah kuantiti habanya sama?",
          hint: "Suhunya sama (100 °C), tetapi lebih banyak tenaga haba diperlukan untuk memanaskan sampel 200 ml itu, kerana kuantiti airnya lebih besar.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Tiga Cara Pemindahan Haba",
      conceptQuestion: "Bagaimanakah Haba Merambat?",
      intro:
        "Haba sentiasa mengalir daripada kawasan yang lebih panas ke kawasan yang lebih sejuk. Ia boleh berlaku melalui tiga cara. Konduksi ialah **proses pengaliran haba dari kawasan panas ke kawasan sejuk melalui medium pepejal**. Dalam bendalir, perolakan **membawa haba melalui pergerakan bendalir itu sendiri**. Sinaran pula tidak memerlukan sebarang medium — inilah **satu-satunya cara haba boleh merambat menerusi ruang kosong**.",
      quickExplanation:
        "Yang merambat di sepanjang bahan pengalir ialah tenaga, bukan zarah — setiap zarah hanya bergetar di tempatnya dan menyerahkan tenaga kepada jirannya.",
      heatFlowDirection: {
        title: "➡️ Ke arah manakah haba mengalir?",
        instruction:
          "Haba sentiasa bergerak dalam satu arah: daripada yang lebih panas ke yang lebih sejuk.",
        heatLabel: "haba",
        noNetFlowLabel: "tiada pemindahan haba bersih",
        caption: "Tetapkan arahnya dahulu — setiap cara di bawah menurut arah yang sama.",
        stages: [
          {
            id: "flow",
            label: "Panas ke sejuk",
            note: "Haba mengalir daripada kawasan atau objek yang lebih panas ke kawasan atau objek yang lebih sejuk. Ia tidak akan mengalir ke arah sebaliknya dengan sendiri.",
            leftLabel: "PANAS",
            rightLabel: "SEJUK",
            leftTemperature: "80 °C",
            rightTemperature: "20 °C",
          },
        ],
      },
      ch9SpotlightFigure: {
        title: "🔥 Perbandingan tiga cara",
        figure: "heat-transfer",
        src: SCIENCE_F2_CH9_IMAGES.heatTransferMethods,
        alt: "Tiga panel bersebelahan. Sebatang rod logam dipanaskan penunu Bunsen di satu hujung, dengan zarah-zarah dilukis di sepanjangnya. Sebuah bikar air di atas penunu dengan anak panah beredar naik di bahagian tengah dan turun di tepi. Matahari di sebelah kiri menghantar sinaran beralun merentasi ruang kosong ke Bumi di sebelah kanan.",
        instruction:
          "Tekan setiap cara untuk melihat bagaimana haba bergerak. Panel yang anda pilih kekal cerah manakala dua yang lain menjadi malap.",
        prompt: "Pilih satu cara untuk membandingkan bagaimana haba merambat.",
        caption:
          "Satu gambar, tiga cara: melalui pepejal, melalui bendalir yang bergerak, dan tanpa medium sama sekali.",
        legendLabel: "Tiga cara pemindahan haba",
        concepts: [
          {
            id: "conduction",
            icon: "🔗",
            label: "Konduksi",
            spotlightCaption: "Melalui pepejal",
            note: "Konduksi ialah pemindahan haba melalui pepejal dari kawasan yang lebih panas ke kawasan yang lebih sejuk. Zarah di hujung panas memperoleh tenaga dan bergetar lebih cepat, lalu memindahkan tenaga itu kepada zarah jiran melalui perlanggaran. Zarah bergetar di sekitar kedudukan tetapnya — zarah tidak bergerak dari hujung panas ke hujung sejuk.",
          },
          {
            id: "convection",
            icon: "🌀",
            label: "Perolakan",
            spotlightCaption: "Melalui bendalir bergerak",
            note: "Perolakan memindahkan haba melalui bendalir — cecair dan gas. Apabila bendalir dipanaskan, ia mengembang, menjadi kurang tumpat lalu naik. Bendalir yang lebih sejuk adalah lebih tumpat lalu turun. Peredaran berterusan ini membentuk arus perolakan.",
          },
          {
            id: "radiation",
            icon: "☀️",
            label: "Sinaran",
            spotlightCaption: "Menerusi ruang kosong",
            note: "Sinaran memindahkan haba tanpa memerlukan medium bahan, jadi ia boleh merambat menerusi vakum. Konduksi memerlukan bahan dan perolakan memerlukan bendalir; sinaran tidak memerlukan kedua-duanya.",
          },
        ],
      },
      conductionDiagram: {
        title: "🔗 Terokai konduksi: tenaga di sepanjang pepejal",
        instruction: "Tekan setiap peringkat untuk melihat tenaga merambat di sepanjang rod.",
        particleCount: 9,
        hotLabel: "Hujung panas",
        coldLabel: "Hujung sejuk",
        mechanismNote:
          "Perhatikan bahawa zarah-zarah kekal di kedudukannya. Yang merambat di sepanjang rod ialah tenaga, bukan zarah — zarah hanya bergetar di tempatnya dan menyerahkan tenaga kepada jirannya.",
        stages: [
          {
            id: "start",
            label: "Mula dipanaskan",
            note: "Zarah di hujung panas menerima tenaga haba dan mula bergetar dengan lebih cepat.",
          },
          {
            id: "middle",
            label: "Tenaga merambat",
            note: "Zarah yang bergetar lebih cepat berlanggar dengan zarah jiran dengan lebih kerap, memindahkan tenaga ke bahagian tengah rod.",
          },
          {
            id: "full",
            label: "Tenaga sampai ke hujung yang jauh",
            note: "Perlanggaran berterusan zarah demi zarah membawa tenaga haba sehingga ke hujung yang sejuk.",
          },
        ],
        caption: "Zarah kekal di kedudukannya — hanya tenaga yang merambat.",
        hint: "Pilih satu peringkat untuk melihat apa yang berlaku.",
      },
      checks: [
        {
          question:
            "Adakah zarah logam bergerak dari hujung panas ke hujung sejuk semasa konduksi?",
          hint: "Tidak. Zarah kekal di kedudukannya dan hanya bergetar; tenaga sahaja yang dipindahkan melalui perlanggaran.",
        },
        {
          question:
            "Bagaimanakah tenaga haba dari Matahari sampai ke Bumi, dan mengapa hanya satu cara sahaja yang boleh melakukannya?",
          hint: "Melalui sinaran. Ruang angkasa ialah vakum, jadi konduksi tidak mempunyai bahan yang diperlukannya dan perolakan tidak mempunyai bendalir yang diperlukannya — hanya sinaran merambat tanpa medium bahan.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Pengaliran Haba dalam Fenomena Semula Jadi",
      conceptQuestion: "Bagaimanakah Haba Mengalir dalam Alam Semula Jadi?",
      intro:
        "Haba dari Matahari sampai ke Bumi melalui sinaran, satu-satunya cara yang tidak memerlukan sebarang medium. Haba itu tidak memanaskan darat dan laut sama rata, dan kerana **darat memanas dan menyejuk dengan lebih cepat berbanding laut**, bayu laut dan bayu darat terbentuk. Kedua-duanya merupakan **contoh perolakan yang berlaku secara semula jadi**.",
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
            image: {
              src: SCIENCE_F2_CH9_IMAGES.seaBreeze,
              alt: "Kawasan pantai pada tengah hari yang cerah. Laut berada di sebelah kiri, pantai berpasir dan daratan hijau berpokok di sebelah kanan, di bawah matahari yang tinggi.",
              caption:
                "Waktu siang — Matahari memanaskan darat lebih cepat daripada laut, jadi udara di atas darat ialah udara yang lebih panas.",
            },
            timeOfDay: "Waktu siang",
            note: "Pada waktu siang, Matahari memanaskan darat lebih cepat berbanding laut. Udara panas di darat mengembang, menjadi kurang tumpat dan naik ke atas. Udara sejuk yang lebih tumpat bergerak dari permukaan laut ke darat untuk menggantikannya — inilah bayu laut.",
          },
          {
            id: "land",
            label: "🌙 Bayu darat",
            warmerSide: "sea",
            image: {
              src: SCIENCE_F2_CH9_IMAGES.landBreeze,
              alt: "Kawasan pantai yang sama pada waktu malam di bawah bulan penuh. Laut berada di sebelah kiri, pantai dan daratan di sebelah kanan, kedua-duanya diterangi cahaya bulan sahaja.",
              caption:
                "Waktu malam — darat menyejuk lebih cepat daripada laut, jadi udara di atas laut kini ialah udara yang lebih panas.",
            },
            timeOfDay: "Waktu malam",
            note: "Pada waktu malam, darat menjadi sejuk dengan lebih cepat berbanding laut. Udara di permukaan laut yang lebih panas menjadi kurang tumpat lalu naik ke atas. Udara sejuk yang lebih tumpat dari darat bergerak ke laut — inilah bayu darat.",
          },
        ],
        caption:
          "Bayu dinamakan mengikut arah ia bertiup datang: bayu laut datang dari laut, bayu darat datang dari darat.",
        hint: "Pilih satu bayu untuk melihat arah pergerakan udaranya.",
      },
      ch9SpotlightFigure: {
        title: "☀️ Pemanasan Bumi oleh Matahari",
        figure: "sun-earth",
        src: SCIENCE_F2_CH9_IMAGES.sunEarthRadiation,
        alt: "Matahari di sebelah kiri bingkai menghantar empat sinaran beralun merentasi kegelapan angkasa ke Bumi di sebelah kanan, dengan bahagian Bumi yang mengadapnya diterangi.",
        instruction: "Tekan setiap bahagian untuk mengikuti perjalanan haba dari Matahari ke Bumi.",
        prompt: "Pilih satu bahagian perjalanan untuk melihat peranannya.",
        caption:
          "Haba dari Matahari sampai ke Bumi melalui sinaran — satu-satunya cara yang tidak memerlukan medium.",
        legendLabel: "Bagaimana haba Matahari sampai ke Bumi",
        concepts: [
          {
            id: "sun",
            icon: "☀️",
            label: "Matahari",
            spotlightCaption: "Sumber",
            note: "Matahari ialah sumber tenaga itu. Kerana suhunya amat tinggi, ia membebaskan haba dan cahaya sebagai sinaran ke semua arah.",
          },
          {
            id: "vacuum",
            icon: "🌌",
            label: "Vakum",
            spotlightCaption: "Tiada medium diperlukan",
            note: "Antara Matahari dan Bumi terdapat vakum — hampir tiada bahan sama sekali. Sinaran tetap boleh merentasinya kerana sinaran tidak memerlukan medium bahan, dan itulah sebabnya konduksi dan perolakan tidak dapat membawa haba Matahari kepada kita.",
          },
          {
            id: "earth",
            icon: "🌍",
            label: "Bumi",
            spotlightCaption: "Menyerap sinaran",
            note: "Bahagian Bumi yang mengadap Matahari menyerap sinaran suria yang tiba, lalu permukaan dan atmosfera di bahagian itu menjadi panas.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah bayu laut bertiup dari laut ke darat pada waktu siang?",
          hint: "Darat memanas lebih cepat, jadi udara panas di darat naik dan udara sejuk yang lebih tumpat dari laut bergerak masuk menggantikannya.",
        },
        {
          question: "Mengapakah hanya sinaran yang dapat membawa haba Matahari ke Bumi?",
          hint: "Ruang angkasa ialah vakum. Konduksi memerlukan bahan dan perolakan memerlukan bendalir, tetapi sinaran tidak memerlukan medium bahan sama sekali.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Konduktor dan Penebat Haba",
      conceptQuestion: "Apakah Konduktor dan Penebat Haba?",
      intro:
        "Bahan yang boleh **mengalirkan haba dengan mudah** dikenali sebagai konduktor haba. Bahan yang boleh **menghalang atau melambatkan pengaliran haba** pula dikenali sebagai penebat haba.",
      ch9SpotlightFigure: {
        title: "🍳 Konduktor dan penebat haba di sekeliling rumah",
        figure: "conductor-insulator",
        src: SCIENCE_F2_CH9_IMAGES.conductorsInsulators,
        alt: "Empat barangan harian. Sebuah kuali logam di atas dapur gas yang menyala. Sebuah seterika elektrik menggosok kemeja, tapak logamnya menekan fabrik. Gambar dekat sebelah tangan memegang pemegang kayu sebuah kuali panas. Sebuah kotak penyejuk polistirena terbuka berisi minuman sejuk dan ais.",
        instruction:
          "Tekan setiap barangan untuk mengetahui sama ada ia berfungsi sebagai konduktor atau penebat.",
        prompt: "Pilih satu barangan untuk melihat tugas yang dilakukan oleh bahannya.",
        caption:
          "Setiap barangan ini dipilih berdasarkan sebaik mana bahannya mengalirkan haba — atau seburuk mana.",
        legendLabel: "Konduktor dan penebat haba dalam barangan harian",
        concepts: [
          {
            id: "pan",
            icon: "🍳",
            label: "Kuali logam",
            spotlightCaption: "Konduktor",
            note: "Badan kuali diperbuat daripada logam kerana logam ialah konduktor haba yang baik. Haba dari api merambat dengan cepat melaluinya masuk ke dalam makanan.",
          },
          {
            id: "iron",
            icon: "👔",
            label: "Tapak seterika",
            spotlightCaption: "Konduktor",
            note: "Tapak seterika diperbuat daripada logam supaya haba mengalir melaluinya dengan mudah dan cepat sampai ke fabrik.",
          },
          {
            id: "handle",
            icon: "🪵",
            label: "Pemegang kayu",
            spotlightCaption: "Penebat",
            note: "Pemegang diperbuat daripada kayu kerana kayu ialah pengalir haba yang lemah — iaitu penebat haba. Ia melambatkan pengaliran haba ke tangan, jadi kuali boleh diangkat dengan selamat.",
          },
          {
            id: "cooler",
            icon: "🧊",
            label: "Kotak penyejuk polistirena",
            spotlightCaption: "Penebat",
            note: "Dinding kotak penyejuk diperbuat daripada polistirena, iaitu penebat haba. Ia melambatkan pengaliran haba dari udara panas di luar ke dalam kandungan yang sejuk, jadi minuman kekal sejuk lebih lama. Ia melambatkan pengaliran itu — bukan menghentikannya, dan itulah sebabnya ais akhirnya cair.",
          },
        ],
      },
      cards: [
        {
          title: "🔥 Konduktor haba",
          body: "Bahan yang membenarkan haba mengalir melaluinya dengan mudah. Logam seperti **kuprum, aluminium dan besi** ialah konduktor haba yang baik.",
          detail: "Contoh: dasar kuali logam, tapak seterika logam.",
        },
        {
          title: "🧊 Penebat haba",
          body: "Bahan yang menghalang atau melambatkan pengaliran haba. **Kayu, kapas, kain felt, gentian kaca dan polistirena** ialah penebat haba yang baik.",
          detail:
            "Contoh: sarung tangan ketuhar, dinding kotak ais, pemegang kayu pada peralatan dapur.",
        },
      ],
      accordions: [
        {
          title: "🧣 Mengapa selimut tebal memanaskan badan",
          body: "Selimut tebal diperbuat daripada bahan yang longgar dan gebu, lalu memerangkap banyak udara di dalamnya. Udara ialah pengalir haba yang lemah, jadi udara yang terperangkap itu melambatkan pengaliran haba dari badan ke persekitaran yang lebih sejuk. Itulah sebabnya selimut memanaskan badan — selimut sendiri tidak menghasilkan haba.",
          detail:
            "Dua lapis selimut nipis boleh lebih panas daripada satu selimut tebal, kerana satu lapisan udara turut terperangkap di antaranya.",
        },
        {
          title: "🥘 Mengapa makanan dibalut dengan kerajang aluminium",
          body: "Aluminium ialah konduktor haba yang baik, tetapi permukaan berkilat merupakan penyerap dan pembebas sinaran yang lemah. Membalut makanan panas dengan kerajang memantulkan haba yang disinarkan oleh makanan itu kembali kepadanya, jadi makanan kekal panas lebih lama. Kerajang yang sama pada makanan sejuk memantulkan haba yang disinarkan oleh persekitaran, jadi makanan kekal sejuk lebih lama.",
          detail:
            "Ini kesan permukaan, bukan penebatan: kerajang melambatkan kehilangan haba, bukan menghentikannya.",
        },
      ],
      miniExperiment: {
        title: "🧪 Pembalut manakah mengekalkan air panas paling lama?",
        aim: "Membandingkan sebaik mana bahan yang berbeza menebat haba.",
        instruction: "Empat kelalang serupa berisi air panas, empat jenis pembalut yang berbeza.",
        aimLabel: "Tujuan",
        hypothesisLabel: "Hipotesis",
        manipulatedLabel: "Pemboleh ubah dimanipulasikan",
        respondingLabel: "Pemboleh ubah bergerak balas",
        controlledLabel: "Pemboleh ubah dimalarkan",
        materialsLabel: "Bahan",
        apparatusLabel: "Radas",
        methodLabel: "Kaedah",
        observationLabel: "Pemerhatian",
        conclusionLabel: "Kesimpulan",
        operationalDefinitionLabel: "Definisi secara operasi",
        parts: [
          {
            id: "wrapping",
            icon: "🧣",
            label: "Jenis bahan penebat",
            question:
              "Adakah jenis bahan penebat mempengaruhi suhu akhir air panas selepas tempoh masa yang sama?",
            hypothesis:
              "Kelalang yang dibalut dengan pengalir haba yang lebih lemah mempunyai suhu akhir yang lebih tinggi selepas 10 minit berbanding kelalang yang dibalut dengan pengalir haba yang lebih baik atau yang dibiarkan terbuka.",
            manipulated: "Jenis bahan penebat",
            responding: "Suhu akhir air selepas 10 minit",
            controlled:
              "Isi padu air panas, suhu awal air, kelalang yang digunakan, ketebalan setiap pembalut dan persekitaran",
            materials: "Air panas, kapas, kain felt dan kerajang aluminium",
            apparatus:
              "Empat kelalang kon serupa, empat termometer, silinder penyukat dan jam randik",
            method: [
              "Labelkan empat kelalang serupa sebagai K, L, M dan N, lalu tuangkan isi padu air panas yang sama ke dalam setiap satu.",
              "Biarkan kelalang K terbuka. Balut kelalang L dengan kapas, kelalang M dengan kain felt dan kelalang N dengan kerajang aluminium, menggunakan ketebalan yang sama.",
              "Rekodkan suhu awal dalam setiap kelalang — kesemuanya mesti sama.",
              "Biarkan keempat-empat kelalang bersebelahan di tempat yang sama selama 10 minit, kemudian rekodkan suhu akhir setiap kelalang.",
              "Bandingkan suhu akhir air dalam setiap kelalang. Penurunan suhu yang lebih kecil menunjukkan penebat yang lebih baik.",
            ],
            observation:
              "Selepas 10 minit, kelalang K yang terbuka mempunyai suhu akhir paling rendah. Kelalang yang dibalut kapas dan kain felt mempunyai suhu akhir paling tinggi. Kelalang yang dibalut kerajang aluminium mempunyai suhu akhir yang lebih rendah berbanding kedua-duanya.",
            conclusion:
              "Jenis bahan penebat mempengaruhi suhu akhir air. Kapas dan kain felt memerangkap udara dan mengalirkan haba dengan lemah, jadi kedua-duanya penebat haba yang lebih baik, menghasilkan suhu akhir yang paling tinggi. Aluminium ialah konduktor haba, jadi kelalang N mempunyai suhu akhir yang lebih rendah. Setiap kelalang tetap menyejuk pada tahap tertentu — penebat melambatkan pengaliran haba, bukan menghentikannya. Hipotesis diterima.",
            operationalDefinition:
              "Sebaik mana sesuatu bahan menebat haba ditunjukkan oleh setinggi mana suhu akhir air itu kekal selepas tempoh masa yang sama (10 minit) — penurunan suhu yang lebih kecil menunjukkan penebatan yang lebih baik.",
          },
        ],
      },
      matcher: {
        title: "🔌 Padankan bahan dengan fungsinya",
        instruction: "Pilih jenis bahan, kemudian pilih barangan harian yang menggunakannya.",
        pairs: [
          {
            id: "pan",
            label: "🔥 Konduktor haba — memasak makanan dengan cepat",
            match: "Dasar kuali logam",
          },
          {
            id: "iron",
            label: "🔥 Konduktor haba — menggosok pakaian dengan cepat",
            match: "Tapak seterika logam",
          },
          {
            id: "gloves",
            label: "🧊 Penebat haba — melindungi tangan",
            match: "Sarung tangan ketuhar",
          },
          {
            id: "icebox",
            label: "🧊 Penebat haba — mengekalkan kesejukan",
            match: "Dinding kotak ais (gentian kaca/polistirena)",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah pemegang periuk sering diperbuat daripada kayu atau plastik?",
          hint: "Kayu dan plastik ialah penebat haba — keduanya menghalang haba daripada mengalir ke tangan semasa memasak.",
        },
        {
          question:
            "Sebuah kajian membandingkan kapas, kain felt dan kerajang aluminium sebagai pembalut kelalang berisi air panas. Bahan manakah menjadi penebat terbaik?",
          hint: "Kapas dan kain felt — keduanya melambatkan pengaliran haba, jadi suhu air kekal tinggi lebih lama. Kerajang aluminium ialah konduktor haba, jadi haba hilang dengan lebih cepat.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Keseimbangan Terma",
      conceptQuestion: "Apakah Keseimbangan Terma?",
      intro:
        "Apabila dua objek pada suhu yang berbeza bersentuhan secara terma, haba mengalir daripada objek yang lebih panas ke objek yang lebih sejuk.",
      heatFlowDirection: {
        title: "⚖️ Mencapai keseimbangan terma",
        instruction: "Tekan setiap peringkat untuk melihat apa yang berlaku kepada kedua-dua suhu.",
        heatLabel: "haba",
        noNetFlowLabel: "tiada pemindahan haba bersih",
        caption: "Keseimbangan terma dicapai apabila kedua-dua suhu menjadi sama.",
        stages: [
          {
            id: "flow",
            label: "Haba mengalir",
            note: "Kedua-dua objek berada pada suhu yang berbeza, jadi haba mengalir daripada yang lebih panas ke yang lebih sejuk. Objek yang lebih panas menyejuk dan objek yang lebih sejuk memanas.",
            leftLabel: "PANAS",
            rightLabel: "SEJUK",
            leftTemperature: "80 °C",
            rightTemperature: "20 °C",
          },
          {
            id: "equilibrium",
            label: "Keseimbangan terma",
            note: "Kedua-dua objek kini mempunyai suhu yang sama. Tiada pemindahan bersih haba antara kedua-duanya.",
            leftLabel: "SAMA",
            rightLabel: "SAMA",
            leftTemperature: "50 °C",
            rightTemperature: "50 °C",
          },
        ],
      },
      remember:
        "Keseimbangan terma dicapai apabila dua objek yang pada mulanya bersuhu berbeza mencapai suhu yang sama, dan tiada pemindahan bersih haba antara kedua-duanya.",
      checks: [
        {
          question:
            "Sebatang sudu sejuk dibiarkan di dalam secawan teh panas. Terangkan apa yang berlaku kepada suhu kedua-duanya dari semasa ke semasa.",
          hint: "Teh menyejuk dan sudu memanas. Haba mengalir daripada teh yang lebih panas ke sudu yang lebih sejuk sehingga kedua-duanya mencapai suhu yang sama — keseimbangan terma.",
        },
        {
          question: "Apakah dua syarat yang menerangkan keseimbangan terma?",
          hint: "Kedua-dua objek mempunyai suhu yang sama, dan tiada pemindahan bersih haba antara kedua-duanya.",
        },
      ],
    },
    {
      number: "9.3",
      title: "Pengembangan dan Pengecutan Jirim",
      conceptQuestion: "Apakah Pengembangan dan Pengecutan?",
      intro:
        "Apabila jirim dipanaskan, zarah-zarahnya memperoleh tenaga, bergerak atau bergetar dengan lebih cepat, dan **jarak antara zarah bertambah** — jadi jirim itu mengembang. Apabila disejukkan, zarah bergerak lebih perlahan, **jarak antara zarah berkurang**, dan jirim mengecut. Ini berlaku pada pepejal, cecair dan gas.",
      expansionParticles: {
        title: "🌡️ Zarah semasa pemanasan dan penyejukan",
        instruction: "Pilih keadaan jirim, kemudian tekan panaskan atau sejukkan.",
        heatedLabel: "Dipanaskan",
        cooledLabel: "Disejukkan",
        misconceptionNote:
          "Perhatikan saiz setiap zarah tidak pernah berubah. Yang berubah hanyalah jarak antara zarah — jirim mengembang kerana zarahnya menjauh, bukan kerana zarah itu sendiri membesar.",
        states: [
          {
            id: "solid",
            label: "Pepejal",
            note: "Zarah bergetar pada kedudukan tetap. Pemanasan menjadikannya bergetar lebih cepat dan menolak sedikit lebih jauh antara satu sama lain, jadi pepejal mengembang.",
          },
          {
            id: "liquid",
            label: "Cecair",
            note: "Zarah sudah bebas bergerak antara satu sama lain. Pemanasan menjadikannya bergerak lebih pantas dan lebih berjauhan, jadi cecair mengembang.",
          },
          {
            id: "gas",
            label: "Gas",
            note: "Zarah bergerak bebas dan jauh berjauhan. Pemanasan menjadikannya bergerak jauh lebih pantas, jadi gas mengembang paling banyak antara ketiga-tiga keadaan.",
          },
        ],
        caption: "Saiz zarah kekal sama; hanya jarak antara zarah yang berubah.",
        hint: "Pilih satu keadaan jirim untuk melihat kelakuan zarahnya.",
      },
      checks: [
        {
          question:
            "Penutup botol logam tersekat ketat. Bagaimanakah air panas membantu membukanya?",
          hint: "Haba menyebabkan logam penutup itu mengembang sedikit, jadi cengkamannya melonggar dan penutup lebih mudah dibuka.",
        },
        {
          question:
            "Sebiji bola pingpong yang kemik dimasukkan ke dalam air panas dan kembali pulih. Mengapa?",
          hint: "Haba menyebabkan udara di dalam bola itu mengembang, lalu menolak permukaan yang kemik itu keluar semula.",
        },
      ],
    },
    {
      number: "9.3",
      title: "Kegunaan Pengembangan dan Pengecutan",
      conceptQuestion: "Bagaimanakah Pengembangan Digunakan dalam Kehidupan Harian?",
      intro:
        "Prinsip pengembangan dan pengecutan jirim digunakan — dan perlu diambil kira — dalam banyak keadaan harian.",
      contextImages: [
        {
          src: SCIENCE_F2_CH9_IMAGES.expansionUses,
          alt: "Tiga panel. Ruang kecil yang ditinggalkan antara dua batang landasan kereta api di atas tetulangnya. Hujung dek jambatan keluli yang terletak di atas galas penggolek di atas tiang konkrit. Sebuah termometer cecair dalam kaca dengan turus merah naik dari bebulinya.",
          caption:
            "Tiga peruntukan harian untuk pengembangan dan pengecutan: ruang pada landasan kereta api, penggolek di bawah jambatan, dan turus cecair dalam termometer.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],

      bimetallicStrip: {
        title: "🔔 Jalur dwilogam dalam penggera kebakaran",
        instruction: "Tekan setiap keadaan untuk melihat kelakuan jalur itu.",
        fasterMetal: "Kuprum",
        slowerMetal: "Besi",
        contactLabel: "Skru sentuhan",
        alarmLabel: "Penggera",
        circuitClosedLabel: "litar lengkap",
        circuitOpenLabel: "litar terbuka",
        states: [
          {
            id: "room",
            label: "Suhu bilik",
            note: "Pada suhu bilik jalur itu lurus dan tidak menyentuh skru sentuhan. Litar tidak lengkap, jadi penggera tidak berbunyi.",
          },
          {
            id: "heated",
            label: "Dipanaskan oleh api",
            note: "Apabila terdedah kepada haba kebakaran, kuprum mengembang lebih cepat berbanding besi. Perbezaan ini menyebabkan jalur membengkok ke arah skru sentuhan, melengkapkan litar dan membunyikan penggera.",
          },
        ],
        caption: "Logam yang mengembang lebih cepat berada di bahagian luar lengkungan.",
        hint: "Pilih satu keadaan untuk melihat kelakuan jalur itu.",
        image: {
          src: SCIENCE_F2_CH9_IMAGES.bimetallicAlarm,
          alt: "Litar penggera kebakaran: sebuah sel, jalur dwilogam yang diskrukan pada satu hujung dengan lapisan kuprum di atas lapisan besi, penunu spirit yang menyala di bawah jalur itu, skru sentuh dan sebuah loceng.",
          caption:
            "Radas yang sama dalam kedua-dua keadaan — hanya jalur, sentuhan dan loceng yang berubah.",
        },
      },
      comparison: {
        title: "Bagaimanakah Pengembangan Membantu Menyelesaikan Masalah Harian?",
        columns: [
          {
            title: "🏓 Bola pingpong yang kemik",
            body: "Apabila bola pingpong yang kemik dimasukkan ke dalam air panas, udara di dalamnya dipanaskan dan mengembang lalu menolak bahagian kemik ke luar.",
          },
          {
            title: "🔒 Penutup botol yang ketat",
            body: "Apabila penutup logam direndam dalam air panas, penutup mengembang sedikit dan menjadi lebih mudah dibuka.",
          },
        ],
      },
      accordions: [
        {
          title: "🌡️ Termometer merkuri",
          body: "Merkuri **mengembang dan mengecut secara seragam** apabila suhu berubah, dan ia **mengesan perubahan suhu dengan cepat**. Ketinggian turus merkuri di dalam tiub itulah yang digunakan untuk mengukur suhu.",
          detail: "Ingat: termometer mengukur suhu, bukan haba.",
        },
        {
          title: "🚂 Ruang pada landasan kereta api",
          body: "Ruang kecil ditinggalkan antara bahagian rel supaya landasan boleh **mengembang pada hari yang panas tanpa membengkok atau terangkat**.",
        },
        {
          title: "🌉 Penggolek pada jambatan keluli",
          body: "Satu hujung jambatan diletakkan di atas penggolek supaya seluruh struktur boleh **mengembang dan mengecut dengan selamat** mengikut perubahan suhu.",
        },
        {
          title: "⚡ Kabel elektrik di udara",
          body: "Kabel elektrik pada tiang dipasang agak kendur. Kabel mengembang apabila panas dan mengecut apabila sejuk. Kekenduran mengurangkan tegangan berlebihan semasa pengecutan.",
        },
      ],
      checks: [
        {
          question:
            "Dalam jalur dwilogam penggera kebakaran, logam manakah mengembang lebih cepat, dan ke arah manakah jalur itu membengkok?",
          hint: "Kuprum mengembang lebih cepat berbanding besi, jadi jalur itu membengkok ke arah skru sentuhan lalu melengkapkan litar.",
        },
        {
          question: "Apakah yang diukur oleh sebuah termometer?",
          hint: "Suhu. Termometer mengukur darjah kepanasan atau kesejukan, bukan kuantiti haba.",
        },
      ],
    },
    {
      number: "9.4",
      title: "Penyerapan dan Pembebasan Haba",
      conceptQuestion: "Bagaimanakah Permukaan Mempengaruhi Penyerapan dan Pembebasan Haba?",
      intro:
        "Keupayaan sesuatu objek untuk menyerap dan membebaskan haba bergantung pada jenis dan warna permukaannya. Apabila objek menyerap haba, suhunya meningkat; apabila objek membebaskan haba, suhunya menurun. **Permukaan yang gelap dan kusam ialah penyerap haba yang baik dan pembebas haba yang baik**. **Permukaan yang cerah dan berkilat ialah penyerap haba yang lemah dan pembebas haba yang lemah** — sebaliknya ia memantulkan lebih banyak sinaran.",
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
        image: {
          src: SCIENCE_F2_CH9_IMAGES.absorptionEmission,
          alt: "Dua tin air yang serupa berdiri pada jarak yang sama dari satu sumber haba di antaranya, masing-masing dengan termometer menembusi penutupnya. Tin di sebelah kiri berwarna hitam malap; tin di sebelah kanan berwarna perak berkilat.",
          caption:
            "Tin yang serupa, jarak yang sama, satu sumber haba — hanya permukaannya yang berbeza.",
        },
      },
      cards: [
        {
          title: "Kegunaan harian",
          body: "Lori tangki minyak dicat dengan **permukaan perak atau putih yang berkilat**. Permukaan berkilat memantulkan lebih banyak sinaran Matahari dan menyerap kurang haba, jadi minyak di dalamnya kurang panas dan penyejatan dapat dikurangkan.",
          detail:
            "Sebaliknya, pemanas air solar menggunakan panel berwarna gelap supaya menyerap haba matahari sebanyak mungkin.",
        },
      ],
      checks: [
        {
          question: "Mengapakah pakaian berwarna cerah terasa lebih selesa semasa cuaca panas?",
          hint: "Permukaan cerah menyerap kurang haba daripada Matahari berbanding permukaan gelap, jadi badan tidak menjadi terlalu panas.",
        },
        {
          question:
            "Apakah ciri permukaan dinding kelalang termos yang membantu mengekalkan suhu air panas?",
          hint: "Permukaan berkilat — ia pembebas haba yang kurang baik, jadi haba lebih lambat hilang dari air di dalamnya.",
        },
      ],
    },
    {
      number: "9.4",
      title: "Konsep Bangunan Hijau",
      conceptQuestion: "Apakah Bangunan Hijau?",
      intro:
        "Konsep Bangunan Hijau ialah idea yang dijana untuk **mengurangkan kesan pembangunan yang pesat terhadap alam sekitar dan kesihatan manusia**. Konsep haba yang anda pelajari dalam bab ini digunakan secara langsung: sebuah rumah hijau direka supaya tenaga yang diperlukan untuk menyejukkan atau memanaskannya dapat dikurangkan.",
      contextImages: [
        {
          src: SCIENCE_F2_CH9_IMAGES.greenBuilding,
          alt: "Sebuah rumah tropika bertiang dengan bumbung yang menjuntai lebar, panel solar pada satu cerun bumbung, penebat dipadatkan di bawah bumbung, tingkap bidai pada setiap dinding, kipas siling di dalamnya, serta pokok peneduh dan tumbuhan di sekelilingnya.",
          caption:
            "Penebat bumbung, teduhan, pengudaraan semula jadi dan panel solar — idea haba dalam bab ini, dibina dalam satu rumah.",
          size: "scene",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotationMode: "numbers",
          annotations: [
            {
              id: "reflective-roof",
              icon: "☀️",
              label: "Bumbung berwarna cerah",
              x: 45.5,
              y: 25.5,
              note: "Bumbung yang cerah dan berkilat ialah penyerap haba yang lemah, jadi kurang haba Matahari diserap masuk ke dalam bangunan.",
            },
            {
              id: "insulation",
              icon: "🧊",
              label: "Penebat bumbung",
              x: 31.4,
              y: 50.2,
              note: "Penebat yang dipadatkan di bawah bumbung ialah penebat haba. Ia melambatkan pengaliran haba dari bumbung yang panas ke dalam bilik, jadi kurang tenaga diperlukan untuk menyejukkannya.",
            },
            {
              id: "overhang",
              icon: "🌤️",
              label: "Bumbung menjuntai",
              x: 17.9,
              y: 59.5,
              note: "Bumbung yang menjuntai lebar menghalang cahaya matahari terus daripada mengenai dinding dan tingkap di bawahnya, jadi kurang haba diserap melaluinya.",
            },
            {
              id: "ventilation",
              icon: "🌬️",
              label: "Tingkap bidai",
              x: 44.3,
              y: 65.9,
              note: "Tingkap bidai pada dinding bertentangan membenarkan arus perolakan membawa udara panas keluar dan udara sejuk masuk, tanpa kipas atau penyaman udara.",
            },
            {
              id: "trees",
              icon: "🌳",
              label: "Pokok peneduh",
              x: 86.7,
              y: 21.3,
              note: "Pokok yang ditanam di sekeliling rumah meneduhi bumbung dan dinding, jadi kurang haba Matahari sampai kepadanya.",
            },
          ],
        },
      ],

      tabs: [
        {
          title: "⚡ Kecekapan tenaga",
          body: "Bangunan hijau mempunyai **kecekapan tenaga yang tinggi**, contohnya melalui penggunaan tenaga solar atau tenaga lain yang boleh diperbaharui. Penebat haba pada dinding dan bumbung mengurangkan pengaliran haba masuk, jadi kurang tenaga diperlukan untuk penyaman udara.",
        },
        {
          title: "💧 Kecekapan air",
          body: "**Sistem pengaliran air yang baik**, termasuk penuaian air hujan dan kitar semula air, mengurangkan penggunaan air bersih.",
        },
        {
          title: "🏗️ Tapak dan bahan binaan",
          body: "Tapak pembinaan yang lestari dan penggunaan **bahan binaan kitar semula** mengurangkan kesan terhadap alam sekitar. Bumbung dan dinding berwarna cerah memantulkan lebih banyak haba matahari.",
        },
        {
          title: "💡 Peredaran udara dan inovasi",
          body: "**Sistem peredaran udara dan pencahayaan semula jadi yang baik** membolehkan arus perolakan membawa udara panas keluar tanpa kipas atau penyaman udara. Inovasi reka bentuk seperti ini menjadikan rumah lebih selesa dengan tenaga yang lebih sedikit.",
        },
      ],
      checksTitle: "Bangunan Hijau — semak pantas",
      checks: [
        {
          question:
            "Bagaimanakah penebat haba pada bumbung mengurangkan penggunaan tenaga sebuah rumah?",
          hint: "Penebat melambatkan pengaliran haba dari bumbung yang panas ke dalam rumah, jadi kurang tenaga diperlukan untuk menyejukkan ruang di dalamnya.",
        },
        {
          question:
            "Mengapakah bumbung dan dinding berwarna cerah membantu menyejukkan sebuah rumah?",
          hint: "Permukaan cerah dan berkilat ialah penyerap haba yang kurang baik, jadi kurang haba matahari diserap ke dalam bangunan itu.",
        },
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
      explanation:
        "Haba ialah satu bentuk tenaga yang diukur dalam joule; suhu ialah darjah kepanasan atau kesejukan yang diukur dalam °C atau K. Kedua-duanya berkait, tetapi tidak sama.",
    },
    {
      type: "multiple-choice",
      question: "Kaedah pemindahan haba yang manakah tidak memerlukan sebarang medium?",
      options: ["Konduksi", "Perolakan", "Sinaran", "Kesemuanya"],
      answerIndex: 2,
      explanation:
        "Sinaran adalah cara haba daripada Matahari merentasi ruang kosong untuk sampai ke Bumi — tiada medium diperlukan.",
    },
    {
      type: "multiple-choice",
      question: "Apakah yang diukur oleh sebuah termometer?",
      options: [
        "Kuantiti haba dalam objek",
        "Suhu objek",
        "Tenaga kinetik jumlah objek",
        "Kadar pengaliran haba",
      ],
      answerIndex: 1,
      explanation:
        "Termometer mengukur suhu — darjah kepanasan atau kesejukan — dan bukan kuantiti haba yang terkandung dalam objek itu.",
    },
  ],
};
