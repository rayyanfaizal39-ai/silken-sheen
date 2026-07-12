import type { Form2KomsasWork } from "@/data/bm-form2-komsas-structure";
import { CHOT_ANALYSIS, CHOT_CHAPTERS_11_TO_20 } from "@/data/bm-form3-chot-content";
import { JESTERU_ANALYSIS, JESTERU_CHAPTERS } from "@/data/bm-form3-justeru-content";
import { HEMPASAN_ANALYSIS, HEMPASAN_CHAPTERS } from "@/data/bm-form3-hempasan-content";
import { TAWANAN_ANALYSIS, TAWANAN_CHAPTERS } from "@/data/bm-form3-tawanan-content";

export type BMForm3AnalysisPair = readonly [string, string];

export interface BMForm3NovelAnalysis {
  theme: string;
  issues: BMForm3AnalysisPair[];
  characters: BMForm3AnalysisPair[];
  plot: BMForm3AnalysisPair[];
  plotTechniques: BMForm3AnalysisPair[];
  settings: BMForm3AnalysisPair[];
  language: BMForm3AnalysisPair[];
  values: BMForm3AnalysisPair[];
  lessons: string[];
  examTips: string[];
  srt: BMForm3AnalysisPair[];
  kbat: BMForm3AnalysisPair[];
  quickNotes: BMForm3AnalysisPair[];
  facts: string[];
  checklist: string[];
}

export interface BMForm3NovelChapterContent {
  ringkasanBab?: string;
  peristiwaUtama?: string;
  tindakanWatak?: string;
  konflikPerumitan?: string;
  latarSpesifik?: string;
  resolusiKecil?: string;
  watakTerlibat?: string;
  persoalanBab?: string;
  nilaiBab?: string;
  pengajaranBab?: string;
}

export interface BMForm3NovelChapter {
  id: string;
  label: string;
  content?: BMForm3NovelChapterContent;
}

export interface BMForm3Novel extends Form2KomsasWork {
  author: string;
  zonNegeri: string;
  chapters: BMForm3NovelChapter[];
  /** Shown when the chapter list is intentionally empty pending a trusted source. */
  chaptersNote?: string;
  focus?: string[];
  introduction?: string;
  synopsis?: string;
  quickSummary?: string;
  mainCharacter?: string;
  analysis?: BMForm3NovelAnalysis;
}

function buildChapters(count: number, label: string): BMForm3NovelChapter[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `bab-${index + 1}`,
    label: `${label} ${index + 1}`,
  }));
}

export const BM_FORM3_NOVEL_WORKS: BMForm3Novel[] = [
  {
    id: "tawanan-komander-caucasus",
    title: "Tawanan Komander Caucasus",
    category: "Novel",
    kind: "novel",
    author: "Ruzaini Yahya",
    zonNegeri:
      "Selangor · Wilayah Persekutuan Kuala Lumpur · Wilayah Persekutuan Putrajaya · Negeri Sembilan",
    focus: [
      "Memahami kronologi peristiwa dalam setiap bab novel dari awal hingga peleraian.",
      "Menganalisis tema kegigihan dan persoalan yang mendasari konflik antara manusia dengan dimensi kumbang.",
      "Mengenal pasti perwatakan watak utama dan watak sampingan serta bukti peristiwa berkaitan.",
      "Menghuraikan latar tempat, masa, dan masyarakat yang terdapat dalam novel.",
      "Menguasai teknik menjawab soalan Subjektif Respons Terhad (SRT) dan KBAT mengikut format UASA.",
    ],
    introduction:
      "Novel ini merupakan sebuah karya berunsur sains fiksi dan pengembaraan yang mengisahkan keberanian sekumpulan remaja Tingkatan Satu. Cerita ini membawa pembaca menerokai dimensi kerajaan kumbang yang penuh dengan konflik perebutan kuasa, di mana watak-watak manusia terpaksa berjuang untuk menyelamatkan diri dan mengembalikan keamanan dalam koloni serangga tersebut sebelum pulang ke dunia asal.",
    synopsis:
      "Farhani dan rakan-rakannya terperangkap dalam pengembaraan mencabar setelah menjadi tawanan tentera kumbang. Segalanya bermula dengan kehilangan Kim Yong secara misteri, diikuti oleh Farhani yang menemui pintu ke dimensi kerajaan kumbang di sebuah rumah lama. Di sana, mereka berhadapan dengan Komander Caucasus yang tamak dan ingin menakluki dunia manusia. Farhani bekerjasama dengan kumbang Bara dan Puteri Coleoptera untuk menumbangkan Maharaja Caucasus yang zalim menggunakan strategi racun serangga Endosulfan. Setelah berjaya, mereka menghadapi masalah menjadi halimunan di dunia manusia namun berjaya dipulihkan dengan serum ciptaan Bara. Mereka akhirnya bersepakat merahsiakan kewujudan dimensi tersebut demi keselamatan sejagat.",
    quickSummary:
      "Seorang murid bernama Farhani tersedut masuk ke dimensi kerajaan kumbang dan menemui Kim Yong yang telah lama hilang. Mereka berdua ditawan oleh Komander Caucasus yang gila kuasa, namun berjaya melarikan diri dengan bantuan kumbang Bara. Bersama tiga rakan lain yang turut tersesat, mereka membantu Puteri Coleoptera menggulingkan kerajaan Caucasus yang zalim. Setelah menang, mereka pulang sebagai manusia normal selepas meminum serum khas dan berjanji merahsiakan pengembaraan tersebut.",
    mainCharacter: "Farhani",
    chapters: TAWANAN_CHAPTERS,
    analysis: TAWANAN_ANALYSIS,
  },
  {
    id: "chot",
    title: "Chot",
    category: "Novel",
    kind: "novel",
    author: "Azizi Haji Abdullah",
    zonNegeri: "Melaka · Pahang · Terengganu · Kelantan",
    focus: [
      "Menghuraikan sinopsis dan peristiwa penting dalam setiap bab novel Chot.",
      "Menganalisis tema kasih sayang sesama makhluk dan persoalan tanggungjawab.",
      "Mengenal pasti perwatakan Alias, Chot, dan Cikgu Sunan berdasarkan bukti teks.",
      "Menganalisis latar masyarakat Kampung Dingin yang gigih dan berdikari.",
      "Merumuskan nilai dan pengajaran untuk menjawab soalan respons terhad UASA.",
    ],
    introduction:
      "Novel Chot mengisahkan kehidupan seorang kanak-kanak bernama Alias yang tinggal di Kampung Dingin. Alias mempunyai hubungan yang sangat rapat dengan beruk peliharaannya bernama Chot, yang menjadi punca pendapatannya untuk menyara diri dan ibunya yang lumpuh. Cerita ini memaparkan cabaran hidup, konflik di sekolah, dan pengorbanan yang menyentuh hati.",
    synopsis:
      "Alias merupakan seorang kanak-kanak yang sangat miskin dan tinggal bersama ibunya yang lumpuh. Selepas kematian bapanya, Alias bergantung sepenuhnya kepada Chot untuk memetik buah kelapa bagi membeli barangan dapur. Konflik bermula apabila Cikgu Sunan menengking Alias sehingga dia terjatuh dan telinganya bengkak serta bernanah. Alias malu ke sekolah dan Chot pula hilang beberapa kali. Keadaan memuncak apabila Chot menyerang Cikgu Sunan semasa cikgu itu melawat rumah Alias. Demi menyelamatkan gurunya, Alias terpaksa membunuh Chot. Peristiwa ini membawa kesedaran kepada Cikgu Sunan yang kemudian berjanji untuk membiayai pelajaran Alias.",
    quickSummary:
      "Alias, seorang murid miskin, menyara ibunya yang lumpuh dengan bantuan beruknya, Chot. Akibat kemarahan gurunya, Cikgu Sunan, telinga Alias luka dan bernanah sehingga dia ponteng sekolah. Apabila Cikgu Sunan melawat Alias untuk meminta maaf, Chot mengamuk dan menyerang guru tersebut. Alias terpaksa membunuh Chot demi menyelamatkan Cikgu Sunan, dan peristiwa itu berakhir dengan janji guru tersebut untuk membantu Alias mencapai impian ke universiti.",
    mainCharacter: "Alias",
    chapters: [
      {
        id: "bab-1",
        label: "Bab 1: Chot Tidak Ada",
        content: {
          ringkasanBab:
            "Alias dikejutkan ibunya untuk ke sekolah tetapi mendapati Chot hilang dari pokok langsat.",
          peristiwaUtama: "Kehilangan Chot yang merupakan nyawa dan punca pendapatan Alias.",
          tindakanWatak:
            "Alias mencari Chot di sekeliling pokok langsat dan sekitar kampung serta menyuruh Som pergi ke sekolah dahulu.",
          konflikPerumitan: "Alias berasa tidak menentu dan sedar dia akan lewat ke sekolah.",
          latarSpesifik: "Rumah Alias di Kampung Dingin pada waktu pagi.",
          watakTerlibat: "Alias, Ibu, Som.",
          resolusiKecil: "Alias meneruskan pencarian Chot di sekeliling kampung.",
          persoalanBab: "Kepentingan punca rezeki dalam keluarga miskin.",
          nilaiBab: "Kasih sayang terhadap haiwan peliharaan.",
          pengajaranBab: "Kita hendaklah bertanggungjawab terhadap tugas yang diberikan.",
        },
      },
      {
        id: "bab-2",
        label: "Bab 2: Pastilah Tidak Datang",
        content: {
          ringkasanBab:
            "Som tiba di sekolah dan mendapati Cikgu Sunan sebagai guru bertugas yang sangat garang.",
          peristiwaUtama:
            "Cikgu Sunan memarahi murid dan bertanyakan tentang kesan calar pada keretanya.",
          tindakanWatak:
            "Som masuk ke barisan kelas dan bimbang jika Alias tidak datang ke sekolah.",
          konflikPerumitan: "Som berasa susah hati memikirkan Alias yang pasti tidak hadir.",
          latarSpesifik: "Perhimpunan sekolah.",
          watakTerlibat: "Som, Cikgu Sunan, Murid-murid.",
          resolusiKecil: "Som pasti Alias tidak akan datang pada hari itu.",
          persoalanBab: "Sikap garang guru dalam mendidik murid.",
          nilaiBab: "Simpati terhadap rakan.",
          pengajaranBab: "Kita janganlah bertindak mengikut kata hati dan emosi.",
        },
      },
      {
        id: "bab-3",
        label: "Bab 3: Chot Terus Menghilang",
        content: {
          ringkasanBab: "Alias gigih mencari Chot di merata tempat tetapi masih gagal.",
          peristiwaUtama: "Alias bertembung dengan Salleh dan Hamad yang mengejeknya.",
          tindakanWatak:
            "Alias memanggil nama Chot berulang kali dan bertanya kepada penduduk kampung.",
          konflikPerumitan:
            "Ejekan Salleh dan Hamad yang menyuruh Alias mengurung beruknya di dalam kelambu.",
          latarSpesifik: "Kebun Pak Din, pinggir sungai, dan tepi sawah.",
          watakTerlibat: "Alias, Salleh, Hamad.",
          resolusiKecil: "Alias memutuskan untuk tetap ke sekolah walaupun sedar dia sudah lewat.",
          persoalanBab: "Ketabahan menghadapi ejekan orang lain.",
          nilaiBab: "Kegigihan dalam mencari sesuatu.",
          pengajaranBab:
            "Kita tidak seharusnya menyimpan perasaan dendam terhadap ejekan orang lain.",
        },
      },
      {
        id: "bab-4",
        label: "Bab 4: Kena Marah, Diejek",
        content: {
          ringkasanBab: "Alias tiba di sekolah dan dimarahi dengan teruk oleh Cikgu Sunan.",
          peristiwaUtama:
            "Alias jatuh terlentang dan telinganya terkena bucu meja selepas ditengking Cikgu Sunan.",
          tindakanWatak:
            "Alias berterus-terang tentang kehilangan Chot dan hanya berdiri menunggu arahan cikgu semasa rehat.",
          konflikPerumitan:
            "Cikgu Sunan menuduh Alias lebih mementingkan beruk daripada pelajaran.",
          latarSpesifik: "Bilik darjah lima.",
          watakTerlibat: "Alias, Cikgu Sunan, Som.",
          resolusiKecil: "Alias menahan sakit denyutan di telinganya.",
          persoalanBab: "Akibat tindakan mengikut emosi.",
          nilaiBab: "Kesabaran menghadapi herdikan.",
          pengajaranBab: "Kita perlulah jujur dalam memberikan alasan.",
        },
      },
      {
        id: "bab-5",
        label: "Bab 5: Chot Sembunyi di Pokok Cenerai",
        content: {
          ringkasanBab:
            "Selepas waktu sekolah, Alias dan Som diarahkan membersihkan kereta Cikgu Sunan sebelum menemui Chot.",
          peristiwaUtama: "Penemuan Chot yang bersembunyi di atas pokok cenerai.",
          tindakanWatak:
            "Alias tidak marah akan Cikgu Sunan dan berasa bangga dipilih untuk membantu cikgu.",
          konflikPerumitan:
            "Som berasa geram melihat Alias yang masih mahu mengambil hati Cikgu Sunan.",
          latarSpesifik: "Tempat letak kereta sekolah dan jalan pulang.",
          watakTerlibat: "Alias, Som, Cikgu Sunan, Chot.",
          resolusiKecil: "Chot mengikut Alias pulang ke rumah.",
          persoalanBab: "Kebesaran jiwa memaafkan orang lain.",
          nilaiBab: "Pemaaf.",
          pengajaranBab: "Kita hendaklah sentiasa bersikap baik hati terhadap guru.",
        },
      },
      {
        id: "bab-6",
        label: "Bab 6: Denyut Semakin Terasa",
        content: {
          ringkasanBab:
            "Alias pulang ke rumah, memberi Chot pisang, dan mendapati telinganya semakin sakit.",
          peristiwaUtama: "Mak Su Kiah menghantar makanan untuk Alias dan ibunya.",
          tindakanWatak:
            "Alias membaiki rantai Chot menggunakan dawai buruk dan berbual dengan ibunya.",
          konflikPerumitan:
            "Telinga Alias berdengung dan sakit tetapi dia perlu keluar memetik kelapa kerana bekalan dapur habis.",
          latarSpesifik: "Rumah usang Alias.",
          watakTerlibat: "Alias, Ibu, Mak Su Kiah, Chot.",
          resolusiKecil: "Alias tetap merancang untuk memetik kelapa bersama Chot pada petang itu.",
          persoalanBab: "Tanggungjawab anak menjaga ibu yang sakit.",
          nilaiBab: "Bertanggungjawab terhadap keluarga.",
          pengajaranBab: "Kita mestilah mengamalkan sikap tolong-menolong sesama jiran.",
        },
      },
      {
        id: "bab-7",
        label: "Bab 7: Nak Ambil Hati Chot",
        content: {
          ringkasanBab:
            "Alias membawa Chot mandi di sungai untuk mengambil hatinya sebelum memetik kelapa.",
          peristiwaUtama: "Chot takut akan air tetapi akhirnya dimandikan oleh Alias.",
          tindakanWatak:
            "Alias menukar rantai leher Chot dan mengalihkan Chot ke bahu kiri untuk mengelakkan telinganya yang sakit.",
          konflikPerumitan:
            "Alias memberitahu Som bahawa dia mungkin tidak ke sekolah kerana kurang sihat.",
          latarSpesifik: "Sungai.",
          watakTerlibat: "Alias, Chot, Som.",
          resolusiKecil:
            "Som mengetahui rahsia kesakitan telinga Alias tetapi berjanji tidak memberitahu sesiapa.",
          persoalanBab: "Keakraban hubungan manusia dengan haiwan.",
          nilaiBab: "Kasih sayang.",
          pengajaranBab: "Kita hendaklah bijak mengawal emosi.",
        },
      },
      {
        id: "bab-8",
        label: "Bab 8: Sakit Semakin Menjadi-jadi",
        content: {
          ringkasanBab:
            "Menjelang malam, kesakitan telinga Alias semakin parah sehingga mengeluarkan nanah.",
          peristiwaUtama: "Alias menyiapkan kerja Matematik di sisi ibunya dalam kesakitan.",
          tindakanWatak:
            "Alias membaca al-Quran sehingga juzuk ketiga dan cuba menyembunyikan sakitnya daripada pengetahuan ibu.",
          konflikPerumitan:
            "Alias bimbang ibunya menganggap dia malas sekiranya dia beritahu tidak mahu ke sekolah.",
          latarSpesifik: "Rumah Alias pada waktu malam.",
          watakTerlibat: "Alias, Ibu.",
          resolusiKecil: "Alias tertidur dalam kesakitan selepas ibunya memadamkan lampu pelita.",
          persoalanBab: "Kesabaran menanggung penderitaan sendirian.",
          nilaiBab: "Ketaatan terhadap agama.",
          pengajaranBab: "Kita hendaklah mengutamakan pendidikan walaupun dalam keadaan susah.",
        },
      },
      {
        id: "bab-9",
        label: "Bab 9: Bersama-sama Chot Memetik Kelapa",
        content: {
          ringkasanBab:
            "Alias bangun lewat dan memutuskan untuk ponteng sekolah bagi memetik kelapa.",
          peristiwaUtama: "Ibu Alias menasihatinya agar tidak kerap ponteng sekolah.",
          tindakanWatak: "Alias membawa Chot ke kebun Pak Din walaupun kepalanya terasa berat.",
          konflikPerumitan:
            "Dilema Alias antara keinginan untuk belajar dengan keperluan mencari rezeki.",
          latarSpesifik: "Rumah Alias pada waktu pagi.",
          watakTerlibat: "Alias, Ibu, Mak Su Kiah.",
          resolusiKecil: "Alias memulakan kerja memetik kelapa di kebun Pak Din.",
          persoalanBab: "Kepentingan mencari rezeki yang halal.",
          nilaiBab: "Berdikari mencari nafkah.",
          pengajaranBab: "Kita haruslah patuh akan nasihat ibu bapa.",
        },
      },
      {
        id: "bab-10",
        label: "Bab 10: Sakit Telinga Semakin Menjadi-jadi",
        content: {
          ringkasanBab:
            "Alias bergelut dengan kesakitan telinga yang bernanah semasa bekerja di kebun kelapa.",
          peristiwaUtama: "Kamal mencuri buah kelapa muda Pak Din tanpa menghiraukan Alias.",
          tindakanWatak: "Alias berehat sejenak sambil cuba membaca buku sekolah yang dibawanya.",
          konflikPerumitan: "Kehadiran Budin, Kamal, dan Talib yang mengusik Alias.",
          latarSpesifik: "Kebun kelapa Pak Din.",
          watakTerlibat: "Alias, Chot, Budin, Kamal, Talib.",
          resolusiKecil:
            "Alias tidak berdaya meneruskan kerja dan pulang membawa lapan biji kelapa.",
          persoalanBab: "Cabaran kanak-kanak yang bekerja di usia muda.",
          nilaiBab: "Kesungguhan dalam menuntut ilmu.",
          pengajaranBab: "Kita janganlah memandang hina terhadap orang lain yang sedang bekerja.",
        },
      },
      ...CHOT_CHAPTERS_11_TO_20,
    ],
    analysis: CHOT_ANALYSIS,
  },
  {
    id: "justeru-impian-di-jaring",
    title: "Justeru Impian di Jaring",
    category: "Novel",
    kind: "novel",
    author: "Zaid Akhtar",
    zonNegeri: "Perlis · Kedah · Pulau Pinang · Perak",
    focus: [
      "Menghuraikan sinopsis dan peristiwa penting dalam setiap bab novel Justeru Impian di Jaring.",
      "Menganalisis tema ketabahan seorang pemain badminton dan persoalan ketaatan kepada syariat.",
      "Mengenal pasti perwatakan Syahir, Haji Marzuki, dan Syed Amiri berdasarkan bukti teks.",
      "Menganalisis latar masyarakat yang gigih berusaha dan berpegang teguh pada pesanan.",
      "Merumuskan nilai dan pengajaran untuk menjawab soalan respons terhad UASA.",
    ],
    introduction:
      "Novel Justeru Impian di Jaring mengisahkan perjalanan hidup Syahir, seorang pemain badminton skuad kebangsaan yang bercita-cita tinggi untuk mewakili negara ke peringkat antarabangsa. Novel ini memaparkan cabaran fizikal, tekanan mental, dan prinsip agama yang dipegang teguh oleh watak utamanya dalam mengharungi dunia sukan yang kompetitif.",
    synopsis:
      "Syahir merupakan pemain badminton berbakat yang sering menghadapi rintangan daripada pihak pengurusan PBSM dan sindiran rakan sepasukannya, Syed Amiri. Walaupun gagal dalam Kejohanan Terbuka Johor akibat ketidakadilan pengadil, Syahir akhirnya terpilih ke Jakarta bagi menggantikan Gopinath yang terlibat dalam kemalangan. Di Jakarta, Syahir bertarung dalam keadaan emaknya diserang strok dan dirinya sendiri menanggung kesakitan radang apendiks. Ketabahannya membuahkan hasil apabila dia berjaya muncul sebagai juara dunia setelah menewaskan Andri Mirnawan di peringkat akhir.",
    quickSummary:
      "Syahir, pemain badminton yang komited pada syariat Islam, berjuang mengatasi diskriminasi jurulatih dan fitnah media. Selepas tewas secara tidak adil di Johor, dia mendapat peluang ke Jakarta menggantikan rakan yang cedera. Meskipun diuji dengan masalah kesihatan ibu dan kesakitan perutnya sendiri, Syahir tetap cekal bertarung hingga bergelar juara dunia sebelum menjalani pembedahan apendiks sebaik sahaja tamat perlawanan.",
    mainCharacter: "Syahir",
    chapters: JESTERU_CHAPTERS,
    analysis: JESTERU_ANALYSIS,
  },
  {
    id: "hempasan-ombak",
    title: "Hempasan Ombak",
    category: "Novel",
    kind: "novel",
    author: "Zailiani Taslim",
    zonNegeri: "Johor · Sabah · Sarawak · Wilayah Persekutuan Labuan",
    focus: [
      "Menghuraikan sinopsis dan peristiwa penting dalam setiap bab novel Hempasan Ombak.",
      "Menganalisis tema kegigihan remaja dalam usaha memajukan syarikat keluarga.",
      "Mengenal pasti perwatakan Farid, Mokhsein, Hajah Zaoyah, Zuraida, dan Mukhtar berdasarkan bukti teks.",
      "Menganalisis latar masyarakat yang berkaitan dengan dunia perniagaan batik.",
      "Merumuskan nilai dan pengajaran untuk menjawab soalan respons terhad UASA.",
    ],
    introduction:
      "Novel Hempasan Ombak mengisahkan Farid yang memikul tanggungjawab besar untuk menerajui syarikat batik keluarga selepas kematian bapanya. Perjalanan ini memperlihatkan usaha gigih, kreativiti, konflik persaingan, dan sokongan keluarga serta sahabat dalam memajukan perniagaan.",
    synopsis:
      "Farid bergelut dengan masalah kewangan, stok yang tidak laku dan persaingan sengit daripada Mukhtar. Dengan bantuan ibunya, Hajah Zaoyah, Mokhsein dan Zuraida, Farid memperkenalkan batik lukis moden dan membina bengkel baharu. Namun, Mukhtar yang dengki melancarkan sabotaj hingga bengkel Farid terbakar. Walaupun diuji hebat, Farid bangkit semula apabila Mukhtar dihukum penjara dan syarikatnya kembali pulih melalui tempahan besar dari luar negara.",
    quickSummary:
      "Farid memulakan usaha menyelamatkan syarikat batik keluarga dengan idea baharu, sokongan ibu, dan bantuan rakan. Dia berdepan sabotaj, ugutan dan kebakaran, tetapi akhirnya berjaya memulihkan syarikat dan belajar bahawa kejayaan memerlukan ilmu, ketabahan dan bantuan orang sekeliling.",
    mainCharacter: "Farid",
    chapters: HEMPASAN_CHAPTERS,
    analysis: HEMPASAN_ANALYSIS,
  },
];

export function getBMForm3NovelWork(id: string) {
  return BM_FORM3_NOVEL_WORKS.find((novel) => novel.id === id);
}
