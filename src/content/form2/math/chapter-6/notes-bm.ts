import type { StructuredNotes } from "@/data/types";

export const mathF2C6NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 6 Bentuk Geometri Tiga Matra membantu murid mengenal pasti sifat geometri prisma, piramid, silinder, kon dan sfera, melukis dan mengenal pasti bentangan (rangkaian) bentuk tiga matra, serta mengira luas permukaan dan isi padu bentuk tiga matra dan gabungan bentuk tiga matra.",
  quickRevision: [
    "Bentuk tiga matra mempunyai panjang, lebar dan tinggi (atau ketinggian).",
    "Prisma dan piramid dinamakan mengikut bentuk tapaknya.",
    "Bentangan ialah bentuk dua matra yang boleh dilipat untuk membentuk semula bentuk tiga matra.",
    "Luas permukaan ialah jumlah luas semua permukaan (muka) sesuatu bentuk tiga matra, diukur dalam unit persegi (cm², m²).",
    "Isi padu ialah ruang yang diisi oleh sesuatu bentuk tiga matra, diukur dalam unit padu (cm³, m³).",
    "Gunakan π ≈ 3.142 atau 22/7 mengikut kesesuaian nombor dalam soalan.",
    "Bagi gabungan bentuk, kenal pasti dahulu bentuk-bentuk asas yang membentuknya sebelum mengira luas permukaan atau isi padu.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan menerangkan sifat geometri bentuk tiga matra (prisma, piramid, silinder, kon dan sfera).",
            "Melukis dan mengenal pasti bentangan bagi bentuk tiga matra.",
            "Mengira luas permukaan bentuk tiga matra termasuk gabungan dua bentuk tiga matra.",
            "Mengira isi padu bentuk tiga matra termasuk gabungan dua bentuk tiga matra.",
            "Menyelesaikan masalah yang melibatkan luas permukaan dan isi padu dalam kehidupan harian.",
          ],
        },
      ],
    },
    {
      title: "6.1 Sifat Geometri Bentuk Tiga Matra",
      subsections: [
        {
          title: "Definisi",
          content:
            "Bentuk tiga matra (3D) ialah bentuk yang mempunyai tiga ukuran iaitu panjang, lebar dan tinggi/ketinggian. Bentuk tiga matra mempunyai muka, sisi (tepi) dan bucu.",
        },
        {
          title: "Komponen Bentuk Tiga Matra",
          bulletPoints: [
            "Muka (face): permukaan rata atau melengkung pada bentuk tiga matra.",
            "Sisi/tepi (edge): garis yang dibentuk apabila dua muka bertemu.",
            "Bucu (vertex): titik pertemuan dua atau lebih sisi.",
          ],
        },
        {
          title: "Jenis-Jenis Bentuk Tiga Matra",
          table: {
            headers: ["Bentuk", "Tapak/Keratan Rentas", "Ciri Utama"],
            rows: [
              ["Kubus", "Segi empat sama", "Semua sisi sama panjang, 6 muka segi empat sama"],
              ["Kuboid", "Segi empat tepat", "6 muka segi empat tepat, sisi bertentangan sama panjang"],
              ["Prisma", "Sama di sepanjang panjangnya (contoh: segi tiga, segi empat, pentagon)", "Dua tapak selari dan sama bentuk/saiz, muka sisi segi empat tepat"],
              ["Piramid", "Sama seperti tapaknya (segi tiga, segi empat, dsb.)", "Satu tapak, muka sisi bertemu pada satu bucu (apeks)"],
              ["Silinder", "Bulatan", "Dua tapak bulatan selari dan sama saiz, satu muka melengkung"],
              ["Kon", "Bulatan", "Satu tapak bulatan, satu muka melengkung bertemu pada satu apeks"],
              ["Sfera", "Tiada tapak rata", "Permukaan melengkung sekata, semua titik pada permukaan sama jarak dari pusat"],
            ],
          },
        },
        {
          title: "Bilangan Muka, Sisi dan Bucu",
          table: {
            headers: ["Bentuk", "Bilangan Muka", "Bilangan Sisi", "Bilangan Bucu"],
            rows: [
              ["Kubus/Kuboid", "6", "12", "8"],
              ["Prisma segi tiga", "5", "9", "6"],
              ["Piramid tegak segi empat", "5", "8", "5"],
              ["Silinder", "2 rata + 1 melengkung", "2 (bulatan tepi)", "0"],
              ["Kon", "1 rata + 1 melengkung", "1 (bulatan tepi)", "1 (apeks)"],
              ["Sfera", "1 melengkung", "0", "0"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Prisma dan piramid dinamakan mengikut bentuk tapaknya, contohnya prisma segi tiga, piramid segi empat.",
            "Silinder, kon dan sfera mempunyai sekurang-kurangnya satu permukaan melengkung.",
            "Sfera tidak mempunyai tapak, sisi atau bucu.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan prisma dengan piramid kerana kedua-duanya mempunyai tapak berbentuk poligon.",
            "Tersilap mengira bilangan muka bagi prisma — bilangan muka sisi bersamaan bilangan sisi tapak, tambah 2 tapak.",
            "Menganggap kon mempunyai dua bucu (sebenarnya hanya satu apeks).",
          ],
        },
      ],
    },
    {
      title: "6.2 Bentangan Bentuk Tiga Matra",
      subsections: [
        {
          title: "Definisi",
          content:
            "Bentangan (rangkaian) ialah bentuk dua matra yang terbentuk apabila permukaan sesuatu bentuk tiga matra dibuka leper. Bentangan boleh dilipat semula untuk membentuk bentuk tiga matra asal.",
        },
        {
          title: "Bentangan Bentuk Biasa",
          table: {
            headers: ["Bentuk Tiga Matra", "Bentangan"],
            rows: [
              ["Kubus", "6 segi empat sama yang bersambung"],
              ["Kuboid", "6 segi empat tepat (3 pasang sama saiz) yang bersambung"],
              ["Prisma segi tiga", "2 segi tiga (tapak) + 3 segi empat tepat (muka sisi)"],
              ["Piramid segi empat", "1 segi empat (tapak) + 4 segi tiga (muka sisi)"],
              ["Silinder", "2 bulatan (tapak) + 1 segi empat tepat (lengkap membentuk permukaan sisi melengkung)"],
              ["Kon", "1 bulatan (tapak) + 1 sektor bulatan (permukaan sisi melengkung)"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Lukiskan bentangan bagi sebuah kuboid berukuran panjang 5 cm, lebar 3 cm dan tinggi 4 cm. Berapakah bilangan segi empat tepat dalam bentangan itu?\n\nPenyelesaian: Kuboid mempunyai 6 muka iaitu 3 pasang segi empat tepat yang serupa: (5 cm x 3 cm), (5 cm x 4 cm), dan (3 cm x 4 cm), setiap pasang berulang dua kali.\n\nJawapan: 6 segi empat tepat (3 pasang).",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah kon mempunyai bentangan yang terdiri daripada satu bulatan dan satu sektor bulatan. Namakan bahagian bentangan yang mewakili tapak kon dan bahagian yang mewakili permukaan sisi kon.\n\nPenyelesaian: Bulatan dalam bentangan mewakili tapak kon (rata). Sektor bulatan dalam bentangan mewakili permukaan sisi melengkung kon apabila dibuka leper.\n\nJawapan: Bulatan = tapak kon; Sektor bulatan = permukaan sisi kon.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Satu bentuk tiga matra boleh mempunyai lebih daripada satu cara bentangan, asalkan boleh dilipat semula membentuk bentuk asal.",
            "Bilangan dan bentuk muka dalam bentangan mesti sepadan dengan bilangan dan bentuk muka bentuk tiga matra asal.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Lupa memasukkan kedua-dua tapak bagi prisma dan silinder semasa melukis bentangan.",
            "Melukis bentangan kon sebagai dua bulatan (sepatutnya satu bulatan dan satu sektor).",
            "Saiz muka dalam bentangan tidak sepadan dengan ukuran sebenar bentuk tiga matra.",
          ],
        },
      ],
    },
    {
      title: "6.3 Luas Permukaan Bentuk Tiga Matra",
      subsections: [
        {
          title: "Definisi",
          content:
            "Luas permukaan ialah jumlah luas keseluruhan permukaan (semua muka) sesuatu bentuk tiga matra. Luas permukaan diukur dalam unit persegi seperti cm² atau m².",
        },
        {
          title: "Formula",
          table: {
            headers: ["Bentuk", "Formula Luas Permukaan"],
            rows: [
              ["Kubus (sisi, s)", "Luas Permukaan = 6 x s²"],
              ["Kuboid (panjang l, lebar w, tinggi h)", "Luas Permukaan = 2(lw + lh + wh)"],
              ["Prisma tegak", "Luas Permukaan = (2 x Luas Tapak) + (Perimeter Tapak x Tinggi Prisma)"],
              ["Silinder (jejari r, tinggi h)", "Luas Permukaan = 2πr² + 2πrh = 2πr(r + h)"],
              ["Piramid tegak", "Luas Permukaan = Luas Tapak + Jumlah Luas Semua Muka Sisi Segi Tiga"],
              ["Kon (jejari r, kecondongan/lengek l)", "Luas Permukaan = πr² + πrl = πr(r + l)"],
              ["Sfera (jejari r)", "Luas Permukaan = 4πr²"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah kuboid mempunyai panjang 8 cm, lebar 5 cm dan tinggi 4 cm. Hitung luas permukaan kuboid itu.\n\nPenyelesaian:\nLuas Permukaan = 2(lw + lh + wh)\n= 2[(8 x 5) + (8 x 4) + (5 x 4)]\n= 2[40 + 32 + 20]\n= 2(92)\n= 184 cm²\n\nJawapan: 184 cm²",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah silinder mempunyai jejari tapak 7 cm dan tinggi 10 cm. Hitung luas permukaan silinder itu. (Guna π = 22/7)\n\nPenyelesaian:\nLuas Permukaan = 2πr(r + h)\n= 2 x 22/7 x 7 x (7 + 10)\n= 2 x 22 x 17\n= 748 cm²\n\nJawapan: 748 cm²",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Sebuah kon mempunyai jejari tapak 6 cm dan kecondongan (lengek) 10 cm. Hitung luas permukaan kon itu. (Guna π = 3.142)\n\nPenyelesaian:\nLuas Permukaan = πr(r + l)\n= 3.142 x 6 x (6 + 10)\n= 3.142 x 6 x 16\n= 301.632 cm²\n\nJawapan: 301.63 cm² (2 tempat perpuluhan)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Luas permukaan sentiasa diukur dalam unit persegi (cm², m²) — bukan unit padu.",
            "Bagi prisma, kenal pasti perimeter tapak dengan betul sebelum mendarab dengan tinggi prisma.",
            "Bagi kon, gunakan kecondongan (slant height, l), bukan tinggi tegak (h), dalam formula luas permukaan sisi melengkung.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan formula isi padu apabila soalan meminta luas permukaan.",
            "Mengelirukan tinggi tegak (h) dengan kecondongan (l) bagi kon.",
            "Terlupa mendarab dengan 2 bagi dua tapak silinder atau prisma.",
            "Tersilap unit — menulis cm³ untuk luas permukaan sedangkan sepatutnya cm².",
          ],
        },
      ],
    },
    {
      title: "6.4 Isi Padu Bentuk Tiga Matra",
      subsections: [
        {
          title: "Definisi",
          content:
            "Isi padu ialah jumlah ruang tiga matra yang diisi oleh sesuatu bentuk pejal. Isi padu diukur dalam unit padu seperti cm³ atau m³.",
        },
        {
          title: "Formula",
          table: {
            headers: ["Bentuk", "Formula Isi Padu"],
            rows: [
              ["Kubus (sisi, s)", "Isi Padu = s³"],
              ["Kuboid (panjang l, lebar w, tinggi h)", "Isi Padu = l x w x h"],
              ["Prisma tegak", "Isi Padu = Luas Tapak x Tinggi Prisma"],
              ["Silinder (jejari r, tinggi h)", "Isi Padu = πr²h"],
              ["Piramid tegak", "Isi Padu = 1/3 x Luas Tapak x Tinggi Piramid"],
              ["Kon (jejari r, tinggi h)", "Isi Padu = 1/3 x πr²h"],
              ["Sfera (jejari r)", "Isi Padu = 4/3 x πr³"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah piramid tegak mempunyai tapak segi empat sama dengan sisi 6 cm dan tinggi piramid 9 cm. Hitung isi padu piramid itu.\n\nPenyelesaian:\nLuas Tapak = 6 x 6 = 36 cm²\nIsi Padu = 1/3 x Luas Tapak x Tinggi\n= 1/3 x 36 x 9\n= 108 cm³\n\nJawapan: 108 cm³",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah kon mempunyai jejari tapak 3 cm dan tinggi 7 cm. Hitung isi padu kon itu. (Guna π = 22/7)\n\nPenyelesaian:\nIsi Padu = 1/3 x πr²h\n= 1/3 x 22/7 x 3² x 7\n= 1/3 x 22/7 x 9 x 7\n= 1/3 x 198\n= 66 cm³\n\nJawapan: 66 cm³",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Sebuah sfera mempunyai jejari 6 cm. Hitung isi padu sfera itu. (Guna π = 3.142)\n\nPenyelesaian:\nIsi Padu = 4/3 x πr³\n= 4/3 x 3.142 x 6³\n= 4/3 x 3.142 x 216\n= 4/3 x 678.672\n= 904.896 cm³\n\nJawapan: 904.90 cm³ (2 tempat perpuluhan)",
        },
        {
          title: "Contoh 4 (Gabungan Bentuk)",
          content:
            "Soalan: Sebuah pepejal terdiri daripada silinder berjejari 4 cm dan tinggi 10 cm, dengan kon berjejari sama dan tinggi 6 cm di atasnya. Hitung isi padu keseluruhan pepejal itu. (Guna π = 3.142)\n\nPenyelesaian:\nIsi Padu Silinder = πr²h = 3.142 x 4² x 10 = 3.142 x 16 x 10 = 502.72 cm³\nIsi Padu Kon = 1/3 x πr²h = 1/3 x 3.142 x 16 x 6 = 1/3 x 301.632 = 100.544 cm³\nIsi Padu Keseluruhan = 502.72 + 100.544 = 603.264 cm³\n\nJawapan: 603.26 cm³ (2 tempat perpuluhan)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Isi padu sentiasa diukur dalam unit padu (cm³, m³) — bukan unit persegi.",
            "Piramid dan kon mempunyai isi padu 1/3 berbanding prisma/silinder dengan tapak dan tinggi yang sama.",
            "Bagi gabungan bentuk, kira isi padu setiap bahagian secara berasingan kemudian tambah atau tolak mengikut situasi (contohnya jika satu bentuk dikeluarkan/dilubangkan).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa darab 1/3 untuk piramid dan kon.",
            "Menggunakan formula luas permukaan apabila soalan meminta isi padu, atau sebaliknya.",
            "Tersilap unit — menulis cm² untuk isi padu sedangkan sepatutnya cm³.",
            "Bagi gabungan bentuk, tertinggal salah satu bahagian semasa mengira jumlah isi padu.",
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
            "Bentuk tiga matra mempunyai muka, sisi dan bucu yang menentukan sifat geometrinya.",
            "Bentangan ialah bentuk dua matra yang boleh dilipat menjadi bentuk tiga matra.",
            "Luas permukaan = jumlah luas semua muka (unit persegi).",
            "Isi padu = ruang yang diisi oleh bentuk pejal (unit padu).",
            "Piramid dan kon mempunyai isi padu 1/3 daripada prisma/silinder sepadan dengan tapak dan tinggi sama.",
          ],
        },
        {
          title: "Formula Penting",
          table: {
            headers: ["Bentuk", "Luas Permukaan", "Isi Padu"],
            rows: [
              ["Kubus", "6s²", "s³"],
              ["Kuboid", "2(lw + lh + wh)", "l x w x h"],
              ["Prisma tegak", "(2 x Luas Tapak) + (Perimeter Tapak x Tinggi)", "Luas Tapak x Tinggi"],
              ["Silinder", "2πr(r + h)", "πr²h"],
              ["Piramid tegak", "Luas Tapak + Jumlah Luas Muka Sisi", "1/3 x Luas Tapak x Tinggi"],
              ["Kon", "πr(r + l)", "1/3 x πr²h"],
              ["Sfera", "4πr²", "4/3 x πr³"],
            ],
          },
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa tulis unit yang betul: cm² untuk luas permukaan, cm³ untuk isi padu.",
            "Kenal pasti π yang digunakan (3.142 atau 22/7) berdasarkan nombor dalam soalan supaya pengiraan lebih mudah.",
            "Lukis gambar rajah atau bentangan jika perlu untuk memahami bentuk dengan lebih jelas.",
            "Bagi gabungan bentuk, pecahkan kepada bentuk asas dahulu sebelum mengira.",
            "Semak semula sama ada soalan meminta kecondongan (l) atau tinggi tegak (h) sebelum menggunakan formula.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Prisma dan piramid dinamakan mengikut bentuk tapaknya.",
    "Bentangan kon terdiri daripada satu bulatan dan satu sektor bulatan.",
    "Luas Permukaan Silinder = 2πr(r + h); Isi Padu Silinder = πr²h.",
    "Isi Padu Kon = 1/3 x πr²h; Isi Padu Piramid = 1/3 x Luas Tapak x Tinggi.",
    "Luas Permukaan Sfera = 4πr²; Isi Padu Sfera = 4/3 x πr³.",
    "Gunakan kecondongan (slant height, l), bukan tinggi tegak (h), untuk luas permukaan sisi kon.",
    "Unit luas permukaan adalah persegi (cm²), unit isi padu adalah padu (cm³).",
  ],
  keyTerms: [
    "Bentuk tiga matra",
    "Prisma",
    "Piramid",
    "Silinder",
    "Kon",
    "Sfera",
    "Bentangan",
    "Luas permukaan",
    "Isi padu",
    "Kecondongan (slant height)",
    "Apeks",
    "Tapak",
  ],
};
