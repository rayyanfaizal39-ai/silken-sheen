import type { Difficulty, QuizQuestion } from "@/data/content";

import { MATH_F3_C4_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C4_QUIZ_EXPLANATIONS } from "./quiz-explanations";

import { buildForm3MathQuizSets } from "../quiz-sets";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c4-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 4",
    lang: "bm",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C4_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C4_QUIZ_EXPLANATIONS[index + 1].bm,
  }));
}

export const mathF3C4QuestionBankBM: QuizQuestion[] = buildQuiz([
  [
    "Easy",
    "Apakah maksud lukisan berskala?",
    [
      "Ukuran lukisan berkadaran dengan objek",
      "Ukuran lukisan sentiasa sama dengan objek",
      "Ukuran lukisan tidak berkaitan dengan objek",
      "Ukuran lukisan ditambah nilai tetap",
    ],
    0,
  ],
  ["Easy", "Apakah formula skala?", ["Ukuran lukisan berskala / Ukuran objek", "Ukuran objek / Ukuran lukisan berskala", "Ukuran lukisan + ukuran objek", "Ukuran lukisan - ukuran objek"], 0],
  ["Easy", "Dalam skala 1:n, n ialah nombor positif. Apakah maksud skala ini?", ["1 unit pada lukisan mewakili n unit pada objek", "n unit pada lukisan mewakili 1 unit pada objek", "Luas lukisan sentiasa sama dengan luas objek", "Lukisan sentiasa lebih kecil daripada objek"], 0],
  ["Easy", "Bagi skala 1:n dengan 0 < n < 1, bagaimanakah saiz lukisan berbanding objek?", ["Lebih besar daripada objek", "Lebih kecil daripada objek", "Sama dengan objek", "Tidak dapat ditentukan"], 0],
  ["Easy", "Bagi skala 1:n dengan n > 1, bagaimanakah saiz lukisan berbanding objek?", ["Lebih kecil daripada objek", "Lebih besar daripada objek", "Sama dengan objek", "Tidak dapat ditentukan"], 0],
  [
    "Easy",
    "Bagi skala 1:n dengan n = 1, bagaimanakah saiz lukisan berbanding objek?",
    ["Saiz sama", "Saiz lebih besar", "Saiz lebih kecil", "Saiz tidak tentu"],
    0,
  ],
  ["Easy", "Adakah sudut berubah dalam lukisan berskala?", ["Tidak, sudut kekal sama", "Ya, sudut berubah mengikut skala", "Kadangkala berubah", "Hanya berubah jika n=1"], 0],
  ["Easy", "Pada lukisan, P′Q′ = 2 cm; pada objek, PQ = 4 cm. Tentukan skala lukisan:objek.", ["1 : 2", "2 : 1", "1 : 4", "4 : 1"], 0],
  ["Easy", "Pada lukisan, K′L′ = 9 cm; pada objek, KL = 3 cm. Tentukan skala dalam bentuk n:1.", ["3 : 1", "1 : 3", "9 : 1", "1 : 9"], 0],
  ["Easy", "Skala peta 1cm:10km. Jarak peta 2cm. Hitung jarak sebenar.", ["20 km", "10 km", "5 km", "2 km"], 0],
  ["Easy", "Skala 1:300 000. Jarak peta 3cm. Hitung jarak sebenar (km).", ["9 km", "3 km", "30 km", "300 km"], 0],
  ["Easy", "Jarak sebenar yang dikira daripada skala peta adalah dalam cm. Untuk memberi jawapan dalam km, apakah penukaran yang diperlukan?", ["cm kepada km", "kg kepada g", "liter kepada ml", "saat kepada minit"], 0],
  ["Easy", "1 km bersamaan berapa cm?", ["100 000 cm", "1 000 cm", "10 000 cm", "1 000 000 cm"], 0],
  ["Easy", "Objek dan lukisan menggunakan grid bersaiz sama. Sisi objek ialah 4 unit grid dan sisi sepadan lukisan ialah 2 unit grid. Tentukan skala.", ["1 : 2", "2 : 1", "1 : 4", "1 : 1"], 0],
  [
    "Easy",
    "Bagi grid berlainan saiz dengan bilangan unit sisi sama, apakah digunakan untuk kira skala?",
    [
      "Panjang sisi petak",
      "Bilangan petak sisi",
      "Luas seluruh grid",
      "Perimeter seluruh grid",
    ],
    0,
  ],
  ["Easy", "Khairul lukis segi empat sama skala 1:1/3. Sisi sebenar 6cm. Hitung sisi lukisan.", ["18 cm", "2 cm", "6 cm", "3 cm"], 0],
  ["Easy", "Skala lukisan:objek ialah 1:n. Jika luas lukisan ialah A, apakah luas objek?", ["n²A", "nA", "A/n", "A/n²"], 0],
  ["Easy", "Lukisan sebuah bilik mempunyai panjang 7 cm dan lebar 5 cm pada skala 1:400. Hitung lebar sebenar dalam m.", ["20 m", "28 m", "2 000 m", "0.05 m"], 0],
  [
    "Easy",
    "Lukisan berskala 1:200 menunjukkan panjang sebenar 40 m. Berapakah panjang pada lukisan dalam cm?",
    ["20 cm", "2 cm", "200 cm", "80 cm"],
    0,
  ],
  ["Easy", "Apakah ciri yang dikekalkan dalam lukisan berskala?", ["Bentuk (sudut sama)", "Saiz (sama besar)", "Warna", "Bahan"], 0],

  ["Medium", "Grid lukisan 2cm, grid objek 1cm, bilangan unit sisi sama. Tentukan skala dalam bentuk 1:n.", ["1 : 0.5", "1 : 2", "1 : 4", "1 : 1"], 0],
  ["Medium", "Grid lukisan bersisi 0.5 cm dan grid objek bersisi 1 cm. Sisi sepadan meliputi bilangan petak yang sama. Tentukan skala dalam bentuk 1:n.", ["1 : 2", "1 : 0.5", "2 : 1", "0.5 : 0.5"], 0],
  ["Medium", "Pada lukisan, segi tiga K′L′N′ bersudut tegak di L′, K′L′ = 1.5 cm dan L′N′ = 2 cm. Sisi sepadan KN pada objek ialah 5 cm. Tentukan skala dalam bentuk 1:n.", ["1 : 2", "1 : 0.5", "1 : 5", "1 : 4"], 0],
  ["Medium", "Peta negeri Johor skala 1cm:10km, jarak Kluang-Ayer Hitam 2cm pada peta. Hitung jarak sebenar.", ["20 km", "10 km", "2 km", "12 km"], 0],
  ["Medium", "Poster 24cm panjang dan 8cm lebar dilukis dengan skala 1:4. Hitung panjang lukisan berskala.", ["6 cm", "96 cm", "24 cm", "4 cm"], 0],
  ["Medium", "Poster berukuran 24 cm × 8 cm dilukis pada skala 1:4. Hitung lebar lukisan berskala.", ["2 cm", "8 cm", "32 cm", "4 cm"], 0],
  ["Medium", "Peta skala 1:400 000, sungai 2.5cm pada peta. Hitung jarak sebenar (km).", ["10 km", "4 km", "100 km", "1 km"], 0],
  ["Medium", "Siew Lin lukis segi tiga skala 1:1/3, hipotenus lukisan 18cm. Hitung hipotenus sebenar.", ["6 cm", "54 cm", "3 cm", "18 cm"], 0],
  ["Medium", "Bilik segi empat tepat 7cm x 5cm skala 1:400. Hitung luas sebenar (m²).", ["560 m²", "35 m²", "1 400 m²", "280 m²"], 0],
  ["Medium", "Poligon sekata mempunyai sudut peluaran 36° dan panjang sisi sebenar 10 cm. Pada skala 1:5, hitung perimeter lukisan.", ["20 cm", "50 cm", "100 cm", "10 cm"], 0],
  ["Medium", "Bilik 3.5m x 5.2m, lukisan berskala 1:50. Hitung perimeter lukisan dalam cm.", ["34.8 cm", "17.4 cm", "69.6 cm", "350 cm"], 0],
  ["Medium", "Padang segi empat tepat skala 1:2000, luas sebenar dikira daripada lukisan. Jika lukisan 3cm x 6cm, hitung luas sebenar (m²).", ["7 200 m²", "3 600 m²", "18 m²", "360 m²"], 0],
  [
    "Medium",
    "Padang segi empat tepat dilukis 3 cm × 6 cm pada skala 1:2000. Rumput dipotong pada kadar 400 m² setiap 8 minit. Hitung masa untuk memotong seluruh padang.",
    ["144 minit", "100 minit", "72 minit", "200 minit"],
    0,
  ],
  ["Medium", "Bintulu-Miri 4cm pada peta skala 1cm:50km. Hitung jarak sebenar.", ["200 km", "50 km", "150 km", "20 km"], 0],
  ["Medium", "Jarak sebenar Bintulu–Miri ialah 200 km. Peta baharu menggunakan skala 1:2 000 000. Hitung jarak pada peta dalam cm.", ["10 cm", "4 cm", "20 cm", "100 cm"], 0],
  [
    "Medium",
    "Jarak perjalanan Bintulu–Miri ialah 200 km. Jika kelajuan purata 80 km/j, hitung masa perjalanan.",
    ["2.5 jam", "2 jam", "3 jam", "1.5 jam"],
    0,
  ],
  ["Medium", "Bilik stor pada lukisan skala 1:400 berukuran 2cm x 3cm. Hitung luas sebenar (m²).", ["96 m²", "24 m²", "600 m²", "48 m²"], 0],
  ["Medium", "Sebuah bangunan berbentuk kuboid mempunyai tapak 8 m × 12 m dan tinggi 3.75 m. Hitung isi padu bangunan.", ["360 m³", "96 m³", "45 m³", "180 m³"], 0],
  ["Medium", "Lukisan bunga menggunakan grid bersisi 1 cm; objek menggunakan grid bersisi 1.5 cm. Sisi sepadan meliputi bilangan petak yang sama. Tentukan skala lukisan:objek dalam bentuk 1:n.", ["1 : 1.5", "1 : 0.5", "1 : 1", "1 : 3"], 0],
  ["Medium", "Lukisan bunga menggunakan grid bersisi 1 cm; objek menggunakan grid bersisi 0.5 cm. Sisi sepadan meliputi bilangan petak yang sama. Tentukan skala lukisan:objek dalam bentuk 1:n.", ["1 : 0.5", "1 : 2", "1 : 1", "1 : 4"], 0],

  ["Hard", "Segi tiga P ialah lukisan berskala bagi segi tiga Q. Luas P = 112.5 cm² dan luas Q = 4.5 cm². Jika skala P:Q ialah 1:n, hitung n.", ["0.2", "5", "25", "0.04"], 0],
  ["Hard", "Bulatan berpusat O, diameter 6cm pada lukisan, skala 1:3. Hitung diameter sebenar.", ["18 cm", "2 cm", "9 cm", "6 cm"], 0],
  ["Hard", "Jarak Kuching–Kota Kinabalu pada peta ialah 5.4 cm, dengan skala 1 cm:150 km. Penerbangan mengambil masa dari 12:40 hingga 14:10 pada hari yang sama. Anggap jarak penerbangan sama dengan jarak peta yang ditukar. Hitung laju purata.", ["540 km/j", "810 km/j", "270 km/j", "150 km/j"], 0],
  ["Hard", "Jubin A berukuran 30 cm × 30 cm berharga RM2.80 sekeping; jubin B berukuran 50 cm × 50 cm berharga RM6 sekeping. Abaikan pembaziran dan kos pemasangan. Jubin manakah lebih murah bagi setiap m²?", ["Jubin B", "Jubin A", "Kedua-duanya sama", "Tidak dapat ditentukan"], 0],
  ["Hard", "Lukisan kolam bulat mempunyai jejari 2 cm pada skala 1:2000. Hitung luas sebenar kepada 1 tempat perpuluhan dalam m². Gunakan π = 22/7.", ["5 028.6 m²", "12.6 m²", "400.0 m²", "1 600.0 m²"], 0],
  ["Hard", "Padang bola sepak berbentuk segi empat tepat berukuran 7 cm × 12 cm pada lukisan skala 1:1000. Hitung luas sebenar.", ["8 400 m²", "84 m²", "840 m²", "10 080 m²"], 0],
  ["Hard", "Padang sebenar berukuran 70 m × 120 m. Antara skala berikut, pilih lukisan terbesar yang muat pada kertas A4 berukuran 21 cm × 29.7 cm. Abaikan margin.", ["1 : 500", "1 : 400", "1 : 1000", "1 : 2000"], 0],
  ["Hard", "Separuh padang 70 m × 120 m diperuntukkan untuk khemah 5 m × 4 m. Abaikan laluan, ruang antara khemah dan susunan. Anggarkan bilangan khemah berdasarkan luas sahaja.", ["210 khemah", "10 khemah", "100 khemah", "50 khemah"], 0],
  ["Hard", "Sewa khemah RM100/hari, diskaun 25% jika sewa 5 hari atau lebih, disewa seminggu (7 hari). Hitung jumlah sewa seunit khemah.", ["RM525", "RM700", "RM600", "RM525.50"], 0],
  ["Hard", "Segi empat tepat S berukuran 3 cm × 5 cm dan segi empat tepat T berukuran 6 cm × 10 cm. Tentukan nisbah panjang sisi sepadan S:T.", ["1 : 2", "2 : 1", "1 : 4", "4 : 1"], 0],
  ["Hard", "Segi empat tepat S berukuran 3 cm × 5 cm dan segi empat tepat T berukuran 6 cm × 10 cm. Tentukan nisbah luas S:T.", ["1 : 4", "1 : 2", "1 : 8", "1 : 16"], 0],
  ["Hard", "Apakah kesimpulan tepat tentang nisbah luas berbanding nisbah panjang dalam lukisan berskala?", ["Nisbah luas = (nisbah panjang)²", "Nisbah luas = nisbah panjang", "Nisbah luas = 2 x nisbah panjang", "Tiada perkaitan"], 0],
  ["Hard", "Bagi bentuk tiga dimensi, bagaimanakah nisbah isi padu berkait dengan nisbah panjang skala?", ["Nisbah isi padu = (nisbah panjang)³", "Nisbah isi padu = nisbah panjang", "Nisbah isi padu = (nisbah panjang)²", "Tiada perkaitan"], 0],
  [
    "Hard",
    "Pada skala 1:400, seorang murid mendarab luas lukisan dengan 400 untuk mencari luas objek. Dengan unit luas yang sama, apakah pembetulannya?",
    [
      "Darab dengan 400²",
      "Darab dengan 400",
      "Bahagi dengan 400²",
      "Darab dengan 2 × 400",
    ],
    0,
  ],
  ["Hard", "Lukisan bilik stor berukuran 2 cm × 3 cm pada skala 1:400. Tapak sebuah kedai berukuran 8 m × 12 m. Hitung nisbah luas tapak kedai kepada luas sebenar bilik stor.", ["1 : 1", "10 : 1", "4 : 1", "2 : 1"], 0],
]);

export const mathF3C4QuizzesBM: QuizQuestion[] = buildForm3MathQuizSets(4, mathF3C4QuestionBankBM);
