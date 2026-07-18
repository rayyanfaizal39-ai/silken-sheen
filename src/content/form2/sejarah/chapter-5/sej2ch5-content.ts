// sej2ch5-content.ts
// Source-verified content for Sejarah Form 2, Bab 5 — Kesultanan Melayu Melaka
// Sourced from T2_BT_SEJ.pdf (pages 70-95)
// Content data only — no presentation markup.

export interface StrategicFactor {
  factor: string;
  description: string;
}

export interface OfficialRole {
  title: string;
  duties: string[];
}

export interface LegalCode {
  name: string;
  established: string;
  clauseCount: string;
  content: string;
}

export interface EmpireFormationMethod {
  method: string;
  examples: string[];
}

export interface InternalWeakness {
  category: string;
  points: string[];
}

export interface TradeHubAspect {
  name: string;
  description: string;
}

export interface Sej2Ch5Content {
  hook: { title: string; body: string };
  founding: {
    founder: string;
    year: string;
    locationName: string;
    priorUse: string;
    strategicFactors: StrategicFactor[];
  };
  goldenAge: {
    intro: string;
    kingshipSources: string[];
    royalRoles: string[];
    daulatConcept: string;
    royalRegalia: string[];
    notableSultans: { name: string; reignYears: string; trait: string }[];
    administration: {
      systemName: string;
      tiers: string[];
      fourMinisters: OfficialRole[];
      systems: { name: string; description: string }[];
    };
    legalSystem: LegalCode[];
    customaryLaw: { name: string; founder: string; scope: string[]; note: string };
    empire: {
      extent: string;
      formationMethods: EmpireFormationMethod[];
    };
    languageTrade: { linguaFranca: string; languageCount: string };
    foreignRelations: { kingdom: string; relationType: string; benefit: string }[];
  };
  islamSpread: {
    intro: string;
    methods: string[];
  };
  tradeHub: {
    intro: string;
    aspects: TradeHubAspect[];
  };
  fall: {
    intro: string;
    internalWeaknesses: InternalWeakness[];
    portugueseMotives: string[];
    timeline: { date: string; event: string }[];
    defenseStrategies: string[];
    resistance: { event: string; year: string }[];
    finalEnd: string;
    legacy: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch5Content: Sej2Ch5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Dalam masa kurang seabad, sebuah perkampungan nelayan di muara Sungai Bertam berkembang menjadi empayar yang menggunakan 84 bahasa, mempunyai undang-undang laut sendiri, dan menjadi pusat penyebaran Islam yang paling berpengaruh di Alam Melayu — sebelum jatuh dalam tiga serangan Portugis pada 1511."
  },
  founding: {
    founder: "Parameswara",
    year: "Sekitar tahun 1400",
    locationName: "Muara Sungai Bertam (juga dikenali sebagai Sungai Melaka)",
    priorUse: "Pada asalnya sebuah perkampungan nelayan dan tempat berjual beli serta pertukaran barang dagangan",
    strategicFactors: [
      { factor: "Laluan Perdagangan", description: "Kedudukan Melaka di laluan perdagangan utama antara timur dan barat membolehkannya mengawal laluan kapal dagang" },
      { factor: "Bentuk Muka Bumi", description: "Berbukit-bukau, sesuai dijadikan benteng pertahanan dan panduan kapal dagang" },
      { factor: "Benteng Pertahanan Semula Jadi", description: "Pokok bakau dan api-api di pesisir pantai menjadi benteng pertahanan dan pelindung semula jadi yang sukar ditembusi musuh" },
      { factor: "Terlindung Angin Monsun", description: "Muara sungai di Selat Melaka terlindung daripada tiupan angin monsun, membolehkan kapal dagang berlabuh dengan selamat" }
    ]
  },
  goldenAge: {
    intro: "Kesultanan Melayu Melaka berkembang daripada perkampungan nelayan menjadi kerajaan masyhur, disebabkan kepemimpinan raja yang berwibawa, sistem pentadbiran yang cekap dan sistem perundangan yang tersusun.",
    kingshipSources: ["Berdasarkan teks Sulalatus Salatin, pemerintah Melaka berasal daripada zuriat keturunan anak Raja Palembang, dikatakan bersusur galur daripada Iskandar Zulkarnain — memberikan taraf kedudukan tinggi kepada Sultan Melaka dalam kalangan kerajaan lain di Alam Melayu"],
    royalRoles: ["Simbol perpaduan dan kemakmuran", "Ketua angkatan tentera", "Mengetuai hubungan diplomatik", "Menyelaraskan kegiatan ekonomi", "Ketua Agama Islam", "Menegakkan keadilan"],
    daulatConcept: "Daulat merupakan kuasa dan kewibawaan raja sebagai pemimpin. Rakyat mengakui kedaulatan raja dengan memberikan taat setia sepenuhnya dan tidak boleh menderhaka kepada raja.",
    royalRegalia: ["Cap mohor", "Nobat", "Keris", "Lembing", "Mahkota"],
    notableSultans: [
      { name: "Sultan Muzaffar Shah", reignYears: "1446-1456", trait: "Mengutamakan keamanan dan kebajikan rakyat; memulakan penulisan Hukum Kanun Melaka" },
      { name: "Sultan Mansur Shah", reignYears: "-", trait: "Menasihatkan puteranya Sultan Alauddin Riayat Shah supaya bersikap adil terhadap rakyat" },
      { name: "Sultan Mahmud Shah", reignYears: "1489-1511", trait: "Menyusun semula Hukum Kanun Melaka secara teratur; sultan terakhir Melaka sebelum kejatuhan" }
    ],
    administration: {
      systemName: "Sistem Pembesar Empat Lipatan",
      tiers: ["Pembesar Berempat (pusat)", "Pembesar Berlapan (jajahan)", "Pembesar Enam Belas (daerah)", "Pembesar Tiga Puluh Dua (mukim dan kampung)"],
      fourMinisters: [
        { title: "Bendahara", duties: ["Penasihat raja", "Menteri utama peringkat pusat", "Ketua turus angkatan perang", "Ketua hakim", "Pemangku sultan"] },
        { title: "Penghulu Bendahari", duties: ["Pemungut hasil atau ufti", "Ketua segala bendahari", "Ketua urus setia istana", "Ketua syahbandar"] },
        { title: "Temenggung", duties: ["Ketua polis dan penjara", "Penguasa bandar dan kota Melaka", "Pegawai protokol istana", "Hakim di darat"] },
        { title: "Laksamana", duties: ["Ketua angkatan laut", "Pengawal peribadi raja", "Ketua duta", "Ketua utusan ke negara luar", "Hakim di laut"] }
      ],
      systems: [
        { name: "Sistem Serah", description: "Pemberian sebahagian daripada hasil tanaman yang diusahakan oleh rakyat kepada pemerintah, sebagai balasan kepada pembesar yang menyediakan tanah" },
        { name: "Sistem Kerah", description: "Kerja yang dibuat tanpa upah, seperti membina istana, kubu, jalan dan saliran — menunjukkan sikap taat setia dan sedia berkorban" }
      ]
    },
    legalSystem: [
      { name: "Hukum Kanun Melaka", established: "Mula ditulis semasa Sultan Muzaffar Shah (1446-1456); disusun semula semasa Sultan Mahmud Shah (1489-1511)", clauseCount: "44 fasal", content: "Berkaitan hak keistimewaan, tanggungjawab raja dan pembesar; turut memasukkan hukum Islam berkaitan jenayah, jual beli dan kekeluargaan" },
      { name: "Undang-Undang Laut Melaka", established: "Ditulis semasa zaman Sultan Mahmud Shah", clauseCount: "25 fasal", content: "Peraturan pelayaran dan perdagangan — peraturan di laut, tertib berniaga, tanggungjawab nakhoda, anak kapal, kiwi dan syahbandar" }
    ],
    customaryLaw: {
      name: "Adat Temenggung",
      founder: "Datuk Ketemenggungan (Palembang); dibawa masuk ke Melaka awal abad ke-15",
      scope: ["Sistem pemerintahan", "Perwarisan takhta (anak lelaki sulung)", "Perkahwinan", "Perwarisan harta", "Perundangan"],
      note: "Diamalkan di semua negeri Melayu kecuali Negeri Sembilan"
    },
    empire: {
      extent: "Meliputi seluruh Semenanjung Tanah Melayu dan kawasan pantai timur Sumatera, terdiri daripada tanah jajahan dan naungan",
      formationMethods: [
        { method: "Penaklukan", examples: ["Kuala Linggi", "Beruas", "Pahang", "Terengganu", "Kelantan (Semenanjung)", "Siak", "Rokan", "Kampar", "Rupat (Sumatera)"] },
        { method: "Perkahwinan", examples: ["Sultan Mansur Shah berkahwin dengan puteri Majapahit"] },
        { method: "Naungan", examples: ["Raja yang berada di bawah naungan Melaka ditabalkan oleh Sultan Melaka"] }
      ]
    },
    languageTrade: { linguaFranca: "Bahasa Melayu muncul sebagai lingua franca", languageCount: "84 bahasa dipertuturkan di Melaka" },
    foreignRelations: [
      { kingdom: "Siam", relationType: "Diplomatik dan perdagangan (selepas ancaman semasa Parameswara dan Sultan Muzaffar Shah)", benefit: "Bekalan kayu jati, beras dan bahan makanan; jaminan keselamatan" },
      { kingdom: "Pegu, Luzon, Gujerat, Koromandel, Bengal", relationType: "Perdagangan", benefit: "Rangkaian dagangan serantau" },
      { kingdom: "Mesir, Parsi, Turki, Arab", relationType: "Perdagangan dan keagamaan", benefit: "Melaka muncul sebagai pusat perdagangan dan penyebaran Islam yang ulung" },
      { kingdom: "Pasai, Majapahit, Makasar", relationType: "Sesama kerajaan Alam Melayu", benefit: "Perdagangan dan hubungan serantau dalam kalangan kerajaan Alam Melayu" },
      { kingdom: "China, Ryukyu", relationType: "Perdagangan dan diplomatik", benefit: "Rangkaian dagangan dengan Timur Jauh; pengiktirafan dan perlindungan daripada ancaman Siam" }
    ]
  },
  islamSpread: {
    intro: "Melaka muncul sebagai pusat penyebaran agama Islam yang paling berpengaruh di Alam Melayu, dengan penyebaran berlaku melalui pelbagai cara serentak dengan perkembangan empayar dan perdagangan.",
    methods: [
      "Pengislaman pemerintah — pemelukan Islam oleh raja menjadi penggerak utama penyebaran Islam kepada rakyat dan wilayah naungan",
      "Perkahwinan — perkahwinan diraja antara Melaka dengan kerajaan lain turut menyebarkan pengaruh Islam",
      "Ulama dan mubaligh — golongan agama menyebarkan ajaran Islam melalui pengajaran dan dakwah",
      "Perdagangan — pedagang Islam dari Arab, Parsi dan India turut menyebarkan Islam semasa berurus niaga",
      "Peluasan kuasa — Islam tersebar ke wilayah jajahan dan naungan Melaka seiring peluasan empayar"
    ]
  },
  tradeHub: {
    intro: "Kedudukan strategik menjadikan Melaka pusat pengumpulan dan pengedaran barang dagangan serta pusat perkapalan yang dikunjungi pedagang dari dalam dan luar Alam Melayu.",
    aspects: [
      { name: "Syahbandar", description: "Pegawai yang menguruskan hal ehwal pelabuhan, menyelia urusan pedagang asing dan memudahkan aktiviti jual beli" },
      { name: "Cukai Perdagangan", description: "Cukai dikenakan ke atas barang dagangan sebagai salah satu sumber pendapatan utama kerajaan" },
      { name: "Mata Wang", description: "Penggunaan mata wang memudahkan urus niaga di samping amalan tukar barang" },
      { name: "Orang Laut", description: "Menjaga keselamatan perairan, membantu pelayaran dan mengawal kegiatan perdagangan di sekitar Selat Melaka" },
      { name: "Kemudahan Pelabuhan", description: "Menyediakan gudang, tempat tinggal dan kawasan menyimpan barang dagangan bagi pedagang yang singgah" }
    ]
  },
  fall: {
    intro: "Kegemilangan Kesultanan Melayu Melaka berakhir dengan kedatangan Portugis pada tahun 1511.",
    internalWeaknesses: [
      { category: "Masalah Kepimpinan", points: ["Kelemahan Sultan Mahmud Shah dan pembesar menyebabkan ketidakstabilan politik", "Amalan pilih kasih, rasuah dan penyelewengan dalam pentadbiran", "Perbalahan sesama sendiri dalam kalangan pembesar"] },
      { category: "Masalah Perpaduan", points: ["Rakyat tidak bersatu padu", "Persaingan kuasa antara pembesar Melaka menyebabkan perpecahan", "Askar upahan dari luar tidak taat setia kepada Melaka"] }
    ],
    portugueseMotives: ["Kekayaan (mengawal perdagangan rempah)", "Keagamaan (menyebarkan Kristian, menghapuskan penguasaan pedagang Islam)", "Kemasyhuran"],
    timeline: [
      { date: "11 September 1509", event: "Lopez de Sequeira tiba di Melaka; rundingan gagal" },
      { date: "25 Julai 1511", event: "Serangan pertama Alfonso de Albuquerque" },
      { date: "10 Ogos 1511", event: "Serangan kedua" },
      { date: "24 Ogos 1511", event: "Serangan ketiga — Melaka jatuh ke tangan Portugis" }
    ],
    defenseStrategies: ["Menggunakan lancaran dan perahu berapi", "Pertahanan pantai diperteguhkan dengan kayu-kayan, pelbagai jenis meriam dan peti serbuk peluru", "Tembakan meriam bertalu-talu dari pantai", "Menggunakan tentera bergajah"],
    resistance: [
      { event: "Sultan Mahmud Shah berundur ke wilayah naungan dan jajahan, bersemayam di Bentan", year: "1511" },
      { event: "Tiga kali cubaan merampas semula Melaka, semuanya gagal", year: "1515-1519" },
      { event: "Pusat pemerintahan di Bentan dimusnahkan Portugis", year: "1526" },
      { event: "Sultan Mahmud Shah berundur ke Kampar dan mangkat", year: "1528" }
    ],
    finalEnd: "Kesultanan Melayu Melaka yang berpusat di Melaka berakhir pada 24 Ogos 1511",
    legacy: "Legasi kegemilangan Kesultanan Melayu Melaka diwarisi dan diteruskan oleh Kesultanan Johor Riau"
  },
  keyExamFacts: [
    "Kesultanan Melayu Melaka diasaskan oleh Parameswara sekitar tahun 1400 di muara Sungai Bertam",
    "4 faktor strategik lokasi: laluan perdagangan, bentuk muka bumi berbukit, benteng semula jadi (bakau/api-api), terlindung angin monsun",
    "Sistem Pembesar Empat Lipatan: Berempat (pusat), Berlapan, Enam Belas, Tiga Puluh Dua",
    "4 pembesar berempat: Bendahara (penasihat/menteri utama), Penghulu Bendahari (kewangan), Temenggung (keselamatan/kota), Laksamana (laut/diplomasi)",
    "Hukum Kanun Melaka (44 fasal, mula Sultan Muzaffar Shah 1446-1456) dan Undang-Undang Laut Melaka (25 fasal, Sultan Mahmud Shah)",
    "Adat Temenggung diasaskan Datuk Ketemenggungan (Palembang), diamalkan semua negeri Melayu kecuali Negeri Sembilan",
    "3 cara pembentukan empayar: penaklukan, perkahwinan, naungan",
    "84 bahasa dipertuturkan di Melaka; Bahasa Melayu menjadi lingua franca",
    "5 cara penyebaran Islam: pengislaman pemerintah, perkahwinan, ulama/mubaligh, perdagangan, peluasan kuasa",
    "Melaka menjadi pusat pengumpulan dan pengedaran barang serta pusat perkapalan, diurus melalui Syahbandar, cukai perdagangan, mata wang, Orang Laut dan kemudahan pelabuhan",
    "Portugis menyerang Melaka 3 kali (25 Julai, 10 Ogos, 24 Ogos 1511) di bawah Alfonso de Albuquerque",
    "Melaka jatuh ke tangan Portugis pada 24 Ogos 1511",
    "Sultan Mahmud Shah berundur ke Bentan (1511), cuba merampas semula (1515-1519), Bentan dimusnahkan (1526), mangkat di Kampar (1528)",
    "Legasi Kesultanan Melayu Melaka diteruskan oleh Kesultanan Johor Riau"
  ],
  keyTerms: [
    "Parameswara", "Sungai Bertam", "Daulat", "Nobat", "Sistem Pembesar Empat Lipatan",
    "Bendahara", "Temenggung", "Laksamana", "Sistem Serah", "Sistem Kerah", "Hukum Kanun Melaka",
    "Undang-Undang Laut Melaka", "Adat Temenggung", "Kiwi", "Lancaran", "Alfonso de Albuquerque",
    "Lopez de Sequeira", "Lingua franca", "Syahbandar", "Orang Laut", "Pengislaman pemerintah"
  ],
  chapterSummary: "Bab 5 mengkaji pengasasan Kesultanan Melayu Melaka oleh Parameswara (~1400) di lokasi strategik Sungai Bertam, kegemilangannya melalui kepemimpinan raja berdaulat, Sistem Pembesar Empat Lipatan, sistem perundangan (Hukum Kanun Melaka, Undang-Undang Laut Melaka, Adat Temenggung), empayar luas dan hubungan luar, kedudukannya sebagai pusat penyebaran Islam dan pusat perdagangan entrepot, serta pengakhirannya melalui kelemahan dalaman dan tiga serangan Portugis yang menamatkan Kesultanan Melayu Melaka di Melaka pada 24 Ogos 1511."
};
