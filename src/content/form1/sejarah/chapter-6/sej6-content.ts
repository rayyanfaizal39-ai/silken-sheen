// Source-verified content for Sejarah Form 1, Bab 6 — Peningkatan Tamadun Yunani dan Rom
// Sourced from T1 BT SEJ - SEJARAH.pdf (textbook pages 116-134).
// Content data only — no presentation markup.

export interface OfficialSubtopic {
  number: "6.1" | "6.2" | "6.3" | "6.4";
  title: string;
  navigationLabel: string;
}

export interface Polis {
  name: string;
  population: string;
  area: string;
  note?: string;
}

export interface GovernmentSystem {
  name: string;
  definition: string;
}

export interface AthensAdministrationBody {
  name: "Dewan Perhimpunan" | "Majlis" | "Majistret" | "Juri";
  description: string;
  membership: string[];
  functions: string[];
}

export interface RomanEra {
  name: string;
  duration: string;
}

export interface RomanBuilding {
  name: string;
  function: string;
  details: string[];
}

export interface Sej6Content {
  chapterTitle: string;
  officialSubtopics: OfficialSubtopic[];
  greekCivilisation: {
    introductionHeading: string;
    introduction: string;
    locationHeading: string;
    location: string[];
    polis: {
      heading: string;
      definition: string;
      acropolis: string;
      agora: string;
      famousPolis: Polis[];
      civicMeaning: string;
    };
  };
  greekGovernment: {
    introduction: string;
    fiveSystems: GovernmentSystem[];
    athensDemocracy: {
      heading: string;
      development: string;
      founder: string;
      founderDate: string;
      type: string;
      pericles: string;
      end: string;
    };
    athensAdministration: {
      heading: string;
      hierarchy: string[];
      bodies: AthensAdministrationBody[];
    };
    spartaAdministration: {
      heading: string;
      system: string;
      kings: {
        count: number;
        purpose: string;
        families: string[];
      };
      assembly: { name: string; membership: string };
      ephors: { count: number; function: string };
      council: { name: string; membership: string; age: string; term: string };
      militaryDiscipline: string[];
    };
  };
  romanCivilisation: {
    introductionHeading: string;
    introduction: string;
    rivals: string[];
    locationHeading: string;
    latium: string;
    tiber: string;
    eras: RomanEra[];
    paxRomana: string;
    socialGroups: { name: string; composition: string }[];
  };
  romanArchitecture: {
    introduction: string[];
    factors: { name: string; detail: string }[];
    characteristicsHeading: string;
    characteristicsIntroduction: string;
    characteristics: string[];
    buildings: RomanBuilding[];
  };
  summary: {
    title: string;
    greekHeading: string;
    greek: string[];
    romanHeading: string;
    roman: string[];
    conclusion: string;
  };
}

export const sej6Content: Sej6Content = {
  chapterTitle: "Peningkatan Tamadun Yunani dan Rom",
  officialSubtopics: [
    { number: "6.1", title: "Tamadun Yunani", navigationLabel: "Tamadun Yunani" },
    {
      number: "6.2",
      title: "Peningkatan Pemerintahan dan Pentadbiran Tamadun Yunani",
      navigationLabel: "Pemerintahan dan Pentadbiran Yunani",
    },
    { number: "6.3", title: "Tamadun Rom", navigationLabel: "Tamadun Rom" },
    {
      number: "6.4",
      title: "Peningkatan Seni Bina dalam Tamadun Rom",
      navigationLabel: "Seni Bina Rom",
    },
  ],
  greekCivilisation: {
    introductionHeading: "Pengenalan",
    introduction:
      "Tamadun Yunani yang berkembang antara tahun 1,000 SM hingga 800 SM merupakan pencetus kepada perkembangan tamadun Eropah. Zaman ini dilihat oleh masyarakat Eropah moden sebagai zaman yang memberikan inspirasi dan panduan kepada kehidupan manusia yang lebih baik menerusi pelbagai pencapaian dalam pemerintahan dan bidang pentadbiran melalui pengenalan sistem demokrasi, ekonomi, sains dan teknologi, kesusasteraan serta falsafah dan pendidikan.",
    locationHeading: "Lokasi dan Perkembangannya",
    location: [
      "Tamadun Yunani berkembang di Semenanjung Greece dan pulau-pulau yang bertaburan di Laut Aegean serta Laut Mediterranean.",
      "Cuaca yang sederhana telah membolehkan kegiatan di luar rumah seperti perdebatan dan sukan giat dijalankan di Yunani.",
      "Kedudukannya yang berhampiran dengan laut menyebabkan orang Yunani dikenali sebagai pelayar yang handal.",
    ],
    polis: {
      heading: "Konsep Polis",
      definition:
        "Tamadun Yunani terkenal dengan negara-kota atau polis yang merupakan gabungan tiga komponen, iaitu bandar utama, bandar kecil dan kawasan kampung. Polis bukan sahaja menjadi ibu kota tetapi menjadi pusat tumpuan masyarakat.",
      acropolis:
        "Di tengah-tengah polis, terdapat acropolis, iaitu pusat komuniti yang dilindungi oleh kubu. Acropolis merupakan lokasi yang paling strategik dari segi keselamatan, pentadbiran dan komunikasi yang dilengkapi dengan rumah ibadat, bangunan kerajaan, istana dan rumah golongan bangsawan.",
      agora: "Agora ialah kawasan lapang yang digunakan sebagai tempat pertemuan dan pasar awam.",
      famousPolis: [
        {
          name: "Athens",
          population: "40,000 orang",
          area: "2,650 kilometer persegi",
          note: "Negara-kota yang paling ramai penduduk",
        },
        {
          name: "Sparta",
          population: "16,000 orang",
          area: "8,400 kilometer persegi",
          note: "Negara-kota yang paling luas",
        },
        { name: "Corinth", population: "10,000 orang", area: "880 kilometer persegi" },
      ],
      civicMeaning:
        "Bagi penduduk Yunani, setiap polis merupakan tanah suci kurniaan Dewa. Oleh itu, setiap warganegara mempunyai hak dan tanggungjawab untuk menjaga kepentingannya.",
    },
  },
  greekGovernment: {
    introduction:
      "Dalam Tamadun Yunani, aspek pemerintahan dan pentadbiran merupakan sumbangan terpenting dalam perkembangan sejarah dan tamadun manusia. Terdapat lima sistem pemerintahan yang diamalkan di kebanyakan polis, iaitu monarki, oligarki, aristokrasi, tirani dan demokrasi.",
    fiveSystems: [
      {
        name: "Monarki",
        definition:
          "Monarki ialah sistem beraja yang berasaskan keturunan. Raja dibantu oleh Konsul yang terdiri daripada golongan bijak pandai.",
      },
      {
        name: "Oligarki",
        definition:
          "Oligarki ialah pemerintahan yang dikuasai oleh sebahagian kecil golongan yang berkuasa.",
      },
      {
        name: "Aristokrasi",
        definition: "Aristokrasi ialah pemerintahan yang dikuasai oleh golongan bangsawan.",
      },
      {
        name: "Tirani",
        definition:
          "Tirani ialah pemerintahan yang dikuasai oleh golongan yang zalim dan menindas rakyat.",
      },
      {
        name: "Demokrasi",
        definition: "Demokrasi ialah pemerintahan yang dipilih oleh rakyat melalui pengundian.",
      },
    ],
    athensDemocracy: {
      heading: "Perkembangan Sistem Demokrasi di Athens",
      development:
        "Bagi masyarakat di Athens, perkembangan sistem pemerintahan dan pentadbiran berlaku melalui perubahan yang dilaksanakan bagi memantapkan aspek tersebut. Tindakan ini telah memperlihatkan kematangan politik penduduk Athens yang kemudiannya memilih sistem demokrasi sebagai sistem pemerintahan dan pentadbirannya.",
      founder: "Solon",
      founderDate: "594 SM",
      type: "Sistem demokrasi yang diamalkan di Athens merupakan demokrasi langsung. Demokrasi langsung bermaksud setiap warganegara Athens terlibat secara langsung dalam perbincangan dan perdebatan bagi menentukan sesuatu dasar dan peraturan yang berkaitan dengan Athens, termasuklah hal ehwal ekonomi, sosial dan politik.",
      pericles:
        "Pada zaman pemerintahan Pericles (495-429 SM), penekanan diberikan kepada kuasa rakyat bagi memantapkan sistem demokrasi.",
      end: "Demokrasi menjadi lemah dan terhapus pada zaman Raja Philip yang menguasai Yunani pada tahun 338 SM.",
    },
    athensAdministration: {
      heading: "Keanggotaan dan fungsi badan pemerintahan dan pentadbiran di Athens",
      hierarchy: ["Dewan Perhimpunan", "Majlis", "Majistret", "Juri"],
      bodies: [
        {
          name: "Dewan Perhimpunan",
          description:
            "Dewan Perhimpunan merupakan badan pentadbiran yang paling tinggi. Setiap warganegara Athens boleh mengemukakan pandangan berkaitan dasar-dasar pentadbiran yang dijalankan oleh pemerintah.",
          membership: [
            "Anggotanya terdiri daripada semua warganegara lelaki Athens.",
            "Setiap warganegara berpeluang memegang jawatan selama enam bulan hingga setahun.",
            "Bersidang sekurang-kurangnya tiga kali sebulan.",
            "Semua warganegara dibenarkan menghadiri perhimpunan.",
          ],
          functions: [
            "Berperanan melantik Ahli Majlis sebagai sebahagian sistem pentadbiran yang wujud.",
            "Menggubal undang-undang bagi memastikan keadilan dapat dilaksanakan dengan seadil-adilnya di Athens.",
            "Membuat deklarasi peperangan bagi mempertahankan kedaulatan Athens.",
            "Membuat perjanjian dengan negara lain bagi melicinkan hubungan antarabangsa kedua-dua belah pihak.",
            "Membincangkan hal kewangan dan percukaian bagi mengukuhkan ekonomi Athens.",
            "Menerima duta dari negara asing bagi mengukuhkan hubungan antara kedua-dua pihak.",
          ],
        },
        {
          name: "Majlis",
          description:
            "Majlis merupakan jawatankuasa yang mengendalikan urusan dan perbincangan hal-hal penting yang berkaitan pemerintahan dan pentadbiran. Badan ini kadangkala dikenali sebagai Majlis 500.",
          membership: [
            "Ahli dilantik oleh Dewan Perhimpunan.",
            "Ahli terdiri daripada 500 orang dengan keahlian selama dua tahun.",
            "Ahli sebanyak 500 orang dipecahkan kepada 10 jawatankuasa (Prytany) yang setiap satu dianggotai oleh 50 orang.",
            "Pemilihan pengerusi dilakukan pada setiap kali persidangan diadakan.",
          ],
          functions: [
            "Melaksanakan keputusan Dewan Perhimpunan.",
            "Ahli-ahli Majlis bertanggungjawab mengendalikan jabatan-jabatan kerajaan.",
            "Kuasa Majlis tidak mengatasi kuasa Dewan Perhimpunan.",
          ],
        },
        {
          name: "Majistret",
          description:
            "Majistret merupakan badan yang melaksanakan segala dasar yang telah ditetapkan. Majistret sama dengan perkhidmatan awam dalam sistem pentadbiran hari ini.",
          membership: [
            "Warganegara Athens.",
            "Dianggotai 6,000 orang ahli.",
            "Sebanyak 200 hingga 500 orang merupakan hakim.",
            "Sebanyak 10 orang jeneral tentera menganggotai badan ini.",
          ],
          functions: [
            "Merupakan kakitangan kerajaan.",
            "Melaksanakan dasar-dasar yang telah diputuskan oleh Majlis.",
            "Mengurus hal ehwal pendidikan, percukaian, dan sebagainya.",
          ],
        },
        {
          name: "Juri",
          description:
            "Juri merupakan badan yang bertanggungjawab dalam hal yang berkaitan dengan keadilan.",
          membership: [
            "Dianggotai oleh 101 hingga 1001 orang berdasarkan keseriusan kes yang sedang dibicarakan.",
            "Perbicaraan diketuai oleh pengerusi.",
          ],
          functions: [
            "Juri menjadi pemutus kepada sesuatu kes.",
            "Pesalah akan merayu terus kepada warganegara.",
            "Kuasa pengadilan terletak dalam tangan warganegara.",
          ],
        },
      ],
    },
    spartaAdministration: {
      heading: "Pemerintahan dan Pentadbiran Sparta",
      system: "Di Sparta, sistem pemerintahan dan pentadbiran bersifat monarki terhad.",
      kings: {
        count: 2,
        purpose:
          "Dua orang raja memerintah Sparta bersama-sama bagi mengelakkan seorang daripada raja bertindak kejam.",
        families: ["Eurypontids", "Agiads"],
      },
      assembly: { name: "Dewan Perhimpunan", membership: "Mempunyai 10,000 orang ahli." },
      ephors: {
        count: 5,
        function:
          "Lima orang pegawai dilantik sebagai ephors yang berfungsi memastikan raja tidak memerintah secara mutlak.",
      },
      council: {
        name: "Majlis",
        membership: "Mempunyai 28 orang dewasa.",
        age: "Berusia melebihi 60 tahun.",
        term: "Keahlian Majlis seumur hidup.",
      },
      militaryDiscipline: [
        "Sparta memberikan penekanan kepada disiplin ketenteraan.",
        "Disiplin dan taat setia kepada negara-kota menjadi asas perkembangan Sparta.",
        "Sparta boleh dikategorikan sebagai kerajaan ketenteraan.",
      ],
    },
  },
  romanCivilisation: {
    introductionHeading: "Pengenalan",
    introduction:
      "Tamadun Rom merupakan kesinambungan daripada Tamadun Yunani kerana kedua-dua zaman ini sering kali dirujuk sebagai zaman klasik dalam sejarah Eropah. Beberapa ciri Tamadun Yunani seperti kebebasan pemikiran dan sikap ingin tahu menjadi asas yang penting dalam pembinaan Tamadun Rom dan Tamadun Eropah. Tamadun Rom muncul sebagai sebuah kuasa paling kuat di Mediterranean apabila berjaya mengalahkan pesaing-pesaing yang wujud.",
    rivals: ["Etruscan", "Macedonia", "Seleucid", "Mesir"],
    locationHeading: "Lokasi dan Perkembangannya",
    latium:
      "Tamadun Rom terletak di Lembah Latium, berhampiran dengan Sungai Tiber. Lembah Latium merupakan kawasan subur yang membolehkan aktiviti pertanian giat dijalankan.",
    tiber:
      "Sungai Tiber menjadi sumber air utama kepada penduduk dan menjadi laluan utama untuk berlayar ke laut.",
    eras: [
      { name: "Zaman Beraja", duration: "753-509 SM" },
      { name: "Zaman Republik", duration: "509-27 SM" },
      { name: "Zaman Empayar", duration: "27 SM-476 M" },
    ],
    paxRomana:
      "Tamadun Rom mencapai tahap kegemilangannya pada era Pax Romana (27 SM-180 M). Selama 200 tahun keamanan wujud dalam Tamadun Rom yang berkembang meliputi tiga buah benua, iaitu Asia, Afrika dan Eropah.",
    socialGroups: [
      { name: "Patrician", composition: "Golongan atasan" },
      { name: "Plebian", composition: "Petani, artisan dan peniaga" },
      { name: "Golongan hamba", composition: "Golongan hamba" },
    ],
  },
  romanArchitecture: {
    introduction: [
      "Jika Tamadun Yunani terkenal dengan sistem pemerintahan dan pentadbiran bercorak demokrasi, Tamadun Rom pula terkenal dengan kepakaran dalam bidang seni bina.",
      "Orang Rom bukan sahaja membina bangunan bersaiz besar dan mempunyai nilai estetika, tetapi setiap binaan mempunyai kegunaan yang khusus. Perkembangan bidang seni bina melibatkan bangunan, jalan raya, saliran air dan tempat mandi awam.",
      "Binaan-binaan ini mempunyai ketahanan tinggi yang masih kekal hingga kini dan menjadi warisan sejarah yang tidak ternilai harganya.",
    ],
    factors: [
      {
        name: "Kepakaran",
        detail:
          "Kemunculan arkitek, seperti Marco Vitruvius yang mengarang buku terkenal tentang seni bina, iaitu On Architecture pada tahun 46 SM membolehkan bidang seni bina Rom berkembang pesat.",
      },
      {
        name: "Pendidikan",
        detail:
          "Sistem pendidikan yang praktikal dalam Tamadun Rom memainkan peranan melahirkan golongan warganegara yang mahir dalam pelbagai bidang termasuklah seni bina.",
      },
      {
        name: "Dasar pemerintahan",
        detail:
          "Perkembangan pesat seni bina di Rom disokong oleh pihak pentadbir, seperti Marcus Visanius Agrippa (63-12 SM).",
      },
      {
        name: "Kewangan",
        detail:
          "Kerajaan memberikan bantuan kewangan agar projek yang dirancang dapat berjalan dengan lancar.",
      },
      {
        name: "Teknologi",
        detail:
          "Gabungan antara teknologi zaman Yunani dengan teknologi Rom, seperti penggunaan simen dan penekanan kepada aspek ketahanan dan nilai estetika, mempengaruhi bidang seni bina Rom.",
      },
      {
        name: "Sumber alam",
        detail:
          "Simen merupakan bahan asas binaan dalam seni bina Rom yang diperbuat daripada campuran air, kapur dan abu gunung berapi yang dikenali sebagai pozzolana.",
      },
      {
        name: "Buruh",
        detail:
          "Golongan buruh yang sebahagian besarnya terdiri daripada kalangan hamba memberikan sumbangan dalam perkembangan bidang seni bina di Rom.",
      },
    ],
    characteristicsHeading: "Ciri-ciri Pembinaan Bangunan dalam Tamadun Rom",
    characteristicsIntroduction:
      "Seni bina Rom merupakan gabungan antara teknik seni bina yang diwarisi sejak zaman Yunani dengan inovasi yang dilakukan oleh orang Rom dengan menggunakan bahan binaan baharu serta reka bentuk yang kreatif.",
    characteristics: [
      "Saiz yang besar",
      "Kubah berbentuk bulat",
      "Bumbung yang mempunyai struktur melengkung",
      "Penggunaan siling",
      "Tiang gaya Yunani",
      "Batu dilepa dengan simen",
      "Hiasan dalaman",
      "Penggunaan marmar",
    ],
    buildings: [
      {
        name: "Colosseum",
        function:
          "Tempat mengadakan persembahan dan pertandingan bersaiz besar seperti acara gladiator.",
        details: [
          "Ketinggian mencapai 50 meter, lebar 156 meter dan luas keseluruhan kira-kira 2.5 hektar",
          "Kawasan arena seluas 85 meter x 54 meter",
          "Mampu memuatkan 50,000 orang pada satu-satu masa",
          "Mempunyai 80 pintu masuk dan tempat duduk penonton yang dibina bertingkat-tingkat",
          "Dimulakan oleh Raja Vespian pada tahun 72 M dan diselesaikan oleh Titus pada tahun 80 M",
        ],
      },
      {
        name: "Pantheon",
        function:
          "Binaan berkubah yang terbesar di dunia yang digunakan sebagai tempat penyembahan dewa-dewi masyarakat Rom.",
        details: [
          "Dibina oleh Marcus Visanius Agrippa pada tahun 27 SM, musnah dalam kebakaran pada tahun 80 M dan dibangunkan semula oleh Maharaja Hadrian pada tahun 125 M",
          "Mengambil gaya binaan zaman Yunani terutama di bahagian hadapan yang mempunyai tiang yang kukuh",
          "Kubah berdiameter 43 meter",
          "Dinding batu-bata dilepa dengan simen",
          "Oculus berukuran 13 meter lebar membolehkan cahaya masuk",
        ],
      },
      {
        name: "Amfiteater",
        function:
          "Colosseum mini atau gelanggang terbuka berbentuk lingkaran yang digunakan untuk membuat persembahan seni, pertunjukan dan gladiator.",
        details: [
          "Kira-kira 230 amfiteater dibina di seluruh empayar Rom",
          "Amfiteater El Djem, Tunisia boleh memuatkan 16,000 orang",
          "Amfiteater Arles, Perancis boleh memuatkan 20,000 orang",
        ],
      },
      {
        name: "Akueduk",
        function:
          "Sistem perancangan dan pengawalan air yang sistematik untuk membekalkan air ke rumah kediaman, tempat mandi awam dan binaan-binaan utama termasuk Colosseum.",
        details: [
          "Akueduk pertama dibina di Aqua Appia pada tahun 312 SM dengan panjang 16 kilometer",
          "Marcus Agrippa membina Aqua Virgo pada tahun 19 SM",
          "Dibina berdasarkan kajian mutu sumber air, aliran air dan lokasi",
          "Pont du Gard di Perancis mempunyai tiga tingkat",
        ],
      },
      {
        name: "Jalan Raya Rom",
        function:
          "Menghubungkan bandar-bandar utama bagi memudahkan pergerakan tentera serta sebagai sistem pengangkutan.",
        details: [
          "Mula dibina pada tahun 500 SM",
          "Dibina berlapis-lapis menggunakan batu besar, batu kecil dan batu kerikil",
          "Biasanya empat kaki (1.3 meter) tebal dan 20 kaki (6.7 meter) lebar",
          "Mempunyai batu tanda jarak dan longkang di tepi jalan",
        ],
      },
      {
        name: "Tembok Pertahanan / Tembok Hadrian",
        function:
          "Melindungi Tamadun Rom daripada serangan musuh dan menjadi pemisah antara wilayah Rom dengan kawasan yang bukan wilayah Rom.",
        details: [
          "Seni membina tembok pertahanan bermula pada tahun 100 M",
          "Batu disusun memanjang sehingga mencapai ketinggian lima meter",
          "Kubu kecil milecastel dibina dalam jarak sebatu (1.6 kilometer) setiap satu",
          "Tembok Hadrian di Britain dibina pada tahun 122 M oleh Maharaja Hadrian",
          "Panjang Tembok Hadrian ialah 117 kilometer dan setinggi lima meter",
        ],
      },
      {
        name: "Tempat Mandi Awam Caracalla",
        function:
          "Tempat mandi awam dibina untuk kebersihan dan kesihatan serta boleh digunakan oleh setiap orang dengan bayaran tertentu.",
        details: [
          "Dilengkapi tandas, ruang mandi, ruang mengurut, perpustakaan, bilik berehat dan bersenam",
          "Mempunyai bahagian mandi air panas, sejuk, suam dan berwap",
          "Caracalla di Rom didirikan pada abad ketiga Masihi oleh Maharaja Caracalla",
          "Boleh memuatkan sehingga 1500 orang pada satu-satu masa",
        ],
      },
    ],
  },
  summary: {
    title: "Rumusan",
    greekHeading: "Tamadun Yunani",
    greek: [
      "Pembentukan polis atau negara-kota merupakan ciri utama tamadun ini.",
      "Tamadun ini mempunyai lima corak pemerintahan, iaitu monarki, oligarki, aristokrasi, tirani dan demokrasi.",
      "Sistem pemerintahan di Athens berdasarkan demokrasi melalui penubuhan Dewan Perhimpunan yang meliputi Majlis, Majistret dan Juri.",
      "Sparta menekankan disiplin ketenteraan dan taat setia warganegara.",
    ],
    romanHeading: "Tamadun Rom",
    roman: [
      "Perkembangan seni bina yang hebat berlaku dalam tamadun ini.",
      "Faktor keunggulan seni bina yang kekal lama, tahan dan kuat.",
      "Binaan seni bina yang mengagumkan termasuklah Colosseum, Pantheon, amfiteater, akueduk, jalan raya, tembok pertahanan dan tempat mandi awam.",
    ],
    conclusion:
      "Bab ini telah menjelaskan tentang peningkatan Tamadun Yunani dan Tamadun Rom. Kedua-dua tamadun ini telah menunjukkan tahap peningkatan yang begitu tinggi mutunya sama ada dari sudut gagasan mahupun binaan fizikal. Ciptaan ini sebahagiannya bukan sahaja dapat dilihat tetapi juga menjadi inspirasi kepada perkembangan seni bina hari ini.",
  },
};
