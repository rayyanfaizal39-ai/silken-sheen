import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch11-bintang-galaksi.png";
import spiralImg from "@/assets/notes/form2-science/chapter-11/spiral.png";
import ellipticalImg from "@/assets/notes/form2-science/chapter-11/elliptical.png";
import irregularImg from "@/assets/notes/form2-science/chapter-11/irregular.png";
import nebulaImg from "@/assets/notes/form2-science/chapter-11/nebula.png";

const STAR_GRADIENT = "linear-gradient(90deg,#ff4d4d,#ff9d4d,#ffe14d,#fff6d9,#ffffff,#cfe0ff,#4d7cfe)";

export const scienceF2C11InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 11,
  blogHighlight: {
    title: "Blog Sains — Letupan Supernova",
    body: "Supernova — kematian meletup bagi sebuah bintang bersaiz besar — membebaskan tenaga cahaya 100 kali lebih banyak daripada seluruh Matahari kita. Supernova terakhir yang boleh dilihat dengan mata kasar dikesan pada 1987, walaupun letupan sebenar berlaku kira-kira 400 tahun sebelum itu — cahayanya hanya mengambil masa itu untuk sampai kepada kita.",
    imagePath: chapterImage,
  },
  keywords: [
    "Galaksi",
    "Bima Sakti",
    "Nebula",
    "Bintang",
    "Sistem suria",
    "Protobintang",
    "Gergasi merah",
    "Kerdil putih",
    "Supernova",
    "Bintang neutron",
    "Lohong hitam",
  ],
  sections: [
    {
      number: "11.1",
      title: "Galaksi dalam Alam Semesta",
      intro:
        "Alam semesta terdiri daripada segala sesuatu yang wujud di sekeliling kita — terlalu luas sehingga berjuta-juta galaksi wujud di dalamnya. Galaksi ialah sekumpulan jasad yang terdiri daripada berjuta-juta (selalunya berbilion-bilion) bintang, bersama gas dan zarah debu, yang disatukan oleh graviti. Bidang astronomi dan teknologi seperti Teleskop Hubble (dilancarkan 24 April 1990, cukup berkuasa untuk melihat duit syiling dari jarak 725 km) telah meningkatkan kesedaran kita terhadap keluasan alam semesta. Bima Sakti — galaksi pilin bersaiz sederhana besar yang menempatkan sistem suria kita berhampiran tepi salah satu lengan pilinnya — terdiri daripada kira-kira 200 bilion bintang, dan Matahari cuma salah satu daripadanya.",
      accordions: [
        { title: "🌍 Bumi", body: "Planet tempat tinggal kita — lebih kecil daripada zarah debu jika dibandingkan dengan alam semesta secara keseluruhan." },
        { title: "☀️ Sistem Suria", body: "Matahari bersama 8 planet yang mengorbitnya, termasuk Bumi." },
        { title: "🌌 Bima Sakti", body: "Sebuah galaksi tunggal yang mengandungi kira-kira 200 bilion bintang — sistem suria kita cuma satu bahagian kecil daripadanya." },
        { title: "✨ Sekumpulan galaksi", body: "Kumpulan galaksi yang disatukan oleh graviti — Bima Sakti adalah sebahagian daripada satu kumpulan sedemikian." },
        { title: "♾️ Alam Semesta", body: "Segala sesuatu yang wujud — berjuta-juta kluster galaksi, tanpa penghujung yang dapat diperhatikan." },
      ],
      galaxyCards: {
        title: "🌀 Tiga bentuk utama galaksi",
        instruction: "Galaksi wujud dalam pelbagai bentuk. Perhatikan tiga jenis utama dan contohnya.",
        cards: [
          { id: "spiral", image: spiralImg, name: "Galaksi Pilin", example: "cth. Andromeda, Bima Sakti" },
          { id: "elliptical", image: ellipticalImg, name: "Galaksi Elips", example: "cth. Ursa Major, Messier 87" },
          { id: "irregular", image: irregularImg, name: "Galaksi Tidak Sekata", example: "cth. Awan Magellan Kecil dan Besar" },
        ],
      },
      checks: [
        { question: "Apakah jenis galaksi bagi Bima Sakti?", hint: "Galaksi pilin — seperti Andromeda, salah satu jirannya yang paling hampir." },
      ],
    },
    {
      number: "11.2",
      title: "Kehidupan dan Ciri-ciri Bintang",
      intro:
        "Bintang ialah jasad gas berbara besar yang menghasilkan cahaya dan haba sendiri melalui tindak balas nuklear. Bintang boleh diklasifikasikan berdasarkan lima ciri: warna, suhu, saiz, kecerahan dan jarak daripada Bumi. Setiap bintang juga melalui kitaran hidupnya sendiri — daripada kelahiran dalam nebula sehingga kematiannya sebagai kerdil putih, bintang neutron atau lohong hitam, bergantung kepada saiz asalnya (Hipotesis Nebular).",
      cards: [
        {
          title: "Warna dan suhu",
          body: "Warna sesuatu bintang menunjukkan suhu permukaannya. Klasifikasi (K): Merah (<3,500), Jingga (3,500–5,000), Kuning (5,000–6,000, julat Matahari), Kuning-keputihan (6,000–7,500), Putih (7,500–11,000), Putih-kebiruan (11,000–25,000), Biru (>25,000).",
        },
        {
          title: "Saiz bintang",
          body: "Bintang yang sangat besar dipanggil bintang supergergasi; bintang besar dipanggil bintang gergasi; bintang yang sangat kecil dipanggil bintang kerdil — namun semua kelas ini masih jauh lebih besar daripada mana-mana planet.",
        },
        {
          title: "Kecerahan dan jarak",
          body: "Kecerahan sesuatu bintang bergantung kepada saiz, jarak dan suhu permukaannya. Bintang paling cerah di langit malam ialah Sirius dan Rigel.",
          detail: "Dato' Dr. Sheikh Muszaphar Shukor — orang Malaysia pertama ke angkasa lepas, 10 Oktober 2007.",
        },
      ],
      sequence: {
        title: "⭐ Ikuti kisah hidup sebuah bintang",
        instruction: "Bintang lahir daripada nebula — awan gas dan debu yang besar. Langkah demi langkah bagaimana ia menjadi bintang, dan akhirnya mati.",
        bannerImage: nebulaImg,
        steps: [
          { title: "Nebula", body: "Awan gas dan debu yang besar. Graviti menariknya menjadi sfera yang berputar dan mengecil.", detail: "☁️" },
          { title: "Protobintang", body: "Teras yang termampat menjadi cukup panas dan tumpat untuk mula bercahaya — sebuah bintang muda dilahirkan.", detail: "🌟" },
          { title: "Bintang jujukan utama", body: "Bintang mencapai fasa stabil, melakukan pelakuran hidrogen kepada helium — ini peringkat Matahari kita sekarang.", detail: "☀️" },
          { title: "Gergasi merah", body: "Apabila hidrogen semakin berkurang, lapisan luar memanas dan mengembang, menjadikan bintang itu merah dan besar.", detail: "🔴" },
          { title: "Peringkat akhir", body: "Bintang kecil/sederhana menjadi kerdil putih secara senyap. Bintang besar meletup sebagai supernova — meninggalkan bintang neutron, atau bagi bintang yang sangat besar, sebuah lohong hitam yang cahaya pun tidak dapat terlepas.", detail: "⚡" },
        ],
      },
      phSlider: {
        title: "🌈 Warna bintang mendedahkan suhunya",
        instruction: "Seret untuk melihat bagaimana warna berkait dengan suhu permukaan — prinsip yang sama seperti tukang besi membaca warna logam untuk menilai kepanasannya.",
        gradient: STAR_GRADIENT,
        unitLabel: "",
        initialValue: 2,
        scale: [
          { value: 0, name: "Merah", description: "Di bawah 3,500 K — bintang paling sejuk yang boleh dilihat." },
          { value: 1, name: "Jingga", description: "3,500–5,000 K." },
          { value: 2, name: "Kuning", description: "5,000–6,000 K — julat suhu Matahari." },
          { value: 3, name: "Kuning-keputihan", description: "6,000–7,500 K." },
          { value: 4, name: "Putih", description: "7,500–11,000 K." },
          { value: 5, name: "Putih-kebiruan", description: "11,000–25,000 K." },
          { value: 6, name: "Biru", description: "Melebihi 25,000 K — bintang paling panas." },
        ],
      },
      flipCards: [
        { id: "dwarf", icon: "🔴", label: "Kerdil", fact: "Kelas bintang paling kecil — masih jauh lebih besar daripada mana-mana planet." },
        { id: "giant", icon: "🟠", label: "Gergasi", fact: "Jauh lebih besar daripada bintang kerdil, selalunya pada peringkat akhir kitaran hidupnya." },
        { id: "supergiant", icon: "🔵", label: "Supergergasi", fact: "Bintang terbesar yang diketahui — sangat besar walaupun berbanding bintang gergasi." },
      ],
      checks: [
        { question: "Apakah yang menentukan sama ada sebuah bintang yang sedang mati menjadi kerdil putih atau lohong hitam?", hint: "Jisim asal bintang tersebut — bintang kecil menjadi kerdil putih; bintang yang sangat besar runtuh menjadi lohong hitam selepas supernova." },
        { question: "Sebuah bintang kelihatan putih-kebiruan. Adakah ia lebih panas atau lebih sejuk daripada bintang merah?", hint: "Jauh lebih panas — bintang biru dan putih-kebiruan berada pada hujung skala suhu tertinggi, melebihi 11,000 K." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menyatakan ciri-ciri objek di angkasa lepas.",
    "Saya boleh membandingkan ciri-ciri bintang, termasuk Matahari, dan mengaitkannya dengan pemerhatian dari Bumi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Matahari ialah bintang terbesar dan paling cerah di alam semesta.",
      answer: false,
      explanation: "Ia cuma kelihatan begitu kerana ia jauh lebih hampir dengan kita — banyak bintang di alam semesta jauh lebih besar dan lebih cerah daripada Matahari.",
    },
    {
      type: "multiple-choice",
      question: "Bintang terbentuk daripada apa?",
      options: ["Asteroid", "Nebula", "Lohong hitam", "Komet"],
      answerIndex: 1,
      explanation: "Nebula — awan gas dan debu yang besar yang runtuh akibat graviti untuk membentuk protobintang, dan akhirnya sebuah bintang.",
    },
  ],
};
