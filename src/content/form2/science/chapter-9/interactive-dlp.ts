import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch9-haba.png";

export const scienceF2C9InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Science Blog — Invisible Polar Bears",
    body: "Infrared cameras detect heat radiating off animals — but polar bears trap heat so effectively under their fur and fat that they're almost invisible to thermal imaging, even in freezing habitats.",
    imagePath: chapterImage,
  },
  keywords: [
    "Heat",
    "Temperature",
    "Conduction",
    "Convection",
    "Radiation",
    "Heat conductor",
    "Heat insulator",
    "Thermal equilibrium",
    "Expansion",
    "Contraction",
  ],
  sections: [
    {
      number: "9.1",
      title: "Relationship between Temperature and Heat",
      intro:
        "Heat is a form of energy that flows from a hotter region to a colder one, measured in joules (J). Temperature is just the degree of hotness or coldness — measured in °C or kelvin, and depends on how fast particles are moving. Two beakers of water at the same temperature can hold very different amounts of heat, depending on how much water there is, and what it's made of.",
      cards: [
        { title: "🔥 Heat", body: "A form of energy that depends on the type of material, quantity of material, and temperature.", detail: "Unit: joule (J)" },
        { title: "🌡️ Temperature", body: "The degree of hotness or coldness, which depends on how fast particles in the matter are moving.", detail: "Unit: °C or kelvin (K)" },
      ],
      checks: [
        { question: "Is touch a reliable way to check if someone has a fever?", hint: "Not really — touch is subjective and affected by your own hand's temperature. A thermometer gives an objective reading." },
      ],
    },
    {
      number: "9.2",
      title: "Heat Flow and Thermal Equilibrium",
      intro:
        "Heat always moves from a hotter object to a colder one, through one of three routes. Two objects in contact keep exchanging heat until there's no more net transfer between them — at that point they're in thermal equilibrium and share the same temperature.",
      cards: [
        { title: "When heat flow stops", body: "Heat energy transfers from the higher-temperature object to the lower-temperature one until there's no net transfer left — that's thermal equilibrium, and both objects end up at the same temperature." },
      ],
      flipCards: [
        { id: "conduction", icon: "🔗", label: "Conduction", fact: "Heat passes particle to particle through a solid — like a metal spoon warming up in hot soup." },
        { id: "convection", icon: "🌀", label: "Convection", fact: "Heated fluid (liquid or gas) rises and circulates, carrying heat with it — like water boiling in a pot." },
        { id: "radiation", icon: "☀️", label: "Radiation", fact: "Heat travels without needing any medium at all — like sunlight crossing empty space to reach Earth." },
      ],
      tabs: [
        {
          title: "☀️ Daytime",
          body: "Sea breeze: the Sun heats land faster than sea. Warm air over land rises, and cooler, denser air from the sea rushes in to replace it — creating a breeze blowing from sea to land.",
        },
        {
          title: "🌙 Nighttime",
          body: "Land breeze: land cools faster than sea at night. Warmer air over the sea rises, and cooler air from land moves out to replace it — creating a breeze blowing from land to sea.",
        },
      ],
      matcher: {
        title: "🔌 Match the conductor or insulator to its job",
        instruction: "Pick a material type, then pick the everyday item that uses it.",
        pairs: [
          { id: "pan", label: "🔥 Heat conductor — cooks food fast", match: "Metal pan base" },
          { id: "iron", label: "🔥 Heat conductor — irons clothes fast", match: "Iron's metal sole plate" },
          { id: "gloves", label: "🧊 Heat insulator — protects hands", match: "Oven gloves" },
          { id: "icebox", label: "🧊 Heat insulator — keeps things cool", match: "Ice box wall (fibreglass/polystyrene)" },
        ],
      },
      checks: [
        { question: "Why is the heating coil in an electric kettle placed at the bottom?", hint: "Heated water at the bottom becomes less dense and rises, setting up a convection current that heats the whole kettle efficiently." },
      ],
    },
    {
      number: "9.3",
      title: "Principle of Expansion and Contraction of Matter",
      intro:
        "In a solid, particles vibrate in a fixed position — heating makes them vibrate faster and push further apart, so the object expands. Cooling does the reverse: particles vibrate slower and move closer, so it contracts. Liquids and gases work the same way, just with particles that are already free to move — heating makes them move faster and further apart, and cooling makes them move slower and closer together.",
      accordions: [
        { title: "🚂 Railway track gaps", body: "Small gaps between rail sections let tracks expand in heat without buckling and overlapping." },
        { title: "🌉 Steel bridge rollers", body: "One end sits on rollers with a gap, letting the whole bridge expand safely in hot weather." },
        { title: "🔔 Bimetallic strip fire alarm", body: "Two different metals expand at different rates when heated — the copper strip expands faster than the steel strip, bending the strip toward a contact point, completing a circuit that triggers the alarm." },
        { title: "🌡️ Mercury thermometers", body: "Mercury is a heat conductor that expands and contracts predictably with temperature, which is exactly what makes it useful for measuring heat." },
      ],
      checks: [
        { question: "A bottle lid is stuck tight. How does the expansion principle help open it?", hint: "Submerging the lid in hot water makes the metal expand slightly, loosening its grip so it twists off more easily." },
      ],
    },
    {
      number: "9.4",
      title: "Surface Type and Heat Absorption/Emission",
      intro:
        "An object's ability to absorb or radiate heat depends on the type and colour of its surface. When an object absorbs heat, its temperature increases; when it radiates heat, its temperature decreases. In an experiment comparing a white can and a black can placed near a heat source, the black can heats up more (better absorber) — and when both are filled with hot water, the black can cools down faster too (better radiator).",
      tabs: [
        {
          title: "Dark, dull surface",
          body: "Absorbs and radiates heat well. That's why solar water heaters use dark panels, and why a black car feels hotter inside on a sunny day.",
        },
        {
          title: "Light, shiny surface",
          body: "Absorbs and radiates heat poorly — it reflects more instead. That's exactly why fuel tank trucks are painted white or silver, to keep fuel from evaporating in the heat.",
        },
      ],
      checks: [
        { question: "Why does bright clothing feel cooler than dark clothing in hot weather?", hint: "Bright, light-coloured surfaces absorb less heat from the sun than dark surfaces do." },
      ],
    },
  ],
  reflectionItems: [
    "I can compare heat and temperature.",
    "I can explain heat flow, thermal equilibrium and conductors/insulators.",
    "I can explain expansion and contraction of matter with daily-life uses.",
    "I can demonstrate how surface type affects heat absorption and emission.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Heat and temperature mean exactly the same thing.",
      answer: false,
      explanation: "Heat is a form of energy; temperature is a measure of hotness/coldness — related, but not the same.",
    },
    {
      type: "multiple-choice",
      question: "Which heat transfer method needs no medium at all?",
      options: ["Conduction", "Convection", "Radiation", "All of these"],
      answerIndex: 2,
      explanation: "Radiation is how heat from the Sun crosses empty space to reach Earth — no medium required.",
    },
  ],
};
