import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuForm2AyatAktifMindMap: MindNode = {
  id: "bm-f2-ayat-aktif-root",
  label: "AYAT AKTIF",
  summary:
    "Ayat aktif ialah ayat yang menekankan pelaku sebagai subjek yang melakukan sesuatu perbuatan.",
  children: [
    {
      id: "bm-f2-ayat-aktif-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-f2-ayat-aktif-definisi-maksud",
          label: "Maksud",
          summary:
            "Ayat aktif ialah ayat yang mengutamakan pelaku sebagai subjek yang melakukan sesuatu perbuatan atau tindakan.",
        },
        {
          id: "bm-f2-ayat-aktif-definisi-fokus",
          label: "Fokus Ayat",
          children: [
            {
              id: "bm-f2-ayat-aktif-definisi-fokus-pelaku",
              label: "Pelaku",
              summary: "Siapakah yang melakukan perbuatan?",
            },
            {
              id: "bm-f2-ayat-aktif-definisi-fokus-perbuatan",
              label: "Perbuatan",
              summary: "Apakah tindakan yang dilakukan?",
            },
            {
              id: "bm-f2-ayat-aktif-definisi-fokus-penerima",
              label: "Penerima Perbuatan",
              summary: "Apakah atau siapakah yang menerima perbuatan, jika berkaitan?",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-definisi-contoh",
          label: "Contoh Mudah",
          children: [
            {
              id: "bm-f2-ayat-aktif-definisi-contoh-ayat",
              label: "Ayat",
              summary: '"Aiman membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-definisi-contoh-pelaku",
              label: "Pelaku / Subjek",
              summary: "Aiman",
            },
            {
              id: "bm-f2-ayat-aktif-definisi-contoh-kata-kerja",
              label: "Kata Kerja",
              summary: "membaca",
            },
            {
              id: "bm-f2-ayat-aktif-definisi-contoh-objek",
              label: "Objek",
              summary: "buku itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-definisi-nota",
          label: "Nota",
          summary:
            "Bukan setiap ayat aktif mesti mempunyai objek. Ayat aktif dengan kata kerja tak transitif boleh lengkap tanpa objek.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-struktur",
      label: "Struktur Ayat",
      children: [
        {
          id: "bm-f2-ayat-aktif-struktur-umum",
          label: "Struktur Umum",
          summary: "Pelaku / Subjek + Kata Kerja + Objek, Pelengkap atau Keterangan",
        },
        {
          id: "bm-f2-ayat-aktif-struktur-transitif",
          label: "Contoh Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-ayat",
              label: "Ayat",
              summary: '"Ameer dan Nazeem menziarahi Ganesan di hospital."',
            },
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-pelaku",
              label: "Pelaku / Frasa Nama",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-kata-kerja",
              label: "Kata Kerja",
              summary: "menziarahi",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-objek",
              label: "Objek",
              summary: "Ganesan",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-keterangan",
              label: "Keterangan",
              summary: "di hospital",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-transitif-predikat",
              label: "Predikat / Frasa Kerja",
              summary: "menziarahi Ganesan di hospital",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-struktur-tak-transitif",
          label: "Contoh Tak Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-struktur-tak-transitif-ayat",
              label: "Ayat",
              summary: '"Adik tidur di bilik."',
            },
            {
              id: "bm-f2-ayat-aktif-struktur-tak-transitif-pelaku",
              label: "Pelaku / Frasa Nama",
              summary: "Adik",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-tak-transitif-kata-kerja",
              label: "Kata Kerja",
              summary: "tidur",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-tak-transitif-keterangan",
              label: "Keterangan",
              summary: "di bilik",
            },
            {
              id: "bm-f2-ayat-aktif-struktur-tak-transitif-nota",
              label: "Nota",
              summary: "Kata kerja ini tidak memerlukan objek.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-struktur-subjek",
          label: "Subjek",
          summary: "Subjek biasanya ialah frasa nama yang merujuk kepada pelaku.",
        },
        {
          id: "bm-f2-ayat-aktif-struktur-predikat",
          label: "Predikat",
          summary:
            "Predikat lazimnya mengandungi frasa kerja yang menerangkan tindakan, proses atau keadaan berasaskan kata kerja.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-transitif",
      label: "Ayat Aktif Transitif",
      children: [
        {
          id: "bm-f2-ayat-aktif-transitif-maksud",
          label: "Maksud",
          summary: "Ayat aktif transitif mengandungi kata kerja transitif yang memerlukan objek.",
        },
        {
          id: "bm-f2-ayat-aktif-transitif-rumus",
          label: "Rumus",
          summary: "Pelaku + Kata Kerja Transitif + Objek",
        },
        {
          id: "bm-f2-ayat-aktif-transitif-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-ayat-aktif-transitif-contoh-ayat",
              label: "Ayat",
              summary: '"Farah menulis surat."',
            },
            {
              id: "bm-f2-ayat-aktif-transitif-contoh-pelaku",
              label: "Pelaku",
              summary: "Farah",
            },
            {
              id: "bm-f2-ayat-aktif-transitif-contoh-kata-kerja",
              label: "Kata Kerja Transitif",
              summary: "menulis",
            },
            {
              id: "bm-f2-ayat-aktif-transitif-contoh-objek",
              label: "Objek",
              summary: "surat",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-transitif-tambahan",
          label: "Contoh Tambahan",
          summary:
            "Murid itu membaca novel. • Ibu memasak nasi. • Mereka menguruskan program. • Kita memupuk perpaduan.",
        },
        {
          id: "bm-f2-ayat-aktif-transitif-ciri",
          label: "Ciri Penting",
          summary: "Objek lazimnya terdiri daripada frasa nama.",
        },
        {
          id: "bm-f2-ayat-aktif-transitif-pasif",
          label: "Boleh Dipasifkan",
          children: [
            {
              id: "bm-f2-ayat-aktif-transitif-pasif-aktif",
              label: "Ayat Aktif",
              summary: '"Farah menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-aktif-transitif-pasif-hasil",
              label: "Ayat Pasif",
              summary: '"Surat itu ditulis oleh Farah."',
            },
            {
              id: "bm-f2-ayat-aktif-transitif-pasif-nota",
              label: "Nota Ketepatan",
              summary:
                "Ayat aktif transitif yang sesuai biasanya boleh dipasifkan, tetapi struktur akhirnya tetap bergantung pada jenis pelaku dan konteks.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-tak-transitif",
      label: "Ayat Aktif Tak Transitif",
      children: [
        {
          id: "bm-f2-ayat-aktif-tak-transitif-maksud",
          label: "Maksud",
          summary: "Ayat aktif tak transitif menggunakan kata kerja yang tidak memerlukan objek.",
        },
        {
          id: "bm-f2-ayat-aktif-tak-transitif-tanpa-pelengkap",
          label: "Contoh Tanpa Pelengkap",
          summary: "Adik tidur. • Burung itu terbang. • Mereka tersenyum.",
        },
        {
          id: "bm-f2-ayat-aktif-tak-transitif-keterangan",
          label: "Contoh dengan Keterangan",
          summary:
            "Adik tidur di bilik. • Murid-murid berlari di padang. • Mereka bekerja pada waktu malam.",
        },
        {
          id: "bm-f2-ayat-aktif-tak-transitif-pelengkap",
          label: "Contoh dengan Pelengkap",
          children: [
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pelengkap-1",
              label: "Contoh 1",
              summary: '"Abangnya menjadi doktor."',
            },
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pelengkap-2",
              label: "Contoh 2",
              summary: '"Keadaannya beransur pulih."',
            },
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pelengkap-3",
              label: "Contoh 3",
              summary: '"Mereka tinggal di kampung."',
            },
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pelengkap-nota",
              label: "Penerangan",
              summary:
                "Sesetengah kata kerja tak transitif boleh berdiri sendiri, manakala yang lain memerlukan atau secara semula jadi menerima pelengkap.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-tak-transitif-pasif",
          label: "Tidak Boleh Dipasifkan Secara Biasa",
          children: [
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pasif-sebab",
              label: "Sebab",
              summary:
                "Ayat tanpa objek langsung biasanya tidak boleh ditukar menjadi ayat pasif berawalan di-.",
            },
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pasif-salah",
              label: "Penukaran Mekanis yang Salah",
              summary: '"Di bilik ditidur oleh adik."',
            },
            {
              id: "bm-f2-ayat-aktif-tak-transitif-pasif-nota",
              label: "Peringatan",
              summary: "Jangan hasilkan bentuk sedemikian.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-men",
      label: "Imbuhan meN-",
      children: [
        {
          id: "bm-f2-ayat-aktif-men-fungsi",
          label: "Fungsi Umum",
          summary: "Awalan meN- lazimnya membentuk kata kerja aktif.",
        },
        {
          id: "bm-f2-ayat-aktif-men-contoh",
          label: "Contoh",
          summary: "membaca • menulis • memupuk • menyaksikan • menguruskan • menziarahi",
        },
        {
          id: "bm-f2-ayat-aktif-men-transitif",
          label: "Kata Kerja Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-men-transitif-nota",
              label: "Penerangan",
              summary: "Banyak kata kerja berawalan meN- bersifat transitif dan memerlukan objek.",
            },
            {
              id: "bm-f2-ayat-aktif-men-transitif-contoh",
              label: "Contoh",
              summary:
                "membaca buku • memupuk perpaduan • menyaksikan pertandingan • menguruskan aktiviti",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-men-nota",
          label: "Nota Ketepatan",
          children: [
            {
              id: "bm-f2-ayat-aktif-men-nota-bukan-wajib",
              label: "Bukan Bentuk Tunggal",
              summary:
                "Bukan setiap kata kerja aktif mesti berawalan meN-. Ayat aktif juga boleh menggunakan kata kerja berawalan ber-, ter-, tanpa imbuhan atau bentuk lain yang sesuai.",
            },
            {
              id: "bm-f2-ayat-aktif-men-nota-konteks",
              label: "Semak Penggunaan",
              summary:
                "Jangan anggap setiap kata kerja berawalan meN- sentiasa transitif tanpa meneliti penggunaan dan konteks.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-ber",
      label: "Imbuhan ber-",
      children: [
        {
          id: "bm-f2-ayat-aktif-ber-fungsi",
          label: "Fungsi Umum",
          summary:
            "Awalan ber- lazimnya membentuk kata kerja yang menerangkan tindakan, kegiatan, pemilikan atau keadaan mengikut konteks.",
        },
        {
          id: "bm-f2-ayat-aktif-ber-contoh",
          label: "Contoh",
          summary: "berlari • bekerja • berkhidmat • berubah • berbincang • bermain",
        },
        {
          id: "bm-f2-ayat-aktif-ber-ayat",
          label: "Contoh Ayat",
          children: [
            {
              id: "bm-f2-ayat-aktif-ber-ayat-1",
              label: "Contoh 1",
              summary: '"Para sukarelawan berkhidmat untuk masyarakat."',
            },
            {
              id: "bm-f2-ayat-aktif-ber-ayat-2",
              label: "Contoh 2",
              summary: '"Landskap pendidikan berubah dengan pesat."',
            },
            {
              id: "bm-f2-ayat-aktif-ber-ayat-3",
              label: "Contoh 3",
              summary: '"Murid-murid bermain di padang."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-ber-nota",
          label: "Nota",
          summary:
            "Banyak kata kerja berawalan ber- bersifat tak transitif, tetapi bukan semuanya berkelakuan sama. Makna dan struktur ayat bergantung pada kata kerja serta konteks.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-objek-pelengkap",
      label: "Objek dan Pelengkap",
      children: [
        {
          id: "bm-f2-ayat-aktif-objek-pelengkap-objek",
          label: "Objek",
          children: [
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-objek-maksud",
              label: "Maksud",
              summary: "Objek hadir selepas kata kerja transitif dan menerima perbuatan.",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-objek-ayat",
              label: "Ayat",
              summary: '"Siti membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-objek-jawapan",
              label: "Kenal Pasti",
              summary: "buku itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-objek-pelengkap-pelengkap",
          label: "Pelengkap",
          children: [
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-pelengkap-maksud",
              label: "Maksud",
              summary: "Pelengkap menyempurnakan maksud bagi kata kerja tak transitif tertentu.",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-pelengkap-ayat",
              label: "Ayat",
              summary: '"Abangnya menjadi doktor."',
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-pelengkap-jawapan",
              label: "Kenal Pasti",
              summary: "doktor",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-objek-pelengkap-keterangan",
          label: "Keterangan",
          children: [
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-keterangan-maksud",
              label: "Fungsi",
              summary:
                "Keterangan memberikan maklumat tambahan tentang tempat, masa, cara atau tujuan.",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-keterangan-ayat",
              label: "Ayat",
              summary: '"Mereka belajar di perpustakaan."',
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-keterangan-jawapan",
              label: "Kenal Pasti",
              summary: "di perpustakaan",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-objek-pelengkap-bezakan",
          label: "Bezakan",
          children: [
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-bezakan-ayat",
              label: "Ayat",
              summary: '"Mereka menziarahi Ganesan di hospital."',
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-bezakan-objek",
              label: "Objek",
              summary: "Ganesan",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-bezakan-keterangan",
              label: "Keterangan",
              summary: "di hospital",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-bezakan-nota",
              label: "Peringatan",
              summary: "Jangan labelkan setiap frasa selepas kata kerja sebagai objek.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-objek-pelengkap-ujian",
          label: "Ujian Ringkas",
          children: [
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-ujian-objek",
              label: "Soalan 1",
              summary:
                "Adakah frasa itu menerima perbuatan secara langsung? Jika ya, frasa itu mungkin objek.",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-ujian-keterangan",
              label: "Soalan 2",
              summary:
                "Adakah frasa itu hanya menerangkan tempat, masa atau cara? Jika ya, frasa itu mungkin keterangan.",
            },
            {
              id: "bm-f2-ayat-aktif-objek-pelengkap-ujian-nota",
              label: "Batasan",
              summary:
                "Gunakan ujian ini sebagai panduan asas, bukan sebagai peraturan mutlak bagi setiap binaan lanjutan.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-hubungan-pasif",
      label: "Hubungan dengan Ayat Pasif",
      children: [
        {
          id: "bm-f2-ayat-aktif-hubungan-pasif-fokus",
          label: "Perbezaan Fokus",
          children: [
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-fokus-aktif",
              label: "Ayat Aktif",
              summary: "Fokus diberikan kepada pelaku.",
            },
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-fokus-pasif",
              label: "Ayat Pasif",
              summary: "Fokus diberikan kepada penerima perbuatan.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-hubungan-pasif-ketiga",
          label: "Contoh Orang Ketiga",
          children: [
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-ketiga-aktif",
              label: "Aktif",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-ketiga-pasif",
              label: "Pasif",
              summary: '"Buku itu dibaca oleh Ali."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-hubungan-pasif-pertama",
          label: "Contoh Orang Pertama",
          children: [
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-pertama-aktif",
              label: "Aktif",
              summary: '"Saya membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-hubungan-pasif-pertama-pasif",
              label: "Pasif",
              summary: '"Buku itu saya baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-hubungan-pasif-berubah",
          label: "Unsur yang Berubah",
          summary:
            "Mengikut jenis pasif, objek berpindah ke hadapan, bentuk kata kerja berubah, pelaku berpindah selepas objek atau kata kerja, dan awalan meN- mungkin digugurkan atau diganti.",
        },
        {
          id: "bm-f2-ayat-aktif-hubungan-pasif-kekal",
          label: "Unsur yang Kekal",
          summary:
            "Kekalkan maksud asal, kata bantu penting, masa, tempat, cara dan penerangan yang berkaitan.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-penukaran",
      label: "Penukaran Ayat",
      children: [
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-1",
          label: "Langkah 1: Cari Pelaku",
          summary: 'Dalam ayat "Sarah menutup tingkap itu.", pelakunya ialah Sarah.',
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-2",
          label: "Langkah 2: Cari Kata Kerja",
          summary: "Kata kerja: menutup",
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-3",
          label: "Langkah 3: Cari Objek",
          summary: "Objek: tingkap itu",
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-4",
          label: "Langkah 4: Pastikan Transitif",
          summary: "Ayat mesti mempunyai objek untuk penukaran aktif kepada pasif secara langsung.",
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-5",
          label: "Langkah 5: Tentukan Pelaku",
          summary: "Sarah ialah pelaku orang ketiga.",
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-langkah-6",
          label: "Langkah 6: Tukar kepada Pasif",
          summary: '"Tingkap itu ditutup oleh Sarah."',
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-pertama",
          label: "Contoh Orang Pertama",
          children: [
            {
              id: "bm-f2-ayat-aktif-penukaran-pertama-aktif",
              label: "Aktif",
              summary: '"Saya akan membaiki basikal itu."',
            },
            {
              id: "bm-f2-ayat-aktif-penukaran-pertama-pasif",
              label: "Pasif",
              summary: '"Basikal itu akan saya baiki."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-kedua",
          label: "Contoh Orang Kedua",
          children: [
            {
              id: "bm-f2-ayat-aktif-penukaran-kedua-aktif",
              label: "Aktif",
              summary: '"Kamu perlu menyiapkan latihan itu."',
            },
            {
              id: "bm-f2-ayat-aktif-penukaran-kedua-pasif",
              label: "Pasif",
              summary: '"Latihan itu perlu kamu siapkan."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-ketiga",
          label: "Contoh Orang Ketiga",
          children: [
            {
              id: "bm-f2-ayat-aktif-penukaran-ketiga-aktif",
              label: "Aktif",
              summary: '"Guru itu telah memeriksa buku latihan kami."',
            },
            {
              id: "bm-f2-ayat-aktif-penukaran-ketiga-pasif",
              label: "Pasif",
              summary: '"Buku latihan kami telah diperiksa oleh guru itu."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-penukaran-pasif-aktif",
          label: "Penukaran Pasif kepada Aktif",
          children: [
            {
              id: "bm-f2-ayat-aktif-penukaran-pasif-aktif-pasif",
              label: "Pasif",
              summary: '"Surat itu ditulis oleh Farah."',
            },
            {
              id: "bm-f2-ayat-aktif-penukaran-pasif-aktif-aktif",
              label: "Aktif",
              summary: '"Farah menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-aktif-penukaran-pasif-aktif-nota",
              label: "Peringatan",
              summary: "Kekalkan maksud asal dan semua maklumat penting.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-f2-ayat-aktif-kesalahan-men",
          label: "Menggugurkan Imbuhan meN-",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-men-salah",
              label: "Salah dalam Bentuk Baku",
              summary: '"Ali baca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-men-betul",
              label: "Bentuk Baku",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-men-nota",
              label: "Nota",
              summary:
                "Bentuk percakapan mungkin berbeza, tetapi peta minda ini mengajarkan bahasa Melayu baku bertulis.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-objek",
          label: "Tiada Objek Selepas Kata Kerja Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-objek-ringkas",
              label: "Ayat Ringkas",
              summary: '"Farah menulis."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-objek-nota",
              label: "Nota Ketepatan",
              summary:
                "Ayat ini boleh diterima jika objek telah difahami melalui konteks, tetapi latihan struktur asas bagi penggunaan transitif yang jelas biasanya menyatakan objek.",
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-objek-baik",
              label: "Contoh Pengajaran yang Lebih Jelas",
              summary: '"Farah menulis surat."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-keterangan",
          label: "Menganggap Keterangan sebagai Objek",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-keterangan-ayat",
              label: "Ayat",
              summary: '"Adik tidur di bilik."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-keterangan-salah",
              label: "Objek yang Salah",
              summary: "di bilik",
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-keterangan-betul",
              label: "Analisis Betul",
              summary: '"di bilik" ialah keterangan tempat.',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-imbuhan",
          label: "Salah Imbuhan",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-imbuhan-salah",
              label: "Salah",
              summary: '"Mereka penguruskan program itu."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-imbuhan-betul",
              label: "Betul",
              summary: '"Mereka menguruskan program itu."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-susunan",
          label: "Salah Susunan",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-susunan-salah",
              label: "Salah",
              summary: '"Buku itu membaca Ali."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-susunan-aktif",
              label: "Aktif yang Betul",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-susunan-pasif",
              label: "Pasif yang Betul",
              summary: '"Buku itu dibaca oleh Ali."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-tak-transitif",
          label: "Menukar Ayat Tak Transitif kepada Pasif",
          children: [
            {
              id: "bm-f2-ayat-aktif-kesalahan-tak-transitif-aktif",
              label: "Ayat Aktif",
              summary: '"Adik tidur di bilik."',
            },
            {
              id: "bm-f2-ayat-aktif-kesalahan-tak-transitif-nota",
              label: "Peringatan",
              summary:
                "Jangan bina ayat pasif biasa daripada ayat ini kerana tiada objek langsung.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-kesalahan-maksud",
          label: "Mengubah Maksud Semasa Penukaran",
          summary:
            "Jangan gugurkan atau ganti pelaku, objek, kata bantu, masa, tempat atau cara jika maklumat itu penting kepada maksud asal.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-f2-ayat-aktif-tip-uasa-pelaku",
          label: "Cari Pelaku",
          summary: "Tanya: Siapakah yang melakukan perbuatan?",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-kata-kerja",
          label: "Cari Kata Kerja Inti",
          summary: "Kenal pasti kata kerja utama dalam predikat.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-objek",
          label: "Cari Objek",
          summary: "Semak sama ada frasa nama lain menerima perbuatan.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-jenis",
          label: "Tentukan Jenis Ayat Aktif",
          summary: "Ayat aktif transitif atau ayat aktif tak transitif.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-imbuhan",
          label: "Semak Imbuhan",
          summary:
            "Pastikan kata kerja menggunakan bentuk baku yang sesuai seperti meN-, ber- atau bentuk lain yang berkaitan.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-penukaran",
          label: "Penukaran Ragam Ayat",
          summary:
            "Lakukan penukaran aktif kepada pasif secara langsung hanya apabila terdapat objek yang sesuai.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-maksud",
          label: "Kekalkan Maksud",
          summary: "Jangan ubah maksud asal.",
        },
        {
          id: "bm-f2-ayat-aktif-tip-uasa-semak",
          label: "Baca Semula",
          summary: "Pastikan ayat akhir lengkap dan gramatis.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-aktif-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-f2-ayat-aktif-ingat-fokus",
          label: "Fokus Ayat Aktif",
          summary: "Pelaku → melakukan perbuatan",
        },
        {
          id: "bm-f2-ayat-aktif-ingat-transitif",
          label: "Rumus Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-ingat-transitif-formula",
              label: "Formula",
              summary: "Pelaku + Kata Kerja Transitif + Objek",
            },
            {
              id: "bm-f2-ayat-aktif-ingat-transitif-contoh",
              label: "Contoh",
              summary: '"Ali membaca buku."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-ingat-tak-transitif",
          label: "Rumus Tak Transitif",
          children: [
            {
              id: "bm-f2-ayat-aktif-ingat-tak-transitif-formula",
              label: "Formula",
              summary:
                "Pelaku + Kata Kerja Tak Transitif + Pelengkap atau Keterangan jika diperlukan",
            },
            {
              id: "bm-f2-ayat-aktif-ingat-tak-transitif-contoh",
              label: "Contoh",
              summary: '"Adik tidur di bilik."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-aktif-ingat-bantuan",
          label: "Bantuan Ingatan",
          summary:
            "Ada objek → mungkin ayat aktif transitif • Tiada objek → mungkin ayat aktif tak transitif",
        },
        {
          id: "bm-f2-ayat-aktif-ingat-contoh",
          label: "Contoh Cepat",
          summary:
            "Siti membaca buku. • Mereka menguruskan program. • Murid-murid berlari di padang. • Landskap pendidikan berubah. • Abangnya menjadi doktor.",
        },
        {
          id: "bm-f2-ayat-aktif-ingat-banding",
          label: "Perbandingan Cepat",
          children: [
            {
              id: "bm-f2-ayat-aktif-ingat-banding-aktif",
              label: "Aktif",
              summary: '"Ali menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-aktif-ingat-banding-pasif",
              label: "Pasif",
              summary: '"Surat itu ditulis oleh Ali."',
            },
          ],
        },
      ],
    },
  ],
};
