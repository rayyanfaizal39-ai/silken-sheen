import type { Difficulty, QuizQuestion } from "@/data/types";
import type { Chapter2Sp } from "./chapter2-canonical";

interface QuizText {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface Chapter2QuizPair {
  sp: Chapter2Sp;
  difficulty: Difficulty;
  bm: QuizText;
  dlp: QuizText;
}

export type Chapter2QuizQuestion = QuizQuestion & { sp: Chapter2Sp; semanticId: string };

const pairs: Chapter2QuizPair[] = [
  {
    sp: "2.1.1",
    difficulty: "Easy",
    bm: {
      question: "Mengapakah sel dianggap sebagai unit asas bagi semua hidupan?",
      options: [
        "Sel ialah unit terkecil yang dapat menjalankan proses kehidupan",
        "Sel ialah struktur terkecil yang terdiri daripada beberapa tisu",
        "Sel ialah struktur yang hanya terdapat dalam organisma multisel",
        "Sel ialah bahagian organisma yang hanya menjalankan satu proses kehidupan",
      ],
      answerIndex: 0,
      explanation: "Sel ialah unit asas hidupan kerana sel merupakan unit terkecil yang mampu menjalankan proses kehidupan.",
    },
    dlp: {
      question: "What may happen when normal cells continue to divide without control?",
      options: [
        "Cancer may form",
        "Photosynthesis stops",
        "The cell becomes a unicellular organism",
        "Cell respiration cannot occur",
      ],
      answerIndex: 0,
      explanation: "Cancer forms when normal cells continue to divide without control.",
    },
  },
  {
    sp: "2.1.3",
    difficulty: "Easy",
    bm: {
      question: "Struktur manakah terdapat dalam sel haiwan dan sel tumbuhan?",
      options: ["Membran sel", "Dinding sel", "Kloroplas", "Vakuol tumbuhan"],
      answerIndex: 0,
      explanation:
        "Kedua-dua sel mempunyai membran sel; dinding sel, kloroplas dan vakuol tumbuhan ialah ciri sel tumbuhan.",
    },
    dlp: {
      question: "Which structure occurs in both animal and plant cells?",
      options: ["Cell membrane", "Cell wall", "Chloroplast", "Plant vacuole"],
      answerIndex: 0,
      explanation:
        "Both cells have a cell membrane; a cell wall, chloroplast and plant vacuole are plant-cell features.",
    },
  },
  {
    sp: "2.1.3",
    difficulty: "Easy",
    bm: {
      question: "Apakah fungsi kloroplas?",
      options: [
        "Menyerap tenaga cahaya untuk fotosintesis",
        "Mengawal pergerakan bahan",
        "Mengawal semua aktiviti sel",
        "Menghasilkan tenaga untuk tindak balas",
      ],
      answerIndex: 0,
      explanation: "Kloroplas menyerap tenaga cahaya untuk proses fotosintesis.",
    },
    dlp: {
      question: "What is the function of a chloroplast?",
      options: [
        "Absorbs light energy for photosynthesis",
        "Controls movement of substances",
        "Controls all cell activities",
        "Produces energy for reactions",
      ],
      answerIndex: 0,
      explanation: "A chloroplast absorbs light energy for photosynthesis.",
    },
  },
  {
    sp: "2.1.4",
    difficulty: "Easy",
    bm: {
      question: "Pasangan manakah dikelaskan dengan betul?",
      options: [
        "Amoeba — unisel; Hydra — multisel",
        "Hydra — unisel; Amoeba — multisel",
        "Mucor — unisel; Paramecium — multisel",
        "Spirogyra — unisel; Chlamydomonas — multisel",
      ],
      answerIndex: 0,
      explanation: "Amoeba terdiri daripada satu sel, manakala Hydra ialah organisma multisel.",
    },
    dlp: {
      question: "Which pair is classified correctly?",
      options: [
        "Amoeba — unicellular; Hydra — multicellular",
        "Hydra — unicellular; Amoeba — multicellular",
        "Mucor — unicellular; Paramecium — multicellular",
        "Spirogyra — unicellular; Chlamydomonas — multicellular",
      ],
      answerIndex: 0,
      explanation: "Amoeba consists of one cell, while Hydra is multicellular.",
    },
  },
  {
    sp: "2.1.5",
    difficulty: "Easy",
    bm: {
      question: "Sel tumbuhan manakah mempunyai unjuran yang meningkatkan luas permukaan untuk menyerap air dan garam mineral dari tanah?",
      options: [
        "Sel rerambut akar",
        "Sel pengawal",
        "Sel palisad",
        "Sel epidermis daun",
      ],
      answerIndex: 0,
      explanation: "Unjuran sel rerambut akar meningkatkan luas permukaan untuk menyerap air dan garam mineral dari tanah.",
    },
    dlp: {
      question: "Which plant cell increases surface area to absorb water and nutrients from soil?",
      options: ["Root hair cell", "Guard cell", "Palisade cell", "Epidermal cell"],
      answerIndex: 0,
      explanation: "Numerous root hair cells increase the surface area for absorption.",
    },
  },
  {
    sp: "2.1.6",
    difficulty: "Easy",
    bm: {
      question: "Apakah urutan organisasi yang betul?",
      options: [
        "Sel → tisu → organ → sistem → organisma",
        "Sel → organ → tisu → sistem → organisma",
        "Tisu → sel → organ → organisma → sistem",
        "Organ → tisu → sel → sistem → organisma",
      ],
      answerIndex: 0,
      explanation:
        "Organisasi haiwan dan tumbuhan mengikut urutan sel, tisu, organ, sistem dan organisma.",
    },
    dlp: {
      question: "What is the correct order of organisation?",
      options: [
        "Cell → tissue → organ → system → organism",
        "Cell → organ → tissue → system → organism",
        "Tissue → cell → organ → organism → system",
        "Organ → tissue → cell → system → organism",
      ],
      answerIndex: 0,
      explanation:
        "Animal and plant organisation follows cell, tissue, organ, system and organism.",
    },
  },
  {
    sp: "2.1.2",
    difficulty: "Easy",
    bm: {
      question: "Mengapakah spesimen yang hendak diperhatikan di bawah mikroskop perlu dibuat nipis?",
      options: [
        "Supaya cahaya dapat menembusi spesimen dan struktur sel dapat dilihat dengan jelas",
        "Supaya spesimen membesarkan imej sel tanpa bantuan kanta",
        "Supaya semua bahagian sel menyerap cahaya dan kelihatan gelap",
        "Supaya sel dalam spesimen membahagi sebelum pemerhatian",
      ],
      answerIndex: 0,
      explanation: "Spesimen yang nipis membolehkan cahaya menembusinya dengan lebih mudah, lalu struktur sel dapat diperhatikan dengan lebih jelas.",
    },
    dlp: {
      question: "Which stain is used for cheek cells in the textbook slide preparation?",
      options: ["Methylene blue solution", "Iodine solution", "Ethanol", "Potassium hydroxide"],
      answerIndex: 0,
      explanation: "Methylene blue stains cheek cells so they can be observed more clearly.",
    },
  },
  {
    sp: "2.2.1",
    difficulty: "Easy",
    bm: {
      question: "Mengapakah respirasi sel penting kepada organisma hidup?",
      options: [
        "Membebaskan tenaga daripada glukosa bagi menjalankan proses kehidupan",
        "Menyimpan tenaga cahaya dengan membentuk glukosa",
        "Menghasilkan glukosa daripada karbon dioksida dan air",
        "Membekalkan oksigen melalui penguraian air",
      ],
      answerIndex: 0,
      explanation: "Respirasi sel membebaskan tenaga daripada glukosa. Tenaga ini diperlukan untuk menjalankan proses kehidupan.",
    },
    dlp: {
      question: "What are the products of cell respiration?",
      options: [
        "Carbon dioxide, water and energy",
        "Glucose and oxygen",
        "Starch and chlorophyll",
        "Light and water",
      ],
      answerIndex: 0,
      explanation:
        "Cell respiration uses glucose and oxygen to produce carbon dioxide, water and energy.",
    },
  },
  {
    sp: "2.2.2",
    difficulty: "Easy",
    bm: {
      question: "Set lengkap manakah diperlukan untuk fotosintesis?",
      options: [
        "Tenaga cahaya, karbon dioksida, air dan klorofil",
        "Oksigen, glukosa, air dan tenaga",
        "Kanji, oksigen, tanah dan haba",
        "Karbon dioksida, oksigen, kanji dan tenaga",
      ],
      answerIndex: 0,
      explanation: "Fotosintesis memerlukan tenaga cahaya, karbon dioksida, air dan klorofil.",
    },
    dlp: {
      question: "Which complete set is required for photosynthesis?",
      options: [
        "Light energy, carbon dioxide, water and chlorophyll",
        "Oxygen, glucose, water and energy",
        "Starch, oxygen, soil and heat",
        "Carbon dioxide, oxygen, starch and energy",
      ],
      answerIndex: 0,
      explanation: "Photosynthesis requires light energy, carbon dioxide, water and chlorophyll.",
    },
  },
  {
    sp: "2.2.2",
    difficulty: "Easy",
    bm: {
      question: "Apakah perubahan warna positif apabila larutan iodin menguji kanji?",
      options: [
        "Perang kepada biru tua",
        "Biru tua kepada perang",
        "Hijau kepada merah",
        "Tidak berwarna kepada kuning",
      ],
      answerIndex: 0,
      explanation: "Larutan iodin berubah daripada perang kepada biru tua apabila kanji hadir.",
    },
    dlp: {
      question: "What positive colour change occurs when iodine solution tests for starch?",
      options: ["Brown to dark blue", "Dark blue to brown", "Green to red", "Colourless to yellow"],
      answerIndex: 0,
      explanation: "Iodine solution changes from brown to dark blue when starch is present.",
    },
  },
  {
    sp: "2.1.1",
    difficulty: "Medium",
    bm: {
      question: "Kulit yang luka membentuk sel baharu untuk menggantikan sel rosak. Proses apakah yang terlibat?",
      options: [
        "Pembahagian sel",
        "Pembesaran sel sedia ada sahaja",
        "Pengkhususan sel tanpa pembahagian",
        "Penggabungan sel rosak",
      ],
      answerIndex: 0,
      explanation: "Pembahagian sel membentuk sel baharu untuk pertumbuhan dan menggantikan sel yang rosak.",
    },
    dlp: {
      question: "Damaged skin forms new cells to replace injured cells. Which process is involved?",
      options: ["Cell division", "Photosynthesis", "Excretion", "Gas exchange"],
      answerIndex: 0,
      explanation: "Cell division forms new cells for growth and to replace damaged cells.",
    },
  },
  {
    sp: "2.1.3",
    difficulty: "Medium",
    bm: {
      question: "Seorang murid memerhati sel epidermis bawang dan sel pipi manusia di bawah mikroskop. Struktur manakah yang dijangka terdapat pada sel bawang tetapi tidak pada sel pipi?",
      options: [
        "Dinding sel",
        "Membran sel",
        "Sitoplasma",
        "Nukleus",
      ],
      answerIndex: 0,
      explanation: "Sel tumbuhan mempunyai dinding sel, manakala sel haiwan tidak. Kedua-duanya mempunyai membran sel, sitoplasma dan nukleus.",
    },
    dlp: {
      question:
        "A plant-cell diagram shows a cell wall but no cell membrane. Why is it incomplete?",
      options: [
        "Plant cells also have a cell membrane",
        "Only animal cells have a cell membrane",
        "The cell wall replaces the nucleus",
        "Chloroplasts control movement of substances",
      ],
      answerIndex: 0,
      explanation:
        "Plant cells have both a cell wall and a cell membrane; the membrane controls movement into and out of the cell.",
    },
  },
  {
    sp: "2.1.4",
    difficulty: "Medium",
    bm: {
      question: "Amoeba hanya terdiri daripada satu sel. Bagaimanakah Amoeba dapat terus hidup walaupun hanya mempunyai satu sel?",
      options: [
        "Sel tunggalnya menjalankan semua proses kehidupan",
        "Sel tunggalnya menjalankan pembiakan tetapi tidak menjalankan respirasi",
        "Sel tunggalnya memperoleh tenaga tanpa mengambil makanan",
        "Sel tunggalnya menyimpan semua bahan kumuh tanpa menyingkirkannya",
      ],
      answerIndex: 0,
      explanation: "Dalam organisma unisel, satu sel menjalankan semua proses kehidupan seperti respirasi, pemakanan, perkumuhan, pertumbuhan dan pembiakan.",
    },
    dlp: {
      question:
        "Why should Euglena not be labelled only as an animal or only as a plant in a summary?",
      options: [
        "It has both plant and animal characteristics",
        "It is multicellular",
        "It carries out no life processes",
        "It is a tissue",
      ],
      answerIndex: 0,
      explanation:
        "The textbook describes Euglena as making food like a plant and moving like an animal.",
    },
  },
  {
    sp: "2.1.5",
    difficulty: "Medium",
    bm: {
      question: "Gabungan struktur dan fungsi manakah betul bagi sel darah merah?",
      options: [
        "Cakera dwicekung - menambahkan luas permukaan untuk pengangkutan oksigen",
        "Cakera dwicekung - memerangkap partikel asing untuk dimusnahkan",
        "Gentian panjang - membawa impuls ke seluruh badan",
        "Unjuran panjang - menyerap air dan garam mineral",
      ],
      answerIndex: 0,
      explanation: "Bentuk cakera dwicekung menambahkan luas permukaan sel darah merah, dan hemoglobin mengangkut oksigen.",
    },
    dlp: {
      question: "Which structure-function link is correct for a red blood cell?",
      options: [
        "Biconcave disc — increases surface area for oxygen transport",
        "Long fibres — absorb water from soil",
        "Chlorophyll — destroys foreign particles",
        "Stoma — carries impulses",
      ],
      answerIndex: 0,
      explanation:
        "The biconcave disc increases red-blood-cell surface area, and haemoglobin transports oxygen.",
    },
  },
  {
    sp: "2.1.6",
    difficulty: "Medium",
    bm: {
      question: "Perut dan usus kecil bekerjasama untuk mencerna makanan. Apakah aras organisasi yang diwakili oleh gabungan organ ini?",
      options: [
        "Sistem pencernaan",
        "Tisu otot",
        "Sel epitelium",
        "Organisma",
      ],
      answerIndex: 0,
      explanation: "Beberapa organ yang bekerjasama menjalankan fungsi tertentu membentuk sistem. Perut dan usus kecil merupakan organ dalam sistem pencernaan.",
    },
    dlp: {
      question: "In the plant organisation pathway, which level follows epidermal tissue?",
      options: ["Leaf", "Epidermal cell", "Transport system", "Plant"],
      answerIndex: 0,
      explanation:
        "The textbook example is epidermal cell → epidermal tissue → leaf → transport system → plant.",
    },
  },
  {
    sp: "2.2.1",
    difficulty: "Medium",
    bm: {
      question: "Apakah perbezaan utama antara pernafasan dengan respirasi sel?",
      options: [
        "Pernafasan melibatkan pertukaran gas; respirasi sel menguraikan glukosa untuk membebaskan tenaga",
        "Pernafasan menguraikan glukosa; respirasi sel menggerakkan udara masuk dan keluar dari peparu",
        "Pernafasan hanya berlaku dalam sel tumbuhan; respirasi sel hanya berlaku dalam sel haiwan",
        "Pernafasan menghasilkan glukosa; respirasi sel menyimpan tenaga cahaya",
      ],
      answerIndex: 0,
      explanation: "Pernafasan ialah pertukaran gas dengan persekitaran, manakala respirasi sel berlaku dalam sel hidup untuk membebaskan tenaga.",
    },
    dlp: {
      question: "What is the main difference between breathing and cell respiration?",
      options: [
        "Breathing exchanges gases; cell respiration breaks down glucose to release energy",
        "Both occur only in chloroplasts",
        "Breathing produces glucose; cell respiration produces light",
        "Cell respiration occurs only in daytime",
      ],
      answerIndex: 0,
      explanation:
        "Breathing exchanges gases with the environment, while cell respiration occurs in living cells to release energy.",
    },
  },
  {
    sp: "2.1.2",
    difficulty: "Medium",
    bm: {
      question: "Seorang murid memerhati tisu epidermis bawang dan melihat banyak sel yang tersusun rapat. Apakah yang menerangkan hubungan antara sel dengan tisu tersebut?",
      options: [
        "Sel yang mempunyai struktur dan fungsi yang serupa membentuk tisu",
        "Beberapa tisu bergabung untuk membentuk satu sel",
        "Setiap sel merupakan satu sistem yang terdiri daripada beberapa organ",
        "Tisu ialah satu sel besar yang mengandungi sel kecil",
      ],
      answerIndex: 0,
      explanation: "Tisu ialah sekumpulan sel yang mempunyai struktur dan fungsi yang serupa serta bekerjasama menjalankan fungsi tertentu.",
    },
    dlp: {
      question:
        "After lowering the cover slip without trapping air bubbles, what is the correct observation sequence?",
      options: [
        "Low-power objective, then high-power objective",
        "High-power objective only",
        "High power, then remove the stain",
        "Draw before looking through the microscope",
      ],
      answerIndex: 0,
      explanation:
        "Observe with the low-power objective first, followed by the high-power objective. This digital answer does not confirm physical practical completion.",
    },
  },
  {
    sp: "2.2.2",
    difficulty: "Medium",
    bm: {
      question: "Sebahagian daun ditutup dengan kertas hitam dan sebahagian lagi menerima cahaya. Pokok telah dinyahkan kanji sebelum eksperimen dan mendapat air yang mencukupi. Selepas beberapa jam, hanya bahagian yang menerima cahaya memberikan ujian kanji positif. Apakah kesimpulan yang disokong?",
      options: [
        "Cahaya diperlukan untuk fotosintesis",
        "Cahaya diperlukan untuk daun menyerap air melalui akar",
        "Kertas hitam membekalkan karbon dioksida kepada daun",
        "Kanji terbentuk apabila cahaya dihalang",
      ],
      answerIndex: 0,
      explanation: "Kanji dikesan hanya pada bahagian yang menerima cahaya. Perbandingan pada daun yang sama menyokong bahawa cahaya diperlukan untuk fotosintesis.",
    },
    dlp: {
      question: "In the investigation of the need for light, what is the manipulated variable?",
      options: [
        "Presence of light",
        "Iodine colour change",
        "Type of plant",
        "Presence of starch after testing",
      ],
      answerIndex: 0,
      explanation:
        "The presence of light is changed; iodine colour change responds, and plant type is kept constant.",
    },
  },
  {
    sp: "2.2.3",
    difficulty: "Medium",
    bm: {
      question: "Pernyataan manakah membandingkan sel yang menjalankan respirasi sel dan fotosintesis dengan betul?",
      options: [
        "Respirasi sel berlaku dalam sel hidup tumbuhan dan haiwan; fotosintesis berlaku dalam sel yang mengandungi klorofil",
        "Respirasi sel hanya berlaku dalam sel haiwan; fotosintesis berlaku dalam semua sel tumbuhan",
        "Respirasi sel hanya berlaku dalam sel akar; fotosintesis berlaku dalam semua sel daun",
        "Respirasi sel berlaku dalam sel yang mengandungi klorofil; fotosintesis berlaku dalam sel haiwan",
      ],
      answerIndex: 0,
      explanation: "Sel hidup tumbuhan dan haiwan menjalankan respirasi sel. Fotosintesis memerlukan klorofil, maka bukan semua sel tumbuhan menjalankan fotosintesis.",
    },
    dlp: {
      question: "Which statement correctly distinguishes cell respiration from photosynthesis?",
      options: [
        "Respiration occurs at all times; photosynthesis occurs when light is present",
        "Both occur only when light is present",
        "Photosynthesis releases energy; respiration absorbs light",
        "Both occur in mitochondria",
      ],
      answerIndex: 0,
      explanation: "Cell respiration occurs at all times, while photosynthesis requires light.",
    },
  },
  {
    sp: "2.2.4",
    difficulty: "Medium",
    bm: {
      question: "Bagaimanakah respirasi sel dan fotosintesis saling melengkapi?",
      options: [
        "Hasil satu proses menjadi bahan bagi proses yang satu lagi",
        "Kedua-dua proses menggunakan glukosa dan oksigen sebagai bahan",
        "Kedua-dua proses menghasilkan karbon dioksida dan air sahaja",
        "Kedua-dua proses menyerap cahaya untuk membentuk glukosa",
      ],
      answerIndex: 0,
      explanation: "Fotosintesis membekalkan glukosa dan oksigen untuk respirasi; respirasi membekalkan karbon dioksida dan air untuk fotosintesis.",
    },
    dlp: {
      question: "How do the two processes complement each other?",
      options: [
        "The products of one become materials for the other",
        "Both produce only carbon dioxide",
        "Both use light at all times",
        "Respiration stops photosynthesis",
      ],
      answerIndex: 0,
      explanation:
        "Photosynthesis supplies glucose and oxygen for respiration; respiration supplies carbon dioxide and water for photosynthesis.",
    },
  },
  {
    sp: "2.1.1",
    difficulty: "Hard",
    bm: {
      question: "Satu kumpulan sel terus membahagi walaupun sel baharu tidak diperlukan lalu membentuk suatu jisim. Apakah inferens terbaik?",
      options: [
        "Kawalan pembahagian sel telah terganggu dan tumor mungkin terbentuk",
        "Sel sedang menggantikan sel rosak mengikut keperluan tisu",
        "Sel hanya membesar tanpa pertambahan bilangan sel",
        "Sel sedang membahagi secara terkawal untuk pertumbuhan normal",
      ],
      answerIndex: 0,
      explanation: "Pembahagian berterusan tanpa kawalan boleh menghasilkan jisim sel atau tumor dan dikaitkan dengan pembentukan kanser.",
    },
    dlp: {
      question:
        "A group of cells keeps dividing when new cells are not needed and forms a mass. What is the best inference?",
      options: [
        "Control of cell division has failed and a tumour may form",
        "The cells are carrying out normal photosynthesis",
        "The organism has become unicellular",
        "Mitochondria have changed into chloroplasts",
      ],
      answerIndex: 0,
      explanation:
        "Continued uncontrolled division can form a mass of cells or tumour and is associated with cancer formation.",
    },
  },
  {
    sp: "2.1.3",
    difficulty: "Hard",
    bm: {
      question: "Satu sel masih mempunyai dinding sel yang utuh, tetapi tidak lagi dapat mengawal pergerakan bahan masuk dan keluar. Struktur manakah paling mungkin rosak dan mengapa?",
      options: [
        "Membran sel, kerana mengawal pergerakan bahan masuk dan keluar",
        "Dinding sel, kerana mengawal semua bahan yang merentasinya",
        "Nukleus, kerana menjadi laluan keluar masuk bahan pada permukaan sel",
        "Kloroplas, kerana menapis bahan yang memasuki sel",
      ],
      answerIndex: 0,
      explanation: "Membran sel mengawal pergerakan bahan masuk dan keluar dari sel. Dinding sel memberikan sokongan dan bentuk tetap, tetapi tidak menggantikan fungsi membran sel.",
    },
    dlp: {
      question:
        "A cell has a cell wall, but the layer controlling substance movement is unlabelled. What should be added and where?",
      options: [
        "Cell membrane, just inside the cell wall",
        "Chloroplast, outside the cell wall",
        "Nucleus, replacing the cell wall",
        "Mitochondria, surrounding the whole cell",
      ],
      answerIndex: 0,
      explanation:
        "A plant cell has a cell membrane just inside its cell wall; the membrane controls substance movement.",
    },
  },
  {
    sp: "2.1.5",
    difficulty: "Hard",
    bm: {
      question: "Sel X mempunyai gentian panjang untuk membawa impuls, manakala sel Y mempunyai unjuran panjang yang menambahkan luas permukaan penyerapan di tanah. Apakah X dan Y?",
      options: [
        "X sel saraf; Y sel rerambut akar",
        "X sel darah merah; Y sel pengawal",
        "X sel palisad; Y sel epitelium",
        "X sel otot; Y sel pembiakan",
      ],
      answerIndex: 0,
      explanation: "Gentian panjang membolehkan sel saraf membawa impuls, manakala sel rerambut akar meningkatkan luas permukaan penyerapan.",
    },
    dlp: {
      question:
        "Cell X has long fibres, while cell Y has numerous projections that increase surface area in soil. What are X and Y?",
      options: [
        "X nerve cell; Y root hair cell",
        "X red blood cell; Y guard cell",
        "X palisade cell; Y epithelial cell",
        "X muscle cell; Y reproductive cell",
      ],
      answerIndex: 0,
      explanation:
        "Long fibres let a nerve cell carry impulses, while root hair cells increase absorption surface area.",
    },
  },
  {
    sp: "2.1.6",
    difficulty: "Hard",
    bm: {
      question:
        "Pasangan laluan manakah mengekalkan aras organisasi yang sama bagi haiwan dan tumbuhan?",
      options: [
        "Sel epitelium → tisu epitelium → perut; sel epidermis → tisu epidermis → daun",
        "Perut → sel epitelium → tisu epitelium; daun → sel epidermis → tisu epidermis",
        "Tisu epitelium → haiwan → perut; tisu epidermis → tumbuhan → daun",
        "Sistem pencernaan → perut → sel; sistem pengangkutan → daun → sel",
      ],
      answerIndex: 0,
      explanation: "Kedua-dua laluan pertama bergerak daripada sel kepada tisu dan kemudian organ.",
    },
    dlp: {
      question: "Which paired pathways preserve the same organisation levels in animal and plant?",
      options: [
        "Epithelial cell → epithelial tissue → stomach; epidermal cell → epidermal tissue → leaf",
        "Stomach → epithelial cell → epithelial tissue; leaf → epidermal cell → epidermal tissue",
        "Epithelial tissue → animal → stomach; epidermal tissue → plant → leaf",
        "Digestive system → stomach → cell; transport system → leaf → cell",
      ],
      answerIndex: 0,
      explanation: "Both first pathways move from cell to tissue and then organ.",
    },
  },
  {
    sp: "2.2.2",
    difficulty: "Hard",
    bm: {
      question: "Selepas ujian kanji pada daun bervariegasi, hanya bahagian yang asalnya hijau bertukar biru tua. Apakah kesimpulan terbaik?",
      options: [
        "Klorofil diperlukan untuk fotosintesis",
        "Bahagian bukan hijau mengandungi lebih banyak kanji",
        "Warna biru tua menunjukkan ketiadaan kanji",
        "Semua bahagian daun menghasilkan kanji tanpa klorofil",
      ],
      answerIndex: 0,
      explanation: "Bahagian hijau mengandungi klorofil dan menunjukkan kanji; ini menyokong keperluan klorofil untuk fotosintesis.",
    },
    dlp: {
      question:
        "After a starch test on a variegated leaf, only the originally green areas turn dark blue. What is the best conclusion?",
      options: [
        "Chlorophyll is required for photosynthesis",
        "Oxygen prevents photosynthesis",
        "Starch occurs only in roots",
        "Non-green areas photosynthesise more",
      ],
      answerIndex: 0,
      explanation:
        "Green areas contain chlorophyll and show starch, supporting the need for chlorophyll in photosynthesis.",
    },
  },
  {
    sp: "2.2.2",
    difficulty: "Hard",
    bm: {
      question: "Dua pokok yang telah dinyahkan kanji diletakkan dalam serkup kaca A dan B dengan cahaya dan bekalan air yang sama. Kalium hidroksida yang menyerap karbon dioksida hanya diletakkan dalam A. Selepas beberapa jam, daun A kekal perang dalam ujian iodin, manakala daun B menjadi biru tua. Apakah inferensnya?",
      options: [
        "Karbon dioksida diperlukan untuk fotosintesis",
        "Air sahaja mencukupi untuk menghasilkan kanji",
        "Kehadiran karbon dioksida menghalang pembentukan kanji",
        "Cahaya dan klorofil mencukupi untuk fotosintesis tanpa karbon dioksida",
      ],
      answerIndex: 0,
      explanation: "Kalium hidroksida menyerap karbon dioksida dalam serkup A. Dengan cahaya dan bekalan air yang sama, perbezaan keputusan ujian kanji menyokong bahawa karbon dioksida diperlukan untuk fotosintesis.",
    },
    dlp: {
      question:
        "Potassium hydroxide is placed only in bell jar A. Leaf A stays brown after the iodine test, while leaf B turns dark blue. What can be inferred?",
      options: [
        "Carbon dioxide is required for photosynthesis",
        "Potassium hydroxide supplies starch",
        "Light is not required",
        "Respiration occurs only in jar B",
      ],
      answerIndex: 0,
      explanation:
        "Potassium hydroxide absorbs carbon dioxide in jar A; the absence of starch shows carbon dioxide is required.",
    },
  },
  {
    sp: "2.2.3",
    difficulty: "Hard",
    bm: {
      question: "Proses P berlaku dalam mitokondria dan sentiasa berlaku. Proses Q berlaku dalam kloroplas ketika ada cahaya. Pernyataan manakah betul?",
      options: [
        "P menguraikan glukosa; Q mensintesis glukosa",
        "P mensintesis glukosa; Q menguraikan glukosa",
        "P dan Q kedua-duanya menguraikan glukosa",
        "P dan Q kedua-duanya mensintesis glukosa",
      ],
      answerIndex: 0,
      explanation: "P ialah respirasi sel yang menguraikan glukosa; Q ialah fotosintesis yang mensintesis glukosa.",
    },
    dlp: {
      question:
        "Process P occurs in mitochondria at all times. Process Q occurs in chloroplasts when light is present. Which statement is correct?",
      options: [
        "P breaks down glucose; Q synthesises glucose",
        "P absorbs light; Q releases energy for all life processes",
        "P occurs only in animals; Q only in humans",
        "P produces oxygen; Q uses oxygen to make carbon dioxide",
      ],
      answerIndex: 0,
      explanation:
        "P is cell respiration, which breaks down glucose; Q is photosynthesis, which synthesises glucose.",
    },
  },
  {
    sp: "2.2.3",
    difficulty: "Hard",
    bm: {
      question:
        "Tumbuhan diletakkan dalam gelap selama sehari tetapi masih hidup. Penjelasan manakah paling tepat?",
      options: [
        "Respirasi sel terus berlaku walaupun fotosintesis tidak berlaku tanpa cahaya",
        "Fotosintesis terus berlaku tanpa cahaya",
        "Kloroplas mengambil alih fungsi semua mitokondria",
        "Tumbuhan berhenti menggunakan tenaga",
      ],
      answerIndex: 0,
      explanation:
        "Respirasi sel sentiasa berlaku, manakala fotosintesis berlaku ketika ada cahaya.",
    },
    dlp: {
      question:
        "A plant is kept in darkness for one day but remains alive. Which explanation is most accurate?",
      options: [
        "Cell respiration continues although photosynthesis does not occur without light",
        "Photosynthesis continues without light",
        "Chloroplasts replace all mitochondrial functions",
        "The plant stops using energy",
      ],
      answerIndex: 0,
      explanation:
        "Cell respiration occurs at all times, while photosynthesis occurs when light is present.",
    },
  },
  {
    sp: "2.2.4",
    difficulty: "Hard",
    bm: {
      question: "Seekor belalang memakan daun tumbuhan hijau. Bagaimanakah fotosintesis tumbuhan menyumbang kepada bekalan tenaga belalang?",
      options: [
        "Makanan yang terhasil daripada fotosintesis membekalkan glukosa untuk respirasi sel belalang",
        "Klorofil daripada daun membolehkan semua sel belalang menjalankan fotosintesis",
        "Karbon dioksida daripada fotosintesis menggantikan keperluan belalang terhadap makanan",
        "Tenaga cahaya dipindahkan terus daripada daun kepada otot belalang tanpa respirasi sel",
      ],
      answerIndex: 0,
      explanation: "Tumbuhan menghasilkan glukosa melalui fotosintesis. Apabila belalang memakan tumbuhan, makanan yang dicerna membekalkan glukosa yang digunakan dalam respirasi sel untuk membebaskan tenaga.",
    },
    dlp: {
      question:
        "In a closed system containing a green plant and other organisms, which materials move from photosynthesis to support cell respiration?",
      options: [
        "Glucose and oxygen",
        "Carbon dioxide and water",
        "Starch and chlorophyll",
        "Ethanol and iodine",
      ],
      answerIndex: 0,
      explanation: "Photosynthesis produces glucose and oxygen used in cell respiration.",
    },
  },
  {
    sp: "2.2.4",
    difficulty: "Hard",
    bm: {
      question: "Dalam satu kawasan, bilangan tumbuhan hijau berkurang dengan banyak sementara respirasi organisma terus berlaku. Jika faktor lain tidak berubah, apakah kesan terhadap pertukaran gas antara kedua-dua proses?",
      options: [
        "Kurang karbon dioksida digunakan dan kurang oksigen dibekalkan oleh fotosintesis",
        "Lebih karbon dioksida digunakan dan lebih oksigen dibekalkan oleh fotosintesis",
        "Kurang karbon dioksida digunakan tetapi lebih oksigen dibekalkan oleh fotosintesis",
        "Lebih karbon dioksida digunakan tetapi kurang oksigen dibekalkan oleh fotosintesis",
      ],
      answerIndex: 0,
      explanation: "Fotosintesis menggunakan karbon dioksida dan membebaskan oksigen, manakala respirasi sel menggunakan oksigen dan membebaskan karbon dioksida. Pengurangan tumbuhan hijau mengurangkan sumbangan fotosintesis kepada pertukaran gas ini.",
    },
    dlp: {
      question:
        "If all carbon dioxide from respiration is removed from a plant's environment, which complementary link is directly broken?",
      options: [
        "The supply of carbon dioxide to photosynthesis",
        "The supply of chlorophyll to respiration",
        "The formation of cell membranes",
        "The sequence from cell to tissue",
      ],
      answerIndex: 0,
      explanation:
        "Carbon dioxide produced by respiration is one of the materials used in photosynthesis.",
    },
  },
];

function build(lang: "bm" | "dlp"): Chapter2QuizQuestion[] {
  return pairs.map((pair, index) => {
    const text = lang === "bm" ? pair.bm : pair.dlp;
    const shift = index % text.options.length;
    const options = text.options.map(
      (_, optionIndex) =>
        text.options[(optionIndex - shift + text.options.length) % text.options.length],
    );
    return {
      id: `sci-f1-c2-${lang}-q${index + 1}`,
      semanticId: `c2-q${index + 1}`,
      subjectId: "science",
      form: "Form 1",
      chapter: "Chapter 2",
      lang,
      sp: pair.sp,
      difficulty: pair.difficulty,
      question: text.question,
      options,
      answerIndex: shift,
      explanation: text.explanation,
    };
  });
}

export const scienceF1C2QuizzesBM = build("bm");
export const scienceF1C2QuizzesDLP = build("dlp");
export const chapter2QuizBlueprint = pairs.map((pair, index) => ({
  semanticId: `c2-q${index + 1}`,
  sp: pair.sp,
  difficulty: pair.difficulty,
}));
