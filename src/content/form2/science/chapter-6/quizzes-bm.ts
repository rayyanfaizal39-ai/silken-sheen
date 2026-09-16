import type { QuizQuestion } from "@/data/content";

/**
 * Sains Tingkatan 2, Bab 6 (Asid dan Alkali) — bank kuiz, BM.
 *
 * 30 soalan, bersumberkan buku teks sahaja. ID dikekalkan daripada bank 34
 * item yang terdahulu setiap kali slot berkenaan masih kekal — termasuk
 * beberapa slot yang KANDUNGANNYA ditulis semula (lihat laporan remediasi
 * bank kuiz Bab 6 untuk pemetaan lama -> baharu yang lengkap).
 * sci-f2-c6-bm-q1, q2, q4, q8 dan q18 dipadamkan terus (asal usul perkataan
 * x2, soalan rasa berulang, soalan skala pH berulang, dan soalan pengecaman
 * garam berulang). sci-f2-c6-bm-q35 ialah satu-satunya id baharu.
 */
export const scienceF2C6QuizzesBM: QuizQuestion[] = [
  {
    id: "sci-f2-c6-bm-q3",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Skala pH mempunyai julat antara 0 hingga 14. Sebuah larutan didapati mempunyai pH 7. Apakah yang ini tunjukkan tentang larutan itu?",
    options: [
      "Ia adalah asid kuat",
      "Ia adalah neutral, bukan asid mahupun alkali",
      "Ia adalah alkali kuat",
      "Nilai pHnya tidak boleh berada pada skala itu",
    ],
    answerIndex: 1,
    explanation:
      "Skala pH mempunyai julat antara 0 hingga 14. Nilai pH 7 menunjukkan bahawa larutan itu neutral, bukan asid mahupun alkali.",
  },
  {
    id: "sci-f2-c6-bm-q5",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah warna kertas litmus biru selepas ditambah asid?",
    options: [
      "Kekal biru",
      "Bertukar kepada merah",
      "Bertukar kepada hijau",
      "Bertukar kepada kuning",
    ],
    answerIndex: 1,
    explanation: "Asid menukar warna kertas litmus biru kepada merah.",
  },
  {
    id: "sci-f2-c6-bm-q6",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah warna kertas litmus merah selepas ditambah alkali?",
    options: [
      "Kekal merah",
      "Bertukar kepada biru",
      "Bertukar kepada kuning",
      "Bertukar kepada tidak berwarna",
    ],
    answerIndex: 1,
    explanation: "Alkali menukar warna kertas litmus merah kepada biru.",
  },
  {
    id: "sci-f2-c6-bm-q7",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Perbandingan manakah yang betul antara sifat asid dan alkali?",
    options: [
      "Asid berasa pahit dan alkali berasa masam",
      "Asid berasa masam dan alkali berasa pahit; kedua-duanya boleh bersifat kakisan",
      "Asid bersifat kakisan tetapi alkali tidak bersifat kakisan",
      "Alkali berasa masam dan tidak bersifat kakisan",
    ],
    answerIndex: 1,
    explanation:
      "Asid berasa masam manakala alkali berasa pahit. Kedua-dua asid dan alkali boleh bersifat kakisan, jadi kedua-duanya tidak boleh dirasa atau disentuh secara terus.",
  },
  {
    id: "sci-f2-c6-bm-q9",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah maksud penunjuk (indikator)?",
    options: [
      "Bahan yang mengukur suhu sesuatu larutan",
      "Bahan pewarna atau campuran pewarna yang menukar warna berdasarkan bahan yang diuji",
      "Bahan yang menambah kekakisan asid",
      "Alat untuk mengukur isipadu cecair",
    ],
    answerIndex: 1,
    explanation:
      "Penunjuk ialah bahan pewarna atau campuran pewarna berbeza yang menukar warna berdasarkan bahan yang diuji, untuk menentukan sama ada bahan itu neutral, berasid atau beralkali.",
  },
  {
    id: "sci-f2-c6-bm-q10",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah hasil tindak balas antara asid dengan alkali?",
    options: ["Gas dan air", "Garam dan air", "Logam dan air", "Garam dan gas"],
    answerIndex: 1,
    explanation: "Persamaan perkataan bagi peneutralan ialah Asid + Alkali → Garam + Air.",
  },
  {
    id: "sci-f2-c6-bm-q11",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Mengapakah asid glasial etanoik (tanpa air) tidak menukar warna kertas litmus biru?",
    options: [
      "Kerana ia bukan asid sebenar",
      "Kerana asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air",
      "Kerana kertas litmus biru telah rosak",
      "Kerana ia terlalu cair",
    ],
    answerIndex: 1,
    explanation:
      "Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air; tanpa air, asid glasial etanoik tidak menukar warna kertas litmus biru.",
  },
  {
    id: "sci-f2-c6-bm-q12",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Beberapa titik fenolftalein ditambah ke dalam larutan X, dan ia kekal tidak berwarna. Seorang pelajar membuat kesimpulan bahawa larutan X pasti berasid. Adakah kesimpulan ini betul?",
    options: [
      "Ya, kerana fenolftalein hanya tidak berwarna dalam asid",
      "Tidak, kerana fenolftalein juga tidak berwarna dalam larutan neutral, jadi satu lagi ujian diperlukan",
      "Ya, kerana fenolftalein sentiasa bertukar merah jambu dalam asid",
      "Tidak, kerana fenolftalein tidak boleh digunakan dengan asid",
    ],
    answerIndex: 1,
    explanation:
      "Fenolftalein tidak berwarna dalam KEDUA-DUA larutan berasid dan neutral, dan hanya bertukar merah jambu dalam alkali. Keputusan tidak berwarna sahaja tidak membuktikan larutan itu berasid — satu lagi ujian yang sesuai, seperti kertas litmus, diperlukan untuk mengesahkannya.",
  },
  {
    id: "sci-f2-c6-bm-q13",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah kelebihan penunjuk semesta berbanding kertas litmus?",
    options: [
      "Ia hanya digunakan untuk alkali",
      "Ia menghasilkan pelbagai warna yang boleh dibandingkan dengan carta pH, memberikan gambaran yang lebih baik tentang nilai pH sebenar sesuatu larutan, bukan sekadar sama ada ia berasid atau beralkali",
      "Ia tidak boleh digunakan dengan carta warna",
      "Ia memberikan warna yang sama untuk setiap larutan",
    ],
    answerIndex: 1,
    explanation:
      "Kertas litmus hanya menunjukkan sama ada larutan berasid (merah) atau beralkali (biru). Penunjuk semesta menghasilkan pelbagai warna — merah dalam asid, hijau dalam neutral, biru dalam alkali — yang boleh dibandingkan dengan carta pH untuk memberikan gambaran yang lebih baik tentang pH sebenar larutan itu.",
  },
  {
    id: "sci-f2-c6-bm-q14",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Apakah warna metil jingga dalam keadaan neutral dan beralkali?",
    options: ["Merah", "Kuning", "Biru", "Hijau"],
    answerIndex: 1,
    explanation:
      "Metil jingga berwarna merah dalam asid, tetapi kuning dalam keadaan neutral mahupun beralkali.",
  },
  {
    id: "sci-f2-c6-bm-q15",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Dalam ujian sifat asid dan alkali, apakah gas yang terhasil apabila riben magnesium bertindak balas dengan asid hidroklorik cair?",
    options: ["Gas oksigen", "Gas karbon dioksida", "Gas hidrogen", "Gas nitrogen"],
    answerIndex: 2,
    explanation:
      'Riben magnesium bertindak balas dengan asid hidroklorik cair menghasilkan gas hidrogen, yang menyalakan kayu uji berbunyi "pop".',
  },
  {
    id: "sci-f2-c6-bm-q16",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Apakah yang berlaku apabila riben magnesium dimasukkan ke dalam larutan alkali dalam ujian sifat asid dan alkali?",
    options: [
      "Menghasilkan gas hidrogen dengan cepat",
      "Menghasilkan gas oksigen",
      "Magnesium tidak bertindak balas dengan alkali",
      "Magnesium melarut sepenuhnya",
    ],
    answerIndex: 2,
    explanation:
      "Magnesium tidak bertindak balas dengan alkali dalam aktiviti ini, berbeza dengan tindak balasnya dengan asid.",
  },
  {
    id: "sci-f2-c6-bm-q17",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Persamaan perkataan manakah yang mewakili dengan betul tindak balas peneutralan antara asid sulfurik dan kalium hidroksida?",
    options: [
      "Asid sulfurik + Kalium hidroksida → Kalium sulfat + Air",
      "Asid sulfurik + Kalium hidroksida → Kalium klorida + Air",
      "Asid sulfurik + Kalium hidroksida → Kalium sulfat + Hidrogen",
      "Asid sulfurik + Kalium hidroksida → Kalium nitrat + Air",
    ],
    answerIndex: 0,
    explanation:
      "Peneutralan mengikut persamaan perkataan Asid + Alkali → Garam + Air. Asid sulfurik bertindak balas dengan kalium hidroksida menghasilkan kalium sulfat dan air.",
  },
  {
    id: "sci-f2-c6-bm-q19",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Dalam pentitratan asid-alkali seperti dalam buku teks, radas manakah yang mengandungi asid hidroklorik dan membolehkannya ditambah setitik demi setitik ke dalam kelalang kon?",
    options: ["Pipet", "Buret", "Kelalang kon", "Silinder penyukat"],
    answerIndex: 1,
    explanation:
      "Dalam pentitratan itu, buret diisi dengan asid hidroklorik dan membolehkannya ditambah setitik demi setitik ke dalam kelalang kon, manakala pipet digunakan untuk memindahkan isipadu tetap larutan natrium hidroksida ke dalam kelalang kon.",
  },
  {
    id: "sci-f2-c6-bm-q20",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Dalam pentitratan asid-alkali menggunakan fenolftalein, bagaimanakah takat akhir dikenal pasti?",
    options: [
      "Larutan menjadi keruh",
      "Larutan bertukar daripada merah jambu kepada tidak berwarna",
      "Larutan mengeluarkan buih",
      "Larutan bertukar kepada biru",
    ],
    answerIndex: 1,
    explanation:
      "Dengan menggunakan fenolftalein sebagai penunjuk, peneutralan selesai apabila larutan bertukar daripada merah jambu kepada tidak berwarna.",
  },
  {
    id: "sci-f2-c6-bm-q21",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Tanah di sebuah ladang didapati terlalu berasid sehingga tanaman tidak subur. Apakah bahan yang sesuai ditambah dan mengapa?",
    options: [
      "Cuka, kerana ia akan meningkatkan keasidan tanah",
      "Kapur mati, kerana ia beralkali dan akan meneutralkan keasidan tanah",
      "Asid sulfurik, kerana ia akan mengakis tanah",
      "Air suling, kerana ia tidak memberi sebarang kesan",
    ],
    answerIndex: 1,
    explanation:
      "Tanah berasid boleh dirawat dengan menambah kapur mati yang beralkali supaya tumbuhan dapat tumbuh dengan baik melalui proses peneutralan.",
  },
  {
    id: "sci-f2-c6-bm-q22",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Mengapakah pelembut fabrik yang bersifat berasid digunakan selepas fabrik dibasuh dengan detergen?",
    options: [
      "Untuk menjadikan fabrik lebih berwarna",
      "Untuk meningkatkan kealkalian fabrik",
      "Untuk meneutralkan fabrik yang menjadi beralkali selepas dibasuh dengan detergen",
      "Untuk membersihkan kotoran berat",
    ],
    answerIndex: 2,
    explanation:
      "Pelembut fabrik bersifat berasid dan mengurangkan paras pH fabrik yang menjadi beralkali setelah dibasuh dengan detergen, iaitu satu bentuk peneutralan.",
  },
  {
    id: "sci-f2-c6-bm-q23",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Sebuah kilang menghasilkan sisa kimia berasid. Apakah yang perlu dilakukan kepada sisa ini sebelum ia dilepaskan ke dalam sungai?",
    options: [
      "Ia boleh dilepaskan terus tanpa sebarang rawatan",
      "Ia perlu dirawat dengan alkali untuk meneutralkannya sebelum dilepaskan",
      "Ia perlu dicairkan dengan lebih banyak asid sebelum dilepaskan",
      "Ia hanya perlu ditapis, tanpa rawatan kimia",
    ],
    answerIndex: 1,
    explanation:
      "Sisa kimia berasid daripada kilang dirawat dengan alkali untuk meneutralkannya sebelum dilepaskan ke dalam sungai.",
  },
  {
    id: "sci-f2-c6-bm-q24",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Bagaimanakah ubat gigi membantu mencegah karies gigi dari segi konsep peneutralan?",
    options: [
      "Ubat gigi berasid dan menambah lagi keasidan dalam mulut",
      "Ubat gigi mengandungi bahan beralkali yang meneutralkan asid yang dihasilkan oleh bakteria dalam mulut",
      "Ubat gigi tidak mempunyai kaitan dengan pH mulut",
      "Ubat gigi hanya membersihkan secara fizikal tanpa tindak balas kimia",
    ],
    answerIndex: 1,
    explanation:
      "Ubat gigi mengandungi bahan beralkali yang dapat meneutralkan asid yang dihasilkan oleh bakteria dalam mulut, sekali gus mencegah karies gigi.",
  },
  {
    id: "sci-f2-c6-bm-q25",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Seorang pelajar ingin mengetahui pH gas ammonia. Apakah yang perlu dilakukan terlebih dahulu, dan mengapa?",
    options: [
      "Uji gas itu terus dengan kertas litmus, kerana gas tidak memerlukan air",
      "Larutkan gas ammonia itu ke dalam air terlebih dahulu, kerana asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air, kemudian uji larutan yang terhasil",
      "Panaskan gas ammonia itu sehingga menjadi pepejal sebelum diuji",
      "Campurkan gas ammonia itu dengan asid sebelum menguji pHnya",
    ],
    answerIndex: 1,
    explanation:
      "Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air. Untuk mengetahui pH gas ammonia, ia perlu dilarutkan ke dalam air terlebih dahulu supaya sifat alkalinya dapat ditunjukkan, kemudian satu ujian yang sesuai — seperti kertas litmus, penunjuk semesta atau meter pH — boleh digunakan ke atas larutan yang terhasil.",
  },
  {
    id: "sci-f2-c6-bm-q26",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Yang manakah berikut memadankan dengan betul suatu bahan dengan kegunaannya?",
    options: [
      "Natrium hidroksida digunakan dalam bateri kereta",
      "Asid sulfurik digunakan dalam bateri kereta",
      "Cuka digunakan untuk menghasilkan detergen",
      "Kapur mati digunakan dalam minuman berkarbonat",
    ],
    answerIndex: 1,
    explanation:
      "Asid sulfurik, iaitu asid, digunakan dalam bateri kereta. Natrium hidroksida, iaitu alkali, digunakan untuk menghasilkan detergen; cuka, iaitu asid, digunakan dalam masakan; dan kapur mati, iaitu alkali, digunakan untuk merawat tanah berasid.",
  },
  {
    id: "sci-f2-c6-bm-q27",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Dalam satu pentitratan asid-alkali menggunakan fenolftalein, larutan dalam kelalang kon kekal merah jambu walaupun lebih banyak asid hidroklorik telah ditambah daripada buret. Apakah kesimpulan yang sesuai bagi pemerhatian ini?",
    options: [
      "Peneutralan telah selesai sepenuhnya",
      "Jumlah asid yang ditambah masih belum cukup untuk meneutralkan kesemua alkali dalam kelalang kon",
      "Fenolftalein telah rosak",
      "Larutan dalam kelalang kon adalah berasid",
    ],
    answerIndex: 1,
    explanation:
      "Larutan kekal merah jambu (warna fenolftalein dalam keadaan beralkali) bermakna alkali masih berlebihan; peneutralan baru selesai apabila warna bertukar kepada tidak berwarna.",
  },
  {
    id: "sci-f2-c6-bm-q28",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Mengapakah natrium hidroksida pepejal tidak menukar warna kertas litmus merah, tetapi larutan natrium hidroksida menukarkannya kepada biru?",
    options: [
      "Kerana natrium hidroksida pepejal bukan alkali",
      "Kerana asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air",
      "Kerana kertas litmus merah rosak apabila terkena pepejal",
      "Kerana natrium hidroksida pepejal lebih lemah daripada larutannya",
    ],
    answerIndex: 1,
    explanation:
      "Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air; natrium hidroksida pepejal (tanpa air) tidak menukar warna litmus merah, tetapi dengan air ia menukarkannya kepada biru.",
  },
  {
    id: "sci-f2-c6-bm-q29",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Larutan ammonia digunakan dalam penghasilan baja untuk pertanian. Kenyataan manakah yang menerangkan proses ini dengan betul?",
    options: [
      "Baja dihasilkan daripada tindak balas antara bahan berasid dan beralkali, dengan larutan ammonia sebagai bahan alkali",
      "Larutan ammonia adalah asid yang digunakan untuk mengakis bahan mentah",
      "Penghasilan baja tidak melibatkan sebarang tindak balas asid-alkali",
      "Larutan ammonia hanya digunakan untuk mewarnakan baja",
    ],
    answerIndex: 0,
    explanation:
      "Baja dihasilkan daripada tindak balas antara bahan berasid dan beralkali. Larutan ammonia, yang bersifat alkali, digunakan dalam penghasilan baja untuk sektor pertanian.",
  },
  {
    id: "sci-f2-c6-bm-q30",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Berdasarkan jadual perubahan warna penunjuk, sebatang sampel air kolam diuji dengan kertas litmus biru (kekal biru), kertas litmus merah (kekal merah), dan fenolftalein (tidak berwarna). Apakah sifat pH air kolam itu?",
    options: ["Berasid", "Beralkali", "Neutral", "Tidak dapat ditentukan"],
    answerIndex: 2,
    explanation:
      "Kertas litmus biru dan merah yang kekal warna asal serta fenolftalein yang kekal tidak berwarna menunjukkan bahan tersebut adalah neutral (pH 7).",
  },
  {
    id: "sci-f2-c6-bm-q31",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Asid hidroklorik dan asid etanoik pada kepekatan yang sama diuji dengan meter pH. Asid hidroklorik menunjukkan pH 1 dan asid etanoik menunjukkan pH 3. Apakah kesimpulannya?",
    options: [
      "Asid etanoik ialah asid yang lebih kuat kerana nilai pHnya lebih tinggi",
      "Asid hidroklorik ialah asid kuat dan asid etanoik ialah asid lemah",
      "Kedua-duanya asid kuat kerana nilai pH kedua-duanya kurang daripada 7",
      "Kekuatan asid tidak boleh ditentukan daripada nilai pH",
    ],
    answerIndex: 1,
    explanation:
      "Pada kepekatan yang sama, asid yang memberikan nilai pH lebih rendah ialah asid yang lebih kuat. Asid hidroklorik (pH 1) ialah asid kuat; asid etanoik (pH 3) ialah asid lemah.",
  },
  {
    id: "sci-f2-c6-bm-q32",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Mengapakah syarat 'kepekatan yang sama' penting apabila membandingkan kekuatan dua asid menggunakan nilai pH?",
    options: [
      "Kerana asid hanya menunjukkan sifatnya pada kepekatan tertentu",
      "Kerana tanpa syarat itu, perbezaan nilai pH mungkin datang daripada kepekatan dan bukan daripada kekuatan asid",
      "Kerana nilai pH hanya boleh diukur pada kepekatan yang sama",
      "Kerana asid lemah tidak larut pada kepekatan yang tinggi",
    ],
    answerIndex: 1,
    explanation:
      "Larutan asid kuat yang sangat cair boleh menunjukkan nilai pH yang lebih tinggi daripada larutan asid lemah yang pekat. Membandingkan pada kepekatan yang sama memastikan perbezaan nilai pH itu benar-benar disebabkan oleh kekuatan asid.",
  },
  {
    id: "sci-f2-c6-bm-q33",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Cuka mengandungi asid etanoik dan mempunyai rasa yang masam. Apakah jenis asid yang terdapat di dalam cuka?",
    options: [
      "Asid kuat, kerana rasanya masam",
      "Asid kuat, kerana nilai pHnya rendah",
      "Asid lemah",
      "Bukan asid, kerana ia digunakan dalam makanan",
    ],
    answerIndex: 2,
    explanation:
      "Asid etanoik ialah asid lemah. Rasa masam dan nilai pH yang rendah menunjukkan larutan itu berasid, tetapi kekuatan asid ditentukan dengan membandingkan bahan pada kepekatan yang sama.",
  },
  {
    id: "sci-f2-c6-bm-q34",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "bm",
    question:
      "Larutan natrium hidroksida dan larutan ammonia pada kepekatan yang sama masing-masing menunjukkan pH 13 dan pH 11. Yang manakah alkali lemah?",
    options: [
      "Larutan natrium hidroksida",
      "Larutan ammonia",
      "Kedua-duanya alkali lemah",
      "Kedua-duanya alkali kuat",
    ],
    answerIndex: 1,
    explanation:
      "Pada kepekatan yang sama, alkali yang memberikan nilai pH lebih rendah ialah alkali yang lebih lemah. Larutan ammonia (pH 11) ialah alkali lemah; larutan natrium hidroksida (pH 13) ialah alkali kuat.",
  },
  {
    id: "sci-f2-c6-bm-q35",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "bm",
    question: "Alat manakah yang memberikan bacaan terus nilai pH sesuatu larutan?",
    options: ["Kertas litmus", "Penunjuk semesta", "Meter pH", "Metil jingga"],
    answerIndex: 2,
    explanation:
      "Meter pH memberikan bacaan nombor terus bagi nilai pH sesuatu larutan. Penunjuk seperti kertas litmus, penunjuk semesta dan metil jingga hanya menunjukkan perubahan warna yang perlu dibandingkan dengan carta atau diperhatikan dengan mata.",
  },
];
