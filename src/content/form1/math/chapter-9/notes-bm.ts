import type { StructuredNotes } from "@/data/types";

export const mathF1C9NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 9 memperkenalkan poligon asas dalam geometri dua dimensi. Murid akan mempelajari ciri-ciri poligon, jenis-jenis segi tiga dan sisi empat, formula pepenjuru, serta sifat sudut dalam dan sudut luar bagi segi tiga dan sisi empat. Bab ini juga mengaitkan konsep geometri dengan aplikasi dalam dunia sebenar.",
  quickRevision: [
    "Poligon ialah bentuk 2D tertutup yang dibatasi oleh tiga atau lebih sisi lurus.",
    "Bilangan bucu = bilangan sisi. Formula pepenjuru: n(n − 3) / 2.",
    "Segi tiga sama sisi: 3 sisi sama, 3 sudut = 60°, 3 garis simetri.",
    "Segi tiga sama kaki: 2 sisi sama, 2 sudut tapak sama, 1 garis simetri.",
    "Segi tiga tak sama kaki: semua sisi dan sudut berbeza, tiada garis simetri.",
    "Jumlah sudut dalam segi tiga = 180°.",
    "Sudut luar segi tiga = jumlah dua sudut dalam yang berhadapan.",
    "Jumlah sudut dalam sisi empat = 360°.",
    "Segi empat tepat: 2 pasang sisi selari dan sama panjang, semua sudut 90°.",
    "Segi empat sama: 4 sisi sama panjang, semua sudut 90°, pepenjuru berserenjang.",
    "Jajaran genjang: 2 pasang sisi selari dan sama panjang, sudut bertentang sama.",
    "Belah ketupat: 4 sisi sama, pepenjuru berserenjang, 2 garis simetri.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan mengelas poligon berdasarkan ciri-cirinya.",
            "Menggunakan formula untuk mengira bilangan pepenjuru sesuatu poligon.",
            "Menamakan poligon berdasarkan bilangan sisi.",
            "Mengenal pasti dan mengelas jenis-jenis segi tiga mengikut sisi dan sudut.",
            "Menggunakan sifat sudut segi tiga untuk menyelesaikan masalah.",
            "Mengenal pasti dan membanding ciri-ciri sisi empat.",
            "Menggunakan sifat sudut sisi empat untuk menyelesaikan masalah.",
            "Mengaitkan poligon dengan aplikasi dalam dunia sebenar.",
          ],
        },
      ],
    },
    {
      title: "1. Poligon",
      subsections: [
        {
          title: "Definisi Poligon",
          content:
            "Poligon ialah bentuk dua dimensi (2D) tertutup yang dibatasi oleh tiga atau lebih sisi lurus. Perkataan 'poligon' berasal daripada bahasa Greek yang bermaksud 'banyak sudut'.",
        },
        {
          title: "Ciri Utama Poligon",
          content:
            "Semua sisi poligon adalah garis lurus. Poligon adalah bentuk tertutup — tiada hujung yang terbuka. Poligon ialah bentuk 2D (rata).",
          bulletPoints: [
            "Sisi: tembereng garis lurus yang membentuk sempadan poligon.",
            "Bucu: titik di mana dua sisi bertemu.",
            "Sudut dalam: sudut yang terbentuk di dalam poligon di setiap bucu.",
          ],
        },
        {
          title: "Poligon Sekata vs Tidak Sekata",
          content:
            "Poligon SEKATA mempunyai semua sisi sama panjang DAN semua sudut dalam sama besar. Poligon TIDAK SEKATA mempunyai sisi atau sudut yang berbeza.",
          table: {
            headers: ["Jenis", "Sisi", "Sudut"],
            rows: [
              ["Sekata", "Semua sama", "Semua sama"],
              ["Tidak Sekata", "Mungkin berbeza", "Mungkin berbeza"],
            ],
          },
        },
        {
          title: "Poligon Cembung vs Cekung",
          content:
            "Poligon CEMBUNG: semua sudut dalam kurang daripada 180°. Poligon CEKUNG: sekurang-kurangnya satu sudut dalam lebih besar daripada 180° (sudut refleks).",
        },
      ],
    },
    {
      title: "2. Ciri-ciri Poligon",
      subsections: [
        {
          title: "Hubungan Bucu, Sisi dan Sudut",
          content:
            "Dalam mana-mana poligon, bilangan bucu = bilangan sisi = bilangan sudut dalam. Ciri ini berlaku untuk semua poligon tanpa mengira bilangan sisi.",
          table: {
            headers: ["Poligon", "Bucu", "Sisi", "Sudut Dalam"],
            rows: [
              ["Segi tiga", "3", "3", "3"],
              ["Sisi empat", "4", "4", "4"],
              ["Pentagon", "5", "5", "5"],
              ["Heksagon", "6", "6", "6"],
              ["Oktagon", "8", "8", "8"],
            ],
          },
        },
        {
          title: "Pepenjuru Poligon",
          content:
            "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan (bukan sisi). Sisi bukan pepenjuru.",
          bulletPoints: [
            "Segi tiga (3 sisi): tiada pepenjuru (semua bucu bersebelahan).",
            "Sisi empat (4 sisi): 2 pepenjuru.",
            "Pentagon (5 sisi): 5 pepenjuru.",
            "Heksagon (6 sisi): 9 pepenjuru.",
          ],
        },
      ],
    },
    {
      title: "3. Bucu, Sisi dan Pepenjuru",
      subsections: [
        {
          title: "Bucu",
          content:
            "Bucu (tunggal: bucu; jamak: bucu-bucu) ialah titik penjuru di mana dua sisi poligon bertemu. Bucu biasanya dilabelkan dengan huruf besar seperti A, B, C.",
        },
        {
          title: "Sisi",
          content:
            "Sisi ialah setiap tembereng garis lurus yang membentuk sempadan poligon. Contoh: segi tiga ABC mempunyai sisi AB, BC dan CA.",
        },
        {
          title: "Pepenjuru",
          content:
            "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan. Pepenjuru berada di DALAM poligon (untuk poligon cembung).",
          formula: "Bilangan pepenjuru = n(n − 3) / 2",
        },
        {
          title: "Visual: Pepenjuru Sisi Empat",
          content:
            "Sisi empat ABCD mempunyai bucu A, B, C dan D. Sisi-sisinya ialah AB, BC, CD dan DA. Pepenjuru-pepenjurunya ialah AC dan BD (menghubungkan bucu yang tidak bersebelahan).",
        },
      ],
    },
    {
      title: "4. Formula Bilangan Pepenjuru",
      subsections: [
        {
          title: "Formula",
          content:
            "Bilangan pepenjuru bagi poligon dengan n sisi boleh dikira menggunakan formula berikut:",
          formula: "Bilangan pepenjuru = n(n − 3) / 2",
        },
        {
          title: "Contoh: Segi Tiga (n = 3)",
          content:
            "Segi tiga mempunyai 3 sisi. Gantikan n = 3 ke dalam formula:",
          formula: "Bilangan pepenjuru = 3(3 − 3) / 2 = 3(0) / 2 = 0",
        },
        {
          title: "Contoh: Sisi Empat (n = 4)",
          content:
            "Sisi empat mempunyai 4 sisi. Gantikan n = 4 ke dalam formula:",
          formula: "Bilangan pepenjuru = 4(4 − 3) / 2 = 4(1) / 2 = 2",
        },
        {
          title: "Contoh: Pentagon (n = 5)",
          content:
            "Pentagon mempunyai 5 sisi. Gantikan n = 5 ke dalam formula:",
          formula: "Bilangan pepenjuru = 5(5 − 3) / 2 = 5(2) / 2 = 5",
        },
        {
          title: "Contoh: Heksagon (n = 6)",
          content:
            "Heksagon mempunyai 6 sisi. Gantikan n = 6 ke dalam formula:",
          formula: "Bilangan pepenjuru = 6(6 − 3) / 2 = 6(3) / 2 = 9",
        },
        {
          title: "Jadual Ringkasan Pepenjuru",
          table: {
            headers: ["Poligon", "n (Sisi)", "n(n − 3)/2", "Pepenjuru"],
            rows: [
              ["Segi tiga", "3", "3(0)/2", "0"],
              ["Sisi empat", "4", "4(1)/2", "2"],
              ["Pentagon", "5", "5(2)/2", "5"],
              ["Heksagon", "6", "6(3)/2", "9"],
              ["Heptagon", "7", "7(4)/2", "14"],
              ["Oktagon", "8", "8(5)/2", "20"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Menamakan Poligon",
      subsections: [
        {
          title: "Nama-Nama Poligon",
          content:
            "Poligon dinamakan berdasarkan bilangan sisinya. Nama-nama ini penting untuk diingat dalam matematik geometri.",
          table: {
            headers: ["Bilangan Sisi", "Nama Poligon", "Contoh"],
            rows: [
              ["3", "Segi Tiga (Triangle)", "▲"],
              ["4", "Sisi Empat (Quadrilateral)", "▭"],
              ["5", "Pentagon", "⬠"],
              ["6", "Heksagon (Hexagon)", "⬡"],
              ["7", "Heptagon", "7 sisi"],
              ["8", "Oktagon (Octagon)", "8 sisi"],
              ["9", "Nonagon", "9 sisi"],
              ["10", "Dekagon (Decagon)", "10 sisi"],
            ],
          },
        },
        {
          title: "Cara Mengingat Nama Poligon",
          content:
            "Gunakan kata kunci bahasa Latin/Greek: tri = 3, quad = 4, penta = 5, hexa = 6, hepta = 7, octa = 8, nona = 9, deca = 10.",
        },
      ],
    },
    {
      title: "6. Melukis dan Melabel Poligon",
      subsections: [
        {
          title: "Pelabelan Poligon",
          content:
            "Poligon dilabel dengan huruf besar bermula dari A, mengikut urutan mengikut arah jam atau lawan arah jam. Nama poligon ditulis menggunakan huruf-huruf bucu tersebut.",
          bulletPoints: [
            "Segi tiga: ABC (3 bucu: A, B, C)",
            "Sisi empat: ABCD (4 bucu: A, B, C, D)",
            "Pentagon: ABCDE (5 bucu: A, B, C, D, E)",
            "Heksagon: ABCDEF (6 bucu: A, B, C, D, E, F)",
          ],
        },
        {
          title: "Cara Melukis Poligon",
          content:
            "Untuk melukis poligon sekata, gunakan pembaris dan jangka lukis. Untuk poligon tidak sekata, lukis sisi-sisi lurus yang membentuk bentuk tertutup. Pastikan poligon adalah tertutup — titik akhir mesti bertemu dengan titik mula.",
        },
        {
          title: "Petua Melukis",
          content:
            "Tandakan bucu-bucu terlebih dahulu dengan titik, kemudian sambungkan dengan garis lurus. Label bucu menggunakan huruf besar mengikut urutan.",
        },
      ],
    },
    {
      title: "7. Sifat Segi Tiga",
      subsections: [
        {
          title: "Pengenalan Segi Tiga",
          content:
            "Segi tiga ialah poligon dengan 3 sisi, 3 bucu dan 3 sudut. Segi tiga boleh dikelaskan berdasarkan SISI atau berdasarkan SUDUT.",
          table: {
            headers: ["Pengkelasan", "Jenis"],
            rows: [
              ["Berdasarkan Sisi", "Sama sisi, Sama kaki, Tak sama kaki"],
              ["Berdasarkan Sudut", "Bersudut tirus, Bersudut cakah, Bersudut tegak"],
            ],
          },
        },
        {
          title: "Ringkasan Sifat Segi Tiga",
          table: {
            headers: ["Jenis", "Sisi", "Sudut", "Simetri"],
            rows: [
              ["Sama sisi", "3 sisi sama", "Semua 60°", "3 garis"],
              ["Sama kaki", "2 sisi sama", "2 sudut tapak sama", "1 garis"],
              ["Tak sama kaki", "Semua berbeza", "Semua berbeza", "Tiada"],
              ["Bersudut tirus", "Berbeza-beza", "Semua < 90°", "—"],
              ["Bersudut cakah", "Berbeza-beza", "Satu > 90°", "—"],
              ["Bersudut tegak", "Berbeza-beza", "Satu = 90°", "—"],
            ],
          },
        },
      ],
    },
    {
      title: "8. Segi Tiga Sama Sisi",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga sama sisi ialah segi tiga yang mempunyai ketiga-tiga sisi yang sama panjang dan ketiga-tiga sudut yang sama besar.",
          bulletPoints: [
            "Semua 3 sisi sama panjang: AB = BC = CA.",
            "Semua 3 sudut sama besar: ∠A = ∠B = ∠C = 60°.",
            "Mempunyai 3 garis simetri.",
            "Juga merupakan segi tiga bersudut tirus.",
          ],
        },
        {
          title: "Formula Sudut",
          formula: "Setiap sudut = 180° ÷ 3 = 60°",
        },
        {
          title: "Visual: Segi Tiga Sama Sisi",
          content:
            "Bayangkan segi tiga dengan tanda seretan (tick mark) pada setiap sisi — menunjukkan semua sisi sama panjang. Setiap penjuru mempunyai sudut 60°.",
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Papan tanda 'yield' di jalan raya, kepingan pizza, dan tanda amaran berbentuk segi tiga sama sisi.",
        },
      ],
    },
    {
      title: "9. Segi Tiga Sama Kaki",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga sama kaki ialah segi tiga yang mempunyai DUA sisi yang sama panjang. Sisi yang sama panjang dipanggil 'kaki', manakala sisi yang berbeza dipanggil 'tapak'.",
          bulletPoints: [
            "Dua sisi sama panjang (kaki): AB = AC.",
            "Dua sudut tapak sama besar: ∠B = ∠C.",
            "Mempunyai 1 garis simetri (melalui puncak dan titik tengah tapak).",
          ],
        },
        {
          title: "Sifat Sudut",
          formula: "∠B = ∠C (sudut tapak sama), ∠A + ∠B + ∠C = 180°",
        },
        {
          title: "Contoh",
          content:
            "Segi tiga sama kaki dengan ∠B = ∠C = 50°. Cari ∠A.",
          formula: "∠A = 180° − 50° − 50° = 80°",
        },
        {
          title: "Visual: Segi Tiga Sama Kaki",
          content:
            "Bayangkan segi tiga dengan tanda seretan pada DUA sisi yang sama, dan lengkung yang sama pada DUA sudut tapak yang sama.",
        },
      ],
    },
    {
      title: "10. Segi Tiga Tak Sama Kaki",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga tak sama kaki ialah segi tiga yang mempunyai semua sisi yang berbeza panjang dan semua sudut yang berbeza besar.",
          bulletPoints: [
            "Ketiga-tiga sisi berbeza panjang: AB ≠ BC ≠ CA.",
            "Ketiga-tiga sudut berbeza: ∠A ≠ ∠B ≠ ∠C.",
            "Tiada garis simetri.",
          ],
        },
        {
          title: "Nota Penting",
          content:
            "Walaupun semua sisi dan sudut berbeza, jumlah ketiga-tiga sudut tetap = 180°.",
          formula: "∠A + ∠B + ∠C = 180° (selalu, untuk mana-mana segi tiga)",
        },
      ],
    },
    {
      title: "11. Segi Tiga Bersudut Tirus",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga bersudut tirus ialah segi tiga di mana KETIGA-TIGA sudutnya adalah sudut tirus (kurang daripada 90°).",
          formula: "Semua 3 sudut < 90°, dan jumlah = 180°",
        },
        {
          title: "Contoh",
          content:
            "Segi tiga dengan sudut 60°, 70° dan 50° adalah segi tiga bersudut tirus. (60° + 70° + 50° = 180°, semua < 90°).",
        },
        {
          title: "Nota",
          content:
            "Segi tiga sama sisi (semua 60°) adalah contoh segi tiga bersudut tirus.",
        },
      ],
    },
    {
      title: "12. Segi Tiga Bersudut Cakah",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga bersudut cakah ialah segi tiga yang mempunyai SATU sudut cakah (lebih besar daripada 90°). Dua sudut yang lain mestilah sudut tirus.",
          formula: "Satu sudut > 90°, dua sudut lain < 90°, jumlah = 180°",
        },
        {
          title: "Contoh",
          content:
            "Segi tiga dengan sudut 120°, 35° dan 25° adalah segi tiga bersudut cakah. (120° > 90°, 35° + 25° + 120° = 180°).",
        },
        {
          title: "Kesilapan Lazim",
          content:
            "⚠️ Segi tiga TIDAK BOLEH mempunyai DUA sudut cakah, kerana dua sudut cakah sahaja sudah melebihi 180°.",
        },
      ],
    },
    {
      title: "13. Segi Tiga Bersudut Tegak",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi tiga bersudut tegak ialah segi tiga yang mempunyai tepat SATU sudut tegak (90°). Sisi terpanjang (bertentangan dengan sudut tegak) dipanggil hipotenus.",
          bulletPoints: [
            "Satu sudut = 90° (sudut tegak).",
            "Dua sudut yang lain berjumlah 90°.",
            "Sisi terpanjang ialah hipotenus.",
            "Berkaitan dengan Teorem Pythagoras (akan dipelajari kemudian).",
          ],
        },
        {
          title: "Sifat Sudut",
          formula: "90° + sudut 2 + sudut 3 = 180° → sudut 2 + sudut 3 = 90°",
        },
        {
          title: "Contoh",
          content:
            "Segi tiga bersudut tegak dengan sudut 90°, 35° dan 55°. (90° + 35° + 55° = 180° ✓).",
        },
      ],
    },
    {
      title: "14. Sifat Sudut Segi Tiga",
      subsections: [
        {
          title: "Hukum 1: Jumlah Sudut Dalam",
          content:
            "Jumlah ketiga-tiga sudut dalam mana-mana segi tiga sentiasa 180°.",
          formula: "∠A + ∠B + ∠C = 180°",
        },
        {
          title: "Contoh 1",
          content:
            "Segi tiga ABC dengan ∠A = 50° dan ∠B = 70°. Cari ∠C.",
          formula: "∠C = 180° − 50° − 70° = 60°",
        },
        {
          title: "Hukum 2: Sudut Dalam + Sudut Luar = 180°",
          content:
            "Setiap sudut dalam segi tiga dan sudut luar bersebelahannya berjumlah 180° (kerana mereka berada pada garis lurus).",
          formula: "sudut dalam + sudut luar bersebelahan = 180°",
        },
        {
          title: "Hukum 3: Sudut Luar Segi Tiga",
          content:
            "Sudut luar segi tiga SAMA dengan jumlah DUA sudut dalam yang tidak bersebelahan dengannya.",
          formula: "sudut luar = sudut dalam 1 + sudut dalam 2 (yang berhadapan)",
        },
        {
          title: "Contoh 2: Sudut Luar",
          content:
            "Segi tiga ABC dengan ∠A = 45° dan ∠B = 65°. Cari sudut luar di C.",
          formula: "Sudut luar di C = ∠A + ∠B = 45° + 65° = 110°",
        },
        {
          title: "Contoh 3: Menggunakan Sudut Luar",
          content:
            "Sudut luar segi tiga = 130°. Satu sudut dalam berhadapan = 70°. Cari sudut dalam berhadapan yang lain.",
          formula: "130° = 70° + x → x = 130° − 70° = 60°",
        },
        {
          title: "Kesilapan Lazim",
          content:
            "⚠️ Sudut luar segi tiga BUKAN sudut refleks. Sudut luar adalah sudut yang terbentuk DI LUAR segi tiga apabila satu sisi dipanjangkan.",
        },
      ],
    },
    {
      title: "15. Sifat Sisi Empat",
      subsections: [
        {
          title: "Pengenalan Sisi Empat",
          content:
            "Sisi empat ialah poligon dengan 4 sisi, 4 bucu dan 4 sudut. Terdapat pelbagai jenis sisi empat dengan ciri-ciri yang berbeza.",
        },
        {
          title: "Jenis-Jenis Sisi Empat",
          table: {
            headers: ["Jenis", "Ciri Utama"],
            rows: [
              ["Segi empat tepat", "4 sudut tegak, sisi bertentang sama dan selari"],
              ["Segi empat sama", "4 sisi sama, 4 sudut tegak"],
              ["Jajaran genjang", "Sisi bertentang selari dan sama, sudut bertentang sama"],
              ["Belah ketupat", "4 sisi sama, pepenjuru berserenjang"],
              ["Trapezium", "Satu pasang sisi selari"],
              ["Lelayang", "2 pasang sisi bersebelahan sama"],
            ],
          },
        },
        {
          title: "Hierarki Sisi Empat",
          content:
            "Segi empat sama adalah satu jenis segi empat tepat YANG JUGA merupakan jenis belah ketupat dan jajaran genjang. Segi empat tepat dan belah ketupat adalah jenis-jenis jajaran genjang.",
        },
      ],
    },
    {
      title: "16. Segi Empat Tepat",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi empat tepat ialah sisi empat dengan empat sudut tegak (90°). Semua segi empat tepat adalah juga jajaran genjang.",
          bulletPoints: [
            "Sisi bertentang adalah sama panjang: AB = CD, BC = AD.",
            "Sisi bertentang adalah selari: AB ∥ CD, BC ∥ AD.",
            "Semua 4 sudut adalah 90°.",
            "Pepenjuru adalah sama panjang: AC = BD.",
            "Pepenjuru saling membahagi dua sama (bersilang di tengah).",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 2",
        },
        {
          title: "Visual: Segi Empat Tepat",
          content:
            "Segi empat tepat ABCD dengan panjang = p dan lebar = l. Sisi-sisinya: AB = CD = p, BC = AD = l. Pepenjuru AC dan BD bersilang di titik tengah O, dan AC = BD.",
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Pintu, tetingkap, skrin televisyen, buku dan papan hitam adalah contoh segi empat tepat dalam kehidupan sebenar.",
        },
      ],
    },
    {
      title: "17. Segi Empat Sama",
      subsections: [
        {
          title: "Sifat",
          content:
            "Segi empat sama ialah sisi empat dengan keempat-empat sisi yang sama panjang dan keempat-empat sudut tegak (90°).",
          bulletPoints: [
            "Semua 4 sisi sama panjang: AB = BC = CD = DA.",
            "Sisi bertentang adalah selari.",
            "Semua 4 sudut adalah 90°.",
            "Pepenjuru adalah sama panjang: AC = BD.",
            "Pepenjuru saling membahagi dua sama.",
            "Pepenjuru berserenjang (90°) antara satu sama lain.",
            "Pepenjuru membahagi dua sudut-sudut bucu.",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 4",
        },
        {
          title: "Perbezaan Segi Empat Sama vs Segi Empat Tepat",
          table: {
            headers: ["Ciri", "Segi Empat Sama", "Segi Empat Tepat"],
            rows: [
              ["Semua sisi sama", "Ya ✓", "Tidak (hanya sisi bertentang)"],
              ["Semua sudut 90°", "Ya ✓", "Ya ✓"],
              ["Pepenjuru berserenjang", "Ya ✓", "Tidak semestinya"],
              ["Garis simetri", "4", "2"],
            ],
          },
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Jubin lantai, papan catur dan kepingan roti yang dipotong sama rata adalah contoh segi empat sama.",
        },
      ],
    },
    {
      title: "18. Jajaran Genjang",
      subsections: [
        {
          title: "Sifat",
          content:
            "Jajaran genjang ialah sisi empat dengan dua pasang sisi bertentang yang selari dan sama panjang.",
          bulletPoints: [
            "Sisi bertentang sama panjang: AB = CD, BC = AD.",
            "Sisi bertentang selari: AB ∥ CD, BC ∥ AD.",
            "Sudut bertentang sama besar: ∠A = ∠C, ∠B = ∠D.",
            "Sudut bersebelahan berjumlah 180°: ∠A + ∠B = 180°.",
            "Pepenjuru saling membahagi dua sama.",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 0",
        },
        {
          title: "Nota",
          content:
            "Segi empat tepat dan segi empat sama adalah jenis jajaran genjang yang lebih khas. Jajaran genjang tidak semestinya mempunyai sudut tegak.",
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Bentuk keratan rentas jajar panjang dan jajaran genjang pada permukaan bangunan.",
        },
      ],
    },
    {
      title: "19. Belah Ketupat",
      subsections: [
        {
          title: "Sifat",
          content:
            "Belah ketupat ialah sisi empat dengan keempat-empat sisi yang sama panjang. Ia seperti jajaran genjang dengan semua sisi sama.",
          bulletPoints: [
            "Semua 4 sisi sama panjang: AB = BC = CD = DA.",
            "Sisi bertentang selari.",
            "Sudut bertentang sama besar.",
            "Pepenjuru berserenjang (bersilang pada 90°).",
            "Pepenjuru saling membahagi dua sama.",
            "Pepenjuru membahagi dua sudut-sudut bucu.",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 2",
        },
        {
          title: "Perbezaan Belah Ketupat vs Segi Empat Sama",
          content:
            "Belah ketupat mempunyai semua sisi sama tetapi sudut TIDAK perlu 90°. Segi empat sama adalah belah ketupat DENGAN sudut 90°.",
          table: {
            headers: ["Ciri", "Belah Ketupat", "Segi Empat Sama"],
            rows: [
              ["Semua sisi sama", "Ya ✓", "Ya ✓"],
              ["Sudut 90°", "Tidak semestinya", "Ya ✓"],
              ["Pepenjuru berserenjang", "Ya ✓", "Ya ✓"],
              ["Garis simetri", "2", "4"],
            ],
          },
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Potongan berlian, hiasan dinding berbentuk wajik dan beberapa jenis lelayang adalah berbentuk belah ketupat.",
        },
      ],
    },
    {
      title: "20. Trapezium",
      subsections: [
        {
          title: "Sifat",
          content:
            "Trapezium ialah sisi empat dengan tepat SATU pasang sisi yang selari. Sisi-sisi yang selari dipanggil tapak atas dan tapak bawah.",
          bulletPoints: [
            "Satu pasang sisi selari (tapak atas dan tapak bawah).",
            "Pasangan sisi yang lain tidak semestinya selari.",
            "Sudut bersebelahan antara sisi selari berjumlah 180°.",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 0 (untuk trapezium biasa), 1 (untuk trapezium sama kaki)",
        },
        {
          title: "Jenis Trapezium",
          content:
            "Trapezium sama kaki: dua kaki (sisi yang tidak selari) adalah sama panjang, mempunyai 1 garis simetri.",
        },
        {
          title: "Visual: Trapezium",
          content:
            "Trapezium ABCD dengan AB ∥ CD. AB ialah tapak atas, CD ialah tapak bawah. Sudut ∠A + ∠D = 180° dan ∠B + ∠C = 180°.",
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Bentuk pentas panggung, keratan rentas terowong, dan pemandangan profil suatu gunung adalah berbentuk trapezium.",
        },
      ],
    },
    {
      title: "21. Lelayang",
      subsections: [
        {
          title: "Sifat",
          content:
            "Lelayang ialah sisi empat dengan DUA pasang sisi bersebelahan yang sama panjang. Sisi-sisi yang sama panjang adalah sisi yang berjiran, bukan bertentangan.",
          bulletPoints: [
            "Dua pasang sisi bersebelahan sama panjang: AB = AD dan CB = CD.",
            "Satu pasang sudut bertentang sama besar: ∠B = ∠D.",
            "Satu pepenjuru membahagi dua pepenjuru yang lain.",
            "Pepenjuru berserenjang (bersilang pada 90°).",
          ],
        },
        {
          title: "Garis Simetri",
          formula: "Bilangan garis simetri = 1",
        },
        {
          title: "Visual: Lelayang",
          content:
            "Lelayang ABCD dengan AB = AD (sisi atas) dan CB = CD (sisi bawah). Pepenjuru AC adalah paksi simetri. AC dan BD berserenjang.",
        },
        {
          title: "Contoh Kehidupan Sebenar",
          content:
            "Lelayang permainan (wau), hiasan berbentuk wajik, dan beberapa jenis perisai adalah berbentuk lelayang.",
        },
      ],
    },
    {
      title: "22. Sifat Sudut Sisi Empat",
      subsections: [
        {
          title: "Hukum 1: Jumlah Sudut Dalam Sisi Empat",
          content:
            "Jumlah keempat-empat sudut dalam mana-mana sisi empat sentiasa 360°.",
          formula: "∠A + ∠B + ∠C + ∠D = 360°",
        },
        {
          title: "Bukti Visual",
          content:
            "Sisi empat boleh dibahagikan kepada DUA segi tiga menggunakan pepenjuru. Setiap segi tiga mempunyai jumlah sudut 180°. Maka jumlah sudut sisi empat = 2 × 180° = 360°.",
          formula: "2 segi tiga × 180° = 360°",
        },
        {
          title: "Contoh 1",
          content:
            "Sisi empat ABCD dengan ∠A = 85°, ∠B = 95°, ∠C = 70°. Cari ∠D.",
          formula: "∠D = 360° − 85° − 95° − 70° = 110°",
        },
        {
          title: "Sudut Dalam Jajaran Genjang",
          content:
            "Dalam jajaran genjang: sudut bertentang adalah sama besar, dan sudut bersebelahan berjumlah 180°.",
          formula: "∠A = ∠C, ∠B = ∠D, ∠A + ∠B = 180°",
        },
        {
          title: "Contoh 2: Jajaran Genjang",
          content:
            "Jajaran genjang ABCD dengan ∠A = 70°. Cari semua sudut lain.",
          formula: "∠C = 70° (bertentang), ∠B = 180° − 70° = 110°, ∠D = 110°",
        },
        {
          title: "Sudut Dalam + Sudut Luar = 180°",
          content:
            "Seperti segi tiga, sudut dalam dan sudut luar bersebelahan pada mana-mana bucu sisi empat berjumlah 180°.",
          formula: "sudut dalam + sudut luar bersebelahan = 180°",
        },
      ],
    },
    {
      title: "23. Aplikasi Dunia Sebenar",
      subsections: [
        {
          title: "Poligon dalam Pembinaan dan Seni Bina",
          content:
            "Poligon digunakan secara meluas dalam reka bentuk bangunan, kejuruteraan dan seni bina. Pemahaman tentang sifat poligon membantu arkitek dan jurutera mereka bentuk struktur yang kuat dan indah.",
        },
        {
          title: "Contoh: Masjid Putra, Putrajaya",
          content:
            "Masjid Putra di Putrajaya menggabungkan pelbagai poligon dalam reka bentuknya — lengkungan berbentuk oktagon, tiang-tiang segi empat sama, dan bahagian kubah yang menggunakan corak poligon. Menara masjid menggunakan bentuk oktagon (8 sisi) yang memberi kekuatan struktur dan keindahan estetik.",
        },
        {
          title: "Segi Tiga dalam Kejuruteraan",
          content:
            "Segi tiga digunakan dalam pembinaan jambatan dan rangka bumbung kerana ia adalah bentuk yang paling tegar. Bentuk segi tiga tidak berubah apabila dikenakan daya, menjadikannya ideal untuk struktur yang memerlukan kekuatan.",
        },
        {
          title: "Segi Empat dalam Kehidupan Harian",
          content:
            "Segi empat tepat: pintu, tingkap, skrin. Segi empat sama: jubin lantai, kepingan roti. Jajaran genjang: reka bentuk mozek. Trapezium: pentas, jambatan gantung.",
        },
        {
          title: "Heksagon dalam Alam Semula Jadi",
          content:
            "Lebah menggunakan heksagon sekata untuk membina sarang madu. Bentuk heksagon memaksimumkan ruang penyimpanan dengan menggunakan lilin paling sedikit. Ini adalah contoh matematik dalam alam semula jadi.",
        },
        {
          title: "Oktagon dalam Keselamatan Jalan Raya",
          content:
            "Papan tanda 'STOP' berwarna merah berbentuk oktagon sekata digunakan di seluruh dunia. Bentuk yang unik ini memudahkan pemandu mengenal pasti papan tanda dengan cepat.",
        },
      ],
    },
    {
      title: "24. Ringkasan Bab",
      subsections: [
        {
          title: "Nama dan Ciri Poligon",
          table: {
            headers: ["Poligon", "Sisi", "Pepenjuru", "Garis Simetri (Sekata)"],
            rows: [
              ["Segi tiga", "3", "0", "3 (sama sisi)"],
              ["Sisi empat", "4", "2", "4 (segi empat sama)"],
              ["Pentagon", "5", "5", "5 (sekata)"],
              ["Heksagon", "6", "9", "6 (sekata)"],
              ["Oktagon", "8", "20", "8 (sekata)"],
            ],
          },
        },
        {
          title: "Jenis Segi Tiga",
          table: {
            headers: ["Jenis", "Sisi", "Sudut", "Simetri"],
            rows: [
              ["Sama sisi", "3 sama", "Semua 60°", "3"],
              ["Sama kaki", "2 sama", "2 tapak sama", "1"],
              ["Tak sama kaki", "Semua ≠", "Semua ≠", "0"],
              ["Bersudut tirus", "—", "Semua < 90°", "—"],
              ["Bersudut cakah", "—", "Satu > 90°", "—"],
              ["Bersudut tegak", "—", "Satu = 90°", "—"],
            ],
          },
        },
        {
          title: "Sifat Sisi Empat",
          table: {
            headers: ["Jenis", "Sisi Sama", "Selari", "Sudut 90°", "Pepenjuru ⊥", "Simetri"],
            rows: [
              ["Segi empat tepat", "Bertentang", "2 pasang", "Ya", "Tidak", "2"],
              ["Segi empat sama", "Semua", "2 pasang", "Ya", "Ya", "4"],
              ["Jajaran genjang", "Bertentang", "2 pasang", "Tidak", "Tidak", "0"],
              ["Belah ketupat", "Semua", "2 pasang", "Tidak", "Ya", "2"],
              ["Trapezium", "—", "1 pasang", "Tidak", "Tidak", "0"],
              ["Lelayang", "2 pasang berjiran", "Tidak", "Tidak", "Ya", "1"],
            ],
          },
        },
        {
          title: "Formula Penting",
          table: {
            headers: ["Formula", "Nilai"],
            rows: [
              ["Pepenjuru", "n(n − 3) / 2"],
              ["Sudut dalam segi tiga", "180°"],
              ["Sudut dalam sisi empat", "360°"],
              ["Sudut luar segi tiga", "= jumlah 2 sudut dalam berhadapan"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Poligon ialah bentuk 2D tertutup dengan 3 atau lebih sisi lurus. Bilangan bucu = bilangan sisi.",
    "Formula pepenjuru: n(n − 3) / 2. Segi tiga = 0, sisi empat = 2, pentagon = 5.",
    "Segi tiga sama sisi: semua sisi sama, semua sudut 60°, 3 garis simetri.",
    "Segi tiga sama kaki: 2 sisi sama, 2 sudut tapak sama, 1 garis simetri.",
    "Jumlah sudut dalam segi tiga = 180°. Sudut luar = jumlah 2 sudut dalam berhadapan.",
    "Jumlah sudut dalam sisi empat = 360°.",
    "Segi empat sama: semua sisi sama, semua sudut 90°, pepenjuru berserenjang, 4 garis simetri.",
    "Jajaran genjang: sisi bertentang selari dan sama, sudut bertentang sama, tiada garis simetri.",
    "Belah ketupat: semua sisi sama, pepenjuru berserenjang, 2 garis simetri.",
    "Trapezium: SATU pasang sisi selari. Lelayang: DUA pasang sisi BERSEBELAHAN sama, 1 garis simetri.",
  ],
  keyTerms: [
    "Poligon — Bentuk 2D tertutup dengan 3+ sisi lurus",
    "Bucu — Titik sudut di mana dua sisi bertemu",
    "Pepenjuru — Garis menghubungkan dua bucu tidak bersebelahan",
    "Segi Tiga Sama Sisi — 3 sisi sama, semua sudut 60°",
    "Segi Tiga Sama Kaki — 2 sisi sama, 2 sudut tapak sama",
    "Segi Tiga Tak Sama Kaki — Semua sisi dan sudut berbeza",
    "Segi Tiga Bersudut Tegak — Satu sudut = 90°, ada hipotenus",
    "Hipotenus — Sisi terpanjang segi tiga bersudut tegak",
    "Sisi Empat — Poligon dengan 4 sisi",
    "Segi Empat Tepat — 4 sudut 90°, sisi bertentang sama",
    "Segi Empat Sama — 4 sisi sama, 4 sudut 90°, pepenjuru berserenjang",
    "Jajaran Genjang — 2 pasang sisi selari, sudut bertentang sama",
    "Belah Ketupat — 4 sisi sama, pepenjuru berserenjang",
    "Trapezium — Satu pasang sisi selari",
    "Lelayang — 2 pasang sisi bersebelahan sama, pepenjuru berserenjang",
    "Garis Simetri — Garis yang membahagi bentuk kepada dua bahagian cermin",
  ],
};
