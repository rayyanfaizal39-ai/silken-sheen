import type { DichotomousQuestion, SciF2C1Content } from "./interactive-types";
import rafflesiaImg from "@/assets/notes/form2-science/chapter-1/rafflesia.jpg";
import habitatSeaImg from "@/assets/notes/form2-science/chapter-1/sea.jpg";
import habitatDesertImg from "@/assets/notes/form2-science/chapter-1/desert.jpg";
import habitatPolarImg from "@/assets/notes/form2-science/chapter-1/polar.jpg";
import habitatSoilImg from "@/assets/notes/form2-science/chapter-1/soil.jpg";
import animalOverviewImg from "@/assets/notes/form2-science/chapter-1/chapter1_animal_classification_overview.webp";
import vertebrateGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_five_vertebrate_groups.webp";
import invertebrateGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_invertebrate_classification.webp";
import plantGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_plant_classification.webp";
import keyOrganismSetImg from "@/assets/notes/form2-science/chapter-1/chapter1_dichotomous_key_organism_set.webp";

const dichotomousKeyBM: DichotomousQuestion = {
  type: "question",
  question: "Adakah ia poikiloterma (berdarah sejuk) atau homeoterma (berdarah panas)?",
  choices: [
    {
      label: "Poikiloterma",
      next: {
        type: "question",
        question: "Adakah ia mempunyai kulit bersisik, atau kulit tidak bersisik yang lembap?",
        choices: [
          {
            label: "Kulit bersisik",
            next: {
              type: "question",
              question: "Adakah ia mempunyai sirip, atau tiada sirip?",
              choices: [
                { label: "Ada sirip", next: { type: "leaf", organism: "Ikan Bawal" } },
                { label: "Tiada sirip", next: { type: "leaf", organism: "Ular" } },
              ],
            },
          },
          { label: "Kulit tidak bersisik", next: { type: "leaf", organism: "Katak" } },
        ],
      },
    },
    {
      label: "Homeoterma",
      next: {
        type: "question",
        question: "Adakah badannya dilitupi bulu pelepah, atau tidak berbulu pelepah?",
        choices: [
          { label: "Berbulu pelepah", next: { type: "leaf", organism: "Ayam" } },
          { label: "Tidak berbulu pelepah", next: { type: "leaf", organism: "Singa" } },
        ],
      },
    },
  ],
};

export const scienceF2C1InteractiveBM: SciF2C1Content = {
  blogHighlight: {
    title: "🌸 Blog Sains — Bunga Rafflesia",
    body: "Malaysia merupakan habitat bagi bunga terbesar di dunia, iaitu bunga rafflesia — tumbuhan parasit ini tidak mempunyai daun atau akar, dan mengeluarkan bau seperti bahan reput semasa berbunga sepenuhnya untuk menarik pendebunga.",
    imagePath: rafflesiaImg,
  },
  classificationImages: {
    animalOverview: {
      src: animalOverviewImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Haiwan bertulang belakang seperti ikan, katak, cicak, burung dan kucing di sebelah kiri; haiwan tanpa tulang belakang seperti rama-rama, labah-labah, obor-obor, siput dan cacing di sebelah kanan.",
      aspect: "3 / 2",
      annotations: [
        { id: "vert", label: "Vertebrata", x: 26, y: 8, note: "Haiwan yang mempunyai tulang belakang di dalam badannya." },
        { id: "vert-trait", label: "Ada tulang belakang", x: 26, y: 95, note: "Tulang belakang menyokong badan dan melindungi saraf tunjang." },
        { id: "invert", label: "Invertebrata", x: 74, y: 8, note: "Haiwan yang tidak mempunyai tulang belakang." },
        { id: "invert-trait", label: "Tiada tulang belakang", x: 74, y: 95, note: "Badan disokong oleh rangka luar atau tekanan cecair, bukan tulang belakang." },
      ],
    },
    vertebrateGroups: {
      src: vertebrateGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Lima kumpulan vertebrata: seekor ikan di dalam air, seekor katak di tepi kolam, seekor cicak di atas tanah, seekor burung di atas dahan dan seekor kucing di atas rumput.",
      aspect: "4 / 3",
      annotations: [
        { id: "fish", label: "Ikan", x: 17, y: 48, note: "Berdarah sejuk, bernafas melalui insang, badan bersisik dan mempunyai sirip untuk berenang." },
        { id: "amphibian", label: "Amfibia", x: 46, y: 49, note: "Berdarah sejuk. Berudu bernafas melalui insang; dewasa bernafas melalui peparu dan kulit lembap." },
        { id: "reptile", label: "Reptilia", x: 79, y: 51, note: "Berdarah sejuk, bernafas melalui peparu, kulit bersisik kering dan bertelur bercengkerang." },
        { id: "bird", label: "Burung", x: 29, y: 88, note: "Berdarah panas, badan dilitupi bulu pelepah, bernafas melalui peparu dan bertelur." },
        { id: "mammal", label: "Mamalia", x: 68, y: 89, note: "Berdarah panas, badan berambut, bernafas melalui peparu dan menyusukan anak." },
      ],
    },
    invertebrateGroups: {
      src: invertebrateGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Empat kumpulan invertebrata dalam empat panel: siput dan obor-obor; cacing tanah dan lintah; belalang; labah-labah, ketam dan lipan.",
      aspect: "4 / 3",
      legendLabel: "Empat kumpulan invertebrata",
      caption: "Setiap panel mengumpulkan haiwan yang berkongsi ciri yang sama.",
      annotations: [
        { id: "unseg", label: "Tiada kaki + badan tidak bersegmen", x: 27, y: 10, note: "Contoh: siput dan obor-obor. Badan lembut tanpa segmen dan tanpa kaki." },
        { id: "seg", label: "Tiada kaki + badan bersegmen", x: 73, y: 10, note: "Contoh: cacing tanah dan lintah. Badan bersegmen berbentuk gelang, tanpa kaki." },
        { id: "three", label: "3 pasang kaki", x: 27, y: 56, note: "Contoh: belalang. Serangga mempunyai tiga pasang kaki dan badan terbahagi kepada tiga bahagian." },
        { id: "more", label: "Lebih daripada 3 pasang kaki", x: 73, y: 56, note: "Contoh: labah-labah, ketam dan lipan. Mempunyai lebih daripada tiga pasang kaki." },
      ],
    },
    plantGroups: {
      src: plantGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Empat kumpulan tumbuhan: lumut di atas batu, paku pakis dengan sorus di bawah daun, pokok konifer dengan kon, dan tumbuhan berbunga dengan bunga dan buah.",
      aspect: "1 / 1",
      annotations: [
        { id: "moss", label: "Lumut", x: 26, y: 47, note: "Tumbuhan tidak bervaskular. Tiada tisu pengangkut, membiak dengan spora dan tumbuh rendah di tempat lembap." },
        { id: "fern", label: "Paku pakis", x: 71, y: 47, note: "Tumbuhan bervaskular tanpa bunga atau biji. Membiak dengan spora yang terdapat di bawah daun." },
        { id: "conifer", label: "Konifer", x: 26, y: 96, note: "Tumbuhan berbiji tanpa bunga. Bijinya terdedah di dalam kon." },
        { id: "flowering", label: "Tumbuhan berbunga", x: 72, y: 96, note: "Tumbuhan berbunga. Biji terlindung di dalam buah yang terbentuk daripada bunga." },
      ],
    },
    keyOrganismSet: {
      src: keyOrganismSetImg,
      annotationMode: "clean",
      size: "compact",
      alt: "Lapan organisma disusun untuk perbandingan ciri: ikan, katak, cicak, burung, kucing, rama-rama, labah-labah dan siput.",
      aspect: "3 / 2",
      caption:
        "Rujukan ciri: bandingkan tulang belakang, litupan badan dan bilangan kaki sebelum menjawab setiap soalan kunci di bawah.",
      annotations: [
        { id: "fish", label: "Ikan", x: 14, y: 51, note: "Berdarah sejuk, bernafas melalui insang, badan bersisik dan mempunyai sirip untuk berenang." },
        { id: "frog", label: "Katak", x: 37, y: 51 },
        { id: "lizard", label: "Cicak", x: 61, y: 51 },
        { id: "bird", label: "Burung", x: 85, y: 51, note: "Berdarah panas, badan dilitupi bulu pelepah, bernafas melalui peparu dan bertelur." },
        { id: "cat", label: "Kucing", x: 14, y: 94 },
        { id: "butterfly", label: "Rama-rama", x: 37, y: 94 },
        { id: "spider", label: "Labah-labah", x: 61, y: 94 },
        { id: "snail", label: "Siput", x: 85, y: 94 },
      ],
    },
  },
  keywords: [
    {
      term: "Biodiversiti",
      definition:
        "Kepelbagaian organisma — mikroorganisma, haiwan dan tumbuhan — merangkumi kepelbagaian gen, spesies dan habitat.",
    },
    {
      term: "Vertebrata",
      definition: "Haiwan yang mempunyai tulang belakang: ikan, amfibia, reptilia, burung atau mamalia.",
    },
    {
      term: "Invertebrata",
      definition: "Haiwan yang tiada tulang belakang, contohnya serangga, cacing, labah-labah.",
    },
    {
      term: "Mamalia",
      definition: "Berdarah panas, mempunyai bulu dan rambut, bernafas menggunakan peparu, melahirkan dan menyusukan anak.",
    },
    { term: "Burung", definition: "Berdarah panas, mempunyai bulu pelepah, bernafas dengan peparu, bertelur bercengkerang keras." },
    {
      term: "Reptilia",
      definition: "Berdarah sejuk, kulit bersisik, bertelur bercengkerang, bernafas dengan peparu.",
    },
    {
      term: "Ikan",
      definition: "Berdarah sejuk, bersisik, bernafas melalui insang, bertelur di dalam air.",
    },
    {
      term: "Amfibia",
      definition: "Berdarah sejuk, kulit lembap, hidup di darat dan air, bertelur tanpa cengkerang.",
    },
    {
      term: "Monokotiledon",
      definition: "Tumbuhan berbunga yang bijinya mempunyai satu kotiledon, contohnya padi.",
    },
    {
      term: "Dikotiledon",
      definition: "Tumbuhan berbunga yang bijinya mempunyai dua kotiledon, contohnya bunga matahari.",
    },
  ],
  habitats: [
    {
      id: "desert",
      icon: "🏜️",
      label: "Gurun",
      fact: "Organisma di sini menghadapi siang yang panas terik, malam yang sejuk, dan hampir tiada air.",
      imagePath: habitatDesertImg,
    },
    {
      id: "polar",
      icon: "❄️",
      label: "Kawasan Kutub",
      fact: "Bulu tebal, lapisan lemak dan tingkah laku berhimpit membantu menentang kesejukan melampau.",
      imagePath: habitatPolarImg,
    },
    {
      id: "soil",
      icon: "🪱",
      label: "Tanah",
      fact: "Habitat pengurai dan organisma penggali yang mengitar semula nutrien secara senyap.",
      imagePath: habitatSoilImg,
    },
    {
      id: "sea",
      icon: "🌊",
      label: "Laut",
      fact: "Daripada plankton kepada paus — habitat terbesar mengikut isi padu di Bumi.",
      imagePath: habitatSeaImg,
    },
  ],
  importance: [
    {
      icon: "🍚",
      title: "Sumber makanan",
      description: "Haiwan dan tumbuhan membekalkan makanan yang manusia bergantung setiap hari.",
    },
    {
      icon: "⚖️",
      title: "Imbangan alam",
      description: "Kitaran nutrien, pendebungaan dan interaksi antara organisma mengekalkan kestabilan ekosistem.",
    },
    {
      icon: "🏕️",
      title: "Rekreasi",
      description: "Kawasan yang kaya dengan biodiversiti menjadi taman dan destinasi eko-pelancongan.",
    },
    {
      icon: "💊",
      title: "Perubatan",
      description: "Herba dan sebatian tumbuhan digunakan dalam pembuatan ubat-ubatan dan kosmetik.",
    },
    {
      icon: "🪵",
      title: "Bahan mentah",
      description: "Balak, buluh dan rotan membina perabot, alat muzik dan bangunan.",
    },
    {
      icon: "🔬",
      title: "Pendidikan",
      description: "Kajian terhadap organisma mendorong penyelidikan saintifik dan teknologi baharu.",
    },
  ],
  historyFact:
    "🗓 Hari Ini dalam Sejarah — Hari Biodiversiti Sedunia disambut pada 22 Mei setiap tahun.",
  conservationMethods: [
    {
      id: "in-situ",
      label: "In situ",
      description:
        "Memelihara sesuatu spesies di dalam habitat semula jadinya — contohnya taman negara, hutan simpan kekal dan taman laut.",
    },
    {
      id: "ex-situ",
      label: "Ex situ",
      description: "Memelihara sesuatu spesies di luar habitat semula jadinya — contohnya zoo dan taman botani.",
    },
  ],
  humanImpact: [
    {
      icon: "🪓",
      activity: "Penyahhutanan untuk balak dan pembangunan",
      chain: [
        "Hutan ditebang",
        "Haiwan kehilangan habitat",
        "Haiwan kehilangan sumber makanan",
        "Spesies terancam kepupusan",
      ],
    },
    {
      icon: "🎯",
      activity: "Pemburuan dan pemerdagangan hidupan liar",
      chain: [
        "Haiwan diburu atau didagangkan",
        "Bilangan individu menurun dengan cepat",
        "Spesies endemik dan terancam paling terjejas",
        "Akta Perlindungan Hidupan Liar 1972 mengharamkannya",
      ],
    },
    {
      icon: "⚖️",
      activity: "Keperluan pembangunan lwn. pemeliharaan",
      chain: [
        "Manusia memerlukan bahan mentah seperti kayu balak",
        "Aktiviti penyahhutanan perlu DIKAWAL",
        "Biodiversiti terpelihara daripada kepupusan",
      ],
    },
  ],
  speciesConcepts: [
    {
      id: "endemic",
      label: "Spesies endemik",
      definition:
        "Spesies yang hidup berkelompok di habitat yang terhad di sesebuah lokasi tertentu sahaja — tidak ditemui secara semula jadi di tempat lain. Endemik memberitahu kita tentang LOKASI.",
      examples: [
        "🌸 Bunga rafflesia",
        "🪤 Periuk kera (Nepenthes rajah)",
        "🐢 Penyu belimbing",
        "🐅 Harimau Malaya",
        "🐘 Gajah pygmy Borneo",
      ],
    },
    {
      id: "threatened",
      label: "Spesies terancam",
      definition:
        "Spesies yang bilangannya semakin berkurang sehingga berisiko pupus. Terancam memberitahu kita tentang RISIKO KEPUPUSAN, bukan lokasi. Akta Perlindungan Hidupan Liar 1972 mengharamkan pembunuhan dan pemerdagangannya.",
      examples: ["🐅 Harimau Malaya", "🐢 Penyu belimbing", "🐘 Gajah pygmy Borneo", "🦜 Burung enggang"],
    },
  ],
  speciesCaution:
    "Endemik dan terancam BUKAN perkara yang sama. Sesuatu spesies boleh endemik sahaja, terancam sahaja, atau kedua-duanya sekali — contohnya harimau Malaya yang endemik dan juga terancam.",
  checkYourself11: [
    {
      question: "Apakah maksud biodiversiti, mengikut kata-kata anda sendiri?",
      hint: "Fikirkan: mikroorganisma + haiwan + tumbuhan + habitat dan gen yang membezakan setiap satu.",
    },
    {
      question: "Bagaimanakah biodiversiti menyokong ekonomi?",
      hint: "Pertimbangkan bahan mentah (balak, rotan), bahan ubatan, dan pendapatan eko-pelancongan / rekreasi.",
    },
    {
      question: "Apakah yang menjadikan sesuatu spesies itu \"endemik\"?",
      hint: "Ia hidup hanya dalam habitat terhad di satu lokasi tertentu — tiada di tempat lain secara semula jadi.",
    },
    {
      question: "Apakah bezanya spesies endemik dengan spesies terancam? Beri satu contoh bagi setiap satu.",
      hint: "Endemik = lokasi terhad (contoh: periuk kera, Nepenthes rajah). Terancam = berisiko pupus (contoh: burung enggang yang dilindungi). Harimau Malaya ialah kedua-duanya sekali.",
    },
  ],
  animalBranches: [
    {
      id: "invert",
      label: "Invertebrata — tiada tulang belakang",
      subGroups: [
        {
          label: "Tanpa kaki",
          groups: [
            { label: "Badan tanpa segmen", chips: ["Span", "Karang laut", "Planaria", "Siput"] },
            { label: "Badan bersegmen", chips: ["Cacing tanah", "Lintah", "Cacing pita"] },
          ],
        },
        {
          label: "Berkaki",
          detail: "Ciri sepunya invertebrata berkaki: badan bersegmen, dan kulit keras (rangka luar).",
          groups: [
            { label: "Tiga pasang kaki", chips: ["Semut", "Rama-rama", "Lipas"] },
            {
              label: "Lebih daripada tiga pasang kaki",
              chips: ["Labah-labah", "Kala jengking", "Lipan", "Udang", "Belangkas"],
            },
          ],
        },
      ],
    },
    {
      id: "vert",
      label: "Vertebrata — ada tulang belakang",
      vertebrateGroups: [
        {
          name: "Ikan",
          traits: [
            "Poikiloterma",
            "Sisik keras dan berlendir",
            "Sirip dan ekor",
            "Bernafas melalui insang",
            "Bertelur, persenyawaan luaran",
          ],
          examples: ["Kerapu", "Ikan badut", "Belut"],
        },
        {
          name: "Amfibia",
          traits: [
            "Poikiloterma",
            "Hidup di darat dan air",
            "Kulit lembap",
            "Anak bernafas melalui insang, dewasa melalui peparu + kulit",
            "Telur seperti jeli, tiada cengkerang",
          ],
          examples: ["Katak", "Kodok", "Salamander"],
        },
        {
          name: "Reptilia",
          traits: [
            "Poikiloterma",
            "Telur bercengkerang",
            "Bernafas melalui peparu",
            "Kulit bersisik dan keras",
            "Persenyawaan dalaman",
          ],
          examples: ["Kura-kura", "Ular", "Buaya", "Iguana"],
        },
        {
          name: "Burung",
          traits: [
            "Homeoterma",
            "Bulu pelepah untuk mengekalkan suhu badan",
            "Bernafas melalui peparu",
            "Sayap, kaki bersisik",
            "Telur bercengkerang keras",
          ],
          examples: ["Burung hantu", "Burung raja udang", "Itik"],
        },
        {
          name: "Mamalia",
          traits: [
            "Homeoterma",
            "Badan dilitupi bulu dan rambut (bukan bulu pelepah)",
            "Bernafas melalui peparu",
            "Persenyawaan dalaman",
            "Melahirkan dan menyusukan anak",
          ],
          examples: ["Kelawar", "Zirafah", "Gajah", "Singa"],
        },
      ],
    },
  ],
  plantBranches: [
    {
      id: "nonflower",
      label: "Tidak berbunga",
      chips: ["Lumut — spora, tidak berpembuluh", "Paku pakis — spora, berpembuluh", "Konifer — kon, berpembuluh"],
    },
    {
      id: "flower",
      label: "Berbunga",
      detail:
        "Setiap biji membawa kotiledon — makanan simpanan permulaannya. Satu kotiledon = monokotiledon. Sepasang = dikotiledon.",
    },
  ],
  cotyledonCompare: [
    {
      icon: "🌾",
      label: "Monokotiledon",
      rows: [
        { term: "Kotiledon", value: "Satu" },
        { term: "Akar", value: "Akar serabut" },
        { term: "Daun", value: "Urat daun selari" },
        { term: "Batang", value: "Kebanyakan tidak berkayu" },
        { term: "Contoh", value: "Padi, jagung" },
      ],
    },
    {
      icon: "🌻",
      label: "Dikotiledon",
      rows: [
        { term: "Kotiledon", value: "Dua" },
        { term: "Akar", value: "Akar tunjang" },
        { term: "Daun", value: "Urat daun jejaring" },
        { term: "Batang", value: "Berkayu" },
        { term: "Contoh", value: "Tomato, durian" },
      ],
    },
  ],
  dichotomousOrganisms: ["Ikan Bawal", "Ayam", "Singa", "Katak", "Ular"],
  dichotomousKey: dichotomousKeyBM,
  checkYourself12: [
    {
      question: "Susunkan: helang, katak, kobra, ikan emas, harimau — mengikut kumpulan vertebrata.",
      hint: "Padankan setiap satu dengan Burung / Amfibia / Reptilia / Ikan / Mamalia berdasarkan cara bernafas dan salutan kulit.",
    },
    {
      question: "Satu persamaan + tiga perbezaan: bunga matahari lwn pokok padi.",
      hint: "Persamaan: kedua-duanya tumbuhan berbunga. Perbezaan: bilangan kotiledon, jenis akar, corak urat daun.",
    },
    {
      question: "Dua perbezaan antara monokotiledon dan dikotiledon.",
      hint: "Bandingkan jenis akar (serabut lwn tunjang) dan corak urat daun (selari lwn jejaring).",
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan biodiversiti dan kepentingannya.",
    "Saya boleh menjustifikasikan mengapa biodiversiti perlu diurus secara aktif.",
    "Saya boleh mengelaskan organisma menggunakan kekunci dikotomi.",
    "Saya boleh menerangkan kumpulan taksonomi utama.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "Betul atau salah: Selain benda hidup, kekunci dikotomi juga boleh digunakan untuk mengelaskan benda bukan hidup.",
      answer: true,
      explanation:
        "Betul. Kekunci dikotomi ialah kaedah mengenal pasti dua pilihan berpasangan, jadi ia boleh digunakan untuk apa-apa sahaja yang boleh dibezakan melalui ciri — termasuk benda bukan hidup seperti batuan atau objek buatan. Dalam bab ini kita menggunakannya untuk mengelaskan organisma.",
    },
    {
      type: "multiple-choice",
      question:
        "Haiwan manakah yang ANAKNYA bernafas melalui insang, tetapi apabila DEWASA bernafas menggunakan peparu dan kulit yang lembap?",
      options: ["Buaya", "Katak", "Helang", "Kerapu"],
      answerIndex: 1,
      explanation:
        "Katak ialah amfibia. Berudu (anak katak) bernafas melalui insang, manakala katak dewasa bernafas menggunakan peparu dan kulit yang lembap. Telur amfibia pula berlendir dan tidak bercangkerang.",
    },
  ],
};
