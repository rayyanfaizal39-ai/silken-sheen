export interface Country {
  name: string;
  capital: string;
  region: "tanah besar" | "kepulauan";
}

export interface Volcano {
  name: string;
  country: string;
}

export interface RiverFact {
  name: string;
  facts: string[];
}

export interface LakeFact {
  name: string;
  facts: string[];
}

export interface Geo10Content {
  hook: { title: string; body: string };
  overview: {
    location: string;
    totalCountries: number;
    totalArea: string;
    mainlandCountries: string[];
    maritimeCountries: string[];
  };
  countries: Country[];
  landforms: {
    coastline: { note: string; seas: string[]; shelfNote: string };
    lowlands: { note: string; examples: string[] };
    highlands: { note: string; ranges: string[]; plateaus: string[] };
    volcanoes: Volcano[];
  };
  majorRivers: RiverFact[];
  majorLakes: LakeFact[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo10Content: Geo10Content = {
  hook: {
    title: "Satu rantau, pelbagai landskap",
    body: "Asia Tenggara berkongsi banjaran, laut dan sungai yang merentasi sempadan. Bentuk muka bumi dan saliran ini menentukan lokasi petempatan serta kegiatan ekonomi penduduknya.",
  },
  overview: {
    location:
      "Asia Tenggara terletak di tenggara Benua Asia, antara latitud 11°S hingga 28°U dan longitud 93°T hingga 135°T.",
    totalCountries: 11,
    totalArea: "4 506 600 km²",
    mainlandCountries: ["Malaysia", "Myanmar", "Thailand", "Kemboja", "Laos", "Vietnam"],
    maritimeCountries: [
      "Malaysia",
      "Singapura",
      "Brunei Darussalam",
      "Indonesia",
      "Timor Leste",
      "Filipina",
    ],
  },
  countries: [
    { name: "Malaysia", capital: "Kuala Lumpur", region: "tanah besar" },
    { name: "Myanmar", capital: "Naypyidaw", region: "tanah besar" },
    { name: "Thailand", capital: "Bangkok", region: "tanah besar" },
    { name: "Laos", capital: "Vientiane", region: "tanah besar" },
    { name: "Vietnam", capital: "Hanoi", region: "tanah besar" },
    { name: "Kemboja", capital: "Phnom Penh", region: "tanah besar" },
    { name: "Singapura", capital: "Singapura", region: "kepulauan" },
    {
      name: "Brunei Darussalam",
      capital: "Bandar Seri Begawan",
      region: "kepulauan",
    },
    { name: "Indonesia", capital: "Jakarta", region: "kepulauan" },
    { name: "Filipina", capital: "Manila", region: "kepulauan" },
    { name: "Timor Leste", capital: "Dili", region: "kepulauan" },
  ],
  landforms: {
    coastline: {
      note: "Semua negara Asia Tenggara mempunyai pinggir laut kecuali Laos, sebuah negara daratan tanpa pantai.",
      seas: ["Laut Andaman", "Laut China Selatan", "Laut Jawa", "Laut Sulawesi", "Laut Sulu"],
      shelfNote:
        "Kebanyakan pinggir lautnya cetek dan membentuk pentas benua seperti Pentas Sunda.",
    },
    lowlands: {
      note: "Tanah pamah di delta dan lembah sungai rata, subur serta diliputi tanih mendapan. Pertanian, petempatan dan jaringan pengangkutan mudah dibangunkan.",
      examples: [
        "Delta Sungai Mekong (Vietnam)",
        "Delta Sungai Irrawaddy (Myanmar)",
        "Lembah Menam Chao Phraya (Thailand)",
      ],
    },
    highlands: {
      note: "Tanah tinggi terdiri daripada gunung lipat muda yang terbentuk sejak 35 juta tahun dan gunung lipat tua sejak 200 juta tahun. Banjarannya berpunca dari Himalaya dan menganjur ke Asia Tenggara melalui Arakan Yoma.",
      ranges: [
        "Banjaran Arakan Yoma (Myanmar)",
        "Banjaran Annam (Vietnam)",
        "Banjaran Crocker (Malaysia)",
      ],
      plateaus: ["Dataran Tinggi Korat (Thailand)", "Dataran Tinggi Shan (Myanmar)"],
    },
    volcanoes: [
      { name: "Gunung Pinatubo", country: "Filipina" },
      { name: "Danau Toba", country: "Indonesia" },
    ],
  },
  majorRivers: [
    {
      name: "Sungai Mekong",
      facts: [
        "Sungai terpanjang di Asia Tenggara, kira-kira 4 880 km",
        "Berpunca dari Dataran Tibet dan mengalir melalui Yunan, Myanmar, Thailand, Laos, Kemboja sebelum berakhir di Vietnam",
        "Menyokong lebih 90 juta penduduk dan lebih 140 000 km² kawasan padi sawah",
        "Kaya dengan sumber ikan air tawar",
      ],
    },
    {
      name: "Menam Chao Phraya",
      facts: [
        "Sistem sungai dan terusan yang penting di Thailand",
        "Menjadi jalan pengangkutan dan pusat perniagaan",
        "Terkenal dengan kegiatan pasar terapung",
      ],
    },
    {
      name: "Sungai Irrawaddy",
      facts: [
        "Sungai utama di Myanmar",
        "Penting untuk pengangkutan, pertanian dan petempatan",
        "Deltanya subur dan sesuai untuk penanaman padi",
      ],
    },
  ],
  majorLakes: [
    {
      name: "Tonle Sap",
      facts: [
        "Tasik semula jadi terbesar di Kemboja",
        "Semasa monsun, air Sungai Mekong mengalir masuk dan meluaskan tasik sehingga kira-kira 10 000 km²",
        "Kawasan perikanan air tawar utama dan destinasi pelancongan",
      ],
    },
    {
      name: "Danau Toba",
      facts: [
        "Terletak di Sumatera, Indonesia",
        "Tasik vulkanik atau tasik kawah yang terbentuk akibat letusan gunung berapi purba",
        "Destinasi pelancongan bertaraf dunia",
      ],
    },
    {
      name: "Tasik Kenyir",
      facts: [
        "Terletak di Malaysia",
        "Tasik buatan manusia terbesar di Malaysia",
        "Dibina untuk penjanaan kuasa hidroelektrik dan pelancongan",
      ],
    },
  ],
  keyExamFacts: [
    "Asia Tenggara mempunyai 11 negara dan berkeluasan 4 506 600 km²",
    "Laos ialah satu-satunya negara Asia Tenggara tanpa pinggir laut",
    "Empat bentuk muka bumi utama ialah tanah tinggi, tanah pamah, pinggir laut dan gunung berapi",
    "Gunung berapi tertumpu di Indonesia dan Filipina",
    "Sungai Mekong ialah sungai terpanjang di Asia Tenggara, kira-kira 4 880 km",
    "Tonle Sap boleh meluas sehingga kira-kira 10 000 km² pada musim monsun",
    "Danau Toba ialah tasik vulkanik; Tasik Kenyir ialah tasik buatan manusia",
  ],
  keyTerms: [
    "Tanah Besar Asia Tenggara",
    "Kepulauan Asia Tenggara",
    "Pentas benua",
    "Gunung lipat muda",
    "Gunung lipat tua",
    "Delta",
    "Lembah sungai",
    "Vulkanik",
    "Terusan",
    "Hidroelektrik",
  ],
  chapterSummary:
    "Bab 10 memperkenalkan 11 negara Asia Tenggara, empat bentuk muka bumi utama serta sungai dan tasik penting serantau. Bentuk muka bumi dan saliran mempengaruhi pertanian, petempatan, pengangkutan, perikanan, penjanaan tenaga dan pelancongan.",
};

export default geo10Content;
