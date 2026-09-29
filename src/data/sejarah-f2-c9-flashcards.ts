import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Set 1: Sistem pemerintahan beraja dan adat istiadat
  ["Apakah gelaran pemerintah Kedah?", "Sultan."],
  ["Apakah gelaran pemerintah Kelantan?", "Sultan."],
  ["Apakah gelaran pemerintah Perlis?", "Raja."],
  ["Siapakah yang dilantik sebagai pengganti pemerintah?", "Putera Sultan atau Raja."],
  ["Daripada jurai manakah pengganti pemerintah dipilih?", "Keturunan pemerintah pengasas."],
  ["Apakah kedudukan Sultan atau Raja dalam negeri?", "Ketua Negeri."],
  ["Apakah kedudukan Sultan atau Raja dalam agama?", "Ketua Agama Islam."],
  [
    "Apakah peranan Pembesar dalam sistem pemerintahan beraja?",
    "Menjadi wakil pentadbir kerajaan dan bertanggungjawab terhadap jajahan atau daerah.",
  ],
  ["Apakah tugas utama Pembesar?", "Membantu pentadbiran kerajaan."],
  ["Siapakah penghubung antara pemerintah dengan rakyat?", "Penghulu."],
  ["Apakah unit pentadbiran Penghulu?", "Mukim."],
  ["Apakah fungsi alat kebesaran diraja?", "Digunakan dalam istiadat rasmi."],
  ["Bilakah majlis pemasyhuran pengganti diadakan?", "Sebelum jenazah pemerintah dimakamkan."],
  ["Apakah yang dipersembahkan pada awal istiadat pertabalan?", "Naskhah al-Quran."],
  ["Apakah kelengkapan diraja dalam istiadat pertabalan?", "Alat kebesaran diraja."],
  ["Apakah yang dibaca oleh pemerintah semasa pertabalan?", "Watikah pertabalan."],
  ["Apakah yang dikucup oleh pemerintah semasa pertabalan?", "Keris kuasa."],
  ["Siapakah yang mengetuai seruan 'Daulat Tuanku'?", "Menteri Besar."],
  ["Bilakah darjah kebesaran lazimnya dianugerahkan?", "Hari keputeraan pemerintah."],
  [
    "Apakah tujuan penganugerahan darjah kebesaran?",
    "Sebagai lambang hubungan antara pemerintah dengan rakyat serta pengiktirafan kepada Sultan atau Raja, kerabat diraja dan rakyat yang berjasa.",
  ],

  // Set 2: Perundangan dan persuratan
  [
    "Apakah syarat pengganti Sultan atau Raja?",
    "Lelaki, berketurunan raja, berbangsa Melayu dan beragama Islam.",
  ],
  [
    "Apakah tujuan sistem perundangan kerajaan Kedah, Kelantan dan Perlis?",
    "Menjamin keadilan rakyat, melancarkan pentadbiran kerajaan dan memakmurkan negeri.",
  ],
  [
    "Apakah yang dikisahkan dalam Hikayat Merong Mahawangsa?",
    "Pengasasan kerajaan Kedah, pembukaan kota pentadbiran dan pengislaman pemerintah.",
  ],
  [
    "Apakah kandungan Syair Sultan Maulana?",
    "Kisah perang tentera Kedah pada zaman pemerintahan Sultan Ahmad Tajuddin Halim Shah II.",
  ],
  ["Siapakah yang berhak memilih Menteri Besar?", "Sultan atau Raja."],
  [
    "Apakah larangan kepada Sultan atau Raja, Menteri dan Jemaah Menteri?",
    "Menyerahkan negeri atau kuasa kepada kerajaan lain.",
  ],
  ["Apakah badan penasihat Sultan atau Raja?", "Majlis Mesyuarat Kerajaan Negeri."],
  ["Siapakah Yang Dipertua Majlis Mesyuarat Kerajaan Negeri?", "Menteri Besar."],
  [
    "Apakah tugas Majlis Mesyuarat Kerajaan Negeri?",
    "Membantu Sultan atau Raja dalam mentadbir negeri dan rakyat.",
  ],
  ["Berapakah umur minimum untuk menjadi Ahli Dewan Undangan Negeri?", "21 tahun."],
  ["Di manakah calon Ahli Dewan Undangan Negeri perlu tinggal?", "Di dalam negeri."],
  ["Apakah enakmen Islam yang diperkenalkan Kedah?", "Enakmen zakat."],
  ["Bilakah jawatankuasa zakat Kedah ditubuhkan?", "Tahun 1955."],
  [
    "Apakah perbuatan yang dilarang oleh Hukum Maksiat Kelantan?",
    "Laga lembu dan persembahan menora.",
  ],
  [
    "Siapakah pengarang Al-Tarikh Salasilah Negeri Kedah?",
    "Muhammad Hassan bin Dato' Kerani Muhammad Arshad.",
  ],
  [
    "Apakah yang dicatatkan dalam Al-Tarikh Salasilah Negeri Kedah?",
    "Sejarah istana Kedah dan pentadbiran Perlis, pengasasan dan senarai pemerintah, pembukaan ibu kota, nobat serta pengislaman pemerintah Kedah.",
  ],
  ["Bilakah Hikayat Merong Mahawangsa dihasilkan?", "Sekitar tahun 1821."],
  ["Siapakah pengarang Salasilah atau Tarikh Kerajaan Kedah?", "Wan Yahya bin Wan Muhammad Taib."],
  ["Sejarah negeri manakah dikisahkan dalam Hikayat Seri Kelantan?", "Kelantan."],
  ["Siapakah pengarang Detik-detik Sejarah Kelantan?", "Sa'ad Shukri bin Haji Muda."],

  // Set 3: Kesenian dan Adat Perpatih
  ["Apakah motif yang menggantikan motif haiwan dalam seni ukir?", "Motif alam."],
  ["Di manakah seni ukir menjadi hiasan?", "Istana, rumah dan masjid."],
  ["Apakah bentuk tebar layar rumah tradisional Melayu?", "V terbalik."],
  [
    "Bagaimanakah pelaksanaan hukuman dalam Adat Perpatih?",
    "Bersifat pemulihan dengan mempertimbangkan pesalah ke arah kebaikan; kesalahan kecil boleh diselesaikan melalui saling bermaafan atau denda ringan.",
  ],
  [
    "Apakah Upacara Kedim?",
    "Upacara menerima orang dari suku lain atau orang luar sebagai ahli suku melalui sumpah taat setia, persaudaraan dan penghebahan.",
  ],
  ["Apakah senjata tradisional yang berkembang di Kelantan?", "Keris."],
  [
    "Apakah maksud Perut, Suku dan Luak dalam masyarakat Adat Perpatih?",
    "Perut ialah unit terkecil daripada keturunan sebelah ibu, Suku dibentuk oleh beberapa Perut, manakala Luak ialah daerah atau jajahan yang lebih besar.",
  ],
  ["Apakah kraf yang terkenal di Kelantan?", "Wau dan batik."],
  [
    "Apakah peranan Buapak dan Lembaga dalam Adat Perpatih?",
    "Buapak menjadi ketua rujukan adat dan hukum bagi Perut, manakala Lembaga menjadi Ketua Suku, memilih Undang dan Penghulu, menjaga keamanan, menyelesaikan pertelingkahan serta mengurus pembahagian harta pusaka.",
  ],
  ["Apakah teater tradisional Kedah?", "Mek Mulung."],
  ["Apakah kategori warisan bagi wayang kulit?", "Warisan tidak ketara."],
  [
    "Apakah fungsi seni silat dahulu dan kini?",
    "Dahulu digunakan untuk menyerang dan mempertahankan diri; kini turut dipersembahkan dalam majlis dan dipertandingkan pada peringkat antarabangsa.",
  ],
  [
    "Apakah peranan Ibu Soko dalam pelantikan pemimpin Adat Perpatih?",
    "Mengetahui dan memahami adat serta asal usul kelompok dan terlibat secara langsung dalam pemilihan serta pelantikan Buapak; tanpa Ibu Soko, pelantikan pemimpin adat tidak dapat dilaksanakan.",
  ],
  [
    "Apakah asal usul Adat Perpatih di Negeri Sembilan?",
    "Berasaskan Adat Minangkabau yang dibawa oleh Dato' Perpatih Nan Sebatang dan kemudiannya disesuaikan dengan adat masyarakat tempatan.",
  ],
  ["Sebelah manakah jurai keturunan Adat Perpatih?", "Sebelah ibu."],
  ["Perkahwinan apakah yang digalakkan dalam Adat Perpatih?", "Perkahwinan luar suku."],
  ["Siapakah yang mewarisi harta pusaka?", "Anak perempuan."],
  ["Apakah gelaran lelaki dalam suku isterinya?", "Orang semenda."],
  ["Siapakah yang memilih Yang di-Pertuan Besar?", "Undang Yang Empat."],
  [
    "Apakah susunan hierarki pemerintahan Adat Perpatih dari peringkat bawah ke atas?",
    "Anak Buah dan Ibu Soko, Buapak, Lembaga, Undang sebagai Ketua Luak, kemudian Yamtuan Besar atau Yang di-Pertuan Besar.",
  ],
];

export const sejarahF2C9Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c9-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 9",
  front,
  back,
}));
