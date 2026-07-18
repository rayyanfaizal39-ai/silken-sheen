// sej2ch7-content.ts
// Source-verified content for Sejarah Form 2, Bab 7 — Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor
// Sourced from T2_BT_SEJ.pdf (pages 114-135)
// Content data only — no presentation markup.

export interface SultanateFounding {
  name: string;
  lineageSource: string;
  founder: string;
  founderTitle: string;
  foundingYear: string;
  firstCapital: string;
  territoryNote: string;
  notableSultan?: { name: string; reignYears: string; achievement: string };
}

export interface SuccessionSystem {
  sultanate: string;
  heirTitle: string;
  selectionBody: string;
  rotationOrder?: string[];
  fourOfficials: string[];
}

export interface Sej2Ch7Content {
  hook: { title: string; body: string };
  founding: {
    intro: string;
    sultanates: SultanateFounding[];
  };
  governanceLegacy: {
    intro: string;
    succession: SuccessionSystem[];
  };
  islamLegacy: {
    intro: string;
    manifestations: string[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch7Content: Sej2Ch7Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Perak mengamalkan sistem penggiliran takhta yang unik — melalui enam gelaran berbeza sebelum menjadi sultan — manakala Selangor diasaskan oleh keturunan Bugis yang mendapat pengiktirafan daripada Sultan Perak sendiri. Bab ini menunjukkan bagaimana empat negeri Melayu mewarisi legasi Melaka dengan cara yang berbeza-beza."
  },
  founding: {
    intro: "Legasi Kesultanan Melayu Melaka diteruskan secara langsung di Pahang dan Perak, manakala pengasasan Kesultanan Terengganu dan Selangor merupakan kesinambungan daripada Kesultanan Johor Riau.",
    sultanates: [
      {
        name: "Kesultanan Pahang",
        lineageSource: "Keluarga diraja Kesultanan Melayu Melaka",
        founder: "Raja Muhammad (putera Sultan Mansur Shah)",
        founderTitle: "Sultan Muhammad Shah",
        foundingYear: "1470",
        firstCapital: "Pekan, berhampiran Kuala Sungai Pahang",
        territoryNote: "Wilayah pemerintahan meliputi dari Sedili Besar hingga Terengganu. Pahang kemudian diperintah Kesultanan Johor Riau (1614-1884) selepas Sultan Abdul Ghafur Muhaiyuddin Shah tiada waris; kesultanan baharu diasaskan Bendahara Siwa Raja Wan Ahmad, ditabalkan 12 Disember 1884 sebagai Sultan Ahmad Al-Muazzam Shah — dinasti ini berterusan hingga kini",
        notableSultan: { name: "Sultan Abdul Jamil Shah", reignYears: "1495-1512", achievement: "Mempertahankan Pahang daripada serangan Siam dengan bantuan Kesultanan Melayu Melaka" }
      },
      {
        name: "Kesultanan Perak",
        lineageSource: "Keluarga diraja Kesultanan Melayu Melaka (selepas kejatuhan Melaka)",
        founder: "Raja Muzaffar (putera Sultan Mahmud Shah), dijemput dari Kampar oleh Tun Saban dan Nakhoda Kassim",
        founderTitle: "Sultan Muzaffar Shah",
        foundingYear: "1528",
        firstCapital: "Tanah Abang, di pesisir Sungai Perak",
        territoryNote: "Raja Muzaffar membawa alat kebesaran: pedang Cura Si Manja Kini, keris, cap mohor, nobat, Surat Ciri"
      },
      {
        name: "Kesultanan Terengganu",
        lineageSource: "Susur galur Bendahara Johor Riau",
        founder: "Tun Zainal Abidin (putera Tun Habib Abdul Majid, Bendahara Johor Riau ke-11; putera angkat Raja Patani/Nang Chayam)",
        founderTitle: "Sultan Zainal Abidin I",
        foundingYear: "1708 (dianugerahkan Terengganu oleh Sultan Abdul Jalil pada 1708)",
        firstCapital: "Tanjung Baru, Kuala Berang",
        territoryNote: "Wilayah meliputi dari Kemaman hingga Besut. Keturunan Sultan Zainal Abidin I mewarisi takhta hingga hari ini",
        notableSultan: { name: "Sultan Zainal Abidin III", reignYears: "1881-1918", achievement: "Membawa pemodenan — menggubal Undang-Undang Bagi Diri Kerajaan Terengganu (Itqan al-Muluk bi Ta'dil al-Suluk), memperkemas sukatan/timbangan, menubuhkan mahkamah syariah dan pasukan polis, membina Istana Maziah (1897)" }
      },
      {
        name: "Kesultanan Selangor",
        lineageSource: "Keluarga diraja Bugis dalam Kesultanan Johor Riau",
        founder: "Raja Lumu (putera Daeng Chelak, Yang di-Pertuan Muda Johor Riau), diiktiraf oleh Sultan Mahmud Shah dari Perak",
        founderTitle: "Sultan Salehuddin Shah",
        foundingYear: "1766",
        firstCapital: "Kuala Selangor (kemudian berpindah ke Jugra 1857, lalu Klang, dan akhirnya Shah Alam hingga kini)",
        territoryNote: "Keturunan Sultan Salehuddin Shah mewarisi takhta Selangor hingga hari ini",
        notableSultan: { name: "Sultan Ala'iddin Suleiman Shah", reignYears: "1898-1938", achievement: "Membina banyak jalan raya dan landasan kereta api; peningkatan pembinaan rumah/kedai di Kuala Lumpur dan Klang; disambut Jubli Emas sempena 40 tahun pemerintahan" }
      }
    ]
  },
  governanceLegacy: {
    intro: "Aspek utama warisan sistem pemerintahan Kesultanan Melayu Melaka ialah Sultan sebagai tonggak utama kerajaan, penggantian pemerintah berasaskan Adat Temenggung, dan Sistem Pembesar Empat Lipatan — kesemuanya diwarisi tetapi disesuaikan mengikut acuan setiap negeri.",
    succession: [
      { sultanate: "Pahang", heirTitle: "Tengku Mahkota", selectionBody: "Jemaah Pangkuan Diraja Negeri", fourOfficials: ["Orang Kaya Indera Shahbandar", "Orang Kaya Indera Segara", "Orang Kaya Pahlawan", "Orang Kaya Indera Perba Jelai"] },
      { sultanate: "Perak", heirTitle: "Sistem Penggiliran (unik)", selectionBody: "Dewan Negara Perak", rotationOrder: ["Sultan", "Raja Muda", "Raja Di Hilir", "Raja Kecil Besar", "Raja Kecil Sulong", "Raja Kecil Tengah", "Raja Kecil Bongsu"], fourOfficials: ["Orang Kaya Bendahara Seri Maharaja", "Orang Kaya Besar Maharaja Di-Raja", "Orang Kaya Temenggong Paduka Raja", "Orang Kaya Menteri Paduka Tuan"] },
      { sultanate: "Terengganu", heirTitle: "Yang Di-Pertuan Muda", selectionBody: "Dewan Pangkuan Diraja (turut dikenali Ahli al-Hal wa al-Aqad — 'ahli yang memilih dan menjadikan raja')", fourOfficials: [] },
      { sultanate: "Selangor", heirTitle: "Raja Muda", selectionBody: "Dewan di-Raja (turut beranggotakan Tengku Laksamana, Tengku Bendahara)", fourOfficials: [] }
    ]
  },
  islamLegacy: {
    intro: "Kesultanan Melayu Melaka terkenal sebagai pusat penyebaran agama Islam — tradisi ini diwarisi negeri-negeri Melayu lain, dan kini Islam termaktub dalam Perlembagaan Malaysia sebagai agama Persekutuan.",
    manifestations: [
      "Sultan merupakan ketua agama bagi setiap negerinya (diperihalkan dalam Perlembagaan Persekutuan dan Undang-Undang Tubuh Kerajaan Negeri)",
      "Institusi agama (mufti, kadi, mahkamah syariah, Jabatan Agama Islam) berperanan penting di setiap negeri",
      "Institusi kesultanan mempunyai ikatan rapat dengan institusi agama — contoh: mufti Selangor adalah anggota Dewan di-Raja",
      "Sultan bertanggungjawab mendaulatkan syiar Islam — contoh: tauliah penceramah agama dikeluarkan pejabat istana, ditandatangani sultan"
    ]
  },
  keyExamFacts: [
    "Kesultanan Pahang: diasaskan Raja Muhammad 1470 (Sultan Muhammad Shah); dinasti baharu 1884 oleh Bendahara Wan Ahmad (Sultan Ahmad Al-Muazzam Shah) berterusan hingga kini",
    "Kesultanan Perak: diasaskan Raja Muzaffar 1528 (Sultan Muzaffar Shah), dari Kampar; alat kebesaran termasuk pedang Cura Si Manja Kini",
    "Kesultanan Terengganu: diasaskan Tun Zainal Abidin 1708 (Sultan Zainal Abidin I), keturunan Bendahara Johor Riau + Patani",
    "Kesultanan Selangor: diasaskan Raja Lumu 1766 (Sultan Salehuddin Shah), keturunan Bugis, diiktiraf Sultan Perak",
    "Perak mengamalkan Sistem Penggiliran unik: Sultan → Raja Muda → Raja Di Hilir → Raja Kecil Besar → Raja Kecil Sulong → Raja Kecil Tengah → Raja Kecil Bongsu",
    "Setiap negeri mewarisi Sistem Pembesar Empat Lipatan Melaka, disesuaikan dengan gelaran tersendiri",
    "Islam termaktub dalam Perlembagaan Malaysia sebagai agama Persekutuan, mewarisi tradisi keagamaan Melaka"
  ],
  keyTerms: [
    "Raja Muhammad", "Sultan Muhammad Shah", "Raja Muzaffar", "Cura Si Manja Kini", "Tun Zainal Abidin",
    "Nang Chayam", "Raja Lumu", "Daeng Chelak", "Sultan Salehuddin Shah", "Tengku Mahkota",
    "Sistem Penggiliran", "Yang Di-Pertuan Muda", "Dewan di-Raja", "Ahli al-Hal wa al-Aqad"
  ],
  chapterSummary: "Bab 7 mengkaji pengasasan 4 kesultanan Melayu (Pahang oleh Raja Muhammad 1470, Perak oleh Raja Muzaffar 1528, Terengganu oleh Tun Zainal Abidin 1708, Selangor oleh Raja Lumu 1766) yang mewarisi legasi Kesultanan Melayu Melaka secara langsung (Pahang, Perak) atau melalui Johor Riau (Terengganu, Selangor), serta warisan sistem pemerintahan (termasuk Sistem Penggiliran unik Perak) dan peranan Islam dalam pemerintahan setiap negeri."
};
