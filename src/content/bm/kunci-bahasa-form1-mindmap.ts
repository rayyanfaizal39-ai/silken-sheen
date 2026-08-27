import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-kunci-bahasa";

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

export const bahasaMelayuTingkatan1KunciBahasaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KUNCI BAHASA",
  summary:
    "Sajak menonjolkan peranan bahasa dalam kehidupan manusia melalui kesantunan, perkembangan bahasa, hubungan sesama manusia, komunikasi dan keindahan ungkapan.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      node(
        "maksud-rangkap-1",
        "Rangkap 1 — Maruah Bahasa",
        "Penggunaan bahasa yang baik dan santun mencerminkan maruah serta keperibadian seseorang. BAHASA → KESANTUNAN → MARUAH.",
      ),
      node(
        "maksud-rangkap-2",
        "Rangkap 2 — Bahasa Berkembang",
        "Bahasa berkembang mengikut perubahan zaman dan keperluan masyarakat. BAHASA → DINAMIK → BERKEMBANG.",
      ),
      node(
        "maksud-rangkap-3",
        "Rangkap 3 — Bahasa dan Sejarah",
        "Bahasa mempunyai hubungan dengan sejarah dan perkembangan masyarakat dari satu zaman ke zaman yang lain. BAHASA → SEJARAH → WARISAN.",
      ),
      node(
        "maksud-rangkap-4",
        "Rangkap 4 — Bahasa Menghubungkan Manusia",
        "Bahasa menjadi penghubung yang membantu manusia menjalin hubungan dan persaudaraan. BAHASA → HUBUNGAN → PERSAUDARAAN.",
      ),
      node(
        "maksud-rangkap-5",
        "Rangkap 5 — Bahasa sebagai Alat Komunikasi",
        "Bahasa membolehkan manusia menyampaikan fikiran, maklumat dan perasaan. BAHASA → KOMUNIKASI.",
      ),
      node(
        "maksud-rangkap-6",
        "Rangkap 6 — Keindahan Bahasa",
        "Bahasa yang disusun dengan baik menghasilkan ungkapan yang indah dan berkesan. BAHASA → KEINDAHAN → UNGKAPAN.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "PERANAN DAN KEPENTINGAN BAHASA DALAM KEHIDUPAN", [
        node(
          "tema-huraian",
          "Huraian",
          "Bahasa penting sebagai alat komunikasi, lambang kesantunan dan maruah, penghubung sesama manusia serta wahana yang sentiasa berkembang.",
        ),
        node(
          "tema-jawapan-murid",
          "Jawapan Murid",
          "Tema sajak Kunci Bahasa ialah peranan dan kepentingan bahasa dalam kehidupan manusia. Bahasa digunakan untuk berkomunikasi, menjalinkan hubungan serta mencerminkan kesantunan penuturnya.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      node(
        "persoalan-kesantunan",
        "Kesantunan Berbahasa",
        "Bahasa hendaklah digunakan dengan sopan supaya tidak menyinggung perasaan orang lain. IDEA / RANGKAP SOKONGAN: Rangkap 1 — Maruah Bahasa.",
      ),
      node(
        "persoalan-perkembangan",
        "Perkembangan Bahasa",
        "Bahasa berkembang seiring dengan perubahan zaman. IDEA / RANGKAP SOKONGAN: Rangkap 2 — Bahasa Berkembang.",
      ),
      node(
        "persoalan-penghubung",
        "Bahasa sebagai Penghubung",
        "Bahasa membantu mengeratkan hubungan antara manusia. IDEA / RANGKAP SOKONGAN: Rangkap 4 — Bahasa Menghubungkan Manusia.",
      ),
      node(
        "persoalan-komunikasi",
        "Kepentingan Komunikasi",
        "Bahasa membolehkan manusia menyampaikan fikiran dan maklumat. IDEA / RANGKAP SOKONGAN: Rangkap 5 — Bahasa sebagai Alat Komunikasi.",
      ),
      node(
        "persoalan-keindahan",
        "Keindahan Bahasa",
        "Bahasa boleh disusun secara kreatif untuk menghasilkan ungkapan yang indah. IDEA / RANGKAP SOKONGAN: Rangkap 6 — Keindahan Bahasa.",
      ),
      node(
        "persoalan-martabat",
        "Martabat Bahasa",
        "Penggunaan bahasa yang baik membantu memelihara maruah dan kedudukannya. IDEA / RANGKAP SOKONGAN: Rangkap 1 — Maruah Bahasa.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-sajak",
        "Sajak",
        "Karya ini ialah puisi moden. Kunci Bahasa ialah karya Abdul Hadi Yusof dalam antologi Kuingin Berterima Kasih.",
      ),
      node("bentuk-enam-rangkap", "Enam Rangkap", "Sajak mengandungi enam rangkap."),
      node(
        "bentuk-rangkap-ringkas",
        "Rangkap Ringkas",
        "Setiap rangkap menyampaikan satu idea utama tentang bahasa.",
      ),
      node(
        "bentuk-bahasa-padat",
        "Bahasa Padat",
        "Penyajak menggunakan ungkapan ringkas untuk membawa maksud yang luas.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      node(
        "gaya-bahasa-pengulangan",
        "Pengulangan",
        "Konsep bahasa diulang untuk menegaskan kepentingannya.",
      ),
      node(
        "gaya-bahasa-kiasan",
        "Bahasa Kiasan",
        "Ungkapan tertentu membawa maksud yang lebih luas daripada makna literal.",
      ),
      node(
        "gaya-bahasa-diksi",
        "Diksi",
        "Pemilihan kata berkaitan maruah, hubungan, komunikasi dan keindahan menguatkan mesej sajak.",
      ),
      node(
        "gaya-bahasa-imejan-abstrak",
        "Imejan Abstrak",
        "Bahasa digambarkan melalui konsep seperti maruah, sejarah, hubungan dan keindahan.",
      ),
    ]),
    branch("peranan-bahasa", "Peranan Bahasa", [
      branch("peranan-bahasa-ringkasan", "BAHASA", [
        node(
          "peranan-bahasa-maruah",
          "Menjaga Maruah",
          "Bahasa yang santun mencerminkan keperibadian penutur.",
        ),
        node(
          "peranan-bahasa-zaman",
          "Berkembang Mengikut Zaman",
          "Bahasa berubah dan berkembang mengikut keperluan masyarakat.",
        ),
        node(
          "peranan-bahasa-warisan",
          "Warisan dan Sejarah",
          "Bahasa menjadi sebahagian daripada identiti dan perkembangan masyarakat.",
        ),
        node(
          "peranan-bahasa-hubungan",
          "Menghubungkan Manusia",
          "Bahasa membantu membina hubungan dan persaudaraan.",
        ),
        node(
          "peranan-bahasa-komunikasi",
          "Alat Komunikasi",
          "Bahasa digunakan untuk menyampaikan idea, maklumat dan perasaan.",
        ),
        node(
          "peranan-bahasa-keindahan",
          "Keindahan",
          "Bahasa boleh digunakan secara kreatif dan puitis.",
        ),
      ]),
    ]),
    branch("nilai", "Nilai", [
      node("nilai-kesopanan", "Kesopanan", "Menggunakan bahasa dengan santun."),
      node(
        "nilai-hormat",
        "Hormat-menghormati",
        "Menjaga tutur kata ketika berkomunikasi dengan orang lain.",
      ),
      node(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Menggunakan dan memelihara bahasa dengan baik.",
      ),
      node(
        "nilai-menghargai",
        "Menghargai Bahasa",
        "Menyedari kepentingan bahasa dalam kehidupan.",
      ),
      node(
        "nilai-persaudaraan",
        "Persaudaraan",
        "Menggunakan bahasa untuk mengeratkan hubungan sesama manusia.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-sopan",
        "Kita Hendaklah Menggunakan Bahasa dengan Sopan",
        "Bahasa yang baik mencerminkan keperibadian.",
      ),
      node(
        "pengajaran-martabat",
        "Kita Hendaklah Menjaga Martabat Bahasa",
        "Bahasa perlu digunakan dengan betul dan dihargai.",
      ),
      node(
        "pengajaran-hubungan",
        "Kita Hendaklah Menggunakan Bahasa untuk Mengeratkan Hubungan",
        "Komunikasi yang baik membantu mewujudkan keharmonian.",
      ),
      node(
        "pengajaran-mengembangkan",
        "Kita Hendaklah Mengembangkan Bahasa",
        "Bahasa perlu terus digunakan seiring dengan perkembangan zaman.",
      ),
      node(
        "pengajaran-keindahan",
        "Kita Hendaklah Menghargai Keindahan Bahasa",
        "Bahasa boleh digunakan untuk menyampaikan idea secara menarik dan berkesan.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-tegas",
        "TEGAS",
        "Penyajak menyampaikan kepentingan dan fungsi bahasa secara jelas dan yakin.",
      ),
      node(
        "nada-menghargai",
        "MENGHARGAI BAHASA",
        "Sajak juga menyampaikan penghargaan terhadap nilai dan keindahan bahasa.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      branch("kata-kunci-enam-idea", "KUNCI BAHASA — 6 IDEA", [
        node("kata-kunci-1", "1. MARUAH"),
        node("kata-kunci-2", "2. BERKEMBANG"),
        node("kata-kunci-3", "3. SEJARAH"),
        node("kata-kunci-4", "4. HUBUNGAN"),
        node("kata-kunci-5", "5. KOMUNIKASI"),
        node("kata-kunci-6", "6. KEINDAHAN"),
      ]),
      branch("kata-kunci-mesej", "MESEJ UTAMA", [
        node(
          "kata-kunci-mesej-bahasa",
          "BAHASA",
          "SANTUN + BERMARUAH + BERKEMBANG + MENGHUBUNGKAN + BERKOMUNIKASI + INDAH",
        ),
      ]),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "teknik-menjawab-maksud",
        "Maksud Rangkap",
        "IDEA UTAMA + PARAFRASA MUDAH. Jangan salin sajak secara bulat-bulat.",
      ),
      node("teknik-menjawab-tema", "Tema", "TEMA + 2 fungsi bahasa yang relevan."),
      node("teknik-menjawab-persoalan", "Persoalan", "PERSOALAN + IDEA SOKONGAN."),
      node("teknik-menjawab-nilai", "Nilai", "NILAI + HURAIAN."),
      node(
        "teknik-menjawab-pengajaran",
        "Pengajaran",
        '"Kita hendaklah..." + TINDAKAN / PENGAJARAN.',
      ),
      node(
        "teknik-menjawab-gaya-bahasa",
        "Gaya Bahasa",
        "TEKNIK + BUKTI YANG DISAHKAN. Jangan reka bukti.",
      ),
      node("teknik-menjawab-nada", "Nada", "NADA + SEBAB."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-lazim-tema-sempit",
        "Tema Terlalu Sempit",
        'SALAH: "Bahasa untuk bercakap." LEBIH BAIK: "Peranan dan kepentingan bahasa dalam kehidupan."',
      ),
      node(
        "kesalahan-lazim-tema-persoalan",
        "Tema = Persoalan",
        "Jangan ulang perkataan yang sama.",
      ),
      node(
        "kesalahan-lazim-salin-rangkap",
        "Maksud Rangkap Disalin Bulat-bulat",
        "Gunakan parafrasa.",
      ),
      node(
        "kesalahan-lazim-nilai-pengajaran",
        "Nilai = Pengajaran",
        "Bezakan kedua-duanya. NILAI: Kesopanan. PENGAJARAN: Kita hendaklah menggunakan bahasa dengan sopan.",
      ),
      node(
        "kesalahan-lazim-berkembang-literal",
        '"Bahasa Berkembang" Ditafsir Secara Literal',
        "Maksudnya, bahasa berubah dan berkembang mengikut masyarakat dan zaman.",
      ),
      node(
        "kesalahan-lazim-kiasan-literal",
        "Bahasa Kiasan Ditafsir Secara Literal",
        "Gunakan konteks.",
      ),
      node(
        "kesalahan-lazim-gaya-direka",
        "Gaya Bahasa Direka",
        "Jangan namakan teknik tanpa bukti.",
      ),
      node(
        "kesalahan-lazim-petikan-direka",
        "Petikan Direka",
        "Jangan sekali-kali mereka-reka baris daripada sajak.",
      ),
    ]),
  ],
};
