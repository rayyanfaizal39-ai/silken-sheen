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
    badge: "📝",
    title: "Objektif 1",
    level: "Easy",
    difficulty: "Easy",
    tone: "from-emerald-500 to-teal-500",
    purpose: ["Fakta asas", "Tokoh dan tempat", "Recall pantas"],
  },
  {
    id: "objective-2",
    badge: "📝",
    title: "Objektif 2",
    level: "Medium",
    difficulty: "Medium",
    tone: "from-amber-400 to-orange-500",
    purpose: ["Perbandingan", "Sebab dan kesan", "Aplikasi konsep"],
  },
  {
    id: "objective-3",
    badge: "📝",
    title: "Objektif 3",
    level: "UASA Exam Level",
    difficulty: "Hard",
    tone: "from-rose-500 to-red-600",
    purpose: ["KBAT ringan", "Analisis fakta", "Latihan gaya peperiksaan"],
  },
];

type Fact = {
  topic: string;
  prompt: string;
  answer: string;
  distractors: string[];
  explanation: string;
};

const CHAPTER_FACTS: Record<string, Fact[]> = {
  "Chapter 1": [
    fact("Konsep Alam Melayu", "Apakah rumpun bahasa yang penting dalam Alam Melayu?", "Bahasa Melayu-Polinesia", ["Bahasa Latin", "Bahasa Mandarin", "Bahasa Parsi"], "Alam Melayu berkongsi bahasa serumpun, khususnya rumpun Melayu-Polinesia atau Austronesia."),
    fact("Kerajaan Funan", "Di manakah pusat kerajaan Funan?", "Vyadhapura", ["Palembang", "Indrapura", "Kota Trowulan"], "Funan berpusat di Vyadhapura dan berkembang di sekitar lembangan Sungai Mekong."),
    fact("Kerajaan Champa", "Siapakah pengasas kerajaan Champa?", "Chu-Lien", ["Kaundinya", "Raden Wijaya", "Jayavarman II"], "Champa diasaskan oleh Chu-Lien dan berkembang di Vietnam tengah serta selatan."),
    fact("Kerajaan Srivijaya", "Apakah pusat kerajaan Srivijaya?", "Palembang", ["Hariharalaya", "Sungai Mas", "Pangkalan"], "Srivijaya berpusat di Palembang dan terkenal sebagai kerajaan maritim."),
    fact("Kerajaan Angkor", "Siapakah pengasas kerajaan Angkor?", "Jayavarman II", ["Fan Shih-man", "Che Bong Nga", "Raja Ganji Sarjuna"], "Jayavarman II mengasaskan Angkor dan mengukuhkan sistem pemerintahan beraja."),
    fact("Kerajaan Majapahit", "Siapakah pengasas kerajaan Majapahit?", "Raden Wijaya", ["Kaundinya", "Dapunta Hyang", "Suryavarman II"], "Majapahit diasaskan oleh Raden Wijaya dan mencapai kegemilangan pada zaman Hayam Wuruk."),
    fact("Kerajaan Kedah Tua", "Apakah kawasan penting kerajaan Kedah Tua?", "Lembah Bujang", ["Lembah Klang", "Lembah Mekong", "Lembah Chao Phraya"], "Kedah Tua terkenal melalui tapak arkeologi dan pelabuhan di Lembah Bujang."),
    fact("Kerajaan Gangga Nagara", "Siapakah pengasas yang dikaitkan dengan Gangga Nagara?", "Raja Ganji Sarjuna", ["Parameswara", "Sultan Alauddin Riayat Shah I", "Patih Gajah Mada"], "Gangga Nagara dikaitkan dengan Raja Ganji Sarjuna dan kawasan pantai barat Semenanjung."),
    fact("Hubungan Luar", "Apakah tujuan utama hubungan luar kerajaan Alam Melayu?", "Mengukuhkan perdagangan dan diplomatik", ["Menghapuskan pelabuhan", "Menutup laluan laut", "Mengurangkan hasil ekonomi"], "Hubungan luar membantu perdagangan, diplomasi, agama dan keselamatan maritim."),
    fact("Hubungan Luar", "Apakah kapal besar Alam Melayu yang dicatat sumber China?", "Kun-lun po", ["Kapal korek", "Lancaran Siam", "Ghali Portugis"], "Kun-lun po merujuk kapal besar yang menunjukkan kemajuan maritim Alam Melayu."),
  ],
  "Chapter 2": [
    fact("Sistem Pemerintahan Beraja", "Siapakah ketua utama dalam sistem pemerintahan kerajaan Alam Melayu?", "Raja", ["Syahbandar", "Petani", "Pedagang"], "Raja menjadi pemerintah tertinggi dan lambang kuasa kerajaan."),
    fact("Gelaran Pemerintah", "Apakah konsep yang mengaitkan raja dengan unsur ketuhanan?", "Dewaraja", ["Demokrasi", "Mandala Rakyat", "Barter"], "Konsep dewaraja mengukuhkan kedudukan raja dalam kerajaan Alam Melayu."),
    fact("Kegiatan Ekonomi", "Apakah fungsi pelabuhan entrepot?", "Mengumpul dan mengedarkan barang dagangan", ["Menanam padi", "Menghasilkan prasasti", "Melantik raja"], "Pelabuhan entrepot menjadi tempat persinggahan, tukaran dan edaran barang."),
    fact("Pertanian", "Apakah kegiatan pertanian utama masyarakat Alam Melayu?", "Penanaman padi", ["Penternakan unta", "Penanaman gandum Eropah", "Perladangan kapas"], "Padi ialah sumber makanan penting dan disokong sistem pengairan."),
    fact("Pertanian", "Apakah sistem pengairan terkenal kerajaan Angkor?", "Baray", ["Terusan Suez", "Empangan Hoover", "Akueduk Rom"], "Baray ialah takungan air besar yang membantu pertanian Angkor."),
    fact("Perdagangan", "Mengapakah Selat Melaka penting kepada perdagangan?", "Terletak di laluan maritim strategik", ["Berada di gurun", "Tiada pelabuhan", "Jauh daripada pedagang"], "Selat Melaka menghubungkan laluan dagang antara Timur dan Barat."),
    fact("Hasil Hutan dan Laut", "Manakah contoh hasil hutan Alam Melayu?", "Gaharu", ["Sutera China", "Gandum", "Wain"], "Gaharu, kapur barus, rotan dan damar ialah hasil hutan bernilai."),
    fact("Hasil Hutan dan Laut", "Manakah contoh hasil laut yang didagangkan?", "Mutiara", ["Batu bata", "Kapas", "Kertas"], "Mutiara, ikan dan kulit penyu ialah antara hasil laut penting."),
    fact("Perlombongan", "Apakah logam yang dilombong dalam kerajaan Alam Melayu?", "Emas dan bijih timah", ["Uranium dan platinum", "Arang batu sahaja", "Bauksit moden"], "Emas, bijih besi dan timah menjadi hasil perlombongan bernilai."),
    fact("Pembuatan", "Apakah kegiatan pembuatan yang menyokong perdagangan maritim?", "Pembuatan kapal", ["Pembuatan kereta api", "Pembuatan kapal terbang", "Pembuatan telefon"], "Kemahiran membuat kapal membantu perdagangan dan pelayaran laut."),
  ],
  "Chapter 3": [
    fact("Bahasa", "Apakah bahasa awal yang banyak digunakan pada prasasti?", "Bahasa Sanskrit", ["Bahasa Perancis", "Bahasa Rusia", "Bahasa Sepanyol"], "Bahasa Sanskrit digunakan dalam prasasti dan dipengaruhi hubungan India."),
    fact("Bahasa", "Apakah bahasa tempatan yang berkembang dalam kerajaan maritim?", "Bahasa Melayu Kuno", ["Bahasa Latin", "Bahasa Yunani", "Bahasa Korea"], "Bahasa Melayu Kuno berkembang sebagai bahasa perhubungan dan pentadbiran."),
    fact("Tulisan", "Apakah tulisan awal yang digunakan pada batu bersurat Alam Melayu?", "Tulisan Pallava", ["Tulisan Rumi moden", "Tulisan Cyrillic", "Tulisan Hangul"], "Tulisan Pallava antara tulisan awal yang ditemukan pada prasasti."),
    fact("Tulisan", "Apakah tulisan yang berkembang di Jawa dan Alam Melayu?", "Tulisan Kawi", ["Tulisan Jawi moden sahaja", "Tulisan Latin", "Tulisan Morse"], "Tulisan Kawi digunakan dalam perkembangan persuratan dan pentadbiran."),
    fact("Persuratan", "Di manakah pusat perkembangan persuratan sering berlaku?", "Istana", ["Pasar malam", "Lombong", "Kandang ternakan"], "Istana menjadi pusat kegiatan ilmu, penulisan dan persuratan."),
    fact("Persuratan", "Apakah nilai yang sering ditekankan dalam karya persuratan?", "Kepahlawanan dan kesetiaan", ["Pembaziran", "Perpecahan", "Kemalasan"], "Karya persuratan mengangkat nilai kepahlawanan, kesetiaan dan kebijaksanaan."),
    fact("Seni Bina", "Apakah binaan yang menjadi pusat ibadat dan lambang kuasa?", "Candi", ["Kincir moden", "Stadium", "Menara radio"], "Candi menunjukkan kemajuan seni bina serta pengaruh agama."),
    fact("Seni Bina", "Apakah monumen terkenal kerajaan Angkor?", "Angkor Wat", ["Colosseum", "Taj Mahal", "Tembok Besar China"], "Angkor Wat menunjukkan kehebatan seni bina kerajaan Angkor."),
    fact("Seni Ukir", "Apakah tujuan seni ukir pada candi dan arca?", "Menggambarkan agama dan status kerajaan", ["Menanda parkir", "Menjadi mata wang", "Mengukur hujan"], "Seni ukir memperlihatkan kepercayaan, estetika dan keagungan kerajaan."),
    fact("Struktur Sosial", "Siapakah golongan tertinggi dalam struktur sosial?", "Raja", ["Hamba", "Petani", "Artisan"], "Raja berada pada lapisan tertinggi dalam masyarakat kerajaan Alam Melayu."),
  ],
  "Chapter 4": [
    fact("Agama Hindu", "Apakah konsep Hindu yang mengukuhkan kedudukan raja?", "Dewaraja", ["Syahbandar", "Daulat rakyat", "Baray"], "Dewaraja mengaitkan raja dengan unsur ketuhanan dan kuasa suci."),
    fact("Agama Hindu", "Apakah binaan yang sering dikaitkan dengan amalan Hindu-Buddha?", "Candi", ["Rumah api moden", "Masjid terapung", "Stesen kereta api"], "Candi menjadi pusat ibadat dan lambang kuasa pemerintah."),
    fact("Agama Buddha", "Kerajaan manakah terkenal sebagai pusat pembelajaran Buddha?", "Srivijaya", ["Gangga Nagara", "Johor Riau", "Melaka Portugis"], "Srivijaya dikenali sebagai pusat pembelajaran agama Buddha di Alam Melayu."),
    fact("Agama Islam", "Bagaimanakah Islam tersebar di Alam Melayu?", "Melalui pedagang dan dakwah", ["Melalui paksaan Rom", "Melalui penjajahan Viking", "Melalui peperangan dunia"], "Pedagang, ulama dan pendakwah membantu penyebaran Islam."),
    fact("Kepercayaan Awal", "Apakah maksud animisme?", "Kepercayaan terhadap roh dan semangat alam", ["Kepercayaan kepada wang", "Sistem pilihan raya", "Teknik pertanian"], "Animisme ialah kepercayaan bahawa alam mempunyai roh atau semangat."),
    fact("Kepercayaan Awal", "Apakah maksud dinamisme?", "Kepercayaan kepada kuasa ghaib pada objek", ["Sistem cukai", "Bahasa rasmi", "Perdagangan rempah"], "Dinamisme merujuk kepercayaan bahawa objek tertentu memiliki kuasa ghaib."),
    fact("Pemerintahan Beraja", "Apakah unsur yang mengukuhkan pemerintahan beraja?", "Daulat", ["Buruh paksa moden", "Pilihan raya", "Sistem republik"], "Daulat membantu mengukuhkan penghormatan rakyat terhadap raja."),
    fact("Warisan Kerajaan Alam Melayu", "Apakah warisan penting dalam sosiobudaya Alam Melayu?", "Bahasa, tulisan dan persuratan", ["Sukan Olimpik", "Mesin wap", "Telefon pintar"], "Bahasa, tulisan, persuratan, seni bina dan adat ialah warisan penting."),
    fact("Warisan Kerajaan Alam Melayu", "Mengapakah warisan kerajaan Alam Melayu penting?", "Membentuk identiti dan jati diri masyarakat", ["Menghapuskan budaya tempatan", "Mengurangkan ilmu", "Menutup perdagangan"], "Warisan membantu masyarakat mengenal asal usul dan identiti."),
    fact("Amalan Beragama", "Siapakah golongan yang menyebarkan ajaran agama di pusat ibadat?", "Sami dan pendeta", ["Lanun", "Petani sahaja", "Tukang besi sahaja"], "Sami, pendeta, ulama dan pedagang memainkan peranan agama."),
  ],
  "Chapter 5": [
    fact("Pengasasan Melaka", "Siapakah pengasas Kesultanan Melayu Melaka?", "Parameswara", ["Raden Wijaya", "Jayavarman II", "Raja Ali"], "Parameswara mengasaskan Melaka sekitar tahun 1400."),
    fact("Parameswara", "Dari manakah Parameswara berasal?", "Palembang", ["Pattani", "Manila", "Ayutthaya"], "Parameswara merupakan pemerintah dari Palembang sebelum membuka Melaka."),
    fact("Pengasasan Melaka", "Apakah peristiwa yang dikaitkan dengan nama Melaka?", "Pelanduk putih menendang anjing", ["Kapal karam di Laut Merah", "Letusan gunung berapi", "Penemuan bijih timah"], "Kisah pelanduk putih dikaitkan dengan pemilihan nama Melaka."),
    fact("Faktor Lokasi Strategik", "Mengapakah kedudukan Melaka strategik?", "Terletak di laluan Selat Melaka", ["Terletak di kawasan Artik", "Jauh daripada laut", "Tiada sungai"], "Selat Melaka ialah laluan perdagangan penting Timur-Barat."),
    fact("Faktor Lokasi Strategik", "Apakah kelebihan muara sungai Melaka?", "Sesuai menjadi pelabuhan", ["Sesuai menjadi gurun", "Menghalang kapal", "Tiada sumber air"], "Muara sungai memudahkan kapal berlabuh dan aktiviti perdagangan."),
    fact("Kegemilangan Melaka", "Apakah jenis pelabuhan Melaka semasa kegemilangannya?", "Pelabuhan entrepot", ["Pelabuhan tertutup", "Pangkalan tentera sahaja", "Pelabuhan kecil tempatan"], "Melaka mengumpulkan dan mengedarkan barang dagangan antarabangsa."),
    fact("Kegemilangan Melaka", "Siapakah pegawai yang mengurus pedagang di Melaka?", "Syahbandar", ["Bendahara sahaja", "Laksamana sahaja", "Temenggung sahaja"], "Syahbandar mengurus pedagang, cukai dan urusan pelabuhan."),
    fact("Kepimpinan Raja", "Apakah sistem pembesar utama Melaka?", "Sistem Pembesar Empat Lipatan", ["Sistem Baray", "Sistem Datu", "Sistem Mandala China"], "Sistem Pembesar Empat Lipatan membantu pentadbiran Melaka."),
    fact("Kepimpinan Raja", "Apakah undang-undang penting Melaka?", "Hukum Kanun Melaka", ["Kod Hammurabi", "Magna Carta", "Undang-undang Draco"], "Hukum Kanun Melaka membantu mengawal pentadbiran dan masyarakat."),
    fact("Pengakhiran Melaka", "Bilakah Portugis menawan Melaka?", "1511", ["1400", "1641", "1957"], "Portugis menawan Melaka pada tahun 1511 dan menamatkan pemerintahan Kesultanan Melayu Melaka di Melaka."),
  ],
  "Chapter 6": [
    fact("Pengasasan Johor Riau", "Siapakah pengasas Kesultanan Johor Riau?", "Raja Ali", ["Parameswara", "Raden Wijaya", "Kaundinya"], "Raja Ali, putera Sultan Mahmud Shah, mengasaskan Kesultanan Johor Riau."),
    fact("Pengasasan Johor Riau", "Apakah gelaran Raja Ali selepas menjadi sultan?", "Sultan Alauddin Riayat Shah I", ["Sultan Mansur Shah", "Sultan Muzaffar Shah", "Sultan Mahmud Shah"], "Raja Ali memakai gelaran Sultan Alauddin Riayat Shah I."),
    fact("Pengasasan Johor Riau", "Di manakah pusat awal Kesultanan Johor Riau?", "Kota Kara, Pekan Tua", ["Kota Trowulan", "Vyadhapura", "Palembang"], "Pusat awal Johor Riau terletak di Kota Kara, Pekan Tua."),
    fact("Cabaran Kesultanan", "Apakah kuasa luar yang mengancam Johor Riau dari Melaka?", "Portugis", ["Rom", "Han", "Kushan"], "Portugis di Melaka menjadi ancaman kepada Johor Riau."),
    fact("Cabaran Kesultanan", "Kerajaan manakah bersaing dengan Johor Riau untuk perdagangan?", "Acheh", ["Funan", "Dinasti Tang", "Empayar Kushan"], "Acheh bersaing untuk menguasai perdagangan di Selat Melaka."),
    fact("Strategi Menghadapi Cabaran", "Apakah strategi Johor Riau apabila pusatnya terancam?", "Memindahkan pusat pemerintahan", ["Menutup semua pelabuhan", "Menghapuskan perdagangan", "Menyerah tanpa syarat"], "Johor Riau memindahkan pusat pemerintahan untuk keselamatan dan kelangsungan kerajaan."),
    fact("Strategi Menghadapi Cabaran", "Golongan manakah membantu kekuatan maritim Johor Riau?", "Orang Laut", ["Tentera Rom", "Samurai", "Pedagang Viking"], "Orang Laut membantu menjaga keselamatan perairan dan perdagangan."),
    fact("Kegemilangan Perdagangan", "Apakah pusat perdagangan utama Johor Riau?", "Riau", ["Angkor", "Indrapura", "Lembah Bujang"], "Riau berkembang sebagai pusat perdagangan utama Johor Riau."),
    fact("Kegemilangan Perdagangan", "Apakah barang dagangan penting Johor Riau?", "Lada hitam dan bijih timah", ["Ais dan salji", "Wain Eropah", "Sutera Rom"], "Lada hitam, rempah, bijih timah dan hasil hutan menjadi barang dagangan."),
    fact("Persuratan Johor Riau", "Mengapakah Johor Riau penting dalam persuratan Melayu?", "Menjadi pusat penghasilan karya dan ilmu", ["Menutup kegiatan tulisan", "Menghapuskan Jawi", "Hanya fokus pertanian"], "Johor Riau menjadi pusat persuratan, ilmu dan perkembangan tulisan Jawi."),
  ],
};

const QUESTION_PATTERNS = [
  (fact: Fact) => ({
    question: `${fact.prompt}`,
    options: [fact.answer, ...fact.distractors],
    explanation: fact.explanation,
  }),
  (fact: Fact) => ({
    question: `Soalan ${fact.topic}: pilih pernyataan yang tepat.`,
    options: [
      fact.explanation,
      `Topik ini tidak berkaitan dengan ${fact.topic}.`,
      `${fact.topic} hanya berlaku selepas abad ke-20.`,
      `${fact.topic} tidak memberi kesan kepada Sejarah Tingkatan 2.`,
    ],
    explanation: fact.explanation,
  }),
  (fact: Fact) => ({
    question: `Manakah jawapan terbaik untuk fakta "${fact.topic}"?`,
    options: [fact.answer, ...fact.distractors],
    explanation: fact.explanation,
  }),
];

export function getSejarahF2ObjectiveQuiz(
  chapterKey: string,
  objectiveId: SejarahF2ObjectiveId,
): SejarahF2ObjectiveQuestion[] {
  const facts = CHAPTER_FACTS[chapterKey] ?? [];
  const objective = SEJARAH_F2_OBJECTIVES.find((item) => item.id === objectiveId);
  if (!objective || facts.length === 0) return [];

  return Array.from({ length: 30 }, (_, index) => {
    const factItem = facts[index % facts.length];
    const pattern = QUESTION_PATTERNS[Math.floor(index / facts.length) % QUESTION_PATTERNS.length];
    const generated = pattern(factItem);
    return {
      question: `${index + 1}. ${generated.question}`,
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
