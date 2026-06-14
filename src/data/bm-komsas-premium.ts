export type KomsasWorkKind = "poem" | "story";

export interface KomsasDecoderRangkap {
  rangkap: string;
  pantunMudah: string;
  maksud: string;
  tema: string;
  nilai: string;
  pengajaran: string;
}

export interface KomsasValueLesson {
  value: string;
  explanation: string;
  realLife: string;
  schoolLife?: string;
}

export interface KomsasExamQuestion {
  question: string;
  answerHint: string;
  modelAnswer?: string;
  explanation?: string;
  examTip?: string;
}

export interface KomsasTimelineItem {
  stage: "Permulaan" | "Perkembangan" | "Konflik" | "Klimaks" | "Peleraian";
  text: string;
}

export interface KomsasCharacterCard {
  name: string;
  personality: string;
  evidence: string;
  importance: string;
}

export interface KomsasEventCard {
  event: string;
  whatHappened: string;
  whyItMatters: string;
  examFocus: string;
}

export interface KomsasMasterCharacter {
  name: string;
  role: string;
  traits: string[];
  evidence: string;
  relationships: string;
  importance: string;
}

export interface KomsasRelationship {
  from: string;
  relation: string;
  to: string;
  explanation: string;
}

export interface KomsasDetailedPlotStage {
  stage: "Permulaan" | "Perkembangan" | "Konflik" | "Titik Perubahan" | "Klimaks" | "Peleraian";
  what: string;
  why: string;
  effect: string;
}

export interface KomsasImportantEvent {
  event: string;
  what: string;
  whyImportant: string;
  possibleQuestion: string;
}

export interface KomsasKeyCharacterFocus {
  name: string;
  whyMatters: string;
  supportsTheme: string;
  supportsIssues: string;
  supportsValues: string;
  supportsLessons: string;
}

export interface KomsasExamCharacterAnswer {
  character: string;
  trait: string;
  evidence: string;
  modelAnswer: string;
}

export interface KomsasMemory60 {
  theme: string;
  issues: string;
  mainCharacters: string;
  importantEvents: string;
  values: string;
  lessons: string;
}

export interface KomsasIssue {
  issue: string;
  explanation: string;
}

export interface KomsasUasaQuestion {
  type: "MCQ" | "Struktur" | "KBAT";
  question: string;
  answer: string;
  explanation: string;
}

export interface KomsasWork {
  id: string;
  title: string;
  typeLabel: string;
  kind: KomsasWorkKind;
  studyTime: string;
  difficulty: "Mudah" | "Sederhana";
  examFocus: string;
  intro: string;
  decoder: KomsasDecoderRangkap[];
  story60?: string;
  timeline?: KomsasTimelineItem[];
  characters?: KomsasCharacterCard[];
  events?: KomsasEventCard[];
  masterCharacters?: KomsasMasterCharacter[];
  relationshipMap?: KomsasRelationship[];
  detailedPlot?: KomsasDetailedPlotStage[];
  retelling3Min?: string;
  importantEvents?: KomsasImportantEvent[];
  keyCharacterFocus?: KomsasKeyCharacterFocus;
  authorPurpose?: string;
  examCharacterAnalysis?: KomsasExamCharacterAnswer[];
  memory60?: KomsasMemory60;
  story90?: string;
  issues?: KomsasIssue[];
  uasaQuestions?: KomsasUasaQuestion[];
  theme: {
    title: string;
    explanation: string;
    whyItMatters: string;
  };
  values: KomsasValueLesson[];
  lessons: KomsasValueLesson[];
  teacherExplains: string[];
  examBooster: {
    frequentPoints: string[];
    commonQuestions: KomsasExamQuestion[];
  };
  revision: {
    theme: string;
    values: string;
    lessons: string;
    examTips: string;
  };
  miniQuiz: KomsasExamQuestion[];
}

function q(
  question: string,
  modelAnswer: string,
  explanation: string,
  examTip: string,
): KomsasExamQuestion {
  return { question, answerHint: modelAnswer, modelAnswer, explanation, examTip };
}

function quiz(mcq: string, matching: string, kbat: string): KomsasExamQuestion[] {
  return [
    { question: `MCQ: ${mcq}`, answerHint: "Placeholder jawapan: pilih pilihan yang paling tepat berdasarkan tema dan bukti karya." },
    { question: `Matching: ${matching}`, answerHint: "Placeholder jawapan: padankan istilah dengan contoh peristiwa atau maksud yang betul." },
    { question: `KBAT: ${kbat}`, answerHint: "Placeholder jawapan: beri pendapat, sebab dan contoh kehidupan murid." },
  ];
}

function poemDecoder(items: Array<[string, string, string, string]>): KomsasDecoderRangkap[] {
  return items.map(([rangkap, mudah, nilai, pengajaran], index) => ({
    rangkap: `Rangkap ${index + 1}`,
    pantunMudah: mudah,
    maksud: mudah,
    tema: rangkap,
    nilai,
    pengajaran,
  }));
}

export const KOMSAS_PREMIUM_WORKS: Record<string, KomsasWork> = {
  "pantun-dua-kerat": {
    id: "pantun-dua-kerat",
    title: "Pantun Dua Kerat (Nasihat)",
    typeLabel: "Puisi Tradisional",
    kind: "poem",
    studyTime: "8 minit",
    difficulty: "Mudah",
    examFocus: "Maksud + Nilai",
    intro:
      "Jangan risau. Pantun ini pendek, tetapi mesejnya besar. Dalam beberapa minit, anda akan faham nasihat yang hendak disampaikan tanpa perlu menghafal seperti nota textbook.",
    decoder: [
      {
        rangkap: "Rangkap 1",
        pantunMudah: "Pantun menegur kita supaya menjaga sikap. Perbuatan kecil pun boleh menunjukkan siapa diri kita.",
        maksud:
          "Murid perlu faham bahawa nasihat dalam pantun bukan sekadar kata-kata indah. Pantun ini mengingatkan kita supaya berkelakuan baik, bercakap sopan dan tidak bertindak terburu-buru.",
        tema: "Nasihat untuk membentuk akhlak yang baik.",
        nilai: "Berhemah.",
        pengajaran: "Kita hendaklah menjaga tingkah laku supaya disenangi orang.",
      },
      {
        rangkap: "Rangkap 2",
        pantunMudah: "Pantun mengingatkan bahawa kejayaan memerlukan usaha. Kalau mahu berjaya, kita tidak boleh malas atau mudah berputus asa.",
        maksud:
          "Nasihat ini dekat dengan kehidupan murid. Markah baik, kemahiran baharu dan perubahan sikap tidak berlaku secara tiba-tiba. Semuanya perlukan latihan dan kesungguhan.",
        tema: "Usaha dan kegigihan dalam kehidupan.",
        nilai: "Ketekunan.",
        pengajaran: "Kita perlu rajin berusaha walaupun cabaran nampak kecil.",
      },
      {
        rangkap: "Rangkap 3",
        pantunMudah: "Pantun menasihati kita supaya menggunakan akal sebelum bercakap atau bertindak.",
        maksud:
          "Kadangkala masalah berlaku kerana seseorang terlalu cepat marah, cepat membalas mesej atau cepat membuat kesimpulan. Pantun ini mengajar kita supaya berfikir dahulu.",
        tema: "Kebijaksanaan membuat pilihan.",
        nilai: "Bijaksana.",
        pengajaran: "Kita hendaklah berfikir sebelum membuat keputusan agar tidak menyesal.",
      },
    ],
    theme: {
      title: "Nasihat membentuk peribadi mulia",
      explanation:
        "Tema pantun ini ialah nasihat kehidupan. Pantun dua kerat menyampaikan teguran secara ringkas, tetapi maksudnya tetap jelas: jadilah murid yang berakhlak, rajin dan bijak berfikir.",
      whyItMatters:
        "Tema ini penting kerana Form 1 ialah fasa murid belajar berdikari. Cara bercakap, cara belajar dan cara membuat keputusan akan membentuk keperibadian anda.",
    },
    values: [
      { value: "Berhemah", explanation: "Menjaga adab, tutur kata dan perlakuan.", realLife: "Bercakap sopan dengan orang lain.", schoolLife: "Tidak mengejek rakan dalam kelas atau kumpulan chat." },
      { value: "Ketekunan", explanation: "Terus berusaha walaupun mengambil masa.", realLife: "Berlatih kemahiran baharu sedikit demi sedikit.", schoolLife: "Ulang kaji 15 minit sehari, bukan belajar saat akhir." },
      { value: "Bijaksana", explanation: "Menggunakan akal sebelum bertindak.", realLife: "Semak dahulu sebelum berkongsi cerita.", schoolLife: "Bertanya sebelum menuduh rakan." },
    ],
    lessons: [
      { value: "Dengar nasihat", explanation: "Nasihat membantu kita membaiki diri.", realLife: "Terima teguran ibu bapa dengan tenang.", schoolLife: "Gunakan komen guru untuk baiki karangan." },
      { value: "Usaha kecil membawa perubahan", explanation: "Kejayaan bermula daripada tindakan konsisten.", realLife: "Latih diri membuat jadual harian.", schoolLife: "Siapkan kerja sekolah lebih awal." },
      { value: "Fikir sebelum bertindak", explanation: "Tindakan tergesa-gesa boleh membawa penyesalan.", realLife: "Jangan membalas komen ketika marah.", schoolLife: "Fikir kesan sebelum bergurau kasar." },
    ],
    teacherExplains: [
      "Murid selalu rasa pantun dua kerat ini terlalu pendek, jadi mereka cuba hafal sahaja. Sebenarnya, tanya dulu: pantun ini sedang menasihati saya tentang apa?",
      "Jangan terlalu fokus pada pembayang sampai terlupa maksud. Bahagian maksud biasanya membawa mesej utama yang akan diuji.",
      "Kalau soalan tanya nilai, jawab satu nilai. Kalau soalan tanya pengajaran, tukar nilai itu menjadi ayat tindakan: kita hendaklah...",
    ],
    examBooster: {
      frequentPoints: [
        "Popular theme: nasihat membentuk akhlak.",
        "Popular values: berhemah, tekun, bijaksana.",
        "Common exam focus: maksud rangkap, nilai dan pengajaran.",
        "Jawapan pengajaran mesti berbentuk tindakan.",
      ],
      commonQuestions: [
        q("Apakah tema pantun ini?", "Tema pantun ini ialah nasihat untuk membentuk akhlak dan peribadi baik.", "Tema perlu menyatakan idea besar karya, bukan hanya tajuk.", "Gunakan frasa 'Tema karya ialah...'"),
        q("Nyatakan satu nilai.", "Nilai yang terdapat dalam pantun ini ialah berhemah.", "Nilai ialah sifat baik, bukan arahan.", "Jangan tulis 'kita hendaklah' untuk soalan nilai."),
        q("Berikan satu pengajaran.", "Kita hendaklah berfikir sebelum bertindak agar tidak menyesal.", "Pengajaran mesti boleh diamalkan.", "Mulakan dengan 'Kita hendaklah...'"),
      ],
    },
    revision: {
      theme: "Nasihat membentuk peribadi mulia.",
      values: "Berhemah, ketekunan, bijaksana.",
      lessons: "Dengar nasihat, rajin berusaha, fikir sebelum bertindak.",
      examTips: "Nilai = sifat. Pengajaran = ayat tindakan.",
    },
    miniQuiz: quiz("Apakah fokus utama pantun ini?", "Nilai ketekunan dengan contoh murid berusaha.", "Bagaimanakah pantun ini membantu murid menggunakan media sosial dengan lebih baik?"),
  },

  "syair-pohon-buluh": {
    id: "syair-pohon-buluh",
    title: "Syair Pohon Buluh",
    typeLabel: "Puisi Tradisional",
    kind: "poem",
    studyTime: "10 minit",
    difficulty: "Sederhana",
    examFocus: "Simbol + Tema",
    intro: "Syair ini menggunakan pohon buluh sebagai simbol. Buluh nampak biasa, tetapi cara hidupnya mengajar kita tentang kerjasama, rendah hati dan kekuatan masyarakat.",
    decoder: poemDecoder([
      ["Hidup bermasyarakat", "Buluh hidup berumpun. Maksud mudahnya, manusia juga lebih kuat apabila hidup saling menyokong.", "Kerjasama.", "Kita hendaklah membantu ahli keluarga, rakan dan masyarakat."],
      ["Peranan setiap orang", "Setiap bahagian buluh ada fungsi. Begitu juga setiap orang ada tanggungjawab dalam kumpulan.", "Tanggungjawab.", "Kita perlu menjalankan tugas yang diberi dengan amanah."],
      ["Rendah hati", "Buluh yang tinggi tetap kelihatan tunduk. Ini mengajar kita supaya tidak sombong walaupun ada kelebihan.", "Rendah hati.", "Kita hendaklah merendah diri walaupun berjaya."],
      ["Teladan alam", "Penyair mengajak kita belajar daripada alam. Buluh menjadi contoh hidup bersatu dan bermanfaat.", "Bijaksana.", "Kita harus mengambil pengajaran daripada alam sekeliling."],
    ]),
    theme: {
      title: "Kerjasama membina masyarakat yang kukuh",
      explanation: "Tema syair ini ialah kepentingan hidup bersatu dan saling menyokong seperti serumpun buluh.",
      whyItMatters: "Di sekolah, projek kumpulan, kelab dan kelas hanya berjaya apabila semua ahli memainkan peranan.",
    },
    values: [
      { value: "Kerjasama", explanation: "Bekerja bersama untuk mencapai tujuan.", realLife: "Membantu keluarga mengemas rumah.", schoolLife: "Membahagi tugas projek secara adil." },
      { value: "Rendah hati", explanation: "Tidak menunjuk-nunjuk walaupun ada kelebihan.", realLife: "Tidak merendahkan orang lain.", schoolLife: "Membantu rakan yang lemah selepas mendapat markah baik." },
      { value: "Tanggungjawab", explanation: "Melaksanakan peranan yang diamanahkan.", realLife: "Menepati janji.", schoolLife: "Menyiapkan bahagian tugasan kumpulan." },
    ],
    lessons: [
      { value: "Bersatu lebih kuat", explanation: "Kekuatan datang daripada sokongan bersama.", realLife: "Jiran saling membantu ketika susah.", schoolLife: "Kelas bekerjasama menjaga kebersihan." },
      { value: "Jangan sombong", explanation: "Kelebihan perlu digunakan untuk membantu.", realLife: "Berkongsi ilmu dengan adik.", schoolLife: "Ajar rakan tanpa mengejek." },
      { value: "Jalankan peranan", explanation: "Setiap orang penting dalam komuniti.", realLife: "Bantu keluarga mengikut kemampuan.", schoolLife: "Pegang jawatan kelas dengan amanah." },
    ],
    teacherExplains: [
      "Bayangkan satu batang buluh sahaja. Mudah patah. Tetapi kalau serumpun, ia nampak lebih kuat. Itulah mesej syair ini.",
      "Pernah tak anda buat kerja kumpulan tetapi hanya seorang yang bekerja? Syair ini mengingatkan bahawa setiap orang mesti ada peranan.",
      "Buluh yang tunduk bukan lemah. Dalam KOMSAS, itu simbol rendah hati.",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: kerjasama masyarakat.", "Popular values: kerjasama, rendah hati, tanggungjawab.", "Common focus: maksud simbol buluh.", "Soalan lazim meminta pengajaran daripada alam."],
      commonQuestions: [
        q("Apakah tema syair ini?", "Tema syair ini ialah kerjasama dalam kehidupan bermasyarakat.", "Tema perlu kaitkan buluh dengan manusia.", "Sebut 'seperti serumpun buluh' sebagai huraian."),
        q("Apakah nilai yang digambarkan melalui buluh?", "Nilai kerjasama kerana buluh hidup berumpun dan saling menyokong.", "Bukti simbol membantu jawapan lebih kuat.", "Nilai + bukti ringkas sudah memadai."),
        q("Mengapakah buluh sesuai dijadikan teladan?", "Buluh sesuai kerana hidup berumpun, berguna dan melambangkan sikap rendah hati.", "Jawapan menyentuh ciri dan maksud tersirat.", "Elakkan menerangkan bentuk fizikal sahaja."),
      ],
    },
    revision: { theme: "Kerjasama dalam masyarakat.", values: "Kerjasama, rendah hati, tanggungjawab.", lessons: "Bersatu, jangan sombong, jalankan peranan.", examTips: "Buluh ialah simbol masyarakat, bukan sekadar tumbuhan." },
    miniQuiz: quiz("Apakah simbol utama syair ini?", "Nilai rendah hati dengan imej buluh tunduk.", "Bagaimanakah syair ini sesuai dengan kerja kumpulan di sekolah?"),
  },

  "sajak-kita-umpama": {
    id: "sajak-kita-umpama",
    title: "Kita Umpama Sehelai Daun",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "9 minit",
    difficulty: "Mudah",
    examFocus: "Simile + Pengajaran",
    intro: "Sajak ini membandingkan manusia dengan sehelai daun. Daun kecil, tetapi masih boleh memberi manfaat. Begitu juga manusia.",
    decoder: poemDecoder([
      ["Hidup sementara", "Manusia diumpamakan seperti daun yang akhirnya akan gugur. Hidup tidak kekal.", "Keinsafan.", "Kita perlu menggunakan masa hidup dengan baik."],
      ["Memberi manfaat", "Walaupun kecil, daun boleh memberi teduhan dan kebaikan. Manusia juga boleh berjasa.", "Kasih sayang.", "Kita hendaklah membantu orang lain walaupun dengan perkara kecil."],
      ["Tinggalkan jasa", "Apabila hidup berakhir, kebaikan yang dibuat akan dikenang.", "Tanggungjawab.", "Kita perlu menjadi insan yang bermanfaat."],
    ]),
    theme: { title: "Manusia perlu berbakti semasa hidup", explanation: "Tema sajak ini ialah kehidupan manusia yang sementara tetapi masih boleh diisi dengan jasa.", whyItMatters: "Murid belajar bahawa kebaikan kecil seperti membantu rakan juga bermakna." },
    values: [
      { value: "Keinsafan", explanation: "Sedar bahawa hidup perlu digunakan sebaik-baiknya.", realLife: "Tidak membuang masa dengan perkara merosakkan.", schoolLife: "Menggunakan waktu rehat dan belajar secara seimbang." },
      { value: "Kasih sayang", explanation: "Sedia memberi manfaat kepada orang lain.", realLife: "Membantu ahli keluarga.", schoolLife: "Menolong rakan yang tertinggal pelajaran." },
      { value: "Tanggungjawab", explanation: "Menjalankan peranan sebagai manusia.", realLife: "Menjaga alam sekitar.", schoolLife: "Menjaga kebersihan kelas." },
    ],
    lessons: [
      { value: "Berbuat baik walaupun kecil", explanation: "Kebaikan kecil tetap memberi kesan.", realLife: "Memberi kata semangat.", schoolLife: "Pinjamkan nota kepada rakan." },
      { value: "Hargai masa", explanation: "Hidup tidak kekal.", realLife: "Kurangkan perkara sia-sia.", schoolLife: "Buat ulang kaji awal." },
      { value: "Jadilah berguna", explanation: "Manusia dikenang melalui jasa.", realLife: "Bantu komuniti.", schoolLife: "Sertai aktiviti sekolah dengan niat baik." },
    ],
    teacherExplains: [
      "Pernah tak anda rasa diri kecil dan tidak penting? Sajak ini kata: walaupun kecil seperti daun, anda masih boleh memberi manfaat.",
      "Jangan baca daun sebagai daun sahaja. Daun ialah perbandingan kepada manusia.",
      "Jika soalan tanya pengajaran, fikir tentang tindakan: membantu, menghargai masa, berbuat jasa.",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: berbakti semasa hidup.", "Popular value: keinsafan dan kasih sayang.", "Common focus: maksud 'sehelai daun'.", "Pengajaran biasanya dikaitkan dengan jasa."],
      commonQuestions: [
        q("Apakah maksud manusia diumpamakan seperti daun?", "Manusia hidup sementara tetapi masih boleh memberi manfaat.", "Jawapan perlu terangkan perbandingan.", "Gunakan perkataan 'diumpamakan' atau 'melambangkan'."),
        q("Nyatakan satu pengajaran.", "Kita hendaklah berbuat baik kepada orang lain walaupun dengan bantuan kecil.", "Pengajaran perlu praktikal.", "Mulakan dengan 'Kita hendaklah'."),
        q("Mengapakah sajak ini penting kepada murid?", "Sajak ini mengajar murid supaya menghargai masa dan membantu orang lain.", "Soalan KBAT mahu kaitan dengan kehidupan.", "Beri contoh sekolah."),
      ],
    },
    revision: { theme: "Berbakti dalam hidup yang sementara.", values: "Keinsafan, kasih sayang, tanggungjawab.", lessons: "Hargai masa, bantu orang, tinggalkan jasa.", examTips: "Daun ialah simbol manusia." },
    miniQuiz: quiz("Apakah maksud sehelai daun?", "Nilai kasih sayang dengan contoh membantu rakan.", "Bagaimanakah murid boleh menjadi seperti daun yang bermanfaat?"),
  },

  "sajak-kuingin": {
    id: "sajak-kuingin",
    title: "Kuingin Berterima Kasih",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "8 minit",
    difficulty: "Mudah",
    examFocus: "Syukur + Penghargaan",
    intro: "Sajak ini seperti ucapan terima kasih yang lembut. Penyair mengajak kita menghargai nikmat, alam dan insan yang berjasa.",
    decoder: poemDecoder([
      ["Rasa syukur", "Penyair mahu berterima kasih atas nikmat yang diterima.", "Syukur.", "Kita hendaklah menghargai nikmat kehidupan."],
      ["Menghargai alam", "Alam memberi ketenangan dan manfaat kepada manusia.", "Menghargai alam.", "Kita perlu menjaga alam sekitar."],
      ["Mengenang jasa", "Penyair sedar hidupnya dibantu oleh orang lain.", "Mengenang jasa.", "Kita hendaklah membalas jasa dengan sikap baik."],
    ]),
    theme: { title: "Kesyukuran dan penghargaan", explanation: "Tema sajak ini ialah rasa syukur terhadap nikmat kehidupan dan jasa orang lain.", whyItMatters: "Murid yang bersyukur lebih mudah menghargai ibu bapa, guru dan peluang belajar." },
    values: [
      { value: "Syukur", explanation: "Menghargai nikmat yang dimiliki.", realLife: "Tidak merungut berlebihan.", schoolLife: "Bersyukur dapat belajar dan menggunakan kemudahan sekolah." },
      { value: "Mengenang jasa", explanation: "Tidak melupakan orang yang membantu.", realLife: "Menghormati ibu bapa.", schoolLife: "Mengucapkan terima kasih kepada guru." },
      { value: "Cinta alam", explanation: "Menghargai alam sebagai anugerah.", realLife: "Tidak membuang sampah merata-rata.", schoolLife: "Menjaga kawasan sekolah." },
    ],
    lessons: [
      { value: "Ucap terima kasih", explanation: "Penghargaan perlu ditunjukkan.", realLife: "Terima kasih selepas dibantu.", schoolLife: "Hargai rakan yang menolong tugasan." },
      { value: "Jaga nikmat", explanation: "Nikmat boleh hilang jika tidak dihargai.", realLife: "Jimat air dan elektrik.", schoolLife: "Gunakan buku teks dengan baik." },
      { value: "Balas jasa dengan kebaikan", explanation: "Jasa tidak semestinya dibalas dengan hadiah.", realLife: "Bantu ibu bapa.", schoolLife: "Belajar bersungguh-sungguh sebagai tanda menghargai guru." },
    ],
    teacherExplains: [
      "Pernah tak seseorang tolong anda, tetapi anda lupa ucap terima kasih? Sajak ini mengingatkan kita supaya tidak mengambil mudah kebaikan orang.",
      "Terima kasih dalam sajak ini luas. Bukan hanya kepada manusia, tetapi juga kepada nikmat kehidupan.",
      "Jika soalan tanya nilai, syukur ialah jawapan yang sangat kuat. Huraikan dengan contoh.",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: kesyukuran.", "Popular values: syukur, mengenang jasa, cinta alam.", "Common focus: maksud terima kasih dalam sajak.", "Soalan KBAT sering minta cara menghargai jasa."],
      commonQuestions: [
        q("Apakah tema sajak ini?", "Tema sajak ini ialah kesyukuran dan penghargaan terhadap nikmat serta jasa.", "Tema mesti luas, bukan sekadar 'terima kasih'.", "Tambah huraian tentang nikmat dan jasa."),
        q("Bagaimanakah murid boleh menunjukkan nilai syukur?", "Murid boleh belajar bersungguh-sungguh dan menjaga kemudahan sekolah.", "Jawapan perlu contoh nyata.", "Pilih contoh sekolah untuk KBAT."),
        q("Nyatakan satu pengajaran.", "Kita hendaklah mengenang jasa orang yang membantu kita.", "Pengajaran ialah tindakan.", "Mulakan dengan kata kerja seperti menghargai, menjaga, membalas."),
      ],
    },
    revision: { theme: "Kesyukuran dan penghargaan.", values: "Syukur, mengenang jasa, cinta alam.", lessons: "Ucap terima kasih, jaga nikmat, balas jasa.", examTips: "Jangan sempitkan maksud terima kasih kepada seorang individu sahaja." },
    miniQuiz: quiz("Apakah perasaan utama dalam sajak ini?", "Nilai syukur dengan contoh menjaga kemudahan.", "Mengapakah remaja perlu belajar berterima kasih?"),
  },

  "sajak-aku": {
    id: "sajak-aku",
    title: "Aku",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "10 minit",
    difficulty: "Sederhana",
    examFocus: "Nada + Jati Diri",
    intro: "Sajak ini bersuara tegas. Aku lirik mahu menjadi diri sendiri dan tidak mudah tunduk kepada cabaran.",
    decoder: poemDecoder([
      ["Jati diri", "Aku lirik menunjukkan pendirian yang kuat.", "Keberanian.", "Kita hendaklah berani mempertahankan perkara yang benar."],
      ["Cabaran hidup", "Aku lirik tidak mahu menyerah walaupun diuji.", "Ketabahan.", "Kita perlu tabah menghadapi masalah."],
      ["Semangat diri", "Aku lirik mahu terus melangkah dengan keyakinan.", "Yakin diri.", "Kita hendaklah percaya kepada kemampuan diri."],
    ]),
    theme: { title: "Keteguhan jiwa dan keberanian", explanation: "Tema sajak ini ialah semangat mempertahankan jati diri walaupun berdepan cabaran.", whyItMatters: "Remaja selalu berdepan tekanan rakan sebaya. Sajak ini mengingatkan murid supaya ada prinsip." },
    values: [
      { value: "Keberanian", explanation: "Berani mempertahankan perkara benar.", realLife: "Menolak ajakan buruk.", schoolLife: "Berani melapor buli kepada guru." },
      { value: "Ketabahan", explanation: "Tidak mudah mengalah apabila diuji.", realLife: "Bangkit selepas gagal.", schoolLife: "Cuba lagi selepas markah rendah." },
      { value: "Yakin diri", explanation: "Percaya pada potensi diri.", realLife: "Mencuba perkara baharu.", schoolLife: "Berani membentang di hadapan kelas." },
    ],
    lessons: [
      { value: "Pertahankan prinsip", explanation: "Jangan ikut orang jika perkara itu salah.", realLife: "Tolak tekanan negatif.", schoolLife: "Tidak meniru walaupun rakan mengajak." },
      { value: "Jangan cepat menyerah", explanation: "Cabaran boleh membina kekuatan.", realLife: "Terus berlatih.", schoolLife: "Minta bantuan guru jika tidak faham." },
      { value: "Kenali diri", explanation: "Jati diri membantu kita membuat pilihan.", realLife: "Tahu batas diri.", schoolLife: "Pilih rakan yang membawa pengaruh baik." },
    ],
    teacherExplains: [
      "Pernah tak anda rasa tertekan untuk ikut kawan? Sajak ini seperti suara yang berkata: saya tetap saya.",
      "Nada tegas dalam sajak ini bukan semestinya marah. Ia menunjukkan keberanian dan pendirian.",
      "Jika anda berada di tempat aku lirik, soalan penting ialah: adakah saya akan mengalah atau terus berjuang?",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: keteguhan jati diri.", "Popular values: berani, tabah, yakin diri.", "Common focus: nada tegas dan maksud aku lirik.", "Soalan lazim minta pengajaran kepada remaja."],
      commonQuestions: [
        q("Apakah tema sajak ini?", "Tema sajak ini ialah keteguhan jiwa dan keberanian mempertahankan prinsip.", "Tema perlu menyebut pendirian aku lirik.", "Gunakan kata 'jati diri'."),
        q("Apakah nilai yang sesuai?", "Nilai keberanian kerana aku lirik berani mempertahankan pendirian.", "Nilai perlu ada bukti ringkas.", "Jangan jawab 'marah' sebagai nilai."),
        q("Bagaimanakah sajak ini sesuai untuk remaja?", "Sajak ini mengajar remaja supaya tidak mudah terpengaruh dan yakin kepada diri.", "KBAT perlu kaitkan dengan remaja.", "Beri contoh tekanan rakan sebaya."),
      ],
    },
    revision: { theme: "Keteguhan jiwa dan jati diri.", values: "Keberanian, ketabahan, yakin diri.", lessons: "Pertahankan prinsip, jangan menyerah, kenali diri.", examTips: "Aku lirik ialah suara dalam sajak, bukan semestinya penulis secara literal." },
    miniQuiz: quiz("Apakah nada utama sajak ini?", "Nilai keberanian dengan contoh menolak ajakan negatif.", "Bagaimanakah murid boleh mempertahankan prinsip di sekolah?"),
  },

  "sajak-kunci-bahasa": {
    id: "sajak-kunci-bahasa",
    title: "Kunci Bahasa",
    typeLabel: "Puisi Moden",
    kind: "poem",
    studyTime: "9 minit",
    difficulty: "Mudah",
    examFocus: "Metafora + Bahasa",
    intro: "Sajak ini melihat bahasa sebagai kunci. Apabila kita menguasai bahasa, pintu ilmu, budaya dan identiti terbuka.",
    decoder: poemDecoder([
      ["Bahasa membuka ilmu", "Bahasa membantu manusia memahami pelajaran dan dunia.", "Cinta ilmu.", "Kita hendaklah menguasai bahasa untuk belajar dengan baik."],
      ["Bahasa sebagai identiti", "Bahasa melambangkan bangsa, budaya dan maruah.", "Patriotisme.", "Kita perlu bangga menggunakan bahasa kebangsaan."],
      ["Tanggungjawab menjaga bahasa", "Generasi muda perlu menggunakan bahasa dengan betul.", "Tanggungjawab.", "Kita hendaklah menjaga kesantunan bahasa."],
    ]),
    theme: { title: "Bahasa sebagai kunci ilmu dan jati diri", explanation: "Tema sajak ini ialah kepentingan bahasa dalam membina ilmu, budaya dan maruah bangsa.", whyItMatters: "Murid menggunakan bahasa dalam peperiksaan, komunikasi harian dan media sosial." },
    values: [
      { value: "Cinta bahasa", explanation: "Menghargai bahasa sebagai warisan.", realLife: "Menggunakan bahasa sopan.", schoolLife: "Menulis karangan dengan bahasa baku." },
      { value: "Patriotisme", explanation: "Bangga dengan bahasa kebangsaan.", realLife: "Menghormati bahasa negara.", schoolLife: "Aktif dalam aktiviti Bulan Bahasa." },
      { value: "Tanggungjawab", explanation: "Menjaga penggunaan bahasa.", realLife: "Tidak menggunakan kata kasar.", schoolLife: "Semak ejaan sebelum hantar tugasan." },
    ],
    lessons: [
      { value: "Kuasai bahasa", explanation: "Bahasa membantu kita menguasai ilmu.", realLife: "Membaca untuk tambah kosa kata.", schoolLife: "Bertanya maksud perkataan yang sukar." },
      { value: "Pelihara bahasa", explanation: "Bahasa boleh rosak jika digunakan cuai.", realLife: "Elakkan bahasa menghina.", schoolLife: "Gunakan bahasa sopan dengan guru." },
      { value: "Bangga akan identiti", explanation: "Bahasa ialah sebahagian jati diri.", realLife: "Menghormati budaya sendiri.", schoolLife: "Berucap dengan yakin dalam Bahasa Melayu." },
    ],
    teacherExplains: [
      "Bayangkan bahasa seperti kunci rumah. Tanpa kunci, kita susah masuk. Tanpa bahasa, kita susah memahami ilmu.",
      "Kunci dalam sajak ini bukan kunci sebenar. Itu metafora.",
      "Pernah tak anda faham topik selepas guru terangkan dengan bahasa yang jelas? Itulah kuasa bahasa.",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: kepentingan bahasa.", "Popular values: cinta bahasa, patriotisme, tanggungjawab.", "Common focus: maksud metafora kunci.", "Soalan lazim minta cara murid memartabatkan bahasa."],
      commonQuestions: [
        q("Apakah maksud kunci dalam sajak?", "Kunci melambangkan bahasa yang membuka jalan kepada ilmu dan jati diri.", "Ini soalan metafora.", "Jangan jawab kunci sebagai benda fizikal."),
        q("Nyatakan tema sajak.", "Tema sajak ialah kepentingan bahasa sebagai alat ilmu dan identiti bangsa.", "Tema perlu menyentuh ilmu dan bangsa.", "Gunakan perkataan 'bahasa'."),
        q("Bagaimanakah murid menjaga bahasa?", "Murid boleh menggunakan bahasa sopan, membaca dan menulis dengan ejaan yang betul.", "Jawapan praktikal lebih kuat.", "Beri sekurang-kurangnya dua tindakan."),
      ],
    },
    revision: { theme: "Bahasa sebagai kunci ilmu dan identiti.", values: "Cinta bahasa, patriotisme, tanggungjawab.", lessons: "Kuasai, pelihara dan bangga akan bahasa.", examTips: "Kunci ialah metafora." },
    miniQuiz: quiz("Apakah maksud metafora kunci?", "Nilai tanggungjawab dengan contoh menjaga ejaan.", "Bagaimanakah media sosial boleh digunakan untuk memartabatkan bahasa?"),
  },
};

const storyWorks: KomsasWork[] = [
  {
    id: "prosa-asal-padi",
    title: "Asal Padi",
    typeLabel: "Prosa Tradisional",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Sederhana",
    examFocus: "Plot + Pengorbanan",
    intro: "Kisah ini menerangkan asal usul padi melalui cerita pengorbanan. Fokus utamanya bukan fakta sains, tetapi nilai di sebalik makanan yang kita nikmati.",
    story60: "Cerita ini mengisahkan bagaimana padi menjadi makanan manusia melalui peristiwa besar dan pengorbanan. Watak tertentu sanggup berkorban demi kebaikan orang ramai. Akhirnya manusia memperoleh padi sebagai rezeki, lalu pembaca diajak menghargai makanan dan tidak membazir.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Padi bukan sekadar makanan. Dalam cerita ini, padi datang bersama kisah jasa dan pengorbanan.", "Syukur.", "Kita hendaklah menghargai rezeki."],
      ["Mesej utama", "Sesuatu yang kita nikmati hari ini mungkin wujud kerana pengorbanan orang lain.", "Pengorbanan.", "Kita perlu menghargai jasa orang lain."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Manusia memerlukan sumber makanan dan kehidupan yang lebih baik." },
      { stage: "Perkembangan", text: "Padi dikaitkan dengan dunia istimewa dan tidak diperoleh dengan mudah." },
      { stage: "Konflik", text: "Watak berdepan pilihan antara kepentingan diri dengan kebaikan ramai." },
      { stage: "Klimaks", text: "Pengorbanan berlaku sehingga padi sampai kepada manusia." },
      { stage: "Peleraian", text: "Manusia memperoleh padi dan perlu menghargainya sebagai rezeki." },
    ],
    characters: [
      { name: "Tokoh yang berkorban", personality: "Penyayang, berani dan rela berkorban.", evidence: "Sanggup menanggung kesan demi manfaat manusia.", importance: "Menjelaskan nilai pengorbanan dalam cerita." },
      { name: "Manusia", personality: "Memerlukan bantuan dan perlu bersyukur.", evidence: "Menerima manfaat daripada kewujudan padi.", importance: "Mewakili pembaca yang menikmati rezeki." },
      { name: "Pihak kayangan/penjaga asal", personality: "Tegas dan menjaga aturan.", evidence: "Padi tidak diperoleh secara mudah.", importance: "Mewujudkan konflik dalam cerita asal usul." },
    ],
    events: [
      { event: "Padi diperoleh melalui pengorbanan", whatHappened: "Watak berkorban supaya manusia mendapat padi.", whyItMatters: "Inilah pusat emosi cerita.", examFocus: "Soalan nilai pengorbanan dan pengajaran sering keluar." },
      { event: "Manusia menerima padi", whatHappened: "Padi menjadi sumber makanan.", whyItMatters: "Menunjukkan rezeki perlu dihargai.", examFocus: "Soalan tema dan pengajaran." },
    ],
    theme: { title: "Pengorbanan demi kesejahteraan manusia", explanation: "Tema karya ialah kesanggupan berkorban untuk memberi manfaat kepada orang lain.", whyItMatters: "Murid belajar menghargai makanan, ibu bapa dan orang yang berjasa." },
    values: [
      { value: "Pengorbanan", explanation: "Sanggup kehilangan sesuatu demi kebaikan.", realLife: "Ibu bapa bekerja untuk keluarga.", schoolLife: "Rakan berkongsi masa membantu kita belajar." },
      { value: "Syukur", explanation: "Menghargai rezeki yang ada.", realLife: "Tidak membazir makanan.", schoolLife: "Habiskan makanan kantin yang dibeli." },
      { value: "Kasih sayang", explanation: "Mahu orang lain hidup lebih baik.", realLife: "Membantu keluarga.", schoolLife: "Menolong rakan tanpa meminta balasan." },
    ],
    lessons: [
      { value: "Hargai rezeki", explanation: "Makanan tidak patut dibazirkan.", realLife: "Ambil makanan secukupnya.", schoolLife: "Tidak membuang makanan di kantin." },
      { value: "Kenang jasa", explanation: "Jasa orang lain membentuk kehidupan kita.", realLife: "Menghormati ibu bapa.", schoolLife: "Menghargai guru." },
      { value: "Berkorban untuk kebaikan", explanation: "Kebaikan besar memerlukan usaha.", realLife: "Luangkan masa membantu orang.", schoolLife: "Membantu kumpulan walaupun sibuk." },
    ],
    teacherExplains: ["Bayangkan nasi yang anda makan setiap hari ada kisah pengorbanan di belakangnya. Itulah cara prosa tradisional mengajar nilai.", "Jangan baca cerita ini sebagai fakta sains. Baca sebagai cerita asal usul yang membawa pengajaran.", "Jika anda berada di tempat watak yang berkorban, sanggupkah anda memilih kebaikan orang ramai?"],
    examBooster: {
      frequentPoints: ["Popular theme: pengorbanan.", "Popular values: pengorbanan, syukur, kasih sayang.", "Common focus: plot asal usul padi.", "Soalan lazim minta pengajaran tidak membazir."],
      commonQuestions: [
        q("Apakah tema Asal Padi?", "Tema karya ialah pengorbanan demi kesejahteraan manusia.", "Tema mesti menyentuh pengorbanan dan manfaat.", "Jangan jawab 'padi' sahaja."),
        q("Nyatakan nilai berdasarkan cerita.", "Nilai pengorbanan kerana watak sanggup berkorban demi manusia.", "Nilai perlu disokong peristiwa.", "Gunakan perkataan 'kerana'."),
        q("Apakah pengajaran kepada murid?", "Kita hendaklah menghargai makanan dan tidak membazir.", "Pengajaran perlu dekat dengan kehidupan.", "Kaitkan dengan kantin atau rumah."),
      ],
    },
    revision: { theme: "Pengorbanan demi manusia.", values: "Pengorbanan, syukur, kasih sayang.", lessons: "Hargai rezeki, kenang jasa, jangan membazir.", examTips: "Prosa tradisional menekankan nilai, bukan fakta literal." },
    miniQuiz: quiz("Apakah tema utama Asal Padi?", "Watak yang berkorban dengan nilai pengorbanan.", "Mengapakah murid tidak patut membazir makanan?"),
  },
  {
    id: "cerpen-oren",
    title: "Oren",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Mudah",
    examFocus: "Watak + Kasih Sayang",
    intro: "Cerpen ini kelihatan seperti cerita haiwan peliharaan, tetapi sebenarnya mengajar kita tentang kasih sayang, perhatian dan penyesalan.",
    story60: "Oren ialah haiwan peliharaan yang pernah disayangi. Apabila perhatian keluarga berubah, Oren terasa terabai. Peristiwa sedih membuat keluarga sedar bahawa kasih sayang tidak boleh ditangguhkan. Cerpen ini mengingatkan kita supaya menghargai makhluk yang bergantung kepada kita sebelum terlambat.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Oren mewakili makhluk kecil yang perlukan perhatian dan kasih sayang.", "Kasih sayang.", "Kita hendaklah menyayangi haiwan peliharaan."],
      ["Mesej utama", "Pengabaian boleh menyebabkan penyesalan.", "Prihatin.", "Kita perlu peka terhadap makhluk di sekeliling."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Oren menjadi sebahagian daripada keluarga." },
      { stage: "Perkembangan", text: "Perhatian keluarga berubah apabila keadaan baharu muncul." },
      { stage: "Konflik", text: "Oren semakin terabai dan kurang diberi perhatian." },
      { stage: "Klimaks", text: "Peristiwa sedih berlaku dan keluarga tersentak." },
      { stage: "Peleraian", text: "Keluarga menyesal dan pembaca memahami pentingnya kasih sayang." },
    ],
    characters: [
      { name: "Oren", personality: "Setia, manja dan memerlukan perhatian.", evidence: "Oren mencari tempat dalam keluarga.", importance: "Simbol makhluk yang tidak patut diabaikan." },
      { name: "Ayah", personality: "Penyayang tetapi akhirnya menyesal.", evidence: "Ayah menunjukkan emosi terhadap nasib Oren.", importance: "Menonjolkan kasih sayang manusia terhadap haiwan." },
      { name: "Kelabu", personality: "Menarik perhatian dan mencetus perubahan.", evidence: "Kehadirannya mengubah tumpuan keluarga.", importance: "Membantu membina konflik cerita." },
    ],
    events: [
      { event: "Perhatian terhadap Oren berkurang", whatHappened: "Oren tidak lagi mendapat tumpuan seperti dahulu.", whyItMatters: "Menunjukkan punca konflik emosi.", examFocus: "Soalan watak dan persoalan pengabaian." },
      { event: "Keluarga menyesal", whatHappened: "Peristiwa sedih menyedarkan keluarga.", whyItMatters: "Menegaskan pengajaran cerita.", examFocus: "Soalan nilai kasih sayang dan prihatin." },
    ],
    theme: { title: "Kasih sayang terhadap haiwan", explanation: "Tema cerpen ialah tanggungjawab dan kasih sayang terhadap haiwan peliharaan.", whyItMatters: "Remaja perlu sedar bahawa haiwan dan orang di sekeliling juga memerlukan perhatian." },
    values: [
      { value: "Kasih sayang", explanation: "Menyayangi makhluk lain dengan tindakan.", realLife: "Memberi makan haiwan peliharaan.", schoolLife: "Tidak menyakiti haiwan di kawasan sekolah." },
      { value: "Prihatin", explanation: "Peka terhadap perubahan dan keperluan.", realLife: "Perasan jika ahli keluarga sedih.", schoolLife: "Tanya rakan yang murung." },
      { value: "Tanggungjawab", explanation: "Menjaga sesuatu yang berada bawah jagaan kita.", realLife: "Membersihkan tempat haiwan.", schoolLife: "Menjaga amanah kelas." },
    ],
    lessons: [
      { value: "Sayangi sebelum terlambat", explanation: "Kasih sayang perlu ditunjukkan, bukan disimpan.", realLife: "Luangkan masa dengan keluarga.", schoolLife: "Hargai rakan yang selalu membantu." },
      { value: "Jangan abaikan tanggungjawab", explanation: "Pengabaian membawa kesan.", realLife: "Jaga haiwan peliharaan dengan konsisten.", schoolLife: "Selesaikan tugas yang diberi." },
      { value: "Peka kepada perasaan", explanation: "Makhluk lain juga boleh terkesan.", realLife: "Tidak kasar terhadap haiwan.", schoolLife: "Tidak meminggirkan rakan." },
    ],
    teacherExplains: ["Pernah tak anda terlalu suka benda baharu sampai lupa yang lama? Itulah rasa yang cerpen ini mahu kita fikirkan.", "Oren bukan sekadar kucing. Oren ialah simbol makhluk yang terasa dilupakan.", "Jika anda berada di tempat keluarga itu, apa yang patut dibuat sebelum menyesal?"],
    examBooster: {
      frequentPoints: ["Popular theme: kasih sayang terhadap haiwan.", "Popular values: kasih sayang, prihatin, tanggungjawab.", "Common focus: watak Oren dan perasaan ayah.", "Soalan lazim minta pengajaran daripada penyesalan."],
      commonQuestions: [
        q("Apakah tema cerpen Oren?", "Tema cerpen ini ialah kasih sayang dan tanggungjawab terhadap haiwan peliharaan.", "Tema perlu menyebut haiwan dan tanggungjawab.", "Jangan jawab 'cerita kucing' sahaja."),
        q("Mengapakah Oren penting?", "Oren penting kerana menjadi simbol makhluk yang perlu disayangi dan tidak diabaikan.", "Watak haiwan juga boleh membawa mesej.", "Gunakan perkataan 'simbol'."),
        q("Nyatakan pengajaran.", "Kita hendaklah menyayangi haiwan peliharaan dan tidak mengabaikannya.", "Pengajaran perlu jelas dan praktikal.", "Mulakan dengan 'Kita hendaklah'."),
      ],
    },
    revision: { theme: "Kasih sayang terhadap haiwan.", values: "Kasih sayang, prihatin, tanggungjawab.", lessons: "Sayangi, jangan abaikan, peka.", examTips: "Oren ialah simbol pengabaian dan penyesalan." },
    miniQuiz: quiz("Apakah tema cerpen Oren?", "Oren dengan simbol kasih sayang.", "Bagaimanakah murid menunjukkan tanggungjawab terhadap haiwan?"),
  },
  {
    id: "cerpen-hadiah",
    title: "Hadiah",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "15 minit",
    difficulty: "Sederhana",
    examFocus: "Azizah + Hari Guru + Tudung Saji",
    intro: "Cerpen ini mengisahkan Azizah, murid daripada keluarga miskin yang mahu menghadiahkan sesuatu kepada Cikgu Zaleha pada Hari Guru. Hadiahnya bukan mahal, tetapi penuh usaha, kreativiti dan kasih sayang.",
    story60: "Azizah mahu memberi hadiah Hari Guru kepada Cikgu Zaleha, tetapi keluarganya miskin dan wang tabungnya tidak cukup. Ibu mencadangkan hadiah buatan tangan, lalu Azizah menghasilkan tudung saji dengan tekun. Hadiah itu membuka jalan kepada pertandingan kraftangan. Apabila Azizah berjaya, kejayaan itulah hadiah sebenar kepada gurunya.",
    story90:
      "Bayangkan Azizah sebagai seorang murid yang sangat menghargai gurunya, Cikgu Zaleha. Azizah bukan anak orang senang. Keluarganya hidup sederhana dan wang bukan sesuatu yang mudah diperoleh. Apabila Hari Guru semakin hampir, rakan-rakan Azizah mula bercakap tentang hadiah yang mahu mereka bawa. Ada yang mampu membeli hadiah cantik dan mahal. Azizah pula hanya mampu memandang dan berasa sedih kerana tabung kecilnya tidak mencukupi. Dia mahu memberi sesuatu kepada Cikgu Zaleha, tetapi dia tidak mahu membebankan keluarganya. Di sinilah ibu Azizah memainkan peranan penting. Ibu tidak terus menyuruh Azizah membeli hadiah. Sebaliknya, ibu mencadangkan hadiah buatan tangan, sesuatu yang lahir daripada usaha sendiri. Cadangan itu membuka fikiran Azizah. Dia mula menghasilkan tudung saji dengan penuh kesungguhan. Walaupun hadiah itu bukan barang mahal dari kedai, tudung saji itu mempunyai nilai yang besar kerana dibuat dengan tangan, masa dan hati. Pada Hari Guru, Azizah memberikan tudung saji itu kepada Cikgu Zaleha. Cikgu Zaleha tidak memandang rendah hadiah tersebut. Sebaliknya, beliau melihat bakat dan kesungguhan Azizah. Guru itu menggalakkan Azizah menyertai pertandingan kraftangan. Azizah yang pada mulanya rendah diri akhirnya memberanikan diri. Hasil usaha dan kreativiti, Azizah berjaya menjadi juara. Di sinilah maksud sebenar tajuk Hadiah menjadi jelas. Hadiah sebenar kepada Cikgu Zaleha bukan sekadar tudung saji, tetapi kejayaan Azizah membuktikan bakat dirinya. Cerpen ini mengajar kita bahawa kemiskinan bukan penghalang, guru boleh membuka jalan, dan hadiah paling bermakna ialah usaha yang ikhlas.",
    decoder: poemDecoder([
      ["Azizah dan Hari Guru", "Azizah mahu memberi hadiah kepada Cikgu Zaleha kerana menghargai jasa gurunya.", "Menghormati guru.", "Kita hendaklah menghargai guru yang membimbing kita."],
      ["Masalah wang", "Azizah sedih kerana keluarganya miskin dan wang tabungnya tidak cukup untuk membeli hadiah.", "Bersyukur.", "Kita tidak patut berputus asa hanya kerana kekurangan wang."],
      ["Cadangan ibu", "Ibu mencadangkan hadiah buatan tangan supaya Azizah tetap boleh memberi sesuatu yang bermakna.", "Kreatif.", "Kita hendaklah mencari jalan penyelesaian dengan bijak."],
      ["Tudung saji", "Azizah menghasilkan tudung saji dengan tekun sebagai hadiah Hari Guru.", "Rajin.", "Kita hendaklah berusaha bersungguh-sungguh walaupun hasilnya sederhana."],
      ["Pertandingan kraftangan", "Cikgu Zaleha melihat bakat Azizah dan menggalakkannya menyertai pertandingan.", "Gigih.", "Kita perlu berani mengasah bakat apabila diberi peluang."],
      ["Hadiah sebenar", "Kejayaan Azizah menjadi hadiah paling bermakna kepada Cikgu Zaleha.", "Menghargai jasa.", "Kita hendaklah membalas jasa guru dengan kejayaan dan usaha."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Azizah daripada keluarga miskin mahu menyediakan hadiah sempena Hari Guru." },
      { stage: "Perkembangan", text: "Rakan-rakan bercakap tentang hadiah, menyebabkan Azizah sedar wangnya tidak mencukupi." },
      { stage: "Konflik", text: "Azizah mahu menghargai Cikgu Zaleha tetapi tidak mampu membeli hadiah mahal." },
      { stage: "Klimaks", text: "Azizah menghasilkan dan memberikan tudung saji buatan tangan kepada Cikgu Zaleha." },
      { stage: "Peleraian", text: "Cikgu Zaleha menggalakkan Azizah menyertai pertandingan kraftangan dan kejayaan Azizah menjadi hadiah sebenar." },
    ],
    characters: [
      { name: "Azizah", personality: "Rajin, kreatif, rendah diri, menghargai guru dan tidak mudah berputus asa.", evidence: "Berusaha menghasilkan tudung saji walaupun keluarganya miskin.", importance: "Menyampaikan tema kegigihan dan penghargaan terhadap guru." },
      { name: "Cikgu Zaleha", personality: "Prihatin, menghargai bakat murid dan memberi motivasi.", evidence: "Menggalakkan Azizah menyertai pertandingan kraftangan.", importance: "Menunjukkan peranan guru dalam membina potensi murid." },
      { name: "Ibu Azizah", personality: "Bijaksana, menyokong dan kreatif.", evidence: "Mencadangkan Azizah menghasilkan hadiah buatan tangan.", importance: "Menjadi pendorong utama yang membuka jalan penyelesaian." },
      { name: "Ayah Azizah", personality: "Penyayang dan bertanggungjawab.", evidence: "Memberi sokongan moral kepada Azizah mengikut kemampuan keluarga.", importance: "Melengkapkan gambaran keluarga miskin yang tetap menyayangi anak." },
    ],
    events: [
      { event: "Hari Guru semakin hampir", whatHappened: "Azizah ingin memberi hadiah kepada Cikgu Zaleha.", whyItMatters: "Membuka konflik utama cerita.", examFocus: "Soalan latar masa dan permulaan cerita." },
      { event: "Rakan-rakan berbual tentang hadiah", whatHappened: "Azizah mendengar rakan merancang hadiah yang lebih mahal.", whyItMatters: "Menunjukkan perbezaan kemampuan Azizah.", examFocus: "Soalan konflik dan perasaan watak." },
      { event: "Tabung Azizah tidak mencukupi", whatHappened: "Azizah tidak mempunyai wang yang cukup untuk membeli hadiah.", whyItMatters: "Menonjolkan persoalan kemiskinan.", examFocus: "Soalan persoalan dan nilai bersyukur." },
      { event: "Ibu memberi cadangan", whatHappened: "Ibu mencadangkan hadiah buatan tangan.", whyItMatters: "Menjadi titik perubahan cerita.", examFocus: "Soalan peranan ibu Azizah." },
      { event: "Azizah membuat tudung saji", whatHappened: "Azizah menghasilkan hadiah dengan kreativiti dan usaha sendiri.", whyItMatters: "Membuktikan Azizah rajin dan kreatif.", examFocus: "Soalan perwatakan Azizah." },
      { event: "Tudung saji diberikan kepada Cikgu Zaleha", whatHappened: "Azizah menghadiahkan hasil tangannya pada Hari Guru.", whyItMatters: "Menunjukkan penghargaan tulus kepada guru.", examFocus: "Soalan tema dan pengajaran." },
      { event: "Cikgu Zaleha melihat bakat Azizah", whatHappened: "Guru itu menggalakkan Azizah mengembangkan bakat kraftangan.", whyItMatters: "Menunjukkan peranan guru sebagai pembimbing.", examFocus: "Soalan watak Cikgu Zaleha." },
      { event: "Azizah berjaya dalam pertandingan", whatHappened: "Azizah menyertai pertandingan kraftangan dan menjadi juara.", whyItMatters: "Kejayaan ini menjadi hadiah sebenar kepada guru.", examFocus: "Soalan klimaks, peleraian dan KBAT." },
    ],
    theme: {
      title: "Penghargaan terhadap guru dan kegigihan mencapai kejayaan",
      explanation: "Tema cerpen ini ialah usaha seorang murid miskin yang mahu menghargai gurunya dengan cara yang ikhlas. Azizah tidak mampu membeli hadiah mahal, tetapi dia menggunakan kreativiti dan kegigihan untuk menghasilkan tudung saji. Akhirnya, kejayaannya dalam pertandingan kraftangan menjadi hadiah yang lebih bermakna kepada Cikgu Zaleha.",
      whyItMatters: "Murid perlu sedar bahawa menghargai guru tidak semestinya melalui barang mahal. Usaha, kejayaan dan sikap tidak berputus asa juga boleh menjadi tanda terima kasih yang sangat besar.",
    },
    values: [
      { value: "Rajin", explanation: "Sanggup berusaha untuk menghasilkan sesuatu dengan baik.", realLife: "Menyiapkan kerja rumah tanpa disuruh berkali-kali.", schoolLife: "Azizah rajin membuat tudung saji sebagai hadiah Hari Guru." },
      { value: "Gigih", explanation: "Tidak mudah berputus asa walaupun menghadapi masalah.", realLife: "Terus berlatih walaupun gagal pada percubaan pertama.", schoolLife: "Azizah tetap mencari cara memberi hadiah walaupun tabungnya tidak cukup." },
      { value: "Bersyukur", explanation: "Menerima keadaan diri sambil tetap berusaha.", realLife: "Tidak merungut jika keluarga tidak mampu membeli barang mahal.", schoolLife: "Azizah tidak menyalahkan keluarganya kerana miskin." },
      { value: "Menghormati guru", explanation: "Menghargai jasa dan bimbingan guru.", realLife: "Bercakap sopan dan mendengar nasihat guru.", schoolLife: "Azizah mahu memberi hadiah kepada Cikgu Zaleha pada Hari Guru." },
      { value: "Kreatif", explanation: "Mampu menghasilkan idea atau barang dengan cara sendiri.", realLife: "Membuat kad ucapan sendiri daripada bahan terpakai.", schoolLife: "Azizah menghasilkan tudung saji buatan tangan." },
      { value: "Bertanggungjawab", explanation: "Melaksanakan usaha dengan serius dan tidak sambil lewa.", realLife: "Menyiapkan tugasan kumpulan mengikut peranan.", schoolLife: "Azizah bersungguh-sungguh menyertai pertandingan kraftangan." },
    ],
    lessons: [
      { value: "Kita hendaklah menghargai jasa guru", explanation: "Guru banyak membimbing murid sehingga potensi mereka berkembang.", realLife: "Ucap terima kasih dan belajar bersungguh-sungguh.", schoolLife: "Azizah menghargai Cikgu Zaleha melalui hadiah dan kejayaannya." },
      { value: "Kita hendaklah gigih menghadapi kesusahan", explanation: "Kemiskinan tidak sepatutnya menjadi alasan untuk menyerah kalah.", realLife: "Cari cara lain jika tidak mampu membeli sesuatu.", schoolLife: "Azizah tetap berusaha walaupun wang tabungnya tidak cukup." },
      { value: "Kita hendaklah menggunakan kreativiti untuk menyelesaikan masalah", explanation: "Idea yang baik boleh menggantikan kekurangan wang.", realLife: "Membuat hadiah sendiri dengan bahan yang ada.", schoolLife: "Azizah menghasilkan tudung saji buatan tangan." },
      { value: "Kita hendaklah menyokong bakat orang lain", explanation: "Dorongan boleh membuat seseorang lebih yakin.", realLife: "Galakkan rakan menyertai pertandingan jika dia berbakat.", schoolLife: "Cikgu Zaleha menggalakkan Azizah menyertai pertandingan kraftangan." },
      { value: "Kita hendaklah menghormati ibu bapa", explanation: "Nasihat ibu bapa boleh membantu kita membuat keputusan baik.", realLife: "Mendengar cadangan keluarga sebelum bertindak.", schoolLife: "Azizah menerima cadangan ibunya untuk membuat hadiah sendiri." },
      { value: "Kita hendaklah rendah diri walaupun berjaya", explanation: "Kejayaan perlu disertai sikap menghargai orang yang membantu.", realLife: "Tidak menunjuk-nunjuk selepas menang pertandingan.", schoolLife: "Kejayaan Azizah menjadi tanda terima kasih kepada Cikgu Zaleha." },
    ],
    teacherExplains: [
      "Bayangkan anda mahu beri hadiah Hari Guru, tetapi duit tabung tidak cukup. Itulah situasi Azizah. Cerpen ini mahu kita rasa bahawa kekurangan wang bukan bermaksud kita tiada nilai.",
      "Tudung saji dalam cerita ini bukan sekadar barang. Ia lambang usaha, kreativiti dan kasih sayang Azizah terhadap gurunya.",
      "Cikgu Zaleha penting kerana beliau tidak melihat hadiah itu sebagai barang murah. Beliau melihat bakat Azizah di sebaliknya.",
      "Hadiah sebenar dalam cerpen ini ialah kejayaan Azizah. Itulah cara paling indah untuk membalas jasa guru.",
    ],
    examBooster: {
      frequentPoints: [
        "Popular theme: penghargaan terhadap guru dan kegigihan.",
        "Popular values: rajin, gigih, kreatif, menghormati guru.",
        "Common focus: perwatakan Azizah dan Cikgu Zaleha.",
        "Soalan lazim: maksud hadiah sebenar kepada Cikgu Zaleha.",
        "Peristiwa penting: cadangan ibu, tudung saji, pertandingan kraftangan.",
      ],
      commonQuestions: [
        q("Apakah tema cerpen Hadiah?", "Tema cerpen ini ialah penghargaan terhadap guru dan kegigihan mencapai kejayaan.", "Tema perlu menyebut guru dan usaha Azizah.", "Jangan jawab 'tema hadiah' sahaja."),
        q("Nyatakan perwatakan Azizah.", "Azizah seorang yang kreatif kerana menghasilkan tudung saji sebagai hadiah Hari Guru.", "Perwatakan mesti disertai bukti.", "Watak + sifat + bukti = jawapan lengkap."),
        q("Apakah hadiah sebenar kepada Cikgu Zaleha?", "Hadiah sebenar kepada Cikgu Zaleha ialah kejayaan Azizah dalam pertandingan kraftangan.", "Soalan ini menguji maksud tersirat tajuk.", "Jelaskan bahawa tudung saji ialah hadiah awal, kejayaan ialah hadiah paling bermakna."),
      ],
    },
    issues: [
      { issue: "Kemiskinan bukan penghalang kejayaan", explanation: "Azizah miskin, tetapi kemiskinan tidak menghalangnya menghasilkan hadiah dan mencapai kejayaan dalam pertandingan." },
      { issue: "Kepentingan menghargai guru", explanation: "Azizah mahu memberi hadiah kerana sedar Cikgu Zaleha banyak berjasa dalam hidupnya." },
      { issue: "Sokongan keluarga", explanation: "Ibu memberi cadangan dan keluarga memberi sokongan moral supaya Azizah tidak berputus asa." },
      { issue: "Bakat perlu digilap", explanation: "Cikgu Zaleha melihat bakat Azizah dan menggalakkannya menyertai pertandingan kraftangan." },
      { issue: "Kreativiti membawa kejayaan", explanation: "Tudung saji buatan tangan membuktikan kreativiti Azizah dan membuka jalan kepada kejayaan." },
    ],
    revision: {
      theme: "Penghargaan terhadap guru dan kegigihan mencapai kejayaan.",
      values: "Rajin, gigih, bersyukur, menghormati guru, kreatif, bertanggungjawab.",
      lessons: "Hargai guru, jangan putus asa, guna kreativiti, sokong bakat, dengar nasihat ibu bapa.",
      examTips: "Ingat: tudung saji ialah hadiah awal; kejayaan Azizah ialah hadiah sebenar kepada Cikgu Zaleha.",
    },
    miniQuiz: quiz("Apakah hadiah sebenar kepada Cikgu Zaleha?", "Azizah dengan nilai kreatif.", "Mengapakah kemiskinan bukan penghalang kejayaan Azizah?"),
    detailedPlot: [
      { stage: "Permulaan", what: "Azizah berasal daripada keluarga miskin dan Hari Guru semakin hampir.", why: "Keadaan ini memperkenalkan sebab Azizah mahu menyediakan hadiah tetapi mempunyai kekangan.", effect: "Pembaca mula memahami konflik emosi Azizah." },
      { stage: "Perkembangan", what: "Rakan-rakan bercakap tentang hadiah mahal untuk guru.", why: "Perbualan itu membuat Azizah membandingkan kemampuan dirinya.", effect: "Azizah berasa sedih kerana tidak mampu membeli hadiah seperti orang lain." },
      { stage: "Konflik", what: "Wang tabung Azizah tidak cukup untuk membeli hadiah.", why: "Keluarganya miskin dan Azizah tidak mahu membebankan ibu bapanya.", effect: "Cerita menonjolkan persoalan kemiskinan dan kegigihan." },
      { stage: "Titik Perubahan", what: "Ibu mencadangkan hadiah buatan tangan.", why: "Cadangan ibu memberi penyelesaian kreatif kepada masalah Azizah.", effect: "Azizah mula melihat bahawa hadiah bermakna tidak semestinya mahal." },
      { stage: "Klimaks", what: "Azizah menghasilkan dan memberikan tudung saji kepada Cikgu Zaleha.", why: "Azizah mahu membalas jasa guru dengan hasil usaha sendiri.", effect: "Tudung saji membuktikan Azizah rajin, kreatif dan menghargai guru." },
      { stage: "Peleraian", what: "Azizah menyertai pertandingan kraftangan, menjadi juara dan kejayaannya menjadi hadiah sebenar kepada Cikgu Zaleha.", why: "Guru melihat potensi muridnya dan memberi motivasi.", effect: "Pembaca faham bahawa kejayaan murid ialah hadiah paling bermakna kepada guru." },
    ],
    masterCharacters: [
      { name: "Azizah", role: "Watak utama.", traits: ["Rajin", "Kreatif", "Rendah diri", "Menghargai guru", "Tidak mudah berputus asa"], evidence: "Berusaha menghasilkan tudung saji walaupun miskin dan wang tabungnya tidak cukup.", relationships: "Menyayangi ibu bapa dan sangat menghargai Cikgu Zaleha.", importance: "Menyampaikan tema kegigihan dan penghargaan terhadap guru." },
      { name: "Cikgu Zaleha", role: "Guru yang membimbing Azizah.", traits: ["Prihatin", "Menghargai bakat murid", "Memberi motivasi"], evidence: "Menggalakkan Azizah menyertai pertandingan kraftangan.", relationships: "Menjadi guru yang dipercayai dan dihormati oleh Azizah.", importance: "Menunjukkan peranan guru dalam membina potensi murid." },
      { name: "Ibu Azizah", role: "Pendorong utama Azizah.", traits: ["Bijaksana", "Penyokong", "Kreatif"], evidence: "Mencadangkan Azizah menghasilkan hadiah buatan tangan.", relationships: "Memberi sokongan dan idea kepada Azizah ketika Azizah sedih.", importance: "Menjadi titik perubahan yang membantu Azizah menyelesaikan masalah." },
      { name: "Ayah Azizah", role: "Memberi sokongan moral.", traits: ["Penyayang", "Bertanggungjawab"], evidence: "Menyokong Azizah mengikut kemampuan keluarga.", relationships: "Melengkapkan sokongan keluarga kepada Azizah.", importance: "Menunjukkan bahawa keluarga miskin tetap kaya dengan kasih sayang." },
    ],
    relationshipMap: [
      { from: "Azizah", relation: "menghargai", to: "Cikgu Zaleha", explanation: "Azizah mahu memberi hadiah Hari Guru kerana menghargai jasa Cikgu Zaleha." },
      { from: "Azizah", relation: "disokong oleh", to: "Ibu", explanation: "Ibu memberi idea hadiah buatan tangan apabila Azizah tidak mampu membeli hadiah." },
      { from: "Azizah", relation: "disayangi oleh", to: "Ayah", explanation: "Ayah memberi sokongan moral walaupun keluarga mereka hidup susah." },
      { from: "Cikgu Zaleha", relation: "membimbing", to: "Azizah", explanation: "Cikgu Zaleha membantu Azizah menemui potensi diri melalui pertandingan kraftangan." },
    ],
    importantEvents: [
      { event: "Hari Guru semakin hampir", what: "Azizah mula memikirkan hadiah untuk Cikgu Zaleha.", whyImportant: "Memulakan konflik utama cerita.", possibleQuestion: "Apakah latar masa penting dalam cerpen Hadiah?" },
      { event: "Rakan-rakan bercakap tentang hadiah mahal", what: "Azizah mendengar rakan merancang hadiah untuk guru.", whyImportant: "Membuat Azizah sedar kekurangan dirinya.", possibleQuestion: "Mengapakah Azizah berasa sedih?" },
      { event: "Tabung Azizah tidak cukup", what: "Wang simpanan Azizah tidak mampu membeli hadiah.", whyImportant: "Menonjolkan kemiskinan sebagai cabaran.", possibleQuestion: "Nyatakan satu persoalan dalam cerpen." },
      { event: "Ibu memberi cadangan", what: "Ibu mencadangkan Azizah membuat hadiah sendiri.", whyImportant: "Menjadi titik perubahan cerita.", possibleQuestion: "Apakah peranan ibu Azizah?" },
      { event: "Azizah menghasilkan tudung saji", what: "Azizah membuat tudung saji dengan tekun.", whyImportant: "Membuktikan perwatakan rajin dan kreatif.", possibleQuestion: "Berikan bukti Azizah seorang yang kreatif." },
      { event: "Azizah memberi hadiah kepada Cikgu Zaleha", what: "Tudung saji diberikan sempena Hari Guru.", whyImportant: "Menunjukkan penghargaan terhadap guru.", possibleQuestion: "Apakah pengajaran daripada peristiwa ini?" },
      { event: "Cikgu Zaleha mencungkil bakat Azizah", what: "Guru menggalakkan Azizah menyertai pertandingan kraftangan.", whyImportant: "Menunjukkan guru sebagai pembimbing.", possibleQuestion: "Huraikan perwatakan Cikgu Zaleha." },
      { event: "Azizah menjadi juara", what: "Azizah berjaya dalam pertandingan kraftangan.", whyImportant: "Kejayaan ini menjadi hadiah sebenar kepada guru.", possibleQuestion: "Apakah maksud hadiah sebenar dalam cerpen ini?" },
    ],
    keyCharacterFocus: {
      name: "Azizah",
      whyMatters: "Azizah penting kerana seluruh cerita bergerak melalui masalah, usaha dan kejayaannya.",
      supportsTheme: "Azizah menunjukkan penghargaan terhadap guru melalui tudung saji dan kejayaannya.",
      supportsIssues: "Azizah membuktikan kemiskinan bukan penghalang kejayaan jika seseorang rajin dan kreatif.",
      supportsValues: "Azizah menonjolkan nilai rajin, gigih, kreatif, rendah diri dan menghormati guru.",
      supportsLessons: "Melalui Azizah, murid belajar supaya tidak berputus asa dan membalas jasa guru dengan usaha.",
    },
    authorPurpose: "Cerpen Hadiah bukan sekadar cerita tentang barang yang diberikan pada Hari Guru. Penulis mahu menunjukkan bahawa hadiah paling bermakna tidak semestinya mahal. Usaha, kreativiti, kejayaan dan rasa hormat kepada guru boleh menjadi hadiah yang lebih besar daripada barang yang dibeli.",
    examCharacterAnalysis: [
      { character: "Azizah", trait: "Rajin", evidence: "Berusaha menghasilkan tudung saji untuk Cikgu Zaleha.", modelAnswer: "Azizah seorang yang rajin kerana dia berusaha menghasilkan tudung saji sebagai hadiah Hari Guru walaupun tidak mampu membeli hadiah mahal." },
      { character: "Azizah", trait: "Kreatif", evidence: "Membuat hadiah buatan tangan.", modelAnswer: "Azizah kreatif kerana mampu menghasilkan tudung saji dengan menggunakan idea dan kemahirannya sendiri." },
      { character: "Cikgu Zaleha", trait: "Prihatin", evidence: "Menggalakkan Azizah menyertai pertandingan kraftangan.", modelAnswer: "Cikgu Zaleha prihatin kerana beliau melihat bakat Azizah dan memberi galakan supaya Azizah lebih yakin." },
      { character: "Ibu Azizah", trait: "Bijaksana", evidence: "Mencadangkan hadiah buatan tangan.", modelAnswer: "Ibu Azizah bijaksana kerana memberi cadangan yang sesuai dengan kemampuan keluarga mereka." },
      { character: "Ayah Azizah", trait: "Penyayang", evidence: "Memberi sokongan moral kepada Azizah.", modelAnswer: "Ayah Azizah penyayang kerana tetap menyokong anaknya walaupun keluarga mereka hidup sederhana." },
    ],
    memory60: {
      theme: "Penghargaan terhadap guru dan kegigihan mencapai kejayaan.",
      issues: "Kemiskinan bukan penghalang, sokongan keluarga, bakat perlu digilap, kreativiti membawa kejayaan.",
      mainCharacters: "Azizah, Cikgu Zaleha, Ibu Azizah, Ayah Azizah.",
      importantEvents: "Hari Guru, tabung tidak cukup, tudung saji, pertandingan kraftangan, Azizah juara.",
      values: "Rajin, gigih, bersyukur, menghormati guru, kreatif, bertanggungjawab.",
      lessons: "Hargai guru, jangan putus asa, guna kreativiti, sokong bakat, dengar nasihat ibu bapa.",
    },
    uasaQuestions: [
      { type: "MCQ", question: "Apakah hadiah yang dihasilkan oleh Azizah untuk Cikgu Zaleha?", answer: "Tudung saji.", explanation: "Tudung saji ialah hadiah buatan tangan yang dihasilkan oleh Azizah kerana wangnya tidak cukup untuk membeli hadiah." },
      { type: "MCQ", question: "Mengapakah Azizah berasa sedih menjelang Hari Guru?", answer: "Wang tabungnya tidak cukup untuk membeli hadiah.", explanation: "Kesedihan Azizah berpunca daripada kemiskinan dan keinginannya menghargai guru." },
      { type: "MCQ", question: "Siapakah yang mencadangkan Azizah membuat hadiah sendiri?", answer: "Ibu Azizah.", explanation: "Ibu menjadi pendorong utama yang memberi idea kreatif kepada Azizah." },
      { type: "MCQ", question: "Apakah peranan Cikgu Zaleha dalam kejayaan Azizah?", answer: "Mengenal pasti bakat Azizah dan memberi galakan.", explanation: "Cikgu Zaleha tidak merendahkan hadiah Azizah, sebaliknya melihat potensi muridnya." },
      { type: "MCQ", question: "Apakah hadiah sebenar kepada Cikgu Zaleha?", answer: "Kejayaan Azizah dalam pertandingan kraftangan.", explanation: "Kejayaan Azizah membuktikan bimbingan guru memberi kesan besar." },
      { type: "Struktur", question: "Nyatakan tema cerpen Hadiah.", answer: "Tema cerpen Hadiah ialah penghargaan terhadap guru dan kegigihan mencapai kejayaan.", explanation: "Jawapan perlu menyebut guru dan usaha Azizah, bukan hanya perkataan hadiah." },
      { type: "Struktur", question: "Berikan dua perwatakan Azizah.", answer: "Azizah rajin kerana membuat tudung saji. Azizah kreatif kerana menghasilkan hadiah buatan tangan.", explanation: "Setiap perwatakan mesti disertai bukti daripada cerita." },
      { type: "Struktur", question: "Nyatakan satu persoalan dalam cerpen ini.", answer: "Persoalan kemiskinan bukan penghalang kejayaan. Contohnya, Azizah tetap berjaya walaupun keluarganya miskin.", explanation: "Persoalan perlu dihuraikan dengan situasi." },
      { type: "Struktur", question: "Apakah peranan ibu Azizah?", answer: "Ibu Azizah menjadi pendorong dengan mencadangkan Azizah membuat hadiah buatan tangan.", explanation: "Ibu membantu menyelesaikan konflik Azizah." },
      { type: "Struktur", question: "Nyatakan satu pengajaran cerpen.", answer: "Kita hendaklah gigih berusaha walaupun menghadapi kesusahan.", explanation: "Pengajaran mesti bermula dengan tindakan seperti 'Kita hendaklah'." },
      { type: "KBAT", question: "Jika anda berada di tempat Azizah, apakah cara lain untuk menghargai guru tanpa membeli hadiah mahal?", answer: "Saya boleh menulis kad ucapan, membantu guru, belajar bersungguh-sungguh atau menghasilkan karya sendiri kerana penghargaan tidak semestinya melalui barang mahal.", explanation: "Jawapan KBAT perlu memberi cadangan munasabah dan sebab." },
      { type: "KBAT", question: "Adakah kemiskinan boleh menjadi penghalang kejayaan? Jelaskan.", answer: "Tidak. Kemiskinan ialah cabaran, tetapi seseorang masih boleh berjaya jika rajin, kreatif dan menerima sokongan seperti Azizah.", explanation: "Kaitkan pendapat dengan peristiwa Azizah menjadi juara." },
      { type: "KBAT", question: "Mengapakah guru penting dalam mencungkil bakat murid?", answer: "Guru penting kerana guru dapat melihat kelebihan murid, memberi galakan dan membuka peluang. Cikgu Zaleha membantu Azizah yakin menyertai pertandingan kraftangan.", explanation: "Jawapan perlu ada pendapat, sebab dan contoh daripada cerpen." },
    ],
  },
  {
    id: "cerpen-kuih-bakul",
    title: "Kuih Bakul Limau Mandarin",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "12 minit",
    difficulty: "Mudah",
    examFocus: "Perpaduan + Budaya",
    intro: "Cerpen ini menggunakan makanan perayaan sebagai jambatan persahabatan. Kuih bakul dan limau mandarin membawa mesej perpaduan.",
    story60: "Cerita berlaku dalam suasana masyarakat berbilang kaum. Makanan tradisi seperti kuih bakul dan limau mandarin dikongsi antara jiran. Melalui pemberian itu, watak belajar memahami budaya orang lain. Akhirnya hubungan menjadi lebih mesra dan harmoni.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Makanan perayaan menjadi cara jiran menunjukkan ingatan dan kemesraan.", "Muhibah.", "Kita hendaklah berbaik-baik dengan jiran."],
      ["Mesej utama", "Budaya yang berbeza tidak memisahkan kita jika kita saling menghormati.", "Toleransi.", "Kita perlu menghormati budaya kaum lain."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Suasana perayaan dan kejiranan berbilang kaum diperkenalkan." },
      { stage: "Perkembangan", text: "Makanan tradisi dikongsi sebagai tanda ingatan." },
      { stage: "Konflik", text: "Perbezaan budaya mungkin menimbulkan kekok atau salah faham." },
      { stage: "Klimaks", text: "Watak memahami makna di sebalik pemberian." },
      { stage: "Peleraian", text: "Hubungan kejiranan menjadi lebih harmoni." },
    ],
    characters: [
      { name: "Jiran Cina", personality: "Pemurah, mesra dan menghargai jiran.", evidence: "Berkongsi makanan tradisi.", importance: "Mewakili budaya yang diraikan." },
      { name: "Keluarga jiran", personality: "Terbuka dan belajar menghormati.", evidence: "Menerima pemberian dan memahami maksudnya.", importance: "Mewakili pembaca yang belajar tentang perpaduan." },
      { name: "Komuniti", personality: "Berbilang kaum dan saling bergantung.", evidence: "Hubungan berlaku melalui kunjung-mengunjung.", importance: "Menonjolkan tema perpaduan." },
    ],
    events: [
      { event: "Makanan tradisi dikongsi", whatHappened: "Kuih bakul dan limau mandarin diberikan kepada jiran.", whyItMatters: "Makanan menjadi simbol muhibah.", examFocus: "Soalan simbol dan perpaduan." },
      { event: "Budaya difahami", whatHappened: "Watak menerima maksud di sebalik amalan perayaan.", whyItMatters: "Menunjukkan toleransi.", examFocus: "Soalan nilai hormat-menghormati." },
    ],
    theme: { title: "Perpaduan kaum melalui penghormatan budaya", explanation: "Tema cerpen ialah hubungan harmoni masyarakat berbilang kaum.", whyItMatters: "Murid Malaysia hidup dengan rakan pelbagai kaum, jadi sikap hormat perlu diamalkan." },
    values: [
      { value: "Toleransi", explanation: "Menerima perbezaan dengan hati terbuka.", realLife: "Menghormati perayaan jiran.", schoolLife: "Tidak mengejek makanan atau pakaian budaya rakan." },
      { value: "Muhibah", explanation: "Hubungan baik antara kaum.", realLife: "Menziarahi jiran dengan sopan.", schoolLife: "Berkawan tanpa memilih kaum." },
      { value: "Hormat", explanation: "Menghargai adat orang lain.", realLife: "Bertanya dengan sopan tentang budaya.", schoolLife: "Memberi ruang rakan menjalankan amalan budaya." },
    ],
    lessons: [
      { value: "Raikan perbezaan", explanation: "Perbezaan budaya boleh mengeratkan hubungan.", realLife: "Belajar adat jiran.", schoolLife: "Sertai aktiviti budaya sekolah." },
      { value: "Jaga semangat kejiranan", explanation: "Jiran yang baik saling mengambil berat.", realLife: "Menyapa jiran.", schoolLife: "Membantu rakan sekelas." },
      { value: "Elakkan prasangka", explanation: "Salah faham berlaku apabila tidak mahu memahami.", realLife: "Tanya dengan baik.", schoolLife: "Tidak membuat andaian tentang budaya rakan." },
    ],
    teacherExplains: ["Pernah tak anda cuba makanan budaya lain? Cerpen ini mahu kita lihat makanan sebagai jambatan, bukan sempadan.", "Kuih bakul dan limau mandarin bukan sekadar makanan. Itu simbol perayaan, ingatan dan muhibah.", "Jika anda berada dalam komuniti berbilang kaum, sikap paling penting ialah hormat."],
    examBooster: {
      frequentPoints: ["Popular theme: perpaduan kaum.", "Popular values: toleransi, hormat, muhibah.", "Common focus: simbol makanan perayaan.", "Soalan lazim minta cara memupuk perpaduan di sekolah."],
      commonQuestions: [
        q("Apakah tema cerpen ini?", "Tema cerpen ialah perpaduan kaum melalui sikap saling menghormati budaya.", "Tema perlu sebut perpaduan dan budaya.", "Jangan jawab makanan sahaja."),
        q("Apakah nilai yang terdapat dalam cerpen?", "Nilai toleransi kerana watak menerima budaya jiran dengan terbuka.", "Nilai perlu disokong situasi.", "Gunakan contoh makanan tradisi."),
        q("Bagaimanakah murid boleh mengamalkan pengajaran cerpen?", "Murid boleh menghormati budaya rakan dan berkawan tanpa mengira kaum.", "KBAT mahu aplikasi.", "Sebut contoh sekolah."),
      ],
    },
    revision: { theme: "Perpaduan kaum.", values: "Toleransi, muhibah, hormat.", lessons: "Raikan budaya, jaga kejiranan, elakkan prasangka.", examTips: "Makanan tradisi ialah simbol perpaduan." },
    miniQuiz: quiz("Apakah simbol utama cerpen ini?", "Toleransi dengan contoh menerima budaya jiran.", "Bagaimanakah sekolah boleh memupuk perpaduan melalui makanan tradisi?"),
  },
  {
    id: "drama-hadiah",
    title: "Hadiah",
    typeLabel: "Drama",
    kind: "story",
    studyTime: "13 minit",
    difficulty: "Sederhana",
    examFocus: "Dialog + Konflik",
    intro: "Drama ini bergerak melalui dialog. Perhatikan apa yang watak cakap, apa yang mereka rasa dan bagaimana salah faham boleh diselesaikan.",
    story60: "Drama ini memaparkan konflik berkaitan hadiah, niat dan perasaan watak. Salah faham berlaku apabila seseorang menilai tindakan tanpa memahami sebab sebenar. Melalui dialog, kebenaran dan perasaan watak terbuka. Akhirnya, konflik reda apabila watak belajar memaafkan dan menghargai niat baik.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Hadiah menjadi punca watak bercakap tentang perasaan, niat dan salah faham.", "Kejujuran.", "Kita hendaklah bercakap dengan jujur."],
      ["Mesej utama", "Masalah hubungan boleh selesai jika orang mendengar dan memahami.", "Pemaafan.", "Kita perlu memaafkan kesilapan yang ikhlas diperbaiki."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Situasi harian berkaitan hadiah diperkenalkan." },
      { stage: "Perkembangan", text: "Dialog menunjukkan perbezaan harapan antara watak." },
      { stage: "Konflik", text: "Salah faham menyebabkan hubungan menjadi tegang." },
      { stage: "Klimaks", text: "Niat sebenar dan perasaan watak terdedah." },
      { stage: "Peleraian", text: "Watak mencapai kefahaman melalui pemaafan." },
    ],
    characters: [
      { name: "Pemberi hadiah", personality: "Ikhlas, sensitif dan berharap difahami.", evidence: "Tindakannya berpunca daripada niat baik.", importance: "Menggerakkan konflik drama." },
      { name: "Penerima hadiah", personality: "Mudah tersalah faham tetapi boleh berubah.", evidence: "Reaksinya menyebabkan ketegangan.", importance: "Menunjukkan pentingnya memahami niat." },
      { name: "Penasihat/keluarga", personality: "Matang dan mendamaikan.", evidence: "Membantu watak melihat keadaan dengan lebih jelas.", importance: "Membawa konflik ke arah penyelesaian." },
    ],
    events: [
      { event: "Salah faham tentang hadiah", whatHappened: "Watak menilai hadiah atau tindakan tanpa memahami niat.", whyItMatters: "Membina konflik drama.", examFocus: "Soalan konflik dan dialog." },
      { event: "Dialog membuka kebenaran", whatHappened: "Watak akhirnya menjelaskan perasaan dan niat.", whyItMatters: "Menunjukkan kekuatan komunikasi.", examFocus: "Soalan pengajaran dan nilai kejujuran." },
    ],
    theme: { title: "Komunikasi menyelesaikan salah faham", explanation: "Tema drama ialah kepentingan komunikasi, kejujuran dan pemaafan dalam hubungan.", whyItMatters: "Murid sering berdepan salah faham dengan rakan atau keluarga. Drama ini mengajar cara menyelesaikannya." },
    values: [
      { value: "Kejujuran", explanation: "Bercakap benar tentang niat dan perasaan.", realLife: "Terangkan masalah dengan baik.", schoolLife: "Beritahu guru jika berlaku salah faham." },
      { value: "Pemaafan", explanation: "Menerima kesilapan orang yang mahu membaiki keadaan.", realLife: "Maafkan ahli keluarga.", schoolLife: "Berdamai dengan rakan selepas salah faham." },
      { value: "Kasih sayang", explanation: "Mengutamakan hubungan berbanding ego.", realLife: "Bercakap lembut dengan keluarga.", schoolLife: "Tidak memalukan rakan di hadapan orang lain." },
    ],
    lessons: [
      { value: "Bercakap sebelum menghukum", explanation: "Salah faham membesar apabila kita membuat andaian.", realLife: "Tanya dahulu sebelum marah.", schoolLife: "Berbincang dengan rakan kumpulan." },
      { value: "Hargai niat baik", explanation: "Tidak semua perkara perlu dinilai secara negatif.", realLife: "Terima bantuan dengan baik.", schoolLife: "Hargai usaha rakan walaupun tidak sempurna." },
      { value: "Maafkan dengan matang", explanation: "Pemaafan memulihkan hubungan.", realLife: "Tidak mengungkit kesalahan lama.", schoolLife: "Bekerjasama semula selepas konflik." },
    ],
    teacherExplains: ["Bayangkan anda salah faham mesej kawan. Kalau terus marah, masalah jadi besar. Drama ini mengajar kita berhenti dan mendengar dahulu.", "Dalam drama, bukti paling penting ialah dialog. Apa yang watak cakap menunjukkan perasaan dan konflik.", "Jika anda berada di tempat penerima hadiah, adakah anda menilai harga atau niat?"],
    examBooster: {
      frequentPoints: ["Popular theme: komunikasi dan pemaafan.", "Popular values: jujur, pemaaf, kasih sayang.", "Common focus: konflik melalui dialog.", "Soalan lazim minta peranan dialog dalam drama."],
      commonQuestions: [
        q("Apakah tema drama Hadiah?", "Tema drama ialah komunikasi dan pemaafan dalam menyelesaikan salah faham.", "Tema perlu menyebut hubungan dan konflik.", "Gunakan perkataan 'dialog' jika sesuai."),
        q("Nyatakan satu nilai.", "Nilai kejujuran kerana watak perlu menjelaskan niat sebenar.", "Drama menunjukkan nilai melalui percakapan.", "Petik situasi dialog secara umum."),
        q("Apakah pengajaran kepada murid?", "Kita hendaklah bertanya dan berbincang sebelum membuat andaian terhadap orang lain.", "Pengajaran perlu praktikal.", "Kaitkan dengan rakan atau keluarga."),
      ],
    },
    revision: { theme: "Komunikasi menyelesaikan konflik.", values: "Kejujuran, pemaafan, kasih sayang.", lessons: "Bercakap, hargai niat, maafkan.", examTips: "Drama diuji melalui dialog, konflik dan aksi watak." },
    miniQuiz: quiz("Apakah ciri utama drama yang membantu konflik?", "Watak penerima hadiah dengan nilai pemaafan.", "Bagaimanakah murid boleh menyelesaikan salah faham dalam kumpulan projek?"),
  },
];

for (const work of storyWorks) {
  KOMSAS_PREMIUM_WORKS[work.id] = work;
}

const KSSM_MASTER_UPGRADES: Record<string, Partial<KomsasWork>> = {
  "pantun-dua-kerat": {
    masterCharacters: [
      {
        name: "Penasihat",
        role: "Suara yang memberi teguran ringkas kepada pembaca.",
        traits: ["Berhemah", "Bijaksana", "Prihatin"],
        evidence: "Nasihat disampaikan secara padat supaya pembaca cepat faham maksudnya.",
        relationships: "Penasihat berhubung terus dengan pembaca melalui mesej moral.",
        importance: "Membawa keseluruhan mesej pantun tentang akhlak, usaha dan kebijaksanaan.",
      },
      {
        name: "Pembaca / Murid",
        role: "Penerima nasihat yang perlu mengamalkan pengajaran pantun.",
        traits: ["Perlu terbuka menerima teguran", "Perlu rajin", "Perlu berfikir sebelum bertindak"],
        evidence: "Mesej pantun sesuai dengan situasi murid di sekolah dan rumah.",
        relationships: "Pembaca menerima panduan daripada suara penasihat.",
        importance: "Membuatkan pantun terasa dekat dengan kehidupan remaja.",
      },
    ],
    relationshipMap: [
      { from: "Penasihat", relation: "memberi panduan", to: "Pembaca", explanation: "Hubungan ini menggerakkan maksud pantun kerana nasihat hanya bermakna jika pembaca mahu berfikir dan berubah." },
      { from: "Nasihat", relation: "membentuk", to: "Akhlak murid", explanation: "Pantun menjadikan teguran sebagai alat untuk membina sikap baik." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Pantun memperkenalkan nasihat tentang sikap dan perlakuan.", why: "Nasihat perlu dimulakan dengan perkara yang dekat dengan kehidupan harian.", effect: "Murid faham bahawa pantun ini bukan sekadar hiburan." },
      { stage: "Perkembangan", what: "Mesej pantun berkembang kepada usaha dan ketekunan.", why: "Kejayaan tidak datang tanpa tindakan yang konsisten.", effect: "Pembaca mula mengaitkan pantun dengan belajar, disiplin dan tanggungjawab." },
      { stage: "Konflik", what: "Konflik utama ialah manusia mudah lalai, malas atau bertindak tanpa fikir.", why: "Sikap ini selalu berlaku dalam kehidupan remaja.", effect: "Pantun berfungsi sebagai teguran lembut." },
      { stage: "Klimaks", what: "Pembaca sedar bahawa nasihat ringkas boleh membawa maksud besar.", why: "Bahasa pantun padat tetapi maksudnya jelas.", effect: "Tema akhlak dan kebijaksanaan menjadi lebih kuat." },
      { stage: "Peleraian", what: "Pantun berakhir sebagai panduan hidup.", why: "Nasihat perlu diamalkan, bukan hanya dihafal.", effect: "Murid dapat menjawab soalan tema, nilai dan pengajaran dengan yakin." },
    ],
    retelling3Min:
      "Bayangkan seorang guru memberi nasihat dalam ayat yang sangat pendek. Itulah fungsi Pantun Dua Kerat (Nasihat). Pantun ini tidak bercerita tentang watak yang panjang, tetapi membawa suara orang yang lebih matang sedang menegur pembaca. Mula-mula, pantun mengingatkan kita supaya menjaga perlakuan. Dalam kehidupan murid, benda kecil seperti cara bercakap, cara membalas mesej atau cara melayan rakan sebenarnya menunjukkan budi pekerti kita. Kemudian, pantun membawa murid kepada idea usaha. Jika mahu berjaya, seseorang tidak boleh hanya berharap atau menunggu. Markah baik, hubungan baik dan disiplin diri datang daripada usaha yang dibuat sedikit demi sedikit. Selepas itu, pantun menekankan kebijaksanaan. Remaja sering membuat keputusan cepat, terutama apabila marah atau terpengaruh dengan rakan. Pantun ini seolah-olah berkata: berhenti sebentar, fikir dahulu, kemudian barulah bertindak. Jadi, keseluruhan karya ini ialah panduan hidup yang ringkas tetapi penting. Dalam peperiksaan, jangan jawab pantun ini sebagai nota hafalan semata-mata. Fahami bahawa pantun ini mahu membentuk murid yang berakhlak, rajin dan bijak membuat pilihan.",
    importantEvents: [
      { event: "Nasihat tentang tingkah laku", what: "Pantun menegur pembaca supaya menjaga sikap.", whyImportant: "Membuka tema akhlak mulia.", possibleQuestion: "Apakah pengajaran yang boleh diambil daripada pantun ini?" },
      { event: "Penekanan kepada usaha", what: "Mesej pantun mengaitkan kejayaan dengan kerajinan.", whyImportant: "Menonjolkan nilai ketekunan.", possibleQuestion: "Nyatakan satu nilai dan contoh yang sesuai." },
      { event: "Ajakan berfikir sebelum bertindak", what: "Pembaca diingatkan supaya menggunakan akal.", whyImportant: "Menguatkan nilai kebijaksanaan.", possibleQuestion: "Bagaimanakah pantun ini sesuai dengan kehidupan murid?" },
      { event: "Nasihat menjadi panduan hidup", what: "Mesej pantun boleh diamalkan di sekolah dan rumah.", whyImportant: "Memudahkan jawapan KBAT.", possibleQuestion: "Berikan aplikasi pengajaran pantun dalam kehidupan harian." },
      { event: "Maksud ringkas tetapi mendalam", what: "Pantun dua kerat membawa mesej padat.", whyImportant: "Soalan UASA kerap menguji maksud mudah.", possibleQuestion: "Jelaskan maksud rangkap dengan bahasa sendiri." },
    ],
    keyCharacterFocus: {
      name: "Penasihat",
      whyMatters: "Penasihat ialah suara utama yang membawa mesej moral pantun.",
      supportsTheme: "Menguatkan tema nasihat membentuk peribadi mulia.",
      supportsIssues: "Menunjukkan persoalan sikap, usaha dan kebijaksanaan.",
      supportsValues: "Membawa nilai berhemah, tekun dan bijaksana.",
      supportsLessons: "Mengajar pembaca supaya mendengar nasihat dan berfikir sebelum bertindak.",
    },
    authorPurpose: "Pantun ini ditulis untuk menegur manusia secara halus. Tujuannya bukan memarahi, tetapi membimbing pembaca supaya menjaga akhlak, rajin berusaha dan tidak terburu-buru.",
    examCharacterAnalysis: [
      { character: "Penasihat", trait: "Prihatin", evidence: "Memberi teguran yang berguna kepada pembaca.", modelAnswer: "Penasihat bersifat prihatin kerana menyampaikan nasihat yang dapat membentuk sikap baik pembaca." },
      { character: "Pembaca", trait: "Perlu bijak", evidence: "Pembaca diajak memahami maksud nasihat dan mengamalkannya.", modelAnswer: "Pembaca perlu bijak kerana pantun mengingatkan kita supaya berfikir sebelum bertindak." },
    ],
    memory60: {
      theme: "Nasihat membentuk peribadi mulia.",
      issues: "Sikap, usaha, kebijaksanaan.",
      mainCharacters: "Penasihat dan pembaca.",
      importantEvents: "Nasihat sikap, usaha, fikir dahulu.",
      values: "Berhemah, ketekunan, bijaksana.",
      lessons: "Dengar nasihat, rajin, fikir sebelum bertindak.",
    },
  },

  "syair-pohon-buluh": {
    masterCharacters: [
      { name: "Pohon Buluh", role: "Simbol masyarakat yang hidup bersatu.", traits: ["Kuat apabila bersama", "Berguna", "Rendah hati"], evidence: "Buluh digambarkan hidup berumpun dan memberi manfaat.", relationships: "Buluh menjadi cermin kepada manusia dan masyarakat.", importance: "Membawa tema kerjasama dan perpaduan." },
      { name: "Penyair", role: "Pemerhati alam yang mengambil pengajaran daripada buluh.", traits: ["Peka", "Bijaksana", "Mendidik"], evidence: "Penyair melihat alam sebagai bahan nasihat.", relationships: "Penyair menghubungkan buluh dengan pembaca.", importance: "Membantu murid memahami maksud tersirat syair." },
      { name: "Masyarakat", role: "Golongan yang perlu mencontohi sifat buluh.", traits: ["Perlu bekerjasama", "Perlu bertanggungjawab", "Perlu merendah diri"], evidence: "Mesej syair mengajak manusia hidup saling menyokong.", relationships: "Masyarakat dibandingkan dengan serumpun buluh.", importance: "Menjadikan syair relevan kepada kelas, keluarga dan komuniti." },
    ],
    relationshipMap: [
      { from: "Buluh", relation: "melambangkan", to: "Masyarakat", explanation: "Buluh yang hidup berumpun menunjukkan manusia lebih kuat apabila bersatu." },
      { from: "Penyair", relation: "mendidik", to: "Pembaca", explanation: "Penyair menggunakan alam sebagai contoh mudah supaya pembaca faham nilai kerjasama." },
      { from: "Setiap anggota masyarakat", relation: "mempunyai peranan", to: "Kumpulan", explanation: "Seperti bahagian buluh, setiap orang perlu menjalankan tugas masing-masing." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Syair memperkenalkan imej pohon buluh.", why: "Buluh dipilih kerana sifatnya mudah dilihat dan dekat dengan alam Melayu.", effect: "Pembaca mula mencari maksud simbolik buluh." },
      { stage: "Perkembangan", what: "Buluh digambarkan hidup secara berumpun.", why: "Sifat ini sesuai untuk menerangkan kerjasama masyarakat.", effect: "Tema perpaduan menjadi jelas." },
      { stage: "Konflik", what: "Manusia kadang-kadang lupa peranan dan hidup mementingkan diri.", why: "Tanpa kerjasama, masyarakat menjadi lemah.", effect: "Syair memberi teguran melalui perbandingan alam." },
      { stage: "Klimaks", what: "Pembaca sedar bahawa buluh bukan sekadar tumbuhan, tetapi lambang kehidupan.", why: "Ciri buluh menunjukkan kekuatan, manfaat dan rendah hati.", effect: "Nilai kerjasama dan tanggungjawab lebih mudah diingati." },
      { stage: "Peleraian", what: "Syair berakhir sebagai pengajaran supaya manusia hidup bersatu.", why: "Masyarakat harmoni terbina apabila setiap orang memainkan peranan.", effect: "Murid boleh mengaitkan syair dengan sekolah dan komuniti." },
    ],
    retelling3Min:
      "Syair Pohon Buluh boleh difahami seperti seorang guru yang membawa murid ke kawasan buluh lalu bertanya: apa yang kamu nampak? Pada permukaan, buluh hanyalah tumbuhan. Tetapi apabila diperhatikan, buluh hidup berumpun, saling rapat dan kelihatan kuat apabila bersama. Dari situlah maksud syair bermula. Penyair tidak mahu kita melihat buluh secara fizikal sahaja. Buluh dijadikan lambang masyarakat. Jika satu batang buluh berdiri sendiri, ia mudah kelihatan lemah. Tetapi apabila banyak batang buluh hidup dalam satu rumpun, ia menjadi lebih kukuh. Begitu juga manusia. Keluarga, kelas dan masyarakat tidak akan kuat jika setiap orang hanya mementingkan diri. Syair ini juga mengingatkan bahawa setiap bahagian mempunyai fungsi. Dalam kerja kumpulan, ada murid yang menulis, ada yang membentang, ada yang mencari bahan. Semua penting. Satu lagi mesej besar ialah rendah hati. Buluh yang tinggi sering digambarkan seolah-olah tunduk. Maksudnya, orang yang mempunyai kelebihan tidak patut sombong. Jadi, keseluruhan syair ini mengajar murid supaya bekerjasama, menjalankan tanggungjawab dan merendah diri. Untuk peperiksaan, ingat bahawa buluh ialah simbol. Jika soalan tanya maksud atau tema, kaitkan buluh dengan masyarakat yang bersatu.",
    importantEvents: [
      { event: "Buluh diperkenalkan sebagai simbol", what: "Syair menggunakan pohon buluh untuk menyampaikan nasihat.", whyImportant: "Simbol ialah fokus utama karya.", possibleQuestion: "Apakah maksud simbol pohon buluh?" },
      { event: "Buluh hidup berumpun", what: "Ciri buluh dikaitkan dengan hidup bermasyarakat.", whyImportant: "Menonjolkan tema kerjasama.", possibleQuestion: "Nyatakan tema syair." },
      { event: "Setiap bahagian ada fungsi", what: "Buluh menunjukkan peranan yang saling melengkapi.", whyImportant: "Membawa nilai tanggungjawab.", possibleQuestion: "Apakah nilai yang terdapat dalam syair?" },
      { event: "Buluh menjadi teladan rendah hati", what: "Ketinggian buluh tidak dikaitkan dengan kesombongan.", whyImportant: "Menguatkan pengajaran jangan sombong.", possibleQuestion: "Mengapakah sifat rendah hati penting?" },
      { event: "Pembaca diajak belajar daripada alam", what: "Alam dijadikan guru kehidupan.", whyImportant: "Soalan KBAT boleh mengaitkan alam dengan manusia.", possibleQuestion: "Bagaimanakah murid boleh mengamalkan mesej syair?" },
    ],
    keyCharacterFocus: {
      name: "Pohon Buluh",
      whyMatters: "Pohon buluh ialah simbol utama yang membawa seluruh maksud syair.",
      supportsTheme: "Menjelaskan tema kerjasama dan perpaduan.",
      supportsIssues: "Membawa persoalan peranan individu dalam masyarakat.",
      supportsValues: "Menonjolkan kerjasama, tanggungjawab dan rendah hati.",
      supportsLessons: "Mengajar murid supaya bersatu dan tidak sombong.",
    },
    authorPurpose: "Syair ini ditulis untuk mengajak pembaca belajar daripada alam. Buluh digunakan supaya murid faham bahawa masyarakat yang kuat terbina melalui kerjasama, tanggungjawab dan sikap rendah hati.",
    examCharacterAnalysis: [
      { character: "Pohon Buluh", trait: "Bersatu", evidence: "Buluh hidup berumpun dan saling menyokong.", modelAnswer: "Pohon buluh melambangkan masyarakat yang bersatu kerana hidupnya berumpun dan kukuh apabila bersama." },
      { character: "Penyair", trait: "Bijaksana", evidence: "Penyair menjadikan alam sebagai contoh nasihat.", modelAnswer: "Penyair bijaksana kerana dapat mengambil pengajaran daripada pohon buluh untuk mendidik pembaca." },
    ],
    memory60: { theme: "Kerjasama masyarakat.", issues: "Perpaduan, peranan, rendah hati.", mainCharacters: "Pohon buluh, penyair, masyarakat.", importantEvents: "Buluh berumpun, setiap bahagian berfungsi, teladan alam.", values: "Kerjasama, rendah hati, tanggungjawab.", lessons: "Bersatu, jalankan tugas, jangan sombong." },
  },

  "sajak-kita-umpama": {
    masterCharacters: [
      { name: "Aku Lirik", role: "Suara yang mengajak manusia berfikir tentang hidup.", traits: ["Insaf", "Penyayang", "Bertanggungjawab"], evidence: "Aku lirik melihat kehidupan manusia seperti daun yang perlu memberi manfaat.", relationships: "Aku lirik berbicara kepada pembaca dan masyarakat.", importance: "Membawa mesej bahawa hidup sementara perlu diisi dengan kebaikan." },
      { name: "Sehelai Daun", role: "Simbol manusia yang kecil tetapi berguna.", traits: ["Sederhana", "Bermanfaat", "Akhirnya gugur"], evidence: "Daun digunakan sebagai perbandingan kepada manusia.", relationships: "Daun melambangkan pembaca dan manusia.", importance: "Menguatkan tema jasa dan keinsafan." },
      { name: "Masyarakat", role: "Penerima manfaat daripada kebaikan manusia.", traits: ["Memerlukan bantuan", "Menghargai jasa", "Saling bergantung"], evidence: "Kebaikan kecil boleh memberi kesan kepada orang lain.", relationships: "Masyarakat menerima manfaat daripada tindakan manusia.", importance: "Menjadikan sajak dekat dengan kehidupan sekolah dan komuniti." },
    ],
    relationshipMap: [
      { from: "Daun", relation: "melambangkan", to: "Manusia", explanation: "Daun menunjukkan bahawa hidup manusia sementara tetapi boleh bermanfaat." },
      { from: "Aku Lirik", relation: "menasihati", to: "Pembaca", explanation: "Aku lirik mengajak pembaca menilai tujuan hidup." },
      { from: "Manusia", relation: "berbakti kepada", to: "Masyarakat", explanation: "Kebaikan manusia memberi kesan kepada orang sekeliling." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Sajak memperkenalkan perbandingan manusia dengan daun.", why: "Daun mudah difahami sebagai benda kecil dalam alam.", effect: "Pembaca mula faham maksud simbolik." },
      { stage: "Perkembangan", what: "Daun dilihat sebagai sesuatu yang boleh memberi manfaat.", why: "Walaupun kecil, daun tetap berguna kepada alam.", effect: "Mesej berbakti mula muncul." },
      { stage: "Konflik", what: "Manusia kadang-kadang lupa hidup ini sementara.", why: "Manusia mudah leka dengan diri sendiri.", effect: "Sajak membangkitkan keinsafan." },
      { stage: "Klimaks", what: "Pembaca sedar bahawa nilai hidup terletak pada jasa.", why: "Kebaikan yang dibuat akan memberi kesan walaupun kecil.", effect: "Tema menjadi jelas dan menyentuh emosi." },
      { stage: "Peleraian", what: "Sajak mengajak manusia menggunakan hidup untuk memberi manfaat.", why: "Hidup yang bermakna ialah hidup yang membantu orang lain.", effect: "Murid boleh mengaitkan sajak dengan tindakan harian." },
    ],
    retelling3Min:
      "Sajak Kita Umpama Sehelai Daun bermula dengan satu perbandingan yang sangat mudah: manusia seperti daun. Daun nampak kecil, ringan dan biasa. Namun, jika kita fikir semula, daun banyak jasanya. Daun boleh memberi teduhan, membantu alam dan menjadi sebahagian daripada kehidupan. Penyair mahu pembaca melihat diri sendiri seperti itu. Mungkin seorang murid rasa dirinya tidak penting kerana masih muda atau tidak terkenal. Tetapi sajak ini mengingatkan bahawa setiap orang tetap boleh memberi manfaat. Seorang murid boleh membantu rakan memahami kerja sekolah, menjaga kebersihan kelas atau menggembirakan ibu bapa. Sajak ini juga membawa rasa insaf. Daun tidak kekal pada pokok selama-lamanya. Akhirnya daun akan gugur. Begitu juga manusia, hidup tidak kekal. Oleh itu, masa yang ada perlu digunakan untuk berbuat baik. Konflik dalam sajak ini bukan konflik pergaduhan, tetapi konflik dalaman manusia yang mudah lupa tujuan hidup. Klimaksnya berlaku apabila pembaca sedar bahawa hidup yang bermakna bukan hidup yang hanya memikirkan diri, tetapi hidup yang meninggalkan jasa. Kesimpulannya, sajak ini mengajar murid supaya menghargai masa, membantu orang lain dan menjadi insan yang berguna walaupun dengan kebaikan kecil.",
    importantEvents: [
      { event: "Manusia dibandingkan dengan daun", what: "Daun menjadi simbol manusia.", whyImportant: "Inilah kunci maksud sajak.", possibleQuestion: "Apakah maksud perbandingan manusia dengan daun?" },
      { event: "Daun memberi manfaat", what: "Sifat daun dikaitkan dengan jasa manusia.", whyImportant: "Menonjolkan nilai kasih sayang dan tanggungjawab.", possibleQuestion: "Nyatakan satu nilai dalam sajak." },
      { event: "Daun akhirnya gugur", what: "Sajak mengingatkan bahawa hidup tidak kekal.", whyImportant: "Membina keinsafan.", possibleQuestion: "Apakah pengajaran daripada imej daun gugur?" },
      { event: "Manusia perlu berbakti", what: "Pembaca diajak membuat kebaikan.", whyImportant: "Menguatkan tema utama.", possibleQuestion: "Apakah tema sajak?" },
      { event: "Jasa kecil tetap bermakna", what: "Sajak menunjukkan kebaikan tidak perlu besar.", whyImportant: "Sesuai untuk jawapan KBAT.", possibleQuestion: "Bagaimanakah murid boleh mengamalkan mesej sajak?" },
    ],
    keyCharacterFocus: {
      name: "Sehelai Daun",
      whyMatters: "Daun ialah simbol utama yang menjelaskan kehidupan manusia.",
      supportsTheme: "Menyokong tema manusia perlu berbakti semasa hidup.",
      supportsIssues: "Membawa persoalan hidup sementara dan jasa.",
      supportsValues: "Menonjolkan keinsafan, kasih sayang dan tanggungjawab.",
      supportsLessons: "Mengajar murid supaya menggunakan hidup untuk kebaikan.",
    },
    authorPurpose: "Sajak ini ditulis untuk menyedarkan pembaca bahawa setiap manusia, walaupun kecil atau biasa, masih boleh memberi manfaat kepada orang lain.",
    examCharacterAnalysis: [
      { character: "Aku Lirik", trait: "Insaf", evidence: "Mengajak pembaca sedar tentang kehidupan yang sementara.", modelAnswer: "Aku lirik bersifat insaf kerana mengingatkan manusia supaya menggunakan hidup untuk berbakti." },
      { character: "Daun", trait: "Bermanfaat", evidence: "Daun menjadi simbol sesuatu yang kecil tetapi berguna.", modelAnswer: "Daun melambangkan insan yang bermanfaat walaupun kelihatan sederhana." },
    ],
    memory60: { theme: "Manusia perlu berbakti.", issues: "Hidup sementara, jasa, manfaat.", mainCharacters: "Aku lirik, daun, masyarakat.", importantEvents: "Daun sebagai simbol, hidup sementara, berbuat jasa.", values: "Keinsafan, kasih sayang, tanggungjawab.", lessons: "Hargai masa, bantu orang, jadilah berguna." },
  },
};

Object.entries(KSSM_MASTER_UPGRADES).forEach(([id, upgrade]) => {
  if (KOMSAS_PREMIUM_WORKS[id]) {
    Object.assign(KOMSAS_PREMIUM_WORKS[id], upgrade);
  }
});

function ensureKssmMasterContent(work: KomsasWork) {
  const values = (work.values ?? []).map((item) => item.value).join(", ") || "nilai murni";
  const lessons = (work.lessons ?? []).map((item) => item.value).join(", ") || "pengajaran utama";
  const firstDecoder = work.decoder?.[0];
  const mainCharacter = work.characters?.[0]?.name ?? (work.kind === "poem" ? "Aku Lirik" : "Watak Utama");

  work.masterCharacters ??= work.kind === "story" && work.characters?.length
    ? work.characters.map((character, index) => ({
        name: character.name,
        role: index === 0 ? "Watak utama yang menggerakkan cerita." : "Watak penting yang membantu membina konflik dan mesej cerita.",
        traits: character.personality.split(",").map((trait) => trait.trim()).filter(Boolean).slice(0, 4),
        evidence: character.evidence,
        relationships: index === 0 ? "Berhubung rapat dengan watak lain dan menjadi pusat perkembangan cerita." : `Mempunyai hubungan yang mempengaruhi tindakan ${mainCharacter}.`,
        importance: character.importance,
      }))
    : [
        {
          name: "Aku Lirik / Penyair",
          role: "Suara yang menyampaikan mesej karya kepada pembaca.",
          traits: ["Peka", "Insaf", "Mendidik"],
          evidence: work.teacherExplains?.[0] ?? "Mesej karya disampaikan melalui pemerhatian, perasaan dan nasihat.",
          relationships: "Berhubung terus dengan pembaca melalui mesej puisi.",
          importance: "Menjadi suara utama yang membawa tema, nilai dan pengajaran karya.",
        },
        {
          name: "Pembaca / Murid",
          role: "Penerima nasihat dan pengajaran karya.",
          traits: ["Perlu memahami maksud", "Perlu mengamalkan nilai", "Perlu berfikir secara matang"],
          evidence: work.revision?.examTips ?? "Karya ini sesuai dikaitkan dengan kehidupan murid.",
          relationships: "Menerima panduan daripada aku lirik atau simbol dalam puisi.",
          importance: "Menjadikan karya dekat dengan pengalaman remaja Form 1.",
        },
        {
          name: work.title.includes("Bahasa") ? "Bahasa" : work.title.includes("Daun") ? "Daun" : work.title.includes("Buluh") ? "Pohon Buluh" : "Simbol Utama",
          role: "Lambang utama yang membantu pembaca memahami maksud tersirat.",
          traits: ["Bermakna", "Dekat dengan kehidupan", "Membawa pengajaran"],
          evidence: firstDecoder?.pantunMudah ?? work.theme?.explanation ?? "Simbol ini menjelaskan mesej karya.",
          relationships: "Menghubungkan mesej karya dengan kehidupan pembaca.",
          importance: "Memudahkan murid mengingat tema dan menjawab soalan maksud.",
        },
      ];

  work.relationshipMap ??= work.kind === "story" && work.masterCharacters.length > 1
    ? [
        {
          from: work.masterCharacters[0].name,
          relation: "berhubung dengan",
          to: work.masterCharacters[1].name,
          explanation: "Hubungan ini menimbulkan tindakan, reaksi atau perubahan yang menggerakkan cerita.",
        },
        {
          from: work.masterCharacters[0].name,
          relation: "membawa",
          to: "Tema",
          explanation: `Watak ini membantu menunjukkan ${work.theme?.title?.toLowerCase() ?? "tema utama karya"}.`,
        },
        {
          from: "Konflik",
          relation: "menguji",
          to: work.masterCharacters[0].name,
          explanation: "Cabaran yang berlaku menunjukkan perwatakan dan pengajaran cerita.",
        },
      ]
    : [
        {
          from: "Aku Lirik",
          relation: "menyampaikan",
          to: "Pembaca",
          explanation: "Hubungan ini menjadikan puisi seperti nasihat langsung kepada murid.",
        },
        {
          from: "Simbol Utama",
          relation: "menerangkan",
          to: "Tema",
          explanation: "Simbol membantu pembaca memahami maksud tersirat tanpa perlu menghafal.",
        },
      ];

  work.detailedPlot ??= work.kind === "story" && work.timeline?.length
    ? work.timeline.map((item) => ({
        stage: item.stage,
        what: item.text,
        why:
          item.stage === "Permulaan"
            ? "Bahagian ini memperkenalkan keadaan awal supaya pembaca faham latar dan watak."
            : item.stage === "Perkembangan"
              ? "Peristiwa mula berkembang dan hubungan antara watak menjadi lebih jelas."
              : item.stage === "Konflik"
                ? "Masalah diperlukan supaya tema, nilai dan perwatakan dapat diuji."
                : item.stage === "Klimaks"
                  ? "Inilah saat paling tegang yang menentukan perubahan cerita."
                  : "Bahagian ini menunjukkan kesan konflik dan pengajaran yang perlu diambil.",
        effect:
          item.stage === "Peleraian"
            ? "Murid dapat melihat mesej akhir karya dengan jelas."
            : "Cerita bergerak ke tahap seterusnya dan pembaca semakin faham konflik utama.",
      }))
    : [
        { stage: "Permulaan", what: "Karya memperkenalkan suara, simbol atau mesej utama.", why: "Pembaca perlu tahu fokus awal karya.", effect: "Murid mula memahami arah maksud karya." },
        { stage: "Perkembangan", what: "Maksud berkembang melalui rangkap atau imej penting.", why: "Setiap bahagian menambah lapisan makna.", effect: "Tema dan nilai semakin jelas." },
        { stage: "Konflik", what: "Karya menegur kelemahan manusia seperti lupa jasa, kurang bersyukur atau tidak menjaga bahasa.", why: "Teguran membuat mesej karya lebih kuat.", effect: "Pembaca mula mengaitkan karya dengan diri sendiri." },
        { stage: "Klimaks", what: "Maksud tersirat karya menjadi jelas melalui simbol atau nasihat utama.", why: "Bahagian ini membantu murid memahami tujuan karya.", effect: "Pengajaran mudah diingat untuk peperiksaan." },
        { stage: "Peleraian", what: "Karya berakhir sebagai panduan hidup.", why: "Puisi KOMSAS biasanya mahu mendidik pembaca.", effect: "Murid boleh menjawab tema, nilai dan pengajaran dengan yakin." },
      ];

  work.retelling3Min ??= work.kind === "story"
    ? `${work.title} boleh difahami sebagai kisah yang bergerak daripada keadaan biasa kepada satu kesedaran penting. Pada permulaan, pembaca diperkenalkan dengan dunia watak utama dan keadaan yang kelihatan sederhana. Namun, keadaan ini penting kerana daripada situlah kita nampak sikap, hubungan dan tanggungjawab watak. Dalam perkembangan cerita, tindakan watak mula menunjukkan masalah sebenar. Ada perkara yang disalah faham, diabaikan atau tidak dihargai. Konflik ini tidak wujud secara tiba-tiba. Konflik berlaku kerana manusia kadang-kadang cepat menilai, terlalu leka atau kurang peka terhadap perasaan pihak lain. Apabila cerita sampai ke bahagian klimaks, pembaca dapat melihat kesan daripada tindakan tersebut. Watak utama sama ada menyesal, berubah atau mula memahami maksud sebenar peristiwa yang berlaku. Bahagian ini penting kerana di sinilah tema ${work.theme?.title?.toLowerCase() ?? "utama"} menjadi jelas. Pada akhirnya, cerita memberi peleraian yang membawa pengajaran. Murid tidak perlu menghafal setiap butiran kecil. Fahami aliran ini: keadaan awal, masalah, kesan masalah, kesedaran dan pengajaran. Dari situ, soalan tentang watak, nilai, tema dan peristiwa penting akan lebih mudah dijawab. Karya ini ditulis supaya murid belajar melihat kehidupan dengan lebih matang dan tidak mengulangi kesilapan watak.`
    : `${work.title} bukan karya yang perlu dihafal baris demi baris. Cara terbaik memahaminya ialah membaca karya ini seperti seorang guru sedang bercakap perlahan-lahan kepada murid. Pada awalnya, karya memperkenalkan satu idea yang mudah: ${work.theme?.title?.toLowerCase() ?? "mesej utama"}. Idea ini kemudian berkembang melalui simbol, suasana atau suara aku lirik. Setiap bahagian membawa maksud yang semakin jelas. Pembaca diajak melihat kehidupan daripada sudut yang lebih matang. Jika karya menyebut alam, bahasa, syukur atau diri, semua itu bukan hiasan semata-mata. Semuanya digunakan untuk membawa nasihat. Konflik dalam puisi biasanya bukan pergaduhan antara watak, tetapi konflik dalam diri manusia. Manusia mudah lupa jasa, kurang bersyukur, tidak menjaga bahasa atau tidak sedar bahawa hidup perlu digunakan untuk kebaikan. Apabila maksud karya sampai ke bahagian paling kuat, pembaca mula sedar bahawa mesejnya dekat dengan kehidupan sendiri. Seorang murid boleh mengaitkannya dengan sekolah, keluarga, rakan dan cara bercakap setiap hari. Pada akhirnya, karya menjadi panduan hidup. Untuk peperiksaan, fahami simbol utama, tema, nilai dan pengajaran. Jangan salin ayat asal. Jelaskan maksud dengan bahasa sendiri dan beri contoh yang dekat dengan kehidupan murid.`;

  work.importantEvents ??= [
    ...(work.events ?? []).map((event) => ({
      event: event.event,
      what: event.whatHappened,
      whyImportant: event.whyItMatters,
      possibleQuestion: event.examFocus,
    })),
    ...(work.decoder ?? []).slice(0, 5).map((item) => ({
      event: item.tema,
      what: item.pantunMudah,
      whyImportant: `Bahagian ini membantu murid memahami nilai ${item.nilai.toLowerCase()}`,
      possibleQuestion: `Jelaskan maksud ${item.rangkap} dan nyatakan pengajarannya.`,
    })),
  ].slice(0, 8);

  work.keyCharacterFocus ??= {
    name: mainCharacter,
    whyMatters: `${mainCharacter} penting kerana menjadi pusat kepada pemahaman karya.`,
    supportsTheme: `Watak atau suara ini membantu menunjukkan tema ${work.theme?.title?.toLowerCase() ?? "utama"}.`,
    supportsIssues: `Membantu murid memahami persoalan seperti ${work.revision?.theme ?? "mesej utama karya"}.`,
    supportsValues: `Menonjolkan nilai ${values}.`,
    supportsLessons: `Menguatkan pengajaran seperti ${lessons}.`,
  };

  work.authorPurpose ??= `${work.title} ditulis untuk membantu pembaca memahami ${work.theme?.title?.toLowerCase() ?? "mesej utama karya"} melalui bahasa yang mudah dikaitkan dengan kehidupan. Karya ini mahu murid berfikir, bukan sekadar menghafal nota.`;

  work.examCharacterAnalysis ??= (work.masterCharacters ?? []).slice(0, 5).map((character) => ({
    character: character.name,
    trait: character.traits[0] ?? "Penting",
    evidence: character.evidence,
    modelAnswer: `${character.name} bersifat ${character.traits[0]?.toLowerCase() ?? "penting"} kerana ${character.evidence.charAt(0).toLowerCase()}${character.evidence.slice(1)}`,
  }));

  work.memory60 ??= {
    theme: work.revision?.theme ?? work.theme?.title ?? "Tema utama",
    issues: work.examFocus,
    mainCharacters: (work.masterCharacters ?? []).map((character) => character.name).slice(0, 3).join(", "),
    importantEvents: (work.importantEvents ?? []).map((event) => event.event).slice(0, 3).join(", "),
    values,
    lessons,
  };
}

Object.values(KOMSAS_PREMIUM_WORKS).forEach(ensureKssmMasterContent);

export function getPremiumKomsasWork(id: string) {
  return KOMSAS_PREMIUM_WORKS[id];
}
