import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch7-keelektrikan-kemagnetan.png";

export const scienceF2C7InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 7,
  blogHighlight: {
    title: "Blog Sains — Belut Elektrik",
    body: "Seekor belut elektrik mempunyai kira-kira 6,000 sel khas dipanggil elektrosit, membolehkannya melepaskan sehingga 600 volt — cukup untuk mengejutkan pemangsa, menangkap mangsa, malah mengharungi habitatnya yang keruh di mana penglihatan hampir tidak membantu.",
    imagePath: chapterImage,
  },
  keywords: [
    "Tenaga",
    "Cas elektrostatik",
    "Elektroskop",
    "Arus elektrik",
    "Voltan",
    "Rintangan",
    "Hukum Ohm",
    "Litar bersiri",
    "Litar selari",
    "Medan magnet",
    "Titik neutral",
    "Elektromagnet",
    "Petua genggaman tangan kanan",
    "Solenoid",
  ],
  sections: [
    // ---------------------------------------------------------------- 7.1
    {
      number: "7.1",
      title: "Tenaga",
      intro:
        "Tenaga bermaksud kemampuan untuk melakukan kerja, dan unit S.I.-nya ialah joule (J). Tenaga tidak boleh dicipta atau dimusnahkan — ia hanya bertukar daripada satu bentuk kepada bentuk yang lain. Dua idea di sini mudah dikelirukan: bentuk tenaga dan sumber tenaga bukan perkara yang sama.",
      cards: [
        {
          title: "Bentuk berbanding sumber",
          body: "Sumber tenaga ialah dari mana tenaga itu datang. Bentuk tenaga pula memerihalkan jenis tenaga itu wujud.",
          detail: "Contoh: matahari ialah sumber; cahaya dan haba ialah bentuk.",
        },
        {
          title: "☀️ Sumber tenaga",
          body: "Matahari, angin, bahan radioaktif, bahan api fosil, geoterma, biojisim, ombak dan air.",
          detail: "Lapan sumber ini membekalkan tenaga yang kemudian bertukar kepada pelbagai bentuk.",
        },
      ],
      flipCards: [
        { id: "sound", icon: "🔊", label: "Bunyi", fact: "Getaran yang membawa tenaga melalui udara, seperti pembesar suara." },
        { id: "kinetic", icon: "🏃", label: "Kinetik", fact: "Tenaga pergerakan — haiwan yang berlari, kereta yang bergerak." },
        { id: "electrical", icon: "🔌", label: "Elektrik", fact: "Tenaga yang dibawa oleh cas elektrik yang mengalir." },
        { id: "gravitational", icon: "⛰️", label: "Keupayaan graviti", fact: "Tenaga tersimpan disebabkan ketinggian — buku di atas rak." },
        { id: "elastic", icon: "🎯", label: "Keupayaan kenyal", fact: "Tenaga tersimpan dalam objek yang diregang atau dimampat, seperti spring." },
        { id: "light", icon: "💡", label: "Cahaya", fact: "Tenaga yang disinarkan sebagai cahaya nampak, seperti mentol." },
        { id: "nuclear", icon: "☢️", label: "Nuklear", fact: "Tenaga tersimpan dalam nukleus atom." },
        { id: "heat", icon: "🔥", label: "Haba", fact: "Tenaga yang berpindah disebabkan perbezaan suhu." },
        { id: "chemical", icon: "🧪", label: "Kimia", fact: "Tenaga tersimpan dalam ikatan kimia, seperti dalam makanan atau bahan api." },
      ],
      checks: [
        {
          question: "Angin memutarkan turbin yang menjana elektrik. Apakah sumber tenaga di sini, dan apakah bentuk tenaganya?",
          hint: "Sumber: angin. Bentuk: tenaga kinetik angin bertukar kepada tenaga kinetik turbin, kemudian kepada tenaga elektrik.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Cas Elektrostatik",
      intro:
        "Semua jirim mengandungi cas positif (proton) dan cas negatif (elektron). Apabila dua bahan berbeza digosokkan, hanya elektron berpindah — proton tidak bergerak. Objek yang memperoleh elektron menjadi bercas negatif; objek yang kehilangan elektron menjadi bercas positif; objek dengan bilangan proton dan elektron yang sama adalah neutral.",
      cards: [
        {
          title: "Tarikan dan tolakan",
          body: "Cas yang sama jenis saling menolak. Cas yang berlainan jenis saling menarik. Inilah sebabnya sikat yang telah digosok boleh menarik cebisan kertas kecil.",
        },
        {
          title: "Mengesan cas elektrostatik",
          body: "Elektroskop ialah alat yang digunakan untuk mengesan kewujudan cas elektrik pada suatu objek. Kerajang emasnya mencapah kerana cas yang sama saling menolak.",
          detail: "Semakin jauh pencapahan kerajang emas, semakin banyak kuantiti cas yang terkumpul.",
        },
      ],
      checks: [
        {
          question: "Sebatang rod digosok dengan kain, lalu menjadi bercas negatif. Apakah yang telah berlaku kepada elektronnya?",
          hint: "Rod itu telah memperoleh elektron daripada kain. Hanya elektron berpindah semasa penggosokan — proton kekal di tempatnya.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Elektrostatik dalam Kehidupan Harian",
      intro:
        "Cas elektrostatik bukan sekadar kesan makmal. Ia menerangkan kilat, renjatan kecil yang anda rasa pada tombol pintu, dan beberapa langkah keselamatan penting.",
      accordions: [
        {
          title: "⚡ Kejadian kilat",
          body: "Geseran antara awan dan udara menyebabkan awan dicas dengan cas elektrik. Kilat berlaku kerana daya tarikan antara cas positif pada Bumi dan cas negatif pada awan.",
        },
        {
          title: "🏢 Konduktor kilat",
          body: "Konduktor kilat dipasang pada bangunan untuk menyediakan satu lintasan bagi cas elektrik daripada kilat masuk ke dalam Bumi. Cara ini melindungi bangunan daripada disambar kilat.",
        },
        {
          title: "👕 Cuaca kering dan pemilihan pakaian",
          body: "Semasa cuaca kering, cas elektrostatik lebih mudah terkumpul pada objek. Wap air yang banyak di udara semasa cuaca lembap pula menghalang pengumpulan cas. Itulah sebabnya renjatan kecil lebih kerap berlaku dalam keadaan kering.",
          detail: "Jika lantai berkarpet nilon menyebabkan renjatan kecil apabila menyentuh objek logam, memakai kasut bertapak getah dicadangkan untuk mengurangkan kesan tersebut.",
        },
        {
          title: "⛽ Keselamatan semasa mengisi petrol",
          body: "Wap petrol mudah terbakar. Percikan daripada cas elektrostatik yang terkumpul boleh menyalakan wap itu, maka cas perlu dikurangkan atau dialirkan dengan selamat semasa mengisi minyak.",
          detail: "Itulah sebabnya nozel dan tangki disambungkan supaya cas mengalir ke bumi, dan pengguna dinasihatkan supaya tidak berulang-alik masuk dan keluar kenderaan.",
        },
        {
          title: "🚗 Konsep sangkar Faraday",
          body: "Sebuah kotak logam boleh melindungi apa yang berada di dalamnya kerana cas mengalir pada permukaan luar logam itu dan tidak masuk ke dalam. Inilah sebabnya kekal berada di dalam kenderaan berbadan logam ialah tempat perlindungan yang lebih selamat semasa ribut petir.",
          detail: "Perlindungan itu datang daripada badan logam yang mengalirkan cas di sekelilingnya — bukan daripada tayar getah.",
        },
      ],
      checks: [
        {
          question: "Mengapakah penjana Van de Graaff tidak berfungsi dengan baik ketika cuaca lembap?",
          hint: "Wap air yang banyak di udara semasa cuaca lembap menghalang pengumpulan cas pada objek, jadi cas tidak dapat terkumpul dengan banyak.",
        },
        {
          question: "Semasa ribut petir, di manakah tempat berlindung yang lebih selamat — di bawah pokok tinggi atau di dalam kereta berbadan logam? Mengapa?",
          hint: "Di dalam kereta berbadan logam. Badan logam mengalirkan cas di sekeliling bahagian luar dan bukan melalui ruang di dalamnya — inilah konsep sangkar Faraday.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Arus Elektrik",
      intro:
        "Apabila cas mengalir melalui suatu konduktor, aliran itu menghasilkan arus elektrik. Arus ialah kadar aliran cas elektrik melalui konduktor. Terdapat dua cara arah aliran ini diperihalkan, dan kedua-duanya bertentangan antara satu sama lain.",
      cards: [
        {
          title: "➕ ➡️ ➖ Arus konvensional",
          body: "Arah aliran arus konvensional ialah dari terminal positif ke terminal negatif.",
          detail: "Inilah arah yang digunakan dalam semua litar dan petua yang anda pelajari.",
        },
        {
          title: "➖ ➡️ ➕ Pergerakan elektron",
          body: "Elektron sebenarnya bergerak dari terminal negatif ke terminal positif.",
          detail: "Kedua-dua arah ini bertentangan — pastikan anda tahu yang mana satu ditanya.",
        },
        {
          title: "Membuktikan cas mengalir",
          body: "Cas daripada penjana Van de Graaff yang disambungkan kepada galvanometer yang dibumikan akan menyebabkan jarum galvanometer memesong — menunjukkan bahawa cas yang mengalir menghasilkan arus elektrik.",
          detail: "Galvanometer digunakan untuk mengesan arus elektrik yang kecil.",
        },
      ],
      checks: [
        {
          question: "Dalam satu litar mudah, ke arah manakah elektron bergerak, dan ke arah manakah arus konvensional dikatakan mengalir?",
          hint: "Elektron bergerak dari terminal negatif ke positif. Arus konvensional pula dikatakan mengalir dari terminal positif ke negatif — arah yang bertentangan.",
        },
        {
          question: "Mengapakah renjatan daripada penjana Van de Graaff tidak terasa sebahaya renjatan daripada palam dinding?",
          hint: "Arus daripada penjana Van de Graaff adalah jauh lebih kecil berbanding arus daripada bekalan kuasa domestik — arus, bukan voltan semata-mata, yang menentukan bahaya.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Arus, Voltan dan Rintangan",
      intro:
        "Tiga kuantiti elektrik yang perlu anda kenali, setiap satu dengan simbol, unit dan alat pengukurnya sendiri. Yang paling kerap diuji bukan sahaja apa yang diukur oleh setiap alat, tetapi bagaimana alat itu disambungkan ke dalam litar.",
      cards: [
        {
          title: "Arus, I",
          body: "Kadar aliran cas elektrik melalui konduktor.",
          detail: "Unit: ampere (A) · Alat: ammeter · Sambungan: bersiri",
        },
        {
          title: "Voltan, V",
          body: "Beza keupayaan antara dua titik dalam litar.",
          detail: "Unit: volt (V) · Alat: voltmeter · Sambungan: selari",
        },
        {
          title: "Rintangan, R",
          body: "Keupayaan konduktor untuk merintangi aliran arus. Perintang tetap mempunyai rintangan yang tidak boleh diselaraskan, manakala reostat (perintang berubah) boleh diselaraskan.",
          detail: "Unit: ohm (Ω)",
        },
      ],
      circuitMeterDiagram: {
        title: "🔌 Ke mana setiap alat pengukur disambungkan",
        instruction: "Tekan mana-mana komponen untuk melihat fungsinya dan cara ia disambung.",
        ruleCaption: "Ammeter — disambung BERSIRI · Voltmeter — disambung SELARI",
        hint: "Perhatikan bahawa voltmeter berada pada cabangnya sendiri merentasi mentol.",
        labels: [
          {
            id: "cell",
            label: "Sel",
            note: "Membekalkan beza keupayaan yang mendorong cas mengalir mengelilingi litar.",
          },
          {
            id: "switch",
            label: "Suis",
            note: "Melengkapkan atau memutuskan litar. Apabila suis dibuka, tiada arus mengalir.",
          },
          {
            id: "bulb",
            label: "Mentol",
            note: "Komponen yang arus dan voltannya sedang diukur di sini.",
          },
          {
            id: "ammeter",
            label: "Ammeter (A)",
            note: "Mengukur arus dalam unit ampere. Ia disambung SECARA BERSIRI — arus yang sama mesti melalui ammeter dan mentol, jadi ammeter berada di dalam gelung utama itu sendiri.",
          },
          {
            id: "voltmeter",
            label: "Voltmeter (V)",
            note: "Mengukur voltan dalam unit volt. Ia disambung SECARA SELARI merentasi mentol — perhatikan cabang berasingan yang keluar sebelum mentol dan kembali selepasnya.",
          },
        ],
      },
      checks: [
        {
          question: "Di manakah ammeter perlu disambungkan untuk mengukur arus yang melalui sebuah mentol?",
          hint: "Secara bersiri dengan mentol itu — di dalam gelung yang sama, supaya arus yang sama mengalir melalui kedua-duanya.",
        },
        {
          question: "Di manakah voltmeter perlu disambungkan untuk mengukur voltan merentasi sebuah mentol?",
          hint: "Secara selari dengan mentol itu — pada cabangnya sendiri merentasi kedua-dua hujung mentol.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Hukum Ohm",
      intro:
        "Hukum Ohm menyatakan bahawa arus elektrik yang mengalir melalui suatu konduktor adalah berkadar terus dengan voltan yang merentasi dua hujung konduktor itu, dengan syarat suhu dan keadaan fizik lain adalah tetap. Hubungan ini ditulis sebagai V = IR.",
      cards: [
        {
          title: "V = IR",
          body: "Voltan (V) = Arus (I) × Rintangan (R). Susun semula untuk mencari mana-mana satu: I = V ÷ R, dan R = V ÷ I.",
          detail: "V dalam volt · I dalam ampere · R dalam ohm",
        },
        {
          title: "Apa yang berlaku apabila rintangan bertambah",
          body: "Pada voltan yang tetap, arus yang mengalir berkurang apabila rintangan bertambah. Menambah panjang dawai meningkatkan rintangannya, lalu mengurangkan arus.",
        },
      ],
      calculators: [
        {
          type: "ohms-law",
          title: "🧮 Kalkulator Hukum Ohm",
          instruction: "Masukkan mana-mana dua nilai untuk mencari yang ketiga.",
        },
      ],
      checks: [
        {
          question: "Sebuah mentol kereta mengalirkan arus 0.025 A apabila disambungkan kepada akumulator 12 V. Berapakah rintangannya?",
          hint: "R = V ÷ I = 12 ÷ 0.025 = 480 Ω. Cuba dalam kalkulator di atas.",
        },
      ],
    },

    // ---------------------------------------------------------------- 7.2
    {
      number: "7.2",
      title: "Litar Bersiri dan Litar Selari",
      intro:
        "Litar bersiri menyambungkan komponen secara berturutan dalam satu laluan tunggal. Litar selari pula terbahagi kepada beberapa cabang berasingan. Perbezaan itu mengubah cara arus, voltan dan rintangan berkelakuan.",
      seriesParallel: {
        title: "🔀 Satu laluan berbanding beberapa cabang",
        instruction: "Tekan mana-mana litar untuk melihat kelebihan dan kekurangannya.",
        currentLabel: "Arus",
        voltageLabel: "Voltan",
        resistanceLabel: "Rintangan",
        advantageLabel: "Kelebihan",
        disadvantageLabel: "Kekurangan",
        hint: "Perhatikan bilangan laluan yang boleh dilalui oleh cas dalam setiap litar.",
        kinds: [
          {
            id: "series",
            name: "Litar bersiri",
            pathSummary: "Satu laluan sahaja",
            currentRule: "I = I₁ = I₂",
            voltageRule: "V = V₁ + V₂",
            resistanceRule: "R = R₁ + R₂",
            advantage:
              "Setiap komponen menerima kuantiti arus yang sama, dan semua komponen dikawal oleh suis yang sama.",
            disadvantage:
              "Jika satu komponen rosak, seluruh litar terhenti. Menambah komponen meningkatkan jumlah rintangan dan mengurangkan arus.",
            note: "Semua komponen berada pada gelung yang sama, jadi cas hanya mempunyai satu laluan untuk dilalui.",
          },
          {
            id: "parallel",
            name: "Litar selari",
            pathSummary: "Beberapa cabang",
            currentRule: "I = I₁ + I₂",
            voltageRule: "V = V₁ = V₂",
            resistanceRule: "1/R = 1/R₁ + 1/R₂",
            advantage:
              "Setiap alat boleh dihidupkan atau dimatikan secara berasingan, dan menambah alat tidak menjejaskan fungsi alat lain dalam litar yang sama.",
            disadvantage:
              "Voltan setiap alat tidak dapat dikawal secara berasingan kerana ia sentiasa sama dengan voltan sumber.",
            note: "Litar terbahagi kepada cabang di satu titik dan bercantum semula di titik yang lain, jadi cas mempunyai lebih daripada satu laluan.",
          },
        ],
      },
      calculators: [
        {
          type: "resistance-comparator",
          title: "🔌 Bandingkan rintangan berkesan",
          instruction: "Masukkan dua nilai perintang dan lihat bagaimana litar bersiri dan selari menggabungkannya.",
          defaultR1: 2,
          defaultR2: 2,
        },
      ],
      cards: [
        {
          title: "🏠 Pendawaian di rumah",
          body: "Pendawaian elektrik di rumah menggunakan litar selari supaya setiap alat menerima voltan yang sama daripada bekalan, dan setiap alat boleh dihidupkan atau dimatikan tanpa menjejaskan yang lain.",
        },
      ],
      checks: [
        {
          question: "Mengapakah peralatan elektrik di rumah disambungkan secara selari?",
          hint: "Supaya setiap alat menerima voltan yang sama daripada bekalan, dan supaya setiap alat boleh dihidupkan atau dimatikan secara berasingan tanpa menjejaskan alat lain.",
        },
        {
          question:
            "Sebuah sistem penggera kebakaran perlu boleh dicetuskan oleh pengesan haba di beberapa lokasi berlainan dalam satu bangunan. Litar manakah yang sesuai?",
          hint: "Litar selari — supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi yang berlainan dalam bangunan itu, dan satu pengesan yang rosak tidak melumpuhkan keseluruhan sistem.",
        },
      ],
    },

    // ---------------------------------------------------------------- 7.3
    {
      number: "7.3",
      title: "Sifat Magnet dan Medan Magnet",
      intro:
        "Magnet boleh wujud secara semula jadi sebagai batu magnet, tetapi kebanyakan magnet yang digunakan hari ini diperbuat daripada bahan seperti besi, keluli, kobalt dan nikel. Kawasan di sekitar magnet yang wujud kesan daya oleh magnet dikenali sebagai medan magnet.",
      flipCards: [
        { id: "attracts", icon: "🧲", label: "Menarik bahan magnet", fact: "Besi, keluli, kobalt dan nikel tertarik kepadanya." },
        { id: "poles", icon: "🔴🔵", label: "Berkutub", fact: "Setiap magnet mempunyai kutub utara dan kutub selatan." },
        { id: "like-repel", icon: "↔️", label: "Kutub sama menolak", fact: "Kutub sama jenis menolak; kutub berlainan jenis menarik." },
        { id: "compass", icon: "🧭", label: "Menunjuk utara-selatan", fact: "Magnet yang digantung secara bebas menunjukkan arah utara-selatan." },
      ],
      magnetFieldDiagram: {
        title: "🧲 Corak medan magnet",
        instruction: "Pilih jenis magnet, kemudian tekan ciri untuk mengetahui apa yang ditunjukkan oleh corak itu.",
        shapeLabel: "Jenis magnet",
        featureLabel: "Ciri garisan medan magnet",
        hint: "Mulakan dengan memilih satu jenis magnet di atas.",
        shapes: [
          {
            id: "bar",
            name: "Magnet bar",
            note: "Garisan medan magnet melengkung keluar dari kutub utara dan masuk semula ke kutub selatan, membentuk gelung tertutup di luar magnet.",
          },
          {
            id: "horseshoe",
            name: "Magnet ladam kuda",
            note: "Kedua-dua kutub berada berhampiran antara satu sama lain, jadi medan magnet merentasi ruang di antaranya menjadi lebih kuat dan lebih seragam.",
          },
          {
            id: "magnadur",
            name: "Magnet magnadur",
            note: "Kutubnya berada pada permukaan yang lebar dan rata. Sepasang magnet magnadur yang bertentangan menghasilkan medan yang hampir seragam di antara keduanya.",
          },
          {
            id: "like-poles",
            name: "Dua kutub sama",
            note: "Apabila dua kutub yang sama jenis berhadapan, medan magnet keduanya saling menentang dan menghasilkan titik neutral di antaranya.",
          },
        ],
        features: [
          {
            id: "direction",
            label: "Arah",
            note: "Di luar magnet, garisan medan magnet mengarah dari kutub utara ke kutub selatan.",
          },
          {
            id: "density",
            label: "Kerapatan",
            note: "Garisan medan magnet lebih rapat antara satu sama lain di kawasan yang mempunyai medan magnet yang lebih kuat — iaitu berhampiran kutub.",
          },
          {
            id: "no-cross",
            label: "Tidak bersilang",
            note: "Garisan medan magnet tidak akan bertemu atau bersilang antara satu sama lain.",
          },
          {
            id: "neutral",
            label: "Titik neutral (X)",
            note: "Medan magnet di antara dua kutub yang sama jenis menghasilkan satu titik yang tidak mempunyai sebarang medan magnet. Titik ini disebut titik neutral, ditandakan X.",
          },
        ],
      },
      checks: [
        {
          question: "Pada bahagian manakah sesuatu magnet bar garisan medan magnetnya paling rapat, dan apakah maknanya?",
          hint: "Berhampiran kedua-dua kutub. Garisan yang lebih rapat bermakna medan magnet di kawasan itu lebih kuat.",
        },
        {
          question: "Apakah yang terhasil di antara dua kutub utara yang berhadapan antara satu sama lain?",
          hint: "Satu titik neutral (X) — titik yang tidak mempunyai sebarang medan magnet, kerana medan daripada kedua-dua kutub saling menentang di situ.",
        },
      ],
    },
    {
      number: "7.3",
      title: "Elektromagnet dan Corak Medan Magnet",
      intro:
        "Elektromagnet ialah magnet sementara — ia hanya menghasilkan medan magnet semasa arus mengalir. Arah medan magnet yang terhasil ditentukan oleh arah arus elektrik, dan corak medannya bergantung pada bentuk konduktor yang digunakan.",
      currentFieldPatterns: {
        title: "🌀 Medan magnet daripada arus elektrik",
        instruction: "Pilih bentuk konduktor, kemudian songsangkan arus untuk melihat apa yang berubah.",
        patternLabel: "Corak:",
        directionLabel: "Arah:",
        keyPoint:
          "Songsangkan arah arus. Menyongsangkan arus menukar ARAH medan magnet, tetapi corak medan magnet yang terhasil kekal sama.",
        gripRule: {
          title: "Petua genggaman tangan kanan",
          steps: [
            "Tuding ibu jari tangan KANAN mengikut arah arus konvensional.",
            "Jari-jari yang melengkung menunjukkan arah medan magnet.",
          ],
        },
        hint: "Tekan mana-mana bentuk konduktor di atas.",
        conductors: [
          {
            id: "straight",
            name: "Dawai lurus",
            pattern: "bulatan sepusat mengelilingi dawai, semakin renggang semakin jauh dari dawai",
            direction: "ditentukan dengan petua genggaman tangan kanan.",
            note: "Dawai lurus menghasilkan garisan medan magnet yang berbentuk bulatan sepusat.",
          },
          {
            id: "loop",
            name: "Dawai gelung",
            pattern: "bulatan sepusat mengelilingi setiap bahagian dawai, bergabung di tengah gelung",
            direction: "ditentukan dengan petua genggaman tangan kanan pada mana-mana bahagian dawai.",
            note: "Medan magnet daripada kedua-dua belah gelung bergabung di tengah, menjadikan medan di situ lebih kuat.",
          },
          {
            id: "solenoid",
            name: "Solenoid",
            pattern: "menyerupai corak medan magnet magnet bar, dengan kutub di setiap hujung",
            direction:
              "arus yang mengalir mengikut lawan arah jam pada satu hujung menjadikan hujung itu kutub utara; arus mengikut arah jam menjadikannya kutub selatan.",
            note: "Solenoid ialah gegelung panjang. Medan magnetnya di luar menyerupai medan sebatang magnet bar.",
          },
        ],
      },
      cards: [
        {
          title: "Kekuatan medan dan jarak",
          body: "Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor. Ini berbeza daripada faktor yang mengubah kekuatan elektromagnet itu sendiri — jarak mengubah kekuatan yang anda ukur, bukan kekuatan yang dihasilkan.",
        },
      ],
      checks: [
        {
          question: "Arah arus dalam sebatang dawai lurus disongsangkan. Apakah yang berubah pada medan magnetnya?",
          hint: "Arah medan magnet berubah menjadi bertentangan, tetapi corak medan itu kekal sama — masih bulatan sepusat mengelilingi dawai.",
        },
        {
          question: "Menggunakan petua genggaman tangan kanan, apakah yang ditunjukkan oleh ibu jari dan apakah yang ditunjukkan oleh jari yang melengkung?",
          hint: "Ibu jari menunjukkan arah arus konvensional; jari-jari yang melengkung menunjukkan arah medan magnet.",
        },
      ],
    },
    {
      number: "7.3",
      title: "Kekuatan Elektromagnet dan Kegunaannya",
      intro:
        "Dua faktor mengubah kekuatan sesuatu elektromagnet. Daripada menerima jawapannya begitu sahaja, siasat kedua-duanya seperti yang dilakukan di dalam makmal — dengan hipotesis, pemboleh ubah dan pemerhatian.",
      miniExperiment: {
        title: "🔬 Penyiasatan: faktor yang mempengaruhi kekuatan medan magnet",
        aim: "Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet sesuatu elektromagnet.",
        instruction: "Pilih satu faktor untuk melihat penyiasatan penuhnya.",
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
        parts: [
          {
            id: "current",
            icon: "⚡",
            label: "Arus",
            question: "Adakah arus yang mengalir mempengaruhi kekuatan medan magnet?",
            hypothesis:
              "Semakin besar arus yang mengalir dalam konduktor, semakin tinggi kekuatan medan magnet.",
            manipulated: "Arus",
            responding: "Bilangan jarum peniti yang ditarik",
            controlled: "Bilangan lilitan gegelung (10 lilitan)",
            materials: "Jarum peniti, rod besi dan dawai kuprum",
            apparatus:
              "Bekalan kuasa a.t., suis, ammeter, reostat, piring Petri, dawai penyambung, kaki retort dan pengapit",
            method: [
              "Susunkan radas dengan 10 lilitan dawai kuprum mengelilingi rod besi.",
              "Hidupkan suis dan laraskan reostat untuk memperoleh arus 0.5 A.",
              "Gantikan piring Petri yang mengandungi jarum peniti dengan sebuah piring Petri yang kosong.",
              "Matikan suis supaya semua jarum peniti yang ditarik oleh rod besi jatuh ke dalam piring Petri kosong itu.",
              "Kira bilangan jarum peniti yang telah ditarik, kemudian ulang menggunakan arus 1.0 A, 1.5 A, 2.0 A dan 2.5 A.",
            ],
            observation:
              "Semakin besar arus yang digunakan, semakin banyak jarum peniti yang ditarik oleh rod besi itu.",
            conclusion:
              "Arus yang lebih besar menghasilkan kekuatan medan magnet yang lebih tinggi. Hipotesis diterima.",
          },
          {
            id: "turns",
            icon: "🌀",
            label: "Bilangan lilitan gegelung",
            question: "Adakah bilangan lilitan gegelung mempengaruhi kekuatan medan magnet?",
            hypothesis:
              "Semakin banyak bilangan lilitan gegelung, semakin tinggi kekuatan medan magnet.",
            manipulated: "Bilangan lilitan gegelung",
            responding: "Bilangan jarum peniti yang ditarik",
            controlled: "Arus (0.5 A)",
            materials: "Jarum peniti, rod besi dan dawai kuprum",
            apparatus:
              "Bekalan kuasa a.t., suis, ammeter, reostat, piring Petri, dawai penyambung, kaki retort dan pengapit",
            method: [
              "Susunkan radas dengan 10 lilitan dawai kuprum mengelilingi rod besi.",
              "Hidupkan suis dan laraskan reostat untuk memperoleh arus 0.5 A.",
              "Gantikan piring Petri yang mengandungi jarum peniti dengan sebuah piring Petri yang kosong.",
              "Matikan suis supaya semua jarum peniti yang ditarik jatuh ke dalam piring Petri kosong itu, kemudian kira bilangannya.",
              "Ulang langkah di atas menggunakan 20, 30, 40 dan 50 lilitan dawai kuprum, sambil mengekalkan arus pada 0.5 A.",
            ],
            observation:
              "Semakin banyak lilitan gegelung yang digunakan, semakin banyak jarum peniti yang ditarik oleh rod besi itu.",
            conclusion:
              "Bilangan lilitan gegelung yang lebih banyak menghasilkan kekuatan medan magnet yang lebih tinggi. Hipotesis diterima.",
          },
        ],
      },
      apparatusDiagram: {
        title: "🧪 Susunan radas penyiasatan",
        instruction: "Tekan mana-mana bahagian radas untuk mengetahui fungsinya.",
        caption: "Kekuatan elektromagnet diukur melalui bilangan jarum peniti yang ditarik",
        hint: "Perhatikan bahawa ammeter dan reostat berada pada gelung yang sama dengan gegelung.",
        parts: [
          { id: "supply", label: "Bekalan kuasa a.t.", note: "Membekalkan arus terus yang mengalir melalui gegelung." },
          { id: "switch", label: "Suis", note: "Menghidupkan dan mematikan litar. Mematikan suis melepaskan jarum peniti supaya ia boleh dikira." },
          { id: "ammeter", label: "Ammeter", note: "Mengukur arus yang mengalir melalui gegelung. Ia disambung secara bersiri dalam litar ini." },
          { id: "rheostat", label: "Reostat", note: "Perintang berubah yang digunakan untuk melaraskan arus kepada nilai yang dikehendaki, contohnya 0.5 A." },
          { id: "coil", label: "Gegelung dawai kuprum", note: "Dawai kuprum yang dililit mengelilingi rod besi. Bilangan lilitannya ialah faktor kedua yang dikaji." },
          { id: "rod", label: "Rod besi", note: "Teras yang menjadi bermagnet apabila arus mengalir melalui gegelung di sekelilingnya." },
          { id: "pins", label: "Jarum peniti", note: "Bilangan jarum peniti yang ditarik menjadi ukuran bagi kekuatan medan magnet." },
          { id: "stand", label: "Kaki retort dan pengapit", note: "Memegang rod besi pada kedudukan tetap di atas piring Petri." },
        ],
      },
      cards: [
        {
          title: "🧭 Kegunaan magnet",
          body: "Jarum kompas menggunakan magnet yang digantung bebas untuk menunjukkan arah kutub. Kad kredit dan kad debit menyimpan maklumat pada jalur bermagnet.",
        },
        {
          title: "🔔 Kegunaan elektromagnet",
          body: "Loceng elektrik menggunakan elektromagnet untuk menggerakkan pemukulnya berulang kali. Kunci bermagnet pada pintu menggunakan elektromagnet untuk mengunci pintu secara automatik — dan kerana ia elektromagnet, kuncinya terlepas apabila arus dimatikan.",
        },
      ],
      checks: [
        {
          question:
            "Dalam penyiasatan kesan arus terhadap kekuatan medan magnet, apakah pemboleh ubah yang dimanipulasikan dan yang bergerak balas?",
          hint: "Dimanipulasikan: arus. Bergerak balas: bilangan jarum peniti yang ditarik. Bilangan lilitan gegelung dimalarkan pada 10 lilitan.",
        },
        {
          question:
            "Elektromagnet yang digunakan untuk mengangkat besi buangan mempunyai gegelung dengan banyak lilitan. Mengapa?",
          hint: "Bilangan lilitan gegelung yang lebih banyak menghasilkan medan magnet yang lebih kuat, membolehkannya mengangkat beban yang lebih berat.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membezakan bentuk tenaga daripada sumber tenaga, dan menamakan contoh bagi kedua-duanya.",
    "Saya boleh menerangkan bagaimana cas elektrostatik terhasil melalui perpindahan elektron.",
    "Saya boleh menerangkan kilat, konduktor kilat, keselamatan mengisi petrol dan konsep sangkar Faraday.",
    "Saya boleh membezakan arah arus konvensional daripada arah pergerakan elektron.",
    "Saya boleh menyatakan simbol, unit dan alat pengukur bagi arus, voltan dan rintangan.",
    "Saya boleh menyambungkan ammeter secara bersiri dan voltmeter secara selari.",
    "Saya boleh menggunakan Hukum Ohm, V = IR, untuk menyelesaikan masalah.",
    "Saya boleh membandingkan arus, voltan dan rintangan dalam litar bersiri dan litar selari.",
    "Saya boleh menerangkan ciri garisan medan magnet, termasuk titik neutral.",
    "Saya boleh menggunakan petua genggaman tangan kanan untuk menentukan arah medan magnet.",
    "Saya boleh menjalankan penyiasatan tentang faktor yang mempengaruhi kekuatan elektromagnet.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Dalam litar selari, voltan merentasi setiap cabang adalah sama.",
      answer: true,
      explanation: "Betul — setiap cabang dalam litar selari mendapat voltan yang sama dengan sumber.",
    },
    {
      type: "multiple-choice",
      question: "Bagaimanakah ammeter dan voltmeter disambungkan dalam sesuatu litar?",
      options: [
        "Kedua-duanya secara bersiri",
        "Ammeter secara bersiri, voltmeter secara selari",
        "Ammeter secara selari, voltmeter secara bersiri",
        "Kedua-duanya secara selari",
      ],
      answerIndex: 1,
      explanation:
        "Ammeter disambung secara bersiri supaya arus yang sama melaluinya, manakala voltmeter disambung secara selari merentasi komponen yang hendak diukur voltannya.",
    },
    {
      type: "multiple-choice",
      question: "Apakah yang menentukan arah medan magnet di sekeliling wayar lurus berarus?",
      options: ["Bahan wayar itu", "Arah aliran arus (petua genggaman tangan kanan)", "Panjang wayar", "Bilangan sel kering"],
      answerIndex: 1,
      explanation:
        "Petua genggaman tangan kanan: tuding ibu jari mengikut arah arus, dan jari-jari yang melengkung menunjukkan arah medan magnet.",
    },
    {
      type: "true-false",
      question:
        "Betul atau salah: Menyongsangkan arah arus dalam dawai lurus akan menukar corak medan magnetnya.",
      answer: false,
      explanation:
        "Salah. Menyongsangkan arus menukar ARAH medan magnet, tetapi coraknya kekal sama — masih bulatan sepusat mengelilingi dawai.",
    },
  ],
};
