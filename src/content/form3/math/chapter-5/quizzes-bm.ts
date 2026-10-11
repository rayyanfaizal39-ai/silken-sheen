import type { Difficulty, QuizQuestion } from "@/data/content";

import { MATH_F3_C5_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C5_QUIZ_EXPLANATIONS } from "./quiz-explanations";

import { buildForm3MathQuizSets } from "../quiz-sets";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c5-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 5",
    lang: "bm",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C5_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C5_QUIZ_EXPLANATIONS[index + 1].bm,
  }));
}

export const mathF3C5QuestionBankBM: QuizQuestion[] = buildQuiz([
  [
    "Easy",
    "Apakah hipotenus dalam segi tiga bersudut tegak?",
    [
      "Sisi bertentangan sudut 90°",
      "Sisi bertentangan sudut terkecil",
      "Sisi bersebelahan sudut terkecil",
      "Mana-mana sisi segi tiga",
    ],
    0,
  ],
  ["Easy", "Apakah formula sin θ?", ["Sisi bertentangan / hipotenus", "Sisi bersebelahan / hipotenus", "Sisi bertentangan / sisi bersebelahan", "Hipotenus / sisi bertentangan"], 0],
  ["Easy", "Apakah formula kos θ?", ["Sisi bersebelahan / hipotenus", "Sisi bertentangan / hipotenus", "Sisi bertentangan / sisi bersebelahan", "Hipotenus / sisi bersebelahan"], 0],
  [
    "Easy",
    "Apakah formula tan θ?",
    [
      "Bertentangan / bersebelahan",
      "Bersebelahan / bertentangan",
      "Bertentangan / hipotenus",
      "Bersebelahan / hipotenus",
    ],
    0,
  ],
  ["Easy", "Apakah formula tan θ dalam sebutan sin dan kos?", ["tan θ = sin θ / kos θ", "tan θ = kos θ / sin θ", "tan θ = sin θ x kos θ", "tan θ = sin θ + kos θ"], 0],
  ["Easy", "Apakah nilai sin 30°?", ["1/2", "√3/2", "1", "1/√2"], 0],
  ["Easy", "Apakah nilai kos 60°?", ["1/2", "√3/2", "1", "0"], 0],
  ["Easy", "Apakah nilai tan 45°?", ["1", "0", "√3", "1/√3"], 0],
  ["Easy", "Apakah nilai sin 45°?", ["1/√2", "1/2", "√3/2", "1"], 0],
  ["Easy", "Apakah nilai tan 30°?", ["1/√3", "√3", "1", "1/2"], 0],
  ["Easy", "Apakah nilai tan 60°?", ["√3", "1/√3", "1", "√3/2"], 0],
  ["Easy", "Dalam ukuran sudut, 1° bersamaan berapa minit sudut (′)?", ["60′", "100′", "30′", "1′"], 0],
  ["Easy", "Tukar 43° 30' kepada darjah.", ["43.5°", "43.3°", "44°", "43.03°"], 0],
  ["Easy", "Apa yang terjadi pada sin θ apabila sudut θ bertambah dari 0° ke 90°?", ["Bertambah ke 1", "Berkurang ke 0", "Tetap sama", "Berkurang ke -1"], 0],
  ["Easy", "Apa yang terjadi pada kos θ apabila sudut θ bertambah dari 0° ke 90°?", ["Berkurang ke 0", "Bertambah ke 1", "Tetap sama", "Bertambah tanpa had"], 0],
  [
    "Easy",
    "Apabila θ menghampiri 90° dari bawah, bagaimanakah nilai tan θ berubah?",
    [
      "Bertambah tanpa had",
      "Berkurang menuju sifar",
      "Kekal pada nilai satu",
      "Kekal pada nilai negatif",
    ],
    0,
  ],
  ["Easy", "Segi tiga PQR bersudut tegak di Q, PQ = 15 cm dan QR = 8 cm. Hitung PR.", ["17 cm", "23 cm", "7 cm", "13 cm"], 0],
  ["Easy", "Segi tiga PQR bersudut tegak di Q, PQ = 15 cm dan QR = 8 cm. Hitung sin∠PRQ.", ["15/17", "8/17", "8/15", "17/15"], 0],
  ["Easy", "Jika sin θ=0.6 dan kos θ=0.8, hitung tan θ.", ["0.75", "1.33", "0.48", "1.4"], 0],
  ["Easy", "Apakah mod kalkulator yang betul untuk kira trigonometri darjah?", ["Mod Deg (darjah)", "Mod Rad (radian)", "Mod Grad", "Tidak penting"], 0],

  ["Medium", "Segi tiga PQR bersudut tegak di Q, PR = 20 cm dan sin∠QPR = 3/5. Hitung QR.", ["12 cm", "16 cm", "20 cm", "8 cm"], 0],
  ["Medium", "Segi tiga PQR bersudut tegak di Q, PR = 20 cm dan QR = 12 cm. Hitung PQ menggunakan Teorem Pythagoras.", ["16 cm", "12 cm", "24 cm", "8 cm"], 0],
  ["Medium", "Segi tiga PQR bersudut tegak di Q, PR = 20 cm dan QR = 12 cm. Hitung kos∠QPR.", ["4/5", "3/5", "3/4", "4/3"], 0],
  ["Medium", "θ ialah sudut tirus. Jika sin θ = 3/8 dan tan θ = 3/√55, hitung kos θ.", ["√55/8", "8/√55", "3/√55", "√55/3"], 0],
  ["Medium", "Hitung sin45°+kos45° tanpa kalkulator.", ["√2", "1", "2", "1/√2"], 0],
  ["Medium", "Hitung 3kos30°-2sin60°.", ["√3/2", "√3", "3√3/2", "0"], 0],
  ["Medium", "Hitung 2tan45°-2kos60°.", ["1", "2", "0", "1.5"], 0],
  ["Medium", "Hitung (2sin60°)(4kos30°)-4tan60°.", ["6-4√3", "6+4√3", "2-4√3", "4√3-6"], 0],
  ["Medium", "Tukar 30.2° kepada darjah dan minit.", ["30° 12'", "30° 20'", "30° 2'", "30° 30'"], 0],
  ["Medium", "x ialah sudut tirus dan sin x = 0.8377. Hitung x kepada 1 tempat perpuluhan.", ["56.9°", "33.1°", "60.0°", "45.0°"], 0],
  ["Medium", "x ialah sudut tirus dan kos x = 0.7021. Hitung x kepada 1 tempat perpuluhan.", ["45.4°", "44.6°", "30.0°", "60.0°"], 0],
  ["Medium", "Tangga PR bersandar pada dinding QR. Q ialah sudut tegak, QR = 2.5 m dan sudut antara tangga dengan lantai PQ ialah 50°. Hitung panjang tangga kepada 2 tempat perpuluhan.", ["3.26 m", "1.91 m", "2.5 m", "3.91 m"], 0],
  ["Medium", "Pada muka sebuah kuboid, segi tiga CHG bersudut tegak di H, CH = 5 cm dan HG = 8 cm. Hitung pepenjuru CG.", ["√89 cm", "13 cm", "√41 cm", "9 cm"], 0],
  ["Medium", "Segi tiga FCG bersudut tegak di G, FG = 4 cm dan CG = √89 cm. Hitung tan∠FCG.", ["4/√89", "√89/4", "5/4", "4/5"], 0],
  ["Medium", "Segi tiga FCG bersudut tegak di G, FG = 4 cm dan CG = √89 cm. Hitung ∠FCG kepada 2 tempat perpuluhan.", ["22.98°", "30.00°", "45.00°", "60.00°"], 0],
  ["Medium", "Tangga lipat membentuk segi tiga sama kaki PQR dengan PQ = QR, ∠PQR = 38° dan PR = 1.4 m. T ialah titik tengah PR. Hitung PQ kepada 2 tempat perpuluhan.", ["2.15 m", "1.40 m", "0.70 m", "2.80 m"], 0],
  ["Medium", "Sudut dongak dari mata Aisyah ke hujung tiang lampu ialah 55°. Jarak garis pandang ialah 145 m. Hitung jarak mengufuk ke tiang kepada 1 tempat perpuluhan.", ["83.2 m", "118.8 m", "207.1 m", "145.0 m"], 0],
  ["Medium", "Dari hujung rumah api, sudut tunduk ke kapal ialah 41°. Kapal berada 200 m mengufuk dari kaki rumah api. Anggap permukaan laut mendatar. Hitung tinggi rumah api kepada 1 tempat perpuluhan.", ["173.9 m", "131.2 m", "150.9 m", "200.0 m"], 0],
  ["Medium", "Segi tiga PQR bersudut tegak di R. PQ = 10 cm dan ∠PQR = 60°. Hitung QR.", ["5 cm", "10 cm", "8.66 cm", "2.5 cm"], 0],
  ["Medium", "Segi tiga PRS bersudut tegak di R, SR = √75 cm dan PR = 15 cm. Hitung hipotenus PS kepada 2 tempat perpuluhan.", ["17.32 cm", "15.00 cm", "20.00 cm", "10.00 cm"], 0],

  ["Hard", "PQRS ialah segi empat tepat dengan PQ = 12 cm dan QR = 7 cm. QS ialah pepenjuru. Hitung tan∠PQS.", ["7/12", "12/7", "1", "12/√193"], 0],
  ["Hard", "PQRS ialah segi empat tepat dengan PQ = 12 cm dan QR = 7 cm. Hitung pepenjuru QS.", ["√193 cm", "19 cm", "12 cm", "7 cm"], 0],
  ["Hard", "Heksagon sekata PQRSTU mempunyai bucu mengikut turutan di sekelilingnya. Hitung ∠PTS.", ["90°", "60°", "30°", "120°"], 0],
  ["Hard", "Heksagon sekata PQRSTU mempunyai bucu mengikut turutan di sekelilingnya dan panjang sisi 6 cm. Hitung pepenjuru PS yang menyambungkan dua bucu bertentangan.", ["12 cm", "6√3 cm", "6 cm", "9 cm"], 0],
  ["Hard", "Segi empat tepat ABCD, AB=8cm, BC=16cm (2xAB), N titik tengah BC. Hitung BN.", ["8 cm", "16 cm", "4 cm", "12 cm"], 0],
  ["Hard", "M terletak pada sisi AD sebuah segi empat tepat. AD = 16 cm dan MD = (1/4)AD. Hitung AM.", ["12 cm", "4 cm", "8 cm", "16 cm"], 0],
  ["Hard", "Hitung 8sin60°-3tan60° tanpa kalkulator.", ["√3", "5√3", "√3/2", "0"], 0],
  ["Hard", "Hitung (tan30°)(2kos30°)+6sin30°.", ["4", "4√3", "1", "6"], 0],
  ["Hard", "Hitung (8kos45°)(sin60°)+(8sin45°)(kos30°).", ["4√6", "16", "8√2", "4√3"], 0],
  ["Hard", "Segi tiga PQR bersudut tegak di Q, QR = 18 cm dan tan∠QPR = 3/4. Hitung PQ.", ["24 cm", "18 cm", "13.5 cm", "30 cm"], 0],
  ["Hard", "Segi tiga ABC bersudut tegak di B, AB = 21 cm dan sin∠BAC = 3/5. Hitung hipotenus AC.", ["26.25 cm", "15.75 cm", "35 cm", "12.6 cm"], 0],
  ["Hard", "Segi tiga ABC bersudut tegak di B. Jika sin∠BAC = 3/5, hitung ∠BAC kepada darjah terdekat.", ["37°", "53°", "30°", "60°"], 0],
  ["Hard", "Segi tiga bersudut tegak mempunyai sisi bertentangan θ sepanjang 3 unit, sisi bersebelahan 4 unit dan hipotenus 5 unit. Hitung θ kepada 2 tempat perpuluhan.", ["36.87°", "45.00°", "60.00°", "30.00°"], 0],
  ["Hard", "Segi tiga DEF bersudut tegak di E. P terletak pada DF dan EP tegak lurus DF. Jika DP = 12 cm dan EP = 5 cm, hitung sin∠EDP.", ["5/13", "5/12", "12/13", "13/5"], 0],
  [
    "Hard",
    "Mengapa nisbah trigonometri bagi sudut yang sama kekal sama walaupun saiz segi tiga berbeza?",
    [
      "Segi tiga adalah serupa",
      "Segi tiga adalah kongruen",
      "Hipotenus kedua-duanya sama",
      "Sudut tegak kedua-duanya berubah",
    ],
    0,
  ],
]);

export const mathF3C5QuizzesBM: QuizQuestion[] = buildForm3MathQuizSets(5, mathF3C5QuestionBankBM);
