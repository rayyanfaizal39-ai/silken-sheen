import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-jenis-ayat";

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

export const bahasaMelayuForm3JenisAyatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "JENIS AYAT",
  summary:
    "Jenis ayat ialah pengelasan ayat berdasarkan tujuan atau fungsi sesuatu ayat digunakan dalam komunikasi.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-maksud",
        "Maksud",
        "Jenis ayat mengelaskan ayat berdasarkan tujuan penutur menggunakannya.",
      ),
      node(
        "definisi-empat",
        "Empat Jenis Utama",
        "Ayat Penyata • Ayat Tanya • Ayat Perintah • Ayat Seruan",
      ),
      node(
        "definisi-asas",
        "Asas Pengelasan",
        "Pengelasan ini berdasarkan tujuan komunikasi, bukannya kerumitan atau panjang ayat.",
      ),
      node(
        "definisi-beza",
        "Jangan Keliru",
        "Jenis Ayat ≠ Ayat Tunggal ≠ Ayat Majmuk. Ayat boleh dikenal pasti mengikut fungsi komunikasi dan pada masa yang sama dianalisis secara berasingan mengikut strukturnya.",
      ),
    ]),
    branch("penyata", "Ayat Penyata", [
      node(
        "penyata-fungsi",
        "Fungsi",
        "Ayat penyata digunakan untuk menyampaikan maklumat, berita, fakta atau pendapat.",
      ),
      node("penyata-formula", "Formula Asas", "Subjek + Predikat"),
      branch("penyata-contoh", "Contoh", [
        node(
          "penyata-contoh-malaysia",
          "Maklumat",
          "Malaysia merupakan sebuah negara yang merdeka.",
        ),
        node("penyata-contoh-ali", "Perbuatan", "Ali sedang membaca buku."),
        node("penyata-contoh-sekolah", "Berita", "Sekolah akan dibuka minggu hadapan."),
      ]),
      node(
        "penyata-nota",
        "Nota",
        "Ayat penyata ialah jenis ayat yang paling lazim digunakan dan tidak terhad kepada pernyataan fakta sahaja.",
      ),
    ]),
    branch("tanya", "Ayat Tanya", [
      node("tanya-fungsi", "Fungsi", "Ayat tanya digunakan untuk mendapatkan maklumat."),
      branch("tanya-kata", "Dengan Kata Tanya", [
        node("tanya-kata-siapa", "siapa", "Siapa datang tadi?"),
        node("tanya-kata-apa", "apa", "Apakah nama sekolah itu?"),
        node("tanya-kata-mengapa", "mengapa", "Mengapakah Ali tidak hadir?"),
        node("tanya-kata-bagaimana", "bagaimana", "Bagaimanakah cara membuat eksperimen itu?"),
      ]),
      branch("tanya-tanpa", "Tanpa Kata Tanya", [
        node("tanya-tanpa-ali", "Contoh 1", "Ali sudah siap?"),
        node("tanya-tanpa-faham", "Contoh 2", "Kamu faham?"),
        node("tanya-tanpa-makan", "Contoh 3", "Sudah makan?"),
        node(
          "tanya-tanpa-intonasi",
          "Intonasi",
          "Intonasi memainkan peranan penting dalam ayat tanya lisan tanpa kata tanya.",
        ),
      ]),
      branch("tanya-partikel", "Partikel -kah", [
        node(
          "tanya-partikel-fungsi",
          "Penggunaan",
          "Partikel -kah boleh digunakan untuk menegaskan bentuk pertanyaan.",
        ),
        node("tanya-partikel-contoh", "Contoh", "Sudahkah kamu makan?"),
      ]),
      node(
        "tanya-ketepatan",
        "Nota Ketepatan",
        "Kenal pasti tujuan penutur untuk bertanya; tanda soal membantu dalam tulisan tetapi bukan satu-satunya asas pengelasan.",
      ),
    ]),
    branch("perintah", "Ayat Perintah", [
      node(
        "perintah-fungsi",
        "Fungsi",
        "Ayat perintah bertujuan meminta seseorang melakukan atau tidak melakukan sesuatu tindakan.",
      ),
      branch("perintah-suruhan", "Ayat Suruhan", [
        node("perintah-suruhan-baca", "Contoh 1", "Baca buku itu."),
        node("perintah-suruhan-simpan", "Contoh 2", "Simpan telefon itu."),
      ]),
      branch("perintah-larangan", "Ayat Larangan", [
        node("perintah-larangan-penanda", "Penanda", "jangan • usah"),
        node("perintah-larangan-jangan", "Contoh 1", "Jangan bermain di jalan raya."),
        node("perintah-larangan-usah", "Contoh 2", "Usah bersedih."),
      ]),
      branch("perintah-silaan", "Ayat Silaan", [
        node("perintah-silaan-penanda", "Penanda", "sila • jemput"),
        node("perintah-silaan-sila", "Contoh 1", "Sila duduk."),
        node("perintah-silaan-jemput", "Contoh 2", "Jemput masuk."),
      ]),
      branch("perintah-permintaan", "Ayat Permintaan", [
        node("perintah-permintaan-penanda", "Penanda", "minta • mohon"),
        node("perintah-permintaan-mohon", "Contoh 1", "Mohon beri perhatian."),
        node("perintah-permintaan-minta", "Contoh 2", "Minta tutup pintu itu."),
      ]),
      node(
        "perintah-nota",
        "Nota Ketepatan",
        "Ayat perintah tidak semestinya bermula dengan sila; bentuknya bergantung pada tujuan suruhan, larangan, silaan atau permintaan.",
      ),
    ]),
    branch("seruan", "Ayat Seruan", [
      node(
        "seruan-fungsi",
        "Fungsi",
        "Ayat seruan digunakan untuk melahirkan perasaan seperti kagum, sakit, hairan atau tahniah.",
      ),
      node("seruan-kata", "Kata Seru", "Wah! • Amboi! • Aduh! • Syabas!"),
      branch("seruan-contoh", "Contoh Ayat", [
        node("seruan-contoh-wah", "Kagum", "Wah, cantiknya pemandangan ini!"),
        node("seruan-contoh-aduh", "Sakit", "Aduh, sakitnya kaki saya!"),
        node("seruan-contoh-syabas", "Tahniah", "Syabas, kamu berjaya!"),
      ]),
      node(
        "seruan-tulisan",
        "Bentuk Tulisan",
        "Ayat seruan lazimnya diakhiri tanda seru (!), tetapi fungsi dan perasaan yang disampaikan tetap menjadi asas pengelasan.",
      ),
    ]),
    branch("perbezaan", "Perbezaan Jenis Ayat", [
      node("perbezaan-penyata", "Ayat Penyata", "Memberi maklumat."),
      node("perbezaan-tanya", "Ayat Tanya", "Bertanya atau mendapatkan maklumat."),
      node("perbezaan-perintah", "Ayat Perintah", "Meminta sesuatu tindakan."),
      node("perbezaan-seruan", "Ayat Seruan", "Melahirkan perasaan."),
      node(
        "perbezaan-panduan",
        "Panduan",
        "Kenal pasti fungsi ayat dalam konteks komunikasi; jangan menghafal tanda baca semata-mata.",
      ),
    ]),
    branch("penukaran", "Penukaran Jenis Ayat", [
      branch("penukaran-penyata-tanya", "Penyata → Tanya", [
        node("penukaran-penyata-tanya-asal", "Penyata", "Ali sudah hadir."),
        node("penukaran-penyata-tanya-hasil", "Tanya", "Adakah Ali sudah hadir?"),
      ]),
      branch("penukaran-perintah-penyata", "Perintah → Penyata", [
        node("penukaran-perintah-penyata-asal", "Perintah", "Sila duduk."),
        node("penukaran-perintah-penyata-hasil", "Penyata", "Guru meminta murid duduk."),
      ]),
      branch("penukaran-cakap", "Cakap Ajuk → Cakap Pindah", [
        node("penukaran-cakap-asal", "Cakap Ajuk", "Ayah berkata, “Belajar bersungguh-sungguh.”"),
        node(
          "penukaran-cakap-hasil",
          "Cakap Pindah",
          "Ayah menasihati kami supaya belajar bersungguh-sungguh.",
        ),
      ]),
      node(
        "penukaran-maksud",
        "Kekalkan Maksud",
        "Apabila bentuk ayat ditukar, maklumat, tujuan dan maksud asal mesti dikekalkan setepat mungkin mengikut arahan soalan.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-seruan", "Tanda Seruan", [
        node("kesalahan-seruan-salah", "Salah", "Wah. Cantiknya bunga itu."),
        node("kesalahan-seruan-betul", "Betul", "Wah, cantiknya bunga itu!"),
      ]),
      branch("kesalahan-larangan", "Ayat Larangan", [
        node("kesalahan-larangan-salah", "Salah", "Jangan kamu bermain?"),
        node("kesalahan-larangan-betul", "Betul", "Jangan bermain."),
      ]),
      branch("kesalahan-penyata-seru", "Penyata Bukan Seruan", [
        node(
          "kesalahan-penyata-seru-salah",
          "Tidak Tepat tanpa Maksud Seruan",
          "Ali sudah datang!",
        ),
        node("kesalahan-penyata-seru-betul", "Betul", "Ali sudah datang."),
      ]),
      branch("kesalahan-penyata-tanya", "Penyata Bukan Pertanyaan", [
        node(
          "kesalahan-penyata-tanya-salah",
          "Tidak Tepat jika Tidak Bertanya",
          "Malaysia merupakan sebuah negara?",
        ),
        node("kesalahan-penyata-tanya-betul", "Betul", "Malaysia merupakan sebuah negara."),
      ]),
      node(
        "kesalahan-panduan",
        "Panduan",
        "Pilih jenis ayat berdasarkan maksud dan tujuan komunikasi, bukan tanda baca sahaja.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("tip-uasa-soalan", "Soalan Utama", "Apakah yang cuba dilakukan oleh penutur?"),
      node("tip-uasa-penyata", "Memberi Maklumat?", "Pilih Ayat Penyata."),
      node("tip-uasa-tanya", "Bertanya?", "Pilih Ayat Tanya."),
      node("tip-uasa-perintah", "Memberi Arahan atau Meminta Tindakan?", "Pilih Ayat Perintah."),
      node("tip-uasa-seruan", "Meluahkan Perasaan?", "Pilih Ayat Seruan."),
      node(
        "tip-uasa-semak",
        "Semak Konteks",
        "Gunakan fungsi, pilihan kata, intonasi dan tanda baca secara bersama untuk menentukan jawapan.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node("ingat-penyata", "Penyata", "Maklumat"),
      node("ingat-tanya", "Tanya", "Soalan"),
      node("ingat-perintah", "Perintah", "Arahan atau permintaan tindakan"),
      node("ingat-seruan", "Seruan", "Perasaan"),
      node(
        "ingat-rumus",
        "Rumus",
        "Penyata → Maklumat • Tanya → Soalan • Perintah → Arahan • Seruan → Perasaan",
      ),
      node(
        "ingat-kunci",
        "Kunci",
        "Tujuan komunikasi menentukan jenis ayat; tanda baca ialah petunjuk, bukan satu-satunya penentu.",
      ),
    ]),
  ],
};
