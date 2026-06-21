import type { Difficulty, QuizQuestion } from "./types";

type QuizSeed = [
  difficulty: Difficulty,
  question: string,
  options: [string, string, string, string],
  answerIndex: number,
  explanation: string,
];

const quizContent: QuizSeed[] = [
  // Questions 1-8: Sistem pemerintahan beraja dan hierarki pemerintahan
  [
    "Medium",
    "Manakah padanan gelaran pemerintah dengan kerajaan yang betul?",
    [
      "Kedah dan Kelantan - Sultan; Perlis - Raja",
      "Kedah dan Perlis - Sultan; Kelantan - Raja",
      "Kedah - Raja; Kelantan dan Perlis - Sultan",
      "Kedah, Kelantan dan Perlis - Raja",
    ],
    0,
    "Pemerintah Kedah dan Kelantan menggunakan gelaran Sultan, manakala pemerintah Perlis menggunakan gelaran Raja.",
  ],
  [
    "Hard",
    "Apakah asas pelantikan pengganti pemerintah di Kedah, Kelantan dan Perlis?",
    [
      "Dipilih daripada pembesar yang paling kanan",
      "Dilantik daripada putera Sultan atau Raja dalam jurai keturunan pengasas",
      "Dipilih secara undian oleh semua penghulu",
      "Dilantik daripada ketua agama negeri",
    ],
    1,
    "Pengganti pemerintah dilantik daripada putera Sultan atau Raja dalam jurai keturunan pemerintah pengasas.",
  ],
  [
    "Hard",
    "Susunan manakah menunjukkan hierarki pemerintahan beraja daripada peringkat tertinggi?",
    [
      "Penghulu, Pembesar, Sultan atau Raja",
      "Pembesar, Sultan atau Raja, Penghulu",
      "Sultan atau Raja, Pembesar, Penghulu",
      "Sultan atau Raja, Penghulu, Pembesar",
    ],
    2,
    "Sultan atau Raja berada pada kedudukan tertinggi, diikuti Pembesar dan Penghulu pada peringkat tempatan.",
  ],
  [
    "Medium",
    "Apakah dua kedudukan utama Sultan atau Raja menurut undang-undang tubuh negeri?",
    [
      "Ketua Negeri dan Ketua Agama Islam",
      "Ketua Pembesar dan Ketua Penghulu",
      "Yang Dipertua dan Menteri Besar",
      "Ketua Luak dan Ketua Suku",
    ],
    0,
    "Sultan atau Raja berkedudukan sebagai Ketua Negeri dan Ketua Agama Islam.",
  ],
  [
    "Hard",
    "Siapakah yang melantik Pembesar dalam sistem pemerintahan beraja?",
    ["Menteri Besar", "Penghulu", "Sultan atau Raja", "Majlis Mesyuarat Kerajaan Negeri"],
    2,
    "Pembesar dilantik oleh Sultan atau Raja untuk membantu pentadbiran kerajaan.",
  ],
  [
    "Hard",
    "Apakah fungsi utama Pembesar dalam hierarki pemerintahan?",
    [
      "Memilih pengganti pemerintah melalui undian",
      "Membantu melancarkan pentadbiran kerajaan",
      "Mengetuai semua institusi agama",
      "Menggantikan peranan penghulu di setiap mukim",
    ],
    1,
    "Pembesar membantu melancarkan pentadbiran dan melaksanakan tugas di kawasan yang dipertanggungjawabkan.",
  ],
  [
    "Medium",
    "Apakah peranan Penghulu dalam sistem pemerintahan beraja?",
    [
      "Menjadi penghubung antara pemerintah dengan rakyat",
      "Memilih Sultan atau Raja",
      "Menganugerahkan darjah kebesaran",
      "Mengetuai Majlis Mesyuarat Kerajaan Negeri",
    ],
    0,
    "Penghulu menjadi penghubung antara pemerintah dengan rakyat dan mentadbir pada peringkat tempatan.",
  ],
  [
    "Hard",
    "Bagaimanakah institusi beraja berkembang selepas negara mencapai kemerdekaan?",
    [
      "Menjadi institusi raja berperlembagaan",
      "Digantikan oleh sistem Penghulu",
      "Disatukan dengan Undang Yang Empat",
      "Dikendalikan sepenuhnya oleh Pembesar",
    ],
    0,
    "Institusi beraja berkembang menjadi institusi raja berperlembagaan selepas negara mencapai kemerdekaan.",
  ],

  // Questions 9-14: Adat istiadat dan perundangan pemerintah
  [
    "Medium",
    "Bilakah majlis pemasyhuran pengganti Sultan atau Raja disempurnakan?",
    [
      "Selepas istiadat pertabalan selesai",
      "Sebelum jenazah pemerintah dimakamkan",
      "Pada hari keputeraan pemerintah baharu",
      "Selepas Menteri Besar dipilih",
    ],
    1,
    "Majlis pemasyhuran pengganti disempurnakan sebelum jenazah pemerintah dimakamkan.",
  ],
  [
    "Hard",
    "Apakah yang dipersembahkan pada permulaan istiadat pertabalan?",
    [
      "Watikah pertabalan dan darjah kebesaran",
      "Naskhah al-Quran dan alat kebesaran diraja",
      "Keris kuasa dan harta pusaka",
      "Nobat dan enakmen zakat",
    ],
    1,
    "Istiadat pertabalan dimulakan dengan mempersembahkan naskhah al-Quran dan alat kebesaran diraja.",
  ],
  [
    "Hard",
    "Apakah tindakan Sultan atau Raja selepas membaca watikah pertabalan?",
    [
      "Mengucup keris kuasa",
      "Memilih Menteri Besar",
      "Menerima bunga emas",
      "Melantik Undang Yang Empat",
    ],
    0,
    "Selepas membaca watikah pertabalan, Sultan atau Raja mengucup keris kuasa.",
  ],
  [
    "Medium",
    "Apakah tujuan penganugerahan darjah kebesaran?",
    [
      "Mengiktiraf kerabat diraja dan rakyat yang berjasa",
      "Menentukan pengganti Sultan atau Raja",
      "Membentuk jurai keturunan pemerintah",
      "Memilih anggota Majlis Mesyuarat Kerajaan Negeri",
    ],
    0,
    "Darjah kebesaran dianugerahkan sebagai pengiktirafan kepada kerabat diraja dan rakyat yang berjasa.",
  ],
  [
    "Hard",
    "Manakah syarat lengkap bagi penggantian Sultan atau Raja menurut undang-undang tubuh negeri?",
    [
      "Lelaki, pembesar kanan, berbangsa Melayu dan beragama Islam",
      "Lelaki, berketurunan raja, berbangsa Melayu dan beragama Islam",
      "Lelaki, berketurunan penghulu, tinggal di negeri dan beragama Islam",
      "Lelaki, berumur 21 tahun, berbangsa Melayu dan ahli Dewan Undangan Negeri",
    ],
    1,
    "Sultan atau Raja hendaklah lelaki, berketurunan raja, berbangsa Melayu dan beragama Islam.",
  ],
  [
    "Hard",
    "Manakah padanan badan penasihat dengan ketuanya yang betul?",
    [
      "Majlis Mesyuarat Kerajaan Negeri - Menteri Besar",
      "Dewan Undangan Negeri - Penghulu",
      "Undang Yang Empat - Sultan",
      "Jemaah Menteri - Ibu Soko",
    ],
    0,
    "Majlis Mesyuarat Kerajaan Negeri diketuai oleh Menteri Besar sebagai Yang Dipertua untuk membantu Sultan atau Raja.",
  ],

  // Questions 15-20: Hak rakyat, undang-undang Islam dan persuratan
  [
    "Hard",
    "Siapakah yang layak menjadi Ahli Dewan Undangan Negeri menurut undang-undang tubuh negeri?",
    [
      "Warganegara berumur 18 tahun yang lahir di negeri",
      "Warganegara berumur 21 tahun atau lebih yang tinggal di negeri",
      "Semua rakyat yang dilantik oleh Penghulu",
      "Kerabat diraja yang berumur 21 tahun sahaja",
    ],
    1,
    "Warganegara berumur 21 tahun atau lebih yang tinggal di dalam negeri layak menjadi Ahli Dewan Undangan Negeri.",
  ],
  [
    "Hard",
    "Manakah padanan usaha pemantapan undang-undang Islam dengan negeri yang tepat?",
    [
      "Kedah - enakmen zakat; Kelantan - undang-undang jenayah Islam",
      "Kedah - Hukum Maksiat; Kelantan - enakmen zakat",
      "Perlis - larangan menora; Kedah - busana cara Islam",
      "Kelantan - enakmen zakat; Perlis - undang-undang jenayah Islam",
    ],
    0,
    "Kedah memperkenalkan enakmen zakat, manakala Kelantan memperkenalkan enakmen berkaitan undang-undang jenayah Islam.",
  ],
  [
    "Hard",
    "Apakah kandungan yang membezakan Al-Tarikh Salasilah Negeri Kedah sebagai sumber sejarah?",
    [
      "Sejarah istana Kedah dan pentadbiran di Perlis",
      "Perang tentera Kedah dalam bentuk syair",
      "Pemerintahan Kelantan hingga tahun 1900",
      "Peristiwa penting setiap pemerintah Kelantan",
    ],
    0,
    "Al-Tarikh Salasilah Negeri Kedah mencatatkan sejarah istana Kedah dan pentadbiran di Perlis.",
  ],
  [
    "Medium",
    "Apakah yang dikisahkan dalam Hikayat Merong Mahawangsa?",
    [
      "Pengasasan Kerajaan Kedah",
      "Pengasasan Kerajaan Kelantan",
      "Pelantikan Yang di-Pertuan Besar",
      "Pembentukan Undang Yang Empat",
    ],
    0,
    "Hikayat Merong Mahawangsa mengisahkan pengasasan Kerajaan Kedah, pembukaan kota dan pengislaman pemerintah.",
  ],
  [
    "Hard",
    "Apakah lingkungan masa pemerintahan yang dicatatkan dalam Hikayat Seri Kelantan?",
    [
      "Zaman Long Yunus hingga tahun 1971",
      "Zaman Che Siti Wan Kembang hingga tahun 1900",
      "Zaman Raja Sakti I hingga tahun 1914",
      "Zaman Sultan Maulana hingga tahun 1927",
    ],
    1,
    "Hikayat Seri Kelantan mencatatkan pemerintahan sejak zaman Che Siti Wan Kembang, Puteri Saadong dan Raja Abdullah hingga tahun 1900.",
  ],
  [
    "Hard",
    "Siapakah pengarang Detik-detik Sejarah Kelantan dan bilakah karya itu ditulis?",
    [
      "Sa'ad Shukri bin Haji Muda, 1971",
      "Wan Yahya bin Wan Muhammad Taib, 1911",
      "Muhammad Hassan bin Dato' Kerani Muhammad Arshad, 1927",
      "Sultan Ahmad Tajuddin Halim Shah II, 1845",
    ],
    0,
    "Detik-detik Sejarah Kelantan ditulis oleh Sa'ad Shukri bin Haji Muda pada tahun 1971.",
  ],

  // Questions 21-25: Warisan kesenian
  [
    "Hard",
    "Bagaimanakah pengaruh Islam mengubah warisan seni ukir Kedah dan Kelantan?",
    [
      "Motif haiwan digantikan dengan motif alam",
      "Ukiran kayu digantikan dengan ukiran logam",
      "Ukiran hanya dibenarkan pada istana",
      "Motif alam digantikan dengan motif manusia",
    ],
    0,
    "Motif haiwan dalam karya ukiran digantikan dengan motif alam yang bersesuaian dengan amalan Islam.",
  ],
  [
    "Hard",
    "Apakah ciri unik seni bina rumah tradisional Melayu?",
    [
      "Tebar layar berbentuk V terbalik dengan ukiran motif alam",
      "Bumbung berbentuk bulat dengan ukiran motif haiwan",
      "Dinding batu dengan perhiasan emas",
      "Tiang besi dengan motif geometri",
    ],
    0,
    "Rumah tradisional Melayu mempunyai tebar layar berbentuk V terbalik yang dihiasi ukiran motif alam.",
  ],
  [
    "Medium",
    "Apakah seni pertukangan senjata tradisional yang berkembang pesat di Kelantan?",
    ["Lembing", "Keris", "Meriam", "Panah"],
    1,
    "Pertukangan senjata tradisional seperti keris berkembang pesat di Kelantan.",
  ],
  [
    "Hard",
    "Manakah padanan warisan kesenian dengan negeri yang tepat?",
    [
      "Kelantan - wau dan batik; Perlis - Awang Batil; Kedah - Mek Mulung",
      "Kelantan - Mek Mulung; Perlis - wayang kulit; Kedah - Awang Batil",
      "Kelantan - Awang Batil; Perlis - batik; Kedah - wau",
      "Kelantan - silat; Perlis - Mek Mulung; Kedah - wayang kulit",
    ],
    0,
    "Kelantan terkenal dengan wau dan batik, Awang Batil ialah penglipur lara Perlis, manakala Mek Mulung ialah teater tradisional Kedah.",
  ],
  [
    "Hard",
    "Apakah perubahan fungsi seni silat pada masa kini?",
    [
      "Hanya digunakan dalam peperangan",
      "Menjadi persembahan majlis dan acara pertandingan antarabangsa",
      "Dikhususkan sebagai latihan kerabat diraja",
      "Digunakan untuk memilih Pembesar",
    ],
    1,
    "Silat kini dipersembahkan dalam majlis tertentu dan dipertandingkan pada peringkat antarabangsa.",
  ],

  // Questions 26-30: Adat Perpatih dan pemerintahan Negeri Sembilan
  [
    "Hard",
    "Apakah hubungan antara jurai keturunan sebelah ibu dengan pewarisan pusaka dalam Adat Perpatih?",
    [
      "Anak mengikut suku ibu dan wanita mewarisi pusaka",
      "Anak mengikut suku bapa dan lelaki mewarisi pusaka",
      "Anak bebas memilih suku dan pusaka dibahagi sama rata",
      "Anak mengikut suku pemerintah dan pusaka menjadi milik Luak",
    ],
    0,
    "Setiap anak menjadi anggota suku ibunya, manakala harta pusaka diwarisi daripada ibu kepada anak perempuan.",
  ],
  [
    "Hard",
    "Mengapakah perkahwinan sesama suku tidak digalakkan dalam Adat Perpatih?",
    [
      "Anggota suku dianggap sebuah keluarga besar dan bersaudara",
      "Lelaki mesti kekal dalam suku ibunya",
      "Wanita tidak dibenarkan mewarisi pusaka",
      "Undang Yang Empat menentukan semua pasangan",
    ],
    0,
    "Perkahwinan sesama suku tidak digalakkan kerana anggota suku dianggap sebuah keluarga besar dan bersaudara.",
  ],
  [
    "Medium",
    "Apakah kedudukan seorang lelaki selepas berkahwin dalam Adat Perpatih?",
    [
      "Menjadi orang semenda dalam suku isterinya",
      "Menjadi Lembaga dalam suku ibunya",
      "Menjadi Undang dalam Luak isterinya",
      "Menjadi pemilik pusaka suku isterinya",
    ],
    0,
    "Lelaki yang berkahwin menjadi anggota keluarga suku isterinya dan digelar orang semenda.",
  ],
  [
    "Hard",
    "Bagaimanakah Yang di-Pertuan Besar Negeri Sembilan dipilih?",
    [
      "Oleh Undang Yang Empat daripada keturunan Yamtuan Radin",
      "Oleh Lembaga daripada kalangan Buapak",
      "Oleh Ibu Soko daripada kalangan orang semenda",
      "Oleh Penghulu daripada keturunan Raja Perlis",
    ],
    0,
    "Undang Yang Empat memilih calon yang layak daripada keturunan Yamtuan Radin sebagai Yang di-Pertuan Besar.",
  ],
  [
    "Hard",
    "Manakah padanan pemimpin Adat Perpatih dengan peranan atau cara pelantikannya yang betul?",
    [
      "Undang - dilantik Lembaga; Lembaga - dilantik Buapak; Buapak - dilantik anak buah Perut; Ibu Soko - memilih Buapak",
      "Undang - dilantik Buapak; Lembaga - dipilih Yang di-Pertuan Besar; Buapak - dilantik Undang; Ibu Soko - memilih Lembaga",
      "Undang - dilantik Penghulu; Lembaga - dilantik Undang; Buapak - dipilih Sultan; Ibu Soko - memilih Yang di-Pertuan Besar",
      "Undang - dipilih rakyat; Lembaga - dilantik Ibu Soko; Buapak - dilantik Lembaga; Ibu Soko - memilih Undang",
    ],
    0,
    "Undang dilantik Lembaga, Lembaga dilantik Buapak, Buapak dilantik anak buah Perut dan Ibu Soko terlibat memilih Buapak.",
  ],
];

export const sejarahF2C9Quizzes: QuizQuestion[] = quizContent.map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f2-c9-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 2",
    chapter: "Chapter 9",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
