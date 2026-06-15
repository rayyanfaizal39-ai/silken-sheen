import type { StructuredNotes } from "./types";

export const mathF1C5NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 5 memperkenalkan asas algebra iaitu penggunaan huruf untuk mewakili nilai yang tidak diketahui, pembentukan dan penilaian ungkapan algebra, sebutan serupa dan tidak serupa, serta operasi tambah, tolak, darab dan bahagi ke atas ungkapan algebra.",
  quickRevision: [
    "Algebra menggunakan huruf seperti x, y, a dan n untuk mewakili nilai yang tidak diketahui.",
    "Pemboleh ubah ialah huruf atau simbol yang mewakili suatu nilai yang tidak diketahui.",
    "Ungkapan algebra dibentuk daripada situasi harian, contohnya n + 6, n − 1 dan 3n.",
    "Nilai ungkapan algebra ditentukan dengan menggantikan pemboleh ubah dengan nombor (kaedah penggantian).",
    "Pekali ialah faktor angka yang mendarab pemboleh ubah, contohnya pekali bagi 3x ialah 3.",
    "Hanya sebutan serupa (pemboleh ubah dan kuasa yang sama) boleh ditambah atau ditolak.",
    "Peraturan tanda: −(a + b) = −a − b, −(a − b) = −a + b, −(−a − b) = a + b.",
    "Pendaraban berulang membawa kepada tatatanda kuasa: a × a = a², a × a × a = a³.",
    "Apabila mendarab sebutan algebra, tambahkan kuasa pemboleh ubah yang sama: aᵐ × aⁿ = aᵐ⁺ⁿ.",
    "Apabila membahagi sebutan algebra, tolakkan kuasa pemboleh ubah yang sama dan batalkan faktor sepunya.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan maksud algebra dan asal usul perkataan 'al-jabr'.",
            "Mengenal pasti pemboleh ubah dan membezakan nilai tetap dengan nilai berubah.",
            "Membentuk ungkapan algebra daripada situasi harian.",
            "Menentukan nilai ungkapan algebra menggunakan kaedah penggantian.",
            "Mengenal pasti sebutan algebra, pekali, sebutan serupa dan sebutan tidak serupa.",
            "Menambah dan menolak ungkapan algebra serta menggunakan peraturan tanda dengan betul.",
            "Mendarab dan membahagi ungkapan algebra ringkas menggunakan hukum kuasa.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan kepada Algebra",
      subsections: [
        {
          title: "Makna Algebra",
          content:
            "Algebra ialah cabang matematik yang menggunakan huruf dan simbol untuk mewakili nombor atau nilai yang tidak diketahui. Algebra membolehkan kita menulis dan menyelesaikan masalah secara umum tanpa perlu menyatakan nombor sebenar terlebih dahulu.",
        },
        {
          title: "Asal Usul Perkataan 'Al-Jabr'",
          content:
            "Perkataan 'algebra' berasal daripada perkataan Arab 'al-jabr' yang bermaksud 'menyusun semula' atau 'menggabungkan bahagian yang terpisah'. Perkataan ini digunakan dalam tajuk buku karya ahli matematik Islam, Al-Khawarizmi, yang membincangkan kaedah menyelesaikan persamaan.",
        },
        {
          title: "Huruf Mewakili Nilai yang Tidak Diketahui",
          content:
            "Dalam algebra, huruf digunakan untuk mewakili nilai yang tidak diketahui atau nilai yang boleh berubah-ubah.",
          bulletPoints: [
            "x — selalunya mewakili nilai yang ingin dicari",
            "y — mewakili kuantiti kedua yang tidak diketahui",
            "a — sering digunakan untuk mewakili sebarang nombor",
            "n — sering digunakan untuk mewakili bilangan atau kuantiti",
          ],
        },
      ],
    },
    {
      title: "2. Pemboleh Ubah",
      subsections: [
        {
          title: "Definisi",
          content: "Pemboleh ubah ialah huruf atau simbol yang mewakili suatu nilai yang tidak diketahui.",
        },
        {
          title: "Contoh Pemboleh Ubah",
          bulletPoints: ["x", "y", "n", "a"],
        },
        {
          title: "Mengapa Pemboleh Ubah Digunakan?",
          content:
            "Pemboleh ubah membolehkan kita menulis ungkapan dan persamaan secara umum supaya ia boleh digunakan untuk pelbagai nilai, bukan hanya satu nombor sahaja.",
        },
      ],
    },
    {
      title: "3. Nilai Tetap dan Nilai Berubah",
      subsections: [
        {
          title: "Nilai Tetap",
          content:
            "Nilai tetap ialah suatu kuantiti yang nilainya tidak berubah dalam sesuatu situasi. Contohnya, kadar faedah tahunan yang ditetapkan oleh bank kekal sama sepanjang tempoh tertentu.",
        },
        {
          title: "Nilai Berubah",
          content:
            "Nilai berubah ialah suatu kuantiti yang nilainya boleh berubah-ubah mengikut keadaan. Contohnya, masa perjalanan ke sekolah pada setiap hari boleh berbeza disebabkan keadaan lalu lintas atau cuaca.",
        },
        {
          title: "Perbandingan Nilai Tetap dan Nilai Berubah",
          table: {
            headers: ["Nilai Tetap", "Nilai Berubah"],
            rows: [
              ["Kadar faedah tahunan", "Masa perjalanan ke sekolah setiap hari"],
              ["Bilangan hari dalam seminggu", "Bilangan pelajar hadir setiap hari"],
              ["Suhu didih air pada paras laut", "Suhu udara pada waktu yang berlainan"],
            ],
          },
        },
      ],
    },
    {
      title: "4. Membentuk Ungkapan Algebra",
      subsections: [
        {
          title: "Konsep",
          content:
            "Ungkapan algebra dibentuk dengan menggunakan pemboleh ubah untuk mewakili kuantiti yang tidak diketahui dalam sesuatu situasi, kemudian menggabungkannya dengan nombor menggunakan operasi seperti tambah, tolak atau darab.",
        },
        {
          title: "Contoh: Gula-gula dalam Balang",
          content:
            "Katakan terdapat n biji gula-gula di dalam sebuah balang. Berikut ialah cara membentuk ungkapan algebra bagi situasi yang berbeza:",
          bulletPoints: [
            "Tambah 6 biji gula-gula ke dalam balang: n + 6",
            "Makan 1 biji gula-gula daripada balang: n − 1",
            "Tiga balang yang serupa, setiap satu mengandungi n biji gula-gula: 3n",
          ],
          formula: "n + 6\nn − 1\n3n",
        },
        {
          title: "Penjelasan",
          content:
            "Operasi tambah '+' digunakan apabila kuantiti bertambah, operasi tolak '−' digunakan apabila kuantiti berkurang, dan pendaraban digunakan apabila kuantiti yang sama diulang beberapa kali (contohnya 3 balang × n biji = 3n).",
        },
      ],
    },
    {
      title: "5. Menentukan Nilai Ungkapan",
      subsections: [
        {
          title: "Kaedah Penggantian",
          content:
            "Nilai sesuatu ungkapan algebra boleh ditentukan dengan menggantikan setiap pemboleh ubah dengan nilai nombor yang diberikan, kemudian menyelesaikan pengiraan mengikut tertib operasi.",
        },
        {
          title: "Contoh Pengiraan",
          content: "Diberi x = 3 dan y = 2, cari nilai bagi ungkapan 8x − 5y + 7.",
          formula: "8x − 5y + 7\n= 8(3) − 5(2) + 7\n= 24 − 10 + 7\n= 21",
        },
        {
          title: "Langkah Penggantian",
          bulletPoints: [
            "Gantikan setiap pemboleh ubah dengan nilai yang diberikan, dengan kurungan jika perlu.",
            "Selesaikan pendaraban dahulu sebelum penambahan dan penolakan.",
            "Kira jawapan akhir mengikut tertib operasi yang betul.",
          ],
        },
      ],
    },
    {
      title: "6. Sebutan Algebra",
      subsections: [
        {
          title: "Sebutan Tunggal",
          content:
            "Sebutan algebra ialah nombor, pemboleh ubah, atau hasil darab antara nombor dengan pemboleh ubah. Setiap sebutan boleh berdiri sendiri sebagai satu unit dalam ungkapan.",
          bulletPoints: ["3ab", "5x", "−2y", "7"],
        },
        {
          title: "Sebutan dalam Ungkapan",
          content:
            "Sesuatu ungkapan algebra terdiri daripada satu atau lebih sebutan yang dipisahkan oleh tanda tambah (+) atau tanda tolak (−). Contohnya, dalam ungkapan 3ab + 5x − 2y + 7, terdapat empat sebutan iaitu 3ab, 5x, −2y dan 7.",
        },
      ],
    },
    {
      title: "7. Pekali",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pekali ialah faktor nombor yang mendarab sesuatu pemboleh ubah dalam suatu sebutan algebra.",
        },
        {
          title: "Contoh Pekali",
          table: {
            headers: ["Sebutan", "Pekali"],
            rows: [
              ["3x", "3"],
              ["−7ab", "−7"],
              ["y", "1"],
              ["−n", "−1"],
            ],
          },
        },
        {
          title: "Catatan Penting",
          bulletPoints: [
            "Apabila sesuatu pemboleh ubah ditulis tanpa nombor di hadapannya, pekalinya ialah 1, contohnya y bermaksud 1y.",
            "Tanda negatif di hadapan sebutan adalah sebahagian daripada pekali, contohnya pekali bagi −7ab ialah −7.",
          ],
        },
      ],
    },
    {
      title: "8. Sebutan Serupa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sebutan serupa ialah sebutan algebra yang mempunyai pemboleh ubah yang sama dan kuasa yang sama bagi setiap pemboleh ubah tersebut. Hanya pekalinya sahaja yang boleh berbeza.",
        },
        {
          title: "Contoh Sebutan Serupa",
          bulletPoints: [
            "3x dan 8x — kedua-duanya mempunyai pemboleh ubah x dengan kuasa 1",
            "2ab dan −5ab — kedua-duanya mempunyai pemboleh ubah a dan b dengan kuasa 1",
            "xy dan yx — kedua-duanya mewakili hasil darab pemboleh ubah yang sama (x × y = y × x)",
          ],
        },
        {
          title: "Ciri Sebutan Serupa",
          bulletPoints: [
            "Mempunyai pemboleh ubah yang sama.",
            "Mempunyai kuasa yang sama bagi setiap pemboleh ubah.",
          ],
        },
      ],
    },
    {
      title: "9. Sebutan Tidak Serupa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sebutan tidak serupa ialah sebutan algebra yang mempunyai pemboleh ubah yang berlainan, atau pemboleh ubah yang sama tetapi dengan kuasa yang berbeza.",
        },
        {
          title: "Contoh Sebutan Tidak Serupa",
          bulletPoints: [
            "x dan x² — pemboleh ubah sama tetapi kuasa berbeza (kuasa 1 berbanding kuasa 2)",
            "2a dan 2b — pemboleh ubah berbeza (a berbanding b)",
            "ab dan abc — bilangan pemboleh ubah berbeza (dua pemboleh ubah berbanding tiga pemboleh ubah)",
          ],
        },
        {
          title: "Mengapa Ia Berbeza?",
          content:
            "Sebutan tidak serupa tidak boleh digabungkan menjadi satu sebutan kerana ia mewakili kuantiti yang berlainan jenis. Contohnya, x mewakili satu kuantiti manakala x² mewakili kuantiti yang didarab dengan dirinya sendiri — kedua-duanya bukan benda yang sama.",
        },
      ],
    },
    {
      title: "10. Penambahan dan Penolakan Ungkapan Algebra",
      subsections: [
        {
          title: "Peraturan Penting",
          content: "Hanya sebutan serupa boleh ditambah atau ditolak antara satu sama lain.",
        },
        {
          title: "Contoh Penambahan dan Penolakan",
          formula: "3x + 2x = 5x\n7ab − 4ab = 3ab",
        },
        {
          title: "Cara Menyelesaikan",
          bulletPoints: [
            "Kenal pasti sebutan serupa dalam ungkapan.",
            "Tambah atau tolak pekali sebutan serupa sahaja.",
            "Kekalkan pemboleh ubah dan kuasanya tanpa diubah.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          content:
            "Murid sering tersilap menggabungkan sebutan tidak serupa, contohnya menulis 3x + 2y = 5xy. Ini adalah salah kerana x dan y ialah pemboleh ubah yang berbeza dan tidak boleh digabungkan menjadi satu sebutan. Ungkapan 3x + 2y mesti dibiarkan dalam bentuk asal kerana ia bukan sebutan serupa.",
        },
      ],
    },
    {
      title: "11. Peraturan Tanda",
      subsections: [
        {
          title: "Formula Peraturan Tanda",
          content:
            "Apabila tanda negatif terletak di hadapan kurungan, setiap sebutan di dalam kurungan mesti didarab dengan tanda negatif tersebut.",
          formula: "−(a + b) = −a − b\n−(a − b) = −a + b\n−(−a − b) = a + b",
        },
        {
          title: "Contoh Penggunaan",
          content:
            "Permudahkan ungkapan 5x − (2x − 3).\nLangkah: 5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.",
        },
        {
          title: "Contoh Lain",
          bulletPoints: [
            "−(x + 4) = −x − 4",
            "−(3a − 2b) = −3a + 2b",
            "−(−5x − 1) = 5x + 1",
          ],
        },
      ],
    },
    {
      title: "12. Pendaraban Berulang",
      subsections: [
        {
          title: "Konsep Kuasa",
          content:
            "Apabila sesuatu pemboleh ubah didarab dengan dirinya sendiri secara berulang, hasilnya boleh ditulis dalam bentuk kuasa (indeks) yang lebih ringkas.",
          formula: "a × a = a²\na × a × a = a³",
        },
        {
          title: "Membaca Kuasa",
          bulletPoints: [
            "a² dibaca sebagai 'a kuasa dua' dan bermaksud a × a",
            "a³ dibaca sebagai 'a kuasa tiga' dan bermaksud a × a × a",
            "Nombor kecil di sebelah kanan atas (kuasa) menunjukkan berapa kali pemboleh ubah itu didarab dengan dirinya sendiri",
          ],
        },
        {
          title: "Pendaraban Berulang Ungkapan",
          content:
            "Konsep yang sama juga digunakan apabila keseluruhan ungkapan didarab dengan dirinya sendiri secara berulang.",
          formula: "(a + b)(a + b)(a + b) = (a + b)³",
        },
      ],
    },
    {
      title: "13. Pendaraban Ungkapan Algebra",
      subsections: [
        {
          title: "Hukum Penambahan Kuasa",
          content:
            "Apabila mendarab dua sebutan algebra yang mempunyai pemboleh ubah yang sama, tambahkan kuasa bagi pemboleh ubah tersebut.",
          formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",
        },
        {
          title: "Contoh Pengiraan Langkah demi Langkah",
          content: "Permudahkan 3ab² × 4a³b.",
          formula:
            "3ab² × 4a³b\n= (3 × 4) × (a × a³) × (b² × b)\n= 12 × a¹⁺³ × b²⁺¹\n= 12a⁴b³",
        },
        {
          title: "Penjelasan Penambahan Kuasa",
          bulletPoints: [
            "Darabkan pekali (nombor) bagi kedua-dua sebutan terlebih dahulu: 3 × 4 = 12.",
            "Tambahkan kuasa bagi pemboleh ubah a yang sama: a¹ × a³ = a¹⁺³ = a⁴.",
            "Tambahkan kuasa bagi pemboleh ubah b yang sama: b² × b¹ = b²⁺¹ = b³.",
            "Gabungkan semua hasil untuk mendapat jawapan akhir: 12a⁴b³.",
          ],
        },
      ],
    },
    {
      title: "14. Pembahagian Ungkapan Algebra",
      subsections: [
        {
          title: "Hukum Penolakan Kuasa",
          content:
            "Apabila membahagi dua sebutan algebra yang mempunyai pemboleh ubah yang sama, tolakkan kuasa bagi pemboleh ubah tersebut.",
          formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
        },
        {
          title: "Contoh Pengiraan Langkah demi Langkah",
          content: "Permudahkan 20m⁴n² ÷ 5m²n³.",
          formula:
            "20m⁴n² ÷ 5m²n³\n= (20 ÷ 5) × (m⁴ ÷ m²) × (n² ÷ n³)\n= 4 × m⁴⁻² × n²⁻³\n= 4m²n⁻¹\n= 4m²/n",
        },
        {
          title: "Penjelasan Pembatalan Faktor Sepunya",
          bulletPoints: [
            "Bahagikan pekali (nombor) bagi kedua-dua sebutan terlebih dahulu: 20 ÷ 5 = 4.",
            "Tolakkan kuasa bagi pemboleh ubah m yang sama: m⁴ ÷ m² = m⁴⁻² = m².",
            "Tolakkan kuasa bagi pemboleh ubah n yang sama: n² ÷ n³ = n²⁻³ = n⁻¹, iaitu 1/n.",
            "Gabungkan semua hasil dan tulis dalam bentuk pecahan jika kuasa menjadi negatif: 4m²/n.",
          ],
        },
      ],
    },
    {
      title: "15. Ringkasan Bab",
      subsections: [
        {
          content:
            "Jadual di bawah merumuskan konsep-konsep penting yang dipelajari dalam Bab 5: Ungkapan Algebra.",
          table: {
            headers: ["Konsep", "Penerangan Ringkas", "Contoh"],
            rows: [
              ["Pemboleh ubah", "Huruf yang mewakili nilai tidak diketahui", "x, y, a, n"],
              ["Ungkapan algebra", "Gabungan sebutan dan pemboleh ubah", "n + 6, 3n, n − 1"],
              ["Nilai ungkapan", "Diperoleh melalui kaedah penggantian", "8(3) − 5(2) + 7 = 21"],
              ["Pekali", "Faktor nombor yang mendarab pemboleh ubah", "Pekali bagi 3x ialah 3"],
              ["Sebutan serupa", "Pemboleh ubah dan kuasa yang sama", "3x dan 8x"],
              ["Sebutan tidak serupa", "Pemboleh ubah atau kuasa berbeza", "x dan x²"],
              ["Tambah/tolak", "Hanya sebutan serupa boleh digabungkan", "3x + 2x = 5x"],
              ["Peraturan tanda", "Darab tanda negatif ke semua sebutan dalam kurungan", "−(a − b) = −a + b"],
              ["Pendaraban", "Tambahkan kuasa pemboleh ubah yang sama", "3ab² × 4a³b = 12a⁴b³"],
              ["Pembahagian", "Tolakkan kuasa pemboleh ubah yang sama", "20m⁴n² ÷ 5m²n³ = 4m²/n"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Pemboleh ubah ialah huruf yang mewakili nilai yang tidak diketahui, contohnya x, y, a dan n.",
    "Untuk mencari nilai ungkapan, gantikan pemboleh ubah dengan nombor dan ikut tertib operasi.",
    "Pekali ialah nombor di hadapan pemboleh ubah; pekali bagi y ialah 1 dan pekali bagi −n ialah −1.",
    "Sebutan serupa mesti mempunyai pemboleh ubah dan kuasa yang sama; hanya sebutan serupa boleh ditambah atau ditolak.",
    "Apabila membuka kurungan dengan tanda negatif di hadapannya, tukar tanda setiap sebutan di dalam kurungan.",
    "Pendaraban sebutan algebra: tambahkan kuasa pemboleh ubah yang sama (aᵐ × aⁿ = aᵐ⁺ⁿ).",
    "Pembahagian sebutan algebra: tolakkan kuasa pemboleh ubah yang sama (aᵐ ÷ aⁿ = aᵐ⁻ⁿ).",
    "a × a = a² dan a × a × a = a³ — tatatanda kuasa memendekkan pendaraban berulang.",
  ],
  keyTerms: [
    "Algebra",
    "Pemboleh ubah",
    "Ungkapan algebra",
    "Sebutan algebra",
    "Pekali",
    "Sebutan serupa",
    "Sebutan tidak serupa",
    "Peraturan tanda",
    "Kuasa",
    "Hukum penambahan kuasa",
    "Hukum penolakan kuasa",
  ],
};
