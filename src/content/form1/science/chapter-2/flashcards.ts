import type { Flashcard } from "@/data/types";
import type { Chapter2Sp } from "./chapter2-canonical";

interface FlashcardPair {
  sp: Exclude<Chapter2Sp, "2.1.7">;
  bm: [string, string];
  dlp: [string, string];
}

export type Chapter2Flashcard = Flashcard & { sp: FlashcardPair["sp"]; semanticId: string };

const pairs: FlashcardPair[] = [
  {
    sp: "2.1.1",
    bm: ["Apakah sel?", "Sel ialah unit struktur dan fungsi asas benda hidup."],
    dlp: [
      "What is a cell?",
      "A cell is the basic structural and functional unit of living things.",
    ],
  },
  {
    sp: "2.1.1",
    bm: [
      "Apakah empat fungsi hidup yang dijalankan oleh sel?",
      "Pertumbuhan, respirasi, pembiakan dan perkumuhan.",
    ],
    dlp: [
      "What four life functions are carried out by cells?",
      "Growth, respiration, reproduction and excretion.",
    ],
  },
  {
    sp: "2.1.1",
    bm: [
      "Mengapakah sel membahagi?",
      "Untuk membentuk sel baharu dan menggantikan sel yang tua atau rosak.",
    ],
    dlp: ["Why do cells divide?", "To form new cells and replace old or damaged cells."],
  },
  {
    sp: "2.1.1",
    bm: [
      "Apakah yang berlaku dalam pembahagian sel asas?",
      "Satu sel membahagi menjadi dua sel dan proses ini berterusan.",
    ],
    dlp: [
      "What happens in basic cell division?",
      "One cell divides into two cells and the process continues.",
    ],
  },
  {
    sp: "2.1.1",
    bm: [
      "Bagaimanakah kanser terbentuk?",
      "Kanser terbentuk apabila sel normal terus membahagi tanpa kawalan; suatu tumor boleh terbentuk.",
    ],
    dlp: [
      "How does cancer form?",
      "Cancer forms when normal cells continue dividing without control; a tumour may form.",
    ],
  },

  {
    sp: "2.1.2",
    bm: [
      "Apakah spesimen dan pewarna bagi slaid sel haiwan?",
      "Kikisan sel pipi diwarnai dengan larutan metilena biru.",
    ],
    dlp: [
      "What specimen and stain are used for the animal-cell slide?",
      "A cheek-cell scraping is stained with methylene blue solution.",
    ],
  },
  {
    sp: "2.1.2",
    bm: [
      "Apakah spesimen dan pewarna bagi slaid sel tumbuhan?",
      "Epidermis bawang diwarnai dengan larutan iodin.",
    ],
    dlp: [
      "What specimen and stain are used for the plant-cell slide?",
      "Onion epidermis is stained with iodine solution.",
    ],
  },
  {
    sp: "2.1.2",
    bm: [
      "Apakah langkah penting selepas meletakkan spesimen pada slaid?",
      "Turunkan penutup kaca perlahan-lahan tanpa gelembung, serap pewarna berlebihan, perhati dengan kuasa rendah kemudian tinggi, serta lukis dan label sel.",
    ],
    dlp: [
      "What key steps follow placing the specimen on a slide?",
      "Lower the cover slip slowly without bubbles, remove excess stain, observe at low then high power, and draw and label the cells.",
    ],
  },

  {
    sp: "2.1.3",
    bm: ["Apakah fungsi membran sel?", "Mengawal pergerakan bahan ke dalam dan ke luar sel."],
    dlp: [
      "What is the function of the cell membrane?",
      "It controls the movement of substances into and out of the cell.",
    ],
  },
  {
    sp: "2.1.3",
    bm: ["Apakah fungsi sitoplasma?", "Bertindak sebagai medium tindak balas kimia berlaku."],
    dlp: [
      "What is the function of cytoplasm?",
      "It acts as the medium where chemical reactions occur.",
    ],
  },
  {
    sp: "2.1.3",
    bm: [
      "Apakah fungsi nukleus?",
      "Mengawal keseluruhan aktiviti sel dan mengandungi kromosom yang terdiri daripada DNA.",
    ],
    dlp: [
      "What is the function of the nucleus?",
      "It controls all cell activities and contains chromosomes made of DNA.",
    ],
  },
  {
    sp: "2.1.3",
    bm: ["Apakah fungsi mitokondria?", "Menghasilkan tenaga untuk tindak balas."],
    dlp: ["What is the function of mitochondria?", "They produce energy for reactions."],
  },
  {
    sp: "2.1.3",
    bm: [
      "Apakah fungsi dinding sel?",
      "Memberikan sokongan, perlindungan dan bentuk yang tetap kepada sel tumbuhan.",
    ],
    dlp: [
      "What is the function of the cell wall?",
      "It provides support, protection and a fixed shape to a plant cell.",
    ],
  },
  {
    sp: "2.1.3",
    bm: ["Apakah fungsi kloroplas?", "Menyerap tenaga cahaya untuk proses fotosintesis."],
    dlp: ["What is the function of a chloroplast?", "It absorbs light energy for photosynthesis."],
  },
  {
    sp: "2.1.3",
    bm: [
      "Apakah fungsi vakuol tumbuhan?",
      "Memberikan sokongan kepada sel apabila dipenuhi sap sel.",
    ],
    dlp: [
      "What is the function of a plant vacuole?",
      "It supports the cell when filled with cell sap.",
    ],
  },
  {
    sp: "2.1.3",
    bm: [
      "Apakah struktur yang dikongsi sel haiwan dan sel tumbuhan?",
      "Nukleus, membran sel, sitoplasma dan mitokondria.",
    ],
    dlp: [
      "Which structures are shared by animal and plant cells?",
      "Nucleus, cell membrane, cytoplasm and mitochondria.",
    ],
  },
  {
    sp: "2.1.3",
    bm: ["Apakah ciri tambahan sel tumbuhan?", "Dinding sel, kloroplas, vakuol dan bentuk tetap."],
    dlp: [
      "What additional features does a plant cell have?",
      "A cell wall, chloroplasts, a vacuole and a fixed shape.",
    ],
  },
  {
    sp: "2.1.3",
    bm: [
      "Mengapakah sel haiwan berbentuk tidak tetap?",
      "Sel haiwan tidak mempunyai dinding sel yang memberikan bentuk tetap.",
    ],
    dlp: [
      "Why does an animal cell have no fixed shape?",
      "It has no cell wall to provide a fixed shape.",
    ],
  },
  {
    sp: "2.1.3",
    bm: ["Apakah maklumat yang dibawa oleh DNA dalam nukleus?", "Maklumat genetik."],
    dlp: ["What information is carried by DNA in the nucleus?", "Genetic information."],
  },
  {
    sp: "2.1.3",
    bm: [
      "Adakah sel tumbuhan mempunyai membran sel?",
      "Ya. Membran sel berada di sebelah dalam dinding sel dan mengawal pergerakan bahan.",
    ],
    dlp: [
      "Does a plant cell have a cell membrane?",
      "Yes. It lies inside the cell wall and controls substance movement.",
    ],
  },

  {
    sp: "2.1.4",
    bm: [
      "Apakah organisma unisel?",
      "Organisma yang terdiri daripada satu sel sahaja dan sel itu menjalankan semua proses hidup.",
    ],
    dlp: [
      "What is a unicellular organism?",
      "An organism made of one cell that carries out all life processes.",
    ],
  },
  {
    sp: "2.1.4",
    bm: ["Apakah organisma multisel?", "Organisma yang terdiri daripada lebih daripada satu sel."],
    dlp: ["What is a multicellular organism?", "An organism made of more than one cell."],
  },
  {
    sp: "2.1.4",
    bm: ["Berikan contoh organisma unisel dalam alam haiwan.", "Amoeba dan Paramecium."],
    dlp: [
      "Give examples of unicellular organisms in the animal kingdom.",
      "Amoeba and Paramecium.",
    ],
  },
  {
    sp: "2.1.4",
    bm: ["Berikan contoh organisma unisel dalam alam tumbuhan.", "Chlamydomonas."],
    dlp: ["Give an example of a unicellular organism in the plant kingdom.", "Chlamydomonas."],
  },
  {
    sp: "2.1.4",
    bm: [
      "Apakah yang istimewa tentang Euglena?",
      "Euglena mempunyai ciri tumbuhan dan haiwan: membuat makanan dengan cahaya dan bergerak seperti haiwan.",
    ],
    dlp: [
      "What is distinctive about Euglena?",
      "It has plant and animal characteristics: it makes food using light and moves like an animal.",
    ],
  },
  {
    sp: "2.1.4",
    bm: ["Berikan tiga contoh organisma multisel dalam buku teks.", "Mucor, Spirogyra dan Hydra."],
    dlp: [
      "Give three textbook examples of multicellular organisms.",
      "Mucor, Spirogyra and Hydra.",
    ],
  },

  {
    sp: "2.1.5",
    bm: [
      "Bagaimanakah sel saraf sesuai dengan fungsinya?",
      "Gentian panjangnya membawa maklumat dalam bentuk impuls ke seluruh badan.",
    ],
    dlp: [
      "How is a nerve cell suited to its function?",
      "Its long fibres carry information as impulses throughout the body.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Bagaimanakah sel darah merah sesuai untuk mengangkut oksigen?",
      "Tiada nukleus, berbentuk cakera dwicekung dan mengandungi hemoglobin.",
    ],
    dlp: [
      "How is a red blood cell suited to oxygen transport?",
      "It has no nucleus, is a biconcave disc and contains haemoglobin.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Apakah fungsi sel darah putih?",
      "Berubah bentuk untuk mengelilingi dan memusnahkan partikel asing.",
    ],
    dlp: [
      "What is the function of a white blood cell?",
      "It changes shape to surround and destroy foreign particles.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Bandingkan fungsi sel otot dengan sel epitelium.",
      "Sel otot mengecut dan mengendur untuk pergerakan; sel epitelium melindungi organ dan merembeskan mukus.",
    ],
    dlp: [
      "Compare the functions of muscle and epithelial cells.",
      "Muscle cells contract and relax for movement; epithelial cells protect organs and secrete mucus.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Apakah fungsi sel pembiakan?",
      "Sperma membawa bahan genetik lelaki dan ovum membawa bahan genetik perempuan.",
    ],
    dlp: [
      "What is the function of reproductive cells?",
      "Sperm carries male genetic material and the ovum carries female genetic material.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Apakah fungsi sel palisad?",
      "Mengandungi klorofil untuk menyerap cahaya dan menjalankan fotosintesis.",
    ],
    dlp: [
      "What is the function of a palisade cell?",
      "It contains chlorophyll to absorb light and carry out photosynthesis.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Bandingkan sel pengawal dengan sel epidermis.",
      "Sel pengawal mengawal buka tutup stoma; sel epidermis mengurangkan kehilangan air dan membantu pertukaran gas serta penyerapan.",
    ],
    dlp: [
      "Compare guard and epidermal cells.",
      "Guard cells control stomatal opening; epidermal cells reduce water loss and support gas exchange and absorption.",
    ],
  },
  {
    sp: "2.1.5",
    bm: [
      "Apakah penyesuaian sel rerambut akar?",
      "Bilangan dan bentuknya meningkatkan luas permukaan untuk menyerap lebih banyak air dan nutrien.",
    ],
    dlp: [
      "How is a root hair cell adapted?",
      "Its number and shape increase surface area to absorb more water and nutrients.",
    ],
  },

  {
    sp: "2.1.6",
    bm: ["Apakah urutan tahap organisasi?", "Sel → tisu → organ → sistem → organisma."],
    dlp: ["What is the order of organisation?", "Cell → tissue → organ → system → organism."],
  },
  {
    sp: "2.1.6",
    bm: [
      "Bagaimanakah tisu, organ dan sistem terbentuk?",
      "Sel sama fungsi membentuk tisu; tisu berlainan membentuk organ; organ berkaitan membentuk sistem.",
    ],
    dlp: [
      "How are tissues, organs and systems formed?",
      "Cells with the same function form tissue; different tissues form an organ; related organs form a system.",
    ],
  },
  {
    sp: "2.1.6",
    bm: [
      "Berikan laluan organisasi contoh dalam haiwan.",
      "Sel epitelium → tisu epitelium → perut → sistem pencernaan → haiwan.",
    ],
    dlp: [
      "Give an example organisation pathway in an animal.",
      "Epithelial cell → epithelial tissue → stomach → digestive system → animal.",
    ],
  },
  {
    sp: "2.1.6",
    bm: [
      "Berikan laluan organisasi contoh dalam tumbuhan.",
      "Sel epidermis → tisu epidermis → daun → sistem pengangkutan → tumbuhan.",
    ],
    dlp: [
      "Give an example organisation pathway in a plant.",
      "Epidermal cell → epidermal tissue → leaf → transport system → plant.",
    ],
  },
  {
    sp: "2.1.6",
    bm: [
      "Apakah sebelas sistem badan manusia dalam DSKP?",
      "Saraf, pencernaan, rangka, perkumuhan, respirasi, pembiakan, limfa, peredaran darah, otot, endokrin dan integumen.",
    ],
    dlp: [
      "What eleven human body systems are listed in the DSKP?",
      "Nervous, digestive, skeletal, excretory, respiratory, reproductive, lymphatic, blood circulatory, muscular, endocrine and integumentary.",
    ],
  },
  {
    sp: "2.1.6",
    bm: [
      "Mengapakah sistem badan perlu berkoordinasi?",
      "Supaya semua fungsi khusus bekerjasama dan organisma dapat berfungsi dengan baik.",
    ],
    dlp: [
      "Why must body systems coordinate?",
      "So their specialised functions work together and the organism functions well.",
    ],
  },

  {
    sp: "2.2.1",
    bm: [
      "Apakah respirasi sel?",
      "Pengoksidaan dan penguraian glukosa dalam sel hidup untuk membebaskan tenaga.",
    ],
    dlp: [
      "What is cell respiration?",
      "The oxidation and breakdown of glucose in living cells to release energy.",
    ],
  },
  {
    sp: "2.2.1",
    bm: [
      "Apakah persamaan perkataan respirasi sel?",
      "Glukosa + oksigen → karbon dioksida + air + tenaga.",
    ],
    dlp: [
      "What is the word equation for cell respiration?",
      "Glucose + oxygen → carbon dioxide + water + energy.",
    ],
  },
  {
    sp: "2.2.1",
    bm: ["Apakah bahan yang diperlukan untuk respirasi sel?", "Glukosa dan oksigen."],
    dlp: ["Which materials are required for cell respiration?", "Glucose and oxygen."],
  },
  {
    sp: "2.2.1",
    bm: ["Untuk apakah tenaga respirasi sel digunakan?", "Untuk semua proses hidup dalam badan."],
    dlp: [
      "What is the energy from cell respiration used for?",
      "For all life processes in the body.",
    ],
  },

  {
    sp: "2.2.2",
    bm: [
      "Apakah fotosintesis dan persamaan perkataannya?",
      "Tumbuhan hijau mensintesis glukosa: karbon dioksida + air → glukosa + oksigen, dengan tenaga cahaya dan klorofil.",
    ],
    dlp: [
      "What is photosynthesis and its word equation?",
      "Green plants synthesise glucose: carbon dioxide + water → glucose + oxygen, with light energy and chlorophyll.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Apakah empat keperluan fotosintesis?",
      "Tenaga cahaya, karbon dioksida, air dan klorofil.",
    ],
    dlp: [
      "What are the four requirements for photosynthesis?",
      "Light energy, carbon dioxide, water and chlorophyll.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Bagaimanakah tumbuhan menyimpan glukosa dan apakah buktinya?",
      "Glukosa disimpan sebagai kanji; kehadiran kanji dalam daun menunjukkan fotosintesis berlaku.",
    ],
    dlp: [
      "How do plants store glucose, and what does this show?",
      "Glucose is stored as starch; starch in a leaf shows photosynthesis occurred.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Ringkaskan ujian kanji pada daun.",
      "Didihkan daun, singkirkan klorofil dalam etanol melalui rendaman air panas, lembutkan, kemudian titiskan larutan iodin; biru tua menunjukkan kanji.",
    ],
    dlp: [
      "Summarise the leaf starch test.",
      "Boil the leaf, remove chlorophyll in ethanol using a hot-water bath, soften it, then add iodine solution; dark blue shows starch.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Bagaimanakah cahaya diuji sebagai keperluan fotosintesis?",
      "Bandingkan daun tumbuhan dinyah kanji yang menerima cahaya dengan yang berada dalam gelap menggunakan ujian kanji.",
    ],
    dlp: [
      "How is light tested as a photosynthesis requirement?",
      "Use the starch test to compare leaves from destarched plants exposed to light and kept in darkness.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Bagaimanakah klorofil diuji sebagai keperluan fotosintesis?",
      "Uji bahagian hijau dan bukan hijau daun bervariegasi; hanya bahagian berklorofil membentuk kanji.",
    ],
    dlp: [
      "How is chlorophyll tested as a photosynthesis requirement?",
      "Test green and non-green parts of a variegated leaf; only chlorophyll-containing parts form starch.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Bagaimanakah karbon dioksida diuji sebagai keperluan fotosintesis?",
      "Bandingkan tumbuhan dalam serkup dengan dan tanpa karbon dioksida; kalium hidroksida menyerap karbon dioksida.",
    ],
    dlp: [
      "How is carbon dioxide tested as a photosynthesis requirement?",
      "Compare plants in bell jars with and without carbon dioxide; potassium hydroxide absorbs carbon dioxide.",
    ],
  },
  {
    sp: "2.2.2",
    bm: [
      "Bagaimanakah air diuji sebagai keperluan fotosintesis?",
      "Bandingkan tumbuhan dinyah kanji yang disiram setiap hari dengan tumbuhan yang tidak disiram, kemudian jalankan ujian kanji.",
    ],
    dlp: [
      "How is water tested as a photosynthesis requirement?",
      "Compare destarched plants that are watered daily and left unwatered, then carry out the starch test.",
    ],
  },

  {
    sp: "2.2.3",
    bm: [
      "Di manakah respirasi sel dan fotosintesis berlaku?",
      "Respirasi sel dalam mitokondria; fotosintesis dalam kloroplas.",
    ],
    dlp: [
      "Where do cell respiration and photosynthesis occur?",
      "Cell respiration in mitochondria; photosynthesis in chloroplasts.",
    ],
  },
  {
    sp: "2.2.3",
    bm: [
      "Bandingkan perubahan tenaga kedua-dua proses.",
      "Respirasi sel membebaskan tenaga; fotosintesis menyerap tenaga cahaya.",
    ],
    dlp: [
      "Compare the energy changes in the two processes.",
      "Cell respiration releases energy; photosynthesis absorbs light energy.",
    ],
  },
  {
    sp: "2.2.3",
    bm: [
      "Bandingkan masa dan organisma bagi kedua-dua proses.",
      "Respirasi sentiasa berlaku pada manusia, haiwan, tumbuhan dan mikroorganisma; fotosintesis berlaku ketika ada cahaya pada tumbuhan dan mikroorganisma.",
    ],
    dlp: [
      "Compare when and where the two processes occur.",
      "Respiration occurs at all times in humans, animals, plants and microorganisms; photosynthesis occurs in light in plants and microorganisms.",
    ],
  },
  {
    sp: "2.2.3",
    bm: [
      "Bandingkan bahan dan hasil kedua-dua proses.",
      "Respirasi: glukosa + oksigen → karbon dioksida + air + tenaga. Fotosintesis: karbon dioksida + air → glukosa + oksigen.",
    ],
    dlp: [
      "Compare the materials and products of the two processes.",
      "Respiration: glucose + oxygen → carbon dioxide + water + energy. Photosynthesis: carbon dioxide + water → glucose + oxygen.",
    ],
  },

  {
    sp: "2.2.4",
    bm: ["Apakah yang dibekalkan fotosintesis kepada respirasi sel?", "Glukosa dan oksigen."],
    dlp: ["What does photosynthesis supply to cell respiration?", "Glucose and oxygen."],
  },
  {
    sp: "2.2.4",
    bm: ["Apakah yang dibekalkan respirasi sel kepada fotosintesis?", "Karbon dioksida dan air."],
    dlp: ["What does cell respiration supply to photosynthesis?", "Carbon dioxide and water."],
  },
  {
    sp: "2.2.4",
    bm: [
      "Apakah maksud respirasi dan fotosintesis saling melengkapi?",
      "Hasil setiap proses menjadi bahan yang digunakan oleh proses yang satu lagi.",
    ],
    dlp: [
      "What does it mean that respiration and photosynthesis complement each other?",
      "The products of each process become materials used by the other process.",
    ],
  },
  {
    sp: "2.2.4",
    bm: [
      "Mengapakah hubungan saling melengkapi ini penting?",
      "Tumbuhan membekalkan glukosa dan oksigen, manakala organisma membekalkan semula karbon dioksida dan air untuk menyokong proses hidup.",
    ],
    dlp: [
      "Why is this complementary relationship important?",
      "Plants supply glucose and oxygen, while organisms return carbon dioxide and water to support life processes.",
    ],
  },
];

function build(lang: "bm" | "dlp"): Chapter2Flashcard[] {
  return pairs.map((pair, index) => ({
    id: `sci-f1-c2-${lang}-f${index + 1}`,
    semanticId: `c2-f${index + 1}`,
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 2",
    lang,
    sp: pair.sp,
    front: pair[lang][0],
    back: pair[lang][1],
  }));
}

export const scienceF1C2FlashcardsBM = build("bm");
export const scienceF1C2FlashcardsDLP = build("dlp");
export const chapter2FlashcardBlueprint = pairs.map((pair, index) => ({
  semanticId: `c2-f${index + 1}`,
  sp: pair.sp,
}));
