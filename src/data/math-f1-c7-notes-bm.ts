import type { StructuredNotes } from "./types";

export const mathF1C7NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 7 memperkenalkan ketaksamaan linear, simbol ketaksamaan, dan cara mewakilkannya pada garis nombor. Murid akan mempelajari cara menyelesaikan ketaksamaan linear, menentukan nilai integer yang mungkin, serta menyelesaikan ketaksamaan linear serentak untuk mencari nilai sepunya.",
  quickRevision: [
    "Ketaksamaan linear ialah hubungan antara dua ungkapan linear yang tidak semestinya sama nilainya, melibatkan pemboleh ubah berkuasa 1.",
    "Simbol ketaksamaan: > (lebih besar daripada), < (lebih kecil daripada), ≥ (lebih besar daripada atau sama dengan), ≤ (lebih kecil daripada atau sama dengan).",
    "Garis nombor digunakan untuk mewakili penyelesaian ketaksamaan secara visual.",
    "Bulatan terbuka (○) digunakan untuk > dan <; bulatan tertutup (●) digunakan untuk ≥ dan ≤.",
    "Anak panah menghala ke kanan jika x > a atau x ≥ a; menghala ke kiri jika x < a atau x ≤ a.",
    "Apabila mendarab atau membahagi kedua-dua belah ketaksamaan dengan nombor negatif, arah simbol MESTI ditukar.",
    "Sifat Akas: jika a < b, maka b > a.",
    "Sifat Transitif: jika a < b dan b < c, maka a < c.",
    "Ketaksamaan linear serentak diselesaikan dengan mencari kawasan bertindih (nilai sepunya) pada garis nombor.",
    "Jika tiada kawasan bertindih antara dua ketaksamaan serentak, maka tiada nilai sepunya.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan menggunakan simbol ketaksamaan dengan betul.",
            "Mewakilkan ketaksamaan linear pada garis nombor menggunakan bulatan terbuka dan tertutup.",
            "Menentukan arah anak panah pada garis nombor berdasarkan simbol ketaksamaan.",
            "Menyelesaikan ketaksamaan linear dalam satu pemboleh ubah.",
            "Menentukan nilai integer yang mungkin bagi ketaksamaan yang diberi.",
            "Menyelesaikan ketaksamaan linear serentak dan mencari nilai sepunya.",
            "Mengenal pasti situasi tiada nilai sepunya.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan kepada Ketaksamaan Linear",
      subsections: [
        {
          title: "Definisi",
          content:
            "Ketaksamaan linear ialah hubungan antara dua ungkapan di mana nilai-nilai tidak semestinya sama. Perkataan 'linear' bermaksud pemboleh ubah dalam ungkapan tersebut berkuasa 1.",
        },
        {
          title: "Maksud 'Linear'",
          content:
            "Linear bermaksud pemboleh ubah dalam ungkapan hanya berkuasa 1 sahaja. Pemboleh ubah tidak boleh berkuasa dua atau lebih.",
          table: {
            headers: ["Ungkapan Linear", "Bukan Linear"],
            rows: [
              ["4a (kuasa a ialah 1)", "4a² (kuasa a ialah 2)"],
              ["−7x (kuasa x ialah 1)", "−7x³ (kuasa x ialah 3)"],
              ["2y + 3 (kuasa y ialah 1)", "2y² + 3y (kuasa y ialah 2)"],
              ["5m − 1 (kuasa m ialah 1)", "5m² − 1 (kuasa m ialah 2)"],
            ],
          },
        },
        {
          title: "Maksud 'Ketaksamaan'",
          content:
            "Ketaksamaan bermaksud dua nilai atau ungkapan tidak semestinya sama. Berbeza daripada persamaan (=) yang menyatakan kedua-dua belah SAMA nilai, ketaksamaan menyatakan hubungan yang lebih besar, lebih kecil, atau tidak sama.",
        },
        {
          title: "Perbezaan Persamaan dan Ketaksamaan",
          table: {
            headers: ["Persamaan", "Ketaksamaan"],
            rows: [
              ["Menggunakan tanda =", "Menggunakan simbol >, <, ≥, atau ≤"],
              ["Kedua-dua belah SAMA nilai", "Kedua-dua belah TIDAK SEMESTINYA sama"],
              ["Biasanya satu penyelesaian", "Biasanya banyak penyelesaian"],
              ["Contoh: x + 3 = 7 → x = 4", "Contoh: x + 3 > 7 → x > 4"],
            ],
          },
        },
      ],
    },
    {
      title: "2. Simbol Ketaksamaan",
      subsections: [
        {
          title: "Empat Simbol Utama",
          content:
            "Terdapat empat simbol ketaksamaan yang digunakan dalam matematik Tingkatan 1:",
          table: {
            headers: ["Simbol", "Makna", "Contoh", "Kata Kunci"],
            rows: [
              ["> ", "Lebih besar daripada", "x > 5", "Greater than, lebih daripada"],
              ["<", "Lebih kecil daripada", "x < 5", "Less than, kurang daripada"],
              ["≥", "Lebih besar daripada atau sama dengan", "x ≥ 5", "At least, sekurang-kurangnya, minimum"],
              ["≤", "Lebih kecil daripada atau sama dengan", "x ≤ 5", "At most, paling banyak, maksimum"],
            ],
          },
        },
        {
          title: "Kata Kunci dan Simbol",
          bulletPoints: [
            "'Lebih daripada' / 'Greater than' → gunakan simbol >",
            "'Kurang daripada' / 'Less than' → gunakan simbol <",
            "'Sekurang-kurangnya' / 'At least' / 'Minimum' → gunakan simbol ≥",
            "'Paling banyak' / 'At most' / 'Maksimum' → gunakan simbol ≤",
            "'Tidak melebihi' / 'Not more than' → gunakan simbol ≤",
            "'Tidak kurang daripada' / 'Not less than' → gunakan simbol ≥",
          ],
        },
        {
          title: "Contoh Situasi Harian",
          table: {
            headers: ["Situasi", "Ketaksamaan"],
            rows: [
              ["Umur Alif melebihi 12 tahun", "u > 12"],
              ["Suhu bilik kurang daripada 25°C", "s < 25"],
              ["Markah minimum lulus ialah 50", "m ≥ 50"],
              ["Had laju tidak melebihi 110 km/j", "h ≤ 110"],
            ],
          },
        },
      ],
    },
    {
      title: "3. Garis Nombor",
      subsections: [
        {
          title: "Definisi",
          content:
            "Garis nombor ialah alat visual berbentuk garis mendatar yang digunakan untuk mewakili semua nilai yang memenuhi sesuatu ketaksamaan. Garis nombor membantu murid memahami julat penyelesaian dengan jelas.",
        },
        {
          title: "Cara Membaca Garis Nombor",
          bulletPoints: [
            "Nombor bertambah dari kiri ke kanan.",
            "Bulatan pada garis nombor menandakan sempadan nilai.",
            "Anak panah menunjukkan arah kesinambungan nilai yang memenuhi ketaksamaan.",
            "Kawasan berlorek atau garisan tebal menunjukkan semua nilai penyelesaian.",
          ],
        },
        {
          title: "Contoh 1: x > 3",
          content:
            "Garis nombor menunjukkan bulatan terbuka pada 3, dengan anak panah menghala ke kanan. Ini bermaksud semua nilai yang lebih besar daripada 3 memenuhi ketaksamaan, tetapi 3 sendiri tidak termasuk.",
          formula: "x > 3\nBulatan terbuka pada 3 → anak panah ke kanan (→)",
        },
        {
          title: "Contoh 2: x ≤ −4",
          content:
            "Garis nombor menunjukkan bulatan tertutup pada −4, dengan anak panah menghala ke kiri. Ini bermaksud semua nilai yang lebih kecil daripada atau sama dengan −4 memenuhi ketaksamaan, termasuk −4 itu sendiri.",
          formula: "x ≤ −4\nBulatan tertutup pada −4 → anak panah ke kiri (←)",
        },
        {
          title: "Contoh 3: −1 < x ≤ 3",
          content:
            "Ketaksamaan berganda ini bermaksud x lebih besar daripada −1 DAN x lebih kecil daripada atau sama dengan 3. Garis nombor menunjukkan kawasan berlorek antara −1 (bulatan terbuka) dan 3 (bulatan tertutup).",
          formula: "−1 < x ≤ 3\nBulatan terbuka pada −1, bulatan tertutup pada 3\nKawasan berlorek antara −1 dan 3",
        },
      ],
    },
    {
      title: "4. Bulatan Terbuka dan Bulatan Tertutup",
      subsections: [
        {
          title: "Bulatan Terbuka ○",
          content:
            "Bulatan terbuka digunakan apabila nilai sempadan TIDAK termasuk dalam penyelesaian. Ia digunakan dengan simbol > (lebih besar daripada) dan < (lebih kecil daripada).",
          table: {
            headers: ["Simbol", "Jenis Bulatan", "Nombor Sempadan"],
            rows: [
              ["> (lebih besar daripada)", "Bulatan terbuka ○", "Tidak termasuk"],
              ["< (lebih kecil daripada)", "Bulatan terbuka ○", "Tidak termasuk"],
            ],
          },
        },
        {
          title: "Contoh Bulatan Terbuka",
          bulletPoints: [
            "x > 3: Bulatan terbuka pada 3 — nilai 3 TIDAK termasuk dalam penyelesaian.",
            "x < −2: Bulatan terbuka pada −2 — nilai −2 TIDAK termasuk dalam penyelesaian.",
            "y > 0: Bulatan terbuka pada 0 — nilai 0 TIDAK termasuk dalam penyelesaian.",
          ],
        },
        {
          title: "Bulatan Tertutup ●",
          content:
            "Bulatan tertutup digunakan apabila nilai sempadan TERMASUK dalam penyelesaian. Ia digunakan dengan simbol ≥ (lebih besar daripada atau sama dengan) dan ≤ (lebih kecil daripada atau sama dengan).",
          table: {
            headers: ["Simbol", "Jenis Bulatan", "Nombor Sempadan"],
            rows: [
              ["≥ (lebih besar daripada atau sama dengan)", "Bulatan tertutup ●", "Termasuk"],
              ["≤ (lebih kecil daripada atau sama dengan)", "Bulatan tertutup ●", "Termasuk"],
            ],
          },
        },
        {
          title: "Contoh Bulatan Tertutup",
          bulletPoints: [
            "x ≥ 3: Bulatan tertutup pada 3 — nilai 3 TERMASUK dalam penyelesaian.",
            "x ≤ −2: Bulatan tertutup pada −2 — nilai −2 TERMASUK dalam penyelesaian.",
            "y ≥ 0: Bulatan tertutup pada 0 — nilai 0 TERMASUK dalam penyelesaian.",
          ],
        },
        {
          title: "Ringkasan Perbandingan",
          table: {
            headers: ["Simbol", "Bulatan", "Nilai Sempadan", "Contoh"],
            rows: [
              [">", "Terbuka ○", "Tidak termasuk", "x > 5 → 5 tidak termasuk"],
              ["<", "Terbuka ○", "Tidak termasuk", "x < 5 → 5 tidak termasuk"],
              ["≥", "Tertutup ●", "Termasuk", "x ≥ 5 → 5 termasuk"],
              ["≤", "Tertutup ●", "Termasuk", "x ≤ 5 → 5 termasuk"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Arah Anak Panah",
      subsections: [
        {
          title: "Prinsip Asas",
          content:
            "Arah anak panah pada garis nombor bergantung kepada jenis ketaksamaan: sama ada nilai x lebih besar atau lebih kecil daripada nilai sempadan.",
        },
        {
          title: "Anak Panah ke Kanan",
          content:
            "Anak panah menghala ke kanan apabila x lebih besar daripada nilai sempadan, iaitu apabila menggunakan simbol > atau ≥.",
          bulletPoints: [
            "x > 3 → Anak panah ke kanan bermula dari bulatan terbuka pada 3.",
            "x ≥ 3 → Anak panah ke kanan bermula dari bulatan tertutup pada 3.",
            "x > −5 → Anak panah ke kanan bermula dari bulatan terbuka pada −5.",
          ],
          formula: "x > a atau x ≥ a → Anak panah ke kanan (→)",
        },
        {
          title: "Anak Panah ke Kiri",
          content:
            "Anak panah menghala ke kiri apabila x lebih kecil daripada nilai sempadan, iaitu apabila menggunakan simbol < atau ≤.",
          bulletPoints: [
            "x < 3 → Anak panah ke kiri bermula dari bulatan terbuka pada 3.",
            "x ≤ 3 → Anak panah ke kiri bermula dari bulatan tertutup pada 3.",
            "x ≤ −4 → Anak panah ke kiri bermula dari bulatan tertutup pada −4.",
          ],
          formula: "x < a atau x ≤ a → Anak panah ke kiri (←)",
        },
        {
          title: "Jadual Ringkasan",
          table: {
            headers: ["Ketaksamaan", "Bulatan", "Arah Anak Panah"],
            rows: [
              ["x > a", "Terbuka ○", "Ke kanan →"],
              ["x ≥ a", "Tertutup ●", "Ke kanan →"],
              ["x < a", "Terbuka ○", "Ke kiri ←"],
              ["x ≤ a", "Tertutup ●", "Ke kiri ←"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Peraturan Menukar Arah Simbol",
      subsections: [
        {
          title: "Amaran Penting",
          content:
            "Ini adalah bahagian yang paling kerap menyebabkan kesilapan! Dalam sesetengah operasi algebra, arah simbol ketaksamaan MESTI ditukar supaya ketaksamaan kekal benar.",
        },
        {
          title: "Peraturan 1: Memindahkan Negatif",
          content:
            "Apabila pemboleh ubah x berada dalam bentuk −x, tukar kepada x dengan mendarab kedua-dua belah dengan −1. Arah simbol MESTI DITUKAR.",
          formula:
            "Contoh:\n−x > −3\nDarab kedua-dua belah dengan −1:\nx < 3   ← Simbol ditukar daripada > kepada <",
        },
        {
          title: "Peraturan 2: Mendarab dengan Nombor Negatif",
          content:
            "Apabila mendarab kedua-dua belah ketaksamaan dengan nombor negatif, arah simbol MESTI DITUKAR.",
          formula:
            "Contoh:\n−2x > 6\nBahagi kedua-dua belah dengan −2:\nx < −3   ← Simbol ditukar daripada > kepada <",
        },
        {
          title: "Peraturan 3: Membahagi dengan Nombor Negatif",
          content:
            "Apabila membahagi kedua-dua belah ketaksamaan dengan nombor negatif, arah simbol MESTI DITUKAR.",
          formula:
            "Contoh:\n−4x ≤ 8\nBahagi kedua-dua belah dengan −4:\nx ≥ −2   ← Simbol ditukar daripada ≤ kepada ≥",
        },
        {
          title: "Peraturan 4: Salingan (Reciprocal Rule)",
          content:
            "Apabila mengambil salingan (reciprocal) kedua-dua belah ketaksamaan, arah simbol MESTI DITUKAR. Syarat: a dan b mestilah nombor positif.",
          formula:
            "Jika a < b (dengan a, b > 0), maka:\n1/a > 1/b\n\nContoh:\n2 < 5\n1/2 > 1/5 ✓",
        },
        {
          title: "Kenapa Simbol Perlu Ditukar?",
          content:
            "Contoh mudah: 3 < 7 adalah benar. Apabila kita darabkan kedua-dua belah dengan −1, kita dapat −3 dan −7. Pada garis nombor, −3 berada DI KANAN −7, jadi −3 > −7. Oleh itu, apabila darab dengan negatif, simbol MESTI ditukar.",
          formula:
            "3 < 7\nDarab dengan −1:\n−3 > −7   ← Simbol ditukar!",
        },
      ],
    },
    {
      title: "7. Mendarab dan Membahagi dengan Nombor Negatif",
      subsections: [
        {
          title: "Peraturan Utama",
          content:
            "Apabila mendarab ATAU membahagi KEDUA-DUA BELAH ketaksamaan dengan nombor NEGATIF, arah simbol ketaksamaan MESTI DITUKAR.",
        },
        {
          title: "Pendaraban dengan Nombor Negatif",
          content: "Setiap kali anda mendarab kedua-dua belah ketaksamaan dengan nombor negatif, tukar arah simbol.",
          table: {
            headers: ["Ketaksamaan Asal", "Operasi", "Ketaksamaan Baru"],
            rows: [
              ["−x > 3", "Darab dengan −1", "x < −3"],
              ["−2x ≥ 8", "Darab dengan −1/2 (atau bahagi −2)", "x ≤ −4"],
              ["−3x < −9", "Bahagi dengan −3", "x > 3"],
            ],
          },
        },
        {
          title: "Pembahagian dengan Nombor Negatif",
          content: "Setiap kali anda membahagi kedua-dua belah ketaksamaan dengan nombor negatif, tukar arah simbol.",
          formula:
            "Contoh penyelesaian lengkap:\n−4x ≤ 8\nBahagi kedua-dua belah dengan −4:\nx ≥ 8 ÷ (−4)\nx ≥ −2   ← ≤ ditukar kepada ≥",
        },
        {
          title: "Kesilapan Lazim",
          content:
            "Kesilapan yang paling kerap dilakukan: TERLUPA menukar simbol apabila mendarab atau membahagi dengan nombor negatif. Sentiasa semak tanda pekali pemboleh ubah sebelum menyelesaikan ketaksamaan.",
          bulletPoints: [
            "Salah: −2x > 6 → x > −3 ❌ (simbol tidak ditukar)",
            "Betul: −2x > 6 → x < −3 ✓ (simbol ditukar kerana bahagi dengan −2)",
          ],
        },
      ],
    },
    {
      title: "8. Sifat Akas",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sifat Akas menyatakan bahawa jika a < b, maka b > a. Dengan kata lain, apabila kita menukar susunan nombor dalam ketaksamaan, kita mesti menukar arah simbol.",
        },
        {
          title: "Pernyataan Lengkap",
          formula:
            "Jika a < b, maka b > a.\nJika a > b, maka b < a.\nJika a ≤ b, maka b ≥ a.\nJika a ≥ b, maka b ≤ a.",
        },
        {
          title: "Contoh Sifat Akas",
          table: {
            headers: ["Ketaksamaan Asal", "Bentuk Akas"],
            rows: [
              ["x < 5", "5 > x"],
              ["3 > −1", "−1 < 3"],
              ["y ≤ 8", "8 ≥ y"],
              ["2 ≥ −4", "−4 ≤ 2"],
            ],
          },
        },
        {
          title: "Kegunaan Sifat Akas",
          content:
            "Sifat Akas berguna apabila kita ingin menulis semula sesuatu ketaksamaan dalam bentuk yang berbeza tetapi setara. Kedua-dua bentuk mewakili hubungan yang sama antara dua nilai.",
          bulletPoints: [
            "x < 5 adalah setara dengan 5 > x.",
            "Kedua-dua bentuk bermaksud x berada di bawah 5.",
            "Pilih bentuk yang lebih mudah untuk kerja-kerja seterusnya.",
          ],
        },
      ],
    },
    {
      title: "9. Sifat Transitif",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sifat Transitif menyatakan bahawa jika a < b dan b < c, maka a < c. Ini bermaksud hubungan ketaksamaan boleh 'dipindahkan' melalui rantaian nilai.",
        },
        {
          title: "Pernyataan Lengkap",
          formula:
            "Jika a < b dan b < c, maka a < c.\nJika a > b dan b > c, maka a > c.\nJika a ≤ b dan b ≤ c, maka a ≤ c.",
        },
        {
          title: "Contoh Sifat Transitif",
          table: {
            headers: ["Syarat Pertama", "Syarat Kedua", "Kesimpulan"],
            rows: [
              ["x < 3", "3 < 7", "Maka x < 7"],
              ["2 < y", "y < 10", "Maka 2 < 10 (benar)"],
              ["a < b", "b < c", "Maka a < c"],
              ["−2 < x", "x < 5", "Maka −2 < 5 (benar)"],
            ],
          },
        },
        {
          title: "Kaitan dengan Ketaksamaan Berganda",
          content:
            "Sifat Transitif menjelaskan mengapa ketaksamaan berganda seperti −1 < x < 5 bermaksud bahawa x berada antara −1 dan 5. Kerana −1 < x dan x < 5, maka −1 < 5 secara automatik.",
          formula: "−1 < x < 5 bermaksud:\n−1 < x (x lebih besar daripada −1)\ndan x < 5 (x lebih kecil daripada 5)",
        },
      ],
    },
    {
      title: "10. Menyelesaikan Ketaksamaan Linear",
      subsections: [
        {
          title: "Langkah-Langkah Penyelesaian",
          bulletPoints: [
            "Langkah 1: Selesaikan ketaksamaan untuk mencari nilai atau julat x.",
            "Langkah 2: Wakilkan penyelesaian pada garis nombor (bulatan terbuka/tertutup dan anak panah).",
            "Langkah 3: Senaraikan nilai integer yang mungkin jika diperlukan.",
          ],
        },
        {
          title: "Contoh 1: Ketaksamaan Mudah",
          content: "Selesaikan 2x + 3 > 7.",
          formula:
            "2x + 3 > 7\n2x > 7 − 3\n2x > 4\nx > 2\n\nGaris nombor: Bulatan terbuka pada 2, anak panah ke kanan.\nNilai integer yang mungkin: 3, 4, 5, 6, ...",
        },
        {
          title: "Contoh 2: Dengan Nombor Positif",
          content: "Selesaikan 3x − 1 ≤ 8.",
          formula:
            "3x − 1 ≤ 8\n3x ≤ 8 + 1\n3x ≤ 9\nx ≤ 3\n\nGaris nombor: Bulatan tertutup pada 3, anak panah ke kiri.\nNilai integer yang mungkin: 3, 2, 1, 0, −1, ...",
        },
        {
          title: "Contoh 3: Dengan Nombor Negatif (Simbol Ditukar)",
          content: "Selesaikan −2x + 5 > 1.",
          formula:
            "−2x + 5 > 1\n−2x > 1 − 5\n−2x > −4\nBahagi dengan −2 (simbol DITUKAR):\nx < 2\n\nGaris nombor: Bulatan terbuka pada 2, anak panah ke kiri.\nNilai integer yang mungkin: 1, 0, −1, −2, ...",
        },
        {
          title: "Contoh 4: Ketaksamaan dengan Pecahan",
          content: "Selesaikan x/3 + 1 ≥ 4.",
          formula:
            "x/3 + 1 ≥ 4\nx/3 ≥ 3\nx ≥ 9\n\nGaris nombor: Bulatan tertutup pada 9, anak panah ke kanan.\nNilai integer yang mungkin: 9, 10, 11, 12, ...",
        },
      ],
    },
    {
      title: "11. Menentukan Nilai Integer yang Mungkin",
      subsections: [
        {
          title: "Definisi",
          content:
            "Nilai integer yang mungkin ialah semua nombor bulat (integer) yang memenuhi sesuatu ketaksamaan. Integer termasuk nombor bulat positif, negatif, dan sifar.",
        },
        {
          title: "Contoh dengan Julat Terbuka",
          bulletPoints: [
            "x > 3 → Nilai integer yang mungkin: 4, 5, 6, 7, ... (tidak terhingga)",
            "x < −1 → Nilai integer yang mungkin: −2, −3, −4, −5, ... (tidak terhingga)",
            "x ≥ 5 → Nilai integer yang mungkin: 5, 6, 7, 8, ... (termasuk 5, tidak terhingga)",
            "x ≤ 2 → Nilai integer yang mungkin: 2, 1, 0, −1, −2, ... (termasuk 2, tidak terhingga)",
          ],
        },
        {
          title: "Contoh dengan Julat Tertutup (Berganda)",
          table: {
            headers: ["Ketaksamaan", "Nilai Integer yang Mungkin"],
            rows: [
              ["−1 < x ≤ 4", "0, 1, 2, 3, 4"],
              ["2 ≤ x < 7", "2, 3, 4, 5, 6"],
              ["−3 ≤ x ≤ 3", "−3, −2, −1, 0, 1, 2, 3"],
              ["1 < x < 5", "2, 3, 4"],
            ],
          },
        },
        {
          title: "Nota Penting",
          content:
            "Perhatikan sama ada sempadan termasuk atau tidak berdasarkan jenis bulatan pada garis nombor. Bulatan tertutup (●) bermaksud nilai sempadan termasuk; bulatan terbuka (○) bermaksud nilai sempadan tidak termasuk.",
        },
      ],
    },
    {
      title: "12. Ketaksamaan Linear Serentak",
      subsections: [
        {
          title: "Definisi",
          content:
            "Ketaksamaan linear serentak ialah dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah. Matlamatnya ialah mencari nilai sepunya yang memenuhi semua ketaksamaan tersebut.",
        },
        {
          title: "Langkah Menyelesaikan Ketaksamaan Serentak",
          bulletPoints: [
            "Langkah 1: Selesaikan setiap ketaksamaan secara berasingan.",
            "Langkah 2: Wakilkan kedua-dua penyelesaian pada garis nombor yang sama.",
            "Langkah 3: Kenal pasti kawasan bertindih (kawasan yang dipenuhi oleh KEDUA-DUA ketaksamaan).",
            "Langkah 4: Tulis penyelesaian serentak dalam bentuk ketaksamaan berganda jika boleh.",
            "Langkah 5: Senaraikan nilai integer yang mungkin.",
          ],
        },
        {
          title: "Tiga Senario Ketaksamaan Serentak",
          table: {
            headers: ["Senario", "Penerangan", "Keputusan"],
            rows: [
              ["Bertindih di tengah", "Kedua-dua kawasan bertemu di tengah", "Julat terhad (nilai sepunya wujud)"],
              ["Bertindih satu arah", "Kedua-dua kawasan hala sama, gunakan syarat lebih ketat", "Julat terhad (nilai sepunya wujud)"],
              ["Tidak bertindih", "Kedua-dua kawasan tidak bertemu langsung", "Tiada nilai sepunya"],
            ],
          },
        },
      ],
    },
    {
      title: "13. Nilai Sepunya",
      subsections: [
        {
          title: "Definisi",
          content:
            "Nilai sepunya ialah nilai (atau julat nilai) yang memenuhi KEDUA-DUA ketaksamaan dalam ketaksamaan serentak pada masa yang sama. Nilai sepunya ditemui pada kawasan bertindih di garis nombor.",
        },
        {
          title: "Senario 1: Kawasan Bertindih di Tengah",
          content:
            "Apabila dua ketaksamaan membentuk julat yang berlawanan arah dan bertemu di tengah, nilai sepunya berada di kawasan pertindihan tengah.",
          formula:
            "Contoh:\nKetaksamaan 1: x > −1\nKetaksamaan 2: x ≤ 3\n\nPada garis nombor:\n→ x > −1 (anak panah ke kanan dari −1)\n← x ≤ 3 (anak panah ke kiri dari 3)\nKawasan bertindih: −1 < x ≤ 3\n\nNilai integer yang mungkin: 0, 1, 2, 3",
        },
        {
          title: "Senario 2: Bertindih Satu Arah (Arah Sama)",
          content:
            "Apabila dua ketaksamaan menghala ke arah yang sama, gunakan SYARAT YANG LEBIH KETAT (nilai yang lebih membataskan). Nilai sepunya ialah kawasan yang dipenuhi oleh syarat yang lebih ketat.",
          formula:
            "Contoh A (Kedua-dua ke kanan):\nx > 2 DAN x > 5\nSyarat lebih ketat: x > 5\nNilai integer yang mungkin: 6, 7, 8, ...\n\nContoh B (Kedua-dua ke kiri):\nx ≤ 3 DAN x ≤ 1\nSyarat lebih ketat: x ≤ 1\nNilai integer yang mungkin: 1, 0, −1, −2, ...",
        },
        {
          title: "Cara Menentukan Syarat Lebih Ketat",
          bulletPoints: [
            "Jika kedua-dua ketaksamaan menghala ke kanan (> atau ≥): pilih sempadan yang LEBIH BESAR.",
            "Jika kedua-dua ketaksamaan menghala ke kiri (< atau ≤): pilih sempadan yang LEBIH KECIL.",
            "Contoh: x > 2 dan x > 5 → syarat lebih ketat ialah x > 5 (sempadan lebih besar).",
            "Contoh: x ≤ 3 dan x ≤ 1 → syarat lebih ketat ialah x ≤ 1 (sempadan lebih kecil).",
          ],
        },
      ],
    },
    {
      title: "14. Situasi Tiada Nilai Sepunya",
      subsections: [
        {
          title: "Definisi",
          content:
            "Tiada nilai sepunya bermaksud tiada sebarang nilai yang memenuhi KEDUA-DUA ketaksamaan serentak pada masa yang sama. Ini berlaku apabila kawasan penyelesaian kedua-dua ketaksamaan tidak bertindih langsung pada garis nombor.",
        },
        {
          title: "Contoh Situasi Tiada Nilai Sepunya",
          formula:
            "Contoh 1:\nx > 5 DAN x < 2\n→ x > 5: semua nilai melebihi 5 (ke kanan 5)\n→ x < 2: semua nilai kurang daripada 2 (ke kiri 2)\n→ Tiada nilai yang boleh melebihi 5 DAN kurang daripada 2 pada masa yang sama.\n→ Tiada nilai sepunya!\n\nContoh 2:\nx ≥ 4 DAN x ≤ 1\n→ x ≥ 4: semua nilai 4 ke atas\n→ x ≤ 1: semua nilai 1 ke bawah\n→ Tiada kawasan bertindih.\n→ Tiada nilai sepunya!",
        },
        {
          title: "Cara Mengenal Pasti Tiada Nilai Sepunya",
          bulletPoints: [
            "Lakarkan kedua-dua ketaksamaan pada garis nombor yang sama.",
            "Jika kawasan berlorek kedua-dua ketaksamaan tidak bertemu, maka tiada nilai sepunya.",
            "Nilai sepunya wujud HANYA jika terdapat kawasan yang dipenuhi oleh KEDUA-DUA ketaksamaan.",
          ],
        },
        {
          title: "Perbandingan: Ada dan Tiada Nilai Sepunya",
          table: {
            headers: ["Situasi", "Contoh", "Keputusan"],
            rows: [
              ["Kawasan bertindih wujud", "x > 1 dan x < 5", "Ada nilai sepunya: 1 < x < 5"],
              ["Kawasan tidak bertindih", "x > 5 dan x < 2", "Tiada nilai sepunya"],
              ["Sempadan bertemu sahaja", "x > 3 dan x < 3", "Tiada nilai sepunya"],
            ],
          },
        },
      ],
    },
    {
      title: "15. Ringkasan Bab",
      subsections: [
        {
          content:
            "Jadual di bawah merumuskan konsep-konsep utama yang dipelajari dalam Bab 7: Ketaksamaan Linear.",
          table: {
            headers: ["Konsep", "Penerangan Ringkas", "Contoh"],
            rows: [
              ["Simbol >", "Lebih besar daripada", "x > 3: x melebihi 3"],
              ["Simbol <", "Lebih kecil daripada", "x < 3: x kurang dari 3"],
              ["Simbol ≥", "Lebih besar atau sama dengan (minimum)", "x ≥ 3: x sekurang-kurangnya 3"],
              ["Simbol ≤", "Lebih kecil atau sama dengan (maksimum)", "x ≤ 3: x paling banyak 3"],
              ["Bulatan terbuka ○", "Nilai sempadan TIDAK termasuk (untuk > dan <)", "x > 3: bulatan terbuka pada 3"],
              ["Bulatan tertutup ●", "Nilai sempadan TERMASUK (untuk ≥ dan ≤)", "x ≥ 3: bulatan tertutup pada 3"],
              ["Menukar simbol", "Wajib tukar simbol apabila darab/bahagi dengan negatif", "−2x > 6 → x < −3"],
              ["Sifat Akas", "Jika a < b maka b > a", "x < 5 bermaksud 5 > x"],
              ["Sifat Transitif", "Jika a < b dan b < c maka a < c", "x < 3 dan 3 < 7 → x < 7"],
              ["Nilai integer", "Nombor bulat yang memenuhi ketaksamaan", "x > 3: 4, 5, 6, ..."],
              ["Ketaksamaan serentak", "Dua ketaksamaan dipenuhi serentak", "x > −1 dan x ≤ 3 → −1 < x ≤ 3"],
              ["Nilai sepunya", "Kawasan bertindih kedua-dua ketaksamaan", "−1 < x ≤ 3: integer 0, 1, 2, 3"],
              ["Tiada nilai sepunya", "Kawasan tidak bertindih", "x > 5 dan x < 2: tiada penyelesaian"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Pemboleh ubah dalam ketaksamaan linear mesti berkuasa 1; jika berkuasa dua atau lebih, ia bukan ketaksamaan linear.",
    "Bulatan terbuka (○) untuk > dan <; bulatan tertutup (●) untuk ≥ dan ≤.",
    "Anak panah ke kanan untuk x > a atau x ≥ a; anak panah ke kiri untuk x < a atau x ≤ a.",
    "WAJIB tukar arah simbol apabila mendarab atau membahagi kedua-dua belah dengan nombor NEGATIF.",
    "Sifat Akas: jika a < b, maka b > a — susunan ditukar, simbol juga ditukar.",
    "Sifat Transitif: jika a < b dan b < c, maka a < c.",
    "Ketaksamaan serentak: cari kawasan bertindih pada garis nombor untuk mencari nilai sepunya.",
    "Tiada nilai sepunya apabila kawasan dua ketaksamaan tidak bertindih langsung pada garis nombor.",
  ],
  keyTerms: [
    "Ketaksamaan linear",
    "Simbol ketaksamaan",
    "Garis nombor",
    "Bulatan terbuka",
    "Bulatan tertutup",
    "Anak panah",
    "Menukar simbol",
    "Nombor negatif",
    "Sifat Akas",
    "Sifat Transitif",
    "Nilai integer",
    "Ketaksamaan serentak",
    "Nilai sepunya",
    "Tiada nilai sepunya",
  ],
};
