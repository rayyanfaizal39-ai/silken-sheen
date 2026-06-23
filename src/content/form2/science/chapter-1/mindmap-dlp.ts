import type { MindNode } from "@/components/MindMap";

export const scienceF2C1MindMapDLP: MindNode = {
  id: "root",
  label: "Biodiversity",
  children: [
    {
      id: "c1",
      label: "1.1 Diversity of Organisms",
      children: [
        {
          id: "c1-1",
          label: "What is Biodiversity?",
          children: [
            { id: "c1-1-1", label: "Diversity of microorganisms, animals, plants" },
            { id: "c1-1-2", label: "Result of habitat & climate diversity" },
            { id: "c1-1-3", label: "Includes genetic diversity" },
            { id: "c1-1-4", label: "Malaysia: 1 of 12 megabiodiversity countries" },
          ],
        },
        {
          id: "c1-2",
          label: "Importance of Biodiversity",
          children: [
            { id: "c1-2-1", label: "Source of food" },
            { id: "c1-2-2", label: "Medicine" },
            { id: "c1-2-3", label: "Balance in nature" },
            { id: "c1-2-4", label: "Raw materials for industries" },
            { id: "c1-2-5", label: "Recreational places" },
            { id: "c1-2-6", label: "Education" },
          ],
        },
        {
          id: "c1-3",
          label: "Biodiversity Management",
          children: [
            { id: "c1-3-1", label: "Wildlife Protection Act 1972" },
            { id: "c1-3-2", label: "National parks, marine parks, forest reserves" },
            { id: "c1-3-3", label: "Reproductive programmes (nurseries, hatcheries)" },
            { id: "c1-3-4", label: "Endemic species: rafflesia, pitcher plant, leatherback turtle" },
          ],
        },
        {
          id: "c1-4",
          label: "Conservation",
          children: [
            { id: "c1-4-1", label: "In situ: within natural habitat" },
            { id: "c1-4-2", label: "Ex situ: outside natural habitat (zoo, botanical park)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "1.2 Classification of Animals",
      children: [
        {
          id: "c2-1",
          label: "Invertebrates (no backbone)",
          children: [
            { id: "c2-1-1", label: "No legs, no segments: sponge, coral, snail" },
            { id: "c2-1-2", label: "No legs, segmented: leech, tapeworm" },
            { id: "c2-1-3", label: "3 pairs of legs: ant, butterfly, cockroach" },
            { id: "c2-1-4", label: ">3 pairs of legs: spider, centipede, prawn" },
          ],
        },
        {
          id: "c2-2",
          label: "Vertebrates (with backbone)",
          children: [
            { id: "c2-2-1", label: "Fish — poikilothermic, gills, scales" },
            { id: "c2-2-2", label: "Amphibians — poikilothermic, moist skin" },
            { id: "c2-2-3", label: "Reptiles — poikilothermic, shelled eggs" },
            { id: "c2-2-4", label: "Birds — homeothermic, feathers" },
            { id: "c2-2-5", label: "Mammals — homeothermic, give birth" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "1.2 Classification of Plants",
      children: [
        {
          id: "c3-1",
          label: "Non-Flowering",
          children: [
            { id: "c3-1-1", label: "Moss — spores, non-vascular" },
            { id: "c3-1-2", label: "Fern — spores, vascular" },
            { id: "c3-1-3", label: "Conifer — cones, vascular" },
          ],
        },
        {
          id: "c3-2",
          label: "Flowering",
          children: [
            { id: "c3-2-1", label: "Monocotyledon — fibrous root, parallel veins" },
            { id: "c3-2-2", label: "Dicotyledon — tap root, network veins" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "Dichotomous Key",
      children: [
        { id: "c4-1", label: "Series of couplets — 2 statements (a)/(b) each" },
        { id: "c4-2", label: "Animal example: poikilothermic/homeothermic → ..." },
        { id: "c4-3", label: "Plant example: flowering/non-flowering → ..." },
      ],
    },
  ],
};
