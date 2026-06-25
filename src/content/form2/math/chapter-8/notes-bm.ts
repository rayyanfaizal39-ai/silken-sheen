import type { StructuredNotes } from "@/data/types";

export const mathF2C8NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 8 Graf Fungsi memperkenalkan konsep fungsi, tatatanda fungsi f(x), domain dan rangka (julat), serta cara membina jadual nilai dan melukis graf fungsi linear dan fungsi bukan linear (kuadratik).",
  quickRevision: [
    "Fungsi ialah hubungan yang memetakan setiap nilai domain (x) kepada satu nilai sahaja dalam rangka (y).",
    "Tatatanda fungsi f(x) bermaksud nilai y bagi suatu nilai x yang diberi.",
    "Domain ialah set nilai x yang dibenarkan; rangka (julat) ialah set nilai y yang terhasil.",
    "Graf fungsi linear, contohnya y = mx + c, berbentuk garis lurus.",
    "Graf fungsi bukan linear seperti y = ax^2 + bx + c berbentuk lengkung licin (parabola).",
    "Sentiasa bina jadual nilai sebelum melukis graf supaya titik-titik tepat dan teratur.",
    "Sambungkan titik-titik dengan garis lurus untuk graf linear, dan dengan lengkung licin untuk graf bukan linear — jangan gunakan garis lurus untuk graf lengkung.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti hubungan antara dua pemboleh ubah sebagai fungsi.",
            "Menentukan nilai fungsi bagi suatu nilai domain yang diberi menggunakan tatatanda f(x).",
            "Membina jadual nilai bagi suatu fungsi.",
            "Melukis graf fungsi linear dan fungsi bukan linear.",
            "Menentukan bentuk graf fungsi linear dan bukan linear.",
            "Menyelesaikan masalah yang melibatkan graf fungsi.",
          ],
        },
      ],
    },
    {
      title: "8.1 Fungsi",
      subsections: [
        {
          title: "Definisi",
          content:
            "Fungsi ialah suatu hubungan khas yang memetakan setiap nilai pada domain (set input, x) kepada hanya satu nilai pada rangka atau julat (set output, y). Fungsi boleh diwakilkan dalam bentuk gambar rajah pemetaan, jadual, pasangan tertib, atau persamaan algebra.",
        },
        {
          title: "Tatatanda Fungsi",
          content:
            "Tatatanda fungsi f(x) dibaca sebagai 'f bagi x' dan mewakili nilai y yang sepadan dengan nilai x dalam fungsi f. Sebagai contoh, jika f(x) = 2x + 1, maka f(3) bermaksud gantikan x = 3 ke dalam fungsi tersebut.",
          formula: "f(x) = 2x + 1\nf(3) = 2(3) + 1 = 7",
        },
        {
          title: "Domain dan Rangka",
          bulletPoints: [
            "Domain: set semua nilai x (input) yang dibenarkan dalam suatu fungsi.",
            "Rangka (julat): set semua nilai y (output) yang terhasil daripada domain.",
            "Setiap nilai domain hanya boleh dipetakan kepada SATU nilai rangka sahaja bagi suatu fungsi.",
          ],
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Diberi fungsi f(x) = 3x - 2, cari nilai f(0), f(2) dan f(-1).\n\nPenyelesaian:\nf(0) = 3(0) - 2 = -2\nf(2) = 3(2) - 2 = 4\nf(-1) = 3(-1) - 2 = -5\n\nJawapan: f(0) = -2, f(2) = 4, f(-1) = -5",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Diberi fungsi g(x) = x^2 - 1, cari nilai g(-2), g(0) dan g(3).\n\nPenyelesaian:\ng(-2) = (-2)^2 - 1 = 4 - 1 = 3\ng(0) = (0)^2 - 1 = -1\ng(3) = (3)^2 - 1 = 9 - 1 = 8\n\nJawapan: g(-2) = 3, g(0) = -1, g(3) = 8",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "f(x) ialah nama lain bagi y dalam suatu fungsi.",
            "Gantikan nilai x yang diberi ke dalam fungsi untuk mendapatkan nilai f(x).",
            "Setiap satu nilai x hanya menghasilkan SATU nilai f(x) — ini ciri penting sesuatu fungsi.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tersilap menggantikan nilai x, terutamanya apabila x bernilai negatif (lupa kuasa dua nombor negatif adalah positif).",
            "Tersilap tertib operasi semasa mengira f(x), contohnya darab/kuasa sebelum tambah/tolak.",
            "Mengelirukan f(x) dengan f x x (f didarab dengan x) — f(x) adalah tatatanda fungsi, bukan pendaraban.",
          ],
        },
      ],
    },
    {
      title: "8.2 Graf Fungsi",
      subsections: [
        {
          title: "Definisi",
          content:
            "Graf fungsi ialah perwakilan visual bagi suatu fungsi pada satah Cartes, dilukis berdasarkan pasangan nilai (x, y) yang diperoleh daripada jadual nilai fungsi tersebut.",
        },
        {
          title: "Langkah Melukis Graf Fungsi",
          bulletPoints: [
            "1. Bina jadual nilai dengan menggantikan setiap nilai x yang diberi ke dalam fungsi untuk mendapatkan nilai y.",
            "2. Pilih skala yang sesuai bagi paksi-x dan paksi-y berdasarkan julat nilai dalam jadual.",
            "3. Plotkan semua titik (x, y) daripada jadual pada satah Cartes.",
            "4. Sambungkan titik-titik dengan garis lurus (fungsi linear) atau lengkung licin (fungsi bukan linear).",
            "5. Labelkan graf dan kedua-dua paksi dengan jelas.",
          ],
        },
        {
          title: "Contoh 1 — Graf Fungsi Linear",
          content:
            "Soalan: Bina jadual nilai dan lukis graf bagi fungsi y = 2x + 1 untuk -2 ≤ x ≤ 2.\n\nPenyelesaian: Gantikan setiap nilai x ke dalam y = 2x + 1.\nx = -2: y = 2(-2) + 1 = -3\nx = -1: y = 2(-1) + 1 = -1\nx = 0: y = 2(0) + 1 = 1\nx = 1: y = 2(1) + 1 = 3\nx = 2: y = 2(2) + 1 = 5\n\nJawapan: Jadual nilai (x, y): (-2, -3), (-1, -1), (0, 1), (1, 3), (2, 5). Apabila titik-titik ini diplot dan disambungkan, graf yang terhasil ialah satu GARIS LURUS yang menaik dari kiri ke kanan (kecerunan positif).",
          table: {
            headers: ["x", "-2", "-1", "0", "1", "2"],
            rows: [["y = 2x + 1", "-3", "-1", "1", "3", "5"]],
          },
        },
        {
          title: "Contoh 2 — Graf Fungsi Bukan Linear (Kuadratik)",
          content:
            "Soalan: Bina jadual nilai dan lukis graf bagi fungsi y = x^2 - 2 untuk -2 ≤ x ≤ 2.\n\nPenyelesaian: Gantikan setiap nilai x ke dalam y = x^2 - 2.\nx = -2: y = (-2)^2 - 2 = 4 - 2 = 2\nx = -1: y = (-1)^2 - 2 = 1 - 2 = -1\nx = 0: y = (0)^2 - 2 = 0 - 2 = -2\nx = 1: y = (1)^2 - 2 = 1 - 2 = -1\nx = 2: y = (2)^2 - 2 = 4 - 2 = 2\n\nJawapan: Jadual nilai (x, y): (-2, 2), (-1, -1), (0, -2), (1, -1), (2, 2). Apabila titik-titik ini diplot dan disambungkan dengan lengkung licin, graf yang terhasil berbentuk PARABOLA yang terbuka ke atas dengan titik minimum di (0, -2).",
          table: {
            headers: ["x", "-2", "-1", "0", "1", "2"],
            rows: [["y = x^2 - 2", "2", "-1", "-2", "-1", "2"]],
          },
        },
        {
          title: "Bentuk Graf Fungsi",
          table: {
            headers: ["Jenis Fungsi", "Contoh Bentuk", "Bentuk Graf"],
            rows: [
              ["Fungsi Linear", "y = mx + c", "Garis lurus"],
              ["Fungsi Kuadratik", "y = ax^2 + bx + c", "Lengkung parabola (licin)"],
            ],
          },
        },
        {
          title: "Formula",
          formula: "Fungsi linear: y = mx + c\nFungsi kuadratik: y = ax^2 + bx + c (a != 0)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Graf fungsi linear ialah garis lurus — hanya perlu sekurang-kurangnya 2 titik untuk melukisnya, tetapi lebih banyak titik memastikan ketepatan.",
            "Graf fungsi kuadratik (bukan linear) berbentuk parabola — lengkung licin, bukan bersudut tajam.",
            "Apabila pekali x^2 positif (a > 0), parabola terbuka ke atas; apabila negatif (a < 0), parabola terbuka ke bawah.",
            "Skala paksi-x dan paksi-y mestilah seragam (sekata) di sepanjang setiap paksi.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan garis lurus untuk menyambungkan titik-titik graf kuadratik sedangkan ia harus dilukis sebagai lengkung licin.",
            "Plot titik pada kedudukan yang salah akibat tersilap baca skala paksi.",
            "Menggunakan skala yang tidak seragam (tidak sekata) pada paksi-x atau paksi-y.",
            "Tersilap kira nilai y dalam jadual nilai akibat tersilap menggantikan nilai x negatif.",
            "Tidak melabelkan paksi-x, paksi-y, atau graf itu sendiri.",
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
            "Fungsi memetakan setiap nilai domain (x) kepada hanya satu nilai rangka (y).",
            "f(x) ialah nilai y bagi suatu nilai x yang digantikan ke dalam fungsi f.",
            "Jadual nilai mesti dibina dengan tepat sebelum melukis sebarang graf fungsi.",
            "Graf fungsi linear adalah garis lurus; graf fungsi kuadratik adalah lengkung parabola.",
          ],
          table: {
            headers: ["Konsep", "Penjelasan Ringkas"],
            rows: [
              ["Domain", "Set nilai x (input) yang dibenarkan"],
              ["Rangka / Julat", "Set nilai y (output) yang terhasil"],
              ["f(x)", "Nilai y bagi fungsi f apabila x digantikan"],
            ],
          },
        },
        {
          title: "Formula Penting",
          formula: "Fungsi linear: y = mx + c\nFungsi kuadratik: y = ax^2 + bx + c (a != 0)",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa semak semula pengiraan f(x) dengan menggantikan semula nilai x.",
            "Lukis jadual nilai dengan kemas dan semak setiap nilai y sebelum memplot graf.",
            "Ingat: garis lurus untuk fungsi linear, lengkung licin untuk fungsi bukan linear.",
            "Gunakan pensel dan pembaris untuk graf linear, dan lukis lengkung dengan tangan yang stabil untuk graf kuadratik.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Fungsi memetakan setiap nilai domain kepada hanya SATU nilai rangka.",
    "f(x) mewakili nilai y bagi suatu fungsi f apabila nilai x digantikan.",
    "Jadual nilai mesti dibina sebelum melukis graf supaya titik tepat.",
    "Graf fungsi linear y = mx + c berbentuk garis lurus.",
    "Graf fungsi kuadratik y = ax^2 + bx + c berbentuk parabola (lengkung licin).",
    "Titik-titik graf kuadratik mesti disambung dengan lengkung licin, bukan garis lurus.",
  ],
  keyTerms: [
    "Fungsi",
    "Tatatanda fungsi",
    "Domain",
    "Rangka (julat)",
    "Jadual nilai",
    "Graf fungsi linear",
    "Graf fungsi kuadratik",
    "Parabola",
    "Skala paksi",
  ],
};
