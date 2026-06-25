import type { StructuredNotes } from "@/data/types";

export const mathF2C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 1 Corak dan Jujukan membantu murid mengenal pasti corak nombor dan objek, menerangkan maksud jujukan, menghuraikan corak jujukan menggunakan nombor, perkataan dan ungkapan algebra, menentukan sebutan suatu jujukan, serta menyelesaikan masalah yang melibatkan jujukan.",
  quickRevision: [
    "Corak ialah senarai nombor atau objek yang disusun berdasarkan suatu peraturan atau reka bentuk.",
    "Corak dalam senarai nombor diperoleh melalui penambahan, penolakan, pendaraban atau pembahagian nombor sebelumnya.",
    "Segi Tiga Pascal bermula dengan 1; setiap baris bermula dan berakhir dengan 1, manakala nombor lain diperoleh dengan menambah dua nombor di atasnya.",
    "Nombor Fibonacci membentuk jujukan yang bermula dengan 0, 1, 1, dan setiap sebutan seterusnya diperoleh dengan menambah dua sebutan sebelumnya.",
    "Jujukan ialah set nombor atau objek yang disusun mengikut suatu corak tertentu.",
    "Sebutan ke-n ditulis sebagai Tn, dengan T ialah sebutan dan n ialah kedudukan sebutan.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal dan memerihalkan corak pelbagai set nombor dan objek berdasarkan situasi kehidupan sebenar, seterusnya membuat generalisasi tentang corak.",
            "Menerangkan maksud jujukan.",
            "Mengenal pasti dan memerihalkan corak suatu jujukan, seterusnya melengkapkan dan melanjutkan jujukan.",
            "Membuat generalisasi tentang corak suatu jujukan menggunakan nombor, perkataan dan ungkapan algebra.",
            "Menentukan sebutan tertentu bagi suatu jujukan.",
            "Menyelesaikan masalah yang melibatkan jujukan.",
          ],
        },
      ],
    },
    {
      title: "1.1 Corak",
      subsections: [
        {
          title: "1.1.1 Mengenal Corak Nombor - Penerangan Ringkas",
          content:
            "Corak ialah senarai nombor atau objek yang disusun mengikut suatu peraturan atau reka bentuk. Untuk objek, perhatikan perubahan susunan. Untuk nombor, bandingkan satu nombor dengan nombor seterusnya untuk mencari peraturan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Corak nombor boleh terbentuk dengan menambah nombor yang sama kepada nombor sebelumnya.",
            "Corak nombor boleh terbentuk dengan menolak nombor yang sama daripada nombor sebelumnya.",
            "Corak nombor boleh terbentuk dengan mendarab atau membahagi nombor sebelumnya.",
            "Nombor genap ialah nombor yang boleh dibahagi tepat dengan 2.",
            "Nombor ganjil ialah nombor yang tidak boleh dibahagi tepat dengan 2.",
          ],
        },
        {
          title: "Peraturan Penting",
          table: {
            headers: ["Peraturan", "Contoh", "Corak"],
            rows: [
              ["Tambah nombor tetap", "-10, -4, 2, 8, ...", "Tambah 6 kepada nombor sebelumnya"],
              ["Tolak nombor tetap", "17, 7, -3, -13, ...", "Tolak 10 daripada nombor sebelumnya"],
              ["Darab nombor tetap", "2, 6, 18, 54, ...", "Darab nombor sebelumnya dengan 3"],
              ["Bahagi nombor tetap", "81, 27, 9, 3, ...", "Bahagi nombor sebelumnya dengan 3"],
              ["Perubahan perpuluhan", "-2.3, -2.6, -2.9, -3.2, ...", "Tolak 0.3 daripada nombor sebelumnya"],
            ],
          },
        },
        {
          title: "Formula",
          formula:
            "Tiada satu formula tetap untuk semua corak.\nLangkah 1: Bandingkan sebutan berturutan.\nLangkah 2: Tentukan sama ada peraturan menggunakan +, -, x atau bahagi.\nLangkah 3: Gunakan peraturan yang sama untuk mendapatkan sebutan seterusnya.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Lukis objek seterusnya bagi titik 2, 4, 6, ...",
                "Bilangan titik bertambah 2 setiap kali.",
                "Objek seterusnya mempunyai 8 titik; corak: tambah dua titik kepada objek sebelumnya.",
              ],
              [
                "Tentukan corak bagi 1, 3/2, 2, 5/2, ...",
                "3/2 - 1 = 1/2, 2 - 3/2 = 1/2, 5/2 - 2 = 1/2.",
                "Tambah 1/2 kepada nombor sebelumnya.",
              ],
              [
                "Daripada 7, 12, 17, 22, 27, ..., 67, nyatakan corak nombor ganjil.",
                "Nombor ganjil ialah 7, 17, 27, 37, 47, 57, 67.",
                "Tambah 10 kepada nombor ganjil sebelumnya.",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa bandingkan lebih daripada satu pasangan nombor berturutan sebelum menentukan corak.",
            "Corak objek diperoleh dengan memerhatikan susunan objek sebelumnya.",
            "Corak nombor diperoleh daripada operasi terhadap nombor sebelumnya.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Melihat dua nombor pertama sahaja lalu membuat andaian terlalu cepat.",
            "Mengelirukan penolakan nombor negatif dengan penambahan.",
            "Mengabaikan pecahan atau perpuluhan apabila beza bukan nombor bulat.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tulis operasi antara setiap pasangan sebutan di atas jujukan.",
            "Untuk nombor genap dan ganjil, pilih nombor yang dikehendaki dahulu, kemudian cari coraknya.",
            "Jika nombor ialah pecahan, tukar kepada pecahan setara sebelum membandingkan.",
          ],
        },
        {
          title: "1.1.2 Segi Tiga Pascal - Penerangan Ringkas",
          content:
            "Segi Tiga Pascal ialah susunan nombor berbentuk segi tiga. Ia bermula dengan 1. Setiap baris bermula dan berakhir dengan 1. Nombor lain diperoleh dengan menambah dua nombor yang berada tepat di atasnya.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Baris paling atas ialah 1.",
            "Baris seterusnya ialah 1, 1.",
            "Setiap baris bermula dengan 1 dan berakhir dengan 1.",
            "Nombor di tengah ialah hasil tambah dua nombor di atasnya.",
            "Pelbagai jujukan nombor boleh diperhatikan dalam Segi Tiga Pascal.",
          ],
        },
        {
          title: "Peraturan Penting",
          formula:
            "Nombor pada baris bawah = nombor kiri atas + nombor kanan atas\nContoh: 6 = 3 + 3",
        },
        {
          title: "Contoh Berpandu",
          content:
            "Lengkapkan baris selepas 1, 3, 3, 1.\nKerja: Mula dan akhir dengan 1. Tambah nombor bersebelahan: 1+3=4, 3+3=6, 3+1=4.\nJawapan: 1, 4, 6, 4, 1.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jangan tambah semua nombor dalam baris; tambah hanya dua nombor bersebelahan di atas tempat kosong.",
            "Bahagian kiri dan kanan hujung setiap baris sentiasa 1.",
            "Segi Tiga Pascal boleh menunjukkan jujukan seperti 1, 2, 3, 4, ... dan 1, 3, 6, ...",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa menulis 1 pada kedua-dua hujung baris baharu.",
            "Menambah dua nombor yang salah kerana susunan tidak selari.",
            "Melangkau baris sebelum melengkapkan baris sebelumnya.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Lukis segi tiga dengan kemas supaya setiap tempat kosong berada di antara dua nombor di atasnya.",
            "Gunakan simetri untuk menyemak baris; contohnya 1, 4, 6, 4, 1 sama dari kiri dan kanan.",
            "Jika satu sisi lengkap, gunakan sisi itu untuk menyemak sisi yang lain.",
          ],
        },
        {
          title: "1.1.3 Nombor Fibonacci - Penerangan Ringkas",
          content:
            "Nombor Fibonacci ialah corak nombor dalam suatu jujukan. Jujukan ini bermula dengan 0, 1, 1. Setiap sebutan seterusnya diperoleh dengan menambah dua sebutan sebelumnya.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Jujukan bermula 0, 1, 1, 2, 3, 5, 8, ...",
            "0 + 1 = 1, 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8.",
            "Jujukan jenis Fibonacci juga boleh bermula dengan nombor lain yang diberi, tetapi peraturannya kekal: tambah dua sebutan sebelumnya.",
          ],
        },
        {
          title: "Peraturan Penting dan Formula",
          formula:
            "Sebutan seterusnya = sebutan sebelumnya + sebutan sebelum sebutan sebelumnya\nContoh: 3 + 5 = 8",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Lengkapkan: 0, 1, 1, __, __, __, 8, 13, __, ...",
                "1+1=2, 1+2=3, 2+3=5, 8+13=21.",
                "0, 1, 1, 2, 3, 5, 8, 13, 21, ...",
              ],
              [
                "Lengkapkan: 1, 3, __, __, 11, ...",
                "1+3=4, 3+4=7, 4+7=11.",
                "1, 3, 4, 7, 11, ...",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Untuk Nombor Fibonacci, jangan tambah nombor tetap setiap kali.",
            "Gunakan dua sebutan yang berada tepat sebelum tempat kosong.",
            "Jujukan dalam buku teks bermula dengan 0, 1, 1.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menambah satu sebutan sebelumnya sahaja, bukan dua sebutan sebelumnya.",
            "Menggunakan dua sebutan pertama secara berulang-ulang tanpa bergerak sepanjang jujukan.",
            "Menulis 0, 1, 2, 3, ... lalu tertinggal 1 yang berulang.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Kotakkan dua sebutan sebelum tempat kosong, kemudian tambahkannya.",
            "Selepas mengisi satu tempat kosong, gunakan nombor baharu itu untuk mencari tempat kosong seterusnya.",
            "Semak bahawa setiap sebutan selepas dua sebutan pertama ialah hasil tambah dua sebutan sebelumnya.",
          ],
        },
      ],
    },
    {
      title: "1.2 Jujukan",
      subsections: [
        {
          title: "1.2.1 Jujukan - Penerangan Ringkas",
          content:
            "Jujukan ialah set nombor atau objek yang disusun mengikut suatu corak tertentu. Corak boleh ditentukan dengan mengikuti susunan sebelumnya.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Jujukan boleh terdiri daripada nombor atau objek.",
            "Set nombor ialah jujukan hanya apabila set itu mengikut suatu corak tertentu.",
            "Peraturan yang sama mesti berterusan sepanjang jujukan.",
          ],
        },
        {
          title: "Peraturan Penting",
          bulletPoints: [
            "Semak operasi daripada satu sebutan kepada sebutan seterusnya.",
            "Jika peraturan yang sama berterusan, set nombor itu ialah jujukan.",
            "Jika perubahan tidak mengikut corak tertentu, set itu bukan jujukan.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Jujukan = set nombor atau objek yang disusun mengikut suatu corak tertentu.",
        },
        {
          title: "Contoh Berpandu",
          content:
            "Tentukan sama ada -10, -6, -2, 2, 6, ... ialah jujukan.\nKerja: -6 - (-10) = 4, -2 - (-6) = 4, 2 - (-2) = 4, 6 - 2 = 4.\nJawapan: Set ini ialah jujukan kerana coraknya ialah tambah 4.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jujukan boleh menaik, menurun atau berubah melalui pendaraban atau pembahagian.",
            "Jujukan objek dikenal pasti melalui bilangan atau susunan objek.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menganggap semua senarai nombor sebagai jujukan tanpa menyemak peraturan.",
            "Berhenti selepas satu perbandingan lalu terlepas perubahan pada perbandingan seterusnya.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tunjukkan operasi antara sebutan, seperti +4, -12, x0.3 atau bahagi 5.",
            "Jika ditanya sama ada set itu jujukan, nyatakan peraturan dahulu kemudian beri kesimpulan.",
          ],
        },
        {
          title: "1.2.2 Corak Suatu Jujukan - Penerangan Ringkas",
          content:
            "Corak suatu jujukan ialah peraturan yang menghubungkan satu sebutan dengan sebutan seterusnya. Apabila peraturan diketahui, jujukan boleh dilengkapkan dan dilanjutkan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Sebutan yang hilang boleh dicari dengan menggunakan peraturan yang sama daripada sebutan yang diketahui.",
            "Sesetengah jujukan menggunakan penambahan atau penolakan; yang lain menggunakan pendaraban atau pembahagian.",
            "Jujukan perpuluhan dan pecahan menggunakan idea yang sama.",
          ],
        },
        {
          title: "Peraturan Penting",
          table: {
            headers: ["Corak Diberi", "Mula", "Jujukan Lengkap"],
            rows: [
              ["Tolak 4 daripada nombor sebelumnya", "96", "96, 92, 88, 84, 80, 76, ..."],
              ["Darab nombor sebelumnya dengan 3", "7", "7, 21, 63, 189, 567, 1701, ..."],
              ["Tolak 8 daripada nombor sebelumnya", "21.3", "21.3, 13.3, 5.3, -2.7, -10.7, -18.7, ..."],
              ["Bahagi nombor sebelumnya dengan 5", "400", "400, 80, 16, 3.2, 0.64, 0.128, ..."],
            ],
          },
        },
        {
          title: "Formula",
          formula:
            "Sebutan hilang = sebutan diketahui sebelumnya yang dikenakan operasi mengikut peraturan jujukan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Lengkapkan: 7, 13, __, 25, __, __, ...",
                "Coraknya ialah tambah 6.",
                "7, 13, 19, 25, 31, 37, ...",
              ],
              [
                "Lengkapkan: 88, __, 64, 52, __, __, ...",
                "Coraknya ialah tolak 12.",
                "88, 76, 64, 52, 40, 28, ...",
              ],
              [
                "Lengkapkan: __, 0.3, __, 0.027, 0.0081, __, ...",
                "Coraknya ialah darab 0.3.",
                "1, 0.3, 0.09, 0.027, 0.0081, 0.00243, ...",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Nombor segi tiga diwakili oleh titik yang membentuk segi tiga sama sisi: 1, 3, 6, 10, 15, 21, 28, 36, ...",
            "Apabila peraturan diberi dalam perkataan, gunakan peraturan itu secara terus dan teliti.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan penambahan apabila corak sebenarnya pendaraban.",
            "Terlupa bahawa penolakan boleh menghasilkan nombor negatif.",
            "Membundarkan perpuluhan terlalu awal dalam jujukan perpuluhan.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Jika tempat kosong muncul sebelum dan selepas sebutan diketahui, kerja ke hadapan dan ke belakang menggunakan peraturan yang sama.",
            "Untuk corak pembahagian, semak dengan mendarab secara songsang.",
            "Tulis sebutan secukupnya untuk menjawab tepat seperti kehendak soalan.",
          ],
        },
        {
          title: "1.2.3 Jujukan Nombor - Penerangan Ringkas",
          content:
            "Jujukan nombor ialah jujukan yang terdiri daripada nombor. Setiap nombor diletakkan mengikut peraturan seperti tambah, tolak, darab atau bahagi.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Jujukan nombor boleh melibatkan nombor bulat, nombor negatif, perpuluhan dan pecahan.",
            "Operasi yang sama mesti diulang mengikut corak.",
            "Sesetengah jujukan nombor berkaitan dengan bentuk, seperti nombor segi tiga.",
          ],
        },
        {
          title: "Peraturan Penting dan Formula",
          formula:
            "Untuk melanjutkan jujukan nombor: kenal pasti peraturan, kemudian ulang peraturan itu sebutan demi sebutan.",
        },
        {
          title: "Contoh Berpandu",
          content:
            "Lengkapkan jujukan nombor berdasarkan corak yang diberi: Tambah 7 kepada nombor sebelumnya, bermula dengan 42.\nKerja: 42+7=49, 49+7=56, 56+7=63, 63+7=70, 70+7=77.\nJawapan: 42, 49, 56, 63, 70, 77, ...",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Gunakan peraturan tepat yang dinyatakan dalam soalan apabila peraturan diberi.",
            "Untuk jujukan yang melibatkan nombor negatif, kekalkan tanda bersama nombor.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menukar peraturan di tengah-tengah jujukan.",
            "Mengabaikan tanda negatif dalam jujukan penolakan.",
            "Tidak menulis jujukan mengikut tertib.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Gariskan frasa 'nombor sebelumnya' dalam soalan.",
            "Gunakan kalkulator dengan teliti untuk perpuluhan, kemudian semak corak secara manual.",
          ],
        },
      ],
    },
    {
      title: "1.3 Corak dan Jujukan",
      subsections: [
        {
          title: "1.3.1 Corak Suatu Jujukan Menggunakan Nombor, Perkataan dan Ungkapan Algebra - Penerangan Ringkas",
          content:
            "Corak suatu jujukan boleh dihuraikan dalam tiga cara: menggunakan nombor, menggunakan perkataan dan menggunakan ungkapan algebra.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Menggunakan nombor bermaksud menunjukkan operasi antara sebutan, seperti +8.",
            "Menggunakan perkataan bermaksud menulis peraturan dalam ayat, seperti tambah 8 kepada nombor sebelumnya.",
            "Menggunakan ungkapan algebra bermaksud mewakili corak dengan ungkapan yang melibatkan pemboleh ubah.",
            "Ungkapan algebra menggabungkan operasi terhadap nombor, pemboleh ubah atau entiti matematik.",
          ],
        },
        {
          title: "Peraturan Penting",
          bulletPoints: [
            "Bagi jujukan yang bermula dengan 1 dan bertambah 8 setiap kali: 1, 9, 17, 25, 33, ...",
            "Nombor: coraknya ialah +8.",
            "Perkataan: tambah 8 kepada nombor sebelumnya.",
            "Ungkapan algebra: 1 + 8n, dengan n = 0, 1, 2, 3, 4, ...",
          ],
        },
        {
          title: "Formula",
          formula:
            "Jika sebutan pertama ialah a dan nombor yang sama d ditambah setiap kali, corak boleh ditulis sebagai a + dn, dengan n = 0, 1, 2, 3, ...",
        },
        {
          title: "Contoh Berpandu",
          content:
            "Huraikan corak bagi 1, 9, 17, 25, 33, ... menggunakan nombor, perkataan dan ungkapan algebra.\nNombor: +8, +8, +8, +8.\nPerkataan: Tambah 8 kepada nombor sebelumnya.\nUngkapan algebra: 1 = 1+8(0), 9 = 1+8(1), 17 = 1+8(2), 25 = 1+8(3), 33 = 1+8(4). Oleh itu, ungkapan ialah 1 + 8n, dengan n = 0, 1, 2, 3, 4, ...",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Buku teks menggunakan n = 0 untuk sebutan pertama apabila menulis ungkapan seperti 1 + 8n.",
            "Corak yang sama boleh dinyatakan dalam beberapa bentuk, tetapi maksudnya mesti sama.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan n = 1 untuk sebutan pertama sedangkan ungkapan yang ditunjukkan berdasarkan n = 0.",
            "Menulis sebutan seterusnya sahaja, bukan menghuraikan corak.",
            "Terlupa memasukkan huraian dalam perkataan apabila soalan meminta nombor, perkataan dan ungkapan algebra.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Bina jadual kecil bagi n dan nilai sebutan sebelum menulis ungkapan algebra.",
            "Uji ungkapan dengan menggantikan n = 0, 1, 2 dan semak sama ada tiga sebutan pertama diperoleh.",
          ],
        },
        {
          title: "1.3.2 Sebutan Suatu Jujukan - Penerangan Ringkas",
          content:
            "Sebutan ke-n dalam suatu jujukan nombor ditulis sebagai Tn, dengan T ialah sebutan dan n ialah kedudukan sebutan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "T1 bermaksud sebutan pertama.",
            "T2 bermaksud sebutan kedua.",
            "T3 bermaksud sebutan ketiga.",
            "Tn bermaksud sebutan pada kedudukan n.",
          ],
        },
        {
          title: "Peraturan Penting dan Formula",
          formula:
            "Tn = sebutan ke-n\nContoh: Bagi 4, 8, 12, 16, ...\nT1 = 4, T2 = 8, T3 = 12, T4 = 16",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Nyatakan sebutan ke-5 bagi 2, 10, 18, ...",
                "Corak: tambah 8. T1=2, T2=10, T3=18, T4=26, T5=34.",
                "Sebutan ke-5 ialah 34.",
              ],
              [
                "Bagi 65, 60, 55, 50, ..., tentukan 40 ialah sebutan yang ke berapa.",
                "Corak: tolak 5. T1=65, T2=60, T3=55, T4=50, T5=45, T6=40.",
                "40 ialah sebutan ke-6.",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Nombor sebutan menunjukkan kedudukan, bukan nilai.",
            "Tulis sebutan mengikut tertib sebelum menentukan sebutan tertentu.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan T5 dengan nilai 5.",
            "Memulakan kiraan daripada 0 dan bukannya T1 apabila menyenaraikan sebutan.",
            "Melangkau sebutan apabila soalan meminta sebutan yang lebih jauh.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Labelkan sebutan sebagai T1, T2, T3, ... semasa menyenaraikannya.",
            "Apabila ditanya 'sebutan yang ke berapa', teruskan jujukan sehingga nilai yang dikehendaki muncul.",
          ],
        },
        {
          title: "1.3.3 Menyelesaikan Masalah - Penerangan Ringkas",
          content:
            "Masalah yang melibatkan jujukan boleh diselesaikan dengan memahami situasi, mencari corak berulang, menggunakan corak tersebut dan menulis kesimpulan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Jadual atau jadual waktu dalam kehidupan sebenar boleh membentuk jujukan.",
            "Selang masa boleh menjadi corak suatu jujukan.",
            "Gunakan maklumat diberi untuk mencari selang atau peraturan sebelum menjawab soalan.",
          ],
        },
        {
          title: "Peraturan Penting",
          bulletPoints: [
            "Fahami masalah.",
            "Rancang strategi.",
            "Laksanakan strategi.",
            "Tulis kesimpulan dengan unit yang betul, seperti masa.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Selang = jumlah masa / bilangan bahagian yang sama\nKemudian gunakan selang itu untuk menyenaraikan jujukan masa.",
        },
        {
          title: "Contoh Berpandu",
          content:
            "Sebuah alat pemberi makanan ikan automatik memberi makanan 4 kali sehari. Masa pemberian makanan pertama ialah 7:35 a.m. Cari masa pemberian makanan kali ketiga.\nMemahami: Cari masa kali ketiga.\nMerancang: 1 hari = 24 jam, jadi setiap pemberian makanan berjarak 24/4 = 6 jam.\nMelaksanakan: T1 = 7:35 a.m.; T2 = 7:35 a.m. + 6 jam = 1:35 p.m.; T3 = 1:35 p.m. + 6 jam = 7:35 p.m.\nKesimpulan: Ikan diberi makan kali ketiga pada 7:35 p.m.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Masalah masa memerlukan notasi a.m. dan p.m. yang betul.",
            "Jadual boleh membantu menyusun sebutan, masa atau waktu bertolak.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Membahagi satu hari dengan bilangan selang yang salah.",
            "Terlupa menukar a.m. kepada p.m. selepas menambah jam.",
            "Menjawab peristiwa kedua apabila soalan meminta peristiwa ketiga.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tulis T1, T2, T3 di sebelah peristiwa kehidupan sebenar.",
            "Nyatakan jawapan akhir dalam ayat lengkap.",
            "Semak sama ada soalan meminta masa, selang atau kedudukan sebutan.",
          ],
        },
      ],
    },
    {
      title: "Ringkasan Bab",
      subsections: [
        {
          title: "Konsep Utama",
          bulletPoints: [
            "Corak ialah senarai nombor atau objek yang disusun berdasarkan suatu peraturan atau reka bentuk.",
            "Corak pelbagai set nombor termasuk nombor genap dan ganjil, Segi Tiga Pascal dan Nombor Fibonacci.",
            "Jujukan ialah set nombor atau objek yang mengikut suatu corak tertentu.",
            "Corak suatu jujukan ialah peraturan atau reka bentuk jujukan itu.",
            "Corak jujukan boleh dihuraikan menggunakan nombor, perkataan dan ungkapan algebra.",
            "Sebutan ke-n ditulis sebagai Tn.",
          ],
        },
        {
          title: "Formula Penting",
          table: {
            headers: ["Konsep", "Formula / Peraturan"],
            rows: [
              ["Segi Tiga Pascal", "Nombor tengah = hasil tambah dua nombor di atasnya"],
              ["Nombor Fibonacci", "Sebutan seterusnya = sebutan sebelumnya + sebutan sebelum sebutan sebelumnya"],
              ["Sebutan jujukan", "Tn = sebutan ke-n"],
              ["Corak ungkapan algebra", "a + dn, dengan n = 0, 1, 2, 3, ..."],
              ["Selang masa", "Selang = jumlah masa / bilangan bahagian yang sama"],
            ],
          },
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Membuat andaian corak tanpa menyemak beberapa sebutan berturutan.",
            "Mengelirukan corak tambah/tolak dengan corak darab/bahagi.",
            "Terlupa bahawa setiap baris Segi Tiga Pascal bermula dan berakhir dengan 1.",
            "Menggunakan satu sebutan sebelumnya sahaja untuk Nombor Fibonacci.",
            "Mengelirukan kedudukan sebutan Tn dengan nilai sebutan.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tandakan operasi antara sebutan dengan jelas.",
            "Gunakan perkataan apabila soalan meminta corak dalam bentuk perkataan.",
            "Uji ungkapan algebra dengan menggantikan nilai n yang kecil.",
            "Untuk penyelesaian masalah, kenal pasti sebutan pertama, corak dan sebutan yang dikehendaki.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Corak ialah senarai nombor atau objek yang disusun berdasarkan suatu peraturan atau reka bentuk.",
    "Jujukan ialah set nombor atau objek yang disusun mengikut suatu corak tertentu.",
    "Segi Tiga Pascal bermula dan berakhir dengan 1 pada setiap baris; nombor tengah diperoleh dengan menambah dua nombor di atasnya.",
    "Nombor Fibonacci bermula dengan 0, 1, 1 dan setiap sebutan seterusnya ialah hasil tambah dua sebutan sebelumnya.",
    "Corak boleh dihuraikan menggunakan nombor, perkataan dan ungkapan algebra.",
    "Sebutan ke-n ditulis sebagai Tn.",
  ],
  keyTerms: [
    "Corak",
    "Jujukan",
    "Corak nombor",
    "Segi Tiga Pascal",
    "Nombor Fibonacci",
    "Nombor genap",
    "Nombor ganjil",
    "Ungkapan algebra",
    "Sebutan",
    "Tn",
  ],
};
