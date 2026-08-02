import type { GeoF3InteractiveContent } from "../interactive-types";

export const geographyF3C5Interactive: GeoF3InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "🐅 Tahukah Anda? — Cap Jari Harimau",
    body: "Setiap Harimau Malaya mempunyai corak belang yang berbeza seperti cap jari manusia — dan penglihatannya pada waktu malam adalah enam kali ganda lebih baik daripada manusia.",
  },
  keywords: ["Hidupan Liar", "Aras Trofik", "Ekopelancongan", "Konservasi", "Biodiversiti"],
  sections: [
    {
      number: "5.1",
      title: "Hidupan Liar di Malaysia",
      intro:
        "Menurut Akta Pemuliharaan Hidupan Liar 2010, hidupan liar ialah spesies haiwan liar atau burung liar, sama ada yang dilindungi sepenuhnya atau yang dilindungi, vertebrata atau invertebrata, hidup atau mati, matang atau tidak matang. Malaysia yang beriklim Khatulistiwa dan dilitupi pelbagai jenis hutan menjadi habitat semula jadi kepada ratusan spesies hidupan liar, termasuk beberapa spesies unik dan terancam yang hanya boleh ditemui di rantau ini.",
      flipCards: [
        {
          id: "harimau-malaya",
          icon: "🐅",
          label: "Harimau Malaya",
          fact: "Populasi: 250–340 ekor. Habitat: hutan pamah, paya gambut dan hutan gunung. Pemakanan: karnivor.",
        },
        {
          id: "badak-sumatera",
          icon: "🦏",
          label: "Badak Sumatera",
          fact: "Populasi: tinggal 1 ekor di Sabah. Habitat: tanah rendah berbukit dan lembah. Pemakanan: herbivor.",
        },
        {
          id: "gajah-pygmy",
          icon: "🐘",
          label: "Gajah Pygmy",
          fact: "Populasi: kurang daripada 1,500 ekor. Habitat: tanah rendah dan lembah Kinabatangan. Pemakanan: herbivor.",
        },
        {
          id: "orang-utan",
          icon: "🦧",
          label: "Orang Utan",
          fact: "Populasi: lebih kurang 12,300 ekor. Habitat: hutan tanah rendah, tropika, paya dan gunung. Pemakanan: omnivor.",
        },
        {
          id: "penyu",
          icon: "🐢",
          label: "Penyu",
          fact: "Habitat: pantai berpasir dan pulau-pulau untuk bertelur. Pemakanan: omnivor.",
        },
        {
          id: "dugong",
          icon: "🐋",
          label: "Dugong",
          fact: "Populasi: lebih kurang 100 ekor. Habitat: padang rumput laut. Pemakanan: herbivor.",
        },
        {
          id: "monyet-belanda",
          icon: "🐒",
          label: "Monyet Belanda",
          fact: "Populasi: lebih kurang 5,000 ekor. Habitat: hutan dipterokarpa dan paya bakau. Pemakanan: omnivor.",
        },
        {
          id: "tapir",
          icon: "🐾",
          label: "Tapir",
          fact: "Populasi: 1,100–1,500 ekor. Habitat: hutan tropika hingga pergunungan rendah. Pemakanan: herbivor.",
        },
      ],
      checks: [
        {
          question:
            "Mengapakah hidupan liar seperti Badak Sumatera dan Harimau Malaya perlu dilindungi segera?",
          hint: "Populasi mereka sudah sangat rendah (Badak Sumatera tinggal 1 ekor di Sabah, Harimau Malaya kira-kira 250–340 ekor) — tanpa perlindungan segera, mereka berisiko pupus sepenuhnya.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Kepentingan Hidupan Liar di Malaysia",
      intro:
        "Hidupan liar memainkan peranan penting dalam rantaian atau siratan makanan sesuatu ekosistem melalui aras trofik — susunan peringkat berdasarkan cara sesuatu organisma mendapatkan tenaga makanan. Tenaga mengalir daripada pengeluar kepada pengguna primer, seterusnya kepada pengguna sekunder dan pengguna tertier. Gangguan pada mana-mana satu aras trofik akan menjejaskan keseluruhan rantaian makanan dan keseimbangan ekosistem.",
      sequence: {
        title: "🔗 Aras trofik — rantaian yang menghubungkan semua hidupan",
        instruction: "Ikuti aliran tenaga daripada pengeluar hingga pengguna tertier.",
        steps: [
          {
            title: "Pengeluar",
            body: "Organisma yang boleh menghasilkan makanan sendiri melalui proses fotosintesis, seperti tumbuh-tumbuhan hijau dan fitoplankton. Pengeluar menjadi sumber tenaga asas kepada keseluruhan rantaian makanan.",
            detail: "🌿",
          },
          {
            title: "Pengguna Primer",
            body: "Haiwan herbivor dan sesetengah omnivor yang memakan organisma pengeluar secara terus, seperti rusa, arnab dan gajah.",
            detail: "🐛",
          },
          {
            title: "Pengguna Sekunder",
            body: "Haiwan omnivor dan karnivor yang memakan pengguna primer, seperti ular dan musang.",
            detail: "🐍",
          },
          {
            title: "Pengguna Tertier",
            body: "Haiwan karnivor sekunder yang memakan pengguna sekunder — biasanya pemangsa puncak dalam rantaian makanan, seperti helang dan harimau.",
            detail: "🦅",
          },
        ],
      },
      cards: [
        {
          title: "⚖️ Keseimbangan Ekosistem",
          body: "Setiap spesies hidupan liar merupakan sebahagian daripada siratan makanan — kehilangan satu spesies boleh menjejaskan spesies lain dalam rantaian yang sama.",
        },
        {
          title: "🏞️ Ekopelancongan",
          body: "Hidupan liar menarik pelancong dalam dan luar negara, membuka peluang pekerjaan sebagai pemandu pelancong dan jurulatih di kawasan konservasi.",
        },
        {
          title: "📚 Pendidikan",
          body: "Kepelbagaian hidupan liar membuka peluang penyelidikan dan pembangunan (R&D) serta kerjaya sebagai veterinar dan penyelidik alam sekitar.",
        },
      ],
      checks: [
        {
          question:
            "Apakah yang akan berlaku sekiranya populasi pengguna primer menurun secara mendadak?",
          hint: "Pengguna sekunder akan kekurangan sumber makanan, menyebabkan gangguan aliran tenaga di seluruh aras trofik dan mengganggu keseimbangan keseluruhan ekosistem.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Kegiatan Manusia yang Mengancam Hidupan Liar di Malaysia",
      intro:
        "Pembangunan ekonomi yang pesat di Malaysia turut membawa pelbagai kegiatan manusia yang mengancam kelangsungan hidupan liar. Kegiatan ini secara langsung memusnahkan habitat semula jadi serta mengganggu rantaian makanan dan keseimbangan ekosistem, walaupun ia dijalankan untuk memenuhi keperluan pembangunan negara.",
      flipCards: [
        {
          id: "pembalakan",
          icon: "🪵",
          label: "Pembalakan",
          fact: "Menyebabkan kemusnahan habitat, hakisan tanih, penurunan kadar sejat peluhan dan peningkatan kandungan karbon dioksida di atmosfera.",
        },
        {
          id: "pengkuarian",
          icon: "⛏️",
          label: "Pengkuarian",
          fact: "Menyebabkan kemusnahan habitat, bunyi bising, pencemaran udara dan air, serta risiko banjir di kawasan rendah berhampiran.",
        },
        {
          id: "empangan",
          icon: "🏗️",
          label: "Pembinaan Empangan",
          fact: "Melibatkan penenggelaman kawasan hutan secara besar-besaran, memusnahkan habitat dan menjejaskan rantai makanan hidupan liar.",
        },
        {
          id: "pertanian",
          icon: "🌾",
          label: "Pertanian",
          fact: "Mengubah landskap semula jadi, mengganggu rantai makanan, merosotkan kualiti tanih dan mencemari sungai dengan racun serangga serta baja kimia.",
        },
        {
          id: "pengangkutan",
          icon: "🛣️",
          label: "Pengangkutan dan Perhubungan",
          fact: "Memerlukan penebangan hutan yang luas untuk pembinaan jalan raya, mengganggu habitat dan menyebabkan hidupan liar mati dilanggar kenderaan.",
        },
      ],
      checks: [
        {
          question: "Bagaimanakah pembinaan empangan memusnahkan habitat flora dan fauna?",
          hint: "Pembinaan empangan memerlukan penenggelaman kawasan hutan yang luas, memusnahkan habitat hidupan liar secara terus dan mengganggu keseimbangan ekosistem serta rantai makanan.",
        },
      ],
    },
    {
      number: "5.4",
      title: "Usaha Pemeliharaan dan Pemuliharaan Hidupan Liar di Malaysia",
      intro:
        "Menyedari ancaman yang dihadapi oleh hidupan liar, kerajaan dan pelbagai pihak telah menjalankan usaha bersepadu untuk memelihara dan memulihara hidupan liar di Malaysia. Usaha ini merangkumi aspek perundangan, kesedaran awam, penyelidikan dan pendidikan bagi memastikan hidupan liar terus hidup lestari untuk generasi akan datang.",
      accordions: [
        {
          title: "⚖️ Undang-undang",
          body: "Akta Kualiti Alam Sekeliling 1974, Akta Perhutanan Negara 1984 dan Akta Pemuliharaan Hidupan Liar 2010 — mewartakan taman negara, mengeluarkan lesen memburu, dan menghukum pesalah yang memburu secara haram.",
        },
        {
          title: "📢 Kempen kesedaran",
          body: "Kempen Save The Day (penyu dan harimau), We Hug Tapir 2018, dan Hari Tenggiling Sedunia — bertujuan memberi kesedaran kepada masyarakat tentang risiko kepupusan spesies tertentu.",
        },
        {
          title: "🏞️ Pusat konservasi dan taman negara",
          body: "Ditubuhkan untuk tujuan penyelidikan, pendidikan, rekreasi dan ekologi — contohnya Pusat Konservasi Gajah Kebangsaan Kuala Gandah dan Pusat Pemulihan Orang Utan Sepilok.",
        },
        {
          title: "🔬 Penyelidikan dan Pembangunan (R&D)",
          body: "Mengenal pasti habitat, spesies penyakit, kaedah pembiakan dan tabiat hidupan liar — contohnya kajian habitat Harimau Malaya yang dijalankan oleh PERHILITAN.",
        },
        {
          title: "📋 Penilaian Impak Alam Sekitar (EIA)",
          body: "Kajian wajib untuk projek pembangunan besar (contohnya pembalakan melebihi 500 hektar atau empangan hidroelektrik melebihi 400 hektar) — meramal dan mengurangkan kesan alam sekitar sebelum projek diluluskan.",
        },
        {
          title: "🎓 Pendidikan alam sekitar",
          body: "Diselitkan dalam mata pelajaran Geografi dan mata pelajaran lain di sekolah — membina kesedaran, motivasi dan kemahiran murid untuk membantu menyelesaikan isu alam sekitar.",
        },
        {
          title: "🌲 Pewartaan hutan simpan",
          body: "Kawasan hutan yang diwartakan secara rasmi untuk tujuan perhutanan dan ditadbir oleh Jabatan Perhutanan Negeri — pokok di kawasan ini dilindungi undang-undang dan tidak boleh ditebang sewenang-wenangnya.",
        },
      ],
      checks: [
        {
          question:
            "Apakah tujuan Penilaian Impak Alam Sekitar (EIA) dijalankan sebelum sesuatu projek pembangunan diluluskan?",
          hint: "Untuk meramal dan menjangkakan kesan projek terhadap alam sekitar, meneliti alternatif terbaik, dan memberi langkah kawalan bagi mengurangkan kesan negatif sekiranya projek diluluskan.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mengenal pasti hidupan liar di Malaysia.",
    "Saya dapat menghuraikan kepentingan hidupan liar di Malaysia.",
    "Saya dapat membahaskan kegiatan manusia yang mengancam hidupan liar.",
    "Saya dapat menjelaskan usaha pemeliharaan dan pemuliharaan hidupan liar di Malaysia.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "Betul atau salah: Akta Perhutanan Negara 1984 bertujuan mengeluarkan lesen untuk permohonan memburu haiwan.",
      answer: false,
      explanation:
        "Salah — Akta Pemuliharaan Hidupan Liar 2010lah yang mengeluarkan lesen memburu; Akta Perhutanan Negara 1984 pula mengurus pemuliharaan dan pembangunan hutan.",
    },
    {
      type: "multiple-choice",
      question: "Dalam aras trofik, siapakah yang memakan pengguna primer?",
      options: ["Pengeluar", "Pengguna sekunder", "Pengguna tertier sahaja", "Tiada satu pun"],
      answerIndex: 1,
      explanation:
        "Pengguna sekunder — haiwan omnivor dan karnivor yang memakan pengguna primer dalam rantaian aras trofik.",
    },
  ],
};
