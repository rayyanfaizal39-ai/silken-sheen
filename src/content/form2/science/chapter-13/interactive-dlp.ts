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
      sequence: {
        title: "☄️ From meteoroid to meteorite — follow the journey",
        instruction: "Step through what happens when a meteoroid gets close to Earth.",
        steps: [
          { title: "Meteoroid", body: "A small fragment of rock and metal floats freely in space, orbiting the Sun.", detail: "🪨" },
          { title: "Meteor", body: "Entering Earth's atmosphere, friction with air heats it until it glows — a streak of light, sometimes called a 'shooting star'.", detail: "🔥" },
          { title: "Meteor shower", body: "When many meteors enter at once, it's called a meteor shower.", detail: "🌠" },
          { title: "Meteorite", body: "Most meteors burn up completely — but if a fragment survives to hit the ground, it's now a meteorite, sometimes leaving a crater.", detail: "💥" },
        ],
      },
      checks: [
        { question: "Nicol sees a bright streak of light cross the sky, then it vanishes. What did she see?", hint: "A meteor — a meteoroid burning up from friction as it passes through Earth's atmosphere." },
        { question: "Between a meteor and a meteorite, which would you find in a museum?", hint: "A meteorite — meteors burn up completely in the atmosphere; only fragments that survive to reach the ground become meteorites." },
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
