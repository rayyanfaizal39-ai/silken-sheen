// sej3-chapter1-content.ts
// Source-verified content for Sejarah Form 3, Bab 1 — Kedatangan Kuasa Barat (Arrival of Western Powers)
// Sourced from SEJ_FORM_3.pdf (pages 2-27)
// Content data only — no presentation markup.

export interface GovernanceTier {
  tier: string;
  points: string[];
}

export interface CurrencyExample {
  name: string;
  origin: string;
}

export interface EraFactors {
  era: string;
  factors: { name: string; description: string }[];
}

export interface ColonialClaim {
  power: string;
  claim: string;
}

export interface StrategyTerm {
  term: string;
  definition: string;
}

export interface Sej3Ch1Content {
  hook: { title: string; body: string };
  stability: {
    intro: string;
    governance: GovernanceTier[];
    legalSystems: { type: string; examples: string[] }[];
    foreignRelationsBenefit: string[];
  };
  prosperity: {
    intro: string;
    naturalResources: string[];
    craftsmanship: string[];
    economicSystem: {
      ports: string[];
      weightsAndMeasures: string[];
      currency: CurrencyExample[];
      taxation: string;
    };
    education: { formal: string[]; informal: string[] };
  };
  arrivalFactors: {
    intro: string;
    eastIndiaCompanies: { name: string; founded: string; nation: string }[];
    byEra: EraFactors[];
    suezCanal: { builder: string; startYear: string; distanceSaved: string };
    ideologySlogans: { power: string; slogan: string; meaning: string }[];
  };
  competition: {
    intro: string;
    colonialClaims: ColonialClaim[];
  };
  strategies: {
    intro: string;
    policyShift: { year: string; event: string; meaning: string };
    dutchStrategies: string[];
    britishStrategies: StrategyTerm[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej3Ch1Content: Sej3Ch1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebelum orang Eropah tiba, negara kita sudah mempunyai mata wang emas sendiri, sistem cukai yang teratur, dan pelabuhan yang menghubungkan China dengan India. Bab ini menunjukkan bahawa penjajahan bukan berlaku kerana kelemahan tempatan — sebaliknya, kestabilan dan kekayaan kitalah yang menarik kedatangan kuasa Barat."
  },
  stability: {
    intro: "Negara kita telah mewarisi sistem pemerintahan beraja dan pentadbiran yang mantap, disokong muafakat antara golongan pemerintah dengan orang yang diperintah.",
    governance: [
      { tier: "Peringkat Negeri", points: ["Diketuai raja atau sultan — lambang kedaulatan negeri", "Kaum kerabat diraja dan pembesar membantu pentadbiran"] },
      { tier: "Jajahan dan Daerah", points: ["Ditadbir pembesar yang dilantik sultan", "Menjaga keamanan, kemakmuran, kestabilan dan kedaulatan negeri"] },
      { tier: "Kampung", points: ["Unit paling kecil dalam sistem pemerintahan Melayu", "Ketua kampung ialah Penghulu atau Penggawa", "Menyampaikan arahan daripada raja/pembesar kepada orang kampung"] }
    ],
    legalSystems: [
      { type: "Undang-undang tidak bertulis (Adat)", examples: ["Adat Perpatih"] },
      { type: "Undang-undang bertulis", examples: ["Hukum Kanun Melaka", "Hukum Kanun Pahang", "Undang-Undang 99 Perak"] }
    ],
    foreignRelationsBenefit: ["Meluaskan pengaruh", "Melindungi daripada ancaman musuh", "Memajukan ekonomi negeri", "Menstabilkan sistem pemerintahan"]
  },
  prosperity: {
    intro: "Negara kita terkenal di persada antarabangsa kerana memiliki kekayaan hasil bumi dan sumber alam, dengan kemuncak kemakmuran ialah perkembangan kegiatan keintelektualan dan persuratan.",
    naturalResources: ["Bijih timah, emas dan perak (dilombong melalui mendulang dan melampan)", "Hasil hutan: rempah-ratus, damar, rotan, kapur barus, getah jelutung, kayu gaharu, kayu cendana", "Hasil laut: sirip ikan yu, timun laut, rumpai laut, mutiara"],
    craftsmanship: ["Menganyam daun mengkuang/pandan/nipah dan buluh menjadi tikar atau bakul", "Bertukang kayu, membuat perahu, membuat perabot rotan, menempa senjata tradisional", "Di Sarawak: menenun kain pua dan menyulam selendang"],
    economicSystem: {
      ports: ["Johor", "Kedah", "Klang", "Melaka — dikendalikan Syahbandar"],
      weightsAndMeasures: ["Sukatan Melayu: kepul, leng, kal, cupak, gantang", "Sistem China diambil: kati, tahil, pikul", "Sistem India untuk emas/perak: saga, mayam, bungkal"],
      currency: [
        { name: "Mata wang emas Kedah", origin: "Kedah" },
        { name: "Duit kijang (mata wang emas Kelantan)", origin: "Kelantan" },
        { name: "Duit pitih Terengganu (1835-1920)", origin: "Terengganu" }
      ],
      taxation: "Cukai dikenakan ke atas hasil perlombongan, pertanian, hasil hutan dan perdagangan — menjadi sumber pendapatan pemerintah"
    },
    education: {
      formal: ["Pendidikan agama dan ilmu formal di institusi tertentu"],
      informal: ["Asuhan institusi keluarga — bercucuk tanam, menangkap ikan, bertukang, kraf tangan", "Disampaikan melalui pantun, syair, peribahasa, pepatah, pantang larang, cerita teladan (contoh: Si Tanggang Anak Derhaka)", "Di Sarawak/Sabah: cerita lisan tentang amalan/kepercayaan turun-temurun, kemahiran bersawah/berternak/berburu/menyumpit"]
    }
  },
  arrivalFactors: {
    intro: "Kestabilan dan kemakmuran negara kita menyebabkan kuasa-kuasa Barat berminat untuk memiliki kekayaan tersebut.",
    eastIndiaCompanies: [
      { name: "Syarikat Hindia Timur Inggeris (SHTI)", founded: "1600", nation: "England — hak monopoli perdagangan rempah di Kepulauan Melayu" },
      { name: "Syarikat Hindia Timur Belanda", founded: "1602", nation: "Belanda — monopoli perdagangan di Timur" },
      { name: "Syarikat Hindia Timur Perancis", founded: "1664", nation: "Perancis — berdagang di Asia" }
    ],
    byEra: [
      { era: "Abad Ke-16", factors: [
        { name: "Barangan Mewah", description: "Rempah-ratus, minyak wangi, emas, perak, batu permata, gading, dan barangan China (teh, sutera, tembikar)" },
        { name: "Pusat Pengumpulan Barang", description: "China mahukan emas, perak, bijih timah, rempah-ratus dari Kepulauan Melayu — memerlukan pusat pengumpulan di tengah laluan India-China" },
        { name: "Pelabuhan Persinggahan", description: "Diperlukan untuk berlindung semasa menunggu peralihan angin monsun sebelum belayar ke Canton" },
        { name: "Agama Kristian", description: "Sepanyol dan Portugal (negara Kristian Katolik) menekankan penyebaran agama di seberang laut" }
      ]},
      { era: "Abad Ke-17 dan Ke-18", factors: [
        { name: "Revolusi Perindustrian", description: "Bermula di Britain sejak abad ke-17; menjelang 1870-an Jerman dan Perancis turut menjadi negara perindustrian — memerlukan bahan mentah berterusan dan pasaran lebih luas" }
      ]},
      { era: "Abad Ke-19 dan Ke-20", factors: [
        { name: "Perkembangan Industri Kereta", description: "Permintaan getah asli melambung untuk tayar dan penebat elektrik" },
        { name: "Kesuburan Tanah", description: "Tanaman eksport (getah, tebu, tembakau, padi) dan hasil bumi (bijih timah, bijih besi, emas, petroleum, arang batu)" },
        { name: "Industri Mengetin", description: "Ciptaan baharu di Amerika Syarikat memerlukan bijih timah; permintaan melambung selepas 1840" },
        { name: "Ciptaan Kapal Wap", description: "Membawa muatan lebih banyak, lebih cepat, menjimatkan kos" },
        { name: "Persaingan Kuasa Barat", description: "Britain, Jerman, Perancis, Sepanyol, Amerika Syarikat bersaing menakluk kawasan — semakin luas tanah jajahan, semakin tinggi sanjungan" },
        { name: "Ciptaan Telegraf", description: "Membolehkan ahli perniagaan Eropah/Amerika berhubung pantas dengan wakil di Tanah Melayu" }
      ]}
    ],
    suezCanal: { builder: "Ferdinand de Lesseps (Perancis)", startYear: "1859", distanceSaved: "Laluan Tanjung Harapan: 12,400 batu → Laluan Terusan Suez: 8,000 batu" },
    ideologySlogans: [
      { power: "British", slogan: "Beban Orang Putih", meaning: "Tanggungjawab dan tugas mereka membantu serta memberikan kesejahteraan kepada peribumi wilayah jajahan" },
      { power: "Perancis", slogan: "Tugas Menyebarkan Tamadun", meaning: "Menyebarkan tamadun kepada penduduk dunia bukan Barat yang dianggap mundur" }
    ]
  },
  competition: {
    intro: "Kuasa-kuasa Barat berlumba-lumba meluaskan kuasa demi kepentingan ekonomi. Negeri-negeri Melayu, Sarawak dan Sabah kaya dengan bahan mentah dan kawasan pasaran, menyebabkan British bimbang dengan kemaraan kuasa Barat lain.",
    colonialClaims: [
      { power: "British", claim: "Menjadikan Kesultanan Brunei sebagai negeri naungan British" },
      { power: "Perancis", claim: "Meluaskan kuasa di Indochina; merancang terusan di Segenting Kra" },
      { power: "Rusia", claim: "Berhasrat membuka petempatan di Ujung Salang" },
      { power: "Jerman", claim: "Berusaha mendapatkan Pulau Langkawi" },
      { power: "Amerika Syarikat", claim: "Ingin bertapak di Terengganu" },
      { power: "Keluarga Brooke", claim: "Menguasai wilayah Sarawak (1853-1905), meluas hingga sempadan Brunei" },
      { power: "Syarikat Borneo Utara British (SBUB)", claim: "Membeli wilayah Sabah daripada Sultan Brunei dan Sultan Sulu" },
      { power: "Portugis", claim: "Berusaha mendapatkan Timor Leste" },
      { power: "Sepanyol", claim: "Menakluki Kesultanan Sulu" },
      { power: "Belanda", claim: "Berusaha mendapatkan seluruh Kepulauan Hindia Timur" }
    ]
  },
  strategies: {
    intro: "Kuasa-kuasa Barat menggunakan pelbagai strategi berbeza — Portugis menyerang secara fizikal, Belanda menggunakan serangan fizikal/perjanjian/pakatan, British lebih bersifat diplomasi berdasarkan isu setempat.",
    policyShift: { year: "1873", event: "Parti Konservatif mengambil alih pimpinan kerajaan Britain daripada Parti Liberal", meaning: "Menukar dasar tidak campur tangan kepada dasar campur tangan British di negeri-negeri Melayu — Andrew Clarke dihantar menggantikan Gabenor Harry Ord untuk mencari alasan memaksa penerimaan naungan British" },
    dutchStrategies: ["Serangan fizikal", "Pakatan", "Perjanjian"],
    britishStrategies: [
      { term: "Manipulasi", definition: "Tindakan mengatur sesuatu dengan cara bijaksana, mengambil kesempatan atas sesuatu perkara, untuk mencapai tujuan yang dikehendaki" },
      { term: "Ugutan/Desakan", definition: "Menakut-nakutkan dengan menyatakan akan melakukan tindakan buruk atau pernyataan mengugut" },
      { term: "Tipu Helah", definition: "Mengenakan pengaruh atau tipu helah terhadap seseorang/pihak untuk mendapatkan sesuatu" },
      { term: "Perjanjian", definition: "Peristiwa seseorang/pihak berjanji kepada pihak lain untuk melaksanakan sesuatu hal" },
      { term: "Pakatan", definition: "Permuafakatan dan kerjasama antara dua pihak atau lebih dalam melaksanakan sesuatu" },
      { term: "Pajakan", definition: "Strategi yang lama-kelamaan menyebabkan hak tempatan tergadai" },
      { term: "Serangan Fizikal", definition: "Tindakan ketenteraan langsung untuk menguasai wilayah" }
    ]
  },
  keyExamFacts: [
    "Sistem pemerintahan negara kita: Sultan (negeri) → Pembesar (jajahan/daerah) → Penghulu/Penggawa (kampung)",
    "Undang-undang bertulis: Hukum Kanun Melaka, Hukum Kanun Pahang, Undang-Undang 99 Perak; tidak bertulis: Adat Perpatih",
    "3 syarikat dagangan Timur ditubuhkan: SHTI (1600, England), Syarikat Hindia Timur Belanda (1602), Syarikat Hindia Timur Perancis (1664)",
    "Terusan Suez dibina Ferdinand de Lesseps (mula 1859) — memendekkan laluan dari 12,400 batu kepada 8,000 batu",
    "Slogan ideologi penjajahan: 'Beban Orang Putih' (British), 'Tugas Menyebarkan Tamadun' (Perancis)",
    "1873: Parti Konservatif menukar dasar British daripada tidak campur tangan kepada campur tangan",
    "Andrew Clarke menggantikan Gabenor Harry Ord untuk melaksanakan dasar campur tangan British",
    "Strategi Belanda: serangan fizikal, pakatan, perjanjian",
    "Strategi British (lebih banyak): manipulasi, ugutan/desakan, tipu helah, perjanjian, pakatan, pajakan, serangan fizikal",
    "Keluarga Brooke menguasai Sarawak 1853-1905; SBUB membeli wilayah Sabah daripada Brunei dan Sulu"
  ],
  keyTerms: [
    "Penghulu", "Penggawa", "Adat Perpatih", "Hukum Kanun Melaka", "Syahbandar",
    "Duit kijang", "Terusan Suez", "Beban Orang Putih", "Dasar campur tangan",
    "Andrew Clarke", "Manipulasi", "Ugutan/Desakan", "Tipu Helah", "Pajakan"
  ],
  chapterSummary: "Bab 1 menjelaskan kestabilan (sistem pemerintahan, perundangan, hubungan luar) dan kemakmuran (hasil bumi, sistem ekonomi, keintelektualan) negara kita sebelum penjajahan, faktor kedatangan kuasa Barat merentas 3 era (abad ke-16: barangan mewah/agama; abad 17-18: Revolusi Perindustrian; abad 19-20: industri getah/kereta/mengetin, Terusan Suez, kapal wap, telegraf), persaingan kuasa Barat mendapatkan tanah jajahan di rantau ini, serta perbezaan strategi Belanda (serangan fizikal/pakatan/perjanjian) berbanding British (turut termasuk manipulasi, ugutan, tipu helah, pajakan)."
};

export default sej3Ch1Content;
