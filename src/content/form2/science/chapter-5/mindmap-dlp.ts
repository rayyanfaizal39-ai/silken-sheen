import type { MindNode } from "@/components/MindMap";

export const scienceF2C5MindMapDLP: MindNode = {
  id: "root",
  label: "Water and Solution",
  children: [
    {
      id: "c1",
      label: "5.1 Physical Characteristics of Water",
      children: [
        {
          id: "c1-1",
          label: "Properties of Pure Water",
          children: [
            { id: "c1-1-1", label: "Colourless, odourless, tasteless" },
            { id: "c1-1-2", label: "Boiling point 100°C; Freezing point 0°C; Density 1 g/cm³" },
            { id: "c1-1-3", label: "Surface tension: cohesive force only" },
            { id: "c1-1-4", label: "Capillary action: cohesive + adhesive force" },
          ],
        },
        {
          id: "c1-2",
          label: "Composition of Water",
          children: [
            { id: "c1-2-1", label: "H₂O: 2 hydrogen + 1 oxygen atom" },
            { id: "c1-2-2", label: "Electrolysis: O₂ at anode, H₂ at cathode, ratio 2:1" },
          ],
        },
        { id: "c1-3", label: "Impurities: lower melting point, raise boiling point" },
        {
          id: "c1-4",
          label: "Evaporation",
          children: [
            { id: "c1-4-1", label: "Occurs at surface, at any temperature" },
            {
              id: "c1-4-2",
              label: "Factors",
              children: [
                { id: "c1-4-2-1", label: "Humidity: lower → faster" },
                { id: "c1-4-2-2", label: "Surrounding temperature: higher → faster" },
                { id: "c1-4-2-3", label: "Exposed surface area: larger → faster" },
                { id: "c1-4-2-4", label: "Movement of air: faster → faster" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "5.2 Solution and Rate of Solubility",
      children: [
        { id: "c2-1", label: "Solute + Solvent = Solution" },
        {
          id: "c2-2",
          label: "Types of Solution",
          children: [
            { id: "c2-2-1", label: "Dilute: less solute, dissolves more" },
            { id: "c2-2-2", label: "Concentrated: more solute, dissolves less" },
            { id: "c2-2-3", label: "Saturated: excess solute, forms precipitate" },
          ],
        },
        { id: "c2-3", label: "Suspension: cloudy, blocks light, leaves residue, settles" },
        { id: "c2-4", label: "Colloid: between solution & suspension (foam, emulsion)" },
        {
          id: "c2-5",
          label: "Solubility: HOW MUCH",
          children: [
            { id: "c2-5-1", label: "Maximum amount of solute in 100 ml of solvent" },
            { id: "c2-5-2", label: "Stated at a specified temperature" },
            { id: "c2-5-3", label: "Higher temperature → most solids dissolve in greater amount" },
          ],
        },
        {
          id: "c2-8",
          label: "Rate of solubility: HOW FAST",
          children: [
            { id: "c2-8-1", label: "Temperature of solvent: higher → dissolves faster" },
            { id: "c2-8-2", label: "Rate of stirring: faster → dissolves faster" },
            { id: "c2-8-3", label: "Size of solute: smaller → dissolves faster" },
            { id: "c2-8-4", label: "Responding variable: rate of solubility" },
          ],
        },
        { id: "c2-6", label: "Water as Universal Solvent: dissolves almost everything" },
        { id: "c2-7", label: "Organic Solvents: alcohol, kerosene, acetone, turpentine, ether" },
      ],
    },
    {
      id: "c3",
      label: "5.3 Water Purification and Water Supply",
      children: [
        {
          id: "c3-1",
          label: "Purification Methods",
          children: [
            { id: "c3-1-1", label: "Filtration: removes suspended particles" },
            { id: "c3-1-2", label: "Boiling: kills microorganisms" },
            { id: "c3-1-3", label: "Chlorination: kills microorganisms" },
            { id: "c3-1-4", label: "Distillation: removes everything (purest)" },
            { id: "c3-1-5", label: "Purification = produce pure water; only distillation achieves it" },
          ],
        },
        {
          id: "c3-2",
          label: "Water Supply System",
          children: [
            { id: "c3-2-1", label: "Screening → Oxidation → Coagulation" },
            { id: "c3-2-2", label: "Sedimentation → Filtration → Chlorination/Fluoridation" },
            { id: "c3-2-3", label: "Alum: clumps mud; Slaked lime: reduces acidity" },
          ],
        },
        {
          id: "c3-3",
          label: "Water Sustainability",
          children: [
            { id: "c3-3-1", label: "Pollutants: domestic, industrial, agricultural, oil spill" },
            { id: "c3-3-2", label: "Safe drinking water: free of microorganisms & toxic substances" },
            { id: "c3-3-3", label: "Minamata Bay: mercury poisoning through the food chain" },
            { id: "c3-3-4", label: "Water audit: record usage → identify wastage" },
          ],
        },
        {
          id: "c3-4",
          label: "Alternative Water Supplies",
          children: [
            { id: "c3-4-1", label: "Reverse osmosis: seawater pressed through a fine membrane" },
            { id: "c3-4-2", label: "Water recycling: NEWater (Singapore)" },
            { id: "c3-4-3", label: "Water from fog: nets collect fine droplets" },
          ],
        },
      ],
    },
  ],
};
