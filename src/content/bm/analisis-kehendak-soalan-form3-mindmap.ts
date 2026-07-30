import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-analisis-kehendak-soalan";

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
      node(`${id}-tip`, "Tip Peperiksaan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm3AnalisisKehendakSoalanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ANALISIS KEHENDAK SOALAN",
  summary:
    "Panduan Tingkatan 3 untuk mengenal pasti tema, format, tugasan, kata tugas dan kata kunci sebelum merancang jawapan Penulisan UASA.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Analisis Kehendak Soalan?",
      penerangan:
        "Analisis kehendak soalan ialah proses meneliti arahan untuk menentukan perkara yang mesti ditulis, cara menjawab dan batas jawapan. Murid perlu mengenal pasti Tema, Format dan Tugasan melalui teknik TFT sebelum membina rangka.",
      langkah:
        "1. Baca seluruh soalan • 2. Kenal pasti kata tugas • 3. Tandakan kata kunci • 4. Tentukan tema • 5. Tentukan format • 6. Rumuskan tugasan sebenar • 7. Semak syarat • 8. Bina rangka yang sepadan.",
      contoh:
        "Soalan: “Sebagai ketua murid, sampaikan syarahan tentang kepentingan disiplin kepada warga sekolah.” Tema: disiplin • Format: syarahan • Tugasan: menghuraikan kepentingan disiplin • Sasaran: warga sekolah.",
      tip: "Jangan fikir isi dahulu sebelum tugasan jelas. Analisis yang tepat menjimatkan masa kerana hanya idea yang benar-benar relevan akan dipilih.",
      kesalahan:
        "Membaca tajuk sahaja, mengabaikan peranan dan sasaran, meneka format, terus menulis atau menganggap tema umum sebagai tugasan lengkap.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Menganalisis Soalan",
      penerangan:
        "Analisis membantu murid kekal pada tajuk, memilih format yang betul, menyediakan isi yang cukup dan mengurus masa. Jawapan yang gramatis tetapi tidak menjawab tugasan tetap kurang berkesan.",
      langkah:
        "1. Pastikan fokus tepat • 2. Tentukan ruang lingkup • 3. Pilih isi relevan • 4. Elakkan pengulangan • 5. Tentukan bentuk jawapan • 6. Anggarkan keupayaan menghuraikan • 7. Gunakan analisis sebagai senarai semak.",
      contoh:
        "Tanpa analisis, murid mungkin menulis faedah Internet bagi soalan yang meminta langkah keselamatan siber. Dengan analisis, isi dipilih seperti merahsiakan data, menggunakan kata laluan kukuh dan mengelakkan pautan mencurigakan.",
      tip: "Gunakan satu minit awal dengan berkualiti untuk mengelakkan banyak minit pembetulan kemudian. Jika pilihan diberikan, bandingkan soalan berdasarkan kefahaman dan bekalan isi.",
      kesalahan:
        "Menganggap analisis membuang masa, memilih soalan kerana tajuknya menarik, memulakan karangan sebelum fokus jelas atau mengekalkan isi hafalan yang tidak sepadan.",
    }),
    lesson({
      id: "kata-tugas",
      label: "Mengenal Pasti Kata Tugas",
      penerangan:
        "Kata tugas ialah kata kerja arahan yang menentukan tindakan jawapan. “Huraikan” dan “jelaskan” memerlukan penerangan; “bincangkan” memerlukan kupasan; “ceritakan” memerlukan urutan peristiwa; manakala “gambarkan” memerlukan pemerian yang jelas.",
      langkah:
        "1. Cari kata kerja arahan • 2. Gariskan kata tugas • 3. Nyatakan maksudnya dengan kata sendiri • 4. Tentukan jenis isi dan susunan • 5. Padankan setiap perenggan dengan tindakan itu • 6. Semak kata tugas bersama kata kunci.",
      contoh:
        "“Huraikan langkah memupuk perpaduan” memerlukan tindakan beserta cara, contoh dan kesan. “Ceritakan pengalaman menyertai aktiviti perpaduan” pula memerlukan peristiwa yang tersusun secara kronologi.",
      tip: "Tukar kata tugas kepada soalan panduan. “Huraikan” menjadi “Apakah isi, mengapa penting, bagaimana dilakukan dan apakah kesannya?”",
      kesalahan:
        "Menyamakan semua kata tugas, menulis cerita untuk soalan huraian, menyenaraikan isi tanpa penerangan atau memberikan pendapat tanpa alasan.",
    }),
    lesson({
      id: "kata-kunci",
      label: "Mengenal Pasti Kata Kunci",
      penerangan:
        "Kata kunci ialah perkataan atau frasa yang mengehadkan fokus, sasaran, masa, tempat, sebab atau skop jawapan. Kata kunci membantu murid membezakan jawapan umum daripada jawapan yang benar-benar menepati soalan.",
      langkah:
        "1. Bulatkan frasa utama • 2. Cari fokus seperti punca, langkah, faedah atau kesan • 3. Tandakan sasaran • 4. Tandakan konteks masa atau tempat • 5. Kenal pasti bilangan atau syarat jika dinyatakan • 6. Gabungkan kata kunci menjadi satu ayat tugasan.",
      contoh:
        "Soalan: “Huraikan peranan remaja dalam memperkukuh perpaduan di sekolah.” Kata kunci: peranan • remaja • perpaduan • di sekolah. Isi tentang dasar kerajaan sahaja berada di luar skop.",
      tip: "Uji isi dengan semua kata kunci, bukan satu sahaja. Isi mesti menjawab “siapa melakukan apa, dalam konteks mana dan untuk tujuan apa”.",
      kesalahan:
        "Menandakan terlalu banyak perkataan, mengabaikan sasaran, tertukar fokus punca dengan langkah, memilih isi di luar tempat atau masa yang ditetapkan dan hanya menyalin kata kunci.",
    }),
    lesson({
      id: "tema",
      label: "Mengenal Pasti Tema",
      penerangan:
        "Tema ialah bidang atau isu umum yang menyatukan soalan atau bahan, seperti keselamatan siber, alam sekitar, perpaduan atau kesihatan. Tema memberikan arah, tetapi belum menerangkan tugasan khusus.",
      langkah:
        "1. Baca tajuk dan bahan • 2. Cari idea yang berulang • 3. Kelompokkan kata kunci • 4. Namakan isu umum • 5. Bezakan tema daripada fokus • 6. Padankan tema dengan tugasan dan format.",
      contoh:
        "Tema: alam sekitar. Soalan boleh meminta punca pencemaran, kesan pencemaran atau langkah mengurangkannya. Tema sama, tetapi tugasan dan isi bagi setiap soalan berbeza.",
      tip: "Nyatakan tema dengan frasa pendek. Selepas itu, lengkapkan dengan fokus: “alam sekitar—langkah mengurangkan pencemaran oleh remaja”.",
      kesalahan:
        "Menjadikan tajuk kecil sebagai tema, menganggap tema sudah cukup untuk merancang isi, mencampurkan dua tema atau menggunakan isi umum yang tidak melaksanakan tugasan.",
    }),
    lesson({
      id: "format",
      label: "Mengenal Pasti Format Penulisan",
      penerangan:
        "Format menentukan susunan dan gaya jawapan. Soalan Tingkatan 3 boleh melibatkan karangan tanpa format khusus atau bentuk seperti surat, laporan, ucapan, syarahan dan dialog. Format dikenal pasti melalui peranan penulis, penerima, tujuan dan kata dalam arahan.",
      langkah:
        "1. Cari bentuk yang disebut secara jelas • 2. Kenal pasti peranan penulis • 3. Tentukan penerima atau khalayak • 4. Tentukan tujuan • 5. Ingat ciri format yang berkaitan • 6. Sesuaikan nada • 7. Pastikan isi tetap menjawab tugasan.",
      contoh:
        "“Anda sebagai ketua murid diminta menyampaikan syarahan” menuntut format syarahan dan sapaan kepada khalayak. “Tulis tentang kepentingan disiplin” tanpa arahan bentuk boleh dijawab sebagai karangan fakta tanpa format khusus.",
      tip: "Gariskan petunjuk seperti “sebagai”, “kepada”, “sampaikan”, “laporkan” atau “tulis surat”. Format ialah wadah; isi dan tugasan masih perlu tepat.",
      kesalahan:
        "Menulis laporan dalam bentuk surat, menggunakan gaya mesra dalam surat rasmi, ucapan tanpa kata alu-aluan, dialog tanpa nama watak dan titik bertindih atau memilih format yang tidak diminta.",
    }),
    lesson({
      id: "mentafsir",
      label: "Mentafsir Kehendak Soalan",
      penerangan:
        "Mentafsir bermaksud menggabungkan kata tugas, kata kunci, tema, format, sasaran dan syarat menjadi pemahaman yang lengkap. Murid perlu dapat menyebut dengan tepat apa yang akan ditulis sebelum memilih isi.",
      langkah:
        "1. Satukan analisis TFT • 2. Masukkan kata tugas dan kata kunci • 3. Tentukan sudut pandangan • 4. Tentukan batas isi • 5. Ungkapkan semula soalan • 6. Senaraikan perkara yang mesti ada • 7. Senaraikan perkara yang perlu dielakkan.",
      contoh:
        "Soalan keselamatan siber ditafsirkan sebagai: “Saya perlu menulis karangan fakta tentang beberapa langkah praktikal yang boleh dilakukan oleh remaja untuk melindungi diri daripada ancaman siber, bukan menghuraikan faedah Internet.”",
      tip: "Gunakan ayat kawalan: “Jawapan saya mesti … dan tidak boleh …”. Ayat ini membantu mengesan penyimpangan sebelum menulis.",
      kesalahan:
        "Mentafsir terlalu luas, menambah kehendak yang tiada, mengabaikan perkataan pengehad seperti “remaja” atau “di sekolah”, salah sudut pandangan dan menganggap contoh sebagai isi utama.",
    }),
    lesson({
      id: "merancang",
      label: "Merancang Jawapan Berdasarkan Soalan",
      penerangan:
        "Rangka mesti lahir daripada analisis, bukan daripada karangan hafalan. Setiap isi perlu melaksanakan kata tugas, mengandungi kata kunci yang berkaitan dan sesuai dengan tema serta format.",
      langkah:
        "1. Tulis rumusan kehendak • 2. Sumbang sarankan idea • 3. Tapis menggunakan kata kunci • 4. Pilih isi berlainan • 5. Susun secara logik • 6. Catat Huraian, Contoh dan Penegasan • 7. Rancang pendahuluan dan penutup • 8. Semak rangka dengan TFT.",
      contoh:
        "Tugasan “peranan remaja memperkukuh perpaduan di sekolah”: Isi 1—menghormati rakan berlainan kaum • Isi 2—menyertai aktiviti bersama • Isi 3—menggunakan bahasa yang sopan • Isi 4—menolak prasangka.",
      tip: "Tulis satu kata kunci soalan di sisi setiap isi. Jika kaitannya sukar dijelaskan, gugurkan atau baiki isi itu sebelum menulis.",
      kesalahan:
        "Mengambil semua idea tanpa tapisan, isi bertindih, susunan rawak, contoh tidak sesuai dengan sasaran, format dirancang tetapi isi diabaikan atau rangka tidak disemak.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan analisis menyebabkan seluruh jawapan tersasar walaupun bahasanya baik. Antara puncanya ialah membaca secara tergesa-gesa, tertukar tema dengan tugasan, mengabaikan kata pengehad dan menggunakan format yang salah.",
      langkah:
        "1. Bandingkan tafsiran dengan teks soalan • 2. Semak kata tugas • 3. Semak semua kata kunci • 4. Periksa TFT • 5. Uji rangka isi • 6. Kenal pasti andaian sendiri • 7. Betulkan sebelum menulis.",
      contoh:
        "Soalan meminta “kesan buli siber terhadap remaja”, tetapi rangka mengandungi “cara mengelakkan buli siber”. Pembetulan: bina isi tentang kesan emosi, sosial dan pembelajaran yang benar-benar menjawab fokus.",
      tip: "Gunakan semakan silang: kata tugas ↔ isi, kata kunci ↔ contoh, format ↔ gaya. Tiga padanan ini mengesan kebanyakan kesilapan awal.",
      kesalahan:
        "Salah kata tugas, kata kunci tertinggal, tema terlalu umum, format salah, sasaran diabaikan, isi hafalan dipaksa, syarat tidak dipatuhi dan terus menulis tanpa rangka.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik B-TFT-U-R: Baca, tandakan Tema–Format–Tugasan, Ungkapkan semula kehendak, kemudian Rangka. Dalam bahagian TFT, tandakan juga kata tugas, kata kunci, sasaran dan syarat.",
      langkah:
        "1. B—Baca seluruh soalan dua kali • 2. TFT—Tema, Format, Tugasan • 3. Tanda kata tugas dan kata kunci • 4. U—Ungkapkan “Saya mesti…” • 5. R—Rangka isi yang sepadan • 6. Semak semula dengan soalan.",
      contoh:
        "B—baca soalan perpaduan • TFT—perpaduan, karangan fakta, peranan remaja • U—huraikan tindakan remaja di sekolah • R—hormat, bekerjasama, berkomunikasi sopan.",
      tip: "Hafal urutan analisis, bukan jawapan contoh. Tulis catatan B-TFT-U-R secara ringkas pada ruang perancangan jika dibenarkan.",
      kesalahan:
        "Menulis formula dalam karangan, berhenti selepas mengenal pasti tema, tidak mengungkapkan tugasan, membina rangka sebelum format jelas atau menggunakan teknik secara mekanikal.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, analisis perlu dilakukan sebelum menjawab karangan pendek dan respons terbuka. Bahan rangsangan perlu diteliti secara menyeluruh, manakala soalan pilihan perlu dibandingkan berdasarkan kefahaman, format dan kemampuan menghuraikan isi.",
      langkah:
        "Sebelum memilih: baca semua arahan dan pilihan. • Sebelum merangka: lakukan B-TFT-U-R, tandakan kata tugas, kata kunci dan syarat. • Semasa menulis: semak setiap perenggan dengan tugasan. • Selepas menulis: baca soalan sekali lagi dan pastikan format, fokus serta panjang jawapan dipatuhi.",
      contoh:
        "Antara dua pilihan, pilih soalan keselamatan siber jika murid dapat mengenal pasti format, menjelaskan tugasan dan menyediakan sekurang-kurangnya tiga isi yang berbeza serta contoh yang logik.",
      tip: "Pilih soalan yang paling jelas kehendaknya dan paling cukup isi, bukan soalan yang mempunyai perkataan paling mudah. Patuhi arahan kertas semasa.",
      kesalahan:
        "Membaca satu pilihan sahaja, memilih kerana tajuk popular, tidak meneliti bahan, salah format, menulis sebelum analisis selesai, isi terkeluar fokus atau tidak menyemak jawapan dengan soalan.",
    }),
  ],
};
