// Bahasa Melayu Tingkatan 3 → Kertas 1 → Sistem Bahasa → Kata Nama
// Content supplied verbatim by the curriculum source; only formatting/structure
// was adapted for AcadeMY's teaching style. No factual content was rewritten.

export interface KataNamaJenis {
  id: string;
  nama: string;
  definisi: string;
  caraMengenalPasti: string;
  formula: string;
  perbezaan: string;
  contohBetul: string[];
  contohSalah: string;
  tipsUASA: string;
}

export const KATA_NAMA_MISI =
  "Tujuan modul ini adalah untuk membolehkan murid memahami, mengenal pasti, dan menggunakan pelbagai jenis Kata Nama yang merangkumi kata nama am, kata nama khas, kata ganti nama, serta bentuk pembentukan kata seperti kata tunggal, majmuk, terbitan, dan ganda mengikut konteks yang betul dalam penulisan dan lisan.";

export const KATA_NAMA_PENGENALAN =
  "Bayangkan anda sedang bercerita tentang watak Beluntung atau Syahir dalam novel. Untuk merujuk kepada mereka, tempat mereka berada, atau benda yang mereka gunakan, anda memerlukan Kata Nama. Kata Nama ialah golongan kata yang menjadi inti bagi binaan frasa nama dan digunakan untuk menamakan manusia, haiwan, tempat, benda, atau konsep.";

export const KATA_NAMA_KONSEP_UTAMA =
  "Dalam sukatan KSSM Tingkatan 3, Kata Nama dibahagikan kepada subtopik yang lebih khusus untuk memastikan murid dapat membezakan entiti yang bersifat umum dengan entiti yang bersifat khusus, serta memahami bagaimana kata tersebut dibentuk.";

export const KATA_NAMA_JENIS: KataNamaJenis[] = [
  {
    id: "am",
    nama: "Kata Nama Am",
    definisi: "Kata yang digunakan untuk merujuk kepada benda, manusia, tempat, atau konsep secara umum.",
    caraMengenalPasti: "Ditulis dengan huruf kecil kecuali pada permulaan ayat.",
    formula: "\"Benda Biasa\" — merujuk kepada apa-apa sahaja yang tidak dinamakan secara khusus.",
    perbezaan: "Berbeza dengan Kata Nama Khas yang merujuk kepada entiti yang spesifik.",
    contohBetul: ["penyair", "jambatan", "burung", "sekolah"],
    contohSalah: "Penulis (jika merujuk kepada individu umum di tengah ayat).",
    tipsUASA: "Pastikan anda tidak menggunakan huruf besar jika kata tersebut tidak merujuk kepada nama yang khusus.",
  },
  {
    id: "khas",
    nama: "Kata Nama Khas",
    definisi: "Kata yang merujuk kepada entiti manusia, haiwan, tempat, atau benda secara khusus dan spesifik.",
    caraMengenalPasti: "Sentiasa bermula dengan huruf besar.",
    formula: "\"Nama Spesifik\" — nama yang unik bagi sesuatu entiti.",
    perbezaan: "Kata Nama Am adalah untuk kategori, manakala Kata Nama Khas adalah untuk individu dalam kategori tersebut.",
    contohBetul: ["Muzafar", "Tasik Permai", "Komander Caucasus", "Syahir"],
    contohSalah: "muzafar, tasik permai (kesalahan ejaan huruf besar).",
    tipsUASA: "Sering diuji dalam bahagian pembetulan ejaan dan tanda baca dalam UASA.",
  },
  {
    id: "ganti-nama",
    nama: "Kata Ganti Nama",
    definisi: "Kata yang digunakan untuk menggantikan kata nama.",
    caraMengenalPasti: "Terbahagi kepada tiga iaitu diri (saya, kamu, beliau), tunjuk (ini, itu), dan tanya (apa, siapa, mana).",
    formula: "\"Pengganti Inti\" — digunakan supaya kita tidak mengulang nama yang sama berkali-kali.",
    perbezaan: "Kata ganti nama diri ketiga seperti 'baginda' hanya digunakan untuk raja atau golongan istana.",
    contohBetul: ["aku", "mereka", "baginda", "patik"],
    contohSalah: "\"Beliau\" digunakan untuk binatang (sepatutnya merujuk kepada manusia yang dihormati).",
    tipsUASA: "Penggunaan kata ganti nama diri 'ia' tidak boleh digunakan untuk merujuk kepada benda atau konsep dalam ayat yang formal.",
  },
  {
    id: "tunggal",
    nama: "Kata Nama Tunggal",
    definisi: "Kata nama yang terdiri daripada satu kata dasar tanpa menerima sebarang imbuhan atau melalui proses penggandaan dan pemajmukan.",
    caraMengenalPasti: "Perkataan yang pendek dan asli bentuknya.",
    formula: "\"Asal Saja\" — tiada tambahan di depan atau belakang.",
    perbezaan: "Kenali kata dasar untuk membezakannya dengan kata terbitan.",
    contohBetul: ["ubi", "emas", "kain", "lori"],
    contohSalah: "perubatan (ini kata terbitan kerana ada imbuhan 'pe-...-an').",
    tipsUASA: "Kenali kata dasar untuk membezakannya dengan kata terbitan.",
  },
  {
    id: "majmuk",
    nama: "Kata Nama Majmuk",
    definisi: "Proses merangkaikan dua kata dasar atau lebih untuk membentuk satu makna yang baharu.",
    caraMengenalPasti: "Biasanya dieja terpisah tetapi bertindak sebagai satu unit makna.",
    formula: "Kata 1 + Kata 2 = Makna Baharu.",
    perbezaan: "Dieja jarak, kecuali kata majmuk mantap yang sudah diterima sebagai satu perkataan.",
    contohBetul: ["sapu tangan", "guru sains", "pasar malam", "beg tangan"],
    contohSalah: "\"Sapu tangan\" ditulis sebagai \"saputangan\" (kecuali kata majmuk mantap).",
    tipsUASA: "Dalam kiraan patah perkataan UASA, kata majmuk seperti 'beg tangan' dikira sebagai satu perkataan.",
  },
  {
    id: "terbitan",
    nama: "Kata Nama Terbitan",
    definisi: "Kata nama yang terhasil daripada proses pengimbuhan (awalan, akhiran, apitan, atau sisipan).",
    caraMengenalPasti: "Ada imbuhan seperti pe-, ke-, -an, pe-...-an, ke-...-an.",
    formula: "Imbuhan + Kata Dasar.",
    perbezaan: "Perhatikan perubahan makna apabila kata kerja atau kata adjektif bertukar menjadi kata nama terbitan.",
    contohBetul: ["penulisan", "pembangunan", "perniagaan", "kesihatan"],
    contohSalah: "\"Pembangunan\" ditulis tanpa imbuhan dalam konteks yang memerlukan kata nama.",
    tipsUASA: "Perhatikan perubahan makna apabila kata kerja atau kata adjektif bertukar menjadi kata nama terbitan.",
  },
  {
    id: "ganda",
    nama: "Kata Nama Ganda",
    definisi: "Kata nama yang mengalami proses penggandaan sama ada secara penuh, separa, atau berentak.",
    caraMengenalPasti: "Menggunakan tanda sempang (-).",
    formula: "Kata + Kata.",
    perbezaan: "Kata ganda seperti 'berlari-lari' dikira sebagai satu perkataan dalam ulasan.",
    contohBetul: ["buah-buahan", "bintang-bintang", "rakan-rakan", "jiran-tetangga"],
    contohSalah: "\"bintang bintang\" (tiada tanda sempang).",
    tipsUASA: "Kata ganda seperti 'berlari-lari' dikira sebagai satu perkataan dalam ulasan.",
  },
];

// Each sentence uses **word** to mark the Kata Nama that should be bolded.
export const KATA_NAMA_CONTOH_AYAT: string[] = [
  "**Penyair** itu menceritakan warkah tentang adab dalam kehidupan.",
  "**Maharaja Indera Dewa** memerintah negeri **Anta Beranta** dengan adil.",
  "**Syahir** berlatih dengan gigih di bawah bimbingan **Haji Marzuki**.",
  "**Beluntung** sangat sayang akan **Tuyog** dan **Bawod**.",
  "**Ibu Farhani** menangisi kehilangan anak bongsunya itu.",
  "**Sapu tangan** berwarna merah jambu itu ditemui di ruangan bawah tanah.",
  "**Pembangunan** ekonomi negara bergantung pada usaha golongan muda.",
  "**Bintang-bintang** di langit menghias malam yang sunyi.",
  "**Zuraida** berniaga pakaian di **bazar MARA** sejak tujuh tahun lalu.",
  "**Parjo** membantu emak dan bapanya menjual **tapai ubi** di kantin sekolah.",
];

export interface KataNamaKesalahan {
  label: string;
  salah: string;
  betul: string;
  penjelasan: string;
}

export const KATA_NAMA_KESALAHAN_LAZIM: KataNamaKesalahan[] = [
  {
    label: "Huruf Besar/Kecil",
    salah: "Menulis kata nama am dengan huruf besar di tengah ayat (contoh: Penulis).",
    betul: "penulis — kekal huruf kecil kerana ia kata nama am.",
    penjelasan: "Kata nama am ditulis huruf kecil kecuali pada permulaan ayat.",
  },
  {
    label: "Tanda Sempang",
    salah: "Terlupa meletakkan tanda sempang pada kata nama ganda (contoh: bintang bintang).",
    betul: "bintang-bintang — mesti ada tanda sempang (-).",
    penjelasan: "Kata nama ganda mesti menggunakan tanda sempang antara dua kata yang digandakan.",
  },
  {
    label: "Kata Majmuk Mantap",
    salah: "Terkeliru antara kata majmuk yang perlu dieja jarak dengan yang perlu dieja rapat (contoh: saputangan).",
    betul: "sapu tangan — dieja terpisah kecuali kata majmuk mantap.",
    penjelasan: "Kata nama majmuk biasanya dieja terpisah, kecuali kata majmuk mantap yang sudah diterima sebagai satu perkataan.",
  },
  {
    label: "Kata Ganti Nama Diri",
    salah: "Menggunakan 'beliau' untuk orang yang tidak dihormati atau 'ia' untuk benda dalam situasi formal.",
    betul: "'beliau' hanya untuk orang yang dihormati; 'ia' tidak digunakan untuk benda dalam ayat formal.",
    penjelasan: "Kata ganti nama diri mesti dipilih mengikut darjat penghormatan dan konteks (manusia berbanding benda/konsep).",
  },
];

export const KATA_NAMA_TIP_UASA = {
  dimanaMuncul: [
    "Topik Kata Nama biasanya keluar dalam Kertas 1, Bahagian A (Soalan 1–10) yang berbentuk Objektif Aneka Pilihan.",
    "Ia juga diuji dalam Bahagian B (Soalan 1) yang berbentuk Objektif Pelbagai Bentuk seperti membetulkan kesalahan kata dalam ayat.",
  ],
  perangkapLazim: [
    "Menulis kata nama am dengan huruf besar di tengah ayat.",
    "Terlupa tanda sempang pada kata nama ganda.",
    "Keliru antara kata majmuk yang dieja jarak dengan yang dieja rapat.",
    "Silap memilih kata ganti nama diri mengikut darjat penghormatan.",
  ],
  jangkaanPemeriksa: [
    "Kata Nama Khas WAJIB ditulis bermula dengan huruf besar walau di mana-mana kedudukannya dalam ayat.",
    "Kata Nama Majmuk dan Kata Nama Ganda dikira sebagai satu perkataan dalam ujian penulisan (Ulasan/Karangan).",
  ],
};

export const KATA_NAMA_TEKNIK_MENJAWAB = [
  {
    title: "Baca ayat dengan teliti",
    detail: "Kenal pasti subjek dan objek dalam ayat tersebut.",
  },
  {
    title: "Kenali jenis entiti",
    detail: "Adakah ia merujuk kepada sesuatu yang umum atau khusus?",
  },
  {
    title: "Perhatikan pembentukan kata",
    detail: "Lihat jika terdapat imbuhan atau penggandaan yang tidak tepat mengikut maksud ayat.",
  },
  {
    title: "Semak tanda baca",
    detail: "Terutama penggunaan huruf besar untuk kata nama khas.",
  },
];

export const KATA_NAMA_NOTA_KILAT: { emoji: string; label: string; text: string; color: string }[] = [
  { emoji: "🟦", label: "Kata Nama Am", text: "umum, huruf kecil (kereta).", color: "#60A5FA" },
  { emoji: "🟩", label: "Kata Nama Khas", text: "spesifik, huruf besar (Volvo).", color: "#34D399" },
  { emoji: "🟨", label: "Kata Ganti Nama", text: "pengganti (saya, beliau, baginda).", color: "#FBBF24" },
  { emoji: "🟪", label: "Kata Nama Tunggal", text: "\"Asal Saja\" — tiada tambahan di depan atau belakang.", color: "#C084FC" },
  { emoji: "🟧", label: "Kata Nama Majmuk", text: "dua kata satu makna (sapu tangan).", color: "#FB923C" },
  { emoji: "🟥", label: "Kata Nama Terbitan", text: "Imbuhan + Kata Dasar (pembangunan).", color: "#FB7185" },
  { emoji: "⬛", label: "Kata Nama Ganda", text: "ulang kata (bintang-bintang).", color: "#94A3B8" },
];

export const KATA_NAMA_FAKTA_PENTING = [
  "Kata Nama Khas WAJIB ditulis bermula dengan huruf besar walau di mana-mana kedudukannya dalam ayat.",
  "Kata Nama Majmuk dan Kata Nama Ganda dikira sebagai satu perkataan dalam ujian penulisan (Ulasan/Karangan).",
];

export const KATA_NAMA_CHECKLIST = [
  "Saya faham beza Kata Nama Am dan Kata Nama Khas",
  "Saya boleh mengenal pasti imbuhan dalam Kata Nama Terbitan",
  "Saya boleh menjawab soalan UASA melibatkan golongan Kata Nama",
];

export const KATA_NAMA_MOTIVASI =
  "Hebat! Anda telah menguasai asas Kata Nama. Selepas ini kita akan meneruskan perjalanan ke topik Kata Kerja.";
