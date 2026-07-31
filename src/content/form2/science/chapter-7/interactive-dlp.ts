import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch7-keelektrikan-kemagnetan.png";

export const scienceF2C7InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 7,
  blogHighlight: {
    title: "Science Blog — The Electric Eel",
    body: "An electric eel packs around 6,000 special cells called electrocytes, letting it discharge up to 600 volts — enough to stun predators, catch prey, and even navigate its murky habitat where eyesight barely helps.",
    imagePath: chapterImage,
  },
  keywords: [
    "Electric current",
    "Electrostatic charge",
    "Electroscope",
    "Ohm's Law",
    "Parallel circuit",
    "Series circuit",
    "Effective resistance",
    "Magnetic field",
    "Magnet",
    "Electromagnet",
  ],
  sections: [
    {
      number: "7.1",
      title: "Electricity",
      intro:
        "Energy is simply the ability to do work, measured in joules (J). It cannot be created or destroyed, only changed from one form to another. Rub two different materials together and electrons transfer between them — the object that gains electrons becomes negatively charged, the one that loses them becomes positively charged; an object with equal protons and electrons is neutral. That imbalance is an electrostatic charge, and it explains everything from the shock you feel on a doorknob to how a charged comb picks up paper: like charges repel each other, opposite charges attract.",
      cards: [
        {
          title: "Detecting electrostatic charge",
          body: "An electroscope detects electric charge — its gold leaf diverges because like charges repel each other, and the further it diverges, the more charge has built up.",
        },
        {
          title: "How lightning forms",
          body: "Friction between clouds and air charges the clouds — positive at the top, negative at the bottom. Lightning results from the attraction between the negative charge in the cloud and positive charge on the ground. A lightning conductor gives that charge a safe path into the ground.",
        },
        { title: "Current", body: "The rate of flow of electric charge through a conductor.", detail: "Unit: ampere (A), measured by an ammeter" },
        { title: "Voltage", body: "The potential difference between two points in a circuit.", detail: "Unit: volt (V), measured by a voltmeter" },
        { title: "Resistance", body: "A conductor's opposition to the flow of current — fixed resistors can't be adjusted, but a rheostat (variable resistor) can.", detail: "Unit: ohm (Ω)" },
      ],
      flipCards: [
        { id: "sound", icon: "🔊", label: "Sound", fact: "Vibrations carrying energy through air, like a speaker." },
        { id: "kinetic", icon: "🏃", label: "Kinetic", fact: "Energy of motion — a running animal, a moving car." },
        { id: "electrical", icon: "🔌", label: "Electrical", fact: "Energy carried by flowing electric charge." },
        { id: "gravitational", icon: "⛰️", label: "Gravitational potential", fact: "Stored energy due to height — a book on a shelf." },
        { id: "elastic", icon: "🎯", label: "Elastic potential", fact: "Stored energy in a stretched or compressed object, like a spring." },
        { id: "light", icon: "💡", label: "Light", fact: "Energy radiated as visible light, like a bulb." },
        { id: "nuclear", icon: "☢️", label: "Nuclear", fact: "Energy stored in the nucleus of atoms." },
        { id: "heat", icon: "🔥", label: "Heat", fact: "Energy transferred due to a temperature difference." },
        { id: "chemical", icon: "🧪", label: "Chemical", fact: "Energy stored in chemical bonds, like in food or fuel." },
      ],
      calculators: [
        {
          type: "ohms-law",
          title: "🧮 Ohm's Law calculator",
          instruction: "Ohm's Law ties all three quantities together: V = IR. Enter any two values to find the third.",
        },
      ],
      checks: [
        { question: "A car bulb draws 0.025 A at 12 V. What's its resistance?", hint: "R = V ÷ I = 12 ÷ 0.025 = 480 Ω. Try it in the calculator above!" },
        { question: "Why doesn't a Van de Graaff generator shock feel as dangerous as a wall socket shock?", hint: "Static electricity carries very little current even at high voltage — it's the current (amps), not voltage alone, that determines danger." },
      ],
    },
    {
      number: "7.2",
      title: "Series and Parallel Circuits",
      intro:
        "A series circuit connects components one after another in a single loop — break it anywhere and everything stops. A parallel circuit splits into multiple separate paths — each branch keeps working even if another fails. That's exactly why home wiring is parallel: one blown bulb shouldn't kill power to the whole house, and every appliance gets the same voltage from the distribution panel.",
      tabs: [
        {
          title: "Series",
          body: "Current is the same everywhere (I = I₁ = I₂); voltage splits across components (V = V₁ + V₂); resistance adds up (R = R₁ + R₂). Advantage: simple, one switch controls everything, and every component receives the same current. Disadvantage: one broken component kills the whole circuit, and adding more components increases resistance and reduces current.",
        },
        {
          title: "Parallel",
          body: "Voltage is the same across every branch (V = V₁ = V₂); current splits across branches (I = I₁ + I₂); effective resistance is found from 1/R = 1/R₁ + 1/R₂. Advantage: each appliance works and switches independently. Disadvantage: the voltage across each appliance can't be adjusted individually — it's fixed by the source.",
        },
      ],
      calculators: [
        {
          type: "resistance-comparator",
          title: "🔌 Compare effective resistance",
          instruction: "Enter two resistor values and see how differently series and parallel combine them.",
          defaultR1: 2,
          defaultR2: 2,
        },
      ],
      checks: [
        { question: "Why is a fire alarm system usually wired in series, not parallel?", hint: "In series, any single break (like a triggered sensor) affects the whole circuit — perfect for a system that needs to trip and alert immediately." },
      ],
    },
    {
      number: "7.3",
      title: "Magnetism",
      intro:
        "Magnets exist naturally as lodestones, but everyday magnets are man-made from materials like iron, steel, cobalt and nickel. The space around a magnet where its force acts is called the magnetic field, mapped out by field lines. These lines always run from north pole to south pole, get closer together where the field is stronger, and never cross one another.",
      cards: [
        {
          title: "Real-world uses",
          body: "Compass needles use a freely suspended magnet to point north-south. Credit and debit cards store data on a magnetic strip. Electromagnetic door locks and electric bells rely on electromagnets to work.",
        },
      ],
      flipCards: [
        { id: "attracts", icon: "🧲", label: "Attracts magnetic materials", fact: "Iron, steel, cobalt and nickel are drawn to it." },
        { id: "poles", icon: "🔴🔵", label: "Has two poles", fact: "Every magnet has a north pole and a south pole." },
        { id: "like-repel", icon: "↔️", label: "Like repels, unlike attracts", fact: "Two north poles push apart; north and south pull together." },
        { id: "compass", icon: "🧭", label: "Points north-south when free", fact: "A freely suspended magnet always settles pointing north-south — the basis of a compass." },
      ],
      accordions: [
        {
          title: "🖐️ Right-hand grip rule",
          body: "An electromagnet is a temporary magnet — it only works while current flows through its coil. Curl your right hand's fingers in the direction of the magnetic field, and your thumb points in the direction of conventional current, in a straight wire or coil.",
        },
        { title: "⚡ Factor 1 — More current", body: "A larger current flowing through the coil creates a stronger magnetic field." },
        { title: "🌀 Factor 2 — More coil turns", body: "More turns of wire around the core also strengthens the magnetic field — and the strength fades the further you move from the centre of the conductor." },
      ],
      checks: [
        { question: "An electromagnet used to lift scrap metal has a coil with many turns. Why?", hint: "More turns of the coil increase the strength of the magnetic field — letting it lift heavier loads." },
      ],
    },
  ],
  reflectionItems: [
    "I can describe energy, its forms and its sources.",
    "I can explain electrostatic charges and Ohm's Law.",
    "I can compare current, voltage and resistance in series and parallel circuits.",
    "I can describe magnet properties and electromagnets, with real examples.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: In a parallel circuit, the voltage across each branch is the same.",
      answer: true,
      explanation: "Correct — every branch in a parallel circuit gets the same voltage as the source.",
    },
    {
      type: "multiple-choice",
      question: "What determines the direction of a magnetic field around a straight current-carrying wire?",
      options: ["The material of the wire", "The direction of current flow (right-hand grip rule)", "The wire's length", "The number of dry cells"],
      answerIndex: 1,
      explanation: "The right-hand grip rule: point your thumb in the current's direction, and your curled fingers show the magnetic field direction.",
    },
  ],
};
