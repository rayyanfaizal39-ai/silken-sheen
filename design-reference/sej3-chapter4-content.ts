// sej3-chapter4-content.ts
// Source-verified content for Sejarah Form 3, Bab 4 — Pentadbiran Negeri-negeri Melayu Tidak Bersekutu (Unfederated Malay States)
// Sourced from SEJ_FORM_3.pdf (pages 84-107)
// Content data only — no presentation markup.

export interface StateGovernance {
  state: string;
  background: string[];
  administration: string[];
  foreignRelations: string[];
  legalSystem: string[];
}

export interface TreatyStep {
  date: string;
  event: string;
}

export interface JohorAgreement {
  year: string;
  agreement: string;
  content: string;
}

export interface Sej3Ch4Content {
  hook: { title: string; body: string };
  stateGovernance: StateGovernance[];
  britishExpansionFactors: { factor: string; description: string }[];
  bangkokTreatyPath: {
    intro: string;
    priorTreaties: { name: string; year: string; content: string }[];
    timeline: TreatyStep[];
    signingDetails: { date: string; parties: string[] };
    effect: string;
    initialRejection: string;
  };
  johorExpansion: {
    intro: string;
    prosperityFactors: string[];
    agreements: JohorAgreement[];
    firstAdvisor: string;
    sovereigntyNote: string;
  };
  administration: {
    intro: string;
    keyDifference: string;
    autonomyComparison: string;
    perlisAdmin: string[];
    kedahAdmin: string[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej3Ch4Content: Sej3Ch4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Johor kekal sebagai negeri berdaulat penuh hingga tahun 1914 — bukan kerana nasib baik, tetapi kerana kebijaksanaan pemerintah dan pembesarnya membangunkan negeri sehingga British tidak mempunyai sebarang alasan untuk campur tangan. Bab ini menunjukkan bahawa integriti pentadbiran tempatan boleh menangguhkan penjajahan, walaupun akhirnya tidak dapat mengelakkannya sepenuhnya."
  },
  stateGovernance: [
    {
      state: "Perlis",
      background: ["Terpisah daripada Kedah pada 1842", "Maharaja Siam mengiktiraf Syed Hussin Jamalullail di Bangkok sebagai Raja Perlis pertama (1843), bergelar Phya Songkhram Rama Wichit Willis Asmara Phya Pelit", "Istiadat pengisytiharan diadakan di istana Arau"],
      administration: ["Raja Syed Hussin membentuk pasukan pentadbiran berwibawa daripada pembesar tempatan", "Tuan Syed Abdullah ibni Syed Hamn Jamalullail dilantik Raja Muda Perlis", "Dato' Arau dilantik Perdana Menteri bergelar Dato' Belat Paduka Seri Perdana Menteri", "Negeri dibahagikan kepada 22 buah mukim"],
      foreignRelations: ["Hubungan baik dengan Siam berterusan — strategi Perlis untuk tidak diganggu gugat kuasa lain"],
      legalSystem: ["Berdasarkan Undang-Undang Kesultanan Kedah sebagai rujukan", "Menitikberatkan kebajikan rakyat"]
    },
    {
      state: "Kedah",
      background: ["Kerajaan bermula sejak abad ketujuh — antara kerajaan terawal di negara kita, kekal hingga hari ini", "Pertapakan Islam sejak abad ke-12, pusat pemerintahan di Kota Bukit Meriam", "Sultan pertama bergelar sultan ialah Sultan Mudzaffar Shah"],
      administration: ["Diketuai Sultan dan pembesar, disokong undang-undang kemas dan teratur", "Wilayah dibahagi di bawah pengawasan pembesar daerah", "Setiap daerah mempunyai mukim dikendalikan penghulu", "Abad ke-19: terdapat 128 mukim di Kedah"],
      foreignRelations: ["Hubungan dengan Siam sebagai strategi mempertahankan negeri daripada ancaman Burma", "Hubungan dua hala: diplomatik, pentadbiran, kewangan"],
      legalSystem: ["Kanun undang-undang Kedah pertama ditulis 1650 (1060H) — memberi hak kepada raja dan golongan pemerintah", "5 bab undang-undang: Undang-undang 1060H (1650), Tembera Dato' Seri Paduka Tuan 1075H (1667), Hukum Kanun Dato' Kota Setar, Adat Bunga Emas (dan 2 lagi)"]
    },
    {
      state: "Johor",
      background: ["Institusi kesultanan mempunyai sejarah panjang", "Sejak 1699, Kesultanan Johor diperintah jurai keturunan lain (bukan susur galur asal)", "Kedudukan digantikan anakanda pada 1885"],
      administration: ["Ketika zaman Maharaja Abu Bakar, Johor mengalami zaman pemodenan", "Pentadbiran moden cekap dan berkesan; Diraja dan Dato' Bentara Dalam bertanggungjawab", "Jawatan Menteri Besar diwujudkan"],
      foreignRelations: [],
      legalSystem: ["1911: Undang-Undang Bagi Diri Kerajaan Terengganu turut dirujuk sebagai perbandingan sezaman"]
    }
  ],
  britishExpansionFactors: [
    { factor: "Menghubungkan Burma dengan Pulau Pinang", description: "Pembinaan jalan raya, kereta api dan telegraf antara Burma dan Pulau Pinang membolehkan British mempunyai rangkaian terus dengan India — penting untuk perdagangan dan keselamatan" },
    { factor: "Beban Orang Putih", description: "British mendapati Siam melakukan kekejaman di Perlis, Kedah, Kelantan dan Terengganu; slogan 'Beban Orang Putih' digunakan mewajarkan tindakan meluaskan kuasa" }
  ],
  bangkokTreatyPath: {
    intro: "Peluasan kuasa British di Perlis, Kedah, Kelantan dan Terengganu dijalankan secara berperingkat melalui strategi perjanjian (bukan agresif) kerana negeri-negeri ini berada di bawah naungan Siam.",
    priorTreaties: [
      { name: "Perjanjian Burney", year: "1826", content: "Perjanjian awal British-Siam menyentuh hal ehwal negeri-negeri Melayu" },
      { name: "Perjanjian Sulit 1897", year: "6 April 1897", content: "British mahu memastikan tiada kuasa lain meluaskan pengaruh atas Kedah, Kelantan, Terengganu — British mengakui hak pertuanan Siam" },
      { name: "Perjanjian Sempadan", year: "29 November 1899", content: "Menetapkan sempadan antara Perak, Kelantan dan wilayah lain" },
      { name: "Perjanjian 1902", year: "1902", content: "Susulan siri rundingan British-Siam" }
    ],
    timeline: [
      { date: "April 1907", event: "Rundingan British-Siam bermula selepas Perjanjian Perancis-Siam, diusahakan E.H. Strobel (Penasihat Am Siam) dan Ralph Paget (wakil British Bangkok)" },
      { date: "Jun 1907", event: "Pejabat Tanah Jajahan membenarkan usaha perundingan" },
      { date: "13 September 1907", event: "Strobel menemui Putera Damrong (Menteri Dalam Negeri Siam) menyampaikan hasrat British" },
      { date: "November 1907", event: "Hal tersebut disampaikan kepada Raja Siam" },
      { date: "Januari 1908 - Januari 1909", event: "Draf perjanjian dirangka (Januari 1908), dipersetujui (Januari 1909)" },
      { date: "10 Mac 1909", event: "Perjanjian ditandatangani" }
    ],
    signingDetails: { date: "10 Mac 1909", parties: ["Ralph Paget (wakil British)", "Putera Devawongse Varaprakar (Menteri Hal Ehwal Luar Siam)"] },
    effect: "Perlis, Kedah, Kelantan dan Terengganu menerima seorang Penasihat British — membuka laluan British menguasai negara kita tanpa gangguan kuasa luar lain",
    initialRejection: "Pada tahap awal, Kelantan dan Terengganu menolak kehadiran Penasihat British"
  },
  johorExpansion: {
    intro: "Johor mencapai kemakmuran tinggi sebelum campur tangan British sehingga British tidak mempunyai alasan meluaskan kuasa — namun penguasaan British terhadap Singapura menyebabkan kedudukan Johor terancam.",
    prosperityFactors: ["Perkembangan pesat ekonomi komersial, terutama pertanian", "Kebijaksanaan dan kecekapan pemerintah", "Pemodenan pentadbiran, infrastruktur dan sosial", "Kemunculan golongan pentadbir komited"],
    agreements: [
      { year: "1855", agreement: "Perjanjian antara Sultan Ali dengan Temenggung Ibrahim", content: "Jika jajahan Kesang hendak dijual, mesti ditawarkan dahulu kepada British" },
      { year: "1885", agreement: "Perjanjian Setia", content: "Johor hanya menerima seorang ejen (setaraf pegawai Konsul, lebih rendah daripada Penasihat); hal ehwal luar dikawal British" },
      { year: "1879", agreement: "Cadangan Residen (gagal)", content: "Gabenor Negeri-negeri Selat mencadangkan Residen British di Johor; turut cuba manipulasi kewangan melalui tawaran pinjaman 200,000 dolar untuk kereta api — ditolak kerana akan menjejaskan ekonomi Johor" },
      { year: "1914", agreement: "Perjanjian 12 Mei 1914", content: "Sultan Ibrahim menandatangani dengan Sir Arthur Henderson Young (Gabenor Negeri-negeri Selat) — jawatan Konsul ditukar kepada Penasihat Am British" }
    ],
    firstAdvisor: "Douglas Graham Campbell — Penasihat Am British pertama di Johor",
    sovereigntyNote: "Pelantikan ini menukar taraf Johor daripada negeri bebas berdaulat kepada negeri naungan British, namun kedudukan dan kedaulatan Sultan Johor tetap diakui British"
  },
  administration: {
    intro: "Perjanjian Bangkok 1909 (Perlis, Kedah, Kelantan, Terengganu) dan perjanjian 1914 (Johor) membentuk kelima-lima Negeri-negeri Melayu Tidak Bersekutu (NNMTB).",
    keyDifference: "Tiada perjanjian khas mewujudkan 'gabungan' — sebaliknya lebih bersifat membezakan pentadbiran negeri-negeri ini daripada Negeri-negeri Melayu Bersekutu. NNMTB diletakkan di bawah kawalan Pesuruhjaya Tinggi Negeri-negeri Melayu Bersekutu (turut merangkap Gabenor Negeri-negeri Selat), tetapi ditadbir secara berasingan hingga Perang Dunia Kedua",
    autonomyComparison: "Raja di Negeri-negeri Melayu Tidak Bersekutu mempunyai kuasa yang LEBIH BESAR berbanding kuasa raja di Negeri-negeri Melayu Bersekutu. Kelima-lima negeri kekal sebagai negeri beraja bebas dengan kuasa autonomi. Usaha British menggabungkan kedua-dua sistem pentadbiran turut gagal kerana tentangan raja-raja NNMTB",
    perlisAdmin: ["Penasihat British terlibat langsung dalam pentadbiran, turut melibatkan pembesar tempatan", "Majlis Mesyuarat Negeri dipengerusikan raja", "Kakitangan awam kebanyakan orang Melayu — 1931: hanya 3 pegawai Eropah dalam pentadbiran Perlis", "Setiausaha Kerajaan — pegawai tadbir terpenting"],
    kedahAdmin: ["Penasihat British terlibat langsung, turut melibatkan pembesar tempatan", "Kedah tidak boleh diserahkan kepada negeri lain tanpa keizinan bertulis sultan dalam Majlis Mesyuarat Negeri (ditubuhkan sejak 1905)", "Kakitangan awam terdiri orang Melayu berkebolehan", "Setiausaha Kerajaan — pegawai tadbir terpenting"]
  },
  keyExamFacts: [
    "Perlis terpisah daripada Kedah 1842; Syed Hussin Jamalullail diiktiraf Raja Perlis pertama oleh Siam 1843",
    "Kesultanan Kedah bermula abad ketujuh — antara kerajaan terawal negara kita; Islam sejak abad ke-12 (Sultan Mudzaffar Shah)",
    "Kanun undang-undang Kedah pertama ditulis 1650 (1060H)",
    "Perjanjian Bangkok 1909 ditandatangani 10 Mac 1909 antara Ralph Paget (British) dan Putera Devawongse Varaprakar (Siam)",
    "Perjanjian sebelum Bangkok 1909: Perjanjian Burney (1826), Perjanjian Sulit (1897), Perjanjian Sempadan (1899), Perjanjian 1902",
    "Kelantan dan Terengganu pada mulanya menolak Penasihat British selepas Perjanjian Bangkok",
    "Johor kekal berdaulat hingga 1914 kerana kemakmuran dan kebijaksanaan pemerintahnya",
    "Perjanjian Johor: 1855 (klausa Kesang), 1885 (Perjanjian Setia — ejen sahaja), 1914 (12 Mei, Sultan Ibrahim dengan Sir Arthur Henderson Young)",
    "Douglas Graham Campbell — Penasihat Am British pertama di Johor",
    "Raja di Negeri-negeri Melayu Tidak Bersekutu mempunyai kuasa lebih besar berbanding raja di Negeri-negeri Melayu Bersekutu",
    "1931: hanya 3 pegawai Eropah dalam pentadbiran Perlis — kakitangan awam kebanyakan orang Melayu"
  ],
  keyTerms: [
    "Syed Hussin Jamalullail", "Phya Songkhram Rama Wichit Willis Asmara Phya Pelit", "Sultan Mudzaffar Shah",
    "Perjanjian Burney", "Perjanjian Sulit 1897", "Perjanjian Bangkok 1909", "Ralph Paget",
    "Putera Devawongse Varaprakar", "Sultan Ibrahim", "Sir Arthur Henderson Young",
    "Douglas Graham Campbell", "Penasihat Am British", "Negeri-negeri Melayu Tidak Bersekutu"
  ],
  chapterSummary: "Bab 4 mengkaji pemerintahan Kesultanan Melayu di Perlis, Kedah, Kelantan, Terengganu dan Johor sebelum campur tangan British, peluasan kuasa British di Perlis/Kedah/Kelantan/Terengganu melalui siri perjanjian British-Siam berakhir dengan Perjanjian Bangkok 1909, peluasan kuasa British di Johor yang tertangguh hingga 1914 kerana kemakmuran dan kebijaksanaan pemerintahnya sendiri, serta sistem pentadbiran Negeri-negeri Melayu Tidak Bersekutu yang mengekalkan lebih banyak autonomi berbanding Negeri-negeri Melayu Bersekutu."
};

export default sej3Ch4Content;
