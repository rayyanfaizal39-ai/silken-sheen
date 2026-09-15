import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch13-meteoroid-asteroid-komet.png";
import { SCIENCE_F2_CH13_IMAGES } from "../visual-assets";

/**
 * Bab 13 — Meteoroid, Asteroid dan Komet (BM).
 *
 * Satu Standard Kandungan, 13.1, diajar sebagai pelajaran berasingan supaya
 * ketiga-tiga objek tidak bercampur dalam satu halaman panjang. Setiap seksyen
 * kekal bernombor 13.1.
 *
 * Mirrors interactive-dlp.ts part for part; only the words differ.
 */
export const scienceF2C13InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 13,
  blogHighlight: {
    title: "Blog Sains — Apabila Komet Menghentam Musytari",
    body: "Pada tahun 1994, kepingan **Komet Shoemaker-Levy 9** menghentam Musytari — perlanggaran langsung pertama antara komet dengan objek lain dalam sistem suria yang pernah direkodkan.",
    imagePath: chapterImage,
    imageAlt: "Ilustrasi asteroid dan sebuah komet yang terang bergerak pantas di angkasa lepas",
  },
  keywords: [
    "Meteoroid",
    "Meteor",
    "Meteorit",
    "Hujan meteor",
    "Asteroid",
    "Jalur asteroid",
    "Komet",
    "Jalur Kuiper",
    "Awan Oort",
  ],
  sections: [
    {
      number: "13.1",
      title: "Objek Lain dalam Sistem Suria",
      conceptQuestion: "Apakah Meteoroid, Asteroid dan Komet?",
      intro:
        "Selain galaksi, bintang dan planet, sistem suria juga mengandungi objek-objek yang lebih kecil. Kenali tiga objek yang akan anda pelajari dalam bab ini — setiap satu mempunyai pelajarannya sendiri selepas ini.",
      cards: [
        {
          title: "🪨 Meteoroid",
          body: "Serpihan kecil batu dan logam yang bergerak di angkasa lepas.",
        },
        {
          title: "🪐 Asteroid",
          body: "Jasad berbatu dan berlogam yang besar dan beredar mengelilingi Matahari mengikut orbitnya sendiri.",
        },
        {
          title: "☄️ Komet",
          body: "Jasad kecil yang terdiri daripada ais, gas, debu beku dan bahan berbatu yang beredar mengelilingi Matahari.",
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Meteoroid, Meteor dan Meteorit",
      conceptQuestion: "Apakah Meteoroid?",
      intro:
        "**Meteoroid** ialah serpihan kecil batu dan logam yang bergerak di angkasa lepas. Namanya berubah semasa ia bergerak menuju ke Bumi.",
      lessonFlow: [
        {
          kind: "points",
          title: "Ciri-ciri Meteoroid",
          items: [
            "Saiz: kira-kira 10 μm hingga 1 m",
            "Terdiri daripada batu dan logam seperti besi dan nikel",
            "Selalunya berasal daripada serpihan asteroid dan komet",
            "Suhu permukaan di angkasa lepas: kira-kira 0°C",
            "Bergerak pada kelajuan yang berbeza-beza — yang paling laju boleh mencapai kira-kira 42 km s⁻¹",
            "Bergerak secara bebas di angkasa, dipengaruhi oleh daya tarikan graviti planet, bulan dan objek lain di sekelilingnya",
          ],
        },
        {
          kind: "figure",
          figure: "meteoroid-journey",
          title: "Daripada Meteoroid kepada Meteor dan Meteorit",
          instruction: "Tekan setiap peringkat untuk melihat di mana ia berlaku.",
          src: SCIENCE_F2_CH13_IMAGES.meteoroidJourney,
          alt: "Sebuah meteoroid berbatu di angkasa lepas, meteor yang menyala semasa memasuki atmosfera Bumi, dan serpihan meteorit di dalam lekuk kecil di permukaan Bumi",
          concepts: [
            {
              id: "meteoroid",
              label: "Meteoroid",
              spotlightCaption: "Di angkasa lepas",
              note: "Meteoroid ialah serpihan batu dan logam yang bergerak di angkasa.",
            },
            {
              id: "meteor",
              label: "Meteor",
              spotlightCaption: "Memasuki atmosfera",
              note: "Apabila meteoroid memasuki atmosfera Bumi, ia menjadi meteor. Interaksi dengan atmosfera menghasilkan pemanasan yang sangat tinggi dan coretan cahaya.",
            },
            {
              id: "meteorite",
              label: "Meteorit",
              spotlightCaption: "Sampai ke permukaan",
              note: "Jika sebahagian meteor terselamat dalam perjalanannya melalui atmosfera dan sampai ke permukaan Bumi, ia disebut meteorit.",
            },
          ],
        },
        {
          kind: "branchFlow",
          title: "Dua Kemungkinan Pengakhiran",
          nodes: [
            { label: "Meteoroid", where: "Di angkasa lepas" },
            { label: "Meteor", where: "Di atmosfera Bumi" },
          ],
          orLabel: "atau",
          endings: [
            {
              id: "burns-up",
              label: "Terbakar",
              note: "Kebiasaannya, meteor akan habis terbakar sebelum sampai ke Bumi.",
            },
            {
              id: "survives",
              label: "Terselamat",
              note: "Sebahagiannya sampai ke permukaan Bumi.",
              result: { label: "Meteorit", where: "Di permukaan Bumi" },
            },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          body: "Objek yang sama **menukar nama mengikut lokasinya**: meteoroid di angkasa lepas, meteor di atmosfera Bumi, dan meteorit jika sebahagiannya sampai ke permukaan Bumi.",
        },
        {
          kind: "meteorShower",
          title: "Hujan Meteor",
          body: "Hujan meteor berlaku apabila **banyak meteor** memasuki atmosfera Bumi pada masa yang hampir sama.",
          note: "Hujan meteor (juga dikenali sebagai pancuran meteor) bukan satu peringkat dalam perjalanan sebuah meteoroid — ia ialah banyak meteor berasingan yang kelihatan bersama-sama.",
          figureLabel:
            "Banyak coretan meteor yang menyala memasuki atmosfera Bumi pada masa yang hampir sama",
          atmosphereLabel: "Atmosfera Bumi",
          surfaceLabel: "Permukaan Bumi",
        },
        {
          kind: "blog",
          badge: "Blog Sains",
          title: "Meteorit Hoba",
          src: SCIENCE_F2_CH13_IMAGES.hobaMeteorite,
          alt: "Meteorit Hoba yang besar, leper dan berwarna perang gelap terletak di atas tanah kering, dengan pokok dan gunung di belakangnya",
          points: [
            "Direkodkan sebagai meteorit terbesar yang diketahui di dunia",
            "Ditemui berhampiran Grootfontein, Namibia",
            "Dijumpai pada tahun 1920",
            "Dipercayai sampai ke Bumi kira-kira 80,000 tahun yang lalu",
            "Luar biasanya, tiada kawah besar di sekelilingnya",
            "Bentuknya yang agak leper mungkin menyumbang kepada kelajuan hentaman yang lebih rendah",
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Asteroid",
      conceptQuestion: "Apakah Asteroid?",
      intro:
        "**Asteroid** ialah jasad berbatu dan berlogam yang besar dan beredar mengelilingi Matahari mengikut orbitnya sendiri.",
      lessonFlow: [
        {
          kind: "points",
          title: "Ciri-ciri Asteroid",
          items: [
            "Saiz: kira-kira 1 m hingga 1,000 km",
            "Terdiri terutamanya daripada batu dan logam seperti besi dan nikel",
            "Suhu permukaan yang sejuk: kira-kira −73°C",
            "Kelajuan purata mengelilingi Matahari: kira-kira 25 km s⁻¹",
            "Beredar mengelilingi Matahari mengikut orbitnya sendiri",
            "Kebanyakan asteroid berada di jalur asteroid, di antara orbit Marikh dengan Musytari",
            "Contoh asteroid besar termasuk Ceres, Pallas, Juno dan Vesta",
            "Asteroid juga dikenali sebagai planet kecil",
          ],
        },
        {
          kind: "asteroidBelt",
          title: "Jalur Asteroid",
          instruction: "Tekan Marikh, jalur asteroid atau Musytari.",
          figureLabel: "Jalur asteroid di antara orbit Marikh dengan Musytari",
          sunLabel: "Matahari",
          earthLabel: "Bumi",
          items: [
            {
              id: "mars",
              label: "Marikh",
              note: "Marikh ialah planet keempat dari Matahari. Jalur asteroid bermula di luar orbitnya.",
            },
            {
              id: "belt",
              label: "Jalur asteroid",
              note: "Kebanyakan asteroid berada di sini, dalam jalur di antara orbit Marikh dengan Musytari. Asteroid bergerak mengelilingi Matahari pada kelajuan purata 25 km s⁻¹.",
            },
            {
              id: "jupiter",
              label: "Musytari",
              note: "Musytari ialah planet terbesar. Orbitnya terletak di luar jalur asteroid.",
            },
          ],
          scaleNote: "Rajah tidak mengikut skala sebenar.",
        },
        {
          kind: "crossingOrbits",
          title: "Orbit Asteroid yang Sampai ke Bumi: Apollo, Amor dan Aten",
          explanation:
            "Apollo, Amor dan Aten ialah contoh orbit asteroid di luar jalur asteroid. Sesetengah orbit asteroid boleh menghampiri atau bersilang dengan orbit Bumi.",
          figureLabel: "Apollo, Amor dan Aten berbanding orbit Bumi mengelilingi Matahari",
          sunLabel: "Matahari",
          earthLabel: "Bumi",
          earthOrbitLabel: "Orbit Bumi",
          orbits: [
            { id: "apollo", label: "Apollo" },
            { id: "amor", label: "Amor" },
            { id: "aten", label: "Aten" },
          ],
          scaleNote: "Rajah tidak mengikut skala sebenar.",
        },
        {
          kind: "heading",
          title: "Apabila Asteroid Berlanggar dengan Bumi",
          body: "Sesetengah orbit asteroid di luar jalur asteroid boleh melalui berhampiran atau bersilang dengan orbit Bumi. **Perlanggaran boleh berlaku apabila laluan Bumi dan asteroid bertemu**. Hentaman asteroid yang besar boleh memberi kesan yang teruk kepada hidupan dan permukaan Bumi.",
        },
        {
          kind: "figure",
          figure: "impact-crater",
          title: "Kesan Hentaman",
          instruction: "Tekan setiap bahagian kawah.",
          src: SCIENCE_F2_CH13_IMAGES.impactCrater,
          alt: "Kawah hentaman besar berbentuk mangkuk di kawasan padang rumput, dengan keratan rentas lapisan batuan yang melengkung dan retak di bawahnya",
          caption: "Kawah yang tertinggal selepas hentaman — bukan asteroid itu sendiri.",
          concepts: [
            {
              id: "crater",
              label: "Kawah Hentaman",
              spotlightCaption: "Di permukaan Bumi",
              note: "Hentaman yang besar boleh membentuk kawah di permukaan Bumi.",
            },
          ],
        },
        {
          kind: "contextCards",
          title: "Bukti Hentaman Masa Lalu",
          cards: [
            {
              id: "arizona",
              icon: "🏜️",
              title: "Kawah Arizona",
              points: [
                "Terbentuk akibat hentaman meteorit",
                "Kira-kira 50,000 tahun yang lalu",
                "Diameter kira-kira 1.2 km",
              ],
            },
            {
              id: "dinosaurs",
              icon: "🦕",
              title: "Teori Kepupusan Dinosaur",
              body: "Satu penjelasan saintifik mencadangkan bahawa hentaman asteroid yang sangat besar menyumbang kepada kepupusan dinosaur. Asteroid dalam penjelasan ini dianggarkan bersaiz kira-kira 10 km.",
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Komet",
      conceptQuestion: "Apakah Komet?",
      intro:
        "**Komet** ialah jasad kecil yang terdiri daripada ais, gas, debu beku dan bahan berbatu yang beredar mengelilingi Matahari.",
      lessonFlow: [
        {
          kind: "points",
          title: "Ciri-ciri Komet",
          items: [
            "Terdiri daripada dua bahagian utama: kepala dan ekor",
            "Saiz kepala boleh mencapai kira-kira 250,000 km",
            "Panjang ekor boleh mencapai kira-kira 150,000,000 km",
            "Mengandungi air dan gas yang membeku menjadi ais, debu serta zarah berbatu",
            "Beredar mengelilingi Matahari mengikut orbitnya sendiri yang berbentuk elips",
            "Kelajuan purata antara kira-kira 10 km s⁻¹ hingga 70 km s⁻¹",
          ],
        },
        {
          kind: "figure",
          figure: "comet-anatomy",
          title: "Bahagian-bahagian Komet",
          instruction: "Tekan setiap bahagian komet.",
          src: SCIENCE_F2_CH13_IMAGES.cometAnatomy,
          alt: "Matahari di sebelah kiri memancarkan anak panah angin suria ke arah sebuah komet; nukleus berbatu komet berada di dalam koma yang terang, dan dua ekor panjang menghala ke kanan, menjauhi Matahari",
          concepts: [
            {
              id: "head",
              label: "Kepala",
              spotlightCaption: "Kepala terang",
              note: "Kepala mengandungi bahan beku, gas, debu dan zarah berbatu.",
            },
            {
              id: "tail",
              label: "Ekor",
              spotlightCaption: "Dua ekor",
              note: "Apabila komet menghampiri Matahari, pemanasan menyebabkannya membentuk ekor yang panjang.",
            },
            {
              id: "solar-wind",
              label: "Angin Suria",
              spotlightCaption: "Dari Matahari",
              note: "Ekor sentiasa menghala menjauhi Matahari disebabkan angin suria dari Matahari.",
            },
          ],
        },
        {
          kind: "cometOrigin",
          title: "Dari Manakah Komet Berasal?",
          intro:
            "Kebanyakan komet berasal dari dua kawasan yang sangat jauh: **Jalur Kuiper** dan **Awan Oort**.",
          instruction: "Tekan setiap kawasan.",
          figureLabel:
            "Jalur Kuiper di luar orbit Neptun, dan Awan Oort yang mengelilingi seluruh sistem suria",
          sunLabel: "Matahari",
          regions: [
            {
              id: "kuiper",
              label: "Jalur Kuiper",
              note: "Jalur jasad berais yang terletak di luar orbit Neptun, planet yang paling jauh.",
            },
            {
              id: "oort",
              label: "Awan Oort",
              note: "Awan jasad berais yang sangat besar dan sangat jauh, mengelilingi seluruh sistem suria seperti satu cengkerang.",
            },
          ],
          scaleNote: "Rajah tidak mengikut skala sebenar.",
        },
        {
          kind: "cometOrbit",
          title: "Bagaimana Komet Bergerak Mengelilingi Matahari",
          instruction: "Tekan satu kedudukan untuk melihat perubahan komet.",
          figureLabel:
            "Komet pada orbit elips mengelilingi Matahari, dengan ekor sentiasa menjauhi Matahari",
          positionLabel: "Kedudukan",
          sunLabel: "Matahari",
          tailLabel: "Ekor",
          stages: [
            {
              label: "Jauh dari Matahari",
              body: "Jauh dari Matahari, komet lebih sejuk dan hanya menunjukkan sedikit ekor yang kelihatan.",
            },
            {
              label: "Berhampiran Matahari",
              body: "Apabila komet menghampiri Matahari, ia bergerak lebih laju, menjadi panas dan membentuk ekor yang lebih panjang.",
            },
            {
              label: "Bergerak menjauhi Matahari",
              body: "Apabila komet bergerak menjauhi Matahari, aktivitinya semakin berkurang.",
            },
          ],
          tailRule:
            "Ekor komet sentiasa dalam keadaan menjauhi Matahari disebabkan tiupan angin suria dari Matahari — ekor itu bukan sekadar mengekori komet dari belakang.",
          scaleNote: "Rajah tidak mengikut skala sebenar.",
        },
        {
          kind: "heading",
          title: "Bolehkah Komet Berlanggar dengan Bumi?",
          body: "Daya tarikan graviti planet-planet luar boleh mengganggu orbit sesebuah komet. Komet yang terkeluar daripada orbit asalnya boleh menghampiri — malah berlanggar dengan — Bumi pada kelajuan yang tinggi.",
        },
        {
          kind: "contextCards",
          cards: [
            {
              id: "halley",
              icon: "🔭",
              title: "Komet Halley",
              points: [
                "Kali terakhir dilihat melintasi Bumi pada tahun 1986",
                "Dijangka melintasi Bumi semula pada tahun 2061",
              ],
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Melindungi Bumi daripada Hentaman Asteroid",
      conceptQuestion: "Bagaimanakah Saintis Melindungi Bumi?",
      intro:
        "Saintis sentiasa memantau langit untuk memastikan orbit asteroid berada pada jarak yang selamat daripada orbit Bumi.",
      lessonFlow: [
        {
          kind: "processFlow",
          title: "Pantau, Amaran, Ubah Haluan",
          instruction: "Tekan setiap langkah mengikut urutan.",
          stepLabel: "Langkah",
          steps: [
            {
              id: "monitor",
              icon: "🔭",
              label: "Pantau",
              note: "Saintis memantau orbit dan kedudukan asteroid.",
            },
            {
              id: "warn",
              icon: "⚠️",
              label: "Amaran",
              note: "Amaran boleh dikeluarkan apabila sesebuah asteroid diramalkan akan menghampiri Bumi secara berbahaya.",
            },
            {
              id: "change-course",
              icon: "↪️",
              label: "Ubah Haluan",
              note: "Asteroid yang berbahaya mungkin diubah lalunya atau dimusnahkan.",
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Meteoroid vs Asteroid vs Komet",
      conceptQuestion: "Apakah Perbezaan Ketiga-tiga Objek Ini?",
      intro:
        "Bandingkan semua yang telah anda pelajari tentang ketiga-tiga objek ini, ciri demi ciri.",
      lessonFlow: [
        {
          kind: "comparisonTable",
          featureLabel: "Ciri",
          columns: [
            { id: "meteoroid", icon: "🪨", label: "Meteoroid" },
            { id: "asteroid", icon: "🪐", label: "Asteroid" },
            { id: "comet", icon: "☄️", label: "Komet" },
          ],
          rows: [
            {
              id: "composition",
              label: "Komposisi",
              values: [
                "Serpihan kecil batu dan logam seperti besi dan nikel",
                "Jasad batu dan logam seperti besi dan nikel yang jauh lebih besar",
                "Ais (air dan gas yang membeku), debu dan bahan berbatu",
              ],
            },
            {
              id: "size",
              label: "Saiz biasa",
              values: [
                "Kira-kira 10 μm hingga 1 m",
                "Kira-kira 1 m hingga 1,000 km",
                "Kepala sehingga kira-kira 250,000 km; ekor sehingga kira-kira 150,000,000 km",
              ],
            },
            {
              id: "movement",
              label: "Pergerakan / Orbit",
              values: [
                "Bergerak secara bebas pada kelajuan berbeza-beza — paling laju kira-kira 42 km s⁻¹",
                "Beredar mengelilingi Matahari pada kelajuan purata 25 km s⁻¹; kebanyakannya di jalur asteroid",
                "Orbit sendiri yang berbentuk elips mengelilingi Matahari; kira-kira 10 km s⁻¹ hingga 70 km s⁻¹, semakin laju apabila menghampiri Matahari",
              ],
            },
            {
              id: "feature",
              label: "Ciri pengenalan utama",
              values: [
                "Menjadi meteor — coretan cahaya — apabila memasuki atmosfera Bumi",
                "Jasad berbatu yang besar, juga dikenali sebagai planet kecil",
                "Membentuk kepala dan ekor panjang yang menghala menjauhi Matahari",
              ],
            },
            {
              id: "effect",
              label: "Kesan yang mungkin terhadap Bumi",
              values: [
                "Kebiasaannya terbakar sebagai meteor; meteorit yang terselamat boleh membentuk kawah",
                "Hentaman yang besar boleh membentuk kawah yang sangat besar dan menjejaskan hidupan dengan teruk",
                "Jika orbitnya terganggu, komet boleh berlanggar dengan Bumi pada kelajuan tinggi",
              ],
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Semak Diri",
      intro: "Uji kefahaman anda tentang meteoroid, asteroid dan komet.",
      checksTitle: "Jawab soalan berikut",
      checks: [
        {
          question:
            "Nicol nampak jalur cahaya terang melintasi langit, kemudian ia lenyap. Apakah yang dilihatnya?",
          hint: "Sebuah meteor — meteoroid yang menjadi panas dan bercahaya semasa melintasi atmosfera Bumi.",
        },
        {
          question: "Antara meteor dan meteorit, yang manakah boleh dijumpai di sebuah muzium?",
          hint: "Meteorit — kebiasaannya meteor habis terbakar sebelum sampai ke Bumi, tetapi ada juga yang dapat sampai. Meteor yang sampai ke Bumi itulah yang disebut meteorit, dan hanya meteorit boleh dipamerkan di muzium.",
        },
        {
          question: "Adakah hujan meteor salah satu peringkat dalam perjalanan sebuah meteoroid?",
          hint: "Tidak. Hujan meteor ialah banyak meteor yang memasuki atmosfera Bumi pada masa yang hampir sama. Sebuah meteoroid menjadi meteor, kemudian sama ada terbakar atau sampai ke permukaan sebagai meteorit.",
        },
        {
          question: "Di manakah kebanyakan asteroid berada?",
          hint: "Di jalur asteroid, di antara orbit Marikh dengan Musytari.",
        },
        {
          question:
            "Antara orbit Apollo, Amor dan Aten, yang manakah menghampiri orbit Bumi tanpa bersilang dengannya?",
          hint: "Amor. Orbitnya menghampiri orbit Bumi dari luar, manakala orbit Apollo dan Aten kedua-duanya bersilang dengan orbit Bumi.",
        },
        {
          question: "Sebuah komet sedang bergerak menjauhi Matahari. Ke manakah ekornya menghala?",
          hint: "Masih menjauhi Matahari. Angin suria menolak bahan ekor menjauhi Matahari, jadi semasa komet bergerak keluar, ekornya berada di hadapan komet.",
        },
        {
          question: "Namakan dua kawasan jauh tempat kebanyakan komet berasal.",
          hint: "Jalur Kuiper dan Awan Oort.",
        },
        {
          question: "Mengapakah saintis sentiasa menjejak asteroid yang berhampiran dengan Bumi?",
          hint: "Untuk menyemak sama ada orbitnya boleh menjadi terlalu hampir dengan Bumi, supaya amaran dapat dikeluarkan dan laluan objek itu diubah tepat pada masanya jika perlu.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menyatakan ciri-ciri meteoroid, asteroid dan komet.",
    "Saya boleh membincangkan pergerakan dan kesannya terhadap Bumi berdasarkan data.",
    "Saya boleh menjana idea untuk mengurangkan risiko perlanggaran dengan Bumi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Ekor komet sentiasa menghala ke arah Matahari.",
      answer: false,
      explanation:
        "Ia sentiasa menghala menjauhi Matahari — angin suria menolak gas dan debu yang terbebas ke arah luar daripada Matahari.",
    },
    {
      type: "multiple-choice",
      question: "Di manakah kebanyakan asteroid dalam sistem suria kita berada?",
      options: [
        "Antara Bumi dan Marikh",
        "Antara Marikh dan Musytari",
        "Melangkaui Neptun",
        "Antara Utarid dan Zuhrah",
      ],
      answerIndex: 1,
      explanation:
        "Jalur asteroid terletak antara Marikh dan Musytari, menempatkan kebanyakan asteroid dalam sistem suria.",
    },
  ],
};
