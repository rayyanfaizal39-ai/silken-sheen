// chapter3-content.ts
// Source-verified content for Chapter 3 / Bab 3 — Coordination and Response / Koordinasi dan Gerak Balas
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 70-85)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 70-85, official KSSM counterpart)
// Pass 1 BM checked against T1 BT SN- SAINS.pdf, printed pp. 72-78 (PDF pp. 82-88).
// The cited official DLP file was not available locally for independent verification.
// New DLP experiment/diagram labels are semantic counterparts of that BM source and the user brief.
// Content data only — no presentation markup.

export interface CorrectiveMechanism {
  trigger: string;
  detectedBy: string;
  mechanism: string[];
  result: string;
}

export interface AnimalAdaptation {
  animal: string;
  icon: string;
  adaptation: string;
}

export interface StomaState {
  condition: string;
  stomaState: "open" | "closed";
  reason: string;
}

export interface Chapter3Practical {
  title: string;
  problem: string;
  hypothesis: string;
  purpose: string;
  variables: { manipulated: string; responding: string; fixed: string };
  apparatus: string;
  sequence: string[];
  conclusion: string;
}

export interface Chapter3Content {
  structure: {
    chapter: string;
    subtopic: string;
    meaning: string;
    control: string;
    water: string;
    temperature: string;
  };
  practicalNotice: string;
  sweatExperiment: Chapter3Practical & { conditions: string[] };
  hook: { title: string; body: string };
  definition: {
    meaning: string;
    etymology: string;
    importance: string;
  };
  controlProcessConcept: string;
  waterRegulation: {
    systemsInvolved: string;
    organsInvolved: string;
    increase: CorrectiveMechanism;
    decrease: CorrectiveMechanism;
  };
  temperatureRegulation: {
    systemsInvolved: string;
    organsInvolved: string;
    hotCondition: CorrectiveMechanism;
    coldCondition: CorrectiveMechanism;
    skinMechanisms: { condition: string; mechanisms: string[] }[];
  };
  pulseExperiment: Chapter3Practical & {
    activities: { id: "rest" | "walking" | "jogging"; label: string; durationMinutes?: number }[];
    countDurationMinutes: number;
  };
  animalHomeostasis: AnimalAdaptation[];
  plantHomeostasis: {
    transpirationDefinition: string;
    transpirationFunctions: string[];
    waterLossFact: string;
    stomaStates: StomaState[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Chapter3Content = {
  structure: {
    chapter: "Coordination and Response",
    subtopic: "3.1 Homeostasis in Living Things",
    meaning: "Definition of Homeostasis",
    control: "Homeostatic Control Process",
    water: "Regulation of Water Content",
    temperature: "Regulation of Body Temperature",
  },
  practicalNotice:
    "Teacher/lab-guided physical practical. Record your own observations and measured results.",
  sweatExperiment: {
    title: "Experiment 3.1",
    problem: "Do we sweat in a hot or cold condition?",
    hypothesis: "We sweat in a hot condition.",
    purpose: "To study biological actions that respond to changes in temperature",
    variables: {
      manipulated: "Surrounding temperature",
      responding: "Presence of sweat",
      fixed: "Time taken",
    },
    apparatus: "Stopwatch, one student from each group.",
    sequence: [
      "Enter the laboratory with the fans off for 10 minutes.",
      "Record whether you sweat or not.",
      "Then switch the fans on for 10 minutes.",
      "Record whether you sweat or not.",
    ],
    conditions: ["Hot (fans off)", "Cold (fans on)"],
    conclusion: "Is the hypothesis accepted? Give your reasons.",
  },
  hook: {
    title: "Why this matters",
    body: "Right now, your body is running dozens of automatic corrections — adjusting temperature, water levels, and more — without you ever noticing. This chapter shows you the actual feedback loops your body (and every living thing) uses to keep itself stable no matter what's happening outside.",
  },
  definition: {
    meaning:
      "Homeostasis refers to the maintenance of the internal environment in the body of an organism — such as temperature, water, pH and blood pressure — in a balanced and stable condition, so all living processes can work well.",
    etymology:
      "Homeostasis comes from two Greek words: 'homeo' meaning 'similar' and 'stasis' meaning 'stable'.",
    importance:
      "If internal conditions are not balanced — for example if temperature is too high — the cells of the organism may die.",
  },
  controlProcessConcept:
    "When an internal condition (like body temperature) increases, the control centre in the brain detects the change and triggers a corrective mechanism that brings it back down to the normal range. When the condition decreases, the opposite corrective mechanism brings it back up. This detect-and-correct loop is the core process behind every homeostasis example in this chapter.",
  waterRegulation: {
    systemsInvolved: "Excretory system and endocrine system",
    organsInvolved: "Kidneys and brain",
    increase: {
      trigger: "Water content in the body increases when we drink water",
      detectedBy: "Brain",
      mechanism: [
        "The brain stimulates a reduction in secretion of a hormone so the kidneys increase urine production",
        "Kidneys increase the production of urine",
        "More urine is produced",
      ],
      result: "Water content returns to normal",
    },
    decrease: {
      trigger: "Water content in the body decreases when we sweat",
      detectedBy: "Brain",
      mechanism: [
        "The brain stimulates secretion of a hormone so the kidneys reduce urine production",
        "Kidneys decrease the production of urine",
        "We feel thirsty",
      ],
      result: "Water content returns to normal",
    },
  },
  temperatureRegulation: {
    systemsInvolved: "Excretory system and endocrine system",
    organsInvolved: "Skin, brain and skeletal muscles",
    hotCondition: {
      trigger: "During a hot day, body temperature increases",
      detectedBy: "Brain",
      mechanism: [
        "Blood vessels dilate",
        "Hairs lie flat",
        "Sweating increases",
        "Skeletal muscle activity and certain hormone secretions reduce",
        "Less urine",
      ],
      result: "Body temperature decreases",
    },
    coldCondition: {
      trigger: "During a cold day, body temperature decreases",
      detectedBy: "Brain",
      mechanism: [
        "Blood vessels constrict",
        "Hairs stand erect",
        "Sweating decreases",
        "Skeletal muscles contract/relax rapidly, causing shivering",
        "Hormones increase body metabolism",
      ],
      result: "Body temperature increases",
    },
    skinMechanisms: [
      {
        condition: "Higher surrounding temperature",
        mechanisms: [
          "Sweat glands produce more sweat, which cools the skin as it evaporates",
          "Hairs lie flat to reduce trapped air, releasing heat easily",
          "Blood vessels dilate, bringing more blood close to the skin to increase heat loss",
        ],
      },
      {
        condition: "Lower surrounding temperature",
        mechanisms: [
          "Erect hairs trap a layer of air that acts as a heat insulator",
          "Blood vessels constrict, moving blood away from the skin to reduce heat loss",
        ],
      },
    ],
  },
  pulseExperiment: {
    title: "Experiment 3.2",
    problem: "Does pulse count increase when performing heavier tasks?",
    hypothesis: "Pulse count increases when performing heavier tasks.",
    purpose: "To study biological actions that respond to pulse count",
    variables: { manipulated: "Type of activity", responding: "Pulse count", fixed: "Time taken" },
    apparatus: "Stopwatch, one student from each group.",
    sequence: [
      "Select one student from each group to carry out the planned activities: resting, walking and jogging. Walking and jogging are carried out for ten minutes.",
      "Then count each student's pulse for one minute by placing two fingers on their wrist and record the reading.",
      "Record all the results in the table.",
    ],
    activities: [
      { id: "rest", label: "At rest" },
      { id: "walking", label: "Walking", durationMinutes: 10 },
      { id: "jogging", label: "Jogging", durationMinutes: 10 },
    ],
    countDurationMinutes: 1,
    conclusion: "The more vigorous the physical activity, the higher the pulse rate.",
  },
  animalHomeostasis: [
    {
      animal: "Cats and dogs",
      icon: "🐕",
      adaptation:
        "Lick fur to reduce body temperature; hang tongue out to help temperature decrease; fur stands erect in cold to trap heat",
    },
    {
      animal: "Lizards (cold surrounding)",
      icon: "🦎",
      adaptation:
        "Body activities and muscle function slow down, movements slow, metabolism and body temperature decrease",
    },
    {
      animal: "Lizards (hot surrounding)",
      icon: "🦎",
      adaptation:
        "Heart beats faster, movements become faster, metabolism rate and body temperature increase",
    },
    {
      animal: "Snail",
      icon: "🐌",
      adaptation:
        "Loses water through evaporation on skin surface; produces fluid and seeks humid places to reduce water loss",
    },
    {
      animal: "Bee",
      icon: "🐝",
      adaptation:
        "Has a waxy skin layer; loses water vapour through spiracles; closes spiracles between breaths to reduce water loss",
    },
  ],
  plantHomeostasis: {
    transpirationDefinition:
      "Transpiration is the process by which plants lose water from their leaves in the form of water vapour to the surroundings, through the stoma — involving the plant's transport system.",
    transpirationFunctions: [
      "Helps plants absorb and carry water and minerals from the soil to all parts of the plant",
      "Evaporation of water from leaves cools the plant during hot days",
    ],
    waterLossFact:
      "Almost 90% of water absorbed by plant roots is lost through transpiration. Transpiration on leaves also produces a force that draws water up from the stems.",
    stomaStates: [
      {
        condition: "During the day",
        stomaState: "open",
        reason:
          "Stoma opens to enable gas exchange for photosynthesis and more water to evaporate through transpiration",
      },
      {
        condition: "When temperature is too high",
        stomaState: "closed",
        reason:
          "Stoma closes to reduce water evaporated from the leaves, preventing excessive water loss",
      },
    ],
  },
  keyExamFacts: [
    "Homeostasis is the maintenance of a stable internal environment in an organism",
    "The homeostatic control process follows a detect → corrective mechanism → return to normal loop",
    "Water and temperature regulation both involve the excretory and endocrine systems",
    "During heat, blood vessels dilate and sweating increases; during cold, blood vessels constrict and shivering occurs",
    "Different animals (cats, lizards, snails, bees) have different specific homeostasis adaptations",
    "Transpiration is how plants lose water vapour through the stoma, cooling the plant and drawing water upward",
    "Guard cells control stoma opening and closing — open during the day for photosynthesis, closed when too hot to reduce water loss",
  ],
  keyTerms: [
    "Homeostasis",
    "Control centre",
    "Corrective mechanism",
    "Excretory system",
    "Endocrine system",
    "Metabolism",
    "Transpiration",
    "Stoma",
    "Guard cell",
    "Water regulation",
    "Temperature regulation",
  ],
  chapterSummary:
    "Chapter 3 explains homeostasis as the process organisms use to keep their internal environment stable, covering the detect-and-correct control loop, how humans regulate water content and body temperature, how different animals adapt to temperature and water-loss challenges, and how plants regulate water loss through transpiration and stoma control.",
};

const bm: Chapter3Content = {
  structure: {
    chapter: "Koordinasi dan Gerak Balas",
    subtopic: "3.1 Homeostasis dalam Benda Hidup",
    meaning: "Definisi Homeostasis",
    control: "Proses Kawalan Homeostasis",
    water: "Kawal Atur Kandungan Air",
    temperature: "Kawal Atur Suhu Badan",
  },
  practicalNotice:
    "Amali fizikal dengan bimbingan guru/makmal. Rekodkan pemerhatian dan bacaan sebenar anda.",
  sweatExperiment: {
    title: "Eksperimen 3.1",
    problem: "Kita berpeluh dalam keadaan panas atau sejuk?",
    hypothesis: "Kita berpeluh dalam keadaan panas.",
    purpose: "Mengkaji tindakan biologi yang memberikan gerak balas kepada perubahan suhu",
    variables: {
      manipulated: "Suhu persekitaran",
      responding: "Kehadiran peluh",
      fixed: "Masa yang diambil",
    },
    apparatus: "Jam randik, satu murid dari setiap kumpulan.",
    sequence: [
      "Masuk ke dalam bilik makmal tanpa memasang kipas selama 10 minit.",
      "Rekodkan sama ada anda berpeluh atau tidak.",
      "Kemudian, pasangkan kipas selama 10 minit.",
      "Rekodkan sama ada anda berpeluh atau tidak.",
    ],
    conditions: ["Panas (tanpa pasang kipas)", "Sejuk (kipas dipasang)"],
    conclusion: "Adakah hipotesis itu diterima? Berikan alasan anda.",
  },
  hook: {
    title: "Kenapa ini penting",
    body: "Pada saat ini, badan anda sedang menjalankan berpuluh-puluh pembetulan automatik — menyesuaikan suhu, kandungan air, dan banyak lagi — tanpa anda sedari. Bab ini menunjukkan gelung maklum balas sebenar yang digunakan oleh badan anda (dan setiap benda hidup) untuk kekal stabil tidak kira apa yang berlaku di luar.",
  },
  definition: {
    meaning:
      "Homeostasis merujuk kepada pengekalan persekitaran dalaman badan organisma — seperti suhu, kandungan air, pH dan tekanan darah — dalam keadaan seimbang dan stabil, supaya semua proses hidup dapat berfungsi dengan baik.",
    etymology:
      "Homeostasis berasal daripada dua perkataan Greek: 'homeo' bermaksud 'serupa' dan 'stasis' bermaksud 'stabil'.",
    importance:
      "Jika keadaan dalaman tidak seimbang — contohnya jika suhu terlalu tinggi — sel organisma boleh mati.",
  },
  controlProcessConcept:
    "Apabila keadaan dalaman (seperti suhu badan) meningkat, pusat kawalan di otak mengesan perubahan tersebut dan mencetuskan mekanisme pembetulan yang mengembalikannya ke julat normal. Apabila keadaan menurun, mekanisme pembetulan bertentangan mengembalikannya semula. Gelung kesan-dan-betulkan ini adalah proses teras di sebalik setiap contoh homeostasis dalam bab ini.",
  waterRegulation: {
    systemsInvolved: "Sistem perkumuhan dan sistem endokrin",
    organsInvolved: "Ginjal dan otak",
    increase: {
      trigger: "Kandungan air dalam badan meningkat apabila kita minum air",
      detectedBy: "Otak",
      mechanism: [
        "Otak akan merangsangkan pengurangan rembesan sejenis hormon supaya ginjal dapat menambahkan penghasilan air kencing.",
        "Ginjal menambahkan penghasilan air kencing",
        "Lebih banyak air kencing dihasilkan",
      ],
      result: "Kandungan air kembali normal",
    },
    decrease: {
      trigger: "Kandungan air dalam badan berkurang apabila kita berpeluh",
      detectedBy: "Otak",
      mechanism: [
        "Otak merangsang rembesan sejenis hormon supaya ginjal mengurangkan penghasilan air kencing.",
        "Ginjal mengurangkan penghasilan air kencing",
        "Kita berasa dahaga",
      ],
      result: "Kandungan air kembali normal",
    },
  },
  temperatureRegulation: {
    systemsInvolved: "Sistem perkumuhan dan sistem endokrin",
    organsInvolved: "Kulit, otak dan otot rangka",
    hotCondition: {
      trigger: "Pada hari panas, suhu badan meningkat",
      detectedBy: "Otak",
      mechanism: [
        "Salur darah mengembang",
        "Bulu roma condong",
        "Peluh bertambah",
        "Aktiviti otot rangka dan perembesan hormon-hormon tertentu akan berkurangan, seterusnya menurunkan suhu badan.",
        "Air kencing sedikit",
      ],
      result: "Suhu badan menurun",
    },
    coldCondition: {
      trigger: "Pada hari sejuk, suhu badan menurun",
      detectedBy: "Otak",
      mechanism: [
        "Salur darah mengecut",
        "Bulu roma menegak",
        "Peluh berkurang",
        "Otot rangka akan mengecut dan mengendur secara aktif dan menyebabkan seseorang menggigil supaya meningkatkan suhu badan.",
        "Hormon tertentu akan dirembeskan untuk meningkatkan metabolisme badan.",
      ],
      result: "Suhu badan meningkat",
    },
    skinMechanisms: [
      {
        condition: "Suhu persekitaran lebih tinggi",
        mechanisms: [
          "Kelenjar peluh menghasilkan lebih banyak peluh bagi menyejukkan kulit apabila peluh tersejat.",
          "Bulu roma condong untuk mengurangkan udara terperangkap pada kulit supaya haba mudah dibebaskan.",
          "Salur darah mengembang untuk membolehkan lebih banyak darah mendekati kulit bagi membebaskan tenaga haba.",
        ],
      },
      {
        condition: "Suhu persekitaran lebih rendah",
        mechanisms: [
          "Bulu roma menegak supaya dapat memerangkap satu lapisan udara yang bertindak sebagai penebat haba.",
          "Salur darah mengecut untuk membolehkan lebih banyak darah menjauhi kulit bagi mengurangkan pembebasan tenaga haba.",
        ],
      },
    ],
  },
  pulseExperiment: {
    title: "Eksperimen 3.2",
    problem: "Adakah kiraan nadi semakin meningkat apabila melaksanakan tugas yang berat?",
    hypothesis: "Kiraan nadi semakin meningkat apabila melaksanakan tugas yang berat.",
    purpose: "Mengkaji tindakan biologi yang memberikan gerak balas kepada kiraan nadi",
    variables: {
      manipulated: "Jenis aktiviti",
      responding: "Kiraan nadi",
      fixed: "Masa yang diambil",
    },
    apparatus: "Jam randik, seorang murid daripada setiap kumpulan.",
    sequence: [
      "Pilih seorang murid daripada setiap kumpulan untuk menjalankan aktiviti yang dirancangkan, iaitu keadaan rehat, berjalan dan berjoging. Aktiviti berjalan dan berjoging dilakukan selama sepuluh minit.",
      "Kemudian, ambil kiraan nadi setiap murid selama satu minit dengan meletakkan dua jari pada pergelangan tangan mereka dan rekodkan bacaan.",
      "Rekodkan semua keputusan dalam jadual seperti yang berikut.",
    ],
    activities: [
      { id: "rest", label: "Keadaan rehat" },
      { id: "walking", label: "Berjalan", durationMinutes: 10 },
      { id: "jogging", label: "Berjoging", durationMinutes: 10 },
    ],
    countDurationMinutes: 1,
    conclusion: "Semakin cergas aktiviti fizikal, semakin tinggi kadar denyutan nadi.",
  },
  animalHomeostasis: [
    {
      animal: "Kucing dan anjing",
      icon: "🐕",
      adaptation:
        "Menjilat bulu untuk mengurangkan suhu badan; menjelirkan lidah untuk membantu suhu menurun; bulu tegak berdiri semasa sejuk untuk memerangkap haba",
    },
    {
      animal: "Cicak (persekitaran sejuk)",
      icon: "🦎",
      adaptation:
        "Aktiviti badan dan fungsi otot menjadi perlahan, pergerakan perlahan, kadar metabolisme dan suhu badan menurun",
    },
    {
      animal: "Cicak (persekitaran panas)",
      icon: "🦎",
      adaptation:
        "Jantung berdegup lebih pantas, pergerakan menjadi lebih pantas, kadar metabolisme dan suhu badan meningkat",
    },
    {
      animal: "Siput",
      icon: "🐌",
      adaptation:
        "Kehilangan air melalui penyejatan pada permukaan kulit; menghasilkan cecair dan mencari tempat lembap untuk mengurangkan kehilangan air",
    },
    {
      animal: "Lebah",
      icon: "🐝",
      adaptation:
        "Mempunyai lapisan kulit berlilin; kehilangan wap air melalui spirakel; menutup spirakel antara pernafasan untuk mengurangkan kehilangan air",
    },
  ],
  plantHomeostasis: {
    transpirationDefinition:
      "Transpirasi ialah proses tumbuhan kehilangan air daripada daun dalam bentuk wap air ke persekitaran, melalui stoma — melibatkan sistem pengangkutan tumbuhan.",
    transpirationFunctions: [
      "Membantu tumbuhan menyerap dan mengangkut air serta mineral daripada tanah ke seluruh bahagian tumbuhan",
      "Penyejatan air daripada daun menyejukkan tumbuhan pada hari panas",
    ],
    waterLossFact:
      "Hampir 90% air yang diserap oleh akar tumbuhan hilang melalui transpirasi. Transpirasi pada daun turut menghasilkan daya yang menarik air ke atas daripada batang.",
    stomaStates: [
      {
        condition: "Pada waktu siang",
        stomaState: "open",
        reason:
          "Stoma terbuka untuk membolehkan pertukaran gas bagi fotosintesis dan lebih banyak air menyejat melalui transpirasi",
      },
      {
        condition: "Apabila suhu terlalu tinggi",
        stomaState: "closed",
        reason:
          "Stoma tertutup untuk mengurangkan air yang tersejat daripada daun, mencegah kehilangan air berlebihan",
      },
    ],
  },
  keyExamFacts: [
    "Homeostasis ialah pengekalan persekitaran dalaman yang stabil dalam organisma",
    "Proses kawalan homeostatik mengikut gelung kesan → mekanisme pembetulan → kembali normal",
    "Regulasi air dan suhu kedua-duanya melibatkan sistem perkumuhan dan endokrin",
    "Semasa panas, saluran darah berdilat dan peluh bertambah; semasa sejuk, saluran darah mengecut dan menggigil berlaku",
    "Haiwan berbeza (kucing, cicak, siput, lebah) mempunyai adaptasi homeostasis khusus yang berbeza",
    "Transpirasi ialah cara tumbuhan kehilangan wap air melalui stoma, menyejukkan tumbuhan dan menarik air ke atas",
    "Sel pengawal mengawal pembukaan dan penutupan stoma — terbuka pada siang hari untuk fotosintesis, tertutup apabila terlalu panas untuk mengurangkan kehilangan air",
  ],
  keyTerms: [
    "Homeostasis",
    "Pusat kawalan",
    "Mekanisme pembetulan",
    "Sistem perkumuhan",
    "Sistem endokrin",
    "Metabolisme",
    "Transpirasi",
    "Stoma",
    "Sel pengawal",
    "Regulasi air",
    "Regulasi suhu",
  ],
  chapterSummary:
    "Bab 3 menerangkan homeostasis sebagai proses yang digunakan organisma untuk mengekalkan persekitaran dalaman yang stabil, merangkumi gelung kawalan kesan-dan-betulkan, cara manusia mengawal kandungan air dan suhu badan, cara pelbagai haiwan menyesuaikan diri dengan cabaran suhu dan kehilangan air, serta cara tumbuhan mengawal kehilangan air melalui transpirasi dan kawalan stoma.",
};

export const chapter3Content = { en, bm };
export default chapter3Content;
