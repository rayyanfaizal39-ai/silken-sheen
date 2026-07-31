import type { ScienceF2InteractiveContent, PlanetSphere } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";

const PLANETS_EN: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Mercury",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "The smallest, closest planet to the Sun — airless, cratered, and scorched on one side while freezing on the other.",
    facts: [
      { label: "Distance", value: "57.9 million km" },
      { label: "Diameter", value: "4,879 km" },
      { label: "Gravity", value: "3.7 m/s²" },
      { label: "Moons", value: "0" },
      { label: "Orbit time", value: "88 days" },
    ],
  },
  {
    id: "venus",
    name: "Venus",
    gradient: "radial-gradient(circle at 35% 30%, #f0d9a0, #d8b370 60%, #a8895a)",
    size: 44,
    fact: "Earth's 'twin' in size, but a runaway greenhouse effect makes it the hottest planet — and it spins backwards.",
    facts: [
      { label: "Distance", value: "108.2 million km" },
      { label: "Diameter", value: "12,104 km" },
      { label: "Gravity", value: "8.87 m/s²" },
      { label: "Moons", value: "0" },
      { label: "Orbit time", value: "224.7 days" },
    ],
  },
  {
    id: "earth",
    name: "Earth",
    gradient: "radial-gradient(circle at 35% 30%, #6fc3e8, #2f8fce 45%, #1f5c8f 70%, #2f9e52)",
    size: 46,
    fact: "The only known planet with life — thanks to liquid water, a breathable atmosphere, and a temperature range that stays livable.",
    facts: [
      { label: "Distance", value: "149.6 million km" },
      { label: "Diameter", value: "12,756 km" },
      { label: "Gravity", value: "9.8 m/s²" },
      { label: "Moons", value: "1" },
      { label: "Orbit time", value: "365 days" },
    ],
  },
  {
    id: "mars",
    name: "Mars",
    gradient: "radial-gradient(circle at 35% 30%, #e08858, #c1440e 55%, #8a3009)",
    size: 38,
    fact: "The 'Red Planet' — reddish dust and sand, polar ice caps, and two small moons, Phobos and Deimos.",
    facts: [
      { label: "Distance", value: "227.9 million km" },
      { label: "Diameter", value: "6,794 km" },
      { label: "Gravity", value: "3.71 m/s²" },
      { label: "Moons", value: "2" },
      { label: "Orbit time", value: "687 days" },
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    gradient: "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "The largest planet by far — its powerful gravity deflects asteroids and comets, effectively shielding Earth.",
    facts: [
      { label: "Distance", value: "778.3 million km" },
      { label: "Diameter", value: "142,984 km" },
      { label: "Gravity", value: "24.79 m/s²" },
      { label: "Moons", value: "67+" },
      { label: "Orbit time", value: "11.9 years" },
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    gradient: "radial-gradient(circle at 35% 30%, #f0dfb0, #d9c088 60%, #a89060)",
    size: 70,
    rings: true,
    fact: "Famous for its dramatic ring system made of ice and rock — a low-density 'gas giant' with weaker gravity than Earth despite its size.",
    facts: [
      { label: "Distance", value: "1,427 million km" },
      { label: "Diameter", value: "120,536 km" },
      { label: "Gravity", value: "10.44 m/s²" },
      { label: "Moons", value: "62+" },
      { label: "Orbit time", value: "29.5 years" },
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    gradient: "radial-gradient(circle at 35% 30%, #b8ecec, #7fd0d0 60%, #4fa0a0)",
    size: 60,
    rings: true,
    fact: "Unlike any other planet — it rotates almost completely on its side, with an axis nearly parallel to its orbit.",
    facts: [
      { label: "Distance", value: "2,871 million km" },
      { label: "Diameter", value: "51,118 km" },
      { label: "Gravity", value: "8.69 m/s²" },
      { label: "Moons", value: "27+" },
      { label: "Orbit time", value: "84 years" },
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    gradient: "radial-gradient(circle at 35% 30%, #7ea8f0, #3f5fd0 60%, #2a3f9a)",
    size: 58,
    fact: "The farthest planet from the Sun — a deep blue 'gas giant' taking nearly 165 years to complete a single orbit.",
    facts: [
      { label: "Distance", value: "4,497 million km" },
      { label: "Diameter", value: "49,528 km" },
      { label: "Gravity", value: "11.15 m/s²" },
      { label: "Moons", value: "14+" },
      { label: "Orbit time", value: "164.8 years" },
    ],
  },
];

export const scienceF2C12InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Science Blog — A Possible 9th Planet",
    body: "In early 2016, astronomers spotted signs of a possible new planet in our solar system — estimated at roughly 10 times Earth's mass. It's still just a research hypothesis, not a confirmed discovery.",
    imagePath: chapterImage,
  },
  keywords: ["Solar system", "Astronomical unit (A.U.)", "Light years", "Planets", "Natural satellite", "Ecological footprint"],
  sections: [
    {
      number: "12.1",
      title: "Measuring the Solar System",
      intro:
        "The solar system consists of eight planets that orbit the Sun, including Earth where we live. Space is so vast that kilometres become impractical for measuring distances between planets and stars — instead, astronomers use two special units.",
      cards: [
        {
          title: "📏 Astronomical Unit (A.U.)",
          body: "The average distance between the Earth and the Sun, approximately 150 million kilometres. 1 A.U. = 1.5 × 10⁸ km.",
          detail: "Distance (A.U.) = Distance (km) ÷ (1.5 × 10⁸ km)",
        },
        {
          title: "💫 Light Year (ly)",
          body: "The distance travelled by light in one year. Light moves at a velocity of 300,000 km per second. 1 light year = 9.5 × 10¹² km.",
          detail: "Distance (ly) = Distance (km) ÷ (9.5 × 10¹² km)",
        },
      ],
      calculators: [
        {
          type: "au-light-year",
          title: "🧮 Convert a distance yourself",
          instruction: "Enter any distance in kilometres to see it in A.U. and light years. Try the Earth-Sun distance: 1.5 × 10⁸ km = 1.0 A.U.",
          defaultKm: 149600000,
        },
      ],
      checks: [
        {
          question: "A star is 4.37 light years from the Sun. Roughly how far is that in km?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — try it in the calculator above using the light year figure.",
        },
      ],
    },
    {
      number: "12.2",
      title: "The Eight Planets",
      intro:
        "In order from the Sun, the eight planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. In 2006, Pluto was no longer recognised as a planet in the solar system; instead, it is known as a dwarf planet. Each planet has a wildly different story — from Mercury's airless extremes to Jupiter's role as Earth's cosmic bodyguard.",
      cards: [
        {
          title: "Mass, density, and gravity",
          body: "A planet's surface gravity depends on both its mass AND its density — not size alone. That's why Saturn, despite being enormous, has weaker gravity than Earth: it's a low-density 'gas giant.' Jupiter, on the other hand, is so massive that its gravity is far stronger than Earth's even with a similarly low density — strong enough that it deflects incoming asteroids and comets, effectively shielding Earth.",
        },
        {
          title: "Farther out takes longer",
          body: "The further a planet sits from the Sun, the longer its orbit takes. Mercury circles the Sun in just 88 days. Neptune, the farthest, takes 164.8 years.",
        },
        {
          title: "🌗 What if Earth stopped rotating?",
          body: "Earth's rotation causes day/night cycles and tides. Stop it, and things get strange fast: extremely long days and nights on opposite sides, more desert on the permanently sun-facing side, changed tide patterns, and extreme cold on the permanently dark side.",
        },
        {
          title: "🌕 The Moon — Earth's only natural satellite",
          body: "The Moon takes about 27 days both to rotate on its own axis and to orbit the Earth — meaning the same side always faces us. That's why we never see the 'far side' of the Moon from Earth.",
        },
        {
          title: "Our footprint on the planet",
          body: "An ecological footprint measures how much land and water it takes to support our needs — and how much the Earth can absorb of our waste and regenerate. When our footprint exceeds what Earth can renew, resources deplete.",
        },
      ],
      flipCards: [
        { id: "water", icon: "💧", label: "Liquid water", fact: "Essential for every living process we know of." },
        { id: "oxygen", icon: "🌬️", label: "Oxygen-rich atmosphere", fact: "Supports respiration for countless species." },
        { id: "temp", icon: "🌡️", label: "Balanced temperature", fact: "Not too hot, not too cold — stays within a livable range." },
        { id: "atmosphere", icon: "🛡️", label: "Protective atmosphere", fact: "Blocks harmful UV rays and radiation from space." },
        { id: "gravity", icon: "⚖️", label: "Right gravity", fact: "Strong enough to hold an atmosphere without crushing life." },
        { id: "sunlight", icon: "☀️", label: "Steady sunlight", fact: "Powers photosynthesis, the base of most food chains." },
      ],
      planets: {
        title: "Tap a planet to see its profile",
        instruction: "Each planet has a wildly different story — from Mercury's airless extremes to Jupiter's role as Earth's cosmic bodyguard.",
        planets: PLANETS_EN,
      },
      accordions: [
        { title: "☿️ Mercury — no atmosphere", body: "Sun-facing side scorches past 427°C; the dark side plunges to -173°C, with nothing to trap or spread the heat." },
        { title: "♀️ Venus — thick CO₂ atmosphere", body: "Despite being farther from the Sun than Mercury, Venus is the hottest planet — its thick carbon dioxide traps heat in a runaway greenhouse effect, reaching 462°C." },
        { title: "♂️ Mars — thin atmosphere", body: "Has an atmosphere, but at less than 1% of Earth's pressure it barely affects temperature — Mars still swings between -143°C and 35°C." },
        { title: "🪐 The gas giants", body: "Jupiter, Saturn, Uranus and Neptune sit so far from the Sun that they receive very little sunlight — their surface temperatures are extremely low regardless of size." },
      ],
      tabs: [
        { title: "Most planets", body: "Rotates west to east — the Sun rises in the east and sets in the west, just like on Earth." },
        { title: "Venus", body: "Rotates east to west — the opposite direction. On Venus, the Sun would rise in the west." },
        { title: "Uranus", body: "Rotates almost completely on its side — its axis is tilted nearly parallel to its orbit, unlike any other planet." },
      ],
      checks: [
        { question: "Venus is called Earth's 'twin' in size — so why no life there?", hint: "Its thick CO₂ atmosphere traps heat in a runaway greenhouse effect, pushing surface temperatures to 462°C — far too hot for life as we know it." },
      ],
    },
  ],
  reflectionItems: [
    "I can compare planet distances using A.U. and light years.",
    "I can compare and contrast the planets and Earth.",
    "I can reason through hypothetical situations about the solar system.",
    "I can justify why Earth is the most suitable planet for life.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Venus is the hottest planet in the solar system, even though Mercury is closer to the Sun.",
      answer: true,
      explanation: "Correct — Venus's thick CO₂ atmosphere traps heat far more effectively than Mercury's total lack of atmosphere.",
    },
    {
      type: "multiple-choice",
      question: "Which planet rotates on its side, almost parallel to its orbit?",
      options: ["Venus", "Uranus", "Saturn", "Mars"],
      answerIndex: 1,
      explanation: "Uranus — a truly unique tilt among all eight planets.",
    },
  ],
};
