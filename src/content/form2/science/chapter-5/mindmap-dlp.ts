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
          label: "Solubility & Rate Factors",
          children: [
            { id: "c2-5-1", label: "Temperature of solvent: higher → faster" },
            { id: "c2-5-2", label: "Rate of stirring: faster → faster" },
            { id: "c2-5-3", label: "Size of solute: smaller → faster" },
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
          ],
        },
        {
          id: "c3-2",
          label: "Water Supply System",
          children: [
            { id: "c3-2-1", label: "Filtration → Oxidation → Coagulation" },
            { id: "c3-2-2", label: "Sedimentation → Filtration → Chlorination/Fluoridation" },
          ],
        },
        {
          id: "c3-3",
          label: "Water Sustainability",
          children: [
            { id: "c3-3-1", label: "Pollutants: domestic, industrial, agricultural, oil spill" },
            { id: "c3-3-2", label: "NEWater (recycled sewage); reverse osmosis (desalination)" },
          ],
        },
      ],
    },
  ],
};
