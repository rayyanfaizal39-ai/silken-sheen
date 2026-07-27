import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuForm2AyatPasifMindMap: MindNode = {
  id: "bm-f2-ayat-pasif-root",
  label: "AYAT PASIF",
  summary:
    "Ayat pasif ialah ayat yang memberikan penekanan kepada objek atau pihak yang menerima sesuatu perbuatan.",
  children: [
    {
      id: "bm-f2-ayat-pasif-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-f2-ayat-pasif-definisi-maksud",
          label: "Maksud",
          summary:
            "Ayat pasif ialah ayat yang mengutamakan objek atau pihak yang menerima perbuatan.",
        },
        {
          id: "bm-f2-ayat-pasif-definisi-fokus",
          label: "Fokus Ayat",
          children: [
            {
              id: "bm-f2-ayat-pasif-definisi-fokus-aktif",
              label: "Ayat Aktif",
              summary: "Fokus biasanya diberikan kepada pelaku.",
            },
            {
              id: "bm-f2-ayat-pasif-definisi-fokus-pasif",
              label: "Ayat Pasif",
              summary: "Fokus diberikan kepada objek atau penerima perbuatan.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-definisi-contoh",
          label: "Contoh Mudah",
          children: [
            {
              id: "bm-f2-ayat-pasif-definisi-contoh-aktif",
              label: "Ayat Aktif",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-pasif-definisi-contoh-pasif",
              label: "Ayat Pasif",
              summary: '"Buku itu dibaca oleh Ali."',
            },
            {
              id: "bm-f2-ayat-pasif-definisi-contoh-objek",
              label: "Objek dalam Ayat Aktif",
              summary: "buku itu",
            },
            {
              id: "bm-f2-ayat-pasif-definisi-contoh-fokus",
              label: "Subjek atau Fokus di Hadapan",
              summary: "Buku itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-definisi-nota",
          label: "Nota Ketepatan",
          summary:
            'Tidak setiap ayat pasif mesti mengandungi perkataan "oleh"; bentuk ayat bergantung pada jenis pelaku dan konteks.',
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-aktif-pasif",
      label: "Ayat Aktif dan Pasif",
      children: [
        {
          id: "bm-f2-ayat-pasif-aktif-pasif-aktif",
          label: "Ayat Aktif",
          children: [
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-aktif-struktur",
              label: "Struktur",
              summary: "Pelaku + Kata Kerja Transitif + Objek",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-aktif-ayat",
              label: "Contoh",
              summary: '"Farah menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-aktif-pelaku",
              label: "Pelaku",
              summary: "Farah",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-aktif-kata-kerja",
              label: "Kata Kerja",
              summary: "menulis",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-aktif-objek",
              label: "Objek",
              summary: "surat itu",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-aktif-pasif-pasif",
          label: "Ayat Pasif",
          children: [
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-pasif-struktur",
              label: "Struktur",
              summary: "Struktur ayat pasif berubah mengikut jenis pelaku.",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-pasif-ayat",
              label: "Contoh",
              summary: '"Surat itu ditulis oleh Farah."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-aktif-pasif-perubahan",
          label: "Perubahan Fokus",
          children: [
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-perubahan-aktif",
              label: "Aktif",
              summary: "Siapakah yang melakukan perbuatan?",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-perubahan-pasif",
              label: "Pasif",
              summary: "Apakah yang menerima perbuatan?",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-aktif-pasif-kekal",
          label: "Unsur yang Dikekalkan",
          children: [
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-kekal-maksud",
              label: "Maksud Asal",
              summary: "Kekalkan maksud asal ayat.",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-kekal-aspek",
              label: "Masa atau Aspek",
              summary: "Kekalkan kata bantu yang berkaitan apabila diperlukan.",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-kekal-keterangan",
              label: "Keterangan",
              summary: "Kekalkan keterangan dan penerangan penting secara semula jadi.",
            },
            {
              id: "bm-f2-ayat-pasif-aktif-pasif-kekal-nota",
              label: "Peringatan",
              summary: "Jangan tambah atau gugurkan maklumat tanpa sebab.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-diri-pertama",
      label: "Pasif Diri Pertama",
      children: [
        {
          id: "bm-f2-ayat-pasif-diri-pertama-pelaku",
          label: "Pelaku",
          summary: "saya • aku • kami • kita",
        },
        {
          id: "bm-f2-ayat-pasif-diri-pertama-rumus",
          label: "Rumus",
          summary: "Objek + Kata Ganti Nama Diri Pertama + Kata Kerja Dasar",
        },
        {
          id: "bm-f2-ayat-pasif-diri-pertama-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-pertama-contoh-aktif",
              label: "Ayat Aktif",
              summary: '"Saya membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-contoh-pasif",
              label: "Ayat Pasif",
              summary: '"Buku itu saya baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-pertama-kata-bantu",
          label: "Dengan Kata Bantu",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-pertama-kata-bantu-aktif",
              label: "Ayat Aktif",
              summary: '"Saya telah menyiapkan tugasan itu."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-kata-bantu-pasif",
              label: "Ayat Pasif",
              summary: '"Tugasan itu telah saya siapkan."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-kata-bantu-contoh",
              label: "Contoh Kata Bantu",
              summary: "telah • sudah • akan • sedang",
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-kata-bantu-nota",
              label: "Penerangan",
              summary: "Kata bantu mesti dikekalkan pada kedudukan yang semula jadi dan gramatis.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-pertama-elak",
          label: "Bentuk yang Perlu Dielakkan",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-pertama-elak-bentuk",
              label: "Elakkan dalam Latihan Penukaran",
              summary: '"Buku itu dibaca oleh saya."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-elak-utama",
              label: "Utamakan",
              summary: '"Buku itu saya baca."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-pertama-elak-nota",
              label: "Nota",
              summary:
                'Bentuk dengan "oleh saya" boleh muncul dalam penggunaan sebenar, tetapi latihan penukaran standard biasanya mengharapkan pola pasif diri pertama tanpa awalan di-.',
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-diri-kedua",
      label: "Pasif Diri Kedua",
      children: [
        {
          id: "bm-f2-ayat-pasif-diri-kedua-pelaku",
          label: "Pelaku",
          summary: "awak • kamu • anda • engkau • kalian",
        },
        {
          id: "bm-f2-ayat-pasif-diri-kedua-rumus",
          label: "Rumus",
          summary: "Objek + Kata Ganti Nama Diri Kedua + Kata Kerja Dasar",
        },
        {
          id: "bm-f2-ayat-pasif-diri-kedua-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-kedua-contoh-aktif",
              label: "Ayat Aktif",
              summary: '"Awak membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-kedua-contoh-pasif",
              label: "Ayat Pasif",
              summary: '"Buku itu awak baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-kedua-kata-bantu",
          label: "Dengan Kata Bantu",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-kedua-kata-bantu-aktif",
              label: "Ayat Aktif",
              summary: '"Anda perlu menghantar borang itu hari ini."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-kedua-kata-bantu-pasif",
              label: "Ayat Pasif",
              summary: '"Borang itu perlu anda hantar hari ini."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-kedua-elak",
          label: "Bentuk yang Perlu Dielakkan",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-kedua-elak-bentuk",
              label: "Elakkan dalam Latihan Penukaran",
              summary: '"Buku itu dibaca oleh awak."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-kedua-elak-utama",
              label: "Utamakan",
              summary: '"Buku itu awak baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-kedua-nota",
          label: "Nota",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-kedua-nota-peraturan",
              label: "Peraturan",
              summary:
                "Dalam pola pasif diri pertama atau kedua yang standard, jangan letakkan awalan di- pada kata kerja.",
            },
            {
              id: "bm-f2-ayat-pasif-diri-kedua-nota-salah",
              label: "Salah",
              summary: '"Buku itu awak dibaca."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-kedua-nota-betul",
              label: "Betul",
              summary: '"Buku itu awak baca."',
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-diri-ketiga",
      label: "Pasif Diri Ketiga",
      children: [
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-pelaku",
          label: "Pelaku",
          summary: "dia • beliau • mereka • Ali • guru itu • pihak sekolah",
        },
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-rumus",
          label: "Rumus Asas",
          summary: "Objek + Kata Kerja Berawalan di- + oleh + Pelaku",
        },
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-contoh-aktif",
              label: "Ayat Aktif",
              summary: '"Ali membaca buku itu."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-contoh-pasif",
              label: "Ayat Pasif",
              summary: '"Buku itu dibaca oleh Ali."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-kata-bantu",
          label: "Dengan Kata Bantu",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-kata-bantu-aktif",
              label: "Ayat Aktif",
              summary: '"Mereka telah menyiapkan projek itu."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-kata-bantu-pasif",
              label: "Ayat Pasif",
              summary: '"Projek itu telah disiapkan oleh mereka."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-oleh",
          label: 'Penggunaan "oleh"',
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-oleh-kegunaan",
              label: "Kegunaan",
              summary: '"Oleh" lazim digunakan sebelum pelaku dalam ayat pasif diri ketiga.',
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-oleh-tanpa-pelaku",
              label: "Pelaku Boleh Digugurkan",
              summary:
                "Pelaku boleh tidak dinyatakan jika tidak diketahui, tidak penting atau telah difahami.",
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-oleh-contoh",
              label: "Contoh",
              summary: '"Pintu itu telah dikunci."',
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-oleh-nota",
              label: "Peringatan",
              summary: 'Perkataan "oleh" bukan unsur wajib dalam setiap ayat pasif.',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-diri-ketiga-ejaan",
          label: "Ejaan di-",
          children: [
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-ejaan-betul",
              label: "Betul",
              summary: "dibaca • ditulis • dihantar",
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-ejaan-salah",
              label: "Salah",
              summary: "di baca • di tulis • di hantar",
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-ejaan-awalan",
              label: "Awalan di-",
              summary: "Awalan di- ditulis serangkai dengan kata kerja.",
            },
            {
              id: "bm-f2-ayat-pasif-diri-ketiga-ejaan-sendi",
              label: "Kata Sendi Nama di",
              summary: "Kata sendi nama di ditulis terpisah: di sekolah • di rumah",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-ter",
      label: "Pasif Berimbuhan ter-",
      children: [
        {
          id: "bm-f2-ayat-pasif-ter-fungsi",
          label: "Fungsi Umum",
          children: [
            {
              id: "bm-f2-ayat-pasif-ter-fungsi-makna",
              label: "Makna Mengikut Konteks",
              summary:
                "Awalan ter- boleh menunjukkan perbuatan tidak sengaja, keadaan yang telah berlaku, atau keupayaan dan ketidakupayaan.",
            },
            {
              id: "bm-f2-ayat-pasif-ter-fungsi-nota",
              label: "Peringatan",
              summary: "Jangan hadkan awalan ter- kepada satu makna sahaja.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ter-tidak-sengaja",
          label: "Tidak Sengaja",
          children: [
            {
              id: "bm-f2-ayat-pasif-ter-tidak-sengaja-contoh-1",
              label: "Contoh 1",
              summary: '"Buku itu terbawa oleh saya."',
            },
            {
              id: "bm-f2-ayat-pasif-ter-tidak-sengaja-contoh-2",
              label: "Contoh 2",
              summary: '"Pintu itu tertutup dengan tiba-tiba."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ter-keadaan",
          label: "Keadaan yang Sudah Berlaku",
          children: [
            {
              id: "bm-f2-ayat-pasif-ter-keadaan-contoh",
              label: "Contoh",
              summary: '"Nama peserta telah tercatat dalam senarai."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ter-keupayaan",
          label: "Keupayaan",
          children: [
            {
              id: "bm-f2-ayat-pasif-ter-keupayaan-contoh",
              label: "Contoh",
              summary: '"Tulisan itu tidak terbaca."',
            },
            {
              id: "bm-f2-ayat-pasif-ter-keupayaan-nota",
              label: "Penerangan",
              summary: "Makna sebenar awalan ter- perlu ditentukan berdasarkan konteks.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ter-nota",
          label: "Nota Ketepatan",
          summary:
            "Bukan setiap kata kerja berawalan ter- ialah bentuk pasif biasa atau hasil penukaran terus daripada ayat aktif.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-ke-an",
      label: "Pasif Berimbuhan ke-...-an",
      children: [
        {
          id: "bm-f2-ayat-pasif-ke-an-fungsi",
          label: "Fungsi Umum",
          summary:
            "Sesetengah binaan berimbuhan ke-...-an menerangkan seseorang atau sesuatu yang mengalami keadaan yang tidak diingini atau tidak terkawal.",
        },
        {
          id: "bm-f2-ayat-pasif-ke-an-contoh",
          label: "Contoh",
          summary: "kehujanan • kecurian • kehilangan • kepanasan",
        },
        {
          id: "bm-f2-ayat-pasif-ke-an-ayat",
          label: "Contoh Ayat",
          children: [
            {
              id: "bm-f2-ayat-pasif-ke-an-ayat-1",
              label: "Contoh 1",
              summary: '"Mereka kehujanan ketika pulang dari sekolah."',
            },
            {
              id: "bm-f2-ayat-pasif-ke-an-ayat-2",
              label: "Contoh 2",
              summary: '"Keluarga itu kehilangan barang berharga."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ke-an-nota",
          label: "Nota Ketepatan",
          children: [
            {
              id: "bm-f2-ayat-pasif-ke-an-nota-makna",
              label: "Keadaan atau Pengalaman",
              summary:
                "Binaan ini menyatakan keadaan atau pengalaman yang menimpa pihak yang terlibat.",
            },
            {
              id: "bm-f2-ayat-pasif-ke-an-nota-batas",
              label: "Batasan",
              summary: "Bukan setiap perkataan berimbuhan ke-...-an ialah kata kerja pasif biasa.",
            },
            {
              id: "bm-f2-ayat-pasif-ke-an-nota-rumus",
              label: "Jangan Paksa Rumus",
              summary:
                "Binaan ini tidak semestinya boleh ditukar menggunakan rumus pasif berawalan di-.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-penukaran",
      label: "Penukaran Ayat",
      children: [
        {
          id: "bm-f2-ayat-pasif-penukaran-langkah-1",
          label: "Langkah 1: Cari Pelaku",
          summary: 'Dalam ayat "Sarah menutup tingkap itu.", pelakunya ialah Sarah.',
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-langkah-2",
          label: "Langkah 2: Cari Kata Kerja Transitif",
          summary: "Kata kerja transitif: menutup",
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-langkah-3",
          label: "Langkah 3: Cari Objek",
          summary: "Objek: tingkap itu",
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-langkah-4",
          label: "Langkah 4: Tentukan Jenis Pelaku",
          summary: "Sarah ialah pelaku orang ketiga.",
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-langkah-5",
          label: "Langkah 5: Susun Ayat Pasif",
          summary: '"Tingkap itu ditutup oleh Sarah."',
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-pertama",
          label: "Contoh Diri Pertama",
          children: [
            {
              id: "bm-f2-ayat-pasif-penukaran-pertama-aktif",
              label: "Ayat Aktif",
              summary: '"Saya akan membaiki basikal itu."',
            },
            {
              id: "bm-f2-ayat-pasif-penukaran-pertama-pasif",
              label: "Ayat Pasif",
              summary: '"Basikal itu akan saya baiki."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-kedua",
          label: "Contoh Diri Kedua",
          children: [
            {
              id: "bm-f2-ayat-pasif-penukaran-kedua-aktif",
              label: "Ayat Aktif",
              summary: '"Kamu perlu menyiapkan latihan itu."',
            },
            {
              id: "bm-f2-ayat-pasif-penukaran-kedua-pasif",
              label: "Ayat Pasif",
              summary: '"Latihan itu perlu kamu siapkan."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-ketiga",
          label: "Contoh Diri Ketiga",
          children: [
            {
              id: "bm-f2-ayat-pasif-penukaran-ketiga-aktif",
              label: "Ayat Aktif",
              summary: '"Guru itu memeriksa buku latihan kami."',
            },
            {
              id: "bm-f2-ayat-pasif-penukaran-ketiga-pasif",
              label: "Ayat Pasif",
              summary: '"Buku latihan kami diperiksa oleh guru itu."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-kekal",
          label: "Kekalkan Maklumat",
          children: [
            {
              id: "bm-f2-ayat-pasif-penukaran-kekal-unsur",
              label: "Unsur Penting",
              summary: "kata bantu • keterangan masa • keterangan tempat • keterangan cara",
            },
            {
              id: "bm-f2-ayat-pasif-penukaran-kekal-nota",
              label: "Peringatan",
              summary:
                "Kekalkan semua unsur penting pada kedudukan yang semula jadi selepas penukaran.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-penukaran-syarat",
          label: "Syarat Penukaran Terus",
          summary:
            "Gunakan ayat aktif transitif yang mempunyai objek untuk latihan penukaran aktif kepada pasif secara langsung.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-f2-ayat-pasif-kesalahan-men",
          label: "Mengekalkan meN-",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-men-salah",
              label: "Salah",
              summary: '"Buku itu saya membaca."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-men-betul",
              label: "Betul",
              summary: '"Buku itu saya baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-pertama",
          label: "Menggunakan di- untuk Diri Pertama",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-pertama-salah",
              label: "Tidak Diutamakan dalam Peperiksaan",
              summary: '"Surat itu dihantar oleh kami."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-pertama-betul",
              label: "Bentuk Standard",
              summary: '"Surat itu kami hantar."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-pertama-bantu",
              label: "Dengan Kata Bantu",
              summary: '"Surat itu telah kami hantar."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-kedua",
          label: "Salah Susunan Diri Kedua",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-kedua-salah",
              label: "Salah",
              summary: '"Buku itu dibaca awak."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-kedua-betul",
              label: "Betul",
              summary: '"Buku itu awak baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-awalan",
          label: "Memisahkan Awalan di-",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-awalan-salah",
              label: "Salah",
              summary: '"Buku itu di baca oleh Ali."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-awalan-betul",
              label: "Betul",
              summary: '"Buku itu dibaca oleh Ali."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-sendi",
          label: "Menggabungkan Kata Sendi di",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-sendi-salah",
              label: "Salah",
              summary: '"Dia belajar disekolah."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-sendi-betul",
              label: "Betul",
              summary: '"Dia belajar di sekolah."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-sendi-banding",
              label: "Perbandingan",
              summary: "di- + kata kerja → ditulis serangkai • di + tempat → ditulis terpisah",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-bantu",
          label: "Menggugurkan Kata Bantu",
          children: [
            {
              id: "bm-f2-ayat-pasif-kesalahan-bantu-aktif",
              label: "Ayat Aktif",
              summary: '"Mereka telah menyiapkan projek itu."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-bantu-salah",
              label: "Pasif Kurang Tepat",
              summary: '"Projek itu disiapkan oleh mereka."',
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-bantu-sebab",
              label: "Sebab",
              summary: "Maklumat aspek telah digugurkan atau dilemahkan.",
            },
            {
              id: "bm-f2-ayat-pasif-kesalahan-bantu-betul",
              label: "Lebih Tepat",
              summary: '"Projek itu telah disiapkan oleh mereka."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-maksud",
          label: "Menukar Maksud",
          summary:
            "Jangan ganti, gugurkan atau tambah pelaku, objek atau keterangan sehingga maksud asal berubah.",
        },
        {
          id: "bm-f2-ayat-pasif-kesalahan-rumus",
          label: "Menggunakan Rumus yang Sama untuk Semua Pelaku",
          summary:
            "Pasif diri pertama dan kedua menggunakan pola standard yang berbeza daripada pasif diri ketiga.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-f2-ayat-pasif-tip-uasa-pelaku",
          label: "Kenal Pasti Pelaku",
          summary: "Tentukan sama ada pelaku ialah diri pertama, kedua atau ketiga.",
        },
        {
          id: "bm-f2-ayat-pasif-tip-uasa-objek",
          label: "Cari Objek",
          summary: "Objek dalam ayat aktif biasanya dipindahkan ke hadapan dalam ayat pasif.",
        },
        {
          id: "bm-f2-ayat-pasif-tip-uasa-rumus",
          label: "Pilih Rumus",
          children: [
            {
              id: "bm-f2-ayat-pasif-tip-uasa-rumus-pertama-kedua",
              label: "Diri Pertama dan Kedua",
              summary: "Objek + Pelaku + Kata Kerja Dasar",
            },
            {
              id: "bm-f2-ayat-pasif-tip-uasa-rumus-ketiga",
              label: "Diri Ketiga",
              summary: "Objek + di- Kata Kerja + oleh + Pelaku",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-tip-uasa-bantu",
          label: "Kekalkan Kata Bantu",
          summary: "telah • sedang • akan • mesti • perlu",
        },
        {
          id: "bm-f2-ayat-pasif-tip-uasa-imbuhan",
          label: "Semak Imbuhan",
          children: [
            {
              id: "bm-f2-ayat-pasif-tip-uasa-imbuhan-men",
              label: "meN-",
              summary: "Gugurkan awalan meN- apabila pola pasif menghendakinya.",
            },
            {
              id: "bm-f2-ayat-pasif-tip-uasa-imbuhan-di",
              label: "di-",
              summary:
                "Gunakan awalan di- dengan betul bagi pasif diri ketiga dan tulis serangkai dengan kata kerja.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-tip-uasa-semak",
          label: "Baca Semula",
          summary:
            "Pastikan maksud tidak berubah, ayat gramatis dan tiada maklumat penting yang hilang.",
        },
      ],
    },
    {
      id: "bm-f2-ayat-pasif-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-f2-ayat-pasif-ingat-fokus",
          label: "Fokus",
          children: [
            {
              id: "bm-f2-ayat-pasif-ingat-fokus-aktif",
              label: "Ayat Aktif",
              summary: "Pelaku diutamakan.",
            },
            {
              id: "bm-f2-ayat-pasif-ingat-fokus-pasif",
              label: "Ayat Pasif",
              summary: "Penerima perbuatan diutamakan.",
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ingat-rumus-pertama-kedua",
          label: "Rumus Diri Pertama dan Kedua",
          children: [
            {
              id: "bm-f2-ayat-pasif-ingat-rumus-pertama-kedua-formula",
              label: "Formula",
              summary: "Objek + Pelaku + Kata Kerja Dasar",
            },
            {
              id: "bm-f2-ayat-pasif-ingat-rumus-pertama-kedua-contoh-1",
              label: "Contoh 1",
              summary: '"Buku itu saya baca."',
            },
            {
              id: "bm-f2-ayat-pasif-ingat-rumus-pertama-kedua-contoh-2",
              label: "Contoh 2",
              summary: '"Buku itu awak baca."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ingat-rumus-ketiga",
          label: "Rumus Diri Ketiga",
          children: [
            {
              id: "bm-f2-ayat-pasif-ingat-rumus-ketiga-formula",
              label: "Formula",
              summary: "Objek + di- Kata Kerja + oleh + Pelaku",
            },
            {
              id: "bm-f2-ayat-pasif-ingat-rumus-ketiga-contoh",
              label: "Contoh",
              summary: '"Buku itu dibaca oleh Ali."',
            },
          ],
        },
        {
          id: "bm-f2-ayat-pasif-ingat-bantuan",
          label: "Bantuan Ingatan",
          summary: "Saya atau awak → jangan gunakan di- • Ali, dia atau mereka → gunakan di-",
        },
        {
          id: "bm-f2-ayat-pasif-ingat-semak",
          label: "Semakan Cepat",
          children: [
            {
              id: "bm-f2-ayat-pasif-ingat-semak-ketiga-aktif",
              label: "Aktif: Diri Ketiga",
              summary: '"Ali menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-pasif-ingat-semak-ketiga-pasif",
              label: "Pasif: Diri Ketiga",
              summary: '"Surat itu ditulis oleh Ali."',
            },
            {
              id: "bm-f2-ayat-pasif-ingat-semak-pertama-aktif",
              label: "Aktif: Diri Pertama",
              summary: '"Saya menulis surat itu."',
            },
            {
              id: "bm-f2-ayat-pasif-ingat-semak-pertama-pasif",
              label: "Pasif: Diri Pertama",
              summary: '"Surat itu saya tulis."',
            },
          ],
        },
      ],
    },
  ],
};
