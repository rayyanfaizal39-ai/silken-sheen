import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-strategi-menjawab-soalan-pemahaman-lanjutan";

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

export const bahasaMelayuTingkatan2StrategiPemahamanLanjutanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "STRATEGI PEMAHAMAN T2",
  summary:
    "Pemahaman Tingkatan 2 memerlukan murid menganalisis petikan dengan lebih mendalam, menghubungkan idea serta memberikan jawapan yang disokong oleh bukti yang tepat.",
  children: [
    branch("analisis-soalan", "Analisis Soalan", [
      node(
        "analisis-kata-tugas",
        "Tentukan Kata Tugas",
        "Bezakan kehendak nyatakan, jelaskan, huraikan, bandingkan, buktikan dan wajarkah. Kata tugas menentukan sama ada jawapan memerlukan fakta, penerangan, perbandingan atau pertimbangan.",
      ),
      node(
        "analisis-fokus",
        "Hadkan Fokus",
        "Kenal pasti isu, pihak, masa dan aspek yang diminta. Soalan tentang kesan teknologi terhadap pembelajaran tidak meminta semua kebaikan teknologi dalam kehidupan.",
      ),
      node(
        "analisis-sumber",
        "Tentukan Sumber Jawapan",
        "Bezakan maklumat yang perlu diperoleh daripada petikan dengan pendapat yang perlu dibina sendiri. Jawapan pendapat masih perlu selaras dengan situasi bahan.",
      ),
      node(
        "analisis-pelbagai-kehendak",
        "Pecahkan Pelbagai Kehendak",
        "Jika soalan meminta sebab dan kesan, tandakan kedua-duanya. Rancang jawapan supaya setiap kehendak dijawab dan tidak tertinggal.",
      ),
    ]),
    branch("kata-kunci", "Kenal Pasti Kata Kunci", [
      node(
        "kata-kunci-utama",
        "Kata Kunci Utama",
        "Gariskan kata tugas, fokus isi dan pihak yang terlibat. Contoh: ‘Jelaskan dua kesan pencemaran sungai terhadap komuniti setempat’ menuntut kesan, bukan punca atau langkah.",
      ),
      node(
        "kata-kunci-sinonim",
        "Jejak Sinonim",
        "Petikan mungkin menggunakan perkataan yang berbeza tetapi membawa maksud yang sama. ‘Memelihara alam’ boleh dipadankan dengan ‘mengekalkan kelestarian alam sekitar’.",
      ),
      node(
        "kata-kunci-rujukan",
        "Rujukan Kata Ganti Nama",
        "Teliti rujukan seperti beliau, mereka, tindakan tersebut dan keadaan ini supaya pelaku, tindakan serta akibat tidak tertukar.",
      ),
      node(
        "kata-kunci-konteks",
        "Makna Mengikut Konteks",
        "Tentukan maksud kata atau frasa berdasarkan ayat sebelum dan selepasnya, bukan berdasarkan satu makna kamus sahaja.",
      ),
    ]),
    branch("analisis-petikan", "Analisis Petikan", [
      node(
        "petikan-gambaran",
        "Bina Gambaran Keseluruhan",
        "Kenal pasti tema, tujuan penulis, nada dan idea utama sebelum meneliti butiran. Gambaran ini membantu murid menolak jawapan yang kelihatan berkaitan tetapi menyimpang daripada fokus.",
      ),
      node(
        "petikan-perenggan",
        "Fungsi Setiap Perenggan",
        "Catat fungsi ringkas seperti isu, punca, contoh, kesan atau langkah. Petakan perkembangan idea merentas lebih daripada satu perenggan.",
      ),
      node(
        "petikan-pendidikan",
        "Contoh Pendidikan Dua Perenggan",
        "Perenggan 1 menerangkan murid sukar mengakses bahan rujukan. Perenggan 2 menjelaskan sekolah membuka pusat sumber selepas waktu persekolahan. Inferensnya, kemudahan itu diperluas untuk mengatasi kekangan akses pembelajaran.",
      ),
      node(
        "petikan-maklumat",
        "Asingkan Maklumat",
        "Bezakan fakta utama, huraian, contoh dan pendapat penulis. Contoh tidak semestinya menjadi isi baharu jika hanya menerangkan fakta sebelumnya.",
      ),
    ]),
    branch("hubungan-idea", "Hubungan Idea", [
      node(
        "hubungan-sebab-akibat",
        "Sebab dan Akibat",
        "Hubungkan tindakan dengan kesannya menggunakan petunjuk seperti kerana, menyebabkan, akibatnya dan oleh itu. Pastikan arah hubungan tidak diterbalikkan.",
      ),
      node(
        "hubungan-perbandingan",
        "Perbandingan dan Pertentangan",
        "Kesan persamaan atau perbezaan melalui penanda wacana seperti sebaliknya, namun dan manakala. Hubungan ini sering menjelaskan perubahan sikap atau keadaan.",
      ),
      node(
        "hubungan-alam",
        "Contoh Alam Sekitar Dua Perenggan",
        "Perenggan 1 menunjukkan penduduk mengasingkan sisa. Perenggan 2 melaporkan longkang semakin bersih dan banjir kilat berkurang. Gabungan idea membuktikan amalan pengurusan sisa membantu mengurangkan masalah saliran.",
      ),
      node(
        "hubungan-rentas",
        "Sintesis Rentas Perenggan",
        "Satukan dua atau lebih maklumat yang saling melengkapi. Jangan menganggap jawapan mesti ditemukan dalam satu ayat yang sama dengan kata kunci soalan.",
      ),
    ]),
    branch("bukti", "Gunakan Bukti", [
      node(
        "bukti-pilih",
        "Pilih Bukti Tepat",
        "Ambil frasa, tindakan atau fakta yang terus menyokong isi. Bukti yang panjang tetapi tidak menjawab fokus tidak menguatkan jawapan.",
      ),
      node(
        "bukti-gabung",
        "Gabungkan Bukti",
        "Bagi inferens yang kompleks, gabungkan petunjuk daripada dua perenggan dan jelaskan bagaimana kedua-duanya membawa kepada kesimpulan.",
      ),
      node(
        "bukti-kesihatan",
        "Contoh Kesihatan",
        "Isi: Program itu meningkatkan kesedaran kesihatan. Bukti: peserta mula membaca label pemakanan dan memilih makanan kurang gula. Huraian: perubahan pilihan menunjukkan pengetahuan telah mempengaruhi amalan harian.",
      ),
      node(
        "bukti-olah",
        "Olah Tanpa Mengubah Fakta",
        "Gunakan bahasa sendiri apabila sesuai tetapi kekalkan pihak, urutan, sebab dan hasil asal. Jangan menambah angka, lokasi atau tindakan yang tiada dalam petikan.",
      ),
    ]),
    branch("kbat", "Jawapan KBAT", [
      node(
        "kbat-rangka",
        "Rangka Idea–Alasan–Bukti–Kesan",
        "Nyatakan pendirian atau cadangan, jelaskan alasan, kaitkan dengan bahan dan terangkan kesan yang munasabah. Setiap bahagian perlu mempunyai hubungan logik.",
      ),
      node(
        "kbat-teknologi",
        "Contoh Teknologi",
        "Cadangan: sekolah perlu mengajar literasi digital. Alasan: murid berhadapan dengan pelbagai sumber dalam talian. Bukti situasi: petikan menunjukkan maklumat palsu mudah dikongsi. Kesannya, murid dapat menilai kesahihan sumber sebelum menyebarkannya.",
      ),
      node(
        "kbat-komuniti",
        "Contoh Komuniti Dua Perenggan",
        "Perenggan 1 menunjukkan warga emas tinggal bersendirian. Perenggan 2 menerangkan belia mempunyai kemahiran menggunakan aplikasi. Cadangan munasabah ialah program bimbingan digital antara generasi kerana bantuan belia dapat memudahkan urusan harian warga emas sambil mengeratkan hubungan komuniti.",
      ),
      node(
        "kbat-imbang",
        "Pertimbangan Seimbang",
        "Bagi soalan kewajaran, pertimbangkan manfaat, risiko dan syarat pelaksanaan sebelum membuat kesimpulan. Elakkan pendapat mutlak tanpa alasan.",
      ),
    ]),
    branch("masa", "Pengurusan Masa", [
      node(
        "masa-tinjau",
        "Tinjau Bahan dan Soalan",
        "Lihat panjang petikan, bilangan perenggan dan jenis soalan supaya usaha dapat diagihkan mengikut kerumitan.",
      ),
      node(
        "masa-utama",
        "Dahulukan Jawapan Pasti",
        "Jawab maklumat tersurat yang jelas dahulu, kemudian kembali kepada inferens atau KBAT yang memerlukan gabungan idea.",
      ),
      node(
        "masa-tanda",
        "Tandakan Soalan Sukar",
        "Catat kata kunci atau bukti awal sebelum bergerak ke soalan lain. Langkah ini mengurangkan masa mencari semula maklumat.",
      ),
      node(
        "masa-semak",
        "Sediakan Masa Semakan",
        "Jangan menggunakan seluruh masa untuk menulis. Tinggalkan ruang untuk menyemak kehendak, bukti dan bahasa.",
      ),
    ]),
    branch("semakan", "Semakan Akhir", [
      node(
        "semakan-kehendak",
        "Kehendak Lengkap",
        "Padankan semula setiap bahagian soalan dengan ayat jawapan. Pastikan bilangan dan jenis isi menepati arahan.",
      ),
      node(
        "semakan-logik",
        "Hubungan Logik",
        "Semak sama ada bukti benar-benar menyokong inferens dan penanda wacana menunjukkan hubungan sebab, kesan atau pertentangan dengan tepat.",
      ),
      node(
        "semakan-fakta",
        "Ketepatan Fakta",
        "Periksa nama pihak, tindakan, urutan peristiwa serta kata nafi agar olahan tidak mengubah maksud petikan.",
      ),
      node(
        "semakan-bahasa",
        "Bahasa Gramatis",
        "Betulkan struktur ayat, imbuhan, ejaan, tanda baca dan rujukan kata ganti nama supaya jawapan jelas serta tidak menimbulkan tafsiran lain.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-satu-ayat",
        "Terikat pada Satu Ayat",
        "Murid mengambil satu ayat yang seiras dengan soalan tetapi mengabaikan maklumat pelengkap dalam perenggan lain.",
      ),
      node(
        "kesalahan-inferens",
        "Inferens Tanpa Petunjuk",
        "Kesimpulan yang mungkin benar secara umum tetap lemah jika tidak dapat disokong oleh petunjuk dalam bahan.",
      ),
      node(
        "kesalahan-campur",
        "Mencampurkan Isi dan Contoh",
        "Contoh yang menghuraikan satu isi tidak patut dikira sebagai isi kedua. Kenal pasti fungsi ayat sebelum memilih jawapan.",
      ),
      node(
        "kesalahan-luar",
        "Pengetahuan Luar Mengatasi Bahan",
        "Gunakan pengetahuan sedia ada untuk menaakul, bukan untuk menggantikan fakta petikan atau mencipta bukti baharu.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      node(
        "teknik-jejak",
        "Rumus JEJAK",
        "J — Jenis kehendak, E — Ekstrak kata kunci, J — Jalin idea, A — Ambil bukti, K — Kemas jawapan.",
      ),
      node(
        "teknik-jenis",
        "Jenis Kehendak",
        "Tentukan sama ada soalan meminta fakta, inferens, maksud, perbandingan, pendapat atau penilaian.",
      ),
      node(
        "teknik-jalin",
        "Jalin Idea",
        "Hubungkan maklumat antara ayat dan perenggan sebelum membuat kesimpulan.",
      ),
      node(
        "teknik-kemas",
        "Kemas Jawapan",
        "Susun jawapan dalam ayat gramatis, tepat dan tidak berulang, kemudian semak semula dengan soalan.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      node(
        "uasa-dua-bacaan",
        "Gunakan Dua Bacaan Bertujuan",
        "Bacaan pertama membina gambaran keseluruhan; bacaan kedua menjejak kata kunci, hubungan idea dan bukti.",
      ),
      node(
        "uasa-bukti",
        "Bukti Sebelum Menulis",
        "Tandakan bukti yang sesuai dahulu supaya jawapan tidak dibina berdasarkan ingatan kabur atau andaian.",
      ),
      node(
        "uasa-kbat",
        "Uji Jawapan KBAT",
        "Tanya sama ada alasan relevan, boleh dilaksanakan dan mempunyai hubungan yang jelas dengan situasi petikan.",
      ),
      node(
        "uasa-tenang",
        "Kekal Teliti",
        "Jika jawapan tidak segera ditemukan, kembali kepada fungsi setiap perenggan dan cari hubungan makna, bukan sekadar perkataan yang sama.",
      ),
    ]),
  ],
};
