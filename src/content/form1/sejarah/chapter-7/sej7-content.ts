// sej7-content.ts
// Source-verified content for Sejarah Form 1, Bab 7 — Peningkatan Tamadun India dan China
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 138-149)
// Content data only — no presentation markup.

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

export interface Sej7Content {
  hook: { title: string; body: string };
  indiaOverview: {
    intro: string;
    locationShift: string;
    janapadaSystem: string;
    magadhaRise: string;
  };
  powerExpansion: {
    definition: string;
    factors: PowerFactor[];
    forms: { type: string; description: string }[];
  };
  indianDynasties: Dynasty[];
  asokaTransformation: {
    beforeKalinga: string;
    kalingaWar: string;
    afterKalinga: string;
    buddhistMission: string[];
    asokaPillar: string;
  };
  guptaGoldenAge: {
    founder: string;
    duration: string;
    religionFocus: string;
    samudragupta: string;
    achievements: string[];
  };
  chinaOverview: {
    intro: string;
    location: string;
  };
  chineseDynasties: ChineseDynasty[];
  silkRoad: {
    definition: string;
    significance: string;
  };
  education: {
    intro: string;
    confucius: { lifespan: string; work: string; legacy: string };
    qinEducation: string;
    hanEducation: string;
    paperInvention: { inventor: string; materials: string };
    goals: EducationGoal[];
    levels: EducationLevel[];
    examSystem: { introduced: string; abolished: string; abolishedBy: string };
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej7Content: Sej7Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sistem peperiksaan awam yang menentukan kedudukan sosial seseorang — sesuatu yang terdengar sangat moden — sebenarnya bermula di China lebih 2,000 tahun lalu dan kekal sehingga 1905. Bab ini menunjukkan bagaimana India dan China mencapai peningkatan luar biasa dalam pemerintahan, ketenteraan, dan pendidikan.",
  },
  indiaOverview: {
    intro: "Tamadun India setanding dengan Tamadun Mesopotamia, Mesir dan China — mengalami peningkatan mengagumkan dalam pemerintahan, perluasan kuasa, ekonomi, kebudayaan, teknologi dan keagamaan.",
    locationShift: "Selepas Tamadun Indus berakhir, pusat tamadun beralih ke Lembah Ganges — tahap kedua dalam Tamadun India.",
    janapadaSystem: "Perkembangan di Lembah Ganges membawa kemunculan kerajaan kecil (janapada), yang kemudian membentuk kerajaan lebih besar (mahajanapada).",
    magadhaRise: "Magadha (timur laut India) muncul sebagai kuasa penting antara 540-490 SM, menguasai kerajaan lain berkat kedudukan strategik di Lembah Ganges yang mengawal laluan perdagangan Sungai Ganges — menjadi asas kepada Dinasti Nanda, Maurya dan Gupta.",
  },
  powerExpansion: {
    definition: "Perluasan kuasa bermaksud usaha sesebuah kerajaan atau raja untuk menguasai dan memperluas pengaruh di sesebuah kawasan.",
    factors: [
      { factor: "Kekuatan Ketenteraan", description: "Pasukan tentera kuat untuk mempertahankan negara daripada serangan musuh" },
      { factor: "Dasar Pemerintahan", description: "Pemerintahan diketuai raja yang menentukan dasar perluasan kuasa" },
      { factor: "Sumber Manusia", description: "Sumber manusia cukup menjamin kerajaan ditadbir dengan baik" },
      { factor: "Diplomasi Keagamaan", description: "Aspek keagamaan dan kemanusiaan turut berperanan memperluas kuasa" },
      { factor: "Kewangan", description: "Pembiayaan secukupnya daripada perbendaharaan kerajaan" },
    ],
    forms: [
      { type: "Fizikal", description: "Menguasai wilayah lain secara ketenteraan; kerajaan yang kalah mengakui taklukan dan mematuhi peraturan yang menang" },
      { type: "Keagamaan", description: "Tidak bergantung pada sempadan wilayah tetap, merentas sempadan melalui penyebaran agama dan kemanusiaan" },
    ],
  },
  indianDynasties: [
    { name: "Dinasti Nanda", duration: "345 SM – 321 SM", militaryStrength: ["20,000 kavalri", "200,000 infantri", "3,000 tentera bergajah"], facts: ["Empayar menganjur dari Bengal (timur) hingga Punjab (barat) serta Deccan", "Pataliputra (Patna hari ini) sebagai pusat pemerintahan"] },
    { name: "Dinasti Maurya", duration: "322 SM – 185 SM", militaryStrength: ["9,000 tentera bergajah", "30,000 kavalri", "600,000 infantri (zaman Chandragupta Maurya)"], facts: ["Chandragupta Maurya dan Asoka membentuk empayar dari Bengal hingga Hindu Kush", "Pusat pemerintahan di Pataliputra"] },
    { name: "Dinasti Gupta", duration: "320 M – 550 M", facts: ["Chandragupta I (320-335 M) menggunakan ketenteraan untuk menguasai dari Punjab hingga Bengal", "Pataliputra kekal sebagai pusat pemerintahan"] },
  ],
  asokaTransformation: {
    beforeKalinga: "Asoka meneruskan perluasan kuasa Maurya secara fizikal, menguasai kawasan yang belum ditakluki termasuk Kalinga",
    kalingaWar: "Kalinga berjaya dikuasai, tetapi 150,000 orang kehilangan harta benda dan 100,000 orang terbunuh",
    afterKalinga: "Kesedaran daripada kemusnahan Perang Kalinga mengubah pemerintahan Asoka menjadi lebih toleran dan bertanggungjawab — beliau menghentikan perluasan fizikal dan menumpukan kepada pengembangan agama Buddha",
    buddhistMission: ["Tibet, Nepal, Alexandria, Antioch, Bactria, Burma (misi umum)", "Sri Lanka (diketuai Mahendra)", "Asia Tenggara (diketuai Sona dan Uttara)"],
    asokaPillar: "Peraturan dan undang-undang Asoka diukir pada tiang batu (Tiang Asoka) yang diletakkan di kawasan strategik",
  },
  guptaGoldenAge: {
    founder: "Chandragupta I",
    duration: "320 M – 335 M",
    religionFocus: "Penekanan kepada agama Hindu, membolehkan zaman Gupta dikenali sebagai zaman keemasan agama Hindu",
    samudragupta: "Raja Samudragupta (335-376 M) meminati puisi keagamaan, digelar Kaviraja (raja penyair)",
    achievements: ["Buku Arthasastra oleh Kautilya (sistem pemerintahan dan ketenteraan zaman Maurya)", "Lukisan gua di Ajanta dan Ellora", "Kepesatan perdagangan melalui laluan daratan dan maritim"],
  },
  chinaOverview: {
    intro: "Tamadun China menunjukkan peningkatan mengagumkan dalam pemerintahan, ekonomi, teknologi, intelektual dan pendidikan — terutamanya semasa Dinasti Qin dan Dinasti Han.",
    location: "Masih berpusat di Lembah Sungai Huang He — kawasan subur dan strategik",
  },
  chineseDynasties: [
    { name: "Dinasti Qin", duration: "221 SM – 206 SM", founder: "Raja Zheng (bergelar Maharaja Shi Huangdi)", capital: "Xianyang", facts: ["Menyatukan China; wilayah dari Gurun Gobi (utara) hingga sempadan Vietnam (selatan)", "Menyeragamkan sistem tulisan"] },
    { name: "Dinasti Han", duration: "206 SM – 220 M", founder: "Liu Bang (bergelar Maharaja Gaozu)", capital: "Chang'an (Han Awal, 206 SM-8 M); Loyang (Han Akhir, 25-220 M)", facts: ["Empayar meliputi utara China, sempadan Vietnam, utara Korea, dan Turkestan", "Maharaja Han Wu Di (140-87 SM) membuka Laluan Sutera"] },
  ],
  silkRoad: {
    definition: "Laluan perdagangan daratan terpanjang di dunia, melibatkan China hingga Empayar Rom",
    significance: "Menunjukkan peningkatan dalam bidang perdagangan, pentadbiran dan sosial pada zaman Han Wu Di",
  },
  education: {
    intro: "Pendidikan di China bermula sejak Dinasti Shang dan berkembang pada Dinasti Zhou — menjadi asas penting kemajuan Tamadun China.",
    confucius: { lifespan: "551 SM – 479 SM", work: "Lun Yu (Analects)", legacy: "Ajaran Konfusianisme kekal sehingga hari ini" },
    qinEducation: "Menekankan pemahaman perundangan (diasaskan Han Fei Zi) — ketegasan undang-undang mengawal tingkah laku manusia; Shi Huangdi menyeragamkan sistem tulisan",
    hanEducation: "Diperkukuh melalui sekolah tinggi di Chang'an, menekankan Konfusianisme; sekolah sama ditubuhkan di peringkat daerah dan wilayah",
    paperInvention: { inventor: "Cai Lun", materials: "Campuran kulit pokok, serpihan rami kain, dan jaring" },
    goals: [
      { goal: "Lulus peperiksaan perkhidmatan awam" },
      { goal: "Memupuk nilai moral dan etika" },
      { goal: "Mengekalkan ajaran Konfusianisme" },
      { goal: "Membezakan golongan elit dengan golongan rakyat" },
      { goal: "Memilih pegawai kerajaan" },
    ],
    levels: [
      { level: "Pendidikan Rendah", focus: "Menghafal tulisan serta buku suci tanpa perlu memahami maknanya" },
      { level: "Pendidikan Menengah", focus: "Menulis karangan dan sajak" },
      { level: "Pendidikan Tinggi", focus: "Menterjemah dan mentafsir buku suci serta pelajaran etika, upacara, adat istiadat dan tanggungjawab rakyat kepada raja dan negara" },
    ],
    examSystem: { introduced: "29 SM, zaman Maharaja Wu (Dinasti Han)", abolished: "1905", abolishedBy: "Maharani Dowager Cixi" },
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
    "Confucius (551-479 SM) menulis Lun Yu (Analects); ajaran Konfusianisme kekal hingga kini",
    "Cai Lun mencipta kertas daripada kulit pokok, serpihan rami kain dan jaring",
    "Sistem peperiksaan awam China diperkenalkan 29 SM, dimansuhkan 1905 oleh Maharani Dowager Cixi",
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
  ],
  chapterSummary:
    "Bab 7 mengkaji peningkatan Tamadun India (perluasan kuasa fizikal dan keagamaan melalui Dinasti Nanda, Maurya dan Gupta, termasuk transformasi Asoka selepas Perang Kalinga dan zaman keemasan Hindu Gupta) dan Tamadun China (Dinasti Qin dan Han, Laluan Sutera, dan sistem pendidikan lengkap dengan Konfusianisme dan peperiksaan perkhidmatan awam yang kekal sehingga 1905).",
};
