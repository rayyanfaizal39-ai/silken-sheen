// Sejarah Form 2, Bab 10 — Sarawak dan Sabah
// Source-verified content (T2_BT_SEJ.pdf, ms 176-195)

export interface TradePost {
  name: string;
  era: string;
  facts: string[];
}

export interface RiverKingdom {
  name: string;
  location: string;
  founder?: string;
  era: string;
}

export interface TribalTitle {
  ethnicGroup: string;
  title: string;
}

export interface FreeChief {
  name: string;
  territory: string;
}

export interface EconomicActivity {
  location: string;
  activities: string[];
  ethnicGroups: string[];
}

export interface EthnicGroup {
  name: string;
  origin: string;
  note: string;
}

export interface HeritageItem {
  category: string;
  region: "Sarawak" | "Sabah";
  name: string;
  note: string;
}

export interface Sej2Ch10Content {
  hook: { title: string; body: string };
  connectionToAlamMelayu: {
    intro: string;
    earlyTradePosts: TradePost[];
    empireInfluence: string[];
    religiousInfluence: string[];
  };
  localGovernance: {
    sarawak: {
      tribalLeadership: TribalTitle[];
      riverKingdoms: RiverKingdom[];
      royalRepresentative: string;
    };
    sabah: {
      tribalLeadership: TribalTitle[];
      royalRepresentative: string;
      freeChiefs: FreeChief[];
    };
  };
  economy: {
    sarawak: EconomicActivity[];
    sabah: EconomicActivity[];
    riverImportance: { use: string; note: string }[];
  };
  bumiputeraUniqueness: {
    sarawakGroups: EthnicGroup[];
    sabahGroups: EthnicGroup[];
    heritage: HeritageItem[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch10Content: Sej2Ch10Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebuah gendang gangsa yang ditemukan di Pulau Banggi, Sabah, membuktikan penduduk pesisir utara Borneo telah berdagang dengan kerajaan Majapahit sejak berabad lalu — jauh sebelum Brunei atau Sulu wujud. Bab ini menunjukkan bahawa Sarawak dan Sabah sentiasa menjadi sebahagian penting daripada rangkaian Alam Melayu, bukan wilayah terpencil.",
  },
  connectionToAlamMelayu: {
    intro: "Sarawak dan Sabah terletak di barat daya hingga utara Pulau Borneo, mendedahkannya kepada perkembangan Alam Melayu terutama perdagangan dan keagamaan. Beberapa pelabuhan muncul seiring kegemilangan kerajaan seperti Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua dan Gangga Nagara.",
    earlyTradePosts: [
      { name: "Bukit Tengkorak", era: "Sebelum Masihi", facts: ["Semporna, Sabah — pusat pembuatan tembikar", "Menjalankan perdagangan dengan kawasan luar Sabah"] },
      { name: "Chu-Po", era: "Abad ketiga", facts: ["Pelabuhan di utara Sabah", "Mengeksport besi ke Funan dan Champa"] },
      { name: "Santubong", era: "Abad ketujuh", facts: ["Pusat perdagangan utama Sarawak", "Barangan tembikar Dinasti T'ang dan Sung ditemukan", "Membekalkan kapur barus, kayu laka, lilin lebah madu, kulit penyu", "Abad ke-13: industri peleburan bijih besi", "Dikenal pasti sebagai 'Po-ni' dalam sumber China (Jan Wisseman Christie)"] },
      { name: "Gedong, Bukit Sandong, Kalka", era: "Berdagang dengan Siam, Vietnam, China", facts: [] },
    ],
    empireInfluence: [
      "Srivijaya meluaskan pengaruh di selatan Sarawak untuk mengawal perdagangan Laut China Selatan",
      "Majapahit berpengaruh di Sarawak dan utara Sabah — dibuktikan gendang gangsa jenis Moko (Timbang Dayang, dari Pulau Jawa) ditemukan di Pulau Banggi, Sabah",
      "Selepas kemerosotan Majapahit: kerajaan Sambas meluas ke Samarahan, Sadong, Sarawak, Saribas, Kalka",
      "Abad ke-14: Kesultanan Melayu Brunei muncul, menerima wilayah Sarawak daripada Sambas melalui persahabatan, turut meluas ke utara Borneo",
      "Kesultanan Sulu (abad ke-15) meningkatkan perdagangan di utara Sabah — sarang burung menarik pedagang China",
      "Brunei dan Sulu merosot menjelang abad ke-19 akibat persaingan kuasa Barat",
    ],
    religiousInfluence: [
      "Objek keagamaan Buddha (emas) ditemukan di Santubong (zaman kegemilangan Srivijaya)",
      "Patung Ganesha ditemukan di Limbang",
      "Kesultanan Melayu Brunei menyebarkan Islam di pesisir pantai Sarawak dan Sabah",
      "Kesultanan Sulu memainkan peranan penting menyebarkan Islam di pantai timur Sabah",
    ],
  },
  localGovernance: {
    sarawak: {
      tribalLeadership: [
        { ethnicGroup: "Iban", title: "Tuai Rumah" },
        { ethnicGroup: "Kayan", title: "Kelunan Maren / Hipun Uma" },
        { ethnicGroup: "Kenyah", title: "Peran Lepo" },
        { ethnicGroup: "Kelabit", title: "Laih Rayeh" },
      ],
      riverKingdoms: [
        { name: "Sawaku", location: "Santubong dan sekitar Sungai Sarawak", founder: "Datu Merpati", era: "Abad ketujuh" },
        { name: "Samadong", location: "Samarahan dan Sadong", era: "Abad ketujuh" },
        { name: "Kalka", location: "Kuala Sungai Kalka", founder: "Dayang Hubu dan Dayang Ruku", era: "-" },
        { name: "Saribas", location: "Pertemuan Batang Saribas dan Sungai Rimbas", founder: "Pengiran Temenggung Abdul Kadir", era: "-" },
        { name: "Melano", location: "Sungai Retus", founder: "Tugau", era: "Abad ke-11" },
      ],
      royalRepresentative: "Sistem wakil raja bermula pengaruh Majapahit, disambung Sambas, kemudian Kesultanan Melayu Brunei (2 wakil: terus dari Brunei atau pemimpin tempatan). Menjalankan kehakiman, kebajikan, keamanan, kutipan cukai. Suku pedalaman diberi gelaran Orang Kaya oleh Brunei.",
    },
    sabah: {
      tribalLeadership: [
        { ethnicGroup: "Kadazandusun & Murut & Orang Sungai", title: "Orang Tua (ketua umum)" },
        { ethnicGroup: "Kadazandusun (adat)", title: "Bobohizan / Bobolian" },
        { ethnicGroup: "Murut (adat)", title: "Babalian" },
      ],
      royalRepresentative: "Wakil raja dari Brunei dan Sulu — kuasa kehakiman, keamanan, kebajikan, kutipan cukai",
      freeChiefs: [
        { name: "Syarif Osman", territory: "Marudu" },
        { name: "Datu Kurunding", territory: "Tungku" },
      ],
    },
  },
  economy: {
    sarawak: [
      { location: "Pedalaman", activities: ["Mengutip hasil hutan", "Memburu haiwan liar", "Menanam padi"], ethnicGroups: ["Kenyah", "Kayan", "Iban", "Kelabit", "Penan", "Punan"] },
      { location: "Lembah Sungai", activities: ["Menanam padi", "Menanam buah-buahan dan sayur-sayuran"], ethnicGroups: ["Melayu", "Melanau", "Iban", "Bidayuh", "Bisaya"] },
      { location: "Pesisir Pantai", activities: ["Perdagangan", "Menangkap ikan", "Membuat perahu", "Perusahaan sagu"], ethnicGroups: ["Melayu", "Melanau", "Kedayan"] },
    ],
    sabah: [
      { location: "Pedalaman", activities: ["Mengutip hasil hutan", "Menanam padi", "Mengutip sarang burung"], ethnicGroups: ["Murut"] },
      { location: "Lembah Sungai", activities: ["Menanam padi", "Menanam buah-buahan dan sayur-sayuran"], ethnicGroups: ["Kadazandusun", "Rungus", "Orang Sungai"] },
      { location: "Pesisir Pantai", activities: ["Menangkap ikan", "Membuat perahu", "Mengutip hasil laut", "Perdagangan"], ethnicGroups: ["Melayu Brunei", "Bajau", "Iranun", "Suluk"] },
    ],
    riverImportance: [
      { use: "Kegunaan Harian", note: "Sungai membekalkan air untuk minuman, mandi dan mencuci" },
      { use: "Pengangkutan", note: "Sampan dan bot membawa penumpang serta barangan" },
      { use: "Petempatan", note: "Petempatan di sungai membentuk kampung air" },
      { use: "Sumber Rezeki", note: "Sungai membekalkan sumber makanan dan minuman" },
      { use: "Perdagangan", note: "Muara dan lembah sungai menjadi pelabuhan kerajaan awal" },
      { use: "Rekreasi", note: "Sungai menjadi lokasi pesta regata dan acara perahu berhias" },
    ],
  },
  bumiputeraUniqueness: {
    sarawakGroups: [
      { name: "Iban", origin: "Sungai Kapuas", note: "Berhijrah dan menetap di hulu Sungai Batang Lupar, Sungai Rajang hingga Sungai Baram" },
      { name: "Melayu", origin: "Kemunculan kerajaan-kerajaan awal Sarawak", note: "Kebanyakan menetap di pesisir pantai" },
      { name: "Bidayuh", origin: "Sungkung, Kalimantan", note: "Berhijrah ke selatan Sarawak" },
      { name: "Melanau", origin: "Sejak dahulu mendiami kawasan tengah Sarawak", note: "-" },
      { name: "Orang Ulu", origin: "Sungai Kayan", note: "Terdiri daripada Kayan, Kenyah, Kelabit, Penan, Punan — berhijrah ke hulu Sungai Rajang, Balui, Baram, Hulu Kemena" },
    ],
    sabahGroups: [
      { name: "Kadazandusun", origin: "Penampang, Papar, Tuaran, Tambunan, Ranau", note: "Nama 'Dusun' diberi orang Brunei, bermaksud petani pedalaman" },
      { name: "Bajau/Sama", origin: "Dua pendapat: dari Zamboanga atau Johor", note: "Kebanyakan di pantai timur dan barat Sabah; terkenal budaya menunggang kuda di pantai barat" },
      { name: "Murut", origin: "Tenom hingga Kalabakan", note: "Nama 'Murut' diberi orang Brunei, bermaksud orang bukit/pedalaman pergunungan" },
    ],
    heritage: [
      { category: "Tenunan", region: "Sarawak", name: "Pua Kumbu", note: "Tenunan Iban digunakan dalam majlis kelahiran, perkahwinan dan kematian" },
      { category: "Tenunan", region: "Sarawak", name: "Keringkam", note: "Kain kapas/sutera Melayu disulam benang logam" },
      { category: "Tenunan", region: "Sabah", name: "Inavol", note: "Dihasilkan oleh Rungus" },
      { category: "Tenunan", region: "Sabah", name: "Dastar", note: "Tanjak dihasilkan oleh Iranun" },
      { category: "Perayaan", region: "Sarawak", name: "Hari Gawai", note: "Disambut Iban, Bidayuh, Orang Ulu sebagai kesyukuran selepas menuai" },
      { category: "Perayaan", region: "Sarawak", name: "Kaul", note: "Disambut Melanau untuk mengelakkan bencana roh jahat 'Ipok'" },
      { category: "Perayaan", region: "Sabah", name: "Pesta Kaamatan", note: "Disambut Kadazandusun dan Murut sebagai kesyukuran kepada semangat padi" },
      { category: "Perayaan", region: "Sabah", name: "Regatta Lepa", note: "Menghargai peranan lepa dalam kehidupan Bajau/Sama di pantai timur" },
      { category: "Tarian", region: "Sarawak", name: "Ngajat", note: "Ditarikan Iban dan Orang Ulu, dikaitkan dengan semangat juang" },
      { category: "Tarian", region: "Sarawak", name: "Bermukun", note: "Bergendang, berpantun dan menari dalam majlis perkahwinan" },
      { category: "Tarian", region: "Sabah", name: "Sumazau", note: "Ditarikan Kadazandusun semasa Kaamatan dan majlis keramaian" },
      { category: "Tarian", region: "Sabah", name: "Magunatip", note: "Ditarikan Murut menggunakan dua batang buluh" },
      { category: "Tarian", region: "Sabah", name: "Limbai", note: "Ditarikan berpasangan oleh Bajau/Sama dalam perkahwinan dan keramaian" },
      { category: "Seni Bina", region: "Sarawak", name: "Rumah Panjang", note: "Didiami Iban, Bidayuh, Orang Ulu untuk tempat tinggal, keselamatan dan kerjasama" },
      { category: "Seni Bina", region: "Sarawak", name: "Rumah Tinggi", note: "Rumah tinggi Melanau, ~10 meter dari tanah untuk mengelakkan musuh" },
      { category: "Seni Bina", region: "Sarawak", name: "Rumah Baruk", note: "Berbentuk kon, digunakan Bidayuh untuk ritual, mesyuarat, kegiatan sosial" },
      { category: "Seni Bina", region: "Sabah", name: "Vinatang", note: "Rumah panjang Rungus — tempat tinggal dan pertahanan" },
      { category: "Seni Bina", region: "Sabah", name: "Tulus / Pahun", note: "Rumah panjang Murut, mempunyai lantai tarian lansaran" },
      { category: "Seni Bina", region: "Sabah", name: "Lepa", note: "Perahu Bajau/Sama untuk mengangkut barang dan sebagai tempat tinggal" },
    ],
  },
  keyExamFacts: [
    "Bukit Tengkorak (Semporna, Sabah) — pusat pembuatan tembikar sejak sebelum Masihi",
    "Chu-Po (abad ke-3, utara Sabah) mengeksport besi ke Funan dan Champa",
    "Santubong (abad ke-7) — pusat perdagangan utama Sarawak, dikenal pasti sebagai 'Po-ni' dalam sumber China",
    "Gendang gangsa Moko di Pulau Banggi membuktikan hubungan dagang dengan Majapahit",
    "5 kerajaan lembah sungai Sarawak: Sawaku, Samadong, Kalka, Saribas, Melano (abad ke-7 hingga ke-14)",
    "Gelaran pemimpin kesukuan: Tuai Rumah (Iban), Kelunan Maren/Hipun Uma (Kayan), Peran Lepo (Kenyah), Laih Rayeh (Kelabit)",
    "Gelaran adat Sabah: Bobohizan/Bobolian (Kadazandusun), Babalian (Murut); Orang Tua sebagai ketua umum",
    "2 ketua bebas Sabah: Syarif Osman (Marudu), Datu Kurunding (Tungku)",
    "Ekonomi Sarawak/Sabah terbahagi 3 kawasan: pedalaman, lembah sungai, pesisir pantai — setiap satu dengan kegiatan dan kaum tersendiri",
    "6 kepentingan sungai: kegunaan harian, pengangkutan, petempatan, sumber rezeki, perdagangan, rekreasi",
    "Kaum bumiputera Sarawak: Iban, Melayu, Bidayuh, Melanau, Orang Ulu (Kayan/Kenyah/Kelabit/Penan/Punan)",
    "Kaum bumiputera Sabah: Kadazandusun, Bajau/Sama, Murut",
    "Hari Gawai (Sarawak) dan Pesta Kaamatan (Sabah) ialah perayaan menuai utama",
    "Pua Kumbu (Iban) dan Keringkam (Melayu) ialah tenunan tradisional Sarawak; Inavol (Rungus) dan Dastar (Iranun) ialah tenunan Sabah",
  ],
  keyTerms: [
    "Bukit Tengkorak", "Chu-Po", "Santubong", "Po-ni", "Gendang gangsa Moko", "Sawaku",
    "Samadong", "Tuai Rumah", "Kelunan Maren", "Bobohizan", "Babalian", "Orang Tua",
    "Ketua bebas", "Orang Ulu", "Bajau/Sama", "Pua Kumbu", "Keringkam", "Hari Gawai",
    "Pesta Kaamatan", "Ngajat", "Sumazau", "Rumah Baruk",
  ],
  chapterSummary: "Bab 10 mengkaji hubungan Sarawak dan Sabah dengan Alam Melayu sejak sebelum Masihi melalui pelabuhan seperti Bukit Tengkorak, Chu-Po dan Santubong, pengaruh kerajaan besar (Srivijaya, Majapahit, Sambas, Brunei, Sulu) dan agama (Hindu, Buddha, Islam), kemunculan pemerintahan tempatan (kepimpinan kesukuan dan lembah sungai di kedua-dua kawasan), kegiatan ekonomi mengikut 3 kawasan geografi serta kepentingan sungai, dan keunikan pelbagai kaum bumiputera Sarawak (Iban, Melayu, Bidayuh, Melanau, Orang Ulu) dan Sabah (Kadazandusun, Bajau/Sama, Murut) melalui tenunan, perayaan, tarian dan seni bina tradisional.",
};

