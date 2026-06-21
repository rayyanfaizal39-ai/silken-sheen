import type { Difficulty, QuizQuestion } from "./types";

type QuizSeed = [
  difficulty: Difficulty,
  question: string,
  options: [string, string, string, string],
  answerIndex: number,
  explanation: string,
];

const quizContent: QuizSeed[] = [
  // Questions 1-6: Kesultanan Pahang dan Kesultanan Perak
  [
    "Medium",
    "Siapakah yang dihantar oleh Sultan Mansur Shah untuk ditabalkan sebagai Sultan Pahang?",
    ["Raja Muzaffar", "Raja Muhammad", "Tun Zainal Abidin", "Raja Lumu"],
    1,
    "Sultan Mansur Shah menghantar puteranya, Raja Muhammad, yang kemudiannya mengasaskan Kesultanan Pahang pada tahun 1470.",
  ],
  [
    "Hard",
    "Manakah pernyataan yang tepat tentang pusat dan wilayah awal Kesultanan Pahang?",
    [
      "Berpusat di Tanah Abang dan meliputi Kampar hingga Selangor",
      "Berpusat di Kuala Selangor dan meliputi Klang hingga Bernam",
      "Berpusat di Pekan dan meliputi Sedili Besar hingga Terengganu",
      "Berpusat di Tanjung Baru dan meliputi Kemaman hingga Besut",
    ],
    2,
    "Kesultanan Pahang berpusat di Pekan berhampiran Kuala Sungai Pahang, dengan wilayah dari Sedili Besar hingga Terengganu.",
  ],
  [
    "Hard",
    "Apakah perkembangan yang berlaku di Pahang selepas Sultan Abdul Ghafur Muhaiyuddin Shah tidak meninggalkan waris?",
    [
      "Pahang menjadi wilayah pegangan Bendahara Johor dari tahun 1614 hingga 1884",
      "Pahang diserahkan kepada Raja Patani pada tahun 1708",
      "Pahang diperintah oleh kerabat Perak sehingga tahun 1766",
      "Pahang menjadi pusat pemerintahan Kesultanan Melayu Melaka",
    ],
    0,
    "Pahang diperintah oleh Kesultanan Johor Riau dari tahun 1614 hingga 1884 sebagai wilayah pegangan Bendahara Johor.",
  ],
  [
    "Medium",
    "Apakah tujuan Tun Saban dan Nakhoda Kassim pergi ke Kampar selepas serangan Portugis?",
    [
      "Mendapatkan bantuan untuk menyerang Siam",
      "Menjemput Raja Muzaffar menjadi Sultan Perak",
      "Memohon alat kebesaran daripada Raja Patani",
      "Menabalkan Bendahara Siwa Raja Wan Ahmad",
    ],
    1,
    "Tun Saban dan Nakhoda Kassim pergi ke Kampar untuk menjemput Raja Muzaffar, putera Sultan Mahmud Shah, menjadi Sultan Perak.",
  ],
  [
    "Hard",
    "Manakah kumpulan alat kebesaran yang dibawa oleh Raja Muzaffar ke Perak?",
    [
      "Nobat, cap mohor, pitis dan tampang",
      "Pedang Cura Si Manja Kini, keris, cap mohor, nobat dan Surat Ciri",
      "Seraja Diraja, keris, bidor dan Surat Ciri",
      "Kupang emas, nobat, cap mohor dan panca persada",
    ],
    1,
    "Raja Muzaffar membawa Pedang Cura Si Manja Kini, keris, cap mohor, nobat dan Surat Ciri ke Perak.",
  ],
  [
    "Medium",
    "Di manakah Sultan Muzaffar Shah mendirikan pusat pemerintahan pertama Kesultanan Perak pada tahun 1528?",
    ["Kuala Sungai Perak", "Tanah Abang", "Pangkalan Batu", "Kuala Berang"],
    1,
    "Sultan Muzaffar Shah mendirikan pusat pemerintahan pertama Kesultanan Perak di Tanah Abang, di pesisir Sungai Perak.",
  ],

  // Questions 7-12: Kesultanan Terengganu dan Kesultanan Selangor
  [
    "Hard",
    "Apakah hubungan antara Sultan Abdul Jalil dengan pengasasan Kesultanan Terengganu pada tahun 1708?",
    [
      "Baginda mengiktiraf Raja Lumu sebagai Sultan Terengganu",
      "Baginda menganugerahkan Terengganu kepada Tun Zainal Abidin",
      "Baginda menghantar Raja Muhammad mentadbir Terengganu",
      "Baginda menjemput Raja Muzaffar dari Kampar",
    ],
    1,
    "Sultan Abdul Jalil menganugerahkan Terengganu kepada Tun Zainal Abidin, putera Tun Habib Abdul Majid, pada tahun 1708.",
  ],
  [
    "Hard",
    "Apakah bantuan Raja Patani dalam peristiwa pengasasan Kesultanan Terengganu?",
    [
      "Menyediakan kelengkapan untuk menabalkan Tun Zainal Abidin",
      "Menganugerahkan wilayah Kemaman kepada Johor Riau",
      "Menghantar Raja Lumu bersama alat kebesaran",
      "Memilih sultan melalui Dewan Pangkuan Diraja",
    ],
    0,
    "Raja Patani menyediakan kelengkapan untuk menabalkan Tun Zainal Abidin sebagai Sultan Terengganu.",
  ],
  [
    "Medium",
    "Manakah padanan pusat pemerintahan dan wilayah awal Kesultanan Terengganu yang betul?",
    [
      "Tanjung Baru, Kuala Berang; Kemaman hingga Besut",
      "Pekan; Sedili Besar hingga Terengganu",
      "Kuala Selangor; Klang hingga Sungai Perak",
      "Tanah Abang; Bernam hingga Kampar",
    ],
    0,
    "Pusat pemerintahan pertama Terengganu didirikan di Tanjung Baru, Kuala Berang dan wilayahnya meliputi Kemaman hingga Besut.",
  ],
  [
    "Medium",
    "Siapakah Raja Lumu yang mengasaskan Kesultanan Selangor?",
    [
      "Putera Sultan Mahmud Shah dari Melaka",
      "Putera Tun Habib Abdul Majid",
      "Putera Daeng Chelak, Yang di-Pertuan Muda Johor Riau",
      "Putera Sultan Abdul Jalil dari Johor Riau",
    ],
    2,
    "Raja Lumu ialah putera Daeng Chelak, Yang di-Pertuan Muda Johor Riau.",
  ],
  [
    "Hard",
    "Bagaimanakah Raja Lumu memperoleh pengiktirafan sebagai Sultan Selangor?",
    [
      "Dewan di-Raja memilihnya melalui sistem penggiliran",
      "Sultan Mahmud Shah dari Perak menabalkannya serta menganugerahkan nobat dan cap mohor",
      "Sultan Abdul Jalil menganugerahkan Selangor kepadanya",
      "Raja Patani membekalkan 80 keluarga untuk mengiringinya",
    ],
    1,
    "Sultan Mahmud Shah dari Perak menabalkan Raja Lumu sebagai Sultan Selangor serta menganugerahkan nobat dan cap mohor.",
  ],
  [
    "Medium",
    "Apakah gelaran dan pusat pemerintahan Raja Lumu selepas mengasaskan Kesultanan Selangor pada tahun 1766?",
    [
      "Sultan Salehuddin Shah di Kuala Selangor",
      "Sultan Zainal Abidin I di Kuala Berang",
      "Sultan Muzaffar Shah di Tanah Abang",
      "Sultan Muhammad Shah di Pekan",
    ],
    0,
    "Raja Lumu memakai gelaran Sultan Salehuddin Shah dan mendirikan pusat pemerintahan di Kuala Selangor.",
  ],

  // Questions 13-18: Sistem pemerintahan, pewarisan takhta dan pembesar
  [
    "Hard",
    "Manakah padanan gelaran waris ganti dengan negeri yang tepat?",
    [
      "Pahang - Raja Muda; Terengganu - Tengku Mahkota; Selangor - Yang Di-Pertuan Muda",
      "Pahang - Tengku Mahkota; Terengganu - Yang Di-Pertuan Muda; Selangor - Raja Muda",
      "Pahang - Yang Di-Pertuan Muda; Terengganu - Raja Muda; Selangor - Tengku Mahkota",
      "Pahang - Raja Di Hilir; Terengganu - Tengku Bendahara; Selangor - Raja Kecil Besar",
    ],
    1,
    "Waris ganti Pahang digelar Tengku Mahkota, Terengganu digelar Yang Di-Pertuan Muda dan Selangor digelar Raja Muda.",
  ],
  [
    "Hard",
    "Apakah keunikan sistem pewarisan takhta Kesultanan Perak berbanding tiga kesultanan yang lain?",
    [
      "Sultan dipilih oleh syahbandar dan pegawai pelabuhan",
      "Takhta diwarisi secara terus oleh Tengku Mahkota",
      "Dewan Negara Perak memilih dan melantik sultan melalui sistem penggiliran",
      "Mufti menjadi satu-satunya pihak yang mengesahkan pelantikan sultan",
    ],
    2,
    "Perak mengamalkan sistem penggiliran, manakala Dewan Negara Perak memilih dan melantik sultan.",
  ],
  [
    "Hard",
    "Susunan manakah menunjukkan tiga kedudukan terawal dalam sistem penggiliran takhta Perak?",
    [
      "Sultan, Raja Muda, Raja Di Hilir",
      "Sultan, Raja Kecil Besar, Raja Kecil Sulong",
      "Raja Muda, Sultan, Raja Kecil Bongsu",
      "Raja Di Hilir, Raja Muda, Sultan",
    ],
    0,
    "Giliran takhta Perak bermula daripada Sultan, diikuti Raja Muda dan Raja Di Hilir sebelum kedudukan raja-raja kecil.",
  ],
  [
    "Hard",
    "Institusi manakah berhak memilih dan melantik Sultan Terengganu serta dikenali sebagai Ahli al-Hal wa al-Aqad?",
    [
      "Dewan Negara Perak",
      "Jumaah Pangkuan Diraja Negeri",
      "Dewan Pangkuan Diraja",
      "Dewan di-Raja",
    ],
    2,
    "Dewan Pangkuan Diraja Terengganu dikenali sebagai Ahli al-Hal wa al-Aqad, iaitu ahli yang memilih dan menjadikan raja.",
  ],
  [
    "Medium",
    "Apakah peranan Dewan di-Raja dalam sistem pemerintahan Kesultanan Selangor?",
    [
      "Memilih sultan melalui tujuh peringkat penggiliran",
      "Memberikan nasihat dan pengesahan dalam pelantikan sultan",
      "Mengurus pelabuhan serta memungut cukai perdagangan",
      "Menggubal Hukum Kanun Pahang",
    ],
    1,
    "Pelantikan Sultan Selangor dibuat atas nasihat dan pengesahan Dewan di-Raja, yang turut membantu dan menasihati sultan.",
  ],
  [
    "Hard",
    "Manakah kumpulan yang terdiri sepenuhnya daripada empat pembesar utama Pahang?",
    [
      "Orang Kaya Indera Shahbandar, Orang Kaya Indera Segara, Orang Kaya Pahlawan dan Orang Kaya Indera Perba Jelai",
      "Orang Kaya Bendahara Seri Maharaja, Orang Kaya Indera Segara, Orang Kaya Menteri Paduka Tuan dan Tengku Laksamana",
      "Orang Kaya Besar Maharaja Di-Raja, Orang Kaya Pahlawan, Raja Muda dan Tengku Bendahara",
      "Orang Kaya Temenggong Paduka Raja, Orang Kaya Indera Shahbandar, mufti dan kadi",
    ],
    0,
    "Empat pembesar utama Pahang ialah Orang Kaya Indera Shahbandar, Orang Kaya Indera Segara, Orang Kaya Pahlawan dan Orang Kaya Indera Perba Jelai.",
  ],

  // Questions 19-24: Agama Islam dan perundangan
  [
    "Medium",
    "Pernyataan manakah menggambarkan kedudukan agama Islam dalam pemerintahan negeri-negeri Melayu tersebut?",
    [
      "Mufti menjadi ketua negeri dan sultan mengetuai mahkamah sivil",
      "Islam menjadi agama utama dan sultan ialah ketua agama Islam bagi negerinya",
      "Jabatan Agama Islam memilih sultan bagi setiap negeri",
      "Kadi mengeluarkan semua tauliah setelah ditandatangani oleh syahbandar",
    ],
    1,
    "Islam menjadi agama utama di setiap negeri beraja dan sultan merupakan ketua agama Islam bagi negerinya.",
  ],
  [
    "Hard",
    "Apakah hubungan istana dengan tauliah penceramah agama menurut warisan pemerintahan Islam?",
    [
      "Tauliah dikeluarkan oleh pejabat istana setelah ditandatangani oleh sultan",
      "Tauliah dikeluarkan oleh Dewan Negara Perak tanpa pengesahan sultan",
      "Tauliah diberikan oleh syahbandar kepada pedagang luar",
      "Tauliah hanya dikeluarkan oleh mahkamah sivil",
    ],
    0,
    "Tauliah penceramah agama dikeluarkan oleh pejabat istana setelah ditandatangani oleh sultan.",
  ],
  [
    "Hard",
    "Manakah pernyataan yang tepat tentang Hukum Kanun Pahang?",
    [
      "Mengandungi 99 soal jawab dan digunakan pada zaman Sultan Iskandar Dzulkarnain",
      "Diperkenalkan pada 2 November 1911 oleh Sultan Zainal Abidin III",
      "Mengandungi 92 fasal dan digubal semasa Sultan Abdul Ghafur Muhaiyuddin Syah",
      "Diperkenalkan pada 1 Februari 1948 oleh Sultan Hishamudin Alam Shah Al-Haj",
    ],
    2,
    "Hukum Kanun Pahang digubal semasa pemerintahan Sultan Abdul Ghafur Muhaiyuddin Syah dan mengandungi 92 fasal.",
  ],
  [
    "Hard",
    "Apakah ciri utama Undang-Undang 99 Perak?",
    [
      "Berbentuk syair yang mengisahkan salasilah diraja",
      "Berbentuk soal jawab yang mengandungi 99 soalan serta jawapan",
      "Mengandungi 92 fasal tentang perdagangan pelabuhan sahaja",
      "Merupakan Undang-Undang Tubuh pertama yang diperkenalkan pada tahun 1948",
    ],
    1,
    "Undang-Undang 99 Perak berbentuk soal jawab dengan 99 soalan serta jawapan dan digunakan semasa pemerintahan Sultan Iskandar Dzulkarnain.",
  ],
  [
    "Hard",
    "Undang-undang manakah dikenali sebagai Itqan al-muluk bi ta'dil al-suluk?",
    [
      "Hukum Kanun Pahang",
      "Undang-Undang 99 Perak",
      "Undang-Undang Tubuh Kerajaan Selangor",
      "Undang-Undang Bagi Diri Kerajaan Negeri Terengganu",
    ],
    3,
    "Undang-Undang Bagi Diri Kerajaan Negeri Terengganu dikenali juga sebagai Itqan al-muluk bi ta'dil al-suluk.",
  ],
  [
    "Hard",
    "Manakah padanan tarikh, undang-undang dan pemerintah yang betul?",
    [
      "2 November 1911 - Undang-Undang Tubuh Selangor - Sultan Ibrahim Shah",
      "1 Februari 1948 - Undang-Undang Tubuh Selangor - Sultan Hishamudin Alam Shah Al-Haj",
      "1 Februari 1948 - Undang-Undang 99 Perak - Sultan Iskandar Dzulkarnain",
      "2 November 1911 - Hukum Kanun Pahang - Sultan Abdul Ghafur Muhaiyuddin Syah",
    ],
    1,
    "Undang-Undang Tubuh Kerajaan Selangor diperkenalkan pada 1 Februari 1948 semasa pemerintahan Sultan Hishamudin Alam Shah Al-Haj.",
  ],

  // Questions 25-30: Adat istiadat, persuratan dan ekonomi
  [
    "Medium",
    "Apakah yang dimaksudkan dengan Seraja Diraja dalam istiadat pemakaman?",
    [
      "Balai tempat berlangsungnya istiadat bertepung tawar",
      "Usungan untuk mengangkat jenazah ke tempat pemakaman",
      "Buaian diraja yang digunakan dalam adat berendoi",
      "Alat muzik yang dimainkan sepanjang tempoh berkabung",
    ],
    1,
    "Seraja Diraja ialah usungan yang digunakan untuk mengangkat jenazah diraja ke tempat pemakaman.",
  ],
  [
    "Hard",
    "Manakah urutan yang betul bagi sebahagian adat keputeraan diraja?",
    [
      "Bercukur ketika kandungan tujuh bulan, melenggang perut selepas lahir, kemudian azan",
      "Melenggang perut ketika kandungan tujuh bulan, azan selepas lahir, kemudian bercukur ketika bayi berusia tujuh hari",
      "Azan ketika kandungan tujuh bulan, berendoi selepas lahir, kemudian melenggang perut",
      "Berendoi sebelum kelahiran, azan pada usia tujuh hari, kemudian bercukur",
    ],
    1,
    "Melenggang perut dilakukan ketika kandungan tujuh bulan, bayi diperdengarkan azan selepas lahir dan istiadat bercukur dilakukan pada usia tujuh hari.",
  ],
  [
    "Hard",
    "Manakah padanan karya sejarah dengan pengarangnya yang tepat?",
    [
      "Hikayat Pahang - Raja Chulan; Misa Melayu - Haji Muhammad Nor",
      "Syair Tawarikh Zainal Abidin Ketiga - Wan Muhamad Amin; Kenang-Kenangan Selangor - Tengku Dalam Kalthum",
      "Hikayat Pahang - Haji Muhammad Nor; Misa Melayu - Raja Chulan",
      "Misa Melayu - Haji Mahmud al-Jawi; Hikayat Pahang - Tengku Ampuan Mariam",
    ],
    2,
    "Hikayat Pahang dikarang oleh Haji Muhammad Nor, manakala Misa Melayu dikarang oleh Raja Chulan.",
  ],
  [
    "Medium",
    "Apakah fakta yang tepat tentang Kitab Tib sebagai karya perubatan?",
    [
      "Dikarang oleh Raja Chulan di Perak pada abad ke-18",
      "Disalin oleh Haji Mahmud al-Jawi di Terengganu pada tahun 1819",
      "Dibukukan oleh Tengku Ampuan Mariam di Selangor",
      "Mencatatkan pelayaran Abdullah Munsyi ke pantai timur",
    ],
    1,
    "Kitab Tib ialah karya perubatan yang disalin oleh Haji Mahmud al-Jawi di Terengganu pada tahun 1819.",
  ],
  [
    "Hard",
    "Manakah pernyataan yang tepat tentang kegiatan ekonomi negeri-negeri Melayu tersebut?",
    [
      "Bijih timah menjadi kegiatan utama Terengganu dan Pahang sahaja",
      "Terengganu mengusahakan lada hitam dan perlombongan emas pada abad ke-18",
      "Perak hanya mengusahakan padi dan tidak menjalankan perlombongan",
      "Kuala Terengganu hanya memperdagangkan hasil pertanian tempatan",
    ],
    1,
    "Terengganu mengusahakan lada hitam dan perlombongan emas pada abad ke-18, sementara bijih timah menjadi kegiatan utama di Selangor dan Perak.",
  ],
  [
    "Hard",
    "Manakah padanan negeri dengan mata wang yang betul?",
    [
      "Perak - bidor; Pahang - pitis dan tampang; Terengganu - kupang emas dan pitis; Selangor - syiling",
      "Perak - kupang emas; Pahang - bidor; Terengganu - tampang; Selangor - pitis",
      "Perak - tampang; Pahang - syiling; Terengganu - bidor; Selangor - kupang emas",
      "Perak - pitis; Pahang - kupang emas; Terengganu - syiling; Selangor - bidor",
    ],
    0,
    "Perak menggunakan bidor, Pahang menggunakan pitis dan tampang, Terengganu menggunakan kupang emas dan pitis, manakala Selangor menggunakan syiling.",
  ],
];

export const sejarahF2C7Quizzes: QuizQuestion[] = quizContent.map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f2-c7-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 2",
    chapter: "Chapter 7",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
