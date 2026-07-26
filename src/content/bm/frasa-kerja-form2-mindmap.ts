import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuForm2FrasaKerjaMindMap: MindNode = {
  id: "bm-f2-frasa-kerja-root",
  label: "FRASA KERJA",
  summary:
    "Frasa kerja ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata kerja sebagai intinya.",
  children: [
    {
      id: "bm-f2-frasa-kerja-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-f2-frasa-kerja-definisi-maksud",
          label: "Maksud",
          summary:
            "Frasa kerja ialah binaan yang terdiri daripada satu perkataan atau beberapa perkataan dengan kata kerja sebagai intinya.",
        },
        {
          id: "bm-f2-frasa-kerja-definisi-inti",
          label: "Inti Frasa",
          summary: "Kata kerja ialah unsur utama dalam frasa kerja.",
        },
        {
          id: "bm-f2-frasa-kerja-definisi-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-frasa-kerja-definisi-contoh-ringkas",
              label: "Contoh Ringkas",
              summary: "duduk • sedang belajar • menulis surat • pergi ke hospital",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-definisi-peranan",
          label: "Peranan dalam Sintaksis",
          summary:
            "Frasa kerja ialah salah satu binaan utama yang digunakan untuk membentuk ayat tunggal bahasa Melayu.",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-fungsi",
      label: "Fungsi",
      children: [
        {
          id: "bm-f2-frasa-kerja-fungsi-predikat",
          label: "Sebagai Predikat",
          children: [
            {
              id: "bm-f2-frasa-kerja-fungsi-predikat-penerangan",
              label: "Penerangan",
              summary: "Frasa kerja lazimnya berfungsi sebagai predikat dalam ayat.",
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-predikat-ayat",
              label: "Contoh Ayat",
              summary: '"Aiman membaca buku."',
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-predikat-subjek",
              label: "Subjek / FN",
              summary: "Aiman",
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-predikat-fk",
              label: "Predikat / FK",
              summary: "membaca buku",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-fungsi-perbuatan",
          label: "Menerangkan Perbuatan",
          children: [
            {
              id: "bm-f2-frasa-kerja-fungsi-perbuatan-ayat",
              label: "Contoh Ayat",
              summary: '"Murid itu berlari di padang."',
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-perbuatan-fk",
              label: "Frasa Kerja",
              summary: "berlari di padang",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-fungsi-proses",
          label: "Menerangkan Keadaan atau Proses",
          children: [
            {
              id: "bm-f2-frasa-kerja-fungsi-proses-ayat",
              label: "Contoh Ayat",
              summary: '"Daun itu telah gugur."',
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-proses-fk",
              label: "Frasa Kerja",
              summary: "telah gugur",
            },
            {
              id: "bm-f2-frasa-kerja-fungsi-proses-nota",
              label: "Nota Ketepatan",
              summary:
                "Frasa ini mesti mempunyai kata kerja sebagai inti; bukan setiap perkataan yang menyatakan keadaan membentuk frasa kerja.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-struktur",
      label: "Struktur",
      children: [
        {
          id: "bm-f2-frasa-kerja-struktur-kata-kerja",
          label: "Kata Kerja Sahaja",
          children: [
            {
              id: "bm-f2-frasa-kerja-struktur-kata-kerja-contoh",
              label: "Contoh",
              summary: "duduk • tidur • tersenyum",
            },
            {
              id: "bm-f2-frasa-kerja-struktur-kata-kerja-ayat",
              label: "Contoh Ayat",
              summary: '"Adik tidur."',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-struktur-kata-bantu",
          label: "Kata Bantu + Kata Kerja",
          children: [
            {
              id: "bm-f2-frasa-kerja-struktur-kata-bantu-contoh",
              label: "Contoh",
              summary: "sedang belajar • sudah pulang • akan bertolak • pernah melawat",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-struktur-objek",
          label: "Kata Kerja + Objek",
          children: [
            {
              id: "bm-f2-frasa-kerja-struktur-objek-contoh",
              label: "Contoh",
              summary: "membaca buku • menendang bola • menulis karangan",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-struktur-pelengkap",
          label: "Kata Kerja + Pelengkap",
          children: [
            {
              id: "bm-f2-frasa-kerja-struktur-pelengkap-contoh",
              label: "Contoh",
              summary: "menjadi guru • tinggal di kampung • beransur pulih",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-struktur-nota",
          label: "Nota",
          summary:
            "Struktur tepat sesuatu frasa kerja bergantung pada jenis kata kerja dan konteks ayat.",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-inti",
      label: "Kata Kerja Inti",
      children: [
        {
          id: "bm-f2-frasa-kerja-inti-maksud",
          label: "Maksud",
          summary: "Kata kerja inti ialah kata kerja utama yang menjadi pusat frasa kerja.",
        },
        {
          id: "bm-f2-frasa-kerja-inti-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-frasa-kerja-inti-contoh-ayat",
              label: "Ayat",
              summary: '"Mereka sedang bermain bola di padang."',
            },
            {
              id: "bm-f2-frasa-kerja-inti-contoh-frasa",
              label: "Frasa Kerja Lengkap",
              summary: "sedang bermain bola di padang",
            },
            {
              id: "bm-f2-frasa-kerja-inti-contoh-kata",
              label: "Kata Kerja Inti",
              summary: "bermain",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-inti-cara",
          label: "Cara Mengenal Pasti",
          summary: "Tanya: Apakah perbuatan, keadaan atau proses utama yang diterangkan?",
        },
        {
          id: "bm-f2-frasa-kerja-inti-jangan-sebahagian",
          label: "Jangan Ambil Sebahagian Sahaja",
          children: [
            {
              id: "bm-f2-frasa-kerja-inti-jangan-sebahagian-frasa",
              label: "Frasa",
              summary: "sudah merancang untuk berjoging di taman rekreasi",
            },
            {
              id: "bm-f2-frasa-kerja-inti-jangan-sebahagian-salah",
              label: "Bukan Kata Kerja Inti",
              summary: "sudah",
            },
            {
              id: "bm-f2-frasa-kerja-inti-jangan-sebahagian-betul",
              label: "Kata Kerja Inti",
              summary: "merancang",
            },
            {
              id: "bm-f2-frasa-kerja-inti-jangan-sebahagian-nota",
              label: "Nota",
              summary:
                "Apabila soalan meminta predikat lengkap, ambil seluruh frasa kerja yang diperluas.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-kata-bantu",
      label: "Dengan Kata Bantu",
      children: [
        {
          id: "bm-f2-frasa-kerja-kata-bantu-maksud",
          label: "Maksud",
          summary:
            "Kata bantu hadir sebelum kata kerja untuk menerangkan aspek masa atau ragam perbuatan.",
        },
        {
          id: "bm-f2-frasa-kerja-kata-bantu-aspek",
          label: "Kata Bantu Aspek",
          children: [
            {
              id: "bm-f2-frasa-kerja-kata-bantu-aspek-kata",
              label: "Contoh Kata",
              summary: "sudah • telah • sedang • masih • akan • belum • pernah",
            },
            {
              id: "bm-f2-frasa-kerja-kata-bantu-aspek-frasa",
              label: "Contoh Frasa",
              summary: "sudah makan • sedang belajar • akan bertolak • pernah melawat",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-kata-bantu-ragam",
          label: "Kata Bantu Ragam",
          children: [
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ragam-contoh",
              label: "Contoh Frasa",
              summary: "mahu belajar • boleh berenang • mesti hadir • harus mematuhi",
            },
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ragam-nota",
              label: "Nota",
              summary:
                "Kata bantu menambah makna pada kata kerja tetapi bukan kata kerja inti frasa.",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-kata-bantu-ayat",
          label: "Contoh Ayat",
          children: [
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ayat-penuh",
              label: "Ayat",
              summary: '"Ameer dan Nazeem sudah merancang untuk berjoging di taman rekreasi."',
            },
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ayat-subjek",
              label: "Subjek / FN",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ayat-predikat",
              label: "Predikat / FK",
              summary: "sudah merancang untuk berjoging di taman rekreasi",
            },
            {
              id: "bm-f2-frasa-kerja-kata-bantu-ayat-inti",
              label: "Kata Kerja Inti",
              summary: "merancang",
            },
          ],
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-objek",
      label: "Dengan Objek",
      children: [
        {
          id: "bm-f2-frasa-kerja-objek-transitif",
          label: "Kata Kerja Transitif",
          children: [
            {
              id: "bm-f2-frasa-kerja-objek-transitif-maksud",
              label: "Maksud",
              summary: "Kata kerja transitif memerlukan objek untuk melengkapkan maksudnya.",
            },
            {
              id: "bm-f2-frasa-kerja-objek-transitif-contoh",
              label: "Contoh",
              summary: "membaca buku • menziarahi Ganesan • menendang bola • menguruskan program",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-objek-fn",
          label: "Objek",
          children: [
            {
              id: "bm-f2-frasa-kerja-objek-fn-maksud",
              label: "Maksud",
              summary: "Objek biasanya terdiri daripada frasa nama.",
            },
            {
              id: "bm-f2-frasa-kerja-objek-fn-ayat",
              label: "Contoh Ayat",
              summary: '"Siti membaca sebuah novel."',
            },
            {
              id: "bm-f2-frasa-kerja-objek-fn-kata-kerja",
              label: "Kata Kerja",
              summary: "membaca",
            },
            {
              id: "bm-f2-frasa-kerja-objek-fn-objek",
              label: "Objek / FN",
              summary: "sebuah novel",
            },
            {
              id: "bm-f2-frasa-kerja-objek-fn-penuh",
              label: "Frasa Kerja Lengkap",
              summary: "membaca sebuah novel",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-objek-sumber",
          label: "Contoh Sumber",
          children: [
            {
              id: "bm-f2-frasa-kerja-objek-sumber-ayat",
              label: "Ayat",
              summary: '"Ameer dan Nazeem menziarahi Ganesan di hospital."',
            },
            {
              id: "bm-f2-frasa-kerja-objek-sumber-fn",
              label: "FN",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-frasa-kerja-objek-sumber-fk",
              label: "FK",
              summary: "menziarahi Ganesan di hospital",
            },
            {
              id: "bm-f2-frasa-kerja-objek-sumber-kata",
              label: "Kata Kerja",
              summary: "menziarahi",
            },
            {
              id: "bm-f2-frasa-kerja-objek-sumber-objek",
              label: "Objek",
              summary: "Ganesan",
            },
            {
              id: "bm-f2-frasa-kerja-objek-sumber-keterangan",
              label: "Keterangan",
              summary: "di hospital",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-objek-nota",
          label: "Nota",
          summary:
            "Bukan setiap frasa yang hadir selepas kata kerja ialah objek; tentukan fungsinya berdasarkan jenis kata kerja dan konteks ayat.",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-pelengkap",
      label: "Dengan Pelengkap",
      children: [
        {
          id: "bm-f2-frasa-kerja-pelengkap-maksud",
          label: "Maksud",
          summary:
            "Sesetengah kata kerja tak transitif memerlukan pelengkap untuk menyempurnakan maksudnya.",
        },
        {
          id: "bm-f2-frasa-kerja-pelengkap-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-f2-frasa-kerja-pelengkap-contoh-frasa",
              label: "Contoh Frasa",
              summary: "menjadi doktor • beransur pulih • tinggal di kampung",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-pelengkap-beza",
          label: "Bezakan Objek dan Pelengkap",
          children: [
            {
              id: "bm-f2-frasa-kerja-pelengkap-beza-objek",
              label: "Objek",
              summary:
                "Objek biasanya mengikuti kata kerja transitif dan boleh menjadi subjek dalam ayat pasif.",
            },
            {
              id: "bm-f2-frasa-kerja-pelengkap-beza-objek-aktif",
              label: "Ayat Aktif",
              summary: '"Ali membaca buku."',
            },
            {
              id: "bm-f2-frasa-kerja-pelengkap-beza-objek-pasif",
              label: "Ayat Pasif",
              summary: '"Buku dibaca oleh Ali."',
            },
            {
              id: "bm-f2-frasa-kerja-pelengkap-beza-pelengkap",
              label: "Pelengkap",
              summary:
                "Pelengkap menyempurnakan maksud kata kerja tak transitif tertentu dan tidak berfungsi seperti objek biasa.",
            },
            {
              id: "bm-f2-frasa-kerja-pelengkap-beza-pelengkap-ayat",
              label: "Contoh Ayat",
              summary: '"Abangnya menjadi doktor."',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-pelengkap-ketepatan",
          label: "Nota Ketepatan",
          summary:
            'Jangan anggap setiap frasa sendi nama selepas kata kerja sebagai pelengkap. Unsur seperti "di kampung" perlu dianalisis berdasarkan kata kerja dan konteks ayat kerana ada yang berfungsi sebagai keterangan.',
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-pola",
      label: "Pola FN + FK",
      children: [
        {
          id: "bm-f2-frasa-kerja-pola-maksud",
          label: "Maksud",
          summary: "Ayat mempunyai frasa nama sebagai subjek dan frasa kerja sebagai predikat.",
        },
        {
          id: "bm-f2-frasa-kerja-pola-contoh-1",
          label: "Contoh 1",
          children: [
            {
              id: "bm-f2-frasa-kerja-pola-contoh-1-ayat",
              label: "Ayat",
              summary: '"Ameer dan Nazeem menziarahi Ganesan di hospital."',
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-1-fn",
              label: "FN",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-1-fk",
              label: "FK",
              summary: "menziarahi Ganesan di hospital",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-pola-contoh-2",
          label: "Contoh 2",
          children: [
            {
              id: "bm-f2-frasa-kerja-pola-contoh-2-ayat",
              label: "Ayat",
              summary: '"Ameer dan Nazeem sudah merancang untuk berjoging di taman rekreasi."',
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-2-fn",
              label: "FN",
              summary: "Ameer dan Nazeem",
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-2-fk",
              label: "FK",
              summary: "sudah merancang untuk berjoging di taman rekreasi",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-pola-contoh-3",
          label: "Contoh 3",
          children: [
            {
              id: "bm-f2-frasa-kerja-pola-contoh-3-ayat",
              label: "Ayat",
              summary: '"Adik sedang tidur."',
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-3-fn",
              label: "FN",
              summary: "Adik",
            },
            {
              id: "bm-f2-frasa-kerja-pola-contoh-3-fk",
              label: "FK",
              summary: "sedang tidur",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-pola-formula",
          label: "Formula",
          summary: "Frasa Nama + Frasa Kerja • Subjek + Predikat",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-bezakan",
      label: "Bezakan Jenis Frasa",
      children: [
        {
          id: "bm-f2-frasa-kerja-bezakan-fk",
          label: "Frasa Kerja",
          children: [
            {
              id: "bm-f2-frasa-kerja-bezakan-fk-ayat",
              label: "Ayat",
              summary: '"Mereka pergi ke hospital."',
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fk-predikat",
              label: "Predikat",
              summary: "pergi ke hospital",
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fk-sebab",
              label: "Sebab",
              summary: 'Intinya ialah kata kerja "pergi".',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-bezakan-fs",
          label: "Frasa Sendi Nama",
          children: [
            {
              id: "bm-f2-frasa-kerja-bezakan-fs-ayat",
              label: "Ayat",
              summary: '"Mereka ke hospital."',
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fs-predikat",
              label: "Predikat",
              summary: "ke hospital",
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fs-sebab",
              label: "Sebab",
              summary: 'Tiada kata kerja; frasa ini bermula dengan kata sendi nama "ke".',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-bezakan-fa",
          label: "Frasa Adjektif",
          children: [
            {
              id: "bm-f2-frasa-kerja-bezakan-fa-ayat",
              label: "Ayat",
              summary: '"Mereka sangat letih."',
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fa-predikat",
              label: "Predikat",
              summary: "sangat letih",
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fa-sebab",
              label: "Sebab",
              summary: 'Intinya ialah kata adjektif "letih".',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-bezakan-fn",
          label: "Frasa Nama",
          children: [
            {
              id: "bm-f2-frasa-kerja-bezakan-fn-ayat",
              label: "Ayat",
              summary: '"Mereka pelajar Tingkatan Dua."',
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fn-predikat",
              label: "Predikat",
              summary: "pelajar Tingkatan Dua",
            },
            {
              id: "bm-f2-frasa-kerja-bezakan-fn-sebab",
              label: "Sebab",
              summary: 'Intinya ialah kata nama "pelajar".',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-bezakan-rumus",
          label: "Rumus",
          summary: "Kenal pasti kata inti predikat, bukan maknanya sahaja.",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-f2-frasa-kerja-kesalahan-sebahagian",
          label: "Mengambil Kata Kerja Sahaja",
          children: [
            {
              id: "bm-f2-frasa-kerja-kesalahan-sebahagian-ayat",
              label: "Ayat",
              summary: '"Murid itu sedang membaca buku di perpustakaan."',
            },
            {
              id: "bm-f2-frasa-kerja-kesalahan-sebahagian-tidak-lengkap",
              label: "Tidak Lengkap",
              summary: "membaca",
            },
            {
              id: "bm-f2-frasa-kerja-kesalahan-sebahagian-betul",
              label: "Predikat / Frasa Kerja Lengkap",
              summary: "sedang membaca buku di perpustakaan",
            },
            {
              id: "bm-f2-frasa-kerja-kesalahan-sebahagian-nota",
              label: "Penjelasan",
              summary:
                "Apabila soalan meminta predikat lengkap, sertakan semua unsur yang menjadi sebahagian daripadanya.",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-kesalahan-kata-bantu",
          label: "Menganggap Kata Bantu sebagai Inti",
          summary: "Salah: sedang • Betul, kata kerja inti: membaca",
        },
        {
          id: "bm-f2-frasa-kerja-kesalahan-fs",
          label: "Keliru dengan Frasa Sendi Nama",
          summary:
            '"Mereka ke sekolah." mempunyai predikat "ke sekolah", iaitu frasa sendi nama kerana tiada kata kerja.',
        },
        {
          id: "bm-f2-frasa-kerja-kesalahan-fa",
          label: "Keliru dengan Frasa Adjektif",
          summary: '"Adik sangat penat." mempunyai predikat frasa adjektif, bukan frasa kerja.',
        },
        {
          id: "bm-f2-frasa-kerja-kesalahan-objek",
          label: "Salah Mengenal Objek",
          summary:
            'Dalam "Dia tidur di bilik.", unsur "di bilik" bukan objek; unsur itu menerangkan tempat dalam predikat.',
        },
        {
          id: "bm-f2-frasa-kerja-kesalahan-ayat",
          label: "Membina Ayat Tidak Lengkap",
          summary:
            'Elakkan fragmen "Sedang membaca buku." Gunakan subjek yang jelas: "Farah sedang membaca buku."',
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-f2-frasa-kerja-tip-uasa-subjek",
          label: "Cari Subjek",
          summary:
            "Kenal pasti frasa nama yang lengkap pada awal ayat atau pada kedudukan subjek yang berkaitan.",
        },
        {
          id: "bm-f2-frasa-kerja-tip-uasa-inti",
          label: "Cari Kata Kerja Inti",
          summary: "Cari perbuatan, proses atau keadaan berasaskan kata kerja yang utama.",
        },
        {
          id: "bm-f2-frasa-kerja-tip-uasa-predikat",
          label: "Ambil Keseluruhan Predikat",
          children: [
            {
              id: "bm-f2-frasa-kerja-tip-uasa-predikat-unsur",
              label: "Unsur yang Mungkin Disertakan",
              summary: "kata bantu • kata kerja • objek • pelengkap • keterangan",
            },
            {
              id: "bm-f2-frasa-kerja-tip-uasa-predikat-nota",
              label: "Nota",
              summary: "Sertakan unsur tersebut apabila semuanya tergolong dalam predikat.",
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-tip-uasa-pola",
          label: "Tentukan Pola",
          summary: "Jika inti predikat ialah kata kerja, pola ayatnya ialah FN + FK.",
        },
        {
          id: "bm-f2-frasa-kerja-tip-uasa-bezakan",
          label: "Bezakan Frasa",
          children: [
            {
              id: "bm-f2-frasa-kerja-tip-uasa-bezakan-fs",
              label: "FN + FS",
              summary: '"Mereka ke hospital."',
            },
            {
              id: "bm-f2-frasa-kerja-tip-uasa-bezakan-fk",
              label: "FN + FK",
              summary: '"Mereka pergi ke hospital."',
            },
          ],
        },
        {
          id: "bm-f2-frasa-kerja-tip-uasa-gramatis",
          label: "Bina Ayat Gramatis",
          summary: "Pastikan ayat mempunyai subjek dan predikat yang lengkap.",
        },
      ],
    },
    {
      id: "bm-f2-frasa-kerja-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-f2-frasa-kerja-ingat-rumus",
          label: "Rumus",
          summary: "Frasa Kerja = Kata Kerja Inti + Unsur Tambahan",
        },
        {
          id: "bm-f2-frasa-kerja-ingat-unsur",
          label: "Unsur Tambahan",
          summary: "kata bantu • objek • pelengkap • keterangan",
        },
        {
          id: "bm-f2-frasa-kerja-ingat-formula",
          label: "Formula Ayat",
          summary: "Frasa Nama + Frasa Kerja • Subjek + Predikat",
        },
        {
          id: "bm-f2-frasa-kerja-ingat-contoh",
          label: "Contoh Cepat",
          summary:
            "duduk • sedang belajar • membaca buku • pergi ke hospital • sudah merancang untuk berjoging",
        },
        {
          id: "bm-f2-frasa-kerja-ingat-soalan",
          label: "Soalan Ingatan",
          summary: "Apakah kata kerja utama dalam predikat?",
        },
      ],
    },
  ],
};
