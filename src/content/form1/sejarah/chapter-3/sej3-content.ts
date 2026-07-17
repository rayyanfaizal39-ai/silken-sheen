// sej3-content.ts
// Source-verified content for Sejarah Form 1, Bab 3 — Zaman Prasejarah (Prehistoric Age)
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 44-69)
// Content data only — no presentation markup.

export interface StoneAgePeriod {
  name: string;
  altName: string;
  duration: string;
  facts: string[];
}

export interface WorldSite {
  name: string;
  country: string;
  dateRange: string;
  significance: string;
}

export interface LifeCategory {
  category: string;
  byEra: { era: string; description: string }[];
}

export interface ContinuityItem {
  activity: string;
  prehistoricOrigin: string;
  modernContinuation: string;
}

export interface MalaysiaSite {
  era: string;
  dateRange: string;
  sites: string[];
}

export interface Sej3Content {
  hook: { title: string; body: string };
  definition: {
    meaning: string;
    altName: string;
    divisions: string[];
  };
  stoneAge: StoneAgePeriod[];
  metalAge: { definition: string; toolExamples: string[]; duration: string };
  periodDurations: { period: string; duration: string }[];
  worldLocations: {
    intro: string;
    sites: WorldSite[];
  };
  seaLocations: {
    intro: string;
    sites: WorldSite[];
  };
  lifeCharacteristics: LifeCategory[];
  continuity: ContinuityItem[];
  malaysia: {
    intro: string;
    hoabinhianNote: string;
    sitesByEra: MalaysiaSite[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej3Content: Sej3Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebelum manusia mengenal tulisan, mereka telah berburu, bercucuk tanam, membina tempat kediaman dan mencipta peralatan yang asasnya masih kita gunakan hari ini. Bab ini menunjukkan bagaimana kehidupan manusia berkembang secara beransur-ansur — dan bahawa Lenggong, Perak, adalah salah satu tapak prasejarah paling penting di seluruh Asia Tenggara.",
  },
  definition: {
    meaning: "Zaman Prasejarah bermaksud zaman sebelum manusia mengetahui dan mengenal tulisan.",
    altName: "Turut dikenali sebagai 'nirleka' dalam bahasa Sanskrit — gabungan 'nir' (tidak ada) dan 'leka' (tulisan)",
    divisions: ["Zaman Batu", "Zaman Logam"],
  },
  stoneAge: [
    {
      name: "Zaman Paleolitik",
      altName: "Zaman Batu Lama",
      duration: "2.5 juta tahun – 8,000 SM",
      facts: ["Zaman serba mencabar; manusia menggunakan teknologi batu yang ringkas", "Turut menggunakan peralatan daripada tulang binatang"],
    },
    {
      name: "Zaman Mesolitik",
      altName: "Zaman Batu Pertengahan",
      duration: "12,000 – 4,000 SM",
      facts: ["Cara hidup semakin berkembang; cuaca tidak terlalu sejuk", "Manusia bukan sahaja memburu tetapi turut menangkap ikan"],
    },
    {
      name: "Zaman Neolitik",
      altName: "Zaman Batu Baru",
      duration: "10,000 – 2,000 SM",
      facts: ["Tahap perkembangan teknologi dan corak kehidupan lebih baik", "Wujud kawasan petempatan; aktiviti bercucuk tanam, membuat tembikar, menternak binatang"],
    },
  ],
  metalAge: {
    definition: "Zaman Logam merujuk kepada penggunaan teknologi gangsa dan besi. Manusia melakukan inovasi logam besi dan gangsa dalam peralatan, serta mula melakukan aktiviti pelayaran dan pertukaran barangan.",
    toolExamples: ["Kapak besi bersoket", "Tulang mawas", "Beliung", "Mata lembing", "Pisau bersoket"],
    duration: "3,500 SM – 500 M",
  },
  periodDurations: [
    { period: "Zaman Paleolitik", duration: "2.5 juta tahun – 8,000 SM" },
    { period: "Zaman Mesolitik", duration: "12,000 – 4,000 SM" },
    { period: "Zaman Neolitik", duration: "10,000 – 2,000 SM" },
    { period: "Zaman Logam", duration: "3,500 SM – 500 M" },
  ],
  worldLocations: {
    intro: "Zaman Prasejarah berlaku di seluruh dunia. Lokasi prasejarah wujud di kawasan terdedah (lembah sungai) atau tertutup (gua), di darat atau di dalam air. Tapak-tapak berikut diiktiraf oleh UNESCO.",
    sites: [
      { name: "Gua Chauvet", country: "Perancis", dateRange: "30,000 – 27,000 SM", significance: "Lukisan gua membuktikan penglibatan masyarakat prasejarah dalam aktiviti memburu binatang" },
      { name: "Altamira", country: "Sepanyol", dateRange: "35,000 – 11,000 SM", significance: "Lukisan gua menunjukkan kewujudan manusia Zaman Mesolitik" },
      { name: "Catal Huyuk", country: "Turki", dateRange: "7,100 – 600 SM", significance: "Aktiviti utama termasuk pertanian, terutamanya penanaman barli dan gandum" },
      { name: "Stonehenge", country: "Britain", dateRange: "3,700 – 1,600 SM", significance: "Dikaitkan dengan upacara ritual dan tempat mengkaji bintang" },
      { name: "Bhimbetka", country: "India", dateRange: "30,000 SM", significance: "Bukti kehidupan manusia prasejarah di bahagian tengah India" },
      { name: "Zhoukoudian", country: "China", dateRange: "18,000 – 11,000 SM", significance: "Penemuan rangka manusia dinamakan Peking Man" },
      { name: "Shahr-i-Sokhta", country: "Iran", dateRange: "3,200 – 1,800 SM", significance: "Kehidupan masyarakat tersusun — kawasan perumahan, perkuburan, pembuatan barangan" },
      { name: "Gobekli Tepe", country: "Turki", dateRange: "12,000 SM", significance: "Binaan batu dikaitkan dengan upacara ritual" },
    ],
  },
  seaLocations: {
    intro: "Pelbagai lokasi Zaman Prasejarah turut ditemukan di Asia Tenggara, membuktikan ketinggian pencapaian setanding manusia prasejarah di kawasan lain.",
    sites: [
      { name: "Ban Chiang", country: "Thailand", dateRange: "3,600 – 500 SM", significance: "Tapak Zaman Neolitik dan Logam — pertanian, pembuatan logam, tekstil, tembikar, penternakan" },
      { name: "Lenggong", country: "Malaysia (Perak)", dateRange: "Merentas Zaman Paleolitik, Hoabinhian dan Neolitik", significance: "Antara tapak prasejarah terpenting di Asia Tenggara; Rangka Perak Man (11,000-10,000 SM) adalah bukti paling penting" },
      { name: "Gua Liang Bua", country: "Indonesia (Pulau Flores)", dateRange: "94,000 – 12,000 SM", significance: "Penemuan Flores Man (Homo Floresiensis); kehidupan sejak Zaman Paleolitik hingga Logam" },
      { name: "Gua Padah-lin", country: "Myanmar", dateRange: "13,000 – 11,000 SM", significance: "Tempat tinggal manusia Zaman Prasejarah" },
      { name: "Sa Hyun", country: "Vietnam", dateRange: "1,000 SM – 200 M", significance: "Tapak Zaman Besi paling menonjol di Asia Tenggara; aktiviti utama pembuatan tembikar" },
    ],
  },
  lifeCharacteristics: [
    {
      category: "Tempat Kediaman",
      byEra: [
        { era: "Paleolitik", description: "Gua dan lubang bawah tanah; berlindung di bawah pokok atau tempat dari ranting kayu" },
        { era: "Mesolitik", description: "Masih mendiami gua dan lubang bawah tanah; tumpuan di pinggir sungai dan laut" },
        { era: "Neolitik", description: "Tinggal menetap di lembah sungai dan pesisiran pantai; rumah dari batu, tanah liat, kayu" },
        { era: "Logam", description: "Menetap dengan binaan lebih tersusun; turut tinggal di kawasan tanah tinggi" },
      ],
    },
    {
      category: "Peralatan",
      byEra: [
        { era: "Paleolitik", description: "Batu, kayu, tulang haiwan — bentuk sedia ada, ringkas, kasar" },
        { era: "Mesolitik", description: "Lebih halus dan kemas; mikrolit (batu kecil bersisi tajam); panah dan perangkap" },
        { era: "Neolitik", description: "Lebih halus dan kemas; termasuk alat menggali dan roda" },
        { era: "Logam", description: "Tembaga, gangsa, besi — hasil pengetahuan peleburan dan pembuatan acuan" },
      ],
    },
    {
      category: "Pengumpulan Makanan",
      byEra: [
        { era: "Paleolitik", description: "Buah-buahan, cendawan, bijiran, pucuk tumbuhan liar" },
        { era: "Mesolitik", description: "Turut mengumpul kerang dan siput di pinggir sungai/laut" },
        { era: "Neolitik", description: "Berkurangan kerana kemampuan bertani dan menternak" },
        { era: "Logam", description: "Hampir tiada — digantikan pertanian, penternakan, perdagangan barter" },
      ],
    },
    {
      category: "Kegiatan Ekonomi",
      byEra: [
        { era: "Paleolitik", description: "Bergantung sepenuhnya pada alam; hidup nomad; ekonomi sara diri" },
        { era: "Mesolitik", description: "Mengutip hasil hutan, memburu, menangkap ikan; perkongsian makanan" },
        { era: "Neolitik", description: "Menghasilkan makanan melalui pertanian dan penternakan; sistem barter dan pengkhususan kerja bermula" },
        { era: "Logam", description: "Pertanian, penternakan, perdagangan pertukaran barang; pembuatan dan pertukangan berkembang" },
      ],
    },
    {
      category: "Organisasi Sosial",
      byEra: [
        { era: "Paleolitik", description: "Kelompok kecil gabungan beberapa keluarga; hidup nomad" },
        { era: "Mesolitik", description: "Masih kelompok kecil dan nomad; belum tersusun" },
        { era: "Neolitik", description: "Sistem sosial lebih baik; ada ketua; pembahagian kelas atasan/bawahan" },
        { era: "Logam", description: "Lebih tersusun; pemimpin menyelesaikan masalah, membentuk sistem pentadbiran" },
      ],
    },
    {
      category: "Kepercayaan",
      byEra: [
        { era: "Paleolitik", description: "Animisme; percaya kuasa alam semula jadi (petir, angin, matahari, pokok, batu)" },
        { era: "Mesolitik", description: "Masih mengamalkan animisme" },
        { era: "Neolitik", description: "Ritual untuk berdamai dengan kuasa alam; kepercayaan kehidupan selepas mati; mayat dikebumikan dengan teliti" },
        { era: "Logam", description: "Penyembahan kuasa alam lebih jelas; binaan khusus untuk upacara ritual" },
      ],
    },
    {
      category: "Kesenian dan Kebudayaan",
      byEra: [
        { era: "Paleolitik", description: "Lukisan gua bersifat realisme" },
        { era: "Mesolitik", description: "Lukisan gua masih menjadi ciri kesenian utama" },
        { era: "Neolitik", description: "Corak pada tembikar; pola geometri (simbolisme)" },
        { era: "Logam", description: "Nilai estetika pada peralatan seperti gendang gangsa berpola hiasan" },
      ],
    },
  ],
  continuity: [
    { activity: "Pertanian", prehistoricOrigin: "Bermula Zaman Neolitik — padi, gandum, barli", modernContinuation: "Pertanian sara diri berkembang menjadi pertanian komersial dengan peralatan moden" },
    { activity: "Memburu & Menternak", prehistoricOrigin: "Aktiviti paling tua sejak Zaman Paleolitik, menggunakan batu/tulang/kayu/gangsa/besi", modernContinuation: "Masih diamalkan hari ini, walaupun kini untuk sukan berbanding untuk hidup" },
    { activity: "Pembuatan Peralatan", prehistoricOrigin: "Batu, kayu, tulang haiwan; kemudian gangsa dan besi (pedang, parang, tombak, cangkul, keris, kapak)", modernContinuation: "Peralatan besi kekal dalam tamadun manusia; kini digantikan mesin dan jentera dalam aktiviti komersial" },
    { activity: "Tembikar", prehistoricOrigin: "Bekas makanan, peralatan masakan, dan upacara ritual", modernContinuation: "Kekal sebagai industri penting hari ini — contoh: industri labu sayong di Kuala Kangsar, Perak" },
    { activity: "Ideofak (Pengebumian)", prehistoricOrigin: "Kepercayaan kematian bukan penamat kehidupan; mayat dikebumikan dengan pelbagai peralatan (contoh: Gua Cha, Kelantan)", modernContinuation: "Penghormatan terhadap mayat masih diamalkan mengikut agama masing-masing" },
    { activity: "Monumen dan Seni Bina", prehistoricOrigin: "Sejak Zaman Neolitik — binaan untuk pelbagai tujuan", modernContinuation: "Warisan sejarah diwarisi generasi akan datang; kini binaan moden seperti Menara Berkembar Kuala Lumpur (KLCC)" },
  ],
  malaysia: {
    intro: "Penemuan tinggalan manusia menunjukkan sejak 40,000 tahun lalu, manusia telah menetap di negara ini, bermula dengan Zaman Paleolitik.",
    hoabinhianNote: "Di Asia Tenggara, Zaman Mesolitik dikenali sebagai Zaman Hoabinhian kerana unsur Zaman Mesolitik Eropah tidak ditemukan di sini — sebaliknya alatan kerikil repih Zaman Paleolitik lebih banyak ditemukan. Madeleine Colani, ahli arkeologi Perancis, memperkenalkan istilah ini pada tahun 1932, sempena nama Hoa-binh di utara Vietnam.",
    sitesByEra: [
      { era: "Zaman Paleolitik", dateRange: "40,000 SM", sites: ["Tingkayu, Sabah", "Gua Niah, Sarawak", "Kota Tampan, Perak", "Lembah Mansuli, Sabah"] },
      { era: "Zaman Mesolitik (Hoabinhian)", dateRange: "12,000 SM – 2,800 SM", sites: ["Jenderam Hilir, Selangor", "Gua Madai, Sabah", "Gua Cha, Ulu Kelantan", "Bukit Tegun Lembu, Perlis"] },
      { era: "Zaman Neolitik", dateRange: "2,800 SM – 500 SM", sites: ["Gua Kecil, Pahang", "Sungai Tembeling, Pahang", "Lubang Angin, Sarawak", "Gua Tapadong, Sabah", "Jenderam Hilir, Selangor"] },
      { era: "Zaman Logam", dateRange: "500 SM – 500 M", sites: ["Sungai Tembeling, Pahang", "Lembah Bernam, Selangor"] },
    ],
  },
  keyExamFacts: [
    "Zaman Prasejarah bermaksud zaman sebelum manusia mengenal tulisan — turut dikenali sebagai 'nirleka'",
    "Zaman Batu terbahagi kepada 3 tahap: Paleolitik (Batu Lama), Mesolitik (Batu Pertengahan), Neolitik (Batu Baru)",
    "Tempoh: Paleolitik 2.5 juta tahun–8,000 SM; Mesolitik 12,000–4,000 SM; Neolitik 10,000–2,000 SM; Logam 3,500 SM–500 M",
    "Lenggong, Perak, adalah antara tapak prasejarah terpenting di Asia Tenggara — Rangka Perak Man (11,000-10,000 SM)",
    "Manusia telah menetap di Malaysia sejak 40,000 tahun lalu (Zaman Paleolitik)",
    "Zaman Mesolitik Asia Tenggara dikenali sebagai Zaman Hoabinhian, diperkenalkan oleh Madeleine Colani pada 1932",
    "Kehidupan manusia prasejarah dikaji melalui 7 ciri: tempat kediaman, peralatan, pengumpulan makanan, kegiatan ekonomi, organisasi sosial, kepercayaan, kesenian",
    "6 aktiviti prasejarah yang diteruskan hingga kini: pertanian, memburu/menternak, pembuatan peralatan, tembikar, pengebumian (ideofak), monumen/seni bina",
  ],
  keyTerms: [
    "Zaman Prasejarah",
    "Nirleka",
    "Zaman Batu",
    "Zaman Logam",
    "Zaman Paleolitik",
    "Zaman Mesolitik",
    "Zaman Neolitik",
    "Zaman Hoabinhian",
    "Ekofak",
    "Mikrolit",
    "Animisme",
    "Ritual",
    "Ideofak",
    "Organisasi Sosial",
    "Nomad",
    "Sara diri",
    "Komersial",
  ],
  chapterSummary:
    "Bab 3 menerangkan maksud Zaman Prasejarah dan pembahagiannya kepada Zaman Batu (Paleolitik, Mesolitik, Neolitik) dan Zaman Logam, lokasi tapak prasejarah di dunia dan Asia Tenggara (termasuk Lenggong, Malaysia), tujuh ciri kehidupan manusia prasejarah merentas empat era, enam aktiviti prasejarah yang diteruskan hingga kini, dan bukti Zaman Prasejarah di Malaysia sejak 40,000 tahun lalu merentas Paleolitik, Hoabinhian, Neolitik dan Logam.",
};
