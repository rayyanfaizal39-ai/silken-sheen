import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch2-ekosistem.png";
import tropicalImage from "@/assets/notes/form2-science/chapter-2/tropical.png";
import desertImage from "@/assets/notes/form2-science/chapter-2/desert.jpg";
import polarImage from "@/assets/notes/form2-science/chapter-2/tundra.jpg";
import soilImage from "@/assets/notes/form2-science/chapter-2/soil.jpg";

export const scienceF2C2InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 2,
  blogHighlight: { title: "Blog Sains — Kawalan Monyet Taman Tasik Perdana", body: "Apabila bilangan kera ekor panjang menjadi terlalu banyak, pegawai hidupan liar menggunakan pengurusan populasi berperikemanusiaan. Ini contoh sebenar campur tangan manusia secara berhati-hati untuk memulihkan keseimbangan ekosistem.", imagePath: chapterImage },
  keywords: ["Ekosistem", "Pengeluar", "Pengguna", "Pengurai", "Rantai makanan", "Siratan makanan", "Kitar nutrien", "Simbiosis", "Kawalan biologi"],
  sections: [
    {
      number: "2.1", title: "Aliran Tenaga dalam Ekosistem", intro: "Tenaga memasuki kebanyakan ekosistem sebagai cahaya matahari. Pengeluar memerangkapnya melalui fotosintesis, pengguna memperolehnya melalui pemakanan dan pengurai mengembalikan nutrien ke persekitaran.",
      cards: [
        { title: "Pengeluar", body: "Tumbuhan hijau membuat makanan melalui fotosintesis dan membentuk aras trofik pertama.", detail: "Matahari → tumbuhan" },
        { title: "Pengguna", body: "Pengguna primer makan pengeluar; pengguna sekunder dan tertier makan pada aras lebih tinggi.", detail: "Tenaga mengalir sehala" },
        { title: "Pengurai", body: "Bakteria dan kulat menguraikan organisma mati serta bahan buangan lalu membebaskan mineral.", detail: "Nutrien dikitar semula" },
      ],
      sequence: { title: "Bina rantai makanan", instruction: "Ikuti aliran tenaga daripada pengeluar kepada pengguna teratas.", steps: [
        { title: "Kubis", body: "Pengeluar memerangkap tenaga cahaya melalui fotosintesis." }, { title: "Siput", body: "Pengguna primer memakan kubis." }, { title: "Burung", body: "Pengguna sekunder memakan siput." }, { title: "Rubah", body: "Pengguna tertier menerima bahagian tenaga asal yang paling kecil." },
      ]},
      checks: [{ question: "Mengapakah rantai makanan bermula dengan pengeluar?", hint: "Pengeluar menukarkan tenaga cahaya kepada tenaga kimia dalam makanan." }, { question: "Apakah perbezaan siratan makanan dengan rantai makanan?", hint: "Siratan makanan menggabungkan beberapa rantai makanan yang saling berkait." }],
    },
    {
      number: "2.2", title: "Kitar Nutrien dalam Ekosistem", intro: "Tidak seperti tenaga, air, karbon dan oksigen dikitar berterusan antara organisma dengan persekitaran fizikal.",
      tabs: [
        { title: "Kitar air", body: "Penyejatan dan transpirasi membebaskan wap air; kondensasi membentuk awan; kerpasan mengembalikan air ke Bumi sebagai resapan atau air larian." },
        { title: "Kitar karbon", body: "Fotosintesis menyingkirkan karbon dioksida. Pemakanan memindahkan karbon manakala respirasi, penguraian dan pembakaran mengembalikannya ke atmosfera." },
        { title: "Kitar oksigen", body: "Fotosintesis membebaskan oksigen. Respirasi, penguraian dan pembakaran menggunakan oksigen dan membebaskan karbon dioksida." },
      ],
      accordions: [
        { title: "Penyahhutanan", body: "Kurang pokok menyebabkan kurang fotosintesis, kurang karbon dioksida disingkirkan dan kurang air dikembalikan melalui transpirasi." },
        { title: "Pembakaran bahan api fosil", body: "Pembakaran menggunakan oksigen dan membebaskan karbon dioksida tambahan, lalu menguatkan kesan rumah hijau." },
        { title: "Baja berlebihan", body: "Nutrien yang dihanyutkan ke air boleh mencetuskan ledakan alga dan mengurangkan oksigen terlarut." },
      ],
      checks: [{ question: "Namakan dua proses yang mengembalikan karbon dioksida ke atmosfera.", hint: "Respirasi, penguraian dan pembakaran." }, { question: "Mengapakah pengurai penting dalam kitar nutrien?", hint: "Pengurai membebaskan mineral daripada bahan mati supaya boleh digunakan semula oleh pengeluar." }],
    },
    {
      number: "2.3", title: "Kebergantungan dan Interaksi", intro: "Spesies membentuk populasi, populasi membentuk komuniti, dan komuniti bersama komponen bukan hidup membentuk ekosistem.",
      flipCards: [
        { id: "tropical", icon: "", label: "Tropika", fact: "Hujan dan cahaya matahari tinggi sepanjang tahun menyokong hidupan yang padat dan pelbagai.", imagePath: tropicalImage },
        { id: "desert", icon: "", label: "Gurun", fact: "Organisma menjimatkan air dan menahan kepanasan siang yang melampau.", imagePath: desertImage },
        { id: "tundra", icon: "", label: "Tundra", fact: "Penebatan, penghijrahan dan aktiviti bermusim membantu organisma menghadapi musim sejuk panjang.", imagePath: polarImage },
        { id: "soil", icon: "", label: "Habitat tanah", fact: "Kelembapan, suhu dan cahaya menentukan tempat organisma kecil berkumpul.", imagePath: soilImage },
      ],
      matcher: { title: "Padankan interaksi", instruction: "Pilih interaksi di kiri, kemudian contoh yang betul.", pairs: [
        { id: "mutualism", label: "Mutualisme", match: "Ikan badut dan anemon laut — kedua-duanya untung" },
        { id: "commensalism", label: "Komensalisme", match: "Remora untung; jerung tidak terjejas" },
        { id: "parasitism", label: "Parasitisme", match: "Cacing pita untung; perumah manusia rugi" },
        { id: "predation", label: "Mangsa–pemangsa", match: "Burung hantu memburu dan makan tikus" },
        { id: "competition", label: "Persaingan", match: "Tumbuhan bersaing untuk cahaya, air dan ruang" },
      ]},
      cards: [{ title: "Kawalan biologi", body: "Pemangsa, parasit atau patogen semula jadi mengurangkan perosak: burung hantu mengawal tikus, gupi makan larva nyamuk dan kumbang kepik makan afid." }, { title: "Faktor populasi", body: "Penyakit, pemangsa, bekalan makanan dan cuaca boleh menaikkan atau menurunkan saiz populasi." }],
      checks: [{ question: "Bezakan mutualisme daripada komensalisme.", hint: "Mutualisme: kedua-duanya untung; komensalisme: satu untung, satu tidak terjejas." }, { question: "Mengapakah kawalan biologi boleh lebih selamat daripada racun perosak?", hint: "Tiada pencemaran kimia, tetapi spesies yang diperkenalkan masih perlu diurus dengan teliti." }],
    },
    {
      number: "2.4", title: "Peranan Manusia dalam Mengekalkan Keseimbangan Alam",
      comparison: { title: "Kos aktiviti manusia terhadap alam", columns: [
        { title: "Tekanan manusia", body: "Pembalakan menyebabkan kehilangan habitat dan hakisan; perindustrian menyebabkan pencemaran dan hujan asid; pertanian intensif mencemarkan air; pelupusan sisa lemah menyebabkan pencemaran dan banjir kilat." },
        { title: "Memulihkan keseimbangan", body: "Kuatkuasakan undang-undang alam sekitar, tingkatkan kesedaran, amalkan 5R dan gunakan kawalan biologi secara bertanggungjawab." },
      ]},
      cards: [{ title: "Refuse (Tolak)", body: "Tolak bahan tidak perlu atau tidak boleh dikitar semula." }, { title: "Reduce (Kurangkan)", body: "Gunakan kurang sumber dan hasilkan kurang sisa." }, { title: "Reuse (Guna semula)", body: "Gunakan sesuatu barang semula." }, { title: "Recycle (Kitar semula)", body: "Proses sisa menjadi bahan baharu." }, { title: "Repurpose (Guna untuk tujuan lain)", body: "Berikan bahan lama fungsi baharu." }],
      checks: [{ question: "Bagaimanakah pembalakan mengganggu keseimbangan ekosistem?", hint: "Kehilangan habitat, kepupusan spesies, hakisan tanah dan karbon dioksida meningkat." }, { question: "Senaraikan urutan lengkap 5R.", hint: "Refuse, Reduce, Reuse, Recycle, Repurpose." }],
    },
  ],
  reflectionItems: ["Saya boleh menerangkan aliran tenaga melalui pengeluar, pengguna dan pengurai.", "Saya boleh menghuraikan kitar air, karbon dan oksigen.", "Saya boleh membandingkan interaksi utama antara organisma.", "Saya boleh menjustifikasikan tindakan untuk mengekalkan ekosistem seimbang."],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Tenaga dikitar semula tanpa henti dalam ekosistem.", answer: false, explanation: "Tenaga mengalir sehala dan banyak hilang sebagai haba; nutrien pula dikitar semula." },
    { type: "multiple-choice", question: "Mengapakah bilangan tikus meningkat selepas helang disingkirkan?", options: ["Tikus kehilangan makanan", "Tekanan pemangsaan berkurang", "Pengurai bertambah", "Hujan berhenti"], answerIndex: 1, explanation: "Apabila pemangsa disingkirkan, lebih banyak mangsa hidup dan membiak." },
  ],
};
