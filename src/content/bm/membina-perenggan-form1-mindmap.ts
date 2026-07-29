import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-membina-perenggan";

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
  return branch(id, label, [
    node(`${id}-penerangan`, "Penerangan", penerangan),
    node(`${id}-langkah`, "Langkah-langkah", langkah),
    node(`${id}-contoh`, "Contoh", contoh),
    node(`${id}-tip`, "Tip Penulisan", tip),
    node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
  ]);
}

export const bahasaMelayuForm1MembinaPerengganMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "MEMBINA PERENGGAN",
  summary:
    "Kemahiran membina satu perenggan yang mempunyai idea utama, huraian, contoh dan penegasan yang saling berkaitan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Perenggan?",
      penerangan:
        "Perenggan ialah sekumpulan ayat yang membincangkan satu idea utama. Semua ayat perlu saling berkaitan, manakala idea utama yang baharu perlu dimulakan dalam perenggan baharu.",
      langkah:
        "1. Tentukan satu idea utama • 2. Nyatakan idea • 3. Terangkan sebab atau cara • 4. Berikan contoh • 5. Nyatakan kesan atau penegasan • 6. Semak kaitan semua ayat.",
      contoh:
        "Murid perlu mengamalkan budaya membaca pada waktu lapang. Hal ini demikian kerana membaca dapat menambahkan ilmu pengetahuan dan meluaskan kosa kata. Sebagai contoh, murid boleh membaca buku ilmiah di pusat sumber sekolah. Tegasnya, amalan membaca membantu murid menjadi lebih berpengetahuan.",
      tip: "Gunakan satu perenggan untuk satu idea utama, hubungkan setiap ayat dan gunakan penanda wacana yang tepat.",
      kesalahan:
        "Mencampurkan beberapa idea yang tidak berkaitan atau menulis satu ayat isi sahaja tanpa huraian, contoh dan penegasan.",
    }),
    lesson({
      id: "struktur",
      label: "Struktur Perenggan",
      penerangan:
        "Struktur asas ialah Ayat Topik → Ayat Huraian → Ayat Contoh → Ayat Penegas. Struktur ini selari dengan pengembangan Isi → Mengapa → Bagaimana → Contoh → Kesan → Kesimpulan kecil.",
      langkah:
        "1. Tulis ayat topik • 2. Jawab mengapa atau bagaimana • 3. Berikan contoh relevan • 4. Nyatakan kesan jika sesuai • 5. Akhiri dengan penegasan • 6. Semak kesinambungan ayat.",
      contoh:
        "Topik: Kita perlu menjimatkan air. Huraian: Sumber air bersih semakin berkurangan. Contoh: Tutup paip apabila tidak digunakan dan baiki paip bocor. Kesan: Bekalan air dapat dijimatkan. Penegas: Tegasnya, penjimatan air ialah tanggungjawab bersama.",
      tip: "Rancang dalam bentuk kata kunci dahulu. Pilih unsur yang sesuai dengan tugasan dan jangan gunakan formula secara kaku.",
      kesalahan:
        "Ayat topik tersasar, huraian hanya mengulang isi, contoh tidak berkaitan atau ayat penegas memperkenalkan isi baharu.",
    }),
    lesson({
      id: "ayat-topik",
      label: "Ayat Topik",
      penerangan:
        "Ayat topik menyatakan idea utama sesuatu perenggan. Ayat ini perlu menjawab fokus tugasan, membawa satu idea yang jelas dan boleh dikembangkan.",
      langkah:
        "1. Kenal pasti fokus • 2. Pilih satu isi • 3. Tukarkan isi kepada ayat lengkap • 4. Gunakan kata kerja yang jelas • 5. Pastikan ayat boleh dihuraikan.",
      contoh:
        "Fokus: langkah menjaga kebersihan sekolah. Ayat topik: Selain itu, pihak sekolah boleh mengadakan aktiviti gotong-royong secara berkala.",
      tip: "Gunakan isi daripada rangka, tulis secara terus dan pastikan ayat mempunyai subjek serta predikat. Penanda seperti “Selain itu” atau “Seterusnya” boleh digunakan bagi isi baharu.",
      kesalahan:
        "Ayat terlalu umum seperti “Kebersihan sangat penting”, mengandungi terlalu banyak isi atau tidak menjawab kata tugas.",
    }),
    lesson({
      id: "ayat-huraian",
      label: "Ayat Huraian",
      penerangan:
        "Ayat huraian menerangkan ayat topik dengan menjawab mengapa idea itu penting, bagaimana idea dilaksanakan atau apakah kesannya.",
      langkah:
        "1. Baca ayat topik • 2. Tanya mengapa, bagaimana atau apakah kesannya • 3. Pilih jawapan paling berkaitan • 4. Bina ayat lengkap • 5. Gunakan penanda wacana • 6. Semak fokus.",
      contoh:
        "Topik: Sekolah boleh mengadakan gotong-royong. Mengapa: Aktiviti ini memupuk sikap bertanggungjawab. Bagaimana: Murid dibahagikan kepada kumpulan untuk membersihkan kelas, kantin dan kawasan lapang. Kesan: Sekolah menjadi bersih dan selesa.",
      tip: "Gunakan “Hal ini demikian kerana” untuk sebab, “Antara caranya” untuk cara dan “Dengan itu” untuk kesan. Setiap ayat mesti menambah maklumat baharu.",
      kesalahan:
        "Mengulang ayat topik dengan perkataan lain, memberikan huraian yang tidak berkaitan atau menulis ayat tergantung.",
    }),
    lesson({
      id: "ayat-contoh",
      label: "Ayat Contoh",
      penerangan:
        "Ayat contoh memberikan gambaran khusus tentang isi dan huraian. Contoh perlu relevan, logik, jelas, mudah difahami dan tidak terlalu panjang.",
      langkah:
        "1. Kenal pasti perkara yang dihuraikan • 2. Fikirkan situasi sesuai • 3. Pilih contoh yang menyokong isi • 4. Gunakan “Sebagai contoh”, “Contohnya” atau “Misalnya” • 5. Tulis ayat lengkap • 6. Semak kaitannya.",
      contoh:
        "Isi: Murid perlu mengamalkan budaya membaca. Contoh: Sebagai contoh, murid boleh membaca buku ilmiah dan bahan bacaan bermutu di pusat sumber sekolah.",
      tip: "Pilih contoh yang dekat dengan kehidupan murid jika sesuai. Satu contoh yang jelas lebih baik daripada beberapa contoh yang tidak berkaitan.",
      kesalahan:
        "Contoh terlalu umum, hanya mengulang isi atau membincangkan perkara yang tidak menyokong huraian.",
    }),
    lesson({
      id: "ayat-penegas",
      label: "Ayat Penegas",
      penerangan:
        "Ayat penegas menutup perenggan dengan menguatkan atau merumuskan idea utama. Fungsinya berkaitan dengan kesan dan kesimpulan kecil.",
      langkah:
        "1. Baca semula ayat topik • 2. Kenal pasti mesej utama • 3. Rumuskan dengan perkataan berbeza • 4. Nyatakan kepentingan atau kesan • 5. Gunakan “Tegasnya” atau “Jelaslah bahawa” • 6. Pastikan tiada isi baharu.",
      contoh:
        "Tegasnya, kitar semula merupakan langkah mudah yang memberikan kesan besar terhadap kelestarian alam sekitar.",
      tip: "Gunakan ayat ringkas tetapi bermakna, kembali kepada idea utama dan bezakan penegasan perenggan daripada kesimpulan keseluruhan penulisan.",
      kesalahan:
        "Memperkenalkan isi baharu, menulis penegasan terlalu umum seperti “Perkara ini sangat penting” atau menggunakan penanda penambahan untuk menutup perenggan.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan berlaku apabila idea tidak jelas, ayat tidak saling berkaitan atau bahasa tidak digunakan dengan betul. Akibatnya, pembaca sukar mengikuti penulisan.",
      langkah:
        "1. Gariskan ayat topik • 2. Tentukan idea utama • 3. Semak kaitan setiap ayat • 4. Tandakan pengulangan • 5. Cari huraian dan contoh • 6. Semak bahasa • 7. Pastikan ada penegasan.",
      contoh:
        "Lemah: Murid perlu rajin membaca. Murid hendaklah banyak membaca. Murid mesti sentiasa membaca. Pembetulan: Kekalkan satu ayat topik, kemudian tambah sebab, contoh dan kesan.",
      tip: "Gunakan semakan Satu Idea, Empat Ayat: adakah topik menyatakan idea, huraian menerangkan, contoh menyokong dan penegas menutup idea?",
      kesalahan:
        "Tiada ayat topik, isi tanpa huraian, isi berulang, tiada penanda wacana, tiada pembahagian perenggan, ayat tergantung, bahasa pasar, ejaan atau tanda baca salah.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan T-H-C-P: T — Topik, H — Huraian, C — Contoh, P — Penegas. Formula ini boleh dikembangkan dengan IMBAK: Isi, Mengapa, Bagaimana, Akibat/Kesan dan Kesimpulan kecil.",
      langkah:
        "1. Tulis T-H-C-P pada rangka • 2. Catat satu kata kunci bagi setiap huruf • 3. Tukarkan kepada ayat lengkap • 4. Tambah penanda wacana • 5. Semak kaitan ayat.",
      contoh:
        "Kitar semula: T — amalkan kitar semula • H — kurangkan sampah dan jimat sumber • C — asingkan plastik, kertas dan kaca • P — langkah mudah, kesan besar.",
      tip: "Hafal fungsi, bukan ayat contoh. Gunakan soalan Apa? Mengapa? Bagaimana? Contoh? Kesan? dan bayangkan setiap ayat sebagai satu rantai.",
      kesalahan:
        "Menggunakan formula secara kaku, menghafal contoh tanpa menyesuaikannya, memilih penanda wacana secara rawak atau memaksa semua unsur hingga perenggan meleret.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Perenggan UASA yang baik menepati tugasan serta mempunyai isi jelas, huraian lengkap, contoh relevan dan bahasa yang betul. Panjang semata-mata tidak menjamin kualiti.",
      langkah:
        "Sebelum: baca soalan, kenal pasti fokus dan rangka T-H-C-P • Semasa: tulis topik, huraian, contoh, kesan dan penegasan • Selepas: semak fokus, pengulangan, ayat lengkap, bahasa baku, ejaan, tanda baca dan pembahagian perenggan.",
      contoh:
        "Salah satu langkah menjaga kebersihan sekolah ialah mengadakan gotong-royong secara berkala. Hal ini dapat memupuk sikap bertanggungjawab dalam kalangan murid. Sebagai contoh, murid boleh membersihkan kelas, kantin dan kawasan lapang. Tegasnya, gotong-royong mewujudkan sekolah yang bersih dan selesa.",
      tip: "Jawab kata tugas, gunakan kosa kata dan penanda wacana yang tepat, pilih contoh khusus, simpan masa untuk semakan dan gunakan ungkapan menarik hanya jika sesuai.",
      kesalahan:
        "Menulis tanpa rangka, isi tersasar, menyenaraikan isi tanpa huraian, contoh terlalu umum, penanda wacana rawak, seluruh jawapan dalam satu perenggan, tiada penegasan atau tiada semakan.",
    }),
  ],
};
