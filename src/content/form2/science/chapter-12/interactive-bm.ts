import type { ScienceF2InteractiveContent, PlanetSphere } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";

const PLANETS_BM: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Utarid",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "Planet terkecil dan paling hampir dengan Matahari — tiada atmosfera, berkawah, terbakar pada satu sisi sementara membeku pada sisi lain.",
    facts: [
      { label: "Jarak", value: "57.9 juta km" },
      { label: "Diameter", value: "4,879 km" },
      { label: "Graviti", value: "3.7 m/s²" },
      { label: "Bulan", value: "0" },
      { label: "Masa orbit", value: "88 hari" },
    ],
  },
  {
    id: "venus",
    name: "Zuhrah",
    gradient: "radial-gradient(circle at 35% 30%, #f0d9a0, #d8b370 60%, #a8895a)",
    size: 44,
    fact: "'Kembar' Bumi dari segi saiz, tetapi kesan rumah hijau melampau menjadikannya planet paling panas — dan ia berputar secara terbalik.",
    facts: [
      { label: "Jarak", value: "108.2 juta km" },
      { label: "Diameter", value: "12,104 km" },
      { label: "Graviti", value: "8.87 m/s²" },
      { label: "Bulan", value: "0" },
      { label: "Masa orbit", value: "224.7 hari" },
    ],
  },
  {
    id: "earth",
    name: "Bumi",
    gradient: "radial-gradient(circle at 35% 30%, #6fc3e8, #2f8fce 45%, #1f5c8f 70%, #2f9e52)",
    size: 46,
    fact: "Satu-satunya planet yang diketahui mempunyai hidupan — kerana air cecair, atmosfera boleh bernafas, dan julat suhu yang kekal sesuai.",
    facts: [
      { label: "Jarak", value: "149.6 juta km" },
      { label: "Diameter", value: "12,756 km" },
      { label: "Graviti", value: "9.8 m/s²" },
      { label: "Bulan", value: "1" },
      { label: "Masa orbit", value: "365 hari" },
    ],
  },
  {
    id: "mars",
    name: "Marikh",
    gradient: "radial-gradient(circle at 35% 30%, #e08858, #c1440e 55%, #8a3009)",
    size: 38,
    fact: "'Planet Merah' — habuk dan pasir kemerahan, kutub berais, dan dua bulan kecil, Phobos dan Deimos.",
    facts: [
      { label: "Jarak", value: "227.9 juta km" },
      { label: "Diameter", value: "6,794 km" },
      { label: "Graviti", value: "3.71 m/s²" },
      { label: "Bulan", value: "2" },
      { label: "Masa orbit", value: "687 hari" },
    ],
  },
  {
    id: "jupiter",
    name: "Musytari",
    gradient: "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "Planet terbesar dengan jauh — daya gravitinya yang kuat memesongkan asteroid dan komet, secara berkesan melindungi Bumi.",
    facts: [
      { label: "Jarak", value: "778.3 juta km" },
      { label: "Diameter", value: "142,984 km" },
      { label: "Graviti", value: "24.79 m/s²" },
      { label: "Bulan", value: "67+" },
      { label: "Masa orbit", value: "11.9 tahun" },
    ],
  },
  {
    id: "saturn",
    name: "Zuhal",
    gradient: "radial-gradient(circle at 35% 30%, #f0dfb0, #d9c088 60%, #a89060)",
    size: 70,
    rings: true,
    fact: "Terkenal dengan sistem cincin dramatiknya yang terdiri daripada ais dan batu — planet 'gas gergasi' berketumpatan rendah dengan graviti lebih lemah daripada Bumi walaupun bersaiz besar.",
    facts: [
      { label: "Jarak", value: "1,427 juta km" },
      { label: "Diameter", value: "120,536 km" },
      { label: "Graviti", value: "10.44 m/s²" },
      { label: "Bulan", value: "62+" },
      { label: "Masa orbit", value: "29.5 tahun" },
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    gradient: "radial-gradient(circle at 35% 30%, #b8ecec, #7fd0d0 60%, #4fa0a0)",
    size: 60,
    rings: true,
    fact: "Tidak seperti planet lain — ia berputar hampir sepenuhnya di sisinya, dengan paksi yang hampir selari dengan orbitnya.",
    facts: [
      { label: "Jarak", value: "2,871 juta km" },
      { label: "Diameter", value: "51,118 km" },
      { label: "Graviti", value: "8.69 m/s²" },
      { label: "Bulan", value: "27+" },
      { label: "Masa orbit", value: "84 tahun" },
    ],
  },
  {
    id: "neptune",
    name: "Neptun",
    gradient: "radial-gradient(circle at 35% 30%, #7ea8f0, #3f5fd0 60%, #2a3f9a)",
    size: 58,
    fact: "Planet paling jauh daripada Matahari — planet 'gas gergasi' biru tua yang mengambil masa hampir 165 tahun untuk melengkapkan satu orbit.",
    facts: [
      { label: "Jarak", value: "4,497 juta km" },
      { label: "Diameter", value: "49,528 km" },
      { label: "Graviti", value: "11.15 m/s²" },
      { label: "Bulan", value: "14+" },
      { label: "Masa orbit", value: "164.8 tahun" },
    ],
  },
];

export const scienceF2C12InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Blog Sains — Planet ke-9 yang Mungkin Wujud",
    body: "Pada awal 2016, ahli astronomi mengesan tanda-tanda kemungkinan wujudnya sebuah planet baharu dalam sistem suria kita — dianggarkan berjisim kira-kira 10 kali jisim Bumi. Ia masih sekadar hipotesis penyelidikan, bukan penemuan yang disahkan.",
    imagePath: chapterImage,
  },
  keywords: ["Sistem suria", "Unit Astronomi (A.U.)", "Tahun cahaya", "Planet", "Satelit semula jadi", "Jejak ekologi"],
  sections: [
    {
      number: "12.1",
      title: "Mengukur Sistem Suria",
      intro:
        "Sistem suria terdiri daripada lapan planet yang mengorbit Matahari, termasuk Bumi tempat kita tinggal. Angkasa lepas begitu luas sehingga kilometer menjadi tidak praktikal untuk mengukur jarak antara planet dan bintang — sebaliknya, ahli astronomi menggunakan dua unit khas.",
      cards: [
        {
          title: "📏 Unit Astronomi (A.U.)",
          body: "Jarak purata antara Bumi dan Matahari, iaitu kira-kira 150 juta kilometer. 1 A.U. = 1.5 × 10⁸ km.",
          detail: "Jarak (A.U.) = Jarak (km) ÷ (1.5 × 10⁸ km)",
        },
        {
          title: "💫 Tahun Cahaya (ly)",
          body: "Jarak yang dilalui oleh cahaya dalam masa satu tahun. Cahaya bergerak pada kelajuan 300,000 km saat. 1 tahun cahaya = 9.5 × 10¹² km.",
          detail: "Jarak (ly) = Jarak (km) ÷ (9.5 × 10¹² km)",
        },
      ],
      calculators: [
        {
          type: "au-light-year",
          title: "🧮 Tukar jarak sendiri",
          instruction: "Masukkan sebarang jarak dalam kilometer untuk melihatnya dalam A.U. dan tahun cahaya. Cuba jarak Bumi-Matahari: 1.5 × 10⁸ km = 1.0 A.U.",
          defaultKm: 149600000,
        },
      ],
      checks: [
        {
          question: "Sebuah bintang berjarak 4.37 tahun cahaya daripada Matahari. Lebih kurang berapa km jaraknya?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — cuba dalam kalkulator di atas menggunakan nilai tahun cahaya.",
        },
      ],
    },
    {
      number: "12.2",
      title: "Lapan Planet",
      intro:
        "Susunan lapan planet daripada Matahari ialah Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus dan Neptun. Pada tahun 2006, Pluto tidak lagi diiktiraf sebagai planet dalam sistem suria; ia kini dikenali sebagai planet kerdil. Setiap planet mempunyai kisahnya yang tersendiri — daripada Utarid yang tanpa udara dan melampau, hingga Musytari yang menjadi 'pengawal peribadi' Bumi.",
      cards: [
        {
          title: "Jisim, ketumpatan dan daya graviti",
          body: "Daya graviti permukaan sesuatu planet bergantung kepada jisim DAN ketumpatannya — bukan saiz sahaja. Itulah sebabnya Zuhal, walaupun bersaiz besar, mempunyai graviti lebih lemah berbanding Bumi — ia planet 'gas gergasi' berketumpatan rendah. Musytari pula begitu berjisim besar sehingga daya gravitinya jauh lebih kuat daripada Bumi walaupun ketumpatannya rendah — cukup kuat untuk memesongkan asteroid dan komet yang menghampiri, secara berkesan melindungi Bumi.",
        },
        {
          title: "Semakin jauh, semakin lama orbitnya",
          body: "Semakin jauh sesuatu planet daripada Matahari, semakin lama masa yang diperlukan untuk mengorbitnya. Utarid melengkapkan orbitnya dalam masa 88 hari sahaja. Neptun, planet paling jauh, mengambil masa 164.8 tahun.",
        },
        {
          title: "🌗 Jika Bumi berhenti berputar",
          body: "Putaran Bumi menyebabkan kitaran siang/malam dan air pasang surut. Jika ia berhenti berputar: tempoh siang dan malam menjadi jauh lebih panjang di bahagian berlainan, lebih banyak kawasan gurun di bahagian yang sentiasa menghadap Matahari, corak air pasang surut berubah, dan kesejukan melampau di bahagian yang gelap kekal.",
        },
        {
          title: "🌕 Bulan — satelit semula jadi Bumi",
          body: "Bulan mengambil masa kira-kira 27 hari untuk berputar pada paksinya DAN untuk mengorbit Bumi — bermakna permukaan yang sama sentiasa menghadap kita. Itulah sebabnya kita tidak pernah melihat 'sisi jauh' Bulan daripada Bumi.",
        },
        {
          title: "Jejak ekologi kita",
          body: "Jejak ekologi mengukur berapa banyak tanah dan air diperlukan untuk menampung keperluan manusia — dan berapa banyak sisa yang Bumi mampu serap serta janakan semula. Apabila jejak ekologi melebihi keupayaan Bumi untuk menjana semula sumbernya, sumber Bumi akan berkurangan.",
        },
      ],
      flipCards: [
        { id: "water", icon: "💧", label: "Air cecair", fact: "Penting untuk setiap proses hidupan yang kita ketahui." },
        { id: "oxygen", icon: "🌬️", label: "Atmosfera kaya oksigen", fact: "Menyokong proses respirasi bagi pelbagai spesies." },
        { id: "temp", icon: "🌡️", label: "Suhu seimbang", fact: "Tidak terlalu panas, tidak terlalu sejuk — kekal dalam julat yang sesuai untuk hidupan." },
        { id: "atmosphere", icon: "🛡️", label: "Atmosfera pelindung", fact: "Menghalang sinar ultraungu dan radiasi berbahaya daripada angkasa lepas." },
        { id: "gravity", icon: "⚖️", label: "Graviti yang sesuai", fact: "Cukup kuat untuk mengekalkan atmosfera tanpa menghancurkan hidupan." },
        { id: "sunlight", icon: "☀️", label: "Cahaya matahari yang stabil", fact: "Menggerakkan fotosintesis, asas kepada kebanyakan rantai makanan." },
      ],
      planets: {
        title: "Ketuk setiap planet untuk melihat profilnya",
        instruction: "Setiap planet mempunyai kisahnya yang tersendiri — daripada keadaan melampau Utarid tanpa udara, hingga peranan Musytari sebagai pengawal peribadi kosmik Bumi.",
        planets: PLANETS_BM,
      },
      accordions: [
        { title: "☿️ Utarid — tiada atmosfera", body: "Sisi yang menghadap Matahari terbakar melebihi 427°C; sisi gelap jatuh ke -173°C, tanpa sebarang cara untuk memerangkap atau menyebarkan haba." },
        { title: "♀️ Zuhrah — atmosfera CO₂ tebal", body: "Walaupun lebih jauh daripada Matahari berbanding Utarid, Zuhrah ialah planet paling panas — karbon dioksida tebalnya memerangkap haba dalam kesan rumah hijau melampau, mencecah 462°C." },
        { title: "♂️ Marikh — atmosfera nipis", body: "Mempunyai atmosfera, tetapi pada kurang daripada 1% tekanan Bumi ia hampir tidak menjejaskan suhu — Marikh masih berubah antara -143°C dan 35°C." },
        { title: "🪐 Planet-planet gas gergasi", body: "Musytari, Zuhal, Uranus dan Neptun terletak begitu jauh daripada Matahari sehingga hanya menerima sedikit cahaya matahari — suhu permukaannya amat rendah tanpa mengira saiz." },
      ],
      tabs: [
        { title: "Kebanyakan planet", body: "Berputar dari barat ke timur — Matahari terbit di timur dan terbenam di barat, sama seperti di Bumi." },
        { title: "Zuhrah", body: "Berputar dari timur ke barat — arah bertentangan. Di Zuhrah, Matahari akan terbit dari barat." },
        { title: "Uranus", body: "Berputar hampir sepenuhnya di sisinya — paksinya condong hampir selari dengan orbitnya, tidak seperti mana-mana planet lain." },
      ],
      checks: [
        { question: "Zuhrah digelar 'kembar' Bumi dari segi saiz — jadi mengapa tiada hidupan di sana?", hint: "Atmosfera CO₂ tebalnya memerangkap haba dalam kesan rumah hijau melampau, menolak suhu permukaan ke 462°C — jauh terlalu panas untuk hidupan seperti yang kita tahu." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membandingkan jarak planet menggunakan A.U. dan tahun cahaya.",
    "Saya boleh membandingkan dan membezakan planet-planet dengan Bumi.",
    "Saya boleh menaakul situasi hipotesis tentang sistem suria.",
    "Saya boleh menjustifikasikan mengapa Bumi ialah planet paling sesuai untuk hidupan.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Zuhrah ialah planet paling panas dalam sistem suria, walaupun Utarid lebih hampir dengan Matahari.",
      answer: true,
      explanation: "Betul — atmosfera CO₂ tebal Zuhrah memerangkap haba jauh lebih berkesan berbanding Utarid yang langsung tiada atmosfera.",
    },
    {
      type: "multiple-choice",
      question: "Planet manakah berputar di sisinya, hampir selari dengan orbitnya?",
      options: ["Zuhrah", "Uranus", "Zuhal", "Marikh"],
      answerIndex: 1,
      explanation: "Uranus — kecondongan yang benar-benar unik antara kesemua lapan planet.",
    },
  ],
};
