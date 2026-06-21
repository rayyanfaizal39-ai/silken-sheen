import type { Difficulty, QuizQuestion } from "./types";

type QuizSeed = [
  difficulty: Difficulty,
  question: string,
  options: [string, string, string, string],
  answerIndex: number,
  explanation: string,
];

const quizContent: QuizSeed[] = [
  // Questions 1-8: Pengasasan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis
  [
    "Medium",
    "Apakah peristiwa yang membawa kepada pengasasan Kerajaan Kedah pada tahun 630 Masihi?",
    [
      "Maharaja Derbar Raja dilantik sebagai Raja Kedah",
      "Tunku Ahmad membuka Kota Siputih",
      "Sultan Muhammad Jiwa mengasaskan Alor Setar",
      "Siam membahagikan Kedah kepada empat unit pentadbiran",
    ],
    0,
    "Tan Dermadewa dan Tun Perkasa melantik Maharaja Derbar Raja sebagai Raja Kedah pada tahun 630 Masihi.",
  ],
  [
    "Hard",
    "Mengapakah Tunku Ahmad membuka Kota Siputih pada tahun 1282?",
    [
      "Untuk mengawal perdagangan emas dari Kelantan",
      "Untuk menghadapi ancaman Siam dan Aceh di utara",
      "Untuk menerima pedagang dari Arab dan Kemboja",
      "Untuk dijadikan pusat pemerintahan Perlis",
    ],
    1,
    "Tunku Ahmad membuka Kota Siputih bagi menghadapi ancaman Siam dan Aceh di bahagian utara.",
  ],
  [
    "Hard",
    "Apakah kesan kemangkatan Raja Bahar pada tahun 1670 terhadap Kelantan?",
    [
      "Kelantan menjadi wilayah naungan Kesultanan Johor Riau",
      "Kelantan disatukan dengan kerajaan Terengganu",
      "Kelantan berpecah kepada Kelantan Barat dan Kelantan Timur",
      "Pusat pemerintahan dipindahkan terus ke Kota Bharu",
    ],
    2,
    "Selepas Raja Bahar mangkat, Kelantan berpecah kepada Kelantan Barat yang berpusat di Kota Kubang Labu dan Kelantan Timur di Kota Pangkalan Datu.",
  ],
  [
    "Medium",
    "Apakah tindakan Long Yunus yang menandakan pengasasan Kerajaan Kelantan pada tahun 1762?",
    [
      "Menyatukan Kelantan Barat dan Kelantan Timur",
      "Membina Istana Balai Besar di Kota Bharu",
      "Mengiktiraf pertuanan Kesultanan Melayu Melaka",
      "Membahagikan Kelantan kepada empat luak",
    ],
    0,
    "Long Yunus menyatukan Kelantan Barat dan Kelantan Timur lalu mengasaskan Kerajaan Kelantan pada tahun 1762.",
  ],
  [
    "Hard",
    "Bagaimanakah anak raja Minangkabau dipilih untuk memerintah Negeri Sembilan?",
    [
      "Sultan Melaka menghantar Raja Muzaffar ke Seri Menanti",
      "Empat Penghulu Luak menghantar utusan ke Minangkabau",
      "Siam melantik pemerintah selepas memecahkan wilayah Kedah",
      "Sultan Terengganu memilih pemerintah melalui perkahwinan diraja",
    ],
    1,
    "Penghulu Luak Sungai Ujong, Jelebu, Johol dan Rembau menghantar utusan untuk menjemput anak raja Minangkabau.",
  ],
  [
    "Hard",
    "Apakah perubahan dalam sistem penggantian pemerintah Negeri Sembilan selepas Yamtuan Lenggang mangkat?",
    [
      "Pemerintah dipilih daripada keturunan Sultan Kedah",
      "Siam mengambil alih kuasa memilih pemerintah",
      "Waris tempatan daripada keturunan Yamtuan Radin mula menggantikan pemerintah",
      "Empat Penghulu Luak kehilangan kuasa memilih pemerintah",
    ],
    2,
    "Pertabalan Yamtuan Radin pada tahun 1830 memulakan penggantian waris pemerintah tempatan daripada keturunannya.",
  ],
  [
    "Hard",
    "Apakah perkembangan politik yang membawa kepada kemunculan Perlis sebagai unit pentadbiran pada tahun 1839?",
    [
      "Johor Riau membahagikan Negeri Sembilan kepada empat luak",
      "Siam memecahkan Kedah kepada Setul, Perlis, Kubang Pasu dan Kedah",
      "Melaka menyerahkan Perlis kepada Syed Hussin Jamalullail",
      "Terengganu menggabungkan Perlis dengan Kelantan",
    ],
    1,
    "Ketika Kedah berada di bawah pengaruh Siam, wilayahnya dipecahkan kepada Setul, Perlis, Kubang Pasu dan Kedah pada tahun 1839.",
  ],
  [
    "Medium",
    "Apakah pusat pemerintahan Perlis selepas Syed Hussin Jamalullail diiktiraf sebagai pemerintah?",
    ["Kota Sena", "Kota Kayang", "Kuala Perlis", "Arau"],
    3,
    "Syed Hussin Jamalullail menjadikan Arau sebagai pusat pemerintahan Perlis.",
  ],

  // Questions 9-14: Tokoh pengasas dan pemerintah
  [
    "Hard",
    "Manakah padanan yang tepat tentang Maharaja Derbar Raja?",
    [
      "Berasal dari Parsi dan membina pusat pemerintahan di Sungai Mas",
      "Berasal dari Minangkabau dan berpusat di Seri Menanti",
      "Berasal dari Reman dan menyatukan Kelantan",
      "Berasal dari Kedah dan mengasaskan pemerintahan Perlis",
    ],
    0,
    "Maharaja Derbar Raja berasal dari Parsi dan membina pusat pemerintahan Kerajaan Kedah di Sungai Mas.",
  ],
  [
    "Medium",
    "Apakah kaitan Raja Sakti I dengan sejarah awal Kelantan?",
    [
      "Mengasaskan Negara Patani Besar pada tahun 1650",
      "Menyatukan Kelantan pada tahun 1762",
      "Memindahkan pusat pemerintahan ke Kota Galoh",
      "Mengasaskan Kota Bharu pada tahun 1844",
    ],
    0,
    "Raja Sakti I mengasaskan Negara Patani Besar pada tahun 1650 dan Kelantan pernah menjadi sebahagian daripadanya.",
  ],
  [
    "Hard",
    "Apakah bukti Raja Melewar mendapat pengiktirafan dalam mengasaskan Kerajaan Negeri Sembilan?",
    [
      "Baginda menerima gelaran daripada pemerintah Siam",
      "Baginda diiktiraf oleh pemerintah Kesultanan Johor Riau",
      "Baginda dilantik oleh Sultan Terengganu",
      "Baginda menerima nobat daripada Maharaja Parsi",
    ],
    1,
    "Raja Melewar memakai gelaran Yamtuan Seri Menanti dan mendapat pengiktirafan pemerintah Kesultanan Johor Riau.",
  ],
  [
    "Hard",
    "Apakah peristiwa penting yang melibatkan Syed Hussin Jamalullail pada tahun 1843?",
    [
      "Dilantik sebagai Penghulu Arau oleh Sultan Kedah",
      "Membina Kota Sena sebagai asas bandar Kangar",
      "Diiktiraf oleh Siam sebagai pemerintah Perlis",
      "Membuka pelabuhan Kuala Perlis di Sungai Perlis",
    ],
    2,
    "Siam mengiktiraf Syed Hussin Jamalullail sebagai pemerintah Perlis pada tahun 1843.",
  ],
  [
    "Medium",
    "Apakah sumbangan Sultan Muhammad Jiwa Zainal Adilin Mu'adzam Shah II kepada Kedah?",
    [
      "Mengasaskan Alor Setar sebagai ibu negeri Kedah",
      "Membina Kota Siputih untuk menghadapi Siam",
      "Membuka pusat pemerintahan pertama di Sungai Mas",
      "Mengasaskan Pangkalan Galoh di Sungai Kelantan",
    ],
    0,
    "Sultan Muhammad Jiwa Zainal Adilin Mu'adzam Shah II mengasaskan Alor Setar sebagai ibu negeri Kedah.",
  ],
  [
    "Hard",
    "Manakah tindakan Long Yunus yang memperlihatkan pengukuhan pentadbiran Islam di Kelantan?",
    [
      "Memperkenalkan mata wang logam dinar",
      "Mengarahkan pembinaan Masjid Kampung Laut",
      "Melantik Undang Yang Empat",
      "Menghantar bunga mas ke Bangkok",
    ],
    1,
    "Long Yunus mengarahkan pembinaan Masjid Kampung Laut sebagai simbol pentadbiran Islam di Kelantan.",
  ],

  // Questions 15-20: Asas hubungan, keserumpunan, geografi dan agama
  [
    "Medium",
    "Apakah tujuan utama kerajaan Melayu menjalinkan hubungan luar pada peringkat awal pengasasan?",
    [
      "Memperoleh monopoli perdagangan luar",
      "Memperkukuh kedaulatan kerajaan",
      "Menyebarkan sistem penggiliran takhta",
      "Memindahkan pusat pemerintahan",
    ],
    1,
    "Pada peringkat awal pengasasan, hubungan luar dijalinkan untuk memperkukuh kedaulatan kerajaan.",
  ],
  [
    "Hard",
    "Mengapakah pemerintah menghantar utusan ke negeri Melayu yang lain?",
    [
      "Untuk mendapatkan pengiktirafan kedaulatan",
      "Untuk memungut cukai pelabuhan",
      "Untuk memilih Undang Yang Empat",
      "Untuk menggantikan penggunaan mata wang",
    ],
    0,
    "Utusan dihantar bagi mendapatkan pengiktirafan terhadap kedaulatan kerajaan.",
  ],
  [
    "Hard",
    "Bagaimanakah keserumpunan membantu pembentukan hubungan antara kerajaan Melayu?",
    [
      "Persamaan bahasa dan budaya memudahkan interaksi",
      "Persamaan hasil bumi menghapuskan persaingan perdagangan",
      "Semua kerajaan menggunakan pemerintah daripada keturunan yang sama",
      "Semua negeri berkongsi sebuah pusat pemerintahan",
    ],
    0,
    "Persamaan bahasa dan budaya memudahkan interaksi serta mendorong hubungan antara kerajaan Melayu.",
  ],
  [
    "Medium",
    "Apakah faktor geografi yang menjadi laluan perhubungan bersama antara negeri?",
    ["Banjaran", "Selat", "Sungai", "Pulau"],
    2,
    "Sungai menjadi laluan perhubungan yang dikongsi bersama antara negeri.",
  ],
  [
    "Hard",
    "Apakah kesan pembentukan pelabuhan di pinggir sungai?",
    [
      "Menghalang kemasukan pedagang luar",
      "Menggalakkan hubungan dengan negeri jiran dan kuasa luar",
      "Menggantikan hubungan diplomatik dengan peperangan",
      "Mengurangkan penggunaan hasil sumber alam",
    ],
    1,
    "Pelabuhan di pinggir sungai menggalakkan hubungan dengan negeri jiran dan kuasa luar.",
  ],
  [
    "Hard",
    "Bagaimanakah institusi pendidikan agama mengukuhkan hubungan antara kerajaan Melayu?",
    [
      "Menerima penuntut dari pelbagai wilayah",
      "Melantik sultan sebagai pedagang",
      "Mengawal semua pelabuhan sungai",
      "Menyediakan bantuan ketenteraan",
    ],
    0,
    "Kehadiran penuntut dari pelbagai wilayah membolehkan institusi pendidikan agama dikongsi dan hubungan diperkukuh.",
  ],

  // Questions 21-25: Hubungan diplomatik
  [
    "Hard",
    "Apakah kepentingan pengiktirafan dalam hubungan diplomatik antara kerajaan Melayu?",
    [
      "Mengabsahkan sultan sebagai pemerintah",
      "Menentukan jenis barang dagangan",
      "Memindahkan pusat pentadbiran",
      "Menetapkan sempadan pelabuhan",
    ],
    0,
    "Pengiktirafan mengabsahkan sultan sebagai pemerintah dan mewujudkan hubungan antara kerajaan berdaulat yang bertaraf sama.",
  ],
  [
    "Hard",
    "Apakah bentuk hubungan antara Kedah dengan Kesultanan Melayu Melaka pada abad ke-15?",
    [
      "Kedah mengiktiraf Melaka sebagai pusat perdagangan sahaja",
      "Melaka mengiktiraf kedaulatan Kedah dan Kedah mengakui pertuanan Sultan Melaka",
      "Kedah membantu Melaka menyatukan Kelantan",
      "Melaka melantik Syed Hussin Jamalullail sebagai Raja Kedah",
    ],
    1,
    "Sultan Mahmud Shah mengiktiraf Kedah sebagai kerajaan berdaulat, manakala Kedah mengakui pertuanan Sultan Melaka.",
  ],
  [
    "Medium",
    "Siapakah yang mengiktiraf Kerajaan Kelantan di bawah pemerintahan Long Yunus pada tahun 1775?",
    ["Sultan Kedah", "Sultan Perak", "Sultan Terengganu", "Sultan Selangor"],
    2,
    "Sultan Terengganu mengiktiraf Kerajaan Kelantan yang telah disatukan oleh Long Yunus pada tahun 1775.",
  ],
  [
    "Hard",
    "Apakah sumbangan Long Gaffar dari Reman terhadap Kerajaan Kelantan?",
    [
      "Mengasaskan Kota Bharu sebagai pusat pemerintahan",
      "Membantu mengekalkan keamanan sebagai Perdana Menteri dan Panglima Perang",
      "Mendapatkan pengiktirafan daripada Sultan Melaka",
      "Memperkenalkan mata wang dinar di Pangkalan Galoh",
    ],
    1,
    "Long Gaffar dilantik sebagai Perdana Menteri Kelantan merangkap Panglima Perang dan membantu mengekalkan keamanan.",
  ],
  [
    "Hard",
    "Apakah hasil perkahwinan Onang Kening dengan Sultan Mahmud Shah dari Melaka?",
    [
      "Kelahiran Raja Muzaffar yang menjadi Sultan Perak pertama",
      "Pengasasan Kerajaan Kelantan oleh Long Yunus",
      "Pelantikan Raja Melewar sebagai Yamtuan Seri Menanti",
      "Pengiktirafan Syed Hussin Jamalullail sebagai Raja Perlis",
    ],
    0,
    "Perkahwinan Onang Kening dengan Sultan Mahmud Shah melahirkan Raja Muzaffar, Sultan Perak yang pertama.",
  ],

  // Questions 26-30: Hubungan perdagangan dan kesannya
  [
    "Hard",
    "Manakah kumpulan yang terdiri sepenuhnya daripada barang dagangan Kedah?",
    [
      "Beras, garam, damar, kapur barus dan emas urai",
      "Bijih timah, sirih, kayu gaharu dan kapur barus",
      "Emas, dinar, arang kayu dan ikan kering",
      "Beras, bijih timah, papan dan sirih",
    ],
    0,
    "Kedah memperdagangkan beras, garam, damar, kapur barus dan emas urai serta membekalkan gading dan gajah.",
  ],
  [
    "Hard",
    "Apakah bukti kegiatan perdagangan awal Kerajaan Kelantan?",
    [
      "Menggunakan mata wang logam dinar sejak tahun 1181",
      "Memperkemas mata wang di Pangkalan Kuala Muda",
      "Menghantar bunga mas setiap tiga tahun",
      "Menguasai perdagangan di Sungai Linggi",
    ],
    0,
    "Kelantan menggunakan mata wang logam dinar dalam urusan perdagangan sejak tahun 1181.",
  ],
  [
    "Hard",
    "Manakah padanan kerajaan, pangkalan dan barang dagangan yang tepat?",
    [
      "Negeri Sembilan - Sungai Linggi - bijih timah dan sirih",
      "Kelantan - Sungai Muda - beras dan garam",
      "Perlis - Pangkalan Galoh - emas dan dinar",
      "Kedah - Kuala Perlis - bijih timah dan kayu gaharu",
    ],
    0,
    "Negeri Sembilan mempunyai pangkalan di Sungai Linggi dan memperdagangkan bijih timah, sirih, kayu gaharu serta kapur barus.",
  ],
  [
    "Medium",
    "Apakah barang yang diperdagangkan oleh Perlis dengan negeri jiran dan Siam?",
    ["Emas dan damar", "Beras dan bijih timah", "Sirih dan kayu gaharu", "Gading dan gajah"],
    1,
    "Perlis memperdagangkan beras dan bijih timah dengan negeri jiran dan Siam.",
  ],
  [
    "Hard",
    "Apakah kesan hubungan perdagangan terhadap hubungan antara kerajaan Melayu?",
    [
      "Pelabuhan dan hasil bumi menghubungkan pedagang tempatan serta luar",
      "Setiap kerajaan menutup sungai kepada negeri jiran",
      "Hubungan diplomatik tidak lagi diperlukan",
      "Semua barang dagangan dikuasai oleh sebuah kerajaan",
    ],
    0,
    "Pelabuhan dan kepelbagaian hasil bumi membentuk hubungan perdagangan antara kerajaan serta menarik pedagang tempatan dan luar.",
  ],
];

export const sejarahF2C8Quizzes: QuizQuestion[] = quizContent.map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f2-c8-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 2",
    chapter: "Chapter 8",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
