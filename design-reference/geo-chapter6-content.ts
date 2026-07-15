// geo-chapter6-content.ts
// Source-verified content for Geography Form 1, Bab 6 — Bentuk Muka Bumi di Malaysia
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 56-71)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface LandformType {
  name: string;
  definition: string;
  facts: string[];
  examples: string[];
}

export interface MountainRange {
  region: string;
  ranges: string[];
  peaks: { name: string; height?: string }[];
}

export interface CoastalFeature {
  name: string;
  formation: string;
}

export interface ImportanceCategory {
  landform: string;
  uses: { use: string; examples: string[] }[];
}

export interface Geo6Content {
  hook: { title: string; body: string };
  overview: string;
  landformTypes: LandformType[];
  highlandLocations: MountainRange[];
  highestPeak: string;
  lowlandLocations: { region: string; areas: { name: string; facts: string[] }[] }[];
  coastline: {
    totalLength: string;
    surroundingSeas: string[];
    features: CoastalFeature[];
  };
  importance: ImportanceCategory[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo6Content: Geo6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Dari puncak Gunung Kinabalu yang menjulang 4,095 meter hingga ke dataran padi yang rata di Kedah, Malaysia mempunyai hampir setiap jenis bentuk muka bumi yang wujud. Bab ini menunjukkan di mana setiap bentuk muka bumi terletak — dan kenapa ia penting untuk kehidupan seharian kita."
  },
  overview: "Malaysia mempunyai pelbagai bentuk muka bumi. Bentuk muka bumi di Malaysia terdiri daripada tanah tinggi, tanah pamah, pinggir laut dan saliran.",
  landformTypes: [
    {
      name: "Tanah Tinggi",
      definition: "Kawasan ketinggian melebihi 180 m dari aras laut, merangkumi banjaran gunung dan dataran tinggi.",
      facts: [
        "Banjaran gunung di Malaysia terjadi akibat daripada proses lipatan",
        "Banjaran Titiwangsa tinggi di bahagian utara dan semakin rendah ke selatan Semenanjung Malaysia",
        "Kebanyakan banjaran terbentuk di bahagian tengah Semenanjung Malaysia, pedalaman Sarawak dan di barat serta tengah negeri Sabah",
        "Kawasan tanah tinggi mempunyai suhu yang rendah — contohnya purata suhu di Cameron Highlands ialah 19°C, berbanding Kuala Lumpur 27°C"
      ],
      examples: ["Cameron Highlands, Pahang", "Banjaran Titiwangsa"]
    },
    {
      name: "Tanah Pamah",
      definition: "Kawasan yang rendah dan ketinggian tidak melebihi 180 m dari aras laut.",
      facts: [
        "Kebanyakan tanah pamah di Malaysia terdapat di lembangan sungai, dataran, delta dan dataran pantai"
      ],
      examples: ["Dataran Kelantan", "Dataran Kedah–Perlis", "Delta Rajang", "Delta Segama"]
    },
    {
      name: "Pinggir Laut",
      definition: "Kawasan persisiran pantai Malaysia yang panjang, iaitu kira-kira 4,800 km.",
      facts: [
        "Malaysia dikelilingi Laut China Selatan, Laut Sulu, Laut Sulawesi dan Selat Melaka",
        "Terdapat pelbagai bentuk muka bumi pinggir laut seperti pulau, teluk, tanjung dan lagun",
        "Malaysia dikelilingi laut cetek yang terletak atas pentas benua dikenali sebagai Pentas Sunda (kedalaman sehingga 180 m dari dasar laut)"
      ],
      examples: ["Pantai Chenang, Pulau Langkawi, Kedah"]
    },
    {
      name: "Saliran",
      definition: "Merujuk kepada sungai dan tasik di Malaysia.",
      facts: [
        "Kebanyakan sungai berpunca dari kawasan tadahan hujan di tanah tinggi",
        "Selain sungai, terdapat tasik semula jadi dan tasik buatan manusia di Malaysia"
      ],
      examples: ["Tasik Kenyir"]
    }
  ],
  highlandLocations: [
    {
      region: "Semenanjung Malaysia",
      ranges: ["Banjaran Titiwangsa ('tulang belakang' Semenanjung)", "Banjaran Tahan", "Banjaran Benom"],
      peaks: [{ name: "Gunung Korbu", height: "2,182 m" }, { name: "Gunung Tahan", height: "2,187 m" }]
    },
    {
      region: "Sabah",
      ranges: ["Banjaran Crocker", "Banjaran Trus Madi", "Banjaran Brassey"],
      peaks: [{ name: "Gunung Kinabalu", height: "4,095 m — gunung tertinggi di Malaysia" }, { name: "Gunung Trus Madi", height: "2,642 m" }]
    },
    {
      region: "Sarawak",
      ranges: ["Banjaran Tama Abu", "Pergunungan Iran", "Pergunungan Hose", "Banjaran Kapuas Hulu"],
      peaks: [{ name: "Gunung Mulu", height: "2,376 m" }]
    }
  ],
  highestPeak: "Gunung Kinabalu (4,095 m), terletak di Banjaran Crocker, Sabah — gunung tertinggi di Malaysia. Taman Negara Gunung Mulu di Sarawak turut terkenal dengan rangkaian gua terpanjang di dunia, termasuk 'Sarawak Chamber' — ruang bawah tanah terbesar di dunia yang boleh memuatkan 40 buah kapal terbang Boeing 747.",
  lowlandLocations: [
    {
      region: "Semenanjung Malaysia",
      areas: [
        { name: "Dataran Kedah–Perlis", facts: ["Bermula dari Perlis hingga ke selatan Kedah", "Tanih jenis aluvium, sesuai untuk penanaman padi"] },
        { name: "Dataran Kelantan", facts: ["Tanah pamah yang rendah dan rata", "Diliputi tanih aluvium, subur untuk pertanian"] },
        { name: "Dataran Hulu Sungai Perak", facts: ["Sambungan jaluran tanah pamah dari utara ke selatan Perak", "Sesuai untuk pelbagai kegiatan ekonomi"] }
      ]
    },
    {
      region: "Sarawak & Sabah",
      areas: [
        { name: "Delta Rajang", facts: ["Dataran luas dan subur di pantai barat Sarawak", "Pertanian sebagai kegiatan utama"] },
        { name: "Dataran Pantai Timur Sabah", facts: ["Lebih luas berbanding pantai barat", "Sesuai untuk kelapa sawit, getah dan koko"] },
        { name: "Dataran Pantai Barat Sabah", facts: ["Tanah pamah sempit dan terputus-putus", "Sesuai untuk perindustrian seperti di Likas dan Kepayan"] },
        { name: "Dataran Pantai Barat Sarawak", facts: ["Dataran luas dan subur", "Sesuai untuk lada hitam, padi dan nanas; pusat petempatan dan pentadbiran"] }
      ]
    }
  ],
  coastline: {
    totalLength: "Kira-kira 4,800 km",
    surroundingSeas: ["Laut China Selatan", "Laut Sulu", "Laut Sulawesi", "Selat Melaka"],
    features: [
      { name: "Tebing tinggi", formation: "Terbentuk akibat hakisan ombak semasa air pasang" },
      { name: "Gua", formation: "Kesan lekukan yang terbentuk akibat tindakan ombak terhadap tebing tinggi" },
      { name: "Gerbang laut", formation: "Terbentuk disebabkan hakisan ombak berterusan yang menembusi dinding gua laut" },
      { name: "Batu tunggul", formation: "Hasil daripada runtuhnya bahagian atas gerbang laut" }
    ]
  },
  importance: [
    {
      landform: "Tanah Tinggi",
      uses: [
        { use: "Pelancongan", examples: ["Bukit Bendera (Pulau Pinang)", "Gunung Kinabalu (Sabah)", "Genting Highlands (Pahang)"] },
        { use: "Pertanian", examples: ["Cameron Highlands (Pahang)", "Tanah Tinggi Kundasang (Sabah)"] },
        { use: "Jana Kuasa Hidroelektrik", examples: ["Empangan Kenyir (Terengganu)", "Empangan Temenggor (Perak)", "Empangan Bakun (Sarawak)"] }
      ]
    },
    {
      landform: "Tanah Pamah",
      uses: [
        { use: "Petempatan", examples: ["Kuala Lumpur", "Johor Bahru (Johor)", "Alor Setar (Kedah)"] },
        { use: "Perindustrian dan Perdagangan", examples: ["Perai (Pulau Pinang)", "Shah Alam (Selangor)", "Kamunting (Perak)"] },
        { use: "Perhubungan dan Pengangkutan", examples: ["Lebuhraya Utara–Selatan", "Lapangan terbang KLIA"] },
        { use: "Pertanian", examples: ["Padi di Dataran Kedah–Perlis", "Getah dan kelapa sawit di Dataran Johor"] }
      ]
    },
    {
      landform: "Saliran",
      uses: [
        { use: "Sempadan", examples: ["Sungai Golok — sempadan Malaysia-Thailand", "Sungai Bernam — sempadan Selangor-Perak"] },
        { use: "Perikanan", examples: ["Sungai Endau (Johor)", "Sungai Rajang (Sarawak)"] },
        { use: "Pengangkutan kayu balak", examples: ["Sungai Kinabatangan (Sabah)", "Sungai Baram (Sarawak)"] },
        { use: "Pengairan & Hidroelektrik", examples: ["Empangan Murum (Sarawak)", "Empangan Pergau (Kelantan)"] }
      ]
    },
    {
      landform: "Pinggir Laut",
      uses: [
        { use: "Perikanan", examples: ["Kuala Selangor", "Kuala Muda (Kedah)", "Sandakan (Sabah)"] },
        { use: "Pelancongan", examples: ["Pulau Pangkor (Perak)", "Pulau Sipadan (Sabah)", "Pulau Tioman (Pahang)"] },
        { use: "Perlombongan", examples: ["Petroleum & gas asli di Terengganu, Sarawak, Sabah"] },
        { use: "Pelabuhan", examples: ["Pelabuhan Klang (Selangor)", "Pelabuhan Pasir Gudang (Johor)"] }
      ]
    }
  ],
  keyExamFacts: [
    "Bentuk muka bumi Malaysia terdiri daripada tanah tinggi, tanah pamah, pinggir laut, dan saliran",
    "Tanah tinggi melebihi 180 m dari aras laut; tanah pamah kurang daripada 180 m",
    "Gunung Kinabalu (4,095 m) di Banjaran Crocker, Sabah, ialah gunung tertinggi di Malaysia",
    "Banjaran Titiwangsa dikenali sebagai 'tulang belakang' Semenanjung Malaysia",
    "Pantai Malaysia berpanjangan kira-kira 4,800 km, dikelilingi 4 badan air utama",
    "Pentas Sunda ialah kawasan laut cetek di sekeliling Malaysia berkedalaman sehingga 180 m",
    "Setiap jenis bentuk muka bumi mempunyai kepentingan ekonomi tersendiri — pelancongan, pertanian, hidroelektrik, petempatan, perikanan"
  ],
  keyTerms: [
    "Tanah tinggi", "Tanah pamah", "Pinggir laut", "Saliran", "Banjaran gunung",
    "Dataran tinggi", "Delta", "Pentas benua", "Pentas Sunda", "Tebing tinggi",
    "Gerbang laut", "Batu tunggul", "Tasik buatan manusia", "Hidroelektrik"
  ],
  chapterSummary: "Bab 6 merangkumi empat jenis bentuk muka bumi di Malaysia — tanah tinggi, tanah pamah, pinggir laut dan saliran — lokasi masing-masing di Semenanjung, Sabah dan Sarawak, gunung tertinggi (Gunung Kinabalu), serta kepentingan setiap bentuk muka bumi untuk pelancongan, pertanian, hidroelektrik, petempatan, perindustrian dan perikanan."
};

export default geo6Content;
