import type { StructuredNotes } from "@/data/types";

export const mathF2C10NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 10 Kecerunan dan Luas di bawah Graf membincangkan konsep kecerunan garis lurus, graf jarak-masa, graf laju-masa, serta cara mengira luas di bawah graf laju-masa untuk mendapatkan jarak yang dilalui.",
  quickRevision: [
    "Kecerunan = perubahan menegak / perubahan mengufuk.",
    "Garis yang naik dari kiri ke kanan mempunyai kecerunan positif; garis yang menurun mempunyai kecerunan negatif.",
    "Kecerunan graf jarak-masa = laju.",
    "Kecerunan graf laju-masa = pecutan (positif) atau nyahpecutan (negatif).",
    "Luas di bawah graf laju-masa = jarak yang dilalui.",
    "Garis mengufuk pada graf jarak-masa bermaksud objek berhenti (laju = 0).",
    "Garis mengufuk pada graf laju-masa bermaksud objek bergerak dengan laju seragam (pecutan = 0).",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menentukan kecerunan suatu garis lurus.",
            "Menerangkan maksud graf jarak-masa dan mengira laju daripada graf tersebut.",
            "Menerangkan maksud graf laju-masa dan mengira pecutan daripada graf tersebut.",
            "Mengira luas di bawah graf laju-masa untuk mendapatkan jarak yang dilalui.",
            "Menyelesaikan masalah yang melibatkan kecerunan dan luas di bawah graf dalam situasi harian.",
          ],
        },
      ],
    },
    {
      title: "10.1 Kecerunan suatu Garis Lurus",
      subsections: [
        {
          title: "Definisi",
          content:
            "Kecerunan (gradient) suatu garis lurus ialah ukuran kecondongan garis itu. Kecerunan menunjukkan kadar perubahan menegak berbanding perubahan mengufuk antara dua titik pada garis tersebut.",
        },
        {
          title: "Formula",
          formula:
            "Kecerunan, m = perubahan menegak / perubahan mengufuk\nm = (y2 - y1) / (x2 - x1)",
        },
        {
          title: "Jenis Kecerunan",
          table: {
            headers: ["Jenis Garis", "Tanda Kecerunan"],
            rows: [
              ["Naik dari kiri ke kanan", "Positif (+)"],
              ["Menurun dari kiri ke kanan", "Negatif (-)"],
              ["Mengufuk (selari dengan paksi-x)", "Sifar (0)"],
              ["Mencancang (selari dengan paksi-y)", "Tidak terbentuk / tak tertakrif"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Satu garis lurus melalui titik A(2, 3) dan B(6, 11). Cari kecerunan garis AB.\nPenyelesaian:\nm = (y2 - y1) / (x2 - x1)\nm = (11 - 3) / (6 - 2)\nm = 8 / 4\nJawapan: m = 2",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Satu garis lurus melalui titik P(1, 8) dan Q(5, 0). Cari kecerunan garis PQ.\nPenyelesaian:\nm = (0 - 8) / (5 - 1)\nm = -8 / 4\nJawapan: m = -2 (kecerunan negatif kerana garis menurun)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kecerunan tidak mempunyai unit jika ia mewakili kecondongan biasa, tetapi pada graf jarak-masa atau laju-masa, kecerunan mempunyai unit (contoh: m/s, m/s²).",
            "Pastikan urutan (x1, y1) dan (x2, y1) konsisten semasa mengira beza menegak dan mengufuk.",
            "Garis lurus yang melalui asalan (0,0) mempunyai persamaan y = mx.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menterbalikkan formula, iaitu mengira perubahan mengufuk / perubahan menegak.",
            "Tidak konsisten dalam tertib penolakan, contohnya (y1 - y2) dibahagi (x2 - x1).",
            "Tersilap tanda negatif apabila salah satu titik mempunyai koordinat negatif.",
          ],
        },
      ],
    },
    {
      title: "10.2 Graf Jarak-Masa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Graf jarak-masa ialah graf yang menunjukkan hubungan antara jarak yang dilalui oleh suatu objek dengan masa. Paksi-y mewakili jarak (contohnya dalam meter atau kilometer) dan paksi-x mewakili masa (contohnya dalam saat, minit atau jam).",
        },
        {
          title: "Formula",
          formula: "Laju = Kecerunan graf jarak-masa = perubahan jarak / perubahan masa",
        },
        {
          title: "Ciri-ciri Graf",
          table: {
            headers: ["Bentuk Graf", "Maksud"],
            rows: [
              ["Garis lurus naik", "Objek bergerak dengan laju seragam (tetap)"],
              ["Garis mengufuk", "Objek berhenti (laju = 0)"],
              ["Garis lurus menurun", "Objek bergerak balik ke arah asal (jarak berkurang)"],
              ["Garis melengkung", "Laju objek berubah (laju tidak seragam)"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah kereta bergerak sejauh 120 km dalam masa 2 jam dengan laju seragam. Cari laju kereta itu dalam km/j.\nPenyelesaian:\nLaju = jarak / masa\nLaju = 120 / 2\nJawapan: Laju = 60 km/j",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Suatu graf jarak-masa menunjukkan objek bergerak dari titik (0, 0) ke titik (4, 80), dengan masa dalam saat dan jarak dalam meter. Cari laju objek.\nPenyelesaian:\nLaju = (80 - 0) / (4 - 0)\nLaju = 80 / 4\nJawapan: Laju = 20 m/s",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kecerunan graf jarak-masa SENTIASA mewakili laju, bukan pecutan.",
            "Graf jarak-masa tidak boleh menurun jika jarak yang dimaksudkan ialah jarak (selalu positif atau sifar); garis menurun biasanya digunakan apabila konteks ialah sesaran (anjakan).",
            "Garis mengufuk bermaksud objek tidak bergerak (statik) walaupun masa terus berjalan.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan paksi-x dan paksi-y — paksi-y ialah jarak, paksi-x ialah masa, BUKAN sebaliknya.",
            "Menganggap garis mengufuk bermaksud laju maksimum, sedangkan ia bermaksud objek berhenti.",
            "Tersilap unit apabila masa diberi dalam minit tetapi laju dikehendaki dalam saat atau jam.",
          ],
        },
      ],
    },
    {
      title: "10.3 Graf Laju-Masa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Graf laju-masa ialah graf yang menunjukkan hubungan antara laju suatu objek dengan masa. Paksi-y mewakili laju (contohnya dalam m/s) dan paksi-x mewakili masa (contohnya dalam saat).",
        },
        {
          title: "Formula",
          formula:
            "Pecutan = Kecerunan graf laju-masa = perubahan laju / perubahan masa\na = (v2 - v1) / (t2 - t1)",
        },
        {
          title: "Ciri-ciri Graf",
          table: {
            headers: ["Bentuk Graf", "Maksud"],
            rows: [
              ["Garis lurus naik", "Pecutan positif (objek memecut/bergerak lebih laju)"],
              ["Garis mengufuk", "Pecutan sifar (laju seragam/tetap)"],
              ["Garis lurus menurun", "Pecutan negatif / nyahpecutan (objek perlahan)"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah motosikal memecut daripada laju 5 m/s kepada 25 m/s dalam masa 4 saat. Cari pecutan motosikal itu.\nPenyelesaian:\na = (v2 - v1) / (t2 - t1)\na = (25 - 5) / 4\na = 20 / 4\nJawapan: a = 5 m/s²",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah kereta bergerak pada laju 30 m/s dan kemudian brek hingga berhenti dalam masa 6 saat. Cari nyahpecutan kereta itu.\nPenyelesaian:\na = (v2 - v1) / (t2 - t1)\na = (0 - 30) / 6\na = -5 m/s²\nJawapan: Nyahpecutan = 5 m/s² (tanda negatif menunjukkan laju berkurang)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kecerunan graf laju-masa SENTIASA mewakili pecutan, bukan laju.",
            "Pecutan negatif (nyahpecutan) bermaksud objek semakin perlahan, bukan objek bergerak ke belakang.",
            "Garis mengufuk pada paksi-x (laju = 0) bermaksud objek berhenti sepenuhnya untuk tempoh tersebut.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan graf laju-masa dengan graf jarak-masa kerana kedua-duanya menggunakan paksi-x sebagai masa.",
            "Tersalah tanda pecutan — lupa meletakkan tanda negatif untuk nyahpecutan.",
            "Menganggap kecerunan graf laju-masa memberikan jarak, sedangkan ia memberikan pecutan.",
          ],
        },
      ],
    },
    {
      title: "10.4 Luas di bawah Graf Laju-Masa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Luas di bawah graf laju-masa, antara graf dengan paksi-masa, mewakili jarak yang dilalui oleh objek dalam tempoh masa tersebut.",
        },
        {
          title: "Formula",
          formula:
            "Jarak = Luas di bawah graf laju-masa\nLuas segi tiga = 1/2 x tapak x tinggi\nLuas segi empat tepat = panjang x lebar\nLuas trapezium = 1/2 x (a + b) x h, dengan a dan b ialah sisi selari, h ialah jarak antara sisi selari",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah kereta memecut secara seragam daripada rehat (0 m/s) kepada 20 m/s dalam masa 10 saat. Graf laju-masa berbentuk segi tiga. Cari jarak yang dilalui oleh kereta itu.\nPenyelesaian:\nJarak = Luas segi tiga\nJarak = 1/2 x tapak x tinggi\nJarak = 1/2 x 10 x 20\nJawapan: Jarak = 100 m",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Suatu graf laju-masa menunjukkan objek bergerak dengan laju seragam 15 m/s selama 8 saat, kemudian nyahpecutan secara seragam hingga berhenti dalam masa 4 saat seterusnya. Bentuk graf ialah trapezium dengan sisi selari (atas) sepanjang 8 saat (pada laju 15 m/s) dan keseluruhan tapak (bawah) sepanjang 12 saat. Cari jumlah jarak yang dilalui oleh objek itu.\nPenyelesaian:\nLuas trapezium = 1/2 x (a + b) x h\ndengan a = 8 (tempoh laju seragam), b = 12 (jumlah masa), h = 15 (laju maksimum)\nJarak = 1/2 x (8 + 12) x 15\nJarak = 1/2 x 20 x 15\nJawapan: Jarak = 150 m",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Pecahkan graf yang kompleks kepada beberapa bentuk asas (segi tiga, segi empat tepat, trapezium) sebelum mengira luas.",
            "Jumlahkan luas setiap bahagian untuk mendapatkan jumlah jarak keseluruhan.",
            "Unit jarak bergantung kepada unit laju dan masa yang digunakan, contohnya m/s x s = m.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan formula luas segi tiga untuk bentuk trapezium atau sebaliknya.",
            "Tertinggal salah satu bahagian graf semasa memecahkan rajah kepada bentuk-bentuk kecil.",
            "Mengira luas di atas paksi-masa tetapi mengabaikan bahagian yang berada di bawah paksi (jika laju dianggap negatif, ini perlu ditafsir mengikut konteks soalan).",
            "Tersilap mengenal pasti sisi selari (a dan b) trapezium pada graf yang condong.",
          ],
        },
      ],
    },
    {
      title: "Ringkasan Bab",
      subsections: [
        {
          title: "Mesti Tahu",
          bulletPoints: [
            "Kecerunan = perubahan menegak / perubahan mengufuk.",
            "Kecerunan graf jarak-masa = laju.",
            "Kecerunan graf laju-masa = pecutan.",
            "Luas di bawah graf laju-masa = jarak.",
          ],
        },
        {
          title: "Formula Penting",
          formula:
            "m = (y2 - y1) / (x2 - x1)\nLaju = perubahan jarak / perubahan masa\nPecutan = perubahan laju / perubahan masa\nJarak = Luas di bawah graf laju-masa",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa labelkan paksi-x dan paksi-y dengan teliti sebelum mentafsir graf.",
            "Lukis garis bantu atau pecahkan graf kepada bentuk asas untuk memudahkan pengiraan luas.",
            "Semak semula tanda kecerunan (positif/negatif) berdasarkan bentuk graf — naik atau menurun.",
            "Pastikan unit jawapan akhir konsisten dengan unit yang diberi dalam soalan.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Kecerunan = perubahan menegak / perubahan mengufuk = (y2 - y1) / (x2 - x1).",
    "Kecerunan graf jarak-masa memberikan laju objek.",
    "Kecerunan graf laju-masa memberikan pecutan objek.",
    "Pecutan negatif disebut nyahpecutan, menunjukkan objek semakin perlahan.",
    "Luas di bawah graf laju-masa (antara graf dan paksi-masa) memberikan jarak yang dilalui.",
    "Garis mengufuk pada graf jarak-masa bermaksud objek berhenti; garis mengufuk pada graf laju-masa bermaksud laju seragam.",
    "Bentuk kompleks pada graf laju-masa boleh dipecahkan kepada segi tiga, segi empat tepat dan trapezium untuk mengira jumlah jarak.",
  ],
  keyTerms: [
    "Kecerunan",
    "Garis lurus",
    "Graf jarak-masa",
    "Graf laju-masa",
    "Laju",
    "Pecutan",
    "Nyahpecutan",
    "Luas di bawah graf",
    "Trapezium",
    "Laju seragam",
  ],
};
