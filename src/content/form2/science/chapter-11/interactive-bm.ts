import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch11-bintang-galaksi.png";
import spiralImg from "@/assets/notes/form2-science/chapter-11/spiral.png";
import ellipticalImg from "@/assets/notes/form2-science/chapter-11/elliptical.png";
import irregularImg from "@/assets/notes/form2-science/chapter-11/irregular.png";

const STAR_GRADIENT = "linear-gradient(90deg,#ff4d4d,#ff9d4d,#ffe14d,#fff6d9,#ffffff,#cfe0ff,#4d7cfe)";

export const scienceF2C11InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 11,
  blogHighlight: {
    title: "Blog Sains — Letupan Supernova",
    body: "Supernova ialah satu letupan yang amat kuat daripada bintang yang bersaiz besar. Setiap letupan menghasilkan lebih daripada 100 kali ganda tenaga cahaya yang dikeluarkan oleh Matahari semenjak kewujudannya selama 10 bilion tahun. Supernova yang terakhir berlaku lebih kurang 400 tahun dahulu tetapi hanya dapat dikesan pada tahun 1987.",
    imagePath: chapterImage,
  },
  keywords: [
    "Galaksi",
    "Bima Sakti",
    "Nebula",
    "Bintang",
    "Sistem suria",
    "Raksasa merah",
    "Super raksasa",
    "Supernova",
    "Kerdil putih",
    "Bintang neutron",
    "Lohong hitam",
  ],
  sections: [
    {
      number: "11.1",
      title: "Galaksi dan Alam Semesta",
      intro:
        "Alam semesta terdiri daripada semua benda yang wujud di sekeliling kita, dan terdapat jutaan galaksi di dalamnya. Galaksi ialah satu himpunan jasad yang terdiri daripada jutaan bintang bersama gas, debu dan habuk. Galaksi wujud dalam pelbagai bentuk, iaitu galaksi berpilin, galaksi elips dan galaksi tidak seragam. Kajian astronomi menggunakan alat teknologi seperti teleskop telah menyedarkan kita tentang keindahan dan keluasan alam semesta.",
      cards: [
        {
          title: "🔭 Teknologi membantu kajian angkasa",
          body: "Teleskop angkasa Hubble dilancarkan pada 24 April 1990. Teleskop ini sangat berkuasa sehingga dapat melihat sekeping duit syiling yang berada sejauh 725 km darinya.",
        },
      ],
      galaxyCards: {
        title: "🌀 Tiga jenis galaksi",
        instruction: "Perhatikan tiga jenis galaksi dan contoh bagi setiap jenis.",
        cards: [
          { id: "spiral", image: spiralImg, name: "Galaksi berpilin", example: "Contoh: Andromeda dan Bima Sakti" },
          { id: "elliptical", image: ellipticalImg, name: "Galaksi elips", example: "Contoh: Ursa Mayor dan Messier 87" },
          { id: "irregular", image: irregularImg, name: "Galaksi tidak seragam", example: "Contoh: Magellan kecil dan Magellan besar" },
        ],
      },
      checks: [
        {
          question: "Apakah yang dimaksudkan dengan galaksi?",
          hint: "Galaksi ialah satu himpunan jasad yang terdiri daripada jutaan bintang bersama gas, debu dan habuk.",
        },
        {
          question: "Namakan tiga jenis galaksi dan berikan satu contoh bagi setiap satu.",
          hint: "Galaksi berpilin (Andromeda, Bima Sakti); galaksi elips (Ursa Mayor, Messier 87); galaksi tidak seragam (Magellan kecil, Magellan besar).",
        },
      ],
    },
    {
      number: "11.1",
      title: "Bima Sakti, Kedudukan Sistem Suria dan Skala Relatif",
      intro:
        "Sistem suria kita terletak di dalam galaksi Bima Sakti. Bima Sakti ialah sebuah galaksi berpilin yang sederhana besar, dan sistem suria kita berada di pinggir salah satu cabang berpilinnya. Bima Sakti terdiri daripada lebih kurang 200 bilion bintang, dan Matahari merupakan salah satu daripadanya.",
      milkyWayLocator: {
        title: "🌌 Kedudukan sistem suria dalam Bima Sakti",
        galaxyLabel: "Galaksi Bima Sakti",
        solarSystemLabel: "Sistem suria",
        centreLabel: "Pusat galaksi",
        armLabel: "di pinggir salah satu cabang berpilin",
        facts: [
          "Bima Sakti ialah sebuah galaksi berpilin yang sederhana besar.",
          "Sistem suria kita berada di pinggir salah satu cabang berpilin Bima Sakti.",
          "Bima Sakti terdiri daripada lebih kurang 200 bilion bintang, dan Matahari salah satu daripadanya.",
        ],
        caption: "Sistem suria kita tidak berada di pusat galaksi, tetapi di pinggir salah satu cabang berpilin.",
        hint: "Gambar tidak mengikut skala.",
      },
      cosmicScale: {
        title: "🪐 Perbandingan saiz relatif",
        instruction: "Tekan setiap peringkat untuk melihat apa yang terkandung di dalamnya.",
        tiers: [
          { id: "bumi", label: "Bumi", note: "Planet tempat kita diami. Saiz Bumi lebih kecil daripada sebutir habuk jika dibandingkan dengan alam semesta." },
          { id: "sistem-suria", label: "Sistem suria", note: "Terdiri daripada lapan buah planet yang mengelilingi Matahari, termasuk Bumi." },
          { id: "bima-sakti", label: "Galaksi Bima Sakti", note: "Galaksi yang menempatkan sistem suria kita, bersama lebih kurang 200 bilion bintang." },
          { id: "kumpulan", label: "Kumpulan galaksi", note: "Beberapa galaksi yang berdekatan antara satu sama lain." },
          { id: "gugusan", label: "Gugusan galaksi", note: "Himpunan kumpulan galaksi yang lebih besar lagi." },
          { id: "alam-semesta", label: "Alam semesta", note: "Semua benda yang wujud. Kita tidak akan dapat melihat penghujungnya." },
        ],
        notToScaleLabel: "Gambar tidak mengikut skala",
        caption: "Setiap peringkat terkandung di dalam peringkat yang berikutnya.",
        hint: "Urutan ini menunjukkan kandungan, bukan nisbah saiz sebenar.",
      },
      checks: [
        {
          question: "Di manakah kedudukan sistem suria kita di dalam galaksi Bima Sakti?",
          hint: "Di pinggir salah satu cabang berpilin Bima Sakti — bukan di pusat galaksi.",
        },
        {
          question: "Susun mengikut urutan kandungan: Bumi, alam semesta, sistem suria, galaksi Bima Sakti.",
          hint: "Bumi → sistem suria → galaksi Bima Sakti → kumpulan galaksi → gugusan galaksi → alam semesta.",
        },
      ],
    },
    {
      number: "11.1",
      title: "Kitar Hidup Bintang",
      intro:
        "Bintang dilahirkan daripada nebula. Nebula ialah awan besar yang terdiri daripada debu dan gas-gas seperti hidrogen dan helium. Daya tarikan graviti yang kuat menarik gas dan zarah debu itu sehingga membentuk satu gumpalan yang mengecut dan termampat menjadi satu teras. Apabila suhu dan tekanan dalam teras menjadi terlalu tinggi, tindak balas nuklear berlaku dan gas hidrogen ditukarkan kepada helium, lalu membebaskan banyak tenaga haba dan cahaya. Teras itu menyinar dan satu bintang dilahirkan.",
      accordions: [
        {
          title: "☁️ Kelahiran bintang",
          body: "Gas dan zarah debu dalam nebula ditarik oleh daya tarikan graviti yang kuat lalu membentuk satu gumpalan. Gumpalan itu mengecut serta termampat sehingga menjadi sangat padat dan membentuk satu teras. Apabila suhu dan tekanan dalam teras menjadi terlalu tinggi, tindak balas nuklear berlaku dan gas hidrogen ditukarkan kepada helium. Teras itu menyinar dan satu bintang dilahirkan — bintang yang baru dilahirkan dikenali sebagai bintang muda.",
        },
        {
          title: "🔴 Kematian bintang",
          body: "Haba yang banyak memanaskan lapisan bintang yang paling luar sehingga hidrogen dalam lapisan itu mula terbakar dan bintang mengembang. Pada peringkat ini bintang berwarna merah dan disebut raksasa merah. Jika bintang raksasa merah tidak begitu besar, bintang kerdil putih akan terbentuk. Sekiranya bintang raksasa merah sangat besar, bintang ini mengecut dengan cepat dan menghasilkan letupan besar yang disebut supernova, lalu membentuk bintang neutron. Jika bintang yang asal bersaiz sangat besar, letupan supernova akan membentuk lohong hitam.",
        },
        {
          title: "⚫ Apakah lohong hitam?",
          body: "Lohong hitam merupakan ruang yang tidak membolehkan sebarang jirim terlepas darinya, termasuklah cahaya.",
        },
      ],
      stellarLifecycle: {
        title: "⭐ Kitar hidup bintang",
        instruction: "Tekan setiap jenis bintang untuk mengikuti laluan hidupnya.",
        originLabel: "Nebula",
        originNote: "Semua bintang bermula daripada nebula.",
        branches: [
          {
            id: "medium",
            label: "Bintang bersaiz sederhana",
            stages: ["Bintang bersaiz sederhana", "Raksasa merah", "Kerdil putih"],
            note: "Bintang bersaiz sederhana seperti Matahari akan menjadi raksasa merah, dan kerana raksasa merah itu tidak begitu besar, ia berakhir sebagai kerdil putih. Laluan ini tidak melalui supernova.",
          },
          {
            id: "large",
            label: "Bintang besar",
            stages: ["Bintang besar", "Raksasa merah", "Super raksasa", "Supernova", "Bintang neutron"],
            note: "Bintang besar menjadi raksasa merah kemudian super raksasa. Kerana raksasa merah itu sangat besar, ia mengecut dengan cepat dan meletup sebagai supernova, lalu membentuk bintang neutron.",
          },
          {
            id: "superlarge",
            label: "Bintang super besar",
            stages: ["Bintang super besar", "Raksasa merah", "Super raksasa", "Supernova", "Lohong hitam"],
            note: "Bagi bintang yang asalnya bersaiz sangat besar, letupan supernova akan membentuk lohong hitam dan bukannya bintang neutron.",
          },
        ],
        outcomeLabel: "Peringkat akhir",
        caption: "Semua bintang bermula daripada nebula, tetapi laluan seterusnya bergantung pada saiz bintang itu.",
        hint: "Perhatikan bahawa hanya bintang besar dan bintang super besar melalui supernova. Bintang bersaiz sederhana tidak meletup.",
      },
      checks: [
        {
          question: "Apakah yang menentukan sama ada sebuah bintang berakhir sebagai kerdil putih, bintang neutron atau lohong hitam?",
          hint: "Saiz bintang itu. Bintang bersaiz sederhana menjadi kerdil putih; bintang besar membentuk bintang neutron selepas supernova; bintang super besar membentuk lohong hitam.",
        },
        {
          question: "Matahari ialah bintang bersaiz sederhana. Adakah Matahari akan menjadi lohong hitam?",
          hint: "Tidak. Bintang bersaiz sederhana melalui peringkat raksasa merah dan berakhir sebagai kerdil putih — laluan itu tidak melalui supernova mahupun lohong hitam.",
        },
      ],
    },
    {
      number: "11.1",
      title: "Ciri-ciri Bintang",
      intro:
        "Jika diperhatikan pada waktu malam, ada bintang yang kelihatan cerah dan ada yang malap. Bintang-bintang boleh dikelaskan berdasarkan lima ciri, iaitu suhu, saiz, jarak, warna dan kecerahan. Secara umumnya, bintang mempunyai warna mengikut suhu di permukaannya, iaitu daripada suhu yang rendah kepada suhu yang lebih tinggi.",
      cards: [
        {
          title: "🌡️ Warna dan suhu",
          body: "Warna sesuatu bintang menunjukkan suhu permukaannya. Bintang merah adalah yang paling sejuk, manakala bintang biru adalah yang paling panas.",
        },
        {
          title: "📏 Saiz",
          body: "Bintang yang bersaiz sangat besar disebut bintang super raksasa, bintang yang besar disebut raksasa, dan bintang yang sangat kecil disebut bintang kerdil.",
        },
        {
          title: "✨ Kecerahan dan jarak",
          body: "Kecerahan sesuatu bintang yang dicerap bergantung pada saiz, jarak dari Bumi dan suhu permukaan bintang tersebut. Bintang yang paling cerah di langit ialah Sirius dan Rigel.",
        },
      ],
      phSlider: {
        title: "🌈 Skala warna dan suhu bintang",
        instruction: "Seret untuk melihat hubungan antara warna bintang dengan suhu permukaannya.",
        gradient: STAR_GRADIENT,
        unitLabel: "",
        ariaLabel: "Skala warna dan suhu bintang",
        tickLabels: ["Merah", "Jingga", "Kuning", "Kuning-putih", "Putih", "Biru-putih", "Biru"],
        initialValue: 0,
        scale: [
          { value: 0, name: "Merah", description: "Kurang daripada 3 500 K — bintang yang paling sejuk." },
          { value: 1, name: "Jingga", description: "3 500 – 5 000 K." },
          { value: 2, name: "Kuning", description: "5 000 – 6 000 K." },
          { value: 3, name: "Kuning-putih", description: "6 000 – 7 500 K." },
          { value: 4, name: "Putih", description: "7 500 – 11 000 K." },
          { value: 5, name: "Biru-putih", description: "11 000 – 25 000 K." },
          { value: 6, name: "Biru", description: "Melebihi 25 000 K — bintang yang paling panas." },
        ],
      },
      starSizeCompare: {
        title: "⭕ Saiz bintang secara perbandingan",
        sizes: [
          { id: "super", label: "Super raksasa", relative: 1, note: "Bintang yang bersaiz sangat besar." },
          { id: "raksasa", label: "Raksasa", relative: 0.5, note: "Bintang yang bersaiz besar." },
          { id: "kerdil", label: "Kerdil", relative: 0.16, note: "Bintang yang bersaiz sangat kecil." },
        ],
        caption: "Gambar tidak mengikut skala",
        hint: "Perhatikan bahawa kerdil di sini ialah kategori saiz. Kerdil putih pula ialah peringkat akhir dalam kitar hidup bintang bersaiz sederhana.",
      },
      checks: [
        {
          question: "Sebuah bintang kelihatan biru dan sebuah lagi kelihatan merah. Bintang yang manakah lebih panas?",
          hint: "Bintang biru. Bintang biru melebihi 25 000 K manakala bintang merah kurang daripada 3 500 K.",
        },
        {
          question: "Apakah tiga faktor yang menentukan kecerahan sesuatu bintang yang dicerap dari Bumi?",
          hint: "Saiz bintang, jarak bintang itu dari Bumi, dan suhu permukaannya.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menyatakan maksud galaksi dan menamakan tiga jenis galaksi beserta contohnya.",
    "Saya boleh menyatakan kedudukan sistem suria di dalam galaksi Bima Sakti.",
    "Saya boleh menyusun Bumi, sistem suria, galaksi Bima Sakti dan alam semesta mengikut urutan kandungan.",
    "Saya boleh menerangkan bagaimana bintang dilahirkan daripada nebula.",
    "Saya boleh membezakan laluan kitar hidup bintang bersaiz sederhana, bintang besar dan bintang super besar.",
    "Saya boleh mengelaskan bintang berdasarkan suhu, saiz, jarak, warna dan kecerahan.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Matahari ialah bintang terbesar dan paling cerah di alam semesta.",
      answer: false,
      explanation: "Matahari hanya kelihatan begitu kerana ia jauh lebih hampir dengan Bumi. Kecerahan bintang yang dicerap bergantung pada saiz, jarak dari Bumi dan suhu permukaannya.",
    },
    {
      type: "multiple-choice",
      question: "Bintang terbentuk daripada apa?",
      options: ["Asteroid", "Nebula", "Lohong hitam", "Komet"],
      answerIndex: 1,
      explanation: "Nebula ialah awan besar yang terdiri daripada debu dan gas-gas seperti hidrogen dan helium. Graviti memampatkannya sehingga sebuah bintang dilahirkan.",
    },
    {
      type: "multiple-choice",
      question: "Bintang bersaiz sederhana seperti Matahari akan berakhir sebagai apa?",
      options: ["Lohong hitam", "Bintang neutron", "Kerdil putih", "Supernova"],
      answerIndex: 2,
      explanation: "Bintang bersaiz sederhana menjadi raksasa merah, dan kerana raksasa merah itu tidak begitu besar, ia berakhir sebagai kerdil putih. Laluan ini tidak melalui supernova.",
    },
  ],
};
