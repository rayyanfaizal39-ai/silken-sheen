import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c9-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 9",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C9FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: y=mx+c dan Bentuk Lain (Cards 1-20)
  ["Apakah maksud m dalam y=mx+c?", "Kecerunan"],
  ["Apakah maksud c dalam y=mx+c?", "Pintasan-y"],
  ["Tentukan kecerunan y=2x+9.", "2"],
  ["Tentukan pintasan-y y=2x+9.", "9"],
  ["Apakah kecerunan garis y=6?", "0"],
  ["Apakah kecerunan garis x=2?", "Tak tertakrif"],
  ["Garis y=h selari dengan paksi apa?", "Paksi-x"],
  ["Garis x=h selari dengan paksi apa?", "Paksi-y"],
  ["Apakah maksud a dalam x/a+y/b=1?", "Pintasan-x"],
  ["Apakah maksud b dalam x/a+y/b=1?", "Pintasan-y"],
  ["Tukar 2x+3y=12 kepada x/a+y/b=1.", "x/6 + y/4 = 1"],
  ["Tukar 2x+3y=12 kepada y=mx+c.", "y = -2/3x + 4"],
  ["Apakah pekali y yang mesti dalam y=mx+c?", "+1"],
  ["3y=-2x+12. Kecerunan?", "-2/3"],
  ["3y=-2x+12. Pintasan-y?", "4"],
  ["Tukar x/6+y/3=1 kepada ax+by=c.", "x + 2y = 6"],
  ["Bagaimana tukar x/a+y/b=1 kepada bentuk ax+by=c?", "Darab dengan gandaan sepunya terkecil a dan b"],
  ["Siapakah bapa geometri Yunani?", "Euclid"],
  ["Apakah graf bagi fungsi linear y=mx+c?", "Satu garis lurus"],
  ["Apakah bentuk umum persamaan garis lurus selain y=mx+c?", "ax+by=c dan x/a+y/b=1"],

  // Deck 2: Titik pada Garis dan Garis Selari (Cards 21-40)
  ["Bagaimana semak titik terletak pada garis lurus?", "Gantikan koordinat, semak kiri=kanan"],
  ["P(2,8), y=3x+2. Adakah P pada garis?", "Ya (3(2)+2=8)"],
  ["P(-4,2), 3x-2y=12. Adakah P pada garis?", "Tidak (-16≠12)"],
  ["Apakah syarat dua garis selari?", "Kecerunan kedua-duanya sama"],
  ["Adakah y=3x+5 selari 6x-2y=9?", "Ya (kecerunan sama=3)"],
  ["Adakah y=3x+8 selari 6y=3x-9?", "Tidak (kecerunan 3 vs 1/2)"],
  ["4x+3y=18 selari 2x+hy=20. Cari h.", "h = 3/2"],
  ["Apakah formula kecerunan dua titik?", "(y2-y1)/(x2-x1)"],
  ["Cari kecerunan melalui (-1,5) dan (2,-7).", "-4"],
  ["Apakah maksud garis lurus mempunyai kecerunan sama?", "Garis-garis itu selari"],
  ["3x+5y=15. Pintasan-x (h)?", "5"],
  ["3x+5y=15. Pintasan-y (k)?", "3"],
  ["Apakah formula kecerunan daripada pintasan?", "Kecerunan = -(pintasan-y/pintasan-x)"],
  ["Bagi 3x+5y=15, kecerunan?", "-3/5"],
  ["Apakah kesilapan lazim semasa baca kecerunan?", "Lupa tukar pekali y kepada +1 dahulu"],
  ["Bagaimana sahkan dua garis tidak selari?", "Bandingkan kecerunan; jika berbeza, tidak selari"],
  ["2x+3y=3 dan 2x+6y=12. Selari?", "Tidak (kecerunan -2/3 vs -1/3)"],
  ["y=2x+1 dan 8x-4y=5. Selari?", "Ya (kecerunan 2 dan 2)"],
  ["Apakah maksud 'kecerunan tak tertakrif'?", "Garis menegak (selari paksi-y)"],
  ["Apakah maksud 'kecerunan sifar'?", "Garis mendatar (selari paksi-x)"],

  // Deck 3: Persamaan Garis dan Titik Persilangan (Cards 41-60)
  ["Apakah formula persamaan garis lurus asas?", "y = mx + c"],
  ["Bagaimana cari persamaan garis dengan kecerunan dan satu titik?", "Gantikan m, x, y ke y=mx+c untuk cari c"],
  ["Cari persamaan garis kecerunan 1/2 melalui (6,8).", "y = (1/2)x + 5"],
  ["Bagaimana cari persamaan garis melalui dua titik?", "Cari m dahulu, kemudian cari c menggunakan satu titik"],
  ["Cari persamaan garis melalui (-1,5) dan (2,-7).", "y = -4x + 1"],
  ["Cari persamaan garis selari y=-2x+6 melalui (5,4).", "y = -2x + 14"],
  ["Apakah dua kaedah cari titik persilangan?", "Lukis graf atau selesaikan persamaan serentak"],
  ["Apakah dua kaedah persamaan serentak?", "Penggantian dan penghapusan"],
  ["Cari titik persilangan 2x+y=5 dan x+2y=1.", "(3, -1)"],
  ["Apakah langkah pertama kaedah penggantian?", "Asingkan satu pemboleh ubah daripada satu persamaan"],
  ["Apakah langkah pertama kaedah penghapusan?", "Samakan pekali salah satu pemboleh ubah"],
  ["Bagaimana sahkan jawapan titik persilangan?", "Gantikan semula ke kedua-dua persamaan asal"],
  ["Garis selari paksi-x melalui (2,4) dan (0,4). Persamaan?", "y = 4"],
  ["Garis selari paksi-y melalui (2,4) dan (2,0). Persamaan?", "x = 2"],
  ["Apakah aplikasi sebenar persamaan garis lurus?", "Pembinaan, kejuruteraan, pemetaan"],
  ["Apakah contoh struktur garis condong dalam sejarah Malaysia?", "Menara Jam Condong Teluk Intan"],
  ["Apakah kesilapan lazim mencari kecerunan dua titik?", "Tersilap tanda atau urutan (x2-x1) vs (x1-x2)"],
  ["Bagaimana tentukan persamaan garis selari dengan paksi-y melalui titik tertentu?", "Gunakan nilai x titik itu sebagai persamaan x=nilai"],
  ["Apakah kalkulator dibenarkan untuk apa dalam bab ini?", "Hanya untuk menyemak jawapan, bukan menyelesaikan"],
  ["Apakah maksud 'persamaan serentak'?", "Dua atau lebih persamaan diselesaikan bersama untuk satu set jawapan"],
]);
