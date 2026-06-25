import type { StructuredNotes } from "@/data/types";

export const mathF2C4NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 4 Poligon membincangkan sifat-sifat poligon sekata, jumlah sudut peluaran dan sudut peluaran poligon, serta cara mengira sudut pedalaman dan sudut peluaran bagi poligon sekata dan poligon tidak sekata.",
  quickRevision: [
    "Poligon sekata mempunyai semua sisi sama panjang dan semua sudut sama besar.",
    "Jumlah sudut pedalaman poligon = (n - 2) x 180°, dengan n ialah bilangan sisi.",
    "Jumlah sudut peluaran poligon cembung = 360°, tidak kira berapa banyak sisi.",
    "Sudut pedalaman + Sudut peluaran bersebelahan = 180° (sudut pelengkap bersama).",
    "Sudut pedalaman setiap poligon sekata = (n - 2) x 180° ÷ n.",
    "Sudut peluaran setiap poligon sekata = 360° ÷ n.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan menerangkan sifat poligon sekata.",
            "Membuat generalisasi tentang jumlah sudut pedalaman poligon.",
            "Membuat generalisasi tentang jumlah sudut peluaran poligon cembung.",
            "Menentukan sudut pedalaman dan sudut peluaran poligon sekata.",
            "Menyelesaikan masalah yang melibatkan poligon.",
          ],
        },
      ],
    },
    {
      title: "4.1 Poligon Sekata",
      subsections: [
        {
          title: "Definisi",
          content:
            "Poligon ialah bentuk geometri tertutup yang dibentuk oleh tiga atau lebih sisi garis lurus. Poligon sekata (regular polygon) ialah poligon yang semua sisinya sama panjang dan semua sudut pedalamannya sama besar. Poligon yang tidak memenuhi kedua-dua syarat ini dipanggil poligon tidak sekata.",
        },
        {
          title: "Nama Poligon Mengikut Bilangan Sisi",
          table: {
            headers: ["Bilangan Sisi (n)", "Nama Poligon"],
            rows: [
              ["3", "Segitiga"],
              ["4", "Sisi Empat"],
              ["5", "Pentagon"],
              ["6", "Heksagon"],
              ["7", "Heptagon"],
              ["8", "Oktagon"],
              ["9", "Nonagon"],
              ["10", "Dekagon"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Nyatakan sama ada segitiga sama sisi dan segiempat tepat adalah poligon sekata.\nPenyelesaian: Segitiga sama sisi mempunyai tiga sisi sama panjang dan tiga sudut sama besar (60° setiap satu), maka ia poligon sekata. Segiempat tepat mempunyai semua sudut sama besar (90°) tetapi sisi-sisinya tidak semestinya sama panjang, maka ia BUKAN poligon sekata (kecuali jika ia segiempat sama/persegi).\nJawapan: Segitiga sama sisi ialah poligon sekata; segiempat tepat biasa bukan poligon sekata.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Poligon sekata mestilah memenuhi DUA syarat serentak: sisi sama panjang DAN sudut sama besar.",
            "Persegi (square) ialah poligon sekata bagi sisi empat.",
            "Segiempat sama sisi (rhombus) bukan poligon sekata kerana sudutnya tidak sama besar.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menganggap semua segiempat tepat adalah poligon sekata kerana sudutnya sama besar — sisi mesti sama panjang juga.",
            "Mengelirukan poligon sekata dengan poligon cembung; kedua-duanya konsep berbeza.",
          ],
        },
      ],
    },
    {
      title: "4.2 Sudut Pedalaman dan Sudut Peluaran Poligon",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sudut pedalaman (interior angle) ialah sudut yang terbentuk di dalam poligon antara dua sisi bersebelahan. Sudut peluaran (exterior angle) ialah sudut yang terbentuk antara satu sisi poligon dengan sambungan sisi bersebelahan di luar poligon. Sudut pedalaman dan sudut peluaran pada bucu yang sama adalah sudut pelengkap bersama (jumlahnya 180°).",
        },
        {
          title: "Formula",
          formula:
            "Jumlah sudut pedalaman poligon = (n - 2) x 180°\nSudut pedalaman setiap poligon sekata = [(n - 2) x 180°] ÷ n\nJumlah sudut peluaran poligon cembung = 360°\nSudut peluaran setiap poligon sekata = 360° ÷ n\nSudut pedalaman + Sudut peluaran bersebelahan = 180°",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Hitung jumlah sudut pedalaman bagi heksagon (poligon bersisi 6).\nPenyelesaian: Jumlah sudut pedalaman = (n - 2) x 180° = (6 - 2) x 180° = 4 x 180°\nJawapan: 720°",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah poligon sekata mempunyai 9 sisi (nonagon sekata). Hitung (a) sudut pedalaman setiap satu, dan (b) sudut peluaran setiap satu.\nPenyelesaian:\n(a) Sudut pedalaman = [(n - 2) x 180°] ÷ n = [(9 - 2) x 180°] ÷ 9 = (7 x 180°) ÷ 9 = 1260° ÷ 9 = 140°\n(b) Sudut peluaran = 360° ÷ n = 360° ÷ 9 = 40°\nSemak: 140° + 40° = 180° (sudut pelengkap bersama, betul).\nJawapan: (a) 140° (b) 40°",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Sudut peluaran sebuah poligon sekata ialah 24°. Berapakah bilangan sisi poligon itu?\nPenyelesaian: Sudut peluaran = 360° ÷ n, maka n = 360° ÷ Sudut peluaran = 360° ÷ 24°\nJawapan: n = 15 sisi (poligon itu ialah pentadekagon sekata)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jumlah sudut peluaran poligon cembung SENTIASA 360°, tidak kira jenis atau bilangan sisinya.",
            "Bagi poligon sekata, semua sudut pedalaman sama besar dan semua sudut peluaran sama besar.",
            "Gunakan sudut peluaran untuk mencari bilangan sisi dengan cepat: n = 360° ÷ sudut peluaran.",
            "Sudut pedalaman poligon sekata bertambah besar apabila bilangan sisi bertambah.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa tolak 2 dalam formula (n - 2) x 180° apabila mengira jumlah sudut pedalaman.",
            "Mengelirukan formula sudut pedalaman dengan formula sudut peluaran — sudut peluaran TIDAK dibahagi dengan (n - 2).",
            "Lupa bahawa jumlah sudut peluaran sentiasa 360° walau apa pun bilangan sisi poligon.",
            "Tersilap menggunakan jumlah sudut pedalaman sebagai sudut bagi SATU bucu sahaja, tanpa membahagikan dengan n untuk poligon sekata.",
          ],
        },
      ],
    },
    {
      title: "Ringkasan Bab",
      subsections: [
        {
          title: "Mesti Tahu",
          bulletPoints: [
            "Poligon sekata: semua sisi sama panjang dan semua sudut sama besar.",
            "Jumlah sudut pedalaman = (n - 2) x 180°.",
            "Jumlah sudut peluaran poligon cembung = 360°.",
            "Sudut pedalaman dan sudut peluaran bersebelahan adalah pelengkap bersama (jumlah 180°).",
          ],
        },
        {
          title: "Formula Penting",
          formula:
            "Jumlah sudut pedalaman = (n - 2) x 180°\nSudut pedalaman poligon sekata = [(n - 2) x 180°] ÷ n\nJumlah sudut peluaran = 360°\nSudut peluaran poligon sekata = 360° ÷ n",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Jika diberi bilangan sisi, cari sudut pedalaman/peluaran terus menggunakan formula.",
            "Jika diberi satu sudut, gunakan formula secara songsang untuk cari n (bilangan sisi).",
            "Sentiasa semak jawapan: sudut pedalaman + sudut peluaran bersebelahan mesti = 180°.",
            "Lukis gambar rajah ringkas untuk poligon supaya tidak keliru antara sudut pedalaman dan sudut peluaran.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Poligon sekata mempunyai semua sisi sama panjang DAN semua sudut sama besar.",
    "Jumlah sudut pedalaman poligon = (n - 2) x 180°.",
    "Jumlah sudut peluaran poligon cembung = 360°, tanpa mengira bilangan sisi.",
    "Sudut pedalaman setiap poligon sekata = [(n - 2) x 180°] ÷ n.",
    "Sudut peluaran setiap poligon sekata = 360° ÷ n.",
    "Sudut pedalaman + sudut peluaran bersebelahan = 180°.",
    "Bilangan sisi poligon sekata = 360° ÷ sudut peluaran.",
  ],
  keyTerms: [
    "Poligon",
    "Poligon sekata",
    "Poligon tidak sekata",
    "Sudut pedalaman",
    "Sudut peluaran",
    "Sudut pelengkap bersama",
    "Bucu",
    "Heksagon",
    "Nonagon",
  ],
};
