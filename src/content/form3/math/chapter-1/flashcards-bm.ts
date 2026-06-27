import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c1-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 1",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C1FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Tatatanda Indeks (Cards 1-20)
  ["Apakah maksud an?", "a didarab dengan dirinya sebanyak n kali (pendaraban berulang)."],
  ["Apakah nama bagi a dalam an?", "Asas (base)."],
  ["Apakah nama bagi n dalam an?", "Indeks atau kuasa (index/power)."],
  ["Tukar 5x5x5x5x5x5 kepada bentuk indeks.", "5^6"],
  ["Tukar (-2)x(-2)x(-2) kepada bentuk indeks.", "(-2)^3"],
  ["Apakah nilai 4^3?", "64"],
  ["Apakah nilai 5^4?", "625"],
  ["Apakah nilai (-7)^3?", "-343"],
  ["Bagaimanakah menukar 64 kepada bentuk indeks asas 2?", "Bahagi berulang dengan 2: 64=2^6"],
  ["Bagaimanakah menukar 64 kepada bentuk indeks asas 4?", "64 = 4^3"],
  ["Apakah cara menentukan nilai an tanpa kalkulator?", "Kaedah pendaraban berulang"],
  ["Apakah kesilapan lazim menulis 34?", "Tersilap menulis sebagai 4x4x4 bukan 3x3x3x3"],
  ["Mengapa kurungan penting untuk asas negatif?", "(-2)^3 berbeza dengan -2^3"],
  ["Apakah nilai -2^3 (tanpa kurungan pada asas)?", "-8 (negatifkan selepas mengira 2^3)"],
  ["Apakah maksud m^7?", "m didarab dengan dirinya 7 kali"],
  ["Tukar (0.3)x(0.3)x(0.3)x(0.3) kepada bentuk indeks.", "(0.3)^4"],
  ["Berapa faktor dalam n^8?", "8 faktor n"],
  ["Apakah alat untuk sahkan nilai an?", "Kalkulator saintifik (butang ^)"],
  ["Apakah asas bagi 81 jika ditulis 3^4?", "3"],
  ["Apakah indeks bagi 81 = 3^4?", "4"],

  // Deck 2: Hukum Pendaraban, Pembahagian dan Kuasa bagi Kuasa (Cards 21-40)
  ["Apakah hukum pendaraban indeks?", "am x an = a^(m+n), asas sama"],
  ["Apakah hukum pembahagian indeks?", "am ÷ an = a^(m-n), asas sama"],
  ["Apakah hukum kuasa bagi kuasa?", "(am)n = a^(mn)"],
  ["Ringkaskan 7^2 x 7^3.", "7^5"],
  ["Ringkaskan 4^5 ÷ 4^2.", "4^3"],
  ["Ringkaskan (3^4)^2.", "3^8"],
  ["Ringkaskan 2k^2 x 4k^3.", "8k^5"],
  ["Ringkaskan m^3 x n^2 x m^4 x n^5.", "m^7 n^7"],
  ["Ringkaskan 25x^2y^3 ÷ 5xy.", "5xy^2"],
  ["Ringkaskan (p^2q^3r)^4.", "p^8q^12r^4"],
  ["Ringkaskan (5m^4n^3)^2.", "25m^8n^6"],
  ["Ringkaskan m^7 ÷ m^2 ÷ m^4.", "m"],
  ["Apakah syarat penggunaan hukum tambah/tolak indeks?", "Asas mesti sama"],
  ["Ringkaskan h^3 x h^10.", "h^13"],
  ["Adakah (4^2)^3 = (4^3)^2?", "Ya, kedua-duanya = 4^6"],
  ["Ringkaskan -25h^4 ÷ 5h^2 ÷ h.", "-5h"],
  ["Apakah kesilapan lazim am x an?", "Tersilap menambah asas, bukan indeks"],
  ["Ringkaskan (0.2)^2 x (0.2)^4 x (0.2)^5.", "(0.2)^11"],
  ["Ringkaskan (-3x)^3.", "-27x^3"],
  ["Apakah formula umum hukum kuasa bagi kuasa untuk tiga peringkat, (am)n)p?", "a^(mnp)"],

  // Deck 3: Indeks Sifar, Negatif dan Pecahan (Cards 41-60)
  ["Apakah nilai a0 (a≠0)?", "1"],
  ["Apakah bentuk lain bagi a-n?", "1/an"],
  ["Apakah bentuk lain bagi (a/b)-n?", "(b/a)n"],
  ["Tukar a^(-2) kepada bentuk positif.", "1/a^2"],
  ["Tukar (2/5)^(-10) kepada bentuk positif.", "(5/2)^10"],
  ["Nilaikan 2^3 ÷ 2^5.", "1/4"],
  ["Apakah maksud a^(1/n)?", "Punca kuasa ke-n bagi a"],
  ["Apakah maksud a^(m/n)?", "Punca kuasa ke-n bagi a^m, atau (punca kuasa ke-n a)^m"],
  ["Apakah punca kuasa tiga bagi 8?", "2"],
  ["Tukar 81^(3/4) kepada bentuk punca kuasa dan nilaikan.", "(punca kuasa empat 81)^3 = 27"],
  ["Apakah nilai 2m^(-3) dalam bentuk positif?", "2/m^3"],
  ["Tukar 8^(1/3) kepada bentuk punca dan nilaikan.", "Punca kuasa tiga 8 = 2"],
  ["Bagaimana membuktikan a0=1?", "an ÷ an = a^(n-n) = a^0, dan an÷an = 1"],
  ["Bagaimana membuktikan a-n=1/an?", "a^0 ÷ a^n = a^(-n), dan a^0÷a^n=1/a^n"],
  ["Apakah kesilapan lazim a-n?", "Menyangka ia bernilai negatif, sedangkan ia songsangan"],
  ["Selesaikan 3^x x 9^(x+5) ÷ 3^4 = 1 untuk x.", "x = -2"],
  ["Apakah langkah pertama menyelesaikan persamaan indeks?", "Samakan asas kedua-dua belah"],
  ["Apakah langkah kedua selepas asas disamakan?", "Samakan indeks dan selesaikan persamaan"],
  ["Berikan satu aplikasi sebenar bentuk indeks.", "Pertumbuhan populasi/bakteria atau faedah simpanan majmuk"],
  ["Apakah tip menyemak jawapan indeks?", "Gantikan nilai kecil untuk sahkan hukum yang digunakan betul"],
]);
