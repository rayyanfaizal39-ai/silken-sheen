import type { BMForm3NovelAnalysis, BMForm3NovelChapter } from "@/data/bm-form3-novel-structure";

const chapter = (
  number: number,
  title: string,
  content: NonNullable<BMForm3NovelChapter["content"]>,
): BMForm3NovelChapter => ({ id: `bab-${number}`, label: `Bab ${number}: ${title}`, content });

const prolog: BMForm3NovelChapter = {
  id: "prolog",
  label: "Prolog",
  content: {
    ringkasanBab: "Syahir diminta mendokumentasikan catatan perjalanan hidup dan impiannya.",
    peristiwaUtama: "Syahir menyedari bahawa setiap perjuangan memerlukan pengorbanan.",
    tindakanWatak: "Syahir berdoa kepada Tuhan agar diberi petunjuk dalam menulis catatannya.",
    konflikPerumitan: "Keraguan sesetengah pihak terhadap impiannya.",
    latarSpesifik: "Tidak dinyatakan secara spesifik.",
    watakTerlibat: "Syahir.",
    resolusiKecil: "Syahir sedar setiap ujian mempunyai nikmat di hujungnya.",
    persoalanBab: "Keyakinan terhadap impian diri sendiri.",
    nilaiBab: "Kesyukuran.",
    pengajaranBab: "Kita perlulah mempunyai impian yang tinggi untuk berjaya.",
  },
};

const epilog: BMForm3NovelChapter = {
  id: "epilog",
  label: "Epilog",
  content: {
    ringkasanBab:
      "Syahir menjalani pembedahan apendiks di Jakarta. Sekembalinya ke Malaysia, beliau melawat emaknya di hospital dan menyerahkan pingat emasnya sebagai tanda syukur sebelum berazam ke Sukan Olimpik.",
    peristiwaUtama: "Pembedahan radang apendiks Syahir dan kepulangannya ke pangkuan keluarga sebagai juara dunia.",
    tindakanWatak: "Syahir menyerahkan medal emasnya kepada emaknya yang masih lemah di hospital.",
    konflikPerumitan: "Rahsia kesakitan Syahir yang akhirnya terbongkar selepas beliau rebah.",
    latarSpesifik: "Hospital di Jakarta dan hospital di Malaysia.",
    watakTerlibat: "Syahir, Emak, Kak Uda, Kak Ngah, Abang Long.",
    resolusiKecil: "Kesengsaraan Syahir berakhir dengan kebahagiaan dan kebanggaan seluruh ahli keluarga.",
    persoalanBab: "Kepuasan mencapai matlamat hidup melalui pengorbanan yang besar.",
    nilaiBab: "Kesyukuran.",
    pengajaranBab: "Setiap perjuangan yang ikhlas akan berakhir dengan kejayaan dan nikmat yang manis.",
  },
};

export const JESTERU_CHAPTERS: BMForm3NovelChapter[] = [
  prolog,
  chapter(1, "Ranjau Masih Berliku", {
    ringkasanBab: "Syahir ditemu ramah oleh Azmie dan mendapat tahu syarat kelayakan baru ke Jakarta.",
    peristiwaUtama: "Pihak PBSM mewajibkan pemain menyertai Terbuka Johor untuk mengukur prestasi semasa.",
    tindakanWatak: "Syahir akur dengan keputusan tersebut walaupun merasa tidak puas hati.",
    konflikPerumitan: "Peraturan baru PBSM bertentangan dengan sistem ranking dunia.",
    latarSpesifik: "Luar dewan dan gelanggang latihan badminton.",
    watakTerlibat: "Syahir, Azmie, Boon Lee, Engku Aiman, Syed Amiri.",
    resolusiKecil: "Syahir menyedari dia perlu bersaing dengan rakan sendiri.",
    persoalanBab: "Ketidakadilan dalam sistem pengurusan sukan.",
    nilaiBab: "Ketaatan.",
    pengajaranBab: "Kita hendaklah patuh pada arahan pihak atasan walaupun sukar.",
  }),
  chapter(2, "Tidak Seindah Mimpi", {
    ringkasanBab: "Syahir berbual dengan emaknya dan mengimbas kembali pesanan arwah ayahnya.",
    peristiwaUtama: "Arwah ayah Syahir pernah mematahkan raketnya kerana mahu Syahir mengutamakan pelajaran.",
    tindakanWatak: "Syahir berjanji kepada arwah ayahnya untuk mengharumkan nama negara dan memelihara syariat.",
    konflikPerumitan: "Syarat pemilihan ke Jakarta yang membebankan Syahir.",
    latarSpesifik: "Rumah Syahir di Bandar Baru Bangi.",
    watakTerlibat: "Syahir, Kak Uda, Emak.",
    resolusiKecil: "Keputusan PMR Syahir yang cemerlang meredakan kemarahan ayahnya.",
    persoalanBab: "Tanggungjawab seorang anak terhadap harapan ibu bapa.",
    nilaiBab: "Kasih sayang.",
    pengajaranBab: "Kita mestilah mengimbangkan antara minat sukan dengan pencapaian akademik.",
  }),
  chapter(3, "Aku Bukan Ustaz", {
    ringkasanBab: "Syahir berlatih di bawah bimbingan Haji Marzuki dan diusik oleh Wan Najlah.",
    peristiwaUtama: "Haji Marzuki menasihati Syahir agar bertenang dan bersikap rasional menghadapi keputusan PBSM.",
    tindakanWatak: "Syahir membaca rencana tentang dirinya yang memuji ketaatannya pada syariat.",
    konflikPerumitan: "Syahir tidak berpuas hati dengan kelemahan pihak atasan dalam menentukan pemilihan pemain.",
    latarSpesifik: "Dewan latihan, Restoran 48 Jam.",
    watakTerlibat: "Haji Marzuki, Mas Suparman, Syahir, Wan Najhan, Wan Najlah.",
    resolusiKecil: "Syahir tetap fokus pada persediaannya ke Terbuka Johor.",
    persoalanBab: "Kebijaksanaan dalam menguruskan emosi.",
    nilaiBab: "Rasional.",
    pengajaranBab: "Kita perlulah bersikap tenang apabila menghadapi tekanan.",
  }),
  chapter(4, "Meneka Resah di Wajahmu", {
    ringkasanBab: "Syahir memikirkan imej 'ustaz' yang diberikan orang kepadanya dan amanat ayahnya.",
    peristiwaUtama: "Syahir mempertahankan prinsip berpakaian menutup aurat semasa bersukan walaupun dianggap ganjil.",
    tindakanWatak: "Syahir mengabaikan ejekan orang dan fokus pada sasaran menjadi juara dunia.",
    konflikPerumitan: "Persoalan daripada Wan Najlah mengenai prinsip penampilan Syahir.",
    latarSpesifik: "Rumah/bilik Syahir, waktu malam.",
    watakTerlibat: "Syahir, Wan Najlah.",
    resolusiKecil: "Syahir berasa bersalah terhadap Wan Najlah tetapi membatalkan niat menelefonnya kerana sudah lewat malam.",
    persoalanBab: "Ketegasan dalam mempertahankan prinsip agama.",
    nilaiBab: "Ketegasan.",
    pengajaranBab: "Kita hendaklah berpegang teguh pada prinsip agama dalam apa-apa jua bidang.",
  }),
  chapter(5, "Aku Bukan Selebriti", {
    ringkasanBab: "Syed Amiri menyindir Syahir manakala Haji Marzuki memberitahu berita undian perlawanan.",
    peristiwaUtama: "Syahir diletakkan dalam undian yang bakal bertemu dengan Syed Amiri di kejohanan nanti.",
    tindakanWatak: "Syahir cuba membetulkan tanggapan Syed Amiri yang memanggilnya 'ustaz selebriti'.",
    konflikPerumitan: "Syed Amiri sering menyakiti hati Syahir kerana prestasi Syahir lebih baik.",
    latarSpesifik: "Kem latihan.",
    watakTerlibat: "Syahir, Syed Amiri, Haji Marzuki.",
    resolusiKecil: "Syahir tetap menghormati Syed Amiri demi semangat perpaduan.",
    persoalanBab: "Kepentingan menghormati rakan sepasukan.",
    nilaiBab: "Kesabaran.",
    pengajaranBab: "Kita janganlah memandang rendah terhadap kebolehan orang lain.",
  }),
  chapter(6, "Seindah Akhlak Semanis Senyuman", {
    ringkasanBab: "Wan Najlah menelefon Syahir untuk meminta maaf dan menyatakan hasrat untuk berubah.",
    peristiwaUtama: "Syahir memberi dorongan kepada Wan Najlah untuk mengikut syariat dalam bersukan.",
    tindakanWatak: "Syahir menceritakan kisah pelari wanita Bahrain yang berjaya walaupun menutup aurat.",
    konflikPerumitan: "Perasaan takut Wan Najlah untuk melakukan penghijrahan imej.",
    latarSpesifik: "Rumah Syahir, melalui telefon.",
    watakTerlibat: "Syahir, Wan Najhan, Nik Syahnizam, Wan Najlah.",
    resolusiKecil: "Wan Najlah mula yakin untuk merealisasikan niatnya.",
    persoalanBab: "Keberanian melakukan perubahan ke arah kebaikan.",
    nilaiBab: "Keberanian.",
    pengajaranBab: "Kita hendaklah saling memberi nasihat untuk meningkatkan akhlak.",
  }),
  chapter(7, "Hidayah Itu Milik Allah", {
    ringkasanBab: "Syahir melawat pejabat Azmie dan mendapat berita tentang kejutan di kem latihan wanita.",
    peristiwaUtama: "Wan Najlah mula memakai tudung dan seluar trek panjang semasa latihan.",
    tindakanWatak: "Syahir bersetuju bergambar beramai-ramai dengan peminat dan Ratna.",
    konflikPerumitan: "Perasaan kurang selesa Syahir apabila didatangi gadis peminat yang ingin bersalaman.",
    latarSpesifik: "Taman Shamelin Perkasa, Cheras.",
    watakTerlibat: "Syahir, Azmie, Wan Najlah, Ratna.",
    resolusiKecil: "Syahir berasa syukur dan gembira atas perubahan Wan Najlah.",
    persoalanBab: "Kesan hidayah dalam kehidupan seseorang.",
    nilaiBab: "Kebijaksanaan.",
    pengajaranBab: "Kita hendaklah menjaga batas pergaulan dalam perhubungan.",
  }),
  chapter(8, "Jangan Ada Pilih Kasih", {
    ringkasanBab: "Engku Aiman mengkritik permainan Syahir manakala emak Syahir jatuh sakit.",
    peristiwaUtama: "Syahir mendapati emaknya terbaring lemah dalam telekung di atas katil.",
    tindakanWatak: "Syahir mengambil kritikan Engku Aiman secara positif walaupun hatinya sakit.",
    konflikPerumitan: "Sikap pilih kasih Engku Aiman yang sering memuji Syed Amiri dan memburukkan Syahir.",
    latarSpesifik: "Kem latihan, rumah Syahir (Bangi).",
    watakTerlibat: "Syahir, Engku Aiman, Syed Amiri, Emak.",
    resolusiKecil: "Syahir berasa sangat cemas dengan keadaan emaknya.",
    persoalanBab: "Ketabahan menghadapi diskriminasi di tempat kerja/latihan.",
    nilaiBab: "Ketabahan.",
    pengajaranBab: "Kita janganlah mengamalkan sikap pilih kasih dalam memberikan penilaian.",
  }),
  chapter(9, "Hijrah Najlah", {
    ringkasanBab: "Syahir berangkat ke Johor Bharu untuk kejohanan Terbuka Johor.",
    peristiwaUtama: "Gambar Syahir dan Ratna tersiar dalam tabloid hiburan dan digosipkan bercinta.",
    tindakanWatak: "Syahir terkejut dan menafikan berita tersebut kepada Dr. Asyraf.",
    konflikPerumitan: "Kebimbangan Syahir terhadap kesihatan emaknya semasa di Johor.",
    latarSpesifik: "Johor Bharu, hotel penginapan.",
    watakTerlibat: "Syahir, Kak Uda, Syed Amiri, Wan Najlah, Dr. Asyraf.",
    resolusiKecil: "Syahir berjaya menewaskan pencabarnya dan layak ke suku akhir.",
    persoalanBab: "Dugaan fitnah yang mencabar kredibiliti atlet.",
    nilaiBab: "Kesungguhan.",
    pengajaranBab: "Kita mestilah fokus pada matlamat utama walaupun diganggu gosip liar.",
  }),
  chapter(10, "Selamat Tinggal Jakarta", {
    ringkasanBab: "Syahir tewas kepada Syed Amiri dalam perlawanan set penentuan yang kontroversi.",
    peristiwaUtama: "Keputusan pengadil perlawanan yang berat sebelah menjejaskan konsentrasi Syahir.",
    tindakanWatak: "Syahir reda dengan kekalahannya dan memohon kekuatan daripada Tuhan.",
    konflikPerumitan: "Sindiran Syed Amiri selepas perlawanan kerana Syahir gagal ke Jakarta.",
    latarSpesifik: "Gelanggang perlawanan (Johor).",
    watakTerlibat: "Syahir, Syed Amiri, Pengadil.",
    resolusiKecil: "Impian Syahir untuk menyertai Kejohanan Dunia di Jakarta kelihatan musnah.",
    persoalanBab: "Kesan ketidakadilan dalam pertandingan sukan.",
    nilaiBab: "Keredaan.",
    pengajaranBab: "Kita hendaklah mengamalkan semangat kesukanan yang tinggi dan jujur.",
  }),
  chapter(11, "Tuhan, Berilah Aku Kekuatan", {
    ringkasanBab:
      "Syahir meneruskan latihan seperti biasa di Kuala Lumpur walaupun gagal ke Jakarta. Beliau mendapat sokongan daripada Wan Najlah dan nasihat daripada Haji Marzuki agar tidak mempedulikan fitnah. Syahir kemudian pulang ke Bangi dan membawa emaknya ke Seremban sebelum dikejutkan dengan berita kemalangan Gopinath.",
    peristiwaUtama: "Berita kemalangan jalan raya yang menimpa rakan sepasukannya, Gopinath.",
    tindakanWatak:
      "Syahir tetap menjalani latihan dengan gigih dan memandu untuk membawa emaknya menziarahi saudara di Seremban.",
    konflikPerumitan:
      "Perasaan benci Syahir terhadap birokrasi dan politik dalaman sukan serta gangguan gosip cinta dengan Ratna yang menimbulkan rasa cemburu Wan Najlah.",
    latarSpesifik: "Kem latihan badminton dan perjalanan ke Seremban.",
    watakTerlibat: "Syahir, Wan Najlah, Haji Marzuki, Emak, Kak Uda.",
    resolusiKecil: "Syahir menerima panggilan kecemasan daripada Haji Marzuki yang akan mengubah nasibnya.",
    persoalanBab: "Kesabaran dalam mengharungi dugaan fitnah dan kegagalan.",
    nilaiBab: "Kesabaran.",
    pengajaranBab: "Kita hendaklah sentiasa bersikap positif dan tidak mudah patah semangat apabila menghadapi kegagalan.",
  }),
  chapter(12, "Sabar Masih Bersisa", {
    ringkasanBab:
      "Syahir membatalkan rancangan cuti keluarga dan kembali ke Kuala Lumpur. Beliau menziarahi Gopinath di hospital dan mendapat tahu beliau dipilih sebagai pengganti untuk ke Jakarta atas desakan Haji Marzuki.",
    peristiwaUtama:
      "Pemilihan rasmi Syahir untuk mewakili negara ke Kejohanan Badminton Antarabangsa di Jakarta bagi menggantikan Gopinath.",
    tindakanWatak: "Syahir segera kembali ke kem latihan dan memulakan persediaan dengan penuh semangat.",
    konflikPerumitan:
      "Sindiran berterusan daripada Syed Amiri dan sikap negatif Engku Aiman yang sering mengungkit kegagalan masa lalu.",
    latarSpesifik: "Hospital Kuala Lumpur dan dewan latihan.",
    watakTerlibat: "Syahir, Haji Marzuki, Gopinath, Syed Amiri, Engku Aiman.",
    resolusiKecil: "Syahir memohon kekuatan daripada Tuhan agar hatinya cekal menghadapi cabaran di Jakarta.",
    persoalanBab: "Tanggungjawab memikul harapan negara.",
    nilaiBab: "Tanggungjawab.",
    pengajaranBab: "Kita mestilah menjalankan tugas yang diamanahkan dengan penuh dedikasi.",
  }),
  chapter(13, "Panggilan Menjelang Dinihari", {
    ringkasanBab:
      "Syahir menghadapi undian yang sukar di Jakarta. Beliau mendapat bimbingan taktikal daripada Haji Marzuki dan sokongan psikologi daripada Dr. Haikal sebelum menerima berita bahawa emaknya jatuh pengsan.",
    peristiwaUtama:
      "Syahir mendapat berita kecemasan tentang emaknya yang pitam di rumah Abang Long.",
    tindakanWatak:
      "Syahir meluangkan masa bersendirian di taman tasik untuk mencari ketenangan sebelum menerima panggilan Kak Uda.",
    konflikPerumitan:
      "Dilema antara tanggungjawab sebagai anak dengan tugas sebagai atlet negara.",
    latarSpesifik: "Kem latihan dan taman tasik, waktu malam.",
    watakTerlibat: "Syahir, Haji Marzuki, Dr. Haikal, Kak Uda.",
    resolusiKecil:
      "Kedamaian malam Syahir terganggu oleh berita kesihatan emaknya yang membimbangkan.",
    persoalanBab: "Kekuatan mental dalam menghadapi ujian yang bertubi-tubi.",
    nilaiBab: "Ketabahan.",
    pengajaranBab: "Kita hendaklah bijak mengawal emosi agar tidak menjejaskan tumpuan kerja.",
  }),
  chapter(14, "Istikharah Sebelum Keberangkatan", {
    ringkasanBab:
      "Syahir berbelah bahagi untuk ke Jakarta. Beliau menghadapi tentangan daripada abangnya dan menanggung kesakitan perut. Selepas solat istikharah dan mendapat restu emak di hospital, Syahir akhirnya berangkat ke Jakarta.",
    peristiwaUtama: "Syahir menunaikan solat hajat dan istikharah sebelum membuat keputusan untuk tetap pergi ke Jakarta.",
    tindakanWatak:
      "Syahir menziarahi emaknya di hospital untuk memohon ampun dan restu walaupun emaknya tidak berdaya untuk bercakap.",
    konflikPerumitan:
      "Perasaan bersalah meninggalkan emak yang menghidap strok dan kesakitan abdomen yang dirahsiakan.",
    latarSpesifik: "Rumah Syahir dan hospital, waktu dinihari hingga subuh.",
    watakTerlibat: "Syahir, Abang Long, Kak Uda, Emak, rakan sepasukan.",
    resolusiKecil: "Syahir yakin emaknya merestui pemergiannya melalui kerlipan mata.",
    persoalanBab: "Ketaatan kepada agama dalam membuat keputusan penting.",
    nilaiBab: "Ketaatan.",
    pengajaranBab: "Kita mestilah memohon petunjuk daripada Tuhan dalam setiap kesulitan yang dihadapi.",
  }),
  chapter(15, "Sehangat Jakarta", {
    ringkasanBab:
      "Syahir tiba di Jakarta dan memulakan perlawanan dengan cemerlang. Beliau berjaya menewaskan pemain Korea Selatan, China, dan Indonesia walaupun dalam suasana yang sangat mencabar.",
    peristiwaUtama: "Kemenangan berturut-turut Syahir sehingga berjaya menundukkan pemain tuan rumah, Eddy Heryanto.",
    tindakanWatak:
      "Syahir menjalani ujian air kencing yang diadakan secara tiba-tiba dan sentiasa menelefon Kak Uda untuk bertanya khabar emaknya.",
    konflikPerumitan:
      "Tekanan daripada penyokong Indonesia yang gegak-gempita dan kegugupan pada peringkat awal perlawanan.",
    latarSpesifik: "Jakarta, Indonesia dan gelanggang perlawanan.",
    watakTerlibat: "Syahir, Haji Marzuki, Kim Joo Hyun, Xiang Yimou, Eddy Heryanto.",
    resolusiKecil: "Syahir berjaya melepasi setiap halangan dan terus mara dalam kejohanan.",
    persoalanBab: "Kesungguhan dalam mencapai impian walaupun berada di tempat lawan.",
    nilaiBab: "Kegigihan.",
    pengajaranBab: "Kita hendaklah berani menghadapi persaingan di peringkat antarabangsa demi mengharumkan nama negara.",
  }),
  chapter(16, "Sejarah Bakal Tercipta", {
    ringkasanBab:
      "Syahir mara ke perlawanan akhir selepas menewaskan Han Xuanze. Beliau bertekad untuk menang bagi menyelamatkan kerjaya jurulatihnya, Haji Marzuki yang berjanji akan meletakkan jawatan sekiranya Syahir gagal.",
    peristiwaUtama: "Keputusan Syahir untuk bertemu Andri Mirnawan di peringkat akhir kejohanan dunia.",
    tindakanWatak:
      "Syahir berjanji kepada Haji Marzuki untuk bermain dengan bersungguh-sungguh selepas terharu dengan pengorbanan jurulatihnya itu.",
    konflikPerumitan:
      "Kebimbangan Syahir terhadap kesihatan emaknya yang baru mula boleh menggerakkan tangan.",
    latarSpesifik: "Hotel penginapan dan stadium di Jakarta.",
    watakTerlibat: "Syahir, Haji Marzuki, Han Xuanze, Kak Uda.",
    resolusiKecil:
      "Syahir memikul bebanan berat untuk memastikan kemenangan bukan sahaja untuk dirinya, tetapi untuk masa depan jurulatihnya.",
    persoalanBab: "Penghargaan terhadap jasa dan pengorbanan guru atau jurulatih.",
    nilaiBab: "Mengenangi jasa.",
    pengajaranBab: "Kita perlulah menghargai sokongan dan kepercayaan yang diberikan oleh orang lain kepada kita.",
  }),
  chapter(17, "Tidak Pernah Menyerah", {
    ringkasanBab:
      "Syahir bertarung sengit menentang Andri Mirnawan dalam perlawanan akhir yang penuh kontroversi. Dengan ketenangan dan taktik yang tepat, Syahir akhirnya muncul sebagai juara dunia sebelum rebah di atas gelanggang.",
    peristiwaUtama: "Kejayaan Syahir menumpaskan Andri Mirnawan dalam set penentuan untuk bergelar juara dunia.",
    tindakanWatak:
      "Syahir berzikir dan berselawat untuk menenangkan diri serta menggunakan teknik pukulan junam mengikut arahan jurulatih.",
    konflikPerumitan:
      "Keputusan pengadil yang berat sebelah dan kesakitan abdomen yang sangat hebat pada saat-saat akhir perlawanan.",
    latarSpesifik: "Gelanggang perlawanan akhir, waktu malam.",
    watakTerlibat: "Syahir, Andri Mirnawan, Haji Marzuki, Mas Suparman.",
    resolusiKecil: "Syahir berjaya mencapai impiannya tetapi kesihatannya merosot sejurus tamat perlawanan.",
    persoalanBab: "Kemenangan yang dicapai melalui kecekalan mental dan fizikal.",
    nilaiBab: "Keberanian.",
    pengajaranBab: "Kita janganlah mudah menyerah kalah walaupun berhadapan dengan pelbagai rintangan di saat akhir.",
  }),
  epilog,
];

export const JESTERU_ANALYSIS: BMForm3NovelAnalysis = {
  theme:
    "Ketabahan seorang pemain badminton dalam menghadapi segala dugaan dan rintangan sebelum bergelar juara dunia. Buktinya, Syahir tetap cekal menjalani latihan dan bertanding di Jakarta walaupun emaknya diserang strok dan dia sendiri menderita radang apendiks.",
  issues: [
    [
      "Ketaatan terhadap pesanan yang telah diamanahkan",
      "Syahir sentiasa mengingati amanat arwah ayahnya agar memelihara syariat agama dalam bersukan.",
    ],
    [
      "Keberanian untuk menyatakan pendapat",
      "Syahir berani menyuarakan ketidakpuasan hatinya terhadap keputusan PBSM yang tidak menggunakan ranking dunia sebagai kriteria pemilihan pemain.",
    ],
    [
      "Sikap pilih kasih dalam sesuatu tindakan",
      "Engku Aiman bersikap pilih kasih dengan menganggap Syed Amiri sebagai 'anak emas' manakala sering memperkecilkan keupayaan Syahir.",
    ],
    [
      "Kasih sayang seorang anak terhadap ibu",
      "Syahir sangat bimbang akan kesihatan emaknya yang sakit dan sering menelefon Kak Uda dari Jakarta untuk bertanya khabar.",
    ],
    [
      "Kesabaran dalam mengharungi cabaran",
      "Syahir bersabar dengan sindiran Syed Amiri yang menggelarnya 'ustaz selebriti' dan kritikan pedas Engku Aiman.",
    ],
  ],
  characters: [
    [
      "Syahir",
      "Watak utama dan pemain badminton skuad kebangsaan. Tabah menghadapi kerenah birokrasi sukan dan fitnah media, taat akan pesanan, dan penyabar.",
    ],
    [
      "Haji Marzuki",
      "Jurulatih perseorangan skuad kebangsaan. Sentiasa memberi kata-kata semangat dan berani mengambil keputusan.",
    ],
    [
      "Syed Amiri",
      "Rakan sepasukan Syahir yang suka menyindir dan memandang rendah kebolehan orang lain.",
    ],
    [
      "Kak Uda (Syahrizah)",
      "Kakak kepada Syahir dan pegawai perubatan di HUKM. Penyayang dan memahami kerana sanggup mengambil cuti untuk menjaga emak.",
    ],
  ],
  plot: [
    [
      "Permulaan",
      "Syahir ditemu ramah oleh Azmie dan mendapat tahu syarat pemilihan mengejut PBSM melalui Terbuka Johor.",
    ],
    [
      "Perkembangan",
      "Syahir berhadapan dengan pelbagai konflik emosi, sindiran rakan, gosip cinta dengan Ratna, dan kebimbangan terhadap kesihatan ibunya sebelum ke Johor.",
    ],
    [
      "Perumitan",
      "Syahir tewas di Terbuka Johor akibat keputusan pengadil yang berat sebelah, namun terpilih ke Jakarta bagi menggantikan Gopinath yang terlibat dalam kemalangan.",
    ],
    [
      "Klimaks",
      "Syahir bertarung dalam perlawanan akhir Kejohanan Dunia menentang Andri Mirnawan di Jakarta. Walaupun menahan sakit perut yang amat sangat dan tekanan penyokong tuan rumah, Syahir berjaya muncul juara dunia.",
    ],
    [
      "Peleraian",
      "Syahir rebah selepas kemenangan dan disahkan menghidap radang apendiks. Sekembalinya ke tanah air, dia menyerahkan pingat emasnya kepada emaknya yang masih terlantar di hospital.",
    ],
  ],
  plotTechniques: [
    ["Dialog", "Perbualan antara Syahir dan Azmie mengenai kandungan Mingguan Riadah."],
    ["Monolog", "Syahir mempertikaikan kemenangan Syed Amiri di Johor dalam hatinya."],
    ["Imbas Kembali", "Emak mengingatkan Syahir tentang pesanan arwah ayah semasa dia ingin ke Jakarta."],
    ["Imbas Muka", "Syahir membayangkan kesan buruk yang bakal berlaku jika emaknya meninggal dunia semasa dia berada di luar negara."],
    ["Saspens", "Debar perlawanan akhir antara Syahir dan Andri Mirnawan yang sangat sengit."],
  ],
  settings: [
    [
      "Latar Tempat",
      "Bandar Baru Bangi (rumah Syahir), UPM Serdang, dewan latihan badminton, Restoran 48 jam, Cheras, dan Jakarta, Indonesia.",
    ],
    [
      "Latar Masa",
      "Pukul 8:30 pagi, 11:10 malam, waktu pagi, malam, dan selepas solat maghrib.",
    ],
    [
      "Latar Masyarakat",
      "Masyarakat yang tabah mengharungi liku hidup; masyarakat yang sentiasa ingat akan pesanan; masyarakat yang gigih berusaha; dan masyarakat yang bersikap pilih kasih.",
    ],
  ],
  language: [
    ["Metafora", "layar minda."],
    ["Peribahasa", "berpeluk tubuh; makan hati; kepala batu."],
    ["Simile", "\"macam bola, disepak dilambung ke sana ke mari\"."],
    ["Sinkope", "\"Saya tak sedap hati nak pergi, kak\"."],
    ["Hiperbola", "smash tajam membunuh ke lantai kejat gelanggangnya."],
  ],
  values: [
    ["Kegigihan", "Syahir gigih berlatih walaupun dalam keadaan tertekan."],
    ["Keberanian", "Wan Najlah berani melakukan perubahan imej dengan menutup aurat."],
    ["Ketegasan", "Syahir tetap dengan pendiriannya untuk memelihara syariat dalam bersukan."],
    ["Kasih sayang", "Kak Uda sanggup menjaga emak yang sakit demi masa depan kerjaya Syahir."],
  ],
  lessons: [
    "Kita hendaklah mengingati pesanan yang baik daripada orang tua.",
    "Kita haruslah berani menyatakan pendapat demi kebenaran.",
    "Kita mestilah berpendirian teguh dalam memegang prinsip agama.",
    "Kita janganlah memandang rendah terhadap kebolehan orang lain.",
    "Kita tidak seharusnya bersikap pilih kasih dalam memberikan penilaian.",
  ],
  examTips: [
    "Fokus kepada konflik dalaman Syahir (dilema antara keluarga, prinsip agama, dan kerjaya).",
    "Soalan selalunya bertanyakan tentang watak utama dan cara dia mengatasi rintangan.",
    "Hafal contoh peristiwa bagi nilai ketabahan dan ketegasan kerana ia merupakan nadi utama novel ini.",
  ],
  srt: [
    [
      "Nyatakan dua cabaran yang dihadapi Syahir sebelum berangkat ke Jakarta.",
      "Syahir berhadapan dengan masalah emaknya yang diserang strok dan gangguan gosip cinta dengan artis bernama Ratna.",
    ],
    [
      "Apakah kelebihan permainan yang dimiliki oleh Syahir mengikut pandangan Haji Marzuki?",
      "Syahir memiliki pukulan junam dan pancung yang sukar diatasi oleh pihak lawan serta mampu mempengaruhi rentak permainan lawan.",
    ],
    [
      "Bagaimanakah Syahir membuktikan ketaatannya kepada arwah ayahnya?",
      "Syahir tetap mempertahankan imej menutup aurat semasa bermain badminton walaupun dipandang ganjil.",
    ],
    [
      "Mengapakah Syahir dipilih untuk mewakili negara ke Jakarta sedangkan dia tewas di Johor?",
      "Syahir dipilih sebagai pemain simpanan untuk menggantikan Gopinath yang terlibat dalam kemalangan jalan raya.",
    ],
    [
      "Apakah kesudahan perlawanan akhir antara Syahir menentang Andri Mirnawan?",
      "Syahir berjaya menewaskan Andri Mirnawan dan bergelar juara dunia sebelum dia rebah di gelanggang kerana radang apendiks.",
    ],
  ],
  kbat: [
    [
      "Pada pendapat anda, wajarkah Syahir tetap pergi ke Jakarta sedangkan emaknya sedang sakit tenat?",
      "Wajar, kerana Syahir membawa amanah dan harapan negara. Selain itu, Kak Uda telah memberi jaminan untuk menjaga emak, manakala kejayaan Syahir dapat membahagiakan emaknya serta membuktikan restu yang diberikan melalui kerlipan mata.",
    ],
    [
      "Sejauh manakah integriti seorang jurulatih penting dalam melahirkan atlet yang berjaya?",
      "Sangat penting kerana penilaian yang adil tanpa pilih kasih dapat menaikkan semangat atlet, manakala sikap pilih kasih boleh merosakkan potensi pemain yang berbakat.",
    ],
    [
      "Cadangkan cara untuk menangani tekanan perasaan apabila sering disindir atau diperkecilkan oleh rakan sekerja.",
      "Kita perlu bersikap tenang dan rasional, fokus kepada peningkatan prestasi diri sendiri, serta mendapatkan sokongan daripada mentor atau rakan yang positif untuk membina semula keyakinan diri.",
    ],
  ],
  quickNotes: [
    ["Konflik", "Syahir vs Syed Amiri dan Engku Aiman"],
    ["Prinsip", "Syariat Islam dalam sukan"],
    ["Kemuncak", "Juara Dunia di Jakarta"],
    ["Iktibar", "Ketabahan mental dan fizikal yang luar biasa"],
  ],
  facts: [
    "Penyakit Syahir: Radang apendiks (Apendisitis).",
    "Penyakit Emak: Darah tinggi dan strok.",
    "Teknik Khas: Pukulan pancung (junam).",
  ],
  checklist: [
    "Saya memahami tema ketabahan pemain badminton.",
    "Saya boleh menceritakan plot dari Johor hingga Jakarta.",
    "Saya tahu peranan Haji Marzuki sebagai jurulatih yang adil.",
    "Saya boleh mengenal pasti nilai ketegasan Syahir dalam beragama.",
    "Saya bersedia menjawab soalan novel Bahagian B.",
  ],
};

