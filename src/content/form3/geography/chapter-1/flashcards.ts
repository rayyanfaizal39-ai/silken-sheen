import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Apakah definisi jadual?",
    "Cara untuk mempersembahkan data dan maklumat secara tersusun supaya mudah dibaca, difahami, dan ditafsir.",
  ],
  ["Nyatakan tiga ciri utama sebuah jadual.", "Tajuk, Data dan Maklumat, serta Sumber."],
  [
    "Apakah fungsi tajuk dalam jadual?",
    "Memberikan gambaran tentang kandungan data yang dipersembahkan.",
  ],
  [
    "Mengapakah sumber perlu dinyatakan dalam jadual?",
    "Untuk membuktikan data tersebut sah dan boleh dipercayai.",
  ],
  [
    "Apakah kegunaan utama jadual?",
    "Digunakan untuk menghasilkan graf mengikut kesesuaian dan melihat pertalian antara dua set maklumat.",
  ],
  ["Apakah kaedah pengumpulan maklumat yang paling mudah dan cepat?", "Kaedah pemerhatian."],
  [
    "Terangkan kaedah pemerhatian.",
    "Memerhati dan mencatat perkara yang berkaitan dengan maklumat yang hendak dikumpulkan secara terus.",
  ],
  [
    "Bagaimanakah kaedah temu bual dijalankan?",
    "Secara lisan melalui perjumpaan atau soal jawab dengan seseorang untuk mendapatkan berita, pendapat, atau nasihat.",
  ],
  [
    "Apakah itu kaedah Banci?",
    "Kaedah pengumpulan maklumat berkaitan sesuatu jumlah yang dihitung, contohnya menghitung jumlah penduduk oleh Jabatan Perangkaan Malaysia.",
  ],
  [
    "Apakah proses dalam kaedah soal selidik?",
    "Mengedarkan borang soal selidik kepada orang ramai dan mengumpulkannya semula setelah diisi.",
  ],
  [
    "Apakah yang dimaksudkan dengan rujukan kepustakaan?",
    "Merujuk kepada bahan terbitan sedia ada seperti buku, majalah, risalah, akhbar, dan laman web.",
  ],
  [
    "Apakah definisi graf?",
    "Persembahan data dalam bentuk visual seperti graf bar mudah, graf garisan mudah, dan graf gabungan.",
  ],
  [
    "Nyatakan ciri utama Graf Bar Mudah.",
    "Mempunyai paksi menegak, paksi mendatar, tajuk, dan petunjuk. Bar dilukis secara menegak atau mendatar.",
  ],
  [
    "Bilakah Graf Bar Mudah sesuai digunakan?",
    "Apabila data boleh dikira satu persatu seperti bilangan orang, kereta, atau rumah.",
  ],
  [
    "Apakah fungsi paksi menegak dalam graf bar?",
    "Menunjukkan kuantiti atau bilangan sesuatu komponen.",
  ],
  [
    "Apakah ciri utama Graf Garisan Mudah?",
    "Dilukis secara garisan yang panjang dan bersambung untuk menunjukkan perubahan nilai yang berterusan.",
  ],
  [
    "Apakah maksud garisan yang curam pada graf garisan?",
    "Menggambarkan perubahan nilai yang besar atau drastik.",
  ],
  [
    "Apakah maksud garisan yang landai pada graf garisan?",
    "Menggambarkan perubahan nilai yang kecil.",
  ],
  [
    "Apakah maksud garisan mendatar pada graf garisan?",
    "Bermakna tiada sebarang perubahan yang berlaku pada nilai tersebut dalam tempoh masa tertentu.",
  ],
  [
    "Nyatakan definisi Graf Gabungan.",
    "Gabungan graf bar mudah dan graf garisan mudah dalam satu graf.",
  ],
  [
    "Apakah kegunaan Graf Gabungan?",
    "Menunjukkan dua maklumat yang berlainan tetapi saling berkaitan, contohnya suhu dan hujan.",
  ],
  [
    "Apakah langkah pertama membina jadual?",
    "Menyusun data dan maklumat yang diperoleh dalam bentuk jadual yang mudah dibaca.",
  ],
  [
    "Apakah kaedah gundalan (tally)?",
    "Cara mengira kekerapan data menggunakan tanda garis sebelum diringkaskan kepada nombor.",
  ],
  [
    "Apakah empat langkah asas melukis graf?",
    `(1) Lukis paksi mendatar dan menegak.
(2) Pilih skala yang sesuai.
(3) Plotkan titik atau lukis bar.
(4) Lengkapkan tajuk, label, dan petunjuk.`,
  ],
  [
    "Mengapakah ketepatan skala kritikal semasa membina graf?",
    "Supaya mesej data tidak disalah faham oleh pembaca.",
  ],
  ["Nyatakan langkah pertama dalam mentafsir jadual atau graf.", "Memperhatikan tajuk."],
  [
    "Apakah yang perlu dilakukan selepas mengenal pasti nilai maksimum dan minimum semasa mentafsir?",
    "Menghuraikan aliran perubahan data (untuk graf garisan) dan menghuraikan isi tersirat.",
  ],
  [
    'Apakah yang dimaksudkan dengan "Isi Tersirat" dalam tafsiran?',
    'Merungkai soalan "mengapa" dan "kenapa" sesuatu trend data berkelakuan sedemikian.',
  ],
  ["Apakah langkah terakhir dalam mentafsir graf?", "Membuat rumusan secara keseluruhan."],
  [
    "Apakah kepentingan tafsiran graf yang terperinci?",
    "Ia membantu mengembangkan data dan menterjemahkan fenomena alam atau aktiviti manusia secara lebih mendalam.",
  ],
] as const;

export const geographyF3C1Flashcards: Flashcard[] = Array.from({ length: 60 }, (_, index) => {
  const [front, back] = flashcardContent[index % flashcardContent.length];

  return {
    id: `geo-f3-c1-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 1",
    front,
    back,
  };
});
