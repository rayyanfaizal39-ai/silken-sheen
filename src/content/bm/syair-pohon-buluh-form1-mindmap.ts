import type { MindNode } from "@/components/MindMap";

// Content checked against NGKOMSAS.pdf (Penerbitan Pelangi) and
// TG1_BM_Prak2.pdf (Oxford Fajar), which identifies the prescribed anthology text on page 6.
const PREFIX = "bm-f1-syair-pohon-buluh";

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

function supported(id: string, label: string, explanation: string, support: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-sokongan`, "Rangkap / Idea Sokongan", support),
  ]);
}

export const bahasaMelayuTingkatan1SyairPohonBuluhMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "SYAIR POHON BULUH",
  summary:
    "Syair menggambarkan pohon buluh yang tinggi, beruas, hidup serumpun dan mempunyai asas yang kuat sebagai lambang masyarakat yang bersatu, bertanggungjawab serta menjaga keharmonian.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      node(
        "maksud-rangkap-1",
        "Rangkap 1",
        "Pohon buluh digambarkan seperti menara yang tinggi dan beruas-ruas. Bahagian dalam batangnya kosong, manakala setiap ruas dilindungi oleh miang.",
      ),
      node(
        "maksud-rangkap-2",
        "Rangkap 2",
        "Daun buluh kelihatan seperti panji-panji hingga ke pucuk. Banyak batang hidup seperti saudara dalam satu rumpun; hubungan itu perlu dijaga kerana persengketaan boleh menimbulkan huru-hara.",
      ),
      node(
        "maksud-rangkap-3",
        "Rangkap 3",
        "Batang buluh yang tinggi atau rendah serta besar atau kecil hidup berpadu dalam rumpun yang mempunyai asas kukuh. Gambaran ini menekankan kekuatan melalui muafakat tanpa mengira kedudukan.",
      ),
      node(
        "maksud-rangkap-4",
        "Rangkap 4",
        "Bahagian luar dan dalam batang buluh licin, bahagian dalamnya gelap dan dapat menakung air. Ikatan ruasnya tidak begitu jelas dari luar tetapi memberikan manfaat kepada batang.",
      ),
      node(
        "maksud-had",
        "Parafrasa, Bukan Salinan",
        "Keempat-empat maksud diterangkan dengan bahasa moden tanpa menyalin rangkap penuh.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "PERPADUAN DAN KEHARMONIAN DALAM KEHIDUPAN BERMASYARAKAT", [
        node(
          "tema-huraian",
          "Huraian",
          "Pohon buluh yang hidup serumpun, terdiri daripada batang pelbagai saiz dan mempunyai asas yang kuat melambangkan masyarakat yang memperoleh manfaat apabila hidup bersatu padu.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Syair Pohon Buluh ialah perpaduan dan keharmonian dalam kehidupan bermasyarakat. Hal ini digambarkan melalui pohon buluh yang hidup serumpun dan menjadi kuat apabila bersatu.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-perpaduan",
        "Kepentingan Perpaduan",
        "Masyarakat memperoleh kekuatan dan manfaat apabila hidup bersatu padu.",
        "Rangkap 3 menggambarkan batang buluh pelbagai saiz yang berpadu pada asas yang kuat.",
      ),
      supported(
        "persoalan-kerjasama",
        "Kepentingan Muafakat dan Kerjasama",
        "Kesepakatan membolehkan anggota masyarakat berkongsi matlamat dan saling membantu.",
        "Gambaran rumpun buluh menunjukkan banyak batang hidup bersama sebagai satu kesatuan.",
      ),
      supported(
        "persoalan-persaudaraan",
        "Hubungan Persaudaraan",
        "Hubungan sesama anggota masyarakat perlu dipelihara agar kehidupan kekal aman.",
        "Rangkap 2 menekankan bahawa banyak batang buluh hidup bersaudara dalam satu rumpun.",
      ),
      supported(
        "persoalan-pangkat",
        "Darjat dan Pangkat Bukan Pemisah",
        "Perbezaan kedudukan tidak sepatutnya memecahkan perpaduan masyarakat.",
        "Rangkap 3 menyatukan batang yang tinggi atau rendah serta besar atau kecil pada asas yang sama.",
      ),
      supported(
        "persoalan-tanggungjawab",
        "Tanggungjawab Menjaga Keamanan",
        "Setiap anggota masyarakat bertanggungjawab melaksanakan peranan demi keamanan bersama.",
        "Gambaran kawalan pada setiap tingkat dalam Rangkap 1 menyokong idea tugas yang dilaksanakan secara menyeluruh.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Puisi Tradisional Berbentuk Syair",
        "Karya ini ialah syair dalam antologi Kuingin Berterima Kasih, Tingkatan 1.",
      ),
      node("bentuk-rangkap", "Empat Rangkap", "Teks yang ditetapkan mengandungi empat rangkap."),
      node(
        "bentuk-baris",
        "Empat Baris Serangkap",
        "Setiap rangkap mempunyai empat baris dan semua baris membawa maksud.",
      ),
      node(
        "bentuk-kata",
        "Empat hingga Enam Patah Kata",
        "Setiap baris mengandungi antara empat hingga enam patah kata.",
      ),
      node(
        "bentuk-suku-kata",
        "Sembilan hingga Dua Belas Suku Kata",
        "Setiap baris mengandungi antara sembilan hingga dua belas suku kata.",
      ),
      node(
        "bentuk-rima",
        "Rima Akhir aaaa",
        "Keempat-empat baris dalam setiap rangkap mempunyai bunyi akhir yang sama.",
      ),
      node(
        "bentuk-terikat",
        "Bentuk Terikat",
        "Bilangan baris dan pola rima yang tetap menjadikan syair ini puisi terikat.",
      ),
    ]),
    branch("ciri-syair", "Ciri Syair", [
      node(
        "ciri-tiada-pembayang",
        "Tiada Pembayang",
        "Semua baris menyumbang kepada maksud; syair tidak mempunyai pembayang dan maksud seperti pantun.",
      ),
      node(
        "ciri-idea-berterusan",
        "Idea Berterusan",
        "Gambaran fizikal buluh berkembang daripada satu rangkap ke rangkap berikutnya sebelum dikaitkan dengan kehidupan bermasyarakat.",
      ),
      node(
        "ciri-bahasa-puitis",
        "Bahasa Puitis",
        "Perbandingan dan imej pohon buluh menjadikan nasihat tentang perpaduan lebih jelas serta mudah diingati.",
      ),
      node(
        "ciri-irama",
        "Irama Teratur",
        "Empat baris serangkap dan rima aaaa menyokong pembacaan yang berirama.",
      ),
      node(
        "ciri-masyarakat",
        "Gambaran Masyarakat",
        "Ciri pohon buluh digunakan untuk menyampaikan nilai perpaduan, persaudaraan dan tanggungjawab.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-simbolisme", "Simbolisme", [
        node(
          "gaya-simbolisme-bukti",
          "Bukti",
          "Pohon buluh mewakili masyarakat yang hidup bersatu padu.",
        ),
        node(
          "gaya-simbolisme-kesan",
          "Kesan",
          "Imej alam menjadikan gagasan perpaduan lebih konkrit.",
        ),
      ]),
      branch("gaya-anafora", "Anafora", [
        node(
          "gaya-anafora-bukti",
          "Contoh Ringkas",
          "Pengulangan kata ‘Ikat’ pada awal dua baris dalam Rangkap 4.",
        ),
        node(
          "gaya-anafora-kesan",
          "Kesan",
          "Pengulangan menegaskan struktur dan ikatan pada batang buluh.",
        ),
      ]),
      branch("gaya-simile", "Simile", [
        node(
          "gaya-simile-bukti",
          "Contoh Ringkas",
          "Perbandingan menggunakan ‘seperti malam’ dan ‘seperti kolam’.",
        ),
        node(
          "gaya-simile-kesan",
          "Kesan",
          "Perbandingan menerangkan keadaan dalam batang buluh dengan gambaran yang mudah dibayangkan.",
        ),
      ]),
      branch("gaya-sinkope", "Sinkope", [
        node(
          "gaya-sinkope-bukti",
          "Contoh Ringkas",
          "Kata singkat ‘tak’ digunakan dalam Rangkap 4.",
        ),
        node(
          "gaya-sinkope-kesan",
          "Kesan",
          "Bentuk singkat mengekalkan kepadatan dan irama baris.",
        ),
      ]),
      branch("gaya-asonansi", "Asonansi", [
        node(
          "gaya-asonansi-bukti",
          "Bukti",
          "Pengulangan bunyi vokal a ketara dalam baris tentang penjagaan setiap pangkat.",
        ),
        node("gaya-asonansi-kesan", "Kesan", "Pengulangan vokal menghasilkan kemerduan bunyi."),
      ]),
      branch("gaya-aliterasi", "Aliterasi", [
        node(
          "gaya-aliterasi-bukti",
          "Bukti",
          "Pengulangan konsonan k ketara dalam baris terakhir syair.",
        ),
        node(
          "gaya-aliterasi-kesan",
          "Kesan",
          "Pengulangan konsonan menguatkan irama dan penegasan.",
        ),
      ]),
    ]),
    branch("simbol-pohon-buluh", "Simbol Pohon Buluh", [
      node(
        "simbol-rumpun",
        "Hidup Serumpun → Perpaduan",
        "Banyak batang yang hidup bersama melambangkan masyarakat yang bersatu padu.",
      ),
      node(
        "simbol-pelbagai",
        "Tinggi, Rendah, Besar dan Kecil → Masyarakat Pelbagai",
        "Perbezaan saiz melambangkan anggota masyarakat daripada kedudukan yang berbeza tetapi tetap berada dalam satu kesatuan.",
      ),
      node(
        "simbol-asas",
        "Asas Kuat → Muafakat",
        "Asas rumpun yang kuat melambangkan kesepakatan yang mengukuhkan masyarakat.",
      ),
      node(
        "simbol-saudara",
        "Bersaudara → Silaturahim",
        "Batang-batang dalam rumpun melambangkan hubungan persaudaraan yang perlu dipelihara.",
      ),
      node(
        "simbol-ruas",
        "Ruas dan Ikatan → Susunan Teratur",
        "Struktur beruas menunjukkan bahawa setiap bahagian mempunyai tempat dan fungsi dalam keseluruhan yang tersusun.",
      ),
      node(
        "simbol-visual",
        "POHON BULUH — PETA SIMBOL",
        "SERUMPUN → BERSATU • PELBAGAI SAIZ → TANPA MEMBEZAKAN PANGKAT • ASAS KUAT → MUAFAKAT • BERSAUDARA → HARMONI.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-bersatu",
        "Bersatu Padu",
        "Anggota masyarakat hidup sebagai satu kesatuan demi kebaikan bersama.",
        "Rumpun buluh menggabungkan banyak batang pada asas yang kukuh.",
      ),
      supported(
        "nilai-kerjasama",
        "Kerjasama",
        "Anggota masyarakat bermuafakat dan saling membantu untuk mencapai matlamat.",
        "Batang yang pelbagai saiz tetap hidup bersama dalam satu rumpun.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Bertanggungjawab",
        "Setiap anggota menjalankan tugas untuk menjaga keamanan masyarakat dan negara.",
        "Rangkap 1 menggambarkan penjagaan yang meliputi setiap tingkat.",
      ),
      supported(
        "nilai-persaudaraan",
        "Persaudaraan",
        "Hubungan sesama anggota masyarakat dijaga dan dikekalkan.",
        "Rangkap 2 menggambarkan banyak batang buluh sebagai saudara dalam satu rumpun.",
      ),
      supported(
        "nilai-patriotisme",
        "Patriotisme",
        "Anggota masyarakat bersama-sama menjaga keamanan negara.",
        "Tanggungjawab menjaga keseluruhan kesatuan menyokong semangat cinta akan keamanan negara.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-bersatu",
        "Kita Hendaklah Hidup Bersatu Padu",
        "Perpaduan memberikan kekuatan dan manfaat kepada masyarakat.",
      ),
      node(
        "pengajaran-kerjasama",
        "Kita Hendaklah Bekerjasama",
        "Muafakat membantu masyarakat mencapai matlamat bersama.",
      ),
      node(
        "pengajaran-persaudaraan",
        "Kita Hendaklah Menjaga Persaudaraan",
        "Hubungan yang baik mengelakkan persengketaan dan memelihara keharmonian.",
      ),
      node(
        "pengajaran-pangkat",
        "Kita Janganlah Membezakan Pangkat",
        "Darjat dan kedudukan tidak sepatutnya menjadi pemisah antara anggota masyarakat.",
      ),
      node(
        "pengajaran-tanggungjawab",
        "Kita Hendaklah Bertanggungjawab",
        "Setiap anggota perlu melaksanakan peranan demi menjaga keamanan bersama.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-nasihat",
        "NASIHAT — NADA UTAMA",
        "Penyair menggunakan gambaran pohon buluh untuk membimbing masyarakat supaya hidup bersatu padu, menjaga persaudaraan dan melaksanakan tanggungjawab.",
      ),
      node(
        "nada-had",
        "Fokus pada Nada Utama",
        "Nada pujian atau kekaguman tidak ditambah kerana nada nasihat paling jelas melalui mesej keseluruhan syair.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "RANTAIAN INGATAN",
        "BULUH → RUMPUN → BERSATU → MUAFAKAT → ASAS KUAT → HARMONI.",
      ),
      node(
        "kata-masyarakat",
        "MASYARAKAT IDEAL",
        "PERPADUAN + KERJASAMA + TANGGUNGJAWAB + PERSAUDARAAN.",
      ),
      node(
        "kata-teras",
        "MESEJ TERAS",
        "MASYARAKAT KUAT = BERSATU + BEKERJASAMA + MENJAGA KEAMANAN.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "IDEA UTAMA + PARAFRASA. Jangan salin rangkap."),
      node("jawab-tema", "Tema", "TEMA + DUA IDEA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + IDEA RANGKAP."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN ATAU AMALAN."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
      node("jawab-simbol", "Simbol", "OBJEK → MAKSUD. Contoh: rumpun buluh → masyarakat bersatu."),
      node("jawab-bentuk", "Bentuk", "CIRI + BUKTI. Contoh: empat baris bagi setiap rangkap."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-literal",
        "Buluh Ditafsir Secara Literal Sahaja",
        "Pohon buluh juga menjadi simbol masyarakat yang bersatu padu.",
      ),
      node(
        "kesalahan-tema",
        "Tema = Pokok Buluh",
        "Pohon buluh ialah imej utama; tema ialah perpaduan dan keharmonian hidup bermasyarakat.",
      ),
      node(
        "kesalahan-pantun",
        "Syair Disamakan dengan Pantun",
        "Syair tidak mempunyai pembayang dan maksud seperti pantun; semua baris membawa makna.",
      ),
      node(
        "kesalahan-pembayang",
        "Baris Pertama Dianggap Pembayang",
        "Keempat-empat baris dalam setiap rangkap menyumbang kepada gambaran dan idea syair.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai: kerjasama. Pengajaran: Kita hendaklah bekerjasama.",
      ),
      node(
        "kesalahan-salin",
        "Maksud Rangkap Disalin",
        "Terangkan idea rangkap dengan bahasa sendiri.",
      ),
      node(
        "kesalahan-gaya",
        "Gaya Bahasa Direka",
        "Jangan menambah personifikasi, hiperbola atau teknik lain tanpa bukti teks.",
      ),
      node(
        "kesalahan-simbol",
        "Simbolisme Terlalu Jauh",
        "Jangan kaitkan angin, ketabahan atau pemimpin dengan syair ini tanpa sokongan teks.",
      ),
      node(
        "kesalahan-rangkap",
        "Bilangan Rangkap Salah",
        "Teks yang ditetapkan mempunyai empat rangkap, bukan jumlah yang diandaikan daripada ciri umum syair.",
      ),
    ]),
  ],
};
