import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-cakap-ajuk-cakap-pindah";

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

export const bahasaMelayuForm3CakapAjukCakapPindahMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "CAKAP AJUK & CAKAP PINDAH",
  summary:
    "Cakap ajuk mengekalkan percakapan asal penutur manakala cakap pindah melaporkan semula percakapan tersebut dalam bentuk ayat laporan tanpa mengubah maksud.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-maksud",
        "Dua Cara Penyampaian",
        "Cakap ajuk dan cakap pindah ialah dua cara menyampaikan percakapan seseorang.",
      ),
      node(
        "definisi-ajuk",
        "Cakap Ajuk",
        "Mengekalkan kata-kata asal penutur dalam bentuk petikan.",
      ),
      node(
        "definisi-pindah",
        "Cakap Pindah",
        "Melaporkan semula percakapan tanpa menggunakan petikan.",
      ),
      node(
        "definisi-hubungan",
        "Mesej Sama, Struktur Berbeza",
        "Kedua-dua bentuk menyampaikan mesej yang sama, tetapi menggunakan struktur ayat yang berbeza.",
      ),
    ]),
    branch("cakap-ajuk", "Cakap Ajuk", [
      node(
        "cakap-ajuk-maksud",
        "Maksud",
        "Percakapan ditulis semula sebagaimana diucapkan oleh penutur.",
      ),
      node(
        "cakap-ajuk-ciri",
        "Ciri-ciri",
        "Menggunakan tanda petik • mengekalkan kata asal • mengekalkan tanda soal atau tanda seru jika sesuai • mengekalkan kata ganti nama asal",
      ),
      node("cakap-ajuk-penyata", "Contoh Penyata", '"Esok kami akan bertolak," kata Amir.'),
      node("cakap-ajuk-tanya", "Contoh Tanya", '"Siapakah yang datang tadi?" tanya guru.'),
      node("cakap-ajuk-perintah", "Contoh Perintah", '"Tolong tutup pintu itu," kata ibu.'),
      node("cakap-ajuk-seruan", "Contoh Seruan", '"Wah, cantiknya bunga ini!" kata Siti.'),
    ]),
    branch("cakap-pindah", "Cakap Pindah", [
      node("cakap-pindah-maksud", "Maksud", "Percakapan dilaporkan semula tanpa tanda petik."),
      node(
        "cakap-pindah-ciri",
        "Ciri-ciri",
        "Tiada tanda petik • ayat disusun semula • kata hubung digunakan apabila sesuai • kata ganti nama disesuaikan • kata masa dan tempat mungkin berubah",
      ),
      node(
        "cakap-pindah-penyata",
        "Laporan Penyata",
        "Amir berkata bahawa mereka akan bertolak pada keesokan harinya.",
      ),
      node("cakap-pindah-tanya", "Laporan Pertanyaan", "Guru bertanya siapakah yang datang tadi."),
      node("cakap-pindah-perintah", "Laporan Perintah", "Ibu menyuruh anaknya menutup pintu itu."),
      node(
        "cakap-pindah-seruan",
        "Laporan Seruan",
        "Siti menyatakan rasa kagumnya terhadap kecantikan bunga tersebut.",
      ),
      node(
        "cakap-pindah-bahawa",
        "Penggunaan bahawa",
        "Bahawa sesuai untuk banyak ayat penyata, tetapi bukan setiap cakap pindah mesti menggunakannya. Jenis ayat dan struktur laporan menentukan kata hubung yang sesuai.",
      ),
    ]),
    branch("peraturan", "Peraturan Penukaran", [
      node("peraturan-penutur", "Langkah 1", "Kenal pasti penutur."),
      node("peraturan-pendengar", "Langkah 2", "Kenal pasti pendengar."),
      node(
        "peraturan-jenis",
        "Langkah 3",
        "Kenal pasti jenis ayat: penyata, tanya, perintah atau seruan.",
      ),
      node(
        "peraturan-pelaporan",
        "Langkah 4",
        "Pilih kata kerja pelaporan yang sepadan dengan tujuan penutur.",
      ),
      node(
        "peraturan-laras",
        "Langkah 5",
        "Laraskan kata ganti nama serta kata keterangan masa dan tempat jika konteks memerlukannya.",
      ),
      node(
        "peraturan-semak",
        "Langkah 6",
        "Semak semula seluruh ayat agar maksud asal dikekalkan.",
      ),
    ]),
    branch("kata-ganti-nama", "Kata Ganti Nama", [
      node(
        "kata-ganti-nama-prinsip",
        "Prinsip",
        "Kata ganti nama sering berubah mengikut penutur, pendengar dan orang yang melaporkan percakapan.",
      ),
      branch("kata-ganti-nama-ali", "Contoh 1", [
        node("kata-ganti-nama-ali-ajuk", "Cakap Ajuk", '"Saya akan datang esok," kata Ali.'),
        node(
          "kata-ganti-nama-ali-pindah",
          "Cakap Pindah",
          "Ali berkata bahawa dia akan datang pada keesokan harinya.",
        ),
      ]),
      branch("kata-ganti-nama-murid", "Contoh 2", [
        node("kata-ganti-nama-murid-ajuk", "Cakap Ajuk", '"Kami sudah siap," kata murid-murid.'),
        node(
          "kata-ganti-nama-murid-pindah",
          "Cakap Pindah",
          "Murid-murid mengatakan bahawa mereka sudah siap.",
        ),
      ]),
      node(
        "kata-ganti-nama-konteks",
        "Bergantung pada Pelapor",
        "Kata ganti nama yang tepat bergantung pada siapa yang melaporkan percakapan. Jangan menukar semua kata ganti nama secara mekanikal.",
      ),
    ]),
    branch("masa-tempat", "Kata Keterangan Masa dan Tempat", [
      node("masa-tempat-hari-ini", "hari ini", "hari tersebut"),
      node("masa-tempat-esok", "esok", "keesokan harinya"),
      node("masa-tempat-semalam", "semalam", "hari sebelumnya"),
      node("masa-tempat-di-sini", "di sini", "di situ"),
      node(
        "masa-tempat-konteks",
        "Perubahan Berkonteks",
        "Ungkapan masa atau tempat hanya diubah apabila sudut masa, tempat atau pelapor berubah. Jika konteks masih sama, ungkapan asal boleh dikekalkan.",
      ),
    ]),
    branch("kata-kerja-pelaporan", "Kata Kerja Pelaporan", [
      node(
        "kata-kerja-pelaporan-prinsip",
        "Pilih Mengikut Tujuan",
        "Kata kerja pelaporan mesti sepadan dengan niat dan jenis ayat penutur.",
      ),
      node(
        "kata-kerja-pelaporan-penyata",
        "Penyata atau Penerangan",
        "berkata • menjelaskan • memberitahu",
      ),
      node("kata-kerja-pelaporan-tanya", "Pertanyaan", "bertanya"),
      node("kata-kerja-pelaporan-arahan", "Permintaan atau Arahan", "meminta • menyuruh"),
      node(
        "kata-kerja-pelaporan-rayuan",
        "Rayuan, Nasihat atau Peringatan",
        "merayu • menasihati • mengingatkan",
      ),
      node("kata-kerja-pelaporan-tahniah", "Tahniah", "mengucapkan tahniah"),
      node(
        "kata-kerja-pelaporan-bukan-sama",
        "Tidak Boleh Ditukar Sesuka Hati",
        "Kata kerja pelaporan tidak semuanya boleh saling menggantikan kerana setiap kata membawa tujuan yang berbeza.",
      ),
    ]),
    branch("mengekalkan-maksud", "Mengekalkan Maksud", [
      node(
        "mengekalkan-maksud-unsur",
        "Unsur yang Dikekalkan",
        "Maklumat • tujuan • emosi • urutan peristiwa • makna tatabahasa",
      ),
      node(
        "mengekalkan-maksud-tafsiran",
        "Penukaran Bukan Tafsiran",
        "Tukarkan struktur dan kata yang perlu sahaja. Jangan menambah penjelasan, sebab atau pendapat yang tidak pernah diucapkan.",
      ),
      node(
        "mengekalkan-maksud-semak",
        "Semak Mesej",
        "Bandingkan cakap ajuk dengan cakap pindah: mesej, niat penutur dan maklumat penting mestilah sama.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-petik", "Tanda Petik dalam Cakap Pindah", [
        node(
          "kesalahan-petik-salah",
          "Salah",
          'Ali berkata bahawa "dia akan datang pada keesokan harinya."',
        ),
        node(
          "kesalahan-petik-betul",
          "Betul",
          "Ali berkata bahawa dia akan datang pada keesokan harinya. Tanda petik dibuang dalam cakap pindah.",
        ),
      ]),
      branch("kesalahan-maksud", "Maksud Berubah", [
        node("kesalahan-maksud-ajuk", "Cakap Ajuk", '"Saya mungkin hadir," kata Ali.'),
        node(
          "kesalahan-maksud-salah",
          "Salah",
          "Ali berkata bahawa dia pasti hadir. Kata mungkin tidak boleh ditukar menjadi pasti.",
        ),
        node("kesalahan-maksud-betul", "Betul", "Ali berkata bahawa dia mungkin hadir."),
      ]),
      branch("kesalahan-ganti-nama", "Kata Ganti Nama Salah", [
        node("kesalahan-ganti-nama-ajuk", "Cakap Ajuk", '"Saya sudah siap," kata Mira.'),
        node("kesalahan-ganti-nama-salah", "Salah", "Mira berkata bahawa saya sudah siap."),
        node("kesalahan-ganti-nama-betul", "Betul", "Mira berkata bahawa dia sudah siap."),
      ]),
      branch("kesalahan-masa", "Masa Diubah Secara Mekanikal", [
        node("kesalahan-masa-ajuk", "Cakap Ajuk", '"Saya akan pulang hari ini," kata Ali.'),
        node(
          "kesalahan-masa-panduan",
          "Pembetulan",
          "Jika laporan dibuat pada hari yang sama, hari ini boleh dikekalkan. Gunakan hari tersebut hanya apabila konteks masa telah berubah.",
        ),
      ]),
      branch("kesalahan-pelaporan", "Kata Kerja Pelaporan Salah", [
        node("kesalahan-pelaporan-ajuk", "Cakap Ajuk", '"Di manakah buku saya?" kata Lina.'),
        node("kesalahan-pelaporan-salah", "Salah", "Lina menyuruh seseorang mencari bukunya."),
        node("kesalahan-pelaporan-betul", "Betul", "Lina bertanya di manakah bukunya."),
      ]),
      branch("kesalahan-tambah", "Maklumat Ditambah", [
        node("kesalahan-tambah-ajuk", "Cakap Ajuk", '"Saya letih," kata Abu.'),
        node(
          "kesalahan-tambah-salah",
          "Salah",
          "Abu berkata bahawa dia letih kerana bekerja sepanjang malam.",
        ),
        node(
          "kesalahan-tambah-betul",
          "Betul",
          "Abu berkata bahawa dia letih. Sebab yang tidak disebut tidak boleh ditambah.",
        ),
      ]),
      branch("kesalahan-buang", "Maklumat Dibuang", [
        node("kesalahan-buang-ajuk", "Cakap Ajuk", '"Saya akan tiba di sini esok," kata Sara.'),
        node("kesalahan-buang-salah", "Salah", "Sara berkata bahawa dia akan tiba."),
        node(
          "kesalahan-buang-betul",
          "Betul",
          "Sara berkata bahawa dia akan tiba di situ pada keesokan harinya.",
        ),
      ]),
      branch("kesalahan-tanya", "Pertanyaan Menjadi Penyata", [
        node("kesalahan-tanya-ajuk", "Cakap Ajuk", '"Adakah kamu sudah makan?" tanya ibu.'),
        node("kesalahan-tanya-salah", "Salah", "Ibu berkata bahawa anaknya sudah makan."),
        node("kesalahan-tanya-betul", "Betul", "Ibu bertanya sama ada anaknya sudah makan."),
      ]),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("tip-uasa-penutur", "1. Penutur", "Kenal pasti siapa yang bercakap."),
      node("tip-uasa-pendengar", "2. Pendengar", "Kenal pasti orang yang mendengar."),
      node(
        "tip-uasa-jenis",
        "3. Jenis Ayat",
        "Tentukan sama ada ayat itu penyata, tanya, perintah atau seruan.",
      ),
      node(
        "tip-uasa-pelaporan",
        "4. Kata Kerja Pelaporan",
        "Pilih kata kerja pelaporan yang tepat mengikut tujuan.",
      ),
      node(
        "tip-uasa-ganti-nama",
        "5. Kata Ganti Nama",
        "Laraskan kata ganti nama mengikut penutur, pendengar dan pelapor.",
      ),
      node(
        "tip-uasa-masa-tempat",
        "6. Masa dan Tempat",
        "Laraskan ungkapan masa dan tempat hanya jika konteks memerlukannya.",
      ),
      node(
        "tip-uasa-baca-semula",
        "7. Baca Semula",
        "Baca seluruh ayat. Jika maksud berubah, jawapan itu salah.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node("ingat-ajuk", "Cakap Ajuk", "Petikan kata-kata asal."),
      node("ingat-pindah", "Cakap Pindah", "Laporan tanpa petikan."),
      node("ingat-petik", "Tanda Petik", "Digunakan untuk cakap ajuk, bukan cakap pindah."),
      node("ingat-maksud", "Maksud", "Mesti dikekalkan."),
      node(
        "ingat-larangan",
        "Jangan",
        "Jangan tambah maklumat • jangan buang maklumat • jangan ubah tujuan penutur",
      ),
      node(
        "ingat-kunci",
        "Kunci",
        "Kenal pasti jenis ayat, pilih kata kerja pelaporan, laraskan unsur mengikut konteks dan semak maksud.",
      ),
    ]),
  ],
};
