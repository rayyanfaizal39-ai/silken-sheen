import type { Difficulty } from "@/data/content";

export type SejarahF2ObjectiveId = "objective-1" | "objective-2" | "objective-3";

export type SejarahF2ObjectiveQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  difficulty: Difficulty;
  subjectId: "sejarah";
};

export const SEJARAH_F2_CHAPTERS = [
  { key: "Chapter 1", label: "Bab 1 - Kerajaan Alam Melayu", available: true, isNew: true },
  {
    key: "Chapter 2",
    label: "Bab 2 - Sistem Pemerintahan dan Kegiatan Ekonomi",
    available: true,
    isNew: true,
  },
  {
    key: "Chapter 3",
    label: "Bab 3 - Sosiobudaya Masyarakat Kerajaan Alam Melayu",
    available: true,
    isNew: true,
  },
  {
    key: "Chapter 4",
    label: "Bab 4 - Agama, Kepercayaan dan Keunikan Warisan",
    available: true,
    isNew: true,
  },
  { key: "Chapter 5", label: "Bab 5 - Kesultanan Melayu Melaka", available: true, isNew: true },
  { key: "Chapter 6", label: "Bab 6 - Kesultanan Johor Riau", available: true, isNew: true },
] as const;

export const SEJARAH_F2_OBJECTIVES: Array<{
  id: SejarahF2ObjectiveId;
  badge: string;
  title: string;
  level: string;
  difficulty: Difficulty;
  tone: string;
  purpose: string[];
}> = [
  {
    id: "objective-1",
    badge: "🟢",
    title: "Objektif 1",
    level: "Easy Recall",
    difficulty: "Easy",
    tone: "from-emerald-500 to-teal-500",
    purpose: ["Fakta asas", "Tokoh dan tempat", "Recall pantas"],
  },
  {
    id: "objective-2",
    badge: "🟡",
    title: "Objektif 2",
    level: "Understanding",
    difficulty: "Medium",
    tone: "from-amber-400 to-orange-500",
    purpose: ["Perbandingan", "Sebab dan kesan", "Aplikasi konsep"],
  },
  {
    id: "objective-3",
    badge: "🔴",
    title: "Objektif 3",
    level: "UASA Exam Level",
    difficulty: "Hard",
    tone: "from-rose-500 to-red-600",
    purpose: ["KBAT ringan", "Analisis fakta", "Latihan gaya peperiksaan"],
  },
];

export function getSejarahF2ObjectivesForChapter(chapterKey: string) {
  if (chapterKey !== "Chapter 1") return SEJARAH_F2_OBJECTIVES;

  return [
    {
      ...SEJARAH_F2_OBJECTIVES[0],
      title: "Objektif 1",
      level: "Mudah",
      purpose: ["Pengasas dan pusat", "Lokasi dan masa", "Fakta asas"],
    },
    {
      ...SEJARAH_F2_OBJECTIVES[1],
      title: "Objektif 2",
      level: "Sederhana",
      purpose: ["Kemasyhuran", "Hubungan luar", "Sebab kemerosotan"],
    },
    {
      ...SEJARAH_F2_OBJECTIVES[2],
      title: "Objektif 3",
      level: "Sukar",
      purpose: ["Perbandingan", "Tokoh dan sumbangan", "Kerajaan sezaman"],
    },
  ];
}

type Fact = {
  topic: string;
  prompt: string;
  answer: string;
  distractors: string[];
  explanation: string;
};

const CHAPTER_1_OBJECTIVE_A_QUESTIONS: SejarahF2ObjectiveQuestion[] = [
  // 1.1 Konsep Alam Melayu (Q1-8)
  question("Apakah tiga aspek yang digunakan untuk menjelaskan konsep Alam Melayu?", ["Geografi, bahasa dan budaya", "Ekonomi, politik dan sosial", "Pertanian, perdagangan dan agama", "Seni bina, muzik dan tarian"], 0, "Konsep Alam Melayu dapat dilihat dari aspek geografi, bahasa dan budaya."),
  question("Apakah yang dirangkumi oleh Alam Melayu dari aspek geografi?", ["Gugusan kepulauan dan tanah besar di Asia Tenggara", "Hanya Semenanjung Tanah Melayu", "Seluruh benua Asia", "Kawasan Eropah dan Afrika"], 0, "Alam Melayu merangkumi gugusan kepulauan dan tanah besar di Asia Tenggara."),
  question("Siapakah tokoh yang berpandangan Alam Melayu meliputi Madagaskar, Tanah Melayu, Taiwan, Papua New Guinea, Australia dan New Zealand?", ["Nik Hassan Shuhaimi Nik Abdul Rahman", "Abdul Hadi Haji Hassan", "Ismail Hussein", "Alfred Russel Wallace"], 0, "Nik Hassan Shuhaimi Nik Abdul Rahman berpandangan Alam Melayu meliputi kawasan tersebut."),
  question("Bahasa Melayu tergolong dalam keluarga bahasa apa?", ["Austronesia", "Indo-Eropah", "Sino-Tibet", "Afro-Asiatik"], 0, "Bahasa Melayu tergolong dalam keluarga Austronesia."),
  question("Berapakah jumlah bahasa yang dituturkan di Alam Melayu?", ["Lebih 200 bahasa", "Lebih 20 bahasa", "Lebih 50 bahasa", "Lebih 1000 bahasa"], 0, "Terdapat lebih 200 bahasa yang dituturkan di Alam Melayu."),
  question("Apakah istilah lama yang digantikan dengan Austronesia?", ["Melayu-Polinesia", "Indo-Melayu", "Sino-Melayu", "Eropah-Melayu"], 0, "Istilah Melayu-Polinesia digantikan dengan Austronesia."),
  question("Pada tahun berapakah UNESCO menggantikan istilah Melayu-Polinesia dengan Austronesia?", ["1972", "1955", "1981", "1965"], 0, "UNESCO menggantikan istilah tersebut pada tahun 1972."),
  question("Siapakah tokoh yang menyatakan budaya Alam Melayu menunjukkan persamaan dalam kesenian, adat dan nilai masyarakat?", ["A. Aziz Deraman", "Asmah Haji Omar", "Sutan Takdir Alisjahbana", "Ding Choo Ming"], 0, "Menurut A. Aziz Deraman, budaya Alam Melayu menunjukkan persamaan dalam kesenian, adat dan nilai masyarakat."),

  // 1.2 Kewujudan Kerajaan di Alam Melayu (Q9-14)
  question("Pada abad manakah Kerajaan Funan mula wujud?", ["Abad Pertama", "Abad Kedua", "Abad Kelima", "Abad Kesembilan"], 0, "Kerajaan Funan muncul seawal abad pertama."),
  question("Pada abad manakah Kerajaan Kedah Tua mula wujud?", ["Abad Kelima", "Abad Pertama", "Abad Ketujuh", "Abad Ke-13"], 0, "Kerajaan Kedah Tua wujud pada abad kelima."),
  question("Pada abad manakah Kerajaan Champa mula wujud?", ["Abad Kedua", "Abad Pertama", "Abad Keenam", "Abad Kesembilan"], 0, "Kerajaan Champa wujud pada abad kedua."),
  question("Pada abad manakah Kerajaan Gangga Negara mula wujud?", ["Abad Keenam", "Abad Kelima", "Abad Ketujuh", "Abad Ke-13"], 0, "Kerajaan Gangga Negara wujud pada abad keenam."),
  question("Pada abad manakah Kerajaan Srivijaya mula wujud?", ["Abad Ketujuh", "Abad Kedua", "Abad Keenam", "Abad Kesembilan"], 0, "Kerajaan Srivijaya wujud pada abad ketujuh."),
  question("Pada abad manakah Kerajaan Angkor mula wujud?", ["Abad Kesembilan", "Abad Pertama", "Abad Kelima", "Abad Ke-13"], 0, "Kerajaan Angkor wujud pada abad kesembilan."),

  // 1.3 Kerajaan Alam Melayu yang Masyhur (Q15-24)
  question("Siapakah pengasas Kerajaan Funan?", ["Kaudinya", "Chu-Lien", "Raden Wijaya", "Jayavarman II"], 0, "Kerajaan Funan diasaskan oleh Kaudinya."),
  question("Apakah pusat Kerajaan Funan?", ["Vyadhapura", "Indrapura", "Palembang", "Kota Trowulan"], 0, "Pusat Kerajaan Funan ialah Vyadhapura."),
  question("Siapakah pengasas Kerajaan Champa?", ["Chu-Lien", "Kaudinya", "Jayavarman II", "Raden Wijaya"], 0, "Kerajaan Champa diasaskan oleh Chu-Lien."),
  question("Pada tahun berapakah Kerajaan Champa diasaskan?", ["192 Masihi", "683 Masihi", "1294 Masihi", "1369 Masihi"], 0, "Kerajaan Champa diasaskan oleh Chu-Lien pada tahun 192 Masihi."),
  question("Apakah pusat Kerajaan Srivijaya?", ["Palembang", "Vyadhapura", "Hariharalaya", "Indrapura"], 0, "Kerajaan Srivijaya berpusat di Palembang."),
  question("Siapakah pengasas Kerajaan Srivijaya?", ["Dapunta Hyang Sri Jayanasa", "Jayavarman II", "Raden Wijaya", "Chu-Lien"], 0, "Kerajaan Srivijaya diasaskan oleh Dapunta Hyang Sri Jayanasa pada tahun 683 Masihi."),
  question("Siapakah pemerintah Angkor yang membina Angkor Thom?", ["Jayavarman VII", "Jayavarman II", "Suryavarman II", "Raden Wijaya"], 0, "Jayavarman VII membina Angkor Thom dan mendirikan 102 buah hospital."),
  question("Siapakah pengasas Kerajaan Majapahit?", ["Raden Wijaya", "Patih Gajah Mada", "Jayavarman II", "Kaudinya"], 0, "Kerajaan Majapahit diasaskan oleh Raden Wijaya pada tahun 1294 Masihi."),
  question("Di manakah lokasi Kerajaan Kedah Tua?", ["Sungai Mas dan Sungai Bujang", "Lembah Sungai Mekong", "Lembah Sungai Musi", "Pantai Barat Tengah Tanah Melayu"], 0, "Kerajaan Kedah Tua terletak di Sungai Mas dan Sungai Bujang."),
  question("Apakah faktor kemasyhuran Kerajaan Gangga Negara?", ["Kaya dengan emas dan bijih timah", "Menjadi pusat pengajian agama Buddha terbesar", "Menguasai Selat Melaka dan Selat Sunda", "Membina 102 buah hospital"], 0, "Gangga Negara menjadi pusat pelabuhan penting yang kaya dengan emas dan bijih timah."),

  // 1.4 Kerajaan Alam Melayu dan Kerajaan Luar yang Sezaman (Q25-30)
  question("Kerajaan luar manakah yang sezaman dengan Kerajaan Funan pada abad pertama?", ["Empayar Rom", "Dinasti Tang", "Kerajaan Chola", "Empayar Mongol"], 0, "Funan muncul sezaman dengan Empayar Rom, Empayar Parsi, Empayar Kushan dan Dinasti Han pada abad pertama."),
  question("Apakah tujuan utusan Srivijaya dihantar ke China?", ["Mendapatkan pengiktirafan, memperkukuh perdagangan dan mengukuhkan persahabatan", "Memohon bantuan ketenteraan menentang Dai Viet", "Memulihkan hubungan selepas peperangan", "Menjalinkan hubungan persahabatan sahaja"], 0, "Srivijaya menghantar utusan ke China untuk mendapatkan pengiktirafan, memperkukuh perdagangan dan mengukuhkan persahabatan."),
  question("Agama Buddha tersebar ke Alam Melayu melalui peranan siapa?", ["Maharaja Asoka dan sami Buddha", "Golongan Brahmin", "Pedagang dan pendakwah Islam", "Tentera Chola"], 0, "Agama Buddha tersebar melalui peranan Maharaja Asoka dan sami Buddha yang dihantar ke Alam Melayu."),
  question("Antara berikut, yang manakah merupakan pelabuhan penting Alam Melayu dalam perdagangan antarabangsa?", ["Oc Eo", "Hariharalaya", "Kota Trowulan", "Indrapura"], 0, "Pelabuhan penting Alam Melayu yang terlibat dalam perdagangan antarabangsa ialah Oc Eo, Kedah Tua, Palembang dan Tuban."),
  question("Apakah tujuan hubungan diplomatik kerajaan Alam Melayu dengan kerajaan luar?", ["Mengukuhkan kedudukan kerajaan, membuka jalan perdagangan dan menjalin persahabatan", "Menghapuskan kegiatan perdagangan kerajaan luar", "Menutup pelabuhan antarabangsa", "Menghalang penyebaran agama"], 0, "Hubungan diplomatik bertujuan mengukuhkan kedudukan kerajaan, membuka jalan perdagangan dan menjalin persahabatan."),
  question("Kerajaan luar manakah yang sezaman dengan Champa, Srivijaya dan Angkor pada abad kesembilan?", ["Kerajaan Chola", "Empayar Rom", "Kesultanan Delhi", "Kerajaan Turki Uthmaniyah"], 0, "Champa, Srivijaya dan Angkor sezaman dengan Kerajaan Chola pada abad kesembilan."),
];

const CHAPTER_1_OBJECTIVE_B_QUESTIONS: SejarahF2ObjectiveQuestion[] = [
  question("Mengapakah Srivijaya menghantar utusan ke China?", ["Untuk mengukuhkan hubungan diplomatik dan perdagangan", "Untuk menutup laluan perdagangan", "Untuk memindahkan pusat kerajaan ke China", "Untuk menghentikan kegiatan pelabuhan"], 0, "Utusan ke China membantu Srivijaya mengukuhkan hubungan diplomatik dan perdagangan."),
  question("Apakah fungsi sistem Baray dalam Kerajaan Angkor?", ["Menjadi tempat menyimpan kapal perang", "Menyimpan dan membekalkan air untuk pertanian", "Menjadi pusat pembelajaran agama Buddha", "Menjadi pelabuhan entrepot"], 1, "Baray ialah takungan air besar yang membantu sistem pengairan dan pertanian Angkor."),
  question("Mengapakah Orang Laut penting kepada kerajaan Alam Melayu?", ["Mereka membina candi kerajaan", "Mereka menjadi pengasas semua kerajaan", "Mereka membantu menjaga keselamatan perairan", "Mereka menulis batu bersurat awal"], 2, "Orang Laut penting kerana membantu keselamatan laut dan laluan perdagangan."),
  question("Bagaimanakah perdagangan membantu perkembangan kerajaan Alam Melayu?", ["Perdagangan menyebabkan pelabuhan ditutup", "Perdagangan mengurangkan hubungan luar", "Perdagangan menghapuskan hasil ekonomi", "Perdagangan membawa kekayaan dan hubungan luar"], 3, "Perdagangan membawa hasil, kemakmuran dan hubungan luar kepada kerajaan Alam Melayu."),
  question("Mengapakah kedudukan Alam Melayu dianggap strategik?", ["Terletak di laluan perdagangan antara Timur dan Barat", "Terletak jauh daripada laut", "Terletak di kawasan gurun", "Tidak mempunyai pelabuhan"], 0, "Kedudukan Alam Melayu strategik kerana berada di laluan perdagangan penting."),
  question("Apakah kepentingan hubungan diplomatik dengan China?", ["Menghalang kedatangan pedagang", "Meningkatkan pengiktirafan dan keselamatan perdagangan", "Menghapuskan kuasa raja", "Menutup kegiatan agama"], 1, "Hubungan diplomatik membantu pengiktirafan kerajaan dan melancarkan perdagangan."),
  question("Apakah peranan pelabuhan dalam kerajaan maritim?", ["Menjadi kawasan pertanian padi", "Menjadi tempat membina baray", "Menjadi pusat persinggahan dan pertukaran barang", "Menjadi pusat penternakan"], 2, "Pelabuhan menjadi tempat kapal singgah, pedagang bertemu dan barang ditukar."),
  question("Mengapakah Angkor berkembang sebagai kerajaan yang kuat?", ["Kerana tidak mempunyai sistem pengairan", "Kerana terletak jauh daripada sumber air", "Kerana menolak pertanian", "Kerana mempunyai pertanian maju dan sistem pengairan"], 3, "Angkor kuat kerana pertanian dan sistem pengairannya menyokong bekalan makanan."),
  question("Apakah fungsi Sungai Mekong kepada Kerajaan Funan?", ["Membantu pertanian dan perhubungan perdagangan", "Menghalang perkembangan kerajaan", "Menjadi pusat pemerintahan Majapahit", "Menjadi tapak Angkor Wat"], 0, "Sungai Mekong membantu pertanian dan laluan perhubungan Funan."),
  question("Bagaimanakah candi menunjukkan kemajuan masyarakat awal?", ["Candi digunakan untuk menyimpan cukai pelabuhan", "Candi membuktikan kemahiran seni bina dan keagamaan", "Candi menggantikan pelabuhan", "Candi hanya digunakan untuk pertanian"], 1, "Candi menunjukkan kemahiran seni bina serta kepentingan agama dalam masyarakat awal."),
  question("Mengapakah bahasa serumpun penting dalam Alam Melayu?", ["Menutup hubungan antara masyarakat", "Menghapuskan budaya setempat", "Memudahkan komunikasi dan menunjukkan persamaan budaya", "Menghalang perdagangan"], 2, "Bahasa serumpun memudahkan komunikasi dan memperlihatkan persamaan masyarakat Alam Melayu."),
  question("Apakah peranan pemerintah dalam kerajaan Alam Melayu?", ["Menutup semua pelabuhan", "Menghalang kegiatan ekonomi", "Menghapuskan adat tempatan", "Mengurus pentadbiran dan menjaga kestabilan kerajaan"], 3, "Pemerintah berperanan mengurus pentadbiran dan memastikan kestabilan kerajaan."),
  question("Mengapakah Srivijaya dikenali sebagai kuasa maritim?", ["Menguasai laluan perdagangan laut", "Hanya bergantung pada sawah padi", "Tidak mempunyai pelabuhan", "Berpusat di kawasan pedalaman"], 0, "Srivijaya terkenal kerana menguasai perdagangan dan laluan laut."),
  question("Apakah fungsi pelabuhan entrepot?", ["Menjadi tempat membina candi", "Mengumpul dan mengedarkan barang dagangan", "Menjadi kawasan berburu", "Menjadi pusat pertanian sahaja"], 1, "Pelabuhan entrepot mengumpulkan dan mengedarkan barang dagangan."),
  question("Mengapakah Kedah Tua penting dalam perdagangan Alam Melayu?", ["Menjadi pusat pemerintahan Angkor", "Menjadi tempat pembinaan Angkor Wat", "Terletak di laluan perdagangan dan mempunyai pelabuhan", "Menjadi pusat kerajaan Funan"], 2, "Kedah Tua penting kerana kedudukannya sesuai untuk kegiatan pelabuhan dan perdagangan."),
  question("Bagaimanakah hubungan luar membantu kerajaan Alam Melayu?", ["Mengurangkan pengaruh kerajaan", "Menutup hubungan pedagang", "Menghapuskan kegiatan maritim", "Mengukuhkan diplomasi, agama dan perdagangan"], 3, "Hubungan luar membantu diplomasi, penyebaran agama dan kegiatan perdagangan."),
  question("Apakah kepentingan hasil bumi kepada Gangga Nagara?", ["Menjadi sumber kekayaan kerajaan", "Menghapuskan kegiatan perdagangan", "Menjadikan kerajaan tidak stabil", "Menghalang hubungan luar"], 0, "Hasil bumi seperti emas menjadi sumber kekayaan kerajaan."),
  question("Mengapakah kerajaan agraria memerlukan sistem pengairan?", ["Untuk membina kapal laut", "Untuk membekalkan air kepada kegiatan pertanian", "Untuk menggantikan pelabuhan", "Untuk menulis prasasti"], 1, "Sistem pengairan penting untuk memastikan pertanian mendapat bekalan air."),
  question("Apakah peranan perdagangan laut kepada kerajaan maritim?", ["Menjadikan kerajaan hanya bergantung kepada pertanian", "Menghapuskan hubungan luar", "Meningkatkan ekonomi dan pengaruh kerajaan", "Menghalang kedatangan pedagang"], 2, "Perdagangan laut meningkatkan ekonomi dan pengaruh kerajaan maritim."),
  question("Mengapakah Funan dapat berkembang di Lembah Sungai Mekong?", ["Kerana kawasan itu tiada sumber air", "Kerana jauh daripada laluan perhubungan", "Kerana tidak sesuai untuk pertanian", "Kerana kawasan sungai menyokong pertanian dan perdagangan"], 3, "Lembah Sungai Mekong membantu Funan melalui pertanian dan perhubungan."),
  question("Apakah fungsi tulisan Pallava pada batu bersurat awal?", ["Merekod maklumat dan pentadbiran", "Menjadi alat perdagangan laut", "Menjadi senjata kerajaan", "Menjadi sistem pengairan"], 0, "Tulisan Pallava digunakan untuk merekod maklumat pada batu bersurat."),
  question("Bagaimanakah agama Buddha berkembang di Srivijaya?", ["Melalui penutupan pelabuhan", "Melalui peranan pusat pembelajaran dan hubungan luar", "Melalui penghapusan perdagangan", "Melalui sistem Baray"], 1, "Srivijaya menjadi pusat pembelajaran Buddha yang dikunjungi sami dan pengembara."),
  question("Mengapakah Majapahit mencapai kegemilangan?", ["Kerana tidak mempunyai pemimpin", "Kerana menolak perdagangan", "Kerana pentadbiran dan kepimpinan yang kuat", "Kerana berpusat di China"], 2, "Majapahit berkembang melalui kepimpinan dan pentadbiran yang kukuh."),
  question("Apakah peranan Patih Gajah Mada dalam Majapahit?", ["Mengasaskan Kerajaan Funan", "Membina Angkor Wat", "Menjadi pengembara Buddha", "Membantu mengukuhkan kuasa Majapahit"], 3, "Patih Gajah Mada ialah pembesar yang membantu mengukuhkan Majapahit."),
  question("Mengapakah pelabuhan menarik kedatangan pedagang asing?", ["Menyediakan tempat persinggahan dan urusan perdagangan", "Menghalang kapal asing", "Tidak mempunyai kemudahan", "Jauh daripada laluan dagang"], 0, "Pelabuhan menarik pedagang kerana menyediakan kemudahan perdagangan."),
  question("Apakah kepentingan bahasa Melayu-Polinesia kepada Alam Melayu?", ["Menjadi bahasa rasmi Rom", "Menunjukkan persamaan bahasa dalam masyarakat serumpun", "Menggantikan semua agama", "Menutup hubungan perdagangan"], 1, "Bahasa Melayu-Polinesia menunjukkan persamaan bahasa masyarakat Alam Melayu."),
  question("Bagaimanakah kerajaan maritim memperoleh kekayaan?", ["Melalui sistem pengairan sahaja", "Melalui penternakan di pedalaman", "Melalui perdagangan laut dan pelabuhan", "Melalui penutupan laluan dagang"], 2, "Kerajaan maritim memperoleh kekayaan melalui perdagangan laut dan pelabuhan."),
  question("Mengapakah pusat pemerintahan penting kepada kerajaan?", ["Untuk menghalang pentadbiran", "Untuk menutup hubungan luar", "Untuk menggantikan semua pelabuhan", "Untuk mengurus pentadbiran dan kuasa pemerintah"], 3, "Pusat pemerintahan penting untuk pentadbiran dan pelaksanaan kuasa kerajaan."),
  question("Apakah fungsi hubungan keagamaan dalam Alam Melayu?", ["Menyebarkan agama dan ilmu", "Menghapuskan persuratan", "Menutup pelabuhan", "Mengurangkan hubungan luar"], 0, "Hubungan keagamaan membantu penyebaran agama dan ilmu."),
  question("Bagaimanakah kedudukan Kedah Tua membantu perkembangannya?", ["Jauh daripada laluan perdagangan", "Terletak di laluan maritim yang strategik", "Tidak mempunyai kawasan pelabuhan", "Berada di kawasan gurun"], 1, "Kedah Tua berkembang kerana berada di laluan maritim yang strategik."),
];

const CHAPTER_1_OBJECTIVE_C_QUESTIONS: SejarahF2ObjectiveQuestion[] = [
  question("Mengapakah lokasi Alam Melayu menjadi tumpuan pedagang antarabangsa?", ["Kerana terletak di laluan perdagangan strategik", "Kerana tiada pelabuhan", "Kerana jauh daripada laut", "Kerana tidak mempunyai hasil dagangan"], 0, "Lokasi Alam Melayu strategik kerana menghubungkan laluan perdagangan Timur dan Barat."),
  question("Apakah faktor utama yang membantu Funan berkembang?", ["Ketiadaan sungai utama", "Kedudukan di Lembah Sungai Mekong", "Penutupan pelabuhan", "Kelemahan pertanian"], 1, "Funan berkembang kerana Lembah Sungai Mekong menyokong pertanian dan perhubungan."),
  question("Mengapakah Srivijaya menjadi empayar maritim yang kuat?", ["Kerana hanya bergantung kepada pertanian", "Kerana tidak mempunyai pelabuhan", "Kerana menguasai laluan perdagangan laut", "Kerana menolak hubungan diplomatik"], 2, "Srivijaya kuat kerana menguasai laluan perdagangan laut dan pelabuhan."),
  question("Apakah kesan hubungan diplomatik dengan China kepada kerajaan Alam Melayu?", ["Menghapuskan perdagangan", "Melemahkan kedudukan raja", "Menutup laluan laut", "Meningkatkan pengiktirafan dan keselamatan perdagangan"], 3, "Hubungan diplomatik memberi pengiktirafan dan membantu perdagangan."),
  question("Apakah pengajaran daripada kegemilangan Srivijaya?", ["Penguasaan ilmu dan perdagangan dapat menguatkan kerajaan", "Pelabuhan tidak penting kepada kerajaan", "Hubungan luar perlu dielakkan", "Perdagangan laut melemahkan kerajaan"], 0, "Kegemilangan Srivijaya menunjukkan ilmu, perdagangan dan hubungan luar menguatkan kerajaan."),
  question("Bagaimanakah perdagangan menyumbang kepada kemajuan kerajaan Alam Melayu?", ["Dengan menutup hubungan luar", "Dengan membawa kekayaan, pengaruh dan pertukaran budaya", "Dengan menghapuskan pelabuhan", "Dengan melemahkan pentadbiran"], 1, "Perdagangan membawa kekayaan, pengaruh dan pertukaran budaya."),
  question("Mengapakah sistem pentadbiran yang teratur penting?", ["Untuk mengurangkan kestabilan", "Untuk menghalang perdagangan", "Untuk memastikan kerajaan stabil dan berkesan", "Untuk menutup hubungan diplomatik"], 2, "Pentadbiran teratur membantu kestabilan dan keberkesanan kerajaan."),
  question("Apakah kepentingan pelabuhan kepada kerajaan maritim?", ["Hanya untuk menyimpan hasil pertanian", "Untuk menghalang kedatangan pedagang", "Untuk menggantikan sistem pemerintahan", "Sebagai pusat perdagangan dan persinggahan kapal"], 3, "Pelabuhan menjadi nadi perdagangan dan persinggahan kapal kerajaan maritim."),
  question("Mengapakah Angkor memerlukan sistem Baray?", ["Untuk menyokong pertanian dan bekalan air", "Untuk menjadi pelabuhan laut", "Untuk menggantikan candi", "Untuk menghalang pertanian"], 0, "Baray membantu bekalan air dan pertanian Angkor."),
  question("Apakah kesan kemajuan pertanian kepada kerajaan agraria?", ["Melemahkan bekalan makanan", "Menyediakan makanan dan menyokong pertumbuhan kerajaan", "Menghapuskan penduduk", "Menutup pusat pemerintahan"], 1, "Pertanian yang maju menyediakan makanan dan menyokong perkembangan kerajaan."),
  question("Mengapakah candi penting dalam masyarakat awal Alam Melayu?", ["Kerana menjadi pusat perdagangan laut", "Kerana menggantikan pelabuhan", "Kerana melambangkan agama, seni bina dan kuasa kerajaan", "Kerana digunakan sebagai kapal dagang"], 2, "Candi melambangkan agama, seni bina dan keagungan kerajaan."),
  question("Bagaimanakah bahasa serumpun membantu membentuk identiti Alam Melayu?", ["Dengan menghapuskan adat", "Dengan menghalang komunikasi", "Dengan menutup perdagangan", "Dengan menunjukkan persamaan asal usul dan budaya"], 3, "Bahasa serumpun menunjukkan persamaan asal usul dan budaya masyarakat Alam Melayu."),
  question("Apakah kepentingan Orang Laut kepada kerajaan maritim?", ["Menjaga keselamatan perairan dan membantu perdagangan", "Membina sistem Baray", "Menulis prasasti Pallava", "Mengasaskan Majapahit"], 0, "Orang Laut membantu keselamatan perairan dan kelancaran perdagangan."),
  question("Mengapakah hubungan luar penting kepada kerajaan Alam Melayu?", ["Untuk menutup pelabuhan", "Untuk memperkukuh diplomasi, perdagangan dan agama", "Untuk menghapuskan pedagang asing", "Untuk melemahkan kuasa pemerintah"], 1, "Hubungan luar memperkukuh diplomasi, perdagangan dan penyebaran agama."),
  question("Apakah kesan pelabuhan entrepot terhadap ekonomi kerajaan?", ["Mengurangkan hasil perdagangan", "Menghalang kapal singgah", "Meningkatkan kegiatan jual beli dan hasil kerajaan", "Menutup hubungan luar"], 2, "Pelabuhan entrepot meningkatkan perdagangan dan hasil kerajaan."),
  question("Mengapakah Patih Gajah Mada penting dalam sejarah Majapahit?", ["Kerana mengasaskan Champa", "Kerana membina Angkor Wat", "Kerana mencatat Srivijaya", "Kerana membantu mengukuhkan perluasan kuasa Majapahit"], 3, "Patih Gajah Mada penting kerana membantu mengukuhkan kuasa Majapahit."),
  question("Apakah kepentingan I-Tsing kepada sejarah Srivijaya?", ["Catatannya membuktikan Srivijaya sebagai pusat pembelajaran Buddha", "Beliau mengasaskan Srivijaya", "Beliau membina Palembang", "Beliau memimpin Orang Laut"], 0, "Catatan I-Tsing menjadi bukti kepentingan Srivijaya sebagai pusat Buddha."),
  question("Mengapakah Kedah Tua berkembang sebagai pusat perdagangan?", ["Kerana tidak mempunyai pelabuhan", "Kerana kedudukannya strategik di laluan perdagangan", "Kerana menutup hubungan luar", "Kerana hanya bergantung kepada candi"], 1, "Kedah Tua berkembang kerana kedudukannya strategik di laluan perdagangan."),
  question("Apakah pengajaran daripada perkembangan kerajaan maritim?", ["Perdagangan laut tidak penting", "Pelabuhan perlu ditutup", "Kedudukan strategik dan keselamatan laut penting untuk kemajuan", "Hubungan luar melemahkan kerajaan"], 2, "Kerajaan maritim maju apabila kedudukan, pelabuhan dan keselamatan laut diurus baik."),
  question("Bagaimanakah Sungai Mekong membantu Funan menjadi maju?", ["Dengan menghalang pertanian", "Dengan menjauhkan Funan daripada perdagangan", "Dengan menyebabkan pusat kerajaan berpindah ke Palembang", "Dengan menyokong pertanian dan perhubungan"], 3, "Sungai Mekong memberi sumber air dan laluan perhubungan kepada Funan."),
  question("Mengapakah alam sekitar penting kepada kerajaan agraria?", ["Kerana sumber air dan tanah subur menyokong pertanian", "Kerana kerajaan agraria bergantung pada kapal laut sahaja", "Kerana pelabuhan tidak diperlukan", "Kerana hubungan luar mesti ditutup"], 0, "Kerajaan agraria memerlukan tanah subur dan sumber air untuk pertanian."),
  question("Apakah kesan penguasaan laluan laut oleh Srivijaya?", ["Menjadikan Srivijaya lemah", "Membolehkan Srivijaya mengawal perdagangan maritim", "Menghapuskan kegiatan pelabuhan", "Menjadikan Srivijaya kerajaan agraria sahaja"], 1, "Penguasaan laluan laut membolehkan Srivijaya mengawal perdagangan maritim."),
  question("Mengapakah pusat pemerintahan seperti Palembang penting?", ["Kerana tiada peranan pentadbiran", "Kerana menggantikan semua pelabuhan", "Kerana menjadi pusat kuasa dan pentadbiran kerajaan", "Kerana menghapuskan hubungan luar"], 2, "Pusat pemerintahan penting sebagai pusat kuasa dan pentadbiran kerajaan."),
  question("Apakah kepentingan tulisan awal seperti Pallava?", ["Untuk membina kapal dagang", "Untuk menyimpan air pertanian", "Untuk mengawal laluan laut", "Untuk merekod maklumat dan perkembangan masyarakat"], 3, "Tulisan awal penting untuk merekod maklumat dan perkembangan masyarakat."),
  question("Mengapakah pengaruh agama penting dalam kerajaan Alam Melayu?", ["Membentuk budaya, seni bina dan amalan masyarakat", "Menghapuskan seni bina", "Menghalang perkembangan ilmu", "Menutup pusat ibadat"], 0, "Agama mempengaruhi budaya, seni bina dan amalan masyarakat."),
  question("Apakah kesan perdagangan terhadap budaya Alam Melayu?", ["Budaya menjadi terhapus sepenuhnya", "Berlaku pertukaran budaya, bahasa dan agama", "Semua kerajaan berhenti berdagang", "Hubungan masyarakat menjadi tertutup"], 1, "Perdagangan membawa pertukaran budaya, bahasa dan agama."),
  question("Mengapakah Majapahit dianggap kerajaan yang berpengaruh?", ["Kerana tidak mempunyai pembesar", "Kerana hanya berpusat di pelabuhan kecil", "Kerana mempunyai kepimpinan kuat dan wilayah pengaruh luas", "Kerana menolak perdagangan"], 2, "Majapahit berpengaruh kerana kepimpinan kuat dan wilayah pengaruhnya."),
  question("Apakah pengajaran daripada hubungan diplomatik kerajaan Alam Melayu?", ["Hubungan luar mesti dielakkan", "Kerajaan perlu menutup pelabuhan", "Perdagangan tidak perlu dijaga", "Kerjasama luar dapat mengukuhkan kedudukan kerajaan"], 3, "Hubungan diplomatik menunjukkan kerjasama luar boleh mengukuhkan kerajaan."),
  question("Bagaimanakah pelabuhan membantu penyebaran agama?", ["Menjadi tempat pertemuan pedagang dan pendakwah", "Menutup kedatangan orang luar", "Menghapuskan hubungan masyarakat", "Menghalang kegiatan ilmu"], 0, "Pelabuhan menjadi tempat pedagang dan pendakwah bertemu masyarakat tempatan."),
  question("Mengapakah kerajaan Alam Melayu masyhur?", ["Kerana tidak mempunyai pusat pemerintahan", "Kerana memiliki pentadbiran, ekonomi dan hubungan luar yang berkembang", "Kerana menolak perdagangan", "Kerana semua kerajaan berada di pedalaman sahaja"], 1, "Kerajaan Alam Melayu masyhur kerana pentadbiran, ekonomi dan hubungan luarnya berkembang."),
];

const CHAPTER_FACTS: Record<string, Fact[]> = {
  "Chapter 2": [
    fact("Sistem Pemerintahan Beraja", "Siapakah ketua utama dalam sistem pemerintahan kerajaan Alam Melayu?", "Raja", ["Syahbandar", "Petani", "Pedagang"], "Raja menjadi pemerintah tertinggi dan lambang kuasa kerajaan."),
    fact("Gelaran Pemerintah", "Apakah konsep yang mengaitkan raja dengan unsur ketuhanan?", "Dewaraja", ["Mandala", "Daulat", "Entrepot"], "Konsep dewaraja mengukuhkan kedudukan raja dalam kerajaan Alam Melayu."),
    fact("Kegiatan Ekonomi", "Apakah fungsi pelabuhan entrepot?", "Mengumpul dan mengedarkan barang dagangan", ["Menanam padi", "Menghasilkan prasasti", "Melantik raja"], "Pelabuhan entrepot menjadi tempat persinggahan, tukaran dan edaran barang."),
    fact("Pertanian", "Apakah kegiatan pertanian utama masyarakat Alam Melayu?", "Penanaman padi", ["Perdagangan rempah", "Perlombongan emas", "Pembuatan kapal"], "Padi ialah sumber makanan penting dan disokong sistem pengairan."),
    fact("Pertanian", "Apakah sistem pengairan terkenal kerajaan Angkor?", "Baray", ["Terusan", "Parit pertahanan", "Empangan muara"], "Baray ialah takungan air besar yang membantu pertanian Angkor."),
    fact("Perdagangan", "Mengapakah Selat Melaka penting kepada perdagangan?", "Terletak di laluan maritim strategik", ["Berada di pedalaman", "Tiada pelabuhan", "Jauh daripada pedagang"], "Selat Melaka menghubungkan laluan dagang antara Timur dan Barat."),
    fact("Hasil Hutan dan Laut", "Manakah contoh hasil hutan Alam Melayu?", "Gaharu", ["Bijih timah", "Mutiara", "Tembikar"], "Gaharu, kapur barus, rotan dan damar ialah hasil hutan bernilai."),
    fact("Hasil Hutan dan Laut", "Manakah contoh hasil laut yang didagangkan?", "Mutiara", ["Kapur barus", "Gaharu", "Rotan"], "Mutiara, ikan dan kulit penyu ialah antara hasil laut penting."),
    fact("Perlombongan", "Apakah logam yang dilombong dalam kerajaan Alam Melayu?", "Emas dan bijih timah", ["Gaharu dan damar", "Padi dan lada", "Mutiara dan kulit penyu"], "Emas, bijih besi dan timah menjadi hasil perlombongan bernilai."),
    fact("Pembuatan", "Apakah kegiatan pembuatan yang menyokong perdagangan maritim?", "Pembuatan kapal", ["Pembinaan candi sahaja", "Penyalinan prasasti", "Pembukaan sawah"], "Kemahiran membuat kapal membantu perdagangan dan pelayaran laut."),
  ],
  "Chapter 3": [
    fact("Bahasa", "Apakah bahasa awal yang banyak digunakan pada prasasti?", "Bahasa Sanskrit", ["Bahasa Melayu Kuno", "Bahasa Pali", "Bahasa Arab"], "Bahasa Sanskrit digunakan dalam prasasti dan dipengaruhi hubungan India."),
    fact("Bahasa", "Apakah bahasa tempatan yang berkembang dalam kerajaan maritim?", "Bahasa Melayu Kuno", ["Bahasa Sanskrit", "Bahasa Pali", "Bahasa Arab"], "Bahasa Melayu Kuno berkembang sebagai bahasa perhubungan dan pentadbiran."),
    fact("Tulisan", "Apakah tulisan awal yang digunakan pada batu bersurat Alam Melayu?", "Tulisan Pallava", ["Tulisan Kawi", "Tulisan Jawi", "Tulisan Rencong"], "Tulisan Pallava antara tulisan awal yang ditemukan pada prasasti."),
    fact("Tulisan", "Apakah tulisan yang berkembang di Jawa dan Alam Melayu?", "Tulisan Kawi", ["Tulisan Pallava", "Tulisan Jawi", "Tulisan Rencong"], "Tulisan Kawi digunakan dalam perkembangan persuratan dan pentadbiran."),
    fact("Persuratan", "Di manakah pusat perkembangan persuratan sering berlaku?", "Istana", ["Pelabuhan", "Candi", "Perkampungan petani"], "Istana menjadi pusat kegiatan ilmu, penulisan dan persuratan."),
    fact("Persuratan", "Apakah nilai yang sering ditekankan dalam karya persuratan?", "Kepahlawanan dan kesetiaan", ["Kedaulatan dan perdagangan", "Pertanian dan pengairan", "Perlombongan dan pembuatan"], "Karya persuratan mengangkat nilai kepahlawanan, kesetiaan dan kebijaksanaan."),
    fact("Seni Bina", "Apakah binaan yang menjadi pusat ibadat dan lambang kuasa?", "Candi", ["Istana", "Pelabuhan", "Baray"], "Candi menunjukkan kemajuan seni bina serta pengaruh agama."),
    fact("Seni Bina", "Apakah monumen terkenal kerajaan Angkor?", "Angkor Wat", ["Candi Borobudur", "Candi Lembah Bujang", "Kota Trowulan"], "Angkor Wat menunjukkan kehebatan seni bina kerajaan Angkor."),
    fact("Seni Ukir", "Apakah tujuan seni ukir pada candi dan arca?", "Menggambarkan agama dan status kerajaan", ["Merekod cukai pelabuhan", "Menentukan sempadan mandala", "Menandakan pusat perdagangan"], "Seni ukir memperlihatkan kepercayaan, estetika dan keagungan kerajaan."),
    fact("Struktur Sosial", "Siapakah golongan tertinggi dalam struktur sosial?", "Raja", ["Bangsawan", "Rakyat merdeka", "Hamba"], "Raja berada pada lapisan tertinggi dalam masyarakat kerajaan Alam Melayu."),
  ],
  "Chapter 4": [
    fact("Agama Hindu", "Apakah konsep Hindu yang mengukuhkan kedudukan raja?", "Dewaraja", ["Daulat", "Mandala", "Entrepot"], "Dewaraja mengaitkan raja dengan unsur ketuhanan dan kuasa suci."),
    fact("Agama Hindu", "Apakah binaan yang sering dikaitkan dengan amalan Hindu-Buddha?", "Candi", ["Istana", "Pelabuhan", "Baray"], "Candi menjadi pusat ibadat dan lambang kuasa pemerintah."),
    fact("Agama Buddha", "Kerajaan manakah terkenal sebagai pusat pembelajaran Buddha?", "Srivijaya", ["Gangga Nagara", "Johor Riau", "Melaka"], "Srivijaya dikenali sebagai pusat pembelajaran agama Buddha di Alam Melayu."),
    fact("Agama Islam", "Bagaimanakah Islam tersebar di Alam Melayu?", "Melalui pedagang dan dakwah", ["Melalui sistem baray Angkor", "Melalui konsep dewaraja", "Melalui prasasti Pallava"], "Pedagang, ulama dan pendakwah membantu penyebaran Islam."),
    fact("Kepercayaan Awal", "Apakah maksud animisme?", "Kepercayaan terhadap roh dan semangat alam", ["Kepercayaan kepada daulat raja", "Kepercayaan kepada dewaraja", "Kepercayaan kepada hukum kanun"], "Animisme ialah kepercayaan bahawa alam mempunyai roh atau semangat."),
    fact("Kepercayaan Awal", "Apakah maksud dinamisme?", "Kepercayaan kepada kuasa ghaib pada objek", ["Kepercayaan kepada roh nenek moyang", "Kepercayaan kepada raja mutlak", "Kepercayaan kepada perdagangan entrepot"], "Dinamisme merujuk kepercayaan bahawa objek tertentu memiliki kuasa ghaib."),
    fact("Pemerintahan Beraja", "Apakah unsur yang mengukuhkan pemerintahan beraja?", "Daulat", ["Syahbandar", "Baray", "Entrepot"], "Daulat membantu mengukuhkan penghormatan rakyat terhadap raja."),
    fact("Warisan Kerajaan Alam Melayu", "Apakah warisan penting dalam sosiobudaya Alam Melayu?", "Bahasa, tulisan dan persuratan", ["Sistem pembesar empat lipatan", "Laluan Selat Melaka", "Kegiatan pertanian padi"], "Bahasa, tulisan, persuratan, seni bina dan adat ialah warisan penting."),
    fact("Warisan Kerajaan Alam Melayu", "Mengapakah warisan kerajaan Alam Melayu penting?", "Membentuk identiti dan jati diri masyarakat", ["Menghapuskan budaya tempatan", "Mengurangkan ilmu", "Menutup perdagangan"], "Warisan membantu masyarakat mengenal asal usul dan identiti."),
    fact("Amalan Beragama", "Siapakah golongan yang menyebarkan ajaran agama di pusat ibadat?", "Sami dan pendeta", ["Syahbandar dan bendahara", "Orang Laut", "Pembesar empat lipatan"], "Sami, pendeta, ulama dan pedagang memainkan peranan agama."),
  ],
  "Chapter 5": [
    fact("Pengasasan Melaka", "Siapakah pengasas Kesultanan Melayu Melaka?", "Parameswara", ["Raden Wijaya", "Jayavarman II", "Raja Ali"], "Parameswara mengasaskan Melaka sekitar tahun 1400."),
    fact("Parameswara", "Dari manakah Parameswara berasal?", "Palembang", ["Pattani", "Manila", "Ayutthaya"], "Parameswara merupakan pemerintah dari Palembang sebelum membuka Melaka."),
    fact("Pengasasan Melaka", "Apakah peristiwa yang dikaitkan dengan nama Melaka?", "Pelanduk putih menendang anjing", ["Pokok sena menjadi tempat berteduh", "Kapal Kun-lun po berlabuh", "Baray Angkor dibina"], "Kisah pelanduk putih dikaitkan dengan pemilihan nama Melaka."),
    fact("Faktor Lokasi Strategik", "Mengapakah kedudukan Melaka strategik?", "Terletak di laluan Selat Melaka", ["Terletak jauh di pedalaman", "Terletak di kawasan tanah tinggi", "Terletak jauh daripada laluan dagang"], "Selat Melaka ialah laluan perdagangan penting Timur-Barat."),
    fact("Faktor Lokasi Strategik", "Apakah kelebihan muara sungai Melaka?", "Sesuai menjadi pelabuhan", ["Sesuai menjadi kawasan pertanian padi", "Sesuai menjadi pusat candi", "Sesuai menjadi kawasan perlombongan"], "Muara sungai memudahkan kapal berlabuh dan aktiviti perdagangan."),
    fact("Kegemilangan Melaka", "Apakah jenis pelabuhan Melaka semasa kegemilangannya?", "Pelabuhan entrepot", ["Pelabuhan tertutup", "Pangkalan tentera sahaja", "Pelabuhan kecil tempatan"], "Melaka mengumpulkan dan mengedarkan barang dagangan antarabangsa."),
    fact("Kegemilangan Melaka", "Siapakah pegawai yang mengurus pedagang di Melaka?", "Syahbandar", ["Bendahara", "Laksamana", "Temenggung"], "Syahbandar mengurus pedagang, cukai dan urusan pelabuhan."),
    fact("Kepimpinan Raja", "Apakah sistem pembesar utama Melaka?", "Sistem Pembesar Empat Lipatan", ["Sistem Baray", "Sistem Datu", "Sistem Mandala"], "Sistem Pembesar Empat Lipatan membantu pentadbiran Melaka."),
    fact("Kepimpinan Raja", "Apakah undang-undang penting Melaka?", "Hukum Kanun Melaka", ["Undang-Undang Laut Johor", "Prasasti Kedukan Bukit", "Piagam Funan"], "Hukum Kanun Melaka membantu mengawal pentadbiran dan masyarakat."),
    fact("Pengakhiran Melaka", "Bilakah Portugis menawan Melaka?", "1511", ["1400", "1641", "1528"], "Portugis menawan Melaka pada tahun 1511 dan menamatkan pemerintahan Kesultanan Melayu Melaka di Melaka."),
  ],
  "Chapter 6": [
    fact("Pengasasan Johor Riau", "Siapakah pengasas Kesultanan Johor Riau?", "Raja Ali", ["Parameswara", "Raden Wijaya", "Kaundinya"], "Raja Ali, putera Sultan Mahmud Shah, mengasaskan Kesultanan Johor Riau."),
    fact("Pengasasan Johor Riau", "Apakah gelaran Raja Ali selepas menjadi sultan?", "Sultan Alauddin Riayat Shah I", ["Sultan Mansur Shah", "Sultan Muzaffar Shah", "Sultan Mahmud Shah"], "Raja Ali memakai gelaran Sultan Alauddin Riayat Shah I."),
    fact("Pengasasan Johor Riau", "Di manakah pusat awal Kesultanan Johor Riau?", "Kota Kara, Pekan Tua", ["Kota Trowulan", "Vyadhapura", "Palembang"], "Pusat awal Johor Riau terletak di Kota Kara, Pekan Tua."),
    fact("Cabaran Kesultanan", "Apakah kuasa luar yang mengancam Johor Riau dari Melaka?", "Portugis", ["Acheh", "Belanda", "Siam"], "Portugis di Melaka menjadi ancaman kepada Johor Riau."),
    fact("Cabaran Kesultanan", "Kerajaan manakah bersaing dengan Johor Riau untuk perdagangan?", "Acheh", ["Funan", "Dinasti Tang", "Empayar Kushan"], "Acheh bersaing untuk menguasai perdagangan di Selat Melaka."),
    fact("Strategi Menghadapi Cabaran", "Apakah strategi Johor Riau apabila pusatnya terancam?", "Memindahkan pusat pemerintahan", ["Menutup semua pelabuhan", "Menghapuskan perdagangan", "Menyerah tanpa syarat"], "Johor Riau memindahkan pusat pemerintahan untuk keselamatan dan kelangsungan kerajaan."),
    fact("Strategi Menghadapi Cabaran", "Golongan manakah membantu kekuatan maritim Johor Riau?", "Orang Laut", ["Syahbandar", "Bendahara", "Pendeta"], "Orang Laut membantu menjaga keselamatan perairan dan perdagangan."),
    fact("Kegemilangan Perdagangan", "Apakah pusat perdagangan utama Johor Riau?", "Riau", ["Pekan Tua", "Kota Kara", "Palembang"], "Riau berkembang sebagai pusat perdagangan utama Johor Riau."),
    fact("Kegemilangan Perdagangan", "Apakah barang dagangan penting Johor Riau?", "Lada hitam dan bijih timah", ["Gaharu dan kapur barus sahaja", "Padi dan baray", "Prasasti dan candi"], "Lada hitam, rempah, bijih timah dan hasil hutan menjadi barang dagangan."),
    fact("Persuratan Johor Riau", "Mengapakah Johor Riau penting dalam persuratan Melayu?", "Menjadi pusat penghasilan karya dan ilmu", ["Menutup kegiatan tulisan", "Menghapuskan tulisan Jawi", "Hanya fokus kepada pertanian"], "Johor Riau menjadi pusat persuratan, ilmu dan perkembangan tulisan Jawi."),
  ],
};

const QUESTION_PATTERNS = [
  (fact: Fact) => ({
    question: fact.prompt,
    options: [fact.answer, ...fact.distractors],
    explanation: fact.explanation,
  }),
  (fact: Fact) => ({
    question: `Dalam topik ${fact.topic}, apakah fakta yang paling tepat?`,
    options: [fact.answer, ...fact.distractors],
    explanation: fact.explanation,
  }),
  (fact: Fact) => ({
    question: `Soalan UASA: Pilih jawapan yang betul berkaitan ${fact.topic}.`,
    options: [fact.answer, ...fact.distractors],
    explanation: fact.explanation,
  }),
];

export function getSejarahF2ObjectiveQuiz(
  chapterKey: string,
  objectiveId: SejarahF2ObjectiveId,
): SejarahF2ObjectiveQuestion[] {
  if (chapterKey === "Chapter 1") {
    if (objectiveId === "objective-1") return CHAPTER_1_OBJECTIVE_A_QUESTIONS;
    if (objectiveId === "objective-2") return CHAPTER_1_OBJECTIVE_B_QUESTIONS;
    if (objectiveId === "objective-3") return CHAPTER_1_OBJECTIVE_C_QUESTIONS;
    return [];
  }

  const facts = CHAPTER_FACTS[chapterKey] ?? [];
  const objective = SEJARAH_F2_OBJECTIVES.find((item) => item.id === objectiveId);
  if (!objective || facts.length === 0) return [];

  return Array.from({ length: 30 }, (_, index) => {
    const factItem = facts[index % facts.length];
    const pattern = QUESTION_PATTERNS[Math.floor(index / facts.length) % QUESTION_PATTERNS.length];
    const generated = pattern(factItem);
    return {
      question: generated.question,
      options: generated.options,
      answerIndex: 0,
      explanation: generated.explanation,
      difficulty: objective.difficulty,
      subjectId: "sejarah",
    };
  });
}

function fact(
  topic: string,
  prompt: string,
  answer: string,
  distractors: string[],
  explanation: string,
): Fact {
  return { topic, prompt, answer, distractors, explanation };
}

function question(
  prompt: string,
  options: string[],
  answerIndex: number,
  explanation: string,
  difficulty: Difficulty = "Easy",
): SejarahF2ObjectiveQuestion {
  return {
    question: prompt,
    options,
    answerIndex,
    explanation,
    difficulty,
    subjectId: "sejarah",
  };
}
