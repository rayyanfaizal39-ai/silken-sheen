import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C6InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "Galeri Sains — Persoalan Nuklear Malaysia",
    body: "Agensi Nuklear Malaysia pernah mencadangkan idea sebuah stesen jana kuasa nuklear menjelang 2030 untuk memenuhi permintaan tenaga elektrik negara yang semakin meningkat — satu keputusan yang menimbang keselamatan tenaga berbanding kebimbangan keselamatan awam, dan Malaysia masih belum membuat keputusan muktamad.",
  },
  keywords: [
    "Arus aruhan",
    "Arus terus",
    "Arus ulang-alik",
    "Transformer",
    "Rangkaian Grid Nasional",
    "Kilowatt-jam (kWj)",
    "Kecekapan tenaga",
  ],
  sections: [
    {
      number: "6.1",
      title: "Penjanaan Tenaga Elektrik",
      intro:
        "Setiap sumber tenaga yang digunakan untuk menjana elektrik tergolong dalam salah satu daripada dua kumpulan. Pada tahun 1831, Michael Faraday mendapati bahawa menggerakkan sebatang magnet secara relatif kepada gegelung dawai (atau sebaliknya) supaya garis medan magnetnya \"dipotong\" akan menghasilkan arus aruhan, dapat dikesan pada galvanometer — setiap penjana di dunia dibina berasaskan prinsip inilah.",
      flipCards: [
        { id: "terma", icon: "🔥", label: "Terma (bahan api fosil)", fact: "Tenaga kimia → Haba → Tenaga kinetik (stim memutar turbin) → Tenaga elektrik." },
        { id: "suria", icon: "☀️", label: "Suria", fact: "Tenaga suria → Tenaga elektrik secara terus, melalui panel suria." },
        { id: "hidro", icon: "💧", label: "Hidroelektrik", fact: "Tenaga keupayaan graviti (air empangan) → Tenaga kinetik (turbin) → Tenaga elektrik." },
        { id: "angin", icon: "💨", label: "Angin", fact: "Tenaga kinetik (angin menggerakkan bilah) → Tenaga elektrik." },
        { id: "nuklear", icon: "☢️", label: "Nuklear", fact: "Tenaga nuklear → Haba → Tenaga kinetik (stim memutar turbin) → Tenaga elektrik." },
        { id: "biojisim", icon: "🌱", label: "Biojisim", fact: "Tenaga kimia (pembakaran metana) → Haba → Tenaga kinetik → Tenaga elektrik." },
      ],
      toggles: [
        {
          title: "Boleh diperbaharui atau tidak boleh diperbaharui?",
          instruction: "Setiap sumber tenaga yang digunakan untuk menjana elektrik tergolong dalam salah satu daripada dua kumpulan. Ketik untuk membandingkan.",
          options: [
            { id: "renewable", label: "Boleh Diperbaharui", body: "Sumber yang boleh digantikan secara berterusan dan tidak akan habis: hidro, ombak, suria, air pasang surut, angin, biojisim, geoterma. Malaysia merupakan negara terkehadapan dalam sektor perindustrian biojisim di rantau Asia Tenggara, memanfaatkan sisa kelapa sawit, hutan, getah dan sekam padi." },
            { id: "nonrenewable", label: "Tidak Boleh Diperbaharui", body: "Sumber yang tidak boleh digantikan dan akhirnya akan habis: nuklear, arang batu, gas asli, petroleum." },
          ],
        },
        {
          title: "Arus terus atau arus ulang-alik?",
          instruction: "Ketik untuk membandingkan.",
          options: [
            { id: "dc", label: "Arus Terus (a.t.)", body: "Mengalir dalam SATU arah sahaja. Sumber: sel suria, akumulator, bateri. Digunakan dalam: lampu suluh, kalkulator, kereta mainan." },
            { id: "ac", label: "Arus Ulang-alik (a.u.)", body: "Sentiasa menukar arah secara berterusan. Dijana oleh kebanyakan stesen jana kuasa. Digunakan dalam: pemanggang roti, pengering rambut, penyaman udara." },
          ],
        },
      ],
      checks: [
        { question: "Apakah rantaian pertukaran tenaga yang menjana kuasa sebuah stesen hidroelektrik?", hint: "Tenaga keupayaan graviti (air tersimpan) → tenaga kinetik (air mengalir memutar turbin) → tenaga elektrik (penjana)." },
      ],
    },
    {
      number: "6.2",
      title: "Transformer",
      intro: "Sebuah transformer mengubah voltan arus ulang-alik menggunakan dua gegelung dililit pada teras ferum yang sama — tetapi ia hanya berfungsi pada a.u., tidak sekali-kali pada a.t.",
      toggles: [
        {
          title: "Injak naik atau injak turun?",
          instruction: "Ketik untuk membandingkan.",
          options: [
            { id: "stepup", label: "Injak Naik", body: "Voltan output LEBIH TINGGI daripada voltan input. Gegelung sekunder mempunyai LEBIH BANYAK lilitan berbanding gegelung primer. Digunakan untuk meningkatkan voltan bagi penghantaran jarak jauh." },
            { id: "stepdown", label: "Injak Turun", body: "Voltan output LEBIH RENDAH daripada voltan input. Gegelung sekunder mempunyai LEBIH SEDIKIT lilitan berbanding gegelung primer. Digunakan dalam pengecas telefon bimbit, regulator kipas siling." },
          ],
        },
      ],
      calculators: [
        { type: "transformer", title: "Kalkulator persamaan transformer", instruction: "Vp/Vs = Np/Ns — masukkan mana-mana tiga nilai untuk mencari nilai keempat.", defaultVp: 240, defaultNp: 120, defaultNs: 20 },
      ],
      checks: [
        { question: "Mengapakah transformer hanya boleh digunakan dengan a.u., tidak sekali-kali a.t.?", hint: "Transformer memerlukan medan magnet yang sentiasa BERUBAH untuk mengaruhkan arus dalam gegelung sekunder — arus terus menghasilkan medan yang tetap dan tidak berubah, jadi tiada aruhan berlaku." },
      ],
    },
    {
      number: "6.3",
      title: "Penghantaran dan Pengagihan Tenaga Elektrik",
      intro: "Ikuti perjalanan elektrik daripada stesen jana kuasa ke rumah anda merentasi Rangkaian Grid Nasional, kemudian lihat komponen keselamatan yang melindungi pendawaian rumah anda sepanjang perjalanan.",
      sequence: {
        title: "Ikuti perjalanan elektrik daripada stesen jana kuasa ke rumah anda",
        instruction: "Langkah demi langkah, ikuti perjalanan elektrik merentasi Rangkaian Grid Nasional.",
        steps: [
          { title: "🏭 Stesen jana kuasa", body: "Arus ulang-alik dijana, biasanya pada 11 kV hingga 25 kV." },
          { title: "⬆️ Transformer injak naik", body: "Voltan dinaikkan secara mendadak (cth. kepada 132 kV–500 kV) untuk meminimumkan kehilangan tenaga semasa penghantaran jarak jauh." },
          { title: "🗼 Rangkaian Grid Nasional", body: "Arus voltan tinggi merentasi negara melalui menara penghantaran (pilon)." },
          { title: "🔀 Zon suis & pencawang utama", body: "Membolehkan elektrik dialihkan ke pencawang cabang, atau bahagian tertentu dimatikan untuk penyelenggaraan tanpa mengganggu bekalan." },
          { title: "⬇️ Transformer injak turun", body: "Voltan diturunkan secara beransur-ansur melalui satu siri transformer injak turun di pencawang." },
          { title: "🏠 Pengguna", body: "Voltan akhir dibekalkan: 33 kV (industri berat), 11 kV (industri ringan), 240 V (rumah, pejabat)." },
        ],
      },
      flipCards: [
        { id: "fius", icon: "🔥", label: "Fius", fact: "Dawai nipis yang melebur dan memutuskan bekalan apabila arus melebihi nilai kadarnya." },
        { id: "mcb", icon: "⚡", label: "MCB", fact: "Miniature Circuit Breaker — mengasingkan litar akhir kepada peralatan berbeza, boleh diset semula (tidak seperti fius)." },
        { id: "elcb", icon: "💧", label: "ELCB", fact: "Earth Leakage Circuit Breaker — memutuskan kuasa serta-merta jika arus bocor ke bumi, melindungi daripada kejutan elektrik." },
        { id: "bumi", icon: "🌍", label: "Dawai bumi", fact: "Menyambungkan bekas logam peralatan ke bumi — mengalihkan arus rosak daripada seseorang yang menyentuhnya." },
        { id: "kilat", icon: "⛈️", label: "Penghantar kilat", fact: "Menyediakan laluan selamat untuk sambaran kilat menuju ke bumi, melindungi bangunan." },
        { id: "plag", icon: "🔌", label: "Plag 3 pin", fact: "Membawa dawai hidup, neutral DAN bumi — digunakan untuk peralatan berkuasa tinggi seperti cerek." },
      ],
      checks: [
        { question: "Mengapakah cerek elektrik dipasang dengan fius 13 A dan bukan fius 3 A?", hint: "Arus operasi normal cerek adalah lebih kurang 11.34 A — fius 13 A berada sedikit di atas nilai itu dengan selamat, manakala fius 3 A akan terbakar serta-merta semasa penggunaan normal." },
      ],
    },
    {
      number: "6.4",
      title: "Mengira Kos Penggunaan Tenaga Elektrik",
      intro:
        "Kecekapan tenaga = (Output tenaga berguna ÷ Input tenaga dibekalkan) × 100%. Mentol filamen lama hanya menukar kira-kira 10% tenaga elektriknya kepada cahaya — selebihnya terbazir sebagai haba. Mentol LED mencapai kira-kira 90%. Tenaga elektrik digunakan (kWj) = Kuasa (kW) × Masa (j) — 1 kWj selalunya dipanggil \"1 unit.\"",
      cards: [
        { title: "Bagaimana rupa bangunan hijau", body: "Pengudaraan cekap untuk kurangkan penggunaan penyaman udara/kipas, pencahayaan semula jadi dimaksimumkan, dan panel suria untuk bekalan boleh diperbaharui." },
      ],
      calculators: [
        { type: "energy-efficiency", title: "Kalkulator kecekapan tenaga", instruction: "Kira peratusan input tenaga yang benar-benar menjadi output berguna.", defaultUsefulOutput: 8, defaultInputSupplied: 100 },
        { type: "electricity-cost", title: "Kira bil elektrik anda", instruction: "Tenaga elektrik digunakan (kWj) = Kuasa (kW) × Masa (j) — 1 kWj selalunya dipanggil \"1 unit.\"", defaultPowerKw: 2, defaultTimeH: 0.167, defaultRateSen: 21 },
      ],
      checks: [
        { question: "Sebuah periuk nasi 800 W beroperasi selama 30 minit. Berapakah tenaga yang digunakan, dalam kWj?", hint: "0.8 kW × 0.5 j = 0.4 kWj. Cuba dalam kalkulator di atas!" },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan bagaimana tenaga elektrik dijana daripada pelbagai sumber tenaga.",
    "Saya dapat menerangkan fungsi transformer injak naik dan injak turun serta mengaplikasikan persamaan transformer.",
    "Saya dapat menerangkan sistem penghantaran dan pengagihan, serta komponen keselamatan dalam pendawaian rumah.",
    "Saya dapat mengira kecekapan tenaga dan kos penggunaan tenaga elektrik.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Voltan arus ulang-alik paling tinggi pada peringkat Rangkaian Grid Nasional.", answer: true, explanation: "Betul — voltan dinaikkan ke tahap tertinggi untuk penghantaran jarak jauh yang cekap, kemudian diturunkan semula untuk pengguna." },
    { type: "multiple-choice", question: "Alat manakah yang melebur dan memutuskan bekalan apabila arus melebihi nilai selamat?", options: ["Fius", "Transformer", "Dawai bumi", "Penjana"], answerIndex: 0, explanation: "Fius mengandungi dawai nipis yang menjadi panas dan melebur apabila arus melebihi nilai kadarnya, memutuskan litar tersebut." },
  ],
};
