import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content", "form3", "sejarah");
const dataRoot = path.join(root, "src", "data");

const chapters = [
  {
    num: 1,
    title: "Kedatangan Kuasa Barat",
    summary:
      "Bab ini menerangkan kestabilan dan kemakmuran negara kita sebelum kedatangan kuasa Barat, faktor kedatangan kuasa Barat, persaingan mendapatkan tanah jajahan dan strategi kuasa Barat menguasai negara kita.",
    subtopics: [
      {
        no: "1.1",
        title: "Kestabilan dan Kemakmuran Negara Kita",
        facts: [
          "Negara kita mempunyai sistem pemerintahan beraja dan pentadbiran mantap sebelum kedatangan Barat.",
          "Pentadbiran negeri diketuai raja atau sultan, dibantu pembesar jajahan atau daerah dan penghulu atau penggawa pada peringkat kampung.",
          "Perundangan terdiri daripada undang-undang tidak bertulis seperti adat dan undang-undang bertulis seperti Hukum Kanun Melaka, Hukum Kanun Pahang dan Undang-Undang 99 Perak.",
          "Kemakmuran disokong hasil bumi, hasil alam, perdagangan, pelabuhan, sistem mata wang, percukaian, timbang sukat dan kegiatan intelektual.",
        ],
        keywords: ["kestabilan", "kemakmuran", "sistem beraja", "perundangan", "hubungan luar", "ekonomi tradisional"],
        tokoh: ["Raja atau Sultan", "Pembesar", "Penghulu", "Penggawa", "Ibu Soko"],
        dates: ["1759: Batu Uban dibuka oleh orang Melayu dari Sumatera"],
        places: ["Negeri-negeri Melayu", "Sarawak", "Sabah", "Pelabuhan Johor", "Kedah", "Klang", "Melaka", "Batu Uban"],
        treaties: [],
        laws: ["Adat Perpatih", "Hukum Kanun Melaka", "Hukum Kanun Pahang", "Undang-Undang 99 Perak"],
        causes: ["Kebijaksanaan pemerintah", "Muafakat pemerintah dan rakyat", "Kedudukan pelabuhan strategik", "Kekayaan hasil bumi dan hasil alam"],
        effects: ["Pentadbiran stabil", "Hubungan luar berkembang", "Ekonomi makmur", "Bahasa Melayu dan tulisan Jawi berkembang"],
        importance: ["Membuktikan negara kita sudah mempunyai tamadun, pentadbiran dan ekonomi tersusun sebelum campur tangan Barat."],
        links: ["Kestabilan politik memudahkan kemakmuran ekonomi; kemakmuran pula menarik minat kuasa Barat."],
        map: "Peta pelabuhan dan muara sungai menunjukkan perdagangan berkembang kerana lokasi strategik di laluan timur dan barat.",
        timeline: ["Sebelum abad ke-16: sistem beraja, adat, pelabuhan dan pendidikan tempatan sudah berkembang."],
      },
      {
        no: "1.2",
        title: "Faktor Kedatangan Kuasa Barat ke Negara Kita",
        facts: [
          "Pada tahun 1600, Syarikat Hindia Timur Inggeris ditubuhkan di England.",
          "Pada tahun 1602, Syarikat Hindia Timur Belanda ditubuhkan.",
          "Pada tahun 1664, Perancis menubuhkan Syarikat Hindia Timur Perancis.",
          "Kedatangan Barat dipengaruhi keperluan barangan mewah, pusat pengumpulan barang, pelabuhan persinggahan, penyebaran agama Kristian, Revolusi Perindustrian, perkembangan industri kereta, kesuburan tanah, industri mengetin, Terusan Suez, kapal wap, persaingan kuasa Barat dan telegraf.",
        ],
        keywords: ["rempah-ratus", "SHTI", "VOC", "Revolusi Perindustrian", "Terusan Suez", "kapal wap", "telegraf"],
        tokoh: ["Ferdinand de Lesseps"],
        dates: ["1600: SHTI ditubuhkan", "1602: Syarikat Hindia Timur Belanda ditubuhkan", "1664: Syarikat Hindia Timur Perancis ditubuhkan", "1859: Terusan Suez mula dibangunkan", "1870-an: Jerman dan Perancis menjadi negara perindustrian"],
        places: ["Kepulauan Melayu", "China", "India", "Canton", "Pelabuhan Said", "Suez", "Tanjung Harapan"],
        treaties: [],
        laws: [],
        causes: ["Permintaan rempah, emas, perak, sutera dan tembikar", "Keperluan bahan mentah dan pasaran", "Perkembangan pengangkutan dan komunikasi", "Persaingan mendapatkan tanah jajahan"],
        effects: ["Alam Melayu menjadi sasaran kuasa Barat", "Perdagangan bertambah", "Tanah jajahan dicari untuk bahan mentah dan pasaran"],
        importance: ["Menjelaskan sebab kuasa Barat sanggup datang jauh dan bersaing untuk menguasai Alam Melayu."],
        links: ["Revolusi Perindustrian meningkatkan keperluan bahan mentah; kemajuan kapal wap dan Terusan Suez mempercepat penguasaan Barat."],
        map: "Peta laluan Portugis, Sepanyol, Belanda dan Inggeris menunjukkan Alam Melayu terletak di laluan perdagangan antarabangsa.",
        timeline: ["Abad ke-16: Portugis dan Sepanyol", "Abad ke-17 hingga ke-18: Belanda, British dan Perancis", "Abad ke-19 hingga ke-20: bahan mentah dan pasaran industri menjadi tumpuan"],
      },
      {
        no: "1.3",
        title: "Persaingan Kuasa Barat untuk Mendapatkan Tanah Jajahan",
        facts: [
          "Kuasa Barat bersaing untuk mendapatkan tanah jajahan bagi bahan mentah, pasaran dan kedudukan strategik.",
          "British, Belanda, Perancis, Sepanyol, Jerman dan Amerika Syarikat terlibat dalam persaingan imperialisme.",
          "Kawasan di Alam Melayu penting kerana kedudukan strategik dan kekayaan hasil bumi.",
          "Kuasa Barat menganggap keluasan tanah jajahan melambangkan kekuatan dan sanjungan.",
        ],
        keywords: ["imperialisme", "tanah jajahan", "persaingan kuasa Barat", "bahan mentah", "pasaran"],
        tokoh: ["Sultan Brunei", "Sultan Sulu"],
        dates: ["1843: serangan penduduk tempatan ke atas kapal British di Sabah"],
        places: ["Alam Melayu", "Sabah", "Sarawak", "Kepulauan Melayu", "Filipina"],
        treaties: [],
        laws: [],
        causes: ["Keperluan bahan mentah", "Kepentingan laluan perdagangan", "Persaingan kuasa imperialis", "Prestij tanah jajahan"],
        effects: ["Peluasan kuasa Barat semakin agresif", "Negeri tempatan berhadapan ancaman kedaulatan", "Kuasa Barat mula menggunakan pelbagai strategi"],
        importance: ["Murid perlu memahami persaingan kuasa Barat sebagai faktor luaran yang menggugat kedaulatan negara."],
        links: ["Persaingan Barat membawa kepada strategi penguasaan seperti perjanjian, manipulasi dan ugutan."],
        map: "Kedudukan Alam Melayu di antara India dan China menjadikannya rebutan kuasa Barat.",
        timeline: ["Abad ke-19: persaingan imperialisme semakin ketara selepas perkembangan industri Barat."],
      },
      {
        no: "1.4",
        title: "Perbezaan Strategi Kuasa Barat untuk Menguasai Negara Kita",
        facts: [
          "Kuasa Barat menggunakan strategi perjanjian, pakatan, manipulasi, ugutan, serangan fizikal dan pajakan.",
          "British menggunakan perjanjian untuk mendapatkan Pulau Pinang, Singapura dan Melaka.",
          "Belanda dan British memeterai Perjanjian London 1824 untuk menyelesaikan pertikaian di Alam Melayu.",
          "Strategi pajakan dan perjanjian turut digunakan di Sabah dan Sarawak.",
        ],
        keywords: ["perjanjian", "pakatan", "manipulasi", "ugutan", "serangan fizikal", "pajakan"],
        tokoh: ["Francis Light", "Stamford Raffles", "John Crawfurd", "James Brooke"],
        dates: ["1786: British menduduki Pulau Pinang", "1819: perjanjian awal Singapura", "1824: Perjanjian London", "1824: Perjanjian British di Singapura"],
        places: ["Pulau Pinang", "Singapura", "Melaka", "Naning", "Sarawak", "Sabah"],
        treaties: ["Perjanjian London 1824", "Perjanjian 6 Februari 1819", "Perjanjian 2 Ogos 1824"],
        laws: [],
        causes: ["British mahukan petempatan strategik", "Belanda mahu melindungi kepentingan di Alam Melayu", "Pemerintah tempatan menghadapi tekanan politik dan keselamatan"],
        effects: ["Kedaulatan tempatan terjejas", "British menguasai petempatan strategik", "Naning dianggap sebahagian Melaka oleh British selepas Perjanjian London"],
        importance: ["Menunjukkan perlunya berwaspada terhadap anasir luar dan strategi kuasa asing."],
        links: ["Strategi penguasaan Barat menjadi asas kepada pembentukan Negeri-negeri Selat dan campur tangan seterusnya."],
        map: "Peta Naning dan Melaka menerangkan bagaimana Perjanjian London digunakan British untuk menuntut Naning sebagai sebahagian Melaka.",
        timeline: ["1786 Pulau Pinang", "1819 Singapura", "1824 Perjanjian London dan pengukuhan British di Singapura"],
      },
    ],
  },
  {
    num: 2,
    title: "Pentadbiran Negeri-negeri Selat",
    summary:
      "Bab ini menjelaskan peluasan kuasa British di Pulau Pinang, Singapura dan Melaka, Perjanjian London 1824, pembentukan Negeri-negeri Selat dan sistem pentadbirannya.",
    subtopics: [
      {
        no: "2.1",
        title: "Peluasan Kuasa British di Pulau Pinang, Singapura dan Melaka",
        facts: [
          "Pulau Pinang merupakan wilayah Kesultanan Kedah dan menjadi pelabuhan perdagangan serantau.",
          "Batu Uban dibuka pada tahun 1759 oleh orang Melayu dari Sumatera.",
          "Sultan Kedah menawarkan Pulau Pinang kepada SHTI untuk mendapatkan bantuan ketenteraan menghadapi ancaman Siam dan Burma.",
          "Singapura penting kerana kedudukan strategik di selatan Selat Melaka.",
          "British memperoleh Melaka melalui pertukaran wilayah dalam Perjanjian London 1824.",
        ],
        keywords: ["Pulau Pinang", "Singapura", "Melaka", "SHTI", "Batu Uban", "petempatan strategik"],
        tokoh: ["Sultan Muhammad Jiwa", "Sultan Abdullah", "Francis Light", "Stamford Raffles", "Sultan Hussein", "Temenggung Abdul Rahman", "John Crawfurd"],
        dates: ["1759: Batu Uban dibuka", "1786: Francis Light menduduki Pulau Pinang", "1791: perjanjian mengiktiraf pendudukan British di Pulau Pinang", "6 Februari 1819: perjanjian awal Singapura", "2 Ogos 1824: perjanjian mengukuhkan kuasa British di Singapura"],
        places: ["Pulau Pinang", "Batu Uban", "Muka Head", "Singapura", "Melaka", "Riau-Lingga"],
        treaties: ["Perjanjian 1791", "Perjanjian 6 Februari 1819", "Perjanjian 2 Ogos 1824"],
        laws: [],
        causes: ["British memerlukan pelabuhan persinggahan", "Kedah memerlukan bantuan ketenteraan", "Singapura strategik untuk perdagangan", "Melaka diperoleh melalui pertukaran wilayah"],
        effects: ["British bertapak di Selat Melaka", "Sultan dan pembesar kehilangan kuasa ke atas wilayah tertentu", "Pulau Pinang, Singapura dan Melaka menjadi asas Negeri-negeri Selat"],
        importance: ["Menerangkan proses awal peluasan British melalui perjanjian dan strategi diplomatik."],
        links: ["Penguasaan tiga petempatan menjadi asas pembentukan Negeri-negeri Selat."],
        map: "Peta Batu Uban, Pulau Pinang dan kedudukan Singapura menjelaskan kepentingan pelabuhan di laluan perdagangan.",
        timeline: ["1759 Batu Uban", "1786 Pulau Pinang", "1819 Singapura", "1824 Singapura dan Melaka"],
      },
      {
        no: "2.2",
        title: "Perjanjian London 1824 dan Kesannya Terhadap Alam Melayu",
        facts: [
          "Perjanjian London 1824 ditandatangani oleh British dan Belanda pada 17 Mac 1824 di London.",
          "Perjanjian ini dibuat tanpa merujuk Raja-raja Melayu.",
          "Perjanjian membahagikan wilayah pengaruh British dan Belanda di Alam Melayu.",
          "British memperoleh Melaka manakala Belanda memperoleh Bangkahulu.",
          "Perjanjian ini menyebabkan perpecahan Alam Melayu kepada dua lingkungan pengaruh.",
        ],
        keywords: ["Perjanjian London 1824", "British", "Belanda", "wilayah pengaruh", "Alam Melayu"],
        tokoh: ["Sultan Hussein Muhammad Shah", "Sultan Abdul Rahman", "Sultan Mahmud Muzaffar Shah IV"],
        dates: ["17 Mac 1824: Perjanjian London ditandatangani"],
        places: ["London", "Melaka", "Bangkahulu", "Singapura", "Riau-Lingga", "Naning"],
        treaties: ["Perjanjian London 1824", "Perjanjian Inggeris-Belanda 1824"],
        laws: [],
        causes: ["British dan Belanda mahu menamatkan pertikaian dan menjaga kepentingan masing-masing", "Persaingan perdagangan di Alam Melayu"],
        effects: ["Melaka menjadi milik British", "Alam Melayu terbahagi kepada pengaruh British dan Belanda", "Naning dianggap British sebagai sebahagian Melaka", "Kedaulatan Raja-raja Melayu diketepikan"],
        importance: ["Perjanjian ini ialah titik penting perubahan geopolitik Alam Melayu."],
        links: ["Perjanjian London mengukuhkan laluan pembentukan Negeri-negeri Selat."],
        map: "Peta kesan Perjanjian London menunjukkan pemisahan kawasan pengaruh British dan Belanda.",
        timeline: ["1824: Perjanjian London", "Selepas 1824: Melaka dikuasai British dan Naning menerima tekanan British"],
      },
      {
        no: "2.3",
        title: "Pembentukan Negeri-negeri Selat",
        facts: [
          "Negeri-negeri Selat terdiri daripada Pulau Pinang, Singapura dan Melaka.",
          "Pembentukan Negeri-negeri Selat membolehkan British menyeragamkan pentadbiran di petempatan Selat Melaka.",
          "Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British.",
          "Pentadbiran berpusat membantu British mengawal perdagangan dan keselamatan.",
        ],
        keywords: ["Negeri-negeri Selat", "Tanah Jajahan Mahkota", "Gabenor", "Residen Konsular"],
        tokoh: ["Gabenor Negeri-negeri Selat", "Residen Konsular"],
        dates: ["1826: Negeri-negeri Selat dibentuk", "1867: Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British"],
        places: ["Pulau Pinang", "Singapura", "Melaka", "Selat Melaka"],
        treaties: [],
        laws: ["Undang-undang British di Negeri-negeri Selat"],
        causes: ["Keperluan pentadbiran seragam", "Kepentingan perdagangan dan keselamatan", "Penguasaan British di tiga petempatan strategik"],
        effects: ["Pengaruh British semakin kukuh", "Undang-undang British dilaksanakan", "Pentadbiran tempatan berubah mengikut model British"],
        importance: ["Menjadi tapak kuasa British untuk meluaskan pengaruh ke negeri Melayu lain."],
        links: ["Pembentukan Negeri-negeri Selat berkait langsung dengan Perjanjian London dan penguasaan Pulau Pinang, Singapura serta Melaka."],
        map: "Peta Negeri-negeri Selat menunjukkan tiga petempatan strategik yang mengawal laluan Selat Melaka.",
        timeline: ["1826 pembentukan", "1867 Tanah Jajahan Mahkota"],
      },
      {
        no: "2.4",
        title: "Pentadbiran Negeri-negeri Selat",
        facts: [
          "Undang-undang British dikuatkuasakan di Negeri-negeri Selat.",
          "Gabenor mengetuai pentadbiran Negeri-negeri Selat.",
          "Residen Konsular dilantik untuk membantu pentadbiran di setiap negeri.",
          "Pentadbiran Negeri-negeri Selat membolehkan British mengawal perdagangan, pelabuhan dan keselamatan.",
        ],
        keywords: ["Gabenor", "Residen Konsular", "undang-undang British", "pentadbiran berpusat"],
        tokoh: ["Gabenor Negeri-negeri Selat", "Residen Konsular"],
        dates: ["1867: pentadbiran Negeri-negeri Selat di bawah Pejabat Tanah Jajahan di London"],
        places: ["Singapura", "Pulau Pinang", "Melaka", "London"],
        treaties: [],
        laws: ["Undang-undang British"],
        causes: ["British mahu pentadbiran lebih cekap", "Kepentingan perdagangan bertambah", "Singapura berkembang sebagai pusat perdagangan"],
        effects: ["Kawalan British semakin langsung", "Singapura menjadi pusat pentadbiran utama", "Kedaulatan tempatan terhakis"],
        importance: ["Memperlihatkan perubahan daripada petempatan perdagangan kepada pentadbiran kolonial rasmi."],
        links: ["Pentadbiran Negeri-negeri Selat menjadi model kepada peluasan pentadbiran British di negeri Melayu."],
        map: "Rajah pentadbiran menunjukkan Gabenor di puncak dan Residen Konsular di setiap petempatan.",
        timeline: ["1826 pentadbiran gabungan", "1867 pentadbiran Mahkota British"],
      },
    ],
  },
  {
    num: 3,
    title: "Pentadbiran Negeri-negeri Melayu Bersekutu",
    summary:
      "Bab ini membincangkan kekayaan hasil bumi Perak, Selangor, Negeri Sembilan dan Pahang, peluasan kuasa British, pembentukan NNMB dan pentadbirannya.",
    subtopics: [
      {
        no: "3.1",
        title: "Kekayaan Hasil Bumi di Perak, Selangor, Negeri Sembilan dan Pahang",
        facts: [
          "Perak, Selangor, Negeri Sembilan dan Pahang kaya dengan bijih timah, emas dan hasil bumi.",
          "Kekayaan hasil bumi menarik minat British untuk campur tangan.",
          "Pembesar dan sultan memperoleh pendapatan daripada hasil perlombongan dan cukai.",
          "Perkembangan perlombongan menyebabkan kemasukan modal dan buruh luar.",
        ],
        keywords: ["bijih timah", "emas", "hasil bumi", "perlombongan", "cukai"],
        tokoh: ["Sultan Muzaffar Shah", "Sultan Abdul Samad", "Sultan Ahmad", "Ngah Ibrahim"],
        dates: ["1857-1898: pemerintahan Sultan Abdul Samad di Selangor", "1885: Sultan Ahmad di Pahang dirakam dalam sumber textbook"],
        places: ["Larut", "Kinta", "Kuala Lumpur", "Lukut", "Sungai Ujong", "Pahang"],
        treaties: [],
        laws: [],
        causes: ["Permintaan bijih timah meningkat", "Kekayaan lombong", "Kepentingan cukai dan perdagangan"],
        effects: ["British memberi perhatian kepada negeri Melayu", "Persaingan pembesar dan pelombong meningkat", "Campur tangan British menjadi lebih mudah"],
        importance: ["Kekayaan hasil bumi ialah punca utama British mahu menguasai negeri-negeri Melayu."],
        links: ["Kekayaan ekonomi membawa kepada perebutan kuasa dan alasan campur tangan British."],
        map: "Peta kawasan lombong menunjukkan tumpuan ekonomi di Perak, Selangor, Negeri Sembilan dan Pahang.",
        timeline: ["Abad ke-19: permintaan bijih timah dan hasil bumi meningkat"],
      },
      {
        no: "3.2",
        title: "Peluasan Kuasa British di Perak, Selangor, Negeri Sembilan dan Pahang",
        facts: [
          "British menggunakan alasan kekacauan untuk campur tangan.",
          "Perjanjian Pangkor 1874 menandakan penguasaan British secara langsung di Perak.",
          "Raja Abdullah diiktiraf sebagai Sultan Perak dan Sultan menerima Residen British.",
          "Perjanjian British-Selangor 1875, British-Sungai Ujong, British-Pahang 1887 dan British-Negeri Sembilan 1895 mengukuhkan Sistem Residen.",
        ],
        keywords: ["Sistem Residen", "Perjanjian Pangkor", "campur tangan", "Residen British"],
        tokoh: ["Andrew Clarke", "Raja Abdullah", "Raja Ismail", "Ngah Ibrahim", "Dato' Sagor", "J.W.W. Birch", "J.G. Davidson", "Martin Lister", "J.P. Rodger"],
        dates: ["1874: Perjanjian Pangkor", "1875: Perjanjian British-Selangor", "1887: Perjanjian British-Pahang", "1895: Perjanjian British-Negeri Sembilan"],
        places: ["Pulau Pangkor", "Perak", "Selangor", "Sungai Ujong", "Pahang", "HMS Pluto"],
        treaties: ["Perjanjian Pangkor 1874", "Perjanjian British-Sungai Ujong", "Perjanjian British-Selangor 1875", "Perjanjian British-Pahang 1887", "Perjanjian British-Negeri Sembilan 1895"],
        laws: [],
        causes: ["Pergaduhan kongsi gelap", "Perebutan takhta", "Kepentingan bijih timah", "British mahu mengawal cukai"],
        effects: ["Residen British ditempatkan", "Sultan dan pembesar kehilangan kuasa pentadbiran", "British menguasai pungutan cukai"],
        importance: ["Menunjukkan bagaimana perjanjian digunakan untuk menghakis kedaulatan negeri Melayu."],
        links: ["Sistem Residen menjadi asas pembentukan NNMB."],
        map: "Peta Pulau Pangkor menunjukkan lokasi perjanjian penting antara British dengan pembesar Perak.",
        timeline: ["1874 Perak", "1875 Selangor", "1887 Pahang", "1895 Negeri Sembilan"],
      },
      {
        no: "3.3",
        title: "Pembentukan Negeri-negeri Melayu Bersekutu",
        facts: [
          "Negeri-negeri Melayu Bersekutu terdiri daripada Perak, Selangor, Negeri Sembilan dan Pahang.",
          "Perjanjian Persekutuan 1895 membawa kepada pembentukan NNMB.",
          "Residen Jeneral menjadi ketua pentadbiran kerajaan persekutuan.",
          "Pembentukan NNMB bertujuan menyeragamkan pentadbiran dan mengatasi kelemahan Sistem Residen.",
        ],
        keywords: ["NNMB", "Perjanjian Persekutuan 1895", "Residen Jeneral", "pemusatan kuasa"],
        tokoh: ["Frank Swettenham", "Raja-raja Melayu", "Residen Jeneral"],
        dates: ["1895: Perjanjian Persekutuan", "1896: NNMB dilaksanakan"],
        places: ["Perak", "Selangor", "Negeri Sembilan", "Pahang", "Kuala Lumpur"],
        treaties: ["Perjanjian Persekutuan 1895"],
        laws: [],
        causes: ["Sistem Residen tidak seragam", "British mahu kawalan kewangan dan pentadbiran lebih berpusat", "Keperluan menyelaraskan pembangunan"],
        effects: ["Kuasa Residen Jeneral meningkat", "Raja-raja Melayu kehilangan lebih banyak kuasa", "Pentadbiran menjadi lebih berpusat"],
        importance: ["Pembentukan NNMB mempercepat pemusatan kuasa British."],
        links: ["Campur tangan melalui Residen membawa kepada persekutuan yang lebih terkawal oleh British."],
        map: "Peta NNMB menunjukkan gabungan empat negeri kaya hasil bumi.",
        timeline: ["1895 perjanjian", "1896 pelaksanaan NNMB"],
      },
      {
        no: "3.4",
        title: "Pentadbiran Negeri-negeri Melayu Bersekutu",
        facts: [
          "Pentadbiran NNMB melibatkan Residen Jeneral, Residen negeri, Majlis Mesyuarat Negeri, Durbar dan Majlis Mesyuarat Persekutuan.",
          "Durbar pertama diadakan di Kuala Kangsar.",
          "Pada tahun 1909, Majlis Mesyuarat Persekutuan ditubuhkan.",
          "Majlis Mesyuarat Persekutuan memberikan ruang kepada British mengawal undang-undang dan kewangan negeri.",
        ],
        keywords: ["Residen Jeneral", "Durbar", "Majlis Mesyuarat Negeri", "Majlis Mesyuarat Persekutuan"],
        tokoh: ["Pesuruhjaya Tinggi British", "Raja-raja Melayu", "Residen Jeneral", "Residen British"],
        dates: ["1897: Durbar pertama di Kuala Kangsar", "1909: Majlis Mesyuarat Persekutuan ditubuhkan"],
        places: ["Kuala Kangsar", "Kuala Lumpur", "Pekan", "Klang", "Seri Menanti"],
        treaties: [],
        laws: ["Undang-undang yang diluluskan Majlis Mesyuarat Persekutuan"],
        causes: ["British mahu sokongan Raja-raja Melayu", "Pemusatan pentadbiran memerlukan badan perundangan", "Keperluan mengawal kewangan"],
        effects: ["Kewibawaan Raja-raja Melayu terjejas", "British mengawal undang-undang dan kewangan", "Durbar menjadi ruang pertemuan Raja-raja Melayu"],
        importance: ["Menunjukkan perkembangan institusi pentadbiran kolonial dan reaksi Raja-raja Melayu."],
        links: ["Durbar menjadi asas perbincangan Raja-raja Melayu dalam menghadapi pemusatan kuasa British."],
        map: "Rajah keahlian Majlis Mesyuarat Persekutuan menunjukkan dominasi pegawai British dalam pentadbiran NNMB.",
        timeline: ["1897 Durbar pertama", "1909 Majlis Mesyuarat Persekutuan"],
      },
    ],
  },
  {
    num: 4,
    title: "Pentadbiran Negeri-negeri Melayu Tidak Bersekutu",
    summary:
      "Bab ini menjelaskan pemerintahan Kesultanan Melayu di Perlis, Kedah, Kelantan, Terengganu dan Johor, peluasan kuasa British melalui Perjanjian Bangkok 1909 serta sistem pentadbiran NNMTB.",
    subtopics: [
      {
        no: "4.1",
        title: "Pemerintahan Kesultanan Melayu di Perlis, Kedah, Kelantan, Terengganu dan Johor",
        facts: [
          "Perlis, Kedah, Kelantan, Terengganu dan Johor mempunyai sistem pemerintahan beraja.",
          "Sultan atau Raja berada di puncak kuasa dan dibantu pembesar.",
          "Johor melakukan pemodenan pentadbiran lebih awal melalui kerjasama sultan dan pembesar.",
          "Terengganu dan Johor menggubal undang-undang tubuh untuk mempertahankan kedaulatan.",
        ],
        keywords: ["NNMTB", "sistem beraja", "Sultan", "Raja", "pembesar"],
        tokoh: ["Sultan Mudzaffar Shah", "Sultan Muhammad I", "Sultan Muhammad II", "Sultan Omar", "Sultan Abu Bakar"],
        dates: ["1839-1876: pemerintahan Sultan Omar Terengganu"],
        places: ["Perlis", "Kedah", "Kelantan", "Terengganu", "Johor"],
        treaties: [],
        laws: ["Undang-Undang Tubuh Kerajaan Johor", "Undang-Undang Bagi Diri Kerajaan Terengganu"],
        causes: ["Tradisi Kesultanan Melayu", "Keperluan pentadbiran negeri", "Ancaman peluasan kuasa asing"],
        effects: ["Sultan kekal sebagai pusat pentadbiran", "Pembesar membantu kerajaan", "Pemodenan pentadbiran berlaku di Johor"],
        importance: ["Menunjukkan negeri Melayu mempunyai sistem pemerintahan tersendiri sebelum penasihat British ditempatkan."],
        links: ["Kekuatan sistem beraja menjadi asas reaksi pemerintah terhadap Perjanjian Bangkok 1909."],
        map: "Peta NNMTB memperlihatkan kedudukan negeri utara dan Johor yang tidak menyertai NNMB.",
        timeline: ["Sebelum 1909: negeri-negeri ini masih mengekalkan pentadbiran sendiri"],
      },
      {
        no: "4.2",
        title: "Peluasan Kuasa British di Perlis, Kedah, Kelantan dan Terengganu",
        facts: [
          "British dan Siam menggunakan beberapa perjanjian untuk menentukan pengaruh di negeri Melayu utara.",
          "Perjanjian Sulit 1897, Perjanjian Sempadan 1899 dan Perjanjian 1902 membuka jalan kepada Perjanjian Bangkok 1909.",
          "Perjanjian Bangkok 1909 ditandatangani oleh British dan Siam pada 10 Mac 1909.",
          "Perjanjian Bangkok membolehkan British menguasai Perlis, Kedah, Kelantan dan Terengganu tanpa gangguan Siam.",
        ],
        keywords: ["Perjanjian Bangkok 1909", "Siam", "Penasihat British", "negeri Melayu utara"],
        tokoh: ["Sultan Abdul Hamid Halim Shah", "Sultan Muhammad IV", "Sultan Zainal Abidin III"],
        dates: ["1897: Perjanjian Sulit British-Siam", "1899: Perjanjian Sempadan British-Siam", "1902: Pengisytiharan British-Siam", "10 Mac 1909: Perjanjian Bangkok"],
        places: ["Perlis", "Kedah", "Kelantan", "Terengganu", "Bangkok"],
        treaties: ["Perjanjian Sulit 1897", "Perjanjian Sempadan 1899", "Perjanjian 1902", "Perjanjian Bangkok 1909"],
        laws: [],
        causes: ["British mahu menghalang pengaruh kuasa lain", "Siam mahu menjaga kepentingan wilayah", "British mahu meluaskan kuasa ke negeri Melayu utara"],
        effects: ["British menempatkan Penasihat British", "Negeri Melayu utara berada di bawah pengaruh British", "Hubungan tradisional dengan Siam berubah"],
        importance: ["Perjanjian Bangkok ialah titik penting peluasan British di NNMTB."],
        links: ["Perjanjian Bangkok mengubah status negeri Melayu utara dan mempengaruhi reaksi sultan dalam Bab 8."],
        map: "Peta Perjanjian Bangkok menunjukkan negeri yang berpindah daripada pengaruh Siam kepada British.",
        timeline: ["1897", "1899", "1902", "1909"],
      },
      {
        no: "4.3",
        title: "Peluasan Kuasa British di Johor",
        facts: [
          "Johor mengekalkan kedaulatan lebih lama melalui hubungan diplomatik dan pemodenan pentadbiran.",
          "Perjanjian 1855 antara Sultan Ali dengan Temenggung Ibrahim mengukuhkan kedudukan Temenggung di Johor.",
          "Perjanjian Setia 1885 antara Johor dengan British mengiktiraf hubungan Johor-British.",
          "Pada tahun 1914, Johor menerima Penasihat Am British.",
        ],
        keywords: ["Johor", "Temenggung Ibrahim", "Sultan Abu Bakar", "Perjanjian Setia 1885", "Penasihat Am"],
        tokoh: ["Sultan Ali", "Temenggung Ibrahim", "Sultan Abu Bakar", "Sultan Ibrahim"],
        dates: ["1855: Perjanjian Sultan Ali-Temenggung Ibrahim", "1885: Perjanjian Setia Johor-British", "1914: Johor menerima Penasihat Am British"],
        places: ["Johor", "Muar", "Singapura"],
        treaties: ["Perjanjian 1855", "Perjanjian Setia 1885", "Perjanjian Johor-British 1914"],
        laws: ["Undang-Undang Tubuh Kerajaan Johor 1895"],
        causes: ["Johor mahu mengekalkan kedaulatan", "British mahu meluaskan pengaruh", "Kedudukan Johor strategik berhampiran Singapura"],
        effects: ["Johor mengekalkan pentadbiran sendiri lebih lama", "Akhirnya Penasihat Am British ditempatkan", "Kawalan British meningkat"],
        importance: ["Johor menjadi contoh kebijaksanaan pemerintah menangguhkan campur tangan British."],
        links: ["Pemodenan Johor berkait dengan usaha pembesar dan raja dalam Bab 8."],
        map: "Peta Johor-Singapura menerangkan kepentingan strategik Johor kepada British.",
        timeline: ["1855", "1885", "1895", "1914"],
      },
      {
        no: "4.4",
        title: "Sistem Pentadbiran Negeri-negeri Melayu Tidak Bersekutu",
        facts: [
          "Perjanjian Bangkok 1909 membawa perubahan pentadbiran di Perlis, Kedah, Kelantan dan Terengganu.",
          "Penasihat British ditempatkan tetapi sultan masih kekal sebagai puncak kuasa terutama agama Islam dan adat Melayu.",
          "Majlis Mesyuarat Negeri membantu pentadbiran negeri.",
          "Undang-Undang Tubuh Kerajaan Johor dan Undang-Undang Bagi Diri Kerajaan Terengganu menegaskan larangan menyerahkan negeri kepada kuasa asing.",
        ],
        keywords: ["Penasihat British", "Majlis Mesyuarat Negeri", "sultan", "agama Islam", "adat Melayu"],
        tokoh: ["Sultan Johor", "Sultan Terengganu", "Penasihat British"],
        dates: ["1909: perubahan pentadbiran NNMTB", "1911: Undang-Undang Bagi Diri Kerajaan Terengganu"],
        places: ["Perlis", "Kedah", "Kelantan", "Terengganu", "Johor"],
        treaties: ["Perjanjian Bangkok 1909"],
        laws: ["Undang-Undang Tubuh Kerajaan Johor 1895", "Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],
        causes: ["Peluasan kuasa British", "Keperluan British mengawal pentadbiran", "Usaha pemerintah mempertahankan kedaulatan"],
        effects: ["British mengawal nasihat pentadbiran", "Sultan mengekalkan kuasa agama dan adat", "Pentadbiran negeri menjadi lebih tersusun tetapi terikat dengan British"],
        importance: ["Memahami perbezaan NNMTB dengan NNMB dari segi tahap pemusatan kuasa British."],
        links: ["Kedudukan sultan dalam NNMTB menjadi asas kebijaksanaan menentang cabaran Barat."],
        map: "Rajah pentadbiran menunjukkan sultan, Majlis Mesyuarat Negeri dan Penasihat British.",
        timeline: ["1909 Perjanjian Bangkok", "1911 Undang-undang Terengganu", "1914 Penasihat Am Johor"],
      },
    ],
  },
  {
    num: 5,
    title: "Pentadbiran Barat di Sarawak dan Sabah",
    summary:
      "Bab ini membincangkan pemerintahan tempatan Sarawak dan Sabah, peluasan kuasa Dinasti Brooke, peluasan kuasa SBUB dan bentuk pentadbiran Barat di kedua-dua negeri.",
    subtopics: [
      {
        no: "5.1",
        title: "Latar Belakang Pemerintahan Tempatan di Sarawak dan Sabah",
        facts: [
          "Sebelum kuasa luar, masyarakat Sarawak dan Sabah mempunyai sistem pemerintahan tempatan yang berkesan.",
          "Sarawak mempunyai kerajaan Melayu seperti Sawaku, Kalaka, Samadong dan Melano.",
          "Sistem pemerintahan termasuk sistem kesukuan, kesultanan dan ketua bebas.",
          "Sarawak dan Sabah mempunyai kira-kira 27 etnik dan 34 etnik menurut maklumat textbook.",
        ],
        keywords: ["Sarawak", "Sabah", "sistem kesukuan", "sistem kesultanan", "ketua bebas"],
        tokoh: ["Sultan Brunei", "Sultan Sulu", "Tuai Rumah", "Orang Tua", "Syarif Osman", "Datu Kurunding"],
        dates: ["Abad ke-14: Kesultanan Brunei berkembang", "Abad ke-15: Kesultanan Sulu berkembang"],
        places: ["Kuching", "Sibu", "Bintulu", "Kudat", "Sandakan", "Lahad Datu", "Tawau", "Kota Kinabalu"],
        treaties: [],
        laws: ["Hukum adat masyarakat tempatan"],
        causes: ["Kepelbagaian etnik", "Kedudukan sungai dan pesisir", "Pengaruh Brunei dan Sulu"],
        effects: ["Wujud sistem pentadbiran tempatan yang pelbagai", "Masyarakat hidup stabil dan mempunyai aturan sendiri"],
        importance: ["Membuktikan Sarawak dan Sabah mempunyai pemerintahan tersusun sebelum Barat."],
        links: ["Kelemahan kuasa Brunei dan Sulu kemudian membuka ruang kepada Brooke dan SBUB."],
        map: "Peta Sarawak dan Sabah menunjukkan kawasan pesisir, pedalaman dan pusat pentadbiran tempatan.",
        timeline: ["Sebelum abad ke-19: pemerintahan tempatan berasaskan adat, kesultanan dan ketua bebas"],
      },
      {
        no: "5.2",
        title: "Peluasan Kuasa Dinasti Brooke di Sarawak",
        facts: [
          "James Brooke menggunakan peluang pergolakan di Sarawak untuk mendapatkan kuasa.",
          "Sultan Brunei mengiktiraf James Brooke sebagai Raja Putih Sarawak.",
          "Perjanjian 1841 menyerahkan kawasan Sarawak kepada James Brooke.",
          "Dinasti Brooke meluaskan kuasa secara berperingkat dari Tanjung Datu hingga kawasan lain.",
        ],
        keywords: ["James Brooke", "Raja Putih", "Dinasti Brooke", "Sultan Brunei", "Tanjung Datu"],
        tokoh: ["James Brooke", "Pengiran Indera Mahkota", "Sultan Omar Ali Saifuddin II", "Sultan Abdul Mumin", "Charles Brooke"],
        dates: ["1841: Perjanjian Brooke dengan Brunei", "1842: James Brooke diiktiraf sebagai Raja Sarawak", "1890: peluasan kuasa Brooke"],
        places: ["Sarawak", "Kuching", "Tanjung Datu", "Sungai Samarahan", "Rajang", "Limbang"],
        treaties: ["Perjanjian 1841", "Perjanjian 1842"],
        laws: [],
        causes: ["Pergolakan di Sarawak", "Kelemahan pentadbiran Brunei", "Brooke menawarkan bantuan kepada Sultan Brunei"],
        effects: ["Brooke memerintah Sarawak", "Wilayah Sarawak diperluas", "Pentadbiran Barat diperkenalkan"],
        importance: ["Menunjukkan strategi Barat melalui bantuan, perjanjian dan pengiktirafan politik."],
        links: ["Peluasan Brooke membawa kepada penentangan masyarakat tempatan dalam Bab 7."],
        map: "Peta peluasan Sarawak menerangkan pertambahan wilayah Dinasti Brooke secara berperingkat.",
        timeline: ["1841 perjanjian", "1842 pengiktirafan", "1890 peluasan Limbang"],
      },
      {
        no: "5.3",
        title: "Peluasan Kuasa Syarikat Borneo Utara British di Sabah",
        facts: [
          "Sabah menarik minat kuasa Barat kerana kedudukannya dan kekayaan hasil hutan serta laut.",
          "Sultan Brunei menyerahkan Labuan kepada British.",
          "SBUB menerima piagam diraja dan memerintah Sabah atau Borneo Utara.",
          "SBUB perlu memelihara adat resam, agama dan undang-undang penduduk tempatan serta tidak menyerahkan Sabah kepada pihak lain tanpa kebenaran British.",
        ],
        keywords: ["SBUB", "Borneo Utara", "Labuan", "piagam diraja", "Sultan Brunei", "Sultan Sulu"],
        tokoh: ["Sultan Brunei", "Sultan Sulu", "Alfred Dent", "Baron von Overbeck"],
        dates: ["1846: Labuan diserahkan kepada British", "1881: SBUB menerima piagam diraja", "1888: Sabah menjadi negeri naungan British"],
        places: ["Sabah", "Borneo Utara", "Labuan", "Sandakan", "Kudat"],
        treaties: ["Perjanjian pajakan wilayah dengan Sultan Brunei dan Sultan Sulu", "Piagam Diraja SBUB"],
        laws: ["Syarat piagam SBUB berkaitan adat, agama dan larangan menyerahkan Sabah"],
        causes: ["Kedudukan strategik Sabah", "Kelemahan Brunei dan Sulu", "Minat pelabur Barat terhadap hasil ekonomi"],
        effects: ["SBUB mentadbir Sabah", "Gabenor dan pegawai British ditempatkan", "Pentadbiran syarikat mengubah pemerintahan tempatan"],
        importance: ["Menjelaskan bentuk imperialisme syarikat di Sabah."],
        links: ["Pentadbiran SBUB berkait dengan cukai dan penentangan Mat Salleh dalam Bab 7."],
        map: "Peta Sabah menunjukkan kawasan pantai timur, utara Borneo dan pusat pentadbiran SBUB.",
        timeline: ["1846 Labuan", "1881 piagam", "1888 negeri naungan"],
      },
      {
        no: "5.4",
        title: "Bentuk Pentadbiran Barat di Sarawak dan Sabah",
        facts: [
          "Brooke membahagikan Sarawak kepada bahagian dan daerah.",
          "SBUB membahagikan Sabah kepada residensi dan daerah.",
          "Pentadbiran Sabah diketuai Gabenor yang bertanggungjawab kepada lembaga pengarah syarikat.",
          "Ketua Anak Negeri dan ketua tempatan digunakan untuk melicinkan pentadbiran.",
          "Brooke memperkenalkan undang-undang lapan perkara.",
        ],
        keywords: ["Gabenor", "Residen", "Pegawai Daerah", "Ketua Anak Negeri", "undang-undang lapan perkara"],
        tokoh: ["James Brooke", "Charles Brooke", "Gabenor SBUB", "Residen", "Pegawai Daerah"],
        dates: ["Abad ke-19: pentadbiran Brooke dan SBUB diperkukuh"],
        places: ["Sarawak", "Sabah", "Kuching", "Sandakan"],
        treaties: [],
        laws: ["Undang-undang lapan perkara", "Undang-undang pentadbiran SBUB"],
        causes: ["Brooke dan SBUB mahu mengukuhkan kawalan", "Wilayah semakin luas", "Keperluan memungut cukai dan menjaga keselamatan"],
        effects: ["Pentadbiran Barat tersusun", "Kuasa tempatan dikawal", "Cukai dan peraturan baharu diperkenalkan"],
        importance: ["Menunjukkan perubahan struktur politik tempatan di Sarawak dan Sabah."],
        links: ["Perubahan pentadbiran menjadi antara punca penentangan masyarakat tempatan."],
        map: "Rajah pentadbiran Brooke dan SBUB menunjukkan hierarki Gabenor/Residen/Pegawai Daerah/Ketua tempatan.",
        timeline: ["Selepas peluasan kuasa: wilayah dibahagi kepada unit pentadbiran Barat"],
      },
    ],
  },
  {
    num: 6,
    title: "Kesan Pentadbiran Barat terhadap Ekonomi dan Sosial",
    summary:
      "Bab ini menerangkan pengenalan ekonomi moden oleh kuasa Barat, pentadbiran Barat berkaitan ekonomi serta kesan ekonomi dan sosial akibat perkembangan ekonomi kolonial.",
    subtopics: [
      {
        no: "6.1",
        title: "Pengenalan Ekonomi Moden oleh Kuasa Barat di Negara Kita",
        facts: [
          "Kuasa Barat memperkenalkan ekonomi moden berasaskan modal besar, teknologi dan eksport.",
          "Tanaman komersial seperti getah, tebu, tembakau dan padi berorientasikan eksport berkembang.",
          "Bijih timah, bijih besi, emas, petroleum dan arang batu menjadi hasil penting.",
          "SBUB melakukan pelaburan dalam tanaman getah di Sabah seperti Bongaya dan Sungai Labuk.",
        ],
        keywords: ["ekonomi moden", "modal", "eksport", "getah", "bijih timah", "petroleum"],
        tokoh: ["Pelabur Barat", "SBUB", "Pentadbir British"],
        dates: ["Abad ke-19: ekonomi moden berkembang", "Selepas 1840: permintaan bijih timah meningkat"],
        places: ["Negeri-negeri Melayu", "Sarawak", "Sabah", "Bongaya", "Sungai Labuk"],
        treaties: [],
        laws: [],
        causes: ["Permintaan bahan mentah dunia", "Revolusi Perindustrian", "Modal Barat", "Kesuburan tanah dan kekayaan hasil bumi"],
        effects: ["Pertanian komersial berkembang", "Perlombongan diperluas", "Buruh luar dibawa masuk", "Ekonomi tradisional berubah"],
        importance: ["Menerangkan asas perubahan ekonomi negara akibat pentadbiran Barat."],
        links: ["Ekonomi moden membawa kepada pembinaan infrastruktur dan perubahan sosial."],
        map: "Peta kawasan getah dan lombong menunjukkan tumpuan ekonomi eksport.",
        timeline: ["Abad ke-19 hingga awal abad ke-20: ekonomi eksport berkembang pesat"],
      },
      {
        no: "6.2",
        title: "Pentadbiran Barat Berkaitan dengan Ekonomi",
        facts: [
          "Pentadbiran Barat menggubal dasar tanah, buruh dan kewangan untuk menyokong ekonomi kolonial.",
          "Akta Tanah Simpanan Melayu diperkenalkan bagi melindungi tanah orang Melayu.",
          "Sistem cukai dan peraturan tanah mengubah hubungan masyarakat dengan tanah.",
          "Kemasukan buruh luar diurus untuk memenuhi keperluan lombong dan ladang.",
        ],
        keywords: ["tanah", "buruh", "cukai", "Akta Tanah Simpanan Melayu", "ekonomi kolonial"],
        tokoh: ["Pentadbir British", "Pemodal Eropah", "Buruh Cina", "Buruh India"],
        dates: ["1913: Akta Tanah Simpanan Melayu diperkenalkan"],
        places: ["Tanah Melayu", "Sarawak", "Sabah", "kawasan lombong", "ladang getah"],
        treaties: [],
        laws: ["Akta Tanah Simpanan Melayu", "peraturan tanah", "peraturan buruh"],
        causes: ["Keperluan mengawal tanah dan tenaga kerja", "Perkembangan lombong dan ladang", "Kepentingan hasil eksport"],
        effects: ["Tanah dikategorikan mengikut kepentingan ekonomi", "Buruh luar meningkat", "Masyarakat tempatan semakin terikat dengan sistem pentadbiran Barat"],
        importance: ["Menunjukkan ekonomi kolonial dikawal melalui undang-undang dan pentadbiran."],
        links: ["Dasar ekonomi Barat membawa kepada kesan sosial seperti kemunculan bandar dan masyarakat majmuk."],
        map: "Rajah dasar tanah dan buruh menerangkan bagaimana pentadbiran Barat menyokong ekonomi eksport.",
        timeline: ["Awal abad ke-20: dasar tanah dan buruh kolonial diperkukuh"],
      },
      {
        no: "6.3",
        title: "Kesan Ekonomi Akibat Pentadbiran Barat di Negara Kita",
        facts: [
          "British membina landasan kereta api untuk menghubungkan kawasan lombong dengan pelabuhan.",
          "Fasa kereta api 1885-1896 menghubungkan lombong dengan pelabuhan.",
          "Fasa 1897-1909 menghubungkan utara dan selatan Tanah Melayu selepas NNMB dibentuk.",
          "Fasa 1910-1931 menghubungkan seluruh Tanah Melayu selepas pengaruh British meluas ke NNMTB.",
          "Jalan raya, pelabuhan, lapangan terbang awam dan telekomunikasi seperti telegraf, telefon dan pos berkembang.",
        ],
        keywords: ["kereta api", "jalan raya", "pelabuhan", "telegraf", "telefon", "pos"],
        tokoh: ["Pentadbir British", "Pengusaha lombong", "Pengusaha ladang"],
        dates: ["1885-1896: fasa pertama kereta api", "1897-1909: fasa kedua", "1910-1931: fasa ketiga"],
        places: ["Port Weld", "Taiping", "Kuala Lumpur", "Port Swettenham", "Gemas", "Padang Besar", "Kota Bharu"],
        treaties: [],
        laws: [],
        causes: ["Keperluan mengangkut bijih timah dan getah", "Pertumbuhan ekonomi eksport", "Keperluan menghubungkan kawasan pengeluaran dengan pelabuhan"],
        effects: ["Pengangkutan moden berkembang", "Bandar dan pelabuhan maju", "Eksport bahan mentah lebih cepat", "Telekomunikasi memudahkan pentadbiran"],
        importance: ["Infrastruktur moden ialah kesan langsung ekonomi kolonial."],
        links: ["Pengangkutan dan telekomunikasi mempercepat eksploitasi ekonomi serta perubahan sosial."],
        map: "Peta landasan kereta api menunjukkan hubungan kawasan lombong, ladang dan pelabuhan.",
        timeline: ["1885-1896", "1897-1909", "1910-1931"],
      },
      {
        no: "6.4",
        title: "Kesan Sosial Akibat Perkembangan Ekonomi di Negara Kita",
        facts: [
          "Perkembangan ekonomi membawa kepada kemunculan bandar baharu.",
          "Kemasukan buruh luar membentuk masyarakat majmuk.",
          "Pendidikan vernakular, sekolah Melayu dan sekolah agama berkembang mengikut komuniti.",
          "Perkhidmatan kesihatan, hospital, sistem pos, telegraf dan telefon diperkenalkan.",
          "SBUB membuka sekolah Melayu di Papar.",
        ],
        keywords: ["bandar", "masyarakat majmuk", "pendidikan vernakular", "kesihatan", "telekomunikasi"],
        tokoh: ["Pentadbir British", "Masyarakat Melayu", "Masyarakat Cina", "Masyarakat India", "SBUB"],
        dates: ["Awal abad ke-20: bandar dan perkhidmatan sosial berkembang"],
        places: ["Kuala Lumpur", "Ipoh", "Taiping", "Papar", "Sarawak", "Sabah"],
        treaties: [],
        laws: [],
        causes: ["Perkembangan lombong dan ladang", "Kemasukan buruh luar", "Pembinaan infrastruktur", "Keperluan pentadbiran kolonial"],
        effects: ["Bandar berkembang", "Masyarakat majmuk terbentuk", "Pendidikan terpisah mengikut kaum", "Perkhidmatan sosial moden diperkenalkan"],
        importance: ["Menjelaskan asal usul perubahan sosial moden di negara kita."],
        links: ["Kesan sosial berpunca daripada keperluan ekonomi Barat, bukan semata-mata kebajikan masyarakat tempatan."],
        map: "Peta bandar baharu menunjukkan kawasan yang berkembang akibat perlombongan, ladang dan pelabuhan.",
        timeline: ["Akhir abad ke-19 hingga awal abad ke-20: perubahan sosial semakin jelas"],
      },
    ],
  },
  {
    num: 7,
    title: "Penentangan Masyarakat Tempatan",
    summary:
      "Bab ini menghuraikan matlamat dan bentuk penentangan masyarakat tempatan, kesan sistem pentadbiran Barat terhadap kuasa dan kehidupan tempatan, peristiwa penentangan serta kesannya.",
    subtopics: [
      {
        no: "7.1",
        title: "Matlamat dan Bentuk Penentangan Masyarakat Tempatan",
        facts: [
          "Penentangan bertujuan mempertahankan hak, kuasa, maruah, adat dan kedaulatan tempatan.",
          "Bentuk penentangan termasuk penentangan bersenjata, mencabar perjanjian, menggunakan undang-undang dan serangan terhadap pusat pentadbiran Barat.",
          "Tokoh tempatan menentang kerana pentadbiran Barat menggugat kuasa tradisional dan kehidupan masyarakat.",
          "Penentangan berlaku di Naning, Sarawak, Sabah, Perak, Pahang, Kelantan dan Terengganu.",
        ],
        keywords: ["penentangan", "kedaulatan", "hak tempatan", "adat", "kuasa pembesar"],
        tokoh: ["Dol Said", "Rentap", "Sharif Masahor", "Dato' Maharaja Lela", "Yamtuan Antah", "Dato' Bahaman", "Mat Salleh", "Tok Janggut", "Haji Abdul Rahman Limbong"],
        dates: ["1831-1832: Perang Naning", "1875: pembunuhan J.W.W. Birch", "1895-1897: penentangan Mat Salleh", "1915: penentangan Tok Janggut", "1928: gerakan Haji Abdul Rahman Limbong"],
        places: ["Naning", "Bukit Sadok", "Pasir Salak", "Pahang", "Tambunan", "Kelantan", "Terengganu"],
        treaties: ["Perjanjian Pangkor 1874"],
        laws: ["Undang-undang Barat", "peraturan cukai Barat"],
        causes: ["Cukai membebankan", "Kuasa pembesar terhakis", "Adat tempatan diganggu", "Tanah dan hasil dikawal Barat"],
        effects: ["Kebangkitan tempatan berlaku", "British menggunakan kekuatan tentera dan undang-undang", "Tokoh tempatan dihukum atau dibuang negeri"],
        importance: ["Membuktikan masyarakat tempatan mempertahankan maruah dan kedaulatan."],
        links: ["Matlamat penentangan berkait dengan kesan pentadbiran Barat dalam subtopik 7.2."],
        map: "Peta lokasi penentangan menunjukkan kebangkitan berlaku di pelbagai negeri dan wilayah.",
        timeline: ["1831 Naning", "1875 Perak", "1890-an Pahang/Sabah", "1915 Kelantan", "1928 Terengganu"],
      },
      {
        no: "7.2",
        title: "Sistem Pentadbiran Barat Memberikan Kesan Terhadap Kuasa Pemerintahan dan Kehidupan Masyarakat Tempatan",
        facts: [
          "Sistem pentadbiran Barat menjejaskan kuasa sultan dan pembesar.",
          "Residen British mentadbir hasil negeri dan nasihatnya mesti dipatuhi kecuali agama Islam dan adat Melayu.",
          "Pungutan cukai tradisional digantikan dengan cukai Barat.",
          "Undang-undang tradisional terjejas apabila undang-undang Barat diperkenalkan.",
          "SBUB memperkenalkan pelbagai jenis cukai yang membebankan rakyat.",
        ],
        keywords: ["Sistem Residen", "cukai", "undang-undang Barat", "kuasa pembesar", "adat tempatan"],
        tokoh: ["J.W.W. Birch", "Sultan Abdullah", "Pembesar Melayu", "Pegawai SBUB"],
        dates: ["1874: Sistem Residen bermula di Perak selepas Perjanjian Pangkor"],
        places: ["Perak", "Naning", "Sabah", "Pahang", "Terengganu", "Kelantan"],
        treaties: ["Perjanjian Pangkor 1874"],
        laws: ["Undang-undang Barat", "peraturan cukai", "peraturan tanah"],
        causes: ["British mahu menguasai hasil negeri", "Sistem pentadbiran Barat menggantikan amalan tradisional", "Cukai baharu diperkenalkan"],
        effects: ["Pembesar kehilangan sumber pendapatan", "Rakyat terbeban", "Kemarahan masyarakat tempatan meningkat"],
        importance: ["Menjelaskan punca langsung penentangan masyarakat tempatan."],
        links: ["Kesan pentadbiran Barat membawa kepada peristiwa penentangan dalam 7.3."],
        map: "Rajah perbandingan pentadbiran tradisional dan pentadbiran Barat membantu murid melihat kuasa yang hilang.",
        timeline: ["Selepas campur tangan Barat: kuasa tempatan semakin terhakis"],
      },
      {
        no: "7.3",
        title: "Penentangan Masyarakat Tempatan Terhadap Kuasa Barat",
        facts: [
          "Dol Said menentang British di Naning kerana isu cukai dan kedaulatan Naning.",
          "Rentap menentang Brooke di Sarawak dan mempertahankan Bukit Sadok sehingga serangan ketiga Brooke pada tahun 1861.",
          "Dato' Maharaja Lela dan pembesar Perak menentang J.W.W. Birch di Pasir Salak.",
          "Dato' Bahaman menentang British di Pahang.",
          "Mat Salleh menentang SBUB di Sabah.",
          "Tok Janggut menentang British di Kelantan pada tahun 1915.",
          "Haji Abdul Rahman Limbong menentang peraturan tanah British di Terengganu.",
        ],
        keywords: ["Dol Said", "Rentap", "Dato' Maharaja Lela", "Dato' Bahaman", "Mat Salleh", "Tok Janggut", "Haji Abdul Rahman Limbong"],
        tokoh: ["Dol Said", "Rentap", "Sharif Masahor", "Dato' Maharaja Lela", "Dato' Sagor", "Sultan Abdullah", "Dato' Bahaman", "Mat Salleh", "Tok Janggut", "Haji Abdul Rahman Limbong"],
        dates: ["1831-1832: Perang Naning", "1861: Brooke menawan Bukit Sadok", "1875: J.W.W. Birch dibunuh", "1915: Tok Janggut menentang British", "1928: penentangan di Terengganu"],
        places: ["Naning", "Bukit Sadok", "Kuching", "Pasir Salak", "Belanja", "Pahang", "Tambunan", "Kelantan", "Terengganu"],
        treaties: ["Perjanjian Pangkor 1874"],
        laws: ["Peraturan tanah British", "peraturan cukai SBUB"],
        causes: ["Cukai", "hilang kuasa", "campur tangan adat", "peraturan tanah", "penindasan pentadbiran Barat"],
        effects: ["British menggunakan tentera dan tipu muslihat", "Tokoh tempatan dihukum", "British memperkukuh kuasa selepas penentangan dipatahkan"],
        importance: ["Tokoh penentangan menjadi lambang keberanian mempertahankan tanah air."],
        links: ["Setiap penentangan mempunyai sebab tempatan tetapi berpunca daripada peluasan kuasa Barat."],
        map: "Peta lokasi penentangan menghubungkan tokoh dengan kawasan perjuangan masing-masing.",
        timeline: ["1831 Naning", "1861 Bukit Sadok", "1875 Pasir Salak", "1915 Kelantan", "1928 Terengganu"],
      },
      {
        no: "7.4",
        title: "Kesan Penentangan Masyarakat Tempatan",
        facts: [
          "British mengalami kerugian 100,000 Pound Sterling dalam Perang Naning.",
          "British membelanjakan 400,000 Pound Sterling dalam Perang Perak.",
          "British mengalami kerugian 7000 Pound Sterling dalam Perang Pahang.",
          "British lebih berhati-hati melantik Residen yang memahami adat resam tempatan.",
          "British menubuhkan Majlis Mesyuarat Negeri dan memantapkan skim penempatan pegawai.",
          "Kolej Melayu Kuala Kangsar ditubuhkan pada tahun 1905.",
          "British memberikan peluang kepada aristokrat Melayu menyertai MCS dan menubuhkan MAS.",
        ],
        keywords: ["kerugian perang", "Majlis Mesyuarat Negeri", "MCKK", "MCS", "MAS", "pemantapan kuasa Barat"],
        tokoh: ["Residen British", "Aristokrat Melayu", "Pegawai British"],
        dates: ["1905: Kolej Melayu Kuala Kangsar ditubuhkan"],
        places: ["Naning", "Perak", "Pahang", "Kuala Kangsar", "Sarawak", "Sabah"],
        treaties: [],
        laws: ["Perintah atau Peraturan Sultan dalam Majlis Mesyuarat"],
        causes: ["Penentangan tempatan menyukarkan pentadbiran British", "British mahu mengelakkan kebangkitan berulang"],
        effects: ["British lebih berhati-hati", "MMN ditubuhkan", "Pentadbiran pegawai disusun semula", "Kuasa Barat tetap diperkukuh"],
        importance: ["Menunjukkan penentangan memberi kesan walaupun akhirnya British memantapkan kuasa."],
        links: ["Kesan penentangan membuka ruang kepada peranan raja dan pembesar menangani cabaran Barat dalam Bab 8."],
        map: "Rajah kesan membandingkan kesan kepada British dan masyarakat tempatan.",
        timeline: ["Selepas penentangan: British menyusun semula pentadbiran dan memperkukuh kawalan"],
      },
    ],
  },
  {
    num: 8,
    title: "Kebijaksanaan Raja dan Pembesar Melayu Menangani Cabaran Barat",
    summary:
      "Bab ini menerangkan reaksi pemerintah negeri Melayu utara dan Johor terhadap tindakan Barat, tindakan raja Melayu, usaha pembesar dalam pemodenan negeri dan keberkesanan peranan pemerintah tempatan.",
    subtopics: [
      {
        no: "8.1",
        title: "Reaksi Pemerintah Negeri-negeri Melayu Utara dan Johor Terhadap Tindakan Barat",
        facts: [
          "Perjanjian Bangkok 1909 menimbulkan reaksi pemerintah negeri Melayu utara.",
          "Perlis kehilangan wilayah Setul, Kedah kehilangan wilayah tertentu dan pemerintah membantah tindakan British-Siam.",
          "Sultan Abdul Hamid Halim Shah menegaskan bantahan terhadap kesan Perjanjian Bangkok.",
          "Sultan Zainal Abidin III mengecam tindakan British dan Siam.",
          "Johor berusaha mengekalkan kedaulatan melalui diplomasi dan pemodenan.",
        ],
        keywords: ["reaksi pemerintah", "Perjanjian Bangkok 1909", "negeri Melayu utara", "Johor", "kedaulatan"],
        tokoh: ["Sultan Abdul Hamid Halim Shah", "Sultan Muhammad IV", "Sultan Zainal Abidin III", "Sultan Abu Bakar", "Sultan Ibrahim"],
        dates: ["1909: Perjanjian Bangkok"],
        places: ["Perlis", "Kedah", "Kelantan", "Terengganu", "Johor", "Setul"],
        treaties: ["Perjanjian Bangkok 1909"],
        laws: [],
        causes: ["Perjanjian dibuat tanpa persetujuan penuh pemerintah Melayu", "Wilayah dan kedaulatan negeri terjejas", "British mahu meluaskan kuasa"],
        effects: ["Pemerintah Melayu membantah", "British tetap menempatkan penasihat", "Kesedaran mempertahankan kedaulatan meningkat"],
        importance: ["Menunjukkan raja Melayu tidak pasif dalam menghadapi tindakan Barat."],
        links: ["Reaksi pemerintah membawa kepada tindakan lebih tersusun melalui Durbar, diplomasi dan undang-undang tubuh."],
        map: "Peta kesan Perjanjian Bangkok menunjukkan wilayah yang terjejas di negeri Melayu utara.",
        timeline: ["1909 Perjanjian Bangkok dan reaksi pemerintah"],
      },
      {
        no: "8.2",
        title: "Tindakan Raja Melayu Menangani Cabaran Barat",
        facts: [
          "Raja-raja Melayu menggunakan Durbar untuk menyuarakan bantahan terhadap pemusatan kuasa British.",
          "Durbar Kuala Lumpur 1903 menyaksikan Sultan Idris Murshidul Adzam Shah mengkritik pemusatan kuasa Residen Jeneral.",
          "Durbar Pekan 1932, Durbar Klang 1937 dan Durbar Seri Menanti 1939 menjadi wadah tuntutan raja-raja Melayu.",
          "Sultan Abu Bakar mengadakan hubungan diplomatik untuk mengukuhkan kedudukan Johor.",
          "Sultan Zainal Abidin III enggan menerima Penasihat British dan hanya menerima ejen British.",
        ],
        keywords: ["Durbar", "diplomasi", "Raja-raja Melayu", "Penasihat British", "ejen British"],
        tokoh: ["Sultan Idris Murshidul Adzam Shah", "Sultan Iskandar Shah", "Sultan Abu Bakar Riayatuddin Al-Muazzam Shah", "Sultan Hisamuddin Alam Shah", "Sultan Abu Bakar Johor", "Sultan Zainal Abidin III"],
        dates: ["1903: Durbar Kuala Lumpur", "1932: Durbar Pekan", "1937: Durbar Klang", "1939: Durbar Seri Menanti", "24 Mei 1919: Perjanjian Terengganu-British"],
        places: ["Kuala Lumpur", "Pekan", "Klang", "Seri Menanti", "Johor", "Terengganu"],
        treaties: ["Perjanjian Terengganu-British 1919"],
        laws: [],
        causes: ["Pemusatan kuasa British", "Kuasa raja dan negeri terhakis", "Penasihat British semakin mengawal pentadbiran"],
        effects: ["Raja Melayu menyuarakan tuntutan", "Durbar menjadi platform perbincangan", "Kedaulatan dipertahankan melalui diplomasi"],
        importance: ["Membuktikan kebijaksanaan raja Melayu menggunakan saluran rasmi, diplomasi dan rundingan."],
        links: ["Durbar dan diplomasi melengkapkan usaha undang-undang tubuh di Johor dan Terengganu."],
        map: "Garis masa Durbar menunjukkan kesinambungan usaha Raja-raja Melayu menuntut pemulihan kuasa.",
        timeline: ["1903", "1919", "1932", "1937", "1939"],
      },
      {
        no: "8.3",
        title: "Usaha Pembesar Melayu dalam Pemodenan Negeri",
        facts: [
          "Pembesar Melayu memainkan peranan dalam pemodenan negeri melalui pentadbiran, pendidikan, ekonomi dan undang-undang.",
          "Sultan Abu Bakar bekerjasama dengan Majlis Mesyuarat Kerajaan untuk memodenkan Johor.",
          "Pembesar Johor membantu membangunkan sistem pentadbiran moden.",
          "Pembesar Terengganu bekerjasama dengan Sultan Zainal Abidin III mempertahankan kedaulatan negeri.",
        ],
        keywords: ["pemodenan negeri", "pembesar Melayu", "Majlis Mesyuarat", "pentadbiran moden", "diplomasi"],
        tokoh: ["Sultan Abu Bakar", "Dato' Jaafar bin Muhammad", "Dato' Abdul Rahman Andak", "Sultan Zainal Abidin III", "Pembesar Terengganu"],
        dates: ["1895: Undang-Undang Tubuh Kerajaan Johor", "1911: Undang-Undang Bagi Diri Kerajaan Terengganu"],
        places: ["Johor", "Terengganu", "London"],
        treaties: [],
        laws: ["Undang-Undang Tubuh Kerajaan Johor 1895", "Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],
        causes: ["Keperluan memodenkan pentadbiran", "Ancaman campur tangan British", "Keinginan mempertahankan kedaulatan"],
        effects: ["Pentadbiran negeri lebih tersusun", "British sukar menguasai negeri secara tergesa-gesa", "Pembesar tempatan berperanan sebagai pentadbir moden"],
        importance: ["Murid melihat pembesar Melayu sebagai agen pemodenan, bukan hanya tokoh tradisional."],
        links: ["Pemodenan pentadbiran menjadi strategi menghadapi cabaran Barat."],
        map: "Rajah hubungan raja-pembesar menunjukkan kerjasama dalam pemodenan negeri.",
        timeline: ["1895 Johor", "1911 Terengganu", "awal abad ke-20 pemodenan pentadbiran"],
      },
      {
        no: "8.4",
        title: "Keberkesanan Peranan Pemerintah Tempatan dalam Menangani Cabaran Barat",
        facts: [
          "Pemerintah tempatan berjaya melambatkan campur tangan British melalui diplomasi, undang-undang dan pemodenan.",
          "Undang-Undang Tubuh Kerajaan Johor 1895 menetapkan sultan tidak boleh menyerahkan negeri kepada kuasa asing.",
          "Undang-Undang Bagi Diri Kerajaan Terengganu 1911 mengandungi 53 fasal dan melarang penyerahan negeri kepada kuasa asing.",
          "Walaupun British akhirnya meluaskan kuasa, usaha pemerintah tempatan mempertahankan identiti dan kedaulatan negeri tetap berkesan sebagai warisan politik.",
        ],
        keywords: ["keberkesanan", "kedaulatan", "undang-undang tubuh", "pemodenan", "diplomasi"],
        tokoh: ["Sultan Abu Bakar", "Sultan Ibrahim", "Sultan Zainal Abidin III", "Sultan Muhammad II", "Undang Luak Rembau"],
        dates: ["1895: Undang-Undang Tubuh Kerajaan Johor", "1911: Undang-Undang Bagi Diri Kerajaan Terengganu", "1914: Perjanjian Johor-British"],
        places: ["Johor", "Terengganu", "Perak", "Selangor", "Sungai Ujong", "Pahang", "Negeri Sembilan"],
        treaties: ["Perjanjian Johor-British 1914"],
        laws: ["Undang-Undang Tubuh Kerajaan Johor 1895", "Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],
        causes: ["Cabaran peluasan kuasa Barat", "Keperluan mempertahankan negeri", "Pemusatan kuasa British"],
        effects: ["Campur tangan British dapat dilambatkan", "Identiti negeri dipertahankan", "Pentadbiran moden tempatan berkembang", "Warisan institusi raja terus kekal"],
        importance: ["Menyimpulkan kebijaksanaan pemerintah tempatan sebagai asas patriotisme dan jati diri negara."],
        links: ["Keberkesanan bergantung pada gabungan diplomasi, undang-undang, pemodenan dan kesatuan pemerintah-pembesar."],
        map: "Rajah perbandingan menunjukkan negeri yang menerima Residen/Penasihat dan negeri yang menggunakan undang-undang tubuh untuk mempertahankan kuasa.",
        timeline: ["1895", "1911", "1914", "1930-an Durbar"],
      },
    ],
  },
];

function q(value) {
  return JSON.stringify(value);
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function noteFile(chapter) {
  const keyTerms = Array.from(new Set(chapter.subtopics.flatMap((s) => s.keywords)));
  const examFacts = chapter.subtopics.flatMap((s) => s.facts.slice(0, 3));
  const quickRevision = chapter.subtopics.flatMap((s) => [
    `${s.no} ${s.title}: ${s.facts[0]}`,
    s.dates[0] ? `Tarikh penting ${s.no}: ${s.dates[0]}` : `Kata kunci ${s.no}: ${s.keywords.slice(0, 3).join(", ")}`,
  ]).slice(0, 16);

  const sections = [
    `    {
      title: "Bab Overview",
      subsections: [
        { title: "Sinopsis", content: ${q(chapter.summary)} },
        { title: "Apa yang akan dipelajari", bulletPoints: ${q(chapter.subtopics.map((s) => `${s.no} ${s.title}`))} },
        { title: "Fokus UASA", bulletPoints: ${q(["Kenal pasti kronologi, tokoh, tempat, perjanjian dan kesan.", "Bezakan sebab, strategi dan kesan peluasan kuasa Barat.", "Gunakan kata kunci seperti kedaulatan, pentadbiran, ekonomi, penentangan dan pemodenan."])} },
      ],
    }`,
  ];

  for (const s of chapter.subtopics) {
    sections.push(`    {
      title: ${q(`${s.no} ${s.title}`)},
      subsections: [
        { title: "Ringkasan", content: ${q(`${s.title} menerangkan ${s.facts[0].toLowerCase()} Subtopik ini perlu dibaca bersama kronologi, tokoh, tempat dan kesan yang berkaitan.`)} },
        { title: "Fakta penting", bulletPoints: ${q(s.facts)} },
        { title: "Kata kunci", bulletPoints: ${q(s.keywords)} },
        { title: "Tokoh penting", bulletPoints: ${q(s.tokoh.length ? s.tokoh : ["Tiada tokoh khusus dinyatakan dalam subtopik ini."])} },
        { title: "Tarikh penting", bulletPoints: ${q(s.dates.length ? s.dates : ["Tiada tarikh khusus; fokus kepada susunan sebab dan kesan."])} },
        { title: "Tempat penting", bulletPoints: ${q(s.places)} },
        { title: "Perjanjian / undang-undang / organisasi", table: { headers: ["Kategori", "Butiran"], rows: ${q([
          ["Perjanjian", s.treaties.length ? s.treaties.join("; ") : "Tiada perjanjian khusus"],
          ["Undang-undang", s.laws.length ? s.laws.join("; ") : "Tiada undang-undang khusus"],
          ["Organisasi / pentadbiran", s.keywords.filter((k) => /SHTI|VOC|SBUB|Majlis|Durbar|Residen|NNMB|NNMTB|Gabenor|Penasihat/i.test(k)).join("; ") || "Rujuk fakta pentadbiran dalam subtopik"],
        ])} } },
        { title: "Sebab", bulletPoints: ${q(s.causes)} },
        { title: "Kesan", bulletPoints: ${q(s.effects)} },
        { title: "Kepentingan", bulletPoints: ${q(s.importance)} },
        { title: "Hubungan antara konsep", bulletPoints: ${q(s.links)} },
        { title: "Peta / rajah / garis masa", bulletPoints: ${q([s.map, ...s.timeline])} },
        { title: "Tip peperiksaan", bulletPoints: ${q(["Tulis jawapan mengikut urutan: fakta + huraian + contoh + kesan.", "Jika soalan menyebut perjanjian, nyatakan tahun, pihak terlibat dan kesannya.", "Untuk soalan KBAT, kaitkan fakta textbook dengan nilai kedaulatan, kebijaksanaan atau kewaspadaan."])} },
        { title: "Kesilapan lazim pelajar", bulletPoints: ${q(["Mencampuradukkan tokoh dan negeri penentangan.", "Menulis tarikh tanpa menjelaskan kepentingannya.", "Menghafal istilah tetapi tidak mengaitkan sebab dan kesan."])} },
      ],
    }`);
  }

  sections.push(`    {
      title: "Rumusan Bab",
      subsections: [
        { title: "Imbas Kembali", bulletPoints: ${q(chapter.subtopics.map((s) => `${s.no}: ${s.keywords.slice(0, 4).join(", ")}`))} },
        { title: "Kata Kunci Peperiksaan", bulletPoints: ${q(keyTerms)} },
      ],
    }`);

  return `import type { StructuredNotes } from "@/data/types";

export const sejarahF3C${chapter.num}Notes: StructuredNotes = {
  chapterSummary: ${q(chapter.summary)},
  quickRevision: ${q(quickRevision)},
  keyTerms: ${q(keyTerms)},
  keyExamFacts: ${q(examFacts)},
  sections: [
${sections.join(",\n")}
  ],
};
`;
}

function mindmapFile(chapter) {
  const children = chapter.subtopics.map((s, i) => `    {
      id: "sejarah-f3-c${chapter.num}-s${i + 1}",
      label: ${q(`${s.no} ${s.title}`)},
      children: [
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-fakta", label: ${q(`Fakta: ${s.facts[0]}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-tokoh", label: ${q(`Tokoh: ${s.tokoh.slice(0, 4).join(", ") || "Tiada tokoh khusus"}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-tarikh", label: ${q(`Tarikh: ${s.dates.slice(0, 3).join("; ") || "Fokus kronologi umum"}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-perjanjian", label: ${q(`Perjanjian/undang-undang: ${[...s.treaties, ...s.laws].slice(0, 4).join(", ") || "Tiada khusus"}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-sebab", label: ${q(`Sebab: ${s.causes[0]}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-kesan", label: ${q(`Kesan: ${s.effects[0]}`)} },
        { id: "sejarah-f3-c${chapter.num}-s${i + 1}-exam", label: ${q(`Kata kunci: ${s.keywords.slice(0, 5).join(", ")}`)} },
      ],
    }`).join(",\n");
  return `import type { MindNode } from "@/components/MindMap";

export const sejarahF3C${chapter.num}MindMap: MindNode = {
  id: "sejarah-f3-c${chapter.num}-root",
  label: ${q(chapter.title)},
  children: [
${children},
  ],
};
`;
}

function quizFile(chapter) {
  const topics = chapter.subtopics.map((s) => ({
    no: s.no,
    title: s.title,
    facts: s.facts,
    keywords: s.keywords,
    tokoh: s.tokoh,
    dates: s.dates,
    places: s.places,
    treaties: s.treaties,
    laws: s.laws,
    causes: s.causes,
    effects: s.effects,
  }));
  return `import type { Difficulty, QuizQuestion } from "./types";

type Topic = {
  no: string;
  title: string;
  facts: string[];
  keywords: string[];
  tokoh: string[];
  dates: string[];
  places: string[];
  treaties: string[];
  laws: string[];
  causes: string[];
  effects: string[];
};

type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = ${q(topics)};

function topic(index: number) {
  return topics[index % topics.length];
}

function makeQuiz(): QuizSeed[] {
  const items: QuizSeed[] = [];
  for (let i = 0; i < 10; i++) {
    const t = topic(i);
    items.push([
      "Easy",
      \`Apakah fakta utama bagi \${t.no} \${t.title}? (Set \${i + 1})\`,
      [t.facts[0], t.effects[0], t.causes[0], t.keywords[0]],
      0,
      \`Fakta utama subtopik ini ialah: \${t.facts[0]}\`,
    ]);
  }
  for (let i = 0; i < 10; i++) {
    const t = topic(i + 1);
    const correct = t.treaties[0] || t.laws[0] || t.dates[0] || t.places[0];
    items.push([
      "Medium",
      \`Maklumat manakah paling berkaitan dengan \${t.no} \${t.title}? (Set \${i + 1})\`,
      [correct, t.effects[0], t.causes[0], t.keywords[t.keywords.length - 1]],
      0,
      \`Maklumat ini penting kerana berkait langsung dengan \${t.title}.\`,
    ]);
  }
  for (let i = 0; i < 10; i++) {
    const t = topic(i + 2);
    items.push([
      "Hard",
      \`Apakah hubungan sebab dan kesan yang tepat bagi \${t.no} \${t.title}? (Set \${i + 1})\`,
      [
        \`\${t.causes[0]} -> \${t.effects[0]}\`,
        \`\${t.effects[0]} -> \${t.causes[0]}\`,
        \`\${t.keywords[0]} -> tiada perubahan pentadbiran\`,
        \`\${t.places[0]} -> semua kuasa Barat berundur serta-merta\`,
      ],
      0,
      \`Jawapan tepat menghubungkan sebab textbook dengan kesannya: \${t.causes[0]} menyebabkan \${t.effects[0].toLowerCase()}.\`,
    ]);
  }
  return items;
}

export const sejarahF3C${chapter.num}Quizzes: QuizQuestion[] = makeQuiz().map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: \`sej-f3-c${chapter.num}-q\${index + 1}\`,
    subjectId: "sejarah",
    form: "Form 3",
    chapter: "Chapter ${chapter.num}",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
`;
}

function flashcardFile(chapter) {
  const topics = chapter.subtopics.map((s) => ({
    no: s.no,
    title: s.title,
    facts: s.facts,
    keywords: s.keywords,
    tokoh: s.tokoh,
    dates: s.dates,
    places: s.places,
    treaties: s.treaties,
    laws: s.laws,
    causes: s.causes,
    effects: s.effects,
    importance: s.importance,
  }));
  return `import type { Flashcard } from "./types";

type Topic = {
  no: string;
  title: string;
  facts: string[];
  keywords: string[];
  tokoh: string[];
  dates: string[];
  places: string[];
  treaties: string[];
  laws: string[];
  causes: string[];
  effects: string[];
  importance: string[];
};

const topics: Topic[] = ${q(topics)};

function topic(index: number) {
  return topics[index % topics.length];
}

function makeCards(): Array<[string, string]> {
  const cards: Array<[string, string]> = [];
  for (let i = 0; i < 20; i++) {
    const t = topic(i);
    cards.push([\`Fakta \${t.no}: \${t.title} (\${i + 1})\`, t.facts[i % t.facts.length]]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 1);
    const detail = t.dates[i % Math.max(t.dates.length, 1)] || t.places[i % t.places.length];
    cards.push([\`Tokoh/Tarikh \${t.no}: \${t.title} (\${i + 1})\`, \`\${(t.tokoh[i % Math.max(t.tokoh.length, 1)] || "Kata kunci")}: \${detail}\`]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 2);
    const treaty = t.treaties[0] || t.laws[0] || t.keywords[0];
    cards.push([\`Sebab/Kesan \${t.no}: \${t.title} (\${i + 1})\`, \`\${t.causes[i % t.causes.length]} -> \${t.effects[i % t.effects.length]}. Kata kunci: \${treaty}.\`]);
  }
  return cards;
}

export const sejarahF3C${chapter.num}Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: \`sej-f3-c${chapter.num}-fc\${index + 1}\`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter ${chapter.num}",
  front,
  back,
}));
`;
}

function writeContent() {
  for (const chapter of chapters) {
    const dir = path.join(contentRoot, `chapter-${chapter.num}`);
    mkdirp(dir);
    fs.writeFileSync(path.join(dir, "notes.ts"), noteFile(chapter));
    fs.writeFileSync(path.join(dir, "mindmap.ts"), mindmapFile(chapter));
    fs.writeFileSync(path.join(dataRoot, `sejarah-f3-c${chapter.num}-quizzes.ts`), quizFile(chapter));
    fs.writeFileSync(path.join(dataRoot, `sejarah-f3-c${chapter.num}-flashcards.ts`), flashcardFile(chapter));
  }
}

function addBefore(text, anchor, insert) {
  if (text.includes(insert.trim())) return text;
  const i = text.indexOf(anchor);
  if (i >= 0) return text.slice(0, i) + insert + text.slice(i);
  const crlfAnchor = anchor.replace(/\n/g, "\r\n");
  const j = text.indexOf(crlfAnchor);
  if (j >= 0) return text.slice(0, j) + insert.replace(/\n/g, "\r\n") + text.slice(j);
  throw new Error(`Anchor not found: ${anchor}`);
}

function updateDataContent() {
  const file = path.join(dataRoot, "content.ts");
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^import { sejarahF3C\d+(?:Quizzes|Flashcards) } from "\.\/sejarah-f3-c\d+-(?:quizzes|flashcards)";\r?\n/gm, "");
  text = text.replace(/^  \.\.\.sejarahF3C\d+(?:Quizzes|Flashcards),\r?\n/gm, "");
  let imports = "";
  let quizSpreads = "";
  let flashSpreads = "";
  for (const chapter of chapters) {
    imports += `import { sejarahF3C${chapter.num}Quizzes } from "./sejarah-f3-c${chapter.num}-quizzes";\n`;
    imports += `import { sejarahF3C${chapter.num}Flashcards } from "./sejarah-f3-c${chapter.num}-flashcards";\n`;
    quizSpreads += `  ...sejarahF3C${chapter.num}Quizzes,\n`;
    flashSpreads += `  ...sejarahF3C${chapter.num}Flashcards,\n`;
  }
  text = addBefore(text, "export const scienceF1C3NotesBM", imports);
  text = addBefore(text, "  // Geografi form 1 Chapter 1 - Arah", quizSpreads);
  text = addBefore(text, "  // Sejarah Form 1 Chapter 1 - Mengenali Sejarah", flashSpreads);
  fs.writeFileSync(file, text);
}

function updateRegistry() {
  const file = path.join(root, "src", "content", "registry.ts");
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^import { sejarahF3C\d+(?:Notes|MindMap) } from "@\/content\/form3\/sejarah\/chapter-\d+\/(?:notes|mindmap)";\r?\n/gm, "");
  text = text.replace(
    /function sejarahF3FlashcardsFor\(chapterNum: number\) \{[\s\S]*?\nfunction sejarahF3QuizzesFor\(chapterNum: number\) \{[\s\S]*?\n\}\r?\n\r?\n/g,
    "",
  );
  text = text.replace(/\r?\n  \/\/ Sejarah Form 3\r?\n[\s\S]*?(?=\r?\n  \/\/ Geography Form 1)/, "");
  let imports = "";
  for (const chapter of chapters) {
    imports += `import { sejarahF3C${chapter.num}Notes } from "@/content/form3/sejarah/chapter-${chapter.num}/notes";\n`;
    imports += `import { sejarahF3C${chapter.num}MindMap } from "@/content/form3/sejarah/chapter-${chapter.num}/mindmap";\n`;
  }
  text = addBefore(text, 'import { geoF1C1MindMap } from "@/content/form1/geography/chapter-1/mindmap";\n', imports);

  const helper = `function sejarahF3FlashcardsFor(chapterNum: number) {
  const chapterKey = \`Chapter \${chapterNum}\`;
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && f.form === "Form 3" && f.chapter === chapterKey,
  );
}

function sejarahF3QuizzesFor(chapterNum: number) {
  const chapterKey = \`Chapter \${chapterNum}\`;
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && q.form === "Form 3" && q.chapter === chapterKey,
  );
}

`;
  text = addBefore(text, "function geography(", helper);

  text = text.replace(/\n  \/\/ Geography Form 1/, `\n  // Sejarah Form 3\n${chapters
    .map(
      (chapter) => `  {
    id: "sejarah-f3-c${chapter.num}",
    subjectId: "sejarah",
    form: "Form 3",
    chapterKey: "Chapter ${chapter.num}",
    title: "${chapter.title}",
    notes: sejarahF3C${chapter.num}Notes,
    mindMap: { data: sejarahF3C${chapter.num}MindMap, title: "${chapter.title}" },
    flashcards: sejarahF3FlashcardsFor(${chapter.num}),
    quiz: sejarahF3QuizzesFor(${chapter.num}),
  },`,
    )
    .join("\n")}\n\n  // Geography Form 1`);
  fs.writeFileSync(file, text);
}

writeContent();
updateDataContent();
updateRegistry();
