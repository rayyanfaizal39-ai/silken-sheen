import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Senaraikan empat faktor persekitaran fizikal yang mempengaruhi kepelbagaian tumbuh-tumbuhan semula jadi dan hidupan liar.",
    "Bentuk muka bumi, saliran, tanih, dan iklim.",
  ],
  [
    "Apakah yang dimaksudkan dengan tanih?",
    "Lapisan paling atas di permukaan bumi yang terhasil daripada bahan organik dan bahan bukan organik.",
  ],
  [
    "Elemen utama faktor fizikal iklim terdiri daripada suhu, hujan, angin, tekanan udara, keadaan awan, kelembapan udara dan _____.",
    "Cahaya matahari",
  ],
  [
    "Berapakah ketinggian minimum bagi sesuatu kawasan untuk dikategorikan sebagai tanah tinggi?",
    "Melebihi 180 meter dari aras laut.",
  ],
  [
    "Kawasan tanah pamah merujuk kepada kawasan yang mempunyai ketinggian kurang daripada _____.",
    "180 meter dari aras laut",
  ],
  [
    "Nyatakan dua contoh hidupan liar yang terdapat di kawasan Banjaran Himalaya.",
    "Yak dan Asiatic brown bear.",
  ],
  [
    "Apakah hidupan liar yang sinonim dengan Banjaran Crocker di Sabah?",
    "Tupai tanah gunung Borneo atau Summit rat.",
  ],
  ["Kawasan bersaliran _____ merujuk kepada kawasan yang tidak bertakung air.", "Baik"],
  [
    "Nyatakan jenis hutan yang tumbuh di kawasan bersaliran buruk.",
    "Hutan Paya Air Tawar dan Hutan Paya Air Masin.",
  ],
  [
    "Burung Shoebill merupakan hidupan liar unik yang boleh ditemui di kawasan paya tropika di _____.",
    "Timur Afrika",
  ],
  ["Apakah jenis tanih yang dikaitkan dengan kawasan Padang Rumput Sederhana?", "Tanih chernozem."],
  ["Tanih _____ ialah tanih beku yang terdapat di kawasan Hutan Tundra.", "Permafrost"],
  [
    "Nyatakan ciri utama tumbuh-tumbuhan di kawasan tanih permafrost.",
    "Mempunyai daya tahan yang tinggi terhadap suhu sejuk melampau.",
  ],
  [
    "Contoh tumbuh-tumbuhan di kawasan Tundra: Liken, lumut, kulampair, willow, birch dan _____.",
    "Heath",
  ],
  ["Apakah jenis tanih yang kering dan tandus di kawasan Gurun Panas?", "Tanih aridisols."],
  [
    "Mengapakah tumbuh-tumbuhan di Gurun Panas mempunyai akar yang panjang?",
    "Untuk menyerap air di dalam tanah.",
  ],
  ["Nyatakan dua contoh hidupan liar di kawasan tanih aridisols.", "Unta dan musang fennec."],
  [
    "Tanih latosol sesuai untuk pertumbuhan hutan jenis apa?",
    "Hutan Hujan Tropika dan Hutan Monsun Tropika.",
  ],
  ["Apakah warna dominan bagi tanih latosol?", "Merah atau kuning."],
  ["Jenis tanih: Podzol. Nyatakan lokasi hutan yang berkaitan.", "Hutan Konifer."],
  [
    "Apakah ciri fizikal pokok di kawasan tanih podzol?",
    "Mempunyai akar yang pendek dan tidak menerjah jauh ke dalam tanah.",
  ],
  ["Nyatakan hidupan liar utama di Hutan Konifer.", "Moose, elk, lynx, dan beruang coklat."],
  [
    "Tanih _____ merupakan campuran tanah liat dan pasir yang berwarna merah atau coklat kemerahan.",
    "Terra rossa",
  ],
  [
    "Hutan Mediterranean tumbuh dengan subur di kawasan yang mempunyai tanih jenis _____.",
    "Terra rossa",
  ],
  ["Berikan dua contoh flora di kawasan Hutan Mediterranean.", "Rosemary dan lavender."],
  [
    "Hutan Konifer meliputi kawasan tanah pamah di Tasik Great St. Lawrence yang terletak di negara _____.",
    "Kanada",
  ],
  [
    "Nyatakan empat jenis iklim utama yang mempengaruhi taburan flora dan fauna dunia.",
    "Iklim Gurun Panas, Iklim Monsun Tropika, Iklim Siberia, dan Iklim Laurentia.",
  ],
  ["Apakah jenis hutan yang sinonim dengan Iklim Monsun Tropika?", "Hutan Monsun Tropika."],
  [
    "Tumbuhan 'Big bluestem grass' dan 'Buffalo grass' dikaitkan dengan tanih jenis _____.",
    "Chernozem",
  ],
  [
    "Apakah proses luluh hawa?",
    "Proses pemecahan dan penguraian batuan secara semula jadi di sesuatu tempat akibat faktor cuaca dan organisma.",
  ],
  [
    "Di Malaysia, Hutan Hujan Tropika tumbuh subur di kawasan tanah pamah dan kaki bukit yang berketinggian bawah _____ meter.",
    "180",
  ],
  [
    "Apakah fungsi akar banir pada pokok di Hutan Hujan Tropika?",
    "Menyokong pokok yang tinggi dan besar daripada tumbang.",
  ],
  [
    "Hutan _____ tumbuh di kawasan pinggir laut yang terlindung dan muara sungai berlumpur.",
    "Paya Air Masin",
  ],
  ["Tanih _____ sering dikaitkan dengan kawasan Hutan Paya Air Tawar.", "Gambut atau aluvium"],
  [
    "Suhu kira-kira 18°C di kawasan tanah tinggi Malaysia menggalakkan pertumbuhan Hutan _____.",
    "Gunung",
  ],
  ["Hutan Pantai tumbuh di kawasan yang mempunyai tanih jenis _____.", "Berpasir"],
  [
    "Nyatakan satu lokasi Hutan Paya Air Tawar di Malaysia.",
    "Tasik Chini (Pahang) atau Tasik Bera (Pahang).",
  ],
  ["Apakah jenis pokok yang dominan di Hutan Pantai?", "Pokok ru, pokok kelapa, dan tapak kuda."],
  ["Hutan Gunung di Malaysia biasanya ditemui pada ketinggian melebihi _____ meter.", "1200"],
  ["Di kawasan Hutan Gunung, flora seperti _____ dan periuk kera banyak ditemui.", "Rafflesia"],
  [
    "Apakah definisi ekosistem?",
    "Interaksi atau saling kebergantungan antara komponen biotik dan abiotik dalam alam sekitar.",
  ],
  [
    "Komponen _____ dalam ekosistem merujuk kepada benda bukan hidup seperti tanih, air, dan udara.",
    "Abiotik",
  ],
  [
    "Nyatakan satu kepentingan tumbuh-tumbuhan semula jadi di Malaysia.",
    "Sebagai kawasan tadahan hujan.",
  ],
  ["Flora: Pokok Jati. Iklim: _____.", "Iklim Monsun Tropika"],
  ["Flora: Pokok Larch. Iklim: _____.", "Iklim Siberia"],
  ["Fauna: Harimau Siberia. Iklim: _____.", "Iklim Siberia"],
  ["Fauna: Wood duck dan Beaver. Iklim: _____.", "Iklim Laurentia"],
  ["Flora: Pokok Maple dan Yellow birch. Iklim: _____.", "Iklim Laurentia"],
  ["Fauna: Chipmunk. Iklim: _____.", "Iklim Laurentia"],
  ["Hutan Montane Bawah terletak pada ketinggian antara 1,200 hingga _____ meter.", "1,800"],
  [
    "Apakah ciri utama tumbuh-tumbuhan alpin pada ketinggian melebihi 3,500 meter?",
    "Terdiri daripada tumbuhan renek dan lumut.",
  ],
  ["Pokok oak dan laurel merupakan flora utama bagi lapisan hutan _____.", "Montane Bawah"],
  ["Tanih _____ ialah tanah liat merah yang terdapat di kawasan Hutan Gunung.", "Laterit"],
  ["Tanih aluvium juga dikenali sebagai tanah _____.", "Lanar"],
  [
    "Apakah hidupan liar yang terdapat di Hutan Paya Air Tawar Malaysia?",
    "Ikan air tawar, katak, ular, biawak, dan buaya.",
  ],
  [
    "Kawasan Lengan Murray (Australia) merupakan contoh bagi bentuk muka bumi _____.",
    "Tanah pamah",
  ],
  ["Hutan Daun Luruh Sederhana mempunyai flora seperti oak, ash, elm, dan _____.", "Maple"],
  ["Fauna: Harimau Bengal. Jenis Hutan: _____.", "Hutan Monsun Tropika"],
  ["Nyatakan dua contoh hidupan liar di kawasan Hutan Hujan Tropika.", "Gajah dan harimau."],
  [
    "Apakah ciri hidupan liar di kawasan Hutan Hujan Tropika?",
    "Berbulu nipis, kulit berkedut, dan ada yang bersaiz besar.",
  ],
  ["Tanih _____ terbentuk daripada mendapan lumpur dan kelodak pasir.", "Aluvium"],
  ["Di manakah lokasi Hutan Paya Air Masin di Malaysia?", "Delta Labuk-Sugut (Sabah)."],
  ["Fauna: Saiga antelope. Jenis Tanih: _____.", "Tanih chernozem"],
  ["Kawasan Hutan Air Tawar Toh Daeng terletak di negara _____.", "Thailand"],
  [
    "Tumbuhan 'feather grass' dan 'fringed sagebrush' boleh ditemui di kawasan tanih _____.",
    "Chernozem",
  ],
] as const;

export const geographyF3C3Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c3-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 3",
    front,
    back,
  }),
);
