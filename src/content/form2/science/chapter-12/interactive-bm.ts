import type {
  ScienceF2InteractiveContent,
  PlanetSphere,
  PlanetTiltItem,
} from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";
import { SCIENCE_F2_CH12_IMAGES } from "../visual-assets";

/**
 * Sains Tingkatan 2 — Bab 12: Sistem Suria (BM)
 *
 * Struktur ini mengikut susunan subtopik buku teks dengan tepat — cermin
 * kepada interactive-dlp.ts: 21 seksyen berasingan dalam susunan yang sama,
 * blok yang sama, data planet yang sama, interaksi yang sama. Hanya bahasa
 * yang berbeza.
 *
 * Satu Standard Kandungan (12.1), jadi semua seksyen bernombor 12.1 — 21
 * seksyen di bawah adalah susunan subtopik BUKU TEKS itu sendiri, bukan
 * nombor SP baharu. Data planet ialah Jadual 12.2 (buku teks ms. 256-257);
 * kerangka suhu ialah Jadual 12.3; sudut putaran ialah Rajah 12.6.
 */

const PLANET_NAMES = [
  "Utarid",
  "Zuhrah",
  "Bumi",
  "Marikh",
  "Musytari",
  "Zuhal",
  "Uranus",
  "Neptun",
];

const DISTANCE_KM = [
  "5.79 × 10⁷",
  "1.08 × 10⁸",
  "1.50 × 10⁸",
  "2.28 × 10⁸",
  "7.78 × 10⁸",
  "1.43 × 10⁹",
  "2.87 × 10⁹",
  "4.5 × 10⁹",
];
const DISTANCE_AU = ["0.39", "0.72", "1.0", "1.52", "5.19", "9.5", "19.13", "30"];
const DISTANCE_LY = [
  "6.09 × 10⁻⁶",
  "1.14 × 10⁻⁵",
  "1.58 × 10⁻⁵",
  "2.40 × 10⁻⁵",
  "8.19 × 10⁻⁵",
  "1.51 × 10⁻⁴",
  "3.02 × 10⁻⁴",
  "4.74 × 10⁻⁴",
];
const RELATIVE_MASS = ["0.06", "0.82", "1", "0.11", "317.8", "95.2", "14.5", "17.1"];
const DIAMETER = ["4 879", "12 104", "12 756", "6 794", "142 984", "120 536", "51 118", "49 528"];
const DENSITY = ["5.4", "5.2", "5.5", "3.9", "1.3", "0.7", "1.27", "1.6"];
const GRAVITY = [
  "3.7 (0.38 × Bumi)",
  "8.87 (0.91 × Bumi)",
  "9.8 (1 × Bumi)",
  "3.71 (0.38 × Bumi)",
  "24.79 (2.53 × Bumi)",
  "10.44 (1.07 × Bumi)",
  "8.69 (0.89 × Bumi)",
  "11.15 (1.14 × Bumi)",
];
const TEMPERATURE = ["167", "457", "14", "−55", "−153", "−185", "−214", "−225"];
const ORBIT_PERIOD = [
  "88 hari",
  "224.7 hari",
  "365 hari",
  "687 hari",
  "11.9 tahun",
  "29.5 tahun",
  "84 tahun",
  "164.8 tahun",
];
const ROTATION_PERIOD = [
  "59 hari",
  "243 hari",
  "24 jam",
  "25 jam",
  "10 jam",
  "11 jam",
  "17 jam",
  "16 jam",
];
const ROTATION_VELOCITY = [
  "10.89 km/j",
  "6.52 km/j",
  "1 674.4 km/j",
  "868.2 km/j",
  "45 300 km/j",
  "35 500 km/j",
  "9 320 km/j",
  "9 660 km/j",
];
const SATELLITES = ["0", "0", "1", "2", "67", "62", "27", "14"];
const ATMOSPHERE = [
  "Tiada atmosfera",
  "96.5% karbon dioksida; 3.5% nitrogen",
  "78% nitrogen; 21% oksigen; 0.97% gas nadir dan bahan-bahan lain; 0.03% karbon dioksida",
  "96% karbon dioksida; 1.9% nitrogen; 1.9% argon; 0.2% oksigen, karbon monoksida",
  "89.6% hidrogen; 10.1% helium; 0.3% metana, ammonia, etana, air",
  "96% hidrogen; 3% helium; 0.4% metana, ammonia, etana, air",
  "83.3% hidrogen; 15.5% helium; 2.4% metana",
  "80% hidrogen; 19% helium; 0.1% metana, etana",
];
const SURFACE = [
  "Tidak berwarna, terdapat kawah diliputi oleh habuk halus, terdapat dataran, gunung dan lembah",
  "Berwarna jingga, berpasir dan berbatu, terdapat dataran-dataran besar, gunung berapi dan kawah yang luas",
  "Lebih daripada 71% permukaannya ialah air dan 29% daratan (dataran-dataran, gunung dan gunung berapi)",
  "Berwarna kemerahan, berpasir dan berbatu, terdapat dataran-dataran besar, gunung berapi dan kawah yang luas",
  "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
  "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
  "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
  "Tidak mempunyai permukaan yang keras. Hanya dilitupi oleh gas.",
];

const PLANETS_BM: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Utarid",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "Planet terkecil dan paling hampir dengan Matahari — tiada atmosfera, berkawah, terbakar pada satu sisi sementara membeku pada sisi lain.",
    facts: [
      { label: "Diameter", value: "4 879 km" },
      { label: "Jarak dari Matahari", value: "57.9 juta km" },
      { label: "Suhu purata", value: "167 °C" },
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
      { label: "Jarak dari Matahari", value: "108.2 juta km" },
      { label: "Suhu purata", value: "457 °C" },
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
      { label: "Jarak dari Matahari", value: "149.6 juta km" },
      { label: "Suhu purata", value: "14 °C" },
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
      { label: "Jarak dari Matahari", value: "227.9 juta km" },
      { label: "Suhu purata", value: "−55 °C" },
      { label: "Satelit semula jadi", value: "2 (Phobos dan Deimos)" },
    ],
  },
  {
    id: "jupiter",
    name: "Musytari",
    gradient:
      "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "Planet terbesar dalam sistem suria — jisimnya hampir 320 kali jisim Bumi, dan daya gravitinya yang kuat memesongkan objek besar daripada melanggar Bumi.",
    facts: [
      { label: "Diameter", value: "142 984 km" },
      { label: "Jarak dari Matahari", value: "778.3 juta km" },
      { label: "Suhu purata", value: "−153 °C" },
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
      { label: "Jarak dari Matahari", value: "1 429 juta km" },
      { label: "Suhu purata", value: "−185 °C" },
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
      { label: "Jarak dari Matahari", value: "2 871 juta km" },
      { label: "Suhu purata", value: "−214 °C" },
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
      { label: "Jarak dari Matahari", value: "4 504 juta km" },
      { label: "Suhu purata", value: "−225 °C" },
      { label: "Satelit semula jadi", value: "14" },
    ],
  },
];

const AXIAL_TILT_BM: PlanetTiltItem[] = [
  {
    id: "mercury",
    name: "Utarid",
    tiltDeg: 0.1,
    direction: "prograde",
    note: "Paksi Utarid hampir tegak sepenuhnya — 0.1° daripada tegak — maka ia hampir tiada musim.",
  },
  {
    id: "venus",
    name: "Zuhrah",
    tiltDeg: 117,
    direction: "retrograde",
    note: "Kecondongan Zuhrah sebanyak 117° bermakna ia berputar arah bertentangan dengan kebanyakan planet — dari timur ke barat — maka di Zuhrah, Matahari terbit dari barat.",
  },
  {
    id: "earth",
    name: "Bumi",
    tiltDeg: 23,
    direction: "prograde",
    note: "Kecondongan 23° Bumi, digabungkan dengan orbitnya, menyebabkan berlakunya musim.",
  },
  {
    id: "mars",
    name: "Marikh",
    tiltDeg: 25,
    direction: "prograde",
    note: "Kecondongan 25° Marikh hampir sama dengan Bumi, maka Marikh turut mempunyai musim.",
  },
  {
    id: "jupiter",
    name: "Musytari",
    tiltDeg: 3,
    direction: "prograde",
    note: "Paksi Musytari hampir tegak — hanya 3° — maka ia hampir tiada perubahan musim.",
  },
  {
    id: "saturn",
    name: "Zuhal",
    tiltDeg: 27,
    direction: "prograde",
    note: "Kecondongan 27° Zuhal hampir sama dengan Bumi, memberikannya musim sepanjang tahunnya yang jauh lebih panjang.",
  },
  {
    id: "uranus",
    name: "Uranus",
    tiltDeg: 98,
    direction: "sideways",
    note: "Uranus condong sejauh 98° sehingga ia berputar hampir pada sisinya, dengan paksinya hampir selari dengan orbitnya berbanding tegak keluar daripadanya.",
  },
  {
    id: "neptune",
    name: "Neptun",
    tiltDeg: 30,
    direction: "prograde",
    note: "Kecondongan 30° Neptun hampir sama dengan Bumi dan Zuhal.",
  },
];

export const scienceF2C12InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Blog Sains — Planet ke-9 yang Mungkin Wujud",
    body: "Pada awal 2016, ahli astronomi mengesan tanda-tanda kemungkinan wujudnya sebuah planet baharu dalam sistem suria kita — dianggarkan berjisim **kira-kira 10 kali jisim Bumi**. Penemuan ini masih lagi dalam peringkat kajian, bukan penemuan yang disahkan.",
    imagePath: chapterImage,
  },
  keywords: [
    "Sistem suria",
    "Unit Astronomi (A.U.)",
    "Tahun cahaya",
    "Planet",
    "Satelit semula jadi",
    "Jejak ekologi",
  ],
  sections: [
    // 1 — Perbandingan Jarak Planet dari Matahari
    {
      number: "12.1",
      title: "Perbandingan Jarak Planet dalam Sistem Suria dari Matahari",
      conceptQuestion: "Bagaimanakah Jarak Planet dari Matahari Dibandingkan?",
      intro:
        "Sistem suria terdiri daripada lapan planet yang mengorbit Matahari, termasuk Bumi. Jarak planet-planet dari Matahari amat berbeza — dari 57.9 juta km bagi Utarid sehingga 4 500 juta km bagi Neptun. Jarak ini terlalu besar untuk dibandingkan dalam kilometer sahaja. Pada tahun 2006, Pluto tidak lagi dikenali sebagai planet dalam sistem suria; ia kini dikenali sebagai **planet kerdil**.",
      ch12SpotlightFigure: {
        title: "Gambaran sistem suria",
        figure: "solar-system",
        src: SCIENCE_F2_CH12_IMAGES.solarSystemOverview,
        alt: "Ilustrasi Matahari dan lapan planet mengikut susunan pada orbit masing-masing — Utarid, Zuhrah, Bumi, Marikh, jalur asteroid, Musytari, Zuhal, Uranus dan Neptun. Saiz dan jarak tidak mengikut skala.",
        instruction: "Tekan planet atau jalur asteroid untuk mengetahui lebih lanjut.",
        prompt: "Tekan planet pada gambar, atau pilih di bawah.",
        scaleNote: "Tidak mengikut skala",
        concepts: [
          { id: "mercury", label: "Utarid", note: "Planet yang paling hampir dengan Matahari." },
          {
            id: "venus",
            label: "Zuhrah",
            note: "Planet paling panas, walaupun bukan planet yang paling hampir dengan Matahari.",
          },
          {
            id: "earth",
            label: "Bumi",
            note: "Setakat ini, satu-satunya planet yang mempunyai hidupan.",
          },
          {
            id: "mars",
            label: "Marikh",
            note: "Berwarna kemerahan, dengan dua satelit semula jadi: Phobos dan Deimos.",
          },
          {
            id: "asteroid-belt",
            label: "Jalur Asteroid",
            note: "Terletak terutamanya di antara Marikh dan Musytari. Ia terdiri daripada banyak objek berbatu yang berasingan — bukan dinding pepejal.",
          },
          { id: "jupiter", label: "Musytari", note: "Planet terbesar dalam sistem suria." },
          {
            id: "saturn",
            label: "Zuhal",
            note: "Planet gergasi bergas yang mempunyai gelang, dan ketumpatan paling rendah antara semua planet.",
          },
          {
            id: "uranus",
            label: "Uranus",
            note: "Berputar pada sisinya — paksi putarannya condong hampir selari dengan orbitnya.",
          },
          { id: "neptune", label: "Neptun", note: "Planet yang paling jauh dari Matahari." },
        ],
      },
      planetComparison: {
        title: "Jarak setiap planet dari Matahari",
        instruction: "Jarak dari Matahari, dalam kilometer, bagi kesemua lapan planet.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "km",
            label: "Jarak dari Matahari",
            unit: "km",
            values: DISTANCE_KM,
            note: "Semakin jauh kedudukan planet, semakin besar jaraknya dari Matahari — nombor sebesar ini sukar dibandingkan secara terus, itulah sebabnya unit khas digunakan seterusnya.",
          },
        ],
      },
      checks: [
        {
          question: "Planet manakah paling dekat dengan Matahari, dan yang manakah paling jauh?",
          hint: "Utarid paling dekat, iaitu kira-kira 57.9 juta km. Neptun paling jauh, iaitu kira-kira 4 500 juta km.",
        },
      ],
    },
    // 2 — Unit Astronomi (A.U.)
    {
      number: "12.1",
      title: "Unit Astronomi (A.U.)",
      conceptQuestion: "Apakah Unit Astronomi?",
      intro:
        "Kerana jarak antara Matahari dengan planet-planet amat besar, ahli astronomi menggunakan **unit astronomi** sebagai unit jarak yang lebih praktikal.",
      cards: [
        {
          title: "📏 Unit Astronomi (A.U.)",
          body: "Jarak purata di antara Bumi dengan Matahari, iaitu kira-kira 93 juta batu atau 150 juta kilometer. **1 A.U. = 1.5 × 10⁸ km**.",
          detail: "1 A.U. lebih kurang bersamaan jarak purata antara Bumi dengan Matahari.",
        },
      ],
      checks: [
        {
          question: "Apakah yang diwakili oleh 1 A.U.?",
          hint: "1 A.U. lebih kurang bersamaan jarak purata antara Bumi dengan Matahari, iaitu 1.5 × 10⁸ km.",
        },
      ],
    },
    // 3 — Tahun Cahaya (ly)
    {
      number: "12.1",
      title: "Tahun Cahaya (ly)",
      conceptQuestion: "Apakah Tahun Cahaya?",
      intro:
        "Untuk jarak yang lebih besar lagi daripada jarak antara planet — seperti jarak ke sebuah bintang — ahli astronomi menggunakan unit yang lebih besar: **tahun cahaya**.",
      cards: [
        {
          title: "💫 Tahun Cahaya (ly)",
          body: "Tahun cahaya ialah **satu unit JARAK, bukan unit masa** — iaitu jarak yang ditempuh cahaya dalam masa setahun. Cahaya bergerak pada halaju 300 000 km setiap saat, maka cahaya boleh bergerak sejauh 9.5 × 10¹² km dalam setahun.",
          detail: "1 ly = 9.5 × 10¹² km.",
        },
      ],
      checks: [
        {
          question: "Adakah tahun cahaya merupakan unit masa?",
          hint: "Tidak. Tahun cahaya ialah unit jarak — jarak yang ditempuh cahaya dalam setahun, bukan tempoh masa. Jangan keliru dengan masa.",
        },
      ],
    },
    // 4 — Penukaran Unit
    {
      number: "12.1",
      title: "Menukar Unit antara Unit Astronomi, Tahun Cahaya dan Kilometer",
      conceptQuestion: "Bagaimanakah Cara Menukar antara km, A.U. dan ly?",
      intro:
        "Jarak dalam kilometer boleh ditukar kepada unit astronomi atau tahun cahaya menggunakan formula buku teks.",
      cards: [
        {
          title: "🔁 Formula penukaran",
          body: "**Jarak dalam A.U. = Jarak dalam km ÷ (1.5 × 10⁸ km)**. **Jarak dalam ly = Jarak dalam km ÷ (9.5 × 10¹² km)**.",
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
      checks: [
        {
          question:
            "Sebuah bintang berjarak 4.37 tahun cahaya daripada Matahari. Lebih kurang berapa km jaraknya?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — cuba dalam kalkulator di atas dengan memilih unit 'ly'.",
        },
      ],
    },
    // 5 — Contoh Pengiraan
    {
      number: "12.1",
      title: "Contoh Pengiraan — Penukaran A.U. / ly",
      conceptQuestion: "Bagaimanakah Penukaran Ini Dikira Langkah demi Langkah?",
      intro: "Ikuti dua contoh daripada buku teks, selangkah demi selangkah.",
      guidedCalculations: [
        {
          title: "Contoh 1 — Jarak Bumi dari Matahari",
          givenLabel: "Diberi",
          findLabel: "Cari",
          formulaLabel: "Formula",
          substituteLabel: "Gantikan",
          answerLabel: "Jawapan",
          given: ["Jarak Bumi dari Matahari = 1.5 × 10⁸ km"],
          find: "(a) jarak dalam A.U. (b) jarak dalam ly",
          formula:
            "Jarak (A.U.) = Jarak (km) ÷ (1.5 × 10⁸ km); Jarak (ly) = Jarak (km) ÷ (9.5 × 10¹² km)",
          substitute: "(a) (1.5 × 10⁸) ÷ (1.5 × 10⁸) (b) (1.5 × 10⁸) ÷ (9.5 × 10¹²)",
          answer: "(a) 1.0 A.U. (b) 1.58 × 10⁻⁵ ly",
        },
        {
          title: "Contoh 2 — Jarak Zuhal dari Matahari",
          givenLabel: "Diberi",
          findLabel: "Cari",
          formulaLabel: "Formula",
          substituteLabel: "Gantikan",
          answerLabel: "Jawapan",
          given: ["Jarak Zuhal dari Matahari = 1.43 × 10⁹ km"],
          find: "(a) jarak dalam A.U. (b) jarak dalam ly",
          formula:
            "Jarak (A.U.) = Jarak (km) ÷ (1.5 × 10⁸ km); Jarak (ly) = Jarak (km) ÷ (9.5 × 10¹² km)",
          substitute: "(a) (1.43 × 10⁹) ÷ (1.5 × 10⁸) (b) (1.43 × 10⁹) ÷ (9.5 × 10¹²)",
          answer: "(a) 9.5 A.U. (b) 1.51 × 10⁻⁴ ly",
        },
      ],
      checks: [],
    },
    // 6 — Jadual 12.1
    {
      number: "12.1",
      title: "Jadual 12.1 — Jarak Planet dari Matahari dalam A.U. dan ly",
      conceptQuestion: "Berapakah Jarak Setiap Planet dalam A.U. dan Tahun Cahaya?",
      intro:
        "Menggunakan formula penukaran, jarak setiap planet dari Matahari boleh dinyatakan dalam kilometer, unit astronomi dan tahun cahaya.",
      planetComparison: {
        title: "Jarak setiap planet dari Matahari",
        instruction: "Pilih km, A.U. atau ly untuk membandingkan semua planet pada unit itu.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "km",
            label: "Jarak",
            unit: "km",
            values: DISTANCE_KM,
            note: "Jarak mentah dalam kilometer — nombor yang sangat besar, itulah sebabnya A.U. dan ly digunakan sebagai gantinya.",
          },
          {
            id: "au",
            label: "Jarak",
            unit: "A.U.",
            values: DISTANCE_AU,
            note: "Dalam unit astronomi, jarak Bumi dari Matahari menjadi rujukan: 1.0 A.U.",
          },
          {
            id: "ly",
            label: "Jarak",
            unit: "ly",
            values: DISTANCE_LY,
            note: "Dalam tahun cahaya, jarak Neptun yang amat besar sekalipun menjadi nombor kecil yang mudah dibandingkan.",
          },
        ],
      },
      checks: [
        {
          question:
            "Mengapakah A.U. dan tahun cahaya digunakan untuk menyatakan jarak planet dari Matahari?",
          hint: "Jarak planet-planet dari Matahari adalah sangat besar, jadi kilometer menjadi tidak praktikal untuk membandingkan jarak relatif planet itu.",
        },
      ],
    },
    // 7 — Planet dalam Sistem Suria
    {
      number: "12.1",
      title: "Planet dalam Sistem Suria",
      conceptQuestion: "Apakah Lapan Planet dalam Sistem Suria?",
      intro:
        "Lapan planet, mengikut susunan dari Matahari: Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus dan Neptun. Ketuk setiap planet untuk melihat profilnya.",
      ch12SpotlightFigure: {
        title: "Kenali lapan planet",
        figure: "eight-planets",
        src: SCIENCE_F2_CH12_IMAGES.eightPlanetsSheet,
        alt: "Lapan planet dalam dua baris: Utarid, Zuhrah, Bumi dan Marikh di baris atas; Musytari, Zuhal, Uranus dan Neptun di baris bawah. Saiz tidak mengikut skala.",
        instruction: "Tekan planet untuk melihat fakta utamanya, kemudian buka profil penuhnya.",
        prompt: "Tekan planet pada gambar, atau pilih di bawah.",
        scaleNote: "Tidak mengikut skala",
        openProfileLabel: "Buka profil penuh",
      },
      planets: {
        title: "Ketuk setiap planet untuk melihat profilnya",
        instruction:
          "Saiz sfera di bawah adalah gambaran konsep sahaja dan tidak mengikut skala sebenar — rujuk Jadual 12.2 untuk diameter sebenar.",
        planets: PLANETS_BM,
      },
      checks: [
        {
          question: "Namakan lapan planet mengikut susunan dari Matahari.",
          hint: "Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus, Neptun.",
        },
      ],
    },
    // 8 — Jadual 12.2
    {
      number: "12.1",
      title: "Ciri-ciri Am Planet dalam Sistem Suria — Jadual 12.2",
      conceptQuestion: "Bagaimanakah Planet Dibandingkan dari Segi Ciri-ciri Am?",
      intro:
        "Setiap planet boleh dibandingkan dengan Bumi menggunakan ciri yang sama. Pilih satu ciri untuk melihat kesemua lapan planet pada ciri itu — baris Bumi sentiasa ditandakan sebagai rujukan.",
      planetComparison: {
        title: "Bandingkan planet dengan Bumi",
        instruction: "Pilih satu ciri. Baris Bumi ditandakan sebagai rujukan.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "distance",
            label: "Jarak dari Matahari",
            unit: "juta km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Utarid paling dekat dengan Matahari; Neptun paling jauh.",
          },
          {
            id: "relative-mass",
            label: "Jisim relatif",
            unit: "× Bumi",
            values: RELATIVE_MASS,
            note: "Jisim Musytari hampir 320 kali jisim Bumi; jisim Utarid pula hanya 0.06 kali jisim Bumi.",
          },
          {
            id: "diameter",
            label: "Diameter",
            unit: "km",
            values: DIAMETER,
            note: "Musytari ialah planet terbesar dan Utarid yang terkecil.",
          },
          {
            id: "density",
            label: "Ketumpatan",
            unit: "g cm⁻³",
            values: DENSITY,
            note: "Planet gergasi bergas mempunyai ketumpatan yang jauh lebih rendah daripada planet berbatu.",
          },
          {
            id: "gravity",
            label: "Tarikan graviti",
            unit: "m s⁻²",
            values: GRAVITY,
            note: "Tarikan graviti diberi dalam m s⁻² dan sebagai nisbah berbanding Bumi.",
          },
          {
            id: "temperature",
            label: "Suhu purata permukaan",
            unit: "°C",
            values: TEMPERATURE,
            note: "Zuhrah mempunyai suhu purata permukaan yang paling tinggi walaupun ia bukan planet yang paling hampir dengan Matahari.",
          },
          {
            id: "orbit-period",
            label: "Masa peredaran mengelilingi Matahari",
            values: ORBIT_PERIOD,
            note: "Semakin jauh sebuah planet, semakin lama masa diperlukan untuk satu peredaran lengkap.",
          },
          {
            id: "rotation-period",
            label: "Masa untuk satu putaran lengkap",
            values: ROTATION_PERIOD,
            note: "Tempoh masa setiap planet mengambil untuk berputar sekali pada paksinya sendiri.",
          },
          {
            id: "rotation-velocity",
            label: "Kelajuan putaran pada paksi",
            unit: "km/j",
            values: ROTATION_VELOCITY,
            note: "Musytari berputar paling laju antara semua planet.",
          },
          {
            id: "satellites",
            label: "Bilangan satelit semula jadi",
            values: SATELLITES,
            note: "Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Bumi mempunyai satu, iaitu Bulan.",
          },
          {
            id: "atmosphere",
            label: "Kandungan atmosfera utama",
            values: ATMOSPHERE,
            note: "Hanya Bumi mempunyai atmosfera yang kaya dengan oksigen.",
          },
          {
            id: "surface",
            label: "Keadaan permukaan planet",
            values: SURFACE,
            note: "Empat planet gergasi bergas tidak mempunyai permukaan yang keras.",
          },
        ],
      },
      checks: [
        {
          question: "Planet manakah yang terbesar, dan yang manakah terkecil?",
          hint: "Musytari ialah yang terbesar (diameter 142 984 km); Utarid ialah yang terkecil (diameter 4 879 km).",
        },
      ],
    },
    // 9 — Jadual 12.3 Hubungan Suhu
    {
      number: "12.1",
      title: "Hubungan antara Suhu Planet dengan Matahari — Jadual 12.3",
      conceptQuestion: "Bagaimanakah Suhu Sesuatu Planet Berkait dengan Jaraknya dari Matahari?",
      intro:
        "Secara teorinya, **planet yang lebih dekat dengan Matahari menerima lebih banyak haba**. Tetapi lihat dengan lebih dekat: situasi sebenar adalah lebih kompleks, kerana atmosfera sesebuah planet mengubah berapa banyak haba yang sebenarnya diperangkap.",
      planetComparison: {
        title: "Jarak dan suhu purata permukaan",
        instruction:
          "Bandingkan jarak setiap planet dari Matahari dengan suhu purata permukaannya.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "distance",
            label: "Jarak dari Matahari",
            unit: "juta km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Disusun dari yang paling dekat kepada yang paling jauh.",
          },
          {
            id: "temperature",
            label: "Suhu purata permukaan",
            unit: "°C",
            values: TEMPERATURE,
            note: "Zuhrah — planet kedua, bukan yang paling dekat — mempunyai suhu purata permukaan yang tertinggi antara kelapan-lapan planet.",
          },
        ],
      },
      accordions: [
        {
          title: "☿️ Utarid — planet tanpa atmosfera",
          body: "Sinaran Matahari terus sampai ke permukaannya, menyebabkan bahagian yang menghadap Matahari sangat panas, iaitu melebihi **427 °C**. Bahagian yang gelap pula sangat sejuk, iaitu suhu boleh menurun sehingga **−173 °C**.",
        },
        {
          title: "♀️ Zuhrah — anomali suhu",
          body: "Zuhrah mempunyai awan tebal yang memantulkan sinaran Matahari, tetapi lapisan atmosferanya yang kebanyakannya karbon dioksida menyebabkan **kesan rumah hijau**. Banyak haba diperangkap, jadi suhu permukaan boleh mencapai 462 °C — **lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari**.",
        },
        {
          title: "🌍 Bumi — keseimbangan antara perangkap dan pantulan",
          body: "Atmosfera Bumi memerangkap sebahagian haba, mengekalkan permukaan cukup panas untuk hidupan, sementara awan memantulkan sebahagian sinaran Matahari terus ke angkasa lepas. Keseimbangan ini menyumbang kepada julat suhu Bumi yang sederhana.",
        },
        {
          title: "♂️ Marikh — atmosfera bertekanan rendah",
          body: "Walaupun mempunyai atmosfera, tekanan permukaannya sangat rendah berbanding Bumi (**kurang daripada 1/100 tekanan Bumi**), jadi kesannya pada suhu permukaan adalah sedikit. Suhu boleh berbeza antara −143 °C hingga 35 °C.",
        },
        {
          title: "🪐 Planet gergasi bergas",
          body: "Musytari, Zuhal, Uranus dan Neptun mempunyai permukaan yang dilitupi gas. Planet-planet ini amat jauh dari Matahari dan menerima sinaran Matahari yang agak sedikit, maka suhu permukaannya sangat rendah.",
        },
      ],
      checks: [
        {
          question:
            "Aisyah berkata Utarid ialah planet paling panas kerana ia paling dekat dengan Matahari. Adakah dia betul?",
          hint: "Tidak. Zuhrah ialah planet yang paling panas kerana atmosfera karbon dioksidanya yang tebal memerangkap haba melalui kesan rumah hijau — lebih dekat dengan Matahari tidak semestinya lebih panas.",
        },
      ],
    },
    // 10 — Jadual 12.4 Ketumpatan dan Tarikan Graviti
    {
      number: "12.1",
      title: "Hubungan antara Ketumpatan dan Tarikan Graviti Planet — Jadual 12.4",
      conceptQuestion: "Bagaimanakah Ketumpatan dan Tarikan Graviti Berkait?",
      intro:
        "Tarikan graviti di permukaan sesuatu planet **bergantung pada jisim dan ketumpatan planet itu**.",
      planetComparison: {
        title: "Ketumpatan dan tarikan graviti",
        instruction: "Bandingkan ketumpatan setiap planet dengan tarikan gravitinya.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "density",
            label: "Ketumpatan",
            unit: "g cm⁻³",
            values: DENSITY,
            note: "Empat planet gergasi bergas mempunyai ketumpatan yang jauh lebih rendah daripada empat planet berbatu.",
          },
          {
            id: "gravity",
            label: "Tarikan graviti",
            unit: "m s⁻²",
            values: GRAVITY,
            note: "Tarikan graviti tidak bergantung pada ketumpatan sahaja — ia bergantung pada jisim dan ketumpatan bersama-sama.",
          },
        ],
      },
      cards: [
        {
          title: "Ketumpatan dan tarikan graviti",
          body: "Tarikan graviti Utarid dan Marikh lebih rendah daripada Bumi kerana jisim planet yang rendah. Tarikan graviti Zuhrah hampir sama dengan Bumi kerana jisimnya hampir sama. Tarikan graviti Musytari sangat tinggi berbanding Bumi kerana jisimnya yang sangat tinggi walaupun ketumpatannya sangat rendah. Walaupun Zuhal, Uranus dan Neptun mempunyai jisim yang sangat tinggi, tarikan graviti planet-planet ini **tidak terlalu tinggi berbanding Bumi** kerana planet gergasi bergas mempunyai ketumpatan yang rendah.",
          detail: "Tarikan graviti Bumi ialah 9.8 m s⁻².",
        },
      ],
      checks: [
        {
          question:
            "Mengapakah tarikan graviti Musytari jauh lebih tinggi daripada Bumi, walaupun ketumpatan Musytari rendah?",
          hint: "Tarikan graviti bergantung pada jisim selain ketumpatan. Jisim Musytari yang sangat besar (hampir 320 kali jisim Bumi) menjadikan tarikan gravitinya sangat kuat walaupun ketumpatannya rendah.",
        },
      ],
    },
    // 11 — Jadual 12.5 Jarak, Masa dan Kelajuan
    {
      number: "12.1",
      title: "Hubungan antara Jarak, Masa dan Kelajuan — Jadual 12.5",
      conceptQuestion: "Bagaimanakah Jarak, Masa Peredaran dan Kelajuan Putaran Berkait?",
      intro:
        "**Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit.** Utarid paling dekat dengan Matahari, maka ia mengambil masa 88 hari sahaja untuk satu orbit; Neptun, planet yang paling jauh, mengambil masa 164.8 tahun.",
      planetComparison: {
        title: "Jarak, masa peredaran dan kelajuan putaran",
        instruction:
          "Bandingkan jarak, masa peredaran mengelilingi Matahari, dan kelajuan putaran setiap planet.",
        planets: PLANET_NAMES,
        earth: "Bumi",
        characteristics: [
          {
            id: "distance",
            label: "Jarak dari Matahari",
            unit: "A.U.",
            values: DISTANCE_AU,
            note: "Disusun dari yang paling dekat kepada yang paling jauh.",
          },
          {
            id: "orbit-period",
            label: "Masa peredaran mengelilingi Matahari",
            values: ORBIT_PERIOD,
            note: "Utarid: 88 hari. Neptun: 164.8 tahun.",
          },
          {
            id: "rotation-velocity",
            label: "Kelajuan putaran",
            unit: "km/j",
            values: ROTATION_VELOCITY,
            note: "Kelajuan satu titik pada permukaan planet itu sendiri semasa planet berputar.",
          },
        ],
      },
      checks: [
        {
          question:
            "Manakah lebih lama: peredaran Utarid mengelilingi Matahari, atau peredaran Neptun?",
          hint: "Peredaran Neptun. Utarid beredar dalam 88 hari; Neptun, planet paling jauh, mengambil masa 164.8 tahun.",
        },
      ],
    },
    // 12 — Arah Putaran Planet
    {
      number: "12.1",
      title: "Arah Putaran Planet",
      conceptQuestion: "Ke Arah Manakah Planet-planet Berputar?",
      intro: "Semua planet berputar dari barat ke timur **kecuali Zuhrah dan Uranus**.",
      planetAxialTilt: {
        title: "Paksi putaran setiap planet",
        instruction: "Ketuk sebuah planet untuk melihat kecondongan paksi dan arah putarannya.",
        planets: AXIAL_TILT_BM,
        ruleLabel: "Kebanyakan planet berputar dari barat ke timur.",
        scaleNote: "Rajah tidak mengikut skala sebenar.",
      },
      tabs: [
        {
          title: "Kebanyakan planet",
          body: "Berputar dari barat ke timur. Kerana Bumi berputar dari barat ke timur, kita melihat **Matahari terbit di timur dan terbenam di barat**.",
        },
        {
          title: "Zuhrah",
          body: "Berputar dari timur ke barat — arah bertentangan dengan Bumi. Hal ini bermakna di Zuhrah, **Matahari akan terbit dari barat**.",
        },
        {
          title: "Uranus",
          body: "Berputar pada sisinya — **paksi putarannya condong hampir selari dengan orbitnya** yang mengelilingi Matahari.",
        },
      ],
      checks: [
        {
          question: "Dua planet manakah yang tidak berputar dari barat ke timur?",
          hint: "Zuhrah, yang berputar dari timur ke barat, dan Uranus, yang berputar pada sisinya kerana kecondongan paksinya yang melampau.",
        },
      ],
    },
    // 13 — Situasi Hipotetikal
    {
      number: "12.1",
      title: "Situasi Hipotetikal Berkaitan Sistem Suria",
      conceptQuestion:
        "Apakah Akan Berlaku Jika Bumi Berputar Lebih Perlahan atau Berhenti Berputar?",
      intro:
        "Berdasarkan pemahaman mengenai sistem suria, kesan perubahan putaran boleh diramalkan berdasarkan apa yang kita sudah tahu tentang siang, malam dan pasang surut.",
      cards: [
        {
          title: "🌗 Jika Bumi berputar perlahan atau berhenti berputar",
          body: "**Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut.** Jika Bumi berputar perlahan atau berhenti berputar: waktu siang dan malam menjadi panjang di dua bahagian Bumi yang berbeza; kawasan gurun bertambah pada bahagian Bumi yang menghadap Matahari; waktu berlaku pasang surut air berubah; dan suhu pada bahagian Bumi yang tidak disinari Matahari akan menjadi sangat dingin.",
        },
      ],
      checks: [
        {
          question: "Ramalkan dua kemungkinan yang akan berlaku jika Bumi berhenti berputar.",
          hint: "Antaranya: waktu siang dan malam yang panjang di dua bahagian Bumi yang berbeza, pertambahan kawasan gurun pada bahagian yang menghadap Matahari, perubahan waktu pasang surut, dan suhu yang sangat dingin pada bahagian yang tidak disinari Matahari.",
        },
      ],
    },
    // 14 — Satelit Semula Jadi
    {
      number: "12.1",
      title: "Satelit Semula Jadi",
      conceptQuestion: "Apakah Satelit Semula Jadi?",
      intro:
        "**Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri.** Bulan ialah satelit semula jadi Bumi.",
      accordions: [
        {
          title: "🌙 Mengapakah terdapat planet yang mempunyai dua bulan atau lebih?",
          body: "Bincangkan berdasarkan data dalam Jadual 12.2. Utarid dan Zuhrah tidak mempunyai satelit semula jadi, Bumi mempunyai satu, Marikh dua (Phobos dan Deimos), manakala Musytari 67, Zuhal 62, Uranus 27 dan Neptun 14. Perhatikan hubungan antara bilangan satelit dengan saiz, jisim dan tarikan graviti planet itu, kemudian nyatakan penaakulan anda.",
        },
      ],
      checks: [
        {
          question: "Apakah satelit semula jadi? Berikan satu contoh.",
          hint: "Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Bulan ialah satelit semula jadi Bumi.",
        },
      ],
    },
    // 15 — Sistem Bumi–Bulan
    {
      number: "12.1",
      title: "Sistem Bumi–Bulan",
      conceptQuestion: "Bagaimanakah Rupa Bumi Jika Dilihat dari Bulan?",
      intro:
        "Bulan berputar pada paksinya dan pada masa yang sama beredar mengelilingi Bumi. Kedua-dua tempoh ini lebih kurang sama — kira-kira 27 hari.",
      accordions: [
        {
          title: "🌍 Jika anda berada di Bulan, bagaimanakah rupa bentuk Bumi?",
          body: "Gunakan maklumat berikut untuk menaakul. Bulan berputar pada paksinya dan pada masa yang sama beredar mengelilingi Bumi pada orbitnya. Tempoh masa putaran Bulan pada paksinya dan peredarannya mengelilingi Bumi adalah sama, iaitu **lebih kurang 27 hari**. Oleh itu, **permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa**. Saiz Bumi pula adalah empat kali ganda berbanding saiz Bulan.",
        },
        {
          title: "🌗 Adakah Bumi kelihatan mempunyai fasa jika dilihat dari Bulan?",
          body: "Ini adalah soalan untuk dibincangkan. Gunakan apa yang anda tahu tentang kedudukan Matahari, Bumi dan Bulan, serta bagaimana bahagian yang disinari Matahari berubah semasa Bulan beredar mengelilingi Bumi. Bentangkan penaakulan kumpulan anda dan bandingkan dengan kumpulan lain.",
        },
      ],
      checks: [
        {
          question: "Mengapakah permukaan Bulan yang sama sentiasa menghadap ke arah Bumi?",
          hint: "Putaran Bulan pada paksinya dan peredarannya mengelilingi Bumi mengambil tempoh masa yang sama — kira-kira 27 hari — maka permukaan Bulan yang sama sentiasa menghadap kita.",
        },
      ],
    },
    // 16 — Bumi sebagai Planet untuk Hidupan
    {
      number: "12.1",
      title: "Bumi sebagai Planet untuk Hidupan",
      conceptQuestion: "Mengapakah Bumi Boleh Menampung Kehidupan?",
      intro:
        "Setakat ini, **Bumi merupakan satu-satunya planet yang mempunyai hidupan**. Kesesuaian Bumi untuk hidupan bergantung pada beberapa ciri — diterokai satu demi satu seterusnya.",
      checks: [
        {
          question: "Setakat ini, planet manakah sahaja yang diketahui menampung hidupan?",
          hint: "Bumi.",
        },
      ],
    },
    // 17 — Ciri-ciri Bumi
    {
      number: "12.1",
      title: "Ciri-ciri Bumi",
      conceptQuestion: "Apakah Ciri-ciri yang Menjadikan Bumi Sesuai untuk Hidupan?",
      intro:
        "Bumi dapat menampung hidupan akibat beberapa ciri seperti kehadiran air, sumber mineral, suhu permukaan dan kandungan atmosferanya.",
      ch12SpotlightFigure: {
        title: "Terokai ciri-ciri Bumi",
        figure: "earth-characteristics",
        src: SCIENCE_F2_CH12_IMAGES.earthCharacteristics,
        alt: "Bumi di tengah-tengah enam bulatan: seorang budak berdiri di atas Bumi di sebelah batu yang ditarik ke arah tanah; titisan air di atas laut; cahaya matahari sampai ke atmosfera Bumi; seorang budak menghirup udara, dengan peparunya ditunjukkan; anak pokok yang tumbuh di bawah cahaya matahari; dan termometer di antara padang pasir yang panas dan gunung bersalji.",
        instruction: "Pilih satu ciri, atau tekan bulatannya pada gambar.",
        prompt: "Pilih satu ciri untuk melihat kepentingannya kepada hidupan.",
        concepts: [
          {
            id: "gravity",
            icon: "⚖️",
            label: "Tarikan graviti",
            note: "Mempunyai tarikan graviti yang menarik objek ke arah Bumi supaya tidak melayang ke angkasa lepas.",
          },
          {
            id: "water",
            icon: "💧",
            label: "Kandungan air",
            note: "Mempunyai kandungan air yang banyak untuk semua keperluan hidupan.",
          },
          {
            id: "oxygen",
            icon: "🌬️",
            label: "Kandungan oksigen",
            note: "Mempunyai kandungan oksigen yang tinggi untuk proses respirasi.",
          },
          {
            id: "sunlight",
            icon: "☀️",
            label: "Cahaya matahari",
            note: "Menerima cahaya matahari untuk proses fotosintesis tumbuhan.",
          },
          {
            id: "atmosphere",
            icon: "🛡️",
            label: "Atmosfera pelindung",
            note: "Mempunyai atmosfera yang menghalang sinar-sinar ultraungu yang berbahaya daripada sampai ke Bumi. Cahaya matahari masih sampai ke permukaan Bumi — atmosfera tidak memantulkan semua cahaya matahari.",
          },
          {
            id: "temperature",
            icon: "🌡️",
            label: "Julat suhu yang sesuai",
            note: "Mempunyai julat suhu yang sesuai, iaitu tidak terlalu panas atau terlalu sejuk.",
          },
        ],
      },
      checks: [
        {
          question: "Namakan tiga ciri Bumi yang menjadikannya sesuai untuk hidupan.",
          hint: "Antaranya: tarikan graviti, kandungan air yang banyak, kandungan oksigen yang tinggi, cahaya matahari, atmosfera pelindung dan julat suhu yang sesuai.",
        },
        {
          question:
            "Zuhrah dianggap sebagai planet kembar Bumi kerana saiz, jisim, isi padu dan ketumpatannya yang hampir sama. Mengapakah planet ini berkemungkinan tidak mempunyai hidupan?",
          hint: "Atmosfera Zuhrah kebanyakannya karbon dioksida dan menyebabkan kesan rumah hijau yang melampau, menjadikan suhu permukaannya terlalu panas untuk hidupan.",
        },
      ],
    },
    // 18 — Cintai Bumi Kita
    {
      number: "12.1",
      title: "Cintai Bumi Kita",
      conceptQuestion: "Mengapa Kita Perlu Mencintai Bumi Kita?",
      intro:
        "Kehidupan manusia amat bergantung kepada sumber tanah dan air di Bumi untuk makanan, air, tempat tinggal dan semua keperluan asas yang lain.",
      cards: [
        {
          title: "🌍 Penduduk yang semakin bertambah, tekanan yang semakin meningkat",
          body: "Apabila jumlah penduduk dunia terus bertambah, tekanan ke atas sumber tanah dan air Bumi turut semakin meningkat. Lebih ramai penduduk memerlukan lebih banyak makanan, air, tanah untuk didiami dan sumber-sumber lain secara keseluruhannya.",
          detail:
            "Tekanan yang semakin meningkat inilah yang menjadikan pengukuran kesan kita terhadap sumber Bumi — jejak ekologi — amat penting.",
        },
      ],
      checks: [
        {
          question: "Mengapakah pertumbuhan penduduk meningkatkan tekanan terhadap sumber Bumi?",
          hint: "Lebih ramai penduduk memerlukan lebih banyak makanan, air, tanah dan sumber-sumber lain, jadi apabila penduduk bertambah, permintaan terhadap sumber tanah dan air Bumi turut bertambah.",
        },
      ],
    },
    // 19 — Jejak Ekologi
    {
      number: "12.1",
      title: "Jejak Ekologi",
      conceptQuestion: "Apakah Jejak Ekologi?",
      intro:
        "**Jejak ekologi** ialah ukuran kemampuan air dan tanah menyediakan sumber yang diperlukan oleh manusia (makanan, minuman, kediaman dan lain-lain), bersama kemampuan Bumi untuk menyerap semua bahan buangan manusia lalu menghasilkan semula sumber sesudah mereka menggunakannya.",
      cards: [
        {
          title: "⚠️ Apabila jejak ekologi terlalu besar",
          body: "**Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber.** Sebagai pengguna yang berhemah, setiap individu berperanan menguruskan alam dan mengurangkan jejak ekologi masing-masing.",
          detail: "Jejak ekologi berbeza daripada sebuah negara dengan negara yang lain.",
        },
      ],
      accordions: [
        {
          title: "🏭 Jejak karbon",
          body: "Kawasan yang diperlukan untuk menyerap pelepasan karbon daripada penggunaan tenaga.",
        },
        {
          title: "🏘️ Kawasan binaan",
          body: "Kawasan tanah yang digunakan untuk penempatan dan pembinaan.",
        },
        { title: "🌳 Hutan", body: "Kawasan hutan yang membekalkan kayu dan kertas." },
        {
          title: "🌾 Kawasan pertanian",
          body: "Kawasan tanaman yang membekalkan makanan dan sumber gentian.",
        },
        {
          title: "🐄 Kawasan penternakan",
          body: "Kawasan ternakan yang membekalkan makanan dan sumber gentian daripada haiwan.",
        },
        { title: "🐟 Kawasan perikanan", body: "Kawasan perairan yang membekalkan makanan laut." },
      ],
      checks: [
        {
          question: "Apakah jejak ekologi?",
          hint: "Ukuran sejauh mana permintaan manusia menggunakan sumber tanah dan air Bumi — serta keupayaannya menyerap bahan buangan dan menghasilkan semula sumber.",
        },
        {
          question:
            "Apakah akan berlaku jika jejak ekologi sesuatu penduduk melebihi kemampuan Bumi untuk memperbaharui sumbernya?",
          hint: "Bumi akan kehabisan sumber.",
        },
      ],
    },
    // 20 — Mengurangkan Jejak Ekologi
    {
      number: "12.1",
      title: "Mengurangkan Jejak Ekologi",
      conceptQuestion: "Bagaimanakah Kita Boleh Mengurangkan Jejak Ekologi?",
      intro:
        "Setiap individu, sebagai pengguna yang berhemah, boleh mengambil langkah praktikal untuk mengurangkan jejak ekologi masing-masing.",
      cards: [
        {
          title: "♻️ Langkah yang boleh diambil oleh pengguna",
          body: "Kurangkan, guna semula dan kitar semula sisa isi rumah. Jimatkan penggunaan air dan elektrik di rumah. Pilih berjalan kaki, berbasikal atau pengangkutan awam berbanding kenderaan persendirian jika boleh. Beli hanya apa yang diperlukan, dan pilih makanan tempatan atau yang dihasilkan secara lestari.",
        },
        {
          title: "🌱 Mengapa mengurangkan jejak ekologi kita penting",
          body: "Mengurangkan jejak ekologi kita melambatkan kehabisan sumber Bumi, memberi lebih masa untuk sumber itu pulih semula. Ia melindungi sumber untuk generasi akan datang dan membantu mengekalkan keseimbangan antara apa yang digunakan oleh manusia dengan apa yang boleh diperbaharui oleh Bumi.",
        },
      ],
      checks: [
        {
          question:
            "Berikan dua langkah yang boleh diambil oleh pengguna untuk mengurangkan jejak ekologi.",
          hint: "Antaranya: kurangkan, guna semula dan kitar semula sisa; jimatkan air dan elektrik; gunakan pengangkutan awam, berjalan kaki atau berbasikal berbanding memandu; beli hanya apa yang diperlukan.",
        },
        {
          question: "Mengapa penting untuk kita mengurangkan jejak ekologi?",
          hint: "Supaya sumber Bumi tidak digunakan lebih cepat daripada ia boleh pulih semula, melindunginya untuk generasi akan datang.",
        },
      ],
    },
    // 21 — Latihan Formatif 12.1
    {
      number: "12.1",
      title: "Latihan Formatif 12.1",
      checksTitle: "Jawab soalan-soalan berikut",
      checks: [
        {
          question:
            "Mengapakah A.U. dan ly digunakan untuk menyatakan jarak dalam sistem suria, berbanding km?",
          hint: "Jarak planet dan bintang dari Matahari amat besar, jadi kilometer menjadi tidak praktikal — A.U. dan tahun cahaya memberikan nombor yang lebih mudah diuruskan.",
        },
        {
          question: "Planet manakah paling dekat dengan Matahari?",
          hint: "Utarid, iaitu kira-kira 57.9 juta kilometer dari Matahari.",
        },
        {
          question: "Apakah hubungan antara suhu permukaan planet dengan jaraknya dari Matahari?",
          hint: "Secara teorinya planet yang lebih dekat menerima lebih banyak haba, tetapi atmosfera planet boleh mengubah suhu permukaannya — seperti Zuhrah yang paling panas walaupun bukan yang paling dekat.",
        },
        {
          question: "Planet manakah mempunyai tarikan graviti paling kuat, dan mengapa?",
          hint: "Musytari — jisimnya yang sangat besar (hampir 320 kali jisim Bumi) memberikannya tarikan graviti paling kuat, walaupun ketumpatannya rendah.",
        },
        {
          question: "Dua planet manakah yang tidak berputar dari barat ke timur?",
          hint: "Zuhrah (berputar dari timur ke barat) dan Uranus (berputar pada sisinya).",
        },
        {
          question: "Ramalkan satu kesan jika Bumi berhenti berputar.",
          hint: "Antaranya: siang dan malam yang sangat panjang di dua bahagian Bumi yang berbeza, lebih banyak kawasan gurun pada bahagian yang menghadap Matahari, perubahan waktu pasang surut, atau suhu yang sangat dingin pada bahagian yang tidak disinari.",
        },
        {
          question: "Namakan tiga ciri yang menjadikan Bumi sesuai untuk hidupan.",
          hint: "Antaranya: tarikan graviti, kandungan air yang banyak, kandungan oksigen yang tinggi, cahaya matahari, atmosfera pelindung, dan julat suhu yang sesuai.",
        },
        {
          question: "Apakah jejak ekologi, dan mengapa kita perlu menguranginya?",
          hint: "Ukuran permintaan manusia terhadap sumber Bumi berbanding kemampuan Bumi untuk memperbaharuinya. Menguranginya membantu mengelakkan kehabisan sumber Bumi.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membandingkan jarak planet dalam sistem suria dari Matahari menggunakan unit astronomi (A.U.) dan tahun cahaya (ly).",
    "Saya boleh membina jadual untuk membandingkan dan membezakan antara planet dalam sistem suria dengan Bumi.",
    "Saya boleh meneroka hubungan berdasarkan ciri planet dan menerangkan hubungan tersebut termasuk anomali yang mungkin wujud.",
    "Saya boleh menaakul dan menganalogikan situasi hipotetikal berkaitan dengan sistem suria.",
    "Saya boleh menjustifikasikan Bumi sebagai planet yang paling sesuai untuk hidupan berdasarkan data tentang Bumi, dan menerangkan jejak ekologi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "Betul atau salah: Zuhrah ialah planet paling panas dalam sistem suria, walaupun Utarid lebih hampir dengan Matahari.",
      answer: true,
      explanation:
        "Betul — atmosfera karbon dioksida Zuhrah yang tebal memerangkap haba melalui kesan rumah hijau, manakala Utarid langsung tiada atmosfera.",
    },
    {
      type: "multiple-choice",
      question: "Planet manakah berputar pada sisinya, hampir selari dengan orbitnya?",
      options: ["Zuhrah", "Uranus", "Zuhal", "Marikh"],
      answerIndex: 1,
      explanation:
        "Uranus — semua planet berputar dari barat ke timur kecuali Zuhrah (timur ke barat) dan Uranus (berputar pada sisinya).",
    },
  ],
};
