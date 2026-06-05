import type { StructuredNotes } from "./types";

export const mathF1C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 1 Nombor Nisbah membantu murid memahami integer, pecahan positif dan negatif, perpuluhan positif dan negatif, serta nombor yang boleh ditulis dalam bentuk p/q.",
  quickRevision: [
    "Integer terdiri daripada nombor bulat positif, nombor bulat negatif dan sifar.",
    "Nombor di sebelah kanan sifar lebih besar, manakala nombor di sebelah kiri sifar lebih kecil.",
    "Untuk pecahan, samakan penyebut sebelum membandingkan nilai.",
    "Nombor nisbah boleh ditulis dalam bentuk p/q, dengan p dan q ialah integer dan q tidak sama dengan 0.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Memahami integer.",
            "Melakukan operasi asas aritmetik yang melibatkan integer.",
            "Memahami pecahan positif dan negatif.",
            "Memahami perpuluhan positif dan negatif.",
            "Mengenal pasti nombor nisbah.",
          ],
        },
      ],
    },
    {
      title: "1.1 Integer",
      subsections: [
        {
          title: "Definisi",
          content:
            "Integer ialah kumpulan nombor yang terdiri daripada nombor bulat positif dan nombor bulat negatif termasuk sifar.",
        },
        {
          title: "Kad Maklumat Integer",
          table: {
            headers: ["Jenis", "Maksud", "Contoh"],
            rows: [
              ["Integer Positif", "Nombor bulat yang lebih besar daripada sifar", "1, 2, 3, 100"],
              ["Integer Negatif", "Nombor bulat yang lebih kecil daripada sifar", "-1, -10, -239"],
              ["Bukan Integer", "Nombor yang bukan nombor bulat", "1/2, 0.88, -3.4"],
            ],
          },
        },
        {
          title: "Garis Nombor",
          content:
            "Garis nombor membantu murid melihat kedudukan integer dengan jelas. Semakin ke kanan, nilai nombor semakin besar. Semakin ke kiri, nilai nombor semakin kecil.",
          bulletPoints: [
            "Nombor di sebelah kanan sifar ialah integer positif.",
            "Nilainya semakin besar apabila bergerak ke kanan.",
            "Nombor di sebelah kiri sifar ialah integer negatif.",
            "Nilainya semakin kecil apabila bergerak ke kiri.",
          ],
        },
        {
          title: "Visual Garis Nombor",
          formula:
            "-5  -4  -3  -2  -1   0   1   2   3   4   5\n<-- semakin kecil        semakin besar -->",
        },
        {
          title: "Membanding dan Menyusun Integer",
          table: {
            headers: ["Tertib", "Maksud", "Contoh"],
            rows: [
              [
                "Tertib Menaik",
                "Susunan daripada nilai terkecil kepada nilai terbesar",
                "-5, -2, 0, 3, 8",
              ],
              [
                "Tertib Menurun",
                "Susunan daripada nilai terbesar kepada nilai terkecil",
                "8, 3, 0, -2, -5",
              ],
            ],
          },
        },
      ],
    },
    {
      title: "1.2 Operasi Asas Aritmetik yang Melibatkan Integer",
      subsections: [
        {
          title: "Penambahan dan Penolakan",
          content:
            "Gunakan garis nombor untuk menentukan arah pergerakan semasa menambah atau menolak integer.",
          table: {
            headers: ["Operasi", "Pergerakan pada garis nombor"],
            rows: [
              ["Tambah integer positif", "Bergerak ke kanan"],
              ["Tambah integer negatif", "Bergerak ke kiri"],
              ["Tolak integer positif", "Bergerak ke kiri"],
              ["Tolak integer negatif", "Bergerak ke kanan"],
            ],
          },
        },
        {
          title: "Pendaraban dan Pembahagian",
          table: {
            headers: ["Operasi", "Hasil"],
            rows: [
              ["(+) x (+)", "Positif"],
              ["(-) x (-)", "Positif"],
              ["(+) x (-)", "Negatif"],
              ["(-) x (+)", "Negatif"],
            ],
          },
        },
        {
          title: "Tertib Operasi",
          content: "Selesaikan pengiraan mengikut urutan yang betul supaya jawapan tidak tersalah.",
          bulletPoints: ["1. Kurungan ( )", "2. Darab / Bahagi", "3. Tambah / Tolak"],
        },
        {
          title: "Hukum Kalis Tukar Tertib",
          formula: "a + b = b + a\na x b = b x a",
        },
        {
          title: "Hukum Kalis Sekutuan",
          formula: "(a + b) + c = a + (b + c)\n(a x b) x c = a x (b x c)",
        },
        {
          title: "Hukum Kalis Agihan",
          formula: "a x (b + c) = (a x b) + (a x c)",
        },
        {
          title: "Hukum Identiti",
          formula: "a + 0 = a\na x 1 = a\na + (-a) = 0",
        },
      ],
    },
    {
      title: "1.3 Pecahan Positif dan Pecahan Negatif",
      subsections: [
        {
          title: "Konsep",
          bulletPoints: [
            "Pecahan positif berada di sebelah kanan sifar.",
            "Pecahan negatif berada di sebelah kiri sifar.",
          ],
        },
        {
          title: "Membanding Pecahan",
          content:
            "Penyebut mesti disamakan terlebih dahulu sebelum membuat perbandingan. Selepas penyebut sama, bandingkan pengangka.",
        },
        {
          title: "Operasi Pecahan",
          content: "Apabila membahagi pecahan, tukar bahagi kepada darab menggunakan salingan.",
          formula: "1/2 ÷ 1/4\n= 1/2 x 4/1",
        },
      ],
    },
    {
      title: "1.4 Perpuluhan Positif dan Perpuluhan Negatif",
      subsections: [
        {
          title: "Konsep",
          bulletPoints: [
            "Perpuluhan positif lebih besar daripada sifar.",
            "Perpuluhan negatif lebih kecil daripada sifar.",
          ],
        },
        {
          title: "Situasi Harian",
          table: {
            headers: ["Situasi", "Tanda", "Maksud"],
            rows: [
              ["Untung", "Positif (+)", "Nilai bertambah"],
              ["Rugi", "Negatif (-)", "Nilai berkurang"],
            ],
          },
        },
        {
          title: "Tertib Operasi Perpuluhan",
          bulletPoints: ["1. Darab / Bahagi dahulu", "2. Tambah / Tolak kemudian"],
        },
      ],
    },
    {
      title: "1.5 Nombor Nisbah",
      subsections: [
        {
          title: "Definisi",
          content: "Nombor nisbah ialah nombor yang boleh ditulis dalam bentuk p/q.",
          formula: "p/q\ndi mana p dan q ialah integer, dan q != 0",
        },
        {
          title: "Contoh Nombor Nisbah",
          table: {
            headers: ["Jenis", "Contoh", "Bentuk p/q"],
            rows: [
              ["Integer", "-9", "-9/1"],
              ["Pecahan", "3/4", "3/4"],
              ["Perpuluhan", "3.5", "7/2"],
            ],
          },
        },
        {
          title: "Tip Matematik",
          content:
            "Jika pengiraan pecahan terlalu sukar, tukarkan pecahan kepada perpuluhan menggunakan kalkulator untuk membantu membuat perbandingan atau pengiraan.",
        },
      ],
    },
    {
      title: "Ringkasan Bab",
      subsections: [
        {
          title: "Jadual Ringkasan",
          table: {
            headers: ["Jenis Nombor", "Contoh Positif", "Contoh Negatif"],
            rows: [
              ["Integer", "1, 2, 3", "-1, -2, -3"],
              ["Pecahan", "1/2, 7/4", "-1/3, -4 1/2"],
              ["Perpuluhan", "0.5, 4.3", "-0.1, -7.65"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Integer ialah nombor bulat positif, nombor bulat negatif dan sifar.",
    "Pada garis nombor, nilai semakin besar ke kanan dan semakin kecil ke kiri.",
    "Samakan penyebut sebelum membandingkan pecahan.",
    "Pembahagian pecahan boleh ditukar kepada pendaraban dengan salingan.",
    "Nombor nisbah boleh ditulis sebagai p/q dengan q tidak sama dengan 0.",
  ],
  keyTerms: [
    "Integer",
    "Integer positif",
    "Integer negatif",
    "Pecahan",
    "Perpuluhan",
    "Nombor nisbah",
    "Garis nombor",
    "Tertib operasi",
  ],
};
