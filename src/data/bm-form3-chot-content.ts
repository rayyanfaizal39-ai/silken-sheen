import type { BMForm3NovelAnalysis, BMForm3NovelChapter } from "@/data/bm-form3-novel-structure";

const chapter = (
  number: number,
  title: string,
  content: NonNullable<BMForm3NovelChapter["content"]>,
): BMForm3NovelChapter => ({ id: `bab-${number}`, label: `Bab ${number}: ${title}`, content });

export const CHOT_CHAPTERS_11_TO_20: BMForm3NovelChapter[] = [
  chapter(11, "Dapat Upah Memetik Kelapa", {
    ringkasanBab:
      "Alias pulang ke rumah dan mendapati ibunya batuk-batuk. Mak Su Kiah menghantar makanan untuk mereka. Alias kemudian pergi ke rumah Pak Din untuk memaklumkan hasil kerja memetik kelapa dan meminta Pak Din membelikan ubat batuk untuk ibunya.",
    peristiwaUtama: "Alias menerima upah daripada Pak Din hasil memetik buah kelapa.",
    tindakanWatak:
      "Alias mencadangkan ibunya minum air kelapa untuk mengurangkan batuk. Pak Din memberikan upah sebanyak lima belas ringgit kepada Alias.",
    konflikPerumitan: "Kesihatan ibu Alias yang membimbangkan kerana batuk yang berlarutan.",
    latarSpesifik: "Rumah Alias dan rumah Pak Din.",
    watakTerlibat: "Alias, Ibu, Mak Su Kiah, Pak Din, Som.",
    resolusiKecil: "Alias memperoleh wang untuk membeli ubat dan barangan keperluan dapur.",
    persoalanBab: "Tanggungjawab seorang anak menjaga kesihatan ibu bapa.",
    nilaiBab: "Bertanggungjawab.",
    pengajaranBab: "Kita mestilah menjaga kebajikan ahli keluarga yang sedang sakit.",
  }),
  chapter(12, "Ibu Sudah Tahu", {
    ringkasanBab:
      "Alias membeli barangan dapur di kedai Ah Chai. Setibanya di rumah, rahsia kecederaan telinganya terbongkar apabila ibunya terhidu bau busuk yang datang daripada telinga Alias yang bernanah.",
    peristiwaUtama: "Ibu Alias mengetahui keadaan telinga Alias yang semakin parah.",
    tindakanWatak:
      "Alias membeli beras, gula, kopi, dan pisang untuk Chot. Ibu menyuruh Alias menyapukan minyak angin pada telinganya.",
    konflikPerumitan:
      "Kebimbangan Alias sekiranya bau busuk tersebut menyebabkan dia diejek oleh kawan-kawan dan dipulaukan oleh Som.",
    latarSpesifik: "Kedai Ah Chai dan rumah Alias.",
    watakTerlibat: "Alias, Ah Chai, Ibu.",
    resolusiKecil: "Ibu menasihati Alias agar merawat telinganya.",
    persoalanBab: "Kasih sayang ibu yang prihatin terhadap kesakitan anak.",
    nilaiBab: "Kasih sayang.",
    pengajaranBab:
      "Kita tidak seharusnya merahsiakan penderitaan diri daripada pengetahuan orang tua.",
  }),
  chapter(13, "Terus Tidak ke Sekolah", {
    ringkasanBab:
      "Alias telah ponteng sekolah selama seminggu kerana malu akan keadaan telinganya. Walau bagaimanapun, dia tetap berusaha menyalin nota dan menyiapkan kerja rumah dengan pergi ke rumah Som.",
    peristiwaUtama:
      "Alias terus tidak hadir ke sekolah tetapi tetap mengutamakan pelajarannya di rumah.",
    tindakanWatak:
      "Alias pergi ke rumah Som untuk mendapatkan nota pelajaran. Dia membayangkan ejekan kawan-kawan dan Cikgu Sunan sekiranya dia hadir ke sekolah.",
    konflikPerumitan:
      "Ketakutan Alias jika dia tidak dapat menduduki peperiksaan akhir tahun akibat kecederaan tersebut.",
    latarSpesifik: "Sekitar Kampung Dingin dan rumah Som.",
    watakTerlibat: "Alias, Som.",
    resolusiKecil: "Alias tetap belajar sendiri walaupun tidak ke sekolah.",
    persoalanBab: "Kesungguhan menuntut ilmu walaupun berhadapan dengan masalah fizikal.",
    nilaiBab: "Kegigihan.",
    pengajaranBab: "Kita hendaklah mengutamakan pendidikan dalam apa-apa jua keadaan.",
  }),
  chapter(14, "Pertanyaan yang Mendebarkan", {
    ringkasanBab:
      "Di sekolah, Cikgu Sunan mempersoalkan ketidakhadiran Alias kepada Som. Cikgu Sunan menyindir Alias di hadapan kelas dan memberi amaran kepada murid lain agar tidak mencontohi sikap Alias yang sering bersama beruknya.",
    peristiwaUtama:
      "Cikgu Sunan menunjukkan sikap prejudis terhadap Alias dan hubungannya dengan Chot.",
    tindakanWatak:
      "Cikgu Sunan menuduh Som akan menjadi seperti Alias jika terus berkawan dengannya. Som berasa sangat malu.",
    konflikPerumitan: "Tekanan emosi yang dihadapi oleh Som akibat tuduhan Cikgu Sunan.",
    latarSpesifik: "Bilik darjah lima.",
    watakTerlibat: "Cikgu Sunan, Som, Murid-murid, Guru Besar.",
    resolusiKecil: "Guru Besar memanggil Cikgu Sunan ke biliknya untuk berbincang.",
    persoalanBab: "Sikap tidak adil seorang pendidik terhadap murid yang miskin.",
    nilaiBab: "Kesabaran.",
    pengajaranBab: "Kita janganlah memandang rendah terhadap keupayaan dan cara hidup orang lain.",
  }),
  chapter(15, "Guru Besar Mulai Bimbang", {
    ringkasanBab:
      "Guru Besar menyedari ketidakhadiran Alias melebihi lima hari. Beliau mengarahkan Cikgu Sunan untuk menyiasat perkara tersebut kerana Guru Besar amat sayang akan Alias yang merupakan murid yang miskin.",
    peristiwaUtama: "Guru Besar campur tangan dalam isu ketidakhadiran Alias.",
    tindakanWatak:
      "Guru Besar mengarahkan Cikgu Sunan melawat rumah Alias. Murid-murid gempar dengan kehadiran beruk liar di belakang sekolah yang disangkakan Chot.",
    konflikPerumitan:
      "Kekecohan di sekolah akibat kemunculan beruk yang mahu ditembak oleh penduduk.",
    latarSpesifik: "Pejabat Guru Besar dan kawasan hutan belakang sekolah.",
    watakTerlibat: "Guru Besar, Cikgu Sunan, Som, Murid-murid.",
    resolusiKecil: "Cikgu Sunan bersetuju untuk mencari rumah Alias dengan bantuan Som.",
    persoalanBab: "Keprihatinan pihak atasan terhadap kebajikan murid.",
    nilaiBab: "Keprihatinan.",
    pengajaranBab:
      "Kita mestilah bertanggungjawab terhadap kebajikan orang yang berada di bawah jagaan kita.",
  }),
  chapter(16, "Salah Sangka", {
    ringkasanBab:
      "Miah dan Budin datang ke rumah Alias dengan penuh marah. Mereka membawa setandan pisang emas yang rosak dan menuduh Chot sebagai puncanya. Ibu Alias mempertahankan Chot, manakala Pak Din cuba menenangkan keadaan.",
    peristiwaUtama: "Tuduhan palsu terhadap Chot yang merosakkan tanaman jiran.",
    tindakanWatak:
      "Miah menuntut ganti rugi. Pak Din berjanji akan menggantikan pisang yang rosak tersebut untuk mengelakkan pergaduhan.",
    konflikPerumitan:
      "Berita tentang seekor beruk yang telah ditembak mati menyebabkan Alias cemas sekiranya beruk itu ialah Chot.",
    latarSpesifik: "Rumah Alias.",
    watakTerlibat: "Ibu, Miah, Budin, Pak Din, Alias, Kamal, Som.",
    resolusiKecil: "Som memberitahu Alias bahawa beruk yang ditembak itu bukanlah Chot.",
    persoalanBab: "Kepentingan bertindak secara rasional dalam menyelesaikan perselisihan faham.",
    nilaiBab: "Rasional.",
    pengajaranBab: "Kita tidak seharusnya menuduh orang lain tanpa bukti yang sahih.",
  }),
  chapter(17, "Chot Sudah Balik", {
    ringkasanBab:
      "Alias berdukacita atas kehilangan Chot buat kali kedua. Dia merasa bersalah kerana terlupa memberi Chot makan sebelum ke pekan. Som datang memujuk Alias ke sekolah agar tidak terlepas peperiksaan.",
    peristiwaUtama: "Penemuan semula Chot yang pulang ke rumah.",
    tindakanWatak:
      "Alias merasa tersinggung apabila Som menunjukkan reaksi kurang selesa terhadap bau busuk telinganya. Alias memanggil Pak Din kerana Som mahu pulang.",
    konflikPerumitan:
      "Perselisihan perasaan antara dua sahabat karib akibat keadaan fizikal Alias.",
    latarSpesifik: "Rumah Alias pada waktu malam.",
    watakTerlibat: "Alias, Som, Chot.",
    resolusiKecil: "Suara Chot kedengaran di atas pokok langsat, menandakan dia sudah kembali.",
    persoalanBab: "Kesetiaan seekor haiwan peliharaan terhadap tuannya.",
    nilaiBab: "Kesetiaan.",
    pengajaranBab:
      "Kita hendaklah sentiasa menghargai jasa makhluk yang membantu kita mencari rezeki.",
  }),
  chapter(18, "Cikgu Sunan Tunjuk Baik", {
    ringkasanBab:
      "Som merasa bimbang sekiranya Cikgu Sunan terus bertanyakan tentang Alias. Namun, Cikgu Sunan mula menunjukkan perubahan sikap dengan memuji hasil kerja Som dan menunggunya di luar tandas selepas sekolah.",
    peristiwaUtama: "Cikgu Sunan meminta Som menunjukkan jalan ke rumah Alias.",
    tindakanWatak:
      "Cikgu Sunan merasa rungsing dan tidak dapat mengajar seperti biasa kerana memikirkan kecederaan Alias.",
    konflikPerumitan:
      "Som berasa serba salah dan takut sekiranya kehadirannya bersama Cikgu Sunan akan menimbulkan kemarahan Alias.",
    latarSpesifik: "Sekolah dan perkarangan tandas.",
    watakTerlibat: "Som, Cikgu Sunan, Murid-murid.",
    resolusiKecil: "Som bersetuju membawa Cikgu Sunan ke rumah Alias.",
    persoalanBab: "Keinsafan atas kesilapan yang dilakukan terhadap orang lain.",
    nilaiBab: "Keinsafan.",
    pengajaranBab: "Kita perlulah segera sedar dan membaiki kesalahan yang telah dilakukan.",
  }),
  chapter(19, "Demi Kesayangan...", {
    ringkasanBab:
      "Cikgu Sunan melawat rumah Alias dan melihat sendiri kemiskinan hidup muridnya itu. Apabila Cikgu Sunan cuba memeriksa telinga Alias, Chot yang berasa terancam telah menyerang dan menggigit lengan cikgu tersebut.",
    peristiwaUtama: "Alias terpaksa membunuh Chot demi menyelamatkan Cikgu Sunan.",
    tindakanWatak:
      "Cikgu Sunan melahirkan rasa kesal atas tindakannya dahulu. Chot memutuskan rantai dan menerkam Cikgu Sunan. Alias merodok perut Chot dengan lembing.",
    konflikPerumitan: "Serangan ganas Chot yang membahayakan nyawa Cikgu Sunan.",
    latarSpesifik: "Kereta Volvo Cikgu Sunan dan kawasan rumah Alias.",
    watakTerlibat: "Som, Cikgu Sunan, Ibu, Alias, Chot.",
    resolusiKecil:
      "Chot mati dalam pelukan Alias. Alias merasa dunianya gelap kerana kehilangan punca rezeki.",
    persoalanBab: "Pengorbanan yang amat berat demi menyelamatkan orang lain.",
    nilaiBab: "Pengorbanan.",
    pengajaranBab:
      "Kita mestilah sanggup berkorban walaupun terpaksa kehilangan sesuatu yang sangat disayangi demi kebenaran.",
  }),
  chapter(20, "Penghormatan Terakhir", {
    ringkasanBab:
      "Alias menanam Chot di bawah pokok langsat dalam suasana yang sangat hiba. Peristiwa itu membawa perubahan besar kepada masa depan Alias apabila Cikgu Sunan berjanji untuk menjaganya.",
    peristiwaUtama: "Alias bertekad untuk kembali ke sekolah bagi mengejar impian ke universiti.",
    tindakanWatak:
      "Alias menguburkan Chot dan mencacakkan papan tanda peringatan. Cikgu Sunan berjanji akan membiayai segala kos persekolahan Alias sehingga ke peringkat universiti.",
    konflikPerumitan:
      "Kesedihan mendalam Alias yang menganggap dirinya tidak dapat ke sekolah lagi tanpa Chot.",
    latarSpesifik: "Perdu pokok langsat, tempat Chot pernah hidup.",
    watakTerlibat: "Alias, Ibu, Pak Din, Mak Su Kiah, Som, Cikgu Sunan.",
    resolusiKecil: "Alias memberitahu ibunya bahawa dia akan ke sekolah pada hari esok.",
    persoalanBab: "Harapan baharu yang muncul selepas berlakunya sebuah tragedi.",
    nilaiBab: "Ketabahan.",
    pengajaranBab:
      "Kita mestilah tabah menghadapi dugaan hidup dan yakin bahawa setiap kesulitan pasti ada kemudahannya.",
  }),
];

export const CHOT_ANALYSIS: BMForm3NovelAnalysis = {
  theme:
    "Kasih sayang yang terjalin sesama makhluk ciptaan Tuhan. Buktinya, Alias sangat menyayangi beruk peliharaannya, Chot, dan sanggup datang lewat ke sekolah kerana mencarinya yang hilang. Selain itu, kasih sayang seorang anak terhadap ibu jelas kelihatan apabila Alias gigih mencari rezeki untuk menyara ibunya yang lumpuh.",
  issues: [
    [
      "Tanggungjawab seorang anak terhadap ibu",
      "Alias menjaga kebajikan ibunya yang lumpuh dengan bekerja memetik kelapa untuk membeli barangan keperluan.",
    ],
    [
      "Ketaatan terhadap agama",
      "Walaupun dalam kesakitan telinga yang bernanah, Alias tetap menunaikan solat dan mengaji al-Quran sehingga juzuk ketiga.",
    ],
    [
      "Sikap terlalu mengikut emosi membawa keburukan",
      "Tindakan Cikgu Sunan yang menengking Alias mengikut perasaan marahnya telah menyebabkan Alias tercedera dan trauma untuk ke sekolah.",
    ],
    [
      "Kesetiaan dalam persahabatan",
      "Som sebagai sahabat karib Alias sentiasa bersimpati, memberikan makanan, dan sanggup membantu Alias menyalin nota pelajaran.",
    ],
    [
      "Penyesalan atas kesilapan yang dilakukan",
      "Cikgu Sunan sedar akan kesalahannya terhadap Alias dan berusaha memperbaikinya dengan melawat rumah Alias serta menawarkan bantuan kewangan.",
    ],
  ],
  characters: [
    [
      "Alias",
      "Berumur 11 tahun dan tinggal bersama ibunya yang lumpuh. Beliau seorang yang bijak dalam mata pelajaran Matematik, penyayang terhadap haiwan, dan sangat bertanggungjawab menyara keluarga. Beliau juga seorang yang pemaaf kerana tidak berdendam dengan gurunya.",
    ],
    [
      "Chot",
      "Seekor beruk peliharaan Alias yang setia dan bijak membantu memetik kelapa. Chot mempunyai sifat garang dan ganas terhadap orang asing yang dianggap mengancam tuannya.",
    ],
    [
      "Som",
      "Sahabat karib Alias yang berusia 11 tahun. Beliau seorang yang pandai menyimpan rahsia, tekun belajar, dan mempunyai perasaan simpati yang tinggi terhadap nasib Alias.",
    ],
    [
      "Cikgu Sunan",
      "Guru Matematik yang memiliki tubuh tinggi dan bermisai. Pada mulanya beliau seorang yang panas baran dan memandang hina orang lain, namun akhirnya beliau sedar akan kesilapannya dan menjadi seorang yang bertanggungjawab.",
    ],
  ],
  plot: [
    [
      "Permulaan",
      "Alias diperkenalkan sebagai kanak-kanak miskin yang tinggal bersama ibunya yang lumpuh dan bergantung hidup kepada beruknya, Chot.",
    ],
    ["Perkembangan", "Alias lewat ke sekolah kerana mencari Chot yang hilang pada waktu pagi."],
    [
      "Perumitan",
      "Cikgu Sunan memarahi Alias sehingga menyebabkan Alias jatuh dan telinganya tercedera terkena bucu meja. Telinga Alias bengkak dan bernanah sehingga dia malu ke sekolah manakala bekalan makanan di rumah semakin habis.",
    ],
    [
      "Klimaks",
      "Cikgu Sunan melawat rumah Alias dan Chot yang berang telah menyerang serta menggigit lengan cikgu tersebut. Alias terpaksa merodok perut Chot dengan lembing demi menyelamatkan nyawa gurunya.",
    ],
    [
      "Peleraian",
      "Chot mati dalam pelukan Alias. Cikgu Sunan insaf dan berjanji akan membiayai segala kos persekolahan Alias sehingga ke peringkat universiti.",
    ],
  ],
  plotTechniques: [
    ["Dialog", "Contohnya perbualan antara Alias dengan ibunya mengenai kehilangan Chot."],
    [
      "Monolog",
      "Alias bercakap dalam hati sewaktu berbelah bahagi untuk memberitahu ibunya tentang telinganya yang sakit.",
    ],
    [
      "Imbas kembali",
      "Alias teringat akan pesanan Pak Din tiga hari lalu untuk memetik buah kelapa.",
    ],
    ["Imbas muka", "Som membayangkan rakan-rakannya akan mengejek Alias selepas waktu rehat."],
    [
      "Saspens",
      "Peristiwa seekor beruk ditembak mati menimbulkan tanda tanya kepada pembaca sama ada beruk itu ialah Chot ataupun bukan.",
    ],
    [
      "Kejutan",
      "Pembaca tidak menyangka Cikgu Sunan akan menengking Alias sehingga menyebabkan Alias terjatuh dan mengalami kecederaan parah.",
    ],
  ],
  settings: [
    [
      "Latar Tempat",
      "Rumah usang Alias, kebun kelapa Pak Din, Sekolah Menengah Seri Kencana (tempat perhimpunan dan bilik darjah lima), serta kawasan Sungai.",
    ],
    [
      "Latar Masa",
      "Waktu pagi (pencarian Chot), waktu tengah hari (kejadian di dalam kelas), waktu petang (memetik kelapa), dan tempoh lapan hari Alias tidak ke sekolah.",
    ],
    [
      "Latar Masyarakat",
      "Masyarakat yang sayang akan haiwan peliharaan, masyarakat yang berdikari mencari rezeki halal, masyarakat yang mementingkan pelajaran, dan masyarakat yang bersimpati terhadap nasib orang lain.",
    ],
  ],
  language: [
    ["Bahasa Arab", "qunut, al-Quran, assalamualaikum."],
    ["Peribahasa", "berat mulut, naik minyak, besar hati."],
    ["Simile", "Jiwa Cikgu Sunan tersentak bagai ditikam lembing yang berkarat."],
    ["Personifikasi", "Angin malam di kampung itu bagaikan mati."],
    ["Sinkope", "“Kenapa kamu tak datang kelmarin?”"],
  ],
  values: [
    [
      "Kasih sayang",
      "Alias sanggup lewat ke sekolah kerana terlalu bimbangkan keselamatan Chot yang hilang.",
    ],
    [
      "Bertanggungjawab",
      "Alias memikul tugas berat mencari rezeki untuk menyara kehidupannya dan ibunya.",
    ],
    [
      "Kesabaran",
      "Alias tetap bersabar walaupun diherdik oleh Cikgu Sunan dan diejek oleh rakan-rakan sekelasnya.",
    ],
    [
      "Rasional",
      "Pak Din bertindak secara bijaksana untuk menenangkan Miah dan Budin yang menuduh Chot merosakkan tanaman mereka.",
    ],
    [
      "Berdikari",
      "Alias mencari upah sendiri dengan memetik kelapa untuk membeli makanan dan ubat-ubatan.",
    ],
  ],
  lessons: [
    "Kita hendaklah mengawal emosi dan tidak bertindak mengikut kata hati yang marah.",
    "Kita mestilah mengutamakan pendidikan dalam kehidupan walau dalam apa-apa jua kesukaran.",
    "Kita perlulah segera sedar dan insaf atas setiap kesilapan yang telah dilakukan terhadap orang lain.",
    "Kita haruslah sentiasa berdikari dan tidak mengharapkan belas ihsan orang lain semata-mata.",
    "Kita tidak seharusnya menyimpan perasaan dendam terhadap orang yang pernah menyakiti kita.",
  ],
  examTips: [
    "Novel diuji dalam Bahagian B Kertas 1 (Pemahaman).",
    "Format soalan ialah Subjektif Respons Terhad (SRT) yang memperuntukkan markah yang khusus.",
    "Murid dinasihatkan memberikan jawapan yang lengkap dengan huraian peristiwa dan bukti yang tepat daripada novel.",
    "Gunakan ayat yang gramatis dan ejaan yang betul untuk mencapai tahap penguasaan cemerlang.",
  ],
  srt: [
    [
      "Berikan satu bukti yang menunjukkan Alias merupakan seorang anak yang bertanggungjawab.",
      "Alias bekerja memetik buah kelapa di kebun Pak Din untuk menyara kehidupan ibunya yang lumpuh.",
    ],
    [
      "Jelaskan perwatakan watak Som dalam novel ini.",
      "Som seorang yang pandai menyimpan rahsia tentang punca sebenar telinga Alias bengkak dan bernanah.",
    ],
    [
      "Nyatakan latar tempat di mana Alias menanam Chot di akhir cerita.",
      "Alias menanam Chot di bawah pokok langsat, iaitu tempat Chot selalu ditambat semasa hidupnya.",
    ],
    [
      "Mengapakah Cikgu Sunan melawat rumah Alias?",
      "Untuk menyiasat sebab ketidakhadiran Alias ke sekolah dan bertanya khabar tentang kecederaan Alias.",
    ],
    [
      "Apakah pengajaran yang diperoleh daripada watak Cikgu Sunan?",
      "Kita hendaklah sedar dan insaf akan kesilapan yang dilakukan serta berusaha untuk memperbaikinya.",
    ],
  ],
  kbat: [
    [
      "Pada pendapat anda, apakah kesan jika seseorang remaja mengabaikan pelajarannya demi bekerja?",
      "Remaja tersebut akan ketinggalan dalam bidang ilmu, mempunyai peluang kerjaya yang terhad di masa hadapan, dan sukar untuk meningkatkan taraf hidup keluarga ke tahap yang lebih baik.",
    ],
    [
      "Sejauh manakah sikap tolong-menolong sesama jiran dapat membantu golongan yang susah?",
      "Sikap ini dapat meringankan beban hidup golongan memerlukan, mengurangkan tekanan perasaan mereka, dan mengeratkan hubungan silaturahim dalam masyarakat kampung.",
    ],
    [
      "Cadangkan langkah-langkah yang boleh diambil oleh pihak sekolah untuk membantu murid yang miskin seperti Alias.",
      "Pihak sekolah boleh memberikan bantuan pakaian sekolah, bantuan makanan percuma, serta menyenaraikan mereka dalam penerima bantuan daripada Persatuan Ibu Bapa dan Guru (PIBG).",
    ],
  ],
  quickNotes: [
    ["Tajuk", "Chot"],
    ["Tema", "Kasih sayang manusia dan haiwan"],
    ["Fokus", "Kegigihan Alias menyara ibu lumpuh dengan bantuan Chot"],
    ["Konflik Utama", "Kecederaan telinga Alias akibat kemarahan Cikgu Sunan"],
    ["Kemuncak", "Chot mati dibunuh Alias untuk menyelamatkan gurunya"],
  ],
  facts: [
    "Alias berusia 11 tahun dan berada di kelas Darjah 5.",
    "Bapa Alias meninggal dunia 5 tahun yang lalu kerana jatuh pokok kelapa.",
    "Upah memetik kelapa yang diterima Alias daripada Pak Din ialah RM15.00.",
    "Cikgu Sunan menanggung kos pelajaran Alias sehingga ke peringkat universiti sebagai tanda penyesalan.",
  ],
  checklist: [
    "Saya mengetahui tema novel Chot.",
    "Saya boleh menceritakan plot dari permulaan hingga peleraian.",
    "Saya boleh menghuraikan perwatakan Alias dan Cikgu Sunan.",
    "Saya memahami nilai-nilai murni dalam novel ini.",
    "Saya bersedia menjawab soalan SRT dan KBAT novel.",
  ],
};
