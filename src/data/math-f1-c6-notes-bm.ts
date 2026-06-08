import type { StructuredNotes } from "./types";

export const mathF1C6NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 6 memperkenalkan persamaan linear dalam satu dan dua pemboleh ubah, kaedah menyelesaikannya (cuba jaya, konsep kesamaan, pematahbalikan), serta persamaan linear serentak yang diselesaikan menggunakan kaedah penggantian, penghapusan, graf dan kalkulator saintifik.",
  quickRevision: [
    "Persamaan linear ialah persamaan dengan kuasa tertinggi pemboleh ubah ialah 1.",
    "Persamaan linear satu pemboleh ubah hanya mengandungi satu pemboleh ubah, contohnya x + 7 = 11.",
    "Konsep kesamaan: lakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang.",
    "Kaedah pematahbalikan menggunakan operasi songsang: + ↔ −, × ↔ ÷, mengikut turutan terbalik.",
    "Persamaan linear dua pemboleh ubah mengandungi dua pemboleh ubah berkuasa satu, contohnya 5x + 2y = 8.",
    "Persamaan linear dua pemboleh ubah mempunyai penyelesaian yang tidak terhingga banyaknya.",
    "Persamaan linear serentak ialah dua persamaan yang diselesaikan bersama untuk mencari nilai x dan y.",
    "Persamaan serentak boleh mempunyai penyelesaian unik, tiada penyelesaian, atau penyelesaian tak terhingga.",
    "Kaedah penggantian dan kaedah penghapusan ialah dua cara algebra untuk menyelesaikan persamaan serentak.",
    "Kaedah graf menyelesaikan persamaan serentak dengan mencari titik persilangan dua garis lurus.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan membezakan persamaan linear dengan persamaan bukan linear.",
            "Membentuk persamaan linear satu dan dua pemboleh ubah daripada situasi harian.",
            "Menyelesaikan persamaan linear satu pemboleh ubah menggunakan kaedah cuba jaya, konsep kesamaan dan pematahbalikan.",
            "Menentukan penyelesaian yang mungkin bagi persamaan linear dua pemboleh ubah.",
            "Memahami konsep persamaan linear serentak dan jenis-jenis penyelesaiannya.",
            "Menyelesaikan persamaan linear serentak menggunakan kaedah penggantian, penghapusan, graf dan kalkulator saintifik.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan kepada Persamaan Linear",
      subsections: [
        {
          title: "Definisi",
          content:
            "Persamaan linear ialah persamaan yang kuasa tertinggi bagi pemboleh ubahnya ialah 1.",
        },
        {
          title: "Persamaan Linear Berbanding Bukan Linear",
          content:
            "Persamaan linear hanya mengandungi pemboleh ubah berkuasa satu, manakala persamaan bukan linear mengandungi pemboleh ubah berkuasa lebih daripada satu, contohnya kuasa dua.",
          table: {
            headers: ["Persamaan Linear", "Persamaan Bukan Linear"],
            rows: [
              ["5r + 1 = 0", "10x² + 5x − 3 = 1"],
              ["x + 7 = 11", "x² − 4 = 0"],
              ["5x + 2y = 8", "x² + y = 6"],
            ],
          },
        },
        {
          title: "Cara Mengenal Pasti",
          bulletPoints: [
            "Periksa kuasa tertinggi setiap pemboleh ubah dalam persamaan.",
            "Jika semua pemboleh ubah berkuasa satu, persamaan itu ialah persamaan linear.",
            "Jika terdapat pemboleh ubah berkuasa dua atau lebih, persamaan itu bukan persamaan linear.",
          ],
        },
      ],
    },
    {
      title: "2. Persamaan Linear dalam Satu Pemboleh Ubah",
      subsections: [
        {
          title: "Ciri Utama",
          content:
            "Persamaan linear dalam satu pemboleh ubah hanya mengandungi satu jenis pemboleh ubah sahaja, dan pemboleh ubah itu berkuasa satu.",
        },
        {
          title: "Contoh",
          bulletPoints: ["x + 7 = 11", "m/6 = 12", "5r + 1 = 0"],
          formula: "x + 7 = 11\nm/6 = 12",
        },
      ],
    },
    {
      title: "3. Membentuk Persamaan Linear",
      subsections: [
        {
          title: "Daripada Situasi Harian",
          content:
            "Persamaan linear boleh dibentuk dengan mewakilkan kuantiti yang tidak diketahui menggunakan pemboleh ubah, kemudian menterjemah ayat atau situasi kepada bentuk matematik.",
        },
        {
          title: "Contoh 1: Pembahagian",
          content: "Suatu nombor m dibahagi dengan 6 memberikan 12.",
          formula: "m/6 = 12",
        },
        {
          title: "Contoh 2: Wang Saku",
          content:
            "Rahim mempunyai wang sebanyak RM p. Dia membelanjakan RM q dan bakinya ialah RM10.",
          formula: "p − q = 10",
        },
        {
          title: "Langkah Membentuk Persamaan",
          bulletPoints: [
            "Kenal pasti kuantiti yang tidak diketahui dan wakilkan dengan pemboleh ubah.",
            "Tulis hubungan antara kuantiti yang diketahui dan tidak diketahui.",
            "Susun hubungan itu menjadi satu persamaan yang lengkap.",
          ],
        },
      ],
    },
    {
      title: "4. Menyelesaikan Persamaan Linear",
      subsections: [
        {
          title: "Maksud Menyelesaikan Persamaan",
          content:
            "Menyelesaikan persamaan linear bermaksud mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan itu sama nilai (benar).",
        },
        {
          title: "Contoh Langkah demi Langkah",
          content: "Selesaikan persamaan x + 7 = 11.",
          formula: "x + 7 = 11\nx + 7 − 7 = 11 − 7\nx = 4",
        },
        {
          title: "Semakan Jawapan",
          content:
            "Untuk menyemak jawapan, gantikan nilai yang diperoleh ke dalam persamaan asal. Jika kedua-dua belah persamaan sama nilai, maka jawapan itu betul. Contoh: 4 + 7 = 11 ✓",
        },
      ],
    },
    {
      title: "5. Kaedah Cuba Jaya",
      subsections: [
        {
          title: "Konsep",
          content:
            "Kaedah cuba jaya menyelesaikan persamaan dengan mencuba beberapa nilai bagi pemboleh ubah sehingga kedua-dua belah persamaan menjadi sama nilai.",
        },
        {
          title: "Contoh",
          content: "Selesaikan persamaan x + 5 = 9 menggunakan kaedah cuba jaya.",
          table: {
            headers: ["Nilai x dicuba", "Sebelah Kiri (x + 5)", "Sebelah Kanan", "Sama?"],
            rows: [
              ["2", "2 + 5 = 7", "9", "Tidak"],
              ["3", "3 + 5 = 8", "9", "Tidak"],
              ["4", "4 + 5 = 9", "9", "Ya — penyelesaian ialah x = 4"],
            ],
          },
        },
        {
          title: "Kelebihan dan Batasan",
          bulletPoints: [
            "Mudah difahami dan sesuai untuk persamaan ringkas.",
            "Mengambil masa lebih lama berbanding kaedah algebra apabila nilai penyelesaian besar atau berupa pecahan.",
          ],
        },
      ],
    },
    {
      title: "6. Aplikasi Konsep Kesamaan",
      subsections: [
        {
          title: "Konsep Kesamaan",
          content:
            "Konsep kesamaan menyatakan bahawa apabila operasi yang sama (penambahan, penolakan, pendaraban atau pembahagian dengan nombor yang sama bukan sifar) dilakukan pada kedua-dua belah persamaan, persamaan itu kekal seimbang dan benar.",
        },
        {
          title: "Contoh: Kad Imbangan",
          content:
            "Bayangkan persamaan sebagai dacing yang seimbang. Apa sahaja yang dilakukan pada satu pihak mesti dilakukan juga pada pihak yang satu lagi supaya dacing itu kekal seimbang.",
        },
        {
          title: "Contoh Penyelesaian",
          content: "Selesaikan x + 7 = 11 menggunakan konsep kesamaan.",
          formula: "x + 7 = 11\nTolak 7 daripada kedua-dua belah:\nx + 7 − 7 = 11 − 7\nx = 4",
        },
        {
          title: "Operasi yang Boleh Dilakukan",
          bulletPoints: [
            "Tambah nombor yang sama pada kedua-dua belah.",
            "Tolak nombor yang sama daripada kedua-dua belah.",
            "Darab kedua-dua belah dengan nombor yang sama bukan sifar.",
            "Bahagi kedua-dua belah dengan nombor yang sama bukan sifar.",
          ],
        },
      ],
    },
    {
      title: "7. Kaedah Pematahbalikan",
      subsections: [
        {
          title: "Konsep Operasi Songsang",
          content:
            "Kaedah pematahbalikan menyelesaikan persamaan dengan membalikkan urutan operasi menggunakan operasi songsangnya.",
          formula: "Penambahan (+) ↔ Penolakan (−)\nPendaraban (×) ↔ Pembahagian (÷)",
        },
        {
          title: "Contoh Langkah demi Langkah",
          content: "Selesaikan persamaan 4x/5 + 7 = 23 menggunakan kaedah pematahbalikan.",
          formula:
            "4x/5 + 7 = 23\nLangkah 1: Tolak 7 daripada kedua-dua belah → 4x/5 = 16\nLangkah 2: Darab kedua-dua belah dengan 5 → 4x = 80\nLangkah 3: Bahagi kedua-dua belah dengan 4 → x = 20",
        },
        {
          title: "Cara Menentukan Urutan Songsang",
          bulletPoints: [
            "Kenal pasti operasi yang dikenakan ke atas pemboleh ubah, mengikut urutan dari dalam ke luar.",
            "Untuk 'membatalkan' setiap operasi, gunakan operasi songsangnya, mengikut urutan terbalik (dari luar ke dalam).",
            "Lakukan setiap langkah pada kedua-dua belah persamaan sehingga pemboleh ubah berdiri sendiri.",
          ],
        },
      ],
    },
    {
      title: "8. Persamaan Linear dalam Dua Pemboleh Ubah",
      subsections: [
        {
          title: "Ciri Utama",
          content:
            "Persamaan linear dalam dua pemboleh ubah mengandungi dua jenis pemboleh ubah, dan setiap satu daripadanya berkuasa satu.",
        },
        {
          title: "Contoh",
          bulletPoints: ["5x + 2y = 8", "p − q = 10", "2m + n = 15"],
          formula: "5x + 2y = 8",
        },
        {
          title: "Perbandingan dengan Satu Pemboleh Ubah",
          table: {
            headers: ["Satu Pemboleh Ubah", "Dua Pemboleh Ubah"],
            rows: [
              ["x + 7 = 11", "5x + 2y = 8"],
              ["Mengandungi satu pemboleh ubah sahaja", "Mengandungi dua pemboleh ubah berbeza"],
              ["Biasanya mempunyai satu penyelesaian", "Mempunyai banyak pasangan penyelesaian"],
            ],
          },
        },
      ],
    },
    {
      title: "9. Membentuk Persamaan Dua Pemboleh Ubah",
      subsections: [
        {
          title: "Daripada Situasi Harian",
          content:
            "Persamaan dua pemboleh ubah dibentuk dengan mewakilkan dua kuantiti yang tidak diketahui menggunakan dua pemboleh ubah berbeza, kemudian menyatakan hubungan antara kedua-duanya.",
        },
        {
          title: "Contoh: Beza Umur",
          content: "Beza antara umur Salim, p tahun, dan umur adiknya, q tahun, ialah 10 tahun.",
          formula: "p − q = 10",
        },
        {
          title: "Langkah Membentuk Persamaan",
          bulletPoints: [
            "Kenal pasti dua kuantiti yang tidak diketahui dan wakilkan dengan dua pemboleh ubah berbeza.",
            "Tentukan hubungan (penambahan, penolakan, pendaraban atau pembahagian) antara kedua-dua kuantiti.",
            "Tulis hubungan itu sebagai satu persamaan dua pemboleh ubah.",
          ],
        },
      ],
    },
    {
      title: "10. Menentukan Penyelesaian Yang Mungkin",
      subsections: [
        {
          title: "Konsep",
          content:
            "Sebuah persamaan linear dua pemboleh ubah mempunyai bilangan penyelesaian yang tidak terhingga, kerana setiap nilai berbeza yang digantikan untuk satu pemboleh ubah akan menghasilkan satu nilai yang sepadan bagi pemboleh ubah yang satu lagi.",
        },
        {
          title: "Contoh: y = 7x + 6",
          content:
            "Dengan menggantikan nilai berbeza bagi x, kita boleh memperoleh pasangan penyelesaian (x, y) yang berbeza.",
          table: {
            headers: ["x", "Pengiraan", "y", "Pasangan Penyelesaian (x, y)"],
            rows: [
              ["0", "y = 7(0) + 6", "6", "(0, 6)"],
              ["1", "y = 7(1) + 6", "13", "(1, 13)"],
              ["2", "y = 7(2) + 6", "20", "(2, 20)"],
            ],
          },
          formula: "y = 7x + 6\nx = 0 → y = 6\nx = 1 → y = 13",
        },
        {
          title: "Catatan Penting",
          content:
            "Setiap pasangan nilai (x, y) yang memenuhi persamaan itu dipanggil satu penyelesaian bagi persamaan tersebut.",
        },
      ],
    },
    {
      title: "11. Persamaan Linear Serentak",
      subsections: [
        {
          title: "Definisi",
          content:
            "Persamaan linear serentak ialah dua atau lebih persamaan linear yang melibatkan pemboleh ubah yang sama dan diselesaikan secara serentak untuk mencari nilai bagi setiap pemboleh ubah yang memenuhi semua persamaan itu pada masa yang sama.",
        },
        {
          title: "Mengapa 'Serentak'?",
          content:
            "Dipanggil 'serentak' kerana penyelesaian (nilai x dan y) yang dicari mestilah memenuhi kedua-dua persamaan pada masa yang sama, bukan hanya salah satu daripadanya.",
        },
        {
          title: "Contoh Pasangan Persamaan Serentak",
          formula: "x + y = 10\nx − y = 2",
        },
      ],
    },
    {
      title: "12. Penyelesaian Unik",
      subsections: [
        {
          title: "Konsep",
          content:
            "Penyelesaian unik berlaku apabila kedua-dua garis lurus yang mewakili persamaan bersilang pada satu titik sahaja. Titik persilangan itu ialah satu-satunya pasangan nilai (x, y) yang memenuhi kedua-dua persamaan.",
        },
        {
          title: "Ciri",
          bulletPoints: [
            "Kedua-dua garis mempunyai kecerunan yang berbeza.",
            "Garis-garis itu bersilang tepat pada satu titik.",
            "Sistem persamaan ini mempunyai tepat satu penyelesaian (x, y).",
          ],
        },
      ],
    },
    {
      title: "13. Tiada Penyelesaian",
      subsections: [
        {
          title: "Konsep",
          content:
            "Tiada penyelesaian berlaku apabila kedua-dua garis lurus yang mewakili persamaan adalah selari dan tidak akan bersilang pada bila-bila titik pun.",
        },
        {
          title: "Ciri",
          bulletPoints: [
            "Kedua-dua garis mempunyai kecerunan yang sama tetapi pintasan-y yang berbeza.",
            "Garis-garis itu tidak akan bertemu walau dilanjutkan sejauh mana sekalipun.",
            "Sistem persamaan ini tidak mempunyai sebarang penyelesaian (x, y) yang sepadan.",
          ],
        },
      ],
    },
    {
      title: "14. Penyelesaian Tak Terhingga",
      subsections: [
        {
          title: "Konsep",
          content:
            "Penyelesaian tak terhingga berlaku apabila kedua-dua persamaan mewakili garis lurus yang sama. Oleh itu, setiap titik pada garis itu ialah satu penyelesaian yang sah.",
        },
        {
          title: "Ciri",
          bulletPoints: [
            "Kedua-dua persamaan, apabila dipermudahkan, adalah setara antara satu sama lain.",
            "Graf kedua-dua persamaan bertindih sepenuhnya menjadi satu garis sahaja.",
            "Sistem persamaan ini mempunyai bilangan penyelesaian (x, y) yang tidak terhingga.",
          ],
        },
        {
          title: "Ringkasan Tiga Jenis Penyelesaian",
          table: {
            headers: ["Jenis Penyelesaian", "Hubungan Garis", "Bilangan Penyelesaian"],
            rows: [
              ["Penyelesaian unik", "Bersilang pada satu titik", "Satu (1)"],
              ["Tiada penyelesaian", "Selari (tidak bersilang)", "Sifar (0)"],
              ["Penyelesaian tak terhingga", "Garis yang sama (bertindih)", "Tidak terhingga"],
            ],
          },
        },
      ],
    },
    {
      title: "15. Kaedah Penggantian",
      subsections: [
        {
          title: "Konsep",
          content:
            "Kaedah penggantian menyelesaikan persamaan linear serentak dengan mengungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi, kemudian menggantikannya ke dalam persamaan kedua.",
        },
        {
          title: "Langkah-Langkah",
          bulletPoints: [
            "Ungkapkan satu pemboleh ubah daripada salah satu persamaan dalam sebutan pemboleh ubah yang satu lagi.",
            "Gantikan ungkapan itu ke dalam persamaan yang satu lagi.",
            "Selesaikan persamaan satu pemboleh ubah yang terhasil.",
            "Gantikan semula nilai yang diperoleh untuk mencari nilai pemboleh ubah yang satu lagi.",
          ],
        },
        {
          title: "Contoh Ringkas",
          content: "Selesaikan pasangan persamaan serentak berikut menggunakan kaedah penggantian: x + y = 10 dan x − y = 2.",
          formula:
            "Daripada x + y = 10, ungkapkan x = 10 − y\nGantikan ke dalam x − y = 2:\n(10 − y) − y = 2\n10 − 2y = 2\n2y = 8\ny = 4\nGantikan semula: x = 10 − 4 = 6\nPenyelesaian: x = 6, y = 4",
        },
      ],
    },
    {
      title: "16. Kaedah Penghapusan",
      subsections: [
        {
          title: "Konsep",
          content:
            "Kaedah penghapusan menyelesaikan persamaan linear serentak dengan menyamakan pekali salah satu pemboleh ubah dalam kedua-dua persamaan, kemudian menambah atau menolak persamaan tersebut untuk menghapuskan pemboleh ubah itu.",
        },
        {
          title: "Langkah-Langkah",
          bulletPoints: [
            "Darabkan satu atau kedua-dua persamaan dengan nombor yang sesuai supaya pekali bagi salah satu pemboleh ubah menjadi sama.",
            "Tambah atau tolak kedua-dua persamaan untuk menghapuskan pemboleh ubah itu.",
            "Selesaikan persamaan satu pemboleh ubah yang terhasil.",
            "Gantikan semula nilai yang diperoleh untuk mencari nilai pemboleh ubah yang satu lagi.",
          ],
        },
        {
          title: "Contoh Ringkas",
          content: "Selesaikan pasangan persamaan serentak berikut menggunakan kaedah penghapusan: x + y = 10 dan x − y = 2.",
          formula:
            "x + y = 10  ...(1)\nx − y = 2   ...(2)\nTambah persamaan (1) dan (2):\n2x = 12\nx = 6\nGantikan x = 6 ke dalam (1): 6 + y = 10 → y = 4\nPenyelesaian: x = 6, y = 4",
        },
      ],
    },
    {
      title: "17. Kaedah Graf",
      subsections: [
        {
          title: "Konsep",
          content:
            "Kaedah graf menyelesaikan persamaan linear serentak dengan melukis kedua-dua garis lurus yang diwakili oleh persamaan pada satah Cartesan yang sama, kemudian membaca koordinat titik persilangannya.",
        },
        {
          title: "Langkah-Langkah",
          bulletPoints: [
            "Lukis graf bagi persamaan pertama pada satah Cartesan.",
            "Lukis graf bagi persamaan kedua pada satah Cartesan yang sama.",
            "Kenal pasti titik persilangan antara kedua-dua garis itu.",
            "Baca koordinat (x, y) pada titik persilangan; itulah penyelesaian bagi persamaan serentak tersebut.",
          ],
        },
        {
          title: "Catatan",
          content:
            "Jika kedua-dua garis tidak bersilang (selari), persamaan serentak itu tiada penyelesaian. Jika kedua-dua garis bertindih, terdapat penyelesaian tak terhingga.",
        },
      ],
    },
    {
      title: "18. Menggunakan Kalkulator Saintifik",
      subsections: [
        {
          title: "Mengapa Menggunakan Kalkulator Saintifik?",
          content:
            "Kalkulator saintifik mempunyai mod khas untuk menyelesaikan persamaan linear serentak dengan pantas dan tepat, terutamanya untuk persamaan yang melibatkan nombor besar atau pecahan.",
        },
        {
          title: "Langkah-Langkah Umum",
          bulletPoints: [
            "Tekan butang MODE atau MENU pada kalkulator.",
            "Pilih Mod Persamaan (Equation Mode).",
            "Pilih Persamaan Serentak (Simultaneous Equation).",
            "Pilih bilangan pemboleh ubah yang tidak diketahui, iaitu 2 Tidak Diketahui (2 Unknowns).",
            "Masukkan pekali bagi setiap persamaan mengikut susunan yang diminta oleh kalkulator.",
            "Tekan butang '=' untuk memperoleh nilai x dan y.",
          ],
        },
        {
          title: "Petua Kalkulator",
          content:
            "Pastikan persamaan ditulis dalam bentuk piawai (ax + by = c) sebelum memasukkan pekali a, b dan c ke dalam kalkulator. Semak semula nilai yang dimasukkan untuk mengelakkan kesilapan tanda positif atau negatif.",
        },
      ],
    },
    {
      title: "19. Ringkasan Bab",
      subsections: [
        {
          content:
            "Jadual di bawah merumuskan konsep-konsep utama yang dipelajari dalam Bab 6: Persamaan Linear.",
          table: {
            headers: ["Konsep", "Penerangan Ringkas", "Contoh"],
            rows: [
              ["Persamaan linear", "Persamaan dengan kuasa tertinggi pemboleh ubah ialah 1", "5r + 1 = 0"],
              ["Persamaan satu pemboleh ubah", "Mengandungi satu pemboleh ubah sahaja", "x + 7 = 11"],
              ["Persamaan dua pemboleh ubah", "Mengandungi dua pemboleh ubah berbeza", "5x + 2y = 8"],
              ["Kaedah cuba jaya", "Mencuba nilai sehingga kedua-dua belah sama", "x + 5 = 9 → x = 4"],
              ["Konsep kesamaan", "Lakukan operasi sama pada kedua-dua belah", "x + 7 = 11 → x = 4"],
              ["Kaedah pematahbalikan", "Gunakan operasi songsang mengikut urutan terbalik", "4x/5 + 7 = 23 → x = 20"],
              ["Persamaan serentak", "Dua persamaan diselesaikan bersama", "x + y = 10, x − y = 2"],
              ["Penyelesaian unik / tiada / tak terhingga", "Bergantung kepada hubungan antara dua garis", "Bersilang / selari / bertindih"],
              ["Kaedah penggantian", "Ungkapkan satu pemboleh ubah, gantikan ke persamaan lain", "x = 10 − y"],
              ["Kaedah penghapusan", "Samakan pekali, kemudian tambah atau tolak", "2x = 12 → x = 6"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Persamaan linear mempunyai pemboleh ubah berkuasa satu sahaja; jika ada kuasa dua atau lebih, ia bukan persamaan linear.",
    "Konsep kesamaan: apa-apa operasi yang dilakukan pada satu belah persamaan mesti dilakukan pada belah yang satu lagi.",
    "Kaedah pematahbalikan menggunakan operasi songsang (+ ↔ −, × ↔ ÷) mengikut urutan terbalik daripada urutan asal.",
    "Persamaan linear dua pemboleh ubah mempunyai bilangan penyelesaian (x, y) yang tidak terhingga.",
    "Persamaan linear serentak mempunyai tiga kemungkinan jenis penyelesaian: unik, tiada, atau tak terhingga.",
    "Penyelesaian unik = garis bersilang pada satu titik; tiada penyelesaian = garis selari; penyelesaian tak terhingga = garis bertindih.",
    "Kaedah penggantian: ungkapkan satu pemboleh ubah, kemudian gantikan ke dalam persamaan yang satu lagi.",
    "Kaedah penghapusan: samakan pekali salah satu pemboleh ubah, kemudian tambah atau tolak kedua-dua persamaan.",
  ],
  keyTerms: [
    "Persamaan linear",
    "Pemboleh ubah",
    "Kaedah cuba jaya",
    "Konsep kesamaan",
    "Kaedah pematahbalikan",
    "Operasi songsang",
    "Persamaan linear serentak",
    "Penyelesaian unik",
    "Tiada penyelesaian",
    "Penyelesaian tak terhingga",
    "Kaedah penggantian",
    "Kaedah penghapusan",
    "Kaedah graf",
  ],
};
