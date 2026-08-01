import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C4InteractiveDLP: ScienceF3InteractiveContent = {
  chapter: 4,
  blogHighlight: {
    title: "Science Gallery — The First Metal Ever Used",
    body: "Records show gold was the first metal used by humans, discovered in its pure element form in a Spanish cave dating back to 40,000 BC — because gold sits at the bottom of the reactivity series and barely reacts with anything, it survives basically untouched for millennia.",
  },
  keywords: ["Mineral", "Reactivity series of metals", "Extraction of metal", "Blast furnace", "Slag"],
  sections: [
    {
      number: "4.1",
      title: "Variety of Minerals",
      intro: "Minerals are naturally occurring solid elements or compounds with a definite crystalline structure. They come in two forms.",
      cards: [
        { title: "Science Info", body: "Mineralogy — the study of minerals — is a constantly active field, since the number and properties of known minerals keeps growing." },
      ],
      comparison: {
        title: "What's actually in a rock",
        columns: [
          { title: "Elements", body: "Gold and silver — found pure in nature." },
          { title: "Compounds", body: "Bauxite (aluminium oxide), hematite (iron(III) oxide), galena (lead(II) sulphide) and cassiterite (tin(IV) oxide)." },
        ],
      },
      checks: [
        { question: "Is limestone (calcium carbonate) an element or a compound? How would you prove it?", hint: "A compound — heating it or reacting it with acid releases carbon dioxide gas (confirmed by limewater turning cloudy), proving it's made of calcium, carbon and oxygen combined." },
      ],
    },
    {
      number: "4.2",
      title: "Reactivity Series of Metals",
      intro:
        "Metals are arranged in a reactivity series based on how vigorously they react with oxygen — magnesium bursts into bright flame, while iron just glows dully. Carbon and hydrogen (non-metals) are also placed within this series, since their reactivity can be compared the same way. Tap any element in the ladder below to see its reaction.",
      ladder: {
        title: "Ranked by how badly they want to react",
        instruction: "Tap any element to reveal its reaction with oxygen.",
        items: [
          { symbol: "K", name: "Potassium", fact: "Reacts explosively and instantly with oxygen — never found pure in nature." },
          { symbol: "Na", name: "Sodium", fact: "Reacts vigorously with oxygen, bursting into flame." },
          { symbol: "Ca", name: "Calcium", fact: "Reacts fairly vigorously with oxygen." },
          { symbol: "Mg", name: "Magnesium", fact: "Burns with a bright white flame in oxygen." },
          { symbol: "Al", name: "Aluminium", fact: "Reacts with oxygen to form a protective oxide layer, slowing further reaction." },
          { symbol: "C", name: "Carbon", highlight: true, fact: "A non-metal placed here as reference — used to extract metals below it." },
          { symbol: "Zn", name: "Zinc", fact: "Glows and reacts moderately with oxygen when heated." },
          { symbol: "H", name: "Hydrogen", highlight: true, fact: "A non-metal — can reduce metal oxides below it, like iron(III) oxide, to the metal." },
          { symbol: "Fe", name: "Iron", fact: "Glows slowly with oxygen — this is what causes rusting over time." },
          { symbol: "Sn", name: "Tin", fact: "Reacts slowly and mildly with oxygen." },
          { symbol: "Pb", name: "Lead", fact: "Reacts very slowly with oxygen." },
          { symbol: "Cu", name: "Copper", fact: "Barely reacts with oxygen — just tarnishes slowly." },
          { symbol: "Hg", name: "Mercury", fact: "Extremely unreactive — one of very few metals that's liquid at room temperature." },
          { symbol: "Ag", name: "Silver", fact: "Very unreactive — stays shiny far longer than most metals." },
          { symbol: "Au", name: "Gold", fact: "The least reactive metal — barely reacts with oxygen at all, staying pure for millennia." },
        ],
      },
      checks: [
        { question: "Carbon reduces zinc oxide and aluminium oxide but not lead(II) oxide. What does this tell you about carbon's position?", hint: "Wait — if carbon reduces zinc oxide, that means carbon is more reactive than zinc. But carbon can't reduce aluminium oxide, meaning aluminium is more reactive than carbon. So carbon sits between aluminium and zinc in the series." },
      ],
    },
    {
      number: "4.3",
      title: "Extraction of Metals from their Ores",
      intro:
        "Position in the series decides the extraction method. Mining metals from their ores also costs the land — air pollution from fuel burning, water pollution from ore cleaning, soil erosion from ore mining, sound pollution from machinery, habitat destruction from mine construction, and heavy electrical energy use are all real impacts.",
      toggles: [
        {
          title: "Which extraction method?",
          instruction: "Position in the reactivity series decides how a metal is extracted. Tap to compare.",
          options: [
            { id: "electrolysis", label: "Above Carbon", body: "Metals like potassium, sodium, calcium, magnesium and aluminium are too reactive for carbon to displace — they're extracted through electrolysis of their molten compounds." },
            { id: "carbon", label: "Below Carbon", body: "Metals like zinc, iron, tin and lead are less reactive than carbon — carbon can displace them from their oxides through reduction in a furnace." },
            { id: "heat", label: "Very Unreactive", body: "Metals like mercury and silver are so unreactive they barely form compounds at all — often extracted through simple direct heating. Gold exists as pure element in the crust, needing no extraction chemistry at all." },
          ],
        },
      ],
      sequence: {
        title: "Step through iron extraction in a blast furnace",
        instruction: "Follow how iron ore becomes molten iron.",
        steps: [
          { title: "📥 Charge added", body: "A mixture of concentrated iron ore, coke and limestone is added into the furnace from the top." },
          { title: "💨 Hot air blown in", body: "A very hot blast of air is pumped in through the bottom of the furnace." },
          { title: "🔥 Coke burns", body: "Coke (carbon) reacts with oxygen in the hot air to produce carbon dioxide and heat." },
          { title: "♻️ Carbon monoxide forms", body: "Carbon dioxide reacts with more hot coke to form carbon monoxide — a strong reducing agent." },
          { title: "⚙️ Iron oxide reduced", body: "Carbon monoxide and carbon both reduce iron oxide into molten iron." },
          { title: "🧱 Slag forms", body: "Limestone decomposes into calcium oxide, which reacts with sand impurities to form slag." },
          { title: "🌊 Molten iron & slag tapped", body: "Molten iron sinks to the bottom and is tapped off into moulds; less-dense molten slag floats above it and is tapped off separately." },
        ],
      },
      checks: [
        { question: "Why does molten slag float on top of molten iron in the blast furnace?", hint: "Molten slag is less dense than molten iron, so it naturally rises and separates on top — making it easy to tap off separately." },
      ],
    },
  ],
  reflectionItems: [
    "I can explain minerals found in Earth's crust with examples.",
    "I can construct a reactivity series of metals and determine the position of carbon and hydrogen.",
    "I can communicate how metals are extracted from their ores, and generate ideas to address mining issues.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: Potassium is extracted from its ore using carbon reduction.", answer: false, explanation: "Potassium sits well above carbon in the reactivity series — it must be extracted via electrolysis, not carbon reduction." },
    { type: "multiple-choice", question: "What substance is added to a blast furnace to remove sand impurities as slag?", options: ["Coke", "Limestone", "Iron ore", "Hot air"], answerIndex: 1, explanation: "Limestone decomposes into calcium oxide, which reacts with sand (silicon dioxide) impurities to form slag (calcium silicate)." },
  ],
};
