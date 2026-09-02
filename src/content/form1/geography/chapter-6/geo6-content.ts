// geo6-content.ts
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
  drainage: {
    definition: string;
    riverSource: string;
    naturalLakes: string[];
    artificialLakes: { name: string; function: string }[];
  };
  importance: ImportanceCategory[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo6Content: Geo6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Dari puncak Gunung Kinabalu yang menjulang 4,095 meter hingga ke dataran padi yang rata di Kedah, Malaysia mempunyai hampir setiap jenis bentuk muka bumi yang wujud. Bab ini menunjukkan di mana setiap bentuk muka bumi terletak — dan kenapa ia penting untuk kehidupan seharian kita.",
  },
  overview:
    "Malaysia mempunyai pelbagai bentuk muka bumi. Bentuk muka bumi di Malaysia terdiri daripada tanah tinggi, tanah pamah, pinggir laut dan saliran.",
  landformTypes: [
    {
      name: "Tanah Tinggi",
      definition:
        "Kawasan ketinggian melebihi 180 m dari aras laut, merangkumi banjaran gunung dan dataran tinggi.",
      facts: [
        "Banjaran gunung di Malaysia terjadi akibat daripada proses lipatan",
        "Banjaran Titiwangsa tinggi di bahagian utara dan semakin rendah ke selatan Semenanjung Malaysia",
        "Kebanyakan banjaran terbentuk di bahagian tengah Semenanjung Malaysia, pedalaman Sarawak dan di barat serta tengah negeri Sabah",
        "Kawasan tanah tinggi mempunyai suhu yang rendah — contohnya purata suhu di Cameron Highlands ialah 19°C, berbanding Kuala Lumpur 27°C",
      ],
      examples: ["Cameron Highlands, Pahang", "Banjaran Titiwangsa"],
    },
    {
      name: "Tanah Pamah",
      definition: "Kawasan yang rendah dan ketinggian tidak melebihi 180 m dari aras laut.",
      facts: [
        "Kebanyakan tanah pamah di Malaysia terdapat di lembangan sungai, dataran, delta dan dataran pantai",
      ],
      examples: ["Dataran Kelantan", "Dataran Kedah–Perlis", "Delta Rajang", "Delta Segama"],
    },
    {
      name: "Pinggir Laut",
      definition: "Kawasan persisiran pantai Malaysia yang panjang, iaitu kira-kira 4,800 km.",
      facts: [
        "Malaysia dikelilingi Laut China Selatan, Laut Sulu, Laut Sulawesi dan Selat Melaka",
        "Terdapat pelbagai bentuk muka bumi pinggir laut seperti pulau, teluk, tanjung dan lagun",
        "Malaysia dikelilingi laut cetek yang terletak atas pentas benua dikenali sebagai Pentas Sunda (kedalaman sehingga 180 m dari dasar laut)",
      ],
      examples: ["Pantai Chenang, Pulau Langkawi, Kedah"],
    },
    {
      name: "Saliran",
      definition: "Merujuk kepada sungai dan tasik di Malaysia.",
      facts: [
        "Kebanyakan sungai berpunca dari kawasan tadahan hujan di tanah tinggi",
        "Selain sungai, terdapat tasik semula jadi dan tasik buatan manusia di Malaysia",
      ],
      examples: ["Tasik Kenyir"],
    },
  ],
  highlandLocations: [
    {
      region: "Semenanjung Malaysia",
      ranges: [
        "Banjaran Titiwangsa ('tulang belakang' Semenanjung)",
        "Banjaran Tahan",
        "Banjaran Benom",
      ],
      peaks: [
        { name: "Gunung Korbu", height: "2,183 m" },
        { name: "Gunung Tahan", height: "2,187 m — puncak tertinggi di Semenanjung Malaysia" },
      ],
    },
    {
      region: "Sabah",
      ranges: ["Banjaran Crocker", "Banjaran Trus Madi", "Banjaran Brassey"],
      peaks: [
        { name: "Gunung Kinabalu", height: "4,095 m — gunung tertinggi di Malaysia" },
        { name: "Gunung Trus Madi", height: "2,642 m" },
      ],
    },
    {
      region: "Sarawak",
      ranges: ["Banjaran Tama Abu", "Pergunungan Iran", "Pergunungan Hose", "Banjaran Kapuas Hulu"],
      peaks: [{ name: "Gunung Mulu", height: "2,376 m" }],
    },
  ],
  highestPeak:
    "Gunung Kinabalu (4,095 m), terletak di Banjaran Crocker, Sabah, ialah gunung tertinggi di Malaysia. Gunung Trus Madi (2,642 m) ialah gunung kedua tertinggi, manakala Gunung Tahan (2,187 m) ialah puncak tertinggi di Semenanjung Malaysia.",
  lowlandLocations: [
    {
      region: "Semenanjung Malaysia",
      areas: [
        {
          name: "Dataran Kedah–Perlis",
          facts: [
            "Bermula dari Perlis hingga ke selatan Kedah",
            "Tanih jenis aluvium, sesuai untuk penanaman padi",
          ],
        },
        {
          name: "Dataran Kelantan",
          facts: [
            "Tanah pamah yang rendah dan rata",
            "Diliputi tanih aluvium, subur untuk pertanian",
          ],
        },
        {
          name: "Dataran Hulu Sungai Perak",
          facts: [
            "Sambungan jaluran tanah pamah dari utara ke selatan Perak",
            "Sesuai untuk pelbagai kegiatan ekonomi",
          ],
        },
      ],
    },
    {
      region: "Sarawak & Sabah",
      areas: [
        {
          name: "Delta Rajang",
          facts: [
            "Dataran luas dan subur di pantai barat Sarawak",
            "Pertanian sebagai kegiatan utama",
          ],
        },
        {
          name: "Dataran Pantai Timur Sabah",
          facts: [
            "Lebih luas berbanding pantai barat",
            "Sesuai untuk kelapa sawit, getah dan koko",
          ],
        },
        {
          name: "Delta Segama",
          facts: ["Terletak di bahagian timur Sabah", "Kawasan tanah pamah di muara Sungai Segama"],
        },
        {
          name: "Dataran Pantai Barat Sabah",
          facts: [
            "Tanah pamah sempit dan terputus-putus",
            "Sesuai untuk perindustrian seperti di Likas dan Kepayan",
          ],
        },
        {
          name: "Dataran Pantai Barat Sarawak",
          facts: [
            "Dataran luas dan subur",
            "Sesuai untuk lada hitam, padi dan nanas; pusat petempatan dan pentadbiran",
          ],
        },
      ],
    },
  ],
  coastline: {
    totalLength: "Kira-kira 4,800 km",
    surroundingSeas: ["Laut China Selatan", "Laut Sulu", "Laut Sulawesi", "Selat Melaka"],
    features: [
      {
        name: "Pantai",
        formation:
          "Timbunan pasir atau batu kelikir di sepanjang pesisir; contohnya Pantai Chenang",
      },
      { name: "Tebing tinggi", formation: "Terbentuk akibat hakisan ombak semasa air pasang" },
      {
        name: "Gua",
        formation: "Kesan lekukan yang terbentuk akibat tindakan ombak terhadap tebing tinggi",
      },
      {
        name: "Gerbang laut",
        formation: "Terbentuk disebabkan hakisan ombak berterusan yang menembusi dinding gua laut",
      },
      { name: "Batu tunggul", formation: "Hasil daripada runtuhnya bahagian atas gerbang laut" },
      { name: "Batu sisa", formation: "Baki batu tunggul yang terus terhakis oleh ombak" },
      { name: "Tanjung", formation: "Bahagian daratan yang menganjur ke laut" },
      {
        name: "Teluk",
        formation: "Lekukan pantai yang menghala ke daratan dan biasanya terlindung",
      },
      {
        name: "Lagun",
        formation: "Kawasan air masin yang terpisah daripada laut oleh beting pasir",
      },
    ],
  },
  drainage: {
    definition: "Saliran di Malaysia merujuk kepada sistem sungai dan tasik.",
    riverSource:
      "Kebanyakan sungai utama di Malaysia berpunca dari kawasan tadahan hujan di kawasan tanah tinggi.",
    naturalLakes: ["Tasik Bera, Pahang", "Tasik Chini, Pahang"],
    artificialLakes: [
      {
        name: "Tasik Kenyir, Terengganu",
        function: "Tasik buatan manusia yang berfungsi menjana kuasa hidroelektrik",
      },
    ],
  },
  importance: [
    {
      landform: "Tanah Tinggi",
      uses: [
        { use: "Pelancongan", examples: ["Cameron Highlands (Pahang)", "Kundasang (Sabah)"] },
        {
          use: "Pertanian hawa sederhana",
          examples: ["Sayur-sayuran, strawberi, teh dan bunga-bungaan di Cameron Highlands"],
        },
        {
          use: "Kawasan tadahan hujan",
          examples: [
            "Hutan tanah tinggi menyerap, menapis dan membekalkan air bersih ke sistem saliran",
          ],
        },
        {
          use: "Jana kuasa hidroelektrik",
          examples: ["Empangan Kenyir (Terengganu)", "Empangan Bakun (Sarawak)"],
        },
      ],
    },
    {
      landform: "Tanah Pamah",
      uses: [
        { use: "Petempatan", examples: ["Kuala Lumpur", "Shah Alam", "Kuching"] },
        {
          use: "Pengangkutan dan perhubungan",
          examples: ["Lebuhraya Utara–Selatan", "Jalan kereta api", "Lapangan terbang"],
        },
        {
          use: "Pertanian",
          examples: ["Padi di Dataran Kedah–Perlis dan Dataran Kelantan", "Getah dan kelapa sawit"],
        },
        {
          use: "Perindustrian dan perdagangan",
          examples: ["Shah Alam (Selangor)", "Perai (Pulau Pinang)"],
        },
      ],
    },
    {
      landform: "Saliran",
      uses: [
        {
          use: "Bekalan air domestik dan industri",
          examples: ["Membekalkan air bersih untuk penduduk dan operasi kilang"],
        },
        {
          use: "Sempadan semula jadi",
          examples: [
            "Sungai Bernam — sempadan Selangor-Perak",
            "Sungai Golok — sempadan Malaysia-Thailand",
          ],
        },
        {
          use: "Pengangkutan dan perhubungan",
          examples: ["Sungai Rajang (Sarawak)", "Sungai Baram (Sarawak)"],
        },
        { use: "Sumber protein air tawar", examples: ["Ternakan patin sangkar di Sungai Pahang"] },
      ],
    },
    {
      landform: "Pinggir Laut",
      uses: [
        { use: "Perikanan", examples: ["Kuala Besut (Terengganu)", "Sandakan (Sabah)"] },
        { use: "Pelabuhan", examples: ["Pelabuhan Klang (Selangor)", "Pelabuhan Pulau Pinang"] },
        {
          use: "Pelancongan dan rekreasi",
          examples: ["Pantai Chenang", "Pulau Redang", "Pulau Tioman"],
        },
        {
          use: "Penambakan pinggir laut",
          examples: [
            "Tanah baharu untuk perhotelan, perumahan dan infrastruktur di Melaka dan Pulau Pinang",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Bentuk muka bumi Malaysia terdiri daripada tanah tinggi, tanah pamah, pinggir laut, dan saliran",
    "Tanah tinggi melebihi 180 m dari aras laut; tanah pamah tidak melebihi 180 m",
    "Gunung Kinabalu (4,095 m) di Banjaran Crocker, Sabah, ialah gunung tertinggi di Malaysia",
    "Banjaran Titiwangsa dikenali sebagai 'tulang belakang' Semenanjung Malaysia",
    "Pantai Malaysia berpanjangan kira-kira 4,800 km, dikelilingi 4 badan air utama",
    "Pentas Sunda ialah kawasan laut cetek di sekeliling Malaysia berkedalaman sehingga 180 m",
    "Setiap jenis bentuk muka bumi mempunyai kepentingan ekonomi tersendiri — pelancongan, pertanian, hidroelektrik, petempatan, perikanan",
  ],
  keyTerms: [
    "Tanah tinggi",
    "Tanah pamah",
    "Pinggir laut",
    "Saliran",
    "Banjaran gunung",
    "Dataran tinggi",
    "Delta",
    "Pentas benua",
    "Pentas Sunda",
    "Tebing tinggi",
    "Gerbang laut",
    "Batu tunggul",
    "Tasik buatan manusia",
    "Hidroelektrik",
  ],
  chapterSummary:
    "Bab 6 merangkumi empat jenis bentuk muka bumi di Malaysia — tanah tinggi, tanah pamah, pinggir laut dan saliran — lokasi masing-masing di Semenanjung, Sabah dan Sarawak, gunung tertinggi (Gunung Kinabalu), serta kepentingan setiap bentuk muka bumi untuk pelancongan, pertanian, hidroelektrik, petempatan, perindustrian dan perikanan.",
};

export default geo6Content;
