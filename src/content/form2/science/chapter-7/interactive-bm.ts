import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch7-keelektrikan-kemagnetan.png";

export const scienceF2C7InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 7,
  blogHighlight: {
    title: "Blog Sains — Belut Elektrik",
    body: "Seekor belut elektrik mempunyai kira-kira 6,000 sel khas dipanggil elektrosit, membolehkannya melepaskan sehingga 600 volt — cukup untuk mengejutkan pemangsa, menangkap mangsa, malah mengharungi habitatnya yang keruh di mana penglihatan hampir tidak membantu.",
    imagePath: chapterImage,
  },
  keywords: [
    "Arus elektrik",
    "Cas elektrostatik",
    "Elektroskop",
    "Hukum Ohm",
    "Litar selari",
    "Litar bersiri",
    "Rintangan berkesan",
    "Medan magnet",
    "Magnet",
    "Elektromagnet",
  ],
  sections: [
    {
      number: "7.1",
      title: "Elektrik",
      intro:
        "Tenaga bermaksud kemampuan untuk melakukan kerja, diukur dalam joule (J). Ia tidak boleh dicipta atau dimusnahkan, hanya bertukar daripada satu bentuk ke bentuk lain. Gosokkan dua bahan berbeza dan elektron berpindah antara kedua-duanya — objek yang memperoleh elektron menjadi bercas negatif, yang kehilangan elektron menjadi bercas positif; objek dengan bilangan proton dan elektron yang sama adalah neutral. Ketidakseimbangan ini ialah cas elektrostatik, dan ia menjelaskan segala-galanya daripada renjatan yang dirasai pada tombol pintu hingga sikat bercas menarik kertas: cas yang sama saling menolak, cas bertentangan saling menarik.",
      cards: [
        {
          title: "Mengesan cas elektrostatik",
          body: "Elektroskop mengesan cas elektrik — daun emasnya mencapah kerana cas yang sama saling menolak, dan semakin jauh percapahannya, semakin banyak cas yang terkumpul.",
        },
        {
          title: "Bagaimana kilat terbentuk",
          body: "Geseran antara awan dan udara mencas awan — positif di bahagian atas, negatif di bahagian bawah. Kilat terhasil daripada tarikan antara cas negatif di awan dan cas positif di bumi. Konduktor kilat menyediakan laluan selamat bagi cas itu mengalir ke tanah.",
        },
        { title: "Arus", body: "Kadar aliran cas elektrik melalui konduktor.", detail: "Unit: ampere (A), diukur dengan ammeter" },
        { title: "Voltan", body: "Beza keupayaan antara dua titik dalam litar.", detail: "Unit: volt (V), diukur dengan voltmeter" },
        { title: "Rintangan", body: "Keupayaan konduktor untuk merintangi aliran arus — perintang tetap tidak boleh diselaraskan, tetapi reostat (perintang berubah) boleh.", detail: "Unit: ohm (Ω)" },
      ],
      flipCards: [
        { id: "sound", icon: "🔊", label: "Bunyi", fact: "Getaran yang membawa tenaga melalui udara, seperti pembesar suara." },
        { id: "kinetic", icon: "🏃", label: "Kinetik", fact: "Tenaga pergerakan — haiwan yang berlari, kereta yang bergerak." },
        { id: "electrical", icon: "🔌", label: "Elektrik", fact: "Tenaga yang dibawa oleh cas elektrik yang mengalir." },
        { id: "gravitational", icon: "⛰️", label: "Keupayaan graviti", fact: "Tenaga tersimpan disebabkan ketinggian — buku di atas rak." },
        { id: "elastic", icon: "🎯", label: "Keupayaan kenyal", fact: "Tenaga tersimpan dalam objek yang diregang atau dimampat, seperti spring." },
        { id: "light", icon: "💡", label: "Cahaya", fact: "Tenaga yang disinarkan sebagai cahaya nampak, seperti mentol." },
        { id: "nuclear", icon: "☢️", label: "Nuklear", fact: "Tenaga tersimpan dalam nukleus atom." },
        { id: "heat", icon: "🔥", label: "Haba", fact: "Tenaga yang berpindah disebabkan perbezaan suhu." },
        { id: "chemical", icon: "🧪", label: "Kimia", fact: "Tenaga tersimpan dalam ikatan kimia, seperti dalam makanan atau bahan api." },
      ],
      calculators: [
        {
          type: "ohms-law",
          title: "🧮 Kalkulator Hukum Ohm",
          instruction: "Hukum Ohm menghubungkan ketiga-tiga kuantiti: V = IR. Masukkan mana-mana dua nilai untuk mencari yang ketiga.",
        },
      ],
      checks: [
        { question: "Sebuah mentol kereta mengalirkan arus 0.025 A pada 12 V. Berapakah rintangannya?", hint: "R = V ÷ I = 12 ÷ 0.025 = 480 Ω. Cuba dalam kalkulator di atas!" },
        { question: "Mengapakah renjatan daripada penjana Van de Graaff tidak terasa sebahaya renjatan daripada palam dinding?", hint: "Elektrik statik membawa arus yang sangat kecil walaupun pada voltan tinggi — arus (ampere), bukan voltan semata-mata, yang menentukan bahaya." },
      ],
    },
    {
      number: "7.2",
      title: "Litar Bersiri dan Litar Selari",
      intro:
        "Litar bersiri menyambungkan komponen secara berturutan dalam satu gelung tunggal — putuskan di mana-mana sahaja dan semuanya berhenti berfungsi. Litar selari pula terbahagi kepada beberapa laluan berasingan — setiap cabang terus berfungsi walaupun cabang lain rosak. Itulah sebabnya pendawaian rumah menggunakan litar selari: satu mentol yang terbakar tidak sepatutnya memutuskan kuasa seluruh rumah, dan setiap alat mendapat voltan yang sama daripada panel pengagihan.",
      tabs: [
        {
          title: "Bersiri",
          body: "Arus sama di setiap titik (I = I₁ = I₂); voltan terbahagi merentasi komponen (V = V₁ + V₂); rintangan bertambah (R = R₁ + R₂). Kelebihan: mudah, satu suis mengawal semuanya, dan setiap komponen menerima arus yang sama. Kekurangan: satu komponen rosak menyebabkan seluruh litar terhenti, dan menambah lebih banyak komponen meningkatkan rintangan serta mengurangkan arus.",
        },
        {
          title: "Selari",
          body: "Voltan sama merentasi setiap cabang (V = V₁ = V₂); arus terbahagi merentasi cabang (I = I₁ + I₂); rintangan berkesan dikira melalui 1/R = 1/R₁ + 1/R₂. Kelebihan: setiap alat berfungsi dan dihidup/dimatikan secara berasingan. Kekurangan: voltan setiap alat tidak boleh diselaraskan secara berasingan — ia tetap sama dengan sumber.",
        },
      ],
      calculators: [
        {
          type: "resistance-comparator",
          title: "🔌 Bandingkan rintangan berkesan",
          instruction: "Masukkan dua nilai perintang dan lihat bagaimana litar bersiri dan selari menggabungkannya secara berbeza.",
          defaultR1: 2,
          defaultR2: 2,
        },
      ],
      checks: [
        { question: "Mengapakah sistem penggera kebakaran biasanya didawaikan secara bersiri, bukan selari?", hint: "Dalam litar bersiri, sebarang putusan tunggal (seperti sensor yang tercetus) menjejaskan keseluruhan litar — sesuai untuk sistem yang perlu tercetus dan memberi amaran serta-merta." },
      ],
    },
    {
      number: "7.3",
      title: "Kemagnetan",
      intro:
        "Magnet wujud secara semula jadi sebagai batu bermagnet (lodestone), tetapi magnet harian dibuat oleh manusia daripada bahan seperti besi, keluli, kobalt dan nikel. Ruang di sekeliling magnet yang mempunyai daya magnet dipanggil medan magnet, digambarkan oleh garis medan magnet. Garis-garis ini sentiasa bermula dari kutub utara ke kutub selatan, menjadi lebih rapat di kawasan medan yang lebih kuat, dan tidak pernah bersilang.",
      cards: [
        {
          title: "Kegunaan dalam kehidupan sebenar",
          body: "Jarum kompas menggunakan magnet yang digantung bebas untuk menunjukkan arah utara-selatan. Kad kredit dan debit menyimpan data pada jalur magnet. Kunci pintu elektromagnetik dan loceng elektrik bergantung pada elektromagnet untuk berfungsi.",
        },
      ],
      flipCards: [
        { id: "attracts", icon: "🧲", label: "Menarik bahan bermagnet", fact: "Besi, keluli, kobalt dan nikel tertarik kepadanya." },
        { id: "poles", icon: "🔴🔵", label: "Mempunyai dua kutub", fact: "Setiap magnet mempunyai kutub utara dan kutub selatan." },
        { id: "like-repel", icon: "↔️", label: "Kutub sama menolak, berbeza menarik", fact: "Dua kutub utara saling menolak; utara dan selatan saling menarik." },
        { id: "compass", icon: "🧭", label: "Menunjuk utara-selatan bila bebas", fact: "Magnet yang digantung bebas sentiasa menunjuk arah utara-selatan — asas kepada kompas." },
      ],
      accordions: [
        {
          title: "🖐️ Petua tangan kanan",
          body: "Elektromagnet ialah magnet sementara — ia hanya berfungsi semasa arus mengalir melalui gegelungnya. Lengkungkan jari tangan kanan mengikut arah medan magnet, dan ibu jari menunjukkan arah arus konvensional, sama ada dalam wayar lurus atau gegelung.",
        },
        { title: "⚡ Faktor 1 — Lebih arus", body: "Arus yang lebih besar mengalir melalui gegelung menghasilkan medan magnet yang lebih kuat." },
        { title: "🌀 Faktor 2 — Lebih banyak lilitan gegelung", body: "Lebih banyak lilitan wayar di sekeliling teras juga menguatkan medan magnet — dan kekuatannya berkurang apabila semakin jauh daripada pusat konduktor." },
      ],
      checks: [
        { question: "Elektromagnet yang digunakan untuk mengangkat besi buruk mempunyai gegelung dengan banyak lilitan. Mengapa?", hint: "Lebih banyak lilitan gegelung meningkatkan kekuatan medan magnet — membolehkannya mengangkat beban yang lebih berat." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan tenaga, bentuk dan sumbernya.",
    "Saya boleh menerangkan cas elektrostatik dan Hukum Ohm.",
    "Saya boleh membandingkan arus, voltan dan rintangan dalam litar bersiri dan selari.",
    "Saya boleh menerangkan sifat magnet dan elektromagnet, dengan contoh sebenar.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Dalam litar selari, voltan merentasi setiap cabang adalah sama.",
      answer: true,
      explanation: "Betul — setiap cabang dalam litar selari mendapat voltan yang sama dengan sumber.",
    },
    {
      type: "multiple-choice",
      question: "Apakah yang menentukan arah medan magnet di sekeliling wayar lurus berarus?",
      options: ["Bahan wayar itu", "Arah aliran arus (petua tangan kanan)", "Panjang wayar", "Bilangan sel kering"],
      answerIndex: 1,
      explanation: "Petua tangan kanan: tunjukkan ibu jari mengikut arah arus, dan jari yang melengkung menunjukkan arah medan magnet.",
    },
  ],
};
