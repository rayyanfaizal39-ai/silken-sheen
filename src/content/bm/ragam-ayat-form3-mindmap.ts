import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-ragam-ayat";

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

export const bahasaMelayuForm3RagamAyatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "RAGAM AYAT",
  summary:
    "Ragam ayat mengelaskan ayat berdasarkan unsur yang diberikan penekanan sama ada pelaku atau objek.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-maksud",
        "Maksud",
        "Ragam ayat ialah pengelasan ayat berdasarkan unsur yang diberi penekanan.",
      ),
      node("definisi-dua-ragam", "Dua Ragam", "Ayat Aktif • Ayat Pasif"),
      node(
        "definisi-bukan-fungsi",
        "Bukan Fungsi Ayat",
        "Pelajaran ini bukan tentang fungsi ayat. Fungsi komunikasi dibincangkan dalam topik Jenis Ayat.",
      ),
      node(
        "definisi-jangan-keliru",
        "Jangan Keliru",
        "Jenis Ayat mengelaskan ayat mengikut fungsi komunikasi, manakala Ragam Ayat mengelaskan ayat mengikut unsur yang diberikan penekanan.",
      ),
    ]),
    branch("ayat-aktif", "Ayat Aktif", [
      node(
        "ayat-aktif-penekanan",
        "Penekanan",
        "Ayat aktif memberi penekanan kepada pelaku yang melakukan sesuatu perbuatan.",
      ),
      branch("ayat-aktif-struktur", "Struktur Umum", [
        node("ayat-aktif-struktur-pola", "Pola Aktif Transitif", "Pelaku → Kata Kerja → Objek"),
        node(
          "ayat-aktif-struktur-nuansa",
          "Gunakan dengan Cermat",
          "Pola ini menerangkan ayat aktif transitif. Ayat aktif tak transitif tidak semestinya mempunyai objek.",
        ),
      ]),
      branch("ayat-aktif-contoh", "Contoh", [
        node("ayat-aktif-contoh-ali", "Pelaku: Ali", "Ali membaca buku."),
        node("ayat-aktif-contoh-guru", "Pelaku: Guru", "Guru menerangkan pelajaran."),
        node("ayat-aktif-contoh-doktor", "Pelaku: Doktor", "Doktor memeriksa pesakit."),
      ]),
      node(
        "ayat-aktif-imbuhan",
        "Nota Imbuhan",
        "Kebanyakan kata kerja aktif menggunakan awalan meN- atau ber-, tetapi tidak setiap ayat aktif mesti mengandungi awalan tersebut. Analisis keseluruhan struktur ayat.",
      ),
    ]),
    branch("ayat-pasif", "Ayat Pasif", [
      node(
        "ayat-pasif-penekanan",
        "Penekanan",
        "Ayat pasif memberi penekanan kepada objek yang menerima perbuatan.",
      ),
      node(
        "ayat-pasif-pelaku",
        "Pelaku Tetap Penting",
        "Pelaku tetap penting dalam makna ayat walaupun pelaku tidak lagi menjadi fokus ayat.",
      ),
      branch("ayat-pasif-contoh", "Contoh", [
        node("ayat-pasif-contoh-buku", "Objek: Buku itu", "Buku itu dibaca oleh Ali."),
        node("ayat-pasif-contoh-rumah", "Objek: Rumah itu", "Rumah itu dibina oleh pekerja."),
        node("ayat-pasif-contoh-surat", "Objek: Surat itu", "Surat itu telah dihantar oleh guru."),
      ]),
      node(
        "ayat-pasif-oleh",
        "Penggunaan oleh",
        "Bukan setiap ayat pasif memerlukan oleh. Dalam pasif diri ketiga, oleh boleh digugurkan apabila pelaku hadir tepat selepas kata kerja pasif, tetapi diperlukan apabila pelaku dipisahkan oleh unsur lain.",
      ),
    ]),
    branch("penukaran", "Penukaran Ragam Ayat", [
      node(
        "penukaran-kekalkan",
        "Unsur yang Mesti Dikekalkan",
        "Maksud • masa • aspek • kata bantu • penafian • kata keterangan • objek • pelaku",
      ),
      branch("penukaran-sedang", "Contoh 1", [
        node("penukaran-sedang-aktif", "Aktif", "Ali sedang membaca buku itu."),
        node("penukaran-sedang-pasif", "Pasif", "Buku itu sedang dibaca oleh Ali."),
      ]),
      branch("penukaran-telah", "Contoh 2", [
        node("penukaran-telah-aktif", "Aktif", "Mereka telah menyiapkan tugasan."),
        node("penukaran-telah-pasif", "Pasif", "Tugasan telah disiapkan oleh mereka."),
      ]),
      branch("penukaran-akan", "Contoh 3", [
        node("penukaran-akan-aktif", "Aktif", "Guru akan menyampaikan hadiah."),
        node("penukaran-akan-pasif", "Pasif", "Hadiah akan disampaikan oleh guru."),
      ]),
      node(
        "penukaran-kata-bantu",
        "Jangan Gugurkan",
        "Jangan buang kata seperti sedang, telah, akan, masih dan belum semasa menukar ragam ayat.",
      ),
    ]),
    branch("kata-ganti-nama", "Kata Ganti Nama", [
      branch("kata-ganti-nama-pertama", "Diri Pertama", [
        node("kata-ganti-nama-pertama-senarai", "Kata Ganti Nama", "saya • aku • kami • kita"),
        node("kata-ganti-nama-pertama-betul", "Pasif yang Betul", "Buku itu saya baca."),
        node(
          "kata-ganti-nama-pertama-salah",
          "Bukan Bentuk Standard",
          "Buku itu dibaca oleh saya.",
        ),
      ]),
      branch("kata-ganti-nama-kedua", "Diri Kedua", [
        node("kata-ganti-nama-kedua-senarai", "Kata Ganti Nama", "awak • anda • kamu • engkau"),
        node("kata-ganti-nama-kedua-betul", "Pasif yang Betul", "Kerja itu kamu siapkan."),
        node(
          "kata-ganti-nama-kedua-pola",
          "Pola",
          "Objek + kata ganti nama diri kedua + kata kerja dasar",
        ),
      ]),
      branch("kata-ganti-nama-ketiga", "Diri Ketiga", [
        node("kata-ganti-nama-ketiga-senarai", "Pelaku", "Ali • mereka • beliau • dia"),
        node("kata-ganti-nama-ketiga-betul", "Pasif yang Betul", "Kerja itu disiapkan oleh Ali."),
        node(
          "kata-ganti-nama-ketiga-pola",
          "Pola Lazim",
          "Objek + di- + kata kerja + oleh + pelaku",
        ),
      ]),
      node(
        "kata-ganti-nama-uasa",
        "Kerap Diuji",
        "Perbezaan binaan pasif diri pertama, kedua dan ketiga ialah antara peraturan tatabahasa yang paling kerap diuji.",
      ),
    ]),
    branch("mengekalkan-maksud", "Mengekalkan Maksud", [
      node(
        "mengekalkan-maksud-maklumat",
        "Maklumat Asal",
        "Penukaran ragam ayat tidak boleh mengubah masa, tempat, sebab, objek, pelaku atau maksud.",
      ),
      branch("mengekalkan-maksud-contoh", "Contoh Analisis", [
        node(
          "mengekalkan-maksud-contoh-aktif",
          "Aktif",
          "Ali membaca buku di perpustakaan semalam.",
        ),
        node(
          "mengekalkan-maksud-contoh-pasif",
          "Pasif",
          "Buku dibaca oleh Ali di perpustakaan semalam.",
        ),
      ]),
      node(
        "mengekalkan-maksud-semak",
        "Semak",
        "Pelaku, perbuatan, objek, tempat dan masa masih sama; semua maklumat asal dikekalkan.",
      ),
    ]),
    branch("analisis", "Analisis Ragam Ayat", [
      node("analisis-pelaku", "Siapa Melakukan?", "Kenal pasti pelaku perbuatan."),
      node("analisis-penerima", "Siapa Menerima?", "Kenal pasti objek yang menerima perbuatan."),
      node(
        "analisis-penekanan",
        "Unsur yang Ditekankan",
        "Tentukan sama ada ayat menekankan pelaku atau penerima perbuatan.",
      ),
      node(
        "analisis-bukan-imbuhan",
        "Jangan Bergantung pada Imbuhan",
        "Jangan bergantung pada di- atau meN- sahaja untuk mengelaskan ayat. Kata ganti nama, susunan unsur dan hubungan antara pelaku dengan penerima mesti dianalisis.",
      ),
      node(
        "analisis-konteks",
        "Konteks Menentukan",
        "Konteks dan struktur lengkap ayat menentukan ragamnya, bukan satu awalan secara bersendirian.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-pertama", "Kata Ganti Diri Pertama", [
        node("kesalahan-pertama-salah", "Salah", "Buku itu dibaca oleh saya."),
        node("kesalahan-pertama-betul", "Betul", "Buku itu saya baca."),
      ]),
      branch("kesalahan-kedua", "Kata Ganti Diri Kedua", [
        node("kesalahan-kedua-salah", "Salah", "Kerja itu di kamu siapkan."),
        node("kesalahan-kedua-betul", "Betul", "Kerja itu kamu siapkan."),
      ]),
      branch("kesalahan-aktif", "Bentuk Aktif", [
        node("kesalahan-aktif-salah", "Salah", "Ali dibaca buku itu."),
        node("kesalahan-aktif-betul", "Betul", "Ali membaca buku itu."),
      ]),
      branch("kesalahan-pasif", "Bentuk Pasif", [
        node("kesalahan-pasif-salah", "Salah", "Hadiah itu guru memberi."),
        node("kesalahan-pasif-betul", "Betul", "Hadiah itu diberikan oleh guru."),
      ]),
      node(
        "kesalahan-punca",
        "Punca Kesalahan",
        "Kesalahan lazim melibatkan struktur kata ganti nama yang salah, kata bantu yang hilang, pembentukan pasif yang tidak tepat atau perubahan maksud.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("tip-uasa-pelaku", "1. Pelaku", "Siapa yang melakukan perbuatan?"),
      node("tip-uasa-penerima", "2. Penerima", "Siapa yang menerima perbuatan?"),
      node("tip-uasa-maksud", "3. Maksud", "Adakah maksud asal berubah?"),
      node(
        "tip-uasa-kata-bantu",
        "4. Kata Bantu",
        "Adakah kata bantu seperti sedang, telah atau akan dikekalkan?",
      ),
      node(
        "tip-uasa-struktur",
        "5. Struktur Pasif",
        "Adakah binaan pasif yang betul digunakan mengikut kata ganti nama pelaku?",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node("ingat-aktif", "Aktif", "Fokus pada pelaku."),
      node("ingat-pasif", "Pasif", "Fokus pada penerima perbuatan."),
      node(
        "ingat-pertama-kedua",
        "Diri Pertama dan Kedua",
        "Gunakan pasif pendek tanpa di- dalam penukaran ragam ayat standard.",
      ),
      node(
        "ingat-ketiga",
        "Diri Ketiga",
        "Gunakan kata kerja pasif berawalan di-; gunakan oleh apabila pelaku perlu dinyatakan mengikut struktur ayat.",
      ),
      node("ingat-maksud", "Maksud", "Maksud asal mesti dikekalkan."),
      node(
        "ingat-rumus",
        "Rumus Semakan",
        "Pelaku ↔ penerima • kata bantu kekal • struktur kata ganti nama tepat • maksud tidak berubah",
      ),
    ]),
  ],
};
