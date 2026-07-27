import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Apakah definisi hidupan liar mengikut Akta 2010?",
    "Spesies haiwan liar atau burung liar, sama ada dilindungi atau dilindungi sepenuhnya, vertebrata atau invertebrata, hidup atau mati",
  ],
  ["Namakan contoh hidupan liar karnivor di Malaysia.", "Harimau Malaya dan Helang Merah"],
  [
    "Di manakah habitat utama Gajah Pygmy?",
    "Tanah rendah dan lembah di sekitar Kinabatangan dan tengah Sabah",
  ],
  [
    "Apakah maksud aras trofik dalam ekosistem?",
    "Aliran tenaga yang melibatkan pengeluar, pengguna primer, pengguna sekunder, dan pengguna tertier",
  ],
  [
    "Berikan satu kepentingan tinja haiwan kepada alam sekitar.",
    "Membekalkan nutrien kepada tanah melalui proses penguraian organik",
  ],
  [
    "Apakah sumbangan hidupan liar terhadap sektor ekonomi?",
    "Melalui aktiviti ekopelancongan yang membuka peluang pekerjaan kepada penduduk tempatan",
  ],
  [
    "Nyatakan satu contoh pusat konservasi gajah di Malaysia.",
    "Pusat Konservasi Gajah Kebangsaan Kuala Gandah, Pahang",
  ],
  [
    "Apakah kesan aktiviti pengkuarian terhadap hidupan liar?",
    "Bunyi bising mengganggu ketenteraman haiwan dan menyebabkan kemusnahan habitat",
  ],
  [
    "Mengapakah pembinaan jaringan pengangkutan mengancam hidupan liar?",
    "Menyebabkan penebangan hutan luas dan risiko haiwan mati dilanggar kenderaan",
  ],
  [
    "Apakah fungsi Penilaian Impak Alam Sekitar (EIA)?",
    "Kajian untuk mengenal pasti kesan alam sekitar akibat sesuatu projek pembangunan sebelum ia dilaksanakan",
  ],
  ["Namakan akta yang mengawal aktiviti pemburuan haiwan.", "Akta Pemuliharaan Hidupan Liar 2010"],
  [
    "Apakah itu pemeliharaan?",
    "Usaha mengekalkan keadaan asal sumber alam semula jadi daripada musnah",
  ],
  [
    "Apakah itu pemuliharaan?",
    "Usaha memulihkan dan memelihara sumber alam dengan bijak supaya dapat dinikmati generasi masa depan",
  ],
  [
    "Berikan contoh kempen kesedaran yang diuruskan oleh WWF.",
    "Kempen Save The Day untuk menyelamatkan penyu dan harimau",
  ],
  [
    "Di manakah lokasi perlindungan Orang Utan yang terkenal di Sabah?",
    "Pusat Pemulihan Orang Utan Sepilok",
  ],
  [
    "Apakah peranan Jabatan PERHILITAN?",
    "Mengekalkan integriti kawasan perlindungan bagi faedah penyelidikan, pendidikan, dan fungsi ekologi",
  ],
  [
    "Nyatakan satu spesies tumbuhan yang diancam kepupusan akibat penerokaan hutan.",
    "Periuk kera, tongkat ali, atau pokok cengal",
  ],
  [
    "Apakah tujuan utama pewartaan hutan simpan?",
    "Melindungi kawasan hutan daripada ditebang di bawah Akta Perhutanan Negara 1984",
  ],
  [
    "Namakan agensi yang terlibat dalam penyelidikan penyakit hidupan liar.",
    "PERHILITAN, Jabatan Hidupan Liar Sabah, dan universiti tempatan (R&D)",
  ],
  [
    "Berikan satu kerjaya profesional yang berkaitan dengan hidupan liar.",
    "Veterinar, penyelidik, ahli forensik, atau pensyarah",
  ],
] as const;

export const geographyF3C5Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c5-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 5",
    front,
    back,
  }),
);
