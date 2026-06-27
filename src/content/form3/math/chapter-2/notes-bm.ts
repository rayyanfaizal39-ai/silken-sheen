import type { StructuredNotes } from "@/data/types";

export const mathF3C2NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 2 Bentuk Piawai membantu murid menerangkan maksud angka bererti dan menentukan bilangannya, membundarkan nombor kepada angka bererti tertentu, mengenal dan menulis nombor dalam bentuk piawai, melaksanakan operasi asas aritmetik (tambah, tolak, darab, bahagi) yang melibatkan bentuk piawai, serta menyelesaikan masalah yang melibatkan bentuk piawai.",
  quickRevision: [
    "Angka bererti menunjukkan tahap kejituan suatu ukuran.",
    "Sifar antara dua digit bukan sifar adalah angka bererti; sifar sebelum digit bukan sifar pertama dalam perpuluhan bukan angka bererti.",
    "Bentuk piawai ditulis sebagai A x 10^n, dengan 1 ≤ A < 10 dan n ialah integer.",
    "Untuk operasi tambah/tolak bentuk piawai, kuasa 10 mesti disamakan dahulu.",
    "Untuk operasi darab/bahagi bentuk piawai, darab/bahagi nilai A dan gunakan hukum indeks untuk kuasa 10.",
  ],
  keyExamFacts: [
    "Bentuk piawai: A x 10^n, dengan 1 ≤ A < 10, n integer.",
    "Sifar di antara digit bukan sifar ialah angka bererti.",
    "Bagi perpuluhan, semua digit sebelum digit bukan sifar pertama bukan angka bererti.",
    "Tambah/tolak bentuk piawai: samakan kuasa 10 dahulu, contoh S x10^n + T x10^n = (S+T) x10^n.",
    "Darab bentuk piawai: (S x10^m) x (T x10^n) = (SxT) x10^(m+n); bahagi: (S x10^m) ÷ (T x10^n) = (S÷T) x10^(m-n).",
  ],
  keyTerms: ["angka bererti", "bentuk piawai", "anggaran", "pembundaran", "penghampiran", "kejituan"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan maksud angka bererti dan seterusnya menentukan bilangan angka bererti suatu nombor.",
            "Membundarkan suatu nombor kepada bilangan angka bererti yang tertentu.",
            "Mengenal dan menulis nombor dalam bentuk piawai.",
            "Melaksanakan operasi asas aritmetik yang melibatkan nombor dalam bentuk piawai.",
            "Menyelesaikan masalah yang melibatkan nombor dalam bentuk piawai.",
          ],
        },
      ],
    },
    {
      title: "2.1 Angka Bererti",
      subsections: [
        {
          title: "2.1.1 Mengenal Angka Bererti - Penerangan Ringkas",
          content:
            "Angka bererti (a.b.) ialah digit dalam suatu nombor yang memberikan maklumat tentang tahap kejituan ukuran tersebut. Bilangan angka bererti ditentukan oleh kedudukan digit sifar dalam nombor.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Semua digit bukan sifar adalah angka bererti.",
            "Sifar yang berada di antara dua digit bukan sifar adalah angka bererti.",
            "Bagi suatu perpuluhan, semua digit sebelum digit bukan sifar yang pertama bukan angka bererti.",
            "Bagi nombor bulat, sifar di hujung nombor tidak dianggap angka bererti melainkan dinyatakan tahap kejituannya.",
          ],
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Nombor", "Bilangan Angka Bererti", "Sebab"],
            rows: [
              ["2 763", "4 a.b.", "Semua digit bukan sifar"],
              ["60 007", "5 a.b.", "Sifar antara digit bukan sifar adalah angka bererti"],
              ["50.0042", "6 a.b.", "Semua sifar dalam perpuluhan ini terletak antara digit bukan sifar"],
              ["0.007", "1 a.b.", "Sifar sebelum digit bukan sifar pertama bukan angka bererti"],
              ["0.005020", "4 a.b.", "Sifar di hujung selepas titik perpuluhan adalah angka bererti"],
              ["15 000 (2 a.b.)", "2 a.b.", "Sifar di hujung integer hanya angka bererti jika dinyatakan tahap kejituan"],
            ],
          },
        },
        {
          title: "2.1.2 Membundarkan kepada Angka Bererti - Penerangan Ringkas",
          content:
            "Untuk membundarkan nombor kepada n angka bererti, kenal pasti digit ke-n daripada digit bererti pertama, kemudian gunakan peraturan pembundaran biasa (bundar naik jika digit selepas ≥ 5).",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Bundarkan 63 479 kepada 2 a.b.", "Digit ke-2 ialah 3; digit selepas (4) < 5, tidak berubah; gantikan baki dengan sifar", "63 000"],
              ["Bundarkan 2 476 kepada 2 a.b.", "Digit ke-2 ialah 4; digit selepas (7) ≥ 5, tambah 1 menjadi 5", "2 500"],
              ["Bundarkan 0.008025 kepada 3 a.b.", "Digit bererti: 8,0,2; digit selepas (5) ≥ 5, tambah 1 kepada 2", "0.00803"],
              ["Bundarkan 0.008025 kepada 2 a.b.", "Digit bererti: 8,0; digit selepas (2) < 5, tidak berubah", "0.0080"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa kenal pasti digit bererti pertama sebelum mengira bilangan angka bererti.",
            "Pembundaran kepada angka bererti berbeza dengan pembundaran kepada tempat perpuluhan atau nilai tempat.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengira sifar sebelum digit bukan sifar pertama sebagai angka bererti dalam perpuluhan.",
            "Tertinggal menggantikan digit baki dengan sifar selepas membundarkan integer.",
            "Mengelirukan bilangan angka bererti dengan bilangan tempat perpuluhan.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Garis bawah digit bererti yang dikehendaki sebelum membundarkan untuk mengelakkan kesilapan.",
            "Untuk integer, titik perpuluhan dianggap berada selepas digit terakhir.",
            "Semak semula bilangan angka bererti selepas pembundaran selesai.",
          ],
        },
      ],
    },
    {
      title: "2.2 Bentuk Piawai",
      subsections: [
        {
          title: "2.2.1 Menulis Nombor dalam Bentuk Piawai - Penerangan Ringkas",
          content:
            "Bentuk piawai ialah cara menulis nombor tunggal sebagai A x 10^n, dengan 1 ≤ A < 10 dan n integer. Ia memudahkan penulisan nombor yang sangat besar atau sangat kecil.",
        },
        {
          title: "Formula",
          formula: "Nombor tunggal = A x 10^n, dengan 1 ≤ A < 10, n ialah integer",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tukar 280 kepada bentuk piawai", "Letak titik perpuluhan selepas digit bererti pertama, kira langkah anjakan (2)", "2.8 x 10^2"],
              ["Tukar 2 805.3 kepada bentuk piawai", "Anjak titik perpuluhan 3 tempat ke kiri", "2.8053 x 10^3"],
              ["Tukar 0.03025 kepada bentuk piawai", "Anjak titik perpuluhan 2 tempat ke kanan, n negatif", "3.025 x 10^-2"],
              ["Tukar 0.003005 kepada bentuk piawai", "Anjak titik perpuluhan 3 tempat ke kanan", "3.005 x 10^-3"],
              ["Tukar 4.17 x 10^5 kepada nombor tunggal", "Anjak titik perpuluhan 5 tempat ke kanan", "417 000"],
              ["Tukar 8.063 x 10^-5 kepada nombor tunggal", "Anjak titik perpuluhan 5 tempat ke kiri", "0.00008063"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Nombor ≥ 10 mempunyai indeks n positif; nombor < 1 mempunyai indeks n negatif.",
            "Hukum indeks am x an = a^(m+n) sering digunakan apabila menggabungkan unit, contoh terabait dan bait.",
            "Awalan metrik (kilo, mega, giga, mili, mikro, nano) berkait rapat dengan kuasa 10.",
          ],
        },
        {
          title: "2.2.2 Operasi Asas Bentuk Piawai - Penerangan Ringkas",
          content:
            "Operasi tambah dan tolak memerlukan kuasa 10 yang sama; operasi darab dan bahagi menggunakan hukum indeks untuk kuasa 10 secara berasingan daripada nilai A.",
        },
        {
          title: "Formula",
          formula:
            "S x10^n + T x10^n = (S+T) x10^n\nS x10^n - T x10^n = (S-T) x10^n\n(S x10^m) x (T x10^n) = (SxT) x10^(m+n)\n(S x10^m) ÷ (T x10^n) = (S÷T) x10^(m-n)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Hitung 7.02 x10^4 + 2.17 x10^5", "Samakan kuasa: 7.02x10^4 + 21.7x10^4 = 28.72x10^4", "2.872 x 10^5"],
              ["Hitung 9.45 x10^6 - 3.24 x10^5", "Samakan kuasa: 94.5x10^5 - 3.24x10^5 = 91.26x10^5", "9.126 x 10^6"],
              ["Hitung 3 x10^5 x 4.9 x10^2", "Darab nilai A: 3x4.9=14.7; tambah indeks: 5+2", "1.47 x 10^8"],
              ["Hitung (5.9 x10^5) ÷ (2 x10^2)", "Bahagi nilai A: 5.9÷2=2.95; tolak indeks: 5-2", "2.95 x 10^3"],
            ],
          },
        },
        {
          title: "2.2.3 Menyelesaikan Masalah Bentuk Piawai - Penerangan Ringkas",
          content:
            "Masalah harian seperti jarak antara planet, ketebalan bahan, kapasiti storan data dan kawasan tanah sering menggunakan bentuk piawai untuk memudahkan pengiraan dan penulisan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Tentukan 3 050 terabait dalam bait, nyatakan dalam bentuk piawai",
                "3 050 terabait = 3.05x10^3 x 10^12 bait; gunakan am x an = a^(m+n)",
                "3.05 x 10^15 bait",
              ],
              [
                "Tanah segi tiga bersudut tegak PQR: PR=3.5x10^2 m, PQ tegak dengan QR=2.1x10^2 m. Hitung PQ.",
                "Guna Teorem Pythagoras: PQ^2 = (3.5x10^2)^2 - (2.1x10^2)^2 = 7.84x10^4",
                "PQ = 2.8 x 10^2 m",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Apabila menambah/menolak, tukar salah satu nombor supaya kuasa 10 sepadan sebelum menggabungkan nilai A.",
            "Apabila darab/bahagi, kendalikan nilai A dan kuasa 10 secara berasingan, kemudian gabungkan semula ke bentuk piawai.",
            "Jawapan akhir mesti sentiasa dalam bentuk A x 10^n dengan 1 ≤ A < 10.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Cuba menambah/menolak bentuk piawai tanpa menyamakan kuasa 10 dahulu.",
            "Tersilap menambah kuasa 10 semasa operasi tambah/tolak, sedangkan kuasa hanya ditambah semasa darab.",
            "Jawapan akhir tidak dalam bentuk piawai (A bukan dalam julat 1 hingga kurang 10).",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Sentiasa semak semula nilai A berada dalam julat 1 ≤ A < 10 selepas pengiraan.",
            "Gunakan hukum indeks (am x an = am+n, am ÷ an = am-n) untuk memudahkan operasi kuasa 10.",
            "Bundarkan jawapan akhir kepada bilangan angka bererti yang dinyatakan dalam soalan.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Astronomi: jarak antara planet dan bintang ditulis dalam bentuk piawai (contoh: tahun cahaya).",
            "Sains dan kejuruteraan: ukuran sangat kecil seperti nanometer dan mikrometer.",
            "Teknologi maklumat: kapasiti storan data seperti terabait dan gigabait.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "Angka bererti menunjukkan tahap kejituan ukuran.",
            "Bentuk piawai: A x 10^n, 1 ≤ A < 10, n integer.",
            "Tambah/tolak: samakan kuasa 10 dahulu.",
            "Darab/bahagi: kendalikan nilai A dan kuasa 10 berasingan menggunakan hukum indeks.",
          ],
        },
      ],
    },
  ],
};
