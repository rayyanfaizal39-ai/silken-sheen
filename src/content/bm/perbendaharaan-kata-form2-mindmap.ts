import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-perbendaharaan-kata";

function node(id: string, label: string, summary: string): MindNode {
  return { id: `${PREFIX}-${id}`, label, summary };
}

type LessonBranch = {
  id: string;
  label: string;
  penerangan: string;
  contoh: string;
  penggunaan: string;
  tip: string;
  kesalahan: string;
  kesalahanLabel?: string;
};

function lesson({
  id,
  label,
  penerangan,
  contoh,
  penggunaan,
  tip,
  kesalahan,
  kesalahanLabel = "Kesalahan Lazim",
}: LessonBranch): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      node(`${id}-penerangan`, "Penerangan", penerangan),
      node(`${id}-contoh`, "Contoh", contoh),
      node(`${id}-penggunaan`, "Cara Penggunaan", penggunaan),
      node(`${id}-tip`, "Tip Penulisan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm2PerbendaharaanKataMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PERBENDAHARAAN KATA",
  summary:
    "Panduan Tingkatan 2 untuk memperluas dan memilih kosa kata yang tepat, baku, bervariasi serta sesuai dengan tema, konteks dan tujuan penulisan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Perbendaharaan Kata?",
      penerangan:
        "Perbendaharaan kata ialah himpunan perkataan dan ungkapan yang diketahui, difahami serta dapat digunakan oleh seseorang. Dalam penulisan, penguasaan kosa kata bukan sekadar mengetahui banyak perkataan, tetapi memilih kata yang paling tepat mengikut maksud.",
      contoh:
        "Kata asas: baik, penting, masalah, menjaga. Pilihan mengikut konteks: bermanfaat, mustahak, isu, memelihara. Ayat: Amalan membaca memberikan manfaat yang besar kepada murid.",
      penggunaan:
        "1. Kenal pasti tema • 2. Tentukan maksud ayat • 3. Pilih perkataan yang difahami • 4. Padankan dengan konteks • 5. Bina ayat lengkap • 6. Baca semula untuk memastikan maksud jelas.",
      tip: "Mulakan dengan perkataan yang mudah dan tepat. Tingkatkan pilihan kata secara beransur-ansur tanpa mengorbankan kejelasan ayat.",
      kesalahan:
        "Menganggap perkataan sukar sentiasa lebih baik, menggunakan kata yang tidak difahami, memilih kata kerana bunyinya menarik atau mencampurkan bahasa baku dengan bahasa pasar.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Perbendaharaan Kata",
      penerangan:
        "Perbendaharaan kata yang luas membantu murid menyampaikan idea dengan tepat, mengelakkan pengulangan dan menghasilkan huraian yang lebih matang. Pembaca juga lebih mudah memahami nada serta tujuan karangan.",
      contoh:
        "Berulang: Membaca ialah amalan yang baik. Membaca memberi kesan yang baik. Lebih bervariasi: Membaca ialah amalan yang bermanfaat kerana aktiviti ini memperluas ilmu dan meningkatkan penguasaan bahasa.",
      penggunaan:
        "Gunakan kosa kata untuk memperjelas isi, membezakan maksud, menerangkan sebab dan kesan serta melicinkan hubungan ayat. Gantikan pengulangan hanya apabila kata baharu benar-benar sesuai.",
      tip: "Selepas menulis satu perenggan, bulatkan perkataan yang diulang. Cari pilihan lain atau bina semula ayat, kemudian semak sama ada maksud asal masih kekal.",
      kesalahan:
        "Menggantikan setiap perkataan berulang secara paksa, menggunakan terlalu banyak kata berbunga, mengabaikan tatabahasa atau menghasilkan ayat panjang yang kabur.",
    }),
    lesson({
      id: "sinonim",
      label: "Sinonim",
      penerangan:
        "Sinonim ialah kata yang mempunyai makna sama atau hampir sama. Walau bagaimanapun, setiap sinonim boleh mempunyai penggunaan dan tingkat makna yang berbeza, maka pemilihannya perlu mengikut konteks ayat.",
      contoh:
        "penting → mustahak / signifikan • baik → bermanfaat / berkesan • masalah → isu / kemelut • menjaga → memelihara / melindungi • membuat → melaksanakan / menjalankan.",
      penggunaan:
        "Kenal pasti maksud kata asal, senaraikan pilihan hampir sama dan uji dalam ayat. Contoh: “Program ini sangat penting” boleh menjadi “Program ini amat signifikan”, tetapi “menjaga adik” tidak semestinya sesuai diganti dengan “memelihara adik”.",
      tip: "Pilih sinonim yang anda fahami dan dapat gunakan dalam ayat lain. Utamakan ketepatan, kemudian barulah variasi.",
      kesalahan:
        "Menganggap semua sinonim boleh saling menggantikan, memilih kata yang terlalu kuat, mengubah maksud asal atau menggunakan perkataan matang dalam konteks yang tidak sesuai.",
    }),
    lesson({
      id: "antonim",
      label: "Antonim",
      penerangan:
        "Antonim ialah perkataan yang mempunyai makna berlawanan. Penggunaan antonim membantu murid membina perbandingan, menunjukkan perubahan dan menjelaskan kesan positif atau negatif dengan lebih nyata.",
      contoh:
        "bersih ↔ kotor • rajin ↔ malas • meningkat ↔ menurun • selamat ↔ berbahaya • formal ↔ tidak formal. Ayat: Persekitaran yang bersih memberikan keselesaan, manakala kawasan yang kotor boleh menjejaskan kesihatan.",
      penggunaan:
        "Gunakan pasangan antonim untuk membandingkan dua keadaan atau menunjukkan perubahan. Pastikan kedua-dua kata merujuk aspek yang sama dan disambungkan dengan penanda seperti “manakala”, “sebaliknya” atau “daripada… kepada…”.",
      tip: "Gunakan antonim apabila perbandingan membantu hujah. Satu pasangan yang jelas lebih berkesan daripada beberapa pertentangan yang tidak dihuraikan.",
      kesalahan:
        "Memilih kata yang bukan lawan sebenar, membandingkan perkara berlainan, menggunakan “manakala” tanpa dua idea yang setara atau memasukkan antonim sekadar untuk menghias ayat.",
    }),
    lesson({
      id: "kata-menarik",
      label: "Kata Menarik",
      penerangan:
        "Kata menarik ialah pilihan perkataan yang lebih tepat, bervariasi dan berkesan berbanding kata yang terlalu umum. Kata ini perlu sesuai dengan tahap Tingkatan 2 dan tidak menyebabkan ayat sukar difahami.",
      contoh:
        "baik → bermanfaat / berkesan • menggunakan → memanfaatkan • membantu → memberikan sokongan • sangat cantik → indah / menarik • membaca → menelaah bahan bacaan • telefon pintar → alat komunikasi moden.",
      penggunaan:
        "Pilih satu kata umum dalam ayat, tentukan maksud khusus dan gantikan dengan pilihan sesuai. Contoh: “Murid menggunakan pusat sumber” menjadi “Murid memanfaatkan kemudahan pusat sumber untuk menelaah bahan bacaan.”",
      tip: "Gunakan satu atau dua pilihan menarik dalam satu perenggan. Perkataan mudah seperti “alat komunikasi moden” lebih sesuai daripada istilah rumit yang tidak dikuasai.",
      kesalahan:
        "Menggunakan kata sukar secara salah, menukar semua perkataan, mengulang kata menarik yang sama, membina frasa berlebihan atau memilih kata yang tidak sepadan dengan nada karangan.",
    }),
    lesson({
      id: "ungkapan-menarik",
      label: "Ungkapan Menarik",
      penerangan:
        "Ungkapan menarik ialah rangkai kata, peribahasa atau kata hikmat yang menguatkan maksud dan menjadikan penulisan lebih berkesan. Ungkapan mesti mempunyai hubungan jelas dengan tema dan huraian.",
      contoh:
        "Membaca jambatan ilmu — tema pendidikan • Bagaikan aur dengan tebing — kerjasama • Sediakan payung sebelum hujan — persediaan • Di mana ada kemahuan, di situ ada jalan — kerajinan.",
      penggunaan:
        "Nyatakan idea dahulu, masukkan ungkapan yang sepadan dan jelaskan kaitannya. Contoh: Murid perlu rajin berusaha kerana di mana ada kemahuan, di situ ada jalan. Usaha yang berterusan membantu mereka mencapai kejayaan.",
      tip: "Satu ungkapan yang tepat lebih baik daripada banyak ungkapan yang dipaksa. Gunakan pada pendahuluan, huraian atau penutup apabila benar-benar membantu maksud.",
      kesalahan:
        "Ungkapan tidak relevan, maksud peribahasa disalah tafsir, ungkapan dibiarkan tanpa kaitan, terlalu banyak ungkapan atau bentuk asal ungkapan diubah sesuka hati.",
    }),
    lesson({
      id: "formal-tidak-formal",
      label: "Perkataan Formal dan Tidak Formal",
      penerangan:
        "Perkataan formal menggunakan bahasa baku dan sesuai untuk penulisan rasmi serta kebanyakan jawapan peperiksaan. Perkataan tidak formal lazim digunakan dalam percakapan santai dan hanya sesuai apabila konteks seperti dialog memerlukannya.",
      contoh:
        "Tidak formal → formal: nak → hendak • tak → tidak • tau → tahu • korang → kamu • sebabkan → menyebabkan. Ayat formal: Murid hendaklah mengetahui kesan penggunaan teknologi secara tidak terkawal.",
      penggunaan:
        "Kenal pasti tujuan dan pembaca. Gunakan bahasa baku untuk huraian, laporan, ucapan rasmi dan karangan fakta. Dalam dialog atau penulisan tidak rasmi, pilih bentuk yang sesuai tetapi elakkan singkatan mesej.",
      tip: "Semasa menyemak, cari perkataan yang biasa digunakan ketika berbual. Gantikan dengan bentuk baku jika karangan memerlukan nada formal.",
      kesalahan:
        "Mencampurkan bahasa pasar dengan bahasa baku, menggunakan singkatan seperti “yg” dan “utk”, menjadikan dialog terlalu rasmi atau menganggap semua karangan menggunakan nada yang sama.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan kosa kata berlaku apabila perkataan tidak tepat, berulang, terlalu sukar, tidak baku atau tidak sesuai dengan tema dan nada penulisan.",
      contoh:
        "Kabur: Murid membuat penggunaan perpustakaan. Tepat: Murid memanfaatkan perpustakaan. Dipaksa: Wahana komunikasi sofistikated itu rosak. Lebih jelas untuk Tingkatan 2: Alat komunikasi moden itu rosak.",
      penggunaan:
        "1. Gariskan kata yang meragukan • 2. Semak maksudnya dalam ayat • 3. Periksa bentuk baku • 4. Cari pengulangan • 5. Ganti hanya jika pasti • 6. Baca semula keseluruhan ayat.",
      tip: "Gunakan ujian mudah: Adakah saya memahami kata ini? Adakah kata ini tepat? Adakah sesuai dengan tema, pembaca dan bentuk karangan?",
      kesalahan:
        "Salah makna, pengulangan kata, bahasa pasar, singkatan mesej, ungkapan tidak relevan, sinonim tidak sesuai, kata terlalu umum dan penggunaan kosa kata menarik secara berlebihan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik T-E-P-A-T: Tema, Erti, Padanan, Ayat dan Teliti. Teknik ini membantu murid mengingat bahawa kata yang baik ialah kata yang tepat dalam konteks, bukan kata yang paling sukar.",
      contoh:
        "T—tema alam sekitar • E—erti “memelihara” • P—padan dengan kebersihan • A—“Masyarakat perlu memelihara alam sekitar” • T—teliti ejaan dan hubungan ayat.",
      penggunaan:
        "Sebelum menggunakan kata baharu, tentukan tema dan ertinya. Padankan dengan maksud, bina ayat lengkap, kemudian teliti semula ejaan, tatabahasa serta kejelasan.",
      tip: "Bina bank kata mengikut tema seperti pendidikan, kesihatan, alam sekitar dan perpaduan. Simpan kata bersama maksud serta satu contoh ayat.",
      kesalahan:
        "Menghafal senarai tanpa memahami maksud, menyalin ayat contoh bulat-bulat, menganggap satu kata sesuai untuk semua tema atau menulis huruf teknik dalam karangan.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, kosa kata perlu membantu murid menjawab kehendak soalan dengan jelas dan matang. Pemilihan kata dinilai bersama ketepatan bahasa, pengembangan isi dan keseluruhan penyampaian.",
      contoh:
        "Biasa: Membaca sangat baik untuk murid. Dipertingkat: Amalan membaca amat bermanfaat kerana dapat memperluas pengetahuan dan meningkatkan penguasaan bahasa dalam kalangan murid.",
      penggunaan:
        "Sebelum: kenal pasti tema dan catat beberapa kata berkaitan. • Semasa: gunakan kata baku, sinonim tepat dan ungkapan relevan. • Selepas: semak pengulangan, bahasa pasar, ejaan serta perkataan yang diragui.",
      tip: "Utamakan ayat yang gramatis dan mudah difahami. Jika tidak pasti tentang sesuatu perkataan, gunakan pilihan yang lebih mudah tetapi tepat.",
      kesalahan:
        "Menghafal karangan, memaksa kata bombastik, menggunakan peribahasa salah, mengulang kata yang sama, mencampurkan bahasa tidak formal atau tidak menyemak maksud dan ejaan.",
    }),
  ],
};
