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
    // ───────────────────────────────────────────── Jenis penyakit
    {
      number: "4.1",
      title: "Penyakit Berjangkit dan Penyakit Tidak Berjangkit",
      intro:
        "Penyakit ialah keadaan tidak normal pada badan atau minda yang menyebabkan ketidakselesaan, sukar berfungsi atau memberi tekanan kepada seseorang. Penyakit dibahagikan kepada dua kumpulan besar mengikut satu soalan mudah: bolehkah ia berpindah kepada orang lain?",
      comparison: {
        title: "Dua kumpulan penyakit",
        columns: [
          {
            title: "Penyakit berjangkit",
            body: "Boleh berpindah daripada seorang individu kepada individu lain. Berlaku akibat jangkitan patogen, sama ada secara langsung atau melalui medium dan vektor. Contoh: tuberkulosis, selesema, kurap, panau, kencing tikus, demam denggi, malaria dan Zika.",
          },
          {
            title: "Penyakit tidak berjangkit",
            body: "Tidak berpindah daripada seorang individu kepada individu lain. Berlaku akibat faktor genetik atau gaya hidup. Contoh: kanser, hipertensi, diabetes, asma dan penyakit kardiovaskular.",
          },
        ],
      },
      cards: [
        {
          title: "Apakah patogen?",
          body: "Patogen ialah organisma yang menyebabkan penyakit. Contohnya semua virus, sesetengah bakteria, protozoa, kulat dan cacing.",
        },
        {
          title: "Bukan semua mikroorganisma memudaratkan",
          body: "Ada bakteria dalam usus besar yang bertindak pada sisa makanan dan menghasilkan vitamin K serta vitamin B12 yang berguna kepada badan.",
        },
      ],
      checks: [
        {
          question: "Mengapakah denggi tergolong sebagai penyakit berjangkit tetapi diabetes tidak?",
          hint: "Denggi disebabkan patogen yang boleh dipindahkan kepada orang lain; diabetes berpunca daripada faktor genetik atau gaya hidup dan tidak berpindah.",
        },
        {
          question: "Berikan satu contoh penyakit yang disebabkan oleh kulat.",
          hint: "Kurap atau panau — kedua-duanya berjangkit melalui sentuhan.",
        },
      ],
    },

    // ───────────────────────────────────────────── Cara penyebaran
    {
      number: "4.1",
      title: "Cara Penyakit Berjangkit Disebarkan",
      intro:
        "Patogen dipindahkan daripada seorang hos kepada hos yang lain melalui empat laluan utama: udara, air, sentuhan dan vektor. Ketik setiap laluan untuk melihat contoh penyakit dan cara mencegahnya.",
      accordions: [
        {
          title: "💨 Melalui udara",
          body: "Patogen dibawa oleh titisan air liur atau habuk. Terdapat dua cara jangkitan bawaan udara, iaitu jangkitan titisan dan jangkitan habuk. Contoh penyakit: tuberkulosis, selesema, SARS, Influenza A (H1N1) dan cacar air. Pencegahan: tutup mulut dan hidung semasa bersin, batuk atau menguap; jangan meludah di merata tempat; elakkan tempat yang penuh sesak; pastikan tempat tinggal cukup cahaya kerana sinar ultraungu boleh membunuh sesetengah mikroorganisma.",
        },
        {
          title: "💧 Melalui air",
          body: "Berlaku di kawasan yang tiada bekalan air terawat dan sistem sanitasi yang sempurna. Tinja yang mengandungi patogen boleh mencemarkan sungai, dan seseorang dijangkiti apabila terminum air tercemar. Contoh penyakit: taun (kolera), demam kepialu dan disentri ameba. Pencegahan: didihkan air minuman, campurkan klorin di dalam sistem bekalan air dan kolam renang, bina tandas bersistem sanitasi sempurna, dan cuci tangan dengan sabun selepas menggunakan tandas.",
        },
        {
          title: "🤝 Melalui sentuhan",
          body: "Berlaku apabila tersentuh kulit yang telah dijangkiti atau memakai pakaian pesakit. Contoh penyakit: kurap dan panau — kedua-duanya disebabkan oleh kulat. Sifilis dan gonorea pula berjangkit melalui hubungan seks kerana patogennya terdapat di dalam air mani dan bendalir faraj. Virus HIV yang menyebabkan AIDS boleh merebak melalui hubungan seks, darah dan perkongsian jarum suntikan. Pencegahan: jaga kebersihan diri dan jangan berkongsi pakaian atau barang peribadi.",
        },
        {
          title: "🦟 Melalui vektor",
          body: "Sesetengah patogen menggunakan haiwan untuk berpindah daripada satu hos kepada hos yang baharu. Contoh penyakit: kencing tikus (leptospirosis), demam denggi, malaria, Zika dan Chikungunya. Pencegahan: hapuskan tempat pembiakan vektor, gunakan kelambu atau ubat nyamuk, dan pakai pakaian yang menutup kulit.",
        },
      ],
      cards: [
        {
          title: "Bagaimana nyamuk menyebarkan penyakit",
          body: "Nyamuk yang mempunyai patogen di dalam kelenjar air liurnya menghisap darah orang yang belum dijangkiti. Air liur nyamuk dikeluarkan semasa menghisap darah untuk mencegah pembekuan darah, dan patogen masuk bersamanya. Nyamuk lain yang menggigit mangsa yang telah dijangkiti akan menyebarkan jangkitan kepada mangsa seterusnya.",
        },
        {
          title: "Bagaimana lalat menyebarkan penyakit",
          body: "Lalat yang hinggap di atas kotoran membawa patogen yang melekat pada kaki dan badannya. Lalat kemudian memindahkan patogen itu ke makanan, dan patogen memasuki badan orang yang memakan makanan tercemar tersebut.",
        },
      ],
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

    // ───────────────────────────────────────────── Patogen, vektor, penyakit
    {
      number: "4.1",
      title: "Patogen, Vektor dan Penyakit",
      intro:
        "Tiga istilah ini sering dikelirukan. Bezakan dengan bertanya: apakah yang MENYEBABKAN penyakit, apakah yang MEMBAWA penyebab itu, dan apakah KEADAAN yang terhasil?",
      cards: [
        {
          title: "🦠 Patogen",
          body: "Organisma yang menyebabkan penyakit — virus, bakteria, protozoa, kulat atau cacing. Contoh: virus denggi, bakteria Salmonella typhi.",
        },
        {
          title: "🐀 Vektor",
          body: "Haiwan yang memindahkan patogen daripada satu hos kepada hos yang baharu. Vektor sendiri bukan penyebab penyakit. Contoh: nyamuk Aedes, lipas, lalat, tikus.",
        },
        {
          title: "🤒 Penyakit",
          body: "Keadaan yang terhasil apabila patogen menjangkiti badan. Contoh: demam denggi, kepialu, malaria, leptospirosis.",
        },
      ],
      matcher: {
        title: "Padankan vektor dengan patogen yang dibawanya",
        instruction:
          "Setiap padanan di sini ialah VEKTOR → PATOGEN. Perhatikan bahawa vektor membawa patogen, bukan penyakit itu sendiri.",
        pairs: [
          { id: "lipas", label: "Lipas", match: "Salmonella typhi" },
          { id: "lalat", label: "Lalat", match: "Salmonella typhi" },
          { id: "aedes-denggi", label: "Nyamuk Aedes", match: "Virus denggi" },
          { id: "aedes-zika", label: "Nyamuk Aedes (Zika)", match: "Virus Zika" },
          { id: "anopheles", label: "Nyamuk Anopheles", match: "Plasmodium malariae" },
          { id: "tikus", label: "Tikus", match: "Bakteria Leptospira sp." },
        ],
      },
      comparison: {
        title: "Daripada patogen kepada penyakit",
        columns: [
          {
            title: "Patogen → penyakit",
            body: "Plasmodium malariae → malaria. Virus denggi → demam denggi. Salmonella typhi → kepialu. Bakteria Leptospira sp. → leptospirosis. Bakteria Vibrio cholerae → kolera.",
          },
          {
            title: "Gejala yang biasa dilihat",
            body: "Malaria: menggigil, demam dan berpeluh. Denggi: sakit sendi, demam, sakit kepala dan mata berair. Zika: demam, ruam, sakit sendi dan konjunktivitis. Kepialu: demam, usus berdarah dan ruam merah.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah perbezaan antara patogen dan vektor?",
          hint: "Patogen ialah organisma yang menyebabkan penyakit; vektor ialah haiwan yang membawa patogen itu daripada satu hos kepada hos yang lain.",
        },
        {
          question: "Nyatakan satu penyakit lain yang disebarkan oleh vektor yang sama dengan demam denggi.",
          hint: "Zika atau Chikungunya — kedua-duanya juga dibawa oleh nyamuk Aedes.",
        },
      ],
    },

    // ───────────────────────────────────────────── Pencegahan
    {
      number: "4.1",
      title: "Menghalang Penularan Penyakit",
      intro:
        "Pencegahan penyakit berjangkit dijalankan pada tiga peringkat. Setiap peringkat bertindak pada masa yang berbeza dalam perjalanan sesuatu penyakit.",
      sequence: {
        title: "Tiga peringkat pencegahan",
        instruction: "Ikuti urutan daripada sebelum jangkitan sehingga kawalan penularan.",
        steps: [
          {
            title: "Peringkat primer",
            body: "Bertindak SEBELUM penyakit berlaku. Meningkatkan tahap kesihatan melalui kebersihan diri, keluarga, tempat kediaman dan sistem sanitasi. Meningkatkan daya tahan badan melalui pengambilan vaksin atau imunisasi oleh bayi, kanak-kanak, ibu mengandung, pengendali premis makanan, jemaah haji dan pengembara.",
          },
          {
            title: "Peringkat sekunder",
            body: "Mengesan dan bertindak AWAL. Membuat pemeriksaan kesihatan berkala dan mengamalkan gaya hidup sihat seperti menghirup udara bersih dan makan makanan seimbang. Memutuskan transmisi jangkitan melalui pengesanan kes secara aktif dan pasif — memberi rawatan awal kepada pesakit dan mengasingkan pesakit daripada orang lain.",
          },
          {
            title: "Peringkat tertier",
            body: "Mengawal penularan yang sedang berlaku. Mengawal populasi vektor dengan memusnahkan tempat pembiakan dan perlindungan vektor, melakukan semburan untuk membunuh vektor, serta menguatkuasakan undang-undang dengan mengenakan denda kepada pengusaha premis makanan yang kotor. Melindungi hos dengan menggunakan kelambu atau ubat nyamuk dan memakai pakaian tebal.",
          },
        ],
      },
      cards: [
        {
          title: "⚠️ Jangan keliru",
          body: "Kawalan vektor seperti pengasapan dan pemusnahan tempat pembiakan tergolong dalam peringkat TERTIER, bukan peringkat primer. Peringkat primer memberi tumpuan kepada kebersihan dan imunisasi sebelum sebarang jangkitan berlaku.",
        },
      ],
      checks: [
        {
          question: "Pada peringkat manakah pengasapan untuk membunuh nyamuk dijalankan?",
          hint: "Peringkat tertier — bersama pemusnahan tempat pembiakan dan perlindungan hos.",
        },
        {
          question:
            "Mengapakah jemaah haji dan pengendali premis makanan digalakkan menerima imunisasi?",
          hint: "Mereka berdepan risiko jangkitan yang lebih tinggi atau boleh menyebarkan patogen kepada ramai orang, jadi daya tahan badan mereka perlu ditingkatkan lebih awal.",
        },
      ],
    },

    // ───────────────────────────────────────────── Pertahanan badan
    {
      number: "4.2",
      title: "Tiga Barisan Pertahanan Badan",
      intro:
        "Patogen memasuki badan melalui sistem respirasi, sistem pencernaan, sistem perkumuhan dan kulit. Badan menghalangnya dengan tiga barisan pertahanan yang bertindak satu demi satu.",
      defenceLines: {
        title: "Ikuti patogen melalui setiap barisan",
        instruction:
          "Dua barisan pertama menyerang mana-mana patogen. Barisan ketiga pula menyasarkan satu antigen tertentu sahaja.",
        pathogenLabel: "Patogen",
        nonSpecificLabel: "Pertahanan tidak spesifik",
        specificLabel: "Pertahanan spesifik",
        hint: "Ketik mana-mana barisan pertahanan untuk melihat fungsinya.",
        lines: [
          {
            id: "pertama",
            name: "Barisan pertahanan pertama",
            parts: "Kulit dan membran mukus",
            group: "non-specific",
            note: "Menghalang patogen daripada memasuki badan. Kulit terdiri daripada lapisan yang liat dan sukar ditembusi; peluh dan sebum yang dirembeskannya mengandungi bahan kimia yang boleh memusnahkan mikroorganisma. Membran mukus melapisi salur pencernaan dan salur pernafasan — bulu hidung menapis mikroorganisma dan mukus memerangkapnya. Lilin telinga, air mata dan lendir pada faraj juga bertindak sebagai antiseptik.",
          },
          {
            id: "kedua",
            name: "Barisan pertahanan kedua",
            parts: "Sel darah putih — fagositosis",
            group: "non-specific",
            note: "Patogen yang berjaya melepasi barisan pertama akan memasuki sistem darah. Di sini sel darah putih bertindak secara fagositosis dengan menelan dan mencerna patogen menggunakan enzim.",
          },
          {
            id: "ketiga",
            name: "Barisan pertahanan ketiga",
            parts: "Sistem keimunan — penghasilan antibodi",
            group: "specific",
            note: "Patogen yang melepasi barisan kedua berhadapan dengan sistem keimunan badan. Sel darah putih menghasilkan antibodi khusus terhadap antigen patogen itu. Antibodi melekat pada patogen supaya patogen tidak dapat memasuki sel perumah, dan menyebabkan patogen menggumpal supaya lebih mudah dimusnahkan.",
          },
        ],
      },
      cards: [
        {
          title: "Tidak spesifik lawan spesifik",
          body: "Pertahanan tidak spesifik (barisan pertama dan kedua) menyerang patogen secara menyeluruh tanpa mengira jenisnya. Pertahanan spesifik (barisan ketiga) menyerang satu patogen tertentu secara khusus melalui antibodi yang sepadan.",
        },
      ],
      checks: [
        {
          question: "Jika seseorang mengalami luka pada kulit, pertahanan manakah yang terjejas?",
          hint: "Barisan pertahanan pertama — mikroorganisma hanya dapat menembusi kulit jika terdapat luka atau kecederaan.",
        },
        {
          question: "Apakah persamaan dan perbezaan antara pertahanan spesifik dan tidak spesifik?",
          hint: "Kedua-duanya mencegah jangkitan penyakit. Pertahanan spesifik menyerang patogen tertentu secara khusus, manakala pertahanan tidak spesifik menyerang patogen secara menyeluruh.",
        },
      ],
    },

    // ───────────────────────────────────────────── Antigen / antibodi / keimunan
    {
      number: "4.2",
      title: "Antigen, Antibodi dan Keimunan",
      intro:
        "Tiga istilah ini bekerja bersama dalam barisan pertahanan ketiga. Fahami maksud setiap satu sebelum melihat bagaimana ia berkaitan.",
      cards: [
        {
          title: "Antigen",
          body: "Jasad asing atau bahan yang bukan daripada badan sendiri yang merangsang penghasilan antibodi. Antigen terdapat pada patogen, molekul toksin dan sel darah daripada kumpulan darah yang lain.",
        },
        {
          title: "Antibodi",
          body: "Protein yang dihasilkan oleh sel darah putih ke dalam aliran darah sebagai gerak balas terhadap antigen.",
        },
        {
          title: "Keimunan",
          body: "Keupayaan sistem badan melawan sesuatu patogen sebelum badan dijangkiti patogen tersebut.",
        },
      ],
      causeEffect: {
        title: "Bagaimana ketiga-tiganya berkaitan",
        instruction: "Baca dari kiri ke kanan.",
        items: [
          {
            icon: "🦠",
            title: "Antigen masuk ke dalam badan",
            chain: [
              "Antigen pada patogen dikesan",
              "Sel darah putih dirangsang",
              "Antibodi khusus dihasilkan",
            ],
            note: "Antibodi yang terhasil sepadan dengan antigen tersebut sahaja.",
          },
          {
            icon: "🛡️",
            title: "Antibodi bertindak ke atas patogen",
            chain: [
              "Antibodi melekat pada patogen",
              "Patogen tidak dapat memasuki sel perumah",
              "Patogen menggumpal dan lebih mudah dimusnahkan",
            ],
            note: "Inilah keimunan — keupayaan badan melawan patogen itu.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah perbezaan utama antara antigen dan antibodi?",
          hint: "Antigen ialah bahan asing yang merangsang; antibodi ialah protein yang dihasilkan oleh sel darah putih sebagai gerak balas.",
        },
        {
          question: "Di manakah antigen boleh ditemui?",
          hint: "Pada patogen, molekul toksin dan sel darah daripada kumpulan darah yang lain.",
        },
      ],
    },

    // ───────────────────────────────────────────── Imunisasi
    {
      number: "4.2",
      title: "Imunisasi",
      intro:
        "Imunisasi merupakan suatu usaha untuk memberikan daya tahan secara aktif pada bayi, kanak-kanak dan dewasa terhadap penyakit tertentu dengan memasukkan vaksin.",
      cards: [
        {
          title: "Apakah kandungan vaksin?",
          body: "Vaksin mengandungi antigen yang diperoleh daripada sebahagian atau keseluruhan struktur virus atau bakteria yang telah dilemahkan atau dimatikan.",
        },
        {
          title: "Bagaimana vaksin berfungsi?",
          body: "Antigen di dalam vaksin merangsang sistem imun tubuh untuk membentuk keimunan terhadap jangkitan penyakit tertentu — tanpa menyebabkan penyakit itu sendiri.",
        },
        {
          title: "Mengapa beberapa jenis vaksin?",
          body: "Setiap vaksin membina keimunan terhadap penyakit yang berbeza, jadi bayi perlu disuntik dengan beberapa jenis vaksin yang berbeza mengikut jadual.",
        },
        {
          title: "Adakah vaksin selamat?",
          body: "Ya. Vaksin yang digunakan oleh Kementerian Kesihatan Malaysia dinilai mengikut keperluan piawaian antarabangsa terlebih dahulu.",
        },
      ],
      accordions: [
        {
          title: "💉 Contoh vaksin dalam jadual imunisasi Malaysia",
          body: "BCG memberi perlindungan terhadap tuberkulosis. Hepatitis B diberikan dalam tiga dos. DTaP ialah kombinasi difteria, tetanus dan pertusis. Polio (IPV) melindungi daripada polio. MMR melindungi daripada campak, beguk dan rubela. HPV diberikan kepada remaja perempuan berumur 13 tahun. Anda tidak perlu menghafal seluruh jadual — fahami bahawa setiap vaksin disusun mengikut umur supaya perlindungan terbina sebelum risiko jangkitan meningkat.",
        },
        {
          title: "🔁 Mengapa ada dos ulangan (booster)?",
          body: "Sesetengah vaksin diberikan lebih daripada sekali. Pendedahan berulang kepada antigen yang sama menghasilkan tindak balas antibodi yang lebih tinggi dan lebih cepat, jadi perlindungan menjadi lebih kukuh dan bertahan lebih lama.",
        },
      ],
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

    // ───────────────────────────────────────────── Aktif / pasif
    {
      number: "4.2",
      title: "Keimunan Aktif dan Keimunan Pasif",
      intro:
        "Keimunan aktif bermaksud badan menghasilkan antibodi sendiri apabila dirangsang oleh antigen. Keimunan pasif pula bermaksud badan memperoleh antibodi daripada sumber luar. Kedua-duanya boleh diperoleh secara semula jadi atau buatan.",
      immunityMatrix: {
        title: "Empat jenis keimunan",
        instruction:
          "Dua soalan menentukan jenisnya: adakah badan menghasilkan antibodinya sendiri, dan bagaimana antibodi itu diperoleh?",
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
            name: "Keimunan aktif semula jadi",
            source: "Selepas sembuh daripada penyakit",
            duration: "Berpanjangan",
            note: "Terhasil selepas seseorang sembuh daripada serangan penyakit. Badan menghasilkan antibodinya sendiri, dan keimunan berpanjangan selepas jangkitan.",
          },
          {
            id: "aktif-buatan",
            row: "active",
            column: "artificial",
            name: "Keimunan aktif buatan",
            source: "Melalui suntikan vaksin",
            duration: "Berpanjangan",
            note: "Terhasil apabila vaksin yang mengandungi patogen yang mati atau lemah dimasukkan ke dalam badan, dan sistem keimunan bergerak balas dengan menghasilkan antibodi. Keimunan berpanjangan.",
          },
          {
            id: "pasif-semula-jadi",
            row: "passive",
            column: "natural",
            name: "Keimunan pasif semula jadi",
            source: "Antibodi daripada ibu",
            duration: "Sementara dan singkat",
            note: "Terhasil apabila anak mendapat antibodi daripada susu ibu atau darah ibu yang merentasi dinding plasenta. Keimunan sementara dan singkat, iaitu dalam tempoh beberapa bulan pertama selepas dilahirkan.",
          },
          {
            id: "pasif-buatan",
            row: "passive",
            column: "artificial",
            name: "Keimunan pasif buatan",
            source: "Melalui suntikan antiserum",
            duration: "Segera tetapi sementara",
            note: "Terhasil apabila antiserum disuntik ke dalam badan pesakit. Antiserum akan melawan patogen penyakit tersebut tanpa mengganggu sistem keimunan pesakit. Keimunan adalah segera dan sementara.",
          },
        ],
      },
      cards: [
        {
          title: "Apakah antiserum?",
          body: "Antiserum ialah darah cecair jernih yang mengandungi antibodi untuk mencegah penyakit. Ia disuntik terus kepada pesakit supaya antibodi sedia ada dapat bertindak dengan segera.",
        },
      ],
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

    // ───────────────────────────────────────────── Graf respon
    {
      number: "4.2",
      title: "Respon Imun Primer dan Sekunder",
      intro:
        "Apabila badan bertemu antigen yang sama untuk kali kedua, tindak balasnya berbeza sama sekali daripada kali pertama. Inilah sebabnya imunisasi berulang menguatkan perlindungan.",
      immuneResponseGraph: {
        title: "Kepekatan antibodi selepas pendedahan pertama dan kedua",
        instruction:
          "Perhatikan ketinggian dan kecepatan setiap lengkung. Ketik label di bawah graf untuk penerangan.",
        xAxisLabel: "Masa (minggu)",
        yAxisLabel: "Kepekatan antibodi dalam darah (%)",
        immuneLevelLabel: "Aras keimunan",
        hint: "Ketik mana-mana label untuk melihat maksud bahagian graf itu.",
        items: [
          {
            id: "first",
            label: "Pendedahan pertama",
            note: "Kali pertama antigen memasuki badan. Badan perlu masa untuk mengenal antigen itu dan mula menghasilkan antibodi.",
          },
          {
            id: "primary",
            label: "Respon primer",
            note: "Tindak balas kali pertama — perlahan dan rendah. Antibodi yang dihasilkan tidak mencapai aras keimunan, jadi seseorang masih boleh jatuh sakit.",
          },
          {
            id: "second",
            label: "Pendedahan kedua",
            note: "Antigen yang SAMA memasuki badan sekali lagi, sama ada melalui jangkitan semula atau dos vaksin berikutnya.",
          },
          {
            id: "secondary",
            label: "Respon sekunder",
            note: "Tindak balas kali kedua — jauh lebih cepat dan lebih tinggi. Antibodi melebihi aras keimunan, jadi keimunan dicapai dan badan terlindung.",
          },
        ],
      },
      cards: [
        {
          title: "Mengapa ini penting",
          body: "Corak ini menerangkan mengapa sesetengah vaksin memerlukan lebih daripada satu dos: setiap dos tambahan mengulangi pendedahan kepada antigen yang sama dan mengangkat perlindungan ke aras yang lebih tinggi.",
        },
      ],
      checks: [
        {
          question:
            "Sebuah graf menunjukkan kepekatan antibodi melonjak tinggi selepas pendedahan kedua. Apakah yang diwakilinya?",
          hint: "Respon sekunder — tindak balas yang lebih cepat dan lebih kuat terhadap antigen yang sama.",
        },
        {
          question: "Mengapakah seseorang masih boleh jatuh sakit selepas pendedahan pertama?",
          hint: "Respon primer perlahan dan rendah; antibodi tidak sempat mencapai aras keimunan.",
        },
      ],
    },

    // ───────────────────────────────────────────── Keimunan mantap
    {
      number: "4.2",
      title: "Sistem Keimunan yang Mantap",
      intro:
        "Apabila berlaku ketidakseimbangan dalam badan atau terlalu banyak toksin, sistem keimunan akan menjadi lemah. Amalan harian dalam tiga bidang berikut menentukan sama ada keimunan anda dikuatkan atau dilemahkan.",
      cards: [
        {
          title: "🥗 Pemakanan",
          body: "Makan makanan seimbang termasuk sayur-sayuran dan buah-buahan tempatan. Elakkan pengambilan gula secara berlebihan kerana ia melemahkan sistem keimunan.",
        },
        {
          title: "🏃 Aktiviti fizikal",
          body: "Beriadah dan menghirup udara segar menguatkan sistem keimunan. Aktiviti fizikal yang kerap membantu badan berfungsi dengan lebih baik.",
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
            body: "Terdedah kepada pencemaran udara; terdedah kepada pestisid; mengalami tekanan perasaan; pengambilan gula secara berlebihan.",
          },
          {
            title: "Amalan yang menguatkan sistem keimunan",
            body: "Mendapat rehat dan tidur yang mencukupi; tidak merokok dan tidak terdedah kepada asap rokok; beriadah dan menghirup udara segar; melakukan pemeriksaan kesihatan secara berkala.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Pengetahuan tambahan — alahan",
          body: "Alahan merupakan satu tindak balas sistem keimunan badan terhadap alergen dalam persekitaran yang biasanya tidak memudaratkan orang yang tiada alahan. Contoh alergen: hama, bulu haiwan, habuk, debunga, spora, makanan seperti makanan laut, susu dan telur, sengatan haiwan dan sesetengah ubat.",
        },
      ],
      checks: [
        {
          question: "Cadangkan dua amalan yang melemahkan sistem keimunan seseorang.",
          hint: "Mana-mana dua daripada: terdedah kepada pencemaran udara atau pestisid, mengalami tekanan perasaan, dan mengambil gula secara berlebihan.",
        },
        {
          question: "Bagaimanakah tidur yang cukup membantu sistem keimunan?",
          hint: "Rehat yang mencukupi membolehkan badan pulih dan mengekalkan sistem keimunan dalam keadaan kuat.",
        },
      ],
    },

    // ───────────────────────────────────────────── Kesan sosial
    {
      number: "4.2",
      title: "Kesihatan, Imunisasi dan Masyarakat",
      intro:
        "Kesihatan seorang individu bukan urusan peribadi semata-mata. Tahap kesihatan dan imunisasi seseorang memberi kesan berantai kepada keluarga, masyarakat, ekonomi dan negara.",
      causeEffect: {
        title: "Kesan berantai",
        instruction: "Ikuti setiap rantaian dari punca sehingga kesannya kepada negara.",
        items: [
          {
            icon: "🛡️",
            title: "Pengulangan penyakit yang terkawal",
            chain: [
              "Imunisasi meluas dalam kalangan penduduk",
              "Lebih sedikit orang boleh dijangkiti",
              "Penyakit seperti kusta, batuk kokol dan tibi lebih terkawal",
            ],
            note: "Imunisasi membantu MENGAWAL pengulangan penyakit dan mengurangkan risiko penularan.",
          },
          {
            icon: "💰",
            title: "Kos rawatan kesihatan",
            chain: [
              "Kurang kes jangkitan",
              "Kurang keperluan rawatan dan kemasukan hospital",
              "Kos rawatan kesihatan keluarga dan negara tidak melonjak",
            ],
          },
          {
            icon: "🏭",
            title: "Kualiti kerja dan tenaga kerja",
            chain: [
              "Pekerja kurang jatuh sakit",
              "Kurang hari kerja hilang",
              "Produktiviti dan kualiti kerja terpelihara",
            ],
            note: "Wabak yang berpanjangan boleh menjejaskan tenaga kerja dan menyebabkan isu migrasi pekerja.",
          },
          {
            icon: "📋",
            title: "Insurans dan kualiti kehidupan",
            chain: [
              "Risiko kesihatan yang lebih rendah",
              "Perbelanjaan perubatan dan insurans lebih terkawal",
              "Keluarga menikmati kualiti kehidupan yang lebih baik",
            ],
          },
        ],
      },
      cards: [
        {
          title: "📊 Cuba sendiri",
          body: "Kumpulkan statistik penyakit berjangkit di Malaysia daripada portal Kementerian Kesihatan Malaysia. Bincangkan penyakit yang paling banyak dihidapi, penyebab dan cara menanganinya, kemudian cadangkan langkah penyelesaian.",
        },
      ],
      checks: [
        {
          question:
            "Bagaimanakah imunisasi seorang kanak-kanak memberi manfaat kepada masyarakat, bukan hanya kepada dirinya?",
          hint: "Kanak-kanak yang terlindung tidak mudah dijangkiti dan tidak menyebarkan patogen, jadi penularan dalam masyarakat lebih terkawal.",
        },
        {
          question: "Nyatakan dua kesan ekonomi apabila wabak penyakit berjangkit berlaku.",
          hint: "Kos rawatan kesihatan meningkat dan kualiti kerja terjejas akibat pekerja jatuh sakit.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh membezakan penyakit berjangkit dan penyakit tidak berjangkit serta memberi contoh.",
    "Saya boleh menerangkan empat cara penyakit berjangkit disebarkan.",
    "Saya boleh membezakan patogen, vektor dan penyakit.",
    "Saya boleh menghuraikan tiga peringkat pencegahan penyakit.",
    "Saya boleh menghuraikan tiga barisan pertahanan badan dan membezakan pertahanan spesifik dengan tidak spesifik.",
    "Saya boleh mendefinisikan antigen, antibodi dan keimunan.",
    "Saya boleh menerangkan kepentingan imunisasi dan kandungan vaksin.",
    "Saya boleh membezakan keimunan aktif dan keimunan pasif.",
    "Saya boleh mentafsir graf respon imun primer dan sekunder.",
    "Saya boleh mengaitkan kesihatan individu dengan keluarga, masyarakat, ekonomi dan negara.",
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
      options: ["Peringkat primer", "Peringkat sekunder", "Peringkat tertier", "Sebelum imunisasi"],
      answerIndex: 2,
      explanation:
        "Peringkat tertier merangkumi kawalan populasi vektor dan perlindungan hos seperti penggunaan kelambu.",
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
