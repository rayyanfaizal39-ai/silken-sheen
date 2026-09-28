import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Deck 1: Agama dan Kepercayaan
  [
    "Apakah maksud animisme?",
    "Kepercayaan bahawa setiap makhluk, hidupan dan tumbuhan memiliki roh atau semangat.",
  ],
  [
    "Apakah maksud dinamisme?",
    "Kepercayaan terhadap kekuatan yang dikenali sebagai mana atau semangat.",
  ],
  ["Apakah yang dipercayai mempunyai mana dalam dinamisme?", "Setiap benda dan makhluk."],
  ["Animisme berkait dengan kepercayaan terhadap apa?", "Makhluk halus dan roh nenek moyang."],
  ["Apakah nama roh nenek moyang yang telah meninggal dunia dalam kepercayaan animisme?", "Hyang."],
  [
    "Mengapakah roh nenek moyang disembah?",
    "Untuk mendapatkan kebaikan atau menghindari kesusahan.",
  ],
  ["Apakah contoh amalan dinamisme berkaitan pertanian?", "Pemujaan semangat tanaman."],
  [
    "Apakah tujuan pemujaan semangat tanaman?",
    "Supaya mendapat hasil tanaman yang subur dan banyak.",
  ],
  ["Apakah dua kepercayaan awal masyarakat kerajaan Alam Melayu?", "Animisme dan dinamisme."],
  ["Kepercayaan awal masyarakat Alam Melayu berkait rapat dengan apa?", "Alam sekeliling."],
  ["Agama Hindu dan Buddha tersebar ke Alam Melayu sejak bila?", "Sebelum Masihi."],
  ["Bilakah agama Islam mula tiba di Alam Melayu?", "Mulai abad ketujuh."],
  [
    "Apakah tiga agama utama yang tersebar di Alam Melayu sebelum abad ke-15?",
    "Hindu, Buddha dan Islam.",
  ],
  [
    "Apakah tiga faktor utama penyebaran agama ke Alam Melayu?",
    "Mubaligh, pemerintah dan perkembangan perdagangan antarabangsa.",
  ],
  [
    "Apakah kesan penyebaran Hindu dan Buddha terhadap masyarakat Alam Melayu?",
    "Mempengaruhi pelbagai aspek kehidupan masyarakat.",
  ],
  [
    "Apakah aspek kehidupan yang masih mengekalkan pengaruh Hindu dan Buddha selepas kedatangan Islam?",
    "Sistem pemerintahan, bahasa, persuratan dan seni bina.",
  ],
  [
    "Bagaimanakah agama Islam tersebar dalam kerajaan Melayu di Alam Melayu?",
    "Melalui peranan mubaligh, pemerintah dan perdagangan.",
  ],
  [
    "Apakah yang menunjukkan keterbukaan masyarakat Alam Melayu dalam soal agama?",
    "Menerima dan menyesuaikan pengaruh agama Hindu, Buddha dan Islam.",
  ],
  [
    "Apakah peranan pemerintah terhadap agama dalam kerajaan Alam Melayu?",
    "Memastikan pengukuhan dan kelangsungan agama.",
  ],
  [
    "Apakah fungsi agama dan kepercayaan dalam kehidupan masyarakat kerajaan Alam Melayu?",
    "Menjadi panduan dalam kehidupan seharian.",
  ],

  // Deck 2: Perkembangan Agama Kerajaan Alam Melayu
  ["Apakah agama kerajaan Funan?", "Hindu dan Buddha."],
  ["Apakah candi kerajaan Funan?", "Candi Go Cay Thi."],
  ["Agama Hindu tersebar di Champa sejak abad berapa?", "Sejak abad keempat."],
  ["Apakah nama candi Hindu yang dibina Bhadravarman di Lembah Mi Son?", "Siva-Bhadresvara."],
  ["Apakah bukti penyebaran agama Buddha di Champa?", "Candi Dong Duong."],
  [
    "Apakah bukti awal penyebaran Islam di Champa?",
    "Batu bersurat tahun 1035 dan batu nisan tahun 1039 di Panduranga.",
  ],
  ["Kerajaan manakah menjadi pusat kegiatan agama Buddha sejak abad ketujuh?", "Srivijaya."],
  ["Siapakah pendeta Buddha dari China yang datang ke Srivijaya?", "I-Tsing."],
  ["Apakah satu candi Srivijaya?", "Candi Muara Jambi."],
  ["Namakan candi lain di Srivijaya.", "Candi Bahal atau Candi Muara Takus."],
  ["Apakah agama utama Angkor sejak kerajaan itu diasaskan?", "Agama Hindu."],
  ["Apakah binaan agama kerajaan Angkor?", "Angkor Wat."],
  [
    "Semasa pemerintahan siapakah agama Buddha mengambil alih peranan Hindu sebagai agama utama Angkor?",
    "Jayavarman VII.",
  ],
  ["Apakah agama kerajaan Majapahit?", "Hindu dan Buddha."],
  ["Namakan satu candi Majapahit.", "Candi Jabong, Candi Sukuh atau Candi Brahu."],
  ["Sejak abad berapa agama Islam tersebar di Majapahit?", "Sejak abad ke-14."],
  [
    "Apakah agama yang diamalkan di Kedah Tua sejak abad kelima dan menjadi anutan utama?",
    "Agama Buddha.",
  ],
  ["Bilakah Maharaja Derbar Raja II memeluk Islam?", "Tahun 1136."],
  ["Apakah agama masyarakat kerajaan Gangga Nagara?", "Agama Buddha."],
  ["Apakah bukti anutan Buddha di Gangga Nagara?", "Penemuan arca-arca Buddha di Lembah Kinta."],

  // Deck 3: Keunikan Warisan Masyarakat Kerajaan Alam Melayu
  ["Apakah asas sistem pemerintahan kerajaan Alam Melayu?", "Sistem pemerintahan beraja."],
  ["Bagaimanakah raja biasanya dipilih?", "Berasaskan keturunan dan disahkan oleh pembesar."],
  [
    "Bagaimanakah kedudukan raja dipandang semasa pengaruh Hindu dan Buddha?",
    "Raja dianggap sebagai titisan dewa dan mesti dihormati.",
  ],
  [
    "Apakah konsep yang diperkenalkan selepas kedatangan Islam berkaitan kedudukan pemerintah?",
    "Konsep khalifah.",
  ],
  ["Apakah gelaran pemerintah yang berkembang selepas kedatangan Islam?", "Sultan."],
  [
    "Di manakah pemerintah biasanya memilih pusat pemerintahan yang strategik?",
    "Di pesisiran pantai atau lembah sungai.",
  ],
  [
    "Mengapakah lembah sungai dipilih sebagai pusat kegiatan?",
    "Tanahnya subur dan sungai menjadi laluan pengangkutan.",
  ],
  ["Apakah contoh mercu tanda yang membantu pedagang menuju Kedah?", "Gunung Jerai."],
  [
    "Apakah tiga bentuk hubungan diplomatik kerajaan Alam Melayu?",
    "Persahabatan, bantuan ketenteraan atau senjata, dan perkahwinan.",
  ],
  ["Kerajaan manakah mengirim utusan persahabatan ke China pada abad ketujuh?", "Srivijaya."],
  [
    "Apakah manfaat kesuburan tanah kepada kegiatan ekonomi?",
    "Membolehkan kegiatan pertanian berkembang.",
  ],
  [
    "Apakah sistem pengairan yang digunakan masyarakat kerajaan Alam Melayu?",
    "Baray dan sistem saliran.",
  ],
  ["Apakah fungsi pelabuhan pembekal?", "Membekalkan bahan dagangan dan makanan kepada pedagang."],
  [
    "Apakah maksud pelabuhan kerajaan?",
    "Pelabuhan pembekal yang berkembang apabila wujud pusat pentadbiran atau kerajaan.",
  ],
  [
    "Apakah peranan pelabuhan entrepot?",
    "Mengumpul, mengendalikan dan mengedar barang dagangan serantau dan antarabangsa.",
  ],
  [
    "Apakah tulisan luar yang diadaptasi masyarakat Alam Melayu?",
    "Tulisan Palava, Kawi dan huruf Arab yang disesuaikan menjadi tulisan Jawi.",
  ],
  [
    "Bagaimanakah kegiatan persuratan berkembang?",
    "Daripada batu bersurat kepada karya dalam bentuk manuskrip.",
  ],
  [
    "Apakah fungsi candi dalam amalan beragama?",
    "Pusat ibadat, tempat pemujaan roh nenek moyang dan pusat perhimpunan pendeta.",
  ],
  ["Apakah fungsi masjid selepas penyebaran Islam?", "Pusat ibadat, pendidikan dan kebajikan."],
  [
    "Apakah contoh toleransi beragama dalam masyarakat kerajaan Alam Melayu?",
    "Candi Prambanan Hindu dibina berdekatan Candi Borobudur Buddha di Jawa Tengah.",
  ],
];

export const sejarahF2C4Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c4-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 4",
  front,
  back,
}));
