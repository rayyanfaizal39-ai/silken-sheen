import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch8-daya-gerakan.png";

export const scienceF2C8InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 8,
  blogHighlight: {
    title: "Blog Sains — Daya Ada di Mana-Mana",
    body: "Berjalan, mengunyah, menendang bola, menarik tali dalam tarik tali — semua ini adalah daya yang bertindak. Anda tidak dapat melihatnya, tetapi anda sentiasa dapat merasai kesannya.",
    imagePath: chapterImage,
  },
  keywords: [
    "Daya",
    "Daya graviti",
    "Daya geseran",
    "Daya normal",
    "Daya kenyal",
    "Daya apungan",
    "Berat",
    "Titik aplikasi",
    "Neraca spring",
    "Daya tindakan",
    "Daya tindak balas",
    "Tuas",
    "Fulkrum",
    "Momen daya",
    "Tekanan",
    "Tekanan atmosfera",
    "Newton (N)",
  ],
  sections: [
    {
      number: "8.1",
      title: "Jenis-jenis Daya",
      intro:
        "Daya ialah tarikan atau tolakan yang dikenakan ke atas sesuatu objek. Daya tidak dapat dilihat, tetapi kesannya sentiasa boleh diperhatikan. Hampir semua aktiviti harian melibatkan daya — membuka tin makanan, menekan suis, membuka pintu. Tekan setiap jenis daya di bawah untuk mengenalinya.",
      flipCards: [
        { id: "gravitational", icon: "🌍", label: "Daya graviti", fact: "Menarik setiap objek ke arah pusat Bumi — yang membawa bola yang dilontar jatuh semula." },
        { id: "weight", icon: "⚖️", label: "Berat", fact: "Daya tarikan graviti yang bertindak ke atas jisim sesuatu objek." },
        { id: "normal", icon: "🧱", label: "Daya normal", fact: "Daya sentuhan permukaan yang menolak balik apabila sesuatu objek bersandar padanya." },
        { id: "frictional", icon: "🌀", label: "Daya geseran", fact: "Merintangi pergerakan antara dua permukaan yang bersentuhan, sentiasa bertindak bertentangan dengan arah gerakan." },
        { id: "elastic", icon: "🔗", label: "Daya kenyal", fact: "Wujud dalam spring atau bahan yang diregang atau dimampat." },
        { id: "buoyant", icon: "🛟", label: "Daya apungan", fact: "Tujahan ke atas yang dikenakan oleh bendalir ke atas objek yang terapung atau terendam di dalamnya." },
      ],
      checks: [
        { question: "Seorang peloncat bungee melompat dari sebuah platform. Daya manakah yang menariknya ke bawah?", hint: "Daya graviti — daya yang sama yang menarik semula sebarang objek yang dilontar ke Bumi." },
        { question: "Sebuah basikal bergerak di atas permukaan yang kasar dan cepat perlahan. Daya apakah yang bertindak?", hint: "Daya geseran, yang bertindak bertentangan dengan arah gerakan basikal itu." },
      ],
    },
    {
      number: "8.1",
      title: "Magnitud, Arah dan Titik Aplikasi",
      intro:
        "Daya ialah kuantiti vektor: setiap daya mempunyai magnitud (kekuatan), arah, dan titik aplikasi (tempat tepat daya itu dikenakan). Kerana itu daya dilukis sebagai anak panah — panjang anak panah menunjukkan magnitud, mata anak panah menunjukkan arah, dan pangkalnya terletak pada titik aplikasi.",
      forceDiagram: {
        title: "➡️ Melukis daya sebagai anak panah",
        instruction: "Tekan setiap contoh untuk melihat di mana daya itu dikenakan.",
        magnitudeLabel: "Panjang anak panah = magnitud",
        directionLabel: "Mata anak panah = arah",
        applicationLabel: "Pangkal anak panah = titik aplikasi",
        examples: [
          {
            id: "box",
            label: "Menolak kotak",
            magnitude: "10 N",
            applicationPoint: "pada bahagian tangan yang menyentuh kotak itu",
            note: "Satu daya tolakan bermagnitud 10 N bertindak pada kotak, dalam arah yang ditunjukkan oleh anak panah.",
          },
          {
            id: "nail",
            label: "Mencabut paku dengan tukul",
            magnitude: "15 N",
            applicationPoint: "pada bahagian hujung tukul yang mencengkam paku itu",
            note: "Daya bermagnitud 15 N bertindak ke atas untuk menanggalkan paku dari permukaan meja.",
          },
        ],
        caption: "Anak panah yang lebih panjang bermakna daya yang lebih besar.",
        hint: "Pilih satu contoh untuk melihat magnitud, arah dan titik aplikasinya.",
      },
      cards: [
        {
          title: "Mengukur daya",
          body: "Daya diukur dengan neraca spring, yang beroperasi berdasarkan prinsip pemanjangan spring. Kekuatan daya dibaca daripada skala pada neraca itu.",
          detail: "Neraca spring juga digunakan untuk mengukur berat jasad dan daya geseran.",
        },
        {
          title: "Unit daya",
          body: "Unit S.I. bagi daya ialah newton (N). Di Bumi, objek berjisim 100 g mempunyai berat 1 N — jadi objek berjisim 1 kg mempunyai berat 10 N.",
        },
      ],
      checks: [
        { question: "Seorang lelaki menolak sebuah kereta. Di manakah titik aplikasi daya tolakan itu?", hint: "Pada bahagian tangannya yang bersentuhan dengan kereta itu — di situlah daya dikenakan." },
        { question: "Sebuah objek berjisim 2 kg digantung pada neraca spring di Bumi. Apakah bacaan beratnya?", hint: "20 N, kerana setiap 1 kg mempunyai berat 10 N." },
      ],
    },
    {
      number: "8.1",
      title: "Daya Tindakan dan Daya Tindak Balas",
      intro:
        "Bagi setiap daya tindakan, wujud satu daya tindak balas yang sama magnitud tetapi bertentangan arah. Tiga situasi di bawah menunjukkan pasangan daya ini dengan jelas.",
      accordions: [
        {
          title: "📖 Jasad yang kekal di atas meja",
          body: "Berat buku (daya tindakan) menarik ke bawah. Pada masa yang sama, daya normal meja (daya tindak balas) menolak ke atas dengan magnitud yang sama. Buku kekal pegun kerana kedua-dua magnitud itu sama.",
        },
        {
          title: "🪵 Jasad yang terapung di atas air",
          body: "Berat bongkah (daya tindakan) menarik ke bawah. Daya apungan (daya tindak balas) menolak ke atas dengan magnitud yang sama. Objek itu terapung kerana kedua-dua magnitud itu sama.",
        },
        {
          title: "🚃 Dua troli yang dilepaskan",
          body: "Troli pertama mengenakan daya kenyal pada troli kedua — itulah daya tindakan. Pada masa yang sama, troli kedua mengenakan daya yang sama magnitud tetapi bertentangan arah pada troli pertama — itulah daya tindak balas. Selepas dilepaskan, kedua-dua troli bergerak ke arah bertentangan dengan jarak yang sama.",
        },
      ],
      checks: [
        { question: "Sebuah buku kekal pegun di atas meja. Namakan pasangan daya tindakan dan daya tindak balas itu.", hint: "Berat buku (daya tindakan) dan daya normal meja (daya tindak balas) — sama magnitud, bertentangan arah." },
        { question: "Dua troli yang bersentuhan dilepaskan. Mengapakah kedua-duanya bergerak sejauh yang sama?", hint: "Kerana setiap troli mengenakan daya yang sama magnitud pada troli yang satu lagi, tetapi dalam arah yang bertentangan." },
      ],
    },
    {
      number: "8.2",
      title: "Kesan Daya",
      intro:
        "Daya tidak dapat dilihat secara langsung, tetapi kesannya sentiasa dapat dikesan. Terdapat lima kesan utama tindakan daya.",
      flipCards: [
        { id: "moves", icon: "▶️", label: "Menggerakkan objek pegun", fact: "Tolak kereta mainan yang diam dan ia mula bergerak." },
        { id: "stops", icon: "⏹️", label: "Menghentikan objek bergerak", fact: "Daya dari arah bertentangan memberhentikan kereta mainan yang sedang bergerak." },
        { id: "speed", icon: "⚡", label: "Mengubah kelajuan", fact: "Daya dari arah yang sama mempercepatkan gerakan; daya bertentangan memperlahankannya." },
        { id: "direction", icon: "↩️", label: "Mengubah arah gerakan", fact: "Daya dari sisi mengubah haluan kereta mainan yang bergerak." },
        { id: "shape", icon: "🔄", label: "Mengubah bentuk atau saiz", fact: "Menekan sekeping plastisin mengubah bentuknya." },
      ],
      checks: [
        { question: "Seorang penjaga gol menahan bola yang ditendang ke arahnya. Apakah kesan daya yang ditunjukkan?", hint: "Daya itu menghentikan objek yang sedang bergerak." },
        { question: "Sekeping plastisin ditekan sehingga menjadi leper. Apakah kesan daya di sini?", hint: "Daya mengubah bentuk objek itu." },
      ],
    },
    {
      number: "8.2",
      title: "Keapungan dan Ketumpatan",
      intro:
        "Daya apungan ialah tujahan ke atas yang dikenakan oleh cecair terhadap objek di dalamnya. Daya apungan boleh ditentukan dengan neraca spring, dengan membandingkan berat objek di udara dengan beratnya semasa terendam.",
      buoyancySchematic: {
        title: "🌊 Menentukan daya apungan dengan neraca spring",
        instruction: "Tekan setiap keadaan untuk melihat daya yang bertindak.",
        realWeightLabel: "Berat sebenar di udara",
        apparentWeightLabel: "Berat ketara dalam air",
        buoyantForceLabel: "Mengukur daya apungan",
        formula: "Daya apungan = Berat sebenar − Berat ketara. Berat sebenar ialah berat objek di udara; berat ketara ialah berat objek semasa terendam di dalam cecair.",
        realWeight: "10 N",
        apparentWeight: "6 N",
        buoyantForce: "Daya apungan = 10 N − 6 N = 4 N",
        floatingNote: "Terapung — objek yang terapung berada dalam keseimbangan: daya apungan ke atas adalah SAMA dengan beratnya ke bawah. Objek kurang tumpat daripada cecair itu.",
        sinkingNote: "Tenggelam — daya apungan tidak cukup untuk menampung berat objek, jadi daya apungan KURANG daripada berat. Objek lebih tumpat daripada cecair itu.",
        caption: "Perbezaan antara dua bacaan neraca spring itulah daya apungan.",
        hint: "Pilih satu keadaan untuk melihat daya yang bertindak.",
      },
      buoyancy: {
        title: "🪵 Mengapa sesetengah bahan terapung dan yang lain tenggelam?",
        instruction: "Bandingkan ketumpatan setiap bahan dengan ketumpatan air (1.0 g/cm³).",
        materials: [
          { id: "cork", label: "Gabus", icon: "🪵", density: 0.24 },
          { id: "wood", label: "Kayu", icon: "🪑", density: 0.6 },
          { id: "iron", label: "Besi", icon: "⚙️", density: 7.9 },
          { id: "gold", label: "Emas", icon: "🥇", density: 19.3 },
        ],
      },
      cards: [
        {
          title: "Ketumpatan menentukan terapung atau tenggelam",
          body: "Objek yang kurang tumpat daripada cecair akan terapung; objek yang lebih tumpat daripada cecair akan tenggelam. Gabus (0.24 g cm⁻³) terapung di atas air (1.0 g cm⁻³), manakala besi (7.9 g cm⁻³) tenggelam.",
        },
        {
          title: "Garisan Plimsoll",
          body: "Kapal kargo ditandakan dengan garisan Plimsoll untuk tujuan keselamatan. Ketumpatan air laut berbeza mengikut suhu dan kepekatan garam di tempat yang berlainan, jadi aras selamat kapal itu turut berbeza.",
          detail: "Tanda pada garisan Plimsoll: TF (air tawar tropika), F (air tawar), T (air laut tropika), S (lautan musim panas), W (lautan musim sejuk) dan WNA (musim sejuk Atlantik Utara).",
        },
      ],
      checks: [
        { question: "Sebuah objek mempunyai berat 12 N di udara dan 9 N semasa terendam. Berapakah daya apungannya?", hint: "3 N. Daya apungan = berat sebenar − berat ketara = 12 N − 9 N." },
        { question: "Sebuah bongkah kayu terapung pegun di atas air. Bandingkan daya apungan dengan beratnya.", hint: "Kedua-duanya sama magnitud — objek yang terapung berada dalam keseimbangan." },
      ],
    },
    {
      number: "8.2",
      title: "Tuas",
      intro:
        "Tuas ialah sebuah palang yang berputar pada satu titik yang tetap. Tuas terdiri daripada tiga bahagian: fulkrum (titik sokongan yang tetap), beban (objek yang hendak digerakkan) dan daya (tolakan atau tarikan yang dikenakan pada palang). Tuas membolehkan kita melakukan kerja dengan lebih mudah, selalunya dengan daya yang lebih kecil.",
      leverClasses: {
        title: "⚖️ Tiga kelas tuas",
        instruction: "Tekan setiap kelas untuk melihat kedudukan fulkrum, beban dan daya.",
        fulcrumLabel: "Fulkrum",
        loadLabel: "Beban",
        effortLabel: "Daya",
        classes: [
          {
            id: "first",
            name: "Tuas kelas pertama",
            middle: "fulcrum",
            examples: "Contoh: gunting, playar, pembuka tin.",
            note: "Fulkrum terletak di antara beban dengan daya.",
          },
          {
            id: "second",
            name: "Tuas kelas kedua",
            middle: "load",
            examples: "Contoh: kereta sorong, pemecah kekeras.",
            note: "Beban terletak di antara fulkrum dengan daya.",
          },
          {
            id: "third",
            name: "Tuas kelas ketiga",
            middle: "effort",
            examples: "Contoh: penyepit ais, joran, forseps.",
            note: "Daya terletak di antara fulkrum dengan beban.",
          },
        ],
        formula: "Beban (N) × Jarak beban dari fulkrum (m) = Daya (N) × Jarak daya dari fulkrum (m)",
        workedExample: {
          title: "Contoh berpandu",
          given: "Sebuah beban 400 N terletak 0.5 m dari fulkrum. Daya dikenakan 2 m dari fulkrum. Berapakah daya yang diperlukan supaya tuas itu seimbang?",
          working: "Beban × jarak beban = Daya × jarak daya → 400 N × 0.5 m = Daya × 2 m → Daya = 200 ÷ 2",
          answer: "Daya = 100 N",
        },
        hint: "Pilih satu kelas tuas untuk melihat susunannya.",
      },
      matcher: {
        title: "🔧 Kelaskan alat mengikut kelas tuas",
        instruction: "Pilih kelas tuas, kemudian pilih alat yang sepadan dengannya.",
        pairs: [
          { id: "first", label: "Kelas pertama — fulkrum di antara beban dengan daya", match: "✂️ Gunting" },
          { id: "second", label: "Kelas kedua — beban di antara fulkrum dengan daya", match: "🛒 Kereta sorong" },
          { id: "third", label: "Kelas ketiga — daya di antara fulkrum dengan beban", match: "🎣 Joran" },
        ],
      },
      checks: [
        { question: "Sebuah kereta sorong tergolong dalam kelas tuas yang manakah, dan mengapa?", hint: "Kelas kedua — bebannya terletak di antara roda (fulkrum) dengan tangan yang mengenakan daya." },
        { question: "Beban 600 N berada 0.4 m dari fulkrum. Daya dikenakan 1.2 m dari fulkrum. Berapakah daya yang diperlukan?", hint: "200 N. 600 N × 0.4 m = 240; 240 ÷ 1.2 m = 200 N." },
      ],
    },
    {
      number: "8.2",
      title: "Momen Daya",
      intro:
        "Daya yang dikenakan pada suatu objek boleh memutarkan objek itu pada satu titik tetap yang dipanggil pangsi atau fulkrum. Kesan putaran yang dihasilkan itu disebut momen daya.",
      momentDiagram: {
        title: "🔩 Momen daya dan jarak tegak",
        instruction: "Tekan setiap situasi untuk melihat jarak yang digunakan dalam pengiraan.",
        formula: "Momen daya = Daya (N) × Jarak tegak dari pangsi ke daya (m)",
        pivotLabel: "Pangsi",
        forceLabel: "Daya",
        distanceLabel: "Jarak tegak",
        perpendicularNote: "Panjang pemegang bukan jarak tegak apabila daya dikenakan secara serong — jarak tegak diukur berserenjang dengan arah daya, jadi ia menjadi lebih pendek.",
        situations: [
          {
            id: "door",
            label: "Membuka pintu",
            note: "Menolak pada tombol yang jauh dari engsel menghasilkan momen daya yang lebih besar, jadi pintu lebih mudah dibuka berbanding menolak berhampiran engsel.",
          },
          {
            id: "spanner",
            label: "Melonggarkan nat",
            note: "Sepana dengan pemegang yang lebih panjang menghasilkan momen daya yang lebih besar untuk daya yang sama. Daya 50 N pada jarak tegak 0.2 m menghasilkan momen 10 N m.",
          },
          {
            id: "angled",
            label: "Daya serong",
            note: "Apabila daya tidak berserenjang dengan pemegang, jarak tegak lebih pendek daripada panjang pemegang — jadi momen daya yang terhasil lebih kecil walaupun daya itu sama.",
          },
        ],
        caption: "Momen daya bertambah apabila daya bertambah, atau apabila jarak tegak bertambah.",
        hint: "Pilih satu situasi untuk melihat jarak tegaknya.",
      },
      calculators: [
        {
          type: "two-field",
          title: "🧮 Kalkulator momen daya",
          instruction: "Momen daya = Daya × jarak tegak dari pangsi. Cuba ubah nilainya dan perhatikan kesannya.",
          fieldA: { label: "Daya", unit: "N", default: 50 },
          fieldB: { label: "Jarak tegak", unit: "m", default: 0.2 },
          operation: "multiply",
          resultLabel: "Momen daya",
          resultUnit: "N m",
        },
      ],
      checks: [
        { question: "Mengapakah lebih mudah membuka pintu dengan menolak pada tombol berbanding berhampiran engsel?", hint: "Jarak tegak dari pangsi lebih besar pada tombol, jadi momen daya yang terhasil lebih besar untuk daya yang sama." },
        { question: "Daya 20 N dikenakan pada jarak tegak 0.3 m dari pangsi. Berapakah momen daya?", hint: "6 N m. Momen daya = 20 N × 0.3 m." },
      ],
    },
    {
      number: "8.2",
      title: "Tekanan",
      intro:
        "Anda boleh menekan paku tekan ke dalam papan, tetapi tidak boleh menekan syiling ke dalam papan walaupun menggunakan daya yang sama. Sebabnya ialah tekanan: tekanan ditakrifkan sebagai daya per unit luas permukaan, dengan arah daya berserenjang dengan permukaan itu. Unit S.I. bagi tekanan ialah pascal (Pa); 1 Pa bersamaan dengan 1 newton per meter persegi (N m⁻²).",
      pressureApparatus: {
        title: "🧪 Susunan radas penyiasatan",
        instruction: "Tekan setiap bahagian radas untuk mengetahui fungsinya.",
        parts: [
          { id: "blocks", label: "Blok logam", note: "Dua blok logam yang berjisim sama, tetapi luas permukaan tapaknya berbeza — jadi daya yang bertindak sama, hanya luas permukaan yang berubah." },
          { id: "plasticine", label: "Plastisin", note: "Plastisin merekodkan kesan tekanan: semakin tinggi tekanan, semakin dalam lekuk yang terhasil." },
          { id: "stand", label: "Kaki retort dan pengapit", note: "Memegang kedua-dua blok logam pada kedudukan yang sama di atas plastisin." },
          { id: "string", label: "Tali", note: "Menggantung blok logam pada kaki retort sebelum ia dilepaskan." },
          { id: "rule", label: "Pembaris meter", note: "Mengukur kedalaman lekuk yang dihasilkan oleh setiap blok logam." },
        ],
        caption: "Blok berjisim sama, luas permukaan berbeza — bandingkan kedalaman lekuknya.",
        hint: "Pilih satu bahagian radas untuk mengetahui fungsinya.",
      },
      miniExperiment: {
        title: "🔬 Penyiasatan: luas permukaan dan tekanan",
        aim: "Mengkaji hubungan luas permukaan dengan tekanan yang dihasilkan oleh daya yang sama.",
        instruction: "Tekan untuk melihat penyiasatan penuh.",
        aimLabel: "TUJUAN",
        hypothesisLabel: "HIPOTESIS",
        manipulatedLabel: "PEMBOLEH UBAH DIMANIPULASIKAN",
        respondingLabel: "PEMBOLEH UBAH BERGERAK BALAS",
        controlledLabel: "PEMBOLEH UBAH DIMALARKAN",
        materialsLabel: "BAHAN",
        apparatusLabel: "RADAS",
        methodLabel: "KAEDAH",
        observationLabel: "PEMERHATIAN",
        conclusionLabel: "KESIMPULAN",
        parts: [
          {
            id: "surface-area",
            label: "Luas permukaan",
            icon: "📐",
            question: "Apakah kesan luas permukaan terhadap tekanan oleh tindakan daya yang sama?",
            hypothesis: "Apabila luas permukaan meningkat, tekanan yang dihasilkan berkurang.",
            manipulated: "Luas permukaan tindakan daya",
            responding: "Kedalaman lekuk pada plastisin",
            controlled: "Blok logam yang berjisim sama, supaya daya yang bertindak adalah sama",
            materials: "Blok logam dan plastisin",
            apparatus: "Kaki retort dan pengapit, pembaris meter dan tali",
            method: [
              "Sediakan dua blok logam yang berjisim sama tetapi mempunyai luas permukaan tapak yang berbeza.",
              "Gantungkan kedua-dua blok logam itu pada kaki retort dan pengapit menggunakan tali.",
              "Letakkan sekeping plastisin di bawah kedua-dua blok logam itu.",
              "Lepaskan blok logam P dan ukur kedalaman lekuk yang dihasilkan dengan pembaris meter.",
              "Ulang langkah itu dengan blok logam Q, kemudian bandingkan kedua-dua kedalaman lekuk.",
            ],
            observation:
              "Blok dengan luas permukaan yang lebih kecil menghasilkan lekuk yang lebih dalam pada plastisin. Blok dengan luas permukaan yang lebih besar menghasilkan lekuk yang lebih cetek.",
            conclusion:
              "Bagi daya yang sama, luas permukaan yang lebih kecil menghasilkan tekanan yang lebih tinggi, manakala luas permukaan yang lebih besar menghasilkan tekanan yang lebih rendah. Hipotesis diterima.",
          },
        ],
      },
      calculators: [
        {
          type: "two-field",
          title: "🧮 Kalkulator tekanan",
          instruction: "Tekanan = Daya ÷ Luas permukaan. Kekalkan daya dan kecilkan luas — perhatikan tekanan meningkat.",
          fieldA: { label: "Daya", unit: "N", default: 10 },
          fieldB: { label: "Luas permukaan", unit: "m²", default: 0.01 },
          operation: "divide",
          resultLabel: "Tekanan",
          resultUnit: "Pa",
        },
      ],
      cards: [
        {
          title: "Tekanan tinggi — luas permukaan kecil",
          body: "Mata kapak yang nipis, kepingan logam yang nipis pada kasut peluncur, dan paku pada tapak kasut bola sepak semuanya memusatkan daya pada luas permukaan yang kecil untuk menghasilkan tekanan yang tinggi.",
        },
        {
          title: "Tekanan rendah — luas permukaan besar",
          body: "Traktor mempunyai tayar yang besar dan lebar supaya tekanan ke atas tanah menjadi rendah dan traktor itu tidak tenggelam. Begitu juga, luas tapak kaki gajah yang besar menghasilkan tekanan yang kecil walaupun beratnya tinggi.",
        },
      ],
      checks: [
        { question: "Sebuah kuboid 5 N mempunyai tiga permukaan berbeza. Permukaan manakah memberikan tekanan tertinggi di atas tanah?", hint: "Permukaan dengan luas paling kecil — luas lebih kecil dengan daya sama sentiasa bermakna tekanan lebih tinggi." },
        { question: "Daya 20 N bertindak pada luas 0.5 m². Berapakah tekanannya?", hint: "40 Pa. Tekanan = 20 N ÷ 0.5 m²." },
      ],
    },
    {
      number: "8.2",
      title: "Tekanan Gas",
      intro:
        "Teori kinetik gas menyatakan bahawa molekul-molekul udara sentiasa bergerak secara rawak dan berlanggar dengan dinding bekasnya. Perlanggaran ini menghasilkan daya yang menolak pada dinding bekas — daya per unit luas inilah yang dikenali sebagai tekanan udara.",
      gasParticles: {
        title: "💨 Apa yang mengubah tekanan gas",
        instruction: "Tekan setiap keadaan untuk melihat kesannya ke atas perlanggaran.",
        particleCount: 14,
        states: [
          {
            id: "normal",
            label: "Keadaan asal",
            note: "Molekul udara bergerak secara rawak dan berlanggar dengan dinding bekas. Perlanggaran inilah yang menghasilkan tekanan gas.",
          },
          {
            id: "compressed",
            label: "Isi padu dikurangkan",
            note: "Apabila bekas tertutup dimampatkan, isi padu ruang di dalamnya berkurang. Bilangan molekul kekal sama, tetapi molekul berlanggar dengan dinding bekas dengan lebih kerap — jadi tekanan gas meningkat.",
          },
          {
            id: "heated",
            label: "Suhu dinaikkan",
            note: "Apabila suhu bertambah, molekul udara bergerak dengan lebih cepat. Bilangan molekul kekal sama, tetapi molekul melanggar dinding dengan lebih kerap dan dengan daya yang lebih kuat — jadi tekanan gas meningkat.",
          },
        ],
        caption: "Bilangan molekul kekal sama dalam ketiga-tiga keadaan — hanya isi padu atau suhu yang berubah.",
        hint: "Pilih satu keadaan untuk melihat kesannya.",
      },
      checks: [
        { question: "Sebuah picagari tertutup ditolak masuk supaya isi padunya berkurang. Apakah yang berlaku kepada tekanan udara di dalamnya?", hint: "Tekanan meningkat, kerana molekul yang sama banyak kini berlanggar dengan dinding dengan lebih kerap dalam ruang yang lebih kecil." },
        { question: "Mengapakah belon yang dibiarkan di tempat panas boleh pecah?", hint: "Suhu yang tinggi menjadikan molekul udara bergerak lebih cepat, melanggar dinding belon dengan lebih kerap dan lebih kuat, jadi tekanan di dalamnya meningkat." },
      ],
    },
    {
      number: "8.2",
      title: "Tekanan Atmosfera",
      intro:
        "Tekanan atmosfera ialah tekanan yang dikenakan oleh atmosfera ke atas permukaan Bumi dan semua jasad di Bumi. Gunakan istilah dengan betul: tekanan udara ialah tekanan yang dikenakan oleh udara secara umum, manakala tekanan atmosfera merujuk khusus kepada tekanan yang dikenakan oleh atmosfera Bumi.",
      cards: [
        {
          title: "Altitud dan tekanan atmosfera",
          body: "Tekanan atmosfera berkurang apabila altitud meningkat. Semakin tinggi kedudukan kita, semakin sedikit udara yang berada di atas kita, jadi berat lajur udara yang menekan ke bawah menjadi lebih kecil dan tekanan atmosfera menjadi lebih rendah. Di kaki gunung, lebih banyak molekul udara berada di atas kita, jadi tekanannya lebih tinggi.",
          detail: "Puncak gunung yang tinggi seperti Gunung Everest ialah kawasan dengan tekanan atmosfera yang sangat rendah.",
        },
      ],
      altitudePressure: {
        title: "🏔️ Mengapa tekanan atmosfera berkurang dengan altitud",
        instruction: "Tekan setiap kedudukan untuk membandingkan udara yang berada di atasnya.",
        particleCount: 46,
        airAboveLabel: "Udara di atas",
        levels: [
          { id: "summit", label: "Puncak gunung", note: "Di puncak, hanya sedikit udara berada di atas kita. Berat lajur udara yang menekan ke bawah adalah kecil, jadi tekanan atmosfera di situ rendah." },
          { id: "foot", label: "Kaki gunung", note: "Di kaki gunung, lebih banyak udara berada di atas kita. Berat lajur udara yang menekan ke bawah lebih besar, jadi tekanan atmosfera di situ lebih tinggi." },
        ],
        caption: "Udara lebih tumpat berhampiran permukaan Bumi dan semakin menipis pada altitud yang tinggi.",
        hint: "Pilih satu kedudukan untuk membandingkannya.",
      },
      accordions: [
        {
          title: "🥤 Penyedut minuman",
          body: "Apabila udara di dalam penyedut disedut keluar, ruang di dalamnya menjadi bertekanan rendah. Tekanan udara yang lebih tinggi di luar — iaitu tekanan atmosfera — menolak air masuk ke dalam penyedut dan naik ke mulut. Bukan penyedut itu yang 'menyedut' air naik.",
        },
        {
          title: "🔵 Hemisfera Magdeburg",
          body: "Apabila udara di dalam hemisfera dipam keluar sehingga ruang di dalamnya menjadi vakum, tekanan di dalamnya menjadi sifar. Kedua-dua hemisfera sukar dipisahkan kerana tekanan atmosfera di luar mengenakan daya yang sangat besar ke atasnya.",
        },
        {
          title: "🚿 Pam sedut",
          body: "Apabila pam sedut ditekan pada sinki, udara di dalamnya dipaksa keluar lalu membentuk keadaan bertekanan rendah. Apabila pam sedut ditarik ke atas, tekanan yang lebih tinggi di dalam salur paip menolak kotoran yang tersumbat.",
        },
        {
          title: "💧 Sifon",
          body: "Hujung tiub yang satu diletakkan lebih rendah supaya air mengalir keluar. Air yang mengalir keluar menyebabkan tekanan di dalam tiub menjadi rendah, dan tekanan atmosfera menolak air masuk ke dalam tiub — menyebabkan air mengalir keluar secara berterusan.",
        },
        {
          title: "💉 Picagari",
          body: "Apabila omboh ditarik ke atas, ruang di dalam picagari menjadi bertekanan rendah. Tekanan atmosfera di luar kemudian menolak cecair masuk ke dalam picagari.",
        },
        {
          title: "🧹 Pembersih vakum",
          body: "Kipas pembersih vakum menurunkan tekanan udara di dalamnya. Tekanan atmosfera yang lebih tinggi di luar menolak udara masuk, dan udara itu membawa habuk serta cebisan kertas bersamanya.",
        },
      ],
      checks: [
        { question: "Mengapakah tekanan atmosfera lebih rendah di puncak gunung berbanding di kakinya?", hint: "Di puncak, lebih sedikit udara berada di atas kita, jadi berat lajur udara yang menekan ke bawah lebih kecil." },
        { question: "Terangkan mengapa air naik ke dalam penyedut minuman apabila anda menyedutnya.", hint: "Menyedut menurunkan tekanan di dalam penyedut, dan tekanan atmosfera di luar menolak air itu naik ke dalam penyedut." },
      ],
    },
    {
      number: "8.2",
      title: "Tekanan Cecair",
      intro:
        "Tekanan dalam cecair bertambah apabila kedalaman bertambah. Seorang penyelam mengalami tekanan kerana berat air yang bertindak ke atas badannya, dan tekanan itu meningkat semakin dalam dia menyelam.",
      depthPressure: {
        title: "🌊 Kedalaman dan tekanan cecair",
        instruction: "Tekan setiap kedudukan lubang untuk membandingkan tekanannya.",
        levels: [
          { id: "shallow", label: "Cetek", note: "Berhampiran permukaan, kedalaman kecil, jadi tekanan cecair paling rendah dan pancutan air paling dekat." },
          { id: "middle", label: "Sederhana", note: "Kedalaman bertambah, jadi tekanan cecair lebih tinggi dan pancutan air memancut lebih jauh." },
          { id: "deep", label: "Dalam", note: "Kedalaman paling besar, jadi tekanan cecair paling tinggi dan pancutan air memancut paling jauh." },
        ],
        applications: [
          { id: "dam", label: "Dinding empangan", note: "Dinding empangan dibina lebih tebal di bahagian bawah kerana tekanan air paling tinggi pada kedalaman yang paling dalam." },
          { id: "submarine", label: "Kapal selam", note: "Badan kapal selam direka tebal dan kukuh supaya dapat menahan tekanan air yang tinggi pada kedalaman laut." },
        ],
        caption: "Semakin dalam lubang itu, semakin jauh air memancut keluar.",
        hint: "Pilih satu kedudukan lubang untuk melihat perbandingannya.",
      },
      checks: [
        { question: "Mengapakah dinding empangan dibina lebih tebal di bahagian bawah?", hint: "Kerana tekanan cecair bertambah dengan kedalaman, jadi bahagian bawah menanggung tekanan air yang paling tinggi." },
        { question: "Gelembung udara membesar semasa naik ke permukaan air. Mengapa?", hint: "Tekanan cecair berkurang apabila kedalaman berkurang, jadi gelembung itu mengembang semasa naik." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menamakan jenis-jenis daya dan memerihalkan kesan setiap satu.",
    "Saya boleh melukis daya sebagai anak panah yang menunjukkan magnitud, arah dan titik aplikasi.",
    "Saya boleh mengukur daya dalam newton menggunakan neraca spring.",
    "Saya boleh menerangkan pasangan daya tindakan dan daya tindak balas dengan contoh.",
    "Saya boleh menentukan daya apungan menggunakan berat sebenar dan berat ketara.",
    "Saya boleh mengelaskan tuas dan menyelesaikan masalah menggunakan prinsip momen.",
    "Saya boleh mengira momen daya menggunakan jarak tegak dari pangsi.",
    "Saya boleh menerangkan hubungan antara luas permukaan dengan tekanan, dan mengira tekanan.",
    "Saya boleh menerangkan tekanan gas, tekanan atmosfera dan tekanan cecair dengan contoh harian.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Paku tekan menembusi papan lebih mudah daripada syiling kerana ia mengenakan lebih banyak daya.",
      answer: false,
      explanation: "Daya yang sama, luas yang jauh lebih kecil — itulah yang mewujudkan tekanan lebih tinggi, bukan lebih banyak daya.",
    },
    {
      type: "multiple-choice",
      question: "Tuas kelas manakah mempunyai beban terletak di antara fulkrum dengan daya?",
      options: ["Kelas pertama", "Kelas kedua", "Kelas ketiga", "Tiada satu pun"],
      answerIndex: 1,
      explanation: "Kelas kedua — seperti kereta sorong, di mana beban terletak di antara roda (fulkrum) dengan tangan anda (daya).",
    },
    {
      type: "multiple-choice",
      question: "Sebuah bongkah terapung pegun di atas air. Apakah hubungan antara daya apungan dengan beratnya?",
      options: [
        "Daya apungan lebih besar daripada berat",
        "Daya apungan sama dengan berat",
        "Daya apungan kurang daripada berat",
        "Daya apungan menjadi sifar",
      ],
      answerIndex: 1,
      explanation: "Objek yang terapung berada dalam keseimbangan, jadi daya apungan ke atas sama magnitud dengan berat ke bawah.",
    },
  ],
};
