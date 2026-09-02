import type { ScienceF2InteractiveContent, PlanetSphere } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";

/**
 * Sains Tingkatan 2 — Bab 12: Sistem Suria (BM)
 *
 * One Standard Kandungan (12.1) with five Standard Pembelajaran, so every
 * learner-facing section is numbered 12.1. There is no 12.2 in the DSKP, and the
 * textbook uses "12.2" only for Rajah/Jadual/Aktiviti numbering.
 *
 * Planet data is Jadual 12.2 (buku teks ms. 256-257) verbatim. Where the book
 * disagrees with itself, the table being reproduced wins: Jadual 12.2 for the
 * comparison, Jadual 12.3 for the temperature-versus-distance discussion.
 */

const PLANETS_BM: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Utarid",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "Planet terkecil dan paling hampir dengan Matahari — tiada atmosfera, berkawah, terbakar pada satu sisi sementara membeku pada sisi lain.",
    facts: [
      { label: "Diameter", value: "4 879 km" },
      { label: "Jarak", value: "57.9 juta km" },
      { label: "Suhu purata", value: "167 °C" },
      { label: "Ketumpatan", value: "5.4 g cm⁻³" },
      { label: "Tarikan graviti", value: "3.7 m s⁻² (0.38 × Bumi)" },
      { label: "Atmosfera", value: "Tiada atmosfera" },
      { label: "Permukaan", value: "Tidak berwarna, terdapat kawah diliputi habuk halus, dataran, gunung dan lembah" },
      { label: "Putaran", value: "Barat ke timur · 10.89 km/j · 59 hari" },
      { label: "Peredaran", value: "88 hari" },
      { label: "Satelit semula jadi", value: "0" },
    ],
  },
  {
    id: "venus",
    name: "Zuhrah",
    gradient: "radial-gradient(circle at 35% 30%, #f0d9a0, #d8b370 60%, #a8895a)",
    size: 44,
    fact: "'Kembar' Bumi dari segi saiz, tetapi kesan rumah hijau melampau menjadikannya planet paling panas — dan ia berputar dari timur ke barat.",
    facts: [
      { label: "Diameter", value: "12 104 km" },
      { label: "Jarak", value: "108.2 juta km" },
      { label: "Suhu purata", value: "457 °C" },
      { label: "Ketumpatan", value: "5.2 g cm⁻³" },
      { label: "Tarikan graviti", value: "8.87 m s⁻² (0.91 × Bumi)" },
      { label: "Atmosfera", value: "96.5% karbon dioksida; 3.4% nitrogen; 0.1% argon, helium, neon, sulfur dioksida, wap air" },
      { label: "Permukaan", value: "Berwarna jingga, berpasir dan berbatu, dataran besar, gunung berapi dan kawah yang luas" },
      { label: "Putaran", value: "Timur ke barat · 6.52 km/j · 243 hari" },
      { label: "Peredaran", value: "224.7 hari" },
      { label: "Satelit semula jadi", value: "0" },
    ],
  },
  {
    id: "earth",
    name: "Bumi",
    gradient: "radial-gradient(circle at 35% 30%, #6fc3e8, #2f8fce 45%, #1f5c8f 70%, #2f9e52)",
    size: 46,
    fact: "Setakat ini satu-satunya planet yang mempunyai hidupan — air, atmosfera yang sesuai dan julat suhu yang tidak melampau.",
    facts: [
      { label: "Diameter", value: "12 756 km" },
      { label: "Jarak", value: "149.6 juta km" },
      { label: "Suhu purata", value: "14 °C" },
      { label: "Ketumpatan", value: "5.5 g cm⁻³" },
      { label: "Tarikan graviti", value: "9.8 m s⁻² (rujukan)" },
      { label: "Atmosfera", value: "78% nitrogen; 21% oksigen; 0.97% gas nadir dan bahan lain; 0.03% karbon dioksida" },
      { label: "Permukaan", value: "Lebih daripada 71% air dan 29% daratan (dataran, gunung dan gunung berapi)" },
      { label: "Putaran", value: "Barat ke timur · 1 674.4 km/j · 24 jam" },
      { label: "Peredaran", value: "365 hari" },
      { label: "Satelit semula jadi", value: "1" },
    ],
  },
  {
    id: "mars",
    name: "Marikh",
    gradient: "radial-gradient(circle at 35% 30%, #e08858, #c1440e 55%, #8a3009)",
    size: 38,
    fact: "'Planet Merah' — berpasir dan berbatu, kutubnya mengandungi air beku dan karbon dioksida, dan ia mempunyai dua bulan.",
    facts: [
      { label: "Diameter", value: "6 794 km" },
      { label: "Jarak", value: "227.9 juta km" },
      { label: "Suhu purata", value: "−55 °C" },
      { label: "Ketumpatan", value: "3.9 g cm⁻³" },
      { label: "Tarikan graviti", value: "3.71 m s⁻² (0.38 × Bumi)" },
      { label: "Atmosfera", value: "96% karbon dioksida; 1.9% nitrogen; 1.9% argon; 0.2% oksigen, karbon monoksida" },
      { label: "Permukaan", value: "Berwarna kemerahan, berpasir dan berbatu, dataran besar, gunung berapi dan kawah yang luas" },
      { label: "Putaran", value: "Barat ke timur · 868.2 km/j · 25 jam" },
      { label: "Peredaran", value: "687 hari" },
      { label: "Satelit semula jadi", value: "2 (Phobos dan Deimos)" },
    ],
  },
  {
    id: "jupiter",
    name: "Musytari",
    gradient: "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "Planet terbesar dalam sistem suria — jisimnya hampir 320 kali jisim Bumi, dan daya gravitinya yang kuat memesongkan objek besar daripada melanggar Bumi.",
    facts: [
      { label: "Diameter", value: "142 984 km" },
      { label: "Jarak", value: "778.3 juta km" },
      { label: "Suhu purata", value: "−153 °C" },
      { label: "Ketumpatan", value: "1.3 g cm⁻³" },
      { label: "Tarikan graviti", value: "24.79 m s⁻² (2.53 × Bumi)" },
      { label: "Atmosfera", value: "89.6% hidrogen; 10.1% helium; 0.3% metana, ammonia, etana, air" },
      { label: "Permukaan", value: "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas." },
      { label: "Putaran", value: "Barat ke timur · 45 300 km/j · 10 jam" },
      { label: "Peredaran", value: "11.9 tahun" },
      { label: "Satelit semula jadi", value: "67" },
    ],
  },
  {
    id: "saturn",
    name: "Zuhal",
    gradient: "radial-gradient(circle at 35% 30%, #f0dfb0, #d9c088 60%, #a89060)",
    size: 70,
    rings: true,
    fact: "Planet gergasi bergas dengan sistem cincin ais dan batu — ketumpatannya paling rendah antara semua planet, iaitu 0.7 g cm⁻³.",
    facts: [
      { label: "Diameter", value: "120 536 km" },
      { label: "Jarak", value: "1 429 juta km" },
      { label: "Suhu purata", value: "−185 °C" },
      { label: "Ketumpatan", value: "0.7 g cm⁻³" },
      { label: "Tarikan graviti", value: "10.44 m s⁻² (1.07 × Bumi)" },
      { label: "Atmosfera", value: "96% hidrogen; 3% helium; 0.4% metana, ammonia, etana, air" },
      { label: "Permukaan", value: "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas." },
      { label: "Putaran", value: "Barat ke timur · 35 500 km/j · 11 jam" },
      { label: "Peredaran", value: "29.5 tahun" },
      { label: "Satelit semula jadi", value: "62" },
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    gradient: "radial-gradient(circle at 35% 30%, #b8ecec, #7fd0d0 60%, #4fa0a0)",
    size: 60,
    rings: true,
    fact: "Planet yang unik kerana paksi putarannya condong ke sisi, hampir selari dengan orbitnya mengelilingi Matahari.",
    facts: [
      { label: "Diameter", value: "51 118 km" },
      { label: "Jarak", value: "2 871 juta km" },
      { label: "Suhu purata", value: "−214 °C" },
      { label: "Ketumpatan", value: "1.27 g cm⁻³" },
      { label: "Tarikan graviti", value: "8.69 m s⁻² (0.89 × Bumi)" },
      { label: "Atmosfera", value: "83.3% hidrogen; 15.5% helium; 2.4% metana" },
      { label: "Permukaan", value: "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas." },
      { label: "Putaran", value: "Berputar pada sisinya · 9 320 km/j · 17 jam" },
      { label: "Peredaran", value: "84 tahun" },
      { label: "Satelit semula jadi", value: "27" },
    ],
  },
  {
    id: "neptune",
    name: "Neptun",
    gradient: "radial-gradient(circle at 35% 30%, #7ea8f0, #3f5fd0 60%, #2a3f9a)",
    size: 58,
    fact: "Planet kelapan dan paling jauh dari Matahari — planet gergasi bergas yang mengambil masa hampir 165 tahun untuk satu peredaran.",
    facts: [
      { label: "Diameter", value: "49 528 km" },
      { label: "Jarak", value: "4 504 juta km" },
      { label: "Suhu purata", value: "−225 °C" },
      { label: "Ketumpatan", value: "1.6 g cm⁻³" },
      { label: "Tarikan graviti", value: "11.15 m s⁻² (1.14 × Bumi)" },
      { label: "Atmosfera", value: "80% hidrogen; 19% helium; 0.1% metana, etana" },
      { label: "Permukaan", value: "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas." },
      { label: "Putaran", value: "Barat ke timur · 9 660 km/j · 16 jam" },
      { label: "Peredaran", value: "164.8 tahun" },
      { label: "Satelit semula jadi", value: "14" },
    ],
  },
];

const PLANET_NAMES = ["Utarid", "Zuhrah", "Bumi", "Marikh", "Musytari", "Zuhal", "Uranus", "Neptun"];

export const scienceF2C12InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Blog Sains — Planet ke-9 yang Mungkin Wujud",
    body: "Pada awal 2016, ahli astronomi mengesan tanda-tanda kemungkinan wujudnya sebuah planet baharu dalam sistem suria kita — dianggarkan berjisim kira-kira 10 kali jisim Bumi. Penemuan ini masih lagi dalam peringkat kajian, bukan penemuan yang disahkan.",
    imagePath: chapterImage,
  },
  keywords: ["Sistem suria", "Unit Astronomi (A.U.)", "Tahun cahaya", "Planet", "Satelit semula jadi", "Jejak ekologi"],
  sections: [
    {
      number: "12.1",
      title: "Jarak dalam Sistem Suria",
      intro:
        "Sistem suria terdiri daripada lapan planet yang mengorbit Matahari, termasuk Bumi. Jarak planet-planet dari Matahari adalah sangat besar, jadi unit astronomi dan tahun cahaya digunakan untuk mengukur jarak relatif planet itu dari Matahari. Pada tahun 2006, Pluto tidak lagi dikenali sebagai planet dalam sistem suria, sebaliknya dikenali sebagai planet kerdil.",
      cards: [
        {
          title: "📏 Unit Astronomi (A.U.)",
          body: "Jarak purata di antara Bumi dengan Matahari, iaitu kira-kira 93 juta batu atau 150 juta kilometer. 1 A.U. = 1.5 × 10⁸ km.",
          detail: "Jarak dalam A.U. = Jarak dalam km ÷ (1.5 × 10⁸ km)",
        },
        {
          title: "💫 Tahun Cahaya (ly)",
          body: "Tahun cahaya ialah satu unit JARAK, bukan unit masa — iaitu jarak yang ditempuh cahaya dalam masa setahun. Cahaya bergerak pada halaju 300 000 km setiap saat, maka cahaya boleh bergerak sejauh 9.5 × 10¹² km dalam setahun.",
          detail: "Jarak dalam ly = Jarak dalam km ÷ (9.5 × 10¹² km)",
        },
        {
          title: "🧭 Contoh daripada buku teks",
          body: "Zuhal berada pada jarak 1.43 × 10⁹ km dari Matahari. Jarak itu bersamaan 9.5 A.U. atau 1.51 × 10⁻⁴ tahun cahaya. Jarak Bumi dari Matahari, 1.5 × 10⁸ km, bersamaan 1.0 A.U. atau 1.58 × 10⁻⁵ tahun cahaya.",
        },
      ],
      calculators: [
        {
          type: "au-light-year",
          title: "🧮 Tukar jarak antara km, A.U. dan tahun cahaya",
          instruction:
            "Pilih unit yang anda masukkan, kemudian lihat jarak yang sama dalam unit yang lain. Cuba jarak Bumi–Matahari: 1.5 × 10⁸ km = 1.0 A.U.",
          defaultKm: 150000000,
        },
      ],
      planetComparison: {
        title: "Jarak setiap planet dari Matahari",
        instruction: "Bandingkan jarak setiap planet dalam kilometer dan dalam unit astronomi.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "km",
            label: "Jarak (km)",
            values: [
              "5.79 × 10⁷",
              "1.08 × 10⁸",
              "1.50 × 10⁸",
              "2.28 × 10⁸",
              "7.78 × 10⁸",
              "1.43 × 10⁹",
              "2.87 × 10⁹",
              "4.5 × 10⁹",
            ],
            note: "Semakin jauh kedudukan planet, semakin besar jaraknya dari Matahari.",
          },
          {
            id: "au",
            label: "Jarak (A.U.)",
            values: ["0.39", "0.72", "1.0", "1.52", "5.19", "9.5", "19.13", "30"],
            note: "Dalam unit astronomi, jarak Bumi dari Matahari menjadi rujukan iaitu 1.0 A.U.",
          },
        ],
      },
      checks: [
        {
          question: "Sebuah bintang berjarak 4.37 tahun cahaya daripada Matahari. Lebih kurang berapa km jaraknya?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — cuba dalam kalkulator di atas dengan memilih unit 'ly'.",
        },
        {
          question: "Mengapakah A.U. dan tahun cahaya digunakan untuk menyatakan jarak planet dari Matahari?",
          hint: "Jarak planet-planet dari Matahari adalah sangat besar, jadi kilometer menjadi tidak praktikal untuk membandingkan jarak relatif planet itu.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Membandingkan Planet",
      intro:
        "Setiap planet boleh dibandingkan dengan Bumi menggunakan ciri yang sama. Pilih satu ciri untuk melihat kesemua lapan planet pada ciri itu, atau ketuk sebuah planet untuk melihat profil penuhnya.",
      planetComparison: {
        title: "Bandingkan planet dengan Bumi",
        instruction: "Pilih satu ciri. Baris Bumi ditandakan sebagai rujukan.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "size",
            label: "Saiz",
            unit: "km",
            values: ["4 879", "12 104", "12 756", "6 794", "142 984", "120 536", "51 118", "49 528"],
            note: "Musytari ialah planet terbesar dan Utarid yang terkecil.",
          },
          {
            id: "distance",
            label: "Jarak",
            unit: "juta km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Utarid paling dekat dengan Matahari; Neptun paling jauh.",
          },
          {
            id: "temperature",
            label: "Suhu",
            unit: "°C",
            values: ["167", "457", "14", "−55", "−153", "−185", "−214", "−225"],
            note: "Zuhrah mempunyai suhu purata permukaan yang paling tinggi walaupun ia bukan planet yang paling hampir dengan Matahari.",
          },
          {
            id: "density",
            label: "Ketumpatan",
            unit: "g cm⁻³",
            values: ["5.4", "5.2", "5.5", "3.9", "1.3", "0.7", "1.27", "1.6"],
            note: "Planet gergasi bergas mempunyai ketumpatan yang jauh lebih rendah daripada planet berbatu.",
          },
          {
            id: "gravity",
            label: "Tarikan graviti",
            values: [
              "3.7 (0.38 × Bumi)",
              "8.87 (0.91 × Bumi)",
              "9.8 (1 × Bumi)",
              "3.71 (0.38 × Bumi)",
              "24.79 (2.53 × Bumi)",
              "10.44 (1.07 × Bumi)",
              "8.69 (0.89 × Bumi)",
              "11.15 (1.14 × Bumi)",
            ],
            unit: "m s⁻²",
            note: "Tarikan graviti diberi dalam m s⁻² dan sebagai nisbah berbanding Bumi.",
          },
          {
            id: "atmosphere",
            label: "Lapisan atmosfera",
            values: [
              "Tiada atmosfera",
              "96.5% karbon dioksida; 3.4% nitrogen; 0.1% argon, helium, neon, sulfur dioksida, wap air",
              "78% nitrogen; 21% oksigen; 0.97% gas nadir dan bahan-bahan lain; 0.03% karbon dioksida",
              "96% karbon dioksida; 1.9% nitrogen; 1.9% argon; 0.2% oksigen, karbon monoksida",
              "89.6% hidrogen; 10.1% helium; 0.3% metana, ammonia, etana, air",
              "96% hidrogen; 3% helium; 0.4% metana, ammonia, etana, air",
              "83.3% hidrogen; 15.5% helium; 2.4% metana",
              "80% hidrogen; 19% helium; 0.1% metana, etana",
            ],
            note: "Hanya Bumi mempunyai atmosfera yang kaya dengan oksigen.",
          },
          {
            id: "surface",
            label: "Keadaan permukaan",
            values: [
              "Tidak berwarna, terdapat kawah diliputi oleh habuk halus, terdapat dataran, gunung dan lembah",
              "Berwarna jingga, berpasir dan berbatu, terdapat dataran-dataran besar, gunung berapi dan kawah yang luas",
              "Lebih daripada 71% permukaannya ialah air dan 29% daratan (dataran-dataran, gunung dan gunung berapi)",
              "Berwarna kemerahan, berpasir dan berbatu, terdapat dataran-dataran besar, gunung berapi dan kawah yang luas",
              "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
              "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
              "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
              "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
            ],
            note: "Empat planet gergasi bergas tidak mempunyai permukaan yang keras.",
          },
          {
            id: "rotation",
            label: "Arah dan kelajuan putaran",
            values: [
              "Barat ke timur · 10.89 km/j · 59 hari",
              "Timur ke barat · 6.52 km/j · 243 hari",
              "Barat ke timur · 1 674.4 km/j · 24 jam",
              "Barat ke timur · 868.2 km/j · 25 jam",
              "Barat ke timur · 45 300 km/j · 10 jam",
              "Barat ke timur · 35 500 km/j · 11 jam",
              "Berputar pada sisinya · 9 320 km/j · 17 jam",
              "Barat ke timur · 9 660 km/j · 16 jam",
            ],
            note: "Semua planet berputar dari barat ke timur kecuali Zuhrah dan Uranus.",
          },
          {
            id: "orbit",
            label: "Peredaran pada orbit",
            values: ["88 hari", "224.7 hari", "365 hari", "687 hari", "11.9 tahun", "29.5 tahun", "84 tahun", "164.8 tahun"],
            note: "Masa yang diambil untuk satu peredaran lengkap mengelilingi Matahari (waktu di Bumi).",
          },
          {
            id: "satellites",
            label: "Satelit semula jadi",
            values: ["0", "0", "1", "2", "67", "62", "27", "14"],
            note: "Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Bumi mempunyai satu, iaitu Bulan.",
          },
        ],
      },
      planets: {
        title: "Ketuk setiap planet untuk melihat profil penuhnya",
        instruction:
          "Saiz sfera di bawah adalah gambaran konsep sahaja dan tidak mengikut skala sebenar — rujuk lajur Saiz untuk diameter sebenar.",
        planets: PLANETS_BM,
      },
      checks: [
        {
          question: "Planet manakah yang paling dekat dengan Matahari?",
          hint: "Utarid, iaitu kira-kira 57.9 juta kilometer dari Matahari.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Hubungan antara Ciri Planet",
      intro:
        "Ciri-ciri planet berkait antara satu sama lain. Secara teorinya, planet yang berada lebih dekat dengan Matahari menerima lebih banyak haba, tetapi situasi sebenar adalah lebih kompleks — dan beberapa anomali wujud.",
      accordions: [
        {
          title: "☿️ Utarid — planet tanpa atmosfera",
          body: "Sinaran Matahari terus sampai ke permukaannya, menyebabkan bahagian yang menghadap Matahari sangat panas, iaitu melebihi 427 °C. Bahagian yang gelap pula sangat sejuk, iaitu suhu boleh menurun sehingga −173 °C.",
        },
        {
          title: "♀️ Zuhrah — anomali suhu",
          body: "Zuhrah mempunyai awan tebal yang memantulkan sinaran Matahari, tetapi lapisan atmosferanya yang kebanyakannya karbon dioksida menyebabkan kesan rumah hijau. Banyak haba diperangkap, jadi suhu permukaan boleh mencapai 462 °C — lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari.",
        },
        {
          title: "♂️ Marikh — atmosfera bertekanan rendah",
          body: "Walaupun mempunyai atmosfera, tekanan permukaannya sangat rendah berbanding Bumi (kurang daripada 1/100 tekanan Bumi), jadi kesannya pada suhu permukaan adalah sedikit. Suhu boleh berbeza antara −143 °C hingga 35 °C.",
        },
        {
          title: "🪐 Planet gergasi bergas",
          body: "Musytari, Zuhal, Uranus dan Neptun mempunyai permukaan yang dilitupi gas. Planet-planet ini menerima sinaran Matahari yang sedikit, maka suhu permukaannya sangat rendah.",
        },
      ],
      cards: [
        {
          title: "Ketumpatan dan tarikan graviti",
          body:
            "Tarikan graviti di permukaan sesuatu planet bergantung pada jisim dan ketumpatan planet itu. Tarikan graviti Utarid dan Marikh lebih rendah daripada Bumi kerana jisim planet yang rendah. Tarikan graviti Zuhrah hampir sama dengan Bumi kerana jisimnya hampir sama. Tarikan graviti Musytari sangat tinggi berbanding Bumi kerana jisimnya yang sangat tinggi walaupun ketumpatannya sangat rendah. Walaupun Zuhal, Uranus dan Neptun mempunyai jisim yang sangat tinggi, tarikan graviti planet-planet ini tidak terlalu tinggi berbanding Bumi kerana planet gergasi bergas mempunyai ketumpatan yang rendah.",
          detail: "Tarikan graviti Bumi ialah 9.8 m s⁻².",
        },
        {
          title: "Jarak, masa dan kelajuan",
          body:
            "Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit. Utarid paling dekat dengan Matahari, maka ia mengambil masa 88 hari sahaja untuk satu orbit. Neptun, planet yang paling jauh, mengambil masa 164.8 tahun.",
        },
      ],
      tabs: [
        {
          title: "Kebanyakan planet",
          body: "Berputar dari barat ke timur. Kerana Bumi berputar dari barat ke timur, kita melihat Matahari terbit di timur dan terbenam di barat.",
        },
        {
          title: "Zuhrah",
          body: "Berputar dari timur ke barat — arah bertentangan dengan Bumi. Hal ini bermakna di Zuhrah, Matahari akan terbit dari barat.",
        },
        {
          title: "Uranus",
          body: "Berputar pada sisinya — paksi putarannya condong hampir selari dengan orbitnya yang mengelilingi Matahari.",
        },
      ],
      checks: [
        {
          question: "Apakah hubungan antara suhu permukaan planet dengan jaraknya dari Matahari?",
          hint: "Secara teorinya planet yang lebih dekat menerima lebih banyak haba, tetapi atmosfera planet boleh mengubah suhu permukaannya — seperti Zuhrah yang paling panas walaupun bukan yang paling dekat.",
        },
        {
          question: "Aisyah berkata Utarid ialah planet paling panas kerana ia paling dekat dengan Matahari. Adakah dia betul?",
          hint: "Tidak. Zuhrah ialah planet yang paling panas kerana atmosfera karbon dioksidanya yang tebal memerangkap haba melalui kesan rumah hijau.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Situasi Hipotetikal Sistem Suria",
      intro:
        "Berdasarkan pemahaman mengenai sistem suria, putaran, daya bertindak dan pergerakan boleh diramalkan berdasarkan data yang dikumpul. Situasi di bawah adalah untuk ditaakul — sebahagiannya mempunyai jawapan yang dinyatakan dalam buku teks, dan sebahagian lagi adalah untuk anda bincangkan.",
      cards: [
        {
          title: "🌗 Jika Bumi berputar perlahan atau berhenti berputar",
          body:
            "Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut. Jika Bumi berputar perlahan atau berhenti berputar: waktu siang dan malam menjadi panjang di dua bahagian Bumi yang berbeza; kawasan gurun bertambah pada bahagian Bumi yang menghadap Matahari; waktu berlaku pasang surut air berubah; dan suhu pada bahagian Bumi yang tidak disinari Matahari akan menjadi sangat dingin.",
        },
      ],
      accordions: [
        {
          title: "🌙 Mengapakah terdapat planet yang mempunyai dua bulan atau lebih?",
          body:
            "Bincangkan berdasarkan data dalam jadual perbandingan. Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Utarid dan Zuhrah tidak mempunyai satelit semula jadi, Bumi mempunyai satu, Marikh dua (Phobos dan Deimos), manakala Musytari 67, Zuhal 62, Uranus 27 dan Neptun 14. Perhatikan hubungan antara bilangan satelit dengan saiz, jisim dan tarikan graviti planet itu, kemudian nyatakan penaakulan anda.",
        },
        {
          title: "🌍 Jika anda berada di Bulan, bagaimanakah rupa bentuk Bumi?",
          body:
            "Gunakan maklumat berikut untuk menaakul. Bulan berputar pada paksinya dan pada masa yang sama beredar mengelilingi Bumi pada orbitnya. Tempoh masa putaran Bulan pada paksinya dan peredarannya mengelilingi Bumi adalah sama, iaitu lebih kurang 27 hari. Oleh itu, permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa. Saiz Bumi pula adalah empat kali ganda berbanding saiz Bulan.",
        },
        {
          title: "🌗 Adakah Bumi kelihatan mempunyai fasa jika dilihat dari Bulan?",
          body:
            "Ini adalah soalan untuk dibincangkan. Gunakan apa yang anda tahu tentang kedudukan Matahari, Bumi dan Bulan, serta bagaimana bahagian yang disinari Matahari berubah semasa Bulan beredar mengelilingi Bumi. Bentangkan penaakulan kumpulan anda dan bandingkan dengan kumpulan lain.",
        },
      ],
      checks: [
        {
          question: "Ramalkan dua kemungkinan yang akan berlaku jika Bumi berhenti berputar.",
          hint: "Antaranya: waktu siang dan malam yang panjang di dua bahagian Bumi yang berbeza, pertambahan kawasan gurun pada bahagian yang menghadap Matahari, perubahan waktu pasang surut, dan suhu yang sangat dingin pada bahagian yang tidak disinari Matahari.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Bumi sebagai Planet untuk Kehidupan",
      intro:
        "Setakat ini, Bumi merupakan satu-satunya planet yang mempunyai hidupan. Bumi dapat menampung hidupan akibat beberapa faktor seperti kehadiran air, sumber mineral, suhu permukaan dan kandungan atmosferanya.",
      flipCards: [
        { id: "gravity", icon: "⚖️", label: "Tarikan graviti", fact: "Mempunyai tarikan graviti yang menarik objek di Bumi supaya tidak melayang ke angkasa lepas." },
        { id: "water", icon: "💧", label: "Kandungan air", fact: "Mempunyai kandungan air yang banyak untuk semua keperluan hidupan." },
        { id: "oxygen", icon: "🌬️", label: "Kandungan oksigen", fact: "Mempunyai kandungan oksigen yang tinggi untuk proses respirasi." },
        { id: "sunlight", icon: "☀️", label: "Cahaya matahari", fact: "Menerima cahaya matahari untuk proses fotosintesis tumbuhan." },
        { id: "atmosphere", icon: "🛡️", label: "Atmosfera pelindung", fact: "Mempunyai atmosfera yang menghalang sinar-sinar yang berbahaya sampai ke Bumi." },
        { id: "temperature", icon: "🌡️", label: "Julat suhu yang sesuai", fact: "Mempunyai julat suhu yang sesuai, iaitu tidak terlalu panas atau terlalu sejuk." },
      ],
      cards: [
        {
          title: "🌱 Jejak ekologi",
          body:
            "Jejak ekologi ialah ukuran kemampuan air dan tanah menyediakan sumber yang diperlukan oleh manusia (makanan, minuman, kediaman dan lain-lain) serta kemampuan Bumi untuk menyerap semua bahan buangan manusia lalu menghasilkan semula sumber sesudah mereka menggunakannya.",
          detail: "Jejak ekologi berbeza daripada sebuah negara dengan negara yang lain.",
        },
        {
          title: "⚠️ Apabila jejak ekologi terlalu besar",
          body:
            "Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber. Sebagai pengguna yang berhemah, setiap individu berperanan menguruskan alam dan mengurangkan jejak ekologi masing-masing.",
        },
      ],
      accordions: [
        { title: "🏭 Jejak karbon", body: "Kawasan yang diperlukan untuk menyerap pelepasan karbon daripada penggunaan tenaga." },
        { title: "🏘️ Kawasan binaan", body: "Kawasan tanah yang digunakan untuk penempatan dan pembinaan." },
        { title: "🌳 Hutan", body: "Kawasan hutan yang membekalkan kayu dan kertas." },
        { title: "🌾 Kawasan pertanian", body: "Kawasan tanaman yang membekalkan makanan dan sumber gentian." },
        { title: "🐄 Kawasan penternakan", body: "Kawasan ternakan yang membekalkan makanan dan sumber gentian daripada haiwan." },
        { title: "🐟 Kawasan perikanan", body: "Kawasan perairan yang membekalkan makanan laut." },
      ],
      checks: [
        {
          question: "Zuhrah dianggap sebagai planet kembar Bumi kerana saiz, jisim, isi padu dan ketumpatannya yang hampir sama. Mengapakah planet ini berkemungkinan tidak mempunyai hidupan?",
          hint: "Atmosfera Zuhrah kebanyakannya karbon dioksida dan menyebabkan kesan rumah hijau yang melampau, menjadikan suhu permukaannya terlalu panas untuk hidupan.",
        },
        {
          question: "Namakan tiga ciri Bumi yang menjadikannya sesuai untuk hidupan.",
          hint: "Antaranya: tarikan graviti, kandungan air yang banyak, kandungan oksigen yang tinggi, cahaya matahari, atmosfera pelindung dan julat suhu yang sesuai.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membandingkan jarak planet dalam sistem suria dari Matahari menggunakan unit astronomi (A.U.) dan tahun cahaya (ly).",
    "Saya boleh membina jadual untuk membandingkan dan membezakan antara planet dalam sistem suria dengan Bumi.",
    "Saya boleh meneroka hubungan berdasarkan ciri planet dan menerangkan hubungan tersebut termasuk anomali yang mungkin wujud.",
    "Saya boleh menaakul dan menganalogikan situasi hipotetikal berkaitan dengan sistem suria.",
    "Saya boleh menjustifikasikan Bumi sebagai planet yang paling sesuai untuk hidupan berdasarkan data tentang Bumi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Zuhrah ialah planet paling panas dalam sistem suria, walaupun Utarid lebih hampir dengan Matahari.",
      answer: true,
      explanation: "Betul — atmosfera karbon dioksida Zuhrah yang tebal memerangkap haba melalui kesan rumah hijau, manakala Utarid langsung tiada atmosfera.",
    },
    {
      type: "multiple-choice",
      question: "Planet manakah berputar pada sisinya, hampir selari dengan orbitnya?",
      options: ["Zuhrah", "Uranus", "Zuhal", "Marikh"],
      answerIndex: 1,
      explanation: "Uranus — semua planet berputar dari barat ke timur kecuali Zuhrah (timur ke barat) dan Uranus (berputar pada sisinya).",
    },
  ],
};
