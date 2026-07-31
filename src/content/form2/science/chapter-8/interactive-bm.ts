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
    "Daya keapungan",
    "Berat",
    "Momen daya",
    "Tekanan",
    "Newton (N)",
  ],
  sections: [
    {
      number: "8.1",
      title: "Daya",
      intro:
        "Daya ialah tarikan atau tolakan ke atas sesuatu objek. Hampir semua aktiviti harian melibatkan daya — membuka tin makanan, menekan suis, membuka pintu. Daya ialah kuantiti vektor: ia sentiasa mempunyai magnitud (kekuatan), arah (haluan) dan titik tindakan (kawasan tepat ia bertindak). Daya diukur dalam newton (N) menggunakan penimbang spring, yang beroperasi berdasarkan prinsip pengembangan spring. Di Bumi, objek berjisim 100 g mempunyai berat 1 N, jadi objek berjisim 1 kg mempunyai berat 10 N.",
      flipCards: [
        { id: "gravitational", icon: "🌍", label: "Daya graviti", fact: "Menarik setiap objek ke arah pusat Bumi — yang membawa bola yang dilontar jatuh semula." },
        { id: "normal", icon: "🧲", label: "Daya normal", fact: "Menolak balik apabila sesuatu objek bersandar pada permukaan." },
        { id: "frictional", icon: "🌀", label: "Daya geseran", fact: "Merintangi pergerakan antara dua permukaan yang bersentuhan, bertindak bertentangan dengan arah gerakan." },
        { id: "elastic", icon: "🔗", label: "Daya kenyal", fact: "Wujud dalam spring atau bahan yang diregang atau dimampat." },
        { id: "weight", icon: "⚖️", label: "Berat", fact: "Daya graviti yang bertindak khusus ke atas jisim sesuatu objek." },
        { id: "buoyant", icon: "🛟", label: "Daya keapungan", fact: "Tujahan ke atas yang diberikan bendalir kepada apa sahaja yang terapung atau direndam di dalamnya." },
      ],
      accordions: [
        { title: "📖 Buku di atas meja", body: "Berat buku (tindakan) menarik ke bawah; daya normal meja (tindak balas) menolak ke atas dengan magnitud sama — keseimbangan inilah yang menjadikan buku kekal pegun." },
        { title: "🪵 Blok terapung di atas air", body: "Berat (tindakan) menarik ke bawah; daya keapungan (tindak balas) menolak ke atas. Magnitud sama bermakna ia terapung dan bukannya tenggelam atau terlonjak ke atas." },
        { title: "🚃 Dua troli ditolak berasingan oleh spring", body: "Spring menolak setiap troli dengan daya sama dalam arah bertentangan — jadi kedua-dua troli bergerak jarak yang sama, cuma dalam arah berlainan." },
      ],
      checks: [
        { question: "Seorang peloncat bungee melompat dari sebuah platform. Daya manakah yang menariknya ke bawah?", hint: "Daya graviti — daya yang sama yang menarik semula sebarang objek yang dilontar ke Bumi." },
      ],
    },
    {
      number: "8.2",
      title: "Kesan Daya",
      intro:
        "Daya tidak dapat dilihat secara langsung, tetapi kesannya sentiasa dapat dikesan — ia boleh menggerakkan objek pegun, menghentikan objek bergerak, mengubah kelajuan atau arahnya, atau mengubah bentuk dan saiznya. Sama ada sesuatu objek terapung atau tenggelam bergantung kepada salah satu kesan ini: daya keapungan yang menolaknya ke atas berbanding beratnya, yang seterusnya bergantung kepada ketumpatannya berbanding air (1.0 g/cm³).",
      cards: [
        { title: "Tuil kelas pertama", body: "Fulkrum terletak antara beban dan daya kuasa.", detail: "cth: gunting, playar, pembuka tin" },
        { title: "Tuil kelas kedua", body: "Beban terletak antara fulkrum dan daya kuasa.", detail: "cth: kereta sorong, pemecah kacang" },
        { title: "Tuil kelas ketiga", body: "Daya kuasa terletak antara fulkrum dan beban.", detail: "cth: penyepit ais, joran pancing" },
        {
          title: "Tekanan atmosfera dalam kehidupan harian",
          body: "Tekanan atmosfera ialah udara yang menekan ke bawah ke atas segala-galanya di permukaan Bumi. Tukul kebawa (plunger) menutup udara supaya tekanan atmosfera menahannya; menghisap penyedut minuman menurunkan tekanan di dalam supaya tekanan luar menolak minuman naik; kipas pembersih vakum menurunkan tekanan dalaman supaya udara masuk membawa habuk bersamanya.",
          detail: "Tekanan berkurang dengan altitud — kurang graviti menarik udara ke bawah bermakna udara kurang tumpat di sana.",
        },
        {
          title: "Tekanan di bawah air",
          body: "Tekanan cecair meningkat dengan kedalaman — itulah sebabnya dinding empangan dibina lebih tebal di bahagian asas, mengapa penyelam memakai sut tahan tekanan, dan mengapa badan kapal selam mesti cukup kukuh untuk menahan tekanan pada kedalaman.",
        },
      ],
      flipCards: [
        { id: "moves", icon: "▶️", label: "Menggerakkan objek pegun", fact: "Tolak bola yang diam dan ia mula bergolek." },
        { id: "stops", icon: "⏹️", label: "Menghentikan objek bergerak", fact: "Daya dari arah bertentangan menghentikan pergerakan." },
        { id: "speed", icon: "⚡", label: "Mengubah kelajuan", fact: "Daya dari arah sama mempercepatkan gerakan; arah bertentangan memperlahankannya." },
        { id: "direction", icon: "↩️", label: "Mengubah arah", fact: "Daya dari sisi mengubah haluan objek yang bergerak." },
        { id: "shape", icon: "🔄", label: "Mengubah bentuk/saiz", fact: "Memicit atau meregangkan objek mengubah bentuknya — seperti plastisin." },
      ],
      accordions: [
        { title: "📦 Isi padu", body: "Mampatkan bekas dan molekul berlanggar dengan dinding lebih kerap — tekanan gas meningkat." },
        { title: "🌡️ Suhu", body: "Panaskan gas dan molekul bergerak lebih pantas, melanggar dinding dengan lebih kuat dan kerap — tekanan gas meningkat." },
      ],
      calculators: [
        {
          type: "two-field",
          title: "🧮 Kalkulator momen daya",
          instruction: "Kesan putaran sesuatu daya ialah momennya: Momen = Daya × jarak berserenjang daripada pangsi. Cubalah — beginilah cara spanar atau jongkang-jongket berfungsi.",
          fieldA: { label: "Daya", unit: "N", default: 50 },
          fieldB: { label: "Jarak", unit: "m", default: 0.2 },
          operation: "multiply",
          resultLabel: "Momen",
          resultUnit: "N m",
        },
        {
          type: "two-field",
          title: "🧮 Kalkulator tekanan",
          instruction: "Daya yang sama terasa amat berbeza bergantung kepada luas permukaan yang dikenakan: Tekanan = Daya ÷ Luas. Itulah sebabnya paku tekan menembusi papan tetapi syiling dengan daya sama tidak — dan mengapa tapak kaki gajah yang besar mengelakkannya daripada tenggelam.",
          fieldA: { label: "Daya", unit: "N", default: 10 },
          fieldB: { label: "Luas", unit: "m²", default: 0.01 },
          operation: "divide",
          resultLabel: "Tekanan",
          resultUnit: "Pa",
        },
      ],
      buoyancy: {
        title: "🌊 Mengapa sesetengah benda terapung dan yang lain tenggelam?",
        instruction: "Sesuatu objek terapung apabila daya keapungan yang menolaknya ke atas sama dengan beratnya — cuba beberapa bahan dan bandingkan ketumpatannya dengan air (1.0 g/cm³).",
        materials: [
          { id: "cork", label: "Gabus", icon: "🪵", density: 0.24 },
          { id: "wood", label: "Kayu", icon: "🪑", density: 0.6 },
          { id: "iron", label: "Besi", icon: "⚙️", density: 7.9 },
          { id: "gold", label: "Emas", icon: "🥇", density: 19.3 },
        ],
      },
      matcher: {
        title: "🔧 Tuil — kelaskan alat",
        instruction: "Tuil ialah bar yang berputar pada titik tetap (fulkrum), dengan beban dan daya kuasa di kedua-dua belah. Pilih kelas, kemudian pilih alat yang sepadan.",
        pairs: [
          { id: "first", label: "Kelas pertama — fulkrum antara beban dan daya kuasa", match: "✂️ Gunting" },
          { id: "second", label: "Kelas kedua — beban antara fulkrum dan daya kuasa", match: "🛒 Kereta sorong" },
          { id: "third", label: "Kelas ketiga — daya kuasa antara fulkrum dan beban", match: "🎣 Joran pancing" },
        ],
      },
      checks: [
        { question: "Sebuah kuboid 5 N mempunyai tiga permukaan berbeza. Permukaan manakah memberikan tekanan tertinggi di atas tanah?", hint: "Permukaan dengan luas paling kecil — luas lebih kecil dengan daya sama sentiasa bermakna tekanan lebih tinggi." },
        { question: "Mengapakah belon helium naik dan mengembang semasa ia meningkat lebih tinggi?", hint: "Ia naik kerana helium kurang tumpat berbanding udara. Ia mengembang kerana tekanan atmosfera berkurang dengan altitud, membolehkan gas di dalamnya menolak ke luar dengan lebih kuat." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan daya, sifat-sifatnya, dan mengukurnya dalam unit SI.",
    "Saya boleh menerangkan pasangan daya tindakan-tindak balas dengan contoh.",
    "Saya boleh mengelaskan tuil dan mengira momen daya.",
    "Saya boleh menerangkan tekanan — gas, atmosfera dan cecair — dengan contoh kehidupan harian.",
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
      question: "Tuil kelas manakah mempunyai beban terletak antara fulkrum dan daya kuasa?",
      options: ["Kelas pertama", "Kelas kedua", "Kelas ketiga", "Tiada satu pun"],
      answerIndex: 1,
      explanation: "Kelas kedua — seperti kereta sorong, di mana beban terletak antara roda (fulkrum) dan tangan anda (daya kuasa).",
    },
  ],
};
