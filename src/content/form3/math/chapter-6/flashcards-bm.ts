import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c6-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 6",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C6FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Sudut Lilitan dan Pusat (Cards 1-20)
  ["Apakah sifat sudut lilitan lengkok sama?", "Sama besar"],
  ["Apakah formula sudut pusat berbanding sudut lilitan lengkok sama?", "Sudut pusat = 2 x sudut lilitan"],
  ["Apakah sudut lilitan dicangkum diameter?", "90°"],
  ["Apakah lengkok minor?", "Lengkok yang lebih pendek antara dua titik"],
  ["Apakah lengkok major?", "Lengkok yang lebih panjang antara dua titik"],
  ["Sudut pusat 80°, sudut lilitan lengkok sama?", "40°"],
  ["Sudut lilitan 35°, sudut pusat lengkok sama?", "70°"],
  ["Bagaimana cari sudut pusat major jika sudut minor diketahui?", "360° - sudut pusat minor"],
  ["Apakah hubungan sudut lilitan dengan panjang lengkok?", "Berkadaran terus dengan panjang lengkok"],
  ["Jika lengkok PR=lengkok QS, apakah hubungan sudutnya?", "Sudut yang dicangkum adalah sama"],
  ["PR&QS diameter, ∠QRS=90°, ∠QPR=45°. ∠PQS=?", "45°"],
  ["Apakah maksud 'perentas'?", "Garis lurus yang menyambung dua titik pada lilitan"],
  ["Apakah maksud 'lilitan'?", "Garis sempadan luar bulatan"],
  ["Apakah kesilapan lazim mengenai sudut pusat?", "Lupa kali/bahagi 2 dengan sudut lilitan"],
  ["Bolehkah sudut lilitan dicangkum lengkok berbeza sama besar?", "Tidak, melainkan lengkok sama panjang"],
  ["Apakah sudut semibulatan?", "90° (sudut lilitan dicangkum diameter)"],
  ["Jika ∠PRQ=∠PSQ, apakah sebabnya?", "Kedua dicangkum oleh lengkok sama (PQ)"],
  ["Apakah jumlah sudut pusat penuh bulatan?", "360°"],
  ["Apakah maksud sudut major?", "Sudut yang dicangkum oleh lengkok major"],
  ["Apakah maksud sudut minor?", "Sudut yang dicangkum oleh lengkok minor"],

  // Deck 2: Sisi Empat Kitaran (Cards 21-40)
  ["Apakah sisi empat kitaran?", "Sisi empat dengan semua bucu pada lilitan bulatan"],
  ["Apakah jumlah sudut bertentangan sisi empat kitaran?", "180°"],
  ["Apakah hubungan sudut peluaran dengan sudut pedalaman bertentangan sepadan?", "Sama nilai"],
  ["KLMN kitaran, ∠LKN=104°, ∠LMN=8x. Hitung x.", "9.5°"],
  ["∠KNM=98°, ∠KLM=4y. Hitung y.", "20.5°"],
  ["PQRS kitaran, ∠PQR=4y, ∠PSR=2y. Hitung y.", "30°"],
  ["Daripada soalan di atas, ∠PST=?", "120°"],
  ["Bagaimana sahkan sisi empat ialah kitaran?", "Pastikan semua 4 bucu terletak pada lilitan"],
  ["Apakah kesilapan lazim sisi empat kitaran?", "Mengelirukan sudut peluaran dengan sudut bersebelahan"],
  ["Apakah sudut bertentangan dalam PQRS?", "∠P&∠R, ∠Q&∠S"],
  ["Jika ∠A=70°, apakah ∠C dalam sisi empat kitaran?", "110° (180-70)"],
  ["Jika ∠B=95°, apakah ∠D dalam sisi empat kitaran?", "85° (180-95)"],
  ["Apakah sudut peluaran?", "Sudut dibentuk apabila satu sisi sisi empat dipanjangkan"],
  ["Sudut peluaran 84°, apakah sudut pedalaman bertentangan sepadan?", "84°"],
  ["Apakah ciri yang membezakan sisi empat kitaran daripada sisi empat biasa?", "Semua bucu mesti pada lilitan bulatan yang sama"],
  ["Bolehkah sisi empat tidak kitaran guna sifat 180°?", "Tidak, hanya sah untuk sisi empat kitaran"],
  ["∠ADB=30°, ∠ABD=20° dalam segi tiga ABD. Apakah ∠AaBD jumlah segi tiga?", "130° (180-30-20)"],
  ["Apakah aplikasi sisi empat kitaran dalam soalan sebenar?", "Mengira sudut tidak diketahui menggunakan hubungan 180°"],
  ["Apakah langkah pertama menyelesaikan masalah sisi empat kitaran?", "Kenal pasti pasangan sudut bertentangan"],
  ["Apakah formula umum sisi empat kitaran?", "∠A+∠C=180°, ∠B+∠D=180°"],

  // Deck 3: Tangen kepada Bulatan (Cards 41-60)
  ["Apakah tangen kepada bulatan?", "Garis lurus yang menyentuh bulatan pada satu titik sahaja"],
  ["Apakah titik ketangenan?", "Titik sentuhan antara tangen dan bulatan"],
  ["Apakah sudut antara tangen dan jejari pada titik ketangenan?", "90°"],
  ["Adakah dua tangen dari titik luar sama panjang?", "Ya"],
  ["Apakah sudut tangen-perentas?", "Sama dengan sudut tembereng selang-seli yang dicangkum perentas"],
  ["Apakah tembereng selang-seli?", "Bahagian bulatan bertentangan dengan sudut tangen-perentas yang dirujuk"],
  ["ABC garis lurus tangen, AB=OB, ∠BAO=28°. Hitung x.", "48° (contoh buku teks)"],
  ["Tangen PQ=14cm. Tangen RQ dari titik sama=?", "14 cm"],
  ["Apakah tangen sepunya?", "Garis lurus yang menjadi tangen kepada dua bulatan serentak"],
  ["Berapa tangen sepunya jika dua bulatan tidak bersentuhan?", "4"],
  ["Berapa tangen sepunya jika dua bulatan bersentuhan luar?", "3"],
  ["Berapa tangen sepunya jika dua bulatan bersilang?", "2"],
  ["Berapa tangen sepunya jika dua bulatan bertindih dalam?", "1"],
  ["Apakah ciri segi tiga dibentuk oleh dua tangen dan pusat?", "Kongruen (sisi-sisi-sisi)"],
  ["Apakah formula mencari jejari menggunakan tan apabila sudut dan jarak tangen diketahui?", "Jejari = jarak x tan(sudut)"],
  ["Apakah kesilapan lazim sudut tangen-jejari?", "Lupa ia mesti 90°"],
  ["Apakah aplikasi sebenar tangen kepada bulatan?", "Roda kenderaan menyentuh jalan raya pada satu titik"],
  ["Bagaimana cari sudut pada tembereng selang-seli?", "Sama dengan sudut tangen-perentas yang dicangkum perentas sama"],
  ["Apakah teorem yang menerangkan sudut tangen-perentas?", "Teorem Sudut Tembereng Selang-seli (Alternate Segment Theorem)"],
  ["Apakah langkah utama menyelesaikan masalah tangen kompleks?", "Kenal pasti sudut tegak (90°) dahulu, kemudian gunakan trigonometri/Pythagoras"],
]);
