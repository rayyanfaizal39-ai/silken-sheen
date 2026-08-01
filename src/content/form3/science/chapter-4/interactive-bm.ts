import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C4InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 4,
  blogHighlight: {
    title: "Galeri Sains — Logam Pertama Digunakan Manusia",
    body: "Rekod menunjukkan emas ialah logam pertama yang digunakan manusia, ditemui dalam bentuk unsur tulen di sebuah gua di Sepanyol sejak 40,000 SM — kerana emas berada di kedudukan paling bawah dalam siri kereaktifan dan hampir tidak bertindak balas dengan apa-apa, ia kekal hampir tidak tersentuh selama beribu-ribu tahun.",
  },
  keywords: ["Mineral", "Siri kereaktifan logam", "Pengekstrakan logam", "Relau bagas", "Sanga"],
  sections: [
    {
      number: "4.1",
      title: "Kepelbagaian Mineral",
      intro: "Mineral ialah unsur atau sebatian pepejal semula jadi dengan struktur kristal yang tetap. Ia hadir dalam dua bentuk.",
      cards: [
        { title: "Maklumat Sains", body: "Mineralogi — kajian tentang mineral — merupakan bidang sains yang sentiasa aktif, kerana bilangan dan sifat mineral yang diketahui terus bertambah." },
      ],
      comparison: {
        title: "Apa sebenarnya yang ada dalam batuan",
        columns: [
          { title: "Unsur", body: "Emas, perak — ditemui tulen di alam semula jadi." },
          { title: "Sebatian", body: "Bauksit (aluminium oksida), hematit (ferum(III) oksida), galena (plumbum(II) sulfida) dan kasiterit (timah(IV) oksida)." },
        ],
      },
      checks: [
        { question: "Adakah batu kapur (kalsium karbonat) unsur atau sebatian? Bagaimana anda boleh membuktikannya?", hint: "Sebatian — memanaskannya atau mereaksikannya dengan asid membebaskan gas karbon dioksida (disahkan oleh air kapur menjadi keruh), membuktikan ia terdiri daripada kalsium, karbon dan oksigen yang bergabung." },
      ],
    },
    {
      number: "4.2",
      title: "Siri Kereaktifan Logam",
      intro:
        "Logam disusun dalam siri kereaktifan berdasarkan sejauh mana ia bertindak balas dengan oksigen — magnesium terbakar dengan nyalaan terang, manakala ferum hanya berbara perlahan. Karbon dan hidrogen (bukan logam) juga diletakkan dalam siri ini, kerana kereaktifannya boleh dibandingkan dengan cara yang sama. Ketik mana-mana unsur dalam tangga di bawah untuk melihat tindak balasnya.",
      ladder: {
        title: "Disusun mengikut sejauh mana ia \"mahu\" bertindak balas",
        instruction: "Ketik mana-mana unsur untuk melihat tindak balasnya dengan oksigen.",
        items: [
          { symbol: "K", name: "Kalium", fact: "Bertindak balas secara meletup dan segera dengan oksigen — tidak pernah ditemui tulen di alam semula jadi." },
          { symbol: "Na", name: "Natrium", fact: "Bertindak balas dengan giat dengan oksigen, terbakar dengan nyalaan." },
          { symbol: "Ca", name: "Kalsium", fact: "Bertindak balas agak giat dengan oksigen." },
          { symbol: "Mg", name: "Magnesium", fact: "Terbakar dengan nyalaan putih terang dalam oksigen." },
          { symbol: "Al", name: "Aluminium", fact: "Bertindak balas dengan oksigen membentuk lapisan oksida pelindung, melambatkan tindak balas selanjutnya." },
          { symbol: "C", name: "Karbon", highlight: true, fact: "Bukan logam yang diletakkan sebagai rujukan — digunakan untuk mengekstrak logam di bawahnya." },
          { symbol: "Zn", name: "Zink", fact: "Berbara dan bertindak balas secara sederhana dengan oksigen apabila dipanaskan." },
          { symbol: "H", name: "Hidrogen", highlight: true, fact: "Bukan logam — dapat menurunkan oksida logam di bawahnya, seperti ferum(III) oksida, kepada logam." },
          { symbol: "Fe", name: "Ferum", fact: "Berbara perlahan dengan oksigen — inilah yang menyebabkan pengaratan berlaku dari semasa ke semasa." },
          { symbol: "Sn", name: "Timah", fact: "Bertindak balas perlahan dan lemah dengan oksigen." },
          { symbol: "Pb", name: "Plumbum", fact: "Bertindak balas sangat perlahan dengan oksigen." },
          { symbol: "Cu", name: "Kuprum", fact: "Hampir tidak bertindak balas dengan oksigen — hanya kusam secara perlahan." },
          { symbol: "Hg", name: "Raksa", fact: "Sangat tidak reaktif — salah satu daripada sedikit logam yang cecair pada suhu bilik." },
          { symbol: "Ag", name: "Perak", fact: "Sangat tidak reaktif — kekal berkilat lebih lama berbanding kebanyakan logam." },
          { symbol: "Au", name: "Emas", fact: "Logam paling tidak reaktif — hampir tidak bertindak balas dengan oksigen sama sekali, kekal tulen selama beribu tahun." },
        ],
      },
      checks: [
        { question: "Karbon dapat menurunkan zink oksida dan aluminium oksida tetapi tidak plumbum(II) oksida. Apakah yang ini menunjukkan tentang kedudukan karbon?", hint: "Tunggu — jika karbon dapat menurunkan zink oksida, ini bermakna karbon lebih reaktif daripada zink. Tetapi karbon tidak dapat menurunkan aluminium oksida, bermakna aluminium lebih reaktif daripada karbon. Jadi karbon terletak antara aluminium dan zink dalam siri tersebut." },
      ],
    },
    {
      number: "4.3",
      title: "Pengekstrakan Logam daripada Bijihnya",
      intro:
        "Kedudukan dalam siri menentukan kaedah pengekstrakan. Perlombongan logam daripada bijihnya juga mengorbankan alam — pencemaran udara akibat pembakaran bahan api, pencemaran air akibat pencucian bijih, hakisan tanih akibat perlombongan bijih, pencemaran bunyi daripada jentera, kemusnahan habitat akibat pembinaan lombong, dan penggunaan tenaga elektrik yang besar semuanya kesan sebenar.",
      toggles: [
        {
          title: "Kaedah pengekstrakan yang mana?",
          instruction: "Kedudukan dalam siri kereaktifan menentukan bagaimana sesuatu logam diekstrak. Ketik untuk membandingkan.",
          options: [
            { id: "electrolysis", label: "Atas Karbon", body: "Logam seperti kalium, natrium, kalsium, magnesium dan aluminium terlalu reaktif untuk disesarkan oleh karbon — ia diekstrak melalui elektrolisis sebatian leburnya." },
            { id: "carbon", label: "Bawah Karbon", body: "Logam seperti zink, ferum, timah dan plumbum kurang reaktif daripada karbon — karbon dapat menyesarkannya daripada oksidanya melalui penurunan dalam relau." },
            { id: "heat", label: "Sangat Tidak Reaktif", body: "Logam seperti raksa dan perak begitu tidak reaktif sehingga hampir tidak membentuk sebatian — selalunya diekstrak melalui pemanasan terus. Emas wujud sebagai unsur tulen dalam kerak Bumi, tidak memerlukan sebarang kimia pengekstrakan." },
          ],
        },
      ],
      sequence: {
        title: "Langkah demi langkah pengekstrakan ferum dalam relau bagas",
        instruction: "Ikuti bagaimana bijih ferum menjadi ferum lebur.",
        steps: [
          { title: "📥 Bahan cas ditambah", body: "Campuran bijih ferum pekat, kok dan batu kapur dimasukkan ke dalam relau dari bahagian atas." },
          { title: "💨 Udara panas ditiup masuk", body: "Tiupan udara yang sangat panas dipam masuk melalui bahagian bawah relau." },
          { title: "🔥 Kok terbakar", body: "Kok (karbon) bertindak balas dengan oksigen dalam udara panas menghasilkan karbon dioksida dan haba." },
          { title: "♻️ Karbon monoksida terbentuk", body: "Karbon dioksida bertindak balas dengan lebih banyak kok panas membentuk karbon monoksida — agen penurunan yang kuat." },
          { title: "⚙️ Oksida ferum diturunkan", body: "Karbon monoksida dan karbon kedua-duanya menurunkan oksida ferum kepada ferum lebur." },
          { title: "🧱 Sanga terbentuk", body: "Batu kapur terurai menjadi kalsium oksida, yang bertindak balas dengan bendasing pasir membentuk sanga." },
          { title: "🌊 Ferum & sanga lebur disadap", body: "Ferum lebur tenggelam ke bawah dan disadap ke dalam acuan; sanga lebur yang kurang tumpat terapung di atasnya dan disadap secara berasingan." },
        ],
      },
      checks: [
        { question: "Mengapakah sanga lebur terapung di atas ferum lebur dalam relau bagas?", hint: "Sanga lebur kurang tumpat berbanding ferum lebur, jadi ia secara semula jadi naik dan terpisah di bahagian atas — memudahkan ia disadap secara berasingan." },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan mineral yang terdapat dalam kerak Bumi dengan contoh.",
    "Saya dapat membina siri kereaktifan logam dan menentukan kedudukan karbon serta hidrogen.",
    "Saya dapat menyatakan pengekstrakan logam daripada bijihnya, dan menjana idea untuk isu perlombongan.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Kalium diekstrak daripada bijihnya menggunakan penurunan karbon.", answer: false, explanation: "Kalium terletak jauh di atas karbon dalam siri kereaktifan — ia mesti diekstrak melalui elektrolisis, bukan penurunan karbon." },
    { type: "multiple-choice", question: "Bahan apakah yang ditambah ke dalam relau bagas untuk menyingkirkan bendasing pasir sebagai sanga?", options: ["Kok", "Batu kapur", "Bijih ferum", "Udara panas"], answerIndex: 1, explanation: "Batu kapur terurai membentuk kalsium oksida, yang bertindak balas dengan bendasing pasir (silikon dioksida) membentuk sanga (kalsium silikat)." },
  ],
};
