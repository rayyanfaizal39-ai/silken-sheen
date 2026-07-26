import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuPenjodohBilanganMindMap: MindNode = {
  id: "bm-penjodoh-bilangan-root",
  label: "PENJODOH BILANGAN",
  summary: "Perkataan yang digunakan bersama kata bilangan untuk membilang kata nama konkrit.",
  children: [
    {
      id: "bm-penjodoh-bilangan-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-penjodoh-bilangan-definisi-maksud",
          label: "Maksud",
          summary:
            "Penjodoh bilangan ialah perkataan yang digunakan bersama kata bilangan untuk membilang manusia, haiwan atau benda.",
        },
        {
          id: "bm-penjodoh-bilangan-definisi-fungsi",
          label: "Fungsi",
          summary: "Menerangkan bentuk, saiz, keadaan, jenis, susunan atau kumpulan kata nama.",
        },
        {
          id: "bm-penjodoh-bilangan-definisi-struktur",
          label: "Struktur",
          summary: "Kata Bilangan + Penjodoh Bilangan + Kata Nama",
          children: [
            {
              id: "bm-penjodoh-bilangan-definisi-struktur-contoh",
              label: "Contoh: sebuah rumah",
              children: [
                {
                  id: "bm-penjodoh-bilangan-definisi-struktur-kata-bilangan",
                  label: "Kata bilangan: se-",
                },
                {
                  id: "bm-penjodoh-bilangan-definisi-struktur-penjodoh",
                  label: "Penjodoh bilangan: buah",
                },
                {
                  id: "bm-penjodoh-bilangan-definisi-struktur-kata-nama",
                  label: "Kata nama: rumah",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-cara",
      label: "Cara Penggunaan",
      children: [
        {
          id: "bm-penjodoh-bilangan-cara-kata-bilangan",
          label: "Dengan Kata Bilangan",
          summary: "seorang murid • dua ekor kucing • tiga buah buku • beberapa helai kertas",
        },
        {
          id: "bm-penjodoh-bilangan-cara-kata-nama",
          label: "Mengikut Kata Nama",
          summary:
            "Pilih penjodoh bilangan yang sesuai dengan bentuk, jenis, keadaan atau kumpulan kata nama.",
        },
        {
          id: "bm-penjodoh-bilangan-cara-konkrit",
          label: "Kata Nama Konkrit",
          summary:
            "Penjodoh bilangan biasanya digunakan dengan kata nama konkrit yang dapat dibilang; penggunaannya tetap bergantung pada struktur ayat dan konteks.",
          children: [
            {
              id: "bm-penjodoh-bilangan-cara-konkrit-contoh",
              label: "Contoh",
              summary: "orang • haiwan • benda • tempat tertentu",
            },
          ],
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-manusia",
      label: "Manusia",
      children: [
        {
          id: "bm-penjodoh-bilangan-manusia-orang",
          label: "orang",
          summary: "Digunakan untuk manusia.",
          children: [
            {
              id: "bm-penjodoh-bilangan-manusia-orang-contoh",
              label: "Contoh",
              summary: "seorang guru • dua orang murid • lima orang peserta",
            },
            {
              id: "bm-penjodoh-bilangan-manusia-orang-ayat",
              label: "Contoh Ayat",
              summary: '"Dua orang murid sedang membaca di perpustakaan."',
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-manusia-nota",
          label: "Nota Konteks",
          summary:
            "Jangan gunakan ekor, buah atau penjodoh bilangan benda yang lain untuk membilang manusia.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-haiwan",
      label: "Haiwan",
      children: [
        {
          id: "bm-penjodoh-bilangan-haiwan-ekor",
          label: "ekor",
          summary: "Digunakan untuk haiwan.",
          children: [
            {
              id: "bm-penjodoh-bilangan-haiwan-ekor-contoh",
              label: "Contoh",
              summary: "seekor kucing • dua ekor ayam • tiga ekor ikan",
            },
            {
              id: "bm-penjodoh-bilangan-haiwan-ekor-ayat",
              label: "Contoh Ayat",
              summary: '"Pemandu itu membrek untuk mengelakkan seekor kucing."',
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-haiwan-peraturan",
          label: "Peraturan Lazim",
          summary:
            "ekor ialah penjodoh bilangan yang paling lazim untuk haiwan, tetapi konteks sastera atau khusus boleh menggunakan bentuk lain.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-pasangan",
      label: "Benda Berpasangan",
      children: [
        {
          id: "bm-penjodoh-bilangan-pasangan-pasang",
          label: "pasang",
          summary: "Digunakan untuk benda yang membentuk satu pasangan.",
          children: [
            {
              id: "bm-penjodoh-bilangan-pasangan-pasang-contoh",
              label: "Contoh",
              summary: "sepasang kasut • sepasang sarung tangan • sepasang anting-anting",
            },
            {
              id: "bm-penjodoh-bilangan-pasangan-pasang-ayat",
              label: "Contoh Ayat",
              summary: '"Ibu membelikan adik sepasang kasut bola baharu."',
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-pasangan-beza",
          label: "Bezakan dengan dua",
          summary:
            "sepasang kasut bermaksud dua kasut yang sepadan dan membentuk satu pasangan; dua kasut hanya membilang dua kasut dan tidak semestinya sepadan.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-bentuk",
      label: "Benda Mengikut Bentuk",
      children: [
        {
          id: "bm-penjodoh-bilangan-bentuk-helai",
          label: "helai",
          summary: "Benda nipis atau leper: sehelai kertas • sehelai baju • sehelai daun",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-batang",
          label: "batang",
          summary:
            "Benda panjang, keras atau berbentuk silinder: sebatang pensel • sebatang pokok • sebatang jalan",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-bilah",
          label: "bilah",
          summary: "Benda tajam atau berbilah: sebilah pisau • sebilah pedang • sebilah parang",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-utas",
          label: "utas",
          summary: "Benda panjang dan halus: seutas tali • seutas rantai • seutas benang",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-keping",
          label: "keping",
          summary: "Kepingan atau hirisan leper: sekeping gambar • sekeping roti • sekeping papan",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-butir",
          label: "butir",
          summary:
            "Benda kecil dan bulat atau zarah tunggal: sebutir telur • sebutir mutiara • sebutir batu",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-biji",
          label: "biji",
          summary:
            "Benda kecil yang bulat, buah atau benda umum dalam penggunaan lazim: sebiji epal • sebiji bola • sebiji telur",
        },
        {
          id: "bm-penjodoh-bilangan-bentuk-perbandingan",
          label: "Nota Perbandingan",
          summary:
            "Sesetengah kata nama boleh menerima lebih daripada satu penjodoh bilangan dalam penggunaan sebenar. Gunakan bentuk baku yang sesuai dengan latihan dan konteks.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-kumpulan",
      label: "Kumpulan",
      children: [
        {
          id: "bm-penjodoh-bilangan-kumpulan-kumpulan",
          label: "kumpulan",
          summary:
            "Digunakan untuk manusia atau haiwan yang berkumpul: sekumpulan murid • sekumpulan remaja • sekumpulan burung",
          children: [
            {
              id: "bm-penjodoh-bilangan-kumpulan-kumpulan-ayat",
              label: "Contoh Ayat",
              summary: '"Sekumpulan pelajar sedang menjalankan aktiviti gotong-royong."',
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-kumpulan-kawanan",
          label: "kawanan",
          summary:
            "Digunakan khususnya untuk kumpulan haiwan: sekawanan lembu • sekawanan burung • sekawanan kambing",
        },
        {
          id: "bm-penjodoh-bilangan-kumpulan-gerombolan",
          label: "gerombolan",
          summary:
            "Contoh lanjutan: segerombolan penjahat. Perkataan ini sering membawa maksud kumpulan yang besar, negatif atau kuat mengikut konteks.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-umum-tempat",
      label: "Benda Umum dan Tempat",
      children: [
        {
          id: "bm-penjodoh-bilangan-umum-tempat-buah",
          label: "buah",
          summary:
            "Digunakan untuk banyak benda umum, bangunan, kenderaan, tempat atau benda besar yang tiada penjodoh bilangan yang lebih khusus.",
          children: [
            {
              id: "bm-penjodoh-bilangan-umum-tempat-buah-contoh",
              label: "Contoh",
              summary:
                "sebuah rumah • sebuah sekolah • sebuah negara • sebuah kereta • sebuah buku",
            },
            {
              id: "bm-penjodoh-bilangan-umum-tempat-buah-nota",
              label: "Nota",
              summary:
                "buah ialah penjodoh bilangan yang luas dan lazim, tetapi gunakan penjodoh bilangan yang lebih khusus apabila penggunaan baku memerlukannya.",
            },
            {
              id: "bm-penjodoh-bilangan-umum-tempat-buah-ayat",
              label: "Contoh Ayat",
              summary: '"Malaysia ialah sebuah negara yang merdeka."',
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-umum-tempat-karangan",
          label: "Bentuk Penggunaan dalam Karangan",
          summary:
            '"Dia menulis sebuah karangan tentang perpaduan." Dalam ayat ini, sebuah membilang karangan yang siap sebagai satu hasil tulisan.',
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-penjodoh-bilangan-kesalahan-salah",
          label: "Salah Penjodoh Bilangan",
          summary: "Salah: seekor murid, seorang kucing. Betul: seorang murid, seekor kucing.",
        },
        {
          id: "bm-penjodoh-bilangan-kesalahan-bentuk",
          label: "Tidak Sesuai dengan Bentuk",
          summary: "Salah: sehelai pensel. Betul: sebatang pensel.",
        },
        {
          id: "bm-penjodoh-bilangan-kesalahan-abstrak",
          label: "Penggunaan pada Kata Abstrak",
          summary:
            "Elakkan bentuk tidak wajar seperti sebuah kebahagiaan atau seekor keberanian. Kata nama abstrak umumnya tidak menggunakan penjodoh bilangan biasa seperti kata nama konkrit.",
        },
        {
          id: "bm-penjodoh-bilangan-kesalahan-ganda",
          label: "Menggandakan Bilangan",
          summary:
            "Elakkan: dua orang murid-murid. Gunakan: dua orang murid. Kata bilangan dan penjodoh bilangan biasanya sudah menunjukkan jamak; penggandaan boleh hadir untuk tujuan makna lain dalam konteks berbeza.",
        },
        {
          id: "bm-penjodoh-bilangan-kesalahan-hafal",
          label: "Menghafal Tanpa Memahami",
          summary:
            "Jangan pilih penjodoh bilangan hanya kerana bentuknya biasa didengar. Semak bentuk, jenis dan konteks kata nama.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-penjodoh-bilangan-tip-uasa-kata-nama",
          label: "Kenal Pasti Kata Nama",
          summary:
            "Tentukan sama ada kata nama merujuk kepada manusia, haiwan, benda berpasangan, benda leper, benda panjang, benda tajam, kumpulan atau benda umum.",
        },
        {
          id: "bm-penjodoh-bilangan-tip-uasa-bentuk",
          label: "Lihat Bentuk dan Sifat",
          summary: "Tanya: Apakah bentuk atau ciri benda itu?",
        },
        {
          id: "bm-penjodoh-bilangan-tip-uasa-padanan",
          label: "Semak Padanan",
          summary:
            "manusia → orang • haiwan → ekor • berpasangan → pasang • nipis dan leper → helai • panjang dan keras → batang • tajam → bilah",
        },
        {
          id: "bm-penjodoh-bilangan-tip-uasa-ayat",
          label: "Bina Ayat Gramatis",
          summary: "Gunakan penjodoh bilangan secara semula jadi dalam ayat yang lengkap.",
        },
        {
          id: "bm-penjodoh-bilangan-tip-uasa-bentuk-asal",
          label: "Jangan Ubah Bentuk",
          summary:
            "Jika soalan memberikan penjodoh bilangan tertentu, gunakannya tepat seperti yang diarahkan kecuali tugasan meminta pembetulan.",
        },
        {
          id: "bm-penjodoh-bilangan-tip-uasa-kata-ganda",
          label: "Semak Kata Ganda",
          summary:
            "Elakkan penggandaan kata nama yang tidak diperlukan selepas kata bilangan dan penjodoh bilangan.",
        },
      ],
    },
    {
      id: "bm-penjodoh-bilangan-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-penjodoh-bilangan-ingat-rumus",
          label: "Rumus",
          summary: "Kata Bilangan + Penjodoh Bilangan + Kata Nama",
        },
        {
          id: "bm-penjodoh-bilangan-ingat-bantuan",
          label: "Bantuan Ingatan",
          children: [
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-orang",
              label: "manusia → orang",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-ekor",
              label: "haiwan → ekor",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-pasang",
              label: "pasangan → pasang",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-helai",
              label: "nipis → helai",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-batang",
              label: "panjang → batang",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-bilah",
              label: "tajam → bilah",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-kumpulan",
              label: "kumpulan → kumpulan",
            },
            {
              id: "bm-penjodoh-bilangan-ingat-bantuan-buah",
              label: "benda umum → buah",
            },
          ],
        },
        {
          id: "bm-penjodoh-bilangan-ingat-contoh",
          label: "Contoh Ringkas",
          summary:
            "seorang guru • seekor kucing • sepasang kasut • sehelai kertas • sebatang pensel • sebilah pisau • sekumpulan murid • sebuah rumah",
        },
      ],
    },
  ],
};
