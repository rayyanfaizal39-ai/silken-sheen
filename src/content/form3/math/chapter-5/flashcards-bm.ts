import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c5-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 5",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C5FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Sisi dan Takrif Asas (Cards 1-20)
  ["Apakah hipotenus?", "Sisi terpanjang, bertentangan dengan sudut 90°"],
  ["Adakah hipotenus berubah mengikut sudut tirus dirujuk?", "Tidak, kedudukannya tetap"],
  ["Apakah sisi bertentangan?", "Sisi bertentangan dengan sudut tirus yang dirujuk"],
  ["Apakah sisi bersebelahan?", "Sisi yang bersebelahan dengan sudut tirus (bukan hipotenus)"],
  ["Apakah formula sin θ?", "Sisi bertentangan / hipotenus"],
  ["Apakah formula kos θ?", "Sisi bersebelahan / hipotenus"],
  ["Apakah formula tan θ?", "Sisi bertentangan / sisi bersebelahan"],
  ["Apakah hubungan tan θ dengan sin dan kos?", "tan θ = sin θ / kos θ"],
  ["Mengapa nisbah trigonometri sama untuk sudut sama walau saiz segi tiga berbeza?", "Segi tiga adalah serupa (sudut sama, sisi berkadaran)"],
  ["PQR bersudut tegak, PQ=15, QR=8. Hitung PR.", "17 cm"],
  ["Daripada soalan di atas, sin∠PRQ?", "15/17"],
  ["Daripada soalan di atas, kos∠PRQ?", "8/17"],
  ["Daripada soalan di atas, tan∠QPR?", "8/15"],
  ["Jika sin θ=0.6, kos θ=0.8, hitung tan θ.", "0.75"],
  ["Apa terjadi pada sin θ bila θ bertambah 0°-90°?", "Bertambah ke 1"],
  ["Apa terjadi pada kos θ bila θ bertambah 0°-90°?", "Berkurang ke 0"],
  ["Apa terjadi pada tan θ bila θ menghampiri 90°?", "Bertambah ke infiniti"],
  ["Apakah kesilapan lazim mengenal pasti sisi?", "Mengelirukan sisi bersebelahan dengan hipotenus"],
  ["Bolehkah sisi bertentangan jadi sisi bersebelahan?", "Ya, bergantung sudut tirus yang dirujuk"],
  ["Apakah maksud 'sudut tirus'?", "Sudut antara 0° dan 90° (acute angle)"],

  // Deck 2: Sudut Khas dan Kalkulator (Cards 21-40)
  ["Apakah nilai sin 30°?", "1/2"],
  ["Apakah nilai kos 30°?", "√3/2"],
  ["Apakah nilai tan 30°?", "1/√3"],
  ["Apakah nilai sin 45°?", "1/√2"],
  ["Apakah nilai kos 45°?", "1/√2"],
  ["Apakah nilai tan 45°?", "1"],
  ["Apakah nilai sin 60°?", "√3/2"],
  ["Apakah nilai kos 60°?", "1/2"],
  ["Apakah nilai tan 60°?", "√3"],
  ["Bagaimana dapatkan nilai sudut 45° tanpa kalkulator?", "Guna segi tiga bersudut tegak sama kaki (sisi 1,1,√2)"],
  ["Bagaimana dapatkan nilai sudut 30°/60° tanpa kalkulator?", "Bahagi dua segi tiga sama sisi (sisi 2,1,√3)"],
  ["Hitung sin45°+kos45°.", "√2"],
  ["Hitung 3kos30°-2sin60°.", "√3/2"],
  ["1° = berapa minit?", "60 minit"],
  ["Tukar 30.2° kepada darjah-minit.", "30° 12'"],
  ["Tukar 43°30' kepada darjah perpuluhan.", "43.5°"],
  ["Jika sin x=0.8377, hitung x.", "56.9° atau 56°54'"],
  ["Apakah butang kalkulator untuk darjah-minit?", "°' ''"],
  ["Apakah mod kalkulator betul untuk sudut darjah?", "Mod Deg"],
  ["Bila bundarkan saat ke minit?", "Jika unit saat ≥30, tambah 1 minit"],

  // Deck 3: Menyelesaikan Masalah (Cards 41-60)
  ["Tangga bersandar dinding sudut 50°, tinggi 2.5m. Panjang tangga?", "3.26 m"],
  ["Apakah formula umum panjang tangga jika sudut dan tinggi diketahui?", "Panjang = tinggi / sin(sudut)"],
  ["Kuboid: BC=8, CH=5, HE=4. FG=EH=?", "4 cm"],
  ["Daripada kuboid di atas, CG=√(8²+5²)=?", "√89 cm"],
  ["Daripada kuboid di atas, tan∠FCG=?", "4/√89"],
  ["Daripada kuboid di atas, ∠FCG=?", "22.98° atau 22°59'"],
  ["Sudut dongak digunakan untuk apa?", "Mengukur ketinggian objek dari kedudukan rendah"],
  ["Sudut tunduk digunakan untuk apa?", "Mengukur jarak/tinggi dari kedudukan tinggi melihat ke bawah"],
  ["Aisyah lihat tiang sudut dongak 55°, jarak 145m. Jarak mengufuk d?", "d=145kos55°≈83.1m"],
  ["Kapal dilihat dari rumah api sudut tunduk 41°, jarak mengufuk 200m. Tinggi rumah api?", "h=200tan41°≈173.9m"],
  ["Apakah alat sebenar mengukur sudut jarak jauh?", "Teodolit"],
  ["Apakah langkah pertama menyelesaikan masalah trigonometri kompleks?", "Kenal pasti segi tiga bersudut tegak yang relevan"],
  ["Apakah langkah selepas kenal pasti segi tiga?", "Tentukan sisi yang diketahui dan pilih nisbah sin/kos/tan yang sesuai"],
  ["Bagaimana selesaikan masalah dengan dua segi tiga bersudut tegak bersambung?", "Selesaikan satu segi tiga dahulu untuk dapatkan sisi sepunya, kemudian segi tiga kedua"],
  ["Apakah aplikasi trigonometri dalam pengukuran sungai?", "Mengukur kelebaran sungai tanpa menyeberang"],
  ["Apakah bidang yang banyak guna trigonometri?", "Pelayaran, penerbangan, kejuruteraan, astronomi"],
  ["Jika tan θ=1, apakah jenis segi tiga diwakili?", "Segi tiga bersudut tegak sama kaki (45°-45°-90°)"],
  ["Apakah kesilapan lazim memilih nisbah trigonometri?", "Menggunakan kos apabila sepatutnya sin, atau sebaliknya"],
  ["Apakah langkah semakan selepas dapat jawapan sudut?", "Pastikan sudut munasabah (antara 0°-90° untuk sudut tirus)"],
  ["Bagaimana tukar sudut darjah-minit-saat kepada perpuluhan?", "Darjah + (minit/60) + (saat/3600)"],
]);
