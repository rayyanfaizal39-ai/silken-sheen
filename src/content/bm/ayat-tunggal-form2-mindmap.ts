import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuForm2AyatTunggalMindMap: MindNode = {
  id: "bm-f2-ayat-tunggal-root",
  label: "AYAT TUNGGAL",
  summary:
    "Ayat tunggal ialah ayat yang mempunyai satu subjek dan satu predikat serta membawa satu maksud yang lengkap.",
  children: [
    {
      id: "bm-f2-ayat-tunggal-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-f2-ayat-tunggal-definisi-maksud",
          label: "Maksud",
          summary: "Ayat tunggal ialah ayat yang mempunyai satu subjek dan satu predikat.",
        },
        {
          id: "bm-f2-ayat-tunggal-definisi-lengkap",
          label: "Maksud Lengkap",
          summary: "Ayat tunggal biasanya menyampaikan satu maksud yang lengkap.",
        },
        {
          id: "bm-f2-ayat-tunggal-definisi-binaan",
          label: "Binaan",
          summary:
            "Ayat tunggal terbentuk daripada perkataan atau frasa yang membina subjek dan predikat.",
        },
        {
          id: "bm-f2-ayat-tunggal-definisi-contoh",
          label: "Contoh Mudah",
          children: [
            {
              id: "bm-f2-ayat-tunggal-definisi-contoh-ayat",
              label: "Ayat",
              summary: '"Adik tidur."',
            },
            {
              id: "bm-f2-ayat-tunggal-definisi-contoh-subjek",
              label: "Subjek",
              summary: "Adik",
            },
            {
              id: "bm-f2-ayat-tunggal-definisi-contoh-predikat",
              label: "Predikat",
              summary: "tidur",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-definisi-ketepatan",
          label: "Nota Ketepatan",
          summary:
            "Ayat tunggal tidak semestinya pendek. Ayat yang panjang masih boleh menjadi ayat tunggal jika hanya mempunyai satu struktur utama subjek-predikat.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-subjek-predikat",
      label: "Subjek dan Predikat",
      children: [
        {
          id: "bm-f2-ayat-tunggal-subjek-predikat-subjek",
          label: "Subjek",
          summary:
            "Subjek ialah bahagian ayat yang diterangkan dan lazimnya dibentuk oleh frasa nama.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-subjek-ayat",
              label: "Contoh Ayat",
              summary: '"Murid itu membaca buku."',
            },
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-subjek-jawapan",
              label: "Subjek Penuh",
              summary: "Murid itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-subjek-predikat-predikat",
          label: "Predikat",
          summary: "Predikat ialah bahagian yang menerangkan subjek.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-predikat-ayat",
              label: "Contoh Ayat",
              summary: '"Murid itu membaca buku."',
            },
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-predikat-jawapan",
              label: "Predikat Penuh",
              summary: "membaca buku",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-subjek-predikat-sempadan",
          label: "Cari Sempadan Frasa",
          summary:
            "Jangan membahagikan subjek terlalu awal; kenal pasti seluruh frasa nama yang diterangkan.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-sempadan-ayat",
              label: "Ayat",
              summary: '"Rumah besar di hujung jalan itu telah dijual."',
            },
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-sempadan-subjek",
              label: "Subjek Penuh",
              summary: "Rumah besar di hujung jalan itu",
            },
            {
              id: "bm-f2-ayat-tunggal-subjek-predikat-sempadan-predikat",
              label: "Predikat Penuh",
              summary: "telah dijual",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-subjek-predikat-formula",
          label: "Formula",
          summary: "Subjek + Predikat",
        },
        {
          id: "bm-f2-ayat-tunggal-subjek-predikat-nota",
          label: "Nota",
          summary:
            "Subjek boleh terdiri daripada satu perkataan atau seluruh frasa nama, bukan semestinya satu perkataan sahaja.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-pola",
      label: "Pola Ayat Dasar",
      children: [
        {
          id: "bm-f2-ayat-tunggal-pola-fn-fn",
          label: "FN + FN",
          children: [
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fn-ayat",
              label: "Contoh",
              summary: '"Abang saya seorang doktor."',
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fn-subjek",
              label: "FN / Subjek",
              summary: "Abang saya",
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fn-predikat",
              label: "FN / Predikat",
              summary: "seorang doktor",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-pola-fn-fk",
          label: "FN + FK",
          children: [
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fk-ayat",
              label: "Contoh",
              summary: '"Ameer dan Nazeem menziarahi Ganesan di hospital."',
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fk-subjek",
              label: "FN",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fk-predikat",
              label: "FK",
              summary: "menziarahi Ganesan di hospital",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-pola-fn-fa",
          label: "FN + FA",
          children: [
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fa-ayat",
              label: "Contoh",
              summary: '"Cuaca hari ini sangat indah."',
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fa-subjek",
              label: "FN",
              summary: "Cuaca hari ini",
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fa-predikat",
              label: "FA",
              summary: "sangat indah",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-pola-fn-fs",
          label: "FN + FS",
          children: [
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fs-ayat",
              label: "Contoh",
              summary: '"Mereka ke hospital."',
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fs-subjek",
              label: "FN",
              summary: "Mereka",
            },
            {
              id: "bm-f2-ayat-tunggal-pola-fn-fs-predikat",
              label: "FS",
              summary: "ke hospital",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-pola-nota",
          label: "Nota",
          summary:
            "Ayat tunggal boleh dibina menggunakan mana-mana daripada empat pola ayat dasar: FN + FN, FN + FK, FN + FA atau FN + FS.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-biasa",
      label: "Susunan Biasa",
      children: [
        {
          id: "bm-f2-ayat-tunggal-biasa-maksud",
          label: "Maksud",
          summary: "Dalam susunan biasa, subjek hadir sebelum predikat.",
        },
        {
          id: "bm-f2-ayat-tunggal-biasa-rumus",
          label: "Rumus",
          summary: "Subjek + Predikat",
        },
        {
          id: "bm-f2-ayat-tunggal-biasa-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-ayat-tunggal-biasa-contoh-ayat",
              label: "Ayat",
              summary: '"Pelajar itu sangat rajin."',
            },
            {
              id: "bm-f2-ayat-tunggal-biasa-contoh-subjek",
              label: "Subjek",
              summary: "Pelajar itu",
            },
            {
              id: "bm-f2-ayat-tunggal-biasa-contoh-predikat",
              label: "Predikat",
              summary: "sangat rajin",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-biasa-tambahan",
          label: "Contoh Tambahan",
          summary:
            "Kakak membaca novel. • Rumah itu sangat besar. • Mereka di dalam kelas. • Ayah saya seorang jurutera.",
        },
        {
          id: "bm-f2-ayat-tunggal-biasa-nota",
          label: "Nota",
          summary:
            "Susunan biasa ialah bentuk yang paling jelas untuk mengenal pasti subjek dan predikat.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-songsang",
      label: "Susunan Songsang",
      children: [
        {
          id: "bm-f2-ayat-tunggal-songsang-maksud",
          label: "Maksud",
          summary:
            "Dalam susunan songsang, seluruh predikat atau sebahagian predikat hadir sebelum subjek.",
        },
        {
          id: "bm-f2-ayat-tunggal-songsang-seluruh",
          label: "Contoh Seluruh Predikat",
          children: [
            {
              id: "bm-f2-ayat-tunggal-songsang-seluruh-ayat",
              label: "Ayat",
              summary: '"Sangat rajin pelajar itu."',
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-seluruh-predikat",
              label: "Predikat",
              summary: "Sangat rajin",
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-seluruh-subjek",
              label: "Subjek",
              summary: "pelajar itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-songsang-sebahagian",
          label: "Contoh Sebahagian Predikat",
          children: [
            {
              id: "bm-f2-ayat-tunggal-songsang-sebahagian-ayat",
              label: "Ayat",
              summary: '"Di dalam kelas mereka belajar."',
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-sebahagian-awal",
              label: "Bahagian Predikat di Hadapan",
              summary: "Di dalam kelas",
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-sebahagian-subjek",
              label: "Subjek",
              summary: "mereka",
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-sebahagian-baki",
              label: "Baki Predikat",
              summary: "belajar",
            },
            {
              id: "bm-f2-ayat-tunggal-songsang-sebahagian-konteks",
              label: "Konteks",
              summary:
                "Binaan ini bertanda dan digunakan apabila keterangan tempat hendak diberikan penekanan; analisis mesti mengikut struktur dan konteks.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-songsang-tujuan",
          label: "Tujuan",
          summary:
            "Susunan songsang boleh digunakan untuk memberikan penekanan atau menghasilkan kesan gaya.",
        },
        {
          id: "bm-f2-ayat-tunggal-songsang-ketepatan",
          label: "Nota Ketepatan",
          summary:
            "Pembalikan kata secara rawak tidak menghasilkan ayat songsang yang gramatis. Maksud dan tatabahasa ayat mesti kekal jelas.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-jenis",
      label: "Jenis Ayat Tunggal",
      children: [
        {
          id: "bm-f2-ayat-tunggal-jenis-penyata",
          label: "Ayat Penyata",
          summary: '"Ali membaca buku."',
        },
        {
          id: "bm-f2-ayat-tunggal-jenis-tanya",
          label: "Ayat Tanya",
          summary: '"Adakah Ali membaca buku?"',
        },
        {
          id: "bm-f2-ayat-tunggal-jenis-perintah",
          label: "Ayat Perintah",
          summary: '"Bacalah buku itu."',
        },
        {
          id: "bm-f2-ayat-tunggal-jenis-seruan",
          label: "Ayat Seruan",
          summary: '"Wah, cantiknya pemandangan itu!"',
        },
        {
          id: "bm-f2-ayat-tunggal-jenis-beza",
          label: "Dua Pengelasan",
          summary:
            "Sesuatu ayat boleh kekal sebagai ayat tunggal dan pada masa yang sama dikelaskan mengikut tujuan sebagai ayat penyata, tanya, perintah atau seruan.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-pencerakinan",
      label: "Pencerakinan",
      children: [
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-maksud",
          label: "Maksud",
          summary:
            "Pencerakinan ialah proses memisahkan ayat majmuk menjadi beberapa ayat tunggal.",
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-asal",
          label: "Contoh Asal",
          summary: '"Ali membaca buku dan Siti menulis karangan."',
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-ayat-1",
          label: "Ayat Tunggal 1",
          summary: '"Ali membaca buku."',
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-ayat-2",
          label: "Ayat Tunggal 2",
          summary: '"Siti menulis karangan."',
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-maksud-kekal",
          label: "Kekalkan Maksud",
          summary: "Maksud asal mesti dikekalkan selepas ayat dipisahkan.",
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-maklumat",
          label: "Kekalkan Maklumat",
          summary:
            "Jangan gugurkan subjek, kata kerja, objek, masa, tempat atau keterangan yang diperlukan untuk mengekalkan maksud asal.",
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-subjek-sama",
          label: "Contoh Subjek Sama",
          children: [
            {
              id: "bm-f2-ayat-tunggal-pencerakinan-subjek-sama-asal",
              label: "Ayat Asal",
              summary: '"Amir membeli buku dan membaca buku itu di rumah."',
            },
            {
              id: "bm-f2-ayat-tunggal-pencerakinan-subjek-sama-1",
              label: "Ayat Tunggal 1",
              summary: '"Amir membeli buku."',
            },
            {
              id: "bm-f2-ayat-tunggal-pencerakinan-subjek-sama-2",
              label: "Ayat Tunggal 2",
              summary: '"Amir membaca buku itu di rumah."',
            },
            {
              id: "bm-f2-ayat-tunggal-pencerakinan-subjek-sama-pulih",
              label: "Pulihkan Subjek",
              summary:
                "Subjek yang digugurkan dalam klausa kedua mungkin perlu dinyatakan semula supaya hasil pencerakinan menjadi ayat yang lengkap.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-pencerakinan-nota",
          label: "Nota",
          summary:
            "Jangan memotong ayat secara mekanikal pada setiap kata hubung. Pastikan setiap hasil ialah ayat yang lengkap, gramatis dan mengekalkan maksud.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-bezakan",
      label: "Bezakan dengan Ayat Majmuk",
      children: [
        {
          id: "bm-f2-ayat-tunggal-bezakan-tunggal",
          label: "Ayat Tunggal",
          summary: "Mempunyai satu struktur utama subjek-predikat.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-bezakan-tunggal-contoh",
              label: "Contoh",
              summary: '"Farah membaca novel."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-bezakan-majmuk",
          label: "Ayat Majmuk",
          summary: "Mengandungi dua atau lebih klausa atau gabungan struktur ayat.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-bezakan-majmuk-contoh",
              label: "Contoh",
              summary: '"Farah membaca novel dan adiknya menonton televisyen."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-bezakan-panjang",
          label: "Jangan Nilai Berdasarkan Panjang",
          summary:
            "Panjang ayat sahaja bukan penentu sama ada sesuatu ayat ialah ayat tunggal atau ayat majmuk.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-bezakan-panjang-contoh",
              label: "Contoh Panjang",
              summary:
                '"Murid yang rajin itu sedang membaca buku sejarah di perpustakaan sekolah."',
            },
            {
              id: "bm-f2-ayat-tunggal-bezakan-panjang-nota",
              label: "Nota Analisis",
              summary:
                "Analisis klausa yang tepat mesti mengikut struktur ayat; panjang ayat semata-mata tidak boleh dijadikan ukuran.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-bezakan-hubung",
          label: "Cari Kata Hubung",
          summary:
            "Kata hubung seperti dan, tetapi, kerana dan yang mungkin menandakan struktur yang lebih kompleks.",
          children: [
            {
              id: "bm-f2-ayat-tunggal-bezakan-hubung-nota",
              label: "Nota Ketepatan",
              summary:
                "Kehadiran kata hubung tidak bermaksud setiap ayat mesti dianalisis dengan cara yang sama; semak fungsi dan struktur dalam konteks.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-bezakan-ujian",
          label: "Ujian Asas",
          summary:
            "Tanya: Berapakah hubungan subjek-predikat lengkap yang terdapat dalam ayat ini?",
          children: [
            {
              id: "bm-f2-ayat-tunggal-bezakan-ujian-batas",
              label: "Batas Ujian",
              summary:
                "Gunakan soalan ini sebagai panduan peringkat sekolah, bukan rumus mutlak untuk setiap struktur bahasa yang lebih lanjut.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-f2-ayat-tunggal-kesalahan-subjek",
          label: "Salah Membahagi Subjek",
          children: [
            {
              id: "bm-f2-ayat-tunggal-kesalahan-subjek-ayat",
              label: "Ayat",
              summary: '"Rumah besar di hujung jalan itu telah dijual."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-subjek-salah",
              label: "Subjek Salah",
              summary: "Rumah",
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-subjek-betul",
              label: "Subjek Betul",
              summary: "Rumah besar di hujung jalan itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-fragmen",
          label: "Ayat Tidak Lengkap",
          children: [
            {
              id: "bm-f2-ayat-tunggal-kesalahan-fragmen-salah",
              label: "Fragmen",
              summary: '"Sedang membaca buku."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-fragmen-betul",
              label: "Ayat Lengkap",
              summary: '"Farah sedang membaca buku."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-panjang",
          label: "Menganggap Ayat Panjang sebagai Majmuk",
          summary: "Jangan mengelaskan ayat berdasarkan panjangnya sahaja.",
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-cerakin",
          label: "Pencerakinan Tidak Lengkap",
          children: [
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-asal",
              label: "Ayat Asal",
              summary: '"Ali membeli dan membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-salah-1",
              label: "Salah 1",
              summary: '"Ali membeli."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-salah-2",
              label: "Salah 2",
              summary: '"membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-betul-1",
              label: "Lebih Tepat 1",
              summary: '"Ali membeli buku itu."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-betul-2",
              label: "Lebih Tepat 2",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-cerakin-syarat",
              label: "Syarat",
              summary:
                "Gunakan pembinaan semula ini hanya apabila objek yang sama memang dimaksudkan dalam ayat asal.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-maksud",
          label: "Mengubah Maksud",
          summary:
            "Jangan menambah maklumat baharu atau menggugurkan maklumat penting semasa memisahkan ayat.",
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-pola",
          label: "Salah Pola Ayat",
          children: [
            {
              id: "bm-f2-ayat-tunggal-kesalahan-pola-ayat",
              label: "Ayat",
              summary: '"Mereka ke hospital."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-pola-betul",
              label: "Betul",
              summary: "FN + FS",
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-pola-salah",
              label: "Bukan",
              summary: "FN + FK",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-kesalahan-songsang",
          label: "Susunan Songsang Tidak Gramatis",
          children: [
            {
              id: "bm-f2-ayat-tunggal-kesalahan-songsang-salah",
              label: "Pembalikan Salah",
              summary: '"Buku membaca Ali."',
            },
            {
              id: "bm-f2-ayat-tunggal-kesalahan-songsang-betul",
              label: "Susunan Biasa Betul",
              summary: '"Ali membaca buku."',
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-subjek",
          label: "Cari Subjek",
          summary: "Kenal pasti seluruh frasa nama yang sedang diterangkan.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-predikat",
          label: "Cari Predikat",
          summary: "Kenal pasti seluruh frasa yang menerangkan subjek.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-pola",
          label: "Tentukan Pola",
          summary: "Pilih FN + FN, FN + FK, FN + FA atau FN + FS.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-struktur",
          label: "Kira Struktur Utama",
          summary:
            "Semak sama ada ayat mempunyai satu struktur utama subjek-predikat atau lebih daripada satu.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-cerakin",
          label: "Untuk Pencerakinan",
          summary:
            "Cari klausa yang digabungkan, pulihkan subjek yang digugurkan jika perlu, bina ayat lengkap dan kekalkan maksud asal.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-susunan",
          label: "Semak Susunan",
          summary: "Tentukan sama ada ayat menggunakan susunan biasa atau susunan songsang.",
        },
        {
          id: "bm-f2-ayat-tunggal-tip-uasa-baca",
          label: "Baca Semula",
          summary:
            "Pastikan setiap ayat yang terhasil lengkap, gramatis dan membawa maksud yang jelas.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-tunggal-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-f2-ayat-tunggal-ingat-rumus",
          label: "Rumus",
          summary: "Ayat Tunggal = Satu Subjek + Satu Predikat",
        },
        {
          id: "bm-f2-ayat-tunggal-ingat-pola",
          label: "Empat Pola",
          summary: "FN + FN • FN + FK • FN + FA • FN + FS",
        },
        {
          id: "bm-f2-ayat-tunggal-ingat-biasa",
          label: "Susunan Biasa",
          summary: "Subjek + Predikat",
        },
        {
          id: "bm-f2-ayat-tunggal-ingat-songsang",
          label: "Susunan Songsang",
          children: [
            {
              id: "bm-f2-ayat-tunggal-ingat-songsang-seluruh",
              label: "Seluruh Predikat",
              summary: "Predikat + Subjek",
            },
            {
              id: "bm-f2-ayat-tunggal-ingat-songsang-sebahagian",
              label: "Sebahagian Predikat",
              summary: "Sebahagian Predikat + Subjek + Baki Predikat",
            },
            {
              id: "bm-f2-ayat-tunggal-ingat-songsang-nota",
              label: "Nota",
              summary:
                "Formula separa hanya digunakan apabila bahagian predikat yang didahulukan dan baki predikat dapat dikenal pasti dengan tepat.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-tunggal-ingat-contoh",
          label: "Contoh Cepat",
          summary:
            "Adik tidur. • Cuaca sangat indah. • Mereka ke sekolah. • Abang saya seorang guru.",
        },
        {
          id: "bm-f2-ayat-tunggal-ingat-semakan",
          label: "Semakan",
          summary: "Adakah ayat ini mempunyai satu struktur subjek dan predikat yang lengkap?",
        },
      ],
    },
  ],
};
