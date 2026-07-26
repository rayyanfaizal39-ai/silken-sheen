import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataHubungMindMap: MindNode = {
  id: "bm-kata-hubung-root",
  label: "KATA HUBUNG",
  summary: "Perkataan yang menghubungkan kata, frasa atau klausa dalam sesuatu ayat.",
  children: [
    {
      id: "bm-kata-hubung-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-kata-hubung-definisi-maksud",
          label: "Maksud",
          summary:
            "Kata hubung ialah perkataan yang menghubungkan kata, frasa atau klausa untuk membentuk ayat yang lebih lengkap dan gramatis.",
        },
        {
          id: "bm-kata-hubung-definisi-tujuan",
          label: "Tujuan",
          summary:
            "Menghubungkan idea, membentuk ayat majmuk dan menjadikan penulisan lebih lancar.",
        },
      ],
    },
    {
      id: "bm-kata-hubung-fungsi",
      label: "Fungsi",
      children: [
        {
          id: "bm-kata-hubung-fungsi-kata",
          label: "Menghubungkan Kata",
          summary: "Ali dan Abu",
        },
        {
          id: "bm-kata-hubung-fungsi-frasa",
          label: "Menghubungkan Frasa",
          summary: "Cantik tetapi sederhana",
        },
        {
          id: "bm-kata-hubung-fungsi-klausa",
          label: "Menghubungkan Klausa",
          summary: '"Ali belajar kerana dia ingin berjaya."',
        },
        {
          id: "bm-kata-hubung-fungsi-ayat",
          label: "Menghubungkan Ayat",
          summary: "Membantu membentuk ayat majmuk yang lebih lengkap.",
        },
      ],
    },
    {
      id: "bm-kata-hubung-jenis",
      label: "Jenis Kata Hubung",
      children: [
        {
          id: "bm-kata-hubung-jenis-gabungan",
          label: "Gabungan",
          summary: "dan • serta",
          children: [
            {
              id: "bm-kata-hubung-jenis-gabungan-contoh",
              label: "Contoh Ayat",
              summary: '"Siti dan Amin bermain bola."',
            },
          ],
        },
        {
          id: "bm-kata-hubung-jenis-pilihan",
          label: "Pilihan",
          summary: "atau",
          children: [
            {
              id: "bm-kata-hubung-jenis-pilihan-contoh",
              label: "Contoh Ayat",
              summary: '"Ali memilih teh atau kopi."',
            },
          ],
        },
        {
          id: "bm-kata-hubung-jenis-sebab",
          label: "Sebab",
          summary: "kerana",
          children: [
            {
              id: "bm-kata-hubung-jenis-sebab-contoh",
              label: "Contoh Ayat",
              summary: '"Aina belajar bersungguh-sungguh kerana ingin berjaya."',
            },
          ],
        },
        {
          id: "bm-kata-hubung-jenis-tujuan",
          label: "Tujuan",
          summary: "agar • supaya",
          children: [
            {
              id: "bm-kata-hubung-jenis-tujuan-contoh",
              label: "Contoh Ayat",
              summary: '"Dia belajar supaya lulus peperiksaan."',
            },
          ],
        },
        {
          id: "bm-kata-hubung-jenis-pertentangan",
          label: "Pertentangan",
          summary: "tetapi • namun",
          children: [
            {
              id: "bm-kata-hubung-jenis-pertentangan-contoh",
              label: "Contoh Ayat",
              summary: '"Dia rajin tetapi masih rendah keyakinan."',
            },
          ],
        },
        {
          id: "bm-kata-hubung-jenis-perbandingan",
          label: "Perbandingan",
          summary: "manakala",
          children: [
            {
              id: "bm-kata-hubung-jenis-perbandingan-contoh",
              label: "Contoh Ayat",
              summary: '"Ali bermain bola manakala Abu membaca buku."',
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-hubung-ayat-majmuk",
      label: "Dalam Ayat Majmuk",
      children: [
        {
          id: "bm-kata-hubung-ayat-majmuk-peranan",
          label: "Peranan",
          summary:
            "Kata hubung membantu membentuk Ayat Majmuk, tetapi tidak semua ayat majmuk mesti mempunyai kata hubung yang dinyatakan.",
        },
        {
          id: "bm-kata-hubung-ayat-majmuk-formula",
          label: "Formula",
          summary: "Ayat Tunggal + Ayat Tunggal → Ayat Majmuk",
        },
        {
          id: "bm-kata-hubung-ayat-majmuk-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-ayat-pertama",
              label: "Ayat Tunggal 1",
              summary: "Ali belajar.",
            },
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-ayat-kedua",
              label: "Ayat Tunggal 2",
              summary: "Ali ingin berjaya.",
            },
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-hasil",
              label: "Ayat Majmuk",
              summary: "Ali belajar kerana ingin berjaya.",
            },
          ],
        },
        {
          id: "bm-kata-hubung-ayat-majmuk-contoh-dua",
          label: "Contoh 2",
          children: [
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-dua-ayat-pertama",
              label: "Ayat Tunggal 1",
              summary: "Siti membaca buku.",
            },
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-dua-ayat-kedua",
              label: "Ayat Tunggal 2",
              summary: "Aisyah menulis nota.",
            },
            {
              id: "bm-kata-hubung-ayat-majmuk-contoh-dua-hasil",
              label: "Ayat Majmuk",
              summary: "Siti membaca buku manakala Aisyah menulis nota.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-hubung-penanda-wacana",
      label: "Penanda Wacana",
      children: [
        {
          id: "bm-kata-hubung-penanda-wacana-pengenalan",
          label: "Pengenalan",
          summary:
            "Penanda wacana dan kata hubung mempunyai fungsi yang berbeza, tetapi kedua-duanya membantu menghasilkan penulisan yang lebih lancar.",
        },
        {
          id: "bm-kata-hubung-penanda-wacana-contoh",
          label: "Contoh",
          summary: "Selain itu • Seterusnya • Oleh itu",
        },
        {
          id: "bm-kata-hubung-penanda-wacana-nota",
          label: "Nota",
          summary: "Topik Penanda Wacana akan dipelajari secara berasingan.",
        },
      ],
    },
    {
      id: "bm-kata-hubung-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-kata-hubung-kesalahan-terlalu-banyak",
          label: "Menggunakan Terlalu Banyak Kata Hubung",
          summary:
            'Salah: "Ali belajar kerana tetapi dia penat." Betul: "Ali belajar tetapi dia penat."',
        },
        {
          id: "bm-kata-hubung-kesalahan-salah-pilih",
          label: "Salah Memilih Kata Hubung",
          summary: 'Salah: "Ali berjaya atau dia rajin." Betul: "Ali berjaya kerana dia rajin."',
        },
        {
          id: "bm-kata-hubung-kesalahan-tidak-gramatis",
          label: "Ayat Tidak Gramatis",
          summary:
            "Pastikan kedua-dua klausa dihubungkan secara logik dan menghasilkan ayat gramatis.",
        },
        {
          id: "bm-kata-hubung-kesalahan-bentuk",
          label: "Menukar Bentuk Perkataan",
          summary:
            'Jika soalan memberikan kata hubung "kerana", jangan gantikannya dengan kata hubung lain kecuali jika diarahkan.',
        },
      ],
    },
    {
      id: "bm-kata-hubung-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-kata-hubung-tip-uasa-hubungan",
          label: "Kenal Pasti Hubungan",
          summary:
            "Tentukan sama ada hubungannya sebab, pilihan, tujuan, pertentangan, tambahan atau perbandingan.",
        },
        {
          id: "bm-kata-hubung-tip-uasa-pilih",
          label: "Pilih Kata Hubung Yang Sesuai",
          summary: "Pilih mengikut hubungan makna; jangan gunakan kata hubung secara rawak.",
        },
        {
          id: "bm-kata-hubung-tip-uasa-kekalkan",
          label: "Kekalkan Perkataan",
          summary: "Gunakan kata hubung tepat yang diberikan dalam soalan morfologi.",
        },
        {
          id: "bm-kata-hubung-tip-uasa-gramatis",
          label: "Bina Ayat Gramatis",
          summary: "Pastikan kedua-dua klausa lengkap, bermakna dan dihubungkan dengan tepat.",
        },
      ],
    },
    {
      id: "bm-kata-hubung-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-kata-hubung-ingat-rumus",
          label: "Rumus",
          summary: "Kata Hubung → Menghubungkan kata, frasa atau klausa",
        },
        {
          id: "bm-kata-hubung-ingat-bantuan",
          label: "Bantuan Ingatan",
          children: [
            {
              id: "bm-kata-hubung-ingat-bantuan-tambahan",
              label: "dan = tambahan",
            },
            {
              id: "bm-kata-hubung-ingat-bantuan-pilihan",
              label: "atau = pilihan",
            },
            {
              id: "bm-kata-hubung-ingat-bantuan-sebab",
              label: "kerana = sebab",
            },
            {
              id: "bm-kata-hubung-ingat-bantuan-tujuan",
              label: "agar / supaya = tujuan",
            },
            {
              id: "bm-kata-hubung-ingat-bantuan-pertentangan",
              label: "tetapi = pertentangan",
            },
            {
              id: "bm-kata-hubung-ingat-bantuan-perbandingan",
              label: "manakala = perbandingan",
            },
          ],
        },
      ],
    },
  ],
};
