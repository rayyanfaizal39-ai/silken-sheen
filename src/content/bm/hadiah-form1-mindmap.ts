import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-hadiah";

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

export const bahasaMelayuTingkatan1HadiahMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "HADIAH",
  summary:
    "Cerpen yang menonjolkan kehidupan sebuah keluarga yang berhadapan dengan cabaran serta memperlihatkan nilai kasih sayang, ketabahan dan tanggungjawab.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Hadiah ialah sebuah cerpen dalam antologi Kuingin Berterima Kasih.",
      ),
      node(
        "sinopsis-hari-guru",
        "Hari Guru Semakin Hampir",
        "Azizah, murid daripada keluarga miskin, mahu menyediakan hadiah untuk Cikgu Zaleha sebagai tanda penghargaan.",
      ),
      node(
        "sinopsis-kekangan",
        "Wang Tidak Mencukupi",
        "Rakan-rakannya berbual tentang hadiah mahal, tetapi wang tabung Azizah tidak cukup dan dia tidak mahu membebankan keluarganya.",
      ),
      node(
        "sinopsis-cadangan",
        "Cadangan Ibu",
        "Ibu Azizah mencadangkan supaya Azizah menghasilkan hadiah buatan tangan yang sesuai dengan kemampuan keluarga.",
      ),
      node(
        "sinopsis-tudung-saji",
        "Menghasilkan Tudung Saji",
        "Azizah menerima cadangan itu lalu membuat tudung saji dengan tekun, kreatif dan bersungguh-sungguh.",
      ),
      node(
        "sinopsis-hadiah",
        "Hadiah untuk Cikgu Zaleha",
        "Pada Hari Guru, Azizah memberikan tudung saji buatannya kepada Cikgu Zaleha. Guru itu melihat bakat di sebalik usaha Azizah.",
      ),
      node(
        "sinopsis-kejayaan",
        "Kejayaan sebagai Hadiah Sebenar",
        "Cikgu Zaleha menggalakkan Azizah menyertai pertandingan kraftangan. Azizah menjadi juara, dan kejayaannya menjadi hadiah yang paling bermakna kepada gurunya.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "PENGHARGAAN TERHADAP GURU DAN KEGIGIHAN MENCAPAI KEJAYAAN", [
        node(
          "tema-huraian",
          "Huraian",
          "Azizah menghargai gurunya dengan usaha yang ikhlas walaupun keluarganya miskin. Kreativiti dan kegigihannya membawanya kepada kejayaan.",
        ),
        node(
          "tema-bukti",
          "Peristiwa Sokongan",
          "Azizah menghasilkan tudung saji untuk Cikgu Zaleha, kemudian menjadi juara pertandingan kraftangan selepas menerima galakan gurunya.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema cerpen Hadiah ialah penghargaan terhadap guru dan kegigihan mencapai kejayaan. Hal ini dapat dilihat apabila Azizah membuat tudung saji untuk Cikgu Zaleha dan kemudian berjaya dalam pertandingan kraftangan.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      node(
        "persoalan-kemiskinan",
        "Kemiskinan Bukan Penghalang Kejayaan",
        "Azizah tetap menghasilkan hadiah dan menjadi juara pertandingan kraftangan walaupun keluarganya miskin dan wang tabungnya tidak cukup.",
      ),
      node(
        "persoalan-guru",
        "Kepentingan Menghargai Guru",
        "Azizah mahu memberi hadiah sempena Hari Guru kerana menghargai jasa Cikgu Zaleha.",
      ),
      node(
        "persoalan-keluarga",
        "Sokongan Keluarga",
        "Ibu memberi idea hadiah buatan tangan, manakala keluarga memberi sokongan moral kepada Azizah.",
      ),
      node(
        "persoalan-bakat",
        "Bakat Perlu Digilap",
        "Cikgu Zaleha melihat bakat Azizah dan menggalakkannya menyertai pertandingan kraftangan.",
      ),
      node(
        "persoalan-kreativiti",
        "Kreativiti Membawa Kejayaan",
        "Tudung saji buatan tangan membuktikan kreativiti Azizah dan membuka jalan kepada kejayaannya.",
      ),
    ]),
    branch("watak", "Watak & Perwatakan", [
      branch("watak-azizah", "Azizah — Watak Utama", [
        node(
          "azizah-rajin",
          "Rajin",
          "Azizah berusaha menghasilkan tudung saji untuk Cikgu Zaleha.",
        ),
        node(
          "azizah-kreatif",
          "Kreatif",
          "Azizah mampu menghasilkan hadiah buatan tangan dengan idea dan kemahirannya sendiri.",
        ),
        node(
          "azizah-gigih",
          "Tidak Mudah Berputus Asa",
          "Azizah tetap mencari cara menghargai gurunya walaupun wang tabungnya tidak mencukupi.",
        ),
        node(
          "azizah-rendah-diri",
          "Rendah Diri",
          "Azizah pada mulanya kurang yakin, tetapi memberanikan diri menyertai pertandingan selepas menerima galakan.",
        ),
        node(
          "azizah-hormat",
          "Menghargai Guru",
          "Azizah memberikan tudung saji dan menjadikan kejayaannya sebagai tanda penghargaan kepada Cikgu Zaleha.",
        ),
      ]),
      branch("watak-zaleha", "Cikgu Zaleha", [
        node(
          "zaleha-prihatin",
          "Prihatin",
          "Cikgu Zaleha melihat kesungguhan dan potensi Azizah di sebalik hadiah buatan tangan itu.",
        ),
        node(
          "zaleha-motivasi",
          "Memberi Motivasi",
          "Beliau menggalakkan Azizah menyertai pertandingan kraftangan.",
        ),
        node(
          "zaleha-bakat",
          "Menghargai Bakat Murid",
          "Beliau tidak memandang rendah tudung saji, sebaliknya membantu Azizah mengembangkan bakatnya.",
        ),
      ]),
      branch("watak-ibu", "Ibu Azizah", [
        node(
          "ibu-bijaksana",
          "Bijaksana",
          "Ibu mencadangkan hadiah buatan tangan yang sesuai dengan kemampuan keluarga.",
        ),
        node(
          "ibu-menyokong",
          "Menyokong",
          "Ibu membantu Azizah mencari jalan keluar ketika wang tabungnya tidak cukup.",
        ),
        node(
          "ibu-kreatif",
          "Kreatif",
          "Cadangannya membolehkan Azizah menghasilkan hadiah sendiri.",
        ),
      ]),
      branch("watak-ayah", "Ayah Azizah", [
        node(
          "ayah-penyayang",
          "Penyayang",
          "Ayah memberi sokongan moral kepada Azizah walaupun keluarga mereka hidup sederhana.",
        ),
        node(
          "ayah-bertanggungjawab",
          "Bertanggungjawab",
          "Ayah menyokong Azizah mengikut kemampuan keluarga.",
        ),
      ]),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Azizah berasal daripada keluarga miskin dan mahu menyediakan hadiah apabila Hari Guru semakin hampir.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Perbualan rakan-rakan tentang hadiah mahal membuat Azizah sedar bahawa wang tabungnya tidak mencukupi.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Azizah mahu menghargai Cikgu Zaleha tetapi tidak mampu membeli hadiah mahal dan tidak mahu membebankan ibu bapanya. Ibu kemudian mencadangkan hadiah buatan tangan.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Azizah menghasilkan dan memberikan tudung saji buatannya kepada Cikgu Zaleha.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Cikgu Zaleha menggalakkan Azizah menyertai pertandingan kraftangan. Azizah menjadi juara dan kejayaannya menjadi hadiah sebenar kepada gurunya.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      node(
        "teknik-plot-tidak-disahkan",
        "Teknik Khusus Tidak Disahkan",
        "Sumber projek mengesahkan urutan plot, tetapi tidak menyediakan teks cerpen atau bukti yang mencukupi untuk menamakan dialog, pemerian, imbas kembali, monolog, saspens atau teknik lain.",
      ),
      node(
        "teknik-plot-jawapan",
        "Cara Menjawab dengan Selamat",
        "Namakan teknik plot hanya jika soalan memberikan petikan atau jika teknik itu dapat dibuktikan daripada teks sebenar. Gunakan TEKNIK + BUKTI tanpa mereka-reka petikan.",
      ),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      node(
        "latar-tempat-tidak-disahkan",
        "Lokasi Khusus Tidak Disahkan",
        "Sumber projek menerangkan peristiwa Hari Guru dan pertandingan kraftangan tetapi tidak menamakan lokasi khusus. Oleh itu, tempat seperti rumah atau sekolah tidak ditambah sebagai fakta.",
      ),
    ]),
    branch("latar-masa", "Latar Masa", [
      node(
        "latar-masa-menjelang",
        "Menjelang Hari Guru",
        "Azizah mula memikirkan hadiah, manakala rakan-rakannya berbual tentang hadiah yang mahu diberikan.",
      ),
      node(
        "latar-masa-hari-guru",
        "Pada Hari Guru",
        "Azizah memberikan tudung saji buatannya kepada Cikgu Zaleha.",
      ),
      node(
        "latar-masa-tidak-khusus",
        "Masa Lain Tidak Dinyatakan",
        "Sumber projek tidak mengesahkan tarikh, waktu jam, pagi, petang atau malam bagi peristiwa lain.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      node(
        "masyarakat-kesusahan",
        "Masyarakat yang Menghadapi Kesusahan Hidup",
        "Keluarga Azizah hidup miskin sehingga wang tabungnya tidak cukup untuk membeli hadiah mahal.",
      ),
      node(
        "masyarakat-guru",
        "Masyarakat yang Menghargai Guru",
        "Azizah mahu memberikan hadiah kepada Cikgu Zaleha sebagai tanda penghargaan.",
      ),
      node(
        "masyarakat-keluarga",
        "Masyarakat yang Saling Menyokong dalam Keluarga",
        "Ibu memberi idea dan keluarga memberikan sokongan moral kepada Azizah.",
      ),
      node(
        "masyarakat-pendidik",
        "Masyarakat Pendidik yang Mengembangkan Bakat",
        "Cikgu Zaleha melihat potensi Azizah dan menggalakkannya menyertai pertandingan kraftangan.",
      ),
      node(
        "masyarakat-gigih",
        "Masyarakat yang Rajin dan Kreatif",
        "Azizah menghasilkan tudung saji dengan usaha sendiri dan mengembangkan bakatnya hingga berjaya.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      node(
        "gaya-bahasa-tiada-teks",
        "Bukti Teks Tidak Tersedia",
        "Sumber projek tidak menyediakan teks cerpen atau petikan yang membolehkan gaya bahasa seperti simile, metafora, personifikasi, repetisi atau bahasa asing disahkan.",
      ),
      node(
        "gaya-bahasa-jangan-reka",
        "Jangan Mereka-reka Contoh",
        "Nyatakan gaya bahasa hanya berdasarkan petikan sebenar yang diberikan dalam soalan atau teks antologi.",
      ),
    ]),
    branch("nilai", "Nilai", [
      node(
        "nilai-rajin",
        "Rajin",
        "Azizah tekun menghasilkan tudung saji sebagai hadiah Hari Guru.",
      ),
      node(
        "nilai-gigih",
        "Gigih",
        "Azizah tidak berputus asa walaupun wang tabungnya tidak cukup.",
      ),
      node(
        "nilai-bersyukur",
        "Bersyukur",
        "Azizah menerima keadaan keluarganya tanpa menyalahkan mereka, lalu terus berusaha.",
      ),
      node(
        "nilai-hormat",
        "Menghormati Guru",
        "Azizah mahu menghargai jasa Cikgu Zaleha melalui hadiah dan kejayaannya.",
      ),
      node(
        "nilai-kreatif",
        "Kreatif",
        "Azizah menghasilkan tudung saji buatan tangan sebagai penyelesaian kepada kekurangan wang.",
      ),
      node(
        "nilai-tanggungjawab",
        "Bertanggungjawab",
        "Azizah melaksanakan usaha dan penyertaannya dalam pertandingan dengan bersungguh-sungguh.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-guru",
        "Kita Hendaklah Menghargai Jasa Guru",
        "Azizah menghargai Cikgu Zaleha melalui tudung saji dan kejayaannya.",
      ),
      node(
        "pengajaran-gigih",
        "Kita Hendaklah Gigih Menghadapi Kesusahan",
        "Azizah tetap berusaha walaupun keluarganya miskin dan wang tabungnya tidak mencukupi.",
      ),
      node(
        "pengajaran-kreatif",
        "Kita Hendaklah Menggunakan Kreativiti untuk Menyelesaikan Masalah",
        "Azizah membuat hadiah sendiri setelah menerima cadangan ibunya.",
      ),
      node(
        "pengajaran-bakat",
        "Kita Hendaklah Menyokong Bakat Orang Lain",
        "Cikgu Zaleha memberi galakan sehingga Azizah yakin menyertai pertandingan kraftangan.",
      ),
      node(
        "pengajaran-ibu-bapa",
        "Kita Hendaklah Menghormati Ibu Bapa",
        "Azizah menerima cadangan ibunya untuk menghasilkan hadiah buatan tangan.",
      ),
      node(
        "pengajaran-rendah-diri",
        "Kita Hendaklah Rendah Diri Walaupun Berjaya",
        "Kejayaan Azizah menjadi tanda terima kasih kepada guru yang membimbingnya.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      node(
        "peristiwa-1",
        "1 — Hari Guru Semakin Hampir",
        "Azizah mula memikirkan hadiah untuk Cikgu Zaleha.",
      ),
      node(
        "peristiwa-2",
        "2 — Rakan-rakan Berbual tentang Hadiah",
        "Azizah mendengar rakan-rakannya merancang hadiah yang lebih mahal.",
      ),
      node(
        "peristiwa-3",
        "3 — Tabung Tidak Mencukupi",
        "Azizah sedih kerana wang simpanannya tidak cukup untuk membeli hadiah.",
      ),
      node(
        "peristiwa-4",
        "4 — Ibu Memberi Cadangan",
        "Ibu mencadangkan supaya Azizah menghasilkan hadiah buatan tangan.",
      ),
      node(
        "peristiwa-5",
        "5 — Azizah Membuat Tudung Saji",
        "Azizah menghasilkan tudung saji dengan tekun dan kreatif.",
      ),
      node(
        "peristiwa-6",
        "6 — Tudung Saji Diberikan",
        "Azizah memberikan hasil tangannya kepada Cikgu Zaleha pada Hari Guru.",
      ),
      node(
        "peristiwa-7",
        "7 — Bakat Azizah Dicungkil",
        "Cikgu Zaleha melihat bakat Azizah lalu menggalakkannya menyertai pertandingan kraftangan.",
      ),
      node(
        "peristiwa-8",
        "8 — Azizah Menjadi Juara",
        "Kejayaan Azizah dalam pertandingan menjadi hadiah sebenar kepada Cikgu Zaleha.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-tema",
        "Tema: TEMA + BUKTI PERISTIWA",
        "Nyatakan idea utama, kemudian kaitkan dengan Azizah yang menghasilkan tudung saji dan berjaya dalam pertandingan kraftangan.",
      ),
      node(
        "jawab-persoalan",
        "Persoalan: PERSOALAN + BUKTI",
        "Contoh: persoalan kemiskinan bukan penghalang kejayaan; Azizah tetap menjadi juara walaupun keluarganya miskin.",
      ),
      node(
        "jawab-watak",
        "Watak: SIFAT + PERISTIWA",
        "Gunakan sifat yang tepat. Contoh: Azizah kreatif kerana menghasilkan tudung saji buatan tangan.",
      ),
      node(
        "jawab-latar",
        "Latar: LATAR + PERISTIWA",
        "Nyatakan latar yang disahkan dan hubungkannya dengan peristiwa. Jangan meneka lokasi atau masa yang tiada dalam sumber.",
      ),
      node(
        "jawab-nilai",
        "Nilai: NILAI + PERISTIWA",
        "Contoh: nilai kegigihan apabila Azizah terus berusaha walaupun wang tabungnya tidak cukup.",
      ),
      node(
        "jawab-pengajaran",
        "Pengajaran: KITA HENDAKLAH... + BUKTI",
        "Contoh: Kita hendaklah menyokong bakat orang lain seperti Cikgu Zaleha yang menggalakkan Azizah menyertai pertandingan.",
      ),
      node(
        "jawab-teknik-plot",
        "Teknik Plot: TEKNIK + BUKTI",
        "Gunakan teknik yang dapat dikenal pasti daripada petikan sebenar. Jangan cipta dialog atau bukti.",
      ),
      branch("peta-ingatan", "HADIAH — PETA INGATAN", [
        node(
          "ingat-watak",
          "WATAK UTAMA — AZIZAH",
          "Murid daripada keluarga miskin yang mahu menghargai Cikgu Zaleha.",
        ),
        node(
          "ingat-cabaran",
          "CABARAN — WANG TIDAK CUKUP",
          "Azizah tidak mampu membeli hadiah mahal dan tidak mahu membebankan keluarganya.",
        ),
        node(
          "ingat-tindakan",
          "TINDAKAN — MEMBUAT TUDUNG SAJI",
          "Azizah menerima cadangan ibu dan menggunakan kreativiti serta usaha sendiri.",
        ),
        node(
          "ingat-penting",
          "PERISTIWA PENTING — GALAKAN GURU",
          "Cikgu Zaleha melihat bakat Azizah dan menggalakkannya menyertai pertandingan kraftangan.",
        ),
        node(
          "ingat-klimaks",
          "KLIMAKS — HADIAH BUATAN TANGAN",
          "Azizah menghasilkan dan memberikan tudung saji kepada Cikgu Zaleha.",
        ),
        node(
          "ingat-peleraian",
          "PELERAIAN — AZIZAH MENJADI JUARA",
          "Kejayaan dalam pertandingan menjadi hadiah sebenar kepada Cikgu Zaleha.",
        ),
        node(
          "ingat-rumus",
          "TEMA + NILAI + PENGAJARAN",
          "Penghargaan kepada guru dan kegigihan + rajin, kreatif, menghormati guru + kita hendaklah gigih dan menghargai jasa guru.",
        ),
      ]),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-cerita-penuh",
        "Menceritakan Keseluruhan Cerita",
        "Jawab hanya perkara yang ditanya dan pilih peristiwa paling relevan sebagai bukti.",
      ),
      node(
        "salah-sifat",
        "Sifat Tanpa Bukti",
        "Salah: ‘Watak itu tabah.’ Lebih baik: SIFAT + PERISTIWA SOKONGAN yang tepat.",
      ),
      node(
        "salah-nilai-pengajaran",
        "Nilai dan Pengajaran Sama",
        "Nilai ialah kata nama seperti kegigihan. Pengajaran berbentuk ayat: Kita hendaklah gigih menghadapi cabaran.",
      ),
      node(
        "salah-tema",
        "Tema Terlalu Umum",
        "Elakkan ‘cerita tentang kehidupan’. Tema perlu menyatakan penghargaan terhadap guru dan kegigihan mencapai kejayaan.",
      ),
      node(
        "salah-latar",
        "Latar Tanpa Peristiwa",
        "Jangan sekadar menamakan latar; hubungkannya dengan peristiwa yang benar-benar berlaku.",
      ),
      node(
        "salah-persoalan",
        "Persoalan Tanpa Bukti",
        "Huraikan persoalan dan kaitkannya dengan peristiwa dalam cerpen.",
      ),
      node(
        "salah-petikan",
        "Mereka-reka Petikan",
        "Jangan cipta dialog atau baris daripada cerpen untuk membuktikan teknik plot atau gaya bahasa.",
      ),
      node(
        "salah-peristiwa",
        "Mereka-reka Peristiwa",
        "Gunakan hanya peristiwa yang disahkan, seperti tudung saji, galakan Cikgu Zaleha dan pertandingan kraftangan.",
      ),
    ]),
  ],
};
