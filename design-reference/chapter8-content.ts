// chapter8-content.ts
// Source-verified content for Chapter 8 / Bab 8 — Light and Optics / Cahaya dan Optik
// EN sourced from T1_BT_SN_DLP-_SCIENCE.pdf (pages 220-250)
// BM sourced from T1_BT_SN-_SAINS.pdf (pages 220-250, official KSSM counterpart)
// Content data only — no presentation markup.

export interface MirrorType {
  name: string;
  imageCharacteristics: string[];
  uses: string[];
}

export interface OpticalInstrument {
  name: string;
  howItWorks: string;
}

export interface RefractionCase {
  scenario: string;
  behavior: string;
}

export interface ColorMix {
  color1: string;
  color2: string;
  result: string;
}

export interface Chapter8Content {
  hook: { title: string; body: string };
  mirrors: {
    realVsVirtual: { real: string; virtual: string };
    planeMirrorCharacteristics: string[];
    mirrorTypes: MirrorType[];
    lawOfReflection: { statement: string[]; keyEquation: string };
    opticalInstruments: OpticalInstrument[];
  };
  propertiesOfLight: {
    facts: string[];
    shadowFormation: string[];
  };
  refraction: {
    definition: string;
    cases: RefractionCase[];
    dailyLifeExamples: string[];
  };
  dispersion: {
    definition: string;
    spectrumOrder: string[];
    speedFact: string;
    rainbowFormation: string;
  };
  scattering: {
    definition: string;
    middayExplanation: string;
    sunsetExplanation: string;
  };
  colorAdditionSubtraction: {
    primaryColors: string[];
    secondaryColors: string[];
    additionFormula: ColorMix[];
    allThreeMixed: string;
    subtractionPrinciple: string;
    subtractionExamples: { object: string; reflects: string; absorbs: string }[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Chapter8Content = {
  hook: {
    title: "Why this matters",
    body: "Why does the sky turn red at sunset? Why does a straight pencil look bent in water? Why can a submarine see the surface? Every one of these everyday mysteries has a precise, drawable explanation — and this chapter gives you the ray diagrams to prove it."
  },
  mirrors: {
    realVsVirtual: {
      real: "An image that forms on a screen",
      virtual: "An image that cannot be formed on a screen — our reflection forms behind the mirror, not on its surface, so a plane mirror always produces a virtual image"
    },
    planeMirrorCharacteristics: ["Upright", "Laterally inverted", "Same size as the object", "Virtual", "Same distance behind the mirror as the object is in front"],
    mirrorTypes: [
      { name: "Plane mirror", imageCharacteristics: ["Upright, virtual, same size, laterally inverted"], uses: ["Helps a dancer correct movement", "Makes a living room look spacious", "Used in periscopes and kaleidoscopes"] },
      { name: "Concave mirror", imageCharacteristics: ["Magnifies the image, makes it look bigger and closer"], uses: ["Applying makeup (magnified image)", "Dentists viewing patients' teeth"] },
      { name: "Convex mirror", imageCharacteristics: ["Wider field of view, smaller image"], uses: ["Safety feature at dangerous road corners", "Supermarket theft prevention", "Fitted on bicycles to see behind"] }
    ],
    lawOfReflection: {
      statement: ["The incident ray, reflected ray, and normal line all lie on the same plane", "The angle of incidence (i) is equal to the angle of reflection (r)"],
      keyEquation: "i = r"
    },
    opticalInstruments: [
      { name: "Periscope", howItWorks: "Uses two mirrors angled at 45°. Light from the sea surface hits the top mirror and reflects down to a second mirror, then into the observer's eye — used in submarines" },
      { name: "Kaleidoscope", howItWorks: "Uses three mirror strips joined into a triangular prism. Repeated reflection of objects inside creates more images than actual objects, forming patterns" }
    ]
  },
  propertiesOfLight: {
    facts: ["The speed of light is 3.0 × 10⁸ m/s — much faster than sound, which is why we see lightning before we hear thunder", "Light travels in straight lines"],
    shadowFormation: ["Light travels in straight lines", "An opaque object blocks light from passing through it", "A shadow forms behind the opaque object where light is blocked"]
  },
  refraction: {
    definition: "Refraction of light is the change in direction of light as it travels through two mediums of different densities.",
    cases: [
      { scenario: "Light moves from a more dense medium (water) to a less dense medium (air)", behavior: "The light ray is refracted away from the normal" },
      { scenario: "Light moves from a less dense medium (air) to a more dense medium (water)", behavior: "The light ray is refracted towards the normal" },
      { scenario: "Incident ray is parallel to the normal (either direction)", behavior: "The light ray is not refracted at all — it continues straight through" }
    ],
    dailyLifeExamples: ["A fish in a pond appears much closer to the surface than its actual location", "A pencil looks bent in a glass of water", "A swimming pool appears shallower than it actually is"]
  },
  dispersion: {
    definition: "Dispersion is the separation of white light into its component colours as it passes through a medium like a glass prism, because each colour travels at a different speed and bends at a different angle.",
    spectrumOrder: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
    speedFact: "Red light has the highest speed and is refracted the least. Violet light has the lowest speed and is refracted the most.",
    rainbowFormation: "When sunlight enters rain droplets in the sky, white light is refracted and dispersed into seven colours, forming a rainbow."
  },
  scattering: {
    definition: "Scattering of light occurs when light is reflected in all directions by clouds or particles in the air.",
    middayExplanation: "During midday, blue light is scattered the most in all directions by tiny particles in the atmosphere, making the sky look blue.",
    sunsetExplanation: "During sunset, the sun is at the horizon, so light travels through more atmosphere. Red and orange light are scattered less and reach your eyes directly, while blue light scatters away — making the sky look reddish."
  },
  colorAdditionSubtraction: {
    primaryColors: ["Red", "Blue", "Green"],
    secondaryColors: ["Cyan", "Yellow", "Magenta"],
    additionFormula: [
      { color1: "Red", color2: "Blue", result: "Magenta" },
      { color1: "Red", color2: "Green", result: "Yellow" },
      { color1: "Blue", color2: "Green", result: "Cyan" }
    ],
    allThreeMixed: "Red + Blue + Green = White",
    subtractionPrinciple: "The colour of an opaque object depends on which colour of light it reflects into our eyes — that colour is reflected, and all other colours are absorbed by the object.",
    subtractionExamples: [
      { object: "Banana", reflects: "Yellow light", absorbs: "All other colours" },
      { object: "Strawberry", reflects: "Red light", absorbs: "All other colours" },
      { object: "Leaf", reflects: "Green light", absorbs: "All other colours" }
    ]
  },
  keyExamFacts: [
    "A plane mirror produces a virtual, upright, laterally inverted image of the same size, at the same distance behind the mirror as the object is in front",
    "Concave mirrors magnify; convex mirrors give a wider field of view with a smaller image",
    "The Law of Reflection: the angle of incidence equals the angle of reflection (i = r)",
    "Light refracts away from the normal going from a denser to a less dense medium, and towards the normal going the other way",
    "White light disperses into red, orange, yellow, green, blue, indigo, violet — red bends least, violet bends most",
    "Scattering explains why the sky is blue at midday and reddish at sunset",
    "Red, blue and green are primary colours; mixing any two produces magenta, yellow, or cyan; all three make white",
    "An opaque object's colour is the colour of light it reflects — all other colours are absorbed"
  ],
  keyTerms: [
    "Real image", "Virtual image", "Plane mirror", "Concave mirror", "Convex mirror",
    "Law of Reflection", "Angle of incidence", "Angle of reflection", "Periscope",
    "Kaleidoscope", "Refraction", "Normal line", "Dispersion", "Spectrum",
    "Scattering", "Primary colour", "Secondary colour", "Addition of light", "Subtraction of light"
  ],
  chapterSummary: "Chapter 8 explains how light behaves through mirrors, refraction, dispersion, scattering, and colour mixing — covering the characteristics of images in plane, concave and convex mirrors, the Law of Reflection, how refraction bends light between different-density mediums, how dispersion splits white light into a spectrum, why scattering makes the sky blue or red, and how primary colours combine or get absorbed to produce every colour we see."
};

const bm: Chapter8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kenapa langit bertukar merah waktu matahari terbenam? Kenapa pensel yang lurus kelihatan bengkok di dalam air? Bagaimana kapal selam dapat melihat permukaan laut? Setiap misteri harian ini mempunyai penjelasan yang tepat dan boleh dilukis — dan bab ini memberi anda gambar rajah sinar untuk membuktikannya."
  },
  mirrors: {
    realVsVirtual: {
      real: "Imej yang terbentuk pada skrin",
      virtual: "Imej yang tidak dapat dibentuk pada skrin — pantulan kita terbentuk di belakang cermin, bukan pada permukaannya, jadi cermin satah sentiasa menghasilkan imej maya"
    },
    planeMirrorCharacteristics: ["Tegak", "Berbalik sisi", "Sama saiz dengan objek", "Maya", "Jarak di belakang cermin sama dengan jarak objek di hadapan"],
    mirrorTypes: [
      { name: "Cermin satah", imageCharacteristics: ["Tegak, maya, sama saiz, berbalik sisi"], uses: ["Membantu penari membetulkan pergerakan", "Menjadikan ruang tamu kelihatan luas", "Digunakan dalam periskop dan kaleidoskop"] },
      { name: "Cermin cekung", imageCharacteristics: ["Membesarkan imej, menjadikannya kelihatan lebih besar dan dekat"], uses: ["Menyapu solek (imej dibesarkan)", "Doktor gigi melihat gigi pesakit"] },
      { name: "Cermin cembung", imageCharacteristics: ["Medan pandangan lebih luas, imej lebih kecil"], uses: ["Ciri keselamatan di selekoh jalan berbahaya", "Pencegahan kecurian di pasar raya", "Dipasang pada basikal untuk melihat ke belakang"] }
    ],
    lawOfReflection: {
      statement: ["Sinar tuju, sinar pantulan, dan garis normal semuanya terletak pada satah yang sama", "Sudut tuju (i) adalah sama dengan sudut pantulan (r)"],
      keyEquation: "i = r"
    },
    opticalInstruments: [
      { name: "Periskop", howItWorks: "Menggunakan dua cermin bersudut 45°. Cahaya dari permukaan laut mengenai cermin atas dan terpantul turun ke cermin kedua, kemudian ke mata pemerhati — digunakan dalam kapal selam" },
      { name: "Kaleidoskop", howItWorks: "Menggunakan tiga jalur cermin digabungkan membentuk prisma segi tiga. Pantulan berulang objek di dalamnya mencipta lebih banyak imej daripada objek sebenar, membentuk corak" }
    ]
  },
  propertiesOfLight: {
    facts: ["Kelajuan cahaya ialah 3.0 × 10⁸ m/s — jauh lebih laju daripada bunyi, itulah sebabnya kita melihat kilat sebelum mendengar guruh", "Cahaya bergerak dalam garis lurus"],
    shadowFormation: ["Cahaya bergerak dalam garis lurus", "Objek legap menghalang cahaya daripada menembusinya", "Bayang-bayang terbentuk di belakang objek legap di mana cahaya dihalang"]
  },
  refraction: {
    definition: "Pembiasan cahaya ialah perubahan arah cahaya semasa ia bergerak melalui dua medium yang berbeza ketumpatan.",
    cases: [
      { scenario: "Cahaya bergerak daripada medium lebih tumpat (air) ke medium kurang tumpat (udara)", behavior: "Sinar cahaya dibiaskan menjauhi garis normal" },
      { scenario: "Cahaya bergerak daripada medium kurang tumpat (udara) ke medium lebih tumpat (air)", behavior: "Sinar cahaya dibiaskan mendekati garis normal" },
      { scenario: "Sinar tuju selari dengan garis normal (mana-mana arah)", behavior: "Sinar cahaya tidak dibiaskan langsung — ia terus lurus" }
    ],
    dailyLifeExamples: ["Ikan dalam kolam kelihatan lebih dekat dengan permukaan berbanding lokasi sebenar", "Pensel kelihatan bengkok dalam segelas air", "Kolam renang kelihatan cetek berbanding kedalaman sebenar"]
  },
  dispersion: {
    definition: "Serakan cahaya ialah pemisahan cahaya putih kepada komponen warnanya semasa melalui medium seperti prisma kaca, kerana setiap warna bergerak pada kelajuan berbeza dan membias pada sudut berbeza.",
    spectrumOrder: ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Nila", "Ungu"],
    speedFact: "Cahaya merah mempunyai kelajuan tertinggi dan dibiaskan paling sedikit. Cahaya ungu mempunyai kelajuan terendah dan dibiaskan paling banyak.",
    rainbowFormation: "Apabila cahaya matahari memasuki titisan hujan di langit, cahaya putih dibiaskan dan diserakkan kepada tujuh warna, membentuk pelangi."
  },
  scattering: {
    definition: "Penyerakan cahaya berlaku apabila cahaya dipantulkan ke semua arah oleh awan atau zarah di udara.",
    middayExplanation: "Pada waktu tengah hari, cahaya biru diserakkan paling banyak ke semua arah oleh zarah halus dalam atmosfera, menjadikan langit kelihatan biru.",
    sunsetExplanation: "Pada waktu matahari terbenam, matahari berada di ufuk, jadi cahaya melalui lebih banyak atmosfera. Cahaya merah dan jingga kurang diserakkan dan sampai terus ke mata anda, manakala cahaya biru diserakkan — menjadikan langit kelihatan kemerahan."
  },
  colorAdditionSubtraction: {
    primaryColors: ["Merah", "Biru", "Hijau"],
    secondaryColors: ["Sian", "Kuning", "Magenta"],
    additionFormula: [
      { color1: "Merah", color2: "Biru", result: "Magenta" },
      { color1: "Merah", color2: "Hijau", result: "Kuning" },
      { color1: "Biru", color2: "Hijau", result: "Sian" }
    ],
    allThreeMixed: "Merah + Biru + Hijau = Putih",
    subtractionPrinciple: "Warna objek legap bergantung pada warna cahaya yang dipantulkan ke mata kita — warna itu dipantulkan, dan semua warna lain diserap oleh objek.",
    subtractionExamples: [
      { object: "Pisang", reflects: "Cahaya kuning", absorbs: "Semua warna lain" },
      { object: "Strawberi", reflects: "Cahaya merah", absorbs: "Semua warna lain" },
      { object: "Daun", reflects: "Cahaya hijau", absorbs: "Semua warna lain" }
    ]
  },
  keyExamFacts: [
    "Cermin satah menghasilkan imej maya, tegak, berbalik sisi, sama saiz, pada jarak yang sama di belakang cermin seperti objek di hadapan",
    "Cermin cekung membesarkan imej; cermin cembung memberi medan pandangan lebih luas dengan imej lebih kecil",
    "Hukum Pantulan: sudut tuju sama dengan sudut pantulan (i = r)",
    "Cahaya dibiaskan menjauhi normal apabila bergerak dari medium tumpat ke kurang tumpat, dan mendekati normal sebaliknya",
    "Cahaya putih terserak kepada merah, jingga, kuning, hijau, biru, nila, ungu — merah membias paling sedikit, ungu paling banyak",
    "Penyerakan menjelaskan kenapa langit biru pada tengah hari dan kemerahan waktu matahari terbenam",
    "Merah, biru dan hijau ialah warna primer; mencampur mana-mana dua menghasilkan magenta, kuning, atau sian; ketiga-tiganya menghasilkan putih",
    "Warna objek legap ialah warna cahaya yang dipantulkannya — semua warna lain diserap"
  ],
  keyTerms: [
    "Imej nyata", "Imej maya", "Cermin satah", "Cermin cekung", "Cermin cembung",
    "Hukum Pantulan", "Sudut tuju", "Sudut pantulan", "Periskop",
    "Kaleidoskop", "Pembiasan", "Garis normal", "Serakan cahaya", "Spektrum",
    "Penyerakan cahaya", "Warna primer", "Warna sekunder", "Penambahan cahaya", "Penolakan cahaya"
  ],
  chapterSummary: "Bab 8 menerangkan bagaimana cahaya berkelakuan melalui cermin, pembiasan, serakan, penyerakan, dan percampuran warna — merangkumi ciri-ciri imej dalam cermin satah, cekung dan cembung, Hukum Pantulan, cara pembiasan membengkokkan cahaya antara medium berlainan ketumpatan, cara serakan memisahkan cahaya putih kepada spektrum, sebab penyerakan menjadikan langit biru atau merah, dan cara warna primer bergabung atau diserap untuk menghasilkan setiap warna yang kita lihat."
};

export const chapter8Content = { en, bm };
export default chapter8Content;
