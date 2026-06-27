import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c2-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 2",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C2FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Angka Bererti (Cards 1-20)
  ["Apakah maksud angka bererti?", "Digit yang menunjukkan tahap kejituan suatu ukuran."],
  ["Adakah semua digit bukan sifar angka bererti?", "Ya"],
  ["Adakah sifar antara dua digit bukan sifar angka bererti?", "Ya"],
  ["Adakah sifar sebelum digit bukan sifar pertama dalam perpuluhan angka bererti?", "Tidak"],
  ["Adakah sifar di hujung integer angka bererti?", "Tidak, melainkan tahap kejituan dinyatakan"],
  ["Berapa a.b. dalam 2 763?", "4 a.b."],
  ["Berapa a.b. dalam 60 007?", "5 a.b."],
  ["Berapa a.b. dalam 50.0042?", "6 a.b."],
  ["Berapa a.b. dalam 0.007?", "1 a.b."],
  ["Berapa a.b. dalam 0.005020?", "4 a.b."],
  ["Bundarkan 63 479 kepada 2 a.b.", "63 000"],
  ["Bundarkan 2 476 kepada 2 a.b.", "2 500"],
  ["Bundarkan 6 953 kepada 2 a.b.", "7 000"],
  ["Bundarkan 0.008025 kepada 3 a.b.", "0.00803"],
  ["Bundarkan 0.008025 kepada 2 a.b.", "0.0080"],
  ["Apakah perbezaan a.b. dengan tempat perpuluhan?", "a.b. kira digit bererti; tempat perpuluhan kira digit selepas titik perpuluhan"],
  ["Bundarkan 38 279 kepada ratus terhampir.", "38 300"],
  ["Bundarkan 38 279 kepada ribu terhampir.", "38 000"],
  ["Apakah kesilapan lazim a.b. dalam perpuluhan?", "Mengira sifar awal sebagai angka bererti"],
  ["Apakah tip semasa membundar kepada a.b.?", "Garis bawah digit bererti yang dikehendaki dahulu"],

  // Deck 2: Bentuk Piawai - Penulisan (Cards 21-40)
  ["Apakah format bentuk piawai?", "A x 10^n, dengan 1 ≤ A < 10, n integer"],
  ["Tukar 28 kepada bentuk piawai.", "2.8 x 10^1"],
  ["Tukar 280 kepada bentuk piawai.", "2.8 x 10^2"],
  ["Tukar 2 805.3 kepada bentuk piawai.", "2.8053 x 10^3"],
  ["Tukar 0.03025 kepada bentuk piawai.", "3.025 x 10^-2"],
  ["Tukar 0.003005 kepada bentuk piawai.", "3.005 x 10^-3"],
  ["Tukar 4.17 x 10^5 kepada nombor tunggal.", "417 000"],
  ["Tukar 8.063 x 10^-5 kepada nombor tunggal.", "0.00008063"],
  ["Apakah tanda n jika nombor ≥ 10?", "Positif"],
  ["Apakah tanda n jika nombor < 1?", "Negatif"],
  ["Apakah nilai A bagi 9.5 x 10^9?", "9.5"],
  ["Mengapa bentuk piawai digunakan dalam sains?", "Memudahkan penulisan nombor sangat besar/kecil"],
  ["Berikan contoh penggunaan bentuk piawai dalam astronomi.", "Jarak antara bintang/planet"],
  ["Apakah maksud awalan 'nano'?", "0.000 000 001 atau 10^-9"],
  ["Apakah maksud awalan 'giga'?", "1 000 000 000 atau 10^9"],
  ["Tentukan 3050 terabait dalam bait, bentuk piawai.", "3.05 x 10^15 bait"],
  ["Apakah hukum digunakan untuk gabung kuasa 10 semasa darab?", "am x an = a^(m+n)"],
  ["Apakah julat A yang sah dalam bentuk piawai?", "1 ≤ A < 10"],
  ["Adakah 12.5 x 10^3 bentuk piawai yang sah?", "Tidak, kerana A=12.5 bukan dalam julat 1-10"],
  ["Tukar 35 kepada bentuk piawai.", "3.5 x 10^1"],

  // Deck 3: Operasi dan Penyelesaian Masalah (Cards 41-60)
  ["Apakah syarat menambah/menolak bentuk piawai?", "Kuasa 10 mesti sama"],
  ["Formula tambah bentuk piawai (kuasa sama).", "S x10^n + T x10^n = (S+T) x10^n"],
  ["Formula darab bentuk piawai.", "(Sx10^m) x (Tx10^n) = (SxT) x10^(m+n)"],
  ["Formula bahagi bentuk piawai.", "(Sx10^m) ÷ (Tx10^n) = (S÷T) x10^(m-n)"],
  ["Hitung 2.73x10^3 + 5.92x10^3.", "8.65 x 10^3"],
  ["Hitung 7.02x10^4 + 2.17x10^5.", "2.872 x 10^5"],
  ["Hitung 9.45x10^6 - 3.24x10^5.", "9.126 x 10^6"],
  ["Hitung 3x10^5 x 4.9x10^2.", "1.47 x 10^8"],
  ["Hitung (5.9x10^5) ÷ (2x10^2).", "2.95 x 10^3"],
  ["Apakah langkah pertama menambah bentuk piawai dengan kuasa berbeza?", "Samakan kuasa 10 dahulu"],
  ["Apakah kesilapan lazim semasa tambah bentuk piawai?", "Menambah kuasa 10 sedangkan sepatutnya hanya disamakan"],
  ["PQR bersudut tegak, PR=3.5x10^2m, QR=2.1x10^2m. Cari PQ.", "2.8 x 10^2 m (Teorem Pythagoras)"],
  ["Hitung luas ΔPQR jika PQ=2.8x10^2m, QR=2.1x10^2m bersudut tegak di Q.", "2.94 x 10^4 m^2"],
  ["Jika kos tanah RM45/m^2 dan luas 2.94x10^4m^2, hitung jumlah kos.", "RM1 323 000"],
  ["Apakah tip menyemak bentuk piawai selepas pengiraan?", "Pastikan A berada dalam julat 1 ≤ A < 10"],
  ["Berikan satu aplikasi bentuk piawai dalam IT.", "Kapasiti storan data (terabait, gigabait)"],
  ["Apakah jejari bumi jika diameter 1.2742x10^4 km?", "6.371 x 10^3 km"],
  ["Apakah formula luas permukaan sfera?", "4πj^2, j ialah jejari"],
  ["Apakah kesilapan lazim semasa darab bentuk piawai?", "Tertinggal menambah indeks kuasa 10"],
  ["Apakah langkah akhir selepas pengiraan bentuk piawai?", "Bundarkan kepada angka bererti dikehendaki dan pastikan format A x 10^n sah"],
]);
