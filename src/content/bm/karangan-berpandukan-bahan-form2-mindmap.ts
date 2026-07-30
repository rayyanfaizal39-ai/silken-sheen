import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-karangan-berpandukan-bahan";

function node(id: string, label: string, summary: string): MindNode {
  return { id: `${PREFIX}-${id}`, label, summary };
}

type LessonBranch = {
  id: string;
  label: string;
  penerangan: string;
  langkah: string;
  contoh: string;
  tip: string;
  kesalahan: string;
  kesalahanLabel?: string;
};

function lesson({
  id,
  label,
  penerangan,
  langkah,
  contoh,
  tip,
  kesalahan,
  kesalahanLabel = "Kesalahan Lazim",
}: LessonBranch): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      node(`${id}-penerangan`, "Penerangan", penerangan),
      node(`${id}-langkah`, "Langkah-langkah", langkah),
      node(`${id}-contoh`, "Contoh", contoh),
      node(`${id}-tip`, "Tip Penulisan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm2KaranganBerpandukanBahanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KARANGAN BERPANDUKAN BAHAN",
  summary:
    "Panduan Tingkatan 2 untuk mentafsir bahan rangsangan, memilih dan menghubungkan maklumat serta menghasilkan karangan yang lengkap, gramatis dan menepati arahan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Karangan Berpandukan Bahan?",
      penerangan:
        "Karangan berpandukan bahan ialah penulisan yang dibina berdasarkan maklumat dalam satu atau beberapa bahan rangsangan. Murid perlu memahami arahan, menggunakan maklumat penting dan mengolahnya menjadi ayat serta perenggan yang tersusun.",
      langkah:
        "1. Baca arahan • 2. Kenal pasti tema dan kata tugas • 3. Teliti semua bahan • 4. Tandakan maklumat penting • 5. Hubungkan maklumat • 6. Bina rangka • 7. Tulis dan semak.",
      contoh:
        "Bahan bertema hobi membaca memaparkan perpustakaan sekolah, novel, buku rujukan dan masa lapang. Murid perlu menghubungkan maklumat tersebut menjadi karangan tentang amalan serta faedah membaca.",
      tip: "Gunakan bahan sebagai panduan isi, bukan sebagai teks untuk disalin bulat-bulat. Ayat sendiri perlu menerangkan hubungan antara maklumat.",
      kesalahan:
        "Mengabaikan bahan, menyalin label sebagai senarai, menambah cerita yang tidak berkaitan atau hanya menerangkan rupa gambar tanpa menjawab tugasan.",
    }),
    lesson({
      id: "jenis-bahan",
      label: "Jenis-jenis Bahan Rangsangan",
      penerangan:
        "Bahan rangsangan lazimnya berbentuk gambar atau siri gambar, bahan grafik, poster atau infografik, carta, jadual, petikan ringkas, dialog, catatan dan gabungan beberapa bahan. Setiap jenis menyampaikan maklumat dengan cara berbeza.",
      langkah:
        "1. Kenal pasti jenis bahan • 2. Baca tajuk • 3. Teliti gambar dan simbol • 4. Baca label atau teks • 5. Tafsir nombor pada carta atau jadual • 6. Bandingkan bahan jika lebih daripada satu.",
      contoh:
        "Gambar menunjukkan aktiviti • poster membawa seruan dan fakta • carta menunjukkan perubahan atau perbandingan • jadual menyusun maklumat • petikan atau dialog menerangkan pandangan dan situasi.",
      tip: "Sesuaikan cara membaca dengan bahan. Carta perlu dibandingkan, gambar perlu ditafsirkan dan petikan perlu dikenal pasti idea utamanya.",
      kesalahan:
        "Melihat gambar sahaja, mengabaikan tajuk dan label, membaca nombor tanpa unit, menganggap semua bahan membawa maklumat sama atau tidak menghubungkan bahan gabungan.",
    }),
    lesson({
      id: "arahan",
      label: "Cara Memahami Arahan Soalan",
      penerangan:
        "Arahan menentukan perkara yang perlu ditulis, bentuk tugasan dan syarat jawapan. Kata tugas seperti jelaskan, huraikan, ceritakan atau gambarkan mempengaruhi cara bahan digunakan.",
      langkah:
        "1. Baca arahan dua kali • 2. Gariskan kata tugas • 3. Bulatkan tema • 4. Tandakan fokus • 5. Kenal pasti sasaran dan bentuk penulisan • 6. Periksa semua syarat • 7. Ungkapkan semula tugasan.",
      contoh:
        "Arahan: Berdasarkan bahan, huraikan langkah menjaga alam sekitar. Kata tugas: huraikan • Fokus: langkah • Tema: alam sekitar. Jawapan perlu menerangkan tindakan, bukan punca pencemaran sahaja.",
      tip: "Lengkapkan ayat “Saya perlu menulis tentang… berdasarkan…”. Jika ayat itu belum jelas, baca arahan dan bahan semula.",
      kesalahan:
        "Tersalah kata tugas, hanya mengikut tajuk bahan, mengabaikan format atau had yang dinyatakan, salah sasaran dan menulis tema umum tanpa fokus.",
    }),
    lesson({
      id: "maklumat-penting",
      label: "Mengenal Pasti Maklumat Penting",
      penerangan:
        "Maklumat penting ialah fakta, tindakan, idea, label atau data yang menjawab arahan. Cari tajuk utama, kata kerja, frasa, gambar, angka dan hubungan yang menonjol dalam bahan.",
      langkah:
        "1. Baca gambaran keseluruhan • 2. Tandakan kata kunci • 3. Senaraikan maklumat setiap bahan • 4. Padankan dengan fokus • 5. Gabungkan maklumat sama • 6. Buang butiran hiasan • 7. Pastikan tiada bahan penting tertinggal.",
      contoh:
        "Bahan membaca: perpustakaan sekolah → tempat memperoleh bahan • novel dan buku rujukan → jenis bacaan • masa lapang → waktu membaca. Ketiga-tiganya boleh membina isi yang saling berkaitan.",
      tip: "Gunakan kata kunci ringkas dalam rangka. Bezakan maklumat utama daripada contoh, hiasan atau butiran yang tidak membantu tugasan.",
      kesalahan:
        "Mengambil semua perkataan, tertinggal isi, memilih maklumat menarik tetapi tidak relevan, mengulang isi sama atau menganggap gambar hiasan sebagai isi utama.",
    }),
    lesson({
      id: "menghubungkan",
      label: "Menghubungkan Maklumat daripada Bahan",
      penerangan:
        "Maklumat daripada bahan perlu digabungkan mengikut hubungan seperti sebab dan kesan, tindakan dan tujuan, masalah dan penyelesaian, perbandingan atau urutan. Hubungan ini menjadikan karangan koheren.",
      langkah:
        "1. Kelompokkan maklumat sejenis • 2. Tentukan hubungan • 3. Susun dalam urutan • 4. Pilih penanda wacana • 5. Bina ayat sendiri • 6. Tambah huraian • 7. Semak sama ada semua bahan digunakan.",
      contoh:
        "Maklumat: pusat sumber + buku rujukan + masa lapang. Hubungan: Murid boleh mengunjungi pusat sumber pada waktu lapang untuk membaca buku rujukan. Amalan ini membantu mereka menambahkan ilmu.",
      tip: "Jangan paksa semua maklumat ke dalam satu ayat. Gabungkan yang berkaitan dan pecahkan idea berlainan kepada ayat atau perenggan baharu.",
      kesalahan:
        "Menyenaraikan label dengan koma, hubungan tidak logik, satu bahan digunakan berulang kali, maklumat bercanggah atau ayat terlalu panjang kerana semua bahan dicantumkan.",
    }),
    lesson({
      id: "merancang",
      label: "Merancang Isi Karangan",
      penerangan:
        "Rangka menukar maklumat bahan menjadi susunan pendahuluan, isi dan penutup. Setiap isi perlu menjawab fokus serta mempunyai ruang untuk huraian atau contoh.",
      langkah:
        "1. Catat tema pendahuluan • 2. Kelompokkan maklumat • 3. Pilih isi berlainan • 4. Susun isi secara logik • 5. Catat huraian, contoh atau kesan • 6. Rancang penutup • 7. Semak semua arahan.",
      contoh:
        "Tema membaca: Pendahuluan—kepentingan membaca • Isi 1—memanfaatkan pusat sumber • Isi 2—membaca pelbagai bahan • Isi 3—mengisi masa lapang • Penutup—jadikan membaca amalan.",
      tip: "Rangka cukup dalam bentuk kata kunci. Tanda sumber setiap isi secara ringkas supaya semua bahan yang relevan digunakan.",
      kesalahan:
        "Terus menulis, isi bertindih, susunan rawak, terlalu banyak isi tanpa huraian, tiada penutup atau rangka tidak dibandingkan dengan bahan.",
    }),
    lesson({
      id: "pendahuluan",
      label: "Membina Pendahuluan",
      penerangan:
        "Pendahuluan memperkenalkan tema yang ditunjukkan oleh bahan dan membawa pembaca kepada fokus tugasan. Pendahuluan tidak perlu menyalin tajuk atau menyenaraikan semua isi.",
      langkah:
        "1. Kenal pasti tema bersama • 2. Tulis kenyataan umum • 3. Kaitkan dengan situasi dalam bahan • 4. Nyatakan fokus • 5. Pastikan ringkas dan relevan.",
      contoh:
        "Membaca merupakan amalan yang amat bermanfaat kepada murid. Pelbagai bahan bacaan boleh diperoleh di pusat sumber sekolah. Oleh itu, amalan membaca wajar dijadikan sebahagian daripada kehidupan harian.",
      tip: "Gunakan pembukaan langsung apabila masa terhad. Satu pendahuluan yang tepat lebih baik daripada pembukaan berbunga-bunga yang tidak berkaitan dengan bahan.",
      kesalahan:
        "Menyalin arahan, menerangkan semua gambar, memasukkan semua isi, pembukaan terlalu panjang atau tema pendahuluan berbeza daripada bahan.",
    }),
    lesson({
      id: "mengembangkan-isi",
      label: "Mengembangkan Isi",
      penerangan:
        "Setiap maklumat terpilih perlu diolah menjadi isi, huraian, contoh dan penegasan mengikut kesesuaian. Murid boleh menjelaskan sebab, cara, tujuan atau kesan berdasarkan petunjuk bahan.",
      langkah:
        "1. Nyatakan isi daripada bahan • 2. Jelaskan maksud • 3. Terangkan mengapa atau bagaimana • 4. Berikan contoh berdasarkan bahan • 5. Nyatakan kesan • 6. Hubungkan dengan fokus.",
      contoh:
        "Isi: Murid boleh membaca di pusat sumber. Huraian: Pusat sumber menyediakan novel dan buku rujukan yang sesuai. Kesannya, murid dapat menambah ilmu serta memperluas kosa kata.",
      tip: "Bezakan maklumat yang benar-benar terlihat atau tertulis daripada andaian. Tambahan idea mestilah munasabah dan membantu huraian.",
      kesalahan:
        "Isi kekal sebagai label, huraian mengulang bahan, contoh tidak bersumber, andaian melampau, beberapa isi bercampur atau ayat tidak lengkap.",
    }),
    lesson({
      id: "penutup",
      label: "Menulis Penutup",
      penerangan:
        "Penutup merumuskan tema dan menegaskan tindakan, harapan atau kesan berdasarkan keseluruhan bahan. Penutup tidak memperkenalkan maklumat baharu.",
      langkah:
        "1. Rumuskan tema • 2. Tegaskan kepentingan • 3. Berikan cadangan jika sesuai • 4. Nyatakan harapan • 5. Kaitkan dengan fokus • 6. Semak pengakhiran.",
      contoh:
        "Kesimpulannya, amalan membaca memberikan banyak manfaat kepada murid. Semua murid hendaklah memanfaatkan bahan bacaan yang tersedia. Diharapkan budaya membaca terus subur dalam kehidupan.",
      tip: "Pastikan penutup sepadan dengan isi yang dibina daripada bahan. Gunakan rumusan dan harapan yang ringkas serta realistik.",
      kesalahan:
        "Tiada penutup, menyalin pendahuluan, mengulang semua label bahan, memasukkan isi baharu atau memberi harapan yang tidak berkaitan.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan utama termasuk salah memahami arahan, tertinggal maklumat, menyalin bahan, gagal menghubungkan idea dan menghasilkan ayat yang tidak gramatis.",
      langkah:
        "1. Bandingkan jawapan dengan arahan • 2. Tandakan bahan yang digunakan • 3. Semak setiap isi • 4. Cari salinan bulat-bulat • 5. Periksa hubungan idea • 6. Semak bahasa dan syarat.",
      contoh:
        "Lemah: Perpustakaan sekolah. Membaca novel. Buku rujukan. Baik: Murid boleh mengunjungi perpustakaan sekolah untuk membaca novel dan buku rujukan pada waktu lapang.",
      tip: "Gunakan senarai semak: arahan tepat, semua maklumat penting dipertimbangkan, ayat sendiri, isi terhuraikan, perenggan tersusun dan syarat dipatuhi.",
      kesalahan:
        "Salah fokus, bahan tertinggal, menyalin label, isi berulang, andaian tidak logik, tiada penanda wacana, ayat tergantung, tiada penutup dan tiada semakan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik B-A-H-A-N: Baca arahan, Amati semua bahan, Himpun maklumat penting, Atur dan huraikan isi, kemudian Nukil karangan serta semak.",
      langkah:
        "1. B—kata tugas dan fokus • 2. A—tajuk, gambar, label dan data • 3. H—senarai kata kunci • 4. A—rangka pendahuluan, isi dan penutup • 5. N—tulis ayat sendiri dan teliti jawapan.",
      contoh:
        "B: huraikan faedah membaca • A: pusat sumber, novel, buku rujukan • H: ilmu, bahasa, masa lapang • A: susun tiga isi • N: tulis karangan lengkap dan semak.",
      tip: "Hafal proses, bukan contoh karangan. Gunakan tanda kecil pada bahan untuk memastikan setiap bahagian telah diamati.",
      kesalahan:
        "Menulis formula dalam jawapan, memaksa semua butiran menjadi isi, menghafal karangan contoh atau berhenti selepas menyalin maklumat bahan.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, jawapan perlu menepati arahan, menggunakan bahan dengan menyeluruh, membina ayat gramatis dan mematuhi syarat yang dinyatakan pada soalan.",
      langkah:
        "Sebelum: baca arahan, amati bahan dan bina rangka B-A-H-A-N. • Semasa: gunakan ayat sendiri, penanda wacana dan huraian relevan. • Selepas: semak fokus, bahan, struktur, bahasa serta semua syarat.",
      contoh:
        "Bahan alam sekitar: gambar beg guna semula, tong kitar semula dan pokok. Rangka: kurangkan plastik → asingkan sisa → tanam pokok. Setiap tindakan dihuraikan dengan cara dan kesannya.",
      tip: "Agihkan masa untuk memahami bahan, merangka, menulis dan menyemak. Patuhi had perkataan atau format hanya seperti yang dinyatakan dalam arahan semasa.",
      kesalahan:
        "Terus menulis, salah kata tugas, meninggalkan bahan, ayat berbentuk senarai, huraian terlalu umum, melanggar syarat soalan atau tidak sempat menyemak.",
    }),
  ],
};
