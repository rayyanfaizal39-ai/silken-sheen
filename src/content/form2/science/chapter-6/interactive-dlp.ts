import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch6-asid-alkali.png";

export const scienceF2C6InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "Science Blog — The pH of Your Skin",
    body: "Your skin has a thin protective layer called the acid mantle — a mix of sebum and sweat that keeps skin naturally acidic, which helps fend off invading pathogens.",
    imagePath: chapterImage,
  },
  keywords: [
    "Acid",
    "Alkali",
    "pH value",
    "Corrosiveness",
    "Universal indicator",
    "Phenolphthalein",
    "pH scale",
    "Neutralisation",
    "Salt",
    "Titration",
  ],
  sections: [
    {
      number: "6.1",
      title: "Properties of Acids and Alkalis",
      intro:
        "\"Acid\" comes from the Latin acidus, meaning sour. \"Alkali\" comes from the Arabic al-qali, meaning ashes of plants. Both only show their properties in the presence of water — glacial ethanoic acid on its own doesn't change the colour of blue litmus paper, but as soon as water is added, it turns blue litmus red. Likewise, solid sodium hydroxide alone doesn't affect red litmus paper, but with water it turns red litmus blue. Substances containing acid are called acidic substances (e.g. apples, coffee); substances containing alkali are called alkaline substances (e.g. baking soda).",
      cards: [
        {
          title: "Acid",
          body: "pH value less than 7, tastes sour, turns blue litmus paper red, and reacts with metals to produce hydrogen gas.",
          detail: "Corrosive in concentrated form",
        },
        {
          title: "Alkali",
          body: "pH value more than 7, tastes bitter, turns red litmus paper blue, and does not react with metals.",
          detail: "Also corrosive — never taste directly",
        },
        {
          title: "Everyday acids and alkalis",
          body: "Acids: vinegar, fizzy drinks (carbonic acid), car battery acid (sulphuric acid). Alkalis: soap (potassium hydroxide), fertiliser (ammonia), antacid pills (magnesium hydroxide), detergent (sodium hydroxide).",
        },
      ],
      phSlider: {
        title: "🌈 The pH scale — drag to explore",
        instruction: "Every substance sits somewhere on a 0–14 scale. Drag the marker to see what lives at each pH.",
        scale: [
          { value: 0, name: "Battery acid", description: "Extremely strong acid — highly corrosive." },
          { value: 1, name: "Stomach acid", description: "Very strong acid, powerful enough to digest food." },
          { value: 2, name: "Vinegar / lemon juice", description: "Strong acid — the sour taste you recognise." },
          { value: 3, name: "Orange juice", description: "Mild acid." },
          { value: 4, name: "Pineapple juice / tomato", description: "Mild acid." },
          { value: 5, name: "Black coffee", description: "Weak acid." },
          { value: 6, name: "Milk", description: "Very weakly acidic." },
          { value: 7, name: "Pure water", description: "Perfectly neutral." },
          { value: 8, name: "Sea water", description: "Very weakly alkaline." },
          { value: 9, name: "Baking soda", description: "Mild alkali." },
          { value: 10, name: "Antacid / milk of magnesia", description: "Mild alkali." },
          { value: 11, name: "Ammonia solution", description: "Strong alkali." },
          { value: 12, name: "Soapy water", description: "Strong alkali." },
          { value: 13, name: "Bleach", description: "Very strong alkali." },
          { value: 14, name: "Drain cleaner", description: "Extremely strong alkali — highly corrosive." },
        ],
      },
      accordions: [
        { title: "🌸 Phenolphthalein", body: "Colourless in acid, colourless when neutral, turns pink in alkali." },
        { title: "🌈 Universal indicator", body: "Red in acid, green when neutral, blue in alkali — and every shade in between shows the actual pH value." },
        { title: "🟠 Methyl orange", body: "Red in acid, yellow when neutral, yellow in alkali." },
        { title: "📄 Litmus paper", body: "Blue litmus turns red in acid; red litmus turns blue in alkali — simple but doesn't show strength." },
      ],
      checks: [
        { question: "Why do acid and alkali bottles carry a corrosive warning symbol?", hint: "Because both acids AND alkalis — not just acids — can be corrosive and damage skin or materials." },
        { question: "A liquid turns universal indicator green. Is it acidic, neutral, or alkaline?", hint: "Neutral — green sits exactly at pH 7 on the universal indicator scale." },
      ],
    },
    {
      number: "6.2",
      title: "Neutralisation",
      intro:
        "Mix an acid with an alkali and they cancel each other out — the acid loses its acidity, the alkali loses its alkalinity, and the reaction produces salt and water: Acid + Alkali → Salt + Water. This is neutralisation, and the precise lab technique used to carry it out is called titration — using a burette, a pipette and phenolphthalein as the indicator, where the solution turning from pink to colourless signals that neutralisation is complete.",
      cards: [
        { title: "Hydrochloric acid + Sodium hydroxide", body: "Produces sodium chloride and water." },
        { title: "Sulphuric acid + Potassium hydroxide", body: "Produces potassium sulphate and water." },
        { title: "Nitric acid + Sodium hydroxide", body: "Produces sodium nitrate and water." },
      ],
      accordions: [
        { title: "🦷 Toothpaste", body: "Mouth bacteria produce acid that erodes teeth — alkaline toothpaste neutralises it, helping prevent dental caries." },
        { title: "💇 Shampoo + conditioner", body: "Alkaline shampoo leaves hair slightly alkaline; a mildly acidic conditioner neutralises the residue, keeping hair smooth." },
        { title: "🧴 Face care", body: "Alkaline cleansers can dry out skin — an acidic toner neutralises it afterward." },
        { title: "🌾 Soil treatment", body: "Acidic soil is treated with alkaline slaked lime so crops can grow well." },
        { title: "🏭 Industrial waste", body: "Acidic factory waste is treated with alkalis before being released into rivers." },
      ],
      checks: [
        { question: "Amran got stung by a jellyfish. His pain worsened when soap (alkaline) was applied. Why?", hint: "If the sting's chemistry isn't a straightforward acid, adding an alkali doesn't automatically help — an incomplete or mismatched neutralisation can irritate the wound further. Proper treatment depends on knowing the sting's actual chemistry." },
      ],
    },
  ],
  reflectionItems: [
    "I can define acid and alkali operationally.",
    "I can determine acid/alkali strength using the pH value.",
    "I can explain the neutralisation reaction and its daily-life applications.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: The lower the pH value, the stronger the acid.",
      answer: true,
      explanation: "Correct — pH 0 is the strongest acid possible, while pH 14 is the strongest alkali.",
    },
    {
      type: "multiple-choice",
      question: "What are the two products of a neutralisation reaction?",
      options: ["Acid and alkali", "Salt and water", "Oxygen and hydrogen", "Carbon dioxide and water"],
      answerIndex: 1,
      explanation: "Acid + Alkali → Salt + Water, every time — only the specific salt formed changes.",
    },
  ],
};
