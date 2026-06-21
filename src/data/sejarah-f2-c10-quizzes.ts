import type { Difficulty, QuizQuestion } from "./types";

type QuizSeed = [
  difficulty: Difficulty,
  question: string,
  options: [string, string, string, string],
  answerIndex: number,
  explanation: string,
];

const quizContent: QuizSeed[] = [
  // Questions 1-5: Hubungan Sarawak dan Sabah dalam Alam Melayu
  [
    "Hard",
    "Apakah bukti hubungan awal penduduk Sabah dengan kawasan luar sejak sebelum Masihi?",
    [
      "Pusat pembuatan tembikar dan perdagangan di Bukit Tengkorak",
      "Industri peleburan besi di Santubong",
      "Penemuan patung Ganesha di Limbang",
      "Pengasasan Kesultanan Sulu di utara Borneo",
    ],
    0,
    "Bukit Tengkorak di Semporna menjadi pusat pembuatan tembikar dan menjalankan perdagangan dengan kawasan luar Sabah.",
  ],
  [
    "Hard",
    "Bagaimanakah persahabatan Brunei dengan Sambas meluaskan pengaruh Kesultanan Melayu Brunei?",
    [
      "Sambas menyerahkan wilayahnya di Sarawak kepada Brunei",
      "Brunei menyerahkan utara Borneo kepada Sambas",
      "Sambas memindahkan pusat perdagangan ke Santubong",
      "Brunei melantik pemerintah Sulu di Sarawak",
    ],
    0,
    "Persahabatan kedua-dua kerajaan membolehkan Sambas menyerahkan wilayahnya di Sarawak kepada Kesultanan Melayu Brunei.",
  ],
  [
    "Medium",
    "Apakah kesan kemunculan Kesultanan Sulu pada abad ke-15 terhadap utara Sabah?",
    [
      "Kegiatan perdagangan semakin meningkat",
      "Pusat perdagangan dipindahkan ke Brunei",
      "Pengaruh Majapahit semakin meluas",
      "Industri tembikar dihentikan",
    ],
    0,
    "Kesultanan Sulu meningkatkan kegiatan perdagangan di utara Sabah yang kaya dengan hasil laut dan hutan.",
  ],
  [
    "Hard",
    "Manakah kumpulan barang yang dibekalkan oleh pelabuhan Santubong?",
    [
      "Kapur barus, kayu laka, lilin, madu dan kulit penyu",
      "Beras, bijih timah, sagu, garam dan ikan kering",
      "Tembikar, sutera, rempah, emas dan gading",
      "Sarang burung, mutiara, rotan, damar dan perahu",
    ],
    0,
    "Santubong membekalkan kapur barus, kayu laka, lilin, madu dan kulit penyu.",
  ],
  [
    "Hard",
    "Manakah padanan kuasa dengan kawasan penyebaran Islam yang tepat?",
    [
      "Brunei - pesisir Sarawak dan Sabah; Sulu - pantai timur Sabah",
      "Brunei - pantai timur Sabah; Sulu - selatan Sarawak",
      "Srivijaya - pesisir Sabah; Majapahit - pantai timur Sabah",
      "Sambas - utara Sabah; Sulu - pesisir Sarawak",
    ],
    0,
    "Brunei menyebarkan Islam di pesisir Sarawak dan Sabah, manakala Sulu berperanan di pantai timur Sabah.",
  ],

  // Questions 6-10: Kepimpinan tempatan Sarawak
  [
    "Hard",
    "Manakah padanan kaum dengan ketua kesukuan Sarawak yang betul?",
    [
      "Iban - Tuai Rumah; Kayan - Kelunan Maren; Kenyah - Peran Lepo; Kelabit - Laih Rayeh",
      "Iban - Orang Tua; Kayan - Peran Lepo; Kenyah - Tuai Rumah; Kelabit - Babalian",
      "Iban - Laih Rayeh; Kayan - Tuai Rumah; Kenyah - Kelunan Maren; Kelabit - Orang Tua",
      "Iban - Babalian; Kayan - Laih Rayeh; Kenyah - Orang Tua; Kelabit - Tuai Rumah",
    ],
    0,
    "Tuai Rumah mengetuai Iban, Kelunan Maren mengetuai Kayan, Peran Lepo mengetuai Kenyah dan Laih Rayeh mengetuai Kelabit.",
  ],
  [
    "Medium",
    "Apakah dua bentuk pemerintahan yang wujud di lembah sungai Sarawak?",
    [
      "Kerajaan dan wakil raja",
      "Ketua bebas dan Orang Tua",
      "Bobohizan dan Babalian",
      "Tuai Rumah dan Orang Kaya",
    ],
    0,
    "Pemerintahan lembah sungai Sarawak terdiri daripada kerajaan tempatan dan sistem wakil raja.",
  ],
  [
    "Hard",
    "Manakah kumpulan yang terdiri sepenuhnya daripada kerajaan lembah sungai di Sarawak?",
    [
      "Sawaku, Samadong, Kalka, Saribas dan Melano",
      "Marudu, Tungku, Santubong, Sambas dan Sulu",
      "Samarahan, Limbang, Brunei, Chu-Po dan Sawaku",
      "Saribas, Marudu, Gedong, Kalka dan Tungku",
    ],
    0,
    "Kerajaan lembah sungai Sarawak ialah Sawaku, Samadong, Kalka, Saribas dan Melano.",
  ],
  [
    "Hard",
    "Apakah perkembangan yang membawa kepada pembentukan sistem wakil raja di Sarawak?",
    [
      "Pengaruh Majapahit yang kemudiannya diteruskan Sambas dan Brunei",
      "Pengaruh Sulu yang diteruskan oleh ketua bebas",
      "Pengaruh Srivijaya yang diteruskan oleh Orang Tua",
      "Pengaruh Champa yang diteruskan oleh Tuai Rumah",
    ],
    0,
    "Sistem wakil raja bermula dengan pengaruh Majapahit, diteruskan Sambas dan dikembangkan oleh Brunei.",
  ],
  [
    "Hard",
    "Apakah gabungan tugas wakil raja di Sarawak?",
    [
      "Melaksanakan kehakiman, menjaga kebajikan dan keamanan serta mengutip cukai",
      "Mengurus adat, pantang larang dan upacara keagamaan",
      "Mengetuai kesukuan dan membina rumah panjang",
      "Melebur bijih besi dan mengendalikan pelabuhan",
    ],
    0,
    "Wakil raja melaksanakan kehakiman, menjaga kebajikan dan keamanan serta mengutip cukai penduduk dan perdagangan.",
  ],

  // Questions 11-15: Kepimpinan tempatan Sabah
  [
    "Medium",
    "Apakah gelaran ketua masyarakat Kadazandusun, Murut dan Orang Sungai?",
    ["Tuai Rumah", "Orang Tua", "Orang Kaya", "Ketua Bebas"],
    1,
    "Masyarakat Kadazandusun, Murut dan Orang Sungai mempunyai ketua yang dikenali sebagai Orang Tua.",
  ],
  [
    "Hard",
    "Manakah padanan pemimpin adat dengan kaum yang tepat?",
    [
      "Bobohizan atau Bobolian - Kadazandusun; Babalian - Murut",
      "Bobohizan - Murut; Babalian - Orang Sungai",
      "Babalian - Kadazandusun; Orang Tua - Iban",
      "Bobolian - Bajau; Babalian - Suluk",
    ],
    0,
    "Bobohizan atau Bobolian mengurus adat Kadazandusun, manakala Babalian mengurus adat Murut.",
  ],
  [
    "Hard",
    "Apakah tiga corak kepimpinan di kawasan lembah sungai Sabah?",
    [
      "Wakil Brunei, wakil Sulu dan ketua bebas",
      "Orang Tua, Tuai Rumah dan Orang Kaya",
      "Kerajaan, kesukuan dan pelabuhan",
      "Majapahit, Sambas dan Brunei",
    ],
    0,
    "Lembah sungai Sabah mempunyai wakil Brunei, wakil Sulu dan ketua bebas.",
  ],
  [
    "Hard",
    "Apakah persamaan tugas wakil raja di Sabah dengan wakil raja di Sarawak?",
    [
      "Menjalankan kehakiman, menjaga keamanan dan kebajikan serta mengutip cukai",
      "Mengurus adat dan pantang larang sahaja",
      "Menjalankan undang-undang sendiri tanpa kuasa luar",
      "Memimpin setiap kaum di kawasan pedalaman",
    ],
    0,
    "Wakil raja di kedua-dua kawasan menjalankan kehakiman, menjaga keamanan dan kebajikan serta mengutip cukai.",
  ],
  [
    "Hard",
    "Manakah padanan Ketua Bebas dengan wilayah kekuasaannya yang betul?",
    [
      "Syarif Osman - Marudu; Datu Kurunding - Tungku",
      "Syarif Osman - Tungku; Datu Kurunding - Marudu",
      "Syarif Osman - Saribas; Datu Kurunding - Kalka",
      "Syarif Osman - Santubong; Datu Kurunding - Chu-Po",
    ],
    0,
    "Syarif Osman menguasai Marudu, manakala Datu Kurunding menguasai Tungku.",
  ],

  // Questions 16-20: Kegiatan ekonomi dan kepentingan sungai
  [
    "Hard",
    "Manakah kegiatan ekonomi yang sesuai dengan masyarakat pedalaman Sarawak?",
    [
      "Mengutip hasil hutan, memburu dan menanam padi bukit",
      "Berdagang, membuat perahu dan menghasilkan sagu",
      "Menanam sayur, buah-buahan dan menangkap hasil laut",
      "Melebur besi, menghasilkan tembikar dan menangkap ikan laut",
    ],
    0,
    "Masyarakat pedalaman Sarawak mengutip hasil hutan, memburu haiwan liar dan menanam padi bukit.",
  ],
  [
    "Medium",
    "Apakah kegiatan utama masyarakat lembah sungai di Sarawak dan Sabah?",
    [
      "Menanam padi, sayur-sayuran dan buah-buahan",
      "Memburu haiwan dan mengutip sarang burung",
      "Membuat perahu dan menangkap hasil laut",
      "Melebur besi dan menghasilkan sagu",
    ],
    0,
    "Masyarakat lembah sungai menanam padi, sayur-sayuran dan buah-buahan.",
  ],
  [
    "Hard",
    "Manakah gabungan kegiatan ekonomi pesisir pantai Sabah yang tepat?",
    [
      "Berdagang, menangkap ikan, membuat perahu dan menangkap hasil laut",
      "Menanam padi bukit, memburu dan mengutip hasil hutan",
      "Menanam sayur, menghasilkan sagu dan mengutip sarang burung",
      "Membuat tembikar, melebur besi dan menternak haiwan",
    ],
    0,
    "Masyarakat pesisir Sabah berdagang, menangkap ikan dan hasil laut serta membuat perahu.",
  ],
  [
    "Hard",
    "Bagaimanakah sungai menyokong pengangkutan dan petempatan masyarakat?",
    [
      "Sampan dan bot mengangkut penumpang serta barang, manakala petempatan membentuk kampung air",
      "Sungai hanya digunakan untuk menangkap ikan dan hasil laut",
      "Pelabuhan sungai menjadi tempat pertanian padi bukit",
      "Sungai memisahkan petempatan daripada pusat perdagangan",
    ],
    0,
    "Sampan dan bot digunakan untuk pengangkutan, manakala petempatan di sungai berkembang sebagai kampung air.",
  ],
  [
    "Hard",
    "Apakah kaitan sungai dengan sumber rezeki dan perdagangan?",
    [
      "Sungai membekalkan makanan dan menjadi lokasi pelabuhan kerajaan awal",
      "Sungai hanya menjadi tempat upacara dan perayaan",
      "Sungai menghalang hubungan pedalaman dengan pesisir",
      "Sungai digunakan khusus untuk membina rumah panjang",
    ],
    0,
    "Sungai menjadi sumber makanan serta tapak pelabuhan yang mengembangkan perdagangan kerajaan awal.",
  ],

  // Questions 21-25: Masyarakat bumiputera Sarawak dan Sabah
  [
    "Hard",
    "Manakah padanan asal usul kaum Sarawak yang tepat?",
    [
      "Iban - Sungai Kapuas; Bidayuh - Sungkung, Kalimantan",
      "Iban - Sungai Kayan; Bidayuh - Kepulauan Sulu",
      "Iban - Zamboanga; Bidayuh - Sungai Kapuas",
      "Iban - Sungkung; Bidayuh - Sungai Kinabatangan",
    ],
    0,
    "Iban berasal dari Sungai Kapuas, manakala Bidayuh berasal dari Sungkung di Kalimantan.",
  ],
  [
    "Medium",
    "Manakah pernyataan yang tepat tentang petempatan Melayu dan Melanau di Sarawak?",
    [
      "Melayu banyak menetap di pesisir, manakala Melanau mendiami kawasan tengah",
      "Melayu menetap di pedalaman, manakala Melanau di hulu Baram",
      "Melayu mendiami kawasan tengah, manakala Melanau di sempadan Kalimantan",
      "Melayu menetap di Sungai Kapuas, manakala Melanau di pesisir Sabah",
    ],
    0,
    "Kaum Melayu banyak menetap di pesisir Sarawak, manakala Melanau mendiami kawasan tengah Sarawak.",
  ],
  [
    "Hard",
    "Manakah kumpulan yang terdiri daripada kaum Orang Ulu?",
    [
      "Kayan, Kenyah, Kelabit, Penan dan Punan",
      "Iban, Bidayuh, Melanau, Kedayan dan Bisaya",
      "Murut, Rungus, Suluk, Iranun dan Bajau",
      "Kadazandusun, Orang Sungai, Berunai, Suluk dan Murut",
    ],
    0,
    "Orang Ulu terdiri daripada Kayan, Kenyah, Kelabit, Penan dan Punan.",
  ],
  [
    "Hard",
    "Manakah padanan masyarakat Sabah dengan lokasi atau keunikannya yang betul?",
    [
      "Kadazandusun - Penampang dan Ranau; Bajau - budaya berkuda; Murut - Tenom hingga Kalabakan",
      "Kadazandusun - pantai timur; Bajau - Sungai Kinabatangan; Murut - Penampang",
      "Kadazandusun - Kepulauan Sulu; Bajau - kawasan tengah; Murut - Papar",
      "Kadazandusun - Tenom; Bajau - Sungai Sugut; Murut - Tuaran",
    ],
    0,
    "Kadazandusun mendiami antaranya Penampang dan Ranau, Bajau terkenal berkuda, manakala Murut mendiami Tenom hingga Kalabakan.",
  ],
  [
    "Hard",
    "Manakah padanan kaum Sabah dengan kawasan petempatannya yang tepat?",
    [
      "Suluk - pantai timur; Orang Sungai - Sungai Labuk, Kinabatangan, Sugut dan Paitan",
      "Suluk - pantai barat; Orang Sungai - Penampang dan Papar",
      "Suluk - pedalaman Tenom; Orang Sungai - Kepulauan Sulu",
      "Suluk - Sungai Rajang; Orang Sungai - Kalabakan",
    ],
    0,
    "Suluk menetap di pantai timur Sabah, manakala Orang Sungai tinggal di sekitar Sungai Labuk, Kinabatangan, Sugut dan Paitan.",
  ],

  // Questions 26-30: Perayaan, tarian dan seni bina
  [
    "Hard",
    "Manakah padanan perayaan Sarawak dengan masyarakat atau tujuannya yang tepat?",
    [
      "Hari Gawai - Iban, Bidayuh dan Orang Ulu; Kaul - Melanau mengelakkan bencana Ipok",
      "Hari Gawai - Melanau; Kaul - Iban meraikan semangat padi",
      "Hari Gawai - Bajau; Kaul - Kadazandusun selepas menuai",
      "Hari Gawai - Murut; Kaul - Orang Ulu menghargai lepa",
    ],
    0,
    "Hari Gawai disambut Iban, Bidayuh dan Orang Ulu, manakala Kaul disambut Melanau berkaitan roh Ipok.",
  ],
  [
    "Hard",
    "Apakah perbezaan antara Ngajat dengan Bermukun?",
    [
      "Ngajat ialah tarian semangat juang, manakala Bermukun ialah acara bergendang dan berpantun",
      "Ngajat menggunakan buluh, manakala Bermukun meniru gerakan helang",
      "Ngajat ialah pesta menuai, manakala Bermukun ialah perlumbaan perahu",
      "Ngajat ditarikan Bajau, manakala Bermukun ditarikan Murut",
    ],
    0,
    "Ngajat dikaitkan dengan semangat juang Iban, manakala Bermukun melibatkan bergendang, berpantun dan menari.",
  ],
  [
    "Hard",
    "Manakah padanan budaya Sabah yang betul?",
    [
      "Kaamatan - Kadazandusun dan Murut; Regatta Lepa - Bajau/Sama; Sumazau - Kadazandusun; Magunatip - Murut; Limbai - Bajau/Sama",
      "Kaamatan - Bajau; Regatta Lepa - Murut; Sumazau - Suluk; Magunatip - Kadazandusun; Limbai - Rungus",
      "Kaamatan - Orang Sungai; Regatta Lepa - Kadazandusun; Sumazau - Murut; Magunatip - Bajau; Limbai - Suluk",
      "Kaamatan - Suluk; Regatta Lepa - Orang Sungai; Sumazau - Rungus; Magunatip - Bajau; Limbai - Murut",
    ],
    0,
    "Kaamatan disambut Kadazandusun dan Murut, Regatta Lepa oleh Bajau/Sama, Sumazau oleh Kadazandusun, Magunatip oleh Murut dan Limbai oleh Bajau/Sama.",
  ],
  [
    "Hard",
    "Manakah padanan seni bina Sarawak dengan kaum atau cirinya yang tepat?",
    [
      "Rumah Panjang - Iban, Bidayuh dan Orang Ulu; Rumah Tinggi - Melanau; Rumah Baruk - Bidayuh",
      "Rumah Panjang - Melanau; Rumah Tinggi - Iban; Rumah Baruk - Orang Ulu",
      "Rumah Panjang - Bajau; Rumah Tinggi - Murut; Rumah Baruk - Rungus",
      "Rumah Panjang - Suluk; Rumah Tinggi - Bidayuh; Rumah Baruk - Melanau",
    ],
    0,
    "Rumah panjang didiami Iban, Bidayuh dan Orang Ulu, rumah tinggi oleh Melanau dan rumah Baruk dibina Bidayuh.",
  ],
  [
    "Hard",
    "Manakah padanan seni bina Sabah dengan nama dan fungsinya yang betul?",
    [
      "Rumah Rungus - Vinatang; Rumah Murut - Tulus atau Pahun; Lepa - perahu kediaman dan pengangkutan Bajau/Sama",
      "Rumah Rungus - Baruk; Rumah Murut - Vinatang; Lepa - rumah tinggi Melanau",
      "Rumah Rungus - Tulus; Rumah Murut - Baruk; Lepa - pusat ritual Bidayuh",
      "Rumah Rungus - Pahun; Rumah Murut - Vinatang; Lepa - rumah panjang Orang Ulu",
    ],
    0,
    "Rumah Rungus disebut Vinatang, rumah Murut disebut Tulus atau Pahun dan lepa ialah perahu kediaman serta pengangkutan Bajau/Sama.",
  ],
];

export const sejarahF2C10Quizzes: QuizQuestion[] = quizContent.map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f2-c10-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 2",
    chapter: "Chapter 10",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
