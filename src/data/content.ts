export type Form = "Form 1" | "Form 2" | "Form 3";

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  description: string;
  tagline: string;
}

export const subjects: Subject[] = [
  { id: "bm", name: "Bahasa Melayu", emoji: "📘", color: "from-rose-500 to-orange-500", description: "Tatabahasa, karangan, dan kefahaman.", tagline: "Kuasai bahasa kebangsaan!" },
  { id: "english", name: "English", emoji: "🇬🇧", color: "from-sky-500 to-blue-600", description: "Grammar, comprehension, and writing.", tagline: "Level up your English!" },
  { id: "math", name: "Mathematics", emoji: "📐", color: "from-indigo-500 to-purple-600", description: "Algebra, geometry, statistics, and more.", tagline: "Solve it like a pro!" },
  { id: "science", name: "Science", emoji: "🔬", color: "from-emerald-500 to-teal-600", description: "Biology, chemistry, and physics basics.", tagline: "Explore the universe!" },
  { id: "sejarah", name: "Sejarah", emoji: "🏛️", color: "from-amber-500 to-yellow-500", description: "Tamadun, kemerdekaan, dan warisan negara.", tagline: "Jelajah masa lampau!" },
  { id: "geography", name: "Geography", emoji: "🌏", color: "from-cyan-500 to-emerald-500", description: "Physical & human geography of the world.", tagline: "Discover the world!" },
];

export const forms: Form[] = ["Form 1", "Form 2", "Form 3"];

export interface Note {
  id: string;
  subjectId: string;
  form: Form;
  chapter: string;
  title: string;
  summary: string;
  keywords: string[];
}

export const notes: Note[] = [
  { id: "n1", subjectId: "math", form: "Form 1", chapter: "Chapter 1", title: "Rational Numbers", summary: "Rational numbers include integers, fractions, and decimals that can be expressed as a/b where b ≠ 0. Operations follow standard rules of arithmetic.", keywords: ["integer", "fraction", "decimal"] },
  { id: "n2", subjectId: "math", form: "Form 2", chapter: "Chapter 3", title: "Algebraic Expressions", summary: "Algebraic expressions use variables to represent numbers. Combine like terms and apply distributive law to simplify.", keywords: ["variable", "like terms", "distributive"] },
  { id: "n3", subjectId: "science", form: "Form 1", chapter: "Chapter 2", title: "Cells & Living Things", summary: "All living organisms are made of cells. Animal cells lack cell walls and chloroplasts found in plant cells.", keywords: ["cell", "nucleus", "membrane"] },
  { id: "n4", subjectId: "science", form: "Form 3", chapter: "Chapter 5", title: "Electricity", summary: "Current flows from positive to negative terminals. Voltage = Current × Resistance (Ohm's Law).", keywords: ["current", "voltage", "Ohm's Law"] },
  
  { id: "n6", subjectId: "geography", form: "Form 1", chapter: "Chapter 1", title: "Map Reading", summary: "Maps use scale, symbols, and grid references. Latitude lines run east-west; longitude lines run north-south.", keywords: ["scale", "latitude", "longitude"] },
  { id: "n7", subjectId: "english", form: "Form 2", chapter: "Unit 3", title: "Present Perfect Tense", summary: "Used for actions that started in the past and continue, or have relevance now. Form: have/has + past participle.", keywords: ["tense", "past participle", "have/has"] },
  { id: "n8", subjectId: "bm", form: "Form 3", chapter: "Bab 2", title: "Kata Adjektif", summary: "Kata adjektif menerangkan sifat, keadaan atau warna sesuatu kata nama. Contoh: cantik, tinggi, merah.", keywords: ["sifat", "kata nama", "penerangan"] },
  { id: "sej-f1-c1-note", subjectId: "sejarah", form: "Form 1", chapter: "Chapter 1", title: "Mengenali Sejarah", summary: "Sejarah mempunyai makna unik mengikut bahasa dan tokoh. Dalam bahasa Arab, ia berasal daripada 'syajaratun' (pokok) yang dikaitkan dengan salasilah dan asal usul. Dalam bahasa Melayu, sejarah merujuk kepada asal usul, silsilah, dan peristiwa yang benar-benar berlaku. Dalam bahasa Inggeris, 'history' berasal daripada 'historia' dalam bahasa Yunani yang bermaksud penyelidikan. Herodotus menyatakan sejarah sebagai penceritaan tindakan manusia yang mengagumkan dan sebab berlakunya sesuatu peristiwa. Ibn Khaldun membicarakan masyarakat manusia, peradaban dunia, dan perubahan watak masyarakat. E.H. Carr menganggap sejarah sebagai proses interaksi berterusan antara ahli sejarah dengan fakta-faktanya. Khoo Kay Kim merujuk sejarah kepada apa-apa yang pernah atau sudah berlaku. Masa silam ialah rentetan peristiwa yang telah berlaku, manakala kronologi ialah urutan waktu yang diukur mengikut masa kejadian. Unit masa termasuk dekad (10 tahun), abad (100 tahun), dan alaf (1,000 tahun). Zaman Sebelum Masihi (SM) merujuk kepada sebelum kelahiran Nabi Isa AS, manakala Masihi (M) merujuk kepada selepas kelahiran baginda. Sumber sejarah terbahagi kepada sumber primer dan sekunder. Sumber primer bersifat asli dan belum diolah, contohnya fosil, artifak, dokumen rasmi, diari, dan bukan artifak seperti monumen dan gua. Sumber sekunder pula ialah bahan yang telah diolah, ditafsir, dan diterbitkan untuk umum seperti buku teks, majalah, surat khabar, dan ensiklopedia. Terdapat tiga kaedah penyelidikan sejarah: kaedah bertulis melalui catatan pada batu bersurat, dinding gua, kulit kayu, gading, dan kertas; kaedah lisan melalui temubual dengan tokoh atau saksi peristiwa yang dikenali sebagai orang sumber; dan kaedah arkeologi yang menggunakan pendekatan saintifik melalui aktiviti gali cari peninggalan sejarah di permukaan tanah atau di bawah air. Tafsiran sejarah adalah tindakan menerangkan fakta sejarah berdasarkan sumber yang ada. Perbezaan tafsiran berlaku kerana perbezaan pandangan sejarawan, ideologi, tujuan penulisan, dan pemilihan sumber yang tidak sama. Kepentingan tafsiran ialah untuk mendorong kita berfikir secara kritis dalam menilai sesuatu peristiwa dari pelbagai sudut. Kepentingan mempelajari sejarah termasuk mengenal asal usul keluarga dan negara, mengambil iktibar daripada kejayaan dan kegagalan masa lalu, memupuk patriotisme dengan menghargai warisan negara, dan mengukuhkan perpaduan dengan memahami budaya kaum lain untuk hidup harmoni.", keywords: ["Mengenali Sejarah", "Pengertian Sejarah", "Masa Silam", "Sumber Primer", "Sumber Sekunder", "Kaedah Bertulis", "Kaedah Lisan", "Kaedah Arkeologi", "Tafsiran Sejarah", "Kepentingan Sejarah", "Herodotus", "Ibn Khaldun", "E.H. Carr", "Khoo Kay Kim", "Kronologi", "SM", "Masihi", "Artifak", "Fosil", "Ekskavasi", "Patriotisme"] },
  { id: "sej-f1-c2-note", subjectId: "sejarah", form: "Form 1", chapter: "Chapter 2", title: "Zaman Air Batu", summary: "Zaman Air Batu ialah tempoh di mana suhu bumi jatuh dan sebahagian besar bumi dilitupi air batu tebal. Usia bumi dianggarkan 4.6 bilion tahun. Zaman Air Batu dibahagikan kepada 4 tahap: Miosen (23–5 juta tahun dahulu) — pembentukan gunung dan kemunculan mamalia; Pliosen (5.3–2.6 juta tahun dahulu) — penyejukan global dan penyebaran padang rumput; Pleistosen (2.5 juta–11,700 tahun dahulu) — 11 kali pengglasieran utama dan penghijrahan manusia ke Eropah dan Asia; Holosen (11,700 tahun dahulu–kini) — zaman kita dengan bercucuk tanam, roda, dan tulisan awal. Ciri-cirinya: suhu sangat rendah, tumbuhan renek sahaja, haiwan berbulu tebal seperti mamot mendominasi, manusia hidup nomad memburu, paras laut sangat rendah kerana air membeku. Selepas Zaman Air Batu, suhu meningkat lalu berlaku kenaikan paras laut sehingga 100 meter, tasik air tawar terbentuk, mamot pupus, dan manusia berhijrah. Di Asia Tenggara, Pentas Sunda menghubungkan Malaysia, Singapura, Indonesia, dan Borneo sebelum tenggelam akibat kenaikan paras laut. Penduduk Asia Tenggara mempunyai persamaan fizikal, bahasa, dan budaya kerana asalnya tinggal di daratan sama. Memahami Zaman Air Batu mengajar kita menjaga alam sekitar untuk mengelak perubahan iklim ekstrem.", keywords: ["Zaman Air Batu", "Pentas Sunda", "Holosen", "Pleistosen", "Miosen", "Pliosen", "Geologi", "Paleontologi", "Mamot", "glasier", "paras laut"] },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: string;
  subjectId: string;
  form: Form;
  difficulty: Difficulty;
  chapter?: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export const quizzes: QuizQuestion[] = [
  { id: "q1", subjectId: "math", form: "Form 1", chapter: "Chapter 1", difficulty: "Easy", question: "What is 3/4 + 1/4?", options: ["1", "1/2", "3/8", "2"], answerIndex: 0, explanation: "Same denominator: 3/4 + 1/4 = 4/4 = 1." },
  { id: "q2", subjectId: "math", form: "Form 2", chapter: "Chapter 3", difficulty: "Medium", question: "Simplify: 2(x + 3) − x", options: ["x + 6", "3x + 3", "x + 3", "2x + 6"], answerIndex: 0, explanation: "2x + 6 − x = x + 6." },
  { id: "q3", subjectId: "science", form: "Form 1", chapter: "Chapter 2", difficulty: "Easy", question: "Which organelle controls cell activities?", options: ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"], answerIndex: 1 },
  { id: "q4", subjectId: "science", form: "Form 3", chapter: "Chapter 5", difficulty: "Hard", question: "If V = 12V and R = 4Ω, find I.", options: ["2 A", "3 A", "4 A", "48 A"], answerIndex: 1, explanation: "I = V/R = 12/4 = 3 A." },
  
  { id: "q6", subjectId: "geography", form: "Form 1", chapter: "Chapter 1", difficulty: "Easy", question: "Garis lintang 0° dikenali sebagai?", options: ["Tropic of Cancer", "Equator", "Prime Meridian", "Arctic Circle"], answerIndex: 1 },
  { id: "q7", subjectId: "english", form: "Form 2", chapter: "Unit 3", difficulty: "Medium", question: "Choose the correct sentence:", options: ["She have gone home.", "She has went home.", "She has gone home.", "She gone home."], answerIndex: 2 },
  { id: "q8", subjectId: "bm", form: "Form 3", chapter: "Bab 2", difficulty: "Easy", question: "Yang manakah kata adjektif?", options: ["Berlari", "Cantik", "Buku", "Mereka"], answerIndex: 1 },

  { id: "sej-f1-c1-q1", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Perkataan 'sejarah' berasal daripada perkataan Arab, 'syajaratun'. Apakah maksud perkataan tersebut?", options: ["Batu", "Hikayat", "Sungai", "Pokok"], answerIndex: 3, explanation: "Perkataan 'sejarah' berasal daripada bahasa Arab 'syajaratun' yang bermaksud pokok. Ini menggambarkan sejarah seperti pokok yang mempunyai akar, batang, dan cabang — melambangkan kesinambungan peristiwa dari masa lalu hingga kini." },
  { id: "sej-f1-c1-q2", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Dalam bahasa Melayu, istilah 'tambo' digunakan untuk merujuk kepada sejarah. Apakah maksud 'tambo'?", options: ["Undang-undang bertulis", "Kajian saintifik", "Riwayat dahulu kala", "Ramalan masa depan"], answerIndex: 2, explanation: "'Tambo' dalam bahasa Melayu merujuk kepada riwayat atau kisah dahulu kala. Ia digunakan dalam masyarakat Melayu tradisional untuk menceritakan peristiwa lampau secara lisan atau bertulis." },
  { id: "sej-f1-c1-q3", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Perkataan 'history' dalam bahasa Inggeris berasal daripada bahasa Yunani, 'Historia'. Apakah maksud 'Historia'?", options: ["Penulisan kreatif", "Penyelidikan", "Penceritaan semula", "Kenangan lama"], answerIndex: 1, explanation: "'Historia' dalam bahasa Yunani bermaksud penyelidikan atau inkuiri. Ini menunjukkan bahawa sejarah bukan sekadar cerita, tetapi merupakan satu proses penyelidikan yang sistematik tentang peristiwa masa lalu." },
  { id: "sej-f1-c1-q4", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Siapakah sejarawan yang menyatakan bahawa sejarah merupakan penceritaan tentang tindakan manusia yang penting dan mengagumkan?", options: ["Khoo Kay Kim", "Herodotus", "Ibn Khaldun", "E.H. Carr"], answerIndex: 1, explanation: "Herodotus ialah sejarawan Greek yang digelar \"Bapa Sejarah\". Beliau menyatakan bahawa sejarah merupakan penceritaan tentang tindakan manusia yang penting dan mengagumkan, dan beliau antara orang pertama yang menulis sejarah secara sistematik." },
  { id: "sej-f1-c1-q5", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Menurut E.H. Carr, sejarah ialah suatu proses interaksi berterusan antara ahli sejarah dengan apakah?", options: ["Cerita rakyat", "Fakta-fakta sejarah", "Masyarakat masa kini", "Masa hadapan"], answerIndex: 1, explanation: "Menurut E.H. Carr dalam bukunya 'What is History?', sejarah ialah proses interaksi berterusan antara ahli sejarah dengan fakta-fakta sejarah. Ini bermakna sejarah bukan sahaja tentang fakta, tetapi juga tentang bagaimana sejarawan mentafsirkannya." },
  { id: "sej-f1-c1-q6", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Sejarah membicarakan tentang masyarakat manusia, peradaban dunia, dan perubahan pada sifat-sifat masyarakat tersebut. Pandangan ini dikemukakan oleh...", options: ["Herodotus", "Khoo Kay Kim", "Ibn Khaldun", "Muhd Yusof Ibrahim"], answerIndex: 2, explanation: "Ibn Khaldun, seorang sarjana Islam terkenal, mengemukakan pandangan ini dalam karyanya 'Muqaddimah'. Beliau dianggap sebagai pelopor sosiologi dan falsafah sejarah dalam dunia Islam." },
  { id: "sej-f1-c1-q7", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah yang dimaksudkan dengan 'kronologi' dalam konteks kajian sejarah?", options: ["Kajian tentang fosil dan artifak", "Rentetan peristiwa mengikut urutan masa", "Kajian tentang lokasi peristiwa", "Senarai nama-nama sejarawan"], answerIndex: 1, explanation: "Kronologi bermaksud penyusunan peristiwa mengikut urutan masa yang betul, dari yang paling awal hingga yang terkini. Ia penting dalam sejarah untuk memahami sebab dan akibat sesuatu peristiwa." },
  { id: "sej-f1-c1-q8", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Sekumpulan tempoh masa yang merangkumi 1,000 tahun dikenali sebagai...", options: ["Zaman", "Dekad", "Abad", "Alaf"], answerIndex: 3, explanation: "Alaf merujuk kepada tempoh masa 1,000 tahun. Dekad = 10 tahun, Abad = 100 tahun, dan Alaf = 1,000 tahun. Contohnya, kita kini berada dalam Alaf ke-3 (tahun 2001–3000)." },
  { id: "sej-f1-c1-q9", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Konsep masa 'Masihi' (M) dalam sejarah bermula dengan peristiwa...", options: ["Pembinaan Piramid Mesir", "Kelahiran Nabi Isa AS", "Penghijrahan Nabi Muhammad SAW", "Kejatuhan Empayar Rom"], answerIndex: 1, explanation: "Kalendar Masihi (AD - Anno Domini) bermula dari tahun kelahiran Nabi Isa AS. Peristiwa sebelum kelahiran baginda dilabel sebagai SM (Sebelum Masihi) manakala selepasnya dilabel M (Masihi)." },
  { id: "sej-f1-c1-q10", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Antara berikut, yang manakah merupakan ciri utama sumber primer?", options: ["Boleh didapati di kedai buku", "Telah diolah dan diterbitkan", "Telah disebarkan kepada umum", "Bersifat asli dan belum ditafsir"], answerIndex: 3, explanation: "Sumber primer ialah sumber yang asli, terus dari zaman peristiwa berlaku, dan belum ditafsir atau diolah oleh orang lain. Contohnya ialah diari, surat, manuskrip asal, dan batu bersurat." },
  { id: "sej-f1-c1-q11", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Artifak merupakan antara sumber sejarah yang penting. Apakah contoh artifak?", options: ["Dinding gua", "Struktur candi", "Fosil manusia", "Loceng gangsa"], answerIndex: 3, explanation: "Artifak ialah benda buatan manusia yang boleh dialih dan dikaji. Loceng gangsa adalah contoh artifak kerana ia dicipta oleh manusia. Dinding gua dan struktur candi pula adalah contoh bukan artifak kerana ia tidak boleh dialih." },
  { id: "sej-f1-c1-q12", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bukan artifak ialah data arkeologi yang berkaitan dengan budaya manusia yang terdapat di bawah atau di atas tanah. Apakah contoh bagi bukan artifak?", options: ["Kapak batu", "Tembikar tanah", "Mata wang logam", "Lubang sampah"], answerIndex: 3, explanation: "Bukan artifak merujuk kepada peninggalan yang tidak boleh dialih seperti lubang sampah, struktur bangunan, dan lubang tiang. Lubang sampah adalah contoh bukan artifak kerana ia adalah ciri alam sekitar yang berkaitan dengan aktiviti manusia." },
  { id: "sej-f1-c1-q13", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Sumber sekunder merujuk kepada bahan yang telah diolah. Manakah antara berikut merupakan sumber sekunder?", options: ["Batu bersurat", "Diari tokoh", "Manuskrip asal", "Buku teks sejarah"], answerIndex: 3, explanation: "Sumber sekunder ialah bahan yang telah diolah, ditafsir, atau ditulis semula berdasarkan sumber primer. Buku teks sejarah adalah sumber sekunder kerana ia ditulis oleh sejarawan berdasarkan kajian mereka terhadap sumber primer." },
  { id: "sej-f1-c1-q14", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mengapakah surat khabar dianggap sebagai sumber sekunder?", options: ["Kerana ia disimpan di arkib", "Kerana ia ditulis pada masa peristiwa berlaku", "Kerana maklumatnya telah diolah dan diterbitkan", "Kerana ia menggunakan bahasa moden"], answerIndex: 2, explanation: "Surat khabar dianggap sumber sekunder kerana maklumat di dalamnya telah melalui proses penyuntingan, pengolahan, dan penerbitan oleh editor dan wartawan sebelum sampai kepada pembaca." },
  { id: "sej-f1-c1-q15", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Langkah pertama dalam kaedah bertulis untuk mendapatkan maklumat sejarah ialah...", options: ["Menganalisis sumber", "Menyimpan sumber di arkib", "Mengenal pasti sumber", "Menggunakan peralatan makmal"], answerIndex: 2, explanation: "Langkah pertama dalam kaedah bertulis ialah mengenal pasti sumber yang berkaitan. Selepas itu barulah sumber dikumpul, disahkan, dianalisis, dan akhirnya digunakan untuk menulis sejarah." },
  { id: "sej-f1-c1-q16", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah yang dimaksudkan dengan kaedah lisan dalam penyelidikan sejarah?", options: ["Mengkaji tulisan pada dinding gua", "Mendapatkan maklumat melalui temubual", "Mencari bahan di perpustakaan", "Melakukan aktiviti gali cari"], answerIndex: 1, explanation: "Kaedah lisan melibatkan pengumpulan maklumat sejarah melalui temubual dengan individu yang terlibat atau menyaksikan sesuatu peristiwa. Ia penting untuk merekod pengalaman dan memori orang yang masih hidup." },
  { id: "sej-f1-c1-q17", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Dalam kaedah lisan, apakah risiko yang mungkin berlaku terhadap maklumat yang diberikan oleh tokoh?", options: ["Tokoh enggan bercakap", "Rakaman audio rosak", "Wujud unsur tokok tambah", "Maklumat terlalu banyak"], answerIndex: 2, explanation: "Risiko utama kaedah lisan ialah wujudnya unsur tokok tambah, iaitu maklumat yang dilebih-lebihkan atau ditambah atas sebab ingatan yang lemah atau keinginan untuk menonjolkan diri. Ini boleh menjejaskan ketepatan fakta sejarah." },
  { id: "sej-f1-c1-q18", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Kaedah arkeologi merupakan kaedah mendapatkan maklumat daripada bahan tinggalan sejarah secara...", options: ["Tradisional", "Spontan", "Saintifik", "Sastera"], answerIndex: 2, explanation: "Kaedah arkeologi menggunakan pendekatan saintifik untuk mengkaji bahan tinggalan sejarah. Ini termasuk penggunaan teknologi moden seperti ujian karbon radioaktif (carbon dating) untuk menentukan usia sesuatu penemuan." },
  { id: "sej-f1-c1-q19", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Aktiviti 'gali cari' di tapak penemuan sejarah dikenali sebagai...", options: ["Eksploitasi", "Eksperimentasi", "Ekskavasi", "Ekspedisi"], answerIndex: 2, explanation: "Ekskavasi ialah istilah teknikal bagi kerja-kerja menggali dan merekod penemuan arkeologi secara sistematik di sesuatu tapak sejarah. Ia dilakukan dengan teliti untuk memastikan penemuan tidak rosak." },
  { id: "sej-f1-c1-q20", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah yang dimaksudkan dengan tafsiran dalam sejarah?", options: ["Mencari lokasi penemuan baru", "Menyalin semula fakta sejarah", "Menghafal tarikh peristiwa", "Menerangkan atau mengulas sesuatu fakta sejarah"], answerIndex: 3, explanation: "Tafsiran dalam sejarah bermaksud proses menerangkan, mengulas, dan memberi makna kepada fakta sejarah. Sejarawan yang berbeza boleh memberi tafsiran yang berbeza terhadap fakta yang sama berdasarkan perspektif mereka." },
  { id: "sej-f1-c1-q21", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mengapakah wujud perbezaan tafsiran dalam kalangan ahli sejarah terhadap sesuatu peristiwa yang sama?", options: ["Kekurangan bahan rujukan", "Perbezaan pandangan dan ideologi", "Fakta sejarah yang sentiasa berubah", "Sengaja ingin menimbulkan konflik"], answerIndex: 1, explanation: "Perbezaan tafsiran berlaku kerana setiap sejarawan mempunyai pandangan, latar belakang, dan ideologi yang berbeza. Faktor seperti kebangsaan, agama, dan politik boleh mempengaruhi cara seseorang sejarawan mentafsir sesuatu peristiwa." },
  { id: "sej-f1-c1-q22", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Dalam sejarah Malaysia, sejarawan Barat mungkin melihat Tok Janggut sebagai pemberontak. Namun, sejarawan tempatan melihat beliau sebagai...", options: ["Pejuang tanah air", "Penjenayah", "Pemerhati politik", "Pengikut penjajah"], answerIndex: 0, explanation: "Tok Janggut bangkit menentang penjajah British di Kelantan pada tahun 1915. Sejarawan Barat melihat beliau sebagai pemberontak kerana menentang pemerintahan mereka, tetapi sejarawan tempatan memandang beliau sebagai pejuang tanah air yang mempertahankan kedaulatan negara." },
  { id: "sej-f1-c1-q23", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah kepentingan utama mempelajari sejarah dalam kehidupan kita?", options: ["Mengambil iktibar dan pengajaran", "Untuk mengetahui masa depan dengan tepat", "Supaya boleh menjadi ahli politik", "Mencari harta karun peninggalan lama"], answerIndex: 0, explanation: "Kepentingan utama mempelajari sejarah ialah untuk mengambil iktibar dan pengajaran daripada peristiwa masa lalu. Dengan memahami kesilapan dan kejayaan lampau, kita dapat membuat keputusan yang lebih baik pada masa kini dan akan datang." },
  { id: "sej-f1-c1-q24", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mempelajari sejarah dapat memupuk semangat patriotisme. Apakah yang dimaksudkan dengan patriotisme?", options: ["Semangat cinta akan negara", "Keinginan untuk berhijrah ke luar negara", "Sifat mementingkan diri sendiri", "Semangat ingin menjajah negara lain"], answerIndex: 0, explanation: "Patriotisme bermaksud semangat cinta dan taat setia terhadap negara sendiri. Dengan mempelajari sejarah perjuangan nenek moyang, kita akan lebih menghargai kemerdekaan dan berasa bangga sebagai rakyat Malaysia." },
  { id: "sej-f1-c1-q25", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bagaimanakah sejarah dapat mengukuhkan perpaduan antara kaum di Malaysia?", options: ["Menghapuskan sejarah kaum minoriti", "Dengan membandingkan kehebatan satu kaum sahaja", "Menekankan konflik masa lalu secara berlebihan", "Memahami sejarah dan budaya pelbagai kaum"], answerIndex: 3, explanation: "Sejarah mengukuhkan perpaduan dengan membantu kita memahami sejarah, budaya, dan sumbangan pelbagai kaum di Malaysia. Apabila setiap kaum menghormati dan menghargai sejarah antara satu sama lain, perpaduan nasional dapat diperkukuhkan." },
  { id: "sej-f1-c1-q26", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Pentafsiran sejarah yang objektif memerlukan penggunaan sumber yang...", options: ["Satu sahaja", "Tidak sahih", "Pelbagai", "Sedikit"], answerIndex: 2, explanation: "Pentafsiran sejarah yang objektif memerlukan penggunaan pelbagai sumber untuk memastikan maklumat yang diperoleh adalah menyeluruh dan tidak berat sebelah. Bergantung pada satu sumber sahaja boleh menghasilkan gambaran yang tidak lengkap atau mengelirukan." },
  { id: "sej-f1-c1-q27", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Seorang pelajar ingin mengkaji sejarah keluarganya melalui gambar-gambar lama dan sijil kelahiran. Bahan-bahan ini dikategorikan sebagai...", options: ["Sumber khayalan", "Sumber sekunder", "Sumber primer", "Sumber lisan"], answerIndex: 2, explanation: "Gambar lama dan sijil kelahiran adalah sumber primer kerana ia merupakan dokumen asli yang dihasilkan pada masa peristiwa berlaku. Bahan-bahan ini belum ditafsir atau diolah oleh pihak lain." },
  { id: "sej-f1-c1-q28", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah yang dimaksudkan dengan 'tambo' dalam kamus sejarah?", options: ["Tempat menyimpan buku", "Kisah riwayat dahulu kala", "Satu kaedah gali cari", "Alat muzik tradisional"], answerIndex: 1, explanation: "'Tambo' merujuk kepada kisah atau riwayat dahulu kala dalam tradisi Melayu. Ia merupakan salah satu cara masyarakat Melayu tradisional merakam dan menyampaikan sejarah mereka secara lisan atau bertulis." },
  { id: "sej-f1-c1-q29", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Sejarah membolehkan kita mengenal asal-usul. Siapakah yang perlu kita kenali melalui sejarah?", options: ["Hanya pemimpin dunia", "Pelancong asing", "Keluarga, bangsa dan negara", "Hanya musuh negara"], answerIndex: 2, explanation: "Melalui sejarah, kita dapat mengenal asal-usul keluarga, bangsa, dan negara kita. Pengetahuan ini penting untuk membina identiti diri dan rasa kebanggaan terhadap warisan budaya kita." },
  { id: "sej-f1-c1-q30", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Kemahiran pemikiran sejarah membolehkan kita membuat penilaian kritis. Apakah kepentingan penilaian ini?", options: ["Mengesahkan kebenaran sesuatu peristiwa", "Menulis cerita fiksyen yang menarik", "Untuk menyalahkan orang lain atas peristiwa lampau", "Untuk menolak semua fakta dari Barat"], answerIndex: 0, explanation: "Penilaian kritis dalam sejarah penting untuk mengesahkan kebenaran sesuatu peristiwa. Dengan berfikir secara kritis, kita dapat membezakan fakta daripada pendapat, menilai kesahihan sumber, dan membuat kesimpulan yang tepat berdasarkan bukti yang ada." },
  { id: "sej-f1-c2-q1", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah maksud Geologi?", options: ["Bidang yang mengkaji hidupan purba", "Bidang ilmu yang mengkaji pembentukan bumi", "Bidang yang mengkaji perubahan cuaca", "Bidang yang mengkaji sejarah manusia"], answerIndex: 1, explanation: "Istilah ini berasal daripada bahasa Yunani yang merujuk kepada sains mengkaji struktur fizikal dan sejarah bumi." },
  { id: "sej-f1-c2-q2", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah peranan bidang Paleontologi?", options: ["Mengkaji pembentukan gunung-ganang", "Mengkaji perubahan cuaca global", "Mengkaji organisma atau hidupan purba dan fosil", "Mengkaji struktur bumi dalaman"], answerIndex: 2, explanation: "Paleontologi membolehkan ahli sejarah memahami hidupan masa lalu melalui sisa-sisa sejarah yang ditemui." },
  { id: "sej-f1-c2-q3", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Berapakah anggaran usia bumi?", options: ["1.6 bilion tahun", "2.5 bilion tahun", "3.8 bilion tahun", "4.6 bilion tahun"], answerIndex: 3, explanation: "Penyelidikan saintifik menunjukkan bumi telah melalui proses evolusi yang sangat panjang sebelum mencapai bentuk sekarang." },
  { id: "sej-f1-c2-q4", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah urutan kronologi yang betul bagi empat tahap Zaman Air Batu?", options: ["Holosen, Pleistosen, Pliosen, Miosen", "Miosen, Pliosen, Pleistosen, Holosen", "Pliosen, Miosen, Holosen, Pleistosen", "Pleistosen, Holosen, Miosen, Pliosen"], answerIndex: 1, explanation: "Urutan ini dikenali dengan singkatan 'MPPH' — Miosen, Pliosen, Pleistosen, dan Holosen untuk memudahkan pemahaman tentang garis masa Zaman Air Batu." },
  { id: "sej-f1-c2-q5", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah ciri fizikal utama bumi pada Zaman Miosen?", options: ["Berlaku pencairan air batu besar-besaran", "Manusia mula bercucuk tanam", "Pembentukan gunung-ganang secara fizikal", "Berlaku pengglasieran sebanyak 11 kali"], answerIndex: 2, explanation: "Zaman yang berlaku sekitar 23 juta hingga 5 juta tahun dahulu ini menyaksikan perubahan besar pada struktur permukaan bumi." },
  { id: "sej-f1-c2-q6", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bilakah Zaman Pliosen berlaku?", options: ["10 juta hingga 8 juta tahun dahulu", "5.3 juta hingga 2.6 juta tahun dahulu", "2.5 juta hingga 11,700 tahun dahulu", "11,700 tahun dahulu hingga kini"], answerIndex: 1, explanation: "Zaman ini penting kerana berlaku penyejukan global yang lebih ketara berbanding zaman sebelumnya." },
  { id: "sej-f1-c2-q7", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah kesan penyejukan global pada Zaman Pliosen?", options: ["Pembentukan gunung berapi baru", "Kepupusan semua hidupan laut", "Penyebaran padang rumput dan savana", "Kenaikan paras air laut secara mendadak"], answerIndex: 2, explanation: "Suhu yang sejuk menyebabkan perubahan habitat yang memaksa haiwan berhijrah ke kawasan baharu." },
  { id: "sej-f1-c2-q8", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Berapa kalikah proses pengglasieran berlaku pada Zaman Pleistosen?", options: ["5 kali", "7 kali", "9 kali", "11 kali"], answerIndex: 3, explanation: "Pengglasieran ialah proses di mana sebahagian besar bumi dilitupi air batu yang sangat tebal, berlaku sebanyak 11 kali pada Zaman Pleistosen." },
  { id: "sej-f1-c2-q9", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah yang dimaksudkan dengan Zaman Holosen?", options: ["Zaman pembentukan gunung-ganang", "Zaman yang bermula 11,700 tahun dahulu sehingga kini", "Zaman kepupusan haiwan purba", "Zaman pengglasieran pertama"], answerIndex: 1, explanation: "Ini merupakan zaman di mana manusia mula membina tamadun melalui aktiviti pertanian dan ciptaan tulisan." },
  { id: "sej-f1-c2-q10", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Namakan satu sistem tulisan awal yang muncul pada Zaman Holosen.", options: ["Tulisan Jawi", "Tulisan Rumi", "Tulisan Kuneiform", "Tulisan Hieroglif Rom"], answerIndex: 2, explanation: "Kemajuan manusia pada zaman ini membolehkan mereka merekodkan maklumat dan berkomunikasi dengan lebih efektif melalui sistem tulisan seperti Kuneiform." },
  { id: "sej-f1-c2-q11", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah ciri utama haiwan yang hidup pada Zaman Air Batu?", options: ["Mempunyai kulit yang tebal dan keras", "Mempunyai bulu yang tebal", "Boleh hidup di dalam air", "Bersaiz sangat kecil"], answerIndex: 1, explanation: "Ciri ini penting untuk membantu haiwan seperti mamot menyesuaikan diri dengan suhu yang sangat sejuk semasa Zaman Air Batu." },
  { id: "sej-f1-c2-q12", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Namakan dua jenis haiwan purba yang sering dikaitkan dengan Zaman Air Batu.", options: ["Dinosaur dan Pterodaktil", "Mamot dan Harimau Bertaring Panjang", "Gajah Asia dan Singa Afrika", "Beruang Kutub dan Anjing Laut"], answerIndex: 1, explanation: "Haiwan-haiwan ini merupakan hidupan utama yang mendominasi kawasan beriklim sejuk pada waktu itu." },
  { id: "sej-f1-c2-q13", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bagaimanakah cara hidup manusia pada Zaman Air Batu?", options: ["Menetap di bandar dan berdagang", "Membina rumah batu dan beternak", "Hidup secara nomad dan memburu binatang", "Bercucuk tanam dan membina tamadun"], answerIndex: 2, explanation: "Manusia berpindah-randah untuk mencari kawasan yang lebih panas serta sumber makanan yang mencukupi." },
  { id: "sej-f1-c2-q14", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah jenis tumbuhan utama yang tumbuh pada Zaman Air Batu?", options: ["Pokok-pokok besar dan hutan hujan tropika", "Rumput dan tumbuhan renek yang menjalar", "Kaktus dan tumbuhan gurun", "Pokok bakau dan tumbuhan laut"], answerIndex: 1, explanation: "Iklim yang sangat sejuk menghalang pertumbuhan pokok-pokok besar di kebanyakan kawasan semasa Zaman Air Batu." },
  { id: "sej-f1-c2-q15", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah keadaan fizikal bumi semasa kemuncak Zaman Air Batu?", options: ["Bumi dipenuhi lautan lava panas", "Bumi mengalami kemarau yang teruk", "Sebahagian besar bumi dilitupi salji dan air batu", "Bumi mempunyai suhu yang sangat panas"], answerIndex: 2, explanation: "Terutamanya di kawasan kutub dan pergunungan, lapisan air batu adalah sangat tebal semasa kemuncak Zaman Air Batu." },
  { id: "sej-f1-c2-q16", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mengapakah paras air laut pada Zaman Air Batu adalah rendah?", options: ["Kerana berlaku kemarau panjang", "Kerana air membeku menjadi air batu", "Kerana lautan menjadi kering", "Kerana berlaku gempa bumi yang besar"], answerIndex: 1, explanation: "Apabila air laut membeku di kawasan kutub, jumlah air di lautan berkurangan menyebabkan paras laut menurun." },
  { id: "sej-f1-c2-q17", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah maksud proses Pengglasieran?", options: ["Proses pembekuan air laut menjadi ais", "Proses pembentukan gunung berapi", "Proses pencairan air batu akibat peningkatan suhu bumi", "Proses pembentukan tasik dan sungai"], answerIndex: 2, explanation: "Peningkatan suhu dunia menyebabkan glasier cair dan mengalir ke laut, meningkatkan paras air laut." },
  { id: "sej-f1-c2-q18", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah kesan utama peningkatan suhu bumi terhadap paras laut?", options: ["Paras air laut menurun 50 meter", "Paras air laut tidak berubah", "Paras air laut meningkat sehingga 100 meter", "Paras air laut meningkat sehingga 500 meter"], answerIndex: 2, explanation: "Pencairan air batu yang banyak menyumbang kepada kenaikan drastik paras laut sehingga 100 meter di seluruh dunia." },
  { id: "sej-f1-c2-q19", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bagaimanakah tasik-tasik besar terbentuk selepas Zaman Air Batu?", options: ["Melalui letupan gunung berapi", "Melalui takungan air daripada pencairan glasier", "Melalui hakisan pantai oleh ombak laut", "Melalui gempa bumi yang membentuk lembah"], answerIndex: 1, explanation: "Aliran air batu yang mencair memenuhi kawasan lembah dan membentuk tasik air tawar yang besar." },
  { id: "sej-f1-c2-q20", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah faktor utama kepupusan haiwan seperti mamot?", options: ["Diburu secara berlebihan oleh manusia", "Diserang oleh haiwan pemangsa yang lebih besar", "Perubahan iklim yang menjadi terlalu panas", "Kekurangan makanan akibat banjir besar"], answerIndex: 2, explanation: "Mamot tidak dapat menyesuaikan diri dengan suhu yang meningkat pada akhir Zaman Pleistosen, akhirnya membawa kepada kepupusan mereka." },
  { id: "sej-f1-c2-q21", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Ke manakah manusia berhijrah apabila suhu bumi mula meningkat?", options: ["Ke kawasan kutub utara", "Ke benua Eropah dan Asia", "Ke kawasan bawah laut", "Ke kawasan pergunungan yang tinggi"], answerIndex: 1, explanation: "Manusia mencari kawasan yang mempunyai iklim yang lebih stabil di benua Eropah dan Asia untuk kelangsungan hidup." },
  { id: "sej-f1-c2-q22", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah itu Pentas Sunda?", options: ["Sebuah gunung berapi di Indonesia", "Nama lain bagi Lautan Hindi", "Kawasan daratan luas di Asia Tenggara yang menghubungkan beberapa buah negara", "Kawasan tundra di Asia Tengah"], answerIndex: 2, explanation: "Sebelum paras air laut naik, kawasan Pentas Sunda merupakan satu tanah daratan yang bersambung membolehkan pergerakan bebas manusia dan haiwan." },
  { id: "sej-f1-c2-q23", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Namakan wilayah yang berada dalam kawasan Pentas Sunda.", options: ["Thailand, Vietnam, Kemboja, dan Laos", "Malaysia, Singapura, Borneo, dan Indonesia", "Filipina, Taiwan, Jepun, dan Korea", "India, Sri Lanka, Bangladesh, dan Myanmar"], answerIndex: 1, explanation: "Daratan Pentas Sunda ini membolehkan manusia dan haiwan bergerak secara bebas di seluruh wilayah Malaysia, Singapura, Borneo, dan Indonesia pada zaman dahulu." },
  { id: "sej-f1-c2-q24", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah kesan kenaikan paras laut terhadap Pentas Sunda?", options: ["Kawasan tersebut menjadi padang pasir", "Kawasan tanah rendah tenggelam dan membentuk kepulauan", "Kawasan tersebut menjadi hutan hujan tropika", "Kawasan tersebut menjadi pergunungan tinggi"], answerIndex: 1, explanation: "Kenaikan air laut memisahkan daratan besar tadi menjadi pulau-pulau yang kita kenali hari ini seperti Pulau Borneo dan Pulau Sumatera." },
  { id: "sej-f1-c2-q25", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mengapakah penduduk di kawasan Asia Tenggara mempunyai persamaan budaya?", options: ["Kerana mereka belajar di sekolah yang sama", "Kerana pengaruh penjajahan yang sama", "Kerana asalnya mereka tinggal di daratan yang sama iaitu Pentas Sunda", "Kerana mereka mengamalkan agama yang sama"], answerIndex: 2, explanation: "Penghijrahan dan perkongsian tamadun di daratan yang sama membentuk persamaan dari segi fizikal dan bahasa dalam kalangan penduduk Asia Tenggara." },
  { id: "sej-f1-c2-q26", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Bilakah bumi mula mengalami peningkatan suhu yang drastik?", options: ["Pada awal Zaman Miosen", "Pada pertengahan Zaman Pliosen", "Pada awal Zaman Pleistosen", "Pada akhir Zaman Pleistosen"], answerIndex: 3, explanation: "Perubahan ini membawa kepada berakhirnya zaman ais yang ekstrem dan bermulanya Zaman Holosen yang kita diami sekarang." },
  { id: "sej-f1-c2-q27", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Namakan empat lautan utama di dunia.", options: ["Lautan Merah, Lautan Hitam, Lautan Biru, Lautan Hijau", "Lautan Artik, Lautan Atlantik, Lautan Hindi, dan Lautan Pasifik", "Lautan Arab, Lautan China, Lautan Jawa, Lautan Celebes", "Lautan Utara, Lautan Selatan, Lautan Timur, Lautan Barat"], answerIndex: 1, explanation: "Lautan-lautan utama ini meliputi sebahagian besar permukaan bumi dan terbentuk hasil daripada evolusi geografi bumi." },
  { id: "sej-f1-c2-q28", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Berapakah jumlah benua utama di dunia hari ini?", options: ["Lima benua", "Enam benua", "Tujuh benua", "Lapan benua"], answerIndex: 2, explanation: "Tujuh benua tersebut ialah Amerika Utara, Amerika Selatan, Eropah, Afrika, Asia, Oceania (Australia), dan Antartika." },
  { id: "sej-f1-c2-q29", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Apakah peranan radiasi matahari terhadap Zaman Air Batu?", options: ["Menyebabkan bumi menjadi lebih sejuk", "Menjadi faktor utama pemanasan bumi yang mencairkan air batu", "Menghalang pertumbuhan tumbuhan", "Menyebabkan haiwan purba pupus serta-merta"], answerIndex: 1, explanation: "Selain radiasi matahari, pembakaran hutan secara terbuka juga menyumbang kepada peningkatan suhu global yang mencairkan air batu." },
  { id: "sej-f1-c2-q30", subjectId: "sejarah", form: "Form 1", difficulty: "Medium", question: "Mengapakah penting bagi kita untuk menjaga alam sekitar berdasarkan topik Zaman Air Batu?", options: ["Supaya dapat menemui lebih banyak fosil purba", "Untuk mengelakkan kesan negatif perubahan iklim yang ekstrem", "Supaya haiwan seperti mamot hidup semula", "Untuk memastikan paras laut terus meningkat"], answerIndex: 1, explanation: "Memahami sejarah perubahan bumi membantu kita lebih menghargai alam dan mengambil langkah untuk melindungi ekosistem dunia daripada kesan perubahan iklim." },
];

export interface Flashcard {
  id: string;
  subjectId: string;
  form: Form;
  chapter?: string;
  front: string;
  back: string;
}

export const flashcards: Flashcard[] = [
  { id: "f1", subjectId: "math", form: "Form 1", chapter: "Chapter 1", front: "What is a prime number?", back: "A number greater than 1 with only two factors: 1 and itself." },
  { id: "f2", subjectId: "math", form: "Form 2", chapter: "Chapter 5", front: "Pythagoras' theorem?", back: "a² + b² = c² for a right-angled triangle." },
  { id: "f3", subjectId: "science", form: "Form 1", chapter: "Chapter 2", front: "Photosynthesis equation?", back: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (with sunlight)." },
  { id: "f4", subjectId: "science", form: "Form 3", chapter: "Chapter 5", front: "Ohm's Law?", back: "V = I × R" },
  
  { id: "f6", subjectId: "geography", form: "Form 1", chapter: "Chapter 1", front: "Garisan Khatulistiwa?", back: "Garisan lintang 0° yang membahagikan bumi kepada hemisfera utara dan selatan." },
  { id: "f7", subjectId: "english", form: "Form 2", chapter: "Unit 3", front: "Past participle of 'go'?", back: "gone" },
  { id: "f8", subjectId: "bm", form: "Form 3", chapter: "Bab 2", front: "Apakah kata hubung?", back: "Kata yang menghubungkan dua perkataan atau ayat. Contoh: dan, tetapi, atau." },

  // Sejarah Form 1 Chapter 2 - Zaman Air Batu
  { id: "sej-f1-c2-fc1", subjectId: "sejarah", form: "Form 1", front: "Apakah maksud bidang Geologi?", back: "Bidang ilmu yang mengkaji pembentukan bumi." },
  { id: "sej-f1-c2-fc2", subjectId: "sejarah", form: "Form 1", front: "Apakah peranan bidang Paleontologi?", back: "Mengkaji organisma atau hidupan purba yang pernah ada di bumi melalui bukti fosil atau sisa sejarah." },
  { id: "sej-f1-c2-fc3", subjectId: "sejarah", form: "Form 1", front: "Berapakah anggaran usia bumi menurut kajian saintifik?", back: "Lebih kurang 4.6 bilion tahun." },
  { id: "sej-f1-c2-fc4", subjectId: "sejarah", form: "Form 1", front: "Nyatakan empat tahap Zaman Air Batu mengikut urutan kronologi.", back: "Miosen, Pliosen, Pleistosen, dan Holosen (MPPH)." },
  { id: "sej-f1-c2-fc5", subjectId: "sejarah", form: "Form 1", front: "Apakah ciri fizikal utama yang berlaku pada Zaman Miosen?", back: "Berlaku pembentukan gunung-ganang secara fizikal dan kewujudan mamalia di bumi." },
  { id: "sej-f1-c2-fc6", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan utama penyejukan global pada Zaman Pliosen?", back: "Menyebabkan penyebaran padang rumput dan savana serta penghijrahan haiwan ke habitat baharu." },
  { id: "sej-f1-c2-fc7", subjectId: "sejarah", form: "Form 1", front: "Berapa kalikah proses pengglasieran utama berlaku pada Zaman Pleistosen?", back: "Sebanyak 11 kali." },
  { id: "sej-f1-c2-fc8", subjectId: "sejarah", form: "Form 1", front: "Zaman manakah yang menyaksikan manusia mula bercucuk tanam dan mencipta tulisan?", back: "Zaman Holosen." },
  { id: "sej-f1-c2-fc9", subjectId: "sejarah", form: "Form 1", front: "Namakan haiwan yang mempunyai bulu tebal untuk hidup di Zaman Air Batu.", back: "Mamot (Mammoth) dan harimau bertaring panjang." },
  { id: "sej-f1-c2-fc10", subjectId: "sejarah", form: "Form 1", front: "Bagaimanakah cara hidup manusia pada Zaman Air Batu?", back: "Hidup secara nomad (berpindah-randah) dan memburu binatang di kawasan yang lebih panas." },
  { id: "sej-f1-c2-fc11", subjectId: "sejarah", form: "Form 1", front: "Apakah jenis tumbuhan utama yang tumbuh pada Zaman Air Batu?", back: "Rumput dan tumbuhan renek yang menjalar." },
  { id: "sej-f1-c2-fc12", subjectId: "sejarah", form: "Form 1", front: "Apakah maksud proses 'Pengglasieran'?", back: "Proses pencairan air batu akibat peningkatan suhu bumi." },
  { id: "sej-f1-c2-fc13", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan pencairan air batu terhadap paras laut dunia?", back: "Paras air laut meningkat sehingga 100 meter." },
  { id: "sej-f1-c2-fc14", subjectId: "sejarah", form: "Form 1", front: "Apakah itu 'Pentas Sunda'?", back: "Kawasan daratan luas di Asia Tenggara yang menghubungkan Malaysia, Singapura, Indonesia, dan Borneo pada zaman dahulu." },
  { id: "sej-f1-c2-fc15", subjectId: "sejarah", form: "Form 1", front: "Mengapakah haiwan seperti mamot mengalami kepupusan?", back: "Disebabkan oleh perubahan iklim yang menjadi terlalu panas pada akhir Zaman Pleistosen." },
  { id: "sej-f1-c2-fc16", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan kenaikan paras laut terhadap Pentas Sunda?", back: "Kawasan tanah rendah tenggelam, membentuk kepulauan, dan memisahkan daratan besar menjadi pulau-pulau." },
  { id: "sej-f1-c2-fc17", subjectId: "sejarah", form: "Form 1", front: "Selain radiasi matahari, apakah faktor lain yang menyumbang kepada pemanasan bumi?", back: "Pembakaran hutan secara terbuka." },
  { id: "sej-f1-c2-fc18", subjectId: "sejarah", form: "Form 1", front: "Mengapakah penduduk di Asia Tenggara mempunyai persamaan budaya dan fizikal?", back: "Kerana asalnya mereka tinggal di daratan yang sama (Pentas Sunda) sebelum dipisahkan oleh kenaikan paras laut." },
  // Sejarah Form 1 Chapter 2 - Zaman Air Batu (Cards 19–60)
  { id: "sej-f1-c2-fc19", subjectId: "sejarah", form: "Form 1", front: "Bagaimanakah tasik-tasik besar terbentuk selepas Zaman Air Batu?", back: "Melalui takungan air daripada pencairan glasier yang memenuhi kawasan lembah." },
  { id: "sej-f1-c2-fc20", subjectId: "sejarah", form: "Form 1", front: "Apakah faktor utama kepupusan haiwan seperti mamot?", back: "Perubahan iklim yang menjadi terlalu panas pada akhir Zaman Pleistosen." },
  { id: "sej-f1-c2-fc21", subjectId: "sejarah", form: "Form 1", front: "Ke manakah manusia berhijrah apabila suhu bumi mula meningkat?", back: "Manusia mula berhijrah ke benua Eropah dan Asia." },
  { id: "sej-f1-c2-fc22", subjectId: "sejarah", form: "Form 1", front: "Apakah itu 'Pentas Sunda'?", back: "Kawasan daratan luas di Asia Tenggara yang menghubungkan Malaysia, Singapura, Indonesia, dan Borneo." },
  { id: "sej-f1-c2-fc23", subjectId: "sejarah", form: "Form 1", front: "Namakan wilayah yang berada dalam kawasan Pentas Sunda.", back: "Malaysia, Singapura, Borneo, dan Indonesia." },
  { id: "sej-f1-c2-fc24", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan kenaikan paras laut terhadap Pentas Sunda?", back: "Kawasan tanah rendah tenggelam dan membentuk kepulauan serta selat." },
  { id: "sej-f1-c2-fc25", subjectId: "sejarah", form: "Form 1", front: "Mengapakah penduduk di kawasan Asia Tenggara mempunyai persamaan budaya?", back: "Kerana asalnya mereka tinggal di daratan yang sama iaitu Pentas Sunda." },
  { id: "sej-f1-c2-fc26", subjectId: "sejarah", form: "Form 1", front: "Bilakah bumi mula mengalami peningkatan suhu yang drastik?", back: "Pada akhir Zaman Pleistosen yang membawa kepada bermulanya Zaman Holosen." },
  { id: "sej-f1-c2-fc27", subjectId: "sejarah", form: "Form 1", front: "Namakan lima lautan utama di dunia.", back: "Lautan Artik, Lautan Atlantik, Lautan Hindi, Lautan Pasifik, dan Lautan Selatan." },
  { id: "sej-f1-c2-fc28", subjectId: "sejarah", form: "Form 1", front: "Berapakah jumlah benua utama di dunia hari ini?", back: "Tujuh benua." },
  { id: "sej-f1-c2-fc29", subjectId: "sejarah", form: "Form 1", front: "Apakah peranan radiasi matahari terhadap Zaman Air Batu?", back: "Menjadi faktor utama pemanasan bumi yang menyebabkan pencairan air batu." },
  { id: "sej-f1-c2-fc30", subjectId: "sejarah", form: "Form 1", front: "Mengapakah penting bagi kita untuk menjaga alam sekitar?", back: "Untuk mengelakkan kesan negatif perubahan iklim yang ekstrem dan menjaga keseimbangan ekosistem." },
  { id: "sej-f1-c2-fc31", subjectId: "sejarah", form: "Form 1", front: "Berapakah jumlah benua yang wujud hasil daripada pergerakan kerak bumi?", back: "Tujuh benua utama." },
  { id: "sej-f1-c2-fc32", subjectId: "sejarah", form: "Form 1", front: "Apakah lautan kelima yang disebutkan dalam sumber?", back: "Lautan Selatan." },
  { id: "sej-f1-c2-fc33", subjectId: "sejarah", form: "Form 1", front: "Apakah pencapaian manusia pada Zaman Holosen selain daripada tulisan?", back: "Penciptaan roda dan permulaan aktiviti pertanian." },
  { id: "sej-f1-c2-fc34", subjectId: "sejarah", form: "Form 1", front: "Apakah aktiviti manusia yang menyumbang kepada peningkatan suhu bumi?", back: "Pembakaran hutan secara terbuka." },
  { id: "sej-f1-c2-fc35", subjectId: "sejarah", form: "Form 1", front: "Di manakah manusia Zaman Air Batu biasanya tinggal?", back: "Di kawasan tanah pamah yang lebih panas." },
  { id: "sej-f1-c2-fc36", subjectId: "sejarah", form: "Form 1", front: "Apakah perubahan fizikal bumi yang berlaku pada Zaman Miosen?", back: "Berlaku pembentukan gunung-ganang secara fizikal." },
  { id: "sej-f1-c2-fc37", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan Zaman Pliosen terhadap jenis tumbuhan?", back: "Kewujudan padang rumput dan savana yang luas." },
  { id: "sej-f1-c2-fc38", subjectId: "sejarah", form: "Form 1", front: "Mengapakah penduduk Malaysia dan Indonesia mempunyai persamaan ciri fizikal?", back: "Kerana asalnya mereka mendiami daratan yang sama iaitu Pentas Sunda." },
  { id: "sej-f1-c2-fc39", subjectId: "sejarah", form: "Form 1", front: "Bagaimanakah keadaan suhu bumi pada Zaman Pleistosen?", back: "Suhu bumi sangat rendah dengan proses pengglasieran yang berlaku secara berulang kali." },
  { id: "sej-f1-c2-fc40", subjectId: "sejarah", form: "Form 1", front: "Selain mamot, namakan jenis binatang lain yang hidup pada Zaman Air Batu.", back: "Bison, harimau bertaring panjang, dan sloth." },
  { id: "sej-f1-c2-fc41", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan pencairan air batu terhadap kawasan lembah?", back: "Pembentukan tasik-tasik air tawar dan sistem sungai." },
  { id: "sej-f1-c2-fc42", subjectId: "sejarah", form: "Form 1", front: "Apakah yang dimaksudkan dengan pergerakan kerak bumi?", back: "Proses di mana daratan asal yang bercantum berpecah menjadi benua-benua sekarang." },
  { id: "sej-f1-c2-fc43", subjectId: "sejarah", form: "Form 1", front: "Bilakah manusia mula berhijrah ke benua Eropah dan Asia?", back: "Apabila suhu bumi meningkat pada akhir Zaman Air Batu." },
  { id: "sej-f1-c2-fc44", subjectId: "sejarah", form: "Form 1", front: "Apakah perubahan paras air laut di Pentas Sunda sekitar 17,000 tahun dahulu?", back: "Paras air laut mula naik dan menenggelamkan kawasan tanah rendah." },
  { id: "sej-f1-c2-fc45", subjectId: "sejarah", form: "Form 1", front: "Mengapakah sejarah Zaman Air Batu penting bagi masa depan kita?", back: "Untuk belajar menghargai dan menjaga alam sekitar agar perubahan iklim ekstrem tidak berulang." },
  { id: "sej-f1-c2-fc46", subjectId: "sejarah", form: "Form 1", front: "Apakah nama lautan di bahagian paling selatan bumi?", back: "Lautan Selatan." },
  { id: "sej-f1-c2-fc47", subjectId: "sejarah", form: "Form 1", front: "Apakah perubahan cuaca pada Zaman Pliosen selain penyejukan?", back: "Suhu bumi menjadi sedikit kering." },
  { id: "sej-f1-c2-fc48", subjectId: "sejarah", form: "Form 1", front: "Apakah maksud pengglasieran pada Zaman Pleistosen?", back: "Proses di mana bumi dilitupi lapisan air batu yang tebal." },
  { id: "sej-f1-c2-fc49", subjectId: "sejarah", form: "Form 1", front: "Bagaimanakah keadaan tumbuhan apabila suhu terlalu sejuk?", back: "Hanya rumput dan tumbuhan renek yang menjalar dapat tumbuh." },
  { id: "sej-f1-c2-fc50", subjectId: "sejarah", form: "Form 1", front: "Apakah aktiviti manusia yang berkembang pada Zaman Holosen?", back: "Aktiviti pertanian dan penternakan." },
  { id: "sej-f1-c2-fc51", subjectId: "sejarah", form: "Form 1", front: "Di manakah letaknya Lautan Artik?", back: "Di bahagian paling utara bumi." },
  { id: "sej-f1-c2-fc52", subjectId: "sejarah", form: "Form 1", front: "Mengapakah manusia Zaman Air Batu hidup secara nomad?", back: "Untuk mencari kawasan yang lebih panas dan sumber makanan yang mencukupi." },
  { id: "sej-f1-c2-fc53", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan pencairan air batu terhadap daratan rendah?", back: "Kawasan daratan rendah tenggelam dan membentuk selat atau teluk." },
  { id: "sej-f1-c2-fc54", subjectId: "sejarah", form: "Form 1", front: "Benua manakah yang dilitupi ais tebal sehingga kini?", back: "Antartika." },
  { id: "sej-f1-c2-fc55", subjectId: "sejarah", form: "Form 1", front: "Apakah punca semula jadi utama peningkatan suhu bumi?", back: "Radiasi matahari." },
  { id: "sej-f1-c2-fc56", subjectId: "sejarah", form: "Form 1", front: "Apakah nama daratan yang menghubungkan Asia Tenggara dahulu?", back: "Pentas Sunda." },
  { id: "sej-f1-c2-fc57", subjectId: "sejarah", form: "Form 1", front: "Mengapakah bahasa masyarakat di Malaysia dan Indonesia hampir sama?", back: "Kerana mereka berkongsi tamadun di daratan Pentas Sunda yang sama sebelum dipisahkan oleh kenaikan paras laut." },
  { id: "sej-f1-c2-fc58", subjectId: "sejarah", form: "Form 1", front: "Apakah kesan akhir Zaman Air Batu terhadap mamalia besar?", back: "Kepupusan spesies seperti mamot akibat kegagalan menyesuaikan diri dengan suhu panas." },
  { id: "sej-f1-c2-fc59", subjectId: "sejarah", form: "Form 1", front: "Zaman manakah yang menyaksikan kemunculan tamadun tersusun?", back: "Zaman Holosen." },
  { id: "sej-f1-c2-fc60", subjectId: "sejarah", form: "Form 1", front: "Mengapakah penting memahami pembentukan fizikal bumi?", back: "Untuk memahami evolusi alam sekitar dan kepentingan menjaga ekosistem dunia." },
];

export interface SejarahChapter {
  num: number;
  title: string;
  available: boolean;
  isNew?: boolean;
}

export const sejarahForm1Chapters: SejarahChapter[] = [
  { num: 1, title: "Mengenali Sejarah", available: true },
  { num: 2, title: "Zaman Air Batu", available: true, isNew: true },
  { num: 3, title: "Zaman Prasejarah", available: false },
  { num: 4, title: "Mengenali Tamadun", available: false },
  { num: 5, title: "Tamadun Awal Dunia", available: false },
  { num: 6, title: "Tamadun Yunani dan Tamadun Rom", available: false },
  { num: 7, title: "Tamadun India dan China", available: false },
  { num: 8, title: "Tamadun Islam", available: false },
];

export function sejarahChapterFromId(id: string): number | null {
  const m = id.match(/^sej-f1-c(\d+)-/);
  return m ? parseInt(m[1], 10) : null;
}

export interface ChapterItem {
  key: string;
  label: string;
  available: boolean;
  isNew?: boolean;
}

const otherSubjectChapters: Record<string, ChapterItem[]> = {
  bm: [{ key: "Bab 2", label: "Bab 2: Kata Adjektif", available: true }],
  english: [{ key: "Unit 3", label: "Unit 3: Present Perfect Tense", available: true }],
  math: [
    { key: "Chapter 1", label: "Chapter 1: Rational Numbers", available: true },
    { key: "Chapter 3", label: "Chapter 3: Algebraic Expressions", available: true },
    { key: "Chapter 5", label: "Chapter 5: Pythagoras' Theorem", available: true },
  ],
  science: [
    { key: "Chapter 2", label: "Chapter 2: Cells & Living Things", available: true },
    { key: "Chapter 5", label: "Chapter 5: Electricity", available: true },
  ],
  geography: [{ key: "Chapter 1", label: "Chapter 1: Map Reading", available: true }],
};

export function getSubjectChapters(subjectId: string): ChapterItem[] {
  if (subjectId === "sejarah") {
    return sejarahForm1Chapters.map((c) => ({
      key: `Chapter ${c.num}`,
      label: `Chapter ${c.num}: ${c.title}`,
      available: c.available,
      isNew: c.isNew,
    }));
  }
  return otherSubjectChapters[subjectId] ?? [];
}

export function getItemChapterKey(item: { id: string; subjectId: string; chapter?: string }): string | null {
  if (item.subjectId === "sejarah") {
    const n = sejarahChapterFromId(item.id);
    return n ? `Chapter ${n}` : null;
  }
  return item.chapter ?? null;
}

export const badges = [
  { id: "starter", name: "First Steps", emoji: "🚀", desc: "Complete your first quiz" },
  { id: "streak3", name: "On Fire", emoji: "🔥", desc: "3-day streak" },
  { id: "scholar", name: "Scholar", emoji: "🎓", desc: "Earn 500 XP" },
  { id: "master", name: "Quiz Master", emoji: "🏆", desc: "Score 100% on a Hard quiz" },
];
