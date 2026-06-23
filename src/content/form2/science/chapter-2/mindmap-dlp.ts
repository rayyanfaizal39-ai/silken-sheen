import type { MindNode } from "@/components/MindMap";

export const scienceF2C2MindMapDLP: MindNode = {
  id: "root",
  label: "Ecosystem",
  children: [
    {
      id: "c1",
      label: "2.1 Energy Flow in an Ecosystem",
      children: [
        {
          id: "c1-1",
          label: "Producers, Consumers, Decomposers",
          children: [
            { id: "c1-1-1", label: "Producer: photosynthesis (plants)" },
            { id: "c1-1-2", label: "Primary consumer: herbivore/omnivore" },
            { id: "c1-1-3", label: "Secondary consumer: omnivore/carnivore" },
            { id: "c1-1-4", label: "Tertiary consumer: secondary carnivore" },
            { id: "c1-1-5", label: "Decomposer: saprophytism (fungi, bacteria)" },
          ],
        },
        {
          id: "c1-2",
          label: "Food Chain & Food Web",
          children: [
            { id: "c1-2-1", label: "Food chain: linear path" },
            { id: "c1-2-2", label: "Food web: interconnection of food chains" },
            { id: "c1-2-3", label: "Energy lost at each trophic level (respiration, faeces)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "2.2 Nutrient Cycle in an Ecosystem",
      children: [
        { id: "c2-1", label: "Water cycle: transpiration, evaporation, condensation, rain" },
        { id: "c2-2", label: "Carbon & oxygen cycle: photosynthesis, respiration, decomposition" },
        { id: "c2-3", label: "Energy pyramid concept: energy decreases upward" },
        { id: "c2-4", label: "Interference: logging, fossil fuels, overconsumption of water" },
      ],
    },
    {
      id: "c3",
      label: "2.3 Interdependence & Interaction",
      children: [
        {
          id: "c3-1",
          label: "Species → Population → Community → Ecosystem",
        },
        {
          id: "c3-2",
          label: "Symbiosis",
          children: [
            { id: "c3-2-1", label: "Mutualism: both benefit (sea anemone & clown fish)" },
            { id: "c3-2-2", label: "Commensalism: one benefits (remora & shark)" },
            { id: "c3-2-3", label: "Parasitism: parasite benefits, host harmed (tapeworm)" },
          ],
        },
        { id: "c3-3", label: "Prey-predator" },
        { id: "c3-4", label: "Competition: light, space, water, food, mates" },
        {
          id: "c3-5",
          label: "Biological Control",
          children: [
            { id: "c3-5-1", label: "Owls (rats), guppies (mosquito larvae)" },
            { id: "c3-5-2", label: "Advantages: eco-friendly, cheaper" },
            { id: "c3-5-3", label: "Weaknesses: slow effect, disrupts ecosystem" },
          ],
        },
        {
          id: "c3-6",
          label: "Population Size Factors",
          children: [
            { id: "c3-6-1", label: "Disease, predators, food source, weather" },
          ],
        },
        {
          id: "c3-7",
          label: "Ecosystem Changes",
          children: [
            { id: "c3-7-1", label: "Migration: cattle egret (Kuala Gula)" },
            { id: "c3-7-2", label: "Limited water supply: paddy field" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "2.4 Role of Humans",
      children: [
        { id: "c4-1", label: "Effects: logging, industrialisation, agriculture, waste disposal" },
        { id: "c4-2", label: "Law enforcement" },
        { id: "c4-3", label: "Public awareness" },
        { id: "c4-4", label: "5R: Refuse, Reduce, Reuse, Recycle, Repurpose" },
        { id: "c4-5", label: "Biological control in agriculture" },
      ],
    },
  ],
};
