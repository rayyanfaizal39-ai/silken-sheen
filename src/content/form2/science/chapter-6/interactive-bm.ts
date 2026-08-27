import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch6-asid-alkali.png";

export const scienceF2C6InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "Blog Sains — pH Kulit Anda",
    body: "Kulit anda mempunyai lapisan pelindung nipis dipanggil mantel berasid — gabungan sebum dan peluh yang mengekalkan kulit sedikit berasid secara semula jadi, membantu menghalang patogen daripada menyerang.",
    imagePath: chapterImage,
  },
  keywords: [
    "Asid",
    "Alkali",
    "Nilai pH",
    "Sifat mengakis",
    "Penunjuk semesta",
    "Kertas litmus",
    "Metil jingga",
    "Fenolftalein",
    "Meter pH",
    "Skala pH",
    "Asid kuat dan asid lemah",
    "Peneutralan",
    "Garam",
    "Pentitratan",
    "Takat akhir",
  ],
  sections: [
    // ------------------------------------------------------------- 6.1
    {
      number: "6.1",
      title: "Asid dan Alkali",
      intro:
        "Perkataan \"asid\" berasal daripada perkataan Latin acidus, bermaksud masam. Perkataan \"alkali\" berasal daripada perkataan Arab al-qali, bermaksud abu tumbuhan. Bahan yang mengandungi asid dipanggil bahan berasid; bahan yang mengandungi alkali dipanggil bahan beralkali.",
      cards: [
        {
          title: "Bahan berasid",
          body: "Bahan yang mengandungi asid. Banyak terdapat di dapur — epal dan kopi ialah bahan berasid, begitu juga cuka dan jus limau.",
        },
        {
          title: "Bahan beralkali",
          body: "Bahan yang mengandungi alkali. Soda penaik ialah bahan beralkali, begitu juga sabun dan pencuci pinggan.",
        },
      ],
      checks: [
        {
          question: "Anda menjumpai sebotol cecair tanpa label di dapur. Bagaimanakah anda boleh mengetahui sama ada ia berasid atau beralkali?",
          hint: "Uji dengan penunjuk seperti kertas litmus. Anda tidak boleh mengetahuinya daripada rupa sahaja — dan anda tidak boleh merasanya, kerana bahan yang tidak dikenali mungkin berbahaya.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Peranan Air",
      intro:
        "Ini mungkin mengejutkan: sesuatu bahan boleh menjadi asid tetapi tidak berkelakuan seperti asid. Asid dan alkali hanya menunjukkan sifatnya apabila air hadir. Bandingkan keempat-empat keadaan di bawah.",
      dryVsAqueous: {
        title: "💧 Tanpa air berbanding dengan air",
        instruction: "Tekan mana-mana keadaan untuk membaca apa yang berlaku dan mengapa.",
        withoutWaterLabel: "Tanpa air",
        withWaterLabel: "Dengan air",
        acidColumnLabel: "Asid — diuji dengan kertas litmus biru",
        alkaliColumnLabel: "Alkali — diuji dengan kertas litmus merah",
        keyMessage: "Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air.",
        hint: "Tekan mana-mana daripada empat keadaan di atas.",
        panels: [
          {
            id: "acid-dry",
            substance: "Asid etanoik glasial",
            withWater: false,
            litmus: "blue",
            result: "blue",
            resultText: "Litmus biru tidak berubah warna",
            note: "Asid etanoik glasial ialah asid etanoik tanpa air. Walaupun ia benar-benar asid, ia tidak menunjukkan sifat asidnya — kertas litmus biru kekal biru.",
          },
          {
            id: "acid-wet",
            substance: "Asid etanoik + air",
            withWater: true,
            litmus: "blue",
            result: "red",
            resultText: "Litmus biru menjadi merah",
            note: "Sebaik sahaja air ditambah, asid etanoik menunjukkan sifat asidnya dan menukarkan kertas litmus biru kepada merah.",
          },
          {
            id: "alkali-dry",
            substance: "Pepejal natrium hidroksida",
            withWater: false,
            litmus: "red",
            result: "red",
            resultText: "Litmus merah tidak berubah warna",
            note: "Natrium hidroksida pepejal ialah alkali, tetapi tanpa air ia tidak menunjukkan sifat alkalinya — kertas litmus merah kekal merah.",
          },
          {
            id: "alkali-wet",
            substance: "Natrium hidroksida + air",
            withWater: true,
            litmus: "red",
            result: "blue",
            resultText: "Litmus merah menjadi biru",
            note: "Dengan air, natrium hidroksida menunjukkan sifat alkalinya dan menukarkan kertas litmus merah kepada biru.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah asid etanoik glasial tidak menukarkan warna kertas litmus biru?",
          hint: "Kerana tiada air hadir. Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air — tambah air, dan litmus biru terus bertukar merah.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Sifat Asid dan Alkali",
      intro:
        "Setelah air hadir, asid dan alkali menunjukkan set sifat yang boleh diramal. Bandingkan kedua-duanya sifat demi sifat.",
      conceptContrast: {
        title: "⚖️ Asid berbanding alkali",
        instruction: "Kedua-duanya bersifat mengakis — perbezaannya terletak pada sifat yang lain.",
        keyPoint:
          "⚠️ Rasa masam dan rasa pahit ialah huraian sifat sahaja. Jangan sekali-kali merasa bahan kimia di dalam makmal atau bahan yang tidak dikenali.",
        left: {
          id: "acid",
          icon: "🍋",
          term: "Asid",
          question: "Nilai pH kurang daripada 7",
          definition:
            "Bahan yang menunjukkan sifat berasid apabila dilarutkan di dalam air.",
          examples: [
            "Berasa masam",
            "Bersifat mengakis",
            "Menukarkan kertas litmus biru kepada merah",
            "Bertindak balas dengan logam untuk menghasilkan gas hidrogen",
          ],
        },
        right: {
          id: "alkali",
          icon: "🧼",
          term: "Alkali",
          question: "Nilai pH lebih daripada 7",
          definition:
            "Bahan yang menunjukkan sifat beralkali apabila dilarutkan di dalam air.",
          examples: [
            "Berasa pahit",
            "Bersifat mengakis",
            "Menukarkan kertas litmus merah kepada biru",
            "Tidak bertindak balas dengan logam",
          ],
        },
      },
      cards: [
        {
          title: "Ujian gas hidrogen",
          body: "Apabila asid bertindak balas dengan logam seperti magnesium atau zink, gas hidrogen terhasil. Kayu uji menyala menghasilkan bunyi 'pop' apabila didekatkan kepada gas hidrogen.",
          detail: "Alkali tidak menghasilkan tindak balas ini dengan logam.",
        },
      ],
      checks: [
        {
          question: "Mengapakah botol asid dan alkali mempunyai simbol amaran kakisan?",
          hint: "Kerana kedua-dua asid DAN alkali — bukan asid sahaja — boleh bersifat mengakis dan merosakkan kulit atau bahan lain.",
        },
        {
          question:
            "Pita magnesium dimasukkan ke dalam larutan kalium hidroksida. Apakah yang anda jangka berlaku?",
          hint: "Tiada tindak balas. Alkali tidak bertindak balas dengan logam — hanya asid yang bertindak balas dengan logam untuk menghasilkan gas hidrogen.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Penunjuk dan Cara Mengukur pH",
      intro:
        "Penunjuk ialah bahan pewarna yang menukar warna mengikut bahan yang diujinya. Penunjuk yang berbeza memberitahu anda perkara yang berbeza — sesetengahnya hanya memberitahu asid atau alkali, sesetengahnya memberikan nilai pH.",
      indicatorTable: {
        title: "🎨 Perubahan warna penunjuk",
        instruction: "Tekan nama penunjuk untuk mengetahui bila ia paling berguna.",
        indicatorLabel: "Penunjuk",
        acidLabel: "Asid",
        neutralLabel: "Neutral",
        alkaliLabel: "Alkali",
        hint: "Tekan mana-mana penunjuk dalam lajur pertama.",
        rows: [
          {
            id: "phenolphthalein",
            name: "Fenolftalein",
            acid: "Tidak berwarna",
            neutral: "Tidak berwarna",
            alkali: "Merah jambu",
            acidSwatch: "rgba(226,232,240,0.30)",
            neutralSwatch: "rgba(226,232,240,0.30)",
            alkaliSwatch: "rgba(244,114,182,0.45)",
            note: "Tidak dapat membezakan asid daripada neutral — kedua-duanya tidak berwarna. Berguna khususnya untuk mengesan alkali, dan itulah sebabnya ia dipilih untuk pentitratan.",
          },
          {
            id: "universal",
            name: "Penunjuk semesta",
            acid: "Merah",
            neutral: "Hijau",
            alkali: "Biru",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(34,197,94,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Memberikan warna berbeza pada setiap julat pH, bukan sekadar tiga warna. Itulah kelebihannya berbanding kertas litmus — ia memberi anggaran nilai pH, bukan hanya jawapan asid atau alkali.",
          },
          {
            id: "methyl-orange",
            name: "Metil jingga",
            acid: "Merah",
            neutral: "Kuning",
            alkali: "Kuning",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(234,179,8,0.48)",
            alkaliSwatch: "rgba(234,179,8,0.48)",
            note: "Perhatikan bahawa neutral dan alkali memberikan warna yang sama — kuning. Jadi metil jingga baik untuk mengesan asid, tetapi tidak dapat membezakan neutral daripada alkali.",
          },
          {
            id: "blue-litmus",
            name: "Kertas litmus biru",
            acid: "Merah",
            neutral: "Biru",
            alkali: "Biru",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(59,130,246,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Bertukar merah hanya dalam asid. Gunakan litmus biru apabila anda ingin tahu sama ada sesuatu itu berasid.",
          },
          {
            id: "red-litmus",
            name: "Kertas litmus merah",
            acid: "Merah",
            neutral: "Merah",
            alkali: "Biru",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(239,68,68,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Bertukar biru hanya dalam alkali. Gunakan litmus merah apabila anda ingin tahu sama ada sesuatu itu beralkali.",
          },
        ],
      },
      methodCards: {
        title: "📏 Tiga cara mengetahui pH",
        instruction: "Setiap alat menjawab soalan yang sama, tetapi dengan ketepatan yang berbeza.",
        whatLabel: "Apakah ia?",
        howLabel: "Apakah yang ia beritahu?",
        whenLabel: "Bila digunakan?",
        cards: [
          {
            id: "litmus",
            icon: "📄",
            name: "Kertas litmus",
            what: "Kertas yang dirawat dengan pewarna, dalam dua jenis — biru dan merah.",
            how: "Sama ada bahan itu berasid atau beralkali. Ia tidak memberitahu berapa kuat.",
            when: "Apabila anda hanya perlu jawapan cepat: asid atau alkali?",
          },
          {
            id: "universal",
            icon: "🌈",
            name: "Penunjuk semesta / kertas pH",
            what: "Campuran beberapa pewarna yang menghasilkan julat warna yang berterusan.",
            how: "Anggaran nilai pH, dengan membandingkan warnanya dengan carta pH.",
            when: "Apabila anda perlu tahu lebih daripada sekadar asid atau alkali.",
          },
          {
            id: "ph-meter",
            icon: "🔢",
            name: "Meter pH",
            what: "Alat elektronik dengan prob yang dicelupkan ke dalam larutan.",
            how: "Bacaan pH berangka terus pada skrin — paling tepat antara ketiga-tiganya.",
            when: "Apabila nilai pH yang tepat diperlukan, bukan sekadar anggaran warna.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah kelebihan penunjuk semesta berbanding kertas litmus?",
          hint: "Kertas litmus hanya memberitahu sama ada bahan itu berasid atau beralkali. Penunjuk semesta memberikan julat warna yang membolehkan anda menganggarkan nilai pH sebenar.",
        },
        {
          question:
            "Grace menitiskan fenolftalein ke dalam larutan M yang tidak berwarna. Larutan itu kekal tidak berwarna. Adakah larutan M pasti berasid?",
          hint: "Tidak pasti. Fenolftalein tidak berwarna dalam asid DAN dalam larutan neutral — jadi larutan M mungkin salah satu daripadanya. Uji semula dengan kertas litmus biru untuk memastikan.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Skala pH",
      intro:
        "Skala pH menunjukkan sejauh mana sesuatu larutan itu berasid atau beralkali. Julat nilainya adalah antara 0 hingga 14, dengan pH 7 sebagai neutral. Semakin rendah nilai pH, semakin berasid larutan itu; semakin tinggi nilai pH, semakin beralkali.",
      phSlider: {
        title: "🌈 Skala pH — seret untuk meneroka",
        instruction:
          "Setiap bahan berada pada skala 0–14. Seret penanda untuk melihat apa yang berada pada setiap nilai pH.",
        scale: [
          { value: 0, name: "Asid bateri", description: "Sangat berasid — amat mengakis." },
          { value: 1, name: "Asid gastrik", description: "Sangat berasid — cukup untuk mencerna makanan." },
          { value: 2, name: "Cuka / jus limau", description: "Berasid — rasa masam yang anda kenali." },
          { value: 3, name: "Jus oren", description: "Berasid." },
          { value: 4, name: "Jus nanas / tomato", description: "Sedikit berasid." },
          { value: 5, name: "Kopi hitam", description: "Sedikit berasid." },
          { value: 6, name: "Susu", description: "Hampir neutral, sedikit berasid." },
          { value: 7, name: "Air tulen", description: "Neutral sepenuhnya." },
          { value: 8, name: "Air laut", description: "Hampir neutral, sedikit beralkali." },
          { value: 9, name: "Soda penaik", description: "Sedikit beralkali." },
          { value: 10, name: "Antasid / susu magnesia", description: "Beralkali." },
          { value: 11, name: "Larutan ammonia", description: "Beralkali." },
          { value: 12, name: "Air sabun", description: "Beralkali." },
          { value: 13, name: "Peluntur (bleach)", description: "Sangat beralkali." },
          { value: 14, name: "Pencuci saluran paip", description: "Sangat beralkali — amat mengakis." },
        ],
      },
      checks: [
        {
          question:
            "Sejenis cecair menukarkan penunjuk semesta kepada warna hijau. Adakah ia berasid, neutral, atau beralkali?",
          hint: "Neutral — hijau berada tepat pada pH 7 dalam skala penunjuk semesta.",
        },
        {
          question: "Susun mengikut urutan menaik keasidan: jus nanas (pH 4), susu segar (pH 6), cuka (pH 2).",
          hint: "Susu segar (pH 6), jus nanas (pH 4), kemudian cuka (pH 2). Semakin rendah nilai pH, semakin berasid larutan itu.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Kekuatan Asid dan Alkali",
      intro:
        "Nilai pH memberitahu sejauh mana sesuatu larutan itu berasid — tetapi untuk membandingkan kekuatan bahan itu sendiri, kita perlu membandingkannya secara adil, iaitu pada kepekatan yang sama.",
      strengthComparison: {
        title: "💪 Kuat berbanding lemah",
        instruction: "Tekan mana-mana bahan untuk mengetahui sebabnya.",
        conditionLabel: "Syarat perbandingan",
        condition:
          "Semua larutan di bawah dibandingkan pada kepekatan yang sama. Tanpa syarat ini, perbezaan nilai pH mungkin datang daripada kepekatan, bukan daripada kekuatan bahan itu sendiri.",
        strongLabel: "Kuat",
        weakLabel: "Lemah",
        acidGroupLabel: "Asid",
        alkaliGroupLabel: "Alkali",
        hint: "Tekan mana-mana daripada empat bahan di atas.",
        keyPoint:
          "Kekuatan ialah sifat bahan itu sendiri, bukan berapa banyak air yang ditambah. Cuka mengandungi asid etanoik — satu asid lemah — walaupun rasanya masam dan nilai pHnya rendah.",
        entries: [
          {
            id: "hcl",
            name: "Asid hidroklorik",
            ph: "pH ~1",
            strength: "strong",
            kind: "acid",
            note: "Pada kepekatan ini, asid hidroklorik memberikan nilai pH yang paling rendah antara kedua-dua asid. Inilah contoh asid kuat.",
          },
          {
            id: "ethanoic",
            name: "Asid etanoik",
            ph: "pH ~3",
            strength: "weak",
            kind: "acid",
            note: "Pada kepekatan yang sama dengan asid hidroklorik, asid etanoik memberikan nilai pH yang lebih tinggi. Inilah contoh asid lemah — dan inilah asid yang terdapat di dalam cuka.",
          },
          {
            id: "naoh",
            name: "Larutan natrium hidroksida",
            ph: "pH ~13",
            strength: "strong",
            kind: "alkali",
            note: "Pada kepekatan ini, natrium hidroksida memberikan nilai pH yang paling tinggi antara kedua-dua alkali. Inilah contoh alkali kuat.",
          },
          {
            id: "ammonia",
            name: "Larutan ammonia",
            ph: "pH ~11",
            strength: "weak",
            kind: "alkali",
            note: "Pada kepekatan yang sama dengan natrium hidroksida, larutan ammonia memberikan nilai pH yang lebih rendah. Inilah contoh alkali lemah.",
          },
        ],
      },
      checks: [
        {
          question:
            "Dua larutan asid pada kepekatan yang sama diuji. Larutan P mempunyai pH 1 dan larutan Q mempunyai pH 3. Yang manakah asid kuat?",
          hint: "Larutan P. Pada kepekatan yang sama, asid yang memberikan nilai pH lebih rendah ialah asid yang lebih kuat. Syarat 'kepekatan yang sama' penting — tanpanya perbandingan itu tidak adil.",
        },
        {
          question: "Cuka berasa sangat masam. Adakah ini bermakna cuka mengandungi asid kuat?",
          hint: "Tidak. Cuka mengandungi asid etanoik, iaitu asid lemah. Rasa masam dan nilai pH yang rendah memberitahu anda larutan itu berasid — tetapi kekuatan asid ditentukan dengan membandingkan bahan pada kepekatan yang sama.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Kegunaan Asid dan Alkali",
      intro:
        "Asid dan alkali digunakan setiap hari di rumah, dan juga secara meluas dalam sektor pertanian dan perindustrian.",
      cards: [
        {
          title: "🏠 Di rumah",
          body: "Asid: cuka dalam masakan, minuman bergas (asid karbonik), jeruk (asid tartarik). Alkali: sabun mandi (kalium hidroksida), pencuci pinggan, pil antasid (magnesium hidroksida).",
        },
        {
          title: "🌾 Dalam pertanian",
          body: "Larutan ammonia digunakan untuk menghasilkan baja bagi menyuburkan tanaman. Kapur mati yang beralkali ditaburkan untuk merawat tanah yang terlalu berasid supaya tanaman dapat tumbuh dengan subur.",
          detail: "Keasidan tanah yang meningkat menjejaskan pertumbuhan tanaman.",
        },
        {
          title: "🏭 Dalam industri",
          body: "Asid sulfurik digunakan di dalam bateri kereta. Natrium hidroksida digunakan untuk menghasilkan detergen. Alkali juga digunakan untuk merawat sisa kilang yang berasid sebelum ia dilepaskan ke sungai.",
          detail: "Pembakaran bahan api di kawasan perindustrian boleh menurunkan nilai pH air hujan.",
        },
      ],
      checks: [
        {
          question:
            "Mengapakah nilai pH air hujan di kawasan perindustrian dijangka lebih rendah daripada 7?",
          hint: "Gas yang dibebaskan daripada aktiviti perindustrian larut di dalam titisan air hujan dan menjadikannya berasid — jadi nilai pHnya lebih rendah daripada air hujan biasa.",
        },
      ],
    },

    // ------------------------------------------------------------- 6.2
    {
      number: "6.2",
      title: "Peneutralan dan Pentitratan",
      intro:
        "Campurkan asid dengan alkali dan kedua-duanya saling meniadakan — asid hilang sifat asidnya, alkali hilang sifat alkalinya, dan tindak balas menghasilkan garam dan air. Kaedah makmal yang digunakan untuk menjalankan tindak balas ini dipanggil pentitratan.",
      cards: [
        {
          title: "Persamaan peneutralan",
          body: "Asid + Alkali → Garam + Air",
          detail: "Asid dan alkali yang berbeza menghasilkan jenis garam yang berbeza.",
        },
        {
          title: "Asid hidroklorik + Natrium hidroksida",
          body: "Menghasilkan natrium klorida dan air.",
        },
        {
          title: "Asid sulfurik + Kalium hidroksida",
          body: "Menghasilkan kalium sulfat dan air.",
        },
        {
          title: "Asid nitrik + Natrium hidroksida",
          body: "Menghasilkan natrium nitrat dan air.",
        },
      ],
      titrationSchematic: {
        title: "🧪 Pentitratan asid-alkali",
        instruction: "Tekan mana-mana bahagian untuk mengetahui fungsinya.",
        endpointCaption: "Takat akhir: merah jambu → tidak berwarna",
        hint: "Tekan Buret, Asid, Kelalang kon, Penunjuk atau Takat akhir.",
        labels: [
          {
            id: "burette",
            label: "Buret",
            note: "Tiub kaca bersenggat yang membolehkan asid dititiskan sedikit demi sedikit, dan isi padu yang digunakan dibaca dengan tepat.",
          },
          {
            id: "acid",
            label: "Asid",
            note: "Asid hidroklorik diisi ke dalam buret. Ia dititiskan perlahan-lahan ke dalam alkali di bawah.",
          },
          {
            id: "flask",
            label: "Kelalang kon",
            note: "Mengandungi larutan natrium hidroksida yang disukat dengan pipet. Kelalang digoncang perlahan semasa asid dititiskan.",
          },
          {
            id: "indicator",
            label: "Penunjuk",
            note: "Beberapa titik fenolftalein ditambah ke dalam kelalang kon. Dalam alkali, larutan bertukar merah jambu.",
          },
          {
            id: "endpoint",
            label: "Takat akhir",
            note: "Titisan asid dihentikan sebaik sahaja warna merah jambu hilang dan larutan menjadi tidak berwarna. Di sinilah peneutralan telah selesai.",
          },
        ],
      },
      checks: [
        {
          question:
            "Dalam pentitratan asid-alkali menggunakan fenolftalein, bagaimanakah takat akhir dikenal pasti?",
          hint: "Apabila larutan di dalam kelalang kon bertukar daripada merah jambu kepada tidak berwarna. Pada ketika itu asid yang ditambah telah meneutralkan semua alkali.",
        },
        {
          question:
            "Semasa pentitratan, larutan di dalam kelalang kon masih kekal merah jambu. Apakah maknanya?",
          hint: "Alkali masih berlebihan — asid yang ditambah belum mencukupi untuk meneutralkan kesemuanya. Titisan asid perlu diteruskan sehingga warna merah jambu hilang.",
        },
      ],
    },
    {
      number: "6.2",
      title: "Peneutralan dalam Kehidupan Harian",
      intro:
        "Peneutralan bukan sekadar tindak balas makmal. Ia digunakan setiap hari dalam produk penjagaan diri, dalam pertanian dan dalam industri.",
      accordions: [
        {
          title: "🦷 Ubat gigi",
          body: "Bakteria di dalam mulut menghasilkan asid yang mengakis gigi. Ubat gigi mengandungi bahan beralkali yang meneutralkan asid itu, membantu mencegah karies gigi.",
        },
        {
          title: "🧺 Pelembut fabrik",
          body: "Serbuk pencuci menjadikan fabrik beralkali selepas dibasuh. Pelembut fabrik bersifat asid, jadi ia menurunkan nilai pH fabrik dengan meneutralkan baki beralkali itu — menjadikan fabrik lembut.",
        },
        {
          title: "💇 Syampu dan perapi rambut",
          body: "Rambut yang sihat berada dalam keadaan sedikit berasid, tetapi syampu biasanya sedikit beralkali. Perapi rambut yang sedikit berasid meneutralkan baki syampu pada rambut, menjadikan rambut lembut dan sihat.",
        },
        {
          title: "🧴 Penjagaan muka",
          body: "Pembersih muka yang beralkali akan menjadikan kulit muka kering. Oleh itu, penyegar berasid digunakan untuk meneutralkan semula kulit muka.",
        },
        {
          title: "🌾 Mengawal pH tanah",
          body: "Tanah yang berasid dapat dirawat dengan menabur kapur mati yang bersifat alkali, supaya tanaman dapat tumbuh dengan subur.",
        },
        {
          title: "🏭 Merawat sisa industri",
          body: "Bahan buangan berasid daripada kilang dirawat dengan alkali sebelum dibebaskan ke sungai, supaya ia tidak menjejaskan hidupan akuatik.",
        },
      ],
      checks: [
        {
          question:
            "Amran disengat ubur-ubur. Kesakitannya bertambah teruk apabila kawannya menyapu sabun dan ubat gigi pada bahagian itu. Mengapa, dan apakah yang sepatutnya dilakukan?",
          hint: "Sabun dan ubat gigi bersifat alkali. Dalam model yang digunakan di sini, sengatan ubur-ubur juga dianggap beralkali — jadi menambah lagi bahan beralkali tidak meneutralkannya dan menyebabkan kesakitan bertambah. Bahan berasid seperti cuka digunakan untuk meneutralkan keadaan itu. (Nota: rawatan sengatan sebenar bergantung pada spesies — ikut panduan pertolongan cemas semasa.)",
        },
        {
          question:
            "Bau hanyir ikan bersifat beralkali. Apakah yang boleh digunakan untuk menghilangkannya semasa membersihkan ikan?",
          hint: "Bahan berasid seperti jus limau nipis. Asid itu meneutralkan bahan beralkali yang menyebabkan bau hanyir tersebut.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan maksud bahan berasid dan bahan beralkali dengan contoh.",
    "Saya boleh menerangkan mengapa asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air.",
    "Saya boleh membandingkan sifat asid dan alkali, termasuk tindakannya terhadap logam.",
    "Saya boleh menyatakan perubahan warna bagi setiap penunjuk.",
    "Saya boleh memilih alat yang sesuai untuk mengetahui nilai pH sesuatu bahan.",
    "Saya boleh menggunakan skala pH untuk menentukan sama ada bahan itu berasid, neutral atau beralkali.",
    "Saya boleh membezakan asid kuat daripada asid lemah pada kepekatan yang sama.",
    "Saya boleh memberikan contoh kegunaan asid dan alkali di rumah, dalam pertanian dan dalam industri.",
    "Saya boleh menulis persamaan perkataan bagi tindak balas peneutralan.",
    "Saya boleh menerangkan cara takat akhir dikenal pasti dalam pentitratan.",
    "Saya boleh menerangkan aplikasi peneutralan dalam kehidupan harian.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "Betul atau salah: Pada kepekatan yang sama, asid yang mempunyai nilai pH lebih rendah ialah asid yang lebih kuat.",
      answer: true,
      explanation:
        "Betul — tetapi syarat 'pada kepekatan yang sama' itu penting. Tanpanya, nilai pH yang lebih rendah mungkin hanya bermakna larutan itu lebih pekat, bukan asidnya lebih kuat.",
    },
    {
      type: "true-false",
      question: "Betul atau salah: Cuka berasa masam, jadi cuka mengandungi asid kuat.",
      answer: false,
      explanation:
        "Salah. Cuka mengandungi asid etanoik, iaitu satu asid lemah. Rasa masam menunjukkan larutan itu berasid, tetapi bukan bahawa asidnya kuat.",
    },
    {
      type: "multiple-choice",
      question: "Apakah dua hasil tindak balas peneutralan?",
      options: ["Asid dan alkali", "Garam dan air", "Oksigen dan hidrogen", "Karbon dioksida dan air"],
      answerIndex: 1,
      explanation: "Asid + Alkali → Garam + Air, setiap kali — hanya jenis garam yang terhasil berbeza.",
    },
    {
      type: "multiple-choice",
      question: "Alat manakah yang memberikan bacaan nilai pH berangka yang paling tepat?",
      options: ["Kertas litmus biru", "Kertas litmus merah", "Metil jingga", "Meter pH"],
      answerIndex: 3,
      explanation:
        "Meter pH memberikan bacaan berangka terus. Kertas litmus hanya memberitahu asid atau alkali, manakala penunjuk memberikan anggaran melalui warna.",
    },
  ],
};
