import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch5-air-larutan.png";

export const scienceF2C5InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Science Blog — The Dead Sea",
    body: "At roughly 430.5 metres below sea level, the Dead Sea is the lowest point on Earth. Because it's completely landlocked, water flowing in from the Jordan River evaporates fast and leaves its salt behind — making the water so dense that people float on the surface without even trying.",
    imagePath: chapterImage,
  },
  keywords: [
    "Compound",
    "Capillary action",
    "Solubility",
    "Suspension",
    "Emulsion",
    "Saturated solution",
    "Universal solvent",
    "Oxidation",
    "Chlorination",
    "Water sustainability",
  ],
  sections: [
    {
      number: "5.1",
      title: "Physical Characteristics of Water",
      intro:
        "Pure water is colourless, odourless and tasteless, and stays liquid at room temperature. It boils at exactly 100°C, freezes at 0°C, and has a density of 1 g cm⁻³ — these fixed values are actually how we test whether water has anything dissolved in it, since impurities shift them. Water also has high surface tension, caused by cohesive force (attraction between water molecules and other water molecules) pulling strongly enough at the surface that light insects like the daddy longlegs can rest on top without sinking. That same cohesive force, working together with adhesive force (attraction between water molecules and a different surface — the walls of a plant's xylem), drags water up from roots to leaves. This combined effect is called capillary action.",
      cards: [
        {
          title: "What water is made of",
          body: "Water is a compound — two hydrogen atoms bonded to one oxygen atom, H₂O. Electrolysis splits it apart: oxygen gas collects at the anode, hydrogen gas at the cathode, with hydrogen collected at exactly double the volume of oxygen (ratio H:O = 2:1).",
          detail: "Glowing splinter relights in oxygen; burning splinter gives a 'pop' in hydrogen.",
        },
        {
          title: "Melting & Freezing",
          body: "Melting turns solid ice to liquid water by absorbing heat. Freezing turns liquid water to solid ice by releasing heat.",
        },
        {
          title: "Evaporation/Boiling & Condensation",
          body: "Evaporation/boiling turns liquid water to water vapour by absorbing heat. Condensation turns water vapour back to liquid by releasing heat.",
        },
        {
          title: "Why salty soup boils slower",
          body: "Dissolved impurities shift water's melting and boiling points — salt lowers the melting point of ice but raises the boiling point of water. That's why a pot of plain water boils faster than one with salt or soup stock dissolved in it.",
        },
      ],
      flipCards: [
        { id: "humidity", icon: "💨", label: "Humidity", fact: "Drier air (lower humidity) can hold more escaping water molecules, so evaporation speeds up." },
        { id: "temperature", icon: "🌡️", label: "Temperature", fact: "Higher temperature gives surface water molecules more energy to escape into the air." },
        { id: "surface-area", icon: "📐", label: "Surface area", fact: "A larger exposed surface lets more water molecules escape at once." },
        { id: "air-movement", icon: "🌬️", label: "Air movement", fact: "Moving air sweeps away water vapour from the surface, letting more evaporation happen." },
      ],
      checks: [
        { question: "How could Ikram check whether a bottle of water is pure?", hint: "Test its boiling point and freezing point — pure water boils at exactly 100°C and freezes at exactly 0°C. Any shift suggests dissolved impurities." },
        { question: "Why do we feel cold right after sweating?", hint: "Sweat evaporating off your skin absorbs heat from your body to do so — that heat loss is what feels cold." },
      ],
    },
    {
      number: "5.2",
      title: "Solution and Rate of Solubility",
      intro:
        "When sugar dissolves in water, the sugar is the solute (the substance dissolving), water is the solvent (the liquid doing the dissolving), and sugar water is the solution they form together. Add more and more solute, and the solution moves through three stages — dilute, then concentrated, then saturated, where it can no longer dissolve any more and excess solute forms a precipitate.",
      cards: [
        { title: "Dilute", body: "Little solute dissolved so far — the solution can still dissolve much more.", detail: "Least concentrated" },
        { title: "Concentrated", body: "A large amount of solute dissolved — the solution can still dissolve a little more.", detail: "More concentrated" },
        { title: "Saturated", body: "Excess solute added — no more dissolves, and the extra forms a precipitate at the bottom.", detail: "Cannot dissolve more" },
        {
          title: "Water — the universal solvent",
          body: "Water is called the universal solvent because it dissolves such a huge range of solids, liquids and gases — used everywhere from fertiliser uptake in plant roots to soft drink production. For substances water can't dissolve, organic (carbon-based) solvents like alcohol (perfume, antiseptic), kerosene (lamp oil), acetone (nail varnish remover) and turpentine (paint thinner) are used instead.",
        },
      ],
      tabs: [
        { title: "Solution", body: "Solute particles are tiny enough to disperse evenly — the mixture looks clear and transparent, light passes through, and nothing is left behind when filtered. E.g. copper sulphate dissolved in water." },
        { title: "Suspension", body: "Solute particles are too large to dissolve — the mixture looks cloudy, blocks light, settles over time, and leaves a residue when filtered. E.g. chalk powder in water, or muddy river water." },
        { title: "Colloid", body: "Particles are in between — evenly dispersed but neither fully clear nor settling out. E.g. milk and mayonnaise (emulsions), shaving foam (foam)." },
      ],
      flipCards: [
        { id: "sol-temp", icon: "🌡️", label: "Temperature", fact: "Hotter solvent particles move faster, so solute dissolves faster." },
        { id: "sol-stir", icon: "🥄", label: "Rate of stirring", fact: "Faster stirring brings solute and solvent particles together quicker." },
        { id: "sol-size", icon: "🔬", label: "Size of solute", fact: "Smaller particles expose more surface area, so they dissolve faster." },
      ],
      checks: [
        { question: "Why is hot water better for dissolving coffee than cold water?", hint: "Higher temperature gives particles more energy to move and mix faster — increasing the rate of solubility." },
        { question: "Milk looks uniform but isn't a true solution. What is it?", hint: "A colloid — an emulsion, specifically. It doesn't separate like a suspension, but it's not a clear solution either." },
      ],
    },
    {
      number: "5.3",
      title: "Water Purification and Water Supply",
      intro:
        "Water covers two-thirds of Earth's surface, but most of it carries impurities, microorganisms and dissolved substances that make it unsafe straight from the source. Water purification removes odour, taste, colour, microorganisms and dissolved substances so it can be used safely.",
      accordions: [
        { title: "🧻 Filtration", body: "Separates suspended particles like leaves and sediment from the water." },
        { title: "🔥 Boiling", body: "Kills microorganisms through heat." },
        { title: "🧪 Chlorination", body: "Chlorine is added to kill microorganisms in the water supply." },
        { title: "♨️ Distillation", body: "Separates suspended particles AND dissolved substances, while also killing microorganisms — the most thorough method, producing the purest water." },
      ],
      sequence: {
        title: "🚰 Follow water from river to tap",
        instruction: "Step through the water supply system to see what happens at each stage.",
        steps: [
          { title: "Reservoir", body: "Raw water is collected from rivers or rainfall at a reservoir before treatment." },
          { title: "Filtration (coarse)", body: "Large debris like tree branches and leaves are screened out first." },
          { title: "Oxidation", body: "Oxygen content in the water is increased to get rid of unpleasant smell and taste." },
          { title: "Coagulation", body: "Alum makes mud particles clump together; slaked lime (calcium hydroxide) reduces the acidity of the water." },
          { title: "Sedimentation", body: "The clumped particles settle to the bottom of the tank." },
          { title: "Filtration (fine)", body: "A finer sand filter removes the remaining suspended particles." },
          { title: "Chlorination & Fluoridation", body: "Chlorine kills microorganisms; sodium fluoride is added to help prevent tooth decay." },
          { title: "To homes", body: "Clean water is pumped through a storage tank out to consumers." },
        ],
      },
      matcher: {
        title: "🌊 Match the pollutant to the fix",
        instruction: "Pick a water pollutant, then pick how it's tackled.",
        pairs: [
          { id: "domestic", label: "🏠 Domestic waste", match: "Upgrade sewerage systems and improve rural sanitation" },
          { id: "industrial", label: "🏭 Industrial waste", match: "Enforce laws requiring treatment before discharge into rivers" },
          { id: "agricultural", label: "🌾 Agricultural chemicals", match: "Educate farmers to use biodegradable fertilisers and pesticides" },
          { id: "oil", label: "🛢️ Oil spillage", match: "Contain spills with a national contingency plan and improve air surveillance" },
        ],
      },
      checks: [
        { question: "Which purification method both removes dissolved substances AND kills microorganisms?", hint: "Distillation — it's the only method that does both at once." },
      ],
    },
  ],
  reflectionItems: [
    "I can explain the physical characteristics of water and its evaporation process.",
    "I can explain solution, solubility and colloids with examples.",
    "I can demonstrate water purification methods and the water supply system.",
    "I can justify why water sustainability matters for healthy living.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Milk is a true solution because it looks uniform.",
      answer: false,
      explanation: "Milk is a colloid (an emulsion) — it's uniform but the particles are neither fully dissolved nor settling out like a suspension.",
    },
    {
      type: "multiple-choice",
      question: "Which water purification method removes dissolved substances as well as suspended particles?",
      options: ["Boiling", "Filtration", "Distillation", "Chlorination"],
      answerIndex: 2,
      explanation: "Distillation evaporates and re-condenses water, leaving both dissolved substances and suspended particles behind.",
    },
  ],
};
