import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch5-air-larutan.png";

export const scienceF2C5InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Blog Sains — Laut Mati",
    body: "Terletak kira-kira 430.5 meter di bawah paras laut, Laut Mati adalah titik paling rendah di Bumi. Kerana ia dikepung sepenuhnya oleh tanah, air yang mengalir daripada Sungai Jordan sejat dengan cepat dan meninggalkan garamnya — menjadikan air begitu tumpat sehingga orang boleh terapung di permukaannya tanpa berusaha.",
    imagePath: chapterImage,
  },
  keywords: [
    "Sebatian",
    "Daya lekitan",
    "Daya lekatan",
    "Tindakan kapilari",
    "Kadar penyejatan",
    "Keterlarutan",
    "Kadar keterlarutan",
    "Ampaian",
    "Koloid",
    "Larutan tepu",
    "Pelarut semesta",
    "Penggumpalan",
    "Pengklorinan",
    "Osmosis berbalik",
    "Kelestarian air",
  ],
  sections: [
    // ---------------------------------------------------------------- 5.1
    {
      number: "5.1",
      title: "Sifat Fizik Air",
      intro:
        "Air tulen tidak berwarna, tidak berbau dan tidak berasa, serta kekal sebagai cecair pada suhu bilik. Ia mendidih pada tepat 100°C, membeku pada 0°C, dan mempunyai ketumpatan 1 g cm⁻³. Nilai tetap ini sebenarnya digunakan untuk menguji sama ada air mengandungi bendasing, kerana bendasing mengubah nilai-nilai ini.",
      cards: [
        {
          title: "Empat nilai tetap air tulen",
          body: "Takat didih 100°C, takat beku 0°C, tiada warna, dan ketumpatan 1 g cm⁻³. Kesemuanya diukur pada air yang benar-benar tulen.",
          detail: "Sebarang perubahan pada nilai-nilai ini menunjukkan kehadiran bendasing terlarut.",
        },
        {
          title: "Peleburan & Pembekuan",
          body: "Peleburan menukar ais pepejal kepada air cecair dengan menyerap haba. Pembekuan menukar air cecair kepada ais pepejal dengan membebaskan haba.",
        },
        {
          title: "Penyejatan/Pendidihan & Kondensasi",
          body: "Penyejatan/pendidihan menukar air cecair kepada wap air dengan menyerap haba. Kondensasi menukar wap air kembali kepada cecair dengan membebaskan haba.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah Ikram boleh menguji sama ada sebotol air itu tulen?",
          hint: "Uji takat didih dan takat bekunya — air tulen mendidih pada tepat 100°C dan membeku pada tepat 0°C. Sebarang perubahan menunjukkan kehadiran bendasing terlarut.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Tegangan Permukaan dan Tindakan Kapilari",
      intro:
        "Molekul air menarik antara satu sama lain, dan juga menarik permukaan lain yang disentuhnya. Dua daya inilah yang menerangkan mengapa serangga boleh berehat di atas air, dan bagaimana air naik dari akar ke daun tanpa sebarang pam.",
      cards: [
        {
          title: "Tegangan permukaan yang tinggi",
          body: "Daya lekitan antara molekul air cukup kuat pada permukaan sehingga permukaan itu berkelakuan seperti kulit nipis. Serangga ringan seperti ayak-ayak boleh berehat di atasnya tanpa tenggelam.",
        },
        {
          title: "Air naik ke pucuk pokok",
          body: "Di dalam salur xilem yang sangat halus, daya lekatan menarik air ke atas dinding salur, sementara daya lekitan menarik molekul air yang lain mengikutinya. Kesan gabungan ini menaikkan air dari akar hingga ke daun.",
        },
      ],
      capillaryDiagram: {
        title: "💧 Dua daya yang menaikkan air",
        instruction: "Tekan setiap daya untuk melihat anak panahnya sahaja dan membaca maksudnya.",
        caption: "Air bergerak dari akar ke daun melalui salur xilem yang halus",
        hint: "Tekan Daya lekitan, Daya lekatan atau Tindakan kapilari.",
        labels: [
          {
            id: "cohesion",
            label: "Daya lekitan",
            note: "Tarikan antara molekul air dengan molekul air yang lain — iaitu antara molekul yang sama. Daya inilah yang menghasilkan tegangan permukaan dan menarik molekul air seterusnya mengikut naik.",
          },
          {
            id: "adhesion",
            label: "Daya lekatan",
            note: "Tarikan antara molekul air dengan permukaan yang berbeza, seperti dinding salur xilem tumbuhan. Daya inilah yang melekatkan air pada dinding salur dan menariknya ke atas.",
          },
          {
            id: "capillary",
            label: "Tindakan kapilari",
            note: "Kesan gabungan daya lekitan dan daya lekatan di dalam salur yang sangat halus, yang menyebabkan air naik tanpa dipam — membawa air dari akar ke daun.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah tuala boleh menyerap air walaupun air sepatutnya mengalir ke bawah?",
          hint: "Ruang halus antara gentian tuala berkelakuan seperti salur kapilari — daya lekatan menarik air ke dinding gentian dan daya lekitan menarik molekul air yang lain mengikutinya.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Bendasing dan Elektrolisis Air",
      intro:
        "Air ialah sebatian — dua atom hidrogen bergabung dengan satu atom oksigen, H₂O. Elektrolisis memisahkannya semula, dan isi padu gas yang terkumpul membuktikan nisbah itu. Bendasing terlarut pula mengubah takat lebur dan takat didih air.",
      cards: [
        {
          title: "Mengapa sup masin mendidih lebih lambat",
          body: "Bendasing terlarut mengubah takat lebur dan takat didih air — garam menurunkan takat lebur ais tetapi meningkatkan takat didih air. Itulah sebabnya periuk air biasa mendidih lebih cepat daripada periuk yang mengandungi garam atau stok sup terlarut.",
          detail: "Rasa, bau dan warna air juga boleh berubah dengan kehadiran bendasing — air laut berasa masin kerana garam terlarut di dalamnya.",
        },
        {
          title: "Menguji gas yang terhasil",
          body: "Kayu uji berbara menyala semula dalam oksigen; kayu uji menyala berbunyi 'pop' dalam hidrogen.",
          detail: "Air suling sendiri konduktor elektrik yang lemah, jadi sedikit asid cair ditambah supaya arus dapat mengalir semasa elektrolisis.",
        },
      ],
      electrolysisDiagram: {
        title: "⚡ Elektrolisis air",
        instruction: "Tekan mana-mana bahagian untuk mengetahui fungsinya. Bandingkan tinggi kedua-dua turus gas.",
        ratioCaption: "Isi padu hidrogen : oksigen = 2 : 1",
        hint: "Tekan Anod, Katod, Gas hidrogen atau Gas oksigen.",
        labels: [
          {
            id: "anode",
            label: "Anod",
            note: "Elektrod yang disambungkan pada terminal positif bateri. Gas oksigen terkumpul di sini.",
          },
          {
            id: "cathode",
            label: "Katod",
            note: "Elektrod yang disambungkan pada terminal negatif bateri. Gas hidrogen terkumpul di sini.",
          },
          {
            id: "hydrogen",
            label: "Gas hidrogen",
            note: "Terkumpul di katod. Isi padunya tepat dua kali ganda oksigen kerana setiap molekul air mengandungi dua atom hidrogen.",
          },
          {
            id: "oxygen",
            label: "Gas oksigen",
            note: "Terkumpul di anod. Isi padunya separuh daripada hidrogen kerana setiap molekul air mengandungi hanya satu atom oksigen.",
          },
        ],
      },
      checks: [
        {
          question: "Semasa elektrolisis air, tabung uji manakah terkumpul lebih banyak gas, dan mengapa?",
          hint: "Tabung di katod — gas hidrogen. Isi padunya dua kali ganda oksigen kerana setiap molekul air (H₂O) mempunyai dua atom hidrogen berbanding satu atom oksigen.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Penyejatan Air",
      intro:
        "Penyejatan berlaku di permukaan air dan menukarkan air menjadi wap air. Ia boleh berlaku pada sebarang suhu, kerana molekul air di permukaan mempunyai tenaga kinetik yang lebih tinggi dan dapat terlepas ke udara. Empat faktor mempengaruhi kadar penyejatan.",
      flipCards: [
        {
          id: "humidity",
          icon: "💨",
          label: "Kelembapan",
          fact: "Udara yang lebih kering (kelembapan rendah) boleh menampung lebih banyak molekul air yang terlepas, jadi penyejatan lebih cepat.",
        },
        {
          id: "temperature",
          icon: "🌡️",
          label: "Suhu",
          fact: "Suhu lebih tinggi memberi lebih tenaga kepada molekul air permukaan untuk terlepas ke udara.",
        },
        {
          id: "surface-area",
          icon: "📐",
          label: "Luas permukaan",
          fact: "Luas permukaan terdedah yang lebih besar membolehkan lebih banyak molekul air terlepas serentak.",
        },
        {
          id: "air-movement",
          icon: "🌬️",
          label: "Pergerakan udara",
          fact: "Udara yang bergerak menyapu wap air daripada permukaan, membolehkan lebih banyak penyejatan berlaku.",
        },
      ],
      miniExperiment: {
        title: "🔬 Penyiasatan: faktor yang mempengaruhi kadar penyejatan air",
        aim: "Mengkaji faktor-faktor yang mempengaruhi kadar penyejatan air.",
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
            id: "humidity",
            icon: "💨",
            label: "Kelembapan udara",
            question: "Adakah kelembapan udara mempengaruhi kadar penyejatan air?",
            hypothesis: "Semakin tinggi kelembapan udara, semakin rendah kadar penyejatan air.",
            manipulated: "Kelembapan udara",
            responding: "Kadar penyejatan air",
            controlled:
              "Suhu persekitaran, isi padu air, pergerakan udara dan luas permukaan air yang terdedah",
            materials: "Kertas kobalt klorida kontang, air, benang dan kalsium klorida kontang",
            apparatus: "Serkup kaca dan bikar",
            method: [
              "Celupkan dua helai kertas kobalt klorida kontang ke dalam air sehingga keseluruhan kertas menjadi lembap.",
              "Gantungkan satu kertas di dalam serkup kaca bersama bikar kalsium klorida kontang, yang menyerap lembapan udara di sekelilingnya.",
              "Gantungkan kertas kedua di dalam serkup kaca tanpa kalsium klorida.",
              "Perhatikan dan rekodkan perubahan warna kedua-dua kertas kobalt klorida.",
            ],
            observation:
              "Kertas di dalam serkup berkalsium klorida bertukar biru lebih cepat, kerana udara di situ lebih kering.",
            conclusion:
              "Kelembapan udara yang lebih rendah menghasilkan kadar penyejatan yang lebih tinggi. Hipotesis diterima.",
          },
          {
            id: "temperature",
            icon: "🌡️",
            label: "Suhu persekitaran",
            question: "Adakah suhu persekitaran mempengaruhi kadar penyejatan air?",
            hypothesis: "Semakin tinggi suhu persekitaran, semakin tinggi kadar penyejatan air.",
            manipulated: "Suhu persekitaran",
            responding: "Kadar penyejatan air",
            controlled:
              "Kelembapan udara, isi padu air, pergerakan udara dan luas permukaan air yang terdedah",
            materials: "Kertas kobalt klorida kontang dan air",
            apparatus: "Lampu mentol berfilamen dan jubin putih",
            method: [
              "Labelkan dua helai kertas kobalt klorida kontang sebagai J dan K.",
              "Celupkan kedua-dua kertas ke dalam air sehingga keseluruhannya menjadi lembap.",
              "Letakkan kertas J di bawah lampu mentol berfilamen dan kertas K jauh daripada lampu.",
              "Perhatikan dan rekodkan perubahan warna kedua-dua kertas.",
            ],
            observation: "Kertas J di bawah lampu bertukar biru lebih cepat daripada kertas K.",
            conclusion:
              "Suhu persekitaran yang lebih tinggi menghasilkan kadar penyejatan yang lebih tinggi. Hipotesis diterima.",
          },
          {
            id: "surface-area",
            icon: "📐",
            label: "Luas permukaan",
            question: "Adakah luas permukaan air yang terdedah mempengaruhi kadar penyejatan air?",
            hypothesis:
              "Semakin besar luas permukaan air yang terdedah, semakin tinggi kadar penyejatan air.",
            manipulated: "Luas permukaan air yang terdedah",
            responding: "Kadar penyejatan air",
            controlled:
              "Kelembapan udara, isi padu air, pergerakan udara dan suhu persekitaran",
            materials: "Kertas turas, air dan benang",
            apparatus: "Kaki retort dan pengapit",
            method: [
              "Sediakan tiga helai kertas turas P, Q dan R, kemudian celupkan ketiga-tiganya ke dalam air.",
              "Biarkan kertas P terbuka, lipat kertas Q kepada dua bahagian dan kertas R kepada empat bahagian.",
              "Gantungkan ketiga-tiga kertas pada kaki retort yang berlainan.",
              "Rekodkan masa yang diambil oleh setiap kertas untuk kering.",
            ],
            observation:
              "Kertas P yang terbuka penuh kering paling cepat; kertas R yang dilipat empat kering paling lambat.",
            conclusion:
              "Luas permukaan terdedah yang lebih besar menghasilkan kadar penyejatan yang lebih tinggi. Hipotesis diterima.",
          },
          {
            id: "air-movement",
            icon: "🌬️",
            label: "Pergerakan udara",
            question: "Adakah pergerakan udara mempengaruhi kadar penyejatan air?",
            hypothesis: "Semakin laju pergerakan udara, semakin tinggi kadar penyejatan air.",
            manipulated: "Pergerakan udara",
            responding: "Kadar penyejatan air",
            controlled:
              "Kelembapan udara, isi padu air, luas permukaan air yang terdedah dan suhu persekitaran",
            materials: "Kertas kobalt klorida kontang, pita selofan dan air",
            apparatus: "Slaid kaca, kipas dan penitis",
            method: [
              "Lekatkan sehelai kertas kobalt klorida kontang pada setiap slaid kaca, dan labelkan slaid sebagai M dan N.",
              "Titiskan beberapa titik air pada setiap kertas kobalt klorida.",
              "Letakkan slaid M di bawah kipas dan slaid N jauh daripada kipas.",
              "Rekodkan pemerhatian anda selepas 15 minit.",
            ],
            observation: "Kertas pada slaid M di bawah kipas bertukar biru lebih cepat daripada slaid N.",
            conclusion:
              "Pergerakan udara yang lebih laju menghasilkan kadar penyejatan yang lebih tinggi. Hipotesis diterima.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah kita berasa sejuk sejurus selepas berpeluh?",
          hint: "Peluh yang menyejat daripada kulit menyerap haba daripada badan untuk berbuat demikian — kehilangan haba itulah yang menyebabkan rasa sejuk.",
        },
        {
          question:
            "Dalam penyiasatan luas permukaan, apakah pemboleh ubah yang dimanipulasikan dan yang bergerak balas?",
          hint: "Dimanipulasikan: luas permukaan air yang terdedah. Bergerak balas: kadar penyejatan air. Yang lain — kelembapan, isi padu air, pergerakan udara dan suhu — dimalarkan.",
        },
      ],
    },

    // ---------------------------------------------------------------- 5.2
    {
      number: "5.2",
      title: "Zat Terlarut, Pelarut dan Larutan",
      intro:
        "Apabila gula larut dalam air, gula ialah zat terlarut (bahan yang larut), air ialah pelarut (cecair yang melarutkan), dan air gula ialah larutan yang terbentuk bersama. Daripada tiga istilah ini datang satu lagi yang sering dikelirukan — keterlarutan.",
      cards: [
        {
          title: "Keterlarutan",
          body: "Keterlarutan suatu bahan ialah kuantiti maksimum zat terlarut yang dapat larut di dalam 100 ml pelarut pada suhu yang tertentu.",
          detail: "Ia adalah satu kuantiti — jawapan kepada soalan 'berapa banyak?', bukan 'berapa cepat?'.",
        },
      ],
      conceptContrast: {
        title: "⚖️ Dua istilah yang bunyinya hampir sama",
        instruction:
          "Kedua-duanya menggunakan perkataan 'keterlarutan', tetapi keduanya menjawab soalan yang berlainan sama sekali.",
        keyPoint:
          "Suhu, kadar kacauan dan saiz zat terlarut mengubah KADAR KETERLARUTAN — iaitu berapa cepat zat terlarut itu larut. Kacauan dan saiz zarah tidak mengubah kuantiti maksimum yang boleh larut.",
        left: {
          id: "solubility",
          icon: "⚖️",
          term: "Keterlarutan",
          question: "Berapa BANYAK boleh larut?",
          definition:
            "Kuantiti maksimum zat terlarut yang dapat larut di dalam 100 ml pelarut pada suhu yang tertentu.",
          examples: [
            "Diukur dalam gram bagi setiap 100 ml pelarut.",
            "Apabila had ini dicapai, larutan menjadi tepu.",
          ],
        },
        right: {
          id: "rate",
          icon: "⏱️",
          term: "Kadar keterlarutan",
          question: "Berapa CEPAT ia larut?",
          definition:
            "Berapa pantas zat terlarut itu larut di dalam pelarut — iaitu masa yang diambil, bukan kuantiti akhir.",
          examples: [
            "Dipengaruhi oleh suhu pelarut, kadar kacauan dan saiz zat terlarut.",
            "Gula halus dan gula kiub akhirnya larut sama banyak — cuma gula halus larut lebih cepat.",
          ],
        },
      },
      checks: [
        {
          question:
            "Aina mengacau gulanya dengan lebih pantas. Adakah lebih banyak gula akan larut, atau adakah ia hanya larut lebih cepat?",
          hint: "Hanya lebih cepat. Kacauan mengubah kadar keterlarutan sahaja — kuantiti maksimum yang boleh larut pada suhu itu tidak berubah.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Larutan Cair, Pekat dan Tepu",
      intro:
        "Tambah lebih banyak zat terlarut ke dalam pelarut yang sama, dan larutan itu melalui tiga peringkat — cair, kemudian pekat, kemudian tepu, di mana ia tidak boleh melarutkan lebih lagi dan lebihan zat terlarut membentuk mendakan.",
      cards: [
        {
          title: "Cair",
          body: "Sedikit zat terlarut setakat ini — larutan masih boleh melarutkan lebih banyak lagi.",
          detail: "Paling tidak pekat",
        },
        {
          title: "Pekat",
          body: "Banyak zat terlarut telah larut — larutan masih boleh melarutkan sedikit lagi.",
          detail: "Lebih pekat",
        },
        {
          title: "Tepu",
          body: "Zat terlarut berlebihan ditambah — tiada lagi yang larut, dan lebihannya membentuk mendakan di dasar.",
          detail: "Tidak boleh larutkan lebih",
        },
        {
          title: "Suhu boleh mengubah had itu sendiri",
          body: "Perhatikan bahawa keterlarutan sentiasa dinyatakan pada suhu yang tertentu. Sebabnya: apabila suhu berubah, kuantiti maksimum yang boleh larut turut berubah. Bagi kebanyakan zat terlarut pepejal seperti garam dan gula, lebih banyak dapat larut pada suhu yang lebih tinggi.",
          detail:
            "Itulah sebabnya larutan tepu yang dipanaskan boleh melarutkan lebih banyak zat terlarut lagi — ia tidak lagi tepu pada suhu yang baharu itu.",
        },
      ],
      checks: [
        {
          question:
            "Sebuah larutan tepu dipanaskan, kemudian lebih banyak garam ditambah dan garam itu larut. Adakah ini bercanggah dengan maksud 'tepu'?",
          hint: "Tidak. 'Tepu' hanya bermakna tepu pada suhu tertentu itu. Apabila suhu dinaikkan, keterlarutan garam meningkat, jadi larutan itu tidak lagi tepu dan boleh melarutkan lebih banyak lagi.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Larutan, Ampaian dan Koloid",
      intro:
        "Tidak semua campuran ialah larutan. Dua ujian mudah — menyinar lampu suluh menembusinya, dan menapisnya melalui kertas turas — sudah cukup untuk membezakan ketiga-tiga jenis campuran ini.",
      mixtureComparison: {
        title: "🔦 Uji dengan cahaya dan penurasan",
        instruction: "Tekan mana-mana campuran untuk membaca ciri penuhnya.",
        appearanceLabel: "Rupa",
        lightLabel: "Cahaya",
        filtrationLabel: "Penurasan",
        exampleLabel: "Contoh",
        hint: "Tekan Larutan, Ampaian atau Koloid.",
        kinds: [
          {
            id: "solution",
            name: "Larutan",
            lightPasses: "yes",
            appearance: "Jernih dan telus",
            filtration: "Tiada baki tertinggal",
            example: "Kuprum sulfat dalam air",
            note: "Zarah zat terlarut cukup kecil untuk tersebar sekata — campuran kelihatan jernih dan telus, cahaya boleh tembus, dan tiada baki tertinggal apabila ditapis.",
          },
          {
            id: "suspension",
            name: "Ampaian",
            lightPasses: "no",
            appearance: "Berkabus, mengenap dengan masa",
            filtration: "Baki tertinggal pada kertas turas",
            example: "Serbuk kapur dalam air",
            note: "Zarah zat terlarut terlalu besar untuk larut — campuran kelihatan berkabus, menghalang cahaya, mengenap dengan masa, dan meninggalkan baki apabila ditapis.",
          },
          {
            id: "colloid",
            name: "Koloid",
            lightPasses: "between",
            appearance: "Tidak jernih, tetapi tidak mengenap",
            filtration: "Tidak menghasilkan mendakan",
            example: "Susu dan mayonis (emulsi)",
            note: "Zarah berada di pertengahan — tersebar sekata tetapi tidak membentuk campuran yang jernih, dan juga tidak menghasilkan mendakan seperti ampaian. Kedudukannya adalah di antara larutan dan ampaian. Contoh lain: buih pencukur (busa).",
          },
        ],
      },
      checks: [
        {
          question: "Susu kelihatan sekata tetapi bukan larutan sebenar. Apakah ia sebenarnya?",
          hint: "Koloid — sejenis emulsi. Ia tidak terpisah seperti ampaian, tetapi bukan larutan jernih juga.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Kadar Keterlarutan",
      intro:
        "Kadar keterlarutan bermaksud berapa cepat zat terlarut itu larut. Tiga faktor mempengaruhinya — dan kesemuanya mempercepatkan proses melarut, bukan menambah kuantiti maksimum yang boleh larut.",
      flipCards: [
        {
          id: "sol-temp",
          icon: "🌡️",
          label: "Suhu",
          fact: "Zarah pelarut yang lebih panas bergerak lebih pantas, jadi zat terlarut larut lebih cepat.",
        },
        {
          id: "sol-stir",
          icon: "🥄",
          label: "Kadar kacauan",
          fact: "Kacauan yang lebih cepat menyatukan zarah zat terlarut dan pelarut dengan lebih pantas.",
        },
        {
          id: "sol-size",
          icon: "🔬",
          label: "Saiz zat terlarut",
          fact: "Zarah yang lebih kecil mendedahkan lebih banyak luas permukaan, jadi ia larut lebih cepat.",
        },
      ],
      miniExperiment: {
        title: "🔬 Penyiasatan: faktor yang mempengaruhi kadar keterlarutan",
        aim: "Mengkaji faktor-faktor yang mempengaruhi kadar keterlarutan.",
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
            id: "temp",
            icon: "🌡️",
            label: "Suhu pelarut",
            question: "Adakah suhu pelarut mempengaruhi kadar keterlarutan?",
            hypothesis: "Semakin tinggi suhu pelarut, semakin tinggi kadar keterlarutan.",
            manipulated: "Suhu pelarut",
            responding: "Kadar keterlarutan",
            controlled: "Isi padu pelarut, kadar kacauan dan saiz zat terlarut",
            materials: "Air suling dan garam biasa",
            apparatus:
              "Silinder penyukat, bikar, rod kaca, termometer, tungku kaki tiga, kasa dawai, penunu Bunsen dan spatula",
            method: [
              "Isi 100 ml air suling ke dalam bikar berlabel K dan L.",
              "Panaskan bikar L sehingga 50°C, kemudian tambahkan garam biasa ke dalam kedua-dua bikar.",
              "Kacau campuran di dalam bikar K dan L pada kadar yang sama sehingga garam larut sepenuhnya.",
              "Tentukan garam di dalam bikar mana yang larut dengan lebih cepat, dan catatkan pemerhatian anda.",
            ],
            observation: "Garam di dalam bikar L yang panas larut dengan lebih cepat.",
            conclusion:
              "Suhu pelarut yang lebih tinggi menghasilkan kadar keterlarutan yang lebih tinggi — garam larut lebih cepat. Hipotesis diterima.",
          },
          {
            id: "stir",
            icon: "🥄",
            label: "Kadar kacauan",
            question: "Adakah kadar kacauan mempengaruhi kadar keterlarutan?",
            hypothesis: "Semakin tinggi kadar kacauan, semakin tinggi kadar keterlarutan.",
            manipulated: "Kadar kacauan",
            responding: "Kadar keterlarutan",
            controlled: "Isi padu pelarut, suhu pelarut dan saiz zat terlarut",
            materials: "Air suling dan garam biasa",
            apparatus: "Bikar, rod kaca, silinder penyukat dan spatula",
            method: [
              "Isi 100 ml air suling ke dalam bikar berlabel K dan L, kemudian tambahkan jumlah garam biasa yang sama ke dalam kedua-duanya.",
              "Kacau campuran di dalam bikar K dengan perlahan, tetapi campuran di dalam bikar L dengan pantas.",
              "Tentukan garam di dalam bikar mana yang larut dengan lebih cepat.",
              "Catatkan pemerhatian anda.",
            ],
            observation: "Garam di dalam bikar L yang dikacau dengan pantas larut dengan lebih cepat.",
            conclusion:
              "Kadar kacauan yang lebih tinggi menghasilkan kadar keterlarutan yang lebih tinggi — garam larut lebih cepat. Kuantiti maksimum yang boleh larut tidak berubah. Hipotesis diterima.",
          },
          {
            id: "size",
            icon: "🔬",
            label: "Saiz zat terlarut",
            question: "Adakah saiz zat terlarut mempengaruhi kadar keterlarutan?",
            hypothesis: "Semakin kecil saiz zat terlarut, semakin tinggi kadar keterlarutan.",
            manipulated: "Saiz zat terlarut",
            responding: "Kadar keterlarutan",
            controlled: "Isi padu pelarut, suhu pelarut dan kadar kacauan",
            materials: "Air suling, gula halus dan gula kiub",
            apparatus: "Bikar, silinder penyukat, rod kaca dan spatula",
            method: [
              "Isi 100 ml air suling ke dalam bikar berlabel K dan L.",
              "Tambahkan gula halus ke dalam bikar K dan gula kiub berjisim sama ke dalam bikar L.",
              "Kacau campuran di dalam kedua-dua bikar pada kadar kacauan yang sama.",
              "Tentukan gula di dalam bikar mana yang larut dengan lebih cepat, dan catatkan pemerhatian anda.",
            ],
            observation: "Gula halus di dalam bikar K larut dengan lebih cepat daripada gula kiub.",
            conclusion:
              "Saiz zat terlarut yang lebih kecil mendedahkan lebih banyak luas permukaan kepada pelarut, jadi ia larut lebih cepat. Kuantiti maksimum yang boleh larut tidak berubah. Hipotesis diterima.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah air panas lebih baik untuk melarutkan kopi berbanding air sejuk?",
          hint: "Suhu yang lebih tinggi memberi lebih tenaga kepada zarah untuk bergerak dan bercampur lebih pantas — meningkatkan kadar keterlarutan.",
        },
        {
          question: "Mengapakah gula halus larut lebih cepat daripada kiub gula?",
          hint: "Semakin kecil saiz zat terlarut, semakin besar jumlah luas permukaan yang terdedah kepada zarah pelarut, jadi zat terlarut melarut dengan lebih cepat.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Pelarut Semesta dan Pelarut Bukan Air",
      intro:
        "Air dikenali sebagai pelarut semesta kerana keupayaannya melarutkan hampir semua bahan sama ada pepejal, cecair ataupun gas. Bagi bahan yang tidak larut dalam air, pelarut bukan air yang berasaskan karbon digunakan sebagai gantinya.",
      cards: [
        {
          title: "Air sebagai pelarut semesta",
          body: "Air digunakan sebagai pelarut secara domestik dan juga sebagai bahan mentah dalam industri pembuatan, pertanian dan perubatan — daripada baja yang larut dan diserap oleh akar tumbuhan, kepada detergen dalam proses pembersihan, hinggalah kepada penghasilan minuman ringan.",
        },
        {
          title: "Kendalikan dengan cermat",
          body: "Sifat pelarut bukan air yang mudah meruap menyebabkan pelarut ini digunakan secara meluas dalam penyediaan bahan semburan seperti cat, minyak wangi dan racun serangga. Pelarut bukan air perlu dikendalikan dengan cermat kerana ia membahayakan kesihatan manusia.",
        },
      ],
      tabs: [
        { title: "Alkohol", body: "Digunakan dalam penghasilan minyak wangi dan antiseptik." },
        { title: "Kerosin", body: "Digunakan sebagai minyak lampu." },
        { title: "Aseton", body: "Digunakan sebagai penanggal varnis kuku dan pelarut lakuer." },
        { title: "Turpentin", body: "Digunakan sebagai penanggal kotoran cat dan pencair cat." },
        { title: "Eter", body: "Digunakan sebagai pengekstrak minyak." },
      ],
      checks: [
        {
          question:
            "Warisan hendak menanggalkan kesan cat kering pada tangannya. Air tidak berkesan. Apakah yang patut digunakan, dan mengapa?",
          hint: "Pelarut bukan air seperti turpentin — cat tidak larut di dalam air, tetapi larut di dalam pelarut organik berasaskan karbon. Ia perlu dikendalikan dengan cermat kerana membahayakan kesihatan.",
        },
      ],
    },

    // ---------------------------------------------------------------- 5.3
    {
      number: "5.3",
      title: "Kaedah Pembersihan Air",
      intro:
        "Air meliputi dua pertiga permukaan Bumi, tetapi kebanyakannya mengandungi bendasing, mikroorganisma dan bahan terlarut yang menjadikannya tidak selamat terus daripada sumber. Pembersihan air membuang bau, rasa, warna, mikroorganisma dan bahan terlarut supaya ia boleh digunakan dengan selamat.",
      comparisonMatrix: {
        title: "🧪 Kaedah manakah melakukan apa?",
        instruction: "Tekan mana-mana kaedah untuk membaca penjelasan penuhnya.",
        columns: [
          "Membuang bendasing terampai?",
          "Membuang bahan terlarut?",
          "Membunuh mikroorganisma?",
          "Menghasilkan air tulen?",
        ],
        yesLabel: "Ya",
        noLabel: "Tidak",
        partialLabel: "Sebahagian",
        hint: "Tekan Pendidihan, Penurasan, Pengklorinan atau Penyulingan.",
        rows: [
          {
            id: "boiling",
            icon: "🔥",
            label: "Pendidihan",
            values: ["no", "no", "yes", "no"],
            note: "Membunuh mikroorganisma melalui haba, tetapi bendasing terampai dan bahan terlarut kekal di dalam air.",
          },
          {
            id: "filtration",
            icon: "🧻",
            label: "Penurasan",
            values: ["yes", "no", "no", "no"],
            note: "Mengasingkan bendasing terampai seperti daun dan enapan daripada cecair, tetapi tidak membunuh mikroorganisma dan tidak membuang bahan terlarut.",
          },
          {
            id: "chlorination",
            icon: "🧪",
            label: "Pengklorinan",
            values: ["no", "no", "yes", "no"],
            note: "Klorin ditambah untuk membunuh mikroorganisma di dalam bekalan air, tetapi bendasing terampai dan bahan terlarut kekal.",
          },
          {
            id: "distillation",
            icon: "♨️",
            label: "Penyulingan",
            values: ["yes", "yes", "yes", "yes"],
            note: "Menyingkirkan bendasing terampai DAN bahan terlarut, sambil turut membunuh mikroorganisma — kaedah paling menyeluruh, dan satu-satunya yang menghasilkan air tulen.",
          },
        ],
      },
      cards: [
        {
          title: "Apakah maksud penulenan?",
          body: "Penulenan bermaksud menghasilkan air tulen — air yang bebas daripada bendasing terampai, bahan terlarut dan mikroorganisma sekali gus. Ia adalah matlamat akhir, bukan satu langkah yang berasingan.",
          detail:
            "Lihat lajur terakhir di atas: daripada empat kaedah itu, hanya penyulingan mencapai penulenan. Pendidihan, penurasan dan pengklorinan membersihkan air, tetapi tidak menulenkannya.",
        },
      ],
      checks: [
        {
          question:
            "Kaedah pembersihan yang manakah membuang bahan terlarut DAN membunuh mikroorganisma?",
          hint: "Penyulingan — ia satu-satunya kaedah yang melakukan kedua-duanya sekali gus, dan satu-satunya yang menghasilkan air tulen.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Sistem Pembekalan Air",
      intro:
        "Air yang dikumpul daripada sumber seperti sungai dan air hujan disalurkan ke loji pembersihan air untuk dirawat sebelum dihantar kepada pengguna. Bakteria, alga dan bahan mineral adalah antara bahan yang disingkirkan dalam proses ini.",
      waterTreatmentFlow: {
        title: "🚰 Perjalanan air dari sungai ke paip",
        instruction: "Tekan mana-mana peringkat untuk melihat fungsinya. Urutannya penting.",
        chemicalLabel: "Bahan ditambah",
        hint: "Tekan mana-mana peringkat untuk membaca fungsinya.",
        stages: [
          {
            id: "reservoir",
            icon: "🏞️",
            name: "Takungan air",
            fn: "Air mentah dikumpul daripada sungai atau air hujan di takungan sebelum dirawat.",
          },
          {
            id: "screening",
            icon: "🪵",
            name: "Penapisan",
            fn: "Menyingkirkan bendasing besar seperti ranting kayu dan daun.",
          },
          {
            id: "oxidation",
            icon: "🫧",
            name: "Pengoksidaan",
            fn: "Menambahkan kandungan oksigen di dalam air untuk menyingkirkan bau dan rasa yang kurang menyenangkan.",
          },
          {
            id: "coagulation",
            icon: "🧷",
            name: "Penggumpalan",
            fn: "Zarah-zarah lumpur digumpalkan supaya bergumpal dan tenggelam, dan keasidan air dikurangkan.",
            chemical:
              "Alum — supaya zarah lumpur bergumpal; kapur mati (kalsium hidroksida) — untuk mengurangkan keasidan air",
          },
          {
            id: "sedimentation",
            icon: "⬇️",
            name: "Pengenapan",
            fn: "Bahan terampai yang telah bergumpal mendak di dasar tangki.",
          },
          {
            id: "filtration",
            icon: "🏖️",
            name: "Penurasan",
            fn: "Menyingkirkan baki bendasing dengan penapis pasir.",
          },
          {
            id: "chlorination",
            icon: "🧪",
            name: "Pengklorinan dan pemfluoridaan",
            fn: "Mikroorganisma di dalam air dibunuh, dan bahan untuk melindungi gigi ditambah.",
            chemical:
              "Klorin — untuk membunuh mikroorganisma; natrium fluorida — untuk mengelakkan pereputan gigi",
          },
          {
            id: "homes",
            icon: "🏠",
            name: "Ke rumah",
            fn: "Air bersih disimpan di dalam tangki air bersih, kemudian dipam melalui tangki simpanan terus kepada pengguna.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah dua bahan yang ditambah semasa peringkat penggumpalan, dan apakah tugas masing-masing?",
          hint: "Alum menggumpalkan zarah-zarah lumpur supaya ia tenggelam; kapur mati (kalsium hidroksida) mengurangkan keasidan air.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Bekalan Air Alternatif dan Kelestarian Air",
      intro:
        "Sesetengah negara yang mengalami kekurangan sumber air menggunakan cara alternatif untuk mendapatkan bekalan air. Pada masa yang sama, menjaga air yang sedia ada adalah tanggungjawab setiap individu.",
      methodCards: {
        title: "🌍 Tiga cara mendapatkan bekalan air",
        instruction:
          "Setiap kaedah menjawab tiga soalan yang sama, supaya anda boleh membandingkannya.",
        whatLabel: "Apakah ia?",
        howLabel: "Bagaimana ia berfungsi?",
        whenLabel: "Bila ia berguna?",
        cards: [
          {
            id: "reverse-osmosis",
            icon: "🌊",
            name: "Osmosis berbalik",
            what: "Kaedah mendapatkan air minuman daripada air laut dengan membuang garam terlarut.",
            how: "Air laut ditolak dengan tekanan melalui membran yang sangat halus. Membran itu membenarkan molekul air lalu tetapi menahan garam terlarut di sebelah sana.",
            when: "Sesuai untuk negara di tepi laut yang kekurangan air tawar tetapi mempunyai bekalan air laut yang tidak terhad.",
          },
          {
            id: "recycling",
            icon: "♻️",
            name: "Kitar semula air",
            what: "Kaedah merawat air kumbahan supaya ia selamat digunakan semula.",
            how: "Air kumbahan dirawat melalui beberapa peringkat pembersihan sehingga cukup bersih untuk diminum atau digunakan dalam industri. Singapura menggunakan teknologi ini dalam projek yang dikenali sebagai NEWater.",
            when: "Sesuai untuk negara atau bandar yang mempunyai sumber air semula jadi yang terhad tetapi menghasilkan banyak air kumbahan.",
          },
          {
            id: "fog",
            icon: "🌫️",
            name: "Mendapatkan air dari kabus",
            what: "Kaedah mengumpul titisan air daripada kabus di udara.",
            how: "Jaring besar dipasang di kawasan berkabus. Titisan air halus di dalam kabus melekat pada jaring, bergabung menjadi titisan besar, dan menitis ke dalam bekas di bawah.",
            when: "Sesuai untuk kawasan tinggi atau pantai yang kerap berkabus tetapi tidak mempunyai sungai atau hujan yang mencukupi.",
          },
        ],
      },
      cards: [
        {
          title: "Air yang selamat diminum",
          body: "Air yang selamat diminum mestilah bebas daripada mikroorganisma berbahaya, bahan kimia beracun dan bendasing. Itulah sebabnya air dirawat di loji sebelum sampai ke rumah.",
        },
        {
          title: "Apabila air tercemar: Teluk Minamata",
          body: "Di Teluk Minamata, Jepun, sisa yang mengandungi merkuri dilepaskan ke dalam air laut. Merkuri itu terkumpul di dalam ikan dan kerang, dan penduduk yang memakannya mengalami keracunan merkuri yang teruk — merosakkan sistem saraf dan menyebabkan kecacatan kekal.",
          detail:
            "Kesnya menunjukkan bahawa bahan beracun yang masuk ke dalam air tidak hilang begitu sahaja — ia berpindah melalui rantai makanan dan akhirnya sampai kepada manusia. Mencegah pencemaran jauh lebih mudah daripada membersihkannya kemudian.",
        },
        {
          title: "Audit air di rumah anda",
          body: "Audit air bermaksud merekodkan berapa banyak air digunakan di rumah atau sekolah, aktiviti demi aktiviti — mandi, membasuh, menyiram dan sebagainya.",
          detail:
            "Setelah anda tahu ke mana air itu pergi, anda boleh mengenal pasti pembaziran dan mencadangkan langkah penjimatan — membaiki paip bocor, menutup pili semasa memberus gigi, atau mengumpul air hujan untuk menyiram pokok.",
        },
      ],
      matcher: {
        title: "🌊 Padankan bahan pencemar dengan cara mengatasi",
        instruction: "Pilih bahan pencemar air, kemudian pilih cara ia diatasi.",
        pairs: [
          {
            id: "domestic",
            label: "🏠 Sisa domestik",
            match: "Naik taraf sistem pembetungan dan tingkatkan sanitasi luar bandar",
          },
          {
            id: "industrial",
            label: "🏭 Sisa perindustrian",
            match: "Kuatkuasakan undang-undang supaya sisa dirawat sebelum dilepaskan ke sungai",
          },
          {
            id: "agricultural",
            label: "🌾 Bahan kimia pertanian",
            match: "Didik petani menggunakan baja dan racun perosak terbiodegradasi",
          },
          {
            id: "oil",
            label: "🛢️ Tumpahan minyak",
            match: "Kandung tumpahan dengan pelan kontingensi negara dan tingkatkan pengawasan udara",
          },
        ],
      },
      checks: [
        {
          question:
            "Sebuah negara pulau kecil dikelilingi laut tetapi kehabisan air tawar. Kaedah manakah paling sesuai, dan mengapa?",
          hint: "Osmosis berbalik — air laut ditolak dengan tekanan melalui membran halus yang menahan garam terlarut, menghasilkan air tawar daripada sumber yang tidak terhad di sekelilingnya.",
        },
        {
          question: "Apakah yang boleh dipelajari daripada kejadian di Teluk Minamata?",
          hint: "Bahan beracun yang dilepaskan ke dalam air terkumpul di dalam hidupan air dan berpindah kepada manusia yang memakannya. Mencegah pencemaran adalah jauh lebih baik daripada cuba membersihkannya kemudian.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan sifat fizik air dan kesan bendasing terhadapnya.",
    "Saya boleh membezakan daya lekitan dan daya lekatan dalam tindakan kapilari.",
    "Saya boleh menerangkan elektrolisis air dan nisbah isi padu hidrogen kepada oksigen.",
    "Saya boleh menjalankan penyiasatan tentang faktor yang mempengaruhi kadar penyejatan air.",
    "Saya boleh menerangkan maksud keterlarutan dan membezakannya daripada kadar keterlarutan.",
    "Saya boleh membezakan larutan cair, pekat dan tepu.",
    "Saya boleh membezakan larutan, ampaian dan koloid dengan contoh.",
    "Saya boleh menjalankan penyiasatan tentang faktor yang mempengaruhi kadar keterlarutan.",
    "Saya boleh menerangkan kegunaan air sebagai pelarut semesta dan contoh pelarut bukan air.",
    "Saya boleh membandingkan kaedah pembersihan air dan menerangkan maksud penulenan.",
    "Saya boleh menerangkan setiap peringkat dalam sistem pembekalan air.",
    "Saya boleh mencadangkan cara alternatif mendapatkan bekalan air dan mewajarkan kelestarian air.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Susu ialah larutan sebenar kerana ia kelihatan sekata.",
      answer: false,
      explanation:
        "Susu ialah koloid (emulsi) — ia kelihatan sekata tetapi zarahnya tidak larut sepenuhnya mahupun mengenap seperti ampaian.",
    },
    {
      type: "true-false",
      question:
        "Betul atau salah: Mengacau larutan dengan lebih pantas menambah kuantiti maksimum gula yang boleh larut di dalamnya.",
      answer: false,
      explanation:
        "Kacauan hanya mempercepatkan proses melarut — ia mengubah kadar keterlarutan sahaja. Kuantiti maksimum yang boleh larut pada suhu itu tidak berubah.",
    },
    {
      type: "multiple-choice",
      question:
        "Kaedah pembersihan air yang manakah membuang bahan terlarut selain zarah terampai?",
      options: ["Pendidihan", "Penurasan", "Penyulingan", "Pengklorinan"],
      answerIndex: 2,
      explanation:
        "Penyulingan menyejat dan mengkondensasikan semula air, meninggalkan bahan terlarut dan zarah terampai di belakang.",
    },
    {
      type: "multiple-choice",
      question:
        "Dalam penyiasatan kesan kadar kacauan terhadap kadar keterlarutan, apakah pemboleh ubah yang bergerak balas?",
      options: ["Kadar kacauan", "Kadar keterlarutan", "Suhu pelarut", "Saiz zat terlarut"],
      answerIndex: 1,
      explanation:
        "Kadar kacauan ialah pemboleh ubah dimanipulasikan; yang diperhatikan dan diukur hasilnya — iaitu pemboleh ubah bergerak balas — ialah kadar keterlarutan.",
    },
  ],
};
