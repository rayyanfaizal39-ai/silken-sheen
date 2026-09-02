import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch13-meteoroid-asteroid-komet.png";

export const scienceF2C13InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 13,
  blogHighlight: {
    title: "Blog Sains — Meteorit Terbesar di Bumi",
    body: "Meteorit Hoba, ditemui di Namibia pada 1920, ialah meteorit terbesar yang pernah dijumpai — jatuh kira-kira 80,000 tahun lalu. Bentuknya yang leper mungkin melambatkan hentamannya sehingga ia tidak pernah membentuk sebarang kawah.",
    imagePath: chapterImage,
  },
  keywords: ["Meteoroid", "Meteor", "Meteorit", "Asteroid", "Komet", "Lingkaran Asteroid", "Lingkaran Kuiper", "Awan Oort"],
  sections: [
    {
      number: "13.1",
      title: "Meteoroid, Asteroid dan Komet",
      intro:
        "Selain galaksi, bintang dan planet, sistem suria kita turut dipenuhi jasad-jasad kecil lain yang mengembara — meteoroid, asteroid dan komet. Ketiga-tiganya berbeza dari segi saiz, komposisi dan cara pergerakan mereka mengelilingi Matahari.",
      cards: [
        {
          title: "🪨 Meteoroid",
          body: "Sekeping batu dan logam terapung yang bergerak di angkasa lepas, berasal daripada serpihan asteroid dan komet. Bersaiz 10 μm hingga 1 m, diperbuat daripada besi dan nikel, bersuhu permukaan kira-kira 0°C. Yang paling pantas bergerak pada 42 km/s.",
        },
        {
          title: "🪐 Asteroid",
          body: "Jasad logam dan berbatu yang lebih besar — 1 m hingga 1,000 km — yang mengorbit Matahari pada orbitnya sendiri. Sejuk, kira-kira -73°C, bergerak pada purata 25 km/s. Kebanyakannya berada dalam Lingkaran Asteroid antara orbit Marikh dan Musytari.",
          detail: "Asteroid besar seperti Ceres, Pallas, Juno dan Vesta juga dikenali sebagai 'planet kecil'.",
        },
        {
          title: "☄️ Komet",
          body: "Campuran ais, gas dan debu beku yang mempunyai kepala dan ekor yang panjang — ekornya sahaja boleh mencapai 150,000,000 km. Komet mengorbit Matahari pada laluan elips, bergerak pada 10-70 km/s.",
        },
      ],
      accordions: [
        {
          title: "Mengapa ekor komet sentiasa menghala bertentangan Matahari",
          body: "Apabila sesebuah komet menghampiri Matahari, ia memanas dan mula cair, membebaskan gas dan debu. Angin solar — aliran zarah yang sentiasa bertiup keluar daripada Matahari — menolak bahan yang terbebas itu menjadi ekor yang sentiasa menghala bertentangan Matahari, tidak kira arah pergerakan komet itu sendiri.",
        },
        {
          title: "Apabila orbit bersilang dengan orbit Bumi",
          body: "Kebanyakan asteroid kekal selamat dalam Lingkaran Asteroid — tetapi sesetengahnya, seperti dalam kumpulan orbit Apollo, Amor dan Aten, menghampiri atau bersilang dengan orbit Bumi, mewujudkan risiko perlanggaran yang nyata (walaupun jarang). Komet juga boleh terkeluar daripada orbitnya akibat graviti planet gergasi, menghantarnya ke laluan baharu yang berisiko. Ramai saintis mempercayai perlanggaran asteroid bersaiz kira-kira 10 km menyumbang kepada kepupusan dinosaur — bukti dijumpai dalam lapisan batuan di seluruh dunia.",
        },
        {
          title: "Memerhati langit",
          body: "Saintis sentiasa menjejaki asteroid berhampiran Bumi. Jika satu daripadanya menimbulkan risiko sebenar, pilihan termasuk mengubah laluannya atau, dalam senario melampau, memusnahkannya sebelum berlaku hentaman.",
        },
      ],
      meteoroidEntry: {
        title: "☄️ Daripada meteoroid kepada meteorit",
        instruction: "Tekan setiap peringkat untuk melihat di mana ia berlaku.",
        figureLabel: "Peringkat pergerakan meteoroid dari angkasa lepas hingga ke permukaan Bumi",
        spaceLabel: "Angkasa lepas",
        atmosphereLabel: "Atmosfera Bumi",
        groundLabel: "Permukaan Bumi",
        stages: [
          {
            id: "meteoroid",
            label: "Meteoroid",
            body: "Serpihan batu dan logam kecil yang terapung di angkasa lepas. Meteoroid bergerak secara bebas di angkasa — bukan mengikut orbitnya sendiri mengelilingi Matahari seperti asteroid dan komet — serta dipengaruhi oleh daya tarikan graviti planet, bulan dan objek lain di sekelilingnya.",
          },
          {
            id: "meteor",
            label: "Meteor",
            body: "Apabila meteoroid memasuki atmosfera Bumi, meteoroid disebut sebagai meteor. Geseran molekul antara udara dengan meteor menghasilkan haba sehingga terbakar dan terhasil coretan cahaya.",
          },
          {
            id: "pancuran",
            label: "Pancuran meteor",
            body: "Pancuran meteor berlaku apabila meteor memasuki Bumi dengan banyak pada satu masa.",
          },
          {
            id: "meteorit",
            label: "Meteorit",
            body: "Kebiasaannya, meteor akan habis terbakar sebelum sampai ke Bumi. Akan tetapi, ada juga meteor yang dapat sampai ke Bumi. Meteor ini disebut sebagai meteorit. Kawah akan terbentuk akibat hentaman meteorit.",
          },
        ],
      },
      asteroidBelt: {
        title: "🪐 Di mana asteroid berada — dan bila ia boleh sampai ke Bumi",
        instruction: "Tekan untuk bertukar antara lingkaran asteroid dan orbit yang bersilang dengan orbit Bumi.",
        beltFigureLabel: "Lingkaran asteroid di antara orbit Marikh dengan Musytari",
        crossingFigureLabel: "Orbit Apollo, Amor dan Aten di luar lingkaran asteroid, berhampiran atau bersilang dengan orbit Bumi",
        beltToggleLabel: "Lingkaran asteroid",
        crossingToggleLabel: "Orbit yang bersilang",
        sunLabel: "Matahari",
        venusLabel: "Zuhrah",
        earthLabel: "Bumi",
        marsLabel: "Marikh",
        jupiterLabel: "Musytari",
        beltLabel: "Lingkaran asteroid",
        beltBody: "Asteroid membentuk jalur asteroid di antara orbit planet Marikh dengan Musytari. Kebanyakan asteroid berada di dalam lingkaran asteroid dan bergerak dengan kelajuan purata 25 km s⁻¹.",
        crossingBody: "Terdapat juga orbit asteroid yang berada di luar lingkaran asteroid seperti Apollo, Amor dan Aten. Orbit-orbit ini boleh berhampiran atau bersilang dengan orbit Bumi. Perlanggaran boleh berlaku antara asteroid dengan Bumi pada titik persilangan atau lintasan berhampiran orbit Bumi dan orbit asteroid.",
        crossingOrbits: [
          { id: "apollo", label: "Apollo", rx: 96, ry: 44, offsetX: -30, rotate: 14 },
          { id: "amor", label: "Amor", rx: 88, ry: 50, offsetX: -20, rotate: -22 },
          { id: "aten", label: "Aten", rx: 46, ry: 27, offsetX: -12, rotate: 6 },
        ],
        scaleNote: "Rajah tidak mengikut skala sebenar.",
      },
      cometOrbit: {
        title: "☄️ Orbit komet dan arah ekornya",
        instruction: "Gerakkan komet ke setiap kedudukan dan perhatikan ke mana ekornya menghala.",
        figureLabel: "Komet pada orbit elips mengelilingi Matahari, dengan ekor sentiasa menjauhi Matahari",
        positionLabel: "Kedudukan",
        sunLabel: "Matahari",
        nearSunLabel: "Menghampiri Matahari",
        farSunLabel: "Jauh daripada Matahari",
        nearSpeedLabel: "Semakin laju — komet mencair dan kelihatan seperti berekor panjang",
        farSpeedLabel: "Jauh daripada Matahari — ekor belum memanjang",
        nearBody: "Apabila komet menghampiri Matahari, komet semakin laju, mencair dan kelihatan seperti berekor panjang. Komet beredar mengelilingi Matahari mengikut orbitnya sendiri yang berbentuk elips, pada julat kelajuan antara 10 hingga 70 km s⁻¹.",
        farBody: "Komet beredar mengelilingi Matahari mengikut orbitnya sendiri yang berbentuk elips, pada julat kelajuan antara 10 hingga 70 km s⁻¹. Kebanyakan komet berasal dari lingkaran Kuiper dan awan Oort.",
        tailRule: "Ekor komet sentiasa dalam keadaan menjauhi Matahari disebabkan tiupan angin suria dari Matahari.",
        scaleNote: "Rajah tidak mengikut skala sebenar.",
      },
      checks: [
        { question: "Nicol nampak jalur cahaya terang melintasi langit, kemudian ia lenyap. Apakah yang dilihatnya?", hint: "Sebuah meteor — meteoroid yang terbakar akibat geseran semasa melintasi atmosfera Bumi." },
        { question: "Antara meteor dan meteorit, yang manakah boleh dijumpai di sebuah muzium?", hint: "Meteorit — kebiasaannya meteor habis terbakar sebelum sampai ke Bumi, tetapi ada juga yang dapat sampai. Meteor yang sampai ke Bumi itulah yang disebut meteorit, dan hanya meteorit boleh dipamerkan di muzium." },
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
      explanation: "Ia sentiasa menghala bertentangan — angin solar menolak gas dan debu yang terbebas ke arah luar daripada Matahari.",
    },
    {
      type: "multiple-choice",
      question: "Di manakah kebanyakan asteroid dalam sistem suria kita berada?",
      options: ["Antara Bumi dan Marikh", "Antara Marikh dan Musytari", "Melangkaui Neptun", "Antara Utarid dan Zuhrah"],
      answerIndex: 1,
      explanation: "Lingkaran Asteroid terletak antara Marikh dan Musytari, menempatkan kebanyakan asteroid dalam sistem suria.",
    },
  ],
};
