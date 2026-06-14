export type KomsasKind = "poem" | "story";

export interface KomsasDecoderRangkap {
  rangkap: string;
  maksud: string;
  tema: string;
  nilai: string;
  pengajaran: string;
}

export interface KomsasStoryStage {
  stage: "Permulaan" | "Perkembangan" | "Konflik" | "Klimaks" | "Peleraian";
  tone: string;
  text: string;
}

export interface KomsasCharacter {
  name: string;
  role: string;
  traits: string[];
  evidence: string;
  importance: string;
}

export interface KomsasPersoalan {
  title: string;
  situation: string;
  explanation: string;
}

export interface KomsasValueLesson {
  value: string;
  example: string;
  lesson: string;
}

export interface KomsasKbat {
  scenario: string;
  question: string;
  answer: string;
  explanation: string;
}

export interface KomsasMistake {
  wrong: string;
  whyWrong: string;
  correct: string;
  whyCorrect: string;
}

export interface KomsasWork {
  id: string;
  title: string;
  typeLabel: string;
  kind: KomsasKind;
  studyTime: string;
  difficulty: "Mudah" | "Sederhana";
  intro: string;
  quickOverview: {
    theme: string;
    mainCharacters?: string;
    values: string;
    lesson: string;
  };
  decoder?: KomsasDecoderRangkap[];
  story?: KomsasStoryStage[];
  characters?: KomsasCharacter[];
  themeExplorer: {
    meaning: string;
    whyAppears: string;
    evidence: string;
    whyCare: string;
  };
  persoalan: KomsasPersoalan[];
  valuesLessons: KomsasValueLesson[];
  examBooster: {
    themes: string[];
    characters: string[];
    values: string[];
    lessons: string[];
  };
  kbat: KomsasKbat[];
  teacherExplains: string[];
  mistakes: KomsasMistake[];
  revision: {
    tema: string;
    persoalan: string;
    watak: string;
    nilai: string;
    pengajaran: string;
  };
}

const poemKbat = (focus: string, value: string): KomsasKbat[] => [
  {
    scenario: `Rakan anda faham maksud luar ${focus}, tetapi tidak faham maksud tersiratnya.`,
    question: "Bagaimanakah anda menerangkan mesej karya ini kepadanya?",
    answer: `Saya akan terangkan bahawa karya ini bukan sekadar tentang kata-kata indah. Mesej utamanya ialah ${focus.toLowerCase()} yang perlu diamalkan dalam kehidupan.`,
    explanation: "Jawapan KBAT perlu menghubungkan maksud karya dengan tindakan harian murid.",
  },
  {
    scenario: "Seorang murid menganggap puisi hanya untuk dihafal sebelum peperiksaan.",
    question: "Mengapakah pandangan itu kurang tepat?",
    answer: `Pandangan itu kurang tepat kerana puisi membantu kita memahami perasaan, nasihat dan nilai seperti ${value.toLowerCase()}.`,
    explanation: "Puisi diuji bukan hanya sebagai hafalan, tetapi sebagai kefahaman mesej dan nilai.",
  },
  {
    scenario: "Kelas anda mahu membuat kempen nilai murni berdasarkan karya ini.",
    question: "Apakah slogan yang sesuai dan mengapa?",
    answer: `"Fahami Kata, Amalkan Nilai" sesuai kerana karya ini mengajak murid melihat maksud tersirat dan mengubah sikap.`,
    explanation: "Model jawapan memberi slogan serta sebab yang berkait terus dengan karya.",
  },
];

const storyKbat = (conflict: string, value: string): KomsasKbat[] => [
  {
    scenario: `Anda berada dalam situasi yang hampir sama dengan konflik karya: ${conflict}.`,
    question: "Apakah tindakan paling matang yang patut diambil?",
    answer: "Saya akan bertenang, mendengar penjelasan semua pihak dan memilih tindakan yang tidak menyakiti orang lain.",
    explanation: "Jawapan matang menunjukkan empati, pertimbangan dan penyelesaian masalah.",
  },
  {
    scenario: "Seorang rakan berkata watak utama lemah kerana banyak diuji.",
    question: "Setujukah anda? Berikan alasan.",
    answer: `Saya tidak setuju. Watak utama sebenarnya kuat kerana masih belajar membuat pilihan yang betul dan menunjukkan nilai ${value.toLowerCase()}.`,
    explanation: "KBAT menilai watak melalui tindakan, bukan melalui masalah yang menimpanya.",
  },
  {
    scenario: "Guru meminta anda mengaitkan karya ini dengan kehidupan murid hari ini.",
    question: "Apakah pengajaran paling dekat dengan kehidupan pelajar?",
    answer: "Pelajar perlu menghargai orang di sekeliling, tidak cepat menghukum dan berani membetulkan kesilapan.",
    explanation: "Jawapan ini membawa pengajaran karya ke dunia sekolah dan keluarga.",
  },
];

export const KOMSAS_PREMIUM_WORKS: Record<string, KomsasWork> = {
  "pantun-dua-kerat": {
    id: "pantun-dua-kerat",
    title: "Pantun Dua Kerat (Nasihat)",
    typeLabel: "Puisi Tradisional",
    kind: "poem",
    studyTime: "8 minit",
    difficulty: "Mudah",
    intro: "Jangan risau. Dalam beberapa minit, anda akan nampak bahawa pantun ini sebenarnya seperti pesanan ringkas daripada orang tua yang mahu kita hidup lebih bijak.",
    quickOverview: {
      theme: "Nasihat untuk membentuk akhlak dan cara hidup yang baik.",
      values: "Berhemah, rajin, sabar, bijaksana.",
      lesson: "Dengar nasihat, fikir dahulu sebelum bertindak, dan baiki diri sedikit demi sedikit.",
    },
    decoder: [
      {
        rangkap: "Rangkap nasihat tentang sikap dan perbuatan.",
        maksud: "Penyair mengingatkan kita supaya menjaga tingkah laku kerana perbuatan kecil boleh menunjukkan peribadi seseorang.",
        tema: "Nasihat kehidupan.",
        nilai: "Berhemah.",
        pengajaran: "Kita hendaklah menjaga perlakuan agar disenangi orang.",
      },
      {
        rangkap: "Rangkap yang menekankan usaha dan kesungguhan.",
        maksud: "Kejayaan tidak datang sendiri. Murid perlu berusaha walaupun perkara itu nampak kecil.",
        tema: "Kegigihan.",
        nilai: "Ketekunan.",
        pengajaran: "Kita perlu rajin berusaha untuk mencapai kejayaan.",
      },
      {
        rangkap: "Rangkap yang mengingatkan tentang kebijaksanaan.",
        maksud: "Gunakan akal sebelum bercakap atau bertindak supaya tidak menyesal kemudian.",
        tema: "Akal budi.",
        nilai: "Bijaksana.",
        pengajaran: "Kita hendaklah berfikir sebelum membuat keputusan.",
      },
    ],
    themeExplorer: {
      meaning: "Tema pantun ini ialah nasihat ringkas yang membimbing manusia menjadi lebih baik.",
      whyAppears: "Pantun dua kerat memang padat. Sebab itu mesejnya terus sampai, seperti teguran lembut tetapi tajam.",
      evidence: "Setiap rangkap membawa satu pesan moral seperti rajin, berfikir dan menjaga diri.",
      whyCare: "Murid Form 1 selalu berdepan pilihan harian: belajar atau bertangguh, bercakap baik atau menyindir, berfikir atau ikut emosi.",
    },
    persoalan: [
      { title: "Kepentingan mendengar nasihat", situation: "Pantun menyampaikan teguran secara ringkas.", explanation: "Nasihat membantu kita mengelakkan kesilapan." },
      { title: "Kegigihan untuk berjaya", situation: "Mesej pantun mengaitkan usaha dengan hasil.", explanation: "Kejayaan bermula daripada disiplin kecil." },
      { title: "Akal budi dalam tindakan", situation: "Pantun mengajak manusia berfikir.", explanation: "Orang bijak tidak bertindak mengikut marah semata-mata." },
    ],
    valuesLessons: [
      { value: "Berhemah", example: "Pantun menegur manusia supaya menjaga sikap.", lesson: "Di sekolah, bercakap dengan sopan membuat orang selesa berkawan dengan kita." },
      { value: "Ketekunan", example: "Nasihat tentang usaha ditekankan.", lesson: "Ulang kaji sedikit setiap hari lebih baik daripada belajar last minute." },
      { value: "Bijaksana", example: "Pantun mengingatkan kita supaya menggunakan akal.", lesson: "Fikir dahulu sebelum menghantar mesej atau komen di media sosial." },
    ],
    examBooster: {
      themes: ["Nasihat", "Akhlak", "Usaha"],
      characters: ["Tiada watak khusus"],
      values: ["Berhemah", "Ketekunan", "Bijaksana"],
      lessons: ["Dengar nasihat", "Rajin berusaha", "Fikir sebelum bertindak"],
    },
    kbat: poemKbat("nasihat hidup", "berhemah"),
    teacherExplains: [
      "Ramai murid fikir pantun dua kerat terlalu pendek, jadi isinya sedikit. Sebenarnya, pantun ini padat: satu rangkap boleh membawa satu pengajaran besar.",
      "Jangan cari cerita panjang dalam pantun. Cari mesej tersembunyi di sebalik pembayang dan maksud.",
    ],
    mistakes: [
      { wrong: "Pantun ini hanya tentang alam atau benda dalam pembayang.", whyWrong: "Pembayang biasanya membuka bunyi dan imej, bukan mesej utama.", correct: "Maksud pantun membawa nasihat sebenar.", whyCorrect: "Bahagian maksud menyatakan nilai dan pengajaran." },
      { wrong: "Semua rangkap mempunyai nilai yang sama.", whyWrong: "Setiap rangkap boleh menekankan nilai berbeza.", correct: "Kenal pasti nilai mengikut mesej rangkap.", whyCorrect: "Ini menjadikan jawapan lebih tepat." },
    ],
    revision: {
      tema: "Nasihat membentuk akhlak.",
      persoalan: "Mendengar nasihat, rajin berusaha, bijak bertindak.",
      watak: "Tiada watak khusus.",
      nilai: "Berhemah, tekun, bijaksana.",
      pengajaran: "Jaga sikap dan berusaha memperbaiki diri.",
    },
  },
  "syair-pohon-buluh": {
    id: "syair-pohon-buluh",
    title: "Syair Pohon Buluh",
    typeLabel: "Puisi Tradisional",
    kind: "poem",
    studyTime: "10 minit",
    difficulty: "Sederhana",
    intro: "Bayangkan serumpun buluh. Nampak sederhana, tetapi hidupnya memberi banyak pelajaran tentang masyarakat, kepimpinan dan kerjasama.",
    quickOverview: {
      theme: "Kekuatan hidup bermasyarakat yang saling membantu.",
      values: "Kerjasama, hormat, rendah hati, setia.",
      lesson: "Kita menjadi kuat apabila saling menyokong, bukan apabila mementingkan diri.",
    },
    decoder: [
      { rangkap: "Rangkap pengenalan pohon buluh.", maksud: "Buluh digambarkan hidup berkelompok dan tersusun.", tema: "Hidup bermasyarakat.", nilai: "Kerjasama.", pengajaran: "Kita perlu hidup saling membantu." },
      { rangkap: "Rangkap tentang susunan dan kekuatan buluh.", maksud: "Setiap bahagian buluh ada peranan, seperti anggota masyarakat.", tema: "Peranan dalam komuniti.", nilai: "Tanggungjawab.", pengajaran: "Setiap orang perlu menjalankan tugas masing-masing." },
      { rangkap: "Rangkap tentang sifat buluh yang tunduk.", maksud: "Sifat tunduk melambangkan rendah hati walaupun berguna.", tema: "Kerendahan hati.", nilai: "Rendah hati.", pengajaran: "Jangan sombong walaupun mempunyai kelebihan." },
      { rangkap: "Rangkap penutup nasihat.", maksud: "Penyair mengajak pembaca mencontohi buluh dalam kehidupan.", tema: "Teladan alam.", nilai: "Bijaksana.", pengajaran: "Ambil pengajaran daripada alam sekeliling." },
    ],
    themeExplorer: {
      meaning: "Tema syair ini ialah kehidupan bermasyarakat yang kuat melalui kerjasama.",
      whyAppears: "Buluh dipilih kerana ia tumbuh serumpun, lentur dan berguna kepada manusia.",
      evidence: "Gambaran buluh yang tersusun dan saling menyokong menjadi lambang masyarakat.",
      whyCare: "Dalam kelas, pasukan dan keluarga, kejayaan jarang berlaku seorang diri.",
    },
    persoalan: [
      { title: "Kerjasama dalam masyarakat", situation: "Buluh hidup berumpun.", explanation: "Manusia juga perlu menyokong satu sama lain." },
      { title: "Rendah hati walaupun berjasa", situation: "Buluh tunduk dan berguna.", explanation: "Kelebihan tidak sepatutnya menjadikan kita sombong." },
      { title: "Peranan setiap anggota", situation: "Setiap bahagian buluh ada fungsi.", explanation: "Setiap murid dalam kumpulan ada tanggungjawab." },
    ],
    valuesLessons: [
      { value: "Kerjasama", example: "Buluh digambarkan hidup dalam rumpun.", lesson: "Dalam tugasan kumpulan, bantu ahli yang lemah." },
      { value: "Rendah hati", example: "Buluh yang berguna tetap tunduk.", lesson: "Apabila mendapat markah tinggi, bantu rakan, bukan menunjuk-nunjuk." },
      { value: "Tanggungjawab", example: "Setiap bahagian buluh berfungsi.", lesson: "Laksanakan peranan dalam kelas dengan jujur." },
    ],
    examBooster: {
      themes: ["Kerjasama masyarakat", "Teladan alam", "Rendah hati"],
      characters: ["Tiada watak manusia"],
      values: ["Kerjasama", "Rendah hati", "Tanggungjawab"],
      lessons: ["Hidup saling membantu", "Jangan sombong", "Jalankan peranan"],
    },
    kbat: poemKbat("kerjasama masyarakat", "kerjasama"),
    teacherExplains: [
      "Buluh bukan sekadar tumbuhan dalam syair ini. Buluh ialah simbol masyarakat yang kuat kerana bersatu.",
      "Jika soalan tanya pengajaran, jawab dalam bentuk tindakan: kita hendaklah bekerjasama, bukan sekadar tulis 'kerjasama'.",
    ],
    mistakes: [
      { wrong: "Syair ini hanya menerangkan ciri fizikal buluh.", whyWrong: "Ciri fizikal digunakan sebagai lambang.", correct: "Syair ini mengajar manusia tentang hidup bermasyarakat.", whyCorrect: "Maksud tersirat lebih penting daripada gambaran luaran." },
      { wrong: "Tunduk bermaksud lemah.", whyWrong: "Dalam konteks syair, tunduk melambangkan rendah hati.", correct: "Tunduk menunjukkan tidak sombong.", whyCorrect: "Rendah hati ialah nilai positif." },
    ],
    revision: {
      tema: "Kerjasama dalam masyarakat.",
      persoalan: "Bersatu, rendah hati, menjalankan peranan.",
      watak: "Tiada watak manusia; buluh sebagai simbol.",
      nilai: "Kerjasama, rendah hati, tanggungjawab.",
      pengajaran: "Contohi buluh: berguna, bersatu dan tidak sombong.",
    },
  },
};

const poemWorks: KomsasWork[] = [
  {
    id: "sajak-kita-umpama",
    title: "Kita Umpama Sehelai Daun",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "9 minit",
    difficulty: "Mudah",
    intro: "Sajak ini mengajak kita melihat diri seperti daun: kecil, sementara, tetapi masih boleh memberi manfaat.",
    quickOverview: { theme: "Manusia perlu berbuat jasa semasa hidup.", values: "Keinsafan, kasih sayang, menghargai alam.", lesson: "Gunakan hidup untuk memberi manfaat kepada orang lain." },
    decoder: [
      { rangkap: "Rangkap tentang manusia seperti daun.", maksud: "Hidup manusia singkat dan mudah berubah.", tema: "Kehidupan sementara.", nilai: "Keinsafan.", pengajaran: "Kita perlu sedar hidup tidak kekal." },
      { rangkap: "Rangkap tentang memberi teduhan dan manfaat.", maksud: "Walaupun kecil, seseorang masih boleh membantu orang lain.", tema: "Berbakti.", nilai: "Kasih sayang.", pengajaran: "Buat kebaikan walaupun kecil." },
      { rangkap: "Rangkap tentang akhir kehidupan.", maksud: "Apabila tiba masa, manusia akan pergi, jadi tinggalkan jasa yang baik.", tema: "Jasa.", nilai: "Tanggungjawab.", pengajaran: "Jadilah insan yang dikenang kerana kebaikan." },
    ],
    themeExplorer: { meaning: "Tema sajak ialah kepentingan berbakti dalam kehidupan yang sementara.", whyAppears: "Daun menjadi lambang manusia yang kecil tetapi berguna.", evidence: "Imej daun, teduhan dan gugur menunjukkan hidup, jasa dan akhir hayat.", whyCare: "Murid belajar bahawa kebaikan kecil seperti membantu rakan tetap bermakna." },
    persoalan: [
      { title: "Kehidupan yang sementara", situation: "Daun akhirnya gugur.", explanation: "Manusia tidak hidup selama-lamanya." },
      { title: "Berbakti kepada orang lain", situation: "Daun boleh memberi teduhan.", explanation: "Orang kecil pun boleh berjasa." },
      { title: "Menghargai alam", situation: "Alam menjadi bahan perbandingan.", explanation: "Alam mengajar manusia tentang kehidupan." },
    ],
    valuesLessons: [
      { value: "Keinsafan", example: "Penyair menyedarkan pembaca tentang hidup yang singkat.", lesson: "Jangan buang masa dengan perkara yang merosakkan diri." },
      { value: "Kasih sayang", example: "Daun memberi manfaat kepada hidupan lain.", lesson: "Bantu rakan yang ketinggalan pelajaran." },
      { value: "Tanggungjawab", example: "Manusia perlu meninggalkan jasa.", lesson: "Jalankan peranan sebagai anak dan murid dengan baik." },
    ],
    examBooster: { themes: ["Berbakti", "Kehidupan sementara"], characters: ["Penyair/aku lirik"], values: ["Keinsafan", "Kasih sayang"], lessons: ["Berbuat jasa", "Menghargai hidup"] },
    kbat: poemKbat("kehidupan yang sementara dan berbakti", "keinsafan"),
    teacherExplains: ["Daun dalam sajak ini bukan daun semata-mata. Ia cermin diri manusia.", "Soalan sering menguji maksud lambang: daun sama dengan manusia yang kecil tetapi boleh berjasa."],
    mistakes: [
      { wrong: "Sajak ini hanya tentang alam sekitar.", whyWrong: "Alam digunakan sebagai perbandingan.", correct: "Sajak ini tentang manusia dan jasa.", whyCorrect: "Daun melambangkan kehidupan manusia." },
      { wrong: "Kecil bermaksud tidak penting.", whyWrong: "Sajak menunjukkan yang kecil juga boleh memberi manfaat.", correct: "Setiap orang mampu berjasa.", whyCorrect: "Manfaat tidak bergantung pada kedudukan." },
    ],
    revision: { tema: "Berbakti semasa hidup.", persoalan: "Hidup sementara, jasa, alam sebagai teladan.", watak: "Aku lirik/manusia.", nilai: "Keinsafan, kasih sayang, tanggungjawab.", pengajaran: "Gunakan hidup untuk kebaikan." },
  },
  {
    id: "sajak-kuingin",
    title: "Kuingin Berterima Kasih",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "8 minit",
    difficulty: "Mudah",
    intro: "Sajak ini seperti ucapan terima kasih yang lembut kepada semua yang memberi makna dalam hidup.",
    quickOverview: { theme: "Kesyukuran dan penghargaan terhadap nikmat serta jasa.", values: "Syukur, mengenang jasa, kasih sayang.", lesson: "Jangan tunggu kehilangan baru hendak menghargai." },
    decoder: [
      { rangkap: "Rangkap rasa terima kasih.", maksud: "Penyair mahu menghargai nikmat dan orang yang berjasa.", tema: "Kesyukuran.", nilai: "Syukur.", pengajaran: "Ucap terima kasih kepada orang yang membantu." },
      { rangkap: "Rangkap tentang keindahan hidup.", maksud: "Alam dan kehidupan memberi ketenangan kepada manusia.", tema: "Menghargai nikmat.", nilai: "Menghargai alam.", pengajaran: "Jaga nikmat yang kita terima." },
      { rangkap: "Rangkap penghargaan terhadap insan berjasa.", maksud: "Penyair sedar hidupnya dibantu oleh orang lain.", tema: "Mengenang jasa.", nilai: "Kasih sayang.", pengajaran: "Jangan melupakan jasa ibu bapa, guru dan rakan." },
    ],
    themeExplorer: { meaning: "Tema sajak ialah rasa syukur dan penghargaan.", whyAppears: "Penyair melihat hidup sebagai anugerah, bukan sesuatu yang patut diambil mudah.", evidence: "Nada sajak penuh ucapan terima kasih kepada nikmat dan insan berjasa.", whyCare: "Murid yang bersyukur lebih mudah menghargai keluarga, guru dan peluang belajar." },
    persoalan: [
      { title: "Kesyukuran atas nikmat", situation: "Penyair mahu berterima kasih.", explanation: "Syukur membuat manusia tidak lupa diri." },
      { title: "Mengenang jasa", situation: "Sajak menyentuh insan yang berjasa.", explanation: "Kita tidak berjaya sendirian." },
      { title: "Menghargai alam", situation: "Keindahan hidup dan alam diraikan.", explanation: "Alam memberi ketenangan dan manfaat." },
    ],
    valuesLessons: [
      { value: "Syukur", example: "Penyair menyatakan keinginan berterima kasih.", lesson: "Biasakan ucap terima kasih kepada ibu bapa dan guru." },
      { value: "Mengenang jasa", example: "Jasa orang lain dihargai.", lesson: "Balas jasa dengan sikap baik dan usaha belajar." },
      { value: "Kasih sayang", example: "Nada sajak lembut dan menghargai.", lesson: "Jaga hubungan dengan orang yang menyayangi kita." },
    ],
    examBooster: { themes: ["Kesyukuran", "Penghargaan"], characters: ["Aku lirik"], values: ["Syukur", "Mengenang jasa"], lessons: ["Hargai nikmat", "Balas jasa"] },
    kbat: poemKbat("kesyukuran dan penghargaan", "syukur"),
    teacherExplains: ["Terima kasih dalam sajak ini luas: bukan hanya kepada manusia, tetapi juga kepada nikmat kehidupan.", "Jika soalan tanya nada, pilih nada lembut, insaf dan menghargai."],
    mistakes: [
      { wrong: "Terima kasih hanya kepada seorang individu.", whyWrong: "Sajak merangkumi nikmat dan jasa yang luas.", correct: "Terima kasih ditujukan kepada kehidupan, alam dan insan berjasa.", whyCorrect: "Mesejnya lebih menyeluruh." },
      { wrong: "Syukur sama dengan gembira sahaja.", whyWrong: "Syukur melibatkan kesedaran dan penghargaan.", correct: "Syukur perlu ditunjukkan melalui sikap dan tindakan.", whyCorrect: "Itu pengajaran yang boleh diamalkan." },
    ],
    revision: { tema: "Kesyukuran dan penghargaan.", persoalan: "Nikmat hidup, jasa orang, alam.", watak: "Aku lirik.", nilai: "Syukur, kasih sayang, mengenang jasa.", pengajaran: "Hargai semua nikmat sebelum terlambat." },
  },
  {
    id: "sajak-aku",
    title: "Aku",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "10 minit",
    difficulty: "Sederhana",
    intro: "Sajak ini bersuara tegas. Aku lirik mahu terus menjadi diri sendiri walaupun berdepan cabaran.",
    quickOverview: { theme: "Keteguhan jiwa dan keberanian mempertahankan prinsip.", values: "Berani, tabah, yakin diri.", lesson: "Jangan mudah mengalah apabila menghadapi tekanan." },
    decoder: [
      { rangkap: "Rangkap suara diri yang tegas.", maksud: "Aku lirik menyatakan pendirian dengan berani.", tema: "Jati diri.", nilai: "Keberanian.", pengajaran: "Berani menyatakan pendirian yang benar." },
      { rangkap: "Rangkap menghadapi cabaran.", maksud: "Aku lirik tidak mahu tunduk kepada halangan.", tema: "Ketabahan.", nilai: "Tabah.", pengajaran: "Jangan cepat putus asa." },
      { rangkap: "Rangkap semangat meneruskan hidup.", maksud: "Aku lirik mahu dikenang sebagai insan yang kuat.", tema: "Semangat hidup.", nilai: "Yakin diri.", pengajaran: "Percaya kepada kemampuan diri." },
    ],
    themeExplorer: { meaning: "Tema sajak ialah keberanian dan keteguhan diri.", whyAppears: "Nada sajak yang kuat menunjukkan semangat melawan kelemahan dan tekanan.", evidence: "Penggunaan aku lirik yang tegas menonjolkan prinsip dan keyakinan.", whyCare: "Murid perlu berani mempertahankan perkara benar, bukan ikut kawan secara membuta tuli." },
    persoalan: [
      { title: "Keberanian mempertahankan diri", situation: "Aku lirik bersuara tegas.", explanation: "Prinsip memerlukan keberanian." },
      { title: "Ketabahan menghadapi dugaan", situation: "Aku lirik tidak mudah menyerah.", explanation: "Cabaran tidak semestinya mematahkan semangat." },
      { title: "Keyakinan diri", situation: "Aku lirik percaya pada dirinya.", explanation: "Keyakinan membantu seseorang terus maju." },
    ],
    valuesLessons: [
      { value: "Keberanian", example: "Aku lirik mempertahankan suara diri.", lesson: "Berani menolak ajakan negatif rakan." },
      { value: "Ketabahan", example: "Aku lirik tetap kuat walaupun diuji.", lesson: "Terus berusaha walaupun gagal dalam ujian." },
      { value: "Yakin diri", example: "Aku lirik tidak hilang identiti.", lesson: "Percaya kepada kebolehan sendiri tanpa merendahkan orang lain." },
    ],
    examBooster: { themes: ["Jati diri", "Keberanian"], characters: ["Aku lirik"], values: ["Berani", "Tabah", "Yakin diri"], lessons: ["Pertahankan prinsip", "Jangan mengalah"] },
    kbat: poemKbat("keteguhan diri", "keberanian"),
    teacherExplains: ["Aku lirik bukan semestinya penyair secara literal. Dalam sajak, aku lirik ialah suara yang menyampaikan perasaan.", "Nada kuat tidak bermaksud sombong; dalam konteks ini, ia menunjukkan semangat dan prinsip."],
    mistakes: [
      { wrong: "Aku lirik bersikap angkuh.", whyWrong: "Ketegasan sering disalah tafsir sebagai sombong.", correct: "Aku lirik berpendirian dan berani.", whyCorrect: "Tindakan itu berkait dengan jati diri." },
      { wrong: "Tema sajak ialah kemarahan.", whyWrong: "Nada tegas bukan semestinya marah.", correct: "Tema ialah keberanian dan keteguhan jiwa.", whyCorrect: "Keseluruhan sajak menonjolkan semangat hidup." },
    ],
    revision: { tema: "Keteguhan jiwa.", persoalan: "Keberanian, tabah, yakin diri.", watak: "Aku lirik.", nilai: "Berani, tabah, yakin diri.", pengajaran: "Pertahankan prinsip dan jangan mudah mengalah." },
  },
  {
    id: "sajak-kunci-bahasa",
    title: "Kunci Bahasa",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "9 minit",
    difficulty: "Mudah",
    intro: "Sajak ini melihat bahasa sebagai kunci: apabila kita menguasainya, pintu ilmu, budaya dan jati diri terbuka.",
    quickOverview: { theme: "Kepentingan bahasa sebagai alat ilmu dan identiti bangsa.", values: "Cinta bahasa, patriotisme, bertanggungjawab.", lesson: "Gunakan bahasa dengan betul dan bangga akan bahasa kebangsaan." },
    decoder: [
      { rangkap: "Rangkap bahasa sebagai kunci.", maksud: "Bahasa membuka jalan kepada ilmu dan pemahaman.", tema: "Ilmu.", nilai: "Cinta ilmu.", pengajaran: "Kuasai bahasa untuk belajar dengan lebih baik." },
      { rangkap: "Rangkap bahasa sebagai maruah bangsa.", maksud: "Bahasa melambangkan identiti dan budaya.", tema: "Jati diri.", nilai: "Patriotisme.", pengajaran: "Bangga menggunakan bahasa kebangsaan." },
      { rangkap: "Rangkap tanggungjawab menjaga bahasa.", maksud: "Generasi muda perlu memelihara bahasa agar tidak rosak.", tema: "Warisan.", nilai: "Tanggungjawab.", pengajaran: "Gunakan bahasa sopan dan tepat." },
    ],
    themeExplorer: { meaning: "Tema sajak ialah bahasa sebagai kunci ilmu, budaya dan jati diri.", whyAppears: "Kunci melambangkan alat untuk membuka sesuatu yang bernilai.", evidence: "Bahasa dikaitkan dengan ilmu, bangsa dan warisan.", whyCare: "Murid menggunakan bahasa setiap hari: dalam peperiksaan, perbualan dan dunia digital." },
    persoalan: [
      { title: "Bahasa sebagai alat ilmu", situation: "Bahasa digambarkan seperti kunci.", explanation: "Tanpa bahasa, ilmu sukar difahami." },
      { title: "Bahasa sebagai identiti", situation: "Sajak mengaitkan bahasa dengan bangsa.", explanation: "Bahasa menunjukkan asal budaya dan maruah." },
      { title: "Tanggungjawab memelihara bahasa", situation: "Generasi muda diseru menjaga bahasa.", explanation: "Bahasa boleh rosak jika digunakan secara cuai." },
    ],
    valuesLessons: [
      { value: "Cinta bahasa", example: "Bahasa dimuliakan dalam sajak.", lesson: "Elakkan bahasa kasar dalam kelas dan media sosial." },
      { value: "Patriotisme", example: "Bahasa dikaitkan dengan jati diri bangsa.", lesson: "Bangga menggunakan Bahasa Melayu dengan betul." },
      { value: "Tanggungjawab", example: "Bahasa perlu dipelihara.", lesson: "Semak ejaan dan tatabahasa sebelum menghantar tugasan." },
    ],
    examBooster: { themes: ["Bahasa", "Jati diri", "Ilmu"], characters: ["Aku lirik/penyair"], values: ["Cinta bahasa", "Patriotisme"], lessons: ["Pelihara bahasa", "Gunakan bahasa dengan betul"] },
    kbat: poemKbat("kepentingan bahasa", "cinta bahasa"),
    teacherExplains: ["Kunci ialah metafora. Maksudnya bahasa membuka pintu ilmu dan hubungan manusia.", "Jawapan peperiksaan yang baik mengaitkan bahasa dengan ilmu, identiti dan tanggungjawab."],
    mistakes: [
      { wrong: "Kunci bermaksud benda fizikal.", whyWrong: "Dalam sajak, kunci ialah lambang.", correct: "Kunci bermaksud alat membuka ilmu dan jati diri.", whyCorrect: "Ini sesuai dengan maksud keseluruhan sajak." },
      { wrong: "Cinta bahasa bermaksud tidak boleh belajar bahasa lain.", whyWrong: "Mencintai bahasa sendiri tidak menolak bahasa lain.", correct: "Cinta bahasa bermaksud menghargai dan menggunakan bahasa dengan betul.", whyCorrect: "Nilai ini seimbang dan matang." },
    ],
    revision: { tema: "Bahasa sebagai kunci ilmu dan identiti.", persoalan: "Ilmu, jati diri, tanggungjawab menjaga bahasa.", watak: "Aku lirik/penyair.", nilai: "Cinta bahasa, patriotisme, tanggungjawab.", pengajaran: "Gunakan dan pelihara bahasa dengan baik." },
  },
];

const storyWorks: KomsasWork[] = [
  {
    id: "prosa-asal-padi",
    title: "Asal Padi",
    typeLabel: "Prosa Tradisional",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Sederhana",
    intro: "Cerita ini menerangkan asal usul padi melalui kisah pengorbanan. Baca seperti mendengar cerita lama yang menjawab soalan: mengapa padi begitu berharga?",
    quickOverview: { theme: "Pengorbanan demi kesejahteraan manusia.", mainCharacters: "Watak kayangan/manusia dan tokoh yang berkorban.", values: "Pengorbanan, kasih sayang, bersyukur.", lesson: "Hargai makanan dan jasa orang yang berkorban untuk kita." },
    story: [
      { stage: "Permulaan", tone: "Dunia asal", text: "Kisah bermula dengan keadaan manusia yang memerlukan makanan dan kehidupan yang lebih baik." },
      { stage: "Perkembangan", tone: "Rahsia padi", text: "Padi dikaitkan dengan dunia istimewa dan tidak diperoleh dengan mudah." },
      { stage: "Konflik", tone: "Pilihan berat", text: "Watak terpaksa membuat keputusan antara kepentingan sendiri dengan manfaat ramai orang." },
      { stage: "Klimaks", tone: "Pengorbanan", text: "Pengorbanan berlaku sehingga padi menjadi sumber makanan manusia." },
      { stage: "Peleraian", tone: "Warisan", text: "Manusia mendapat padi dan perlu menghargainya sebagai rezeki yang bernilai." },
    ],
    characters: [
      { name: "Tokoh yang berkorban", role: "Pusat cerita", traits: ["Penyayang", "Rela berkorban", "Berani"], evidence: "Sanggup menanggung akibat demi kebaikan manusia.", importance: "Menjelaskan mengapa padi dianggap hasil pengorbanan." },
      { name: "Manusia", role: "Penerima manfaat", traits: ["Memerlukan bantuan", "Bergantung pada rezeki", "Perlu bersyukur"], evidence: "Kehidupan manusia berubah selepas memperoleh padi.", importance: "Mewakili kita sebagai pembaca yang menikmati rezeki." },
      { name: "Pihak kayangan/penjaga asal", role: "Penggerak konflik", traits: ["Berkuasa", "Menjaga aturan", "Tegas"], evidence: "Padi tidak boleh diperoleh sesuka hati.", importance: "Menjadikan cerita asal usul lebih dramatik." },
    ],
    themeExplorer: { meaning: "Tema karya ialah pengorbanan yang membawa manfaat kepada orang ramai.", whyAppears: "Cerita asal usul biasanya menerangkan sesuatu yang penting dalam hidup manusia.", evidence: "Padi hadir melalui peristiwa besar dan pengorbanan.", whyCare: "Murid belajar menghargai makanan dan tidak membazir." },
    persoalan: [
      { title: "Asal usul makanan asasi", situation: "Cerita menerangkan bagaimana padi diperoleh.", explanation: "Prosa tradisional sering menjawab asal sesuatu perkara." },
      { title: "Pengorbanan demi orang lain", situation: "Watak sanggup berkorban.", explanation: "Kebaikan besar kadangkala memerlukan keberanian." },
      { title: "Kesyukuran atas rezeki", situation: "Manusia memperoleh padi.", explanation: "Makanan bukan perkara yang patut dibazirkan." },
    ],
    valuesLessons: [
      { value: "Pengorbanan", example: "Watak utama sanggup menderita demi manusia.", lesson: "Hargai ibu bapa yang bekerja untuk menyediakan makanan." },
      { value: "Kesyukuran", example: "Padi menjadi rezeki manusia.", lesson: "Ambil makanan secukupnya dan elakkan pembaziran." },
      { value: "Kasih sayang", example: "Pengorbanan dilakukan kerana mahu membantu.", lesson: "Bantu keluarga tanpa berkira." },
    ],
    examBooster: { themes: ["Pengorbanan", "Asal usul padi"], characters: ["Tokoh yang berkorban", "Manusia"], values: ["Pengorbanan", "Syukur"], lessons: ["Jangan membazir", "Hargai jasa"] },
    kbat: storyKbat("memilih antara kepentingan diri dan manfaat orang ramai", "pengorbanan"),
    teacherExplains: ["Prosa tradisional tidak perlu dibaca seperti laporan sains. Ia menerangkan asal usul melalui imaginasi dan nilai masyarakat lama.", "Fokus peperiksaan biasanya pada pengajaran: mengapa padi perlu dihargai?"],
    mistakes: [
      { wrong: "Cerita ini fakta sejarah padi sepenuhnya.", whyWrong: "Prosa tradisional bercampur unsur mitos dan kepercayaan lama.", correct: "Cerita ini ialah kisah asal usul yang membawa pengajaran.", whyCorrect: "Nilai lebih penting daripada bukti saintifik." },
      { wrong: "Padi hanya objek biasa.", whyWrong: "Dalam karya, padi ialah lambang rezeki dan pengorbanan.", correct: "Padi melambangkan nikmat yang perlu dihargai.", whyCorrect: "Itu mesej utama karya." },
    ],
    revision: { tema: "Pengorbanan demi kesejahteraan manusia.", persoalan: "Asal usul padi, pengorbanan, syukur.", watak: "Tokoh yang berkorban, manusia, pihak kayangan.", nilai: "Pengorbanan, kasih sayang, syukur.", pengajaran: "Hargai makanan dan jasa orang lain." },
  },
  {
    id: "cerpen-oren",
    title: "Oren",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Mudah",
    intro: "Cerpen ini nampak kecil kerana berpusat pada seekor kucing bernama Oren, tetapi sebenarnya menyentuh kasih sayang, kehilangan dan rasa bersalah.",
    quickOverview: { theme: "Kasih sayang terhadap haiwan dan tanggungjawab dalam keluarga.", mainCharacters: "Oren, Kelabu, Ayah, Ibu dan anak-anak.", values: "Kasih sayang, prihatin, tanggungjawab.", lesson: "Sayangi makhluk lain dan jangan abaikan yang memerlukan perhatian." },
    story: [
      { stage: "Permulaan", tone: "Keluarga dan haiwan peliharaan", text: "Oren menjadi sebahagian daripada keluarga, tetapi perhatian manusia boleh berubah apabila ada perkara lain yang lebih menarik." },
      { stage: "Perkembangan", tone: "Perhatian beralih", text: "Kehadiran haiwan lain menyebabkan kasih sayang dan perhatian tidak lagi sama seperti dahulu." },
      { stage: "Konflik", tone: "Terabai", text: "Oren terasa seperti diketepikan. Pembaca mula melihat kesan apabila kasih sayang tidak dibahagi dengan adil." },
      { stage: "Klimaks", tone: "Kehilangan", text: "Peristiwa sedih berlaku dan keluarga sedar bahawa mereka sudah terlewat untuk memberi perhatian sepenuhnya." },
      { stage: "Peleraian", tone: "Kesedaran", text: "Keluarga menyesal dan pembaca belajar bahawa kasih sayang perlu ditunjukkan sebelum kehilangan berlaku." },
    ],
    characters: [
      { name: "Oren", role: "Haiwan peliharaan utama", traits: ["Manja", "Setia", "Tersisih"], evidence: "Oren mencari perhatian tetapi semakin kurang diberi tumpuan.", importance: "Menjadi lambang makhluk yang memerlukan kasih sayang." },
      { name: "Ayah", role: "Ketua keluarga", traits: ["Penyayang", "Mudah tersentuh", "Menyesal"], evidence: "Ayah menunjukkan emosi apabila menyedari nasib Oren.", importance: "Menunjukkan kasih sayang manusia terhadap haiwan." },
      { name: "Kelabu", role: "Haiwan yang mencetus perubahan perhatian", traits: ["Menarik perhatian", "Disayangi", "Pencetus konflik"], evidence: "Kehadirannya mengubah layanan terhadap Oren.", importance: "Membantu pembaca faham punca Oren terabai." },
    ],
    themeExplorer: { meaning: "Tema cerpen ialah kasih sayang dan tanggungjawab terhadap haiwan peliharaan.", whyAppears: "Kisah Oren menunjukkan makhluk kecil juga mempunyai perasaan dan memerlukan perhatian.", evidence: "Konflik timbul apabila perhatian terhadap Oren berubah.", whyCare: "Murid yang memelihara haiwan atau mempunyai adik-beradik boleh faham pentingnya adil dalam kasih sayang." },
    persoalan: [
      { title: "Kasih sayang terhadap haiwan", situation: "Oren dipelihara dalam keluarga.", explanation: "Haiwan juga perlu dijaga dengan baik." },
      { title: "Kesan pengabaian", situation: "Oren semakin kurang diberi perhatian.", explanation: "Pengabaian boleh membawa penyesalan." },
      { title: "Rasa bersalah selepas kehilangan", situation: "Keluarga sedar selepas peristiwa sedih.", explanation: "Kesedaran yang lewat menyakitkan." },
    ],
    valuesLessons: [
      { value: "Kasih sayang", example: "Keluarga menyayangi haiwan peliharaan.", lesson: "Tunjukkan kasih sayang melalui tindakan, bukan kata-kata sahaja." },
      { value: "Prihatin", example: "Nasib Oren menuntut perhatian.", lesson: "Perhatikan perubahan orang atau haiwan di sekeliling kita." },
      { value: "Tanggungjawab", example: "Haiwan peliharaan perlu dijaga.", lesson: "Jika mahu memelihara haiwan, pastikan makan, keselamatan dan emosinya dijaga." },
    ],
    examBooster: { themes: ["Kasih sayang", "Tanggungjawab terhadap haiwan"], characters: ["Oren", "Ayah", "Kelabu"], values: ["Kasih sayang", "Prihatin"], lessons: ["Jangan abaikan haiwan", "Hargai sebelum hilang"] },
    kbat: storyKbat("haiwan peliharaan terasa terabai apabila perhatian berubah", "kasih sayang"),
    teacherExplains: ["Oren bukan sekadar kucing. Oren mewakili sesiapa yang terasa dilupakan apabila perhatian berubah.", "Konflik cerpen ini halus: bukan pergaduhan besar, tetapi pengabaian yang perlahan-lahan menyakitkan."],
    mistakes: [
      { wrong: "Cerpen ini hanya cerita sedih tentang kucing.", whyWrong: "Cerpen membawa pengajaran tentang kasih sayang dan tanggungjawab.", correct: "Oren menjadi simbol makhluk yang perlu dihargai.", whyCorrect: "Ini menjadikan analisis lebih matang." },
      { wrong: "Kelabu ialah watak jahat.", whyWrong: "Kelabu tidak berniat menyakiti Oren.", correct: "Kelabu ialah pencetus perubahan perhatian.", whyCorrect: "Konflik sebenar datang daripada sikap manusia." },
    ],
    revision: { tema: "Kasih sayang terhadap haiwan.", persoalan: "Pengabaian, tanggungjawab, penyesalan.", watak: "Oren, Ayah, Kelabu, keluarga.", nilai: "Kasih sayang, prihatin, tanggungjawab.", pengajaran: "Sayangi dan jaga haiwan sebelum terlambat." },
  },
  {
    id: "cerpen-hadiah",
    title: "Hadiah",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "11 minit",
    difficulty: "Mudah",
    intro: "Cerpen ini mengajar bahawa hadiah paling bermakna bukan semestinya mahal. Kadangkala, nilai sebenar datang daripada niat.",
    quickOverview: { theme: "Keikhlasan dan penghargaan dalam hubungan manusia.", mainCharacters: "Pemberi hadiah, penerima hadiah, keluarga/rakan.", values: "Ikhlas, menghargai, rendah hati.", lesson: "Nilai seseorang tidak diukur melalui harga barang." },
    story: [
      { stage: "Permulaan", tone: "Keinginan memberi", text: "Watak ingin memberi sesuatu yang bermakna kepada orang lain." },
      { stage: "Perkembangan", tone: "Keterbatasan", text: "Watak berdepan kekangan seperti wang, keadaan keluarga atau salah faham." },
      { stage: "Konflik", tone: "Nilai hadiah dipersoal", text: "Hadiah itu mungkin kelihatan kecil, lalu timbul rasa malu atau bimbang tidak dihargai." },
      { stage: "Klimaks", tone: "Keikhlasan terserlah", text: "Penerima atau pembaca menyedari niat sebenar di sebalik hadiah tersebut." },
      { stage: "Peleraian", tone: "Penghargaan", text: "Hadiah akhirnya difahami sebagai lambang kasih sayang dan keikhlasan." },
    ],
    characters: [
      { name: "Pemberi hadiah", role: "Watak utama", traits: ["Ikhlas", "Berusaha", "Sensitif"], evidence: "Tetap mahu memberi walaupun kemampuannya terbatas.", importance: "Menunjukkan makna sebenar sebuah hadiah." },
      { name: "Penerima hadiah", role: "Watak penting", traits: ["Perlu memahami", "Mungkin tersentuh", "Belajar menghargai"], evidence: "Reaksinya menentukan makna hadiah.", importance: "Membawa mesej bahawa penghargaan lebih penting daripada harga." },
      { name: "Keluarga/Rakan", role: "Latar sosial", traits: ["Mempengaruhi keadaan", "Memberi tekanan", "Membantu perkembangan cerita"], evidence: "Hubungan sekeliling membentuk konflik.", importance: "Menjadikan tema lebih dekat dengan dunia murid." },
    ],
    themeExplorer: { meaning: "Tema cerpen ialah keikhlasan dalam memberi.", whyAppears: "Hadiah digunakan untuk menunjukkan perbezaan antara nilai wang dengan nilai hati.", evidence: "Konflik berkisar pada maksud sebuah pemberian.", whyCare: "Murid sering memberi hadiah kepada kawan atau guru; karya ini mengajar supaya tidak menilai melalui harga." },
    persoalan: [
      { title: "Keikhlasan memberi", situation: "Watak memberi mengikut kemampuan.", explanation: "Niat lebih penting daripada harga." },
      { title: "Menghargai pemberian", situation: "Hadiah kecil tetap membawa makna.", explanation: "Menghina hadiah boleh menyakiti hati pemberi." },
      { title: "Kesederhanaan hidup", situation: "Watak berdepan kekangan.", explanation: "Kekurangan tidak menghalang seseorang berbuat baik." },
    ],
    valuesLessons: [
      { value: "Keikhlasan", example: "Hadiah diberikan dengan niat baik.", lesson: "Bantu rakan tanpa mengharapkan pujian." },
      { value: "Menghargai", example: "Hadiah perlu dilihat dari sudut usaha.", lesson: "Ucap terima kasih walaupun hadiah sederhana." },
      { value: "Rendah hati", example: "Watak tidak menunjuk-nunjuk.", lesson: "Jangan membandingkan kemampuan keluarga sendiri dengan orang lain." },
    ],
    examBooster: { themes: ["Keikhlasan", "Penghargaan"], characters: ["Pemberi hadiah", "Penerima hadiah"], values: ["Ikhlas", "Menghargai"], lessons: ["Nilai niat, bukan harga", "Jangan merendahkan pemberian"] },
    kbat: storyKbat("hadiah sederhana mungkin disalah nilai oleh orang lain", "keikhlasan"),
    teacherExplains: ["Hadiah ialah objek, tetapi makna sebenarnya ialah hubungan antara manusia.", "Jika soalan tanya pengajaran, jangan jawab 'beri hadiah'. Jawab: kita hendaklah ikhlas dan menghargai pemberian."],
    mistakes: [
      { wrong: "Hadiah mahal lebih bernilai dalam cerpen.", whyWrong: "Karya menolak ukuran material semata-mata.", correct: "Hadiah ikhlas lebih bermakna.", whyCorrect: "Tema utama ialah keikhlasan." },
      { wrong: "Pemberi hadiah perlu berasa malu jika hadiah kecil.", whyWrong: "Rasa malu datang daripada tekanan sosial, bukan nilai sebenar.", correct: "Pemberi patut dihargai kerana niatnya baik.", whyCorrect: "Nilai moral karya menyokong keikhlasan." },
    ],
    revision: { tema: "Keikhlasan dalam memberi.", persoalan: "Nilai hadiah, penghargaan, kesederhanaan.", watak: "Pemberi dan penerima hadiah.", nilai: "Ikhlas, menghargai, rendah hati.", pengajaran: "Hargai niat dan usaha, bukan harga." },
  },
  {
    id: "cerpen-kuih-bakul",
    title: "Kuih Bakul Limau Mandarin",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Mudah",
    intro: "Cerpen ini rasa seperti suasana Tahun Baharu Cina di kawasan kejiranan. Makanannya menjadi jambatan untuk memahami budaya dan memupuk perpaduan.",
    quickOverview: { theme: "Perpaduan kaum melalui amalan menghormati budaya.", mainCharacters: "Jiran berlainan kaum, keluarga dan komuniti.", values: "Toleransi, hormat, muhibah.", lesson: "Kenali budaya orang lain supaya hubungan masyarakat menjadi mesra." },
    story: [
      { stage: "Permulaan", tone: "Suasana perayaan", text: "Cerita bermula dengan latar masyarakat berbilang kaum dan suasana perayaan." },
      { stage: "Perkembangan", tone: "Perkongsian budaya", text: "Kuih bakul dan limau mandarin menjadi tanda ingatan serta kemesraan antara jiran." },
      { stage: "Konflik", tone: "Salah faham kecil", text: "Perbezaan budaya mungkin menimbulkan rasa kekok atau salah faham." },
      { stage: "Klimaks", tone: "Saling memahami", text: "Watak menyedari maksud di sebalik pemberian dan tradisi tersebut." },
      { stage: "Peleraian", tone: "Harmoni", text: "Hubungan kejiranan menjadi lebih erat kerana mereka saling menghormati." },
    ],
    characters: [
      { name: "Jiran Cina", role: "Pembawa budaya perayaan", traits: ["Pemurah", "Mesra", "Menghargai jiran"], evidence: "Berkongsi makanan tradisi dengan jiran.", importance: "Menunjukkan budaya boleh mendekatkan masyarakat." },
      { name: "Keluarga jiran", role: "Penerima dan pemerhati", traits: ["Ingin tahu", "Belajar menghormati", "Terbuka"], evidence: "Menerima dan memahami tradisi orang lain.", importance: "Mewakili pembaca yang belajar tentang perpaduan." },
      { name: "Komuniti kejiranan", role: "Latar masyarakat", traits: ["Berbilang kaum", "Saling bergantung", "Harmoni"], evidence: "Hubungan berlaku melalui kunjung-mengunjung.", importance: "Menjadikan tema perpaduan lebih jelas." },
    ],
    themeExplorer: { meaning: "Tema cerpen ialah perpaduan kaum melalui sikap saling menghormati.", whyAppears: "Makanan perayaan menjadi simbol persahabatan dan penerimaan budaya.", evidence: "Kuih bakul dan limau mandarin digunakan sebagai tanda hubungan baik.", whyCare: "Murid Malaysia hidup dalam masyarakat berbilang kaum; sikap hormat perlu dipraktikkan setiap hari." },
    persoalan: [
      { title: "Perpaduan kaum", situation: "Jiran berlainan budaya berinteraksi.", explanation: "Hubungan mesra menguatkan masyarakat." },
      { title: "Menghormati adat", situation: "Makanan tradisi dikongsi.", explanation: "Memahami adat orang lain mengurangkan prasangka." },
      { title: "Semangat kejiranan", situation: "Pemberian berlaku antara jiran.", explanation: "Jiran yang baik saling mengambil berat." },
    ],
    valuesLessons: [
      { value: "Toleransi", example: "Watak menerima perbezaan budaya.", lesson: "Hormati cara perayaan rakan yang berbeza agama atau bangsa." },
      { value: "Muhibah", example: "Makanan dikongsi dengan jiran.", lesson: "Sapa dan bantu jiran tanpa mengira kaum." },
      { value: "Hormat", example: "Tradisi Tahun Baharu Cina diberi makna positif.", lesson: "Jangan mengejek makanan, pakaian atau adat orang lain." },
    ],
    examBooster: { themes: ["Perpaduan", "Semangat kejiranan"], characters: ["Jiran Cina", "Keluarga jiran", "Komuniti"], values: ["Toleransi", "Hormat"], lessons: ["Hormati budaya lain", "Pupuk hubungan jiran"] },
    kbat: storyKbat("salah faham kecil tentang budaya perayaan jiran", "toleransi"),
    teacherExplains: ["Kuih bakul dan limau mandarin bukan sekadar makanan; kedua-duanya ialah simbol budaya dan hubungan baik.", "Jawapan yang kuat perlu sebut perpaduan, hormat dan kejiranan bersama-sama."],
    mistakes: [
      { wrong: "Cerpen ini hanya tentang makanan Tahun Baharu Cina.", whyWrong: "Makanan ialah simbol, bukan mesej akhir.", correct: "Cerpen ini tentang perpaduan dan hormat budaya.", whyCorrect: "Peristiwa makanan membina hubungan manusia." },
      { wrong: "Perbezaan budaya menyebabkan masyarakat susah bersatu.", whyWrong: "Karya menunjukkan perbezaan boleh diraikan.", correct: "Perbezaan budaya boleh mengeratkan hubungan jika dihormati.", whyCorrect: "Itulah semangat muhibah." },
    ],
    revision: { tema: "Perpaduan kaum.", persoalan: "Budaya, kejiranan, hormat-menghormati.", watak: "Jiran Cina, keluarga jiran, komuniti.", nilai: "Toleransi, hormat, muhibah.", pengajaran: "Raikan budaya orang lain untuk hidup harmoni." },
  },
  {
    id: "drama-hadiah",
    title: "Hadiah",
    typeLabel: "Drama",
    kind: "story",
    studyTime: "13 minit",
    difficulty: "Sederhana",
    intro: "Drama ini bergerak melalui dialog. Perhatikan apa yang watak cakap, apa yang mereka rasa, dan bagaimana salah faham boleh selesai apabila orang mula mendengar.",
    quickOverview: { theme: "Komunikasi dan kasih sayang dalam menyelesaikan konflik.", mainCharacters: "Ahli keluarga/rakan yang terlibat dalam pemberian hadiah.", values: "Pemaafan, kejujuran, kasih sayang.", lesson: "Bercakap dengan jujur lebih baik daripada memendam rasa." },
    story: [
      { stage: "Permulaan", tone: "Situasi harian", text: "Drama bermula dengan watak-watak dalam suasana biasa yang berkait dengan pemberian atau penerimaan hadiah." },
      { stage: "Perkembangan", tone: "Dialog membina konflik", text: "Melalui perbualan, penonton mula nampak perbezaan harapan, salah faham atau rasa tersinggung." },
      { stage: "Konflik", tone: "Salah faham memuncak", text: "Watak tidak memahami niat sebenar antara satu sama lain, lalu hubungan menjadi tegang." },
      { stage: "Klimaks", tone: "Kebenaran terdedah", text: "Niat sebenar atau perasaan watak akhirnya diketahui melalui dialog penting." },
      { stage: "Peleraian", tone: "Damai", text: "Watak mencapai kefahaman dan hubungan pulih melalui pemaafan serta kasih sayang." },
    ],
    characters: [
      { name: "Watak pemberi hadiah", role: "Penggerak konflik", traits: ["Ikhlas", "Sensitif", "Mengharapkan faham"], evidence: "Tindakannya berkait dengan niat memberi.", importance: "Membawa tema keikhlasan dan komunikasi." },
      { name: "Watak penerima hadiah", role: "Pencetus reaksi", traits: ["Tersalah faham", "Berubah apabila sedar", "Mampu memaafkan"], evidence: "Reaksinya menyebabkan dialog berkembang.", importance: "Menunjukkan pentingnya memahami niat orang." },
      { name: "Watak keluarga/rakan", role: "Penyeimbang situasi", traits: ["Menegur", "Menasihati", "Mendamaikan"], evidence: "Membantu konflik bergerak ke arah penyelesaian.", importance: "Mewakili suara matang dalam drama." },
    ],
    themeExplorer: { meaning: "Tema drama ialah kepentingan komunikasi dalam hubungan.", whyAppears: "Drama bergantung pada dialog, jadi salah faham dan penyelesaian berlaku melalui percakapan.", evidence: "Konflik reda apabila watak memahami niat sebenar.", whyCare: "Dalam keluarga dan persahabatan, banyak masalah kecil menjadi besar kerana orang tidak mahu bercakap dengan baik." },
    persoalan: [
      { title: "Salah faham dalam hubungan", situation: "Watak menilai tindakan sebelum memahami niat.", explanation: "Salah faham boleh merosakkan hubungan." },
      { title: "Kejujuran dalam komunikasi", situation: "Kebenaran muncul melalui dialog.", explanation: "Bercakap jujur membantu menyelesaikan masalah." },
      { title: "Pemaafan", situation: "Watak berdamai selepas sedar.", explanation: "Memaafkan membuka ruang hubungan pulih." },
    ],
    valuesLessons: [
      { value: "Kejujuran", example: "Watak perlu menjelaskan niat sebenar.", lesson: "Jika tersinggung, tanya dengan baik sebelum membuat andaian." },
      { value: "Pemaafan", example: "Konflik selesai apabila watak menerima kesilapan.", lesson: "Maafkan rakan yang benar-benar mahu membetulkan keadaan." },
      { value: "Kasih sayang", example: "Hadiah menjadi tanda hubungan.", lesson: "Utamakan hubungan, bukan ego." },
    ],
    examBooster: { themes: ["Komunikasi", "Kasih sayang", "Pemaafan"], characters: ["Pemberi hadiah", "Penerima hadiah", "Penasihat"], values: ["Jujur", "Pemaaf"], lessons: ["Selesaikan salah faham melalui dialog", "Hargai niat baik"] },
    kbat: storyKbat("salah faham tentang niat seseorang ketika memberi hadiah", "pemaafan"),
    teacherExplains: ["Dalam drama, dialog ialah bukti utama. Kalau soalan minta perwatakan, cari apa yang watak ucap dan bagaimana watak bertindak.", "Jangan samakan drama dengan cerpen. Drama ditulis untuk dilakonkan, jadi konflik biasanya jelas melalui percakapan."],
    mistakes: [
      { wrong: "Drama ini sama sepenuhnya dengan cerpen Hadiah.", whyWrong: "Genre berbeza mempunyai cara penyampaian berbeza.", correct: "Drama menonjolkan konflik melalui dialog dan aksi pentas.", whyCorrect: "Itu ciri utama drama." },
      { wrong: "Hadiah ialah perkara paling penting.", whyWrong: "Hadiah hanya alat yang mencetus konflik.", correct: "Niat, komunikasi dan pemaafan ialah fokus utama.", whyCorrect: "Peleraian berlaku apabila watak saling memahami." },
    ],
    revision: { tema: "Komunikasi menyelesaikan konflik.", persoalan: "Salah faham, kejujuran, pemaafan.", watak: "Pemberi hadiah, penerima hadiah, penasihat.", nilai: "Jujur, pemaaf, kasih sayang.", pengajaran: "Bercakap baik-baik sebelum membuat kesimpulan." },
  },
];

for (const work of [...poemWorks, ...storyWorks]) {
  KOMSAS_PREMIUM_WORKS[work.id] = work;
}

export function getPremiumKomsasWork(id: string) {
  return KOMSAS_PREMIUM_WORKS[id];
}
