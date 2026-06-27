import type { StructuredNotes } from "@/data/types";

export const mathF3C4NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 4 Lukisan Berskala membantu murid memahami hubungan antara ukuran sebenar objek dan lukisan berskala, mentafsir skala dalam bentuk 1:n, menentukan skala, ukuran objek atau ukuran lukisan berskala, melukis lukisan berskala bagi suatu objek dan sebaliknya, serta menyelesaikan masalah yang melibatkan lukisan berskala.",
  quickRevision: [
    "Lukisan berskala ialah lukisan objek dengan semua ukuran berkadaran dengan ukuran objek sebenar.",
    "Skala = Ukuran lukisan berskala / Ukuran objek, biasa ditulis dalam bentuk 1:n.",
    "Jika n<1, lukisan berskala lebih besar daripada objek; jika n>1, lukisan berskala lebih kecil; jika n=1, sama saiz.",
    "Bagi grid berlainan saiz, gunakan bilangan unit grid (bukan ukuran sebenar grid) untuk menentukan skala.",
    "Sudut sentiasa kekal sama dalam lukisan berskala; hanya panjang sisi berubah mengikut skala.",
  ],
  keyExamFacts: [
    "Skala = Ukuran lukisan berskala / Ukuran objek = 1/n.",
    "n<1: lukisan lebih besar; n>1: lukisan lebih kecil; n=1: sama saiz.",
    "Sudut tidak berubah dalam lukisan berskala; hanya panjang berubah mengikut nisbah skala.",
    "Skala peta biasa ditulis 1cm : n km; tukar unit dengan teliti (1km=100000cm).",
    "Luas sebenar = (skala panjang)^2 x luas pada lukisan berskala.",
  ],
  keyTerms: ["lukisan berskala", "skala", "nisbah", "grid", "objek", "kadaran"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengkaji dan menerangkan hubungan antara ukuran sebenar objek dan lukisan pelbagai saiz objek tersebut.",
            "Mentafsir skala suatu lukisan berskala.",
            "Menentukan skala, ukuran objek atau ukuran lukisan berskala.",
            "Melukis lukisan berskala bagi suatu objek dan sebaliknya.",
            "Menyelesaikan masalah yang melibatkan lukisan berskala.",
          ],
        },
      ],
    },
    {
      title: "4.1 Lukisan Berskala",
      subsections: [
        {
          title: "4.1.1 Maksud Lukisan Berskala - Penerangan Ringkas",
          content:
            "Lukisan berskala ialah lukisan suatu objek dengan keadaan semua ukuran dalam lukisan adalah berkadaran dengan ukuran pada objek. Saiz sudut kekal sama walaupun panjang sisi berubah mengikut skala.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Lukisan berskala mengekalkan bentuk (sudut sama) tetapi mengubah saiz mengikut nisbah tertentu.",
            "Jika panjang sisi bertambah/berkurang secara konsisten mengikut kadaran tetapi sudut tidak berubah, ia adalah lukisan berskala.",
          ],
        },
        {
          title: "4.1.2 Mentafsir Skala - Penerangan Ringkas",
          content:
            "Skala ialah nisbah ukuran lukisan berskala kepada ukuran objek, biasanya ditulis dalam bentuk 1:n, dengan n integer positif atau pecahan.",
        },
        {
          title: "Formula",
          formula: "Skala = Ukuran lukisan berskala / Ukuran objek = 1/n\n1:n bermaksud 1 unit pada lukisan mewakili n unit pada objek sebenar",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Lukisan P'Q'=2, objek PQ=4. Tentukan skala 1:n.", "Skala = 2/4 = 1/2", "1 : 2"],
              ["Lukisan K'L'=9, objek KL=3. Tentukan skala.", "Skala = 9/3 = 3/1", "3 : 1 atau 1 : 1/3"],
              ["Grid lukisan 2cm, grid objek 1cm, sisi sepadan. Tentukan skala.", "Skala = saiz grid lukisan / saiz grid objek = 2/1", "1 : 1/2 (atau 2:1)"],
              ["Grid lukisan 0.5cm, grid objek 1cm. Tentukan skala.", "Skala = 0.5/1 = 1/2", "1 : 2"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Jika n<1, lukisan berskala lebih besar daripada objek sebenar.",
            "Jika n>1, lukisan berskala lebih kecil daripada objek sebenar.",
            "Jika n=1, lukisan berskala sama saiz dengan objek.",
            "Bagi grid berlainan saiz, gunakan saiz grid (bukan bilangan unit) untuk kira skala apabila bilangan unit sisi sama.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan arah nisbah skala (lukisan:objek berbanding objek:lukisan).",
            "Tertinggal menukar unit (cm ke km) semasa mengira jarak sebenar pada peta.",
            "Menganggap luas berskala secara linear sama seperti panjang (sepatutnya kuasa dua nisbah panjang).",
          ],
        },
        {
          title: "4.1.3 Menentukan Skala, Ukuran Objek atau Lukisan - Penerangan Ringkas",
          content:
            "Menggunakan formula skala = ukuran lukisan/ukuran objek, sebarang dua daripada tiga pemboleh ubah (skala, ukuran lukisan, ukuran objek) boleh digunakan untuk mencari yang ketiga.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Peta berskala 1:300 000. Jarak pada peta 3cm. Hitung jarak sebenar dalam km.", "3cm x 300000 = 900000cm = 9km", "9 km"],
              ["Skala 1cm:10km. Jarak pada peta 2cm antara Kluang dan Ayer Hitam. Hitung jarak sebenar.", "2cm x 10km/cm", "20 km"],
              ["Khairul lukis segi empat sama skala 1:1/3 (n=1/3). Sisi sebenar 6cm. Hitung sisi lukisan.", "Sisi lukisan = 3 x 6cm = 18cm", "18 cm"],
              ["Bilik 7cm x 5cm pada lukisan berskala 1:400. Hitung luas sebenar dalam m².", "Sisi sebenar=7x400=2800cm=28m; 5x400=2000cm=20m; luas=28x20", "560 m²"],
            ],
          },
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Tulis formula skala dahulu, kemudian gantikan nilai yang diketahui untuk cari yang tidak diketahui.",
            "Untuk luas sebenar, gandakan nisbah skala panjang dua kali (kuasa dua) sebelum darab dengan luas lukisan.",
            "Sentiasa semak unit (cm, m, km) konsisten sepanjang pengiraan.",
          ],
        },
        {
          title: "4.1.4 Melukis Lukisan Berskala dan Sebaliknya - Penerangan Ringkas",
          content:
            "Lukisan berskala boleh dilukis menggunakan (a) grid sama saiz dengan skala berlainan, (b) grid berlainan saiz, atau (c) kertas kosong mengikut skala diberi. Sudut dikekalkan tepat; hanya panjang sisi diubah mengikut skala.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Lukis lukisan berskala bagi PQRS dengan skala 1:1/2.",
                "n=1/2 (kurang daripada 1), maka lukisan dua kali lebih besar daripada objek",
                "Setiap sisi lukisan berskala = 2 x sisi objek PQRS",
              ],
              [
                "Lukisan berskala P'Q'R'S'T' (skala 1:2) diberi; lukis objek sebenar.",
                "Skala 1:2 bermaksud lukisan separuh saiz objek; objek = 2 x sisi lukisan",
                "Setiap sisi objek sebenar = 2 x sisi lukisan berskala",
              ],
            ],
          },
        },
        {
          title: "4.1.5 Menyelesaikan Masalah - Penerangan Ringkas",
          content:
            "Masalah lukisan berskala sering melibatkan jarak perjalanan, luas tanah/bilik, perimeter, dan kos berkaitan jubin atau bahan binaan berdasarkan skala yang diberikan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Jarak Bintulu-Miri pada peta 4cm, skala 1cm:50km. Hitung jarak sebenar.",
                "4cm x 50km/cm",
                "200 km",
              ],
              [
                "Daripada soalan di atas, jika dipandu pada 80km/j, hitung masa perjalanan.",
                "Masa = jarak/laju = 200/80",
                "2.5 jam = 2 jam 30 minit",
              ],
              [
                "Padang bola berskala 1:1000, ukuran lukisan 7cm x 12cm. Hitung luas sebenar dalam m².",
                "Sisi sebenar=7x1000=7000cm=70m; 12x1000=12000cm=120m; luas=70x120",
                "8 400 m²",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Untuk soalan kos (contoh jubin), bandingkan jumlah keperluan dan kos keseluruhan, bukan hanya harga seunit.",
            "Untuk soalan masa, gunakan formula masa = jarak / laju selepas jarak sebenar diperoleh.",
            "Periksa sama ada soalan meminta panjang, luas atau isi padu kerana setiap satu memerlukan kuasa skala yang berbeza (1, 2, atau 3).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan nisbah skala panjang terus untuk luas tanpa mengkuasa duakan.",
            "Tertinggal menukar cm kepada m atau km sebelum jawapan akhir.",
            "Salah tafsir n>1 sebagai lukisan lebih besar (sebenarnya lebih kecil).",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Peta dan navigasi GPS menggunakan skala untuk mewakili jarak sebenar.",
            "Pelan rumah dan model taman perumahan oleh pemaju hartanah.",
            "Bidang arkitek, kejuruteraan dan fotografi menggunakan lukisan berskala secara meluas.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "Lukisan berskala: semua ukuran berkadaran dengan objek sebenar; sudut kekal sama.",
            "Skala = ukuran lukisan/ukuran objek, ditulis 1:n.",
            "n<1 lukisan lebih besar; n>1 lukisan lebih kecil; n=1 sama saiz.",
            "Luas sebenar = (nisbah panjang)² x luas lukisan; isi padu menggunakan kuasa 3.",
          ],
        },
      ],
    },
  ],
};
