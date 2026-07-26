import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataSendiNamaMindMap: MindNode = {
  id: "bm-kata-sendi-nama-root",
  label: "KATA SENDI NAMA",
  summary:
    "Perkataan yang hadir di hadapan kata nama atau frasa nama untuk membentuk Frasa Sendi Nama.",
  children: [
    {
      id: "bm-kata-sendi-nama-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-kata-sendi-nama-definisi-maksud",
          label: "Maksud",
          summary:
            "Kata sendi nama ialah perkataan yang hadir di hadapan kata nama atau frasa nama.",
        },
        {
          id: "bm-kata-sendi-nama-definisi-fungsi",
          label: "Fungsi",
          summary:
            "Menunjukkan tempat, arah, masa, sasaran, sumber, perbandingan atau hubungan antara unsur dalam ayat.",
        },
        {
          id: "bm-kata-sendi-nama-definisi-hasil",
          label: "Hasil Binaan",
          summary: "Kata Sendi Nama + Frasa Nama → Frasa Sendi Nama",
          children: [
            {
              id: "bm-kata-sendi-nama-definisi-hasil-contoh",
              label: "Contoh: di sekolah",
              children: [
                {
                  id: "bm-kata-sendi-nama-definisi-hasil-kata-sendi",
                  label: "Kata sendi nama: di",
                },
                {
                  id: "bm-kata-sendi-nama-definisi-hasil-frasa-nama",
                  label: "Frasa nama: sekolah",
                },
                {
                  id: "bm-kata-sendi-nama-definisi-hasil-frasa-sendi",
                  label: "Frasa sendi nama: di sekolah",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-golongan",
      label: "Golongan Kata",
      children: [
        {
          id: "bm-kata-sendi-nama-golongan-kategori",
          label: "Kategori",
          summary: "Kata sendi nama tergolong dalam Kata Tugas.",
        },
        {
          id: "bm-kata-sendi-nama-golongan-ciri",
          label: "Ciri",
          summary: "Dalam struktur ayat baku, kata sendi nama tidak digunakan secara bersendirian.",
        },
        {
          id: "bm-kata-sendi-nama-golongan-pasangan",
          label: "Pasangan",
          summary:
            "Kata sendi nama diikuti oleh kata nama atau frasa nama untuk membentuk makna yang lengkap.",
          children: [
            {
              id: "bm-kata-sendi-nama-golongan-pasangan-contoh",
              label: "di + dalam kotak → di dalam kotak",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-di",
      label: "di",
      children: [
        {
          id: "bm-kata-sendi-nama-di-kegunaan",
          label: "Kegunaan",
          summary: "Digunakan untuk menunjukkan tempat atau lokasi.",
        },
        {
          id: "bm-kata-sendi-nama-di-contoh",
          label: "Contoh",
          summary: "di sekolah • di rumah • di dalam kotak • di Kuala Lumpur",
        },
        {
          id: "bm-kata-sendi-nama-di-ayat",
          label: "Contoh Ayat",
          summary: '"Dia menyusun buku-buku novelnya di dalam kotak."',
        },
        {
          id: "bm-kata-sendi-nama-di-ejaan",
          label: "Nota Ejaan",
          summary:
            "Kata sendi nama di ditulis terpisah daripada kata nama atau frasa nama yang mengikutinya.",
          children: [
            {
              id: "bm-kata-sendi-nama-di-ejaan-betul",
              label: "Betul",
              summary: "di rumah • di sekolah • di dalam kotak",
            },
            {
              id: "bm-kata-sendi-nama-di-ejaan-salah",
              label: "Salah",
              summary: "dirumah • disekolah • didalam kotak",
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-di-bezakan",
          label: "Bezakan dengan Imbuhan di-",
          summary: "Semak fungsi perkataan dalam konteks sebelum menentukan ejaannya.",
          children: [
            {
              id: "bm-kata-sendi-nama-di-bezakan-sendi",
              label: "Kata Sendi Nama",
              summary: "di sekolah • di rumah — menunjukkan tempat dan ditulis terpisah",
            },
            {
              id: "bm-kata-sendi-nama-di-bezakan-imbuhan",
              label: "Imbuhan Pasif di-",
              summary: "dibaca • ditulis • disusun — membentuk kata kerja pasif dan ditulis rapat",
            },
            {
              id: "bm-kata-sendi-nama-di-bezakan-panduan",
              label: "Panduan",
              summary:
                "di + tempat biasanya ditulis terpisah; di- + kata kerja pasif ditulis bersama.",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-dari-daripada",
      label: "dari / daripada",
      children: [
        {
          id: "bm-kata-sendi-nama-dari",
          label: "dari",
          summary: "Gunakan rumus ATM: Arah, Tempat, Masa.",
          children: [
            {
              id: "bm-kata-sendi-nama-dari-arah",
              label: "Arah",
              summary: '"Angin bertiup dari utara."',
            },
            {
              id: "bm-kata-sendi-nama-dari-tempat",
              label: "Tempat",
              summary: '"Mereka datang dari Johor."',
            },
            {
              id: "bm-kata-sendi-nama-dari-masa",
              label: "Masa",
              summary: '"Program itu berlangsung dari pagi hingga petang."',
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-daripada",
          label: "daripada",
          summary:
            "Digunakan untuk hubungan yang melibatkan manusia, haiwan, benda, sumber atau asal, perbandingan, dan sebahagian daripada keseluruhan.",
          children: [
            {
              id: "bm-kata-sendi-nama-daripada-manusia",
              label: "Manusia",
              summary: '"Hadiah ini daripada siapa?"',
            },
            {
              id: "bm-kata-sendi-nama-daripada-sumber",
              label: "Sumber",
              summary: '"Meja itu diperbuat daripada kayu."',
            },
            {
              id: "bm-kata-sendi-nama-daripada-perbandingan",
              label: "Perbandingan",
              summary: '"Ali lebih tinggi daripada Abu."',
            },
            {
              id: "bm-kata-sendi-nama-daripada-sebahagian",
              label: "Sebahagian",
              summary: '"Dua daripada lima murid dipilih."',
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-dari-daripada-perbandingan",
          label: "Perbandingan Ringkas",
          children: [
            {
              id: "bm-kata-sendi-nama-dari-daripada-perbandingan-dari",
              label: "dari = arah, tempat, masa",
            },
            {
              id: "bm-kata-sendi-nama-dari-daripada-perbandingan-daripada",
              label: "daripada = manusia, haiwan, benda, sumber, perbandingan atau sebahagian",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-ke-kepada",
      label: "ke / kepada",
      children: [
        {
          id: "bm-kata-sendi-nama-ke",
          label: "ke",
          summary:
            "Digunakan terutamanya untuk arah, tempat atau destinasi, serta lingkungan masa tertentu apabila sesuai.",
          children: [
            {
              id: "bm-kata-sendi-nama-ke-contoh",
              label: "Contoh",
              summary: "ke sekolah • ke hospital • ke utara",
            },
            {
              id: "bm-kata-sendi-nama-ke-ayat",
              label: "Contoh Ayat",
              summary: '"Mereka ke hospital."',
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-kepada",
          label: "kepada",
          summary:
            "Menunjukkan penerima, sasaran yang melibatkan orang atau pihak, rujukan, hubungan, atau sasaran abstrak tertentu mengikut penggunaan baku.",
          children: [
            {
              id: "bm-kata-sendi-nama-kepada-contoh",
              label: "Contoh",
              summary: "kepada guru • kepada ibu • kepada pihak sekolah",
            },
            {
              id: "bm-kata-sendi-nama-kepada-ayat",
              label: "Contoh Ayat",
              summary: '"Surat itu diserahkan kepada pengetua."',
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-ke-kepada-perbandingan",
          label: "Perbandingan Ringkas",
          children: [
            {
              id: "bm-kata-sendi-nama-ke-kepada-perbandingan-ke",
              label: "ke = arah, tempat atau destinasi",
            },
            {
              id: "bm-kata-sendi-nama-ke-kepada-perbandingan-kepada",
              label: "kepada = penerima, sasaran, rujukan atau pihak yang dituju",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-hingga",
      label: "hingga",
      children: [
        {
          id: "bm-kata-sendi-nama-hingga-fungsi",
          label: "Fungsi",
          summary: "Menunjukkan had masa, tempat, jarak atau tahap.",
        },
        {
          id: "bm-kata-sendi-nama-hingga-contoh",
          label: "Contoh",
          summary:
            "dari pagi hingga petang • berjalan hingga ke hujung jalan • belajar hingga larut malam",
        },
        {
          id: "bm-kata-sendi-nama-hingga-ayat",
          label: "Contoh Ayat",
          summary: '"Program itu berlangsung dari pagi hingga petang."',
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-frasa",
      label: "Frasa Sendi Nama",
      children: [
        {
          id: "bm-kata-sendi-nama-frasa-maksud",
          label: "Maksud",
          summary:
            "Frasa Sendi Nama terbina daripada kata sendi nama yang diikuti oleh frasa nama.",
        },
        {
          id: "bm-kata-sendi-nama-frasa-formula",
          label: "Formula",
          summary: "Kata Sendi Nama + Frasa Nama → Frasa Sendi Nama",
        },
        {
          id: "bm-kata-sendi-nama-frasa-pola",
          label: "Pola Ayat",
          summary:
            "Frasa Nama + Frasa Sendi Nama (FN + FS). Dalam pola ayat dasar ini, Frasa Sendi Nama boleh berfungsi sebagai predikat.",
        },
        {
          id: "bm-kata-sendi-nama-frasa-contoh",
          label: "Contoh",
          children: [
            {
              id: "bm-kata-sendi-nama-frasa-contoh-hospital",
              label: '"Mereka ke hospital."',
              children: [
                {
                  id: "bm-kata-sendi-nama-frasa-contoh-hospital-fn",
                  label: "Frasa Nama / Subjek: Mereka",
                },
                {
                  id: "bm-kata-sendi-nama-frasa-contoh-hospital-fs",
                  label: "Frasa Sendi Nama / Predikat: ke hospital",
                },
              ],
            },
            {
              id: "bm-kata-sendi-nama-frasa-contoh-meja",
              label: '"Buku itu di atas meja."',
              children: [
                {
                  id: "bm-kata-sendi-nama-frasa-contoh-meja-fn",
                  label: "Frasa Nama: Buku itu",
                },
                {
                  id: "bm-kata-sendi-nama-frasa-contoh-meja-fs",
                  label: "Frasa Sendi Nama: di atas meja",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-kata-sendi-nama-kesalahan-di-rapat",
          label: "di Ditulis Rapat",
          summary:
            "Salah: dikotak, dirumah. Betul: di kotak, di rumah. Kata sendi nama di yang menunjukkan tempat ditulis terpisah.",
        },
        {
          id: "bm-kata-sendi-nama-kesalahan-dari",
          label: "Salah Pilih dari / daripada",
          summary:
            'Salah: "Hadiah ini dari ibu." Betul: "Hadiah ini daripada ibu." Gunakan daripada untuk sumber yang melibatkan manusia.',
        },
        {
          id: "bm-kata-sendi-nama-kesalahan-ke",
          label: "Salah Pilih ke / kepada",
          summary:
            'Salah: "Surat itu diberikan ke guru." Betul: "Surat itu diberikan kepada guru." Gunakan kepada untuk penerima.',
        },
        {
          id: "bm-kata-sendi-nama-kesalahan-di-imbuhan",
          label: "Mengelirukan di dengan di-",
          summary: "di sekolah → kata sendi nama; dibaca → imbuhan pasif",
        },
        {
          id: "bm-kata-sendi-nama-kesalahan-bentuk",
          label: "Menukar Bentuk Perkataan",
          summary:
            'Jika soalan memberikan kata sendi nama seperti "daripada", gunakan bentuk itu tanpa menambah imbuhan yang tidak diperlukan.',
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-kata-sendi-nama-tip-uasa-kenal-pasti",
          label: "Kenal Pasti",
          summary: "Cari kata yang hadir di hadapan kata nama atau frasa nama.",
        },
        {
          id: "bm-kata-sendi-nama-tip-uasa-atm",
          label: "Gunakan ATM",
          summary: "Ingat: dari = Arah, Tempat, Masa.",
        },
        {
          id: "bm-kata-sendi-nama-tip-uasa-ejaan",
          label: "Semak Ejaan",
          summary: "Semak sama ada di dan ke yang menunjukkan tempat atau arah ditulis terpisah.",
        },
        {
          id: "bm-kata-sendi-nama-tip-uasa-hubungan",
          label: "Fahami Hubungan",
          summary:
            "Tentukan sama ada ayat menunjukkan tempat, arah, masa, penerima, sumber atau perbandingan.",
        },
        {
          id: "bm-kata-sendi-nama-tip-uasa-ayat",
          label: "Bina Ayat Gramatis",
          summary:
            "Gunakan perkataan tepat seperti yang diarahkan dan bina ayat lengkap yang menunjukkan maksudnya.",
        },
        {
          id: "bm-kata-sendi-nama-tip-uasa-bentuk",
          label: "Jangan Ubah Bentuk",
          summary:
            "Jangan tambah imbuhan yang tidak diperlukan apabila soalan meminta perkataan yang diberi digunakan sebagaimana asalnya.",
        },
      ],
    },
    {
      id: "bm-kata-sendi-nama-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-kata-sendi-nama-ingat-rumus",
          label: "Rumus",
          summary: "Kata Sendi Nama + Frasa Nama = Frasa Sendi Nama",
        },
        {
          id: "bm-kata-sendi-nama-ingat-bantuan",
          label: "Bantuan Ingatan",
          summary: "dari = ATM",
          children: [
            {
              id: "bm-kata-sendi-nama-ingat-bantuan-arah",
              label: "Arah",
            },
            {
              id: "bm-kata-sendi-nama-ingat-bantuan-tempat",
              label: "Tempat",
            },
            {
              id: "bm-kata-sendi-nama-ingat-bantuan-masa",
              label: "Masa",
            },
          ],
        },
        {
          id: "bm-kata-sendi-nama-ingat-ejaan",
          label: "Ejaan Penting",
          summary: "di sekolah • ke hospital • daripada ibu • kepada guru",
        },
        {
          id: "bm-kata-sendi-nama-ingat-topik",
          label: "Topik Berkaitan",
          summary: "Kata Tugas • Frasa Sendi Nama • Imbuhan • Ejaan",
        },
      ],
    },
  ],
};
