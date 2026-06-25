import type { StructuredNotes } from "@/data/types";

export const mathF2C2NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 2 Pemfaktoran dan Pecahan Algebra mengajar murid mengembangkan ungkapan algebra, memfaktorkan ungkapan algebra menggunakan pelbagai kaedah, serta melakukan operasi tambah, tolak, darab dan bahagi ke atas pecahan algebra.",
  quickRevision: [
    "Pengembangan ialah proses membuka kurungan dengan mendarabkan setiap sebutan.",
    "Pemfaktoran ialah proses menulis ungkapan sebagai hasil darab faktor-faktornya, iaitu proses berlawanan dengan pengembangan.",
    "Faktor sepunya tertinggi (FST) mesti dikenal pasti dahulu sebelum memfaktorkan lebih lanjut.",
    "Beza dua kuasa dua: a^2 - b^2 = (a + b)(a - b).",
    "Untuk pecahan algebra, faktorkan pengangka dan penyebut dahulu sebelum memudahkan, membatalkan, mendarab atau membahagi.",
    "Untuk tambah/tolak pecahan algebra, penyebut mesti disamakan dengan mencari gandaan sepunya terkecil (GSPT) dahulu.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengembangkan ungkapan algebra dalam bentuk satu kurungan dan dua kurungan.",
            "Memfaktorkan ungkapan algebra menggunakan faktor sepunya, beza dua kuasa dua dan kaedah pemfaktoran sebutan kuadratik.",
            "Mendarab dan membahagi pecahan algebra yang melibatkan ungkapan algebra.",
            "Menambah dan menolak pecahan algebra yang mempunyai penyebut sama atau berbeza.",
          ],
        },
      ],
    },
    {
      title: "2.1 Pengembangan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pengembangan ialah proses mendarabkan setiap sebutan di dalam kurungan dengan sebutan atau ungkapan di luar kurungan untuk membuka kurungan tersebut.",
        },
        {
          title: "Formula",
          formula:
            "Satu kurungan: a(b + c) = ab + ac\nDua kurungan: (a + b)(c + d) = ac + ad + bc + bd",
        },
        {
          title: "Contoh 1 (Satu Kurungan)",
          content:
            "Soalan: Kembangkan 3x(2x - 5).\nPenyelesaian: 3x(2x - 5) = (3x x 2x) + (3x x (-5))\n= 6x^2 - 15x\nJawapan: 6x^2 - 15x",
        },
        {
          title: "Contoh 2 (Dua Kurungan)",
          content:
            "Soalan: Kembangkan (x + 3)(x - 4).\nPenyelesaian: (x + 3)(x - 4) = x(x - 4) + 3(x - 4)\n= x^2 - 4x + 3x - 12\n= x^2 - x - 12\nJawapan: x^2 - x - 12",
        },
        {
          title: "Contoh 3 (Kuasa Dua Sempurna)",
          content:
            "Soalan: Kembangkan (2x - 1)^2.\nPenyelesaian: (2x - 1)^2 = (2x - 1)(2x - 1)\n= 4x^2 - 2x - 2x + 1\n= 4x^2 - 4x + 1\nJawapan: 4x^2 - 4x + 1",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Setiap sebutan dalam kurungan pertama mesti didarab dengan setiap sebutan dalam kurungan kedua.",
            "Pastikan tanda (+ atau -) didarab dengan betul mengikut hukum tanda.",
            "Sentiasa permudahkan ungkapan dengan menggabungkan sebutan serupa selepas pengembangan.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa mendarab tanda negatif menyebabkan jawapan tersilap tanda.",
            "Tidak mendarab semua sebutan iaitu hanya mengembangkan sebahagian kurungan.",
            "Tersilap menggabungkan sebutan tidak serupa, contohnya menambah x^2 dengan x.",
          ],
        },
      ],
    },
    {
      title: "2.2 Pemfaktoran Ungkapan Algebra",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pemfaktoran ialah proses menulis ungkapan algebra sebagai hasil darab dua atau lebih faktor. Pemfaktoran adalah proses berlawanan dengan pengembangan.",
        },
        {
          title: "Kaedah 1: Faktor Sepunya Tertinggi (FST)",
          content:
            "Cari faktor sepunya tertinggi bagi semua sebutan dalam ungkapan, kemudian keluarkan faktor tersebut sebagai faktor luar kurungan.",
          formula: "ab + ac = a(b + c)",
        },
        {
          title: "Contoh 1 (FST)",
          content:
            "Soalan: Faktorkan 6x^2 + 9x.\nPenyelesaian: FST bagi 6x^2 dan 9x ialah 3x.\n6x^2 + 9x = 3x(2x) + 3x(3)\n= 3x(2x + 3)\nJawapan: 3x(2x + 3)",
        },
        {
          title: "Kaedah 2: Beza Dua Kuasa Dua",
          content:
            "Digunakan apabila ungkapan terdiri daripada dua sebutan kuasa dua yang ditolak antara satu sama lain.",
          formula: "a^2 - b^2 = (a + b)(a - b)",
        },
        {
          title: "Contoh 2 (Beza Dua Kuasa Dua)",
          content:
            "Soalan: Faktorkan 4x^2 - 25.\nPenyelesaian: 4x^2 = (2x)^2 dan 25 = 5^2\n4x^2 - 25 = (2x)^2 - (5)^2\n= (2x + 5)(2x - 5)\nJawapan: (2x + 5)(2x - 5)",
        },
        {
          title: "Kaedah 3: Pemfaktoran Sebutan Kuadratik (Kaedah Silang)",
          content:
            "Digunakan untuk memfaktorkan ungkapan kuadratik dalam bentuk ax^2 + bx + c. Cari dua nombor yang hasil darabnya sama dengan a x c dan hasil tambahnya sama dengan b, kemudian gunakan kaedah pemfaktoran kumpulan atau kaedah silang.",
          formula: "ax^2 + bx + c = (px + q)(rx + s), dengan pr = a, qs = c, ps + qr = b",
        },
        {
          title: "Contoh 3 (Sebutan Kuadratik, a = 1)",
          content:
            "Soalan: Faktorkan x^2 + 5x + 6.\nPenyelesaian: Cari dua nombor yang hasil darabnya 6 dan hasil tambahnya 5, iaitu 2 dan 3.\nx^2 + 5x + 6 = (x + 2)(x + 3)\nJawapan: (x + 2)(x + 3)",
        },
        {
          title: "Contoh 4 (Sebutan Kuadratik, a tidak sama dengan 1)",
          content:
            "Soalan: Faktorkan 2x^2 + 7x + 3.\nPenyelesaian: a x c = 2 x 3 = 6. Cari dua nombor yang hasil darabnya 6 dan hasil tambahnya 7, iaitu 1 dan 6.\n2x^2 + 7x + 3 = 2x^2 + 6x + x + 3\n= 2x(x + 3) + 1(x + 3)\n= (2x + 1)(x + 3)\nJawapan: (2x + 1)(x + 3)",
        },
        {
          title: "Contoh 5 (Gabungan FST dan Beza Dua Kuasa Dua)",
          content:
            "Soalan: Faktorkan 2x^2 - 18.\nPenyelesaian: FST ialah 2.\n2x^2 - 18 = 2(x^2 - 9)\n= 2(x + 3)(x - 3)\nJawapan: 2(x + 3)(x - 3)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa cari FST terlebih dahulu sebelum menggunakan kaedah pemfaktoran lain.",
            "Beza dua kuasa dua hanya boleh digunakan jika kedua-dua sebutan adalah kuasa dua sempurna dan ditolak.",
            "Semak jawapan pemfaktoran dengan mengembangkannya semula untuk memastikan ia sama dengan ungkapan asal.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Cuba menggunakan beza dua kuasa dua pada ungkapan yang melibatkan tambah, contohnya a^2 + b^2 tidak boleh difaktorkan dengan kaedah ini.",
            "Terlupa mengeluarkan FST sebelum memfaktorkan selanjutnya.",
            "Tersilap memilih pasangan nombor semasa kaedah silang bagi sebutan kuadratik.",
          ],
        },
      ],
    },
    {
      title: "2.3 Pecahan Algebra: Pendaraban dan Pembahagian",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pecahan algebra ialah pecahan yang pengangka atau penyebutnya mengandungi ungkapan algebra. Sebelum mendarab atau membahagi, faktorkan pengangka dan penyebut dahulu jika boleh, kemudian batalkan faktor sepunya.",
        },
        {
          title: "Formula",
          formula:
            "Pendaraban: a/b x c/d = (a x c)/(b x d)\nPembahagian: a/b ÷ c/d = a/b x d/c",
        },
        {
          title: "Contoh 1 (Pendaraban Mudah)",
          content:
            "Soalan: Permudahkan (3x)/4 x 8/(9x^2).\nPenyelesaian: (3x)/4 x 8/(9x^2)\n= (3x x 8)/(4 x 9x^2)\n= 24x/36x^2\n= 2/(3x)\nJawapan: 2/(3x)",
        },
        {
          title: "Contoh 2 (Pendaraban dengan Pemfaktoran)",
          content:
            "Soalan: Permudahkan (x + 2)/3 x 6/(x^2 - 4).\nPenyelesaian: x^2 - 4 = (x + 2)(x - 2)\n(x + 2)/3 x 6/((x + 2)(x - 2))\n= 6/(3(x - 2))\n= 2/(x - 2)\nJawapan: 2/(x - 2)",
        },
        {
          title: "Contoh 3 (Pembahagian)",
          content:
            "Soalan: Permudahkan (2x)/5 ÷ 4x^2/15.\nPenyelesaian: (2x)/5 ÷ 4x^2/15\n= (2x)/5 x 15/4x^2\n= 30x/20x^2\n= 3/(2x)\nJawapan: 3/(2x)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Faktorkan pengangka dan penyebut sepenuhnya sebelum membatalkan faktor sepunya.",
            "Apabila membahagi, tukarkan operasi bahagi kepada darab dengan salingan pecahan kedua.",
            "Pecahan akhir mesti dipermudahkan ke bentuk paling ringkas.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Membatalkan sebutan secara terus tanpa memfaktorkan dahulu, contohnya membatalkan x dalam (x+2)/(x+4) yang sebenarnya tidak boleh dibatalkan.",
            "Terlupa menukar bahagi kepada darab dengan salingan semasa pembahagian pecahan.",
            "Tersilap mendarab penyebut dengan pengangka.",
          ],
        },
      ],
    },
    {
      title: "2.4 Pecahan Algebra: Penambahan dan Penolakan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Untuk menambah atau menolak pecahan algebra, penyebut mesti disamakan dahulu dengan mencari gandaan sepunya terkecil (GSPT) bagi penyebut-penyebut tersebut.",
        },
        {
          title: "Formula",
          formula:
            "Penyebut sama: a/c + b/c = (a + b)/c\nPenyebut berbeza: a/b + c/d = (ad + bc)/bd",
        },
        {
          title: "Contoh 1 (Penyebut Sama)",
          content:
            "Soalan: Permudahkan (3x)/7 - (2x)/7.\nPenyelesaian: (3x)/7 - (2x)/7 = (3x - 2x)/7\n= x/7\nJawapan: x/7",
        },
        {
          title: "Contoh 2 (Penyebut Berbeza, Nombor)",
          content:
            "Soalan: Permudahkan x/3 + x/4.\nPenyelesaian: GSPT bagi 3 dan 4 ialah 12.\nx/3 + x/4 = 4x/12 + 3x/12\n= (4x + 3x)/12\n= 7x/12\nJawapan: 7x/12",
        },
        {
          title: "Contoh 3 (Penyebut Berbeza, Algebra)",
          content:
            "Soalan: Permudahkan 2/x - 3/(x + 1).\nPenyelesaian: GSPT bagi x dan (x + 1) ialah x(x + 1).\n2/x - 3/(x + 1) = 2(x + 1)/(x(x + 1)) - 3x/(x(x + 1))\n= (2x + 2 - 3x)/(x(x + 1))\n= (2 - x)/(x(x + 1))\nJawapan: (2 - x)/(x(x + 1))",
        },
        {
          title: "Contoh 4 (Penyebut Berbeza dengan Pemfaktoran)",
          content:
            "Soalan: Permudahkan 1/(x - 2) + 3/(x^2 - 4).\nPenyelesaian: x^2 - 4 = (x + 2)(x - 2), maka GSPT ialah (x + 2)(x - 2).\n1/(x - 2) + 3/((x + 2)(x - 2))\n= (x + 2)/((x + 2)(x - 2)) + 3/((x + 2)(x - 2))\n= (x + 2 + 3)/((x + 2)(x - 2))\n= (x + 5)/((x + 2)(x - 2))\nJawapan: (x + 5)/((x + 2)(x - 2))",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa faktorkan penyebut dahulu untuk mengenal pasti GSPT yang betul, terutamanya jika penyebut adalah ungkapan kuadratik.",
            "Selepas penyebut disamakan, hanya pengangka ditambah atau ditolak; penyebut kekal sama.",
            "Permudahkan jawapan akhir jika terdapat faktor sepunya antara pengangka dan penyebut.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menambah atau menolak penyebut secara terus, sedangkan penyebut sepatutnya disamakan dahulu.",
            "Terlupa mendarab pengangka apabila penyebut didarab untuk menyamakannya.",
            "Tersilap tanda apabila menolak pecahan, terutamanya tidak mengagihkan tanda negatif kepada semua sebutan dalam pengangka.",
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
            "Pengembangan membuka kurungan; pemfaktoran menulis ungkapan sebagai hasil darab faktor.",
            "Sentiasa cari FST dahulu sebelum kaedah pemfaktoran lain.",
            "Beza dua kuasa dua hanya untuk a^2 - b^2, bukan a^2 + b^2.",
            "Untuk pecahan algebra, faktorkan dahulu sebelum membatal, mendarab, membahagi, menambah atau menolak.",
            "Penyebut mesti disamakan menggunakan GSPT sebelum tambah atau tolak pecahan algebra.",
          ],
          table: {
            headers: ["Subtopik", "Kemahiran Utama"],
            rows: [
              ["2.1 Pengembangan", "Mendarab setiap sebutan dalam kurungan"],
              ["2.2 Pemfaktoran", "FST, beza dua kuasa dua, kaedah silang"],
              ["2.3 Darab/Bahagi Pecahan Algebra", "Faktorkan, batalkan, darab/bahagi"],
              ["2.4 Tambah/Tolak Pecahan Algebra", "Samakan penyebut dengan GSPT"],
            ],
          },
        },
        {
          title: "Formula Penting",
          formula:
            "a(b + c) = ab + ac\n(a + b)(c + d) = ac + ad + bc + bd\na^2 - b^2 = (a + b)(a - b)\na/b x c/d = (a x c)/(b x d)\na/b ÷ c/d = a/b x d/c\na/c + b/c = (a + b)/c",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Semak jawapan pemfaktoran dengan mengembangkannya semula.",
            "Sentiasa faktorkan sepenuhnya sebelum memudahkan pecahan algebra.",
            "Tulis langkah mencari GSPT dengan jelas untuk markah kerja.",
            "Hati-hati dengan tanda negatif semasa pengembangan dan penolakan pecahan.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Pengembangan: a(b + c) = ab + ac dan (a + b)(c + d) = ac + ad + bc + bd.",
    "Pemfaktoran adalah proses berlawanan dengan pengembangan.",
    "Beza dua kuasa dua: a^2 - b^2 = (a + b)(a - b).",
    "Faktorkan pengangka dan penyebut pecahan algebra sebelum membatal, mendarab atau membahagi.",
    "Untuk tambah/tolak pecahan algebra, samakan penyebut menggunakan GSPT terlebih dahulu.",
    "Pembahagian pecahan algebra ditukar kepada pendaraban menggunakan salingan.",
  ],
  keyTerms: [
    "Pengembangan",
    "Pemfaktoran",
    "Faktor Sepunya Tertinggi (FST)",
    "Beza Dua Kuasa Dua",
    "Sebutan Kuadratik",
    "Pecahan Algebra",
    "Gandaan Sepunya Terkecil (GSPT)",
    "Salingan",
  ],
};
