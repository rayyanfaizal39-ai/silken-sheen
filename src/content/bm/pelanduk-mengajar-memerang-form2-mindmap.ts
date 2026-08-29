import type { MindNode } from "@/components/MindMap";

// Content verified against the repository's Form 2 KOMSAS source and
// anthology-aligned analyses. Events are paraphrased and quotations are omitted.
const PREFIX = "bm-f2-pelanduk-mengajar-memerang";

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

function evidence(id: string, label: string, explanation: string, event: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Peristiwa", event),
  ]);
}

function step(id: string, number: number, label: string, explanation: string): MindNode {
  return node(id, `Langkah ${number} — ${label}`, explanation);
}

export const bahasaMelayuTingkatan2PelandukMengajarMemerangMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PELANDUK\nMENGAJAR\nMEMERANG",
  summary:
    "Prosa Tradisional • KOMSAS Tingkatan 2\n\nCerita mengisahkan kematian tujuh anak Sang Memerang selepas terpijak oleh Syah Alam di Rimba. Sang Memerang mengadu kepada Nabi Allah Sulaiman, tetapi penyiasatan dan keterangan saksi akhirnya menunjukkan bahawa peristiwa itu berkait dengan penganiayaan Sang Memerang sendiri terhadap haiwan lain.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-zaman",
        "Zaman Nabi Allah Sulaiman",
        "Haiwan dapat berkata-kata. Nabi Allah Sulaiman mempunyai lima menteri, dan Syah Alam di Rimba, iaitu pelanduk, terkenal dengan kebijaksanaannya.",
      ),
      node(
        "sinopsis-lawatan",
        "Lawatan ke Wilayah",
        "Syah Alam di Rimba melawat wilayah pemerintahannya lalu menemukan tujuh anak memerang. Ibu bapa mereka sedang mencari ikan.",
      ),
      node(
        "sinopsis-kematian",
        "Kematian Tujuh Anak Memerang",
        "Apabila Sang Bubut berbunyi, Syah Alam di Rimba bersilat. Tanpa sedar, dia terpijak ketujuh-tujuh anak memerang sehingga mati.",
      ),
      node(
        "sinopsis-aduan",
        "Aduan Sang Memerang",
        "Ibu bapa memerang pulang, melihat kesan tapak kaki Syah Alam dan mengadukan kematian anak-anak mereka kepada Nabi Allah Sulaiman.",
      ),
      node(
        "sinopsis-siasatan",
        "Siasatan dan Saksi",
        "Nabi Allah Sulaiman tidak terus menghukum. Baginda memanggil pihak yang terlibat untuk menerangkan rangkaian tindakan yang membawa kepada kejadian itu.",
      ),
      node(
        "sinopsis-keputusan",
        "Keputusan",
        "Selepas Sang Sebarau mendedahkan penganiayaan terhadap keluarganya dan Sang Memerang mengaku, Nabi Allah Sulaiman memutuskan Syah Alam di Rimba tidak bersalah.",
      ),
    ]),
    branch("urutan", "Urutan Peristiwa", [
      step(
        "urutan-1",
        1,
        "Syah Alam Melawat Wilayah",
        "Pelanduk meninjau rakyat dalam kawasan pemerintahannya.",
      ),
      step(
        "urutan-2",
        2,
        "Bertemu Anak Memerang",
        "Dia menemukan tujuh anak memerang di tempat tinggal mereka.",
      ),
      step(
        "urutan-3",
        3,
        "Teringat Aduan Ikan",
        "Dia memikirkan penganiayaan Sang Memerang terhadap ikan.",
      ),
      step(
        "urutan-4",
        4,
        "Sang Bubut Berbunyi",
        "Bunyi Sang Bubut dianggap sebagai isyarat bahaya.",
      ),
      step(
        "urutan-5",
        5,
        "Syah Alam Bersilat",
        "Syah Alam membuka pencak silat sebagai tindak balas.",
      ),
      step(
        "urutan-6",
        6,
        "Anak Memerang Terpijak",
        "Tanpa sedar, dia terpijak tujuh anak memerang sehingga mati.",
      ),
      step(
        "urutan-7",
        7,
        "Sang Memerang Mengadu",
        "Ibu bapa memerang membawa perkara itu kepada Nabi Allah Sulaiman.",
      ),
      step(
        "urutan-8",
        8,
        "Nabi Sulaiman Menyiasat",
        "Baginda meneliti aduan sebelum membuat keputusan.",
      ),
      step(
        "urutan-9",
        9,
        "Saksi Dipanggil",
        "Sang Belatuk memanggil pihak yang terlibat mengikut perintah baginda.",
      ),
      step(
        "urutan-10",
        10,
        "Kebenaran Terbongkar",
        "Rangkaian sebab berakhir pada masalah Sang Sebarau dengan Sang Memerang.",
      ),
      step(
        "urutan-11",
        11,
        "Sang Memerang Mengaku",
        "Sang Memerang mengakui penganiayaannya terhadap rakyat Sang Sebarau.",
      ),
      step("urutan-12", 12, "Keputusan Dibuat", "Syah Alam di Rimba diputuskan tidak bersalah."),
      node(
        "urutan-prinsip",
        "Prinsip Penting",
        "ADUAN ≠ BUKTI MUKTAMAD. Aduan memulakan siasatan; aduan tidak menentukan kesalahan.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "BALASAN TERHADAP GOLONGAN YANG MENGANIAYAI PIHAK LAIN", [
        node(
          "tema-huraian",
          "Huraian",
          "Sang Memerang akhirnya menerima akibat yang dikaitkan dengan perbuatannya menganiayai rakyat Sang Sebarau.",
        ),
        node(
          "tema-bukti",
          "Bukti Peristiwa",
          "Sang Memerang pada mulanya menyalahkan Syah Alam, tetapi siasatan mendedahkan kesalahannya sendiri dan Syah Alam dibebaskan.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pelanduk Mengajar Memerang ialah balasan terhadap golongan yang menganiayai pihak lain.",
        ),
        node(
          "tema-bukan",
          "Bukan Tema",
          "Kematian anak memerang ialah peristiwa plot, bukan idea utama cerita.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-tamak",
        "Sikap Tamak",
        "Mengambil secara berlebihan tanpa memikirkan pihak lain membawa akibat.",
        "Sang Memerang menangkap rakyat Sang Sebarau untuk makanan keluarganya.",
      ),
      evidence(
        "persoalan-aduan",
        "Membuat Aduan kepada Pemerintah",
        "Masalah boleh dibawa kepada pihak berkuasa untuk diselesaikan.",
        "Sang Memerang mengadu kepada Nabi Allah Sulaiman.",
      ),
      evidence(
        "persoalan-saksi",
        "Kepentingan Saksi",
        "Pengadilan memerlukan keterangan daripada pihak yang mengetahui kejadian.",
        "Baginda memanggil Syah Alam, Sang Bubut, Sang Biawak, Sang Labi-labi, Sang Udang dan Sang Sebarau.",
      ),
      evidence(
        "persoalan-bijak",
        "Kebijaksanaan Menyelesaikan Masalah",
        "Pemimpin perlu menyiasat keseluruhan rangkaian sebab.",
        "Nabi Allah Sulaiman mendengar setiap keterangan sebelum memutuskan kes.",
      ),
      evidence(
        "persoalan-jujur",
        "Kejujuran",
        "Kebenaran diperlukan untuk mencapai keputusan yang adil.",
        "Haiwan yang dipanggil menerangkan tindakan masing-masing dengan jujur.",
      ),
      evidence(
        "persoalan-mengaku",
        "Mengakui Kesalahan",
        "Seseorang perlu mengakui perbuatan salah yang dilakukan.",
        "Sang Memerang akhirnya mengaku menganiayai rakyat Sang Sebarau.",
      ),
      evidence(
        "persoalan-patuh",
        "Kepatuhan kepada Pemerintah",
        "Arahan pemerintah yang adil perlu dipatuhi.",
        "Pihak yang dipanggil datang menghadap Nabi Allah Sulaiman.",
      ),
      evidence(
        "persoalan-adil",
        "Keadilan dalam Pengadilan",
        "Keputusan mesti berdasarkan siasatan, bukan andaian.",
        "Nabi Allah Sulaiman tidak menghukum Syah Alam hanya berdasarkan aduan Sang Memerang.",
      ),
    ]),
    branch("watak", "Watak & Perwatakan", [
      branch("watak-syah", "Syah Alam di Rimba — Pelanduk", [
        evidence(
          "watak-syah-menteri",
          "Menteri",
          "Syah Alam ialah salah seorang menteri Nabi Allah Sulaiman.",
          "Dia meninjau wilayah dan rakyat di bawah tanggungjawabnya.",
        ),
        evidence(
          "watak-syah-bijak",
          "Bijaksana",
          "Dia terkenal sebagai menteri yang masyhur kebijaksanaannya.",
          "Dia memikirkan masalah penganiayaan ikan oleh Sang Memerang.",
        ),
        evidence(
          "watak-syah-prihatin",
          "Prihatin",
          "Dia mengambil berat masalah rakyat.",
          "Aduan ikan menyebabkan dia runsing dan mencari penyelesaian.",
        ),
        evidence(
          "watak-syah-silat",
          "Pandai Bersilat",
          "Dia mempunyai kemahiran pencak silat.",
          "Dia bersilat selepas mendengar bunyi Sang Bubut.",
        ),
        evidence(
          "watak-syah-taat",
          "Taat",
          "Dia patuh kepada Nabi Allah Sulaiman.",
          "Dia hadir apabila dipanggil menghadap.",
        ),
        evidence(
          "watak-syah-jujur",
          "Jujur",
          "Dia menerangkan kejadian sebenar.",
          "Dia mengaku anak memerang terpijak tanpa sengaja ketika dia bersilat.",
        ),
        node(
          "watak-syah-had",
          "Bukan Sengaja",
          "Syah Alam tidak sengaja membunuh anak memerang; kematian berlaku ketika dia bersilat.",
        ),
      ]),
      branch("watak-memerang", "Sang Memerang", [
        evidence(
          "watak-memerang-sayang",
          "Penyayang",
          "Ibu bapa memerang menyayangi anak-anak mereka.",
          "Mereka sangat sedih apabila menemukan tujuh anak mereka mati.",
        ),
        evidence(
          "watak-memerang-tanggung",
          "Bertanggungjawab sebagai Ibu Bapa",
          "Mereka berusaha menyediakan makanan untuk anak-anak.",
          "Mereka keluar mencari ikan ketika anak-anak berada di sarang.",
        ),
        evidence(
          "watak-memerang-tamak",
          "Tamak",
          "Mereka mengambil makanan tanpa memikirkan nasib makhluk lain.",
          "Mereka menangkap rakyat Sang Sebarau untuk dimakan.",
        ),
        evidence(
          "watak-memerang-diri",
          "Mementingkan Diri",
          "Kepentingan keluarga sendiri diutamakan sehingga pihak lain teraniaya.",
          "Perbuatan mereka memusnahkan keluarga Sang Sebarau.",
        ),
        evidence(
          "watak-memerang-patuh",
          "Patuh",
          "Mereka menurut perintah pemerintah.",
          "Mereka bercakap benar apabila diarahkan Nabi Allah Sulaiman.",
        ),
        evidence(
          "watak-memerang-insaf",
          "Insaf",
          "Mereka akhirnya sedar dan mengakui kesalahan.",
          "Pengakuan dibuat selepas keterangan Sang Sebarau didengar.",
        ),
        node(
          "watak-memerang-kontras",
          "Sifat Bercampur",
          "SAYANG ANAK tidak semestinya BAIK TERHADAP SEMUA PIHAK. Watak boleh memiliki sifat positif dan negatif serentak.",
        ),
      ]),
      branch("watak-sulaiman", "Nabi Allah Sulaiman", [
        evidence(
          "watak-sulaiman-adil",
          "Adil",
          "Baginda tidak menghukum berdasarkan tuduhan satu pihak.",
          "Semua pihak didengar sebelum Syah Alam dibebaskan.",
        ),
        evidence(
          "watak-sulaiman-bijak",
          "Bijaksana",
          "Baginda menelusuri rangkaian sebab secara tersusun.",
          "Setiap haiwan dipanggil mengikut keterangan sebelumnya.",
        ),
        evidence(
          "watak-sulaiman-teliti",
          "Tidak Terburu-buru",
          "Baginda meneliti maklumat sebelum membuat keputusan.",
          "Aduan Sang Memerang diikuti perbicaraan dan keterangan saksi.",
        ),
        evidence(
          "watak-sulaiman-tegas",
          "Tegas",
          "Baginda menuntut kebenaran daripada pihak terlibat.",
          "Sang Memerang diperintahkan bercakap benar selepas cerita Sang Sebarau.",
        ),
        evidence(
          "watak-sulaiman-prihatin",
          "Prihatin",
          "Baginda mendengar masalah rakyat.",
          "Aduan Sang Memerang diterima dan disiasat.",
        ),
        node("watak-sulaiman-formula", "Formula", "DENGAR → SIASAT → SAKSI → NILAI → PUTUSKAN."),
      ]),
      branch("watak-saksi", "Watak Sampingan dan Saksi", [
        node(
          "watak-belatuk",
          "Sang Belatuk",
          "Utusan yang memanggil pihak terlibat menghadap atas perintah Nabi Allah Sulaiman.",
        ),
        node(
          "watak-bubut",
          "Sang Bubut",
          "Menjelaskan bahawa bunyinya berpunca daripada melihat Sang Biawak membawa pedang sambil berlari.",
        ),
        node(
          "watak-biawak",
          "Sang Biawak",
          "Menjelaskan bahawa dia membawa pedang kerana melihat Sang Labi-labi membawa perisai.",
        ),
        node(
          "watak-labi",
          "Sang Labi-labi",
          "Menjelaskan bahawa dia membawa perisai kerana melihat Sang Udang membawa tombak.",
        ),
        node(
          "watak-udang",
          "Sang Udang",
          "Menjelaskan bahawa tindakannya berpunca daripada melihat Sang Sebarau kelihatan dalam kesusahan.",
        ),
        node(
          "watak-sebarau",
          "Sang Sebarau",
          "Mendedahkan bahawa rakyat dan keluarganya telah dianiaya serta dimakan oleh Sang Memerang.",
        ),
        node(
          "watak-saksi-rantai",
          "Rantaian",
          "SYAH ALAM → BUBUT → BIAWAK → LABI-LABI → UDANG → SEBARAU → MEMERANG.",
        ),
      ]),
    ]),
    branch("binaan-plot", "Binaan Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Syah Alam melawat wilayah, menemukan tujuh anak memerang dan mengetahui ibu bapa mereka mencari ikan. Bunyi Sang Bubut menyebabkan dia bersilat lalu terpijak anak-anak itu tanpa sedar.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Sang Memerang pulang pada waktu petang, menemukan anak-anak mereka mati, melihat kesan tapak kaki Syah Alam dan memutuskan pada waktu malam untuk mengadu.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Sang Memerang mengadu kepada Nabi Allah Sulaiman. Baginda mengadakan perbicaraan dan memanggil semua pihak yang membentuk rangkaian sebab.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Selepas Sang Sebarau menjelaskan penganiayaan yang berlaku, Sang Memerang mengaku dan Nabi Allah Sulaiman memutuskan Syah Alam tidak bersalah.",
      ),
      node("plot-formula", "Formula", "PERMULAAN → PERKEMBANGAN → KLIMAKS → PELERAIAN."),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      evidence(
        "teknik-dialog",
        "Dialog",
        "Percakapan langsung menggerakkan perbicaraan dan menyampaikan keterangan.",
        "Nabi Allah Sulaiman menyoal pihak terlibat dan mereka menjawab; dialog asal tidak disalin.",
      ),
      evidence(
        "teknik-monolog",
        "Monolog Dalaman",
        "Fikiran watak memperlihatkan kebimbangan dan pertimbangannya.",
        "Syah Alam memikirkan penganiayaan Sang Memerang terhadap ikan.",
      ),
      evidence(
        "teknik-pemerian",
        "Pemerian",
        "Pencerita menerangkan watak, tempat dan kejadian.",
        "Pencerita memperkenalkan pemerintahan Nabi Allah Sulaiman serta lawatan Syah Alam ke wilayahnya.",
      ),
      node(
        "teknik-had",
        "Had Bukti",
        "Peristiwa diterangkan secara parafrasa tanpa mencipta atau menyalin dialog panjang.",
      ),
    ]),
    branch("latar", "Latar", [
      branch("latar-tempat", "Latar Tempat", [
        node("latar-hutan", "Hutan Rimba", "Wilayah yang ditinjau oleh Syah Alam di Rimba."),
        node(
          "latar-lubang",
          "Lubang / Sarang Sang Memerang",
          "Tempat tujuh anak memerang bermain dan ditemukan mati.",
        ),
        node(
          "latar-istana",
          "Kota Istana / Singgahsana",
          "Tempat Nabi Allah Sulaiman menjalankan pemerintahan dan perbicaraan.",
        ),
        node("latar-lubuk", "Lubuk", "Tempat yang dikaitkan dengan Sang Sebarau dan rakyatnya."),
      ]),
      branch("latar-masa", "Latar Masa", [
        node(
          "latar-dahulu",
          "Zaman Dahulu",
          "Cerita berlaku pada zaman pemerintahan Nabi Allah Sulaiman.",
        ),
        node(
          "latar-siang",
          "Waktu Siang / Pagi",
          "Sang Memerang pergi menghadap Nabi Allah Sulaiman setelah hari siang.",
        ),
        node(
          "latar-petang",
          "Waktu Petang",
          "Ibu bapa memerang pulang dan menemukan anak-anak mereka mati.",
        ),
        node(
          "latar-malam",
          "Waktu Malam",
          "Ibu bapa memerang berbincang lalu membuat keputusan untuk mengadu.",
        ),
      ]),
      branch("latar-masyarakat", "Latar Masyarakat", [
        node(
          "latar-rimba",
          "Masyarakat Haiwan di Rimba",
          "Haiwan berkata-kata dan menjadi rakyat dalam pemerintahan Nabi Allah Sulaiman.",
        ),
        node(
          "latar-patuh",
          "Masyarakat yang Patuh",
          "Pihak yang dipanggil hadir menghadap pemerintah.",
        ),
        node("latar-jujur", "Masyarakat yang Jujur", "Saksi menerangkan perkara yang berlaku."),
        node(
          "latar-diri",
          "Masyarakat yang Mementingkan Diri",
          "Sang Memerang menganiayai pihak lain demi makanan keluarganya.",
        ),
        node(
          "latar-bijak",
          "Masyarakat yang Bijak",
          "Nabi Allah Sulaiman menyelesaikan masalah melalui siasatan.",
        ),
      ]),
    ]),
    branch("konflik", "Konflik & Sebab-Akibat", [
      node(
        "konflik-asal",
        "Punca Lebih Awal",
        "SANG MEMERANG MENANGKAP RAKYAT SEBARAU → PIHAK LAIN TERANIAYA.",
      ),
      node(
        "konflik-rantai",
        "Rangkaian Tindakan",
        "SEBARAU KESUSAHAN → UDANG → LABI-LABI → BIAWAK → BUBUT BERBUNYI → SYAH ALAM BERSILAT.",
      ),
      node(
        "konflik-segera",
        "Sebab Serta-merta",
        "Syah Alam terpijak tujuh anak memerang tanpa sedar ketika bersilat.",
      ),
      node(
        "konflik-aduan",
        "Tuduhan dan Pengadilan",
        "MEMERANG MENUDUH → NABI SULAIMAN MENYIASAT → SAKSI MEMBERI KETERANGAN.",
      ),
      node(
        "konflik-akhir",
        "Kebenaran",
        "KESALAHAN MEMERANG TERBONGKAR → MEMERANG MENGAKU → SYAH ALAM TIDAK BERSALAH.",
      ),
      node(
        "konflik-beza",
        "Sebab Bukan Peristiwa Terakhir Sahaja",
        "Sebab serta-merta menjelaskan bagaimana kematian berlaku; rantaian sebab menerangkan mengapa cerita menghubungkan kejadian itu dengan penganiayaan Sang Memerang.",
      ),
    ]),
    branch("pengadilan", "Pengadilan Nabi Sulaiman", [
      step(
        "adil-1",
        1,
        "Dengar Aduan",
        "Baginda memberi ruang kepada Sang Memerang mengemukakan masalah.",
      ),
      step("adil-2", 2, "Jangan Terus Percaya Satu Pihak", "Aduan belum menjadi bukti muktamad."),
      step(
        "adil-3",
        3,
        "Panggil Pihak Terlibat",
        "Sang Belatuk diarahkan membawa pihak berkaitan menghadap.",
      ),
      step(
        "adil-4",
        4,
        "Dengar Saksi",
        "Setiap pihak menerangkan tindakan yang dilihat atau dilakukan.",
      ),
      step(
        "adil-5",
        5,
        "Semak Sebab-Akibat",
        "Baginda menelusuri rangkaian daripada bunyi Sang Bubut hingga kesusahan Sang Sebarau.",
      ),
      step(
        "adil-6",
        6,
        "Minta Kebenaran",
        "Sang Memerang diperintahkan bercakap benar selepas keterangan Sang Sebarau.",
      ),
      step("adil-7", 7, "Buat Keputusan", "Baginda memutuskan Syah Alam di Rimba tidak bersalah."),
      node("adil-formula", "Formula", "ADUAN → SIASAT → BUKTI + SAKSI → KEPUTUSAN."),
      branch("adil-analogi", "Analogi Moden: Pertikaian Murid", [
        node(
          "adil-analogi-situasi",
          "Situasi",
          "Dua murid berselisih dan seorang membuat aduan terlebih dahulu.",
        ),
        node(
          "adil-analogi-tindakan",
          "Tindakan Guru",
          "Guru perlu mendengar kedua-dua pihak, mencari saksi dan menyemak bukti sebelum membuat keputusan.",
        ),
        node(
          "adil-analogi-had",
          "Batas Analogi",
          "Ini ialah analogi moden untuk memahami pengadilan adil, bukan peristiwa dalam cerita.",
        ),
      ]),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-bijak",
        "Kebijaksanaan",
        "Masalah diselesaikan dengan pertimbangan yang tersusun.",
        "Nabi Allah Sulaiman memanggil semua pihak sebelum memutuskan kes.",
      ),
      evidence(
        "nilai-adil",
        "Keadilan",
        "Setiap pihak diberi peluang dan keputusan dibuat berdasarkan fakta.",
        "Syah Alam tidak dihukum hanya kerana dituduh.",
      ),
      evidence(
        "nilai-jujur",
        "Kejujuran",
        "Keterangan benar membantu pengadilan.",
        "Saksi menerangkan tindakan masing-masing dan Sang Memerang akhirnya mengaku.",
      ),
      evidence(
        "nilai-prihatin",
        "Keprihatinan",
        "Pemimpin mengambil berat masalah rakyat.",
        "Nabi Allah Sulaiman mendengar serta menyiasat aduan.",
      ),
      evidence(
        "nilai-tanggung",
        "Tanggungjawab",
        "Ibu bapa bertanggungjawab menyediakan keperluan anak.",
        "Sang Memerang keluar mencari makanan untuk tujuh anak mereka.",
      ),
      evidence(
        "nilai-patuh",
        "Kepatuhan",
        "Arahan pemerintah dipatuhi.",
        "Sang Belatuk dan pihak yang dipanggil melaksanakan perintah baginda.",
      ),
      evidence(
        "nilai-insaf",
        "Keinsafan",
        "Kesalahan perlu disedari dan diakui.",
        "Sang Memerang mengaku selepas kebenaran didedahkan.",
      ),
      evidence(
        "nilai-berani",
        "Keberanian",
        "Berani berkata benar membantu menyelesaikan masalah.",
        "Pihak yang dipanggil berterus terang di hadapan Nabi Allah Sulaiman.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "ajar-adil",
        "Kita Hendaklah Berlaku Adil",
        "Keputusan hendaklah dibuat berdasarkan fakta dan keterangan semua pihak.",
      ),
      node(
        "ajar-siasat",
        "Kita Hendaklah Menyiasat dengan Teliti",
        "Kita tidak seharusnya terburu-buru menghukum seseorang.",
      ),
      node(
        "ajar-benar",
        "Kita Hendaklah Bercakap Benar",
        "Kejujuran penting untuk mencapai keputusan yang adil.",
      ),
      node(
        "ajar-mengaku",
        "Kita Hendaklah Mengakui Kesalahan",
        "Kesalahan tidak patut disembunyikan apabila kebenaran diminta.",
      ),
      node(
        "ajar-aniaya",
        "Kita Jangan Menganiayai Pihak Lain",
        "Perbuatan yang memudaratkan orang lain boleh membawa akibat.",
      ),
      node(
        "ajar-tamak",
        "Kita Jangan Bersikap Tamak",
        "Jangan mengambil secara berlebihan hingga menjejaskan pihak lain.",
      ),
      node(
        "ajar-pemimpin",
        "Pemimpin Hendaklah Prihatin",
        "Pemimpin perlu mendengar dan menyelesaikan masalah rakyat dengan bijaksana.",
      ),
      node(
        "ajar-ibu-bapa",
        "Ibu Bapa Hendaklah Bertanggungjawab",
        "Ibu bapa perlu menjaga dan menyediakan keperluan anak-anak.",
      ),
    ]),
    branch("bahasa", "Bahasa Prosa Tradisional", [
      branch("bahasa-klasik", "Bahasa Klasik", [
        node("bahasa-sebermula", "Sebermula", "Maksud moden: pada mulanya / pembuka cerita."),
        node("bahasa-hatta", "Hatta", "Maksud moden: lalu / kemudian."),
        node("bahasa-ayapan", "Ayapan", "Maksud moden: makanan atau santapan."),
        node(
          "bahasa-pacal",
          "Pacal",
          "Maksud moden: hamba; digunakan ketika merendah diri di hadapan raja.",
        ),
      ]),
      branch("bahasa-istana", "Bahasa Istana", [
        node("bahasa-baginda", "Baginda", "Kata ganti diri bagi raja atau nabi dalam cerita."),
        node("bahasa-bertitah", "Bertitah", "Maksud moden: raja berkata atau memberi perintah."),
        node("bahasa-patik", "Patik", "Kata ganti diri rakyat ketika bercakap dengan raja."),
        node("bahasa-tuanku", "Tuanku", "Kata sapaan hormat kepada raja."),
        node("bahasa-singgahsana", "Singgahsana", "Tempat duduk rasmi raja."),
      ]),
      node(
        "bahasa-arab",
        "Bahasa Arab",
        "Istilah seperti Allah Subhanahuwataala, kudrat-Nya dan fasal hadir dalam teks.",
      ),
      node(
        "bahasa-struktur",
        "Struktur Ayat Lama",
        "Ayat boleh lebih panjang dan menggunakan susunan yang berbeza daripada Bahasa Melayu moden.",
      ),
      node(
        "bahasa-had",
        "Cara Belajar",
        "Padankan istilah klasik dengan maksud moden; jangan menghafal petikan panjang.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-utama",
        "Urutan Utama",
        "PELANDUK → BERSILAT → 7 ANAK MEMERANG MATI → ADUAN → SIASATAN → SAKSI → PENGAKUAN → KEADILAN.",
      ),
      node("kata-memerang", "Sang Memerang", "TAMAK → MENGANIAYA → AKIBAT → INSAF."),
      node("kata-sulaiman", "Nabi Allah Sulaiman", "DENGAR → SIASAT → ADIL."),
      node("kata-identiti", "Identiti Pelanduk", "PELANDUK = SYAH ALAM DI RIMBA = MENTERI."),
      node("kata-mesej", "Mesej Teras", "BUAT SALAH → ADA AKIBAT; JANGAN HUKUM SEBELUM SIASAT."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-sinopsis", "Sinopsis", "SIAPA + MASALAH + SIASATAN + KEPUTUSAN."),
      node("jawab-tema", "Tema", "IDEA UTAMA + PERISTIWA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + PERISTIWA."),
      node("jawab-watak", "Watak / Perwatakan", "WATAK + SIFAT + PERISTIWA."),
      node("jawab-nilai", "Nilai", "NILAI + PERISTIWA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + SEBAB / PERISTIWA."),
      node("jawab-latar", "Latar", "JENIS LATAR + TEMPAT / MASA / MASYARAKAT + PERISTIWA."),
      node("jawab-plot", "Binaan Plot", "TAHAP + PERISTIWA."),
      node("jawab-teknik", "Teknik Plot", "TEKNIK + BUKTI PERISTIWA; elakkan dialog rekaan."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-pelanduk",
        "Pelanduk = Anak Memerang",
        "Salah. Pelanduk ialah Syah Alam di Rimba, salah seorang menteri Nabi Allah Sulaiman.",
      ),
      node(
        "salah-sengaja",
        "Syah Alam Sengaja Membunuh",
        "Salah. Anak-anak memerang terpijak tanpa sedar ketika Syah Alam bersilat.",
      ),
      node(
        "salah-hukum",
        "Nabi Sulaiman Terus Menghukum",
        "Salah. Baginda menyiasat dan mendengar saksi terlebih dahulu.",
      ),
      node(
        "salah-memerang",
        "Sang Memerang Tidak Bersalah",
        "Salah. Sang Memerang akhirnya mengakui penganiayaan terhadap rakyat Sang Sebarau.",
      ),
      node(
        "salah-tema-mati",
        "Tema = Kematian Anak Memerang",
        "Salah. Itu ialah peristiwa plot, bukan idea utama.",
      ),
      node(
        "salah-tema-adil",
        "Tema = Keadilan Sahaja",
        "Tidak lengkap. Keadilan penting, tetapi tema diterima ialah balasan terhadap golongan yang menganiayai pihak lain.",
      ),
      node(
        "salah-watak",
        "Watak = Perwatakan",
        "Bezakan: watak ialah Nabi Allah Sulaiman; perwatakan baginda ialah adil, bijaksana dan tegas.",
      ),
      node("salah-nilai", "Nilai Tanpa Bukti", "Jawapan lemah. Gunakan NILAI + PERISTIWA."),
      node("salah-latar", "Waktu Malam = Latar Tempat", "Salah. Waktu malam ialah latar masa."),
      node(
        "salah-plot",
        "Plot = Tema",
        "Salah. Plot ialah urutan peristiwa; tema ialah idea pusat.",
      ),
      node(
        "salah-aduan",
        "Aduan = Bukti Bersalah",
        "Salah. ADUAN → SIASATAN → BUKTI + SAKSI → KEPUTUSAN.",
      ),
      node(
        "salah-reka",
        "Mencipta Dialog",
        "Jangan mereka dialog atau keterangan saksi. Gunakan peristiwa yang telah disahkan.",
      ),
    ]),
  ],
};
