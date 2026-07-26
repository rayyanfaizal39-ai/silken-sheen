import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataGantiNamaMindMap: MindNode = {
  id: "bm-kata-ganti-nama-root",
  label: "KATA GANTI NAMA",
  summary: "Perkataan yang digunakan untuk menggantikan kata nama dalam ayat.",
  children: [
    {
      id: "bm-kata-ganti-nama-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-kata-ganti-nama-definisi-maksud",
          label: "Maksud",
          summary: "Kata ganti nama ialah perkataan yang digunakan untuk menggantikan kata nama.",
        },
        {
          id: "bm-kata-ganti-nama-definisi-tujuan",
          label: "Tujuan",
          summary:
            "Mengelakkan pengulangan nama, melancarkan ayat, dan merujuk kepada orang atau benda mengikut konteks.",
        },
        {
          id: "bm-kata-ganti-nama-definisi-fokus",
          label: "Fokus Asas",
          summary:
            "Dalam topik asas ini, fokus diberikan kepada Kata Ganti Nama Diri dan Kata Ganti Nama Tunjuk.",
        },
        {
          id: "bm-kata-ganti-nama-definisi-contoh",
          label: "Contoh Ringkas",
          children: [
            {
              id: "bm-kata-ganti-nama-definisi-contoh-tanpa",
              label: "Tanpa Kata Ganti Nama",
              summary: '"Amira pergi ke perpustakaan. Amira meminjam buku."',
            },
            {
              id: "bm-kata-ganti-nama-definisi-contoh-dengan",
              label: "Dengan Kata Ganti Nama",
              summary: '"Amira pergi ke perpustakaan. Dia meminjam buku."',
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-diri",
      label: "Kata Ganti Nama Diri",
      children: [
        {
          id: "bm-kata-ganti-nama-diri-maksud",
          label: "Maksud",
          summary: "Digunakan untuk menggantikan nama manusia.",
        },
        {
          id: "bm-kata-ganti-nama-diri-pertama",
          label: "Orang Pertama",
          summary: "Merujuk kepada orang yang bercakap: saya, aku, kami dan kita.",
          children: [
            {
              id: "bm-kata-ganti-nama-diri-pertama-saya",
              label: "saya",
              summary: "Digunakan dalam situasi umum atau sopan.",
            },
            {
              id: "bm-kata-ganti-nama-diri-pertama-aku",
              label: "aku",
              summary:
                "Digunakan dalam situasi tidak formal, hubungan rapat atau konteks sastera yang sesuai.",
            },
            {
              id: "bm-kata-ganti-nama-diri-pertama-kami",
              label: "kami",
              summary: "Merujuk kepada penutur dan kumpulannya, tetapi tidak termasuk pendengar.",
            },
            {
              id: "bm-kata-ganti-nama-diri-pertama-kita",
              label: "kita",
              summary:
                "Merujuk kepada penutur, pendengar dan pihak lain yang terlibat dalam konteks tersebut.",
            },
            {
              id: "bm-kata-ganti-nama-diri-pertama-perbandingan",
              label: "kami ≠ kita",
              children: [
                {
                  id: "bm-kata-ganti-nama-diri-pertama-perbandingan-kami",
                  label: "kami: pendengar tidak termasuk",
                },
                {
                  id: "bm-kata-ganti-nama-diri-pertama-perbandingan-kita",
                  label: "kita: pendengar termasuk",
                },
                {
                  id: "bm-kata-ganti-nama-diri-pertama-perbandingan-contoh",
                  label: "Contoh",
                  summary: '"Kami akan menyertai pertandingan berbalas pantun."',
                },
              ],
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-diri-kedua",
          label: "Orang Kedua",
          summary:
            "Merujuk kepada orang yang diajak bercakap: awak, kamu, kalian, anda dan engkau.",
          children: [
            {
              id: "bm-kata-ganti-nama-diri-kedua-kalian",
              label: "kalian",
              summary:
                'Merujuk kepada beberapa orang yang diajak bercakap. Contoh: "Bertuah negara kita mempunyai remaja seperti kalian."',
            },
            {
              id: "bm-kata-ganti-nama-diri-kedua-ragam",
              label: "Ragam Tidak Formal",
              summary:
                "Bentuk aku dan engkau bersifat tidak formal; kesesuaiannya bergantung pada hubungan dan konteks.",
              children: [
                {
                  id: "bm-kata-ganti-nama-diri-kedua-ragam-contoh",
                  label: "Contoh",
                  summary: '"Pada pendapat aku, engkau perlu merancang masa dengan baik."',
                },
              ],
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-diri-ketiga",
          label: "Orang Ketiga",
          summary: "Merujuk kepada orang yang diperkatakan: dia, beliau, mereka dan -nya.",
          children: [
            {
              id: "bm-kata-ganti-nama-diri-ketiga-dia",
              label: "dia",
              summary: "Merujuk kepada seorang yang diperkatakan mengikut konteks ayat.",
            },
            {
              id: "bm-kata-ganti-nama-diri-ketiga-beliau",
              label: "beliau",
              summary:
                'Digunakan dengan hormat untuk seseorang, bukan untuk haiwan atau benda. Contoh: "Beliau ialah guru besar sekolah itu."',
            },
            {
              id: "bm-kata-ganti-nama-diri-ketiga-mereka",
              label: "mereka",
              summary:
                'Merujuk kepada lebih daripada seorang. Contoh: "Mereka sedang berlatih di padang."',
            },
            {
              id: "bm-kata-ganti-nama-diri-ketiga-nya",
              label: "-nya",
              summary: "Boleh merujuk kepada orang ketiga mengikut fungsi dan konteks ayat.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-tunjuk",
      label: "Kata Ganti Nama Tunjuk",
      children: [
        {
          id: "bm-kata-ganti-nama-tunjuk-ini",
          label: "ini",
          summary: 'Menunjukkan sesuatu yang dekat. Contoh: "Hadiah ini daripada siapa?"',
        },
        {
          id: "bm-kata-ganti-nama-tunjuk-itu",
          label: "itu",
          summary:
            'Menunjukkan sesuatu yang lebih jauh atau telah disebut. Contoh: "Buku itu milik kakak."',
        },
        {
          id: "bm-kata-ganti-nama-tunjuk-tempat",
          label: "sini, situ dan sana",
          summary: "Merujuk kepada tempat berdasarkan jaraknya dalam konteks percakapan.",
          children: [
            {
              id: "bm-kata-ganti-nama-tunjuk-tempat-sini",
              label: "sini",
              summary: 'Tempat yang dekat dengan penutur. Contoh: "Duduklah di sini."',
            },
            {
              id: "bm-kata-ganti-nama-tunjuk-tempat-situ",
              label: "situ",
              summary:
                'Tempat yang agak jauh atau dekat dengan pendengar. Contoh: "Letakkan beg itu di situ."',
            },
            {
              id: "bm-kata-ganti-nama-tunjuk-tempat-sana",
              label: "sana",
              summary:
                'Tempat yang jauh daripada penutur dan pendengar. Contoh: "Mereka sedang menunggu di sana."',
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-konteks",
      label: "Pemilihan Mengikut Konteks",
      children: [
        {
          id: "bm-kata-ganti-nama-konteks-rasmi",
          label: "Situasi Rasmi",
          summary: "Pilih bentuk yang sesuai dan sopan seperti saya, anda atau beliau.",
        },
        {
          id: "bm-kata-ganti-nama-konteks-tidak-formal",
          label: "Situasi Tidak Formal",
          summary:
            "Bentuk seperti aku, kamu atau engkau boleh digunakan bergantung pada hubungan dan konteks.",
        },
        {
          id: "bm-kata-ganti-nama-konteks-bilangan",
          label: "Bilangan",
          children: [
            {
              id: "bm-kata-ganti-nama-konteks-bilangan-tunggal",
              label: "Tunggal",
              summary: "saya • dia • awak",
            },
            {
              id: "bm-kata-ganti-nama-konteks-bilangan-jamak",
              label: "Jamak",
              summary: "kami • kita • kalian • mereka",
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-konteks-kesantunan",
          label: "Kesantunan",
          summary:
            "Pertimbangkan umur, hubungan, taraf rasmi, rasa hormat dan bilangan orang; tiada satu bentuk yang sesuai untuk semua keadaan.",
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-standard",
      label: "Bahasa Melayu Standard",
      children: [
        {
          id: "bm-kata-ganti-nama-standard-skop",
          label: "Pengenalan Ringkas",
          summary: "Topik ini diperkenalkan secara ringkas sebagai persediaan awal.",
        },
        {
          id: "bm-kata-ganti-nama-standard-pengekalan",
          label: "Pengekalan Bentuk Tertentu",
          summary:
            "Dalam penukaran teks Melayu klasik kepada bahasa Melayu standard moden, bentuk rujukan kekeluargaan atau diraja seperti ayahanda, ibunda dan bonda mungkin perlu dikekalkan mengikut sumber dan kehendak soalan.",
        },
        {
          id: "bm-kata-ganti-nama-standard-arahan",
          label: "Baca Arahan",
          summary:
            "Jangan gantikan bentuk tersebut secara automatik; semak arahan peperiksaan dan makna petikan terlebih dahulu.",
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-kata-ganti-nama-kesalahan-kami-kita",
          label: "Salah Guna kami dan kita",
          summary:
            'Ayat "Kami akan pergi bersama awak" mungkin bercanggah dengan maksud yang dikehendaki kerana kami biasanya mengecualikan pendengar.',
          children: [
            {
              id: "bm-kata-ganti-nama-kesalahan-kami-kita-baik",
              label: "Jika pendengar disertakan",
              summary: '"Kita akan pergi bersama-sama."',
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-kesalahan-aku",
          label: "Penggunaan aku dalam Situasi Rasmi",
          summary:
            'Kurang sesuai: "Aku ingin memohon kebenaran daripada tuan." Lebih sesuai: "Saya ingin memohon kebenaran daripada tuan." Laras dan kesantunan turut menentukan pilihan.',
        },
        {
          id: "bm-kata-ganti-nama-kesalahan-beliau",
          label: "Salah Guna beliau",
          summary:
            'Salah: "Beliau ialah seekor kucing yang jinak." Lebih tepat: "Kucing itu sangat jinak" atau "Ia seekor kucing yang jinak." Panduan boleh berbeza mengikut gaya, tetapi beliau tidak digunakan untuk haiwan.',
        },
        {
          id: "bm-kata-ganti-nama-kesalahan-pengulangan",
          label: "Pengulangan Nama",
          summary:
            'Kurang lancar: "Farah membaca buku. Farah menulis nota. Farah mengulang kaji." Lebih baik: "Farah membaca buku. Dia menulis nota dan mengulang kaji."',
        },
        {
          id: "bm-kata-ganti-nama-kesalahan-rujukan",
          label: "Rujukan Tidak Jelas",
          summary:
            'Dalam ayat "Ali memberitahu Abu bahawa dia akan pergi", kata dia boleh merujuk kepada Ali atau Abu.',
          children: [
            {
              id: "bm-kata-ganti-nama-kesalahan-rujukan-baik",
              label: "Jelaskan Rujukan",
              summary:
                'Contoh: "Ali memberitahu Abu bahawa Ali akan pergi", atau susun semula ayat secara semula jadi supaya maksudnya tidak kabur.',
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-kata-ganti-nama-tip-uasa-rujukan",
          label: "Kenal Pasti Rujukan",
          summary: "Tentukan kata nama atau orang yang digantikan oleh kata ganti nama.",
        },
        {
          id: "bm-kata-ganti-nama-tip-uasa-konteks",
          label: "Semak Konteks",
          summary:
            "Semak siapa yang bercakap, mendengar dan diperkatakan, bilangan orang, serta sama ada situasi itu rasmi atau tidak formal.",
        },
        {
          id: "bm-kata-ganti-nama-tip-uasa-kami-kita",
          label: "Bezakan kami dan kita",
          summary: "kami = pendengar tidak termasuk; kita = pendengar termasuk",
        },
        {
          id: "bm-kata-ganti-nama-tip-uasa-bentuk",
          label: "Kekalkan Bentuk",
          summary:
            "Jika soalan meminta perkataan tertentu digunakan, jangan ubah bentuknya tanpa keperluan.",
        },
        {
          id: "bm-kata-ganti-nama-tip-uasa-ayat",
          label: "Bina Ayat Gramatis",
          summary:
            "Pastikan kata ganti nama mempunyai rujukan yang jelas dan sesuai dengan konteks ayat.",
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-kata-ganti-nama-ingat-rumus",
          label: "Rumus",
          summary: "Kata Ganti Nama = menggantikan kata nama",
        },
        {
          id: "bm-kata-ganti-nama-ingat-bantuan",
          label: "Bantuan Ingatan",
          children: [
            {
              id: "bm-kata-ganti-nama-ingat-bantuan-pertama",
              label: "Orang Pertama",
              summary: "yang bercakap",
            },
            {
              id: "bm-kata-ganti-nama-ingat-bantuan-kedua",
              label: "Orang Kedua",
              summary: "yang diajak bercakap",
            },
            {
              id: "bm-kata-ganti-nama-ingat-bantuan-ketiga",
              label: "Orang Ketiga",
              summary: "yang diperkatakan",
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-ingat-perbandingan",
          label: "Perbandingan Penting",
          children: [
            {
              id: "bm-kata-ganti-nama-ingat-perbandingan-kami",
              label: "kami",
              summary: "tidak termasuk pendengar",
            },
            {
              id: "bm-kata-ganti-nama-ingat-perbandingan-kita",
              label: "kita",
              summary: "termasuk pendengar",
            },
            {
              id: "bm-kata-ganti-nama-ingat-perbandingan-ini",
              label: "ini",
              summary: "dekat",
            },
            {
              id: "bm-kata-ganti-nama-ingat-perbandingan-itu",
              label: "itu",
              summary: "lebih jauh atau telah disebut",
            },
          ],
        },
      ],
    },
  ],
};
