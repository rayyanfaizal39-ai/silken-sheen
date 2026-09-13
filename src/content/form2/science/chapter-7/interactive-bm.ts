import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH7_IMAGES, SCIENCE_F2_VISUAL_ASPECT } from "../visual-assets";
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
        "Tenaga bermaksud **kemampuan untuk melakukan kerja**, dan unit S.I.-nya ialah **joule (J)**. Tenaga **tidak boleh dicipta atau dimusnahkan** — ia hanya bertukar daripada satu bentuk kepada bentuk yang lain. Dua idea di sini mudah dikelirukan: bentuk tenaga dan sumber tenaga bukan perkara yang sama.",
      cards: [
        {
          title: "Bentuk berbanding sumber",
          body: "Sumber tenaga ialah dari mana tenaga itu datang. Bentuk tenaga pula memerihalkan jenis tenaga itu wujud.",
          detail: "Contoh: matahari ialah sumber; cahaya dan haba ialah bentuk.",
        },
        {
          title: "☀️ Sumber tenaga",
          body: "Tenaga datang daripada lapan sumber.",
          facts: [
            {
              label: "Lapan sumber tenaga",
              value: [
                "Matahari",
                "Angin",
                "Bahan radioaktif",
                "Bahan api fosil",
                "Geoterma",
                "Biojisim",
                "Ombak",
                "Air",
              ],
            },
          ],
          detail: "Matahari, angin, bahan radioaktif, bahan api fosil, geoterma, biojisim, ombak dan air — lapan sumber ini membekalkan tenaga yang kemudian bertukar kepada pelbagai bentuk.",
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
      conceptQuestion: "Apakah Cas Elektrostatik?",
      intro:
        "Cas elektrik statik yang terkumpul pada sesuatu objek dikenali sebagai cas elektrostatik. Semua jirim mengandungi cas positif (proton) dan cas negatif (elektron). Apabila dua bahan berbeza digosokkan, hanya elektron berpindah — proton tidak bergerak. Objek yang memperoleh elektron menjadi bercas negatif; objek yang kehilangan elektron menjadi bercas positif; objek dengan bilangan proton dan elektron yang sama adalah neutral.",
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.chargeTransfer,
          alt: "Dua panel. Sebelum digosok, belon dan kain masing-masing membawa bilangan cas positif dan cas negatif yang sama. Selepas digosok, anak panah menunjukkan elektron berpindah daripada kain ke belon, menjadikan belon bercas negatif dan kain bercas positif.",
          caption:
            "Hanya elektron yang berpindah, dan ia berpindah daripada kain ke belon. Proton kekal di tempatnya.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      cards: [
        {
          title: "Tarikan dan tolakan",
          body: "**Cas yang sama jenis saling menolak.** **Cas yang berlainan jenis saling menarik.** Inilah sebabnya sikat yang telah digosok boleh menarik cebisan kertas kecil.",
        },
        {
          title: "Mengesan cas elektrostatik",
          body: "Elektroskop ialah **alat yang digunakan untuk mengesan kewujudan cas elektrik** pada suatu objek. Kerajang emasnya mencapah kerana cas yang sama saling menolak.",
          detail: "Semakin jauh pencapahan kerajang emas, semakin banyak kuantiti cas yang terkumpul.",
        },
      ],
      polarityInteraction: {
        title: "⚡ Tarikan dan tolakan",
        instruction: "Tekan sepasang cas untuk melihat ke arah mana daya itu bertindak.",
        attractLabel: "Tarik",
        repelLabel: "Tolak",
        pairs: [
          {
            id: "attract",
            label: "+ dan −",
            leftCharge: "+",
            rightCharge: "-",
            outcome: "attract",
            note: "Cas yang berlainan jenis saling menarik.",
          },
          {
            id: "repel-pos",
            label: "+ dan +",
            leftCharge: "+",
            rightCharge: "+",
            outcome: "repel",
            note: "Cas yang sama jenis saling menolak.",
          },
          {
            id: "repel-neg",
            label: "− dan −",
            leftCharge: "-",
            rightCharge: "-",
            outcome: "repel",
            note: "Cas yang sama jenis saling menolak. Inilah sebabnya sikat yang telah digosok boleh menarik cebisan kertas kecil — cas sikat itu menolak elektron dalam kertas, meninggalkan bahagian kertas yang hampir dengan sikat bercas bertentangan sehingga tertarik.",
          },
        ],
      },
      electroscope: {
        title: "🔬 Elektroskop",
        instruction:
          "Tekan setiap peringkat untuk mengikuti apa yang berlaku di dalam elektroskop. Panel yang anda pilih kekal terang manakala dua yang lain menjadi malap.",
        prompt: "Pilih satu peringkat untuk melihat apa yang berlaku pada kerajang emas.",
        image: {
          src: SCIENCE_F2_CH7_IMAGES.electroscope,
          alt: "Tiga elektroskop bersebelahan di bawah balang kaca. Pada yang pertama, kerajang emas tergantung rapat pada batang konduktor. Pada yang kedua, rod kaca bercas positif menyentuh tudung logam dan elektron ditunjukkan bergerak dari tudung ke rod itu, meninggalkan cas positif menuruni batang dan pada kerajang. Pada yang ketiga, elektroskop membawa cas positif dan kerajang emasnya telah mencapah jauh daripada batang.",
          caption:
            "Satu elektroskop, tiga peringkat: neutral, cas sedang dikenakan, dan kerajang emas yang mencapah.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          legendLabel: "Peringkat elektroskop yang bercas",
        },
        stages: [
          {
            id: "uncharged",
            label: "Neutral",
            spotlightCaption: "Neutral",
            note: "Elektroskop itu neutral dan kerajang emas kekal rapat pada batang konduktor.",
          },
          {
            id: "charged",
            label: "Cas dikenakan",
            spotlightCaption: "Elektron keluar",
            note: "Rod yang bercas positif menyentuh tudung logam. Elektron bergerak dari elektroskop menuju rod yang bercas positif itu.",
          },
          {
            id: "diverged",
            label: "Kerajang emas mencapah",
            spotlightCaption: "Cas menolak",
            note: "Elektroskop kekal bercas positif. Cas sama jenis pada batang konduktor dan kerajang emas saling menolak, lalu menyebabkan kerajang itu mencapah. Capahan yang lebih besar boleh menunjukkan kuantiti cas elektrostatik terkumpul yang lebih banyak.",
          },
        ],
      },
      checks: [
        {
          question: "Sebatang rod digosok dengan kain, lalu menjadi bercas negatif. Apakah yang telah berlaku kepada elektronnya?",
          hint: "Rod itu telah memperoleh elektron daripada kain. Hanya elektron berpindah semasa penggosokan — proton kekal di tempatnya.",
        },
        {
          question: "Mengapakah kerajang emas elektroskop yang bercas mencapah?",
          hint: "Kerajang dan plat yang digantungnya akhirnya membawa cas yang sama, dan cas yang sama jenis saling menolak.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Elektrostatik dalam Kehidupan Harian",
      intro:
        "Cas elektrostatik bukan sekadar kesan makmal. Ia menerangkan kilat, renjatan kecil yang anda rasa pada tombol pintu, dan beberapa langkah keselamatan penting.",
      lightningFormation: {
        title: "🌩️ Bagaimana kilat terbentuk",
        instruction:
          "Ikuti empat peringkat ini. Setiap satu menerangi bahagian pemandangan yang diterangkannya.",
        prompt: "Pilih satu peringkat untuk melihat di mana ia berlaku dalam pemandangan ini.",
        image: {
          src: SCIENCE_F2_CH7_IMAGES.lightningFormation,
          alt: "Pemandangan waktu malam. Udara mengalir melepasi awan ribut dari kedua-dua belah. Cas positif berkumpul di bahagian atas awan dan cas negatif di bahagian bawahnya. Cas positif berada pada permukaan Bumi tepat di bawah awan itu, dan pancaran kilat bercabang menuruni dari dasar awan ke Bumi.",
          caption:
            "Geseran dengan udara di sekeliling, pemisahan cas di dalam awan, cas teraruh pada Bumi, dan nyahcas itu sendiri.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.standard,
          legendLabel: "Peringkat pembentukan kilat",
        },
        stages: [
          {
            id: "friction",
            icon: "💨",
            label: "Geseran",
            spotlightCaption: "Awan dan udara sekeliling",
            note: "Geseran antara awan dan udara di sekelilingnya menyebabkan cas elektrik terkumpul pada awan itu.",
          },
          {
            id: "separation",
            icon: "➕➖",
            label: "Pemisahan cas",
            spotlightCaption: "Positif di atas, negatif di bawah",
            note: "Bahagian atas awan menjadi bercas positif manakala bahagian bawahnya menjadi bercas negatif.",
          },
          {
            id: "induced",
            icon: "🌍",
            label: "Cas teraruh di Bumi",
            spotlightCaption: "Cas positif pada Bumi",
            note: "Cas negatif di bahagian bawah awan mengaruhkan cas positif pada permukaan Bumi di bawahnya.",
          },
          {
            id: "discharge",
            icon: "⚡",
            label: "Nyahcas",
            spotlightCaption: "Nyahcas mengejut",
            note: "Nyahcas elektrostatik yang mengejut antara awan dan Bumi kemudian berlaku sebagai kilat.",
          },
        ],
        summaryLabel: "Empat peringkat itu secara keseluruhan",
        summary: [
          "Geseran antara awan dan udara di sekelilingnya menyebabkan cas elektrik terkumpul.",
          "Bahagian atas awan menjadi bercas positif manakala bahagian bawahnya menjadi bercas negatif.",
          "Cas negatif di bahagian bawah awan mengaruhkan cas positif pada permukaan Bumi.",
          "Nyahcas elektrostatik yang mengejut kemudian boleh berlaku sebagai kilat.",
        ],
      },
      accordions: [
        {
          title: "⚡ Kejadian kilat",
          body: "**Geseran antara awan dan udara** menyebabkan awan dicas dengan cas elektrik. Kilat berlaku kerana **daya tarikan antara cas positif pada Bumi dan cas negatif pada awan**.",
        },
        {
          title: "🏢 Konduktor kilat",
          body: "Konduktor kilat dipasang pada bangunan untuk **menyediakan satu lintasan bagi cas elektrik daripada kilat masuk ke dalam Bumi**. Cara ini melindungi bangunan daripada disambar kilat.",
        },
        {
          title: "📺 Skrin televisyen berhabuk",
          body: "Masalah: Skrin televisyen boleh cepat berhabuk kerana tarikan elektrostatik menyebabkan zarah habuk tertarik pada skrin.",
          detail: "Penyelesaian: Gunakan kain mikrofiber / bahan antielektrostatik untuk mengurangkan pengumpulan habuk.",
        },
        {
          title: "👕 Cuaca kering, fabrik dan elektrik statik",
          body: "Semasa cuaca kering, cas elektrostatik lebih mudah terkumpul pada objek. Wap air yang banyak di udara semasa cuaca lembap pula menghalang pengumpulan cas. Itulah sebabnya renjatan kecil lebih kerap berlaku dalam keadaan kering.",
          detail: "Sesetengah fabrik sintetik lebih mudah terkumpul cas elektrostatik akibat penggeseran. Jika lantai berkarpet nilon menyebabkan renjatan kecil apabila menyentuh objek logam, memakai kasut bertapak getah dicadangkan untuk mengurangkan kesan tersebut.",
        },
        {
          title: "🚗 Tempat perlindungan selamat semasa ribut petir — konsep sangkar Faraday",
          body: "Sebuah kotak logam boleh melindungi apa yang berada di dalamnya kerana cas mengalir pada permukaan luar logam itu dan tidak masuk ke dalam. Inilah sebabnya kekal berada di dalam kenderaan berbadan logam ialah tempat perlindungan yang lebih selamat semasa ribut petir.",
          detail: "Perlindungan itu datang daripada badan logam yang mengalirkan cas di sekelilingnya — bukan daripada tayar getah.",
        },
        {
          title: "⛽ Tambahan: keselamatan semasa mengisi petrol",
          body: "Wap petrol mudah terbakar. Percikan daripada cas elektrostatik yang terkumpul boleh menyalakan wap itu, maka cas perlu dikurangkan atau dialirkan dengan selamat semasa mengisi minyak.",
          detail: "Itulah sebabnya nozel dan tangki disambungkan supaya cas mengalir ke bumi, dan pengguna dinasihatkan supaya tidak berulang-alik masuk dan keluar kenderaan.",
        },
      ],
      dryHumidComparison: {
        title: "💧 Cuaca kering berbanding cuaca lembap",
        dryLabel: "Kering",
        humidLabel: "Lembap",
        dryCaption: "Sedikit wap air di udara — cas terkumpul.",
        humidCaption: "Wap air di udara — cas terlerai.",
        note: "Keadaan kering membolehkan cas elektrostatik terkumpul dengan lebih mudah. Dalam udara lembap, wap air membantu cas terlerai dengan lebih mudah.",
      },
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
      conceptQuestion: "Apakah Arus Elektrik?",
      intro:
        "Apabila cas mengalir melalui suatu konduktor, aliran itu menghasilkan arus elektrik. Arus ialah kadar aliran cas elektrik melalui konduktor. Terdapat dua cara arah aliran ini diperihalkan, dan kedua-duanya bertentangan antara satu sama lain.",
      cards: [
        {
          title: "➕ ➡️ ➖ Arus konvensional",
          body: "Arah aliran arus konvensional ialah **dari terminal positif ke terminal negatif**.",
          detail: "Inilah arah yang digunakan dalam semua litar dan petua yang anda pelajari.",
        },
        {
          title: "➖ ➡️ ➕ Pergerakan elektron",
          body: "Elektron sebenarnya bergerak **dari terminal negatif ke terminal positif**.",
          detail: "Kedua-dua arah ini bertentangan — pastikan anda tahu yang mana satu ditanya.",
        },
        {
          title: "Membuktikan cas mengalir",
          body: "Cas daripada penjana Van de Graaff yang disambungkan kepada galvanometer yang dibumikan akan menyebabkan **jarum galvanometer memesong** — menunjukkan bahawa **cas yang mengalir menghasilkan arus elektrik**.",
          detail: "Galvanometer digunakan untuk mengesan arus elektrik yang kecil.",
        },
      ],
      currentDirection: {
        title: "🔀 Aliran elektron lawan arus konvensional",
        instruction: "Tekan mana-mana arah untuk membandingkannya.",
        keyPoint: "Kedua-dua arah ini bertentangan.",
        negativeTerminalLabel: "Terminal negatif",
        positiveTerminalLabel: "Terminal positif",
        contrastLabel: "Arah bertentangan",
        modes: [
          {
            id: "electron",
            label: "Aliran Elektron",
            note: "Elektron sebenarnya bergerak dari terminal negatif ke terminal positif.",
            directionSummary: "Negatif → Positif",
          },
          {
            id: "conventional",
            label: "Arus Konvensional",
            note: "Arus konvensional ditakrifkan sebagai mengalir dari terminal positif ke terminal negatif — arah yang digunakan dalam semua litar dan petua yang anda pelajari.",
            directionSummary: "Positif → Negatif",
          },
        ],
      },
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
      conceptQuestion: "Apakah Arus, Voltan dan Rintangan?",
      intro:
        "Tiga kuantiti elektrik yang perlu anda kenali, setiap satu dengan simbol, unit dan alat pengukurnya sendiri. Yang paling kerap diuji bukan sahaja apa yang diukur oleh setiap alat, tetapi bagaimana alat itu disambungkan ke dalam litar. Setiap litar lengkap dilukis menggunakan simbol piawai, bukan gambar komponen sebenar — kuasai simbol itu dahulu, dan rajah di bawah menjadi mudah dibaca.",
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.meterPlacement,
          alt: "Dua litar yang dibina daripada sel dan mentol menyala yang sama. Dalam litar kiri, ammeter bertanda A berada dalam gelung utama, jadi wayar yang sama melaluinya dan melalui mentol. Dalam litar kanan, voltmeter bertanda V berada pada cabangnya sendiri, disambung merentasi dua hujung mentol.",
          caption:
            "Ammeter berada dalam gelung utama; voltmeter berada pada cabangnya sendiri merentasi mentol.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      cards: [
        {
          title: "Arus, I",
          body: "**Kadar aliran cas elektrik melalui konduktor.**",
          detail: "Unit: ampere (A) · Alat: ammeter · Sambungan: bersiri",
        },
        {
          title: "Voltan, V",
          body: "**Beza keupayaan antara dua titik dalam litar.**",
          detail: "Unit: volt (V) · Alat: voltmeter · Sambungan: selari",
        },
        {
          title: "Rintangan, R",
          body: "**Rintangan ialah keupayaan suatu konduktor untuk mengehadkan atau merintangi aliran arus elektrik.**",
          detail: "Unit: ohm (Ω) · Perintang tetap mempunyai rintangan yang tidak boleh diselaraskan. Reostat (perintang berubah) membolehkan rintangan diselaraskan.",
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
        {
          question: "Komponen manakah yang mempunyai rintangan yang boleh dilaraskan?",
          hint: "Perintang berubah (reostat). Rintangan perintang tetap tidak boleh diubah.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Hukum Ohm",
      conceptQuestion: "Apakah Hukum Ohm?",
      intro:
        "Hukum Ohm menyatakan bahawa arus elektrik yang mengalir melalui suatu konduktor adalah berkadar terus dengan voltan yang merentasi dua hujung konduktor itu, dengan syarat suhu dan keadaan fizik lain adalah tetap. Hubungan ini ditulis sebagai V = IR.",
      remember:
        "**Hukum Ohm**: Arus elektrik yang mengalir melalui suatu konduktor berkadar terus dengan voltan merentasinya, dengan syarat suhu dan keadaan fizik lain tetap. Ditulis sebagai V = IR.",
      cards: [
        {
          title: "V = IR",
          body: "Voltan (V) = Arus (I) × Rintangan (R). Susun semula untuk mencari mana-mana satu: I = V ÷ R, dan R = V ÷ I.",
          detail: "V dalam volt · I dalam ampere · R dalam ohm",
        },
        {
          title: "Apa yang berlaku apabila rintangan bertambah",
          body: "Pada voltan yang tetap, **arus yang mengalir berkurang apabila rintangan bertambah**. Menambah panjang dawai meningkatkan rintangannya, lalu mengurangkan arus.",
        },
      ],
      ohmsTriangle: {
        title: "🔺 Segi tiga Hukum Ohm",
        instruction: "Tekan V, I atau R untuk menutupnya dan melihat formulanya.",
        vFormula: "V = I × R",
        iFormula: "I = V ÷ R",
        rFormula: "R = V ÷ I",
      },
      guidedCalculations: [
        {
          title: "✏️ Contoh berpandu",
          givenLabel: "Diberi",
          findLabel: "Cari",
          formulaLabel: "Formula",
          substituteLabel: "Gantikan",
          answerLabel: "Jawapan",
          given: ["V = 6 V", "R = 3 Ω"],
          find: "I = ? A",
          formula: "I = V ÷ R",
          substitute: "I = 6 V ÷ 3 Ω",
          answer: "I = 2 A",
        },
      ],
      unitsMemory: {
        title: "📌 Ingat unit",
        items: [
          { quantitySymbol: "I", unitName: "ampere", unitSymbol: "A" },
          { quantitySymbol: "V", unitName: "volt", unitSymbol: "V" },
          { quantitySymbol: "R", unitName: "ohm", unitSymbol: "Ω" },
        ],
      },
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
      conceptQuestion: "Apakah Litar Bersiri dan Litar Selari?",
      intro:
        "Litar bersiri menyambungkan komponen secara berturutan dalam **satu laluan tunggal**. Litar selari pula terbahagi kepada **beberapa cabang berasingan**. Perbezaan itu mengubah cara arus, voltan dan rintangan berkelakuan.",
      circuitSymbols: {
        title: "🔧 Komponen litar elektrik dan simbolnya",
        instruction: "Tekan sesuatu komponen untuk melihat simbol dan fungsinya diserlahkan.",
        symbols: [
          { id: "switch", name: "Suis", purpose: "Membuka atau menutup litar, menghentikan atau membenarkan arus mengalir." },
          { id: "cell", name: "Sel kering", purpose: "Satu sumber tenaga elektrik tunggal yang mendorong arus mengelilingi litar." },
          { id: "voltmeter", name: "Voltmeter", purpose: "Mengukur voltan, dalam unit volt. Sentiasa disambung secara selari." },
          { id: "galvanometer", name: "Galvanometer", purpose: "Mengesan dan mengukur arus elektrik yang sangat kecil melalui pesongan jarumnya." },
          { id: "ammeter", name: "Ammeter", purpose: "Mengukur arus, dalam unit ampere. Sentiasa disambung secara bersiri." },
          { id: "bulb", name: "Mentol", purpose: "Menyala apabila arus mengalir melaluinya — sering digunakan untuk menunjukkan litar itu lengkap." },
          { id: "resistor", name: "Perintang", purpose: "Komponen tetap yang merintangi aliran arus mengikut nilai yang ditetapkan." },
          { id: "fuse", name: "Fius", purpose: "Komponen keselamatan yang lebur dan memutuskan litar jika arus menjadi terlalu besar." },
          { id: "rheostat", name: "Perintang boleh laras", purpose: "Perintang yang rintangannya boleh dilaraskan, digunakan untuk mengubah arus dalam litar." },
        ],
      },
      circuitConceptSeries: {
        tag: "SATU LALUAN",
        title: "LITAR BERSIRI",
        circuit: {
          kind: "series",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Langkah",
        },
        explanation: "Litar bersiri mempunyai hanya satu laluan untuk arus elektrik mengalir.",
        relationships: [
          {
            label: "Arus",
            formula: "I = I₁ = I₂",
            teachingPoint: "Arus yang sama mengalir melalui setiap komponen.",
          },
          {
            label: "Voltan",
            formula: "V = V₁ + V₂",
            teachingPoint: "Voltan bekalan dikongsi merentasi komponen.",
          },
          {
            label: "Rintangan",
            formula: "R = R₁ + R₂",
            teachingPoint: "Jumlah rintangan ialah hasil tambah semua rintangan.",
          },
        ],
        advantagesLabel: "Kelebihan",
        disadvantagesLabel: "Kekurangan",
        advantages: [
          "Setiap komponen dalam litar menerima arus yang sama.",
          "Komponen dikawal oleh suis yang sama.",
          "Menambah voltan bekalan boleh meningkatkan arus.",
        ],
        disadvantages: [
          "Jika satu komponen rosak, litar terputus dan komponen lain berhenti berfungsi.",
          "Menambah lebih banyak komponen meningkatkan jumlah rintangan dan mengurangkan arus.",
          "Komponen tidak boleh dihidupkan atau dimatikan secara berasingan.",
        ],
      },
      circuitConceptParallel: {
        tag: "BEBERAPA CABANG",
        title: "LITAR SELARI",
        circuit: {
          kind: "parallel",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Langkah",
        },
        explanation: "Litar selari mempunyai lebih daripada satu laluan untuk arus elektrik mengalir.",
        relationships: [
          {
            label: "Arus",
            formula: "I = I₁ + I₂",
            teachingPoint: "Jumlah arus terbahagi antara cabang.",
          },
          {
            label: "Voltan",
            formula: "V = V₁ = V₂",
            teachingPoint: "Setiap cabang menerima voltan yang sama seperti sumber.",
          },
          {
            label: "Rintangan",
            formula: "1/R = 1/R₁ + 1/R₂",
            teachingPoint: "Rintangan berkesan berkurang apabila cabang selari ditambah.",
          },
        ],
        advantagesLabel: "Kelebihan",
        disadvantagesLabel: "Kekurangan",
        advantages: [
          "Setiap alat boleh dihidupkan atau dimatikan secara berasingan.",
          "Menambah alat tidak menjejaskan fungsi alat lain dalam litar yang sama.",
          "Setiap cabang menerima voltan bekalan sepenuhnya.",
        ],
        disadvantages: [
          "Voltan setiap alat tidak dapat dikawal secara berasingan kerana ia sentiasa sama dengan voltan sumber.",
        ],
      },
      seriesParallel: {
        title: "🔀 Litar Bersiri lawan Litar Selari",
        instruction: "Tekan Arus, Voltan atau Rintangan untuk membandingkan kedua-dua litar.",
        currentLabel: "Arus",
        voltageLabel: "Voltan",
        resistanceLabel: "Rintangan",
        advantageLabel: "Kelebihan",
        disadvantageLabel: "Kekurangan",
        hint: "Perhatikan bilangan laluan yang boleh dilalui oleh cas dalam setiap litar.",
        propertyExplanations: {
          current:
            "Dalam litar bersiri, arus yang sama mengalir melalui satu laluan. Dalam litar selari, arus terbahagi antara cabang.",
          voltage:
            "Dalam litar bersiri, voltan bekalan dikongsi. Dalam litar selari, setiap cabang mempunyai voltan yang sama seperti sumber.",
          resistance:
            "Rintangan bersiri bertambah terus. Cabang selari mengurangkan rintangan berkesan.",
        },
        circuits: {
          series: {
            kind: "series",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁" },
              { id: "r2", label: "R₂" },
            ],
            stepLabel: "Langkah",
          },
          parallel: {
            kind: "parallel",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁" },
              { id: "r2", label: "R₂" },
            ],
            stepLabel: "Langkah",
          },
        },
        kinds: [
          {
            id: "series",
            name: "Litar bersiri",
            pathSummary: "Satu laluan sahaja",
            currentRule: "I = I₁ = I₂",
            voltageRule: "V = V₁ + V₂",
            resistanceRule: "R = R₁ + R₂",
            advantages: [
              "Setiap komponen dalam litar menerima arus yang sama.",
              "Komponen dikawal oleh suis yang sama.",
              "Menambah voltan bekalan boleh meningkatkan arus.",
            ],
            disadvantages: [
              "Jika satu komponen rosak, litar terputus dan komponen lain berhenti berfungsi.",
              "Menambah lebih banyak komponen meningkatkan jumlah rintangan dan mengurangkan arus.",
              "Komponen tidak boleh dihidupkan atau dimatikan secara berasingan.",
            ],
            note: "Semua komponen berada pada gelung yang sama, jadi cas hanya mempunyai satu laluan untuk dilalui.",
          },
          {
            id: "parallel",
            name: "Litar selari",
            pathSummary: "Beberapa cabang",
            currentRule: "I = I₁ + I₂",
            voltageRule: "V = V₁ = V₂",
            resistanceRule: "1/R = 1/R₁ + 1/R₂",
            advantages: [
              "Setiap alat boleh dihidupkan atau dimatikan secara berasingan.",
              "Menambah alat tidak menjejaskan fungsi alat lain dalam litar yang sama.",
              "Setiap cabang menerima voltan bekalan sepenuhnya.",
            ],
            disadvantages: [
              "Voltan setiap alat tidak dapat dikawal secara berasingan kerana ia sentiasa sama dengan voltan sumber.",
            ],
            note: "Litar terbahagi kepada cabang di satu titik dan bercantum semula di titik yang lain, jadi cas mempunyai lebih daripada satu laluan.",
          },
        ],
      },
      circuitRecognition: {
        title: "❓ Litar Yang Mana?",
        instruction: "Lihat setiap rajah, kemudian jawab kedua-dua soalan di bawah.",
        diagramA: {
          kind: "series",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Langkah",
        },
        diagramB: {
          kind: "parallel",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Langkah",
        },
        options: [
          { id: "a", label: "Rajah A", isSeries: true },
          { id: "b", label: "Rajah B", isSeries: false },
        ],
        seriesPrompt: "Yang manakah litar bersiri?",
        parallelPrompt: "Yang manakah litar selari?",
        seriesCorrectFeedback: "Betul — hanya ada satu laluan.",
        parallelCorrectFeedback: "Betul — arus mempunyai lebih daripada satu laluan.",
        incorrectFeedback: "Belum tepat — lihat semula bilangan laluan yang boleh dilalui arus.",
        reminderNote: "Kenal pasti litar sebelum memilih formula.",
      },
      numericalProblemsIntro: {
        title: "📊 Masalah Pengiraan — Litar Bersiri & Litar Selari",
        instruction: "Kenal pasti litar dahulu. Kemudian pilih hubungan yang betul.",
        unitsMemory: {
          title: "📌 Ingat unit",
          items: [
            { quantitySymbol: "I", unitName: "ampere", unitSymbol: "A" },
            { quantitySymbol: "V", unitName: "volt", unitSymbol: "V" },
            { quantitySymbol: "R", unitName: "ohm", unitSymbol: "Ω" },
          ],
        },
      },
      workedExamples: [
        {
          figureLabel: "Contoh Pengiraan 1 — Litar Bersiri",
          questionIntro:
            "Dua perintang, R₁ = 2 Ω dan R₂ = 2 Ω, disambungkan secara bersiri kepada bekalan 6 V.",
          circuit: {
            kind: "series",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁ = 2 Ω" },
              { id: "r2", label: "R₂ = 2 Ω" },
            ],
            stepLabel: "Langkah",
            showMeters: true,
            size: "large",
          },
          questionsLabel: "Hitungkan",
          questions: [
            "(a) rintangan berkesan, R",
            "(b) arus, I dalam litar",
            "(c) voltan, V₁ dan V₂ merentasi perintang",
          ],
          identifyCircuit: {
            prompt: "Apakah jenis litar ini?",
            options: [
              { label: "Bersiri", isCorrect: true },
              { label: "Selari", isCorrect: false },
            ],
            correctFeedback: "Betul — komponen disambungkan dalam satu laluan.",
            incorrectFeedback: "Belum tepat — lihat bilangan laluan yang boleh dilalui arus.",
            startSolutionLabel: "Mula penyelesaian",
          },
          showSolutionLabel: "Mula penyelesaian",
          solution: {
            title: "Contoh Pengiraan 1 — penyelesaian",
            givenLabel: "Diberi",
            findLabel: "Cari",
            formulaLabel: "Formula",
            substituteLabel: "Gantikan",
            answerLabel: "Jawapan",
            given: ["R₁ = 2 Ω", "R₂ = 2 Ω", "Bekalan, V = 6 V (bersiri)"],
            find: "Rintangan berkesan R, kemudian arus I, kemudian V₁ dan V₂",
            formula: "R = R₁ + R₂  ·  I = V ÷ R  ·  V₁ = IR₁, V₂ = IR₂",
            substitute: "R = 2 + 2 = 4 Ω  ·  I = 6 ÷ 4 = 1.5 A  ·  V₁ = 1.5 × 2 = 3 V, V₂ = 1.5 × 2 = 3 V",
            answer: "R = 4 Ω, I = 1.5 A, V₁ = 3 V, V₂ = 3 V",
            circuit: {
              kind: "series",
              supplyLabel: "6 V",
              resistors: [
                { id: "r1", label: "R₁ = 2 Ω" },
                { id: "r2", label: "R₂ = 2 Ω" },
              ],
              stepLabel: "Langkah",
              showMeters: true,
              size: "large",
            },
            steps: [
              {
                label: "Langkah 1",
                formula: "R = R₁ + R₂",
                substitute: "R = 2 + 2",
                answer: "R = 4 Ω",
                highlight: ["r1", "r2"],
              },
              {
                label: "Langkah 2",
                formula: "I = V ÷ R",
                substitute: "I = 6 ÷ 4",
                answer: "I = 1.5 A",
                highlight: ["source", "loop"],
              },
              {
                label: "Langkah 3",
                formula: "V₁ = IR₁",
                substitute: "V₁ = 1.5 × 2",
                answer: "V₁ = 3 V",
                highlight: ["r1"],
              },
              {
                label: "Langkah 4",
                formula: "V₂ = IR₂",
                substitute: "V₂ = 1.5 × 2",
                answer: "V₂ = 3 V",
                highlight: ["r2"],
              },
            ],
          },
        },
        {
          figureLabel: "Contoh Pengiraan 2 — Litar Selari",
          questionIntro:
            "Dua perintang, R₁ = 2 Ω dan R₂ = 2 Ω, disambungkan secara selari kepada bekalan 6 V.",
          circuit: {
            kind: "parallel",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁ = 2 Ω" },
              { id: "r2", label: "R₂ = 2 Ω" },
            ],
            stepLabel: "Langkah",
            showMeters: true,
            size: "large",
          },
          questionsLabel: "Hitungkan",
          questions: [
            "(a) rintangan berkesan, R",
            "(b) voltan, V merentasi setiap cabang",
            "(c) arus, I dalam litar",
          ],
          identifyCircuit: {
            prompt: "Apakah jenis litar ini?",
            options: [
              { label: "Bersiri", isCorrect: false },
              { label: "Selari", isCorrect: true },
            ],
            correctFeedback: "Betul — arus mempunyai lebih daripada satu laluan.",
            incorrectFeedback: "Belum tepat — lihat bilangan cabang yang boleh dilalui arus.",
            startSolutionLabel: "Mula penyelesaian",
          },
          showSolutionLabel: "Mula penyelesaian",
          solution: {
            title: "Contoh Pengiraan 2 — penyelesaian",
            givenLabel: "Diberi",
            findLabel: "Cari",
            formulaLabel: "Formula",
            substituteLabel: "Gantikan",
            answerLabel: "Jawapan",
            given: ["R₁ = 2 Ω", "R₂ = 2 Ω", "Bekalan, V = 6 V (selari)"],
            find: "Rintangan berkesan R, kemudian arus cabang I₁ dan I₂, kemudian jumlah arus I",
            formula: "1/R = 1/R₁ + 1/R₂  ·  I₁ = V ÷ R₁, I₂ = V ÷ R₂  ·  I = I₁ + I₂",
            substitute: "1/R = 1/2 + 1/2 = 1, maka R = 1 Ω  ·  I₁ = 6 ÷ 2 = 3 A, I₂ = 6 ÷ 2 = 3 A  ·  I = 3 + 3",
            answer: "R = 1 Ω, I₁ = 3 A, I₂ = 3 A, jumlah I = 6 A",
            circuit: {
              kind: "parallel",
              supplyLabel: "6 V",
              resistors: [
                { id: "r1", label: "R₁ = 2 Ω" },
                { id: "r2", label: "R₂ = 2 Ω" },
              ],
              stepLabel: "Langkah",
              showMeters: true,
              size: "large",
            },
            steps: [
              {
                label: "Langkah 1",
                formula: "1/R = 1/R₁ + 1/R₂",
                substitute: "1/R = 1/2 + 1/2 = 1",
                answer: "R = 1 Ω",
                highlight: ["r1", "r2"],
              },
              {
                label: "Langkah 2",
                formula: "V = V₁ = V₂",
                substitute: "V = V₁ = V₂ = 6 V",
                answer: "V₁ = V₂ = 6 V",
                highlight: ["source", "r1", "r2"],
              },
              {
                label: "Langkah 3",
                formula: "I₁ = V₁ ÷ R₁",
                substitute: "I₁ = 6 ÷ 2",
                answer: "I₁ = 3 A",
                highlight: ["r1"],
              },
              {
                label: "Langkah 4",
                formula: "I₂ = V₂ ÷ R₂",
                substitute: "I₂ = 6 ÷ 2",
                answer: "I₂ = 3 A",
                highlight: ["r2"],
              },
              {
                label: "Langkah 5",
                formula: "I = I₁ + I₂",
                substitute: "I = 3 + 3",
                answer: "I = 6 A",
                highlight: ["source"],
              },
            ],
          },
        },
      ],
      selfPractice: {
        title: "🎯 Cuba Sendiri",
        instruction: "Selesaikan setiap rajah sendiri sebelum menyemak penyelesaiannya.",
        figures: [
          {
            figureLabel: "Litar 1",
            questionIntro:
              "Tiga perintang, R₁ = 1 Ω, R₂ = 3 Ω dan R₃ = 5 Ω, disambungkan secara bersiri kepada bekalan 9 V.",
            circuit: {
              kind: "series",
              supplyLabel: "9 V",
              resistors: [
                { id: "r1", label: "R₁ = 1 Ω" },
                { id: "r2", label: "R₂ = 3 Ω" },
                { id: "r3", label: "R₃ = 5 Ω" },
              ],
              stepLabel: "Langkah",
              size: "large",
            },
            questionsLabel: "Hitungkan",
            questions: [
              "a. rintangan berkesan",
              "b. arus dalam litar",
              "c. voltan merentasi setiap perintang",
            ],
            hintsLabel: "Petunjuk",
            hints: [
              "Kenal pasti sama ada perintang disambung secara bersiri atau selari.",
              "Kira rintangan berkesan dahulu — nilai ini diperlukan untuk bahagian lain.",
            ],
            showSolutionLabel: "Tunjukkan penyelesaian",
            solution: {
              title: "Litar 1 — penyelesaian",
              givenLabel: "Diberi",
              findLabel: "Cari",
              formulaLabel: "Formula",
              substituteLabel: "Gantikan",
              answerLabel: "Jawapan",
              given: ["V = 9 V", "R₁ = 1 Ω", "R₂ = 3 Ω", "R₃ = 5 Ω"],
              find: "R, kemudian I, kemudian V₁, V₂ dan V₃",
              formula: "R = R₁ + R₂ + R₃  ·  I = V ÷ R  ·  V = IR (setiap perintang)",
              substitute: "R = 1 + 3 + 5 = 9 Ω  ·  I = 9 ÷ 9 = 1 A  ·  V₁ = 1×1, V₂ = 1×3, V₃ = 1×5",
              answer: "R = 9 Ω, I = 1 A, V₁ = 1 V, V₂ = 3 V, V₃ = 5 V",
              circuit: {
                kind: "series",
                supplyLabel: "9 V",
                resistors: [
                  { id: "r1", label: "R₁ = 1 Ω" },
                  { id: "r2", label: "R₂ = 3 Ω" },
                  { id: "r3", label: "R₃ = 5 Ω" },
                ],
                stepLabel: "Langkah",
                size: "large",
              },
              steps: [
                {
                  label: "Langkah 1",
                  formula: "R = R₁ + R₂ + R₃",
                  substitute: "R = 1 + 3 + 5",
                  answer: "R = 9 Ω",
                  highlight: ["r1", "r2", "r3"],
                },
                {
                  label: "Langkah 2",
                  formula: "I = V ÷ R",
                  substitute: "I = 9 ÷ 9",
                  answer: "I = 1 A",
                  highlight: ["source", "loop"],
                },
                {
                  label: "Langkah 3",
                  formula: "V₁ = IR₁",
                  substitute: "V₁ = 1 × 1",
                  answer: "V₁ = 1 V",
                  highlight: ["r1"],
                },
                {
                  label: "Langkah 4",
                  formula: "V₂ = IR₂",
                  substitute: "V₂ = 1 × 3",
                  answer: "V₂ = 3 V",
                  highlight: ["r2"],
                },
                {
                  label: "Langkah 5",
                  formula: "V₃ = IR₃",
                  substitute: "V₃ = 1 × 5",
                  answer: "V₃ = 5 V",
                  highlight: ["r3"],
                },
              ],
            },
          },
          {
            figureLabel: "Litar 2",
            questionIntro:
              "Dua perintang, R₁ = 3 Ω dan R₂ = 6 Ω, disambungkan secara selari kepada bekalan 4 V.",
            circuit: {
              kind: "parallel",
              supplyLabel: "4 V",
              resistors: [
                { id: "r1", label: "R₁ = 3 Ω" },
                { id: "r2", label: "R₂ = 6 Ω" },
              ],
              stepLabel: "Langkah",
              size: "large",
            },
            questionsLabel: "Hitungkan",
            questions: [
              "a. rintangan berkesan",
              "b. voltan merentasi setiap perintang",
              "c. arus melalui setiap perintang (I₁ dan I₂)",
            ],
            hintsLabel: "Petunjuk",
            hints: [
              "Kenal pasti sama ada perintang disambung secara bersiri atau selari.",
              "Kira rintangan berkesan dahulu — nilai ini diperlukan untuk bahagian lain.",
            ],
            showSolutionLabel: "Tunjukkan penyelesaian",
            solution: {
              title: "Litar 2 — penyelesaian",
              givenLabel: "Diberi",
              findLabel: "Cari",
              formulaLabel: "Formula",
              substituteLabel: "Gantikan",
              answerLabel: "Jawapan",
              given: ["V = 4 V", "R₁ = 3 Ω", "R₂ = 6 Ω"],
              find: "R, kemudian V₁ dan V₂, kemudian I₁ dan I₂",
              formula: "1/R = 1/R₁ + 1/R₂  ·  V = V₁ = V₂  ·  I = V ÷ R (setiap cabang)",
              substitute: "1/R = 1/3 + 1/6 = 1/2, maka R = 2 Ω  ·  V₁ = V₂ = 4 V  ·  I₁ = 4÷3, I₂ = 4÷6",
              answer: "R = 2 Ω, V₁ = V₂ = 4 V, I₁ ≈ 1.33 A, I₂ ≈ 0.67 A",
              circuit: {
                kind: "parallel",
                supplyLabel: "4 V",
                resistors: [
                  { id: "r1", label: "R₁ = 3 Ω" },
                  { id: "r2", label: "R₂ = 6 Ω" },
                ],
                stepLabel: "Langkah",
                size: "large",
              },
              steps: [
                {
                  label: "Langkah 1",
                  formula: "1/R = 1/R₁ + 1/R₂",
                  substitute: "1/R = 1/3 + 1/6 = 1/2",
                  answer: "R = 2 Ω",
                  highlight: ["r1", "r2"],
                },
                {
                  label: "Langkah 2",
                  formula: "V = V₁ = V₂",
                  substitute: "V₁ = V₂ = 4 V",
                  answer: "V₁ = V₂ = 4 V",
                  highlight: ["source", "r1", "r2"],
                },
                {
                  label: "Langkah 3",
                  formula: "I₁ = V₁ ÷ R₁",
                  substitute: "I₁ = 4 ÷ 3",
                  answer: "I₁ ≈ 1.33 A",
                  highlight: ["r1"],
                },
                {
                  label: "Langkah 4",
                  formula: "I₂ = V₂ ÷ R₂",
                  substitute: "I₂ = 4 ÷ 6",
                  answer: "I₂ ≈ 0.67 A",
                  highlight: ["r2"],
                },
                {
                  label: "Langkah 5",
                  formula: "I = I₁ + I₂ (jumlah, tambahan)",
                  substitute: "I ≈ 1.33 + 0.67",
                  answer: "I ≈ 2.00 A",
                  highlight: ["source"],
                },
              ],
            },
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
          body: "Pendawaian elektrik di rumah menggunakan litar selari supaya setiap alat menerima **voltan yang sama daripada bekalan**, dan setiap alat boleh dihidupkan atau dimatikan tanpa menjejaskan yang lain.",
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
      conceptQuestion: "Apakah Medan Magnet?",
      intro:
        "Magnet boleh wujud secara semula jadi sebagai batu magnet, tetapi kebanyakan magnet yang digunakan hari ini diperbuat daripada bahan seperti **besi, keluli, kobalt dan nikel**. Kawasan di sekitar magnet yang wujud kesan daya oleh magnet dikenali sebagai **medan magnet**.",
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
            requiresShape: "like-poles",
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
      conceptQuestion: "Apakah Elektromagnet?",
      intro:
        "Elektromagnet ialah **magnet sementara** — ia hanya menghasilkan medan magnet semasa arus mengalir. Arah medan magnet yang terhasil **ditentukan oleh arah arus elektrik**, dan corak medannya **bergantung pada bentuk konduktor yang digunakan**.",
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
        noticeLabel: "Apakah yang perlu anda perhatikan?",
        conductors: [
          {
            id: "straight",
            name: "Dawai lurus",
            pattern: "bulatan sepusat mengelilingi dawai, semakin renggang semakin jauh dari dawai",
            direction: "ditentukan dengan petua genggaman tangan kanan.",
            note: "Dawai lurus menghasilkan garisan medan magnet yang berbentuk bulatan sepusat.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.straightWireApparatus,
              alt: "Dawai kuprum tegak menembusi pusat sebuah papan mendatar, dengan lapan kompas plot disusun membentuk bulatan di sekelilingnya.",
              caption: "Radas yang digunakan untuk menunjukkan medan magnet di sekeliling dawai lurus yang mengalirkan arus.",
            },
            notice: [
              "Medan itu membentuk bulatan mengelilingi dawai.",
              "Menyongsangkan arus menyongsangkan arah medan.",
              "Medan menjadi lebih lemah semakin jauh daripada dawai.",
            ],
          },
          {
            id: "loop",
            name: "Dawai gelung",
            pattern: "bulatan sepusat mengelilingi setiap bahagian dawai, bergabung di tengah gelung",
            direction: "ditentukan dengan petua genggaman tangan kanan pada mana-mana bahagian dawai.",
            note: "Medan magnet daripada kedua-dua belah gelung bergabung di tengah, menjadikan medan di situ lebih kuat.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.circularLoopApparatus,
              alt: "Satu gelung kuprum berbentuk bulat dipasang tegak pada kaki retort, kedua-dua hujungnya diapit pada terminal di bawahnya.",
              caption: "Radas yang digunakan untuk menunjukkan medan magnet gelung bulat yang mengalirkan arus.",
            },
            notice: [
              "Medan magnet daripada bahagian-bahagian gelung yang berlainan bergabung.",
              "Medan lebih kuat berhampiran tengah gelung.",
              "Menyongsangkan arus menyongsangkan arah medan.",
            ],
          },
          {
            id: "solenoid",
            name: "Solenoid",
            pattern: "menyerupai corak medan magnet magnet bar, dengan kutub di setiap hujung",
            direction:
              "arus yang mengalir mengikut lawan arah jam pada satu hujung menjadikan hujung itu kutub utara; arus mengikut arah jam menjadikannya kutub selatan.",
            note: "Solenoid ialah gegelung panjang. Medan magnetnya di luar menyerupai medan sebatang magnet bar.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.solenoidApparatus,
              alt: "Solenoid teras udara: dawai kuprum digulung menjadi kira-kira sebelas lilitan yang sama jarak, dipasang mendatar pada kaki retort, dengan pusatnya yang berongga kelihatan.",
              caption: "Radas yang digunakan untuk menunjukkan medan magnet solenoid yang mengalirkan arus.",
            },
            notice: [
              "Medan itu menyerupai medan sebatang magnet bar.",
              "Satu hujung bertindak sebagai kutub utara, satu lagi sebagai kutub selatan.",
              "Medan di dalam solenoid agak kuat.",
              "Menyongsangkan arus menyongsangkan kutub pada setiap hujung.",
            ],
          },
        ],
      },
      cards: [
        {
          title: "Kekuatan medan dan jarak",
          body: "**Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor.** Ini berbeza daripada faktor yang mengubah kekuatan elektromagnet itu sendiri — jarak mengubah kekuatan yang anda ukur, bukan kekuatan yang dihasilkan.",
        },
        {
          title: "🧲 Mengapa gegelung, dan mengapa teras besi",
          body: "Gegelung menumpukan medan magnet daripada setiap lilitan dawai ke ruang yang sama kecil, menjadikan medan itu jauh lebih kuat berbanding sebatang dawai lurus. Teras besi yang diletakkan di dalam gegelung menguatkan lagi elektromagnet itu.",
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
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.electromagnetUses,
          alt: "Empat kegunaan elektromagnet. Loceng elektrik, di mana gegelung menarik lengan supaya pemukul mengetuk loceng. Kunci pintu magnet yang menahan pintu tertutup. Kren di tapak besi buruk mengangkat rasuk keluli dengan elektromagnet bulat yang besar. Paku besi yang dililit dawai bergegelung dan disambung kepada sel, menarik klip kertas.",
          caption:
            "Loceng elektrik, kunci pintu magnet, magnet pengangkat besi buruk, dan elektromagnet gegelung-dan-paku yang dibina di makmal.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      miniExperiment: {
        title: "🔬 Penyiasatan: faktor yang mempengaruhi kekuatan medan magnet",
        aim: "Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet sesuatu elektromagnet.",
        instruction: "Pilih satu faktor untuk melihat penyiasatan penuhnya.",
        apparatusImage: {
          src: SCIENCE_F2_CH7_IMAGES.electromagnetInvestigation,
          alt: "Penyiasatan yang disusun di atas meja makmal. Bekalan kuasa a.t., suis, ammeter dan reostat disambung dalam satu gelung bersiri dengan dawai kuprum yang dililit mengelilingi rod besi menegak. Rod itu dipegang oleh pengapit pada kaki retort, dengan hujung bawahnya berada di atas piring Petri yang berisi jarum peniti.",
          responseLabels: [
            "Medan paling lemah di sekeliling rod besi — paling sedikit jarum peniti ditarik.",
            "Medan lemah di sekeliling rod besi — sedikit jarum peniti ditarik.",
            "Medan lebih kuat di sekeliling rod besi — lebih banyak jarum peniti ditarik.",
            "Medan kuat di sekeliling rod besi — banyak jarum peniti ditarik.",
            "Medan paling kuat di sekeliling rod besi — paling banyak jarum peniti ditarik.",
          ],
          turnsLabel: "Lilitan gegelung",
        },
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
            values: ["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"],
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
            values: ["10", "20", "30", "40", "50"],
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
          body: "Jarum kompas menggunakan magnet yang digantung bebas untuk **menunjukkan arah kutub**. Kad kredit dan kad debit **menyimpan maklumat pada jalur bermagnet**.",
        },
        {
          title: "🔔 Kegunaan elektromagnet",
          body: "Loceng elektrik menggunakan **elektromagnet untuk menggerakkan pemukulnya** berulang kali. Kunci bermagnet pada pintu menggunakan elektromagnet untuk **mengunci pintu secara automatik** — dan kerana ia elektromagnet, kuncinya terlepas apabila arus dimatikan.",
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
