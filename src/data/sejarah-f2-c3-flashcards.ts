import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Deck 1: Bahasa dan Tulisan
  ["Apakah bahasa kerajaan Funan?", "Bahasa Sanskrit."],
  [
    "Tulisan Funan berasaskan tulisan mana?",
    "Tulisan orang Hu yang menggunakan tulisan orang India.",
  ],
  ["Apakah bukti tulisan kerajaan Funan?", "Penemuan batu bersurat."],
  ["Apakah bahasa kerajaan Champa?", "Bahasa Melayu Champa dan Sanskrit."],
  ["Apakah tulisan kerajaan Champa?", "Tulisan Palava dan tulisan Champa Kuno."],
  ["Apakah bahasa utama Champa selepas Islam?", "Bahasa Melayu."],
  ["Tulisan apakah berkembang di Champa selepas Islam?", "Tulisan Jawi."],
  ["Apakah bahasa utama Srivijaya?", "Bahasa Melayu."],
  ["Apakah tulisan kerajaan Srivijaya?", "Tulisan Palava."],
  ["Namakan satu batu bersurat Srivijaya.", "Kedukan Bukit, Talang Tuwo atau Telaga Batu."],
  ["Apakah bahasa kerajaan Angkor?", "Bahasa Sanskrit dan Khmer."],
  ["Apakah tulisan kerajaan Angkor?", "Tulisan Palava dan Khmer."],
  ["Apakah bahasa kerajaan Majapahit?", "Bahasa Jawa Kuno."],
  ["Apakah tulisan kerajaan Majapahit?", "Tulisan Kawi."],
  ["Apakah tulisan Majapahit selepas Islam?", "Tulisan Pegon."],
  ["Apakah fungsi huruf Arab dalam tulisan Pegon?", "Menulis bahasa Jawa."],
  ["Apakah bahasa kerajaan Kedah Tua?", "Bahasa Sanskrit."],
  ["Apakah tulisan kerajaan Kedah Tua?", "Tulisan Palava."],
  ["Apakah batu bersurat di Sungai Mas?", "Batu Bersurat Sungai Mas."],
  ["Apakah satu lagi batu bersurat Kedah Tua?", "Batu Bersurat Cherok Tok Kun."],

  // Deck 2: Persuratan
  ["Apakah kaedah sebelum tulisan berkembang?", "Tradisi lisan."],
  ["Namakan satu tema tradisi lisan.", "Asal-usul, binatang, nasihat, teladan atau adat."],
  ["Apakah bukti awal persuratan?", "Batu bersurat."],
  ["Batu bersurat Funan berasal dari abad berapa?", "Abad ke-2."],
  ["Batu bersurat tertua Champa bertarikh bila?", "Tahun 192M."],
  ["Berapa batu bersurat Champa ditemukan?", "Lebih 200 batu bersurat."],
  ["Namakan satu karya terkenal Champa.", "Akayet Inra Patra atau Akayet Deva Mano."],
  ["Karang Brahi ialah batu bersurat kerajaan mana?", "Kerajaan Srivijaya."],
  ["Palas Pasemah ialah batu bersurat kerajaan mana?", "Kerajaan Srivijaya."],
  ["Apakah tujuan batu bersurat Srivijaya?", "Mengukuhkan kesetiaan kepada raja."],
  ["Talang Tuwo bertarikh tahun berapa?", "Tahun Saka 606."],
  ["Apakah kandungan Batu Bersurat Talang Tuwo?", "Pembukaan taman oleh Sri Jayanasa."],
  ["Sdok Kok Thom ialah batu bersurat kerajaan mana?", "Kerajaan Angkor."],
  ["Di manakah inskripsi Angkor turut ditemukan?", "Pada dinding kuil."],
  ["Trowulan ialah batu bersurat kerajaan mana?", "Kerajaan Majapahit."],
  [
    "Namakan satu karya persuratan Majapahit.",
    "Nagarakertagama, Pararaton atau Tantu Panggelaran.",
  ],
  ["Bukit Choras ialah batu bersurat kerajaan mana?", "Kerajaan Kedah Tua."],
  ["Bukit Meriam ialah batu bersurat kerajaan mana?", "Kerajaan Kedah Tua."],
  ["Inskripsi Kedah Tua berkaitan dengan agama apa?", "Agama Buddha."],
  ["Apakah bukti persuratan Majapahit selain karya?", "Batu Bersurat Trowulan."],

  // Deck 3: Seni Bina dan Struktur Sosial
  [
    "Apakah keupayaan kapal besar masyarakat Funan?",
    "Boleh memuatkan sehingga 700 orang dan 1000 tan kargo barangan.",
  ],
  ["Apakah candi kerajaan Funan yang ditemukan di Oc Eo?", "Candi Go Cay Thi."],
  [
    "Apakah tujuan sistem pengairan kerajaan Funan?",
    "Mengawal limpahan air dan mengalirkan air masin keluar dari tanah pertanian.",
  ],
  ["Siapakah yang membina Angkor Wat?", "Raja Suryavarman II."],
  ["Bilakah Angkor Wat dibina?", "Pada abad ke-12."],
  ["Namakan satu candi kerajaan Champa yang masyhur.", "Mi Son, Dong Duong atau Po Nagar."],
  [
    "Namakan candi kerajaan Srivijaya yang masyhur.",
    "Candi Muara Takus dan Candi Muara Jambi.",
  ],
  ["Apakah peranan Palembang dalam seni bina Srivijaya?", "Pusat binaan kapal."],
  ["Namakan satu candi kerajaan Majapahit.", "Candi Tikus atau Candi Cetho."],
  ["Apakah fungsi Gapura Wringin Lawang?", "Pintu gerbang laluan raja."],
  ["Apakah fungsi Gapura Bajang Ratu?", "Pintu masuk ke dalam sebuah bangunan suci."],
  ["Di manakah seni bina candi Kedah Tua banyak ditemukan?", "Di Lembah Bujang."],
  [
    "Apakah bukti seni bina kerajaan Gangga Nagara di Tanjung Rambutan?",
    "Patung Buddha daripada gangsa.",
  ],
  [
    "Apakah dua kelas utama struktur sosial masyarakat Alam Melayu?",
    "Golongan pemerintah dan golongan diperintah.",
  ],
  [
    "Siapakah yang termasuk dalam golongan diraja?",
    "Raja dan kerabat diraja seperti permaisuri, putera, puteri serta ahli keluarga diraja.",
  ],
  [
    "Apakah kedudukan golongan diraja dalam struktur sosial?",
    "Golongan yang mempunyai status tertinggi.",
  ],
  [
    "Siapakah yang termasuk dalam golongan bangsawan?",
    "Pembesar, ilmuwan, golongan agama, pujangga dan pendeta istana.",
  ],
  [
    "Siapakah yang termasuk dalam rakyat merdeka?",
    "Pekerja istana, askar, petani, penternak, pedagang, nelayan dan artisan.",
  ],
  [
    "Siapakah yang termasuk dalam golongan hamba?",
    "Tawanan perang, hamba berhutang dan mereka yang rela menjadi hamba.",
  ],
  [
    "Apakah kepentingan struktur sosial yang tersusun?",
    "Memperkukuh sistem politik dan kedudukan pemerintah serta menyumbang kepada kestabilan kerajaan.",
  ],
];

export const sejarahF2C3Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c3-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 3",
  front,
  back,
}));
