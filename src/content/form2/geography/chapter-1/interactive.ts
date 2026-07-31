import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch1-skala-dan-jarak.png";

export const geographyF2C1Interactive: GeoF2InteractiveContent = {
  chapter: 1,
  blogHighlight: {
    title: "🗺️ Tahukah Anda? — Peta Terawal Dunia",
    body: "Peta tertua yang pernah ditemui berusia lebih 5,000 tahun, diukir di atas kepingan tanah liat di Babylon — jauh sebelum wujudnya kertas, manusia sudah cuba melukis dunia mereka mengikut skala.",
    imagePath: chapterImage,
  },
  keywords: [
    "Skala",
    "Jarak Mutlak",
    "Jarak Relatif",
    "Skala Lurus",
    "Skala Penyata",
    "Pecahan Wakilan",
    "Jangka Tolok",
    "Jalur Kertas",
  ],
  sections: [
    {
      number: "1.1",
      title: "Skala",
      intro:
        "Skala ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di permukaan bumi. Skala membolehkan kawasan yang luas di permukaan bumi dilukis dalam bentuk yang lebih kecil pada sehelai peta atau pelan — tanpa skala, sebuah peta hanyalah lakaran; dengan skala, ia menjadi alat ukur yang tepat. Terdapat tiga jenis skala: skala lurus, skala penyata dan pecahan wakilan (PW). Semakin besar nombor kedua dalam pecahan wakilan (contoh 1:300 000 berbanding 1:100 000), semakin kecil skala peta tersebut dan semakin luas kawasan yang dapat diliputi.",
      flipCards: [
        {
          id: "lurus",
          icon: "📏",
          label: "Skala Lurus",
          fact: "Satu garisan lurus dibahagikan kepada beberapa bahagian sama saiz, setiap bahagian mewakili jarak sebenar tertentu. Kelebihannya, nilai skala tidak berubah walaupun peta diperbesar/diperkecil melalui fotokopi.",
        },
        {
          id: "penyata",
          icon: "✍️",
          label: "Skala Penyata",
          fact: "Dinyatakan dalam bentuk ayat, contohnya '1 cm mewakili 1 km'. Mudah dan cepat difahami tanpa pengiraan tambahan unit — digunakan meluas pada peta lakar dan peta pelancongan.",
        },
        {
          id: "pw",
          icon: "➗",
          label: "Pecahan Wakilan",
          fact: "Dinyatakan dalam bentuk nisbah tanpa unit, contohnya 1 : 100 000 — bermakna 1 cm di atas peta mewakili 100 000 cm (1 km) di permukaan bumi. Piawai digunakan di seluruh dunia pada peta topografi dan peta rasmi.",
        },
      ],
      checks: [
        {
          question: "Skala yang manakah lebih besar, 1 : 30 000 atau 1 : 300 000?",
          hint: "1 : 30 000 lebih besar — semakin kecil nombor kedua dalam pecahan wakilan, semakin besar skalanya (dan semakin dekat pandangan pada peta).",
        },
      ],
    },
    {
      number: "1.2",
      title: "Jarak",
      intro:
        "Jarak ialah ukuran jauh atau dekatnya sesuatu tempat dengan tempat yang lain. Jarak terbahagi kepada dua jenis: jarak mutlak (diukur dalam unit tetap seperti meter atau kilometer, nilainya tidak berubah tidak kira jenis pengangkutan) dan jarak relatif (diukur berdasarkan masa, kos atau jenis pengangkutan yang digunakan, dan boleh berubah-ubah). Dua orang murid yang tinggal sama jauh (jarak mutlak) dari sekolah boleh mengambil masa yang sangat berbeza untuk sampai — bergantung sama ada mereka berjalan kaki, menaiki bas, atau dihantar dengan kereta. Itulah sebabnya perancangan harian (memilih pengangkutan, merancang waktu keluar rumah) lebih bergantung kepada jarak relatif berbanding jarak mutlak semata-mata.",
      tabs: [
        {
          title: "Jarak Mutlak",
          body: "Ukuran jauh di antara dua tempat yang dinyatakan dalam unit seperti meter atau kilometer. Nilainya tetap dan tidak berubah walau apa pun cara pengangkutan yang digunakan. Contoh: Jarak dari Ipoh ke Bidor = 66 km.",
        },
        {
          title: "Jarak Relatif",
          body: "Jarak berdasarkan kos dan masa perjalanan — tidak tetap dan berubah-ubah mengikut jenis pengangkutan. Contoh: Tambang bas dari Ipoh ke Bidor = RM6.60; masa perjalanan dengan kereta = 1 jam 10 minit.",
        },
      ],
      checks: [
        {
          question: "Apakah perbezaan antara jarak mutlak dengan jarak relatif?",
          hint: "Jarak mutlak diukur dalam unit tetap (meter/kilometer) dan tidak berubah. Jarak relatif diukur berdasarkan kos dan masa, yang berubah mengikut jenis pengangkutan.",
        },
      ],
    },
    {
      number: "1.3",
      title: "Menentukan Jarak Sebenar Menggunakan Skala",
      intro:
        "Jarak di antara dua tempat pada peta boleh berbentuk lurus (seperti jalan raya lurus) atau melengkung (seperti sungai berliku), dan setiap satu memerlukan alat pengukuran yang berbeza. Jarak lurus diukur menggunakan pembaris atau jangka tolok — letakkan kedua-dua hujung jangka tolok pada dua titik, kemudian pindahkan ke atas skala lurus peta tanpa mengubah bukaannya untuk membaca ukurannya. Jarak melengkung pula diukur menggunakan benang atau jalur kertas — ikutkan benang mengikut lengkungan sungai atau jalan, kemudian rentangkan benang itu di atas pembaris untuk mendapatkan ukurannya. Contohnya, jarak di antara sekolah dengan pejabat pos diukur menggunakan jangka tolok ialah 6 cm, dan skala peta ialah 1 cm mewakili 2 km — maka jarak sebenar = 6 × 2 km = 12 km.",
      tabs: [
        {
          title: "Jarak Lurus",
          body: "Diukur menggunakan pembaris atau jangka tolok — letakkan kedua-dua hujung jangka tolok pada dua titik, kemudian pindahkan ke atas skala lurus peta untuk membaca ukurannya.",
        },
        {
          title: "Jarak Melengkung",
          body: "Diukur menggunakan benang atau jalur kertas — ikutkan benang mengikut lengkungan sungai atau jalan, kemudian rentangkan benang itu di atas pembaris untuk mendapatkan ukurannya.",
        },
      ],
      checks: [
        {
          question: "Alat apakah yang sesuai untuk mengukur jarak Sungai Jernih yang berliku-liku?",
          hint: "Benang — kerana ia boleh dilentur mengikut lengkungan sungai, tidak seperti pembaris yang kaku.",
        },
      ],
    },
    {
      number: "1.4",
      title: "Menentukan Jarak Sebenar Berpandukan Skala pada Peta",
      intro:
        "Setelah anda mengukur jarak di atas peta (dalam cm), gunakan skala peta untuk menukarkannya kepada jarak sebenar di atas permukaan bumi: Jarak Sebenar = Jarak di atas Peta × Skala. Contohnya, jarak lurus di antara rumah Khairul dengan balai polis ialah 9 cm di atas peta, dan skala peta ialah 1 cm mewakili 1 km — maka jarak sebenar = 9 × 1 km = 9 km. Sentiasa tuliskan formula terlebih dahulu sebelum menggantikan nombor, kerana markah method kerap diberikan untuk penulisan formula yang betul walaupun jawapan akhir tersilap — dan jangan lupa tukar unit cm kepada km selepas pengiraan.",
      calculators: [
        {
          type: "two-field",
          title: "🧮 Kira jarak sebenar anda sendiri",
          instruction: "Masukkan jarak yang diukur pada peta (cm) dan nilai skala (1 cm mewakili berapa km) untuk mendapatkan jarak sebenar.",
          fieldA: { label: "Jarak pada peta", unit: "cm", default: 9 },
          fieldB: { label: "Skala (1cm=?km)", unit: "km", default: 1 },
          operation: "multiply",
          resultLabel: "Jarak Sebenar",
          resultUnit: "km",
        },
      ],
      checks: [
        {
          question: "Jarak lurus di antara rumah Khairul dengan balai polis ialah 9 cm, dan skala 1 cm mewakili 1 km. Berapakah jarak sebenar?",
          hint: "9 × 1 km = 9 km. Cuba sahkan jawapan ini menggunakan kalkulator di atas!",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menyatakan jarak mutlak, jarak relatif, skala penyata, skala lurus dan pecahan wakilan.",
    "Saya dapat menggunakan skala penyata, skala lurus dan pecahan wakilan untuk menentukan jarak sebenar.",
    "Saya dapat menentukan jarak sebenar berpandukan skala pada peta.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Jarak relatif adalah tetap dan tidak berubah.",
      answer: false,
      explanation: "Jarak relatif berubah-ubah mengikut kos dan masa — jarak mutlaklah yang tetap.",
    },
    {
      type: "multiple-choice",
      question: "Skala 1 : 100 000 tergolong dalam jenis skala yang manakah?",
      options: ["Skala lurus", "Skala penyata", "Pecahan wakilan", "Bukan salah satu di atas"],
      answerIndex: 2,
      explanation: "Pecahan wakilan dinyatakan dalam bentuk nisbah atau pecahan, seperti 1 : 100 000.",
    },
  ],
};
