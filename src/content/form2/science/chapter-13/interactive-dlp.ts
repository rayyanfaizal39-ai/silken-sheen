import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch13-meteoroid-asteroid-komet.png";

export const scienceF2C13InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 13,
  blogHighlight: {
    title: "Science Blog — The Largest Meteorite on Earth",
    body: "The Hoba Meteorite, discovered in Namibia in 1920, is the largest ever found — fallen roughly 80,000 years ago. Its flat shape may have slowed its impact enough that it never even formed a crater.",
    imagePath: chapterImage,
  },
  keywords: ["Meteoroid", "Meteor", "Meteorite", "Asteroid", "Comet", "Asteroid belt", "Kuiper belt", "Oort cloud"],
  sections: [
    {
      number: "13.1",
      title: "Meteoroids, Asteroids and Comets",
      intro:
        "Besides galaxies, stars and planets, our solar system is also full of smaller wandering objects — meteoroids, asteroids and comets. All three differ in size, composition, and how they move around the Sun.",
      cards: [
        {
          title: "🪨 Meteoroid",
          body: "A small floating piece of stone and metal drifting through space, originating from fragments of asteroids and comets. Sizes range from 10 μm to 1 m, made of iron and nickel, with a surface temperature around 0°C. The fastest ones travel at 42 km/s.",
        },
        {
          title: "🪐 Asteroid",
          body: "A larger rocky/metal body — 1 m to 1,000 km — orbiting the Sun on its own path. Cold, around -73°C, moving at an average 25 km/s. Most live in the asteroid belt between Mars and Jupiter.",
          detail: "Large asteroids such as Ceres, Pallas, Juno and Vesta are also known as 'small planets'.",
        },
        {
          title: "☄️ Comet",
          body: "A mixture of ice, gas and frozen dust with a head and a long tail — the tail alone can stretch up to 150,000,000 km. Comets orbit the Sun on elliptical paths at 10-70 km/s.",
        },
      ],
      accordions: [
        {
          title: "Why comet tails always point away from the Sun",
          body: "As a comet nears the Sun, it heats up and starts to melt, releasing gas and dust. Solar wind — a constant stream of particles blowing outward from the Sun — pushes that released material into a tail that always points away from the Sun, no matter which direction the comet itself is travelling.",
        },
        {
          title: "When orbits collide with Earth's",
          body: "Most asteroids stay safely in the asteroid belt — but some, like those in the Apollo, Amor and Aten orbit groups, cross close to or intersect Earth's orbit, creating a real (if rare) collision risk. Comets can also slip out of their orbit under a giant planet's gravity, sending them on a risky new path. Many scientists believe a roughly 10 km-wide asteroid impact contributed to the extinction of the dinosaurs — evidence found in rock layers worldwide points to a massive collision.",
        },
        {
          title: "Watching the skies",
          body: "Scientists continuously track near-Earth asteroids. If one poses a real risk, options include altering its course or, in extreme scenarios, destroying it before impact.",
        },
      ],
      meteoroidEntry: {
        title: "☄️ From meteoroid to meteorite",
        instruction: "Tap each stage to see where it happens.",
        figureLabel: "The stages of a meteoroid's movement from outer space to the Earth's surface",
        spaceLabel: "Outer space",
        atmosphereLabel: "Earth's atmosphere",
        groundLabel: "Earth's surface",
        stages: [
          {
            id: "meteoroid",
            label: "Meteoroid",
            body: "A small fragment of rock and metal floating in outer space. A meteoroid moves freely through space — not on its own orbit around the Sun the way asteroids and comets are — and is influenced by the gravitational pull of planets, moons and other objects around it.",
          },
          {
            id: "meteor",
            label: "Meteor",
            body: "When a meteoroid enters the Earth's atmosphere, it is called a meteor. Friction between air molecules and the meteor produces heat until it burns, producing a streak of light.",
          },
          {
            id: "pancuran",
            label: "Meteor shower",
            body: "A meteor shower happens when many meteors enter the Earth at one time.",
          },
          {
            id: "meteorit",
            label: "Meteorite",
            body: "Usually a meteor burns up completely before reaching the Earth. However, there are also meteors that do reach the Earth. Such a meteor is called a meteorite. A crater is formed by the impact of a meteorite.",
          },
        ],
      },
      asteroidBelt: {
        title: "🪐 Where asteroids are — and when they can reach Earth",
        instruction: "Tap to switch between the asteroid belt and the orbits that cross Earth's.",
        beltFigureLabel: "The asteroid belt between the orbits of Mars and Jupiter",
        crossingFigureLabel: "The Apollo, Amor and Aten orbits outside the asteroid belt, close to or crossing Earth's orbit",
        beltToggleLabel: "Asteroid belt",
        crossingToggleLabel: "Crossing orbits",
        sunLabel: "Sun",
        venusLabel: "Venus",
        earthLabel: "Earth",
        marsLabel: "Mars",
        jupiterLabel: "Jupiter",
        beltLabel: "Asteroid belt",
        beltBody: "Asteroids form an asteroid belt between the orbits of the planets Mars and Jupiter. Most asteroids are within the asteroid belt and move at an average speed of 25 km s⁻¹.",
        crossingBody: "There are also asteroid orbits that lie outside the asteroid belt, such as Apollo, Amor and Aten. These orbits can come close to or intersect Earth's orbit. A collision between an asteroid and the Earth can occur at the point of intersection or along the path near Earth's orbit and the asteroid's orbit.",
        crossingOrbits: [
          { id: "apollo", label: "Apollo", rx: 96, ry: 44, offsetX: -30, rotate: 14 },
          { id: "amor", label: "Amor", rx: 88, ry: 50, offsetX: -20, rotate: -22 },
          { id: "aten", label: "Aten", rx: 46, ry: 27, offsetX: -12, rotate: 6 },
        ],
        scaleNote: "Diagram is not to true scale.",
      },
      cometOrbit: {
        title: "☄️ A comet's orbit and which way its tail points",
        instruction: "Move the comet to each position and watch where its tail points.",
        figureLabel: "A comet on an elliptical orbit around the Sun, its tail always pointing away from the Sun",
        positionLabel: "Position",
        sunLabel: "Sun",
        nearSunLabel: "Approaching the Sun",
        farSunLabel: "Far from the Sun",
        nearSpeedLabel: "Speeding up — the comet melts and appears to have a long tail",
        farSpeedLabel: "Far from the Sun — the tail has not lengthened",
        nearBody: "As a comet approaches the Sun, the comet speeds up, melts and appears to have a long tail. A comet revolves around the Sun on its own elliptical orbit, at a speed ranging between 10 and 70 km s⁻¹.",
        farBody: "A comet revolves around the Sun on its own elliptical orbit, at a speed ranging between 10 and 70 km s⁻¹. Most comets originate from the Kuiper belt and the Oort cloud.",
        tailRule: "A comet's tail is always in a position facing away from the Sun because of the solar wind blowing from the Sun.",
        scaleNote: "Diagram is not to true scale.",
      },
      checks: [
        { question: "Nicol sees a bright streak of light cross the sky, then it vanishes. What did she see?", hint: "A meteor — a meteoroid burning up from friction as it passes through Earth's atmosphere." },
        { question: "Between a meteor and a meteorite, which would you find in a museum?", hint: "A meteorite — usually a meteor burns up before reaching Earth, but some do reach it. A meteor that reaches Earth is what we call a meteorite, and only a meteorite can be put on display in a museum." },
      ],
    },
  ],
  reflectionItems: [
    "I can communicate the characteristics of meteoroids, asteroids and comets.",
    "I can discuss their movement and effects on Earth based on data.",
    "I can generate ideas on reducing collision risk with Earth.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: A comet's tail always points toward the Sun.",
      answer: false,
      explanation: "It always points away — solar wind pushes the released gas and dust outward from the Sun.",
    },
    {
      type: "multiple-choice",
      question: "Where do most asteroids in our solar system live?",
      options: ["Between Earth and Mars", "Between Mars and Jupiter", "Beyond Neptune", "Between Mercury and Venus"],
      answerIndex: 1,
      explanation: "The asteroid belt sits between Mars and Jupiter, home to most of the solar system's asteroids.",
    },
  ],
};
