import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch10-gelombang-bunyi.png";

export const scienceF2C10InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 10,
  blogHighlight: {
    title: "Blog Sains — Kilat dan Guruh",
    body: "Kilat dan guruh sebenarnya berlaku pada saat yang sama — tetapi cahaya sampai ke mata anda jauh lebih pantas berbanding bunyi sampai ke telinga anda, itulah sebabnya anda sentiasa melihat kilat dahulu sebelum mendengar dentuman guruh.",
    imagePath: chapterImage,
  },
  keywords: [
    "Getaran",
    "Medium",
    "Gelombang bunyi",
    "Amplitud",
    "Frekuensi",
    "Kenyaringan",
    "Kelangsingan",
    "Gema",
    "Kesan Doppler",
    "Ultrabunyi",
    "Had pendengaran",
    "Sonar",
  ],
  sections: [
    {
      number: "10.1",
      title: "Penghasilan dan Perambatan Bunyi",
      intro:
        "Bunyi ialah satu bentuk tenaga yang dihasilkan oleh getaran. Apabila sesuatu objek bergetar, zarah-zarah di sekelilingnya turut bergetar dan berlanggar dengan zarah bersebelahan. Getaran ini dipindahkan dari satu zarah ke zarah lain dalam bentuk gelombang sehingga sampai ke telinga pendengar. Kerana gelombang bunyi perlu dipindahkan melalui zarah, bunyi memerlukan medium untuk merambat dan tidak dapat merambat melalui vakum.",
      cards: [
        {
          title: "🗣️ Peti suara",
          body: "Sentuh bahagian luar tekak anda semasa bercakap — anda dapat merasai peti suara bergetar. Getaran itulah yang menghasilkan suara anda.",
        },
        {
          title: "🎸 Tali alat muzik",
          body: "Tali gitar yang dipetik bergetar ke atas dan ke bawah, lalu menggetarkan udara di sekelilingnya.",
        },
        {
          title: "🥁 Membran",
          body: "Permukaan gendang yang dipukul bergetar dengan pantas dan menghasilkan bunyi.",
        },
        {
          title: "🔔 Loceng",
          body: "Permukaan logam loceng bergetar apabila dipukul, lalu menggetarkan zarah udara berhampirannya.",
        },
      ],
      accordions: [
        {
          title: "Demonstrasi balang vakum",
          body: "Sebuah jam loceng yang sedang berbunyi diletakkan di dalam balang kaca, kemudian udara di dalam balang disedut keluar dengan pam vakum. Semakin banyak udara dikeluarkan, semakin perlahan bunyi loceng kedengaran walaupun jam itu masih bergetar. Ini menunjukkan bunyi memerlukan medium untuk merambat.",
        },
        {
          title: "Mengapa tiada bunyi di angkasa lepas",
          body: "Angkasa lepas ialah vakum — tiada zarah untuk memindahkan getaran. Itulah sebabnya angkasawan berkomunikasi menggunakan gelombang radio, bukan dengan bercakap terus antara satu sama lain.",
        },
      ],
      checks: [
        {
          question: "Bolehkah angkasawan mendengar suara satu sama lain secara terus di angkasa lepas?",
          hint: "Tidak. Angkasa lepas ialah vakum dan tiada zarah untuk memindahkan getaran, jadi gelombang bunyi tidak dapat merambat. Mereka menggunakan gelombang radio.",
        },
        {
          question: "Apakah yang mesti berlaku pada sesuatu objek sebelum ia boleh menghasilkan bunyi?",
          hint: "Objek itu mesti bergetar. Tanpa getaran, tiada gelombang bunyi dihasilkan.",
        },
      ],
    },
    {
      number: "10.1",
      title: "Pantulan, Penyerapan dan Kelajuan Bunyi",
      intro:
        "Apabila gelombang bunyi terkena permukaan sesuatu objek, sebahagiannya dipantulkan dan sebahagiannya diserap. Jumlah bunyi yang dipantul atau diserap bergantung pada jenis permukaan itu. Selain itu, gelombang bunyi merambat pada kelajuan yang berbeza di dalam medium yang berbeza, bergantung pada seberapa rapat zarah-zarah medium itu tersusun.",
      tabs: [
        {
          title: "Permukaan keras & licin",
          body: "Permukaan yang keras dan licin memantulkan bunyi dengan baik. Contohnya jubin marmar dan dinding kosong.",
        },
        {
          title: "Permukaan lembut & kasar",
          body: "Permukaan yang lembut dan kasar menyerap bunyi dengan baik. Contohnya permaidani dan papan gabus. Itulah sebabnya dinding pawagam dilapisi papan lembut yang nipis — untuk menyerap bunyi supaya dialog dan muzik kekal jelas.",
        },
      ],
      soundMedia: {
        title: "🔊 Kelajuan bunyi dalam tiga keadaan jirim",
        instruction: "Tekan setiap keadaan jirim untuk melihat susunan zarah dan kelajuan perambatan bunyi.",
        states: [
          {
            id: "solid",
            label: "Pepejal",
            speedRank: 1,
            speedLabel: "Paling cepat",
            note: "Zarah-zarah pepejal tersusun sangat rapat. Apabila zarah di satu hujung mula bergetar, zarah bersebelahan turut bergetar dengan pantas, jadi bunyi dipindahkan dengan cepat.",
          },
          {
            id: "liquid",
            label: "Cecair",
            speedRank: 2,
            speedLabel: "Lebih perlahan",
            note: "Susunan zarah dalam cecair kurang rapat berbanding pepejal, jadi getaran bunyi dipindahkan dengan lebih perlahan.",
          },
          {
            id: "gas",
            label: "Gas",
            speedRank: 3,
            speedLabel: "Paling perlahan",
            note: "Zarah-zarah gas berjauhan antara satu sama lain. Jarak ini melambatkan pemindahan getaran, jadi bunyi merambat paling perlahan dalam gas.",
          },
        ],
        caption: "Semakin rapat susunan zarah, semakin cepat getaran dipindahkan.",
        hint: "Susunan kelajuan: pepejal > cecair > gas.",
      },
      accordions: [
        {
          title: "Demonstrasi bekas plastik — apa yang sebenarnya dibandingkan",
          body: "Dalam demonstrasi ini, telinga dilekapkan pada bekas plastik yang berisi udara, air dan tepung secara berasingan sambil sebuah jam loceng dibunyikan. Yang dibandingkan ialah kekuatan bunyi yang didengar melalui setiap bekas. Perhatikan bahawa demonstrasi ini membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi. Kelajuan bunyi dalam medium yang berbeza dipelajari secara berasingan melalui susunan zarah seperti di atas.",
        },
      ],
      checks: [
        {
          question: "Mengapakah dinding pawagam dilapisi papan lembut yang nipis?",
          hint: "Papan lembut menyerap bunyi dan bukannya memantulkannya, jadi bunyi pantulan yang tidak diingini dapat dikurangkan dan dialog kekal jelas.",
        },
        {
          question: "Dalam medium manakah gelombang bunyi merambat paling cepat, dan mengapa?",
          hint: "Dalam pepejal. Zarah-zarahnya tersusun paling rapat, jadi getaran dipindahkan dari satu zarah ke zarah bersebelahan dengan paling pantas.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Frekuensi, Amplitud dan O.S.K.",
      intro:
        "Frekuensi ialah bilangan getaran lengkap dalam masa satu saat, dan diukur dalam unit hertz (Hz). Amplitud pula ialah sesaran maksimum gelombang daripada kedudukan keseimbangan. Kedua-dua ciri ini boleh dilihat pada skrin Osiloskop Sinar Katod (O.S.K.) apabila penjana isyarat audio disambungkan kepada pembesar suara dan O.S.K.",
      cards: [
        {
          title: "📐 Amplitud",
          body: "Sesaran maksimum gelombang daripada kedudukan keseimbangan — iaitu ketinggian puncak gelombang diukur dari garis tengah.",
        },
        {
          title: "🔁 Frekuensi",
          body: "Bilangan getaran lengkap dalam masa satu saat. Unitnya ialah hertz (Hz).",
        },
      ],
      tabs: [
        {
          title: "Membaca amplitud pada O.S.K.",
          body: "Semakin tinggi gelombang pada skrin O.S.K., semakin besar amplitud getaran, dan semakin nyaring bunyi yang dihasilkan oleh pembesar suara.",
        },
        {
          title: "Membaca frekuensi pada O.S.K.",
          body: "Semakin banyak gelombang lengkap yang muncul dalam selang masa yang sama pada skrin O.S.K., semakin tinggi frekuensi, dan semakin tinggi kelangsingan bunyi.",
        },
      ],
      waveVisualizer: {
        title: "🎛️ Paparan O.S.K. — cuba sendiri",
        instruction:
          "Seret peluncur amplitud dan frekuensi untuk melihat bentuk gelombang pada paparan O.S.K. berubah. Ubah satu peluncur sahaja pada satu masa untuk melihat kesannya dengan jelas.",
      },
      checks: [
        {
          question: "Apakah maksud frekuensi, dan apakah unitnya?",
          hint: "Frekuensi ialah bilangan getaran lengkap dalam masa satu saat. Unitnya ialah hertz (Hz).",
        },
        {
          question: "Pada skrin O.S.K., apakah yang ditunjukkan oleh ketinggian gelombang?",
          hint: "Ketinggian gelombang menunjukkan amplitud getaran, iaitu sesaran maksimum daripada kedudukan keseimbangan.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Kenyaringan dan Kelangsingan Bunyi",
      intro:
        "Telinga kita dapat membezakan bunyi kerana setiap bunyi mempunyai kenyaringan dan kelangsingan yang berbeza. Kenyaringan bunyi bergantung pada amplitud gelombang bunyi, manakala kelangsingan bunyi bergantung pada frekuensi gelombang bunyi.",
      cards: [
        {
          title: "🔊 Kenyaringan bergantung pada amplitud",
          body: "Semakin besar amplitud getaran, semakin nyaring bunyi yang dihasilkan. Semakin kecil amplitud, semakin perlahan bunyi itu.",
        },
        {
          title: "🎵 Kelangsingan bergantung pada frekuensi",
          body: "Semakin tinggi frekuensi getaran, semakin tinggi kelangsingan bunyi. Semakin rendah frekuensi, semakin rendah kelangsingan.",
        },
      ],
      tabs: [
        {
          title: "Frekuensi rendah",
          body: "Bunyi lembu melenguh ialah bunyi berfrekuensi rendah, jadi kelangsingannya rendah.",
        },
        {
          title: "Frekuensi tinggi",
          body: "Bunyi tikus mendecit ialah bunyi berfrekuensi tinggi, jadi kelangsingannya tinggi.",
        },
      ],
      checks: [
        {
          question: "Seorang pemuzik memainkan nada yang sangat perlahan. Ciri manakah yang berubah?",
          hint: "Kenyaringan. Nada yang lebih perlahan bermaksud amplitud getaran yang lebih kecil — kelangsingan tidak berubah.",
        },
        {
          question: "Bunyi tikus mendecit mempunyai kelangsingan yang lebih tinggi daripada lembu melenguh. Apakah yang menyebabkannya?",
          hint: "Getaran yang menghasilkan bunyi tikus mempunyai frekuensi yang lebih tinggi, dan kelangsingan bergantung pada frekuensi.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Bunyi daripada Alat Muzik",
      intro:
        "Alat muzik seperti piano, rekorder, gendang, drum dan gitar menghasilkan bunyi melalui getaran. Dengan mengubah cara alat itu dimainkan, pemuzik boleh mengubah kenyaringan dan kelangsingan bunyi secara berasingan. Perhatikan bahawa kedua-dua ciri ini dikawal oleh perkara yang berbeza.",
      tabs: [
        {
          title: "Gitar — dipetik lebih kuat",
          body: "Memetik tali gitar dengan lebih kuat menghasilkan getaran beramplitud lebih besar, jadi bunyi menjadi lebih nyaring. Kelangsingan bunyi tidak berubah — nada yang dimainkan tetap sama.",
        },
        {
          title: "Gitar — tali diketatkan",
          body: "Mengetatkan tali gitar menyebabkan tali bergetar pada frekuensi yang lebih tinggi, jadi kelangsingan bunyi menjadi lebih tinggi. Ini berbeza sama sekali daripada memetik lebih kuat.",
        },
        {
          title: "Piano",
          body: "Menekan kekunci piano dengan lebih kuat menghasilkan getaran beramplitud lebih besar, jadi not yang sama kedengaran lebih nyaring.",
        },
        {
          title: "Rekorder, gendang dan drum",
          body: "Meniup rekorder dengan lebih kuat atau memukul gendang dan drum dengan lebih kuat menghasilkan amplitud getaran yang lebih besar, jadi bunyinya lebih nyaring. Saiz dan ketegangan membran drum pula mempengaruhi frekuensi getaran, iaitu kelangsingannya.",
        },
      ],
      checks: [
        {
          question: "Apakah yang berlaku pada bunyi apabila tali gitar dipetik dengan lebih kuat?",
          hint: "Amplitud getaran menjadi lebih besar, jadi bunyi menjadi lebih nyaring. Kelangsingannya tidak berubah.",
        },
        {
          question: "Apakah yang berlaku pada bunyi apabila tali gitar diketatkan?",
          hint: "Tali bergetar pada frekuensi yang lebih tinggi, jadi kelangsingan bunyi menjadi lebih tinggi.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Gema dan Kesan Doppler",
      intro:
        "Pantulan gelombang bunyi menghasilkan fenomena yang boleh kita alami setiap hari. Gema terhasil apabila gelombang bunyi dipantulkan kembali kepada pendengar daripada suatu permukaan yang keras. Kesan Doppler pula berlaku apabila terdapat pergerakan relatif antara sumber bunyi dengan pemerhati.",
      echoDiagram: {
        title: "🔁 Bagaimana gema terhasil",
        sourceLabel: "Pendengar",
        surfaceLabel: "Permukaan keras",
        outgoingLabel: "Bunyi asal",
        reflectedLabel: "Gema",
        places: ["Dewan tertutup", "Bilik kosong", "Gua", "Terowong", "Gaung"],
        caption:
          "Bunyi asal merambat ke permukaan keras, dipantulkan, dan kembali ke telinga pendengar selepas sedikit masa.",
        hint: "Bunyi yang dipantulkan itu menyerupai bunyi asal tetapi mengambil sedikit masa untuk sampai semula ke telinga — itulah gema.",
      },
      dopplerWavefronts: {
        title: "🚑 Kesan Doppler",
        instruction: "Tekan kedudukan pemerhati untuk melihat apa yang didengarinya.",
        observers: [
          {
            id: "ahead",
            label: "Pemerhati di hadapan",
            effect: "higher",
            note: "Ambulans menghampiri pemerhati ini. Muka gelombang di hadapan sumber menjadi lebih rapat, jadi frekuensi yang didengari oleh pemerhati meningkat dan bunyi siren kedengaran lebih tinggi kelangsingannya.",
          },
          {
            id: "behind",
            label: "Pemerhati di belakang",
            effect: "lower",
            note: "Ambulans sudah melepasi pemerhati ini. Muka gelombang di belakang sumber menjadi lebih renggang, jadi frekuensi yang didengari berkurang dan bunyi siren kedengaran lebih rendah kelangsingannya.",
          },
        ],
        sourceLabel: "Ambulans",
        emittedNote:
          "Siren ambulans sebenarnya mengeluarkan bunyi pada frekuensi yang tetap sepanjang masa. Yang berubah hanyalah frekuensi yang diterima oleh pemerhati — inilah sebabnya kesan Doppler disebut perubahan frekuensi ketara. Pemandu ambulans sendiri tidak mendengar sebarang perubahan kerana tiada pergerakan relatif antara pemandu dengan siren.",
        caption:
          "Muka gelombang lebih rapat di hadapan ambulans yang bergerak, dan lebih renggang di belakangnya.",
        hint: "Frekuensi yang didengari meningkat apabila sumber menghampiri pemerhati dan berkurang apabila sumber menjauhinya.",
      },
      checks: [
        {
          question: "Mengapakah gema lebih mudah didengar di dalam bilik kosong berbanding bilik berperabot?",
          hint: "Bilik kosong mempunyai lebih banyak permukaan keras yang memantulkan bunyi. Perabot pula menyerap bunyi, jadi kesan gema berkurang.",
        },
        {
          question: "Adakah siren ambulans benar-benar menukar frekuensinya semasa memandu melepasi anda?",
          hint: "Tidak. Siren mengeluarkan frekuensi yang tetap. Yang berubah ialah frekuensi yang diterima oleh pemerhati akibat pergerakan relatif — iaitu perubahan frekuensi ketara.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Sonar, Sonogram dan Ekolokasi",
      intro:
        "Ultrabunyi ialah gelombang bunyi yang berfrekuensi lebih daripada 20 000 Hz. Ultrabunyi tidak dapat didengar oleh manusia tetapi boleh didengar oleh haiwan seperti kelawar. Pantulan gelombang ultrabunyi digunakan dalam pelbagai sektor kerana bunyi yang dipantulkan itu membawa maklumat tentang objek yang dikenainya.",
      echolocation: {
        title: "📡 Menghantar dan menerima semula",
        instruction: "Tekan setiap aplikasi untuk melihat laluan bunyi yang dihantar dan yang dipantulkan.",
        modes: [
          {
            id: "sonar",
            label: "Sonar",
            medium: "water",
            emitterLabel: "Kapal",
            targetLabel: "Objek / ikan",
            note: "Kapal menghantar gelombang bunyi ke dalam air. Gelombang itu dipantulkan oleh objek di bawah air atau kumpulan ikan, dan pantulan yang diterima semula memberikan maklumat tentang kedudukannya. Sonar digunakan dalam sektor perkapalan dan perikanan.",
          },
          {
            id: "bat",
            label: "Ekolokasi kelawar",
            medium: "air",
            emitterLabel: "Kelawar",
            targetLabel: "Objek",
            note: "Kelawar memancarkan ultrabunyi semasa terbang. Ultrabunyi itu dipantulkan oleh objek di hadapannya dan kembali kepada kelawar, membolehkan kelawar menganggarkan jarak objek itu walaupun dalam keadaan gelap.",
          },
        ],
        outgoingLabel: "Bunyi dihantar",
        returningLabel: "Bunyi dipantulkan",
        caption: "Dalam kedua-dua aplikasi, bunyi mesti dihantar keluar dan diterima semula selepas dipantulkan.",
        hint: "Sonar merambat melalui air; ultrabunyi kelawar merambat melalui udara.",
      },
      cards: [
        {
          title: "🚢 Sektor perkapalan",
          body: "Sonar digunakan untuk mengesan objek di bawah air.",
        },
        {
          title: "🎣 Sektor perikanan",
          body: "Sonar membantu mengesan kumpulan ikan di bawah permukaan laut.",
        },
        {
          title: "🏥 Sektor perubatan",
          body: "Sonogram menggunakan pantulan ultrabunyi untuk menghasilkan imej bahagian dalam badan, contohnya mengimbas keadaan fetus di dalam kandungan.",
        },
      ],
      checks: [
        {
          question: "Apakah yang dimaksudkan dengan ultrabunyi?",
          hint: "Ultrabunyi ialah gelombang bunyi yang berfrekuensi lebih daripada 20 000 Hz, iaitu terlalu tinggi untuk didengar oleh telinga manusia.",
        },
        {
          question: "Bagaimanakah kelawar menganggarkan jarak sesuatu objek dalam gelap?",
          hint: "Kelawar memancarkan ultrabunyi, dan ultrabunyi itu dipantulkan oleh objek dan kembali kepada kelawar. Masa yang diambil oleh pantulan itu memberikan maklumat tentang jarak objek.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Had Pendengaran Manusia dan Haiwan",
      intro:
        "Telinga manusia hanya dapat mengesan bunyi dalam julat frekuensi tertentu. Frekuensi bunyi yang dapat dikesan oleh telinga manusia terhad kepada julat 20 Hz hingga 20 000 Hz. Julat ini semakin berkurang apabila usia meningkat kerana telinga menjadi kurang sensitif terhadap frekuensi bunyi. Haiwan pula mempunyai had pendengarannya yang tersendiri, dan sesetengahnya jauh melebihi julat manusia.",
      hearingRange: {
        title: "📊 Julat pendengaran manusia dan haiwan",
        entries: [
          { id: "human", label: "Manusia", minHz: 20, maxHz: 20000, human: true },
          { id: "bat", label: "Kelawar", minHz: 2000, maxHz: 110000 },
          { id: "dolphin", label: "Lumba-lumba", minHz: 40, maxHz: 100000 },
          { id: "dog", label: "Anjing", minHz: 67, maxHz: 45000 },
          { id: "horse", label: "Kuda", minHz: 55, maxHz: 33500 },
          { id: "elephant", label: "Gajah", minHz: 16, maxHz: 12000 },
        ],
        ultrasoundLabel: "Ultrabunyi (>20 000 Hz)",
        caption: "Skala frekuensi adalah logaritma kerana julat pendengaran merentasi beberapa dekad frekuensi.",
        hint: "Kelawar, lumba-lumba dan anjing boleh mendengar frekuensi yang jauh lebih tinggi daripada manusia, manakala gajah boleh mendengar frekuensi yang lebih rendah daripada had bawah manusia.",
      },
      checks: [
        {
          question: "Apakah julat frekuensi yang dapat didengar oleh telinga manusia?",
          hint: "20 Hz hingga 20 000 Hz. Julat ini semakin berkurang apabila usia meningkat.",
        },
        {
          question: "Mengapakah manusia tidak dapat mendengar ultrabunyi yang digunakan oleh kelawar?",
          hint: "Ultrabunyi berfrekuensi lebih daripada 20 000 Hz, iaitu melebihi had atas pendengaran manusia.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Mengatasi Had Pendengaran Manusia",
      intro:
        "Deria pendengaran manusia yang terhad menyebabkan kita tidak dapat mendengar bunyi yang terlalu lemah atau terlalu jauh. Untuk mengatasi masalah ini, kita menggunakan peralatan khas yang menguatkan atau menyalurkan bunyi supaya bunyi itu cukup kuat untuk didengar.",
      cards: [
        {
          title: "🩺 Stetoskop",
          body: "Stetoskop menyalurkan dan menguatkan bunyi denyutan jantung pesakit terus ke telinga doktor, supaya bunyi yang terlalu lemah itu dapat didengar dengan jelas.",
        },
        {
          title: "👂 Alat bantu pendengaran",
          body: "Alat bantu pendengaran menguatkan bunyi yang memasuki telinga, membantu orang yang mengalami masalah pendengaran mendengar dengan lebih jelas.",
        },
        {
          title: "📢 Pembesar suara",
          body: "Pembesar suara menjadikan suara lebih kuat supaya dapat didengar dari jarak yang jauh.",
        },
      ],
      accordions: [
        {
          title: "Apa yang peranti ini benar-benar lakukan",
          body: "Peranti ini menguatkan atau menyalurkan bunyi supaya bunyi yang terlalu lemah atau terlalu jauh dapat didengar. Peranti ini tidak meluaskan julat frekuensi pendengaran manusia. Julat biologi telinga manusia kekal 20 Hz hingga 20 000 Hz — alat bantu pendengaran tidak membolehkan manusia mendengar ultrabunyi.",
        },
      ],
      checks: [
        {
          question: "Jenis masalah pendengaran yang manakah dibantu oleh stetoskop dan alat bantu pendengaran?",
          hint: "Kedua-duanya membantu apabila bunyi terlalu lemah atau terlalu jauh untuk didengar. Kedua-duanya menguatkan atau menyalurkan bunyi.",
        },
        {
          question: "Bolehkah alat bantu pendengaran membolehkan manusia mendengar ultrabunyi?",
          hint: "Tidak. Peranti ini hanya menguatkan bunyi; ia tidak meluaskan julat frekuensi 20 Hz hingga 20 000 Hz yang dapat dikesan oleh telinga manusia.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan bahawa bunyi dihasilkan oleh getaran dan memerlukan medium untuk merambat.",
    "Saya boleh menerangkan mengapa bunyi tidak dapat merambat melalui vakum.",
    "Saya boleh membandingkan pemantulan dan penyerapan bunyi oleh permukaan yang berbeza.",
    "Saya boleh menyusun kelajuan bunyi dalam pepejal, cecair dan gas serta menerangkan sebabnya.",
    "Saya boleh mentakrifkan frekuensi dan amplitud serta membaca paparan O.S.K.",
    "Saya boleh mengaitkan amplitud dengan kenyaringan dan frekuensi dengan kelangsingan.",
    "Saya boleh menerangkan kesan memetik lebih kuat dan mengetatkan tali gitar secara berasingan.",
    "Saya boleh menerangkan gema dan kesan Doppler dengan contoh.",
    "Saya boleh menerangkan had pendengaran manusia dan haiwan serta cara mengatasi had pendengaran manusia.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Gelombang bunyi boleh merambat melalui vakum.",
      answer: false,
      explanation: "Bunyi memerlukan medium — pepejal, cecair atau gas. Tiada medium, tiada perambatan bunyi.",
    },
    {
      type: "multiple-choice",
      question: "Bunyi tikus mendecit mempunyai kelangsingan yang lebih tinggi daripada lenguhan lembu. Apakah maksudnya?",
      options: [
        "Bunyi tikus mempunyai amplitud yang lebih besar",
        "Bunyi tikus mempunyai frekuensi yang lebih tinggi",
        "Bunyi tikus merambat dengan lebih cepat",
        "Bunyi tikus tidak memerlukan medium",
      ],
      answerIndex: 1,
      explanation: "Kelangsingan bergantung pada frekuensi — bunyi yang lebih tinggi kelangsingannya bergetar dengan lebih pantas.",
    },
    {
      type: "multiple-choice",
      question: "Tali gitar dipetik dengan lebih kuat tanpa mengubah ketegangannya. Apakah yang berlaku?",
      options: [
        "Kelangsingan bunyi meningkat",
        "Frekuensi getaran meningkat",
        "Kenyaringan bunyi meningkat",
        "Bunyi merambat dengan lebih cepat",
      ],
      answerIndex: 2,
      explanation:
        "Memetik lebih kuat menghasilkan amplitud getaran yang lebih besar, jadi bunyi menjadi lebih nyaring. Kelangsingan hanya berubah apabila frekuensi berubah, contohnya apabila tali diketatkan.",
    },
  ],
};
