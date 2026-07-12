import type { BMForm3NovelAnalysis, BMForm3NovelChapter } from "@/data/bm-form3-novel-structure";

const chapter = (
  number: number,
  title: string,
  content: NonNullable<BMForm3NovelChapter["content"]>,
): BMForm3NovelChapter => ({ id: `bab-${number}`, label: `Bab ${number}: ${title}`, content });

export const TAWANAN_CHAPTERS: BMForm3NovelChapter[] = [
  chapter(1, "Hilang", {
    ringkasanBab:
      "Warga sekolah dan penduduk gempar dengan kehilangan Kim Yong, anak hartawan yang juga rakan sekelas Farhani. Farhani dan rakan-rakan menziarahi ibu Kim Yong, Puan Lee, untuk menunjukkan simpati.",
    peristiwaUtama: "Kehilangan misteri Kim Yong semasa mencari serangga di pinggir hutan.",
    tindakanWatak:
      "Farhani, Chea Mei, Mira, Haikal, Devnath, dan Wei menziarahi Puan Lee di rumahnya.",
    konflikPerumitan:
      "Spekulasi masyarakat tentang punca kehilangan Kim Yong dan kesedihan Puan Lee yang tidak berhenti menangis.",
    latarSpesifik: "Rumah Kim Yong dan Sekolah Menengah Seri Kencana.",
    watakTerlibat:
      "Kim Yong, Farhani, Chea Mei, Mira, Haikal, Devnath, Wei, Puan Lee, Anggota Polis.",
    resolusiKecil:
      "Berita kehilangan semakin jarang diperkatakan selepas sebulan, namun Farhani masih tertanya-tanya tentang misteri tersebut.",
    persoalanBab: "Keprihatinan rakan sekelas terhadap nasib yang menimpa rakan lain.",
    nilaiBab: "Kasih sayang, Simpati.",
    pengajaranBab:
      "Kita hendaklah menunjukkan rasa simpati terhadap orang yang ditimpa musibah.",
  }),
  chapter(2, "Misi Memburu Kumbang", {
    ringkasanBab:
      "Cikgu Salimah memberikan tugasan mencari serangga kepada murid Tingkatan Satu Arif. Kumpulan Farhani ditugaskan mencari kumbang untuk zoo mini serangga sekolah.",
    peristiwaUtama: "Pembahagian kumpulan dan tugasan mencari serangga oleh Cikgu Salimah.",
    tindakanWatak: "Farhani rajin mengakses maklumat tentang kumbang melalui laman sesawang.",
    konflikPerumitan:
      "Haikal memperlekehkan keupayaan kumpulan Farhani untuk mencari kumbang, menyebabkan Farhani berasa tercabar.",
    latarSpesifik: "Bilik darjah Tingkatan Satu Arif.",
    watakTerlibat: "Cikgu Salimah, Farhani, Haikal, Devnath, Wei, Mira, Chea Mei.",
    resolusiKecil:
      "Farhani bertekad membuktikan kewibawaannya kepada Haikal dengan mendapatkan kumbang yang dikehendaki.",
    persoalanBab: "Kesungguhan dalam melaksanakan tugasan yang diberikan oleh guru.",
    nilaiBab: "Bertanggungjawab, Kerajinan.",
    pengajaranBab: "Kita hendaklah gigih berusaha untuk menyelesaikan tugas dengan sempurna.",
  }),
  chapter(3, "Meneroka Rumah Usang", {
    ringkasanBab:
      "Semasa menunggu rakannya di dusun datuknya, Farhani meneroka sebuah rumah usang dan menemui anak tangga rahsia yang membawanya ke dimensi lain.",
    peristiwaUtama: "Penemuan pintu dimensi di ruangan bawah tanah rumah usang.",
    tindakanWatak:
      "Farhani menyelinap masuk ke dalam rumah lama yang hampir roboh untuk meneroka keadaannya secara terperinci.",
    konflikPerumitan:
      "Farhani merasakan perubahan ketumpatan udara dan secara tiba-tiba berhadapan dengan lembaga hitam bermata merah yang merenungnya.",
    latarSpesifik: "Dusun datuk Farhani dan rumah kayu lama.",
    watakTerlibat: "Farhani, Lembaga hitam (kumbang).",
    resolusiKecil: "Farhani melintasi dimensi baharu dan tersedut masuk ke alam kerajaan kumbang.",
    persoalanBab: "Keberanian remaja dalam meneroka perkara baharu.",
    nilaiBab: "Keberanian.",
    pengajaranBab: "Kita mestilah berani menghadapi situasi yang tidak dijangka.",
  }),
  chapter(4, "Di manakah Farhani?", {
    ringkasanBab:
      "Mira dan Chea Mei tiba lewat di dusun dan mendapati Farhani telah hilang. Keluarga Farhani membuat laporan polis dan suasana menjadi sangat cemas.",
    peristiwaUtama: "Farhani dilaporkan hilang selepas keluar mencari kumbang.",
    tindakanWatak:
      "Encik James Ren mencadangkan agar laporan polis dibuat dengan segera.",
    konflikPerumitan:
      "Puan Asmah menangisi kehilangan anak bongsunya manakala Mira mengandaikan Farhani disembunyikan oleh makhluk halus.",
    latarSpesifik: "Pinggir dusun datuk Farhani dan rumah Farhani pada waktu malam.",
    watakTerlibat:
      "Chea Mei, Mira, Puan Asmah, Encik Adnan, Encik James Ren, Encik Zainal.",
    resolusiKecil:
      "Seluruh rakyat Malaysia mula bercakap tentang kes kehilangan Farhani dan Kim Yong yang dikaitkan dengan aktiviti mencari kumbang.",
    persoalanBab: "Kebimbangan ibu bapa terhadap keselamatan anak-anak.",
    nilaiBab: "Kasih sayang.",
    pengajaranBab: "Kita perlulah sentiasa mengutamakan keselamatan diri apabila berada di luar rumah.",
  }),
  chapter(5, "Tawanan Chalcosoma Caucasus", {
    ringkasanBab:
      "Farhani ditawan oleh Komander Caucasus, seekor kumbang gergasi yang pandai bercakap. Caucasus menuduh manusia sebagai makhluk zalim yang membunuh spesiesnya dengan racun.",
    peristiwaUtama: "Farhani menjadi tawanan ketua tentera kerajaan kumbang.",
    tindakanWatak:
      "Farhani cuba mempertahankan diri dengan menjelaskan tujuan pencariannya hanyalah untuk zoo mini sekolah.",
    konflikPerumitan:
      "Komander Caucasus menggertak mahu menjadikan Farhani sebagai bahan makanan mereka selama berbulan-bulan.",
    latarSpesifik: "Alam dimensi kerajaan kumbang.",
    watakTerlibat: "Farhani, Komander Caucasus, Kumbang Bara.",
    resolusiKecil: "Farhani dibawa masuk ke dalam kota oleh Bara atas perintah Komander Caucasus.",
    persoalanBab:
      "Perbezaan persepsi antara manusia dengan makhluk lain tentang kelestarian alam.",
    nilaiBab: "Ketabahan.",
    pengajaranBab:
      "Kita hendaklah bersikap tenang walaupun berada dalam keadaan yang mengancam nyawa.",
  }),
  chapter(6, "Menjelajah Kota", {
    ringkasanBab:
      "Bara membawa Farhani menelusuri terowong gelap menuju ke kota kerajaan kumbang. Farhani kagum dengan keindahan seni bina kota tersebut dan sempat merakamkannya menggunakan telefon bimbit.",
    peristiwaUtama: "Farhani melihat keindahan kota yang diperbuat daripada batu kukuh.",
    tindakanWatak:
      "Farhani merayu agar Bara tidak mencengkam lengannya terlalu kuat dan berjanji tidak akan melarikan diri.",
    konflikPerumitan:
      "Ketakutan Farhani terhadap tempat yang asing dan ancaman fizikal daripada kumbang-kumbang bersaiz besar.",
    latarSpesifik: "Terowong gelap dan pintu gerbang kota kerajaan kumbang.",
    watakTerlibat: "Farhani, Bara (spesies Lampyridae).",
    resolusiKecil:
      "Bara melepaskan cengkamannya kerana yakin Farhani tidak tahu selok-belok kota tersebut.",
    persoalanBab:
      "Ketertiban dan sistem organisasi dalam sesebuah komuniti (walaupun komuniti serangga).",
    nilaiBab: "Bijak bertindak.",
    pengajaranBab:
      "Kita perlulah sentiasa berwaspada dan menggunakan akal untuk menyesuaikan diri di tempat baharu.",
  }),
  chapter(7, "Menghadap Maharaja Tanduk", {
    ringkasanBab:
      "Bara membawa Farhani masuk menghadap Maharaja Tanduk di mahligainya. Farhani berasa kagum dengan keindahan mahligai tersebut namun dia kemudiannya diperdaya oleh Dara Bintik sehingga tubuhnya menjadi lemah.",
    peristiwaUtama:
      "Farhani dibawa menghadap Maharaja Tanduk di sebuah mahligai yang berdinding putih mutiara dan berlantai kaca kebiruan.",
    tindakanWatak:
      "Farhani memperkenalkan dirinya kepada Maharaja Tanduk dan meminum air yang diberikan oleh Dara Bintik.",
    konflikPerumitan:
      "Maharaja Tanduk murka kerana Bara mengambil masa terlalu lama untuk membawa Farhani, selain Farhani yang berasa kesal kerana tubuhnya menjadi sangat lemah sejurus selepas meminum air pemberian Dara Bintik.",
    latarSpesifik: "Mahligai Maharaja Tanduk.",
    watakTerlibat:
      "Farhani, Bara, Maharaja Tanduk, Dara Bintik, Komander Caucasus.",
    resolusiKecil:
      "Farhani yang dalam keadaan lemah dapat merasakan tubuhnya diusung untuk dibawa ke suatu tempat lain.",
    persoalanBab: "Muslihat yang digunakan oleh musuh untuk melumpuhkan mangsa.",
    nilaiBab: "Keberanian.",
    pengajaranBab:
      "Kita hendaklah sentiasa berwaspada dengan pemberian orang asing atau pihak yang mencurigakan.",
  }),
  chapter(8, "Disembunyikan Bunian?", {
    ringkasanBab:
      "Kehilangan Farhani pada hari ketiga menggemparkan masyarakat. Cikgu Salimah menziarahi keluarga Farhani untuk menyatakan simpati dan kemudiannya membawa beberapa orang murid mencari jejak Farhani hingga menemui sebuah rumah usang.",
    peristiwaUtama:
      "Penemuan rumah usang di dalam dusun datuk Farhani oleh Haikal semasa misi mencari jejak kehilangan rakannya itu.",
    tindakanWatak:
      "Cikgu Salimah mengunjungi Puan Asmah dan Encik Adnan untuk memohon maaf serta menyatakan rasa simpati.",
    konflikPerumitan:
      "Abang Farhani, Muhammad Faris Akmal, bercakap secara sinis kepada Cikgu Salimah dan menyalahkan guru tersebut atas kehilangan adiknya.",
    latarSpesifik: "Rumah Farhani dan Dusun datuk Farhani.",
    watakTerlibat:
      "Cikgu Salimah, Encik Adnan, Puan Asmah, Muhammad Faris Akmal, Haikal, Mira, Chea Mei.",
    resolusiKecil:
      "Haikal mencadangkan agar dia, Devnath, dan Wei meninjau keadaan di dalam rumah usang tersebut sementara yang lain menunggu di luar.",
    persoalanBab:
      "Tanggungjawab dan rasa bersalah seorang guru terhadap keselamatan muridnya.",
    nilaiBab: "Simpati, Reda.",
    pengajaranBab:
      "Kita mestilah bertanggungjawab atas setiap tugas yang telah diamanahkan kepada kita.",
  }),
  chapter(9, "Makmal Rahsia", {
    ringkasanBab:
      "Farhani sedar dia terkurung dalam sebuah balang kaca di sebuah makmal. Dia berjaya diselamatkan oleh Bara dan seterusnya bertindak berani membebaskan Kim Yong sebelum mereka melarikan diri ke dalam hutan.",
    peristiwaUtama:
      "Farhani membebaskan Kim Yong daripada balang kaca di makmal rahsia Komander Caucasus semasa keadaan sedang hiruk-pikuk.",
    tindakanWatak:
      "Farhani berkeras mahu menyelamatkan Kim Yong walaupun Bara cuba menyeretnya pergi dengan segera.",
    konflikPerumitan:
      "Komander Caucasus merancang menjadikan manusia sebagai bahan uji kaji untuk impiannya menakluk dunia.",
    latarSpesifik: "Makmal rahsia Komander Caucasus dan terowong sempit.",
    watakTerlibat: "Farhani, Kim Yong, Bara, Dara Bintik.",
    resolusiKecil:
      "Mereka tiba di kawasan hutan yang mempunyai beberapa buah khemah persembunyian selepas berjalan selama dua jam.",
    persoalanBab: "Semangat setia kawan yang tinggi dalam menghadapi detik mencemaskan.",
    nilaiBab: "Keberanian, Setia kawan.",
    pengajaranBab:
      "Kita perlulah mempunyai keberanian untuk menyelamatkan nyawa orang lain yang berada dalam bahaya.",
  }),
  chapter(10, "Bertemu Puteri Coleoptera", {
    ringkasanBab:
      "Kim Yong mula menunjukkan perubahan sikap dengan meminta maaf kepada Farhani. Mereka berdua kemudiannya dibawa menghadap Puteri Coleoptera yang memohon bantuan mereka untuk menumpaskan Komander Caucasus yang zalim.",
    peristiwaUtama:
      "Pertemuan antara Farhani dan Kim Yong dengan Puteri Coleoptera, pewaris sah takhta kerajaan kumbang.",
    tindakanWatak:
      "Kim Yong berjanji untuk tidak bersikap sombong lagi dan akan berkawan dengan semua orang selepas diselamatkan.",
    konflikPerumitan:
      "Puteri Coleoptera menceritakan muslihat Caucasus yang merampas kuasa dan keinginan komander itu untuk mentransformasikan dirinya menjadi manusia bagi membalas dendam.",
    latarSpesifik: "Khemah persembunyian Puteri Coleoptera.",
    watakTerlibat:
      "Farhani, Kim Yong, Puteri Coleoptera, Bara, Dara Bintik.",
    resolusiKecil:
      "Farhani menyatakan persetujuannya untuk membantu Puteri Coleoptera menewaskan Komander Caucasus.",
    persoalanBab: "Keinsafan seorang individu selepas menempuh kesukaran hidup.",
    nilaiBab: "Kebijaksanaan, Mengenang budi.",
    pengajaranBab:
      "Kita hendaklah memohon maaf dan mengakui kesilapan yang telah dilakukan terhadap rakan-rakan.",
  }),
  chapter(11, "Musuh Menjadi Sahabat", {
    ringkasanBab:
      "Haikal, Devnath, dan Wei memasuki dimensi kumbang melalui pintu maya di rumah usang. Mereka ditangkap oleh kumbang namun akhirnya gembira apabila bertemu semula dengan Farhani dan Kim Yong yang berada dalam keadaan selamat.",
    peristiwaUtama:
      "Pertemuan semula kelima-lima sahabat manusia di dalam dimensi kerajaan kumbang.",
    tindakanWatak:
      "Haikal, Devnath, dan Wei menghulurkan salam perkenalan kepada Bara dan Dara Bintik selepas diyakinkan oleh Farhani.",
    konflikPerumitan:
      "Haikal dan rakan-rakannya diserang hendap dan ditangkap sehingga pengsan setibanya mereka di kota dimensi tersebut.",
    latarSpesifik:
      "Ruangan bawah tanah rumah usang, kota kerajaan kumbang, dan kawasan hutan.",
    watakTerlibat:
      "Haikal, Devnath, Wei, Farhani, Kim Yong, Bara, Dara Bintik, Puteri Coleoptera.",
    resolusiKecil:
      "Puteri Coleoptera mengarahkan semua pengikut segera berpindah kerana tentera Caucasus semakin menghampiri tempat persembunyian mereka.",
    persoalanBab: "Kesungguhan dalam mencari kebenaran dan menjejaki rakan yang hilang.",
    nilaiBab: "Hormat-menghormati, Toleransi.",
    pengajaranBab:
      "Kita mestilah bekerjasama dengan rakan-rakan untuk menyelesaikan sesuatu masalah atau tugasan yang mencabar.",
  }),
  chapter(12, "Diburu Caucasus", {
    ringkasanBab:
      "Rombongan Puteri Coleoptera berpindah ke tempat persembunyian baharu. Walau bagaimanapun, mereka telah diserang hendap oleh tentera Caucasus akibat pengkhianatan Dara Bintik, menyebabkan ramai yang ditawan kecuali Farhani dan Kim Yong.",
    peristiwaUtama:
      "Serang hendap oleh tentera Komander Caucasus di tempat persembunyian baharu yang membawa kepada penangkapan Puteri Coleoptera dan rakan-rakan Farhani.",
    tindakanWatak:
      "Bara membantu Puteri Coleoptera menyembunyikan cap mohor takhta manakala Farhani dan Kim Yong masing-masing berjaya menyembunyikan diri di dalam semak dan atas pokok.",
    konflikPerumitan:
      "Dara Bintik berpaling tadah dan membocorkan lokasi persembunyian mereka kepada pihak Caucasus kerana sudah letih berpindah-randah.",
    latarSpesifik: "Kawasan hutan yang terdiri daripada pokok-pokok besar.",
    watakTerlibat:
      "Bara, Puteri Coleoptera, Farhani, Kim Yong, Haikal, Devnath, Wei, Dara Bintik, Tentera Caucasus.",
    resolusiKecil:
      "Kim Yong menegaskan bahawa mereka perlu melakukan sesuatu untuk membebaskan rakan-rakan dan Bara daripada tawanan Caucasus.",
    persoalanBab:
      "Sikap pengkhianatan dalam organisasi yang boleh menghancurkan perjuangan.",
    nilaiBab: "Kepatuhan, Kesetiaan.",
    pengajaranBab:
      "Kita janganlah sekali-kali berpaling tadah atau mengkhianati kepercayaan yang diberikan oleh rakan atau pemimpin.",
  }),
  chapter(13, "Terperangkap!", {
    ringkasanBab:
      "Haikal, Devnath, dan Wei ditawan dan dibawa menghadap Maharaja Caucasus di mahligainya. Maharaja berasa berang apabila mendapati tawanan tersebut bukanlah Farhani dan Kim Yong. Farhani dan Kim Yong yang sedang bersembunyi hampir ditangkap namun mereka diselamatkan oleh seekor kumbang misteri.",
    peristiwaUtama:
      "Kegagalan Maharaja Caucasus menangkap Farhani dan Kim Yong yang amat diperlukan sebagai bahan uji kaji.",
    tindakanWatak:
      "Farhani dan Kim Yong bersembunyi di dalam semak belukar manakala rakan mereka yang ditawan berdoa agar mereka berdua terlepas.",
    konflikPerumitan:
      "Maharaja Caucasus memerintahkan tenteranya mencari Farhani dan Kim Yong dengan segera demi impiannya menakluki dunia.",
    latarSpesifik: "Mahligai Maharaja Caucasus dan kawasan air sungai yang jernih.",
    watakTerlibat:
      "Haikal, Devnath, Wei, Maharaja Caucasus, Farhani, Kim Yong, Tentera Caucasus.",
    resolusiKecil:
      "Farhani dan Kim Yong disembunyikan oleh seekor kumbang yang menutup mulut Farhani agar tidak dikesan musuh.",
    persoalanBab: "Keinginan pemerintah yang tamak untuk menguasai manusia.",
    nilaiBab: "Ketabahan.",
    pengajaranBab: "Kita hendaklah berani menghadapi cabaran demi menyelamatkan rakan.",
  }),
  chapter(14, "Di Penjara", {
    ringkasanBab:
      "Kumbang misteri tersebut memperkenalkan diri sebagai Dara Merah, pengikut setia Puteri Coleoptera. Farhani menemui sebotol cecair Endosulfan dan berbincang dengan Dara Merah untuk menggunakan racun tersebut bagi menumbangkan Maharaja Caucasus.",
    peristiwaUtama: "Perancangan strategi serangan balas menggunakan racun serangga Endosulfan.",
    tindakanWatak:
      "Farhani menunjukkan botol Endosulfan kepada Dara Merah sebagai senjata untuk membunuh kumbang.",
    konflikPerumitan:
      "Perasaan sedih dan kesal rakan-rakan Farhani di dalam penjara yang hapak dan busuk.",
    latarSpesifik:
      "Kem persembunyian Dara Merah dan sel penjara kerajaan kumbang.",
    watakTerlibat: "Dara Merah, Farhani, Kim Yong, Kunang-kunang, Haikal, Wei, Devnath.",
    resolusiKecil:
      "Farhani meminta rakan-rakannya di penjara bersedia untuk melarikan diri kerana bantuan akan tiba.",
    persoalanBab: "Kepentingan kerjasama dalam menyusun strategi.",
    nilaiBab: "Kerjasama, Setia kawan.",
    pengajaranBab: "Kita perlulah bijak menggunakan sumber yang ada untuk menyelesaikan masalah.",
  }),
  chapter(15, "Pertarungan", {
    ringkasanBab:
      "Dara Merah menyamar sebagai Dara Bintik untuk memasukkan racun ke dalam minuman Maharaja Caucasus. Penyamaran terbongkar namun Maharaja akhirnya tersungkur. Farhani pula menggunakan semburan Endosulfan untuk melumpuhkan tentera Caucasus yang mengepung mereka di terowong.",
    peristiwaUtama:
      "Kejatuhan Maharaja Caucasus dan kekalahan tenteranya akibat tindakan pantas Farhani.",
    tindakanWatak:
      "Dara Merah memasukkan setitis cecair Endosulfan ke dalam minuman Maharaja manakala Farhani menyembur racun tersebut kepada tentera musuh.",
    konflikPerumitan:
      "Maharaja Caucasus menyerang Dara Merah dengan tangannya yang berduri tajam sehingga Dara Merah tercedera.",
    latarSpesifik: "Mahligai ketua kerajaan kumbang, dapur istana, dan terowong rahsia.",
    watakTerlibat:
      "Dara Merah, Maharaja Caucasus, Weevil, Farhani, Kim Yong, Puteri Coleoptera, Bara, Dara Bintik, Tentera Caucasus.",
    resolusiKecil:
      "Semua tentera kumbang pengsan satu persatu dan mereka berjaya membebaskan semua tawanan dengan selamat.",
    persoalanBab: "Keberanian menempuh bahaya demi menegakkan kebenaran.",
    nilaiBab: "Keberanian, Kebijaksanaan.",
    pengajaranBab: "Kita mestilah berani mengambil risiko untuk membebaskan diri daripada kezaliman.",
  }),
  chapter(16, "Pertabalan Puteri Coleoptera", {
    ringkasanBab:
      "Puteri Coleoptera ditabalkan sebagai pemerintah baharu dalam majlis gilang-gemilang. Farhani dan rakan-rakannya menerima hadiah lambang kebesaran sebelum dihantar pulang ke gerbang dimensi. Setibanya di dunia manusia, mereka sedar mereka telah menjadi halimunan.",
    peristiwaUtama:
      "Pertabalan Puteri Coleoptera dan kembalinya para remaja ke dunia manusia sebagai halimunan.",
    tindakanWatak:
      "Puteri Coleoptera menghadiahi remaja tersebut lambang kebesaran logam perak manakala Farhani menghadiahi sapu tangannya kepada Puteri.",
    konflikPerumitan:
      "Kekecewaan remaja tersebut apabila ahli keluarga tidak dapat melihat atau mendengar salam mereka.",
    latarSpesifik:
      "Mahligai Puteri Coleoptera dan rumah keluarga Farhani pada waktu malam.",
    watakTerlibat:
      "Puteri Coleoptera, Farhani, Bara, Dara Merah, Kim Yong, Haikal, Devnath, Wei, Puan Asmah, Encik Adnan.",
    resolusiKecil:
      "Kelima-lima sahabat bersepakat untuk kembali semula ke dimensi kumbang mencari penawar.",
    persoalanBab: "Penghargaan terhadap jasa orang yang membantu.",
    nilaiBab: "Mengenang budi, Kepatuhan.",
    pengajaranBab: "Kita hendaklah sentiasa menghargai pemberian orang lain.",
  }),
  chapter(17, "Serum", {
    ringkasanBab:
      "Remaja tersebut kembali menemui Bara di mahligai. Bara menjelaskan bahawa serum itu asalnya dicipta untuk melindungi kumbang daripada penglihatan manusia. Farhani secara berani menjadi orang pertama menguji formula vaksin penawar untuk kembali menjadi normal.",
    peristiwaUtama: "Pengambilan formula vaksin untuk meneutralkan serum halimunan.",
    tindakanWatak:
      "Farhani meminum formula vaksin yang belum pernah diuji demi keselamatan rakan-rakannya.",
    konflikPerumitan:
      "Kebimbangan sama ada formula tersebut akan bertindak positif atau sebaliknya ke atas tubuh manusia.",
    latarSpesifik: "Mahligai Puteri Coleoptera dan makmal kerajaan kumbang.",
    watakTerlibat: "Farhani, Kim Yong, Haikal, Devnath, Wei, Bara.",
    resolusiKecil:
      "Bara menyerahkan botol vaksin kepada setiap remaja tersebut sambil berdoa agar mereka selamat.",
    persoalanBab: "Keberanian menanggung risiko demi kepentingan bersama.",
    nilaiBab: "Kebijaksanaan, Keberanian.",
    pengajaranBab: "Kita mestilah sanggup berkorban demi kesejahteraan rakan-rakan.",
  }),
  chapter(18, "Kepulangan", {
    ringkasanBab:
      "Farhani kembali menjadi manusia normal dan disambut dengan tangisan kegembiraan oleh keluarganya pada waktu subuh. Mereka bersepakat merahsiakan dimensi kumbang daripada dunia luar manakala Kim Yong membebaskan semua kumbang peliharaannya.",
    peristiwaUtama:
      "Kepulangan selamat para remaja dan pembebasan serangga peliharaan Kim Yong.",
    tindakanWatak:
      "Farhani menjelaskan kepada wartawan bahawa mereka hanya tersesat di hutan tanpa menceritakan hal sebenar.",
    konflikPerumitan:
      "Tumpuan meluas media dan pihak berkuasa yang mahukan cerita eksklusif mengenai kehilangan misteri mereka.",
    latarSpesifik:
      "Rumah Farhani pada waktu subuh dan Sekolah Menengah Seri Kencana.",
    watakTerlibat:
      "Farhani, Puan Asmah, Ahli keluarga Farhani, Wartawan, Wei, Devnath, Kim Yong.",
    resolusiKecil:
      "Kim Yong bertekad membebaskan kumbangnya agar serangga tersebut dapat menikmati kebebasan sepenuhnya.",
    persoalanBab: "Kepentingan menjaga rahsia alam demi kelestarian makhluk lain.",
    nilaiBab: "Kasih sayang, Pandai menyimpan rahsia.",
    pengajaranBab: "Kita mestilah melindungi alam sekitar dan hidupan lain daripada dieksploitasi oleh manusia.",
  }),
];

export const TAWANAN_ANALYSIS: BMForm3NovelAnalysis = {
  theme:
    "Kegigihan remaja berdepan dengan berbagai-bagai cabaran dan rintangan. Buktinya, Farhani dan empat orang sahabatnya gigih menyelamatkan diri daripada tawanan tentera Caucasus dan berusaha mencari jalan pulang ke dunia asal dengan selamat.",
  issues: [
    [
      "Kasih sayang ibu bapa terhadap anak",
      "Puan Lee amat bersedih atas kehilangan anak tunggalnya, Kim Yong.",
    ],
    [
      "Semangat setia kawan yang tinggi",
      "Haikal, Devnath, dan Wei sanggup menempuh bahaya mencari Farhani yang hilang di rumah usang.",
    ],
    [
      "Ketamakan kuasa hingga mengancam nyawa",
      "Komander Caucasus merampas takhta dan mahu menjadikan manusia sebagai bahan uji kaji.",
    ],
    [
      "Toleransi antara kaum",
      "Devnath dan Wei menghormati waktu solat isyak Haikal sebelum memulakan misi pencarian.",
    ],
  ],
  characters: [
    [
      "Farhani",
      "Berusia 13 tahun, anak bongsu renjer hutan. Beliau seorang yang berani, bijak, dan bertanggungjawab.",
    ],
    [
      "Komander Caucasus",
      "Ketua tentera kumbang yang tamak, kejam, dan pendendam terhadap manusia.",
    ],
    [
      "Kim Yong",
      "Rakan sekelas Farhani, pewaris hartawan yang asalnya angkuh namun berubah menjadi sedar akan kesilapan selepas diselamatkan.",
    ],
    [
      "Puteri Coleoptera",
      "Pewaris takhta yang baik hati, bertatatertib, dan mengenang budi.",
    ],
  ],
  plot: [
    ["Permulaan", "Berita kehilangan Kim Yong yang menggemparkan warga sekolah."],
    ["Perkembangan", "Farhani hilang di rumah usang dan memasuki dimensi kumbang."],
    [
      "Perumitan",
      "Farhani ditawan Caucasus, bertemu Kim Yong, dan rakan-rakannya turut memasuki dimensi tersebut lalu ditangkap.",
    ],
    [
      "Klimaks",
      "Farhani dan Dara Merah melancarkan serangan menggunakan Endosulfan untuk menewaskan Maharaja Caucasus.",
    ],
    [
      "Peleraian",
      "Puteri Coleoptera ditabalkan, remaja pulang sebagai halimunan namun berjaya kembali normal selepas meminum serum penawar.",
    ],
  ],
  plotTechniques: [
    ["Pemerian", "Gambaran keadaan zoo mini kumbang milik Kim Yong."],
    ["Saspens", "Pembaca tertanya-tanya nasib Farhani semasa masuk bersendirian ke rumah usang."],
    ["Kejutan", "Penemuan sapu tangan Farhani oleh Haikal di ruangan bawah tanah."],
  ],
  settings: [
    ["Tempat", "Rumah usang, Dusun datuk Farhani, Kota kerajaan kumbang, Makmal rahsia."],
    ["Masa", "Pukul 2:30 petang, waktu subuh, waktu malam."],
    [
      "Masyarakat",
      "Masyarakat yang rajin menimba ilmu sains, masyarakat yang mengamalkan kasih sayang, dan masyarakat kumbang yang berani.",
    ],
  ],
  language: [
    ["Kosa kata saintifik", "Lampyridae."],
    ["Bahasa istana", "tuanku, beta."],
    ["Simile", "umpama muzik."],
    ["Sinkope", "tak, cikgu."],
  ],
  values: [
    ["Keberanian", "Dara Merah menyamar."],
    ["Kebijaksanaan", "Farhani guna racun."],
    ["Kerjasama", "Misi menyelamatkan tawanan."],
    ["Kasih sayang", "Puan Lee meratapi Kim Yong."],
  ],
  lessons: [
    "Kita hendaklah gigih menempuh rintangan.",
    "Kita mestilah menyayangi ahli keluarga.",
    "Kita perlulah berani mengambil tindakan demi kebenaran.",
  ],
  examTips: [
    "Novel Tawanan Komander Caucasus merupakan komponen sastera (KOMSAS) bagi Bahagian B Kertas 1 (02/1).",
    "Soalan novel biasanya berbentuk Subjektif Respons Terhad (SRT) yang menguji kemahiran aplikasi maklumat dan apresiasi bahasa.",
    "Murid dinasihatkan menyokong jawapan dengan bukti peristiwa yang tepat daripada teks novel untuk mendapat markah penuh.",
  ],
  srt: [
    [
      "Apakah alasan Komander Caucasus menuduh manusia sebagai makhluk zalim?",
      "Kerana manusia sering mengurung kaum kumbang untuk dijadikan bahan uji kaji di makmal dan membunuh spesies mereka menggunakan racun dalam makanan.",
    ],
    [
      "Berikan dua bukti keberanian yang ditunjukkan oleh watak Farhani.",
      "(i) Berani menyelinap masuk ke dalam rumah usang yang hampir roboh secara berseorangan. (ii) Berani meminum formula vaksin yang belum pernah diuji untuk memulihkan diri daripada menjadi halimunan.",
    ],
    [
      "Mengapakah Haikal, Devnath, dan Wei kembali semula ke rumah usang pada waktu malam?",
      "Kerana demi semangat setia kawan, mereka mahu menjejaki kehilangan misteri Farhani setelah menemui sapu tangan milik gadis itu di ruangan bawah tanah rumah usang tersebut.",
    ],
    [
      "Jelaskan latar masyarakat yang terdapat dalam novel ini.",
      "(i) Masyarakat yang mengamalkan nilai kasih sayang (Puan Lee sedih kehilangan anak). (ii) Masyarakat yang rajin menimba ilmu sains (Cikgu Salimah memberi tugasan mencari serangga).",
    ],
    [
      "Apakah fungsi serum yang dicipta oleh kerajaan kumbang?",
      "Serum tersebut bertujuan untuk mengaburi penglihatan manusia terhadap kumbang ketika serangga tersebut memasuki kawasan manusia supaya mereka tidak dapat dilihat.",
    ],
  ],
  kbat: [
    [
      "Pada pendapat anda, mengapakah Farhani dan rakan-rakannya bersepakat untuk merahsiakan kewujudan dimensi kumbang daripada pengetahuan media?",
      "Kerana mereka bimbang sekiranya rahsia itu terbongkar, kerajaan dimensi kumbang akan menjadi mangsa serakah nafsu manusia yang ingin mengeksploitasi sumber alam di sana atau menjalankan kajian yang boleh mengancam nyawa komuniti kumbang tersebut.",
    ],
    [
      "Sejauh manakah penggunaan ilmu sains membantu watak-watak utama dalam menyelesaikan konflik dalam novel ini?",
      "Penggunaan ilmu sains sangat membantu, seperti pengetahuan Farhani tentang racun serangga Endosulfan yang digunakan untuk menumpaskan tentera Caucasus serta keupayaan mencipta vaksin/serum untuk memulihkan keadaan fizikal mereka daripada menjadi halimunan.",
    ],
    [
      "Jika anda berada di tempat Kim Yong, apakah pengajaran paling berharga yang anda peroleh daripada pengembaraan tersebut?",
      "Pengajaran paling berharga ialah kepentingan menghargai erti kebebasan serta nilai persahabatan, kerana sikap sombong hanya akan menjauhkan diri daripada bantuan orang lain manakala kerjasama membolehkan sesuatu masalah besar diselesaikan dengan mudah.",
    ],
  ],
  quickNotes: [
    ["Watak Utama", "Farhani (Anak renjer, berani, bijak)."],
    ["Musuh", "Komander Caucasus (Gila kuasa, tamak)."],
    ["Alat Kunci", "Endosulfan (Racun), Serum (Vaksin halimunan)."],
    ["Punca Bahagia", "Pertabalan Puteri Coleoptera & Kejayaan pulang ke pangkuan keluarga."],
  ],
  facts: [
    "Farhani hilang semasa mencari kumbang untuk tugasan zoo mini sekolah.",
    "Pintu ke dimensi kumbang terletak di ruangan bawah tanah rumah usang.",
    "Kim Yong telah hilang selama sebulan lebih sebelum ditemui oleh Farhani.",
    "Mereka diculik untuk dijadikan bahan uji kaji (tikus makmal) oleh Caucasus.",
  ],
  checklist: [
    "Saya memahami kronologi pengembaraan Farhani di dimensi kumbang.",
    "Saya boleh menghuraikan perwatakan Farhani dan Komander Caucasus.",
    "Saya boleh menyatakan tema kegigihan beserta bukti peristiwa.",
    "Saya boleh mengenal pasti latar tempat dan latar masyarakat dalam novel.",
    "Saya bersedia menjawab soalan novel mengikut format UASA.",
  ],
};

