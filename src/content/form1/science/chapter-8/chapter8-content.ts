export interface DispersionLesson {
  definition: string;
  spectrumOrder: string[];
  speedFact: string;
  prismBehaviour: string[];
  rainbowFormation: string;
  inquiry: string;
  labels: Record<
    | "prism"
    | "white"
    | "normal"
    | "screen"
    | "spectrum"
    | "sun"
    | "droplet"
    | "rainbow"
    | "rayBox"
    | "basin"
    | "water"
    | "mirror"
    | "torch"
    | "card"
    | "paper"
    | "tape"
    | "instructions"
    | "apparatus",
    string
  >;
  activity: {
    title: string;
    aim: string;
    apparatus: string[];
    parts: { id: string; title: string; steps: string[] }[];
  };
  practice: { title: string; questions: string[] };
}
export interface ScatteringLesson {
  revision: {
    longerPath: string;
    blue: string;
    red: string;
    comparison: { process: string; explanation: string; examples: string }[];
  };
  definition: string;
  middayExplanation: string;
  sunsetExplanation: string;
  labels: Record<
    | "midday"
    | "sunset"
    | "sun"
    | "earth"
    | "observer"
    | "particles"
    | "blue"
    | "red"
    | "atmosphere"
    | "side"
    | "screen"
    | "rayBox"
    | "water"
    | "milk"
    | "beaker"
    | "instructions"
    | "apparatus"
    | "questions",
    string
  >;
  activity: {
    title: string;
    aim: string;
    apparatus: string[];
    steps: string[];
    questions: string[];
  };
  practice: { title: string; questions: string[]; comparisons: string[] };
}
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
  id: "water-air" | "air-water" | "normal-water-air" | "normal-air-water";
  scenario: string;
  from: string;
  to: string;
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

export interface PropertiesOfLightLesson {
  facts: string[];
  shadowFormation: string[];
  opaqueObject: { definition: string; umbrella: string; blockedLight: string; chain: string[] };
  shadowChange: string;
  rainbow: string;
  sundial: { title: string; explanation: string };
  wayangKulit: { title: string; explanation: string };
  practice: { title: string; questions: string[] };
  labels: {
    source: string;
    object: string;
    shadow: string;
    screen: string;
    puppet: string;
    pointer: string;
    sun: string;
    position: string;
    torch: string;
    blocks: string;
    speed: string;
  };
}
export interface ReflectionLesson {
  title: string;
  definition: string;
  rayLabels: {
    mirror: string;
    normal: string;
    incident: string;
    reflected: string;
    incidence: string;
    reflection: string;
    point: string;
    diagram: string;
    paper: string;
    box: string;
    slit: string;
    power: string;
    protractor: string;
  };
  lateralInversion: {
    title: string;
    word: string;
    prompt: string;
    vehicle: string;
    mirror: string;
    image: string;
  };
  applications: { title: string; items: string[] };
  practice: { title: string; questions: string[] };
  labels: {
    materials: string;
    procedure: string;
    variables: string;
    hypothesis: string;
    results: string;
    conclusion: string;
    measure: string;
    schematic: string;
    unfilled: string;
  };
  lawOfReflection: { statement: string[]; keyEquation: string };
  experiment: {
    title: string;
    aim: string;
    hypothesis: string;
    variables: string[];
    materials: string[];
    instructions: string[];
    angles: number[];
    printedResults: { i: number; r: null }[];
    conclusion: string;
  };
}

export interface RefractionLesson {
  definition: string;
  illusions: { pond: string; pencil: string };
  fish: { title: string; explanation: string; question: string };
  experiment: {
    title: string;
    problem: string;
    hypothesis: string;
    aim: string;
    variables: { manipulated: string; responding: string; constant: string };
    materials: string[];
    instructions: string[];
    results: { i: null; r: null }[];
    discussion: string[];
    conclusion: string;
    questions: string[];
  };
  activity: {
    title: string;
    aim: string;
    instructions: string[];
    phenomena: string[];
    phenomenaAfter: number;
  };
  practice: { title: string; questions: string[]; caseLabels: string[] };
  labels: {
    observer: string;
    actualFish: string;
    image: string;
    light: string;
    surface: string;
    air: string;
    water: string;
    normal: string;
    incident: string;
    refracted: string;
    emerging: string;
    incidence: string;
    refraction: string;
    rayCases: string;
    problem: string;
    hypothesis: string;
    aim: string;
    variables: string;
    manipulated: string;
    responding: string;
    constant: string;
    materials: string;
    procedure: string;
    results: string;
    discussion: string;
    conclusion: string;
    questions: string;
    instructions: string;
    glass: string;
    box: string;
    slit: string;
    paper: string;
    power: string;
    ruler: string;
    protractor: string;
    demo: string;
    stage: string;
    outline: string;
    rays: string;
    remove: string;
    measure: string;
    unfilled: string;
    whatYouSee: string;
    rayDiagram: string;
  };
  cases: RefractionCase[];
}

export interface Chapter8Content {
  title: string;
  subtopics: { code: string; title: string }[];
  reflection: ReflectionLesson;
  hook: { title: string; body: string };
  mirrors: {
    realVsVirtual: { real: string; virtual: string };
    planeMirrorCharacteristics: string[];
    mirrorTypes: MirrorType[];
    lesson: MirrorLesson;
    opticalInstruments: OpticalInstrument[];
  };
  propertiesOfLight: PropertiesOfLightLesson;
  refraction: RefractionLesson;
  dispersion: DispersionLesson;
  scattering: ScatteringLesson;
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
    title: "Law of Reflection",
    definition:
      "When a beam of light is directed onto a piece of a plane mirror at a certain angle (angle of incidence, i), the light ray will be reflected to a certain angle (angle of reflection, r).",
    rayLabels: {
      mirror: "Plane mirror",
      normal: "Normal line",
      incident: "Incident ray",
      reflected: "Reflected ray",
      incidence: "Angle of incidence, i",
      reflection: "Angle of reflection, r",
      point: "Point of incidence",
      diagram: "Reflection of light",
      paper: "White paper",
      box: "Ray box",
      slit: "Slit",
      power: "Power supply",
      protractor: "Protractor",
    },
    experiment: {
      title: "Experiment 8.1",
      aim: "To determine the relationship between the angle of incidence, i and angle of reflection, r",
      hypothesis: "The angle of incidence, i is the same as the angle of reflection, r.",
      variables: [
        "Manipulated variable: Angle of incidence, i",
        "Responding variable: Angle of reflection, r",
        "Constant variable: The size of slit",
      ],
      materials: ["Plane mirror", "Ray box", "Power supply", "White paper", "Protractor"],
      instructions: [
        "Carry out this activity in the dark.",
        "Arrange a ray box and a plane mirror on a sheet of white paper.",
        "Direct the light beam towards the plane mirror at an angle i = 10°.",
        "Measure the angle of reflection, r.",
        "Repeat steps 3 and 4 with angle of incidence, i = 20°, 30°, 40° and 50°.",
        "Record your results in a table.",
      ],
      angles: [10, 20, 30, 40, 50],
      printedResults: [
        {
          i: 10,
          r: null,
        },
        {
          i: 20,
          r: null,
        },
      ],
      conclusion:
        "Is the hypothesis accepted? What is the relationship between the angle of incidence, i and angle of reflection, r?",
    },
    lateralInversion: {
      title: "Laterally inverted",
      word: "AMBULANCE",
      prompt:
        "Have you ever wondered why the word “ambulance” is written in an inverted manner? How is the image formed when the drivers of other vehicles look into their rear view mirror? Think about it.",
      vehicle: "Ambulance",
      mirror: "Rear-view mirror",
      image: "Image",
    },
    applications: {
      title: "Applications of Reflection of Light",
      items: ["Traffic cones", "Road sign", "Warning triangle"],
    },
    practice: {
      title: "Formative Practice 8.3",
      questions: [
        "Explain the Law of Reflection with the help of a light reflection ray diagram.",
        "Complete the statement below. The image formed by a plane mirror is ______, ______, ______ and the image distance is ______ with the object distance.",
      ],
    },
    labels: {
      materials: "Materials and Apparatus",
      procedure: "Procedure",
      variables: "Variables",
      hypothesis: "Hypothesis",
      results: "Results",
      conclusion: "Conclusion",
      measure: "Measure the angle of reflection, r.",
      schematic: "Ray diagram",
      unfilled: "Not supplied by the textbook",
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
      "The speed of light is 3.0 × 10⁸ m/s. Light travels much faster than sound, so we see the lightning before we hear the thunder.",
      "Light travels in straight lines.",
    ],
    shadowFormation: [
      "Sunlight travels in straight lines.",
      "Umbrella is an opaque object, therefore the sunlight cannot pass through it.",
      "When light is blocked by an opaque object, a shadow is formed behind the opaque object.",
    ],
    opaqueObject: {
      definition: "An opaque object does not allow light to pass through it.",
      umbrella: "Umbrella = opaque object",
      blockedLight: "Blocked light",
      chain: [
        "Sunlight travels in straight lines",
        "Opaque object blocks the light",
        "Light cannot pass through",
        "Shadow forms behind the opaque object",
      ],
    },
    shadowChange:
      "Do you know that your shadow will become short in the afternoon and long in the evening?",
    rainbow:
      "Another property of light is that it can be dispersed by water droplets in the sky to form a rainbow.",
    sundial: {
      title: "The Sundial",
      explanation:
        "The sundial was used in ancient times to determine the time during the day. It used the concept that shadows are formed when sunlight is blocked by objects.",
    },
    wayangKulit: {
      title: "Shadow puppets",
      explanation: "Shadow puppets use the concept that shadows are formed when light is blocked.",
    },
    practice: {
      title: "Formative Practice 8.2",
      questions: [
        "Hisyam’s shadow is the shortest in the ______ when the Sun is ______ his head.",
        "The diagram shows two opaque objects blocking the light from a torchlight. Draw the shape of the shadow that will be formed on the screen.",
      ],
    },
    labels: {
      source: "Light source",
      object: "Opaque object",
      shadow: "Shadow",
      screen: "Screen",
      puppet: "Shadow puppet",
      pointer: "Upright pointer",
      sun: "Sunlight",
      position: "Sun’s position",
      torch: "Torchlight",
      blocks: "Wooden blocks",
      speed: "3.0 × 10⁸ m/s",
    },
  },
  refraction: {
    definition:
      "Refraction of light is the change in direction of light when light travels through two media of different densities.",
    illusions: {
      pond: "Why does a deep pond appear to be shallower and the fish in the pond appear to be much closer to the water surface?",
      pencil: "Why does a pencil look bent in a glass of water?",
    },
    fish: {
      title: "Fish in an aquarium",
      explanation:
        "Fish appears to be much shallower than its real location due to the refraction of light.",
      question: "Due to the refraction of light phenomenon, how do you catch fish in a river?",
    },
    cases: [
      {
        id: "water-air",
        scenario: "Water → Air",
        from: "Water (more dense)",
        to: "Air (less dense)",
        behavior:
          "The light ray is refracted away from the normal when the incident ray moves from a more dense medium to a less dense medium.",
      },
      {
        id: "air-water",
        scenario: "Air → Water",
        from: "Air (less dense)",
        to: "Water (more dense)",
        behavior:
          "The light ray is refracted towards the normal when the incident ray moves from a less dense medium to a more dense medium.",
      },
      {
        id: "normal-water-air",
        scenario: "Water → Air",
        from: "Water (more dense)",
        to: "Air (less dense)",
        behavior:
          "The light ray is not refracted when the incident ray is parallel to the normal and moves from a more dense medium to a less dense medium.",
      },
      {
        id: "normal-air-water",
        scenario: "Air → Water",
        from: "Air (less dense)",
        to: "Water (more dense)",
        behavior:
          "The light ray is not refracted when the incident ray is parallel to the normal and moves from a less dense medium to a more dense medium.",
      },
    ],
    experiment: {
      title: "Experiment 8.2",
      problem:
        "What is the relationship between the angle of incidence, i and angle of refraction, r when light travels from a less dense medium to a more dense medium?",
      hypothesis: "The greater the angle of incidence, i, the bigger the angle of refraction, r.",
      aim: "To determine the relationship between angle of incidence, i and angle of refraction, r when light travels from a less dense medium (air) to a more dense medium (glass block)",
      variables: {
        manipulated: "Angle of incidence, i",
        responding: "Angle of refraction, r",
        constant: "Size of slit and shape of glass block",
      },
      materials: [
        "Glass block",
        "Ray box",
        "Single-slit plate",
        "Plastic ruler",
        "Power supply",
        "White paper",
        "Protractor",
      ],
      instructions: [
        "Carry out this experiment in the dark.",
        "Place a glass block on a white paper and trace its outline.",
        "Direct a single incident ray onto the block, mark its path and draw its incident ray with a ruler.",
        "Mark the path of the ray emerging from the block and draw the ray with a ruler.",
        "Remove the block, connect the entry and exit points to show the path of the ray inside the block.",
        "Draw a normal line at the entry point.",
        "Measure the angle of incidence, i and the angle of refraction, r using a protractor.",
        "Repeat steps 3 to 7 for different angles of incidence.",
        "Record your results in a table.",
      ],
      results: [
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
      ],
      discussion: [
        "Plot a graph of i against r.",
        "Based on the graph of the angle of incidence, i against the angle of refraction, r, what is the relationship between i and r?",
      ],
      conclusion: "Can the hypothesis be accepted?",
      questions: [
        "What happens to the light ray when it travels from a less dense medium to a more dense medium?",
        "What happens to the light ray when it travels from a more dense medium to a less dense medium?",
      ],
    },
    activity: {
      title: "Activity 8.6",
      aim: "To investigate the phenomenon of refraction of light",
      instructions: [
        "Work in groups.",
        "Use resources such as the library, Internet and others to collect information regarding the following phenomena.",
        "Present the outcomes of your research in class.",
      ],
      phenomena: ["A spoon looks bent in water", "The bottom of a pool appears to be shallower"],
      phenomenaAfter: 1,
    },
    practice: {
      title: "Formative Practice 8.4",
      questions: [
        "Why does the bottom of a deep swimming pool appear shallower?",
        "Light rays refract at a certain angle in two different cases as below. Differentiate the density of the two media for both cases below.",
      ],
      caseLabels: ["Case 1", "Case 2"],
    },
    labels: {
      observer: "Observer",
      actualFish: "Actual location of fish",
      image: "Image seen",
      light: "Light ray",
      surface: "Water surface",
      air: "Air",
      water: "Water",
      normal: "Normal line",
      incident: "Incident ray",
      refracted: "Refracted ray",
      emerging: "Emerging ray",
      incidence: "Angle of incidence, i",
      refraction: "Angle of refraction, r",
      rayCases: "Ray diagrams to show the refraction of light",
      problem: "Problem statement",
      hypothesis: "Hypothesis",
      aim: "Aim",
      variables: "Variables",
      manipulated: "Manipulated variable",
      responding: "Responding variable",
      constant: "Constant variable",
      materials: "Materials and apparatus",
      procedure: "Procedure",
      results: "Results",
      discussion: "Discussion",
      conclusion: "Conclusion",
      questions: "Question",
      instructions: "Instruction",
      glass: "Glass block",
      box: "Ray box",
      slit: "Single slit",
      paper: "White paper",
      power: "Power supply",
      ruler: "Ruler",
      protractor: "Protractor",
      demo: "Diagram demonstration",
      stage: "Procedure",
      outline: "Trace the glass block",
      rays: "Mark the incident and emerging rays",
      remove: "Remove the glass block",
      measure: "Draw the normal and measure i and r",
      unfilled: "Blank textbook result",
      whatYouSee: "What you see",
      rayDiagram: "Ray diagram",
    },
  },
  dispersion: {
    definition:
      "White light consists of seven components of colour. Each component of colour travels at a different speed in a medium.",
    spectrumOrder: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
    speedFact:
      "For example, red light has the highest speed, so red light is refracted the least. However, violet light has the lowest speed, so violet light is refracted the most.",
    prismBehaviour: [
      "When a white light ray is directed to a prism, the white light will be separated into its components of colour. This is because the different colours in the white light bend towards the normal at different angles when entering the prism.",
      "When the different colours leave the glass prism, they are refracted away from the normal. The different colours are dispersed in an order that is known as a spectrum. The spectrum of white light consists of red, orange, yellow, green, blue, indigo and violet colour.",
    ],
    rainbowFormation:
      "When sunlight enters rain droplets in the sky, the white light will be refracted and dispersed into seven different colours to form a rainbow.",
    inquiry: "What will happen if a second inverted prism is placed behind the first prism?",
    labels: {
      prism: "Glass prism",
      white: "White light",
      normal: "Normal",
      screen: "White screen",
      spectrum: "Spectrum",
      sun: "Sunlight",
      droplet: "Water droplet",
      rainbow: "Formation of a rainbow",
      rayBox: "Ray box",
      basin: "Basin",
      water: "Water",
      mirror: "Plane mirror",
      torch: "Torchlight",
      card: "Black cardboard with a small hole",
      paper: "White paper",
      tape: "Cellophane tape",
      instructions: "Instructions",
      apparatus: "Materials and apparatus",
    },
    activity: {
      title: "Activity 8.7",
      aim: "To study the dispersion of light passing through a glass prism and the formation of rainbow",
      apparatus: [
        "Glass prism",
        "White screen",
        "Ray box",
        "Plane mirror",
        "Water",
        "Torchlight",
        "A piece of white paper",
        "Basin",
        "Cellophane tape",
        "Round black cardboard",
      ],
      parts: [
        {
          id: "I",
          title: "Dispersion of light by a glass prism",
          steps: [
            "Carry out this activity in the dark.",
            "Direct a narrow light ray from a ray box towards a glass prism (Figure 8.19). Adjust the glass prism slowly until a sharp colour spectrum is formed on a white screen.",
            "Identify the colours formed on the white screen.",
            "Observe the order of colours on the white screen.",
            "Record your observation.",
          ],
        },
        {
          id: "II",
          title: "Formation of a rainbow",
          steps: [
            "Fill a basin half-full with water.",
            "Place a piece of mirror in the water with an incline on the side of the basin. Secure the mirror using a cellophane tape.",
            "Make a small hole on a piece of round black cardboard. Then, attach the black cardboard to the front of a torch light.",
            "Shine the torchlight towards the mirror (Figure 8.20).",
            "Hold a white paper beside the mirror. Adjust the direction of the torchlight until you see a rainbow on the paper.",
          ],
        },
      ],
    },
    practice: {
      title: "Formative Practice 8.5",
      questions: [
        "List the seven colours formed on the screen below in the correct order.",
        "State the colour component that is refracted the most and refracted the least in the phenomenon above. Relate the phenomenon with the speed of each colour component.",
      ],
    },
  },
  scattering: {
    revision: {
      longerPath:
        "Near sunset, sunlight travels through a longer path in the atmosphere than at midday.",
      blue: "Blue light — scattered more",
      red: "Red and orange light — scattered less",
      comparison: [
        {
          process: "Dispersion of Light",
          explanation: "White light separates into its component colours.",
          examples: "Prism · Rainbow",
        },
        {
          process: "Scattering of Light",
          explanation: "Particles redirect light in different directions.",
          examples: "Blue sky · Reddish sunset",
        },
      ],
    },
    definition:
      "Scattering of light occurs when light rays are obstructed and reflected in all directions by clouds or particles in the air.",
    middayExplanation:
      "During midday, blue light is scattered the most in all directions by the tiny particles in the atmosphere. Therefore, the sky looks blue during midday.",
    sunsetExplanation:
      "During sunset, the sun is at the horizon. Red and orange light are less scattered and will go through the atmosphere to reach your eyes. Other coloured lights such as blue light are scattered away. Therefore, the sky looks reddish during sunset.",
    labels: {
      midday: "During midday",
      sunset: "During sunset",
      sun: "Sun",
      earth: "Earth",
      observer: "Observer",
      particles: "Air particles and dust",
      blue: "Blue light is scattered by particles in the air",
      red: "Light directly from the Sun appears red",
      atmosphere: "Atmosphere",
      side: "Side of the beaker",
      screen: "White screen",
      rayBox: "Ray box",
      water: "Water",
      milk: "Milk powder",
      beaker: "1000 ml glass beaker",
      instructions: "Instructions",
      apparatus: "Materials and apparatus",
      questions: "Questions",
    },
    activity: {
      title: "Activity 8.8",
      aim: "To study the scattering of light",
      apparatus: ["Milk powder", "1000 ml glass beaker", "Ray box", "White screen"],
      steps: [
        "Carry out this activity in the dark.",
        "Set up the apparatus as shown in Figure 8.23.",
        "Turn on the ray box.",
        "Add a few tablespoons of milk powder into the water. Stir the water until you can see a beam of light that shines through the mixture.",
        "See the light beam from the side of the beaker. Then, look at the white screen as shown in Figure 8.23.",
        "Add more milk powder and observe the colour change of the white light beam at the side of the beaker and on the white screen.",
        "Record your observation.",
      ],
      questions: [
        "What is the function of adding milk powder into the water?",
        "What is the difference between the beam of light as seen from the side of the beaker and the beam of light on the screen? Explain your answer.",
      ],
    },
    practice: {
      title: "Formative Practice 8.6",
      questions: ["Why does scattering of light occur?", "Fill the blanks with the correct words."],
      comparisons: [
        "Blue colour is scattered ______ compared to red colour.",
        "Red colour is scattered ______ compared to blue colour.",
      ],
    },
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
    title: "Hukum Pantulan Cahaya",
    definition:
      "Apabila suatu sinar cahaya ditujukan ke atas sekeping cermin satah pada sudut tertentu (sudut tuju), sinar cahaya itu akan dipantulkan ke sudut tertentu (sudut pantulan).",
    rayLabels: {
      mirror: "Cermin satah",
      normal: "Garis normal",
      incident: "Sinar tuju",
      reflected: "Sinar pantulan",
      incidence: "Sudut tuju, i",
      reflection: "Sudut pantulan, r",
      point: "Titik tuju",
      diagram: "Gambar rajah sinar pantulan cahaya",
      paper: "Kertas putih",
      box: "Kotak sinar",
      slit: "Celah",
      power: "Bekalan kuasa",
      protractor: "Protraktor",
    },
    experiment: {
      title: "Eksperimen 8.1",
      aim: "Menyiasat hubungan sudut tuju, i dengan sudut pantulan, r",
      hypothesis: "Sudut tuju, i adalah sama dengan sudut pantulan, r.",
      variables: [
        "Pemboleh ubah dimanipulasikan: Sudut tuju, i",
        "Pemboleh ubah bergerak balas: Sudut pantulan, r",
        "Pemboleh ubah dimalarkan: Saiz celah",
      ],
      materials: ["Cermin satah", "Kotak sinar", "Bekalan kuasa", "Kertas putih", "Protraktor"],
      instructions: [
        "Lakukan aktiviti ini dalam keadaan gelap.",
        "Susun kotak sinar dan cermin satah di atas sehelai kertas putih.",
        "Tujukan sinar cahaya yang menuju ke cermin satah pada sudut i = 10°.",
        "Ukur sudut pantulan, r.",
        "Ulang langkah 3 dan 4 dengan sudut tuju, i = 20°, 30°, 40° dan 50°.",
        "Catatkan keputusan anda dalam bentuk jadual di bawah.",
      ],
      angles: [10, 20, 30, 40, 50],
      printedResults: [
        {
          i: 10,
          r: null,
        },
        {
          i: 20,
          r: null,
        },
      ],
      conclusion:
        "Adakah hipotesis diterima? Apakah hubungan antara sudut tuju, i dengan sudut pantulan r?",
    },
    lateralInversion: {
      title: "Songsang sisi",
      word: "AMBULANS",
      prompt:
        "Pernahkah anda terfikir, tentang sebab perkataan “ambulans” ditulis secara songsang sisi? Bagaimanakah imej ini akan terbentuk apabila pemandu kenderaan lain melihat cermin pandang belakang kenderaan mereka? Fikirkan.",
      vehicle: "Ambulans",
      mirror: "Cermin pandang belakang",
      image: "Imej",
    },
    applications: {
      title: "Aplikasi Pantulan dalam Kehidupan Harian",
      items: ["Kon lalu lintas", "Papan tanda jalan", "Segi tiga amaran"],
    },
    practice: {
      title: "Praktis Formatif 8.3",
      questions: [
        "Terangkan hukum pantulan dengan bantuan rajah sinar pantulan cahaya.",
        "Lengkapkan pernyataan di bawah. Imej yang terbentuk pada cermin satah adalah ______, ______, ______ dan jarak objek ______ dengan jarak imej.",
      ],
    },
    labels: {
      materials: "Bahan dan radas",
      procedure: "Prosedur",
      variables: "Pemboleh ubah",
      hypothesis: "Hipotesis",
      results: "Keputusan",
      conclusion: "Kesimpulan",
      measure: "Ukur sudut pantulan, r.",
      schematic: "Gambar rajah sinar",
      unfilled: "Tidak dibekalkan dalam buku teks",
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
      "Kelajuan cahaya ialah 3.0 × 10⁸ m/s. Cahaya bergerak lebih laju daripada bunyi. Oleh itu, kita lihat kilat dahulu sebelum dengar bunyi guruh.",
      "Cahaya bergerak lurus.",
    ],
    shadowFormation: [
      "Cahaya matahari bergerak lurus.",
      "Payung ialah objek legap, maka cahaya matahari tidak dapat menembusinya.",
      "Apabila cahaya dihalang oleh objek legap, maka bayang-bayang akan terbentuk di belakang objek legap itu.",
    ],
    opaqueObject: {
      definition: "Objek legap tidak membenarkan cahaya menembusinya.",
      umbrella: "Payung = objek legap",
      blockedLight: "Cahaya dihalang",
      chain: [
        "Cahaya matahari bergerak lurus",
        "Objek legap menghalang cahaya",
        "Cahaya tidak dapat menembusinya",
        "Bayang-bayang terbentuk di belakang objek legap",
      ],
    },
    shadowChange:
      "Tahukah anda bahawa bayang-bayang anda akan menjadi pendek apabila menghampiri tengah hari dan kemudian menjadi panjang apabila waktu petang? Mengapa?",
    rainbow:
      "Salah satu sifat lain cahaya ialah cahaya boleh disebarkan oleh titisan air di langit untuk membentuk pelangi.",
    sundial: {
      title: "Jam matahari",
      explanation:
        "Jam matahari digunakan pada zaman dahulu untuk menentukan masa pada siang hari. Jam itu menggunakan konsep bayang-bayang yang terbentuk apabila cahaya matahari dihalang oleh objek.",
    },
    wayangKulit: {
      title: "Wayang kulit",
      explanation:
        "Wayang kulit menggunakan konsep bayang-bayang terbentuk apabila cahaya dihalang.",
    },
    practice: {
      title: "Praktis Formatif 8.2",
      questions: [
        "Bayang-bayang Hisyam adalah paling pendek pada waktu ______ ketika Matahari berada pada kedudukan ______.",
        "Rajah di sebelah menunjukkan dua objek legap yang disinarkan oleh lampu suluh. Lukiskan bentuk bayang-bayang yang akan terbentuk pada skrin.",
      ],
    },
    labels: {
      source: "Sumber cahaya",
      object: "Objek legap",
      shadow: "Bayang-bayang",
      screen: "Skrin",
      puppet: "Wayang kulit",
      pointer: "Penunjuk tegak",
      sun: "Cahaya matahari",
      position: "Kedudukan Matahari",
      torch: "Lampu suluh",
      blocks: "Bongkah kayu",
      speed: "3.0 × 10⁸ m/s",
    },
  },
  refraction: {
    definition:
      "Pembiasan cahaya ialah perubahan arah perambatan atau pembengkokan cahaya apabila cahaya bergerak melalui dua medium yang berbeza ketumpatan.",
    illusions: {
      pond: "Mengapakah dasar kolam yang dalam kelihatan cetek dan ikan yang berenang di dalam kolam itu kelihatan seperti berenang di atas permukaan air?",
      pencil: "Mengapakah pensel kelihatan bengkok di dalam gelas berisi air?",
    },
    fish: {
      title: "Ikan di dalam akuarium",
      explanation:
        "Ikan kelihatan seperti berada pada kedudukan yang lebih cetek berbanding dengan kedudukan asalnya kerana fenomena pembiasan cahaya.",
      question:
        "Disebabkan fenomena pembiasan cahaya, bagaimanakah anda dapat menangkap ikan di dalam sungai?",
    },
    cases: [
      {
        id: "water-air",
        scenario: "Air → Udara",
        from: "Air (lebih tumpat)",
        to: "Udara (kurang tumpat)",
        behavior:
          "Cahaya terbias menjauhi normal kerana sinar tuju bergerak dari medium lebih tumpat ke kurang tumpat.",
      },
      {
        id: "air-water",
        scenario: "Udara → Air",
        from: "Udara (kurang tumpat)",
        to: "Air (lebih tumpat)",
        behavior:
          "Cahaya terbias mendekati normal kerana sinar tuju bergerak dari medium kurang tumpat ke lebih tumpat.",
      },
      {
        id: "normal-water-air",
        scenario: "Air → Udara",
        from: "Air (lebih tumpat)",
        to: "Udara (kurang tumpat)",
        behavior:
          "Cahaya tidak terbias kerana sinar tuju selari dengan normal apabila sinar tuju bergerak dari medium lebih tumpat ke kurang tumpat.",
      },
      {
        id: "normal-air-water",
        scenario: "Udara → Air",
        from: "Udara (kurang tumpat)",
        to: "Air (lebih tumpat)",
        behavior:
          "Cahaya tidak terbias kerana sinar tuju selari dengan normal apabila sinar tuju bergerak dari medium kurang tumpat ke lebih tumpat.",
      },
    ],
    experiment: {
      title: "Eksperimen 8.2",
      problem:
        "Apakah hubungan antara sudut tuju dengan sudut biasan? Dengan menambahkan sudut tuju, adakah sudut biasan juga akan bertambah?",
      hypothesis: "Semakin besar sudut tuju, i, semakin besar sudut biasan, r.",
      aim: "Mengkaji hubungan antara sudut tuju, i dengan sudut biasan, r apabila cahaya bergerak dari medium kurang tumpat (udara) ke medium lebih tumpat (bongkah kaca)",
      variables: {
        manipulated: "Sudut tuju, i",
        responding: "Sudut biasan, r",
        constant: "Saiz celah dan bentuk bongkah kaca",
      },
      materials: [
        "Bongkah kaca",
        "Kotak sinar",
        "Plat satu celah",
        "Pembaris",
        "Bekalan kuasa",
        "Kertas putih",
        "Protraktor",
      ],
      instructions: [
        "Jalankan eksperimen ini di dalam bilik yang gelap.",
        "Letak satu bongkah kaca di atas sehelai kertas putih dan lakarkan bentuknya.",
        "Halakan satu sinar tuju ke bongkah tersebut, tandakan arahnya dan lukis sinar tuju tersebut dengan menggunakan pembaris.",
        "Tandakan arah sinar yang keluar dari bongkah tersebut dan lukis sinar tersebut dengan menggunakan pembaris.",
        "Alihkan bongkah kaca, sambungkan titik masuk dan titik keluar sinar tersebut untuk menunjukkan arah sinar dalam bongkah tersebut.",
        "Lukis garis normal pada titik masuk.",
        "Ukur sudut tuju, i dan sudut biasan, r dengan menggunakan protraktor.",
        "Ulang langkah 3 hingga 7 untuk sudut tuju yang berlainan.",
        "Rekodkan keputusan anda di dalam sebuah jadual.",
      ],
      results: [
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
        {
          i: null,
          r: null,
        },
      ],
      discussion: [
        "Plotkan graf i melawan r.",
        "Berdasarkan graf sudut tuju, i melawan sudut biasan, r, apakah hubungan antara sudut tuju, i dengan sudut biasan, r?",
      ],
      conclusion: "Adakah hipotesis eksperimen diterima?",
      questions: [
        "Apakah yang berlaku kepada sinar cahaya apabila sinar itu bergerak dari medium kurang tumpat ke medium lebih tumpat?",
        "Apakah yang berlaku kepada sinar cahaya apabila sinar itu bergerak dari medium lebih tumpat ke medium kurang tumpat?",
      ],
    },
    activity: {
      title: "Aktiviti 8.6",
      aim: "Menyiasat fenomena pembiasan cahaya",
      instructions: [
        "Jalankan aktiviti secara berkumpulan.",
        "Kenal pasti fenomena pembiasan cahaya seperti di bawah.",
        "Gunakan sumber-sumber seperti perpustakaan, Internet dan lain-lain untuk mengumpulkan maklumat berkenaan fenomena tersebut.",
        "Bentangkan hasil kajian anda di dalam kelas.",
      ],
      phenomena: [
        "Sudu kelihatan bengkok di dalam air",
        "Dasar kolam renang kelihatan lebih cetek",
      ],
      phenomenaAfter: 1,
    },
    practice: {
      title: "Praktis Formatif 8.4",
      questions: [
        "Mengapakah dasar kolam renang yang dalam kelihatan cetek?",
        "Sinar cahaya terbias pada sudut tertentu dalam dua kes seperti di bawah. Bezakan ketumpatan kedua-dua medium dalam kes di bawah.",
      ],
      caseLabels: ["Kes 1", "Kes 2"],
    },
    labels: {
      observer: "Pemerhati",
      actualFish: "Kedudukan sebenar ikan",
      image: "Imej yang dilihat",
      light: "Sinar cahaya",
      surface: "Permukaan air",
      air: "Udara",
      water: "Air",
      normal: "Garis normal",
      incident: "Sinar tuju",
      refracted: "Sinar biasan",
      emerging: "Sinar yang keluar",
      incidence: "Sudut tuju, i",
      refraction: "Sudut biasan, r",
      rayCases: "Gambar rajah sinar pembiasan cahaya",
      problem: "Pernyataan masalah",
      hypothesis: "Hipotesis",
      aim: "Tujuan",
      variables: "Pemboleh ubah",
      manipulated: "Pemboleh ubah dimanipulasikan",
      responding: "Pemboleh ubah bergerak balas",
      constant: "Pemboleh ubah dimalarkan",
      materials: "Bahan dan radas",
      procedure: "Prosedur",
      results: "Keputusan",
      discussion: "Perbincangan",
      conclusion: "Kesimpulan",
      questions: "Soalan",
      instructions: "Arahan",
      glass: "Bongkah kaca",
      box: "Kotak sinar",
      slit: "Satu celah",
      paper: "Kertas putih",
      power: "Bekalan kuasa",
      ruler: "Pembaris",
      protractor: "Protraktor",
      demo: "Demonstrasi rajah",
      stage: "Prosedur",
      outline: "Lakarkan bentuk bongkah kaca",
      rays: "Tandakan sinar tuju dan sinar yang keluar",
      remove: "Alihkan bongkah kaca",
      measure: "Lukis garis normal dan ukur i dan r",
      unfilled: "Keputusan buku teks yang kosong",
      whatYouSee: "Apa yang dilihat",
      rayDiagram: "Gambar rajah sinar",
    },
  },
  dispersion: {
    definition:
      "Cahaya putih terdiri daripada tujuh warna yang berlainan. Setiap juzuk warna ini akan bergerak dengan kelajuan yang berlainan dalam sesuatu medium.",
    spectrumOrder: ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Indigo", "Ungu"],
    speedFact:
      "Cahaya merah mempunyai kelajuan yang paling tinggi. Oleh itu, cahaya merah paling kurang dibiaskan. Cahaya ungu pula mempunyai kelajuan yang paling rendah dan paling banyak dibiaskan.",
    prismBehaviour: [
      "Apabila alur cahaya putih ditujukan ke arah prisma, sinar cahaya putih itu akan dipecahkan kepada komponen warna yang berbeza. Hal ini disebabkan oleh warna yang berbeza dalam cahaya putih itu membengkok ke arah mendekati garis normal pada sudut yang berlainan apabila memasuki prisma.",
      "Cahaya yang keluar daripada prisma kaca menjauhi garis normal. Cahaya yang keluar dari prisma telah disebarkan kepada tujuh warna dalam tertib susunan tertentu yang dikenal sebagai spektrum.",
    ],
    rainbowFormation:
      "Apabila sinar matahari mengenai titisan air hujan di langit, maka cahaya putih akan dibiaskan dan disebarkan kepada tujuh warna yang berlainan yang dikenal sebagai pelangi.",
    inquiry:
      "Apakah yang akan terjadi jika prisma kedua diletakkan terbalik di belakang prisma pertama?",
    labels: {
      prism: "Prisma kaca",
      white: "Cahaya putih",
      normal: "Garis normal",
      screen: "Skrin putih",
      spectrum: "Spektrum",
      sun: "Cahaya matahari",
      droplet: "Titisan air",
      rainbow: "Pembentukan pelangi",
      rayBox: "Kotak sinar",
      basin: "Besen",
      water: "Air",
      mirror: "Cermin",
      torch: "Lampu suluh",
      card: "Kadbod hitam dengan lubang kecil",
      paper: "Kertas putih",
      tape: "Pita selofan",
      instructions: "Arahan",
      apparatus: "Bahan dan radas",
    },
    activity: {
      title: "Aktiviti 8.7",
      aim: "Mengkaji penyebaran cahaya melalui prisma kaca dan pembentukan pelangi",
      apparatus: ["Prisma kaca", "Skrin putih", "Kotak sinar", "Cermin", "Gelas kaca"],
      parts: [
        {
          id: "A",
          title: "Penyebaran cahaya oleh prisma kaca",
          steps: [
            "Lakukan aktiviti ini dalam keadaan gelap.",
            "Tujukan alur cahaya yang sempit dari kotak sinar ke arah prisma kaca. Putarkan prisma kaca secara perlahan-lahan sehingga suatu spektrum warna yang tajam terbentuk pada skrin putih.",
            "Kenal pasti warna-warna yang terhasil dalam spektrum tersebut.",
            "Perhatikan tertib susunan warna yang kelihatan pada skrin putih.",
            "Rekodkan pemerhatian anda.",
          ],
        },
        {
          id: "B",
          title: "Pembentukan pelangi",
          steps: [
            "Isi air ke dalam sebuah besen sehingga separuh penuh.",
            "Masukkan sekeping cermin ke dalam air dengan keadaan condong pada sisi besen. Lekatkan cermin itu dengan pita selofan.",
            "Buat satu lubang kecil di tengah-tengah kadbod hitam. Kemudian, lekatkan kadbod hitam itu pada bahagian hadapan lampu suluh dengan pita selofan.",
            "Tujukan lampu suluh ke arah cermin itu.",
            "Pegang sekeping kertas putih di tepi cermin. Laraskan kedudukan lampu suluh sehingga anda dapat melihat pelangi.",
          ],
        },
      ],
    },
    practice: {
      title: "Praktis Formatif 8.5",
      questions: [
        "Senaraikan mengikut urutan tujuh warna yang terbentuk pada skrin dalam rajah mengikut urutan.",
        "Nyatakan komponen warna yang terbias paling banyak dan paling sedikit dalam fenomena di atas. Kaitkan fenomena ini dengan kelajuan setiap komponen warna tersebut.",
      ],
    },
  },
  scattering: {
    revision: {
      longerPath:
        "Pada waktu senja, cahaya matahari melalui lintasan yang lebih panjang dalam atmosfera berbanding pada waktu tengah hari.",
      blue: "Cahaya biru — diserak lebih banyak",
      red: "Cahaya merah dan jingga — diserak lebih sedikit",
      comparison: [
        {
          process: "Penyebaran Cahaya",
          explanation: "Cahaya putih dipisahkan kepada komponen warnanya.",
          examples: "Prisma · Pelangi",
        },
        {
          process: "Penyerakan Cahaya",
          explanation: "Zarah memantulkan cahaya ke arah yang berlainan.",
          examples: "Langit kebiruan · Langit kemerahan pada waktu senja",
        },
      ],
    },
    definition:
      "Penyerakan cahaya berlaku apabila sinar cahaya dihalang dan dipantulkan ke semua arah oleh awan atau zarah-zarah dalam udara.",
    middayExplanation:
      "Pada waktu tengah hari, cahaya biru diserak paling banyak ke semua arah oleh molekul-molekul udara yang halus dalam atmosfera. Oleh itu, langit kelihatan biru pada waktu tengah hari.",
    sunsetExplanation:
      "Pada waktu senja pula, cahaya matahari bersinar secara mengufuk. Cahaya yang paling kurang diserak seperti merah dan jingga akan melalui atmosfera tanpa gangguan. Cahaya lain seperti cahaya biru yang banyak diserak akan hilang daripada lintasan cahaya asal. Oleh itu, langit pada waktu senja kelihatan kemerahan.",
    labels: {
      midday: "Pada waktu tengah hari",
      sunset: "Pada waktu senja",
      sun: "Matahari",
      earth: "Bumi",
      observer: "Pemerhati",
      particles: "Zarah udara, habuk dan debu",
      blue: "Cahaya biru diserak oleh zarah-zarah yang terapung di udara",
      red: "Cahaya daripada matahari muncul kemerahan",
      atmosphere: "Atmosfera",
      side: "Sisi bekas",
      screen: "Skrin putih",
      rayBox: "Kotak sinar",
      water: "Air",
      milk: "Serbuk susu",
      beaker: "Bikar kaca 1000 ml",
      instructions: "Arahan",
      apparatus: "Bahan dan radas",
      questions: "Soalan",
    },
    activity: {
      title: "Aktiviti 8.8",
      aim: "Mengkaji penyerakan cahaya",
      apparatus: ["Serbuk susu", "Bikar kaca 1000 ml", "Kotak sinar", "Skrin putih"],
      steps: [
        "Lakukan aktiviti dalam keadaan gelap.",
        "Sediakan susunan radas seperti yang ditunjukkan dalam Rajah 8.23.",
        "Hidupkan kotak sinar.",
        "Tambahkan beberapa sudu serbuk susu ke dalam air. Kacau air sehingga anda dapat melihat alur cahaya yang bersinar melalui cecair dengan jelas.",
        "Lihat alur cahaya dari sisi bekas. Kemudian, lihat pada skrin putih seperti yang ditunjukkan dalam Rajah 8.23.",
        "Tambahkan lagi serbuk susu dan perhatikan warna alur cahaya putih berubah dari sisi bekas dan pada skrin putih.",
        "Rekodkan pemerhatian anda.",
      ],
      questions: [
        "Apakah fungsi penambahan serbuk susu ke dalam air?",
        "Apakah perbezaan antara alur cahaya yang dilihat dari sisi bekas dengan di belakang bekas? Apakah yang telah berlaku?",
      ],
    },
    practice: {
      title: "Praktis Formatif 8.6",
      questions: [
        "Mengapakah penyerakan cahaya berlaku?",
        "Isi tempat kosong dengan perkataan yang betul.",
      ],
      comparisons: [
        "Cahaya biru ______ diserak berbanding dengan cahaya merah.",
        "Cahaya merah ______ diserak berbanding dengan cahaya biru.",
      ],
    },
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
    "Cermin satah menghasilkan imej maya, tegak, songsang sisi, sama saiz, pada jarak yang sama di belakang cermin seperti objek di hadapan",
    "Cermin cekung membesarkan imej; cermin cembung memberi medan pandangan lebih luas dengan imej lebih kecil",
    "Hukum Pantulan: sudut tuju sama dengan sudut pantulan (i = r)",
    "Cahaya dibiaskan menjauhi normal apabila bergerak dari medium tumpat ke kurang tumpat, dan mendekati normal sebaliknya",
    "Cahaya putih disebarkan kepada merah, jingga, kuning, hijau, biru, indigo, ungu — merah membias paling sedikit, ungu paling banyak",
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
    "Penyebaran cahaya",
    "Spektrum",
    "Penyerakan cahaya",
    "Warna primer",
    "Warna sekunder",
    "Penambahan cahaya",
    "Penolakan cahaya",
  ],
  chapterSummary:
    "Bab 8 menerangkan bagaimana cahaya berkelakuan melalui cermin, pembiasan, penyebaran, penyerakan, dan percampuran warna — merangkumi ciri-ciri imej dalam cermin satah, cekung dan cembung, Hukum Pantulan, cara pembiasan membengkokkan cahaya antara medium berlainan ketumpatan, cara penyebaran memisahkan cahaya putih kepada spektrum, sebab penyerakan menjadikan langit biru atau merah, dan cara warna primer bergabung atau diserap untuk menghasilkan setiap warna yang kita lihat.",
};

export const chapter8Content = { en, bm };

export interface Chapter8Supplement {
  objectColourRows: { object: string; incident: string; reflected: string; absorbed: string }[];
  filters: { type: string; rule: string; examples: string[] }[];
  filterMatrix: { first: string; second: string; result: string; reason: string }[];
  activeRecall: { question: string; answer: string }[];
}

const supplementEn: Chapter8Supplement = {
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
