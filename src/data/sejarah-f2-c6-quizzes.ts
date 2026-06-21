import type { Difficulty, QuizQuestion } from "./types";

type QuizSeed = [
  difficulty: Difficulty,
  question: string,
  options: [string, string, string, string],
  answerIndex: number,
  explanation: string,
];

const quizContent: QuizSeed[] = [
  // Questions 1-6: Pengasasan Johor Riau dan pusat pemerintahan
  [
    "Medium",
    "Siapakah Raja Ali yang mengasaskan Kesultanan Johor Riau pada tahun 1528?",
    [
      "Putera Sultan Mahmud Shah dan Tun Fatimah",
      "Putera Sultan Alauddin Riayat Shah I dan Tun Fatimah",
      "Putera Sultan Mahmud Shah II dan Raja Sulaiman",
      "Putera Bendahara Seri Nara Diraja dan Tun Seri Lanang",
    ],
    0,
    "Raja Ali ialah putera Sultan Mahmud Shah dan Tun Fatimah yang mengasaskan Kesultanan Johor Riau pada tahun 1528.",
  ],
  [
    "Medium",
    "Apakah gelaran yang digunakan oleh Raja Ali selepas dilantik sebagai pemerintah Johor Riau?",
    [
      "Sultan Abdul Jalil Riayat Shah IV",
      "Sultan Alauddin Riayat Shah I",
      "Sultan Sulaiman Badrul Alam Shah",
      "Sultan Abdul Jalil Rahmat Shah",
    ],
    1,
    "Raja Ali menggunakan gelaran Sultan Alauddin Riayat Shah I selepas dilantik sebagai pemerintah Johor Riau.",
  ],
  [
    "Hard",
    "Mengapakah Kota Kara sesuai dijadikan pusat pemerintahan awal Kesultanan Johor Riau?",
    [
      "Terletak di persimpangan maritim dan mempunyai gudang bawah tanah",
      "Sungainya sempit dan tidak dapat dilalui oleh kapal perang",
      "Berhampiran sungai yang lebar dan dalam serta dikelilingi kawasan berbukit",
      "Mempunyai hubungan perdagangan langsung dengan Belanda",
    ],
    2,
    "Kota Kara berhampiran sungai yang lebar dan dalam, manakala kawasan berbukit di sekitarnya menjadi benteng pertahanan.",
  ],
  [
    "Medium",
    "Apakah ciri binaan pertahanan Kota Kara?",
    [
      "Dikelilingi tembok batu setinggi 20 kaki",
      "Dipagari pancang kayu besar setinggi 40 kaki",
      "Dibina di atas kapal perang yang besar",
      "Dilindungi gudang bawah tanah berlapis",
    ],
    1,
    "Kota Kara dipagari dengan pancang kayu besar setinggi 40 kaki sebagai pertahanan.",
  ],
  [
    "Hard",
    "Apakah faktor utama yang menjadikan Kota Sayong lebih selamat daripada serangan musuh?",
    [
      "Kapal perang sukar melintasi sungainya yang sempit",
      "Kota ini dipagari pancang kayu setinggi 40 kaki",
      "Belanda menempatkan tenteranya di kota tersebut",
      "Kota ini terletak di persimpangan lalu lintas maritim",
    ],
    0,
    "Kota Sayong lebih selamat kerana kapal perang musuh sukar melintasi sungai yang sempit.",
  ],
  [
    "Hard",
    "Apakah kepentingan pemindahan pusat pemerintahan ke Kota Batu, Johor Lama pada tahun 1540?",
    [
      "Membolehkan Johor mengawal pergerakan kapal di Sungai Johor",
      "Membolehkan Johor menguasai kawasan perlombongan di Pulau Bangka",
      "Mengelakkan persaingan perdagangan dengan pedagang Jawa",
      "Menjadikan Kota Batu pusat pemerintahan Belanda",
    ],
    0,
    "Kedudukan Kota Batu yang strategik di Sungai Johor memudahkan pengawalan pergerakan kapal dagang dan kapal perang.",
  ],

  // Questions 7-12: Kedudukan strategik dan pusat perdagangan
  [
    "Medium",
    "Mengapakah kapal besar mudah mudik ke pelabuhan Johor Lama, Batu Sawar dan Panchor?",
    [
      "Sungai Johor lebar dan dalam",
      "Selat Melaka sempit dan cetek",
      "Pelabuhan tersebut terlindung oleh tembok batu",
      "Orang Laut mengecilkan saiz kapal dagang",
    ],
    0,
    "Sungai Johor yang lebar dan dalam membolehkan kapal besar mudah mudik ke pelabuhan Johor Lama, Batu Sawar dan Panchor.",
  ],
  [
    "Hard",
    "Bagaimanakah lokasi pelabuhan Johor Riau di selatan Selat Melaka membantu perkembangan perdagangan?",
    [
      "Mengawal lalu lintas kapal dagang dari Timur dan Barat",
      "Menghalang semua pedagang asing memasuki Selat Melaka",
      "Menguasai pengeluaran kain dari Gujerat",
      "Menggantikan penggunaan mata wang dengan tukar barang",
    ],
    0,
    "Lokasi di selatan Selat Melaka membolehkan Johor Riau mengawal lalu lintas kapal dagang dari Timur dan Barat.",
  ],
  [
    "Hard",
    "Mengapakah pelabuhan Riau menjadi tumpuan pedagang luar?",
    [
      "Terletak berhampiran pusat pengeluaran teh China",
      "Terletak di persimpangan lalu lintas maritim yang strategik",
      "Menjadi satu-satunya pelabuhan yang menggunakan mata wang asing",
      "Berada di bawah pentadbiran Portugis",
    ],
    1,
    "Pelabuhan Riau berada di persimpangan lalu lintas maritim yang strategik dan menjadi tumpuan pedagang luar.",
  ],
  [
    "Medium",
    "Apakah peranan Johor Riau sebagai pusat entrepot?",
    [
      "Menghasilkan semua barang dagangan yang diperlukan pedagang",
      "Menjadi pusat pertukaran barangan Alam Melayu dengan barangan luar",
      "Mengawal pentadbiran semua kerajaan di Alam Melayu",
      "Membina kapal perang untuk Portugis dan Acheh",
    ],
    1,
    "Johor Riau menjadi pusat pertukaran barangan keluaran Alam Melayu dengan barangan dari China, India dan Arab.",
  ],
  [
    "Hard",
    "Manakah padanan kawasan dengan barang dagangan yang betul?",
    [
      "Klang, Sungai Ujong dan Bernam - bijih timah",
      "Jambi - emas",
      "Inderagiri - lada hitam",
      "Pulau Bangka - kain sutera",
    ],
    0,
    "Bijih timah dibawa dari Klang, Sungai Ujong dan Bernam serta Pulau Bangka di Sumatera.",
  ],
  [
    "Hard",
    "Manakah pasangan barang dengan kawasan sumbernya yang tepat?",
    [
      "Lada hitam dari Jambi dan emas dari Inderagiri",
      "Emas dari Jambi dan beras dari Inderagiri",
      "Bijih timah dari Jambi dan lada hitam dari Siam",
      "Beras dari Pulau Bangka dan emas dari Klang",
    ],
    0,
    "Lada hitam dibawa dari Jambi, manakala emas dibawa dari Inderagiri.",
  ],

  // Questions 13-18: Pedagang, barang dagangan dan pelabuhan Johor Riau
  [
    "Hard",
    "Mengapakah pedagang Jawa memilih untuk berdagang di pelabuhan Johor Riau?",
    [
      "Tidak berminat berdagang dengan Portugis di Melaka",
      "Dilarang menggunakan mata wang di Melaka",
      "Mendapat monopoli perdagangan emas di Johor",
      "Diwajibkan menyertai angkatan Orang Laut",
    ],
    0,
    "Pedagang Jawa memilih pelabuhan Johor kerana tidak berminat berdagang dengan Portugis di Melaka.",
  ],
  [
    "Medium",
    "Apakah barang utama yang dipasarkan oleh pedagang Siam di Johor Riau?",
    ["Emas", "Bijih timah", "Beras", "Kain sutera"],
    2,
    "Pedagang Siam memasarkan hasil pertanian, khususnya beras, di pelabuhan Johor Riau.",
  ],
  [
    "Hard",
    "Manakah kumpulan barang yang dibawa dari China ke pelabuhan Batu Sawar?",
    [
      "Benang emas, kain sutera putih, seramik dan teh",
      "Beras, lada hitam, damar dan sagu",
      "Wangian, manik, garam dan ikan masin",
      "Bijih timah, emas, kelapa kering dan pinang",
    ],
    0,
    "Barangan China termasuk benang emas, kain sutera putih, barang tembikar, seramik, kuali besi, teh dan tembaga.",
  ],
  [
    "Medium",
    "Apakah barangan yang dibawa oleh pedagang Gujerat ke Johor Riau?",
    [
      "Kain, wangian dan manik",
      "Beras, teh dan tembaga",
      "Emas, damar dan sagu",
      "Bijih timah, garam dan ikan masin",
    ],
    0,
    "Pedagang Gujerat membawa kain, wangian dan manik ke pelabuhan Johor Riau.",
  ],
  [
    "Hard",
    "Manakah kumpulan yang terdiri sepenuhnya daripada barang tempatan Johor Riau?",
    [
      "Kelapa kering, kayu gaharu, damar dan sagu",
      "Kain sutera, teh, tembaga dan seramik",
      "Wangian, manik, benang emas dan kuali besi",
      "Dolar Sepanyol, kupang, katun dan teh",
    ],
    0,
    "Antara barang tempatan Johor Riau ialah kelapa kering, kayu gaharu, damar, kelembak, sagu, pinang, ikan masin, periuk belanga, lilin dan garam.",
  ],
  [
    "Hard",
    "Apakah bukti yang menunjukkan kesibukan pelabuhan Johor Riau, khususnya pelabuhan Riau?",
    [
      "Sebanyak 500 hingga 600 buah kapal dagang pelbagai bangsa berlabuh",
      "Semua urusan jual beli hanya menggunakan Dolar Sepanyol",
      "Setiap pedagang diwajibkan membina sebuah kapal perang",
      "Pelabuhan hanya menerima kapal dari China dan Gujerat",
    ],
    0,
    "Terdapat 500 hingga 600 buah kapal dagang daripada pelbagai bangsa berlabuh di pelabuhan Johor, khususnya pelabuhan Riau.",
  ],

  // Questions 19-24: Sistem Naungan, mata wang, Orang Laut dan pengurusan pelabuhan
  [
    "Medium",
    "Siapakah yang memberikan naungan kepada pedagang di Johor Riau?",
    [
      "Bendahara, Temenggung, Laksamana dan Raja Indera Bongsu",
      "Syahbandar, Tun Seri Lanang, Raja Kechil dan Daeng Merewah",
      "Sultan Acheh, Portugis, Belanda dan pedagang Siam",
      "Orang Laut, pedagang Jawa, pedagang Gujerat dan pedagang China",
    ],
    0,
    "Pedagang mendapat naungan daripada Bendahara, Temenggung, Laksamana dan Raja Indera Bongsu.",
  ],
  [
    "Hard",
    "Apakah faedah Sistem Naungan kepada pedagang Johor Riau?",
    [
      "Mudah memperoleh surat kebenaran Belanda dan belayar tanpa gangguan",
      "Dikecualikan sepenuhnya daripada cukai perdagangan",
      "Berhak dilantik sebagai pembesar Johor Riau",
      "Mendapat kuasa menetapkan nilai mata wang",
    ],
    0,
    "Melalui Sistem Naungan, pedagang mudah mendapat surat kebenaran Belanda dan dapat belayar tanpa gangguan di Selat Melaka.",
  ],
  [
    "Hard",
    "Manakah padanan mata wang Johor Riau dengan jenis logam yang betul?",
    [
      "Mas - emas, kupang - perak, katun - timah",
      "Mas - perak, kupang - timah, katun - emas",
      "Mas - timah, kupang - emas, katun - perak",
      "Mas - emas, kupang - timah, katun - perak",
    ],
    0,
    "Mata wang emas dikenali sebagai mas, mata wang perak sebagai kupang dan mata wang timah sebagai katun.",
  ],
  [
    "Hard",
    "Mata wang asing manakah turut digunakan di Johor Riau pada akhir abad ke-18?",
    [
      "Dolar Sepanyol, Dolar Mexico dan duit Belanda",
      "Dolar Siam, Dolar China dan duit Gujerat",
      "Mas, kupang dan katun",
      "Dinar Arab, rupee India dan wang Portugis",
    ],
    0,
    "Pada akhir abad ke-18, Dolar Sepanyol, Dolar Mexico dan duit Belanda turut digunakan di Johor Riau.",
  ],
  [
    "Hard",
    "Manakah gabungan tugas Orang Laut yang tepat dalam pengurusan pelabuhan Johor Riau?",
    [
      "Mengawal pelabuhan, menunda kapal dan menjadi penunjuk arah",
      "Menetapkan cukai, ukuran dan berat barangan",
      "Mengeluarkan mata wang mas, kupang dan katun",
      "Menyusun Sulalatus Salatin dan mengurus surat kebenaran",
    ],
    0,
    "Orang Laut menjadi pengawal pelabuhan, penunda kapal dagang, penunjuk arah dan pengawal perairan Johor serta Selat Melaka.",
  ],
  [
    "Hard",
    "Apakah tujuan gudang bawah tanah disediakan di pelabuhan Johor Riau?",
    [
      "Menyimpan barangan supaya terhindar daripada kebakaran",
      "Menyembunyikan kapal perang daripada Portugis",
      "Menempatkan pegawai yang mengutip cukai",
      "Membaiki kapal pesisir pantai yang rosak",
    ],
    0,
    "Gudang bawah tanah digunakan untuk menyimpan barangan bagi mengelakkannya daripada kebakaran.",
  ],

  // Questions 25-30: Cabaran politik dan persuratan
  [
    "Hard",
    "Apakah punca utama persaingan antara Johor, Acheh dan Portugis?",
    [
      "Perebutan untuk menguasai perdagangan di Selat Melaka",
      "Perselisihan tentang penggunaan mata wang asing",
      "Perebutan pusat persuratan di Pulau Penyengat",
      "Persaingan untuk menguasai pengeluaran beras di Siam",
    ],
    0,
    "Johor, Acheh dan Portugis bersaing untuk menguasai perdagangan di Selat Melaka.",
  ],
  [
    "Medium",
    "Apakah nama lain bagi peperangan antara Johor, Acheh dan Portugis?",
    [
      "Perang Tiga Segi atau Perang Seratus Tahun",
      "Perang Johor-Jambi",
      "Perang Kota Kara",
      "Perang Opu Bugis",
    ],
    0,
    "Peperangan Johor-Acheh-Portugis dikenali sebagai Perang Tiga Segi atau Perang Seratus Tahun.",
  ],
  [
    "Hard",
    "Pernyataan manakah benar tentang Perang Johor-Jambi?",
    [
      "Berlaku dari tahun 1659 hingga 1679 akibat tuntutan Johor terhadap wilayah Tungkal",
      "Berlaku pada tahun 1718 kerana Raja Kechil menuntut takhta Johor",
      "Berakhir apabila Portugis menawan Kota Kara pada tahun 1535",
      "Bermula kerana Jambi mahu menguasai pusat persuratan di Batu Sawar",
    ],
    0,
    "Perang Johor-Jambi berlaku dari tahun 1659 hingga 1679 berkaitan tuntutan Johor terhadap wilayah Tungkal.",
  ],
  [
    "Hard",
    "Bagaimanakah Raja Sulaiman berjaya menamatkan ancaman Raja Kechil pada tahun 1722?",
    [
      "Mendapat bantuan Opu Bugis Lima Bersaudara untuk mengusir Raja Kechil",
      "Menjalinkan pakatan dengan Portugis untuk menyerang Siak",
      "Menyerahkan wilayah Tungkal kepada kerajaan Jambi",
      "Memindahkan pusat pemerintahan ke Kota Kara",
    ],
    0,
    "Raja Sulaiman mendapat bantuan Opu Bugis Lima Bersaudara untuk mengusir Raja Kechil, yang kemudiannya berundur ke Siak.",
  ],
  [
    "Hard",
    "Apakah sumbangan utama Tun Seri Lanang dalam persuratan Johor Riau?",
    [
      "Menyusun dan menulis semula Sulalatus Salatin pada tahun 1612",
      "Mengarang Hikayat Hang Tuah selepas tahun 1641",
      "Mengarang Tajul Salatin pada tahun 1603",
      "Menubuhkan pusat persuratan di Pulau Penyengat pada tahun 1528",
    ],
    0,
    "Tun Seri Lanang menyusun dan menulis semula Sulalatus Salatin pada tahun 1612.",
  ],
  [
    "Hard",
    "Apakah kandungan utama Sulalatus Salatin?",
    [
      "Asal usul keturunan raja Melaka, adat istiadat kerajaan dan sejarah Kesultanan Melayu Melaka",
      "Kisah Raja Kechil menuntut takhta Johor dan bantuan Opu Bugis",
      "Panduan membina kota pertahanan di sepanjang Sungai Johor",
      "Tatacara perdagangan, penggunaan mata wang dan Sistem Naungan",
    ],
    0,
    "Sulalatus Salatin menceritakan asal usul keturunan raja-raja Melaka, adat istiadat kerajaan dan sejarah Kesultanan Melayu Melaka.",
  ],
];

export const sejarahF2C6Quizzes: QuizQuestion[] = quizContent.map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f2-c6-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 2",
    chapter: "Chapter 6",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
