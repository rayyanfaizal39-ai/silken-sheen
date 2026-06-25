import type { StructuredNotes } from "@/data/types";

export const mathF2C9NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 9 Laju dan Pecutan membantu murid memahami konsep laju, laju purata serta pecutan dan nyahpecutan dalam kehidupan harian, termasuk cara menukar unit antara km/h dan m/s serta menyelesaikan masalah yang melibatkan jarak, masa, halaju dan pecutan.",
  quickRevision: [
    "Laju = jarak yang dilalui / masa yang diambil.",
    "Laju purata = jumlah jarak / jumlah masa, BUKAN purata beberapa nilai laju.",
    "Pecutan = perubahan laju / masa yang diambil.",
    "Nyahpecutan ialah pecutan negatif, iaitu laju berkurang dengan masa.",
    "1 km/h = 1000/3600 m/s; 1 m/s = 3600/1000 km/h.",
    "Unit piawai laju ialah m/s atau km/h; unit piawai pecutan ialah m/s².",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan maksud laju sebagai kadar perubahan jarak.",
            "Membuat kaitan antara laju, jarak dan masa.",
            "Menentukan laju purata dalam pelbagai situasi.",
            "Menyelesaikan masalah yang melibatkan laju dan laju purata.",
            "Menerangkan maksud pecutan sebagai kadar perubahan laju.",
            "Membuat kaitan antara pecutan, perubahan laju dan masa.",
            "Menyelesaikan masalah yang melibatkan pecutan dan nyahpecutan.",
          ],
        },
      ],
    },
    {
      title: "9.1 Laju",
      subsections: [
        {
          title: "Definisi",
          content:
            "Laju ialah kadar perubahan jarak terhadap masa, iaitu ukuran kepantasan sesuatu objek bergerak. Laju ialah kuantiti skalar (hanya mempunyai magnitud, tanpa arah).",
        },
        {
          title: "Formula",
          formula: "Laju = Jarak / Masa\n\nJarak = Laju x Masa\nMasa = Jarak / Laju",
        },
        {
          title: "Unit Laju",
          table: {
            headers: ["Unit Jarak", "Unit Masa", "Unit Laju"],
            rows: [
              ["meter (m)", "saat (s)", "meter per saat (m/s)"],
              ["kilometer (km)", "jam (h)", "kilometer per jam (km/h)"],
            ],
          },
        },
        {
          title: "Penukaran Unit km/h ke m/s",
          content:
            "1 km = 1000 m dan 1 jam = 3600 saat. Untuk menukar km/h kepada m/s, darab dengan 1000 dan bahagi dengan 3600 (iaitu darab dengan 5/18).",
          formula: "km/h ke m/s: darab dengan (1000/3600) = 5/18\nm/s ke km/h: darab dengan (3600/1000) = 18/5",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah kereta bergerak sejauh 150 km dalam masa 3 jam. Hitung laju kereta itu dalam km/h.\nPenyelesaian: Laju = Jarak / Masa = 150 km / 3 h\nJawapan: Laju = 50 km/h",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Tukarkan 72 km/h kepada m/s.\nPenyelesaian: 72 km/h = 72 x (1000/3600) m/s = 72 x (5/18) m/s = 20 m/s\nJawapan: 72 km/h = 20 m/s",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Laju ialah kuantiti skalar, tidak melibatkan arah.",
            "Laju seragam (tetap) bermaksud objek bergerak dengan laju yang sama pada setiap saat.",
            "Laju boleh berubah dari semasa ke semasa; laju pada satu saat tertentu dipanggil laju seketika.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Lupa menukar unit jarak dan masa kepada unit yang sepadan sebelum mengira laju.",
            "Tersilap darab/bahagi semasa menukar km/h ke m/s (gunakan 1000/3600, bukan 3600/1000).",
            "Mengelirukan laju dengan jarak atau masa dalam formula.",
          ],
        },
      ],
    },
    {
      title: "9.2 Laju Purata",
      subsections: [
        {
          title: "Definisi",
          content:
            "Laju purata ialah jumlah keseluruhan jarak yang dilalui dibahagikan dengan jumlah keseluruhan masa yang diambil bagi keseluruhan perjalanan, walaupun laju berubah-ubah sepanjang perjalanan itu.",
        },
        {
          title: "Formula",
          formula:
            "Laju Purata = Jumlah Jarak / Jumlah Masa\n\nJumlah Jarak = Jarak 1 + Jarak 2 + ...\nJumlah Masa = Masa 1 + Masa 2 + ...",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Ahmad memandu 80 km dalam masa 1 jam, kemudian memandu 60 km lagi dalam masa 2 jam. Hitung laju purata bagi keseluruhan perjalanan.\nPenyelesaian: Jumlah jarak = 80 + 60 = 140 km\nJumlah masa = 1 + 2 = 3 jam\nLaju Purata = 140 / 3\nJawapan: Laju purata = 46.67 km/h (2 d.p.)",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah bas bergerak dengan laju 40 km/h selama 2 jam, kemudian berhenti rehat selama 30 minit, dan bergerak lagi dengan laju 60 km/h selama 1 jam. Hitung laju purata bagi seluruh perjalanan (termasuk masa rehat).\nPenyelesaian: Jarak 1 = 40 x 2 = 80 km\nJarak 2 = 60 x 1 = 60 km\nJumlah jarak = 80 + 60 = 140 km\nJumlah masa = 2 + 0.5 + 1 = 3.5 jam\nLaju Purata = 140 / 3.5\nJawapan: Laju purata = 40 km/h",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Laju purata MESTI dikira menggunakan jumlah jarak dibahagi jumlah masa, bukan purata aritmetik nilai-nilai laju.",
            "Masa rehat atau masa berhenti juga dikira sebagai sebahagian daripada jumlah masa perjalanan jika soalan menyatakan demikian.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengira laju purata dengan menambah dua nilai laju dan membahagi dengan 2 (ini SALAH jika tempoh masa bagi setiap bahagian perjalanan tidak sama).",
            "Terlupa memasukkan masa rehat/berhenti ke dalam jumlah masa apabila soalan memerlukannya.",
            "Tersilap menggunakan jarak satu bahagian perjalanan sahaja dan bukan jumlah jarak keseluruhan.",
          ],
        },
      ],
    },
    {
      title: "9.3 Pecutan dan Nyahpecutan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pecutan ialah kadar perubahan laju (atau halaju) terhadap masa. Jika laju objek bertambah, objek itu mengalami pecutan positif (memecut). Jika laju objek berkurang, objek itu mengalami pecutan negatif, yang dipanggil nyahpecutan (menyahpecut).",
        },
        {
          title: "Formula",
          formula:
            "Pecutan = (Laju Akhir - Laju Awal) / Masa\na = (v - u) / t\n\ndi mana:\nu = laju awal\nv = laju akhir\nt = masa yang diambil",
        },
        {
          title: "Unit Pecutan",
          content:
            "Oleh sebab pecutan ialah perubahan laju (m/s) dibahagi masa (s), unit piawai pecutan ialah meter per saat kuasa dua (m/s²).",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah kereta mula bergerak dari keadaan rehat dan mencapai laju 20 m/s dalam masa 4 saat. Hitung pecutan kereta itu.\nPenyelesaian: Laju awal, u = 0 m/s (keadaan rehat)\nLaju akhir, v = 20 m/s\nMasa, t = 4 s\na = (v - u) / t = (20 - 0) / 4\nJawapan: Pecutan = 5 m/s²",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah motosikal bergerak dengan laju 25 m/s. Selepas 5 saat membrek, laju motosikal itu berkurang kepada 5 m/s. Hitung nyahpecutan motosikal itu.\nPenyelesaian: Laju awal, u = 25 m/s\nLaju akhir, v = 5 m/s\nMasa, t = 5 s\na = (v - u) / t = (5 - 25) / 5 = -20 / 5\nJawapan: Pecutan = -4 m/s² (nyahpecutan = 4 m/s²)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Pecutan positif menunjukkan laju bertambah; pecutan negatif (nyahpecutan) menunjukkan laju berkurang.",
            "Jika laju adalah malar (tidak berubah), pecutan objek itu adalah sifar.",
            "Tanda negatif pada pecutan menunjukkan arah perubahan laju, bukan magnitud yang lebih kecil semata-mata.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan pecutan dengan laju — pecutan ialah KADAR PERUBAHAN laju, bukan laju itu sendiri.",
            "Tersilap tanda apabila laju berkurang; lupa bahawa nyahpecutan dilambangkan dengan nilai negatif bagi pecutan.",
            "Lupa menukar unit laju kepada unit yang sama (contohnya km/h ke m/s) sebelum mengira pecutan dalam m/s².",
            "Tersilap formula iaitu menggunakan (u - v) bukan (v - u).",
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
            "Laju ialah kadar perubahan jarak terhadap masa: Laju = Jarak / Masa.",
            "Laju purata = Jumlah Jarak / Jumlah Masa (bukan purata nilai laju).",
            "Pecutan ialah kadar perubahan laju terhadap masa: a = (v - u) / t.",
            "Nyahpecutan ialah pecutan bertanda negatif, menunjukkan laju berkurang.",
            "1 km/h = 5/18 m/s; 1 m/s = 18/5 km/h.",
          ],
          table: {
            headers: ["Kuantiti", "Formula", "Unit Piawai"],
            rows: [
              ["Laju", "Jarak / Masa", "m/s atau km/h"],
              ["Laju Purata", "Jumlah Jarak / Jumlah Masa", "m/s atau km/h"],
              ["Pecutan", "(v - u) / t", "m/s²"],
            ],
          },
        },
        {
          title: "Formula Penting",
          formula:
            "Laju = Jarak / Masa\nLaju Purata = Jumlah Jarak / Jumlah Masa\nPecutan, a = (v - u) / t\nkm/h ke m/s: x (1000/3600)\nm/s ke km/h: x (3600/1000)",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa semak unit dalam soalan — tukar ke unit yang sama sebelum mengira.",
            "Untuk laju purata, kira JUMLAH jarak dan JUMLAH masa dahulu sebelum membahagi.",
            "Untuk pecutan, kenal pasti dengan jelas laju awal (u) dan laju akhir (v) sebelum menggantikan ke dalam formula.",
            "Jawapan pecutan negatif bermaksud nyahpecutan — nyatakan magnitud dan terangkan maksudnya jika diminta.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Laju = Jarak / Masa; unit piawai ialah m/s atau km/h.",
    "Laju purata = Jumlah Jarak / Jumlah Masa, bukan purata aritmetik nilai laju.",
    "Pecutan = (Laju Akhir - Laju Awal) / Masa = (v - u) / t; unit piawai ialah m/s².",
    "Nyahpecutan ialah pecutan negatif, iaitu laju objek berkurang dengan masa.",
    "1 km/h = 1000/3600 m/s = 5/18 m/s.",
    "Pecutan sifar bermaksud laju objek malar (tetap).",
  ],
  keyTerms: [
    "Laju",
    "Laju purata",
    "Laju seragam",
    "Laju seketika",
    "Pecutan",
    "Nyahpecutan",
    "Jarak",
    "Masa",
    "Halaju awal (u)",
    "Halaju akhir (v)",
  ],
};
