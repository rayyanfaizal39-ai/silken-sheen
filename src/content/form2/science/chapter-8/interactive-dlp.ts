import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch8-daya-gerakan.png";

export const scienceF2C8InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 8,
  blogHighlight: {
    title: "Science Blog — Force Is All Around Us",
    body: "Walking, chewing, kicking a ball, pulling a rope in tug-of-war — every one of these is force in action. You can't see it, but you can always feel its effect.",
    imagePath: chapterImage,
  },
  keywords: [
    "Force",
    "Gravitational force",
    "Frictional force",
    "Normal force",
    "Elastic force",
    "Buoyant force",
    "Weight",
    "Moment of force",
    "Pressure",
    "Newton (N)",
  ],
  sections: [
    {
      number: "8.1",
      title: "Force",
      intro:
        "Force is simply a push or a pull on an object. Almost all daily activities involve force — opening a can of food, pressing a switch, opening a door. Force is a vector quantity: it always has magnitude (how strong), direction (which way), and a point of application (exactly where it acts). Force is measured in newtons (N) using a spring balance, which works on the principle of spring extension. On Earth, an object with a mass of 100 g has a weight of 1 N, so an object with a mass of 1 kg has a weight of 10 N.",
      flipCards: [
        { id: "gravitational", icon: "🌍", label: "Gravitational force", fact: "Pulls every object toward Earth's centre — what brings a thrown ball back down." },
        { id: "normal", icon: "🧲", label: "Normal force", fact: "Pushes back whenever an object rests against a surface." },
        { id: "frictional", icon: "🌀", label: "Frictional force", fact: "Resists motion between two touching surfaces, acting opposite to the direction of movement." },
        { id: "elastic", icon: "🔗", label: "Elastic force", fact: "Exists in a stretched or compressed spring or material." },
        { id: "weight", icon: "⚖️", label: "Weight", fact: "The gravitational force acting specifically on an object's mass." },
        { id: "buoyant", icon: "🛟", label: "Buoyant force", fact: "The upward push a fluid gives to anything floating or submerged in it." },
      ],
      accordions: [
        { title: "📖 A book resting on a table", body: "The book's weight (action) pulls down; the table's normal force (reaction) pushes up with equal magnitude — that balance is why the book stays still." },
        { title: "🪵 A block floating on water", body: "Weight (action) pulls down; buoyant force (reaction) pushes up. Equal magnitude means it floats instead of sinking or launching upward." },
        { title: "🚃 Two trolleys pushed apart by a spring", body: "The spring pushes each trolley away with equal force in opposite directions — so both trolleys travel the same distance, just in opposite directions." },
      ],
      checks: [
        { question: "A bungee jumper jumps off a platform. Which force pulls them down?", hint: "Gravitational force — the same force that pulls any thrown object back to Earth." },
      ],
    },
    {
      number: "8.2",
      title: "Effects of Force",
      intro:
        "You can't see force directly, but you can always spot its effects — it can move a stationary object, stop a moving one, change its speed or direction, or change its shape and size. Whether an object floats or sinks depends on one of those effects: the buoyant force pushing it up compared to its weight, which in turn depends on its density compared to water's 1.0 g/cm³.",
      cards: [
        { title: "1st class lever", body: "The fulcrum sits between the load and the effort.", detail: "e.g. scissors, pliers, a can opener" },
        { title: "2nd class lever", body: "The load sits between the fulcrum and the effort.", detail: "e.g. wheelbarrow, nutcracker" },
        { title: "3rd class lever", body: "The effort sits between the fulcrum and the load.", detail: "e.g. ice tongs, fishing rod" },
        {
          title: "Atmospheric pressure in daily life",
          body: "Atmospheric pressure is the air pressing down on everything on Earth's surface. A plunger seals out air so atmospheric pressure holds it down; sucking a straw lowers the pressure inside so outside pressure pushes the drink up; a vacuum cleaner's fan lowers internal pressure so air rushes in, carrying dust with it.",
          detail: "Pressure drops with altitude — less gravity pulling the air down means it's less dense up there.",
        },
        {
          title: "Pressure underwater",
          body: "Liquid pressure increases with depth — exactly why dam walls are built thicker at the base, why divers wear pressure-resistant suits, and why a submarine hull must be strong enough to resist being crushed at depth.",
        },
      ],
      flipCards: [
        { id: "moves", icon: "▶️", label: "Moves a stationary object", fact: "Push a resting ball and it starts rolling." },
        { id: "stops", icon: "⏹️", label: "Stops a moving object", fact: "A force from the opposite direction brings motion to a halt." },
        { id: "speed", icon: "⚡", label: "Changes speed", fact: "Force in the same direction speeds up motion; opposite direction slows it." },
        { id: "direction", icon: "↩️", label: "Changes direction", fact: "A sideways force redirects a moving object's path." },
        { id: "shape", icon: "🔄", label: "Changes shape/size", fact: "Squeezing or stretching an object changes its form — like plasticine." },
      ],
      accordions: [
        { title: "📦 Volume", body: "Compress a container and molecules collide with the walls more often — gas pressure rises." },
        { title: "🌡️ Temperature", body: "Heat the gas and molecules move faster, hitting the walls harder and more often — gas pressure rises." },
      ],
      calculators: [
        {
          type: "two-field",
          title: "🧮 Moment of force calculator",
          instruction: "The turning effect of a force is its moment: Moment = Force × perpendicular distance from the pivot. Try it — this is exactly how a spanner or a see-saw works.",
          fieldA: { label: "Force", unit: "N", default: 50 },
          fieldB: { label: "Distance", unit: "m", default: 0.2 },
          operation: "multiply",
          resultLabel: "Moment",
          resultUnit: "N m",
        },
        {
          type: "two-field",
          title: "🧮 Pressure calculator",
          instruction: "The same force feels completely different depending on the area it's spread over: Pressure = Force ÷ Area. That's why a thumbtack pierces a plank but a coin under the same force doesn't — and why an elephant's huge feet keep it from sinking.",
          fieldA: { label: "Force", unit: "N", default: 10 },
          fieldB: { label: "Area", unit: "m²", default: 0.01 },
          operation: "divide",
          resultLabel: "Pressure",
          resultUnit: "Pa",
        },
      ],
      buoyancy: {
        title: "🌊 Why do some things float and others sink?",
        instruction: "An object floats when the buoyant force pushing it up equals its weight — try a few materials and compare their density to water's 1.0 g/cm³.",
        materials: [
          { id: "cork", label: "Cork", icon: "🪵", density: 0.24 },
          { id: "wood", label: "Wood", icon: "🪑", density: 0.6 },
          { id: "iron", label: "Iron", icon: "⚙️", density: 7.9 },
          { id: "gold", label: "Gold", icon: "🥇", density: 19.3 },
        ],
      },
      matcher: {
        title: "🔧 Levers — classify the tool",
        instruction: "A lever is a bar rotating on a fixed point (fulcrum), with load and effort on either side. Pick a class, then pick the tool that matches it.",
        pairs: [
          { id: "first", label: "1st class — fulcrum between load and effort", match: "✂️ Scissors" },
          { id: "second", label: "2nd class — load between fulcrum and effort", match: "🛒 Wheelbarrow" },
          { id: "third", label: "3rd class — effort between fulcrum and load", match: "🎣 Fishing rod" },
        ],
      },
      checks: [
        { question: "A 5 N cuboid has three different faces. Which face gives the highest pressure on the ground?", hint: "The smallest-area face — smaller area with the same force always means higher pressure." },
        { question: "Why does a helium balloon rise and expand as it climbs higher?", hint: "It rises because helium is less dense than air. It expands because atmospheric pressure drops with altitude, letting the gas inside push outward more." },
      ],
    },
  ],
  reflectionItems: [
    "I can describe force, its properties, and measure it in S.I. units.",
    "I can explain action-reaction force pairs with examples.",
    "I can classify levers and calculate moment of force.",
    "I can explain pressure — gas, atmospheric and liquid — with daily-life examples.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: A thumbtack pierces a plank more easily than a coin because it applies more force.",
      answer: false,
      explanation: "Same force, much smaller area — that's what creates higher pressure, not more force.",
    },
    {
      type: "multiple-choice",
      question: "Which lever class has the load positioned between the fulcrum and the effort?",
      options: ["First class", "Second class", "Third class", "None of these"],
      answerIndex: 1,
      explanation: "Second class — like a wheelbarrow, where the load sits between the wheel (fulcrum) and your hands (effort).",
    },
  ],
};
