import type { StructuredNotes } from "@/data/types";

export const mathF2C7NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 7 Koordinat membantu murid memahami satah Cartes, mengira jarak antara dua titik, mencari titik tengah antara dua titik, dan mengira luas poligon pada satah Cartes menggunakan koordinat bucu.",
  quickRevision: [
    "Jarak antara dua titik (x1,y1) dan (x2,y2) ialah √((x2-x1)² + (y2-y1)²).",
    "Titik tengah antara dua titik (x1,y1) dan (x2,y2) ialah ((x1+x2)/2, (y1+y2)/2).",
    "Luas poligon dikira menggunakan kaedah penentu (determinant) dengan menyenaraikan bucu mengikut arah lawan jam.",
    "Sentiasa ambil nilai mutlak (positif) untuk luas dan bahagikan dengan 2 pada akhir pengiraan.",
    "Susunan penolakan koordinat (x2-x1 dan y2-y1) mesti konsisten supaya jawapan tepat untuk jarak dan titik tengah.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengira jarak antara dua titik pada satah Cartes.",
            "Menentukan koordinat titik tengah antara dua titik pada satah Cartes.",
            "Mengira luas poligon pada satah Cartes menggunakan koordinat bucu.",
            "Menyelesaikan masalah yang melibatkan jarak, titik tengah dan luas dalam konteks kehidupan harian.",
          ],
        },
      ],
    },
    {
      title: "7.1 Jarak Antara Dua Titik Pada Satah Cartes",
      subsections: [
        {
          title: "Definisi",
          content:
            "Jarak antara dua titik pada satah Cartes ialah panjang garis lurus yang menyambungkan kedua-dua titik itu. Jarak ini dikira menggunakan Teorem Pythagoras, dengan perbezaan koordinat-x dan koordinat-y sebagai dua sisi tegak segi tiga bersudut tegak.",
        },
        {
          title: "Formula",
          formula:
            "Jarak antara A(x1,y1) dan B(x2,y2):\nAB = √((x2 - x1)² + (y2 - y1)²)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Cari jarak antara titik A(2,3) dan B(6,6).\nPenyelesaian:\nAB = √((6-2)² + (6-3)²)\n   = √((4)² + (3)²)\n   = √(16 + 9)\n   = √25\n   = 5 unit\nJawapan: 5 unit",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Cari jarak antara titik P(-1,2) dan Q(3,-1).\nPenyelesaian:\nPQ = √((3-(-1))² + (-1-2)²)\n   = √((4)² + (-3)²)\n   = √(16 + 9)\n   = √25\n   = 5 unit\nJawapan: 5 unit",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jarak sentiasa positif kerana ia adalah panjang, bukan vektor.",
            "Boleh menggunakan A ke B atau B ke A; hasilnya tetap sama kerana nilai dikuasakan dua.",
            "Lukis segi tiga bersudut tegak pada satah Cartes untuk memahami konsep dengan lebih jelas.",
            "Jika dua titik mempunyai koordinat-y yang sama, jarak ialah beza nilai mutlak koordinat-x sahaja (garis mengufuk).",
            "Jika dua titik mempunyai koordinat-x yang sama, jarak ialah beza nilai mutlak koordinat-y sahaja (garis mencancang).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menolak koordinat dalam susunan yang tidak konsisten antara x dan y (contohnya x2-x1 tetapi y1-y2).",
            "Terlupa mengkuasakan dua (kuasa 2) nilai negatif dengan betul, contohnya (-3)² mesti menjadi 9, bukan -9.",
            "Lupa mengambil punca kuasa dua pada langkah akhir.",
            "Tersilap menambah dahulu sebelum mengkuasakan dua, contohnya menulis (x2+y2-x1-y1)² yang salah.",
          ],
        },
      ],
    },
    {
      title: "7.2 Titik Tengah Antara Dua Titik Pada Satah Cartes",
      subsections: [
        {
          title: "Definisi",
          content:
            "Titik tengah antara dua titik ialah titik yang terletak tepat di tengah-tengah garis lurus yang menyambungkan kedua-dua titik tersebut, iaitu pada jarak yang sama daripada kedua-dua titik.",
        },
        {
          title: "Formula",
          formula:
            "Titik tengah M antara A(x1,y1) dan B(x2,y2):\nM = ((x1 + x2)/2, (y1 + y2)/2)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Cari koordinat titik tengah M antara A(2,3) dan B(6,7).\nPenyelesaian:\nM = ((2+6)/2, (3+7)/2)\n  = (8/2, 10/2)\n  = (4, 5)\nJawapan: M(4, 5)",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Titik tengah antara P(-3,4) dan Q(5,-2) ialah M. Cari koordinat M.\nPenyelesaian:\nM = ((-3+5)/2, (4+(-2))/2)\n  = (2/2, 2/2)\n  = (1, 1)\nJawapan: M(1, 1)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Titik tengah ialah purata bagi koordinat-x dan purata bagi koordinat-y secara berasingan.",
            "Formula ini boleh disusun semula untuk mencari koordinat satu titik jika titik tengah dan satu titik lain diketahui.",
            "Jika diberi titik tengah M(xm,ym) dan titik A(x1,y1), maka koordinat B ialah (2xm - x1, 2ym - y1).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa membahagikan dengan 2 selepas menambah koordinat.",
            "Mencampurkan koordinat-x dengan koordinat-y semasa menambah, contohnya x1+y2.",
            "Tersilap tanda apabila salah satu koordinat adalah negatif.",
            "Menganggap titik tengah sama dengan jarak; kedua-dua konsep dan formula adalah berbeza.",
          ],
        },
      ],
    },
    {
      title: "7.3 Luas Poligon Pada Satah Cartes",
      subsections: [
        {
          title: "Definisi",
          content:
            "Luas poligon pada satah Cartes boleh dikira terus daripada koordinat bucunya tanpa perlu melukis dan mengira secara manual menggunakan kaedah petak. Kaedah ini menggunakan jumlah hasil darab pekali (kaedah penentu) bagi setiap pasangan bucu yang bersebelahan, mengikut arah lawan jam atau ikut jam, dan dibahagikan dengan 2.",
        },
        {
          title: "Formula",
          formula:
            "Untuk segi tiga dengan bucu A(x1,y1), B(x2,y2), C(x3,y3):\nLuas = 1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|\n\nKaedah Matriks/Senarai (Shoelace) untuk poligon umum dengan bucu (x1,y1),(x2,y2),...,(xn,yn):\nLuas = 1/2 |(x1y2 - x2y1) + (x2y3 - x3y2) + ... + (xny1 - x1yn)|",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Cari luas segi tiga dengan bucu A(1,1), B(5,1) dan C(3,4).\nPenyelesaian (kaedah senarai/shoelace, ikut arah lawan jam A→B→C→A):\nLuas = 1/2 |(x1y2 - x2y1) + (x2y3 - x3y2) + (x3y1 - x1y3)|\n     = 1/2 |(1×1 - 5×1) + (5×4 - 3×1) + (3×1 - 1×4)|\n     = 1/2 |(1 - 5) + (20 - 3) + (3 - 4)|\n     = 1/2 |(-4) + (17) + (-1)|\n     = 1/2 |12|\n     = 6 unit persegi\nJawapan: 6 unit persegi",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Cari luas sisi empat dengan bucu P(0,0), Q(4,0), R(4,3) dan S(0,3).\nPenyelesaian (kaedah senarai, ikut arah P→Q→R→S→P):\nLuas = 1/2 |(x1y2-x2y1)+(x2y3-x3y2)+(x3y4-x4y3)+(x4y1-x1y4)|\n     = 1/2 |(0×0-4×0)+(4×3-4×0)+(4×3-0×3)+(0×0-0×3)|\n     = 1/2 |(0-0)+(12-0)+(12-0)+(0-0)|\n     = 1/2 |0+12+12+0|\n     = 1/2 |24|\n     = 12 unit persegi\nJawapan: 12 unit persegi (Semakan: PQRS ialah segi empat tepat 4 unit × 3 unit = 12 unit persegi, jawapan disahkan betul.)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Senaraikan koordinat bucu mengikut turutan (ikut jam atau lawan jam) di sekeliling poligon, jangan bertukar arah secara rawak.",
            "Tulis koordinat dalam susunan menegak (kaedah determinant 2 baris) untuk memudahkan pengiraan hasil darab pekali bersilang.",
            "Sentiasa ambil nilai mutlak sebelum dibahagikan dengan 2 supaya luas sentiasa positif.",
            "Bagi poligon dengan lebih daripada 3 bucu, sambungkan semula bucu terakhir kepada bucu pertama dalam pengiraan.",
            "Boleh menyemak jawapan dengan membahagikan poligon kepada beberapa segi tiga atau segi empat tepat yang mudah dikira.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tidak menyenaraikan bucu mengikut turutan yang betul di sekeliling poligon (lompat-lompat), menyebabkan jawapan salah.",
            "Terlupa mengambil nilai mutlak, menyebabkan luas menjadi negatif.",
            "Terlupa membahagikan dengan 2 pada langkah akhir.",
            "Tersilap memadankan pekali x dan y semasa kaedah pendaraban bersilang.",
            "Tidak menyambungkan bucu terakhir kembali ke bucu pertama semasa mengira hasil tambah pendaraban bersilang.",
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
            "Jarak antara dua titik menggunakan Teorem Pythagoras dalam bentuk √((x2-x1)² + (y2-y1)²).",
            "Titik tengah ialah purata koordinat-x dan purata koordinat-y.",
            "Luas poligon dikira menggunakan kaedah senarai (shoelace) berdasarkan koordinat bucu, dengan nilai mutlak dan dibahagikan dengan 2.",
          ],
        },
        {
          title: "Formula Penting",
          formula:
            "Jarak: AB = √((x2-x1)² + (y2-y1)²)\nTitik Tengah: M = ((x1+x2)/2, (y1+y2)/2)\nLuas Segi Tiga: Luas = 1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Lukis gambar rajah satah Cartes ringkas untuk membantu memahami kedudukan titik sebelum mengira.",
            "Semak semula tanda positif/negatif setiap koordinat sebelum menggantikannya ke dalam formula.",
            "Untuk soalan luas, pastikan bucu disenaraikan mengikut turutan yang betul di sekeliling poligon.",
            "Sentiasa nyatakan unit jawapan dengan betul: unit untuk jarak dan koordinat, unit persegi untuk luas.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Jarak antara dua titik A(x1,y1) dan B(x2,y2) ialah √((x2-x1)² + (y2-y1)²).",
    "Titik tengah antara dua titik ialah ((x1+x2)/2, (y1+y2)/2).",
    "Luas poligon menggunakan kaedah senarai (shoelace) mesti diambil nilai mutlak dan dibahagikan dengan 2.",
    "Susunan koordinat bucu mesti konsisten (ikut jam atau lawan jam) semasa mengira luas poligon.",
    "Jarak sentiasa bernilai positif; titik tengah ialah satu titik koordinat, bukan satu nilai jarak.",
  ],
  keyTerms: [
    "Satah Cartes",
    "Koordinat",
    "Jarak antara dua titik",
    "Titik tengah",
    "Bucu poligon",
    "Kaedah senarai (shoelace)",
    "Nilai mutlak",
    "Teorem Pythagoras",
  ],
};
