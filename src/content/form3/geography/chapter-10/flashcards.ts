import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Apakah definisi sumber hutan?",
    "Sumber boleh baharu yang meliputi kawasan yang ditumbuhi pelbagai jenis flora dan fauna yang hidup secara semula jadi",
  ],
  ["Adakah sumber hutan dikategorikan sebagai sumber boleh baharu?", "Ya"],
  [
    "Nyatakan tiga faktor yang menggalakkan pertumbuhan sumber hutan di Malaysia.",
    "Iklim Khatulistiwa yang panas dan lembap sepanjang tahun serta jumlah taburan hujan yang tinggi",
  ],
  [
    "Berapakah jumlah keluasan kawasan berhutan di Malaysia?",
    "18.56 juta hektar atau lebih kurang 56.5% daripada keluasan tanah",
  ],
  [
    "Negeri manakah yang mempunyai jumlah hutan terbesar di Malaysia?",
    "Sarawak, dengan keluasan kira-kira 8.23 juta hektar",
  ],
  ["Berapakah keluasan kawasan berhutan di Semenanjung Malaysia?", "5.84 juta hektar"],
  ["Nyatakan keluasan kawasan berhutan di Sabah.", "4.49 juta hektar"],
  [
    "Apakah yang dimaksudkan dengan ekosistem hutan?",
    "Proses interaksi antara komponen biotik (benda hidup) dengan komponen abiotik (benda bukan hidup) dalam alam sekitar",
  ],
  [
    "Berikan dua contoh komponen abiotik dalam ekosistem hutan.",
    "Tanih, air, udara, dan cahaya matahari",
  ],
  [
    "Sebutkan satu contoh hutan rekreasi yang terkenal di Selangor.",
    "Hutan Rekreasi Sungai Tekala",
  ],
  [
    "Nyatakan empat kepentingan pengurusan sumber hutan di Malaysia.",
    "Keseimbangan ekosistem, keperluan masyarakat setempat, ekopelancongan, dan membekalkan sumber bahan mentah",
  ],
  [
    "Mengapakah pengurusan hutan secara terancang perlu untuk ekosistem?",
    "Bagi mengekalkan aliran tenaga, rantaian makanan, dan memelihara imbangan ekosistem",
  ],
  [
    "Apakah fungsi hutan kepada masyarakat setempat dari segi makanan?",
    "Menjadi sumber bahan makanan seperti buah-buahan hutan",
  ],
  [
    "Namakan dua hasil hutan yang digunakan oleh masyarakat setempat untuk peralatan.",
    "Rotan dan gaharu",
  ],
  ["Apakah itu gaharu?", "Kayu yang harum yang berasal daripada pokok tengkaras"],
  [
    "Bagaimanakah hutan menyumbang kepada sektor ekopelancongan?",
    "Membolehkan pelancong menikmati keindahan semula jadi seperti air terjun dan melihat kepelbagaian flora serta fauna",
  ],
  ["Berikan contoh lokasi ekopelancongan di Perak.", "Taman Negeri Royal Belum"],
  ["Namakan taman negara yang terletak di Johor.", "Taman Negara Endau-Rompin"],
  [
    "Apakah kegunaan utama kayu keras daripada hutan?",
    "Untuk membuat perabot, papan lapis, kayu gergaji, dan bahan binaan",
  ],
  [
    "Rotan dan buluh sangat penting dalam industri apa?",
    "Industri pembuatan perabot dan kraf tangan",
  ],
  ["Daun mengkuang biasanya digunakan untuk menghasilkan apa?", "Tikar dan bakul"],
  ["Apakah kegunaan batang nibung?", "Sebagai tiang rumah dan cerucuk kelong"],
  ["Daun nipah digunakan secara tradisional untuk apa?", "Membuat atap nipah"],
  [
    "Mengapakah pengurusan cekap diperlukan bagi bahan mentah hutan?",
    "Untuk menjamin bekalan bahan mentah yang berterusan untuk masa hadapan",
  ],
  [
    "Berapakah usia hutan Royal Belum mengikut maklumat buku teks?",
    "Berusia kira-kira 130 juta tahun",
  ],
  [
    "Apakah definisi pemeliharaan hutan?",
    "Usaha-usaha untuk melindungi, merancang, dan mengurus sumber hutan agar tidak musnah",
  ],
  ["Berikan contoh aktiviti pemeliharaan hutan.", "Mewartakan hutan simpan dan taman negara"],
  [
    "Apakah definisi pemuliharaan hutan?",
    "Usaha-usaha membaik pulih sumber hutan yang telah diganggu supaya kembali kepada keadaan asal",
  ],
  ["Berikan contoh aktiviti pemuliharaan hutan.", "Penghutanan semula dan penubuhan ladang hutan"],
  [
    "Apakah itu Tapak Ramsar?",
    "Senarai tanah lembap (terutama paya bakau) yang dipersetujui untuk pemuliharaan sumber biologinya",
  ],
  ["Bilakah dan di manakah konvensyen Ramsar pertama kali diadakan?", "Di Iran pada tahun 1971"],
  ["Sebutkan satu contoh Tapak Ramsar di Pahang.", "Tasik Bera"],
  ["Namakan tiga lokasi Tapak Ramsar di Johor.", "Pulau Kukup, Tanjung Piai, dan Sungai Pulai"],
  ["Di manakah terletaknya Kuching Wetlands National Park?", "Sarawak"],
  ["Nyatakan Tapak Ramsar yang terdapat di Sabah.", "Lower Kinabatangan-Segama Wetlands"],
  [
    "Apakah peranan utama sebuah Geopark?",
    "Melindungi kepelbagaian biologi, menyokong ekosistem, serta mempromosikan pendidikan dan rekreasi secara mampan",
  ],
  ["Namakan Geopark yang terkenal di Kedah.", "Langkawi UNESCO Global Geopark"],
  [
    "Apakah tujuan utama penubuhan Taman Negara?",
    "Menjaga flora dan fauna supaya tiada gangguan aktiviti manusia serta menjadi pusat ekopelancongan",
  ],
  ["Di manakah terletaknya Taman Negara Bako?", "Sarawak"],
  ["Nyatakan satu taman negara yang terdapat di Pulau Pinang.", "Taman Negara Pulau Pinang"],
  [
    "Apakah definisi Pembangunan Lestari?",
    "Pembangunan yang memenuhi keperluan masa ini tanpa menjejaskan keupayaan generasi akan datang untuk memenuhi keperluan mereka sendiri",
  ],
  ["Berikan contoh bandar di Malaysia yang mengamalkan konsep bandar dalam taman.", "Putrajaya"],
  [
    "Apakah fungsi Taman Etnobotani di Putrajaya?",
    "Sebagai pusat domestik dan pemuliharaan ex situ tumbuh-tumbuhan ubatan dan beraroma",
  ],
  [
    "Apakah yang dimaksudkan dengan pemuliharaan ex situ?",
    "Program pengurusan sumber genetik tumbuhan di luar kawasan asal seperti di taman botani atau ladang",
  ],
  ["Nyatakan satu contoh hutan simpan kekal di Sabah.", "Hutan Simpan Kabili-Sepilok"],
  [
    "Namakan lima agensi kerajaan yang terlibat dalam pengurusan hutan.",
    "Jabatan Alam Sekitar (JAS), PERHILITAN, FRIM, Jabatan Perhutanan Sabah, dan Sarawak Forestry Corporation",
  ],
  [
    "Apakah peranan Jabatan Alam Sekitar (JAS)?",
    "Melindungi dan memperbaiki kualiti alam sekitar serta memantau Penilaian Impak Alam Sekitar (EIA)",
  ],
  ["Apakah singkatan bagi FRIM?", "Institut Penyelidikan Perhutanan Malaysia"],
  [
    "Apakah fokus utama FRIM?",
    "Menjana pengetahuan dan membangunkan teknologi untuk pemuliharaan serta pengurusan sumber hutan",
  ],
  [
    "Di manakah FRIM menjalankan aktiviti penghutanan semula yang diiktiraf dunia?",
    "Hutan Lipur Bukit Lagong, Kepong",
  ],
  [
    "Apakah peranan Jabatan Perhutanan Sabah?",
    "Bertanggungjawab memberi perlindungan dan pemuliharaan rizab hutan berdasarkan konsep Pengurusan Hutan Lestari (SFM)",
  ],
  [
    "Apakah peranan Sarawak Forestry Corporation?",
    "Melaksanakan pengurusan hasil hutan, hidupan liar, dan penyelidikan perhutanan di Sarawak",
  ],
  [
    "Apakah fungsi utama PERHILITAN?",
    "Mengekalkan integriti kawasan perlindungan bagi faedah penyelidikan, pendidikan, ekonomi, dan estetika",
  ],
  ["PERHILITAN singkatan bagi apa?", "Jabatan Perlindungan Hidupan Liar dan Taman Negara"],
  [
    "Hutan tropika buatan manusia tertua di dunia terletak di mana?",
    "Hutan Lipur Bukit Lagong, Kepong (diuruskan oleh FRIM)",
  ],
  [
    "Sebutkan lima badan bukan kerajaan (NGO) yang terlibat dalam pengurusan hutan.",
    "SAM, MNS, TRAFFIC, GEC, dan WWF",
  ],
  [
    "Apakah peranan Sahabat Alam Malaysia (SAM)?",
    "Mengadakan kempen untuk memastikan pengurusan sumber semula jadi adalah secara lestari",
  ],
  [
    "Apakah fokus utama Malaysian Nature Society (MNS)?",
    "Melindungi dan memelihara kepelbagaian biologi serta memberi kesedaran melalui pendidikan",
  ],
  [
    "Apakah peranan TRAFFIC?",
    "Menguruskan perdagangan mampan melibatkan tumbuh-tumbuhan dan haiwan liar tanpa merosakkan sistem ekologi",
  ],
  ["TRAFFIC adalah singkatan bagi apa?", "The Wildlife Trade Monitoring Network"],
  [
    "Apakah peranan Global Environment Centre (GEC)?",
    "Menggalakkan perlindungan dan penggunaan lestari hutan serta tanah lembap",
  ],
  [
    "Apakah peranan utama World Wide Fund for Nature (WWF)?",
    "Memelihara kepelbagaian biologi dunia dan menjalankan kempen kesedaran awam",
  ],
  ["Apakah logo ikonik WWF?", "Panda"],
  [
    "Mengapakah kempen kesedaran penting dalam pengurusan hutan?",
    "Untuk memberi penerangan dan pemahaman kepada masyarakat mengenai isu kepupusan dan pemuliharaan",
  ],
  [
    "Apakah kepentingan utama pengurusan sumber hutan secara lestari kepada negara?",
    "Sebagai gagasan untuk menangani isu tuntutan pembangunan sambil memastikan pemuliharaan alam sekitar untuk generasi depan",
  ],
] as const;

export const geographyF3C10Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c10-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 10",
    front,
    back,
  }),
);
