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
          title: "Dua Kaedah, Satu Jawapan: Pembahagian Berulang dan Pokok Faktor",
          content: "Nyatakan 60 sebagai hasil darab faktor perdananya — kedua-dua kaedah memberi jawapan yang sama.",
          factorVisual: {
            number: 60,
            ladder: [2, 2, 3, 5],
            tree: {
              value: 60,
              children: [
                { value: 4, children: [{ value: 2, isPrime: true }, { value: 2, isPrime: true }] },
                { value: 15, children: [{ value: 3, isPrime: true }, { value: 5, isPrime: true }] },
              ],
            },
          },
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
        {
          title: "Tiga Kaedah Mencari FSTB",
          content: "Menyenaraikan, pembahagian berulang, atau pemfaktoran perdana — jawapan yang sama setiap kali.",
          methodCards: [
            {
              methodName: "Menyenaraikan Faktor Sepunya",
              steps: [
                "Faktor 18: 1, 2, 3, 6, 9, 18",
                "Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24",
                "Faktor sepunya: 1, 2, 3, 6",
              ],
              result: "FSTB bagi 18 dan 24 ialah 6",
            },
            {
              methodName: "Pembahagian Berulang",
              steps: [
                "Bahagikan 36, 60, 72 dengan faktor sepunya secara berulang",
                "2 | 36, 60, 72 → 18, 30, 36",
                "2 | 18, 30, 36 → 9, 15, 18",
                "3 | 9, 15, 18 → 3, 5, 6",
                "Darabkan semua pembahagi: 2 × 2 × 3",
              ],
              result: "FSTB bagi 36, 60 dan 72 ialah 12",
            },
            {
              methodName: "Pemfaktoran Perdana",
              steps: [
                "48 = 2 × 2 × 2 × 2 × 3",
                "64 = 2 × 2 × 2 × 2 × 2 × 2",
                "80 = 2 × 2 × 2 × 2 × 5",
                "Darabkan semua faktor perdana sepunya: 2 × 2 × 2 × 2",
              ],
              result: "FSTB bagi 48, 64 dan 80 ialah 16",
            },
          ],
        },
        {
          title: "Penyelesaian Masalah: Pek Amal (FSTB)",
          problemSolvingFlow: {
            scenario:
              "Pengakap sebuah sekolah menderma 252 baju, 180 pasang seluar dan 108 pasang stoking kepada rumah anak yatim. Semua barangan dibahagikan sama rata dalam setiap pek. Berapakah bilangan maksimum pek yang disediakan?",
            understanding: [
              "252 baju, 180 pasang seluar, 108 pasang stoking dibahagikan sama rata dalam setiap pek",
              "Cari bilangan maksimum pek yang disediakan",
            ],
            devisingPlan: ["Cari FSTB bagi 252, 180 dan 108"],
            implementing: [
              "252 = 2 × 2 × 3 × 3 × 7",
              "180 = 2 × 2 × 3 × 3 × 5",
              "108 = 2 × 2 × 3 × 3 × 3",
              "FSTB bagi 252, 180 dan 108 = 2 × 2 × 3 × 3 = 36",
              "Bilangan maksimum pek yang disediakan ialah 36",
            ],
            reflection:
              "Semakan: 252 ÷ 36 = 7, 180 ÷ 36 = 5, 108 ÷ 36 = 3 — semua terbahagi tepat, mengesahkan 36 pek adalah betul",
          },
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
        {
          title: "Tiga Kaedah Mencari GSTK",
          content: "Menyenaraikan, pembahagian berulang, atau pemfaktoran perdana — jawapan yang sama setiap kali.",
          methodCards: [
            {
              methodName: "Menyenaraikan Gandaan Sepunya",
              steps: [
                "Gandaan 2: 2, 4, 6, 8, 10…",
                "Gandaan 3: 3, 6, 9, 12…",
                "Pilih gandaan sepunya terkecil",
              ],
              result: "GSTK bagi 2 dan 3 ialah 6",
            },
            {
              methodName: "Pembahagian Berulang",
              steps: [
                "Bahagikan nombor secara berulang dengan pembahagi yang boleh membahagi sekurang-kurangnya satu nombor secara tepat",
                "Nombor yang tidak boleh dibahagi dibawa turun tanpa diubah",
                "Teruskan sehingga semua hasil bahagi menjadi 1",
                "Darabkan semua pembahagi: 3 × 2 × 3",
              ],
              result: "GSTK bagi 3, 6 dan 9 ialah 18",
            },
            {
              methodName: "Pemfaktoran Perdana",
              steps: ["3 = 3", "8 = 2 × 2 × 2", "12 = 2 × 2 × 3", "Darabkan kuasa tertinggi setiap faktor perdana yang hadir: 2 × 2 × 2 × 3"],
              result: "GSTK bagi 3, 8 dan 12 ialah 24",
            },
          ],
        },
        {
          title: "Penyelesaian Masalah: Kotak Kopi & Teh (GSTK)",
          problemSolvingFlow: {
            scenario:
              "Kopi tin dijual 6 tin sekotak dan teh tin dijual 9 tin sekotak. Ainun ingin membeli bilangan yang sama bagi kopi tin dan teh tin untuk parti hari jadi kakaknya. Berapakah bilangan minimum kotak setiap jenis minuman tin yang perlu dibeli?",
            understanding: [
              "Bilangan tin kopi = 6 tin sekotak",
              "Bilangan tin teh = 9 tin sekotak",
              "Cari bilangan minimum kotak setiap jenis yang diperlukan",
            ],
            devisingPlan: [
              "Cari GSTK bagi 6 dan 9 untuk menentukan bilangan tin yang sama",
              "Guna pembahagian untuk cari bilangan kotak kopi dan teh",
            ],
            implementing: [
              "Gandaan 6: 6, 12, 18, 24, 30…",
              "Gandaan 9: 9, 18, 27, 36, 45…",
              "GSTK bagi 6 dan 9 = 18",
              "Bilangan kotak kopi tin = 18 ÷ 6 = 3",
              "Bilangan kotak teh tin = 18 ÷ 9 = 2",
            ],
            reflection:
              "Bilangan kopi tin = 3 × 6 = 18; bilangan teh tin = 2 × 9 = 18 — kedua-duanya sama, mengesahkan jawapan",
          },
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
