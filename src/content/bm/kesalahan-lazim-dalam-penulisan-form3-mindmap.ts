import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-kesalahan-lazim-dalam-penulisan";

type Lesson = {
  readonly id: string;
  readonly label: string;
  readonly penerangan: string;
  readonly punca: string;
  readonly salah: string;
  readonly betul: string;
  readonly tip: string;
};

function lesson({ id, label, penerangan, punca, salah, betul, tip }: Lesson): MindNode {
  const detail = (suffix: string, detailLabel: string, summary: string): MindNode => ({
    id: `${PREFIX}-${id}-${suffix}`,
    label: detailLabel,
    summary,
  });

  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      detail("penerangan", "Penerangan", penerangan),
      detail("punca-kesalahan", "Punca Kesalahan", punca),
      detail("contoh-salah", "Contoh Salah", salah),
      detail("contoh-betul", "Contoh Betul", betul),
      detail("tip-mengelakkan", "Tip Mengelakkan", tip),
    ],
  };
}

export const bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KESALAHAN LAZIM",
  summary:
    "Mengenal pasti kesalahan lebih awal membantu menghasilkan penulisan yang tepat, gramatis, tersusun dan menepati kehendak soalan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu?",
      penerangan:
        "Kesalahan lazim ialah kesilapan yang sering dilakukan semasa menghasilkan karangan sehingga menjejaskan markah bahasa dan isi.",
      punca:
        "Kurang memahami soalan, tidak merancang karangan, lemah tatabahasa dan kurang menyemak jawapan.",
      salah: "Terus menulis selepas membaca soalan sekali tanpa mengenal pasti tugasan dan fokus.",
      betul:
        "Fahami kehendak soalan, rancang isi, tulis dengan bahasa gramatis dan semak jawapan sebelum selesai.",
      tip: "Kenal pasti jenis kesalahan yang kerap dilakukan dan gunakan senarai semak untuk membaikinya.",
    }),
    lesson({
      id: "memahami-soalan",
      label: "Kesalahan Memahami Soalan",
      penerangan:
        "Murid gagal mengenal pasti kehendak sebenar soalan lalu menulis fokus yang salah.",
      punca: "Tidak menggariskan kata kunci serta tidak membezakan tema daripada fokus tugasan.",
      salah:
        "Soalan: ‘Huraikan langkah mengatasi pencemaran.’ Salah: Menulis tentang punca pencemaran.",
      betul:
        "Menulis langkah-langkah mengatasi pencemaran, seperti memperketat penguatkuasaan dan meningkatkan pendidikan alam sekitar.",
      tip: "Gariskan kata kunci, kenal pasti tema dan tentukan fokus sebelum merancang isi.",
    }),
    lesson({
      id: "isi",
      label: "Kesalahan Isi",
      penerangan:
        "Isi yang terlalu umum atau tidak berkaitan gagal menjawab kehendak soalan dengan khusus.",
      punca:
        "Tidak memadankan setiap isi dengan fokus soalan dan tidak menyatakan tindakan yang konkrit.",
      salah:
        "“Semua orang perlu bekerjasama.” Pernyataan ini terlalu umum dan tidak menjelaskan tindakan.",
      betul:
        "“Masyarakat boleh menyertai gotong-royong bagi memastikan kawasan perumahan sentiasa bersih.” Jawapan ini lebih relevan kerana menyatakan pihak, tindakan dan tujuan yang berkaitan.",
      tip: "Uji setiap isi dengan soalan: adakah isi ini menjawab fokus secara langsung dan khusus?",
    }),
    lesson({
      id: "huraian",
      label: "Kesalahan Huraian",
      penerangan:
        "Huraian yang tidak lengkap hanya menyatakan isi tanpa menerangkan sebab, cara atau kesannya.",
      punca:
        "Berhenti selepas menulis ayat isi dan tidak mengembangkan hubungan sebab serta akibat.",
      salah: "“Bersukan penting.” Ayat ini belum menerangkan sebab kepentingannya.",
      betul:
        "“Bersukan penting kerana dapat meningkatkan kesihatan fizikal serta mengurangkan risiko penyakit.”",
      tip: "Kembangkan isi dengan menjawab: Mengapa? Bagaimana? Apakah kesannya?",
    }),
    lesson({
      id: "contoh",
      label: "Kesalahan Contoh",
      penerangan:
        "Contoh perlu praktikal, realistik dan benar-benar menyokong isi yang dihuraikan.",
      punca:
        "Memilih contoh secara rawak tanpa menilai kemampuan pihak atau kesesuaiannya dengan situasi.",
      salah:
        "“Sekolah membina hospital.” Contoh ini tidak praktikal dalam konteks peranan sekolah.",
      betul:
        "“Sekolah mengadakan ceramah kesihatan.” Contoh ini munasabah dan boleh dilaksanakan oleh pihak sekolah.",
      tip: "Semak siapa melakukan tindakan, sama ada tindakan itu realistik dan bagaimana contoh menyokong isi.",
    }),
    lesson({
      id: "organisasi",
      label: "Kesalahan Organisasi",
      penerangan:
        "Karangan perlu mempunyai pendahuluan, isi dan penutup serta susunan idea dan perenggan yang jelas—bukan dinilai melalui kiraan perkataan semata-mata.",
      punca:
        "Tidak merancang urutan idea, mencampurkan beberapa isi dalam satu perenggan atau mengulang isi.",
      salah:
        "Isi ditulis secara rawak, perenggan bercampur dan penutup memperkenalkan idea baharu.",
      betul:
        "Pendahuluan memperkenalkan fokus, perenggan isi disusun secara logik dan penutup merumuskan keseluruhan karangan.",
      tip: "Semak lima unsur: pendahuluan, isi, penutup, susunan idea dan pembahagian perenggan.",
    }),
    lesson({
      id: "tatabahasa",
      label: "Kesalahan Tatabahasa",
      penerangan:
        "Tatabahasa meliputi susunan ayat, imbuhan dan bentuk kata yang menjadikan maksud tepat serta gramatis.",
      punca:
        "Terpengaruh oleh susunan bahasa lain atau tidak memahami bentuk imbuhan dan kata ganti nama diri.",
      salah:
        "“Buku itu dibaca oleh saya.” Kata ganti nama diri pertama tidak sesuai digunakan selepas ‘oleh’ dalam bentuk ini. Ejaan salah: “memperuntukan”.",
      betul:
        "“Buku itu saya baca.” Kata ganti nama diri pertama hadir sebelum kata kerja pasif. Ejaan betul: “memperuntukkan” kerana kata dasar ‘untuk’ menerima apitan memper-...-kan.",
      tip: "Baca ayat penuh, semak subjek dan kata kerja, kemudian periksa bentuk imbuhan pada kata dasar.",
    }),
    lesson({
      id: "kosa-kata",
      label: "Kesalahan Kosa Kata",
      penerangan:
        "Perkataan yang tepat dan semula jadi lebih berkesan daripada perkataan lanjutan yang digunakan dengan maksud atau susunan yang salah.",
      punca: "Memilih kata kerana kedengaran sukar tanpa memahami makna dan konteks penggunaannya.",
      salah: "“Fenomena ini sangat signifikan marcapada.” Susunan dan penggunaan katanya janggal.",
      betul: "“Pada masa ini fenomena tersebut semakin membimbangkan.” Maksudnya jelas dan tepat.",
      tip: "Utamakan perkataan yang tepat sebelum perkataan lanjutan dan semak penggunaannya dalam ayat.",
    }),
    lesson({
      id: "penanda-wacana",
      label: "Kesalahan Penanda Wacana",
      penerangan:
        "Penanda wacana menunjukkan hubungan antara idea dan perlu dipilih mengikut fungsi sebenar.",
      punca: "Menghafal satu penanda sahaja atau menukar penanda tanpa memahami hubungan maknanya.",
      salah:
        "Memulakan beberapa perenggan berturut-turut dengan “Selain itu... Selain itu... Selain itu...”.",
      betul:
        "Selain itu dan Di samping itu menambah isi; Seterusnya meneruskan urutan; Tambahan pula menambah hujah; Akhir sekali memperkenalkan isi terakhir.",
      tip: "Variasikan penanda mengikut fungsi dan bina peralihan semula jadi apabila penanda tidak diperlukan.",
    }),
    lesson({
      id: "peribahasa",
      label: "Kesalahan Peribahasa",
      penerangan:
        "Peribahasa mesti tepat susunannya, betul maksudnya dan menyokong isi secara semula jadi.",
      punca: "Menghafal secara tidak lengkap atau memasukkan peribahasa hanya sebagai hiasan.",
      salah:
        "“Bagai aur dengan sungai.” Kesalahan lain ialah menggunakan peribahasa yang tidak berkaitan.",
      betul:
        "“Bagai aur dengan tebing.” Pilih peribahasa ini apabila isi menerangkan kerjasama yang saling membantu.",
      tip: "Gunakan peribahasa hanya jika maksudnya difahami dan hubungannya dengan isi dapat dijelaskan.",
    }),
    lesson({
      id: "ejaan-tanda-baca",
      label: "Kesalahan Ejaan & Tanda Baca",
      penerangan:
        "Ejaan dan tanda baca yang betul memisahkan perkataan, menandai bentuk angka dan menjelaskan sempadan ayat.",
      punca: "Tidak membezakan kata majmuk, imbuhan, kata sendi nama dan penggunaan tanda sempang.",
      salah: "“kosakata”, “ke 21” dan “diSekolah”.",
      betul:
        "“kosa kata” dieja terpisah; “ke-21” menggunakan tanda sempang bagi bilangan tingkat; “di sekolah” dipisahkan kerana ‘di’ ialah kata sendi nama tempat.",
      tip: "Semak huruf besar, noktah, koma, tanda sempang dan jarak antara kata selepas menyemak isi.",
    }),
    lesson({
      id: "menyemak-jawapan",
      label: "Kesalahan Menyemak Jawapan",
      penerangan:
        "Ramai murid selesai menulis tetapi tidak membaca semula untuk mengesan kesalahan bahasa atau isi yang terkeluar daripada tajuk.",
      punca:
        "Tidak membaca semula, tidak membetulkan ejaan dan tatabahasa, tidak menyedari isi terkeluar tajuk serta terus menghantar jawapan.",
      salah: "Menghantar jawapan sebaik sahaja ayat terakhir ditulis tanpa sebarang semakan.",
      betul:
        "Baca semula keseluruhan jawapan dan baiki kehendak soalan, isi, ayat, ejaan serta tanda baca apabila masa mengizinkan.",
      tip: "Luangkan beberapa minit untuk membaca semula kerja apabila masa mengizinkan.",
    }),
    lesson({
      id: "cara-mengelakkan",
      label: "Cara Mengelakkan Kesalahan",
      penerangan:
        "Proses yang teratur membantu mencegah kesalahan sejak perancangan hingga semakan akhir.",
      punca:
        "Menulis tanpa proses tetap dan cuba membetulkan semua perkara hanya selepas karangan selesai.",
      salah: "Baca sepintas lalu, terus menulis, campurkan idea dan tamat tanpa semakan.",
      betul:
        "1. Fahami soalan dahulu. 2. Rancang isi. 3. Tulis secara teratur. 4. Gunakan bahasa yang gramatis. 5. Semak semula sebelum selesai.",
      tip: "Jadikan lima langkah ini rutin setiap kali menghasilkan penulisan.",
    }),
    lesson({
      id: "senarai-semak",
      label: "Senarai Semak",
      penerangan:
        "Senarai semak memastikan isi, bahasa dan struktur dinilai sebelum jawapan dimuktamadkan.",
      punca: "Semakan dibuat secara tergesa-gesa atau hanya menumpukan satu jenis kesalahan.",
      salah:
        "Menyemak ejaan sahaja tetapi mengabaikan kehendak soalan, isi, huraian dan organisasi.",
      betul:
        "✓ Menjawab kehendak soalan • ✓ Isi relevan • ✓ Huraian lengkap • ✓ Contoh sesuai • ✓ Ayat gramatis • ✓ Penanda wacana sesuai • ✓ Kosa kata tepat • ✓ Ejaan betul • ✓ Tanda baca betul • ✓ Penutup lengkap",
      tip: "Semak satu kategori pada satu masa dan tandai setiap perkara selepas disahkan.",
    }),
    lesson({
      id: "uasa",
      label: "Tip UASA",
      penerangan:
        "Kejelasan dan ketepatan jawapan bermula dengan pemahaman arahan serta perancangan yang baik.",
      punca:
        "Terlalu bergantung pada ayat hafalan atau tergesa-gesa sehingga arahan dan semakan diabaikan.",
      salah: "Memaksa peribahasa atau kosa kata sukar walaupun tidak sesuai dengan tugasan.",
      betul:
        "Baca arahan dengan teliti, rancang isi, gunakan bahasa yang jelas, pilih kosa kata tepat, gunakan peribahasa jika sesuai dan semak semula jawapan.",
      tip: "Ikuti semua arahan yang diberikan dalam kertas peperiksaan.",
    }),
  ],
};

