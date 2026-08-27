import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-oren";

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

function evidence(id: string, label: string, proof: string): MindNode {
  return branch(id, label, [node(`${id}-bukti`, "Bukti Peristiwa", proof)]);
}

export const bahasaMelayuTingkatan1OrenMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "OREN",
  summary:
    "Cerpen tentang kehilangan Oren, seekor kucing peliharaan yang menyebabkan Ayah menyedari perubahan layanan dan perhatiannya terhadap Oren selepas kehadiran Kelabu.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Oren ialah cerpen karya Saifullizan Yahaya dalam antologi Kuingin Berterima Kasih.",
      ),
      node(
        "sinopsis-hilang",
        "1. Oren Hilang",
        "Oren ialah kucing jantan peliharaan keluarga Aku. Oren tidak pulang selama beberapa hari dan kehilangannya menyebabkan Ayah semakin risau.",
      ),
      node(
        "sinopsis-dipelihara",
        "2. Bagaimana Oren Dipelihara",
        "Ayah pada asalnya tidak gemar memelihara kucing. Selepas keretanya secara tidak sengaja melanggar seekor ibu kucing sehingga mati, Ayah bersimpati terhadap anak kucing yang berada berdekatan lalu membawanya pulang. Anak kucing itu dinamakan Oren berdasarkan warna bulunya.",
      ),
      node(
        "sinopsis-keluarga",
        "3. Oren Menjadi Ahli Keluarga",
        "Oren dipelihara dan menjadi sebahagian daripada kehidupan keluarga Aku. Ahli keluarga menyayanginya.",
      ),
      node(
        "sinopsis-kelabu",
        "4. Kehadiran Kelabu",
        "Ayah kemudian membawa pulang seekor lagi kucing jantan bernama Kelabu. Kelabu lebih manja dan mudah mendapatkan perhatian, manakala Oren semakin banyak menyendiri serta mengalah.",
      ),
      node(
        "sinopsis-perhatian",
        "5. Perubahan Perhatian",
        "Selepas Kelabu hadir, sebahagian besar perhatian keluarga beralih kepadanya. Aku mengesyaki perubahan itu mungkin menyebabkan Oren berkecil hati atau membawa diri; hal ini ialah tafsiran pencerita, bukan fikiran Oren yang terbukti secara langsung.",
      ),
      node(
        "sinopsis-kehilangan",
        "6. Kehilangan Oren",
        "Oren tidak pulang. Ayah mencarinya, semakin bimbang dan mula memikirkan semula layanannya terhadap Oren.",
      ),
      node(
        "sinopsis-penyesalan",
        "7. Penyesalan Ayah",
        "Ayah berasa bersalah. Kegelisahannya begitu kuat sehingga Oren muncul dalam mimpi dan Ayah seolah-olah dapat bersama Oren semula.",
      ),
      node(
        "sinopsis-akhir",
        "8. Pengakhiran",
        "Pada keesokan harinya, keluarga masih membincangkan kehilangan Oren. Anis kemudian membawa berita bahawa Oren ditemukan mati berhampiran pokok tua yang tumbang di taman permainan. Kematian itu memberikan kesan emosi yang mendalam kepada keluarga, terutama Ayah.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "Kasih Sayang terhadap Haiwan Peliharaan", [
        node(
          "tema-huraian",
          "Huraian",
          "Cerpen menunjukkan hubungan kasih sayang manusia dengan haiwan peliharaan melalui hubungan Ayah dan keluarganya dengan Oren.",
        ),
        node(
          "tema-bukti",
          "Bukti Peristiwa",
          "Ayah mengambil Oren selepas kematian ibunya, keluarga membesarkannya sebagai sebahagian daripada kehidupan mereka, dan Ayah sangat bimbang serta bersedih apabila Oren hilang dan ditemukan mati.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema cerpen Oren ialah kasih sayang terhadap haiwan peliharaan. Hal ini dapat dilihat apabila Ayah sangat bimbang dan bersedih selepas Oren hilang.",
        ),
        node(
          "tema-amaran",
          "Bukan Tema",
          "“Kucing hilang” ialah peristiwa, bukan tema. Tema perlu mengungkapkan idea yang lebih luas.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-kasih",
        "Kasih Sayang terhadap Haiwan",
        "Oren dan Kelabu dipelihara serta menjadi sebahagian daripada kehidupan keluarga Aku.",
      ),
      evidence(
        "persoalan-tanggungjawab",
        "Tanggungjawab terhadap Haiwan Peliharaan",
        "Keluarga menjaga kucing yang telah dibawa masuk ke rumah dan mengambil berat apabila Oren hilang.",
      ),
      evidence(
        "persoalan-sesal",
        "Rasa Bersalah dan Penyesalan",
        "Ayah semakin menyesal apabila Oren tidak pulang dan memikirkan semula perubahan layanannya.",
      ),
      evidence(
        "persoalan-saingan",
        "Persaingan Mendapatkan Perhatian",
        "Kehadiran Kelabu yang lebih manja mengubah perhatian yang diterima oleh Oren.",
      ),
      evidence(
        "persoalan-prihatin",
        "Keprihatinan terhadap Haiwan",
        "Ayah membawa pulang Oren kerana bersimpati selepas kematian ibu kucing itu dalam kemalangan.",
      ),
      evidence(
        "persoalan-harmoni",
        "Keharmonian Keluarga",
        "Ahli keluarga berbincang dan berkongsi kebimbangan tentang kehilangan Oren.",
      ),
    ]),
    branch("watak", "Watak", [
      node(
        "watak-ayah",
        "Ayah",
        "Watak manusia utama yang membawa Oren pulang, memeliharanya, kemudian membawa Kelabu, serta berasa risau dan menyesal apabila Oren hilang dan ditemukan mati.",
      ),
      node(
        "watak-aku",
        "Aku",
        "Pencerita yang memerhatikan Ayah, Oren, Kelabu dan perubahan yang berlaku dalam keluarganya.",
      ),
      node(
        "watak-oren",
        "Oren",
        "Kucing jantan berbulu jingga yang dipelihara sejak kecil, semakin menyendiri selepas kehadiran Kelabu, kemudian hilang dan ditemukan mati.",
      ),
      node(
        "watak-kelabu",
        "Kelabu",
        "Kucing jantan berbulu kelabu yang dibawa pulang kemudian, lebih manja dan mudah mendapatkan perhatian keluarga.",
      ),
      node(
        "watak-anis",
        "Anis",
        "Anak bongsu dalam keluarga yang membawa berita penting tentang penemuan Oren pada akhir cerita.",
      ),
      node(
        "watak-ibu",
        "Ibu",
        "Ahli keluarga yang terlibat dalam peristiwa dan perbincangan keluarga berkaitan kucing-kucing mereka.",
      ),
    ]),
    branch("perwatakan", "Perwatakan", [
      evidence(
        "perwatakan-ayah-sayang",
        "Ayah — Penyayang",
        "Ayah menjaga Oren dan sangat bimbang apabila kucing itu tidak pulang.",
      ),
      evidence(
        "perwatakan-ayah-belas",
        "Ayah — Belas Kasihan",
        "Selepas kemalangan yang menyebabkan ibu Oren mati, Ayah membawa anak kucing itu pulang dan memeliharanya.",
      ),
      evidence(
        "perwatakan-ayah-tanggungjawab",
        "Ayah — Bertanggungjawab",
        "Ayah mencari Oren dan mengambil berat tentang kehilangannya.",
      ),
      evidence(
        "perwatakan-ayah-insaf",
        "Ayah — Mudah Menyesal dan Insaf",
        "Ayah memikirkan semula layanannya serta berasa bersalah selepas Oren hilang.",
      ),
      evidence(
        "perwatakan-oren-mengalah",
        "Oren — Tidak Agresif dan Suka Mengalah",
        "Oren tidak bersaing dengan kuat apabila Kelabu mendapatkan makanan dan perhatian.",
      ),
      evidence(
        "perwatakan-oren-pendiam",
        "Oren — Lebih Pendiam dan Menyendiri",
        "Selepas Kelabu menjadi sebahagian daripada keluarga, Oren diperhatikan lebih banyak mengasingkan diri.",
      ),
      evidence(
        "perwatakan-kelabu-manja",
        "Kelabu — Manja",
        "Kelabu mudah mendampingi ahli keluarga dan mendapatkan perhatian mereka.",
      ),
      node(
        "perwatakan-amaran",
        "Elakkan Antropomorfisme",
        "Jangan nyatakan “Oren cemburu” sebagai fakta terbukti. Nyatakan pemerhatian bahawa Oren semakin menyendiri selepas kehadiran Kelabu.",
      ),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Oren telah hilang selama beberapa hari dan Ayah semakin risau.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Imbas kembali menerangkan kemalangan yang mengorbankan ibu Oren, tindakan Ayah membawa Oren pulang, kehidupan Oren bersama keluarga dan kehadiran Kelabu.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Kelabu menerima semakin banyak perhatian, Oren semakin menyendiri dan akhirnya hilang. Ayah menjadi semakin bimbang serta bersalah.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Oren masih hilang, manakala keresahan dan rasa bersalah Ayah memuncak sehingga Oren hadir dalam mimpinya.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Anis memberitahu bahawa Oren ditemukan mati berhampiran pokok tua yang tumbang di taman permainan. Keluarga, terutama Ayah, sangat terkesan.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      branch("teknik-pemerian", "Pemerian", [
        node(
          "teknik-pemerian-maksud",
          "Maksud",
          "Pencerita menerangkan watak, keadaan atau peristiwa kepada pembaca.",
        ),
        node(
          "teknik-pemerian-bukti",
          "Contoh Peristiwa",
          "Pencerita memerikan kehilangan Oren, perubahan tingkah lakunya dan kegelisahan Ayah.",
        ),
      ]),
      branch("teknik-dialog", "Dialog", [
        node("teknik-dialog-maksud", "Maksud", "Percakapan antara watak yang menggerakkan cerita."),
        node(
          "teknik-dialog-bukti",
          "Contoh Peristiwa",
          "Perbualan ahli keluarga menyampaikan kebimbangan tentang Oren dan berita penemuannya tanpa perlu menyalin petikan asal.",
        ),
      ]),
      branch("teknik-monolog", "Monolog / Monolog Dalaman", [
        node(
          "teknik-monolog-maksud",
          "Maksud",
          "Fikiran dalaman watak digunakan untuk memperlihatkan perasaan dan reaksi.",
        ),
        node(
          "teknik-monolog-bukti",
          "Contoh Peristiwa",
          "Fikiran Ayah memperlihatkan kegelisahan, rasa bersalah dan penyesalannya tentang Oren.",
        ),
      ]),
      branch("teknik-imbas", "Imbas Kembali", [
        node(
          "teknik-imbas-maksud",
          "Maksud",
          "Penceritaan kembali peristiwa yang berlaku sebelum waktu semasa cerita.",
        ),
        node(
          "teknik-imbas-bukti",
          "Contoh Peristiwa",
          "Peristiwa lampau menerangkan bagaimana Oren dibawa pulang, kemalangan yang mengorbankan ibunya dan perubahan selepas Kelabu hadir.",
        ),
      ]),
    ]),
    branch("latar-masa", "Latar Masa", [
      evidence(
        "latar-masa-disember",
        "Bulan Disember",
        "Peristiwa sekitar kehilangan Oren berlaku dalam tempoh bulan Disember.",
      ),
      evidence(
        "latar-masa-pagi",
        "Waktu Pagi",
        "Interaksi dan perbincangan keluarga tentang Oren berlaku pada bahagian pagi cerita.",
      ),
      evidence(
        "latar-masa-petang",
        "Waktu Petang",
        "Imbas kembali berkaitan Ayah pulang dari tempat kerja dan peristiwa yang menemukan Oren berlaku pada waktu petang.",
      ),
      evidence(
        "latar-masa-malam",
        "Waktu Malam",
        "Perbincangan keluarga dan pengalaman emosi Ayah, termasuk mimpinya tentang Oren, berlaku pada bahagian malam cerita.",
      ),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      evidence(
        "latar-tempat-rumah",
        "Rumah Keluarga Aku",
        "Tempat utama ahli keluarga tinggal, memelihara Oren dan Kelabu serta membincangkan kehilangan Oren.",
      ),
      evidence(
        "latar-tempat-dapur",
        "Dapur / Ruang Makan",
        "Ahli keluarga berbual tentang Oren di ruang keluarga ini.",
      ),
      evidence(
        "latar-tempat-jalan",
        "Jalan Kawasan Perumahan",
        "Kawasan yang dikaitkan dengan kemalangan apabila kereta Ayah secara tidak sengaja melanggar ibu Oren.",
      ),
      evidence(
        "latar-tempat-longkang",
        "Longkang di Belakang Rumah",
        "Tempat yang dikaitkan dengan pemerhatian dan usaha mencari Oren.",
      ),
      evidence(
        "latar-tempat-taman",
        "Taman Permainan",
        "Oren ditemukan mati berhampiran pokok tua yang tumbang di kawasan ini.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      evidence(
        "latar-masyarakat-sayang",
        "Masyarakat yang Menyayangi Haiwan",
        "Keluarga Aku memelihara dan menyayangi Oren serta Kelabu.",
      ),
      evidence(
        "latar-masyarakat-prihatin",
        "Masyarakat yang Prihatin",
        "Ahli keluarga mengambil berat apabila Oren tidak pulang.",
      ),
      evidence(
        "latar-masyarakat-harmoni",
        "Masyarakat yang Hidup dalam Keluarga Harmoni",
        "Ahli keluarga berkomunikasi dan berkongsi kebimbangan tentang peristiwa dalam rumah tangga mereka.",
      ),
      evidence(
        "latar-masyarakat-tanggungjawab",
        "Masyarakat yang Bertanggungjawab terhadap Haiwan",
        "Keluarga menjaga haiwan yang telah dibawa masuk ke rumah mereka.",
      ),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-kasih",
        "Kasih Sayang",
        "Ayah dan keluarganya menyayangi haiwan peliharaan mereka serta sangat terkesan apabila Oren hilang.",
      ),
      evidence(
        "nilai-belas",
        "Belas Kasihan",
        "Ayah mengambil dan memelihara Oren selepas kematian ibu kucing itu.",
      ),
      evidence(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Keluarga menjaga haiwan yang telah mereka pelihara dan mencari Oren apabila ia hilang.",
      ),
      evidence(
        "nilai-prihatin",
        "Keprihatinan",
        "Ahli keluarga bimbang apabila Oren tidak pulang selama beberapa hari.",
      ),
      evidence(
        "nilai-insaf",
        "Keinsafan",
        "Ayah menyedari dan menyesali perubahan layanannya terhadap Oren.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      evidence(
        "pengajaran-sayang",
        "Kita Hendaklah Menyayangi Haiwan",
        "Ayah mengambil Oren yang kehilangan ibu dan memeliharanya sebagai sebahagian daripada keluarga.",
      ),
      evidence(
        "pengajaran-tanggungjawab",
        "Kita Hendaklah Bertanggungjawab terhadap Haiwan Peliharaan",
        "Haiwan yang telah dibawa ke rumah memerlukan penjagaan dan perhatian yang konsisten.",
      ),
      evidence(
        "pengajaran-prihatin",
        "Kita Hendaklah Bersikap Prihatin",
        "Keluarga mengambil berat apabila Oren hilang, tetapi perubahan tingkah lakunya wajar disedari lebih awal.",
      ),
      evidence(
        "pengajaran-adil",
        "Kita Hendaklah Berlaku Adil",
        "Kehadiran haiwan baharu tidak sepatutnya menyebabkan haiwan yang sedia dipelihara kurang mendapat perhatian.",
      ),
      evidence(
        "pengajaran-insaf",
        "Kita Hendaklah Menginsafi Kesalahan",
        "Ayah memikirkan semula layanannya dan menyesal selepas kehilangan Oren.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      node(
        "peristiwa-1",
        "1. Kemalangan",
        "Kereta Ayah secara tidak sengaja melanggar ibu Oren sehingga mati.",
      ),
      node(
        "peristiwa-2",
        "2. Oren Dibawa Pulang",
        "Ayah bersimpati lalu membawa anak kucing itu pulang.",
      ),
      node(
        "peristiwa-3",
        "3. Dinamakan Oren",
        "Anak kucing itu dinamakan Oren berdasarkan warna bulunya.",
      ),
      node(
        "peristiwa-4",
        "4. Menjadi Ahli Keluarga",
        "Oren dipelihara dan disayangi oleh keluarga Aku.",
      ),
      node(
        "peristiwa-5",
        "5. Kelabu Datang",
        "Ayah kemudian membawa seekor kucing jantan bernama Kelabu.",
      ),
      node(
        "peristiwa-6",
        "6. Perhatian kepada Kelabu",
        "Kelabu yang lebih manja menerima banyak perhatian keluarga.",
      ),
      node(
        "peristiwa-7",
        "7. Oren Menyendiri",
        "Oren diperhatikan semakin menyendiri dan mengalah.",
      ),
      node("peristiwa-8", "8. Oren Hilang", "Oren tidak pulang ke rumah selama beberapa hari."),
      node("peristiwa-9", "9. Ayah Mencari", "Ayah mencari Oren dan semakin bimbang."),
      node(
        "peristiwa-10",
        "10. Rasa Bersalah",
        "Ayah memikirkan semula layanannya dan berasa semakin bersalah.",
      ),
      node(
        "peristiwa-11",
        "11. Mimpi Ayah",
        "Kegelisahan Ayah menyebabkan Oren muncul dalam mimpinya.",
      ),
      node(
        "peristiwa-12",
        "12. Berita daripada Anis",
        "Anis membawa berita bahawa Oren telah ditemukan.",
      ),
      node(
        "peristiwa-13",
        "13. Oren Ditemukan Mati",
        "Oren ditemukan mati berhampiran pokok tua yang tumbang di taman permainan.",
      ),
      node(
        "peristiwa-14",
        "14. Ayah Sangat Terkesan",
        "Kehilangan Oren memberikan kesan emosi yang mendalam kepada Ayah.",
      ),
    ]),
    branch("bukti-komsas", "Bukti KOMSAS", [
      branch("bukti-perwatakan", "Perwatakan — Dakwaan + Peristiwa", [
        node("bukti-perwatakan-dakwaan", "Dakwaan", "Ayah seorang yang penyayang."),
        node(
          "bukti-perwatakan-peristiwa",
          "Bukti",
          "Ayah sangat risau apabila Oren tidak pulang dan berusaha mencarinya.",
        ),
      ]),
      branch("bukti-nilai", "Nilai — Dakwaan + Peristiwa", [
        node("bukti-nilai-dakwaan", "Dakwaan", "Nilai kasih sayang."),
        node(
          "bukti-nilai-peristiwa",
          "Bukti",
          "Kehilangan Oren menyebabkan Ayah dan keluarganya berasa bimbang.",
        ),
      ]),
      branch("bukti-persoalan", "Persoalan — Dakwaan + Peristiwa", [
        node("bukti-persoalan-dakwaan", "Dakwaan", "Keprihatinan terhadap haiwan peliharaan."),
        node(
          "bukti-persoalan-peristiwa",
          "Bukti",
          "Ahli keluarga mengambil berat apabila Oren tidak pulang ke rumah.",
        ),
      ]),
      node(
        "bukti-ringkas",
        "Gunakan Bukti Ringkas",
        "Pilih satu peristiwa yang tepat. Jangan salin petikan panjang atau ceritakan semula keseluruhan cerpen.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-tema", "Tema", "Tulis TEMA + BUKTI."),
      node("jawab-persoalan", "Persoalan", "Tulis PERSOALAN + PERISTIWA."),
      node("jawab-perwatakan", "Perwatakan", "Tulis WATAK + SIFAT + BUKTI."),
      node("jawab-nilai", "Nilai", "Tulis NILAI + BUKTI."),
      node("jawab-pengajaran", "Pengajaran", "Tulis KITA HENDAKLAH... + KONTEKS yang sesuai."),
      node("jawab-latar", "Latar", "Tulis JENIS LATAR + LATAR + PERISTIWA."),
      node(
        "jawab-teknik",
        "Teknik Plot",
        "Tulis TEKNIK + PERISTIWA yang menunjukkan teknik tersebut.",
      ),
      branch("jawab-kbb", "K-B-B", [
        node("jawab-kbb-k", "K — Kenal Pasti Konsep"),
        node("jawab-kbb-bukti", "B — Bukti"),
        node("jawab-kbb-bina", "B — Bina Jawapan"),
      ]),
      branch("ingatan-enam", "OREN DALAM 6 LANGKAH", [
        node("ingatan-selamat", "1. DISELAMATKAN"),
        node("ingatan-sayang", "2. DISAYANGI"),
        node("ingatan-kelabu", "3. KELABU DATANG"),
        node("ingatan-ubah", "4. PERHATIAN BERUBAH"),
        node("ingatan-hilang", "5. OREN HILANG"),
        node("ingatan-sesal", "6. PENYESALAN"),
      ]),
      node("ingatan-ayah", "AYAH", "BELAS KASIHAN + PENYAYANG + PRIHATIN + MENYESAL"),
      node(
        "ingatan-mesej",
        "MESEJ UTAMA",
        "HAIWAN PELIHARAAN = TANGGUNGJAWAB + PERHATIAN + KASIH SAYANG",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node("kesalahan-manusia", "Oren Dianggap Manusia", "Salah. Oren ialah seekor kucing."),
      node(
        "kesalahan-tertukar",
        "Oren dan Kelabu Tertukar",
        "OREN ialah kucing berbulu jingga; KELABU ialah kucing berbulu kelabu.",
      ),
      node(
        "kesalahan-sengaja",
        "Ayah Sengaja Membunuh Ibu Oren",
        "Salah. Kematian ibu Oren berlaku secara tidak sengaja apabila kereta Ayah melanggarnya.",
      ),
      node(
        "kesalahan-tema",
        "Tema = Kehilangan Kucing",
        "Terlalu sempit. Gunakan idea kasih sayang dan perhatian terhadap haiwan peliharaan.",
      ),
      node(
        "kesalahan-cemburu",
        "Oren “Pasti Cemburu”",
        "Jangan dakwa fikiran Oren sebagai fakta. Lebih tepat: Oren semakin menyendiri selepas Kelabu hadir.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai Tanpa Bukti",
        "Nilai sahaja belum mencukupi apabila soalan meminta sokongan peristiwa.",
      ),
      node(
        "kesalahan-perwatakan",
        "Perwatakan Tanpa Peristiwa",
        "Sifat watak perlu disokong oleh peristiwa yang tepat.",
      ),
      node(
        "kesalahan-cerita",
        "Cerita Semula",
        "Jangan ceritakan seluruh cerpen untuk soalan yang hanya memerlukan satu isi.",
      ),
      node(
        "kesalahan-akhir",
        "Pengakhiran Salah",
        "Jangan nyatakan Oren pulang hidup-hidup. Oren ditemukan mati.",
      ),
      node(
        "kesalahan-reka",
        "Fakta Direka",
        "Jangan tambah peristiwa, watak atau petikan yang tiada dalam cerpen yang ditetapkan.",
      ),
    ]),
  ],
};
