import type { QuizQuestion } from "./types";

// ─── BM Tingkatan 1 — Kuiz Objektif UASA Kertas 1 Bahagian A ─────────────────
// Struktur: 15 soalan mengikut format UASA sebenar
//   S1      — Gambar + kelas kata
//   S2–S4   — Lengkapkan ayat
//   S5      — Pilih ayat betul (format I/II/III/IV)
//   S6      — Maksud perkataan
//   S7      — Peribahasa / bandingan semacam
//   S8–S9   — Pilih ayat gramatis (format I/II/III/IV)
//   S10     — Kesalahan bahasa + pembetulan
//   S11–S15 — Pemahaman petikan / KOMSAS

// ─── SET 1 ────────────────────────────────────────────────────────────────────
export const bmF1ObjektifKuiz1: QuizQuestion[] = [
  // S1 — Gambar + kelas kata
  {
    id: "bm-f1-obj1-q01",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Rajah menunjukkan seorang pelajar sedang membaca buku di perpustakaan.\n\nApakah kata kerja yang paling sesuai berdasarkan rajah tersebut?",
    options: ["Membeli", "Membaca", "Menulis", "Mencari"],
    answerIndex: 1,
    explanation:
      "'Membaca' ialah kata kerja yang menggambarkan perbuatan pelajar dalam rajah — iaitu melihat dan memahami teks dalam buku.",
  },
  // S2 — Lengkapkan ayat
  {
    id: "bm-f1-obj1-q02",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih perkataan yang paling sesuai untuk melengkapkan ayat di bawah.\n\nAman _____ buku itu dengan cermat sebelum menjawab soalan.",
    options: ["membeli", "membaca", "mengguna", "menyimpan"],
    answerIndex: 1,
    explanation:
      "Kata kerja 'membaca' sesuai dengan konteks 'buku' dan 'menjawab soalan'. Membaca buku adalah langkah yang logik sebelum menjawab soalan.",
  },
  // S3 — Lengkapkan ayat
  {
    id: "bm-f1-obj1-q03",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata yang paling sesuai untuk melengkapkan ayat di bawah.\n\nGunung Kinabalu merupakan gunung yang paling _____ di Malaysia.",
    options: ["dalam", "lebar", "tinggi", "panjang"],
    answerIndex: 2,
    explanation:
      "Kata adjektif 'tinggi' sesuai untuk menggambarkan gunung kerana gunung diukur berdasarkan ketinggiannya dari aras laut.",
  },
  // S4 — Lengkapkan ayat
  {
    id: "bm-f1-obj1-q04",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata hubung yang paling sesuai untuk melengkapkan ayat di bawah.\n\nDia rajin belajar _____ mendapat keputusan cemerlang dalam peperiksaan.",
    options: ["walaupun", "tetapi", "lalu", "sehingga"],
    answerIndex: 3,
    explanation:
      "'Sehingga' ialah kata hubung hasil yang menunjukkan akibat atau natijah. Rajin belajar menghasilkan keputusan cemerlang — hubungan sebab-akibat.",
  },
  // S5 — Pilih ayat dengan penggunaan perkataan berhuruf condong yang betul (I/II/III/IV)
  {
    id: "bm-f1-obj1-q05",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang menggunakan perkataan *memandangkan* dengan betul.\n\nI.   Memandangkan hujan turun, kami berteduh di bawah pokok.\nII.  Dia memandangkan televisyen setiap malam.\nIII. Kami pergi ke pasar memandangkan itu.\nIV.  Memandangkan dia seorang pelajar, buku adalah alat penting.",
    options: ["I dan II", "I dan IV", "II dan III", "III dan IV"],
    answerIndex: 1,
    explanation:
      "'Memandangkan' berfungsi sebagai kata hubung keterangan sebab yang bermaksud 'oleh sebab' atau 'disebabkan'. Ayat I dan IV menggunakannya dengan betul sebagai pembuka klausa sebab. Ayat II silap menggunakannya sebagai kata kerja (sepatutnya 'menonton').",
  },
  // S6 — Maksud perkataan
  {
    id: "bm-f1-obj1-q06",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud perkataan *gigih* dalam ayat di bawah?\n\n'Pelajar itu gigih berlatih walaupun keletihan.'",
    options: ["Malas dan tidak bersemangat", "Tekun dan bersungguh-sungguh", "Lambat dan tidak peduli", "Cepat tetapi tidak teliti"],
    answerIndex: 1,
    explanation:
      "'Gigih' bermaksud tekun, bersungguh-sungguh, dan tidak mudah berputus asa dalam melakukan sesuatu perkara.",
  },
  // S7 — Peribahasa
  {
    id: "bm-f1-obj1-q07",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud peribahasa 'bersatu teguh, bercerai roboh'?",
    options: [
      "Perpaduan menjadikan sesuatu kumpulan kuat dan berjaya",
      "Berpisah adalah lebih baik daripada bersama",
      "Seseorang yang kuat tidak memerlukan bantuan",
      "Bangunan kukuh tidak mudah roboh",
    ],
    answerIndex: 0,
    explanation:
      "Peribahasa ini bermaksud apabila bersatu padu, sesuatu kumpulan akan menjadi kuat. Apabila berpecah, mudah ditewaskan. Nilai yang terkandung: perpaduan dan semangat bekerjasama.",
  },
  // S8 — Pilih ayat yang betul (I/II/III/IV)
  {
    id: "bm-f1-obj1-q08",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi tatabahasa.\n\nI.   Buku-buku itu telah disusun oleh Ali dengan kemas.\nII.  Buku itu telah disusunkan oleh Ali dengan kemas.\nIII. Ali menyusun buku-buku itu dengan kemas.\nIV.  Ali menyusunkan buku-buku dengan kemas itu.",
    options: ["I dan II", "I dan III", "II dan IV", "III dan IV"],
    answerIndex: 1,
    explanation:
      "Ayat I betul: kata nama jamak 'buku-buku' + kata kerja pasif 'disusun' + ayat lengkap. Ayat III betul: kata kerja aktif 'menyusun' + objek 'buku-buku itu' + keterangan 'dengan kemas'. Ayat II salah (imbuhan -kan tidak sesuai). Ayat IV susunan keterangan salah.",
  },
  // S9 — Pilih ayat yang betul (I/II/III/IV)
  {
    id: "bm-f1-obj1-q09",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi penggunaan kata ganti nama.\n\nI.   Mereka berdua pergi ke pasar semalam.\nII.  Kami semua telah makan tengahari.\nIII. Dia-dia yang menang pertandingan itu.\nIV.  Beliau berasal dari kampung mereka.",
    options: ["I dan II", "I dan III", "II dan IV", "III dan IV"],
    answerIndex: 0,
    explanation:
      "Ayat I dan II betul. 'Mereka berdua' dan 'kami semua' menggunakan kata ganti nama yang gramatis. Ayat III salah — 'dia-dia' bukan kata ganti nama yang betul. Ayat IV salah — 'beliau' tidak boleh digunakan untuk diri sendiri dalam konteks ini.",
  },
  // S10 — Kesalahan bahasa
  {
    id: "bm-f1-obj1-q10",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Kenal pasti kesalahan dalam ayat di bawah dan pilih pembetulan yang betul.\n\n'Ibu bapa murid-murid itu datang ke sekolah untuk *berbincang* tentang kemajuan *anak-anak mereka* dengan *guru-guru*.'",
    options: [
      "Tiada kesalahan — ayat ini sudah betul",
      "Ganti 'berbincang' dengan 'membincangkan'",
      "Ganti 'anak-anak mereka' dengan 'anak mereka'",
      "Ganti 'guru-guru' dengan 'para guru'",
    ],
    answerIndex: 1,
    explanation:
      "'Berbincang' ialah kata kerja tak transitif. Apabila ada objek ('kemajuan anak-anak mereka'), kata kerja transitif 'membincangkan' perlu digunakan. Contoh betul: 'berbincang tentang...' atau 'membincangkan kemajuan...'.",
  },

  // ─── S11–S15: Petikan Pemahaman ──────────────────────────────────────────
  // Petikan: Budaya membaca dalam kalangan pelajar
  {
    id: "bm-f1-obj1-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Baca petikan di bawah, kemudian jawab soalan 11 hingga 15.\n\n───\nBudaya membaca dalam kalangan pelajar di negara kita masih berada pada tahap yang membimbangkan. Kajian menunjukkan bahawa pelajar di Malaysia membaca kurang daripada dua buah buku setahun di luar sukatan pelajaran. Keadaan ini amat berbeza dengan negara-negara maju yang menjadikan membaca sebagai amalan harian.\n\nTerdapat pelbagai faktor yang menyebabkan pelajar tidak gemar membaca. Antaranya ialah pengaruh media sosial yang menyita masa mereka. Selain itu, kurangnya koleksi buku yang menarik di perpustakaan sekolah turut menjadi punca masalah ini.\n\nUsaha untuk memupuk budaya membaca hendaklah bermula dari rumah. Ibu bapa memainkan peranan penting dalam mendedahkan anak-anak kepada buku sejak usia muda. Guru pula harus mencadangkan bahan bacaan yang sesuai dengan minat pelajar. Dengan kerjasama semua pihak, budaya membaca dapat ditingkatkan dalam kalangan generasi muda.\n───\n\nApakah isu utama yang dibincangkan dalam petikan di atas?",
    options: [
      "Masalah kemiskinan dalam kalangan pelajar",
      "Tahap budaya membaca pelajar di Malaysia yang rendah",
      "Kepentingan media sosial kepada pelajar",
      "Kekurangan guru yang berkelayakan di sekolah",
    ],
    answerIndex: 1,
    explanation:
      "Petikan membincangkan budaya membaca yang masih berada pada tahap membimbangkan. Fakta 'kurang daripada dua buah buku setahun' mengesahkan bahawa isu utama ialah tahap budaya membaca yang rendah.",
  },
  {
    id: "bm-f1-obj1-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Berdasarkan petikan, apakah faktor yang menyebabkan pelajar tidak gemar membaca?",
    options: [
      "Kekurangan masa belajar di sekolah",
      "Pengaruh media sosial dan kurangnya koleksi buku menarik",
      "Harga buku yang terlalu mahal",
      "Ibu bapa yang tidak mengizinkan anak membaca",
    ],
    answerIndex: 1,
    explanation:
      "Petikan menyatakan dua faktor: pengaruh media sosial yang menyita masa dan kurangnya koleksi buku menarik di perpustakaan sekolah.",
  },
  {
    id: "bm-f1-obj1-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Menurut petikan, siapakah yang memainkan peranan penting dalam memupuk budaya membaca anak-anak?",
    options: ["Rakan sebaya", "Ibu bapa", "Kerajaan", "Ketua kampung"],
    answerIndex: 1,
    explanation:
      "Petikan menyatakan dengan jelas: 'Ibu bapa memainkan peranan penting dalam mendedahkan anak-anak kepada buku sejak usia muda.'",
  },
  {
    id: "bm-f1-obj1-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud perkataan *memupuk* dalam petikan di atas?",
    options: ["Menghapuskan", "Menanam dan menggalakkan", "Mengurangkan", "Menggantikan"],
    answerIndex: 1,
    explanation:
      "'Memupuk' bermaksud menanam, menggalakkan, dan membina sesuatu secara berterusan sehingga ia berkembang. Dalam konteks petikan, memupuk budaya membaca bermaksud menggalakkan dan membina tabiat membaca.",
  },
  {
    id: "bm-f1-obj1-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah cadangan yang diberikan dalam petikan untuk mengatasi masalah budaya membaca yang rendah?",
    options: [
      "Menutup semua platform media sosial",
      "Membeli lebih banyak buku untuk setiap pelajar",
      "Kerjasama ibu bapa dan guru dalam memupuk minat membaca",
      "Mengadakan peperiksaan tentang buku-buku pilihan",
    ],
    answerIndex: 2,
    explanation:
      "Petikan mencadangkan kerjasama semua pihak — ibu bapa mendedahkan anak kepada buku dari kecil, dan guru mencadangkan bahan bacaan yang sesuai dengan minat pelajar.",
  },
];

// ─── SET 2 ────────────────────────────────────────────────────────────────────
export const bmF1ObjektifKuiz2: QuizQuestion[] = [
  // S1 — Gambar + kelas kata
  {
    id: "bm-f1-obj2-q01",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Rajah menunjukkan sekumpulan murid sedang bergotong-royong membersihkan kawasan sekolah.\n\nApakah kata adjektif yang paling sesuai untuk menggambarkan suasana dalam rajah tersebut?",
    options: ["Kotor", "Gembirا", "Rajin", "Sunyi"],
    answerIndex: 2,
    explanation:
      "'Rajin' ialah kata adjektif yang menggambarkan sikap murid yang bekerja keras semasa bergotong-royong. Kata adjektif menerangkan sifat atau keadaan.",
  },
  // S2 — Lengkapkan ayat
  {
    id: "bm-f1-obj2-q02",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih perkataan yang paling sesuai untuk melengkapkan ayat di bawah.\n\nMereka _____ peranan masing-masing dalam persembahan itu dengan bersungguh-sungguh.",
    options: ["memiliki", "memainkan", "mendapat", "melakukan"],
    answerIndex: 1,
    explanation:
      "'Memainkan peranan' ialah frasa tetap dalam bahasa Melayu yang bermaksud menjalankan tugas atau tanggungjawab tertentu. Kolokasi yang betul ialah 'memainkan peranan'.",
  },
  // S3 — Lengkapkan ayat
  {
    id: "bm-f1-obj2-q03",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata yang paling sesuai untuk melengkapkan ayat di bawah.\n\nAyah saya bekerja sebagai _____ di hospital kerajaan.",
    options: ["petani", "doktor", "peniaga", "nelayan"],
    answerIndex: 1,
    explanation:
      "Berdasarkan konteks 'bekerja di hospital kerajaan', jawapan yang paling sesuai ialah 'doktor' kerana doktor bekerja di hospital.",
  },
  // S4 — Lengkapkan ayat
  {
    id: "bm-f1-obj2-q04",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata sendi yang paling sesuai untuk melengkapkan ayat di bawah.\n\nBuku itu diletakkan _____ atas meja oleh adik.",
    options: ["ke", "di", "dari", "pada"],
    answerIndex: 1,
    explanation:
      "Kata sendi 'di' digunakan untuk menunjukkan tempat atau lokasi sesuatu objek berada (keadaan statik). 'Ke' pula menunjukkan arah pergerakan. Dalam ayat ini, buku sudah berada di atas meja, maka 'di' adalah betul.",
  },
  // S5 — Pilih ayat dengan penggunaan perkataan berhuruf condong yang betul
  {
    id: "bm-f1-obj2-q05",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang menggunakan perkataan *daripada* dengan betul.\n\nI.   Baju ini diperbuat daripada kain sutera.\nII.  Dia lebih pandai daripada saya.\nIII. Kami pergi daripada pasar tadi.\nIV.  Hadiah itu diterima daripada guru.",
    options: ["I, II dan IV", "I dan III sahaja", "II dan III sahaja", "III dan IV sahaja"],
    answerIndex: 0,
    explanation:
      "'Daripada' digunakan untuk: (1) membandingkan — 'lebih pandai daripada'; (2) menyatakan asal bahan — 'diperbuat daripada'; (3) menyatakan sumber pemberi — 'diterima daripada guru'. Ayat III salah — 'dari pasar' (bukan 'daripada') digunakan untuk menunjukkan tempat asal perjalanan.",
  },
  // S6 — Maksud perkataan
  {
    id: "bm-f1-obj2-q06",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud perkataan *canggih* dalam ayat di bawah?\n\n'Teknologi yang canggih membantu para doktor mendiagnosis penyakit dengan lebih tepat.'",
    options: ["Murah dan mudah didapati", "Maju dan kompleks", "Lama dan lapuk", "Besar dan berat"],
    answerIndex: 1,
    explanation:
      "'Canggih' bermaksud maju, kompleks, dan berada pada tahap yang tinggi dari segi teknologi atau kemahiran. Ia sering digunakan untuk merujuk kepada peralatan atau teknologi terkini.",
  },
  // S7 — Bandingan semacam (simile)
  {
    id: "bm-f1-obj2-q07",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud bandingan semacam 'bagai aur dengan tebing'?",
    options: [
      "Dua orang yang sering bergaduh",
      "Dua pihak yang saling bergantung dan menyokong antara satu sama lain",
      "Seseorang yang suka berdikari",
      "Hubungan antara guru dengan murid",
    ],
    answerIndex: 1,
    explanation:
      "'Bagai aur dengan tebing' menggambarkan dua pihak yang saling memerlukan dan menyokong. Aur (buluh) tumbuh di tebing dan menguatkan tebing, manakala tebing pula menjadi tempat aur berdiri kukuh — melambangkan hubungan saling bergantung.",
  },
  // S8 — Pilih ayat gramatis
  {
    id: "bm-f1-obj2-q08",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi tatabahasa.\n\nI.   Para pelajar-pelajar hadir ke majlis itu.\nII.  Semua pelajar hadir ke majlis itu.\nIII. Pelajar-pelajar hadir ke majlis itu.\nIV.  Para pelajar hadir ke majlis itu.",
    options: ["I dan II", "II dan III", "II, III dan IV", "I dan IV"],
    answerIndex: 2,
    explanation:
      "'Para pelajar-pelajar' (Ayat I) adalah salah kerana 'para' dan kata nama jamak berganda tidak boleh digunakan serentak. Ayat II, III, dan IV adalah betul: 'semua pelajar', 'pelajar-pelajar', dan 'para pelajar' masing-masing ialah cara yang gramatis untuk merujuk kepada kumpulan.",
  },
  // S9 — Pilih ayat gramatis
  {
    id: "bm-f1-obj2-q09",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi penggunaan imbuhan.\n\nI.   Ibu memasak nasi lemak untuk sarapan pagi.\nII.  Adik mempermain-mainkan kucing itu sehingga menangis.\nIII. Dia mengambilkan buku itu dari dalam laci.\nIV.  Mereka berlari-lari anak di padang.",
    options: ["I dan IV", "I dan II", "II dan III", "III dan IV"],
    answerIndex: 0,
    explanation:
      "Ayat I betul: 'memasak' + objek langsung 'nasi lemak'. Ayat IV betul: 'berlari-lari anak' ialah frasa kata kerja yang tepat. Ayat II salah ('menangis' tiada subjek jelas). Ayat III salah: 'mengambilkan' memerlukan objek penerima (siapakah yang menerima?).",
  },
  // S10 — Kesalahan bahasa
  {
    id: "bm-f1-obj2-q10",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Kenal pasti kesalahan dalam ayat di bawah dan pilih pembetulan yang betul.\n\n'Murid-murid *mesti* mematuhi *peraturan-peraturan* sekolah *supaya* suasana belajar menjadi kondusif.'",
    options: [
      "Tiada kesalahan — ayat ini sudah betul",
      "Ganti 'mesti' dengan 'perlu'",
      "Ganti 'peraturan-peraturan' dengan 'segala peraturan'",
      "Ganti 'supaya' dengan 'kerana'",
    ],
    answerIndex: 0,
    explanation:
      "Ayat ini sudah betul dari segi tatabahasa. 'Mesti' digunakan dengan betul sebagai kata modaliti yang menunjukkan kewajipan. 'Peraturan-peraturan' adalah jamak berganda yang sah. 'Supaya' adalah kata hubung tujuan yang sesuai.",
  },

  // ─── S11–S15: Petikan Pemahaman ──────────────────────────────────────────
  // Petikan: Kepentingan sukan kepada pelajar
  {
    id: "bm-f1-obj2-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Baca petikan di bawah, kemudian jawab soalan 11 hingga 15.\n\n───\nSukan memainkan peranan penting dalam kehidupan pelajar. Melalui sukan, pelajar bukan sahaja dapat mengekalkan kesihatan fizikal, malah turut membina sahsiah yang mulia. Semangat berpasukan, disiplin diri, dan ketabahan hati adalah antara nilai murni yang dipupuk melalui aktiviti sukan.\n\nWalaupun sukan penting, segelintir pelajar mengabaikan pelajaran demi sukan. Keadaan ini berlaku apabila pelajar tidak dapat mengimbangi antara kedua-dua aspek tersebut. Oleh sebab itu, pelajar perlu bijak mengurus masa supaya pencapaian akademik dan kecemerlangan sukan dapat dicapai serentak.\n\nSekolah dan ibu bapa seharusnya membimbing pelajar dalam pengurusan masa. Jadual yang tersusun dan sokongan yang berterusan akan membantu pelajar menguasai kemahiran seimbang ini. Ingatlah, bukan sukar untuk menjadi pelajar yang cemerlang dalam akademik dan sukan serentak.\n───\n\nApakah isu utama yang dibincangkan dalam petikan di atas?",
    options: [
      "Masalah pelajar yang malas bersukan",
      "Kepentingan sukan dan cara mengimbanginya dengan pelajaran",
      "Cara menjadi atlet profesional",
      "Peranan guru dalam mengajar sukan",
    ],
    answerIndex: 1,
    explanation:
      "Petikan membincangkan kepentingan sukan kepada pelajar dan keperluan mengimbangi sukan dengan pelajaran. Tema utama ialah keseimbangan antara sukan dan akademik.",
  },
  {
    id: "bm-f1-obj2-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Berdasarkan petikan, apakah nilai murni yang dapat dipupuk melalui sukan?",
    options: [
      "Kesombongan, kejayaan, dan kekayaan",
      "Semangat berpasukan, disiplin diri, dan ketabahan hati",
      "Kebolehan, kecerdasan, dan kreativiti",
      "Keberanian, kebebasan, dan kemewahan",
    ],
    answerIndex: 1,
    explanation:
      "Petikan menyatakan dengan jelas: 'Semangat berpasukan, disiplin diri, dan ketabahan hati adalah antara nilai murni yang dipupuk melalui aktiviti sukan.'",
  },
  {
    id: "bm-f1-obj2-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Menurut petikan, apakah yang menyebabkan segelintir pelajar mengabaikan pelajaran demi sukan?",
    options: [
      "Guru tidak memberi perhatian kepada pelajaran",
      "Ibu bapa yang memaksa anak bersukan",
      "Pelajar tidak dapat mengimbangi antara sukan dan pelajaran",
      "Jadual sukan yang terlalu padat ditetapkan sekolah",
    ],
    answerIndex: 2,
    explanation:
      "Petikan menyatakan: 'Keadaan ini berlaku apabila pelajar tidak dapat mengimbangi antara kedua-dua aspek tersebut' — merujuk kepada sukan dan pelajaran.",
  },
  {
    id: "bm-f1-obj2-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud perkataan *mengimbangi* dalam petikan di atas?",
    options: ["Memilih salah satu daripada dua perkara", "Menyeimbangkan dua atau lebih perkara", "Meninggalkan semua aktiviti", "Menambahkan beban kerja"],
    answerIndex: 1,
    explanation:
      "'Mengimbangi' bermaksud menyeimbangkan atau membahagi-bahagikan perhatian, masa, atau usaha secara saksama antara dua perkara atau lebih.",
  },
  {
    id: "bm-f1-obj2-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah cadangan yang diberikan dalam petikan untuk membantu pelajar mengimbangi sukan dan pelajaran?",
    options: [
      "Pelajar harus berhenti bersukan sepenuhnya",
      "Sekolah perlu kurangkan waktu sukan",
      "Bimbingan sekolah dan ibu bapa serta jadual yang tersusun",
      "Pelajar perlu memilih antara sukan atau akademik",
    ],
    answerIndex: 2,
    explanation:
      "Petikan mencadangkan: 'Sekolah dan ibu bapa seharusnya membimbing pelajar dalam pengurusan masa. Jadual yang tersusun dan sokongan yang berterusan akan membantu pelajar.'",
  },
];

// ─── SET 3 ────────────────────────────────────────────────────────────────────
export const bmF1ObjektifKuiz3: QuizQuestion[] = [
  // S1 — Gambar + kelas kata
  {
    id: "bm-f1-obj3-q01",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Rajah menunjukkan seorang petani sedang menanam padi di sawah pada waktu pagi.\n\nApakah kata nama yang paling sesuai berdasarkan rajah tersebut?",
    options: ["Sawah", "Berlari", "Hijau", "Banyak"],
    answerIndex: 0,
    explanation:
      "'Sawah' ialah kata nama yang merujuk kepada tempat menanam padi. Kata nama ialah perkataan yang merujuk kepada manusia, haiwan, benda, tempat, atau konsep.",
  },
  // S2 — Lengkapkan ayat
  {
    id: "bm-f1-obj3-q02",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih perkataan yang paling sesuai untuk melengkapkan ayat di bawah.\n\nPelajar itu _____ hadiah daripada pengetua sekolah atas kejayaannya.",
    options: ["memberi", "menerima", "meminta", "menyimpan"],
    answerIndex: 1,
    explanation:
      "'Menerima hadiah' ialah kolokasi yang betul. Pelajar adalah penerima hadiah, dan pengetua adalah pemberi. Kata kerja 'menerima' menunjukkan tindakan mendapat sesuatu daripada orang lain.",
  },
  // S3 — Lengkapkan ayat
  {
    id: "bm-f1-obj3-q03",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata yang paling sesuai untuk melengkapkan ayat di bawah.\n\nJambatan itu _____ supaya kenderaan berat tidak dapat melaluinya.",
    options: ["dipanjangkan", "dilebarkan", "diperkukuhkan", "dihadkan"],
    answerIndex: 3,
    explanation:
      "'Dihadkan' bermaksud diberi had atau batasan. Konteks ayat menunjukkan jambatan tidak boleh dilalui kenderaan berat, maka akses 'dihadkan' adalah jawapan yang paling tepat.",
  },
  // S4 — Lengkapkan ayat
  {
    id: "bm-f1-obj3-q04",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih kata yang paling sesuai untuk melengkapkan ayat di bawah.\n\nWalaupun cuaca panas terik, _____ mereka tidak pernah luntur untuk menyelesaikan kerja itu.",
    options: ["semangat", "keletihan", "kemalasan", "ketakutan"],
    answerIndex: 0,
    explanation:
      "Konteks ayat menunjukkan sikap positif — 'tidak pernah luntur' bermakna tidak melemah. 'Semangat' adalah kata nama abstrak yang sesuai untuk menggambarkan tekad yang kuat.",
  },
  // S5 — Pilih ayat dengan penggunaan perkataan berhuruf condong yang betul
  {
    id: "bm-f1-obj3-q05",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang menggunakan perkataan *antara* dengan betul.\n\nI.   Perbincangan antara guru dan murid berlangsung dengan baik.\nII.  Dia antara yang terbaik dalam kelas.\nIII. Antara buah-buahan, dia suka mangga.\nIV.  Dia berdiri antara pokok itu.",
    options: ["I, II dan III", "I dan IV sahaja", "II dan IV sahaja", "III dan IV sahaja"],
    answerIndex: 0,
    explanation:
      "'Antara' digunakan untuk: (1) menunjukkan hubungan dua pihak — 'antara guru dan murid'; (2) menunjukkan seseorang dalam kumpulan — 'antara yang terbaik'; (3) membuat pilihan dalam kumpulan — 'antara buah-buahan'. Ayat IV salah — 'antara' tidak digunakan untuk menunjukkan posisi fizikal (gunakan 'di antara').",
  },
  // S6 — Maksud perkataan
  {
    id: "bm-f1-obj3-q06",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud perkataan *dedikasi* dalam ayat di bawah?\n\n'Cikgu Azlan dikenali atas dedikasi beliau dalam mendidik murid-murid yang lemah.'",
    options: ["Kelemahan dan kesilapan", "Keberanian menghadapi cabaran", "Kesetiaan dan kesungguhan dalam tugas", "Kebolehan dalam pelbagai bidang"],
    answerIndex: 2,
    explanation:
      "'Dedikasi' bermaksud pengabdian diri, kesetiaan, dan kesungguhan dalam melaksanakan tanggungjawab tanpa mengharapkan ganjaran berlebihan.",
  },
  // S7 — Peribahasa
  {
    id: "bm-f1-obj3-q07",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah maksud peribahasa 'alah bisa, tegal biasa'?",
    options: [
      "Seseorang yang telah biasa akan tidak merasakan kesukaran perkara itu lagi",
      "Seseorang yang gigih tidak akan kalah dalam pertandingan",
      "Kebiasaan yang buruk sukar untuk dihapuskan",
      "Setiap orang mempunyai kelemahan dan kekuatan masing-masing",
    ],
    answerIndex: 0,
    explanation:
      "'Alah bisa, tegal biasa' bermaksud sesuatu yang pada mulanya terasa sukar atau menyakitkan akan menjadi mudah dan tidak terasa apabila sudah biasa melakukannya. Ia menggalakkan sikap tekun dan berlatih.",
  },
  // S8 — Pilih ayat gramatis
  {
    id: "bm-f1-obj3-q08",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi tatabahasa.\n\nI.   Kami pergi ke Kuala Lumpur semasa cuti sekolah.\nII.  Dia pergi ke Kuala Lumpur dari cuti sekolah.\nIII. Mereka berangkat pada pagi Ahad yang lalu.\nIV.  Adik pulang di rumah selepas sekolah.",
    options: ["I dan II", "I dan III", "II dan III", "III dan IV"],
    answerIndex: 1,
    explanation:
      "Ayat I betul: 'ke Kuala Lumpur' (arah) + 'semasa cuti sekolah' (waktu). Ayat III betul: 'pada pagi Ahad' menggunakan kata sendi 'pada' yang tepat untuk waktu. Ayat II salah ('dari' tidak sesuai untuk waktu — gunakan 'semasa'). Ayat IV salah ('di rumah' sepatutnya 'ke rumah' kerana ada pergerakan).",
  },
  // S9 — Pilih ayat gramatis
  {
    id: "bm-f1-obj3-q09",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Pilih ayat yang betul dari segi penggunaan kata bantu.\n\nI.   Dia sudah makan sejak tadi.\nII.  Mereka sedang bermain bola di padang.\nIII. Kami akan pergi sudah esok.\nIV.  Adik belum tidur lagi malam ini.",
    options: ["I dan II", "I, II dan IV", "II dan III", "III dan IV"],
    answerIndex: 1,
    explanation:
      "Ayat I betul: 'sudah' + 'sejak tadi' menunjukkan perbuatan yang telah berlaku. Ayat II betul: 'sedang' menunjukkan perbuatan yang berlaku pada masa tersebut. Ayat IV betul: 'belum...lagi' ialah pasangan kata bantu yang gramatis. Ayat III salah: 'akan...sudah' ialah gabungan kata bantu yang bercanggah.",
  },
  // S10 — Kesalahan bahasa
  {
    id: "bm-f1-obj3-q10",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Kenal pasti kesalahan dalam ayat di bawah dan pilih pembetulan yang betul.\n\n'Dia *daripada* Johor Bahru dan kini *menetap* di *Kuala Lumpur* sejak sepuluh tahun yang lalu.'",
    options: [
      "Tiada kesalahan — ayat ini sudah betul",
      "Ganti 'daripada' dengan 'dari'",
      "Ganti 'menetap' dengan 'tinggalkan'",
      "Ganti 'di Kuala Lumpur' dengan 'ke Kuala Lumpur'",
    ],
    answerIndex: 1,
    explanation:
      "'Dari' digunakan untuk menunjukkan asal tempat seseorang (asal-usul atau titik permulaan perjalanan). 'Daripada' pula digunakan untuk perbandingan, sumber bukan manusia, atau asal bahan. 'Dia dari Johor Bahru' adalah betul.",
  },

  // ─── S11–S15: Pantun & Pemahaman ─────────────────────────────────────────
  // Pantun empat kerat untuk pemahaman
  {
    id: "bm-f1-obj3-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Baca pantun di bawah, kemudian jawab soalan 11 hingga 15.\n\n───\nBuah cempedak di luar pagar,\nAmbil galah tolong jolokkan;\nSaya budak baharu belajar,\nKalau salah tolong tunjukkan.\n───\n\nApakah tema pantun di atas?",
    options: [
      "Keberanian dan ketegasan",
      "Kerendahan hati dan kesediaan belajar",
      "Kesombongan dan kecuaian",
      "Kemarahan dan kekecewaan",
    ],
    answerIndex: 1,
    explanation:
      "Tema pantun ini ialah kerendahan hati (tawaduk) dan kesediaan belajar. Penutur mengakui dirinya masih baru belajar dan memohon tunjuk ajar jika melakukan kesilapan.",
  },
  {
    id: "bm-f1-obj3-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Dalam pantun di atas, apakah bahagian yang merupakan pembayang?",
    options: [
      "Saya budak baharu belajar / Kalau salah tolong tunjukkan",
      "Buah cempedak di luar pagar / Ambil galah tolong jolokkan",
      "Ambil galah tolong jolokkan / Saya budak baharu belajar",
      "Buah cempedak di luar pagar / Saya budak baharu belajar",
    ],
    answerIndex: 1,
    explanation:
      "Dalam pantun empat kerat, dua baris pertama adalah pembayang (bayangan), manakala dua baris terakhir adalah maksud. Pembayang ialah: 'Buah cempedak di luar pagar / Ambil galah tolong jolokkan.'",
  },
  {
    id: "bm-f1-obj3-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah nilai murni yang terdapat dalam pantun tersebut?",
    options: [
      "Keberanian dan kecekalan",
      "Kerendahan hati dan menghormati orang yang lebih tahu",
      "Kegigihan dan ketabahan diri",
      "Kejujuran dan keterbukaan fikiran",
    ],
    answerIndex: 1,
    explanation:
      "Nilai murni yang terkandung ialah kerendahan hati — penutur tidak berlagak tahu segalanya, malah meminta panduan. Ini juga mencerminkan sikap menghormati orang yang lebih berpengalaman.",
  },
  {
    id: "bm-f1-obj3-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Berapakah bilangan suku kata dalam baris pertama pantun tersebut?\n\n'Buah cempedak di luar pagar'",
    options: ["6 suku kata", "7 suku kata", "8 suku kata", "9 suku kata"],
    answerIndex: 2,
    explanation:
      "Bu-ah-cem-pe-dak-di-lu-ar = 8 suku kata. Pantun yang baik biasanya mengandungi 8 hingga 12 suku kata bagi setiap baris.",
  },
  {
    id: "bm-f1-obj3-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      "Apakah skema rima akhir pantun di atas?",
    options: ["aa-aa", "ab-ab", "aa-bb", "ab-ba"],
    answerIndex: 1,
    explanation:
      "Pantun empat kerat menggunakan skema rima ab-ab: baris 1 (pagar) berkait dengan baris 3 (belajar) — rima 'ar'; baris 2 (jolokkan) berkait dengan baris 4 (tunjukkan) — rima 'kan'. Ini adalah ciri utama pantun Melayu.",
  },
];
