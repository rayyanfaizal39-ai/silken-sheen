import type { Flashcard } from "@/data/content";

// Form 2 Maths Chapter 1: 1.1 Patterns, 1.2 Sequences, 1.3 Patterns and Sequences.
// Each subtopic contains 4 recognition, 11 practice and 5 application/error cards.
// Maintain IDs to preserve existing flashcard progress. Do not regenerate from generic templates.
const cards: ReadonlyArray<readonly [string, string]> = [
  [
    "Yang manakah berganda dua: 3, 6, 12, 24 atau 3, 6, 9, 12?",
    "3, 6, 12, 24. Darab setiap sebutan dengan 2."
  ],
  [
    "Corak titik 1, 3, 6, 10, ... Berapa titik seterusnya?",
    "15 titik. Tambah 5 kepada 10."
  ],
  [
    "Dalam Segi Tiga Pascal, apakah nombor di bawah 3 dan 3?",
    "6, hasil tambah dua nombor di atas."
  ],
  [
    "Bagi 1, 1, 2, 3, 5, 8, apakah peraturannya?",
    "Tambah dua sebutan sebelumnya."
  ],
  [
    "Sambung: −8, −3, 2, 7, __.",
    "12. Tambah 5 setiap kali."
  ],
  [
    "Cari dua sebutan seterusnya: 96, 48, 24, __, __.",
    "12, 6. Bahagi dengan 2 setiap kali."
  ],
  [
    "Sambung: 2.5, 2.0, 1.5, __, __.",
    "1.0, 0.5. Tolak 0.5 setiap kali."
  ],
  [
    "Cari sebutan keenam: 4, 9, 14, 19, ...",
    "29. Sebutan kelima 24, keenam 29."
  ],
  [
    "Apakah nombor selepas 5, 15, 45, 135?",
    "405. Darab 3."
  ],
  [
    "Lengkapkan: −12, −6, 0, __, 12.",
    "6. Tambah 6."
  ],
  [
    "Segi Tiga Pascal: lengkapkan 1, 4, __, 4, 1.",
    "6. Tambah 3 + 3 daripada baris sebelumnya."
  ],
  [
    "Apakah nombor segi tiga selepas 21?",
    "28. Perbezaan berturutan ialah 2, 3, 4, 5, 6, 7."
  ],
  [
    "Sambung corak Fibonacci: 2, 3, 5, 8, 13, __.",
    "21. Tambah dua sebutan sebelumnya."
  ],
  [
    "Cari sebutan hilang: 81, 27, __, 3, 1.",
    "9. Bahagi 3 setiap kali."
  ],
  [
    "Apakah nombor selepas 1, 4, 9, 16, 25, __?",
    "36 = 6². Ini nombor kuasa dua berturutan."
  ],
  [
    "Murid kata 4, 8, 16, 32 mengikut +4. Betul?",
    "Tidak. Peraturannya ×2."
  ],
  [
    "Cari ralat: 1, 3, 6, 10, 14 nombor segi tiga.",
    "Sebutan kelima sepatutnya 15, bukannya 14."
  ],
  [
    "Murid menulis Fibonacci 3, 5, 8, 13, 20. Betulkan.",
    "Sebutan seterusnya 21 kerana 8 + 13 = 21."
  ],
  [
    "Corak jubin tambah 4 setiap tahap. Tahap 1 ada 5. Tahap 4?",
    "17 jubin: 5 + 3 × 4."
  ],
  [
    "Pokok 6 cm tumbuh 2 cm seminggu. Tinggi selepas 4 minggu?",
    "14 cm: 6 + 4 × 2."
  ],
  [
    "Yang mana jujukan aritmetik: 2, 5, 8, 11 atau 2, 4, 8, 16?",
    "2, 5, 8, 11. Bezanya sentiasa +3."
  ],
  [
    "Adakah 50, 40, 30, 20 mempunyai beza tetap?",
    "Ya, setiap beza ialah −10."
  ],
  [
    "Apakah kedudukan sebutan sebelum T₈?",
    "T₇, iaitu sebutan ketujuh."
  ],
  [
    "Bagi 1, 4, 9, 16, apakah model bentuk yang sesuai?",
    "Petak bersisi 1, 2, 3 dan 4 unit."
  ],
  [
    "Lengkapkan: 7, 11, __, 19, 23.",
    "15. Beza sepunya = 4."
  ],
  [
    "Cari T₇ jika T₁ = 3 dan beza +5.",
    "33: 3 + 6(5)."
  ],
  [
    "Cari T₆: 90, 82, 74, ...",
    "50: 90 − 5(8)."
  ],
  [
    "Cari T₅: 2, 6, 18, 54, ...",
    "162: darab 3 empat kali daripada T₁."
  ],
  [
    "Apakah T₄ bagi 64, 32, 16, ...?",
    "8. Bahagi dua setiap kali."
  ],
  [
    "Jujukan bermula −5 dan tambah 7. Cari T₄.",
    "16: −5 + 3(7)."
  ],
  [
    "Cari sebutan hilang: 3, __, 15, 21, 27.",
    "9. Tambah 6 setiap kali."
  ],
  [
    "Cari T₁₀ jika T₁ = 2 dan beza sepunya 3.",
    "29: 2 + 9(3)."
  ],
  [
    "Cari kedudukan 25 dalam 5, 9, 13, 17, ...",
    "T₆. Selesaikan 5 + 4(n−1) = 25."
  ],
  [
    "Cari T₆: 1.2, 2.4, 3.6, ...",
    "7.2. Tambah 1.2 lima kali pada T₁."
  ],
  [
    "Jujukan tolak 6: 31, 25, 19, ... Cari T₈.",
    "−11: 31 − 7(6)."
  ],
  [
    "Cari ralat: 5, 10, 15, ... mempunyai T₆ = 25.",
    "Salah. T₆ = 30."
  ],
  [
    "Mengapa 2, 5, 9, 14 bukan jujukan aritmetik?",
    "Bezanya 3, 4, 5; tidak tetap."
  ],
  [
    "Murid kira T₅ = 20 bagi 3, 7, 11, ... Betul?",
    "Tidak. T₅ = 19: 3, 7, 11, 15, 19."
  ],
  [
    "Bas bertolak setiap 15 minit mulai 08:00. Bas kelima?",
    "09:00. Empat selang selepas bas pertama."
  ],
  [
    "Markah pusingan 1–3 ialah 10, 15, 20. Pusingan 8?",
    "45 markah: 10 + 7(5)."
  ],
  [
    "Bagi 4, 7, 10, 13, ... apakah beza sepunya?",
    "3."
  ],
  [
    "Formula manakah menghasilkan 4, 7, 10, 13 bagi n bermula 1?",
    "Tₙ = 3n + 1."
  ],
  [
    "Apakah 3 sebutan awal bagi 2n + 3 apabila n = 1, 2, 3?",
    "5, 7, 9."
  ],
  [
    "Jika Tₙ = 5n − 2, berapakah T₁?",
    "3: 5(1) − 2."
  ],
  [
    "Cari T₈ bagi Tₙ = 3n + 4.",
    "28: 3(8) + 4."
  ],
  [
    "Cari formula bagi 6, 10, 14, 18, ...",
    "Tₙ = 4n + 2, n bermula 1."
  ],
  [
    "Cari formula bagi 12, 9, 6, 3, ...",
    "Tₙ = 15 − 3n, n bermula 1."
  ],
  [
    "41 ialah sebutan ke berapa bagi Tₙ = 4n + 1?",
    "T₁₀: 4n + 1 = 41, maka n = 10."
  ],
  [
    "Tₙ = 2n − 7. Cari T₆.",
    "5: 2(6) − 7."
  ],
  [
    "Tₙ = 7n. Berapa jumlah T₁ dan T₄?",
    "35: 7 + 28."
  ],
  [
    "Sebutan ke-n ialah 5n + 2. Cari sebutan ke-12.",
    "62: 5(12) + 2."
  ],
  [
    "Cari n jika Tₙ = 3n − 1 dan Tₙ = 20.",
    "n = 7: 3n − 1 = 20."
  ],
  [
    "Dewan ada 8 tempat duduk pada baris 1, bertambah 2. Baris 10?",
    "26 tempat duduk: 8 + 9(2)."
  ],
  [
    "Tangga mempunyai 3, 6, 9, 12 blok. Formula tahap n?",
    "3n blok."
  ],
  [
    "Murid guna Tₙ = 4n + 4 bagi 4, 8, 12, ... Betulkan.",
    "Tₙ = 4n jika sebutan pertama n = 1."
  ],
  [
    "Bagi 1, 9, 17, ... betulkah Tₙ = 1 + 8n dengan n = 1?",
    "Tidak. Guna Tₙ = 8n − 7 atau 1 + 8n jika n = 0."
  ],
  [
    "Cari ralat: T₅ bagi 3n + 2 ialah 3 + 5 + 2.",
    "Gantikan n = 5: 3(5) + 2 = 17."
  ],
  [
    "Harga tiket naik RM2 setahun dari RM10 pada tahun 1. Tahun 6?",
    "RM20: 10 + 5(2)."
  ],
  [
    "Simpan RM5 minggu 1, tambah RM3 setiap minggu. Minggu 8?",
    "RM26: 5 + 7(3)."
  ],
  [
    "Adakah 2n + 1 ganjil bagi semua n bulat bukan negatif?",
    "Ya. 2n genap, jadi 2n + 1 ganjil."
  ]
];

export const mathF2C1FlashcardsBM: Flashcard[] = cards.map(([front, back], index) => ({
  id: `math-f2-c1-bm-f${index + 1}`,
  subjectId: "math",
  form: "Form 2",
  chapter: "Chapter 1",
  lang: "bm",
  front,
  back,
}));
