// sej-chapter6-content.ts
// Source-verified content for Sejarah Form 1, Bab 6 — Peningkatan Tamadun Yunani dan Rom
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 116-131)
// Content data only — no presentation markup.

export interface Polis {
  name: string;
  population: string;
  area: string;
  note?: string;
}

export interface GovernmentSystem {
  name: string;
  definition: string;
}

export interface AthensLeader {
  name: string;
  role: string;
  dateOrDuration: string;
}

export interface RomanEra {
  name: string;
  duration: string;
  notes?: string;
}

export interface RomanBuilding {
  name: string;
  description: string;
  specs: string[];
  builtBy?: string;
}

export interface Sej6Content {
  hook: { title: string; body: string };
  greekOverview: {
    duration: string;
    significance: string;
    location: string;
    climateEffect: string;
  };
  polisConcept: {
    definition: string;
    acropolis: string;
    agora: string;
    famousPolis: Polis[];
  };
  governmentSystems: GovernmentSystem[];
  athensDemocracy: {
    intro: string;
    founder: string;
    founderDate: string;
    type: string;
    leaders: AthensLeader[];
    endDate: string;
    structure: string[];
    assemblyFunctions: string[];
    membershipRules: string[];
  };
  romanOverview: {
    relationToGreek: string;
    rivals: string[];
    location: string;
    eras: RomanEra[];
    goldenAge: string;
    socialClasses: { name: string; composition: string }[];
  };
  architecture: {
    intro: string;
    keyFigure: { name: string; work: string; year: string };
    supporters: string[];
    features: string[];
    buildings: RomanBuilding[];
    cementFact: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej6Content: Sej6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap kali kita mengundi wakil rakyat, kita mengamalkan sistem yang dicipta oleh Athens 2,500 tahun lalu. Setiap kali kita melihat bangunan berkubah, kita melihat warisan kejuruteraan Rom. Bab ini menunjukkan bagaimana dua tamadun purba membentuk cara dunia moden diperintah dan dibina."
  },
  greekOverview: {
    duration: "Berkembang antara 1,000 SM hingga 800 SM",
    significance: "Pencetus kepada perkembangan tamadun Eropah — memberi inspirasi melalui demokrasi, ekonomi, sains dan teknologi, kesusasteraan, falsafah dan pendidikan",
    location: "Semenanjung Greece dan pulau-pulau di Laut Aegean serta Laut Mediterranean",
    climateEffect: "Cuaca sederhana membolehkan kegiatan luar rumah (perdebatan, sukan); kedudukan berhampiran laut menjadikan orang Yunani pelayar handal"
  },
  polisConcept: {
    definition: "Polis (negara-kota) ialah gabungan tiga komponen: bandar utama, bandar kecil dan kawasan kampung. Polis menjadi ibu kota dan pusat tumpuan masyarakat.",
    acropolis: "Pusat komuniti yang dilindungi kubu — lokasi paling strategik dari segi keselamatan, pentadbiran dan komunikasi; dilengkapi rumah ibadat, bangunan kerajaan, istana dan rumah golongan bangsawan",
    agora: "Kawasan lapang digunakan sebagai tempat pertemuan dan pasar awam",
    famousPolis: [
      { name: "Athens", population: "40,000 orang", area: "2,650 km²", note: "Negara-kota paling ramai penduduk" },
      { name: "Sparta", population: "16,000 orang", area: "8,400 km²", note: "Negara-kota paling luas" },
      { name: "Corinth", population: "10,000 orang", area: "880 km²" }
    ]
  },
  governmentSystems: [
    { name: "Monarki", definition: "Sistem beraja berasaskan keturunan; raja dibantu Konsul (golongan bijak pandai)" },
    { name: "Oligarki", definition: "Pemerintahan dikuasai oleh sebahagian kecil golongan yang berkuasa" },
    { name: "Aristokrasi", definition: "Pemerintahan dikuasai oleh golongan bangsawan" },
    { name: "Tirani", definition: "Pemerintahan dikuasai oleh golongan yang zalim dan menindas rakyat" },
    { name: "Demokrasi", definition: "Pemerintahan yang dipilih oleh rakyat melalui pengundian" }
  ],
  athensDemocracy: {
    intro: "Perkembangan sistem demokrasi di Athens memperlihatkan kematangan politik penduduknya. Sebelum demokrasi, Athens melalui sistem monarki, oligarki, aristokrasi dan tirani.",
    founder: "Solon",
    founderDate: "594 SM",
    type: "Demokrasi langsung — setiap warganegara Athens terlibat secara langsung dalam perbincangan dan perdebatan menentukan dasar ekonomi, sosial dan politik",
    leaders: [
      { name: "Solon", role: "Pengasas sistem demokrasi Athens", dateOrDuration: "594 SM" },
      { name: "Pericles", role: "Memantapkan kuasa rakyat dalam sistem demokrasi", dateOrDuration: "495-429 SM" }
    ],
    endDate: "Demokrasi menjadi lemah dan terhapus pada zaman Raja Philip yang menguasai Yunani pada tahun 338 SM",
    structure: ["Dewan Perhimpunan (tertinggi)", "Majlis", "Majistret", "Juri"],
    assemblyFunctions: [
      "Melantik Ahli Majlis sebagai sebahagian sistem pentadbiran",
      "Menggubal undang-undang untuk memastikan keadilan dilaksanakan",
      "Membuat deklarasi peperangan untuk mempertahankan kedaulatan Athens"
    ],
    membershipRules: [
      "Anggota terdiri daripada semua warganegara lelaki Athens",
      "Setiap warganegara berpeluang memegang jawatan selama 6 bulan hingga setahun",
      "Bersidang sekurang-kurangnya 3 kali sebulan"
    ]
  },
  romanOverview: {
    relationToGreek: "Kesinambungan daripada Tamadun Yunani — kedua-duanya dirujuk sebagai zaman klasik Eropah. Kebebasan pemikiran dan sikap ingin tahu Yunani menjadi asas Tamadun Rom.",
    rivals: ["Etruscan", "Macedonia", "Seleucid", "Mesir"],
    location: "Lembah Latium, berhampiran Sungai Tiber, berpusat di Rom, Itali",
    eras: [
      { name: "Zaman Beraja", duration: "753 – 509 SM" },
      { name: "Zaman Republik", duration: "509 – 27 SM" },
      { name: "Zaman Empayar", duration: "27 SM – 476 M" }
    ],
    goldenAge: "Pax Romana (27 SM – 180 M) — 200 tahun keamanan merangkumi tiga benua: Asia, Afrika, Eropah",
    socialClasses: [
      { name: "Patrician", composition: "Golongan atasan" },
      { name: "Plebian", composition: "Petani, artisan, peniaga, golongan hamba" }
    ]
  },
  architecture: {
    intro: "Jika Tamadun Yunani terkenal dengan demokrasi, Tamadun Rom terkenal dengan kepakaran seni bina — bangunan, jalan raya, saliran air dan tempat mandi awam, dengan ketahanan tinggi yang kekal hingga kini.",
    keyFigure: { name: "Marco Vitruvius", work: "On Architecture", year: "46 SM" },
    supporters: ["Marcus Visanius Agrippa (63-12 SM) — pentadbir dan jurutera", "Kerajaan menyediakan bantuan kewangan", "Golongan buruh (kebanyakannya hamba)"],
    features: ["Saiz yang besar", "Kubah berbentuk bulat", "Bumbung berstruktur melengkung", "Penggunaan siling", "Tiang gaya Yunani", "Batu dilepa dengan simen", "Hiasan dalaman", "Penggunaan marmar"],
    buildings: [
      { name: "Colosseum", description: "Tempat persembahan dan pertandingan bersaiz besar (acara gladiator)", specs: ["Ketinggian 50 meter", "Lebar 156 meter", "Keluasan ~2.5 hektar", "Arena 85m x 54m", "Memuatkan 50,000 orang", "80 pintu masuk"], builtBy: "Dimulakan Raja Vespian (72 M), disiapkan anaknya Titus (80 M)" },
      { name: "Pantheon", description: "Binaan berkubah terbesar di dunia — tempat penyembahan dewa-dewi Rom", specs: ["Kubah berdiameter 43 meter", "Oculus (bukaan cahaya) 13 meter lebar", "Dinding batu-bata dilepa simen", "Gaya Yunani di bahagian hadapan"], builtBy: "Dibina Marcus Visanius Agrippa (27 SM); musnah kebakaran (80 M); dibina semula Maharaja Hadrian (125 M)" },
      { name: "Amfiteater", description: "'Colosseum mini' — gelanggang terbuka berbentuk lingkaran untuk persembahan seni dan gladiator", specs: ["~230 dibina di seluruh empayar Rom", "El Djem, Tunisia: memuatkan 16,000 orang", "Arles, Perancis: memuatkan 20,000 orang"] },
      { name: "Akueduk", description: "Sistem perancangan dan pengawalan air sistematik — membekalkan air ke rumah kediaman, tempat mandi awam, dan Colosseum", specs: ["Aqua Appia (akueduk pertama, 312 SM, panjang 16 km)", "Aqua Virgo (19 SM, dibina Marcus Agrippa)", "Pont du Gard, Perancis (termasyhur, 3 tingkat)"] }
    ],
    cementFact: "Simen (bahan asas binaan Rom) diperbuat daripada campuran air, kapur dan abu gunung berapi yang dikenali sebagai pozzolana"
  },
  keyExamFacts: [
    "Tamadun Yunani berkembang 1,000-800 SM; pencetus tamadun Eropah",
    "Polis (negara-kota) tersohor: Athens (40,000 orang, 2,650 km² — paling ramai penduduk), Sparta (16,000 orang, 8,400 km² — paling luas), Corinth (10,000 orang, 880 km²)",
    "5 sistem pemerintahan Yunani: monarki, oligarki, aristokrasi, tirani, demokrasi",
    "Solon mengasaskan demokrasi Athens pada 594 SM; Pericles (495-429 SM) memantapkannya; berakhir 338 SM (Raja Philip)",
    "Struktur pemerintahan Athens: Dewan Perhimpunan (tertinggi) → Majlis, Majistret, Juri",
    "Tamadun Rom terbahagi 3 zaman: Beraja (753-509 SM), Republik (509-27 SM), Empayar (27 SM-476 M)",
    "Pax Romana (27 SM-180 M) — zaman kegemilangan Rom, 200 tahun keamanan merangkumi 3 benua",
    "Kelas sosial Rom: Patrician (atasan) dan Plebian (petani/artisan/peniaga/hamba)",
    "Marco Vitruvius menulis 'On Architecture' pada 46 SM",
    "Colosseum: 50m tinggi, 156m lebar, memuatkan 50,000 orang, dibina Vespian (72M) disiapkan Titus (80M)",
    "Pantheon: kubah 43m diameter, Oculus 13m — binaan berkubah terbesar di dunia",
    "Akueduk pertama: Aqua Appia (312 SM, 16 km)"
  ],
  keyTerms: [
    "Polis", "Acropolis", "Agora", "Monarki", "Oligarki", "Aristokrasi", "Tirani", "Demokrasi",
    "Demokrasi langsung", "Dewan Perhimpunan", "Patrician", "Plebian", "Pax Romana",
    "Kolosseum", "Pantheon", "Oculus", "Amfiteater", "Akueduk", "Pozzolana"
  ],
  chapterSummary: "Bab 6 mengkaji peningkatan Tamadun Yunani (polis, sistem demokrasi Athens melalui Solon dan Pericles) dan Tamadun Rom (tiga zaman, Pax Romana, kepakaran seni bina merangkumi Colosseum, Pantheon, Amfiteater dan Akueduk) — dua tamadun klasik yang membentuk asas pemerintahan dan senibina dunia moden."
};

export default sej6Content;
