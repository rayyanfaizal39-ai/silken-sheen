import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch11-bintang-galaksi.png";
import spiralImg from "@/assets/notes/form2-science/chapter-11/spiral.png";
import ellipticalImg from "@/assets/notes/form2-science/chapter-11/elliptical.png";
import irregularImg from "@/assets/notes/form2-science/chapter-11/irregular.png";
import nebulaImg from "@/assets/notes/form2-science/chapter-11/nebula.png";

const STAR_GRADIENT = "linear-gradient(90deg,#ff4d4d,#ff9d4d,#ffe14d,#fff6d9,#ffffff,#cfe0ff,#4d7cfe)";

export const scienceF2C11InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 11,
  blogHighlight: {
    title: "Science Blog — Supernova Explosions",
    body: "A supernova — the explosive death of a massive star — releases 100 times more light energy than our entire Sun. The last one visible to the naked eye was detected in 1987, even though the explosion itself happened around 400 years earlier — the light just took that long to reach us.",
    imagePath: chapterImage,
  },
  keywords: [
    "Galaxy",
    "The Milky Way",
    "Nebula",
    "Stars",
    "Solar system",
    "Protostar",
    "Red giant",
    "White dwarf",
    "Supernova",
    "Neutron star",
    "Black hole",
  ],
  sections: [
    {
      number: "11.1",
      title: "Galaxies in the Universe",
      intro:
        "The universe consists of every existing thing around us — so vast that millions of galaxies exist within it. A galaxy is a massive collection of millions (often billions) of stars, held together with gas and dust by gravity. Astronomy and technology such as the Hubble Space Telescope (launched 24th April 1990, powerful enough to see a coin from 725 km away) have raised our awareness of just how vast the universe is. The Milky Way — a medium-large spiral galaxy that houses our solar system near the edge of one of its spiral arms — consists of roughly 200 billion stars, and the Sun is just one of them.",
      accordions: [
        { title: "🌍 Earth", body: "Our home planet — smaller than a speck of dust compared to the universe as a whole." },
        { title: "☀️ Solar System", body: "The Sun plus 8 orbiting planets, including Earth." },
        { title: "🌌 The Milky Way", body: "A single galaxy containing roughly 200 billion stars — our solar system is just one tiny part of it." },
        { title: "✨ A cluster of galaxies", body: "Groups of galaxies bound together by gravity — the Milky Way is part of one such group." },
        { title: "♾️ The Universe", body: "Everything that exists — millions of galaxy clusters, with no observed end." },
      ],
      galaxyCards: {
        title: "🌀 Three main galaxy shapes",
        instruction: "Galaxies come in many forms. Look at the three main shapes and their examples.",
        cards: [
          { id: "spiral", image: spiralImg, name: "Spiral Galaxy", example: "e.g. Andromeda, the Milky Way" },
          { id: "elliptical", image: ellipticalImg, name: "Elliptical Galaxy", example: "e.g. Ursa Major, Messier 87" },
          { id: "irregular", image: irregularImg, name: "Irregular Galaxy", example: "e.g. the Small and Large Magellanic Clouds" },
        ],
      },
      checks: [
        { question: "What galaxy type is the Milky Way?", hint: "A spiral galaxy — like Andromeda, one of its closest neighbours." },
      ],
    },
    {
      number: "11.2",
      title: "The Life and Character of Stars",
      intro:
        "Stars are massive glowing balls of gas that generate their own light and heat through nuclear reactions. Stars can be classified based on five characteristics: colour, temperature, size, brightness and distance from Earth. Every star also goes through its own life cycle — from birth inside a nebula to death as a white dwarf, neutron star or black hole, depending on its original size (the Nebular Hypothesis).",
      cards: [
        {
          title: "Colour and temperature",
          body: "A star's colour reveals its surface temperature. Classification (K): Red (<3,500), Orange (3,500–5,000), Yellow (5,000–6,000, the Sun's range), Yellowish-white (6,000–7,500), White (7,500–11,000), Bluish-white (11,000–25,000), Blue (>25,000).",
        },
        {
          title: "Star size",
          body: "Really big stars are called supergiant stars; big stars are called giant stars; really small ones are called dwarf stars — though even dwarf stars are still far bigger than any planet.",
        },
        {
          title: "Brightness and distance",
          body: "The brightness of a star depends on its size, distance and surface temperature. The brightest stars in the night sky are Sirius and Rigel.",
          detail: "Dato' Dr. Sheikh Muszaphar Shukor — the first Malaysian in outer space, 10th October 2007.",
        },
      ],
      sequence: {
        title: "⭐ Follow a star's life story",
        instruction: "Stars are born from nebulae — massive clouds of gas and dust. Step through how one becomes a star, and how it eventually dies.",
        bannerImage: nebulaImg,
        steps: [
          { title: "Nebula", body: "A vast cloud of gas and dust. Gravity pulls it into a spinning, shrinking globe.", detail: "☁️" },
          { title: "Protostar", body: "The compressing core gets hot and dense enough to start glowing — a young star is born.", detail: "🌟" },
          { title: "Main-sequence star", body: "The star settles into a stable phase, fusing hydrogen into helium — this is where our Sun is right now.", detail: "☀️" },
          { title: "Red giant", body: "As hydrogen runs low, the outer layer heats and expands, turning the star red and huge.", detail: "🔴" },
          { title: "Final stage", body: "Small/medium stars quietly become a white dwarf. Massive stars explode as a supernova — leaving a neutron star, or for super-massive stars, a black hole where not even light can escape.", detail: "⚡" },
        ],
      },
      phSlider: {
        title: "🌈 A star's colour reveals its temperature",
        instruction: "Drag to see how colour maps to surface temperature — the same principle as a blacksmith reading metal colour to judge heat.",
        gradient: STAR_GRADIENT,
        unitLabel: "",
        initialValue: 2,
        scale: [
          { value: 0, name: "Red", description: "Below 3,500 K — the coolest visible stars." },
          { value: 1, name: "Orange", description: "3,500–5,000 K." },
          { value: 2, name: "Yellow", description: "5,000–6,000 K — this is the Sun's range." },
          { value: 3, name: "Yellowish-white", description: "6,000–7,500 K." },
          { value: 4, name: "White", description: "7,500–11,000 K." },
          { value: 5, name: "Bluish-white", description: "11,000–25,000 K." },
          { value: 6, name: "Blue", description: "Above 25,000 K — the hottest stars of all." },
        ],
      },
      flipCards: [
        { id: "dwarf", icon: "🔴", label: "Dwarf", fact: "The smallest class of star — still far bigger than any planet." },
        { id: "giant", icon: "🟠", label: "Giant", fact: "Much larger than dwarf stars, often late in their life cycle." },
        { id: "supergiant", icon: "🔵", label: "Supergiant", fact: "The largest stars known — enormous even compared to giants." },
      ],
      checks: [
        { question: "What determines whether a dying star becomes a white dwarf or a black hole?", hint: "The original star's mass — smaller stars become white dwarfs; super-massive stars collapse into black holes after a supernova." },
        { question: "A star appears bluish-white. Is it hotter or cooler than a red star?", hint: "Much hotter — blue and bluish-white stars sit at the highest end of the temperature scale, above 11,000 K." },
      ],
    },
  ],
  reflectionItems: [
    "I can communicate the characteristics of objects in space.",
    "I can compare star characteristics, including the Sun, and relate them to Earth-based observation.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: The Sun is the biggest, brightest star in the universe.",
      answer: false,
      explanation: "It just looks that way because it's so much closer to us — many stars in the universe are far bigger and brighter than the Sun.",
    },
    {
      type: "multiple-choice",
      question: "What are stars formed from?",
      options: ["Asteroids", "Nebulae", "Black holes", "Comets"],
      answerIndex: 1,
      explanation: "Nebulae — huge clouds of gas and dust that collapse under gravity to form a protostar, and eventually a star.",
    },
  ],
};
