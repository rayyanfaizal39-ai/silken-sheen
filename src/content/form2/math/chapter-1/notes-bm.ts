import type { StructuredNotes } from "@/data/types";

export const mathF2C1NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 1 Corak dan Jujukan membantu murid mengenal pasti corak nombor dan bentuk, memahami jujukan nombor dan menentukan istilah seterusnya, serta mewakilkan corak dan jujukan sebagai fungsi menggunakan jadual, formula umum dan graf.",
  quickRevision: [
    "Corak ialah susunan nombor, objek atau bentuk yang berulang mengikut peraturan tertentu.",
    "Jujukan ialah satu set nombor yang disusun mengikut suatu peraturan tertentu, dan setiap nombor dipanggil istilah.",
    "Jujukan menaik: setiap istilah lebih besar daripada istilah sebelumnya. Jujukan menurun: setiap istilah lebih kecil daripada istilah sebelumnya.",
    "Formula umum istilah ke-n, Tn, membolehkan kita mengira sebarang istilah tanpa menyenaraikan semua istilah sebelumnya.",
    "Jujukan boleh diwakilkan sebagai fungsi dengan n (kedudukan istilah) sebagai input dan Tn (nilai istilah) sebagai output.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti dan menerangkan corak bagi suatu set objek atau nombor.",
            "Membuat generalisasi tentang corak menggunakan perkataan dan algebra.",
            "Mengenal pasti jujukan menaik dan jujukan menurun.",
            "Menentukan istilah tertentu dan istilah seterusnya dalam suatu jujukan.",
            "Membentuk dan menggunakan formula umum bagi istilah ke-n suatu jujukan.",
            "Mewakilkan corak dan jujukan sebagai fungsi dalam bentuk jadual, formula dan graf.",
          ],
        },
      ],
    },
    {
      title: "1.1 Corak",
      subsections: [
        {
          title: "Definisi",
          content:
            "Corak ialah satu susunan nombor, objek atau bentuk yang berulang atau berubah mengikut peraturan yang tetap dan boleh diramal.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Perhatikan susunan bilangan bintik berikut: 1, 3, 5, 7, ... Apakah corak yang terbentuk?\nPenyelesaian: Bandingkan nombor berturutan: 3-1=2, 5-3=2, 7-5=2. Setiap nombor bertambah 2 daripada nombor sebelumnya.\nJawapan: Corak ialah penambahan 2 secara berturutan (nombor ganjil).",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Lukis dan terangkan corak bagi susunan segi tiga yang dibentuk oleh bilangan titik: 1, 3, 6, 10, ...\nPenyelesaian: Beza antara nombor berturutan ialah 2, 3, 4, ... iaitu beza itu sendiri bertambah satu setiap kali (nombor segi tiga).\nJawapan: Corak ialah nombor segi tiga, dengan beza meningkat sebanyak 1 setiap kali (2, 3, 4, ...).",
        },
        {
          title: "Jenis Corak",
          table: {
            headers: ["Jenis Corak", "Peraturan", "Contoh"],
            rows: [
              ["Corak penambahan", "Tambah nombor tetap setiap kali", "2, 4, 6, 8, ..."],
              ["Corak penolakan", "Tolak nombor tetap setiap kali", "20, 17, 14, 11, ..."],
              ["Corak pendaraban", "Darab dengan nombor tetap setiap kali", "2, 4, 8, 16, ..."],
              ["Corak nombor segi tiga", "Beza meningkat sebanyak 1", "1, 3, 6, 10, ..."],
              ["Corak nombor kuasa dua", "n didarab dengan n", "1, 4, 9, 16, ..."],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa bandingkan sekurang-kurangnya tiga pasangan nombor berturutan sebelum membuat kesimpulan tentang corak.",
            "Corak boleh wujud dalam bentuk nombor, geometri (bentuk) atau jadual.",
            "Generalisasi corak boleh dinyatakan dalam perkataan atau dalam bentuk algebra.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Membuat kesimpulan tentang corak hanya berdasarkan dua nombor sahaja, tanpa mengesahkan dengan nombor seterusnya.",
            "Mengelirukan corak penambahan dengan corak pendaraban kerana tidak menyemak beza dan nisbah dengan teliti.",
            "Tidak menyemak semula corak yang telah dikenal pasti dengan meneruskan susunan beberapa nombor lagi.",
          ],
        },
      ],
    },
    {
      title: "1.2 Jujukan",
      subsections: [
        {
          title: "Definisi",
          content:
            "Jujukan ialah satu set nombor yang disusun mengikut suatu peraturan atau corak tertentu. Setiap nombor dalam jujukan dipanggil istilah (term), dan kedudukan istilah dilambangkan dengan n (n = 1, 2, 3, ...). Istilah pertama ditulis sebagai T1, istilah kedua T2, dan istilah umum sebagai Tn.",
        },
        {
          title: "Jujukan Menaik dan Menurun",
          table: {
            headers: ["Jenis Jujukan", "Ciri", "Contoh"],
            rows: [
              ["Jujukan menaik", "Setiap istilah lebih besar daripada istilah sebelumnya", "3, 6, 9, 12, ..."],
              ["Jujukan menurun", "Setiap istilah lebih kecil daripada istilah sebelumnya", "50, 45, 40, 35, ..."],
            ],
          },
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Tentukan sama ada jujukan 7, 11, 15, 19, ... adalah jujukan menaik atau menurun, dan cari istilah ke-6.\nPenyelesaian: Beza istilah = 11-7 = 4, 15-11 = 4, 19-15 = 4. Beza positif (+4), maka jujukan menaik. T5 = 19+4 = 23, T6 = 23+4 = 27.\nJawapan: Jujukan menaik; istilah ke-6 ialah 27.",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Diberi jujukan 81, 27, 9, 3, ... Tentukan peraturan jujukan dan cari istilah seterusnya.\nPenyelesaian: 27÷81 = 1/3, 9÷27 = 1/3, 3÷9 = 1/3. Setiap istilah ialah istilah sebelumnya didarab dengan 1/3 (atau dibahagi dengan 3).\nJawapan: Peraturan: darab 1/3 (bahagi 3); istilah seterusnya = 3 x 1/3 = 1.",
        },
        {
          title: "Formula",
          formula: "Jujukan aritmetik: Tn = a + (n-1)d\ndi mana a = istilah pertama, d = beza sepunya, n = kedudukan istilah\n\nJujukan geometri: Tn = a x r^(n-1)\ndi mana a = istilah pertama, r = nisbah sepunya, n = kedudukan istilah",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Diberi jujukan aritmetik dengan a = 5 dan d = 3. Cari T10.\nPenyelesaian: Tn = a + (n-1)d. T10 = 5 + (10-1)(3) = 5 + 9(3) = 5 + 27.\nJawapan: T10 = 32.",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Beza sepunya (d) dalam jujukan aritmetik diperoleh dengan menolak istilah sebelumnya daripada istilah semasa: d = Tn - T(n-1).",
            "Nisbah sepunya (r) dalam jujukan geometri diperoleh dengan membahagi istilah semasa dengan istilah sebelumnya: r = Tn / T(n-1).",
            "Jika d positif, jujukan aritmetik menaik; jika d negatif, jujukan aritmetik menurun.",
            "Jika r lebih besar daripada 1, jujukan geometri (nombor positif) menaik; jika 0 < r < 1, jujukan geometri menurun.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan formula Tn = a + nd dan tertinggal tanda kurung (n-1), menyebabkan jawapan tersasar satu istilah.",
            "Mengelirukan beza sepunya (d) dengan nisbah sepunya (r) - d untuk tambah/tolak, r untuk darab/bahagi.",
            "Tidak menyemak tanda negatif apabila jujukan menurun.",
          ],
        },
      ],
    },
    {
      title: "1.3 Corak dan Jujukan sebagai Fungsi",
      subsections: [
        {
          title: "Definisi",
          content:
            "Corak dan jujukan boleh diwakilkan sebagai suatu fungsi, dengan kedudukan istilah, n, sebagai input dan nilai istilah, Tn, sebagai output. Hubungan ini boleh ditunjukkan dalam bentuk jadual, formula umum (algebra) atau graf.",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Diberi jujukan 2, 5, 8, 11, ... Bina jadual fungsi bagi n = 1, 2, 3, 4 dan tentukan formula umum Tn.\nPenyelesaian: Beza sepunya d = 3. Tn = a + (n-1)d = 2 + (n-1)(3) = 2 + 3n - 3 = 3n - 1.\nJawapan: Tn = 3n - 1. Jadual: n=1→2, n=2→5, n=3→8, n=4→11.",
        },
        {
          title: "Jadual Fungsi",
          table: {
            headers: ["n (kedudukan)", "1", "2", "3", "4", "n"],
            rows: [["Tn (nilai istilah)", "2", "5", "8", "11", "3n - 1"]],
          },
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Formula umum suatu jujukan ialah Tn = 2n^2. Cari T1, T2 dan T3, dan nyatakan jenis corak.\nPenyelesaian: T1 = 2(1)^2 = 2. T2 = 2(2)^2 = 8. T3 = 2(3)^2 = 18.\nJawapan: Jujukan ialah 2, 8, 18, ... iaitu corak nombor kuasa dua didarab 2 (bukan linear).",
        },
        {
          title: "Formula",
          formula: "Fungsi linear (jujukan aritmetik): Tn = dn + (a - d)\nFungsi bukan linear: melibatkan n^2, n^3 atau gabungan operasi",
        },
        {
          title: "Mewakilkan dengan Graf",
          bulletPoints: [
            "Paksi-x mewakili n (kedudukan istilah): n = 1, 2, 3, ...",
            "Paksi-y mewakili Tn (nilai istilah).",
            "Jika titik-titik membentuk garis lurus, jujukan itu adalah aritmetik (linear).",
            "Jika titik-titik membentuk lengkung, jujukan itu adalah bukan linear (contohnya geometri atau kuasa dua).",
          ],
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Formula umum Tn membolehkan kita mencari sebarang istilah, termasuk istilah yang jauh seperti T50 atau T100, tanpa menyenaraikan semua istilah.",
            "Untuk mengesahkan formula umum, sentiasa uji dengan menggantikan n = 1, 2, 3 dan bandingkan dengan jujukan asal.",
            "Jujukan aritmetik menghasilkan graf berbentuk garis lurus apabila Tn diplot melawan n.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Lupa memudahkan formula umum selepas mengembangkan a + (n-1)d, contohnya tertinggal langkah mengumpul sebutan n.",
            "Menggantikan nilai n yang salah (contohnya menggunakan n=0 bagi istilah pertama, sedangkan istilah pertama ialah n=1).",
            "Tidak mengesahkan formula umum yang diperoleh dengan menggantikan semula nilai n untuk menyemak ketepatan.",
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
            "Corak ialah susunan berulang yang mengikut peraturan tertentu dan boleh diramal.",
            "Jujukan ialah set nombor (istilah) yang disusun mengikut peraturan tertentu; Tn mewakili istilah ke-n.",
            "Jujukan aritmetik mempunyai beza sepunya (d) yang tetap; jujukan geometri mempunyai nisbah sepunya (r) yang tetap.",
            "Corak dan jujukan boleh diwakilkan sebagai fungsi melalui jadual, formula umum dan graf.",
          ],
        },
        {
          title: "Formula Penting",
          table: {
            headers: ["Jenis Jujukan", "Formula Istilah ke-n"],
            rows: [
              ["Aritmetik", "Tn = a + (n-1)d"],
              ["Geometri", "Tn = a x r^(n-1)"],
            ],
          },
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa kira beza atau nisbah antara sekurang-kurangnya tiga pasangan istilah sebelum menentukan jenis jujukan.",
            "Tuliskan formula umum dalam bentuk paling ringkas (contohnya 3n - 1, bukan 2 + 3(n-1)).",
            "Semak jawapan akhir dengan menggantikan semula nilai n ke dalam formula yang diperoleh.",
            "Untuk soalan graf, kenal pasti sama ada titik membentuk garis lurus (linear/aritmetik) atau lengkung (bukan linear).",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Corak ialah susunan nombor atau bentuk yang berulang mengikut peraturan tetap.",
    "Jujukan ialah set nombor (istilah) tersusun mengikut peraturan tertentu, dilambangkan T1, T2, ..., Tn.",
    "Beza sepunya (d) = Tn - T(n-1) bagi jujukan aritmetik; nisbah sepunya (r) = Tn / T(n-1) bagi jujukan geometri.",
    "Formula istilah ke-n bagi jujukan aritmetik: Tn = a + (n-1)d.",
    "Formula istilah ke-n bagi jujukan geometri: Tn = a x r^(n-1).",
    "Jujukan aritmetik menghasilkan graf garis lurus apabila Tn diplot melawan n.",
  ],
  keyTerms: [
    "Corak",
    "Jujukan",
    "Istilah",
    "Jujukan menaik",
    "Jujukan menurun",
    "Beza sepunya",
    "Nisbah sepunya",
    "Jujukan aritmetik",
    "Jujukan geometri",
    "Formula umum",
    "Fungsi",
  ],
};
