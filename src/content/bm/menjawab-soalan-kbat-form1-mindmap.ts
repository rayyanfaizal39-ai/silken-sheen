import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-menjawab-soalan-kbat";

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

export const bahasaMelayuTingkatan1MenjawabSoalanKbatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "SOALAN KBAT",
  summary:
    "Soalan KBAT memerlukan murid berfikir secara kritis, memberikan pendapat yang logik serta menyokong jawapan dengan alasan yang munasabah.",
  children: [
    branch("apa-itu", "Apa Itu KBAT?", [
      node(
        "apa-itu-maksud",
        "Maksud KBAT",
        "KBAT ialah kemahiran menggunakan maklumat dalam petikan untuk membuat analisis, memberikan pendapat, menyelesaikan masalah dan membuat keputusan.",
      ),
      node("apa-itu-berfikir", "Berfikir", "Fahami situasi sebelum memilih jawapan."),
      node(
        "apa-itu-menganalisis",
        "Menganalisis",
        "Teliti maklumat, sebab, kesan dan hubungan antara idea.",
      ),
      node(
        "apa-itu-menghubungkan",
        "Menghubungkan Idea",
        "Kaitkan maklumat petikan dengan situasi yang relevan.",
      ),
      node(
        "apa-itu-alasan",
        "Memberi Alasan",
        "Terangkan sebab pendapat atau tindakan itu munasabah.",
      ),
      node(
        "apa-itu-kesimpulan",
        "Membuat Kesimpulan",
        "Rumuskan keputusan yang disokong oleh maklumat dan alasan.",
      ),
    ]),
    branch("jenis-soalan", "Jenis Soalan", [
      node(
        "jenis-pendapat",
        "Pada Pendapat Anda...",
        "Nyatakan pandangan sendiri yang logik dan berkaitan dengan situasi.",
      ),
      node(
        "jenis-tindakan",
        "Apakah Tindakan yang Wajar...",
        "Cadangkan tindakan yang sesuai, praktikal dan bertanggungjawab.",
      ),
      node(
        "jenis-bagaimana",
        "Bagaimanakah...",
        "Terangkan cara, langkah atau proses untuk mencapai sesuatu tujuan.",
      ),
      node(
        "jenis-bersetuju",
        "Mengapakah Anda Bersetuju...",
        "Nyatakan pendirian dan berikan sebab yang menyokongnya.",
      ),
      node(
        "jenis-cadangkan",
        "Cadangkan...",
        "Kemukakan penyelesaian yang boleh dilakukan dalam situasi tersebut.",
      ),
      node(
        "jenis-ramalkan",
        "Ramalkan...",
        "Jangkakan perkara yang mungkin berlaku berdasarkan petunjuk dan hubungan sebab-akibat.",
      ),
    ]),
    branch("pendapat", "Memberi Pendapat", [
      node("pendapat-logik", "Logik", "Pendapat mesti masuk akal dan boleh diterangkan."),
      node(
        "pendapat-berkaitan",
        "Berkaitan",
        "Jawapan mesti menepati situasi dan kehendak soalan.",
      ),
      node("pendapat-sopan", "Sopan", "Gunakan bahasa yang baik dan hormati pihak lain."),
      node(
        "pendapat-situasi",
        "Berdasarkan Situasi",
        "Gunakan maklumat dalam petikan sebagai asas tanpa mengubah faktanya.",
      ),
      branch("pendapat-contoh", "Contoh", [
        node("pendapat-soalan", "Soalan", "Pada pendapat anda, mengapakah murid perlu membaca?"),
        node(
          "pendapat-jawapan",
          "Jawapan",
          "Pada pendapat saya, murid perlu membaca kerana membaca dapat menambah ilmu pengetahuan.",
        ),
        node(
          "pendapat-kekuatan",
          "Kekuatan Jawapan",
          "Pendapat dinyatakan dengan jelas dan disokong oleh alasan yang munasabah.",
        ),
      ]),
    ]),
    branch("alasan", "Memberi Alasan", [
      node(
        "alasan-sokongan",
        "Setiap Pendapat Perlu Sokongan",
        "Pendapat tanpa sebab belum menunjukkan pemikiran yang lengkap.",
      ),
      branch("alasan-formula", "Formula", [
        node("alasan-formula-pendapat", "Pendapat", "Nyatakan pandangan atau pendirian."),
        node("alasan-formula-kerana", "Kerana", "Hubungkan pendapat dengan sebab."),
        node("alasan-formula-alasan", "Alasan", "Terangkan sebab yang logik."),
        node("alasan-formula-kesan", "Kesan", "Jelaskan hasil atau manfaat yang mungkin berlaku."),
      ]),
      node(
        "alasan-contoh",
        "Contoh",
        "Saya bersetuju kerana amalan membaca dapat meningkatkan pengetahuan dan membantu murid memperoleh keputusan yang lebih baik.",
      ),
      node(
        "alasan-semak",
        "Semak Hubungan",
        "Pastikan alasan benar-benar menerangkan pendapat dan kesan merupakan hasil yang munasabah.",
      ),
    ]),
    branch("cadangan", "Memberi Cadangan", [
      node(
        "cadangan-praktikal",
        "Cadangan Praktikal",
        "Cadangan mestilah boleh dilaksanakan oleh pihak yang dinyatakan dalam soalan.",
      ),
      node(
        "cadangan-kempen",
        "Mengadakan Kempen Membaca",
        "Sesuai dilakukan oleh sekolah atau komuniti.",
      ),
      node(
        "cadangan-bahan",
        "Menambah Bahan Bacaan",
        "Sediakan bahan yang menarik dan sesuai dengan murid.",
      ),
      node(
        "cadangan-keluarga",
        "Membaca Bersama Keluarga",
        "Ibu bapa boleh menggalakkan anak membaca bersama di rumah.",
      ),
      node(
        "cadangan-realistik",
        "Elakkan Cadangan Tidak Realistik",
        "Jangan cadangkan tindakan yang mustahil, terlalu umum atau di luar kemampuan pihak berkenaan.",
      ),
      node(
        "cadangan-siapa",
        "Nyatakan Pelaksana",
        "Jelaskan siapa yang perlu bertindak dan tindakan yang patut dilakukan.",
      ),
    ]),
    branch("hubung-kait", "Menghubung Kait", [
      node("hubung-petikan", "Petikan", "Mulakan dengan maklumat dan situasi yang diberikan."),
      node(
        "hubung-pengalaman",
        "Pengalaman",
        "Gunakan pengalaman yang relevan untuk menjelaskan idea, bukan menggantikan fakta petikan.",
      ),
      node(
        "hubung-masyarakat",
        "Masyarakat",
        "Kaitkan kesan atau tindakan dengan kehidupan bermasyarakat.",
      ),
      node("hubung-sekolah", "Sekolah", "Pertimbangkan peranan murid, guru dan pihak sekolah."),
      node("hubung-keluarga", "Keluarga", "Pertimbangkan peranan ibu bapa dan ahli keluarga."),
      node(
        "hubung-fakta",
        "Kekalkan Fakta",
        "Hubungan tambahan mesti relevan dan tidak mengubah orang, tindakan atau peristiwa dalam petikan.",
      ),
    ]),
    branch("sokongan", "Menyokong Jawapan", [
      node("sokongan-contoh", "Contoh", "Berikan contoh yang jelas dan berkaitan."),
      node("sokongan-sebab", "Sebab", "Terangkan mengapa pendapat itu munasabah."),
      node("sokongan-kesan", "Kesan", "Nyatakan hasil yang mungkin berlaku."),
      node("sokongan-situasi", "Situasi", "Kaitkan jawapan dengan keadaan dalam petikan."),
      branch("sokongan-lemah", "Jawapan Lemah", [
        node("sokongan-lemah-jawapan", "Hanya Pendirian", "“Saya setuju.”"),
        node(
          "sokongan-lemah-sebab",
          "Mengapa Lemah?",
          "Tiada sebab, contoh, kesan atau kaitan dengan situasi.",
        ),
      ]),
      node(
        "sokongan-kuat",
        "Jawapan Kukuh",
        "Nyatakan pendirian, kemudian sokong dengan sekurang-kurangnya satu unsur yang relevan seperti sebab, contoh atau kesan.",
      ),
    ]),
    branch("formula", "Formula Jawapan", [
      branch("formula-satu", "Formula 1", [
        node(
          "formula-satu-bentuk",
          "Pendapat + Alasan",
          "Sesuai untuk soalan ringkas yang meminta sebab atau persetujuan.",
        ),
        node(
          "formula-satu-contoh",
          "Contoh",
          "Saya bersetuju kerana aktiviti gotong-royong dapat menjaga kebersihan sekolah.",
        ),
      ]),
      branch("formula-dua", "Formula 2", [
        node(
          "formula-dua-bentuk",
          "Pendapat + Alasan + Contoh",
          "Sesuai apabila contoh dapat menjelaskan cara pendapat itu dilaksanakan.",
        ),
        node(
          "formula-dua-contoh",
          "Contoh",
          "Murid perlu menggunakan teknologi secara berhemah kerana penggunaannya membantu pembelajaran, contohnya mencari bahan rujukan daripada sumber yang dipercayai.",
        ),
      ]),
      branch("formula-tiga", "Formula 3", [
        node(
          "formula-tiga-bentuk",
          "Pendapat + Alasan + Kesan",
          "Sesuai apabila soalan meminta manfaat, akibat atau hasil sesuatu tindakan.",
        ),
        node(
          "formula-tiga-contoh",
          "Contoh",
          "Masyarakat perlu mengitar semula kerana amalan itu mengurangkan sisa, lalu alam sekitar menjadi lebih bersih.",
        ),
      ]),
      node(
        "formula-pilih",
        "Pilih Mengikut Soalan",
        "Gunakan formula yang paling sesuai dengan kata tugas dan kehendak soalan.",
      ),
    ]),
    branch("contoh-kbat", "Contoh KBAT", [
      branch("contoh-pendidikan", "Pendidikan", [
        node(
          "contoh-pendidikan-soalan",
          "Soalan",
          "Bagaimanakah murid boleh meningkatkan pencapaian pelajaran?",
        ),
        node(
          "contoh-pendidikan-jawapan",
          "Jawapan Contoh",
          "Murid boleh menyediakan jadual belajar kerana pengurusan masa yang baik membantu mereka mengulang kaji secara konsisten.",
        ),
        node(
          "contoh-pendidikan-kuat",
          "Mengapa Jawapan Kuat?",
          "Cadangan boleh dilakukan, alasannya logik dan kesannya berkaitan dengan pembelajaran.",
        ),
      ]),
      branch("contoh-kebersihan", "Kebersihan", [
        node(
          "contoh-kebersihan-soalan",
          "Soalan",
          "Apakah tindakan yang wajar untuk menjaga kebersihan kelas?",
        ),
        node(
          "contoh-kebersihan-jawapan",
          "Jawapan Contoh",
          "Murid wajar mematuhi jadual bertugas supaya kelas sentiasa bersih dan selesa digunakan.",
        ),
        node(
          "contoh-kebersihan-kuat",
          "Mengapa Jawapan Kuat?",
          "Tindakan, alasan dan kesan dinyatakan secara jelas serta praktikal.",
        ),
      ]),
      branch("contoh-teknologi", "Teknologi", [
        node(
          "contoh-teknologi-soalan",
          "Soalan",
          "Pada pendapat anda, bagaimanakah teknologi membantu murid?",
        ),
        node(
          "contoh-teknologi-jawapan",
          "Jawapan Contoh",
          "Teknologi membantu murid mendapatkan bahan pembelajaran dengan cepat, contohnya melalui perpustakaan digital yang dipercayai.",
        ),
        node(
          "contoh-teknologi-kuat",
          "Mengapa Jawapan Kuat?",
          "Pendapat disokong oleh manfaat dan contoh yang khusus.",
        ),
      ]),
      branch("contoh-alam", "Alam Sekitar", [
        node("contoh-alam-soalan", "Soalan", "Cadangkan cara mengurangkan penggunaan plastik."),
        node(
          "contoh-alam-jawapan",
          "Jawapan Contoh",
          "Masyarakat boleh membawa beg guna semula kerana tindakan itu mengurangkan jumlah plastik yang dibuang.",
        ),
        node(
          "contoh-alam-kuat",
          "Mengapa Jawapan Kuat?",
          "Cadangan realistik serta mempunyai alasan dan kesan yang berkaitan.",
        ),
      ]),
      branch("contoh-persahabatan", "Persahabatan", [
        node(
          "contoh-persahabatan-soalan",
          "Soalan",
          "Apakah yang patut anda lakukan jika rakan menghadapi masalah?",
        ),
        node(
          "contoh-persahabatan-jawapan",
          "Jawapan Contoh",
          "Saya patut mendengar masalah rakan dan membantunya mendapatkan sokongan daripada orang dewasa yang dipercayai supaya masalah itu dapat ditangani dengan selamat.",
        ),
        node(
          "contoh-persahabatan-kuat",
          "Mengapa Jawapan Kuat?",
          "Tindakan bersesuaian, bertanggungjawab dan disokong oleh kesan yang munasabah.",
        ),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-pendapat",
        "Hanya Memberi Pendapat",
        "Jawapan menyatakan pandangan tetapi tidak menyokongnya.",
      ),
      node(
        "kesalahan-alasan",
        "Tiada Alasan",
        "Pembaca tidak tahu mengapa pendapat itu wajar diterima.",
      ),
      node(
        "kesalahan-logik",
        "Alasan Tidak Logik",
        "Sebab tidak mempunyai hubungan yang munasabah dengan pendapat.",
      ),
      node(
        "kesalahan-pendek",
        "Jawapan Terlalu Pendek",
        "Jawapan seperti “Saya setuju” tidak menunjukkan huraian.",
      ),
      node(
        "kesalahan-kaitan",
        "Jawapan Tidak Berkaitan",
        "Isi tidak menjawab kata tugas atau situasi yang diberikan.",
      ),
      node(
        "kesalahan-fakta",
        "Mengubah Fakta Petikan",
        "Jangan menukar watak, tindakan, tempat atau peristiwa asal.",
      ),
      node(
        "kesalahan-gramatis",
        "Bahasa Tidak Gramatis",
        "Gunakan ayat lengkap, jelas dan mudah difahami.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-pak", "Rumus PAK", [
        node("teknik-p", "P — Pendapat", "Nyatakan pandangan atau tindakan."),
        node("teknik-a", "A — Alasan", "Terangkan sebab yang logik."),
        node(
          "teknik-k",
          "K — Kesan atau Contoh",
          "Kukuhkan jawapan dengan hasil atau contoh yang relevan.",
        ),
      ]),
      branch("teknik-aliran", "Aliran Berfikir", [
        node("teknik-think", "Fikir", "Fahami situasi dan tentukan pendirian."),
        node("teknik-explain", "Jelaskan", "Berikan alasan yang munasabah."),
        node("teknik-support", "Sokong", "Tambah kesan, contoh atau kaitan dengan situasi."),
      ]),
      node(
        "teknik-semak",
        "Semak PAK",
        "Pastikan jawapan mempunyai pendapat, alasan dan sokongan yang saling berkaitan.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-baca", "Baca dengan Teliti", "Teliti soalan dan situasi sebelum menjawab."),
      node(
        "uasa-kehendak",
        "Kenal Pasti Kehendak",
        "Tandakan kata tugas seperti pendapat, tindakan, cara, sebab, cadangan atau ramalan.",
      ),
      node(
        "uasa-pendapat",
        "Pendapat Munasabah",
        "Pilih idea yang logik, berkaitan dan sesuai dengan situasi.",
      ),
      node("uasa-alasan", "Sertakan Alasan", "Jelaskan mengapa pendapat atau cadangan itu sesuai."),
      node("uasa-gramatis", "Ayat Gramatis", "Gunakan ayat lengkap dan bahasa yang sopan."),
      node(
        "uasa-semak",
        "Semak Semula",
        "Pastikan jawapan menjawab soalan, disokong dan tidak mengubah fakta petikan.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Soalan",
        "Jangan bergantung pada markah tetap, jumlah perkataan tetap atau janji skor. Ikuti arahan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
