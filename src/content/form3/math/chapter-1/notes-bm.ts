import type { StructuredNotes } from "@/data/types";

export const mathF3C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 1 Indeks membantu murid mewakilkan pendaraban berulang dalam bentuk indeks, mengaplikasikan hukum indeks (pendaraban, pembahagian, kuasa bagi kuasa, indeks sifar, indeks negatif dan indeks pecahan) untuk memudahkan pengiraan, serta menyelesaikan persamaan dan masalah yang melibatkan indeks.",
  quickRevision: [
    "an bermaksud a didarab dengan dirinya sebanyak n kali; a ialah asas dan n ialah indeks/kuasa.",
    "Hukum Pendaraban: am x an = am+n (asas mesti sama).",
    "Hukum Pembahagian: am ÷ an = am-n (asas mesti sama).",
    "Hukum Kuasa bagi Kuasa: (am)n = amn.",
    "Indeks Sifar: a0 = 1, dengan a ≠ 0.",
    "Indeks Negatif: a-n = 1/an, dan (a/b)-n = (b/a)n.",
    "Indeks Pecahan: a1/n = nth root of a, dan am/n = nth root of am = (nth root of a)m.",
  ],
  keyExamFacts: [
    "an = a x a x ... x a (n faktor); a ialah asas, n ialah indeks.",
    "am x an = a^(m+n); am ÷ an = a^(m-n); (am)n = a^(mn).",
    "a0 = 1 untuk a ≠ 0; a-n = 1/an; (a/b)-n = (b/a)n.",
    "a1/n = punca kuasa ke-n bagi a; am/n = punca kuasa ke-n bagi am.",
    "Semua hukum indeks hanya sah apabila asas adalah sama.",
    "Persamaan indeks diselesaikan dengan menyamakan asas, kemudian menyamakan indeks.",
  ],
  keyTerms: ["asas", "indeks", "kuasa", "punca kuasa", "indeks negatif", "indeks pecahan", "indeks sifar"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mewakilkan pendaraban berulang dalam bentuk indeks dan menghuraikan maksudnya.",
            "Menukar suatu nombor kepada bentuk indeks dan sebaliknya.",
            "Menghubungkaitkan pendaraban dan pembahagian nombor dalam bentuk indeks yang mempunyai asas yang sama.",
            "Menghubungkaitkan bentuk indeks (am)n dengan pendaraban berulang.",
            "Membuktikan a0 = 1 dan a-n = 1/an.",
            "Menghubungkaitkan indeks pecahan dengan punca kuasa dan kuasa.",
            "Melaksanakan operasi asas indeks meliputi hukum-hukum indeks.",
            "Menyelesaikan masalah yang melibatkan indeks.",
          ],
        },
      ],
    },
    {
      title: "1.1 Tatatanda Indeks",
      subsections: [
        {
          title: "1.1.1 Bentuk Indeks - Penerangan Ringkas",
          content:
            "Pendaraban berulang bagi suatu nombor atau sebutan algebra boleh diringkaskan menggunakan bentuk indeks an, dengan a ialah asas dan n ialah indeks (kuasa). an menunjukkan a didarab dengan dirinya sebanyak n kali.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "an dibaca sebagai 'a kuasa n' atau 'a pangkat n'.",
            "a ialah asas (base), n ialah indeks atau kuasa (power/index).",
            "Nilai an boleh ditentukan melalui pendaraban berulang atau kalkulator saintifik.",
            "Sebarang nombor boleh ditukar kepada bentuk indeks menggunakan kaedah pembahagian berulang (cari asas sepunya, contohnya 64 = 26 = 43 = 82).",
          ],
        },
        {
          title: "Formula",
          formula:
            "an = a x a x a x ... x a (n faktor)\nContoh: 5 x 5 x 5 x 5 x 5 x 5 = 5^6",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tukar 0.3 x 0.3 x 0.3 x 0.3 kepada bentuk indeks", "4 faktor 0.3 didarab", "(0.3)^4"],
              ["Tukar (-2) x (-2) x (-2) kepada bentuk indeks", "3 faktor (-2) didarab", "(-2)^3"],
              ["Tukar m x m x m x m x m x m x m kepada bentuk indeks", "7 faktor m didarab", "m^7"],
              ["Tukar 64 kepada bentuk indeks berasaskan 2", "64 dibahagi berulang dengan 2: 64,32,16,8,4,2,1 (6 langkah)", "64 = 2^6"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Bilangan faktor yang didarab = nilai indeks.",
            "Asas boleh berupa nombor positif, negatif, pecahan, perpuluhan atau pemboleh ubah.",
            "Kaedah pembahagian berulang membantu menukar nombor kepada bentuk indeks dengan asas yang dipilih.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan asas dengan indeks, contohnya menulis 34 sebagai 4 x 4 x 4.",
            "Tertinggal tanda negatif apabila asas ialah nombor negatif, contohnya (-2)^3 berbeza dengan -2^3.",
            "Salah mengira bilangan faktor semasa menukar kepada bentuk indeks.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Sentiasa kira bilangan faktor dengan teliti untuk menentukan nilai indeks.",
            "Gunakan kurungan bagi asas negatif atau pecahan, contohnya (-2)^3, (1/4)^3.",
            "Sahkan jawapan dengan kalkulator saintifik menggunakan butang kuasa (^).",
          ],
        },
      ],
    },
    {
      title: "1.2 Hukum Indeks",
      subsections: [
        {
          title: "1.2.1 Hukum Pendaraban Indeks - Penerangan Ringkas",
          content:
            "Apabila dua nombor dalam bentuk indeks dengan asas yang sama didarabkan, indeksnya ditambah: am x an = am+n.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Hukum ini hanya sah jika asas adalah sama.",
            "Berlaku juga untuk sebutan algebra, contohnya 2k2 x 4k3 = 8k5.",
          ],
        },
        {
          title: "Formula",
          formula: "am x an = a^(m+n)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Ringkaskan 7^2 x 7^3", "Tambah indeks: 2 + 3", "7^5"],
              ["Ringkaskan 2k^2 x 4k^3", "Darab pekali: 2x4=8; tambah indeks: 2+3=5", "8k^5"],
              ["Ringkaskan m^3 x n^2 x m^4 x n^5", "Kumpul asas sama: m^(3+4) x n^(2+5)", "m^7 x n^7"],
            ],
          },
        },
        {
          title: "1.2.2 Hukum Pembahagian Indeks - Penerangan Ringkas",
          content:
            "Apabila dua nombor dalam bentuk indeks dengan asas yang sama dibahagikan, indeksnya ditolak: am ÷ an = am-n.",
        },
        {
          title: "Formula",
          formula: "am ÷ an = a^(m-n)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Ringkaskan 4^5 ÷ 4^2", "Tolak indeks: 5 - 2", "4^3"],
              ["Ringkaskan 25x^2y^3 ÷ 5xy", "Bahagi pekali 25/5=5; tolak indeks x:2-1, y:3-1", "5xy^2"],
              ["Ringkaskan m^7 ÷ m^2 ÷ m^4", "Tolak indeks secara berurutan: 7-2-4", "m^1 = m"],
            ],
          },
        },
        {
          title: "1.2.3 Hukum Kuasa bagi Kuasa - Penerangan Ringkas",
          content:
            "Apabila nombor dalam bentuk indeks dikuasakan lagi, indeks didarab: (am)n = amn.",
        },
        {
          title: "Formula",
          formula: "(am)n = a^(mxn)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Ringkaskan (3^4)^2", "Darab indeks: 4 x 2", "3^8"],
              ["Ringkaskan (p^2 q^3 r)^4", "Darab setiap indeks dengan 4", "p^8 q^12 r^4"],
              ["Ringkaskan (5m^4 n^3)^2", "Kuasakan pekali 5^2=25; darab indeks dengan 2", "25 m^8 n^6"],
            ],
          },
        },
        {
          title: "1.2.4 Indeks Sifar dan Indeks Negatif - Penerangan Ringkas",
          content:
            "Sebarang nombor (kecuali sifar) dikuasakan sifar bersamaan 1: a0 = 1. Indeks negatif menunjukkan timbal balik: a-n = 1/an.",
        },
        {
          title: "Formula",
          formula: "a^0 = 1 (a ≠ 0)\na^(-n) = 1/a^n\n(a/b)^(-n) = (b/a)^n",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Ringkaskan a^(-2)", "Songsangkan asas dengan kuasa positif", "1/a^2"],
              ["Ringkaskan (2/5)^(-10)", "Songsangkan pecahan, tukar tanda kuasa", "(5/2)^10"],
              ["Nilaikan 2^3 ÷ 2^5", "Tolak indeks: 3-5 = -2, lalu songsang", "2^(-2) = 1/4"],
            ],
          },
        },
        {
          title: "1.2.5 Indeks Pecahan - Penerangan Ringkas",
          content:
            "Indeks pecahan menghubungkan kuasa dengan punca kuasa. a^(1/n) ialah punca kuasa ke-n bagi a, dan a^(m/n) ialah punca kuasa ke-n bagi a^m, atau (punca kuasa ke-n bagi a) dikuasakan m.",
        },
        {
          title: "Formula",
          formula: "a^(1/n) = n-th root of a\na^(m/n) = n-th root of (a^m) = (n-th root of a)^m",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tukar 8^(1/3) kepada bentuk punca kuasa", "Indeks 1/3 bermaksud punca kuasa ketiga", "punca kuasa tiga bagi 8 = 2"],
              ["Tukar 81^(3/4) kepada bentuk punca kuasa", "Punca kuasa keempat bagi 81, kemudian kuasa 3", "(punca kuasa empat bagi 81)^3 = 3^3 = 27"],
              ["Permudahkan m^(1/2) x n^(3/4)", "Kekalkan indeks pecahan berasingan kerana asas berbeza", "m^(1/2) n^(3/4)"],
            ],
          },
        },
        {
          title: "1.2.6 Menyelesaikan Persamaan dan Masalah Indeks - Penerangan Ringkas",
          content:
            "Persamaan indeks diselesaikan dengan menyamakan asas kedua belah persamaan, kemudian menyamakan indeks. Masalah harian boleh melibatkan pertumbuhan, kewangan atau saintifik yang menggunakan hukum indeks.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Selesaikan 3^x x 9^(x+5) ÷ 3^4 = 1",
                "Tukar 9 kepada 3^2: 3^x x 3^(2x+10) ÷ 3^4 = 3^0; samakan indeks: x+2x+10-4=0",
                "3x + 6 = 0, x = -2",
              ],
              [
                "Selesaikan persamaan serentak 25^m x 5^n = 5^8 dan 2^m x (1/2^n) = 2",
                "Tukar 25 kepada 5^2: 2m+n=8; tukar 1/2^n kepada 2^(-n): m-n=1",
                "Selesaikan serentak: m=3, n=2",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Semua hukum indeks (pendaraban, pembahagian, kuasa bagi kuasa) hanya sah apabila asas adalah sama.",
            "a0 = 1 untuk semua a ≠ 0; 00 tidak ditakrifkan.",
            "Indeks negatif bermaksud songsangan (timbal balik), bukan nilai negatif.",
            "Untuk indeks pecahan am/n, penyebut n mewakili punca kuasa dan pengangka m mewakili kuasa.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menambah asas semasa mendarab nombor dalam bentuk indeks (cth: 7^2 x 7^3 tersilap menjadi 14^5).",
            "Menganggap a^(-n) bermaksud nombor negatif, sedangkan ia adalah 1/a^n.",
            "Tersilap menukar pecahan campuran semasa pengiraan indeks pecahan.",
            "Terlepas pandang asas mesti sama sebelum menggunakan hukum tambah/tolak indeks.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tukar semua nombor kepada asas perdana yang sama (2, 3, 5, dll.) sebelum menggunakan hukum indeks.",
            "Semak semula dengan menggantikan nilai kecil untuk mengesahkan penggunaan hukum yang betul.",
            "Bagi persamaan indeks, samakan asas dahulu sebelum menyamakan indeks.",
            "Tulis langkah kerja dengan jelas terutamanya semasa menukar kepada indeks negatif atau pecahan.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Pertumbuhan populasi dan bakteria menggunakan bentuk indeks untuk meramal nilai masa depan.",
            "Faedah simpanan dan pelaburan majmuk menggunakan kuasa untuk mengira nilai akhir.",
            "Bidang sains dan kejuruteraan menggunakan bentuk indeks untuk nombor yang sangat besar atau kecil.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "an = pendaraban berulang a sebanyak n kali; a = asas, n = indeks.",
            "am x an = am+n; am ÷ an = am-n; (am)n = amn.",
            "a0 = 1 (a≠0); a-n = 1/an.",
            "a1/n = punca kuasa ke-n bagi a; am/n = punca kuasa ke-n bagi am.",
            "Selesaikan persamaan indeks dengan menyamakan asas, kemudian menyamakan indeks.",
          ],
        },
      ],
    },
  ],
};
