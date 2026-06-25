import type { StructuredNotes } from "@/data/types";

export const mathF2C11NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 11 Kebarangkalian membantu murid memahami kebarangkalian eksperimen, ruang sampel, peristiwa, kebarangkalian teori bagi keputusan yang sama mungkin, kebarangkalian peristiwa pelengkap, dan kebarangkalian peristiwa mudah dalam kehidupan harian.",
  quickRevision: [
    "Kebarangkalian eksperimen = bilangan kali peristiwa berlaku ÷ bilangan keseluruhan percubaan.",
    "Ruang sampel, S, ialah set semua kemungkinan keputusan bagi suatu eksperimen.",
    "P(A) = n(A) / n(S), dengan keputusan dalam S adalah sama mungkin berlaku.",
    "P(A) + P(A') = 1, maka P(A') = 1 - P(A).",
    "Nilai kebarangkalian sentiasa antara 0 dan 1, iaitu 0 ≤ P(A) ≤ 1.",
    "P(A) = 0 bermaksud peristiwa A mustahil berlaku; P(A) = 1 bermaksud peristiwa A pasti berlaku.",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menentukan kebarangkalian eksperimen bagi suatu peristiwa.",
            "Membuat ramalan tentang suatu peristiwa berdasarkan kebarangkalian eksperimen.",
            "Menentukan ruang sampel dan peristiwa bagi suatu eksperimen.",
            "Menentukan kebarangkalian teori bagi suatu peristiwa dengan keputusan yang sama mungkin.",
            "Membuat perkaitan antara kebarangkalian eksperimen dan kebarangkalian teori.",
            "Menentukan kebarangkalian peristiwa pelengkap bagi suatu peristiwa.",
            "Menyelesaikan masalah yang melibatkan kebarangkalian peristiwa mudah.",
          ],
        },
      ],
    },
    {
      title: "11.1 Kebarangkalian Eksperimen",
      subsections: [
        {
          title: "Definisi",
          content:
            "Kebarangkalian eksperimen ialah kebarangkalian yang ditentukan berdasarkan keputusan sebenar suatu eksperimen yang dijalankan secara berulang kali. Eksperimen ialah satu aktiviti yang menghasilkan keputusan, seperti melambung syiling, melambung dadu, atau mencabut kad.",
          bulletPoints: [
            "Percubaan (trial) ialah setiap kali eksperimen dijalankan.",
            "Peristiwa (event) ialah satu keputusan atau kumpulan keputusan yang diberi perhatian.",
            "Lagi banyak bilangan percubaan dijalankan, lagi tepat kebarangkalian eksperimen menghampiri kebarangkalian teori.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Kebarangkalian Eksperimen bagi peristiwa A\n= Bilangan kali peristiwa A berlaku / Bilangan keseluruhan percubaan",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah syiling dilambung 50 kali. Bahagian 'gambar' muncul sebanyak 28 kali. Hitung kebarangkalian eksperimen bagi 'gambar' muncul.\nPenyelesaian: Kebarangkalian eksperimen = 28/50 = 14/25.\nJawapan: 14/25",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebiji dadu dilambung 60 kali. Nombor 6 muncul sebanyak 12 kali. Hitung kebarangkalian eksperimen bagi nombor 6 muncul, dalam bentuk paling ringkas.\nPenyelesaian: Kebarangkalian eksperimen = 12/60 = 1/5.\nJawapan: 1/5",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kebarangkalian eksperimen boleh berbeza setiap kali eksperimen diulang.",
            "Kebarangkalian eksperimen boleh digunakan untuk membuat ramalan tentang bilangan kali sesuatu peristiwa akan berlaku pada masa hadapan.",
            "Untuk membuat ramalan: Ramalan = Kebarangkalian eksperimen x Jumlah percubaan baharu.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tersilap menggunakan bilangan kali peristiwa berlaku sebagai penyebut (sepatutnya jadi pengangka).",
            "Tidak memudahkan pecahan kepada bentuk paling ringkas.",
            "Mengelirukan kebarangkalian eksperimen dengan kebarangkalian teori.",
          ],
        },
      ],
    },
    {
      title: "11.2 Kebarangkalian Teori yang Melibatkan Keputusan yang Sama Mungkin",
      subsections: [
        {
          title: "Definisi",
          content:
            "Ruang sampel, S, ialah set bagi semua kemungkinan keputusan suatu eksperimen. Peristiwa, A, ialah subset daripada ruang sampel yang mengandungi keputusan yang diberi perhatian. Apabila semua keputusan dalam ruang sampel mempunyai kemungkinan yang sama untuk berlaku, keputusan itu dikatakan sama mungkin (equally likely).",
          bulletPoints: [
            "n(S) ialah bilangan unsur dalam ruang sampel S.",
            "n(A) ialah bilangan unsur dalam peristiwa A.",
            "Senaraikan semua unsur ruang sampel dengan teliti supaya tidak tertinggal atau berulang.",
          ],
        },
        {
          title: "Formula",
          formula: "P(A) = n(A) / n(S)\ndengan 0 ≤ P(A) ≤ 1",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebiji dadu adil dilambung sekali. A ialah peristiwa mendapat nombor genap. Tentukan ruang sampel, S, peristiwa A, dan P(A).\nPenyelesaian: S = {1, 2, 3, 4, 5, 6}, maka n(S) = 6. A = {2, 4, 6}, maka n(A) = 3. P(A) = n(A)/n(S) = 3/6 = 1/2.\nJawapan: P(A) = 1/2",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Sebuah kotak mengandungi 4 kad bernombor 1, 2, 3, dan 4. Sehelai kad dipilih secara rawak. B ialah peristiwa mendapat nombor lebih besar daripada 2. Tentukan P(B).\nPenyelesaian: S = {1, 2, 3, 4}, n(S) = 4. B = {3, 4}, n(B) = 2. P(B) = 2/4 = 1/2.\nJawapan: P(B) = 1/2",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Dua syiling adil dilambung serentak. C ialah peristiwa mendapat sekurang-kurangnya satu 'gambar'. Tentukan P(C).\nPenyelesaian: S = {(G,G), (G,E), (E,G), (E,E)}, n(S) = 4, dengan G = gambar, E = ekor. C = {(G,G), (G,E), (E,G)}, n(C) = 3. P(C) = 3/4.\nJawapan: P(C) = 3/4",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Pastikan setiap unsur dalam ruang sampel adalah sama mungkin sebelum menggunakan formula P(A) = n(A)/n(S).",
            "Gunakan gambar rajah pohon atau jadual untuk membantu menyenaraikan ruang sampel bagi dua objek (contohnya dua syiling atau dua dadu).",
            "Kebarangkalian teori tidak berubah walaupun eksperimen diulang berkali-kali.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tidak menyenaraikan semua keputusan ruang sampel dengan lengkap, terutamanya bagi dua objek.",
            "Mengira keputusan yang sama secara berulang dalam ruang sampel.",
            "Tersilap kira n(A) kerana terlepas pandang keputusan yang memenuhi syarat peristiwa.",
          ],
        },
      ],
    },
    {
      title: "11.3 Kebarangkalian Peristiwa Pelengkap bagi Suatu Peristiwa",
      subsections: [
        {
          title: "Definisi",
          content:
            "Peristiwa pelengkap bagi peristiwa A, ditulis sebagai A', ialah peristiwa yang mengandungi semua keputusan dalam ruang sampel S yang bukan ahli peristiwa A. Peristiwa A dan A' tidak boleh berlaku serentak, dan kedua-duanya meliputi keseluruhan ruang sampel S.",
          bulletPoints: [
            "A dan A' tidak bertindih (mutually exclusive).",
            "Gabungan A dan A' membentuk semula ruang sampel S sepenuhnya.",
          ],
        },
        {
          title: "Formula",
          formula: "P(A) + P(A') = 1\nP(A') = 1 - P(A)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebiji dadu adil dilambung sekali. A ialah peristiwa mendapat nombor 5. Cari P(A').\nPenyelesaian: S = {1, 2, 3, 4, 5, 6}, n(S) = 6. A = {5}, n(A) = 1, maka P(A) = 1/6. P(A') = 1 - 1/6 = 5/6.\nJawapan: P(A') = 5/6",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Dalam satu kelas, kebarangkalian seorang murid yang dipilih secara rawak ialah murid lelaki adalah 7/15. Cari kebarangkalian murid itu ialah murid perempuan.\nPenyelesaian: Peristiwa 'perempuan' adalah pelengkap kepada peristiwa 'lelaki'. P(perempuan) = 1 - 7/15 = 8/15.\nJawapan: 8/15",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "P(A') sentiasa boleh dicari tanpa mengira semula ruang sampel jika P(A) sudah diketahui.",
            "Gunakan konsep peristiwa pelengkap untuk mempercepat penyelesaian soalan, terutamanya bila bilangan keputusan A' lebih sukar disenaraikan berbanding A.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengira P(A') dengan menambah 1 kepada P(A) bukan menolak.",
            "Menganggap A dan A' boleh berlaku serentak.",
            "Tersilap menentukan sama ada suatu peristiwa benar-benar pelengkap kepada peristiwa lain.",
          ],
        },
      ],
    },
    {
      title: "11.4 Kebarangkalian Peristiwa Mudah",
      subsections: [
        {
          title: "Definisi",
          content:
            "Kebarangkalian peristiwa mudah merujuk kepada penyelesaian masalah harian yang melibatkan satu peristiwa tunggal menggunakan konsep ruang sampel, peristiwa, dan formula P(A) = n(A)/n(S), termasuk situasi sebenar seperti cabutan bertuah, permainan, dan pengurusan stok.",
        },
        {
          title: "Formula",
          formula: "P(A) = n(A) / n(S)\nP(A') = 1 - P(A)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: Sebuah bekas mengandungi 5 guli merah, 3 guli biru, dan 2 guli kuning. Seorang murid memilih sebiji guli secara rawak. Cari kebarangkalian guli itu berwarna biru.\nPenyelesaian: Jumlah guli, n(S) = 5 + 3 + 2 = 10. Guli biru, n(biru) = 3. P(biru) = 3/10.\nJawapan: 3/10",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Menggunakan maklumat Contoh 1, cari kebarangkalian guli yang dipilih bukan berwarna merah.\nPenyelesaian: P(merah) = 5/10 = 1/2. P(bukan merah) = 1 - 1/2 = 1/2. (Boleh disahkan: bukan merah = biru + kuning = 3 + 2 = 5, maka 5/10 = 1/2.)\nJawapan: 1/2",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Sebuah kotak cabutan bertuah mengandungi 20 tiket, dengan 4 tiket bertanda 'menang'. Sebuah tiket dicabut secara rawak. Hitung kebarangkalian tiket itu tidak menang.\nPenyelesaian: P(menang) = 4/20 = 1/5. P(tidak menang) = 1 - 1/5 = 4/5.\nJawapan: 4/5",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Baca soalan dengan teliti untuk mengenal pasti ruang sampel sebenar (contohnya jumlah keseluruhan objek dalam bekas).",
            "Sentiasa permudahkan pecahan kebarangkalian kepada bentuk paling ringkas.",
            "Konsep peristiwa pelengkap sering digunakan untuk mempercepat pengiraan dalam masalah harian.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tersilap mengira jumlah keseluruhan objek sebagai n(S).",
            "Terlupa bahawa jawapan kebarangkalian mestilah antara 0 dan 1.",
            "Tidak memudahkan pecahan jawapan akhir kepada sebutan terendah.",
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
            "Kebarangkalian eksperimen berdasarkan keputusan sebenar eksperimen yang dijalankan berulang kali.",
            "Kebarangkalian teori menggunakan ruang sampel dan peristiwa yang sama mungkin berlaku.",
            "P(A) + P(A') = 1 untuk semua peristiwa A dan peristiwa pelengkapnya.",
            "Nilai kebarangkalian sentiasa antara 0 (mustahil) dan 1 (pasti).",
          ],
        },
        {
          title: "Formula Penting",
          formula:
            "Kebarangkalian eksperimen = Bilangan kali peristiwa berlaku / Bilangan keseluruhan percubaan\nP(A) = n(A) / n(S)\nP(A') = 1 - P(A)",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Senaraikan ruang sampel secara sistematik (gunakan jadual atau gambar rajah pohon untuk dua objek).",
            "Sentiasa semak sama ada jawapan kebarangkalian berada antara 0 dan 1.",
            "Gunakan konsep peristiwa pelengkap apabila peristiwa yang dikehendaki lebih mudah dicari melalui peristiwa bertentangan.",
            "Permudahkan semua pecahan jawapan kepada bentuk paling ringkas.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Kebarangkalian eksperimen = bilangan kali peristiwa berlaku ÷ bilangan keseluruhan percubaan.",
    "P(A) = n(A) / n(S) digunakan apabila semua keputusan dalam ruang sampel sama mungkin berlaku.",
    "P(A') = 1 - P(A), kerana A dan A' bersama-sama meliputi seluruh ruang sampel.",
    "Nilai kebarangkalian sentiasa memenuhi 0 ≤ P(A) ≤ 1.",
    "P(A) = 0 menunjukkan peristiwa mustahil; P(A) = 1 menunjukkan peristiwa pasti berlaku.",
  ],
  keyTerms: [
    "Eksperimen",
    "Percubaan",
    "Peristiwa",
    "Ruang sampel",
    "Kebarangkalian eksperimen",
    "Kebarangkalian teori",
    "Keputusan sama mungkin",
    "Peristiwa pelengkap",
  ],
};
