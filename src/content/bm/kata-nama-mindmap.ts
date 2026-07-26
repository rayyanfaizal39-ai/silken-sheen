import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataNamaMindMap: MindNode = {
  id: "bm-kata-nama-root",
  label: "KATA NAMA",
  children: [
    {
      id: "bm-kata-nama-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-kata-nama-definisi-maksud",
          label: "Maksud",
          children: [
            {
              id: "bm-kata-nama-definisi-maksud-huraian",
              label: "Nama orang, haiwan, benda, tempat atau konsep",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-nama-am",
      label: "Kata Nama Am",
      children: [
        { id: "bm-kata-nama-am-1", label: "Nama yang umum" },
        {
          id: "bm-kata-nama-am-2",
          label: "Huruf kecil kecuali pada permulaan ayat",
        },
        {
          id: "bm-kata-nama-am-3",
          label: "Contoh: negara, sekolah, guru, kerusi",
        },
        {
          id: "bm-kata-nama-am-4",
          label:
            "Ayat: Saya ingin melanjutkan pelajaran dalam bidang kejuruteraan nuklear di luar negara.",
        },
      ],
    },
    {
      id: "bm-kata-nama-khas",
      label: "Kata Nama Khas",
      children: [
        { id: "bm-kata-nama-khas-1", label: "Nama orang, tempat atau benda yang khusus" },
        { id: "bm-kata-nama-khas-2", label: "Huruf pertama ditulis dengan huruf besar" },
        {
          id: "bm-kata-nama-khas-3",
          label: "Contoh: Malaysia, Kuala Lumpur, Ali, Proton",
        },
        {
          id: "bm-kata-nama-khas-4",
          label:
            "Ayat: Malaysia merupakan destinasi pelancongan yang menjadi pilihan pelancong dari luar negara.",
        },
      ],
    },
    {
      id: "bm-kata-ganti-nama",
      label: "Kata Ganti Nama",
      children: [
        {
          id: "bm-kata-ganti-nama-diri",
          label: "Kata Ganti Nama Diri",
          children: [
            { id: "bm-kata-ganti-nama-diri-1", label: "Menggantikan nama orang" },
            {
              id: "bm-kata-ganti-nama-diri-2",
              label: "Contoh: saya, kami, awak, mereka",
            },
          ],
        },
        {
          id: "bm-kata-ganti-nama-tunjuk",
          label: "Kata Ganti Nama Tunjuk",
          children: [
            { id: "bm-kata-ganti-nama-tunjuk-1", label: "Menunjukkan sesuatu" },
            { id: "bm-kata-ganti-nama-tunjuk-2", label: "Contoh: ini, itu" },
          ],
        },
      ],
    },
    {
      id: "bm-kata-nama-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        { id: "bm-kata-nama-kesalahan-1", label: "Salah: malaysia → Betul: Malaysia" },
        { id: "bm-kata-nama-kesalahan-2", label: "Salah: ali → Betul: Ali" },
        {
          id: "bm-kata-nama-kesalahan-3",
          label: "Kata Nama Khas mesti dimulakan dengan huruf besar",
        },
      ],
    },
    {
      id: "bm-kata-nama-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-kata-nama-tip-uasa-1",
          label: "Kenal pasti sama ada kata nama itu umum atau khusus",
        },
        {
          id: "bm-kata-nama-tip-uasa-2",
          label: "Semak penggunaan huruf besar bagi Kata Nama Khas",
        },
        {
          id: "bm-kata-nama-tip-uasa-3",
          label: "Baca keseluruhan ayat sebelum menentukan jenis kata nama",
        },
        {
          id: "bm-kata-nama-tip-uasa-4",
          label: "Bezakan kata nama daripada perkataan yang menerangkannya",
        },
      ],
    },
    {
      id: "bm-kata-nama-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-kata-nama-ingat-1",
          label: "Kata Nama = nama orang, haiwan, benda, tempat atau konsep",
        },
      ],
    },
    {
      id: "bm-kata-nama-ejaan",
      label: "Nota Ejaan",
      children: [
        {
          id: "bm-kata-nama-ejaan-1",
          label: "Awalan anti- atau pro- dengan Kata Nama Khas menggunakan tanda sempang",
        },
        { id: "bm-kata-nama-ejaan-2", label: "Contoh: anti-Amerika" },
      ],
    },
  ],
};
