import type { Difficulty, QuizQuestion } from "@/data/content";
import { buildForm3MathQuizSets } from "../quiz-sets";
import { MATH_F3_C7_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C7_QUIZ_EXPLANATIONS } from "./quiz-explanations";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];
function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c7-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 7",
    lang: "bm",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C7_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C7_QUIZ_EXPLANATIONS[index + 1].bm,
  }));
}

export const mathF3C7QuestionBankBM: QuizQuestion[] = buildQuiz([
  [
    "Easy",
    "Apakah maksud satah dalam geometri?",
    [
      "Permukaan rata yang memanjang tanpa had",
      "Garis lurus sahaja",
      "Permukaan melengkung",
      "Satu titik",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah tiga jenis satah?",
    [
      "Mengufuk, mencancang, condong",
      "Bulat, segi tiga, segi empat",
      "Tinggi, rendah, sederhana",
      "Merah, biru, hijau",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah normal kepada satah?",
    [
      "Garis lurus berserenjang dengan satah",
      "Garis selari dengan satah",
      "Garis condong sahaja",
      "Sebarang garis pada satah",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah unjuran ortogon?",
    [
      "Imej terbentuk pada satah dengan garis unjuran berserenjang satah",
      "Sebarang lukisan objek",
      "Lukisan tanpa skala",
      "Garis lurus sahaja",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah pelan?",
    [
      "Unjuran ortogon pada satah mengufuk (pandangan atas)",
      "Unjuran pada satah mencancang",
      "Sebarang lukisan sisi",
      "Lukisan berskala",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah dongakan?",
    [
      "Unjuran ortogon pada satah mencancang (pandangan depan/sisi)",
      "Unjuran pada satah mengufuk",
      "Lukisan dari atas",
      "Lukisan tiga dimensi penuh",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah garis padu tebal digunakan untuk?",
    ["Sisi yang nampak", "Sisi tersembunyi", "Garis binaan", "Garis paksi"],
    0,
  ],
  [
    "Easy",
    "Apakah garis sempang digunakan untuk?",
    [
      "Sisi tersembunyi/terlindung",
      "Sisi yang nampak",
      "Garis ukur",
      "Garis tepi kertas",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah garis padu halus digunakan untuk?",
    ["Garis binaan/unjuran", "Sisi nampak", "Sisi tersembunyi", "Rangka objek"],
    0,
  ],
  [
    "Easy",
    "Dalam susunan unjuran sudut pertama yang digunakan di sini, di manakah pelan diletakkan berbanding dongakan depan?",
    ["Di bawah", "Di atas", "Di sebelah kiri", "Di sebelah kanan"],
    0,
  ],
  [
    "Easy",
    "Dalam susunan unjuran sudut pertama yang digunakan di sini, di manakah dongakan depan diletakkan berbanding pelan?",
    ["Di atas", "Di bawah", "Di sebelah kiri", "Di sebelah kanan"],
    0,
  ],
  [
    "Easy",
    "Apakah sudut normal yang sah terhadap satah?",
    ["90°", "45°", "60°", "180°"],
    0,
  ],
  [
    "Easy",
    "Adakah semua unjuran adalah unjuran ortogon?",
    [
      "Tidak, hanya jika garis unjuran berserenjang satah",
      "Ya, semua unjuran ortogon",
      "Hanya unjuran bulat",
      "Hanya unjuran segi empat",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah maksud satah mengufuk?",
    [
      "Satah mendatar (horizontal)",
      "Satah tegak",
      "Satah condong",
      "Satah melengkung",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah maksud satah mencancang?",
    [
      "Satah tegak (vertical)",
      "Satah mendatar",
      "Satah condong",
      "Satah bulat",
    ],
    0,
  ],
  [
    "Easy",
    "Arahan meminta pelan dan dongakan dilukis pada skala penuh. Apakah skalanya?",
    ["1:1", "1:2", "1:10", "2:1"],
    0,
  ],
  [
    "Easy",
    "Berapa pandangan biasa dilukis bersama (pelan + dongakan)?",
    [
      "Tiga (pelan, dongakan depan, dongakan sisi)",
      "Satu sahaja",
      "Dua sahaja",
      "Empat",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah fungsi normal dalam melukis unjuran ortogon?",
    [
      "Menentukan arah unjuran yang tegak terhadap satah",
      "Menentukan warna lukisan",
      "Menentukan saiz kertas",
      "Menentukan jenis objek",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah maksud mensintesis pelan dan dongakan?",
    [
      "Menggabungkan tiga unjuran untuk melakar bentuk 3D objek",
      "Memadam semua unjuran",
      "Melukis semula objek tanpa skala",
      "Mengira luas objek",
    ],
    0,
  ],
  [
    "Easy",
    "Apakah bidang yang menggunakan pelan dan dongakan?",
    [
      "Kejuruteraan, pembinaan, arkitek",
      "Muzik dan seni abstrak",
      "Sukan dan permainan",
      "Memasak",
    ],
    0,
  ],
  [
    "Medium",
    "Dalam kubus PQRSTUVW, PQRS ialah muka bawah dan T, U, V, W masing-masing betul-betul di atas P, Q, R, S. Set garis manakah normal kepada satah PQRS?",
    ["PT, QU, RV, SW", "PQ, QR, RS, SP", "TU, UV, VW, WT", "PU, QV, RW, ST"],
    0,
  ],
  [
    "Medium",
    "PQ dan PR ialah dua garis bersilang dalam satah α. Garis XP melalui P. Syarat manakah mencukupi untuk XP menjadi normal kepada α?",
    [
      "XP ⟂ PQ dan XP ⟂ PR",
      "XP ⟂ PQ sahaja",
      "XP selari dengan PQ",
      "XP terletak dalam α",
    ],
    0,
  ],
  [
    "Medium",
    "Jika garis unjuran tidak berserenjang satah, apakah hasilnya?",
    [
      "Bukan unjuran ortogon",
      "Unjuran ortogon sah",
      "Pelan yang sah",
      "Dongakan yang sah",
    ],
    0,
  ],
  [
    "Medium",
    "Silinder tegak berdiameter 4 cm dan tinggi 6 cm berada di atas satah mengufuk. Apakah bentuk pelannya?",
    [
      "Bulatan berdiameter 4 cm",
      "Segi empat tepat 4 cm × 6 cm",
      "Segi tiga",
      "Garis lurus 6 cm",
    ],
    0,
  ],
  [
    "Medium",
    "Silinder tegak berdiameter 4 cm dan tinggi 6 cm berada di atas satah mengufuk. Apakah bentuk dongakan sisinya?",
    [
      "Segi empat tepat 4 cm × 6 cm",
      "Bulatan berdiameter 4 cm",
      "Segi tiga",
      "Bulatan berdiameter 6 cm",
    ],
    0,
  ],
  [
    "Medium",
    "Satu muka rata objek selari dengan satah unjuran. Pada skala 1:1, apakah yang dikekalkan dalam unjuran ortogon muka itu?",
    [
      "Panjang sisi dan sudut pada muka itu",
      "Semua panjang dan sudut seluruh objek",
      "Tinggi objek sahaja",
      "Tiada ukuran dikekalkan",
    ],
    0,
  ],
  [
    "Medium",
    "Mengapa panjang sisi unjuran berbeza mengikut arah pandangan?",
    [
      "Kerana sisi condong/tegak terhadap satah berubah panjang dalam unjuran",
      "Kerana objek berubah bentuk",
      "Kerana skala berubah",
      "Kerana kesilapan lukisan",
    ],
    0,
  ],
  [
    "Medium",
    "Sebuah prisma tegak mempunyai keratan rentas seragam berbentuk segi tiga, dengan lebar 6 cm, kedalaman 8 cm dan tinggi 4 cm. Apabila membina pelan, bucu perlu diunjurkan kepada satah yang mana?",
    [
      "Satah mengufuk",
      "Satah mencancang depan",
      "Satah mencancang sisi",
      "Satah condong sebarang",
    ],
    0,
  ],
  [
    "Medium",
    "Dalam susunan unjuran sudut pertama, dongakan sisi dilihat dari kanan ke kiri. Di manakah dongakan sisi diletakkan berbanding dongakan depan?",
    ["Di sebelah kiri", "Di sebelah kanan", "Di atas", "Di bawah pelan"],
    0,
  ],
  [
    "Medium",
    "Dalam susunan unjuran sudut pertama, dongakan sisi dilihat dari kiri ke kanan. Di manakah dongakan sisi diletakkan berbanding dongakan depan?",
    [
      "Di sebelah kanan",
      "Di sebelah kiri",
      "Di atas pelan",
      "Di tengah dongakan depan",
    ],
    0,
  ],
  [
    "Medium",
    "Sisi GP berada di belakang objek dan terlindung dalam dongakan. Apakah jenis garis yang digunakan untuk GP?",
    [
      "Garis sempang",
      "Garis padu tebal",
      "Garis binaan padu nipis",
      "Garis ukuran",
    ],
    0,
  ],
  [
    "Medium",
    "Apakah fungsi garis padu halus dalam melukis dongakan?",
    [
      "Sebagai garis unjuran/binaan panduan",
      "Untuk sisi nampak utama",
      "Untuk sisi tersembunyi",
      "Untuk label sudut",
    ],
    0,
  ],
  [
    "Medium",
    "Muka segi tiga selari dengan satah dongakan dan mempunyai sudut 60°. Kaedah manakah sesuai untuk membina sudut itu dengan tepat?",
    [
      "Jangka sudut atau binaan geometri dengan pembaris dan jangka lukis",
      "Anggaran tangan bebas sahaja",
      "Mengukur panjang sisi dengan pembaris sahaja",
      "Menyalin sudut daripada lakaran perspektif tanpa semakan",
    ],
    0,
  ],
  [
    "Medium",
    "Pelan kuboid ialah 8 cm × 5 cm, dongakan depan 8 cm × 3 cm dan dongakan sisi 5 cm × 3 cm, semuanya pada skala 1:1. Apakah ukuran kuboid (lebar × kedalaman × tinggi)?",
    [
      "8 cm × 5 cm × 3 cm",
      "8 cm × 3 cm × 5 cm",
      "5 cm × 3 cm × 8 cm",
      "3 cm × 8 cm × 5 cm",
    ],
    0,
  ],
  [
    "Medium",
    "Apakah label yang konsisten penting semasa mensintesis unjuran?",
    [
      "Memastikan bucu sepadan merentasi ketiga-tiga pandangan",
      "Untuk kecantikan lukisan sahaja",
      "Tidak penting",
      "Hanya untuk pelan",
    ],
    0,
  ],
  [
    "Medium",
    "Sebuah prisma bertangga mempunyai lebar 6 cm, kedalaman 4 cm dan tinggi maksimum 5 cm. Paras bahagian rendah ialah 2 cm. Berapakah tinggi permukaan tegak pada takuk?",
    ["3 cm", "2 cm", "5 cm", "7 cm"],
    0,
  ],
  [
    "Medium",
    "Kuboid mempunyai lebar depan 7 cm, kedalaman 4 cm dan tinggi 3 cm. Pada skala 1:1, berapakah luas dongakan depannya?",
    ["21 cm²", "28 cm²", "12 cm²", "84 cm²"],
    0,
  ],
  [
    "Medium",
    "Kuboid mempunyai lebar depan 7 cm, kedalaman 4 cm dan tinggi 3 cm. Pada skala 1:1, berapakah perimeter pelannya?",
    ["22 cm", "20 cm", "14 cm", "28 cm"],
    0,
  ],
  [
    "Medium",
    "Apakah maksud keratan rentas seragam bagi prisma?",
    [
      "Keratan selari yang sama bentuk dan ukuran sepanjang prisma",
      "Bentuk keratan berubah sepanjang prisma",
      "Hanya hujung prisma mempunyai keratan",
      "Ukuran keratan semakin kecil",
    ],
    0,
  ],
  [
    "Medium",
    "Mengapa label bucu objek (contoh E/D, F/A) digunakan dalam unjuran bertindih?",
    [
      "Menunjukkan dua bucu objek bertindih pada titik unjuran yang sama",
      "Kesilapan pelabelan",
      "Menunjukkan bucu berlainan warna",
      "Tidak bermakna apa-apa",
    ],
    0,
  ],
  [
    "Hard",
    "Segi tiga sama sisi ABC bersisi 4 cm terletak pada satah condong. Dalam pelannya, ∠ABC menjadi 45°. Mengapakah sudut sebenar 60° tidak dikekalkan?",
    [
      "Satah segi tiga tidak selari dengan satah pelan",
      "Semua sudut pelan mesti 45°",
      "Objek berubah bentuk",
      "Semua unjuran ortogon tidak berskala",
    ],
    0,
  ],
  [
    "Hard",
    "Sisi AC panjangnya 14 cm dan selari dengan satah unjuran. Unjuran dilukis pada skala 1:2. Berapakah panjang AC pada lukisan?",
    ["7 cm", "14 cm", "28 cm", "0 cm"],
    0,
  ],
  [
    "Hard",
    "Batang AB panjangnya 14√2 cm. Pelan batang itu pada skala 1:1 panjangnya 14 cm. A berada pada satah mengufuk dan B di atasnya. Berapakah tinggi B dari satah?",
    ["14 cm", "7 cm", "28 cm", "14√2 cm"],
    0,
  ],
  [
    "Hard",
    "Prisma tegak mempunyai keratan rentas depan segi tiga sama kaki dengan tapak 6 cm dan tinggi 4 cm. Kedalamannya 8 cm. Pada skala 1:1, apakah bentuk dan ukuran sempadan luar pelannya?",
    [
      "Segi empat tepat 6 cm × 8 cm",
      "Segi tiga bertapak 6 cm dan tinggi 4 cm",
      "Segi empat tepat 8 cm × 4 cm",
      "Bulatan berdiameter 6 cm",
    ],
    0,
  ],
  [
    "Hard",
    "Prisma bertangga berasal daripada kuboid 6 cm × 4 cm × 5 cm. Takuk atas sebelah kanan lebarnya 2 cm dan merentasi seluruh kedalaman 4 cm; tinggi bahagian rendah ialah 2 cm. Berapakah isi padu objek yang tinggal?",
    ["96 cm³", "120 cm³", "24 cm³", "72 cm³"],
    0,
  ],
  [
    "Hard",
    "Keratan rentas depan prisma ialah segi tiga sama kaki dengan tapak 6 cm dan tinggi 4 cm. Muka ini selari dengan satah dongakan depan. Berapakah panjang setiap sisi condong pada dongakan depan berskala 1:1?",
    ["5 cm", "10 cm", "√52 cm", "4 cm"],
    0,
  ],
  [
    "Hard",
    "TS ialah normal kepada satah α. TS dan ST digunakan sebagai nama garis, bukan vektor berarah. Pernyataan manakah benar?",
    [
      "TS dan ST menamakan garis normal yang sama",
      "ST tidak boleh menjadi normal",
      "ST dua kali lebih panjang daripada TS",
      "ST selari dengan satah α",
    ],
    0,
  ],
  [
    "Hard",
    "Pelan sebuah kuboid pada skala 1:2 ialah 4 cm × 2.5 cm. Tinggi pada dongakan depan ialah 1.5 cm pada skala yang sama. Berapakah isi padu kuboid sebenar?",
    ["120 cm³", "15 cm³", "30 cm³", "60 cm³"],
    0,
  ],
  [
    "Hard",
    "Dalam pelan kuboid berskala 1:1, dua bucu T dan P bertindih pada satu titik. Apakah hubungan garis TP dengan satah pelan?",
    [
      "Serenjang dengan satah pelan",
      "Selari dengan satah pelan",
      "Terletak dalam satah pelan",
      "Condong 45° kepada satah pelan",
    ],
    0,
  ],
  [
    "Hard",
    "Semasa menyemak pelan dan dongakan berskala sama, ukuran manakah perlu sepadan antara pandangan kuboid?",
    [
      "Lebar: pelan–depan; kedalaman: pelan–sisi; tinggi: depan–sisi",
      "Semua sudut perspektif mesti sama dengan sudut pelan",
      "Semua tiga pandangan mesti sama bentuk",
      "Semua sisi terlindung mesti dilukis padu",
    ],
    0,
  ],
]);

export const mathF3C7QuizzesBM: QuizQuestion[] = buildForm3MathQuizSets(
  7,
  mathF3C7QuestionBankBM,
);
