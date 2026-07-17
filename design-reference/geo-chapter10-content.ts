// geo-chapter10-content.ts
// Source-verified content for Geography Form 1, Bab 10 — Bentuk Muka Bumi dan Saliran di Asia Tenggara
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 108-119)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface Country {
  name: string;
  capital: string;
  region: 'tanah besar' | 'kepulauan';
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
    highlands: { note: string; ranges: string[] };
    volcanoes: Volcano[];
  };
  majorRivers: RiverFact[];
  majorLakes: LakeFact[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo10Content: Geo10Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Malaysia bukan sahaja berkongsi sempadan dengan jiran serantau — ia berkongsi banjaran gunung yang sama, dikelilingi lautan yang sama, dan bergantung pada sungai yang mengalir merentasi beberapa negara sekaligus. Bab ini meletakkan Malaysia dalam konteks Asia Tenggara yang lebih luas."
  },
  overview: {
    location: "Asia Tenggara terletak di bahagian tenggara Benua Asia, antara latitud 11°S hingga 28°U dan longitud 93°T hingga 135°T.",
    totalCountries: 11,
    totalArea: "4,506,600 km persegi",
    mainlandCountries: ["Malaysia (Semenanjung Malaysia)", "Myanmar", "Thailand", "Kemboja", "Laos", "Vietnam"],
    maritimeCountries: ["Malaysia (Sabah dan Sarawak)", "Singapura", "Brunei Darussalam", "Indonesia", "Timor Leste", "Filipina"]
  },
  countries: [
    { name: "Malaysia", capital: "Kuala Lumpur", region: "tanah besar" },
    { name: "Myanmar", capital: "Naypyidaw", region: "tanah besar" },
    { name: "Thailand", capital: "Bangkok", region: "tanah besar" },
    { name: "Laos", capital: "Vientiane", region: "tanah besar" },
    { name: "Vietnam", capital: "Hanoi", region: "tanah besar" },
    { name: "Kemboja", capital: "Phnom Penh", region: "tanah besar" },
    { name: "Singapura", capital: "Singapura", region: "kepulauan" },
    { name: "Brunei Darussalam", capital: "Bandar Seri Begawan", region: "kepulauan" },
    { name: "Indonesia", capital: "Jakarta", region: "kepulauan" },
    { name: "Filipina", capital: "Manila", region: "kepulauan" },
    { name: "Timor Leste", capital: "Dili", region: "kepulauan" }
  ],
  landforms: {
    coastline: {
      note: "Semua negara di Asia Tenggara mempunyai pinggir laut kecuali Laos.",
      seas: ["Laut Andaman", "Laut China Selatan", "Laut Jawa", "Laut Sulawesi", "Laut Sulu"],
      shelfNote: "Pinggir laut di Asia Tenggara cetek dan dikenali sebagai pentas benua."
    },
    lowlands: {
      note: "Tanah pamah banyak terdapat di delta dan lembah sungai — subur dan sesuai untuk pertanian seperti penanaman padi. Kawasan ini berpenduduk padat kerana petempatan dan jaringan perhubungan mudah dibina.",
      examples: ["Delta Sungai Mekong (Vietnam)", "Delta Sungai Irrawaddy (Myanmar)", "Lembah Menam Chao Phraya (Thailand)"]
    },
    highlands: {
      note: "Tanah tinggi terdiri daripada banjaran gunung lipat muda (terbentuk sejak 35 juta tahun) dan banjaran gunung lipat tua (terbentuk sejak 200 juta tahun). Banjaran tinggi berpunca dari Banjaran Himalaya di utara dan menganjur bermula di Banjaran Arakan Yoma (Myanmar).",
      ranges: ["Banjaran Arakan Yoma (Myanmar)", "Banjaran Annam (Vietnam)", "Banjaran Bilauktaung (Thailand)", "Banjaran Crocker (Malaysia)"]
    },
    volcanoes: [
      { name: "Gunung Merapi", country: "Indonesia" },
      { name: "Gunung Kerinci", country: "Indonesia" },
      { name: "Gunung Krakatau", country: "Indonesia" },
      { name: "Gunung Mayon", country: "Filipina" },
      { name: "Gunung Pinatubo", country: "Filipina" }
    ]
  },
  majorRivers: [
    { name: "Sungai Mekong", facts: ["Sungai terpanjang di Asia Tenggara (4,880 km)", "Berpunca dari Dataran Tibet, mengalir melalui Yunan (China), Myanmar, Thailand, Laos, Kemboja, berakhir di Vietnam", "Lebih 90 juta penduduk bergantung hidup padanya, terutama pesawah padi", "Lebih 140,000 km persegi padi sawah ditanam di lembangannya"] },
    { name: "Sungai Irrawaddy", facts: ["Sungai terpenting dan terpanjang di Myanmar (2,293 km)", "Mengalir dari utara ke selatan, berakhir di Laut Andaman", "Jalan perhubungan dan pengangkutan; sumber air dan protein", "Delta Irrawaddy sesuai untuk penanaman padi"] },
    { name: "Menam Chao Phraya", facts: ["Sungai terpenting dan terpanjang di Thailand (372 km)", "Mengalir dari utara Thailand ke Teluk Siam", "Lembahnya kaya tanih aluvium subur untuk padi", "Bangkok terkenal dengan pasar terapung, digelar 'Venice Timur'", "'Menam' dalam bahasa Thai bermaksud sungai"] }
  ],
  majorLakes: [
    { name: "Tonle Sap", facts: ["Terletak di barat Kemboja", "Tasik air tawar semula jadi terbesar di Asia Tenggara (2,569 km persegi)", "Membekalkan sumber air domestik penduduk Kemboja", "Perikanan air tawar — kegiatan ekonomi terpenting sepanjang tahun", "Pada musim kemarau, tasik menjadi cetek dan kegiatan perikanan lebih giat", "'Tonle' dalam bahasa Kemboja bermaksud tasik"] },
    { name: "Danau Toba", facts: ["Terletak di Sumatera Utara, Indonesia", "Tasik vulkanik yang terbentuk akibat ledakan gunung berapi 73,000-75,000 tahun lalu", "Saiz: 100 km panjang, 30 km lebar, kedalaman kira-kira 500 m", "Tasik vulkanik paling dalam di dunia", "Pulau Samosir di tengah tasik terbentuk akibat pergerakan magma", "'Danau' dalam bahasa Indonesia bermaksud tasik"] }
  ],
  keyExamFacts: [
    "Terdapat 11 buah negara di Asia Tenggara, terbahagi kepada Tanah Besar dan Kepulauan Asia Tenggara",
    "Laos ialah satu-satunya negara Asia Tenggara yang tiada pinggir laut",
    "Kebanyakan gunung berapi di Asia Tenggara terdapat di Indonesia dan Filipina",
    "Sungai Mekong (4,880 km) ialah sungai terpanjang di Asia Tenggara, mengalir melalui 6 negara/wilayah",
    "Tonle Sap ialah tasik air tawar semula jadi terbesar di Asia Tenggara",
    "Danau Toba ialah tasik vulkanik paling dalam di dunia, terbentuk akibat letusan gunung berapi purba",
    "Gunung lipat muda terbentuk sejak 35 juta tahun; gunung lipat tua sejak 200 juta tahun"
  ],
  keyTerms: [
    "Tanah Besar Asia Tenggara", "Kepulauan Asia Tenggara", "Pentas benua",
    "Gunung lipat muda", "Gunung lipat tua", "Terusan", "Vulkanik", "Lembangan",
    "Barangan pukal", "Delta"
  ],
  chapterSummary: "Bab 10 memperkenalkan 11 negara Asia Tenggara (Tanah Besar dan Kepulauan) beserta ibu negara masing-masing, bentuk muka bumi (pinggir laut, tanah pamah, tanah tinggi, gunung berapi), dan sungai serta tasik utama serantau — termasuk Sungai Mekong yang terpanjang dan Danau Toba, tasik vulkanik paling dalam di dunia."
};

export default geo10Content;
