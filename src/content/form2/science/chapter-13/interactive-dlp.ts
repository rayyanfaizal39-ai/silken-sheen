import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch13-meteoroid-asteroid-komet.png";
import { SCIENCE_F2_CH13_IMAGES } from "../visual-assets";

/**
 * Chapter 13 — Meteoroids, Asteroids and Comets (DLP).
 *
 * One Standard Kandungan, 13.1, taught as separate lessons so the three objects
 * never blur into one combined page: a short introduction, one lesson per
 * object, protecting Earth, a final comparison, then Check Yourself. Every
 * section keeps the number 13.1 — the lessons are learner-facing headings, not
 * new syllabus subsections.
 *
 * Mirrors interactive-bm.ts part for part; only the words differ.
 */
export const scienceF2C13InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 13,
  blogHighlight: {
    title: "Science Blog — When a Comet Hit Jupiter",
    body: "In 1994, pieces of **Comet Shoemaker-Levy 9** crashed into Jupiter — the first direct collision between a comet and another object in the solar system ever recorded.",
    imagePath: chapterImage,
    imageAlt: "Illustration of asteroids and a bright comet streaking through space",
  },
  keywords: [
    "Meteoroid",
    "Meteor",
    "Meteorite",
    "Meteor shower",
    "Asteroid",
    "Asteroid belt",
    "Comet",
    "Kuiper Belt",
    "Oort Cloud",
  ],
  sections: [
    {
      number: "13.1",
      title: "Other Objects in the Solar System",
      conceptQuestion: "What are Meteoroids, Asteroids and Comets?",
      intro:
        "Besides galaxies, stars and planets, the solar system also contains smaller objects. Meet the three you will study in this chapter — each one has its own lesson next.",
      cards: [
        {
          title: "🪨 Meteoroid",
          body: "A small fragment of rock and metal moving through space.",
        },
        {
          title: "🪐 Asteroid",
          body: "A large rocky and metallic body that travels around the Sun in its own orbit.",
        },
        {
          title: "☄️ Comet",
          body: "A small body made of ice, gas, frozen dust and rocky material that travels around the Sun.",
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Meteoroids, Meteors & Meteorites",
      conceptQuestion: "What is a Meteoroid?",
      intro:
        "A **meteoroid** is a small fragment of rock and metal moving through space. What we call it changes as it travels towards Earth.",
      lessonFlow: [
        {
          kind: "points",
          title: "Characteristics of a Meteoroid",
          items: [
            "Size: about 10 μm to 1 m",
            "Made of rocks and metals such as iron and nickel",
            "Often originates from fragments of asteroids and comets",
            "Surface temperature in outer space: about 0°C",
            "Travels at different speeds — the fastest can reach about 42 km s⁻¹",
            "Moves freely through space, influenced by the gravitational pull of planets, moons and other objects around it",
          ],
        },
        {
          kind: "figure",
          figure: "meteoroid-journey",
          title: "From Meteoroid to Meteor to Meteorite",
          instruction: "Tap each stage to see where it happens.",
          src: SCIENCE_F2_CH13_IMAGES.meteoroidJourney,
          alt: "A rocky meteoroid in outer space, a glowing meteor entering Earth's atmosphere, and a meteorite fragment resting in a small pit on Earth's surface",
          concepts: [
            {
              id: "meteoroid",
              label: "Meteoroid",
              spotlightCaption: "In outer space",
              note: "A meteoroid is a fragment of rock and metal moving in space.",
            },
            {
              id: "meteor",
              label: "Meteor",
              spotlightCaption: "Entering the atmosphere",
              note: "When a meteoroid enters Earth's atmosphere, it becomes a meteor. Interaction with the atmosphere produces intense heating and a streak of light.",
            },
            {
              id: "meteorite",
              label: "Meteorite",
              spotlightCaption: "Reached the surface",
              note: "If part of the meteor survives its journey through the atmosphere and reaches Earth's surface, it is called a meteorite.",
            },
          ],
        },
        {
          kind: "branchFlow",
          title: "Two Possible Endings",
          nodes: [
            { label: "Meteoroid", where: "In outer space" },
            { label: "Meteor", where: "In Earth's atmosphere" },
          ],
          orLabel: "or",
          endings: [
            {
              id: "burns-up",
              label: "Burns up",
              note: "Usually, a meteor burns up completely before reaching Earth.",
            },
            {
              id: "survives",
              label: "Survives",
              note: "Part of it reaches Earth's surface.",
              result: { label: "Meteorite", where: "On Earth's surface" },
            },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          body: "The same object **changes its name depending on where it is**: a meteoroid in outer space, a meteor in Earth's atmosphere, and a meteorite if part of it reaches Earth's surface.",
        },
        {
          kind: "meteorShower",
          title: "Meteor Shower",
          body: "A meteor shower occurs when **many meteors** enter Earth's atmosphere at about the same time.",
          note: "A meteor shower is not a stage in one meteoroid's journey — it is many separate meteors seen together.",
          figureLabel:
            "Many glowing meteor streaks entering Earth's atmosphere at about the same time",
          atmosphereLabel: "Earth's atmosphere",
          surfaceLabel: "Earth's surface",
        },
        {
          kind: "blog",
          badge: "Science Blog",
          title: "The Hoba Meteorite",
          src: SCIENCE_F2_CH13_IMAGES.hobaMeteorite,
          alt: "The large, flat, dark-brown Hoba Meteorite resting on dry ground, with trees and mountains behind it",
          points: [
            "Recorded as the world's largest known meteorite",
            "Found near Grootfontein, Namibia",
            "Discovered in 1920",
            "Believed to have reached Earth about 80,000 years ago",
            "Unusually, no large crater surrounds it",
            "Its relatively flat shape may have contributed to a lower impact velocity",
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Asteroids",
      conceptQuestion: "What is an Asteroid?",
      intro:
        "An **asteroid** is a large rocky and metallic body that travels around the Sun in its own orbit.",
      lessonFlow: [
        {
          kind: "points",
          title: "Characteristics of an Asteroid",
          items: [
            "Size: about 1 m to 1,000 km",
            "Made mainly of rock and metals such as iron and nickel",
            "Cold surface temperature: about −73°C",
            "Average orbital speed: about 25 km s⁻¹",
            "Travels around the Sun in its own orbit",
            "Most asteroids are found in the asteroid belt, between the orbits of Mars and Jupiter",
            "Large examples include Ceres, Pallas, Juno and Vesta",
            "Asteroids are also known as small planets",
          ],
        },
        {
          kind: "asteroidBelt",
          title: "The Asteroid Belt",
          instruction: "Tap Mars, the asteroid belt or Jupiter.",
          figureLabel: "The asteroid belt between the orbits of Mars and Jupiter",
          sunLabel: "Sun",
          earthLabel: "Earth",
          items: [
            {
              id: "mars",
              label: "Mars",
              note: "Mars is the fourth planet from the Sun. The asteroid belt begins beyond its orbit.",
            },
            {
              id: "belt",
              label: "Asteroid belt",
              note: "Most asteroids are found here, in a belt between the orbits of Mars and Jupiter. They move around the Sun at an average speed of 25 km s⁻¹.",
            },
            {
              id: "jupiter",
              label: "Jupiter",
              note: "Jupiter is the largest planet. Its orbit lies beyond the asteroid belt.",
            },
          ],
          scaleNote: "Diagram is not to true scale.",
        },
        {
          kind: "crossingOrbits",
          title: "Asteroid Orbits That Reach Earth: Apollo, Amor and Aten",
          explanation:
            "Apollo, Amor and Aten are examples of asteroid orbits outside the asteroid belt. Some asteroid orbits may approach or intersect Earth's orbit.",
          figureLabel: "Apollo, Amor and Aten compared with Earth's orbit around the Sun",
          sunLabel: "Sun",
          earthLabel: "Earth",
          earthOrbitLabel: "Earth's orbit",
          orbits: [
            { id: "apollo", label: "Apollo" },
            { id: "amor", label: "Amor" },
            { id: "aten", label: "Aten" },
          ],
          scaleNote: "Diagram is not to true scale.",
        },
        {
          kind: "heading",
          title: "When an Asteroid Collides with Earth",
          body: "Some asteroid orbits outside the asteroid belt can pass near or intersect Earth's orbit. A **collision can occur when the paths of Earth and an asteroid meet**. Large asteroid impacts may cause severe effects on life and on Earth's surface.",
        },
        {
          kind: "figure",
          figure: "impact-crater",
          title: "Impact Effects",
          instruction: "Tap each part of the crater.",
          src: SCIENCE_F2_CH13_IMAGES.impactCrater,
          alt: "A large bowl-shaped impact crater in grassland, with a cut-away view of the bent and cracked rock layers beneath it",
          caption: "The crater left behind after an impact — not the asteroid itself.",
          concepts: [
            {
              id: "crater",
              label: "Impact Crater",
              spotlightCaption: "On Earth's surface",
              note: "A large impact can form a crater on Earth's surface.",
            },
          ],
        },
        {
          kind: "contextCards",
          title: "Evidence of Past Impacts",
          cards: [
            {
              id: "arizona",
              icon: "🏜️",
              title: "Arizona Crater",
              points: [
                "Formed by a meteorite impact",
                "About 50,000 years ago",
                "Diameter of about 1.2 km",
              ],
            },
            {
              id: "dinosaurs",
              icon: "🦕",
              title: "Dinosaur Extinction Theory",
              body: "One scientific explanation proposes that a very large asteroid impact contributed to the extinction of dinosaurs. The asteroid in this explanation is estimated to be about 10 km in size.",
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Comets",
      conceptQuestion: "What is a Comet?",
      intro:
        "A **comet** is a small body made of ice, gas, frozen dust and rocky material that travels around the Sun.",
      lessonFlow: [
        {
          kind: "points",
          title: "Characteristics of a Comet",
          items: [
            "Consists of two main parts: a head and a tail",
            "The head can reach about 250,000 km across",
            "The tail can reach about 150,000,000 km long",
            "Contains water and gases frozen into ice, dust and rocky particles",
            "Travels around the Sun in its own elliptical orbit",
            "Average speed ranges from about 10 km s⁻¹ to 70 km s⁻¹",
          ],
        },
        {
          kind: "figure",
          figure: "comet-anatomy",
          title: "Parts of a Comet",
          instruction: "Tap each part of the comet.",
          src: SCIENCE_F2_CH13_IMAGES.cometAnatomy,
          alt: "The Sun on the left sends solar-wind arrows towards a comet; the comet's rocky nucleus sits inside a bright coma, and two long tails stretch to the right, away from the Sun",
          concepts: [
            {
              id: "head",
              label: "Head",
              spotlightCaption: "Bright head",
              note: "The head contains frozen material, gas, dust and rocky particles.",
            },
            {
              id: "tail",
              label: "Tail",
              spotlightCaption: "Two tails",
              note: "As a comet approaches the Sun, heating causes it to develop a long tail.",
            },
            {
              id: "solar-wind",
              label: "Solar Wind",
              spotlightCaption: "From the Sun",
              note: "The tail always points away from the Sun because of solar wind from the Sun.",
            },
          ],
        },
        {
          kind: "cometOrigin",
          title: "Where Do Comets Come From?",
          intro:
            "Most comets originate from two very distant regions: the **Kuiper Belt** and the **Oort Cloud**.",
          instruction: "Tap each region.",
          figureLabel:
            "The Kuiper Belt beyond Neptune's orbit, and the Oort Cloud surrounding the whole solar system",
          sunLabel: "Sun",
          regions: [
            {
              id: "kuiper",
              label: "Kuiper Belt",
              note: "A belt of icy bodies beyond the orbit of Neptune, the farthest planet.",
            },
            {
              id: "oort",
              label: "Oort Cloud",
              note: "A huge, very distant cloud of icy bodies that surrounds the whole solar system like a shell.",
            },
          ],
          scaleNote: "Diagram is not to true scale.",
        },
        {
          kind: "cometOrbit",
          title: "How a Comet Moves Around the Sun",
          instruction: "Tap a position to see how the comet changes.",
          figureLabel:
            "A comet on an elliptical orbit around the Sun, its tail always pointing away from the Sun",
          positionLabel: "Position",
          sunLabel: "Sun",
          tailLabel: "Tail",
          stages: [
            {
              label: "Far from the Sun",
              body: "Far from the Sun, the comet is colder and shows little visible tail.",
            },
            {
              label: "Near the Sun",
              body: "As the comet approaches the Sun, it moves faster, heats up and develops a longer tail.",
            },
            {
              label: "Moving away",
              body: "As the comet moves away from the Sun, its activity gradually decreases.",
            },
          ],
          tailRule:
            "A comet's tail always points away from the Sun because of the solar wind blowing from the Sun — it does not simply trail behind the comet.",
          scaleNote: "Diagram is not to true scale.",
        },
        {
          kind: "heading",
          title: "Can a Comet Collide with Earth?",
          body: "The gravitational pull of the outer planets may disturb a comet's orbit. A comet that leaves its normal orbit could approach — or even collide with — Earth at high speed.",
        },
        {
          kind: "contextCards",
          cards: [
            {
              id: "halley",
              icon: "🔭",
              title: "Halley's Comet",
              points: ["Last seen passing Earth in 1986", "Expected to pass Earth again in 2061"],
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Protecting Earth from Asteroid Impacts",
      conceptQuestion: "How Do Scientists Protect Earth?",
      intro:
        "Scientists continuously watch the sky to make sure that the orbits of asteroids stay at a safe distance from Earth's orbit.",
      lessonFlow: [
        {
          kind: "processFlow",
          title: "Monitor, Warn, Change Course",
          instruction: "Tap each step in order.",
          stepLabel: "Step",
          steps: [
            {
              id: "monitor",
              icon: "🔭",
              label: "Monitor",
              note: "Scientists monitor asteroid orbits and positions.",
            },
            {
              id: "warn",
              icon: "⚠️",
              label: "Warn",
              note: "Warnings can be issued when an asteroid is predicted to approach Earth dangerously.",
            },
            {
              id: "change-course",
              icon: "↪️",
              label: "Change Course",
              note: "A dangerous asteroid may potentially have its course changed or be destroyed.",
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Meteoroid vs Asteroid vs Comet",
      conceptQuestion: "How Are the Three Objects Different?",
      intro: "Now compare everything you have learned about the three objects, feature by feature.",
      lessonFlow: [
        {
          kind: "comparisonTable",
          featureLabel: "Feature",
          columns: [
            { id: "meteoroid", icon: "🪨", label: "Meteoroid" },
            { id: "asteroid", icon: "🪐", label: "Asteroid" },
            { id: "comet", icon: "☄️", label: "Comet" },
          ],
          rows: [
            {
              id: "composition",
              label: "Composition",
              values: [
                "Small fragment of rock and metals such as iron and nickel",
                "Much larger body of rock and metals such as iron and nickel",
                "Ice (frozen water and gases), dust and rocky material",
              ],
            },
            {
              id: "size",
              label: "Typical size",
              values: [
                "About 10 μm to 1 m",
                "About 1 m to 1,000 km",
                "Head up to about 250,000 km; tail up to about 150,000,000 km",
              ],
            },
            {
              id: "movement",
              label: "Movement / Orbit",
              values: [
                "Moves freely through space at varying speeds — the fastest about 42 km s⁻¹",
                "Orbits the Sun at an average speed of about 25 km s⁻¹; most are in the asteroid belt",
                "Own elliptical orbit around the Sun; about 10 km s⁻¹ to 70 km s⁻¹, speeding up near the Sun",
              ],
            },
            {
              id: "feature",
              label: "Key identifying feature",
              values: [
                "Becomes a meteor — a streak of light — when it enters Earth's atmosphere",
                "Large rocky body, also known as a small planet",
                "Develops a head and a long tail that points away from the Sun",
              ],
            },
            {
              id: "effect",
              label: "Possible effect on Earth",
              values: [
                "Usually burns up as a meteor; a meteorite that survives can form a crater",
                "A large impact can form a huge crater and severely affect life",
                "If disturbed from its orbit, it could collide with Earth at high speed",
              ],
            },
          ],
        },
      ],
      checks: [],
    },
    {
      number: "13.1",
      title: "Check Yourself",
      intro: "Test your understanding of meteoroids, asteroids and comets.",
      checksTitle: "Answer these questions",
      checks: [
        {
          question:
            "Nicol sees a bright streak of light cross the sky, then it vanishes. What did she see?",
          hint: "A meteor — a meteoroid that heats up and glows as it passes through Earth's atmosphere.",
        },
        {
          question: "Between a meteor and a meteorite, which would you find in a museum?",
          hint: "A meteorite — usually a meteor burns up before reaching Earth, but some do reach it. A meteor that reaches Earth is what we call a meteorite, and only a meteorite can be put on display in a museum.",
        },
        {
          question: "Is a meteor shower one of the stages in a single meteoroid's journey?",
          hint: "No. A meteor shower is many meteors entering Earth's atmosphere at about the same time. One meteoroid becomes a meteor, and then either burns up or reaches the surface as a meteorite.",
        },
        {
          question: "Where are most asteroids found?",
          hint: "In the asteroid belt, between the orbits of Mars and Jupiter.",
        },
        {
          question:
            "Which of the Apollo, Amor and Aten orbits comes close to Earth's orbit without crossing it?",
          hint: "Amor. Its orbit approaches Earth's orbit from outside, while the Apollo and Aten orbits both cross Earth's orbit.",
        },
        {
          question: "A comet is moving away from the Sun. Which way does its tail point?",
          hint: "Still away from the Sun. Solar wind pushes the tail material away from the Sun, so on the way out the tail is in front of the comet.",
        },
        {
          question: "Name the two distant regions where most comets come from.",
          hint: "The Kuiper Belt and the Oort Cloud.",
        },
        {
          question: "Why do scientists keep tracking asteroids near Earth?",
          hint: "To check whether an orbit could come dangerously close to Earth, so that warnings can be issued and the object's path changed in time if needed.",
        },
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
      explanation:
        "It always points away — solar wind pushes the released gas and dust outward from the Sun.",
    },
    {
      type: "multiple-choice",
      question: "Where do most asteroids in our solar system live?",
      options: [
        "Between Earth and Mars",
        "Between Mars and Jupiter",
        "Beyond Neptune",
        "Between Mercury and Venus",
      ],
      answerIndex: 1,
      explanation:
        "The asteroid belt sits between Mars and Jupiter, home to most of the solar system's asteroids.",
    },
  ],
};
