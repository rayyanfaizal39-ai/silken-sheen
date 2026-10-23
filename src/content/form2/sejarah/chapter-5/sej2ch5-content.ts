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
      importance?: string[];
      administration?: string[];
    };
    languageTrade: { linguaFranca: string; languageCount: string };
    foreignRelations: { kingdom: string; relationType: string; benefit: string }[];
  };
  islamSpread: {
    intro: string;
    methods: string[];
    effects?: string[];
  };
  tradeHub: {
    intro: string;
    aspects: TradeHubAspect[];
    features?: string[];
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
    body: "Sebuah perkampungan nelayan di muara Sungai Bertam berkembang menjadi empayar yang meliputi Semenanjung Tanah Melayu dan pantai timur Sumatera, tempat 84 bahasa dipertuturkan dan pusat penyebaran Islam yang unggul di Alam Melayu, sebelum jatuh ke tangan Portugis pada 24 Ogos 1511."
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
      { name: "Sultan Mansur Shah", reignYears: "—", trait: "Mengutamakan keamanan dan kebajikan rakyat; menasihatkan Sultan Alauddin Riayat Shah supaya adil, menyiasat tuduhan dengan teliti dan bekerjasama dengan pegawai" },
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
        { name: "Sistem Kerah", description: "Kerja yang dibuat tanpa upah, seperti membina istana, kubu, jalan dan saliran — menunjukkan sikap taat setia dan sedia berkorban" },
        { name: "Tugas Pembesar", description: "Menjaga keamanan kawasan, mengutip cukai dan hasil melalui sistem serah, serta membekalkan tentera dan tenaga buruh melalui sistem kerah" },
        { name: "Kawasan Pegangan dan Pemakanan", description: "Kawasan pembesar berempat dikenali sebagai kawasan pegangan; kawasan pembesar jajahan dan daerah dikenali sebagai kawasan pemakanan. Cukai yang dikutip diserahkan kepada pemerintah sebagai ufti" }
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
        { method: "Perkahwinan", examples: ["Sultan Mansur Shah dengan puteri Majapahit, Raden Galuh Cendera Kirana"] },
        { method: "Naungan", examples: ["Raja naungan ditabalkan oleh Sultan Melaka", "Lingga, Patani dan Kedah"] }
      ],
      importance: [
        "Politik: meluaskan wilayah dan menyekat pengaruh Siam, Majapahit dan Pasai",
        "Ekonomi: menerima hadiah dan bekalan (hasil pertanian, rempah-ratus, bijih timah) serta menguasai perdagangan Selat Melaka",
        "Sosial: asimilasi budaya dan wujud masyarakat majmuk",
        "Agama: Islam berkembang ke Pahang, Kelantan, Perak, timur Sumatera dan Patani"
      ],
      administration: [
        "Pusat: di Melaka, raja dibantu oleh pembesar pusat",
        "Naungan: mengakui ketuanan Melaka dan menghantar ufti; diketuai pemerintah negeri berkenaan",
        "Jajahan: diketuai pemerintah yang dilantik oleh Sultan Melaka"
      ]
    },
    languageTrade: { linguaFranca: "Bahasa Melayu muncul sebagai lingua franca", languageCount: "84 bahasa dipertuturkan di Melaka" },
    foreignRelations: [
      { kingdom: "Pasai", relationType: "Sama taraf; perkahwinan Sultan Melaka dengan Puteri Ratna Kaumala", benefit: "Perbincangan hal agama membantu Melaka muncul sebagai pusat penyebaran Islam" },
      { kingdom: "Demak", relationType: "Kepentingan bersama dalam perdagangan dan penyebaran Islam", benefit: "Bekalan beras, bahan makanan, rempah-ratus dan tentera" },
      { kingdom: "Majapahit", relationType: "Perkahwinan pemerintah Melaka dengan puteri Majapahit", benefit: "Wilayah Melaka bertambah luas dan ancaman Majapahit tamat" },
      { kingdom: "Makasar", relationType: "Utusan persahabatan", benefit: "Perdagangan, perkapalan, Islam, kebudayaan dan kesenian" },
      { kingdom: "China", relationType: "Diplomatik, persahabatan dan perdagangan (Yin Ching 1403, Laksamana Zheng He 1405)", benefit: "Pengiktirafan (payung kuning, cap mohor, sepersalinan pakaian) dan perlindungan daripada ancaman Siam" },
      { kingdom: "Ryukyu", relationType: "Diplomatik dan perdagangan; Sultan Mansur Shah berutus surat", benefit: "Perdagangan dengan Melaka meningkat" },
      { kingdom: "Siam", relationType: "Pernah mengancam Melaka (zaman Parameswara dan Sultan Muzaffar Shah); kemudian diplomatik dan perdagangan melalui utusan Tun Telanai dan Menteri Jana Putera", benefit: "Bekalan kayu jati, beras dan bahan makanan; keselamatan terjamin" },
      { kingdom: "Pegu, Luzon, Gujerat, Koromandel, Bengal, Mesir, Parsi, Turki, Arab", relationType: "Perdagangan", benefit: "Melaka muncul sebagai pusat perdagangan dan penyebaran Islam yang ulung" }
    ]
  },
  islamSpread: {
    intro: "Melaka muncul sebagai pusat penyebaran agama Islam yang paling berpengaruh di Alam Melayu, dengan penyebaran berlaku melalui pelbagai cara serentak dengan perkembangan empayar dan perdagangan.",
    methods: [
      "Pengislaman pemerintah — Sultan Iskandar Shah memeluk Islam pada 1414, diikuti pembesar dan rakyat; Sultan Muzaffar Shah menjadikan Islam agama rasmi",
      "Perkahwinan — puteri Sultan Mansur Shah berkahwin dengan putera Raja Siak",
      "Ulama dan mubaligh — dihantar ke seluruh kawasan pengaruh Melaka; antaranya Maulana Abu Bakar dan Maulana Yusuf; Sultan Alauddin Riayat Syah menghantar ulama mengajar Raja Pahang, Kampar dan Inderagiri",
      "Perdagangan — pedagang Arab, India dan China bersifat mubaligh dan turut menyebarkan Islam ke Brunei, Filipina dan kepulauan Indonesia",
      "Peluasan kuasa — negeri naungan dan jajahan memeluk Islam sebagai tanda taat setia kepada Melaka"
    ],
    effects: [
      "Tumpuan ulama: Sultan menaungi dakwah dan perbincangan kitab seperti Darul Manzum",
      "Tempat pembelajaran: madrasah, masjid dan surau (zaman Sultan Muzaffar Shah)",
      "Persuratan: Hikayat Muhammad Ali Hanafiah dan Hikayat Amir Hamzah; tulisan Jawi dan bahasa Melayu berkembang",
      "Pemerintahan: undang-undang Islam dalam Hukum Kanun Melaka dan Undang-Undang Laut Melaka; jawatan mufti dan kadi"
    ]
  },
  tradeHub: {
    intro: "Kedudukan strategik menjadikan Melaka pusat pengumpulan dan pengedaran barang dagangan serta pusat perkapalan yang dikunjungi pedagang dari dalam dan luar Alam Melayu.",
    aspects: [
      { name: "Syahbandar", description: "Mengurus pasar dan gudang, menjaga kebajikan dan keselamatan pedagang, memeriksa alat timbang, sukat dan mata wang, menjadi hakim di pelabuhan, mengurus cukai dan peraturan keluar masuk kapal" },
      { name: "Cukai Perdagangan", description: "Cukai rendah menarik pedagang. Cukai rasmi ialah cukai import (panduan); cukai tidak rasmi dalam bentuk hadiah. Pedagang China dan Jepun hanya memberi hadiah bernilai sama dengan cukai lima peratus" },
      { name: "Mata Wang", description: "Tukar barang dan mata wang. Awalnya jongkong timah, serbuk emas dan kulit siput; kemudian mata wang timah (Calains), emas dan perak; mata wang Pasai, Hormuz dan Cambay juga digunakan" },
      { name: "Orang Laut", description: "Taat setia kepada raja; pelayar dan penunjuk arah yang cekap serta tentera yang menjamin keselamatan pedagang di perairan Melaka" },
      { name: "Kemudahan Pelabuhan", description: "Gudang, pengangkutan, bekalan makanan dan minuman, khidmat membaiki kapal, tempat penginapan dan tempat beribadat" }
    ],
    features: [
      "Barang tempatan: timah, emas, kapur barus, hasil hutan dan rempah-ratus",
      "Barang luar: benang emas, kain pelikat, batu delima, tembikar, wangian dan bahan makanan",
      "Pedagang paling ramai: Arab, China dan Gujerat; dari Alam Melayu: Pasai dan Jawa",
      "Pusat perkapalan: kapal kecil (perahu, sampan, ghurab, lancang dan lain-lain) dan kapal besar (jong, bahtera)"
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
    "5 cara penyebaran Islam: pengislaman pemerintah (Sultan Iskandar Shah, 1414), perkahwinan, ulama/mubaligh, perdagangan, peluasan kuasa",
    "Pengurusan perdagangan Melaka: syahbandar, cukai perdagangan yang rendah, tukar barang dan mata wang, Orang Laut dan kemudahan pelabuhan",
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
