import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";

export const scienceF2C3InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 3,
  blogHighlight: { title: "Science Blog — Feeding an Astronaut", body: "Space food must be nutritious, light, compact and safe for months without refrigeration. Freeze-drying removes water while preserving much of the food's nutrient value.", imagePath: chapterImage },
  keywords: ["Carbohydrate", "Protein", "Fat", "Vitamin", "Mineral", "Fibre", "Balanced diet", "Digestion", "Enzyme", "Villus"],
  sections: [
    {
      number: "3.1", title: "Classes of Food", intro: "A healthy body needs seven classes of food in suitable proportions.",
      cards: [
        { title: "Carbohydrate", body: "Main source of energy. Sources include rice, bread and potatoes." },
        { title: "Protein", body: "Growth and repair of body tissues. Sources include fish, eggs and legumes." },
        { title: "Fat", body: "Concentrated energy store, insulation and organ protection." },
        { title: "Vitamins", body: "Organic micronutrients needed in small amounts for normal health." },
        { title: "Minerals", body: "Inorganic nutrients such as calcium and iron." },
        { title: "Fibre", body: "Stimulates peristalsis and helps prevent constipation." },
        { title: "Water", body: "Solvent, transport medium and temperature regulator." },
      ],
      comparison: { title: "Vitamins and minerals — small amounts, big consequences", columns: [
        { title: "Deficiency examples", body: "Vitamin C deficiency causes scurvy; vitamin D deficiency causes rickets; iron deficiency causes anaemia." },
        { title: "Key roles", body: "Calcium strengthens bones and teeth; iron forms haemoglobin; iodine supports thyroid hormone production." },
      ]},
      accordions: [
        { title: "🧪 How do food tests work?", body: "Laboratory tests are used to detect the presence of a particular food class in a sample. Each test uses a specific reagent that reacts only with a certain nutrient and produces an observable colour change or precipitate — this is the 'positive result' that shows the nutrient is present in the sample." },
        { title: "Starch and sugar tests", body: "Starch: add iodine solution directly to the sample at room temperature — the colour turns blue-black if positive. Reducing sugar: add Benedict's solution, then HEAT in a water bath — the colour changes from blue to green/yellow/brick-red precipitate if positive." },
        { title: "Protein and fat tests", body: "Protein: add Millon's reagent, then heat in a water bath — a brick-red precipitate/colour shows a positive result. Fat: mix the sample with ethanol, then pour into water — a cloudy, milky-white emulsion forms if positive." },
        { title: "⚠️ Safety precaution", body: "Ethanol is flammable, so heating for Benedict's and Millon's tests is done in a water bath, not over a direct flame." },
      ],
      matcher: { title: "Match the food test", instruction: "Match each nutrient with its reagent and positive result.", pairs: [
        { id: "starch", label: "Starch", match: "Iodine solution → blue-black" },
        { id: "sugar", label: "Reducing sugar", match: "Benedict's solution + heat → brick-red precipitate" },
        { id: "protein", label: "Protein", match: "Millon's reagent + heat → brick-red" },
        { id: "fat", label: "Fat", match: "Ethanol emulsion test → milky white" },
      ]},
      checks: [{ question: "Why is fibre important although it is not digested?", hint: "It adds bulk and stimulates peristalsis." }, { question: "Which food class provides the most energy per gram?", hint: "Fat provides 37 kJ (9 kcal) per gram." }],
    },
    {
      number: "3.2", title: "Importance of a Balanced Diet", intro: "A balanced diet supplies all seven food classes in the correct proportions for a person's needs.",
      sequence: { title: "The Malaysian Food Pyramid", instruction: "Move upward from foods eaten most often to foods limited to small amounts.", steps: [
        { title: "Base", body: "Whole grains and other carbohydrate foods — the main energy source." },
        { title: "Level 2", body: "Fruit and vegetables — vitamins, minerals and fibre." },
        { title: "Level 3", body: "Fish, poultry, meat, eggs, legumes and dairy — protein and minerals." },
        { title: "Top", body: "Fat, oil, sugar and salt — consume only in small amounts." },
      ]},
      cards: [
        { title: "Age", body: "Children and teenagers need nutrients for growth; needs change with age." },
        { title: "Sex", body: "Average energy and some mineral needs differ with body composition and physiology." },
        { title: "Body size", body: "A larger body generally uses more energy." },
        { title: "Activity", body: "More physical work needs more energy." },
        { title: "Climate", body: "Cold conditions can increase energy needed to maintain body temperature." },
        { title: "Health", body: "Illness, pregnancy and recovery alter nutritional requirements." },
      ],
      comparison: { title: "Energy value per gram", columns: [
        { title: "Fat", body: "37 kJ/g (9 kcal/g) — more than twice the energy density of protein or carbohydrate." },
        { title: "Protein & carbohydrate", body: "Each provides about 17 kJ/g (4 kcal/g)." },
      ]},
      checks: [{ question: "What makes a diet balanced?", hint: "All food classes in proportions matched to individual needs." }, { question: "Why does an athlete need more energy than a sedentary person?", hint: "Muscle activity increases respiration and energy use." }],
    },
    {
      number: "3.3", title: "Human Digestive System", intro: "Digestion breaks large, insoluble food molecules into small, soluble molecules that can be absorbed.",
      sequence: { title: "Follow the journey of food", instruction: "Travel through the alimentary canal in order.", steps: [
        { title: "Mouth", body: "Teeth mechanically break food; saliva begins starch digestion." },
        { title: "Oesophagus", body: "Peristalsis pushes the bolus toward the stomach." },
        { title: "Stomach", body: "Muscular churning and protease begin protein digestion in acidic conditions." },
        { title: "Small intestine", body: "Bile emulsifies fat; enzymes complete digestion; nutrients are absorbed." },
        { title: "Large intestine", body: "Water and mineral salts are absorbed." },
        { title: "Rectum & anus", body: "Faeces are stored, then removed by defecation." },
      ]},
      tabs: [
        { title: "Amylase", body: "Breaks starch into maltose in the mouth and small intestine." },
        { title: "Protease", body: "Breaks protein into amino acids in the stomach and small intestine." },
        { title: "Lipase", body: "Breaks fat into fatty acids and glycerol in the small intestine." },
      ],
      checks: [{ question: "What is peristalsis?", hint: "Rhythmic contraction and relaxation of alimentary canal muscles." }, { question: "State the role of bile.", hint: "It neutralises acid and emulsifies fat into tiny droplets." }],
    },
    {
      number: "3.4", title: "Absorption, Transport and Defecation", intro: "The small intestine is adapted to absorb digested nutrients efficiently.",
      cards: [
        { title: "Many villi", body: "Greatly increase the surface area for absorption." },
        { title: "One-cell-thick wall", body: "Creates a short diffusion distance." },
        { title: "Blood capillaries", body: "Carry glucose and amino acids away rapidly." },
        { title: "Lacteal", body: "Absorbs fatty acids and glycerol into the lymphatic system." },
      ],
      comparison: { title: "Where nutrients go", columns: [
        { title: "Blood", body: "Glucose and amino acids enter capillaries and travel first to the liver." },
        { title: "Lymph", body: "Fatty acids and glycerol enter lacteals before joining the bloodstream." },
      ]},
      checks: [{ question: "How do villi increase absorption rate?", hint: "Large surface area, thin walls and rich transport networks." }, { question: "What is defecation?", hint: "Removal of faeces through the anus; it is not the same as excretion." }],
    },
  ],
  reflectionItems: ["I can state the functions and sources of seven food classes.", "I can plan a balanced diet for different needs.", "I can trace food through the digestive system.", "I can explain how villi absorb and transport nutrients."],
  miniQuiz: [
    { type: "true-false", question: "True or false: Bile contains an enzyme that digests fat.", answer: false, explanation: "Bile is not an enzyme; it emulsifies fat and neutralises acidic chyme." },
    { type: "multiple-choice", question: "Which structure absorbs fatty acids and glycerol?", options: ["Blood platelet", "Lacteal", "Oesophagus", "Rectum"], answerIndex: 1, explanation: "The lacteal inside each villus absorbs products of fat digestion." },
  ],
};
