import type { StructuredNotes } from "./types";

export const mathF1C12NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 12 memperkenalkan pengendalian data secara menyeluruh. Murid akan mempelajari cara mengumpulkan, mengorganisasikan, mewakili dan mentafsir data menggunakan pelbagai kaedah termasuk jadual kekerapan, carta palang, carta pai, graf garis, plot titik, plot batang-dan-daun, histogram dan poligon kekerapan. Bab ini juga membincangkan serakan data, julat, perbandingan set data dan kepentingan perwakilan data secara beretika.",
  quickRevision: [
    "Data: maklumat yang dikumpul untuk tujuan tertentu.",
    "4 peringkat: Kumpul → Organisasi → Wakili → Tafsir.",
    "Kaedah pengumpulan: temu bual, pemerhatian, eksperimen, tinjauan.",
    "Data kategori: kualiti/jenis. Data berangka: nombor (diskret/berterusan).",
    "Data diskret: nilai bulat (bil. anak). Data berterusan: diukur (tinggi, jisim).",
    "Jadual kekerapan: gunakan tanda turus untuk mengira kekerapan.",
    "Julat = Nilai Tertinggi − Nilai Terendah.",
    "Carta palang: bandingkan kategori. Carta pai: tunjukkan perkadaran.",
    "Graf garis: tunjukkan trend masa. Plot titik: taburan nilai.",
    "Histogram: data berkumpulan (tiada ruang antara palang). Poligon kekerapan: garis menghubungkan titik tengah.",
    "Plot batang-dan-daun: mengekalkan nilai asal data.",
    "Perwakilan beretika: skala konsisten, paksi bermula dari sifar.",
  ],
  keyExamFacts: [
    "Soalan statistik MESTI melibatkan variasi data — bukan soalan dengan satu jawapan tetap.",
    "Data diskret: bilangan (nombor bulat). Data berterusan: ukuran (boleh ada perpuluhan).",
    "Histogram TIADA ruang antara palang — bezanya dengan carta palang.",
    "Poligon kekerapan dibina dengan menghubungkan titik tengah bahagian atas setiap palang histogram.",
    "Julat = Nilai Tertinggi − Nilai Terendah (bukan selisih antara kekerapan).",
    "Plot batang-dan-daun: batang = digit puluhan, daun = digit sa.",
    "Carta pai: setiap sektor sudutnya = (kekerapan ÷ jumlah) × 360°.",
    "Data dengan julat lebih kecil → lebih konsisten/boleh dipercayai.",
    "Skala paksi yang tidak bermula dari sifar BOLEH mengelirukan pembaca.",
  ],
  keyTerms: [
    "Data",
    "Kekerapan",
    "Data kategori",
    "Data berangka",
    "Data diskret",
    "Data berterusan",
    "Jadual kekerapan",
    "Carta palang",
    "Carta pai",
    "Graf garis",
    "Plot titik",
    "Plot batang-dan-daun",
    "Histogram",
    "Poligon kekerapan",
    "Julat",
    "Serakan",
    "Inferens",
    "Ramalan",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan konsep pengendalian data dan peringkat-peringkatnya.",
            "Membezakan soalan statistik daripada soalan bukan statistik.",
            "Menggunakan kaedah pengumpulan data yang sesuai.",
            "Membezakan antara data kategori, data diskret dan data berterusan.",
            "Membina dan membaca jadual kekerapan.",
            "Membina dan mentafsir carta palang, carta pai, graf garis, plot titik, plot batang-dan-daun, histogram dan poligon kekerapan.",
            "Mengira dan mentafsir julat sebagai ukuran serakan.",
            "Membuat inferens dan ramalan daripada data.",
            "Membandingkan set data menggunakan julat.",
            "Menerangkan kepentingan perwakilan data secara beretika.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan Pengendalian Data",
      subsections: [
        {
          title: "Apakah Pengendalian Data?",
          content:
            "Pengendalian data ialah proses mengumpul, mengorganisasikan, mewakili dan mentafsir maklumat (data) untuk menjawab soalan atau membuat keputusan. Data ialah maklumat yang dikumpul daripada pemerhatian, pengukuran atau tinjauan.",
        },
        {
          title: "Empat Peringkat Pengendalian Data",
          content:
            "Proses pengendalian data berlaku dalam 4 peringkat yang berurutan:",
          bulletPoints: [
            "① Mengumpul Data — Mendapatkan maklumat melalui temu bual, pemerhatian, eksperimen atau tinjauan.",
            "② Mengorganisasikan Data — Menyusun data dalam jadual, senarai atau kumpulan supaya lebih mudah dianalisis.",
            "③ Mewakili Data — Menggambarkan data dalam bentuk visual seperti carta, graf atau plot.",
            "④ Mentafsir Data — Menganalisis perwakilan data untuk membuat kesimpulan, inferens dan ramalan.",
          ],
        },
        {
          title: "Kepentingan Pengendalian Data",
          content:
            "Pengendalian data digunakan dalam kehidupan seharian: doktor menganalisis data pesakit, ahli perniagaan mengkaji trend jualan, kerajaan merancang berdasarkan data penduduk, dan saintis menjalankan eksperimen berasaskan data.",
        },
        {
          title: "Contoh Kehidupan Seharian",
          content:
            "① Seorang guru ingin tahu subjek kegemaran murid → kumpul data melalui soal selidik → organisasikan dalam jadual → wakili dalam carta palang → tafsir untuk merancang pengajaran.",
        },
      ],
    },
    {
      title: "2. Soalan Statistik",
      subsections: [
        {
          title: "Definisi Soalan Statistik",
          content:
            "Soalan statistik ialah soalan yang memerlukan pengumpulan data dan melibatkan variasi (data yang berbeza-beza). Soalan ini tidak boleh dijawab dengan satu nilai tetap — jawapannya bergantung kepada data yang dikumpul.",
        },
        {
          title: "Ciri-ciri Soalan Statistik",
          bulletPoints: [
            "Melibatkan pengumpulan data daripada sekumpulan orang atau objek.",
            "Jawapannya bervariasi — orang yang berbeza memberikan jawapan yang berbeza.",
            "Memerlukan analisis data untuk mendapat gambaran keseluruhan.",
          ],
        },
        {
          title: "✅ Contoh Soalan Statistik",
          content:
            "• 'Apakah subjek kegemaran murid di sekolah ini?' → Jawapan berbeza bagi setiap murid. • 'Berapakah bilangan adik-beradik dalam keluarga murid Tingkatan 1?' → Data bervariasi antara murid. • 'Berapakah jisim murid dalam kelas ini?' → Ukuran berbeza bagi setiap murid.",
        },
        {
          title: "❌ Bukan Soalan Statistik",
          content:
            "• 'Berapakah 5 × 7?' → Ada satu jawapan tetap (35). Tiada variasi. • 'Bilakah Malaysia merdeka?' → Ada satu jawapan (1957). • 'Apakah nama ibu kota Malaysia?' → Satu jawapan (Kuala Lumpur). Soalan-soalan ini BUKAN soalan statistik kerana tidak melibatkan variasi data.",
        },
      ],
    },
    {
      title: "3. Pengumpulan Data",
      subsections: [
        {
          title: "Kaedah Pengumpulan Data",
          content:
            "Terdapat empat kaedah utama untuk mengumpul data dalam statistik. Pemilihan kaedah bergantung kepada jenis data, saiz populasi, masa dan kos yang tersedia.",
        },
        {
          title: "Perbandingan Kaedah Pengumpulan Data",
          content:
            "Setiap kaedah mempunyai kelebihan dan kekurangannya sendiri yang perlu dipertimbangkan sebelum memilih kaedah yang sesuai.",
        },
      ],
    },
    {
      title: "4. Temu Bual",
      subsections: [
        {
          title: "Definisi Temu Bual",
          content:
            "Temu bual ialah kaedah mengumpul data melalui soal jawab secara langsung antara pengumpul data dengan responden. Pengumpul data bertanya soalan dan mencatatkan jawapan responden.",
        },
        {
          title: "Ciri-ciri Temu Bual",
          bulletPoints: [
            "Interaksi langsung antara pewawancara dan responden.",
            "Boleh mendapat maklumat yang lebih mendalam dan terperinci.",
            "Pewawancara boleh bertanya soalan susulan untuk penjelasan.",
            "Sesuai untuk sampel kecil.",
            "Memerlukan masa dan tenaga yang lebih banyak.",
          ],
        },
        {
          title: "Contoh Penggunaan Temu Bual",
          content:
            "Contoh: Pengurus kedai ingin tahu kepuasan pelanggan → menemu bual pelanggan secara individu tentang perkhidmatan, harga dan kualiti produk. Kajian sosiologi tentang pengalaman hidup seseorang.",
        },
        {
          title: "Kelebihan dan Kekurangan",
          content:
            "✅ Kelebihan: Maklumat mendalam, boleh menjelaskan soalan, kadar respons tinggi. ❌ Kekurangan: Memakan masa, kos tinggi, sukar untuk sampel besar.",
        },
      ],
    },
    {
      title: "5. Pemerhatian",
      subsections: [
        {
          title: "Definisi Pemerhatian",
          content:
            "Pemerhatian ialah kaedah mengumpul data dengan memerhati dan mencatatkan kejadian atau fenomena secara langsung tanpa mengganggu subjek yang dikaji.",
        },
        {
          title: "Ciri-ciri Pemerhatian",
          bulletPoints: [
            "Data direkodkan semasa kejadian berlaku secara semula jadi.",
            "Tidak bergantung pada responden untuk melaporkan sendiri.",
            "Sesuai untuk mengkaji tingkah laku atau kejadian semula jadi.",
            "Memerlukan pemerhatian yang teliti dan sistematik.",
          ],
        },
        {
          title: "Contoh Penggunaan Pemerhatian",
          content:
            "Contoh: Jururawat mencatat jisim lahir bayi yang dilahirkan dalam sebulan di hospital. Penyelidik memerhati dan mencatat bilangan kenderaan yang lalu di sesuatu persimpangan setiap jam.",
        },
        {
          title: "Kelebihan dan Kekurangan",
          content:
            "✅ Kelebihan: Data tepat dan objektif, tidak mempengaruhi tingkah laku subjek. ❌ Kekurangan: Memakan masa, pengumpul data mungkin terlepas pandang sesuatu.",
        },
      ],
    },
    {
      title: "6. Eksperimen",
      subsections: [
        {
          title: "Definisi Eksperimen",
          content:
            "Eksperimen ialah kaedah mengumpul data melalui ujian atau kajian yang dirancang untuk menguji hipotesis atau menjawab soalan saintifik. Pengkaji mengawal keadaan ujian untuk mendapatkan data yang boleh dipercayai.",
        },
        {
          title: "Ciri-ciri Eksperimen",
          bulletPoints: [
            "Mengawal pembolehubah untuk mengasingkan kesan faktor tertentu.",
            "Menggunakan kumpulan kawalan dan kumpulan eksperimen.",
            "Data dikumpul melalui pengukuran yang teliti.",
            "Boleh diulang untuk mengesahkan keputusan.",
          ],
        },
        {
          title: "Contoh Penggunaan Eksperimen",
          content:
            "Contoh: Syarikat bateri menguji hayat bateri dengan menyalakan 50 unit bateri dan mencatat berapa jam setiap satu bertahan sebelum habis. Eksperimen sains untuk mengkaji kadar pertumbuhan pokok dalam keadaan cahaya berbeza.",
        },
        {
          title: "Kelebihan dan Kekurangan",
          content:
            "✅ Kelebihan: Kawalan ke atas pembolehubah, keputusan boleh diulang, data saintifik. ❌ Kekurangan: Memerlukan peralatan dan persekitaran khusus, kos tinggi.",
        },
      ],
    },
    {
      title: "7. Tinjauan",
      subsections: [
        {
          title: "Definisi Tinjauan",
          content:
            "Tinjauan ialah kaedah mengumpul data dengan mengedarkan soal selidik atau borang kepada sekumpulan orang (sampel) yang mewakili populasi. Responden menjawab soalan secara bertulis atau dalam talian.",
        },
        {
          title: "Ciri-ciri Tinjauan",
          bulletPoints: [
            "Sesuai untuk mengumpul data daripada sampel yang besar.",
            "Soal selidik boleh diedarkan dalam pelbagai cara: bertulis, e-mel, dalam talian.",
            "Responden menjawab sendiri tanpa kehadiran pengkaji.",
            "Lebih menjimatkan masa dan kos berbanding temu bual.",
          ],
        },
        {
          title: "Contoh Penggunaan Tinjauan",
          content:
            "Contoh: Jabatan Perangkaan menjalankan bancian penduduk menggunakan borang tinjauan. Syarikat penyelidikan pasaran mengedarkan soal selidik untuk mengetahui pilihan pengguna terhadap produk baharu.",
        },
        {
          title: "Kelebihan dan Kekurangan",
          content:
            "✅ Kelebihan: Boleh menampung sampel besar, kos rendah, mudah dianalisis. ❌ Kekurangan: Kadar respons mungkin rendah, responden mungkin tidak jujur.",
        },
      ],
    },
    {
      title: "8. Data Kategori",
      subsections: [
        {
          title: "Definisi Data Kategori",
          content:
            "Data kategori (juga dikenali sebagai data kualitatif) ialah data yang menerangkan kualiti, sifat atau kumpulan. Data jenis ini tidak melibatkan pengukuran berangka dan tidak boleh ditambah atau ditolak secara bermakna.",
        },
        {
          title: "Ciri-ciri Data Kategori",
          bulletPoints: [
            "Mewakili kualiti atau kategori, bukan kuantiti.",
            "Tidak boleh ditambah, ditolak atau didarab.",
            "Boleh dikira bilangan ahli dalam setiap kategori.",
            "Contoh kategori: jenis, warna, jantina, bangsa.",
          ],
        },
        {
          title: "Contoh Data Kategori",
          content:
            "• Kumpulan darah: A, B, AB, O → merupakan kategori, bukan nombor. • Warna kereta: merah, biru, putih, hitam. • Hobi murid: membaca, melukis, bersukan, memasak. • Jantina: lelaki, perempuan. • Bangsa: Melayu, Cina, India, lain-lain.",
        },
        {
          title: "Perwakilan Terbaik",
          content:
            "Data kategori paling sesuai diwakili menggunakan carta palang atau carta pai, kerana kedua-dua jenis carta ini boleh menunjukkan bilangan atau perkadaran dalam setiap kategori dengan jelas.",
        },
      ],
    },
    {
      title: "9. Data Berangka",
      subsections: [
        {
          title: "Definisi Data Berangka",
          content:
            "Data berangka (juga dikenali sebagai data kuantitatif) ialah data yang melibatkan nombor dan boleh diukur atau dikira. Data jenis ini boleh ditambah, ditolak, didarab dan dibahagi secara bermakna untuk mendapatkan maklumat berguna.",
        },
        {
          title: "Dua Jenis Data Berangka",
          content:
            "Data berangka terbahagi kepada dua jenis utama: data diskret dan data berterusan. Perbezaan utama adalah pada jenis nilai yang boleh diambil.",
        },
        {
          title: "Perbandingan: Data Diskret vs Data Berterusan",
          content:
            "Data Diskret — Nilai nombor bulat sahaja. Boleh dikira satu per satu. Contoh: bilangan murid, bilangan buku. | Data Berterusan — Mana-mana nilai dalam sesuatu julat, termasuk perpuluhan. Contoh: tinggi, jisim, suhu, masa.",
        },
      ],
    },
    {
      title: "10. Data Diskret",
      subsections: [
        {
          title: "Definisi Data Diskret",
          content:
            "Data diskret ialah data berangka yang hanya boleh mengambil nilai-nilai nombor bulat tertentu (yang boleh dikira secara berasingan). Tidak wujud nilai antara dua nilai berturutan.",
        },
        {
          title: "Ciri-ciri Data Diskret",
          bulletPoints: [
            "Nilai sentiasa nombor bulat (0, 1, 2, 3, ...).",
            "Boleh dikira satu per satu — ada titik akhir yang jelas.",
            "Tidak boleh ada nilai antara, contohnya tidak ada 2.5 orang.",
            "Biasanya hasil proses pengiraan.",
          ],
        },
        {
          title: "Contoh Data Diskret",
          content:
            "• Bilangan anak dalam keluarga: 0, 1, 2, 3, ... (tidak boleh ada 1.7 anak) • Bilangan buku dalam beg: 3, 4, 5, ... • Bilangan kereta di kawasan letak kereta: 0, 1, 2, ... • Bilangan soalan dalam ujian: 10, 20, 25, ... • Bilangan gol dalam perlawanan bola sepak",
        },
        {
          title: "Perwakilan Terbaik",
          content:
            "Data diskret paling sesuai diwakili menggunakan carta palang, jadual kekerapan atau plot titik. Histogram TIDAK sesuai untuk data diskret kerana histogram direka untuk data berkumpulan/berterusan.",
        },
      ],
    },
    {
      title: "11. Data Berterusan",
      subsections: [
        {
          title: "Definisi Data Berterusan",
          content:
            "Data berterusan ialah data berangka yang boleh mengambil mana-mana nilai dalam suatu julat, termasuk nilai perpuluhan. Data ini diperoleh melalui pengukuran dan sentiasa bergantung pada ketepatan alat pengukur.",
        },
        {
          title: "Ciri-ciri Data Berterusan",
          bulletPoints: [
            "Boleh mengambil sebarang nilai dalam suatu julat.",
            "Diperoleh melalui pengukuran (bukan pengiraan).",
            "Bergantung pada ketepatan alat ukur.",
            "Boleh ada nilai perpuluhan antara dua nilai.",
          ],
        },
        {
          title: "Contoh Data Berterusan",
          content:
            "• Tinggi murid: 152.3 cm, 160.5 cm, 148.7 cm • Jisim bayi: 3.2 kg, 2.9 kg, 4.1 kg • Suhu bilik: 26.5°C, 28.3°C • Masa untuk berlari 100m: 12.45 saat, 11.87 saat • Isipadu cecair: 250.6 mL",
        },
        {
          title: "Perbezaan Penting: Diskret vs Berterusan",
          content:
            "Soalan panduan: 'Bolehkah nilai ini ada perpuluhan dalam kehidupan sebenar?' Jika YA → data berterusan. Jika TIDAK → data diskret. Contoh: Tinggi 162.4 cm ✓ (berterusan). Bilangan 1.5 orang ✗ (diskret = hanya nombor bulat).",
        },
        {
          title: "Perwakilan Terbaik",
          content:
            "Data berterusan paling sesuai diwakili menggunakan histogram (untuk data berkumpulan) atau graf garis. Histogram menggunakan kelas-kelas seperti '150–155 cm' untuk mengumpulkan data berterusan.",
        },
      ],
    },
    {
      title: "12. Jadual Kekerapan",
      subsections: [
        {
          title: "Definisi Jadual Kekerapan",
          content:
            "Jadual kekerapan ialah jadual yang mengorganisasikan data dengan menunjukkan setiap nilai (atau kelas nilai) bersama bilangan kali ia muncul (kekerapan). Jadual ini memudahkan analisis data yang banyak.",
        },
        {
          title: "Komponen Jadual Kekerapan",
          bulletPoints: [
            "Lajur Nilai/Kelas — Senaraikan setiap nilai atau julat nilai yang berlainan.",
            "Lajur Tanda Turus — Gunakan tanda turus (|) untuk mengira setiap kemunculan. Setiap lima turus diikat: ⟨IIII⟩.",
            "Lajur Kekerapan — Jumlah bilangan bagi setiap nilai atau kelas.",
            "Jumlah Kekerapan — Tambah semua kekerapan = jumlah data keseluruhan.",
          ],
        },
        {
          title: "Contoh: Membina Jadual Kekerapan",
          content:
            "Data mentah bilangan adik-beradik murid: 2, 3, 1, 2, 4, 3, 2, 1, 0, 2, 3, 1, 2, 4, 0\n\nJadual Kekerapan:\n┌─────────────────┬───────────────┬───────────┐\n│ Bil. Adik-Beradik│  Tanda Turus  │ Kekerapan │\n├─────────────────┼───────────────┼───────────┤\n│        0        │      ||       │     2     │\n│        1        │     |||       │     3     │\n│        2        │    IIII|      │     5     │\n│        3        │     |||       │     3     │\n│        4        │      ||       │     2     │\n├─────────────────┼───────────────┼───────────┤\n│     Jumlah      │               │    15     │\n└─────────────────┴───────────────┴───────────┘",
        },
        {
          title: "Jadual Kekerapan Berkumpulan",
          content:
            "Apabila data mempunyai julat yang besar, data dikumpulkan dalam kelas. Setiap kelas mempunyai lebar yang sama.\n\nContoh: Markah 40 murid\n┌──────────┬───────────┐\n│  Markah  │ Kekerapan │\n├──────────┼───────────┤\n│  41–50   │     3     │\n│  51–60   │     8     │\n│  61–70   │    12     │\n│  71–80   │    10     │\n│  81–90   │     7     │\n├──────────┼───────────┤\n│  Jumlah  │    40     │\n└──────────┴───────────┘\nLebar kelas = 10 markah",
        },
        {
          title: "Kepentingan Jadual Kekerapan",
          content:
            "Jadual kekerapan membantu kita melihat corak data dengan cepat, mengetahui nilai yang paling kerap muncul (mod), menyediakan data untuk membina carta dan graf, serta membandingkan kekerapan antara nilai yang berbeza.",
        },
      ],
    },
    {
      title: "13. Carta Palang",
      subsections: [
        {
          title: "Apakah Carta Palang?",
          content:
            "Carta palang ialah carta yang menggunakan palang tegak atau melintang untuk mewakili data. Panjang atau ketinggian setiap palang menunjukkan kekerapan atau nilai bagi setiap kategori.",
        },
        {
          title: "Tujuan Carta Palang",
          content:
            "Carta palang digunakan untuk membandingkan data kategori atau data diskret. Ia memudahkan perbandingan visual antara nilai-nilai yang berbeza dengan cepat.",
        },
        {
          title: "Contoh Carta Palang: Subjek Kegemaran",
          content:
            "Data: Subjek Kegemaran 40 Murid\n\nBahasa Melayu : ████████ 8\nMatematik      : ████████████ 12\nSains          : ██████████ 10\nSejarah        : ██████ 6\nGeografi       : ████ 4\n\n(Paksi-x: Subjek, Paksi-y: Bilangan Murid)\nPerhatian: Setiap palang mempunyai lebar yang SAMA dan ada RUANG antara palang.",
        },
        {
          title: "Cara Membaca Carta Palang",
          bulletPoints: [
            "Lihat tajuk carta untuk memahami apa yang diwakili.",
            "Baca paksi-y (menegak) untuk nilai kekerapan.",
            "Baca paksi-x (melintang) untuk kategori.",
            "Bandingkan ketinggian palang untuk perbandingan visual.",
            "Perhatikan skala pada paksi-y.",
          ],
        },
        {
          title: "Perbezaan: Carta Palang vs Histogram",
          content:
            "Carta Palang: Ada RUANG antara palang, digunakan untuk data kategori atau diskret. | Histogram: TIADA ruang antara palang, digunakan untuk data berterusan yang berkumpulan.",
        },
      ],
    },
    {
      title: "14. Carta Pai",
      subsections: [
        {
          title: "Apakah Carta Pai?",
          content:
            "Carta pai ialah bulatan yang dibahagikan kepada sektor-sektor yang mewakili perkadaran setiap kategori daripada keseluruhan data. Keseluruhan bulatan mewakili 100% atau jumlah keseluruhan data.",
        },
        {
          title: "Tujuan Carta Pai",
          content:
            "Carta pai digunakan untuk menunjukkan perkadaran atau peratusan setiap bahagian daripada keseluruhan. Ia terbaik digunakan apabila terdapat sedikit kategori (2–6 kategori).",
        },
        {
          title: "Formula Sudut Sektor",
          content:
            "Sudut sektor = (Kekerapan ÷ Jumlah Kekerapan) × 360°\n\nContoh: 40 murid memilih 4 aktiviti:\n• Sukan: 16 murid → (16÷40) × 360° = 144°\n• Muzik: 10 murid → (10÷40) × 360° = 90°\n• Melukis: 8 murid → (8÷40) × 360° = 72°\n• Membaca: 6 murid → (6÷40) × 360° = 54°\nJumlah: 144° + 90° + 72° + 54° = 360° ✓",
        },
        {
          title: "Peratusan dalam Carta Pai",
          content:
            "Peratusan = (Kekerapan ÷ Jumlah) × 100%\n\nDaripada contoh di atas:\n• Sukan: (16÷40) × 100% = 40%\n• Muzik: (10÷40) × 100% = 25%\n• Melukis: (8÷40) × 100% = 20%\n• Membaca: (6÷40) × 100% = 15%\nJumlah: 40% + 25% + 20% + 15% = 100% ✓",
        },
        {
          title: "Cara Membaca Carta Pai",
          bulletPoints: [
            "Sektor yang lebih besar mewakili perkadaran yang lebih besar.",
            "Bandingkan saiz sektor untuk perbandingan relatif.",
            "Semak label atau petunjuk (legenda) untuk nama kategori.",
            "Peratusan atau nilai sering dicatat dalam setiap sektor.",
          ],
        },
      ],
    },
    {
      title: "15. Graf Garis",
      subsections: [
        {
          title: "Apakah Graf Garis?",
          content:
            "Graf garis ialah graf yang menggunakan titik-titik yang disambungkan dengan garis lurus untuk menunjukkan perubahan data dari semasa ke semasa atau mengikut urutan. Paksi-x biasanya mewakili masa atau urutan.",
        },
        {
          title: "Tujuan Graf Garis",
          content:
            "Graf garis paling sesuai untuk menunjukkan trend, corak dan perubahan data merentasi masa. Ia membolehkan kita melihat sama ada data meningkat, menurun atau kekal stabil.",
        },
        {
          title: "Contoh Graf Garis: Suhu Harian",
          content:
            "Suhu (°C) di sebuah bandar selama 5 hari:\n\n  35 |        ●\n  33 |    ●       ●\n  31 |●\n  29 |                ●\n  27 |                    ●\n  25 +----+----+----+----+----\n     Isn  Sel  Rab  Kha  Jum\n\nGaris menunjukkan trend suhu: naik dari Isnin ke Rabu, kemudian turun ke Jumaat.",
        },
        {
          title: "Cara Membaca Graf Garis",
          bulletPoints: [
            "Kecerunan menaik → nilai meningkat.",
            "Kecerunan menurun → nilai berkurang.",
            "Garis mendatar → nilai stabil/tidak berubah.",
            "Perhatikan skala paksi-y untuk nilai yang tepat.",
            "Titik tertinggi/terendah menunjukkan nilai maksimum/minimum.",
          ],
        },
        {
          title: "Trend Positif vs Negatif",
          content:
            "Trend positif: garis condong ke atas kanan — data meningkat dari masa ke masa. Contoh: pertumbuhan jualan dari Januari ke Disember. | Trend negatif: garis condong ke bawah kanan — data menurun. Contoh: penurunan kadar jenayah dari tahun ke tahun.",
        },
      ],
    },
    {
      title: "16. Plot Titik",
      subsections: [
        {
          title: "Apakah Plot Titik?",
          content:
            "Plot titik (dot plot) ialah carta yang menggunakan titik-titik di atas garis nombor untuk menunjukkan taburan data. Setiap titik mewakili satu pemerhatian atau nilai data.",
        },
        {
          title: "Tujuan Plot Titik",
          content:
            "Plot titik digunakan untuk menunjukkan taburan data kecil (sehingga 30 nilai), mengenal pasti kelompok data, jurang dalam data, dan pencilan (outlier).",
        },
        {
          title: "Contoh Plot Titik: Markah Kuiz",
          content:
            "Markah 15 murid dalam kuiz (daripada 10): 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 10, 10\n\n   •\n  ••       ••\n  ••• ••• •••\n+--+--+--+--+--+--+--+\n4  5  6  7  8  9  10\n\nKita dapat lihat: kebanyakan murid mendapat markah 7 dan 8. Markah 4 adalah pencilan (outlier).",
        },
        {
          title: "Pencilan (Outlier)",
          content:
            "Pencilan ialah nilai data yang jauh berbeza daripada nilai-nilai lain dalam set data. Dalam plot titik, pencilan kelihatan tersasing daripada kumpulan titik yang lain. Pencilan boleh menunjukkan ralat ukuran atau nilai yang luar biasa.",
        },
        {
          title: "Kelebihan Plot Titik",
          bulletPoints: [
            "Mudah dibina dan dibaca.",
            "Mengekalkan semua nilai data asal.",
            "Jelas menunjukkan kelompok data dan pencilan.",
            "Sesuai untuk set data yang kecil hingga sederhana.",
          ],
        },
      ],
    },
    {
      title: "17. Plot Batang dan Daun",
      subsections: [
        {
          title: "Apakah Plot Batang-dan-Daun?",
          content:
            "Plot batang-dan-daun (stem-and-leaf plot) ialah kaedah mewakili data yang memisahkan setiap nilai kepada dua bahagian: batang (digit hadapan) dan daun (digit terakhir). Ia mengekalkan semua nilai data asal.",
        },
        {
          title: "Struktur Plot Batang-dan-Daun",
          bulletPoints: [
            "Batang (Stem) — Biasanya digit puluhan (atau ratus untuk data yang lebih besar).",
            "Daun (Leaf) — Biasanya digit sa (unit).",
            "Garis menegak memisahkan batang dan daun.",
            "Daun disusun dalam tertib menaik pada setiap baris.",
          ],
        },
        {
          title: "Contoh: Membina Plot Batang-dan-Daun",
          content:
            "Data: Markah murid: 23, 35, 27, 41, 38, 52, 29, 33, 45, 31, 46, 39, 25, 48, 34\n\nLangkah 1: Kenal pasti batang (puluhan): 2, 3, 4, 5\nLangkah 2: Susun daun mengikut batang:\n\nBatang | Daun\n  2    | 3 5 7 9\n  3    | 1 3 4 5 8 9\n  4    | 1 5 6 8\n  5    | 2\n\nKunci: 2 | 3 = 23",
        },
        {
          title: "Cara Membaca Plot Batang-dan-Daun",
          content:
            "Untuk mendapatkan nilai asal: gabungkan batang dan daun. Contoh: Batang '4' + Daun '5' = nilai 45. | Bilangan daun pada setiap baris = bilangan nilai dalam julat tersebut. | Julat data boleh dilihat dari baris pertama hingga terakhir.",
        },
        {
          title: "Kelebihan Plot Batang-dan-Daun",
          bulletPoints: [
            "Mengekalkan nilai data asal (tidak seperti histogram yang mengumpulkan data).",
            "Mudah melihat taburan data.",
            "Boleh membandingkan dua set data menggunakan plot batang-dan-daun bersama (back-to-back).",
            "Julat dan nilai tengah mudah dikenal pasti.",
          ],
        },
      ],
    },
    {
      title: "18. Histogram",
      subsections: [
        {
          title: "Apakah Histogram?",
          content:
            "Histogram ialah perwakilan grafik data berterusan atau berkumpulan menggunakan palang segi empat tepat yang bersebelahan (tanpa ruang antara palang). Setiap palang mewakili satu kelas atau selang nilai.",
        },
        {
          title: "Perbezaan Utama: Histogram vs Carta Palang",
          content:
            "Histogram: TIADA ruang antara palang, digunakan untuk data berterusan/berkumpulan, paksi-x menunjukkan julat nilai berterusan. | Carta Palang: ADA ruang antara palang, digunakan untuk data diskret/kategori, paksi-x menunjukkan kategori berasingan.",
        },
        {
          title: "Contoh Histogram: Tinggi Murid",
          content:
            "Data: Tinggi 40 murid (dalam cm)\n\n12 |    ████\n10 | ████████\n 8 | ██████████████\n 6 | ████████████\n 4 | ████████\n 2 | ████\n   +----+----+----+----+----+----\n   145  150  155  160  165  170\n            Tinggi (cm)\n\nKelas: 145≤h<150, 150≤h<155, 155≤h<160, 160≤h<165, 165≤h<170\nPerhatian: TIADA ruang antara palang.",
        },
        {
          title: "Membaca Histogram",
          bulletPoints: [
            "Paksi-x menunjukkan sempadan kelas (nilai berterusan).",
            "Paksi-y menunjukkan kekerapan setiap kelas.",
            "Lebar setiap palang = lebar kelas (biasanya sama).",
            "Ketinggian palang = kekerapan kelas tersebut.",
            "Jumlah keluasan semua palang berkadar dengan jumlah data.",
          ],
        },
        {
          title: "Tafsiran Bentuk Histogram",
          content:
            "• Bentuk loceng (simetri): data tertumpu di tengah — normal. • Pencong kanan: kebanyakan data rendah, ada nilai tinggi yang jarang. • Pencong kiri: kebanyakan data tinggi, ada nilai rendah yang jarang. • Seragam: kekerapan hampir sama untuk semua kelas.",
        },
      ],
    },
    {
      title: "19. Poligon Kekerapan",
      subsections: [
        {
          title: "Apakah Poligon Kekerapan?",
          content:
            "Poligon kekerapan ialah graf garis yang dibina dengan menghubungkan titik-titik tengah bahagian atas setiap palang histogram. Ia memberikan gambaran visual tentang bentuk taburan data berkumpulan.",
        },
        {
          title: "Cara Membina Poligon Kekerapan",
          bulletPoints: [
            "Langkah 1: Bina histogram bagi data berkumpulan.",
            "Langkah 2: Cari titik tengah setiap kelas. Titik tengah = (had bawah + had atas) ÷ 2",
            "Langkah 3: Plot titik di atas titik tengah setiap kelas pada ketinggian yang bersamaan dengan kekerapan kelas itu.",
            "Langkah 4: Hubungkan semua titik dengan garis lurus.",
            "Langkah 5: Sambungkan ke paksi-x di kedua-dua hujung (pada kelas kosong di luar julat data).",
          ],
        },
        {
          title: "Contoh: Membina Poligon Kekerapan",
          content:
            "Kelas dan kekerapan markah ujian:\n┌──────────┬───────────┬────────────┐\n│  Kelas   │ Kekerapan │ Titik Tengah│\n├──────────┼───────────┼────────────┤\n│  41–50   │     3     │    45.5    │\n│  51–60   │     8     │    55.5    │\n│  61–70   │    12     │    65.5    │\n│  71–80   │    10     │    75.5    │\n│  81–90   │     7     │    85.5    │\n└──────────┴───────────┴────────────┘\n\nPlot titik-titik: (45.5, 3), (55.5, 8), (65.5, 12), (75.5, 10), (85.5, 7)\nHubungkan dengan garis lurus.",
        },
        {
          title: "Kegunaan Poligon Kekerapan",
          content:
            "Poligon kekerapan berguna untuk membandingkan dua atau lebih set data berkumpulan pada graf yang sama, melihat trend keseluruhan taburan data, dan mengenal pasti nilai yang paling kerap muncul (mod kelas).",
        },
      ],
    },
    {
      title: "20. Tafsiran Data",
      subsections: [
        {
          title: "Apakah Tafsiran Data?",
          content:
            "Tafsiran data ialah proses menganalisis dan memahami maklumat yang disampaikan melalui carta, graf, jadual atau plot. Ia melibatkan pembacaan tepat nilai, perbandingan, dan penarikan kesimpulan.",
        },
        {
          title: "Langkah-langkah Mentafsir Data",
          bulletPoints: [
            "① Baca tajuk carta/graf untuk memahami apa yang diwakili.",
            "② Fahami paksi-x dan paksi-y (unit, skala, label).",
            "③ Baca nilai dengan tepat menggunakan skala.",
            "④ Kenal pasti nilai tertinggi, terendah dan corak umum.",
            "⑤ Buat perbandingan antara nilai yang berbeza.",
            "⑥ Tarik kesimpulan berdasarkan data.",
          ],
        },
        {
          title: "Perkara yang Boleh Dikenal pasti",
          bulletPoints: [
            "Nilai tertinggi dan terendah.",
            "Kategori atau tempoh yang paling dan paling kurang kerap.",
            "Jumlah keseluruhan semua nilai.",
            "Perbezaan antara dua nilai atau kategori.",
            "Trend (kecenderungan meningkat, menurun atau stabil).",
            "Corak (kitaran, musim, pola berulang).",
          ],
        },
        {
          title: "Contoh Tafsiran",
          content:
            "Daripada carta palang subjek kegemaran 40 murid (Matematik: 12, Sains: 10, BM: 8, Sejarah: 6, Geografi: 4):\n• Subjek paling digemari: Matematik (12 murid)\n• Subjek paling kurang digemari: Geografi (4 murid)\n• Perbezaan antara paling digemari dan kurang digemari: 12 − 4 = 8 murid\n• Lebih separuh murid menggemari Matematik atau Sains: 12 + 10 = 22 > 20",
        },
      ],
    },
    {
      title: "21. Membuat Inferens",
      subsections: [
        {
          title: "Apakah Inferens?",
          content:
            "Inferens ialah kesimpulan logik yang dibuat berdasarkan data yang ada. Ia melangkaui sekadar membaca nilai — kita menggunakan data untuk membuat pernyataan yang lebih umum atau menjelaskan sebab sesuatu corak berlaku.",
        },
        {
          title: "Perbezaan: Bacaan vs Inferens",
          content:
            "Bacaan tepat: 'Pada bulan Januari, 15 murid hadir.' — ini adalah fakta terus dari data. | Inferens: 'Kehadiran murid meningkat sepanjang tahun, mungkin kerana program motivasi yang dilaksanakan pada April.' — ini melibatkan tafsiran dan penjelasan.",
        },
        {
          title: "Contoh Membuat Inferens",
          content:
            "Data: Markah ujian murid meningkat dari 60 ke 75 ke 85 dalam tiga ujian berturutan.\n\nBacaan: Markah meningkat sebanyak 15 mata dari ujian ke-1 ke ke-2, dan 10 mata dari ujian ke-2 ke ke-3.\n\nInferens: Murid ini menunjukkan peningkatan yang konsisten, kemungkinan disebabkan oleh usaha belajar yang lebih kuat atau penggunaan teknik belajar yang lebih baik.",
        },
        {
          title: "Panduan Membuat Inferens yang Baik",
          bulletPoints: [
            "Sokongan inferens dengan bukti dari data.",
            "Gunakan frasa seperti 'kemungkinan', 'mungkin', 'menunjukkan bahawa'.",
            "Elakkan membuat kesimpulan terlalu jauh dari data yang ada.",
            "Pertimbangkan faktor lain yang mungkin mempengaruhi data.",
          ],
        },
      ],
    },
    {
      title: "22. Membuat Ramalan",
      subsections: [
        {
          title: "Apakah Ramalan?",
          content:
            "Ramalan ialah jangkaan tentang nilai atau kejadian masa hadapan berdasarkan corak atau trend dalam data sedia ada. Ramalan dibuat dengan menghulurkan corak yang kelihatan dalam data.",
        },
        {
          title: "Asas Membuat Ramalan",
          bulletPoints: [
            "Kenal pasti trend atau corak dalam data (meningkat, menurun, kitaran).",
            "Anggapkan trend ini akan berterusan.",
            "Hunjurkan garis trend ke hadapan.",
            "Nyatakan dengan jelas bahawa ini adalah ramalan, bukan fakta.",
          ],
        },
        {
          title: "Contoh Membuat Ramalan",
          content:
            "Data jumlah pelawat ke sebuah muzium (dalam ribu):\n• 2021: 45\n• 2022: 52\n• 2023: 58\n• 2024: 65\n\nCorak: Peningkatan lebih kurang 7 ribu pelawat setiap tahun.\n\nRamalan 2025: 65 + 7 ≈ 72 ribu pelawat.\n\nCatatan: Ini adalah ramalan sahaja — situasi sebenar boleh berbeza.",
        },
        {
          title: "Had Ramalan",
          content:
            "Ramalan bergantung pada andaian bahawa trend lampau akan berterusan. Namun, pelbagai faktor boleh mengubah trend: perubahan ekonomi, bencana alam, perubahan polisi dan sebagainya. Makin jauh ramalan, makin tidak pasti kebenarannya.",
        },
      ],
    },
    {
      title: "23. Serakan Data",
      subsections: [
        {
          title: "Apakah Serakan Data?",
          content:
            "Serakan data (juga dikenali sebagai penyebaran data) ialah ukuran sejauh mana nilai-nilai dalam satu set data tersebar atau berbeza antara satu sama lain. Set data yang serakannya kecil bermakna nilai-nilainya rapat dan konsisten.",
        },
        {
          title: "Kepentingan Serakan Data",
          content:
            "Serakan data penting kerana ia menggambarkan kebolehpercayaan dan ketekalan data. Dua set data boleh mempunyai nilai tengah yang sama tetapi serakan yang sangat berbeza, yang memberi gambaran yang berbeza tentang data.",
        },
        {
          title: "Contoh Kepentingan Serakan",
          content:
            "Kilang A mengeluarkan paip dengan diameter: 49.8, 50.0, 50.1, 50.2, 50.0 cm (serakan kecil — konsisten). Kilang B mengeluarkan paip dengan diameter: 48.0, 50.0, 52.0, 49.0, 51.0 cm (serakan besar — tidak konsisten). Walaupun purata kedua-dua kilang adalah 50.0 cm, kilang A lebih dipercayai.",
        },
        {
          title: "Ukuran Serakan di Tingkatan 1",
          content:
            "Pada peringkat Tingkatan 1, kita belajar satu ukuran serakan yang mudah: Julat. Ukuran-ukuran serakan lain seperti varians dan sisihan piawai akan dipelajari di peringkat yang lebih tinggi.",
        },
      ],
    },
    {
      title: "24. Julat",
      subsections: [
        {
          title: "Definisi Julat",
          content:
            "Julat ialah perbezaan antara nilai tertinggi dan nilai terendah dalam satu set data. Ia adalah ukuran serakan yang paling mudah dikira.",
        },
        {
          title: "Formula Julat",
          content:
            "╔════════════════════════════════════════╗\n║  Julat = Nilai Tertinggi − Nilai Terendah  ║\n╚════════════════════════════════════════╝",
        },
        {
          title: "Contoh 1: Mengira Julat",
          content:
            "Markah murid dalam ujian: 45, 62, 78, 55, 90, 38, 71, 83\n\nNilai tertinggi = 90\nNilai terendah = 38\nJulat = 90 − 38 = 52 markah\n\nTafsiran: Markah murid tersebar dalam julat 52 markah.",
        },
        {
          title: "Contoh 2: Membandingkan Julat",
          content:
            "Kumpulan A — Masa berlari 100m (saat): 12.1, 12.3, 12.2, 12.5, 12.4\nJulat A = 12.5 − 12.1 = 0.4 saat\n\nKumpulan B — Masa berlari 100m (saat): 11.8, 12.9, 12.2, 13.1, 11.5\nJulat B = 13.1 − 11.5 = 1.6 saat\n\nKesimpulan: Kumpulan A lebih konsisten (julat lebih kecil).",
        },
        {
          title: "Tafsiran Julat",
          bulletPoints: [
            "Julat kecil → data rapat/konsisten/kurang serakan.",
            "Julat besar → data tersebar/tidak konsisten/lebih serakan.",
            "Julat memberikan gambaran keseluruhan penyebaran tetapi tidak memberitahu tentang taburan nilai di tengah.",
            "Julat dipengaruhi oleh pencilan (nilai yang sangat luar biasa).",
          ],
        },
      ],
    },
    {
      title: "25. Perbandingan Data",
      subsections: [
        {
          title: "Mengapa Membandingkan Data?",
          content:
            "Perbandingan data membolehkan kita membuat keputusan yang lebih tepat, menilai prestasi, mengenal pasti kelebihan dan kelemahan, serta memilih antara pilihan yang berbeza berdasarkan bukti.",
        },
        {
          title: "Kaedah Perbandingan Data",
          bulletPoints: [
            "Membandingkan kekerapan tertinggi dan terendah.",
            "Membandingkan jumlah keseluruhan dua set data.",
            "Menggunakan julat untuk membandingkan serakan.",
            "Membandingkan perwakilan visual dua set data.",
          ],
        },
        {
          title: "Contoh: Membandingkan Prestasi Dua Kelas",
          content:
            "Markah Ujian Matematik:\n\nKelas 1F:\nMin = 72, Julat = 85 − 55 = 30\n\nKelas 1G:\nMin = 72, Julat = 92 − 48 = 44\n\nWalaupun kedua-dua kelas mempunyai purata yang sama (72), Kelas 1F lebih konsisten (julat = 30) berbanding Kelas 1G (julat = 44).",
        },
        {
          title: "Prinsip Perbandingan",
          content:
            "Data dengan julat lebih kecil adalah lebih konsisten dan biasanya lebih boleh dipercayai. Namun, perbandingan data yang lengkap memerlukan lebih daripada satu ukuran — pertimbangkan juga nilai tengah, corak taburan dan saiz sampel.",
        },
      ],
    },
    {
      title: "26. Perwakilan Data Beretika",
      subsections: [
        {
          title: "Apakah Perwakilan Data Beretika?",
          content:
            "Perwakilan data beretika bermaksud memaparkan data secara jujur, tepat dan tidak mengelirukan. Data boleh sengaja atau tidak sengaja dipersembahkan dengan cara yang mengelirukan pembaca.",
        },
        {
          title: "✅ Amalan Terbaik (Etika)",
          bulletPoints: [
            "✅ Gunakan skala yang konsisten dan tidak mengelirukan.",
            "✅ Mulakan paksi dari sifar (melainkan ada sebab yang kukuh).",
            "✅ Labelkan semua paksi, tajuk dan unit dengan jelas.",
            "✅ Gunakan nilai yang tepat dan benar.",
            "✅ Nyatakan sumber data.",
            "✅ Gunakan saiz sampel yang mencukupi dan mewakili.",
          ],
        },
        {
          title: "❌ Amalan Tidak Beretika",
          bulletPoints: [
            "❌ Memulakan paksi-y dari nilai bukan sifar untuk 'membesarkan' perbezaan.",
            "❌ Menggunakan skala yang berbeza untuk paksi dalam carta yang dibandingkan.",
            "❌ Memilih data yang menyokong hujah sahaja, mengabaikan data yang bertentangan.",
            "❌ Menggunakan bentuk 3D yang mengelirukan perkadaran sebenar.",
            "❌ Menggambarkan perbezaan kecil sebagai besar melalui manipulasi skala.",
          ],
        },
        {
          title: "Contoh Graf Mengelirukan",
          content:
            "Graf A (paksi-y bermula dari 0): Jualan 2023 = 100 unit, Jualan 2024 = 110 unit → palang kelihatan lebih kurang sama tinggi → gambaran yang tepat.\n\nGraf B (paksi-y bermula dari 95): Jualan 2023 = 100, Jualan 2024 = 110 → palang 2024 kelihatan DUA KALI tinggi palang 2023 → sangat mengelirukan!\n\nPerbezaan sebenar hanyalah 10% tetapi kelihatan seperti 100%.",
        },
        {
          title: "Tanggungjawab Pengguna Data",
          content:
            "Sebagai pengguna data, kita perlu sentiasa memeriksa skala carta sebelum membuat kesimpulan, mempersoalkan sumber data, menyemak sama ada graf bermula dari sifar, dan berwaspada dengan cara data dipersembahkan dalam media.",
        },
      ],
    },
    {
      title: "27. Ringkasan Bab",
      subsections: [
        {
          title: "Peta Minda: Pengendalian Data",
          content:
            "PENGENDALIAN DATA\n├── Pengumpulan: Temu bual | Pemerhatian | Eksperimen | Tinjauan\n├── Jenis Data\n│   ├── Kategori (kualiti/jenis)\n│   └── Berangka\n│       ├── Diskret (nombor bulat)\n│       └── Berterusan (nilai ukuran)\n├── Perwakilan\n│   ├── Jadual kekerapan\n│   ├── Carta palang (kategori/diskret)\n│   ├── Carta pai (perkadaran)\n│   ├── Graf garis (trend masa)\n│   ├── Plot titik (taburan kecil)\n│   ├── Plot batang-dan-daun (nilai asal)\n│   ├── Histogram (berkumpulan/berterusan)\n│   └── Poligon kekerapan (bentuk taburan)\n├── Tafsiran: Inferens | Ramalan\n├── Serakan: Julat = Tertinggi − Terendah\n└── Etika: Skala konsisten, paksi dari 0",
        },
        {
          title: "Rumus Penting",
          bulletPoints: [
            "Julat = Nilai Tertinggi − Nilai Terendah",
            "Sudut Sektor Carta Pai = (Kekerapan ÷ Jumlah) × 360°",
            "Peratusan = (Kekerapan ÷ Jumlah) × 100%",
            "Titik Tengah Kelas = (Had Bawah + Had Atas) ÷ 2",
          ],
        },
        {
          title: "Panduan Memilih Perwakilan Data",
          content:
            "• Data kategori → Carta palang atau Carta pai\n• Data diskret (kecil) → Plot titik atau Carta palang\n• Trend masa → Graf garis\n• Data berkumpulan/berterusan → Histogram\n• Nilai asal perlu dikekalkan → Plot batang-dan-daun\n• Perbandingan taburan → Poligon kekerapan",
        },
        {
          title: "Kata Kunci Tafsiran",
          bulletPoints: [
            "'paling kerap' → nilai dengan kekerapan tertinggi",
            "'paling jarang' → nilai dengan kekerapan terendah",
            "'meningkat' → nilai pada paksi-y naik dari kiri ke kanan",
            "'menurun' → nilai pada paksi-y turun dari kiri ke kanan",
            "'perbezaan' → tolak nilai yang lebih kecil dari lebih besar",
            "'jumlah' → tambahkan semua nilai yang berkaitan",
          ],
        },
      ],
    },
  ],
};
