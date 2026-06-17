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

  // ─── Novel: Formula Termodinamik (Zon Sabah & Sarawak) ──────────────────────
  {
    id: "formula-termodinamik",
    title: "Formula Termodinamik",
    typeLabel: "Novel (Zon Sabah & Sarawak)",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Watak + Tema + Peristiwa + Nilai",
    intro:
      "Jangan risau jika cerita ini kedengaran rumit. Selepas belajar di sini, kamu akan faham keseluruhan novel Formula Termodinamik dan bersedia sepenuhnya untuk peperiksaan — tanpa perlu menghafal teks asal.",

    story60:
      "Amir & Usamah pulang ke kampung → bina mesin 2 dalam 1 dengan Formula Termodinamik → Aswan iri hati → curi pen drive + jenayah siber → banjir besar → Aswan hampir lemas → Amir selamatkan Aswan → Aswan insaf & mohon maaf → Anugerah Saintis Muda + biasiswa → Asma sudah bertunang.",

    story90:
      "Amir dan Usamah kembali ke kampung selepas menimba ilmu. Mereka mencipta mesin 2 dalam 1 dengan Formula Termodinamik untuk membantu masyarakat. Aswan berasa cemburu lalu mencuri pen drive data mesin itu dan melancarkan serangan siber. Banjir besar menimpa kampung. Aswan hampir lemas — Amir menyelamatkannya walaupun Aswan pernah menyakitinya. Aswan insaf dan memohon maaf. Amir menang Anugerah Saintis Muda, mendapat biasiswa, tetapi mengetahui Asma sudah bertunang.",

    retelling3Min:
      "Dua orang remaja berbakat bernama Amir dan Usamah pulang ke kampung selepas berjaya dalam pengajian mereka. Dengan penuh semangat, mereka mula membina sebuah mesin 2 dalam 1 menggunakan prinsip Formula Termodinamik. Mesin ini direka khas untuk memberi manfaat kepada masyarakat kampung yang kebanyakannya bergantung kepada kerja-kerja manual.\n\nNamun, kejayaan Amir dan Usamah menarik perhatian Aswan — seorang pemuda yang berasa iri hati dan tidak senang melihat orang lain lebih maju. Didorong oleh hasad dengki, Aswan mencuri pen drive yang menyimpan semua data penting mesin tersebut, dan turut mencuba melancarkan serangan jenayah siber untuk memusnahkan kerja keras Amir.\n\nKetika suasana semakin tegang, banjir besar tiba-tiba melanda kawasan kampung. Dalam kekacauan itu, Aswan terperangkap dan hampir lemas. Walaupun Aswan pernah berbuat jahat, Amir tidak berfikir panjang — dengan berani beliau menyelamatkan nyawa Aswan.\n\nPerbuatan mulia Amir membuka mata hati Aswan. Dia menyedari betapa salahnya tindakannya selama ini, lalu memohon maaf dengan ikhlas kepada Amir dan Usamah. Amir memaafkan Aswan dengan hati yang terbuka.\n\nAkhirnya, usaha Amir mendapat pengiktirafan apabila beliau memenangi Anugerah Saintis Muda dan mendapat biasiswa. Walau bagaimanapun, Amir turut menerima berita yang menyentuh hati — Asma, gadis yang disukainya, telah bertunang dengan orang lain.",

    timeline: [
      { stage: "Permulaan",    text: "Amir dan Usamah pulang ke kampung dengan semangat inovasi untuk membantu masyarakat." },
      { stage: "Perkembangan", text: "Pembinaan mesin 2 dalam 1 menggunakan Formula Termodinamik. Aswan mula berasa cemburu." },
      { stage: "Konflik",      text: "Aswan mencuri pen drive data mesin dan melancarkan serangan jenayah siber." },
      { stage: "Klimaks",      text: "Banjir melanda kampung. Amir menyelamatkan Aswan yang hampir lemas." },
      { stage: "Peleraian",    text: "Aswan insaf dan mohon maaf. Amir menang Anugerah Saintis Muda dan biasiswa. Asma bertunang." },
    ],

    decoder: [
      {
        rangkap: "Bahagian 1 — Kepulangan dan Cita-cita",
        pantunMudah: "Amir dan Usamah pulang ke kampung dengan misi mulia — menggunakan ilmu untuk mengubah kehidupan masyarakat melalui inovasi.",
        maksud: "Bahagian permulaan ini memperkenalkan watak utama dan niat mulia mereka. Ia menunjukkan bahawa pendidikan sepatutnya mendorong seseorang memberi sumbangan kepada masyarakat.",
        tema: "Semangat inovasi dan tanggungjawab kepada masyarakat",
        nilai: "Bertanggungjawab, Kerjasama",
        pengajaran: "Kita hendaklah menggunakan ilmu yang dipelajari untuk memberi manfaat kepada orang sekeliling.",
      },
      {
        rangkap: "Bahagian 2 — Pembinaan Mesin dan Munculnya Konflik",
        pantunMudah: "Amir dan Usamah membina mesin 2 dalam 1 dengan bersungguh-sungguh. Mesin ini akan membantu masyarakat kampung. Namun, kejayaan mereka menimbulkan perasaan iri hati dalam diri Aswan.",
        maksud: "Proses inovasi memerlukan usaha, kreativiti, dan kerjasama. Munculnya hasad dengki Aswan memperlihatkan sisi gelap manusia yang tidak dapat menerima kejayaan orang lain.",
        tema: "Inovasi berhadapan hasad dengki",
        nilai: "Kerjasama, Kegigihan",
        pengajaran: "Kita hendaklah bekerjasama dan tidak biarkan perasaan dengki menguasai diri.",
      },
      {
        rangkap: "Bahagian 3 — Konflik Memuncak",
        pantunMudah: "Aswan mencuri pen drive Amir dan melancarkan serangan jenayah siber. Amir dan Usamah menghadapi tekanan besar namun tetap tenang dan tidak berputus asa.",
        maksud: "Peristiwa jenayah ini menguji ketabahan Amir dan mendidik pembaca tentang bahaya penyalahgunaan teknologi.",
        tema: "Etika teknologi dan ketabahan menghadapi dugaan",
        nilai: "Ketabahan, Pemaaf",
        pengajaran: "Kita hendaklah tabah menghadapi cabaran dan menggunakan teknologi secara beretika.",
      },
      {
        rangkap: "Bahagian 4 — Banjir dan Penyelamatan",
        pantunMudah: "Banjir besar melanda kampung. Aswan hampir lemas. Tanpa berfikir tentang dendam, Amir terjun menyelamatkan Aswan — detik paling mengharukan dalam keseluruhan cerita.",
        maksud: "Tindakan Amir membuktikan nilai pemaaf dan keberanian melebihi sebarang konflik peribadi.",
        tema: "Keberanian dan kemaafan melebihi dendam",
        nilai: "Keberanian, Kasih sayang, Pemaaf",
        pengajaran: "Kita hendaklah bersedia memaafkan dan menolong orang lain walaupun mereka pernah menyakiti kita.",
      },
      {
        rangkap: "Bahagian 5 — Keinsafan dan Pengakhiran",
        pantunMudah: "Aswan insaf dan memohon maaf dengan tulus. Amir memaafkan Aswan. Amir memenangi Anugerah Saintis Muda dan biasiswa — tetapi berita pertunangan Asma mengajar tentang redha.",
        maksud: "Peleraian menunjukkan bahawa kebaikan mendapat ganjaran. Keinsafan Aswan membuktikan manusia boleh berubah. Berita Asma mengajar tentang menerima takdir.",
        tema: "Ganjaran kegigihan dan keikhlasan pemaafan",
        nilai: "Keinsafan, Kasih sayang, Bertanggungjawab",
        pengajaran: "Kita hendaklah menerima takdir dengan redha kerana setiap kebaikan akan mendapat balasan yang setimpal.",
      },
    ],

    masterCharacters: [
      {
        name: "Amir",
        role: "Watak utama dan protagonis. Amir ialah remaja yang menjadi penggerak utama pembinaan mesin 2 dalam 1. Setiap peristiwa penting dalam novel berkisar kepada keputusan dan tindakannya.",
        traits: ["Kreatif", "Bijaksana", "Gigih", "Pemaaf", "Bertanggungjawab"],
        evidence:
          "Amir mencetuskan idea mesin 2 dalam 1 menggunakan Formula Termodinamik untuk manfaat masyarakat. Beliau terus berusaha walaupun pen drive dicuri dan menghadapi serangan siber. Amir menyelamatkan Aswan semasa banjir walaupun Aswan pernah menyakitinya — bukti terkuat sifat pemaaf dan keberaniannya.",
        relationships:
          "Rakan seperjuangan Usamah yang kukuh berasaskan kepercayaan. Berhadapan konflik dengan Aswan namun akhirnya menunjukkan kemaafan. Dengan Asma, ada perasaan terpendam yang terpaksa diterima dengan redha.",
        importance:
          "Tanpa Amir tiada inovasi, tiada penyelamatan, dan tiada pengajaran kemaafan. Amir melambangkan remaja yang menggunakan ilmu dan akhlak mulia untuk memberi kebaikan kepada masyarakat.",
      },
      {
        name: "Usamah",
        role: "Watak sampingan utama dan rakan setia Amir. Usamah menyokong Amir dari segi teknikal dan memberi sokongan moral dalam setiap cabaran.",
        traits: ["Mahir teknologi", "Rajin", "Setia kawan", "Membantu"],
        evidence:
          "Usamah bekerjasama dengan Amir dalam setiap peringkat pembinaan mesin. Beliau menggunakan kepakaran teknologinya untuk menyokong visi Amir dan tidak berputus asa walaupun menghadapi halangan daripada Aswan.",
        relationships:
          "Rakan karib Amir yang paling dipercayai. Hubungan mereka menggambarkan nilai kerjasama dan persahabatan yang tulus. Dengan Aswan, Usamah berada di pihak bertentangan namun tidak pernah membalas kejahatan dengan kejahatan.",
        importance:
          "Usamah membuktikan kejayaan bergantung kepada sokongan rakan yang setia. Tanpa Usamah, Amir tidak mungkin mampu menyiapkan mesin tersebut.",
      },
      {
        name: "Aswan",
        role: "Watak antagonis yang kemudiannya insaf. Aswan mewakili kelemahan manusia apabila dikuasai hasad dengki, namun perubahan sikapnya menjadi pengajaran paling bermakna dalam novel.",
        traits: ["Iri hati", "Sombong", "Tidak berfikir panjang", "Insaf"],
        evidence:
          "Aswan mencuri pen drive Amir dan melancarkan serangan jenayah siber. Sikapnya berubah sepenuhnya selepas diselamatkan oleh Amir semasa banjir. Aswan memohon maaf dengan tulus kepada Amir dan Usamah.",
        relationships:
          "Bermula sebagai musuh tidak langsung Amir akibat hasad dengki. Selepas peristiwa penyelamatan, hubungan berubah kepada rasa hormat dan penyesalan yang mendalam.",
        importance:
          "Aswan mewakili bahawa manusia boleh berubah menjadi lebih baik jika diberi peluang dan dihadapi dengan kasih sayang bukan dendam.",
      },
      {
        name: "Asma",
        role: "Watak sampingan yang mewakili sisi emosi Amir dan menambah dimensi kemanusiaan kepada cerita.",
        traits: ["Lemah lembut", "Tegas", "Prihatin"],
        evidence:
          "Asma prihatin dengan perkembangan sekitarnya dan menunjukkan sikap tegas dalam membuat keputusan hidupnya. Berita pertunangan Asma pada akhir cerita mengejutkan Amir dan pembaca.",
        relationships:
          "Mempunyai hubungan emosi yang tersirat dengan Amir. Pertunangan Asma pada penghujung cerita mendedahkan sisi manusiawi Amir — bahawa di sebalik kejayaan, ada hati yang perlu belajar menerima kenyataan.",
        importance:
          "Pertunangan Asma mengajar bahawa dalam kehidupan tidak semua yang diharapkan tercapai, dan redha adalah sebahagian daripada kematangan jiwa.",
      },
    ],

    relationshipMap: [
      {
        from: "Amir",
        relation: "↔ Sahabat Seperjuangan",
        to: "Usamah",
        explanation:
          "Amir dan Usamah terikat oleh semangat inovasi yang sama. Hubungan mereka berasaskan kepercayaan, kerjasama, dan saling melengkapi. Usamah menyokong Amir dari segi kepakaran teknologi, manakala Amir memberi hala tuju dan visi. Hubungan ini menjadi tulang belakang kejayaan mesin 2 dalam 1.",
      },
      {
        from: "Amir",
        relation: "↔ Konflik & Kemaafan",
        to: "Aswan",
        explanation:
          "Hubungan Amir dengan Aswan bermula dengan ketegangan akibat hasad dengki. Konflik memuncak apabila pen drive dicuri dan jenayah siber dilancarkan. Namun Amir menunjukkan kebesaran hati dengan menyelamatkan Aswan semasa banjir. Hubungan ini berakhir dengan kemaafan ikhlas — teras pengajaran moral novel ini.",
      },
      {
        from: "Amir",
        relation: "↔ Perasaan Terpendam",
        to: "Asma",
        explanation:
          "Amir dan Asma mempunyai hubungan emosi yang halus namun bermakna. Berita pertunangan Asma pada akhir cerita mendedahkan sisi manusiawi Amir — bahawa di sebalik kejayaan besar, ada hati yang perlu belajar menerima kenyataan hidup dengan redha.",
      },
      {
        from: "Usamah",
        relation: "↔ Pihak Bertentangan",
        to: "Aswan",
        explanation:
          "Usamah berada di pihak berlawanan dengan Aswan akibat hasad dengki Aswan terhadap kejayaan mereka. Namun Usamah tidak membalas kejahatan dengan kejahatan. Hubungan ini menggambarkan bagaimana insan berjiwa mulia menangani konflik dengan cara yang matang.",
      },
    ],

    detailedPlot: [
      {
        stage: "Permulaan",
        what: "Amir dan Usamah pulang ke kampung selepas menimba ilmu, membawa semangat dan cita-cita untuk memberi manfaat kepada masyarakat menggunakan Formula Termodinamik.",
        why: "Pembaca diperkenalkan kepada watak utama dan latar cerita. Semangat kedua-dua remaja menggambarkan tema kegigihan dan inovasi yang menjadi nadi novel.",
        effect: "Pembaca berasa teruja dan mula faham bahawa cerita ini bukan sekadar tentang sains, tetapi tentang semangat remaja yang ingin menyumbang kepada masyarakat.",
      },
      {
        stage: "Perkembangan",
        what: "Amir dan Usamah merancang dan membina mesin 2 dalam 1. Proses pembinaan menunjukkan kerjasama, kreativiti, dan usaha gigih mereka. Aswan mula berasa iri hati melihat kemajuan Amir.",
        why: "Bahagian ini memperlihatkan proses inovasi secara praktikal. Perwatakan negatif Aswan mula ketara, membina ketegangan dalam cerita.",
        effect: "Pembaca mula menjangka konflik yang bakal berlaku dan memahami latar belakang watak antagonis.",
      },
      {
        stage: "Konflik",
        what: "Aswan mencuri pen drive yang menyimpan data penting mesin Amir. Beliau turut melancarkan serangan jenayah siber untuk memusnahkan kerja keras Amir dan Usamah.",
        why: "Peristiwa ini menjadi titik kritikal yang menguji ketabahan Amir. Ia menggambarkan kesan buruk hasad dengki yang bukan sahaja merosakkan hubungan, malah mendorong perbuatan jenayah.",
        effect: "Ketegangan cerita memuncak. Nilai ketabahan dan kebijaksanaan Amir diuji pada peringkat yang paling mencabar.",
      },
      {
        stage: "Klimaks",
        what: "Banjir besar melanda kampung. Aswan terperangkap dan hampir lemas. Tanpa ragu-ragu, Amir tampil menyelamatkan Aswan walaupun Aswan adalah orang yang pernah menyakitinya.",
        why: "Ini adalah detik paling penting dalam novel — Amir memilih antara dendam dan pemaafan. Pilihan Amir mencerminkan perwatakannya yang mulia dan menjadi puncak pengajaran moral cerita.",
        effect: "Peristiwa penyelamatan mengubah segalanya. Aswan tersedar akan kesilapannya. Pembaca merasai kuasa pemaafan dan kebaikan hati.",
      },
      {
        stage: "Peleraian",
        what: "Aswan memohon maaf dengan ikhlas. Amir memaafkan Aswan. Amir memenangi Anugerah Saintis Muda dan mendapat biasiswa. Namun Amir menerima berita bahawa Asma telah bertunang.",
        why: "Peleraian menunjukkan bahawa kebaikan akhirnya mendapat ganjaran. Berita pertunangan Asma pula mengajar tentang menerima takdir dengan redha.",
        effect: "Cerita berakhir dengan pengajaran menyeluruh — kejayaan kerjaya, kematangan emosi, dan keikhlasan pemaafan.",
      },
    ],

    importantEvents: [
      {
        event: "Amir dan Usamah membina mesin 2 dalam 1",
        what: "Kedua-dua remaja menggabungkan ilmu termodinamik dengan kreativiti untuk mencipta mesin yang boleh melakukan dua fungsi sekaligus demi membantu masyarakat kampung.",
        whyImportant: "Peristiwa ini menjadi titik permulaan konflik dan pencapaian dalam cerita. Ia membuktikan ilmu boleh digunakan secara praktikal untuk kebaikan masyarakat.",
        possibleQuestion: "Apakah tujuan Amir membina mesin 2 dalam 1 dan bagaimana ia menggambarkan tema novel?",
      },
      {
        event: "Formula Termodinamik digunakan dalam mesin",
        what: "Amir mengaplikasikan prinsip termodinamik dalam reka bentuk mesin, menunjukkan gabungan ilmu akademik dengan kemahiran praktikal yang memberi manfaat sebenar.",
        whyImportant: "Membuktikan bahawa pembelajaran boleh digunakan secara nyata. Novel ini mendorong murid menghargai ilmu sains sebagai alat untuk mengubah dunia.",
        possibleQuestion: "Mengapakah penggunaan Formula Termodinamik penting dari segi nilai pendidikan dalam novel ini?",
      },
      {
        event: "Aswan berasa cemburu dan iri hati",
        what: "Melihat kejayaan Amir dan Usamah, Aswan diresapi perasaan hasad dengki. Dia tidak gembira melihat orang lain lebih maju daripadanya.",
        whyImportant: "Memperlihatkan kesan negatif hasad dengki dalam diri manusia. Ini menjadi punca utama konflik dalam cerita.",
        possibleQuestion: "Apakah yang menyebabkan Aswan berasa iri hati dan bagaimana perasaan itu mempengaruhi jalan cerita?",
      },
      {
        event: "Pen drive dicuri oleh Aswan",
        what: "Didorong hasad dengki, Aswan mencuri pen drive yang menyimpan semua data penting mesin Amir dan Usamah.",
        whyImportant: "Kecurian ini menjadi konflik utama cerita, menggambarkan bahawa hasad dengki boleh membawa seseorang ke arah perbuatan jenayah.",
        possibleQuestion: "Mengapakah Aswan mencuri pen drive Amir dan apakah kesannya terhadap Amir dan Usamah?",
      },
      {
        event: "Cubaan jenayah siber",
        what: "Aswan tidak berhenti pada kecurian sahaja — beliau turut melancarkan serangan siber untuk memusnahkan kerja keras Amir dan Usamah secara digital.",
        whyImportant: "Membawa unsur jenayah siber dalam cerita, mendidik murid tentang bahaya penyalahgunaan teknologi dan kepentingan etika digital.",
        possibleQuestion: "Apakah mesej yang disampaikan melalui peristiwa jenayah siber dalam novel ini?",
      },
      {
        event: "Kampung dilanda banjir besar",
        what: "Bencana alam melanda kawasan kampung secara tiba-tiba, menyebabkan penduduk bertempiaran dan beberapa orang terperangkap termasuk Aswan.",
        whyImportant: "Banjir menjadi pemangkin kepada perubahan besar dalam cerita, menguji nilai setiap watak ketika bencana melanda.",
        possibleQuestion: "Bagaimana banjir yang melanda kampung menjadi titik perubahan penting dalam novel ini?",
      },
      {
        event: "Aswan hampir lemas",
        what: "Dalam kekacauan banjir, Aswan terperangkap dan hampir lemas. Nasibnya bergantung sepenuhnya kepada belas ihsan orang lain.",
        whyImportant: "Situasi ini merupakan detik pengadilan bagi Aswan. Orang yang pernah disakitinya kini menjadi satu-satunya penyelamatnya — penuh ironi dan pengajaran.",
        possibleQuestion: "Apakah nilai yang tergambar melalui peristiwa Aswan hampir lemas dalam banjir?",
      },
      {
        event: "Amir menyelamatkan Aswan",
        what: "Tanpa rasa dendam, Amir terjun ke dalam bah menyelamatkan nyawa Aswan — orang yang pernah mencuri data dan cuba memusnahkan kerjanya.",
        whyImportant: "Ini ialah puncak pengajaran moral novel. Amir membuktikan bahawa kemaafan dan kebaikan hati lebih besar daripada dendam. Tindakan ini mengubah keseluruhan jalan cerita.",
        possibleQuestion: "Mengapakah tindakan Amir menyelamatkan Aswan dianggap peristiwa paling penting dalam novel ini?",
      },
      {
        event: "Aswan memohon maaf",
        what: "Selepas diselamatkan, Aswan insaf akan segala kesilapannya dan memohon maaf dengan ikhlas kepada Amir dan Usamah atas semua perbuatan buruknya.",
        whyImportant: "Keinsafan Aswan membuktikan manusia boleh berubah. Pemaafan Amir menggenapi nilai kemaafan dan kasih sayang sebagai teras cerita.",
        possibleQuestion: "Apakah yang mendorong Aswan insaf dan memohon maaf? Apakah kepentingannya kepada cerita?",
      },
      {
        event: "Amir memenangi Anugerah Saintis Muda",
        what: "Usaha gigih Amir mendapat pengiktirafan apabila beliau dinobatkan sebagai pemenang Anugerah Saintis Muda yang berprestij.",
        whyImportant: "Kemenangan ini membuktikan kegigihan dan penggunaan ilmu untuk kebaikan masyarakat akhirnya mendapat penghargaan, mengukuhkan tema novel.",
        possibleQuestion: "Apakah yang dibuktikan oleh kemenangan Amir dalam Anugerah Saintis Muda kepada tema novel?",
      },
      {
        event: "Amir mendapat biasiswa",
        what: "Selain anugerah, Amir turut mendapat tawaran biasiswa untuk meneruskan pengajian ke peringkat yang lebih tinggi.",
        whyImportant: "Biasiswa adalah ganjaran konkrit kepada usaha dan ilmu, mengajar murid bahawa ilmu membuka peluang lebih luas dalam kehidupan.",
        possibleQuestion: "Apakah pengajaran yang boleh diambil daripada kejayaan Amir mendapat biasiswa?",
      },
      {
        event: "Amir mengetahui pertunangan Asma",
        what: "Di sebalik semua kejayaan, Amir menerima berita mengejutkan — Asma, gadis yang selama ini disukainya, telah bertunang dengan orang lain.",
        whyImportant: "Menambah dimensi kemanusiaan kepada cerita. Mengajar bahawa dalam kehidupan tidak semua yang kita inginkan tercapai, dan redha adalah tanda kematangan jiwa.",
        possibleQuestion: "Apakah mesej yang disampaikan melalui berita pertunangan Asma pada akhir cerita?",
      },
    ],

    issues: [
      {
        issue: "Kepentingan inovasi dalam kehidupan masyarakat",
        explanation:
          "Novel ini menunjukkan bahawa inovasi bukan milik orang dewasa atau saintis terkenal sahaja. Remaja seperti Amir mampu mencipta sesuatu yang bernilai jika ada ilmu, semangat, dan kerjasama. Inovasi boleh mengubah kehidupan masyarakat menjadi lebih baik.",
      },
      {
        issue: "Kesan buruk hasad dengki",
        explanation:
          "Aswan menggambarkan akibat buruk apabila seseorang dikuasai hasad dengki. Ia bukan sahaja merosakkan hubungan, malah mendorong perbuatan jenayah. Akhirnya Aswan sendiri yang menanggung padahnya.",
      },
      {
        issue: "Semangat kerjasama dalam mencapai matlamat",
        explanation:
          "Kejayaan mesin 2 dalam 1 tidak mungkin tercapai tanpa kerjasama Amir dan Usamah. Novel ini menegaskan bahawa kerja berpasukan, saling mempercayai, dan saling melengkapi adalah kunci kejayaan.",
      },
      {
        issue: "Kepentingan sikap memaafkan",
        explanation:
          "Amir memilih memaafkan Aswan walaupun Aswan pernah mencuri dan cuba memusnahkan kerjanya. Kemaafan Amir bukan tanda kelemahan — ia tanda kebesaran hati yang membawa ketenangan dan penyelesaian.",
      },
      {
        issue: "Penggunaan teknologi secara beretika",
        explanation:
          "Aswan menyalahgunakan teknologi untuk jenayah siber. Ini berbeza dengan Amir dan Usamah yang menggunakan teknologi untuk kebaikan. Novel ini mengajar bahawa teknologi adalah alat yang neutral — baik atau buruknya bergantung kepada tangan siapa ia berada.",
      },
      {
        issue: "Ketabahan menghadapi cabaran dan dugaan",
        explanation:
          "Amir menghadapi pencurian data, serangan siber, dan bencana banjir namun tidak pernah berputus asa. Ketabahan Amir menjadi contoh bahawa cabaran adalah sebahagian daripada perjalanan menuju kejayaan.",
      },
    ],

    theme: {
      title: "Kegigihan remaja melakukan inovasi demi manfaat masyarakat",
      explanation:
        "Novel ini mengisahkan Amir dan Usamah yang tidak berpuas hati hanya dengan lulus peperiksaan. Mereka menggunakan ilmu untuk mencipta sesuatu yang berguna bagi orang ramai. Walaupun menghadapi pelbagai rintangan — pencurian, jenayah siber, dan bencana alam — mereka tidak pernah berputus asa. Inilah maksud kegigihan dalam berinovasi.",
      whyItMatters:
        "Tema ini penting untuk murid Tingkatan 1 kerana ia mengajar bahawa belajar bukan sekadar untuk lulus peperiksaan. Ilmu sepatutnya digunakan untuk memberi manfaat kepada orang lain. Novel ini mendorong generasi muda berfikir kreatif, berani mencuba, dan tidak mudah putus asa.",
    },

    values: [
      {
        value: "Kerjasama",
        explanation: "Amir dan Usamah bekerjasama dalam setiap peringkat pembinaan mesin 2 dalam 1, saling berkongsi idea dan memanfaatkan kekuatan masing-masing.",
        realLife: "Kerjasama diperlukan dalam kerja berkumpulan di sekolah, projek komuniti, dan dalam keluarga.",
        schoolLife: "Menyiapkan projek sains bersama rakan — setiap orang menyumbang mengikut kebolehan masing-masing.",
      },
      {
        value: "Keberanian",
        explanation: "Amir menunjukkan keberanian apabila terjun ke dalam bah menyelamatkan Aswan tanpa memikirkan bahaya.",
        realLife: "Keberanian bermaksud melakukan perkara yang betul walaupun ia sukar atau menakutkan.",
        schoolLife: "Berani menyuarakan pendapat yang betul walaupun tidak dipersetujui oleh majoriti.",
      },
      {
        value: "Keinsafan",
        explanation: "Aswan insaf selepas diselamatkan oleh Amir dan memohon maaf dengan ikhlas atas semua perbuatan buruknya.",
        realLife: "Keinsafan bermakna sedar akan kesilapan diri dan bersedia berubah menjadi lebih baik.",
        schoolLife: "Mengakui kesilapan dengan jujur dan berjanji untuk tidak mengulanginya.",
      },
      {
        value: "Kegigihan",
        explanation: "Amir dan Usamah tidak berputus asa walaupun menghadapi pelbagai halangan dalam usaha membina mesin mereka.",
        realLife: "Kegigihan bermaksud terus mencuba walaupun gagal berulang kali sehinggalah berjaya.",
        schoolLife: "Terus berlatih soalan yang susah sehingga mampu menjawabnya dengan betul.",
      },
      {
        value: "Kasih sayang",
        explanation: "Amir menyelamatkan Aswan bukan kerana mereka rakan baik, tetapi kerana kasih sayang sejati melampaui konflik dan dendam.",
        realLife: "Kasih sayang ditunjukkan melalui perbuatan, bukan sekadar kata-kata.",
        schoolLife: "Membantu rakan yang ketinggalan dalam pelajaran walaupun tidak rapat dengannya.",
      },
      {
        value: "Pemaaf",
        explanation: "Amir memaafkan Aswan walaupun Aswan telah mencuri pen drive dan melancarkan serangan siber. Sifat pemaaf Amir mengubah hati Aswan.",
        realLife: "Memaafkan orang lain bukan tanda kelemahan — ia menunjukkan kekuatan jiwa.",
        schoolLife: "Memaafkan rakan yang pernah berbohong dan memberi peluang kepadanya untuk berubah.",
      },
      {
        value: "Bertanggungjawab",
        explanation: "Amir bertanggungjawab terhadap projek mesin, rakan-rakannya, dan masyarakat yang akan memanfaatkan ciptaannya.",
        realLife: "Bertanggungjawab bermakna menunaikan kewajipan dengan sebaik-baiknya tanpa perlu disuruh.",
        schoolLife: "Menyiapkan tugasan sekolah tepat pada masanya dan memastikan kualiti kerja terjamin.",
      },
    ],

    lessons: [
      {
        value: "Kita hendaklah menggunakan ilmu untuk memberi manfaat kepada masyarakat",
        explanation: "Amir tidak menyimpan ilmunya untuk dirinya sendiri — beliau menggunakan ilmu termodinamik untuk mencipta mesin yang membantu orang ramai.",
        realLife: "Ilmu yang dipelajari di sekolah boleh digunakan untuk menyelesaikan masalah sebenar dalam kehidupan masyarakat.",
        schoolLife: "Seorang murid yang mahir matematik boleh membantu rakan yang bermasalah — inilah penggunaan ilmu yang bermakna.",
      },
      {
        value: "Kita hendaklah bekerjasama untuk mencapai matlamat yang lebih besar",
        explanation: "Amir dan Usamah berjaya menyiapkan mesin 2 dalam 1 kerana mereka bekerjasama. Seorang sahaja tidak mampu melakukan segalanya.",
        realLife: "Tiada seorang manusia pun yang boleh berjaya bersendirian. Kerjasama adalah kunci.",
        schoolLife: "Kerja berkumpulan yang baik menghasilkan produk yang jauh lebih berkualiti berbanding kerja berseorangan.",
      },
      {
        value: "Kita hendaklah menjauhi sifat hasad dengki kerana ia membawa padah",
        explanation: "Aswan membuktikan hasad dengki membawa kepada tindakan yang merugikan diri sendiri dan orang lain. Akhirnya Aswan sendiri hampir celaka akibat perbuatannya.",
        realLife: "Gembira dengan kejayaan orang lain membolehkan kita lebih fokus pada usaha diri sendiri.",
        schoolLife: "Gantikan rasa cemburu kepada rakan yang lebih pandai dengan motivasi untuk belajar lebih gigih.",
      },
      {
        value: "Kita hendaklah tabah menghadapi cabaran dan tidak berputus asa",
        explanation: "Amir menghadapi pencurian, serangan siber, dan bencana alam namun tidak pernah menyerah. Ketabahan inilah yang akhirnya membawa kejayaan.",
        realLife: "Cabaran adalah ujian yang menguatkan diri. Setiap masalah ada penyelesaiannya jika kita tidak berputus asa.",
        schoolLife: "Jangan menyerah apabila gagal dalam ujian. Analisis kesilapan, belajar semula, dan cuba lagi.",
      },
      {
        value: "Kita hendaklah menggunakan teknologi secara beretika dan bertanggungjawab",
        explanation: "Aswan menyalahgunakan teknologi untuk jenayah siber. Sebaliknya Amir menggunakan teknologi untuk kebaikan. Kita perlu memilih jalan yang betul.",
        realLife: "Teknologi seperti internet adalah alat berkuasa. Gunakanlah untuk perkara yang bermanfaat.",
        schoolLife: "Gunakan peranti digital untuk mencari ilmu, bukan untuk mengganggu atau menyakiti orang lain.",
      },
      {
        value: "Kita hendaklah sentiasa bersedia memaafkan walaupun pernah disakiti",
        explanation: "Amir memaafkan Aswan walaupun Aswan pernah mencuri dan cuba memusnahkan kerjanya. Kemaafan Amir bukan sahaja menyelamatkan jiwa Aswan tetapi juga mengubah hatinya.",
        realLife: "Kemaafan memberi kebebasan kepada diri kita sendiri daripada rasa marah yang membebankan.",
        schoolLife: "Jika ada rakan yang pernah menyakiti hati kita, kemaafan adalah pilihan lebih bijak daripada dendam.",
      },
    ],

    teacherExplains: [
      "Hai murid-murid! Cikgu tahu ramai antara kamu mungkin berfikir bahawa novel Formula Termodinamik ini adalah tentang sains dan mesin sahaja. Memang benar ada unsur sains di dalamnya, tetapi itu bukan mesej utama yang ingin disampaikan oleh penulis.",
      "Sebenarnya, novel ini mengajar empat perkara penting dalam kehidupan. Pertama — ilmu. Amir menggunakan ilmunya untuk kebaikan orang lain. Kedua — usaha. Mereka tidak berhenti walaupun menghadapi pelbagai dugaan. Ketiga — kerjasama. Tanpa Usamah, Amir tidak akan berjaya bersendirian. Keempat — sifat pemaaf. Inilah yang membezakan Amir daripada orang kebanyakan.",
      "Bila menjawab soalan peperiksaan tentang novel ini, ingat: pemeriksa ingin tahu sama ada kamu faham MESEJ di sebalik cerita, bukan sekadar hafal nama watak. Belajarlah menghubungkan watak, peristiwa, dan nilai dengan tema utama — kegigihan remaja melakukan inovasi demi manfaat masyarakat.",
      "Ramai murid terlepas pandang tentang watak Aswan. Ramai yang menganggap Aswan hanya jahat. Sebenarnya, Aswan adalah watak yang PALING banyak pengajaran — dia menunjukkan kesan hasad dengki, dan kemudian membuktikan bahawa manusia boleh berubah menjadi lebih baik. Kedua-dua perkara ini sangat penting untuk peperiksaan!",
    ],

    keyCharacterFocus: {
      name: "Amir",
      whyMatters:
        "Amir adalah nadi keseluruhan cerita. Tanpa Amir tiada inovasi, tiada penyelamatan, dan tiada pengajaran tentang kemaafan. Setiap peristiwa utama berkisar kepada keputusan dan tindakannya.",
      supportsTheme:
        "Amir menjadi bukti hidup tema kegigihan dalam berinovasi. Dari pembinaan mesin hingga menyelamatkan musuhnya, setiap tindakan Amir menggambarkan remaja yang menggunakan ilmu dan hati untuk memberi manfaat kepada masyarakat.",
      supportsIssues:
        "Amir menghidupkan semua persoalan utama — kepentingan inovasi melalui ciptaannya, kepentingan kemaafan melalui tindakannya terhadap Aswan, dan etika teknologi melalui cara beliau menggunakan ilmu.",
      supportsValues:
        "Amir menonjolkan nilai kerjasama (bersama Usamah), keberanian (menyelamatkan Aswan), pemaaf (terhadap Aswan), kegigihan (tidak berputus asa), dan bertanggungjawab (terhadap projek dan masyarakat).",
      supportsLessons:
        "Setiap pengajaran dalam novel boleh dikaitkan dengan tindakan Amir — tentang ilmu, usaha, kerjasama, dan kemaafan.",
    },

    authorPurpose:
      "Penulis menghasilkan novel ini untuk mendidik generasi muda bahawa sains dan teknologi bukan sekadar mata pelajaran di sekolah, tetapi alat yang boleh mengubah kehidupan masyarakat. Di sebalik kisah mesin dan formula, penulis ingin menyampaikan bahawa kejayaan sebenar bukan diukur dari pingat atau biasiswa sahaja, tetapi dari kesan positif yang kita tinggalkan dalam kehidupan orang sekeliling.",

    memory60: {
      theme: "Kegigihan remaja melakukan inovasi demi manfaat masyarakat",
      issues: "Inovasi · Hasad dengki · Kerjasama · Kemaafan · Etika teknologi · Ketabahan",
      mainCharacters: "Amir (gigih, pemaaf) · Usamah (setia, mahir) · Aswan (iri hati→insaf) · Asma (prihatin, bertunang)",
      importantEvents: "Bina mesin → Aswan cemburu → Pen drive dicuri → Jenayah siber → Banjir → Amir selamatkan Aswan → Aswan insaf → Anugerah Saintis Muda → Biasiswa → Asma bertunang",
      values: "Kerjasama · Keberanian · Keinsafan · Kegigihan · Kasih sayang · Pemaaf · Bertanggungjawab",
      lessons: "Guna ilmu untuk kebaikan · Bekerjasama · Jauhi hasad dengki · Tabah hadapi cabaran · Teknologi beretika · Sentiasa memaafkan",
    },

    uasaQuestions: [
      {
        type: "MCQ",
        question: "Apakah perasaan Aswan apabila melihat kejayaan Amir dan Usamah membina mesin 2 dalam 1?",
        answer: "Aswan berasa iri hati dan hasad dengki terhadap kejayaan Amir dan Usamah.",
        explanation: "Hasad dengki Aswan menjadi punca utama konflik dalam novel. Perasaan negatif ini mendorongnya melakukan jenayah.",
      },
      {
        type: "MCQ",
        question: "Apakah dua tindakan Aswan yang menjadi punca konflik utama dalam novel ini?",
        answer: "Aswan mencuri pen drive data mesin Amir dan melancarkan serangan jenayah siber.",
        explanation: "Dua tindakan jenayah ini menguji ketabahan dan kebijaksanaan Amir dalam menghadapi dugaan.",
      },
      {
        type: "MCQ",
        question: "Apakah peristiwa alam yang menjadi titik perubahan penting dalam novel Formula Termodinamik?",
        answer: "Banjir besar yang melanda kawasan kampung menjadi titik perubahan utama dalam novel ini.",
        explanation: "Banjir menyebabkan Aswan hampir lemas dan memberi peluang kepada Amir membuktikan sifat pemaaf dan keberaniannya.",
      },
      {
        type: "MCQ",
        question: "Apakah anugerah dan tawaran yang diterima oleh Amir pada akhir cerita?",
        answer: "Amir memenangi Anugerah Saintis Muda dan mendapat tawaran biasiswa untuk meneruskan pengajian.",
        explanation: "Anugerah dan biasiswa ini melambangkan pengiktirafan terhadap usaha gigih dan sumbangan Amir kepada masyarakat.",
      },
      {
        type: "MCQ",
        question: "Apakah berita mengejutkan yang diterima oleh Amir pada penghujung novel?",
        answer: "Amir mengetahui bahawa Asma, gadis yang disukainya, telah bertunang dengan orang lain.",
        explanation: "Berita ini menambah dimensi emosi dan mengajar tentang kepentingan menerima takdir dengan redha.",
      },
      {
        type: "Struktur",
        question: "Jelaskan dua perwatakan Amir beserta bukti daripada novel.",
        answer: "Pertama, Amir bersifat gigih kerana tidak berputus asa walaupun pen drive datanya dicuri dan menghadapi serangan siber. Beliau terus berusaha sehingga akhirnya memenangi Anugerah Saintis Muda. Kedua, Amir bersifat pemaaf kerana walaupun Aswan pernah menyakitinya, Amir tetap menyelamatkan nyawa Aswan semasa banjir dan memaafkan segala perbuatan buruk Aswan.",
        explanation: "Soalan perwatakan adalah antara soalan paling kerap keluar. Sertakan sifat + bukti daripada cerita untuk setiap sifat yang dinyatakan.",
      },
      {
        type: "Struktur",
        question: "Huraikan dua nilai yang terdapat dalam novel Formula Termodinamik beserta contoh daripada cerita.",
        answer: "Pertama, nilai kerjasama. Amir dan Usamah bekerjasama dalam membina mesin 2 dalam 1. Mereka saling membantu dan melengkapi kepakaran masing-masing sehingga berjaya. Kedua, nilai keinsafan. Aswan insaf akan kesilapannya selepas diselamatkan oleh Amir semasa banjir dan memohon maaf dengan ikhlas.",
        explanation: "Soalan nilai memerlukan: nama nilai + penjelasan + contoh daripada cerita. Tiga elemen ini penting untuk markah penuh.",
      },
      {
        type: "Struktur",
        question: "Apakah tema utama novel Formula Termodinamik? Jelaskan bagaimana tema ini digambarkan dalam cerita.",
        answer: "Tema utama novel ini ialah kegigihan remaja melakukan inovasi demi manfaat masyarakat. Tema ini digambarkan melalui usaha Amir dan Usamah yang tidak berputus asa membina mesin 2 dalam 1 menggunakan Formula Termodinamik walaupun menghadapi pencurian data dan serangan siber. Akhirnya mesin mereka memberi manfaat kepada masyarakat kampung dan Amir memenangi Anugerah Saintis Muda.",
        explanation: "Soalan tema memerlukan penyataan tema yang jelas dan penghuraian bagaimana tema dikemukakan melalui watak dan peristiwa.",
      },
      {
        type: "Struktur",
        question: "Nyatakan dua pengajaran daripada novel Formula Termodinamik dan hubungkannya dengan peristiwa dalam cerita.",
        answer: "Pertama, kita hendaklah menggunakan ilmu untuk memberi manfaat kepada masyarakat. Amir menggunakan ilmu termodinamiknya untuk membina mesin yang membantu penduduk kampung, bukan untuk kepentingan dirinya semata-mata. Kedua, kita hendaklah menjauhi sifat hasad dengki kerana ia membawa padah. Aswan yang dikuasai hasad dengki akhirnya mencuri dan hampir merana apabila hampir lemas dalam banjir.",
        explanation: "Format pengajaran yang betul: 'Kita hendaklah...' diikuti penjelasan dan bukti daripada cerita. Elak penulisan yang terlalu pendek.",
      },
      {
        type: "Struktur",
        question: "Mengapakah peristiwa Amir menyelamatkan Aswan semasa banjir dianggap peristiwa paling penting dalam novel ini? Berikan dua sebab.",
        answer: "Pertama, peristiwa ini merupakan puncak pengajaran moral novel. Amir membuktikan bahawa kemaafan lebih besar daripada dendam walaupun Aswan pernah menyakitinya dengan mencuri pen drive dan melancarkan serangan siber. Kedua, peristiwa ini menjadi titik perubahan watak Aswan. Selepas diselamatkan, Aswan insaf dan memohon maaf dengan ikhlas, membuktikan kebaikan hati boleh mengubah hati manusia yang paling keras sekalipun.",
        explanation: "Soalan 'mengapa penting' memerlukan penjelasan tentang kesan peristiwa terhadap jalan cerita dan mesej yang ingin disampaikan.",
      },
    ],

    examBooster: {
      frequentPoints: [
        "🔥 Sangat Penting — Tema: Kegigihan remaja melakukan inovasi demi manfaat masyarakat",
        "🔥 Sangat Penting — Perwatakan Amir lengkap dengan bukti: gigih, pemaaf, kreatif, bijaksana, bertanggungjawab",
        "🔥 Sangat Penting — Peristiwa penyelamatan Aswan: bukti sifat pemaaf dan keberanian Amir",
        "⭐ Penting — Perwatakan Aswan: dari iri hati & sombong berubah kepada insaf & memohon maaf",
        "⭐ Penting — Nilai kerjasama, kegigihan, pemaaf, dan keinsafan beserta contoh dari cerita",
        "⭐ Penting — Peristiwa pencurian pen drive dan jenayah siber sebagai punca konflik utama",
        "⭐ Penting — Pengajaran dalam format 'Kita hendaklah...' beserta bukti cerita",
        "📌 Perlu Tahu — Perwatakan Usamah: rakan setia, mahir teknologi, menyokong Amir",
        "📌 Perlu Tahu — Perwatakan Asma: lemah lembut, prihatin, bertunang pada akhir cerita",
        "📌 Perlu Tahu — Zon novel: Sabah & Sarawak",
        "📌 Perlu Tahu — Anugerah Saintis Muda dan biasiswa yang dimenangi Amir",
      ],
      commonQuestions: [
        {
          question: "Jelaskan perwatakan watak utama beserta bukti.",
          answerHint:
            "Amir: Gigih (terus berusaha walaupun pen drive dicuri) · Pemaaf (menyelamatkan Aswan) · Kreatif (mencipta mesin 2 dalam 1) · Bijaksana (menangani konflik dengan tenang) · Bertanggungjawab (terhadap projek dan masyarakat)",
          modelAnswer:
            "Watak utama ialah Amir. Pertama, Amir bersifat gigih kerana tidak berputus asa walaupun pen drive dicuri dan menghadapi serangan siber. Kedua, Amir bersifat pemaaf kerana menyelamatkan Aswan semasa banjir walaupun Aswan pernah menyakitinya. Ketiga, Amir bersifat kreatif apabila berjaya mencipta mesin 2 dalam 1 menggunakan Formula Termodinamik.",
          examTip: "Sertakan minimum tiga sifat dengan bukti. Soalan perwatakan membawa markah yang tinggi.",
        },
        {
          question: "Apakah tema novel dan bagaimana ia dikemukakan dalam cerita?",
          answerHint:
            "Tema: Kegigihan remaja melakukan inovasi demi manfaat masyarakat. Dikemukakan melalui: pembinaan mesin, menghadapi halangan, dan kejayaan akhir.",
          modelAnswer:
            "Tema utama ialah kegigihan remaja melakukan inovasi demi manfaat masyarakat. Tema ini dikemukakan melalui usaha gigih Amir dan Usamah membina mesin 2 dalam 1 untuk membantu masyarakat kampung. Walaupun menghadapi pencurian data dan serangan siber, mereka tidak menyerah. Kejayaan Amir memenangi Anugerah Saintis Muda mengukuhkan lagi tema kegigihan ini.",
          examTip: "Nyatakan tema dengan jelas kemudian hubungkan dengan sekurang-kurangnya dua peristiwa dalam cerita.",
        },
      ],
    },

    revision: {
      theme: "Kegigihan remaja melakukan inovasi demi manfaat masyarakat",
      values: "Kerjasama · Keberanian · Keinsafan · Kegigihan · Kasih sayang · Pemaaf · Bertanggungjawab",
      lessons: "Guna ilmu untuk kebaikan · Bekerjasama · Jauhi hasad dengki · Tabah hadapi cabaran · Teknologi beretika · Sentiasa memaafkan",
      examTips: "Fokus: Perwatakan Amir (5 sifat + bukti) · Tema · Peristiwa penyelamatan · Nilai · Pengajaran 'Kita hendaklah...'",
    },

    miniQuiz: [
      {
        question: "Siapakah yang mencuri pen drive Amir?",
        answerHint: "Aswan mencuri pen drive kerana dipengaruhi perasaan hasad dengki.",
        modelAnswer: "Aswan",
        explanation: "Aswan mencuri pen drive Amir kerana didorong rasa iri hati melihat kejayaan Amir dan Usamah.",
        examTip: "Ingat: Aswan = antagonis yang kemudiannya insaf.",
      },
      {
        question: "Apakah anugerah yang dimenangi oleh Amir?",
        answerHint: "Anugerah Saintis Muda — pengiktirafan ke atas usaha inovasi Amir.",
        modelAnswer: "Anugerah Saintis Muda",
        explanation: "Anugerah ini adalah ganjaran kepada kegigihan Amir menggunakan ilmu untuk manfaat masyarakat.",
        examTip: "Anugerah ini membuktikan tema kegigihan dalam berinovasi.",
      },
      {
        question: "Mengapakah Amir menyelamatkan Aswan walaupun Aswan pernah menyakitinya?",
        answerHint: "Kerana Amir memiliki sifat pemaaf dan kasih sayang yang tidak membeza-bezakan orang.",
        modelAnswer: "Amir menyelamatkan Aswan kerana beliau memiliki sifat pemaaf dan kasih sayang yang tulus. Bagi Amir, menyelamatkan nyawa lebih penting daripada membalas dendam.",
        explanation: "Ini adalah peristiwa paling penting yang menggambarkan nilai pemaaf dan keberanian Amir.",
        examTip: "Hubungkan jawapan dengan nilai pemaaf, keberanian, dan kasih sayang.",
      },
    ],
  },

  // ─── Novel: Destinasi Impian (Zon Timur) ─────────────────────────────────────
  {
    id: "destinasi-impian",
    title: "Destinasi Impian",
    typeLabel: "Novel (Zon Timur — Pahang, Terengganu, Kelantan)",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Watak + Tema + Peristiwa + Nilai",
    intro:
      "Jangan risau walaupun kamu tidak pernah membaca novel ini. Selepas belajar di sini, kamu akan faham keseluruhan cerita Destinasi Impian dan bersedia menjawab soalan peperiksaan sepenuhnya.",

    story60:
      "Datuk cabar Firdaus berbasikal → Firdaus merungut → basikal pancit → Firdaus jatuh → sampai Pantai Morib → Firdaus berbohong kepada Mazlinda → Mazlinda uji Firdaus → Firdaus hampir lemas → diselamatkan → Firdaus insaf & berjanji berubah.",

    story90:
      "Datuk mencabar Firdaus dan rakan-rakannya menjalankan ekspedisi berbasikal ke Pantai Morib. Firdaus yang manja tidak bersemangat dan merungut sepanjang perjalanan. Pelbagai halangan ditempuhi bersama Azlina dan Johari — basikal pancit, Firdaus terjatuh, dan pelbagai konflik kecil. Mereka akhirnya tiba di destinasi. Namun Firdaus berbohong kepada Mazlinda tentang perjalanannya. Mazlinda yang bijak menguji kejujuran Firdaus. Kemudian Firdaus hampir lemas di laut dan diselamatkan. Insiden itu membuka mata Firdaus — beliau insaf dan berjanji untuk berubah menjadi lebih jujur dan tabah.",

    retelling3Min:
      "Firdaus seorang remaja yang manja dan tidak biasa menghadapi cabaran fizikal. Suatu hari, datuknya memberi cabaran yang luar biasa — menjalankan ekspedisi berbasikal ke Pantai Morib. Bagi Firdaus, cabaran itu terasa berat dan tidak perlu, lalu beliau mula merungut sejak awal perjalanan.\n\nBersama dua rakan perjalanannya, Azlina yang cergas dan berani serta Johari yang matang dan bertanggungjawab, Firdaus terpaksa meneruskan ekspedisi itu walaupun hati tidak bersetuju. Sepanjang perjalanan, pelbagai halangan terpaksa diharungi — basikal yang pancit, Firdaus yang terjatuh, dan ketegangan antara rakan-rakan yang kadangkala berbeza pendapat dalam membuat keputusan.\n\nMereka akhirnya berjaya tiba di Pantai Morib. Namun Firdaus membuat satu kesilapan besar apabila beliau berbohong kepada Mazlinda tentang perjalanannya — cuba menggambarkan dirinya lebih hebat daripada yang sebenarnya. Mazlinda yang bijak dan berani tidak mudah diperdaya. Beliau menguji kejujuran Firdaus dengan cara yang cerdik, dan Firdaus mula berasa tidak selesa.\n\nKejadian yang paling menggegarkan berlaku apabila Firdaus hampir lemas di laut. Detik hampir maut itu menggugah kesedaran Firdaus. Selepas diselamatkan, Firdaus duduk bermuhasabah — menyedari betapa sifat pengecut, pembohong, dan tidak bertanggungjawab tidak seharusnya terus menjadi sebahagian daripadanya. Dengan penuh keinsafan, Firdaus berjanji untuk berubah — menjadi lebih jujur, lebih berani, dan lebih bersedia menghadapi cabaran kehidupan.",

    timeline: [
      { stage: "Permulaan",    text: "Datuk memberi cabaran ekspedisi berbasikal ke Pantai Morib kepada Firdaus. Firdaus yang manja merasa berat hati tetapi terpaksa menerimanya." },
      { stage: "Perkembangan", text: "Firdaus, Azlina, dan Johari memulakan perjalanan. Pelbagai halangan ditempuhi — basikal pancit, Firdaus terjatuh, dan konflik antara rakan." },
      { stage: "Konflik",      text: "Firdaus berbohong kepada Mazlinda tentang perjalanannya. Mazlinda yang bijak mengesyaki dan menguji kejujuran Firdaus." },
      { stage: "Klimaks",      text: "Firdaus hampir lemas di laut — detik paling menggegarkan yang menggugah kesedaran dan keinsafannya." },
      { stage: "Peleraian",    text: "Firdaus diselamatkan, insaf akan kesilapannya, dan berjanji untuk berubah menjadi lebih jujur dan berani menghadapi cabaran." },
    ],

    decoder: [
      {
        rangkap: "Bahagian 1 — Cabaran yang Tidak Diingini",
        pantunMudah: "Datuk memberi cabaran kepada Firdaus untuk menjalani ekspedisi berbasikal. Firdaus yang manja dan tidak suka bersusah payah merasa keberatan tetapi tidak dapat menolak.",
        maksud: "Bahagian ini memperkenalkan watak Firdaus yang masih belum matang. Cabaran datuk adalah pemangkin kepada keseluruhan cerita — tanpa cabaran ini, Firdaus tidak akan mengalami proses pembentukan jati diri.",
        tema: "Cabaran sebagai jalan ke arah kematangan",
        nilai: "Ketabahan, Bertanggungjawab",
        pengajaran: "Kita hendaklah menerima cabaran dengan hati terbuka kerana ia adalah peluang untuk membesar.",
      },
      {
        rangkap: "Bahagian 2 — Perjalanan Penuh Dugaan",
        pantunMudah: "Firdaus bersama Azlina dan Johari menghadapi pelbagai halangan. Basikal pancit. Firdaus jatuh. Pertengkaran kecil. Setiap halangan mendedahkan sisi sebenar watak masing-masing.",
        maksud: "Halangan-halangan kecil ini adalah ujian sebenar kepada watak. Azlina dan Johari menunjukkan kematangan, manakala Firdaus masih berjuang dengan sifat manjanya.",
        tema: "Cabaran mendedahkan kekuatan dan kelemahan seseorang",
        nilai: "Kesabaran, Kerjasama",
        pengajaran: "Kita hendaklah bersabar dan bekerjasama ketika menghadapi cabaran bersama.",
      },
      {
        rangkap: "Bahagian 3 — Pembohongan dan Ujian",
        pantunMudah: "Tiba di Pantai Morib, Firdaus membuat kesilapan besar — berbohong kepada Mazlinda. Mazlinda yang bijak menguji Firdaus. Kebohongan mula terdedah.",
        maksud: "Pembohongan Firdaus menggambarkan kelemahan terdalamnya. Mazlinda mewakili kebenaran yang tidak boleh disembunyikan selamanya.",
        tema: "Kebenaran pasti terserlah",
        nilai: "Kejujuran",
        pengajaran: "Kita hendaklah jujur dalam setiap keadaan kerana berbohong hanya menambah masalah.",
      },
      {
        rangkap: "Bahagian 4 — Detik Hampir Maut",
        pantunMudah: "Firdaus hampir lemas di laut. Detik yang menakutkan itu menjadi pemangkin kepada keinsafan yang mendalam.",
        maksud: "Insiden hampir lemas adalah kemuncak dramatik yang memaksa Firdaus berhadapan dengan kenyataan dirinya yang sebenar. Ia menggambarkan betapa rapuhnya nyawa manusia.",
        tema: "Ujian hidup sebagai pelajaran terbesar",
        nilai: "Keberanian, Ketabahan",
        pengajaran: "Kita hendaklah berfikir sebelum bertindak supaya tidak meletakkan diri dalam bahaya.",
      },
      {
        rangkap: "Bahagian 5 — Keinsafan dan Janji Perubahan",
        pantunMudah: "Selepas diselamatkan, Firdaus insaf. Beliau berjanji untuk berubah — lebih jujur, lebih berani, lebih bersedia menghadapi cabaran.",
        maksud: "Peleraian menunjukkan bahawa ekspedisi bukan sekadar perjalanan fizikal — ia adalah perjalanan dalaman yang mengubah Firdaus.",
        tema: "Keinsafan membentuk jati diri",
        nilai: "Keinsafan, Kejujuran, Keberanian",
        pengajaran: "Kita hendaklah berani berubah menjadi lebih baik apabila sedar akan kesilapan diri.",
      },
    ],

    masterCharacters: [
      {
        name: "Firdaus",
        role: "Watak utama dan protagonis. Firdaus menjalani perjalanan pembentukan jati diri yang paling ketara dalam novel — daripada remaja manja dan tidak jujur kepada seseorang yang insaf dan bersedia berubah.",
        traits: ["Manja", "Mudah berputus asa", "Tidak jujur", "Berani berubah"],
        evidence:
          "Sifat manja Firdaus terbukti apabila beliau merungut sejak awal perjalanan dan mudah berputus asa apabila menghadapi halangan. Ketidakjujurannya ketara apabila beliau berbohong kepada Mazlinda tentang perjalanannya. Namun keberanian berubah terbukti apabila selepas diselamatkan daripada lemas, Firdaus insaf dan berjanji dengan tulus untuk menjadi lebih baik.",
        relationships:
          "Dicabar oleh datuknya. Didampingi Azlina yang cergas dan Johari yang matang. Diuji kejujurannya oleh Mazlinda yang bijak.",
        importance:
          "Firdaus adalah cermin kepada remaja yang masih dalam proses membesar. Perjalanannya mengajar pembaca bahawa kelemahan bukanlah penghalang kepada perubahan — yang penting ialah kesediaan untuk insaf dan berubah.",
      },
      {
        name: "Azlina",
        role: "Rakan ekspedisi Firdaus yang mewakili keberanian dan ketegasan.",
        traits: ["Cergas", "Berani", "Tegas"],
        evidence:
          "Azlina tidak berundur apabila basikal pancit dan tidak membenarkan halangan kecil menghentikan perjalanan. Sikapnya yang tegas mendorong rakan-rakan terus maju walaupun penat dan susah.",
        relationships:
          "Rakan seperjalanan Firdaus yang keberaniannya menjadi kontras kepada sifat penakut Firdaus pada awal cerita.",
        importance:
          "Azlina menggambarkan nilai keberanian dan ketegasan — menunjukkan cara yang betul untuk menghadapi cabaran tanpa mengeluh.",
      },
      {
        name: "Johari",
        role: "Rakan ekspedisi yang paling matang dan bertanggungjawab.",
        traits: ["Matang", "Bertanggungjawab", "Penyabar"],
        evidence:
          "Johari sentiasa berfikir sebelum bertindak, memastikan kumpulan selamat, dan bersabar menghadapi sifat merungut Firdaus. Apabila berlaku konflik kecil antara rakan-rakan, Johari yang meredakannya.",
        relationships:
          "Penyeimbang dalam kumpulan ekspedisi. Johari menjadi tunjang kepada kumpulan apabila situasi menjadi tegang.",
        importance:
          "Johari menggambarkan nilai kematangan dan tanggungjawab — sifat-sifat yang Firdaus perlu pelajari sepanjang ekspedisi.",
      },
      {
        name: "Datuk",
        role: "Pemberi cabaran yang menjadi pemangkin kepada keseluruhan cerita.",
        traits: ["Tegas", "Prihatin"],
        evidence:
          "Datuk dengan tegas memberikan cabaran ekspedisi kepada Firdaus, bukan untuk menyusahkan tetapi kerana prihatin terhadap perkembangan watak cucu beliau.",
        relationships:
          "Datuk kepada Firdaus. Hubungan ini menggambarkan cara seorang warga tua yang bijak membimbing generasi muda melalui pengalaman, bukan sekadar kata-kata.",
        importance:
          "Tanpa cabaran datuk, Firdaus tidak akan mengalami proses pembentukan jati diri. Datuk mewakili hikmah generasi tua yang tahu cara mendidik tanpa mengajar secara langsung.",
      },
      {
        name: "Mazlinda",
        role: "Watak yang menguji kejujuran Firdaus dan menjadi cermin kepada kebohongannya.",
        traits: ["Bijak", "Berani"],
        evidence:
          "Mazlinda tidak menerima bulat-bulat cerita Firdaus tentang perjalanannya. Dengan kebijaksanaannya, beliau merancang ujian untuk mendedahkan kebenaran.",
        relationships:
          "Penguji kejujuran Firdaus. Hubungan mereka menggambarkan bahawa orang yang kita sayangi atau hormati adalah cermin paling jujur kepada diri kita.",
        importance:
          "Mazlinda mewakili persoalan kejujuran — menunjukkan bahawa kebohongan tidak boleh bertahan lama di hadapan orang yang bijak dan berani.",
      },
    ],

    relationshipMap: [
      {
        from: "Datuk",
        relation: "↔ Pembimbing & Cucu",
        to: "Firdaus",
        explanation:
          "Hubungan ini adalah asas kepada seluruh cerita. Datuk tidak mengajar Firdaus melalui ceramah — beliau mengajar melalui pengalaman dengan memberi cabaran. Tegasnya datuk adalah tanda kasih sayang yang mendalam terhadap perkembangan watak cucunya.",
      },
      {
        from: "Firdaus",
        relation: "↔ Kontras Watak",
        to: "Azlina",
        explanation:
          "Keberanian dan ketegasan Azlina menjadi cermin kepada sifat penakut dan merungut Firdaus pada awal cerita. Hubungan mereka menggambarkan bagaimana rakan sebaya boleh menjadi motivasi kepada perubahan.",
      },
      {
        from: "Firdaus",
        relation: "↔ Model Kematangan",
        to: "Johari",
        explanation:
          "Kematangan dan tanggungjawab Johari menunjukkan kepada Firdaus bagaimana seorang remaja sepatutnya berkelakuan. Johari adalah model yang secara tidak langsung mendidik Firdaus melalui tindakannya.",
      },
      {
        from: "Firdaus",
        relation: "❤ Penguji Kejujuran",
        to: "Mazlinda",
        explanation:
          "Firdaus berbohong kepada Mazlinda kerana ingin kelihatan hebat. Hubungan emosi ini menjadikan pembohongan Firdaus lebih bermakna — orang yang kita sayangi adalah ujian terbesar bagi kejujuran kita.",
      },
    ],

    detailedPlot: [
      {
        stage: "Permulaan",
        what: "Datuk memberi cabaran kepada Firdaus untuk menjalani ekspedisi berbasikal ke Pantai Morib bersama Azlina dan Johari. Firdaus yang manja dan tidak biasa bersusah payah merasa berat hati.",
        why: "Cabaran datuk meletakkan asas kepada keseluruhan cerita. Ia memperkenalkan konflik dalaman utama Firdaus — antara sifat manjanya dengan keperluan untuk membesar.",
        effect: "Pembaca memahami bahawa ini bukan sekadar cerita tentang perjalanan — ia adalah cerita tentang proses pembentukan jati diri seorang remaja.",
      },
      {
        stage: "Perkembangan",
        what: "Firdaus, Azlina, dan Johari memulakan perjalanan berbasikal. Pelbagai halangan ditempuhi — basikal pancit, Firdaus terjatuh, konflik kecil antara rakan, dan Firdaus yang tidak berhenti merungut.",
        why: "Setiap halangan mendedahkan perwatakan sebenar setiap watak. Azlina dan Johari menghadapi masalah dengan matang manakala Firdaus masih berjuang.",
        effect: "Perbandingan antara cara Firdaus dan rakan-rakannya menghadapi masalah mengajar pembaca tentang kepentingan kesabaran dan kerjasama.",
      },
      {
        stage: "Konflik",
        what: "Kumpulan tiba di Pantai Morib. Firdaus kemudian berbohong kepada Mazlinda tentang perjalanannya, cuba menggambarkan dirinya lebih hebat. Mazlinda yang bijak mengesyaki dan mula menguji kejujuran Firdaus.",
        why: "Pembohongan Firdaus menggambarkan kelemahan terdalamnya — ketidakupayaan untuk jujur walaupun dengan orang yang dipercayai. Ini adalah konflik terpenting dalam novel.",
        effect: "Ujian Mazlinda menambahkan tekanan kepada Firdaus dan meletakkan asas kepada keinsafannya.",
      },
      {
        stage: "Klimaks",
        what: "Firdaus hampir lemas di laut dalam satu insiden yang menggegarkan. Nyawanya terancam dan beliau terpaksa diselamatkan.",
        why: "Detik hampir maut ini adalah kemuncak dramatik yang memaksa Firdaus berhadapan dengan kenyataan — betapa rapuhnya nyawa dan betapa sia-sianya kebohongan dan sifat angkuh.",
        effect: "Insiden ini menjadi pemangkin paling kuat kepada keinsafan Firdaus.",
      },
      {
        stage: "Peleraian",
        what: "Selepas diselamatkan, Firdaus bermuhasabah dan insaf akan semua kesilapannya. Beliau berjanji untuk berubah — menjadi lebih jujur, lebih berani, dan lebih bersedia menghadapi cabaran.",
        why: "Peleraian menunjukkan bahawa ekspedisi berjaya mencapai tujuan sebenarnya — bukan sekadar perjalanan fizikal ke Pantai Morib, tetapi perjalanan dalaman Firdaus menuju kematangan.",
        effect: "Novel berakhir dengan pengajaran menyeluruh tentang pembentukan jati diri melalui cabaran, kejujuran, dan keberanian berubah.",
      },
    ],

    importantEvents: [
      {
        event: "Datuk memberi cabaran ekspedisi",
        what: "Datuk dengan tegas mencabar Firdaus menjalankan ekspedisi berbasikal ke Pantai Morib — cabaran fizikal dan mental yang besar bagi seorang remaja manja.",
        whyImportant: "Peristiwa ini adalah titik permulaan yang menggerakkan keseluruhan plot. Ia menggambarkan hikmah datuk yang mengajar melalui pengalaman, bukan ceramah.",
        possibleQuestion: "Apakah tujuan datuk memberi cabaran ekspedisi kepada Firdaus?",
      },
      {
        event: "Firdaus merungut",
        what: "Firdaus tidak berhenti merungut sepanjang perjalanan, menggambarkan sifat manjanya yang masih belum bersedia menerima cabaran.",
        whyImportant: "Merungut Firdaus menggambarkan konflik dalaman antara keinginan untuk menyerah dan keperluan untuk meneruskan. Ia menjadi titik perbandingan dengan sikapnya di akhir cerita.",
        possibleQuestion: "Apakah yang digambarkan oleh sikap merungut Firdaus tentang wataknya?",
      },
      {
        event: "Basikal pancit",
        what: "Salah satu basikal pancit semasa perjalanan — halangan pertama yang menguji kesabaran dan kemampuan kumpulan untuk menyelesaikan masalah.",
        whyImportant: "Halangan ini mendedahkan perbezaan cara Firdaus, Azlina, dan Johari menangani masalah — membandingkan kematangan masing-masing.",
        possibleQuestion: "Bagaimana peristiwa basikal pancit menggambarkan perbezaan perwatakan Firdaus berbanding Azlina dan Johari?",
      },
      {
        event: "Firdaus terjatuh",
        what: "Firdaus terjatuh dari basikal semasa perjalanan, menambah lagi cabaran fizikal yang perlu dihadapinya.",
        whyImportant: "Terjatuh secara fizikal menjadi lambang kepada perjalanan Firdaus secara keseluruhannya — jatuh dan perlu bangkit semula.",
        possibleQuestion: "Apakah nilai yang boleh diambil daripada peristiwa Firdaus terjatuh semasa ekspedisi?",
      },
      {
        event: "Kumpulan tiba di Pantai Morib",
        what: "Selepas pelbagai halangan, Firdaus, Azlina, dan Johari berjaya mencapai destinasi mereka di Pantai Morib.",
        whyImportant: "Ketibaan di destinasi membuktikan bahawa usaha dan ketabahan membuahkan hasil. Ia adalah pencapaian fizikal sebelum ujian moral yang lebih besar berlaku.",
        possibleQuestion: "Apakah pengajaran yang boleh diambil daripada kejayaan kumpulan mencapai Pantai Morib?",
      },
      {
        event: "Firdaus berbohong kepada Mazlinda",
        what: "Firdaus berbohong kepada Mazlinda tentang pengalamannya semasa ekspedisi, cuba kelihatan lebih hebat daripada yang sebenarnya.",
        whyImportant: "Ini adalah konflik moral paling penting dalam novel. Pembohongan menggambarkan kelemahan terdalam Firdaus dan menjadi punca ujian kejujurannya.",
        possibleQuestion: "Mengapakah Firdaus berbohong kepada Mazlinda dan apakah akibat tindakannya itu?",
      },
      {
        event: "Mazlinda menguji Firdaus",
        what: "Mazlinda yang bijak mengesyaki pembohongan Firdaus dan merancang cara untuk menguji kejujurannya.",
        whyImportant: "Ujian Mazlinda menggambarkan bahawa kebohongan tidak boleh bertahan di hadapan orang yang bijak. Ia mengajar tentang kepentingan kejujuran dalam hubungan.",
        possibleQuestion: "Apakah yang menunjukkan bahawa Mazlinda adalah watak yang bijak dalam novel Destinasi Impian?",
      },
      {
        event: "Firdaus hampir lemas",
        what: "Firdaus terlibat dalam insiden berbahaya di laut dan hampir lemas — detik paling menggegarkan dalam keseluruhan cerita.",
        whyImportant: "Insiden hampir maut ini adalah pemangkin terkuat kepada keinsafan Firdaus. Ia menunjukkan betapa bahayanya tindakan tanpa berfikir terlebih dahulu.",
        possibleQuestion: "Bagaimana insiden Firdaus hampir lemas menjadi titik perubahan paling penting dalam novel ini?",
      },
      {
        event: "Firdaus diselamatkan",
        what: "Firdaus diselamatkan daripada lemas — nyawanya terselamat, memberinya peluang untuk hidup dan berubah.",
        whyImportant: "Penyelamatan ini adalah hadiah yang memberi Firdaus peluang kedua. Ia menggambarkan nilai kasih sayang dan kepentingan orang lain dalam kehidupan kita.",
        possibleQuestion: "Apakah kepentingan peristiwa Firdaus diselamatkan dalam konteks tema dan pengajaran novel?",
      },
      {
        event: "Firdaus insaf",
        what: "Selepas diselamatkan, Firdaus bermuhasabah dan insaf — menyedari semua kesilapannya dan berjanji untuk berubah menjadi lebih jujur dan berani.",
        whyImportant: "Keinsafan Firdaus adalah puncak pengajaran moral novel. Ia menunjukkan bahawa cabaran dan ujian hidup, walaupun menyakitkan, boleh membentuk jati diri seseorang.",
        possibleQuestion: "Apakah yang mendorong Firdaus insaf dan apakah kepentingan keinsafan itu kepada tema novel?",
      },
    ],

    issues: [
      {
        issue: "Kepentingan kejujuran dalam hubungan",
        explanation:
          "Novel ini menunjukkan secara jelas bahawa berbohong — walaupun untuk kelihatan hebat — akhirnya merosakkan kepercayaan dan hubungan. Firdaus belajar bahawa kejujuran, walaupun pahit, lebih berharga daripada kebohongan yang manis.",
      },
      {
        issue: "Semangat tidak berputus asa menghadapi cabaran",
        explanation:
          "Ekspedisi berbasikal menggambarkan cabaran kehidupan. Novel ini mengajar bahawa tidak kira betapa beratnya dugaan, sikap tidak berputus asa adalah kunci untuk mencapai destinasi — sama ada fizikal mahupun kehidupan.",
      },
      {
        issue: "Nilai persahabatan sejati",
        explanation:
          "Azlina dan Johari menggambarkan persahabatan yang memberi kekuatan. Mereka tidak meninggalkan Firdaus walaupun beliau sering merungut. Persahabatan sejati bukan tentang suka pada waktu senang sahaja.",
      },
      {
        issue: "Cabaran remaja dalam membentuk jati diri",
        explanation:
          "Firdaus mewakili ramai remaja yang masih dalam proses memahami diri sendiri. Novel ini menggambarkan bahawa proses membentuk jati diri sering memerlukan cabaran, kesilapan, dan keinsafan.",
      },
      {
        issue: "Kepentingan berfikir sebelum bertindak",
        explanation:
          "Insiden Firdaus hampir lemas adalah akibat langsung daripada tindakan tanpa berfikir. Novel ini menegaskan bahawa berfikir sebelum bertindak bukan tanda kelemahan — ia adalah tanda kebijaksanaan.",
      },
    ],

    theme: {
      title: "Cabaran dan konflik remaja dalam membentuk jati diri",
      explanation:
        "Novel ini mengisahkan bagaimana seorang remaja yang manja dan tidak jujur terpaksa menghadapi cabaran yang membentuk peribadinya. Melalui ekspedisi berbasikal, Firdaus belajar tentang kejujuran, ketabahan, dan keberanian untuk berubah — semua perkara yang membentuk jati diri sebenar seorang insan.",
      whyItMatters:
        "Tema ini penting kerana ia berkaitan langsung dengan kehidupan murid Tingkatan 1. Setiap murid menghadapi cabaran tersendiri dalam proses membesar. Novel ini mengajar bahawa cabaran bukan musuh — ia adalah guru terbaik dalam membentuk jati diri.",
    },

    values: [
      {
        value: "Keberanian",
        explanation: "Azlina menggambarkan nilai keberanian apabila beliau tidak berundur menghadapi halangan sepanjang ekspedisi. Firdaus pula akhirnya menunjukkan keberanian apabila berani mengakui kesilapan dan berjanji untuk berubah.",
        realLife: "Keberanian bukan bermakna tidak takut — ia bermakna terus melakukan perkara yang betul walaupun takut.",
        schoolLife: "Berani mengangkat tangan di kelas walaupun tidak pasti jawapan adalah lebih baik daripada berdiam diri.",
      },
      {
        value: "Kesabaran",
        explanation: "Johari menggambarkan kesabaran apabila beliau dengan tenang menghadapi sifat merungut Firdaus dan halangan-halangan sepanjang perjalanan tanpa hilang semangat.",
        realLife: "Kesabaran adalah kemahiran yang perlu dipelajari — ia tidak datang secara semula jadi tetapi boleh dilatih melalui pengalaman.",
        schoolLife: "Bersabar ketika menghadapi rakan sekumpulan yang lambat dalam kerja berkumpulan.",
      },
      {
        value: "Kejujuran",
        explanation: "Pembohongan Firdaus kepada Mazlinda dan akibatnya mengajar pembaca bahawa kejujuran adalah asas kepada setiap hubungan yang bermakna.",
        realLife: "Berbohong mungkin terasa lebih mudah pada mulanya, tetapi kesan jangka panjang selalu lebih menyakitkan.",
        schoolLife: "Jujur memberitahu guru bahawa tidak menyiapkan kerja rumah lebih baik daripada membuat alasan yang rekaan.",
      },
      {
        value: "Bertanggungjawab",
        explanation: "Johari menunjukkan nilai tanggungjawab apabila beliau sentiasa memastikan keselamatan kumpulan dan tidak membiarkan masalah terbengkalai.",
        realLife: "Tanggungjawab bermakna tidak mengelak daripada kewajipan walaupun ada jalan mudah yang tersedia.",
        schoolLife: "Menyelesaikan tugas yang telah diamanahkan tanpa menunggu orang lain mengingatkna.",
      },
      {
        value: "Ketabahan",
        explanation: "Kumpulan ekspedisi menunjukkan ketabahan apabila terus meneruskan perjalanan walaupun menghadapi basikal pancit, Firdaus terjatuh, dan pelbagai halangan lain.",
        realLife: "Ketabahan bermakna tidak berhenti walaupun perjalanan terasa berat dan tidak ada yang memuji.",
        schoolLife: "Terus belajar walaupun sesuatu topik terasa susah dan memerlukan banyak ulang kaji.",
      },
    ],

    lessons: [
      {
        value: "Kita hendaklah jujur dalam setiap keadaan walaupun kebenaran itu pahit",
        explanation: "Firdaus membuktikan bahawa berbohong hanya menambah masalah. Apabila kebohongan terdedah, keadaan menjadi lebih buruk daripada jika beliau jujur dari awal.",
        realLife: "Kejujuran mungkin menyakitkan pada masa kini, tetapi ia menyelamatkan hubungan dan kepercayaan pada masa depan.",
        schoolLife: "Jika tidak faham pelajaran, katakan dengan jujur kepada guru daripada berpura-pura faham.",
      },
      {
        value: "Kita hendaklah tabah menghadapi cabaran dan tidak mudah berputus asa",
        explanation: "Sekiranya Firdaus berputus asa pada halangan pertama, beliau tidak akan sampai ke Pantai Morib dan tidak akan mengalami keinsafan yang mengubah hidupnya.",
        realLife: "Setiap cabaran yang berjaya dilalui menambahkan kekuatan untuk menghadapi cabaran seterusnya.",
        schoolLife: "Jangan berhenti mencuba dalam pelajaran hanya kerana gagal dalam ujian pertama.",
      },
      {
        value: "Kita hendaklah berfikir sebelum bertindak supaya tidak menyesal kemudian",
        explanation: "Insiden Firdaus hampir lemas adalah akibat tindakan yang tidak diikuti dengan pemikiran yang matang. Berfikir sebelum bertindak boleh mengelakkan bahaya.",
        realLife: "Setiap keputusan mempunyai akibat. Luangkan masa untuk berfikir sebelum mengambil sebarang tindakan yang penting.",
        schoolLife: "Baca arahan peperiksaan dengan teliti sebelum mula menjawab — jangan tergesa-gesa.",
      },
      {
        value: "Kita hendaklah menghargai persahabatan yang memberi sokongan",
        explanation: "Azlina dan Johari tidak meninggalkan Firdaus walaupun beliau sering merungut dan menyusahkan. Persahabatan mereka adalah kekuatan yang membolehkan Firdaus meneruskan perjalanan.",
        realLife: "Sahabat yang memberi nasihat jujur walaupun tidak menyenangkan adalah lebih berharga daripada sahabat yang hanya memuji.",
        schoolLife: "Hargai rakan yang sanggup memberitahu kita apabila kita berbuat salah, bukan hanya yang setuju dengan semua yang kita lakukan.",
      },
      {
        value: "Kita hendaklah menerima teguran dengan hati terbuka",
        explanation: "Ujian Mazlinda adalah satu bentuk teguran terhadap kebohongan Firdaus. Hanya apabila Firdaus menerimanya dengan hati terbuka, perubahan boleh berlaku.",
        realLife: "Teguran yang ikhlas adalah hadiah yang berharga — ia menunjukkan bahawa orang itu mengambil berat tentang kita.",
        schoolLife: "Terima semakan dan pembetulan guru dengan sikap positif — itu adalah cara guru membantu kita berkembang.",
      },
      {
        value: "Kita hendaklah berani mengakui kesilapan dan berubah menjadi lebih baik",
        explanation: "Keinsafan Firdaus selepas diselamatkan menunjukkan keberanian yang paling sukar — keberanian berhadapan dengan diri sendiri dan mengakui kesilapan.",
        realLife: "Mengakui kesilapan bukan tanda kelemahan. Ia adalah langkah pertama yang paling penting menuju perubahan.",
        schoolLife: "Jika membuat kesilapan dalam ujian, analisis kesilapan itu dengan jujur dan perbaiki — jangan sekadar terima markah tanpa belajar dari kesilapan.",
      },
    ],

    teacherExplains: [
      "Hai murid-murid! Ramai yang beranggapan novel Destinasi Impian ini hanya tentang seorang remaja yang berbasikal ke pantai. Memang ada ekspedisi berbasikal dalam cerita ini, tetapi destinasi sebenar yang ingin dicapai penulis bukan Pantai Morib — ia adalah DESTINASI JATI DIRI Firdaus.",
      "Sebenarnya, novel ini mengajar empat perkara penting. Pertama — kejujuran adalah asas kepada setiap hubungan. Firdaus hampir kehilangan kepercayaan Mazlinda akibat pembohongannya. Kedua — cabaran adalah guru terbaik. Tanpa ekspedisi yang sukar itu, Firdaus tidak akan berubah. Ketiga — persahabatan memberi kekuatan. Azlina dan Johari adalah tunjang yang membolehkan Firdaus meneruskan. Keempat — keinsafan memerlukan keberanian.",
      "Apabila menjawab soalan tentang novel ini, ingat: tema utamanya ialah PEMBENTUKAN JATI DIRI melalui cabaran. Setiap peristiwa dalam cerita — dari basikal pancit hingga hampir lemas — semuanya adalah proses yang membentuk watak Firdaus.",
      "Ramai murid keliru antara tujuan ekspedisi dan tujuan cerita. Ekspedisi ke Pantai Morib adalah perjalanan FIZIKAL. Tetapi tujuan sebenar cerita adalah perjalanan DALAMAN Firdaus — daripada remaja manja dan tidak jujur kepada seseorang yang insaf dan bersedia berubah. Ini yang pemeriksa ingin murid faham!",
    ],

    keyCharacterFocus: {
      name: "Firdaus",
      whyMatters:
        "Firdaus adalah nadi cerita. Perjalanannya — fizikal dan dalaman — adalah apa yang membawa pembaca mengikuti plot dari awal hingga akhir.",
      supportsTheme:
        "Firdaus membuktikan tema pembentukan jati diri secara langsung. Setiap kesilapannya, setiap halangan yang dihadapi, dan keinsafannya pada akhir cerita semuanya menggambarkan proses ini.",
      supportsIssues:
        "Firdaus menghidupkan semua persoalan utama — kejujuran melalui pembohongannya, semangat tidak berputus asa melalui perjalanannya, dan keberanian berubah melalui keinsafannya.",
      supportsValues:
        "Perjalanan Firdaus menggambarkan nilai keberanian (berani mengakui kesilapan), kejujuran (belajar dari pembohongan), dan ketabahan (meneruskan ekspedisi).",
      supportsLessons:
        "Setiap pengajaran novel boleh dikaitkan dengan peristiwa dalam perjalanan Firdaus — dari merungut hingga insaf.",
    },

    authorPurpose:
      "Penulis menghasilkan novel ini untuk mendidik generasi muda bahawa proses membesar memerlukan cabaran, kesilapan, dan keinsafan. Melalui ekspedisi berbasikal yang nampak mudah, penulis menggambarkan perjalanan yang jauh lebih besar — perjalanan seorang remaja mencari dan membentuk jati dirinya sendiri.",

    memory60: {
      theme: "Cabaran dan konflik remaja dalam membentuk jati diri",
      issues: "Kejujuran · Tidak berputus asa · Persahabatan · Cabaran remaja · Berfikir sebelum bertindak",
      mainCharacters: "Firdaus (manja→insaf) · Azlina (cergas, berani) · Johari (matang, bertanggungjawab) · Datuk (tegas, prihatin) · Mazlinda (bijak, penguji kejujuran)",
      importantEvents: "Datuk beri cabaran → Firdaus merungut → Basikal pancit → Firdaus jatuh → Tiba Pantai Morib → Firdaus berbohong → Mazlinda uji → Firdaus hampir lemas → Diselamatkan → Firdaus insaf",
      values: "Keberanian · Kesabaran · Kejujuran · Bertanggungjawab · Ketabahan",
      lessons: "Jujur walaupun pahit · Tabah hadapi cabaran · Berfikir sebelum bertindak · Hargai persahabatan · Terima teguran · Berani mengakui kesilapan",
    },

    uasaQuestions: [
      {
        type: "MCQ",
        question: "Apakah cabaran yang diberikan oleh datuk kepada Firdaus dalam novel Destinasi Impian?",
        answer: "Datuk mencabar Firdaus menjalankan ekspedisi berbasikal ke Pantai Morib bersama rakan-rakannya.",
        explanation: "Cabaran datuk adalah titik permulaan yang menggerakkan keseluruhan plot novel ini.",
      },
      {
        type: "MCQ",
        question: "Siapakah rakan-rakan Firdaus yang menyertainya dalam ekspedisi berbasikal?",
        answer: "Azlina dan Johari menyertai Firdaus dalam ekspedisi berbasikal ke Pantai Morib.",
        explanation: "Azlina dan Johari mewakili nilai-nilai positif yang menjadi cermin kepada kelemahan Firdaus.",
      },
      {
        type: "MCQ",
        question: "Apakah kesilapan moral paling besar yang dilakukan oleh Firdaus dalam novel ini?",
        answer: "Firdaus berbohong kepada Mazlinda tentang pengalamannya semasa ekspedisi berbasikal.",
        explanation: "Pembohongan ini adalah konflik moral utama yang akhirnya mendorong proses keinsafan Firdaus.",
      },
      {
        type: "MCQ",
        question: "Apakah yang berlaku kepada Firdaus di laut yang menjadi titik perubahan utama dalam cerita?",
        answer: "Firdaus hampir lemas di laut dan terpaksa diselamatkan — insiden berbahaya yang mencetuskan keinsafannya.",
        explanation: "Insiden hampir lemas adalah pemangkin terkuat kepada perubahan dalaman Firdaus.",
      },
      {
        type: "MCQ",
        question: "Apakah perwatakan Johari yang membezakannya daripada Firdaus pada awal cerita?",
        answer: "Johari bersifat matang, bertanggungjawab, dan penyabar — berbeza dengan Firdaus yang manja dan mudah berputus asa.",
        explanation: "Perbandingan antara Johari dan Firdaus menggambarkan nilai-nilai yang perlu Firdaus pelajari.",
      },
      {
        type: "Struktur",
        question: "Jelaskan dua perwatakan Firdaus beserta bukti daripada novel.",
        answer: "Pertama, Firdaus bersifat manja dan mudah berputus asa apabila beliau tidak berhenti merungut sepanjang ekspedisi berbasikal dan ingin berhenti apabila menghadapi halangan seperti basikal pancit dan terjatuh. Kedua, Firdaus bersifat berani berubah apabila selepas insaf daripada insiden hampir lemas, beliau dengan ikhlas berjanji untuk mengubah dirinya menjadi lebih jujur dan berani menghadapi cabaran.",
        explanation: "Sertakan sifat + penerangan + bukti konkrit daripada cerita untuk setiap sifat yang dinyatakan.",
      },
      {
        type: "Struktur",
        question: "Huraikan dua nilai yang terdapat dalam novel Destinasi Impian beserta contoh daripada cerita.",
        answer: "Pertama, nilai kejujuran. Novel ini menunjukkan kepentingan kejujuran apabila Firdaus yang berbohong kepada Mazlinda akhirnya mengalami kesusahan yang lebih besar. Keinsafan Firdaus pada akhir cerita pun bermula dengan keinsafan tentang kesilapan berbohongnya. Kedua, nilai ketabahan. Kumpulan ekspedisi tidak berputus asa walaupun menghadapi basikal pancit dan Firdaus terjatuh — mereka terus meneruskan perjalanan sehingga berjaya tiba di Pantai Morib.",
        explanation: "Format: nama nilai + huraian + contoh konkrit daripada cerita.",
      },
      {
        type: "Struktur",
        question: "Apakah tema utama novel Destinasi Impian? Jelaskan bagaimana tema ini digambarkan dalam cerita.",
        answer: "Tema utama novel ini ialah cabaran dan konflik remaja dalam membentuk jati diri. Tema ini digambarkan melalui perjalanan Firdaus yang bermula sebagai remaja manja dan tidak jujur. Melalui cabaran ekspedisi berbasikal, pembohongan yang terdedah, dan insiden hampir lemas, Firdaus mengalami proses pembentukan jati diri yang akhirnya menjadikannya seorang yang insaf dan bersedia berubah.",
        explanation: "Nyatakan tema dengan tepat dan hubungkan dengan peristiwa utama yang menggambarkan proses pembentukan jati diri.",
      },
      {
        type: "Struktur",
        question: "Jelaskan kepentingan watak Mazlinda dalam novel Destinasi Impian.",
        answer: "Mazlinda penting dalam novel ini kerana beliau berperanan sebagai penguji kejujuran Firdaus. Kebijaksanaan Mazlinda dalam mengesan pembohongan Firdaus dan mengujinya mendedahkan kelemahan moral Firdaus yang paling ketara. Tanpa watak Mazlinda, kesilapan Firdaus berbohong tidak akan menjadi konflik yang bermakna. Mazlinda menggambarkan persoalan kejujuran — menunjukkan bahawa kebohongan tidak boleh bertahan di hadapan orang yang bijak dan berani.",
        explanation: "Soalan kepentingan watak memerlukan penjelasan tentang fungsi watak dalam plot dan mesej yang dibawa.",
      },
      {
        type: "Struktur",
        question: "Nyatakan dua pengajaran daripada novel Destinasi Impian dan hubungkannya dengan peristiwa dalam cerita.",
        answer: "Pertama, kita hendaklah jujur dalam setiap keadaan walaupun kebenaran itu pahit. Firdaus membuktikan ini apabila pembohongannya kepada Mazlinda akhirnya menambah beban dan tekanan kepada dirinya sendiri, berbanding jika beliau jujur dari awal. Kedua, kita hendaklah berfikir sebelum bertindak supaya tidak menyesal kemudian. Insiden Firdaus hampir lemas berlaku akibat tindakan yang tidak difikirkan dengan matang — mengajar bahawa kebijaksanaan dalam bertindak boleh mengelakkan bahaya.",
        explanation: "Format: 'Kita hendaklah...' + penerangan + bukti konkrit daripada cerita.",
      },
      {
        type: "KBAT",
        question: "Mengapakah datuk memilih ekspedisi berbasikal sebagai cara mendidik Firdaus? Adakah kaedah ini berkesan? Berikan alasan.",
        answer: "Datuk memilih ekspedisi berbasikal kerana beliau ingin mengajar Firdaus melalui pengalaman langsung, bukan ceramah. Kaedah ini jauh lebih berkesan kerana pelajaran yang dipelajari melalui pengalaman meninggalkan kesan yang lebih mendalam berbanding kata-kata. Melalui ekspedisi, Firdaus terpaksa berhadapan dengan cabarannya sendiri dan membuat keputusan sendiri. Kaedah ini terbukti berkesan kerana pada akhir cerita, Firdaus insaf dan berubah — sesuatu yang mungkin tidak akan berlaku jika datuk hanya menasihati beliau.",
        explanation: "Soalan KBAT memerlukan penilaian terhadap kaedah yang digunakan. Sokong dengan hujah dan bukti.",
      },
      {
        type: "KBAT",
        question: "Pada pendapat kamu, apakah pengajaran paling berharga yang boleh diambil daripada watak Firdaus? Berikan alasan.",
        answer: "Pengajaran paling berharga daripada watak Firdaus ialah bahawa kelemahan bukanlah penghalang kepada perubahan. Firdaus memiliki banyak kelemahan — manja, mudah berputus asa, dan tidak jujur. Namun akhirnya beliau insaf dan berjanji untuk berubah. Ini mengajar pembaca bahawa tidak kira betapa banyak kesilapan yang dilakukan, selagi ada keinsafan yang tulen dan keberanian untuk berubah, seseorang masih boleh memperbaiki dirinya. Ini adalah pengajaran yang paling relevan kepada remaja kerana semua orang pernah melakukan kesilapan.",
        explanation: "Soalan KBAT memerlukan pendapat yang disokong dengan hujah yang kukuh dan dikaitkan dengan kehidupan nyata.",
      },
      {
        type: "KBAT",
        question: "Bandingkan cara Azlina dan Johari menghadapi cabaran berbanding Firdaus. Apakah yang boleh Firdaus pelajari daripada mereka?",
        answer: "Azlina menghadapi setiap halangan dengan berani dan tidak pernah mempersoalkan sama ada patut meneruskan atau tidak. Johari pula menghadapi masalah dengan matang dan bertanggungjawab, memastikan kumpulan selamat tanpa mengeluh. Berbanding Firdaus yang merungut dan mudah berputus asa. Firdaus boleh belajar daripada Azlina bahawa keberanian bukan tentang ketiadaan rasa takut, tetapi tentang tindakan walaupun takut. Daripada Johari, Firdaus boleh belajar bahawa kematangan bermakna mengutamakan tanggungjawab kepada orang lain berbanding kselesaan diri sendiri.",
        explanation: "Soalan perbandingan memerlukan analisis perbezaan yang jelas dengan kesimpulan tentang nilai yang boleh dipelajari.",
      },
    ],

    examBooster: {
      frequentPoints: [
        "🔥 Sangat Penting — Tema: Cabaran dan konflik remaja dalam membentuk jati diri",
        "🔥 Sangat Penting — Perwatakan Firdaus: manja, mudah berputus asa, tidak jujur, berani berubah",
        "🔥 Sangat Penting — Peristiwa Firdaus berbohong dan hampir lemas sebagai puncak konflik dan keinsafan",
        "⭐ Penting — Perwatakan Azlina (cergas, berani, tegas) dan Johari (matang, bertanggungjawab, penyabar)",
        "⭐ Penting — Peranan Datuk sebagai pemberi cabaran yang mendidik melalui pengalaman",
        "⭐ Penting — Nilai kejujuran, ketabahan, dan keberanian beserta contoh dari cerita",
        "⭐ Penting — Pengajaran dalam format 'Kita hendaklah...' beserta bukti peristiwa",
        "📌 Perlu Tahu — Peranan Mazlinda sebagai penguji kejujuran Firdaus",
        "📌 Perlu Tahu — Peristiwa basikal pancit dan Firdaus terjatuh sebagai ujian ketabahan",
        "📌 Perlu Tahu — Destinasi ekspedisi: Pantai Morib",
        "📌 Perlu Tahu — Zon novel: Timur (Pahang, Terengganu, Kelantan)",
      ],
      commonQuestions: [
        {
          question: "Jelaskan perwatakan watak utama beserta bukti.",
          answerHint:
            "Firdaus: Manja (merungut sepanjang perjalanan) · Tidak jujur (berbohong kepada Mazlinda) · Berani berubah (insaf selepas hampir lemas dan berjanji untuk berubah)",
          modelAnswer:
            "Watak utama ialah Firdaus. Pertama, Firdaus bersifat manja apabila beliau tidak berhenti merungut sepanjang ekspedisi dan ingin berhenti apabila menghadapi halangan. Kedua, Firdaus bersifat tidak jujur apabila beliau berbohong kepada Mazlinda tentang pengalamannya. Ketiga, Firdaus bersifat berani berubah apabila selepas insaf daripada insiden hampir lemas, beliau berjanji dengan ikhlas untuk menjadi lebih baik.",
          examTip: "Sertakan minimum tiga sifat dengan bukti yang berbeza.",
        },
        {
          question: "Apakah tema novel dan bagaimana ia dikemukakan dalam cerita?",
          answerHint:
            "Tema: Cabaran dan konflik remaja dalam membentuk jati diri. Bukti: ekspedisi sukar → pembohongan → hampir lemas → insaf → berjanji berubah.",
          modelAnswer:
            "Tema utama ialah cabaran dan konflik remaja dalam membentuk jati diri. Tema ini dikemukakan melalui perjalanan Firdaus yang bermula sebagai remaja manja dan tidak jujur. Melalui pelbagai halangan dalam ekspedisi, pembohongan kepada Mazlinda, dan insiden hampir lemas di laut, Firdaus mengalami proses pembentukan jati diri yang akhirnya menjadikannya insaf dan bersedia berubah.",
          examTip: "Hubungkan tema dengan sekurang-kurangnya tiga peristiwa berbeza dalam cerita.",
        },
      ],
    },

    revision: {
      theme: "Cabaran dan konflik remaja dalam membentuk jati diri",
      values: "Keberanian · Kesabaran · Kejujuran · Bertanggungjawab · Ketabahan",
      lessons: "Jujur walaupun pahit · Tabah hadapi cabaran · Berfikir sebelum bertindak · Hargai persahabatan · Terima teguran · Berani mengakui kesilapan",
      examTips: "Fokus: Perwatakan Firdaus (4 sifat) · Tema pembentukan jati diri · Peristiwa pembohongan & hampir lemas · Nilai kejujuran · Pengajaran 'Kita hendaklah...'",
    },

    miniQuiz: [
      {
        question: "Apakah cabaran yang diberikan datuk kepada Firdaus?",
        answerHint: "Ekspedisi berbasikal ke Pantai Morib.",
        modelAnswer: "Datuk mencabar Firdaus menjalankan ekspedisi berbasikal ke Pantai Morib.",
        explanation: "Cabaran ini adalah pemangkin kepada keseluruhan proses pembentukan jati diri Firdaus.",
        examTip: "Destinasi ekspedisi = Pantai Morib. Cara cabaran = berbasikal.",
      },
      {
        question: "Kepada siapakah Firdaus berbohong dan apakah akibatnya?",
        answerHint: "Firdaus berbohong kepada Mazlinda. Mazlinda menguji kejujurannya dan Firdaus akhirnya insaf.",
        modelAnswer: "Firdaus berbohong kepada Mazlinda tentang perjalanannya. Mazlinda yang bijak mengesyaki dan menguji Firdaus, menyebabkan pembohongan hampir terdedah dan menambah tekanan kepada Firdaus.",
        explanation: "Pembohongan kepada Mazlinda adalah konflik moral utama novel.",
        examTip: "Mazlinda = penguji kejujuran. Pembohongan Firdaus kepada Mazlinda = konflik moral utama.",
      },
      {
        question: "Apakah peristiwa yang mencetuskan keinsafan Firdaus?",
        answerHint: "Firdaus hampir lemas di laut dan diselamatkan.",
        modelAnswer: "Insiden Firdaus hampir lemas di laut dan diselamatkan menjadi pemangkin kepada keinsafannya.",
        explanation: "Hampir maut menggugah kesedaran Firdaus tentang kesilapan-kesilapannya.",
        examTip: "Hampir lemas = pemangkin keinsafan. Ini soalan yang kerap keluar.",
      },
    ],
  },

  // ─── Novel: Pelari Muda (Zon Utara) ──────────────────────────────────────────
  {
    id: "pelari-muda",
    title: "Pelari Muda",
    typeLabel: "Novel (Zon Utara — Kedah, Perlis, Pulau Pinang, Perak)",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Watak + Tema + Peristiwa + Nilai",
    intro:
      "Jangan risau jika novel ini terasa rumit. Selepas belajar di sini, kamu akan faham keseluruhan cerita Pelari Muda dan bersedia menjawab soalan peperiksaan — tanpa perlu membaca nota tambahan.",

    story60:
      "Kamarul terkenal → sombong → abaikan latihan → kasar terhadap Saridah → bergaduh dengan Encik Kadir → buang pingat → kemalangan → hospital → insaf → mohon maaf → berlatih semula → juara Sukan SEA → pecah rekod.",

    story90:
      "Kamarul seorang atlet lari berbakat yang naik ke puncak kemasyhuran. Namun kemasyhuran itu mengubahnya — beliau menjadi sombong, mengabaikan latihan, bersikap kasar terhadap Saridah, dan bertengkar dengan jurulatihnya Encik Kadir sehingga membuang pingat. Satu kemalangan jalan raya menghentikan segala-galanya. Semasa di hospital, Kamarul bermuhasabah dan insaf. Dengan sokongan Saridah, Encik Kadir, dan De Wega, Kamarul kembali berlatih dengan disiplin penuh. Akhirnya beliau memenangi pingat emas Sukan SEA dan memecahkan rekod.",

    retelling3Min:
      "Kamarul adalah seorang atlet lari remaja yang penuh bakat. Prestasinya yang cemerlang membawa beliau ke puncak kemasyhuran dalam dunia sukan. Namun di sebalik kejayaan itu, tumbuh satu sifat yang amat berbahaya — kesombongan.\n\nKamarul mula mengabaikan jadual latihan yang telah ditetapkan oleh jurulatihnya, Encik Kadir. Beliau merasakan bahawa bakatnya sudah cukup tanpa perlu bersusah payah berlatih. Sikapnya berubah kasar terhadap Saridah, sahabat setianya yang sentiasa menyokong beliau. Pertelingkahan dengan Encik Kadir memuncak apabila Kamarul bertindak membuang pingat yang pernah dimenanginya — lambang betapa jauhnya beliau telah tersasar daripada landasan yang betul.\n\nNasib Kamarul berubah drastik apabila beliau terlibat dalam satu kemalangan jalan raya yang serius. Semasa dirawat di hospital, jauh daripada sorak-sorai peminat dan lampu sorot kemasyhuran, Kamarul bersendirian dengan fikirannya. Detik sunyi itulah yang menjadi titik keinsafannya. Beliau menyedari betapa banyak yang telah dipersia-siakan — bakat, persahabatan, kepercayaan, dan peluang.\n\nDengan hati yang penuh keinsafan, Kamarul memohon maaf kepada Saridah dan Encik Kadir. De Wega, seorang atlet berpengalaman yang merendah diri, turut memberi nasihat berharga yang membuka mata Kamarul. Dengan semangat baharu dan disiplin yang dipulihkan, Kamarul kembali ke padang latihan.\n\nKerja keras Kamarul membuahkan hasil yang luar biasa — beliau bukan sahaja memenangi pingat emas di Sukan SEA, malah turut memecahkan rekod lama. Kejayaan kali ini jauh lebih bermakna kerana ia dibina atas keinsafan dan usaha yang tulus.",

    timeline: [
      { stage: "Permulaan",    text: "Kamarul menjadi atlet terkenal dan mula meraih kemasyhuran dalam dunia sukan lari." },
      { stage: "Perkembangan", text: "Sifat sombong mula tumbuh — Kamarul mengabaikan latihan dan bersikap kasar terhadap Saridah." },
      { stage: "Konflik",      text: "Pertelingkahan dengan Encik Kadir memuncak. Kamarul membuang pingat dalam keadaan marah." },
      { stage: "Klimaks",      text: "Kemalangan jalan raya yang serius. Kamarul dirawat di hospital dan berhadapan dengan keinsafan." },
      { stage: "Peleraian",    text: "Kamarul insaf, mohon maaf, kembali berlatih dengan disiplin, dan menjuarai Sukan SEA sambil memecahkan rekod." },
    ],

    decoder: [
      {
        rangkap: "Bahagian 1 — Puncak Kemasyhuran",
        pantunMudah: "Kamarul meraih kemasyhuran sebagai atlet lari berbakat. Semua orang mengaguminya. Namun di sebalik senyuman itu, benih kesombongan mula bercambah.",
        maksud: "Bahagian ini memperkenalkan Kamarul sebagai watak yang penuh potensi. Kemasyhuran menjadi ujian pertama — adakah Kamarul akan kekal rendah diri atau tersasar?",
        tema: "Ujian kemasyhuran terhadap karakter seseorang",
        nilai: "Ketabahan, Disiplin",
        pengajaran: "Kita hendaklah kekal rendah diri walaupun berada di puncak kejayaan.",
      },
      {
        rangkap: "Bahagian 2 — Keruntuhan Disiplin",
        pantunMudah: "Kamarul mula mengabaikan latihan. Dia bersikap kasar kepada Saridah. Encik Kadir hilang sabar. Segalanya mula retak.",
        maksud: "Disiplin yang longgar dan kesombongan menghakis hubungan Kamarul dengan orang-orang yang penting dalam hidupnya. Ini menunjukkan betapa berbahayanya sifat angkuh.",
        tema: "Kesan kesombongan terhadap hubungan dan prestasi",
        nilai: "Kasih sayang, Bertanggungjawab",
        pengajaran: "Kita hendaklah menghargai orang yang menyayangi dan membimbing kita.",
      },
      {
        rangkap: "Bahagian 3 — Titik Terendah",
        pantunMudah: "Pertengkaran dengan Encik Kadir mencapai kemuncak. Kamarul membuang pingat — tindakan paling dramatik yang menggambarkan betapa jauhnya dia tersasar.",
        maksud: "Membuang pingat adalah simbol Kamarul menolak semua yang telah dibinanya. Ini titik terendah dalam perjalanannya — namun seringkali titik terendah adalah permulaan kepada perubahan.",
        tema: "Akibat kehilangan kawalan diri",
        nilai: "Keinsafan",
        pengajaran: "Kita hendaklah mengawal emosi dan tidak membuat keputusan ketika marah.",
      },
      {
        rangkap: "Bahagian 4 — Kemalangan dan Keinsafan",
        pantunMudah: "Kemalangan jalan raya menghentikan segala-galanya. Di hospital, dalam kesunyian, Kamarul akhirnya bertemu dengan dirinya yang sebenar. Keinsafan mula hadir.",
        maksud: "Kadangkala kita memerlukan detik yang mengejutkan untuk sedar akan kesilapan kita. Kemalangan bukan sekadar nasib malang — ia menjadi pemangkin perubahan bagi Kamarul.",
        tema: "Keinsafan melalui ujian hidup",
        nilai: "Keinsafan, Ketabahan",
        pengajaran: "Kita hendaklah mengambil iktibar daripada setiap ujian yang menimpa kita.",
      },
      {
        rangkap: "Bahagian 5 — Kebangkitan dan Kejayaan",
        pantunMudah: "Kamarul mohon maaf. Kembali berlatih. Menang pingat emas. Pecah rekod. Kejayaan kali ini berbeza — ia lahir dari hati yang insaf dan usaha yang tulus.",
        maksud: "Peleraian membuktikan tema utama — keinsafan membawa kejayaan. Kemenangan Kamarul lebih bermakna kerana ia dibina atas perubahan dalaman yang sebenar.",
        tema: "Keinsafan membawa kejayaan",
        nilai: "Disiplin, Ketabahan, Kasih sayang",
        pengajaran: "Kita hendaklah berani berubah dan tidak takut untuk memulakan semula.",
      },
    ],

    masterCharacters: [
      {
        name: "Kamarul",
        role: "Watak utama dan protagonis. Kamarul ialah atlet lari berbakat yang mengalami perjalanan daripada puncak kesombongan kepada lembah keinsafan dan akhirnya kembali ke puncak — kali ini dengan jiwa yang lebih matang.",
        traits: ["Berbakat", "Sombong", "Angkuh", "Berani mengakui kesilapan", "Gigih"],
        evidence:
          "Kamarul membuktikan bakatnya dengan menjuarai pelbagai pertandingan lari. Kesombongannya terbukti apabila beliau mengabaikan latihan, bersikap kasar kepada Saridah, bertengkar dengan Encik Kadir, dan membuang pingat. Keberanian mengakui kesilapan terlihat apabila beliau memohon maaf dengan tulus selepas insaf di hospital. Kegigihan terbukti apabila beliau kembali berlatih dengan disiplin penuh sehingga memenangi pingat emas Sukan SEA.",
        relationships:
          "Dibimbing oleh Encik Kadir yang penyabar. Disokong oleh Saridah yang setia berkawan. Mendapat inspirasi daripada De Wega yang berdisiplin dan merendah diri.",
        importance:
          "Kamarul adalah bukti hidup bahawa bakat sahaja tidak mencukupi. Kejayaan sebenar memerlukan disiplin, rendah diri, dan keberanian untuk berubah apabila tersasar.",
      },
      {
        name: "Encik Kadir",
        role: "Jurulatih Kamarul yang berdedikasi. Encik Kadir mewakili seorang mentor yang tidak mudah berputus asa terhadap anak didiknya.",
        traits: ["Penyabar", "Bertanggungjawab", "Berdedikasi"],
        evidence:
          "Encik Kadir terus berusaha membimbing Kamarul walaupun Kamarul mengabaikan latihan dan bersikap tidak hormat. Beliau sanggup melalui pertengkaran dengan Kamarul kerana ingin melihat potensi muridnya berkembang. Apabila Kamarul insaf dan kembali berlatih, Encik Kadir menerima Kamarul dengan hati terbuka.",
        relationships:
          "Hubungan jurulatih-atlet yang diuji oleh kesombongan Kamarul. Encik Kadir mewakili nilai bertanggungjawab kepada anak didik melebihi kepentingan peribadi.",
        importance:
          "Tanpa Encik Kadir, Kamarul tidak akan mempunyai asas yang kukuh untuk bangkit semula. Encik Kadir menggambarkan peranan seorang pembimbing yang tidak putus berharap.",
      },
      {
        name: "Saridah",
        role: "Sahabat setia Kamarul yang mewakili persahabatan sejati.",
        traits: ["Prihatin", "Setia berkawan", "Pemaaf"],
        evidence:
          "Saridah terus menyokong Kamarul walaupun beliau diperlakukan dengan kasar. Beliau tidak meninggalkan Kamarul ketika Kamarul di hospital dan memaafkan Kamarul apabila beliau memohon maaf. Kasih sayang Saridah kepada sahabatnya tidak berubah walaupun Kamarul berubah perangai.",
        relationships:
          "Sahabat yang paling setia kepada Kamarul. Hubungan mereka menggambarkan nilai persahabatan sejati yang tidak diukur oleh keadaan.",
        importance:
          "Saridah membuktikan bahawa sahabat sejati adalah mereka yang hadir ketika kita berada di titik terendah, bukan hanya ketika kita di puncak.",
      },
      {
        name: "De Wega",
        role: "Atlet berpengalaman yang menjadi sumber inspirasi kepada Kamarul.",
        traits: ["Berdisiplin", "Merendah diri", "Memberi nasihat"],
        evidence:
          "De Wega walaupun lebih berpengalaman dan berjaya, tetap merendah diri dan sentiasa berdisiplin dalam latihannya. Nasihat De Wega kepada Kamarul membuka mata beliau bahawa kejayaan sebenar tidak datang daripada bakat semata-mata.",
        relationships:
          "De Wega berfungsi sebagai cermin kepada Kamarul — menunjukkan seperti mana seorang atlet cemerlang sepatutnya berkelakuan.",
        importance:
          "De Wega melambangkan bahawa orang yang paling berjaya sekalipun perlu kekal rendah diri dan berdisiplin. Kontrasnya dengan sikap Kamarul menjadikan pengajaran ini lebih jelas.",
      },
    ],

    relationshipMap: [
      {
        from: "Kamarul",
        relation: "↔ Jurulatih & Anak Didik",
        to: "Encik Kadir",
        explanation:
          "Hubungan ini menggambarkan ujian kepada kepercayaan antara jurulatih dan atlet. Kesombongan Kamarul merosakkan kepercayaan ini, namun keinsafan Kamarul dan kesabaran Encik Kadir memulihkannya. Encik Kadir adalah punca utama Kamarul mendapat asas untuk bangkit semula.",
      },
      {
        from: "Kamarul",
        relation: "↔ Persahabatan Sejati",
        to: "Saridah",
        explanation:
          "Kamarul memperlakukan Saridah dengan kasar semasa angkuh, namun Saridah tidak meninggalkan beliau. Hubungan ini menguji makna persahabatan sebenar. Kemaafan Saridah akhirnya menjadi sebahagian daripada kekuatan yang mendorong Kamarul untuk berubah.",
      },
      {
        from: "Kamarul",
        relation: "↔ Cermin Inspirasi",
        to: "De Wega",
        explanation:
          "De Wega bukan sahaja memberi nasihat tetapi menjadi contoh hidup tentang cara atlet cemerlang sepatutnya berkelakuan. Kerendahan diri dan disiplin De Wega menjadi cermin yang menunjukkan kepada Kamarul apa yang perlu diubah dalam dirinya.",
      },
    ],

    detailedPlot: [
      {
        stage: "Permulaan",
        what: "Kamarul menjadi atlet lari terkenal. Kemasyhuran dan pujian yang diterima mula mengubah peribadi dan sikapnya.",
        why: "Bahagian ini memperkenalkan Kamarul sebagai watak yang penuh potensi tetapi rentan kepada ujian kemasyhuran. Ia meletakkan asas kepada konflik yang bakal berlaku.",
        effect: "Pembaca memahami bahawa Kamarul memiliki bakat luar biasa tetapi kemasyhuran adalah ujian yang paling berbahaya bagi jiwa yang belum matang.",
      },
      {
        stage: "Perkembangan",
        what: "Kamarul mula mengabaikan latihan, bersikap kasar terhadap Saridah, dan tidak menghormati Encik Kadir. Sifat sombong semakin jelas.",
        why: "Perubahan tingkah laku Kamarul menggambarkan betapa cepat seseorang boleh berubah apabila tidak mempunyai kawalan diri. Ini memperlihatkan kesan negatif kesombongan.",
        effect: "Hubungan Kamarul dengan orang-orang penting dalam hidupnya mula retak. Pembaca mula merasai ketegangan yang bakal memuncak.",
      },
      {
        stage: "Konflik",
        what: "Pertengkaran dengan Encik Kadir mencapai kemuncak. Dalam keadaan marah dan hilang kawalan, Kamarul membuang pingat yang pernah dimenanginya.",
        why: "Membuang pingat adalah simbol paling dramatik kejatuhan Kamarul. Ia menggambarkan betapa jauhnya beliau tersasar daripada nilai-nilai yang sepatutnya dipegang.",
        effect: "Ini adalah titik terendah Kamarul. Pembaca merasai betapa besar kesilapan yang dilakukan dan mula menunggu titik perubahan.",
      },
      {
        stage: "Klimaks",
        what: "Kamarul terlibat dalam kemalangan jalan raya yang serius dan dirawat di hospital. Di dalam kesunyian hospital, beliau bermuhasabah dan insaf.",
        why: "Kemalangan menjadi pemangkin perubahan. Jauh daripada kemasyhuran dan sorak-sorai, Kamarul terpaksa berhadapan dengan dirinya yang sebenar.",
        effect: "Keinsafan Kamarul di hospital menjadi titik paling penting dalam novel — ini adalah detik transformasi dalaman yang mengubah segala-galanya.",
      },
      {
        stage: "Peleraian",
        what: "Kamarul memohon maaf kepada Saridah dan Encik Kadir. Dibantu oleh nasihat De Wega, beliau kembali berlatih dengan disiplin. Akhirnya Kamarul memenangi pingat emas Sukan SEA dan memecahkan rekod.",
        why: "Peleraian menunjukkan bahawa keinsafan bukan sekadar perasaan — ia perlu dibuktikan melalui tindakan nyata. Kejayaan Kamarul kali ini lebih bermakna kerana ia lahir dari perubahan yang tulus.",
        effect: "Novel berakhir dengan pengajaran menyeluruh — keinsafan membawa kejayaan yang lebih bermakna daripada kejayaan yang diperoleh tanpa susah payah.",
      },
    ],

    importantEvents: [
      {
        event: "Kamarul menjadi terkenal",
        what: "Prestasi cemerlang Kamarul dalam sukan lari membawa beliau ke puncak kemasyhuran, dipuji oleh semua pihak.",
        whyImportant: "Kemasyhuran ini menjadi ujian pertama kepada karakter Kamarul. Ia adalah punca kepada semua perubahan negatif yang berlaku selepas itu.",
        possibleQuestion: "Bagaimanakah kemasyhuran Kamarul menjadi punca kepada permasalahan yang berlaku dalam novel?",
      },
      {
        event: "Kamarul mengabaikan latihan",
        what: "Kamarul mula tidak hadir ke sesi latihan dan tidak mengikut arahan Encik Kadir, merasakan bakatnya sudah cukup.",
        whyImportant: "Pengabaian latihan menggambarkan akibat terus daripada kesombongan. Ia menunjukkan bahawa bakat tanpa disiplin tidak akan membawa kejayaan jangka panjang.",
        possibleQuestion: "Apakah yang mendorong Kamarul mengabaikan latihan dan apakah kesannya?",
      },
      {
        event: "Kamarul bertengkar dengan Encik Kadir",
        what: "Pertengkaran antara Kamarul dan jurulatihnya Encik Kadir mencapai tahap yang serius, menggambarkan betapa jauh hubungan mereka telah rosak.",
        whyImportant: "Pertengkaran ini adalah klimaks kepada hubungan yang semakin tegang. Ia menguji nilai tanggungjawab jurulatih dan keingkaran anak didik.",
        possibleQuestion: "Apakah sebab pertengkaran Kamarul dengan Encik Kadir dan apakah akibatnya?",
      },
      {
        event: "Kamarul membuang pingat",
        what: "Dalam keadaan marah, Kamarul membuang pingat yang pernah dimenanginya — tindakan yang paling dramatik dalam keseluruhan novel.",
        whyImportant: "Membuang pingat adalah simbol Kamarul menolak semua yang telah dibinanya. Ia menggambarkan betapa berbahayanya kemarahan yang tidak terkawal.",
        possibleQuestion: "Apakah yang dimaksudkan oleh tindakan Kamarul membuang pingat dari segi simbolisme dalam cerita?",
      },
      {
        event: "Kemalangan jalan raya",
        what: "Kamarul terlibat dalam kemalangan jalan raya yang serius dan terpaksa dirawat di hospital.",
        whyImportant: "Kemalangan ini menjadi pemangkin kepada keinsafan Kamarul. Tanpa peristiwa ini, perubahan Kamarul mungkin tidak akan berlaku.",
        possibleQuestion: "Bagaimana kemalangan jalan raya menjadi titik perubahan penting dalam novel Pelari Muda?",
      },
      {
        event: "Kamarul dirawat di hospital",
        what: "Semasa dirawat, Kamarul bersendirian dengan fikirannya dan mula bermuhasabah tentang semua tindakannya yang salah.",
        whyImportant: "Hospital menjadi tempat keinsafan Kamarul. Kesunyian itulah yang membolehkan beliau berfikir dengan jernih tentang kesilapan yang dilakukan.",
        possibleQuestion: "Mengapakah tempoh dirawat di hospital begitu penting kepada perubahan watak Kamarul?",
      },
      {
        event: "Kamarul memohon maaf",
        what: "Selepas insaf, Kamarul memohon maaf kepada Saridah dan Encik Kadir dengan penuh keikhlasan.",
        whyImportant: "Permohonan maaf ini membuktikan keinsafan Kamarul bukan sekadar kata-kata — ia adalah tindakan nyata yang memerlukan keberanian dan kerendahan diri.",
        possibleQuestion: "Apakah yang mendorong Kamarul memohon maaf dan apakah kepentingannya kepada jalan cerita?",
      },
      {
        event: "Kamarul kembali berlatih",
        what: "Dengan semangat baharu dan disiplin yang dipulihkan, Kamarul kembali ke padang latihan di bawah bimbingan Encik Kadir.",
        whyImportant: "Kembalinya Kamarul berlatih adalah bukti bahawa keinsafannya adalah tulen. Ia menggambarkan nilai disiplin dan ketabahan yang diperolehi semula.",
        possibleQuestion: "Apakah yang membuktikan bahawa keinsafan Kamarul adalah tulen dan bukan sekadar kata-kata?",
      },
      {
        event: "Kamarul menang pingat emas",
        what: "Usaha gigih Kamarul membuahkan hasil apabila beliau memenangi pingat emas dalam Sukan SEA.",
        whyImportant: "Kemenangan ini membuktikan tema utama novel — keinsafan membawa kejayaan. Pingat emas ini berbeza nilainya dengan kejayaan terdahulu kerana ia lahir dari perubahan yang tulus.",
        possibleQuestion: "Mengapakah pingat emas yang dimenangi Kamarul di Sukan SEA lebih bermakna berbanding kejayaan-kejayaannya terdahulu?",
      },
      {
        event: "Kamarul memecahkan rekod",
        what: "Bukan sahaja memenangi pingat emas, Kamarul turut memecahkan rekod lama — pencapaian tertinggi dalam kerjaya sukannya.",
        whyImportant: "Memecahkan rekod adalah kemuncak perjalanan Kamarul — membuktikan bahawa disiplin dan keinsafan boleh membawa seseorang lebih jauh daripada bakat semata-mata.",
        possibleQuestion: "Apakah mesej yang disampaikan melalui peristiwa Kamarul memecahkan rekod pada akhir novel?",
      },
    ],

    issues: [
      {
        issue: "Kepentingan disiplin dalam sukan dan kehidupan",
        explanation:
          "Novel ini menunjukkan dengan jelas bahawa bakat tanpa disiplin tidak akan membawa kejayaan jangka panjang. Kamarul yang berbakat akhirnya gagal apabila mengabaikan disiplin latihan. Hanya apabila disiplin dipulihkan, kejayaan sebenar dicapai.",
      },
      {
        issue: "Kesan kesombongan terhadap diri dan hubungan",
        explanation:
          "Kesombongan Kamarul merosakkan hubungannya dengan Encik Kadir dan Saridah, menyebabkan beliau mengabaikan latihan, dan akhirnya terlibat dalam kemalangan. Novel ini mengajar bahawa kesombongan adalah pemusnah yang tersembunyi.",
      },
      {
        issue: "Nilai persahabatan sejati dalam masa susah",
        explanation:
          "Saridah menggambarkan persahabatan sejati — hadir bukan hanya ketika Kamarul di puncak, tetapi juga ketika beliau berada di titik terendah. Novel ini menegaskan bahawa sahabat sejati tidak berubah walaupun kita berubah.",
      },
      {
        issue: "Tanggungjawab jurulatih terhadap anak didik",
        explanation:
          "Encik Kadir mewakili jurulatih yang bertanggungjawab tidak hanya terhadap prestasi sukan tetapi juga terhadap pembentukan karakter anak didiknya. Kesabarannya terhadap Kamarul menggambarkan dedikasi seorang pembimbing sejati.",
      },
      {
        issue: "Keberanian mengakui kesilapan dan berubah",
        explanation:
          "Salah satu persoalan terpenting — adakah seseorang berani mengakui kesilapan dan berubah? Kamarul membuktikan bahawa keberanian berubah lebih sukar daripada keberanian bersaing, tetapi hasilnya lebih bermakna.",
      },
    ],

    theme: {
      title: "Keinsafan membawa kejayaan",
      explanation:
        "Novel ini menggambarkan bahawa kejayaan sebenar bukan lahir daripada bakat semata-mata, tetapi daripada keinsafan yang mendorong perubahan peribadi. Kamarul berjaya menjuarai Sukan SEA dan memecahkan rekod bukan kerana bakatnya sahaja — tetapi kerana beliau insaf, berubah, dan berlatih dengan disiplin penuh.",
      whyItMatters:
        "Tema ini mengajar murid bahawa dalam setiap kejatuhan ada peluang untuk bangkit semula — tetapi kebangkitan itu memerlukan keinsafan yang tulen, bukan sekadar janji. Ini adalah pengajaran hidup yang melampaui dunia sukan.",
    },

    values: [
      {
        value: "Disiplin",
        explanation: "Kamarul berjaya memecahkan rekod hanya selepas beliau kembali berdisiplin dalam latihan di bawah bimbingan Encik Kadir.",
        realLife: "Disiplin bermakna melakukan perkara yang betul walaupun tiada yang memerhati dan walaupun rasanya berat.",
        schoolLife: "Belajar mengikut jadual yang ditetapkan walaupun ada rancangan televisyen yang lebih menarik.",
      },
      {
        value: "Keinsafan",
        explanation: "Semasa di hospital, Kamarul bermuhasabah dan insaf akan semua kesilapannya — titik terpenting dalam perjalanannya.",
        realLife: "Keinsafan bermakna sedar akan kesilapan diri dan bersedia berubah, bukan sekadar menyesal dalam hati.",
        schoolLife: "Sedar bahawa sikap malas belajar adalah kesilapan dan segera berubah dengan membuat jadual belajar yang lebih disiplin.",
      },
      {
        value: "Bertanggungjawab",
        explanation: "Encik Kadir terus bertanggungjawab terhadap Kamarul walaupun Kamarul tidak menghormatinya. Ini menggambarkan nilai tanggungjawab yang tidak bersyarat.",
        realLife: "Tanggungjawab bermakna menunaikan kewajipan walaupun situasinya tidak selesa atau tidak dihargai.",
        schoolLife: "Menyiapkan tugasan yang diberikan dengan sempurna walaupun tiada siapa yang akan memeriksa.",
      },
      {
        value: "Kasih sayang",
        explanation: "Saridah menunjukkan kasih sayang persahabatan yang tulus dengan tetap menyokong Kamarul walaupun diperlakukan dengan kasar.",
        realLife: "Kasih sayang sejati tidak bersyarat — ia tidak berubah mengikut tingkah laku orang yang disayangi.",
        schoolLife: "Terus membantu rakan yang bermasalah walaupun rakan itu kadangkala bersikap tidak baik.",
      },
      {
        value: "Ketabahan",
        explanation: "Kamarul menghadapi kemalangan, tempoh di hospital, dan cabaran kembali berlatih — semua ini memerlukan ketabahan yang luar biasa.",
        realLife: "Ketabahan bermakna terus berdiri selepas jatuh, bukan bermakna tidak pernah jatuh.",
        schoolLife: "Terus berusaha dalam pelajaran walaupun pernah gagal dalam ujian sebelumnya.",
      },
    ],

    lessons: [
      {
        value: "Kita hendaklah sentiasa berdisiplin dalam apa jua bidang yang diceburi",
        explanation: "Kamarul membuktikan bahawa disiplin adalah kunci kejayaan. Apabila beliau mengabaikan disiplin, prestasinya merosot. Apabila beliau kembali berdisiplin, beliau memecahkan rekod.",
        realLife: "Disiplin dalam belajar, bekerja, dan kehidupan seharian adalah asas kepada sebarang pencapaian bermakna.",
        schoolLife: "Hadiri kelas, siapkan tugasan, dan ulang kaji dengan konsisten — bukan hanya sebelum peperiksaan.",
      },
      {
        value: "Kita hendaklah menjauhi sifat sombong dan angkuh",
        explanation: "Kesombongan Kamarul telah merosakkan hubungannya, prestasi sukannya, dan hampir menghancurkan masa depannya.",
        realLife: "Orang yang sombong sukar menerima teguran dan sukar berkembang kerana mereka merasakan diri sudah sempurna.",
        schoolLife: "Walaupun mendapat markah tertinggi dalam kelas, tetap rendah diri dan sedia membantu rakan yang memerlukan.",
      },
      {
        value: "Kita hendaklah menghargai sahabat yang setia dalam susah dan senang",
        explanation: "Saridah yang setia adalah aset terbesar Kamarul, namun beliau hampir kehilangan persahabatan itu akibat kesombongan.",
        realLife: "Sahabat sejati adalah orang yang hadir bukan hanya ketika kita berjaya, tetapi juga ketika kita paling memerlukan sokongan.",
        schoolLife: "Jangan abaikan sahabat lama hanya kerana mendapat kenalan baru yang lebih 'popular' atau 'cool'.",
      },
      {
        value: "Kita hendaklah berani mengakui kesilapan dan berubah menjadi lebih baik",
        explanation: "Kamarul menunjukkan keberanian apabila memohon maaf kepada Saridah dan Encik Kadir — tindakan yang memerlukan kerendahan diri.",
        realLife: "Mengakui kesilapan bukan tanda kelemahan — ia adalah tanda kematangan dan kekuatan jiwa.",
        schoolLife: "Jika terlanjur berkata kasar kepada rakan, beranikan diri untuk memohon maaf dengan tulus.",
      },
      {
        value: "Kita hendaklah menghormati dan mendengar nasihat jurulatih atau guru",
        explanation: "Encik Kadir mempunyai pengalaman dan pengetahuan yang Kamarul tidak miliki. Menolak nasihat beliau hanya merugikan Kamarul sendiri.",
        realLife: "Guru dan jurulatih melihat potensi kita lebih jelas daripada kita sendiri — nasihat mereka perlu dihargai.",
        schoolLife: "Dengar dan ikuti teguran guru dengan hati terbuka, bukan dengan sikap membantah.",
      },
      {
        value: "Kita hendaklah bersyukur dengan bakat yang dikurniakan dan menggunakannya dengan betul",
        explanation: "Kamarul memiliki bakat luar biasa tetapi hampir mensia-siakannya. Bakat adalah amanah yang perlu dijaga dan digunakan untuk kebaikan.",
        realLife: "Setiap orang mempunyai bakat tersendiri — tanggungjawab kita adalah mengenal pasti dan mengembangkannya.",
        schoolLife: "Jika pandai dalam sesuatu mata pelajaran, gunakan kepandaian itu untuk membantu rakan dan tidak sekadar berbangga.",
      },
    ],

    teacherExplains: [
      "Hai murid-murid! Ramai yang beranggapan bahawa novel Pelari Muda ini hanya tentang dunia sukan — tentang larian, pingat, dan rekod. Memang ada semua itu, tetapi mesej utama novel ini jauh lebih dalam daripada sekadar kisah seorang pelari.",
      "Sebenarnya, novel ini mengajar empat perkara penting dalam kehidupan. Pertama — disiplin. Bakat tanpa disiplin tidak bermakna. Kedua — keinsafan. Hanya apabila Kamarul insaf barulah beliau benar-benar berjaya. Ketiga — menghargai hubungan. Kamarul hampir kehilangan Saridah dan Encik Kadir akibat sombong. Keempat — keberanian berubah. Ini yang paling sukar tetapi paling penting.",
      "Bila menjawab soalan peperiksaan tentang novel ini, ingat: pemeriksa ingin tahu sama ada kamu faham MESEJ di sebalik cerita, bukan sekadar hafal nama watak. Tema 'keinsafan membawa kejayaan' perlu kamu hubungkan dengan peristiwa-peristiwa dalam cerita.",
      "Ada satu perkara yang ramai murid terlepas pandang — watak De Wega. Ramai yang tidak tahu mengapa De Wega ada dalam cerita ini. De Wega adalah CERMIN kepada Kamarul — menunjukkan seperti mana seorang atlet cemerlang sepatutnya berkelakuan. Kontras antara De Wega yang merendah diri dengan Kamarul yang sombong itulah yang menjadikan pengajaran novel ini lebih kuat!",
    ],

    keyCharacterFocus: {
      name: "Kamarul",
      whyMatters:
        "Kamarul adalah nadi keseluruhan cerita. Perjalanannya dari puncak kemasyhuran, turun ke lembah kesilapan, dan bangkit semula melalui keinsafan adalah teras kepada tema dan semua pengajaran novel.",
      supportsTheme:
        "Kamarul membuktikan tema 'keinsafan membawa kejayaan' secara langsung — kejayaan terbesarnya (pingat emas dan rekod) hanya datang selepas beliau insaf dan berubah.",
      supportsIssues:
        "Kamarul menghidupkan semua persoalan — disiplin melalui pengabaian latihannya, kesan kesombongan melalui tingkah lakunya, dan keberanian berubah melalui permohonan maafnya.",
      supportsValues:
        "Kamarul menunjukkan nilai keinsafan, disiplin (selepas berubah), ketabahan, dan kasih sayang (terhadap sahabat dan jurulatih) melalui tindakannya.",
      supportsLessons:
        "Setiap pengajaran novel boleh dikaitkan terus dengan perjalanan Kamarul — dari kesilapan kepada keinsafan kepada kejayaan.",
    },

    authorPurpose:
      "Penulis menghasilkan novel ini untuk mendidik generasi muda bahawa bakat dan kemasyhuran tanpa disiplin dan rendah diri boleh membawa kehancuran. Melalui kisah Kamarul, penulis ingin menunjukkan bahawa kejatuhan bukanlah akhir — ia boleh menjadi permulaan kepada kebangkitan yang lebih bermakna apabila dihadapi dengan keinsafan yang tulen.",

    memory60: {
      theme: "Keinsafan membawa kejayaan",
      issues: "Disiplin · Kesombongan · Persahabatan sejati · Tanggungjawab jurulatih · Keberanian berubah",
      mainCharacters: "Kamarul (berbakat→sombong→insaf→juara) · Encik Kadir (penyabar, berdedikasi) · Saridah (setia berkawan, pemaaf) · De Wega (berdisiplin, merendah diri)",
      importantEvents: "Terkenal → Abaikan latihan → Kasar terhadap Saridah → Bertengkar Encik Kadir → Buang pingat → Kemalangan → Hospital → Insaf → Mohon maaf → Berlatih → Pingat emas → Pecah rekod",
      values: "Disiplin · Keinsafan · Bertanggungjawab · Kasih sayang · Ketabahan",
      lessons: "Berdisiplin · Jauhi sombong · Hargai sahabat · Berani mengakui kesilapan · Hormati jurulatih · Bersyukur dengan bakat",
    },

    uasaQuestions: [
      {
        type: "MCQ",
        question: "Apakah perubahan sikap Kamarul selepas menjadi terkenal dalam sukan lari?",
        answer: "Kamarul menjadi sombong dan angkuh, mula mengabaikan latihan, dan bersikap kasar terhadap orang-orang di sekelilingnya.",
        explanation: "Perubahan sikap Kamarul ini adalah punca utama kepada semua konflik dalam novel.",
      },
      {
        type: "MCQ",
        question: "Apakah peristiwa yang menjadi pemangkin kepada keinsafan Kamarul?",
        answer: "Kemalangan jalan raya yang menyebabkan Kamarul dirawat di hospital menjadi pemangkin kepada keinsafannya.",
        explanation: "Tempoh di hospital memberi Kamarul masa dan kesunyian untuk bermuhasabah dan insaf.",
      },
      {
        type: "MCQ",
        question: "Apakah peranan De Wega dalam novel Pelari Muda?",
        answer: "De Wega berperanan sebagai contoh teladan kepada Kamarul — menunjukkan bahawa atlet yang berjaya sepatutnya kekal berdisiplin dan merendah diri.",
        explanation: "Watak De Wega berfungsi sebagai cermin yang menunjukkan sikap atlet yang betul berbanding sikap Kamarul yang sombong.",
      },
      {
        type: "MCQ",
        question: "Apakah pencapaian Kamarul pada akhir novel?",
        answer: "Kamarul memenangi pingat emas dalam Sukan SEA dan berjaya memecahkan rekod lama.",
        explanation: "Pencapaian ini membuktikan tema utama — keinsafan membawa kejayaan yang lebih besar.",
      },
      {
        type: "MCQ",
        question: "Mengapakah Saridah dianggap sahabat sejati Kamarul?",
        answer: "Saridah dianggap sahabat sejati kerana beliau tetap setia menyokong Kamarul walaupun Kamarul pernah bersikap kasar terhadapnya, dan memaafkan Kamarul apabila beliau memohon maaf.",
        explanation: "Saridah menggambarkan persahabatan sejati yang tidak berubah mengikut keadaan.",
      },
      {
        type: "Struktur",
        question: "Jelaskan dua perwatakan Kamarul beserta bukti daripada novel.",
        answer: "Pertama, Kamarul bersifat sombong dan angkuh apabila beliau mula mengabaikan sesi latihan yang ditetapkan oleh Encik Kadir dan bersikap kasar terhadap Saridah setelah menjadi terkenal. Kedua, Kamarul bersifat gigih apabila selepas insaf, beliau kembali berlatih dengan penuh disiplin sehingga berjaya memenangi pingat emas Sukan SEA dan memecahkan rekod lama.",
        explanation: "Pastikan setiap sifat disokong dengan bukti konkrit daripada peristiwa dalam cerita.",
      },
      {
        type: "Struktur",
        question: "Huraikan dua nilai yang terdapat dalam novel Pelari Muda beserta contoh daripada cerita.",
        answer: "Pertama, nilai disiplin. Kamarul hanya berjaya memecahkan rekod Sukan SEA selepas beliau kembali berlatih dengan penuh disiplin di bawah bimbingan Encik Kadir selepas insaf. Ini membuktikan bahawa disiplin adalah asas kepada kejayaan. Kedua, nilai keinsafan. Kamarul insaf akan kesilapannya semasa dirawat di hospital dan memohon maaf kepada Saridah dan Encik Kadir — bukti bahawa beliau berani mengakui kesilapan dan berubah.",
        explanation: "Setiap nilai perlu disertai dengan contoh daripada cerita. Elak jawapan yang terlalu umum.",
      },
      {
        type: "Struktur",
        question: "Apakah tema utama novel Pelari Muda? Jelaskan bagaimana tema ini digambarkan melalui jalan cerita.",
        answer: "Tema utama novel ini ialah keinsafan membawa kejayaan. Tema ini digambarkan melalui perjalanan Kamarul yang bermula dengan kejayaan, kemudian tersasar akibat kesombongan, dan akhirnya mencapai kejayaan sebenar selepas insaf. Walaupun Kamarul pernah membuang pingat dan mengabaikan latihan, keinsafannya semasa di hospital mendorong beliau untuk kembali berlatih dengan bersungguh-sungguh sehingga memenangi pingat emas dan memecahkan rekod Sukan SEA.",
        explanation: "Nyatakan tema dengan jelas, kemudian hubungkan dengan peristiwa penting dalam cerita.",
      },
      {
        type: "Struktur",
        question: "Jelaskan kepentingan watak Encik Kadir dalam novel Pelari Muda.",
        answer: "Encik Kadir penting dalam novel ini kerana beliau berperanan sebagai jurulatih yang bertanggungjawab dan berdedikasi terhadap anak didiknya. Walaupun Kamarul pernah tidak menghormati dan bertengkar dengannya, Encik Kadir tetap bersabar dan menerima Kamarul kembali apabila beliau insaf. Tanpa kesabaran dan dedikasi Encik Kadir, Kamarul tidak akan mempunyai bimbingan yang diperlukan untuk bangkit semula. Beliau menggambarkan persoalan tanggungjawab jurulatih yang bukan sekadar melatih kemahiran sukan, tetapi turut membentuk karakter anak didik.",
        explanation: "Soalan kepentingan watak memerlukan penjelasan tentang fungsi watak dalam plot dan mesej yang dibawa.",
      },
      {
        type: "Struktur",
        question: "Nyatakan dua pengajaran daripada novel Pelari Muda dan hubungkannya dengan peristiwa dalam cerita.",
        answer: "Pertama, kita hendaklah sentiasa berdisiplin dalam apa jua bidang yang diceburi. Kamarul membuktikan bahawa apabila beliau mengabaikan disiplin latihan, prestasinya merosot. Hanya apabila beliau kembali berdisiplin, beliau berjaya memecahkan rekod Sukan SEA. Kedua, kita hendaklah menjauhi sifat sombong dan angkuh. Kesombongan Kamarul telah merosakkan hubungannya dengan Saridah dan Encik Kadir, menyebabkan beliau mengabaikan latihan, dan hampir menghancurkan masa depan sukannya.",
        explanation: "Format yang betul: 'Kita hendaklah...' + huraian + bukti daripada cerita.",
      },
      {
        type: "KBAT",
        question: "Pada pendapat kamu, apakah faktor yang paling penting dalam kebangkitan semula Kamarul? Berikan alasan yang kukuh.",
        answer: "Faktor paling penting dalam kebangkitan semula Kamarul ialah keinsafan dalaman yang berlaku semasa beliau dirawat di hospital. Walaupun sokongan Saridah dan bimbingan Encik Kadir penting, tanpa keinsafan Kamarul sendiri, sokongan orang lain tidak akan berkesan. Keinsafan itulah yang mendorong Kamarul memohon maaf, kembali berlatih dengan disiplin, dan akhirnya memecahkan rekod. Ini membuktikan bahawa perubahan sebenar harus datang dari dalam diri seseorang, bukan sekadar tekanan dari luar.",
        explanation: "Soalan KBAT memerlukan pendapat yang disokong dengan hujah dan bukti. Tunjukkan pemikiran kritis dan hubungan antara faktor.",
      },
      {
        type: "KBAT",
        question: "Bandingkan sikap Kamarul pada awal cerita dengan sikapnya pada akhir cerita. Apakah perubahan yang paling ketara?",
        answer: "Pada awal cerita, Kamarul adalah seorang atlet yang sombong, tidak berdisiplin, dan tidak menghargai orang di sekelilingnya. Beliau mengabaikan latihan, bersikap kasar kepada Saridah, dan bertengkar dengan Encik Kadir sehingga membuang pingat. Pada akhir cerita, Kamarul telah berubah sepenuhnya — beliau rendah diri, berdisiplin, menghargai persahabatan Saridah, dan menghormati bimbingan Encik Kadir. Perubahan paling ketara ialah dari angkuh kepada rendah diri, yang dibuktikan apabila beliau memohon maaf dan menerima bimbingan semula. Perubahan inilah yang membolehkan beliau mencapai kejayaan sebenar.",
        explanation: "Soalan perbandingan memerlukan jawapan yang jelas menunjukkan perbezaan antara dua keadaan dengan contoh konkrit.",
      },
      {
        type: "KBAT",
        question: "Mengapakah novel Pelari Muda relevan kepada kehidupan murid-murid hari ini walaupun ia berkisarkan dunia sukan?",
        answer: "Novel Pelari Muda relevan kepada kehidupan murid hari ini kerana pengajaran utamanya melampaui dunia sukan. Pertama, cabaran untuk kekal rendah diri setelah berjaya adalah sesuatu yang dihadapi oleh semua orang — bukan hanya atlet. Kedua, kepentingan disiplin dalam belajar adalah sama seperti disiplin dalam latihan sukan. Ketiga, menghadapi godaan untuk bersikap sombong setelah mendapat perhatian adalah realiti yang dihadapi oleh ramai remaja hari ini, terutama di era media sosial. Keempat, keberanian mengakui kesilapan dan memohon maaf adalah kemahiran hidup yang diperlukan dalam semua aspek kehidupan.",
        explanation: "Soalan relevan memerlukan jawapan yang menghubungkan cerita dengan kehidupan nyata murid. Tunjukkan pemahaman konteks semasa.",
      },
    ],

    examBooster: {
      frequentPoints: [
        "🔥 Sangat Penting — Tema: Keinsafan membawa kejayaan",
        "🔥 Sangat Penting — Perwatakan Kamarul lengkap: berbakat, sombong, angkuh, insaf, gigih",
        "🔥 Sangat Penting — Peristiwa kemalangan dan keinsafan di hospital sebagai titik perubahan",
        "⭐ Penting — Perwatakan Encik Kadir: penyabar, bertanggungjawab, berdedikasi",
        "⭐ Penting — Perwatakan Saridah: prihatin, setia berkawan, pemaaf",
        "⭐ Penting — Nilai disiplin dan keinsafan beserta contoh daripada cerita",
        "⭐ Penting — Pengajaran dalam format 'Kita hendaklah...' beserta bukti",
        "📌 Perlu Tahu — Peranan De Wega sebagai cermin/contoh teladan kepada Kamarul",
        "📌 Perlu Tahu — Peristiwa Kamarul membuang pingat sebagai simbol",
        "📌 Perlu Tahu — Kamarul memenangi pingat emas dan memecahkan rekod Sukan SEA",
        "📌 Perlu Tahu — Zon novel: Utara (Kedah, Perlis, Pulau Pinang, Perak)",
      ],
      commonQuestions: [
        {
          question: "Jelaskan perwatakan watak utama beserta bukti.",
          answerHint:
            "Kamarul: Sombong (abaikan latihan, kasar terhadap Saridah) · Berani mengakui kesilapan (mohon maaf kepada Saridah dan Encik Kadir) · Gigih (kembali berlatih hingga pecah rekod)",
          modelAnswer:
            "Watak utama ialah Kamarul. Pertama, Kamarul bersifat sombong apabila beliau mengabaikan latihan dan bersikap kasar terhadap Saridah setelah menjadi terkenal. Kedua, Kamarul bersifat berani mengakui kesilapan apabila beliau memohon maaf kepada Saridah dan Encik Kadir dengan ikhlas selepas insaf di hospital. Ketiga, Kamarul bersifat gigih apabila beliau kembali berlatih dengan disiplin penuh sehingga memenangi pingat emas dan memecahkan rekod Sukan SEA.",
          examTip: "Sertakan minimum tiga sifat dengan bukti yang berbeza-beza.",
        },
        {
          question: "Apakah tema novel dan bagaimana ia dikemukakan dalam cerita?",
          answerHint:
            "Tema: Keinsafan membawa kejayaan. Bukti: Kamarul insaf di hospital → mohon maaf → berlatih semula → pingat emas + rekod.",
          modelAnswer:
            "Tema utama ialah keinsafan membawa kejayaan. Tema ini dikemukakan melalui perjalanan Kamarul yang bermula dengan kejayaan, kemudian tersasar akibat kesombongan, dan akhirnya mencapai kejayaan tertinggi selepas insaf. Semasa dirawat di hospital, Kamarul bermuhasabah dan insaf lalu memohon maaf, kembali berlatih dengan disiplin, dan memenangi pingat emas serta memecahkan rekod Sukan SEA.",
          examTip: "Nyatakan tema dengan tepat, kemudian hubungkan dengan sekurang-kurangnya dua peristiwa.",
        },
      ],
    },

    revision: {
      theme: "Keinsafan membawa kejayaan",
      values: "Disiplin · Keinsafan · Bertanggungjawab · Kasih sayang · Ketabahan",
      lessons: "Berdisiplin · Jauhi sombong · Hargai sahabat · Berani mengakui kesilapan · Hormati jurulatih · Bersyukur dengan bakat",
      examTips: "Fokus: Perwatakan Kamarul (sombong→insaf→gigih) · Tema · Peristiwa kemalangan & keinsafan · Nilai disiplin · Pengajaran 'Kita hendaklah...'",
    },

    miniQuiz: [
      {
        question: "Apakah yang dilakukan oleh Kamarul semasa marah kepada Encik Kadir?",
        answerHint: "Kamarul membuang pingat yang pernah dimenanginya dalam pertengkaran dengan Encik Kadir.",
        modelAnswer: "Kamarul membuang pingat yang pernah dimenanginya.",
        explanation: "Tindakan membuang pingat adalah simbol titik terendah Kamarul sebelum keinsafannya.",
        examTip: "Ingat: Membuang pingat = titik terendah Kamarul = simbol kehilangan kawalan diri.",
      },
      {
        question: "Di manakah Kamarul insaf akan kesilapannya?",
        answerHint: "Kamarul insaf semasa dirawat di hospital selepas terlibat dalam kemalangan jalan raya.",
        modelAnswer: "Kamarul insaf semasa dirawat di hospital selepas kemalangan jalan raya.",
        explanation: "Hospital adalah tempat Kamarul bermuhasabah dalam kesunyian — titik transformasi paling penting dalam cerita.",
        examTip: "Hospital = tempat keinsafan Kamarul. Ini soalan yang kerap keluar.",
      },
      {
        question: "Apakah peranan De Wega dalam mengubah sikap Kamarul?",
        answerHint: "De Wega memberi nasihat dan menjadi contoh teladan kepada Kamarul tentang cara atlet cemerlang sepatutnya berkelakuan.",
        modelAnswer: "De Wega memberi nasihat berharga kepada Kamarul dan menjadi contoh teladan — menunjukkan bahawa atlet cemerlang perlu kekal berdisiplin dan merendah diri.",
        explanation: "De Wega berfungsi sebagai cermin kepada Kamarul — kontras sikap De Wega yang merendah diri dengan sombongnya Kamarul.",
        examTip: "De Wega = contoh teladan + cermin kepada Kamarul. Bukan watak utama tetapi penting untuk soalan.",
      },
    ],
  },

  // ─── Novel: Sejambak Bakti (Zon Selatan) ─────────────────────────────────────
  {
    id: "sejambak-bakti",
    title: "Sejambak Bakti",
    typeLabel: "Novel (Zon Selatan — Johor, Melaka, Negeri Sembilan)",
    kind: "story",
    studyTime: "25 minit",
    difficulty: "Sederhana",
    examFocus: "Watak + Tema + Peristiwa + Nilai",
    intro:
      "Jangan risau jika novel ini terasa panjang. Selepas belajar di sini, kamu akan faham keseluruhan cerita Sejambak Bakti dan bersedia menjawab soalan peperiksaan — tanpa perlu membaca nota tambahan.",

    story60:
      "Razali dilantik ke koperasi → koperasi maju → Munir cemburu → Munir ganggu koperasi → Razali dipukul → koperasi diceroboh → Razali difitnah → disiasat polis → Munir ditangkap → Munir insaf & mohon maaf → koperasi johan → Razali jumpa Pak Ramli (bapa kandung).",

    story90:
      "Razali dilantik sebagai penolong setiausaha koperasi sekolah dan bersama Cikgu Zulkifli, membawa koperasi mencapai kejayaan. Munir yang cemburu melancarkan pelbagai gangguan — Razali dipukul, koperasi diceroboh, dan Razali difitnah menyebabkan beliau disiasat polis. Pak Zakaria yang tergesa-gesa menghalau Razali. Akhirnya kebenaran terungkap, Munir ditangkap dan insaf, koperasi memenangi kejohanan, dan Razali menemui Pak Ramli — bapa kandungnya yang selama ini dicari.",

    retelling3Min:
      "Razali merupakan seorang murid yang rajin dan bertanggungjawab. Beliau telah dipilih untuk memegang jawatan penolong setiausaha koperasi sekolah. Di bawah bimbingan Cikgu Zulkifli yang berdedikasi, Razali dan rakan-rakannya termasuk Ramlah bekerja keras untuk memajukan koperasi. Usaha mereka membuahkan hasil apabila koperasi mula berkembang maju.\n\nNamun kejayaan Razali menarik perasaan tidak senang dalam diri Munir. Munir yang berasa cemburu mula melancarkan pelbagai gangguan untuk menghalang kejayaan koperasi. Pertama, Razali telah dipukul dalam satu insiden. Kemudian koperasi diceroboh dan barang-barangnya dicuri. Lebih menyedihkan, Razali difitnah sebagai dalang di sebalik kecerobohan itu sendiri. Akibat fitnah tersebut, Razali dibawa untuk disiasat oleh polis. Pak Zakaria, seorang yang cepat membuat kesimpulan, telah menghalau Razali tanpa mendengar penjelasannya terlebih dahulu.\n\nDalam keadaan tertekan, Razali tetap tabah. Beliau tidak berputus asa dan tidak membalas kejahatan dengan kejahatan. Akhirnya kebenaran mula terserlah. Munir ditangkap dan berhadapan dengan undang-undang. Di sebalik itu semua, Munir menyedari betapa salahnya tindakannya dan memohon maaf kepada Razali dengan penuh keikhlasan.\n\nPada penghujung cerita, koperasi sekolah telah berjaya memenangi kejohanan — bukti kukuh bahawa kegigihan dan kerjasama membuahkan hasil yang manis. Yang lebih bermakna, Razali akhirnya berpeluang bertemu dengan Pak Ramli — bapa kandungnya yang selama ini dirindui.",

    timeline: [
      { stage: "Permulaan",    text: "Razali dilantik sebagai penolong setiausaha koperasi sekolah di bawah bimbingan Cikgu Zulkifli." },
      { stage: "Perkembangan", text: "Koperasi semakin maju. Munir mula berasa cemburu dan merancang untuk mengganggu." },
      { stage: "Konflik",      text: "Razali dipukul, koperasi diceroboh, dan Razali difitnah sehingga disiasat polis." },
      { stage: "Klimaks",      text: "Pak Zakaria menghalau Razali. Munir ditangkap. Kebenaran mula terungkap." },
      { stage: "Peleraian",    text: "Munir insaf dan mohon maaf. Koperasi menjadi johan. Razali bertemu Pak Ramli." },
    ],

    decoder: [
      {
        rangkap: "Bahagian 1 — Pelantikan dan Semangat Baru",
        pantunMudah: "Razali dipilih untuk memimpin koperasi. Dengan semangat dan bimbingan Cikgu Zulkifli, koperasi mula berkembang maju.",
        maksud: "Bahagian ini memperkenalkan watak utama dan suasana awal yang penuh harapan. Pelantikan Razali menggambarkan kepercayaan yang diberikan dan tanggungjawab yang perlu dipikul.",
        tema: "Amanah dan tanggungjawab dalam kepimpinan",
        nilai: "Amanah, Kerajinan",
        pengajaran: "Kita hendaklah menerima tanggungjawab dengan penuh amanah dan bersungguh-sungguh.",
      },
      {
        rangkap: "Bahagian 2 — Kemajuan dan Kemunculan Konflik",
        pantunMudah: "Koperasi semakin maju dengan usaha Razali dan rakan-rakan. Namun kemajuan ini menimbulkan perasaan cemburu dalam diri Munir.",
        maksud: "Kejayaan Razali menjadi pencetus kepada konflik. Sifat iri hati Munir menggambarkan bagaimana kejayaan orang lain boleh menimbulkan reaksi negatif jika tidak dikawal.",
        tema: "Kesan iri hati terhadap hubungan",
        nilai: "Kerjasama, Kerajinan",
        pengajaran: "Kita hendaklah gembira dengan kejayaan orang lain dan menjadikannya dorongan untuk berusaha lebih gigih.",
      },
      {
        rangkap: "Bahagian 3 — Serangan dan Fitnah",
        pantunMudah: "Munir melancarkan serangan — Razali dipukul, koperasi diceroboh, dan yang paling menyakitkan, Razali difitnah sebagai penjenayah.",
        maksud: "Fitnah adalah kejahatan yang paling menyakitkan kerana ia merosakkan nama baik seseorang. Razali yang tidak bersalah terpaksa menanggung bebanan yang bukan kesalahannya.",
        tema: "Ketabahan menghadapi fitnah",
        nilai: "Ketabahan, Kejujuran",
        pengajaran: "Kita hendaklah tabah menghadapi fitnah dan terus berpegang kepada kebenaran.",
      },
      {
        rangkap: "Bahagian 4 — Kebenaran Terungkap",
        pantunMudah: "Siasatan dijalankan. Munir akhirnya ditangkap. Pak Zakaria yang terburu-buru menyedari kesilapannya. Kebenaran tidak dapat disembunyikan selamanya.",
        maksud: "Bahagian ini mengajarkan bahawa kejahatan pasti akan terdedah. Pak Zakaria pula menjadi pengajaran tentang bahaya membuat keputusan tanpa usul periksa.",
        tema: "Keadilan dan kebenaran akhirnya menang",
        nilai: "Kejujuran, Ketabahan",
        pengajaran: "Kita hendaklah berhati-hati sebelum membuat tuduhan dan tidak tergesa-gesa dalam membuat kesimpulan.",
      },
      {
        rangkap: "Bahagian 5 — Peleraian dan Kegembiraan",
        pantunMudah: "Munir insaf dan mohon maaf. Koperasi menjadi johan. Razali bertemu Pak Ramli. Segala kesusahan terbayar dengan kegembiraan yang berlipat ganda.",
        maksud: "Peleraian yang sempurna — Munir berubah, koperasi berjaya, dan Razali mendapat hadiah paling bermakna iaitu menemui bapanya.",
        tema: "Kegigihan dan kebaikan mendapat ganjaran",
        nilai: "Kemaafan, Kerjasama, Ketabahan",
        pengajaran: "Kita hendaklah memaafkan orang yang telah bersalah kerana keikhlasan memaafkan membawa ketenangan dan kebahagiaan.",
      },
    ],

    masterCharacters: [
      {
        name: "Razali",
        role: "Watak utama dan protagonis. Razali ialah murid yang dilantik menjadi penolong setiausaha koperasi. Setiap peristiwa besar dalam novel berpusar di sekelilingnya.",
        traits: ["Rajin", "Amanah", "Tabah", "Bertanggungjawab", "Pemaaf"],
        evidence:
          "Razali menjalankan tugasnya di koperasi dengan penuh dedikasi walaupun menghadapi gangguan daripada Munir. Walaupun dipukul, difitnah, dan disiasat polis, Razali tidak berputus asa. Yang paling jelas, Razali memaafkan Munir walaupun Munir telah banyak menyakitinya — bukti terkuat sifat pemaafnya.",
        relationships:
          "Bersahabat baik dengan Ramlah. Dibimbing oleh Cikgu Zulkifli. Berhadapan konflik dengan Munir tetapi akhirnya memaafkan. Mempunyai hubungan emosi mendalam dengan Pak Ramli yang terungkap di akhir cerita.",
        importance:
          "Tanpa Razali tiada koperasi yang maju, tiada konflik yang bermakna, dan tiada pengajaran kemaafan. Razali melambangkan remaja yang menggunakan amanah dan kesabaran untuk mencapai kejayaan.",
      },
      {
        name: "Munir",
        role: "Watak antagonis yang akhirnya insaf. Munir mewakili bahaya sifat iri hati yang tidak dikawal.",
        traits: ["Iri hati", "Pendendam", "Tidak amanah", "Insaf akan kesilapan"],
        evidence:
          "Munir merancang dan melaksanakan gangguan terhadap koperasi, memukul Razali, dan mengetuai kecerobohan koperasi. Namun selepas ditangkap, Munir menyedari kesilapannya dan memohon maaf kepada Razali dengan ikhlas.",
        relationships:
          "Bermula sebagai musuh Razali akibat iri hati. Hubungan berubah selepas Munir insaf — dari permusuhan kepada penyesalan dan kemaafan.",
        importance:
          "Munir mengajarkan dua perkara penting: bahaya iri hati yang boleh merosakkan diri dan orang lain, serta bukti bahawa manusia boleh berubah menjadi lebih baik.",
      },
      {
        name: "Ramlah",
        role: "Watak sampingan dan rakan setia Razali. Ramlah mewakili persahabatan yang tulus dan sokongan moral.",
        traits: ["Rajin", "Setia kawan", "Prihatin"],
        evidence:
          "Ramlah sentiasa hadir menyokong Razali dalam pengurusan koperasi. Beliau prihatin terhadap tekanan yang dihadapi Razali dan tidak pernah meninggalkan sahabatnya ketika susah.",
        relationships:
          "Sahabat paling dipercayai Razali. Hubungan mereka menggambarkan nilai persahabatan sejati yang tidak goyah dek dugaan.",
        importance:
          "Ramlah membuktikan bahawa dalam setiap perjuangan, sokongan sahabat yang setia adalah kekuatan yang tidak ternilai.",
      },
      {
        name: "Cikgu Zulkifli",
        role: "Penasihat koperasi dan pembimbing Razali. Cikgu Zulkifli mewakili peranan guru yang berdedikasi.",
        traits: ["Bijak", "Bertanggungjawab", "Berdedikasi"],
        evidence:
          "Cikgu Zulkifli membimbing Razali dan murid-murid lain dalam pengurusan koperasi dengan sabar. Beliau tidak mudah berputus asa walaupun koperasi menghadapi pelbagai cabaran.",
        relationships:
          "Hubungan guru-murid yang positif dengan Razali. Cikgu Zulkifli adalah pendorong utama kejayaan koperasi.",
        importance:
          "Cikgu Zulkifli menggambarkan peranan guru yang melampaui bilik darjah — seorang pembimbing yang membantu murid berkembang.",
      },
      {
        name: "Pak Zakaria",
        role: "Watak dewasa yang menggambarkan bahaya tindakan tergesa-gesa.",
        traits: ["Tegas", "Cepat membuat kesimpulan"],
        evidence:
          "Pak Zakaria menghalau Razali tanpa memberi peluang kepada Razali menjelaskan dirinya, hanya berdasarkan maklumat yang belum disahkan kebenarannya.",
        relationships:
          "Hubungan yang tegang dengan Razali akibat salah faham. Tindakannya menambahkan tekanan kepada Razali.",
        importance:
          "Pak Zakaria mengajar bahawa orang dewasa pun boleh membuat kesilapan apabila bertindak tanpa usul periksa.",
      },
      {
        name: "Pak Ramli",
        role: "Watak yang membawa resolusi emosi kepada cerita — bapa kandung Razali.",
        traits: ["Penyayang", "Mengambil berat"],
        evidence:
          "Pak Ramli terbukti penyayang apabila pertemuan dengan Razali pada akhir cerita menggambarkan kasih sayang yang tulus seorang bapa.",
        relationships:
          "Bapa kandung Razali yang akhirnya ditemui pada penghujung cerita. Pertemuan ini menjadi ganjaran emosi kepada semua kesusahan yang dilalui Razali.",
        importance:
          "Pak Ramli memberikan dimensi peribadi kepada perjuangan Razali — di sebalik kesibukan koperasi, ada kerinduan seorang anak kepada bapanya.",
      },
    ],

    relationshipMap: [
      {
        from: "Razali",
        relation: "↔ Konflik & Kemaafan",
        to: "Munir",
        explanation:
          "Hubungan paling kompleks dalam novel. Munir berasa cemburu terhadap kejayaan Razali dan melancarkan pelbagai serangan. Namun Razali tidak membalas dengan dendam. Apabila Munir insaf, Razali memaafkannya — menjadikan hubungan ini teras pengajaran moral novel.",
      },
      {
        from: "Razali",
        relation: "↔ Persahabatan Tulus",
        to: "Ramlah",
        explanation:
          "Ramlah adalah sahabat setia yang menyokong Razali dalam setiap keadaan. Hubungan mereka menggambarkan nilai persahabatan sejati yang tidak goyah walaupun menghadapi tekanan.",
      },
      {
        from: "Razali",
        relation: "↔ Hubungan Guru-Murid",
        to: "Cikgu Zulkifli",
        explanation:
          "Cikgu Zulkifli membimbing Razali dengan dedikasi. Hubungan ini menggambarkan betapa pentingnya peranan guru dalam membentuk potensi murid.",
      },
      {
        from: "Razali",
        relation: "↔ Salah Faham",
        to: "Pak Zakaria",
        explanation:
          "Pak Zakaria tergesa-gesa menghalau Razali berdasarkan fitnah. Hubungan ini menggambarkan betapa bahayanya membuat kesimpulan tanpa usul periksa.",
      },
      {
        from: "Razali",
        relation: "↔ Ikatan Darah",
        to: "Pak Ramli",
        explanation:
          "Pak Ramli adalah bapa kandung Razali yang akhirnya ditemui. Hubungan ini menambahkan dimensi emosi yang mendalam kepada perjuangan Razali sepanjang cerita.",
      },
    ],

    detailedPlot: [
      {
        stage: "Permulaan",
        what: "Razali dilantik sebagai penolong setiausaha koperasi sekolah. Di bawah bimbingan Cikgu Zulkifli, beliau bersama Ramlah dan rakan-rakan mula bekerja keras untuk memajukan koperasi.",
        why: "Bahagian ini memperkenalkan watak utama dan latar cerita. Semangat Razali dan kepercayaan yang diberikan kepadanya meletakkan asas tema amanah dan tanggungjawab.",
        effect: "Pembaca memahami bahawa Razali adalah murid yang dipercayai dan bersemangat — menjadikan dugaan yang bakal dihadapinya lebih bermakna.",
      },
      {
        stage: "Perkembangan",
        what: "Koperasi semakin maju berkat usaha Razali dan rakan-rakan. Kejayaan ini mula menarik perhatian, namun turut mencetuskan perasaan cemburu dalam diri Munir.",
        why: "Kemajuan koperasi menjadi bukti kejayaan Razali, sementara reaksi Munir menggambarkan kesan negatif iri hati yang tidak dikawal.",
        effect: "Pembaca mula merasai ketegangan yang bakal berlaku apabila Munir mula merancang gangguan.",
      },
      {
        stage: "Konflik",
        what: "Munir dan rakan-rakannya melancarkan serangan — Razali dipukul, koperasi diceroboh, dan yang paling menyakitkan, Razali difitnah sebagai orang yang bertanggungjawab atas kecerobohan itu.",
        why: "Fitnah adalah titik konflik paling kritikal. Ia menguji ketabahan Razali pada tahap paling berat — apabila orang yang tidak bersalah dituduh melakukan jenayah.",
        effect: "Razali disiasat polis dan Pak Zakaria menghalau Razali — memuncakkan tekanan yang dihadapinya.",
      },
      {
        stage: "Klimaks",
        what: "Siasatan polis dijalankan. Munir akhirnya ditangkap. Kebenaran mula terungkap secara beransur-ansur. Pak Zakaria menyedari tindakannya yang tergesa-gesa.",
        why: "Ini adalah titik paling penting — keadilan mula berpihak kepada kebenaran. Tangkapan Munir membuktikan bahawa kejahatan tidak boleh bersembunyi selamanya.",
        effect: "Suasana berpaling daripada tekanan kepada harapan. Pembaca merasai kelegaan apabila kebenaran mula terserlah.",
      },
      {
        stage: "Peleraian",
        what: "Munir insaf dan memohon maaf. Razali memaafkan Munir. Koperasi memenangi kejohanan. Razali bertemu Pak Ramli — bapa kandungnya.",
        why: "Peleraian yang menyeluruh — kemaafan, kejayaan, dan pertemuan keluarga menjadikan akhir cerita sangat bermakna.",
        effect: "Novel berakhir dengan pengajaran menyeluruh — kegigihan, kerjasama, kemaafan, dan kepercayaan semuanya terbayar.",
      },
    ],

    importantEvents: [
      {
        event: "Razali dilantik ke koperasi",
        what: "Razali dipilih untuk memegang jawatan penolong setiausaha koperasi sekolah — satu kepercayaan besar yang diberikan kepada murid.",
        whyImportant: "Pelantikan ini menjadi titik permulaan keseluruhan cerita. Ia membuktikan bahawa Razali dipercayai kerana rajin dan amanah.",
        possibleQuestion: "Mengapakah Razali dipilih sebagai penolong setiausaha koperasi dan apakah yang ini menggambarkan tentang wataknya?",
      },
      {
        event: "Munir berasa cemburu",
        what: "Melihat kejayaan Razali dan kemajuan koperasi, Munir tidak dapat menahan perasaan cemburu dan mula merancang gangguan.",
        whyImportant: "Perasaan cemburu Munir menjadi punca utama seluruh konflik dalam novel. Ia menggambarkan kesan buruk iri hati yang tidak dikawal.",
        possibleQuestion: "Apakah yang mendorong Munir berasa cemburu dan bagaimana perasaan itu mempengaruhi jalan cerita?",
      },
      {
        event: "Razali dipukul",
        what: "Munir dan rakan-rakannya menyerang dan memukul Razali dalam satu insiden yang menggambarkan betapa jauhnya tindakan Munir dalam meluahkan iri hati.",
        whyImportant: "Serangan fizikal ini menunjukkan bahawa iri hati Munir telah melampaui batas. Ia mencerminkan nilai negatif yang perlu dielakkan.",
        possibleQuestion: "Apakah nilai yang tergambar melalui peristiwa Razali dipukul?",
      },
      {
        event: "Koperasi diceroboh",
        what: "Koperasi sekolah diceroboh dan barang-barangnya diambil — serangan langsung terhadap sesuatu yang Razali jaga dengan penuh amanah.",
        whyImportant: "Kecerobohan ini menggambarkan betapa serius akibat iri hati. Ia juga menguji ketabahan Razali dalam melindungi amanah yang diberikan kepadanya.",
        possibleQuestion: "Bagaimana kecerobohan koperasi menggambarkan tema dan nilai dalam novel?",
      },
      {
        event: "Razali difitnah",
        what: "Razali dituduh sebagai orang yang bertanggungjawab atas kecerobohan koperasi — fitnah yang paling berat kerana ia membalikkan keadaan seolah-olah Razali adalah penjenayah.",
        whyImportant: "Fitnah adalah ujian terberat kepada sifat tabah dan kejujuran Razali. Peristiwa ini menggambarkan betapa mudah seseorang yang tidak bersalah boleh dizalimi.",
        possibleQuestion: "Apakah pengajaran yang boleh diambil daripada peristiwa Razali difitnah?",
      },
      {
        event: "Razali dibawa untuk siasatan",
        what: "Akibat fitnah, Razali terpaksa berurusan dengan pihak berkuasa. Beliau disiasat walaupun tidak melakukan apa-apa kesalahan.",
        whyImportant: "Siasatan ini merupakan ujian tertinggi kepada ketabahan Razali. Namun dalam situasi ini, kejujuran Razali menjadi perisai terkuat.",
        possibleQuestion: "Bagaimana sikap Razali semasa disiasat menggambarkan nilai-nilai mulia dalam dirinya?",
      },
      {
        event: "Pak Zakaria menghalau Razali",
        what: "Pak Zakaria, tanpa mendengar penjelasan Razali terlebih dahulu, menghalau beliau berdasarkan maklumat yang belum disahkan.",
        whyImportant: "Tindakan Pak Zakaria mengajarkan bahawa orang dewasa pun boleh melakukan kesilapan apabila bertindak tergesa-gesa tanpa usul periksa.",
        possibleQuestion: "Apakah pengajaran yang boleh diambil daripada tindakan Pak Zakaria menghalau Razali?",
      },
      {
        event: "Munir ditangkap",
        what: "Siasatan polis akhirnya berjaya mendedahkan kebenaran. Munir ditangkap dan berhadapan dengan akibat tindakannya.",
        whyImportant: "Tangkapan Munir adalah titik peralihan cerita — keadilan mula berpihak kepada yang benar. Ia membuktikan bahawa kejahatan tidak boleh lari dari hukumannya.",
        possibleQuestion: "Apakah mesej yang disampaikan melalui peristiwa Munir ditangkap?",
      },
      {
        event: "Munir insaf dan memohon maaf",
        what: "Selepas ditangkap dan berhadapan dengan akibat tindakannya, Munir insaf dan memohon maaf kepada Razali dengan ikhlas.",
        whyImportant: "Keinsafan Munir adalah teras pengajaran moral novel. Ia membuktikan manusia boleh berubah, dan kemaafan Razali melengkapkan nilai mulia yang ingin disampaikan penulis.",
        possibleQuestion: "Mengapakah keinsafan Munir dan kemaafan Razali dianggap puncak pengajaran moral dalam novel ini?",
      },
      {
        event: "Koperasi menjadi johan",
        what: "Setelah semua dugaan dilalui, koperasi sekolah akhirnya berjaya memenangi kejohanan — ganjaran kepada kerjasama dan kegigihan.",
        whyImportant: "Kejayaan koperasi membuktikan tema utama novel — kegigihan dan kerjasama membuahkan hasil. Ia juga mengesahkan bahawa amanah yang dipegang Razali tidak sia-sia.",
        possibleQuestion: "Bagaimana kejayaan koperasi menjadi bukti kepada tema utama novel Sejambak Bakti?",
      },
      {
        event: "Razali bertemu Pak Ramli",
        what: "Pada penghujung cerita, Razali berpeluang bertemu dengan Pak Ramli — bapa kandungnya yang selama ini dicari.",
        whyImportant: "Pertemuan ini menambahkan dimensi peribadi yang mengharukan. Ia menggambarkan bahawa di sebalik semua perjuangan, ada ganjaran yang lebih bermakna daripada sekadar kejayaan koperasi.",
        possibleQuestion: "Apakah kepentingan pertemuan Razali dengan Pak Ramli pada akhir cerita?",
      },
    ],

    issues: [
      {
        issue: "Kesan iri hati",
        explanation:
          "Novel ini menggambarkan secara jelas bahawa iri hati yang tidak dikawal boleh mendorong seseorang melakukan perkara yang merugikan diri sendiri dan orang lain. Munir menjadi bukti nyata bagaimana iri hati boleh mengubah seseorang menjadi penjenayah.",
      },
      {
        issue: "Kepentingan amanah dalam tanggungjawab",
        explanation:
          "Razali menjalankan tugasnya di koperasi dengan penuh amanah walaupun menghadapi tekanan dari pelbagai penjuru. Novel ini menegaskan bahawa amanah adalah asas kepada sebarang tanggungjawab.",
      },
      {
        issue: "Semangat kerjasama mencapai matlamat",
        explanation:
          "Kejayaan koperasi bukan hasil usaha seorang sahaja. Razali, Ramlah, Cikgu Zulkifli, dan ahli-ahli lain bekerja bersama. Novel ini menunjukkan bahawa kerjasama adalah kunci kepada kejayaan bersama.",
      },
      {
        issue: "Kepentingan memaafkan",
        explanation:
          "Razali memaafkan Munir walaupun Munir telah banyak menyakitinya. Kemaafan Razali bukan tanda kelemahan — ia adalah tanda kebesaran hati yang mengubah hati Munir.",
      },
      {
        issue: "Ketabahan menghadapi dugaan",
        explanation:
          "Razali menghadapi pukulan, kecerobohan koperasi, fitnah, dan siasatan — namun tidak pernah berputus asa. Novel ini mengajar bahawa ketabahan adalah kualiti yang paling penting ketika diuji.",
      },
      {
        issue: "Peranan guru dalam membimbing murid",
        explanation:
          "Cikgu Zulkifli membuktikan bahawa guru yang berdedikasi bukan sahaja mengajar ilmu tetapi turut membentuk karakter murid. Bimbingannya adalah tulang belakang kejayaan koperasi.",
      },
    ],

    theme: {
      title: "Kegigihan murid dan guru memajukan koperasi sekolah",
      explanation:
        "Novel ini menunjukkan bahawa kejayaan koperasi sekolah bukan berlaku secara kebetulan. Ia adalah hasil kerjasama, kegigihan, dan amanah yang ditunjukkan oleh Razali, Ramlah, dan Cikgu Zulkifli — walaupun menghadapi pelbagai halangan dan dugaan.",
      whyItMatters:
        "Tema ini mengajar murid bahawa untuk mencapai sesuatu yang bermakna, diperlukan usaha berterusan, kerjasama, dan keberanian untuk terus maju walaupun ada halangan. Ini bukan hanya tentang koperasi — ini tentang kehidupan.",
    },

    values: [
      {
        value: "Amanah",
        explanation: "Razali menjalankan tugasnya di koperasi dengan penuh amanah walaupun menghadapi tekanan dan gangguan daripada Munir.",
        realLife: "Amanah bermakna melakukan tugas dengan jujur dan bertanggungjawab walaupun tiada yang memerhatikan.",
        schoolLife: "Menyiapkan tugasan yang diberikan guru dengan jujur tanpa meniru atau menipu.",
      },
      {
        value: "Kerajinan",
        explanation: "Razali, Ramlah, dan ahli koperasi lain bekerja keras dalam mengurus koperasi sekolah sehingga berjaya.",
        realLife: "Kerajinan bermakna berusaha dengan gigih tanpa menunggu orang lain mengarahkan.",
        schoolLife: "Menyiapkan kerja rumah dan berulang kaji tanpa perlu disuruh berulang kali.",
      },
      {
        value: "Kerjasama",
        explanation: "Kejayaan koperasi adalah hasil kerjasama Razali, Ramlah, Cikgu Zulkifli, dan semua ahli yang bekerja dengan penuh komitmen.",
        realLife: "Kerjasama bermakna menyumbang kepada matlamat bersama dan saling menyokong.",
        schoolLife: "Bekerjasama dalam projek kumpulan dengan membahagikan tugas secara adil.",
      },
      {
        value: "Ketabahan",
        explanation: "Razali menghadapi pukulan, fitnah, dan siasatan polis namun tidak pernah berputus asa atau menyerah kalah.",
        realLife: "Ketabahan bermakna terus berdiri walaupun berulang kali dijatuhkan.",
        schoolLife: "Terus belajar dan berlatih walaupun gagal dalam ujian pertama.",
      },
      {
        value: "Kejujuran",
        explanation: "Razali tetap jujur semasa disiasat walaupun keadaan sukar. Kejujurannya akhirnya membantu kebenaran terungkap.",
        realLife: "Kejujuran bermakna berkata benar walaupun kebenaran itu mungkin tidak menguntungkan diri sendiri.",
        schoolLife: "Mengakui dengan jujur apabila tidak faham pelajaran daripada berpura-pura faham.",
      },
      {
        value: "Kemaafan",
        explanation: "Razali memaafkan Munir walaupun Munir telah memukul, menceroboh koperasi, dan menfitnah beliau.",
        realLife: "Memaafkan bukan bermakna melupakan — ia bermakna membebaskan diri daripada beban kebencian.",
        schoolLife: "Memaafkan rakan yang pernah mengejek atau menyakiti hati dengan lapang dada.",
      },
    ],

    lessons: [
      {
        value: "Kita hendaklah bersikap amanah dalam melaksanakan tanggungjawab yang diberikan",
        explanation: "Razali membuktikan bahawa amanah adalah asas kepada sebarang tugasan. Kepercayaan yang diberi harus dijaga dengan sepenuh hati.",
        realLife: "Setiap tanggungjawab yang diberikan kepada kita — besar atau kecil — perlu dilaksanakan dengan penuh amanah.",
        schoolLife: "Jika dilantik sebagai ketua kelas, jalankan tugas dengan jujur dan tidak mengambil kesempatan.",
      },
      {
        value: "Kita hendaklah menjauhi sifat iri hati kerana ia membawa kemudaratan",
        explanation: "Munir membuktikan bahawa iri hati yang tidak dikawal boleh mendorong seseorang melakukan jenayah dan akhirnya merugikan diri sendiri.",
        realLife: "Gantikan perasaan iri hati dengan motivasi untuk berusaha lebih keras demi mencapai kejayaan sendiri.",
        schoolLife: "Jika rakan mendapat markah lebih tinggi, jadikan ia semangat untuk belajar lebih gigih.",
      },
      {
        value: "Kita hendaklah bekerjasama untuk mencapai matlamat bersama",
        explanation: "Koperasi tidak mungkin berjaya tanpa kerjasama semua pihak. Kejayaan bersama lebih bermakna daripada kejayaan bersendirian.",
        realLife: "Setiap usaha besar memerlukan kerjasama pelbagai pihak yang masing-masing menyumbang mengikut kebolehan.",
        schoolLife: "Dalam kerja berkumpulan, setiap ahli perlu menyumbang dengan jujur dan tidak bergantung kepada orang lain sahaja.",
      },
      {
        value: "Kita hendaklah tabah menghadapi fitnah dan tohmahan",
        explanation: "Razali tidak goyah walaupun difitnah dan disiasat. Ketabahan beliau akhirnya membuahkan keadilan.",
        realLife: "Apabila dipersalahkan untuk sesuatu yang bukan kesalahan kita, teruskan bersikap jujur dan percayakan kebenaran akan menang.",
        schoolLife: "Jika dituduh melakukan sesuatu yang tidak dilakukan, jelaskan dengan tenang dan jangan bertindak balas dengan marah.",
      },
      {
        value: "Kita hendaklah berhati-hati sebelum membuat tuduhan terhadap orang lain",
        explanation: "Pak Zakaria menghalau Razali tanpa usul periksa. Tindakan tergesa-gesa ini menambahkan kesusahan kepada orang yang tidak bersalah.",
        realLife: "Sebelum membuat tuduhan, pastikan maklumat yang ada adalah benar dan lengkap.",
        schoolLife: "Jangan menuduh rakan mencuri atau berbohong hanya berdasarkan sangkaan — dapatkan fakta terlebih dahulu.",
      },
      {
        value: "Kita hendaklah sentiasa bersedia memaafkan orang yang telah bersalah",
        explanation: "Razali memaafkan Munir walaupun Munir telah banyak menyakitinya. Kemaafan ini bukan sahaja membebaskan Razali daripada dendam, malah mengubah hati Munir.",
        realLife: "Memaafkan adalah tanda kekuatan jiwa, bukan kelemahan.",
        schoolLife: "Jika rakan memohon maaf dengan ikhlas, terimalah kemaafannya dengan hati yang terbuka.",
      },
    ],

    teacherExplains: [
      "Hai murid-murid! Ramai yang beranggapan bahawa novel Sejambak Bakti ini hanya tentang koperasi sekolah — tentang jual beli barang dan pengurusan wang. Memang betul ada unsur koperasi di dalamnya, tetapi itu bukan mesej utama yang ingin disampaikan penulis.",
      "Sebenarnya, novel ini mengajar empat perkara penting dalam kehidupan. Pertama — amanah. Razali menjaga tugasnya dengan penuh amanah walaupun menghadapi tekanan. Kedua — ketabahan. Beliau tidak berputus asa walaupun dipukul, difitnah, dan disiasat. Ketiga — kerjasama. Tanpa pasukan yang kukuh, koperasi tidak mungkin berjaya. Keempat — kemaafan. Inilah yang menjadikan Razali watak yang paling mulia dalam cerita ini.",
      "Bila menjawab soalan peperiksaan tentang novel ini, ingat: pemeriksa ingin tahu sama ada kamu faham MESEJ di sebalik cerita, bukan sekadar hafal nama watak. Belajarlah menghubungkan watak, peristiwa, dan nilai dengan tema utama — kegigihan murid dan guru memajukan koperasi sekolah.",
      "Ramai murid terlepas pandang tentang watak Munir. Mereka hanya nampak Munir sebagai 'penjahat'. Sebenarnya watak Munir mengandungi DUA pengajaran penting — pertama, bahaya iri hati yang tidak dikawal, dan kedua, bahawa manusia boleh berubah menjadi lebih baik apabila insaf. Kedua-dua pengajaran ini sangat bernilai untuk peperiksaan!",
    ],

    keyCharacterFocus: {
      name: "Razali",
      whyMatters:
        "Razali adalah nadi cerita. Setiap peristiwa penting berkisar kepada keputusan dan tindakannya — dari pelantikan hingga memaafkan Munir dan bertemu Pak Ramli.",
      supportsTheme:
        "Razali menjadi bukti tema kegigihan. Dari mengurus koperasi hingga bertahan menghadapi fitnah, setiap tindakannya menggambarkan murid yang menggunakan amanah dan kesabaran untuk mencapai kejayaan.",
      supportsIssues:
        "Razali menghidupkan semua persoalan utama — amanah melalui tugasnya di koperasi, ketabahan melalui ujian yang dihadapi, dan kemaafan melalui sikapnya terhadap Munir.",
      supportsValues:
        "Razali menonjolkan nilai amanah, kerajinan, kerjasama, ketabahan, kejujuran, dan kemaafan — setiap satu boleh dikaitkan langsung dengan tindakannya dalam cerita.",
      supportsLessons:
        "Setiap pengajaran dalam novel boleh dikaitkan dengan tindakan Razali — tentang amanah, ketabahan, kerjasama, dan kemaafan.",
    },

    authorPurpose:
      "Penulis menghasilkan novel ini untuk mendidik generasi muda bahawa kejayaan sebenar bukan sahaja diukur dari pencapaian akademik atau kewangan, tetapi dari nilai-nilai murni yang dipegang dalam menjalankan tanggungjawab. Melalui kisah koperasi sekolah, penulis ingin menunjukkan bahawa murid biasa boleh mencapai sesuatu yang luar biasa jika mereka bersikap amanah, gigih, dan sanggup bekerjasama.",

    memory60: {
      theme: "Kegigihan murid dan guru memajukan koperasi sekolah",
      issues: "Iri hati · Amanah · Kerjasama · Kemaafan · Ketabahan · Peranan guru",
      mainCharacters: "Razali (amanah, tabah, pemaaf) · Munir (iri hati→insaf) · Ramlah (setia kawan) · Cikgu Zulkifli (berdedikasi) · Pak Zakaria (cepat buat kesimpulan) · Pak Ramli (penyayang, bapa Razali)",
      importantEvents: "Razali dilantik → Munir cemburu → Razali dipukul → Koperasi diceroboh → Razali difitnah → Disiasat polis → Pak Zakaria halau Razali → Munir ditangkap → Munir insaf → Koperasi johan → Razali jumpa Pak Ramli",
      values: "Amanah · Kerajinan · Kerjasama · Ketabahan · Kejujuran · Kemaafan",
      lessons: "Bersikap amanah · Jauhi iri hati · Bekerjasama · Tabah hadapi fitnah · Berhati-hati sebelum menuduh · Sentiasa memaafkan",
    },

    uasaQuestions: [
      {
        type: "MCQ",
        question: "Apakah jawatan yang dipegang oleh Razali dalam koperasi sekolah?",
        answer: "Razali memegang jawatan penolong setiausaha koperasi sekolah.",
        explanation: "Pelantikan Razali sebagai penolong setiausaha adalah titik permulaan seluruh jalan cerita novel ini.",
      },
      {
        type: "MCQ",
        question: "Apakah perasaan Munir apabila melihat kejayaan Razali menguruskan koperasi?",
        answer: "Munir berasa cemburu dan iri hati terhadap kejayaan Razali.",
        explanation: "Iri hati Munir menjadi punca utama konflik dalam novel. Perasaan negatif ini mendorongnya melakukan pelbagai jenayah.",
      },
      {
        type: "MCQ",
        question: "Siapakah watak yang difitnah sebagai orang yang bertanggungjawab atas kecerobohan koperasi?",
        answer: "Razali difitnah sebagai orang yang bertanggungjawab atas kecerobohan koperasi.",
        explanation: "Fitnah terhadap Razali adalah konflik paling kritikal — ia menggambarkan betapa bahaya fitnah kepada orang yang tidak bersalah.",
      },
      {
        type: "MCQ",
        question: "Apakah pencapaian koperasi sekolah pada akhir novel?",
        answer: "Koperasi sekolah berjaya memenangi kejohanan.",
        explanation: "Kejayaan koperasi membuktikan tema utama — kegigihan dan kerjasama membuahkan hasil yang membanggakan.",
      },
      {
        type: "MCQ",
        question: "Siapakah Pak Ramli dalam novel Sejambak Bakti?",
        answer: "Pak Ramli adalah bapa kandung Razali yang akhirnya ditemui pada penghujung cerita.",
        explanation: "Pertemuan Razali dengan Pak Ramli menambahkan dimensi emosi yang mengharukan kepada peleraian cerita.",
      },
      {
        type: "Struktur",
        question: "Jelaskan dua perwatakan Razali beserta bukti daripada novel.",
        answer: "Pertama, Razali bersifat amanah kerana beliau menjalankan tugasnya sebagai penolong setiausaha koperasi dengan penuh tanggungjawab walaupun menghadapi gangguan dan tekanan daripada Munir. Kedua, Razali bersifat pemaaf kerana walaupun Munir telah memukul, menceroboh koperasi, dan menfitnah beliau, Razali tetap memaafkan Munir apabila Munir memohon maaf dengan ikhlas.",
        explanation: "Soalan perwatakan memerlukan: nama sifat + penjelasan + bukti daripada cerita. Tiga elemen ini penting untuk markah penuh.",
      },
      {
        type: "Struktur",
        question: "Huraikan dua nilai yang terdapat dalam novel Sejambak Bakti beserta contoh daripada cerita.",
        answer: "Pertama, nilai kerjasama. Razali, Ramlah, Cikgu Zulkifli, dan ahli-ahli koperasi bekerjasama dengan bersungguh-sungguh untuk memajukan koperasi sekolah sehingga berjaya memenangi kejohanan. Kedua, nilai ketabahan. Razali tidak berputus asa walaupun menghadapi pukulan, kecerobohan koperasi, fitnah, dan siasatan polis — beliau terus berjuang sehingga kebenaran terungkap.",
        explanation: "Format: nama nilai + penjelasan + contoh konkrit daripada cerita. Elak jawapan umum yang tidak berkaitan dengan cerita.",
      },
      {
        type: "Struktur",
        question: "Apakah tema utama novel Sejambak Bakti? Jelaskan bagaimana tema ini digambarkan dalam cerita.",
        answer: "Tema utama novel ini ialah kegigihan murid dan guru memajukan koperasi sekolah. Tema ini digambarkan melalui usaha gigih Razali, Ramlah, dan Cikgu Zulkifli yang tidak berputus asa mengurus koperasi walaupun menghadapi gangguan daripada Munir. Walaupun koperasi diceroboh dan Razali difitnah, mereka terus berjuang. Akhirnya koperasi berjaya memenangi kejohanan — bukti kukuh kepada kegigihan mereka.",
        explanation: "Nyatakan tema dengan tepat kemudian tunjukkan bagaimana ia digambarkan melalui watak dan peristiwa.",
      },
      {
        type: "Struktur",
        question: "Nyatakan dua pengajaran daripada novel Sejambak Bakti dan hubungkannya dengan peristiwa dalam cerita.",
        answer: "Pertama, kita hendaklah bersikap amanah dalam melaksanakan tanggungjawab. Razali membuktikan ini dengan menjalankan tugasnya di koperasi dengan penuh dedikasi walaupun menghadapi gangguan dan tekanan berterusan. Kedua, kita hendaklah menjauhi sifat iri hati kerana ia membawa kemudaratan. Munir yang dikuasai iri hati akhirnya ditangkap dan menanggung akibat buruk tindakannya sendiri.",
        explanation: "Format: 'Kita hendaklah...' + penjelasan + bukti daripada peristiwa dalam cerita.",
      },
      {
        type: "Struktur",
        question: "Jelaskan kepentingan watak Cikgu Zulkifli dalam novel Sejambak Bakti.",
        answer: "Cikgu Zulkifli penting dalam novel ini kerana beliau berperanan sebagai pembimbing yang menyokong Razali dan murid-murid lain dalam menguruskan koperasi. Bimbingan dan dedikasi Cikgu Zulkifli menjadi tulang belakang kejayaan koperasi. Beliau juga menggambarkan persoalan peranan guru dalam membimbing murid — guru yang baik bukan sahaja mengajar ilmu tetapi turut membentuk karakter dan potensi murid.",
        explanation: "Soalan 'kepentingan watak' memerlukan penjelasan tentang fungsi watak dalam jalan cerita dan mesej yang dibawa.",
      },
      {
        type: "KBAT",
        question: "Pada pendapat kamu, apakah pelajaran paling berharga yang boleh diambil daripada watak Munir dalam novel ini? Berikan alasan.",
        answer: "Pelajaran paling berharga daripada watak Munir ialah bahawa manusia boleh berubah menjadi lebih baik jika diberi peluang dan keinsafan yang tulus. Munir yang pada mulanya dikuasai iri hati dan melakukan pelbagai jenayah, akhirnya insaf selepas ditangkap. Keinsafannya mengajarkan bahawa tidak ada manusia yang terlalu jahat untuk berubah. Selain itu, Munir juga mengajarkan bahawa iri hati yang tidak dikawal akan membawa padah kepada diri sendiri — menjadikan watak Munir pengajaran yang paling kaya dalam keseluruhan novel.",
        explanation: "Soalan KBAT memerlukan pendapat yang disokong dengan hujah dan bukti daripada cerita. Tunjukkan pemikiran kritis.",
      },
      {
        type: "KBAT",
        question: "Mengapakah tindakan Pak Zakaria menghalau Razali boleh dianggap sebagai kesalahan yang serius? Huraikan.",
        answer: "Tindakan Pak Zakaria menghalau Razali adalah serius kerana beliau bertindak tanpa usul periksa — menghalau Razali berdasarkan maklumat yang belum disahkan kebenarannya. Tindakan ini menambahkan bebanan kepada Razali yang sebenarnya tidak bersalah. Ia menggambarkan bahawa keputusan tergesa-gesa tanpa pemikiran yang matang boleh mendatangkan kezaliman kepada orang lain. Pak Zakaria seharusnya mendengar penjelasan Razali terlebih dahulu sebelum mengambil sebarang tindakan.",
        explanation: "Jawapan KBAT menilai tindakan dan akibatnya. Hubungkan dengan nilai berhati-hati sebelum membuat tuduhan.",
      },
      {
        type: "KBAT",
        question: "Sejauh manakah kejayaan koperasi merupakan kejayaan peribadi Razali? Bincangkan.",
        answer: "Kejayaan koperasi adalah kejayaan peribadi Razali dalam banyak aspek. Pertama, Razali telah membuktikan bahawa amanah yang diberikan kepadanya tidak sia-sia — koperasi berjaya walaupun menghadapi pelbagai halangan. Kedua, kejayaan itu membuktikan bahawa ketabahan dan kegigihan Razali dalam menghadapi fitnah dan gangguan adalah benar. Namun kejayaan ini juga bukan semata-mata milik Razali — ia adalah hasil kerjasama Ramlah, Cikgu Zulkifli, dan semua ahli. Jadi kejayaan koperasi ialah kejayaan bersama yang dimungkinkan oleh kepimpinan amanah Razali.",
        explanation: "Soalan 'sejauh mana' memerlukan jawapan yang melihat dari dua sudut — sokong dan pertimbangkan batasannya.",
      },
    ],

    examBooster: {
      frequentPoints: [
        "🔥 Sangat Penting — Tema: Kegigihan murid dan guru memajukan koperasi sekolah",
        "🔥 Sangat Penting — Perwatakan Razali lengkap dengan bukti: amanah, tabah, rajin, bertanggungjawab, pemaaf",
        "🔥 Sangat Penting — Peristiwa Razali difitnah dan memaafkan Munir sebagai puncak pengajaran moral",
        "⭐ Penting — Perwatakan Munir: dari iri hati & pendendam berubah kepada insaf & memohon maaf",
        "⭐ Penting — Nilai amanah, kerjasama, ketabahan, dan kemaafan beserta contoh dari cerita",
        "⭐ Penting — Peranan Cikgu Zulkifli sebagai pembimbing yang mendorong kejayaan koperasi",
        "⭐ Penting — Pengajaran dalam format 'Kita hendaklah...' beserta bukti peristiwa",
        "📌 Perlu Tahu — Perwatakan Ramlah: setia kawan, rajin, prihatin",
        "📌 Perlu Tahu — Perwatakan Pak Zakaria: tegas, cepat membuat kesimpulan (negatif)",
        "📌 Perlu Tahu — Pak Ramli adalah bapa kandung Razali",
        "📌 Perlu Tahu — Zon novel: Selatan (Johor, Melaka, Negeri Sembilan)",
      ],
      commonQuestions: [
        {
          question: "Jelaskan perwatakan watak utama beserta bukti.",
          answerHint:
            "Razali: Amanah (urus koperasi dengan dedikasi) · Tabah (tidak berputus asa walaupun dipukul dan difitnah) · Rajin (bekerja keras memajukan koperasi) · Pemaaf (maafkan Munir)",
          modelAnswer:
            "Watak utama ialah Razali. Pertama, Razali bersifat amanah kerana menjalankan tugasnya sebagai penolong setiausaha koperasi dengan penuh tanggungjawab walaupun menghadapi gangguan. Kedua, Razali bersifat tabah kerana tidak berputus asa walaupun dipukul, koperasi diceroboh, dan beliau difitnah. Ketiga, Razali bersifat pemaaf kerana memaafkan Munir walaupun Munir telah banyak menyakitinya.",
          examTip: "Sertakan minimum tiga sifat dengan bukti. Soalan perwatakan membawa markah yang tinggi.",
        },
        {
          question: "Apakah tema novel dan bagaimana ia dikemukakan dalam cerita?",
          answerHint:
            "Tema: Kegigihan murid dan guru memajukan koperasi sekolah. Bukti: Razali + Cikgu Zulkifli + Ramlah bekerja keras + hadapi halangan + koperasi johan.",
          modelAnswer:
            "Tema utama ialah kegigihan murid dan guru memajukan koperasi sekolah. Tema ini dikemukakan melalui usaha gigih Razali, Ramlah, dan Cikgu Zulkifli yang tidak berputus asa walaupun menghadapi gangguan daripada Munir. Walaupun koperasi diceroboh dan Razali difitnah, mereka terus berjuang. Akhirnya koperasi berjaya memenangi kejohanan — bukti kukuh kepada kegigihan mereka.",
          examTip: "Nyatakan tema dengan jelas kemudian tunjukkan sekurang-kurangnya dua peristiwa yang membuktikan tema tersebut.",
        },
      ],
    },

    revision: {
      theme: "Kegigihan murid dan guru memajukan koperasi sekolah",
      values: "Amanah · Kerajinan · Kerjasama · Ketabahan · Kejujuran · Kemaafan",
      lessons: "Bersikap amanah · Jauhi iri hati · Bekerjasama · Tabah hadapi fitnah · Berhati-hati sebelum menuduh · Sentiasa memaafkan",
      examTips: "Fokus: Perwatakan Razali (5 sifat + bukti) · Tema · Peristiwa fitnah & kemaafan · Nilai · Pengajaran 'Kita hendaklah...'",
    },

    miniQuiz: [
      {
        question: "Apakah jawatan Razali dalam koperasi?",
        answerHint: "Penolong setiausaha koperasi sekolah.",
        modelAnswer: "Penolong setiausaha koperasi sekolah",
        explanation: "Pelantikan Razali sebagai penolong setiausaha adalah titik permulaan cerita.",
        examTip: "Ingat: Razali = penolong setiausaha, bukan setiausaha penuh.",
      },
      {
        question: "Mengapakah Razali memaafkan Munir?",
        answerHint: "Razali bersifat pemaaf dan memilih kebaikan berbanding dendam apabila Munir insaf dan mohon maaf.",
        modelAnswer: "Razali memaafkan Munir kerana beliau memiliki sifat pemaaf yang tinggi. Apabila Munir insaf dan memohon maaf dengan ikhlas, Razali menerima kemaafan itu dengan hati yang terbuka.",
        explanation: "Peristiwa kemaafan ini adalah teras pengajaran moral novel.",
        examTip: "Hubungkan dengan nilai kemaafan dan pengajaran 'Kita hendaklah sentiasa bersedia memaafkan'.",
      },
      {
        question: "Siapakah Pak Ramli dan apakah kepentingannya dalam cerita?",
        answerHint: "Pak Ramli adalah bapa kandung Razali yang ditemui pada akhir cerita.",
        modelAnswer: "Pak Ramli adalah bapa kandung Razali. Pertemuan Razali dengan Pak Ramli pada penghujung cerita menambahkan dimensi emosi yang mengharukan dan menjadikan ganjaran Razali lebih bermakna.",
        explanation: "Pertemuan ini melengkapkan peleraian cerita dengan dimensi peribadi.",
        examTip: "Pak Ramli ≠ Pak Zakaria. Pak Zakaria adalah yang menghalau Razali; Pak Ramli adalah bapa Razali.",
      },
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
