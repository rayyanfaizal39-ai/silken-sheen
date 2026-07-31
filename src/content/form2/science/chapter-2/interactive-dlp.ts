import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch2-ekosistem.png";
import tropicalImage from "@/assets/notes/form2-science/chapter-2/tropical.png";
import desertImage from "@/assets/notes/form2-science/chapter-2/desert.jpg";
import polarImage from "@/assets/notes/form2-science/chapter-2/tundra.jpg";
import soilImage from "@/assets/notes/form2-science/chapter-2/soil.jpg";

export const scienceF2C2InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "Science Blog — Taman Tasik Perdana's Monkey Control",
    body: "When long-tailed macaques became too numerous, wildlife officers used humane population management. It is a real example of humans intervening carefully to restore ecosystem balance.",
    imagePath: chapterImage,
  },
  keywords: ["Ecosystem", "Producer", "Consumer", "Decomposer", "Food chain", "Food web", "Nutrient cycle", "Symbiosis", "Biological control"],
  sections: [
    {
      number: "2.1",
      title: "Energy Flow in an Ecosystem",
      intro: "Energy enters most ecosystems as sunlight. Producers trap it by photosynthesis, consumers obtain it by feeding, and decomposers return nutrients to the environment.",
      cards: [
        { title: "Producer", body: "Green plants make food through photosynthesis and form the first trophic level.", detail: "Sun → plant" },
        { title: "Consumer", body: "Primary consumers eat producers; secondary and tertiary consumers feed at higher trophic levels.", detail: "Energy moves one way" },
        { title: "Decomposer", body: "Bacteria and fungi break down dead organisms and waste, releasing mineral nutrients.", detail: "Nutrients are recycled" },
      ],
      sequence: {
        title: "Build the food chain",
        instruction: "Follow energy from the producer to the top consumer.",
        steps: [
          { title: "Cabbage", body: "The producer captures light energy by photosynthesis." },
          { title: "Snail", body: "The primary consumer eats the cabbage." },
          { title: "Bird", body: "The secondary consumer eats the snail." },
          { title: "Fox", body: "The tertiary consumer receives the smallest share of the original energy." },
        ],
      },
      checks: [
        { question: "Why do food chains begin with a producer?", hint: "Only producers convert light energy into chemical energy stored in food." },
        { question: "How is a food web different from a food chain?", hint: "A food web combines several interconnected food chains." },
      ],
    },
    {
      number: "2.2",
      title: "Nutrient Cycle in an Ecosystem",
      intro: "Unlike energy, water, carbon and oxygen are continually recycled between organisms and the physical environment.",
      tabs: [
        { title: "Water cycle", body: "Evaporation and transpiration release water vapour; condensation forms clouds; precipitation returns water to Earth, where it infiltrates soil or flows as runoff." },
        { title: "Carbon cycle", body: "Photosynthesis removes carbon dioxide. Feeding transfers carbon, while respiration, decomposition and combustion return carbon dioxide to the atmosphere." },
        { title: "Oxygen cycle", body: "Photosynthesis releases oxygen. Respiration, decomposition and combustion use oxygen and release carbon dioxide." },
      ],
      accordions: [
        { title: "Deforestation", body: "Fewer trees means less photosynthesis, less carbon dioxide removed and less water returned through transpiration." },
        { title: "Burning fossil fuels", body: "Combustion consumes oxygen and releases additional carbon dioxide, intensifying the greenhouse effect." },
        { title: "Overuse of fertiliser", body: "Nutrients washed into water can trigger algal blooms and reduce dissolved oxygen." },
      ],
      checks: [
        { question: "Name two processes that return carbon dioxide to the atmosphere.", hint: "Respiration, decomposition and combustion all do this." },
        { question: "Why are decomposers essential to nutrient cycles?", hint: "They release mineral nutrients from dead matter so producers can reuse them." },
      ],
    },
    {
      number: "2.3",
      title: "Interdependence and Interaction",
      intro: "Species form populations, populations form communities, and communities together with non-living components (water, air, soil) form an ecosystem. Within an ecosystem, organisms depend on and interact with each other in different ways — both sides benefit (mutualism), only one benefits without affecting the other (commensalism), one benefits while harming the other (parasitism), one feeds on the other (predator-prey), or both compete for limited basic needs such as food, water, light and space (competition).",
      cards: [
        { title: "Mutualism", body: "Both organisms benefit. Example: clownfish get protection from a sea anemone; the anemone gets food scraps and nutrients from the clownfish." },
        { title: "Commensalism", body: "One organism (the commensal) benefits; the other is unaffected. Example: a remora fish attaches to a shark and eats its food scraps without harming it." },
        { title: "Parasitism", body: "One organism (the parasite) benefits; the host is harmed. Example: a tapeworm lives in a human intestine and absorbs nutrients from its host." },
        { title: "Predator-prey", body: "One organism (the predator) hunts and eats another (the prey). Example: an owl hunts and eats rats." },
        { title: "Competition", body: "Organisms in the same habitat compete for a limited supply of basic needs such as light, water, space, food or mates." },
        { title: "Biological control", body: "Natural predators, parasites or pathogens reduce pests: owls control rats, guppies eat mosquito larvae and ladybirds eat aphids." },
        { title: "Population factors", body: "Disease, predators, food supply and weather can increase or decrease a population." },
      ],
      flipCards: [
        { id: "tropical", icon: "", label: "Tropical", fact: "High rainfall and sunlight throughout the year support dense, diverse life.", imagePath: tropicalImage },
        { id: "desert", icon: "", label: "Desert", fact: "Organisms conserve water and tolerate extreme daytime heat.", imagePath: desertImage },
        { id: "tundra", icon: "", label: "Tundra", fact: "Insulation, migration and seasonal activity help organisms survive long winters.", imagePath: polarImage },
        { id: "soil", icon: "", label: "Soil habitat", fact: "Moisture, temperature and light determine where small organisms gather.", imagePath: soilImage },
      ],
      matcher: {
        title: "Match the interaction",
        instruction: "Choose an interaction on the left, then its correct example.",
        pairs: [
          { id: "mutualism", label: "Mutualism", match: "Clownfish and sea anemone — both benefit" },
          { id: "commensalism", label: "Commensalism", match: "Remora benefits; shark is unaffected" },
          { id: "parasitism", label: "Parasitism", match: "Tapeworm benefits; human host is harmed" },
          { id: "predation", label: "Predator–prey", match: "Owl hunts and eats rats" },
          { id: "competition", label: "Competition", match: "Plants compete for light, water and space" },
        ],
      },
      checks: [
        { question: "Distinguish mutualism from commensalism.", hint: "In mutualism both benefit; in commensalism one benefits and the other is unaffected." },
        { question: "Why can biological control be safer than pesticides?", hint: "It avoids chemical pollution, but introduced species still need careful management." },
      ],
    },
    {
      number: "2.4",
      title: "Role of Humans in Maintaining a Balanced Nature",
      intro: "The ecosystems you studied in 2.1–2.3 can be disrupted by human activity itself. Logging causes habitat loss and soil erosion; industry pollutes air, water and soil and causes acid rain; intensive agriculture pollutes water sources with pesticides and excess fertiliser; poor waste disposal causes pollution and flash floods. Humans are therefore responsible for conserving and maintaining a balanced nature so ecosystems stay stable and productive for all living things.",
      comparison: {
        title: "What our activities cost nature",
        columns: [
          { title: "Human pressure", body: "Logging causes habitat loss and erosion; industry creates pollution and acid rain; intensive agriculture pollutes water; poor waste disposal causes pollution and flash floods." },
          { title: "Restoring balance", body: "Enforce environmental law, build public awareness, practise 5R and use biological control responsibly." },
        ],
      },
      cards: [
        { title: "Refuse", body: "Reject unnecessary or non-recyclable materials." },
        { title: "Reduce", body: "Use fewer resources and create less waste." },
        { title: "Reuse", body: "Use an item again instead of discarding it." },
        { title: "Recycle", body: "Process waste into new materials." },
        { title: "Repurpose", body: "Give an old material a useful new function." },
      ],
      checks: [
        { question: "How does logging disturb ecosystem balance?", hint: "Consider habitat loss, species extinction, soil erosion and increased carbon dioxide." },
        { question: "List the complete 5R sequence.", hint: "Refuse, Reduce, Reuse, Recycle, Repurpose." },
      ],
    },
  ],
  reflectionItems: [
    "I can explain energy flow through producers, consumers and decomposers.",
    "I can describe water, carbon and oxygen cycles.",
    "I can compare the main interactions between organisms.",
    "I can justify actions that maintain a balanced ecosystem.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: Energy is recycled endlessly in an ecosystem.", answer: false, explanation: "Energy flows one way and much is lost as heat; nutrients are recycled." },
    { type: "multiple-choice", question: "Why did rat numbers rise after eagles were removed?", options: ["Rats lost a food source", "Predation pressure decreased", "More decomposers appeared", "Rainfall stopped"], answerIndex: 1, explanation: "Removing a predator allows more prey to survive and reproduce." },
  ],
};
