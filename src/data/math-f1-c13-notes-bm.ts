import type { StructuredNotes } from "./types";

export const mathF1C13NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 13 memperkenalkan Teorem Pythagoras — salah satu teorem paling terkenal dalam matematik. Murid akan mempelajari hubungan antara sisi segi tiga bersudut tegak, cara menggunakan rumus untuk mencari sisi yang tidak diketahui, akas teorem Pythagoras untuk menentukan jenis segi tiga, dan aplikasinya dalam kehidupan seharian. Bab ini merupakan asas penting bagi topik geometri yang lebih lanjut.",
  quickRevision: [
    "Hipotenus: sisi terpanjang segi tiga bersudut tegak, bertentangan dengan sudut 90°.",
    "Teorem Pythagoras: c² = a² + b² (di mana c = hipotenus).",
    "Mencari hipotenus: c = √(a² + b²).",
    "Mencari sisi yang tidak diketahui: a = √(c² − b²) atau b = √(c² − a²).",
    "Akas Pythagoras: jika c² = a² + b², segi tiga adalah bersudut tegak.",
    "Sudut tirus: c² < a² + b² (sudut terbesar < 90°).",
    "Sudut cakah: c² > a² + b² (sudut terbesar > 90°).",
    "Triple Pythagoras biasa: (3,4,5), (5,12,13), (8,15,17), (7,24,25).",
    "Setiap gandaan triple Pythagoras juga sah: (6,8,10), (9,12,15).",
  ],
  keyExamFacts: [
    "Hipotenus SENTIASA bertentangan dengan sudut 90° dan SENTIASA sisi terpanjang.",
    "c² = a² + b² hanya untuk segi tiga BERSUDUT TEGAK.",
    "Untuk mencari sisi lebih pendek: kurangkan, bukan tambah — a² = c² − b².",
    "Periksa jawapan: hipotenus MESTI lebih panjang daripada setiap sisi yang lain.",
    "Triple Pythagoras paling biasa: 3-4-5 dan 5-12-13.",
    "Akas: TIGA perkara perlu disemak — kira c², kira a²+b², kemudian bandingkan.",
    "Segi tiga bersudut cakah: sisi terpanjang² > jumlah kuasa dua dua sisi lain.",
  ],
  keyTerms: [
    "Hipotenus",
    "Segi tiga bersudut tegak",
    "Sudut tegak",
    "Teorem Pythagoras",
    "Akas Teorem Pythagoras",
    "Segi tiga bersudut tirus",
    "Segi tiga bersudut cakah",
    "Triple Pythagoras",
    "Pepenjuru",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan konsep hipotenus dan mengenal pastinya dalam segi tiga bersudut tegak.",
            "Menggunakan Teorem Pythagoras (c² = a² + b²) untuk mencari panjang sisi segi tiga bersudut tegak.",
            "Mencari panjang hipotenus apabila dua sisi lain diketahui.",
            "Mencari panjang sisi yang tidak diketahui apabila hipotenus dan satu sisi diketahui.",
            "Menyelesaikan masalah geometri melibatkan segi tiga bersudut tegak.",
            "Menggunakan akas Teorem Pythagoras untuk menentukan sama ada segi tiga adalah bersudut tegak.",
            "Menentukan sama ada segi tiga adalah bersudut tirus atau bersudut cakah.",
            "Mengaplikasikan Teorem Pythagoras dalam situasi kehidupan seharian.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan Teorem Pythagoras",
      subsections: [
        {
          title: "Siapakah Pythagoras?",
          content:
            "Pythagoras (kira-kira 570–495 SM) ialah seorang ahli matematik Greek yang terkenal. Beliau dan pengikut-pengikutnya mengkaji hubungan antara nombor dan geometri. Walaupun hubungan ini mungkin telah diketahui sebelum zaman Pythagoras (contohnya oleh orang Babylon dan Mesir), teorem ini dinamakan sempena beliau.",
        },
        {
          title: "Apakah Teorem Pythagoras?",
          content:
            "Teorem Pythagoras menyatakan: Dalam mana-mana segi tiga bersudut tegak, luas segi empat sama yang dibina di atas hipotenus adalah sama dengan jumlah luas segi empat sama yang dibina di atas dua sisi yang lain.",
        },
        {
          title: "Pembuktian Visual Teorem Pythagoras",
          content:
            "Bayangkan tiga segi empat sama dibina pada setiap sisi segi tiga bersudut tegak:\n\n     ┌───┐\n     │ c²│\n     └───┘\n      /|\\\n     / | \\\n    /  |  \\\n   /90°|   \\\n  ┌────┴────┐\n  │  a²  b²│\n  └─────────┘\n\nLuas segi empat pada hipotenus (c) = Luas segi empat pada sisi a + Luas segi empat pada sisi b\nc² = a² + b²",
        },
        {
          title: "Kepentingan Teorem Pythagoras",
          content:
            "Teorem Pythagoras adalah salah satu teorem yang paling berguna dalam matematik dan sains. Ia digunakan dalam pembinaan (memastikan dinding tegak lurus), navigasi (mencari jarak terpendek), seni bina, kejuruteraan, dan banyak lagi bidang.",
        },
      ],
    },
    {
      title: "2. Hipotenus",
      subsections: [
        {
          title: "Definisi Hipotenus",
          content:
            "Hipotenus ialah sisi yang paling panjang dalam segi tiga bersudut tegak. Ia sentiasa bertentangan (berhadapan) dengan sudut tegak (90°).",
        },
        {
          title: "Ciri-ciri Hipotenus",
          bulletPoints: [
            "Hipotenus adalah sisi TERPANJANG dalam segi tiga bersudut tegak.",
            "Hipotenus sentiasa bertentangan dengan sudut 90°.",
            "Hipotenus TIDAK pernah menjadi kaki sudut tegak — ia sentiasa sisi yang berhadapan.",
            "Dalam formula c² = a² + b², huruf c mewakili hipotenus.",
          ],
        },
        {
          title: "Mengenal Pasti Hipotenus",
          content:
            "Cara mengenal pasti hipotenus:\n① Cari sudut 90° (simbol □ atau sudut tegak).\n② Sisi yang bertentangan dengan sudut 90° itu adalah hipotenus.\n\nContoh:\n\n        C\n       /|\n      / |\n   c /  | a\n    /   |\n   /90° |\n  A─────B\n      b\n\nDalam segi tiga ABC dengan sudut tegak di B:\n• Sudut tegak: ∠B = 90°\n• Hipotenus: AC (bertentangan dengan ∠B) = sisi c\n• Dua sisi lain (kaki): AB = b dan BC = a",
        },
        {
          title: "Kesilapan Lazim: Salah Mengenal Pasti Hipotenus",
          content:
            "❌ SILAP: 'Hipotenus adalah sisi paling panjang, jadi cari saja sisi terpanjang.' Ini mungkin BENAR dalam kebanyakan kes tetapi kaedah yang lebih tepat adalah mencari sisi yang BERTENTANGAN dengan sudut 90°. Ini penting apabila bekerja dengan koordinat atau gambar rajah yang tidak dilukis berskala.",
        },
      ],
    },
    {
      title: "3. Segi Tiga Bersudut Tegak",
      subsections: [
        {
          title: "Definisi Segi Tiga Bersudut Tegak",
          content:
            "Segi tiga bersudut tegak ialah segi tiga yang mempunyai TEPAT SATU sudut tegak (sudut 90°). Ia juga dikenali sebagai segi tiga sudut tepat.",
        },
        {
          title: "Tiga Bahagian Segi Tiga Bersudut Tegak",
          bulletPoints: [
            "Hipotenus (c) — Sisi terpanjang, bertentangan sudut 90°.",
            "Sisi a — Salah satu kaki, bersebelahan atau bertentangan sudut yang lebih kecil.",
            "Sisi b — Kaki yang satu lagi, melengkapi segi tiga.",
          ],
        },
        {
          title: "Contoh Mengenal Pasti Segi Tiga Bersudut Tegak",
          content:
            "Cara mengetahui sama ada segi tiga adalah bersudut tegak:\n\n① Perhatikan adakah tanda □ (sudut tegak) pada gambar rajah.\n② Atau gunakan akas Teorem Pythagoras: jika c² = a² + b², ia bersudut tegak.\n\nContoh segi tiga bersudut tegak:\n\n  ●─────────●\n  │         /\n  │        /\n6 │       /  10  ← hipotenus\n  │      /\n  │     /\n  │□   /\n  ●───●\n     8\n\nSemak: 6² + 8² = 36 + 64 = 100 = 10². ✓ Bersudut tegak!",
        },
        {
          title: "Segi Tiga Bersudut Tegak dalam Kehidupan Seharian",
          content:
            "Kita selalu menemui segi tiga bersudut tegak di sekeliling kita: tangga bersandar pada dinding, pepenjuru televisyen, jarak diagonal bilik, pembaris segi tiga, dan banyak lagi.",
        },
      ],
    },
    {
      title: "4. Hubungan Antara Sisi Segi Tiga Bersudut Tegak",
      subsections: [
        {
          title: "Hubungan Luas Segi Empat",
          content:
            "Jika kita membina segi empat sama pada setiap sisi segi tiga bersudut tegak:\n\n           ┌──┬──┐\n           │  │  │\n           ├──┼──┤  ← Segi empat c² (pada hipotenus)\n           │  │  │\n      ┌────┼──┼──┼────┐\n      │    │  ╱  │    │\n      │ a² │ ╱   │ b² │\n      │    │╱    │    │\n      └────┘     └────┘\n\nLuas segi empat pada c = Luas segi empat pada a + Luas segi empat pada b\nc × c = (a × a) + (b × b)\nc² = a² + b²",
        },
        {
          title: "Demonstrasi dengan Nombor",
          content:
            "Segi tiga 3-4-5:\n• Sisi a = 3, Sisi b = 4, Hipotenus c = 5\n• Segi empat pada a: 3 × 3 = 9 unit²\n• Segi empat pada b: 4 × 4 = 16 unit²\n• Segi empat pada c: 5 × 5 = 25 unit²\n• Semak: 9 + 16 = 25 ✓\n\nSegi tiga 5-12-13:\n• 5² + 12² = 25 + 144 = 169 = 13² ✓",
        },
        {
          title: "Triple Pythagoras",
          content:
            "Triple Pythagoras adalah set tiga nombor bulat positif (a, b, c) yang memenuhi a² + b² = c²:\n\n┌──────────────┬────────────────────────┐\n│ Triple Asas  │ Contoh Gandaan         │\n├──────────────┼────────────────────────┤\n│ 3, 4, 5      │ 6,8,10 | 9,12,15       │\n│ 5, 12, 13    │ 10,24,26               │\n│ 8, 15, 17    │ 16,30,34               │\n│ 7, 24, 25    │ 14,48,50               │\n└──────────────┴────────────────────────┘\n\nJika anda mengecam triple Pythagoras dalam soalan, anda boleh terus menulis jawapan tanpa pengiraan panjang!",
        },
      ],
    },
    {
      title: "5. Rumus Teorem Pythagoras",
      subsections: [
        {
          title: "Rumus Utama",
          content:
            "╔══════════════════════════════════╗\n║   c² = a² + b²                  ║\n║                                  ║\n║   Di mana:                       ║\n║   c = hipotenus (sisi terpanjang)║\n║   a, b = dua sisi yang lain      ║\n╚══════════════════════════════════╝",
        },
        {
          title: "Bentuk-bentuk Lain Rumus",
          content:
            "Daripada c² = a² + b², kita boleh terbitkan:\n\n• Mencari hipotenus: c = √(a² + b²)\n• Mencari sisi a: a² = c² − b² → a = √(c² − b²)\n• Mencari sisi b: b² = c² − a² → b = √(c² − a²)",
        },
        {
          title: "Cara Mengingat Rumus",
          content:
            "Ingatan mudah: 'Hipotenus kuasa dua SAMA DENGAN jumlah kuasa dua dua sisi yang lain.'\n\nAtau: 'Kotak terbesar = dua kotak yang lebih kecil'\n\nKunci: c² (hipotenus) sentiasa bersendirian di SATU sisi persamaan. a² + b² (dua sisi kaki) berada di sisi yang lain.",
        },
        {
          title: "Syarat Penggunaan Rumus",
          content:
            "PENTING: Teorem Pythagoras HANYA boleh digunakan apabila:\n✅ Segi tiga tersebut adalah segi tiga BERSUDUT TEGAK.\n✅ Kita mengetahui sama ada sisi yang dicari adalah hipotenus atau bukan.\n\n❌ Jangan gunakan pada segi tiga yang BUKAN bersudut tegak.",
        },
      ],
    },
    {
      title: "6. Mencari Hipotenus",
      subsections: [
        {
          title: "Rumus Mencari Hipotenus",
          content:
            "Apabila dua sisi (kaki) diketahui dan hipotenus perlu dicari:\n\nc = √(a² + b²)",
        },
        {
          title: "Contoh 1: Hipotenus Asas",
          content:
            "Soalan: Segi tiga bersudut tegak dengan sisi a = 3 cm dan b = 4 cm. Cari hipotenus c.\n\nPenyelesaian:\nc² = a² + b²\nc² = 3² + 4²\nc² = 9 + 16\nc² = 25\nc = √25\nc = 5 cm\n\n✓ Semak: Ini adalah triple 3-4-5!",
        },
        {
          title: "Contoh 2: Hipotenus dengan Perpuluhan",
          content:
            "Soalan: Segi tiga bersudut tegak dengan sisi a = 5 cm dan b = 12 cm. Cari hipotenus c.\n\nPenyelesaian:\nc² = 5² + 12²\nc² = 25 + 144\nc² = 169\nc = √169\nc = 13 cm\n\n✓ Semak: Triple 5-12-13!",
        },
        {
          title: "Contoh 3: Hipotenus Bukan Integer",
          content:
            "Soalan: Segi tiga bersudut tegak dengan sisi a = 6 cm dan b = 7 cm. Cari hipotenus c.\n\nPenyelesaian:\nc² = 6² + 7²\nc² = 36 + 49\nc² = 85\nc = √85\nc ≈ 9.22 cm (2 tempat perpuluhan)\n\nCatatan: √85 tidak menghasilkan integer, jadi biarkan dalam bentuk √85 atau guna kalkulator.",
        },
        {
          title: "Langkah-langkah Mencari Hipotenus",
          bulletPoints: [
            "① Kenal pasti bahawa hipotenus yang perlu dicari (sisi bertentangan 90°).",
            "② Labelkan dua sisi yang diketahui sebagai a dan b.",
            "③ Gantikan dalam rumus: c² = a² + b².",
            "④ Kira a² dan b².",
            "⑤ Tambahkan: c² = a² + b².",
            "⑥ Ambil punca kuasa dua: c = √(a² + b²).",
            "⑦ Semak: c mesti lebih panjang daripada a dan b.",
          ],
        },
      ],
    },
    {
      title: "7. Mencari Sisi Yang Tidak Diketahui",
      subsections: [
        {
          title: "Rumus Mencari Sisi Lebih Pendek",
          content:
            "Apabila hipotenus (c) dan satu sisi diketahui, cari sisi yang satu lagi:\n\na = √(c² − b²)  ATAU  b = √(c² − a²)\n\nPERINGATAN: Apabila mencari sisi lebih PENDEK, kita TOLAK (bukan tambah).",
        },
        {
          title: "Contoh 1: Mencari Sisi Lebih Pendek",
          content:
            "Soalan: Segi tiga bersudut tegak dengan hipotenus c = 13 cm dan sisi b = 5 cm. Cari sisi a.\n\nPenyelesaian:\na² = c² − b²\na² = 13² − 5²\na² = 169 − 25\na² = 144\na = √144\na = 12 cm\n\n✓ Semak: 5² + 12² = 25 + 144 = 169 = 13² ✓",
        },
        {
          title: "Contoh 2: Mencari Sisi dengan Gambar Rajah",
          content:
            "Soalan: Dalam segi tiga bersudut tegak, hipotenus = 17 cm, satu kaki = 8 cm. Cari kaki yang satu lagi.\n\nPenyelesaian:\nb² = c² − a²\nb² = 17² − 8²\nb² = 289 − 64\nb² = 225\nb = √225\nb = 15 cm\n\n✓ Semak: 8² + 15² = 64 + 225 = 289 = 17² ✓\nTriple 8-15-17!",
        },
        {
          title: "Contoh 3: Mencari Sisi Bukan Integer",
          content:
            "Soalan: Hipotenus = 10 cm, satu sisi = 6 cm. Cari sisi yang tidak diketahui.\n\nPenyelesaian:\nb² = 10² − 6²\nb² = 100 − 36\nb² = 64\nb = √64\nb = 8 cm\n\n✓ Triple 6-8-10 (gandaan 3-4-5)!",
        },
        {
          title: "Kesilapan Lazim: Tambah Bukannya Tolak",
          content:
            "❌ SILAP: a² = c² + b² (SALAH — ini menambah, bukan menolak)\n✅ BETUL: a² = c² − b² (TOLAK kerana mencari sisi lebih pendek)\n\nIngatan: 'Kalau mencari sisi LEBIH PENDEK, kita TOLAK dari hipotenus'",
        },
      ],
    },
    {
      title: "8. Penyelesaian Masalah Geometri",
      subsections: [
        {
          title: "Strategi Penyelesaian Masalah",
          bulletPoints: [
            "① Lukis gambar rajah (jika tiada) dan labelkan semua maklumat yang diketahui.",
            "② Kenal pasti segi tiga bersudut tegak dalam gambar rajah.",
            "③ Tentukan sisi mana yang perlu dicari (hipotenus atau kaki).",
            "④ Pilih rumus yang sesuai dan gantikan nilai.",
            "⑤ Selesaikan dan semak jawapan.",
          ],
        },
        {
          title: "Contoh 1: Segi Tiga Bergabung",
          content:
            "Soalan: ABCD adalah segi empat tepat dengan AB = 8 cm dan BC = 6 cm. Cari panjang pepenjuru AC.\n\nPenyelesaian:\nDalam segi tiga ABC, ∠B = 90° (sudut segi empat tepat)\nAB = 8 cm (kaki), BC = 6 cm (kaki), AC = hipotenus\n\nAC² = AB² + BC²\nAC² = 8² + 6²\nAC² = 64 + 36\nAC² = 100\nAC = √100 = 10 cm",
        },
        {
          title: "Contoh 2: Mencari Ketinggian Segi Tiga",
          content:
            "Soalan: Segi tiga sama kaki ABC. AB = AC = 10 cm, BC = 12 cm. Cari ketinggian dari A ke BC.\n\nPenyelesaian:\nLukis garis tinggi AD yang membahagikan BC kepada dua sama.\nBD = DC = 12 ÷ 2 = 6 cm\n\nDalam segi tiga ABD (bersudut tegak di D):\nAB² = AD² + BD²\n10² = AD² + 6²\n100 = AD² + 36\nAD² = 64\nAD = 8 cm",
        },
        {
          title: "Contoh 3: Sisi Dikongsi",
          content:
            "Soalan: Dua segi tiga bersudut tegak berkongsi sisi yang sama. Segi tiga pertama: sisi 5 cm dan 12 cm. Sisi bersama = hipotenus segi tiga pertama. Segi tiga kedua: hipotenus = 20 cm. Cari sisi yang tidak diketahui dalam segi tiga kedua.\n\nLangkah 1: Cari hipotenus segi tiga pertama (= sisi bersama)\nc₁² = 5² + 12² = 25 + 144 = 169\nc₁ = 13 cm\n\nLangkah 2: Cari sisi tidak diketahui dalam segi tiga kedua\nx² = 20² − 13² = 400 − 169 = 231\nx = √231 ≈ 15.2 cm",
        },
      ],
    },
    {
      title: "9. Akas Teorem Pythagoras",
      subsections: [
        {
          title: "Apakah Akas Teorem Pythagoras?",
          content:
            "Akas Teorem Pythagoras menyatakan: Jika kuasa dua sisi terpanjang segi tiga sama dengan jumlah kuasa dua dua sisi yang lain, maka segi tiga tersebut adalah segi tiga BERSUDUT TEGAK.\n\nDalam erti kata lain:\nJika c² = a² + b², maka sudut bertentangan c adalah 90°.",
        },
        {
          title: "Perbezaan: Teorem vs Akas",
          content:
            "Teorem Pythagoras: Jika segi tiga bersudut tegak → maka c² = a² + b²\n\nAkas Teorem Pythagoras: Jika c² = a² + b² → maka segi tiga bersudut tegak\n\nKedua-dua arah ini BENAR untuk Teorem Pythagoras.",
        },
        {
          title: "Cara Menggunakan Akas Pythagoras",
          bulletPoints: [
            "① Kenal pasti ketiga-tiga sisi segi tiga: a, b, dan c (sisi terpanjang).",
            "② Kira c² (kuasa dua sisi terpanjang).",
            "③ Kira a² + b² (jumlah kuasa dua dua sisi yang lain).",
            "④ Bandingkan: jika c² = a² + b², ia bersudut tegak.",
          ],
        },
        {
          title: "Contoh: Menggunakan Akas Pythagoras",
          content:
            "Soalan: Adakah segi tiga dengan sisi 9 cm, 12 cm dan 15 cm merupakan segi tiga bersudut tegak?\n\nPenyelesaian:\nSisi terpanjang: c = 15\nDua sisi lain: a = 9, b = 12\n\nc² = 15² = 225\na² + b² = 9² + 12² = 81 + 144 = 225\n\nSebab c² = a² + b² (225 = 225), ✓\nMaka segi tiga ini BERSUDUT TEGAK.\n\n(Perhatikan: ini adalah triple 3-4-5 didarab 3!)",
        },
      ],
    },
    {
      title: "10. Menentukan Segi Tiga Bersudut Tegak",
      subsections: [
        {
          title: "Ujian Segi Tiga Bersudut Tegak",
          content:
            "╔══════════════════════════════════════════╗\n║  Jika c² = a² + b²                      ║\n║  (di mana c adalah sisi terpanjang)      ║\n║  → Segi tiga adalah BERSUDUT TEGAK       ║\n║  → Sudut bertentangan c = tepat 90°      ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Contoh 1: Segi Tiga Bersudut Tegak (Triple)",
          content:
            "Soalan: Adakah segi tiga 5, 12, 13 bersudut tegak?\n\nc = 13 (sisi terpanjang)\nc² = 13² = 169\na² + b² = 5² + 12² = 25 + 144 = 169\n\n169 = 169 ✓ → BERSUDUT TEGAK",
        },
        {
          title: "Contoh 2: Bukan Segi Tiga Bersudut Tegak",
          content:
            "Soalan: Adakah segi tiga 4, 6, 7 bersudut tegak?\n\nc = 7 (sisi terpanjang)\nc² = 7² = 49\na² + b² = 4² + 6² = 16 + 36 = 52\n\n49 ≠ 52 → BUKAN bersudut tegak\n\n(Kerana 49 < 52, ia adalah segi tiga bersudut TIRUS)",
        },
      ],
    },
    {
      title: "11. Menentukan Segi Tiga Bersudut Tirus",
      subsections: [
        {
          title: "Ujian Segi Tiga Bersudut Tirus",
          content:
            "╔══════════════════════════════════════════╗\n║  Jika c² < a² + b²                      ║\n║  (di mana c adalah sisi terpanjang)      ║\n║  → Segi tiga adalah BERSUDUT TIRUS       ║\n║  → Semua sudut kurang daripada 90°       ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Penjelasan: Mengapa c² < a² + b²?",
          content:
            "Dalam segi tiga bersudut tirus, sisi terpanjang adalah 'pendek' berbanding jika ia adalah segi tiga bersudut tegak. Ini bermakna hipotenus 'tidak cukup panjang' untuk membentuk 90°, jadi sudutnya menjadi lebih kecil daripada 90°.",
        },
        {
          title: "Contoh: Segi Tiga Bersudut Tirus",
          content:
            "Soalan: Tentukan jenis segi tiga 4, 6, 7.\n\nc = 7 (sisi terpanjang)\nc² = 49\na² + b² = 16 + 36 = 52\n\n49 < 52 → c² < a² + b² → BERSUDUT TIRUS\n\nSemua sudut dalam segi tiga ini adalah kurang daripada 90°.",
        },
      ],
    },
    {
      title: "12. Menentukan Segi Tiga Bersudut Cakah",
      subsections: [
        {
          title: "Ujian Segi Tiga Bersudut Cakah",
          content:
            "╔══════════════════════════════════════════╗\n║  Jika c² > a² + b²                      ║\n║  (di mana c adalah sisi terpanjang)      ║\n║  → Segi tiga adalah BERSUDUT CAKAH       ║\n║  → Satu sudut melebihi 90°               ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Penjelasan: Mengapa c² > a² + b²?",
          content:
            "Dalam segi tiga bersudut cakah, sisi terpanjang adalah 'panjang' berbanding jika ia adalah segi tiga bersudut tegak. Ini bermakna hipotenus 'terlalu panjang' untuk membentuk 90°, jadi sudutnya menjadi lebih besar daripada 90°.",
        },
        {
          title: "Contoh: Segi Tiga Bersudut Cakah",
          content:
            "Soalan: Tentukan jenis segi tiga 3, 4, 7.\n\nc = 7 (sisi terpanjang)\nc² = 49\na² + b² = 9 + 16 = 25\n\n49 > 25 → c² > a² + b² → BERSUDUT CAKAH\n\nSatu sudut dalam segi tiga ini melebihi 90°.",
        },
        {
          title: "Catatan: Semak Kesahihan Segi Tiga",
          content:
            "PENTING: Sebelum mengklasifikasikan, pastikan set nombor itu boleh membentuk segi tiga! Syarat: Jumlah mana-mana dua sisi MESTI lebih besar daripada sisi ketiga.\nContoh: 1, 2, 10 — TIDAK membentuk segi tiga kerana 1 + 2 = 3 < 10.",
        },
      ],
    },
    {
      title: "13. Langkah Menentukan Jenis Segi Tiga",
      subsections: [
        {
          title: "5 Langkah Pengklasifikasian",
          content:
            "┌─────────────────────────────────────────────┐\n│ LANGKAH 1: Senaraikan 3 sisi segi tiga      │\n│ LANGKAH 2: Kenal pasti sisi terpanjang = c  │\n│ LANGKAH 3: Kira c²                          │\n│ LANGKAH 4: Kira a² + b²                     │\n│ LANGKAH 5: Bandingkan dan klasifikasikan    │\n│                                             │\n│ c² = a² + b² → BERSUDUT TEGAK              │\n│ c² < a² + b² → BERSUDUT TIRUS              │\n│ c² > a² + b² → BERSUDUT CAKAH              │\n└─────────────────────────────────────────────┘",
        },
        {
          title: "Contoh Lengkap: 3 Segi Tiga Berbeza",
          content:
            "① Segi tiga 6, 8, 10:\nc=10: c²=100 | a²+b²=36+64=100 | 100=100 → BERSUDUT TEGAK\n\n② Segi tiga 5, 7, 8:\nc=8: c²=64 | a²+b²=25+49=74 | 64<74 → BERSUDUT TIRUS\n\n③ Segi tiga 3, 5, 7:\nc=7: c²=49 | a²+b²=9+25=34 | 49>34 → BERSUDUT CAKAH",
        },
        {
          title: "Jadual Ringkasan Klasifikasi",
          content:
            "┌──────────────────┬────────────────────┬────────────────────┐\n│ Perbandingan     │ Jenis Segi Tiga    │ Sudut Terbesar     │\n├──────────────────┼────────────────────┼────────────────────┤\n│ c² = a² + b²    │ Bersudut Tegak     │ Tepat 90°          │\n│ c² < a² + b²    │ Bersudut Tirus     │ Kurang daripada 90°│\n│ c² > a² + b²    │ Bersudut Cakah     │ Lebih daripada 90° │\n└──────────────────┴────────────────────┴────────────────────┘",
        },
        {
          title: "Petua Ingatan: 'Sama, Kurang, Lebih'",
          content:
            "Cara mudah mengingat:\n• c² SAMA dengan a²+b² → sudut SAMA 90° (tepat tegak)\n• c² KURANG daripada a²+b² → sudut KURANG 90° (tirus)\n• c² LEBIH daripada a²+b² → sudut LEBIH 90° (cakah)",
        },
      ],
    },
    {
      title: "14. Aplikasi Kehidupan Seharian",
      subsections: [
        {
          title: "1. Tangga Bersandar pada Dinding",
          content:
            "Situasi: Tangga sepanjang 5 m bersandar pada dinding. Kaki tangga berjarak 3 m dari dinding. Berapa tinggi tangga mencapai dinding?\n\n    dinding\n      |  /\n    h |/  5m\n      |/\n   ───────\n      3m\n\nh² + 3² = 5²\nh² + 9 = 25\nh² = 16\nh = 4 m\n\nTangga mencapai ketinggian 4 m pada dinding.",
        },
        {
          title: "2. Wayar Sokongan Tiang Bendera",
          content:
            "Situasi: Tiang bendera setinggi 8 m. Wayar sokongan dipasang dari puncak tiang ke tanah, berjarak 6 m dari kaki tiang. Berapakah panjang wayar tersebut?\n\n   puncak\n    /|\n   / |\n  /  | 8m\n /   |\n/    |\n──────\n  6m\n\nWayar² = 8² + 6²\nWayar² = 64 + 36 = 100\nWayar = 10 m",
        },
        {
          title: "3. Jarak Terpendek Merentasi Padang",
          content:
            "Situasi: Ali berjalan dari sudut A ke sudut C merentasi padang segi empat tepat. Padang berukuran 40 m × 30 m. Berapakah jarak terpendek A ke C?\n\n  A─────────C\n  │        /\n  │ 40m   /\n  │      /  ← pepenjuru\n  │     /\n  │    /\n  B───'\n   30m\n\nAC² = 40² + 30²\nAC² = 1600 + 900 = 2500\nAC = 50 m\n\nJarak terpendek = 50 m (merentasi terus).",
        },
        {
          title: "4. Ketinggian Bumbung Khemah",
          content:
            "Situasi: Khemah mempunyai lebar 4 m. Tali penopang dipasang dari puncak ke tepi, dengan panjang tali = 2.5 m. Cari ketinggian khemah.\n\n    /|^\n   / | \\\n  /  | h\n /   |\n/    |\n──────\n  2m\n\nSepara lebar = 4÷2 = 2 m\nh² + 2² = 2.5²\nh² + 4 = 6.25\nh² = 2.25\nh = 1.5 m\n\nKetinggian khemah = 1.5 m.",
        },
        {
          title: "5. Pembinaan dan Kejuruteraan",
          content:
            "Dalam pembinaan, Teorem Pythagoras digunakan untuk:\n• Memastikan sudut tegak 90° ketika membina dinding atau lantai.\n• Mengira panjang sokongan pepenjuru.\n• Periksa: jika 3-4-5 berfungsi, sudut adalah 90°!\n\nContoh praktikal: Tukang kayu membina pagar. Untuk memastikan sudutnya 90°, beliau mengukur 3 kaki pada satu sisi, 4 kaki pada sisi lain, dan pepenjuru mestilah 5 kaki.",
        },
        {
          title: "6. Skrin TV dan Monitor Komputer",
          content:
            "Saiz skrin TV/monitor diukur menggunakan pepenjuru. Skrin 32 inci bermaksud pepenjuru skrin adalah 32 inci.\n\nContoh: Monitor dengan lebar 28 inci dan tinggi 17 inci.\nPepenjuru² = 28² + 17²\n= 784 + 289\n= 1073\nPepenjuru ≈ 32.8 inci\n\nSkrin ini boleh dikategorikan sebagai 'skrin 32 inci'.",
        },
      ],
    },
    {
      title: "15. Ringkasan Bab",
      subsections: [
        {
          title: "Peta Konsep: Teorem Pythagoras",
          content:
            "TEOREM PYTHAGORAS\n│\n├── Konsep Asas\n│   ├── Segi tiga bersudut tegak\n│   ├── Hipotenus (sisi terpanjang, bertentangan 90°)\n│   └── c² = a² + b²\n│\n├── Penggunaan\n│   ├── Mencari hipotenus: c = √(a²+b²)\n│   ├── Mencari kaki: a = √(c²−b²)\n│   └── Mencari kaki: b = √(c²−a²)\n│\n├── Akas Teorem\n│   ├── c² = a²+b² → Bersudut tegak\n│   ├── c² < a²+b² → Bersudut tirus\n│   └── c² > a²+b² → Bersudut cakah\n│\n└── Aplikasi\n    ├── Tangga & dinding\n    ├── Tiang & wayar\n    ├── Jarak pepenjuru\n    └── Pembinaan",
        },
        {
          title: "Rumus-rumus Penting",
          bulletPoints: [
            "Teorem Pythagoras: c² = a² + b² (c = hipotenus)",
            "Mencari hipotenus: c = √(a² + b²)",
            "Mencari kaki a: a = √(c² − b²)",
            "Mencari kaki b: b = √(c² − a²)",
            "Triple Pythagoras biasa: (3,4,5), (5,12,13), (8,15,17), (7,24,25)",
          ],
        },
        {
          title: "Panduan Cepat Klasifikasi Segi Tiga",
          content:
            "Diberi tiga sisi a ≤ b ≤ c:\n\nc² = a²+b² → BERSUDUT TEGAK (sudut = 90°)\nc² < a²+b² → BERSUDUT TIRUS (semua sudut < 90°)\nc² > a²+b² → BERSUDUT CAKAH (satu sudut > 90°)",
        },
        {
          title: "Senarai Semak Sebelum Menjawab",
          bulletPoints: [
            "✅ Kenal pasti sisi terpanjang (hipotenus = c).",
            "✅ Pastikan segi tiga bersudut tegak sebelum menggunakan c²=a²+b².",
            "✅ Untuk mencari kaki, TOLAK: a²=c²−b².",
            "✅ Semak jawapan: hipotenus mesti lebih panjang daripada kedua-dua kaki.",
            "✅ Kenali triple Pythagoras untuk menjimatkan masa.",
          ],
        },
      ],
    },
  ],
};
