import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-kuih-bakul-limau-mandarin";

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

export const bahasaMelayuTingkatan1KuihBakulLimauMandarinMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KUIH BAKUL\nLIMAU MANDARIN",
  summary:
    "Cerpen mengisahkan konflik antara Lim Pooi dengan anaknya, Lim Meng, akibat kepercayaan dan prasangka yang salah sehingga kebenaran akhirnya membawa kepada keinsafan dan penyatuan semula keluarga.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Kuih Bakul Limau Mandarin ialah cerpen karya Mohd. Helmi Ahmad dalam antologi Kuingin Berterima Kasih.",
      ),
      node(
        "sinopsis-1",
        "1. Berita Kepulangan Lim Meng",
        "Sim Pau menerima berita bahawa anak perempuannya, Lim Meng, akan pulang untuk menyambut Tahun Baharu Cina. Sim Pau sangat gembira dengan berita tersebut.",
      ),
      node(
        "sinopsis-2",
        "2. Tentangan Lim Pooi",
        "Lim Pooi tidak menyenangi kepulangan Lim Meng. Dia masih marah dan enggan menerima anak perempuannya itu.",
      ),
      branch("sinopsis-3", "3. Lim Meng Dipersalahkan", [
        node(
          "sinopsis-3-tuduhan",
          "Tuduhan Lim Pooi",
          "Lim Pooi menyalahkan Lim Meng atas masalah perniagaan dan kematian Lim Foong. Tuduhan ini ialah kepercayaan serta prasangka Lim Pooi, bukan fakta objektif.",
        ),
        node(
          "sinopsis-3-khurafat",
          "Kepercayaan Khurafat",
          "Lim Pooi percaya bahawa kelahiran dan kewujudan Lim Meng membawa malang kepada keluarga. Kepercayaan tanpa asas ini menyumbang kepada konflik keluarga.",
        ),
      ]),
      node(
        "sinopsis-4",
        "4. Sim Pau Bersuara",
        "Sim Pau yang selama ini banyak bersabar akhirnya berani menentang pandangan suaminya. Dia menjelaskan perkara sebenar berkaitan keluarga dan kematian Lim Foong.",
      ),
      node(
        "sinopsis-5",
        "5. Kebenaran Terbongkar",
        "Lim Pooi mengetahui bahawa tanggapannya terhadap Lim Meng selama ini tidak benar. Dia mula sedar bahawa kesalahan dan sikapnya sendiri telah menjejaskan hubungan keluarga.",
      ),
      node(
        "sinopsis-6",
        "6. Keinsafan Lim Pooi",
        "Lim Pooi menyesali tindakannya terhadap Lim Meng dan keegoannya mula reda.",
      ),
      node(
        "sinopsis-7",
        "7. Kepulangan Lim Meng",
        "Sehari sebelum Tahun Baharu Cina, Lim Meng pulang ke rumah. Kepulangannya disambut oleh kedua-dua ibu bapanya dengan perasaan terharu.",
      ),
      node(
        "sinopsis-8",
        "8. Keluarga Bersatu Semula",
        "Konflik yang memisahkan keluarga akhirnya reda dan mereka dapat berkumpul kembali sebagai sebuah keluarga.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KASIH SAYANG KELUARGA YANG KEMBALI TERJALIN", [
        node(
          "tema-huraian",
          "Huraian",
          "Walaupun keluarga Lim Pooi berhadapan dengan konflik dan salah faham, kasih sayang serta kebenaran akhirnya menyatukan mereka semula.",
        ),
        branch("tema-bukti", "Peristiwa Sokongan", [
          node(
            "tema-bukti-1",
            "Sim Pau Menanti",
            "Sim Pau masih mengharapkan kepulangan Lim Meng.",
          ),
          node("tema-bukti-2", "Lim Pooi Insaf", "Lim Pooi akhirnya menginsafi kesalahannya."),
          node("tema-bukti-3", "Lim Meng Diterima", "Lim Meng diterima semula oleh keluarganya."),
          node(
            "tema-bukti-4",
            "Keluarga Berkumpul",
            "Mereka berkumpul menjelang Tahun Baharu Cina.",
          ),
        ]),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema cerpen Kuih Bakul Limau Mandarin ialah kasih sayang keluarga yang kembali terjalin selepas berlaku konflik dan salah faham antara ahli keluarga.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-khurafat",
        "Kepercayaan terhadap Perkara Khurafat",
        "Lim Pooi percaya bahawa Lim Meng membawa malang kepada keluarganya.",
      ),
      evidence(
        "persoalan-ego",
        "Keegoan Seorang Bapa",
        "Lim Pooi enggan menerima kepulangan Lim Meng kerana masih berpegang pada tanggapannya sendiri.",
      ),
      evidence(
        "persoalan-benar",
        "Keberanian Menyuarakan Kebenaran",
        "Sim Pau akhirnya berani membantah suaminya dan menceritakan perkara sebenar.",
      ),
      evidence(
        "persoalan-insaf",
        "Keinsafan terhadap Kesalahan",
        "Lim Pooi sedar bahawa dia telah berlaku tidak adil terhadap Lim Meng.",
      ),
      evidence(
        "persoalan-ibu",
        "Kasih Sayang Seorang Ibu",
        "Sim Pau tetap mengharapkan kepulangan Lim Meng dan mahu keluarganya kembali bersatu.",
      ),
      evidence(
        "persoalan-harmoni",
        "Kepentingan Keharmonian Keluarga",
        "Konflik dapat diselesaikan apabila kebenaran diterima dan ahli keluarga saling memaafkan.",
      ),
    ]),
    branch("watak", "Watak", [
      node(
        "watak-lim-pooi",
        "Lim Pooi",
        "Bapa kepada Lim Meng dan tokoh utama dalam konflik keluarga.",
      ),
      node(
        "watak-sim-pau",
        "Sim Pau",
        "Ibu kepada Lim Meng yang berusaha mempertahankan anaknya dan menyatukan keluarga.",
      ),
      node(
        "watak-lim-meng",
        "Lim Meng",
        "Anak perempuan Lim Pooi dan Sim Pau. Kepulangannya menjadi titik penting dalam penyelesaian konflik.",
      ),
      node(
        "watak-lim-foong",
        "Lim Foong",
        "Anak lelaki keluarga yang telah meninggal dunia. Kematiannya menjadi sebahagian daripada salah faham dan tuduhan terhadap Lim Meng.",
      ),
    ]),
    branch("perwatakan", "Perwatakan", [
      evidence(
        "perwatakan-pooi-ego",
        "Lim Pooi — Ego",
        "Dia berkeras enggan menerima Lim Meng walaupun Sim Pau mahu anak mereka pulang.",
      ),
      evidence(
        "perwatakan-pooi-khurafat",
        "Lim Pooi — Mudah Percaya kepada Khurafat",
        "Dia menganggap Lim Meng sebagai pembawa malang kepada keluarga.",
      ),
      evidence(
        "perwatakan-pooi-prasangka",
        "Lim Pooi — Mudah Menuduh dan Berprasangka",
        "Dia menyalahkan Lim Meng atas perkara buruk yang berlaku.",
      ),
      evidence(
        "perwatakan-pooi-insaf",
        "Lim Pooi — Insaf",
        "Selepas mengetahui perkara sebenar, dia menyedari kesalahannya dan menerima kembali Lim Meng.",
      ),
      evidence(
        "perwatakan-sim-pau-sayang",
        "Sim Pau — Penyayang",
        "Dia gembira apabila mengetahui Lim Meng akan pulang.",
      ),
      evidence(
        "perwatakan-sim-pau-sabar",
        "Sim Pau — Sabar",
        "Dia telah lama menghadapi sikap Lim Pooi sebelum akhirnya bersuara.",
      ),
      evidence(
        "perwatakan-sim-pau-berani",
        "Sim Pau — Berani",
        "Dia berani menentang pandangan suaminya dan menjelaskan kebenaran.",
      ),
      evidence(
        "perwatakan-lim-meng-sayang",
        "Lim Meng — Penyayang terhadap Keluarga",
        "Dia pulang untuk menyambut Tahun Baharu Cina bersama keluarganya walaupun hubungan mereka pernah renggang.",
      ),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Sim Pau menerima berita bahawa Lim Meng akan pulang menyambut Tahun Baharu Cina.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Lim Pooi membantah kepulangan Lim Meng dan menganggap anaknya membawa malang.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Konflik menjadi lebih tegang apabila Lim Pooi terus menyalahkan Lim Meng atas masalah keluarga dan kematian Lim Foong.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Sim Pau akhirnya berani menceritakan kebenaran tentang perkara yang berlaku, termasuk hal berkaitan Lim Foong.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Lim Pooi menginsafi kesalahannya. Lim Meng pulang dan keluarga kembali bersatu.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      branch("teknik-dialog", "Dialog", [
        node("teknik-dialog-maksud", "Maksud", "Percakapan antara watak yang menggerakkan cerita."),
        node(
          "teknik-dialog-bukti",
          "Peristiwa / Bukti",
          "Perbualan antara Lim Pooi dengan Sim Pau mengembangkan konflik tentang kepulangan Lim Meng. Bukti diparafrasa tanpa mereka-reka dialog tepat.",
        ),
      ]),
      branch("teknik-pemerian", "Pemerian", [
        node(
          "teknik-pemerian-maksud",
          "Maksud",
          "Pencerita menerangkan keadaan, reaksi atau peristiwa kepada pembaca.",
        ),
        node(
          "teknik-pemerian-bukti",
          "Peristiwa / Bukti",
          "Penceritaan menerangkan reaksi Sim Pau terhadap berita kepulangan Lim Meng dan perubahan sikap Lim Pooi selepas mengetahui kebenaran.",
        ),
      ]),
      branch("teknik-imbas", "Imbas Kembali", [
        node(
          "teknik-imbas-maksud",
          "Maksud",
          "Peristiwa lampau diceritakan kembali untuk menjelaskan konflik semasa.",
        ),
        node(
          "teknik-imbas-bukti",
          "Peristiwa / Bukti",
          "Sim Pau mengungkap kembali hal keluarga dan kematian Lim Foong untuk membetulkan tanggapan Lim Pooi terhadap Lim Meng.",
        ),
      ]),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      evidence(
        "latar-tempat-rumah",
        "Rumah Lim Pooi dan Sim Pau",
        "Rumah menjadi tempat utama interaksi, konflik dan penyatuan semula keluarga.",
      ),
    ]),
    branch("latar-masa", "Latar Masa", [
      evidence(
        "latar-masa-menjelang",
        "Menjelang Tahun Baharu Cina",
        "Tempoh ini menjadi konteks penting bagi hasrat Lim Meng untuk pulang dan berkumpul bersama keluarganya.",
      ),
      evidence(
        "latar-masa-sehari",
        "Sehari Sebelum Tahun Baharu Cina",
        "Lim Meng pulang ke rumah sehari sebelum sambutan Tahun Baharu Cina.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      evidence(
        "latar-masyarakat-cina",
        "Masyarakat Cina",
        "Cerita berlatarkan sebuah keluarga Cina yang sedang membuat persiapan menjelang Tahun Baharu Cina.",
      ),
      evidence(
        "latar-masyarakat-keluarga",
        "Masyarakat yang Mementingkan Keluarga",
        "Sim Pau mahu Lim Meng pulang dan keluarganya bersatu semula.",
      ),
      evidence(
        "latar-masyarakat-khurafat",
        "Masyarakat yang Masih Mempercayai Khurafat",
        "Diwakili oleh Lim Pooi yang percaya bahawa Lim Meng membawa malang.",
      ),
      evidence(
        "latar-masyarakat-benar",
        "Masyarakat yang Berani Menyatakan Kebenaran",
        "Diwakili oleh Sim Pau yang akhirnya membantah tanggapan suaminya dan menjelaskan perkara sebenar.",
      ),
      evidence(
        "latar-masyarakat-insaf",
        "Masyarakat yang Mampu Menginsafi Kesalahan",
        "Diwakili oleh Lim Pooi yang berubah selepas mengetahui kebenaran.",
      ),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-kasih",
        "Kasih Sayang",
        "Sim Pau terus menyayangi dan menerima Lim Meng serta mengharapkan kepulangannya.",
      ),
      evidence(
        "nilai-berani",
        "Keberanian",
        "Sim Pau berani menyatakan kebenaran kepada Lim Pooi.",
      ),
      evidence(
        "nilai-insaf",
        "Keinsafan",
        "Lim Pooi mengakui kesilapannya selepas mengetahui perkara sebenar.",
      ),
      evidence(
        "nilai-maaf",
        "Kemaafan",
        "Kesediaan ahli keluarga untuk memaafkan membolehkan hubungan mereka dipulihkan.",
      ),
      evidence(
        "nilai-jujur",
        "Kejujuran",
        "Kebenaran yang dijelaskan oleh Sim Pau membantu menamatkan salah faham.",
      ),
      evidence(
        "nilai-sabar",
        "Kesabaran",
        "Sim Pau bersabar menghadapi konflik keluarga sebelum akhirnya bersuara.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      evidence(
        "pengajaran-sayang",
        "Kita Hendaklah Menyayangi Ahli Keluarga",
        "Hubungan kekeluargaan perlu dipelihara walaupun berlaku perselisihan.",
      ),
      evidence(
        "pengajaran-khurafat",
        "Kita Tidak Sewajarnya Mempercayai Khurafat",
        "Kepercayaan Lim Pooi yang tidak berasas telah merosakkan hubungannya dengan Lim Meng.",
      ),
      evidence(
        "pengajaran-selidik",
        "Kita Hendaklah Menyelidik Kebenaran Sebelum Menuduh",
        "Lim Pooi berlaku tidak adil apabila menyalahkan Lim Meng tanpa memahami perkara sebenar.",
      ),
      evidence(
        "pengajaran-benar",
        "Kita Hendaklah Berani Menyatakan Kebenaran",
        "Tindakan Sim Pau menjelaskan perkara sebenar membantu menyelesaikan konflik keluarga.",
      ),
      evidence(
        "pengajaran-insaf",
        "Kita Hendaklah Menginsafi Kesalahan",
        "Keinsafan Lim Pooi membuka jalan untuk hubungannya dengan Lim Meng dipulihkan.",
      ),
      evidence(
        "pengajaran-maaf",
        "Kita Hendaklah Saling Memaafkan",
        "Kesediaan keluarga untuk berdamai membolehkan mereka bersatu semula.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      node("peristiwa-1", "1. Sim Pau Terima Berita", "Lim Meng akan pulang."),
      node("peristiwa-2", "2. Sim Pau Gembira", "Sim Pau gembira mendengar berita itu."),
      node("peristiwa-3", "3. Lim Pooi Membantah", "Lim Pooi menolak kepulangan Lim Meng."),
      node(
        "peristiwa-4",
        "4. Lim Meng Dipersalahkan",
        "Lim Pooi menuduh Lim Meng membawa malang; ini ialah kepercayaan Lim Pooi, bukan fakta.",
      ),
      node(
        "peristiwa-5",
        "5. Konflik Memuncak",
        "Pertentangan antara Lim Pooi dengan Sim Pau semakin tegang.",
      ),
      node("peristiwa-6", "6. Sim Pau Bersuara", "Sim Pau berani membantah pandangan suaminya."),
      node(
        "peristiwa-7",
        "7. Kebenaran Dijelaskan",
        "Perkara sebenar berkaitan keluarga dan Lim Foong diterangkan.",
      ),
      node(
        "peristiwa-8",
        "8. Lim Pooi Insaf",
        "Lim Pooi menyedari kesalahannya terhadap Lim Meng.",
      ),
      node(
        "peristiwa-9",
        "9. Lim Meng Pulang",
        "Lim Meng pulang sehari sebelum Tahun Baharu Cina.",
      ),
      node(
        "peristiwa-10",
        "10. Keluarga Bersatu Semula",
        "Konflik reda dan keluarga kembali bersama.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-tema", "Tema", "TEMA + PERISTIWA."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + BUKTI."),
      node(
        "jawab-perwatakan",
        "Perwatakan",
        "WATAK + SIFAT + PERISTIWA. Contoh: Sim Pau seorang yang berani kerana dia akhirnya menyuarakan kebenaran kepada Lim Pooi.",
      ),
      node("jawab-nilai", "Nilai", "NILAI + PERISTIWA."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ kemudian berikan alasan atau peristiwa yang sesuai.",
      ),
      node("jawab-latar", "Latar", "LATAR + PERISTIWA."),
      node("jawab-plot", "Plot", "TAHAP PLOT + PERISTIWA."),
      branch("ingatan", "KUIH BAKUL LIMAU MANDARIN — PETA INGATAN", [
        node("ingatan-1", "1. LIM MENG AKAN PULANG"),
        node("ingatan-2", "2. LIM POOI MARAH"),
        node("ingatan-3", "3. SALAH FAHAM & KHURAFAT"),
        node("ingatan-4", "4. SIM PAU BERSUARA"),
        node("ingatan-5", "5. KEBENARAN"),
        node("ingatan-6", "6. KEINSAFAN"),
        node("ingatan-7", "7. KELUARGA BERSATU SEMULA"),
      ]),
      node("ingatan-mesej", "MESEJ TERAS", "KASIH SAYANG + KEBENARAN + KEINSAFAN + KEMAAFAN"),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-malang",
        "Lim Meng Dianggap Benar-benar Membawa Malang",
        "Salah. Hal itu ialah kepercayaan khurafat Lim Pooi, bukan fakta objektif.",
      ),
      node(
        "kesalahan-watak",
        "Lim Foong dan Lim Meng Tertukar",
        "Lim Meng ialah anak perempuan yang pulang, manakala Lim Foong ialah anak lelaki yang telah meninggal dunia.",
      ),
      node(
        "kesalahan-sim-pau",
        "Sim Pau Dianggap Lemah",
        "Tanggapan ini terlalu mudah. Sim Pau bersabar, tetapi akhirnya berani menghadapi masalah dan menyatakan kebenaran.",
      ),
      node(
        "kesalahan-tema-perayaan",
        "Tema = Tahun Baharu Cina",
        "Salah. Tahun Baharu Cina ialah konteks masa dan perayaan, bukan tema utama.",
      ),
      node(
        "kesalahan-tema-khurafat",
        "Tema = Khurafat",
        "Terlalu sempit sebagai tema utama. Khurafat ialah persoalan penting dalam cerpen.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai ialah sifat atau amalan, manakala pengajaran ialah pedoman berbentuk tindakan.",
      ),
      node(
        "kesalahan-bukti",
        "Perwatakan Tanpa Bukti",
        "Setiap sifat watak mesti disokong oleh peristiwa yang tepat.",
      ),
      node(
        "kesalahan-panjang",
        "Cerita Semula Terlalu Panjang",
        "Jawab hanya kehendak soalan dengan isi dan bukti yang relevan.",
      ),
      node(
        "kesalahan-reka",
        "Fakta Direka",
        "Jangan menambahkan watak, petikan, peristiwa, masa atau tempat yang tidak disahkan.",
      ),
    ]),
  ],
};
