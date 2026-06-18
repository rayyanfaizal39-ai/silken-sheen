// ─── Penanda Wacana Lengkap — Nota Ultimate (KSSM Tingkatan 1) ────────────────
// Data sahaja. Paparan diuruskan oleh src/components/PenandaWacanaLengkapHub.tsx

export interface KosaKataSukar {
  perkataan: string;
  maksud: string;
}

export interface PenandaWacanaItem {
  frasa: string;
  kegunaan: string;
  contohAyat: string;
  kosaKataSukar: KosaKataSukar[];
}

export interface PenandaWacanaKategori {
  id: string;
  nama: string;
  icon: string;
  color: string;
  penerangan: string;
  items: PenandaWacanaItem[];
}

export const PENANDA_WACANA_LENGKAP: PenandaWacanaKategori[] = [
  {
    id: "pendahuluan",
    nama: "Pendahuluan",
    icon: "🚪",
    color: "#818CF8",
    penerangan: "Digunakan pada ayat pertama karangan untuk mengaitkan tajuk dengan situasi semasa atau konteks umum.",
    items: [
      {
        frasa: "Pada masa kini",
        kegunaan: "Penanda paling standard untuk memulakan ayat pengenalan dan mengaitkan tajuk dengan isu semasa.",
        contohAyat: "Pada masa kini, penggunaan teknologi digital semakin meluas dalam kalangan masyarakat.",
        kosaKataSukar: [{ perkataan: "meluas", maksud: "semakin bertambah luas atau banyak" }],
      },
      {
        frasa: "Dewasa ini",
        kegunaan: "Ungkapan formal bermaksud 'pada masa ini'; sesuai untuk karangan rasmi dan respons terbuka.",
        contohAyat: "Dewasa ini, isu pencemaran alam sekitar semakin membimbangkan pelbagai pihak.",
        kosaKataSukar: [
          { perkataan: "dewasa ini", maksud: "pada masa sekarang (bukan bermaksud 'orang dewasa')" },
          { perkataan: "membimbangkan", maksud: "menimbulkan rasa bimbang atau risau" },
        ],
      },
      {
        frasa: "Mutakhir ini",
        kegunaan: "Merujuk kepada sesuatu perkara yang berlaku dalam tempoh terkini atau terbaharu.",
        contohAyat: "Mutakhir ini, kes buli siber dalam kalangan remaja semakin membimbangkan.",
        kosaKataSukar: [{ perkataan: "mutakhir", maksud: "terkini atau terbaharu" }],
      },
      {
        frasa: "Sejak akhir-akhir ini",
        kegunaan: "Menunjukkan trend atau isu yang mula kelihatan dalam tempoh masa yang singkat.",
        contohAyat: "Sejak akhir-akhir ini, semakin ramai pelajar yang mengamalkan gaya hidup sihat.",
        kosaKataSukar: [],
      },
      {
        frasa: "Sejak kebelakangan ini",
        kegunaan: "Varian gaya bahasa bagi 'sejak akhir-akhir ini' untuk mengelakkan pengulangan ungkapan.",
        contohAyat: "Sejak kebelakangan ini, penggunaan media sosial dalam kalangan remaja semakin membimbangkan ibu bapa.",
        kosaKataSukar: [],
      },
      {
        frasa: "Dalam era globalisasi ini",
        kegunaan: "Sesuai untuk tajuk berkaitan teknologi, ekonomi antarabangsa, atau perubahan dunia moden.",
        contohAyat: "Dalam era globalisasi ini, sempadan antara negara semakin kabur akibat kemudahan teknologi maklumat.",
        kosaKataSukar: [
          { perkataan: "globalisasi", maksud: "proses dunia menjadi semakin saling berhubung dan bersepadu" },
          { perkataan: "kabur", maksud: "tidak jelas atau kurang nyata" },
        ],
      },
    ],
  },
  {
    id: "isi",
    nama: "Isi",
    icon: "🧱",
    color: "#34D399",
    penerangan: "Digunakan untuk memulakan dan menyenaraikan setiap isi baharu dalam perenggan badan karangan.",
    items: [
      {
        frasa: "Pertama",
        kegunaan: "Memulakan isi pertama dalam perenggan isi karangan.",
        contohAyat: "Pertama, kerajaan perlu menggubal undang-undang yang lebih tegas untuk membendung jenayah siber.",
        kosaKataSukar: [
          { perkataan: "menggubal", maksud: "menyusun atau mencipta (undang-undang)" },
          { perkataan: "membendung", maksud: "mengawal atau menghalang daripada merebak" },
        ],
      },
      {
        frasa: "Kedua",
        kegunaan: "Menyambung kepada isi kedua selepas isi pertama dihuraikan dengan lengkap.",
        contohAyat: "Kedua, ibu bapa perlu mengawasi penggunaan internet anak-anak mereka.",
        kosaKataSukar: [],
      },
      {
        frasa: "Selain itu",
        kegunaan: "Penanda paling kerap digunakan untuk menambah isi baharu yang berkaitan dengan isi sebelumnya.",
        contohAyat: "Selain itu, sekolah perlu mengadakan kempen kesedaran tentang bahaya buli siber.",
        kosaKataSukar: [],
      },
      {
        frasa: "Di samping itu",
        kegunaan: "Berfungsi sama seperti 'selain itu'; digunakan untuk variasi bahasa agar karangan tidak membosankan.",
        contohAyat: "Di samping itu, badan bukan kerajaan boleh memainkan peranan dengan menganjurkan bengkel kesedaran.",
        kosaKataSukar: [],
      },
      {
        frasa: "Tambahan pula",
        kegunaan: "Menambah isi yang memperkukuh hujah sebelumnya, membawa nada 'lebih-lebih lagi'.",
        contohAyat: "Tambahan pula, penggunaan aplikasi kawalan ibu bapa dapat membantu memantau aktiviti dalam talian anak-anak.",
        kosaKataSukar: [],
      },
      {
        frasa: "Seterusnya",
        kegunaan: "Digunakan untuk meneruskan kepada isi yang berikutnya secara berurutan.",
        contohAyat: "Seterusnya, pihak media perlu lebih bertanggungjawab dalam menyiarkan kandungan yang sesuai untuk semua peringkat umur.",
        kosaKataSukar: [],
      },
      {
        frasa: "Bukan itu sahaja",
        kegunaan: "Ungkapan aras lebih tinggi untuk menambah isi dengan nada penegasan bahawa masih banyak lagi hujah.",
        contohAyat: "Bukan itu sahaja, sektor swasta turut digalak menyumbang dana bagi program pencegahan jenayah siber.",
        kosaKataSukar: [],
      },
    ],
  },
  {
    id: "huraian-mengapa",
    nama: "Huraian (Mengapa)",
    icon: "❓",
    color: "#FBBF24",
    penerangan: "Digunakan selepas ayat isi untuk menerangkan sebab atau rasional sesuatu isu itu penting.",
    items: [
      {
        frasa: "Hal ini demikian kerana",
        kegunaan: "Penanda paling standard untuk memulakan ayat huraian sebab atau rasional selepas ayat isi.",
        contohAyat: "Hal ini demikian kerana remaja yang kerap didedahkan kepada kandungan negatif lebih mudah terjebak dalam tingkah laku devian.",
        kosaKataSukar: [{ perkataan: "devian", maksud: "menyimpang daripada norma yang diterima masyarakat" }],
      },
      {
        frasa: "Hal ini kerana",
        kegunaan: "Versi ringkas daripada 'hal ini demikian kerana'; boleh digunakan bergilir-gilir untuk variasi.",
        contohAyat: "Hal ini kerana ibu bapa yang sibuk bekerja sering terlepas pandang aktiviti dalam talian anak-anak mereka.",
        kosaKataSukar: [],
      },
      {
        frasa: "Ini disebabkan oleh",
        kegunaan: "Digunakan untuk menyatakan sebab secara langsung dengan nada lebih formal.",
        contohAyat: "Ini disebabkan oleh kekurangan pendedahan tentang etika penggunaan media sosial dalam kalangan remaja.",
        kosaKataSukar: [{ perkataan: "pendedahan", maksud: "peluang untuk mengetahui atau mengenali sesuatu" }],
      },
      {
        frasa: "Perkara ini berlaku kerana",
        kegunaan: "Variasi bahasa untuk mengelak pengulangan 'hal ini kerana' dalam karangan yang panjang.",
        contohAyat: "Perkara ini berlaku kerana kurangnya kawalan kandungan media sosial oleh pihak berkuasa.",
        kosaKataSukar: [],
      },
      {
        frasa: "Hal ini disebabkan",
        kegunaan: "Variasi ringkas lain bagi memulakan ayat huraian sebab.",
        contohAyat: "Hal ini disebabkan sikap sambil lewa segelintir individu terhadap kesan negatif media sosial.",
        kosaKataSukar: [{ perkataan: "sambil lewa", maksud: "tidak bersungguh-sungguh atau tidak ambil peduli" }],
      },
    ],
  },
  {
    id: "huraian-bagaimana",
    nama: "Huraian (Bagaimana)",
    icon: "🛠️",
    color: "#FB923C",
    penerangan: "Digunakan untuk menghuraikan cara, langkah, atau kaedah pelaksanaan sesuatu cadangan dalam isi.",
    items: [
      {
        frasa: "Antara caranya",
        kegunaan: "Memulakan huraian tentang cara atau langkah pelaksanaan sesuatu isi atau cadangan.",
        contohAyat: "Antara caranya, sekolah boleh mengadakan ceramah kesedaran tentang etika digital setiap penggal persekolahan.",
        kosaKataSukar: [],
      },
      {
        frasa: "Bagi merealisasikannya",
        kegunaan: "Menerangkan cara sesuatu cadangan dapat dilaksanakan secara praktikal.",
        contohAyat: "Bagi merealisasikannya, pihak sekolah perlu bekerjasama dengan ibu bapa dan komuniti setempat.",
        kosaKataSukar: [{ perkataan: "merealisasikan", maksud: "menjadikan sesuatu benar-benar berlaku atau dilaksanakan" }],
      },
      {
        frasa: "Langkah yang boleh diambil ialah",
        kegunaan: "Memperkenalkan langkah konkrit untuk menyelesaikan isu yang dibincangkan.",
        contohAyat: "Langkah yang boleh diambil ialah mewajibkan kelas literasi digital di setiap sekolah rendah dan menengah.",
        kosaKataSukar: [{ perkataan: "literasi digital", maksud: "kemahiran memahami dan menggunakan teknologi digital secara bijak" }],
      },
      {
        frasa: "Untuk mengatasi masalah ini",
        kegunaan: "Mengaitkan huraian dengan penyelesaian khusus bagi isu yang dinyatakan dalam isi.",
        contohAyat: "Untuk mengatasi masalah ini, kerajaan boleh memperkenalkan talian kecemasan khusus bagi mangsa buli siber.",
        kosaKataSukar: [],
      },
      {
        frasa: "Caranya",
        kegunaan: "Versi ringkas dan mudah digunakan tanpa mengubah maksud asal.",
        contohAyat: "Caranya, ibu bapa perlu meluangkan masa berbual dengan anak-anak tentang aktiviti dalam talian mereka.",
        kosaKataSukar: [],
      },
    ],
  },
  {
    id: "contoh",
    nama: "Contoh",
    icon: "💡",
    color: "#38BDF8",
    penerangan: "Digunakan untuk mengukuhkan isi atau huraian dengan memberikan bukti atau ilustrasi yang konkrit.",
    items: [
      {
        frasa: "Sebagai contoh",
        kegunaan: "Memperkenalkan contoh khusus untuk menyokong isi atau huraian yang telah dinyatakan.",
        contohAyat: "Sebagai contoh, kempen 'Klik Dengan Bijak' anjuran Kementerian Komunikasi telah berjaya meningkatkan kesedaran orang ramai.",
        kosaKataSukar: [],
      },
      {
        frasa: "Contohnya",
        kegunaan: "Versi ringkas bagi 'sebagai contoh'; sesuai untuk variasi ayat.",
        contohAyat: "Contohnya, beberapa sekolah telah memperkenalkan modul literasi digital dalam mata pelajaran Reka Bentuk dan Teknologi.",
        kosaKataSukar: [],
      },
      {
        frasa: "Misalnya",
        kegunaan: "Sinonim kepada 'contohnya'; menambah variasi bahasa dalam karangan.",
        contohAyat: "Misalnya, aplikasi kawalan ibu bapa seperti Family Link membantu memantau penggunaan internet kanak-kanak.",
        kosaKataSukar: [],
      },
      {
        frasa: "Sebagai bukti",
        kegunaan: "Digunakan apabila contoh yang diberikan bertujuan mengukuhkan dakwaan atau fakta sebelumnya.",
        contohAyat: "Sebagai bukti, kajian oleh sebuah universiti tempatan mendapati 60 peratus remaja pernah terdedah kepada buli siber.",
        kosaKataSukar: [],
      },
      {
        frasa: "Sebagai ilustrasi",
        kegunaan: "Ungkapan formal untuk memberi gambaran nyata tentang sesuatu isu.",
        contohAyat: "Sebagai ilustrasi, seorang remaja di Selangor pernah mengalami tekanan emosi yang serius akibat dibuli di media sosial.",
        kosaKataSukar: [{ perkataan: "ilustrasi", maksud: "gambaran atau contoh yang menjelaskan sesuatu perkara" }],
      },
    ],
  },
  {
    id: "kesan",
    nama: "Kesan",
    icon: "⚡",
    color: "#F472B6",
    penerangan: "Digunakan untuk menghubungkan huraian atau contoh dengan akibat, hasil, atau kesan yang terhasil.",
    items: [
      {
        frasa: "Oleh itu",
        kegunaan: "Menghubungkan huraian atau contoh dengan kesan atau akibat yang terhasil.",
        contohAyat: "Oleh itu, kadar jenayah siber dapat dikurangkan secara berperingkat.",
        kosaKataSukar: [],
      },
      {
        frasa: "Dengan itu",
        kegunaan: "Sinonim 'oleh itu'; sesuai untuk mengelakkan pengulangan kata hubung yang sama.",
        contohAyat: "Dengan itu, remaja dapat menggunakan media sosial secara lebih selamat dan bertanggungjawab.",
        kosaKataSukar: [],
      },
      {
        frasa: "Hasilnya",
        kegunaan: "Menekankan hasil positif daripada sesuatu tindakan atau langkah yang dicadangkan.",
        contohAyat: "Hasilnya, kepercayaan ibu bapa terhadap keselamatan anak-anak dalam talian semakin meningkat.",
        kosaKataSukar: [],
      },
      {
        frasa: "Natijahnya",
        kegunaan: "Ungkapan formal aras tinggi untuk 'hasilnya' atau 'akibatnya'; jarang digunakan tetapi memberi kesan bahasa yang lebih tinggi.",
        contohAyat: "Natijahnya, masyarakat yang lebih celik digital dapat dibentuk dalam tempoh masa yang singkat.",
        kosaKataSukar: [{ perkataan: "natijah", maksud: "hasil atau akibat (perkataan formal, jarang digunakan dalam pertuturan harian)" }],
      },
      {
        frasa: "Akibatnya",
        kegunaan: "Lazim digunakan untuk menyatakan kesan negatif sesuatu perkara jika tidak ditangani.",
        contohAyat: "Akibatnya, mangsa buli siber sering mengalami kemurungan dan kehilangan keyakinan diri.",
        kosaKataSukar: [{ perkataan: "kemurungan", maksud: "keadaan emosi yang sedih dan tertekan secara berpanjangan" }],
      },
      {
        frasa: "Lantaran itu",
        kegunaan: "Ungkapan formal yang membawa maksud 'oleh sebab itu'; sesuai untuk karangan aras tinggi.",
        contohAyat: "Lantaran itu, semua pihak perlu memainkan peranan masing-masing demi membendung gejala ini.",
        kosaKataSukar: [{ perkataan: "lantaran", maksud: "disebabkan atau kerana" }],
      },
    ],
  },
  {
    id: "ungkapan",
    nama: "Ungkapan",
    icon: "💎",
    color: "#C084FC",
    penerangan: "Ungkapan menarik bertema yang sesuai digunakan dalam pendahuluan atau penutup untuk markah bahasa lebih tinggi.",
    items: [
      {
        frasa: "Ilmu pelita hidup",
        kegunaan: "Ungkapan bertema pendidikan, sesuai untuk pendahuluan atau penutup karangan bertajuk ilmu atau pendidikan.",
        contohAyat: "Sesungguhnya, ilmu pelita hidup yang menyuluh setiap insan ke arah kejayaan.",
        kosaKataSukar: [{ perkataan: "pelita", maksud: "lampu atau cahaya yang menerangi" }],
      },
      {
        frasa: "Mencegah lebih baik daripada mengubati",
        kegunaan: "Ungkapan bertema kesihatan, sesuai untuk menegaskan kepentingan langkah pencegahan.",
        contohAyat: "Mencegah lebih baik daripada mengubati; oleh itu, pemeriksaan kesihatan berkala amat dianjurkan.",
        kosaKataSukar: [],
      },
      {
        frasa: "Bersatu teguh, bercerai roboh",
        kegunaan: "Ungkapan bertema perpaduan, sesuai untuk penutup karangan isu perpaduan kaum atau masyarakat.",
        contohAyat: "Bersatu teguh, bercerai roboh; justeru, semangat perpaduan perlu disemai sejak di bangku sekolah.",
        kosaKataSukar: [{ perkataan: "roboh", maksud: "runtuh atau tumbang" }],
      },
      {
        frasa: "Alam terpelihara, hidup sejahtera",
        kegunaan: "Ungkapan bertema alam sekitar, sesuai untuk penutup karangan isu kelestarian alam.",
        contohAyat: "Alam terpelihara, hidup sejahtera — slogan ini wajar dijadikan pegangan setiap rakyat Malaysia.",
        kosaKataSukar: [],
      },
      {
        frasa: "Negara dipelihara, generasi sejahtera",
        kegunaan: "Ungkapan bertema patriotisme, sesuai untuk karangan isu kenegaraan atau cinta tanah air.",
        contohAyat: "Negara dipelihara, generasi sejahtera; oleh itu, semangat patriotisme perlu dipupuk sejak usia muda.",
        kosaKataSukar: [],
      },
      {
        frasa: "Berat sama dipikul, ringan sama dijinjing",
        kegunaan: "Ungkapan bertema kerjasama dan gotong-royong, sesuai untuk karangan isu semangat kejiranan atau kerjasama masyarakat.",
        contohAyat: "Berat sama dipikul, ringan sama dijinjing — semangat inilah yang harus dipupuk dalam kalangan masyarakat majmuk di negara ini.",
        kosaKataSukar: [{ perkataan: "dijinjing", maksud: "dibawa atau dipikul dengan tangan" }],
      },
    ],
  },
  {
    id: "penegas",
    nama: "Penegas",
    icon: "📢",
    color: "#FB7185",
    penerangan: "Digunakan untuk menegaskan kebenaran atau kepentingan sesuatu kenyataan dalam pendahuluan, isi, atau penutup.",
    items: [
      {
        frasa: "Sesungguhnya",
        kegunaan: "Menegaskan kebenaran atau kepentingan sesuatu kenyataan, sering pada awal ayat pengenalan atau penutup.",
        contohAyat: "Sesungguhnya, pendidikan merupakan kunci utama kepada kejayaan sesebuah bangsa.",
        kosaKataSukar: [],
      },
      {
        frasa: "Sebenarnya",
        kegunaan: "Memberi penegasan tentang fakta sebenar sesuatu isu, biasa digunakan dalam ayat huraian.",
        contohAyat: "Sebenarnya, isu pencemaran sungai bukan sekadar tanggungjawab kerajaan, tetapi tanggungjawab setiap individu.",
        kosaKataSukar: [],
      },
      {
        frasa: "Tidak dapat dinafikan bahawa",
        kegunaan: "Ungkapan aras tinggi untuk menegaskan sesuatu fakta yang jelas dan tidak boleh dipertikaikan.",
        contohAyat: "Tidak dapat dinafikan bahawa teknologi telah membawa banyak kemudahan kepada kehidupan manusia.",
        kosaKataSukar: [{ perkataan: "dinafikan", maksud: "disangkal atau ditolak kebenarannya" }],
      },
      {
        frasa: "Tidak dapat disangkal lagi bahawa",
        kegunaan: "Sinonim kepada 'tidak dapat dinafikan bahawa'; sesuai untuk variasi bahasa dalam karangan aras cemerlang.",
        contohAyat: "Tidak dapat disangkal lagi bahawa kerjasama semua pihak amat penting untuk menjayakan sesuatu program.",
        kosaKataSukar: [{ perkataan: "disangkal", maksud: "dibantah atau ditentang kebenarannya" }],
      },
      {
        frasa: "Sememangnya",
        kegunaan: "Memberi penegasan ringkas terhadap sesuatu hakikat yang diterima umum.",
        contohAyat: "Sememangnya, kesihatan mental sama pentingnya dengan kesihatan fizikal.",
        kosaKataSukar: [],
      },
      {
        frasa: "Jelas sekali bahawa",
        kegunaan: "Menegaskan kesimpulan logik daripada huraian atau contoh yang telah dikemukakan.",
        contohAyat: "Jelas sekali bahawa langkah pencegahan awal dapat mengurangkan kos rawatan kesihatan negara.",
        kosaKataSukar: [],
      },
    ],
  },
  {
    id: "kesimpulan",
    nama: "Kesimpulan",
    icon: "🏁",
    color: "#2DD4BF",
    penerangan: "Digunakan pada ayat pertama perenggan penutup untuk merumus dan menutup keseluruhan karangan.",
    items: [
      {
        frasa: "Kesimpulannya",
        kegunaan: "Penanda paling standard untuk memulakan ayat penutup atau rumusan karangan.",
        contohAyat: "Kesimpulannya, semua pihak perlu bekerjasama untuk menangani isu pencemaran alam sekitar secara berkesan.",
        kosaKataSukar: [],
      },
      {
        frasa: "Tegasnya",
        kegunaan: "Menegaskan kembali pendirian penulis sebelum karangan ditamatkan.",
        contohAyat: "Tegasnya, kerjasama erat antara kerajaan dan rakyat amat penting demi memastikan kelestarian alam sekitar.",
        kosaKataSukar: [],
      },
      {
        frasa: "Konklusinya",
        kegunaan: "Kata pinjaman daripada bahasa Inggeris (conclusion); digunakan untuk variasi gaya bahasa pada bahagian penutup.",
        contohAyat: "Konklusinya, usaha membendung jenayah siber memerlukan gabungan tindakan undang-undang dan kesedaran masyarakat.",
        kosaKataSukar: [{ perkataan: "konklusi", maksud: "kesimpulan atau rumusan akhir" }],
      },
      {
        frasa: "Jelaslah bahawa",
        kegunaan: "Menyimpulkan hujah dengan menegaskan kebenaran yang telah dibuktikan melalui isi dan contoh.",
        contohAyat: "Jelaslah bahawa pendidikan berkualiti menjadi asas pembangunan negara yang lebih maju.",
        kosaKataSukar: [],
      },
      {
        frasa: "Rumusannya",
        kegunaan: "Variasi lain bagi 'kesimpulannya'; sesuai digunakan untuk mengelak pengulangan kata yang sama.",
        contohAyat: "Rumusannya, kesedaran sivik perlu dipupuk dalam kalangan masyarakat sejak di bangku sekolah.",
        kosaKataSukar: [{ perkataan: "sivik", maksud: "berkaitan tanggungjawab dan etika sebagai warganegara" }],
      },
      {
        frasa: "Secara keseluruhannya",
        kegunaan: "Memberi gambaran umum sebelum menutup karangan; sesuai untuk karangan jenis perbincangan atau pendapat.",
        contohAyat: "Secara keseluruhannya, teknologi membawa lebih banyak manfaat berbanding mudaratnya jika digunakan secara bijak.",
        kosaKataSukar: [{ perkataan: "mudarat", maksud: "kesan buruk atau kerugian" }],
      },
    ],
  },
];

export interface PenandaWacanaSelamatItem {
  kategori: string;
  frasa: string;
  sebab: string;
}

export const PENANDA_WACANA_SELAMAT_UASA: PenandaWacanaSelamatItem[] = [
  {
    kategori: "Pendahuluan",
    frasa: "Pada masa kini",
    sebab: "Struktur ayat mudah, sentiasa betul tatabahasanya, dan boleh digunakan untuk hampir semua tajuk karangan.",
  },
  {
    kategori: "Isi",
    frasa: "Selain itu",
    sebab: "Tidak memerlukan kata hubung tambahan, mudah disambung dengan ayat isi yang baharu, dan jarang disalahgunakan murid.",
  },
  {
    kategori: "Huraian (Mengapa)",
    frasa: "Hal ini kerana",
    sebab: "Struktur ringkas (subjek + kerana + sebab) mengurangkan risiko kesalahan tatabahasa berbanding versi yang lebih panjang.",
  },
  {
    kategori: "Huraian (Bagaimana)",
    frasa: "Antara caranya",
    sebab: "Boleh terus disambung dengan cadangan atau langkah tanpa memerlukan kata hubung tambahan.",
  },
  {
    kategori: "Contoh",
    frasa: "Sebagai contoh",
    sebab: "Diterima dalam semua jenis karangan dan tidak memerlukan struktur ayat khusus selepasnya.",
  },
  {
    kategori: "Kesan",
    frasa: "Oleh itu",
    sebab: "Paling ringkas dan serasi dengan hampir semua jenis ayat kesan atau akibat.",
  },
  {
    kategori: "Ungkapan",
    frasa: "Mencegah lebih baik daripada mengubati",
    sebab: "Frasa pendek, mudah diingat, dan tidak berisiko disalahertikan walaupun digunakan dalam konteks kesihatan.",
  },
  {
    kategori: "Penegas",
    frasa: "Sebenarnya",
    sebab: "Ayat mudah dibentuk dengan risiko kesalahan tatabahasa yang rendah berbanding 'tidak dapat dinafikan bahawa'.",
  },
  {
    kategori: "Kesimpulan",
    frasa: "Kesimpulannya",
    sebab: "Penanda penutup paling universal, diajar sejak sekolah rendah, dan peluang kesalahan sangat rendah.",
  },
];

export interface PenandaWacanaArasTinggiItem extends PenandaWacanaItem {
  amaran: string;
}

export const PENANDA_WACANA_ARAS_TINGGI: PenandaWacanaArasTinggiItem[] = [
  {
    frasa: "Tidak dapat dinafikan bahawa",
    kegunaan: "Menegaskan fakta yang jelas dan sukar dipertikaikan; sesuai untuk pendahuluan atau penegas isi penting.",
    contohAyat: "Tidak dapat dinafikan bahawa teknologi telah membawa banyak kemudahan kepada kehidupan manusia.",
    kosaKataSukar: [{ perkataan: "dinafikan", maksud: "disangkal atau ditolak kebenarannya" }],
    amaran: "Mesti diikuti dengan klausa 'bahawa' dan ayat penuh — jangan hentikan ayat sebaik sahaja frasa ini digunakan.",
  },
  {
    frasa: "Sehubungan dengan itu",
    kegunaan: "Menghubungkan isi dengan huraian atau kesan secara lebih formal; sesuai untuk karangan respons terbuka aras cemerlang.",
    contohAyat: "Sehubungan dengan itu, pihak berkuasa perlu menguatkuasakan undang-undang sedia ada dengan lebih tegas.",
    kosaKataSukar: [{ perkataan: "sehubungan", maksud: "berkaitan atau berkenaan" }],
    amaran: "Gunakan hanya apabila ayat sebelumnya benar-benar berkaitan rapat — jangan jadikan kata hubung generik untuk semua peralihan.",
  },
  {
    frasa: "Justeru itu",
    kegunaan: "Variasi 'oleh itu' yang membawa nada lebih formal dan tegas; sesuai untuk peralihan isi penting atau penutup.",
    contohAyat: "Justeru itu, semua pihak wajib memainkan peranan masing-masing tanpa berbelah bahagi.",
    kosaKataSukar: [{ perkataan: "berbelah bahagi", maksud: "berpecah pendapat atau tidak bersatu hati" }],
    amaran: "Elak menggunakan 'justeru' dan 'itu' berasingan dalam ayat yang sama — 'justeru itu' ditulis sebagai satu unit penanda.",
  },
  {
    frasa: "Bukan itu sahaja, malah",
    kegunaan: "Gabungan dua penanda untuk menambah isi dengan penegasan kukuh bahawa masih ada hujah tambahan yang penting.",
    contohAyat: "Bukan itu sahaja, malah kerajaan turut memperkenalkan insentif cukai untuk syarikat yang mengamalkan teknologi hijau.",
    kosaKataSukar: [],
    amaran: "Gunakan secukupnya sahaja (1-2 kali sepanjang karangan) — pengulangan berlebihan menjadikan bahasa kelihatan janggal.",
  },
  {
    frasa: "Tuntasnya",
    kegunaan: "Ungkapan penutup aras tinggi yang jarang digunakan tetapi memberi impak bahasa yang tinggi kepada pemeriksa.",
    contohAyat: "Tuntasnya, kejayaan sesebuah negara bergantung pada kerjasama padu seluruh rakyatnya.",
    kosaKataSukar: [{ perkataan: "tuntas", maksud: "selesai sepenuhnya atau lengkap" }],
    amaran: "Gunakan hanya pada ayat pertama penutup, bukan di tengah-tengah perenggan isi.",
  },
  {
    frasa: "Natijahnya",
    kegunaan: "Ungkapan formal bagi 'hasilnya' atau 'akibatnya'; memberi kesan bahasa tinggi jika digunakan dengan tepat.",
    contohAyat: "Natijahnya, masyarakat yang lebih celik digital dapat dibentuk dalam tempoh masa yang singkat.",
    kosaKataSukar: [{ perkataan: "natijah", maksud: "hasil atau akibat (perkataan formal)" }],
    amaran: "Pastikan ayat selepasnya benar-benar menyatakan hasil/kesan, bukan sekadar isi baharu yang tidak berkaitan.",
  },
];
