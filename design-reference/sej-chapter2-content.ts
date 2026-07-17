// sej-chapter2-content.ts
// Source-verified content for Sejarah Form 1, Bab 2 — Zaman Air Batu (Ice Age)
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 24-39)
// Content data only — no presentation markup.

export interface EarthFormationStage {
  yearsAgo: string;
  description: string;
}

export interface IceAgeEpoch {
  name: string;
  duration: string;
  facts: string[];
}

export interface Characteristic {
  aspect: string;
  description: string;
}

export interface ChangeEffect {
  effect: string;
  description: string;
}

export interface Sej2Content {
  hook: { title: string; body: string };
  ourWorld: {
    intro: string;
    earthAge: string;
    formationStages: EarthFormationStage[];
    oceanFact: string;
    oceans: string[];
    landDefinitions: { term: string; definition: string }[];
  };
  iceAgeOverview: {
    definition: string;
    glaciationStages: string[];
    endCause: string;
  };
  epochs: IceAgeEpoch[];
  lateIceAgeCharacteristics: Characteristic[];
  changes: ChangeEffect[];
  southeastAsiaEffects: {
    seaLevelRise: string;
    sundaShelf: {
      definition: string;
      area: string;
      connectedRegions: string[];
    };
    culturalSignificance: string;
    formationResults: string[];
    extinctAnimals: string[];
    mammalStat: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Content: Sej2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Tahukah anda Malaysia, Indonesia, selatan Thailand dan selatan Filipina pernah menjadi SATU daratan besar yang boleh dilalui dengan berjalan kaki? Bab ini menceritakan bagaimana Zaman Air Batu membentuk rupa bumi yang kita kenali hari ini — dan kenapa kita berkongsi bahasa dan budaya dengan jiran serantau."
  },
  ourWorld: {
    intro: "Pengetahuan tentang sejarah bukan sahaja membolehkan kita mengenali diri kita tetapi juga memahami tentang dunia. Bumi pada hari ini telah melalui pelbagai perubahan yang memberikan kesan terhadap rupa bentuk fizikal, iklim, cuaca, hidupan dan kedalaman lautan.",
    earthAge: "Ahli sains menjangkakan usia bumi melebihi 4.6 bilion tahun",
    formationStages: [
      { yearsAgo: "650 juta tahun dahulu", description: "Tiada hidupan" },
      { yearsAgo: "390 juta tahun dahulu", description: "Air laut masih tawar; wujud hidupan seperti ikan dan amfibia" },
      { yearsAgo: "195 juta tahun dahulu", description: "Zaman Jurasik; hidupan utama ialah dinosaur" },
      { yearsAgo: "94 juta tahun dahulu", description: "Dinosaur mengalami kepupusan; rupa bentuk benua mula kelihatan" },
      { yearsAgo: "18,000 tahun dahulu", description: "Kebanyakan binatang telah wujud seperti kuda, badak sumbu, anjing, kucing; paras air laut meningkat" },
      { yearsAgo: "Hari ini", description: "Bentuk bumi seperti yang kita kenali sekarang" }
    ],
    oceanFact: "Lautan merupakan kawasan air masin yang meliputi 71 peratus bentuk muka bumi",
    oceans: ["Lautan Pasifik", "Lautan Atlantik", "Lautan Hindi", "Lautan Selatan", "Lautan Artik"],
    landDefinitions: [
      { term: "Selat", definition: "Kawasan perairan sempit yang memisahkan dua kawasan daratan" },
      { term: "Teluk", definition: "Bahagian perairan laut yang menghala ke daratan, dibatasi oleh daratan" }
    ]
  },
  iceAgeOverview: {
    definition: "Zaman Air Batu ialah garis masa geologi yang menunjukkan suhu bumi menurun ke tahap membeku dalam jangka masa yang lama. Kutub Utara dan Selatan diliputi lapisan ais tebal.",
    glaciationStages: ["Tahap pertama: 900 hingga 600 juta tahun dahulu", "Tahap kedua: 250 hingga 80,000 juta tahun dahulu", "Tahap ketiga: 10,000 juta tahun dahulu"],
    endCause: "Perubahan iklim dunia kepada suhu panas menyebabkan berakhirnya Zaman Air Batu"
  },
  epochs: [
    { name: "Zaman Miosen", duration: "23 juta hingga 5 juta tahun dahulu", facts: ["Gunung-ganang hari ini terbentuk secara fizikal", "Mamalia wujud dan berkembang di bumi, laut dan air", "Suhu dunia panas dan kering"] },
    { name: "Zaman Pliosen", duration: "5.3 juta hingga 2.6 juta tahun dahulu", facts: ["Berlaku penyejukan global berbanding Zaman Miosen yang lebih panas", "Penyebaran besar padang rumput dan savana", "Jambatan darat Panama antara Amerika Utara dan Selatan terbentuk", "Grand Canyon (Colorado) terbentuk pada zaman ini"] },
    { name: "Zaman Pleistosen", duration: "2.5 juta hingga 10,000 tahun dahulu", facts: ["Glasier utama berlaku sebanyak 11 kali", "Manusia mengetahui cara membuat api", "Manusia dipercayai sampai ke Australia melalui Pentas Sunda sekitar 50,000 tahun dahulu"] },
    { name: "Zaman Holosen", duration: "10,000 tahun dahulu hingga kini", facts: ["Kemajuan besar dalam kehidupan manusia", "Manusia mengetahui aktiviti pertanian", "Roda dan tulisan kuneiform dicipta kira-kira 5,500 tahun dahulu", "Tamadun berkembang dalam keagamaan, pendidikan, pentadbiran, undang-undang"] }
  ],
  lateIceAgeCharacteristics: [
    { aspect: "Jambatan Darat", description: "Permukaan air laut membeku, paras air laut rendah, pulau-pulau bersambung dengan tanah besar — memudahkan manusia dan binatang bermigrasi" },
    { aspect: "Kehidupan Manusia", description: "Manusia tinggal di kawasan tanah pamah yang sejuk, hidup secara nomad dan memburu binatang" },
    { aspect: "Ciri Fizikal Bumi", description: "Permukaan air laut membeku, sebahagian besar bumi dilitupi salji" },
    { aspect: "Binatang", description: "Mamot berbulu, badak, kuda, dan singa tinggal di kawasan tanah pamah yang sejuk" },
    { aspect: "Tumbuhan", description: "Tumbuhan utama ialah rumput dan tumbuhan renek yang menjalar" },
    { aspect: "Suhu", description: "Suhu dunia terlalu sejuk, dipenuhi salji di kutub dan Eropah; namun di Asia suhu mulai panas, membolehkan manusia berhijrah ke sana" }
  ],
  changes: [
    { effect: "Perubahan Rupa Bentuk Fizikal Bumi", description: "Glasier menukar wajah bumi; air batu cair dari tanah tinggi membawa batu dan tanah, melimpahi laut dan kawasan tanah tinggi; paras air laut berubah sedalam 100 meter" },
    { effect: "Pembentukan Tasik Air Tawar", description: "Kecairan air batu membentuk tasik seperti Great Lakes (Kanada) dan Tasik Dayang Bunting (Malaysia); bentuk saliran sungai turut berubah" },
    { effect: "Kepupusan Haiwan", description: "Haiwan Zaman Pleistosen pupus, termasuk mamot, sloth, dan harimau bertaring" },
    { effect: "Pergerakan Manusia", description: "Manusia bergerak keluar dari Afrika, mendiami Eropah dan Asia secara beransur-ansur, dipengaruhi suhu yang tidak lagi terlalu sejuk" }
  ],
  southeastAsiaEffects: {
    seaLevelRise: "Perubahan paras air laut aktif berlaku 17,000 hingga 20,000 tahun dahulu; aras laut naik antara 100 hingga 120 meter",
    sundaShelf: {
      definition: "Pentas Sunda merupakan tunjang kebenuaan di Asia Tenggara — daratan yang mempunyai kawasan tanah rendah di antara pulau-pulau yang wujud pada hari ini",
      area: "Melebihi 3.2 juta kilometer persegi",
      connectedRegions: ["Burma (Myanmar)", "Thailand", "Laos", "Kemboja", "Vietnam", "Semenanjung Tanah Melayu", "Borneo", "Singapura"]
    },
    culturalSignificance: "Manusia di rantau Asia Tenggara khususnya Pentas Sunda berkongsi tamadun yang sama — kepercayaan, asal usul keturunan, bahasa, budaya dan masyarakat. Contohnya, penduduk Malaysia, Indonesia, selatan Thailand dan selatan Filipina berkongsi bahasa Melayu.",
    formationResults: ["Selat Melaka", "Teluk Siam", "Laut Jawa"],
    extinctAnimals: ["Stegodon (gajah)", "Pachycrocuta (hyena/dubuk) bersaiz besar"],
    mammalStat: "Asia Tenggara didiami oleh 13 peratus mamalia dunia"
  },
  keyExamFacts: [
    "Usia bumi melebihi 4.6 bilion tahun",
    "Terdapat 5 lautan di dunia: Pasifik, Atlantik, Hindi, Selatan, Artik — meliputi 71% muka bumi",
    "Zaman Air Batu terbahagi kepada 4 tahap: Miosen, Pliosen, Pleistosen, Holosen",
    "Pada Zaman Air Batu Akhir, jambatan darat menghubungkan pulau-pulau kerana paras air laut rendah",
    "Kecairan air batu menyebabkan paras air laut naik sedalam 100 meter secara global",
    "Di Asia Tenggara, aras laut naik 100-120 meter (17,000-20,000 tahun dahulu)",
    "Pentas Sunda (>3.2 juta km persegi) menghubungkan Malaysia, Indonesia, Thailand, dan Filipina sebagai satu daratan",
    "Kongsi bahasa Melayu antara Malaysia, Indonesia, selatan Thailand dan selatan Filipina berasal daripada perkongsian Pentas Sunda",
    "Selat Melaka, Teluk Siam dan Laut Jawa terbentuk akibat kenaikan aras laut",
    "Haiwan seperti mamot, sloth, harimau bertaring, stegodon dan pachycrocuta pupus akibat perubahan iklim"
  ],
  keyTerms: [
    "Geologi", "Paleontologi", "Zaman Air Batu", "Pengglasieran", "Zaman Miosen", "Zaman Pliosen",
    "Zaman Pleistosen", "Zaman Holosen", "Jambatan darat", "Nomad", "Pentas Sunda", "Selat", "Teluk"
  ],
  chapterSummary: "Bab 2 menerangkan pembentukan fizikal bumi sejak 650 juta tahun dahulu, konsep Zaman Air Batu dan empat tahapnya (Miosen, Pliosen, Pleistosen, Holosen), ciri-ciri Zaman Air Batu Akhir (jambatan darat, kehidupan nomad, haiwan berbulu tebal), perubahan yang berlaku (kenaikan aras laut, pembentukan tasik, kepupusan haiwan), serta kesan khusus di Asia Tenggara melalui Pentas Sunda yang menghubungkan rantau ini sebagai satu daratan dan asas perkongsian bahasa serta budaya Melayu."
};

export default sej2Content;
