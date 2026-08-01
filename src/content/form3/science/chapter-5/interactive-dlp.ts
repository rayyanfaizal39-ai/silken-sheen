import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C5InteractiveDLP: ScienceF3InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Science Gallery — Hot Packs vs. Cold Packs",
    body: "Instant hot packs release heat to relieve muscle cramps and boost blood flow, while instant cold packs absorb heat to reduce swelling and slow bleeding — both rely on exactly the same thermochemistry concept, just pointed in opposite directions.",
  },
  keywords: ["Thermochemistry", "Exothermic reaction", "Endothermic reaction"],
  sections: [
    {
      number: "5.1",
      title: "Endothermic and Exothermic Reactions",
      intro:
        "Every chemical reaction converts chemical energy stored in reactants into another form — usually heat. Thermochemistry studies exactly this heat change. It comes down to just one measurement: what a thermometer reads before and during the reaction. The Greek prefix \"exo\" means outside, \"endo\" means inside, and \"thermic\" means heat — exothermic pushes heat OUT to the surroundings, endothermic pulls heat IN from the surroundings.",
      cards: [
        { title: "Designing for one, or the other", body: "Understanding these reactions lets us engineer real solutions: materials to relieve muscle cramp (exothermic hot packs), emergency lamps for power failures, and containers built to hold a fixed temperature." },
      ],
      toggles: [
        {
          title: "Heat released, or heat absorbed?",
          instruction: "Tap to compare the two reaction types.",
          options: [
            { id: "exo", label: "Exothermic", body: "Releases heat INTO the surroundings — the thermometer reading rises. Examples: burning paper, a bomb exploding, respiration, neutralising acid with alkali, rusting iron." },
            { id: "endo", label: "Endothermic", body: "Absorbs heat FROM the surroundings — the thermometer reading drops. Examples: photosynthesis, baking a cake, extracting iron from its ore, dissolving ammonium salt in water." },
          ],
        },
      ],
      matcher: {
        title: "Match the process to its reaction type",
        instruction: "Pick a process, then pick whether it's exothermic or endothermic.",
        pairs: [
          { id: "petrol", label: "Burning of petrol", match: "Exothermic" },
          { id: "photosynthesis", label: "Photosynthesis", match: "Endothermic" },
          { id: "respiration", label: "Respiration", match: "Exothermic" },
          { id: "baking", label: "Making bread (baking)", match: "Endothermic" },
          { id: "neutralisation", label: "Neutralisation", match: "Exothermic" },
          { id: "rusting", label: "Rusting of iron", match: "Exothermic" },
        ],
      },
      checks: [
        { question: "Why does your body temperature rise during vigorous exercise?", hint: "Cellular respiration — which breaks down glucose to release energy — is an exothermic reaction, releasing heat as a byproduct." },
        { question: "Is heating calcium carbonate an exothermic or endothermic reaction?", hint: "Endothermic — heat must be continuously supplied from an external source (a Bunsen burner) for the decomposition reaction to keep happening, meaning the reaction absorbs heat." },
      ],
    },
  ],
  reflectionItems: [
    "I can define endothermic and exothermic reactions.",
    "I can relate heat absorbed or released to reaction type, with real examples.",
    "I can design materials using the concept of exothermic and endothermic reactions.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: Instant cold packs work through an exothermic reaction.", answer: false, explanation: "Cold packs absorb heat from the surroundings — that's an endothermic reaction." },
    { type: "multiple-choice", question: "Photosynthesis in plants is an example of which type of reaction?", options: ["Exothermic", "Endothermic", "Neither", "Both simultaneously"], answerIndex: 1, explanation: "Endothermic — plants absorb light energy to drive the reaction, storing it as chemical energy in glucose." },
  ],
};
