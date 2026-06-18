import type { StructuredNotes } from "@/data/types";

export const mathF1C3NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 3 menerangkan kuasa dua, punca kuasa dua, kuasa tiga dan punca kuasa tiga serta cara menggunakannya dalam anggaran, operasi bergabung dan penyelesaian masalah.",
  quickRevision: [
    "Kuasa dua bermaksud mendarab nombor dengan dirinya sendiri: a² = a x a.",
    "Punca kuasa dua ialah operasi songsang kepada kuasa dua: jika 6² = 36, maka √36 = 6.",
    "Kuasa tiga bermaksud mendarab nombor dengan dirinya sendiri sebanyak tiga kali: a³ = a x a x a.",
    "Punca kuasa tiga ialah operasi songsang kepada kuasa tiga: jika 2³ = 8, maka ∛8 = 2.",
    "Kuasa tiga nombor negatif sentiasa negatif, contohnya (-5)³ = -125.",
    "Dalam operasi bergabung, selesaikan kurungan dahulu, kemudian kuasa dan punca.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Memahami kuasa dua dan kuasa dua sempurna.",
            "Menentukan punca kuasa dua bagi nombor, pecahan dan bentuk mudah.",
            "Memahami kuasa tiga dan kuasa tiga sempurna.",
            "Menentukan punca kuasa tiga termasuk punca kuasa tiga nombor negatif.",
            "Membuat anggaran dan menyelesaikan operasi bergabung.",
            "Menyelesaikan masalah berkaitan luas segi empat sama dan isi padu kubus.",
          ],
        },
      ],
    },
    {
      title: "1. Kuasa Dua dan Kuasa Dua Sempurna",
      subsections: [
        {
          title: "Maksud Kuasa Dua",
          content: "Kuasa dua suatu nombor bermaksud nombor itu didarab dengan dirinya sendiri.",
          formula: "a² = a x a\nContoh: 4² = 4 x 4 = 16",
        },
        {
          title: "Maksud Geometri",
          content:
            "Kuasa dua juga berkait dengan luas segi empat sama. Jika sisi segi empat sama ialah s, maka luasnya ialah s².",
          formula: "Luas segi empat sama = s²",
        },
        {
          title: "Kuasa Dua Sempurna",
          content:
            "Kuasa dua sempurna ialah nombor yang terbentuk apabila nombor bulat didarab dengan dirinya sendiri.",
          table: {
            headers: ["Nombor", "Kuasa Dua", "Nilai"],
            rows: [
              ["1", "1²", "1"],
              ["2", "2²", "4"],
              ["3", "3²", "9"],
              ["4", "4²", "16"],
              ["5", "5²", "25"],
              ["6", "6²", "36"],
            ],
          },
        },
        {
          title: "Kaedah Pemfaktoran Perdana",
          content:
            "Gunakan pemfaktoran perdana untuk mengenal pasti kuasa dua sempurna. Jika faktor perdana boleh dikumpulkan kepada dua kumpulan yang sama, nombor itu ialah kuasa dua sempurna.",
        },
      ],
    },
    {
      title: "2. Punca Kuasa Dua",
      subsections: [
        {
          title: "Maksud Punca Kuasa Dua",
          content:
            "Punca kuasa dua ialah operasi songsang kepada kuasa dua. Jika suatu nombor dikuasakan dua untuk mendapat jawapan tertentu, punca kuasa dua mencari nombor asal itu semula.",
          formula: "Jika 6² = 36, maka √36 = 6.",
        },
        {
          title: "Hubungan Dengan Segi Empat Sama",
          content:
            "Punca kuasa dua bagi luas segi empat sama memberikan panjang sisi segi empat sama tersebut.",
          formula: "Jika luas = 49 cm², maka sisi = √49 = 7 cm.",
        },
        {
          title: "Punca Kuasa Dua Pecahan",
          content:
            "Untuk pecahan, cari punca kuasa dua pengangka dan penyebut jika kedua-duanya kuasa dua sempurna.",
          formula: "√(49/81) = 7/9",
        },
        {
          title: "Nombor Bercampur",
          content:
            "Tukarkan nombor bercampur kepada pecahan tak wajar dahulu sebelum mencari punca kuasa dua.",
        },
        {
          title: "Peraturan Penting",
          formula: "√a x √a = a\n√a x √b = √ab",
        },
        {
          title: "Tip",
          content: "Hafal kuasa dua daripada 1² hingga 20² untuk membantu pengiraan pantas.",
        },
      ],
    },
    {
      title: "3. Kuasa Tiga dan Kuasa Tiga Sempurna",
      subsections: [
        {
          title: "Maksud Kuasa Tiga",
          content:
            "Kuasa tiga suatu nombor bermaksud nombor itu didarab dengan dirinya sendiri sebanyak tiga kali.",
          formula: "a³ = a x a x a\nContoh: 2³ = 2 x 2 x 2 = 8",
        },
        {
          title: "Kesilapan Biasa",
          content: "2³ bukan bermaksud 2 x 3. 2³ bermaksud 2 x 2 x 2.",
        },
        {
          title: "Maksud Geometri",
          content:
            "Kuasa tiga berkait dengan isi padu kubus. Jika panjang rusuk kubus ialah s, isi padunya ialah s³.",
          formula: "Isi padu kubus = s³",
        },
        {
          title: "Kuasa Tiga Sempurna",
          content:
            "Kuasa tiga sempurna ialah nombor yang terbentuk apabila nombor bulat didarab dengan dirinya sendiri sebanyak tiga kali.",
          table: {
            headers: ["Nombor", "Kuasa Tiga", "Nilai"],
            rows: [
              ["1", "1³", "1"],
              ["2", "2³", "8"],
              ["3", "3³", "27"],
              ["4", "4³", "64"],
              ["5", "5³", "125"],
              ["10", "10³", "1000"],
            ],
          },
        },
        {
          title: "Tanda Kuasa Tiga",
          bulletPoints: [
            "Kuasa tiga nombor positif ialah positif.",
            "Kuasa tiga nombor negatif sentiasa negatif.",
            "Contoh: (-5)³ = -125.",
          ],
        },
        {
          title: "Kaedah Pemfaktoran Perdana",
          content:
            "Jika faktor perdana boleh dikumpulkan kepada tiga kumpulan yang sama, nombor itu ialah kuasa tiga sempurna.",
        },
      ],
    },
    {
      title: "4. Punca Kuasa Tiga",
      subsections: [
        {
          title: "Maksud Punca Kuasa Tiga",
          content:
            "Punca kuasa tiga ialah operasi songsang kepada kuasa tiga. Jika suatu nombor dikuasakan tiga untuk mendapat jawapan tertentu, punca kuasa tiga mencari nombor asal itu semula.",
          formula: "Jika 2³ = 8, maka ∛8 = 2.",
        },
        {
          title: "Punca Kuasa Tiga Nombor Negatif",
          content: "Punca kuasa tiga bagi nombor negatif ialah negatif.",
          formula: "∛(-8) = -2",
        },
        {
          title: "Hubungan Dengan Kubus",
          content: "Punca kuasa tiga bagi isi padu kubus memberikan panjang rusuk kubus tersebut.",
          formula: "Jika isi padu = 64 cm³, maka rusuk = ∛64 = 4 cm.",
        },
      ],
    },
    {
      title: "5. Anggaran dan Operasi Bergabung",
      subsections: [
        {
          title: "Anggaran Punca Kuasa Dua",
          content:
            "Anggarkan punca kuasa dua dengan mencari kuasa dua sempurna sebelum dan selepas nombor tersebut.",
          formula: "√54 berada antara √49 dan √64.\nJadi √54 berada antara 7 dan 8.",
        },
        {
          title: "Anggaran Kuasa Tiga",
          content: "Anggarkan kuasa tiga menggunakan nombor bulat yang hampir.",
          formula: "4.2³ berada antara 4³ dan 5³.",
        },
        {
          title: "Tertib Operasi",
          bulletPoints: [
            "Selesaikan kurungan dahulu.",
            "Kemudian selesaikan kuasa dua, punca kuasa dua, kuasa tiga dan punca kuasa tiga.",
            "Seterusnya darab dan bahagi dari kiri ke kanan.",
            "Akhir sekali tambah dan tolak dari kiri ke kanan.",
          ],
        },
      ],
    },
    {
      title: "6. Penyelesaian Masalah",
      subsections: [
        {
          title: "Masalah Luas Segi Empat Sama",
          content:
            "Gunakan punca kuasa dua untuk mencari panjang sisi segi empat sama apabila luas diberi.",
          formula: "Jika luas = 81 cm², sisi = √81 = 9 cm.",
        },
        {
          title: "Masalah Isi Padu Kubus",
          content:
            "Gunakan punca kuasa tiga untuk mencari panjang rusuk kubus apabila isi padu diberi.",
          formula: "Jika isi padu = 125 cm³, rusuk = ∛125 = 5 cm.",
        },
        {
          title: "Tip Penyelesaian",
          bulletPoints: [
            "Kenal pasti sama ada soalan melibatkan luas atau isi padu.",
            "Luas segi empat sama menggunakan punca kuasa dua.",
            "Isi padu kubus menggunakan punca kuasa tiga.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "a² = a x a.",
    "a³ = a x a x a.",
    "√36 = 6 kerana 6² = 36.",
    "∛8 = 2 kerana 2³ = 8.",
    "∛(-8) = -2.",
    "√54 berada antara 7 dan 8.",
  ],
  keyTerms: [
    "Kuasa Dua",
    "Punca Kuasa Dua",
    "Kuasa Dua Sempurna",
    "Kuasa Tiga",
    "Punca Kuasa Tiga",
    "Kuasa Tiga Sempurna",
    "Anggaran",
    "Operasi Bergabung",
  ],
};
