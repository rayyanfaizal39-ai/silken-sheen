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
      sequence: {
        title: "☄️ Daripada meteoroid kepada meteorit — ikuti perjalanannya",
        instruction: "Langkah demi langkah apa yang berlaku apabila sebuah meteoroid menghampiri Bumi.",
        steps: [
          { title: "Meteoroid", body: "Sekeping serpihan batu dan logam terapung bebas di angkasa lepas, mengorbit Matahari.", detail: "🪨" },
          { title: "Meteor", body: "Apabila memasuki atmosfera Bumi, geseran dengan udara memanaskannya sehingga ia bercahaya — satu jalur cahaya, kadangkala dipanggil 'bintang jatuh'.", detail: "🔥" },
          { title: "Hujan meteor", body: "Apabila banyak meteor memasuki atmosfera serentak, ia dipanggil hujan meteor.", detail: "🌠" },
          { title: "Meteorit", body: "Kebanyakan meteor terbakar sepenuhnya — tetapi jika serpihan berjaya bertahan sehingga sampai ke tanah, ia kini menjadi meteorit, kadangkala meninggalkan kawah.", detail: "💥" },
        ],
      },
      checks: [
        { question: "Nicol nampak jalur cahaya terang melintasi langit, kemudian ia lenyap. Apakah yang dilihatnya?", hint: "Sebuah meteor — meteoroid yang terbakar akibat geseran semasa melintasi atmosfera Bumi." },
        { question: "Antara meteor dan meteorit, yang manakah boleh dijumpai di sebuah muzium?", hint: "Meteorit — meteor terbakar sepenuhnya di atmosfera; hanya serpihan yang berjaya sampai ke tanah menjadi meteorit." },
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
