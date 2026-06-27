export interface GrammarType {
  name: string;
  definition: string;
  usage: string;
  examples: string[];
  note: string;
  mistake: string;
}

export interface GrammarQuiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  what: string;
  types: GrammarType[];
  memory: string;
  examples: string[];
  mistakes: Array<{ wrong: string; why: string }>;
  uasaTip: string;
  cikgu: string;
  quiz: GrammarQuiz[];
  focus: { objektif: boolean; sistemBahasa: boolean; penulisan: boolean; stars: number };
}

const j = (name: string, definition: string, usage: string, examples: string[], note: string, mistake: string): GrammarType =>
  ({ name, definition, usage, examples, note, mistake });
const q = (question: string, options: string[], answer: number, explanation: string): GrammarQuiz =>
  ({ question, options, answer, explanation });

export const BM_FORM2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "kata-ganti-nama-dan-akronim",
    title: "Kata Ganti Nama dan Akronim",
    what: "Kata ganti nama menggantikan nama supaya ayat tidak berulang. Akronim pula terbentuk daripada gabungan huruf atau suku kata beberapa perkataan.",
    types: [
      j("Kata Ganti Nama Diri", "Menggantikan nama orang.", "Pilih bentuk mengikut orang pertama, kedua atau ketiga serta situasi rasmi.", ["saya", "kami", "anda", "beliau"], "Kami tidak merangkumi pendengar, manakala kita merangkumi pendengar.", "Beliau hanya digunakan untuk manusia yang dihormati."),
      j("Kata Ganti Nama Tunjuk", "Menunjukkan benda, tempat atau perkara.", "Gunakan ini untuk yang dekat dan itu untuk yang lebih jauh.", ["ini", "itu", "sini", "situ", "sana"], "Sini, situ dan sana merujuk tempat.", "di sini ditulis terpisah kerana di ialah kata sendi nama."),
      j("Kata Ganti Nama Tanya", "Menggantikan unsur yang hendak ditanyakan.", "Padankan bentuk dengan orang, benda, sebab atau bilangan.", ["siapa", "apa", "mana", "berapa"], "Gunakan bentuk berpartikel dalam soalan rasmi jika sesuai.", "Siapakah nama kamu? kurang tepat; gunakan Apakah nama kamu?"),
      j("Akronim", "Singkatan yang dibaca sebagai satu perkataan.", "Eja mengikut bentuk yang telah diterima dalam bahasa Melayu.", ["Mara", "Perhilitan", "tadika", "cerpen"], "Huruf besar bergantung pada jenis nama yang diwakili.", "Jangan mencipta ejaan akronim sendiri tanpa bentuk yang mantap."),
    ],
    memory: "Ganti nama mengambil tempat nama; akronim memendekkan rangkai nama.",
    examples: ["kita", "beliau", "sana", "Mara", "tadika"],
    mistakes: [{ wrong: "Kami perlu bekerjasama, termasuk kamu.", why: "Jika pendengar turut terlibat, kata yang tepat ialah kita." }],
    uasaTip: "Diuji melalui pemilihan kata ganti nama yang sesuai dan pengecaman bentuk akronim.",
    cikgu: "Tanya dua perkara: siapa yang diganti, atau rangkai kata mana yang dipendekkan?",
    quiz: [
      q("Kata ganti nama yang merangkumi pendengar ialah...", ["kami", "kita", "mereka"], 1, "Kita merangkumi penutur dan pendengar."),
      q("Yang manakah akronim?", ["DBP", "tadika", "kg"], 1, "Tadika dibaca sebagai satu perkataan dan terbentuk daripada rangkai kata."),
      q("Kata yang sesuai untuk orang yang dihormati ialah...", ["dia", "beliau", "ianya"], 1, "Beliau digunakan bagi manusia yang dihormati."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kata-adjektif",
    title: "Kata Adjektif",
    what: "Kata adjektif menerangkan sifat atau keadaan sesuatu kata nama. Kata ini menjadi inti dalam frasa adjektif.",
    types: [
      j("Sifatan atau Keadaan", "Menerangkan sifat umum.", "Hadir selepas kata nama atau sebagai predikat.", ["rajin", "berani", "lemah"], "Boleh menerima kata penguat.", "Jangan keliru dengan kata kerja yang menerangkan perbuatan."),
      j("Warna, Ukuran dan Bentuk", "Menerangkan warna, saiz atau rupa.", "Pilih kategori berdasarkan ciri yang diterangkan.", ["biru", "tebal", "bulat"], "Kecil ialah ukuran; bulat ialah bentuk.", "Jangan mengelaskan lurus sebagai ukuran."),
      j("Waktu, Jarak dan Cara", "Menerangkan masa, kedudukan atau cara.", "Gunakan mengikut konteks ayat.", ["awal", "dekat", "perlahan"], "Satu perkataan boleh berubah fungsi mengikut konteks.", "Semalam ialah kata nama waktu, bukan kata adjektif waktu."),
      j("Perasaan dan Pancaindera", "Menerangkan emosi atau tanggapan deria.", "Gunakan berdasarkan perasaan, rasa, bau, bunyi, sentuhan atau pandangan.", ["rindu", "masin", "harum", "merdu"], "Konteks menentukan deria yang terlibat.", "Malu tergolong dalam adjektif perasaan, bukan sifatan umum."),
    ],
    memory: "Kata adjektif menjawab: bagaimana sifat atau keadaannya?",
    examples: ["amat rajin", "hijau", "agak jauh", "merdu"],
    mistakes: [{ wrong: "paling tercantik", why: "Paling dan awalan ter- sama-sama membawa maksud darjah penghabisan." }],
    uasaTip: "Kerap muncul sebagai soalan jenis adjektif, kata penguat dan pembetulan darjah penghabisan.",
    cikgu: "Cari perkataan yang ‘mewarnai’ orang, benda atau keadaan dalam ayat.",
    quiz: [
      q("‘Merdu’ ialah kata adjektif...", ["cara", "pancaindera", "jarak"], 1, "Merdu diterima melalui deria pendengaran."),
      q("Binaan yang tepat ialah...", ["paling terbaik", "terbaik sekali", "paling baik"], 2, "Paling baik menggunakan satu penanda penghabisan."),
      q("‘Hampir’ tergolong sebagai adjektif...", ["jarak", "waktu", "bentuk"], 0, "Hampir menerangkan jarak."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kata-prafrasa-dan-kata-pascakata",
    title: "Kata Prafrasa dan Kata Pascakata",
    what: "Kata prafrasa hadir sebelum frasa dan membawa tugas nahu tertentu. Kata pascakata hadir selepas perkataan untuk menegaskan atau membendakan unsur sebelumnya.",
    types: [
      j("Kata Bantu", "Membantu frasa kerja atau frasa adjektif dari segi masa dan ragam.", "Letakkan sebelum kata utama.", ["telah tiba", "sedang belajar", "mesti hadir"], "Kata bantu aspek dan ragam boleh hadir bersama dalam susunan yang sesuai.", "sedang telah belajar salah kerana susunan aspek bercanggah."),
      j("Kata Penguat", "Menguatkan maksud kata adjektif.", "Gunakan di hadapan, belakang atau secara bebas.", ["terlalu tinggi", "cantik sekali", "sangat indah"], "Kedudukan bergantung pada jenis penguat.", "agak cantik sekali menggunakan penguat secara berlebihan."),
      j("Kata Penegas", "Memberi penekanan pada bahagian ayat.", "Gunakan bentuk hadapan atau bentuk yang mengikuti kata.", ["Hanya Amir hadir.", "Dialah ketua.", "Dia pun datang."], "-lah, -kah dan -tah ditulis rapat.", "apa kah salah; ejaan yang betul ialah apakah."),
      j("Kata Nafi dan Kata Pemeri", "Menafikan atau menghubungkan subjek dengan predikat.", "Bukan untuk frasa nama/sendi; tidak untuk frasa kerja/adjektif. Ialah sebelum frasa nama; adalah sebelum frasa adjektif/sendi.", ["bukan guru", "tidak hadir", "ialah ketua", "adalah untuk murid"], "Kata pemeri tidak hadir sebelum kata kerja.", "Hadiah itu ialah untuk ibu salah; gunakan adalah."),
      j("Kata Pascakata -nya", "Bentuk -nya yang hadir selepas kata untuk tugas tertentu.", "Gunakan sebagai penegas atau pembenda mengikut konteks.", ["Sesungguhnya", "nampaknya", "lajunya"], "Fungsi -nya ditentukan oleh binaan ayat.", "Jangan anggap setiap -nya sebagai kata ganti nama diri."),
    ],
    memory: "Pra hadir sebelum frasa; pasca hadir selepas kata.",
    examples: ["telah", "sangat", "bukan", "ialah", "-nya"],
    mistakes: [{ wrong: "Dia bukan datang semalam.", why: "Frasa kerja dinafikan dengan tidak: Dia tidak datang semalam." }],
    uasaTip: "Biasanya diuji melalui pilihan kata bantu, penguat, penegas, nafi, pemeri dan fungsi -nya.",
    cikgu: "Lihat kedudukan dahulu—sebelum frasa atau selepas kata—kemudian tentukan tugasnya.",
    quiz: [
      q("Kata pemeri sebelum frasa nama ialah...", ["adalah", "ialah", "tidak"], 1, "Ialah hadir sebelum frasa nama."),
      q("Ayat yang tepat ialah...", ["Dia bukan rajin.", "Dia tidak rajin.", "Dia ialah rajin."], 1, "Tidak menafikan frasa adjektif."),
      q("Dalam ‘Dialah pemenang’, -lah ialah...", ["kata penegas", "kata nafi", "kata bantu"], 0, "-lah menegaskan unsur yang disertainya."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kata-kerja-transitif",
    title: "Kata Kerja Transitif",
    what: "Kata kerja transitif memerlukan objek untuk melengkapkan maksudnya. Objek itu terdiri daripada kata nama atau frasa nama.",
    types: [
      j("Kata Kerja Aktif Transitif", "Mengutamakan pelaku yang melakukan tindakan terhadap objek.", "Gunakan kata kerja berimbuhan meN- dan hadirkan objek selepasnya.", ["membaca novel", "menendang bola", "menghadiri mesyuarat"], "Ayat ini boleh ditukarkan kepada bentuk pasif.", "membincangkan tentang isu salah; gunakan membincangkan isu."),
      j("Kata Kerja Pasif", "Mengutamakan objek yang menerima tindakan.", "Letakkan objek asal di hadapan dan sesuaikan bentuk pasif dengan pelaku.", ["Novel itu dibaca oleh Hana.", "Tugasan itu saya siapkan."], "Pelaku pertama dan kedua menggunakan bentuk saya/kamu + kata kerja dasar.", "Tugasan itu disiapkan oleh saya kurang tepat dalam latihan transformasi; gunakan saya siapkan."),
      j("Kata Kerja Transitif Berapitan", "Kata kerja transitif yang menerima apitan tertentu.", "Pastikan objek dan makna apitan sesuai.", ["menghadiahkan ibu buku", "menghadiahi ibu sebuah buku", "memperlihatkan gambar"], "-kan dan -i boleh menghasilkan fokus makna yang berbeza.", "menghadiahkan ibu salah jika tiada benda yang dihadiahkan."),
    ],
    memory: "Transitif mesti ‘menyeberang’ kepada objek.",
    examples: ["menulis surat", "membaiki basikal", "menghadiri program"],
    mistakes: [{ wrong: "Mereka menjalankan.", why: "Menjalankan memerlukan objek untuk melengkapkan maksud." }],
    uasaTip: "Diuji melalui pengecaman objek, penggunaan imbuhan dan penukaran aktif-pasif.",
    cikgu: "Selepas kata kerja, tanya ‘apa?’; jawapan itulah calon objeknya.",
    quiz: [
      q("Yang manakah kata kerja transitif?", ["tersenyum", "membawa", "pulang"], 1, "Membawa memerlukan objek, contohnya membawa beg."),
      q("Ayat pasif yang tepat ialah...", ["Buku itu saya baca.", "Buku itu dibaca saya.", "Saya dibaca buku itu."], 0, "Pasif dengan pelaku pertama menggunakan saya + kata kerja dasar."),
      q("Objek dalam ‘Aina menyusun buku’ ialah...", ["Aina", "menyusun", "buku"], 2, "Buku menerima tindakan menyusun."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kata-ganda",
    title: "Kata Ganda",
    what: "Kata ganda terbentuk melalui pengulangan seluruh atau sebahagian kata dasar. Bentuk dan tanda sempangnya perlu mengikut ejaan baku.",
    types: [
      j("Kata Ganda Penuh", "Mengulang seluruh kata dasar.", "Gunakan tanda sempang antara unsur yang diulang.", ["buku-buku", "rumah-rumah"], "Boleh membawa maksud jamak atau kesamaan.", "buku buku salah kerana tanda sempang diperlukan."),
      j("Kata Ganda Separa", "Mengulang sebahagian kata dasar.", "Eja sebagai satu perkataan mengikut bentuk yang mantap.", ["lelaki", "dedaun", "bebola"], "Pengulangan biasanya melibatkan suku kata awal.", "le-laki salah; bentuk bakunya lelaki."),
      j("Kata Ganda Berentak", "Mengulang bunyi vokal atau konsonan mengikut rentak.", "Gunakan bentuk yang telah mantap.", ["kuih-muih", "lauk-pauk", "cerai-berai"], "Bukan semua pasangan perkataan ialah kata ganda.", "sampah-sarap salah; sampah sarap ialah rangkai kata yang dieja terpisah."),
      j("Kata Ganda Berimbuhan", "Bentuk gandaan yang menerima imbuhan.", "Kenal pasti kata dasar dan imbuhan yang digunakan.", ["tolong-menolong", "buah-buahan", "berlari-lari"], "Imbuhan boleh hadir pada satu atau kedua-dua unsur mengikut bentuk.", "buah-buah-an salah; eja buah-buahan."),
    ],
    memory: "Penuh ulang semua; separa ulang sedikit; berentak ulang bunyi.",
    examples: ["murid-murid", "pepohon", "sayur-mayur", "bersalam-salaman"],
    mistakes: [{ wrong: "semua murid-murid", why: "Semua dan murid-murid menghasilkan penanda jamak berganda." }],
    uasaTip: "Kerap diuji melalui jenis gandaan, tanda sempang dan kelewahan jamak.",
    cikgu: "Jangan percaya bunyi sahaja—semak sama ada kedua-dua unsur benar-benar membentuk gandaan.",
    quiz: [
      q("Yang manakah kata ganda separa?", ["dedaun", "daun-daun", "kuih-muih"], 0, "Dedaun mengulang sebahagian kata dasar daun."),
      q("Ejaan yang betul ialah...", ["buah-buah-an", "buah buahan", "buah-buahan"], 2, "Buah-buahan ialah kata ganda berimbuhan yang baku."),
      q("Ayat dengan jamak berganda ialah...", ["Semua murid hadir.", "Murid-murid hadir.", "Semua murid-murid hadir."], 2, "Dua penanda jamak digunakan serentak."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "imbuhan-apitan-kata-nama",
    title: "Imbuhan Apitan Kata Nama",
    what: "Apitan kata nama hadir serentak di hadapan dan belakang kata dasar untuk membentuk kata nama terbitan. Bentuk apitan menentukan makna kata yang terhasil.",
    types: [
      j("peN-...-an", "Membentuk kata nama yang berkaitan proses, hasil atau tempat.", "Sesuaikan perubahan peN- dengan huruf awal kata dasar.", ["pembacaan", "penulisan", "penggunaan"], "Huruf awal tertentu boleh luluh apabila menerima peN-.", "pengunaan salah; eja penggunaan dengan dua g."),
      j("peR-...-an", "Membentuk kata nama yang berkaitan hal, tempat atau hasil perbuatan.", "Kenal pasti kata dasar dan bentuk per- yang sesuai.", ["permainan", "perumahan", "persatuan"], "Bentuk peR- boleh muncul sebagai pe-, per- atau pel- dalam kata tertentu.", "perkerjaan salah; bentuk bakunya pekerjaan."),
      j("ke-...-an", "Membentuk kata nama abstrak yang menyatakan hal atau sifat.", "Apit kata dasar tanpa memisahkan bahagiannya.", ["kecantikan", "keberanian", "kesihatan"], "Banyak bentuknya berasal daripada kata adjektif.", "ke cantik an salah; eja kecantikan."),
    ],
    memory: "Apitan seperti penyepit: satu bahagian di depan, satu lagi di belakang.",
    examples: ["pembinaan", "permainan", "kebersihan", "pelaksanaan"],
    mistakes: [{ wrong: "perlaksanaan", why: "Kata nama terbitan yang baku daripada laksana ialah pelaksanaan." }],
    uasaTip: "Biasanya diuji melalui pembentukan kata, ejaan apitan dan pemilihan kata nama terbitan.",
    cikgu: "Tanggalkan kedua-dua sisi apitan; kata yang tinggal membantu kamu menemukan kata dasar.",
    quiz: [
      q("Apitan dalam ‘kebersihan’ ialah...", ["peN-...-an", "ke-...-an", "peR-...-an"], 1, "Ke-...-an mengapit kata dasar bersih."),
      q("Ejaan baku ialah...", ["perlaksanaan", "pelaksanaan", "perlaksanan"], 1, "Pelaksanaan ialah bentuk baku daripada kata dasar laksana."),
      q("Kata dasar ‘tulis’ membentuk kata nama...", ["penulisan", "pertulisan", "ketulisan"], 0, "PeN-...-an membentuk penulisan."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "frasa-adjektif",
    title: "Frasa Adjektif",
    what: "Frasa adjektif ialah frasa yang berintikan kata adjektif. Frasa ini menerangkan sifat atau keadaan subjek.",
    types: [
      j("Kata Adjektif Tunggal", "Frasa yang intinya satu kata adjektif.", "Gunakan sebagai predikat atau penerang kata nama.", ["Rumah itu besar.", "baju merah"], "Kata adjektif boleh berdiri sebagai inti frasa.", "Jangan menganggap setiap kata selepas nama sebagai adjektif."),
      j("Kata Penguat + Adjektif", "Frasa adjektif yang menerima penguat hadapan atau bebas.", "Letakkan penguat pada kedudukan yang betul.", ["terlalu mahal", "sangat rajin", "agak sukar"], "Penguat bebas boleh hadir di hadapan atau belakang bagi bentuk tertentu.", "sekali cantik salah; sekali hadir selepas adjektif."),
      j("Adjektif + Kata Penguat Belakang", "Frasa dengan penguat selepas kata adjektif.", "Gunakan sekali, benar, betul atau nian mengikut kesesuaian.", ["indah sekali", "baik benar", "cantik nian"], "Bentuk ini menegaskan darjah sifat.", "sekali indah salah bagi pola penguat belakang."),
      j("Darjah Penghabisan", "Frasa yang menunjukkan tingkat paling tinggi.", "Gunakan satu pola penghabisan yang gramatis.", ["paling tinggi", "terbaik", "cantik sekali"], "Elakkan pertindihan penanda penghabisan.", "paling terbaik salah kerana paling dan ter- bertindih."),
    ],
    memory: "Cari inti sifat; perkataan di sekelilingnya hanya menguatkan atau melengkapkan.",
    examples: ["sangat bersih", "luas sekali", "paling cekap", "agak lewat"],
    mistakes: [{ wrong: "teramat cantik sekali", why: "Binaan itu menindihkan penegasan dan perlu disederhanakan mengikut pola yang tepat." }],
    uasaTip: "Diuji melalui susunan kata penguat, darjah perbandingan dan pembetulan frasa.",
    cikgu: "Cari kata sifat dahulu; itulah pusat graviti frasa adjektif.",
    quiz: [
      q("Yang manakah frasa adjektif?", ["sedang membaca", "sangat rajin", "di sekolah"], 1, "Rajin ialah kata adjektif yang menjadi inti."),
      q("Penguat belakang digunakan dalam...", ["terlalu tinggi", "tinggi sekali", "agak tinggi"], 1, "Sekali hadir selepas kata adjektif."),
      q("Binaan yang tepat ialah...", ["paling terbaik", "terbaik sekali", "paling baik"], 2, "Paling baik tidak menindihkan penanda penghabisan."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "ayat-tunggal-dan-jenis-jenis-ayat",
    title: "Ayat Tunggal dan Jenis-jenis Ayat",
    what: "Ayat tunggal mengandungi satu klausa dengan satu subjek dan satu predikat utama. Jenis ayat pula ditentukan oleh tujuan ujarannya.",
    types: [
      j("Ayat Penyata", "Ayat yang menyampaikan maklumat.", "Gunakan nada pemberitahuan dan akhiri dengan noktah.", ["Murid itu sedang membaca."], "Boleh hadir dalam susunan biasa atau songsang.", "Jangan akhiri ayat penyata dengan tanda soal."),
      j("Ayat Tanya", "Ayat yang meminta jawapan.", "Gunakan kata tanya atau intonasi tanya dan tanda soal.", ["Bilakah kamu tiba?", "Kamu sudah makan?"], "Kata tanya perlu sepadan dengan maklumat yang diminta.", "Apakah nama kamu siapa? mengandungi dua unsur tanya yang bertindih."),
      j("Ayat Perintah", "Ayat yang menyatakan suruhan, larangan, silaan atau permintaan.", "Gunakan kata perintah yang sesuai dengan tujuan.", ["Sila masuk.", "Jangan berlari.", "Tolong tutup pintu."], "Subjek biasanya tidak dinyatakan.", "Sila jangan masuk mencampurkan silaan dan larangan; gunakan Jangan masuk."),
      j("Ayat Seruan", "Ayat yang melahirkan perasaan kuat.", "Pilih kata seru yang sesuai dan gunakan tanda seru.", ["Wah, cantiknya!", "Aduh, sakitnya!"], "Kata seru bergantung pada emosi.", "Wah tidak sesuai untuk menyatakan kesakitan."),
      j("Susunan Biasa dan Songsang", "Susunan biasa mendahulukan subjek; songsang mendahulukan predikat.", "Pastikan maksud kekal apabila susunan diubah.", ["Budak itu rajin.", "Rajin budak itu."], "Kedua-duanya boleh menjadi ayat tunggal.", "Jangan menggugurkan unsur penting sehingga ayat tergantung."),
    ],
    memory: "Satu klausa = ayat tunggal; tujuan ujaran = jenis ayat.",
    examples: ["Ibu memasak.", "Siapakah dia?", "Sila duduk.", "Wah, hebatnya!"],
    mistakes: [{ wrong: "Walaupun hujan lebat.", why: "Binaan itu belum lengkap kerana klausa pancangan memerlukan klausa utama." }],
    uasaTip: "Kerap diuji melalui jenis ayat, tanda baca, susunan biasa-songsang dan kelengkapan ayat.",
    cikgu: "Dengar nada ayat dalam fikiran: memberitahu, bertanya, memerintah atau berseru?",
    quiz: [
      q("‘Jangan sentuh suis itu.’ ialah ayat...", ["penyata", "perintah", "seruan"], 1, "Jangan menandakan larangan."),
      q("Ayat tunggal mempunyai...", ["satu klausa", "dua klausa", "tiada predikat"], 0, "Ayat tunggal dibina daripada satu klausa."),
      q("Ayat tanya yang tepat ialah...", ["Bilakah kamu tiba?", "Kamu tiba!", "Sila kamu tiba."], 0, "Bilakah meminta maklumat masa dan diakhiri tanda soal."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kesalahan-ejaan",
    title: "Kesalahan Ejaan",
    what: "Kesalahan ejaan berlaku apabila perkataan, jarak atau tanda ditulis tidak mengikut bentuk baku. Semakan perlu dibuat pada kata dan konteksnya.",
    types: [
      j("Kata Pinjaman", "Perkataan bahasa lain yang disesuaikan kepada ejaan Melayu.", "Gunakan bentuk baku yang diterima DBP.", ["pakej", "aktiviti", "teknologi"], "Ejaan sumber tidak semestinya dikekalkan.", "pekej salah; bentuk bakunya pakej."),
      j("Kata Majmuk", "Gabungan kata yang membawa satu maksud.", "Eja terpisah kecuali bentuk yang telah mantap.", ["alat tulis", "kereta api", "kerjasama"], "Imbuhan apitan boleh merapatkan kata majmuk tertentu.", "alatulis salah; eja alat tulis."),
      j("Imbuhan Pinjaman", "Imbuhan daripada bahasa lain yang digunakan dalam bahasa Melayu.", "Eja rapat dengan kata am dan gunakan sempang sebelum nama khas apabila diperlukan.", ["prasekolah", "antidadah", "anti-Amerika"], "Semak status kata selepas imbuhan.", "pra sekolah salah; eja prasekolah."),
      j("Angka dan Tanda Sempang", "Bentuk angka tertentu memerlukan tanda sempang.", "Gunakan pada ke- + angka, angka + -an dan kata ganda.", ["ke-3", "1990-an", "murid-murid"], "Tanda sempang tidak dijarakkan.", "ke 3 dan murid - murid ialah ejaan yang salah."),
      j("Ejaan Popular", "Perkataan yang kerap tersalah akibat pengaruh sebutan atau bahasa lain.", "Rujuk bentuk baku apabila ragu.", ["analisis", "definisi", "stesen"], "Bina senarai ejaan yang selalu mengelirukan.", "station bukan ejaan baku bahasa Melayu; gunakan stesen."),
    ],
    memory: "Bunyi membantu menyebut; pedoman ejaan menentukan cara menulis.",
    examples: ["pakej", "alat tulis", "prasekolah", "ke-5", "1990-an"],
    mistakes: [{ wrong: "murid - murid", why: "Tanda sempang dalam kata ganda tidak diapit ruang." }],
    uasaTip: "Muncul sebagai pilihan ejaan betul, Spell Challenge dan pembetulan kesalahan dalam ayat.",
    cikgu: "Ejaan seperti kata laluan—huruf, jarak dan tanda semuanya mesti tepat.",
    quiz: [
      q("Spell Challenge: ejaan yang betul ialah...", ["pakej", "pekej", "pakage"], 0, "Pakej ialah ejaan baku."),
      q("Kata majmuk yang betul ialah...", ["alatulis", "alat tulis", "alat-tulis"], 1, "Alat tulis dieja terpisah."),
      q("Penulisan angka yang betul ialah...", ["ke 5", "ke-lima", "ke-5"], 2, "Ke- dengan angka memerlukan tanda sempang."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kesalahan-frasa-dalam-ayat",
    title: "Kesalahan Frasa dalam Ayat",
    what: "Kesalahan frasa berlaku apabila unsur dalam frasa dipilih atau disusun secara tidak gramatis. Kesalahan ini boleh melibatkan frasa nama, kerja, adjektif atau sendi nama.",
    types: [
      j("Kesalahan Frasa Nama", "Kesalahan pada penerang, bilangan atau bentuk jamak.", "Pastikan penjodoh bilangan dan penerang tersusun dengan tepat.", ["semua murid", "dua buah rumah"], "Elakkan penanda jamak berganda.", "para pelajar-pelajar salah; gunakan para pelajar atau pelajar-pelajar."),
      j("Kesalahan Frasa Kerja", "Kesalahan pada kata kerja, objek atau pelengkap.", "Pastikan kata kerja transitif mempunyai objek dan tidak disisipi sendi tanpa sebab.", ["membincangkan isu", "menjalankan tugas"], "Bezakan objek daripada frasa keterangan.", "membincangkan tentang isu salah kerana membincangkan terus menerima objek."),
      j("Kesalahan Frasa Adjektif", "Kesalahan pada kata penguat atau pelengkap adjektif.", "Gunakan pola penguatan yang gramatis.", ["sangat cantik", "tinggi sekali", "paling cekap"], "Elakkan pertindihan darjah penghabisan.", "paling tercantik salah kerana paling dan ter- bertindih."),
      j("Kesalahan Frasa Sendi Nama", "Kesalahan memilih atau mengeja kata sendi nama.", "Pilih di/ke, dari/daripada dan kepada/pada mengikut hubungan makna.", ["di sekolah", "dari Melaka", "daripada kayu"], "Dari untuk tempat, arah dan masa; daripada untuk sumber, bahan atau perbandingan.", "daripada Johor salah bagi tempat asal; gunakan dari Johor."),
    ],
    memory: "Cari inti frasa, kemudian semak setiap perkataan yang mengiringinya.",
    examples: ["semua peserta", "membaca buku", "amat sukar", "kepada guru"],
    mistakes: [{ wrong: "Antara hobi-hobinya ialah membaca.", why: "Antara sudah menunjukkan pilihan dalam kelompok; gunakan antara hobinya." }],
    uasaTip: "Diuji melalui bahagian bergaris, pilihan pembetulan dan penyuntingan ayat.",
    cikgu: "Baca frasa sebagai satu pasukan—kadang-kadang setiap pemain betul, tetapi susunannya salah.",
    quiz: [
      q("Frasa yang betul ialah...", ["para peserta-peserta", "para peserta", "semua para peserta"], 1, "Para peserta menggunakan satu penanda jamak."),
      q("Ayat yang tepat ialah...", ["Mereka membincangkan tentang isu itu.", "Mereka membincangkan isu itu.", "Mereka berbincang isu itu."], 1, "Membincangkan menerima objek secara langsung."),
      q("Kata sendi yang tepat ialah...", ["daripada Kedah", "dari Kedah", "kepada Kedah"], 1, "Dari digunakan untuk tempat asal."),
    ],
    focus: { objektif: true, sistemBahasa: true, penulisan: true, stars: 5 },
  },
  {
    id: "kata-kata-hikmat",
    title: "Kata-kata Hikmat",
    what: "Kata-kata hikmat ialah ungkapan bernas yang menyampaikan nasihat, nilai atau dorongan. Ungkapannya ringkas tetapi membawa pemikiran yang luas.",
    types: [
      j("Ungkapan Nasihat", "Kata-kata hikmat yang membimbing tindakan.", "Gunakan apabila isi menekankan pilihan atau amalan yang baik.", ["Masa itu emas", "Ilmu pelita hidup"], "Maksud perlu dihuraikan mengikut konteks.", "Jangan memasukkan ungkapan yang tidak berkaitan dengan isi."),
      j("Ungkapan Nilai", "Kata-kata hikmat yang menonjolkan nilai masyarakat.", "Padankan dengan nilai seperti kerjasama, bahasa atau ilmu.", ["Bahasa jiwa bangsa", "Bersatu kita teguh"], "Ungkapan boleh menguatkan pendahuluan atau penutup.", "Jangan mengubah susunan ungkapan yang telah mantap."),
      j("Cogan Kata", "Ungkapan ringkas yang membawa matlamat atau semangat.", "Gunakan sebagai slogan yang jelas dan mudah diingati.", ["Berkhidmat untuk negara", "Cegah sebelum parah"], "Cogan kata biasanya padat dan langsung.", "Cogan kata bukan huraian panjang."),
    ],
    memory: "Pendek ungkapannya, besar pesannya.",
    examples: ["Masa itu emas", "Ilmu pelita hidup", "Bahasa jiwa bangsa"],
    mistakes: [{ wrong: "Meletakkan kata hikmat tanpa hubungan dengan isi", why: "Ungkapan hanya berkesan apabila menyokong hujah atau nilai yang dibincangkan." }],
    uasaTip: "Biasanya diuji melalui maksud ungkapan dan penggunaan yang sesuai dalam penulisan.",
    cikgu: "Satu ungkapan yang tepat lebih kuat daripada beberapa ungkapan yang dipaksa masuk.",
    quiz: [
      q("Kata hikmat tentang nilai masa ialah...", ["Masa itu emas", "Kaki bangku", "Buah tangan"], 0, "Ungkapan itu menekankan kepentingan masa."),
      q("Fungsi kata-kata hikmat ialah...", ["memberi pedoman", "menggantikan semua isi", "memanjangkan ayat"], 0, "Kata-kata hikmat menyampaikan pedoman atau dorongan."),
      q("Penggunaan terbaik ialah...", ["mengikut kaitan isi", "dalam setiap ayat", "tanpa memahami maksud"], 0, "Ungkapan mesti relevan dengan isi."),
    ],
    focus: { objektif: true, sistemBahasa: false, penulisan: true, stars: 4 },
  },
];
