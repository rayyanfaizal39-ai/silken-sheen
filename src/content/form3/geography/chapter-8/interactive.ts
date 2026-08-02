import type { GeoF3InteractiveContent } from "../interactive-types";

export const geographyF3C8Interactive: GeoF3InteractiveContent = {
  chapter: 8,
  blogHighlight: {
    title: "Tahukah Anda? — Hidupan Gurun Menjimatkan Air",
    body: "Banyak haiwan Gurun Panas bersifat nokturnal. Haiwan ini berteduh ketika siang yang sangat panas dan keluar mencari makanan pada waktu malam untuk mengurangkan kehilangan air dan tenaga.",
  },
  keywords: ["Xerofit", "Nokturnal", "Transpirasi", "Hibernasi", "Fros", "Biome"],
  sections: [
    {
      number: "8.1",
      title: "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
      intro:
        "Tumbuh-tumbuhan semula jadi dan hidupan liar berbeza antara kawasan kerana setiap biome mempunyai suhu, hujan dan musim yang berlainan. Di kawasan kering, organisma perlu menjimatkan air; di kawasan monsun, tumbuhan menyesuaikan diri dengan musim kering; di kawasan sederhana, perubahan empat musim mempengaruhi daun dan tingkah laku haiwan; di kawasan sejuk, bentuk pokok serta daun membantu menghadapi salji dan fros.",
      zoneExplorer: {
        title: "Empat biome dunia",
        instruction:
          "Pilih satu biome untuk melihat lokasi, ciri tumbuh-tumbuhan dan ciri hidupan liarnya.",
        examplesLabel: "Contoh tumbuh-tumbuhan",
        activitiesLabel: "Contoh hidupan liar",
        zones: [
          {
            name: "Gurun Panas",
            description:
              "Lokasi: Gurun Thar, Gurun Arab, Gurun Iran, Gurun Mojave, Gurun Sahara, Gurun Atacama dan Gurun Besar Australia.",
            facts: [
              {
                label: "Ciri tumbuh-tumbuhan",
                value:
                  "Xerofit tumbuh jarang; akar panjang mencari air dan daun kecil, liat, berkilat atau berduri mengurangkan transpirasi.",
              },
              {
                label: "Ciri hidupan liar",
                value:
                  "Kebanyakannya nokturnal, tahan kekurangan air dan berlindung daripada suhu siang yang tinggi.",
              },
            ],
            examples: [
              "Kaktus",
              "Prickly pear",
              "Rumput esparto",
              "Semak berduri",
              "Akasia bantut",
            ],
            activities: ["Unta", "Kala jengking", "Tikus jerboa", "Musang fennec", "Rusa gazelle"],
          },
          {
            name: "Hutan Monsun Tropika",
            description:
              "Lokasi: India, Sri Lanka, Bangladesh, Filipina, Myanmar, Thailand dan Laos.",
            facts: [
              {
                label: "Ciri tumbuh-tumbuhan",
                value:
                  "Pokok berkayu keras setinggi kira-kira 20–30 meter, berdaun lebar dan menggugurkan daun pada musim kering untuk mengurangkan kehilangan air.",
              },
              {
                label: "Ciri hidupan liar",
                value:
                  "Haiwan besar banyak berada di lantai hutan, manakala monyet dan burung hidup pada lapisan atas; terdapat juga haiwan karnivor.",
              },
            ],
            examples: ["Jati", "Penaga", "Cendana", "Jelutung", "Buluh", "Rotan"],
            activities: ["Rusa", "Gajah", "Harimau Bengal", "Monyet", "Buaya"],
          },
          {
            name: "Hutan Daun Luruh Sederhana",
            description:
              "Lokasi: Amerika Utara, Jepun, New Zealand, Amerika Selatan, Eropah Barat, Korea Selatan dan Australia.",
            facts: [
              {
                label: "Ciri tumbuh-tumbuhan",
                value:
                  "Daun nipis dan lembut berubah warna lalu gugur menjelang musim sejuk; kulit batang yang tebal membantu menghadapi suhu rendah.",
              },
              {
                label: "Ciri hidupan liar",
                value:
                  "Haiwan menyesuaikan diri dengan empat musim melalui penghijrahan, penyimpanan makanan atau hibernasi.",
              },
            ],
            examples: ["Oak", "Ash", "Elm", "Berangan", "Maple", "Poplar"],
            activities: ["Chipmunk", "Rusa", "Badger", "Beaver", "Musang merah"],
          },
          {
            name: "Hutan Konifer",
            description: "Lokasi: Amerika Utara, Kanada Utara, Eropah dan Rusia.",
            facts: [
              {
                label: "Ciri tumbuh-tumbuhan",
                value:
                  "Kanopi berbentuk kon supaya salji mudah meluncur. Daun kecil berbentuk jarum dan bersalut lilin untuk menghadapi fros serta mengurangkan transpirasi.",
              },
              {
                label: "Ciri hidupan liar",
                value:
                  "Haiwan aktif mencari makanan pada musim panas; sesetengah mamalia berhibernasi dan burung berhijrah ketika musim sejuk.",
              },
            ],
            examples: ["Pain", "Fir", "Sprus", "Cedar"],
            activities: ["Beruang", "Moose", "Lynx", "Tupai merah", "Burung hantu"],
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah tumbuhan xerofit boleh hidup di Gurun Panas?",
          hint: "Akar yang panjang membantu mendapatkan air, manakala daun yang kecil, liat atau berduri mengurangkan kehilangan air.",
        },
        {
          question: "Mengapakah daun pokok Hutan Konifer bersalut lilin?",
          hint: "Salutan lilin mengurangkan transpirasi dan melindungi daun daripada fros.",
        },
      ],
    },
    {
      number: "8.2",
      title: "Kepentingan Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
      intro:
        "Tumbuh-tumbuhan semula jadi dan hidupan liar memberi manfaat sejagat. Kawasan hutan serta haiwan unik menarik pelancong; litupan tumbuhan melindungi tanih; kayu dan hasil hutan menjana kegiatan ekonomi; pelbagai bahagian tumbuhan pula menjadi sumber ubat. Manfaat ini bergantung pada pengurusan yang mengelakkan penerokaan berlebihan.",
      flipCards: [
        {
          id: "pelancongan",
          icon: "🏞️",
          label: "Pelancongan",
          fact: "Landskap dan hidupan liar menjadi tarikan ekopelancongan, seperti unta di Gurun Panas dan gajah di taman negara Thailand.",
        },
        {
          id: "hakisan",
          icon: "🛡️",
          label: "Penghalang Hakisan",
          fact: "Daun memecahkan titisan hujan, akar mengikat tanih dan mengurangkan air larian, manakala bakau menahan tindakan ombak.",
        },
        {
          id: "ekonomi",
          icon: "💰",
          label: "Sumber Ekonomi",
          fact: "Hutan Konifer dan Hutan Monsun Tropika membekalkan kayu balak untuk eksport serta industri kertas dan pembinaan.",
        },
        {
          id: "perubatan",
          icon: "💊",
          label: "Sumber Perubatan",
          fact: "Daun, bunga, akar, buah dan kulit kayu digunakan dalam perubatan, contohnya prickly pear dan daun pain yang kaya vitamin C.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah tumbuh-tumbuhan semula jadi menghalang hakisan?",
          hint: "Daun mengurangkan daya hentaman hujan, sementara akar mengikat tanih dan memperlahankan air larian permukaan.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti empat biome utama yang dipelajari.",
    "Saya dapat menjelaskan ciri tumbuh-tumbuhan dan hidupan liar bagi setiap biome.",
    "Saya dapat menghubungkan adaptasi organisma dengan iklim setempat.",
    "Saya dapat merumuskan kepentingan tumbuh-tumbuhan semula jadi dan hidupan liar.",
  ],
  miniQuiz: [
    {
      type: "multiple-choice",
      question: "Biome manakah mempunyai pokok berkanopi kon dan daun berbentuk jarum?",
      options: ["Gurun Panas", "Hutan Monsun Tropika", "Hutan Daun Luruh", "Hutan Konifer"],
      answerIndex: 3,
      explanation:
        "Hutan Konifer mempunyai pokok berbentuk kon dan daun jarum yang sesuai dengan salji serta fros.",
    },
    {
      type: "true-false",
      question: "Betul atau salah: Semua hidupan Gurun Panas aktif pada waktu siang.",
      answer: false,
      explanation:
        "Salah — banyak hidupan gurun bersifat nokturnal untuk mengelakkan haba siang dan menjimatkan air.",
    },
  ],
};
