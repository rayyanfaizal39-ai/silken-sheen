// chapter4-content.ts
// Source-verified content for Chapter 4 / Bab 4 — Reproduction / Pembiakan
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 88-133)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 88-133, official KSSM counterpart)
// Content data only — no presentation markup. Handle with age-appropriate,
// clinical tone in the UI — this covers official KSSM Form 1 human
// reproductive health content.

export interface AsexualType {
  name: string;
  description: string;
  examples: string[];
}

export interface ReproductiveOrganPart {
  part: string;
  function: string;
}

export interface PubertyChange {
  category: string;
  changes: string[];
}

export interface CyclePhase {
  days: string;
  name: string;
  description: string;
}

export interface FoetalStage {
  weeks: string;
  description: string;
}

export interface NutrientCard {
  nutrient: string;
  examples: string;
  fn: string;
}

export interface SubstanceEffect {
  substance: string;
  effects: string[];
}

export interface ContraceptionMethod {
  name: string;
  description: string;
}

export interface FlowerPart {
  part: string;
  function: string;
}

export interface PollinatingAgent {
  agent: string;
  mechanism: string;
  flowerCharacteristics: string[];
  examples: string[];
}

export interface SeedPart {
  part: string;
  function: string;
}

export interface Chapter4Content {
  hook: { title: string; body: string };
  reproductionBasics: {
    definition: string;
    sexual: { involves: string; occursIn: string[] };
    asexual: { involves: string; occursIn: string[]; note: string };
    fertilisationTypes: { internal: string[]; external: string[] };
  };
  asexualTypes: AsexualType[];
  humanReproductiveSystem: {
    maleParts: ReproductiveOrganPart[];
    femaleParts: ReproductiveOrganPart[];
  };
  puberty: {
    definition: string;
    maleAge: string;
    femaleAge: string;
    maleChanges: PubertyChange[];
    femaleChanges: PubertyChange[];
  };
  menstrualCycle: {
    definition: string;
    controlledBy: string;
    averageLength: string;
    affectingFactors: string[];
    phases: CyclePhase[];
    hygieneImportance: string[];
    irregularMenstruation: { causes: string[]; effects: string[] };
  };
  fertilisationAndPregnancy: {
    process: string[];
    foetalDevelopment: FoetalStage[];
    placentaFunction: string;
    umbilicalCordFunction: string;
    amnionFunction: string;
    amnioticFluidFunction: string;
  };
  foetalDevelopmentFactors: {
    nutrientNeeds: NutrientCard[];
    harmfulSubstances: SubstanceEffect[];
    breastfeedingBenefits: string[];
  };
  infertility: {
    definition: string;
    maleFactors: string[];
    femaleFactors: string[];
    treatments: { name: string; description: string }[];
    contraceptionMethods: ContraceptionMethod[];
    healthScreeningImportance: string[];
  };
  plantReproduction: {
    flowerParts: FlowerPart[];
    flowerTypes: { bisexual: string; unisexual: string; unisexualExamples: string[] };
    pollinationDefinition: string;
    pollinationTypes: { self: string; cross: string };
    pollinatingAgents: PollinatingAgent[];
    crossPollinationAdvantages: string[];
    seedParts: SeedPart[];
    seedTypes: { monocotyledonous: string; dicotyledonous: string };
    germinationTypes: { epigeal: string; hypogeal: string };
    germinationConditions: string[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Chapter4Content = {
  hook: {
    title: "Why this matters",
    body: "Every living thing on Earth exists because of reproduction — from a single Amoeba splitting in two, to the nine-month process that made you. This chapter covers how humans, animals, and plants all solve the same problem: creating the next generation."
  },
  reproductionBasics: {
    definition: "Reproduction is the process of producing new individuals from living organisms — a basic characteristic of every living organism.",
    sexual: { involves: "Involves reproductive cells (gametes) from two parents", occursIn: ["Humans", "Higher animals (mammal, bird, fish, reptile, amphibian)", "Flowering plants"] },
    asexual: { involves: "Does not involve reproductive cells; only one parent involved", occursIn: ["Plants (onion, ginger, potato)", "Simple organisms (Amoeba, Hydra, Paramecium)"], note: "Offspring are genetically identical to the parent — no variation occurs." },
    fertilisationTypes: {
      internal: ["Male gamete fuses with female gamete inside the female parent's body", "Male parent releases sperm into the female parent's body", "Example: dragonflies"],
      external: ["Male gamete fuses with female gamete outside the female parent's body, in water", "Male releases sperm and female releases ovum separately; sperm swims to the ovum", "Example: fish"]
    }
  },
  asexualTypes: [
    { name: "Binary fission", description: "Division of a single parent cell into two daughter cells", examples: ["Amoeba", "Paramecium", "Bacteria"] },
    { name: "Budding", description: "A bud forms as a swelling on the organism's body, develops, and breaks off as a new individual", examples: ["Hydra", "Yeast"] },
    { name: "Regeneration", description: "Fragments of an organism grow and develop into completely new individuals", examples: ["Flatworm", "Starfish", "Planaria"] },
    { name: "Spore formation", description: "Spores form in a sporangium; when it breaks, tiny light spores scatter by wind and grow into new organisms on landing in a moist place", examples: ["Algae", "Fungus", "Fern"] },
    { name: "Vegetative reproduction", description: "New plants produced from a vegetative part of a plant (not the flower) — roots, underground stems, runners, bulbs, or leaves", examples: ["Carrot", "Strawberry", "Ginger", "Yam", "Potato"] }
  ],
  humanReproductiveSystem: {
    maleParts: [
      { part: "Seminal vesicle", function: "Secretes nutritional fluid for the sperm" },
      { part: "Urethra", function: "Channel to discharge sperm and urine from the body" },
      { part: "Sperm duct", function: "Transports sperm from the testis to the urethra" },
      { part: "Penis", function: "Transfers sperm into the vagina during copulation" },
      { part: "Scrotum", function: "Holds and protects the testes" },
      { part: "Testis", function: "Produces male gametes (sperm) and male sex hormones" },
      { part: "Prostate gland", function: "Secretes fluid containing nutrients that protects sperm cells" }
    ],
    femaleParts: [
      { part: "Fallopian tube", function: "Place where fertilisation between sperm and ovum occurs" },
      { part: "Ovary", function: "Produces female gamete (ovum) and female sex hormones" },
      { part: "Uterus (womb)", function: "Place where the embryo develops and grows" },
      { part: "Cervix", function: "Produces mucus to enable sperm to swim into the uterus" },
      { part: "Vagina", function: "Receives sperm and is the channel through which a baby is born" }
    ]
  },
  puberty: {
    definition: "Puberty is the early stage of maturity of the reproductive system, during which adolescents experience emotional, physical and physiological changes.",
    maleAge: "Approximately 14-17 years old",
    femaleAge: "Approximately 10-12 years old",
    maleChanges: [
      { category: "Voice", changes: ["Vocal cord (larynx) enlarges", "Voice becomes deeper"] },
      { category: "Body", changes: ["Moustache and beard begin to grow", "Hair grows on face, armpits and chest"] },
      { category: "Reproductive organs", changes: ["Testes produce sperm and sex hormones", "Hair grows at pubic region", "Penis and scrotum enlarge"] }
    ],
    femaleChanges: [
      { category: "Body", changes: ["Breasts grow", "Hips become firm and broader", "Hair grows on armpits"] },
      { category: "Reproductive organs", changes: ["Ovaries produce ova and sex hormones", "Hair grows at pubic region", "Menstrual cycle begins"] }
    ]
  },
  menstrualCycle: {
    definition: "Menstruation is the breakdown of the lining of the uterine wall and discharge of blood through the vagina. The menstrual cycle refers to the series of changes in the uterine wall and ovaries, including the formation and release of a mature ovum.",
    controlledBy: "The brain and endocrine system, which secretes hormones",
    averageLength: "28 days on average (differs by individual)",
    affectingFactors: ["Nutrient intake", "Abrupt change in body weight", "Emotional changes", "Mental pressure"],
    phases: [
      { days: "Day 1-5", name: "Menstruation phase", description: "The uterine lining breaks down and is discharged with blood, unfertilised ovum, and mucus" },
      { days: "Day 6-11", name: "Repair phase", description: "Uterine lining starts to rebuild and thicken; blood vessels form, ready to receive an implanted fertilised ovum" },
      { days: "Day 12-17", name: "Fertile phase", description: "An ovum is released from the ovary on day 14 (ovulation); uterine lining continues thickening; fertilisation is likely if sperm are present" },
      { days: "Day 18-28", name: "Premenstrual phase", description: "Uterine lining continues thickening with rich blood supply, ready for implantation if fertilisation occurred; cycle repeats if it did not" }
    ],
    hygieneImportance: ["Change sanitary pad 3-4 times a day to prevent bacterial/viral infection and UTI", "Bathe frequently to keep the body clean"],
    irregularMenstruation: {
      causes: ["Increase in body weight", "Hormonal imbalance", "Emotional disruption", "Excessive exercise", "Cervical tumour"],
      effects: ["Infertility — an early sign of reproductive system problems; late treatment can lead to ovarian/cervical/uterine cancer", "Difficulty in family planning due to unclear fertile days", "Health problems like anaemia from excessive blood loss"]
    }
  },
  fertilisationAndPregnancy: {
    process: [
      "Sperm swim into the vagina during copulation",
      "If an ovum is present in the Fallopian tube, sperm fuses with it to form a zygote",
      "The zygote divides and becomes a ball of cells known as an embryo",
      "The embryo implants on the uterine wall in the uterus",
      "The implanted embryo grows into a foetus over approximately 38 weeks until birth"
    ],
    foetalDevelopment: [
      { weeks: "Week 1-4", description: "Hands and feet start to form; the embryo has a tiny tail" },
      { weeks: "Week 7-9", description: "Nose, ears and fingers become visible" },
      { weeks: "Week 10-19", description: "Embryo starts to look like a baby and is now called a foetus" },
      { weeks: "Week 20-37", description: "Foetus resembles a baby" },
      { weeks: "Week 38-40", description: "Foetus is fully formed; head engages at the cervix; uterine muscles contract strongly, amnion bursts, amniotic fluid releases; foetus is pushed out through the vagina" }
    ],
    placentaFunction: "Made of tissue from both mother and embryo; the place where oxygen/carbon dioxide exchange, nutrient supply, and waste removal occur between mother's blood and the foetus",
    umbilicalCordFunction: "Tube connecting the foetus to the placenta, containing blood vessels that transport blood to and from the foetus",
    amnionFunction: "Membrane forming a sac that contains amniotic fluid, protecting the foetus",
    amnioticFluidFunction: "Acts as a cushion, absorbing concussion and protecting the foetus from injuries"
  },
  foetalDevelopmentFactors: {
    nutrientNeeds: [
      { nutrient: "Fibre", examples: "Cereal, vegetables, fruits", fn: "Prevents constipation" },
      { nutrient: "Iron", examples: "Liver, red meat, fish", fn: "Formation of haemoglobin to prevent anaemia" },
      { nutrient: "Carbohydrate & fat", examples: "Rice, bread, butter, cheese", fn: "Provides energy for daily activities" },
      { nutrient: "Vitamin C", examples: "Citrus fruits, guava, tomatoes", fn: "Skin health of foetus and mother; prevents bleeding gums" },
      { nutrient: "Folic acid", examples: "Broccoli, spinach, groundnuts", fn: "Important for the foetus's nervous system development" },
      { nutrient: "Protein", examples: "Chicken, red meat, fish, milk, cheese", fn: "Important for growth of new foetal cells" },
      { nutrient: "Calcium & phosphorus", examples: "Anchovies, cheese, milk", fn: "Healthy formation of foetal bones; protects mother's bones and teeth" }
    ],
    harmfulSubstances: [
      { substance: "Cigarette", effects: ["Low birth weight", "Higher mortality rate", "Retardation and physical disabilities", "Premature birth", "Possible miscarriage"] },
      { substance: "Alcoholic drink", effects: ["Foetal Alcohol Syndrome (low birth weight, small head, retardation, facial abnormalities)", "Delayed foetal development", "Damage to brain, nervous system and heart"] },
      { substance: "Drugs", effects: ["Foetal defects may occur"] }
    ],
    breastfeedingBenefits: ["Contains all essential nutrients for a baby", "Contains antibodies that protect against certain diseases", "Strengthens the mother-baby emotional bond", "Better digestion compared to formula milk"]
  },
  infertility: {
    definition: "Infertility is the inability to produce offspring — the husband, wife, or both may be sterile.",
    maleFactors: ["Testes cannot produce sperm", "Low sperm count", "Produces low quality sperm", "Impotence", "Hormone imbalance", "Defective reproductive organs or infected with disease"],
    femaleFactors: ["Ovaries cannot produce ovum", "Blockage in the Fallopian tubes", "Abnormal uterus", "Tumour in the uterus", "Hormone imbalance", "Health problems like diabetes"],
    treatments: [
      { name: "Hormone treatment", description: "Suitable for individuals with imbalanced hormones" },
      { name: "Surgery", description: "For women with blockage in the Fallopian tube, or men with blockage in the sperm duct" },
      { name: "In vitro fertilisation (IVF)", description: "For women with Fallopian tube blockage — ovum is fertilised with sperm outside the body in a glass dish, then the embryo is placed in the uterus" }
    ],
    contraceptionMethods: [
      { name: "Contraceptive pills", description: "Prevent ovulation" },
      { name: "Implants", description: "Secrete a hormone that prevents the ovary from producing ovum" },
      { name: "Condom", description: "Worn over the penis to prevent sperm from entering the vagina during ejaculation" },
      { name: "Intrauterine Contraceptive Device (IUCD)", description: "Inserted into the uterus to prevent implantation" },
      { name: "Vasectomy", description: "Surgery to cut and tie the sperm duct, preventing sperm transport to the urethra" },
      { name: "Ligation", description: "Surgery to cut and tie the Fallopian tubes, preventing the ovum from meeting sperm" }
    ],
    healthScreeningImportance: ["Detects early symptoms of chronic diseases", "Reproductive cancers (uterine, cervical, prostate) can still be treated if detected early", "Reduces the risk of health problems requiring high-cost treatment", "Allows understanding of safe contraceptive methods via doctor consultation"]
  },
  plantReproduction: {
    flowerParts: [
      { part: "Stamen (anther + filament)", function: "Male reproductive organ" },
      { part: "Pistil (stigma + style + ovary + ovule)", function: "Female reproductive organ" },
      { part: "Petal", function: "Usually colourful to attract insects and animals" },
      { part: "Sepal", function: "Usually green; protects the flower during the bud stage" }
    ],
    flowerTypes: {
      bisexual: "Has both male (stamen) and female (pistil) reproductive organs in the same flower — most flowers are bisexual",
      unisexual: "Incomplete flowers with only stamen or only pistil",
      unisexualExamples: ["Corn (male and female flowers separate)", "Papaya (only female flowers produce fruit and seeds)"]
    },
    pollinationDefinition: "Pollination is the process of transferring matured pollen grains from the anther to the stigma. The matured anther bursts and spreads pollen grains, which fall on soil or are carried by pollinating agents to a stigma.",
    pollinationTypes: {
      self: "Pollen grains are transferred to the stigma of the same flower, or another flower on the same plant",
      cross: "Pollen grains are transferred to the stigma of a flower on a different plant of the same species"
    },
    pollinatingAgents: [
      { agent: "Animals and insects", mechanism: "Pollen sticks to the beak, body, or furry feet of the animal/insect as it feeds on nectar, then transfers to the next flower", flowerCharacteristics: ["Big, colourful petals", "Have nectar and pleasant smell", "Produce rough, sticky pollen grains"], examples: ["Durian", "Rambutan", "Papaya", "Hibiscus", "Sunflower", "Rose"] },
      { agent: "Wind", mechanism: "Light pollen grains are blown by the wind to reach the stigma of another flower", flowerCharacteristics: ["White or pale petals", "Long, furry stigma", "Plenty of small, smooth, light pollen grains", "Long filament and style"], examples: ["Corn", "Grass", "Paddy"] }
    ],
    crossPollinationAdvantages: ["Healthier plants that adapt better to environmental changes", "New plants more resistant to pests and diseases", "New varieties of plants", "Good quality seeds"],
    seedParts: [
      { part: "Testa", function: "Protects the seed" },
      { part: "Hilum", function: "Where the seed attaches to the fruit" },
      { part: "Micropyle", function: "Small hole allowing air and water to enter the seed" },
      { part: "Plumule", function: "Part of the embryo that develops into a new shoot" },
      { part: "Radicle", function: "Part of the embryo that develops into the root" },
      { part: "Cotyledon / Endosperm", function: "Stores and provides food for the seed" }
    ],
    seedTypes: {
      monocotyledonous: "One cotyledon — example: maize grain",
      dicotyledonous: "Two cotyledons — example: green bean"
    },
    germinationTypes: {
      epigeal: "The cotyledon is carried up out of the soil during germination",
      hypogeal: "The cotyledon remains in the soil during germination"
    },
    germinationConditions: ["Water", "Air", "Suitable temperature"]
  },
  keyExamFacts: [
    "Sexual reproduction involves gametes from two parents; asexual reproduction involves one parent and no gametes",
    "The five types of asexual reproduction are binary fission, budding, regeneration, spore formation, and vegetative reproduction",
    "A woman's menstrual cycle averages 28 days across menstruation, repair, fertile, and premenstrual phases",
    "Ovulation occurs around day 14 of the menstrual cycle",
    "After fertilisation, a zygote becomes an embryo, implants in the uterus, and develops into a foetus over ~38 weeks",
    "The placenta exchanges oxygen, nutrients and waste between mother and foetus; the umbilical cord transports this blood",
    "Smoking, alcohol, and drugs during pregnancy all carry specific serious risks to foetal development",
    "Contraception methods include pills, implants, condoms, IUCD, vasectomy, and ligation",
    "Flowers are pollinated by animals/insects or by wind, each favouring different flower characteristics",
    "Seeds germinate given water, air, and suitable temperature; epigeal germination lifts the cotyledon above soil, hypogeal keeps it below"
  ],
  keyTerms: [
    "Reproduction", "Sexual reproduction", "Asexual reproduction", "Gamete", "Zygote",
    "Fertilisation", "Puberty", "Menstruation", "Menstrual cycle", "Ovulation",
    "Embryo", "Foetus", "Placenta", "Umbilical cord", "Amnion", "Amniotic fluid",
    "Infertility", "Contraception", "Pollination", "Self-pollination", "Cross-pollination",
    "Germination", "Cotyledon", "Testa"
  ],
  chapterSummary: "Chapter 4 covers reproduction across humans, animals and plants — sexual vs asexual reproduction and the five asexual types, the human male and female reproductive systems, puberty, the menstrual cycle, fertilisation and foetal development through to birth, factors affecting foetal health, infertility and contraception methods, and plant reproduction from flower structure through pollination, fertilisation, seed formation, and germination."
};

const bm: Chapter4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap benda hidup di Bumi wujud kerana pembiakan — daripada seekor Amoeba yang membelah dua, hingga proses sembilan bulan yang mencipta anda. Bab ini merangkumi bagaimana manusia, haiwan, dan tumbuhan semuanya menyelesaikan masalah yang sama: menghasilkan generasi seterusnya."
  },
  reproductionBasics: {
    definition: "Pembiakan ialah proses menghasilkan individu baharu daripada organisma hidup — ciri asas setiap organisma hidup.",
    sexual: { involves: "Melibatkan sel pembiakan (gamet) daripada dua induk", occursIn: ["Manusia", "Haiwan tinggi (mamalia, burung, ikan, reptilia, amfibia)", "Tumbuhan berbunga"] },
    asexual: { involves: "Tidak melibatkan sel pembiakan; hanya satu induk terlibat", occursIn: ["Tumbuhan (bawang, halia, kentang)", "Organisma ringkas (Amoeba, Hydra, Paramecium)"], note: "Anak benih adalah sama secara genetik dengan induk — tiada variasi berlaku." },
    fertilisationTypes: {
      internal: ["Gamet jantan bercantum dengan gamet betina di dalam badan induk betina", "Induk jantan melepaskan sperma ke dalam badan induk betina", "Contoh: pepatung"],
      external: ["Gamet jantan bercantum dengan gamet betina di luar badan induk betina, di dalam air", "Jantan melepaskan sperma dan betina melepaskan ovum secara berasingan; sperma berenang ke arah ovum", "Contoh: ikan"]
    }
  },
  asexualTypes: [
    { name: "Pembelahan dedua", description: "Pembahagian satu sel induk kepada dua sel anak", examples: ["Amoeba", "Paramecium", "Bakteria"] },
    { name: "Percambahan (budding)", description: "Tunas terbentuk sebagai bengkak pada badan organisma, berkembang, dan bercerai sebagai individu baharu", examples: ["Hydra", "Yis"] },
    { name: "Regenerasi", description: "Serpihan organisma tumbuh dan berkembang menjadi individu baharu yang lengkap", examples: ["Cacing pipih", "Bintang laut", "Planaria"] },
    { name: "Pembentukan spora", description: "Spora terbentuk dalam sporangium; apabila pecah, spora kecil dan ringan bertebaran oleh angin dan tumbuh menjadi organisma baharu di tempat lembap", examples: ["Alga", "Kulat", "Paku pakis"] },
    { name: "Pembiakan vegetatif", description: "Tumbuhan baharu dihasilkan daripada bahagian vegetatif tumbuhan (bukan bunga) — akar, batang bawah tanah, sulur, umbisi, atau daun", examples: ["Lobak merah", "Strawberi", "Halia", "Ubi keladi", "Kentang"] }
  ],
  humanReproductiveSystem: {
    maleParts: [
      { part: "Vesikel seminal", function: "Merembes cecair berkhasiat untuk sperma" },
      { part: "Uretra", function: "Saluran untuk melepaskan sperma dan air kencing daripada badan" },
      { part: "Vas deferens (duktus sperma)", function: "Mengangkut sperma daripada testis ke uretra" },
      { part: "Penis", function: "Memindahkan sperma ke dalam vagina semasa persetubuhan" },
      { part: "Skrotum", function: "Memegang dan melindungi testis" },
      { part: "Testis", function: "Menghasilkan gamet jantan (sperma) dan hormon seks jantan" },
      { part: "Kelenjar prostat", function: "Merembes cecair yang mengandungi nutrien dan melindungi sel sperma" }
    ],
    femaleParts: [
      { part: "Tiub fallopio", function: "Tempat persenyawaan antara sperma dan ovum berlaku" },
      { part: "Ovari", function: "Menghasilkan gamet betina (ovum) dan hormon seks betina" },
      { part: "Uterus (rahim)", function: "Tempat embrio berkembang dan membesar" },
      { part: "Serviks", function: "Menghasilkan mukus untuk membolehkan sperma berenang masuk ke uterus" },
      { part: "Vagina", function: "Menerima sperma dan sebagai saluran kelahiran bayi" }
    ]
  },
  puberty: {
    definition: "Akil baligh ialah peringkat awal kematangan sistem pembiakan, di mana remaja mengalami perubahan emosi, fizikal dan fisiologi.",
    maleAge: "Kira-kira 14-17 tahun",
    femaleAge: "Kira-kira 10-12 tahun",
    maleChanges: [
      { category: "Suara", changes: ["Kotak suara (larinks) membesar", "Suara menjadi lebih berat"] },
      { category: "Badan", changes: ["Misai dan janggut mula tumbuh", "Rambut tumbuh di muka, ketiak dan dada"] },
      { category: "Organ pembiakan", changes: ["Testis menghasilkan sperma dan hormon seks", "Rambut tumbuh di kawasan pubik", "Penis dan skrotum membesar"] }
    ],
    femaleChanges: [
      { category: "Badan", changes: ["Payudara membesar", "Pinggul menjadi lebih tegap dan luas", "Rambut tumbuh di ketiak"] },
      { category: "Organ pembiakan", changes: ["Ovari menghasilkan ovum dan hormon seks", "Rambut tumbuh di kawasan pubik", "Kitar haid bermula"] }
    ]
  },
  menstrualCycle: {
    definition: "Haid ialah peluruhan lapisan dinding uterus dan pengeluaran darah melalui vagina. Kitar haid merujuk kepada siri perubahan pada dinding uterus dan ovari, termasuk pembentukan dan pembebasan ovum matang.",
    controlledBy: "Otak dan sistem endokrin, yang merembes hormon",
    averageLength: "Purata 28 hari (berbeza mengikut individu)",
    affectingFactors: ["Pengambilan nutrien", "Perubahan mendadak berat badan", "Perubahan emosi", "Tekanan mental"],
    phases: [
      { days: "Hari 1-5", name: "Fasa haid", description: "Lapisan uterus meluruh dan dikeluarkan bersama darah, ovum tidak disenyawakan, dan mukus" },
      { days: "Hari 6-11", name: "Fasa pembaikan", description: "Lapisan uterus mula dibina semula dan menebal; saluran darah terbentuk, bersedia menerima implantasi ovum yang disenyawakan" },
      { days: "Hari 12-17", name: "Fasa subur", description: "Ovum dibebaskan daripada ovari pada hari ke-14 (ovulasi); lapisan uterus terus menebal; persenyawaan berkemungkinan berlaku jika sperma hadir" },
      { days: "Hari 18-28", name: "Fasa pramenstruasi", description: "Lapisan uterus terus menebal dengan bekalan darah yang kaya, bersedia untuk implantasi jika persenyawaan berlaku; kitar berulang jika tidak" }
    ],
    hygieneImportance: ["Tukar tuala wanita 3-4 kali sehari untuk mencegah jangkitan bakteria/virus dan UTI", "Mandi dengan kerap untuk membersihkan badan"],
    irregularMenstruation: {
      causes: ["Peningkatan berat badan", "Ketidakseimbangan hormon", "Gangguan emosi", "Senaman berlebihan", "Tumor serviks"],
      effects: ["Kemandulan — tanda awal masalah sistem pembiakan; rawatan lewat boleh membawa kepada kanser ovari/serviks/uterus", "Kesukaran perancangan keluarga kerana hari subur tidak jelas", "Masalah kesihatan seperti anemia akibat kehilangan darah berlebihan"]
    }
  },
  fertilisationAndPregnancy: {
    process: [
      "Sperma berenang masuk ke dalam vagina semasa persetubuhan",
      "Jika ovum hadir dalam tiub fallopio, sperma bercantum dengannya membentuk zigot",
      "Zigot membahagi dan menjadi bebola sel yang dikenali sebagai embrio",
      "Embrio tertanam pada dinding uterus di dalam rahim",
      "Embrio yang tertanam berkembang menjadi fetus selama kira-kira 38 minggu sehingga kelahiran"
    ],
    foetalDevelopment: [
      { weeks: "Minggu 1-4", description: "Tangan dan kaki mula terbentuk; embrio mempunyai ekor kecil" },
      { weeks: "Minggu 7-9", description: "Hidung, telinga dan jari kelihatan" },
      { weeks: "Minggu 10-19", description: "Embrio mula kelihatan seperti bayi dan kini dipanggil fetus" },
      { weeks: "Minggu 20-37", description: "Fetus menyerupai bayi" },
      { weeks: "Minggu 38-40", description: "Fetus terbentuk sepenuhnya; kepala mendap ke serviks; otot uterus mengecut kuat, amnion pecah, cecair amnion terkeluar; fetus tertolak keluar melalui vagina" }
    ],
    placentaFunction: "Terdiri daripada tisu ibu dan embrio; tempat pertukaran oksigen/karbon dioksida, bekalan nutrien, dan penyingkiran bahan buangan antara darah ibu dan fetus",
    umbilicalCordFunction: "Tiub yang menghubungkan fetus ke plasenta, mengandungi saluran darah yang mengangkut darah ke dan daripada fetus",
    amnionFunction: "Membran yang membentuk kantung berisi cecair amnion, melindungi fetus",
    amnioticFluidFunction: "Bertindak sebagai bantalan, menyerap hentakan dan melindungi fetus daripada kecederaan"
  },
  foetalDevelopmentFactors: {
    nutrientNeeds: [
      { nutrient: "Serat", examples: "Bijirin, sayur-sayuran, buah-buahan", fn: "Mencegah sembelit" },
      { nutrient: "Zat besi", examples: "Hati, daging merah, ikan", fn: "Pembentukan hemoglobin untuk mencegah anemia" },
      { nutrient: "Karbohidrat & lemak", examples: "Nasi, roti, mentega, keju", fn: "Membekalkan tenaga untuk aktiviti harian" },
      { nutrient: "Vitamin C", examples: "Buah sitrus, jambu, tomato", fn: "Kesihatan kulit fetus dan ibu; mencegah gusi berdarah" },
      { nutrient: "Asid folik", examples: "Brokoli, bayam, kacang tanah", fn: "Penting untuk perkembangan sistem saraf fetus" },
      { nutrient: "Protein", examples: "Ayam, daging merah, ikan, susu, keju", fn: "Penting untuk pertumbuhan sel baharu fetus" },
      { nutrient: "Kalsium & fosforus", examples: "Ikan bilis, keju, susu", fn: "Pembentukan tulang fetus yang sihat; melindungi tulang dan gigi ibu" }
    ],
    harmfulSubstances: [
      { substance: "Rokok", effects: ["Berat lahir rendah", "Kadar kematian lebih tinggi", "Kerencatan dan ketidakupayaan fizikal", "Kelahiran pramatang", "Kemungkinan keguguran"] },
      { substance: "Minuman beralkohol", effects: ["Sindrom Alkohol Fetal (berat lahir rendah, saiz kepala kecil, kerencatan, kecacatan wajah)", "Perkembangan fetus terencat", "Kerosakan otak, sistem saraf dan jantung"] },
      { substance: "Dadah", effects: ["Kecacatan fetus mungkin berlaku"] }
    ],
    breastfeedingBenefits: ["Mengandungi semua nutrien penting untuk bayi", "Mengandungi antibodi yang melindungi daripada penyakit tertentu", "Mengukuhkan ikatan emosi ibu-bayi", "Pencernaan lebih baik berbanding susu formula"]
  },
  infertility: {
    definition: "Kemandulan ialah ketidakupayaan untuk menghasilkan zuriat — suami, isteri, atau kedua-duanya mungkin mandul.",
    maleFactors: ["Testis tidak dapat menghasilkan sperma", "Kiraan sperma rendah", "Menghasilkan sperma berkualiti rendah", "Kelemahan tenaga batin", "Ketidakseimbangan hormon", "Organ pembiakan tidak sempurna atau dijangkiti penyakit"],
    femaleFactors: ["Ovari tidak dapat menghasilkan ovum", "Penyumbatan tiub fallopio", "Uterus tidak normal", "Tumor dalam uterus", "Ketidakseimbangan hormon", "Masalah kesihatan seperti diabetes"],
    treatments: [
      { name: "Rawatan hormon", description: "Sesuai untuk individu dengan hormon tidak seimbang" },
      { name: "Pembedahan", description: "Untuk wanita dengan penyumbatan tiub fallopio, atau lelaki dengan penyumbatan vas deferens" },
      { name: "Persenyawaan in vitro (IVF)", description: "Untuk wanita dengan penyumbatan tiub fallopio — ovum disenyawakan dengan sperma di luar badan dalam piring kaca, kemudian embrio diletakkan dalam uterus" }
    ],
    contraceptionMethods: [
      { name: "Pil perancang", description: "Mencegah ovulasi" },
      { name: "Implan", description: "Merembes hormon yang mencegah ovari daripada menghasilkan ovum" },
      { name: "Kondom", description: "Dipakai pada penis untuk mengelakkan sperma memasuki vagina semasa ejakulasi" },
      { name: "Peranti Intrauterus (IUCD)", description: "Dimasukkan ke dalam uterus untuk mencegah implantasi" },
      { name: "Vasektomi", description: "Pembedahan memotong dan mengikat vas deferens, mencegah pengangkutan sperma ke uretra" },
      { name: "Ligasi", description: "Pembedahan memotong dan mengikat tiub fallopio, mencegah ovum bertemu sperma" }
    ],
    healthScreeningImportance: ["Mengesan simptom awal penyakit kronik", "Kanser sistem pembiakan (uterus, serviks, prostat) masih boleh dirawat jika dikesan awal", "Mengurangkan risiko masalah kesihatan yang memerlukan rawatan kos tinggi", "Membolehkan pemahaman kaedah kontraseptif yang selamat melalui rundingan doktor"]
  },
  plantReproduction: {
    flowerParts: [
      { part: "Stamen (anter + filamen)", function: "Organ pembiakan jantan" },
      { part: "Pistil (stigma + tangkai putik + ovari + ovul)", function: "Organ pembiakan betina" },
      { part: "Petal", function: "Biasanya berwarna-warni untuk menarik serangga dan haiwan" },
      { part: "Sepal", function: "Biasanya berwarna hijau; melindungi bunga semasa peringkat kudup" }
    ],
    flowerTypes: {
      bisexual: "Mempunyai organ pembiakan jantan (stamen) dan betina (pistil) dalam bunga yang sama — kebanyakan bunga adalah biseksual",
      unisexual: "Bunga tidak lengkap yang hanya mempunyai stamen atau pistil sahaja",
      unisexualExamples: ["Jagung (bunga jantan dan betina berasingan)", "Betik (hanya bunga betina menghasilkan buah dan biji)"]
    },
    pollinationDefinition: "Pendebungaan ialah proses pemindahan butir debunga matang daripada anter ke stigma. Anter matang pecah dan menyebarkan butir debunga, yang jatuh ke tanah atau dibawa oleh agen pendebungaan ke stigma.",
    pollinationTypes: {
      self: "Butir debunga dipindahkan ke stigma bunga yang sama, atau bunga lain pada tumbuhan yang sama",
      cross: "Butir debunga dipindahkan ke stigma bunga pada tumbuhan lain daripada spesies yang sama"
    },
    pollinatingAgents: [
      { agent: "Haiwan dan serangga", mechanism: "Debunga melekat pada paruh, badan, atau kaki berbulu haiwan/serangga semasa menghisap nektar, kemudian berpindah ke bunga seterusnya", flowerCharacteristics: ["Petal besar dan berwarna-warni", "Mempunyai nektar dan bau yang wangi", "Menghasilkan butir debunga yang kasar dan melekit"], examples: ["Durian", "Rambutan", "Betik", "Bunga raya", "Bunga matahari", "Ros"] },
      { agent: "Angin", mechanism: "Butir debunga yang ringan ditiup angin untuk sampai ke stigma bunga lain", flowerCharacteristics: ["Petal putih atau pucat", "Stigma panjang dan berbulu", "Banyak butir debunga yang kecil, licin dan ringan", "Filamen dan tangkai putik yang panjang"], examples: ["Jagung", "Rumput", "Padi"] }
    ],
    crossPollinationAdvantages: ["Tumbuhan lebih sihat yang menyesuaikan diri lebih baik dengan perubahan persekitaran", "Tumbuhan baharu lebih tahan terhadap perosak dan penyakit", "Varieti tumbuhan baharu", "Biji benih berkualiti baik"],
    seedParts: [
      { part: "Testa", function: "Melindungi biji benih" },
      { part: "Hilum", function: "Tempat biji benih melekat pada buah" },
      { part: "Mikropil", function: "Lubang kecil membolehkan udara dan air memasuki biji benih" },
      { part: "Plumul", function: "Bahagian embrio yang berkembang menjadi pucuk baharu" },
      { part: "Radikal", function: "Bahagian embrio yang berkembang menjadi akar" },
      { part: "Kotiledon / Endosperma", function: "Menyimpan dan membekalkan makanan untuk biji benih" }
    ],
    seedTypes: {
      monocotyledonous: "Satu kotiledon — contoh: bijirin jagung",
      dicotyledonous: "Dua kotiledon — contoh: kacang hijau"
    },
    germinationTypes: {
      epigeal: "Kotiledon terangkat keluar dari tanah semasa percambahan",
      hypogeal: "Kotiledon kekal di dalam tanah semasa percambahan"
    },
    germinationConditions: ["Air", "Udara", "Suhu yang sesuai"]
  },
  keyExamFacts: [
    "Pembiakan seks melibatkan gamet daripada dua induk; pembiakan aseks melibatkan satu induk tanpa gamet",
    "Lima jenis pembiakan aseks ialah pembelahan dedua, percambahan, regenerasi, pembentukan spora, dan pembiakan vegetatif",
    "Kitar haid wanita purata 28 hari merangkumi fasa haid, pembaikan, subur, dan pramenstruasi",
    "Ovulasi berlaku kira-kira hari ke-14 kitar haid",
    "Selepas persenyawaan, zigot menjadi embrio, tertanam dalam uterus, dan berkembang menjadi fetus selama ~38 minggu",
    "Plasenta menukar oksigen, nutrien dan bahan buangan antara ibu dan fetus; tali pusat mengangkut ini",
    "Merokok, alkohol, dan dadah semasa mengandung membawa risiko serius tertentu kepada perkembangan fetus",
    "Kaedah kontraseptif termasuk pil, implan, kondom, IUCD, vasektomi, dan ligasi",
    "Bunga didebungakan oleh haiwan/serangga atau angin, masing-masing menyukai ciri bunga yang berbeza",
    "Biji benih bercambah dengan air, udara, dan suhu sesuai; percambahan epigeal mengangkat kotiledon ke atas tanah, hipogeal mengekalkannya di bawah"
  ],
  keyTerms: [
    "Pembiakan", "Pembiakan seks", "Pembiakan aseks", "Gamet", "Zigot",
    "Persenyawaan", "Akil baligh", "Haid", "Kitar haid", "Ovulasi",
    "Embrio", "Fetus", "Plasenta", "Tali pusat", "Amnion", "Cecair amnion",
    "Kemandulan", "Kontraseptif", "Pendebungaan", "Pendebungaan sendiri", "Pendebungaan kacukan",
    "Percambahan", "Kotiledon", "Testa"
  ],
  chapterSummary: "Bab 4 merangkumi pembiakan dalam manusia, haiwan dan tumbuhan — pembiakan seks berbanding aseks dan lima jenis aseks, sistem pembiakan lelaki dan perempuan manusia, akil baligh, kitar haid, persenyawaan dan perkembangan fetus sehingga kelahiran, faktor yang mempengaruhi kesihatan fetus, kemandulan dan kaedah kontraseptif, serta pembiakan tumbuhan daripada struktur bunga melalui pendebungaan, persenyawaan, pembentukan biji benih, dan percambahan."
};

export const chapter4Content = { en, bm };
export default chapter4Content;
