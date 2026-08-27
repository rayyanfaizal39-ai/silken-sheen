import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch2-ekosistem.png";
import tropicalImage from "@/assets/notes/form2-science/chapter-2/chapter2_tropical_adaptation.webp";
import desertImage from "@/assets/notes/form2-science/chapter-2/chapter2_desert_adaptation.webp";
import tundraImage from "@/assets/notes/form2-science/chapter-2/chapter2_tundra_adaptation.webp";
import carbonOxygenCycleImage from "@/assets/notes/form2-science/chapter-2/chapter2_carbon_oxygen_cycle.webp";
import waterCycleImage from "@/assets/notes/form2-science/chapter-2/chapter2_water_cycle.webp";

export const scienceF2C2InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "Blog Sains — Kawalan Monyet Taman Tasik Perdana",
    body: "Apabila bilangan kera ekor panjang menjadi terlalu banyak, pegawai hidupan liar menggunakan pengurusan populasi berperikemanusiaan. Ini contoh sebenar campur tangan manusia secara berhati-hati untuk memulihkan keseimbangan ekosistem.",
    imagePath: chapterImage,
  },
  keywords: [
    "Ekosistem",
    "Pengeluar",
    "Pengguna",
    "Pengurai",
    "Karnivor primer",
    "Rantai makanan",
    "Siratan makanan",
    "Kitar nutrien",
    "Penyesuaian",
    "Simbiosis",
    "Kawalan biologi",
  ],
  sections: [
    // ───────────────────────────────────────────── SP 2.1.1
    {
      number: "2.1.1",
      title: "Pengeluar, Pengguna dan Pengurai",
      intro:
        "Tenaga memasuki hampir semua ekosistem sebagai cahaya matahari. Pengeluar memerangkapnya melalui fotosintesis, pengguna memperolehnya melalui pemakanan, dan pengurai mengembalikan nutrien kepada persekitaran.",
      cards: [
        {
          title: "Pengeluar",
          body: "Tumbuhan hijau membuat makanan sendiri melalui fotosintesis. Semua rantai makanan bermula di sini.",
          detail: "Aras trofik pertama",
        },
        {
          title: "Pengguna primer",
          body: "Haiwan herbivor dan omnivor yang memakan pengeluar. Contoh: beluncas, siput, belalang.",
          detail: "Memakan pengeluar",
        },
        {
          title: "Pengguna sekunder (karnivor primer)",
          body: "Haiwan omnivor dan karnivor yang memakan pengguna primer. Kerana ia karnivor yang pertama dalam rantai itu, ia dipanggil karnivor primer. Contoh: burung raja udang.",
          detail: "Karnivor primer",
        },
        {
          title: "Pengguna tertier (karnivor sekunder)",
          body: "Karnivor yang memakan pengguna sekunder, biasanya bersaiz lebih besar. Kerana ia karnivor yang kedua dalam rantai itu, ia dipanggil karnivor sekunder. Contoh: musang, ular.",
          detail: "Karnivor sekunder",
        },
        {
          title: "Pengurai",
          body: "Bakteria dan kulat menguraikan organisma mati serta bahan buangan kepada nutrien ringkas. Hubungan ini dipanggil saprofitisme.",
          detail: "Nutrien dikitar semula",
        },
      ],
      checks: [
        {
          question: "Mengapakah setiap rantai makanan bermula dengan pengeluar?",
          hint: "Hanya pengeluar boleh menukarkan tenaga cahaya kepada tenaga kimia dalam makanan; semua aras lain bergantung padanya.",
        },
        {
          question: "Apakah beza pengguna sekunder dengan pengguna tertier dari segi istilah karnivor?",
          hint: "Pengguna sekunder ialah karnivor primer; pengguna tertier ialah karnivor sekunder.",
        },
        {
          question: "Apakah akan berlaku kepada ekosistem jika tiada pengurai?",
          hint: "Nutrien akan terperangkap dalam organisma mati dan tidak dapat digunakan semula oleh pengeluar; lama-kelamaan tumbuhan tidak subur.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.1.2
    {
      number: "2.1.2",
      title: "Rantai Makanan dan Siratan Makanan",
      intro:
        "Rantai makanan menunjukkan satu laluan pemakanan yang lurus. Siratan makanan pula ialah gabungan beberapa rantai makanan yang saling berkait dalam satu ekosistem yang sama.",
      sequence: {
        title: "Rantai makanan: satu laluan lurus",
        instruction: "Ikuti aliran tenaga daripada pengeluar kepada pengguna teratas.",
        steps: [
          { title: "Kubis", body: "Pengeluar memerangkap tenaga cahaya melalui fotosintesis." },
          { title: "Siput", body: "Pengguna primer memakan kubis." },
          { title: "Burung", body: "Pengguna sekunder (karnivor primer) memakan siput." },
          {
            title: "Musang",
            body: "Pengguna tertier (karnivor sekunder) menerima bahagian tenaga asal yang paling kecil.",
          },
        ],
      },
      foodWeb: {
        title: "Siratan makanan: banyak rantai bersilang",
        instruction:
          "Siratan makanan di kebun sayur ini terbentuk daripada empat rantai makanan yang berkongsi organisma yang sama.",
        arrowNote: "Anak panah menunjuk ke arah organisma yang MAKAN — iaitu arah aliran tenaga.",
        tapHint: "Ketik satu organisma untuk melihat semua rantai yang melaluinya, atau ketik satu rantai di bawah.",
        chainsLabel: "Rantai makanan dalam siratan ini",
        tierLabels: ["Pengeluar", "Pengguna primer", "Pengguna sekunder", "Pengguna tertier"],
        nodes: [
          { id: "kubis", label: "Kubis", tier: 0, icon: "🥬" },
          { id: "beluncas", label: "Beluncas", tier: 1, icon: "🐛" },
          { id: "siput", label: "Siput", tier: 1, icon: "🐌" },
          { id: "belalang", label: "Belalang", tier: 1, icon: "🦗" },
          { id: "burung", label: "Burung", tier: 2, icon: "🐦" },
          { id: "katak", label: "Katak", tier: 2, icon: "🐸" },
          { id: "ular", label: "Ular", tier: 3, icon: "🐍" },
        ],
        edges: [
          { from: "kubis", to: "beluncas" },
          { from: "kubis", to: "siput" },
          { from: "kubis", to: "belalang" },
          { from: "beluncas", to: "burung" },
          { from: "siput", to: "burung" },
          { from: "belalang", to: "burung" },
          { from: "belalang", to: "katak" },
          { from: "burung", to: "ular" },
          { from: "katak", to: "ular" },
        ],
      },
      cards: [
        {
          title: "Tenaga mengalir sehala",
          body: "Tenaga tidak dikitar semula seperti nutrien. Pada setiap aras, sebahagian tenaga digunakan untuk bergerak dan menjalankan proses hidup seperti respirasi, lalu terbebas sebagai haba.",
          detail: "Sebab itu rantai makanan pendek",
        },
        {
          title: "Kehilangan tambahan pada pengguna",
          body: "Pengguna turut kehilangan tenaga melalui makanan yang tidak tercerna, iaitu tinja. Pengeluar tidak mengalami kehilangan jenis ini kerana ia membuat makanannya sendiri.",
          detail: "Khusus kepada haiwan",
        },
      ],
      checks: [
        {
          question: "Apakah perbezaan antara rantai makanan dengan siratan makanan?",
          hint: "Rantai makanan ialah satu laluan lurus; siratan makanan ialah gabungan beberapa rantai makanan yang saling berkait.",
        },
        {
          question: "Dalam siratan di atas, berapakah rantai makanan yang boleh dibina dan apakah persamaannya?",
          hint: "Empat rantai. Kesemuanya bermula dengan kubis (pengeluar) dan berakhir dengan ular (pengguna tertier).",
        },
        {
          question: "Mengapakah tenaga tidak dikitar semula dalam ekosistem?",
          hint: "Ia hilang sebagai haba melalui respirasi dan pergerakan pada setiap aras, dan pada pengguna juga melalui tinja.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.1
    {
      number: "2.2.1",
      title: "Kitar Karbon dan Kitar Oksigen",
      images: [
        {
          src: carbonOxygenCycleImage,
          imageKey: [
            { color: "#ef4444", label: "Anak panah merah = membebaskan karbon dioksida" },
            { color: "#3b82f6", label: "Anak panah biru = membebaskan oksigen" },
          ],
          annotationMode: "hybrid",
          size: "wide",
          alt: "Pemandangan hutan yang menunjukkan pergerakan karbon dioksida dan oksigen antara matahari, pokok, haiwan, pengurai di dalam tanah dan unggun api.",
          aspect: "3 / 2",
          legendLabel: "Bahagian kitar karbon dan kitar oksigen",
          caption: "Ketik setiap nombor untuk melihat proses yang berlaku di bahagian itu.",
          annotations: [
            { id: "sunlight", label: "Cahaya matahari", x: 10, y: 27, note: "Sumber tenaga untuk fotosintesis." },
            { id: "photosynthesis", label: "Fotosintesis", x: 19, y: 47, note: "Pokok menyerap karbon dioksida dan membebaskan oksigen." },
            { id: "carbon-dioxide", label: "Karbon dioksida", x: 50, y: 20, note: "Gas yang diserap oleh tumbuhan hijau dan dibebaskan semula oleh respirasi, penguraian dan pembakaran." },
            { id: "oxygen", label: "Oksigen", x: 63, y: 22, note: "Dibebaskan oleh fotosintesis dan digunakan untuk respirasi." },
            { id: "feeding", label: "Pemakanan", x: 47, y: 63, note: "Karbon berpindah daripada tumbuhan kepada haiwan melalui makanan." },
            { id: "respiration", label: "Respirasi", x: 60, y: 52, note: "Haiwan dan tumbuhan membebaskan karbon dioksida." },
            { id: "decomposition", label: "Penguraian", x: 64, y: 82, note: "Pengurai memecahkan sisa organisma mati dan membebaskan karbon dioksida." },
            { id: "combustion", label: "Pembakaran", x: 88, y: 66, note: "Pembakaran bahan api membebaskan karbon dioksida ke udara." },
          ],
        },
      ],
      intro:
        "Berbeza dengan tenaga, karbon dan oksigen dikitar berterusan antara organisma dengan persekitaran. Kedua-dua kitar ini saling berhubung melalui fotosintesis dan respirasi.",
      tabs: [
        {
          title: "Kitar karbon",
          body: "Fotosintesis menyerap karbon dioksida daripada udara. Karbon berpindah kepada haiwan melalui pemakanan. Respirasi, pereputan oleh pengurai dan pembakaran mengembalikan karbon dioksida ke atmosfera.",
        },
        {
          title: "Kitar oksigen",
          body: "Fotosintesis oleh tumbuhan hijau membebaskan oksigen ke udara. Respirasi haiwan dan tumbuhan, pereputan oleh pengurai serta pembakaran menggunakan oksigen itu semula.",
        },
      ],
      cards: [
        {
          title: "Peranan tumbuhan hijau",
          body: "Fotosintesis menyerap karbon dioksida dan membebaskan oksigen, lalu mengekalkan keseimbangan kandungan kedua-dua gas ini di dalam udara.",
        },
        {
          title: "Peranan haiwan dan tumbuhan",
          body: "Respirasi menggunakan oksigen dan membebaskan karbon dioksida — proses ini berlaku pada haiwan dan tumbuhan.",
        },
        {
          title: "Peranan pengurai",
          body: "Bakteria dan kulat menguraikan organisma mati menggunakan oksigen lalu membebaskan karbon dioksida, sambil melepaskan nutrien kembali ke tanah.",
        },
      ],
      checks: [
        {
          question: "Namakan tiga proses yang mengembalikan karbon dioksida ke atmosfera.",
          hint: "Respirasi, pereputan (penguraian) dan pembakaran.",
        },
        {
          question: "Bagaimanakah kitar karbon dan kitar oksigen saling berhubung?",
          hint: "Fotosintesis menyerap CO₂ dan membebaskan O₂; respirasi dan pereputan melakukan yang sebaliknya.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.2
    {
      number: "2.2.2",
      title: "Kitar Air",
      images: [
        {
          src: waterCycleImage,
          annotationMode: "hybrid",
          size: "wide",
          alt: "Pemandangan pantai yang menunjukkan air bergerak daripada laut ke awan, turun sebagai hujan, mengalir di permukaan, meresap ke dalam tanah dan diserap oleh akar pokok.",
          aspect: "16 / 9",
          legendLabel: "Proses dalam kitar air",
          caption: "Ketik setiap nombor untuk melihat proses yang berlaku di bahagian itu.",
          annotations: [
            { id: "evaporation", label: "Penyejatan", x: 15, y: 56, note: "Haba matahari menukarkan air laut kepada wap air." },
            { id: "condensation", label: "Kondensasi", x: 29, y: 30, note: "Wap air menyejuk di udara tinggi dan membentuk awan." },
            { id: "precipitation", label: "Hujan", x: 50, y: 38, note: "Titisan air dalam awan menjadi cukup berat lalu jatuh sebagai hujan." },
            { id: "runoff", label: "Larian permukaan", x: 52, y: 71, note: "Air hujan mengalir di atas permukaan tanah kembali ke sungai dan laut." },
            { id: "infiltration", label: "Resapan", x: 91, y: 66, note: "Sebahagian air hujan meresap masuk ke dalam tanah." },
            { id: "groundwater", label: "Air bawah tanah", x: 44, y: 93, note: "Air tersimpan di dalam lapisan tanah dan batuan." },
            { id: "root-uptake", label: "Penyerapan oleh akar", x: 80, y: 52, note: "Akar menyerap air dari dalam tanah." },
            { id: "transpiration", label: "Transpirasi", x: 80, y: 12, note: "Air keluar sebagai wap melalui daun." },
          ],
        },
      ],
      intro:
        "Air bergerak berterusan antara Bumi dengan atmosfera. Benda hidup bukan sekadar menggunakan air — ia turut membantu memacu dan mengawal kitar air itu sendiri.",
      tabs: [
        {
          title: "Proses fizikal",
          body: "Penyejatan menaikkan wap air ke atmosfera; kondensasi membentuk awan; kerpasan (hujan) mengembalikan air ke Bumi, lalu meresap ke dalam tanah atau mengalir di permukaan.",
        },
        {
          title: "Peranan benda hidup",
          body: "Akar tumbuhan menyerap air dari tanah dan daun membebaskannya semula melalui transpirasi. Haiwan pula membebaskan wap air melalui respirasi, perpeluhan dan perkumuhan. Kesemua proses ini menambah kandungan wap air di atmosfera.",
        },
      ],
      causeEffect: {
        title: "Mengapa tumbuhan penting kepada kitar air",
        instruction: "Setiap peranan menyumbang kepada kitar air dengan cara yang berbeza.",
        items: [
          {
            icon: "🌿",
            title: "Transpirasi",
            chain: [
              "Akar menyerap air dari tanah",
              "Daun membebaskan wap air",
              "Kandungan wap air di atmosfera meningkat",
            ],
          },
          {
            icon: "🌱",
            title: "Akar mencengkam tanah",
            chain: [
              "Akar mengikat struktur tanah",
              "Aliran air bawah tanah menjadi perlahan",
              "Hakisan tanah dapat dielakkan",
            ],
          },
          {
            icon: "🍂",
            title: "Daun gugur menutup tanah",
            chain: [
              "Sarap daun melitupi permukaan tanah",
              "Kadar penyejatan air berkurang",
              "Tanah tidak cepat menjadi kering",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Berikan dua proses perubahan jirim yang berlaku dalam kitar air.",
          hint: "Penyejatan (cecair → gas) dan kondensasi (gas → cecair).",
        },
        {
          question: "Wajarkan mengapa hutan yang ditebang boleh menjejaskan kitar air.",
          hint: "Kurang pokok bermakna kurang transpirasi, akar tidak lagi mencengkam tanah, dan sarap daun berkurang — air kurang dikembalikan ke atmosfera dan hakisan meningkat.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.3
    {
      number: "2.2.3",
      title: "Gangguan Kitar Nutrien",
      intro:
        "Tiga aktiviti manusia berikut mengganggu kitar nutrien. Bagi setiap satu, kesan boleh dikesan dan langkah penyelesaian boleh diambil.",
      causeEffect: {
        title: "Masalah dan penyelesaiannya",
        instruction: "Ikut rantaian kesan, kemudian baca langkah penyelesaian pada baris hijau.",
        items: [
          {
            icon: "🪓",
            title: "Penebangan hutan yang tidak terkawal",
            chain: [
              "Bilangan pokok berkurang",
              "Fotosintesis dan transpirasi menurun",
              "Kurang CO₂ diserap dan kurang air dikembalikan ke atmosfera",
              "Kitar karbon dan kitar air terganggu",
            ],
            note: "Penyelesaian: menanam semula pokok dan memperketat undang-undang perhutanan.",
          },
          {
            icon: "🏭",
            title: "Pembakaran bahan api fosil",
            chain: [
              "Kenderaan dan industri membakar bahan api fosil",
              "Oksigen digunakan, karbon dioksida tambahan dibebaskan",
              "Kandungan CO₂ atmosfera meningkat",
              "Kesan rumah hijau menjadi lebih kuat",
            ],
            note: "Penyelesaian: menggunakan pengangkutan awam dan tenaga yang lebih bersih.",
          },
          {
            icon: "💧",
            title: "Penggunaan sumber air yang berlebihan (pertanian dan domestik)",
            chain: [
              "Air diambil secara berlebihan untuk pengairan dan kegunaan harian",
              "Simpanan air bawah tanah, sungai dan tasik berkurang",
              "Kurang air tersedia untuk tumbuhan dan haiwan",
              "Kitar air terganggu dan sumber ekosistem berkurang",
            ],
            note: "Penyelesaian: menjimatkan air, menyimpan air hujan dan mewujudkan sistem pertanian yang terancang.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Pengetahuan Tambahan — Baja berlebihan dan eutrofikasi",
          body: "Baja yang berlebihan dihanyutkan ke sungai dan tasik. Nutrien tambahan ini mencetuskan ledakan alga; apabila alga mati dan diuraikan, oksigen terlarut dalam air berkurang lalu menjejaskan hidupan akuatik.",
        },
      ],
      checks: [
        {
          question: "Namakan tiga aktiviti manusia yang mengganggu kitar nutrien.",
          hint: "Penebangan hutan tidak terkawal, pembakaran bahan api fosil, dan penggunaan sumber air yang berlebihan untuk pertanian serta kegunaan domestik.",
        },
        {
          question: "Cadangkan dua langkah untuk menjimatkan air.",
          hint: "Menyimpan air hujan untuk kegunaan harian dan merancang sistem pengairan pertanian supaya tidak membazir.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.1
    {
      number: "2.3.1",
      title: "Saling Bersandaran dan Istilah Ekologi",
      intro:
        "Sebelum mengkaji interaksi, kenali lima istilah asas ekologi. Spesies, populasi dan komuniti ialah aras organisasi hidupan; habitat pula ialah tempat, bukan aras.",
      ecologicalTerms: {
        title: "Bagaimana istilah ini berkaitan",
        instruction:
          "Perhatikan bahawa habitat bukan aras seterusnya selepas komuniti. Habitat ialah tempat, manakala ekosistem terbentuk apabila komuniti berinteraksi dengan persekitaran bukan hidupnya.",
        levelsLabel: "Aras organisasi hidupan",
        placeLabel: "Tempat tinggal",
        ecosystemLabel: "Bagaimana ekosistem terbentuk",
        species: {
          term: "Spesies",
          definition: "Organisma serupa yang boleh saling membiak.",
        },
        population: {
          term: "Populasi",
          definition: "Semua organisma daripada spesies yang sama di habitat yang sama.",
        },
        community: {
          term: "Komuniti",
          definition: "Beberapa populasi berbeza yang hidup bersama dan saling berinteraksi.",
          short: "Semua benda hidup di kawasan itu.",
        },
        habitat: {
          term: "Habitat",
          definition: "Tempat tinggal semula jadi sesuatu organisma — contohnya kolam, hutan atau tanah.",
        },
        nonLiving: {
          term: "Persekitaran bukan hidup",
          definition: "Air, udara, cahaya, suhu dan tanah.",
        },
        ecosystem: {
          term: "Ekosistem",
          definition: "Komuniti bersama persekitaran bukan hidupnya, saling berinteraksi sebagai satu unit.",
        },
        note: "Kesilapan lazim: menyusun spesies → populasi → komuniti → habitat → ekosistem sebagai satu tangga. Habitat ialah tempat, bukan aras organisasi.",
      },
      cards: [
        {
          title: "Spesies",
          body: "Sekumpulan organisma yang mempunyai ciri-ciri serupa dan boleh saling membiak untuk menghasilkan anak.",
        },
        {
          title: "Populasi",
          body: "Sekumpulan organisma daripada spesies yang sama dan hidup di habitat yang sama. Contoh: satu populasi pepatung di kolam.",
        },
        {
          title: "Komuniti",
          body: "Beberapa populasi organisma yang berbeza, hidup bersama dalam satu habitat dan saling berinteraksi.",
        },
        {
          title: "Habitat",
          body: "Persekitaran atau tempat tinggal semula jadi bagi sesuatu organisma. Contoh: kolam, hutan, tanah.",
        },
        {
          title: "Ekosistem",
          body: "Beberapa komuniti yang tinggal bersama dalam satu habitat dan saling berinteraksi, termasuk komponen bukan hidup seperti air, udara dan tanah.",
        },
      ],
      comparison: {
        title: "Ekosistem yang seimbang",
        columns: [
          {
            title: "Apa yang menjadikannya seimbang",
            body: "Organisma saling bersandaran antara satu sama lain dan dengan komponen bukan hidup (air, cahaya, udara, tanah). Ekosistem dikatakan seimbang apabila kesemuanya berada dalam keadaan harmoni tanpa gangguan luar.",
          },
          {
            title: "Ekosistem semula jadi dan buatan manusia",
            body: "Hutan dan kolam ialah ekosistem semula jadi. Akuarium pula ekosistem buatan manusia — ia juga boleh seimbang selagi organisma dan komponen bukan hidup di dalamnya berinteraksi secara harmoni.",
          },
        ],
      },
      checks: [
        {
          question: "Susun istilah ini daripada yang paling kecil skopnya: komuniti, spesies, ekosistem, populasi.",
          hint: "Spesies → populasi → komuniti → ekosistem.",
        },
        {
          question: "Apakah beza habitat dengan ekosistem?",
          hint: "Habitat ialah tempat tinggal sesuatu organisma; ekosistem merangkumi semua komuniti di situ bersama komponen bukan hidup.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.2
    {
      number: "2.3.2",
      title: "Penyesuaian Hidupan",
      intro:
        "Setiap habitat mengenakan cabaran yang berbeza. Penyesuaian ialah ciri badan atau tingkah laku yang membolehkan organisma mengatasi cabaran itu — tanpanya, organisma tidak dapat bermandiri di habitat tersebut.",
      adaptations: {
        title: "Cabaran → penyesuaian → fungsi → kelebihan",
        instruction:
          "Pilih habitat, kemudian ikut rantaian bagi haiwan dan tumbuhan. Perhatikan bahawa setiap penyesuaian menyelesaikan cabaran khusus habitat itu.",
        labels: {
          challenge: "Cabaran habitat",
          adaptation: "Penyesuaian",
          role: "Fungsinya",
          benefit: "Kelebihan untuk bermandiri",
          animal: "Haiwan",
          plant: "Tumbuhan",
        },
        cases: [
          {
            id: "tropika",
            habitat: "Tropika",
            challenge:
              "Hujan lebat dan cahaya matahari berlimpah sepanjang tahun. Pokok tinggi berebut cahaya, tanah cepat lembap dan tepu air.",
            imagePath: tropicalImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "Seekor monyet berpaut pada dahan di dalam hutan hujan, dengan daun lebar berhujung tirus yang menyalirkan titisan air.",
            imageAspect: "16 / 9",
            imageAnnotations: [
              { id: "hands", label: "Tangan mencengkam", x: 36, y: 10, note: "Tangan yang boleh mencengkam dahan dengan kuat, membolehkan monyet bergerak dan bergantung di kanopi tinggi." },
              { id: "feet", label: "Kaki mencengkam", x: 35, y: 56, note: "Kaki yang turut mencengkam seperti tangan, memberi cengkaman tambahan supaya monyet tidak jatuh." },
              { id: "limbs", label: "Anggota panjang", x: 28, y: 25, note: "Anggota badan yang panjang membolehkan monyet menjangkau dahan yang jauh dan bergerak pantas di atas pokok." },
              { id: "leaves", label: "Daun lebar", x: 80, y: 42, note: "Daun yang lebar menangkap cahaya matahari sebanyak mungkin di bawah kanopi hutan yang teduh." },
              { id: "driptip", label: "Hujung titis", x: 57, y: 57, note: "Hujung daun yang tirus menyalirkan air hujan dengan cepat supaya daun tidak reput akibat air bertakung." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Monyet",
                adaptation: "Anggota badan yang panjang serta ekor yang kuat untuk memanjat.",
                role: "Membolehkannya bergerak di kanopi pokok yang tinggi.",
                benefit: "Dapat mencapai buah dan daun di atas, jauh daripada pemangsa di lantai hutan.",
              },
              {
                kind: "plant",
                name: "Pokok hutan hujan",
                adaptation: "Daun lebar dengan hujung yang tirus (hujung titisan).",
                role: "Daun lebar menangkap cahaya maksimum; hujung tirus menyalirkan air hujan dengan cepat.",
                benefit: "Fotosintesis berterusan tanpa daun reput akibat air bertakung.",
              },
            ],
          },
          {
            id: "gurun",
            habitat: "Gurun",
            challenge:
              "Siang yang panas melampau, malam yang sejuk, dan hujan yang sangat sedikit. Kehilangan air adalah ancaman utama.",
            imagePath: desertImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "Seekor unta berdiri di padang pasir di sebelah kaktus berbatang tebal yang akarnya meluas secara cetek di bawah permukaan tanah.",
            imageAspect: "3 / 2",
            imageAnnotations: [
              { id: "hump", label: "Bonggol", x: 27, y: 29, note: "Bonggol menyimpan lemak sebagai simpanan tenaga. Lemak tertumpu di satu tempat supaya haba tidak terperangkap di seluruh badan." },
              { id: "eyelashes", label: "Bulu mata panjang", x: 50, y: 25, note: "Bulu mata yang panjang menghalang pasir daripada masuk ke mata semasa ribut pasir." },
              { id: "legs", label: "Kaki panjang", x: 30, y: 63, note: "Kaki yang panjang menjauhkan badan daripada pasir yang panas membahang." },
              { id: "feet", label: "Tapak kaki lebar", x: 34, y: 84, note: "Tapak kaki yang lebar menyebarkan berat badan supaya unta tidak terbenam di dalam pasir." },
              { id: "spines", label: "Duri", x: 84, y: 30, note: "Daun yang berubah menjadi duri mengurangkan luas permukaan, jadi kehilangan air melalui transpirasi menjadi sangat rendah. Duri juga melindungi kaktus daripada dimakan." },
              { id: "stem", label: "Batang tebal", x: 79, y: 45, note: "Batang yang tebal menyimpan air, membolehkan kaktus bertahan sepanjang musim kering." },
              { id: "roots", label: "Akar cetek yang meluas", x: 78, y: 85, note: "Akar yang cetek dan meluas menyerap air hujan dengan cepat di kawasan luas sebelum air itu tersejat." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Unta",
                adaptation: "Bonggol menyimpan lemak dan badan bertoleransi terhadap kehilangan air.",
                role: "Lemak menjadi simpanan tenaga tanpa menahan haba di seluruh badan.",
                benefit: "Boleh bertahan lama tanpa makanan dan air semasa merentas gurun.",
              },
              {
                kind: "plant",
                name: "Kaktus",
                adaptation: "Daun berubah menjadi duri dan batang tebal menyimpan air.",
                role: "Duri mengurangkan luas permukaan sehingga transpirasi menjadi sangat rendah.",
                benefit: "Air yang disimpan bertahan sepanjang musim kering dan duri melindunginya daripada dimakan.",
              },
            ],
          },
          {
            id: "tundra",
            habitat: "Tundra",
            challenge:
              "Musim sejuk yang panjang dan suhu amat rendah, musim panas yang singkat, tanah beku dan angin kencang di dataran tanpa pokok.",
            imagePath: tundraImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "Seekor rubah Artik berbulu tebal berdiri di dataran tundra yang dipenuhi tumbuhan rendah, lumut dan liken.",
            imageAspect: "16 / 9",
            imageAnnotations: [
              { id: "fur", label: "Bulu tebal", x: 19, y: 80, note: "Bulu yang tebal memerangkap udara dan menebat haba badan daripada hilang ke persekitaran yang sejuk." },
              { id: "ears", label: "Telinga kecil", x: 36, y: 52, note: "Telinga yang kecil mengurangkan luas permukaan, jadi kurang haba badan hilang melalui telinga." },
              { id: "body", label: "Badan padat", x: 31, y: 66, note: "Badan yang padat mengurangkan nisbah luas permukaan kepada isi padu, jadi haba badan lebih mudah dikekalkan." },
              { id: "lowplants", label: "Tumbuhan rendah", x: 48, y: 88, note: "Tumbuhan yang tumbuh rendah dan rapat ke tanah mengelakkan angin kencang dan memerangkap sedikit haba berhampiran permukaan tanah." },
              { id: "moss", label: "Lumut dan liken", x: 8, y: 90, note: "Lumut dan liken tidak berbatang kayu tinggi, jadi ia boleh hidup di atas tanah beku dengan musim panas yang sangat singkat." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Rubah Artik",
                adaptation: "Bulu tebal, lapisan lemak di bawah kulit, telinga kecil dan bulu bertukar putih pada musim sejuk.",
                role: "Bulu dan lemak menebat haba badan; telinga kecil mengurangkan kehilangan haba; bulu putih menyamarkannya pada salji.",
                benefit: "Suhu badan kekal walaupun persekitaran sangat sejuk, dan ia dapat memburu tanpa mudah dikesan.",
              },
              {
                kind: "plant",
                name: "Lumut dan liken",
                adaptation: "Tumbuh rendah dan rapat ke tanah tanpa batang berkayu yang tinggi.",
                role: "Mengelakkan angin kencang dan memerangkap sedikit haba berhampiran permukaan tanah.",
                benefit: "Dapat hidup di tanah beku yang cetek, tempat pokok tinggi tidak mampu berakar.",
              },
            ],
          },
        ],
      },
      cards: [
        {
          title: "Faktor persekitaran menentukan taburan",
          body: "Suhu, cahaya dan kelembapan menentukan di mana sesuatu organisma berkumpul. Dalam penyiasatan kutu kayu, kutu kayu berkumpul di kawasan yang lembap, gelap dan bersuhu sederhana.",
          detail: "Contoh penyiasatan makmal",
        },
      ],
      checks: [
        {
          question: "Wajarkan mengapa penyesuaian penting kepada sesuatu organisma.",
          hint: "Penyesuaian menyelesaikan cabaran khusus habitatnya — tanpa ciri itu organisma akan kehilangan air, haba, makanan atau perlindungan, dan tidak dapat bermandiri.",
        },
        {
          question: "Bandingkan penyesuaian kaktus dengan penyesuaian lumut tundra.",
          hint: "Kaktus menyimpan air dan mengurangkan transpirasi kerana cabarannya kekeringan; lumut tumbuh rendah kerana cabarannya kesejukan, angin dan tanah beku.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.3
    {
      number: "2.3.3",
      title: "Interaksi antara Organisma",
      intro:
        "Interaksi antara organisma terdiri daripada simbiosis (mutualisme, komensalisme, parasitisme), mangsa-pemangsa dan persaingan.",
      cards: [
        {
          title: "Mutualisme",
          body: "Kedua-dua organisma untung. Contoh: buran melindungi ikan badut daripada pemangsa; ikan badut membersihkan buran dan memberi nutrien daripada sisa makanannya.",
        },
        {
          title: "Komensalisme",
          body: "Satu organisma (komensal) untung; yang satu lagi tidak terjejas. Contoh: ikan remora melekat pada jerung dan makan sisa makanannya, tanpa memudaratkan jerung.",
        },
        {
          title: "Parasitisme",
          body: "Satu organisma (parasit) untung; perumah rugi. Contoh: cacing pita hidup dalam usus manusia dan menyerap nutrien daripada perumahnya.",
        },
        {
          title: "Mangsa–pemangsa",
          body: "Satu organisma (pemangsa) memburu dan memakan organisma lain (mangsa). Contoh: burung hantu memburu dan memakan tikus.",
        },
        {
          title: "Persaingan",
          body: "Organisma dalam habitat yang sama bersaing untuk keperluan asas yang terhad seperti cahaya, ruang, air, makanan atau pasangan. Ia boleh berlaku sesama spesies mahupun antara spesies berlainan.",
        },
      ],
      matcher: {
        title: "Padankan interaksi",
        instruction: "Pilih interaksi di kiri, kemudian contoh yang betul.",
        pairs: [
          { id: "mutualism", label: "Mutualisme", match: "Ikan badut dan buran — kedua-duanya untung" },
          { id: "commensalism", label: "Komensalisme", match: "Remora untung; jerung tidak terjejas" },
          { id: "parasitism", label: "Parasitisme", match: "Cacing pita untung; perumah manusia rugi" },
          { id: "predation", label: "Mangsa–pemangsa", match: "Burung hantu memburu dan makan tikus" },
          { id: "competition", label: "Persaingan", match: "Tumbuhan bersaing untuk cahaya, air dan ruang" },
        ],
      },
      accordions: [
        {
          title: "🦉 Kawalan biologi — mengaplikasi interaksi dalam kehidupan harian",
          body: "Kawalan biologi menggunakan pemangsa, parasit atau patogen semula jadi untuk mengurangkan bilangan perosak. Di Malaysia: burung hantu mengawal tikus di ladang kelapa sawit, ikan gapi memakan jentik-jentik, kumbang kura-kura memakan afid, itik memakan siput di sawah padi, dan Bacillus thuringiensis mengawal kumbang tanduk.",
        },
        {
          title: "⚖️ Kebaikan berbanding kawalan kimia",
          body: "Kawalan biologi lebih mesra alam kerana tidak menggunakan pestisid atau bahan kimia. Ia biasanya lebih murah dan tidak menjejaskan kesihatan manusia.",
        },
        {
          title: "⏳ Kesan jangka panjang yang perlu dipertimbangkan",
          body: "Kawalan biologi mengambil masa yang lebih lama sebelum kesannya kelihatan. Keseimbangan ekosistem juga mungkin terganggu kerana spesies baharu diperkenalkan ke dalam ekosistem tersebut — spesies itu sendiri boleh menjadi masalah jika populasinya tidak terkawal.",
        },
      ],
      checks: [
        {
          question: "Bezakan mutualisme daripada komensalisme.",
          hint: "Mutualisme: kedua-duanya untung. Komensalisme: satu untung, satu lagi tidak terjejas (bukan rugi).",
        },
        {
          question: "Mengapakah kawalan biologi lebih selamat daripada racun perosak, dan apakah risikonya?",
          hint: "Lebih selamat kerana tiada pencemaran kimia dan tidak menjejaskan kesihatan; risikonya ia lambat berkesan dan spesies baharu yang diperkenalkan boleh mengganggu keseimbangan ekosistem.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.4
    {
      number: "2.3.4",
      title: "Faktor yang Mempengaruhi Saiz Populasi",
      intro:
        "Saiz populasi tidak kekal. Empat faktor berikut boleh menaikkan atau menurunkannya dalam sesuatu ekosistem.",
      causeEffect: {
        title: "Empat faktor utama",
        instruction: "Setiap faktor mengubah saiz populasi melalui rantaian kesannya sendiri.",
        items: [
          {
            icon: "🦠",
            title: "Serangan penyakit",
            chain: [
              "Wabak menular dalam populasi",
              "Ramai individu mati atau lemah",
              "Saiz populasi menurun",
            ],
            note: "Contoh: selesema burung di kawasan ternakan ayam; penyakit mozek tembakau di ladang tembakau.",
          },
          {
            icon: "🦁",
            title: "Kehadiran pemangsa",
            chain: [
              "Bilangan pemangsa meningkat",
              "Lebih banyak mangsa dimakan",
              "Saiz populasi mangsa berkurang",
            ],
            note: "Contoh: populasi kuda belang berkurang dengan kehadiran singa di savana.",
          },
          {
            icon: "🎋",
            title: "Sumber makanan",
            chain: [
              "Sumber makanan utama berkurang",
              "Organisma kelaparan atau berpindah",
              "Populasi terancam kepupusan",
            ],
            note: "Contoh: panda bergantung pada buluh; sebaliknya sisa makanan yang banyak menaikkan populasi burung gagak di Malaysia.",
          },
          {
            icon: "☀️",
            title: "Kemarau (perubahan cuaca)",
            chain: [
              "Kemarau berpanjangan",
              "Tanah menjadi kering dan tidak subur, risiko kebakaran hutan meningkat",
              "Populasi tumbuhan dan haiwan menurun",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Namakan empat faktor yang mempengaruhi saiz populasi.",
          hint: "Serangan penyakit, kehadiran pemangsa, sumber makanan dan kemarau (perubahan cuaca).",
        },
        {
          question: "Mengapakah populasi burung gagak di Malaysia meningkat?",
          hint: "Sisa makanan manusia yang terlalu banyak menyediakan sumber makanan berlebihan.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.5
    {
      number: "2.3.5",
      title: "Perubahan dalam Ekosistem",
      intro:
        "Perubahan dalam ekosistem mengubah sumber yang ada dan mengganggu keseimbangan antara populasi. Ramalkan kesannya dengan mengikut rantaian di bawah.",
      causeEffect: {
        title: "Tiga jenis perubahan",
        instruction: "Perhatikan bagaimana satu perubahan merebak kepada populasi yang lain.",
        items: [
          {
            icon: "💧",
            title: "Kekurangan bekalan air",
            chain: [
              "Kemarau berpanjangan di sawah padi",
              "Padi (pengeluar) berkurang kerana kekurangan air",
              "Pengguna yang bergantung padanya kehilangan makanan",
              "Keseluruhan siratan makanan terjejas",
            ],
            note: "Padi ialah tanaman yang memerlukan banyak air, jadi ia terjejas terlebih dahulu.",
          },
          {
            icon: "🕊️",
            title: "Migrasi (penghijrahan)",
            chain: [
              "Haiwan berpindah dari satu tempat ke tempat lain akibat perubahan musim",
              "Burung bangau kendi tiba di Kuala Gula, Perak dari September hingga April",
              "Burung memakan serangga di kawasan itu",
              "Populasi belalang, cengkerik, labah-labah, lalat dan cacing tanah berkurang",
            ],
            note: "Populasi di kawasan asal dan kawasan destinasi kedua-duanya berubah.",
          },
          {
            icon: "📈",
            title: "Perubahan saiz populasi",
            chain: [
              "Satu populasi meningkat atau menurun secara mendadak",
              "Populasi lain yang berkaitan turut berubah",
              "Contoh: kumbang dan beluncas bertambah",
              "Populasi tumbuhan menurun kerana dimakan",
            ],
            note: "Kesan berantai ini juga berlaku apabila pemangsa disingkirkan — mangsanya akan meningkat.",
          },
        ],
      },
      checks: [
        {
          question: "Ramalkan kesan kemarau panjang terhadap siratan makanan di sawah padi.",
          hint: "Padi sebagai pengeluar berkurang, jadi setiap pengguna yang bergantung padanya turut berkurang — keseluruhan siratan terjejas.",
        },
        {
          question: "Bagaimanakah penghijrahan burung mengubah keseimbangan populasi di kawasan destinasi?",
          hint: "Burung pendatang memakan serangga tempatan, jadi populasi serangga di situ berkurang sepanjang musim penghijrahan.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.4.1
    {
      number: "2.4.1",
      title: "Peranan Manusia dalam Mengekalkan Keseimbangan Alam",
      intro:
        "Manusia memerlukan ekosistem yang stabil dan produktif demi kelestarian hidup — daripadanya kita memperoleh makanan, air bersih, udara yang selamat, bahan mentah dan ubat-ubatan. Apabila ekosistem terganggu, sumber-sumber ini turut terjejas, jadi manusia bertanggungjawab memulihara keseimbangan alam.",
      comparison: {
        title: "Kos aktiviti manusia terhadap alam",
        columns: [
          {
            title: "Tekanan manusia",
            body: "Penebangan hutan menyebabkan kepupusan spesies, hakisan tanah dan kesan rumah hijau. Perindustrian mencemarkan udara, air dan tanah serta menyebabkan hujan asid. Pertanian yang tidak lestari mencemarkan air dan menghilangkan mineral tanah. Pembuangan sampah sarap menyebabkan pencemaran, bau busuk dan banjir kilat.",
          },
          {
            title: "Memulihkan keseimbangan",
            body: "Menguatkuasakan undang-undang (rondaan hutan dan sekatan jalan raya oleh Jabatan Perhutanan), meningkatkan kesedaran orang awam, mengamalkan 5R, dan menggunakan kaedah kawalan biologi dalam pertanian.",
          },
        ],
      },
      cards: [
        { title: "Refuse (Tolak)", body: "Elakkan menggunakan bahan yang tidak dapat dikitar semula." },
        { title: "Reduce (Kurangkan)", body: "Kurangkan jumlah bahan yang digunakan." },
        { title: "Reuse (Guna semula)", body: "Gunakan semula sesuatu bahan." },
        { title: "Recycle (Kitar semula)", body: "Proses bahan buangan menjadi bahan baharu." },
        { title: "Repurpose (Guna untuk tujuan lain)", body: "Berikan bahan lama satu fungsi yang baharu." },
      ],
      checks: [
        {
          question: "Wajarkan mengapa manusia memerlukan ekosistem yang stabil dan produktif.",
          hint: "Ekosistem membekalkan makanan, air bersih, udara, bahan mentah dan ubat-ubatan; jika ia terganggu, bekalan sumber untuk manusia sendiri terjejas.",
        },
        {
          question: "Senaraikan urutan lengkap 5R.",
          hint: "Refuse, Reduce, Reuse, Recycle, Repurpose.",
        },
        {
          question: "Bagaimanakah pembalakan mengganggu keseimbangan ekosistem?",
          hint: "Kehilangan habitat, kepupusan spesies, hakisan tanah, dan karbon dioksida atmosfera meningkat kerana kurang fotosintesis.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan aliran tenaga melalui pengeluar, pengguna dan pengurai, termasuk istilah karnivor primer dan sekunder.",
    "Saya boleh mentafsir rantai makanan dan siratan makanan.",
    "Saya boleh menghuraikan kitar karbon, oksigen dan air serta peranan benda hidup di dalamnya.",
    "Saya boleh menerangkan gangguan kitar nutrien dan mencadangkan penyelesaiannya.",
    "Saya boleh mewajarkan kepentingan penyesuaian hidupan terhadap alam sekitar.",
    "Saya boleh membandingkan interaksi utama antara organisma.",
    "Saya boleh meramalkan kesan perubahan dalam ekosistem terhadap keseimbangan populasi.",
    "Saya boleh menjustifikasikan tindakan untuk mengekalkan ekosistem yang seimbang.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Tenaga dikitar semula tanpa henti dalam ekosistem.",
      answer: false,
      explanation:
        "Tenaga mengalir sehala dan banyak hilang sebagai haba melalui respirasi dan pergerakan; nutrien pula yang dikitar semula.",
    },
    {
      type: "multiple-choice",
      question: "Mengapakah bilangan tikus meningkat selepas helang disingkirkan?",
      options: ["Tikus kehilangan makanan", "Tekanan pemangsaan berkurang", "Pengurai bertambah", "Hujan berhenti"],
      answerIndex: 1,
      explanation: "Apabila pemangsa disingkirkan, lebih banyak mangsa hidup dan membiak.",
    },
  ],
};
