import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-kata-hikmat";

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

export const bahasaMelayuForm3KataHikmatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KATA HIKMAT",
  summary:
    "Ungkapan bermaksud mendalam yang dijadikan pegangan hidup berdasarkan bahan Bahasa Melayu Tingkatan 3.",
  children: [
    branch("apa-itu", "Apa Itu Kata Hikmat?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Kata hikmat ialah ungkapan yang mempunyai maksud mendalam dan dapat dijadikan pegangan atau panduan dalam kehidupan.",
      ),
      node(
        "apa-itu-kedudukan",
        "Kedudukan",
        "Dalam bahan Tingkatan 3, kata hikmat dipelajari sebagai satu jenis peribahasa bersama-sama dengan simpulan bahasa, perumpamaan, pepatah dan bidalan.",
      ),
      node(
        "apa-itu-fungsi",
        "Fungsi",
        "Memberikan nasihat, menyampaikan nilai murni, menguatkan huraian dan mengajak pembaca berfikir tentang prinsip kehidupan.",
      ),
      node(
        "apa-itu-skop",
        "Skop Bahan",
        "Hanya satu kata hikmat diperkenalkan secara jelas: “Ilmu itu penyuluh kehidupan.” Bentuk “Ilmu pengetahuan ialah penyuluh kehidupan” membawa maksud yang sama.",
      ),
    ]),
    branch("ciri", "Ciri-ciri", [
      node("ciri-ringkas", "Ringkas", "Ungkapannya ringkas dan mudah diingati."),
      node("ciri-mendalam", "Maksud Mendalam", "Mesejnya lebih luas daripada makna harfiah."),
      node(
        "ciri-pegangan",
        "Pegangan Hidup",
        "Mengandungi nilai, prinsip atau panduan yang boleh diamalkan.",
      ),
      node(
        "ciri-umum",
        "Boleh Digunakan Secara Umum",
        "Sesuai digunakan dalam pelbagai situasi yang berkaitan dengan temanya.",
      ),
      node(
        "ciri-positif",
        "Mesej Membina",
        "Membawa pemikiran yang positif dan menggalakkan tindakan yang baik.",
      ),
      node(
        "ciri-tetap",
        "Bentuk Dikekalkan",
        "Perkataan dan maksud asal perlu dikekalkan apabila digunakan.",
      ),
    ]),
    branch("kenal-pasti", "Cara Mengenal Pasti", [
      node(
        "kenal-pasti-baca",
        "Baca Seluruh Ungkapan",
        "Fahami mesej keseluruhan, bukan satu perkataan sahaja.",
      ),
      node(
        "kenal-pasti-prinsip",
        "Cari Prinsip Kehidupan",
        "Tanyakan nilai atau pegangan yang ingin disampaikan.",
      ),
      node(
        "kenal-pasti-mendalam",
        "Perhatikan Maksud Mendalam",
        "Maksudnya lazimnya lebih luas daripada makna harfiah.",
      ),
      node(
        "kenal-pasti-tema",
        "Kenal Pasti Tema",
        "Contohnya, “Ilmu itu penyuluh kehidupan” berkaitan dengan ilmu, pendidikan, pembacaan dan pembangunan diri.",
      ),
      node(
        "kenal-pasti-uji",
        "Uji sebagai Panduan",
        "Pastikan ungkapan itu boleh digunakan sebagai nasihat atau pegangan hidup.",
      ),
      node(
        "kenal-pasti-ayat-biasa",
        "Bezakan Ayat Biasa",
        "Sesuatu ayat nasihat tidak semestinya kata hikmat jika tidak digunakan sebagai ungkapan bernilai pegangan yang mendalam.",
      ),
    ]),
    branch("senarai", "Senarai Kata Hikmat", [
      branch("senarai-ilmu-penyuluh", "Ilmu itu penyuluh kehidupan", [
        node(
          "senarai-ilmu-penyuluh-maksud",
          "Maksud",
          "Ilmu pengetahuan menjadi panduan yang menerangi kehidupan manusia.",
        ),
        node(
          "senarai-ilmu-penyuluh-huraian",
          "Huraian Ringkas",
          "Ilmu membantu seseorang membezakan perkara baik dan buruk, membuat keputusan yang bijak, menyelesaikan masalah dan membina masa depan yang lebih baik.",
        ),
        node(
          "senarai-ilmu-penyuluh-contoh",
          "Contoh Ayat",
          "Kita hendaklah rajin membaca dan menuntut ilmu kerana ilmu itu penyuluh kehidupan.",
        ),
        node(
          "senarai-ilmu-penyuluh-situasi",
          "Situasi Penggunaan",
          "Menggalakkan murid belajar • Menjelaskan kepentingan pendidikan • Menghuraikan peranan ilmu • Menguatkan karangan bertema pembacaan • Menasihati seseorang agar terus menimba ilmu",
        ),
        node(
          "senarai-ilmu-penyuluh-kesalahan",
          "Kesalahan Lazim",
          "Jangan tafsirkan penyuluh sebagai lampu sebenar, menyempitkan maksudnya kepada kekayaan atau menggunakan “adalah” sebelum frasa nama “penyuluh kehidupan”.",
        ),
        node(
          "senarai-ilmu-penyuluh-berkaitan",
          "Kata Hikmat Berkaitan",
          "Tiada kata hikmat lain yang diperkenalkan secara jelas dalam bahan Tingkatan 3. Ungkapan kategori lain tidak ditambah hanya kerana bertema pendidikan.",
        ),
      ]),
    ]),
    branch("perbandingan", "Perbandingan Kategori", [
      node(
        "perbandingan-hikmat",
        "Kata Hikmat",
        "Ilmu itu penyuluh kehidupan — pegangan tentang kepentingan ilmu.",
      ),
      node(
        "perbandingan-pepatah",
        "Pepatah",
        "Diam-diam ubi berisi — orang pendiam yang berilmu atau berkebolehan.",
      ),
      node(
        "perbandingan-bidalan",
        "Bidalan",
        "Alah bisa tegal biasa — kesukaran menjadi mudah melalui pembiasaan.",
      ),
      node(
        "perbandingan-perumpamaan",
        "Perumpamaan",
        "Bagai aur dengan tebing — hubungan saling membantu.",
      ),
      node(
        "perbandingan-simpulan",
        "Simpulan Bahasa",
        "Berat mulut — tidak suka bercakap.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-harfiah",
        "Maksud Harfiah",
        "Terangkan mesej tersirat dan nilai, bukan gambaran luaran sahaja.",
      ),
      node(
        "kesalahan-bentuk",
        "Mengubah Bentuk",
        "Kekalkan perkataan dan maksud asal kata hikmat.",
      ),
      node(
        "kesalahan-sempit",
        "Maksud Terlalu Sempit",
        "Ilmu bukan sekadar untuk lulus peperiksaan atau menjadi kaya; ilmu membimbing kehidupan secara menyeluruh.",
      ),
      node(
        "kesalahan-kategori",
        "Salah Kategori",
        "Jangan anggap semua slogan, cogan kata, ayat nasihat atau peribahasa sebagai kata hikmat.",
      ),
      node(
        "kesalahan-konteks",
        "Salah Konteks",
        "Pilih kata hikmat yang benar-benar berkaitan dengan tema dan isi.",
      ),
      node(
        "kesalahan-tatabahasa",
        "Salah Kata Pemeri",
        "Tulis “Ilmu pengetahuan ialah penyuluh kehidupan”, bukan “Ilmu pengetahuan adalah penyuluh kehidupan”, kerana predikatnya frasa nama.",
      ),
      node(
        "kesalahan-hiasan",
        "Sekadar Hiasan",
        "Terangkan kaitan kata hikmat dengan isi dan elakkan penggunaan berlebihan.",
      ),
    ]),
    branch("mengingat", "Teknik Mengingat", [
      node(
        "mengingat-kata-kunci",
        "Kata Kunci",
        "Ilmu → penyuluh → panduan hidup.",
      ),
      node(
        "mengingat-gambaran",
        "Gambaran Mental",
        "Bayangkan penyuluh menerangi jalan yang gelap seperti ilmu membimbing kehidupan.",
      ),
      node(
        "mengingat-formula",
        "Formula Ingatan",
        "Ungkapan → Nilai → Situasi. Ilmu itu penyuluh kehidupan → kepentingan ilmu → murid rajin membaca dan belajar.",
      ),
      node(
        "mengingat-tema",
        "Kaitkan dengan Tema",
        "Pendidikan • Pembacaan • Pembangunan diri • Penyelesaian masalah",
      ),
      node(
        "mengingat-maksud",
        "Ingat Maksud",
        "Jangan hafal perkataan sahaja; terangkan cara ilmu membantu seseorang membuat keputusan dan membina masa depan.",
      ),
    ]),
    branch("uasa", "Teknik Menjawab UASA", [
      node(
        "uasa-baca",
        "1. Baca Situasi",
        "Baca petikan atau situasi hingga selesai.",
      ),
      node(
        "uasa-tema",
        "2. Kenal Pasti Tema",
        "Cari petunjuk seperti belajar, membaca, pengetahuan, pendidikan, panduan atau masa depan.",
      ),
      node(
        "uasa-mesej",
        "3. Rumuskan Mesej",
        "Nyatakan nilai atau pegangan situasi dengan ayat sendiri.",
      ),
      node(
        "uasa-padan",
        "4. Padankan",
        "Padankan mesej dengan maksud kata hikmat dan singkir kategori peribahasa yang lain.",
      ),
      node(
        "uasa-maksud",
        "5. Nyatakan Maksud",
        "Gunakan formula kata kunci kiasan + nilai utama + kesan.",
      ),
      node(
        "uasa-ayat",
        "6. Bina Ayat",
        "Gunakan formula Isi → Kata Hikmat → Hubungan.",
      ),
      node(
        "uasa-frasa",
        "Frasa Sesuai",
        "Hal ini bertepatan dengan kata hikmat ... • Situasi ini membuktikan kebenaran kata hikmat ...",
      ),
      node(
        "uasa-semak",
        "7. Semak",
        "Pastikan tema tepat, maksud tersirat dijelaskan, bentuk asal dikekalkan, tatabahasa betul dan penggunaan tidak berlebihan.",
      ),
    ]),
  ],
};
