import type { StructuredNotes } from "@/data/types";

export const mathF1C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 1 Nombor Nisbah membantu murid memahami integer, pecahan positif dan negatif, perpuluhan positif dan negatif, serta nombor yang boleh ditulis dalam bentuk a/b.",
  quickRevision: [
    "Integer terdiri daripada nombor bulat positif, nombor bulat negatif dan sifar.",
    "Nombor di sebelah kanan sifar lebih besar, manakala nombor di sebelah kiri sifar lebih kecil.",
    "Untuk pecahan, samakan penyebut sebelum membandingkan nilai.",
    "Nombor nisbah boleh ditulis dalam bentuk a/b, dengan a dan b ialah integer dan b tidak sama dengan 0.",
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
          numberLine: { min: -5, max: 5, highlight: [0] },
        },
        {
          title: "Contoh Garis Nombor",
          numberLine: {
            examples: [
              { value: "−3", meaning: "3 kurang daripada 0" },
              { value: "3", meaning: "3 lebih daripada 0" },
              { value: "−1", meaning: "1 kurang daripada 0" },
              { value: "1", meaning: "1 lebih daripada 0" },
            ],
          },
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
          title: "Contoh Diselesaikan: 8 + (+3)",
          workedExample: {
            problem: "8 + (+3)",
            steps: ["Bergerak 3 unit ke kanan daripada 8"],
            answer: "11",
          },
        },
        {
          title: "Contoh Diselesaikan: 5 + (−2)",
          workedExample: {
            problem: "5 + (−2)",
            steps: ["Bergerak 2 unit ke kiri daripada 5"],
            answer: "3",
          },
        },
        {
          title: "Contoh Diselesaikan: 2 − (+4)",
          workedExample: {
            problem: "2 − (+4)",
            steps: ["Bergerak 4 unit ke kiri daripada 2"],
            answer: "−2",
          },
        },
        {
          title: "Contoh Diselesaikan: −1 − (−4)",
          workedExample: {
            problem: "−1 − (−4)",
            steps: ["Bersamaan dengan −1 + 4", "Bergerak 4 unit ke kanan daripada −1"],
            answer: "3",
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
          workedExample: {
            problem: "Bahagikan: 1/2 ÷ 1/4",
            steps: [
              "Kekalkan pecahan pertama",
              "Tukar ÷ kepada ×, dan songsangkan pecahan kedua",
              "1/2 ÷ 1/4 = 1/2 × 4/1",
            ],
            answer: "1/2 ÷ 1/4 = 2",
          },
        },
        {
          title: "Penyelesaian Masalah",
          problemSolving: {
            scenario:
              "Satu kuiz matematik mengandungi 20 soalan. Markah 2 diberikan bagi setiap jawapan betul dan −½ markah bagi setiap jawapan salah. Mei Ling menjawab semua soalan dan markah bagi jawapan salahnya ialah −4. Berapakah jumlah markah Mei Ling?",
            understanding: [
              "Jawapan betul mendapat markah 2",
              "Jawapan salah mendapat markah −½",
              "Markah bagi jawapan salah = −4",
              "Cari jumlah markah",
            ],
            devisingPlan: [
              "+2 mewakili markah bagi jawapan betul",
              "−½ mewakili markah bagi jawapan salah",
              "Cari bilangan jawapan salah menggunakan pembahagian",
              "Cari jumlah markah menggunakan pendaraban dan penambahan",
            ],
            implementing: [
              "Bilangan jawapan salah = −4 ÷ (−½) = 8",
              "Jumlah markah = (20 − 8) × 2 + (−4) = 12 × 2 − 4 = 20",
            ],
            reflection:
              "Semakan: 20 soalan, 8 salah (markah −4), 12 betul (markah 24) → 24 − 4 = 20 ✓",
          },
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
        {
          title: "Penyelesaian Masalah",
          problemSolving: {
            scenario:
              "Harga saham sebuah syarikat ialah RM2.05. Harga naik RM0.32, kemudian jatuh RM0.28 setiap jam untuk tiga jam berikutnya. Hitung harga akhir saham tersebut.",
            understanding: [
              "Harga permulaan = RM2.05",
              "Harga naik RM0.32",
              "Harga jatuh RM0.28 setiap jam untuk 3 jam",
              "Cari harga akhir",
            ],
            devisingPlan: [
              "Kenaikan harga ditulis sebagai +0.32",
              "Penurunan harga ditulis sebagai −0.28",
              "Gunakan pendaraban dan penambahan",
            ],
            implementing: [
              "Harga akhir = 2.05 + 0.32 + 3 × (−0.28)",
              "= 2.37 + (−0.84)",
              "= 2.37 − 0.84 = 1.53",
            ],
            reflection:
              "RM2.05 + RM0.32 − 3 × RM0.28 = RM2.37 − RM0.84 = RM1.53 — harga akhir saham ialah RM1.53",
          },
        },
      ],
    },
    {
      title: "1.5 Nombor Nisbah",
      subsections: [
        {
          title: "Definisi",
          content: "Nombor nisbah ialah nombor yang boleh ditulis dalam bentuk a/b.",
          formula: "a/b\ndi mana a dan b ialah integer, dan b != 0",
        },
        {
          title: "Contoh Nombor Nisbah",
          table: {
            headers: ["Jenis", "Contoh", "Bentuk a/b"],
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
    "Nombor nisbah boleh ditulis sebagai a/b dengan b tidak sama dengan 0.",
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
