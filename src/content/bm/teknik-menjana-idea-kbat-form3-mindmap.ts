import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-teknik-menjana-idea-kbat";

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

export const bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "TEKNIK MENJANA IDEA KBAT",
  summary:
    "Panduan Tingkatan 3 untuk menjana, menilai, menghubungkan dan menyokong idea KBAT supaya penulisan lebih matang, logik dan relevan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu KBAT?",
      penerangan:
        "KBAT ialah Kemahiran Berfikir Aras Tinggi yang melibatkan penggunaan maklumat untuk menganalisis, membuat pertimbangan, menghubungkan sebab dan kesan serta mencadangkan penyelesaian. Dalam penulisan, KBAT ditunjukkan melalui idea yang relevan, alasan yang jelas dan huraian yang logik.",
      langkah:
        "1. Fahami isu • 2. Tanya mengapa dan bagaimana • 3. Lihat hubungan antara idea • 4. Pertimbangkan kesan • 5. Bandingkan pilihan • 6. Cadangkan tindakan • 7. Sokong pendirian dengan contoh.",
      contoh:
        "Idea biasa: “Remaja perlu membaca.” Idea KBAT: “Remaja perlu membaca pelbagai sumber supaya dapat membandingkan maklumat, menilai kesahihannya dan membuat keputusan yang lebih bertanggungjawab.”",
      tip: "KBAT bukan ayat yang sukar. Utamakan pemikiran yang jelas: ada pendirian, alasan, hubungan dan bukti yang dapat difahami.",
      kesalahan:
        "Menganggap KBAT bermaksud menggunakan istilah bombastik, memberikan pendapat tanpa alasan, menulis idea terlalu umum atau mencipta fakta yang tidak dapat dipastikan.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan KBAT dalam Penulisan",
      penerangan:
        "KBAT membantu murid menghasilkan isi yang tidak cetek, menghuraikan isu daripada beberapa sudut dan membina hujah yang meyakinkan. Kemahiran ini menjadikan perenggan lebih matang serta menunjukkan kefahaman terhadap kehendak soalan.",
      langkah:
        "1. Gunakan KBAT untuk menafsir isu • 2. Pilih isi yang bernilai • 3. Jelaskan alasan • 4. Hubungkan tindakan dengan kesan • 5. Nilai kesesuaian cadangan • 6. Tegaskan kaitan dengan tugasan.",
      contoh:
        "Topik kitar semula: Murid bukan sekadar menyatakan “mengurangkan sampah”, tetapi menjelaskan bahawa pengasingan sisa mengurangkan bahan ke tapak pelupusan, memudahkan pemprosesan dan membina sikap bertanggungjawab.",
      tip: "Satu isi yang dihuraikan secara bernas lebih kuat daripada beberapa isi yang hanya disenaraikan. Tunjukkan cara idea berfungsi dan mengapa idea itu penting.",
      kesalahan:
        "Mengejar banyak isi, mengulang maksud sama, memberikan kesan yang terlalu umum atau memanjangkan ayat tanpa menambah pemikiran.",
    }),
    lesson({
      id: "kehendak-kbat",
      label: "Mengenal Pasti Kehendak KBAT",
      penerangan:
        "Kehendak KBAT dapat dikenal pasti melalui soalan yang meminta pendapat, alasan, pertimbangan, kesan, penyelesaian, ramalan atau penilaian. Murid tetap perlu menganalisis Tema, Format dan Tugasan serta semua kata kunci.",
      langkah:
        "1. Gariskan kata tugas • 2. Tandakan frasa seperti “pada pendapat anda”, “wajarkah”, “mengapakah”, “bagaimanakah” atau “apakah kesan” • 3. Kenal pasti tema dan sasaran • 4. Tentukan jenis pemikiran • 5. Nyatakan pendirian • 6. Senaraikan alasan yang relevan.",
      contoh:
        "Soalan: “Pada pendapat anda, wajarkah penggunaan telefon pintar dihadkan di sekolah?” Murid perlu menyatakan pendirian, memberi alasan, mempertimbangkan kesan dan mencadangkan cara pelaksanaan yang munasabah.",
      tip: "Tentukan sama ada soalan meminta anda menerangkan, menilai atau mencadangkan. Bentuk pemikiran ini menentukan cara isi dikembangkan.",
      kesalahan:
        "Menjawab fakta sahaja, tidak menyatakan pendirian, mengabaikan kata “wajarkah”, memberi jawapan ya atau tidak tanpa alasan atau menyimpang daripada sasaran.",
    }),
    lesson({
      id: "menjana",
      label: "Teknik Menjana Idea",
      penerangan:
        "Idea boleh dijana melalui soalan 5W1H dan peluasan sudut pandang. Tanya Apa, Siapa, Bila, Di mana, Mengapa dan Bagaimana; kemudian lihat isu dari sudut diri, keluarga, sekolah, masyarakat atau negara mengikut kesesuaian.",
      langkah:
        "1. Tulis isu di tengah • 2. Tanya 5W1H • 3. Senaraikan pihak terlibat • 4. Catat punca, kesan dan penyelesaian • 5. Lihat beberapa peringkat kesan • 6. Pilih idea berbeza • 7. Tapis menggunakan kehendak soalan.",
      contoh:
        "Isu buli siber: Siapa—remaja dan pengguna lain • Mengapa—kurang kesedaran • Bagaimana mencegah—pendidikan dan laporan • Kesan—emosi, pembelajaran dan hubungan sosial • Pihak membantu—keluarga, sekolah dan platform.",
      tip: "Tulis kata kunci dengan cepat, kemudian pilih idea yang mudah dihuraikan dan diberikan contoh. Jangan cuba menggunakan semua idea yang terhasil.",
      kesalahan:
        "Sumbang saran tanpa menapis, memilih isi bertindih, menjana idea di luar konteks, terlalu lama membuat peta atau menggunakan sudut yang tidak berkaitan.",
    }),
    lesson({
      id: "mengembangkan",
      label: "Teknik Mengembangkan Idea KBAT",
      penerangan:
        "Idea KBAT perlu berkembang daripada pernyataan kepada alasan, cara, contoh, kesan dan penegasan. Teknik I-H-C-P serta 5W1H membantu menjadikan hubungan pemikiran dalam perenggan jelas.",
      langkah:
        "1. I—nyatakan idea atau pendirian • 2. H—jelaskan mengapa • 3. Terangkan bagaimana • 4. C—berikan contoh relevan • 5. Nyatakan kesan • 6. P—tegaskan kaitan dengan tugasan • 7. Semak logik perenggan.",
      contoh:
        "Idea: Sekolah perlu mengajar literasi digital. Huraian: Murid perlu menilai sumber sebelum berkongsi maklumat. Contoh: Mereka boleh membandingkan berita dengan laman yang dipercayai. Kesan: Penyebaran maklumat palsu dapat dikurangkan.",
      tip: "Selepas setiap ayat, tanya “Jadi apa?” atau “Mengapa perkara ini berlaku?” Jawapan kepada soalan itu membuka ruang untuk huraian yang lebih mendalam.",
      kesalahan:
        "Huraian mengulang isi, contoh tidak membuktikan idea, kesan terputus daripada tindakan, penegasan hanya menyalin isi atau satu perenggan mengandungi terlalu banyak idea utama.",
    }),
    lesson({
      id: "sebab-kesan-cadangan",
      label: "Menghubungkan Sebab, Kesan dan Cadangan",
      penerangan:
        "Hubungan sebab, kesan dan cadangan membantu murid melihat isu sebagai rangkaian. Cadangan yang baik mesti menangani sebab sebenar, manakala kesannya perlu munasabah dan boleh dijelaskan.",
      langkah:
        "1. Kenal pasti masalah • 2. Cari sebab utama • 3. Jelaskan kesan langsung • 4. Lanjutkan kesan jika relevan • 5. Cadangkan tindakan yang menyasar sebab • 6. Tentukan pihak pelaksana • 7. Ramalkan hasil cadangan.",
      contoh:
        "Sebab: Remaja mudah berkongsi maklumat tanpa semakan. Kesan: Berita palsu tersebar dan menimbulkan kekeliruan. Cadangan: Sekolah melatih murid menyemak sumber. Hasil: Murid lebih berhati-hati sebelum menyebarkan kandungan.",
      tip: "Gunakan ujian padanan: “Adakah cadangan ini benar-benar mengatasi sebab?” Jika tidak, cari tindakan yang lebih tepat.",
      kesalahan:
        "Sebab dan kesan tertukar, cadangan terlalu umum, pihak pelaksana tidak jelas, kesan melampau atau cadangan tidak berkaitan dengan punca.",
    }),
    lesson({
      id: "contoh",
      label: "Menyokong Idea dengan Contoh yang Relevan",
      penerangan:
        "Contoh menjadikan idea lebih nyata dan membuktikan bahawa cadangan boleh dilaksanakan. Contoh yang baik berkaitan dengan isi, logik, sesuai dengan kehidupan remaja dan tidak bergantung pada statistik yang tidak disahkan.",
      langkah:
        "1. Kenal pasti isi yang hendak dibuktikan • 2. Pilih situasi dekat dengan konteks • 3. Nyatakan tindakan atau kejadian • 4. Hubungkan contoh dengan huraian • 5. Jelaskan hasilnya • 6. Pastikan contoh ringkas dan munasabah.",
      contoh:
        "Isi: Remaja perlu melaporkan buli siber. Contoh: Mangsa boleh menyimpan tangkap layar dan mendapatkan bantuan ibu bapa atau guru sebelum membuat laporan kepada platform atau pihak berkuasa.",
      tip: "Gunakan contoh yang boleh diterangkan dalam satu atau dua ayat. Contoh berfungsi menyokong hujah, bukan mengambil alih seluruh perenggan.",
      kesalahan:
        "Contoh terlalu umum, cerita terlalu panjang, contoh tidak berkaitan, statistik direka, rujukan KOMSAS dipaksa atau contoh bercanggah dengan pendirian.",
    }),
    lesson({
      id: "hujah",
      label: "Membina Hujah yang Mantap",
      penerangan:
        "Hujah yang mantap mengandungi pendirian yang jelas, alasan yang logik, bukti atau contoh dan penegasan. Murid juga boleh mempertimbangkan batas atau sudut lain sebelum menunjukkan mengapa pendiriannya lebih sesuai.",
      langkah:
        "1. Nyatakan pendirian • 2. Berikan alasan utama • 3. Huraikan hubungan sebab-akibat • 4. Sokong dengan contoh • 5. Pertimbangkan keadaan atau batas • 6. Tegaskan pilihan paling munasabah • 7. Pastikan nada sopan dan bahasa baku.",
      contoh:
        "Pendirian: Telefon pintar wajar dihadkan, bukan dilarang sepenuhnya, di sekolah. Alasan: Peranti boleh mengganggu tumpuan tetapi juga membantu pembelajaran. Cadangan: Penggunaan dibenarkan di bawah arahan guru pada waktu tertentu.",
      tip: "Elakkan pendirian mutlak jika isu mempunyai dua sisi. Hujah menjadi lebih matang apabila cadangan mengambil kira manfaat, risiko dan cara pelaksanaan.",
      kesalahan:
        "Pendirian berubah-ubah, alasan tidak menyokong pendirian, hujah terlalu emosi, dakwaan mutlak, contoh tiada kaitan atau menolak pandangan lain tanpa pertimbangan.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan KBAT lazim termasuk idea umum, pendapat tanpa alasan, hubungan tidak logik, contoh tidak relevan dan cadangan yang mustahil. Bahasa berbunga tidak dapat menggantikan isi yang lemah.",
      langkah:
        "1. Semak kehendak soalan • 2. Cari pendirian • 3. Uji setiap alasan • 4. Padankan sebab, kesan dan cadangan • 5. Periksa contoh • 6. Buang pengulangan • 7. Betulkan bahasa tanpa mengubah maksud.",
      contoh:
        "Lemah: “Kerajaan perlu membuat kempen kerana kempen sangat bagus.” Baik: “Pihak sekolah boleh menjalankan kempen literasi digital supaya murid mengetahui cara menyemak sumber sebelum berkongsi maklumat.”",
      tip: "Gunakan lima soalan semak: Relevan? Logik? Ada alasan? Ada contoh? Menjawab tugasan? Baiki idea yang gagal mana-mana ujian ini.",
      kesalahan:
        "Isi klise, alasan berputar, sebab dan kesan bercanggah, cadangan tidak praktikal, contoh direka, terlalu banyak istilah sukar dan penegasan tiada kaitan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik T-P-H-B-T: Tanya, Pilih, Hubungkan, Buktikan, Tegaskan. Teknik ini membawa murid daripada penjanaan idea kepada hujah KBAT yang lengkap.",
      langkah:
        "1. T—Tanya 5W1H dan lihat pelbagai sudut • 2. P—Pilih idea paling relevan • 3. H—Hubungkan sebab, cara dan kesan • 4. B—Buktikan dengan contoh • 5. T—Tegaskan kaitan dengan tugasan.",
      contoh:
        "Isu membaca: Tanya—mengapa kurang membaca? • Pilih—akses bahan • Hubungkan—akses mudah meningkatkan peluang membaca • Buktikan—sudut bacaan dan bahan digital • Tegaskan—kemudahan menyokong budaya membaca.",
      tip: "Hafal proses, bukan contoh. Gunakan T-P-H-B-T pada setiap isi dan hentikan pengembangan apabila kaitan dengan tugasan sudah jelas.",
      kesalahan:
        "Menulis huruf teknik dalam karangan, memilih idea sebelum memahami soalan, memberikan bukti tanpa hubungan atau menegaskan pendirian yang berbeza daripada isi.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, idea KBAT mesti menepati Tema, Format dan Tugasan serta dapat dikembangkan dalam masa yang tersedia. Murid perlu memilih idea yang relevan dan kukuh, bukan idea yang kelihatan paling luar biasa.",
      langkah:
        "Sebelum menulis: analisis TFT dan kehendak KBAT; jana idea dengan 5W1H; tapis menggunakan T-P-H-B-T. • Semasa menulis: satu idea utama setiap perenggan; gunakan I-H-C-P; hubungkan sebab, kesan dan cadangan. • Selepas menulis: semak pendirian, logik, contoh, bahasa dan arahan kertas semasa.",
      contoh:
        "Soalan tentang had telefon pintar: pilih pendirian yang jelas, berikan alasan tumpuan dan pembelajaran, cadangkan penggunaan terkawal, sokong dengan situasi kelas dan tegaskan keseimbangan manfaat serta risiko.",
      tip: "Jika buntu, kembali kepada tiga soalan: Mengapa berlaku? Apakah kesannya? Apakah tindakan paling sesuai? Jawapan ini biasanya menghasilkan asas perenggan KBAT.",
      kesalahan:
        "Terus menulis tanpa menapis idea, memilih pendirian yang sukar dipertahankan, isi berulang, contoh tidak logik, cadangan terlalu umum, mengabaikan format atau tidak sempat menyemak.",
    }),
  ],
};
