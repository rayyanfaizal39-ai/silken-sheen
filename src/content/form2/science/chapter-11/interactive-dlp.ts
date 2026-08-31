import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch11-bintang-galaksi.png";
import spiralImg from "@/assets/notes/form2-science/chapter-11/spiral.png";
import ellipticalImg from "@/assets/notes/form2-science/chapter-11/elliptical.png";
import irregularImg from "@/assets/notes/form2-science/chapter-11/irregular.png";

const STAR_GRADIENT = "linear-gradient(90deg,#ff4d4d,#ff9d4d,#ffe14d,#fff6d9,#ffffff,#cfe0ff,#4d7cfe)";

export const scienceF2C11InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 11,
  blogHighlight: {
    title: "Science Blog — Supernova Explosions",
    body: "A supernova is an extremely powerful explosion of a large star. Each explosion produces more than 100 times the light energy the Sun has released throughout its 10-billion-year existence. The last supernova happened about 400 years ago but was only detected in 1987.",
    imagePath: chapterImage,
  },
  keywords: [
    "Galaxy",
    "The Milky Way",
    "Nebula",
    "Star",
    "Solar system",
    "Red giant",
    "Supergiant",
    "Supernova",
    "White dwarf",
    "Neutron star",
    "Black hole",
  ],
  sections: [
    {
      number: "11.1",
      title: "Galaxies and the Universe",
      intro:
        "The universe consists of everything that exists around us, and there are millions of galaxies within it. A galaxy is a collection of bodies made up of millions of stars together with gas and dust. Galaxies exist in several shapes: spiral galaxies, elliptical galaxies and irregular galaxies. Astronomy carried out with technology such as telescopes has made us aware of the beauty and vastness of the universe.",
      cards: [
        {
          title: "🔭 Technology helps us study space",
          body: "The Hubble Space Telescope was launched on 24 April 1990. It is so powerful that it can see a coin lying 725 km away from it.",
        },
      ],
      galaxyCards: {
        title: "🌀 Three types of galaxy",
        instruction: "Look at the three types of galaxy and an example of each.",
        cards: [
          { id: "spiral", image: spiralImg, name: "Spiral galaxy", example: "Examples: Andromeda and the Milky Way" },
          { id: "elliptical", image: ellipticalImg, name: "Elliptical galaxy", example: "Examples: Ursa Major and Messier 87" },
          { id: "irregular", image: irregularImg, name: "Irregular galaxy", example: "Examples: the Small and Large Magellanic Clouds" },
        ],
      },
      checks: [
        {
          question: "What is a galaxy?",
          hint: "A galaxy is a collection of bodies made up of millions of stars together with gas and dust.",
        },
        {
          question: "Name the three types of galaxy and give one example of each.",
          hint: "Spiral (Andromeda, the Milky Way); elliptical (Ursa Major, Messier 87); irregular (the Small and Large Magellanic Clouds).",
        },
      ],
    },
    {
      number: "11.1",
      title: "The Milky Way, the Solar System's Location and Relative Scale",
      intro:
        "Our solar system lies inside the Milky Way galaxy. The Milky Way is a medium-sized spiral galaxy, and our solar system sits at the edge of one of its spiral arms. The Milky Way contains roughly 200 billion stars, and the Sun is one of them.",
      milkyWayLocator: {
        title: "🌌 Where the solar system sits in the Milky Way",
        galaxyLabel: "The Milky Way galaxy",
        solarSystemLabel: "Solar system",
        centreLabel: "Galactic centre",
        armLabel: "at the edge of one spiral arm",
        facts: [
          "The Milky Way is a medium-sized spiral galaxy.",
          "Our solar system sits at the edge of one of the Milky Way's spiral arms.",
          "The Milky Way contains roughly 200 billion stars, and the Sun is one of them.",
        ],
        caption: "Our solar system is not at the galactic centre — it lies out at the edge of a spiral arm.",
        hint: "The diagram is not drawn to scale.",
      },
      cosmicScale: {
        title: "🪐 Comparing relative sizes",
        instruction: "Tap each level to see what it contains.",
        tiers: [
          { id: "bumi", label: "Earth", note: "The planet we live on. Earth is smaller than a speck of dust when compared with the universe." },
          { id: "sistem-suria", label: "Solar system", note: "Eight planets orbiting the Sun, including Earth." },
          { id: "bima-sakti", label: "The Milky Way galaxy", note: "The galaxy that holds our solar system, together with roughly 200 billion stars." },
          { id: "kumpulan", label: "Group of galaxies", note: "Several galaxies lying near one another." },
          { id: "gugusan", label: "Cluster of galaxies", note: "A still larger collection of galaxy groups." },
          { id: "alam-semesta", label: "The universe", note: "Everything that exists. We cannot see where it ends." },
        ],
        notToScaleLabel: "Diagram not drawn to scale",
        caption: "Each level is contained within the next one.",
        hint: "This ordering shows what contains what, not real size ratios.",
      },
      checks: [
        {
          question: "Where is our solar system located within the Milky Way galaxy?",
          hint: "At the edge of one of the Milky Way's spiral arms — not at the galactic centre.",
        },
        {
          question: "Put these in order of what contains what: Earth, the universe, the solar system, the Milky Way galaxy.",
          hint: "Earth → solar system → the Milky Way galaxy → group of galaxies → cluster of galaxies → the universe.",
        },
      ],
    },
    {
      number: "11.1",
      title: "The Life Cycle of Stars",
      intro:
        "Stars are born from a nebula. A nebula is a vast cloud made up of dust and gases such as hydrogen and helium. Strong gravitational attraction pulls the gas and dust particles together into a clump that contracts and compresses into a core. When the temperature and pressure in the core become very high, a nuclear reaction takes place and hydrogen gas is converted into helium, releasing a great deal of heat and light energy. The core shines and a star is born.",
      accordions: [
        {
          title: "☁️ The birth of a star",
          body: "Gases and dust particles in a nebula are pulled together by strong gravitational attraction to form a clump. The clump contracts and compresses until it becomes very dense and forms a core. When the temperature and pressure in the core become very high, a nuclear reaction takes place and hydrogen gas is converted into helium. The core shines and a star is born — a newly born star is known as a young star.",
        },
        {
          title: "🔴 The death of a star",
          body: "The large amount of heat generated warms the star's outermost layer until the hydrogen in that layer begins to burn and the star expands. At this stage the star is red and is called a red giant. If the red giant is not very large, a white dwarf forms. If the red giant is very large, it contracts rapidly and produces a huge explosion called a supernova, forming a neutron star. If the original star was very large indeed, the supernova explosion forms a black hole.",
        },
        {
          title: "⚫ What is a black hole?",
          body: "A black hole is a region that does not allow any matter to escape from it, including light.",
        },
      ],
      stellarLifecycle: {
        title: "⭐ The life cycle of a star",
        instruction: "Tap each type of star to follow its pathway.",
        originLabel: "Nebula",
        originNote: "Every star begins from a nebula.",
        branches: [
          {
            id: "medium",
            label: "Medium-sized star",
            stages: ["Medium-sized star", "Red giant", "White dwarf"],
            note: "A medium-sized star such as the Sun becomes a red giant, and because that red giant is not very large it ends as a white dwarf. This pathway does not pass through a supernova.",
          },
          {
            id: "large",
            label: "Large star",
            stages: ["Large star", "Red giant", "Supergiant", "Supernova", "Neutron star"],
            note: "A large star becomes a red giant and then a supergiant. Because that red giant is very large, it contracts rapidly and explodes as a supernova, forming a neutron star.",
          },
          {
            id: "superlarge",
            label: "Very large star",
            stages: ["Very large star", "Red giant", "Supergiant", "Supernova", "Black hole"],
            note: "For a star that was originally very large indeed, the supernova explosion forms a black hole rather than a neutron star.",
          },
        ],
        outcomeLabel: "Final stage",
        caption: "Every star begins from a nebula, but what follows depends on the size of that star.",
        hint: "Notice that only large and very large stars pass through a supernova. Medium-sized stars do not explode.",
      },
      checks: [
        {
          question: "What determines whether a star ends as a white dwarf, a neutron star or a black hole?",
          hint: "The size of the star. Medium-sized stars become white dwarfs; large stars form neutron stars after a supernova; very large stars form black holes.",
        },
        {
          question: "The Sun is a medium-sized star. Will the Sun become a black hole?",
          hint: "No. A medium-sized star passes through the red giant stage and ends as a white dwarf — that pathway passes through neither a supernova nor a black hole.",
        },
      ],
    },
    {
      number: "11.1",
      title: "Characteristics of Stars",
      intro:
        "If you look at the night sky, some stars appear bright and others appear dim. Stars can be classified by five characteristics: temperature, size, distance, colour and brightness. In general, a star's colour follows its surface temperature, running from lower temperatures to higher ones.",
      cards: [
        {
          title: "🌡️ Colour and temperature",
          body: "A star's colour shows its surface temperature. Red stars are the coolest, while blue stars are the hottest.",
        },
        {
          title: "📏 Size",
          body: "A very large star is called a supergiant star, a large star is called a giant star, and a very small star is called a dwarf star.",
        },
        {
          title: "✨ Brightness and distance",
          body: "The observed brightness of a star depends on its size, its distance from Earth and its surface temperature. The brightest stars in the sky are Sirius and Rigel.",
        },
      ],
      phSlider: {
        title: "🌈 Star colour and temperature scale",
        instruction: "Drag to see how a star's colour relates to its surface temperature.",
        gradient: STAR_GRADIENT,
        unitLabel: "",
        ariaLabel: "Star colour and temperature scale",
        tickLabels: ["Red", "Orange", "Yellow", "Yellow-white", "White", "Blue-white", "Blue"],
        initialValue: 0,
        scale: [
          { value: 0, name: "Red", description: "Less than 3 500 K — the coolest stars." },
          { value: 1, name: "Orange", description: "3 500 – 5 000 K." },
          { value: 2, name: "Yellow", description: "5 000 – 6 000 K." },
          { value: 3, name: "Yellow-white", description: "6 000 – 7 500 K." },
          { value: 4, name: "White", description: "7 500 – 11 000 K." },
          { value: 5, name: "Blue-white", description: "11 000 – 25 000 K." },
          { value: 6, name: "Blue", description: "Above 25 000 K — the hottest stars." },
        ],
      },
      starSizeCompare: {
        title: "⭕ Comparing star sizes",
        sizes: [
          { id: "super", label: "Supergiant", relative: 1, note: "A very large star." },
          { id: "raksasa", label: "Giant", relative: 0.5, note: "A large star." },
          { id: "kerdil", label: "Dwarf", relative: 0.16, note: "A very small star." },
        ],
        caption: "Diagram not drawn to scale",
        hint: "Note that dwarf here is a size category. A white dwarf is the final stage in the life cycle of a medium-sized star.",
      },
      checks: [
        {
          question: "One star appears blue and another appears red. Which one is hotter?",
          hint: "The blue star. Blue stars are above 25 000 K while red stars are below 3 500 K.",
        },
        {
          question: "What three factors determine the observed brightness of a star seen from Earth?",
          hint: "The star's size, its distance from Earth, and its surface temperature.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can state what a galaxy is and name three types of galaxy with examples.",
    "I can state where the solar system is located within the Milky Way galaxy.",
    "I can order Earth, the solar system, the Milky Way galaxy and the universe by what contains what.",
    "I can explain how a star is born from a nebula.",
    "I can distinguish the life-cycle pathways of medium-sized, large and very large stars.",
    "I can classify stars by temperature, size, distance, colour and brightness.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: The Sun is the largest and brightest star in the universe.",
      answer: false,
      explanation: "The Sun only appears that way because it is far closer to Earth. A star's observed brightness depends on its size, its distance from Earth and its surface temperature.",
    },
    {
      type: "multiple-choice",
      question: "What are stars formed from?",
      options: ["Asteroids", "A nebula", "Black holes", "Comets"],
      answerIndex: 1,
      explanation: "A nebula is a vast cloud made up of dust and gases such as hydrogen and helium. Gravity compresses it until a star is born.",
    },
    {
      type: "multiple-choice",
      question: "A medium-sized star such as the Sun will end as what?",
      options: ["A black hole", "A neutron star", "A white dwarf", "A supernova"],
      answerIndex: 2,
      explanation: "A medium-sized star becomes a red giant, and because that red giant is not very large it ends as a white dwarf. This pathway does not pass through a supernova.",
    },
  ],
};
