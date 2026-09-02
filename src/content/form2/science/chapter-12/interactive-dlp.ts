import type { ScienceF2InteractiveContent, PlanetSphere } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch12-sistem-suria.png";

/**
 * Science Form 2 — Chapter 12: Solar System (DLP)
 *
 * Structural mirror of interactive-bm.ts: same five sections in the same order,
 * same blocks, same planet data, same interactions. Only the learner-facing
 * language differs.
 *
 * One Standard Kandungan (12.1) with five Standard Pembelajaran, so every
 * section is numbered 12.1. Planet data is Jadual 12.2 (textbook pp. 256-257).
 */

const PLANETS_DLP: PlanetSphere[] = [
  {
    id: "mercury",
    name: "Mercury",
    gradient: "radial-gradient(circle at 35% 30%, #b8b0a8, #8c8478 60%, #5c564c)",
    size: 34,
    fact: "The smallest planet and the closest to the Sun — no atmosphere, heavily cratered, scorching on one side while freezing on the other.",
    facts: [
      { label: "Diameter", value: "4 879 km" },
      { label: "Distance", value: "57.9 million km" },
      { label: "Average temperature", value: "167 °C" },
      { label: "Density", value: "5.4 g cm⁻³" },
      { label: "Gravitational attraction", value: "3.7 m s⁻² (0.38 × Earth)" },
      { label: "Atmosphere", value: "No atmosphere" },
      { label: "Surface", value: "Colourless, with craters covered in fine dust, plains, mountains and valleys" },
      { label: "Rotation", value: "West to east · 10.89 km/h · 59 days" },
      { label: "Revolution", value: "88 days" },
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
      { label: "Distance", value: "108.2 million km" },
      { label: "Average temperature", value: "457 °C" },
      { label: "Density", value: "5.2 g cm⁻³" },
      { label: "Gravitational attraction", value: "8.87 m s⁻² (0.91 × Earth)" },
      { label: "Atmosphere", value: "96.5% carbon dioxide; 3.4% nitrogen; 0.1% argon, helium, neon, sulfur dioxide, water vapour" },
      { label: "Surface", value: "Orange in colour, sandy and rocky, with large plains, volcanoes and wide craters" },
      { label: "Rotation", value: "East to west · 6.52 km/h · 243 days" },
      { label: "Revolution", value: "224.7 days" },
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
      { label: "Distance", value: "149.6 million km" },
      { label: "Average temperature", value: "14 °C" },
      { label: "Density", value: "5.5 g cm⁻³" },
      { label: "Gravitational attraction", value: "9.8 m s⁻² (reference)" },
      { label: "Atmosphere", value: "78% nitrogen; 21% oxygen; 0.97% noble gases and other substances; 0.03% carbon dioxide" },
      { label: "Surface", value: "More than 71% water and 29% land (plains, mountains and volcanoes)" },
      { label: "Rotation", value: "West to east · 1 674.4 km/h · 24 hours" },
      { label: "Revolution", value: "365 days" },
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
      { label: "Distance", value: "227.9 million km" },
      { label: "Average temperature", value: "−55 °C" },
      { label: "Density", value: "3.9 g cm⁻³" },
      { label: "Gravitational attraction", value: "3.71 m s⁻² (0.38 × Earth)" },
      { label: "Atmosphere", value: "96% carbon dioxide; 1.9% nitrogen; 1.9% argon; 0.2% oxygen, carbon monoxide" },
      { label: "Surface", value: "Reddish in colour, sandy and rocky, with large plains, volcanoes and wide craters" },
      { label: "Rotation", value: "West to east · 868.2 km/h · 25 hours" },
      { label: "Revolution", value: "687 days" },
      { label: "Natural satellites", value: "2 (Phobos and Deimos)" },
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    gradient: "repeating-linear-gradient(0deg, #d9b78c 0px, #d9b78c 6px, #b8905c 6px, #b8905c 12px)",
    size: 78,
    fact: "The largest planet in the solar system — nearly 320 times Earth's mass, and its strong gravity deflects large objects away from Earth.",
    facts: [
      { label: "Diameter", value: "142 984 km" },
      { label: "Distance", value: "778.3 million km" },
      { label: "Average temperature", value: "−153 °C" },
      { label: "Density", value: "1.3 g cm⁻³" },
      { label: "Gravitational attraction", value: "24.79 m s⁻² (2.53 × Earth)" },
      { label: "Atmosphere", value: "89.6% hydrogen; 10.1% helium; 0.3% methane, ammonia, ethane, water" },
      { label: "Surface", value: "Has no hard surface. Covered only by gas." },
      { label: "Rotation", value: "West to east · 45 300 km/h · 10 hours" },
      { label: "Revolution", value: "11.9 years" },
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
      { label: "Distance", value: "1 429 million km" },
      { label: "Average temperature", value: "−185 °C" },
      { label: "Density", value: "0.7 g cm⁻³" },
      { label: "Gravitational attraction", value: "10.44 m s⁻² (1.07 × Earth)" },
      { label: "Atmosphere", value: "96% hydrogen; 3% helium; 0.4% methane, ammonia, ethane, water" },
      { label: "Surface", value: "Has no hard surface. Covered only by gas." },
      { label: "Rotation", value: "West to east · 35 500 km/h · 11 hours" },
      { label: "Revolution", value: "29.5 years" },
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
      { label: "Distance", value: "2 871 million km" },
      { label: "Average temperature", value: "−214 °C" },
      { label: "Density", value: "1.27 g cm⁻³" },
      { label: "Gravitational attraction", value: "8.69 m s⁻² (0.89 × Earth)" },
      { label: "Atmosphere", value: "83.3% hydrogen; 15.5% helium; 2.4% methane" },
      { label: "Surface", value: "Has no hard surface. Covered only by gas." },
      { label: "Rotation", value: "Rotates on its side · 9 320 km/h · 17 hours" },
      { label: "Revolution", value: "84 years" },
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
      { label: "Distance", value: "4 504 million km" },
      { label: "Average temperature", value: "−225 °C" },
      { label: "Density", value: "1.6 g cm⁻³" },
      { label: "Gravitational attraction", value: "11.15 m s⁻² (1.14 × Earth)" },
      { label: "Atmosphere", value: "80% hydrogen; 19% helium; 0.1% methane, ethane" },
      { label: "Surface", value: "Has no hard surface. Covered only by gas." },
      { label: "Rotation", value: "West to east · 9 660 km/h · 16 hours" },
      { label: "Revolution", value: "164.8 years" },
      { label: "Natural satellites", value: "14" },
    ],
  },
];

const PLANET_NAMES = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

export const scienceF2C12InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 12,
  blogHighlight: {
    title: "Science Blog — A Possible 9th Planet",
    body: "In early 2016, astronomers spotted signs of a possible new planet in our solar system — estimated at roughly 10 times Earth's mass. This finding is still at the research stage, not a confirmed discovery.",
    imagePath: chapterImage,
  },
  keywords: ["Solar system", "Astronomical Unit (A.U.)", "Light year", "Planet", "Natural satellite", "Ecological footprint"],
  sections: [
    {
      number: "12.1",
      title: "Distance in the Solar System",
      intro:
        "The solar system consists of eight planets orbiting the Sun, including Earth. The distances of the planets from the Sun are very large, so astronomical units and light years are used to measure their relative distances from the Sun. In 2006, Pluto was no longer recognised as a planet in the solar system; it is now known as a dwarf planet.",
      cards: [
        {
          title: "📏 Astronomical Unit (A.U.)",
          body: "The average distance between Earth and the Sun, which is about 93 million miles or 150 million kilometres. 1 A.U. = 1.5 × 10⁸ km.",
          detail: "Distance in A.U. = Distance in km ÷ (1.5 × 10⁸ km)",
        },
        {
          title: "💫 Light Year (ly)",
          body: "A light year is a unit of DISTANCE, not of time — it is the distance travelled by light in one year. Light travels at 300 000 km every second, so light can travel 9.5 × 10¹² km in a year.",
          detail: "Distance in ly = Distance in km ÷ (9.5 × 10¹² km)",
        },
        {
          title: "🧭 Worked example from the textbook",
          body: "Saturn is 1.43 × 10⁹ km from the Sun. That distance equals 9.5 A.U. or 1.51 × 10⁻⁴ light years. Earth's distance from the Sun, 1.5 × 10⁸ km, equals 1.0 A.U. or 1.58 × 10⁻⁵ light years.",
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
      planetComparison: {
        title: "Each planet's distance from the Sun",
        instruction: "Compare each planet's distance in kilometres and in astronomical units.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "km",
            label: "Distance (km)",
            values: [
              "5.79 × 10⁷",
              "1.08 × 10⁸",
              "1.50 × 10⁸",
              "2.28 × 10⁸",
              "7.78 × 10⁸",
              "1.43 × 10⁹",
              "2.87 × 10⁹",
              "4.5 × 10⁹",
            ],
            note: "The farther out a planet sits, the greater its distance from the Sun.",
          },
          {
            id: "au",
            label: "Distance (A.U.)",
            values: ["0.39", "0.72", "1.0", "1.52", "5.19", "9.5", "19.13", "30"],
            note: "In astronomical units, Earth's distance from the Sun is the reference: 1.0 A.U.",
          },
        ],
      },
      checks: [
        {
          question: "A star is 4.37 light years from the Sun. Roughly how far is that in km?",
          hint: "4.37 × 9.5 × 10¹² km ≈ 4.15 × 10¹³ km — try it in the calculator above by selecting the 'ly' unit.",
        },
        {
          question: "Why are A.U. and light years used to state the distances of planets from the Sun?",
          hint: "The distances of the planets from the Sun are very large, so kilometres become impractical for comparing their relative distances.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Comparing the Planets",
      intro:
        "Every planet can be compared with Earth using the same characteristics. Choose one characteristic to see all eight planets on it, or tap a planet to see its full profile.",
      planetComparison: {
        title: "Compare the planets with Earth",
        instruction: "Choose a characteristic. The Earth row is marked as the reference.",
        planets: PLANET_NAMES,
        earth: "Earth",
        characteristics: [
          {
            id: "size",
            label: "Size",
            unit: "km",
            values: ["4 879", "12 104", "12 756", "6 794", "142 984", "120 536", "51 118", "49 528"],
            note: "Jupiter is the largest planet and Mercury the smallest.",
          },
          {
            id: "distance",
            label: "Distance",
            unit: "million km",
            values: ["57.9", "108.2", "149.6", "227.9", "778.3", "1 429", "2 871", "4 504"],
            note: "Mercury is closest to the Sun; Neptune is farthest.",
          },
          {
            id: "temperature",
            label: "Temperature",
            unit: "°C",
            values: ["167", "457", "14", "−55", "−153", "−185", "−214", "−225"],
            note: "Venus has the highest average surface temperature even though it is not the planet closest to the Sun.",
          },
          {
            id: "density",
            label: "Density",
            unit: "g cm⁻³",
            values: ["5.4", "5.2", "5.5", "3.9", "1.3", "0.7", "1.27", "1.6"],
            note: "The gas giants have far lower densities than the rocky planets.",
          },
          {
            id: "gravity",
            label: "Gravitational attraction",
            unit: "m s⁻²",
            values: [
              "3.7 (0.38 × Earth)",
              "8.87 (0.91 × Earth)",
              "9.8 (1 × Earth)",
              "3.71 (0.38 × Earth)",
              "24.79 (2.53 × Earth)",
              "10.44 (1.07 × Earth)",
              "8.69 (0.89 × Earth)",
              "11.15 (1.14 × Earth)",
            ],
            note: "Gravitational attraction is given in m s⁻² and as a ratio relative to Earth.",
          },
          {
            id: "atmosphere",
            label: "Atmosphere",
            values: [
              "No atmosphere",
              "96.5% carbon dioxide; 3.4% nitrogen; 0.1% argon, helium, neon, sulfur dioxide, water vapour",
              "78% nitrogen; 21% oxygen; 0.97% noble gases and other substances; 0.03% carbon dioxide",
              "96% carbon dioxide; 1.9% nitrogen; 1.9% argon; 0.2% oxygen, carbon monoxide",
              "89.6% hydrogen; 10.1% helium; 0.3% methane, ammonia, ethane, water",
              "96% hydrogen; 3% helium; 0.4% methane, ammonia, ethane, water",
              "83.3% hydrogen; 15.5% helium; 2.4% methane",
              "80% hydrogen; 19% helium; 0.1% methane, ethane",
            ],
            note: "Only Earth has an atmosphere rich in oxygen.",
          },
          {
            id: "surface",
            label: "Surface condition",
            values: [
              "Colourless, with craters covered in fine dust, plains, mountains and valleys",
              "Orange in colour, sandy and rocky, with large plains, volcanoes and wide craters",
              "More than 71% of its surface is water and 29% land (plains, mountains and volcanoes)",
              "Reddish in colour, sandy and rocky, with large plains, volcanoes and wide craters",
              "Has no hard surface. Covered only by gas.",
              "Has no hard surface. Covered only by gas.",
              "Has no hard surface. Covered only by gas.",
              "Has no hard surface. Covered only by gas.",
            ],
            note: "The four gas giants have no hard surface.",
          },
          {
            id: "rotation",
            label: "Direction and rate of rotation",
            values: [
              "West to east · 10.89 km/h · 59 days",
              "East to west · 6.52 km/h · 243 days",
              "West to east · 1 674.4 km/h · 24 hours",
              "West to east · 868.2 km/h · 25 hours",
              "West to east · 45 300 km/h · 10 hours",
              "West to east · 35 500 km/h · 11 hours",
              "Rotates on its side · 9 320 km/h · 17 hours",
              "West to east · 9 660 km/h · 16 hours",
            ],
            note: "All the planets rotate from west to east except Venus and Uranus.",
          },
          {
            id: "orbit",
            label: "Revolution in orbit",
            values: ["88 days", "224.7 days", "365 days", "687 days", "11.9 years", "29.5 years", "84 years", "164.8 years"],
            note: "The time taken for one complete revolution around the Sun (Earth time).",
          },
          {
            id: "satellites",
            label: "Natural satellites",
            values: ["0", "0", "1", "2", "67", "62", "27", "14"],
            note: "A natural satellite is a body that orbits a planet in its own orbit. Earth has one: the Moon.",
          },
        ],
      },
      planets: {
        title: "Tap each planet to see its full profile",
        instruction:
          "The sphere sizes below are conceptual only and are not to true scale — see the Size characteristic for the actual diameters.",
        planets: PLANETS_DLP,
      },
      checks: [
        {
          question: "Which planet is closest to the Sun?",
          hint: "Mercury, at about 57.9 million kilometres from the Sun.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Relationships between Planetary Characteristics",
      intro:
        "The characteristics of the planets are related to one another. In theory a planet closer to the Sun receives more heat, but the real situation is more complex — and some anomalies exist.",
      accordions: [
        {
          title: "☿️ Mercury — a planet with no atmosphere",
          body: "Sunlight reaches its surface directly, so the side facing the Sun is extremely hot, above 427 °C. The dark side is extremely cold, with temperatures falling to −173 °C.",
        },
        {
          title: "♀️ Venus — the temperature anomaly",
          body: "Venus has thick clouds that reflect sunlight, but its atmosphere, mostly carbon dioxide, causes a greenhouse effect. A great deal of heat is trapped, so the surface temperature can reach 462 °C — hotter than Mercury even though Venus is farther from the Sun.",
        },
        {
          title: "♂️ Mars — a low-pressure atmosphere",
          body: "Although Mars has an atmosphere, its surface pressure is very low compared with Earth's (less than 1/100 of Earth's pressure), so it has little effect on surface temperature. Temperatures range between −143 °C and 35 °C.",
        },
        {
          title: "🪐 The gas giants",
          body: "Jupiter, Saturn, Uranus and Neptune have surfaces covered by gas. These planets receive very little sunlight, so their surface temperatures are very low.",
        },
      ],
      cards: [
        {
          title: "Density and gravitational attraction",
          body:
            "The gravitational attraction at a planet's surface depends on the planet's mass and its density. The gravitational attraction of Mercury and Mars is lower than Earth's because their masses are low. Venus's gravitational attraction is close to Earth's because its mass is close to Earth's. Jupiter's gravitational attraction is very high compared with Earth's because its mass is very high, even though its density is very low. Although Saturn, Uranus and Neptune have very high masses, the gravitational attraction of these planets is not much higher than Earth's because gas giants have low density.",
          detail: "Earth's gravitational attraction is 9.8 m s⁻².",
        },
        {
          title: "Distance, time and speed",
          body:
            "The farther a planet is from the Sun, the more time it needs to travel once around the Sun in its orbit. Mercury is closest to the Sun, so it takes only 88 days for one orbit. Neptune, the farthest planet, takes 164.8 years.",
        },
      ],
      tabs: [
        {
          title: "Most planets",
          body: "Rotate from west to east. Because Earth rotates from west to east, we see the Sun rise in the east and set in the west.",
        },
        {
          title: "Venus",
          body: "Rotates from east to west — the opposite direction to Earth. This means that on Venus, the Sun would rise in the west.",
        },
        {
          title: "Uranus",
          body: "Rotates on its side — its axis of rotation is tilted almost parallel to its orbit around the Sun.",
        },
      ],
      checks: [
        {
          question: "What is the relationship between a planet's surface temperature and its distance from the Sun?",
          hint: "In theory a closer planet receives more heat, but a planet's atmosphere can change its surface temperature — as with Venus, the hottest planet even though it is not the closest.",
        },
        {
          question: "Aisyah says Mercury is the hottest planet because it is closest to the Sun. Is she correct?",
          hint: "No. Venus is the hottest planet because its thick carbon dioxide atmosphere traps heat through the greenhouse effect.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Hypothetical Solar System Situations",
      intro:
        "Based on an understanding of the solar system, rotation, acting forces and movement can be predicted from the data collected. The situations below are for reasoning — some have conclusions stated in the textbook, and others are for you to discuss.",
      cards: [
        {
          title: "🌗 If Earth rotated slowly or stopped rotating",
          body:
            "Earth's rotation on its axis causes day and night and the tides. If Earth rotated slowly or stopped rotating: day and night would become long on two different parts of Earth; desert areas would increase on the part facing the Sun; the timing of the tides would change; and the temperature on the part of Earth not lit by the Sun would become very cold.",
        },
      ],
      accordions: [
        {
          title: "🌙 Why do some planets have two or more moons?",
          body:
            "Discuss this using the data in the comparison table. A natural satellite is a body that orbits a planet in its own orbit. Mercury and Venus have no natural satellites, Earth has one, Mars has two (Phobos and Deimos), while Jupiter has 67, Saturn 62, Uranus 27 and Neptune 14. Look for a relationship between the number of satellites and each planet's size, mass and gravitational attraction, then state your reasoning.",
        },
        {
          title: "🌍 If you were on the Moon, what would Earth look like?",
          body:
            "Use the following information to reason it out. The Moon rotates on its axis and at the same time revolves around Earth in its orbit. The time the Moon takes to rotate on its axis and to revolve around Earth is the same, about 27 days. Because of this, the same surface of the Moon always faces Earth. Earth is also four times the size of the Moon.",
        },
        {
          title: "🌗 Would Earth appear to have phases when viewed from the Moon?",
          body:
            "This is a question to discuss. Use what you know about the positions of the Sun, Earth and the Moon, and how the sunlit portion changes as the Moon revolves around Earth. Present your group's reasoning and compare it with the other groups.",
        },
      ],
      checks: [
        {
          question: "Predict two things that could happen if Earth stopped rotating.",
          hint: "Among them: long periods of day and night on two different parts of Earth, an increase in desert areas on the side facing the Sun, a change in the timing of the tides, and very cold temperatures on the side not lit by the Sun.",
        },
      ],
    },
    {
      number: "12.1",
      title: "Earth as a Planet for Life",
      intro:
        "So far, Earth is the only planet that has life. Earth can support life because of several factors such as the presence of water, mineral resources, surface temperature and the content of its atmosphere.",
      flipCards: [
        { id: "gravity", icon: "⚖️", label: "Gravitational attraction", fact: "Has gravitational attraction that holds objects on Earth so they do not float off into space." },
        { id: "water", icon: "💧", label: "Water content", fact: "Has a large amount of water for all the needs of living things." },
        { id: "oxygen", icon: "🌬️", label: "Oxygen content", fact: "Has a high oxygen content for the process of respiration." },
        { id: "sunlight", icon: "☀️", label: "Sunlight", fact: "Receives sunlight for the process of photosynthesis in plants." },
        { id: "atmosphere", icon: "🛡️", label: "Protective atmosphere", fact: "Has an atmosphere that blocks harmful rays from reaching Earth." },
        { id: "temperature", icon: "🌡️", label: "Suitable temperature range", fact: "Has a suitable temperature range, that is, neither too hot nor too cold." },
      ],
      cards: [
        {
          title: "🌱 Ecological footprint",
          body:
            "The ecological footprint is a measure of the ability of water and land to provide the resources needed by humans (food, drink, shelter and others), together with Earth's ability to absorb all human waste and then regenerate those resources after they have been used.",
          detail: "The ecological footprint differs from one country to another.",
        },
        {
          title: "⚠️ When the ecological footprint is too large",
          body:
            "If the ecological footprint exceeds Earth's ability to renew its resources, Earth will run out of resources. As responsible consumers, every individual has a role in managing the environment and reducing their own ecological footprint.",
        },
      ],
      accordions: [
        { title: "🏭 Carbon footprint", body: "The area needed to absorb the carbon released from energy use." },
        { title: "🏘️ Built-up land", body: "The area of land used for settlement and construction." },
        { title: "🌳 Forest", body: "Forest area that supplies wood and paper." },
        { title: "🌾 Cropland", body: "Cultivated land that supplies food and fibre resources." },
        { title: "🐄 Grazing land", body: "Livestock land that supplies food and fibre resources from animals." },
        { title: "🐟 Fishing grounds", body: "Waters that supply seafood." },
      ],
      checks: [
        {
          question: "Venus is considered Earth's twin because its size, mass, volume and density are close to Earth's. Why is this planet unlikely to have life?",
          hint: "Venus's atmosphere is mostly carbon dioxide and causes an extreme greenhouse effect, making its surface temperature far too hot for life.",
        },
        {
          question: "Name three characteristics of Earth that make it suitable for life.",
          hint: "Among them: gravitational attraction, a large amount of water, a high oxygen content, sunlight, a protective atmosphere and a suitable temperature range.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can compare the distances of the planets in the solar system from the Sun using astronomical units (A.U.) and light years (ly).",
    "I can build a table to compare and contrast the planets in the solar system with Earth.",
    "I can explore possible relationships based on planetary characteristics and explain those relationships, including any anomalies.",
    "I can reason and draw analogies about hypothetical situations related to the solar system.",
    "I can justify Earth as the most suitable planet for life based on data about Earth.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Venus is the hottest planet in the solar system, even though Mercury is closer to the Sun.",
      answer: true,
      explanation: "True — Venus's thick carbon dioxide atmosphere traps heat through the greenhouse effect, while Mercury has no atmosphere at all.",
    },
    {
      type: "multiple-choice",
      question: "Which planet rotates on its side, almost parallel to its orbit?",
      options: ["Venus", "Uranus", "Saturn", "Mars"],
      answerIndex: 1,
      explanation: "Uranus — all the planets rotate from west to east except Venus (east to west) and Uranus (which rotates on its side).",
    },
  ],
};
