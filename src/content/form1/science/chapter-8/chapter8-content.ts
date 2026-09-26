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

export interface MirrorActivity {
  title: string;
  aim: string;
  materials: string[];
  instructions: string[];
  questions: string[];
}
export interface MirrorLesson {
  labels: Record<
    | "real"
    | "virtual"
    | "materials"
    | "instructions"
    | "questions"
    | "shapes"
    | "object"
    | "image"
    | "mirror"
    | "screen"
    | "blackCard"
    | "pinhole"
    | "pin"
    | "candle"
    | "graph"
    | "distance"
    | "applications"
    | "reflectingSurface"
    | "periscopePath"
    | "beads"
    | "reflections"
    | "scienceInLife"
    | "problem"
    | "solution"
    | "reason"
    | "showAnswer"
    | "rotate"
    | "compare"
    | "measurements",
    string
  >;
  planeVirtual: string;
  sizes: string[];
  activity81: MirrorActivity;
  activity82: MirrorActivity;
  activity83: MirrorActivity;
  activity84: MirrorActivity;
  activity85: MirrorActivity;
  knifeWarning: string;
  periscopeMeasurements: string[];
  life: { problem: string; solution: string; reason: string; instrument: string }[];
  practice: { title: string; questions: string[] };
}

export interface Chapter8Content {
  title: string;
  subtopics: { code: string; title: string }[];
  reflection: { lawOfReflection: { statement: string[]; keyEquation: string } };
  hook: { title: string; body: string };
  mirrors: {
    realVsVirtual: { real: string; virtual: string };
    planeMirrorCharacteristics: string[];
    mirrorTypes: MirrorType[];
    lesson: MirrorLesson;
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
    body: "Why does the sky turn red at sunset? Why does a straight pencil look bent in water? Why can a submarine see the surface? Every one of these everyday mysteries has a precise, drawable explanation — and this chapter gives you the ray diagrams to prove it.",
  },
  title: "Light and Optics",
  subtopics: [
    {
      code: "8.1",
      title: "The Use of Mirrors",
    },
    {
      code: "8.2",
      title: "Properties of Light",
    },
    {
      code: "8.3",
      title: "Reflection of Light",
    },
    {
      code: "8.4",
      title: "Refraction of Light",
    },
    {
      code: "8.5",
      title: "Dispersion of Light",
    },
    {
      code: "8.6",
      title: "Scattering of Light",
    },
    {
      code: "8.7",
      title: "Addition and Subtraction of Light",
    },
  ],
  reflection: {
    lawOfReflection: {
      statement: [
        "The incident ray, reflected ray, and normal line all lie on the same plane",
        "The angle of incidence (i) is equal to the angle of reflection (r)",
      ],
      keyEquation: "i = r",
    },
  },
  mirrors: {
    realVsVirtual: {
      real: "A real image is an image that forms on a screen.",
      virtual: "A virtual image is an image that cannot be formed on a screen.",
    },
    planeMirrorCharacteristics: [
      "Upright",
      "Laterally inverted",
      "Same size as the object",
      "Virtual",
      "The object distance is equal to the image distance in a plane mirror",
    ],
    mirrorTypes: [
      {
        name: "Plane mirror",
        imageCharacteristics: [
          "Upright",
          "Laterally inverted",
          "Same size as the object",
          "Virtual",
          "The object distance is equal to the image distance in a plane mirror",
        ],
        uses: [
          "A plane mirror helps a dancer to correct his movement.",
          "A plane mirror makes a living room look spacious.",
        ],
      },
      {
        name: "Concave mirror",
        imageCharacteristics: ["Bigger"],
        uses: [
          "A concave mirror helps to magnify the image to make it easier for someone to apply make up.",
          "A concave mirror is used by a dentist to see the patient’s teeth so that the image formed looks bigger and closer.",
        ],
      },
      {
        name: "Convex mirror",
        imageCharacteristics: ["Smaller"],
        uses: [
          "A convex mirror is used as a safety feature at dangerous corner of a road.",
          "Convex mirrors at the supermarket can help a shopkeeper to see every corner of the supermarket to prevent theft.",
        ],
      },
    ],
    opticalInstruments: [
      {
        name: "Periscope",
        howItWorks:
          "Periscope is an instrument used in submarines to observe the sea surface. Periscope works by using the concept of reflection of light. Light from the sea surface is hit through the top mirror and is reflected. The light is then reflected again at the second mirror, right into the eye of the observer in the submarine.",
      },
      {
        name: "Kaleidoscope",
        howItWorks:
          "Kaleidoscope is a toy made using plane mirrors. These patterns are obtained due to the repeated reflection of the image of the objects inside the kaleidoscope. Therefore, the number of images seen is more than the number of objects.",
      },
    ],
    lesson: {
      labels: {
        real: "Real image",
        virtual: "Virtual image",
        materials: "Materials and apparatus",
        instructions: "Instruction",
        questions: "Questions",
        shapes: "Types of mirrors",
        object: "Object",
        image: "Image",
        mirror: "Mirror",
        screen: "White cardboard as screen",
        blackCard: "Black cardboard",
        pinhole: "Pinhole",
        pin: "Pin",
        candle: "Candle",
        graph: "Graph paper",
        distance: "Object distance = Image distance",
        applications: "Usage of Plane Mirror, Concave Mirror and Convex Mirror",
        reflectingSurface: "Surface of mirror",
        periscopePath: "Object → Mirror → Mirror → Eye of the observer",
        beads: "Colourful beads",
        reflections: "Repeated reflection",
        scienceInLife: "Science in Life",
        problem: "Situation",
        solution: "Solution",
        reason: "Reason",
        showAnswer: "Show answer",
        rotate: "Rotate",
        compare: "Image formed",
        measurements: "Measurements",
      },
      planeVirtual:
        "Our image forms behind the mirror, not on the mirror screen. Therefore, the image formed by a plane mirror is a virtual image.",
      sizes: ["Same size", "Bigger", "Smaller"],
      activity81: {
        title: "Activity 8.1",
        aim: "To study the difference between real image and virtual image",
        materials: [
          "A piece of black A4 cardboard",
          "A piece of white A4 cardboard",
          "Candle",
          "Pin",
          "Mirror",
        ],
        instructions: [
          "Use a pin to pierce a hole in a black A4 cardboard.",
          "Arrange the materials and apparatus as in Figure 8.1. Use a white A4 cardboard as a screen where the image will be formed.",
          "Observe the image formed on the second cardboard which is used as a screen.",
          "Choose a student to stand in front of a mirror as shown in Figure 8.2. Observe the image formed.",
        ],
        questions: [
          "Is the image formed in Figure 8.1 real or virtual?",
          "Compare the characteristics of the image formed in Figure 8.1 with Figure 8.2.",
        ],
      },
      activity82: {
        title: "Activity 8.2",
        aim: "To determine the characteristics of the image formed by a plane mirror, concave mirror and convex mirror",
        materials: ["Plane mirror", "Concave mirror", "Convex mirror", "Candle", "Graph paper"],
        instructions: [
          "Place a candle on a piece of graph paper in front of a plane mirror as shown in Figure 8.4.",
          "Observe the image formed. Is the image the same size, smaller or bigger than the object?",
          "Repeat steps 1 and 2 by replacing the plane mirror with a concave mirror and a convex mirror.",
          "Record the results in a table.",
          "Then, measure the distance of the image from the plane mirror.",
        ],
        questions: [
          "Compare the size of the image formed in the mirrors with the size of the object.",
          "Compare the distance of the image formed in the plane mirror with the distance of the object.",
        ],
      },
      activity83: {
        title: "Activity 8.3",
        aim: "To discuss the usage of plane mirrors, concave mirrors and convex mirrors",
        materials: [],
        instructions: [
          "Work in groups.",
          "Discuss the usage of plane mirrors, concave mirrors and convex mirrors.",
          "Present your discussion using multimedia presentation.",
        ],
        questions: [],
      },
      activity84: {
        title: "Activity 8.4",
        aim: "To create a simple periscope",
        materials: ["Two plane mirrors", "Box", "Knife"],
        instructions: [
          "Cut the side of the upper and lower box to fit the width of the mirror.",
          "Place the mirrors facing each other.",
          "Make two holes exactly opposite each mirror.",
          "Place the object to be viewed in front of Hole 1.",
        ],
        questions: [],
      },
      knifeWarning: "Be careful when using knives to prevent injuries.",
      periscopeMeasurements: ["Box: 30 cm × 10 cm × 15 cm", "Plane mirrors: 15 cm × 14 cm"],
      activity85: {
        title: "Activity 8.5",
        aim: "To build a kaleidoscope",
        materials: [
          "One kitchen towel roll",
          "Three pieces of mirror cards",
          "Colourful beads",
          "Two pieces of plastic discs",
          "Scissors",
          "Glue",
          "Cellophane tape",
          "Colourful paper for decoration",
          "Round black cardboard",
        ],
        instructions: [
          "Prepare the materials and apparatus as shown in Figure 8.8.",
          "Prepare three pieces of mirror cards. Each one is 4.3 cm in width and 21 cm in length.",
          "Stick the three pieces of the mirror cards with cellophane tape to make a triangle prism. Make sure the shiny surface is facing inward.",
          "Push the triangle prism into the empty roll (Figure 8.9(a)).",
          "Cut two pieces of round plastic discs with a diameter of 5.3 cm respectively.",
          "Attach the first plastic disc on one end of the roll, A (Figure 8.9(b)). Push the first plastic disc into the roll until it touches the triangle prism.",
          "Add colourful beads on the surface of the first plastic disc (Figure 8.10(a)). Attach the second plastic disc to cover the colourful beads (Figure 8.10(b)).",
          "At the other end of the kitchen towel roll, B, attach a round black cardboard which has a diameter of 5.3 cm and make a hole on it (Figure 8.11).",
          "Decorate the kitchen towel roll with colourful papers according to your creativity.",
          "Look at the pattern of the colourful beads formed through the hole.",
        ],
        questions: [],
      },
      life: [
        {
          problem: "It is good if I can see things behind me to avoid accidents.",
          solution: "You can fix a convex mirror on the bike to see things behind you.",
          reason: "See things behind you",
          instrument: "convex",
        },
        {
          problem: "How do I see the scenery behind this wall?",
          solution: "Well, a periscope can help me.",
          reason: "See the scenery behind this wall",
          instrument: "periscope",
        },
        {
          problem:
            "It is dangerous to walk on this path because we cannot see anything around the corner.",
          solution: "We can fix convex mirrors at dangerous corners.",
          reason: "See around the corner",
          instrument: "convex",
        },
      ],
      practice: {
        title: "Formative Practice 8.1",
        questions: [
          "The picture shows a man standing in front of a mirror. What type of mirror is it? State the characteristic of the image formed.",
          "What is the function of plane mirrors in a periscope?",
          "Why do we need plane mirrors in a lift?",
        ],
      },
    },
  },
  propertiesOfLight: {
    facts: [
      "The speed of light is 3.0 × 10⁸ m/s — much faster than sound, which is why we see lightning before we hear thunder",
      "Light travels in straight lines",
    ],
    shadowFormation: [
      "Light travels in straight lines",
      "An opaque object blocks light from passing through it",
      "A shadow forms behind the opaque object where light is blocked",
    ],
  },
  refraction: {
    definition:
      "Refraction of light is the change in direction of light as it travels through two mediums of different densities.",
    cases: [
      {
        scenario: "Light moves from a more dense medium (water) to a less dense medium (air)",
        behavior: "The light ray is refracted away from the normal",
      },
      {
        scenario: "Light moves from a less dense medium (air) to a more dense medium (water)",
        behavior: "The light ray is refracted towards the normal",
      },
      {
        scenario: "Incident ray is parallel to the normal (either direction)",
        behavior: "The light ray is not refracted at all — it continues straight through",
      },
    ],
    dailyLifeExamples: [
      "A fish in a pond appears much closer to the surface than its actual location",
      "A pencil looks bent in a glass of water",
      "A swimming pool appears shallower than it actually is",
    ],
  },
  dispersion: {
    definition:
      "Dispersion is the separation of white light into its component colours as it passes through a medium like a glass prism, because each colour travels at a different speed and bends at a different angle.",
    spectrumOrder: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
    speedFact:
      "Red light has the highest speed and is refracted the least. Violet light has the lowest speed and is refracted the most.",
    rainbowFormation:
      "When sunlight enters rain droplets in the sky, white light is refracted and dispersed into seven colours, forming a rainbow.",
  },
  scattering: {
    definition:
      "Scattering of light occurs when light is reflected in all directions by clouds or particles in the air.",
    middayExplanation:
      "During midday, blue light is scattered the most in all directions by tiny particles in the atmosphere, making the sky look blue.",
    sunsetExplanation:
      "During sunset, the sun is at the horizon, so light travels through more atmosphere. Red and orange light are scattered less and reach your eyes directly, while blue light scatters away — making the sky look reddish.",
  },
  colorAdditionSubtraction: {
    primaryColors: ["Red", "Blue", "Green"],
    secondaryColors: ["Cyan", "Yellow", "Magenta"],
    additionFormula: [
      { color1: "Red", color2: "Blue", result: "Magenta" },
      { color1: "Red", color2: "Green", result: "Yellow" },
      { color1: "Blue", color2: "Green", result: "Cyan" },
    ],
    allThreeMixed: "Red + Blue + Green = White",
    subtractionPrinciple:
      "The colour of an opaque object depends on which colour of light it reflects into our eyes — that colour is reflected, and all other colours are absorbed by the object.",
    subtractionExamples: [
      { object: "Banana", reflects: "Yellow light", absorbs: "All other colours" },
      { object: "Strawberry", reflects: "Red light", absorbs: "All other colours" },
      { object: "Leaf", reflects: "Green light", absorbs: "All other colours" },
    ],
  },
  keyExamFacts: [
    "A plane mirror produces a virtual, upright, laterally inverted image of the same size, at the same distance behind the mirror as the object is in front",
    "Concave mirrors magnify; convex mirrors give a wider field of view with a smaller image",
    "The Law of Reflection: the angle of incidence equals the angle of reflection (i = r)",
    "Light refracts away from the normal going from a denser to a less dense medium, and towards the normal going the other way",
    "White light disperses into red, orange, yellow, green, blue, indigo, violet — red bends least, violet bends most",
    "Scattering explains why the sky is blue at midday and reddish at sunset",
    "Red, blue and green are primary colours; mixing any two produces magenta, yellow, or cyan; all three make white",
    "An opaque object's colour is the colour of light it reflects — all other colours are absorbed",
  ],
  keyTerms: [
    "Real image",
    "Virtual image",
    "Plane mirror",
    "Concave mirror",
    "Convex mirror",
    "Law of Reflection",
    "Angle of incidence",
    "Angle of reflection",
    "Periscope",
    "Kaleidoscope",
    "Refraction",
    "Normal line",
    "Dispersion",
    "Spectrum",
    "Scattering",
    "Primary colour",
    "Secondary colour",
    "Addition of light",
    "Subtraction of light",
  ],
  chapterSummary:
    "Chapter 8 explains how light behaves through mirrors, refraction, dispersion, scattering, and colour mixing — covering the characteristics of images in plane, concave and convex mirrors, the Law of Reflection, how refraction bends light between different-density mediums, how dispersion splits white light into a spectrum, why scattering makes the sky blue or red, and how primary colours combine or get absorbed to produce every colour we see.",
};

const bm: Chapter8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kenapa langit bertukar merah waktu matahari terbenam? Kenapa pensel yang lurus kelihatan bengkok di dalam air? Bagaimana kapal selam dapat melihat permukaan laut? Setiap misteri harian ini mempunyai penjelasan yang tepat dan boleh dilukis — dan bab ini memberi anda gambar rajah sinar untuk membuktikannya.",
  },
  title: "Cahaya dan Optik",
  subtopics: [
    {
      code: "8.1",
      title: "Penggunaan Cermin",
    },
    {
      code: "8.2",
      title: "Sifat Cahaya",
    },
    {
      code: "8.3",
      title: "Pantulan Cahaya",
    },
    {
      code: "8.4",
      title: "Pembiasan Cahaya",
    },
    {
      code: "8.5",
      title: "Penyebaran Cahaya",
    },
    {
      code: "8.6",
      title: "Penyerakan Cahaya",
    },
    {
      code: "8.7",
      title: "Penambahan dan Penolakan Cahaya",
    },
  ],
  reflection: {
    lawOfReflection: {
      statement: [
        "Sinar tuju, sinar pantulan, dan garis normal semuanya terletak pada satah yang sama",
        "Sudut tuju (i) adalah sama dengan sudut pantulan (r)",
      ],
      keyEquation: "i = r",
    },
  },
  mirrors: {
    realVsVirtual: {
      real: "Imej sahih ialah imej yang terbentuk pada skrin.",
      virtual: "Imej maya ialah imej yang tidak dapat terbentuk pada skrin.",
    },
    planeMirrorCharacteristics: [
      "Tegak",
      "Songsang sisi",
      "Sama saiz dengan objek",
      "Maya",
      "Jarak objek adalah sama dengan jarak imej dalam cermin satah",
    ],
    mirrorTypes: [
      {
        name: "Cermin satah",
        imageCharacteristics: [
          "Tegak",
          "Songsang sisi",
          "Sama saiz dengan objek",
          "Maya",
          "Jarak objek adalah sama dengan jarak imej dalam cermin satah",
        ],
        uses: [
          "Cermin satah membantu penari untuk membetulkan pergerakannya.",
          "Cermin satah menjadikan ruang bilik kelihatan luas.",
        ],
      },
      {
        name: "Cermin cekung",
        imageCharacteristics: ["Lebih besar"],
        uses: [
          "Cermin cekung berfungsi untuk membesarkan imej bagi memudahkan seseorang untuk bersolek.",
          "Cermin cekung digunakan oleh doktor gigi untuk melihat gigi pesakit supaya imej yang terhasil kelihatan lebih besar dan dekat.",
        ],
      },
      {
        name: "Cermin cembung",
        imageCharacteristics: ["Lebih kecil"],
        uses: [
          "Cermin cembung membantu individu memantau keselamatan diri di selekoh jalan yang berbahaya.",
          "Cermin cembung di pasar raya dapat membantu pekedai untuk melihat setiap sudut pasar raya supaya dapat mengelakkan kecurian.",
        ],
      },
    ],
    opticalInstruments: [
      {
        name: "Periskop",
        howItWorks:
          "Periskop merupakan alat yang digunakan pada kapal selam untuk melihat keadaan di permukaan laut. Periskop mengaplikasikan sifat cahaya yang boleh dipantulkan. Cahaya dari atas permukaan laut dikesan oleh suatu cermin, kemudian dipantulkan oleh cermin lain dan menuju ke mata pemerhati yang berada di dalam kapal.",
      },
      {
        name: "Kaleidoskop",
        howItWorks:
          "Kaleidoskop merupakan alat mainan yang dibuat dengan menggunakan cermin satah. Pola-pola ini diperoleh kerana imej objek-objek di dalam kaleidoskop berkali-kali mengalami pantulan. Oleh yang demikian, jumlah imej yang kelihatan lebih banyak daripada jumlah objek.",
      },
    ],
    lesson: {
      labels: {
        real: "Imej sahih",
        virtual: "Imej maya",
        materials: "Bahan dan radas",
        instructions: "Arahan",
        questions: "Soalan",
        shapes: "Jenis-jenis cermin",
        object: "Objek",
        image: "Imej",
        mirror: "Cermin",
        screen: "Kadbod putih sebagai skrin",
        blackCard: "Kadbod hitam",
        pinhole: "Lubang jarum",
        pin: "Jarum peniti",
        candle: "Lilin",
        graph: "Kertas graf",
        distance: "Jarak objek = Jarak imej",
        applications: "Aplikasi Cermin Satah, Cermin Cekung dan Cermin Cembung dalam Kehidupan",
        reflectingSurface: "Permukaan cermin",
        periscopePath: "Objek → Cermin → Cermin → Mata pemerhati",
        beads: "Manik yang berwarna-warni",
        reflections: "Pantulan berkali-kali",
        scienceInLife: "Sains dalam Kehidupan",
        problem: "Situasi",
        solution: "Penyelesaian",
        reason: "Sebab",
        showAnswer: "Lihat jawapan",
        rotate: "Putar",
        compare: "Imej yang terbentuk",
        measurements: "Ukuran",
      },
      planeVirtual:
        "Imej kita dalam cermin terbentuk di belakang cermin. Oleh itu, imej yang terbentuk pada cermin ialah imej maya.",
      sizes: ["Sama saiz", "Lebih besar", "Lebih kecil"],
      activity81: {
        title: "Aktiviti 8.1",
        aim: "Mengkaji dan membezakan imej sahih dan maya",
        materials: [
          "Sekeping kadbod hitam bersaiz A4",
          "Sekeping kadbod putih bersaiz A4",
          "Lilin",
          "Jarum peniti",
          "Cermin",
        ],
        instructions: [
          "Gunakan jarum peniti untuk menebuk lubang pada sekeping kadbod hitam.",
          "Susun bahan dan radas seperti dalam Rajah 8.1 di dalam sebuah bilik gelap. Kadbod putih yang tidak ditebuk ialah skrin tempat imej akan terbentuk.",
          "Perhatikan imej yang terbentuk pada kadbod kedua yang bertindak sebagai skrin.",
          "Pilih seorang murid untuk berdiri di depan cermin seperti dalam Rajah 8.2. Perhatikan imej yang terbentuk.",
        ],
        questions: [
          "Adakah imej yang terbentuk dalam Rajah 8.1 imej sahih atau maya?",
          "Bandingkan ciri-ciri imej yang terbentuk dalam Rajah 8.1 dengan Rajah 8.2.",
        ],
      },
      activity82: {
        title: "Aktiviti 8.2",
        aim: "Mengkaji ciri-ciri imej dalam cermin satah, cermin cekung, dan cermin cembung",
        materials: [
          "Cermin satah",
          "Cermin cekung",
          "Cermin cembung",
          "Kertas graf",
          "Lilin",
          "Pembaris",
        ],
        instructions: [
          "Letakkan sebatang lilin di atas sekeping kertas graf pada jarak 4 petak kertas graf daripada cermin satah seperti pada Rajah 8.4.",
          "Perhatikan imej yang terbentuk. Adakah imej tersebut sama saiz atau lebih kecil atau lebih besar daripada objek?",
          "Catatkan keputusan yang diperoleh dalam bentuk jadual di bawah.",
          "Ulang langkah 1 hingga 2 dengan menggantikan cermin satah dengan cermin cekung dan cermin cembung.",
          "Kemudian, ukur jarak imej dari cermin satah.",
        ],
        questions: [
          "Bandingkan saiz imej yang terbentuk pada cermin-cermin tersebut dengan saiz objek.",
          "Bandingkan jarak imej dari cermin satah dengan jarak objek daripada cermin satah.",
        ],
      },
      activity83: {
        title: "Aktiviti 8.3",
        aim: "Membincangkan aplikasi cermin satah, cermin cekung dan cermin cembung",
        materials: [],
        instructions: [
          "Jalankan aktiviti secara berkumpulan.",
          "Bincangkan aplikasi cermin satah, cermin cekung dan cermin cembung.",
          "Bentangkan hasil perbincangan dengan menggunakan persembahan multimedia.",
        ],
        questions: [],
      },
      activity84: {
        title: "Aktiviti 8.4",
        aim: "Mencipta periskop yang ringkas",
        materials: ["Dua keping cermin", "Kotak", "Pisau"],
        instructions: [
          "Toreh bahagian sisi atas dan bawah kotak sesuai dengan lebar cermin.",
          "Pasang cermin dengan kedudukan saling berhadapan.",
          "Buat dua buah lubang yang persis berhadapan dengan tiap-tiap cermin.",
          "Letakkan objek yang hendak dilihat di hadapan lubang 1.",
        ],
        questions: [],
      },
      knifeWarning: "Berhati-hati apabila menggunakan pisau lipat agar tidak tercedera.",
      periscopeMeasurements: ["Kotak: 30 cm × 10 cm × 15 cm", "Cermin satah: 15 cm × 14 cm"],
      activity85: {
        title: "Aktiviti 8.5",
        aim: "Membina sebuah kaleidoskop",
        materials: [
          "Bekas gulungan tisu",
          "Tiga keping kad cermin",
          "Manik yang berwarna-warni",
          "Dua keping cakera plastik",
          "Gunting",
          "Gam",
          "Pita selofan",
          "Kertas berwarna untuk hiasan",
          "Kadbod hitam berbentuk bulatan",
        ],
        instructions: [
          "Sediakan bahan dan radas seperti dalam Rajah 8.8.",
          "Sediakan tiga keping kad cermin yang setiap satunya mempunyai 4.3 cm lebar dan 21 cm panjang.",
          "Lekatkan tiga keping kad cermin itu dengan pita selofan untuk membentuk sebuah prisma segi tiga. Pastikan bahagian muka yang bersinar menghadap ke dalam.",
          "Tolak prisma cermin yang telah dibuat ke dalam bekas gulungan tisu (Rajah 8.9(a)).",
          "Potong dua keping cakera plastik lutsinar berbentuk cakera dengan diameter masing-masing 5.3 cm.",
          "Lekatkan cakera plastik yang pertama pada salah satu bahagian hujung prisma di dalam gulungan tisu itu, A (Rajah 8.9(b)).",
          "Masukkan manik-manik berwarna-warni di atas permukaan cakera plastik yang pertama (Rajah 8.10(a)). Lekatkan cakera plastik kedua di permukaan hujung A gulungan tisu (Rajah 8.10(b)).",
          "Terbalikkan kaleidoskop. Pada hujung gulungan tisu, B, lekatkan satu kadbod hitam berbentuk bulatan yang mempunyai diameter 5.3 cm dan buat satu lubang di atasnya (Rajah 8.11).",
          "Hiaskan tiub ini dengan kertas berwarna-warni mengikut kreativiti anda.",
          "Lihat corak manik berwarna-warni yang terbentuk dari lubang itu.",
        ],
        questions: [],
      },
      life: [
        {
          problem:
            "Betapa bagusnya jika saya dapat melihat keadaan di belakang saya untuk mengelakkan kemalangan.",
          solution:
            "Anda boleh memasang cermin cembung pada basikal untuk melihat keadaan di belakang.",
          reason: "Melihat keadaan di belakang",
          instrument: "convex",
        },
        {
          problem: "Bagaimanakah saya mahu melihat pemandangan di sebelah dinding ini?",
          solution: "Baiklah, periskop dapat membantu saya.",
          reason: "Melihat pemandangan di sebelah dinding",
          instrument: "periscope",
        },
        {
          problem:
            "Bahayanya berjalan di jalan ini kerana kita tidak dapat melihat apa-apa sahaja di laluan selekoh ini.",
          solution: "Penyelesaiannya, kita boleh memasang cermin cembung di selekoh berbahaya.",
          reason: "Melihat laluan selekoh",
          instrument: "convex",
        },
      ],
      practice: {
        title: "Praktis Formatif 8.1",
        questions: [
          "Rajah di sebelah menunjukkan seorang lelaki yang gemuk berdiri di hadapan sebuah cermin. Apakah jenis cermin itu? Nyatakan ciri imej yang terbentuk.",
          "Apakah fungsi cermin satah dalam periskop?",
          "Mengapakah kita memerlukan cermin satah di dalam lif?",
        ],
      },
    },
  },
  propertiesOfLight: {
    facts: [
      "Kelajuan cahaya ialah 3.0 × 10⁸ m/s — jauh lebih laju daripada bunyi, itulah sebabnya kita melihat kilat sebelum mendengar guruh",
      "Cahaya bergerak dalam garis lurus",
    ],
    shadowFormation: [
      "Cahaya bergerak dalam garis lurus",
      "Objek legap menghalang cahaya daripada menembusinya",
      "Bayang-bayang terbentuk di belakang objek legap di mana cahaya dihalang",
    ],
  },
  refraction: {
    definition:
      "Pembiasan cahaya ialah perubahan arah cahaya semasa ia bergerak melalui dua medium yang berbeza ketumpatan.",
    cases: [
      {
        scenario:
          "Cahaya bergerak daripada medium lebih tumpat (air) ke medium kurang tumpat (udara)",
        behavior: "Sinar cahaya dibiaskan menjauhi garis normal",
      },
      {
        scenario:
          "Cahaya bergerak daripada medium kurang tumpat (udara) ke medium lebih tumpat (air)",
        behavior: "Sinar cahaya dibiaskan mendekati garis normal",
      },
      {
        scenario: "Sinar tuju selari dengan garis normal (mana-mana arah)",
        behavior: "Sinar cahaya tidak dibiaskan langsung — ia terus lurus",
      },
    ],
    dailyLifeExamples: [
      "Ikan dalam kolam kelihatan lebih dekat dengan permukaan berbanding lokasi sebenar",
      "Pensel kelihatan bengkok dalam segelas air",
      "Kolam renang kelihatan cetek berbanding kedalaman sebenar",
    ],
  },
  dispersion: {
    definition:
      "Serakan cahaya ialah pemisahan cahaya putih kepada komponen warnanya semasa melalui medium seperti prisma kaca, kerana setiap warna bergerak pada kelajuan berbeza dan membias pada sudut berbeza.",
    spectrumOrder: ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Nila", "Ungu"],
    speedFact:
      "Cahaya merah mempunyai kelajuan tertinggi dan dibiaskan paling sedikit. Cahaya ungu mempunyai kelajuan terendah dan dibiaskan paling banyak.",
    rainbowFormation:
      "Apabila cahaya matahari memasuki titisan hujan di langit, cahaya putih dibiaskan dan diserakkan kepada tujuh warna, membentuk pelangi.",
  },
  scattering: {
    definition:
      "Penyerakan cahaya berlaku apabila cahaya dipantulkan ke semua arah oleh awan atau zarah di udara.",
    middayExplanation:
      "Pada waktu tengah hari, cahaya biru diserakkan paling banyak ke semua arah oleh zarah halus dalam atmosfera, menjadikan langit kelihatan biru.",
    sunsetExplanation:
      "Pada waktu matahari terbenam, matahari berada di ufuk, jadi cahaya melalui lebih banyak atmosfera. Cahaya merah dan jingga kurang diserakkan dan sampai terus ke mata anda, manakala cahaya biru diserakkan — menjadikan langit kelihatan kemerahan.",
  },
  colorAdditionSubtraction: {
    primaryColors: ["Merah", "Biru", "Hijau"],
    secondaryColors: ["Sian", "Kuning", "Magenta"],
    additionFormula: [
      { color1: "Merah", color2: "Biru", result: "Magenta" },
      { color1: "Merah", color2: "Hijau", result: "Kuning" },
      { color1: "Biru", color2: "Hijau", result: "Sian" },
    ],
    allThreeMixed: "Merah + Biru + Hijau = Putih",
    subtractionPrinciple:
      "Warna objek legap bergantung pada warna cahaya yang dipantulkan ke mata kita — warna itu dipantulkan, dan semua warna lain diserap oleh objek.",
    subtractionExamples: [
      { object: "Pisang", reflects: "Cahaya kuning", absorbs: "Semua warna lain" },
      { object: "Strawberi", reflects: "Cahaya merah", absorbs: "Semua warna lain" },
      { object: "Daun", reflects: "Cahaya hijau", absorbs: "Semua warna lain" },
    ],
  },
  keyExamFacts: [
    "Cermin satah menghasilkan imej maya, tegak, berbalik sisi, sama saiz, pada jarak yang sama di belakang cermin seperti objek di hadapan",
    "Cermin cekung membesarkan imej; cermin cembung memberi medan pandangan lebih luas dengan imej lebih kecil",
    "Hukum Pantulan: sudut tuju sama dengan sudut pantulan (i = r)",
    "Cahaya dibiaskan menjauhi normal apabila bergerak dari medium tumpat ke kurang tumpat, dan mendekati normal sebaliknya",
    "Cahaya putih terserak kepada merah, jingga, kuning, hijau, biru, nila, ungu — merah membias paling sedikit, ungu paling banyak",
    "Penyerakan menjelaskan kenapa langit biru pada tengah hari dan kemerahan waktu matahari terbenam",
    "Merah, biru dan hijau ialah warna primer; mencampur mana-mana dua menghasilkan magenta, kuning, atau sian; ketiga-tiganya menghasilkan putih",
    "Warna objek legap ialah warna cahaya yang dipantulkannya — semua warna lain diserap",
  ],
  keyTerms: [
    "Imej sahih",
    "Imej maya",
    "Cermin satah",
    "Cermin cekung",
    "Cermin cembung",
    "Hukum Pantulan",
    "Sudut tuju",
    "Sudut pantulan",
    "Periskop",
    "Kaleidoskop",
    "Pembiasan",
    "Garis normal",
    "Serakan cahaya",
    "Spektrum",
    "Penyerakan cahaya",
    "Warna primer",
    "Warna sekunder",
    "Penambahan cahaya",
    "Penolakan cahaya",
  ],
  chapterSummary:
    "Bab 8 menerangkan bagaimana cahaya berkelakuan melalui cermin, pembiasan, serakan, penyerakan, dan percampuran warna — merangkumi ciri-ciri imej dalam cermin satah, cekung dan cembung, Hukum Pantulan, cara pembiasan membengkokkan cahaya antara medium berlainan ketumpatan, cara serakan memisahkan cahaya putih kepada spektrum, sebab penyerakan menjadikan langit biru atau merah, dan cara warna primer bergabung atau diserap untuk menghasilkan setiap warna yang kita lihat.",
};

export const chapter8Content = { en, bm };

export interface Chapter8Supplement {
  opticalHistory: { name: string; principle: string }[];
  reflectionExperiment: string[];
  lateralInversion: string;
  refractionRules: { passage: string; bend: string; speed: string; angle: string }[];
  refractionExperiment: string[];
  fishTip: string;
  dispersionExperiments: { part: string; setup: string; result: string }[];
  scatteringExperiment: string[];
  objectColourRows: { object: string; incident: string; reflected: string; absorbed: string }[];
  filters: { type: string; rule: string; examples: string[] }[];
  filterMatrix: { first: string; second: string; result: string; reason: string }[];
  activeRecall: { question: string; answer: string }[];
}

const supplementEn: Chapter8Supplement = {
  opticalHistory: [
    {
      name: "Sundial",
      principle:
        "Straight-line travel of light and the changing shadow of an opaque gnomon indicate time.",
    },
    {
      name: "Shadow puppets (wayang kulit)",
      principle:
        "Opaque puppets block light travelling in straight lines and cast outlines on a screen.",
    },
  ],
  reflectionExperiment: [
    "Direct one narrow ray from a ray box towards a plane mirror on white paper.",
    "Draw the normal perpendicular to the mirror and measure i and r at 10°, 20°, 30°, 40°, and 50°.",
    "For every reading, the angle of reflection equals the angle of incidence; the hypothesis i = r is accepted.",
  ],
  lateralInversion:
    "AMBULANCE is written backwards so lateral inversion in a driver's rear-view mirror reverses it into readable text immediately.",
  refractionRules: [
    {
      passage: "Less dense → more dense",
      bend: "Towards the normal",
      speed: "Decreases",
      angle: "i > r",
    },
    {
      passage: "More dense → less dense",
      bend: "Away from the normal",
      speed: "Increases",
      angle: "i < r",
    },
    {
      passage: "Along the normal (i = 0°)",
      bend: "No change of direction",
      speed: "Changes",
      angle: "Straight through",
    },
  ],
  refractionExperiment: [
    "Trace a glass block on white paper and direct a single ray into it.",
    "Mark the entrance and exit points, remove the block, then connect the points to trace the internal path.",
    "The ray bends towards the normal on entering glass and away from the normal on returning to air.",
  ],
  fishTip:
    "A fish appears shallower than its actual position because light bends away from the normal when leaving water. Aim below the visible image.",
  dispersionExperiments: [
    {
      part: "Glass prism",
      setup: "Shine a narrow white beam through a prism onto a white screen in a dark room.",
      result: "A sharp ROYGBIV spectrum forms; red bends least and violet bends most.",
    },
    {
      part: "Rainbow",
      setup:
        "Shine a pinhole torch beam onto an inclined plane mirror in a half-filled basin of water.",
      result: "Refraction and dispersion cast a rainbow spectrum onto white paper.",
    },
  ],
  scatteringExperiment: [
    "Shine a ray-box beam through a beaker of water towards a white screen in a dark room.",
    "Add and stir a little milk powder; its particles model atmospheric particles.",
    "From the side the liquid looks bluish, while the transmitted light on the screen looks reddish-orange.",
  ],
  objectColourRows: [
    { object: "Green leaf", incident: "White", reflected: "Green", absorbed: "Red and blue" },
    {
      object: "Yellow banana",
      incident: "White",
      reflected: "Yellow (red + green)",
      absorbed: "Blue",
    },
    { object: "White object", incident: "White", reflected: "All colours", absorbed: "None" },
    { object: "Black object", incident: "White", reflected: "No light", absorbed: "All colours" },
  ],
  filters: [
    {
      type: "Primary filters",
      rule: "Transmit only their own colour and absorb all others.",
      examples: ["Red passes red", "Green passes green", "Blue passes blue"],
    },
    {
      type: "Secondary filters",
      rule: "Transmit their own colour and the two primary colours that form it.",
      examples: [
        "Yellow passes yellow, red, green",
        "Magenta passes magenta, red, blue",
        "Cyan passes cyan, blue, green",
      ],
    },
  ],
  filterMatrix: [
    { first: "Red", second: "Yellow", result: "Red", reason: "Red passes through both filters." },
    { first: "Red", second: "Magenta", result: "Red", reason: "Red passes through both filters." },
    { first: "Red", second: "Cyan", result: "Black", reason: "Cyan absorbs the red light." },
    { first: "Blue", second: "Yellow", result: "Black", reason: "Yellow absorbs the blue light." },
  ],
  activeRecall: [
    {
      question: "A red road sign is illuminated only by green light. What colour does it appear?",
      answer:
        "Black. The red object can only reflect red light; it absorbs the available green light.",
    },
    {
      question: "Why does a deep swimming pool look shallower than it really is?",
      answer:
        "Light leaving water bends away from the normal. The brain traces the rays backwards in straight lines, locating a virtual image above the real pool floor.",
    },
  ],
};

const supplementBm: Chapter8Supplement = {
  opticalHistory: [
    {
      name: "Jam matahari",
      principle:
        "Perambatan cahaya secara lurus dan perubahan bayang gnomon legap menunjukkan waktu.",
    },
    {
      name: "Wayang kulit",
      principle:
        "Patung legap menghalang cahaya yang bergerak lurus lalu menghasilkan bentuk gelap pada skrin.",
    },
  ],
  reflectionExperiment: [
    "Halakan satu sinar sempit daripada kotak sinar ke arah cermin satah di atas kertas putih.",
    "Lukis garis normal yang serenjang dengan cermin dan ukur i serta r pada 10°, 20°, 30°, 40°, dan 50°.",
    "Bagi setiap bacaan, sudut pantulan sama dengan sudut tuju; hipotesis i = r diterima.",
  ],
  lateralInversion:
    "AMBULANS ditulis secara terbalik supaya pembalikan sisi dalam cermin pandang belakang pemandu menukarkannya kepada tulisan yang dapat dibaca serta-merta.",
  refractionRules: [
    {
      passage: "Kurang tumpat → lebih tumpat",
      bend: "Mendekati normal",
      speed: "Berkurang",
      angle: "i > r",
    },
    {
      passage: "Lebih tumpat → kurang tumpat",
      bend: "Menjauhi normal",
      speed: "Bertambah",
      angle: "i < r",
    },
    {
      passage: "Sepanjang normal (i = 0°)",
      bend: "Tiada perubahan arah",
      speed: "Berubah",
      angle: "Bergerak lurus",
    },
  ],
  refractionExperiment: [
    "Surih blok kaca pada kertas putih dan halakan satu sinar ke dalamnya.",
    "Tandakan titik masuk dan keluar, alihkan blok, kemudian sambungkan titik untuk menyurih laluan di dalam blok.",
    "Sinar membengkok mendekati normal apabila memasuki kaca dan menjauhi normal apabila kembali ke udara.",
  ],
  fishTip:
    "Ikan kelihatan lebih cetek daripada kedudukan sebenar kerana cahaya membengkok menjauhi normal apabila keluar dari air. Halakan lembing di bawah imej yang kelihatan.",
  dispersionExperiments: [
    {
      part: "Prisma kaca",
      setup: "Halakan sinar putih sempit melalui prisma ke skrin putih di dalam bilik gelap.",
      result: "Spektrum MUJHHBIU terbentuk; merah membias paling sedikit dan ungu paling banyak.",
    },
    {
      part: "Pelangi",
      setup:
        "Halakan cahaya lampu suluh berlubang jarum pada cermin satah condong di dalam besen berisi separuh air.",
      result: "Pembiasan dan serakan menghasilkan spektrum pelangi pada kertas putih.",
    },
  ],
  scatteringExperiment: [
    "Halakan sinar daripada kotak sinar melalui bikar berisi air ke arah skrin putih di dalam bilik gelap.",
    "Tambah dan kacau sedikit susu tepung; zarah susu mewakili zarah atmosfera.",
    "Dari sisi, cecair kelihatan kebiruan, manakala cahaya pada skrin kelihatan merah jingga.",
  ],
  objectColourRows: [
    { object: "Daun hijau", incident: "Putih", reflected: "Hijau", absorbed: "Merah dan biru" },
    {
      object: "Pisang kuning",
      incident: "Putih",
      reflected: "Kuning (merah + hijau)",
      absorbed: "Biru",
    },
    { object: "Objek putih", incident: "Putih", reflected: "Semua warna", absorbed: "Tiada" },
    {
      object: "Objek hitam",
      incident: "Putih",
      reflected: "Tiada cahaya",
      absorbed: "Semua warna",
    },
  ],
  filters: [
    {
      type: "Penapis primer",
      rule: "Membenarkan hanya warna sendiri melaluinya dan menyerap semua warna lain.",
      examples: ["Merah melalukan merah", "Hijau melalukan hijau", "Biru melalukan biru"],
    },
    {
      type: "Penapis sekunder",
      rule: "Melalukan warna sendiri dan dua warna primer yang membentuknya.",
      examples: [
        "Kuning melalukan kuning, merah, hijau",
        "Magenta melalukan magenta, merah, biru",
        "Sian melalukan sian, biru, hijau",
      ],
    },
  ],
  filterMatrix: [
    {
      first: "Merah",
      second: "Kuning",
      result: "Merah",
      reason: "Merah melalui kedua-dua penapis.",
    },
    {
      first: "Merah",
      second: "Magenta",
      result: "Merah",
      reason: "Merah melalui kedua-dua penapis.",
    },
    { first: "Merah", second: "Sian", result: "Hitam", reason: "Sian menyerap cahaya merah." },
    { first: "Biru", second: "Kuning", result: "Hitam", reason: "Kuning menyerap cahaya biru." },
  ],
  activeRecall: [
    {
      question:
        "Papan tanda jalan berwarna merah disinari cahaya hijau sahaja. Apakah warna yang kelihatan?",
      answer:
        "Hitam. Objek merah hanya boleh memantulkan cahaya merah; cahaya hijau yang ada diserap.",
    },
    {
      question: "Mengapakah kolam renang yang dalam kelihatan lebih cetek?",
      answer:
        "Cahaya yang keluar dari air membengkok menjauhi normal. Otak menyurih sinar itu ke belakang secara lurus lalu meletakkan imej maya di atas dasar sebenar.",
    },
  ],
};

export const chapter8Supplement = { en: supplementEn, bm: supplementBm };
export default chapter8Content;
