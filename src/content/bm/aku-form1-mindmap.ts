import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-aku";

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

export const bahasaMelayuTingkatan1AkuMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "Aku",
  children: [
    branch("jenis-karya", "Jenis Karya", [
      node(
        "jenis-karya-sajak",
        "Sajak",
        '"Aku" ialah sebuah sajak. Murid perlu memahami mesej, persoalan, nilai dan pengajaran yang disampaikan melalui bahasa puitis.',
      ),
    ]),
    branch("tema", "Tema", [
      node(
        "tema-perjuangan",
        "Semangat perjuangan dan keberanian",
        "Sajak mengetengahkan semangat seseorang yang berani menghadapi cabaran dan terus berjuang untuk mencapai matlamat.",
      ),
      node(
        "tema-ketabahan",
        "Ketabahan menghadapi dugaan",
        "Penyajak menunjukkan keteguhan hati untuk meneruskan perjuangan walaupun berhadapan dengan kesukaran.",
      ),
    ]),
    branch("persoalan", "Persoalan", [
      node(
        "persoalan-keberanian",
        "Keberanian menghadapi cabaran",
        "Seseorang perlu mempunyai keberanian ketika menghadapi kesukaran dalam kehidupan.",
      ),
      node(
        "persoalan-ketabahan",
        "Ketabahan dalam perjuangan",
        "Cabaran tidak seharusnya menyebabkan seseorang mudah menyerah kalah.",
      ),
      node(
        "persoalan-keazaman",
        "Keazaman mencapai matlamat",
        "Matlamat memerlukan usaha yang bersungguh-sungguh dan semangat yang kuat.",
      ),
      node(
        "persoalan-keyakinan",
        "Keyakinan diri",
        "Keyakinan terhadap kemampuan diri membantu seseorang menghadapi cabaran dengan lebih berani.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node("bentuk-sajak", "Sajak", "Karya ini disampaikan dalam bentuk sajak."),
      node(
        "bentuk-rangkap",
        "Rangkap",
        "Idea dan perasaan penyajak disusun dalam beberapa rangkap.",
      ),
      node(
        "bentuk-baris",
        "Baris",
        "Setiap rangkap dibina daripada baris-baris sajak yang menyampaikan idea secara ringkas dan puitis.",
      ),
      node(
        "bentuk-bahasa-padat",
        "Bahasa padat",
        "Sajak menggunakan bahasa yang ringkas tetapi membawa maksud yang lebih luas.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      node(
        "gaya-bahasa-puitis",
        "Bahasa puitis",
        "Pemilihan kata digunakan untuk memberikan kesan yang kuat terhadap perasaan dan mesej sajak.",
      ),
      node(
        "gaya-bahasa-pengulangan",
        "Pengulangan",
        "Pengulangan kata atau idea boleh digunakan untuk memberikan penegasan terhadap sesuatu mesej.",
      ),
      node(
        "gaya-bahasa-imejan",
        "Imejan",
        "Bahasa yang digunakan dapat membantu pembaca membayangkan keadaan, tindakan atau perasaan yang disampaikan.",
      ),
      node(
        "gaya-bahasa-figuratif",
        "Bahasa figuratif",
        "Ungkapan tertentu boleh membawa maksud yang lebih luas daripada makna literalnya.",
      ),
    ]),
    branch("nilai", "Nilai", [
      node("nilai-keberanian", "Keberanian", "Kita perlu berani menghadapi cabaran."),
      node("nilai-ketabahan", "Ketabahan", "Kita perlu tabah ketika berhadapan dengan kesukaran."),
      node(
        "nilai-kegigihan",
        "Kegigihan",
        "Usaha perlu diteruskan dengan bersungguh-sungguh sehingga matlamat dapat dicapai.",
      ),
      node(
        "nilai-keyakinan",
        "Keyakinan",
        "Seseorang perlu yakin terhadap kemampuan diri sendiri.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-berani",
        "Berani menghadapi cabaran",
        "Kita hendaklah berani menghadapi cabaran dan tidak mudah berasa takut.",
      ),
      node(
        "pengajaran-jangan-berputus-asa",
        "Jangan mudah berputus asa",
        "Kita hendaklah terus berusaha walaupun menghadapi kesukaran.",
      ),
      node(
        "pengajaran-berusaha",
        "Berusaha mencapai matlamat",
        "Kita mestilah mempunyai keazaman dan berusaha dengan bersungguh-sungguh untuk mencapai cita-cita.",
      ),
      node(
        "pengajaran-yakin",
        "Yakin terhadap diri",
        "Kita perlu mempunyai keyakinan diri ketika membuat keputusan dan menghadapi cabaran.",
      ),
    ]),
    branch("maksud-rangkap", "Maksud Rangkap", [
      node(
        "maksud-rangkap-idea-utama",
        "Kenal pasti idea utama",
        "Baca keseluruhan rangkap dan tentukan perkara utama yang ingin disampaikan oleh penyajak.",
      ),
      node(
        "maksud-rangkap-tafsir",
        "Tafsir bahasa puitis",
        "Tukarkan bahasa puitis kepada bahasa yang lebih mudah tanpa mengubah maksud asal.",
      ),
      node(
        "maksud-rangkap-hubungkan",
        "Hubungkan baris",
        "Jangan mentafsir setiap baris secara terasing. Hubungkan maksud antara baris untuk memahami keseluruhan rangkap.",
      ),
      node(
        "maksud-rangkap-ayat-sendiri",
        "Tulis dengan ayat sendiri",
        "Jawapan hendaklah menggunakan ayat yang jelas dan gramatis, bukan sekadar menyalin baris sajak.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "teknik-menjawab-kehendak",
        "Baca kehendak soalan",
        "Kenal pasti sama ada soalan meminta tema, persoalan, nilai, pengajaran, gaya bahasa atau maksud rangkap.",
      ),
      node(
        "teknik-menjawab-isi",
        "Berikan isi tepat",
        "Jawab perkara yang diminta sahaja dan elakkan memasukkan fakta yang tidak berkaitan.",
      ),
      node(
        "teknik-menjawab-bukti",
        "Gunakan bukti teks jika diperlukan",
        "Jika soalan meminta bukti, kaitkan jawapan dengan peristiwa, idea atau bahasa yang terdapat dalam karya.",
      ),
      node(
        "teknik-menjawab-ayat-lengkap",
        "Gunakan ayat lengkap",
        "Jawapan perlu ditulis menggunakan ayat yang gramatis dan mudah difahami.",
      ),
      node(
        "teknik-menjawab-bezakan",
        "Bezakan nilai dan pengajaran",
        'Nilai biasanya ditulis sebagai kata atau frasa seperti "keberanian", manakala pengajaran ditulis sebagai tindakan seperti "Kita hendaklah berani menghadapi cabaran."',
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-lazim-tema-persoalan",
        "Keliru tema dengan persoalan",
        "Tema ialah idea utama keseluruhan karya, manakala persoalan ialah idea sampingan yang dikembangkan dalam karya.",
      ),
      node(
        "kesalahan-lazim-nilai-pengajaran",
        "Keliru nilai dengan pengajaran",
        "Nilai ialah sifat positif, manakala pengajaran ialah perkara yang sepatutnya dilakukan atau dielakkan.",
      ),
      node(
        "kesalahan-lazim-menyalin",
        "Menyalin tanpa menjelaskan",
        "Menyalin baris sajak sahaja tidak semestinya menjawab soalan. Murid perlu menerangkan maksud berdasarkan kehendak soalan.",
      ),
      node(
        "kesalahan-lazim-umum",
        "Jawapan terlalu umum",
        'Jawapan seperti "kita mesti menjadi baik" terlalu umum. Jawapan perlu dikaitkan dengan mesej karya.',
      ),
      node(
        "kesalahan-lazim-bukti",
        "Mereka-reka bukti",
        "Jangan mencipta petikan, peristiwa atau fakta yang tidak terdapat dalam karya.",
      ),
    ]),
  ],
};
