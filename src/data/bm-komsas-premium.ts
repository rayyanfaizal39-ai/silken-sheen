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
    studyTime: "11 minit",
    difficulty: "Mudah",
    examFocus: "Keikhlasan + Nilai",
    intro: "Cerpen ini mengajar bahawa hadiah paling bermakna bukan semestinya mahal. Nilai sebenar datang daripada niat dan keikhlasan.",
    story60: "Watak dalam cerpen mahu memberi atau menerima hadiah. Konflik berlaku apabila nilai hadiah dilihat daripada harga atau rupa luaran. Akhirnya, pembaca sedar bahawa hadiah yang ikhlas lebih berharga daripada hadiah mahal tanpa makna.",
    decoder: poemDecoder([
      ["Bahasa mudah", "Hadiah dalam cerita ialah tanda ingatan dan kasih sayang, bukan ukuran kekayaan.", "Keikhlasan.", "Kita hendaklah memberi dengan niat baik."],
      ["Mesej utama", "Jangan menghina pemberian orang kerana usaha dan niat lebih penting.", "Menghargai.", "Kita perlu menghargai pemberian walaupun sederhana."],
    ]),
    timeline: [
      { stage: "Permulaan", text: "Watak ingin memberi sesuatu yang bermakna." },
      { stage: "Perkembangan", text: "Kekangan atau perasaan bimbang mula muncul." },
      { stage: "Konflik", text: "Nilai hadiah dipersoalkan atau disalah faham." },
      { stage: "Klimaks", text: "Niat sebenar di sebalik hadiah terserlah." },
      { stage: "Peleraian", text: "Hadiah difahami sebagai lambang keikhlasan." },
    ],
    characters: [
      { name: "Pemberi hadiah", personality: "Ikhlas, berusaha dan sensitif.", evidence: "Tetap mahu memberi mengikut kemampuan.", importance: "Menunjukkan nilai sebenar pemberian." },
      { name: "Penerima hadiah", personality: "Belajar menghargai dan memahami.", evidence: "Reaksi terhadap hadiah membina konflik.", importance: "Menunjukkan pentingnya menghargai niat." },
      { name: "Keluarga/Rakan", personality: "Memberi tekanan atau sokongan.", evidence: "Keadaan sekeliling mempengaruhi tindakan watak.", importance: "Menjadikan cerita dekat dengan kehidupan murid." },
    ],
    events: [
      { event: "Hadiah sederhana diberikan", whatHappened: "Hadiah mungkin tidak mahal tetapi diberi dengan hati baik.", whyItMatters: "Menonjolkan tema keikhlasan.", examFocus: "Soalan tema dan nilai." },
      { event: "Niat hadiah difahami", whatHappened: "Watak menyedari maksud sebenar pemberian.", whyItMatters: "Menyelesaikan konflik.", examFocus: "Soalan pengajaran menghargai pemberian." },
    ],
    theme: { title: "Keikhlasan dalam memberi", explanation: "Tema cerpen ialah nilai keikhlasan dan penghargaan dalam hubungan manusia.", whyItMatters: "Remaja sering membandingkan barang dan hadiah. Cerpen ini mengajar supaya melihat niat." },
    values: [
      { value: "Keikhlasan", explanation: "Melakukan sesuatu tanpa mengharapkan balasan.", realLife: "Membantu orang kerana mahu membantu.", schoolLife: "Menolong rakan faham topik tanpa minta upah." },
      { value: "Menghargai", explanation: "Melihat usaha di sebalik pemberian.", realLife: "Ucap terima kasih walaupun hadiah kecil.", schoolLife: "Hargai kad ucapan rakan." },
      { value: "Rendah hati", explanation: "Tidak menunjuk-nunjuk kemampuan.", realLife: "Tidak membandingkan barang mahal.", schoolLife: "Tidak mengejek rakan yang kurang mampu." },
    ],
    lessons: [
      { value: "Nilai niat, bukan harga", explanation: "Harga tidak menentukan kasih sayang.", realLife: "Terima pemberian dengan hati terbuka.", schoolLife: "Hargai hadiah hari lahir daripada rakan." },
      { value: "Jangan merendahkan pemberian", explanation: "Kata-kata kita boleh menyakiti pemberi.", realLife: "Elakkan komen menghina.", schoolLife: "Terima cenderamata kelas dengan sopan." },
      { value: "Beri dengan ikhlas", explanation: "Keikhlasan menjadikan pemberian bermakna.", realLife: "Beri bantuan tanpa menunjuk.", schoolLife: "Bantu rakan tanpa mengungkit." },
    ],
    teacherExplains: ["Bayangkan anda beri hadiah kecil kepada kawan, tetapi dia ketawa. Sakit, kan? Cerpen ini mahu kita faham perasaan itu.", "Hadiah ialah objek. Mesej sebenar ialah keikhlasan.", "Jika soalan tanya tema, jangan jawab 'hadiah'. Jawab nilai di sebalik hadiah."],
    examBooster: {
      frequentPoints: ["Popular theme: keikhlasan.", "Popular values: ikhlas, menghargai, rendah hati.", "Common focus: maksud sebenar hadiah.", "Soalan lazim minta perbezaan nilai material dan nilai hati."],
      commonQuestions: [
        q("Apakah tema cerpen Hadiah?", "Tema cerpen ialah keikhlasan dalam memberi dan menghargai pemberian.", "Tema perlu menyentuh nilai, bukan objek.", "Jangan tulis 'tema hadiah'."),
        q("Nyatakan nilai yang terdapat dalam cerpen.", "Nilai keikhlasan kerana pemberian dibuat dengan niat baik.", "Nilai perlu ada sebab.", "Gunakan contoh pemberian."),
        q("Apakah pengajaran kepada murid?", "Kita hendaklah menghargai pemberian orang walaupun sederhana.", "Pengajaran praktikal dan dekat dengan murid.", "Sebut 'walaupun sederhana'."),
      ],
    },
    revision: { theme: "Keikhlasan dalam memberi.", values: "Ikhlas, menghargai, rendah hati.", lessons: "Nilai niat, hargai pemberian, jangan menghina.", examTips: "Hadiah ialah simbol niat." },
    miniQuiz: quiz("Apakah nilai utama cerpen Hadiah?", "Hadiah sederhana dengan keikhlasan.", "Mengapakah hadiah murah masih boleh menjadi bermakna?"),
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

export function getPremiumKomsasWork(id: string) {
  return KOMSAS_PREMIUM_WORKS[id];
}
