import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataKerjaMindMap: MindNode = {
  id: "bm-kata-kerja-root",
  label: "KATA KERJA",
  summary: "Perkataan yang menerangkan perbuatan, keadaan atau proses.",
  children: [
    {
      id: "bm-kata-kerja-definisi",
      label: "Definisi",
      summary: "Menerangkan sesuatu perbuatan, keadaan atau proses.",
      children: [
        {
          id: "bm-kata-kerja-definisi-maksud",
          label:
            "Kata kerja ialah perkataan yang menerangkan sesuatu perbuatan, keadaan atau proses.",
        },
        {
          id: "bm-kata-kerja-definisi-contoh",
          label: "Contoh: membaca, duduk, berubah, menguruskan",
        },
      ],
    },
    {
      id: "bm-kata-kerja-transitif",
      label: "Kata Kerja Transitif",
      summary: "Memerlukan objek untuk melengkapkan maksud ayat.",
      children: [
        {
          id: "bm-kata-kerja-transitif-ciri",
          label: "Objek biasanya hadir selepas kata kerja untuk melengkapkan maksud ayat.",
        },
        {
          id: "bm-kata-kerja-transitif-pola",
          label: "Pola: Subjek → Kata Kerja Transitif → Objek",
        },
        {
          id: "bm-kata-kerja-transitif-memupuk",
          label: "Kata kerja: memupuk",
          children: [
            {
              id: "bm-kata-kerja-transitif-memupuk-ayat",
              label: "Ayat: “Program ini bermatlamatkan memupuk perpaduan kaum.”",
            },
          ],
        },
        {
          id: "bm-kata-kerja-transitif-aina",
          label: "Ayat: “Aina membaca buku.”",
          children: [
            { id: "bm-kata-kerja-transitif-aina-subjek", label: "Subjek: Aina" },
            {
              id: "bm-kata-kerja-transitif-aina-kata-kerja",
              label: "Kata kerja transitif: membaca",
            },
            { id: "bm-kata-kerja-transitif-aina-objek", label: "Objek: buku" },
          ],
        },
      ],
    },
    {
      id: "bm-kata-kerja-tak-transitif",
      label: "Kata Kerja Tak Transitif",
      summary: "Tidak memerlukan objek.",
      children: [
        {
          id: "bm-kata-kerja-tak-transitif-ciri",
          label: "Boleh melengkapkan predikat tanpa diikuti objek.",
        },
        {
          id: "bm-kata-kerja-tak-transitif-duduk",
          label: "Kata kerja: duduk",
          children: [
            {
              id: "bm-kata-kerja-tak-transitif-duduk-ayat",
              label: "Ayat: “Semua murid boleh duduk.”",
            },
          ],
        },
        {
          id: "bm-kata-kerja-tak-transitif-adik",
          label: "Ayat: “Adik tidur.”",
          children: [
            { id: "bm-kata-kerja-tak-transitif-adik-subjek", label: "Subjek: Adik" },
            {
              id: "bm-kata-kerja-tak-transitif-adik-kata-kerja",
              label: "Kata kerja tak transitif: tidur",
            },
            {
              id: "bm-kata-kerja-tak-transitif-adik-objek",
              label: "Tiada objek diperlukan",
            },
          ],
        },
        {
          id: "bm-kata-kerja-perbandingan",
          label: "Perbandingan",
          children: [
            { id: "bm-kata-kerja-perbandingan-transitif", label: "Transitif → memerlukan objek" },
            {
              id: "bm-kata-kerja-perbandingan-tak-transitif",
              label: "Tak transitif → tidak memerlukan objek",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-kerja-bentuk",
      label: "Bentuk Kata Kerja",
      summary: "Kata kerja boleh hadir tanpa imbuhan atau menerima imbuhan.",
      children: [
        {
          id: "bm-kata-kerja-tunggal",
          label: "Kata Kerja Tunggal",
          children: [
            { id: "bm-kata-kerja-tunggal-maksud", label: "Kata kerja tanpa imbuhan" },
            { id: "bm-kata-kerja-tunggal-contoh", label: "Contoh: duduk, makan, tidur" },
          ],
        },
        {
          id: "bm-kata-kerja-terbitan",
          label: "Kata Kerja Terbitan",
          children: [
            {
              id: "bm-kata-kerja-terbitan-maksud",
              label: "Kata kerja yang menerima imbuhan",
            },
            {
              id: "bm-kata-kerja-terbitan-awalan",
              label: "Awalan: berubah, melanda",
            },
            {
              id: "bm-kata-kerja-terbitan-apitan",
              label: "Apitan: menyaksikan, dipraktikkan, disampaikan, menguruskan",
            },
          ],
        },
        {
          id: "bm-kata-kerja-bentuk-berkaitan",
          label: "Ketahui lebih lanjut dalam topik Imbuhan.",
        },
      ],
    },
    {
      id: "bm-kata-kerja-dalam-ayat",
      label: "Kata Kerja dalam Ayat",
      summary: "Unsur utama Frasa Kerja yang lazimnya berfungsi sebagai predikat.",
      children: [
        {
          id: "bm-kata-kerja-dalam-ayat-pola",
          label: "Struktur lazim: Frasa Nama + Frasa Kerja",
        },
        {
          id: "bm-kata-kerja-dalam-ayat-contoh",
          label: "Ayat: “Murid-murid membaca buku.”",
          children: [
            {
              id: "bm-kata-kerja-dalam-ayat-frasa-nama",
              label: "Frasa Nama: Murid-murid",
            },
            {
              id: "bm-kata-kerja-dalam-ayat-frasa-kerja",
              label: "Frasa Kerja: membaca buku",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-kerja-aktif-pasif",
      label: "Ayat Aktif dan Ayat Pasif",
      summary: "Pengenalan kepada hubungan ayat aktif dengan ayat pasif.",
      children: [
        {
          id: "bm-kata-kerja-aktif",
          label: "Ayat Aktif",
          children: [
            {
              id: "bm-kata-kerja-aktif-ciri",
              label: "Subjek atau pelaku hadir di hadapan, diikuti kata kerja dan objek.",
            },
            {
              id: "bm-kata-kerja-aktif-contoh",
              label: "Contoh: “Ali menendang bola.”",
            },
          ],
        },
        {
          id: "bm-kata-kerja-pasif",
          label: "Ayat Pasif",
          children: [
            {
              id: "bm-kata-kerja-pasif-ciri",
              label:
                "Objek atau perkara yang menerima perbuatan diberikan tumpuan dan biasanya diletakkan di hadapan.",
            },
            {
              id: "bm-kata-kerja-pasif-contoh",
              label: "Contoh: “Bola ditendang oleh Ali.”",
            },
          ],
        },
        {
          id: "bm-kata-kerja-aktif-pasif-hubungan",
          label: "Ali menendang bola. → Bola ditendang oleh Ali.",
        },
        {
          id: "bm-kata-kerja-aktif-pasif-nota",
          label:
            "Nota: Kata “oleh” tidak wajib hadir dalam setiap ayat pasif; penggunaannya bergantung pada struktur dan konteks ayat.",
        },
      ],
    },
    {
      id: "bm-kata-kerja-kesalahan",
      label: "Kesalahan Lazim",
      summary: "Semak objek, imbuhan dan fungsi perkataan dalam ayat.",
      children: [
        {
          id: "bm-kata-kerja-kesalahan-objek",
          label: "1. Kata kerja transitif tanpa objek",
          children: [
            { id: "bm-kata-kerja-kesalahan-objek-salah", label: "Salah: “Aiman membaca.”" },
            {
              id: "bm-kata-kerja-kesalahan-objek-huraian",
              label:
                "Ayat ini boleh dianggap tidak lengkap apabila maksud yang dikehendaki memerlukan objek.",
            },
            {
              id: "bm-kata-kerja-kesalahan-objek-baik",
              label: "Lebih baik: “Aiman membaca buku.”",
            },
          ],
        },
        {
          id: "bm-kata-kerja-kesalahan-imbuhan",
          label: "2. Menukar imbuhan asal",
          children: [
            {
              id: "bm-kata-kerja-kesalahan-imbuhan-arahan",
              label:
                "Dalam soalan tertentu, gunakan kata kerja sebagaimana yang diberikan dalam petikan.",
            },
            {
              id: "bm-kata-kerja-kesalahan-imbuhan-asal",
              label: "Kata dalam petikan: menyampaikan",
            },
            {
              id: "bm-kata-kerja-kesalahan-imbuhan-elak",
              label: "Jangan ubah tanpa keperluan kepada: sampaikan, disampaikan, penyampaian",
            },
            {
              id: "bm-kata-kerja-kesalahan-imbuhan-ingat",
              label: "Baca arahan soalan sebelum mengubah bentuk kata.",
            },
          ],
        },
        {
          id: "bm-kata-kerja-kesalahan-keterangan",
          label: "3. Mengelirukan objek dengan keterangan",
          children: [
            {
              id: "bm-kata-kerja-kesalahan-keterangan-objek",
              label: "“Dia membaca buku.” → buku = objek",
            },
            {
              id: "bm-kata-kerja-kesalahan-keterangan-tempat",
              label: "“Dia tidur di bilik.” → di bilik = keterangan tempat, bukan objek",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-kerja-tip-uasa",
      label: "Tip UASA",
      summary: "Kenal pasti fungsi kata kerja melalui maksud dan struktur ayat.",
      children: [
        {
          id: "bm-kata-kerja-tip-uasa-1",
          label: "Cari perkataan yang menunjukkan perbuatan, keadaan atau proses.",
        },
        {
          id: "bm-kata-kerja-tip-uasa-2",
          label: "Lihat sama ada kata kerja itu memerlukan objek.",
        },
        {
          id: "bm-kata-kerja-tip-uasa-3",
          label: "Kenal pasti perkataan selepas kata kerja.",
        },
        {
          id: "bm-kata-kerja-tip-uasa-4",
          label: "Bezakan objek daripada keterangan tempat, masa atau cara.",
        },
        {
          id: "bm-kata-kerja-tip-uasa-5",
          label: "Gunakan kata kerja mengikut bentuk yang diminta dalam soalan.",
        },
        {
          id: "bm-kata-kerja-tip-uasa-6",
          label: "Semak imbuhan dan struktur ayat sebelum menjawab.",
        },
      ],
    },
    {
      id: "bm-kata-kerja-ingat",
      label: "Ingat!",
      summary: "Kata Kerja = perbuatan, keadaan atau proses.",
      children: [
        {
          id: "bm-kata-kerja-ingat-maksud",
          label: "Kata Kerja = perbuatan, keadaan atau proses",
        },
        {
          id: "bm-kata-kerja-ingat-transitif",
          label: "Transitif → ada objek",
        },
        {
          id: "bm-kata-kerja-ingat-tak-transitif",
          label: "Tak transitif → tidak perlu objek",
        },
      ],
    },
  ],
};
