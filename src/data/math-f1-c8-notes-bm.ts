import type { StructuredNotes } from "./types";

export const mathF1C8NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 8 memperkenalkan konsep garis dan sudut dalam geometri. Murid akan mempelajari jenis-jenis sudut, sifat sudut pada garis lurus dan putaran lengkap, sudut pelengkap, penggenap dan konjugat, serta hubungan sudut pada garis bersilang dan garis selari. Bab ini juga meliputi sudut dongak dan tunduk dalam kehidupan sebenar.",
  quickRevision: [
    "Sudut ialah ukuran putaran antara dua tembereng garis yang bertemu di satu titik (bucu).",
    "Jenis sudut: tirus (0°–90°), tegak (90°), cakah (90°–180°), refleks (180°–360°).",
    "Sudut pada garis lurus berjumlah 180°. Sudut putaran lengkap berjumlah 360°.",
    "Sudut pelengkap berjumlah 90°. Sudut penggenap berjumlah 180°. Sudut konjugat berjumlah 360°.",
    "Sudut bertentang bucu adalah sama besar apabila dua garis bersilang.",
    "Sudut bersebelahan pada garis lurus berjumlah 180°.",
    "Garis serenjang membentuk sudut 90°. Garis selari tidak bersilang walaupun dipanjangkan.",
    "Sudut sepadan (garis selari dengan garis rentas) adalah sama besar.",
    "Sudut selang-seli (garis selari dengan garis rentas) adalah sama besar.",
    "Sudut pedalaman (garis selari dengan garis rentas) berjumlah 180°.",
    "Sudut dongak diukur dari atas. Sudut tunduk diukur dari bawah.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan melukis pelbagai jenis sudut.",
            "Mengukur sudut menggunakan protraktor dengan tepat.",
            "Menentukan sudut pelengkap, penggenap, dan konjugat.",
            "Menggunakan sifat sudut pada garis lurus dan putaran lengkap.",
            "Mengenal pasti sudut bertentang bucu, sudut bersebelahan, dan sifat garis serenjang.",
            "Mengenal pasti garis selari dan garis rentas lintang.",
            "Menggunakan sifat sudut sepadan, selang-seli, dan pedalaman untuk mencari sudut yang tidak diketahui.",
            "Membezakan sudut dongak dan sudut tunduk.",
            "Menyelesaikan masalah yang melibatkan sudut.",
          ],
        },
      ],
    },
    {
      title: "1. Garis dan Sudut",
      subsections: [
        {
          title: "Apakah Sudut?",
          content:
            "Sudut ialah ukuran putaran antara dua tembereng garis yang bertemu di satu titik. Titik pertemuan itu dipanggil bucu. Dua tembereng garis yang membentuk sudut dipanggil kaki sudut.",
        },
        {
          title: "Unit Ukuran Sudut",
          content:
            "Sudut diukur dalam darjah (°). Satu putaran penuh ialah 360°. Protraktor digunakan untuk mengukur dan melukis sudut.",
        },
        {
          title: "Tembereng Garis",
          content:
            "Tembereng garis ialah sebahagian daripada garis yang mempunyai dua titik hujung. Panjang tembereng garis boleh diukur menggunakan pembaris.",
        },
      ],
    },
    {
      title: "2. Kekongruenan Tembereng Garis",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua atau lebih tembereng garis adalah kongruen jika panjangnya sama. Tanda kekongruenan ialah simbol ≅ atau tanda kurung pada garis dalam rajah geometri.",
        },
        {
          title: "Cara Mengenal Pasti Kekongruenan",
          content:
            "Untuk menentukan sama ada dua tembereng garis kongruen, ukur panjang kedua-duanya menggunakan pembaris. Jika panjang adalah sama, tembereng garis tersebut adalah kongruen.",
          table: {
            headers: ["Tembereng Garis", "Panjang", "Kongruen?"],
            rows: [
              ["AB dan CD", "AB = CD = 5 cm", "Ya ✓"],
              ["PQ dan RS", "PQ = 4 cm, RS = 6 cm", "Tidak ✗"],
              ["EF dan GH", "EF = GH = 3 cm", "Ya ✓"],
            ],
          },
        },
        {
          title: "Visual: Tembereng Garis Kongruen",
          content:
            "Dalam rajah geometri, tembereng garis yang kongruen ditandakan dengan tanda seretan (tick) yang sama. Satu seretan menunjukkan satu pasangan kongruen, dua seretan menunjukkan pasangan kongruen yang berbeza.",
          formula:
            "AB ≅ CD bermaksud panjang AB = panjang CD",
        },
      ],
    },
    {
      title: "3. Kekongruenan Sudut",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua atau lebih sudut adalah kongruen jika saiznya sama (bilangan darjah yang sama). Sudut kongruen dilambangkan dengan simbol ≅.",
        },
        {
          title: "Cara Mengenal Pasti Kekongruenan Sudut",
          content:
            "Ukur setiap sudut menggunakan protraktor. Jika nilai darjah adalah sama, sudut tersebut adalah kongruen.",
          table: {
            headers: ["Sudut", "Saiz", "Kongruen?"],
            rows: [
              ["∠ABC dan ∠DEF", "∠ABC = ∠DEF = 45°", "Ya ✓"],
              ["∠PQR dan ∠STU", "∠PQR = 60°, ∠STU = 70°", "Tidak ✗"],
              ["∠MNO dan ∠XYZ", "∠MNO = ∠XYZ = 120°", "Ya ✓"],
            ],
          },
        },
        {
          title: "Visual: Sudut Kongruen",
          content:
            "Dalam rajah geometri, sudut yang kongruen ditandakan dengan lengkung kecil (arc) yang sama. Dua lengkung bermakna pasangan kongruen yang berbeza.",
          formula:
            "∠ABC ≅ ∠DEF bermaksud saiz ∠ABC = saiz ∠DEF",
        },
      ],
    },
    {
      title: "4. Mengukur Sudut Menggunakan Protraktor",
      subsections: [
        {
          title: "Apakah Protraktor?",
          content:
            "Protraktor ialah alat yang digunakan untuk mengukur dan melukis sudut. Protraktor biasanya berbentuk separuh bulatan atau bulatan penuh dan mempunyai skala darjah dari 0° hingga 180° (atau 0° hingga 360°).",
        },
        {
          title: "Langkah-Langkah Menggunakan Protraktor",
          content: "Ikuti langkah-langkah berikut untuk mengukur sudut dengan tepat:",
          bulletPoints: [
            "Langkah 1: Letakkan titik tengah protraktor tepat pada bucu sudut.",
            "Langkah 2: Sejajarkan garisan dasar protraktor dengan salah satu kaki sudut.",
            "Langkah 3: Baca nilai darjah pada skala yang bersilang dengan kaki sudut yang lain.",
            "Langkah 4: Pastikan anda menggunakan skala yang betul (dalam atau luar).",
          ],
        },
        {
          title: "Petua Menggunakan Protraktor",
          content:
            "Protraktor mempunyai dua skala — skala dalam dan skala luar. Jika kaki sudut bermula dari kiri, gunakan skala luar (0° di kiri). Jika kaki sudut bermula dari kanan, gunakan skala dalam (0° di kanan).",
          table: {
            headers: ["Kaki Sudut Bermula", "Skala Digunakan"],
            rows: [
              ["Dari kiri (ke kanan)", "Skala luar — baca dari 0° di kiri"],
              ["Dari kanan (ke kiri)", "Skala dalam — baca dari 0° di kanan"],
            ],
          },
        },
        {
          title: "Contoh Pengukuran",
          content:
            "Untuk mengukur sudut ABC: letakkan pusat protraktor pada B, sejajarkan garis BA dengan 0°, kemudian baca nilai darjah pada garis BC.",
          formula:
            "Jika garis BC melintasi tanda 65°, maka ∠ABC = 65°",
        },
      ],
    },
    {
      title: "5. Jenis-Jenis Sudut",
      subsections: [
        {
          title: "Gambaran Keseluruhan Jenis Sudut",
          content:
            "Sudut dikategorikan mengikut saiznya dalam darjah. Terdapat empat jenis sudut utama yang perlu diketahui.",
          table: {
            headers: ["Jenis Sudut", "Saiz (Darjah)", "Simbol / Ciri"],
            rows: [
              ["Sudut Tirus (Acute)", "0° < sudut < 90°", "Tajam, lebih kecil dari sudut tegak"],
              ["Sudut Tegak (Right)", "Tepat 90°", "Ditandakan dengan kotak kecil □"],
              ["Sudut Cakah (Obtuse)", "90° < sudut < 180°", "Lebih besar dari sudut tegak"],
              ["Sudut Refleks (Reflex)", "180° < sudut < 360°", "Sangat besar, melebihi garis lurus"],
            ],
          },
        },
        {
          title: "Sudut Tirus",
          content:
            "Sudut tirus adalah sudut yang lebih kecil daripada 90°. Contoh: 30°, 45°, 60°, 85° adalah sudut tirus.",
          formula: "0° < sudut tirus < 90°",
        },
        {
          title: "Sudut Tegak",
          content:
            "Sudut tegak adalah tepat 90°. Ia ditandakan dengan simbol kotak kecil di bucu. Sudut tegak terbentuk apabila dua garis berserenjang.",
          formula: "Sudut tegak = 90° (dilambangkan □)",
        },
        {
          title: "Sudut Cakah",
          content:
            "Sudut cakah adalah sudut yang lebih besar daripada 90° tetapi lebih kecil daripada 180°. Contoh: 100°, 120°, 150° adalah sudut cakah.",
          formula: "90° < sudut cakah < 180°",
        },
        {
          title: "Sudut Refleks",
          content:
            "Sudut refleks adalah sudut yang lebih besar daripada 180° tetapi lebih kecil daripada 360°. Sudut refleks kelihatan 'melengkung jauh' melepasi garis lurus.",
          formula: "180° < sudut refleks < 360°",
        },
        {
          title: "Kesilapan Lazim",
          content:
            "⚠️ Ramai murid keliru antara sudut cakah dan sudut refleks. Ingat: sudut cakah adalah ANTARA garis lurus dan sudut tegak (90°–180°), manakala sudut refleks adalah LEBIH BESAR daripada garis lurus (180°–360°).",
        },
      ],
    },
    {
      title: "6. Sudut Pada Garis Lurus",
      subsections: [
        {
          title: "Sifat Utama",
          content:
            "Apabila beberapa sudut terbentuk pada satu sisi garis lurus, jumlah semua sudut tersebut adalah 180°. Ini dikenali sebagai sudut pada garis lurus atau sudut berpelengkap pada garis lurus.",
          formula: "a + b = 180° (sudut pada garis lurus)",
        },
        {
          title: "Contoh 1: Dua Sudut",
          content:
            "Rajah menunjukkan sudut a dan sudut b pada garis lurus. Jika a = 65°, cari nilai b.",
          formula: "a + b = 180° → 65° + b = 180° → b = 115°",
        },
        {
          title: "Contoh 2: Tiga Sudut",
          content:
            "Rajah menunjukkan tiga sudut pada garis lurus: x, 50° dan 75°. Cari nilai x.",
          formula: "x + 50° + 75° = 180° → x = 180° − 125° = 55°",
        },
        {
          title: "Visual: Sudut Pada Garis Lurus",
          content:
            "Bayangkan garisan mendatar lurus. Mana-mana sudut yang dibentuk di atas (atau di bawah) garisan tersebut akan berjumlah 180°. Ini seperti membahagikan sudut 180° kepada beberapa bahagian.",
        },
      ],
    },
    {
      title: "7. Sudut Putaran Lengkap",
      subsections: [
        {
          title: "Sifat Utama",
          content:
            "Sudut putaran lengkap ialah putaran penuh sebanyak 360°. Apabila beberapa sudut terbentuk di sekeliling satu titik, jumlah semua sudut tersebut adalah 360°.",
          formula: "a + b + c + ... = 360° (sudut putaran lengkap)",
        },
        {
          title: "Contoh 1",
          content:
            "Tiga sudut terbentuk di sekeliling titik: 120°, 85° dan x. Cari nilai x.",
          formula: "120° + 85° + x = 360° → x = 360° − 205° = 155°",
        },
        {
          title: "Contoh 2",
          content:
            "Empat sudut sama besar terbentuk di sekeliling satu titik. Apakah saiz setiap sudut?",
          formula: "4 × sudut = 360° → sudut = 360° ÷ 4 = 90°",
        },
        {
          title: "Visual: Putaran Lengkap",
          content:
            "Bayangkan jarum jam bermula dari kedudukan 12 dan berputar penuh kembali ke 12. Putaran itu adalah 360°. Semua sudut di sekeliling satu titik akan sentiasa berjumlah 360°.",
        },
      ],
    },
    {
      title: "8. Sudut Pelengkap",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua sudut adalah sudut pelengkap jika jumlah kedua-duanya adalah 90°. Setiap sudut merupakan pelengkap kepada sudut yang satu lagi.",
          formula: "a + b = 90° (sudut pelengkap)",
        },
        {
          title: "Cara Mencari Sudut Pelengkap",
          content:
            "Untuk mencari pelengkap bagi sesuatu sudut, tolak sudut itu daripada 90°.",
          formula: "Pelengkap bagi a = 90° − a",
        },
        {
          title: "Contoh",
          content: "Cari pelengkap bagi sudut-sudut berikut:",
          table: {
            headers: ["Sudut", "Pelengkap (90° − sudut)"],
            rows: [
              ["30°", "90° − 30° = 60°"],
              ["45°", "90° − 45° = 45°"],
              ["70°", "90° − 70° = 20°"],
              ["x°", "90° − x°"],
            ],
          },
        },
        {
          title: "Nota Penting",
          content:
            "Hanya sudut tirus (0° hingga 90°) boleh mempunyai sudut pelengkap. Sudut tegak, cakah dan refleks tidak mempunyai pelengkap.",
        },
      ],
    },
    {
      title: "9. Sudut Penggenap",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua sudut adalah sudut penggenap jika jumlah kedua-duanya adalah 180°. Setiap sudut merupakan penggenap kepada sudut yang satu lagi.",
          formula: "a + b = 180° (sudut penggenap)",
        },
        {
          title: "Cara Mencari Sudut Penggenap",
          content:
            "Untuk mencari penggenap bagi sesuatu sudut, tolak sudut itu daripada 180°.",
          formula: "Penggenap bagi a = 180° − a",
        },
        {
          title: "Contoh",
          content: "Cari penggenap bagi sudut-sudut berikut:",
          table: {
            headers: ["Sudut", "Penggenap (180° − sudut)"],
            rows: [
              ["60°", "180° − 60° = 120°"],
              ["90°", "180° − 90° = 90°"],
              ["110°", "180° − 110° = 70°"],
              ["x°", "180° − x°"],
            ],
          },
        },
        {
          title: "Perbandingan Pelengkap dan Penggenap",
          table: {
            headers: ["Jenis", "Jumlah", "Formula"],
            rows: [
              ["Sudut Pelengkap", "90°", "a + b = 90°"],
              ["Sudut Penggenap", "180°", "a + b = 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "10. Sudut Konjugat",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua sudut adalah sudut konjugat jika jumlah kedua-duanya adalah 360°. Sudut konjugat merupakan sepasang sudut yang bersama-sama membentuk putaran lengkap.",
          formula: "a + b = 360° (sudut konjugat)",
        },
        {
          title: "Cara Mencari Sudut Konjugat",
          content:
            "Untuk mencari konjugat bagi sesuatu sudut, tolak sudut itu daripada 360°.",
          formula: "Konjugat bagi a = 360° − a",
        },
        {
          title: "Contoh",
          content: "Cari konjugat bagi sudut-sudut berikut:",
          table: {
            headers: ["Sudut", "Konjugat (360° − sudut)"],
            rows: [
              ["90°", "360° − 90° = 270°"],
              ["120°", "360° − 120° = 240°"],
              ["200°", "360° − 200° = 160°"],
              ["x°", "360° − x°"],
            ],
          },
        },
        {
          title: "Ringkasan Tiga Jenis Pasangan Sudut",
          table: {
            headers: ["Jenis", "Jumlah", "Formula"],
            rows: [
              ["Pelengkap", "90°", "a + b = 90°"],
              ["Penggenap", "180°", "a + b = 180°"],
              ["Konjugat", "360°", "a + b = 360°"],
            ],
          },
        },
      ],
    },
    {
      title: "11. Sudut Berkaitan Dengan Garis Bersilang",
      subsections: [
        {
          title: "Garis Bersilang",
          content:
            "Apabila dua garis lurus bersilang, mereka membentuk empat sudut di titik persilangan. Sudut-sudut ini mempunyai sifat-sifat khas yang berguna dalam penyelesaian masalah geometri.",
        },
        {
          title: "Empat Sudut yang Terbentuk",
          content:
            "Dua garis bersilang membentuk empat sudut: sudut 1, sudut 2, sudut 3, dan sudut 4. Sudut-sudut ini boleh dikategorikan sebagai sudut bertentang bucu dan sudut bersebelahan.",
          table: {
            headers: ["Jenis Sudut", "Sifat", "Contoh"],
            rows: [
              ["Bertentang Bucu", "Sama besar", "∠1 = ∠3, ∠2 = ∠4"],
              ["Bersebelahan", "Berjumlah 180°", "∠1 + ∠2 = 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "12. Sudut Bertentang Bucu",
      subsections: [
        {
          title: "Definisi",
          content:
            "Apabila dua garis lurus bersilang, sudut-sudut yang bertentang (berhadapan antara satu sama lain di titik persilangan) adalah sama besar. Sudut ini dipanggil sudut bertentang bucu.",
          formula: "∠1 = ∠3 dan ∠2 = ∠4 (sudut bertentang bucu)",
        },
        {
          title: "Visual: Sudut Bertentang Bucu",
          content:
            "Lukis dua garis bersilang membentuk tanda silang (+). Sudut di bahagian atas sama dengan sudut di bahagian bawah. Sudut di sebelah kiri sama dengan sudut di sebelah kanan.",
        },
        {
          title: "Contoh 1",
          content:
            "Dua garis bersilang membentuk sudut 70° dan x. Cari nilai x jika kedua-duanya adalah sudut bertentang bucu.",
          formula: "x = 70° (sudut bertentang bucu adalah sama)",
        },
        {
          title: "Contoh 2",
          content:
            "Dua garis bersilang membentuk sudut 3a dan 60°. Cari nilai a jika kedua-duanya adalah sudut bertentang bucu.",
          formula: "3a = 60° → a = 20°",
        },
        {
          title: "Mencari Semua Sudut",
          content:
            "Jika satu sudut dalam persilangan adalah 65°, cari semua sudut lain.",
          formula:
            "∠1 = 65°; ∠3 = 65° (bertentang bucu); ∠2 = 180° − 65° = 115°; ∠4 = 115° (bertentang bucu)",
        },
      ],
    },
    {
      title: "13. Sudut Bersebelahan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut bersebelahan ialah sudut-sudut yang terletak bersebelahan antara satu sama lain pada garis lurus. Apabila dua garis bersilang, dua sudut yang berjiran (bersebelahan) berjumlah 180°.",
          formula: "∠1 + ∠2 = 180° (sudut bersebelahan pada garis lurus)",
        },
        {
          title: "Contoh",
          content:
            "Dua garis bersilang membentuk sudut 130° dan y. Cari y jika kedua-dua sudut adalah bersebelahan.",
          formula: "130° + y = 180° → y = 50°",
        },
        {
          title: "Nota Penting",
          content:
            "Sudut bersebelahan pada garis lurus sentiasa berjumlah 180° kerana kedua-duanya bersama-sama membentuk sudut 180° (garis lurus).",
        },
      ],
    },
    {
      title: "14. Garis Serenjang",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua garis adalah serenjang jika bertemu pada sudut 90° (sudut tegak). Garis serenjang dilambangkan dengan simbol ⊥.",
          formula: "AB ⊥ CD bermaksud AB berserenjang dengan CD (membentuk 90°)",
        },
        {
          title: "Sifat Garis Serenjang",
          content:
            "Apabila dua garis berserenjang, mereka membentuk EMPAT sudut tegak (90°) di titik persilangan.",
          table: {
            headers: ["Ciri", "Nilai"],
            rows: [
              ["Sudut antara dua garis serenjang", "90°"],
              ["Bilangan sudut tegak yang terbentuk", "4 sudut"],
              ["Jumlah semua sudut", "4 × 90° = 360°"],
            ],
          },
        },
        {
          title: "Contoh dalam Kehidupan Sebenar",
          content:
            "Dinding dan lantai bangunan membentuk sudut 90° — contoh garis serenjang dalam kehidupan sebenar. Penjuru buku, tepi pintu dan sudut meja juga adalah contoh sudut 90°.",
        },
        {
          title: "Melukis Garis Serenjang",
          content:
            "Untuk melukis garis serenjang menggunakan protraktor: lukis satu garis, letakkan pusat protraktor pada titik yang dikehendaki, tandakan 90°, kemudian lukis garisan melalui tanda tersebut.",
        },
      ],
    },
    {
      title: "15. Garis Selari",
      subsections: [
        {
          title: "Definisi",
          content:
            "Dua garis adalah selari jika mereka tidak bersilang walaupun dipanjangkan seberapa jauh. Jarak antara dua garis selari adalah sentiasa sama. Garis selari dilambangkan dengan simbol ∥.",
          formula: "AB ∥ CD bermaksud AB selari dengan CD",
        },
        {
          title: "Sifat Garis Selari",
          content:
            "Garis selari tidak pernah bertemu dan sentiasa mempunyai jarak yang sama di antara satu sama lain. Mereka bergerak ke arah yang sama.",
          bulletPoints: [
            "Tidak bersilang walaupun dipanjangkan.",
            "Jarak sentiasa seragam (sama) di mana-mana titik.",
            "Tidak membentuk sebarang sudut antara satu sama lain.",
          ],
        },
        {
          title: "Tanda Garis Selari dalam Rajah",
          content:
            "Dalam rajah geometri, garis selari ditandakan dengan anak panah kecil (→) pada setiap garis. Satu anak panah pada setiap garis bermaksud satu pasangan selari. Dua anak panah bermaksud pasangan selari yang berbeza.",
        },
        {
          title: "Contoh dalam Kehidupan Sebenar",
          content:
            "Landasan kereta api, tepi jalan raya, dan garis-garis pada buku tulis adalah contoh garis selari dalam kehidupan sebenar.",
        },
      ],
    },
    {
      title: "16. Garis Rentas Lintang",
      subsections: [
        {
          title: "Definisi",
          content:
            "Garis rentas lintang ialah garis lurus yang memotong dua atau lebih garis lain. Apabila garis rentas lintang memotong dua garis selari, sudut-sudut khas terbentuk.",
        },
        {
          title: "Sudut yang Terbentuk",
          content:
            "Apabila satu garis rentas lintang memotong dua garis selari, lapan sudut terbentuk secara keseluruhannya — empat sudut di setiap titik persilangan.",
          table: {
            headers: ["Pasangan Sudut", "Sifat"],
            rows: [
              ["Sudut Sepadan", "Sama besar"],
              ["Sudut Selang-Seli", "Sama besar"],
              ["Sudut Pedalaman", "Berjumlah 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "17. Sudut Sepadan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Apabila garis rentas lintang memotong dua garis selari, sudut-sudut yang berada di kedudukan yang sama di setiap persilangan adalah sama besar. Sudut ini dipanggil sudut sepadan.",
          formula: "Sudut sepadan adalah sama besar (∠p = ∠q)",
        },
        {
          title: "Cara Mengenal Pasti Sudut Sepadan",
          content:
            "Sudut sepadan berada pada kedudukan yang SAMA (contoh: kedua-duanya di atas-kiri, atau kedua-duanya di bawah-kanan) pada dua persilangan yang berlainan. Mereka membentuk corak huruf 'F'.",
          bulletPoints: [
            "Berada pada sisi yang SAMA garis rentas lintang.",
            "Berada pada sisi yang SAMA garis selari (atas atau bawah).",
            "Membentuk corak huruf F.",
          ],
        },
        {
          title: "Contoh",
          content:
            "Garis rentas lintang memotong dua garis selari. Sudut sepadan atas-kiri = 75°. Cari sudut sepadan lainnya.",
          formula: "Sudut sepadan = 75° (sudut sepadan adalah sama besar)",
        },
      ],
    },
    {
      title: "18. Sudut Selang-Seli",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut selang-seli ialah sudut-sudut yang berada di antara dua garis selari, pada sisi yang berlawanan garis rentas lintang. Sudut selang-seli adalah sama besar.",
          formula: "Sudut selang-seli adalah sama besar (∠r = ∠s)",
        },
        {
          title: "Cara Mengenal Pasti Sudut Selang-Seli",
          content:
            "Sudut selang-seli berada di antara dua garis selari (kawasan dalam), pada sisi yang BERLAWANAN garis rentas lintang. Mereka membentuk corak huruf 'Z' atau 'N'.",
          bulletPoints: [
            "Berada di kawasan DALAM (antara dua garis selari).",
            "Berada pada sisi yang BERLAWANAN garis rentas lintang.",
            "Membentuk corak huruf Z atau N.",
          ],
        },
        {
          title: "Contoh",
          content:
            "Garis rentas lintang memotong dua garis selari. Sudut selang-seli = 55°. Cari sudut selang-seli yang lain.",
          formula: "Sudut selang-seli yang lain = 55° (sudut selang-seli adalah sama besar)",
        },
      ],
    },
    {
      title: "19. Sudut Pedalaman",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut pedalaman ialah sudut-sudut yang berada di antara dua garis selari, pada sisi yang SAMA garis rentas lintang. Dua sudut pedalaman pada sisi yang sama berjumlah 180°.",
          formula: "Sudut pedalaman bersebelahan: ∠t + ∠u = 180°",
        },
        {
          title: "Cara Mengenal Pasti Sudut Pedalaman",
          content:
            "Sudut pedalaman berada di kawasan dalam (antara dua garis selari), pada sisi yang SAMA garis rentas lintang. Mereka membentuk corak huruf 'C' atau 'U'.",
          bulletPoints: [
            "Berada di kawasan DALAM (antara dua garis selari).",
            "Berada pada sisi yang SAMA garis rentas lintang.",
            "Membentuk corak huruf C atau U.",
            "Jumlah dua sudut pedalaman bersebelahan = 180°.",
          ],
        },
        {
          title: "Contoh",
          content:
            "Garis rentas lintang memotong dua garis selari. Satu sudut pedalaman = 110°. Cari sudut pedalaman bersebelahan.",
          formula: "110° + sudut pedalaman = 180° → sudut pedalaman = 70°",
        },
        {
          title: "Ringkasan Sudut pada Garis Selari",
          table: {
            headers: ["Jenis Sudut", "Corak", "Sifat"],
            rows: [
              ["Sepadan", "F-shape", "Sama besar"],
              ["Selang-Seli", "Z/N-shape", "Sama besar"],
              ["Pedalaman Bersebelahan", "C/U-shape", "Berjumlah 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "20. Sudut Dongak",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut dongak ialah sudut yang diukur dari garis ufuk mendaki ke atas kepada garisan pandang ke arah objek. Sudut dongak sentiasa diukur ke atas dari paras mendatar.",
          formula: "Sudut dongak: diukur dari ufuk ke ATAS (0° hingga 90°)",
        },
        {
          title: "Situasi Sudut Dongak",
          content:
            "Sudut dongak berlaku apabila seseorang melihat ke atas untuk memandang objek seperti puncak bangunan tinggi, atas pokok, atau bintang.",
          bulletPoints: [
            "Pemerhati di bawah objek.",
            "Sudut diukur dari garis ufuk mendaki ke ATAS.",
            "Nilai sudut dongak antara 0° dan 90°.",
          ],
        },
        {
          title: "Contoh: Melihat Puncak Bangunan",
          content:
            "Seorang pelajar berdiri di atas tanah dan memandang ke atas puncak sebuah bangunan. Sudut antara garisan ufuk dan pandangannya ke puncak bangunan adalah sudut dongak.",
          formula:
            "Jika sudut dongak = 35°, bermaksud pelajar melihat ke atas pada 35° dari paras mendatar.",
        },
        {
          title: "Gambaran Visual",
          content:
            "═══════════════ (garisan ufuk)\n     ↗ 35° (sudut dongak ke puncak bangunan)\n[Pemerhati]",
        },
      ],
    },
    {
      title: "21. Sudut Tunduk",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut tunduk ialah sudut yang diukur dari garis ufuk menurun ke bawah kepada garisan pandang ke arah objek. Sudut tunduk sentiasa diukur ke bawah dari paras mendatar.",
          formula: "Sudut tunduk: diukur dari ufuk ke BAWAH (0° hingga 90°)",
        },
        {
          title: "Situasi Sudut Tunduk",
          content:
            "Sudut tunduk berlaku apabila seseorang melihat ke bawah untuk memandang objek dari tempat yang lebih tinggi seperti dari menara, atas bangunan, atau atas bukit.",
          bulletPoints: [
            "Pemerhati di atas objek.",
            "Sudut diukur dari garis ufuk menurun ke BAWAH.",
            "Nilai sudut tunduk antara 0° dan 90°.",
          ],
        },
        {
          title: "Contoh: Melihat dari Menara",
          content:
            "Seorang pengawal di atas menara penjaga memandang ke bawah ke arah kenderaan di bawah. Sudut antara garisan ufuk dan pandangannya ke kenderaan adalah sudut tunduk.",
          formula:
            "Jika sudut tunduk = 40°, bermaksud pengawal melihat ke bawah pada 40° dari paras mendatar.",
        },
        {
          title: "Perbandingan Sudut Dongak dan Tunduk",
          table: {
            headers: ["Ciri", "Sudut Dongak", "Sudut Tunduk"],
            rows: [
              ["Arah Pandang", "Ke atas", "Ke bawah"],
              ["Kedudukan Pemerhati", "Di bawah objek", "Di atas objek"],
              ["Ukuran dari", "Ufuk ke atas", "Ufuk ke bawah"],
              ["Julat Nilai", "0° hingga 90°", "0° hingga 90°"],
            ],
          },
        },
      ],
    },
    {
      title: "22. Penyelesaian Masalah",
      subsections: [
        {
          title: "Strategi Penyelesaian Masalah",
          content:
            "Apabila menyelesaikan masalah yang melibatkan sudut, ikuti langkah-langkah berikut:",
          bulletPoints: [
            "Langkah 1: Kenal pasti jenis sudut dan hubungan geometri dalam rajah.",
            "Langkah 2: Tulis persamaan berdasarkan sifat sudut yang digunakan.",
            "Langkah 3: Selesaikan persamaan untuk mencari sudut tidak diketahui.",
            "Langkah 4: Semak jawapan dengan menggantikan semula ke dalam persamaan.",
          ],
        },
        {
          title: "Contoh 1: Menggunakan Sudut Pada Garis Lurus",
          content:
            "Dalam rajah, tiga sudut terbentuk pada garis lurus: (2x + 10)°, 40° dan (x − 5)°. Cari nilai x.",
          formula:
            "(2x + 10) + 40 + (x − 5) = 180 → 3x + 45 = 180 → 3x = 135 → x = 45",
        },
        {
          title: "Contoh 2: Menggunakan Sudut Bertentang Bucu",
          content:
            "Dua garis bersilang membentuk sudut (3y + 15)° dan 75°. Cari nilai y.",
          formula:
            "3y + 15 = 75 (sudut bertentang bucu) → 3y = 60 → y = 20",
        },
        {
          title: "Contoh 3: Menggunakan Sudut Selari",
          content:
            "Garis rentas lintang memotong dua garis selari membentuk sudut sepadan (4m − 20)° dan 80°. Cari nilai m.",
          formula:
            "4m − 20 = 80 (sudut sepadan sama besar) → 4m = 100 → m = 25",
        },
        {
          title: "Contoh 4: Menggunakan Pelbagai Sifat",
          content:
            "Dalam rajah dengan dua garis selari dan garis rentas lintang, satu sudut adalah 70°. Cari sudut selang-seli dan sudut pedalaman bersebelahan.",
          formula:
            "Sudut selang-seli = 70° (sama besar). Sudut pedalaman = 180° − 70° = 110°.",
        },
        {
          title: "Rujukan Cepat: Formula Sudut",
          table: {
            headers: ["Sifat", "Formula"],
            rows: [
              ["Sudut pada garis lurus", "Jumlah = 180°"],
              ["Sudut putaran lengkap", "Jumlah = 360°"],
              ["Sudut pelengkap", "a + b = 90°"],
              ["Sudut penggenap", "a + b = 180°"],
              ["Sudut konjugat", "a + b = 360°"],
              ["Sudut bertentang bucu", "∠1 = ∠3, ∠2 = ∠4"],
              ["Sudut sepadan (selari)", "Sama besar"],
              ["Sudut selang-seli (selari)", "Sama besar"],
              ["Sudut pedalaman (selari)", "Berjumlah 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "23. Ringkasan Bab",
      subsections: [
        {
          title: "Konsep Utama",
          content:
            "Bab 8 meliputi asas geometri: jenis sudut, sifat sudut khas, dan hubungan sudut pada garis bersilang dan selari.",
        },
        {
          title: "Jenis-Jenis Sudut",
          table: {
            headers: ["Jenis", "Julat"],
            rows: [
              ["Sudut Tirus", "0° < sudut < 90°"],
              ["Sudut Tegak", "90°"],
              ["Sudut Cakah", "90° < sudut < 180°"],
              ["Sudut Refleks", "180° < sudut < 360°"],
            ],
          },
        },
        {
          title: "Pasangan Sudut Khas",
          table: {
            headers: ["Pasangan", "Jumlah"],
            rows: [
              ["Pelengkap", "90°"],
              ["Penggenap", "180°"],
              ["Konjugat", "360°"],
              ["Garis lurus", "180°"],
              ["Putaran lengkap", "360°"],
            ],
          },
        },
        {
          title: "Sudut pada Garis Selari",
          table: {
            headers: ["Jenis", "Sifat", "Corak"],
            rows: [
              ["Sepadan", "Sama besar", "F"],
              ["Selang-Seli", "Sama besar", "Z / N"],
              ["Pedalaman Bersebelahan", "Berjumlah 180°", "C / U"],
            ],
          },
        },
        {
          title: "Sudut Dongak dan Tunduk",
          table: {
            headers: ["Jenis", "Arah", "Dari"],
            rows: [
              ["Dongak", "Ke atas", "Ufuk mendaki"],
              ["Tunduk", "Ke bawah", "Ufuk menurun"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Sudut pada garis lurus sentiasa berjumlah 180°. Sudut putaran lengkap sentiasa berjumlah 360°.",
    "Sudut pelengkap berjumlah 90°; sudut penggenap berjumlah 180°; sudut konjugat berjumlah 360°.",
    "Sudut bertentang bucu adalah SAMA BESAR apabila dua garis bersilang.",
    "Sudut bersebelahan pada garis lurus berjumlah 180°.",
    "Pada garis selari dengan garis rentas lintang: sudut SEPADAN sama besar (corak F).",
    "Pada garis selari dengan garis rentas lintang: sudut SELANG-SELI sama besar (corak Z/N).",
    "Pada garis selari dengan garis rentas lintang: sudut PEDALAMAN bersebelahan berjumlah 180° (corak C/U).",
    "Garis serenjang membentuk sudut 90°. Garis selari tidak pernah bersilang.",
    "Sudut DONGAK diukur dari ufuk ke ATAS; sudut TUNDUK diukur dari ufuk ke BAWAH.",
  ],
  keyTerms: [
    "Sudut — Ukuran putaran antara dua tembereng garis",
    "Bucu — Titik pertemuan dua kaki sudut",
    "Protraktor — Alat untuk mengukur sudut",
    "Sudut Tirus — Sudut antara 0° dan 90°",
    "Sudut Tegak — Sudut tepat 90°",
    "Sudut Cakah — Sudut antara 90° dan 180°",
    "Sudut Refleks — Sudut antara 180° dan 360°",
    "Sudut Pelengkap — Dua sudut berjumlah 90°",
    "Sudut Penggenap — Dua sudut berjumlah 180°",
    "Sudut Konjugat — Dua sudut berjumlah 360°",
    "Sudut Bertentang Bucu — Sudut sama besar apabila dua garis bersilang",
    "Garis Serenjang — Dua garis yang bertemu pada 90°",
    "Garis Selari — Dua garis yang tidak bersilang",
    "Garis Rentas Lintang — Garis yang memotong dua atau lebih garis lain",
    "Sudut Sepadan — Sudut sama besar pada kedudukan sama (corak F)",
    "Sudut Selang-Seli — Sudut sama besar pada sisi berlawanan (corak Z/N)",
    "Sudut Pedalaman — Sudut berjumlah 180° pada sisi sama (corak C/U)",
    "Sudut Dongak — Sudut dari ufuk ke atas",
    "Sudut Tunduk — Sudut dari ufuk ke bawah",
  ],
};
