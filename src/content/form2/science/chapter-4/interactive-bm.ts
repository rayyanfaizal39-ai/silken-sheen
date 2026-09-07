import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch4-kesihatan-manusia.png";

export const scienceF2C4InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 4,
  blogHighlight: {
    title: "Blog Sains — Virus Zika",
    body: "Zika disebarkan terutamanya oleh nyamuk Aedes. Menghapuskan air bertakung memutuskan kitar pembiakan vektor dan mengurangkan penularan sebelum seseorang jatuh sakit.",
    imagePath: chapterImage,
  },
  keywords: [
    "Patogen",
    "Vektor",
    "Penyakit berjangkit",
    "Penyakit tidak berjangkit",
    "Fagositosis",
    "Antigen",
    "Antibodi",
    "Keimunan",
    "Antiserum",
    "Imunisasi",
  ],
  sections: [
    // ───────────────────────────────────────────── 1. Penyakit berjangkit / tidak berjangkit
    {
      number: "4.1",
      title: "Penyakit Berjangkit dan Penyakit Tidak Berjangkit",
      intro:
        "Penyakit ialah keadaan tidak normal pada badan atau minda yang menyebabkan rasa tidak selesa, kesukaran berfungsi atau tekanan kepada seseorang individu.",
      comparison: {
        title: "Dua kumpulan penyakit",
        columns: [
          {
            title: "🦠 Penyakit berjangkit",
            body: "",
            facts: [
              {
                label: "Definisi",
                value:
                  "Penyakit yang **boleh dijangkiti** daripada seorang individu kepada individu lain.",
              },
              {
                label: "Punca",
                value:
                  "Disebabkan oleh jangkitan patogen secara langsung, atau melalui medium dan vektor.",
              },
              {
                label: "Contoh",
                value: [
                  "Tibi",
                  "Selesema",
                  "Kurap",
                  "Kurap kaki",
                  "Leptospirosis",
                  "Denggi",
                  "Malaria",
                  "Zika",
                ],
              },
            ],
          },
          {
            title: "🧬 Penyakit tidak berjangkit",
            body: "",
            facts: [
              {
                label: "Definisi",
                value:
                  "Penyakit yang **tidak boleh dijangkiti** daripada seorang individu kepada individu lain.",
              },
              {
                label: "Punca",
                value: "Disebabkan oleh faktor genetik atau gaya hidup.",
              },
              {
                label: "Contoh",
                value: ["Kanser", "Darah tinggi", "Diabetes", "Asma", "Penyakit kardiovaskular"],
              },
            ],
          },
        ],
      },
      cards: [
        {
          title: "Apakah patogen?",
          body: "Patogen ialah organisma yang menyebabkan penyakit. Contohnya **semua virus, sesetengah bakteria, protozoa, kulat dan cacing**.",
        },
        {
          title: "Bukan semua mikroorganisma memudaratkan",
          body: "Ada bakteria dalam usus besar yang bertindak pada sisa makanan dan menghasilkan **vitamin K serta vitamin B12** yang berguna kepada badan.",
        },
      ],
      checks: [
        {
          question:
            "Mengapakah denggi tergolong sebagai penyakit berjangkit tetapi diabetes tidak?",
          hint: "Denggi disebabkan patogen yang boleh dipindahkan kepada orang lain; diabetes berpunca daripada faktor genetik atau gaya hidup dan tidak berpindah.",
        },
        {
          question: "Berikan satu contoh penyakit yang disebabkan oleh kulat.",
          hint: "Kurap atau kurap kaki — kedua-duanya berjangkit melalui sentuhan.",
        },
      ],
    },

    // ───────────────────────────────────────────── 2. Cara penyebaran — imej dahulu
    {
      number: "4.1",
      title: "Cara Penyakit Berjangkit Disebarkan",
      intro:
        "Patogen dipindahkan daripada seorang hos kepada hos yang lain melalui empat laluan utama. Ketik setiap laluan untuk melihat cara ia merebak, contoh penyakit dan cara mencegahnya.",
      conceptSelector: {
        instruction: "Ketik satu laluan penularan untuk melihat penerangannya.",
        prompt: "Ketik mana-mana laluan penularan di atas untuk melihat penerangannya.",
        concepts: [
          {
            id: "udara",
            icon: "💨",
            label: "Penyakit Bawaan Udara",
            note: "Disebarkan melalui dua cara: penyebaran titisan dan penyebaran debu.",
            facts: [
              {
                label: "Contoh penyakit",
                value: ["Tibi", "Selesema", "SARS", "Influenza A (H1N1)", "Cacar air"],
              },
              {
                label: "Pencegahan",
                value: [
                  "Tutup mulut dan hidung semasa bersin, batuk atau menguap",
                  "Jangan meludah merata-rata",
                  "Elakkan tempat sesak",
                  "Pastikan tempat tinggal mendapat cahaya yang cukup — sinar ultraungu boleh membunuh sesetengah mikroorganisma",
                ],
              },
            ],
          },
          {
            id: "air",
            icon: "💧",
            label: "Penyakit Bawaan Air",
            note: "Berlaku di kawasan yang mempunyai bekalan air tidak mencukupi dan sanitasi yang lemah — patogen daripada najis mencemarkan air, dan seseorang dijangkiti apabila meminum air tercemar.",
            facts: [
              {
                label: "Contoh penyakit",
                value: ["Kolera (taun)", "Demam kepialu", "Disentri amoeba"],
              },
              {
                label: "Pencegahan",
                value: [
                  "Tambah klorin ke dalam kolam renang dan sistem bekalan air",
                  "Bina tandas dengan sanitasi yang baik",
                  "Rebus air minuman dengan betul",
                  "Basuh tangan dengan sabun selepas menggunakan tandas",
                ],
              },
            ],
          },
          {
            id: "sentuhan",
            icon: "🤝",
            label: "Jangkitan Melalui Sentuhan",
            note: "Berlaku apabila tersentuh kulit yang dijangkiti, atau memakai pakaian orang yang dijangkiti.",
            facts: [
              {
                label: "Contoh penyakit",
                value: [
                  "Kurap dan kurap kaki (disebabkan kulat)",
                  "Sifilis dan gonorea (hubungan seksual)",
                  "HIV/AIDS (hubungan seksual, darah, perkongsian jarum suntikan)",
                ],
              },
              {
                label: "Pencegahan",
                value: ["Jaga kebersihan diri", "Jangan berkongsi pakaian atau barang peribadi"],
              },
            ],
          },
          {
            id: "vektor",
            icon: "🦟",
            label: "Jangkitan Melalui Vektor",
            note: "Sesetengah patogen dipindahkan daripada satu hos kepada hos baharu melalui haiwan — haiwan ini dipanggil vektor.",
            facts: [
              {
                label: "Contoh penyakit",
                value: ["Leptospirosis", "Denggi", "Malaria", "Zika", "Chikungunya"],
              },
              {
                label: "Pencegahan",
                value: [
                  "Hapuskan tempat pembiakan vektor",
                  "Gunakan kelambu atau ubat nyamuk",
                  "Pakai pakaian yang menutup kulit",
                ],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "Nyatakan tiga cara penyakit berjangkit disebarkan.",
          hint: "Mana-mana tiga daripada: udara, air, sentuhan dan vektor.",
        },
        {
          question: "Mengapakah banjir boleh merebakkan penyakit berjangkit?",
          hint: "Air banjir mencampurkan air tercemar dan sisa kumbahan dengan bekalan air bersih, jadi patogen bawaan air mudah tersebar.",
        },
      ],
    },

    // ───────────────────────────────────────────── 3. Penyakit Bawaan Vektor
    {
      number: "4.1",
      title: "Penyakit Bawaan Vektor",
      intro:
        "Bezakan tiga istilah ini dengan bertanya: apakah yang MENYEBABKAN penyakit, apakah yang MEMBAWA penyebab itu, dan apakah KEADAAN yang terhasil?",
      cards: [
        {
          title: "🦠 Patogen",
          body: "Organisma yang menyebabkan penyakit. Contoh: virus denggi, bakteria Salmonella typhi.",
        },
        {
          title: "🐀 Vektor",
          body: "Haiwan yang memindahkan patogen daripada satu hos kepada hos yang lain. Contoh: nyamuk Aedes, nyamuk Anopheles, tikus, lipas, lalat.",
        },
        {
          title: "🤒 Penyakit",
          body: "Keadaan yang terhasil daripada jangkitan. Contoh: demam denggi, malaria, leptospirosis.",
        },
      ],
      diseaseReferenceTable: {
        title: "Penyakit, Simptom, Patogen, Vektor dan Cara Jangkitan",
        diseaseLabel: "Penyakit",
        symptomsLabel: "Simptom",
        pathogenLabel: "Patogen",
        vectorLabel: "Vektor",
        wayOfInfectionLabel: "Cara Jangkitan",
        rows: [
          {
            id: "malaria",
            icon: "🦟",
            disease: "Malaria",
            symptoms: ["Menggigil", "Demam", "Berpeluh"],
            pathogen: "Plasmodium malariae",
            vector: "Nyamuk Anopheles betina",
            wayOfInfection: "Gigitan nyamuk",
          },
          {
            id: "kolera",
            icon: "🪰",
            disease: "Kolera",
            symptoms: ["Cirit-birit", "Muntah"],
            pathogen: "Bakteria Vibrio cholerae",
            vector: "Lalat",
            wayOfInfection: "Makanan dan air tercemar",
          },
          {
            id: "denggi",
            icon: "🦟",
            disease: "Denggi",
            symptoms: ["Sakit sendi", "Demam", "Sakit kepala", "Mata berair"],
            pathogen: "Virus denggi",
            vector: "Nyamuk Aedes",
            wayOfInfection: "Gigitan nyamuk",
          },
          {
            id: "zika",
            icon: "🦟",
            disease: "Zika",
            symptoms: ["Demam", "Ruam", "Sakit sendi", "Konjunktivitis"],
            pathogen: "Virus Zika",
            vector: "Nyamuk Aedes",
            wayOfInfection: "Gigitan nyamuk",
          },
          {
            id: "kepialu",
            icon: "🪳",
            disease: "Kepialu (Typhoid)",
            symptoms: ["Demam", "Pendarahan dalam usus", "Ruam merah"],
            pathogen: "Bakteria Salmonella typhi",
            vector: "Lipas, lalat, tikus",
            wayOfInfection: "Makanan dan air tercemar",
          },
          {
            id: "leptospirosis",
            icon: "🐀",
            disease: "Leptospirosis",
            symptoms: ["Demam", "Sakit kepala", "Sakit otot"],
            pathogen: "Bakteria Leptospira sp.",
            vector: "Tikus",
            wayOfInfection: "Tanah, makanan dan air tercemar",
          },
        ],
      },
      causeEffect: {
        title: "Bagaimana Vektor Merebakkan Penyakit?",
        instruction:
          "Nyamuk dan lalat merupakan vektor penting yang menyebarkan penyakit berjangkit.",
        items: [
          {
            icon: "🦟",
            title: "Nyamuk",
            chain: [
              "Nyamuk yang sudah membawa patogen menggigit orang yang belum dijangkiti",
              "Air liur (dan patogen) masuk semasa menghisap darah",
              "Jangkitan merebak; nyamuk lain boleh memindahkannya kepada mangsa baharu",
            ],
          },
          {
            icon: "🪰",
            title: "Lalat",
            chain: [
              "Lalat hinggap pada kotoran/sampah; patogen melekat pada kaki dan badannya",
              "Lalat memindahkan patogen ke makanan",
              "Patogen memasuki badan orang yang memakan makanan tercemar itu",
            ],
          },
        ],
      },
      remember:
        "VEKTOR → membawa PATOGEN → boleh menyebabkan PENYAKIT. Vektor sendiri bukan penyebab penyakit.",
      checks: [
        {
          question: "Apakah perbezaan antara patogen dan vektor?",
          hint: "Patogen ialah organisma yang menyebabkan penyakit; vektor ialah haiwan yang membawa patogen itu daripada satu hos kepada hos yang lain.",
        },
        {
          question:
            "Nyatakan satu penyakit lain yang disebarkan oleh vektor yang sama dengan demam denggi.",
          hint: "Zika atau Chikungunya — kedua-duanya juga dibawa oleh nyamuk Aedes.",
        },
      ],
    },

    // ───────────────────────────────────────────── 4. Pencegahan
    {
      number: "4.1",
      title: "Menghalang Penularan Penyakit",
      intro: "Pencegahan penyakit berjangkit dijalankan pada tiga peringkat.",
      sequence: {
        title: "Tiga peringkat pencegahan",
        instruction: "Ikuti urutan daripada sebelum jangkitan sehingga kawalan penularan.",
        steps: [
          {
            title: "Peringkat Primer",
            body: "",
            facts: [
              {
                label: "Meningkatkan kesihatan",
                value: [
                  "Kebersihan diri dan keluarga",
                  "Persekitaran tempat tinggal yang bersih dan sistem sanitasi",
                ],
              },
              {
                label: "Mengukuhkan pertahanan badan",
                value: [
                  "Vaksinasi / imunisasi bagi bayi, kanak-kanak, wanita hamil, pengusaha premis makanan, jemaah haji dan pelancong",
                ],
              },
            ],
          },
          {
            title: "Peringkat Sekunder",
            body: "",
            facts: [
              {
                label: "Apa yang dilakukan",
                value: [
                  "Pemeriksaan kesihatan kerap",
                  "Gaya hidup sihat",
                  "Pengesanan kes secara aktif dan pasif",
                  "Rawatan awal",
                  "Mengasingkan pesakit daripada orang lain",
                ],
              },
            ],
          },
          {
            title: "Peringkat Tertiari",
            body: "",
            facts: [
              {
                label: "Mengawal populasi vektor",
                value: [
                  "Musnahkan tempat pembiakan/persembunyian",
                  "Pengasapan",
                  "Penguatkuasaan undang-undang",
                ],
              },
              {
                label: "Melindungi perumah",
                value: ["Kelambu / ubat nyamuk", "Pakaian pelindung yang sesuai"],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "Pada peringkat manakah pengasapan untuk membunuh nyamuk dijalankan?",
          hint: "Peringkat tertiari — bersama pemusnahan tempat pembiakan dan perlindungan hos.",
        },
        {
          question:
            "Mengapakah jemaah haji dan pengendali premis makanan digalakkan menerima imunisasi?",
          hint: "Mereka berdepan risiko jangkitan yang lebih tinggi atau boleh menyebarkan patogen kepada ramai orang, jadi daya tahan badan mereka perlu ditingkatkan lebih awal.",
        },
      ],
    },

    // ───────────────────────────────────────────── 5. Pertahanan Badan
    {
      number: "4.2",
      title: "Pertahanan Badan",
      intro:
        "Patogen memasuki badan melalui sistem pernafasan, sistem pencernaan, sistem perkumuhan dan kulit. Badan kita mempunyai tiga pertahanan untuk memusnahkan patogen sebelum dan selepas ia memasuki badan.",
      cards: [
        {
          title: "Pertahanan Tidak Spesifik",
          body: "**Menyerang patogen secara menyeluruh**, tanpa mengira jenisnya.",
          facts: [{ label: "Barisan", value: "Pertahanan pertama dan kedua" }],
        },
        {
          title: "Pertahanan Spesifik",
          body: "**Menyerang satu patogen tertentu secara khusus**, melalui antibodi yang sepadan.",
          facts: [{ label: "Barisan", value: "Pertahanan ketiga" }],
        },
        {
          title: "Antigen",
          body: "Bahan asing yang datang dari luar badan dan **merangsang penghasilan antibodi**. Contoh: patogen, molekul toksin, sel darah daripada kumpulan darah lain.",
        },
        {
          title: "Antibodi",
          body: "Protein yang dihasilkan oleh sel darah putih ke dalam aliran darah sebagai **tindak balas terhadap antigen**.",
        },
        {
          title: "Keimunan",
          body: "Keupayaan sistem badan untuk **melawan patogen sebelum ia dijangkiti**.",
        },
      ],
      defenceLines: {
        title: "Ketik setiap pertahanan untuk melihat fungsinya",
        instruction: "Ketik mana-mana barisan pertahanan untuk melihat fungsinya.",
        pathogenLabel: "Patogen",
        nonSpecificLabel: "Pertahanan tidak spesifik",
        specificLabel: "Pertahanan spesifik",
        hint: "Ketik mana-mana barisan pertahanan untuk melihat fungsinya.",
        lines: [
          {
            id: "pertama",
            name: "Pertahanan Pertama",
            parts: "Kulit dan membran mukus",
            group: "non-specific",
            note: "Mengelakkan patogen daripada memasuki badan.",
            facts: [
              {
                label: "Kulit",
                value: [
                  "Lapisan yang tebal, sukar ditembusi mikroorganisma",
                  "Mikroorganisma hanya memasuki badan melalui luka/kecederaan",
                  "Peluh dan sebum mengandungi bahan kimia yang membunuh mikroorganisma",
                ],
              },
              {
                label: "Membran Mukus",
                value: [
                  "Melapisi saluran pencernaan dan saluran pernafasan",
                  "Bulu hidung menapis mikroorganisma",
                  "Mukus memerangkap mikroorganisma",
                  "Tahi telinga, air mata dan rembesan vagina bertindak sebagai antiseptik",
                ],
              },
            ],
          },
          {
            id: "kedua",
            name: "Pertahanan Kedua",
            parts: "Fagositosis oleh sel darah putih",
            group: "non-specific",
            note: "Melawan patogen melalui fagositosis.",
            facts: [
              {
                label: "Cara ia bertindak",
                value: ["Sel darah putih menelan patogen", "Patogen dicerna menggunakan enzim"],
              },
            ],
          },
          {
            id: "ketiga",
            name: "Pertahanan Ketiga",
            parts: "Penghasilan antibodi oleh sistem imun",
            group: "specific",
            note: "Pertahanan spesifik menggunakan antibodi.",
            facts: [
              {
                label: "Cara ia bertindak",
                value: [
                  "Sel darah putih menghasilkan antibodi sebagai tindak balas terhadap antigen",
                  "Antibodi melekat pada patogen",
                  "Mengelakkan patogen daripada memasuki sel perumah",
                  "Menyebabkan patogen bergumpal bersama",
                ],
              },
            ],
          },
        ],
      },
      checks: [
        {
          question: "Jika seseorang mengalami luka pada kulit, pertahanan manakah yang terjejas?",
          hint: "Pertahanan pertama — mikroorganisma hanya dapat menembusi kulit jika terdapat luka atau kecederaan.",
        },
        {
          question: "Apakah perbezaan antara antigen dan antibodi?",
          hint: "Antigen ialah bahan asing yang merangsang; antibodi ialah protein yang dihasilkan oleh sel darah putih sebagai gerak balas.",
        },
      ],
    },

    // ───────────────────────────────────────────── 6. Imunisasi
    {
      number: "4.2",
      title: "Kepentingan Imunisasi",
      intro:
        "Imunisasi ialah usaha untuk merangsang pertahanan badan terhadap jangkitan dalam kalangan bayi, kanak-kanak dan orang dewasa melalui suntikan vaksin.",
      cards: [
        {
          title: "Apakah kandungan vaksin?",
          body: "Vaksin mengandungi antigen yang diperoleh daripada sebahagian atau keseluruhan struktur virus/bakteria yang telah **dilemahkan atau dimatikan**.",
        },
        {
          title: "Bagaimana vaksin berfungsi?",
          body: "Antigen dalam vaksin **merangsang sistem imun badan**, membentuk keimunan terhadap jangkitan tertentu — tanpa menyebabkan penyakit sebenar.",
        },
        {
          title: "Mengapa beberapa jenis vaksin?",
          body: "Seorang bayi perlu disuntik beberapa jenis vaksin mengikut jadual imunisasi Malaysia.",
        },
        {
          title: "Adakah vaksin selamat?",
          body: "Ya. Vaksin yang digunakan oleh Kementerian Kesihatan Malaysia telah dinilai mengikut piawaian antarabangsa, termasuk untuk bayi dan kanak-kanak.",
        },
      ],
      accordions: [
        {
          title: "💉 Jadual imunisasi di Malaysia (vaksin terpilih)",
          body: "",
          facts: [
            { label: "BCG", value: "Perlindungan terhadap tibi (tuberkulosis)." },
            {
              label: "DTaP",
              value: "Gabungan vaksin difteria, tetanus dan pertusis (batuk kokol).",
            },
            { label: "Hib", value: "Haemophilus influenzae jenis B." },
            { label: "IPV", value: "Vaksin polio tidak aktif — melindungi terhadap polio." },
            { label: "MMR", value: "Gabungan vaksin campak, mumps dan rubela." },
            { label: "HPV", value: "Hanya diberikan kepada pelajar perempuan berumur 13 tahun." },
            { label: "Hepatitis B", value: "Diberikan bermula sejak lahir, dalam beberapa dos." },
          ],
        },
        {
          title: "🔁 Mengapa ada dos ulangan (booster)?",
          body: "Sesetengah vaksin diberikan lebih daripada sekali. Pendedahan berulang kepada antigen yang sama menghasilkan **tindak balas antibodi yang lebih tinggi dan lebih cepat**, jadi perlindungan menjadi lebih kukuh dan bertahan lebih lama.",
        },
      ],
      causeEffect: {
        title: "Mengapa imunisasi penting untuk masyarakat, bukan sekadar diri sendiri",
        instruction: "Ikuti kesan berantai daripada seorang kanak-kanak yang diimunisasi.",
        items: [
          {
            icon: "🛡️",
            title: "Imunisasi meluas dalam kalangan penduduk",
            chain: [
              "Lebih sedikit orang boleh dijangkiti",
              "Penyakit seperti kusta, batuk kokol dan tibi lebih terkawal",
            ],
            note: "Imunisasi membantu **MENGAWAL pengulangan penyakit** dan mengurangkan risiko penularan kepada orang lain.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah yang terkandung dalam vaksin?",
          hint: "Antigen daripada virus atau bakteria yang telah dilemahkan atau dimatikan.",
        },
        {
          question: "Terangkan sebab imunisasi perlu diberikan kepada bayi dan kanak-kanak.",
          hint: "Untuk membina daya tahan aktif terhadap penyakit tertentu lebih awal, sebelum mereka terdedah kepada patogen tersebut.",
        },
      ],
    },

    // ───────────────────────────────────────────── 7. Keimunan aktif / pasif
    {
      number: "4.2",
      title: "Keimunan Aktif dan Keimunan Pasif",
      intro:
        "Dua soalan menentukan jenis keimunan: adakah badan menghasilkan antibodinya sendiri, dan bagaimana antibodi itu diperoleh?",
      cards: [
        {
          title: "🛡️ Keimunan Aktif",
          body: "**Badan menghasilkan antibodinya sendiri** apabila dirangsang oleh antigen.",
        },
        {
          title: "💉 Keimunan Pasif",
          body: "Badan memperoleh **antibodi daripada sumber luaran**.",
        },
      ],
      immunityMatrix: {
        title: "Empat jenis keimunan",
        instruction: "Ketik mana-mana kotak untuk melihat butiran jenis keimunan itu.",
        activeLabel: "Aktif",
        passiveLabel: "Pasif",
        naturalLabel: "Semula jadi",
        artificialLabel: "Buatan",
        hint: "Ketik mana-mana kotak untuk melihat butiran jenis keimunan itu.",
        cells: [
          {
            id: "aktif-semula-jadi",
            row: "active",
            column: "natural",
            name: "Keimunan Aktif Semula Jadi",
            source: "Selepas sembuh daripada jangkitan",
            duration: "Kekal lama",
            note: "Berlaku apabila seseorang sembuh daripada jangkitan — antibodi terbentuk semasa jangkitan dan kekal lama selepasnya.",
            graphNote:
              "Aras antibodi naik perlahan selepas jangkitan pertama, kemudian naik lebih tinggi dan lebih cepat selepas jangkitan kedua dengan patogen yang sama.",
          },
          {
            id: "aktif-buatan",
            row: "active",
            column: "artificial",
            name: "Keimunan Aktif Buatan",
            source: "Melalui suntikan vaksin",
            duration: "Kekal lama",
            note: "Berlaku apabila vaksin yang mengandungi patogen mati/lemah disuntik; sistem imun bertindak balas dengan menghasilkan antibodi sendiri.",
            graphNote:
              "Aras antibodi naik selepas dos vaksin pertama, kemudian naik lebih tinggi dan lebih cepat selepas dos penggalak (booster).",
          },
          {
            id: "pasif-semula-jadi",
            row: "passive",
            column: "natural",
            name: "Keimunan Pasif Semula Jadi",
            source: "Antibodi daripada ibu, melalui plasenta/susu ibu",
            duration: "Sementara dan jangka pendek",
            note: "Bayi menerima antibodi daripada susu ibu atau daripada darah ibu yang mengalir melalui plasenta. Kekal hanya beberapa bulan pertama selepas kelahiran.",
            graphNote:
              "Aras antibodi paling tinggi sejurus selepas kelahiran, kemudian menurun sedikit demi sedikit dalam beberapa bulan.",
          },
          {
            id: "pasif-buatan",
            row: "passive",
            column: "artificial",
            name: "Keimunan Pasif Buatan",
            source: "Suntikan antiserum",
            duration: "Cepat bertindak tetapi sementara",
            note: "Antiserum (cecair jernih yang mengandungi antibodi) disuntik ke dalam badan pesakit; ia melawan patogen tanpa mengganggu sistem imun pesakit sendiri.",
            graphNote:
              "Aras antibodi tinggi sejurus selepas suntikan, kemudian menurun kerana antibodi ini tidak diganti oleh badan.",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah keimunan pasif sentiasa bersifat sementara?",
          hint: "Badan tidak menghasilkan antibodi itu sendiri — antibodi yang diterima daripada luar akhirnya akan diuraikan dan tidak digantikan.",
        },
        {
          question: "Keimunan manakah bertindak paling cepat, dan mengapa?",
          hint: "Keimunan pasif buatan — antibodi sedia ada disuntik terus, jadi tiada masa diperlukan untuk badan menghasilkannya.",
        },
      ],
    },

    // ───────────────────────────────────────────── 8. Keimunan mantap
    {
      number: "4.2",
      title: "Sistem Keimunan yang Mantap",
      intro:
        "Sistem imun menjadi lemah apabila terdapat ketidakseimbangan dalam badan atau pendedahan kepada terlalu banyak toksin.",
      cards: [
        {
          title: "🥗 Pemakanan",
          body: "Makan makanan seimbang termasuk sayur-sayuran dan buah-buahan tempatan. **Elakkan pengambilan gula secara berlebihan** kerana ia melemahkan sistem keimunan.",
        },
        {
          title: "🏃 Aktiviti fizikal",
          body: "Bersenam dan menghirup udara segar menguatkan sistem keimunan.",
        },
        {
          title: "🌿 Gaya hidup",
          body: "Dapatkan rehat dan tidur yang mencukupi, jangan merokok dan elakkan asap rokok, serta lakukan pemeriksaan kesihatan secara berkala.",
        },
      ],
      comparison: {
        title: "Apa yang melemahkan dan apa yang menguatkan",
        columns: [
          {
            title: "Punca sistem keimunan menjadi lemah",
            body: "Terdedah kepada udara tercemar; terdedah kepada racun perosak; **tekanan (stres)**; pengambilan gula secara berlebihan; merokok.",
          },
          {
            title: "Amalan yang menguatkan sistem keimunan",
            body: "**Tidur dan rehat yang mencukupi**; bersenam dan menghirup udara segar; tidak merokok dan mengelakkan asap rokok; pemeriksaan kesihatan secara berkala.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Pengetahuan tambahan — alahan",
          body: "Alahan (alergi) ialah tindak balas sistem imun badan terhadap alergen — bahan yang biasanya tidak berbahaya bagi kebanyakan orang. Contoh alergen: hama, bulu haiwan, debu, debunga, spora, makanan (makanan laut, susu, telur), sengatan haiwan dan sesetengah ubat.",
        },
      ],
      checks: [
        {
          question: "Cadangkan dua amalan yang melemahkan sistem keimunan seseorang.",
          hint: "Mana-mana dua daripada: terdedah kepada udara tercemar atau racun perosak, tekanan (stres), dan mengambil gula secara berlebihan.",
        },
        {
          question: "Bagaimanakah tidur yang cukup membantu sistem keimunan?",
          hint: "Rehat yang mencukupi membolehkan badan pulih dan mengekalkan sistem keimunan dalam keadaan kuat.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membezakan penyakit berjangkit dan penyakit tidak berjangkit serta memberi contoh.",
    "Saya boleh menerangkan cara penyakit berjangkit disebarkan.",
    "Saya boleh membezakan vektor daripada patogen dan penyakit yang terhasil.",
    "Saya boleh membandingkan tiga peringkat pencegahan penyakit.",
    "Saya boleh membezakan pertahanan tidak spesifik dan pertahanan spesifik.",
    "Saya boleh mendefinisikan antigen, antibodi dan keimunan.",
    "Saya boleh menerangkan tiga barisan pertahanan badan.",
    "Saya boleh mewajarkan kepentingan imunisasi.",
    "Saya boleh membezakan keimunan aktif dan keimunan pasif.",
    "Saya boleh menerangkan empat jenis keimunan.",
    "Saya boleh mewajarkan amalan ke arah sistem keimunan yang mantap.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Antibiotik boleh menyembuhkan influenza.",
      answer: false,
      explanation: "Influenza disebabkan virus; antibiotik menyasarkan bakteria.",
    },
    {
      type: "multiple-choice",
      question: "Pada peringkat pencegahan manakah kawalan populasi vektor dijalankan?",
      options: [
        "Peringkat primer",
        "Peringkat sekunder",
        "Peringkat tertiari",
        "Sebelum imunisasi",
      ],
      answerIndex: 2,
      explanation:
        "Peringkat tertiari merangkumi kawalan populasi vektor dan perlindungan hos seperti penggunaan kelambu.",
    },
    {
      type: "multiple-choice",
      question: "Barisan pertahanan kedua badan bertindak melalui apa?",
      options: [
        "Penghasilan antibodi",
        "Fagositosis oleh sel darah putih",
        "Kulit dan membran mukus",
        "Suntikan antiserum",
      ],
      answerIndex: 1,
      explanation:
        "Sel darah putih menelan dan mencerna patogen menggunakan enzim — proses ini dipanggil fagositosis.",
    },
  ],
};
