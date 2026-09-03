import type { StructuredNotes } from "@/data/types";

export const mathF1C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab ini menerangkan integer, pecahan, perpuluhan dan nombor nisbah serta cara membanding, menyusun dan menjalankan operasi asas dengan nombor-nombor tersebut.",
  quickRevision: [
    "Integer ialah nombor bulat positif, nombor bulat negatif dan sifar.",
    "Pada garis nombor, nilai bertambah ke kanan dan berkurang ke kiri.",
    "Tanda yang sama memberikan hasil positif bagi darab atau bahagi; tanda yang berbeza memberikan hasil negatif.",
    "Dalam operasi bergabung, selesaikan kurungan, kemudian darab atau bahagi, diikuti tambah atau tolak.",
    "Nombor nisbah boleh ditulis sebagai p/q, dengan p dan q ialah integer dan q ≠ 0.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid boleh:",
          bulletPoints: [
            "Mengenal, membanding dan menyusun integer, pecahan serta perpuluhan positif dan negatif.",
            "Melakukan operasi asas dan operasi bergabung mengikut tertib operasi.",
            "Menggunakan hukum kalis tukar tertib, kalis sekutuan, kalis agihan dan identiti.",
            "Mengenal nombor nisbah dan menulisnya dalam bentuk p/q.",
            "Menyelesaikan masalah harian yang melibatkan nombor nisbah.",
          ],
        },
      ],
    },
    {
      title: "1.1 Integer",
      subsections: [
        {
          title: "Nombor Positif dan Negatif dalam Kehidupan Harian",
          table: {
            headers: ["Situasi", "Positif", "Negatif"],
            rows: [
              ["Suhu", "30°C di atas sifar = +30°C", "10°C di bawah sifar = −10°C"],
              ["Aras laut", "150 m di atas aras laut = +150 m", "50 m di bawah aras laut = −50 m"],
              ["Kewangan", "Untung RM2,000 = +RM2,000", "Rugi RM500 = −RM500"],
            ],
          },
        },
        {
          title: "Definisi Integer",
          content:
            "Integer ialah nombor bulat positif, nombor bulat negatif dan sifar. Pecahan dan perpuluhan bukan integer.",
          formula: "…, −3, −2, −1, 0, 1, 2, 3, …",
        },
        {
          title: "Garis Nombor",
          content:
            "Sifar berada di tengah. Integer positif berada di sebelah kanan, manakala integer negatif berada di sebelah kiri. Semakin ke kanan, semakin besar nilainya.",
          numberLine: { min: -5, max: 5, highlight: [0] },
        },
        {
          title: "Membanding dan Menyusun Integer",
          table: {
            headers: ["Tertib", "Cara membaca", "Contoh"],
            rows: [
              ["Menaik", "Terkecil kepada terbesar", "−5, −3, 0, 2, 4"],
              ["Menurun", "Terbesar kepada terkecil", "5, 3, 2, −2, −4, −5"],
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
          table: {
            headers: ["Dua tanda berturutan", "Ringkasan"],
            rows: [
              ["+(+a)", "+a"],
              ["+(−a)", "−a"],
              ["−(+a)", "−a"],
              ["−(−a)", "+a"],
            ],
          },
        },
        {
          title: "Contoh Penambahan dan Penolakan",
          formula: "5 + (+3) = 8\n5 + (−3) = 2\n5 − (+3) = 2\n5 − (−3) = 8\n−2 − (−4) = 2",
        },
        {
          title: "Pendaraban dan Pembahagian",
          table: {
            headers: ["Tanda", "Hasil"],
            rows: [
              ["(+) × (+) atau (+) ÷ (+)", "Positif"],
              ["(−) × (−) atau (−) ÷ (−)", "Positif"],
              ["(+) × (−) atau (+) ÷ (−)", "Negatif"],
              ["(−) × (+) atau (−) ÷ (+)", "Negatif"],
            ],
          },
        },
        {
          title: "Tertib Operasi",
          content: "Lakukan operasi pada aras yang sama dari kiri ke kanan.",
          bulletPoints: ["1. Kurungan", "2. Darab atau bahagi", "3. Tambah atau tolak"],
          workedExample: {
            problem: "Nilaikan 4 − 12 ÷ (−2) + (−1).",
            steps: ["Bahagi dahulu: 12 ÷ (−2) = −6", "4 − (−6) − 1 = 4 + 6 − 1"],
            answer: "9",
          },
        },
        {
          title: "Hukum Operasi Aritmetik",
          table: {
            headers: ["Hukum", "Kenyataan"],
            rows: [
              ["Kalis tukar tertib", "a + b = b + a; a × b = b × a"],
              ["Kalis sekutuan", "(a + b) + c = a + (b + c); (a × b) × c = a × (b × c)"],
              ["Kalis agihan", "a × (b + c) = a × b + a × c"],
              ["Identiti", "a + 0 = a; a × 1 = a; a × 0 = 0; a + (−a) = 0"],
            ],
          },
        },
      ],
    },
    {
      title: "1.3 Pecahan Positif dan Pecahan Negatif",
      subsections: [
        {
          title: "Kedudukan pada Garis Nombor",
          content:
            "Pecahan positif berada di sebelah kanan sifar dan pecahan negatif berada di sebelah kiri. Jarak setiap tanda skala mesti sama.",
          numberLine: { min: -1, max: 1, highlight: [0] },
        },
        {
          title: "Membanding Pecahan",
          content:
            "Samakan penyebut menggunakan gandaan sepunya terkecil, kemudian bandingkan pengangka.",
          workedExample: {
            problem: "Susun −3/4, 1/2, −1/2 dan 1/4 mengikut tertib menaik.",
            steps: [
              "Gunakan penyebut sepunya 4: −3/4, 2/4, −2/4, 1/4",
              "Susun daripada nilai terkecil kepada terbesar.",
            ],
            answer: "−3/4, −1/2, 1/4, 1/2",
          },
        },
        {
          title: "Pembahagian Pecahan",
          content: "Tukar bahagi kepada darab dan gunakan salingan pecahan kedua.",
          formula: "1/2 ÷ 1/4 = 1/2 × 4/1 = 2",
        },
      ],
    },
    {
      title: "1.4 Perpuluhan Positif dan Perpuluhan Negatif",
      subsections: [
        {
          title: "Kedudukan dan Perbandingan",
          content:
            "Perpuluhan positif berada di sebelah kanan sifar dan perpuluhan negatif berada di sebelah kiri. Jajarkan titik perpuluhan ketika membandingkan nilai.",
        },
        {
          title: "Operasi Bergabung",
          content:
            "Gunakan tertib operasi. Perpuluhan boleh ditukar kepada pecahan jika langkah pengiraan menjadi lebih mudah.",
          workedExample: {
            problem: "Nilaikan (7.23 + 2.77) ÷ (−0.8).",
            steps: ["7.23 + 2.77 = 10", "10 ÷ (−0.8) = −12.5"],
            answer: "−12.5",
          },
        },
      ],
    },
    {
      title: "1.5 Nombor Nisbah",
      subsections: [
        {
          title: "Definisi",
          content:
            "Nombor nisbah ialah nombor yang boleh ditulis sebagai p/q, dengan p dan q ialah integer dan q tidak sama dengan sifar.",
          formula: "p/q, dengan p, q ∈ integer dan q ≠ 0",
        },
        {
          title: "Menulis dalam Bentuk p/q",
          table: {
            headers: ["Jenis", "Nombor", "Bentuk p/q"],
            rows: [
              ["Integer", "−9", "−9/1"],
              ["Pecahan bercampur", "1 4/5", "9/5"],
              ["Perpuluhan", "3.5", "7/2"],
            ],
          },
        },
        {
          title: "Operasi Bergabung Nombor Nisbah",
          content: "Tukarkan nombor kepada bentuk pecahan atau perpuluhan yang seragam.",
          workedExample: {
            problem: "Nilaikan −0.6 + 3/4 × (−1 1/3).",
            steps: [
              "−0.6 = −3/5 dan −1 1/3 = −4/3",
              "3/4 × (−4/3) = −1",
              "−3/5 + (−1) = −3/5 − 5/5",
            ],
            answer: "−8/5 = −1 3/5",
          },
        },
      ],
    },
    {
      title: "1.6 Penyelesaian Masalah Harian",
      subsections: [
        {
          title: "Contoh Suhu",
          problemSolving: {
            scenario:
              "Suhu sebuah bandar ialah 12°C. Suhu menurun hingga −6°C, kemudian meningkat 3°C dan menurun lagi 8°C. Tentukan perubahan pertama dan suhu akhir.",
            understanding: ["Suhu awal = 12°C", "Suhu selepas penurunan pertama = −6°C"],
            devisingPlan: [
              "Perubahan = suhu baharu − suhu awal",
              "Gunakan integer bagi setiap perubahan",
            ],
            implementing: [
              "Perubahan pertama = −6 − 12 = −18°C",
              "Suhu akhir = −6 + 3 − 8 = −11°C",
            ],
            reflection:
              "−11°C lebih rendah daripada −6°C sebanyak 5°C, selaras dengan naik 3°C kemudian turun 8°C.",
          },
        },
        {
          title: "Contoh Markah Kuiz",
          problemSolving: {
            scenario:
              "Satu kuiz mempunyai 20 soalan. Setiap jawapan betul mendapat 2 markah dan setiap jawapan salah mendapat −1/2 markah. Jumlah markah bagi jawapan salah Mei Ling ialah −4.",
            understanding: ["Markah salah keseluruhan = −4", "Semua 20 soalan dijawab"],
            devisingPlan: [
              "Cari bilangan jawapan salah",
              "Cari bilangan jawapan betul",
              "Hitung jumlah markah",
            ],
            implementing: [
              "Bilangan salah = −4 ÷ (−1/2) = 8",
              "Bilangan betul = 20 − 8 = 12",
              "Jumlah = 12 × 2 − 4 = 20",
            ],
            reflection:
              "12 jawapan betul memberi 24 markah dan 8 jawapan salah menolak 4 markah, jadi jumlahnya 20 markah.",
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Nombor yang lebih ke kanan pada garis nombor sentiasa lebih besar.",
    "Menolak nombor negatif bersamaan dengan menambah nombor positif.",
    "Tanda sama menghasilkan positif dan tanda berbeza menghasilkan negatif bagi darab atau bahagi.",
    "Samakan penyebut sebelum membanding pecahan.",
    "Dalam p/q, penyebut q tidak boleh bernilai sifar.",
  ],
  keyTerms: [
    "Integer",
    "Garis nombor",
    "Tertib menaik",
    "Tertib menurun",
    "Pecahan",
    "Perpuluhan",
    "Nombor nisbah",
    "Tertib operasi",
  ],
};
