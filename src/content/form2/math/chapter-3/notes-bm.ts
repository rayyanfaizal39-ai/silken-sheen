import type { StructuredNotes } from "@/data/types";

export const mathF2C3NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 3 Formula Algebra membimbing murid menulis formula daripada situasi harian, mengubah subjek formula, dan menentukan nilai pembolehubah melalui penggantian nilai.",
  quickRevision: [
    "Formula ialah persamaan yang menunjukkan hubungan antara dua atau lebih pembolehubah.",
    "Subjek formula ialah pembolehubah bersendirian di sebelah kiri tanda '='.",
    "Untuk mengubah subjek formula, lakukan operasi songsang yang sama pada kedua-dua belah formula.",
    "Apabila punca kuasa dua diambil, pertimbangkan nilai positif dan negatif (±) jika sesuai mengikut konteks soalan.",
    "Gantikan nilai pembolehubah yang diketahui ke dalam formula untuk mencari nilai pembolehubah yang belum diketahui.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menulis formula bagi sesuatu situasi.",
            "Mengubah subjek formula yang melibatkan operasi asas, kuasa dan punca kuasa.",
            "Menentukan nilai suatu pembolehubah apabila nilai pembolehubah lain diberikan.",
          ],
        },
      ],
    },
    {
      title: "3.1 Menulis Formula",
      subsections: [
        {
          title: "Definisi",
          content:
            "Formula ialah satu persamaan yang menyatakan hubungan antara dua atau lebih pembolehubah dalam sesuatu situasi. Formula ditulis dengan satu pembolehubah (subjek formula) di sebelah kiri tanda '=' dan pembolehubah lain serta nombor di sebelah kanan.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan:\nSebuah kereta bergerak dengan kelajuan malar v km/j selama t jam. Tulis formula bagi jarak, s km, yang dilalui kereta itu.\nPenyelesaian:\nJarak = Kelajuan x Masa\ns = v x t\nJawapan:\ns = vt",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan:\nHarga sebiji epal ialah RM x dan harga sebiji oren ialah RM y. Ali membeli 3 biji epal dan 2 biji oren. Tulis formula bagi jumlah wang, RM J, yang dibelanjakan oleh Ali.\nPenyelesaian:\nJumlah wang = (Bilangan epal x Harga seepal) + (Bilangan oren x Harga seoren)\nJ = 3x + 2y\nJawapan:\nJ = 3x + 2y",
        },
        {
          title: "Formula",
          formula: "Pembolehubah bersandar = ungkapan dalam pembolehubah tak bersandar\nContoh: s = vt",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kenal pasti pembolehubah yang terlibat dan unit masing-masing.",
            "Tentukan pembolehubah yang menjadi subjek formula (biasanya kuantiti yang ingin dicari).",
            "Pastikan hubungan matematik (tambah, tolak, darab, bahagi) sepadan dengan situasi sebenar.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tersilap menentukan operasi yang sesuai (contohnya darab dengan tolak).",
            "Terlupa memasukkan pekali yang betul (contohnya bilangan item).",
            "Mencampuradukkan unit yang berbeza tanpa penyelarasan (contohnya meter dengan kilometer).",
          ],
        },
      ],
    },
    {
      title: "3.2 Mengubah Subjek Formula: Operasi Asas",
      subsections: [
        {
          title: "Definisi",
          content:
            "Mengubah subjek formula bermaksud menulis semula formula supaya pembolehubah lain menjadi subjek (di sebelah kiri tanda '='). Operasi songsang yang sama mesti dilakukan pada kedua-dua belah formula untuk mengekalkan kesamaan.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan:\nDiberi formula v = u + at. Ubah subjek formula kepada a.\nPenyelesaian:\nv = u + at\nv - u = at  (tolak u daripada kedua-dua belah)\n(v - u) / t = a  (bahagi kedua-dua belah dengan t)\nJawapan:\na = (v - u) / t",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan:\nDiberi formula P = 2(l + b). Ubah subjek formula kepada b.\nPenyelesaian:\nP = 2(l + b)\nP / 2 = l + b  (bahagi kedua-dua belah dengan 2)\n(P / 2) - l = b  (tolak l daripada kedua-dua belah)\nJawapan:\nb = (P / 2) - l, atau b = (P - 2l) / 2",
        },
        {
          title: "Formula",
          formula: "Jika v = u + at, maka a = (v - u) / t\nJika P = 2(l + b), maka b = (P - 2l) / 2",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Operasi songsang bagi tambah ialah tolak, dan operasi songsang bagi darab ialah bahagi.",
            "Lakukan setiap langkah pada KEDUA-DUA belah formula untuk mengekalkan kesamaan.",
            "Asingkan subjek baharu sehingga ia berdiri sendiri di satu sisi.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tersilap tanda apabila memindahkan sebutan merentasi tanda '=' (lupa menukar tanda).",
            "Hanya melakukan operasi pada satu belah formula sahaja.",
            "Membahagi dengan sebutan yang masih mengandungi tambahan tanpa mengurungkannya dahulu.",
          ],
        },
      ],
    },
    {
      title: "3.2b Mengubah Subjek Formula: Kuasa dan Punca Kuasa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Apabila formula melibatkan kuasa dua atau punca kuasa dua, operasi songsang bagi kuasa dua ialah punca kuasa dua, dan operasi songsang bagi punca kuasa dua ialah kuasa dua.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan:\nDiberi formula luas bulatan A = πr². Ubah subjek formula kepada r.\nPenyelesaian:\nA = πr²\nA / π = r²  (bahagi kedua-dua belah dengan π)\n√(A / π) = r  (ambil punca kuasa dua kedua-dua belah)\nJawapan:\nr = √(A / π)\n(Ambil nilai positif sahaja kerana r ialah ukuran panjang/jejari)",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan:\nDiberi formula c² = a² + b². Ubah subjek formula kepada a.\nPenyelesaian:\nc² = a² + b²\nc² - b² = a²  (tolak b² daripada kedua-dua belah)\n√(c² - b²) = a  (ambil punca kuasa dua kedua-dua belah)\nJawapan:\na = √(c² - b²)",
        },
        {
          title: "Formula",
          formula: "Jika A = πr², maka r = √(A / π)\nJika c² = a² + b², maka a = √(c² - b²)",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Untuk membuang kuasa dua, ambil punca kuasa dua pada kedua-dua belah formula.",
            "Untuk membuang punca kuasa dua, kuasakan duakan kedua-dua belah formula.",
            "Bagi kuantiti fizikal seperti panjang, jejari atau masa, ambil nilai positif sahaja (nilai negatif ditolak kerana tidak bermakna secara fizikal).",
            "Bagi sesetengah konteks algebra umum (bukan kuantiti fizikal), kedua-dua nilai positif dan negatif (±) perlu dipertimbangkan.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Terlupa mengambil punca kuasa dua pada KESELURUHAN sebelah kanan, bukan hanya satu sebutan.",
            "Terlupa mempertimbangkan tanda ± apabila konteks soalan memerlukannya.",
            "Mengambil punca kuasa dua sebelum mengasingkan sebutan kuasa dua dengan betul.",
          ],
        },
      ],
    },
    {
      title: "3.3 Menentukan Nilai Pembolehubah",
      subsections: [
        {
          title: "Definisi",
          content:
            "Apabila nilai semua pembolehubah lain dalam suatu formula diketahui kecuali satu, nilai pembolehubah yang belum diketahui itu boleh ditentukan dengan menggantikan nilai-nilai yang diketahui ke dalam formula, dan jika perlu, mengubah subjek formula dahulu.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan:\nDiberi formula v = u + at. Jika u = 5, a = 2 dan t = 4, cari nilai v.\nPenyelesaian:\nv = u + at\nv = 5 + (2)(4)\nv = 5 + 8\nJawapan:\nv = 13",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan:\nDiberi formula A = πr², dengan π = 22/7. Jika A = 154 cm², cari nilai r.\nPenyelesaian:\nr = √(A / π)\nr = √(154 ÷ (22/7))\nr = √(154 x 7/22)\nr = √49\nJawapan:\nr = 7 cm",
        },
        {
          title: "Formula",
          formula: "Gantikan nilai diketahui -> Selesaikan untuk pembolehubah yang belum diketahui",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jika pembolehubah yang dicari bukan subjek formula, ubah subjek formula dahulu sebelum menggantikan nilai.",
            "Sentiasa semak unit supaya konsisten sebelum menggantikan nilai.",
            "Gunakan kurungan semasa menggantikan nilai negatif untuk mengelakkan kesilapan tanda.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggantikan nilai ke dalam formula yang salah subjek (tidak mengubah subjek dahulu).",
            "Kesilapan aritmetik semasa mendarab atau membahagi nombor pecahan/perpuluhan.",
            "Terlupa mengambil punca kuasa dua selepas menggantikan nilai dalam formula berkuasa dua.",
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
            "Formula menyatakan hubungan antara pembolehubah dalam situasi harian.",
            "Subjek formula boleh diubah dengan melakukan operasi songsang yang sama pada kedua-dua belah.",
            "Nilai pembolehubah ditentukan melalui penggantian, dan kadangkala perlu mengubah subjek dahulu.",
          ],
        },
        {
          title: "Formula Penting",
          table: {
            headers: ["Formula Asal", "Subjek Baharu", "Formula Selepas Diubah"],
            rows: [
              ["v = u + at", "a", "a = (v - u) / t"],
              ["P = 2(l + b)", "b", "b = (P - 2l) / 2"],
              ["A = πr²", "r", "r = √(A / π)"],
              ["c² = a² + b²", "a", "a = √(c² - b²)"],
            ],
          },
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa tulis langkah operasi songsang dengan jelas supaya markah kerja kerja dapat diberikan.",
            "Semak semula sama ada jawapan akhir perlu dalam bentuk positif sahaja (untuk kuantiti fizikal).",
            "Gunakan kurungan apabila menggantikan nilai negatif atau pecahan ke dalam formula.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Formula menunjukkan hubungan antara dua atau lebih pembolehubah.",
    "Operasi songsang bagi tambah ialah tolak; operasi songsang bagi darab ialah bahagi.",
    "Operasi songsang bagi kuasa dua ialah punca kuasa dua, dan sebaliknya.",
    "Lakukan operasi yang sama pada KEDUA-DUA belah formula apabila mengubah subjek formula.",
    "Bagi kuantiti fizikal seperti panjang dan jejari, hanya nilai positif diterima selepas mengambil punca kuasa dua.",
    "Gantikan nilai yang diketahui ke dalam formula (subjek yang betul) untuk mencari pembolehubah yang belum diketahui.",
  ],
  keyTerms: [
    "Formula",
    "Subjek formula",
    "Pembolehubah",
    "Operasi songsang",
    "Kuasa dua",
    "Punca kuasa dua",
    "Penggantian",
    "Persamaan",
  ],
};
