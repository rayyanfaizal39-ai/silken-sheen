import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-hadiah-drama";

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

function evidence(id: string, label: string, proof: string): MindNode {
  return branch(id, label, [node(`${id}-bukti`, "Bukti Peristiwa", proof)]);
}

function explainedEvidence(
  id: string,
  label: string,
  explanation: string,
  proof: string,
): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Peristiwa", proof),
  ]);
}

export const bahasaMelayuTingkatan1HadiahDramaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "HADIAH",
  summary:
    "Drama ini mengetengahkan kehidupan keluarga yang menghadapi cabaran dengan tabah serta memperlihatkan pentingnya kasih sayang, tanggungjawab, pendidikan dan keprihatinan terhadap golongan yang memerlukan.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Hadiah ialah drama karya Aripin Said dalam antologi Kuingin Berterima Kasih. Topik ini berbeza daripada cerpen lain yang turut berjudul Hadiah.",
      ),
      node(
        "sinopsis-1",
        "1. Keluarga Kehilangan Tempat Bergantung",
        "Sarjan Akhbar gugur semasa bertugas mempertahankan negara. Isterinya, Fauziah, serta dua orang anak mereka, Hayati dan Farid, kemudian hidup dalam kesempitan bersama Pak Mail.",
      ),
      node(
        "sinopsis-2",
        "2. Pendidikan Hayati Terjejas",
        "Hayati belajar dan tinggal di asrama Sekolah Menengah Seri Setia, Melaka. Masalah kewangan serta baki yuran asrama sebanyak empat puluh ringgit mendorongnya pulang kerana tidak mahu menambahkan beban keluarga.",
      ),
      node(
        "sinopsis-3",
        "3. Keluarga Berusaha Mencari Jalan",
        "Pak Mail berusaha membantu persekolahan Hayati dengan memaklumkan masalah keluarga kepada Datuk Penghulu. Hayati pula telah menerangkan masalahnya kepada pengetua sekolah.",
      ),
      node(
        "sinopsis-4",
        "4. Keprihatinan Masyarakat",
        "Datuk Penghulu datang ke rumah Pak Mail bersama Encik Musa, seorang wakil Kementerian Pertahanan. Kedatangan mereka membuka jalan kepada penyelesaian masalah keluarga itu.",
      ),
      node(
        "sinopsis-5",
        "5. Penghargaan dan Bantuan",
        "Encik Musa menyampaikan cek bernilai RM10,000 kepada Fauziah sebagai penghargaan negara terhadap jasa Sarjan Akhbar dan untuk membantu persekolahan anak-anaknya.",
      ),
      node(
        "sinopsis-6",
        "6. Hadiah Membawa Harapan",
        "Bantuan itu meringankan beban keluarga. Pak Mail memberitahu Hayati bahawa dia dapat kembali ke asrama dan meneruskan pelajarannya dengan bersungguh-sungguh.",
      ),
    ]),
    branch("tema", "Tema", [
      branch(
        "tema-utama",
        "KETABAHAN MENGHADAPI KESUSAHAN HIDUP DAN PENGHARGAAN TERHADAP JASA PEJUANG NEGARA",
        [
          node(
            "tema-huraian",
            "Huraian",
            "Keluarga Sarjan Akhbar tabah menghadapi kehilangan dan kesempitan hidup. Bantuan yang diterima pula membuktikan bahawa pengorbanan seorang perajurit untuk negara wajar dihargai.",
          ),
          node(
            "tema-bukti-1",
            "Bukti Ketabahan",
            "Fauziah meneruskan kehidupan bersama anak-anaknya walaupun kehilangan suami dan menghadapi masalah kewangan.",
          ),
          node(
            "tema-bukti-2",
            "Bukti Penghargaan",
            "Encik Musa menyampaikan bantuan RM10,000 kepada Fauziah sebagai penghargaan terhadap jasa Sarjan Akhbar.",
          ),
          node(
            "tema-jawapan",
            "Jawapan Murid",
            "Tema drama Hadiah ialah ketabahan menghadapi kesusahan hidup dan penghargaan terhadap jasa pejuang negara. Hal ini dibuktikan apabila keluarga Sarjan Akhbar terus bertahan sebelum menerima bantuan penghargaan yang membolehkan Hayati meneruskan pelajaran.",
          ),
          node("tema-rantai", "Rantaian Tema", "KESUSAHAN + KETABAHAN + USAHA + BANTUAN + HARAPAN"),
        ],
      ),
    ]),
    branch("persoalan", "Persoalan", [
      explainedEvidence(
        "persoalan-kasih",
        "Kasih Sayang Keluarga",
        "Ahli keluarga mengambil berat tentang kebajikan dan masa depan satu sama lain.",
        "Hayati memikirkan beban ibunya, manakala Pak Mail berusaha memastikan cucunya dapat terus bersekolah.",
      ),
      explainedEvidence(
        "persoalan-tabah",
        "Ketabahan Menghadapi Kesusahan",
        "Kehilangan orang tersayang dan masalah kewangan perlu dihadapi tanpa mudah berputus asa.",
        "Fauziah terus menjaga keluarganya selepas kematian Sarjan Akhbar walaupun mereka hidup dalam kesempitan.",
      ),
      explainedEvidence(
        "persoalan-pendidikan",
        "Kepentingan Pendidikan",
        "Pendidikan perlu dipertahankan kerana menentukan masa depan generasi muda.",
        "Pak Mail, Datuk Penghulu dan Encik Musa membantu agar Hayati dapat kembali ke asrama dan meneruskan pelajaran.",
      ),
      explainedEvidence(
        "persoalan-tanggungjawab",
        "Tanggungjawab terhadap Keluarga dan Amanah",
        "Setiap orang perlu melaksanakan tanggungjawab terhadap keluarga atau tugas yang diamanahkan.",
        "Pak Mail berikhtiar membantu keluarga, manakala Encik Musa menjalankan amanah menyampaikan bantuan kepada Fauziah.",
      ),
      explainedEvidence(
        "persoalan-prihatin",
        "Keprihatinan terhadap Orang yang Susah",
        "Masyarakat perlu peka dan membantu golongan yang menghadapi kesempitan.",
        "Datuk Penghulu dan Pak Mail mencari bantuan bagi memastikan masalah persekolahan Hayati dapat diatasi.",
      ),
      explainedEvidence(
        "persoalan-penghargaan",
        "Penghargaan terhadap Pengorbanan Pejuang Negara",
        "Jasa anggota keselamatan dan kesusahan keluarga mereka tidak sepatutnya dilupakan.",
        "Kementerian Pertahanan menyampaikan bantuan RM10,000 kepada keluarga Sarjan Akhbar melalui Encik Musa.",
      ),
    ]),
    branch("watak-perwatakan", "Watak & Perwatakan", [
      branch("watak-hayati", "Hayati / Yati", [
        node(
          "watak-hayati-peranan",
          "Peranan",
          "Anak Fauziah dan Sarjan Akhbar serta cucu Pak Mail. Dia belajar di Sekolah Menengah Seri Setia, Melaka dan tinggal di asrama.",
        ),
        evidence(
          "watak-hayati-tanggungjawab",
          "Bertanggungjawab dan Penyayang",
          "Hayati pulang kerana tidak mahu masalah yuran asramanya menambahkan beban keluarga.",
        ),
        evidence(
          "watak-hayati-terus-terang",
          "Berterus Terang",
          "Hayati memaklumkan masalah kewangan keluarganya kepada pihak sekolah.",
        ),
      ]),
      branch("watak-fauziah", "Fauziah", [
        node(
          "watak-fauziah-peranan",
          "Peranan",
          "Balu Sarjan Akhbar, anak Pak Mail, serta ibu kepada Hayati dan Farid.",
        ),
        evidence(
          "watak-fauziah-tabah",
          "Tabah",
          "Fauziah meneruskan kehidupan keluarga selepas kematian suaminya walaupun berhadapan dengan kesempitan hidup.",
        ),
        evidence(
          "watak-fauziah-sayang",
          "Penyayang",
          "Fauziah mengambil berat tentang keadaan serta pendidikan anak-anaknya.",
        ),
      ]),
      branch("watak-pak-mail", "Pak Mail", [
        node(
          "watak-pak-mail-peranan",
          "Peranan",
          "Bapa Fauziah dan datuk kepada Hayati serta Farid. Dia seorang pesara yang membantu menyara keluarga mereka.",
        ),
        evidence(
          "watak-pak-mail-prihatin",
          "Prihatin dan Penyayang",
          "Pak Mail mengambil berat tentang masalah persekolahan Hayati dan mahu menghantarnya kembali ke asrama.",
        ),
        evidence(
          "watak-pak-mail-usaha",
          "Bertanggungjawab dan Gigih Berusaha",
          "Pak Mail memaklumkan kesusahan keluarga kepada Datuk Penghulu untuk mendapatkan bantuan.",
        ),
      ]),
      branch("watak-encik-musa", "Encik Musa", [
        node(
          "watak-encik-musa-peranan",
          "Peranan",
          "Wakil Kementerian Pertahanan yang datang bersama Datuk Penghulu.",
        ),
        evidence(
          "watak-encik-musa-amanah",
          "Amanah",
          "Encik Musa menjalankan tugas menyampaikan cek RM10,000 kepada Fauziah.",
        ),
        evidence(
          "watak-encik-musa-prihatin",
          "Prihatin dan Menghargai Jasa",
          "Dia menerangkan bahawa bantuan itu ialah penghargaan negara terhadap pengorbanan Sarjan Akhbar.",
        ),
      ]),
      branch("watak-sarjan-akhbar", "Sarjan Akhbar", [
        node(
          "watak-sarjan-akhbar-peranan",
          "Peranan",
          "Suami Fauziah dan bapa kepada Hayati serta Farid yang telah meninggal dunia.",
        ),
        evidence(
          "watak-sarjan-akhbar-berani",
          "Berani dan Sanggup Berkorban",
          "Sarjan Akhbar gugur semasa menjalankan tugas mempertahankan negara di sempadan.",
        ),
      ]),
      branch("watak-penghulu", "Datuk Penghulu", [
        node(
          "watak-penghulu-peranan",
          "Peranan",
          "Pemimpin masyarakat yang mengetahui kesusahan keluarga Pak Mail dan datang bersama Encik Musa.",
        ),
        evidence(
          "watak-penghulu-prihatin",
          "Prihatin dan Bertanggungjawab",
          "Datuk Penghulu berikhtiar membantu mengatasi masalah yang dihadapi keluarga Pak Mail.",
        ),
      ]),
      node(
        "watak-farid",
        "Farid",
        "Anak Fauziah dan Sarjan Akhbar serta adik-beradik Hayati. Sumber yang disemak tidak memberikan peristiwa khusus yang mencukupi untuk menetapkan sifat Farid.",
      ),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Fauziah menerima berita bahawa Hayati akan pulang kerana masalah yuran asrama, sementara keluarga mereka masih menghadapi kesempitan selepas kematian Sarjan Akhbar.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Pak Mail menenangkan Fauziah dan berusaha mencari bantuan. Hayati tiba di rumah serta menjelaskan bahawa pihak sekolah mengetahui masalah keluarganya.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Pendidikan Hayati terancam kerana keluarga tidak mampu menjelaskan baki yuran asrama dan pencen Pak Mail tidak mencukupi untuk menyara mereka.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Datuk Penghulu dan Encik Musa datang. Encik Musa menyampaikan cek RM10,000 kepada Fauziah sebagai penghargaan terhadap jasa Sarjan Akhbar.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Bantuan itu membolehkan Hayati kembali ke asrama dan meneruskan pelajaran, sekali gus memberikan harapan baharu kepada keluarganya.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      branch("teknik-dialog", "Dialog", [
        node("teknik-dialog-maksud", "Maksud", "Percakapan antara watak menggerakkan cerita."),
        node(
          "teknik-dialog-bukti",
          "Bukti / Peristiwa",
          "Perbualan Fauziah, Pak Mail dan Hayati menerangkan masalah yuran serta kesusahan keluarga tanpa perlu mereka-reka petikan tepat.",
        ),
      ]),
      branch("teknik-imbas-kembali", "Imbas Kembali", [
        node(
          "teknik-imbas-kembali-maksud",
          "Maksud",
          "Watak mengingat atau menceritakan semula peristiwa yang telah berlaku.",
        ),
        node(
          "teknik-imbas-kembali-bukti",
          "Bukti / Peristiwa",
          "Hayati mengingati bapanya yang telah meninggal dunia, manakala kematian Sarjan Akhbar semasa bertugas diterangkan sebagai latar konflik keluarga.",
        ),
      ]),
      branch("teknik-imbas-muka", "Imbas Muka", [
        node(
          "teknik-imbas-muka-maksud",
          "Maksud",
          "Watak membayangkan atau menyatakan sesuatu yang akan dilakukan.",
        ),
        node(
          "teknik-imbas-muka-bukti",
          "Bukti / Peristiwa",
          "Sebelum pulang, Hayati membayangkan bahawa dia dapat menatap gambar bapanya di rumah.",
        ),
      ]),
      branch("teknik-pemerian", "Pemerian", [
        node(
          "teknik-pemerian-maksud",
          "Maksud",
          "Maklumat tentang keadaan dan tujuan sesuatu tindakan diterangkan kepada pembaca atau penonton.",
        ),
        node(
          "teknik-pemerian-bukti",
          "Bukti / Peristiwa",
          "Encik Musa menerangkan tujuan kedatangannya serta sebab bantuan diberikan kepada keluarga Sarjan Akhbar.",
        ),
      ]),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      evidence(
        "latar-tempat-rumah",
        "Ruang Tamu Rumah Pak Mail",
        "Fauziah, Pak Mail dan Hayati berbincang, manakala Datuk Penghulu serta Encik Musa datang menyampaikan bantuan di rumah itu.",
      ),
      evidence(
        "latar-tempat-sekolah",
        "Sekolah Menengah Seri Setia, Melaka",
        "Hayati belajar di sekolah ini dan menghadapi masalah berkaitan yuran asrama.",
      ),
      evidence(
        "latar-tempat-asrama",
        "Asrama Sekolah",
        "Hayati tinggal di asrama sebelum pulang dan akhirnya dapat meneruskan pelajaran di situ.",
      ),
      evidence(
        "latar-tempat-sempadan",
        "Sempadan Negara",
        "Sarjan Akhbar gugur semasa menjalankan tugas mempertahankan negara.",
      ),
    ]),
    branch("latar-masa", "Latar Masa", [
      evidence(
        "latar-masa-pagi",
        "Waktu Pagi",
        "Pak Mail menemui Datuk Penghulu untuk menerangkan masalah yang dihadapi keluarganya.",
      ),
      evidence(
        "latar-masa-petang",
        "Waktu Petang",
        "Hayati pulang, kemudian Datuk Penghulu dan Encik Musa datang ke rumah Pak Mail.",
      ),
      node(
        "latar-masa-amaran",
        "Tempoh Kematian Sarjan Akhbar",
        "Sumber rujukan memberikan tempoh yang tidak seragam. Oleh itu, tempoh tepat tidak digunakan dalam peta minda ini.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      evidence(
        "latar-masyarakat-susah",
        "Masyarakat yang Menghadapi Kesusahan",
        "Fauziah, Hayati dan Farid menghadapi masalah kewangan selepas kematian Sarjan Akhbar.",
      ),
      evidence(
        "latar-masyarakat-sayang",
        "Masyarakat Penyayang",
        "Pak Mail membantu anak dan cucu-cucunya yang kehilangan tempat bergantung.",
      ),
      evidence(
        "latar-masyarakat-prihatin",
        "Masyarakat Prihatin",
        "Datuk Penghulu dan Encik Musa mengambil berat tentang masalah keluarga Pak Mail.",
      ),
      evidence(
        "latar-masyarakat-pendidikan",
        "Masyarakat yang Mementingkan Pendidikan",
        "Usaha Pak Mail dan bantuan yang diterima membolehkan Hayati kembali ke asrama.",
      ),
      evidence(
        "latar-masyarakat-pejuang",
        "Masyarakat yang Berkorban untuk Negara",
        "Sarjan Akhbar gugur semasa menjalankan tugas di sempadan.",
      ),
      evidence(
        "latar-masyarakat-pemimpin",
        "Pemimpin yang Bertanggungjawab",
        "Datuk Penghulu berikhtiar membantu keluarga di bawah tanggungjawabnya.",
      ),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-tabah",
        "Ketabahan",
        "Fauziah meneruskan kehidupan keluarganya selepas kehilangan suami walaupun hidup dalam kesempitan.",
      ),
      evidence(
        "nilai-kasih",
        "Kasih Sayang",
        "Pak Mail mengambil berat tentang Fauziah dan cucu-cucunya, manakala Hayati tidak mahu membebankan keluarga.",
      ),
      evidence(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Pak Mail mencari bantuan untuk persekolahan Hayati dan Encik Musa menjalankan amanah menyampaikan cek.",
      ),
      evidence(
        "nilai-prihatin",
        "Keprihatinan",
        "Datuk Penghulu dan Encik Musa peka terhadap kesusahan keluarga Sarjan Akhbar.",
      ),
      evidence(
        "nilai-pengorbanan",
        "Pengorbanan",
        "Sarjan Akhbar sanggup menjalankan tugas berisiko sehingga gugur demi negara.",
      ),
      evidence(
        "nilai-amanah",
        "Amanah",
        "Encik Musa menyampaikan bantuan penghargaan kepada keluarga yang layak menerimanya.",
      ),
      evidence(
        "nilai-kesyukuran",
        "Kesyukuran dan Penghargaan",
        "Pak Mail berterima kasih selepas bantuan diterima dan pendidikan Hayati dapat diteruskan.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      evidence(
        "pengajaran-tabah",
        "Kita Hendaklah Tabah Menghadapi Cabaran",
        "Fauziah terus menjaga keluarga walaupun kehilangan suami dan menghadapi kesempitan hidup.",
      ),
      evidence(
        "pengajaran-sayang",
        "Kita Hendaklah Menyayangi Ahli Keluarga",
        "Pak Mail membantu anak dan cucu-cucunya, manakala Hayati memikirkan beban keluarganya.",
      ),
      evidence(
        "pengajaran-tanggungjawab",
        "Kita Hendaklah Bertanggungjawab",
        "Pak Mail berusaha menyelesaikan masalah persekolahan Hayati dan Encik Musa melaksanakan amanahnya.",
      ),
      evidence(
        "pengajaran-bantu",
        "Kita Hendaklah Membantu Golongan yang Memerlukan",
        "Datuk Penghulu dan pihak Kementerian Pertahanan membantu keluarga Sarjan Akhbar.",
      ),
      evidence(
        "pengajaran-pendidikan",
        "Kita Hendaklah Mementingkan Pendidikan",
        "Bantuan yang diterima digunakan untuk memastikan Hayati dapat kembali ke asrama dan terus belajar.",
      ),
      evidence(
        "pengajaran-pejuang",
        "Kita Hendaklah Menghargai Jasa Pejuang Negara",
        "Sarjan Akhbar gugur semasa bertugas dan keluarganya menerima penghargaan atas pengorbanan itu.",
      ),
      evidence(
        "pengajaran-bantuan",
        "Kita Hendaklah Menghargai Bantuan Orang Lain",
        "Pak Mail mengucapkan terima kasih selepas bantuan disampaikan kepada keluarganya.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      node(
        "peristiwa-1",
        "1. Sarjan Akhbar Gugur",
        "Keluarga kehilangan ketua dan tempat bergantung.",
      ),
      node(
        "peristiwa-2",
        "2. Keluarga Hidup Susah",
        "Fauziah, Hayati dan Farid bergantung pada Pak Mail yang menerima pencen sedikit.",
      ),
      node(
        "peristiwa-3",
        "3. Hayati Menghadapi Masalah Yuran",
        "Baki yuran asrama menyebabkan Hayati pulang dan pendidikannya terancam.",
      ),
      node(
        "peristiwa-4",
        "4. Pak Mail Mencari Bantuan",
        "Pak Mail memaklumkan kesusahan keluarga kepada Datuk Penghulu.",
      ),
      node(
        "peristiwa-5",
        "5. Datuk Penghulu dan Encik Musa Datang",
        "Kedatangan mereka membawa penyelesaian kepada masalah keluarga.",
      ),
      node(
        "peristiwa-6",
        "6. Cek RM10,000 Disampaikan",
        "Fauziah menerima bantuan sebagai penghargaan terhadap jasa Sarjan Akhbar.",
      ),
      node(
        "peristiwa-7",
        "7. Hayati Kembali ke Asrama",
        "Hayati dapat meneruskan pelajaran dan keluarga memperoleh harapan baharu.",
      ),
    ]),
    branch("teknik-drama", "Teknik Drama", [
      branch("drama-dialog", "Dialog", [
        node(
          "drama-dialog-fungsi",
          "Fungsi",
          "Dialog menggerakkan cerita, menyampaikan masalah dan memperlihatkan hubungan antara watak.",
        ),
        node(
          "drama-dialog-bukti",
          "Bukti",
          "Percakapan Fauziah, Pak Mail, Hayati, Datuk Penghulu dan Encik Musa membawa konflik hingga penyelesaian.",
        ),
      ]),
      branch("drama-arahan", "Arahan Pentas", [
        node(
          "drama-arahan-fungsi",
          "Fungsi",
          "Arahan pentas menerangkan pergerakan, kemunculan, reaksi atau keadaan yang perlu dipersembahkan.",
        ),
        node(
          "drama-arahan-bukti",
          "Bukti",
          "Skrip memberikan arahan tentang watak masuk, bergerak dan bertindak semasa kunjungan Datuk Penghulu serta Encik Musa.",
        ),
      ]),
      branch("drama-aksi", "Aksi Watak", [
        node(
          "drama-aksi-fungsi",
          "Fungsi",
          "Tindakan watak memperlihatkan emosi, hubungan dan perubahan keadaan di atas pentas.",
        ),
        node(
          "drama-aksi-bukti",
          "Bukti",
          "Ketibaan Hayati, kunjungan para tetamu dan penyerahan bantuan menunjukkan perkembangan konflik secara nyata.",
        ),
      ]),
      branch("drama-konflik", "Konflik", [
        node(
          "drama-konflik-fungsi",
          "Fungsi",
          "Konflik mewujudkan ketegangan dan mendorong watak mencari penyelesaian.",
        ),
        node(
          "drama-konflik-bukti",
          "Bukti",
          "Masalah kewangan keluarga menyebabkan pendidikan Hayati hampir terhenti sebelum bantuan diterima.",
        ),
      ]),
      branch("drama-babak", "Babak", [
        node(
          "drama-babak-fungsi",
          "Fungsi",
          "Babak menyusun perubahan peristiwa, kemunculan watak dan perkembangan konflik untuk pementasan.",
        ),
        node(
          "drama-babak-amaran",
          "Semak Struktur",
          "Gunakan istilah babak untuk menerangkan susunan drama tanpa mereka-reka jumlah babak atau adegan.",
        ),
      ]),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-tema", "Tema", "TEMA + PERISTIWA."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + BUKTI."),
      node("jawab-perwatakan", "Perwatakan", "WATAK + SIFAT + PERISTIWA."),
      node("jawab-latar", "Latar", "LATAR + PERISTIWA."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ kemudian sertakan sebab atau peristiwa yang sesuai.",
      ),
      node(
        "jawab-teknik-drama",
        "Teknik Drama",
        "TEKNIK + FUNGSI + BUKTI daripada pementasan atau skrip.",
      ),
      branch("ingatan", "HADIAH DRAMA — PETA INGATAN", [
        node("ingatan-1", "1. KESUSAHAN"),
        node("ingatan-2", "2. KELUARGA"),
        node("ingatan-3", "3. KETABAHAN"),
        node("ingatan-4", "4. PENDIDIKAN"),
        node("ingatan-5", "5. KEPRIHATINAN"),
        node("ingatan-6", "6. BANTUAN"),
        node("ingatan-7", "7. HADIAH"),
        node("ingatan-8", "8. HARAPAN"),
      ]),
      node("ingatan-nilai", "NILAI TERAS", "TABAH + SAYANG + TANGGUNGJAWAB + PRIHATIN"),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-keliru-karya",
        "Keliru Hadiah Cerpen dengan Hadiah Drama",
        "Topik ini ialah drama Hadiah karya Aripin Said. Jangan masukkan Azizah, Cikgu Zaleha, tudung saji, Hari Guru atau pertandingan kraftangan daripada cerpen lain yang berjudul Hadiah.",
      ),
      node(
        "kesalahan-genre",
        "Menulis Genre Salah",
        "Hadiah karya Aripin Said ialah drama, bukannya cerpen.",
      ),
      node(
        "kesalahan-watak",
        "Watak Tanpa Bukti",
        "Nama sifat sahaja tidak mencukupi. Gunakan SIFAT + PERISTIWA.",
      ),
      node(
        "kesalahan-tema",
        "Tema = Tajuk",
        "Jangan menjawab ‘Hadiah’ sahaja. Terangkan idea ketabahan dan penghargaan terhadap jasa pejuang negara.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai ialah ‘ketabahan’, manakala pengajaran ialah ‘Kita hendaklah tabah menghadapi kesusahan’. Kedua-duanya perlu disokong bukti.",
      ),
      node(
        "kesalahan-latar",
        "Latar Tanpa Peristiwa",
        "Setiap masa, tempat atau latar masyarakat mesti disertai peristiwa yang berlaku.",
      ),
      node(
        "kesalahan-dialog",
        "Dialog Direka",
        "Jangan mencipta petikan atau dialog tepat yang tidak disemak daripada teks.",
      ),
      node(
        "kesalahan-plot",
        "Plot Direka",
        "Gunakan urutan sebenar: kesusahan keluarga, masalah yuran, usaha mendapatkan bantuan, cek RM10,000 dan Hayati meneruskan pelajaran.",
      ),
      node(
        "kesalahan-hadiah",
        "Hadiah Dianggap Pemberian Biasa",
        "Bantuan itu melambangkan penghargaan negara terhadap jasa Sarjan Akhbar dan membantu pendidikan anak-anaknya.",
      ),
    ]),
  ],
};
