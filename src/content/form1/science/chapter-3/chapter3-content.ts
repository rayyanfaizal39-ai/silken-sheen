// chapter3-content.ts
// Source-verified content for Chapter 3 / Bab 3 — Coordination and Response / Koordinasi dan Gerak Balas
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 70-85)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 70-85, official KSSM counterpart)
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
  stomaState: 'open' | 'closed';
  reason: string;
}

export interface Chapter3Content {
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
  hook: {
    title: "Why this matters",
    body: "Right now, your body is running dozens of automatic corrections — adjusting temperature, water levels, and more — without you ever noticing. This chapter shows you the actual feedback loops your body (and every living thing) uses to keep itself stable no matter what's happening outside."
  },
  definition: {
    meaning: "Homeostasis refers to the maintenance of the internal environment in the body of an organism — such as temperature, water, pH and blood pressure — in a balanced and stable condition, so all living processes can work well.",
    etymology: "Homeostasis comes from two Greek words: 'homeo' meaning 'similar' and 'stasis' meaning 'stable'.",
    importance: "If internal conditions are not balanced — for example if temperature is too high — the cells of the organism may die."
  },
  controlProcessConcept: "When an internal condition (like body temperature) increases, the control centre in the brain detects the change and triggers a corrective mechanism that brings it back down to the normal range. When the condition decreases, the opposite corrective mechanism brings it back up. This detect-and-correct loop is the core process behind every homeostasis example in this chapter.",
  waterRegulation: {
    systemsInvolved: "Excretory system and endocrine system",
    organsInvolved: "Kidneys and brain",
    increase: {
      trigger: "Water content in the body increases when we drink water",
      detectedBy: "Brain",
      mechanism: ["The brain stimulates less secretion of a hormone", "Kidneys increase the production of urine", "More urine is produced"],
      result: "Water content returns to normal"
    },
    decrease: {
      trigger: "Water content in the body decreases when we sweat",
      detectedBy: "Brain",
      mechanism: ["The brain stimulates more secretion of a hormone", "Kidneys decrease the production of urine", "We feel thirsty"],
      result: "Water content returns to normal"
    }
  },
  temperatureRegulation: {
    systemsInvolved: "Excretory system and endocrine system",
    organsInvolved: "Skin, brain and skeletal muscles",
    hotCondition: {
      trigger: "During a hot day, body temperature increases",
      detectedBy: "Brain",
      mechanism: ["Blood vessels dilate", "Hairs lie flat", "Sweating increases", "Skeletal muscle activity and hormone secretion reduce"],
      result: "Body temperature decreases"
    },
    coldCondition: {
      trigger: "During a cold day, body temperature decreases",
      detectedBy: "Brain",
      mechanism: ["Blood vessels constrict", "Hairs stand erect", "Sweating decreases", "Skeletal muscles contract/relax rapidly, causing shivering", "Hormones increase body metabolism"],
      result: "Body temperature increases"
    },
    skinMechanisms: [
      { condition: "Higher surrounding temperature", mechanisms: ["Sweat glands produce more sweat, which cools the skin as it evaporates", "Hairs lie flat to reduce trapped air, releasing heat easily", "Blood vessels dilate, bringing more blood close to the skin to increase heat loss"] },
      { condition: "Lower surrounding temperature", mechanisms: ["Erect hairs trap a layer of air that acts as a heat insulator", "Blood vessels constrict, moving blood away from the skin to reduce heat loss"] }
    ]
  },
  animalHomeostasis: [
    { animal: "Cats and dogs", icon: "🐕", adaptation: "Lick fur to reduce body temperature; hang tongue out to help temperature decrease; fur stands erect in cold to trap heat" },
    { animal: "Lizards (cold surrounding)", icon: "🦎", adaptation: "Body activities and muscle function slow down, movements slow, metabolism and body temperature decrease" },
    { animal: "Lizards (hot surrounding)", icon: "🦎", adaptation: "Heart beats faster, movements become faster, metabolism rate and body temperature increase" },
    { animal: "Snail", icon: "🐌", adaptation: "Loses water through evaporation on skin surface; produces fluid and seeks humid places to reduce water loss" },
    { animal: "Bee", icon: "🐝", adaptation: "Has a waxy skin layer; loses water vapour through spiracles; closes spiracles between breaths to reduce water loss" }
  ],
  plantHomeostasis: {
    transpirationDefinition: "Transpiration is the process by which plants lose water from their leaves in the form of water vapour to the surroundings, through the stoma — involving the plant's transport system.",
    transpirationFunctions: ["Helps plants absorb and carry water and minerals from the soil to all parts of the plant", "Evaporation of water from leaves cools the plant during hot days"],
    waterLossFact: "Almost 90% of water absorbed by plant roots is lost through transpiration. Transpiration on leaves also produces a force that draws water up from the stems.",
    stomaStates: [
      { condition: "During the day", stomaState: "open", reason: "Stoma opens to enable gas exchange for photosynthesis and more water to evaporate through transpiration" },
      { condition: "When temperature is too high", stomaState: "closed", reason: "Stoma closes to reduce water evaporated from the leaves, preventing excessive water loss" }
    ]
  },
  keyExamFacts: [
    "Homeostasis is the maintenance of a stable internal environment in an organism",
    "The homeostatic control process follows a detect → corrective mechanism → return to normal loop",
    "Water and temperature regulation both involve the excretory and endocrine systems",
    "During heat, blood vessels dilate and sweating increases; during cold, blood vessels constrict and shivering occurs",
    "Different animals (cats, lizards, snails, bees) have different specific homeostasis adaptations",
    "Transpiration is how plants lose water vapour through the stoma, cooling the plant and drawing water upward",
    "Guard cells control stoma opening and closing — open during the day for photosynthesis, closed when too hot to reduce water loss"
  ],
  keyTerms: [
    "Homeostasis", "Control centre", "Corrective mechanism", "Excretory system",
    "Endocrine system", "Metabolism", "Transpiration", "Stoma", "Guard cell",
    "Water regulation", "Temperature regulation"
  ],
  chapterSummary: "Chapter 3 explains homeostasis as the process organisms use to keep their internal environment stable, covering the detect-and-correct control loop, how humans regulate water content and body temperature, how different animals adapt to temperature and water-loss challenges, and how plants regulate water loss through transpiration and stoma control."
};

const bm: Chapter3Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Pada saat ini, badan anda sedang menjalankan berpuluh-puluh pembetulan automatik — menyesuaikan suhu, kandungan air, dan banyak lagi — tanpa anda sedari. Bab ini menunjukkan gelung maklum balas sebenar yang digunakan oleh badan anda (dan setiap benda hidup) untuk kekal stabil tidak kira apa yang berlaku di luar."
  },
  definition: {
    meaning: "Homeostasis merujuk kepada pengekalan persekitaran dalaman badan organisma — seperti suhu, kandungan air, pH dan tekanan darah — dalam keadaan seimbang dan stabil, supaya semua proses hidup dapat berfungsi dengan baik.",
    etymology: "Homeostasis berasal daripada dua perkataan Greek: 'homeo' bermaksud 'serupa' dan 'stasis' bermaksud 'stabil'.",
    importance: "Jika keadaan dalaman tidak seimbang — contohnya jika suhu terlalu tinggi — sel organisma boleh mati."
  },
  controlProcessConcept: "Apabila keadaan dalaman (seperti suhu badan) meningkat, pusat kawalan di otak mengesan perubahan tersebut dan mencetuskan mekanisme pembetulan yang mengembalikannya ke julat normal. Apabila keadaan menurun, mekanisme pembetulan bertentangan mengembalikannya semula. Gelung kesan-dan-betulkan ini adalah proses teras di sebalik setiap contoh homeostasis dalam bab ini.",
  waterRegulation: {
    systemsInvolved: "Sistem perkumuhan dan sistem endokrin",
    organsInvolved: "Buah pinggang dan otak",
    increase: {
      trigger: "Kandungan air dalam badan meningkat apabila kita minum air",
      detectedBy: "Otak",
      mechanism: ["Otak merangsang kurang perembesan hormon", "Buah pinggang meningkatkan penghasilan air kencing", "Lebih banyak air kencing dihasilkan"],
      result: "Kandungan air kembali normal"
    },
    decrease: {
      trigger: "Kandungan air dalam badan berkurang apabila kita berpeluh",
      detectedBy: "Otak",
      mechanism: ["Otak merangsang lebih perembesan hormon", "Buah pinggang mengurangkan penghasilan air kencing", "Kita berasa dahaga"],
      result: "Kandungan air kembali normal"
    }
  },
  temperatureRegulation: {
    systemsInvolved: "Sistem perkumuhan dan sistem endokrin",
    organsInvolved: "Kulit, otak dan otot rangka",
    hotCondition: {
      trigger: "Pada hari panas, suhu badan meningkat",
      detectedBy: "Otak",
      mechanism: ["Saluran darah berdilat", "Rambut menegak rata", "Peluh bertambah", "Aktiviti otot rangka dan perembesan hormon berkurang"],
      result: "Suhu badan menurun"
    },
    coldCondition: {
      trigger: "Pada hari sejuk, suhu badan menurun",
      detectedBy: "Otak",
      mechanism: ["Saluran darah mengecut", "Rambut tegak berdiri", "Peluh berkurang", "Otot rangka mengecut/mengendur dengan pantas, menyebabkan menggigil", "Hormon meningkatkan metabolisme badan"],
      result: "Suhu badan meningkat"
    },
    skinMechanisms: [
      { condition: "Suhu persekitaran lebih tinggi", mechanisms: ["Kelenjar peluh menghasilkan lebih banyak peluh, yang menyejukkan kulit apabila menyejat", "Rambut menegak rata untuk mengurangkan udara terperangkap, membebaskan haba dengan mudah", "Saluran darah berdilat, membawa lebih banyak darah dekat dengan kulit untuk meningkatkan kehilangan haba"] },
      { condition: "Suhu persekitaran lebih rendah", mechanisms: ["Rambut tegak berdiri memerangkap lapisan udara yang bertindak sebagai penebat haba", "Saluran darah mengecut, menjauhkan darah daripada kulit untuk mengurangkan kehilangan haba"] }
    ]
  },
  animalHomeostasis: [
    { animal: "Kucing dan anjing", icon: "🐕", adaptation: "Menjilat bulu untuk mengurangkan suhu badan; menjelirkan lidah untuk membantu suhu menurun; bulu tegak berdiri semasa sejuk untuk memerangkap haba" },
    { animal: "Cicak (persekitaran sejuk)", icon: "🦎", adaptation: "Aktiviti badan dan fungsi otot menjadi perlahan, pergerakan perlahan, kadar metabolisme dan suhu badan menurun" },
    { animal: "Cicak (persekitaran panas)", icon: "🦎", adaptation: "Jantung berdegup lebih pantas, pergerakan menjadi lebih pantas, kadar metabolisme dan suhu badan meningkat" },
    { animal: "Siput", icon: "🐌", adaptation: "Kehilangan air melalui penyejatan pada permukaan kulit; menghasilkan cecair dan mencari tempat lembap untuk mengurangkan kehilangan air" },
    { animal: "Lebah", icon: "🐝", adaptation: "Mempunyai lapisan kulit berlilin; kehilangan wap air melalui spirakel; menutup spirakel antara pernafasan untuk mengurangkan kehilangan air" }
  ],
  plantHomeostasis: {
    transpirationDefinition: "Transpirasi ialah proses tumbuhan kehilangan air daripada daun dalam bentuk wap air ke persekitaran, melalui stoma — melibatkan sistem pengangkutan tumbuhan.",
    transpirationFunctions: ["Membantu tumbuhan menyerap dan mengangkut air serta mineral daripada tanah ke seluruh bahagian tumbuhan", "Penyejatan air daripada daun menyejukkan tumbuhan pada hari panas"],
    waterLossFact: "Hampir 90% air yang diserap oleh akar tumbuhan hilang melalui transpirasi. Transpirasi pada daun turut menghasilkan daya yang menarik air ke atas daripada batang.",
    stomaStates: [
      { condition: "Pada waktu siang", stomaState: "open", reason: "Stoma terbuka untuk membolehkan pertukaran gas bagi fotosintesis dan lebih banyak air menyejat melalui transpirasi" },
      { condition: "Apabila suhu terlalu tinggi", stomaState: "closed", reason: "Stoma tertutup untuk mengurangkan air yang tersejat daripada daun, mencegah kehilangan air berlebihan" }
    ]
  },
  keyExamFacts: [
    "Homeostasis ialah pengekalan persekitaran dalaman yang stabil dalam organisma",
    "Proses kawalan homeostatik mengikut gelung kesan → mekanisme pembetulan → kembali normal",
    "Regulasi air dan suhu kedua-duanya melibatkan sistem perkumuhan dan endokrin",
    "Semasa panas, saluran darah berdilat dan peluh bertambah; semasa sejuk, saluran darah mengecut dan menggigil berlaku",
    "Haiwan berbeza (kucing, cicak, siput, lebah) mempunyai adaptasi homeostasis khusus yang berbeza",
    "Transpirasi ialah cara tumbuhan kehilangan wap air melalui stoma, menyejukkan tumbuhan dan menarik air ke atas",
    "Sel pengawal mengawal pembukaan dan penutupan stoma — terbuka pada siang hari untuk fotosintesis, tertutup apabila terlalu panas untuk mengurangkan kehilangan air"
  ],
  keyTerms: [
    "Homeostasis", "Pusat kawalan", "Mekanisme pembetulan", "Sistem perkumuhan",
    "Sistem endokrin", "Metabolisme", "Transpirasi", "Stoma", "Sel pengawal",
    "Regulasi air", "Regulasi suhu"
  ],
  chapterSummary: "Bab 3 menerangkan homeostasis sebagai proses yang digunakan organisma untuk mengekalkan persekitaran dalaman yang stabil, merangkumi gelung kawalan kesan-dan-betulkan, cara manusia mengawal kandungan air dan suhu badan, cara pelbagai haiwan menyesuaikan diri dengan cabaran suhu dan kehilangan air, serta cara tumbuhan mengawal kehilangan air melalui transpirasi dan kawalan stoma."
};

export const chapter3Content = { en, bm };
export default chapter3Content;
