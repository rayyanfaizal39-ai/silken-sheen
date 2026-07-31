import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch10-teknologi-hijau.png";

export const geographyF2C10Interactive: GeoF2InteractiveContent = {
  chapter: 10,
  blogHighlight: {
    title: "💚 Tahukah Anda? — Nilai Ekonomi Teknologi Hijau",
    body: "Malaysia menganjurkan perniagaan teknologi hijau mampu menyumbang lebih RM22 bilion kepada KDNK negara menjelang 2020, dan meningkat sehingga RM60 bilion pada 2030.",
    imagePath: chapterImage,
  },
  keywords: ["Teknologi Hijau", "Pembangunan Lestari", "Biodegradasi", "Fotovolta", "Amalan 5R"],
  sections: [
    {
      number: "10.1",
      title: "Konsep Teknologi Hijau",
      intro:
        "Teknologi hijau merujuk pembangunan produk, peralatan dan sistem untuk memelihara dan memulihara alam sekitar serta sumber semula jadi — selaras dengan konsep pembangunan lestari: memenuhi keperluan semasa tanpa menjejaskan keperluan generasi masa depan. Teknologi hijau mempunyai empat matlamat utama: meningkatkan tahap kesihatan dan kehidupan, melindungi ekosistem semula jadi, mengurangkan impak negatif daripada aktiviti manusia, dan menjadi alternatif untuk menggalakkan perkembangan ekonomi.",
      cards: [
        { title: "💪 Meningkatkan tahap kesihatan", body: "Kualiti hidup dan kesihatan masyarakat dipertingkatkan melalui persekitaran yang lebih bersih." },
        { title: "🌳 Melindungi ekosistem semula jadi", body: "Memelihara flora, fauna dan sumber semula jadi daripada kemusnahan." },
        { title: "📉 Mengurangkan impak negatif aktiviti manusia", body: "Meminimumkan kesan buruk pembangunan dan perindustrian terhadap alam sekitar." },
        { title: "💰 Alternatif pembangunan ekonomi", body: "Membuka peluang perniagaan dan pekerjaan baharu dalam industri teknologi hijau." },
      ],
      checks: [
        {
          question: "Terangkan maksud teknologi hijau mengikut pemahaman anda.",
          hint: "Pembangunan produk, peralatan dan sistem untuk memelihara alam sekitar dan sumber semula jadi, sejajar dengan matlamat pembangunan lestari.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Ciri-ciri Produk Teknologi Hijau",
      intro:
        "Produk teknologi hijau perlu memenuhi kriteria tertentu agar benar-benar mesra alam dan diterima secara meluas oleh masyarakat — daripada penggunaan sumber boleh diperbaharui, sehingga kemudahan penggunaan seharian.",
      cards: [
        { title: "♻️ Boleh dikitar semula", body: "Melalui amalan 5R untuk mengurangkan sisa." },
        { title: "🌱 Sumber boleh diperbaharui", body: "Menggalakkan penggunaan bahan mesra alam." },
        { title: "🌍 Kesan alam sekitar minimum", body: "Berupaya meminimumkan kemerosotan alam sekitar." },
        { title: "💨 Pembebasan gas rendah", body: "Kadar pembebasan gas rumah hijau adalah rendah atau sifar." },
        { title: "🛡️ Selamat digunakan", body: "Menyediakan persekitaran yang sihat dan lebih baik." },
        { title: "👍 Mudah digunakan", body: "Dicipta untuk kegunaan manusia sehari-hari." },
      ],
      checks: [
        {
          question: "Mengapakah produk teknologi hijau perlu mudah digunakan?",
          hint: "Kerana teknologi ini dicipta untuk kegunaan manusia — jika sukar digunakan, ia tidak akan diterima secara meluas walaupun mesra alam.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Contoh Produk Teknologi Hijau",
      intro:
        "Produk-produk teknologi hijau dapat dibahagikan kepada empat teras utama: tenaga (mengurangkan penggunaan bahan api fosil), alam sekitar (meminimumkan kesan alam sekitar), ekonomi (meningkatkan pembangunan melalui teknologi canggih) dan sosial (mempertingkatkan kualiti hidup rakyat). Tapkan setiap teras untuk melihat contoh produknya.",
      flipCards: [
        {
          id: "tenaga",
          icon: "⚡",
          label: "Tenaga",
          fact: "Kereta hibrid, kenderaan elektrik, biodiesel, kenderaan gas asli (NGV) — mengurangkan penggunaan bahan api fosil.",
        },
        {
          id: "alam-sekitar",
          icon: "🌍",
          label: "Alam Sekitar",
          fact: "Produk biodegradasi dan baja kompos — kesan kepada alam sekitar dapat diminimumkan.",
        },
        {
          id: "ekonomi",
          icon: "💰",
          label: "Ekonomi",
          fact: "Industri fotovolta (panel solar) — meningkatkan ekonomi negara melalui teknologi canggih.",
        },
        {
          id: "sosial",
          icon: "🏘️",
          label: "Sosial",
          fact: "Bekas makanan mesra alam, penggunaan pengangkutan awam — meningkatkan kualiti hidup rakyat.",
        },
      ],
      checks: [
        {
          question: "Apakah kelebihan kereta hibrid berbanding kereta biasa?",
          hint: "Mengurangkan penggunaan bahan api fosil dan mempromosikan kecekapan guna tenaga, sekali gus meminimumkan kesan negatif kepada alam sekitar.",
        },
      ],
    },
    {
      number: "10.4",
      title: "Kepentingan Teknologi Hijau",
      intro:
        "Pembangunan dan penggunaan teknologi hijau yang lebih meluas mampu memacu sektor pembinaan negara ke tahap yang lebih maju dan mesra alam — memberi manfaat dari segi sosial (kualiti hidup, kesihatan, kualiti udara) dan ekonomi (kos operasi, nilai aset, peluang eksport). Bangunan Berlian Suruhanjaya Tenaga Malaysia di Putrajaya dan Bangunan Pusat Tenaga Malaysia (PTM, dilengkapi sistem fotovolta bersepadu/BIPV) adalah contoh bangunan hijau di Malaysia.",
      tabGroups: [
        {
          title: "Manfaat sosial dan ekonomi",
          tabs: [
            {
              title: "Sosial",
              body: "Meningkatkan kualiti hidup, kemudahan infrastruktur tempatan, keselesaan dan kesihatan masyarakat, kualiti udara — sambil mengurangkan peningkatan suhu dan pencemaran bunyi.",
            },
            {
              title: "Ekonomi",
              body: "Mengurangkan kos operasi, meningkatkan nilai aset dan keuntungan, produktiviti pekerja, serta peluang mengeksport produk hijau — contohnya industri fotovolta yang menyumbang kepada KDNK negara.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Apakah kepentingan penggunaan fotovolta?",
          hint: "Fotovolta menukar cahaya matahari kepada tenaga elektrik tanpa memerlukan bateri berasingan — menjimatkan kos jangka panjang sambil menyumbang kepada ekonomi melalui industri tenaga suria.",
        },
      ],
    },
    {
      number: "10.5",
      title: "Amalan Berkonsepkan Teknologi Hijau",
      intro:
        "Amalan berkonsepkan teknologi hijau boleh mengatasi kemusnahan alam sekitar, meningkatkan tahap kehidupan dan memelihara ekosistem — kecil sifatnya tetapi bermakna apabila diamalkan secara konsisten dalam kehidupan seharian, di rumah, sekolah dan tempat kerja.",
      accordions: [
        {
          title: "💡 Penjimatan tenaga",
          body: "Gunakan pencahayaan semula jadi, tutup suis dan cabut plag peralatan yang tidak digunakan, tetapkan suhu penyaman udara minimum pada 24°C.",
        },
        {
          title: "💧 Penjimatan air",
          body: "Pastikan pili air ditutup dengan betul, laporkan kebocoran paip segera, tadah air hujan untuk kegunaan mencuci dan menyiram tumbuhan.",
        },
        {
          title: "🚗 Pengangkutan",
          body: "Gunakan pengangkutan awam atau perkongsian kenderaan, manfaatkan perkhidmatan park and ride, galakkan berbasikal atau berjalan kaki.",
        },
        {
          title: "♻️ Amalan 5R",
          body: "Rethink, repair, reuse, reduce, recycle — memikir semula, memperbaiki, menggunakan semula, mengurangkan dan mengitar semula.",
        },
      ],
      checks: [
        {
          question: "Nyatakan dua amalan penjimatan air selain yang telah disenaraikan.",
          hint: "Contohnya: menutup air paip semasa menggosok gigi, dan menggunakan mesin basuh hanya apabila muatan penuh.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menyatakan konsep teknologi hijau.",
    "Saya dapat menerangkan ciri-ciri dan menunjukkan contoh produk teknologi hijau.",
    "Saya dapat membahaskan kepentingan teknologi hijau.",
    "Saya dapat mencadangkan amalan berkonsepkan teknologi hijau.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Tenaga yang dikategorikan dalam teknologi hijau termasuk tenaga daripada bahan api fosil.",
      answer: false,
      explanation: "Salah — teknologi hijau merangkumi tenaga suria, angin, air dan ombak, BUKAN bahan api fosil.",
    },
    {
      type: "multiple-choice",
      question: "Beg plastik biodegradasi tergolong dalam teras teknologi hijau yang manakah?",
      options: ["Tenaga", "Alam Sekitar", "Ekonomi", "Sosial"],
      answerIndex: 1,
      explanation: "Alam Sekitar — kerana ia mengurangkan kesan kepada alam sekitar melalui proses biodegradasi (pereputan semula jadi).",
    },
  ],
};
