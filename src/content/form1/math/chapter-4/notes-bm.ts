import type { StructuredNotes } from "@/data/types";

export const mathF1C4NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 4 menerangkan nisbah, kadar dan kadaran serta penggunaannya dalam kehidupan harian seperti memasak, kelajuan, peta dan kewangan.",
  quickRevision: [
    "Nisbah membandingkan dua atau lebih kuantiti jenis yang sama dengan unit yang sama: a : b.",
    "Nisbah setara terhasil apabila kedua-dua sebutan didarab atau dibahagi dengan nombor yang sama bukan sifar.",
    "Bentuk termudah diperoleh dengan membahagi semua sebutan dengan FSTB.",
    "Kadar membandingkan dua kuantiti yang berlainan jenis atau berlainan unit, contohnya km/j.",
    "Kadaran ialah persamaan dua nisbah atau dua kadar yang setara: a : b = c : d.",
    "Kaedah pendaraban silang: jika a/b = c/d, maka a × d = b × c.",
    "Peratusan boleh ditulis sebagai nisbah: 20% = 20 : 100 = 1 : 5.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Memahami konsep nisbah dan menulisnya dalam bentuk termudah.",
            "Membentuk nisbah setara dan menggabungkan dua nisbah.",
            "Memahami kadar dan melakukan pertukaran unit.",
            "Memahami kadaran dan menyelesaikan masalah menggunakan tiga kaedah.",
            "Menghubungkan nisbah dengan peratusan.",
            "Menyelesaikan masalah dunia sebenar yang melibatkan nisbah, kadar dan kadaran.",
          ],
        },
      ],
    },
    {
      title: "1. Nisbah",
      subsections: [
        {
          title: "Maksud Nisbah",
          content:
            "Nisbah ialah perbandingan dua atau lebih kuantiti yang sama jenis dan mempunyai unit yang sama. Nisbah ditulis dalam bentuk a : b atau a : b : c.",
          formula: "a : b\nContoh: 3 epal : 5 oren ditulis 3 : 5",
        },
        {
          title: "Syarat Penting",
          content:
            "Kedua-dua kuantiti mesti jenis yang sama dan unit yang sama sebelum nisbah dapat dibentuk.",
          bulletPoints: [
            "Kuantiti sama jenis: jarak dengan jarak, jisim dengan jisim.",
            "Unit sama: tukar 1 m kepada 100 cm sebelum dibandingkan dengan cm.",
          ],
        },
        {
          title: "Nisbah Sebagai Pecahan",
          content:
            "Nisbah a : b boleh ditulis sebagai pecahan a/b yang menunjukkan bahagian pertama berbanding bahagian kedua.",
          formula: "a : b = a/b",
        },
      ],
    },
    {
      title: "2. Nisbah Setara",
      subsections: [
        {
          title: "Maksud Nisbah Setara",
          content:
            "Nisbah setara ialah nisbah yang mempunyai nilai yang sama walaupun ditulis dalam bentuk berbeza. Nisbah setara diperoleh dengan mendarab atau membahagi setiap sebutan dengan nombor yang sama bukan sifar.",
          formula: "2 : 3 = 4 : 6 = 6 : 9 = 8 : 12",
        },
        {
          title: "Contoh",
          bulletPoints: [
            "2 : 3 didarab dengan 2 → 4 : 6",
            "10 : 15 dibahagi dengan 5 → 2 : 3",
            "6 : 9 : 12 dibahagi dengan 3 → 2 : 3 : 4",
          ],
        },
      ],
    },
    {
      title: "3. Bentuk Termudah",
      subsections: [
        {
          title: "Maksud",
          content:
            "Nisbah dalam bentuk termudah ialah apabila tiada nombor bulat selain 1 yang boleh membahagi semua sebutan.",
        },
        {
          title: "Langkah",
          bulletPoints: [
            "Cari FSTB bagi semua sebutan nisbah.",
            "Bahagi setiap sebutan dengan FSTB.",
            "Pastikan unit semua sebutan sama.",
          ],
          formula: "12 : 18 → FSTB = 6 → 2 : 3",
        },
      ],
    },
    {
      title: "4. Menggabungkan Nisbah",
      subsections: [
        {
          title: "Konsep",
          content:
            "Apabila diberi A : B dan B : C, kuantiti B (sebutan sepunya) mesti dijadikan sama dahulu sebelum nisbah digabungkan menjadi A : B : C.",
        },
        {
          title: "Langkah",
          bulletPoints: [
            "Kenal pasti sebutan sepunya.",
            "Cari GSTK bagi nilai sebutan sepunya dalam kedua-dua nisbah.",
            "Darab setiap nisbah supaya sebutan sepunya sama.",
            "Tulis nisbah gabungan A : B : C.",
          ],
          formula: "A : B = 2 : 3 dan B : C = 4 : 5\nB jadi sama: 12\nA : B = 8 : 12, B : C = 12 : 15\nA : B : C = 8 : 12 : 15",
        },
      ],
    },
    {
      title: "5. Kadar",
      subsections: [
        {
          title: "Maksud Kadar",
          content:
            "Kadar ialah perbandingan dua kuantiti yang berlainan jenis atau berlainan unit. Kadar selalunya ditulis menggunakan perkataan 'per' atau '/'.",
        },
        {
          title: "Contoh Kadar",
          table: {
            headers: ["Konteks", "Kadar"],
            rows: [
              ["Kelajuan kereta", "60 km/j"],
              ["Harga buah", "RM 5 per kg"],
              ["Penggunaan bahan api", "12 km per liter"],
              ["Gaji", "RM 15 per jam"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Pertukaran Unit",
      subsections: [
        {
          title: "Konsep",
          content:
            "Apabila menukar unit dalam kadar, gunakan faktor penukaran yang betul dan tukar pengangka atau penyebut mengikut keperluan.",
          formula: "1 m = 100 cm\n1 km = 1000 m\n1 jam = 60 minit\n1 kg = 1000 g",
        },
        {
          title: "Contoh",
          content:
            "Tukarkan RM 12 per meter kepada RM per cm.\nPenyelesaian: RM 12 / 100 cm = RM 0.12 per cm.",
        },
      ],
    },
    {
      title: "7. Kadaran",
      subsections: [
        {
          title: "Maksud Kadaran",
          content:
            "Kadaran ialah persamaan yang menunjukkan dua nisbah atau dua kadar adalah setara.",
          formula: "a : b = c : d\nataupun a/b = c/d",
        },
        {
          title: "Ciri",
          bulletPoints: [
            "Nisbah-nisbah dalam kadaran adalah setara.",
            "Boleh diselesaikan menggunakan kaedah unitari, kadaran atau pendaraban silang.",
          ],
        },
      ],
    },
    {
      title: "8. Kaedah Unitari",
      subsections: [
        {
          title: "Konsep",
          content:
            "Cari nilai bagi satu unit terlebih dahulu, kemudian darab dengan bilangan unit yang dikehendaki.",
        },
        {
          title: "Contoh",
          content:
            "Jika 4 buku berharga RM 20, berapakah harga 7 buku?\nLangkah 1: 1 buku = RM 20 ÷ 4 = RM 5.\nLangkah 2: 7 buku = 7 × RM 5 = RM 35.",
        },
      ],
    },
    {
      title: "9. Kaedah Kadaran",
      subsections: [
        {
          title: "Konsep",
          content:
            "Tulis dua nisbah setara dalam bentuk pecahan dan selesaikan untuk mencari nilai yang tidak diketahui.",
          formula: "a/b = c/d",
        },
        {
          title: "Contoh",
          content:
            "Jika 3 pen berharga RM 9, berapakah harga 5 pen?\nKadaran: 3/9 = 5/x\nDaripada nisbah, harga sepasang sama, jadi x = (5 × 9) / 3 = RM 15.",
        },
      ],
    },
    {
      title: "10. Kaedah Pendaraban Silang",
      subsections: [
        {
          title: "Konsep",
          content:
            "Apabila a/b = c/d, maka a × d = b × c. Kaedah ini sesuai digunakan apabila nilai tidak diketahui terletak dalam pengangka atau penyebut.",
          formula: "a × d = b × c",
        },
        {
          title: "Contoh",
          content:
            "Selesaikan 4/6 = x/9.\nPendaraban silang: 4 × 9 = 6 × x → 36 = 6x → x = 6.",
        },
      ],
    },
    {
      title: "11. Hubungan Dengan Peratusan",
      subsections: [
        {
          title: "Peratusan Sebagai Nisbah",
          content: "Peratusan boleh ditulis sebagai nisbah berbanding 100.",
          formula: "20% = 20 : 100 = 1 : 5\nx/100 = Bahagian/Keseluruhan",
        },
        {
          title: "Contoh",
          bulletPoints: [
            "50% = 50 : 100 = 1 : 2",
            "25% = 25 : 100 = 1 : 4",
            "80% = 80 : 100 = 4 : 5",
          ],
        },
      ],
    },
    {
      title: "12. Aplikasi dan Penyelesaian Masalah",
      subsections: [
        {
          title: "Konteks Harian",
          bulletPoints: [
            "Memasak: menukar saiz resipi mengikut bilangan orang.",
            "Sains: mengira kelajuan dengan jarak per masa.",
            "Geografi: skala peta seperti 1 : 50 000.",
            "Kewangan: harga per unit dan pembelian terbaik.",
          ],
        },
        {
          title: "Anggaran Populasi",
          content:
            "Kaedah tangkap-tanda-lepas-tangkap semula digunakan untuk menganggar saiz populasi haiwan.",
          formula:
            "(Bilangan ditangkap semula yang bertanda) / (Jumlah ditangkap semula) = (Bilangan asal ditanda) / (Anggaran populasi)",
        },
      ],
    },
    {
      title: "13. Ringkasan Perbandingan",
      subsections: [
        {
          table: {
            headers: ["Konsep", "Ciri", "Contoh"],
            rows: [
              ["Nisbah", "Sama jenis, sama unit", "3 : 5"],
              ["Kadar", "Berbeza jenis atau unit", "60 km/j"],
              ["Kadaran", "Dua nisbah/kadar setara", "2 : 3 = 4 : 6"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Nisbah mesti dalam unit yang sama sebelum dipermudahkan.",
    "Bahagi semua sebutan dengan FSTB untuk mencari bentuk termudah.",
    "Untuk menggabungkan A : B dan B : C, samakan nilai B dahulu.",
    "Kadar = kuantiti pertama ÷ kuantiti kedua, contoh: km ÷ jam.",
    "Pendaraban silang: a × d = b × c hanya untuk kadaran a/b = c/d.",
    "20% = 1 : 5; 25% = 1 : 4; 50% = 1 : 2.",
    "Anggaran populasi gunakan kaedah tangkap-tanda-lepas-tangkap semula.",
  ],
  keyTerms: [
    "Nisbah",
    "Nisbah setara",
    "Bentuk termudah",
    "Kadar",
    "Kadaran",
    "Kaedah unitari",
    "Pendaraban silang",
    "Faktor penukaran",
    "Peratusan",
  ],
};
