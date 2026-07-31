import type { GeoF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/geography/form2/ch8-pengangkutan-di-asia.png";

export const geographyF2C8Interactive: GeoF2InteractiveContent = {
  chapter: 8,
  blogHighlight: {
    title: "🚄 Tahukah Anda? — Shinkansen Tidak Pernah Lewat",
    body: "Kereta api berkelajuan tinggi Shinkansen di Jepun telah beroperasi selama 50 tahun tanpa sebarang kemalangan maut — sebuah rekod keselamatan yang jarang ditandingi mana-mana sistem pengangkutan di dunia.",
    imagePath: chapterImage,
  },
  keywords: ["Hab Penerbangan", "Bullet Train", "Pelabuhan Kontena", "Integrasi"],
  sections: [
    {
      number: "8.1",
      title: "Jenis Pengangkutan di Asia",
      intro:
        "Perkembangan sistem pengangkutan di negara-negara Asia mengikuti tiga jaringan: darat, air dan udara. Hampir keseluruhan negara di Asia mempunyai jaringan landasan kereta api sebagai pengangkutan darat utama — India memiliki jaringan terbanyak di dunia (66,687 km), manakala landasan Trans-Siberian di Rusia sepanjang 9,288 km menghubungkan Moscow hingga Vladivostok. Lapangan terbang menjadi pintu masuk utama sesebuah negara — Lapangan Terbang Dubai (UAE) tersibuk di dunia (83.6 juta penumpang, 2016), manakala Changi (Singapura) diiktiraf lapangan terbang terbaik dunia. Pelabuhan pula penting untuk urusan perdagangan — Pelabuhan Hong Kong mengendalikan 19.8 juta kontena setahun, antara yang tersibuk dan terpantas di dunia.",
      flipCards: [
        {
          id: "darat",
          icon: "🚆",
          label: "Darat",
          fact: "India memiliki jaringan landasan kereta api terbanyak di dunia (66,687 km). Landasan Trans-Siberian di Rusia sepanjang 9,288 km.",
        },
        {
          id: "udara",
          icon: "✈️",
          label: "Udara",
          fact: "Lapangan Terbang Dubai — tersibuk di dunia (83.6 juta penumpang, 2016). Changi, Singapura — lapangan terbang terbaik dunia.",
        },
        {
          id: "air",
          icon: "🚢",
          label: "Air",
          fact: "Pelabuhan Hong Kong mengendalikan 19.8 juta kontena setahun — antara yang tersibuk dan terpantas di dunia.",
        },
      ],
      checks: [
        {
          question: "Negara manakah yang mempunyai jaringan landasan kereta api terbanyak di dunia?",
          hint: "India — dengan landasan sepanjang 66,687 km.",
        },
      ],
    },
    {
      number: "8.2",
      title: "Kemajuan Pengangkutan di Asia",
      intro:
        "Negara-negara Asia sentiasa mengadakan penyelidikan tentang sistem pengangkutan demi memastikan keselamatan dan kecekapan lalu lintas. Tiga contoh kemajuan yang menjadi rujukan dunia ialah Shinkansen (Jepun), Lapangan Terbang Antarabangsa Dubai dan Pelabuhan Hong Kong — setiap satu menunjukkan bagaimana pelaburan dalam teknologi dan infrastruktur boleh mengubah taraf sesebuah rangkaian pengangkutan.",
      accordions: [
        {
          title: "🚄 Shinkansen, Jepun",
          body: "Menghubungkan Hokkaido, Honshu, Shikoku dan Kyushu dengan kereta api berkelajuan tinggi (bullet train) pada 320 km/j, diuruskan oleh Japanese National Railways (JNR). 358 perkhidmatan sehari membawa ~445,000 penumpang — tidak pernah lewat dan bebas kemalangan maut selama 50 tahun beroperasi. Projek masa depan, Chuo Shinkansen, menggunakan Superconducting Maglev System (daya elektromagnet mengangkat kereta api tanpa sentuhan landasan).",
        },
        {
          title: "✈️ Lapangan Terbang Antarabangsa Dubai",
          body: "Lapangan terbang tersibuk di dunia, mengendalikan 83.6 juta penumpang (2016). Hab penerbangan terbesar di Asia Barat — menyumbang USD26.7 bilion (27% KDNK Dubai) dan menyediakan 90,000 peluang pekerjaan.",
        },
        {
          title: "🚢 Pelabuhan Hong Kong",
          body: "Terletak strategik di Laut China Selatan yang terlindung secara semula jadi. Mengendalikan 19.8 juta kontena (2016) dengan proses pemunggahan hanya 10 jam purata — antara yang terpantas di dunia.",
        },
      ],
      checks: [
        {
          question: "Apakah keistimewaan sistem Shinkansen yang menjadikannya contoh terbaik dunia?",
          hint: "Menepati masa (tidak pernah lewat), rekod keselamatan cemerlang (tiada kemalangan maut selama 50 tahun), dan tahap keselesaan penumpang yang tinggi.",
        },
      ],
    },
    {
      number: "8.3",
      title: "Kesan Pengangkutan terhadap Masyarakat, Ekonomi dan Alam Sekitar di Asia",
      intro:
        "Perkembangan pengangkutan di Asia menimbulkan kesan terhadap masyarakat (memendekkan masa perjalanan, meningkatkan taraf hidup, integrasi, ketersampaian dan peluang pekerjaan), ekonomi (bandar berkembang menjadi hab perdagangan seperti Tokyo dan Osaka, pembinaan pusat pelancongan seperti Burj Al Arab) dan alam sekitar — dengan kesan positif dan negatif yang bertentangan.",
      tabGroups: [
        {
          title: "Dua sisi kemajuan",
          tabs: [
            {
              title: "Kesan Positif",
              body: "Memendekkan masa perjalanan, meningkatkan taraf hidup dan integrasi, mewujudkan peluang pekerjaan, membangunkan bandar sebagai hab perdagangan (Tokyo, Osaka), dan menggalakkan sektor pelancongan serta perhotelan.",
            },
            {
              title: "Kesan Negatif",
              body: "Pencemaran bunyi daripada lapangan terbang, pencemaran air akibat tumpahan minyak kapal, dan kemusnahan hutan akibat pembinaan lebuh raya, jaringan kereta api dan lapangan terbang.",
            },
          ],
        },
      ],
      checks: [
        {
          question: "Bagaimanakah kereta api berkelajuan tinggi dapat mengurangkan kesan negatif terhadap alam sekitar?",
          hint: "Ia mengurangkan pencemaran alam sekitar berbanding pengangkutan berasaskan bahan api fosil, dan menghasilkan perubahan landskap yang lebih mesra alam.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti jaringan landasan kereta api, lapangan terbang dan pelabuhan utama di Asia.",
    "Saya dapat menghuraikan kemajuan pengangkutan di Asia.",
    "Saya dapat menilai kesan pengangkutan terhadap masyarakat, ekonomi dan alam sekitar di Asia.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Lapangan Terbang Antarabangsa Changi diiktiraf sebagai lapangan terbang terbaik di dunia.",
      answer: true,
      explanation: "Betul — Changi mengendalikan 58.7 juta penumpang (2016) dan diiktiraf sebagai lapangan terbang terbaik dunia.",
    },
    {
      type: "multiple-choice",
      question: "Landasan kereta api Trans-Siberian menganjur dari mana ke mana?",
      options: ["Moscow ke Vladivostok", "Beijing ke Shanghai", "Tokyo ke Osaka", "Dubai ke Abu Dhabi"],
      answerIndex: 0,
      explanation: "Moscow hingga Vladivostok — sepanjang kira-kira 9,288 km.",
    },
  ],
};
