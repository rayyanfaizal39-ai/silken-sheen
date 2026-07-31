import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch9-haba.png";

export const scienceF2C9InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Blog Sains — Beruang Kutub Yang Tersembunyi",
    body: "Kamera inframerah mengesan haba yang disinarkan daripada haiwan — tetapi beruang kutub memerangkap haba begitu berkesan di bawah bulu dan lemaknya sehingga ia hampir tidak kelihatan pada pengimejan terma, walaupun dalam habitat yang membeku.",
    imagePath: chapterImage,
  },
  keywords: [
    "Haba",
    "Suhu",
    "Konduksi",
    "Perolakan",
    "Sinaran",
    "Konduktor haba",
    "Penebat haba",
    "Keseimbangan terma",
    "Pengembangan",
    "Pengecutan",
  ],
  sections: [
    {
      number: "9.1",
      title: "Hubungan antara Suhu dan Haba",
      intro:
        "Haba ialah satu bentuk tenaga yang mengalir daripada kawasan lebih panas ke kawasan lebih sejuk, diukur dalam joule (J). Suhu pula hanyalah tahap kepanasan atau kesejukan — diukur dalam °C atau kelvin, dan bergantung kepada sepantas mana zarah bergerak. Dua bikar air pada suhu yang sama boleh mengandungi jumlah haba yang sangat berbeza, bergantung kepada berapa banyak air itu dan apa bahannya.",
      cards: [
        { title: "🔥 Haba", body: "Satu bentuk tenaga yang bergantung kepada jenis bahan, kuantiti bahan, dan suhu.", detail: "Unit: joule (J)" },
        { title: "🌡️ Suhu", body: "Tahap kepanasan atau kesejukan, yang bergantung kepada sepantas mana zarah dalam jirim itu bergerak.", detail: "Unit: °C atau kelvin (K)" },
      ],
      checks: [
        { question: "Adakah sentuhan cara yang boleh dipercayai untuk memeriksa sama ada seseorang mengalami demam?", hint: "Tidak begitu — sentuhan bersifat subjektif dan dipengaruhi oleh suhu tangan anda sendiri. Termometer memberikan bacaan yang objektif." },
      ],
    },
    {
      number: "9.2",
      title: "Aliran Haba dan Keseimbangan Terma",
      intro:
        "Haba sentiasa mengalir daripada objek lebih panas kepada objek lebih sejuk, melalui salah satu daripada tiga laluan. Dua objek yang bersentuhan terus bertukar haba sehingga tiada lagi pemindahan bersih antara mereka — pada ketika itu mereka berada dalam keseimbangan terma dan berkongsi suhu yang sama.",
      cards: [
        { title: "Apabila aliran haba berhenti", body: "Tenaga haba dipindahkan daripada objek bersuhu lebih tinggi kepada objek bersuhu lebih rendah sehingga tiada pemindahan bersih lagi — itulah keseimbangan terma, dan kedua-dua objek berakhir pada suhu yang sama." },
      ],
      flipCards: [
        { id: "conduction", icon: "🔗", label: "Konduksi", fact: "Haba dipindahkan zarah demi zarah melalui pepejal — seperti sudu logam yang menjadi panas dalam sup panas." },
        { id: "convection", icon: "🌀", label: "Perolakan", fact: "Bendalir yang dipanaskan (cecair atau gas) naik dan beredar, membawa haba bersamanya — seperti air mendidih dalam periuk." },
        { id: "radiation", icon: "☀️", label: "Sinaran", fact: "Haba merebak tanpa memerlukan sebarang medium — seperti cahaya matahari merentasi ruang kosong untuk sampai ke Bumi." },
      ],
      tabs: [
        {
          title: "☀️ Waktu Siang",
          body: "Bayu laut: Matahari memanaskan daratan lebih cepat berbanding laut. Udara panas di daratan naik, dan udara sejuk yang lebih tumpat daripada laut bergerak masuk menggantikannya — menghasilkan bayu yang bertiup dari laut ke darat.",
        },
        {
          title: "🌙 Waktu Malam",
          body: "Bayu darat: daratan menyejuk lebih cepat berbanding laut pada waktu malam. Udara yang lebih panas di atas laut naik, dan udara sejuk daripada daratan bergerak keluar menggantikannya — menghasilkan bayu yang bertiup dari darat ke laut.",
        },
      ],
      matcher: {
        title: "🔌 Padankan konduktor atau penebat dengan fungsinya",
        instruction: "Pilih jenis bahan, kemudian pilih barangan harian yang menggunakannya.",
        pairs: [
          { id: "pan", label: "🔥 Konduktor haba — memasak makanan dengan cepat", match: "Dasar periuk logam" },
          { id: "iron", label: "🔥 Konduktor haba — melicinkan pakaian dengan cepat", match: "Tapak logam besi pelicin" },
          { id: "gloves", label: "🧊 Penebat haba — melindungi tangan", match: "Sarung tangan ketuhar" },
          { id: "icebox", label: "🧊 Penebat haba — mengekalkan kesejukan", match: "Dinding kotak ais (gentian kaca/polistirena)" },
        ],
      },
      checks: [
        { question: "Mengapakah gegelung pemanas dalam periuk elektrik diletakkan di bahagian bawah?", hint: "Air yang dipanaskan di bahagian bawah menjadi kurang tumpat dan naik, mewujudkan arus perolakan yang memanaskan seluruh periuk dengan cekap." },
      ],
    },
    {
      number: "9.3",
      title: "Prinsip Pengembangan dan Pengecutan Jirim",
      intro:
        "Dalam pepejal, zarah bergetar pada kedudukan tetap — pemanasan menyebabkannya bergetar lebih cepat dan bergerak lebih jauh, jadi objek itu mengembang. Penyejukan pula sebaliknya: zarah bergetar lebih perlahan dan bergerak lebih rapat, jadi ia mengecut. Cecair dan gas berfungsi sama, cuma zarahnya sudah bebas bergerak — pemanasan menjadikannya bergerak lebih pantas dan lebih jauh, penyejukan menjadikannya bergerak lebih perlahan dan lebih rapat.",
      accordions: [
        { title: "🚂 Jurang landasan kereta api", body: "Jurang kecil antara bahagian rel membolehkan landasan mengembang dalam kepanasan tanpa melengkung dan bertindih." },
        { title: "🌉 Roda gelek jambatan keluli", body: "Satu hujung terletak di atas roda gelek dengan jurang, membolehkan seluruh jambatan mengembang dengan selamat semasa cuaca panas." },
        { title: "🔔 Penggera kebakaran jalur dwilogam", body: "Dua logam berbeza mengembang pada kadar berbeza apabila dipanaskan — jalur kuprum mengembang lebih cepat daripada jalur keluli, melenturkan jalur ke arah titik sentuhan, melengkapkan litar dan membunyikan penggera." },
        { title: "🌡️ Termometer merkuri", body: "Merkuri ialah konduktor haba yang mengembang dan mengecut secara boleh diramal mengikut suhu, itulah yang menjadikannya berguna untuk mengukur haba." },
      ],
      checks: [
        { question: "Penutup botol tersekat ketat. Bagaimanakah prinsip pengembangan membantu membukanya?", hint: "Merendam penutup dalam air panas menyebabkan logam mengembang sedikit, melonggarkan cengkamannya supaya lebih mudah dibuka." },
      ],
    },
    {
      number: "9.4",
      title: "Jenis Permukaan dan Penyerapan/Pembebasan Haba",
      intro:
        "Keupayaan sesuatu objek untuk menyerap atau membebaskan haba bergantung kepada jenis dan warna permukaannya. Apabila objek menyerap haba, suhunya meningkat; apabila ia membebaskan haba, suhunya menurun. Dalam eksperimen membandingkan tin putih dan tin hitam yang diletakkan berdekatan sumber haba, tin hitam menjadi lebih panas (penyerap lebih baik) — dan apabila kedua-duanya diisi air panas, tin hitam juga menyejuk lebih cepat (pembebas lebih baik).",
      tabs: [
        {
          title: "Permukaan gelap, kasar",
          body: "Menyerap dan membebaskan haba dengan baik. Itulah sebabnya pemanas air solar menggunakan panel gelap, dan mengapa kereta hitam terasa lebih panas di dalamnya pada hari yang cerah.",
        },
        {
          title: "Permukaan terang, berkilat",
          body: "Menyerap dan membebaskan haba dengan kurang baik — sebaliknya ia memantulkan lebih banyak. Itulah tepatnya sebabnya trak tangki bahan api dicat putih atau perak, untuk mengelakkan bahan api daripada menyejat akibat haba.",
        },
      ],
      checks: [
        { question: "Mengapakah pakaian berwarna terang terasa lebih sejuk berbanding pakaian gelap semasa cuaca panas?", hint: "Permukaan terang dan cerah menyerap kurang haba daripada matahari berbanding permukaan gelap." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membandingkan haba dan suhu.",
    "Saya boleh menerangkan aliran haba, keseimbangan terma dan konduktor/penebat.",
    "Saya boleh menerangkan pengembangan dan pengecutan jirim dengan kegunaan harian.",
    "Saya boleh menunjukkan bagaimana jenis permukaan mempengaruhi penyerapan dan pembebasan haba.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Haba dan suhu bermaksud perkara yang sama persis.",
      answer: false,
      explanation: "Haba ialah satu bentuk tenaga; suhu ialah ukuran kepanasan/kesejukan — berkait, tetapi tidak sama.",
    },
    {
      type: "multiple-choice",
      question: "Kaedah pemindahan haba yang manakah tidak memerlukan sebarang medium?",
      options: ["Konduksi", "Perolakan", "Sinaran", "Kesemuanya"],
      answerIndex: 2,
      explanation: "Sinaran adalah cara haba daripada Matahari merentasi ruang kosong untuk sampai ke Bumi — tiada medium diperlukan.",
    },
  ],
};
