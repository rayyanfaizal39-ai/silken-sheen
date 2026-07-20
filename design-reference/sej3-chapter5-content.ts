// sej3-chapter5-content.ts
// Source-verified content for Sejarah Form 3, Bab 5 — Pentadbiran Barat di Sarawak dan Sabah
// Sourced from SEJ_FORM_3.pdf (pages 108-135)
// Content data only — no presentation markup.

export interface TribalTitle {
  ethnicGroup: string;
  title: string;
}

export interface RiverAdminType {
  type: string;
  description: string;
}

export interface KeyFigure {
  name: string;
  role: string;
  actions: string[];
}

export interface BrookeStrategy {
  strategy: string;
  details: string[];
}

export interface ConsolidationTactic {
  tactic: string;
  details: string[];
}

export interface SbubStep {
  figure: string;
  action: string;
  year?: string;
}

export interface CourtSystem {
  court: string;
  role: string;
}

export interface Sej3Ch5Content {
  hook: { title: string; body: string };
  localGovernance: {
    intro: string;
    ethnicDiversity: { sarawak: string; sabah: string };
    tribalSystem: { intro: string; titles: TribalTitle[] };
    bruneiInfluence: {
      intro: string;
      riverTypes: RiverAdminType[];
      titles: string[];
    };
  };
  brookeExpansion: {
    intro: string;
    context: string[];
    keyFigures: KeyFigure[];
    strategies: BrookeStrategy[];
    treaties: { year: string; parties: string; terms: string[] }[];
    consolidation: ConsolidationTactic[];
    dynastySuccession: { name: string; years: string }[];
  };
  sbubExpansion: {
    intro: string;
    attractionFactors: { factor: string; details: string[] }[];
    priorBritishHoldings: { location: string; details: string[] }[];
    pretapakanChain: SbubStep[];
  };
  administration: {
    sarawak: { policy: string; ethnicRoles: { group: string; role: string }[]; courts: CourtSystem[] };
    sabah: { policy: string; courts: CourtSystem[] };
    lawOf1842: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej3Ch5Content: Sej3Ch5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "James Brooke tiba di Sarawak sebagai seorang pengembara persendirian dengan kapalnya sendiri, Royalist — dan berjaya menjadi 'Raja Putih' pertama melalui rundingan, ugutan, perjanjian dan kekuatan tentera. Bab ini menunjukkan bagaimana seorang individu, bukan sebuah syarikat atau kerajaan, boleh menguasai sebuah wilayah seluas Sarawak."
  },
  localGovernance: {
    intro: "Sebelum kedatangan kuasa-kuasa luar, masyarakat tempatan di Sarawak dan Sabah telah mempunyai sistem pemerintahan yang berkesan, membawa kestabilan dan kemakmuran.",
    ethnicDiversity: { sarawak: "Kira-kira 27 etnik", sabah: "Kira-kira 34 etnik" },
    tribalSystem: {
      intro: "Sistem Kesukuan dilaksanakan oleh masyarakat tempatan — asas penting ialah pegangan dan kepatuhan kepada adat masyarakat. Setiap suku kaum mempunyai ketua rumah disebut mengikut dialek masing-masing, namun semua mempunyai maksud yang sama.",
      titles: [
        { ethnicGroup: "Iban", title: "Tuai Rumah — sumber autoriti masyarakat" },
        { ethnicGroup: "Melanau", title: "Menteri" },
        { ethnicGroup: "Kenyah", title: "Peran Lepo" },
        { ethnicGroup: "Kayan", title: "Kelunan Maren" },
        { ethnicGroup: "Bidayuh", title: "Tua Kapung — sumber autoriti" },
        { ethnicGroup: "Kadazandusun, Murut, Bajau (Sabah)", title: "Orang Tua (Ketua Kampung) — menyelesaikan pertikaian" }
      ]
    },
    bruneiInfluence: {
      intro: "Pengaruh Kesultanan Brunei ketara di Sarawak dan Sabah; di Sabah turut wujud pengaruh Kesultanan Sulu di pantai timur. Pentadbiran dipecahkan kepada 3 bentuk sungai.",
      riverTypes: [
        { type: "Sungai Kerajaan", description: "Ditadbir terus oleh wakil Sultan Brunei" },
        { type: "Sungai Tulin", description: "Dimiliki dan ditadbir pembesar tertentu" },
        { type: "Sungai Kuripan", description: "Diberikan sebagai ganjaran perkhidmatan" }
      ],
      titles: ["Datu Patinggi, Datu Bandar, Datu Temenggung (Sungai Sarawak — wakil Sultan Brunei)", "Orang Kaya (O.K.) — kawasan pedalaman"]
    }
  },
  brookeExpansion: {
    intro: "Peluasan kuasa Barat di Sarawak dilakukan oleh pihak persendirian — James Brooke, tertarik dengan kekayaan sagu, antimoni dan emas Sarawak.",
    context: [
      "1827: Sultan Brunei mentadbir Sarawak, menghantar Pengiran Indera Mahkota ke Kuching untuk menguasai ekonomi",
      "Cukai tinggi dan kerahan tenaga Pengiran Indera Mahkota menimbulkan perbalahan",
      "Penentangan dipimpin Datu Patinggi Ali untuk membebaskan Sarawak"
    ],
    keyFigures: [
      { name: "Pengiran Raja Muda Hashim", role: "Bapa saudara Sultan Brunei, dihantar menyelesaikan masalah Sarawak", actions: ["Gagal memujuk Datu Patinggi Ali", "Meminta bantuan James Brooke"] },
      { name: "Datu Patinggi Ali", role: "Pembesar tempatan Sarawak", actions: ["Menentang pentadbiran Brunei sejak 1836", "Bersetuju berunding dengan James Brooke, menamatkan penentangan"] },
      { name: "James Brooke", role: "Pengembara persendirian dengan kapal Royalist", actions: ["Mencari peluang mendapatkan Sarawak", "Mendapat sokongan tentera laut British", "Menerima pelawaan Pengiran Raja Muda Hashim dengan syarat Sarawak diserahkan kepadanya"] }
    ],
    strategies: [
      { strategy: "Rundingan", details: ["Berunding dengan Pengiran Raja Muda Hashim", "Tawaran Sarawak dibuat 2 kali sebelum James Brooke menerimanya"] },
      { strategy: "Ugutan", details: ["Pertama: mengugut menyerang kedudukan Pengiran Raja Muda Hashim di Kuching", "Kedua: hadir ke Brunei diiringi tentera laut British untuk mengesahkan penyerahan"] },
      { strategy: "Perjanjian", details: ["Perjanjian 1841 dan 1842 — dua perjanjian terpenting"] },
      { strategy: "Ketenteraan", details: ["Bantuan kapal HMS Dido daripada tentera laut British", "Digunakan memerangi ancaman lanun"] }
    ],
    treaties: [
      { year: "1841", parties: "James Brooke dengan Pengiran Raja Muda Hashim", terms: ["James Brooke memerintah Sarawak dan menguasai hasilnya", "Mesti menghormati dan memelihara undang-undang serta adat Melayu"] },
      { year: "1842", parties: "James Brooke dengan Sultan Brunei, Sultan Omar Ali Saifuddin", terms: ["Sultan Brunei menyerahkan Sarawak dari Tanjung Datu ke Sungai Samarahan", "Semua hasil pendapatan diserahkan kepada James Brooke", "Ufti tahunan 2,500 Dolar Sepanyol kepada Sultan Brunei", "Tidak boleh campur tangan adat dan agama tempatan", "Tidak boleh dipindah milik tanpa kebenaran Sultan Brunei", "Sultan Brunei mengiktiraf James Brooke sebagai Raja Putih Sarawak"] }
    ],
    consolidation: [
      { tactic: "Kekuatan Tentera", details: ["HMS Dido menghancurkan kubu orang Iban di Sungai Saribas dan Skrang"] },
      { tactic: "Menentang Kebangkitan Orang Tempatan", details: ["Menganggap kebangkitan tempatan sebagai lanun — alasan sah meluaskan kuasa dengan sokongan British"] },
      { tactic: "Memperoleh Sokongan Tempatan", details: ["Sokongan sebahagian orang Melayu dan Iban"] },
      { tactic: "Mengambil Kesempatan Pertelingkahan", details: ["Di Mukah: menyokong Pengiran Matusin melawan Pengiran Ersat, memecahkan kekuatan tempatan"] },
      { tactic: "Menghapuskan Tokoh Menentang", details: ["Sharif Masahor dibuang ke Singapura", "Datu Patinggi Abang Abdul Ghafur bin Abang Qahar dibuang ke Melaka"] },
      { tactic: "Memperkukuh Pertahanan", details: ["Kubu Sungai Skrang dibina 1849 (dinamakan Fort James) selepas Perang Beting Maru", "Fort Margherita dibina 1878-1879, kos 8,100 Dolar Sepanyol", "Renjer Sarawak ditubuhkan 1862"] }
    ],
    dynastySuccession: [
      { name: "James Brooke", years: "Raja Putih pertama" },
      { name: "Charles Brooke", years: "Raja Putih kedua" },
      { name: "Charles Vyner Brooke", years: "1917-1946 (Raja Putih ketiga)" }
    ]
  },
  sbubExpansion: {
    intro: "Sebelum kehadiran kuasa Barat, pentadbiran Sabah dikuasai Kesultanan Brunei, Kesultanan Sulu dan Ketua-ketua Bebas. Melalui pajakan, pembelian dan perjanjian, Sabah akhirnya dikuasai pemodal asing dan dimiliki Syarikat Borneo Utara British (SBUB).",
    attractionFactors: [
      { factor: "Kedudukan Strategik", details: ["Di tengah laluan perdagangan China-Singapura", "Berhampiran laluan Pulau Palawan ke China dan Jepun", "Penting untuk perdagangan Kepulauan Sulu hingga New Guinea dan Australia", "Pelabuhan Teluk Gaya — selamat daripada angin monsun"] },
      { factor: "Kekayaan Ekonomi", details: ["Sarang burung (permintaan tinggi China), sagu, rotan, getah perca, gamat, sirip ikan yu", "Tanaman indigo dan kapas subur di dataran/lembah — pertanian komersial"] }
    ],
    priorBritishHoldings: [
      { location: "Pulau Balambangan", details: ["1763: Alexander Dalrymple berjanji dengan Kesultanan Sulu, mengibarkan bendera British", "British meninggalkan pulau ini November 1805 (masalah serangan lanun)"] },
      { location: "Pulau Labuan", details: ["James Brooke berunding dengan Sultan Brunei", "18 Disember 1846: Sultan Brunei menyerahkan Labuan; British bertanggungjawab menumpaskan lanun", "James Brooke dilantik Gabenor pertama"] }
    ],
    pretapakanChain: [
      { figure: "Charles Lee Moses", action: "Menyewa Sabah daripada Sultan Brunei selama 10 tahun", year: "1865" },
      { figure: "J.W. Torrey dan T.B. Harris", action: "Membeli hak daripada Moses, menjadikan Kimanis pusat perdagangan" },
      { figure: "Alfred dan Edward Dent", action: "Memajak pantai timur Sabah daripada Sultan Brunei/Sulu — akhirnya membentuk SBUB" }
    ]
  },
  administration: {
    sarawak: {
      policy: "Charles Brooke mengamalkan dasar pecah dan perintah berasaskan kaum",
      ethnicRoles: [
        { group: "Orang Melayu", role: "Pentadbiran" },
        { group: "Orang Cina", role: "Ekonomi" },
        { group: "Orang Iban", role: "Keselamatan dan ketenteraan (jawatan tertinggi: Temenggung, diwujudkan Charles Brooke)" }
      ],
      courts: [
        { court: "Mahkamah Cina", role: "Diwujudkan 1911 di Kuching — menangani hal ehwal masyarakat Cina" },
        { court: "Mahkamah Adat", role: "Mengadili kesalahan masyarakat tempatan" },
        { court: "Mahkamah Residen", role: "Diwujudkan di setiap bahagian; Residen bertindak sebagai Majistret; menggunakan undang-undang Barat dan tempatan" }
      ]
    },
    sabah: {
      policy: "Pentadbiran berasaskan peribumi — ketua-ketua etnik berperanan, dipilih berdasarkan personaliti dan kepakaran",
      courts: [
        { court: "Mahkamah Anak Negeri", role: "Diadili oleh Ketua Anak Negeri" },
        { court: "Mahkamah Majistret", role: "Diadili oleh Pegawai Daerah, menggunakan undang-undang Barat" }
      ]
    },
    lawOf1842: "Undang-undang lapan perkara diperkenalkan Januari 1842 — mahkamah diwujudkan diadili raja, dibantu Ketua Majistret"
  },
  keyExamFacts: [
    "27 etnik di Sarawak, 34 etnik di Sabah",
    "3 bentuk sungai pentadbiran Brunei: Sungai Kerajaan, Sungai Tulin, Sungai Kuripan",
    "James Brooke menggunakan 4 strategi: rundingan, ugutan, perjanjian, ketenteraan",
    "Perjanjian 1841 dan 1842 — James Brooke diiktiraf Raja Putih Sarawak, ufti tahunan 2,500 Dolar Sepanyol",
    "Dinasti Brooke: James Brooke → Charles Brooke → Charles Vyner Brooke (1917-1946)",
    "Fort Margherita dibina 1878-1879 (nama isteri Charles Brooke), kos 8,100 Dolar Sepanyol",
    "Pulau Balambangan (1763, Alexander Dalrymple) dan Pulau Labuan (1846, James Brooke Gabenor pertama) — milik British sebelum SBUB",
    "Rantaian pemilikan Sabah: Charles Lee Moses (1865) → J.W. Torrey & T.B. Harris → Alfred & Edward Dent → SBUB",
    "Charles Brooke amalkan dasar pecah dan perintah: Melayu (pentadbiran), Cina (ekonomi), Iban (keselamatan, jawatan Temenggung)",
    "Mahkamah Cina diwujudkan 1911 di Kuching"
  ],
  keyTerms: [
    "Tuai Rumah", "Peran Lepo", "Kelunan Maren", "Sungai Kerajaan", "Sungai Tulin", "Sungai Kuripan",
    "Datu Patinggi Ali", "Pengiran Raja Muda Hashim", "James Brooke", "Raja Putih", "HMS Dido",
    "Fort Margherita", "Renjer Sarawak", "Alexander Dalrymple", "Charles Lee Moses", "SBUB",
    "Temenggung", "Mahkamah Cina", "Mahkamah Anak Negeri"
  ],
  chapterSummary: "Bab 5 mengkaji latar belakang pemerintahan tempatan di Sarawak dan Sabah (sistem kesukuan, pengaruh Brunei), peluasan kuasa Dinasti Brooke di Sarawak melalui 4 strategi dan perjanjian 1841/1842, peluasan kuasa Syarikat Borneo Utara British di Sabah melalui rantaian pemilikan (Moses-Torrey/Harris-Dent bersaudara), serta bentuk pentadbiran Barat di kedua-dua negeri (dasar pecah-perintah berasaskan kaum di Sarawak, pentadbiran berasaskan peribumi di Sabah, sistem mahkamah masing-masing)."
};

export default sej3Ch5Content;
