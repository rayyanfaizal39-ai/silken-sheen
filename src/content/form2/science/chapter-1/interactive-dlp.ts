import type { DichotomousQuestion, SciF2C1Content } from "./interactive-types";
import rafflesiaImg from "@/assets/notes/form2-science/chapter-1/rafflesia.jpg";
import habitatSeaImg from "@/assets/notes/form2-science/chapter-1/sea.jpg";
import habitatDesertImg from "@/assets/notes/form2-science/chapter-1/desert.jpg";
import habitatPolarImg from "@/assets/notes/form2-science/chapter-1/polar.jpg";
import habitatSoilImg from "@/assets/notes/form2-science/chapter-1/soil.jpg";
import animalOverviewImg from "@/assets/notes/form2-science/chapter-1/chapter1_animal_classification_overview.webp";
import vertebrateGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_five_vertebrate_groups.webp";
import invertebrateGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_invertebrate_classification.webp";
import plantGroupsImg from "@/assets/notes/form2-science/chapter-1/chapter1_plant_classification.webp";
import keyOrganismSetImg from "@/assets/notes/form2-science/chapter-1/chapter1_dichotomous_key_organism_set.webp";

const dichotomousKeyDLP: DichotomousQuestion = {
  type: "question",
  question: "Is it poikilothermic (cold-blooded) or homeothermic (warm-blooded)?",
  choices: [
    {
      label: "Poikilothermic",
      next: {
        type: "question",
        question: "Does it have scaly skin, or non-scaly moist skin?",
        choices: [
          {
            label: "Scaly skin",
            next: {
              type: "question",
              question: "Does it have fins, or no fins?",
              choices: [
                { label: "Has fins", next: { type: "leaf", organism: "Pomfret" } },
                { label: "Does not have fins", next: { type: "leaf", organism: "Snake" } },
              ],
            },
          },
          { label: "Non-scaly skin", next: { type: "leaf", organism: "Frog" } },
        ],
      },
    },
    {
      label: "Homeothermic",
      next: {
        type: "question",
        question: "Is it feathered or non-feathered?",
        choices: [
          { label: "Feathered", next: { type: "leaf", organism: "Chicken" } },
          { label: "Non-feathered", next: { type: "leaf", organism: "Lion" } },
        ],
      },
    },
  ],
};

export const scienceF2C1InteractiveDLP: SciF2C1Content = {
  blogHighlight: {
    title: "🌸 Science Blog — The Rafflesia",
    body: "Malaysia is home to the world's largest flower, the parasitic rafflesia — it has no leaves, no roots, and releases a rotting smell to attract pollinators when in full bloom.",
    imagePath: rafflesiaImg,
  },
  classificationImages: {
    animalOverview: {
      src: animalOverviewImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Animals with a backbone such as a fish, frog, lizard, bird and cat on the left; animals without a backbone such as a butterfly, spider, jellyfish, snail and worm on the right.",
      aspect: "3 / 2",
      annotations: [
        { id: "vert", label: "Vertebrates", x: 26, y: 8, note: "Animals that have a backbone inside the body." },
        { id: "vert-trait", label: "Backbone present", x: 26, y: 95, note: "The backbone supports the body and protects the spinal cord." },
        { id: "invert", label: "Invertebrates", x: 74, y: 8, note: "Animals that do not have a backbone." },
        { id: "invert-trait", label: "No backbone", x: 74, y: 95, note: "The body is supported by an outer skeleton or fluid pressure instead of a backbone." },
      ],
    },
    vertebrateGroups: {
      src: vertebrateGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "The five vertebrate groups: a fish in water, a frog beside a pond, a lizard on the ground, a bird on a branch and a cat on grass.",
      aspect: "4 / 3",
      annotations: [
        { id: "fish", label: "Fish", x: 17, y: 48, note: "Cold-blooded, breathes through gills, has a scaly body and fins for swimming." },
        { id: "amphibian", label: "Amphibians", x: 46, y: 49, note: "Cold-blooded. Tadpoles breathe through gills; adults breathe through lungs and moist skin." },
        { id: "reptile", label: "Reptiles", x: 79, y: 51, note: "Cold-blooded, breathes through lungs, has dry scaly skin and lays shelled eggs." },
        { id: "bird", label: "Birds", x: 29, y: 88, note: "Warm-blooded, body covered with feathers, breathes through lungs and lays eggs." },
        { id: "mammal", label: "Mammals", x: 68, y: 89, note: "Warm-blooded, body covered with hair, breathes through lungs and feeds young on milk." },
      ],
    },
    invertebrateGroups: {
      src: invertebrateGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Four invertebrate groups in four panels: a snail and a jellyfish; an earthworm and a leech; a grasshopper; a spider, a crab and a centipede.",
      aspect: "4 / 3",
      legendLabel: "The four invertebrate groups",
      caption: "Each panel groups animals that share the same feature.",
      annotations: [
        { id: "unseg", label: "No legs + unsegmented body", x: 27, y: 10, note: "Examples: snail and jellyfish. Soft body with no segments and no legs." },
        { id: "seg", label: "No legs + segmented body", x: 73, y: 10, note: "Examples: earthworm and leech. Body divided into ring-like segments, with no legs." },
        { id: "three", label: "3 pairs of legs", x: 27, y: 56, note: "Example: grasshopper. Insects have three pairs of legs and a body in three parts." },
        { id: "more", label: "More than 3 pairs of legs", x: 73, y: 56, note: "Examples: spider, crab and centipede. They have more than three pairs of legs." },
      ],
    },
    plantGroups: {
      src: plantGroupsImg,
      annotationMode: "labels",
      size: "standard",
      alt: "Four plant groups: moss on a rock, a fern with sori beneath its fronds, a conifer with a cone, and a flowering plant with a flower and a fruit.",
      aspect: "1 / 1",
      annotations: [
        { id: "moss", label: "Moss", x: 26, y: 47, note: "A non-vascular plant. It has no transport tissue, reproduces by spores and grows low in damp places." },
        { id: "fern", label: "Fern", x: 71, y: 47, note: "A vascular plant without flowers or seeds. It reproduces by spores found under its fronds." },
        { id: "conifer", label: "Conifer", x: 26, y: 96, note: "A seed plant without flowers. Its seeds sit exposed inside a cone." },
        { id: "flowering", label: "Flowering plant", x: 72, y: 96, note: "A flowering plant. Its seeds are enclosed in a fruit that develops from the flower." },
      ],
    },
    keyOrganismSet: {
      src: keyOrganismSetImg,
      annotationMode: "clean",
      size: "compact",
      alt: "Eight organisms arranged for comparison: a fish, frog, lizard, bird, cat, butterfly, spider and snail.",
      aspect: "3 / 2",
      caption:
        "Feature reference: compare backbone, body covering and number of legs before answering each question in the key below.",
      annotations: [
        { id: "fish", label: "Fish", x: 14, y: 51, note: "Cold-blooded, breathes through gills, has a scaly body and fins for swimming." },
        { id: "frog", label: "Frog", x: 37, y: 51 },
        { id: "lizard", label: "Lizard", x: 61, y: 51 },
        { id: "bird", label: "Bird", x: 85, y: 51, note: "Warm-blooded, body covered with feathers, breathes through lungs and lays eggs." },
        { id: "cat", label: "Cat", x: 14, y: 94 },
        { id: "butterfly", label: "Butterfly", x: 37, y: 94 },
        { id: "spider", label: "Spider", x: 61, y: 94 },
        { id: "snail", label: "Snail", x: 85, y: 94 },
      ],
    },
  },
  keywords: [
    {
      term: "Biodiversity",
      definition:
        "The full variety of living things — microorganisms, animals and plants — across genes, species and habitats.",
    },
    {
      term: "Vertebrate",
      definition: "An animal with a backbone: fish, amphibians, reptiles, birds or mammals.",
    },
    {
      term: "Invertebrate",
      definition: "An animal without a backbone, e.g. insects, worms, spiders.",
    },
    {
      term: "Mammal",
      definition: "Warm-blooded, fur or hair, breathes with lungs, gives birth and nurses young.",
    },
    { term: "Bird", definition: "Warm-blooded, feathers, lungs, lays hard-shelled eggs." },
    {
      term: "Reptile",
      definition: "Cold-blooded, scaly skin, lays shelled eggs, breathes with lungs.",
    },
    {
      term: "Fish",
      definition: "Cold-blooded, scales, breathes through gills, lays eggs in water.",
    },
    {
      term: "Amphibian",
      definition: "Cold-blooded, moist skin, lives on land and water, lays unshelled eggs.",
    },
    {
      term: "Monocotyledon",
      definition: "A flowering plant whose seed has one cotyledon, e.g. paddy.",
    },
    {
      term: "Dicotyledon",
      definition: "A flowering plant whose seed has two cotyledons, e.g. sunflower.",
    },
  ],
  habitats: [
    {
      id: "desert",
      icon: "🏜️",
      label: "Desert",
      fact: "Species here cope with scorching days, cold nights, and almost no water.",
      imagePath: habitatDesertImg,
    },
    {
      id: "polar",
      icon: "❄️",
      label: "Polar regions",
      fact: "Thick fur, fat layers and huddling behaviour fight extreme cold.",
      imagePath: habitatPolarImg,
    },
    {
      id: "soil",
      icon: "🪱",
      label: "Soil",
      fact: "Home to decomposers and burrowers that recycle nutrients unseen.",
      imagePath: habitatSoilImg,
    },
    {
      id: "sea",
      icon: "🌊",
      label: "Sea",
      fact: "From plankton to whales — the largest habitat by volume on Earth.",
      imagePath: habitatSeaImg,
    },
  ],
  importance: [
    {
      icon: "🍚",
      title: "Food source",
      description: "Animals and plants supply the food humans rely on daily.",
    },
    {
      icon: "⚖️",
      title: "Balance in nature",
      description: "Nutrient cycles, pollination and interaction keep ecosystems stable.",
    },
    {
      icon: "🏕️",
      title: "Recreation",
      description: "Biodiversity-rich areas become parks and eco-tourism destinations.",
    },
    {
      icon: "💊",
      title: "Medicine",
      description: "Herbs and plant compounds feed into medicine and cosmetics.",
    },
    {
      icon: "🪵",
      title: "Raw materials",
      description: "Timber, bamboo and rattan build furniture, instruments and homes.",
    },
    {
      icon: "🔬",
      title: "Education",
      description: "Studying organisms drives scientific research and new technology.",
    },
  ],
  historyFact:
    "🗓 Today in History — International Day for Biological Diversity is marked every 22 May.",
  conservationMethods: [
    {
      id: "in-situ",
      label: "In situ",
      description:
        "Conserves a species inside its own natural habitat — think national parks, permanent forest reserves and marine parks.",
    },
    {
      id: "ex-situ",
      label: "Ex situ",
      description: "Conserves a species outside its natural habitat — think zoos and botanical gardens.",
    },
  ],
  humanImpact: [
    {
      icon: "🪓",
      activity: "Deforestation for timber and development",
      chain: [
        "Forest is cleared",
        "Animals lose their habitat",
        "Animals lose their food source",
        "Species are pushed toward extinction",
      ],
    },
    {
      icon: "🎯",
      activity: "Hunting and wildlife trade",
      chain: [
        "Animals are hunted or traded",
        "Population numbers fall quickly",
        "Endemic and threatened species are hit hardest",
        "The Wildlife Protection Act 1972 bans it",
      ],
    },
    {
      icon: "⚖️",
      activity: "Development needs vs. preservation",
      chain: [
        "People need raw materials such as timber",
        "So deforestation must be CONTROLLED",
        "Biodiversity is protected from extinction",
      ],
    },
  ],
  speciesConcepts: [
    {
      id: "endemic",
      label: "Endemic species",
      definition:
        "A species that lives only within a restricted habitat in one specific location — found nowhere else naturally. Endemic tells you about LOCATION.",
      examples: [
        "🌸 Rafflesia",
        "🪤 Pitcher plant (Nepenthes rajah)",
        "🐢 Leatherback turtle",
        "🐅 Malayan tiger",
        "🐘 Borneo pygmy elephant",
      ],
    },
    {
      id: "threatened",
      label: "Threatened species",
      definition:
        "A species whose numbers are falling so far that it risks extinction. Threatened tells you about RISK OF EXTINCTION, not location. The Wildlife Protection Act 1972 bans killing or trading them.",
      examples: ["🐅 Malayan tiger", "🐢 Leatherback turtle", "🐘 Borneo pygmy elephant", "🦜 Hornbill"],
    },
  ],
  speciesCaution:
    "Endemic and threatened are NOT the same thing. A species can be endemic only, threatened only, or both at once — the Malayan tiger, for example, is endemic and also threatened.",
  checkYourself11: [
    {
      question: "What is biodiversity, in your own words?",
      hint: "Think: microorganisms + animals + plants + the habitats and genes that make each one different.",
    },
    {
      question: "How does biodiversity support the economy?",
      hint: "Consider raw materials (timber, rattan), medicine ingredients, and eco-tourism / recreation income.",
    },
    {
      question: "What makes a species \"endemic\"?",
      hint: "It lives only within a restricted habitat in one specific location — nowhere else naturally.",
    },
    {
      question: "What is the difference between an endemic species and a threatened species? Give one example of each.",
      hint: "Endemic = restricted location (e.g. the pitcher plant, Nepenthes rajah). Threatened = at risk of extinction (e.g. the protected hornbill). The Malayan tiger is both at once.",
    },
  ],
  animalBranches: [
    {
      id: "invert",
      label: "Invertebrates — no backbone",
      subGroups: [
        {
          label: "Without legs",
          groups: [
            { label: "Body without segments", chips: ["Sponge", "Coral", "Planaria", "Snail"] },
            { label: "Segmented body", chips: ["Earthworm", "Leech", "Tapeworm"] },
          ],
        },
        {
          label: "With legs",
          detail: "Shared characteristics of legged invertebrates: a segmented body, and a hard outer skin (exoskeleton).",
          groups: [
            { label: "Three pairs of legs", chips: ["Ant", "Butterfly", "Cockroach"] },
            {
              label: "More than three pairs of legs",
              chips: ["Spider", "Scorpion", "Centipede", "Prawn", "Horseshoe crab"],
            },
          ],
        },
      ],
    },
    {
      id: "vert",
      label: "Vertebrates — has a backbone",
      vertebrateGroups: [
        {
          name: "Fish",
          traits: [
            "Poikilothermic",
            "Hard, slimy scales",
            "Fins and a tail",
            "Breathes through gills",
            "Lays eggs, external fertilisation",
          ],
          examples: ["Grouper", "Clownfish", "Eel"],
        },
        {
          name: "Amphibians",
          traits: [
            "Poikilothermic",
            "Lives on land and water",
            "Moist skin",
            "Young breathe via gills, adults via lungs + skin",
            "Jelly-like eggs, no shell",
          ],
          examples: ["Frog", "Toad", "Salamander"],
        },
        {
          name: "Reptiles",
          traits: [
            "Poikilothermic",
            "Eggs with a shell",
            "Breathes through lungs",
            "Scaly, hard skin",
            "Internal fertilisation",
          ],
          examples: ["Turtle", "Snake", "Crocodile", "Iguana"],
        },
        {
          name: "Birds",
          traits: [
            "Homeothermic",
            "Feathers for warmth",
            "Breathes through lungs",
            "Wings, scaly feet",
            "Hard-shelled eggs",
          ],
          examples: ["Owl", "Kingfisher", "Duck"],
        },
        {
          name: "Mammals",
          traits: [
            "Homeothermic",
            "Body covered with fur and hair (not feathers)",
            "Breathes through lungs",
            "Internal fertilisation",
            "Gives birth, nurses young",
          ],
          examples: ["Bat", "Giraffe", "Elephant", "Lion"],
        },
      ],
    },
  ],
  plantBranches: [
    {
      id: "nonflower",
      label: "Non-flowering",
      chips: ["Moss — spores, non-vascular", "Fern — spores, vascular", "Conifer — cones, vascular"],
    },
    {
      id: "flower",
      label: "Flowering",
      detail:
        "Every seed carries a cotyledon — its stored starter food. One cotyledon = monocotyledon. A pair = dicotyledon.",
    },
  ],
  cotyledonCompare: [
    {
      icon: "🌾",
      label: "Monocotyledon",
      rows: [
        { term: "Cotyledons", value: "One" },
        { term: "Root", value: "Fibrous root" },
        { term: "Leaf", value: "Parallel veins" },
        { term: "Stem", value: "Mostly non-woody" },
        { term: "Example", value: "Paddy, maize" },
      ],
    },
    {
      icon: "🌻",
      label: "Dicotyledon",
      rows: [
        { term: "Cotyledons", value: "Two" },
        { term: "Root", value: "Tap root" },
        { term: "Leaf", value: "Network-like veins" },
        { term: "Stem", value: "Woody" },
        { term: "Example", value: "Tomato, durian" },
      ],
    },
  ],
  dichotomousOrganisms: ["Pomfret", "Chicken", "Lion", "Frog", "Snake"],
  dichotomousKey: dichotomousKeyDLP,
  checkYourself12: [
    {
      question: "Sort: eagle, frog, cobra, goldfish, tiger — by vertebrate group.",
      hint: "Match each to Birds / Amphibians / Reptiles / Fish / Mammals using breathing method and skin covering.",
    },
    {
      question: "One similarity + three differences: sunflower vs paddy plant.",
      hint: "Similarity: both are flowering plants. Differences: cotyledon count, root type, leaf vein pattern.",
    },
    {
      question: "Two differences between monocotyledon and dicotyledon.",
      hint: "Compare root type (fibrous vs tap) and leaf vein pattern (parallel vs network-like).",
    },
  ],
  reflectionItems: [
    "I can explain biodiversity and why it matters.",
    "I can justify why biodiversity needs to be actively managed.",
    "I can sort organisms using a dichotomous key.",
    "I can describe the major taxonomy groups.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "True or false: Besides living things, a dichotomous key can also be used to classify non-living things.",
      answer: true,
      explanation:
        "True. A dichotomous key is an either/or identification method, so it works for anything that can be separated by paired characteristics — including non-living things such as rocks or manufactured objects. In this chapter we use it to classify organisms.",
    },
    {
      type: "multiple-choice",
      question:
        "Which animal's YOUNG breathe through gills, while the ADULT breathes through lungs and moist skin?",
      options: ["Crocodile", "Frog", "Eagle", "Grouper"],
      answerIndex: 1,
      explanation:
        "The frog is an amphibian. Tadpoles (young frogs) breathe through gills, while adult frogs breathe through lungs and moist skin. Amphibian eggs are jelly-like and have no shell.",
    },
  ],
};
