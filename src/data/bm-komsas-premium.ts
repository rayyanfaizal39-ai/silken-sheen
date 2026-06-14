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
}

export interface KomsasExamQuestion {
  question: string;
  answerHint: string;
}

export interface KomsasWork {
  id: string;
  title: string;
  typeLabel: string;
  studyTime: string;
  difficulty: "Mudah" | "Sederhana";
  intro: string;
  decoder: KomsasDecoderRangkap[];
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

export const KOMSAS_PREMIUM_WORKS: Record<string, KomsasWork> = {
  "pantun-dua-kerat": {
    id: "pantun-dua-kerat",
    title: "Pantun Dua Kerat (Nasihat)",
    typeLabel: "Puisi Tradisional",
    studyTime: "8 minit",
    difficulty: "Mudah",
    intro:
      "Jangan risau. Pantun ini pendek, tetapi mesejnya besar. Dalam beberapa minit, anda akan faham nasihat yang hendak disampaikan tanpa perlu menghafal seperti nota textbook.",
    decoder: [
      {
        rangkap: "Rangkap 1",
        pantunMudah:
          "Pantun menegur kita supaya menjaga sikap. Perbuatan kecil pun boleh menunjukkan siapa diri kita.",
        maksud:
          "Murid perlu faham bahawa nasihat dalam pantun bukan sekadar kata-kata indah. Pantun ini mengingatkan kita supaya berkelakuan baik, bercakap sopan dan tidak bertindak terburu-buru.",
        tema: "Nasihat untuk membentuk akhlak yang baik.",
        nilai: "Berhemah.",
        pengajaran: "Kita hendaklah menjaga tingkah laku supaya disenangi orang.",
      },
      {
        rangkap: "Rangkap 2",
        pantunMudah:
          "Pantun mengingatkan bahawa kejayaan memerlukan usaha. Kalau mahu berjaya, kita tidak boleh malas atau mudah berputus asa.",
        maksud:
          "Nasihat ini dekat dengan kehidupan murid. Markah baik, kemahiran baharu dan perubahan sikap tidak berlaku secara tiba-tiba. Semuanya perlukan latihan dan kesungguhan.",
        tema: "Usaha dan kegigihan dalam kehidupan.",
        nilai: "Ketekunan.",
        pengajaran: "Kita perlu rajin berusaha walaupun cabaran nampak kecil.",
      },
      {
        rangkap: "Rangkap 3",
        pantunMudah:
          "Pantun menasihati kita supaya menggunakan akal sebelum bercakap atau bertindak.",
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
      {
        value: "Berhemah",
        explanation: "Berhemah bermaksud menjaga adab, tutur kata dan perlakuan.",
        realLife: "Contohnya, bercakap sopan dengan guru dan tidak mengejek rakan di dalam kumpulan WhatsApp kelas.",
      },
      {
        value: "Ketekunan",
        explanation: "Ketekunan bermaksud terus berusaha walaupun sesuatu perkara mengambil masa.",
        realLife: "Contohnya, membuat ulang kaji 15 minit sehari lebih baik daripada hanya belajar pada malam sebelum ujian.",
      },
      {
        value: "Bijaksana",
        explanation: "Bijaksana bermaksud menggunakan akal sebelum bertindak.",
        realLife: "Contohnya, bertanya dahulu sebelum menuduh rakan mengambil barang atau menyebarkan cerita yang belum pasti.",
      },
    ],
    lessons: [
      {
        value: "Dengar nasihat dengan hati terbuka",
        explanation: "Nasihat bukan untuk memalukan kita, tetapi untuk membantu kita menjadi lebih baik.",
        realLife: "Apabila ibu bapa menegur cara belajar, cuba ambil isi teguran itu dan baiki jadual harian.",
      },
      {
        value: "Usaha kecil membawa perubahan besar",
        explanation: "Pantun mengingatkan bahawa kejayaan bermula daripada tindakan yang konsisten.",
        realLife: "Siapkan kerja sekolah awal, ulang kaji sedikit-sedikit dan tanya guru apabila tidak faham.",
      },
      {
        value: "Fikir sebelum bertindak",
        explanation: "Tindakan tergesa-gesa boleh menyebabkan penyesalan.",
        realLife: "Sebelum membalas komen yang menyakitkan hati, tarik nafas dan fikir kesannya kepada diri sendiri.",
      },
    ],
    teacherExplains: [
      "Murid selalu rasa pantun dua kerat ini terlalu pendek, jadi mereka cuba hafal sahaja. Sebenarnya, cara paling mudah ialah tanya: pantun ini sedang menasihati saya tentang apa?",
      "Jangan terlalu fokus pada pembayang sampai terlupa maksud. Dalam pantun, bahagian maksud biasanya membawa mesej utama yang akan diuji dalam soalan.",
      "Kalau soalan tanya nilai, jawab satu nilai seperti berhemah. Kalau soalan tanya pengajaran, tukar nilai itu menjadi ayat tindakan: kita hendaklah berhemah dalam percakapan dan perbuatan.",
    ],
    examBooster: {
      frequentPoints: [
        "Tema utama: nasihat untuk membentuk akhlak dan peribadi baik.",
        "Nilai popular: berhemah, tekun, bijaksana.",
        "Pengajaran popular: berfikir sebelum bertindak dan rajin berusaha.",
        "Pantun dua kerat biasanya diuji melalui maksud rangkap, nilai dan pengajaran.",
      ],
      commonQuestions: [
        {
          question: "Apakah tema Pantun Dua Kerat (Nasihat)?",
          answerHint: "Nasihat untuk membentuk akhlak, sikap dan peribadi yang baik.",
        },
        {
          question: "Nyatakan satu nilai yang terdapat dalam pantun ini.",
          answerHint: "Berhemah, ketekunan atau bijaksana. Pilih satu dan beri contoh mudah.",
        },
        {
          question: "Apakah pengajaran yang boleh diamalkan oleh murid?",
          answerHint: "Murid hendaklah mendengar nasihat, rajin berusaha dan berfikir sebelum bertindak.",
        },
      ],
    },
    revision: {
      theme: "Nasihat membentuk peribadi mulia.",
      values: "Berhemah, ketekunan, bijaksana.",
      lessons: "Dengar nasihat, rajin berusaha, fikir sebelum bertindak.",
      examTips: "Untuk jawapan pengajaran, mulakan dengan 'Kita hendaklah...' dan sambung dengan tindakan yang jelas.",
    },
    miniQuiz: [
      {
        question: "MCQ: Apakah fokus utama pantun ini?",
        answerHint: "Jawapan placeholder: nasihat kehidupan dan akhlak.",
      },
      {
        question: "Matching: Padankan nilai 'ketekunan' dengan contoh yang sesuai.",
        answerHint: "Jawapan placeholder: murid terus berusaha walaupun sukar.",
      },
      {
        question: "KBAT: Bagaimanakah pantun ini boleh membantu murid menggunakan media sosial dengan lebih baik?",
        answerHint: "Jawapan placeholder: fikir dahulu sebelum menulis komen atau berkongsi maklumat.",
      },
    ],
  },
};

export function getPremiumKomsasWork(id: string) {
  return KOMSAS_PREMIUM_WORKS[id];
}
