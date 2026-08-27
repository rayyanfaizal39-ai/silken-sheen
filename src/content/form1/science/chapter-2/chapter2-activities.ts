import type { BilingualText, Chapter2Lang, Chapter2Sp } from "./chapter2-canonical";
import { localize } from "./chapter2-canonical";

export interface Chapter2PracticalArea {
  id: "cell-slide-preparation" | "photosynthesis-investigation-hub";
  standard: Extract<Chapter2Sp, "2.1.2" | "2.2.2">;
  title: BilingualText;
  purpose: BilingualText;
  practicalNotice: BilingualText;
  steps?: BilingualText[];
  evidence?: BilingualText;
  investigations?: Array<{
    id: "starch" | "light" | "chlorophyll" | "carbon-dioxide" | "water";
    title: BilingualText;
    question: BilingualText;
    setup: BilingualText;
    variables: BilingualText;
    observeInfer: BilingualText;
    safety?: BilingualText;
    visualSteps?: BilingualText[];
  }>;
}

export interface LocalizedChapter2PracticalArea {
  id: Chapter2PracticalArea["id"];
  standard: Chapter2PracticalArea["standard"];
  title: string;
  purpose: string;
  practicalNotice: string;
  steps?: string[];
  evidence?: string;
  investigations?: Array<{
    id: NonNullable<Chapter2PracticalArea["investigations"]>[number]["id"];
    title: string;
    question: string;
    setup: string;
    variables: string;
    observeInfer: string;
    safety?: string;
    visualSteps?: string[];
  }>;
}

const practicalNotice: BilingualText = {
  en: "Teacher/lab-guided physical practical. A digital sequence, prediction or check prepares and reinforces learning but does not prove practical completion.",
  bm: "Amali fizikal dengan bimbingan guru/makmal. Urutan, ramalan atau semakan digital menyediakan dan mengukuhkan pembelajaran tetapi tidak membuktikan amali telah diselesaikan.",
};

export const chapter2PracticalAreas: Chapter2PracticalArea[] = [
  {
    id: "cell-slide-preparation",
    standard: "2.1.2",
    title: {
      en: "Prepare and observe animal and plant cell slides",
      bm: "Sediakan dan perhatikan slaid sel haiwan dan sel tumbuhan",
    },
    purpose: {
      en: "Prepare cheek-cell and onion-epidermis slides correctly, observe them under a light microscope, then draw and label the cells seen.",
      bm: "Sediakan slaid sel pipi dan epidermis bawang mengikut prosedur yang betul, perhatikan di bawah mikroskop cahaya, kemudian lukis dan labelkan sel yang dilihat.",
    },
    practicalNotice,
    steps: [
      {
        en: "Follow the teacher's instructions to place the specimen on a clean glass slide: a cheek scraping in distilled water or a thin onion epidermis.",
        bm: "Ikut arahan guru untuk meletakkan spesimen pada slaid kaca bersih: kikisan pipi dalam air suling atau lapisan nipis epidermis bawang.",
      },
      {
        en: "Add methylene blue to cheek cells or iodine solution to onion epidermis. Lower the cover slip slowly with a mounting needle so air bubbles are not trapped.",
        bm: "Titiskan larutan metilena biru pada sel pipi atau larutan iodin pada epidermis bawang. Turunkan penutup kaca perlahan-lahan dengan jarum tenggek supaya gelembung udara tidak terperangkap.",
      },
      {
        en: "Remove excess stain with filter paper. Observe first with the low-power objective, then the high-power objective as directed by the teacher.",
        bm: "Serap pewarna berlebihan dengan kertas turas. Perhatikan dahulu dengan kanta objek kuasa rendah, kemudian kanta objek kuasa tinggi mengikut arahan guru.",
      },
      {
        en: "Draw and label the observed cells in the practical book, then compare their visible structures.",
        bm: "Lukis dan labelkan sel yang diperhatikan dalam buku amali, kemudian bandingkan struktur yang dapat dilihat.",
      },
    ],
    evidence: {
      en: "Teacher-observed slide preparation plus labelled drawings of the cheek cell and onion cell.",
      bm: "Penyediaan slaid yang diperhatikan guru serta lukisan berlabel sel pipi dan sel bawang.",
    },
  },
  {
    id: "photosynthesis-investigation-hub",
    standard: "2.2.2",
    title: { en: "Photosynthesis Investigation Hub", bm: "Hab Penyiasatan Fotosintesis" },
    purpose: {
      en: "Plan, conduct and interpret the starch test and investigations of the four requirements for photosynthesis.",
      bm: "Rancang, jalankan dan tafsir ujian kanji serta penyiasatan empat keperluan fotosintesis.",
    },
    practicalNotice,
    investigations: [
      {
        id: "starch",
        title: { en: "Starch test", bm: "Ujian kanji" },
        question: { en: "Is starch present in the leaf?", bm: "Adakah kanji hadir dalam daun?" },
        setup: {
          en: "Boil the leaf in water, heat it in ethanol using a hot-water bath, soften it again in hot water, place it on a white tile and add iodine solution.",
          bm: "Didihkan daun di dalam air, panaskan daun dalam etanol menggunakan rendaman air panas, lembutkan semula dalam air panas, letakkan di atas jubin putih dan titiskan larutan iodin.",
        },
        variables: {
          en: "This is the common evidence test used after each requirements investigation.",
          bm: "Ini ialah ujian bukti yang digunakan selepas setiap penyiasatan keperluan fotosintesis.",
        },
        observeInfer: {
          en: "Brown to dark blue: starch is present, so photosynthesis occurred in that part of the leaf.",
          bm: "Perang kepada biru tua: kanji hadir, maka fotosintesis berlaku pada bahagian daun itu.",
        },
        safety: {
          en: "Ethanol is highly flammable: never heat it directly. Handle iodine solution and hot water carefully under teacher supervision.",
          bm: "Etanol sangat mudah terbakar: jangan panaskan secara terus. Kendalikan larutan iodin dan air panas dengan berhati-hati di bawah pengawasan guru.",
        },
        visualSteps: [
          { en: "Boil the leaf in water", bm: "Didihkan daun di dalam air" },
          {
            en: "Heat it in ethanol using a hot-water bath",
            bm: "Panaskan dalam etanol menggunakan rendaman air panas",
          },
          { en: "Soften it again in hot water", bm: "Lembutkan semula dalam air panas" },
          { en: "Place it on a white tile", bm: "Letakkan di atas jubin putih" },
          {
            en: "Add iodine solution and observe the colour",
            bm: "Titiskan larutan iodin dan perhatikan warna",
          },
        ],
      },
      {
        id: "light",
        title: { en: "Light", bm: "Cahaya" },
        question: {
          en: "Is light energy required for photosynthesis?",
          bm: "Adakah tenaga cahaya diperlukan untuk fotosintesis?",
        },
        setup: {
          en: "Destarch two similar plants in darkness, then place one in sunlight and keep the other in darkness before testing leaves for starch.",
          bm: "Nyahkan kanji dua tumbuhan yang sama jenis dalam gelap, kemudian letakkan satu di bawah cahaya matahari dan kekalkan satu lagi dalam gelap sebelum menguji daun untuk kanji.",
        },
        variables: {
          en: "Manipulated: presence of light. Responding: iodine colour change. Constant: plant type.",
          bm: "Dimanipulasikan: kehadiran cahaya. Bergerak balas: perubahan warna iodin. Dimalarkan: jenis tumbuhan.",
        },
        observeInfer: {
          en: "A leaf exposed to light turns dark blue; a leaf kept in darkness stays brown. Light is required.",
          bm: "Daun yang terdedah kepada cahaya bertukar biru tua; daun dalam gelap kekal perang. Cahaya diperlukan.",
        },
      },
      {
        id: "chlorophyll",
        title: { en: "Chlorophyll", bm: "Klorofil" },
        question: {
          en: "Is chlorophyll required for photosynthesis?",
          bm: "Adakah klorofil diperlukan untuk fotosintesis?",
        },
        setup: {
          en: "Map the green and non-green areas of a variegated leaf exposed to sunlight, then carry out the starch test.",
          bm: "Petakan bahagian hijau dan bukan hijau pada daun bervariegasi yang terdedah kepada cahaya matahari, kemudian jalankan ujian kanji.",
        },
        variables: {
          en: "Manipulated: presence of chlorophyll. Responding: iodine colour change. Constant: leaf/plant type.",
          bm: "Dimanipulasikan: kehadiran klorofil. Bergerak balas: perubahan warna iodin. Dimalarkan: jenis daun/tumbuhan.",
        },
        observeInfer: {
          en: "Green areas turn dark blue while non-green areas stay brown. Chlorophyll is required.",
          bm: "Bahagian hijau bertukar biru tua manakala bahagian bukan hijau kekal perang. Klorofil diperlukan.",
        },
      },
      {
        id: "carbon-dioxide",
        title: { en: "Carbon dioxide", bm: "Karbon dioksida" },
        question: {
          en: "Is carbon dioxide required for photosynthesis?",
          bm: "Adakah karbon dioksida diperlukan untuk fotosintesis?",
        },
        setup: {
          en: "Place two destarched similar plants under sealed bell jars in sunlight. Put potassium hydroxide in one jar to absorb carbon dioxide, then test leaves for starch.",
          bm: "Letakkan dua tumbuhan sama jenis yang telah dinyahkan kanji di bawah serkup kaca tertutup dalam cahaya matahari. Letakkan kalium hidroksida dalam satu serkup untuk menyerap karbon dioksida, kemudian uji daun untuk kanji.",
        },
        variables: {
          en: "Manipulated: presence of carbon dioxide. Responding: iodine colour change. Constant: plant type.",
          bm: "Dimanipulasikan: kehadiran karbon dioksida. Bergerak balas: perubahan warna iodin. Dimalarkan: jenis tumbuhan.",
        },
        observeInfer: {
          en: "The leaf with carbon dioxide turns dark blue; the leaf without it stays brown. Carbon dioxide is required.",
          bm: "Daun yang menerima karbon dioksida bertukar biru tua; daun tanpa karbon dioksida kekal perang. Karbon dioksida diperlukan.",
        },
        safety: {
          en: "Potassium hydroxide is handled only under teacher/lab supervision.",
          bm: "Kalium hidroksida dikendalikan hanya di bawah pengawasan guru/makmal.",
        },
      },
      {
        id: "water",
        title: { en: "Water", bm: "Air" },
        question: {
          en: "Is water required for photosynthesis?",
          bm: "Adakah air diperlukan untuk fotosintesis?",
        },
        setup: {
          en: "Destarch two similar plants, place both in sunlight, water one daily and leave the other unwatered, then test one leaf from each plant for starch.",
          bm: "Nyahkan kanji dua tumbuhan yang sama jenis, letakkan kedua-duanya di bawah cahaya matahari, siram satu tumbuhan setiap hari dan biarkan satu lagi tanpa air, kemudian uji satu daun daripada setiap tumbuhan untuk kanji.",
        },
        variables: {
          en: "Manipulated: presence of water. Responding: iodine colour change. Constant: plant type.",
          bm: "Dimanipulasikan: kehadiran air. Bergerak balas: perubahan warna iodin. Dimalarkan: jenis tumbuhan.",
        },
        observeInfer: {
          en: "The watered plant's leaf turns dark blue; the unwatered plant's leaf stays brown. Water is required.",
          bm: "Daun tumbuhan yang disiram bertukar biru tua; daun tumbuhan tanpa air kekal perang. Air diperlukan.",
        },
      },
    ],
  },
];

export function localizeChapter2PracticalAreas(
  lang: Chapter2Lang,
): LocalizedChapter2PracticalArea[] {
  return chapter2PracticalAreas.map((area) => ({
    id: area.id,
    standard: area.standard,
    title: localize(area.title, lang),
    purpose: localize(area.purpose, lang),
    practicalNotice: localize(area.practicalNotice, lang),
    steps: area.steps?.map((step) => localize(step, lang)),
    evidence: area.evidence ? localize(area.evidence, lang) : undefined,
    investigations: area.investigations?.map((investigation) => ({
      id: investigation.id,
      title: localize(investigation.title, lang),
      question: localize(investigation.question, lang),
      setup: localize(investigation.setup, lang),
      variables: localize(investigation.variables, lang),
      observeInfer: localize(investigation.observeInfer, lang),
      safety: investigation.safety ? localize(investigation.safety, lang) : undefined,
      visualSteps: investigation.visualSteps?.map((step) => localize(step, lang)),
    })),
  }));
}
