// sej8-content.ts
// Source-verified content for Sejarah Form 1, Bab 8 — Tamadun Islam dan Sumbangannya
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 158-186)
// Content data only — no presentation markup.
// Note: This chapter covers Prophet Muhammad SAW factually as the textbook does
// (birth, revelation, leadership) — no imagery of the Prophet is used anywhere.

export interface SocietyGroup {
  name: string;
  description: string;
}

export interface LeadershipCategory {
  category: string;
  points: string[];
}

export interface Scholar {
  field: string;
  name: string;
  contribution: string;
}

export interface ArchitectureFeature {
  feature: string;
  description: string;
  example?: string;
}

export interface Sej8Content {
  hook: { title: string; body: string };
  preIslamicArabia: {
    location: string;
    regions: string[];
    keyCities: string[];
    maarib: string;
    jahiliahMeaning: string;
    politicalSystem: {
      groups: SocietyGroup[];
      sheikhQualities: string[];
      assabiyah: string;
      makkahAdmin: string;
    };
    economicSystem: {
      agriculture: string[];
      nomadicHerding: string;
      barterSystem: string;
      tradeRoutes: string;
      jahiliahTradePractices: string;
    };
  };
  emergenceOfIslam: {
    prophetBirth: { date: string; father: string; mother: string; fatherOccupation: string };
    earlyLife: string[];
    firstRevelation: { location: string; date: string; surah: string; meaning: string };
    secondRevelation: string;
    dakwahStages: { secret: string[]; public: string };
    hijrah: string;
    piagamMadinah: string;
    fourTraits: { trait: string; meaning: string }[];
    internationalDakwah: string[];
  };
  prophetLeadership: LeadershipCategory[];
  worldContributions: {
    agriculturalInnovation: string[];
    intellectualCenters: { location: string; facts: string[] }[];
    scholars: Scholar[];
  };
  architecture: {
    definition: string;
    firstMosque: string;
    features: ArchitectureFeature[];
    realExamples: { building: string; location: string }[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej8Content: Sej8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Daripada algebra kepada Piagam Madinah — perlembagaan bertulis pertama di dunia — Tamadun Islam meninggalkan warisan yang masih kita gunakan setiap hari. Bab ini menunjukkan bagaimana masyarakat Arab berubah sepenuhnya, dan sumbangan yang menjangkau jauh melangkaui Tanah Arab sendiri.",
  },
  preIslamicArabia: {
    location: "Semenanjung Tanah Arab, dikelilingi Syam (utara), Laut Arab (selatan), Teluk Parsi (timur), Laut Merah (barat)",
    regions: ["Hijaz", "Najd", "Yaman", "Hadramaut", "Oman"],
    keyCities: ["Makkah", "Madinah", "Taif"],
    maarib: "Selepas keruntuhan Empangan Maarib (~300 M), berlaku kemerosotan ekonomi. Kehidupan sosial yang lemah menyebabkan masyarakat tidak mampu membina semula empangan ini.",
    jahiliahMeaning: "Jahiliah berasal daripada perkataan Arab 'jahala' bermaksud jahil. Masyarakat ketika itu tidak mempunyai nabi atau kitab suci sebagai petunjuk.",
    politicalSystem: {
      groups: [
        { name: "Kaum Hadhari", description: "Tinggal di kota, menjalankan perniagaan dan memiliki binatang ternakan" },
        { name: "Kaum Badwi", description: "Hidup secara nomad, memelihara binatang ternakan" },
      ],
      sheikhQualities: ["Disukai ahli kabilah", "Matang", "Berani", "Sanggup mempertahankan puaknya", "Pandai berpidato"],
      assabiyah: "Penyatuan masyarakat berkabilah berdasarkan keturunan — semangat assabiyah. Mereka bermegah dengan kabilah masing-masing dan sering berperang untuk merebut kuasa, pengaruh dan harta.",
      makkahAdmin: "Kaum Arab Quraisy mentadbir dan memajukan perdagangan di Makkah. Pentadbiran diuruskan oleh badan seperti Darun-Nadwah.",
    },
    economicSystem: {
      agriculture: ["Gandum dan kopi di Yaman (bergantung hujan)", "Sekoi dan padi di Oman", "Kemenyan di Hadramaut dan Mahra"],
      nomadicHerding: "Kaum Badwi menternak unta, kambing dan biri-biri secara nomad, berpindah-randah mencari rumput dan air",
      barterSystem: "Kaum Badwi menukarkan binatang ternakan dan hasil ternakan dengan barang keperluan seperti pakaian dan kurma",
      tradeRoutes: "Laluan Sutera menghubungkan pedagang Arab dengan China, India dan Asia. Sejak abad ke-6 Masihi, Makkah menjadi pusat dagangan baharu bagi masyarakat Hijaz",
      jahiliahTradePractices: "Perniagaan masyarakat Arab Jahiliah hanya mementingkan keuntungan, mengamalkan riba dan menipu timbangan",
    },
  },
  emergenceOfIslam: {
    prophetBirth: { date: "12 Rabiulawal, Tahun Gajah (bersamaan 20 April 570 M)", father: "Abdullah bin Abdul Muttalib", mother: "Aminah binti Wahab", fatherOccupation: "Peniaga yang sering berulang-alik dari Makkah ke Syam" },
    earlyLife: [
      "Ayahanda meninggal dunia ketika baginda masih dalam kandungan ibunya",
      "Kematian ibunya ketika baginda berusia 6 tahun; dipelihara datuknya, Abdul Muttalib",
      "Selepas 2 tahun, datuknya meninggal dunia; baginda dipelihara Abu Talib, bapa saudaranya",
      "Baginda turut berniaga sehingga ke Syam dan sekitar Makkah",
      "Menjalankan perniagaan milik Siti Khadijah — sifat amanah dan budi pekerti baik menimbulkan rasa hormat Khadijah, membawa kepada perkahwinan mereka",
    ],
    firstRevelation: { location: "Gua Hira', Makkah", date: "Hari Isnin, 17 Ramadan bersamaan 6 Ogos 610 M", surah: "Surah al-Alaq (ayat 1-5)", meaning: "Bermula dengan perkataan 'Iqra' (bacalah) — membaca dan menulis sebagai asas ilmu pengetahuan untuk melahirkan tamadun" },
    secondRevelation: "Surah al-Mudassir (ayat 1-7) — pengisytiharan Nabi Muhammad SAW sebagai pesuruh Allah SWT untuk menyampaikan ajaran Islam kepada seluruh manusia",
    dakwahStages: {
      secret: ["Berlaku selama 3 tahun", "Individu awal: Siti Khadijah, Ali bin Abi Talib, Zaid bin Harithah, Abu Bakar al-Siddiq", "Disebarkan melalui sahabat dan dakwah di rumah al-Arqam bin Abi al-Arqam"],
      public: "Dimulakan kepada kaum keluarga di Bukit Safa; ditentang hebat oleh Abu Lahab (bapa saudara baginda) dan masyarakat Arab Quraisy",
    },
    hijrah: "Nabi Muhammad SAW berhijrah ke Madinah untuk tujuan penyebaran Islam; diterima dan diangkat sebagai pemimpin di sana",
    piagamMadinah: "Perlembagaan yang dirangka untuk membentuk sebuah negara Islam yang adil dan maju di Madinah",
    fourTraits: [
      { trait: "Siddiq", meaning: "Benar" },
      { trait: "Amanah", meaning: "Boleh dipercayai" },
      { trait: "Tabligh", meaning: "Menyampaikan ajaran Islam" },
      { trait: "Fatanah", meaning: "Bijaksana" },
    ],
    internationalDakwah: ["Rom", "Parsi", "Mesir", "Habsyah"],
  },
  prophetLeadership: [
    {
      category: "Pemimpin Negara",
      points: [
        "Tempatan: Merangka Piagam Madinah, menjadikan Islam agama rasmi; bukan Islam diberi kebebasan mengamalkan agama masing-masing; mempersaudarakan masyarakat Islam dan bukan Islam",
        "Antarabangsa: Menghantar perwakilan dakwah ke Habsyah, Mesir, Byzantium dan Parsi",
      ],
    },
    {
      category: "Pemimpin Masyarakat",
      points: [
        "Di Makkah: menekankan akhlak, akidah dan syariah",
        "Di Madinah: menekankan syura (perundingan), keadilan, persamaan dan kebebasan melalui Piagam Madinah",
        "Menyatukan kaum Muhajirin dan Ansar; menerapkan nilai toleransi dan hormat-menghormati",
      ],
    },
    {
      category: "Pembangun Ekonomi",
      points: [
        "Perdagangan: menggalakkan hubungan perdagangan Madinah dengan kawasan lain (laluan antara Yaman dan Syam)",
        "Pertanian: menggalakkan kerja keras berasaskan prinsip ekonomi Islam — rezeki halal, larangan penindasan dan riba",
        "Pengurusan tanah: menggalakkan pembangunan semula tanah terbiar dan menebus tanah tergadai daripada kaum Yahudi",
        "Pasar Suq al-Ansar: dicadangkan dibangunkan oleh Abdul Rahman bin Auf, membangunkan ekonomi umat Islam tanpa menyisihkan pesaing",
      ],
    },
    {
      category: "Pemimpin Tentera",
      points: [
        "Konsep jihad — perjuangan menegakkan agama Islam, mempertahankan bangsa dan tanah air",
        "Peperangan hanya diizinkan selepas orang Islam diancam",
        "Mengetuai Perang Badar, Perang Uhud, dan Perang Khandak",
      ],
    },
  ],
  worldContributions: {
    agriculturalInnovation: ["Sistem pengairan", "Pemilihan benih bermutu", "Baja bermutu", "Teknik cantuman untuk pelbagai bunga dan buah", "Teknik membuat kertas (kain linen, pisang tali, kapas)"],
    intellectualCenters: [
      { location: "Masjid-masjid Bani Umaiyah (Damsyik, Kufah, Basrah)", facts: ["Dijadikan institusi pendidikan", "Istana khalifah turut menjadi pusat pendidikan dan perpustakaan"] },
      { location: "Cordoba dan Toledo, Sepanyol", facts: ["Pelajar dari seluruh Eropah datang belajar sains dan falsafah", "Sarjana Islam menterjemah dan meningkatkan pengetahuan falsafah/sains Yunani", "Hubungan Islam, Yahudi dan Kristian mewujudkan budaya ilmu — golongan Musta'rab/Mozarab menyebarkan Tamadun Islam ke Eropah"] },
    ],
    scholars: [
      { field: "Ilmu Sains dan Kimia", name: "Jabir bin Hayyan (Geber)", contribution: "80 karya perubatan dan kimia (Korpus Jabir), diterjemah ke bahasa Latin" },
      { field: "Perubatan", name: "Ibn Sina (Avicenna)", contribution: "Buku al-Qanun fi al-Tib; mempengaruhi ahli falsafah Barat Albert the Great" },
      { field: "Falsafah", name: "Al-Kindi", contribution: "270+ karya (logik, muzik, perubatan); mempengaruhi Roger Bacon dan Descartes" },
      { field: "Astronomi dan Falak", name: "Al-Battani (Albategnius)", contribution: "Memperkenalkan asas ilmu trigonometri, mencipta alat ukuran masa" },
      { field: "Geografi", name: "Al-Biruni", contribution: "Kartografi dan geografi; peta ciptaannya digunakan pelayar Eropah" },
      { field: "Matematik", name: "Al-Khawarizmi", contribution: "Pengasas ilmu algebra; kitab Hisab al-Jabr wa al-Muqabalah diterjemah menjadi teks asas universiti Barat" },
      { field: "Pelayaran", name: "Ibn Battuta", contribution: "Berlayar sampai ke India dan Alam Melayu; buku pelayarannya digunakan pelayar lain" },
    ],
  },
  architecture: {
    definition: "Seni bina bermaksud bidang seni untuk mendirikan bangunan, reka bentuk dan reka letak yang dibina oleh manusia.",
    firstMosque: "Seni bina Islam bermula dengan pembinaan Masjid Quba' pada zaman Nabi Muhammad SAW — menjadi model pembinaan masjid lain sehingga kini",
    features: [
      { feature: "Ruang cahaya", description: "Untuk keselesaan beribadat" },
      { feature: "Pemisahan ruang", description: "Ruang memisahkan lelaki dan wanita" },
      { feature: "Binaan kukuh", description: "Selamat dan tahan lama" },
      { feature: "Reka bentuk mengikut iklim", description: "Sesuai dengan iklim setempat" },
      { feature: "Menara", description: "Bentuk tirus dan memuncak tinggi supaya laungan azan didengari jauh" },
      { feature: "Mihrab", description: "Penanda arah kiblat, elemen terpenting dalam masjid" },
      { feature: "Mimbar", description: "Digunakan imam untuk membaca khutbah/syarahan" },
      { feature: "Perhiasan indah", description: "Kubah menarik, seni khat (kaligrafi), ukiran menakjubkan, kaca bertatah batu permata" },
      { feature: "Reka bentuk unik", description: "Pintu melengkung melambangkan hormat; penggunaan air dan cahaya", example: "Masjid Cordoba, Sepanyol" },
      { feature: "Elemen estetika", description: "Ukiran arabes, motif kaligrafi, geometri dan cakerawala" },
      { feature: "Sesuai iklim setempat", description: "Tingkap banyak untuk penyejukan di iklim panas/lembap", example: "Masjid Tengkera, Melaka" },
    ],
    realExamples: [
      { building: "Masjid Putra", location: "Putrajaya, Malaysia" },
      { building: "Masjid Cordoba", location: "Sepanyol" },
      { building: "Istana al-Hambra", location: "Sepanyol" },
      { building: "Masjid Tengkera", location: "Melaka" },
      { building: "Masjid Sultan Hassan", location: "Kaherah, Mesir" },
    ],
  },
  keyExamFacts: [
    "Masyarakat Arab sebelum Islam terbahagi kepada Kaum Hadhari (tinggal di kota) dan Kaum Badwi (nomad)",
    "Zaman Jahiliah bermaksud zaman kejahilan — tiada nabi atau kitab suci sebagai panduan",
    "Nabi Muhammad SAW dilahirkan 12 Rabiulawal Tahun Gajah (20 April 570 M)",
    "Wahyu pertama diterima di Gua Hira' pada 17 Ramadan (6 Ogos 610 M) — Surah al-Alaq",
    "Dakwah dilakukan dalam 2 peringkat: secara rahsia (3 tahun) dan terang-terangan",
    "Piagam Madinah ialah perlembagaan pertama membentuk negara Islam yang adil",
    "4 sifat terpuji Nabi Muhammad SAW: Siddiq, Amanah, Tabligh, Fatanah",
    "Ketokohan Nabi Muhammad SAW merangkumi 4 aspek: pemimpin negara, pemimpin masyarakat, pembangun ekonomi, pemimpin tentera",
    "7 tokoh ilmuwan Islam: Jabir bin Hayyan (sains/kimia), Ibn Sina (perubatan), Al-Kindi (falsafah), Al-Battani (astronomi), Al-Biruni (geografi), Al-Khawarizmi (matematik/algebra), Ibn Battuta (pelayaran)",
    "Seni bina Islam bermula dengan Masjid Quba' pada zaman Nabi Muhammad SAW",
    "Mihrab menunjukkan arah kiblat; mimbar untuk imam membaca khutbah",
  ],
  keyTerms: [
    "Zaman Jahiliah",
    "Kaum Hadhari",
    "Kaum Badwi",
    "Assabiyah",
    "Kabilah",
    "Syeikh",
    "Wahyu",
    "Piagam Madinah",
    "Siddiq",
    "Amanah",
    "Tabligh",
    "Fatanah",
    "Jihad",
    "Muhajirin",
    "Ansar",
    "Mihrab",
    "Mimbar",
    "Arabes",
    "Kaligrafi",
  ],
  chapterSummary:
    "Bab 8 mengkaji latar belakang masyarakat Arab sebelum Islam (Zaman Jahiliah, Kaum Hadhari/Badwi), kemunculan dan perkembangan Tamadun Islam (kelahiran dan wahyu pertama Nabi Muhammad SAW, dakwah, Piagam Madinah), ketokohan Nabi Muhammad SAW sebagai pemimpin negara/masyarakat/ekonomi/tentera, sumbangan Tamadun Islam kepada dunia melalui tokoh ilmuwan seperti Al-Khawarizmi dan Ibn Sina, serta sumbangan dalam bidang seni bina bermula dengan Masjid Quba'.",
};
