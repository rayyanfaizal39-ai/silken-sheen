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
      question: "Why is the cell considered the basic unit of life?",
      options: [
        "It is the smallest unit that can carry out life processes",
        "It is the smallest structure made up of several tissues",
        "It is a structure found only in multicellular organisms",
        "It is a part of an organism that carries out only one life process",
      ],
      answerIndex: 0,
      explanation: "A cell is the smallest structural and functional unit capable of carrying out life processes.",
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
      question: "Which plant cell has a projection that increases its surface area for absorbing water and mineral salts from soil?",
      options: [
        "Root hair cell",
        "Guard cell",
        "Palisade cell",
        "Leaf epidermal cell",
      ],
      answerIndex: 0,
      explanation: "The projection of a root hair cell increases its surface area for absorbing water and mineral salts from soil.",
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
      question: "Why should a specimen placed on a microscope slide be thin?",
      options: [
        "So that light can pass through the specimen and its cell structures can be seen clearly",
        "So that the specimen magnifies the cells without the help of lenses",
        "So that all parts of the cells absorb light and appear dark",
        "So that the cells divide before they are observed",
      ],
      answerIndex: 0,
      explanation: "A thin specimen allows enough light to pass through for its structures to be observed clearly.",
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
      question: "Why is cellular respiration important to cells?",
      options: [
        "It releases energy from glucose for cellular activities",
        "It stores light energy by forming glucose",
        "It produces glucose from carbon dioxide and water",
        "It supplies oxygen by breaking down water",
      ],
      answerIndex: 0,
      explanation: "Cellular respiration releases energy from glucose so cells can carry out their activities.",
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
      options: [
        "Cell division",
        "Enlargement of existing cells only",
        "Cell specialisation without division",
        "Fusion of damaged cells",
      ],
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
      question: "A student observes onion epidermal cells and human cheek cells under a microscope. Which structure is expected in the onion cells but not in the cheek cells?",
      options: [
        "Cell wall",
        "Cell membrane",
        "Cytoplasm",
        "Nucleus",
      ],
      answerIndex: 0,
      explanation: "Plant cells have a cell wall, while animal cells do not. Both onion epidermal cells and human cheek cells have a cell membrane, cytoplasm and a nucleus.",
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
      question: "How can a unicellular organism such as Amoeba survive with only one cell?",
      options: [
        "Its single cell performs all the life processes needed for survival",
        "Its single cell reproduces but does not carry out respiration",
        "Its single cell obtains energy without taking in food",
        "Its single cell stores all waste products without removing them",
      ],
      answerIndex: 0,
      explanation: "In a unicellular organism, one cell carries out all essential life processes, including respiration, nutrition, excretion, growth and reproduction.",
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
        "Biconcave disc - increases surface area for oxygen transport",
        "Biconcave disc - traps foreign particles for destruction",
        "Long fibres - carry impulses throughout the body",
        "Long projection - absorbs water and mineral salts",
      ],
      answerIndex: 0,
      explanation: "The biconcave disc increases red-blood-cell surface area, and haemoglobin transports oxygen.",
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
      question: "The stomach and small intestine work together to digest food. Which level of organisation does this group of organs represent?",
      options: [
        "Digestive system",
        "Muscle tissue",
        "Epithelial cell",
        "Organism",
      ],
      answerIndex: 0,
      explanation: "Several organs working together to carry out a particular function form a system. The stomach and small intestine are organs in the digestive system.",
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
        "Breathing involves gas exchange; cell respiration breaks down glucose to release energy",
        "Breathing breaks down glucose; cell respiration moves air into and out of the lungs",
        "Breathing occurs only in plant cells; cell respiration occurs only in animal cells",
        "Breathing produces glucose; cell respiration stores light energy",
      ],
      answerIndex: 0,
      explanation: "Breathing exchanges gases with the environment, while cell respiration occurs in living cells to release energy.",
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
      question: "A student observes onion epidermal tissue and sees many closely packed cells. Which statement explains the relationship between these cells and the tissue?",
      options: [
        "Cells with similar structures and functions form a tissue",
        "Several tissues combine to form a single cell",
        "Each cell is a system made up of several organs",
        "A tissue is one large cell containing smaller cells",
      ],
      answerIndex: 0,
      explanation: "A tissue consists of groups of similar cells that work together to carry out a particular function.",
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
      question: "Part of a leaf is covered with black paper while the rest receives light. The plant was destarched before the experiment and receives enough water. After several hours, only the exposed part tests positive for starch. Which conclusion is supported?",
      options: [
        "Light is needed for photosynthesis",
        "Light is needed for the plant to absorb water through its roots",
        "Black paper supplies carbon dioxide to the leaf",
        "Starch forms when light is blocked",
      ],
      answerIndex: 0,
      explanation: "Starch is detected only in the part that receives light. Comparing parts of the same leaf supports the conclusion that light is needed for photosynthesis.",
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
      question: "Which statement correctly compares the cells that carry out cell respiration and photosynthesis?",
      options: [
        "Cell respiration occurs in living plant and animal cells; photosynthesis occurs in cells containing chlorophyll",
        "Cell respiration occurs only in animal cells; photosynthesis occurs in all plant cells",
        "Cell respiration occurs only in root cells; photosynthesis occurs in all leaf cells",
        "Cell respiration occurs in cells containing chlorophyll; photosynthesis occurs in animal cells",
      ],
      answerIndex: 0,
      explanation: "Living plant and animal cells carry out cell respiration. Photosynthesis requires chlorophyll, so not all plant cells carry out photosynthesis.",
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
      question: "How do cell respiration and photosynthesis complement each other?",
      options: [
        "The products of one become materials for the other",
        "Both processes use glucose and oxygen as their materials",
        "Both processes produce only carbon dioxide and water",
        "Both processes absorb light to form glucose",
      ],
      answerIndex: 0,
      explanation: "Photosynthesis supplies glucose and oxygen for respiration; respiration supplies carbon dioxide and water for photosynthesis.",
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
      question: "A group of cells keeps dividing when new cells are not needed and forms a mass. What is the best inference?",
      options: [
        "Control of cell division has failed and a tumour may form",
        "The cells are replacing damaged cells according to the needs of the tissue",
        "The cells are only enlarging without an increase in cell number",
        "The cells are dividing in a controlled way for normal growth",
      ],
      answerIndex: 0,
      explanation: "Continued uncontrolled division can form a mass of cells or tumour and is associated with cancer formation.",
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
      question: "A cell still has an intact cell wall but can no longer control the movement of substances into and out of it. Which structure is most likely damaged, and why?",
      options: [
        "Cell membrane, because it controls the movement of substances into and out of the cell",
        "Cell wall, because it controls all substances passing through it",
        "Nucleus, because it provides the passage for substances at the cell surface",
        "Chloroplast, because it filters substances entering the cell",
      ],
      answerIndex: 0,
      explanation: "The cell membrane controls the movement of substances into and out of the cell. The cell wall provides support and a fixed shape but does not replace the function of the cell membrane.",
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
      question: "Cell X has long fibres for carrying impulses, while cell Y has a long projection that increases its surface area for absorption in soil. What are X and Y?",
      options: [
        "X nerve cell; Y root hair cell",
        "X red blood cell; Y guard cell",
        "X palisade cell; Y epithelial cell",
        "X muscle cell; Y reproductive cell",
      ],
      answerIndex: 0,
      explanation: "Long fibres let a nerve cell carry impulses, while root hair cells increase absorption surface area.",
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
      question: "After a starch test on a variegated leaf, only the originally green areas turn dark blue. What is the best conclusion?",
      options: [
        "Chlorophyll is required for photosynthesis",
        "The non-green areas contain more starch",
        "A dark blue colour indicates the absence of starch",
        "All parts of the leaf produce starch without chlorophyll",
      ],
      answerIndex: 0,
      explanation: "Green areas contain chlorophyll and show starch, supporting the need for chlorophyll in photosynthesis.",
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
      question: "Two destarched plants are placed in bell jars A and B with the same light conditions and water supply. Potassium hydroxide, which absorbs carbon dioxide, is placed only in A. After several hours, leaf A stays brown in the iodine test, while leaf B turns dark blue. What can be inferred?",
      options: [
        "Carbon dioxide is required for photosynthesis",
        "Water alone is sufficient to produce starch",
        "The presence of carbon dioxide prevents starch formation",
        "Light and chlorophyll are sufficient for photosynthesis without carbon dioxide",
      ],
      answerIndex: 0,
      explanation: "Potassium hydroxide absorbs carbon dioxide in bell jar A. With the same light conditions and water supply, the different starch-test results support the conclusion that carbon dioxide is required for photosynthesis.",
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
      question: "Process P occurs in mitochondria at all times. Process Q occurs in chloroplasts when light is present. Which statement is correct?",
      options: [
        "P breaks down glucose; Q synthesises glucose",
        "P synthesises glucose; Q breaks down glucose",
        "Both P and Q break down glucose",
        "Both P and Q synthesise glucose",
      ],
      answerIndex: 0,
      explanation: "P is cell respiration, which breaks down glucose; Q is photosynthesis, which synthesises glucose.",
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
      question: "A grasshopper eats the leaves of a green plant. How does photosynthesis in the plant contribute to the grasshopper's energy supply?",
      options: [
        "Food produced by photosynthesis supplies glucose for cell respiration in the grasshopper",
        "Chlorophyll from the leaves allows all the grasshopper's cells to carry out photosynthesis",
        "Carbon dioxide from photosynthesis replaces the grasshopper's need for food",
        "Light energy passes directly from the leaves to the grasshopper's muscles without cell respiration",
      ],
      answerIndex: 0,
      explanation: "Plants produce glucose through photosynthesis. When a grasshopper eats plant material, digestion supplies glucose that is used in cell respiration to release energy.",
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
      question: "The number of green plants in an area decreases greatly while organisms continue to respire. If other factors remain unchanged, how does this affect gas exchange between the two processes?",
      options: [
        "Less carbon dioxide is used and less oxygen is supplied by photosynthesis",
        "More carbon dioxide is used and more oxygen is supplied by photosynthesis",
        "Less carbon dioxide is used but more oxygen is supplied by photosynthesis",
        "More carbon dioxide is used but less oxygen is supplied by photosynthesis",
      ],
      answerIndex: 0,
      explanation: "Photosynthesis uses carbon dioxide and releases oxygen, while cell respiration uses oxygen and releases carbon dioxide. Fewer green plants reduce the contribution of photosynthesis to this gas exchange.",
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
