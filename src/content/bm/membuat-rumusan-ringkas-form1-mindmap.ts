import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-membuat-rumusan-ringkas";

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

export const bahasaMelayuTingkatan1MembuatRumusanRingkasMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "RUMUSAN RINGKAS",
  summary:
    "Rumusan ialah ringkasan yang menggabungkan isi penting daripada petikan menggunakan bahasa sendiri tanpa mengubah maksud asal.",
  children: [
    branch("apa-itu", "Apa Itu Rumusan?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Rumusan ialah penulisan ringkas yang menyampaikan isi penting daripada sesuatu petikan.",
      ),
      node(
        "apa-itu-faham",
        "Memahami Petikan",
        "Baca keseluruhan petikan untuk memahami tajuk, tujuan dan hubungan antara idea.",
      ),
      node(
        "apa-itu-pilih",
        "Memilih Isi Penting",
        "Bezakan idea utama daripada contoh, huraian dan maklumat sampingan.",
      ),
      node(
        "apa-itu-susun",
        "Menyusun Isi",
        "Atur isi penting supaya urutannya jelas dan mudah diikuti.",
      ),
      node(
        "apa-itu-bahasa",
        "Menggunakan Bahasa Sendiri",
        "Tulis semula idea dengan perkataan dan struktur ayat yang sesuai.",
      ),
      node(
        "apa-itu-bukan",
        "Bukan Sekadar Memendekkan Ayat",
        "Rumusan memerlukan pemilihan dan penggabungan isi penting, bukan hanya membuang beberapa perkataan daripada ayat asal.",
      ),
    ]),
    branch("isi-utama", "Isi Utama", [
      node(
        "isi-utama-definisi",
        "Definisi",
        "Isi utama ialah idea paling penting dalam setiap perenggan.",
      ),
      node(
        "isi-utama-idea",
        "Idea Utama",
        "Tanya perkara paling penting yang hendak disampaikan oleh perenggan.",
      ),
      node(
        "isi-utama-tajuk",
        "Tajuk Kecil",
        "Tajuk kecil boleh menunjukkan fokus atau perkara utama sesuatu bahagian.",
      ),
      node(
        "isi-utama-ayat-topik",
        "Ayat Topik",
        "Ayat topik lazimnya menyatakan gagasan utama dan boleh berada pada awal, tengah atau akhir perenggan.",
      ),
      node(
        "isi-utama-pengulangan",
        "Pengulangan Idea",
        "Idea atau kata kunci yang diulang mungkin menunjukkan perkara yang ditekankan.",
      ),
      node(
        "isi-utama-uji",
        "Uji Kepentingan",
        "Jika idea itu dibuang dan maksud utama perenggan hilang, idea tersebut mungkin isi utama.",
      ),
    ]),
    branch("isi-sokongan", "Isi Sokongan", [
      node(
        "isi-sokongan-definisi",
        "Definisi",
        "Isi sokongan membantu menerangkan, mengembangkan atau membuktikan isi utama.",
      ),
      node(
        "isi-sokongan-pilih",
        "Pilih yang Benar-benar Penting",
        "Masukkan isi sokongan hanya jika maklumat itu diperlukan untuk menjelaskan idea utama.",
      ),
      node(
        "isi-sokongan-abaikan",
        "Abaikan Contoh yang Tidak Diperlukan",
        "Nama, angka, senarai panjang atau contoh terperinci boleh ditinggalkan jika tidak mengubah maksud utama.",
      ),
      node(
        "isi-sokongan-hubungan",
        "Semak Hubungan",
        "Pastikan isi sokongan mempunyai kaitan langsung dengan isi utama.",
      ),
      branch("isi-sokongan-contoh", "Contoh", [
        node("isi-sokongan-utama", "Isi Utama", "Bersenam meningkatkan kesihatan."),
        node(
          "isi-sokongan-huraian",
          "Isi Sokongan Penting",
          "Aktiviti fizikal menguatkan tubuh dan meningkatkan kecergasan.",
        ),
        node(
          "isi-sokongan-sampingan",
          "Maklumat Sampingan",
          "Senarai semua jenis sukan tidak semestinya diperlukan dalam rumusan.",
        ),
      ]),
    ]),
    branch("bahasa-sendiri", "Bahasa Sendiri", [
      node(
        "bahasa-jangan-salin",
        "Jangan Salin Seluruh Ayat",
        "Fahami idea dahulu sebelum menulisnya semula.",
      ),
      node(
        "bahasa-susunan",
        "Tukar Susunan Ayat",
        "Susun semula subjek, predikat atau keterangan tanpa menjejaskan maksud.",
      ),
      node(
        "bahasa-perkataan",
        "Gunakan Perkataan Lain",
        "Pilih kata atau frasa yang seerti dan sesuai dengan konteks.",
      ),
      node(
        "bahasa-maksud",
        "Kekalkan Maksud Asal",
        "Jangan menambah, mengurangkan atau memesongkan fakta penting.",
      ),
      branch("bahasa-contoh", "Contoh", [
        node("bahasa-asal", "Ayat Asal", "Amalan membaca dapat memperluas pengetahuan seseorang."),
        node(
          "bahasa-semula",
          "Ayat Semula",
          "Seseorang dapat menambah ilmu melalui amalan membaca.",
        ),
        node(
          "bahasa-semak",
          "Semakan",
          "Struktur dan perkataan berubah, tetapi maksud asal kekal.",
        ),
      ]),
    ]),
    branch("susunan", "Susunan Rumusan", [
      node(
        "susunan-pendahuluan",
        "Pendahuluan",
        "Perkenalkan perkara atau fokus yang dibincangkan oleh petikan.",
      ),
      node(
        "susunan-isi",
        "Isi Penting",
        "Gabungkan isi utama dan isi sokongan terpilih dalam urutan yang munasabah.",
      ),
      node(
        "susunan-penutup",
        "Penutup",
        "Akhiri rumusan dengan kesimpulan yang sesuai dengan keseluruhan isi.",
      ),
      node(
        "susunan-aliran",
        "Aliran Logik",
        "Gunakan penanda wacana dan hubungan idea yang jelas supaya ayat tidak terputus-putus.",
      ),
      node(
        "susunan-urutan",
        "Urutan Sesuai",
        "Ikut urutan petikan atau susun mengikut sebab, langkah, manfaat atau kesan apabila lebih jelas.",
      ),
    ]),
    branch("ayat-pembuka", "Ayat Pembuka", [
      node(
        "pembuka-bincang",
        "Petikan Membincangkan...",
        "Sesuai untuk petikan yang mengemukakan suatu isu, amalan atau perkara umum.",
      ),
      node(
        "pembuka-terang",
        "Petikan Menerangkan...",
        "Sesuai apabila petikan menjelaskan fakta, proses, sebab atau cara.",
      ),
      node(
        "pembuka-hurai",
        "Petikan Menghuraikan...",
        "Sesuai apabila petikan memberikan penerangan terperinci tentang beberapa isi.",
      ),
      node(
        "pembuka-fokus",
        "Nyatakan Fokus",
        "Lengkapkan ayat pembuka dengan topik sebenar petikan, bukan frasa yang terlalu umum.",
      ),
      branch("pembuka-contoh", "Contoh Lengkap", [
        node(
          "pembuka-contoh-ayat",
          "Ayat",
          "Petikan membincangkan faedah amalan membaca dalam kehidupan murid.",
        ),
        node(
          "pembuka-contoh-sebab",
          "Mengapa Sesuai?",
          "Ayat ini memperkenalkan topik dan skop petikan secara terus.",
        ),
      ]),
    ]),
    branch("ayat-penutup", "Ayat Penutup", [
      node(
        "penutup-kesimpulan",
        "Kesimpulannya...",
        "Sesuai untuk merumuskan keseluruhan isi secara jelas.",
      ),
      node(
        "penutup-oleh-itu",
        "Oleh Itu...",
        "Sesuai apabila penutup menyatakan hasil, tindakan atau kepentingan berdasarkan isi sebelumnya.",
      ),
      node(
        "penutup-keseluruhan",
        "Secara Keseluruhannya...",
        "Sesuai untuk memberikan gambaran akhir tentang semua isi yang dirumuskan.",
      ),
      node(
        "penutup-semula-jadi",
        "Kesimpulan Semula Jadi",
        "Penutup mesti berkaitan dengan isi petikan dan tidak memperkenalkan fakta baharu.",
      ),
      node(
        "penutup-peribahasa",
        "Jangan Paksa Peribahasa",
        "Gunakan peribahasa hanya jika benar-benar sesuai; penutup yang jelas lebih penting.",
      ),
    ]),
    branch("contoh-rumusan", "Contoh Rumusan", [
      node(
        "contoh-petikan",
        "Petikan Asal",
        "Membaca dapat menambah pengetahuan murid. Amalan ini juga memperkaya kosa kata dan membantu murid memahami pelajaran. Oleh sebab itu, sekolah menyediakan sudut bacaan yang selesa untuk menggalakkan murid membaca.",
      ),
      branch("contoh-isi", "Isi Penting", [
        node("contoh-isi-satu", "Isi 1", "Membaca menambah pengetahuan."),
        node(
          "contoh-isi-dua",
          "Isi 2",
          "Membaca memperkaya kosa kata dan membantu pemahaman pelajaran.",
        ),
        node(
          "contoh-isi-tiga",
          "Isi 3",
          "Sekolah menyediakan sudut bacaan untuk menggalakkan amalan membaca.",
        ),
      ]),
      node(
        "contoh-akhir",
        "Rumusan Akhir",
        "Petikan membincangkan faedah membaca kepada murid. Amalan ini menambah ilmu, memperkaya kosa kata dan membantu murid memahami pelajaran. Sekolah turut menyediakan sudut bacaan bagi menggalakkan amalan tersebut. Kesimpulannya, membaca penting dalam pembelajaran murid.",
      ),
      branch("contoh-berkesan", "Mengapa Berkesan?", [
        node("contoh-berkesan-isi", "Isi Lengkap", "Semua isi utama disampaikan."),
        node(
          "contoh-berkesan-padat",
          "Jelas dan Padat",
          "Contoh terperinci yang tidak perlu telah diketepikan.",
        ),
        node(
          "contoh-berkesan-bahasa",
          "Bahasa Sendiri",
          "Idea ditulis semula tanpa mengubah maksud asal.",
        ),
        node(
          "contoh-berkesan-susun",
          "Susunan Logik",
          "Pendahuluan, isi dan penutup mengalir dengan baik.",
        ),
      ]),
    ]),
    branch("semak", "Semak Rumusan", [
      node("semak-isi", "Semua Isi Penting", "Pastikan tiada isi utama yang tertinggal."),
      node(
        "semak-bahasa",
        "Bahasa Sendiri",
        "Pastikan rumusan bukan salinan bulat-bulat daripada petikan.",
      ),
      node(
        "semak-maksud",
        "Maksud Tidak Berubah",
        "Bandingkan rumusan dengan petikan untuk memastikan fakta kekal tepat.",
      ),
      node("semak-gramatis", "Ayat Gramatis", "Semak struktur ayat, ejaan dan tanda baca."),
      node("semak-susunan", "Susunan Jelas", "Pastikan idea berurutan dan saling berkaitan."),
      node(
        "semak-baca",
        "Baca Semula",
        "Baca rumusan sebagai satu teks lengkap untuk mengesan ayat yang janggal.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-salin",
        "Salin Bulat-bulat",
        "Murid menyalin ayat asal tanpa mengolah bahasa.",
      ),
      node(
        "kesalahan-panjang",
        "Terlalu Panjang",
        "Rumusan dipenuhi contoh, huraian sampingan atau pengulangan.",
      ),
      node(
        "kesalahan-pendek",
        "Terlalu Pendek",
        "Isi penting hilang sehingga rumusan tidak menyampaikan keseluruhan mesej.",
      ),
      node(
        "kesalahan-isi",
        "Tertinggal Isi Utama",
        "Salah satu gagasan utama petikan tidak dimasukkan.",
      ),
      node(
        "kesalahan-pendapat",
        "Pendapat Sendiri",
        "Rumusan mesti berasaskan petikan, bukan pandangan atau pengalaman baharu.",
      ),
      node(
        "kesalahan-fakta",
        "Mengubah Fakta",
        "Jangan menukar pelaku, tindakan, sebab, kesan, masa atau tempat.",
      ),
      node(
        "kesalahan-gramatis",
        "Bahasa Tidak Gramatis",
        "Ayat yang tidak lengkap atau tidak tersusun menyukarkan pemahaman.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-ringkas", "Rumus RINGKAS", [
        node("teknik-r", "R — Read Petikan", "Baca keseluruhan petikan hingga faham."),
        node("teknik-i", "I — Identify Isi Utama", "Kenal pasti idea utama setiap perenggan."),
        node("teknik-n", "N — Note Isi Penting", "Catat isi yang perlu dimasukkan."),
        node("teknik-g", "G — Gabungkan Idea", "Hubungkan isi yang berkaitan secara logik."),
        node("teknik-k", "K — Karang Semula", "Tulis isi menggunakan bahasa sendiri."),
        node("teknik-a", "A — Ayat Gramatis", "Bina ayat yang lengkap dan jelas."),
        node("teknik-s", "S — Semak Jawapan", "Semak isi, maksud, bahasa dan susunan."),
      ]),
      node(
        "teknik-aliran",
        "Aliran Kerja",
        "Baca, kenal pasti, catat, gabungkan, karang dan semak secara berurutan.",
      ),
      node(
        "teknik-tanda",
        "Tandakan Kata Kunci",
        "Tanda kata atau idea yang diulang supaya isi utama lebih mudah dikenal pasti.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-baca", "Baca Seluruh Petikan", "Fahami gambaran keseluruhan sebelum memilih isi."),
      node(
        "uasa-utama",
        "Pilih Isi Utama Dahulu",
        "Utamakan gagasan penting sebelum mempertimbangkan isi sokongan.",
      ),
      node(
        "uasa-bahasa",
        "Gunakan Bahasa Sendiri",
        "Olah ayat dengan kata dan struktur yang sesuai.",
      ),
      node("uasa-fakta", "Jangan Ubah Fakta", "Kekalkan maksud, hubungan idea dan maklumat asal."),
      node(
        "uasa-semak",
        "Semak Sebelum Selesai",
        "Pastikan isi lengkap, bahasa gramatis dan susunan jelas.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Soalan",
        "Jangan bergantung pada jumlah perkataan tetap, markah tetap atau janji skor. Ikuti arahan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
