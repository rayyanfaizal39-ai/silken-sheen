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
//   S11–S15 — KOMSAS Form 1 berdasarkan bahan: pantun, syair, sajak, drama

const SET_A_KOMSAS_BAHAN = `Baca pantun di bawah dengan teliti.

PANTUN NASIHAT

Pergi ke dusun memetik duku,
Singgah sebentar di tepi telaga;
Rajin membaca menambah ilmu,
Bekal berguna sepanjang usia.

Burung merpati terbang ke kota,
Hinggap berehat di dahan sena;
Hormati guru hormati ibu bapa,
Hidup berkat jiwa sempurna.`;

const SET_B_KOMSAS_BAHAN = `Baca sajak di bawah dengan teliti.

SAJAK: LANGKAH REMAJA

Di halaman sekolah kami berdiri,
Membawa impian setinggi awan,
Jika tersadung bangun kembali,
Ilmu dipeluk menjadi pedoman.

Rakan di sisi jangan dilupa,
Tangan dihulur ketika sukar,
Budi bahasa menjadi cahaya,
Menerangi jalan menuju benar.`;

const SET_C_KOMSAS_BAHAN = `Baca petikan drama di bawah dengan teliti.

DRAMA: AMANAH KELAS

FARIS: Duit tabung kelas ini mesti kita simpan dengan baik. Cikgu sudah memberi amanah kepada kita.

AINA: Betul. Walaupun tiada orang melihat, kita tetap perlu jujur.

RIZAL: Saya hampir menggunakan duit itu untuk membeli makanan tadi. Mujur kamu mengingatkan saya.

FARIS: Kita boleh lapar sebentar, tetapi jangan sesekali mengkhianati kepercayaan orang.

AINA: Esok kita serahkan tabung ini kepada cikgu bersama-sama.`;

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

  // ─── S11–S15: KOMSAS Form 1 ─────────────────────────────────────────────
  {
    id: "bm-f1-obj1-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_A_KOMSAS_BAHAN}\n\n11. Apakah maksud rangkai kata *bekal berguna* dalam pantun tersebut?`,
    options: [
      "Makanan yang dibawa ketika berjalan",
      "Ilmu yang dapat digunakan dalam kehidupan",
      "Hadiah yang diberikan oleh guru",
      "Barang yang disimpan di rumah",
    ],
    answerIndex: 1,
    explanation:
      "Dalam pantun, 'bekal berguna' merujuk kepada ilmu yang bermanfaat sepanjang usia.",
  },
  {
    id: "bm-f1-obj1-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_A_KOMSAS_BAHAN}\n\n12. Berdasarkan pantun tersebut, apakah faedah rajin membaca?`,
    options: [
      "Menambah ilmu",
      "Menjadi terkenal",
      "Mendapat hadiah",
      "Dapat pergi ke dusun",
    ],
    answerIndex: 0,
    explanation:
      "Baris 'Rajin membaca menambah ilmu' menyatakan faedah membaca secara langsung.",
  },
  {
    id: "bm-f1-obj1-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_A_KOMSAS_BAHAN}\n\n13. Apakah mesej rangkap kedua pantun tersebut?`,
    options: [
      "Kita hendaklah menghormati guru dan ibu bapa",
      "Kita hendaklah memetik buah di dusun",
      "Kita hendaklah berehat di dahan sena",
      "Kita hendaklah pergi ke kota setiap hari",
    ],
    answerIndex: 0,
    explanation:
      "Rangkap kedua menegaskan sikap menghormati guru dan ibu bapa supaya hidup diberkati.",
  },
  {
    id: "bm-f1-obj1-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_A_KOMSAS_BAHAN}\n\n14. Apakah nilai murni yang terdapat dalam pantun tersebut?`,
    options: ["Rajin menuntut ilmu", "Suka membazir masa", "Berani melawan nasihat", "Bangga diri"],
    answerIndex: 0,
    explanation:
      "Pantun menonjolkan nilai kerajinan menuntut ilmu melalui amalan membaca.",
  },
  {
    id: "bm-f1-obj1-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_A_KOMSAS_BAHAN}\n\n15. Rakan anda malas membaca buku. Apakah tindakan paling sesuai berdasarkan pengajaran pantun tersebut?`,
    options: [
      "Mengajaknya membaca bahan yang sesuai secara konsisten",
      "Mengejeknya kerana kurang membaca",
      "Menyuruhnya berhenti belajar",
      "Menyembunyikan buku-bukunya",
    ],
    answerIndex: 0,
    explanation:
      "Pantun menggalakkan amalan membaca kerana membaca menambah ilmu yang berguna dalam kehidupan.",
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

  // ─── S11–S15: KOMSAS Form 1 ─────────────────────────────────────────────
  {
    id: "bm-f1-obj2-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_B_KOMSAS_BAHAN}\n\n11. Apakah maksud rangkai kata *ilmu dipeluk* dalam sajak tersebut?`,
    options: [
      "Ilmu dijadikan pegangan hidup",
      "Buku dibawa ke mana-mana",
      "Awan dipeluk oleh remaja",
      "Rakan memegang tangan penyajak",
    ],
    answerIndex: 0,
    explanation:
      "Rangkai kata 'ilmu dipeluk' bermaksud ilmu dijadikan pegangan atau pedoman dalam kehidupan.",
  },
  {
    id: "bm-f1-obj2-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_B_KOMSAS_BAHAN}\n\n12. Berdasarkan sajak tersebut, apakah yang perlu dilakukan jika tersadung?`,
    options: [
      "Bangun kembali",
      "Melupakan impian",
      "Menjauhi rakan",
      "Berhenti belajar",
    ],
    answerIndex: 0,
    explanation:
      "Jawapan terdapat pada baris 'Jika tersadung bangun kembali'.",
  },
  {
    id: "bm-f1-obj2-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_B_KOMSAS_BAHAN}\n\n13. Apakah mesej yang disampaikan dalam rangkap kedua sajak tersebut?`,
    options: [
      "Kita hendaklah membantu rakan dan berbudi bahasa",
      "Kita hendaklah berjalan seorang diri",
      "Kita hendaklah mengejar awan",
      "Kita hendaklah melupakan sekolah",
    ],
    answerIndex: 0,
    explanation:
      "Rangkap kedua menyatakan rakan tidak harus dilupakan, tangan perlu dihulur ketika sukar dan budi bahasa menjadi cahaya.",
  },
  {
    id: "bm-f1-obj2-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_B_KOMSAS_BAHAN}\n\n14. Apakah nilai murni yang jelas dalam baris 'Tangan dihulur ketika sukar'?`,
    options: ["Tolong-menolong", "Mementingkan diri", "Putus asa", "Kesombongan"],
    answerIndex: 0,
    explanation:
      "Baris tersebut menggambarkan kesediaan membantu rakan yang menghadapi kesusahan.",
  },
  {
    id: "bm-f1-obj2-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_B_KOMSAS_BAHAN}\n\n15. Rakan anda gagal dalam pertandingan dan berasa kecewa. Apakah nasihat paling sesuai berdasarkan sajak tersebut?`,
    options: [
      "Bangun semula dan terus berusaha",
      "Berhenti menyertai semua pertandingan",
      "Menyalahkan rakan sepasukan",
      "Melupakan nasihat guru",
    ],
    answerIndex: 0,
    explanation:
      "Sajak menasihati remaja supaya bangun kembali apabila tersadung dan menjadikan ilmu sebagai pedoman.",
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

  // ─── S11–S15: KOMSAS Form 1 ─────────────────────────────────────────────
  {
    id: "bm-f1-obj3-q11",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_C_KOMSAS_BAHAN}\n\n11. Apakah maksud perkataan *amanah* dalam petikan drama tersebut?`,
    options: [
      "Kepercayaan atau tanggungjawab yang perlu dijaga",
      "Makanan yang hendak dibeli",
      "Tempat menyimpan buku",
      "Hadiah daripada rakan",
    ],
    answerIndex: 0,
    explanation:
      "Dalam drama, amanah merujuk kepada kepercayaan cikgu terhadap murid untuk menjaga duit tabung kelas.",
  },
  {
    id: "bm-f1-obj3-q12",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_C_KOMSAS_BAHAN}\n\n12. Mengapakah Faris menegaskan bahawa duit tabung kelas mesti disimpan dengan baik?`,
    options: [
      "Cikgu telah memberi amanah kepada mereka",
      "Faris mahu membeli makanan",
      "Aina menyuruh Faris menyembunyikannya",
      "Rizal tidak hadir ke sekolah",
    ],
    answerIndex: 0,
    explanation:
      "Faris menyatakan, 'Cikgu sudah memberi amanah kepada kita.'",
  },
  {
    id: "bm-f1-obj3-q13",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_C_KOMSAS_BAHAN}\n\n13. Apakah mesej utama petikan drama tersebut?`,
    options: [
      "Kita mestilah jujur ketika memegang amanah",
      "Kita boleh menggunakan duit kelas sesuka hati",
      "Kita hendaklah menyembunyikan kesalahan rakan",
      "Kita tidak perlu menyerahkan tabung kepada guru",
    ],
    answerIndex: 0,
    explanation:
      "Dialog Aina dan Faris menekankan kejujuran dan larangan mengkhianati kepercayaan orang.",
  },
  {
    id: "bm-f1-obj3-q14",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_C_KOMSAS_BAHAN}\n\n14. Apakah nilai murni yang ditunjukkan oleh Aina dalam petikan drama tersebut?`,
    options: ["Kejujuran", "Ketamakan", "Keangkuhan", "Kecuaian"],
    answerIndex: 0,
    explanation:
      "Aina berkata bahawa walaupun tiada orang melihat, mereka tetap perlu jujur.",
  },
  {
    id: "bm-f1-obj3-q15",
    subjectId: "bm",
    form: "Form 1",
    chapter: "Kertas 1 Bahagian A",
    lang: "bm",
    difficulty: "Medium",
    question:
      `${SET_C_KOMSAS_BAHAN}\n\n15. Jika anda berada di tempat Rizal, apakah tindakan paling wajar selepas sedar hampir melakukan kesalahan?`,
    options: [
      "Mengaku kesilapan dan menyerahkan tabung kepada cikgu",
      "Menggunakan duit itu secara senyap-senyap",
      "Menyalahkan Faris dan Aina",
      "Membuang tabung supaya tiada bukti",
    ],
    answerIndex: 0,
    explanation:
      "Tindakan paling wajar ialah jujur, mengakui kesilapan dan menjaga amanah yang diberikan.",
  },
];
