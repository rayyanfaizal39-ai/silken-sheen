import type {
  ScienceF2InteractiveContent,
  PlanetSphere,
  PlanetTiltItem,
} from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";
import { SCIENCE_F2_CH12_IMAGES } from "../visual-assets";

/**
 * Science Form 2 — Chapter 12: Solar System (DLP)
 *
 * Structural mirror of interactive-bm.ts: the same 21 learner-facing
 * sections in the same order, same blocks, same planet data, same
 * interactions. Only the learner-facing language differs.
 *
 * One Standard Kandungan (12.1), so every section is numbered 12.1 — the 21
 * sections below are the TEXTBOOK's own subtopic order, not new syllabus
 * numbers. Planet data is Jadual 12.2 (textbook pp. 256-257); temperature
 * framing is Jadual 12.3; density/gravity is the accompanying relationship
 * text; rotation angles are Rajah 12.6.
 */

// ---------------------------------------------------------------------------
// Shared per-planet data, defined once and sliced into whichever table each
// textbook subtopic actually needs — so Table 12.2, 12.3, 12.4 and 12.5 never
// silently drift apart from one another or from the planet profile cards.
// ---------------------------------------------------------------------------

const PLANET_NAMES = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

const DISTANCE_KM = [
  "5.79 × 10⁷",
  "1.08 × 10⁸",
  "1.50 × 10⁸",
  "2.28 × 10⁸",
  "7.78 × 10⁸",
  "1.43 × 10⁹",
  "2.87 × 10⁹",
  "4.5 × 10⁹",
];
const DISTANCE_AU = ["0.39", "0.72", "1.0", "1.52", "5.19", "9.5", "19.13", "30"];
// Distance in ly = Distance in km ÷ (9.5 × 10¹² km) — the textbook's own
// method, applied to each planet's own distance. Saturn matches the worked
// example's own rounding (1.51 × 10⁻⁴) so the table and the worked example
// never disagree about the same planet.
const DISTANCE_LY = [
  "6.09 × 10⁻⁶",
  "1.14 × 10⁻⁵",
  "1.58 × 10⁻⁵",
  "2.40 × 10⁻⁵",
  "8.19 × 10⁻⁵",
  "1.51 × 10⁻⁴",
  "3.02 × 10⁻⁴",
  "4.74 × 10⁻⁴",
];
const RELATIVE_MASS = ["0.06", "0.82", "1", "0.11", "317.8", "95.2", "14.5", "17.1"];
const DIAMETER = ["4 879", "12 104", "12 756", "6 794", "142 984", "120 536", "51 118", "49 528"];
const DENSITY = ["5.4", "5.2", "5.5", "3.9", "1.3", "0.7", "1.27", "1.6"];
const GRAVITY = [
  "3.7 (0.38 × Earth)",
  "8.87 (0.91 × Earth)",
  "9.8 (1 × Earth)",
  "3.71 (0.38 × Earth)",
  "24.79 (2.53 × Earth)",
  "10.44 (1.07 × Earth)",
  "8.69 (0.89 × Earth)",
  "11.15 (1.14 × Earth)",
];
const TEMPERATURE = ["167", "457", "14", "−55", "−153", "−185", "−214", "−225"];
const ORBIT_PERIOD = [
  "88 days",
  "224.7 days",
  "365 days",
  "687 days",
  "11.9 years",
  "29.5 years",
  "84 years",
  "164.8 years",
];
const ROTATION_PERIOD = [
  "59 days",
  "243 days",
  "24 hours",
  "25 hours",
  "10 hours",
  "11 hours",
  "17 hours",
  "16 hours",
];
const ROTATION_VELOCITY = [
  "10.89 km/h",
  "6.52 km/h",
  "1 674.4 km/h",
  "868.2 km/h",
  "45 300 km/h",
  "35 500 km/h",
  "9 320 km/h",
  "9 660 km/h",
];
const ROTATION_DIRECTION = [
  "West to east",
  "East to west",
  "West to east",
  "West to east",
  "West to east",
  "West to east",
  "Rotates on its side",
  "West to east",
];
const SATELLITES = ["0", "0", "1", "2", "67", "62", "27", "14"];
const ATMOSPHERE = [
  "No atmosphere",
  "96.5% carbon dioxide; 3.5% nitrogen",
  "78% nitrogen; 21% oxygen; 0.97% noble gases and other substances; 0.03% carbon dioxide",
  "96% carbon dioxide; 1.9% nitrogen; 1.9% argon; 0.2% oxygen, carbon monoxide",
  "89.6% hydrogen; 10.1% helium; 0.3% methane, ammonia, ethane, water",
  "96% hydrogen; 3% helium; 0.4% methane, ammonia, ethane, water",
  "83.3% hydrogen; 15.5% helium; 2.4% methane",
  "80% hydrogen; 19% helium; 0.1% methane, ethane",
];
const SURFACE = [
  "Colourless, with craters covered in fine dust, plains, mountains and valleys",
  "Orange in colour, sandy and rocky, with large plains, volcanoes and wide craters",
  "More than 71% water and 29% land (plains, mountains and volcanoes)",
  "Reddish in colour, sandy and rocky, with large plains, volcanoes and wide craters",
  "Has no hard surface. Covered only by gas.",
  "Has no hard surface. Covered only by gas.",
  "Has no hard surface. Covered only by gas.",
  "Has no hard surface. Covered only by gas.",
];

const PLANETS_DLP: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Mercury",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "The smallest planet and the closest to the Sun — no atmosphere, heavily cratered, scorching on one side while freezing on the other.",
    facts: [
      { label: "Diameter", value: "4 879 km" },
      { label: "Distance from Sun", value: "57.9 million km" },
      { label: "Average temperature", value: "167 °C" },
      { label: "Natural satellites", value: "0" },
    ],
  },
  {
    id: "venus",
    name: "Venus",
    gradient: "radial-gradient(circle at 35% 30%, #f0d9a0, #d8b370 60%, #a8895a)",
    size: 44,
    fact: "Earth's 'twin' in size, but an extreme greenhouse effect makes it the hottest planet — and it rotates from east to west.",
    facts: [
      { label: "Diameter", value: "12 104 km" },
      { label: "Distance from Sun", value: "108.2 million km" },
      { label: "Average temperature", value: "457 °C" },
      { label: "Natural satellites", value: "0" },
    ],
  },
  {
    id: "earth",
    name: "Earth",
    gradient: "radial-gradient(circle at 35% 30%, #6fc3e8, #2f8fce 45%, #1f5c8f 70%, #2f9e52)",
    size: 46,
    fact: "So far the only planet known to support life — water, a breathable atmosphere and a temperature range that is not extreme.",
    facts: [
      { label: "Diameter", value: "12 756 km" },
      { label: "Distance from Sun", value: "149.6 million km" },
      { label: "Average temperature", value: "14 °C" },
      { label: "Natural satellites", value: "1" },
    ],
  },
  {
    id: "mars",
    name: "Mars",
    gradient: "radial-gradient(circle at 35% 30%, #e08858, #c1440e 55%, #8a3009)",
    size: 38,
    fact: "The 'Red Planet' — sandy and rocky, with polar regions containing frozen water and carbon dioxide, and two moons.",
    facts: [
      { label: "Diameter", value: "6 794 km" },
      { label: "Distance from Sun", value: "227.9 million km" },
      { label: "Average temperature", value: "−55 °C" },
      { label: "Natural satellites", value: "2 (Phobos and Deimos)" },
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    gradient:
      "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "The largest planet in the solar system — nearly 320 times Earth's mass, and its strong gravity deflects large objects away from Earth.",
    facts: [
      { label: "Diameter", value: "142 984 km" },
      { label: "Distance from Sun", value: "778.3 million km" },
      { label: "Average temperature", value: "−153 °C" },
      { label: "Natural satellites", value: "67" },
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    gradient: "radial-gradient(circle at 35% 30%, #f0dfb0, #d9c088 60%, #a89060)",
    size: 70,
    rings: true,
    fact: "A gas giant with a ring system of ice and rock — it has the lowest density of all the planets, at 0.7 g cm⁻³.",
    facts: [
      { label: "Diameter", value: "120 536 km" },
      { label: "Distance from Sun", value: "1 429 million km" },
      { label: "Average temperature", value: "−185 °C" },
      { label: "Natural satellites", value: "62" },
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    gradient: "radial-gradient(circle at 35% 30%, #b8ecec, #7fd0d0 60%, #4fa0a0)",
    size: 60,
    rings: true,
    fact: "A unique planet because its axis of rotation is tilted on its side, almost parallel to its orbit around the Sun.",
    facts: [
      { label: "Diameter", value: "51 118 km" },
      { label: "Distance from Sun", value: "2 871 million km" },
      { label: "Average temperature", value: "−214 °C" },
      { label: "Natural satellites", value: "27" },
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    gradient: "radial-gradient(circle at 35% 30%, #7ea8f0, #3f5fd0 60%, #2a3f9a)",
    size: 58,
    fact: "The eighth and farthest planet from the Sun — a gas giant that takes almost 165 years to complete one revolution.",
    facts: [
      { label: "Diameter", value: "49 528 km" },
      { label: "Distance from Sun", value: "4 504 million km" },
      { label: "Average temperature", value: "−225 °C" },
      { label: "Natural satellites", value: "14" },
    ],
  },
];

const AXIAL_TILT_DLP: PlanetTiltItem[] = [
  {
    id: "mercury",
    name: "Mercury",
    tiltDeg: 0.1,
    direction: "prograde",
    note: "Mercury's axis is almost perfectly upright — 0.1° from vertical — so it has almost no seasons.",
  },
  {
    id: "venus",
    name: "Venus",
    tiltDeg: 117,
    direction: "retrograde",
    note: "Venus's tilt of 117° means it spins the opposite way to most planets — from east to west — so on Venus the Sun rises in the west.",
  },
  {
    id: "earth",
    name: "Earth",
    tiltDeg: 23,
    direction: "prograde",
    note: "Earth's 23° tilt, combined with its orbit, is why we have seasons.",
  },
  {
    id: "mars",
    name: "Mars",
    tiltDeg: 25,
    direction: "prograde",
    note: "Mars's 25° tilt is close to Earth's, so Mars has seasons too.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    tiltDeg: 3,
    direction: "prograde",
    note: "Jupiter's axis is almost upright — only 3° — so it has almost no seasonal change.",
  },
  {
    id: "saturn",
    name: "Saturn",
    tiltDeg: 27,
    direction: "prograde",
    note: "Saturn's 27° tilt is similar to Earth's, giving it seasons over its much longer year.",
  },
  {
    id: "uranus",
    name: "Uranus",
    tiltDeg: 98,
    direction: "sideways",
    note: "Uranus is tilted so far — 98° — that it rotates almost on its side, with its axis pointing nearly along its orbit instead of sticking up out of it.",
  },
  {
    id: "neptune",
    name: "Neptune",
    tiltDeg: 30,
    direction: "prograde",
    note: "Neptune's 30° tilt is close to Earth's and Saturn's.",
  },
];

export const scienceF2C12InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Science Blog — A Possible 9th Planet",
    body: "In early 2016, astronomers spotted signs of a possible new planet in our solar system — estimated at **roughly 10 times Earth's mass**. This finding is still at the research stage, not a confirmed discovery.",
    imagePath: chapterImage,
  },
  keywords: [
    "Solar system",
    "Astronomical Unit (A.U.)",
    "Light year",
    "Planet",
    "Natural satellite",
    "Ecological footprint",
  ],
  sections: [
    // 1 — Comparison of Planet Distances in the Solar System from the Sun
    {
      number: "12.1",
      title: "Comparison of Planet Distances in the Solar System from the Sun",
      conceptQuestion: "How Do the Planets' Distances from the Sun Compare?",
      intro:
        "The solar system consists of eight planets orbiting the Sun, including Earth. The distances of the planets from the Sun vary enormously — from Mercury's 57.9 million km to Neptune's 4 500 million km. These distances are so large that comparing them in kilometres alone quickly becomes impractical. In 2006, Pluto was no longer recognised as a planet in the solar system; it is now known as a **dwarf planet**.",
      ch12SpotlightFigure: {
        title: "The solar system at a glance",
        figure: "solar-system",
        src: SCIENCE_F2_CH12_IMAGES.solarSystemOverview,
        alt: "Illustration of the Sun and the eight planets in order on their orbits — Mercury, Venus, Earth, Mars, the asteroid belt, Jupiter, Saturn, Uranus and Neptune. Sizes and distances are not to scale.",
        instruction: "Tap a planet or the asteroid belt to find out more.",
        prompt: "Tap a planet on the picture, or choose one below.",
        scaleNote: "Not to scale",
        concepts: [
          { id: "mercury", label: "Mercury", note: "The planet closest to the Sun." },
          {
            id: "venus",
            label: "Venus",
            note: "The hottest planet, even though it is not the closest to the Sun.",
          },
          { id: "earth", label: "Earth", note: "So far, the only planet that has life." },
          {
            id: "mars",
            label: "Mars",
            note: "Reddish in colour, with two natural satellites: Phobos and Deimos.",
          },
          {
            id: "asteroid-belt",
            label: "Asteroid Belt",
            note: "Located mainly between Mars and Jupiter. It is made up of many separate rocky objects — not a solid wall.",
          },
          { id: "jupiter", label: "Jupiter", note: "The largest planet in the solar system." },
          {
            id: "saturn",
            label: "Saturn",
            note: "A gas giant with rings, and the lowest density of all the planets.",
          },
          {
            id: "uranus",
            label: "Uranus",
            note: "Rotates on its side — its axis of rotation is tilted almost parallel to its orbit.",
          },
          { id: "neptune", label: "Neptune", note: "The farthest planet from the Sun." },
        ],
      },
      planetComparison: {
        title: "Each planet's distance from the Sun",
        instruction: "Distance from the Sun, in kilometres, for all eight planets.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "km",
            label: "Distance from Sun",
            unit: "km",
            values: DISTANCE_KM,
            note: "The farther out a planet sits, the greater its distance from the Sun — numbers this large are hard to compare directly, which is why special units are used next.",
          },
        ],
      },
      checks: [
        {
          question: "Which planet is closest to the Sun, and which is farthest?",
          hint: "Mercury is closest, at about 57.9 million km. Neptune is farthest, at about 4 500 million km.",
        },
      ],
    },
    // 2 — Astronomical Unit (A.U.)
    {
      number: "12.1",
      title: "Astronomical Unit (A.U.)",
      conceptQuestion: "What is an Astronomical Unit?",
      intro:
        "Because the distances between the Sun and the planets are so large, astronomers use the **astronomical unit** as a more convenient unit of distance.",
      cards: [
        {
          title: "📏 Astronomical Unit (A.U.)",
          body: "The average distance between Earth and the Sun, which is about 93 million miles or 150 million kilometres. **1 A.U. = 1.5 × 10⁸ km**.",
          detail: "1 A.U. is approximately the average distance between Earth and the Sun.",
        },
      ],
      checks: [
        {
          question: "What does 1 A.U. represent?",
          hint: "1 A.U. is approximately the average distance between Earth and the Sun, equal to 1.5 × 10⁸ km.",
        },
      ],
    },
    // 3 — Light Years (ly)
    {
      number: "12.1",
      title: "Light Years (ly)",
      conceptQuestion: "What is a Light Year?",
      intro:
        "For distances even greater than those between planets — such as the distance to a star — astronomers use an even larger unit: the **light year**.",
      cards: [
        {
          title: "💫 Light Year (ly)",
          body: "A light year is **a unit of DISTANCE, not of time** — it is the distance travelled by light in one year. Light travels at 300 000 km every second, so light can travel 9.5 × 10¹² km in a year.",
          detail: "1 ly = 9.5 × 10¹² km.",
        },
      ],
      checks: [
        {
          question: "Is a light year a unit of time?",
          hint: "No. A light year is a unit of distance — the distance light travels in one year, not a duration. Do not confuse it with time.",
        },
      ],
    },
    // 4 — Converting Units between A.U., ly and km
    {
      number: "12.1",
      title: "Converting Units between Astronomical Unit, Light Years and Kilometres",
      conceptQuestion: "How Do You Convert between km, A.U. and ly?",
      intro:
        "A distance in kilometres can be converted into astronomical units or light years using the textbook's own formulas.",
      cards: [
        {
          title: "🔁 Conversion formulas",
          body: "**Distance in A.U. = Distance in km ÷ (1.5 × 10⁸ km)**. **Distance in ly = Distance in km ÷ (9.5 × 10¹² km)**.",
        },
      ],
      calculators: [
        {
          type: "au-light-year",
          title: "🧮 Convert a distance between km, A.U. and light years",
          instruction:
            "Choose the unit you are entering, then read the same distance in the other units. Try the Earth–Sun distance: 1.5 × 10⁸ km = 1.0 A.U.",
          defaultKm: 150000000,
        },
      ],
      checks: [
        {
          question: "A star is 4.37 light years from the Sun. Roughly how far is that in km?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — try it in the calculator above by selecting the 'ly' unit.",
        },
      ],
    },
    // 5 — Worked Examples: A.U. / ly conversions
    {
      number: "12.1",
      title: "Worked Examples — A.U. / ly Conversions",
      conceptQuestion: "How Are These Conversions Calculated Step by Step?",
      intro: "Work through two textbook examples, one step at a time.",
      guidedCalculations: [
        {
          title: "Example 1 — Earth's distance from the Sun",
          givenLabel: "Given",
          findLabel: "Find",
          formulaLabel: "Formula",
          substituteLabel: "Substitute",
          answerLabel: "Answer",
          given: ["Earth's distance from the Sun = 1.5 × 10⁸ km"],
          find: "(a) the distance in A.U. (b) the distance in ly",
          formula:
            "Distance (A.U.) = Distance (km) ÷ (1.5 × 10⁸ km); Distance (ly) = Distance (km) ÷ (9.5 × 10¹² km)",
          substitute: "(a) (1.5 × 10⁸) ÷ (1.5 × 10⁸) (b) (1.5 × 10⁸) ÷ (9.5 × 10¹²)",
          answer: "(a) 1.0 A.U. (b) 1.58 × 10⁻⁵ ly",
        },
        {
          title: "Example 2 — Saturn's distance from the Sun",
          givenLabel: "Given",
          findLabel: "Find",
          formulaLabel: "Formula",
          substituteLabel: "Substitute",
          answerLabel: "Answer",
          given: ["Saturn's distance from the Sun = 1.43 × 10⁹ km"],
          find: "(a) the distance in A.U. (b) the distance in ly",
          formula:
            "Distance (A.U.) = Distance (km) ÷ (1.5 × 10⁸ km); Distance (ly) = Distance (km) ÷ (9.5 × 10¹² km)",
          substitute: "(a) (1.43 × 10⁹) ÷ (1.5 × 10⁸) (b) (1.43 × 10⁹) ÷ (9.5 × 10¹²)",
          answer: "(a) 9.5 A.U. (b) 1.51 × 10⁻⁴ ly",
        },
      ],
      checks: [],
    },
    // 6 — Table 12.1 (Activity 12.1)
    {
      number: "12.1",
      title: "Table 12.1 — Distance of Planets from the Sun in A.U. and ly",
      conceptQuestion: "What Is Each Planet's Distance in A.U. and Light Years?",
      intro:
        "Using the conversion formulas, every planet's distance from the Sun can be expressed in kilometres, astronomical units and light years.",
      planetComparison: {
        title: "Distance of every planet from the Sun",
        instruction: "Choose km, A.U. or ly to compare every planet on that unit.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "km",
            label: "Distance",
            unit: "km",
            values: DISTANCE_KM,
            note: "The raw distance in kilometres — very large numbers, which is why A.U. and ly are used instead.",
          },
          {
            id: "au",
            label: "Distance",
            unit: "A.U.",
            values: DISTANCE_AU,
            note: "In astronomical units, Earth's distance from the Sun is the reference: 1.0 A.U.",
          },
          {
            id: "ly",
            label: "Distance",
            unit: "ly",
            values: DISTANCE_LY,
            note: "In light years, even Neptune's huge distance becomes a small, comparable number.",
          },
        ],
      },
      checks: [
        {
          question:
            "Why are A.U. and light years used to state the distances of planets from the Sun?",
          hint: "The distances of the planets from the Sun are very large, so kilometres become impractical for comparing their relative distances.",
        },
      ],
    },
    // 7 — Planets in the Solar System
    {
      number: "12.1",
      title: "Planets in the Solar System",
      conceptQuestion: "What Are the Eight Planets in the Solar System?",
      intro:
        "The eight planets, in order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Tap each planet to see its profile.",
      ch12SpotlightFigure: {
        title: "Recognise the eight planets",
        figure: "eight-planets",
        src: SCIENCE_F2_CH12_IMAGES.eightPlanetsSheet,
        alt: "The eight planets in two rows: Mercury, Venus, Earth and Mars on the top row; Jupiter, Saturn, Uranus and Neptune on the bottom row. Sizes are not to scale.",
        instruction: "Tap a planet to see its key facts, then open its full profile.",
        prompt: "Tap a planet on the picture, or choose one below.",
        scaleNote: "Not to scale",
        openProfileLabel: "Open full profile",
      },
      planets: {
        title: "Tap each planet to see its profile",
        instruction:
          "The sphere sizes below are conceptual only and are not to true scale — see Table 12.2 for the actual diameters.",
        planets: PLANETS_DLP,
      },
      checks: [
        {
          question: "Name the eight planets in order from the Sun.",
          hint: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
        },
      ],
    },
    // 8 — Table 12.2 General characteristics
    {
      number: "12.1",
      title: "General Characteristics of Planets in the Solar System — Table 12.2",
      conceptQuestion: "How Do the Planets Compare on Their General Characteristics?",
      intro:
        "Every planet can be compared with Earth using the same set of characteristics. Choose one characteristic to see all eight planets on it — the Earth row is always marked as the reference.",
      planetComparison: {
        title: "Compare the planets with Earth",
        instruction: "Choose a characteristic. The Earth row is marked as the reference.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "distance",
            label: "Distance from Sun",
            unit: "million km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Mercury is closest to the Sun; Neptune is farthest.",
          },
          {
            id: "relative-mass",
            label: "Relative mass",
            unit: "× Earth",
            values: RELATIVE_MASS,
            note: "Jupiter's mass is nearly 320 times Earth's; Mercury's is only 0.06 times Earth's.",
          },
          {
            id: "diameter",
            label: "Diameter",
            unit: "km",
            values: DIAMETER,
            note: "Jupiter is the largest planet and Mercury the smallest.",
          },
          {
            id: "density",
            label: "Density",
            unit: "g cm⁻³",
            values: DENSITY,
            note: "The gas giants have far lower densities than the rocky planets.",
          },
          {
            id: "gravity",
            label: "Gravitational pull",
            unit: "m s⁻²",
            values: GRAVITY,
            note: "Gravitational pull is given in m s⁻² and as a ratio relative to Earth.",
          },
          {
            id: "temperature",
            label: "Average surface temperature",
            unit: "°C",
            values: TEMPERATURE,
            note: "Venus has the highest average surface temperature even though it is not the planet closest to the Sun.",
          },
          {
            id: "orbit-period",
            label: "Time taken to orbit the Sun",
            values: ORBIT_PERIOD,
            note: "The farther a planet is from the Sun, the longer it takes to complete one orbit.",
          },
          {
            id: "rotation-period",
            label: "Time taken for one complete rotation",
            values: ROTATION_PERIOD,
            note: "How long each planet takes to spin once on its own axis.",
          },
          {
            id: "rotation-velocity",
            label: "Velocity of rotation on axis",
            unit: "km/h",
            values: ROTATION_VELOCITY,
            note: "Jupiter spins the fastest of all the planets.",
          },
          {
            id: "satellites",
            label: "Number of natural satellites",
            values: SATELLITES,
            note: "A natural satellite is a body that orbits a planet in its own orbit. Earth has one: the Moon.",
          },
          {
            id: "atmosphere",
            label: "Main atmospheric content",
            values: ATMOSPHERE,
            note: "Only Earth has an atmosphere rich in oxygen.",
          },
          {
            id: "surface",
            label: "Condition of planet's surface",
            values: SURFACE,
            note: "The four gas giants have no hard surface.",
          },
        ],
      },
      checks: [
        {
          question: "Which planet is the largest, and which is the smallest?",
          hint: "Jupiter is the largest (142 984 km diameter); Mercury is the smallest (4 879 km diameter).",
        },
      ],
    },
    // 9 — Table 12.3 Temperature relationship
    {
      number: "12.1",
      title: "Relationship between Temperature of a Planet and the Sun — Table 12.3",
      conceptQuestion: "How Does a Planet's Temperature Relate to Its Distance from the Sun?",
      intro:
        "Theoretically, **a planet closer to the Sun receives more heat**. But immediately look closer: the real situation is more complex, because a planet's atmosphere changes how much of that heat it actually keeps.",
      planetComparison: {
        title: "Distance and average surface temperature",
        instruction:
          "Compare each planet's distance from the Sun with its average surface temperature.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "distance",
            label: "Distance from Sun",
            unit: "million km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Ordered from closest to farthest.",
          },
          {
            id: "temperature",
            label: "Average surface temperature",
            unit: "°C",
            values: TEMPERATURE,
            note: "Venus — the second planet, not the closest — has the highest average surface temperature of all eight.",
          },
        ],
      },
      accordions: [
        {
          title: "☿️ Mercury — a planet with no atmosphere",
          body: "Sunlight reaches its surface directly, so the side facing the Sun is extremely hot, above **427 °C**. The dark side is extremely cold, with temperatures falling to **−173 °C**.",
        },
        {
          title: "♀️ Venus — the temperature anomaly",
          body: "Venus has thick clouds that reflect sunlight, but its atmosphere, mostly carbon dioxide, causes a **greenhouse effect**. A great deal of heat is trapped, so the surface temperature can reach 462 °C — **hotter than Mercury even though Venus is farther from the Sun**.",
        },
        {
          title: "🌍 Earth — a balance of trapping and reflecting",
          body: "Earth's atmosphere traps some heat, keeping the surface warm enough for life, while clouds reflect some sunlight straight back into space. This balance is part of why Earth's temperature range stays moderate.",
        },
        {
          title: "♂️ Mars — a low-pressure atmosphere",
          body: "Although Mars has an atmosphere, its surface pressure is very low compared with Earth's (**less than 1/100 of Earth's pressure**), so it has little effect on surface temperature. Temperatures range between −143 °C and 35 °C.",
        },
        {
          title: "🪐 The gas giants",
          body: "Jupiter, Saturn, Uranus and Neptune have surfaces covered by gas. These planets are very far from the Sun and receive relatively little sunlight, so their surface temperatures are very low.",
        },
      ],
      checks: [
        {
          question:
            "Aisyah says Mercury is the hottest planet because it is closest to the Sun. Is she correct?",
          hint: "No. Venus is the hottest planet because its thick carbon dioxide atmosphere traps heat through the greenhouse effect — closer to the Sun does not always mean hotter.",
        },
      ],
    },
    // 10 — Table 12.4 Density and gravitational pull
    {
      number: "12.1",
      title: "Relationship between Density and Gravitational Pull of the Planets — Table 12.4",
      conceptQuestion: "How Are Density and Gravitational Pull Related?",
      intro:
        "The gravitational pull at a planet's surface **depends on the planet's mass and its density**.",
      planetComparison: {
        title: "Density and gravitational pull",
        instruction: "Compare each planet's density with its gravitational pull.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "density",
            label: "Density",
            unit: "g cm⁻³",
            values: DENSITY,
            note: "The four gas giants have far lower density than the four rocky planets.",
          },
          {
            id: "gravity",
            label: "Gravitational pull",
            unit: "m s⁻²",
            values: GRAVITY,
            note: "Gravitational pull does not depend on density alone — it depends on mass and density together.",
          },
        ],
      },
      cards: [
        {
          title: "Density and gravitational pull",
          body: "Mercury and Mars have weaker gravitational pull than Earth's because their masses are low. Venus's gravitational pull is close to Earth's because its mass is close to Earth's. Jupiter's gravitational pull is very high compared with Earth's because its mass is very high, even though its density is very low. Although Saturn, Uranus and Neptune have very high masses, the gravitational pull of these planets is **not much higher than Earth's** because gas giants have low density.",
          detail: "Earth's gravitational pull is 9.8 m s⁻².",
        },
      ],
      checks: [
        {
          question:
            "Why is Jupiter's gravitational pull so much higher than Earth's, despite Jupiter's low density?",
          hint: "Gravitational pull depends on mass as well as density. Jupiter's mass is so enormous (nearly 320 times Earth's) that its pull is very strong even though its density is low.",
        },
      ],
    },
    // 11 — Table 12.5 Distance, time and speed
    {
      number: "12.1",
      title: "Relationship between Distance, Time and Speed — Table 12.5",
      conceptQuestion: "How Are Distance, Orbital Time and Rotation Speed Related?",
      intro:
        "**The farther a planet is from the Sun, the more time it generally needs to complete one orbit.** Mercury is closest to the Sun, so it takes only 88 days for one orbit; Neptune, the farthest planet, takes 164.8 years.",
      planetComparison: {
        title: "Distance, orbital time and rotation speed",
        instruction:
          "Compare each planet's distance, the time it takes to orbit the Sun, and its rotation speed.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "distance",
            label: "Distance from Sun",
            unit: "A.U.",
            values: DISTANCE_AU,
            note: "Ordered from closest to farthest.",
          },
          {
            id: "orbit-period",
            label: "Time to orbit the Sun",
            values: ORBIT_PERIOD,
            note: "Mercury: 88 days. Neptune: 164.8 years.",
          },
          {
            id: "rotation-velocity",
            label: "Velocity of rotation",
            unit: "km/h",
            values: ROTATION_VELOCITY,
            note: "The speed a point on the planet's own surface moves as the planet spins.",
          },
        ],
      },
      checks: [
        {
          question: "Which takes longer: Mercury's orbit around the Sun, or Neptune's?",
          hint: "Neptune's. Mercury orbits in 88 days; Neptune, the farthest planet, takes 164.8 years.",
        },
      ],
    },
    // 12 — Rotational Direction of the Planets
    {
      number: "12.1",
      title: "Rotational Direction of the Planets",
      conceptQuestion: "Which Way Do the Planets Rotate?",
      intro: "All planets rotate from west to east **except Venus and Uranus**.",
      planetAxialTilt: {
        title: "Each planet's axis of rotation",
        instruction: "Tap a planet to see its axial tilt and rotation direction.",
        planets: AXIAL_TILT_DLP,
        ruleLabel: "Most planets rotate west to east.",
        scaleNote: "Diagram is not to true scale.",
      },
      tabs: [
        {
          title: "Most planets",
          body: "Rotate from west to east. Because Earth rotates from west to east, we see **the Sun rise in the east and set in the west**.",
        },
        {
          title: "Venus",
          body: "Rotates from east to west — the opposite direction to Earth. This means that on Venus, **the Sun would rise in the west**.",
        },
        {
          title: "Uranus",
          body: "Rotates on its side — **its axis of rotation is tilted almost parallel to its orbit around the Sun**.",
        },
      ],
      checks: [
        {
          question: "Which two planets do not rotate from west to east?",
          hint: "Venus, which rotates from east to west, and Uranus, which rotates on its side because of its extreme axial tilt.",
        },
      ],
    },
    // 13 — Hypothetical Situation Related to the Solar System
    {
      number: "12.1",
      title: "Hypothetical Situation Related to the Solar System",
      conceptQuestion: "What Would Happen If Earth Rotated More Slowly or Stopped Rotating?",
      intro:
        "Based on an understanding of the solar system, the effects of a change in rotation can be predicted from what we already know about day, night and tides.",
      cards: [
        {
          title: "🌗 If Earth rotated slowly or stopped rotating",
          body: "**Earth's rotation on its axis causes day and night and the tides.** If Earth rotated slowly or stopped rotating: day and night would become long on two different parts of Earth; desert areas would increase on the part facing the Sun; the timing of the tides would change; and the temperature on the part of Earth not lit by the Sun would become very cold.",
        },
      ],
      checks: [
        {
          question: "Predict two things that could happen if Earth stopped rotating.",
          hint: "Among them: long periods of day and night on two different parts of Earth, an increase in desert areas on the side facing the Sun, a change in the timing of the tides, and very cold temperatures on the side not lit by the Sun.",
        },
      ],
    },
    // 14 — Natural Satellites
    {
      number: "12.1",
      title: "Natural Satellites",
      conceptQuestion: "What Is a Natural Satellite?",
      intro:
        "**Natural satellites are objects that move around planets in their own orbits.** The Moon is Earth's natural satellite.",
      accordions: [
        {
          title: "🌙 Why do some planets have two or more moons?",
          body: "Discuss this using the data in Table 12.2. Mercury and Venus have no natural satellites, Earth has one, Mars has two (Phobos and Deimos), while Jupiter has 67, Saturn 62, Uranus 27 and Neptune 14. Look for a relationship between the number of satellites and each planet's size, mass and gravitational pull, then state your reasoning.",
        },
      ],
      checks: [
        {
          question: "What is a natural satellite? Give an example.",
          hint: "A natural satellite is an object that moves around a planet in its own orbit. The Moon is Earth's natural satellite.",
        },
      ],
    },
    // 15 — Earth–Moon System
    {
      number: "12.1",
      title: "Earth–Moon System",
      conceptQuestion: "How Would Earth Appear from the Moon?",
      intro:
        "The Moon rotates on its axis and, at the same time, orbits Earth. Both take approximately the same amount of time — around 27 days.",
      accordions: [
        {
          title: "🌍 If you were on the Moon, what would Earth look like?",
          body: "Use the following information to reason it out. The Moon rotates on its axis and at the same time revolves around Earth in its orbit. The time the Moon takes to rotate on its axis and to revolve around Earth is the same, **about 27 days**. Because of this, **the same surface of the Moon always faces Earth**. Earth is also four times the size of the Moon.",
        },
        {
          title: "🌗 Would Earth appear to have phases when viewed from the Moon?",
          body: "This is a question to discuss. Use what you know about the positions of the Sun, Earth and the Moon, and how the sunlit portion changes as the Moon revolves around Earth. Present your group's reasoning and compare it with the other groups.",
        },
      ],
      checks: [
        {
          question: "Why does the same side of the Moon always face Earth?",
          hint: "The Moon's rotation on its axis and its revolution around Earth both take about the same time — around 27 days — so the same lunar surface always faces us.",
        },
      ],
    },
    // 16 — The Earth as a Planet for Living Things
    {
      number: "12.1",
      title: "The Earth as a Planet for Living Things",
      conceptQuestion: "Why Can Earth Support Life?",
      intro:
        "So far, **Earth is the only planet that has life**. Earth's suitability for life depends on several characteristics — explored next, one at a time.",
      checks: [
        {
          question: "So far, which is the only planet known to support life?",
          hint: "Earth.",
        },
      ],
    },
    // 17 — Characteristics of the Earth
    {
      number: "12.1",
      title: "Characteristics of the Earth",
      conceptQuestion: "What Characteristics Make Earth Suitable for Life?",
      intro:
        "Earth can support life because of several characteristics such as the presence of water, mineral resources, surface temperature and the content of its atmosphere.",
      ch12SpotlightFigure: {
        title: "Explore Earth's characteristics",
        figure: "earth-characteristics",
        src: SCIENCE_F2_CH12_IMAGES.earthCharacteristics,
        alt: "Earth at the centre of six circles: a boy standing on Earth beside a rock pulled down towards the ground; a water droplet above the sea; sunlight reaching Earth's atmosphere; a boy breathing in air, with his lungs shown; a young plant growing in sunlight; and a thermometer between a hot desert and snowy mountains.",
        instruction: "Choose a characteristic, or tap its circle on the picture.",
        prompt: "Choose a characteristic to see why it matters for life.",
        concepts: [
          {
            id: "gravity",
            icon: "⚖️",
            label: "Gravity",
            note: "Earth's gravity keeps objects from floating away — it attracts objects, like the falling rock, towards Earth.",
          },
          {
            id: "water",
            icon: "💧",
            label: "Water",
            note: "Earth has abundant water needed for living processes.",
          },
          {
            id: "oxygen",
            icon: "🌬️",
            label: "Oxygen",
            note: "Earth has enough oxygen for respiration.",
          },
          {
            id: "sunlight",
            icon: "☀️",
            label: "Sunlight",
            note: "Earth receives sunlight needed by plants for photosynthesis.",
          },
          {
            id: "atmosphere",
            icon: "🛡️",
            label: "Protective Atmosphere",
            note: "Earth's atmosphere helps block harmful ultraviolet radiation. Sunlight still reaches the surface — the atmosphere does not reflect all sunlight away.",
          },
          {
            id: "temperature",
            icon: "🌡️",
            label: "Suitable Temperature",
            note: "Earth has a suitable temperature range — not too hot and not too cold.",
          },
        ],
      },
      checks: [
        {
          question: "Name three characteristics of Earth that make it suitable for life.",
          hint: "Among them: gravitational pull, a large amount of water, a high oxygen content, sunlight, a protective atmosphere and a suitable temperature range.",
        },
        {
          question:
            "Venus is considered Earth's twin because its size, mass, volume and density are close to Earth's. Why is this planet unlikely to have life?",
          hint: "Venus's atmosphere is mostly carbon dioxide and causes an extreme greenhouse effect, making its surface temperature far too hot for life.",
        },
      ],
    },
    // 18 — Love Our Earth
    {
      number: "12.1",
      title: "Love Our Earth",
      conceptQuestion: "Why Should We Love Our Earth?",
      intro:
        "Human life depends heavily on Earth's land and water resources for food, water, shelter and every other basic need.",
      cards: [
        {
          title: "🌍 A growing population, growing pressure",
          body: "As the human population keeps growing, the pressure on Earth's land and water resources keeps increasing along with it. More people need more food, more water, more land to live on and more resources overall.",
          detail:
            "This growing pressure is what makes measuring our impact on Earth's resources — the ecological footprint — so important.",
        },
      ],
      checks: [
        {
          question: "Why does population growth increase pressure on Earth's resources?",
          hint: "More people need more food, water, land and other resources, so as the population grows, the demand placed on Earth's land and water resources also grows.",
        },
      ],
    },
    // 19 — Ecological Footprint
    {
      number: "12.1",
      title: "Ecological Footprint",
      conceptQuestion: "What Is an Ecological Footprint?",
      intro:
        "**The ecological footprint** is a measure of the ability of water and land to provide the resources needed by humans (food, drink, shelter and others), together with Earth's ability to absorb all human waste and then regenerate those resources after they have been used.",
      cards: [
        {
          title: "⚠️ When the ecological footprint is too large",
          body: "**If the ecological footprint exceeds Earth's ability to renew its resources, Earth will run out of resources.** As responsible consumers, every individual has a role in managing the environment and reducing their own ecological footprint.",
          detail: "The ecological footprint differs from one country to another.",
        },
      ],
      accordions: [
        {
          title: "🏭 Carbon footprint",
          body: "The area needed to absorb the carbon released from energy use.",
        },
        {
          title: "🏘️ Built-up land",
          body: "The area of land used for settlement and construction.",
        },
        { title: "🌳 Forest", body: "Forest area that supplies wood and paper." },
        { title: "🌾 Cropland", body: "Cultivated land that supplies food and fibre resources." },
        {
          title: "🐄 Grazing land",
          body: "Livestock land that supplies food and fibre resources from animals.",
        },
        { title: "🐟 Fishing grounds", body: "Waters that supply seafood." },
      ],
      checks: [
        {
          question: "What is an ecological footprint?",
          hint: "A measure of how much of Earth's land and water resources — and its capacity to absorb waste and regenerate resources — human demand actually uses.",
        },
        {
          question:
            "What happens if a population's ecological footprint exceeds Earth's ability to renew its resources?",
          hint: "Earth's resources become depleted.",
        },
      ],
    },
    // 20 — Reducing Our Ecological Footprint
    {
      number: "12.1",
      title: "Reducing Our Ecological Footprint",
      conceptQuestion: "How Can We Reduce Our Ecological Footprint?",
      intro:
        "Every individual, as a responsible consumer, can take practical steps to reduce their own ecological footprint.",
      cards: [
        {
          title: "♻️ Steps a consumer can take",
          body: "Reduce, reuse and recycle household waste. Save water and electricity at home. Choose walking, cycling or public transport instead of private vehicles where possible. Buy only what is needed, and choose local or sustainably produced food.",
        },
        {
          title: "🌱 Why reducing our footprint matters",
          body: "Reducing our ecological footprint slows the depletion of Earth's resources, giving them more time to regenerate. It protects resources for future generations and helps keep the balance between what humans use and what Earth can renew.",
        },
      ],
      checks: [
        {
          question: "Give two steps a consumer can take to reduce their ecological footprint.",
          hint: "Among them: reduce, reuse and recycle waste; save water and electricity; use public transport, walk or cycle instead of driving; buy only what is needed.",
        },
        {
          question: "Why is it important to reduce our ecological footprint?",
          hint: "So that Earth's resources are not used up faster than they can regenerate, protecting them for future generations.",
        },
      ],
    },
    // 21 — Formative Practice 12.1
    {
      number: "12.1",
      title: "Formative Practice 12.1",
      checksTitle: "Answer these questions",
      checks: [
        {
          question:
            "Why are A.U. and ly used to state distances in the solar system, instead of km?",
          hint: "The distances of the planets and stars from the Sun are extremely large, so kilometres become impractical — A.U. and light years give more manageable numbers.",
        },
        {
          question: "Which planet is closest to the Sun?",
          hint: "Mercury, at about 57.9 million kilometres from the Sun.",
        },
        {
          question:
            "What is the relationship between a planet's surface temperature and its distance from the Sun?",
          hint: "In theory a closer planet receives more heat, but a planet's atmosphere can change its surface temperature — as with Venus, the hottest planet even though it is not the closest.",
        },
        {
          question: "Which planet has the strongest gravitational pull, and why?",
          hint: "Jupiter — its enormous mass (nearly 320 times Earth's) gives it the strongest gravitational pull, even though its density is low.",
        },
        {
          question: "Which two planets do not rotate from west to east?",
          hint: "Venus (rotates east to west) and Uranus (rotates on its side).",
        },
        {
          question: "Predict one consequence if Earth stopped rotating.",
          hint: "Among them: very long day and night on two different parts of Earth, more desert areas on the side facing the Sun, changed tide timings, or very cold temperatures on the unlit side.",
        },
        {
          question: "Name three characteristics that make Earth suitable for life.",
          hint: "Among them: gravitational pull, plentiful water, high oxygen content, sunlight, a protective atmosphere, and a suitable temperature range.",
        },
        {
          question: "What is an ecological footprint, and why should we try to reduce it?",
          hint: "A measure of human demand on Earth's resources against Earth's ability to regenerate them. Reducing it helps prevent Earth's resources from becoming depleted.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can compare the distances of the planets in the solar system from the Sun using astronomical units (A.U.) and light years (ly).",
    "I can build a table to compare and contrast the planets in the solar system with Earth.",
    "I can explore possible relationships based on planetary characteristics and explain those relationships, including any anomalies.",
    "I can reason and draw analogies about hypothetical situations related to the solar system.",
    "I can justify Earth as the most suitable planet for life based on data about Earth, and explain the ecological footprint.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "True or false: Venus is the hottest planet in the solar system, even though Mercury is closer to the Sun.",
      answer: true,
      explanation:
        "True — Venus's thick carbon dioxide atmosphere traps heat through the greenhouse effect, while Mercury has no atmosphere at all.",
    },
    {
      type: "multiple-choice",
      question: "Which planet rotates on its side, almost parallel to its orbit?",
      options: ["Venus", "Uranus", "Saturn", "Mars"],
      answerIndex: 1,
      explanation:
        "Uranus — all the planets rotate from west to east except Venus (east to west) and Uranus (which rotates on its side).",
    },
  ],
};
