import type { StructuredNotes } from "@/data/types";

export const mathF1C10NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 10 memperkenalkan konsep perimeter dan luas bagi pelbagai bentuk rata. Murid akan mempelajari cara mengira perimeter dan luas segi tiga, segi empat selari, trapezium dan lelayang, menganggar ukuran menggunakan grid, serta menyelesaikan masalah melibatkan bentuk komposit dan aplikasi dunia sebenar.",
  quickRevision: [
    "Perimeter = jumlah semua sisi luar sesuatu bentuk.",
    "Luas segi tiga = ½ × tapak × tinggi.",
    "Luas segi empat selari = tapak × tinggi.",
    "Luas trapezium = ½ × (a + b) × tinggi.",
    "Luas lelayang = ½ × pepenjuru1 × pepenjuru2.",
    "Tinggi mestilah berserenjang (tegak lurus) dengan tapak.",
    "Perimeter tetap → luas maksimum apabila bentuk adalah segi empat sama.",
    "Luas tetap → perimeter minimum apabila bentuk adalah segi empat sama.",
    "Bentuk komposit = gabungan dua atau lebih bentuk mudah.",
    "1 m² = 10 000 cm².",
  ],
  keyExamFacts: [
    "Tinggi segi tiga MESTI berserenjang dengan tapak, bukan sisi condong.",
    "Trapezium: gunakan DUA sisi selari (a dan b), bukan semua sisi.",
    "Lelayang: gunakan DUA pepenjuru, bukan sisi.",
    "Bentuk komposit: bahagikan kepada bentuk mudah, kira masing-masing, kemudian tambah/tolak.",
    "Segi empat sama memberikan perimeter terkecil untuk luas tertentu.",
    "Segi empat sama memberikan luas terbesar untuk perimeter tertentu.",
    "Anggaran luas: kotak penuh = 1, separuh kotak ke atas = 1, kurang separuh = 0.",
  ],
  keyTerms: [
    "Perimeter",
    "Luas",
    "Tapak",
    "Tinggi",
    "Sisi selari",
    "Pepenjuru",
    "Bentuk komposit",
    "Grid",
    "cm²",
    "m²",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan konsep perimeter dan mengira perimeter pelbagai bentuk.",
            "Menganggar perimeter sesuatu bentuk.",
            "Mengaplikasikan perimeter dalam situasi kehidupan sebenar.",
            "Menerangkan konsep luas dan mengira luas segi tiga.",
            "Mengira luas segi empat selari, trapezium dan lelayang.",
            "Menganggar luas menggunakan kaedah grid.",
            "Menggunakan unit luas yang sesuai (cm², m²).",
            "Menerangkan hubungan antara perimeter dan luas.",
            "Menyelesaikan masalah melibatkan bentuk komposit.",
            "Mengaitkan perimeter dan luas dengan aplikasi dunia sebenar.",
          ],
        },
      ],
    },
    {
      title: "1. Perimeter",
      subsections: [
        {
          title: "Definisi Perimeter",
          content:
            "Perimeter ialah jumlah panjang kesemua sisi luar sesuatu bentuk rata. Perimeter mengukur panjang sempadan yang mengelilingi sesuatu bentuk. Bayangkan semut berjalan mengikuti tepi sebuah bentuk — jarak yang ditempuhnya ialah perimeter.",
        },
        {
          title: "Unit Perimeter",
          content:
            "Perimeter diukur dalam unit panjang seperti sentimeter (cm), meter (m), atau milimeter (mm). Pastikan semua sisi menggunakan unit yang sama sebelum menjumlahkan.",
        },
        {
          title: "Cara Mengira Perimeter",
          content:
            "Untuk mengira perimeter, TAMBAHKAN panjang semua sisi luar bentuk tersebut.",
          formula: "Perimeter = Jumlah semua sisi luar",
        },
        {
          title: "Perimeter Segi Empat Tepat",
          content:
            "Segi empat tepat mempunyai 2 pasang sisi yang sama panjang. Panjang = p, Lebar = l.",
          formula: "Perimeter = 2(p + l) = 2p + 2l",
        },
        {
          title: "Perimeter Segi Empat Sama",
          content:
            "Segi empat sama mempunyai 4 sisi yang sama panjang. Panjang sisi = s.",
          formula: "Perimeter = 4s",
        },
        {
          title: "Perimeter Segi Tiga",
          content:
            "Segi tiga mempunyai tiga sisi. Tambahkan ketiga-tiga sisi untuk mendapat perimeter.",
          formula: "Perimeter = a + b + c",
        },
        {
          title: "Panduan Visual: Surih Sempadan",
          content:
            "Bayangkan anda meletakkan tali di sepanjang tepi bentuk, kemudian meluruskan tali tersebut — panjang tali itu ialah perimeter. Ini membantu murid memahami bahawa perimeter adalah ukuran sempadan, bukan kawasan.",
        },
      ],
    },
    {
      title: "2. Mengira Perimeter",
      subsections: [
        {
          title: "Contoh 1: Segi Empat Tepat",
          content:
            "Sebuah segi empat tepat mempunyai panjang 8 cm dan lebar 5 cm. Kira perimeter.",
          formula:
            "Perimeter = 2(p + l) = 2(8 + 5) = 2(13) = 26 cm",
        },
        {
          title: "Contoh 2: Segi Tiga",
          content:
            "Sebuah segi tiga mempunyai sisi 6 cm, 8 cm dan 10 cm. Kira perimeter.",
          formula: "Perimeter = 6 + 8 + 10 = 24 cm",
        },
        {
          title: "Contoh 3: Bentuk Sekata Enam Sisi",
          content:
            "Sebuah heksagon sekata (6 sisi) mempunyai setiap sisi 4 cm. Kira perimeter.",
          formula: "Perimeter = 6 × 4 = 24 cm",
        },
        {
          title: "Contoh 4: Bentuk Tidak Sekata",
          content:
            "Sebuah bentuk L mempunyai sisi 3 cm, 5 cm, 2 cm, 3 cm, 5 cm dan 2 cm. Kira perimeter.",
          formula: "Perimeter = 3 + 5 + 2 + 3 + 5 + 2 = 20 cm",
        },
        {
          title: "Perimeter Bentuk Komposit",
          content:
            "Untuk bentuk komposit (gabungan bentuk), hanya kira sisi LUAR sahaja. Jangan masukkan sisi dalaman yang tersembunyi di dalam bentuk. Kenal pasti setiap sisi luar dengan teliti.",
        },
        {
          title: "Kesilapan Lazim: Perimeter",
          content:
            "KESILAPAN: Menambahkan sisi dalaman bentuk komposit. BETUL: Hanya tambahkan sisi yang membentuk sempadan luar. Contoh: Jika dua segi empat tepat bergabung, sisi yang berkongsi (di tengah) tidak dikira.",
        },
      ],
    },
    {
      title: "3. Anggaran Perimeter",
      subsections: [
        {
          title: "Mengapa Menganggar?",
          content:
            "Anggaran berguna apabila pengukuran tepat tidak diperlukan atau sukar dilakukan. Anggaran membolehkan kita memperoleh nilai yang hampir tepat dengan cepat.",
        },
        {
          title: "Kaedah Anggaran Perimeter",
          content:
            "Langkah anggaran perimeter menggunakan grid: 1) Letakkan bentuk di atas kertas grid. 2) Hitung bilangan petak grid yang dilalui sempadan. 3) Darab bilangan petak dengan panjang satu petak grid.",
        },
        {
          title: "Contoh: Anggaran dengan Grid 1 cm",
          content:
            "Bentuk tidak sekata diletakkan di atas grid 1 cm × 1 cm. Sempadan bentuk melalui kira-kira 18 petak grid. Anggaran perimeter ≈ 18 cm.",
        },
        {
          title: "Anggaran Perimeter Bulatan (Asas)",
          content:
            "Untuk bentuk yang melengkung, kita boleh menganggar perimeter dengan membungkus tali mengikuti sempadan, kemudian mengukur panjang tali tersebut.",
        },
      ],
    },
    {
      title: "4. Aplikasi Perimeter",
      subsections: [
        {
          title: "Pagar Taman Sekolah",
          content:
            "Taman sekolah berbentuk segi empat tepat 20 m × 15 m. Jumlah pagar yang diperlukan = perimeter = 2(20 + 15) = 2(35) = 70 m.",
        },
        {
          title: "Gelanggang Sukan",
          content:
            "Gelanggang badminton berbentuk segi empat tepat. Pemain berlari mengikuti sempadan gelanggang semasa memanaskan badan — ini adalah perimeter gelanggang.",
        },
        {
          title: "Sempadan Tanah",
          content:
            "Tuan tanah ingin memasang pagar di sekeliling ladangnya. Mengira perimeter membantu menentukan jumlah pagar yang perlu dibeli.",
        },
        {
          title: "Bingkai Gambar",
          content:
            "Membuat bingkai gambar: panjang bahan bingkai = perimeter gambar. Gambar 30 cm × 20 cm: bingkai = 2(30 + 20) = 100 cm.",
        },
        {
          title: "Jadual Aplikasi Perimeter",
          table: {
            headers: ["Situasi", "Keperluan", "Formula"],
            rows: [
              ["Pagar taman", "Panjang pagar", "Perimeter"],
              ["Bingkai gambar", "Panjang bahan", "Perimeter"],
              ["Laluan larian", "Jarak berlari", "Perimeter"],
              ["Sempadan tanah", "Panjang pagar", "Perimeter"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Luas",
      subsections: [
        {
          title: "Definisi Luas",
          content:
            "Luas ialah jumlah ruang di dalam sempadan sesuatu bentuk rata (2D). Luas mengukur kawasan yang diliputi oleh bentuk tersebut.",
        },
        {
          title: "Unit Luas",
          content:
            "Luas diukur dalam unit persegi seperti sentimeter persegi (cm²) atau meter persegi (m²). 'Persegi' menunjukkan bahawa kita mengukur kawasan dua dimensi.",
          formula: "1 m² = 100 cm × 100 cm = 10 000 cm²",
        },
        {
          title: "Perbezaan: Perimeter vs Luas",
          content:
            "PERIMETER: panjang sempadan (1 dimensi — diukur dalam cm, m). LUAS: kawasan dalam (2 dimensi — diukur dalam cm², m²). Dua bentuk boleh mempunyai perimeter yang sama tetapi luas berbeza, dan sebaliknya.",
          table: {
            headers: ["Ciri", "Perimeter", "Luas"],
            rows: [
              ["Maksud", "Sempadan luar", "Kawasan dalaman"],
              ["Dimensi", "1D (panjang)", "2D (kawasan)"],
              ["Unit", "cm, m", "cm², m²"],
              ["Kaedah", "Tambah semua sisi", "Formula khas"],
            ],
          },
        },
        {
          title: "Visualisasi Luas: Kaedah Petak",
          content:
            "Bayangkan lantai bilik ditutup dengan jubin segi empat sama 1 cm × 1 cm. Bilangan jubin yang diperlukan = luas bilik dalam cm².",
        },
      ],
    },
    {
      title: "6. Luas Segi Tiga",
      subsections: [
        {
          title: "Formula Luas Segi Tiga",
          content:
            "Luas segi tiga = separuh daripada luas segi empat selari yang sama tapak dan tinggi. Tapak (b) adalah mana-mana sisi segi tiga. Tinggi (h) MESTI berserenjang dengan tapak.",
          formula: "Luas = ½ × tapak × tinggi = ½bh",
        },
        {
          title: "Mengapa ½ × tapak × tinggi?",
          content:
            "Setiap segi tiga adalah SEPARUH daripada segi empat selari dengan tapak dan tinggi yang sama. Jika kita salin segi tiga dan putarkan, ia melengkapkan segi empat selari. Luas segi empat selari = tapak × tinggi, jadi luas segi tiga = ½ × tapak × tinggi.",
        },
        {
          title: "Penting: Tinggi Berserenjang",
          content:
            "Tinggi segi tiga MESTI berserenjang (tegak lurus/90°) kepada tapak. Untuk segi tiga bersudut cakah, tinggi mungkin jatuh DI LUAR tapak (iaitu, apabila diunjurkan). Jangan gunakan panjang sisi condong sebagai tinggi.",
        },
        {
          title: "Contoh 1: Segi Tiga Bersudut Tegak",
          content:
            "Segi tiga dengan tapak 10 cm dan tinggi 6 cm.",
          formula: "Luas = ½ × 10 × 6 = ½ × 60 = 30 cm²",
        },
        {
          title: "Contoh 2: Segi Tiga Bersudut Cakah",
          content:
            "Segi tiga dengan tapak 8 cm dan tinggi 5 cm (tinggi berserenjang dengan tapak).",
          formula: "Luas = ½ × 8 × 5 = ½ × 40 = 20 cm²",
        },
        {
          title: "Contoh 3: Mencari Tapak apabila Luas Diketahui",
          content:
            "Luas segi tiga = 24 cm² dan tinggi = 6 cm. Cari tapak.",
          formula:
            "24 = ½ × tapak × 6\n24 = 3 × tapak\nTapak = 24 ÷ 3 = 8 cm",
        },
      ],
    },
    {
      title: "7. Luas Segi Empat Selari",
      subsections: [
        {
          title: "Definisi Segi Empat Selari",
          content:
            "Segi empat selari ialah sisi empat dengan 2 pasang sisi yang selari dan sama panjang. Termasuk: segi empat tepat, segi empat sama, jajaran genjang dan belah ketupat.",
        },
        {
          title: "Formula Luas Segi Empat Selari",
          content:
            "Luas = tapak × tinggi. Tapak (b) = panjang mana-mana sisi. Tinggi (h) = jarak BERSERENJANG antara dua sisi selari. BUKAN sisi condong!",
          formula: "Luas = tapak × tinggi = b × h",
        },
        {
          title: "Mengapa tapak × tinggi?",
          content:
            "Segi empat selari boleh dipotong dan disusun semula menjadi segi empat tepat dengan tapak dan tinggi yang sama. Luas segi empat tepat = p × l = tapak × tinggi.",
        },
        {
          title: "Contoh 1: Jajaran Genjang",
          content:
            "Jajaran genjang dengan tapak 12 cm dan tinggi 7 cm (bukan sisi condong 9 cm).",
          formula: "Luas = 12 × 7 = 84 cm²",
        },
        {
          title: "Contoh 2: Segi Empat Tepat",
          content:
            "Segi empat tepat 15 cm × 9 cm. Tinggi = lebar = 9 cm.",
          formula: "Luas = 15 × 9 = 135 cm²",
        },
        {
          title: "Contoh 3: Mencari Tinggi",
          content:
            "Luas jajaran genjang = 60 cm² dan tapak = 10 cm. Cari tinggi.",
          formula: "60 = 10 × tinggi\nTinggi = 60 ÷ 10 = 6 cm",
        },
        {
          title: "Kesilapan Lazim: Segi Empat Selari",
          content:
            "KESILAPAN: Menggunakan sisi condong sebagai tinggi. BETUL: Tinggi MESTI berserenjang dengan tapak. Dalam jajaran genjang yang condong, tinggi berserenjang adalah lebih pendek daripada sisi condong.",
        },
      ],
    },
    {
      title: "8. Luas Trapezium",
      subsections: [
        {
          title: "Definisi Trapezium",
          content:
            "Trapezium ialah sisi empat dengan tepat satu pasang sisi yang selari. Dua sisi selari dipanggil 'a' dan 'b' (sisi selari). Jarak berserenjang antara kedua sisi selari ialah tinggi (h).",
        },
        {
          title: "Formula Luas Trapezium",
          content:
            "Luas trapezium = separuh daripada hasil tambah sisi selari didarab dengan tinggi.",
          formula: "Luas = ½ × (a + b) × tinggi",
        },
        {
          title: "Pemahaman Formula Trapezium",
          content:
            "Salin trapezium, putarkan 180°, dan gabungkan dengan yang asal → hasilnya ialah segi empat selari dengan tapak (a + b) dan tinggi yang sama. Luas segi empat selari itu = (a + b) × h. Jadi luas SATU trapezium = ½(a + b)h.",
        },
        {
          title: "Contoh 1",
          content:
            "Trapezium dengan sisi selari 8 cm dan 12 cm, tinggi 5 cm.",
          formula:
            "Luas = ½ × (8 + 12) × 5 = ½ × 20 × 5 = ½ × 100 = 50 cm²",
        },
        {
          title: "Contoh 2",
          content:
            "Trapezium dengan sisi selari 6 cm dan 10 cm, tinggi 4 cm.",
          formula:
            "Luas = ½ × (6 + 10) × 4 = ½ × 16 × 4 = ½ × 64 = 32 cm²",
        },
        {
          title: "Contoh 3: Mencari Tinggi",
          content:
            "Luas trapezium = 45 cm². Sisi selari = 7 cm dan 11 cm. Cari tinggi.",
          formula:
            "45 = ½ × (7 + 11) × tinggi\n45 = ½ × 18 × tinggi\n45 = 9 × tinggi\nTinggi = 45 ÷ 9 = 5 cm",
        },
      ],
    },
    {
      title: "9. Luas Lelayang",
      subsections: [
        {
          title: "Definisi Lelayang",
          content:
            "Lelayang ialah sisi empat dengan 2 pasang sisi bersebelahan yang sama panjang. Pepenjuru lelayang adalah berserenjang (90°). Satu pepenjuru membahagi dua pepenjuru yang lain.",
        },
        {
          title: "Formula Luas Lelayang",
          content:
            "Luas lelayang = separuh daripada hasil darab dua pepenjuru.",
          formula: "Luas = ½ × d₁ × d₂",
        },
        {
          title: "Pemahaman Formula Lelayang",
          content:
            "Lelayang boleh dimasukkan dalam segi empat tepat yang mempunyai panjang d₁ dan lebar d₂. Luas segi empat tepat = d₁ × d₂. Lelayang menempati SEPARUH daripada segi empat tepat itu, jadi luas lelayang = ½d₁d₂.",
        },
        {
          title: "Contoh 1",
          content:
            "Lelayang dengan pepenjuru 10 cm dan 6 cm.",
          formula: "Luas = ½ × 10 × 6 = ½ × 60 = 30 cm²",
        },
        {
          title: "Contoh 2",
          content:
            "Lelayang dengan pepenjuru 14 cm dan 8 cm.",
          formula: "Luas = ½ × 14 × 8 = ½ × 112 = 56 cm²",
        },
        {
          title: "Contoh 3: Mencari Pepenjuru",
          content:
            "Luas lelayang = 40 cm² dan satu pepenjuru = 10 cm. Cari pepenjuru yang lain.",
          formula:
            "40 = ½ × 10 × d₂\n40 = 5 × d₂\nd₂ = 40 ÷ 5 = 8 cm",
        },
        {
          title: "Nota: Formula Belah Ketupat",
          content:
            "Formula luas lelayang (½d₁d₂) juga digunakan untuk BELAH KETUPAT, kerana pepenjuru belah ketupat juga berserenjang dan saling membahagi dua.",
        },
      ],
    },
    {
      title: "10. Anggaran Luas",
      subsections: [
        {
          title: "Kaedah Grid",
          content:
            "Kaedah grid digunakan untuk menganggar luas bentuk tidak sekata. Langkah-langkah: 1) Lukiskan bentuk di atas kertas grid. 2) Kira petak yang penuh di dalam bentuk. 3) Kira petak separuh (lebih separuh dikira sebagai 1, kurang separuh dikira sebagai 0). 4) Jumlahkan semua.",
        },
        {
          title: "Peraturan Anggaran Grid",
          table: {
            headers: ["Keadaan Petak", "Kiraan"],
            rows: [
              ["Petak penuh di dalam bentuk", "Dikira sebagai 1"],
              ["Petak lebih separuh di dalam bentuk", "Dikira sebagai 1"],
              ["Petak kurang separuh di dalam bentuk", "Dikira sebagai 0"],
              ["Petak di luar bentuk", "Tidak dikira"],
            ],
          },
        },
        {
          title: "Contoh: Anggaran Luas Leaf",
          content:
            "Daun diletakkan di atas grid 1 cm × 1 cm. Petak penuh = 18, petak separuh = 8 (→ dikira sebagai 4). Anggaran luas ≈ 18 + 4 = 22 cm².",
        },
        {
          title: "Ketepatan Anggaran",
          content:
            "Anggaran lebih tepat apabila petak grid lebih kecil. Grid 0.5 cm × 0.5 cm memberikan anggaran lebih tepat berbanding grid 1 cm × 1 cm.",
        },
      ],
    },
    {
      title: "11. Unit Luas",
      subsections: [
        {
          title: "Unit Luas Biasa",
          content:
            "Unit luas bergantung pada saiz objek yang diukur. Gunakan unit yang sesuai untuk konteks.",
          table: {
            headers: ["Unit", "Simbol", "Digunakan Untuk"],
            rows: [
              ["Sentimeter persegi", "cm²", "Objek kecil (buku, meja)"],
              ["Meter persegi", "m²", "Bilik, bangunan"],
              ["Kilometer persegi", "km²", "Bandar, negeri"],
              ["Hektar", "ha", "Ladang, kawasan besar"],
            ],
          },
        },
        {
          title: "Penukaran Unit Luas",
          content:
            "Penukaran unit luas berbeza dengan penukaran unit panjang. Ini kerana luas adalah 2 dimensi.",
          formula:
            "1 m = 100 cm\n1 m² = 100 cm × 100 cm = 10 000 cm²\n1 km² = 1000 m × 1000 m = 1 000 000 m²",
        },
        {
          title: "Contoh Penukaran",
          content:
            "Tukarkan 3.5 m² kepada cm².",
          formula: "3.5 m² = 3.5 × 10 000 = 35 000 cm²",
        },
        {
          title: "Contoh Penukaran 2",
          content:
            "Tukarkan 45 000 cm² kepada m².",
          formula: "45 000 cm² ÷ 10 000 = 4.5 m²",
        },
        {
          title: "Visualisasi: 1 m²",
          content:
            "1 m² ialah kawasan segi empat sama yang mempunyai sisi 1 m. Ia mengandungi 10 000 petak kecil bersaiz 1 cm × 1 cm. Ini sangat membantu untuk memahami mengapa 1 m² = 10 000 cm².",
        },
      ],
    },
    {
      title: "12. Hubungan Antara Perimeter dan Luas",
      subsections: [
        {
          title: "Perimeter dan Luas: Tidak Saling Berkaitan Langsung",
          content:
            "Perimeter dan luas TIDAK saling menentukan antara satu sama lain secara langsung. Bentuk dengan perimeter yang sama boleh mempunyai luas yang berbeza, dan sebaliknya.",
          table: {
            headers: ["Bentuk", "Dimensi", "Perimeter", "Luas"],
            rows: [
              ["Segi empat tepat A", "8 × 2 cm", "20 cm", "16 cm²"],
              ["Segi empat tepat B", "6 × 4 cm", "20 cm", "24 cm²"],
              ["Segi empat sama C", "5 × 5 cm", "20 cm", "25 cm²"],
            ],
          },
        },
        {
          title: "Rumusan Hubungan",
          content:
            "Apabila PERIMETER TETAP: luas BERTAMBAH apabila bentuk menghampiri segi empat sama. Luas terbesar dicapai apabila bentuk adalah segi empat sama. Apabila LUAS TETAP: perimeter BERKURANG apabila bentuk menghampiri segi empat sama. Perimeter terkecil dicapai apabila bentuk adalah segi empat sama.",
        },
      ],
    },
    {
      title: "13. Segi Empat Tepat Dengan Luas Tetap",
      subsections: [
        {
          title: "Konsep: Luas Tetap",
          content:
            "Jika luas segi empat tepat adalah TETAP (tidak berubah), perimeter AKAN BERUBAH apabila dimensinya berubah.",
        },
        {
          title: "Contoh: Luas Tetap = 36 cm²",
          content:
            "Senarai semua segi empat tepat dengan luas 36 cm² dan kira perimeternya:",
          table: {
            headers: ["Panjang (cm)", "Lebar (cm)", "Luas (cm²)", "Perimeter (cm)"],
            rows: [
              ["36", "1", "36", "74"],
              ["18", "2", "36", "40"],
              ["12", "3", "36", "30"],
              ["9", "4", "36", "26"],
              ["6", "6", "36", "24 (terkecil)"],
            ],
          },
        },
        {
          title: "Kesimpulan",
          content:
            "Apabila luas tetap = 36 cm², perimeter terkecil (24 cm) diperoleh apabila bentuk adalah SEGI EMPAT SAMA (6 × 6). Apabila dimensi menjadi semakin berbeza (panjang >> lebar), perimeter semakin besar.",
        },
      ],
    },
    {
      title: "14. Segi Empat Tepat Dengan Perimeter Tetap",
      subsections: [
        {
          title: "Konsep: Perimeter Tetap",
          content:
            "Jika perimeter segi empat tepat adalah TETAP (tidak berubah), luas AKAN BERUBAH apabila dimensinya berubah.",
        },
        {
          title: "Contoh: Perimeter Tetap = 24 cm",
          content:
            "Senarai semua segi empat tepat dengan perimeter 24 cm dan kira luasnya:",
          table: {
            headers: ["Panjang (cm)", "Lebar (cm)", "Perimeter (cm)", "Luas (cm²)"],
            rows: [
              ["11", "1", "24", "11"],
              ["10", "2", "24", "20"],
              ["9", "3", "24", "27"],
              ["8", "4", "24", "32"],
              ["6", "6", "24", "36 (terbesar)"],
            ],
          },
        },
        {
          title: "Kesimpulan",
          content:
            "Apabila perimeter tetap = 24 cm, luas terbesar (36 cm²) diperoleh apabila bentuk adalah SEGI EMPAT SAMA (6 × 6). Apabila dimensi menjadi semakin berbeza (panjang >> lebar), luas semakin kecil.",
        },
        {
          title: "Aplikasi Praktikal",
          content:
            "Ini penting dalam reka bentuk: Jika anda mempunyai jumlah pagar yang tetap (perimeter tetap) dan ingin merangkung kawasan terbesar, gunakan bentuk segi empat sama. Taman permainan, kolam renang, dan ladang direka bentuk berdasarkan prinsip ini.",
        },
      ],
    },
    {
      title: "15. Bentuk Komposit",
      subsections: [
        {
          title: "Definisi Bentuk Komposit",
          content:
            "Bentuk komposit ialah bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah (segi tiga, segi empat tepat, trapezium, dll.). Untuk mengira luas atau perimeter bentuk komposit, kita perlu membahagikan bentuk tersebut kepada bahagian mudah.",
        },
        {
          title: "Strategi Bentuk Komposit",
          content:
            "Terdapat dua strategi utama: 1) TAMBAH: Bahagikan kepada bentuk mudah, kira luas masing-masing, kemudian tambahkan. 2) TOLAK: Mulakan dengan bentuk besar, tolak luas bahagian yang tidak diperlukan.",
        },
        {
          title: "Contoh 1: Bentuk L (Strategi Tambah)",
          content:
            "Bentuk L boleh dibahagikan kepada 2 segi empat tepat. Segi empat tepat A: 6 × 4 = 24 cm². Segi empat tepat B: 3 × 2 = 6 cm². Jumlah luas = 24 + 6 = 30 cm².",
          formula: "Luas L = Luas A + Luas B = 24 + 6 = 30 cm²",
        },
        {
          title: "Contoh 2: Segi Tiga + Segi Empat Tepat",
          content:
            "Rumah mainan: badan = segi empat tepat 8 × 5 cm, bumbung = segi tiga, tapak 8 cm, tinggi 3 cm. Luas badan = 40 cm². Luas bumbung = ½ × 8 × 3 = 12 cm². Jumlah = 52 cm².",
          formula: "Luas = 40 + 12 = 52 cm²",
        },
        {
          title: "Contoh 3: Strategi Tolak",
          content:
            "Segi empat tepat besar 10 × 8 = 80 cm² dengan lubang segi empat 3 × 2 = 6 cm² ditebuk. Luas baki = 80 − 6 = 74 cm².",
          formula: "Luas = 80 − 6 = 74 cm²",
        },
        {
          title: "Perimeter Bentuk Komposit",
          content:
            "Untuk perimeter bentuk komposit: kenal pasti semua sisi LUAR. Kira panjang sisi yang tidak diberikan menggunakan maklumat yang ada. Tambahkan semua sisi luar.",
        },
      ],
    },
    {
      title: "16. Penyelesaian Masalah",
      subsections: [
        {
          title: "Langkah-Langkah Penyelesaian Masalah",
          content:
            "Ikuti langkah-langkah ini untuk menyelesaikan masalah perimeter dan luas dengan sistematik:",
          bulletPoints: [
            "Langkah 1: Baca soalan dengan teliti. Kenal pasti apa yang ditanya (perimeter atau luas?).",
            "Langkah 2: Lukis gambar rajah dan labelkan semua dimensi yang diketahui.",
            "Langkah 3: Kenal pasti bentuk (segi tiga, segi empat selari, trapezium, lelayang, komposit).",
            "Langkah 4: Pilih formula yang betul.",
            "Langkah 5: Gantikan nilai dan kira.",
            "Langkah 6: Tulis jawapan dengan unit yang betul.",
          ],
        },
        {
          title: "Contoh: Masalah Lantai",
          content:
            "Sebuah bilik berbentuk L mempunyai dimensi: bahagian besar 8 m × 6 m, bahagian kecil 3 m × 4 m. Jubin berharga RM 15 per m². Berapakah kos jubin?",
          formula:
            "Luas = (8 × 6) + (3 × 4) = 48 + 12 = 60 m²\nKos = 60 × RM 15 = RM 900",
        },
        {
          title: "Contoh: Masalah Tanaman",
          content:
            "Sebidang tanah berbentuk trapezium dengan sisi selari 30 m dan 20 m, tinggi 15 m. Baja diperlukan 2 kg per m². Berapakah jumlah baja?",
          formula:
            "Luas = ½ × (30 + 20) × 15 = ½ × 50 × 15 = 375 m²\nBaja = 375 × 2 = 750 kg",
        },
        {
          title: "Contoh: Masalah Cat",
          content:
            "Dinding berbentuk segi tiga dengan tapak 6 m dan tinggi 4 m. Cat diperlukan 0.5 L per m². Satu tin mengandungi 3 L. Berapa tin?",
          formula:
            "Luas = ½ × 6 × 4 = 12 m²\nCat = 12 × 0.5 = 6 L\nTin = 6 ÷ 3 = 2 tin",
        },
      ],
    },
    {
      title: "17. Aplikasi Dunia Sebenar",
      subsections: [
        {
          title: "Berkebun dan Pertanian",
          content:
            "Petani menggunakan luas untuk mengira benih, baja dan air yang diperlukan. Pagar dipasang berdasarkan perimeter ladang. Kebun berbentuk trapezium dengan sisi selari 50 m dan 30 m, tinggi 20 m: Luas = ½(50 + 30)(20) = 800 m².",
        },
        {
          title: "Seni Bina dan Pembinaan",
          content:
            "Arkitek mengira luas lantai untuk perancangan ruang. Kontraktor menggunakan perimeter untuk mengira bahan binaan (bata, kayu, jubin). Luas membantu mengira kos cat, karpet dan jubin.",
        },
        {
          title: "Perancangan Lantai",
          content:
            "Jubin lantai 30 cm × 30 cm (= 0.09 m²) dipasang di bilik 5 m × 4 m (= 20 m²). Bilangan jubin = 20 ÷ 0.09 ≈ 223 jubin. Beli lebih 10% untuk lebihan: ≈ 246 jubin.",
        },
        {
          title: "Reka Bentuk Bangunan",
          content:
            "Panel suria dipasang di bumbung berbentuk segi empat sama 10 m × 10 m. Luas bumbung = 100 m². Setiap panel bersaiz 2 m × 1 m = 2 m². Bilangan panel = 100 ÷ 2 = 50 panel.",
        },
        {
          title: "Jarak Tanaman",
          content:
            "Pokok buah-buahan ditanam dengan jarak 3 m antara satu sama lain di ladang 30 m × 18 m. Baris pokok: 30 ÷ 3 = 10 baris. Pokok per baris: 18 ÷ 3 = 6 pokok. Jumlah pokok: 10 × 6 = 60 pokok.",
        },
        {
          title: "Pengukuran Tanah",
          content:
            "Jurukur tanah menggunakan formula luas untuk mengira nilai tanah. Tanah berbentuk lelayang dengan pepenjuru 80 m dan 60 m: Luas = ½ × 80 × 60 = 2 400 m². Nilai tanah pada RM 200 per m² = RM 480 000.",
        },
        {
          title: "Jadual Aplikasi Luas",
          table: {
            headers: ["Bidang", "Kegunaan Luas", "Kegunaan Perimeter"],
            rows: [
              ["Pertanian", "Benih, baja, air", "Pagar ladang"],
              ["Pembinaan", "Jubin, karpet, cat", "Dinding, bata, kayu"],
              ["Reka bentuk", "Susun atur ruang", "Bingkai, papan tanda"],
              ["Ukur Tanah", "Nilai tanah", "Sempadan tanah"],
            ],
          },
        },
      ],
    },
    {
      title: "18. Ringkasan Bab",
      subsections: [
        {
          title: "Rumusan Formula",
          table: {
            headers: ["Bentuk", "Formula Luas", "Formula Perimeter"],
            rows: [
              ["Segi empat tepat", "p × l", "2(p + l)"],
              ["Segi empat sama", "s²", "4s"],
              ["Segi tiga", "½ × tapak × tinggi", "a + b + c"],
              ["Segi empat selari", "tapak × tinggi", "2(a + b)"],
              ["Trapezium", "½(a + b) × tinggi", "Tambah semua sisi"],
              ["Lelayang", "½ × d₁ × d₂", "Tambah semua sisi"],
            ],
          },
        },
        {
          title: "Poin Penting",
          bulletPoints: [
            "Perimeter diukur dalam unit panjang (cm, m). Luas diukur dalam unit persegi (cm², m²).",
            "Tinggi MESTI berserenjang dengan tapak untuk formula segi tiga dan segi empat selari.",
            "Untuk trapezium, gunakan jumlah dua sisi SELARI (bukan semua sisi).",
            "Untuk lelayang, gunakan dua PEPENJURU (bukan sisi).",
            "1 m² = 10 000 cm².",
            "Segi empat sama memberi perimeter terkecil untuk luas tetap.",
            "Segi empat sama memberi luas terbesar untuk perimeter tetap.",
            "Bentuk komposit: bahagi kepada bentuk mudah, kira, kemudian tambah atau tolak.",
          ],
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa labelkan unit dalam jawapan.",
            "Lukis gambar rajah untuk soalan bentuk komposit.",
            "Semak: Adakah anda gunakan tinggi atau sisi condong?",
            "Untuk soalan 'berapa banyak bahan diperlukan', kira luas terlebih dahulu.",
            "Untuk soalan 'berapa panjang pagar', kira perimeter.",
          ],
        },
      ],
    },
  ],
};
