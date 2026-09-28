// Canonical BM notes audited against KSSM Sejarah Tingkatan 1, printed pp. 138–157.
// See source-audit.md. Content only; diagram geometry belongs to the renderer.
export interface PowerFactor {
  factor: string;
  description: string;
}

export interface Dynasty {
  name: string;
  duration: string;
  militaryStrength?: string[];
  facts: string[];
}

export interface ChineseDynasty {
  name: string;
  duration: string;
  founder: string;
  capital: string;
  facts: string[];
}

export interface EducationGoal {
  goal: string;
}

export interface EducationLevel {
  level: string;
  focus: string;
}

export const sej7Content = {
  hook: {
    title: "Peningkatan Tamadun India dan China",
    body: "Dalam Tamadun India, peningkatan tamadunnya ketara dalam aspek penyebaran kuasa dan agama. Dalam Tamadun China, peningkatan dalam bidang pendidikan telah menjadi warisan kekal tamadun tersebut.",
  },
  indiaOverview: {
    intro:
      "Tamadun India setanding dengan Tamadun Mesopotamia, Mesir dan China — mengalami peningkatan mengagumkan dalam pemerintahan, perluasan kuasa, ekonomi, kebudayaan, teknologi dan keagamaan.",
    locationShift:
      "Selepas Tamadun Indus berakhir, pusat tamadun beralih ke Lembah Ganges — tahap kedua dalam Tamadun India.",
    janapadaSystem:
      "Perkembangan di Lembah Ganges membawa kemunculan kerajaan kecil (janapada), yang kemudian membentuk kerajaan lebih besar (mahajanapada).",
    magadhaRise:
      "Magadha (timur laut India) muncul sebagai kuasa penting antara 540-490 SM, menguasai kerajaan lain berkat kedudukan strategik di Lembah Ganges yang mengawal laluan perdagangan Sungai Ganges — menjadi asas kepada Dinasti Nanda, Maurya dan Gupta.",
    development: ["Lembah Ganges", "Janapada", "Mahajanapada", "Magadha"],
  },
  powerExpansion: {
    definition:
      "Perluasan kuasa bermaksud usaha yang dilakukan oleh sesebuah kerajaan atau raja bagi menguasai dan memperluas pengaruh di sesebuah kawasan atau usaha untuk mengatasi pihak lain.",
    factors: [
      {
        factor: "Kekuatan Ketenteraan",
        description: "Pasukan tentera kuat untuk mempertahankan negara daripada serangan musuh",
      },
      {
        factor: "Dasar Pemerintahan",
        description: "Pemerintahan diketuai raja yang menentukan dasar perluasan kuasa",
      },
      {
        factor: "Sumber Manusia",
        description: "Sumber manusia cukup menjamin kerajaan ditadbir dengan baik",
      },
      {
        factor: "Diplomasi Keagamaan",
        description: "Aspek keagamaan dan kemanusiaan turut berperanan memperluas kuasa",
      },
      {
        factor: "Kewangan",
        description: "Pembiayaan secukupnya daripada perbendaharaan kerajaan",
      },
    ],
    forms: [
      {
        type: "Fizikal",
        description:
          "Menguasai wilayah lain secara ketenteraan; kerajaan yang kalah mengakui taklukan dan mematuhi peraturan yang menang; kekuatan ketenteraan dan disiplin pasukan tentera merupakan syarat yang paling penting.",
      },
      {
        type: "Keagamaan",
        description:
          "Tidak bergantung pada sempadan wilayah tetap, merentas sempadan melalui penyebaran agama dan kemanusiaan",
      },
    ],
  },
  indianDynasties: [
    {
      name: "Dinasti Nanda",
      duration: "345 SM – 321 SM",
      militaryStrength: ["20,000 kavalri", "200,000 infantri", "3,000 tentera bergajah"],
      facts: [
        "Empayar menganjur dari Bengal (timur) hingga Punjab (barat) serta Deccan",
        "Pataliputra (Patna hari ini) sebagai pusat pemerintahan",
      ],
    },
    {
      name: "Dinasti Maurya",
      duration: "322 SM – 185 SM",
      militaryStrength: [
        "9,000 tentera bergajah",
        "30,000 kavalri",
        "600,000 infantri (zaman Chandragupta Maurya)",
      ],
      facts: [
        "Chandragupta Maurya dan Asoka membentuk empayar dari Bengal hingga Hindu Kush",
        "Pusat pemerintahan di Pataliputra",
      ],
    },
    {
      name: "Dinasti Gupta",
      duration: "320 M – 550 M",
      facts: [
        "Chandragupta I (320-335 M) menggunakan ketenteraan untuk menguasai dari Punjab hingga Bengal",
        "Pataliputra kekal sebagai pusat pemerintahan",
      ],
    },
  ],
  asokaTransformation: {
    beforeKalinga:
      "Asoka meneruskan perluasan kuasa Maurya secara fizikal, menguasai kawasan yang belum ditakluki termasuk Kalinga",
    kalingaWar:
      "Kalinga berjaya dikuasai, tetapi 150,000 orang kehilangan harta benda dan 100,000 orang terbunuh",
    afterKalinga:
      "Kesedaran daripada kemusnahan Perang Kalinga mengubah pemerintahan Asoka menjadi lebih toleran dan bertanggungjawab — beliau menghentikan perluasan fizikal dan menumpukan kepada pengembangan agama Buddha",
    buddhistMission: [
      "Tibet, Nepal, Alexandria, Antioch, Bactria, Burma (misi umum)",
      "Sri Lanka (diketuai Mahendra)",
      "Asia Tenggara (diketuai Sona dan Uttara)",
    ],
    asokaPillar:
      "Peraturan dan undang-undang Asoka diukir pada tiang batu (Tiang Asoka) yang diletakkan di kawasan strategik",
  },
  guptaGoldenAge: {
    founder: "Chandragupta I",
    duration: "320 M – 335 M",
    religionFocus:
      "Penekanan kepada agama Hindu membolehkan zaman Gupta dikenali sebagai zaman keemasan agama Hindu. Pemerintah Gupta menekankan kebudayaan, kesusasteraan, seni bina, perdagangan dan pemerintahan yang berasaskan agama Hindu.",
    samudragupta:
      "Raja Samudragupta (335-376 M) meminati puisi keagamaan, digelar Kaviraja (raja penyair)",
    achievements: [
      "Penggunaan wang syiling emas ketika zaman Gupta menunjukkan kemewahan kerajaan tersebut.",
    ],
  },
  chinaOverview: {
    intro:
      "Tamadun China menunjukkan peningkatan mengagumkan dalam pemerintahan, ekonomi, teknologi, intelektual dan pendidikan — terutamanya semasa Dinasti Qin dan Dinasti Han.",
    location: "Masih berpusat di Lembah Sungai Huang He — kawasan subur dan strategik",
  },
  chineseDynasties: [
    {
      name: "Dinasti Qin",
      duration: "221 SM – 206 SM",
      founder: "Raja Zheng (bergelar Maharaja Shi Huangdi)",
      capital: "Xianyang",
      facts: [
        "Menyatukan China; wilayah dari Gurun Gobi (utara) hingga sempadan Vietnam (selatan)",
        "Menyeragamkan sistem tulisan",
        "Kestabilan politik pada zaman Maharaja Shi Huangdi membolehkan peningkatan dalam bidang ekonomi dan sosial.",
        "Menyeragamkan unit timbang dan sukat.",
      ],
    },
    {
      name: "Dinasti Han",
      duration: "206 SM – 220 M",
      founder: "Liu Bang (bergelar Maharaja Gaozu)",
      capital: "Chang'an (Han Awal, 206 SM-8 M); Loyang (Han Akhir, 25-220 M)",
      facts: [
        "Empayar meliputi utara China, sempadan Vietnam, utara Korea, dan Turkestan",
        "Maharaja Han Wu Di (140-87 SM) membuka Laluan Sutera",
      ],
    },
  ],
  silkRoad: {
    definition:
      "Laluan perdagangan daratan terpanjang di dunia, melibatkan China hingga Empayar Rom",
    significance:
      "Menunjukkan peningkatan dalam bidang perdagangan, pentadbiran dan sosial pada zaman Han Wu Di",
    route: ["Chang’an", "Dunhuang", "Kashgar", "Merv", "Damsyik", "Empayar Rom"],
  },
  education: {
    intro:
      "Pendidikan di China bermula sejak Dinasti Shang dan berkembang pada Dinasti Zhou — menjadi asas penting kemajuan Tamadun China.",
    confucius: {
      name: "Konfusius",
      lifespan: "551 SM – 479 SM",
      work: "Lun Yu (Analects)",
      legacy: "Ajaran Konfusianisme kekal sehingga hari ini",
    },
    qinEducation:
      "Menekankan pemahaman perundangan (diasaskan Han Fei Zi) — ketegasan undang-undang mengawal tingkah laku manusia; Shi Huangdi menyeragamkan sistem tulisan",
    hanEducation:
      "Diperkukuh melalui sekolah tinggi di Chang'an, menekankan Konfusianisme; sekolah sama ditubuhkan di peringkat daerah dan wilayah",
    paperInvention: {
      inventor: "Cai Lun",
      materials: "Campuran kulit pokok, serpihan rami kain, dan jaring",
      benefit: "Penggunaan kertas secara meluas telah meningkatkan pendidikan di sekolah.",
      steps: [
        "Mengumpulkan bahan kulit pokok, serpihan rami kain dan jaring ikan.",
        "Direndam di dalam air.",
        "Persiapan untuk merebus.",
        "Proses merebus.",
        "Mengumpulkan rebusan di dalam satu bekas.",
        "Dikacau hingga menjadi cecair yang pekat.",
        "Dihamparkan pada tikar.",
        "Dijemur pada panas matahari.",
        "Kertas yang sudah siap disusun.",
      ],
    },
    goals: [
      {
        goal: "Lulus peperiksaan perkhidmatan awam",
      },
      {
        goal: "Memupuk nilai moral dan etika",
      },
      {
        goal: "Mengekalkan ajaran Konfusianisme",
      },
      {
        goal: "Membezakan golongan elit dengan golongan rakyat",
      },
      {
        goal: "Memilih pegawai kerajaan",
      },
    ],
    levels: [
      {
        level: "Pendidikan Rendah",
        focus: "Menghafal tulisan serta buku suci tanpa perlu memahami maknanya",
      },
      {
        level: "Pendidikan Menengah",
        focus: "Menulis karangan dan sajak",
      },
      {
        level: "Pendidikan Tinggi",
        focus:
          "Menterjemah dan mentafsir buku suci serta pelajaran etika, upacara, adat istiadat dan tanggungjawab rakyat kepada raja dan negara",
      },
    ],
    examSystem: {
      introduced: "29 SM, zaman Maharaja Wu (Dinasti Han)",
      abolished: "1905",
      abolishedBy: "Maharani Dowager Cixi",
      intro:
        "Peperiksaan perkhidmatan awam merupakan komponen paling penting dalam sistem pendidikan dan kehidupan masyarakat China. Peperiksaan membolehkan seseorang menerima penghormatan dan meningkatkan taraf sosial ke arah kehidupan yang lebih baik.",
      characteristics: [
        "Peperiksaan yang sangat kompetitif.",
        "Hanya lelaki dibenarkan menduduki peperiksaan tanpa mengira latar belakang dan status sosial.",
        "Mengekalkan tradisi dan budaya China terutamanya ajaran Konfusianisme.",
        "Larangan terhadap sebarang bentuk perubahan bagi mengekalkan keaslian tradisi China.",
      ],
      sponsorship:
        "Lulus dalam peperiksaan merupakan matlamat utama pendidikan bagi seorang anak lelaki. Calon yang berpotensi menerima tajaan daripada penduduk kampung dengan harapan kejayaannya menaikkan nama keluarga, kaum dan kampung.",
      controls: [
        "Sistem yang sama dilaksanakan di seluruh empayar dan mereka yang didapati meniru akan dikenakan hukuman.",
        "Bagi mengelakkan penipuan, calon akan dikurung sebelum peperiksaan berlangsung.",
        "Hanya mereka yang lulus dengan cemerlang akan diserapkan ke dalam sistem perkhidmatan kerajaan.",
      ],
      syllabus:
        "Peperiksaan berkisar pada kandungan Empat Buku (The Four Books) dan Lima Kitab (The Five Classics) yang dikenali sebagai Sembilan Buku Suci.",
      books: [
        {
          group: "Empat Buku (The Four Books)",
          titles: [
            "The Analects of Confucius",
            "The Mencius",
            "The Great Learning",
            "The Doctrine of the Mean",
          ],
        },
        {
          group: "Lima Kitab (The Five Classics)",
          titles: [
            "The Book of Songs",
            "The Book of History",
            "The Book of Rites",
            "The Book of Changes",
            "The Spring and Autumn Annals",
          ],
        },
      ],
      stages: [
        {
          name: "Xiucai",
          level: "Tahap pertama",
          location: "Peringkat daerah",
          eligibility: "Terbuka kepada semua orang.",
          frequency: "Dua kali setiap tiga tahun",
          duration: "Sehari",
          candidates: "500–2,000 orang",
          passRatio: "1:35",
          rewards: [
            "Butang keemasan dilekatkan pada topi.",
            "Diterima sebagai kakitangan kerajaan peringkat rendah.",
            "Menyertai Majlis Santapan Diraja.",
          ],
        },
        {
          name: "Juren",
          level: "Tahap kedua",
          location: "Ibu kota daerah",
          eligibility: "Hanya terbuka kepada calon yang telah lulus tahap pertama.",
          frequency: "Tiga tahun sekali",
          duration: "Tiga hari",
          candidates: "4,800–10,000 orang",
          passRatio: "1:120",
          rewards: [
            "Memperoleh butang keemasan dan jawatan dalam kerajaan.",
            "Tanda nama diletakkan di pintu masuk rumah.",
            "Mempunyai kakitangan pengiring.",
          ],
        },
        {
          name: "Jinshi",
          level: "Tahap ketiga",
          location: "Ibu kota kerajaan",
          frequency: "Tiga tahun sekali",
          duration: "13 hari",
          rewards: [
            "Mendapat kedudukan dan pangkat tinggi dalam kerajaan.",
            "Keistimewaan untuk dirinya, keluarga dan kampung.",
          ],
        },
      ],
      legacy:
        "Sistem peperiksaan untuk memilih kakitangan kerajaan menjadi contoh kepada negara-negara di dunia dan diamalkan hingga hari ini.",
    },
    chronology: ["Dinasti Shang", "Dinasti Zhou", "Dinasti Qin", "Dinasti Han"],
    skills:
      "Kemahiran kendiri diukur berdasarkan kemampuan menghafal, memahami, menulis dan menterjemah.",
    socialHierarchy: ["Golongan terpelajar", "Petani", "Artisan", "Pedagang"],
    socialImportance:
      "Melalui pendidikan, negara boleh ditadbir dengan cekap dan berkesan. Seseorang yang terpelajar berada pada hierarki teratas dalam masyarakat di China.",
    scholars: [
      {
        name: "Dong Zhongshu",
        lifespan: "179–104 SM",
        contribution: "Sarjana Konfusius terkemuka.",
      },
      {
        name: "Sima Qian",
        lifespan: "145–86 SM",
        contribution:
          "Sejarawan China pertama yang menulis Shiji. Karya ini mengisahkan sejarah China hingga tahun 90 SM.",
      },
    ],
  },
  keyExamFacts: [
    "Tamadun India: pusat beralih dari Lembah Indus ke Lembah Ganges (janapada → mahajanapada)",
    "Magadha muncul sebagai kuasa penting (540-490 SM), asas kepada Dinasti Nanda, Maurya, Gupta",
    "2 bentuk perluasan kuasa: fizikal dan keagamaan",
    "Dinasti Nanda (345-321 SM), Maurya (322-185 SM), Gupta (320-550 M) — semua berpusat di Pataliputra",
    "Selepas Perang Kalinga, Asoka beralih daripada perluasan fizikal kepada penyebaran agama Buddha",
    "Zaman Gupta dikenali sebagai zaman keemasan agama Hindu; Samudragupta digelar Kaviraja",
    "Dinasti Qin (221-206 SM) disatukan oleh Shi Huangdi; Dinasti Han (206 SM-220 M) diasaskan Liu Bang (Gaozu)",
    "Laluan Sutera dibuka pada zaman Han Wu Di (140-87 SM) — laluan perdagangan daratan terpanjang di dunia",
    "Konfusius (551-479 SM) menulis Lun Yu (Analects); ajaran Konfusianisme kekal hingga kini",
    "Cai Lun mencipta kertas daripada kulit pokok, serpihan rami kain dan jaring",
    "Sistem peperiksaan awam China diperkenalkan 29 SM, dimansuhkan 1905 oleh Maharani Dowager Cixi",
    "Xiucai: peringkat daerah, dua kali setiap tiga tahun, sehari, 500–2,000 calon, kadar kelulusan 1:35.",
    "Juren: ibu kota daerah, tiga tahun sekali, tiga hari, 4,800–10,000 calon, kadar kelulusan 1:120.",
    "Jinshi: ibu kota kerajaan, tiga tahun sekali, 13 hari.",
    "Calon dikurung sebelum peperiksaan; mereka yang meniru dikenakan hukuman.",
    "Empat Buku dan Lima Kitab dikenali sebagai Sembilan Buku Suci.",
    "Dong Zhongshu ialah sarjana Konfusius; Sima Qian menulis Shiji tentang sejarah China hingga 90 SM.",
  ],
  keyTerms: [
    "Janapada",
    "Mahajanapada",
    "Dinasti Nanda",
    "Dinasti Maurya",
    "Dinasti Gupta",
    "Tiang Asoka",
    "Kaviraja",
    "Dinasti Qin",
    "Dinasti Han",
    "Shi Huangdi",
    "Laluan Sutera",
    "Konfusianisme",
    "Lun Yu",
    "Peperiksaan perkhidmatan awam",
    "Infantri",
    "Kavalri",
    "Magadha",
    "Xiucai",
    "Juren",
    "Jinshi",
    "Han Fei Zi",
    "Dong Zhongshu",
    "Sima Qian",
    "Shiji",
    "Cai Lun",
  ],
  chapterSummary:
    "Bab 7 mengkaji peningkatan Tamadun India (perluasan kuasa fizikal dan keagamaan melalui Dinasti Nanda, Maurya dan Gupta, termasuk transformasi Asoka selepas Perang Kalinga dan zaman keemasan Hindu Gupta) dan Tamadun China (Dinasti Qin dan Han, Laluan Sutera, dan sistem pendidikan lengkap dengan Konfusianisme dan peperiksaan perkhidmatan awam yang kekal sehingga 1905). Tiga tahap peperiksaan ialah Xiucai, Juren dan Jinshi, dengan keistimewaan mengikut tahap kelulusan. Dong Zhongshu dan Sima Qian menunjukkan perkembangan kesarjanaan; pembuatan kertas oleh Cai Lun meningkatkan pendidikan.",
  values: [
    "Kekuatan kepimpinan dalam Tamadun India dan Tamadun China boleh menjadi panduan kepada pemerintah untuk membina negara.",
    "Idea-idea kenegaraan pemimpin Tamadun India dan Tamadun China boleh menjadi inspirasi kepada pemimpin muda kini.",
    "Kerjasama dan pematuhan kepada undang-undang boleh meningkatkan kemajuan kehidupan masyarakat.",
    "Keamanan amat penting dalam menjamin keselamatan dan kesejahteraan negara.",
    "Kualiti pendidikan yang tinggi penting untuk pembinaan sesebuah negara bangsa.",
  ],
  officialSubtopics: [
    {
      number: "7.1",
      title: "Tamadun India",
      start: 0,
    },
    {
      number: "7.2",
      title: "Tamadun China",
      start: 5,
    },
  ],
  learningSections: [
    "Lokasi dan Perkembangannya",
    "Perluasan Kuasa dalam Tamadun India",
    "Perluasan Fizikal",
    "Perluasan Keagamaan",
    "Pencapaian Tamadun India",
    "Lokasi dan Perkembangannya",
    "Perkembangan Pendidikan dalam Tamadun China",
    "Rumusan Bab",
    "Peperiksaan Perkhidmatan Awam",
    "Proses Membuat Kertas",
  ],
  indianAchievements: [
    "Buku Arthasastra oleh Kautilya (sistem pemerintahan dan ketenteraan zaman Maurya)",
    "Lukisan gua di Ajanta dan Ellora",
    "Kepesatan perdagangan melalui laluan daratan dan maritim",
  ],
  glossary: [
    {
      term: "Dinasti",
      meaning: "Pemerintahan raja yang berasal daripada satu keturunan.",
    },
    {
      term: "Empayar",
      meaning: "Wilayah yang luas yang berada di bawah satu pemerintahan.",
    },
    {
      term: "Infantri",
      meaning: "Tentera berjalan kaki.",
    },
    {
      term: "Kavalri",
      meaning: "Tentera berkuda.",
    },
    {
      term: "Zaman keemasan",
      meaning:
        "Pencapaian atau kemajuan besar dan tertinggi dalam bidang tertentu yang dicapai oleh sesebuah pemerintahan.",
    },
  ],
  activities: [
    {
      title: "Aktiviti",
      page: 145,
      tasks: [
        "Lakarkan peta minda yang menunjukkan cara pemerintah Tamadun India mengukuhkan tamadun mereka.",
        "Hasilkan poster tentang fungsi Tiang Asoka dan tujuan Tiang Asoka diletakkan di kawasan tumpuan ramai.",
      ],
    },
    {
      title: "Aktiviti",
      page: 150,
      tasks: [
        "Maharani Dowager Cixi memerintah China dari tahun 1861 hingga tahun 1908. Buat tugasan berkumpulan tentang biografi beliau menggunakan sumber yang bersesuaian.",
        "Bahaskan pendidikan sebagai elemen penting untuk membangunkan sesebuah negara.",
        "Hubung kaitkan pendidikan dengan pembentukan sahsiah diri.",
      ],
    },
    {
      title: "Kajian Kes",
      page: 152,
      tasks: [
        "Kumpulkan bahan daripada Internet atau perpustakaan, hasilkan folio secara berkumpulan tentang sejarawan pertama China, Si Ma Qian.",
      ],
    },
  ],
  practice: [
    {
      question: "Antara faktor kejayaan perluasan kuasa dalam Tamadun India termasuklah",
      context: [
        "I. Dasar pembangunan negara",
        "II. Ketahanan binaan tembok",
        "III. Kekuatan tentera",
        "IV. Dasar pemerintahan",
      ],
      options: ["I dan II", "II dan III", "III dan IV", "I dan IV"],
    },
    {
      question:
        "Apakah peristiwa yang mengubah dasar pemerintahan Asoka daripada perluasan secara ketenteraan kepada penyebaran agama?",
      options: [
        "Perang Kalinga",
        "Pembinaan kubu Pataliputra",
        "Penguasaan laluan utara dan selatan India",
        "Peruntukan kewangan kepada Maharaja Nanda",
      ],
    },
    {
      question: "Senarai ini merujuk kepada sumbangan siapa?",
      context: [
        "Menyatukan China",
        "Menyeragamkan unit timbang dan sukat",
        "Menyeragamkan sistem tulisan",
      ],
      options: ["Cai Lun", "Han Fei Zi", "Konfusius", "Maharaja Shi Huangdi"],
    },
    {
      question: "Bagaimanakah masyarakat di China membenarkan peningkatan taraf sosial?",
      options: [
        "Lulus peperiksaan",
        "Menyertai peperangan",
        "Mengisytiharkan diri sebagai pembesar",
        "Memperkenalkan ajaran baharu",
      ],
    },
    {
      question: "Mengapakah penaklukan Kalinga telah memberikan kesan kepada pemerintahan Asoka?",
    },
    {
      question: "Sejauh manakah faktor keagamaan membantu perluasan kuasa dalam Tamadun India?",
    },
    {
      question:
        "Nyatakan matlamat pendidikan dalam Tamadun China. Pada pandangan anda, mengapakah sistem peperiksaan perkhidmatan awam di China dikawal dengan ketat?",
    },
    {
      question:
        "Hasilkan brosur berkumpulan tentang sistem pendidikan di negara kita: latar belakang/sejarah, sistem pendidikan kini, matlamat, cabaran dan harapan anda.",
    },
  ],
};

export type Sej7Content = typeof sej7Content;
