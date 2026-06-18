import type { StructuredNotes } from "@/data/types";

export const mathF1C2NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 2 Faktor dan Gandaan membantu murid mengenal faktor, faktor perdana, gandaan, FSTB dan GSTK untuk menyelesaikan masalah nombor bulat.",
  quickRevision: [
    "Faktor ialah nombor yang boleh membahagi sesuatu nombor tepat tanpa baki.",
    "Faktor perdana ialah faktor yang juga merupakan nombor perdana.",
    "FSTB ialah faktor sepunya yang paling besar.",
    "GSTK ialah gandaan sepunya yang paling kecil.",
    "Gunakan FSTB untuk membahagi atau mengumpulkan sesuatu secara sama rata.",
    "Gunakan GSTK untuk mencari masa atau kejadian pertama yang berulang bersama.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menentukan faktor bagi nombor bulat.",
            "Mengenal pasti faktor perdana dan melakukan pemfaktoran perdana.",
            "Menentukan faktor sepunya dan Faktor Sepunya Terbesar (FSTB).",
            "Menentukan gandaan dan gandaan sepunya.",
            "Menentukan Gandaan Sepunya Terkecil (GSTK).",
            "Menyelesaikan masalah harian yang melibatkan FSTB dan GSTK.",
          ],
        },
      ],
    },
    {
      title: "1. Faktor",
      subsections: [
        {
          title: "Definisi",
          content:
            "Faktor bagi suatu nombor ialah nombor yang boleh membahagi nombor tersebut dengan tepat tanpa baki.",
        },
        {
          title: "Contoh Faktor",
          table: {
            headers: ["Nombor", "Faktor"],
            rows: [
              ["12", "1, 2, 3, 4, 6, 12"],
              ["18", "1, 2, 3, 6, 9, 18"],
              ["20", "1, 2, 4, 5, 10, 20"],
            ],
          },
        },
        {
          title: "Tip Mengenal Faktor",
          content: "Jika nombor A boleh membahagi nombor B tanpa baki, maka A ialah faktor bagi B.",
          formula: "12 ÷ 3 = 4\nMaka 3 ialah faktor bagi 12.",
        },
      ],
    },
    {
      title: "2. Faktor Perdana dan Pemfaktoran Perdana",
      subsections: [
        {
          title: "Nombor Perdana",
          content:
            "Nombor perdana ialah nombor yang hanya mempunyai dua faktor, iaitu 1 dan nombor itu sendiri.",
          bulletPoints: [
            "Contoh nombor perdana: 2, 3, 5, 7, 11, 13",
            "Nombor 1 bukan nombor perdana.",
          ],
        },
        {
          title: "Faktor Perdana",
          content:
            "Faktor perdana ialah faktor bagi suatu nombor yang juga merupakan nombor perdana.",
        },
        {
          title: "Pemfaktoran Perdana",
          content:
            "Pemfaktoran perdana ialah proses menulis suatu nombor sebagai hasil darab faktor-faktor perdana.",
          table: {
            headers: ["Nombor", "Pemfaktoran Perdana"],
            rows: [
              ["12", "2 x 2 x 3"],
              ["18", "2 x 3 x 3"],
              ["24", "2 x 2 x 2 x 3"],
            ],
          },
        },
        {
          title: "Kaedah",
          bulletPoints: [
            "Gunakan pembahagian berulang dengan nombor perdana.",
            "Boleh juga menggunakan pokok faktor.",
            "Teruskan sehingga semua faktor ialah nombor perdana.",
          ],
        },
      ],
    },
    {
      title: "3. Faktor Sepunya dan Faktor Sepunya Terbesar (FSTB)",
      subsections: [
        {
          title: "Faktor Sepunya",
          content: "Faktor sepunya ialah faktor yang sama bagi dua atau lebih nombor.",
        },
        {
          title: "FSTB",
          content:
            "Faktor Sepunya Terbesar (FSTB) ialah faktor sepunya yang paling besar bagi dua atau lebih nombor.",
        },
        {
          title: "Contoh FSTB",
          table: {
            headers: ["Nombor", "Faktor"],
            rows: [
              ["12", "1, 2, 3, 4, 6, 12"],
              ["18", "1, 2, 3, 6, 9, 18"],
              ["Faktor sepunya", "1, 2, 3, 6"],
              ["FSTB", "6"],
            ],
          },
        },
        {
          title: "Kaedah Pemfaktoran Perdana",
          content: "Untuk mencari FSTB, ambil faktor perdana sepunya dengan kuasa terkecil.",
          formula: "12 = 2 x 2 x 3\n18 = 2 x 3 x 3\nFSTB = 2 x 3 = 6",
        },
      ],
    },
    {
      title: "4. Gandaan dan Gandaan Sepunya",
      subsections: [
        {
          title: "Gandaan",
          content: "Gandaan ialah hasil darab suatu nombor dengan nombor bulat positif.",
        },
        {
          title: "Contoh Gandaan",
          table: {
            headers: ["Nombor", "Gandaan"],
            rows: [
              ["4", "4, 8, 12, 16, 20, 24"],
              ["6", "6, 12, 18, 24, 30, 36"],
            ],
          },
        },
        {
          title: "Gandaan Sepunya",
          content: "Gandaan sepunya ialah gandaan yang sama bagi dua atau lebih nombor.",
          formula: "Gandaan sepunya bagi 4 dan 6: 12, 24, 36, ...",
        },
      ],
    },
    {
      title: "5. Gandaan Sepunya Terkecil (GSTK)",
      subsections: [
        {
          title: "Definisi GSTK",
          content:
            "Gandaan Sepunya Terkecil (GSTK) ialah gandaan sepunya yang paling kecil bagi dua atau lebih nombor.",
        },
        {
          title: "Contoh GSTK",
          table: {
            headers: ["Nombor", "Gandaan"],
            rows: [
              ["4", "4, 8, 12, 16, 20, 24"],
              ["6", "6, 12, 18, 24, 30, 36"],
              ["Gandaan sepunya", "12, 24, 36"],
              ["GSTK", "12"],
            ],
          },
        },
        {
          title: "Kaedah Pemfaktoran Perdana",
          content: "Untuk mencari GSTK, ambil semua faktor perdana dengan kuasa terbesar.",
          formula: "12 = 2 x 2 x 3\n18 = 2 x 3 x 3\nGSTK = 2 x 2 x 3 x 3 = 36",
        },
      ],
    },
    {
      title: "6. Penyelesaian Masalah FSTB dan GSTK",
      subsections: [
        {
          title: "Bila Menggunakan FSTB?",
          bulletPoints: [
            "Apabila soalan melibatkan pembahagian kepada kumpulan sama banyak.",
            "Apabila mencari saiz kumpulan paling besar.",
            "Contoh: Membahagikan 12 epal dan 18 oren ke dalam beg yang sama banyak.",
          ],
        },
        {
          title: "Bila Menggunakan GSTK?",
          bulletPoints: [
            "Apabila soalan melibatkan kejadian berulang.",
            "Apabila mencari masa pertama dua perkara berlaku bersama.",
            "Contoh: Loceng berbunyi setiap 4 minit dan 6 minit. Kedua-duanya berbunyi bersama setiap 12 minit.",
          ],
        },
      ],
    },
    {
      title: "7. Ringkasan Perbezaan FSTB vs GSTK",
      subsections: [
        {
          title: "Jadual Perbandingan",
          table: {
            headers: ["Aspek", "FSTB", "GSTK"],
            rows: [
              ["Maksud", "Faktor sepunya paling besar", "Gandaan sepunya paling kecil"],
              ["Digunakan untuk", "Membahagi secara sama rata", "Mencari pengulangan bersama"],
              [
                "Kata kunci",
                "Terbesar, maksimum, kumpulan sama",
                "Terkecil, pertama kali bersama, berulang",
              ],
              ["Contoh", "FSTB bagi 12 dan 18 ialah 6", "GSTK bagi 4 dan 6 ialah 12"],
            ],
          },
        },
        {
          title: "Tip Peperiksaan",
          content:
            "Jika soalan meminta pembahagian kepada kumpulan sama, fikirkan FSTB. Jika soalan meminta masa atau gandaan yang berulang bersama, fikirkan GSTK.",
        },
      ],
    },
  ],
  keyExamFacts: [
    "Faktor membahagi nombor tepat tanpa baki.",
    "Nombor perdana hanya mempunyai dua faktor.",
    "FSTB ialah faktor sepunya paling besar.",
    "GSTK ialah gandaan sepunya paling kecil.",
    "FSTB sesuai untuk pembahagian sama rata, GSTK sesuai untuk kejadian berulang bersama.",
  ],
  keyTerms: [
    "Faktor",
    "Gandaan",
    "Nombor perdana",
    "Faktor perdana",
    "Pemfaktoran perdana",
    "Faktor sepunya",
    "FSTB",
    "Gandaan sepunya",
    "GSTK",
  ],
};
