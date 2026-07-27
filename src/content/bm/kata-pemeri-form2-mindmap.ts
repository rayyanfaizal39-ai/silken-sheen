import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-kata-pemeri";

function node(id: string, label: string, summary?: string, children?: MindNode[]): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    ...(summary ? { summary } : {}),
    ...(children?.length ? { children } : {}),
  };
}

function branch(id: string, label: string, children: MindNode[]): MindNode {
  return node(id, label, undefined, children);
}

export const bahasaMelayuForm2KataPemeriMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KATA PEMERI",
  summary:
    "Kata pemeri menghubungkan subjek dengan predikat dan digunakan mengikut jenis frasa yang hadir selepasnya.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-fungsi",
        "Fungsi",
        "Kata pemeri berfungsi menghubungkan subjek dengan predikat.",
      ),
      node("definisi-bentuk", "Dua Kata Pemeri Standard", "ialah • adalah"),
      node(
        "definisi-langkah",
        "Langkah Utama",
        "Kenal pasti jenis frasa yang hadir selepas kata pemeri sebelum memilih antara ialah dengan adalah.",
      ),
    ]),
    branch("ialah", "ialah", [
      node("ialah-penggunaan", "Digunakan Sebelum", "Frasa Nama (FN)"),
      node("ialah-formula", "Formula", "Subjek + ialah + Frasa Nama"),
      branch("ialah-contoh", "Contoh", [
        node("ialah-contoh-sekolah", "Nama Sekolah", "Nama sekolah saya ialah SMK Seri Puteri."),
        node("ialah-contoh-hobi", "Hobi", "Hobi Amir ialah bermain badminton."),
        node("ialah-contoh-jawatan", "Jawatan", "Jawatan beliau ialah pengetua sekolah."),
      ]),
      node(
        "ialah-ketepatan",
        "Nota Ketepatan",
        'Dalam "Hobi Amir ialah bermain badminton.", frasa "bermain badminton" diterima dalam tatabahasa sekolah kerana berfungsi secara nominal dalam konteks ini. Bukan setiap perkataan selepas "ialah" yang kelihatan seperti kata kerja semestinya salah.',
      ),
      node(
        "ialah-fn-jelas",
        "Contoh FN yang Jelas",
        "Nama saya ialah Ali. • Haiwan itu ialah harimau. • Tujuan utama ialah perpaduan.",
      ),
    ]),
    branch("adalah", "adalah", [
      node(
        "adalah-penggunaan",
        "Digunakan Sebelum",
        "Frasa Adjektif (FA) atau Frasa Sendi Nama (FS)",
      ),
      branch("adalah-fa", "Sebelum Frasa Adjektif", [
        node("adalah-fa-formula", "Formula", "Subjek + adalah + Frasa Adjektif"),
        node("adalah-fa-cuaca", "Contoh 1", "Cuaca hari ini adalah sangat baik."),
        node("adalah-fa-keputusan", "Contoh 2", "Keputusan itu adalah memuaskan."),
      ]),
      branch("adalah-fs", "Sebelum Frasa Sendi Nama", [
        node("adalah-fs-formula", "Formula", "Subjek + adalah + Frasa Sendi Nama"),
        node("adalah-fs-mesyuarat", "Contoh 1", "Mesyuarat itu adalah pada hari Isnin."),
        node("adalah-fs-program", "Contoh 2", "Program tersebut adalah untuk semua murid."),
        node("adalah-fs-buku", "Contoh 3", "Buku itu adalah di atas meja."),
      ]),
      node(
        "adalah-nota",
        "Nota",
        "Kata pemeri adalah tidak digunakan sewenang-wenangnya sebelum setiap jenis frasa; tentukan sama ada predikat yang mengikutinya ialah FA atau FS.",
      ),
    ]),
    branch("perbezaan", "Perbezaan ialah & adalah", [
      branch("perbezaan-ialah", "ialah → Frasa Nama", [
        node("perbezaan-ialah-ali", "Contoh 1", "Ali ialah ketua kelas."),
        node("perbezaan-ialah-malaysia", "Contoh 2", "Malaysia ialah sebuah negara."),
      ]),
      branch("perbezaan-adalah-fa", "adalah → Frasa Adjektif", [
        node("perbezaan-adalah-fa-contoh", "Contoh", "Keadaan itu adalah baik."),
      ]),
      branch("perbezaan-adalah-fs", "adalah → Frasa Sendi Nama", [
        node("perbezaan-adalah-fs-contoh", "Contoh", "Majlis itu adalah pada pukul 8 malam."),
      ]),
      node(
        "perbezaan-panduan",
        "Panduan",
        "Lihat jenis frasa selepas kata pemeri: FN menggunakan ialah, manakala FA dan FS menggunakan adalah.",
      ),
    ]),
    branch("bukan", "Bukan Kata Pemeri", [
      node("bukan-dua", "Kata Pemeri", "ialah dan adalah"),
      node("bukan-merupakan", "merupakan", "Merupakan ialah kata kerja, bukannya kata pemeri."),
      node("bukan-contoh", "Contoh", "Malaysia merupakan sebuah negara."),
      node(
        "bukan-ketepatan",
        "Nota Ketepatan",
        "Jangan anggap ialah dan merupakan mempunyai fungsi yang sama atau boleh saling menggantikan dalam setiap ayat. Jangan juga menggantikan setiap penggunaan merupakan dengan ialah secara automatik.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-fa", "Sebelum Frasa Adjektif", [
        node("kesalahan-fa-salah", "Salah", "Cuaca hari ini ialah sangat panas."),
        node("kesalahan-fa-betul", "Betul", "Cuaca hari ini adalah sangat panas."),
      ]),
      branch("kesalahan-fn", "Sebelum Frasa Nama", [
        node("kesalahan-fn-salah", "Salah", "Nama saya adalah Ali."),
        node("kesalahan-fn-betul", "Betul", "Nama saya ialah Ali."),
      ]),
      branch("kesalahan-fs-untuk", 'Frasa Sendi Nama dengan "untuk"', [
        node("kesalahan-fs-untuk-salah", "Salah", "Program ini ialah untuk murid Tingkatan 2."),
        node("kesalahan-fs-untuk-betul", "Betul", "Program ini adalah untuk murid Tingkatan 2."),
      ]),
      branch("kesalahan-fs-di", 'Frasa Sendi Nama dengan "di"', [
        node("kesalahan-fs-di-salah", "Salah", "Majlis itu ialah di dewan sekolah."),
        node("kesalahan-fs-di-betul", "Betul", "Majlis itu adalah di dewan sekolah."),
      ]),
      node(
        "kesalahan-panduan",
        "Panduan Pembetulan",
        "Kenal pasti frasa selepas kata pemeri sebelum menentukan bentuk yang tepat.",
      ),
    ]),
    branch("penyuntingan", "Penyuntingan", [
      node(
        "penyuntingan-konteks",
        "Konteks Soalan",
        "Penggunaan ialah dan adalah kerap diuji dalam soalan penyuntingan.",
      ),
      node(
        "penyuntingan-langkah-1",
        "Langkah 1: Cari",
        "Cari penggunaan ialah atau adalah dalam ayat.",
      ),
      node(
        "penyuntingan-langkah-2",
        "Langkah 2: Kenal Pasti Frasa",
        "Tentukan sama ada frasa selepasnya ialah FN, FA atau FS.",
      ),
      node(
        "penyuntingan-langkah-3",
        "Langkah 3: Betulkan",
        "Gunakan ialah sebelum FN dan gunakan adalah sebelum FA atau FS.",
      ),
      node(
        "penyuntingan-semak",
        "Semak Semula",
        "Baca keseluruhan ayat untuk memastikan pembetulan mengekalkan maksud dan menghasilkan struktur yang gramatis.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("tip-uasa-ingatan", "Ingatan Cepat", "FN → ialah • FA → adalah • FS → adalah"),
      node(
        "tip-uasa-frasa",
        "Kenal Pasti Frasa Dahulu",
        "Jangan memilih kata pemeri berdasarkan hafalan sahaja. Tentukan jenis frasa predikat terlebih dahulu.",
      ),
      node("tip-uasa-fn", "Jika Frasa Nama", "Gunakan ialah."),
      node("tip-uasa-fa-fs", "Jika Frasa Adjektif atau Frasa Sendi Nama", "Gunakan adalah."),
      node(
        "tip-uasa-semak",
        "Semak Fungsi",
        "Pastikan perkataan yang diuji benar-benar kata pemeri dan bukan kata kerja seperti merupakan.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node("ingat-ialah", "ialah", "Digunakan sebelum Frasa Nama."),
      node("ingat-adalah-fa", "adalah → Frasa Adjektif", "Contoh: Keadaan itu adalah baik."),
      node(
        "ingat-adalah-fs",
        "adalah → Frasa Sendi Nama",
        "Contoh: Majlis itu adalah pada pukul 8 malam.",
      ),
      node("ingat-merupakan", "merupakan", "Kata kerja, bukan kata pemeri."),
      node("ingat-rumus", "Rumus", "ialah → FN • adalah → FA atau FS • merupakan → kata kerja"),
    ]),
  ],
};
