import type { StructuredNotes } from "@/data/types";

export const mathF2C5NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 5 Bulatan membantu murid memahami sifat-sifat bulatan, sifat simetri perentas, serta cara mengira lilitan dan luas bulatan menggunakan nilai π.",
  quickRevision: [
    "Bulatan ialah set semua titik yang berjarak sama (jejari) daripada satu titik tetap (pusat).",
    "Diameter = 2 x jejari, iaitu perentas terpanjang yang melalui pusat bulatan.",
    "Garis lurus dari pusat yang berserenjang dengan perentas akan membahagi perentas itu sama dua.",
    "Lilitan bulatan = πd atau 2πr; Luas bulatan = πr².",
    "Gunakan π ≈ 3.142 atau 22/7 mengikut kesesuaian nombor dalam soalan.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti bahagian-bahagian bulatan seperti pusat, jejari, diameter, perentas, lengkok, sektor dan tembereng.",
            "Membuat kesimpulan tentang sifat simetri perentas bulatan.",
            "Menentukan lilitan dan luas bulatan serta menyelesaikan masalah yang berkaitan.",
          ],
        },
      ],
    },
    {
      title: "5.1 Sifat Bulatan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Bulatan ialah set semua titik pada satah yang mempunyai jarak yang sama daripada satu titik tetap yang dipanggil pusat bulatan. Jarak tetap itu dipanggil jejari.",
        },
        {
          title: "Bahagian-bahagian Bulatan",
          table: {
            headers: ["Bahagian", "Maksud"],
            rows: [
              ["Pusat (O)", "Titik tetap di tengah-tengah bulatan"],
              ["Jejari (r)", "Garis lurus dari pusat ke mana-mana titik pada lilitan bulatan"],
              ["Diameter (d)", "Perentas terpanjang yang melalui pusat; d = 2r"],
              ["Perentas", "Garis lurus yang menyambung dua titik pada lilitan bulatan"],
              ["Lengkok", "Sebahagian daripada lilitan bulatan"],
              ["Sektor", "Kawasan yang dibatasi oleh dua jejari dan satu lengkok"],
              ["Tembereng", "Kawasan yang dibatasi oleh satu perentas dan satu lengkok"],
              ["Lilitan", "Jarak sekeliling bulatan (perimeter bulatan)"],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Nyatakan nama bahagian bulatan bagi setiap penerangan berikut: (a) Garis yang menyambung pusat ke lilitan bulatan. (b) Kawasan yang dibatasi oleh dua jejari dan satu lengkok.\nPenyelesaian: (a) Garis ini bermula dari pusat dan tamat di lilitan bulatan, jadi ia ialah jejari. (b) Kawasan ini dibatasi oleh dua jejari dan satu lengkok, jadi ia ialah sektor.\nJawapan: (a) Jejari (b) Sektor",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Jika diameter sebuah bulatan ialah 14 cm, berapakah jejarinya?\nPenyelesaian: Diameter = 2 x jejari, maka jejari = diameter ÷ 2 = 14 ÷ 2.\nJawapan: 7 cm",
        },
        {
          title: "Formula",
          formula: "d = 2r\nr = d ÷ 2",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Semua jejari dalam bulatan yang sama mempunyai panjang yang sama.",
            "Diameter ialah perentas yang melalui pusat dan merupakan perentas terpanjang dalam bulatan.",
            "Sektor major lebih besar daripada separuh bulatan, sektor minor lebih kecil daripada separuh bulatan.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan jejari dengan diameter semasa membuat pengiraan.",
            "Menganggap semua perentas adalah diameter, walhal hanya perentas yang melalui pusat ialah diameter.",
            "Tersalah label sektor dan tembereng kerana kedua-duanya kawasan dalam bulatan.",
          ],
        },
      ],
    },
    {
      title: "5.2 Sifat Simetri Perentas",
      subsections: [
        {
          title: "Definisi",
          content:
            "Sifat simetri perentas menerangkan hubungan antara perentas bulatan dengan garis yang melalui pusat bulatan, terutamanya garis yang berserenjang dengan perentas tersebut.",
        },
        {
          title: "Sifat-sifat Utama",
          bulletPoints: [
            "Garis lurus yang melalui pusat bulatan dan berserenjang dengan perentas akan membahagi perentas itu sama dua (membahagi dua sama panjang).",
            "Garis lurus yang melalui pusat bulatan dan membahagi dua sama panjang suatu perentas adalah berserenjang dengan perentas itu.",
            "Perentas-perentas yang sama panjang berada pada jarak yang sama dari pusat bulatan.",
            "Perentas-perentas yang berada pada jarak yang sama dari pusat bulatan mempunyai panjang yang sama.",
          ],
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Dalam sebuah bulatan berpusat O, perentas AB mempunyai panjang 16 cm. Garis OM berserenjang dengan AB di titik M. Berapakah panjang AM?\nPenyelesaian: Oleh kerana OM berserenjang dengan perentas AB dan melalui pusat O, OM membahagi AB sama dua. Maka AM = AB ÷ 2 = 16 ÷ 2.\nJawapan: 8 cm",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Jejari sebuah bulatan ialah 10 cm. Satu perentas berada pada jarak 6 cm daripada pusat O. Cari panjang perentas tersebut.\nPenyelesaian: Bina garis berserenjang dari O ke perentas, bertemu di titik M. Segitiga OAM ialah segitiga bersudut tegak dengan OA = 10 cm (jejari) dan OM = 6 cm. Gunakan Teorem Pythagoras: AM² = OA² - OM² = 10² - 6² = 100 - 36 = 64, maka AM = 8 cm. Oleh kerana OM membahagi perentas sama dua, panjang penuh perentas = 2 x AM = 2 x 8.\nJawapan: 16 cm",
        },
        {
          title: "Formula",
          formula: "AM² = OA² - OM²  (Teorem Pythagoras dalam segitiga tegak OAM)\nPanjang perentas = 2 x AM",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Garis dari pusat yang berserenjang dengan perentas selalu membentuk dua segitiga bersudut tegak yang sama saiz (kongruen).",
            "Teorem Pythagoras sering digunakan bersama sifat simetri perentas untuk mencari panjang yang tidak diketahui.",
            "Jejari yang sampai ke hujung perentas akan menjadi hipotenus segitiga bersudut tegak tersebut.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Lupa bahawa garis berserenjang dari pusat MESTI melalui pusat untuk membahagi perentas sama dua.",
            "Tersalah kenal pasti sisi hipotenus apabila menggunakan Teorem Pythagoras.",
            "Lupa mendarab dua kali (x2) selepas mengira separuh panjang perentas untuk mendapatkan panjang penuh.",
          ],
        },
      ],
    },
    {
      title: "5.3 Lilitan dan Luas Bulatan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Lilitan bulatan ialah jarak sekeliling bulatan, manakala luas bulatan ialah ukuran kawasan yang diliputi oleh bulatan tersebut. Kedua-duanya dikira menggunakan pemalar π (pi).",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah bulatan mempunyai jejari 7 cm. Hitung lilitan bulatan tersebut. (Guna π = 22/7)\nPenyelesaian: Lilitan = 2πr = 2 x 22/7 x 7 = 2 x 22 = 44.\nJawapan: 44 cm",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah bulatan mempunyai diameter 20 cm. Hitung luas bulatan tersebut. (Guna π = 3.142)\nPenyelesaian: Jejari, r = diameter ÷ 2 = 20 ÷ 2 = 10 cm. Luas = πr² = 3.142 x 10² = 3.142 x 100.\nJawapan: 314.2 cm²",
        },
        {
          title: "Formula",
          formula: "Lilitan = 2πr atau πd\nLuas = πr²\nπ ≈ 3.142 atau 22/7",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Gunakan π = 22/7 jika jejari atau diameter adalah gandaan 7 untuk pengiraan yang lebih mudah dan tepat.",
            "Gunakan π = 3.142 untuk nombor perpuluhan atau apabila soalan menyatakan secara khusus.",
            "Sentiasa kuasa duakan jejari (r²) dahulu sebelum mendarab dengan π semasa mencari luas.",
            "Unit lilitan ialah unit panjang (cm, m), manakala unit luas ialah unit panjang kuasa dua (cm², m²).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Lupa menukar diameter kepada jejari sebelum menggunakan formula luas πr².",
            "Hanya mendarab r dengan π tanpa menguasaduakan r semasa mengira luas (formula tersalah guna sebagai πr).",
            "Tersalah guna nilai π (3.142 atau 22/7) yang menyebabkan jawapan tidak tepat atau sukar dipermudahkan.",
            "Tertinggal unit kuasa dua (²) bagi jawapan luas.",
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
            "Bulatan mempunyai pusat, jejari, diameter, perentas, lengkok, sektor dan tembereng.",
            "Garis berserenjang dari pusat ke perentas membahagi perentas itu sama dua.",
            "Lilitan bulatan = 2πr atau πd.",
            "Luas bulatan = πr².",
          ],
        },
        {
          title: "Formula Penting",
          formula: "d = 2r\nLilitan = 2πr = πd\nLuas = πr²\nπ ≈ 3.142 atau 22/7",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa kenal pasti sama ada nilai yang diberi ialah jejari atau diameter sebelum mengira.",
            "Pilih nilai π yang memudahkan pengiraan berdasarkan nombor dalam soalan.",
            "Lukis gambar rajah bulatan untuk membantu mengenal pasti perentas, jejari dan sudut berserenjang.",
            "Semak semula unit jawapan: panjang (cm/m) untuk lilitan, luas (cm²/m²) untuk luas.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Diameter = 2 x jejari.",
    "Garis dari pusat yang berserenjang dengan perentas membahagi perentas itu sama dua, dan sebaliknya.",
    "Perentas yang sama panjang berada pada jarak yang sama dari pusat.",
    "Lilitan bulatan = 2πr atau πd.",
    "Luas bulatan = πr², dengan jejari mesti dikuasaduakan dahulu.",
    "Gunakan π = 22/7 untuk nombor gandaan 7, dan π = 3.142 untuk nombor perpuluhan.",
  ],
  keyTerms: [
    "Bulatan",
    "Pusat",
    "Jejari",
    "Diameter",
    "Perentas",
    "Lengkok",
    "Sektor",
    "Tembereng",
    "Lilitan",
    "Luas bulatan",
    "Pi (π)",
  ],
};
