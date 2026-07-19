// sej3ch2-content.ts
// Source-verified content for Sejarah Form 3, Bab 2 — Pentadbiran Negeri-negeri Selat (Straits Settlements)
// Sourced from SEJ_FORM_3.pdf (pages 28-55)
// Content data only — no presentation markup.

export interface AcquisitionEvent {
  settlement: string;
  keyFigures: string[];
  narrative: string[];
  keyDates: { date: string; event: string }[];
}

export interface TreatyTerm {
  party: string;
  terms: string[];
}

export interface AdminEra {
  era: string;
  years: string;
  structure: string[];
  notes: string[];
}

export interface Sej3Ch2Content {
  hook: { title: string; body: string };
  acquisitions: AcquisitionEvent[];
  londonTreaty1824: {
    background: string;
    priorWars: { war: string; years: string }[];
    treatyDetails: { date: string; place: string; parties: string };
    terms: TreatyTerm[];
    effects: {
      divisionOfAlamMelayu: string;
      johorRiauBreakup: string[];
    };
  };
  formation: {
    intro: string;
    preFormationStatus: { settlement: string; years: string; facts: string[] }[];
    formationYear: string;
    importance: string[];
    laterTerritories: { name: string; yearAdded: string; note: string }[];
  };
  administration: {
    eras: AdminEra[];
    transferFactors: string[];
    notableFact: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej3Ch2Content: Sej3Ch2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Singapura mempunyai dua sultan pada satu masa — direka oleh Stamford Raffles sendiri untuk mengesahkan pendudukan British. Bab ini mendedahkan bagaimana Pulau Pinang, Singapura dan Melaka jatuh ke tangan British melalui tipu helah, manipulasi politik dan satu perjanjian yang membelah Alam Melayu tanpa merujuk raja-raja Melayu sendiri."
  },
  acquisitions: [
    {
      settlement: "Pulau Pinang",
      keyFigures: ["Francis Light", "Sultan Muhammad Jiwa (1710-1778)", "Sultan Abdullah (1778-1798)"],
      narrative: [
        "1759: Batu Uban dibuka oleh orang Melayu dari Sumatera — petempatan tersusun sudah wujud di Pulau Pinang 27 tahun sebelum kedatangan Francis Light",
        "Krisis perebutan takhta Kedah: Sultan Muhammad Jiwa melantik Tunku Abdullah sebagai Raja Muda; kerabat diraja yang tidak bersetuju berpakat dengan Bugis Selangor",
        "SHTI (diwakili Edward Monckton) enggan memberi jaminan perlindungan — rundingan gagal",
        "Ancaman Siam: Sultan Abdullah menawarkan Pulau Pinang sebagai pangkalan SHTI dengan syarat bantuan ketenteraan melawan Siam",
        "Francis Light berjanji SHTI akan memenuhi syarat tersebut — Sultan Abdullah membenarkan petempatan dibuka 1786 sementara menunggu jawapan rasmi",
        "Francis Light menamakan pulau itu Prince of Wales Island; petempatan dinamakan Georgetown",
        "1786: Siam menakluk Patani, mengancam Kedah — SHTI enggan membantu kerana tiada perjanjian rasmi",
        "Sultan Abdullah, menyedari tertipu, menghimpunkan tentera di Seberang Perai untuk merampas semula — tewas kepada Francis Light dan tentera SHTI",
        "1791: Sultan Abdullah dipaksa menandatangani Perjanjian Persahabatan dan Keamanan British-Kedah, secara rasmi mengiktiraf pendudukan British",
        "1800: George Leith (Gabenor Pulau Pinang) mendesak Sultan Dhiauddin (1798-1804) menyerahkan Seberang Perai — dinamakan Province of Wellesley"
      ],
      keyDates: [
        { date: "1759", event: "Batu Uban dibuka oleh orang Melayu dari Sumatera" },
        { date: "1786", event: "Francis Light membuka petempatan di Pulau Pinang" },
        { date: "1791", event: "Perjanjian dipaksa mengiktiraf pendudukan British" },
        { date: "1800", event: "Seberang Perai diserahkan, dinamakan Province of Wellesley" }
      ]
    },
    {
      settlement: "Singapura",
      keyFigures: ["Stamford Raffles", "William Farquhar", "Temenggung Abdul Rahman", "Tengku Hussein", "Tengku Abdul Rahman"],
      narrative: [
        "Januari 1819: Raffles dan Farquhar tiba, berunding dengan Temenggung Abdul Rahman untuk mendirikan petempatan",
        "Temenggung menegaskan perjanjian perlu pengesahan Sultan Johor Riau — ketika itu Sultan Abdul Rahman (bersekutu baik dengan Belanda)",
        "Isu pewarisan takhta: Sultan Mahmud Shah III mangkat 1812; Tengku Abdul Rahman (bongsu) hadir semasa pemakaman di Lingga dan ditabalkan (diiktiraf Bugis dan Belanda); Tengku Hussein (sulung) tidak hadir kerana berada di Pahang",
        "Raffles memanipulasikan isu ini — memujuk Temenggung menjemput Tengku Hussein ke Singapura dan mengisytiharkannya sebagai Sultan Johor Riau bergelar Sultan Hussein Muhammad Shah",
        "Akibatnya Kesultanan Johor Riau mempunyai DUA sultan serentak"
      ],
      keyDates: [
        { date: "Januari 1819", event: "Raffles dan Farquhar tiba di Singapura" },
        { date: "Ogos 1824", event: "Sultan Hussein dan Temenggung Abdul Rahman didesak menandatangani penyerahan Singapura kepada British" },
        { date: "1835", event: "Sultan Hussein mangkat di Melaka (selepas berpindah dari Kampung Gelam)" }
      ]
    }
  ],
  londonTreaty1824: {
    background: "Persaingan British-Belanda di Alam Melayu membawa kepada perancangan pembahagian kawasan pengaruh, didorong 3 faktor: menamatkan pertikaian Singapura, dasar persahabatan British-Belanda di Eropah, dan penyelesaian demi perdamaian (mengelak kos peperangan selepas Perang Napoleon).",
    priorWars: [
      { war: "Perang British-Belanda Pertama", years: "1652-1654" },
      { war: "Perang British-Belanda Kedua", years: "1665-1667" },
      { war: "Perang British-Belanda Ketiga", years: "1672-1674" },
      { war: "Perang British-Belanda Keempat", years: "1781-1784" }
    ],
    treatyDetails: { date: "17 Mac 1824", place: "London, England", parties: "British dan Belanda" },
    terms: [
      { party: "British", terms: ["Berundur dari Sumatera", "Menyerahkan Bengkahulu kepada Belanda", "Tidak membuka petempatan baharu di Kepulauan Riau Lingga dan kepulauan selatan Singapura"] },
      { party: "Belanda", terms: ["Mengiktiraf petempatan British di Singapura", "Menyerahkan Melaka dan jajahan takluknya kepada British", "Tidak membuka petempatan baharu di Tanah Melayu"] }
    ],
    effects: {
      divisionOfAlamMelayu: "Selat Melaka dan Selat Singapura dijadikan sempadan memisahkan wilayah pengaruh British (dikenali 'Tanah Melayu') dan pengaruh Belanda (dikenali 'Hindia Timur Belanda') — dibuat tanpa merujuk Raja-raja Melayu",
      johorRiauBreakup: [
        "Empayar Kesultanan Johor Riau (meliputi Johor, Pahang, Singapura, Kepulauan Riau Lingga) berpecah belah",
        "Singapura menjadi tanah jajahan British — Sultan Hussein dan Temenggung didesak menyerahkannya, Ogos 1824",
        "Sultan Hussein berpindah ke Banda Hilir Melaka, mangkat 1835",
        "Pemerintah Johor memindahkan pusat pemerintahan ke Johor Bahru"
      ]
    }
  },
  formation: {
    intro: "Negeri-negeri Selat merupakan unit pentadbiran dibentuk British untuk mengukuhkan penguasaan terhadap Pulau Pinang, Singapura dan Melaka — dibentuk 1826, dibubarkan 1946.",
    preFormationStatus: [
      { settlement: "Pulau Pinang", years: "1786-1826", facts: ["Ditadbir Francis Light sebagai Pesuruhjaya", "1787: status pelabuhan bebas", "1805: dinaik taraf Presidensi keempat (selepas Benggala, Madras, Bombay)"] },
      { settlement: "Singapura", years: "1819-1826", facts: ["Ditadbir Residen bertanggungjawab kepada Leftenan Gabenor di Bangkahulu", "1823: diisytiharkan pelabuhan bebas"] },
      { settlement: "Melaka", years: "1824-1826", facts: ["Ditadbir Residen Konsular", "Sistem Kapitan diteruskan untuk keamanan komuniti kaum", "Penghulu bertanggungjawab di luar bandar"] }
    ],
    formationYear: "1826 (penggabungan Pulau Pinang, Singapura, Melaka untuk menjimatkan perbelanjaan dan menyeragamkan pentadbiran)",
    importance: [
      "Menguasai keseluruhan Selat Melaka sebagai laluan utama perdagangan",
      "Taraf pelabuhan bebas menarik pedagang tempatan dan luar (Arab, India, China, Eropah, Amerika)",
      "Pusat pengumpulan hasil Alam Melayu (terutama bijih timah) mengimbangi perdagangan dengan China",
      "Pintu masuk buruh luar, mewujudkan masyarakat berbilang kaum",
      "Menarik penanaman modal pelabur luar"
    ],
    laterTerritories: [
      { name: "Dinding", yearAdded: "1874", note: "Diserahkan kembali kepada Perak pada 1935" },
      { name: "Pulau Cocos (Keeling)", yearAdded: "1886", note: "Dipindahkan dari Ceylon" },
      { name: "Labuan", yearAdded: "1887", note: "Digabungkan dengan Borneo Utara pada 1890" },
      { name: "Pulau Krismas", yearAdded: "1900", note: "Diserahkan bersama Cocos kepada Australia pada 1931" }
    ]
  },
  administration: {
    eras: [
      { era: "Di bawah SHTI", years: "1826-1857", structure: ["Diketuai Gabenor", "Residen Konsular membantu pentadbiran", "Pulau Pinang pusat pentadbiran pertama", "1832: pusat dipindah ke Singapura (lebih strategik/maju)"], notes: [] },
      { era: "Di bawah Pejabat India", years: "1858-1867", structure: ["Undang-undang British dikuatkuasakan"], notes: ["Pemberontakan India menyebabkan Pejabat India tidak mampu mentadbir dengan baik", "Tidak melindungi pedagang Negeri-negeri Selat dengan sewajarnya"] },
      { era: "Di bawah Pejabat Tanah Jajahan London", years: "1867-1946", structure: ["Gabenor Negeri-negeri Selat", "Majlis Eksekutif (mengurus pentadbiran)", "Majlis Perundangan (menggubal undang-undang)"], notes: ["Diisytiharkan tanah jajahan British pada 1 April 1867"] }
    ],
    transferFactors: [
      "Tiada wakil Negeri-negeri Selat dalam Majlis Perundangan India",
      "Pejabat India gagal mengawal rompakan kapal dagang dan pertelingkahan kumpulan Cina",
      "Cadangan menjadikan rupee India mata wang menggantikan Dolar Sepanyol",
      "Cadangan cukai pelabuhan mengancam taraf pelabuhan bebas",
      "Pejabat India menjadikan Negeri-negeri Selat tempat buangan banduan, menjejaskan imej"
    ],
    notableFact: "Mohammad Eunos Abdullah (dididik di Raffles Institution, Singapura) merupakan orang Melayu pertama dilantik menganggotai Majlis Perundangan Negeri-negeri Selat"
  },
  keyExamFacts: [
    "1759: Batu Uban dibuka oleh orang Melayu dari Sumatera, sebelum kedatangan Francis Light",
    "Francis Light membuka petempatan Pulau Pinang 1786 melalui tipu helah kepada Sultan Abdullah Kedah",
    "Pulau Pinang dinamakan Prince of Wales Island; petempatannya Georgetown",
    "Seberang Perai diserahkan 1800, dinamakan Province of Wellesley",
    "Raffles dan Farquhar tiba Singapura Januari 1819; memanipulasikan isu pewarisan takhta Johor Riau untuk lantik Sultan Hussein Muhammad Shah",
    "Perjanjian London 1824 (17 Mac 1824) — British serah Bengkahulu, tarik diri Sumatera; Belanda serah Melaka, iktiraf Singapura British",
    "Perjanjian London membahagikan Alam Melayu: Tanah Melayu (British) vs Hindia Timur Belanda",
    "Empayar Kesultanan Johor Riau berpecah akibat Perjanjian London 1824",
    "Negeri-negeri Selat dibentuk 1826 (Pulau Pinang, Singapura, Melaka), dibubarkan 1946",
    "3 era pentadbiran Negeri-negeri Selat: SHTI (1826-1857), Pejabat India (1858-1867), Pejabat Tanah Jajahan London (1867-1946)",
    "Negeri-negeri Selat diisytiharkan tanah jajahan British pada 1 April 1867",
    "Mohammad Eunos Abdullah — orang Melayu pertama dalam Majlis Perundangan Negeri-negeri Selat"
  ],
  keyTerms: [
    "Batu Uban", "Francis Light", "Prince of Wales Island", "Province of Wellesley", "Stamford Raffles",
    "William Farquhar", "Sultan Hussein Muhammad Shah", "Perjanjian London 1824",
    "Lingkungan pengaruh", "Tanah Jajahan Mahkota British", "Pelabuhan bebas",
    "Residen Konsular", "Pejabat Tanah Jajahan", "Mohammad Eunos Abdullah"
  ],
  chapterSummary: "Bab 2 mengkaji peluasan kuasa British di Pulau Pinang (tipu helah Francis Light), Singapura (manipulasi pewarisan takhta Johor Riau oleh Raffles) dan Melaka, Perjanjian London 1824 dan kesannya membahagikan Alam Melayu serta memecahkan empayar Johor Riau, pembentukan Negeri-negeri Selat (1826) dan kepentingannya kepada British, serta pentadbiran Negeri-negeri Selat merentas 3 era hingga pembubarannya pada 1946."
};
