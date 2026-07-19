// Sejarah Form 2, Bab 8 — Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis
// Source-verified content (T2_BT_SEJ.pdf, ms 136-155)

export interface KingdomFounding {
  name: string;
  origin: string;
  founder: string;
  foundingYear: string;
  firstCenter: string;
  notableFacts: string[];
  notableRuler?: { name: string; reignYears: string; achievement: string };
}

export interface RelationBasis {
  basis: string;
  points: string[];
}

export interface DiplomaticMethod {
  method: string;
  description: string;
}

export interface TradeGoods {
  kingdom: string;
  ports: string;
  goods: string[];
}

export interface Sej2Ch8Content {
  hook: { title: string; body: string };
  founding: {
    intro: string;
    kingdoms: KingdomFounding[];
  };
  relations: {
    intro: string;
    bases: RelationBasis[];
    diplomaticMethods: DiplomaticMethod[];
    tradeGoods: TradeGoods[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch8Content: Sej2Ch8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kedah ialah kerajaan tertua di negara kita, wujud sejak abad ketujuh — manakala Negeri Sembilan mengamalkan sistem pemerintahan yang benar-benar unik, dijemput dari Minangkabau, Sumatera. Bab ini menunjukkan empat cara berbeza sebuah kerajaan Melayu boleh terbentuk.",
  },
  founding: {
    intro: "Pengasasan kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis merupakan penerusan kegemilangan kerajaan-kerajaan Alam Melayu. Kerajaan Kedah merupakan kerajaan terawal diasaskan di negara kita, manakala Kelantan, Negeri Sembilan dan Perlis diasaskan selepas berakhirnya Kesultanan Melayu Melaka.",
    kingdoms: [
      {
        name: "Kerajaan Kedah",
        origin: "Diasaskan oleh keturunan raja yang datang dari Parsi",
        founder: "Maharaja Derbar Raja",
        foundingYear: "Sekitar 630 Masihi",
        firstCenter: "Kuala Sungai Merbok, kemudian Sungai Mas",
        notableFacts: [
          "Tan Dermadewa dan Tun Perkasa (ketua orang Melayu Kedah) melantik Maharaja Derbar Raja sebagai Raja Kedah",
          "Alat kebesaran nobat dibawa dari Parsi, dikenali sebagai Qalha — diwarisi sebagai alat kebesaran kerajaan Kedah",
          "Pelabuhan Sungai Mas aktif berdagang sejak abad kelima",
          "Kota Siputih dibuka Tunku Ahmad (1282) untuk menghadapi ancaman Siam dan Acheh — menjadi tempat bersemayam Sultan Ibrahim, Sultan Kedah keenam",
          "Kerajaan Kedah kekal hingga kini melalui penggantian pemerintah daripada jurai keturunan pengasasnya",
        ],
        notableRuler: {
          name: "Sultan Muhammad Jiwa Zainal Adilin Mu'adzam Shah II",
          reignYears: "1710-1778 (Sultan Kedah ke-19)",
          achievement: "Mengasaskan Alor Setar, kemudiannya diisytiharkan ibu negeri Kedah",
        },
      },
      {
        name: "Kerajaan Kelantan",
        origin: "Asalnya sebahagian Negara Patani Besar (diasaskan Raja Sakti I, 1650); berpecah kepada Kelantan Barat (Kota Kubang Labu) dan Kelantan Timur (Kota Pangkalan Datu) selepas kemangkatan Raja Bahar (1670)",
        founder: "Long Yunus (putera pemerintah Kota Kubang Labu)",
        foundingYear: "1762",
        firstCenter: "Menyatukan Kelantan Barat dan Timur; bergelar Yang di-Pertuan Kelantan, diiktiraf Sultan Terengganu",
        notableFacts: [
          "1777: pusat pentadbiran dipindah ke Kota Galoh; Masjid Kampung Laut dibina sebagai simbol pentadbiran Islam",
          "Legenda 2 Raja Perempuan: Che Siti Wan Kembang (awal abad ke-17, simbol kijang) dan Puteri Saadong (1667, pernah ditawan ke Siam)",
          "Keturunan Long Yunus mewarisi pemerintahan Kelantan hingga kini",
        ],
        notableRuler: {
          name: "Sultan Muhammad II",
          reignYears: "1837-1886",
          achievement: "Mengasaskan Kota Bharu (1844) sebagai pusat pemerintahan, membina Istana Balai Besar sebagai tempat bersemayam dan pusat pentadbiran, menguatkuasakan undang-undang syarak",
        },
      },
      {
        name: "Kerajaan Negeri Sembilan",
        origin: "Kehadiran masyarakat Minangkabau (Sumatera) sejak awal abad ke-15; asalnya naungan Kesultanan Johor Riau",
        founder: "Raja Melewar (dijemput oleh 4 Penghulu Luak: Sungai Ujong, Jelebu, Johol, Rembau, 1770)",
        foundingYear: "1773",
        firstCenter: "Seri Menanti; bergelar Yamtuan Seri Menanti, diiktiraf Kesultanan Johor Riau",
        notableFacts: [
          "Nama 'Negeri Sembilan' merujuk 9 'negeri' Minangkabau: Sungai Ujong, Jelebu, Jempol, Johol, Rembau, Tampin, Ulu Muar, Inas, Gunung Pasir",
          "Kuasa memilih Yamtuan ditentukan oleh Undang Yang Empat (Sungai Ujong, Jelebu, Johol, Rembau)",
          "Tradisi melantik pemerintah dari Minangkabau berakhir selepas kemangkatan Yamtuan Lenggang",
          "Yamtuan Radin (1830) menandakan bermulanya sistem penggantian waris pemerintah tempatan",
          "Seri Menanti kekal tempat bersemayam Yamtuan Besar hingga kini; Istana Seremban ialah istana hinggap",
        ],
        notableRuler: {
          name: "Yamtuan Antah",
          reignYears: "1872-1888",
          achievement: "Menjamin keamanan negeri daripada campur tangan kuasa luar, memperluas hubungan perdagangan",
        },
      },
      {
        name: "Kerajaan Perlis",
        origin: "Asalnya sebahagian wilayah Kedah; dikembangkan 3 Sultan Kedah (Muhyiddin Mansur Shah, Dhiauddin Mukarram Shah I & II)",
        founder: "Syed Hussin Jamalullail",
        foundingYear: "1843 (diiktiraf Siam dengan gelaran Phya Songkhram Ramu Wichit Willis Asmara Phya Pelit)",
        firstCenter: "Arau",
        notableFacts: [
          "1839: di bawah pengaruh Siam, Kedah dipecahkan kepada 4 unit — Setul, Perlis, Kubang Pasu, Kedah",
          "Amalan menghantar 'Bunga Mas' (bunga emas) ke Siam setiap 3 tahun sebagai tanda persahabatan (1841-1909, tidak kurang 20 kali)",
          "Keturunan Jamalullail (bergelar Syed) memerintah Perlis hingga kini dengan gelaran Raja Perlis",
        ],
      },
    ],
  },
  relations: {
    intro: "Kedah, Kelantan, Negeri Sembilan dan Perlis muncul sebagai kerajaan berdaulat dan menjalinkan hubungan dengan negeri-negeri Melayu lain dalam aspek diplomatik dan perdagangan, berasaskan tiga aspek: keserumpunan, geografi dan agama.",
    bases: [
      { basis: "Keserumpunan", points: ["Persamaan bahasa dan budaya mendorong hubungan dengan negeri Melayu lain", "Memudahkan interaksi sesama kerajaan", "Setiap kerajaan bersikap toleransi menerima amalan budaya kerajaan lain"] },
      { basis: "Geografi", points: ["Sempadan berjiran memudahkan perhubungan", "Sumber alam dan sumber bumi menjadi tarikan", "Sungai penting sebagai laluan perhubungan dikongsi bersama (contoh: Sungai Linggi, Negeri Sembilan)", "Pembentukan pelabuhan di pinggir sungai menggalakkan hubungan luar"] },
      { basis: "Agama", points: ["Berlaku melalui penerimaan Islam oleh pemerintah", "Diperkukuh peranan ulama dalam kegiatan keagamaan", "Berkongsi institusi pendidikan agama (contoh: Masjid Kampung Laut, Kelantan)"] },
    ],
    diplomaticMethods: [
      { method: "Pengiktirafan", description: "Mengabsahkan sultan sebagai pemerintah, mewujudkan hubungan antara kerajaan berdaulat bertaraf sama" },
      { method: "Bantuan Pertahanan", description: "Kerjasama ketenteraan antara negeri Melayu untuk menghadapi ancaman luar" },
      { method: "Perkahwinan Diraja", description: "Mengukuhkan hubungan diplomatik antara keluarga diraja negeri berlainan" },
    ],
    tradeGoods: [
      { kingdom: "Kedah", ports: "Pangkalan Lembah Bujang & Kuala Merbok (Sungai Merbok), Pangkalan Kuala Muda (Sungai Muda)", goods: ["Beras", "Garam", "Damar", "Kapur barus", "Emas urai", "Gading dan gajah (entrepot)"] },
      { kingdom: "Kelantan", ports: "Pangkalan Galoh — 'Pangkalan Permata' (Sungai Kelantan)", goods: ["Emas", "Mata wang dinar digunakan sejak tahun 1181"] },
      { kingdom: "Negeri Sembilan", ports: "Pangkalan di Sungai Linggi — dikuasai pedagang Rembau", goods: ["Bijih timah", "Sirih", "Kayu gaharu", "Kapur barus"] },
      { kingdom: "Perlis", ports: "Kuala Perlis (Sungai Perlis), Pekan Kangar", goods: ["Beras", "Bijih timah"] },
    ],
  },
  keyExamFacts: [
    "Kerajaan Kedah ialah kerajaan tertua di Malaysia — diasaskan Maharaja Derbar Raja dari Parsi, ~630 Masihi",
    "Nobat regalia Kedah dikenali sebagai Qalha, dibawa dari Parsi",
    "Kerajaan Kelantan diasaskan Long Yunus (1762), menyatukan Kelantan Barat dan Timur",
    "2 legenda Raja Perempuan Kelantan: Che Siti Wan Kembang dan Puteri Saadong",
    "Kerajaan Negeri Sembilan diasaskan Raja Melewar (1773) dari Minangkabau, berpusat di Seri Menanti",
    "Negeri Sembilan bermaksud 9 'negeri': Sungai Ujong, Jelebu, Jempol, Johol, Rembau, Tampin, Ulu Muar, Inas, Gunung Pasir",
    "Undang Yang Empat (Sungai Ujong, Jelebu, Johol, Rembau) menentukan pemilihan Yamtuan",
    "Kerajaan Perlis diasaskan Syed Hussin Jamalullail (1843), diiktiraf Siam",
    "Perlis menghantar 'Bunga Mas' ke Siam setiap 3 tahun (1841-1909) sebagai tanda persahabatan",
    "3 asas hubungan antara negeri Melayu: keserumpunan, geografi, agama",
    "3 cara hubungan diplomatik: pengiktirafan, bantuan pertahanan, perkahwinan diraja",
    "Kelantan menggunakan mata wang dinar dalam perdagangan sejak tahun 1181",
  ],
  keyTerms: [
    "Maharaja Derbar Raja", "Qalha", "Long Yunus", "Che Siti Wan Kembang", "Puteri Saadong",
    "Raja Melewar", "Yamtuan Seri Menanti", "Undang Yang Empat", "Syed Hussin Jamalullail",
    "Bunga Mas", "Keserumpunan", "Pengiktirafan", "Pangkalan Galoh", "Dinar",
  ],
  chapterSummary: "Bab 8 mengkaji pengasasan 4 kerajaan Melayu (Kedah oleh Maharaja Derbar Raja ~630M, Kelantan oleh Long Yunus 1762, Negeri Sembilan oleh Raja Melewar 1773, Perlis oleh Syed Hussin Jamalullail 1843) dengan latar belakang dan cara pembentukan yang berbeza-beza, hubungan setiap kerajaan dengan negeri-negeri Melayu lain berasaskan keserumpunan, geografi dan agama melalui pengiktirafan, bantuan pertahanan dan perkahwinan diraja, serta hubungan perdagangan melalui pelabuhan dan barang dagangan tersendiri bagi setiap kerajaan.",
};

