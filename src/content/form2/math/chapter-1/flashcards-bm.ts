import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c1-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 1",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF2C1FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Corak (Cards 1-20)
  ["Apakah maksud corak?", "Senarai nombor atau objek yang disusun berdasarkan suatu peraturan atau reka bentuk."],
  ["Bagaimanakah corak objek dikenal pasti?", "Perhatikan perubahan susunan objek sebelumnya."],
  ["Bagaimanakah corak nombor dikenal pasti?", "Bandingkan satu nombor dengan nombor seterusnya untuk mencari peraturan."],
  ["Apakah empat operasi asas bagi corak nombor?", "Tambah, tolak, darab dan bahagi."],
  ["Apakah nombor genap?", "Nombor yang boleh dibahagi tepat dengan 2."],
  ["Apakah nombor ganjil?", "Nombor yang tidak boleh dibahagi tepat dengan 2."],
  ["Apakah corak bagi -10, -4, 2, 8, ...?", "Tambah 6 kepada nombor sebelumnya."],
  ["Apakah corak bagi 17, 7, -3, -13, ...?", "Tolak 10 daripada nombor sebelumnya."],
  ["Apakah corak bagi 2, 6, 18, 54, ...?", "Darab nombor sebelumnya dengan 3."],
  ["Apakah corak bagi 81, 27, 9, 3, ...?", "Bahagi nombor sebelumnya dengan 3."],
  ["Apakah corak bagi -2.3, -2.6, -2.9, -3.2, ...?", "Tolak 0.3 daripada nombor sebelumnya."],
  ["Apakah langkah pertama mencari corak nombor?", "Bandingkan sebutan berturutan."],
  ["Apakah Segi Tiga Pascal?", "Susunan nombor berbentuk segi tiga yang bermula dengan 1."],
  ["Apakah nombor di hujung setiap baris Segi Tiga Pascal?", "Setiap baris bermula dan berakhir dengan 1."],
  ["Bagaimanakah nombor tengah Segi Tiga Pascal diperoleh?", "Tambah dua nombor yang berada tepat di atasnya."],
  ["Apakah baris selepas 1, 3, 3, 1?", "1, 4, 6, 4, 1."],
  ["Apakah Nombor Fibonacci?", "Corak nombor yang setiap sebutan seterusnya ialah hasil tambah dua sebutan sebelumnya."],
  ["Apakah permulaan Nombor Fibonacci dalam nota?", "0, 1, 1."],
  ["Apakah sebutan selepas 0, 1, 1, 2, 3, 5?", "8."],
  ["Apakah kesilapan lazim bagi Fibonacci?", "Menambah satu sebutan sebelumnya sahaja, bukan dua sebutan sebelumnya."],

  // Deck 2: Jujukan (Cards 21-40)
  ["Apakah maksud jujukan?", "Set nombor atau objek yang disusun mengikut suatu corak tertentu."],
  ["Bilakah set nombor dianggap jujukan?", "Apabila set itu mengikut suatu corak tertentu."],
  ["Apakah syarat utama peraturan jujukan?", "Peraturan yang sama mesti berterusan sepanjang jujukan."],
  ["Adakah -10, -6, -2, 2, 6, ... suatu jujukan?", "Ya, kerana coraknya tambah 4."],
  ["Apakah corak suatu jujukan?", "Peraturan yang menghubungkan satu sebutan dengan sebutan seterusnya."],
  ["Bagaimanakah sebutan hilang dicari?", "Gunakan peraturan yang sama daripada sebutan yang diketahui."],
  ["Lengkapkan: 7, 13, __, 25, ...", "19."],
  ["Lengkapkan: 88, __, 64, 52, ...", "76."],
  ["Apakah jujukan jika mula dengan 96 dan tolak 4?", "96, 92, 88, 84, 80, 76, ..."],
  ["Apakah jujukan jika mula dengan 7 dan darab 3?", "7, 21, 63, 189, 567, 1701, ..."],
  ["Apakah jujukan jika mula dengan 21.3 dan tolak 8?", "21.3, 13.3, 5.3, -2.7, -10.7, ..."],
  ["Apakah jujukan jika mula dengan 400 dan bahagi 5?", "400, 80, 16, 3.2, 0.64, 0.128, ..."],
  ["Apakah maksud jujukan nombor?", "Jujukan yang terdiri daripada nombor."],
  ["Apakah jenis nombor yang boleh terlibat dalam jujukan nombor?", "Nombor bulat, nombor negatif, perpuluhan dan pecahan."],
  ["Apakah nombor segi tiga?", "Nombor yang diwakili oleh titik yang membentuk segi tiga sama sisi."],
  ["Nyatakan awal nombor segi tiga.", "1, 3, 6, 10, 15, 21, 28, 36, ..."],
  ["Jika corak tambah 7 bermula dengan 42, apakah T2?", "49."],
  ["Jika corak tambah 7 bermula dengan 42, apakah T6?", "77."],
  ["Apakah tip untuk corak pembahagian?", "Semak dengan mendarab secara songsang."],
  ["Apakah kesilapan lazim dalam jujukan nombor?", "Menukar peraturan di tengah-tengah jujukan."],

  // Deck 3: Corak dan Jujukan (Cards 41-60)
  ["Apakah tiga cara menghuraikan corak jujukan?", "Menggunakan nombor, perkataan dan ungkapan algebra."],
  ["Apakah maksud menghuraikan corak menggunakan nombor?", "Menunjukkan operasi antara sebutan, seperti +8."],
  ["Apakah maksud menghuraikan corak menggunakan perkataan?", "Menulis peraturan dalam ayat, seperti tambah 8 kepada nombor sebelumnya."],
  ["Apakah maksud ungkapan algebra?", "Ungkapan yang melibatkan nombor, pemboleh ubah atau entiti matematik."],
  ["Apakah corak nombor bagi 1, 9, 17, 25, 33, ...?", "+8, +8, +8, +8."],
  ["Apakah corak perkataan bagi 1, 9, 17, 25, 33, ...?", "Tambah 8 kepada nombor sebelumnya."],
  ["Apakah ungkapan algebra bagi 1, 9, 17, 25, 33, ...?", "1 + 8n, dengan n = 0, 1, 2, 3, ..."],
  ["Dalam 1 + 8n, apakah nilai n bagi sebutan pertama?", "n = 0."],
  ["Apakah formula corak tambah tetap?", "a + dn, dengan n = 0, 1, 2, 3, ..."],
  ["Apakah maksud Tn?", "Sebutan ke-n."],
  ["Apakah maksud T1?", "Sebutan pertama."],
  ["Apakah maksud T2?", "Sebutan kedua."],
  ["Bagi 4, 8, 12, 16, ..., apakah T3?", "12."],
  ["Bagi 2, 10, 18, ..., apakah sebutan ke-5?", "34."],
  ["Bagi 65, 60, 55, 50, ..., 40 ialah sebutan ke berapa?", "Sebutan ke-6."],
  ["Apakah langkah menyelesaikan masalah jujukan?", "Fahami, rancang, laksanakan dan tulis kesimpulan."],
  ["Apakah formula selang masa?", "Selang = jumlah masa / bilangan bahagian yang sama."],
  ["Jika makanan ikan diberi 4 kali sehari, apakah selangnya?", "24 / 4 = 6 jam."],
  ["Jika T1 = 7:35 a.m. dan selang 6 jam, apakah T3?", "7:35 p.m."],
  ["Apakah kesilapan lazim bagi sebutan Tn?", "Mengelirukan nombor sebutan dengan nilai sebutan."],
]);
