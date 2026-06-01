export interface VideoResource {
  id: string;
  subjectId: string;
  form: "Form 1" | "Form 2" | "Form 3";
  title: string;
  chapter: string;
  youtubeId?: string;
  duration: number; // in minutes
  description: string;
}

export const form1Videos: VideoResource[] = [
  // Bahasa Melayu
  {
    id: "bm-v1",
    subjectId: "bm",
    form: "Form 1",
    title: "Kelas Kata dalam Bahasa Melayu",
    chapter: "Tatabahasa Asas",
    duration: 12,
    description: "Pengenalan lengkap kepada 9 kelas kata dengan contoh-contoh praktikal.",
  },
  {
    id: "bm-v2",
    subjectId: "bm",
    form: "Form 1",
    title: "Struktur Ayat: Subjek, Predikat, Objek",
    chapter: "Struktur Ayat",
    duration: 15,
    description: "Memahami komponen utama ayat dan cara menganalisisnya.",
  },
  {
    id: "bm-v3",
    subjectId: "bm",
    form: "Form 1",
    title: "Cara Menulis Karangan Deskriptif",
    chapter: "Karangan Deskriptif",
    duration: 18,
    description: "Teknik menulis yang membuat pembaca merasakan dan melihat apa yang digambarkan.",
  },

  // English
  {
    id: "eng-v1",
    subjectId: "english",
    form: "Form 1",
    title: "Present Tense: Simple Present vs Present Continuous",
    chapter: "Present Tense",
    duration: 14,
    description: "Perbezaan dan penggunaan kedua-dua bentuk present tense dengan banyak contoh.",
  },
  {
    id: "eng-v2",
    subjectId: "english",
    form: "Form 1",
    title: "English Vocabulary for Beginners",
    chapter: "Vocabulary Building",
    duration: 20,
    description: "Pelajari vocabulary penting untuk tingkatan pertama dengan kategori: keluarga, sekolah, hobi.",
  },
  {
    id: "eng-v3",
    subjectId: "english",
    form: "Form 1",
    title: "Reading Comprehension Strategies",
    chapter: "Reading Comprehension",
    duration: 16,
    description: "Strategi membaca dan memahami teks dengan menjawab soalan pemahaman.",
  },

  // Mathematics
  {
    id: "math-v1",
    subjectId: "math",
    form: "Form 1",
    title: "Operasi Nombor Negatif",
    chapter: "Number Systems",
    duration: 13,
    description: "Cara menambah, menolak, mendarab, dan membahagi nombor positif dan negatif.",
  },
  {
    id: "math-v2",
    subjectId: "math",
    form: "Form 1",
    title: "Algebra untuk Pemula",
    chapter: "Algebraic Expressions",
    duration: 17,
    description: "Pengenalan kepada algebra, pemboleh ubah, dan ungkapan algebra dengan latihan.",
  },
  {
    id: "math-v3",
    subjectId: "math",
    form: "Form 1",
    title: "Persamaan Linear: Cara Menyelesaikan",
    chapter: "Linear Equations",
    duration: 15,
    description: "Teknik menyelesaikan persamaan linear langkah demi langkah.",
  },
  {
    id: "math-v4",
    subjectId: "math",
    form: "Form 1",
    title: "Geometri: Bentuk 2D dan Luas",
    chapter: "Geometry",
    duration: 18,
    description: "Memahami bentuk dua dimensi, mengira perimeter dan luas.",
  },

  // Science
  {
    id: "sci-v1",
    subjectId: "science",
    form: "Form 1",
    title: "Struktur Sel: Sel Haiwan vs Sel Tumbuhan",
    chapter: "Cell Structure",
    duration: 16,
    description: "Pelajari bahagian-bahagian sel dan perbezaan antara sel haiwan dan tumbuhan.",
  },
  {
    id: "sci-v2",
    subjectId: "science",
    form: "Form 1",
    title: "Hukum Newton: Gerakan dan Daya",
    chapter: "Forces and Motion",
    duration: 19,
    description: "Memahami ketiga-tiga hukum Newton dengan demonstrasi dan contoh.",
  },
  {
    id: "sci-v3",
    subjectId: "science",
    form: "Form 1",
    title: "Bentuk-bentuk Tenaga",
    chapter: "Energy",
    duration: 14,
    description: "Jenis-jenis tenaga (kinetik, keupayaan, haba, cahaya, bunyi) dan cara transformasi.",
  },

  // Geography
  {
    id: "geo-v1",
    subjectId: "geography",
    form: "Form 1",
    title: "Membaca Peta: Latitud, Longitud, dan Skala",
    chapter: "Earth and Maps",
    duration: 15,
    description: "Cara membaca peta, memahami koordinat, dan menggunakan skala peta.",
  },
  {
    id: "geo-v2",
    subjectId: "geography",
    form: "Form 1",
    title: "Cuaca dan Iklim Malaysia",
    chapter: "Weather and Climate",
    duration: 17,
    description: "Iklim tropikal Malaysia, monsun, dan corak hujan sepanjang tahun.",
  },
  {
    id: "geo-v3",
    subjectId: "geography",
    form: "Form 1",
    title: "Bentuklahan: Gunung, Sungai, dan Pantai",
    chapter: "Landforms",
    duration: 16,
    description: "Bagaimana bentuklahan tercipta melalui pengikisan dan pemendapan.",
  },
  {
    id: "geo-v4",
    subjectId: "geography",
    form: "Form 1",
    title: "Populasi dan Pemukiman",
    chapter: "Population",
    duration: 14,
    description: "Taburan penduduk, jenis pemukiman (luar bandar dan bandar), dan urbanisasi.",
  },

  // Sejarah (History)
  {
    id: "sej-v1",
    subjectId: "sejarah",
    form: "Form 1",
    title: "Zaman Prasejarah Nusantara",
    chapter: "Zaman Prasejarah",
    duration: 13,
    description: "Sejarah awal Nusantara sebelum penulisan, bukti arkeologi, dan budaya purba.",
  },
  {
    id: "sej-v2",
    subjectId: "sejarah",
    form: "Form 1",
    title: "Kerajaan Srivijaya dan Majapahit",
    chapter: "Zaman Klasik",
    duration: 16,
    description: "Kuasa maritim Srivijaya dan Majapahit, perdagangan, dan pengaruh Hindu-Buddha.",
  },
  {
    id: "sej-v3",
    subjectId: "sejarah",
    form: "Form 1",
    title: "Penyebaran Islam di Nusantara",
    chapter: "Kedatangan Islam",
    duration: 15,
    description: "Bagaimana Islam berkembang di kawasan Melayu melalui perdagangan dan perkawinan.",
  },
  {
    id: "sej-v4",
    subjectId: "sejarah",
    form: "Form 1",
    title: "Kedatangan Barat: Portugis, Belanda, Inggris",
    chapter: "Zaman Penjajahan",
    duration: 18,
    description: "Kehadiran kuasa Barat di Nusantara dan dampak terhadap masyarakat tempatan.",
  },
];
