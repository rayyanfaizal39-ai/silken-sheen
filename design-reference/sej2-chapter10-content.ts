// sej2-chapter10-content.ts
// Source-verified content for Sejarah Form 2, Bab 10 — Sarawak dan Sabah
// Sourced from T2_BT_SEJ.pdf (pages 176-195)
// Content data only — no presentation markup.

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
  };
  bumiputeraUniqueness: {
    sarawakGroups: EthnicGroup[];
    sabahGroups: EthnicGroup[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Ch10Content: Sej2Ch10Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebuah gendang gangsa yang ditemukan di Pulau Banggi, Sabah, membuktikan penduduk pesisir utara Borneo telah berdagang dengan kerajaan Majapahit sejak berabad lalu — jauh sebelum Brunei atau Sulu wujud. Bab ini menunjukkan bahawa Sarawak dan Sabah sentiasa menjadi sebahagian penting daripada rangkaian Alam Melayu, bukan wilayah terpencil."
  },
  connectionToAlamMelayu: {
    intro: "Sarawak dan Sabah terletak di barat daya hingga utara Pulau Borneo, mendedahkannya kepada perkembangan Alam Melayu terutama perdagangan dan keagamaan. Beberapa pelabuhan muncul seiring kegemilangan kerajaan seperti Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua dan Gangga Nagara.",
    earlyTradePosts: [
      { name: "Bukit Tengkorak", era: "Sebelum Masihi", facts: ["Semporna, Sabah — pusat pembuatan tembikar", "Menjalankan perdagangan dengan kawasan luar Sabah"] },
      { name: "Chu-Po", era: "Abad ketiga", facts: ["Pelabuhan di utara Sabah", "Mengeksport besi ke Funan dan Champa"] },
      { name: "Santubong", era: "Abad ketujuh", facts: ["Pusat perdagangan utama Sarawak", "Barangan tembikar Dinasti T'ang dan Sung ditemukan", "Membekalkan kapur barus, kayu laka, lilin lebah madu, kulit penyu", "Abad ke-13: industri peleburan bijih besi", "Dikenal pasti sebagai 'Po-ni' dalam sumber China (Jan Wisseman Christie)"] },
      { name: "Gedong, Bukit Sandong, Kalka", era: "Berdagang dengan Siam, Vietnam, China", facts: [] }
    ],
    empireInfluence: [
      "Srivijaya meluaskan pengaruh di selatan Sarawak untuk mengawal perdagangan Laut China Selatan",
      "Majapahit berpengaruh di Sarawak dan utara Sabah — dibuktikan gendang gangsa jenis Moko (Timbang Dayang, dari Pulau Jawa) ditemukan di Pulau Banggi, Sabah",
      "Selepas kemerosotan Majapahit: kerajaan Sambas meluas ke Samarahan, Sadong, Sarawak, Saribas, Kalka",
      "Abad ke-14: Kesultanan Melayu Brunei muncul, menerima wilayah Sarawak daripada Sambas melalui persahabatan, turut meluas ke utara Borneo",
      "Kesultanan Sulu (abad ke-15) meningkatkan perdagangan di utara Sabah — sarang burung menarik pedagang China",
      "Brunei dan Sulu merosot menjelang abad ke-19 akibat persaingan kuasa Barat"
    ],
    religiousInfluence: [
      "Objek keagamaan Buddha (emas) ditemukan di Santubong (zaman kegemilangan Srivijaya)",
      "Patung Ganesha ditemukan di Limbang",
      "Kesultanan Melayu Brunei menyebarkan Islam di pesisir pantai Sarawak dan Sabah",
      "Kesultanan Sulu memainkan peranan penting menyebarkan Islam di pantai timur Sabah"
    ]
  },
  localGovernance: {
    sarawak: {
      tribalLeadership: [
        { ethnicGroup: "Iban", title: "Tuai Rumah" },
        { ethnicGroup: "Kayan", title: "Kelunan Maren / Hipun Uma" },
        { ethnicGroup: "Kenyah", title: "Peran Lepo" },
        { ethnicGroup: "Kelabit", title: "Laih Rayeh" }
      ],
      riverKingdoms: [
        { name: "Sawaku", location: "Santubong dan sekitar Sungai Sarawak", founder: "Datu Merpati", era: "Abad ketujuh" },
        { name: "Samadong", location: "Samarahan dan Sadong", era: "Abad ketujuh" },
        { name: "Kalka", location: "Kuala Sungai Kalka", founder: "Dayang Hubu dan Dayang Ruku", era: "-" },
        { name: "Saribas", location: "Pertemuan Batang Saribas dan Sungai Rimbas", founder: "Pengiran Temenggung Abdul Kadir", era: "-" },
        { name: "Melano", location: "Sungai Retus", founder: "Tugau", era: "Abad ke-11" }
      ],
      royalRepresentative: "Sistem wakil raja bermula pengaruh Majapahit, disambung Sambas, kemudian Kesultanan Melayu Brunei (2 wakil: terus dari Brunei atau pemimpin tempatan). Menjalankan kehakiman, kebajikan, keamanan, kutipan cukai. Suku pedalaman diberi gelaran Orang Kaya oleh Brunei."
    },
    sabah: {
      tribalLeadership: [
        { ethnicGroup: "Kadazandusun & Murut & Orang Sungai", title: "Orang Tua (ketua umum)" },
        { ethnicGroup: "Kadazandusun (adat)", title: "Bobohizan / Bobolian" },
        { ethnicGroup: "Murut (adat)", title: "Babalian" }
      ],
      royalRepresentative: "Wakil raja dari Brunei dan Sulu — kuasa kehakiman, keamanan, kebajikan, kutipan cukai",
      freeChiefs: [
        { name: "Syarif Osman", territory: "Marudu" },
        { name: "Datu Kurunding", territory: "Tungku" }
      ]
    }
  },
  economy: {
    sarawak: [
      { location: "Pedalaman", activities: ["Mengutip hasil hutan", "Memburu haiwan liar", "Menanam padi"], ethnicGroups: ["Kenyah", "Kayan", "Iban", "Kelabit", "Penan", "Punan"] },
      { location: "Lembah Sungai", activities: ["Menanam padi", "Menanam buah-buahan dan sayur-sayuran"], ethnicGroups: ["Melayu", "Melanau", "Iban", "Bidayuh", "Bisaya"] },
      { location: "Pesisir Pantai", activities: ["Perdagangan", "Menangkap ikan", "Membuat perahu", "Perusahaan sagu"], ethnicGroups: ["Melayu", "Melanau", "Kedayan"] }
    ],
    sabah: [
      { location: "Pedalaman", activities: ["Mengutip hasil hutan", "Menanam padi", "Mengutip sarang burung"], ethnicGroups: ["Murut"] },
      { location: "Lembah Sungai", activities: ["Menanam padi", "Menanam buah-buahan dan sayur-sayuran"], ethnicGroups: ["Kadazandusun", "Rungus", "Orang Sungai"] },
      { location: "Pesisir Pantai", activities: ["Menangkap ikan", "Membuat perahu", "Mengutip hasil laut", "Perdagangan"], ethnicGroups: ["Melayu Brunei", "Bajau", "Iranun", "Suluk"] }
    ]
  },
  bumiputeraUniqueness: {
    sarawakGroups: [
      { name: "Iban", origin: "Sungai Kapuas", note: "Berhijrah dan menetap di hulu Sungai Batang Lupar, Sungai Rajang hingga Sungai Baram" },
      { name: "Melayu", origin: "Kemunculan kerajaan-kerajaan awal Sarawak", note: "Kebanyakan menetap di pesisir pantai" },
      { name: "Bidayuh", origin: "Sungkung, Kalimantan", note: "Berhijrah ke selatan Sarawak" },
      { name: "Melanau", origin: "Sejak dahulu mendiami kawasan tengah Sarawak", note: "-" },
      { name: "Orang Ulu", origin: "Sungai Kayan", note: "Terdiri daripada Kayan, Kenyah, Kelabit, Penan, Punan — berhijrah ke hulu Sungai Rajang, Balui, Baram, Hulu Kemena" }
    ],
    sabahGroups: [
      { name: "Kadazandusun", origin: "Penampang, Papar, Tuaran, Tambunan, Ranau", note: "Nama 'Dusun' diberi orang Brunei, bermaksud petani pedalaman" },
      { name: "Bajau/Sama", origin: "Dua pendapat: dari Zamboanga atau Johor", note: "Kebanyakan di pantai timur dan barat Sabah; terkenal budaya menunggang kuda di pantai barat" },
      { name: "Murut", origin: "Tenom hingga Kalabakan", note: "Nama 'Murut' diberi orang Brunei, bermaksud orang bukit/pedalaman pergunungan" }
    ]
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
    "Kaum bumiputera Sarawak: Iban, Melayu, Bidayuh, Melanau, Orang Ulu (Kayan/Kenyah/Kelabit/Penan/Punan)",
    "Kaum bumiputera Sabah: Kadazandusun, Bajau/Sama, Murut"
  ],
  keyTerms: [
    "Bukit Tengkorak", "Chu-Po", "Santubong", "Po-ni", "Gendang gangsa Moko", "Sawaku",
    "Samadong", "Tuai Rumah", "Kelunan Maren", "Bobohizan", "Babalian", "Orang Tua",
    "Ketua bebas", "Orang Ulu", "Bajau/Sama"
  ],
  chapterSummary: "Bab 10 mengkaji hubungan Sarawak dan Sabah dengan Alam Melayu sejak sebelum Masihi melalui pelabuhan seperti Bukit Tengkorak, Chu-Po dan Santubong, pengaruh kerajaan besar (Srivijaya, Majapahit, Sambas, Brunei, Sulu) dan agama (Hindu, Buddha, Islam), kemunculan pemerintahan tempatan (kepimpinan kesukuan dan lembah sungai di kedua-dua kawasan), kegiatan ekonomi mengikut 3 kawasan geografi, serta keunikan pelbagai kaum bumiputera Sarawak (Iban, Melayu, Bidayuh, Melanau, Orang Ulu) dan Sabah (Kadazandusun, Bajau/Sama, Murut)."
};

export default sej2Ch10Content;
