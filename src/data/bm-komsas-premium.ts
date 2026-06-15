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
  movieTrailer?: string;
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
    { question: `Aneka Pilihan: ${mcq}`, answerHint: "Ruang jawapan: pilih pilihan yang paling tepat berdasarkan tema dan bukti karya." },
    { question: `Padanan: ${matching}`, answerHint: "Ruang jawapan: padankan istilah dengan contoh peristiwa atau maksud yang betul." },
    { question: `KBAT: ${kbat}`, answerHint: "Ruang jawapan: beri pendapat, sebab dan contoh kehidupan murid." },
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
    examFocus: "Si Bongsu + Padi Kayangan",
    intro: "Prosa tradisional ini menerangkan asal usul padi melalui kisah Si Bongsu yang miskin tetapi bijak dan gigih. Fokusnya ialah usaha mencari jalan keluar, keberanian dan amanah.",
    story60: "Si Bongsu hidup miskin dan susah. Pada suatu hari, dia bertemu puteri kayangan lalu pergi ke kayangan. Di sana, dia menemui padi yang belum ada di bumi. Apabila cuba membawa padi, dia ditangkap kerana dianggap mencuri. Namun Si Bongsu bijak menyorok padi dalam tumitnya dan akhirnya berjaya membawanya ke bumi. Sejak itu, padi berkembang dan menjadi sumber makanan manusia.",
    decoder: poemDecoder([
      ["Si Bongsu miskin", "Si Bongsu hidup susah tetapi tidak menyerah kalah.", "Gigih.", "Kita hendaklah terus berusaha walaupun hidup susah."],
      ["Bertemu puteri kayangan", "Pertemuan ini membuka peluang Si Bongsu melihat dunia kayangan.", "Berani.", "Kita hendaklah berani mencuba peluang yang baik."],
      ["Menemui padi", "Si Bongsu melihat padi di kayangan dan sedar tanaman itu boleh membantu manusia di bumi.", "Bijaksana.", "Kita hendaklah menggunakan akal untuk menyelesaikan masalah."],
      ["Ditangkap mencuri", "Si Bongsu berdepan masalah apabila perbuatannya membawa padi diketahui.", "Gigih.", "Kita tidak patut mudah mengalah ketika menghadapi cabaran."],
      ["Menyorok padi dalam tumit", "Si Bongsu menggunakan cara bijak untuk membawa padi ke bumi.", "Bijaksana.", "Kita hendaklah berfikir dengan tenang ketika menghadapi masalah."],
      ["Padi berkembang di bumi", "Padi akhirnya tumbuh dan menjadi makanan manusia.", "Amanah.", "Kita hendaklah menjaga sesuatu yang bermanfaat dengan baik."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Si Bongsu hidup miskin dan serba kekurangan di bumi." },
      { stage: "Perkembangan", text: "Si Bongsu bertemu puteri kayangan dan pergi ke kayangan." },
      { stage: "Konflik", text: "Si Bongsu menemui padi tetapi ditangkap kerana dianggap mencuri." },
      { stage: "Klimaks", text: "Si Bongsu menyorok padi dalam tumit untuk membawanya ke bumi." },
      { stage: "Peleraian", text: "Padi berjaya dibawa ke bumi dan berkembang menjadi makanan manusia." },
    ],
    characters: [
      { name: "Si Bongsu", personality: "Bijak, gigih, berani dan tidak mudah berputus asa.", evidence: "Menyorok padi dalam tumit untuk membawanya ke bumi.", importance: "Watak utama yang menyelesaikan masalah dan membawa manfaat kepada manusia." },
      { name: "Pemilik Padi", personality: "Tegas dan berhati-hati.", evidence: "Menangkap Si Bongsu apabila padi cuba dibawa keluar.", importance: "Mewujudkan konflik dan menunjukkan padi sangat bernilai." },
      { name: "Puteri Kayangan", personality: "Baik hati dan membantu Si Bongsu.", evidence: "Pertemuan dengannya membuka jalan Si Bongsu ke kayangan.", importance: "Menghubungkan dunia bumi dengan kayangan." },
      { name: "Burung Pipit", personality: "Tidak jujur.", evidence: "Tidak menjalankan amanah dengan baik.", importance: "Menjadi perbandingan kepada watak yang amanah." },
      { name: "Si Tekuri", personality: "Amanah dan jujur.", evidence: "Menjalankan amanah dengan betul.", importance: "Menonjolkan nilai amanah dalam cerita." },
    ],
    events: [
      { event: "Si Bongsu hidup miskin", whatHappened: "Si Bongsu hidup dalam kesusahan di bumi.", whyItMatters: "Memperkenalkan masalah awal cerita.", examFocus: "Soalan permulaan cerita." },
      { event: "Si Bongsu bertemu puteri kayangan", whatHappened: "Pertemuan itu membuka peluang ke kayangan.", whyItMatters: "Menggerakkan perkembangan cerita.", examFocus: "Soalan peranan Puteri Kayangan." },
      { event: "Si Bongsu pergi ke kayangan", whatHappened: "Si Bongsu memasuki dunia kayangan.", whyItMatters: "Tempat inilah dia menemui padi.", examFocus: "Soalan latar tempat." },
      { event: "Si Bongsu menemui padi", whatHappened: "Dia melihat tanaman yang boleh menjadi makanan manusia.", whyItMatters: "Padi menjadi objek utama cerita.", examFocus: "Soalan tema dan peristiwa penting." },
      { event: "Si Bongsu ditangkap", whatHappened: "Pemilik padi menangkapnya kerana dianggap mencuri.", whyItMatters: "Membina konflik utama.", examFocus: "Soalan konflik cerita." },
      { event: "Padi disorok dalam tumit", whatHappened: "Si Bongsu menggunakan akal untuk menyembunyikan padi.", whyItMatters: "Menunjukkan kebijaksanaan Si Bongsu.", examFocus: "Soalan perwatakan Si Bongsu." },
      { event: "Padi dibawa ke bumi", whatHappened: "Si Bongsu berjaya membawa padi pulang.", whyItMatters: "Menjadi titik kejayaan cerita.", examFocus: "Soalan klimaks." },
      { event: "Padi berkembang di bumi", whatHappened: "Padi tumbuh dan menjadi makanan manusia.", whyItMatters: "Menjelaskan asal usul padi.", examFocus: "Soalan peleraian dan pengajaran." },
    ],
    theme: {
      title: "Kebijaksanaan dan kegigihan menyelesaikan masalah",
      explanation: "Tema Asal Padi ialah kebijaksanaan dan kegigihan Si Bongsu mencari jalan untuk membawa padi ke bumi. Walaupun hidup miskin dan menghadapi cabaran di kayangan, dia tidak mudah menyerah.",
      whyItMatters: "Murid boleh belajar bahawa masalah tidak selesai dengan mengeluh. Kita perlu berani, gigih dan menggunakan akal untuk mencari jalan penyelesaian.",
    },
    values: [
      { value: "Gigih", explanation: "Terus berusaha walaupun menghadapi kesusahan.", realLife: "Terus belajar walaupun gagal kuiz pertama.", schoolLife: "Si Bongsu tetap berusaha mendapatkan padi walaupun ditangkap." },
      { value: "Berani", explanation: "Sanggup menghadapi cabaran untuk tujuan baik.", realLife: "Berani bertanya apabila tidak faham.", schoolLife: "Si Bongsu berani pergi ke kayangan." },
      { value: "Bijaksana", explanation: "Menggunakan akal untuk menyelesaikan masalah.", realLife: "Mencari cara belajar yang sesuai apabila susah memahami topik.", schoolLife: "Si Bongsu menyorok padi dalam tumit." },
      { value: "Amanah", explanation: "Menjalankan tanggungjawab dengan jujur.", realLife: "Menjaga barang rakan yang dipinjam.", schoolLife: "Si Tekuri menjadi contoh watak yang jujur dan amanah." },
    ],
    lessons: [
      { value: "Kita hendaklah gigih berusaha", explanation: "Usaha yang berterusan membantu kita menyelesaikan masalah.", realLife: "Tidak berhenti belajar walaupun subjek terasa susah.", schoolLife: "Si Bongsu gigih mendapatkan padi untuk dibawa ke bumi." },
      { value: "Kita hendaklah berani menghadapi cabaran", explanation: "Keberanian diperlukan apabila kita mahu mengubah keadaan.", realLife: "Berani mencuba pertandingan baharu.", schoolLife: "Si Bongsu berani pergi ke kayangan." },
      { value: "Kita hendaklah bijak menggunakan akal", explanation: "Masalah sukar perlu diselesaikan dengan fikiran yang tenang.", realLife: "Mencari jalan penyelesaian sebelum mengalah.", schoolLife: "Si Bongsu menyorok padi dalam tumit." },
      { value: "Kita hendaklah amanah", explanation: "Amanah menjadikan seseorang dipercayai.", realLife: "Memulangkan barang yang dipinjam.", schoolLife: "Si Tekuri menjadi contoh watak jujur." },
      { value: "Kita hendaklah menghargai padi sebagai rezeki", explanation: "Padi diperoleh melalui usaha dan kesusahan dalam cerita.", realLife: "Tidak membazir nasi.", schoolLife: "Ambil makanan secukupnya di kantin." },
    ],
    teacherExplains: [
      "Prosa tradisional Asal Padi bukan cerita sains tentang bagaimana padi wujud. Cerita ini ialah cerita asal usul yang mahu mengajar nilai melalui imaginasi orang dahulu.",
      "Si Bongsu penting kerana dia tidak pasrah dengan kemiskinan. Dia mencari jalan sehingga padi dapat dibawa ke bumi.",
      "Burung Pipit dan Si Tekuri membantu murid melihat perbezaan antara tidak jujur dengan amanah. Dalam exam, jangan hanya fokus pada Si Bongsu.",
      "Mesej mudahnya begini: kalau ada masalah, gunakan akal, berani mencuba dan jangan cepat putus asa.",
    ],
    examBooster: {
      frequentPoints: [
        "Popular theme: kebijaksanaan dan kegigihan.",
        "Popular values: gigih, berani, bijaksana, amanah.",
        "Common focus: cara Si Bongsu membawa padi ke bumi.",
        "Soalan lazim: perwatakan Si Bongsu dan maksud amanah.",
      ],
      commonQuestions: [
        q("Apakah tema Asal Padi?", "Tema karya ialah kebijaksanaan dan kegigihan menyelesaikan masalah.", "Tema perlu menyebut usaha dan kebijaksanaan Si Bongsu.", "Jangan jawab 'asal usul padi' sahaja."),
        q("Nyatakan perwatakan Si Bongsu.", "Si Bongsu bijaksana kerana menyorok padi dalam tumit untuk membawanya ke bumi.", "Perwatakan perlu disertai bukti.", "Watak + sifat + bukti."),
        q("Apakah pengajaran kepada murid?", "Kita hendaklah gigih berusaha untuk menyelesaikan masalah.", "Pengajaran perlu berbentuk ayat tindakan.", "Mulakan dengan 'Kita hendaklah'."),
      ],
    },
    revision: {
      theme: "Kebijaksanaan dan kegigihan menyelesaikan masalah.",
      values: "Gigih, berani, bijaksana, amanah.",
      lessons: "Gigih berusaha, berani, bijak, amanah, hargai rezeki.",
      examTips: "Fokus pada Si Bongsu, padi kayangan, padi dalam tumit, dan padi berkembang di bumi.",
    },
    miniQuiz: quiz("Bagaimanakah Si Bongsu membawa padi ke bumi?", "Si Bongsu dengan nilai bijaksana.", "Mengapakah amanah penting dalam kehidupan murid?"),
    detailedPlot: [
      { stage: "Permulaan", what: "Si Bongsu hidup miskin dan serba kekurangan.", why: "Latar ini menunjukkan masalah awal yang dihadapi watak utama.", effect: "Murid faham sebab Si Bongsu perlu mencari jalan keluar." },
      { stage: "Perkembangan", what: "Si Bongsu bertemu puteri kayangan dan pergi ke kayangan.", why: "Pertemuan itu membuka peluang kepadanya melihat padi.", effect: "Cerita bergerak daripada dunia bumi ke dunia kayangan." },
      { stage: "Konflik", what: "Si Bongsu menemui padi tetapi ditangkap kerana dianggap mencuri.", why: "Padi dijaga oleh pemiliknya dan tidak boleh dibawa keluar begitu sahaja.", effect: "Cabaran utama Si Bongsu bermula." },
      { stage: "Klimaks", what: "Si Bongsu menyorok padi dalam tumit.", why: "Dia menggunakan akal untuk membawa padi ke bumi.", effect: "Kebijaksanaan Si Bongsu terserlah." },
      { stage: "Peleraian", what: "Padi berjaya dibawa ke bumi dan berkembang menjadi makanan manusia.", why: "Usaha Si Bongsu akhirnya berhasil.", effect: "Cerita menjelaskan asal usul padi dan kepentingan menghargai rezeki." },
    ],
    masterCharacters: [
      { name: "Si Bongsu", role: "Watak utama yang membawa padi ke bumi.", traits: ["Bijak", "Gigih", "Berani", "Tidak mudah berputus asa"], evidence: "Menyorok padi dalam tumit untuk membawanya ke bumi.", relationships: "Dibantu oleh Puteri Kayangan dan berdepan dengan Pemilik Padi.", importance: "Menunjukkan tema kebijaksanaan dan kegigihan." },
      { name: "Pemilik Padi", role: "Penjaga padi di kayangan.", traits: ["Tegas", "Berhati-hati"], evidence: "Menangkap Si Bongsu apabila padi cuba dibawa keluar.", relationships: "Menjadi pihak yang menghalang Si Bongsu.", importance: "Mewujudkan konflik dan menunjukkan nilai padi." },
      { name: "Puteri Kayangan", role: "Watak yang membantu Si Bongsu.", traits: ["Baik hati", "Membantu"], evidence: "Pertemuannya dengan Si Bongsu membuka jalan ke kayangan.", relationships: "Membantu Si Bongsu melihat dunia kayangan.", importance: "Menggerakkan perkembangan cerita." },
      { name: "Burung Pipit", role: "Watak perbandingan nilai.", traits: ["Tidak jujur"], evidence: "Tidak menjalankan amanah dengan baik.", relationships: "Dibandingkan dengan Si Tekuri.", importance: "Menunjukkan kesan sikap tidak amanah." },
      { name: "Si Tekuri", role: "Watak contoh amanah.", traits: ["Amanah", "Jujur"], evidence: "Menjalankan amanah dengan betul.", relationships: "Menjadi perbandingan kepada Burung Pipit.", importance: "Menegaskan nilai amanah dalam cerita." },
    ],
    relationshipMap: [
      { from: "Si Bongsu", relation: "dibantu oleh", to: "Puteri Kayangan", explanation: "Pertemuan ini membuka peluang kepada Si Bongsu pergi ke kayangan." },
      { from: "Si Bongsu", relation: "berdepan dengan", to: "Pemilik Padi", explanation: "Pemilik Padi mencetuskan konflik apabila Si Bongsu ditangkap." },
      { from: "Burung Pipit", relation: "berbeza dengan", to: "Si Tekuri", explanation: "Burung Pipit tidak jujur, manakala Si Tekuri menjadi contoh amanah." },
      { from: "Padi", relation: "dibawa oleh", to: "Si Bongsu", explanation: "Usaha Si Bongsu menyebabkan padi berkembang di bumi." },
    ],
    importantEvents: [
      { event: "Si Bongsu hidup miskin", what: "Si Bongsu hidup susah di bumi.", whyImportant: "Menjadi latar masalah utama.", possibleQuestion: "Apakah keadaan hidup Si Bongsu pada permulaan cerita?" },
      { event: "Bertemu puteri kayangan", what: "Si Bongsu bertemu watak dari kayangan.", whyImportant: "Membuka jalan ke dunia kayangan.", possibleQuestion: "Apakah peranan Puteri Kayangan?" },
      { event: "Pergi ke kayangan", what: "Si Bongsu memasuki dunia kayangan.", whyImportant: "Di sinilah dia menemui padi.", possibleQuestion: "Nyatakan latar tempat penting." },
      { event: "Menemui padi", what: "Si Bongsu melihat padi yang belum ada di bumi.", whyImportant: "Padi menjadi objek utama cerita.", possibleQuestion: "Mengapakah padi penting?" },
      { event: "Ditangkap mencuri", what: "Si Bongsu ditangkap oleh pemilik padi.", whyImportant: "Membina konflik utama.", possibleQuestion: "Apakah konflik utama cerita?" },
      { event: "Menyorok padi dalam tumit", what: "Si Bongsu menyembunyikan padi dalam tumit.", whyImportant: "Menonjolkan kebijaksanaan Si Bongsu.", possibleQuestion: "Berikan bukti Si Bongsu bijaksana." },
      { event: "Membawa padi ke bumi", what: "Si Bongsu berjaya membawa padi pulang.", whyImportant: "Menjadi kejayaan watak utama.", possibleQuestion: "Apakah peristiwa klimaks cerita?" },
      { event: "Padi berkembang di bumi", what: "Padi tumbuh dan menjadi sumber makanan manusia.", whyImportant: "Menjadi peleraian dan asal usul padi.", possibleQuestion: "Apakah pengajaran daripada peleraian cerita?" },
    ],
    keyCharacterFocus: {
      name: "Si Bongsu",
      whyMatters: "Si Bongsu penting kerana dialah watak yang berusaha membawa padi ke bumi.",
      supportsTheme: "Dia menyokong tema kebijaksanaan dan kegigihan menyelesaikan masalah.",
      supportsIssues: "Wataknya menunjukkan persoalan kemiskinan, keberanian dan usaha mencari rezeki.",
      supportsValues: "Si Bongsu menonjolkan nilai gigih, berani dan bijaksana.",
      supportsLessons: "Melalui Si Bongsu, murid belajar supaya tidak mudah putus asa dan menggunakan akal.",
    },
    authorPurpose: "Asal Padi ditulis sebagai cerita asal usul yang menerangkan bagaimana padi sampai ke bumi. Cerita ini bukan fakta sains, tetapi cara orang dahulu mengajar murid tentang usaha, kebijaksanaan, keberanian dan amanah.",
    examCharacterAnalysis: [
      { character: "Si Bongsu", trait: "Bijak", evidence: "Menyorok padi dalam tumit.", modelAnswer: "Si Bongsu bijak kerana menggunakan akal untuk menyorok padi dalam tumit supaya padi dapat dibawa ke bumi." },
      { character: "Si Bongsu", trait: "Gigih", evidence: "Tetap berusaha mendapatkan padi walaupun ditangkap.", modelAnswer: "Si Bongsu gigih kerana tidak mudah berputus asa walaupun menghadapi masalah di kayangan." },
      { character: "Pemilik Padi", trait: "Tegas", evidence: "Menangkap Si Bongsu kerana padi cuba dibawa keluar.", modelAnswer: "Pemilik Padi tegas kerana menjaga padi dengan berhati-hati." },
      { character: "Puteri Kayangan", trait: "Baik hati", evidence: "Membantu membuka jalan Si Bongsu ke kayangan.", modelAnswer: "Puteri Kayangan baik hati kerana membantu Si Bongsu sehingga dia dapat pergi ke kayangan." },
      { character: "Si Tekuri", trait: "Amanah", evidence: "Menjalankan amanah dengan jujur.", modelAnswer: "Si Tekuri amanah kerana menjalankan tanggungjawab dengan jujur." },
    ],
    memory60: {
      theme: "Kebijaksanaan dan kegigihan menyelesaikan masalah.",
      issues: "Kemiskinan, keberanian, padi kayangan, amanah, usaha membawa rezeki.",
      mainCharacters: "Si Bongsu, Pemilik Padi, Puteri Kayangan, Burung Pipit, Si Tekuri.",
      importantEvents: "Si Bongsu miskin, pergi kayangan, menemui padi, ditangkap, padi dalam tumit, padi berkembang.",
      values: "Gigih, berani, bijaksana, amanah.",
      lessons: "Gigih berusaha, berani, bijak, amanah, hargai rezeki.",
    },
    uasaQuestions: [
      { type: "MCQ", question: "Siapakah watak utama dalam Asal Padi?", answer: "Si Bongsu.", explanation: "Si Bongsu ialah watak yang berusaha membawa padi ke bumi." },
      { type: "MCQ", question: "Di manakah Si Bongsu menemui padi?", answer: "Di kayangan.", explanation: "Padi digambarkan berasal dari dunia kayangan dalam cerita ini." },
      { type: "MCQ", question: "Bagaimanakah Si Bongsu membawa padi ke bumi?", answer: "Dia menyorok padi dalam tumit.", explanation: "Peristiwa ini menunjukkan kebijaksanaan Si Bongsu." },
      { type: "MCQ", question: "Apakah perwatakan Pemilik Padi?", answer: "Tegas dan berhati-hati.", explanation: "Pemilik Padi menjaga padi dan menangkap Si Bongsu." },
      { type: "MCQ", question: "Watak manakah yang amanah dan jujur?", answer: "Si Tekuri.", explanation: "Si Tekuri menjadi contoh nilai amanah." },
      { type: "Struktur", question: "Nyatakan tema Asal Padi.", answer: "Tema Asal Padi ialah kebijaksanaan dan kegigihan menyelesaikan masalah.", explanation: "Tema perlu menyebut kebijaksanaan dan usaha Si Bongsu." },
      { type: "Struktur", question: "Berikan satu perwatakan Si Bongsu.", answer: "Si Bongsu bijak kerana menyorok padi dalam tumit untuk membawanya ke bumi.", explanation: "Jawapan mesti ada sifat dan bukti." },
      { type: "Struktur", question: "Nyatakan satu pengajaran daripada cerita ini.", answer: "Kita hendaklah gigih berusaha untuk menyelesaikan masalah.", explanation: "Pengajaran perlu bermula dengan ayat tindakan." },
      { type: "KBAT", question: "Mengapakah manusia perlu menghargai padi sebagai rezeki?", answer: "Manusia perlu menghargai padi kerana padi diperoleh melalui usaha dan cabaran. Dalam kehidupan harian, kita tidak patut membazir nasi atau makanan.", explanation: "Kaitkan jawapan dengan cerita dan kehidupan murid." },
      { type: "KBAT", question: "Jika anda menghadapi masalah seperti Si Bongsu, apakah sikap yang perlu diamalkan?", answer: "Saya perlu gigih, berani dan bijak mencari jalan penyelesaian tanpa mudah berputus asa.", explanation: "Jawapan KBAT perlu menyatakan sikap dan sebab." },
    ],
  },
  {
    id: "cerpen-oren",
    title: "Oren",
    typeLabel: "Cerpen",
    kind: "story",
    studyTime: "15 minit",
    difficulty: "Mudah",
    examFocus: "Oren + Kelabu + Penyesalan Ayah",
    intro: "Cerpen ini nampak seperti kisah seekor kucing, tetapi sebenarnya mengajar murid tentang perhatian, tanggungjawab dan kasih sayang yang tidak boleh diberikan secara pilih kasih.",
    movieTrailer:
      "Ayah pernah menyelamatkan seekor anak kucing yang kehilangan ibunya. Namun apabila seekor kucing baharu muncul dalam keluarga, hubungan yang pernah erat mula berubah. Oren semakin menjauh, Ayah mula gelisah, dan sebuah penemuan akhirnya membuatkan penyesalan datang terlalu lewat.",
    story60: "Ayah mengambil Oren selepas ibu kucing itu mati. Oren hidup dalam keluarga dengan baik dan disayangi. Namun selepas Kelabu muncul, perhatian keluarga berubah. Oren terasa tersisih lalu menghilang. Mimpi Ayah dan penemuan Oren akhirnya menyedarkan keluarga bahawa kasih sayang tidak boleh diabaikan.",
    story90:
      "Cerpen Oren bermula dengan satu peristiwa yang menyedihkan. Ibu Oren mati, lalu Ayah mengambil Oren dan membawanya pulang. Pada awalnya, Oren menjadi sebahagian daripada keluarga. Oren bukan kucing yang menyusahkan. Dia berdisiplin, tidak gelojoh dan seolah-olah faham tempatnya dalam rumah. Keluarga Ayah menyayanginya, dan Oren pula setia kepada keluarga itu. Namun keadaan mula berubah apabila seekor kucing baharu bernama Kelabu muncul. Kelabu lebih manja, aktif dan suka mendapatkan perhatian. Sedikit demi sedikit, perhatian keluarga beralih kepada Kelabu. Oren yang dahulu disayangi mula terasa tersisih. Dia tidak melawan atau membuat masalah. Sebaliknya, Oren semakin menjauhkan diri. Di sinilah konflik sebenar berlaku. Bukan kerana Kelabu jahat, tetapi kerana kasih sayang keluarga menjadi tidak seimbang. Oren sensitif terhadap perubahan itu. Apabila Oren menghilang, barulah Ayah mula berasa tidak sedap hati. Ayah bermimpi tentang Oren, dan mimpi itu menggambarkan rasa bersalah yang mula mengganggunya. Kemudian, Oren ditemui. Penemuan itu membuatkan Ayah benar-benar tersentak. Dia sedar bahawa Oren pernah diselamatkan dan disayangi, tetapi akhirnya terabai apabila perhatian keluarga beralih kepada Kelabu. Penyesalan Ayah menjadi pengajaran besar dalam cerpen ini. Penulis mahu kita faham bahawa haiwan peliharaan juga mempunyai perasaan. Jika kita mengambil tanggungjawab menjaga sesuatu makhluk, kita perlu terus menyayanginya, bukan hanya ketika ia masih baharu atau menarik perhatian.",
    decoder: poemDecoder([
      ["Kematian ibu Oren", "Oren kehilangan ibunya, lalu Ayah mengambilnya kerana simpati.", "Belas kasihan.", "Kita hendaklah membantu makhluk yang memerlukan perlindungan."],
      ["Oren dalam keluarga", "Oren hidup sebagai kucing yang baik, setia dan tidak menyusahkan keluarga.", "Kasih sayang.", "Kita perlu menyayangi haiwan peliharaan dengan konsisten."],
      ["Kemunculan Kelabu", "Kelabu muncul dan menarik perhatian keluarga kerana sifatnya yang manja dan aktif.", "Keprihatinan.", "Kita hendaklah adil dalam memberikan perhatian."],
      ["Oren terasa terabai", "Oren mula menjauh kerana perhatian keluarga lebih tertumpu kepada Kelabu.", "Simpati.", "Kita perlu peka terhadap perubahan perasaan makhluk di sekeliling."],
      ["Oren hilang", "Kehilangan Oren membuat Ayah gelisah dan mula berasa bersalah.", "Tanggungjawab.", "Kita tidak boleh mengabaikan amanah menjaga haiwan."],
      ["Penyesalan Ayah", "Penemuan Oren membuat Ayah sedar bahawa kasih sayang tidak patut ditangguhkan.", "Keinsafan.", "Kita hendaklah menghargai sesuatu sebelum terlambat."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Ayah mengambil Oren selepas ibu Oren mati." },
      { stage: "Perkembangan", text: "Oren hidup dalam keluarga Ayah dan menjadi haiwan peliharaan yang baik." },
      { stage: "Konflik", text: "Kelabu muncul dan perhatian keluarga beralih daripada Oren kepada Kelabu." },
      { stage: "Klimaks", text: "Oren menghilang, Ayah bermimpi tentang Oren dan keluarga mula mencarinya." },
      { stage: "Peleraian", text: "Oren ditemui dan Ayah menyesal kerana menyedari Oren telah terabai." },
    ],
    characters: [
      { name: "Ayah", personality: "Penyayang, bertanggungjawab, bersimpati, mudah berasa bersalah dan prihatin.", evidence: "Mengambil Oren selepas kematian ibunya.", importance: "Menyampaikan tema kasih sayang terhadap haiwan." },
      { name: "Oren", personality: "Setia, berdisiplin, tidak menyusahkan, penyabar dan sensitif terhadap perhatian.", evidence: "Memberi peluang kepada Kelabu makan dahulu.", importance: "Menjadi simbol kasih sayang yang terabai." },
      { name: "Kelabu", personality: "Manja, aktif dan suka perhatian.", evidence: "Sentiasa mendampingi keluarga.", importance: "Mencetuskan konflik cerita." },
      { name: "Anis", personality: "Prihatin dan penyayang.", evidence: "Menemui Oren dan memberitahu keluarganya.", importance: "Membawa penyelesaian cerita." },
    ],
    events: [
      { event: "Ayah melanggar ibu Oren", whatHappened: "Ibu Oren mati dan Oren kehilangan tempat bergantung.", whyItMatters: "Memulakan rasa simpati Ayah terhadap Oren.", examFocus: "Soalan permulaan cerita dan nilai belas kasihan." },
      { event: "Ayah mengambil Oren", whatHappened: "Ayah membawa Oren pulang dan menjaganya.", whyItMatters: "Menunjukkan kasih sayang dan tanggungjawab Ayah.", examFocus: "Soalan perwatakan Ayah." },
      { event: "Oren hidup dalam keluarga", whatHappened: "Oren menjadi kucing yang baik, setia dan tidak menyusahkan.", whyItMatters: "Membina hubungan awal antara Oren dengan keluarga.", examFocus: "Soalan perwatakan Oren." },
      { event: "Kelabu muncul", whatHappened: "Kucing baharu hadir dan menarik perhatian keluarga.", whyItMatters: "Mencetuskan perubahan layanan terhadap Oren.", examFocus: "Soalan punca konflik." },
      { event: "Oren mula menjauhkan diri", whatHappened: "Oren terasa kurang diberi perhatian dan semakin menjauh.", whyItMatters: "Menunjukkan kesan pilih kasih terhadap haiwan peliharaan.", examFocus: "Soalan persoalan cemburu dan pengabaian." },
      { event: "Oren hilang", whatHappened: "Keluarga menyedari Oren tiada seperti biasa.", whyItMatters: "Membina ketegangan dan rasa bersalah Ayah.", examFocus: "Soalan klimaks." },
      { event: "Ayah bermimpi tentang Oren", whatHappened: "Mimpi itu menggambarkan keresahan dan rasa bersalah Ayah.", whyItMatters: "Menunjukkan penyesalan mula muncul.", examFocus: "Soalan maksud mimpi dan emosi Ayah." },
      { event: "Oren ditemui", whatHappened: "Anis menemui Oren dan memberitahu keluarga.", whyItMatters: "Membawa peleraian dan penyesalan Ayah.", examFocus: "Soalan peleraian dan pengajaran." },
    ],
    theme: {
      title: "Kasih sayang terhadap haiwan peliharaan",
      explanation: "Tema cerpen ini ialah kasih sayang dan tanggungjawab terhadap haiwan peliharaan. Ayah menyelamatkan Oren selepas ibu Oren mati, tetapi konflik muncul apabila perhatian keluarga berubah selepas Kelabu hadir.",
      whyItMatters: "Tema ini penting kerana murid perlu faham bahawa haiwan peliharaan bukan barang mainan. Apabila kita memilih untuk menjaga haiwan, kita perlu memberi makan, perhatian dan kasih sayang secara berterusan.",
    },
    values: [
      { value: "Belas kasihan", explanation: "Perasaan simpati yang mendorong kita membantu makhluk yang susah.", realLife: "Membantu haiwan kecil yang cedera dengan memanggil orang dewasa.", schoolLife: "Ayah mengambil Oren selepas kematian ibunya." },
      { value: "Simpati", explanation: "Memahami penderitaan atau kesedihan pihak lain.", realLife: "Tidak mengejek rakan yang sedang sedih.", schoolLife: "Ayah bersimpati terhadap Oren yang kehilangan ibu." },
      { value: "Keprihatinan", explanation: "Peka terhadap keadaan dan perubahan di sekeliling.", realLife: "Menyedari haiwan peliharaan kurang makan atau berubah sikap.", schoolLife: "Anis prihatin apabila menemui Oren dan memberitahu keluarga." },
      { value: "Tanggungjawab", explanation: "Melaksanakan amanah menjaga sesuatu dengan konsisten.", realLife: "Memberi makan dan membersihkan tempat haiwan peliharaan.", schoolLife: "Ayah bertanggungjawab mengambil dan menjaga Oren pada awalnya." },
      { value: "Kasih sayang", explanation: "Menyayangi makhluk lain melalui tindakan, bukan kata-kata sahaja.", realLife: "Tidak mengabaikan haiwan lama apabila mendapat haiwan baharu.", schoolLife: "Keluarga sepatutnya terus menyayangi Oren walaupun Kelabu hadir." },
    ],
    lessons: [
      { value: "Kita hendaklah menyayangi haiwan peliharaan", explanation: "Haiwan yang dipelihara bergantung kepada manusia untuk makan, perlindungan dan perhatian.", realLife: "Jaga haiwan peliharaan setiap hari.", schoolLife: "Ayah menyelamatkan Oren selepas ibu Oren mati." },
      { value: "Kita hendaklah berlaku adil dalam memberi kasih sayang", explanation: "Kasih sayang yang pilih kasih boleh membuat pihak lain terasa terabai.", realLife: "Tidak mengabaikan haiwan lama apabila ada haiwan baharu.", schoolLife: "Oren terasa tersisih selepas Kelabu mendapat lebih perhatian." },
      { value: "Kita hendaklah bertanggungjawab terhadap haiwan", explanation: "Mengambil haiwan bermaksud menerima amanah menjaganya.", realLife: "Pastikan haiwan diberi makan dan tempat tinggal yang sesuai.", schoolLife: "Ayah pernah bertanggungjawab membawa Oren pulang." },
      { value: "Kita hendaklah prihatin terhadap perubahan tingkah laku", explanation: "Perubahan sikap boleh menunjukkan kesedihan atau rasa tersisih.", realLife: "Perhatikan jika haiwan atau rakan semakin menjauh.", schoolLife: "Oren mula menjauhkan diri apabila kurang diberi perhatian." },
      { value: "Kita hendaklah menghargai sesuatu sebelum terlambat", explanation: "Penyesalan biasanya datang apabila kita sudah kehilangan peluang.", realLife: "Luangkan masa dengan keluarga dan haiwan peliharaan.", schoolLife: "Ayah menyesal selepas Oren hilang dan ditemui." },
      { value: "Kita hendaklah tidak menyalahkan pihak baharu", explanation: "Konflik berlaku kerana layanan manusia berubah, bukan kerana Kelabu jahat.", realLife: "Jangan menyalahkan adik baharu jika perhatian ibu bapa berubah.", schoolLife: "Kelabu hanya mencetus perubahan, bukan watak jahat." },
    ],
    teacherExplains: [
      "Ramai murid berfikir bahawa cerita ini hanya tentang seekor kucing. Sebenarnya penulis mahu menunjukkan bahawa perhatian dan kasih sayang tidak boleh diberikan secara pilih kasih.",
      "Kelabu bukan watak jahat. Kelabu cuma kucing baharu yang suka perhatian. Konflik berlaku kerana manusia gagal mengimbangkan kasih sayang.",
      "Oren pula bukan marah tanpa sebab. Oren sensitif kerana layanan yang pernah diterimanya berubah selepas Kelabu hadir.",
      "Mimpi Ayah penting kerana mimpi itu menunjukkan rasa bersalah yang mula muncul dalam dirinya sebelum penyesalan menjadi lebih kuat.",
    ],
    examBooster: {
      frequentPoints: [
        "Popular theme: kasih sayang terhadap haiwan peliharaan.",
        "Popular values: belas kasihan, simpati, prihatin, tanggungjawab, kasih sayang.",
        "Common focus: Oren sebagai simbol kasih sayang yang terabai.",
        "Soalan lazim: perwatakan Ayah, Oren, Kelabu dan Anis.",
        "Exam focus: penyesalan Ayah selepas Oren hilang dan ditemui.",
      ],
      commonQuestions: [
        q("Apakah tema cerpen Oren?", "Tema cerpen ini ialah kasih sayang dan tanggungjawab terhadap haiwan peliharaan.", "Tema perlu menyebut haiwan dan tanggungjawab.", "Jangan jawab 'cerita kucing' sahaja."),
        q("Mengapakah Oren penting?", "Oren penting kerana menjadi simbol kasih sayang yang terabai apabila perhatian keluarga beralih kepada Kelabu.", "Watak haiwan juga boleh membawa mesej.", "Gunakan perkataan 'simbol'."),
        q("Nyatakan pengajaran.", "Kita hendaklah menyayangi haiwan peliharaan secara adil dan tidak mengabaikannya.", "Pengajaran perlu jelas dan praktikal.", "Mulakan dengan 'Kita hendaklah'."),
      ],
    },
    issues: [
      { issue: "Kasih sayang terhadap haiwan", explanation: "Ayah menyelamatkan Oren selepas ibu Oren mati, menunjukkan manusia perlu menyayangi haiwan yang memerlukan perlindungan." },
      { issue: "Perasaan cemburu", explanation: "Oren terasa tersisih apabila Kelabu mendapat lebih perhatian daripada keluarga." },
      { issue: "Keprihatinan", explanation: "Anis menunjukkan sikap prihatin apabila menemui Oren dan memberitahu keluarganya." },
      { issue: "Penyesalan", explanation: "Ayah menyesal selepas menyedari Oren terabai dan hilang daripada perhatian keluarga." },
      { issue: "Tanggungjawab terhadap haiwan", explanation: "Haiwan peliharaan perlu dijaga secara berterusan, bukan hanya ketika mula-mula disayangi." },
    ],
    revision: {
      theme: "Kasih sayang terhadap haiwan peliharaan.",
      values: "Belas kasihan, simpati, keprihatinan, tanggungjawab, kasih sayang.",
      lessons: "Sayangi haiwan, berlaku adil, bertanggungjawab, prihatin, hargai sebelum terlambat.",
      examTips: "Ingat: Oren simbol kasih sayang yang terabai; Kelabu bukan watak jahat; penyesalan Ayah ialah mesej penting.",
    },
    miniQuiz: quiz("Apakah tema cerpen Oren?", "Oren dengan simbol kasih sayang.", "Bagaimanakah murid menunjukkan tanggungjawab terhadap haiwan?"),
    detailedPlot: [
      { stage: "Permulaan", what: "Ibu Oren mati dan Ayah mengambil Oren untuk dijaga.", why: "Ayah berasa simpati terhadap anak kucing yang kehilangan ibunya.", effect: "Hubungan kasih sayang antara Ayah, keluarga dan Oren bermula." },
      { stage: "Perkembangan", what: "Oren hidup dengan baik dalam keluarga dan menjadi kucing yang berdisiplin serta tidak menyusahkan.", why: "Oren sudah selesa dengan keluarga yang menjaganya.", effect: "Pembaca melihat Oren sebagai haiwan yang setia dan disayangi." },
      { stage: "Konflik", what: "Kelabu muncul dan perhatian keluarga mula beralih kepada kucing baharu itu.", why: "Kelabu lebih manja, aktif dan sering mendampingi keluarga.", effect: "Oren terasa tersisih dan mula menjauhkan diri." },
      { stage: "Klimaks", what: "Oren hilang dan Ayah bermimpi tentang Oren.", why: "Kehilangan Oren membuat Ayah mula berasa gelisah dan bersalah.", effect: "Penyesalan Ayah mula jelas kepada pembaca." },
      { stage: "Peleraian", what: "Oren ditemui oleh Anis dan Ayah menyesal atas pengabaian yang berlaku.", why: "Penemuan Oren menyedarkan keluarga tentang kesan kurang perhatian.", effect: "Cerita berakhir dengan pengajaran tentang kasih sayang dan tanggungjawab." },
    ],
    masterCharacters: [
      { name: "Ayah", role: "Watak utama manusia.", traits: ["Penyayang", "Bertanggungjawab", "Bersimpati", "Mudah berasa bersalah", "Prihatin"], evidence: "Mengambil Oren selepas kematian ibunya.", relationships: "Menyayangi Oren dan Kelabu, tetapi akhirnya menyesal kerana perhatian terhadap Oren berkurang.", importance: "Menyampaikan tema kasih sayang terhadap haiwan." },
      { name: "Oren", role: "Watak utama haiwan.", traits: ["Setia", "Berdisiplin", "Tidak menyusahkan", "Penyabar", "Sensitif terhadap perhatian"], evidence: "Memberi peluang kepada Kelabu makan dahulu.", relationships: "Pernah rapat dengan keluarga tetapi terasa tersisih selepas Kelabu muncul.", importance: "Menjadi simbol kasih sayang yang terabai." },
      { name: "Kelabu", role: "Watak sampingan.", traits: ["Manja", "Aktif", "Suka perhatian"], evidence: "Sentiasa mendampingi keluarga.", relationships: "Menarik perhatian keluarga dan menyebabkan Oren terasa tersisih.", importance: "Mencetuskan konflik cerita." },
      { name: "Anis", role: "Anak Ayah.", traits: ["Prihatin", "Penyayang"], evidence: "Menemui Oren dan memberitahu keluarganya.", relationships: "Mempunyai hubungan penyayang dengan Oren dan keluarga.", importance: "Membawa penyelesaian cerita." },
    ],
    relationshipMap: [
      { from: "Ayah", relation: "menyayangi", to: "Oren", explanation: "Ayah menyelamatkan Oren selepas kematian ibunya, tetapi hubungan ini diuji apabila perhatian Ayah berubah." },
      { from: "Ayah", relation: "menyayangi", to: "Kelabu", explanation: "Kelabu mendapat perhatian kerana sifatnya yang manja dan aktif, lalu mencetus perubahan dalam keluarga." },
      { from: "Oren", relation: "terkesan oleh", to: "Kelabu", explanation: "Oren tidak memusuhi Kelabu, tetapi kehadiran Kelabu membuat Oren terasa kurang diberi perhatian." },
      { from: "Anis", relation: "prihatin terhadap", to: "Oren", explanation: "Anis membantu membawa peleraian cerita apabila menemui Oren dan memberitahu keluarga." },
    ],
    importantEvents: [
      { event: "Ayah melanggar ibu Oren", what: "Ibu Oren mati dan Oren kehilangan ibunya.", whyImportant: "Peristiwa ini menyebabkan Ayah bersimpati.", possibleQuestion: "Apakah peristiwa awal yang menyebabkan Ayah mengambil Oren?" },
      { event: "Ayah mengambil Oren", what: "Ayah membawa Oren pulang dan menjaganya.", whyImportant: "Menunjukkan belas kasihan dan tanggungjawab Ayah.", possibleQuestion: "Nyatakan perwatakan Ayah." },
      { event: "Oren hidup dalam keluarga", what: "Oren menjadi kucing yang baik dan setia.", whyImportant: "Membina hubungan erat Oren dengan keluarga.", possibleQuestion: "Huraikan perwatakan Oren." },
      { event: "Kelabu muncul", what: "Kucing baharu hadir dalam keluarga.", whyImportant: "Mencetuskan perubahan perhatian keluarga.", possibleQuestion: "Apakah punca konflik dalam cerpen?" },
      { event: "Oren mula menjauhkan diri", what: "Oren terasa kurang diberi perhatian.", whyImportant: "Menonjolkan persoalan perasaan cemburu dan pengabaian.", possibleQuestion: "Mengapakah Oren menjauhkan diri?" },
      { event: "Oren hilang", what: "Oren tidak kelihatan dan keluarga mula menyedarinya.", whyImportant: "Menjadi titik tegang cerita.", possibleQuestion: "Apakah peristiwa klimaks cerpen?" },
      { event: "Ayah bermimpi tentang Oren", what: "Ayah bermimpi dan mula berasa bersalah.", whyImportant: "Menunjukkan penyesalan Ayah.", possibleQuestion: "Apakah maksud mimpi Ayah?" },
      { event: "Oren ditemui", what: "Anis menemui Oren dan memberitahu keluarga.", whyImportant: "Membawa peleraian dan pengajaran.", possibleQuestion: "Apakah pengajaran daripada penemuan Oren?" },
    ],
    keyCharacterFocus: {
      name: "Oren",
      whyMatters: "Oren penting kerana menjadi pusat konflik dan simbol kasih sayang yang terabai.",
      supportsTheme: "Oren menunjukkan bahawa haiwan peliharaan memerlukan kasih sayang yang konsisten.",
      supportsIssues: "Watak Oren menonjolkan persoalan cemburu, pengabaian, penyesalan dan tanggungjawab.",
      supportsValues: "Oren membantu menonjolkan nilai belas kasihan, simpati, keprihatinan dan kasih sayang.",
      supportsLessons: "Melalui Oren, murid belajar supaya tidak mengabaikan haiwan atau pihak yang pernah disayangi.",
    },
    authorPurpose: "Cerpen Oren ditulis untuk menyedarkan pembaca bahawa haiwan peliharaan juga memerlukan perhatian dan kasih sayang. Penulis mahu menunjukkan bahawa kasih sayang yang pilih kasih boleh menyebabkan pihak yang terabai terluka, dan penyesalan mungkin datang selepas kita kehilangan peluang untuk membetulkan keadaan.",
    examCharacterAnalysis: [
      { character: "Ayah", trait: "Penyayang", evidence: "Mengambil Oren selepas kematian ibunya.", modelAnswer: "Ayah penyayang kerana dia menyelamatkan Oren yang kehilangan ibu dan membawanya pulang untuk dijaga." },
      { character: "Ayah", trait: "Mudah berasa bersalah", evidence: "Bermimpi tentang Oren selepas Oren hilang.", modelAnswer: "Ayah mudah berasa bersalah kerana mimpi tentang Oren menunjukkan keresahan dan penyesalannya." },
      { character: "Oren", trait: "Penyabar", evidence: "Memberi peluang kepada Kelabu makan dahulu.", modelAnswer: "Oren penyabar kerana tidak berebut dan memberi peluang kepada Kelabu makan dahulu." },
      { character: "Kelabu", trait: "Manja", evidence: "Sentiasa mendampingi keluarga.", modelAnswer: "Kelabu manja kerana sering berada dekat dengan keluarga dan suka mendapatkan perhatian." },
      { character: "Anis", trait: "Prihatin", evidence: "Menemui Oren dan memberitahu keluarganya.", modelAnswer: "Anis prihatin kerana segera memberitahu keluarga apabila menemui Oren." },
    ],
    memory60: {
      theme: "Kasih sayang terhadap haiwan peliharaan.",
      issues: "Kasih sayang haiwan, cemburu, prihatin, penyesalan, tanggungjawab.",
      mainCharacters: "Ayah, Oren, Kelabu, Anis.",
      importantEvents: "Ibu Oren mati, Ayah mengambil Oren, Kelabu muncul, Oren hilang, Ayah bermimpi, Oren ditemui.",
      values: "Belas kasihan, simpati, keprihatinan, tanggungjawab, kasih sayang.",
      lessons: "Sayangi haiwan, berlaku adil, bertanggungjawab, prihatin, hargai sebelum terlambat.",
    },
    uasaQuestions: [
      { type: "MCQ", question: "Mengapakah Ayah mengambil Oren?", answer: "Kerana ibu Oren mati dan Ayah bersimpati terhadap Oren.", explanation: "Peristiwa ini menunjukkan nilai belas kasihan Ayah." },
      { type: "MCQ", question: "Apakah kesan kemunculan Kelabu?", answer: "Perhatian keluarga terhadap Oren berkurang.", explanation: "Kelabu mencetus konflik kerana keluarga lebih memberi perhatian kepadanya." },
      { type: "MCQ", question: "Mengapakah Oren mula menjauhkan diri?", answer: "Oren terasa terabai apabila perhatian keluarga berubah.", explanation: "Oren sensitif terhadap perubahan layanan keluarga." },
      { type: "MCQ", question: "Siapakah yang menemui Oren?", answer: "Anis.", explanation: "Anis membawa peleraian cerita dengan memberitahu keluarga tentang Oren." },
      { type: "MCQ", question: "Apakah nilai utama yang terdapat dalam cerpen Oren?", answer: "Kasih sayang terhadap haiwan.", explanation: "Cerpen ini menekankan tanggungjawab manusia terhadap haiwan peliharaan." },
      { type: "Struktur", question: "Nyatakan tema cerpen Oren.", answer: "Tema cerpen Oren ialah kasih sayang terhadap haiwan peliharaan.", explanation: "Tema perlu menyebut kasih sayang dan haiwan peliharaan." },
      { type: "Struktur", question: "Berikan satu perwatakan Oren.", answer: "Oren penyabar kerana memberi peluang kepada Kelabu makan dahulu.", explanation: "Jawapan perwatakan perlu ada bukti." },
      { type: "Struktur", question: "Apakah konflik utama dalam cerpen?", answer: "Konflik utama ialah Oren terasa terabai apabila keluarga lebih memberi perhatian kepada Kelabu.", explanation: "Konflik bukan kerana Kelabu jahat, tetapi kerana layanan keluarga berubah." },
      { type: "Struktur", question: "Nyatakan satu pengajaran cerpen.", answer: "Kita hendaklah menyayangi haiwan peliharaan secara adil dan tidak mengabaikannya.", explanation: "Pengajaran mesti berbentuk tindakan." },
      { type: "Struktur", question: "Apakah kepentingan mimpi Ayah?", answer: "Mimpi Ayah menunjukkan rasa bersalah dan penyesalan terhadap Oren.", explanation: "Mimpi membantu pembaca memahami emosi Ayah." },
      { type: "KBAT", question: "Jika keluarga Ayah lebih awal menyedari perubahan Oren, apakah yang patut mereka lakukan?", answer: "Mereka patut memberi perhatian semula kepada Oren, memastikan Oren makan dengan baik dan tidak membezakan kasih sayang antara Oren dengan Kelabu.", explanation: "Jawapan KBAT perlu memberi tindakan yang sesuai dan matang." },
      { type: "KBAT", question: "Adakah Kelabu boleh dianggap watak jahat? Jelaskan.", answer: "Tidak. Kelabu hanya kucing baharu yang manja dan suka perhatian. Konflik berlaku kerana keluarga tidak mengimbangkan kasih sayang terhadap Oren.", explanation: "Jawapan perlu membetulkan salah tafsir watak Kelabu." },
      { type: "KBAT", question: "Bagaimanakah murid boleh mengamalkan tanggungjawab terhadap haiwan?", answer: "Murid boleh memberi makan, menyediakan tempat selamat, tidak menyakiti haiwan dan meminta bantuan orang dewasa jika haiwan sakit atau cedera.", explanation: "Kaitkan jawapan dengan kehidupan sebenar murid." },
    ],
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
    studyTime: "16 minit",
    difficulty: "Sederhana",
    examFocus: "Lim Meng + Kebenaran + Kasih Sayang Keluarga",
    intro: "Cerpen ini mengisahkan keluarga yang retak akibat prasangka dan rahsia lama. Menjelang Tahun Baharu Cina, kepulangan Lim Meng membuka semula luka lama, tetapi kebenaran akhirnya menyatukan keluarga.",
    movieTrailer:
      "Selama bertahun-tahun, Lim Meng dianggap pembawa malang oleh bapanya sendiri. Menjelang Tahun Baharu Cina, sebuah kebenaran yang disembunyikan akhirnya terbongkar. Mampukah sebuah keluarga yang retak disatukan semula?",
    story60: "Lim Meng pulang menjelang Tahun Baharu Cina, tetapi kepulangannya disambut kemarahan Lim Pooi. Dia dituduh membawa malang kepada keluarga, sedangkan punca sebenar masalah berkaitan Lim Foong. Sim Pau akhirnya berani mendedahkan kebenaran. Lim Pooi insaf, meminta maaf dan keluarga kembali bersatu.",
    story90:
      "Bayangkan suasana Tahun Baharu Cina yang sepatutnya penuh kegembiraan. Dalam cerpen Kuih Bakul Limau Mandarin, suasana itu menjadi tegang apabila Lim Meng pulang ke rumah. Lim Meng bukan pulang untuk mencari gaduh. Dia masih ingin menyambut perayaan bersama keluarganya walaupun selama bertahun-tahun dia dilayan seperti orang luar. Masalahnya, bapanya, Lim Pooi, sangat marah apabila melihat Lim Meng. Lim Pooi percaya Lim Meng ialah pembawa malang kepada keluarga. Tuduhan itu sudah lama menghantui Lim Meng. Walaupun hatinya terluka, Lim Meng tetap tabah dan tidak berdendam terhadap bapanya. Di sebalik kemarahan Lim Pooi, ada kisah lain yang lebih menyakitkan. Lim Foong, anak yang lebih disayangi oleh Lim Pooi, sebenarnya mempunyai masalah sendiri. Dia tidak bertanggungjawab, terlibat dengan judi, berhutang dan mencuri wang kedai. Namun kesalahan itu seolah-olah tertutup kerana Lim Meng yang dipersalahkan selama ini. Konflik keluarga semakin kuat kerana kebenaran tidak diberitahu. Sim Pau, ibu Lim Meng, tidak sanggup lagi melihat anaknya terus dihukum atas kesalahan yang bukan miliknya. Dengan penuh keberanian, Sim Pau mendedahkan kebenaran kepada Lim Pooi. Pendedahan itu menjadi titik paling penting dalam cerita. Lim Pooi akhirnya sedar bahawa dia telah bersikap prejudis dan cepat membuat tuduhan. Dia insaf kerana selama ini menyalahkan anak yang tidak bersalah. Permohonan maaf Lim Pooi membuka jalan kepada penyatuan semula keluarga. Kuih bakul dan limau mandarin menjadi lambang perayaan, tetapi mesej besarnya ialah kebenaran dan kasih sayang mampu menyembuhkan hubungan yang retak.",
    decoder: poemDecoder([
      ["Kepulangan Lim Meng", "Lim Meng pulang menjelang Tahun Baharu Cina walaupun tahu bapanya masih marah kepadanya.", "Kesabaran.", "Kita hendaklah menghormati ibu bapa walaupun hubungan sedang tegang."],
      ["Kemarahan Lim Pooi", "Lim Pooi menuduh Lim Meng sebagai pembawa malang dan tidak mahu menerima kepulangannya.", "Keinsafan.", "Kita tidak boleh membuat tuduhan tanpa mengetahui kebenaran."],
      ["Rahsia Lim Foong", "Masalah sebenar keluarga berkaitan sikap Lim Foong yang tidak bertanggungjawab.", "Bertanggungjawab.", "Kita hendaklah menjauhi perbuatan buruk seperti berjudi dan mencuri."],
      ["Keberanian Sim Pau", "Sim Pau berani mendedahkan kebenaran walaupun berdepan kemarahan suami.", "Keberanian.", "Kita hendaklah bercakap benar demi keadilan."],
      ["Keinsafan Lim Pooi", "Lim Pooi sedar kesilapannya selepas mengetahui kebenaran.", "Keinsafan.", "Kita hendaklah meminta maaf apabila melakukan kesalahan."],
      ["Keluarga bersatu semula", "Kebenaran dan permohonan maaf memulihkan hubungan keluarga.", "Kasih sayang.", "Kita hendaklah menjaga hubungan keluarga dengan jujur dan sabar."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Lim Meng pulang ke rumah menjelang Tahun Baharu Cina." },
      { stage: "Perkembangan", text: "Lim Pooi marah dan masih menganggap Lim Meng pembawa malang." },
      { stage: "Konflik", text: "Konflik keluarga berlaku kerana Lim Meng dipersalahkan, sedangkan kisah Lim Foong disembunyikan." },
      { stage: "Klimaks", text: "Sim Pau berani mendedahkan kebenaran tentang Lim Foong kepada Lim Pooi." },
      { stage: "Peleraian", text: "Lim Pooi insaf, meminta maaf dan keluarga disatukan semula." },
    ],
    characters: [
      { name: "Lim Meng", personality: "Tabah, penyabar, menghormati ibu bapa dan tidak berdendam.", evidence: "Walaupun dihalau dan dituduh, dia masih ingin pulang menyambut Tahun Baharu Cina.", importance: "Menonjolkan nilai kesabaran dan kasih sayang anak terhadap keluarga." },
      { name: "Lim Pooi", personality: "Keras kepala, cepat membuat tuduhan, sayang keluarga dan insaf pada akhirnya.", evidence: "Menyalahkan Lim Meng selama bertahun-tahun sebelum mengetahui kebenaran.", importance: "Menggerakkan konflik dan menunjukkan bahaya prasangka." },
      { name: "Sim Pau", personality: "Penyayang, berani, sabar dan jujur.", evidence: "Mendedahkan kebenaran kepada suaminya demi membela Lim Meng.", importance: "Menjadi watak yang menyelesaikan konflik keluarga." },
      { name: "Lim Foong", personality: "Tidak bertanggungjawab dan kaki judi.", evidence: "Berhutang dan mencuri wang kedai.", importance: "Menjadi punca sebenar masalah keluarga yang selama ini disalah faham." },
    ],
    events: [
      { event: "Lim Meng pulang", whatHappened: "Lim Meng pulang menjelang Tahun Baharu Cina.", whyItMatters: "Memulakan konflik keluarga.", examFocus: "Soalan permulaan dan latar masa." },
      { event: "Lim Pooi marah", whatHappened: "Lim Pooi menolak kepulangan Lim Meng.", whyItMatters: "Menunjukkan sikap prejudis seorang bapa.", examFocus: "Soalan perwatakan Lim Pooi." },
      { event: "Lim Meng dituduh pembawa malang", whatHappened: "Lim Meng dipersalahkan atas nasib buruk keluarga.", whyItMatters: "Menonjolkan konflik utama.", examFocus: "Soalan konflik dan persoalan prejudis." },
      { event: "Kisah Lim Foong terbongkar", whatHappened: "Masalah Lim Foong yang berjudi, berhutang dan mencuri menjadi punca sebenar.", whyItMatters: "Mengubah pemahaman pembaca tentang konflik.", examFocus: "Soalan punca sebenar masalah." },
      { event: "Sim Pau berani bersuara", whatHappened: "Sim Pau mendedahkan kebenaran kepada Lim Pooi.", whyItMatters: "Menjadi klimaks dan titik penyelesaian.", examFocus: "Soalan peranan Sim Pau." },
      { event: "Lim Pooi mengetahui kebenaran", whatHappened: "Lim Pooi sedar bahawa tuduhannya terhadap Lim Meng salah.", whyItMatters: "Membawa nilai keinsafan.", examFocus: "Soalan nilai dan pengajaran." },
      { event: "Lim Pooi meminta maaf", whatHappened: "Lim Pooi menyesal dan memohon maaf kepada Lim Meng.", whyItMatters: "Menunjukkan penyelesaian konflik.", examFocus: "Soalan peleraian." },
      { event: "Keluarga bersatu semula", whatHappened: "Hubungan keluarga yang retak dipulihkan.", whyItMatters: "Menguatkan tema kasih sayang dan kebenaran.", examFocus: "Soalan tema dan KBAT." },
    ],
    theme: {
      title: "Kepentingan kebenaran dan kasih sayang keluarga dalam menyatukan hubungan yang retak",
      explanation: "Tema cerpen ini ialah kebenaran yang akhirnya memulihkan hubungan keluarga. Lim Meng lama dipersalahkan kerana prasangka Lim Pooi. Apabila Sim Pau berani memberitahu perkara sebenar, Lim Pooi insaf dan keluarga dapat disatukan semula.",
      whyItMatters: "Dalam kehidupan murid, salah faham boleh merosakkan hubungan dengan keluarga dan rakan. Cerpen ini mengajar kita supaya tidak cepat menuduh dan berani bercakap benar.",
    },
    values: [
      { value: "Kasih sayang", explanation: "Perasaan sayang yang mendorong seseorang menjaga hubungan keluarga.", realLife: "Memaafkan ahli keluarga selepas salah faham.", schoolLife: "Tidak memutuskan hubungan dengan rakan kerana pertengkaran kecil." },
      { value: "Kejujuran", explanation: "Bercakap benar walaupun sukar.", realLife: "Mengaku kesilapan sebelum orang lain dipersalahkan.", schoolLife: "Tidak menipu guru apabila berlaku masalah kumpulan." },
      { value: "Keberanian", explanation: "Sanggup melakukan perkara betul walaupun berisiko.", realLife: "Berani menegur perbuatan salah.", schoolLife: "Sim Pau berani mendedahkan kebenaran kepada Lim Pooi." },
      { value: "Kesabaran", explanation: "Mampu menahan perasaan ketika diuji.", realLife: "Bertenang apabila dimarahi tanpa sebab.", schoolLife: "Lim Meng tetap pulang walaupun pernah dihalau dan dituduh." },
      { value: "Keinsafan", explanation: "Sedar akan kesalahan dan mahu berubah.", realLife: "Meminta maaf selepas menyakiti hati orang.", schoolLife: "Lim Pooi insaf selepas mengetahui kebenaran." },
      { value: "Bertanggungjawab", explanation: "Menanggung akibat perbuatan sendiri dan tidak menyusahkan orang lain.", realLife: "Membayar hutang dan tidak mengambil barang orang.", schoolLife: "Kisah Lim Foong menjadi contoh akibat tidak bertanggungjawab." },
    ],
    lessons: [
      { value: "Kita hendaklah bercakap benar", explanation: "Kebenaran dapat menyelesaikan salah faham.", realLife: "Berterus terang jika melihat seseorang dipersalahkan.", schoolLife: "Sim Pau mendedahkan kebenaran kepada Lim Pooi." },
      { value: "Kita hendaklah tidak cepat membuat tuduhan", explanation: "Tuduhan tanpa bukti boleh merosakkan hubungan.", realLife: "Tanya dahulu sebelum menyalahkan adik atau rakan.", schoolLife: "Lim Pooi tersilap kerana menuduh Lim Meng pembawa malang." },
      { value: "Kita hendaklah menyayangi keluarga", explanation: "Kasih sayang membantu memulihkan hubungan yang retak.", realLife: "Memberi peluang kepada ahli keluarga menjelaskan diri.", schoolLife: "Lim Meng masih mahu pulang walaupun dilukai." },
      { value: "Kita hendaklah menjauhi perjudian", explanation: "Perjudian membawa hutang, penipuan dan kerosakan keluarga.", realLife: "Tidak terlibat dengan pertaruhan wang.", schoolLife: "Lim Foong menjadi contoh buruk akibat berjudi." },
      { value: "Kita hendaklah berani membetulkan kesalahan", explanation: "Berdiam diri boleh menyebabkan orang tidak bersalah terus dihukum.", realLife: "Berani menjadi saksi jika tahu kebenaran.", schoolLife: "Sim Pau berani membela Lim Meng." },
      { value: "Kita hendaklah meminta maaf apabila bersalah", explanation: "Permohonan maaf ialah langkah memulihkan hubungan.", realLife: "Mengaku salah selepas menuduh orang tanpa bukti.", schoolLife: "Lim Pooi insaf dan meminta maaf kepada Lim Meng." },
    ],
    teacherExplains: [
      "Ramai murid beranggapan cerita ini hanya tentang pergaduhan keluarga. Sebenarnya cerita ini mengajar kita bahawa prasangka boleh merosakkan hubungan yang paling rapat.",
      "Lim Meng bukan punca masalah sebenar. Dia ialah mangsa tuduhan. Punca yang lebih besar ialah rahsia tentang Lim Foong dan sikap Lim Pooi yang cepat menghukum.",
      "Sim Pau sangat penting kerana tanpa keberaniannya, kebenaran tidak akan terbongkar dan Lim Meng terus dipersalahkan.",
      "Kuih bakul dan limau mandarin membawa suasana Tahun Baharu Cina, tetapi mesej paling kuat ialah keluarga hanya boleh pulih apabila kebenaran diterima.",
    ],
    examBooster: {
      frequentPoints: [
        "Popular theme: kebenaran dan kasih sayang keluarga.",
        "Popular values: kasih sayang, kejujuran, keberanian, keinsafan.",
        "Common focus: Lim Meng bukan punca sebenar masalah.",
        "Soalan lazim: peranan Sim Pau dalam menyelesaikan konflik.",
        "Peristiwa penting: pendedahan kebenaran dan keinsafan Lim Pooi.",
      ],
      commonQuestions: [
        q("Apakah tema cerpen ini?", "Tema cerpen ini ialah kepentingan kebenaran dan kasih sayang keluarga dalam menyatukan hubungan yang retak.", "Tema perlu menyebut kebenaran dan hubungan keluarga.", "Jangan jawab 'Tahun Baharu Cina' sebagai tema."),
        q("Nyatakan perwatakan Lim Meng.", "Lim Meng tabah kerana masih pulang menyambut Tahun Baharu Cina walaupun pernah dihalau dan dituduh.", "Perwatakan mesti disokong bukti cerita.", "Watak + sifat + bukti."),
        q("Apakah peranan Sim Pau?", "Sim Pau berperanan mendedahkan kebenaran sehingga Lim Pooi insaf dan keluarga dapat disatukan semula.", "Sim Pau ialah pencetus penyelesaian konflik.", "Jangan abaikan watak ibu dalam jawapan."),
      ],
    },
    issues: [
      { issue: "Sikap prejudis dalam keluarga", explanation: "Lim Pooi cepat percaya bahawa Lim Meng membawa malang tanpa memahami kebenaran sebenar." },
      { issue: "Kasih sayang seorang ibu", explanation: "Sim Pau tetap menyayangi Lim Meng dan berani membelanya walaupun berdepan suami sendiri." },
      { issue: "Kesan perjudian", explanation: "Perbuatan Lim Foong berjudi dan berhutang menyebabkan masalah kewangan serta konflik keluarga." },
      { issue: "Kepentingan bercakap benar", explanation: "Kebenaran yang didedahkan oleh Sim Pau membebaskan Lim Meng daripada tuduhan salah." },
      { issue: "Keinsafan atas kesalahan", explanation: "Lim Pooi akhirnya sedar kesilapannya dan meminta maaf kepada Lim Meng." },
    ],
    revision: {
      theme: "Kebenaran dan kasih sayang keluarga menyatukan hubungan yang retak.",
      values: "Kasih sayang, kejujuran, keberanian, kesabaran, keinsafan, bertanggungjawab.",
      lessons: "Bercakap benar, jangan cepat menuduh, sayangi keluarga, jauhi perjudian, berani membela kebenaran, minta maaf.",
      examTips: "Ingat: Lim Meng ialah mangsa tuduhan; Sim Pau membongkar kebenaran; Lim Foong punca sebenar masalah.",
    },
    miniQuiz: quiz("Apakah punca sebenar konflik keluarga?", "Sim Pau dengan nilai keberanian.", "Mengapakah kebenaran penting dalam memulihkan hubungan keluarga?"),
    detailedPlot: [
      { stage: "Permulaan", what: "Lim Meng pulang ke rumah menjelang Tahun Baharu Cina.", why: "Dia masih menghargai keluarga dan mahu menyambut perayaan bersama.", effect: "Kepulangannya membuka semula konflik lama." },
      { stage: "Perkembangan", what: "Lim Pooi marah dan menuduh Lim Meng sebagai pembawa malang.", why: "Lim Pooi dipengaruhi prasangka lama terhadap anaknya.", effect: "Pembaca melihat hubungan bapa dan anak yang retak." },
      { stage: "Konflik", what: "Lim Meng dipersalahkan sedangkan masalah sebenar berkaitan Lim Foong.", why: "Kebenaran tentang Lim Foong belum didedahkan.", effect: "Ketegangan keluarga semakin kuat dan Lim Meng terus terluka." },
      { stage: "Klimaks", what: "Sim Pau berani mendedahkan kebenaran tentang Lim Foong.", why: "Dia tidak sanggup lagi melihat Lim Meng terus difitnah.", effect: "Lim Pooi mula sedar bahawa tuduhannya selama ini salah." },
      { stage: "Peleraian", what: "Lim Pooi insaf, meminta maaf dan keluarga disatukan semula.", why: "Kebenaran telah diterima dan kasih sayang keluarga masih wujud.", effect: "Cerita berakhir dengan pemulihan hubungan keluarga." },
    ],
    masterCharacters: [
      { name: "Lim Meng", role: "Watak utama.", traits: ["Tabah", "Penyabar", "Menghormati ibu bapa", "Tidak berdendam"], evidence: "Walaupun dihalau, masih ingin pulang menyambut Tahun Baharu Cina.", relationships: "Disayangi Sim Pau tetapi ditolak oleh Lim Pooi kerana salah faham.", importance: "Menunjukkan kesan buruk prasangka dan kekuatan kasih sayang anak." },
      { name: "Lim Pooi", role: "Bapa kepada Lim Meng.", traits: ["Keras kepala", "Cepat membuat tuduhan", "Sayang keluarga", "Insaf pada akhirnya"], evidence: "Menyalahkan Lim Meng selama bertahun-tahun.", relationships: "Berhubungan tegang dengan Lim Meng dan akhirnya berubah selepas diberitahu Sim Pau.", importance: "Menjadi punca konflik dan menunjukkan nilai keinsafan." },
      { name: "Sim Pau", role: "Ibu kepada Lim Meng.", traits: ["Penyayang", "Berani", "Sabar", "Jujur"], evidence: "Mendedahkan kebenaran kepada suaminya.", relationships: "Menyayangi Lim Meng dan berani berhadapan dengan Lim Pooi.", importance: "Watak penyelesai konflik yang membawa kebenaran." },
      { name: "Lim Foong", role: "Anak kesayangan Lim Pooi.", traits: ["Tidak bertanggungjawab", "Kaki judi"], evidence: "Berhutang dan mencuri wang kedai.", relationships: "Perbuatannya menjejaskan keluarga dan menyebabkan Lim Meng dipersalahkan.", importance: "Menjadi punca sebenar masalah keluarga." },
    ],
    relationshipMap: [
      { from: "Lim Meng", relation: "disayangi oleh", to: "Sim Pau", explanation: "Sim Pau tetap membela Lim Meng kerana kasih sayang seorang ibu tidak mudah hilang." },
      { from: "Lim Meng", relation: "ditolak oleh", to: "Lim Pooi", explanation: "Hubungan bapa dan anak retak kerana Lim Pooi mempercayai tuduhan bahawa Lim Meng membawa malang." },
      { from: "Sim Pau", relation: "berterus terang dengan", to: "Lim Pooi", explanation: "Keberanian Sim Pau mendedahkan kebenaran mengubah arah cerita." },
      { from: "Lim Foong", relation: "mencetus konflik", to: "Keluarga", explanation: "Perbuatan Lim Foong berjudi, berhutang dan mencuri menyebabkan keluarga porak-peranda." },
    ],
    importantEvents: [
      { event: "Lim Meng pulang menjelang Tahun Baharu Cina", what: "Lim Meng kembali ke rumah untuk bersama keluarga.", whyImportant: "Memulakan cerita dan memperkenalkan konflik lama.", possibleQuestion: "Apakah peristiwa yang memulakan konflik?" },
      { event: "Lim Pooi memarahi Lim Meng", what: "Lim Pooi tidak menerima kepulangan anaknya.", whyImportant: "Menunjukkan perwatakan keras kepala dan prejudis.", possibleQuestion: "Huraikan perwatakan Lim Pooi." },
      { event: "Lim Meng dituduh pembawa malang", what: "Lim Meng dipersalahkan atas masalah keluarga.", whyImportant: "Menjadi konflik utama cerpen.", possibleQuestion: "Apakah konflik utama cerita?" },
      { event: "Kisah Lim Foong diketahui", what: "Lim Foong dikaitkan dengan judi, hutang dan kecurian wang kedai.", whyImportant: "Mendedahkan punca sebenar masalah.", possibleQuestion: "Mengapakah Lim Foong penting dalam cerita?" },
      { event: "Sim Pau berani mendedahkan kebenaran", what: "Sim Pau memberitahu Lim Pooi perkara sebenar.", whyImportant: "Menjadi klimaks cerita.", possibleQuestion: "Nyatakan nilai yang ditunjukkan oleh Sim Pau." },
      { event: "Lim Pooi sedar kesilapan", what: "Lim Pooi memahami bahawa tuduhannya terhadap Lim Meng salah.", whyImportant: "Menunjukkan nilai keinsafan.", possibleQuestion: "Apakah pengajaran daripada keinsafan Lim Pooi?" },
      { event: "Lim Pooi meminta maaf", what: "Lim Pooi memohon maaf kepada Lim Meng.", whyImportant: "Menjadi langkah pemulihan hubungan.", possibleQuestion: "Bagaimanakah konflik diselesaikan?" },
      { event: "Keluarga bersatu semula", what: "Hubungan keluarga dipulihkan selepas kebenaran terbongkar.", whyImportant: "Menguatkan tema kasih sayang keluarga.", possibleQuestion: "Apakah tema cerpen ini?" },
    ],
    keyCharacterFocus: {
      name: "Sim Pau",
      whyMatters: "Sim Pau penting kerana keberaniannya mendedahkan kebenaran menyelesaikan konflik utama.",
      supportsTheme: "Sim Pau membuktikan bahawa kebenaran dan kasih sayang keluarga dapat menyatukan hubungan yang retak.",
      supportsIssues: "Wataknya menonjolkan persoalan kasih sayang ibu dan kepentingan bercakap benar.",
      supportsValues: "Sim Pau menunjukkan nilai kasih sayang, kejujuran, keberanian dan kesabaran.",
      supportsLessons: "Melalui Sim Pau, murid belajar supaya berani membela kebenaran dan tidak membiarkan orang tidak bersalah terus dihukum.",
    },
    authorPurpose: "Cerpen ini ditulis untuk menunjukkan bahawa prasangka boleh merosakkan keluarga. Penulis mahu pembaca sedar bahawa kebenaran perlu diberitahu, kesalahan perlu diakui dan kasih sayang keluarga hanya dapat pulih apabila semua pihak berani berubah.",
    examCharacterAnalysis: [
      { character: "Lim Meng", trait: "Tabah", evidence: "Masih pulang menyambut Tahun Baharu Cina walaupun pernah dihalau.", modelAnswer: "Lim Meng tabah kerana dia tetap pulang ke rumah walaupun bapanya menuduhnya sebagai pembawa malang." },
      { character: "Lim Meng", trait: "Tidak berdendam", evidence: "Masih mahu kembali kepada keluarga.", modelAnswer: "Lim Meng tidak berdendam kerana dia masih mahu bersama keluarga walaupun dilayan dengan buruk." },
      { character: "Lim Pooi", trait: "Cepat membuat tuduhan", evidence: "Menyalahkan Lim Meng selama bertahun-tahun.", modelAnswer: "Lim Pooi cepat membuat tuduhan kerana mempercayai Lim Meng sebagai pembawa malang tanpa menerima kebenaran sebenar." },
      { character: "Sim Pau", trait: "Berani", evidence: "Mendedahkan kebenaran kepada suaminya.", modelAnswer: "Sim Pau berani kerana sanggup memberitahu Lim Pooi perkara sebenar demi membela Lim Meng." },
      { character: "Lim Foong", trait: "Tidak bertanggungjawab", evidence: "Berjudi, berhutang dan mencuri wang kedai.", modelAnswer: "Lim Foong tidak bertanggungjawab kerana perbuatannya menyusahkan keluarga dan menyebabkan konflik." },
    ],
    memory60: {
      theme: "Kebenaran dan kasih sayang keluarga menyatukan hubungan yang retak.",
      issues: "Prejudis keluarga, kasih sayang ibu, kesan judi, bercakap benar, keinsafan.",
      mainCharacters: "Lim Meng, Lim Pooi, Sim Pau, Lim Foong.",
      importantEvents: "Lim Meng pulang, dituduh pembawa malang, kebenaran Lim Foong terbongkar, Lim Pooi meminta maaf.",
      values: "Kasih sayang, kejujuran, keberanian, kesabaran, keinsafan, bertanggungjawab.",
      lessons: "Jangan cepat menuduh, bercakap benar, jauhi perjudian, minta maaf, sayangi keluarga.",
    },
    uasaQuestions: [
      { type: "MCQ", question: "Mengapakah Lim Pooi marah kepada Lim Meng?", answer: "Lim Pooi menganggap Lim Meng sebagai pembawa malang.", explanation: "Kemarahan Lim Pooi berpunca daripada prasangka lama terhadap Lim Meng." },
      { type: "MCQ", question: "Siapakah yang mendedahkan kebenaran kepada Lim Pooi?", answer: "Sim Pau.", explanation: "Sim Pau berani memberitahu perkara sebenar demi membela Lim Meng." },
      { type: "MCQ", question: "Apakah masalah Lim Foong?", answer: "Berjudi, berhutang dan mencuri wang kedai.", explanation: "Perbuatan Lim Foong menjadi punca sebenar masalah keluarga." },
      { type: "MCQ", question: "Apakah nilai yang ditunjukkan oleh Lim Meng?", answer: "Kesabaran.", explanation: "Lim Meng tetap pulang walaupun pernah dihalau dan dituduh." },
      { type: "MCQ", question: "Apakah kesudahan cerpen ini?", answer: "Lim Pooi insaf dan keluarga bersatu semula.", explanation: "Peleraian berlaku selepas kebenaran diterima dan permohonan maaf dibuat." },
      { type: "Struktur", question: "Nyatakan tema cerpen Kuih Bakul Limau Mandarin.", answer: "Tema cerpen ini ialah kepentingan kebenaran dan kasih sayang keluarga dalam menyatukan hubungan yang retak.", explanation: "Tema perlu menyebut kebenaran dan keluarga." },
      { type: "Struktur", question: "Berikan satu perwatakan Sim Pau.", answer: "Sim Pau seorang yang berani kerana mendedahkan kebenaran kepada Lim Pooi.", explanation: "Jawapan perwatakan mesti ada bukti." },
      { type: "Struktur", question: "Apakah konflik utama dalam cerpen?", answer: "Konflik utama ialah Lim Meng dipersalahkan sebagai pembawa malang oleh Lim Pooi walaupun punca sebenar masalah berkaitan Lim Foong.", explanation: "Konflik perlu menyebut tuduhan dan kebenaran sebenar." },
      { type: "Struktur", question: "Nyatakan satu nilai dalam cerpen.", answer: "Nilai kejujuran. Contohnya, Sim Pau bercakap benar tentang perkara sebenar kepada Lim Pooi.", explanation: "Nilai perlu disokong peristiwa." },
      { type: "Struktur", question: "Berikan satu pengajaran daripada cerpen.", answer: "Kita hendaklah tidak cepat membuat tuduhan tanpa mengetahui kebenaran.", explanation: "Pengajaran mesti berbentuk ayat tindakan." },
      { type: "KBAT", question: "Jika anda menjadi Lim Pooi, apakah tindakan yang patut dilakukan sebelum menyalahkan Lim Meng?", answer: "Saya patut mendengar penjelasan semua ahli keluarga, menyiasat perkara sebenar dan tidak membuat tuduhan tanpa bukti.", explanation: "Jawapan KBAT perlu memberi tindakan matang." },
      { type: "KBAT", question: "Mengapakah kebenaran penting dalam keluarga?", answer: "Kebenaran penting kerana dapat mengelakkan salah faham, membela orang yang tidak bersalah dan memulihkan hubungan seperti yang berlaku kepada Lim Meng.", explanation: "Kaitkan jawapan dengan konflik cerita." },
      { type: "KBAT", question: "Bagaimanakah murid boleh mengelakkan sikap prejudis terhadap ahli keluarga atau rakan?", answer: "Murid boleh mendengar penjelasan, tidak mempercayai khabar angin dan bertanya dengan baik sebelum membuat kesimpulan.", explanation: "Jawapan perlu dikaitkan dengan kehidupan harian murid." },
    ],
  },
  {
    id: "drama-hadiah",
    title: "Hadiah",
    typeLabel: "Drama",
    kind: "story",
    studyTime: "13 minit",
    difficulty: "Sederhana",
    examFocus: "Hayati + Bantuan RM10,000",
    intro: "Drama ini mengisahkan keluarga seorang perajurit yang kehilangan tempat bergantung selepas Sarjan Akhbar gugur semasa bertugas. Fokus utama ialah ketabahan keluarga, kepentingan pendidikan dan penghargaan terhadap jasa pejuang negara.",
    story60: "Sarjan Akhbar gugur semasa menjalankan tugas untuk negara. Selepas pemergiannya, Fauziah dan keluarganya hidup susah kerana kehilangan ketua keluarga. Hayati pula menghadapi masalah untuk membayar yuran asrama sehingga terfikir untuk berhenti sekolah demi meringankan beban keluarga. Pak Mail tidak sanggup melihat masa depan Hayati terhenti, lalu berusaha meminta bantuan. Kemudian, Encik Musa sebagai wakil Kementerian Pertahanan datang membawa berita baik. Keluarga itu menerima bantuan RM10,000 sebagai tanda penghargaan terhadap jasa Sarjan Akhbar. Dengan bantuan tersebut, Hayati dapat meneruskan pelajaran dan keluarga mereka kembali mempunyai harapan.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Keluarga Sarjan Akhbar diuji selepas kehilangan orang yang banyak berkorban untuk negara.", "Ketabahan.", "Kita hendaklah tabah apabila keluarga menghadapi kesusahan."],
      ["Mesej utama", "Bantuan yang diterima bukan sekadar wang, tetapi tanda jasa perajurit dihargai.", "Penghargaan.", "Kita perlu menghargai pengorbanan orang yang menjaga keselamatan negara."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Sarjan Akhbar telah gugur semasa bertugas, menyebabkan keluarganya kehilangan ketua keluarga." },
      { stage: "Perkembangan", text: "Fauziah, Hayati dan keluarga hidup susah kerana masalah kewangan semakin menekan." },
      { stage: "Konflik", text: "Hayati tidak mampu membayar yuran asrama dan mahu berhenti sekolah." },
      { stage: "Klimaks", text: "Encik Musa datang sebagai wakil Kementerian Pertahanan untuk menyampaikan bantuan RM10,000." },
      { stage: "Peleraian", text: "Hayati dapat meneruskan pelajaran dan keluarga Sarjan Akhbar menerima penghargaan yang sewajarnya." },
    ],
    characters: [
      { name: "Hayati", personality: "Bertanggungjawab, penyayang dan mengutamakan keluarga.", evidence: "Hayati sanggup mempertimbangkan untuk berhenti sekolah kerana tidak mahu membebankan keluarganya.", importance: "Menunjukkan konflik utama drama, iaitu pendidikan yang hampir terhenti akibat kemiskinan." },
      { name: "Fauziah", personality: "Tabah dan penyabar.", evidence: "Fauziah tetap meneruskan kehidupan keluarga selepas kematian Sarjan Akhbar walaupun hidup susah.", importance: "Melambangkan ketabahan seorang ibu menghadapi kehilangan dan tekanan hidup." },
      { name: "Pak Mail", personality: "Prihatin dan bertanggungjawab.", evidence: "Pak Mail berusaha mendapatkan bantuan untuk keluarga Sarjan Akhbar.", importance: "Menjadi penggerak yang membuka jalan penyelesaian kepada masalah Hayati." },
      { name: "Encik Musa", personality: "Amanah dan menghargai jasa perajurit.", evidence: "Encik Musa menyampaikan bantuan RM10,000 kepada keluarga Sarjan Akhbar.", importance: "Mewakili pihak yang menghargai pengorbanan anggota keselamatan negara." },
      { name: "Sarjan Akhbar", personality: "Berani dan sanggup berkorban untuk negara.", evidence: "Sarjan Akhbar gugur semasa menjalankan tugas.", importance: "Pengorbanannya menjadi sebab utama tema penghargaan terhadap pejuang negara dibina." },
    ],
    events: [
      { event: "Kematian Sarjan Akhbar", whatHappened: "Sarjan Akhbar gugur semasa bertugas untuk negara.", whyItMatters: "Menjadi punca kesusahan keluarga dan tema pengorbanan.", examFocus: "Soalan tema dan latar belakang konflik." },
      { event: "Kesusahan keluarga", whatHappened: "Fauziah dan anak-anak hidup dalam keadaan sukar selepas kehilangan ketua keluarga.", whyItMatters: "Menunjukkan cabaran keluarga perajurit.", examFocus: "Soalan nilai ketabahan." },
      { event: "Hayati mahu berhenti sekolah", whatHappened: "Hayati tidak mampu membayar yuran asrama dan mahu mengutamakan keluarga.", whyItMatters: "Membina konflik pendidikan dan kemiskinan.", examFocus: "Soalan watak Hayati." },
      { event: "Pak Mail meminta bantuan", whatHappened: "Pak Mail mencari jalan supaya keluarga itu tidak terus terbiar.", whyItMatters: "Menonjolkan nilai prihatin dan tanggungjawab.", examFocus: "Soalan peranan watak sampingan." },
      { event: "Ketibaan Encik Musa", whatHappened: "Encik Musa hadir sebagai wakil Kementerian Pertahanan.", whyItMatters: "Menandakan penyelesaian konflik semakin hampir.", examFocus: "Soalan klimaks drama." },
      { event: "Pemberian RM10,000", whatHappened: "Keluarga menerima bantuan sebagai penghargaan atas jasa Sarjan Akhbar.", whyItMatters: "Membuktikan pengorbanan perajurit dihargai.", examFocus: "Soalan pengajaran dan nilai penghargaan." },
      { event: "Hayati kembali ke asrama", whatHappened: "Hayati dapat meneruskan pelajaran selepas bantuan diterima.", whyItMatters: "Menjadi peleraian yang memberi harapan kepada keluarga.", examFocus: "Soalan kesudahan drama." },
    ],
    masterCharacters: [
      {
        name: "Hayati",
        role: "Anak Sarjan Akhbar yang hampir berhenti sekolah kerana masalah kewangan.",
        traits: ["Bertanggungjawab", "Penyayang", "Mengutamakan keluarga"],
        evidence: "Hayati mahu berhenti sekolah kerana tidak mahu menambahkan beban keluarganya.",
        relationships: "Hayati sangat menyayangi Fauziah dan menghormati pengorbanan bapanya.",
        importance: "Membawa konflik pendidikan dan menunjukkan bahawa masa depan murid tidak patut terhenti kerana kemiskinan.",
      },
      {
        name: "Fauziah",
        role: "Isteri Sarjan Akhbar dan ibu kepada Hayati.",
        traits: ["Tabah", "Penyabar"],
        evidence: "Fauziah meneruskan kehidupan keluarga walaupun kehilangan suami dan berdepan kesempitan hidup.",
        relationships: "Fauziah menjadi tempat Hayati meluahkan kesusahan dan kebimbangan.",
        importance: "Menunjukkan ketabahan keluarga perajurit selepas kehilangan orang tersayang.",
      },
      {
        name: "Pak Mail",
        role: "Orang yang prihatin terhadap nasib keluarga Sarjan Akhbar.",
        traits: ["Prihatin", "Bertanggungjawab"],
        evidence: "Pak Mail berusaha meminta bantuan agar Hayati dapat terus belajar.",
        relationships: "Pak Mail membantu Fauziah dan Hayati ketika mereka memerlukan sokongan.",
        importance: "Membuktikan masyarakat perlu mengambil berat terhadap keluarga yang ditimpa kesusahan.",
      },
      {
        name: "Encik Musa",
        role: "Wakil Kementerian Pertahanan yang menyampaikan bantuan.",
        traits: ["Amanah", "Menghargai jasa perajurit"],
        evidence: "Encik Musa menyampaikan bantuan RM10,000 kepada keluarga Sarjan Akhbar.",
        relationships: "Encik Musa menjadi penghubung antara pihak kerajaan dengan keluarga Sarjan Akhbar.",
        importance: "Menunjukkan bahawa pengorbanan perajurit untuk negara tidak dilupakan.",
      },
      {
        name: "Sarjan Akhbar",
        role: "Perajurit yang gugur semasa menjalankan tugas.",
        traits: ["Berani", "Berkorban untuk negara"],
        evidence: "Sarjan Akhbar meninggal dunia ketika melaksanakan tanggungjawab sebagai anggota keselamatan.",
        relationships: "Sarjan Akhbar ialah suami Fauziah dan bapa Hayati yang menjadi sumber kebanggaan keluarga.",
        importance: "Menjadi asas kepada tema pengorbanan dan penghargaan terhadap pejuang negara.",
      },
    ],
    relationshipMap: [
      { from: "Hayati", relation: "menyayangi", to: "Fauziah", explanation: "Hayati mengutamakan ibunya sehingga sanggup memikirkan untuk berhenti sekolah demi mengurangkan beban keluarga." },
      { from: "Hayati", relation: "bergantung harapan kepada", to: "Pak Mail", explanation: "Pak Mail menjadi orang dewasa yang membantu mencari jalan keluar untuk masa depan Hayati." },
      { from: "Keluarga", relation: "menghargai pengorbanan", to: "Sarjan Akhbar", explanation: "Pengorbanan Sarjan Akhbar menjadi sebab keluarga menerima bantuan dan penghormatan." },
      { from: "Encik Musa", relation: "membantu", to: "Keluarga", explanation: "Encik Musa hadir membawa bantuan yang membolehkan Hayati meneruskan pelajaran." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Sarjan Akhbar telah gugur semasa bertugas.", why: "Beliau berkorban demi keselamatan negara.", effect: "Keluarganya kehilangan tempat bergantung." },
      { stage: "Perkembangan", what: "Fauziah dan keluarga hidup dalam kesusahan.", why: "Ketiadaan ketua keluarga menyebabkan masalah kewangan semakin terasa.", effect: "Hayati mula risau tentang yuran asrama dan masa depannya." },
      { stage: "Konflik", what: "Hayati mahu berhenti sekolah kerana tidak mampu membayar yuran.", why: "Dia tidak mahu membebankan ibunya.", effect: "Konflik drama menjadi lebih sedih kerana pendidikan Hayati terancam." },
      { stage: "Klimaks", what: "Encik Musa datang membawa bantuan RM10,000.", why: "Bantuan itu diberi sebagai penghargaan terhadap jasa Sarjan Akhbar.", effect: "Masalah utama keluarga mula selesai." },
      { stage: "Peleraian", what: "Hayati dapat kembali ke asrama dan meneruskan pelajaran.", why: "Bantuan kewangan memberi ruang kepada Hayati untuk belajar semula.", effect: "Drama berakhir dengan harapan dan penghargaan terhadap pengorbanan perajurit." },
    ],
    importantEvents: [
      { event: "Sarjan Akhbar gugur", what: "Sarjan Akhbar meninggal dunia semasa menjalankan tugas.", whyImportant: "Membina latar konflik dan tema pengorbanan.", possibleQuestion: "Apakah peristiwa yang menyebabkan keluarga Hayati hidup susah?" },
      { event: "Keluarga menghadapi kesusahan", what: "Fauziah dan anak-anak berdepan masalah kewangan.", whyImportant: "Menonjolkan nilai ketabahan.", possibleQuestion: "Nyatakan satu nilai yang ditunjukkan oleh Fauziah." },
      { event: "Hayati tidak mampu membayar yuran", what: "Hayati menghadapi masalah membayar yuran asrama.", whyImportant: "Menunjukkan pendidikan Hayati hampir terhenti.", possibleQuestion: "Mengapakah Hayati mahu berhenti sekolah?" },
      { event: "Pak Mail meminta bantuan", what: "Pak Mail berusaha mendapatkan bantuan untuk keluarga itu.", whyImportant: "Membuktikan sikap prihatin masyarakat.", possibleQuestion: "Apakah peranan Pak Mail dalam drama ini?" },
      { event: "Encik Musa tiba", what: "Encik Musa datang sebagai wakil Kementerian Pertahanan.", whyImportant: "Menjadi titik penting sebelum masalah selesai.", possibleQuestion: "Siapakah yang datang menyampaikan bantuan?" },
      { event: "Bantuan RM10,000 diberi", what: "Keluarga menerima bantuan kewangan.", whyImportant: "Menunjukkan jasa Sarjan Akhbar dihargai.", possibleQuestion: "Apakah kepentingan bantuan RM10,000?" },
      { event: "Hayati meneruskan pelajaran", what: "Hayati dapat kembali ke asrama.", whyImportant: "Menjadi peleraian yang membawa harapan.", possibleQuestion: "Apakah kesudahan drama Hadiah?" },
    ],
    theme: {
      title: "Ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara",
      explanation: "Drama ini menunjukkan keluarga Sarjan Akhbar tetap bertahan selepas kehilangan orang tersayang. Pada masa yang sama, bantuan yang diterima membuktikan bahawa pengorbanan perajurit untuk negara patut dihargai.",
      whyItMatters: "Murid belajar bahawa pendidikan sangat penting dan jasa orang yang menjaga keselamatan negara tidak boleh dilupakan.",
    },
    values: [
      { value: "Ketabahan", explanation: "Kuat menghadapi kesusahan tanpa mudah menyerah.", realLife: "Terus berusaha walaupun keluarga sedang menghadapi masalah.", schoolLife: "Tidak berhenti belajar hanya kerana keputusan merosot.", },
      { value: "Kasih sayang", explanation: "Mengambil berat terhadap ahli keluarga.", realLife: "Membantu ibu bapa apabila mereka susah.", schoolLife: "Menyokong rakan yang menghadapi masalah keluarga." },
      { value: "Tanggungjawab", explanation: "Melaksanakan tugas dan mencari jalan penyelesaian.", realLife: "Membayar hutang atau yuran mengikut kemampuan dan berbincang jika susah.", schoolLife: "Berjumpa guru jika menghadapi masalah belajar atau kewangan." },
      { value: "Pengorbanan", explanation: "Sanggup berkorban demi orang lain atau negara.", realLife: "Menghargai ibu bapa yang bekerja keras untuk keluarga.", schoolLife: "Menghormati warga sekolah yang menjaga keselamatan dan kebajikan murid." },
      { value: "Prihatin", explanation: "Peka terhadap kesusahan orang lain.", realLife: "Membantu jiran atau saudara yang memerlukan.", schoolLife: "Melaporkan kepada guru jika rakan memerlukan bantuan." },
    ],
    lessons: [
      { value: "Kita hendaklah tabah menghadapi dugaan hidup.", explanation: "Fauziah tetap sabar selepas kehilangan suami.", realLife: "Jangan cepat berputus asa apabila keluarga menghadapi masalah.", schoolLife: "Terus hadir ke sekolah walaupun melalui masa sukar." },
      { value: "Kita hendaklah menghargai jasa pejuang negara.", explanation: "Sarjan Akhbar berkorban semasa menjalankan tugas.", realLife: "Hormati anggota keselamatan dan keluarga mereka.", schoolLife: "Hayati sambutan Hari Kebangsaan dengan rasa hormat." },
      { value: "Kita hendaklah mengutamakan pendidikan.", explanation: "Hayati akhirnya dapat meneruskan pelajaran.", realLife: "Jangan berhenti belajar tanpa mencari bantuan.", schoolLife: "Berbincang dengan guru kaunseling jika menghadapi masalah yuran." },
      { value: "Kita hendaklah prihatin terhadap kesusahan orang lain.", explanation: "Pak Mail membantu keluarga Sarjan Akhbar mendapatkan bantuan.", realLife: "Bantu orang sekeliling mengikut kemampuan.", schoolLife: "Maklumkan kepada guru jika rakan memerlukan sokongan." },
      { value: "Kita hendaklah bertanggungjawab menjalankan amanah.", explanation: "Encik Musa menyampaikan bantuan kepada keluarga yang layak.", realLife: "Sampaikan amanah dengan jujur.", schoolLife: "Jalankan tugas pengawas atau ketua kelas dengan betul." },
      { value: "Kita hendaklah menyayangi keluarga.", explanation: "Hayati memikirkan keadaan ibunya sebelum membuat keputusan.", realLife: "Fahami kesusahan keluarga dan bantu di rumah.", schoolLife: "Tidak membazir wang saku yang diberi keluarga." },
    ],
    teacherExplains: [
      "Drama ini bukan sekadar tentang wang RM10,000. Drama ini menunjukkan bahawa pengorbanan untuk negara harus dihargai dan pendidikan tidak boleh dihentikan walaupun menghadapi kesusahan.",
      "Pernah tak anda rasa mahu berhenti cuba kerana masalah terlalu berat? Hayati hampir melalui perkara itu. Bezanya, ada orang dewasa seperti Pak Mail yang membantu mencari jalan.",
      "Ingat, bantuan dalam drama ini bukan hadiah biasa. Bantuan itu ialah simbol penghargaan kepada keluarga orang yang telah berkorban untuk negara.",
    ],
    examBooster: {
      frequentPoints: ["Popular theme: ketabahan keluarga dan penghargaan terhadap perajurit.", "Popular values: ketabahan, kasih sayang, tanggungjawab, pengorbanan, prihatin.", "Common focus: Hayati mahu berhenti sekolah kerana masalah yuran.", "Soalan lazim bertanya peranan Pak Mail dan kepentingan bantuan RM10,000."],
      commonQuestions: [
        q("Apakah tema drama Hadiah?", "Tema drama ialah ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara.", "Tema perlu menyebut ketabahan keluarga dan jasa Sarjan Akhbar.", "Jangan jawab 'wang RM10,000' sebagai tema."),
        q("Mengapakah Hayati mahu berhenti sekolah?", "Hayati mahu berhenti sekolah kerana keluarganya tidak mampu membayar yuran asrama.", "Jawapan perlu kaitkan masalah kewangan dengan pendidikan.", "Sebut yuran asrama untuk jawapan lebih tepat."),
        q("Nyatakan satu nilai yang ditunjukkan oleh Pak Mail.", "Nilai prihatin kerana Pak Mail berusaha meminta bantuan untuk keluarga Sarjan Akhbar.", "Nilai mesti disokong dengan tindakan watak.", "Format terbaik: nilai + watak + bukti."),
      ],
    },
    revision: {
      theme: "Ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara.",
      values: "Ketabahan, kasih sayang, tanggungjawab, pengorbanan, prihatin.",
      lessons: "Tabah, hargai jasa perajurit, utamakan pendidikan, bantu orang susah, jalankan amanah.",
      examTips: "Fokus kepada Hayati, Fauziah, Pak Mail, Encik Musa, Sarjan Akhbar dan kepentingan bantuan RM10,000.",
    },
    miniQuiz: quiz("Siapakah yang menyampaikan bantuan RM10,000?", "Padankan Hayati dengan nilai tanggungjawab dan Pak Mail dengan nilai prihatin.", "Mengapakah pendidikan Hayati penting kepada mesej drama ini?"),
    keyCharacterFocus: {
      name: "Hayati",
      whyMatters: "Hayati ialah watak yang menunjukkan kesan langsung kesusahan keluarga terhadap pendidikan seorang murid.",
      supportsTheme: "Masalah Hayati menguatkan tema ketabahan menghadapi kesusahan hidup.",
      supportsIssues: "Hayati menunjukkan persoalan kemiskinan, pendidikan dan kasih sayang terhadap keluarga.",
      supportsValues: "Hayati menyokong nilai bertanggungjawab, penyayang dan tabah.",
      supportsLessons: "Melalui Hayati, murid belajar bahawa pendidikan perlu dipertahankan walaupun hidup susah.",
    },
    authorPurpose: "Drama ini ditulis untuk mengingatkan pembaca bahawa keluarga perajurit juga menanggung kesan pengorbanan. Penulis mahu murid menghargai jasa pejuang negara dan memahami bahawa pendidikan boleh mengubah masa depan keluarga yang susah.",
    examCharacterAnalysis: [
      { character: "Hayati", trait: "Bertanggungjawab", evidence: "Hayati mahu berhenti sekolah kerana tidak mahu membebankan keluarganya.", modelAnswer: "Hayati seorang yang bertanggungjawab kerana sanggup memikirkan beban keluarganya walaupun keputusan itu boleh menjejaskan pelajarannya." },
      { character: "Fauziah", trait: "Tabah", evidence: "Fauziah meneruskan hidup selepas kematian suaminya.", modelAnswer: "Fauziah seorang yang tabah kerana tetap menjaga keluarga walaupun kehilangan Sarjan Akhbar dan hidup susah." },
      { character: "Pak Mail", trait: "Prihatin", evidence: "Pak Mail meminta bantuan untuk keluarga Sarjan Akhbar.", modelAnswer: "Pak Mail seorang yang prihatin kerana berusaha mendapatkan bantuan supaya Hayati dapat meneruskan pelajaran." },
      { character: "Encik Musa", trait: "Amanah", evidence: "Encik Musa menyampaikan bantuan RM10,000 kepada keluarga Sarjan Akhbar.", modelAnswer: "Encik Musa seorang yang amanah kerana menjalankan tugas menyampaikan bantuan kepada keluarga yang layak menerimanya." },
      { character: "Sarjan Akhbar", trait: "Berani", evidence: "Sarjan Akhbar gugur semasa bertugas untuk negara.", modelAnswer: "Sarjan Akhbar seorang yang berani kerana sanggup menjalankan tugas berisiko demi keselamatan negara." },
    ],
    memory60: {
      theme: "Ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara.",
      issues: "Kesusahan keluarga, pendidikan, pengorbanan perajurit, bantuan masyarakat, penghargaan terhadap jasa.",
      mainCharacters: "Hayati, Fauziah, Pak Mail, Encik Musa, Sarjan Akhbar.",
      importantEvents: "Sarjan Akhbar gugur, keluarga susah, Hayati mahu berhenti sekolah, Pak Mail meminta bantuan, Encik Musa datang, bantuan RM10,000 diberi, Hayati kembali ke asrama.",
      values: "Ketabahan, kasih sayang, tanggungjawab, pengorbanan, prihatin.",
      lessons: "Tabah menghadapi dugaan, hargai pejuang negara, utamakan pendidikan, bantu orang susah, jalankan amanah.",
    },
    uasaQuestions: [
      { type: "MCQ", question: "Siapakah watak yang hampir berhenti sekolah kerana masalah yuran asrama?", answer: "Hayati.", explanation: "Hayati menghadapi masalah kewangan sehingga mahu berhenti sekolah." },
      { type: "MCQ", question: "Apakah yang berlaku kepada Sarjan Akhbar?", answer: "Sarjan Akhbar gugur semasa bertugas.", explanation: "Peristiwa ini menjadi latar utama kesusahan keluarga." },
      { type: "MCQ", question: "Siapakah yang berusaha meminta bantuan untuk keluarga Hayati?", answer: "Pak Mail.", explanation: "Pak Mail menunjukkan nilai prihatin dan bertanggungjawab." },
      { type: "MCQ", question: "Siapakah Encik Musa dalam drama ini?", answer: "Wakil Kementerian Pertahanan.", explanation: "Encik Musa datang menyampaikan bantuan kepada keluarga Sarjan Akhbar." },
      { type: "MCQ", question: "Berapakah jumlah bantuan yang diterima keluarga Hayati?", answer: "RM10,000.", explanation: "Bantuan ini membolehkan Hayati meneruskan pelajaran." },
      { type: "Struktur", question: "Nyatakan tema drama Hadiah.", answer: "Tema drama ini ialah ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara.", explanation: "Tema perlu menyebut kesusahan keluarga dan jasa Sarjan Akhbar." },
      { type: "Struktur", question: "Berikan satu perwatakan Hayati beserta bukti.", answer: "Hayati seorang yang bertanggungjawab kerana sanggup berhenti sekolah demi mengurangkan beban keluarganya.", explanation: "Jawapan perwatakan mesti ada bukti tindakan." },
      { type: "Struktur", question: "Apakah kepentingan bantuan RM10,000 kepada keluarga Hayati?", answer: "Bantuan itu meringankan beban keluarga dan membolehkan Hayati meneruskan pelajaran.", explanation: "Jawapan perlu menyebut kesan bantuan terhadap pendidikan Hayati." },
      { type: "KBAT", question: "Pada pendapat anda, mengapakah pendidikan Hayati tidak patut dihentikan walaupun keluarganya susah?", answer: "Pendidikan Hayati penting kerana ilmu dapat membantu masa depannya, mengubah kehidupan keluarga dan menghargai pengorbanan bapanya.", explanation: "Jawapan KBAT perlu memberi sebab dan kaitan dengan masa depan." },
      { type: "KBAT", question: "Bagaimanakah murid boleh menunjukkan penghargaan terhadap jasa anggota keselamatan negara?", answer: "Murid boleh menghormati mereka, menyertai program patriotik, menjaga keamanan sekolah dan tidak memandang ringan pengorbanan mereka.", explanation: "Jawapan mesti praktikal dan sesuai dengan kehidupan murid." },
    ],
  },
  {
    id: "destinasi-impian",
    title: "Destinasi Impian",
    typeLabel: "Novel",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Firdaus + Keinsafan + Datuk + Pantai Morib",
    intro: "Novel ini bercerita tentang seorang remaja bernama Firdaus yang manja dan mudah berputus asa. Melalui ekspedisi berbasikal yang dicabar oleh Datuknya, Firdaus belajar erti ketabahan, kejujuran dan tanggungjawab. Konflik cerita memuncak di Pantai Morib apabila pembohongan Firdaus hampir meragut nyawanya.",
    movieTrailer: "Datuk mencabar cucunya berbasikal ke Pantai Morib. Firdaus tidak suka, tetapi terpaksa ikut. Azlina dan Johari setia menemani. Di tengah perjalanan, basikal pancit, Firdaus jatuh, dan pelbagai cabaran menguji semangat. Namun keinsafan sebenar Firdaus bukan di atas basikal — ia berlaku di tepi laut, apabila satu pembohongan hampir mengorbankan nyawanya.",
    story60: "Datuk mencabar cucunya Firdaus untuk menjalani ekspedisi berbasikal ke Pantai Morib bersama rakan-rakannya, Azlina dan Johari. Firdaus yang manja pada mulanya enggan dan merungut sepanjang perjalanan. Pelbagai cabaran terpaksa mereka hadapi seperti basikal pancit dan Firdaus terjatuh. Akhirnya mereka tiba di Pantai Morib. Di sana, Firdaus berbohong kepada Mazlinda bahawa dia pandai berenang. Apabila Firdaus terjun ke laut, dia hampir lemas kerana tidak boleh berenang. Firdaus diselamatkan dan peristiwa itu menyedarkan Firdaus tentang keburukan berbohong dan pentingnya kejujuran, keberanian serta semangat tidak berputus asa.",
    story90: "Novel Destinasi Impian bermula dengan cabaran yang diberikan oleh Datuk kepada cucunya, Firdaus. Datuk ingin membentuk semangat Firdaus yang dikenali manja dan mudah berputus asa melalui ekspedisi berbasikal ke Pantai Morib. Pada mulanya, Firdaus sama sekali tidak mahu mengambil bahagian. Dia merungut dan menganggap cabaran itu terlalu susah. Namun dengan kehadiran Azlina dan Johari sebagai rakan seperjuangan, Firdaus akhirnya meneruskan perjalanan bersama mereka. Sepanjang ekspedisi, Firdaus terpaksa menghadapi pelbagai dugaan. Basikal mereka pancit dan Firdaus sendiri terjatuh pada satu ketika, menyebabkan dia semakin rasa ingin berpatah balik. Namun Azlina yang cergas dan berani serta Johari yang matang dan bertanggungjawab terus memberi semangat supaya Firdaus tidak menyerah kalah. Perjuangan mereka membuahkan hasil apabila ketiga-tiga mereka berjaya tiba di Pantai Morib. Di sanalah konflik paling besar berlaku. Ketika di pantai, Firdaus berbohong kepada Mazlinda bahawa dia pandai berenang. Mazlinda yang bijak menguji Firdaus dengan memintanya masuk ke laut. Apabila Firdaus terjun ke laut, dia tidak dapat menyelamatkan dirinya sendiri dan hampir lemas. Nasib baik dia berjaya diselamatkan. Peristiwa hampir lemas itu menjadi titik perubahan besar dalam diri Firdaus. Dia sedar bahawa berbohong hanya mendatangkan bahaya kepada diri sendiri. Keinsafan Firdaus bukan sekadar tentang berenang atau berbasikal. Ia tentang belajar menjadi seseorang yang jujur, berani, tabah dan bertanggungjawab kepada diri sendiri dan orang lain.",
    decoder: [
      { rangkap: "Datuk memberi cabaran", pantunMudah: "Datuk memberikan cabaran ekspedisi berbasikal untuk membentuk semangat Firdaus yang manja.", maksud: "Datuk tahu Firdaus perlu dibentuk melalui pengalaman nyata, bukan sekadar kata-kata nasihat.", tema: "Cabaran membentuk watak remaja.", nilai: "Prihatin.", pengajaran: "Kita hendaklah menerima cabaran sebagai peluang untuk membina diri." },
      { rangkap: "Firdaus merungut", pantunMudah: "Firdaus enggan dan merungut kerana tidak biasa berdepan dengan kesukaran.", maksud: "Sikap manja Firdaus jelas apabila dia tidak mahu menerima cabaran tanpa bantahan.", tema: "Kelemahan sikap remaja yang manja.", nilai: "Kesabaran.", pengajaran: "Kita hendaklah sabar dan tidak mudah merungut apabila diberi tugasan yang mencabar." },
      { rangkap: "Basikal pancit dan Firdaus terjatuh", pantunMudah: "Pelbagai halangan berlaku semasa ekspedisi termasuk basikal pancit dan Firdaus terjatuh.", maksud: "Cabaran fizikal menguji ketabahan Firdaus dan rakan-rakannya sepanjang perjalanan.", tema: "Ketabahan menghadapi cabaran fizikal.", nilai: "Ketabahan.", pengajaran: "Kita perlu tabah menghadapi sebarang halangan dalam kehidupan tanpa mengalah." },
      { rangkap: "Tiba di Pantai Morib", pantunMudah: "Firdaus, Azlina dan Johari berjaya tiba di Pantai Morib selepas perjalanan yang penuh cabaran.", maksud: "Kejayaan tiba di destinasi membuktikan bahawa usaha dan semangat tidak berputus asa membuahkan hasil.", tema: "Kejayaan melalui usaha bersama.", nilai: "Keberanian.", pengajaran: "Kita hendaklah terus berusaha bersama tanpa mengalah sehingga mencapai matlamat." },
      { rangkap: "Firdaus berbohong kepada Mazlinda", pantunMudah: "Firdaus berbohong bahawa dia pandai berenang untuk menunjukkan diri kepada Mazlinda.", maksud: "Pembohongan Firdaus menunjukkan sifat tidak jujur yang akhirnya mendatangkan bahaya kepada dirinya.", tema: "Kesan buruk berbohong kepada diri sendiri.", nilai: "Kejujuran.", pengajaran: "Kita hendaklah sentiasa bercakap benar walaupun kebenaran itu terasa malu." },
      { rangkap: "Firdaus hampir lemas", pantunMudah: "Firdaus hampir lemas di laut kerana berbohong mendakwa pandai berenang.", maksud: "Peristiwa hampir lemas menjadi akibat langsung daripada pembohongan Firdaus kepada Mazlinda.", tema: "Akibat pembohongan kepada diri sendiri.", nilai: "Tanggungjawab.", pengajaran: "Kita hendaklah berfikir sebelum bertindak supaya tidak membahayakan diri sendiri." },
      { rangkap: "Firdaus diselamatkan", pantunMudah: "Firdaus berjaya diselamatkan selepas hampir lemas di laut.", maksud: "Keselamatan Firdaus menjadi peluang kepadanya untuk menyesal dan berubah menjadi individu yang lebih jujur.", tema: "Peluang untuk insaf dan berubah.", nilai: "Keberanian.", pengajaran: "Kita hendaklah menghargai bantuan orang lain dan membalas budi dengan perubahan sikap yang baik." },
      { rangkap: "Keinsafan Firdaus", pantunMudah: "Firdaus menyedari kesilapannya dan berjanji untuk berubah menjadi insan yang lebih baik.", maksud: "Keinsafan Firdaus menunjukkan bahawa cabaran dan pengalaman pahit boleh mengubah seseorang menjadi lebih matang dan bertanggungjawab.", tema: "Keinsafan dan perubahan diri.", nilai: "Keinsafan.", pengajaran: "Kita hendaklah mengambil iktibar daripada setiap kesilapan dan berusaha menjadi individu yang lebih baik." },
    ],
    timeline: [
      { stage: "Permulaan", text: "Datuk mencabar Firdaus menjalani ekspedisi berbasikal ke Pantai Morib bersama Azlina dan Johari." },
      { stage: "Perkembangan", text: "Firdaus merungut dan enggan tetapi meneruskan perjalanan bersama rakan-rakannya." },
      { stage: "Konflik", text: "Basikal pancit, Firdaus terjatuh dan pelbagai halangan menguji semangat kumpulan itu." },
      { stage: "Klimaks", text: "Firdaus berbohong kepada Mazlinda bahawa dia pandai berenang, lalu hampir lemas di laut." },
      { stage: "Peleraian", text: "Firdaus diselamatkan dan mengalami keinsafan tentang kepentingan kejujuran dan ketabahan." },
    ],
    characters: [
      { name: "Firdaus", personality: "Manja, mudah berputus asa, tidak jujur tetapi akhirnya berani berubah.", evidence: "Firdaus berbohong kepada Mazlinda bahawa dia pandai berenang dan hampir lemas akibatnya, lalu insaf.", importance: "Watak utama yang menunjukkan perjalanan perubahan diri seorang remaja melalui cabaran." },
      { name: "Azlina", personality: "Cergas, berani dan tegas dalam menghadapi cabaran tanpa mengalah.", evidence: "Azlina terus memberi semangat kepada Firdaus walaupun dia merungut sepanjang perjalanan.", importance: "Menjadi sumber kekuatan dan inspirasi kepada kumpulan sepanjang ekspedisi." },
      { name: "Johari", personality: "Matang, bertanggungjawab dan penyabar dalam membantu rakan.", evidence: "Johari membantu menguruskan masalah basikal pancit dan menjaga semangat kumpulan.", importance: "Menunjukkan ciri kepimpinan yang bertanggungjawab dan menjadi penyokong utama kumpulan." },
      { name: "Datuk", personality: "Tegas dan amat prihatin terhadap pembentukan watak cucunya.", evidence: "Datuk merancang ekspedisi dengan tujuan membentuk semangat Firdaus yang manja.", importance: "Menjadi pendorong utama yang mencetuskan perubahan positif dalam diri Firdaus." },
      { name: "Mazlinda", personality: "Bijak dan berani serta peka terhadap kejujuran orang lain.", evidence: "Mazlinda menguji Firdaus apabila dia mendakwa pandai berenang.", importance: "Menjadi watak yang secara tidak langsung mendedahkan kelemahan Firdaus dan mencetuskan keinsafannya." },
    ],
    events: [
      { event: "Datuk memberi cabaran ekspedisi", whatHappened: "Datuk mencabar Firdaus menjalani ekspedisi berbasikal ke Pantai Morib.", whyItMatters: "Cabaran ini menjadi titik permulaan perjalanan perubahan diri Firdaus.", examFocus: "Soalan tentang tujuan Datuk dan permulaan cerita." },
      { event: "Firdaus merungut dan enggan", whatHappened: "Firdaus merungut dan tidak mahu menyertai ekspedisi.", whyItMatters: "Menunjukkan sikap manja Firdaus pada awal cerita sebelum berubah.", examFocus: "Soalan tentang perwatakan Firdaus." },
      { event: "Basikal pancit semasa perjalanan", whatHappened: "Basikal mereka pancit semasa dalam perjalanan ke Pantai Morib.", whyItMatters: "Menguji ketabahan kumpulan dan menjadi salah satu konflik dalam perjalanan.", examFocus: "Soalan tentang cabaran yang dihadapi semasa ekspedisi." },
      { event: "Firdaus terjatuh dari basikal", whatHappened: "Firdaus terjatuh dari basikalnya semasa ekspedisi.", whyItMatters: "Menguji kesabaran dan ketabahan Firdaus yang mudah berputus asa.", examFocus: "Soalan tentang halangan yang dihadapi." },
      { event: "Tiba di Pantai Morib", whatHappened: "Firdaus, Azlina dan Johari berjaya tiba di Pantai Morib selepas perjalanan yang mencabar.", whyItMatters: "Kejayaan ini membuktikan bahawa usaha berterusan membuahkan hasil.", examFocus: "Soalan tentang pencapaian dan semangat kumpulan." },
      { event: "Firdaus berbohong kepada Mazlinda", whatHappened: "Firdaus mendakwa kepada Mazlinda bahawa dia pandai berenang sedangkan dia tidak boleh berenang.", whyItMatters: "Pembohongan ini menjadi punca konflik terbesar dan pengajaran tentang kejujuran.", examFocus: "Soalan tentang nilai kejujuran dan sifat tidak jujur Firdaus." },
      { event: "Mazlinda menguji Firdaus", whatHappened: "Mazlinda menguji kejujuran Firdaus dengan memintanya masuk ke laut.", whyItMatters: "Ujian Mazlinda mendedahkan pembohongan Firdaus kepada semua orang.", examFocus: "Soalan tentang peranan Mazlinda dalam cerita." },
      { event: "Firdaus hampir lemas di laut", whatHappened: "Firdaus terjun ke laut dan hampir lemas kerana tidak boleh berenang.", whyItMatters: "Peristiwa ini menjadi klimaks cerita dan akibat langsung daripada pembohongan Firdaus.", examFocus: "Soalan tentang klimaks dan akibat pembohongan." },
      { event: "Firdaus diselamatkan", whatHappened: "Firdaus berjaya diselamatkan daripada bahaya lemas di laut.", whyItMatters: "Penyelamatan memberi peluang kepada Firdaus untuk insaf dan berubah menjadi lebih baik.", examFocus: "Soalan tentang peleraian cerita." },
      { event: "Keinsafan Firdaus", whatHappened: "Firdaus menyedari kesilapan berbohong dan berjanji untuk berubah menjadi lebih baik.", whyItMatters: "Keinsafan Firdaus menjadi mesej utama novel bahawa pengalaman pahit mengajar kita.", examFocus: "Soalan tentang tema, nilai dan pengajaran novel." },
    ],
    theme: {
      title: "Cabaran dan konflik remaja dalam membentuk jati diri",
      explanation: "Novel ini menerangkan bagaimana seorang remaja bernama Firdaus yang manja dan tidak jujur dapat berubah menjadi lebih matang melalui pengalaman dan cabaran. Ekspedisi berbasikal dan insiden di laut mengajar Firdaus erti kejujuran, ketabahan dan tanggungjawab.",
      whyItMatters: "Tema ini penting kerana remaja sering menghadapi cabaran yang menguji jati diri mereka. Sama seperti Firdaus, remaja perlu belajar menerima cabaran, berlaku jujur dan tidak mudah berputus asa dalam kehidupan harian.",
    },
    values: [
      { value: "Keberanian", explanation: "Berani menghadapi cabaran walaupun takut atau tidak biasa.", realLife: "Berani mencuba perkara baharu dan tidak mengalah apabila gagal.", schoolLife: "Firdaus akhirnya meneruskan ekspedisi walaupun pada mulanya enggan dan merungut." },
      { value: "Kesabaran", explanation: "Bersabar menghadapi dugaan tanpa mudah mengalah atau merungut.", realLife: "Tidak mudah putus asa apabila menghadapi kesukaran dalam pelajaran.", schoolLife: "Johari bersabar menguruskan masalah basikal pancit tanpa hilang semangat." },
      { value: "Kejujuran", explanation: "Bercakap benar dalam setiap keadaan walaupun kebenaran itu terasa malu.", realLife: "Mengakui kesilapan kepada guru dan ibu bapa dengan jujur.", schoolLife: "Firdaus berbohong bahawa dia pandai berenang dan hampir lemas akibatnya, membuktikan pentingnya kejujuran." },
      { value: "Bertanggungjawab", explanation: "Melaksanakan setiap tugasan dan tanggungjawab dengan serius.", realLife: "Menyiapkan kerja sekolah tanpa disuruh berulang kali.", schoolLife: "Johari bertanggungjawab menjaga dan memberi semangat kepada ahli kumpulan sepanjang ekspedisi." },
      { value: "Ketabahan", explanation: "Terus berusaha walaupun menghadapi dugaan dan kegagalan yang mencabar.", realLife: "Terus belajar walaupun keputusan peperiksaan tidak memuaskan.", schoolLife: "Azlina tabah meneruskan ekspedisi walaupun menghadapi pelbagai halangan dalam perjalanan." },
    ],
    lessons: [
      { value: "Kita hendaklah sentiasa bercakap benar", explanation: "Berbohong hanya mendatangkan masalah yang lebih besar kepada diri sendiri.", realLife: "Mengakui tidak tahu sesuatu perkara lebih baik daripada berbohong.", schoolLife: "Firdaus hampir lemas kerana berbohong bahawa dia pandai berenang kepada Mazlinda." },
      { value: "Kita hendaklah tabah menghadapi cabaran", explanation: "Ketabahan membantu kita melepasi dugaan dan akhirnya berjaya.", realLife: "Terus berusaha walaupun pelajaran terasa susah dan mencabar.", schoolLife: "Azlina dan Johari tabah mengatasi masalah basikal pancit dan terus menuju destinasi." },
      { value: "Kita hendaklah tidak mudah berputus asa", explanation: "Putus asa menghalang kita daripada mencapai matlamat yang ditetapkan.", realLife: "Cuba lagi dengan semangat baru selepas gagal dalam ujian.", schoolLife: "Firdaus meneruskan ekspedisi walaupun merasa penat dan pernah ingin berpatah balik." },
      { value: "Kita hendaklah menghargai cabaran sebagai peluang untuk belajar", explanation: "Setiap cabaran adalah pengajaran berharga yang tidak boleh diperoleh dari buku.", realLife: "Lihat setiap masalah sebagai peluang untuk berkembang menjadi lebih matang.", schoolLife: "Ekspedisi berbasikal mengajar Firdaus tentang kejujuran dan ketabahan." },
      { value: "Kita hendaklah berfikir sebelum bertindak", explanation: "Tindakan tergesa-gesa atau tidak jujur boleh mendatangkan bahaya yang tidak dijangka.", realLife: "Berfikir tentang akibat sebelum membuat sebarang keputusan penting.", schoolLife: "Firdaus tidak berfikir tentang akibat sebelum berbohong kepada Mazlinda." },
      { value: "Kita hendaklah menghargai jasa orang yang prihatin terhadap kita", explanation: "Orang yang memberi cabaran kepada kita sebenarnya mahu kebaikan kita.", realLife: "Menghargai nasihat ibu bapa dan guru walaupun terasa berat dilakukan.", schoolLife: "Cabaran Datuk bertujuan membentuk watak Firdaus menjadi lebih baik, bukan untuk menyusahkannya." },
    ],
    teacherExplains: [
      "Ramai murid rasa kasihan kepada Firdaus kerana dia hampir lemas. Sebenarnya peristiwa itu bukan untuk menakutkan pembaca — ia untuk mengajar. Soalan paling penting: apakah yang Firdaus pelajari selepas diselamatkan?",
      "Jangan lupa peranan Datuk dalam novel ini. Datuk bukan tegas tanpa sebab. Dia merancang ekspedisi kerana sayang kepada Firdaus dan mahu membentuk wataknya. Dalam novel ini, tegas bermakna prihatin.",
      "Azlina dan Johari penting dalam soalan nilai. Azlina menunjukkan nilai keberanian dan Johari menunjukkan nilai tanggungjawab. Jangan jawab soalan nilai dengan hanya menyebut Firdaus sahaja.",
      "Tema novel ini bukan sekadar cerita tentang ekspedisi berbasikal. Tema sebenarnya ialah bagaimana cabaran dan konflik membentuk jati diri seorang remaja. Firdaus pada akhir novel jauh lebih matang berbanding Firdaus pada awal cerita.",
    ],
    examBooster: {
      frequentPoints: [
        "Tema kerap ditanya: cabaran dan konflik remaja dalam membentuk jati diri.",
        "Nilai kerap ditanya: keberanian, kejujuran, ketabahan, bertanggungjawab.",
        "Fokus peperiksaan lazim: perwatakan Firdaus, pembohongan di Pantai Morib, keinsafan.",
        "Soalan lazim: peranan Datuk, sikap Azlina dan Johari, hubungan Firdaus dengan Mazlinda.",
      ],
      commonQuestions: [
        q("Apakah tema novel Destinasi Impian?", "Tema novel ini ialah cabaran dan konflik remaja dalam membentuk jati diri.", "Tema perlu menyebut proses perubahan Firdaus melalui cabaran.", "Jangan jawab hanya 'ekspedisi berbasikal' sahaja — sebut pembentukan jati diri."),
        q("Berikan satu perwatakan Firdaus beserta bukti.", "Firdaus tidak jujur kerana dia berbohong kepada Mazlinda bahawa dia pandai berenang sedangkan dia tidak boleh berenang.", "Perwatakan mesti disertai bukti yang jelas daripada novel.", "Format jawapan: Nama + sifat + bukti = jawapan lengkap dan mendapat markah penuh."),
        q("Nyatakan satu pengajaran daripada novel ini.", "Kita hendaklah sentiasa bercakap benar kerana berbohong boleh mendatangkan bahaya kepada diri sendiri.", "Pengajaran perlu bermula dengan ayat tindakan yang boleh diamalkan.", "Mulakan pengajaran dengan 'Kita hendaklah...'"),
      ],
    },
    revision: {
      theme: "Cabaran dan konflik remaja dalam membentuk jati diri.",
      values: "Keberanian, kesabaran, kejujuran, bertanggungjawab, ketabahan.",
      lessons: "Bercakap benar, tabah, tidak berputus asa, hargai cabaran, berfikir sebelum bertindak, hargai yang prihatin.",
      examTips: "Ingat: Firdaus manja → insaf. Datuk tegas → prihatin. Berbohong → hampir lemas. Diselamatkan → berubah jadi lebih baik.",
    },
    miniQuiz: quiz("Mengapakah Firdaus hampir lemas di Pantai Morib?", "Firdaus dengan nilai kejujuran dan akibat berbohong.", "Bagaimanakah pengalaman Firdaus dalam novel ini boleh mengajar remaja tentang pentingnya jati diri?"),
    masterCharacters: [
      { name: "Firdaus", role: "Watak utama yang mengalami perjalanan perubahan diri.", traits: ["Manja", "Mudah berputus asa", "Tidak jujur", "Berani berubah"], evidence: "Firdaus berbohong bahawa dia pandai berenang dan hampir lemas akibatnya, tetapi akhirnya sedar dan insaf.", relationships: "Dicabar oleh Datuk, ditemani oleh Azlina dan Johari, dan secara tidak langsung diuji oleh Mazlinda.", importance: "Menunjukkan bahawa remaja boleh berubah menjadi lebih matang melalui pengalaman dan cabaran." },
      { name: "Azlina", role: "Rakan Firdaus yang cergas dan berani.", traits: ["Cergas", "Berani", "Tegas", "Bertenaga"], evidence: "Azlina terus memberi semangat kepada Firdaus walaupun dia merungut sepanjang perjalanan.", relationships: "Rakan seperjuangan Firdaus yang menjadi sumber semangat dan inspirasi dalam kumpulan.", importance: "Menonjolkan nilai keberanian dan semangat tidak berputus asa dalam menghadapi cabaran." },
      { name: "Johari", role: "Rakan Firdaus yang matang dan bertanggungjawab.", traits: ["Matang", "Bertanggungjawab", "Penyabar", "Tenang"], evidence: "Johari membantu mengatasi masalah basikal pancit dan menjaga semangat ahli kumpulan.", relationships: "Rakan seperjuangan yang bertindak sebagai pemimpin tidak rasmi dan penyokong kumpulan.", importance: "Menunjukkan nilai tanggungjawab dan kepimpinan yang matang dalam kumpulan." },
      { name: "Datuk", role: "Datuk Firdaus yang merancang ekspedisi untuk mendidik cucunya.", traits: ["Tegas", "Prihatin", "Bijaksana", "Penyayang"], evidence: "Datuk merancang ekspedisi berbasikal untuk membentuk semangat dan watak Firdaus yang manja.", relationships: "Datuk kepada Firdaus yang memainkan peranan penting dalam proses pembentukan jati diri Firdaus.", importance: "Menunjukkan nilai prihatin dan tanggungjawab seorang orang tua terhadap pembentukan watak cucu." },
      { name: "Mazlinda", role: "Watak yang mendedahkan sifat tidak jujur Firdaus.", traits: ["Bijak", "Berani", "Peka"], evidence: "Mazlinda menguji Firdaus apabila dia mendakwa pandai berenang.", relationships: "Watak yang secara tidak langsung menjadi ujian kepada kejujuran Firdaus.", importance: "Peranannya mencetuskan peristiwa klimaks yang membawa kepada keinsafan Firdaus." },
    ],
    relationshipMap: [
      { from: "Datuk", relation: "mencabar", to: "Firdaus", explanation: "Datuk merancang ekspedisi untuk membentuk watak Firdaus yang manja. Cabaran ini menjadi titik permulaan perubahan positif Firdaus." },
      { from: "Firdaus", relation: "disokong oleh", to: "Azlina", explanation: "Azlina memberi semangat kepada Firdaus walaupun dia merungut, menunjukkan persahabatan yang setia dan ikhlas." },
      { from: "Firdaus", relation: "disokong oleh", to: "Johari", explanation: "Johari yang matang dan bertanggungjawab membantu Firdaus mengatasi masalah dalam perjalanan." },
      { from: "Firdaus", relation: "diuji oleh", to: "Mazlinda", explanation: "Mazlinda menguji kejujuran Firdaus yang akhirnya mendedahkan pembohongannya dan mencetuskan insiden di laut." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Datuk mencabar Firdaus menjalani ekspedisi berbasikal ke Pantai Morib bersama Azlina dan Johari.", why: "Datuk prihatin terhadap sikap manja Firdaus dan ingin membentuk semangat serta wataknya melalui pengalaman nyata.", effect: "Pembaca diperkenalkan kepada watak Firdaus yang manja dan cabaran yang menanti dalam perjalanan." },
      { stage: "Perkembangan", what: "Firdaus merungut dan enggan tetapi meneruskan perjalanan bersama Azlina dan Johari.", why: "Tekanan daripada rakan-rakan dan tanggungjawab memaksa Firdaus meneruskan perjalanan walaupun tidak bersemangat.", effect: "Hubungan antara ketiga-tiga watak berkembang dan perwatakan masing-masing mula terserlah dengan jelas." },
      { stage: "Konflik", what: "Pelbagai halangan berlaku termasuk basikal pancit dan Firdaus terjatuh dari basikalnya.", why: "Perjalanan yang jauh dan mencabar menguji ketabahan dan semangat kumpulan itu hingga ke had.", effect: "Firdaus terpaksa mengharungi kesukaran yang belum pernah dialaminya, memulakan proses pembentukan diri." },
      { stage: "Klimaks", what: "Firdaus berbohong kepada Mazlinda, hampir lemas di laut dan berjaya diselamatkan.", why: "Firdaus ingin menunjukkan diri kepada Mazlinda tetapi tidak sedar bahawa pembohongan itu boleh membahayakan nyawanya.", effect: "Insiden hampir lemas menjadi detik paling tegang cerita dan membuka jalan kepada keinsafan Firdaus." },
      { stage: "Peleraian", what: "Firdaus mengalami keinsafan dan berjanji untuk berubah menjadi insan yang lebih jujur dan bertanggungjawab.", why: "Pengalaman hampir lemas menyedarkan Firdaus tentang bahaya berbohong dan pentingnya kejujuran dalam kehidupan.", effect: "Pembaca melihat perubahan positif dalam diri Firdaus dan memahami mesej utama novel dengan jelas." },
    ],
    importantEvents: [
      { event: "Datuk memberi cabaran ekspedisi", what: "Datuk mencabar Firdaus menjalani ekspedisi berbasikal ke Pantai Morib.", whyImportant: "Cabaran ini menjadi titik bermulanya perjalanan perubahan diri Firdaus.", possibleQuestion: "Apakah tujuan Datuk mencabar Firdaus menjalani ekspedisi?" },
      { event: "Firdaus merungut dan enggan", what: "Firdaus merungut dan tidak mahu menyertai ekspedisi.", whyImportant: "Menunjukkan sikap manja Firdaus pada awal cerita sebelum berubah.", possibleQuestion: "Berikan bukti bahawa Firdaus seorang yang manja." },
      { event: "Basikal pancit semasa perjalanan", what: "Basikal mereka pancit semasa dalam perjalanan.", whyImportant: "Menguji ketabahan kumpulan dan menjadi konflik pertama dalam ekspedisi.", possibleQuestion: "Apakah cabaran yang dihadapi semasa ekspedisi berbasikal?" },
      { event: "Firdaus terjatuh dari basikal", what: "Firdaus terjatuh dari basikalnya semasa ekspedisi.", whyImportant: "Menguji kesabaran dan ketabahan Firdaus yang mudah berputus asa.", possibleQuestion: "Apakah peristiwa yang mencabar Firdaus semasa perjalanan?" },
      { event: "Tiba di Pantai Morib", what: "Kumpulan Firdaus berjaya tiba di Pantai Morib selepas perjalanan yang mencabar.", whyImportant: "Membuktikan bahawa usaha berterusan membuahkan hasil yang manis.", possibleQuestion: "Apakah kepentingan ketibaan mereka di Pantai Morib?" },
      { event: "Firdaus berbohong kepada Mazlinda", what: "Firdaus mendakwa pandai berenang padahal dia tidak boleh berenang langsung.", whyImportant: "Pembohongan ini menjadi punca konflik terbesar dan mengajar kepentingan kejujuran.", possibleQuestion: "Berikan bukti bahawa Firdaus tidak jujur dalam novel ini." },
      { event: "Firdaus hampir lemas di laut", what: "Firdaus terjun ke laut dan hampir lemas.", whyImportant: "Menjadi klimaks cerita dan akibat langsung daripada pembohongan Firdaus kepada Mazlinda.", possibleQuestion: "Apakah peristiwa klimaks dalam novel Destinasi Impian?" },
      { event: "Firdaus diselamatkan", what: "Firdaus berjaya diselamatkan daripada bahaya lemas.", whyImportant: "Penyelamatan memberi peluang kepada Firdaus untuk insaf dan berubah menjadi lebih baik.", possibleQuestion: "Apakah kesan peristiwa hampir lemas kepada Firdaus?" },
      { event: "Keinsafan Firdaus", what: "Firdaus menyedari kesilapannya dan berjanji untuk berubah.", whyImportant: "Menjadi mesej utama novel bahawa pengalaman pahit boleh mengubah seseorang menjadi lebih matang.", possibleQuestion: "Apakah bukti yang menunjukkan Firdaus telah mengalami keinsafan?" },
    ],
    keyCharacterFocus: {
      name: "Firdaus",
      whyMatters: "Firdaus penting kerana seluruh novel bergerak melalui perjalanan perubahan sikapnya daripada manja kepada matang dan bertanggungjawab.",
      supportsTheme: "Firdaus menunjukkan tema cabaran dan konflik remaja dalam membentuk jati diri melalui perjalanan dan pengalaman pahitnya.",
      supportsIssues: "Melalui Firdaus, murid dapat melihat persoalan kejujuran, semangat tidak berputus asa, persahabatan dan cabaran remaja.",
      supportsValues: "Firdaus menonjolkan nilai keberanian, kejujuran dan ketabahan — terutama melalui perubahan sikapnya selepas insiden di laut.",
      supportsLessons: "Melalui Firdaus, murid belajar bahawa berbohong mendatangkan bahaya dan cabaran membentuk kita menjadi individu yang lebih baik.",
    },
    authorPurpose: "Novel Destinasi Impian ditulis untuk mendidik remaja supaya tidak manja, tidak berbohong dan tidak mudah berputus asa. Melalui pengalaman Firdaus dalam ekspedisi berbasikal dan insiden di Pantai Morib, penulis mahu menunjukkan bahawa cabaran adalah cara terbaik untuk membentuk jati diri seseorang remaja.",
    examCharacterAnalysis: [
      { character: "Firdaus", trait: "Manja", evidence: "Firdaus merungut dan enggan menyertai ekspedisi pada awalnya.", modelAnswer: "Firdaus bersifat manja kerana dia merungut dan tidak mahu menyertai ekspedisi berbasikal yang dicabar oleh Datuknya." },
      { character: "Firdaus", trait: "Tidak jujur", evidence: "Firdaus berbohong kepada Mazlinda bahawa dia pandai berenang.", modelAnswer: "Firdaus bersifat tidak jujur kerana dia berbohong kepada Mazlinda bahawa dia pandai berenang sedangkan dia tidak boleh berenang langsung." },
      { character: "Azlina", trait: "Berani", evidence: "Azlina terus memberi semangat kepada kumpulan walaupun menghadapi pelbagai halangan.", modelAnswer: "Azlina bersifat berani kerana dia terus meneruskan ekspedisi dan memberi semangat kepada rakan-rakannya walaupun menghadapi pelbagai halangan." },
      { character: "Johari", trait: "Bertanggungjawab", evidence: "Johari membantu menguruskan masalah basikal pancit dan menjaga semangat kumpulan.", modelAnswer: "Johari bersifat bertanggungjawab kerana dia membantu menguruskan masalah yang timbul semasa ekspedisi dan memastikan semua ahli kumpulan terus bersemangat." },
      { character: "Datuk", trait: "Prihatin", evidence: "Datuk merancang ekspedisi untuk membentuk watak Firdaus yang manja.", modelAnswer: "Datuk bersifat prihatin kerana walaupun kelihatan tegas, dia merancang ekspedisi kerana sayangkan Firdaus dan mahu membentuk wataknya menjadi lebih baik." },
    ],
    memory60: {
      theme: "Cabaran dan konflik remaja membentuk jati diri.",
      issues: "Kejujuran, semangat tidak berputus asa, persahabatan, cabaran remaja, berfikir sebelum bertindak.",
      mainCharacters: "Firdaus, Azlina, Johari, Datuk, Mazlinda.",
      importantEvents: "Cabaran Datuk, merungut, basikal pancit, Firdaus jatuh, tiba Pantai Morib, berbohong, hampir lemas, diselamatkan, insaf.",
      values: "Keberanian, kesabaran, kejujuran, bertanggungjawab, ketabahan.",
      lessons: "Bercakap benar, tabah, tidak berputus asa, hargai cabaran, berfikir sebelum bertindak, hargai yang prihatin.",
    },
    issues: [
      { issue: "Kepentingan kejujuran", explanation: "Firdaus berbohong bahawa dia pandai berenang dan hampir lemas akibatnya. Ini mengajar murid bahawa berbohong boleh mendatangkan bahaya bukan sahaja kepada orang lain, malah kepada diri sendiri." },
      { issue: "Semangat tidak berputus asa", explanation: "Firdaus, Azlina dan Johari terpaksa mengatasi pelbagai cabaran semasa ekspedisi. Semangat tidak berputus asa mengajar murid bahawa kegigihan adalah kunci kejayaan." },
      { issue: "Persahabatan yang setia", explanation: "Hubungan antara Firdaus, Azlina dan Johari menunjukkan kepentingan rakan yang baik dalam membantu kita melalui cabaran yang sukar." },
      { issue: "Cabaran remaja dalam membentuk jati diri", explanation: "Ekspedisi berbasikal menjadi cabaran yang mengubah Firdaus daripada seorang remaja yang manja kepada individu yang lebih matang dan bertanggungjawab." },
      { issue: "Kepentingan berfikir sebelum bertindak", explanation: "Firdaus tidak memikirkan akibat sebelum berbohong kepada Mazlinda. Insiden hampir lemas mengajar bahawa setiap tindakan ada akibatnya." },
    ],
    uasaQuestions: [
      { type: "MCQ", question: "Apakah tujuan Datuk mencabar Firdaus menjalani ekspedisi berbasikal?", answer: "Untuk membentuk semangat dan watak Firdaus yang manja.", explanation: "Datuk prihatin terhadap sikap manja Firdaus dan mahu membentuknya melalui pengalaman nyata." },
      { type: "MCQ", question: "Apakah yang berlaku apabila Firdaus berbohong kepada Mazlinda?", answer: "Firdaus hampir lemas apabila terjun ke laut kerana sebenarnya tidak boleh berenang.", explanation: "Pembohongan Firdaus mendatangkan bahaya kepada dirinya sendiri di laut." },
      { type: "MCQ", question: "Siapakah watak yang menunjukkan nilai ketabahan dengan jelas dalam novel ini?", answer: "Azlina, kerana dia terus memberi semangat kepada kumpulan sepanjang ekspedisi.", explanation: "Azlina cergas dan berani, terus memberi semangat walaupun menghadapi pelbagai halangan." },
      { type: "MCQ", question: "Apakah peristiwa yang menjadi klimaks dalam novel Destinasi Impian?", answer: "Firdaus hampir lemas di laut kerana berbohong bahawa dia pandai berenang.", explanation: "Insiden hampir lemas adalah peristiwa paling tegang yang membawa kepada perubahan Firdaus." },
      { type: "MCQ", question: "Apakah perubahan yang berlaku kepada Firdaus pada akhir novel?", answer: "Firdaus insaf dan berjanji untuk tidak berbohong lagi serta menjadi individu yang lebih baik.", explanation: "Keinsafan Firdaus menunjukkan perubahan positif selepas pengalaman pahit di Pantai Morib." },
      { type: "Struktur", question: "Nyatakan tema novel Destinasi Impian.", answer: "Tema novel Destinasi Impian ialah cabaran dan konflik remaja dalam membentuk jati diri.", explanation: "Tema perlu menyebut proses perubahan diri Firdaus melalui cabaran yang dialaminya." },
      { type: "Struktur", question: "Berikan satu perwatakan Firdaus beserta buktinya.", answer: "Firdaus tidak jujur kerana dia berbohong kepada Mazlinda bahawa dia pandai berenang sedangkan dia tidak boleh berenang.", explanation: "Jawapan perwatakan perlu ada nama watak, sifat dan bukti daripada novel." },
      { type: "Struktur", question: "Nyatakan satu nilai dalam novel ini beserta contoh peristiwanya.", answer: "Nilai ketabahan dapat dilihat apabila Azlina terus memberi semangat kepada rakan-rakannya walaupun menghadapi halangan seperti basikal pancit semasa ekspedisi.", explanation: "Nilai perlu disertai dengan bukti atau contoh peristiwa yang jelas daripada novel." },
      { type: "Struktur", question: "Nyatakan dua pengajaran yang terdapat dalam novel Destinasi Impian.", answer: "Pertama, kita hendaklah sentiasa bercakap benar kerana berbohong boleh mendatangkan bahaya. Kedua, kita hendaklah tabah menghadapi cabaran supaya dapat mencapai matlamat yang ditetapkan.", explanation: "Pengajaran perlu bermula dengan 'Kita hendaklah' dan berkaitan dengan peristiwa dalam novel." },
      { type: "Struktur", question: "Apakah peranan Datuk dalam novel Destinasi Impian?", answer: "Datuk berperanan sebagai pendorong kepada Firdaus. Beliau mencabar Firdaus menjalani ekspedisi berbasikal untuk membentuk semangat dan watak Firdaus yang manja.", explanation: "Peranan watak perlu diterangkan dengan jelas beserta tindakan watak tersebut dalam novel." },
      { type: "KBAT", question: "Pada pendapat anda, mengapakah pengalaman pahit penting dalam kehidupan remaja?", answer: "Pengalaman pahit penting kerana ia mengajar kita sesuatu yang tidak dapat dipelajari hanya daripada buku. Sama seperti Firdaus yang berubah selepas hampir lemas, pengalaman sukar memaksa kita berfikir, bersabar dan belajar daripada kesilapan. Ini membantu kita menjadi individu yang lebih matang dan bertanggungjawab.", explanation: "Jawapan KBAT perlu mengaitkan pengajaran novel dengan kehidupan murid sendiri." },
      { type: "KBAT", question: "Sekiranya anda berada dalam situasi Firdaus, apakah tindakan yang sepatutnya anda ambil apabila tidak tahu berenang tetapi diminta masuk ke laut?", answer: "Saya sepatutnya mengakui dengan jujur bahawa saya tidak tahu berenang. Kejujuran lebih penting daripada rasa malu. Berbohong hanya mendatangkan bahaya seperti yang dialami oleh Firdaus. Lebih baik mengakui kelemahan diri dan meminta bantuan orang lain.", explanation: "Soalan KBAT ini menilai keupayaan murid mengaitkan nilai novel dengan situasi kehidupan sebenar." },
      { type: "KBAT", question: "Bagaimanakah hubungan persahabatan antara Firdaus, Azlina dan Johari mempengaruhi jalan cerita novel?", answer: "Hubungan persahabatan mereka memainkan peranan penting kerana Azlina dan Johari sentiasa memberi semangat kepada Firdaus walaupun dia merungut. Tanpa sokongan mereka, Firdaus mungkin tidak akan meneruskan ekspedisi. Persahabatan yang baik membantu kita melalui cabaran dan menjadi lebih kuat.", explanation: "Soalan KBAT ini menilai kefahaman murid tentang kepentingan hubungan antara watak dalam menggerakkan cerita." },
    ],
  },
  {
    id: "pelari-muda",
    title: "Pelari Muda",
    typeLabel: "Novel",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Kamarul + Keinsafan + Encik Kadir + Sukan SEA",
    intro: "Novel tentang seorang atlet pelari yang berjaya tetapi lupa diri, dan perjalanannya kembali kepada keinsafan selepas mengalami kemalangan jalan raya.",
    movieTrailer: "Kamarul seorang pelari berbakat menjadi terkenal dan terus sombong — mengabaikan latihan dan menyakiti hati Saridah. Pertengkaran hebat dengan Encik Kadir mencetuskan kemalangan jalan raya yang mengubah segalanya. Di hospital, Kamarul merenung kesilapannya. Dengan bimbingan De Wega dan sokongan Encik Kadir, beliau bangkit dan menjadi juara Sukan SEA.",
    story60: "Kamarul ialah pelari muda berbakat yang menjadi terkenal selepas memenangi beberapa kejohanan. Namun kejayaan itu membuatkan beliau sombong, mengabaikan latihan dan bersikap kasar kepada Saridah serta Encik Kadir. Selepas kemalangan jalan raya dan dirawat di hospital, Kamarul insaf dan kembali berlatih dengan bersungguh-sungguh. Beliau akhirnya menjadi juara Sukan SEA.",
    story90: "Novel Pelari Muda bermula dengan kejayaan Kamarul sebagai atlet pelari berbakat yang meraih kemenangan dalam pelbagai kejohanan. Kemasyhuran mendatangkan perubahan buruk — Kamarul menjadi sombong, bersikap kasar kepada Saridah rakan baiknya, dan mengabaikan arahan Encik Kadir jurulatihnya. Pertengkaran hebat berlaku antara Kamarul dan Encik Kadir apabila Kamarul enggan mematuhi disiplin latihan. Dalam keadaan marah, Kamarul mengalami kemalangan jalan raya yang teruk dan dimasukkan ke hospital. Di sinilah titik keinsafan bermula. Kamarul merenung semula segala kesilapannya, memohon maaf kepada Encik Kadir dan Saridah. Dengan bimbingan De Wega seorang atlet berpengalaman yang merendah diri, Kamarul kembali berlatih dengan penuh semangat dan disiplin. Usaha keras dan keinsafan itu membuahkan hasil — Kamarul bukan sahaja memenangi pingat emas Sukan SEA malah memecahkan rekod baru sebagai bukti kejayaan yang lahir daripada kerendahan hati.",
    decoder: [
      { rangkap: "Fasa 1", pantunMudah: "Kamarul mula dikenali sebagai pelari berbakat yang memenangi pertandingan.", maksud: "Bakat dan usaha keras Kamarul pada peringkat awal menjadikannya disanjungi ramai.", tema: "Kebangkitan Kamarul", nilai: "Keyakinan diri", pengajaran: "Kita hendaklah menggunakan bakat sebagai tanggungjawab, bukan alasan untuk berasa lebih baik daripada orang lain." },
      { rangkap: "Fasa 2", pantunMudah: "Kejayaan membuatkan Kamarul lupa diri — beliau mula sombong dan mengabaikan latihan.", maksud: "Kemasyhuran mengubah sikap Kamarul daripada bersungguh-sungguh kepada sambil lewa dan angkuh.", tema: "Kesombongan melanda", nilai: "Bahaya kesombongan", pengajaran: "Kita hendaklah sentiasa bersikap rendah diri walaupun telah mencapai kejayaan." },
      { rangkap: "Fasa 3", pantunMudah: "Kamarul bersikap kasar kepada Saridah dan bertengkar dengan Encik Kadir kerana enggan menerima teguran.", maksud: "Sikap angkuh Kamarul merosakkan hubungannya dengan orang yang benar-benar mengambil berat tentangnya.", tema: "Hubungan retak", nilai: "Kepentingan menghormati orang lain", pengajaran: "Kita hendaklah menghormati guru dan sahabat kerana mereka menegur kita kerana sayang." },
      { rangkap: "Fasa 4", pantunMudah: "Kemalangan jalan raya menjadi titik balik — Kamarul terpaksa berbaring di hospital dan berfikir tentang hidupnya.", maksud: "Kemalangan bukan hukuman — ia peluang yang diberikan kepada Kamarul untuk merenung dan berubah.", tema: "Kemalangan mengubah segalanya", nilai: "Pengajaran daripada kesusahan", pengajaran: "Kita hendaklah mengambil iktibar daripada setiap kesusahan sebagai peluang untuk menjadi lebih baik." },
      { rangkap: "Fasa 5", pantunMudah: "Di hospital, Kamarul insaf dan memohon maaf kepada Encik Kadir serta Saridah.", maksud: "Keinsafan Kamarul menunjukkan bahawa menyedari kesilapan adalah langkah pertama menuju perubahan yang nyata.", tema: "Keinsafan dan penyesalan", nilai: "Keinsafan", pengajaran: "Kita hendaklah berani memohon maaf apabila kita menyedari bahawa kita telah melakukan kesalahan." },
      { rangkap: "Fasa 6", pantunMudah: "Dengan bimbingan De Wega dan sokongan rakan-rakan, Kamarul kembali berlatih dengan sepenuh hati.", maksud: "Tindakan Kamarul kembali berlatih membuktikan bahawa keinsafannya bukan sekadar kata-kata sahaja.", tema: "Bangkit semula", nilai: "Ketabahan", pengajaran: "Kita hendaklah membuktikan keinsafan kita melalui tindakan yang nyata dan bukan sekadar janji." },
      { rangkap: "Fasa 7", pantunMudah: "Kamarul menjadi juara Sukan SEA — kejayaan kali ini lebih bermakna kerana lahir daripada keinsafan dan usaha keras.", maksud: "Kejayaan yang diraih Kamarul kali ini berbeza kerana ia bukan hasil bakat semata-mata tetapi juga hasil disiplin dan rendah diri.", tema: "Kemenangan sejati", nilai: "Disiplin membawa kejayaan", pengajaran: "Kita hendaklah sedar bahawa kejayaan yang bermakna lahir daripada usaha keras dan budi pekerti yang mulia." },
      { rangkap: "Fasa 8", pantunMudah: "Kamarul memecahkan rekod baharu sebagai bukti bahawa disiplin dan rendah diri membawa kejayaan yang berkekalan.", maksud: "Rekod baru itu bukan sekadar pencapaian sukan — ia simbol perubahan total dalam diri Kamarul sebagai manusia.", tema: "Rekod baru", nilai: "Kerja keras", pengajaran: "Kita hendaklah menjaga disiplin dan rendah diri supaya kejayaan yang kita capai dapat bertahan lama." },
    ],
    timeline: [
      { stage: "Permulaan", text: "Kamarul menjadi atlet pelari terkenal selepas memenangi pelbagai pertandingan. Namun kejayaan mula mengubah peribadinya." },
      { stage: "Perkembangan", text: "Kamarul semakin sombong — mengabaikan latihan, bersikap kasar kepada Saridah dan tidak mahu menerima teguran Encik Kadir." },
      { stage: "Konflik", text: "Pertengkaran hebat meletus antara Kamarul dan Encik Kadir. Kamarul meninggalkan tempat latihan dalam keadaan marah." },
      { stage: "Klimaks", text: "Kamarul mengalami kemalangan jalan raya yang serius dan dimasukkan ke hospital. Beliau merenung segala kesilapannya." },
      { stage: "Peleraian", text: "Kamarul insaf, memohon maaf, kembali berlatih dengan bimbingan De Wega, dan akhirnya menjadi juara Sukan SEA sambil memecahkan rekod baru." },
    ],
    characters: [
      { name: "Kamarul", personality: "Berbakat tetapi sombong dan angkuh pada awal cerita, kemudian berani mengakui kesilapan dan gigih berjuang pada akhir cerita.", evidence: "Kamarul mengabaikan latihan dan bersikap kasar kepada Saridah apabila menjadi terkenal, tetapi memohon maaf dan kembali berlatih selepas kemalangan.", importance: "Perjalanan Kamarul daripada kesombongan kepada keinsafan adalah inti sari keseluruhan novel dan menjadi teladan kepada pembaca." },
      { name: "Encik Kadir", personality: "Penyabar, bertanggungjawab dan berdedikasi dalam mendidik anak didiknya walaupun diperlakukan dengan buruk.", evidence: "Encik Kadir terus bersabar dan tidak berputus asa walaupun Kamarul bertengkar dengannya dan meninggalkan padang latihan.", importance: "Encik Kadir mewakili nilai tanggungjawab dan dedikasi seorang pendidik yang tidak pernah menyerah pada anak didiknya." },
      { name: "Saridah", personality: "Prihatin, setia berkawan dan pemaaf walaupun telah diperlakukan dengan buruk oleh Kamarul.", evidence: "Saridah terus mengambil berat tentang Kamarul dan memaafkan beliau apabila Kamarul memohon maaf selepas insaf.", importance: "Saridah mewakili nilai persahabatan sejati yang tetap setia pada waktu susah dan sudi memaafkan tanpa syarat." },
      { name: "De Wega", personality: "Berdisiplin, merendah diri dan suka memberi nasihat walaupun beliau lebih berjaya daripada orang lain.", evidence: "De Wega yang lebih berpengalaman sanggup turun padang membimbing Kamarul tanpa menunjuk-nunjuk kebaikan dirinya.", importance: "De Wega membuktikan bahawa kejayaan sebenar datang daripada rendah diri dan disiplin, bukan bakat sahaja." },
    ],
    events: [
      { event: "Kamarul menjadi terkenal", whatHappened: "Kamarul meraih pelbagai kemenangan dalam pertandingan lari dan mula dikenali ramai.", whyItMatters: "Kejayaan awal ini yang membibitkan benih kesombongan dalam diri Kamarul.", examFocus: "Apakah yang berlaku selepas Kamarul menjadi terkenal?" },
      { event: "Kamarul mengabaikan latihan", whatHappened: "Kamarul mula tidak serius dalam latihan, terlambat hadir dan tidak mengikut arahan Encik Kadir.", whyItMatters: "Peristiwa ini menunjukkan kesan buruk kesombongan ke atas disiplin seorang atlet.", examFocus: "Apakah sikap Kamarul terhadap latihan selepas beliau menjadi terkenal?" },
      { event: "Bersikap kasar kepada Saridah", whatHappened: "Kamarul berkasar dan mengabaikan perasaan Saridah yang cuba membantunya.", whyItMatters: "Menunjukkan betapa jauhnya Kamarul telah berubah daripada dirinya yang asal.", examFocus: "Bagaimanakah Kamarul melayan Saridah?" },
      { event: "Bertengkar dengan Encik Kadir", whatHappened: "Kamarul enggan menerima teguran dan bertengkar dengan Encik Kadir lalu meninggalkan padang latihan.", whyItMatters: "Titik puncak konflik yang mencetuskan kemalangan.", examFocus: "Apakah punca pertengkaran antara Kamarul dan Encik Kadir?" },
      { event: "Membuang pingat", whatHappened: "Dalam kemarahan, Kamarul membuang pingat kemenangannya sebagai tanda protes.", whyItMatters: "Menggambarkan betapa Kamarul telah hilang kawalan diri dan arah tujuan hidupnya.", examFocus: "Apakah yang dilakukan Kamarul semasa pertengkaran dengan Encik Kadir?" },
      { event: "Kemalangan jalan raya", whatHappened: "Kamarul mengalami kemalangan yang serius semasa meninggalkan kawasan latihan dalam keadaan marah.", whyItMatters: "Peristiwa paling penting — titik balik yang memaksa Kamarul berhenti dan berfikir.", examFocus: "Apakah peristiwa yang mengubah hidup Kamarul?" },
      { event: "Dirawat di hospital", whatHappened: "Kamarul terpaksa berbaring di hospital, merenung kembali segala tindakannya.", whyItMatters: "Masa di hospital memberi ruang kepada Kamarul untuk berfikir dan insaf.", examFocus: "Apakah yang berlaku kepada Kamarul selepas kemalangan?" },
      { event: "Memohon maaf", whatHappened: "Kamarul memohon maaf kepada Encik Kadir dan Saridah atas segala kesilapannya.", whyItMatters: "Menunjukkan keberanian mengakui kesalahan — tanda keinsafan yang sebenar.", examFocus: "Apakah tindakan Kamarul selepas insaf?" },
      { event: "Kembali berlatih", whatHappened: "Dengan bimbingan De Wega dan sokongan Encik Kadir, Kamarul kembali berlatih dengan penuh disiplin.", whyItMatters: "Membuktikan bahawa keinsafan perlu dibuktikan melalui tindakan, bukan hanya kata-kata.", examFocus: "Bagaimanakah Kamarul membuktikan keinsafannya?" },
      { event: "Menang pingat emas dan memecahkan rekod", whatHappened: "Kamarul menjadi juara Sukan SEA dan memecahkan rekod baru.", whyItMatters: "Kejayaan akhir yang lahir daripada disiplin dan keinsafan — lebih bermakna daripada kejayaan awal.", examFocus: "Apakah pencapaian Kamarul selepas kembali berlatih?" },
    ],
    theme: {
      title: "Keinsafan membawa kejayaan",
      explanation: "Novel ini mengajar bahawa kejayaan tanpa disiplin dan rendah diri tidak akan berkekalan. Hanya apabila seseorang insaf dan berani berubah, barulah kejayaan yang sebenar dapat dicapai.",
      whyItMatters: "Tema ini penting kerana ramai remaja berfikir bahawa bakat sahaja sudah cukup. Novel ini membuktikan bahawa sikap dan disiplin lebih penting daripada bakat semata-mata.",
    },
    values: [
      { value: "Disiplin", explanation: "Menjaga waktu, mematuhi arahan dan bersungguh-sungguh dalam latihan.", realLife: "Datang tepat pada masanya dan siapkan kerja dengan teliti.", schoolLife: "Ulang kaji mengikut jadual walaupun tiada ujian yang hampir." },
      { value: "Keinsafan", explanation: "Menyedari kesilapan diri dan berani mengakui serta memperbaikinya.", realLife: "Memohon maaf dengan ikhlas apabila melakukan kesalahan.", schoolLife: "Mengakui bahawa jawapan ujian silap dan belajar daripada kesilapan itu." },
      { value: "Bertanggungjawab", explanation: "Memikul tanggungjawab terhadap diri sendiri, keluarga dan rakan-rakan.", realLife: "Menunaikan janji dan tidak membuat alasan apabila gagal.", schoolLife: "Menyiapkan tugasan tepat pada masa dan tidak menyalahkan orang lain." },
      { value: "Kasih sayang", explanation: "Mengambil berat terhadap orang yang kita sayangi walaupun mereka melakukan kesilapan.", realLife: "Membantu ahli keluarga atau rakan yang dalam kesusahan.", schoolLife: "Membantu rakan yang tidak faham pelajaran tanpa mengejek mereka." },
      { value: "Ketabahan", explanation: "Terus berjuang walaupun menghadapi cabaran dan kegagalan.", realLife: "Tidak putus asa walaupun gagal kali pertama.", schoolLife: "Terus belajar walaupun mendapat markah rendah dalam ujian." },
    ],
    lessons: [
      { value: "Kita hendaklah sentiasa bersikap rendah diri walaupun telah berjaya", explanation: "Kesombongan hanya membawa kegagalan — Kamarul hampir musnah kerjayanya akibat sikap sombong.", realLife: "Jangan berlagak apabila mendapat markah tinggi, terus berusaha lebih keras.", schoolLife: "Kamarul yang sombong mengabaikan latihan dan hampir kehilangan kerjayanya sebagai atlet." },
      { value: "Kita hendaklah mematuhi arahan guru atau jurulatih", explanation: "Guru dan jurulatih mempunyai pengalaman yang lebih luas dan teguran mereka adalah untuk kebaikan kita.", realLife: "Dengar nasihat ibu bapa dan guru walaupun terasa berat pada mulanya.", schoolLife: "Kamarul bertengkar dengan Encik Kadir dan ini mencetuskan kemalangan yang mengubah hidupnya." },
      { value: "Kita hendaklah berani mengakui kesilapan dan memohon maaf", explanation: "Mengakui kesalahan memerlukan keberanian yang lebih besar daripada memenangi sebarang pertandingan.", realLife: "Akui kesilapan dengan jujur dan perbaiki hubungan yang telah rosak.", schoolLife: "Kamarul memohon maaf kepada Encik Kadir dan Saridah sebagai tanda keinsafan yang tulus." },
      { value: "Kita hendaklah menjaga disiplin dalam semua perkara", explanation: "Disiplin adalah asas kepada setiap kejayaan — tanpanya, bakat sahaja tidak mencukupi.", realLife: "Ikut jadual belajar dan siapkan kerja tepat pada masa tanpa perlu disuruh.", schoolLife: "Kamarul yang tidak berdisiplin mengalami kemerosotan dalam prestasi dan persahabatan." },
      { value: "Kita hendaklah menghargai persahabatan sejati", explanation: "Persahabatan yang tulus hadir pada waktu suka mahupun duka — kita perlu menghargainya.", realLife: "Perlakukan rakan-rakan dengan baik kerana mereka adalah harta yang paling berharga.", schoolLife: "Saridah setia kepada Kamarul walaupun diperlakukan dengan buruk — persahabatan sejati itu tidak berbelah bahagi." },
      { value: "Kita hendaklah belajar daripada pengalaman pahit", explanation: "Pengalaman pahit adalah guru terbaik yang mengajar apa yang tidak dapat ditemui dalam buku.", realLife: "Jadikan setiap kegagalan sebagai batu loncatan untuk menjadi lebih kuat.", schoolLife: "Kemalangan Kamarul mengajarnya lebih banyak tentang erti disiplin dan rendah diri berbanding kejayaan semata-mata." },
    ],
    teacherExplains: [
      "Ramai murid berfikir bahawa novel ini hanya mengenai sukan. Sebenarnya novel ini mengajar bahawa kejayaan tanpa disiplin dan rendah diri boleh membawa kegagalan. Sukan hanyalah latar belakang — mesej sebenarnya adalah tentang peribadi dan sikap seseorang.",
      "Kamarul bukan watak jahat — beliau cuma lupa diri apabila berjaya. Ini perkara yang boleh berlaku kepada sesiapa sahaja. Yang membezakan beliau ialah keberaniannya untuk insaf dan berubah. Inilah yang menjadikan beliau watak yang kuat dalam novel ini.",
      "Encik Kadir kelihatan keras tetapi beliau sebenarnya sangat sayangkan Kamarul. Teguran beliau adalah tanda tanggungjawab seorang jurulatih yang berdedikasi. Murid perlu faham bahawa guru yang menegur itu lebih sayang daripada yang membiarkan kita melakukan kesilapan.",
      "Dalam novel ini, keinsafan Kamarul tidak hanya kata-kata. Beliau buktikan melalui tindakan — kembali berlatih, menghormati Encik Kadir dan akhirnya menang Sukan SEA. Ini mengajar kita bahawa keinsafan tanpa tindakan tidak bermakna apa-apa.",
    ],
    examBooster: {
      frequentPoints: [
        "Tema keinsafan membawa kejayaan — paling kerap keluar dalam soalan tema",
        "Perwatakan Kamarul — berbakat tetapi sombong, kemudian insaf dan gigih",
        "Peranan Encik Kadir sebagai jurulatih yang berdedikasi dan penyabar",
        "Peristiwa kemalangan jalan raya sebagai titik balik utama",
        "Nilai disiplin dan keinsafan — wajib disertakan contoh peristiwa",
        "Pengajaran 'Kita hendaklah rendah diri' dan 'Kita hendaklah mematuhi arahan guru'",
      ],
      commonQuestions: [
        { question: "Apakah tema novel Pelari Muda?", answerHint: "Tema: Keinsafan membawa kejayaan. Hurai dengan contoh perubahan Kamarul selepas kemalangan.", modelAnswer: "Tema novel ini ialah keinsafan membawa kejayaan. Hal ini terbukti apabila Kamarul yang sombong dan tidak berdisiplin mengalami kemalangan, lalu insaf dan kembali berlatih dengan bersungguh-sungguh sehingga menjadi juara Sukan SEA.", explanation: "Tema perlu ditulis lengkap dan disokong dengan bukti daripada cerita.", examTip: "Jangan tulis hanya 'sukan' — tema sebenar adalah tentang keinsafan dan perubahan sikap." },
        { question: "Huraikan perwatakan Kamarul dalam novel Pelari Muda.", answerHint: "Sebut sekurang-kurangnya dua perwatakan — sombong pada awal cerita, insaf dan gigih pada akhir cerita.", modelAnswer: "Pada awal cerita, Kamarul bersifat sombong dan angkuh apabila beliau mula terkenal. Beliau mengabaikan latihan dan bersikap kasar kepada Saridah. Namun selepas kemalangan, beliau menunjukkan sifat berani mengakui kesilapan apabila memohon maaf kepada Encik Kadir dan Saridah, serta gigih apabila kembali berlatih sehingga menjadi juara.", explanation: "Perwatakan perlu disokong dengan peristiwa sebagai bukti.", examTip: "Jangan hanya senaraikan sifat — sertakan peristiwa sebagai bukti untuk setiap sifat." },
      ],
    },
    revision: {
      theme: "Keinsafan membawa kejayaan",
      values: "Disiplin, Keinsafan, Bertanggungjawab, Kasih sayang, Ketabahan",
      lessons: "Rendah diri, Patuhi arahan guru, Akui kesilapan, Jaga disiplin, Hargai persahabatan, Belajar daripada pengalaman pahit",
      examTips: "Fokus pada perubahan Kamarul — dari sombong kepada insaf. Sertakan bukti peristiwa untuk setiap perwatakan dan nilai.",
    },
    miniQuiz: [
      { question: "Aneka Pilihan: Apakah yang menyebabkan Kamarul menjadi sombong?", answerHint: "Ruang jawapan: pilih pilihan yang paling tepat — A) Kemiskinan B) Kejayaan dalam pertandingan C) Arahan ibu bapa D) Nasihat De Wega" },
      { question: "Padanan: Padankan watak dengan perwatakannya — Encik Kadir / Saridah / De Wega", answerHint: "Encik Kadir = Berdedikasi dan penyabar; Saridah = Prihatin dan pemaaf; De Wega = Berdisiplin dan merendah diri" },
      { question: "Benar atau Salah: Kamarul terus sombong sehingga akhir novel.", answerHint: "Salah — Kamarul insaf selepas kemalangan dan kembali berlatih dengan bersungguh-sungguh." },
    ],
    masterCharacters: [
      {
        name: "Kamarul",
        role: "Watak Utama / Protagonis",
        traits: ["Berbakat", "Sombong", "Angkuh", "Berani mengakui kesilapan", "Gigih"],
        evidence: "Kemasyhuran Kamarul membuatkannya lupa diri — beliau mengabaikan latihan dan menyakiti hati Saridah. Namun kemalangan jalan raya menjadi titik sedar yang mengubah hidupnya.",
        relationships: "Kamarul berkonflik dengan Encik Kadir tetapi akhirnya menghormatinya; diabaikan Saridah tetapi dipemaafkan; dibimbing De Wega untuk bangkit semula.",
        importance: "Perjalanan Kamarul daripada kesombongan kepada keinsafan adalah inti sari keseluruhan novel ini.",
      },
      {
        name: "Encik Kadir",
        role: "Jurulatih / Mentor",
        traits: ["Penyabar", "Bertanggungjawab", "Berdedikasi"],
        evidence: "Walaupun Kamarul tidak menghormatinya, Encik Kadir terus sabar dan tidak berputus asa dalam membimbing anak didiknya.",
        relationships: "Encik Kadir ialah guru yang paling berpengaruh dalam hidup Kamarul — pertengkaran mereka menjadi titik balik cerita.",
        importance: "Encik Kadir mewakili nilai tanggungjawab seorang pendidik yang tidak berputus asa walaupun pelajarnya bersikap degil.",
      },
      {
        name: "Saridah",
        role: "Rakan Baik",
        traits: ["Prihatin", "Setia berkawan", "Pemaaf"],
        evidence: "Saridah terus mengambil berat tentang Kamarul walaupun beliau telah diperlakukan dengan buruk oleh Kamarul.",
        relationships: "Saridah ialah cermin yang menunjukkan betapa jauhnya Kamarul telah menyimpang daripada nilai persahabatan yang sebenar.",
        importance: "Saridah mewakili nilai persahabatan sejati — setia dan sudi memaafkan tanpa syarat.",
      },
      {
        name: "De Wega",
        role: "Mentor Sukan",
        traits: ["Berdisiplin", "Merendah diri", "Memberi nasihat"],
        evidence: "De Wega ialah atlet berpengalaman yang merendah diri dan sudi berkongsi pengalaman untuk membantu Kamarul bangkit semula.",
        relationships: "De Wega hadir sebagai panduan baharu yang melengkapi peranan Encik Kadir dalam membentuk semula Kamarul.",
        importance: "De Wega membuktikan bahawa kejayaan sebenar datang daripada rendah diri dan disiplin, bukan bakat semata-mata.",
      },
    ],
    relationshipMap: [
      { from: "Kamarul", relation: "bertengkar kemudian menghormati", to: "Encik Kadir", explanation: "Konflik antara Kamarul dan Encik Kadir mencetuskan perjalanan keinsafan Kamarul — pertengkaran itu sebenarnya tanda Encik Kadir sangat ambil berat." },
      { from: "Kamarul", relation: "menyakiti kemudian memohon maaf", to: "Saridah", explanation: "Kamarul menyedari betapa berharganya persahabatan Saridah hanya selepas beliau telah menyakiti hatinya — ini mengajar nilai persahabatan sejati." },
      { from: "De Wega", relation: "membimbing dan menasihati", to: "Kamarul", explanation: "De Wega menjadi cermin kepada Kamarul — dengan merendah diri walaupun lebih berjaya, De Wega mengajar Kamarul erti kejayaan yang sebenar." },
      { from: "Encik Kadir", relation: "mendidik dengan penuh sabar", to: "Kamarul", explanation: "Kesabaran dan dedikasi Encik Kadir akhirnya membuahkan hasil apabila Kamarul kembali berlatih dan menjadi juara — ini membuktikan tanggungjawab seorang pendidik." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Kamarul diperkenalkan sebagai atlet pelari berbakat yang mula meraih kemenangan dan menjadi terkenal di peringkat sekolah dan negeri.", why: "Bahagian ini meletakkan asas cerita — pembaca perlu faham bahawa Kamarul pada mulanya adalah seorang yang berbakat dan berdedikasi sebelum kejayaan mengubahnya.", effect: "Pembaca berasa kagum dengan Kamarul pada peringkat awal, menjadikan perubahan buruknya lebih mengejutkan dan berkesan." },
      { stage: "Perkembangan", what: "Seiring dengan peningkatan kemasyhurannya, Kamarul mula sombong. Beliau mengabaikan latihan, ingkar arahan Encik Kadir dan bersikap kasar kepada Saridah.", why: "Perkembangan ini menunjukkan kepada pembaca betapa halusnya pengaruh kesombongan — ia berlaku perlahan-lahan sehingga Kamarul sendiri tidak sedar.", effect: "Hubungan Kamarul dengan Encik Kadir dan Saridah mula retak, mewujudkan ketegangan yang akan membawa kepada konflik yang lebih besar." },
      { stage: "Konflik", what: "Pertengkaran besar antara Kamarul dan Encik Kadir mencapai kemuncaknya apabila Kamarul meninggalkan padang latihan dalam kemarahan selepas membuang pingatnya.", why: "Konflik ini adalah nadi cerita — ia menguji perwatakan semua watak dan menentukan arah perjalanan seterusnya.", effect: "Tindakan Kamarul meninggalkan padang latihan dalam kemarahan secara langsung mencetuskan kemalangan jalan raya yang menjadi titik balik hidupnya." },
      { stage: "Klimaks", what: "Kamarul mengalami kemalangan jalan raya yang serius dan terpaksa dirawat di hospital. Dalam kesunyian bilik hospital, beliau merenung segala kesilapannya.", why: "Kemalangan adalah titik balik yang paling penting — tanpanya, Kamarul mungkin tidak pernah sedar atau berubah.", effect: "Masa yang terpaksa dihabiskan di hospital memberi ruang kepada Kamarul untuk menyedari kesalahannya dan membuat keputusan untuk berubah." },
      { stage: "Peleraian", what: "Kamarul insaf dan memohon maaf kepada Encik Kadir dan Saridah. Dengan bimbingan De Wega, beliau kembali berlatih dan akhirnya menjadi juara Sukan SEA sambil memecahkan rekod baru.", why: "Peleraian ini membuktikan bahawa keinsafan yang tulus, jika diikuti dengan tindakan, akan membawa kejayaan yang lebih bermakna dan berkekalan.", effect: "Pembaca menyaksikan perubahan lengkap dalam diri Kamarul — daripada sombong kepada insaf — dan memahami mesej utama novel dengan jelas." },
    ],
    importantEvents: [
      { event: "Kamarul menjadi terkenal", what: "Kamarul memenangi pelbagai pertandingan lari dan mula dikenali ramai.", whyImportant: "Permulaan benih kesombongan — kejayaan yang belum matang boleh mengubah seseorang.", possibleQuestion: "Apakah kesan kejayaan awal kepada peribadi Kamarul?" },
      { event: "Mengabaikan latihan", what: "Kamarul mula tidak serius, terlambat hadir dan tidak mengikut disiplin latihan.", whyImportant: "Menunjukkan betapa berbahayanya sikap tidak bertanggungjawab walaupun bagi seseorang yang berbakat.", possibleQuestion: "Apakah sikap Kamarul terhadap latihan apabila beliau menjadi terkenal?" },
      { event: "Bersikap kasar kepada Saridah", what: "Kamarul mengabaikan dan menyakiti hati Saridah yang cuba membantunya.", whyImportant: "Menggambarkan betapa jauhnya Kamarul telah berubah daripada nilainya yang asal.", possibleQuestion: "Bagaimanakah Kamarul melayan Saridah dalam novel ini?" },
      { event: "Bertengkar dengan Encik Kadir", what: "Kamarul enggan menerima teguran dan bertengkar dengan jurulatihnya.", whyImportant: "Punca langsung kepada kemalangan — menunjukkan akibat buruk apabila seseorang enggan mendengar nasihat.", possibleQuestion: "Apakah yang berlaku antara Kamarul dan Encik Kadir?" },
      { event: "Membuang pingat", what: "Dalam kemarahan, Kamarul membuang pingat kemenangannya.", whyImportant: "Simbol paling jelas betapa Kamarul telah hilang arah tuju dan nilai dalam hidupnya.", possibleQuestion: "Apakah tindakan Kamarul semasa pertengkaran dengan Encik Kadir?" },
      { event: "Kemalangan jalan raya", what: "Kamarul mengalami kemalangan yang serius semasa meninggalkan kawasan latihan.", whyImportant: "Titik balik paling penting dalam novel — mengubah seluruh hidup Kamarul.", possibleQuestion: "Apakah peristiwa yang menjadi titik balik dalam hidup Kamarul?" },
      { event: "Dirawat di hospital", what: "Kamarul terpaksa rehat di hospital dan berpeluang merenung kesilapannya.", whyImportant: "Masa di hospital adalah ruang keinsafan — tanpanya, perubahan Kamarul mungkin tidak akan berlaku.", possibleQuestion: "Apakah yang berlaku kepada Kamarul selepas kemalangan?" },
      { event: "Memohon maaf", what: "Kamarul memohon maaf dengan ikhlas kepada Encik Kadir dan Saridah.", whyImportant: "Membuktikan keberanian sebenar — lebih berani mengakui kesilapan daripada mengakui kejayaan.", possibleQuestion: "Bagaimanakah Kamarul menunjukkan keinsafannya?" },
      { event: "Kembali berlatih", what: "Kamarul kembali berlatih dengan penuh disiplin di bawah bimbingan De Wega dan Encik Kadir.", whyImportant: "Keinsafan dibuktikan melalui tindakan — ini membezakan keinsafan yang tulus daripada yang palsu.", possibleQuestion: "Bagaimanakah Kamarul membuktikan bahawa beliau telah berubah?" },
      { event: "Menang pingat emas dan memecahkan rekod", what: "Kamarul menjadi juara Sukan SEA dan memecahkan rekod baharu.", whyImportant: "Kejayaan ini jauh lebih bermakna kerana ia lahir daripada keinsafan, disiplin dan rendah diri.", possibleQuestion: "Apakah pencapaian Kamarul pada penghujung novel?" },
    ],
    keyCharacterFocus: {
      name: "Kamarul",
      whyMatters: "Kamarul adalah watak paling penting kerana keseluruhan novel berkisarkan perjalanannya daripada seorang yang berbakat tetapi sombong kepada seseorang yang insaf dan berjaya dengan cara yang betul.",
      supportsTheme: "Perubahan Kamarul membuktikan tema utama novel ini — bahawa keinsafan membawa kejayaan yang lebih bermakna.",
      supportsIssues: "Melalui Kamarul, pembaca dapat memahami persoalan kesan kesombongan, kepentingan disiplin dan erti persahabatan sejati.",
      supportsValues: "Kamarul mewakili nilai keinsafan, disiplin dan ketabahan — nilai-nilai yang berkembang dalam dirinya sepanjang cerita.",
      supportsLessons: "Kisah Kamarul mengajar murid bahawa bakat sahaja tidak cukup, dan bahawa keberanian berubah adalah kekuatan yang sebenar.",
    },
    authorPurpose: "Novel Pelari Muda ditulis untuk mengingatkan pembaca bahawa kejayaan tanpa disiplin dan rendah diri tidak akan berkekalan. Pengarang menggunakan dunia sukan sebagai latar untuk menyampaikan mesej tentang peribadi, tanggungjawab dan keinsafan. Novel ini mahu murid berfikir — bukan sekadar menghafal fakta.",
    examCharacterAnalysis: [
      { character: "Kamarul", trait: "Sombong tetapi berani berubah", evidence: "Kamarul yang sombong membuang pingatnya dalam kemarahan, tetapi kemalangan jalan raya memaksanya merenung dan akhirnya memohon maaf kepada Encik Kadir dan Saridah.", modelAnswer: "Kamarul bersifat sombong apabila beliau membuang pingatnya dalam kemarahan dan enggan mendengar arahan Encik Kadir. Namun beliau menunjukkan keberanian berubah apabila memohon maaf kepada Encik Kadir dan Saridah selepas kemalangan." },
      { character: "Encik Kadir", trait: "Penyabar dan berdedikasi", evidence: "Encik Kadir terus sabar membimbing Kamarul walaupun diperlakukan dengan buruk, dan menerima Kamarul kembali selepas insaf.", modelAnswer: "Encik Kadir bersifat penyabar dan berdedikasi kerana beliau tidak berputus asa walaupun Kamarul bertengkar dan meninggalkan padang latihan. Beliau tetap menerima Kamarul kembali apabila anak didiknya insaf." },
      { character: "Saridah", trait: "Prihatin dan pemaaf", evidence: "Saridah terus mengambil berat tentang Kamarul walaupun beliau telah diperlakukan dengan kasar, dan memaafkan Kamarul selepas insaf.", modelAnswer: "Saridah bersifat prihatin dan pemaaf kerana beliau terus menyokong Kamarul walaupun diperlakukan dengan buruk. Kesediaan beliau memaafkan Kamarul menunjukkan betapa tulusnya persahabatan beliau." },
      { character: "De Wega", trait: "Berdisiplin dan merendah diri", evidence: "De Wega yang lebih berpengalaman sanggup turun padang untuk membimbing Kamarul tanpa menunjuk-nunjuk.", modelAnswer: "De Wega bersifat berdisiplin dan merendah diri kerana walaupun beliau lebih berjaya daripada Kamarul, beliau tidak berlagak dan sudi berkongsi ilmu untuk membantu Kamarul bangkit semula." },
      { character: "Kamarul (akhir cerita)", trait: "Gigih dan insaf", evidence: "Selepas kembali berlatih dengan bersungguh-sungguh, Kamarul berjaya memenangi pingat emas Sukan SEA dan memecahkan rekod baru.", modelAnswer: "Kamarul menunjukkan sikap gigih dan insaf apabila beliau kembali berlatih dengan penuh disiplin di bawah bimbingan De Wega dan Encik Kadir, dan akhirnya berjaya menjadi juara Sukan SEA serta memecahkan rekod baru." },
    ],
    memory60: {
      theme: "Keinsafan membawa kejayaan",
      issues: "Disiplin, Kesombongan, Persahabatan, Tanggungjawab jurulatih, Keberanian berubah",
      mainCharacters: "Kamarul, Encik Kadir, Saridah",
      importantEvents: "Kamarul menjadi terkenal dan sombong, Kemalangan jalan raya, Kembali berlatih dan menang Sukan SEA",
      values: "Disiplin, Keinsafan, Bertanggungjawab, Kasih sayang, Ketabahan",
      lessons: "Rendah diri walaupun berjaya, Patuhi arahan guru, Akui kesilapan, Jaga disiplin, Hargai persahabatan",
    },
    issues: [
      { issue: "Kepentingan disiplin", explanation: "Kamarul yang tidak berdisiplin mengalami kemerosotan dalam prestasi dan persahabatan. Disiplin adalah asas kejayaan yang berkekalan." },
      { issue: "Kesan kesombongan", explanation: "Kesombongan merosakkan hubungan Kamarul dengan Encik Kadir dan Saridah, dan hampir menghancurkan kerjayanya sebagai atlet." },
      { issue: "Persahabatan sejati", explanation: "Saridah menunjukkan bahawa persahabatan yang tulus tidak bergantung pada kejayaan — ia tetap setia walaupun pada waktu susah." },
      { issue: "Tanggungjawab jurulatih", explanation: "Encik Kadir membuktikan bahawa tanggungjawab seorang jurulatih bukan sekadar mengajar teknik tetapi juga membentuk peribadi atlet." },
      { issue: "Keberanian berubah", explanation: "Kamarul membuktikan bahawa mengakui kesilapan dan berani berubah memerlukan lebih banyak keberanian daripada memenangi mana-mana pertandingan." },
    ],
    uasaQuestions: [
      { type: "MCQ", question: "Apakah sikap Kamarul selepas beliau menjadi terkenal dalam novel Pelari Muda? A) Semakin bersungguh-sungguh berlatih  B) Menjadi sombong dan mengabaikan latihan  C) Memohon bimbingan De Wega  D) Menghormati Encik Kadir", answer: "B — Menjadi sombong dan mengabaikan latihan.", explanation: "Selepas menjadi terkenal, Kamarul mula sombong dan mengabaikan arahan Encik Kadir serta tidak serius dalam latihan." },
      { type: "MCQ", question: "Apakah peristiwa yang menjadi titik balik dalam novel Pelari Muda? A) Kamarul memenangi kejohanan pertama  B) Pertengkaran antara Kamarul dan Saridah  C) Kemalangan jalan raya yang dialami Kamarul  D) De Wega memberi nasihat kepada Kamarul", answer: "C — Kemalangan jalan raya yang dialami Kamarul.", explanation: "Kemalangan jalan raya memaksa Kamarul berhenti dan merenung segala kesilapannya, menjadikannya titik balik cerita." },
      { type: "MCQ", question: "Apakah nilai yang paling menonjol dalam novel Pelari Muda? A) Keberanian  B) Disiplin dan keinsafan  C) Kecerdasan  D) Kekayaan", answer: "B — Disiplin dan keinsafan.", explanation: "Disiplin dan keinsafan adalah nilai teras novel ini — ditunjukkan melalui perubahan Kamarul daripada sombong kepada insaf dan berjaya." },
      { type: "MCQ", question: "Siapakah yang membimbing Kamarul untuk bangkit semula selepas kemalangan? A) Encik Kadir dan De Wega  B) Saridah dan ibu bapa Kamarul  C) Pihak hospital  D) Rakan-rakan sekelas", answer: "A — Encik Kadir dan De Wega.", explanation: "Encik Kadir dan De Wega bersama-sama membimbing Kamarul untuk kembali berlatih dan mencapai kejayaan." },
      { type: "MCQ", question: "Apakah pengajaran utama novel Pelari Muda? A) Bakat sahaja sudah mencukupi untuk berjaya  B) Sukan lebih penting daripada pelajaran  C) Keinsafan dan disiplin membawa kejayaan yang berkekalan  D) Hanya atlet berbakat yang layak berjaya", answer: "C — Keinsafan dan disiplin membawa kejayaan yang berkekalan.", explanation: "Pengajaran utama adalah bahawa kejayaan tanpa disiplin dan keinsafan tidak akan berkekalan — hanya melalui perubahan sikap, kejayaan sebenar dapat dicapai." },
      { type: "Struktur", question: "Nyatakan dua perwatakan Kamarul pada awal novel Pelari Muda beserta buktinya.", answer: "Pertama, Kamarul bersifat sombong apabila beliau mula mengabaikan latihan dan tidak mahu mendengar arahan Encik Kadir selepas menjadi terkenal. Kedua, Kamarul bersifat angkuh apabila beliau membuang pingatnya dalam kemarahan semasa bertengkar dengan Encik Kadir.", explanation: "Perwatakan perlu disertakan dengan bukti peristiwa yang jelas dari novel." },
      { type: "Struktur", question: "Apakah yang berlaku kepada Kamarul selepas bertengkar dengan Encik Kadir?", answer: "Selepas bertengkar dengan Encik Kadir dan meninggalkan padang latihan dalam kemarahan, Kamarul mengalami kemalangan jalan raya yang serius. Beliau kemudian dirawat di hospital, di mana beliau mula merenung kesilapannya dan akhirnya insaf.", explanation: "Jawapan perlu mengikut urutan peristiwa dengan jelas dan tepat." },
      { type: "Struktur", question: "Nyatakan satu nilai dalam novel Pelari Muda beserta contoh peristiwanya.", answer: "Nilai keinsafan dapat dilihat apabila Kamarul memohon maaf kepada Encik Kadir dan Saridah selepas beliau sedar akan kesilapannya semasa dirawat di hospital. Keinsafan ini mendorong Kamarul untuk kembali berlatih dengan bersungguh-sungguh.", explanation: "Nilai perlu disertai dengan contoh peristiwa yang konkrit daripada novel." },
      { type: "Struktur", question: "Nyatakan dua pengajaran yang terdapat dalam novel Pelari Muda.", answer: "Pertama, kita hendaklah sentiasa bersikap rendah diri walaupun telah berjaya kerana kesombongan hanya akan membawa kegagalan. Kedua, kita hendaklah mematuhi arahan guru atau jurulatih kerana mereka mempunyai pengalaman yang lebih luas dan ingin melihat kita berjaya.", explanation: "Pengajaran perlu bermula dengan 'Kita hendaklah' dan berkaitan dengan peristiwa dalam novel." },
      { type: "Struktur", question: "Apakah peranan Encik Kadir dalam novel Pelari Muda?", answer: "Encik Kadir berperanan sebagai jurulatih yang berdedikasi dan penyabar. Beliau terus membimbing Kamarul walaupun diperlakukan dengan buruk, dan menerima Kamarul kembali selepas insaf. Encik Kadir membuktikan bahawa seorang pendidik yang bertanggungjawab tidak pernah berputus asa terhadap anak didiknya.", explanation: "Peranan watak perlu diterangkan dengan jelas beserta tindakan watak tersebut sebagai bukti." },
      { type: "KBAT", question: "Pada pendapat anda, mengapakah disiplin lebih penting daripada bakat dalam dunia sukan?", answer: "Disiplin lebih penting kerana bakat tanpa disiplin tidak akan berkembang sepenuhnya. Hal ini terbukti dalam novel Pelari Muda apabila Kamarul yang berbakat tetapi tidak berdisiplin hampir memusnah kerjayanya sendiri. Sebaliknya, apabila Kamarul kembali berdisiplin di bawah bimbingan De Wega dan Encik Kadir, beliau bukan sahaja pulih tetapi berjaya menjadi juara Sukan SEA. Ini membuktikan bahawa disiplin adalah kunci untuk mengubah bakat kepada kejayaan yang sebenar.", explanation: "Soalan KBAT ini menilai keupayaan murid mengaitkan pengajaran novel dengan kehidupan dan menggunakan contoh daripada novel sebagai bukti." },
      { type: "KBAT", question: "Sekiranya anda menjadi Kamarul, apakah yang akan anda lakukan secara berbeza untuk mengelakkan konflik dengan Encik Kadir?", answer: "Sekiranya saya menjadi Kamarul, saya akan sentiasa mendengar dan menghormati arahan Encik Kadir walaupun saya sudah berjaya. Kejayaan tidak bermakna kita lebih pandai daripada guru kita. Saya juga akan mengingati bahawa Encik Kadir menegur saya kerana beliau ingin melihat saya berjaya, bukan kerana beliau tidak suka kepada saya. Mendengar nasihat orang berpengalaman adalah tanda kebijaksanaan, bukan kelemahan.", explanation: "Soalan KBAT ini menilai keupayaan murid berfikir secara kritis dan mengaitkan nilai novel dengan tindakan dalam kehidupan nyata." },
      { type: "KBAT", question: "Bagaimanakah pengalaman Kamarul dalam novel Pelari Muda boleh dijadikan teladan kepada remaja hari ini?", answer: "Pengalaman Kamarul mengajar remaja bahawa kejayaan yang cepat boleh membutakan kita daripada melihat kepentingan sikap dan hubungan dengan orang lain. Seperti Kamarul, ramai remaja hari ini yang terlalu yakin dengan kebolehan sendiri hingga mengabaikan nasihat guru dan menghargai persahabatan. Kisah Kamarul mengingatkan kita bahawa keinsafan dan keberanian untuk berubah adalah tanda kematangan, bukan kelemahan.", explanation: "Soalan KBAT ini menilai keupayaan murid mengaitkan tema novel dengan isu kehidupan remaja masa kini." },
    ],
  },
  {
    id: "sejambak-bakti",
    title: "Sejambak Bakti",
    typeLabel: "Novel",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Razali + Amanah + Koperasi + Munir + Keinsafan",
    intro: "Novel tentang seorang murid bernama Razali yang amanah dan gigih memajukan koperasi sekolah, menghadapi fitnah dan gangguan daripada Munir yang iri hati, sehingga akhirnya kebenaran terbukti.",
    movieTrailer: "Razali dilantik sebagai penolong setiausaha koperasi dan bersungguh-sungguh menjalankan tugasnya. Namun Munir yang iri hati mula mengganggu dan memfitnahnya. Razali dipukul, koperasi diceroboh, dan Razali terpaksa menjalani siasatan polis. Apabila Munir akhirnya ditangkap dan insaf, kebenaran terbukti. Koperasi berjaya menjadi johan dan Razali bertemu dengan ayah kandungnya, Pak Ramli.",
    story60: "Razali dipilih sebagai penolong setiausaha koperasi sekolah dan koperasi itu berkembang maju di bawah pengurusannya. Munir yang iri hati lalu menggangu koperasi, memukul Razali dan memfitnahnya. Razali terpaksa menjalani siasatan polis walaupun dia tidak bersalah. Akhirnya Munir ditangkap, insaf dan memohon maaf. Koperasi menjadi johan dan Razali bertemu Pak Ramli yang merupakan ayah kandungnya.",
    story90: "Novel Sejambak Bakti bermula apabila Razali, seorang murid yang rajin dan amanah, dipilih sebagai penolong setiausaha koperasi sekolah. Di bawah bimbingan Cikgu Zulkifli dan sokongan Ramlah, Razali membuktikan dirinya layak memegang tanggungjawab itu dengan koperasi yang semakin berkembang maju. Namun kejayaan Razali menimbulkan perasaan iri hati dalam diri Munir yang tidak dapat menerima bahawa orang lain lebih berjaya daripadanya. Munir bersama rakan-rakannya mula mengganggu koperasi, memukul Razali dan akhirnya mencerobohi koperasi tersebut. Lebih teruk lagi, Munir memfitnah Razali menyebabkan Razali terpaksa disiasat oleh polis dan dihalau oleh Pak Zakaria yang terlalu cepat membuat kesimpulan. Dalam keadaan yang mencabar itu, Razali tetap tabah dan tidak berputus asa. Akhirnya kebenaran terungkap apabila Munir ditangkap oleh pihak berkuasa. Munir insaf dan memohon maaf kepada Razali. Koperasi yang diuruskan oleh Razali berjaya menjadi johan. Sebagai penamat yang indah, Razali bertemu dengan Pak Ramli yang didapatinya adalah ayah kandungnya sendiri, menjadikan kejayaan Razali semakin bermakna.",
    decoder: [
      { rangkap: "Fasa 1", pantunMudah: "Razali dipilih sebagai penolong setiausaha koperasi sekolah kerana rajin dan amanah.", maksud: "Pelantikan Razali adalah pengiktirafan terhadap sikap positifnya yang telah lama ditonjolkan di sekolah.", tema: "Pengiktirafan usaha dan amanah", nilai: "Amanah", pengajaran: "Kita hendaklah sentiasa menjalankan tugas dengan amanah supaya dipercayai oleh orang sekeliling." },
      { rangkap: "Fasa 2", pantunMudah: "Koperasi sekolah semakin maju dan berjaya di bawah pengurusan Razali yang bertanggungjawab.", maksud: "Kejayaan koperasi membuktikan bahawa kerja keras dan kerjasama membawa hasil yang membanggakan.", tema: "Kejayaan melalui kerjasama", nilai: "Kerjasama", pengajaran: "Kita hendaklah bekerjasama dan bersungguh-sungguh dalam setiap kerja yang diamanahkan kepada kita." },
      { rangkap: "Fasa 3", pantunMudah: "Munir berasa iri hati melihat kejayaan Razali dan mula merancang untuk mengganggu.", maksud: "Iri hati adalah benih bahaya yang boleh membawa seseorang melakukan tindakan yang merugikan orang lain.", tema: "Bahaya iri hati", nilai: "Bahaya perasaan dengki", pengajaran: "Kita hendaklah menjauhkan diri daripada perasaan iri hati kerana ia hanya akan mendatangkan keburukan." },
      { rangkap: "Fasa 4", pantunMudah: "Munir dan rakan-rakannya mula mengganggu Razali, memukul dan mencerobohi koperasi.", maksud: "Tindakan Munir menggambarkan betapa bahayanya perasaan iri hati apabila dibiarkan berkembang tanpa kawalan.", tema: "Gangguan dan pencerobohan", nilai: "Akibat perbuatan jahat", pengajaran: "Kita hendaklah berhati-hati supaya perasaan negatif tidak menguasai tindakan kita hingga menyakiti orang lain." },
      { rangkap: "Fasa 5", pantunMudah: "Razali difitnah dan terpaksa menjalani siasatan polis walaupun dia tidak bersalah langsung.", maksud: "Fitnah adalah satu kezaliman yang berat kerana ia memusnahkan nama baik orang yang tidak bersalah.", tema: "Fitnah dan ketidakadilan", nilai: "Bahaya fitnah", pengajaran: "Kita hendaklah mengelak daripada memfitnah orang lain kerana fitnah lebih kejam daripada membunuh." },
      { rangkap: "Fasa 6", pantunMudah: "Razali tetap tabah dan sabar menghadapi fitnah, siasatan dan penolakan Pak Zakaria.", maksud: "Ketabahan Razali membuktikan bahawa orang yang benar tidak perlu takut kerana kebenaran pasti akan terserlah.", tema: "Ketabahan menghadapi dugaan", nilai: "Ketabahan", pengajaran: "Kita hendaklah tabah menghadapi dugaan kerana kebenaran akan terserlah juga pada akhirnya." },
      { rangkap: "Fasa 7", pantunMudah: "Munir ditangkap, insaf dan memohon maaf kepada Razali atas segala perbuatannya.", maksud: "Keinsafan Munir menunjukkan bahawa setiap orang boleh berubah apabila akibat perbuatan buruknya menimpa diri sendiri.", tema: "Keinsafan dan pengampunan", nilai: "Kemaafan", pengajaran: "Kita hendaklah sudi memaafkan orang yang telah menyakiti kita kerana memaafkan adalah tanda kemuliaan hati." },
      { rangkap: "Fasa 8", pantunMudah: "Koperasi menjadi johan dan Razali bertemu Pak Ramli, ayah kandungnya, sebagai penamat yang membahagiakan.", maksud: "Kejayaan koperasi dan pertemuan dengan ayah kandung merupakan ganjaran kepada ketabahan dan keamanahan Razali.", tema: "Ganjaran kepada yang sabar dan amanah", nilai: "Keadilan ilahi", pengajaran: "Kita hendaklah percaya bahawa usaha yang ikhlas dan tabah pasti akan membuahkan hasil yang manis pada akhirnya." },
    ],
    timeline: [
      { stage: "Permulaan", text: "Razali dilantik sebagai penolong setiausaha koperasi sekolah. Koperasi berkembang maju di bawah pengurusannya bersama Cikgu Zulkifli dan Ramlah." },
      { stage: "Perkembangan", text: "Munir berasa iri hati melihat kejayaan Razali dan mula merancang untuk mengganggu koperasi." },
      { stage: "Konflik", text: "Munir dan rakannya memukul Razali, mencerobohi koperasi dan memfitnah Razali. Razali disiasat polis dan dihalau Pak Zakaria." },
      { stage: "Klimaks", text: "Razali berada dalam tekanan besar — difitnah, disiasat dan dihalau. Pak Zakaria terlalu cepat menghukum Razali tanpa mengetahui kebenaran." },
      { stage: "Peleraian", text: "Munir ditangkap, insaf dan memohon maaf. Koperasi menjadi johan. Razali bertemu Pak Ramli yang merupakan ayah kandungnya." },
    ],
    characters: [
      { name: "Razali", personality: "Rajin, amanah, tabah dan bertanggungjawab dalam menjalankan tugasnya, serta pemaaf walaupun telah dizalimi.", evidence: "Razali tetap tabah menguruskan koperasi walaupun difitnah dan disiasat polis, dan memaafkan Munir selepas insaf.", importance: "Razali adalah watak utama yang menjadi teras novel — perjalanannya menggambarkan nilai amanah, ketabahan dan kemaafan." },
      { name: "Munir", personality: "Iri hati, pendendam dan tidak amanah pada awal cerita, tetapi akhirnya insaf dan memohon maaf atas kesilapannya.", evidence: "Munir mengganggu koperasi, memukul Razali dan memfitnahnya, tetapi berubah apabila ditangkap pihak berkuasa.", importance: "Munir mewakili watak antagonis yang mengajar pembaca tentang bahaya iri hati dan kepentingan keinsafan." },
      { name: "Ramlah", personality: "Rajin, setia kawan dan prihatin terhadap rakan-rakannya terutama Razali.", evidence: "Ramlah sentiasa menyokong Razali dalam menguruskan koperasi dan tidak meninggalkan beliau walaupun dalam kesulitan.", importance: "Ramlah mewakili nilai persahabatan sejati dan kerjasama yang menjadi tulang belakang kejayaan koperasi." },
      { name: "Cikgu Zulkifli", personality: "Bijak, bertanggungjawab dan berdedikasi dalam membimbing murid-muridnya untuk berjaya.", evidence: "Cikgu Zulkifli memberi bimbingan dan sokongan yang konsisten kepada Razali dalam menguruskan koperasi.", importance: "Cikgu Zulkifli mewakili peranan guru yang bertanggungjawab dalam membentuk kejayaan murid." },
      { name: "Pak Zakaria", personality: "Tegas tetapi cepat membuat kesimpulan tanpa mengetahui kebenaran terlebih dahulu.", evidence: "Pak Zakaria menghalau Razali tanpa meneliti fakta sebenar, menunjukkan sikap tergesa-gesa dalam membuat keputusan.", importance: "Pak Zakaria mengajar pembaca bahawa kita perlu berhati-hati dan adil sebelum menghukum seseorang." },
      { name: "Pak Ramli", personality: "Penyayang dan sentiasa mengambil berat tentang orang lain, terutama Razali yang ternyata adalah anaknya sendiri.", evidence: "Pak Ramli muncul pada penghujung cerita sebagai ayah kandung Razali, melengkapkan perjalanan hidup Razali.", importance: "Pak Ramli mewakili nilai kasih sayang dan membawa penamat yang membahagiakan kepada cerita Razali." },
    ],
    events: [
      { event: "Razali dilantik ke koperasi", whatHappened: "Razali dipilih sebagai penolong setiausaha koperasi sekolah kerana rajin dan amanah.", whyItMatters: "Pelantikan ini menjadi titik bermulanya keseluruhan cerita dan juga punca iri hati Munir.", examFocus: "Soalan tentang sebab Razali dilantik dan siapa yang melantiknya." },
      { event: "Munir cemburu", whatHappened: "Munir berasa iri hati melihat kejayaan Razali dan koperasi yang semakin maju.", whyItMatters: "Iri hati Munir menjadi punca semua konflik dalam novel ini.", examFocus: "Soalan tentang sikap Munir dan punca konflik." },
      { event: "Razali dipukul", whatHappened: "Munir dan rakan-rakannya memukul Razali sebagai sebahagian daripada rancangan mengganggu koperasi.", whyItMatters: "Menunjukkan betapa jauh Munir sanggup pergi kerana iri hati — termasuk mencederakan orang yang tidak bersalah.", examFocus: "Soalan tentang gangguan Munir terhadap Razali." },
      { event: "Koperasi diceroboh", whatHappened: "Munir dan rakannya mencerobohi koperasi sekolah dengan niat untuk merosakkan usaha Razali.", whyItMatters: "Pencerobohan ini menggambarkan kemuncak tindakan Munir dan menjadi bukti penting semasa siasatan.", examFocus: "Soalan tentang tindakan Munir terhadap koperasi." },
      { event: "Razali difitnah", whatHappened: "Munir memfitnah Razali menyebabkan Razali dicurigai atas sesuatu yang tidak dilakukannya.", whyItMatters: "Fitnah adalah konflik terbesar yang menguji ketabahan dan kejujuran Razali.", examFocus: "Soalan tentang fitnah dan nilainya dalam cerita." },
      { event: "Razali disiasat polis", whatHappened: "Akibat fitnah Munir, Razali terpaksa menjalani siasatan polis walaupun tidak bersalah.", whyItMatters: "Siasatan ini menguji ketabahan Razali dan membawa ketegangan maksimum dalam cerita.", examFocus: "Soalan tentang cabaran yang dihadapi Razali." },
      { event: "Pak Zakaria menghalau Razali", whatHappened: "Pak Zakaria menghalau Razali tanpa meneliti kebenaran fitnah tersebut.", whyItMatters: "Peristiwa ini menunjukkan betapa berbahayanya sikap menghukum tanpa usul periksa.", examFocus: "Soalan tentang sikap Pak Zakaria dan pengajarannya." },
      { event: "Munir ditangkap", whatHappened: "Pihak berkuasa akhirnya menangkap Munir atas perbuatannya terhadap Razali dan koperasi.", whyItMatters: "Tangkapan Munir membuktikan bahawa perbuatan jahat pasti akan mendapat balasannya.", examFocus: "Soalan tentang peleraian konflik dan kebenaran yang terserlah." },
      { event: "Munir memohon maaf", whatHappened: "Selepas ditangkap dan insaf, Munir memohon maaf kepada Razali atas segala perbuatannya.", whyItMatters: "Keinsafan Munir memberi peluang kepada Razali untuk memaafkan — menunjukkan nilai kemaafan yang mulia.", examFocus: "Soalan tentang keinsafan Munir dan nilai kemaafan." },
      { event: "Koperasi menjadi johan", whatHappened: "Koperasi yang diuruskan oleh Razali berjaya meraih kejayaan tertinggi sebagai koperasi terbaik.", whyItMatters: "Kejayaan ini adalah ganjaran kepada kerja keras, amanah dan ketabahan Razali sepanjang cerita.", examFocus: "Soalan tentang pencapaian koperasi dan mesej kejayaan." },
      { event: "Razali bertemu Pak Ramli", whatHappened: "Razali bertemu dengan Pak Ramli dan mendapati bahawa beliau adalah ayah kandungnya sendiri.", whyItMatters: "Pertemuan ini melengkapkan perjalanan Razali — bukan sahaja berjaya dalam tugas, tetapi juga menemui identiti sebenarnya.", examFocus: "Soalan tentang penamat cerita dan kepentingannya." },
    ],
    theme: {
      title: "Kegigihan murid dan guru memajukan koperasi sekolah",
      explanation: "Novel ini menceritakan bagaimana Razali dan Cikgu Zulkifli bekerjasama dengan gigih untuk memajukan koperasi sekolah walaupun menghadapi pelbagai cabaran dan gangguan. Kegigihan, amanah dan kerjasama mereka akhirnya membuahkan kejayaan.",
      whyItMatters: "Tema ini penting kerana ia mengajar murid bahawa kejayaan dalam sebarang bidang memerlukan usaha bersama, amanah dan semangat tidak berputus asa — nilai-nilai yang boleh diamalkan dalam kehidupan seharian.",
    },
    values: [
      { value: "Amanah", explanation: "Menjalankan tugas dengan jujur dan bertanggungjawab tanpa mengkhianati kepercayaan orang lain.", realLife: "Menjaga barang pinjaman orang lain seperti menjaga barang sendiri.", schoolLife: "Razali menguruskan koperasi dengan amanah walaupun tiada orang mengawasinya setiap masa." },
      { value: "Kerajinan", explanation: "Bekerja keras dan bersungguh-sungguh dalam menjalankan setiap tugas yang diberikan.", realLife: "Menyiapkan kerja sekolah sebaik mungkin walaupun tiada ujian yang hampir.", schoolLife: "Razali dan Ramlah rajin datang awal untuk memastikan koperasi beroperasi dengan lancar setiap hari." },
      { value: "Kerjasama", explanation: "Bekerja bersama-sama dengan rakan untuk mencapai matlamat yang ditetapkan secara kolektif.", realLife: "Membantu ahli kumpulan yang menghadapi kesukaran dalam projek bersama.", schoolLife: "Razali, Ramlah dan Cikgu Zulkifli bekerjasama dengan baik hingga koperasi berjaya menjadi johan." },
      { value: "Ketabahan", explanation: "Terus berjuang dan tidak berputus asa walaupun menghadapi cabaran, fitnah dan penolakan.", realLife: "Tidak menyerah apabila gagal dalam ujian tetapi terus belajar dan mencuba lagi.", schoolLife: "Razali tetap tabah menguruskan koperasi walaupun difitnah, dipukul dan disiasat polis." },
      { value: "Kejujuran", explanation: "Bercakap benar dan bertindak dengan ikhlas dalam semua keadaan walaupun berada dalam tekanan.", realLife: "Mengakui kesilapan kepada guru dengan jujur walaupun takut dimarahi.", schoolLife: "Razali tidak pernah berbohong kepada polis semasa siasatan walaupun berada dalam keadaan yang tertekan." },
      { value: "Kemaafan", explanation: "Sanggup memaafkan orang yang telah melakukan kesilapan kepada kita sebagai tanda kemuliaan hati.", realLife: "Memaafkan rakan yang telah menyakiti hati kita dan meneruskan persahabatan.", schoolLife: "Razali memaafkan Munir selepas beliau insaf dan memohon maaf, menunjukkan kemuliaan hati yang sejati." },
    ],
    lessons: [
      { value: "Kita hendaklah sentiasa amanah dalam menjalankan setiap tugas yang dipercayakan", explanation: "Amanah adalah asas kepercayaan — tanpanya, tiada sesiapa yang mahu memberikan tanggungjawab kepada kita.", realLife: "Jaga harta orang lain seperti harta sendiri dan tunaikan janji yang telah dibuat.", schoolLife: "Razali amanah menguruskan koperasi dan ini membuktikan bahawa kepercayaan orang lain kepada kita sangat berharga." },
      { value: "Kita hendaklah menjauhkan diri daripada perasaan iri hati", explanation: "Iri hati hanya akan mendorong kita melakukan perbuatan yang merugikan diri sendiri dan orang lain.", realLife: "Bersyukur dengan apa yang kita miliki dan berasa gembira dengan kejayaan orang lain.", schoolLife: "Iri hati Munir terhadap Razali menyebabkan beliau melakukan pelbagai kejahatan yang akhirnya memudaratkan dirinya sendiri." },
      { value: "Kita hendaklah tabah menghadapi fitnah dan dugaan", explanation: "Ketabahan adalah senjata terbaik apabila menghadapi kezaliman — kebenaran pasti akan terserlah juga.", realLife: "Jangan berputus asa apabila dituduh secara tidak adil — buktikan kebenaran melalui tindakan.", schoolLife: "Razali tabah menghadapi fitnah Munir dan akhirnya kebenaran terbukti sehingga koperasi menjadi johan." },
      { value: "Kita hendaklah bekerjasama dalam mencapai matlamat bersama", explanation: "Tiada kejayaan yang besar dapat dicapai berseorangan — kerjasama menjadikan tugas yang berat menjadi ringan.", realLife: "Bantu ahli pasukan dalam projek dan berkongsi tanggungjawab secara adil.", schoolLife: "Kerjasama antara Razali, Ramlah dan Cikgu Zulkifli adalah kunci kejayaan koperasi menjadi johan." },
      { value: "Kita hendaklah bersikap adil sebelum membuat sebarang pertuduhan", explanation: "Menghukum tanpa usul periksa boleh menzalimi orang yang tidak bersalah.", realLife: "Dengar semua pihak dan kumpul maklumat sebelum membuat keputusan tentang sesuatu perkara.", schoolLife: "Pak Zakaria mengajar kita bahawa kita tidak boleh cepat menghukum seseorang tanpa mengetahui kebenaran terlebih dahulu." },
      { value: "Kita hendaklah sudi memaafkan orang yang telah menyakiti kita", explanation: "Memaafkan bukan tanda kelemahan — ia adalah tanda kemuliaan hati dan kekuatan jiwa yang sebenar.", realLife: "Lepaskan perasaan dendam kerana ia hanya akan membebankan diri kita sendiri.", schoolLife: "Razali memaafkan Munir selepas insaf, membuktikan bahawa jiwa yang mulia lebih tinggi daripada sebarang kejayaan duniawi." },
    ],
    teacherExplains: [
      "Ramai murid berfikir bahawa novel ini hanya mengenai koperasi sekolah. Sebenarnya novel ini mengajar bahawa sifat amanah, kerjasama dan kesanggupan memaafkan mampu membawa kejayaan. Koperasi hanyalah latar — mesej sebenarnya tentang peribadi dan nilai hidup.",
      "Munir bukan watak yang jahat sepenuhnya — beliau hanya dikuasai oleh perasaan iri hati yang dibiarkan berkembang tanpa kawalan. Keinsafan Munir pada akhir cerita mengajar kita bahawa setiap orang boleh berubah menjadi lebih baik.",
      "Pak Zakaria mengajar kita pelajaran yang sangat penting — jangan tergesa-gesa menghukum seseorang tanpa mengetahui kebenaran. Sikap cepat membuat kesimpulan boleh menzalimi orang yang tidak bersalah seperti yang dialami oleh Razali.",
      "Pertemuan Razali dengan Pak Ramli pada penghujung cerita bukan sekadar penamat yang manis. Ia mengajar kita bahawa orang yang tabah dan amanah akan sentiasa dilindungi dan diberi ganjaran yang tidak disangka-sangka.",
    ],
    examBooster: {
      frequentPoints: [
        "Tema kegigihan dan kerjasama memajukan koperasi — paling kerap ditanya",
        "Perwatakan Razali — rajin, amanah, tabah, bertanggungjawab dan pemaaf",
        "Perwatakan Munir — iri hati, pendendam, tetapi akhirnya insaf",
        "Peristiwa Razali difitnah dan disiasat polis sebagai klimaks utama",
        "Nilai amanah dan kemaafan — wajib disertakan contoh peristiwa dari novel",
        "Pengajaran 'Kita hendaklah amanah' dan 'Kita hendaklah sudi memaafkan'",
      ],
      commonQuestions: [
        { question: "Apakah tema novel Sejambak Bakti?", answerHint: "Tema: kegigihan murid dan guru memajukan koperasi sekolah. Disokong dengan contoh kejayaan koperasi menjadi johan.", modelAnswer: "Tema novel Sejambak Bakti ialah kegigihan murid dan guru memajukan koperasi sekolah. Hal ini terbukti apabila Razali dan Cikgu Zulkifli bekerjasama dengan gigih dan penuh amanah sehingga koperasi sekolah berjaya menjadi johan.", explanation: "Tema perlu ditulis lengkap dan disokong dengan bukti daripada cerita.", examTip: "Jangan tulis hanya 'koperasi' — tema sebenar adalah tentang kegigihan dan kerjasama memajukan koperasi." },
        { question: "Huraikan perwatakan Razali dalam novel Sejambak Bakti.", answerHint: "Sebut sekurang-kurangnya dua perwatakan — amanah dan tabah — dengan bukti peristiwa.", modelAnswer: "Razali bersifat amanah apabila beliau menguruskan koperasi dengan jujur dan bertanggungjawab walaupun menghadapi gangguan daripada Munir. Selain itu, Razali juga bersifat tabah apabila beliau terus berjuang walaupun difitnah dan terpaksa menjalani siasatan polis.", explanation: "Perwatakan perlu disokong dengan peristiwa sebagai bukti.", examTip: "Format jawapan: Nama + sifat + bukti peristiwa = jawapan lengkap." },
      ],
    },
    revision: {
      theme: "Kegigihan murid dan guru memajukan koperasi sekolah",
      values: "Amanah, Kerajinan, Kerjasama, Ketabahan, Kejujuran, Kemaafan",
      lessons: "Amanah dalam tugas, Elak iri hati, Tabah hadapi fitnah, Bekerjasama, Adil sebelum menghukum, Sudi memaafkan",
      examTips: "Fokus pada perjalanan Razali — daripada dilantik, difitnah, disiasat hingga berjaya. Ingat: Munir iri hati → gangguan → ditangkap → insaf → Razali memaafkan.",
    },
    miniQuiz: [
      { question: "Aneka Pilihan: Mengapa Munir mengganggu koperasi sekolah?", answerHint: "Ruang jawapan: A) Dia ingin menjadi ketua B) Dia berasa iri hati terhadap Razali C) Dia dibayar oleh musuh D) Dia tidak suka koperasi — Jawapan: B" },
      { question: "Padanan: Padankan watak dengan perwatakannya — Razali / Munir / Cikgu Zulkifli", answerHint: "Razali = Amanah dan tabah; Munir = Iri hati tetapi akhirnya insaf; Cikgu Zulkifli = Berdedikasi dan bertanggungjawab" },
      { question: "Benar atau Salah: Razali bersalah atas pencerobohan koperasi.", answerHint: "Salah — Razali difitnah oleh Munir. Razali tidak bersalah dan kebenaran terbukti apabila Munir ditangkap." },
    ],
    masterCharacters: [
      { name: "Razali", role: "Watak Utama / Protagonis", traits: ["Rajin", "Amanah", "Tabah", "Bertanggungjawab", "Pemaaf"], evidence: "Razali menguruskan koperasi dengan penuh amanah walaupun difitnah, dipukul dan disiasat polis. Beliau memaafkan Munir selepas insaf.", relationships: "Dizalimi oleh Munir, disokong oleh Ramlah dan Cikgu Zulkifli, dihukum secara salah oleh Pak Zakaria, dan bertemu Pak Ramli ayah kandungnya.", importance: "Razali adalah teras novel — perjalanannya daripada dilantik ke koperasi hingga bertemu ayah kandung menggambarkan semua nilai utama novel." },
      { name: "Munir", role: "Watak Antagonis", traits: ["Iri hati", "Pendendam", "Tidak amanah", "Insaf"], evidence: "Munir memukul Razali, mencerobohi koperasi dan memfitnah Razali, tetapi insaf dan memohon maaf selepas ditangkap.", relationships: "Munir adalah musuh utama Razali, tetapi keinsafannya memberi peluang kepada Razali untuk memaafkan.", importance: "Munir mewakili bahaya iri hati dan pengajaran bahawa setiap perbuatan jahat akan mendapat balasannya." },
      { name: "Ramlah", role: "Sahabat Razali", traits: ["Rajin", "Setia kawan", "Prihatin"], evidence: "Ramlah sentiasa hadir membantu Razali menguruskan koperasi dan tidak meninggalkan beliau dalam kesusahan.", relationships: "Ramlah adalah tiang sokongan Razali — persahabatan mereka menggambarkan nilai kerjasama yang tulen.", importance: "Ramlah membuktikan bahawa persahabatan yang setia adalah kekuatan yang paling penting dalam menghadapi cabaran." },
      { name: "Cikgu Zulkifli", role: "Guru Pembimbing", traits: ["Bijak", "Bertanggungjawab", "Berdedikasi"], evidence: "Cikgu Zulkifli membimbing Razali dengan sabar dan memberi sokongan yang konsisten sepanjang perjalanan koperasi.", relationships: "Cikgu Zulkifli adalah mentor Razali — bimbingannya menjadi faktor utama kejayaan koperasi menjadi johan.", importance: "Cikgu Zulkifli mewakili peranan guru yang bertanggungjawab dalam memastikan murid-muridnya berjaya." },
      { name: "Pak Zakaria", role: "Watak Pengajaran", traits: ["Tegas", "Cepat membuat kesimpulan"], evidence: "Pak Zakaria menghalau Razali tanpa mengetahui kebenaran, menunjukkan sikap tergesa-gesa dalam membuat keputusan.", relationships: "Tindakan Pak Zakaria menambahkan tekanan kepada Razali dan mengajar pembaca tentang pentingnya berlaku adil.", importance: "Pak Zakaria mengajar murid bahawa kita tidak boleh menghukum seseorang tanpa meneliti fakta sebenar." },
      { name: "Pak Ramli", role: "Ayah Kandung Razali", traits: ["Penyayang", "Mengambil berat"], evidence: "Pak Ramli hadir pada penghujung cerita sebagai ayah kandung Razali, melengkapkan perjalanan hidup watak utama.", relationships: "Hubungan Pak Ramli dengan Razali memberikan penamat yang indah dan bermakna kepada keseluruhan cerita.", importance: "Pak Ramli melambangkan ganjaran kepada orang yang tabah dan amanah — kejayaan datang dalam pelbagai bentuk." },
    ],
    relationshipMap: [
      { from: "Munir", relation: "berasa iri hati dan mengganggu", to: "Razali", explanation: "Perasaan iri hati Munir terhadap kejayaan Razali menjadi punca semua konflik dalam novel — ia mengajar bahawa iri hati adalah benih bahaya." },
      { from: "Ramlah", relation: "menyokong dengan setia", to: "Razali", explanation: "Sokongan Ramlah kepada Razali menggambarkan nilai persahabatan sejati yang tidak bergantung pada keadaan." },
      { from: "Cikgu Zulkifli", relation: "membimbing dengan dedikasi", to: "Razali", explanation: "Bimbingan Cikgu Zulkifli menjadi tulang belakang kejayaan koperasi — membuktikan peranan guru dalam membentuk masa depan murid." },
      { from: "Pak Zakaria", relation: "menghukum tanpa usul periksa", to: "Razali", explanation: "Tindakan Pak Zakaria menghalau Razali mengajar pembaca tentang bahaya menghukum seseorang tanpa mengetahui kebenaran terlebih dahulu." },
      { from: "Pak Ramli", relation: "bertemu sebagai ayah kandung", to: "Razali", explanation: "Pertemuan Razali dengan Pak Ramli memberikan makna yang lebih dalam kepada kejayaan Razali — bukan sekadar koperasi, tetapi juga keluarga." },
    ],
    detailedPlot: [
      { stage: "Permulaan", what: "Razali dilantik sebagai penolong setiausaha koperasi sekolah. Bersama Cikgu Zulkifli dan Ramlah, koperasi mula berkembang maju.", why: "Bahagian ini memperkenalkan watak utama dan latar cerita, membolehkan pembaca memahami konteks sebelum konflik bermula.", effect: "Pembaca dapat melihat betapa berdedikasinya Razali dalam tugasnya, menjadikan nasib buruk yang menimpanya kemudian terasa lebih tidak adil." },
      { stage: "Perkembangan", what: "Munir mula berasa iri hati apabila melihat koperasi semakin maju di bawah pengurusan Razali. Beliau mula merancang untuk mengganggu.", why: "Iri hati Munir berkembang perlahan-lahan, menunjukkan betapa halusnya proses seseorang jatuh ke dalam perangkap perasaan negatif.", effect: "Ketegangan mula terbina apabila pembaca menyedari bahawa Razali yang tidak bersalah akan menjadi mangsa rancangan jahat Munir." },
      { stage: "Konflik", what: "Munir dan rakannya memukul Razali, mencerobohi koperasi dan memfitnah Razali. Razali terpaksa disiasat polis dan dihalau oleh Pak Zakaria.", why: "Konflik berlapis-lapis ini menguji ketabahan, kejujuran dan kekuatan jiwa Razali yang berada dalam tekanan yang amat besar.", effect: "Pembaca merasai ketidakadilan yang dialami oleh Razali dan bersimpati dengannya, menjadikan mereka ingin tahu bagaimana kebenaran akan terserlah." },
      { stage: "Klimaks", what: "Razali berada dalam situasi paling sukar — difitnah, disiasat polis, dipukul dan dihalau oleh Pak Zakaria yang tidak mengetahui kebenaran.", why: "Kemuncak tekanan kepada Razali mencapai titik tertinggi, dan inilah saat yang paling menguji nilai dan ketabahan watak utama.", effect: "Pembaca benar-benar merasai penderitaan Razali dan memahami betapa pentingnya nilai amanah, ketabahan dan kejujuran dalam menghadapi kezaliman." },
      { stage: "Peleraian", what: "Munir ditangkap, insaf dan memohon maaf. Koperasi menjadi johan. Razali bertemu Pak Ramli yang merupakan ayah kandungnya.", why: "Peleraian yang lengkap ini membuktikan bahawa kebenaran pasti akan terserlah dan orang yang amanah serta tabah akan mendapat ganjaran yang setimpal.", effect: "Pembaca merasa puas kerana keadilan tercapai, Razali mendapat pengiktirafan yang layak dan mendapat balik apa yang pernah dirampas daripadanya." },
    ],
    importantEvents: [
      { event: "Razali dilantik ke koperasi", what: "Razali dipilih sebagai penolong setiausaha koperasi sekolah.", whyImportant: "Pelantikan ini menjadi titik bermula cerita dan juga punca iri hati Munir yang mencetuskan semua konflik.", possibleQuestion: "Apakah yang menyebabkan Razali dilantik sebagai penolong setiausaha koperasi?" },
      { event: "Munir berasa cemburu", what: "Munir berasa iri hati melihat kejayaan Razali dan koperasi yang semakin maju.", whyImportant: "Iri hati Munir adalah punca semua masalah — ia mengajar bahawa perasaan negatif yang tidak dikawal boleh membawa kemusnahan.", possibleQuestion: "Apakah sikap Munir terhadap kejayaan Razali dan koperasi?" },
      { event: "Razali dipukul", what: "Munir dan rakan-rakannya memukul Razali sebagai bahagian daripada rancangan mengganggu koperasi.", whyImportant: "Menunjukkan betapa ekstremnya tindakan Munir akibat iri hati — termasuk sanggup mencedera orang yang tidak bersalah.", possibleQuestion: "Apakah tindakan Munir terhadap Razali?" },
      { event: "Koperasi diceroboh", what: "Munir dan rakannya mencerobohi koperasi sekolah.", whyImportant: "Pencerobohan ini adalah tindakan paling jahat Munir dan menjadi bukti utama yang kemudiannya digunakan dalam siasatan.", possibleQuestion: "Apakah tindakan Munir terhadap koperasi sekolah?" },
      { event: "Razali difitnah", what: "Munir memfitnah Razali menyebabkan Razali dicurigai atas sesuatu yang tidak dilakukannya.", whyImportant: "Fitnah adalah konflik terbesar — ia menguji ketabahan Razali dan mengajar tentang bahaya memfitnah orang yang tidak bersalah.", possibleQuestion: "Apakah yang dilakukan Munir untuk menyusahkan Razali?" },
      { event: "Razali disiasat polis", what: "Akibat fitnah Munir, Razali terpaksa menjalani siasatan polis.", whyImportant: "Siasatan ini adalah ujian tertinggi ketabahan dan kejujuran Razali — beliau kekal jujur walaupun dalam tekanan.", possibleQuestion: "Apakah cabaran terbesar yang dihadapi Razali?" },
      { event: "Pak Zakaria menghalau Razali", what: "Pak Zakaria menghalau Razali tanpa meneliti kebenaran dahulu.", whyImportant: "Peristiwa ini mengajar tentang bahaya menghukum seseorang tanpa usul periksa — Pak Zakaria mewakili pengajaran penting ini.", possibleQuestion: "Apakah tindakan Pak Zakaria terhadap Razali dan apakah pengajarannya?" },
      { event: "Munir ditangkap", what: "Pihak berkuasa menangkap Munir atas perbuatannya.", whyImportant: "Tangkapan Munir membuktikan bahawa kebenaran pasti terserlah dan perbuatan jahat pasti mendapat balasannya.", possibleQuestion: "Bagaimanakah konflik dalam novel Sejambak Bakti diselesaikan?" },
      { event: "Munir memohon maaf", what: "Munir insaf dan memohon maaf kepada Razali.", whyImportant: "Keinsafan Munir memberi peluang kepada Razali memaafkan, menggambarkan nilai kemaafan yang paling mulia.", possibleQuestion: "Apakah yang berlaku kepada Munir selepas ditangkap?" },
      { event: "Koperasi menjadi johan", what: "Koperasi yang diuruskan Razali meraih kejayaan tertinggi.", whyImportant: "Kejayaan ini adalah ganjaran kepada kerja keras, amanah dan ketabahan Razali sepanjang menghadapi pelbagai rintangan.", possibleQuestion: "Apakah pencapaian koperasi sekolah pada penghujung novel?" },
      { event: "Razali bertemu Pak Ramli", what: "Razali bertemu Pak Ramli yang ternyata adalah ayah kandungnya.", whyImportant: "Pertemuan ini melengkapkan perjalanan Razali dan memberi makna yang lebih dalam kepada keseluruhan perjuangannya.", possibleQuestion: "Apakah penamat novel Sejambak Bakti?" },
    ],
    keyCharacterFocus: {
      name: "Razali",
      whyMatters: "Razali adalah watak paling penting kerana keseluruhan novel berkisarkan perjalanannya — daripada dilantik dengan penuh amanah, difitnah dan dizalimi, hingga akhirnya berjaya dan bertemu ayah kandungnya.",
      supportsTheme: "Razali membuktikan tema kegigihan melalui tindakannya yang tidak pernah berputus asa walaupun menghadapi fitnah, siasatan polis dan pengusiran oleh Pak Zakaria.",
      supportsIssues: "Melalui Razali, pembaca memahami persoalan kepentingan amanah, ketabahan menghadapi dugaan, dan kepentingan memaafkan.",
      supportsValues: "Razali mewakili nilai amanah, kerajinan, ketabahan, kejujuran dan kemaafan — semua nilai ini terserlah dalam tindakannya sepanjang cerita.",
      supportsLessons: "Kisah Razali mengajar murid bahawa orang yang amanah dan tabah pasti akan mendapat keadilan dan ganjaran pada akhirnya.",
    },
    authorPurpose: "Novel Sejambak Bakti ditulis untuk mengingatkan pembaca bahawa sifat amanah, kerjasama dan kesanggupan memaafkan adalah nilai-nilai yang membawa kejayaan. Pengarang menggunakan koperasi sekolah sebagai latar untuk menunjukkan bahawa nilai-nilai murni ini relevan dalam semua aspek kehidupan, bukan sekadar di dalam bilik darjah.",
    examCharacterAnalysis: [
      { character: "Razali", trait: "Amanah", evidence: "Razali menguruskan koperasi dengan jujur dan bertanggungjawab walaupun menghadapi tekanan dan gangguan daripada Munir.", modelAnswer: "Razali bersifat amanah kerana beliau menguruskan koperasi dengan jujur dan tidak mengkhianati kepercayaan yang diberikan kepadanya walaupun menghadapi pelbagai gangguan dan fitnah daripada Munir." },
      { character: "Razali", trait: "Tabah", evidence: "Razali tidak berputus asa walaupun difitnah, dipukul, disiasat polis dan dihalau oleh Pak Zakaria.", modelAnswer: "Razali bersifat tabah kerana beliau terus berjuang menguruskan koperasi dan tidak menyerah kalah walaupun difitnah oleh Munir dan terpaksa menjalani siasatan polis." },
      { character: "Munir", trait: "Iri hati", evidence: "Munir mengganggu koperasi, memukul Razali dan memfitnahnya kerana tidak dapat menerima kejayaan Razali.", modelAnswer: "Munir bersifat iri hati kerana beliau tidak dapat menerima kejayaan Razali dan mengambil pelbagai tindakan jahat termasuk memukul Razali dan mencerobohi koperasi akibat perasaan tersebut." },
      { character: "Ramlah", trait: "Setia kawan", evidence: "Ramlah sentiasa menyokong Razali dalam menguruskan koperasi dan tidak meninggalkan beliau walaupun dalam kesulitan.", modelAnswer: "Ramlah bersifat setia kawan kerana beliau sentiasa hadir membantu Razali menguruskan koperasi dan tidak pernah meninggalkan beliau walaupun Razali menghadapi pelbagai cabaran dan dugaan." },
      { character: "Cikgu Zulkifli", trait: "Berdedikasi", evidence: "Cikgu Zulkifli membimbing Razali dengan sabar dan memberi sokongan yang konsisten sepanjang pengurusan koperasi.", modelAnswer: "Cikgu Zulkifli bersifat berdedikasi kerana beliau memberi bimbingan dan sokongan yang berterusan kepada Razali dalam menguruskan koperasi sehingga berjaya menjadi johan." },
    ],
    memory60: {
      theme: "Kegigihan murid dan guru memajukan koperasi sekolah",
      issues: "Iri hati Munir, amanah Razali, kerjasama, kemaafan, ketabahan menghadapi fitnah, peranan guru",
      mainCharacters: "Razali, Munir, Ramlah, Cikgu Zulkifli, Pak Zakaria, Pak Ramli",
      importantEvents: "Razali dilantik, Munir iri hati, Razali dipukul, koperasi diceroboh, Razali difitnah, Munir ditangkap dan insaf, koperasi johan, Razali bertemu Pak Ramli",
      values: "Amanah, Kerajinan, Kerjasama, Ketabahan, Kejujuran, Kemaafan",
      lessons: "Amanah dalam tugas, elak iri hati, tabah hadapi fitnah, bekerjasama, adil sebelum menghukum, sudi memaafkan",
    },
    issues: [
      { issue: "Kesan iri hati", explanation: "Iri hati Munir terhadap Razali menyebabkan beliau melakukan pelbagai perbuatan jahat yang akhirnya memudaratkan dirinya sendiri." },
      { issue: "Kepentingan amanah", explanation: "Amanah Razali dalam menguruskan koperasi membuktikan bahawa kepercayaan yang diberikan perlu dijaga dengan sepenuh hati." },
      { issue: "Semangat kerjasama", explanation: "Kerjasama antara Razali, Ramlah dan Cikgu Zulkifli menjadi kunci kejayaan koperasi mencapai kejayaan tertinggi." },
      { issue: "Kepentingan memaafkan", explanation: "Kesanggupan Razali memaafkan Munir selepas insaf menunjukkan kemuliaan hati yang menjadi tanda jiwa yang kuat." },
      { issue: "Ketabahan menghadapi dugaan", explanation: "Ketabahan Razali dalam menghadapi fitnah, siasatan dan pengusiran membuktikan bahawa orang yang benar tidak perlu takut." },
      { issue: "Peranan guru membimbing murid", explanation: "Cikgu Zulkifli membuktikan bahawa bimbingan seorang guru yang berdedikasi adalah faktor utama yang menentukan kejayaan muridnya." },
    ],
    uasaQuestions: [
      { type: "MCQ", question: "Mengapakah Razali dilantik sebagai penolong setiausaha koperasi sekolah? A) Dia adalah murid paling popular  B) Dia adalah murid yang rajin dan amanah  C) Dia memohon jawatan tersebut  D) Cikgu Zulkifli adalah bapa saudaranya", answer: "B — Dia adalah murid yang rajin dan amanah.", explanation: "Razali dipilih kerana sikap rajin dan amanah yang telah lama ditonjolkan, bukan kerana sebab peribadi atau permintaan sendiri." },
      { type: "MCQ", question: "Apakah yang menyebabkan Munir mengganggu koperasi sekolah? A) Dia tidak suka Cikgu Zulkifli  B) Dia kekurangan wang  C) Dia berasa iri hati terhadap kejayaan Razali  D) Dia disuruh oleh rakan-rakannya", answer: "C — Dia berasa iri hati terhadap kejayaan Razali.", explanation: "Iri hati Munir terhadap kejayaan Razali dan kemajuan koperasi adalah punca utama semua gangguan dan perbuatan jahat yang dilakukannya." },
      { type: "MCQ", question: "Apakah sikap Pak Zakaria terhadap Razali dalam novel Sejambak Bakti? A) Dia membela Razali di hadapan polis  B) Dia menghalau Razali tanpa mengetahui kebenaran  C) Dia menyiasat Munir atas arahan Razali  D) Dia membantu Razali menguruskan koperasi", answer: "B — Dia menghalau Razali tanpa mengetahui kebenaran.", explanation: "Pak Zakaria bertindak terlalu cepat dengan menghalau Razali tanpa meneliti fakta dan kebenaran terlebih dahulu." },
      { type: "MCQ", question: "Apakah nilai yang paling menonjol dalam perwatakan Razali? A) Keberanian  B) Amanah dan ketabahan  C) Kecerdasan  D) Kekayaan", answer: "B — Amanah dan ketabahan.", explanation: "Amanah dan ketabahan adalah nilai teras Razali — ditunjukkan melalui kesetiaannya menguruskan koperasi walaupun menghadapi fitnah dan siasatan polis." },
      { type: "MCQ", question: "Apakah penamat novel Sejambak Bakti? A) Razali meninggalkan sekolah  B) Munir mengambil alih koperasi  C) Koperasi menjadi johan dan Razali bertemu ayah kandungnya  D) Cikgu Zulkifli berpindah sekolah", answer: "C — Koperasi menjadi johan dan Razali bertemu ayah kandungnya.", explanation: "Penamat novel Sejambak Bakti mengandungi dua kejayaan besar — koperasi menjadi johan dan Razali menemui identiti sebenarnya melalui Pak Ramli." },
      { type: "Struktur", question: "Nyatakan dua perwatakan Razali dalam novel Sejambak Bakti beserta buktinya.", answer: "Pertama, Razali bersifat amanah kerana beliau menguruskan koperasi dengan jujur dan bertanggungjawab walaupun digangu dan difitnah oleh Munir. Kedua, Razali bersifat tabah kerana beliau tidak berputus asa menguruskan koperasi walaupun terpaksa menjalani siasatan polis dan dihalau oleh Pak Zakaria.", explanation: "Perwatakan perlu disertakan dengan bukti peristiwa yang jelas daripada novel untuk mendapat markah penuh." },
      { type: "Struktur", question: "Apakah yang berlaku kepada Munir selepas mengganggu koperasi dan memfitnah Razali?", answer: "Munir akhirnya ditangkap oleh pihak berkuasa atas segala perbuatannya. Selepas ditangkap, Munir insaf dan memohon maaf kepada Razali atas segala kezaliman yang telah dilakukannya.", explanation: "Jawapan perlu mengikut urutan peristiwa dengan jelas — tangkapan, keinsafan dan permohonan maaf." },
      { type: "Struktur", question: "Nyatakan satu nilai dalam novel Sejambak Bakti beserta contoh peristiwanya.", answer: "Nilai amanah dapat dilihat apabila Razali menguruskan koperasi dengan jujur dan bertanggungjawab walaupun menghadapi gangguan dan fitnah daripada Munir. Keamanahan Razali terbukti apabila koperasi berjaya menjadi johan.", explanation: "Nilai perlu disertai dengan bukti atau contoh peristiwa yang konkrit daripada novel." },
      { type: "Struktur", question: "Nyatakan dua pengajaran yang terdapat dalam novel Sejambak Bakti.", answer: "Pertama, kita hendaklah sentiasa amanah dalam menjalankan tugas yang dipercayakan kerana amanah adalah asas kepercayaan orang lain terhadap kita. Kedua, kita hendaklah menjauhkan diri daripada perasaan iri hati kerana iri hati hanya akan mendorong kita melakukan perbuatan yang merugikan diri sendiri dan orang lain.", explanation: "Pengajaran perlu bermula dengan 'Kita hendaklah' dan berkaitan dengan peristiwa dalam novel." },
      { type: "Struktur", question: "Apakah peranan Cikgu Zulkifli dalam novel Sejambak Bakti?", answer: "Cikgu Zulkifli berperanan sebagai guru pembimbing yang berdedikasi kepada Razali dan koperasi sekolah. Beliau membimbing Razali dengan sabar dan memberikan sokongan yang berterusan sehingga koperasi berjaya menjadi johan.", explanation: "Peranan watak perlu diterangkan dengan jelas beserta tindakan watak tersebut sebagai bukti." },
      { type: "KBAT", question: "Pada pendapat anda, mengapakah sifat amanah sangat penting dalam kehidupan seorang pelajar?", answer: "Sifat amanah sangat penting kerana ia adalah asas kepada kepercayaan orang lain terhadap kita. Seperti Razali dalam novel Sejambak Bakti, murid yang amanah akan dipercayai dengan tanggungjawab yang lebih besar dan akhirnya berjaya mencapai kejayaan yang bermakna. Tanpa amanah, tiada sesiapa yang mahu memberikan kepercayaan kepada kita walaupun kita mempunyai kebolehan yang tinggi.", explanation: "Soalan KBAT ini menilai keupayaan murid mengaitkan nilai novel dengan kehidupan dan memberikan hujah yang logik berdasarkan pengalaman Razali." },
      { type: "KBAT", question: "Sekiranya anda menjadi Razali, apakah tindakan yang anda akan ambil apabila difitnah dan disiasat polis?", answer: "Sekiranya saya menjadi Razali, saya akan kekal jujur dan bercakap benar kepada polis semasa siasatan. Saya tidak akan berbohong atau melarikan diri kerana kejujuran adalah senjata terbaik apabila dituduh secara tidak adil. Saya juga akan bersabar kerana kebenaran pasti akan terserlah juga pada akhirnya, seperti yang dialami oleh Razali apabila Munir akhirnya ditangkap.", explanation: "Soalan KBAT ini menilai keupayaan murid berfikir secara kritis dan mengaitkan nilai novel dengan tindakan dalam situasi kehidupan nyata." },
      { type: "KBAT", question: "Bagaimanakah pengalaman Razali dalam novel Sejambak Bakti boleh dijadikan teladan kepada murid-murid di sekolah hari ini?", answer: "Pengalaman Razali mengajar murid bahawa amanah, ketabahan dan kemaafan adalah nilai-nilai yang akan membawa kejayaan walaupun menghadapi pelbagai cabaran. Seperti Razali, murid-murid hari ini mungkin akan menghadapi ketidakadilan, fitnah atau gangguan daripada rakan sebaya. Kisah Razali mengingatkan kita bahawa orang yang jujur dan tabah tidak perlu takut — kebenaran pasti akan terserlah dan ganjaran pasti akan tiba pada masanya.", explanation: "Soalan KBAT ini menilai keupayaan murid mengaitkan tema dan nilai novel dengan isu kehidupan remaja masa kini secara kritis dan mendalam." },
    ],
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
