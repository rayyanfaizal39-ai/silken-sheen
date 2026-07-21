// sej3ch8-content.ts
// Source-verified content for Sejarah Form 3, Bab 8 — Kebijaksanaan Raja dan Pembesar Melayu Menangani Cabaran Barat
// Sourced from SEJ_FORM_3.pdf (pages 198-225), supplemented with the identity of Sultan Abu
// Bakar's successor and what the 1914 Johor-British treaty actually did — carried forward
// from the prior generic notes for this chapter, not independently re-verified against the
// source PDF, but retained so nothing already in the app is silently dropped.
// Content data only — no presentation markup.

export interface StateReaction {
  state: string;
  ruler: string;
  territorialLoss?: string;
  reaction: string[];
  quote?: string;
}

export interface DurbarEvent {
  location: string;
  year: string;
  demands: string[];
}

export interface DiplomacyAction {
  action: string;
  details: string[];
  highlight?: boolean;
}

export interface Sej3Ch8Content {
  hook: { title: string; body: string };
  bangkokTreatyReactions: {
    intro: string;
    states: StateReaction[];
  };
  durbarDemands: {
    intro: string;
    events: DurbarEvent[];
  };
  johorDiplomacy: {
    intro: string;
    ruler: string;
    actions: DiplomacyAction[];
    outcome: string;
    successor: { name: string; details: string[] };
  };
  terengganuDiplomacy: {
    ruler: string;
    actions: string[];
  };
  advisorRefusal: {
    intro: string;
    states: { state: string; advisor: string; appointedDate: string; conflict: string[]; finalTreaty: string; preservedIdentity?: string[]; quote?: string }[];
  };
  writtenConstitutions: {
    intro: string;
    johor: { date: string; name: string; clauseCount: string; keyProvisions: string[]; significance: string[]; firstOfItsKind: string };
    terengganu: { date: string; name: string; meaning: string; clauseCount: string; keyProvisions: string[]; significance: string[] };
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej3Ch8Content: Sej3Ch8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sultan Abdul Hamid Halim Shah dari Kedah berkata baginda tidak akan memaafkan sesiapa yang 'menjual negeri Kedah seperti menjual seekor kerbau'. Bab ini menunjukkan bahawa raja-raja Melayu bukanlah pemerhati pasif dalam penjajahan — mereka membantah, berdiplomasi dan bertindak dengan kebijaksanaan masing-masing untuk melindungi maruah dan kedaulatan negeri."
  },
  bangkokTreatyReactions: {
    intro: "Pemerintah Kelantan, Terengganu, Kedah dan Perlis mempersoalkan hak British dan Siam menentukan masa depan politik negeri-negeri Melayu tanpa berunding dengan mereka terlebih dahulu.",
    states: [
      { state: "Perlis", ruler: "Raja Syed Alwi Jamalullail (1905-1943)", territorialLoss: "Wilayah Pujoh (utara Sungai Perlis) kepada Siam, dimasukkan ke Setul", reaction: ["Membantah tindakan Siam mengambil Pujoh — sepatutnya sebahagian Perlis kerana pernah ditadbir Penghulu Kuala Perlis"] },
      { state: "Kedah", ruler: "Sultan Abdul Hamid Halim Shah (1881-1943)", territorialLoss: "Sadao, Setul, Pulau Terutau, Butang dan pulau sekitarnya kepada Siam", reaction: ["Berasa tersinggung kerana tidak dibawa berunding", "Menegaskan sempadan baharu harus ikut kriteria sedia ada"], quote: "...tidak akan memaafkan sesiapa yang menjual negeri Kedah seperti menjual seekor kerbau" },
      { state: "Terengganu", ruler: "Sultan Zainal Abidin III", reaction: ["Mengecam tindakan Siam menyerahkan Terengganu kepada British tanpa pengetahuan baginda", "Menegaskan Siam tiada hak ke atas Terengganu", "Bunga emas hanyalah tanda persahabatan, bukan tanda Terengganu jajahan Siam", "Mengemukakan bantahan kepada Gabenor Negeri-negeri Selat, 24 Mei 1909"] },
      { state: "Kelantan", ruler: "Sultan Muhammad IV", territorialLoss: "Daerah Tabal (dihuni kira-kira 15,000 orang Melayu) kepada Siam", reaction: ["Menolak Perjanjian Bangkok 1909 secara langsung di hadapan J.S. Mason dan wakil Siam di Kota Bharu", "Kecewa dengan tindakan British menyerahkan Tabal kepada Siam"] }
    ]
  },
  durbarDemands: {
    intro: "Raja-raja Melayu menggunakan Durbar sebagai wadah menyuarakan pembelaan nasib dan kepentingan bangsa kepada British.",
    events: [
      { location: "Kuala Lumpur", year: "1903", demands: ["Sultan Idris Murshidul Adzam Shah (Perak) mengkritik pemusatan kuasa di tangan Residen Jeneral, mendesak kuasa dikembalikan kepada institusi raja", "Mendesak bilangan pegawai Melayu dalam perkhidmatan persekutuan ditambah dan dilantik jawatan lebih tinggi", "Yang di-Pertuan Besar Negeri Sembilan, Tuanku Muhammad ibni Yamtuan Antah menuntut Bahasa Melayu sebagai bahasa rasmi Persekutuan"] },
      { location: "Pekan, Pahang", year: "1932", demands: ["Sultan Iskandar Shah (Perak) mendesak tegas kuasa pemerintahan dikembalikan kepada Raja-raja Melayu dan Majlis Negeri dalam semua aspek"] },
      { location: "Klang, Selangor", year: "1937", demands: ["Tuanku Abdul Rahman (Negeri Sembilan) menggesa peluang kerja diberikan kepada buruh rumpun Alam Melayu (Jawa) menggantikan buruh Cina/India", "Sultan Abu Bakar Riayatuddin Al-Muazzam Shah (Pahang) mendesak perhatian kepada orang Melayu tanpa pekerjaan/tanah"] },
      { location: "Seri Menanti, Negeri Sembilan", year: "1939", demands: ["Sultan Hisamuddin Alam Shah (Selangor) mencadangkan penubuhan Malay Girls College setaraf Malay College Kuala Kangsar untuk pendidikan wanita"] }
    ]
  },
  johorDiplomacy: {
    intro: "Kebijaksanaan berdiplomasi, ketinggian peribadi dan semangat patriotik Sultan Abu Bakar membuktikan kesungguhan raja Melayu menghadapi cabaran Barat.",
    ruler: "Sultan Abu Bakar (1862-1895)",
    actions: [
      { action: "Hubungan Baik dengan Negeri-negeri Selat", details: ["British mengekalkan Teluk Belanga, Singapura sebagai milik Kesultanan Johor", "Baginda dan kerabat menetap di Singapura sehingga 1889 sebelum berpindah ke Johor"] },
      { action: "Kunjungan ke England, Bertemu Ratu Victoria", details: ["Dikurniakan gelaran Maharaja Johor 1868", "Meredakan tekanan Gabenor Negeri-negeri Selat", "Diberi kepercayaan menyelesaikan pertikaian negeri-negeri Melayu"], highlight: true },
      { action: "Menubuhkan Lembaga Penasihat Johor di London", details: ["Ahli dilantik daripada pegawai British berpengaruh", "Membantu menasihati baginda dalam pentadbiran"] }
    ],
    outcome: "Kebijaksanaan diplomasi dan dasar persahabatan Sultan Abu Bakar berjaya mengekalkan kedaulatan Kesultanan Johor sehingga tahun 1914",
    successor: {
      name: "Sultan Ibrahim",
      details: [
        "Menggantikan Sultan Abu Bakar selepas kemangkatan baginda pada 1895",
        "1914: Perjanjian Johor-British ditandatangani — Johor menerima seorang Penasihat Am (General Adviser) British",
        "Ini menamatkan tempoh lebih 90 tahun Johor kekal berdaulat penuh tanpa campur tangan pentadbiran British secara langsung"
      ]
    }
  },
  terengganuDiplomacy: {
    ruler: "Sultan Zainal Abidin III",
    actions: [
      "Berangkat ke Singapura berunding dengan Gabenor Negeri-negeri Selat selepas Perjanjian Bangkok 1909",
      "Berani mempertahankan kedaulatan negeri melalui rundingan"
    ]
  },
  advisorRefusal: {
    intro: "Tindakan British mengetepikan kewibawaan raja dan pembesar Melayu di Negeri-negeri Melayu Bersekutu menyedarkan pemerintah Negeri-negeri Melayu Utara tentang kedudukan politik mereka yang terancam — mereka berusaha mempertahankan hak dan identiti negeri dan enggan menerima Penasihat British selepas Perjanjian Bangkok 1909.",
    states: [
      {
        state: "Perlis",
        advisor: "Meadow Frost",
        appointedDate: "15 Julai 1909",
        conflict: ["Pemindahan naungan Siam kepada British berlaku 1909, namun tiada perjanjian rasmi mengikat Perlis dan British ketika itu"],
        finalTreaty: "28 April 1930: Perjanjian Perlis-British ditandatangani (Syed Hamzah Jamalullail, Naib Presiden Majlis Mesyuarat Negeri Perlis) — menjadikan Perlis secara rasmi negeri Melayu TERAKHIR menerima naungan British"
      },
      {
        state: "Kedah",
        advisor: "W.G. Maxwell",
        appointedDate: "15 Julai 1909",
        conflict: [
          "Keengganan menerima W.G. Maxwell menimbulkan pergeseran dengan Majlis Mesyuarat Negeri Kedah (diterajui Tunku Mahmud, Presiden 1907-1913)",
          "Majlis menentang tuntutan Maxwell bahawa surat rasmi mesti melalui Residen Jeneral dan ditulis dalam bahasa Inggeris",
          "Maxwell mengetepikan nama Kedah dalam surat rasmi dan mengibarkan bendera Union Jack di kediamannya — dianggap mencabar identiti negeri"
        ],
        finalTreaty: "1 November 1923: Perjanjian Kedah-British",
        preservedIdentity: ["Penggunaan bahasa Melayu dalam pentadbiran dan perundangan", "Penggunaan kalendar Hijrah", "Cuti umum hari Jumaat", "Keutamaan melantik pegawai Melayu dalam pentadbiran"]
      },
      {
        state: "Kelantan",
        advisor: "J.S. Mason",
        appointedDate: "1910 (perjanjian berasingan selepas penolakan awal)",
        conflict: [
          "Sultan Muhammad IV tidak menerima Perjanjian Bangkok — British terpaksa berunding perjanjian berasingan"
        ],
        quote: "...beta sekali lagi dengan waris-waris negeri ini harap yang tidak ada hajat mengubah peraturan di dalam Negeri Kelantan serta harap tidak ada hajat meletakkan seorang wakil menduduki di dalam negeri kita ini...",
        finalTreaty: "1910: Perjanjian Kelantan-British — Sultan Kelantan wajib ikut nasihat Penasihat British (kecuali agama Islam dan adat Melayu); tidak dibenarkan berhubung kuasa luar tanpa Penasihat"
      },
      {
        state: "Terengganu",
        advisor: "J.L. Humphreys (Penasihat British pertama)",
        appointedDate: "1910 (hanya wakil tanpa kuasa); Penasihat penuh selepas 1919",
        conflict: [
          "Sultan Zainal Abidin III enggan menerima Penasihat British, hanya menerima wakil British tanpa kuasa pentadbiran (1910)",
          "Selepas kemangkatan baginda, Sultan Muhammad II didesak menandatangani Perjanjian Terengganu-British, 24 Mei 1919",
          "Sultan Muhammad II (1918-1920) lebih banyak berunding dengan pembesar negeri berbanding merujuk Penasihat British — menimbulkan kemarahan British; baginda turun takhta 1920, digantikan Sultan Sulaiman Badrul Alam Shah"
        ],
        finalTreaty: "24 Mei 1919: Perjanjian Terengganu-British — status wakil British ditukar Penasihat British, membolehkan campur tangan penuh (kecuali agama Islam dan adat Melayu)"
      }
    ]
  },
  writtenConstitutions: {
    intro: "Raja-raja Melayu mengambil inisiatif menjadikan pemerintahan negeri lebih bersifat kerajaan berperlembagaan — bertujuan memperkukuh kuasa pemerintahan negeri dan menghalang kuasa asing mencampuri urusan pentadbiran.",
    johor: {
      date: "14 April 1895",
      name: "Undang-Undang Tubuh Kerajaan Johor",
      clauseCount: "64 fasal",
      keyProvisions: [
        "Sultan tidak boleh menyerahkan negeri dan kerajaan Johor kepada sebarang kuasa asing",
        "Menteri-menteri dan Jemaah Pangkuan Kerajaan juga tidak boleh menyerahkan negeri kepada kerajaan asing",
        "Jemaah Menteri hendaklah terdiri daripada bangsa Melayu, rakyat Johor dan beragama Islam",
        "Ahli Majlis Mesyuarat Kerajaan mestilah terdiri daripada rakyat Johor",
        "Agama Islam sebagai agama negeri selama-lamanya",
        "Raja dan kerajaan Johor mengekalkan hubungan baik dengan kerajaan lain terutama British"
      ],
      significance: [
        "Menyediakan asas kukuh bagi Johor mengimbangi kuasa British dan mempertahankan identiti negeri",
        "Digubal membentuk kerajaan berteraskan demokrasi menggantikan pemerintahan bercorak mutlak",
        "Memberikan kesan kepada rancangan British menguasai Johor"
      ],
      firstOfItsKind: "Menjadikan Johor sebagai negeri Melayu PERTAMA yang mengamalkan sistem raja berperlembagaan dan mempunyai unsur demokratik"
    },
    terengganu: {
      date: "2 November 1911",
      name: "Undang-Undang Bagi Diri Kerajaan Terengganu (Itqan Al-Muluk Bi Ta'dil Al-Suluk)",
      meaning: "\"Keyakinan kepada pemerintah yang berdasarkan keadilan\"",
      clauseCount: "53 fasal",
      keyProvisions: [
        "Kerajaan Terengganu merupakan kerajaan Melayu Islam (Malayuwiyyah Islamiyyah)",
        "Islam merupakan asas perundangan negeri",
        "Sultan Terengganu tidak boleh menyerahkan negeri kepada mana-mana kuasa asing",
        "Sultan yang menyerahkan negeri kepada kuasa asing hendaklah turun dari takhta",
        "Menteri Besar mestilah beragama Islam dan rakyat Terengganu",
        "Ahli Mesyuarat Negeri boleh terdiri daripada bukan Islam tetapi mestilah rakyat Terengganu"
      ],
      significance: [
        "Langkah Sultan Zainal Abidin III memantapkan pentadbiran dan memelihara kedaulatan negeri",
        "Berhubung rapat dengan usaha mengukuhkan perpaduan raja, pembesar dan rakyat jelata",
        "Kekuatan hubungan raja-rakyat menjadi benteng menghalang campur tangan British"
      ]
    }
  },
  keyExamFacts: [
    "Perjanjian Bangkok 1909 menyebabkan kehilangan wilayah: Perlis (Pujoh), Kedah (Sadao, Setul, Terutau, Butang), Kelantan (Tabal, 15,000 orang Melayu)",
    "Sultan Abdul Hamid Halim Shah (Kedah) menyatakan tidak akan memaafkan sesiapa yang 'menjual negeri Kedah seperti menjual seekor kerbau'",
    "Sultan Muhammad IV (Kelantan) menolak Perjanjian Bangkok 1909 secara terus di hadapan wakil British dan Siam",
    "Durbar KL 1903: Sultan Idris (Perak) kritik pemusatan kuasa; Yang di-Pertuan Besar Negeri Sembilan tuntut Bahasa Melayu bahasa rasmi",
    "Durbar Pekan 1932: Sultan Iskandar Shah desak kuasa dikembalikan kepada Raja Melayu",
    "Durbar Klang 1937: cadangan buruh Jawa menggantikan Cina/India; perhatian kepada Melayu tanpa tanah/kerja",
    "Durbar Seri Menanti 1939: Sultan Hisamuddin cadangkan Malay Girls College",
    "Sultan Abu Bakar Johor (1862-1895) — bertemu Ratu Victoria, digelar Maharaja Johor 1868, tubuh Lembaga Penasihat Johor di London",
    "Diplomasi Sultan Abu Bakar mengekalkan kedaulatan Johor sehingga 1914; penggantinya Sultan Ibrahim menandatangani Perjanjian Johor-British 1914 menerima Penasihat Am British",
    "Sultan Zainal Abidin III Terengganu berunding sendiri dengan Gabenor Negeri-negeri Selat selepas 1909",
    "Perlis ialah negeri Melayu TERAKHIR menerima naungan British secara rasmi — Perjanjian Perlis-British hanya 28 April 1930",
    "Kedah menentang W.G. Maxwell (Penasihat British) atas isu bahasa/protokol — Perjanjian Kedah-British 1 November 1923, tetapi mengekalkan bahasa Melayu, kalendar Hijrah, cuti Jumaat",
    "Sultan Muhammad IV (Kelantan) menulis surat rasmi membantah Perjanjian Bangkok — Kelantan akhirnya menandatangani perjanjian berasingan 1910",
    "Sultan Muhammad II Terengganu (1918-1920) turun takhta 1920 akibat konflik dengan British tentang perundingan dengan Penasihat",
    "Undang-Undang Tubuh Kerajaan Johor (14 April 1895, 64 fasal) — perlembagaan bertulis PERTAMA di Alam Melayu, menjadikan Johor negeri Melayu pertama beramalkan raja berperlembagaan",
    "Undang-Undang Bagi Diri Kerajaan Terengganu (2 November 1911, Itqan Al-Muluk Bi Ta'dil Al-Suluk, 53 fasal) — mensyaratkan sultan yang menyerah negeri kepada kuasa asing mesti turun takhta"
  ],
  keyTerms: [
    "Protokol Sempadan", "Sultan Abdul Hamid Halim Shah", "Sultan Muhammad IV", "Durbar",
    "Sultan Idris Murshidul Adzam Shah", "Sultan Iskandar Shah", "Tuanku Abdul Rahman",
    "Sultan Hisamuddin Alam Shah", "Malay College Kuala Kangsar", "Sultan Abu Bakar", "Sultan Ibrahim",
    "Maharaja Johor", "Lembaga Penasihat Johor", "Sultan Zainal Abidin III"
  ],
  chapterSummary: "Bab 8 mengkaji reaksi pemerintah negeri-negeri Melayu Utara (Perlis, Kedah, Terengganu, Kelantan) terhadap kehilangan wilayah akibat Perjanjian Bangkok 1909, tindakan Raja Melayu menangani cabaran Barat melalui Durbar (1903, 1932, 1937, 1939), keengganan setiap negeri Utara menerima Penasihat British (Perlis hingga 1930, Kedah hingga 1923, Kelantan dan Terengganu melalui perjanjian berasingan), kebijaksanaan diplomasi Sultan Abu Bakar Johor (dan penggantinya Sultan Ibrahim yang akhirnya menerima Penasihat Am British 1914) dan Sultan Zainal Abidin III Terengganu, serta usaha pembesar Melayu memodenkan negeri melalui penggubalan perlembagaan bertulis (Undang-Undang Tubuh Kerajaan Johor 1895 — perlembagaan Melayu pertama, dan Undang-Undang Bagi Diri Kerajaan Terengganu 1911) untuk mengukuhkan kuasa pemerintahan dan menghalang campur tangan asing."
};

export default sej3Ch8Content;
