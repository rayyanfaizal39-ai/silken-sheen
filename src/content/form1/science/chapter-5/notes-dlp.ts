import type { StructuredNotes } from "@/data/types";

export const scienceF1C5NotesDLP: StructuredNotes = {
  quickRevision: [
    "Matter is any substance that has mass and occupies space.",
    "Light, sound, heat and electricity are not matter because they do not have mass and do not occupy space.",
    "Physical properties can be identified without forming a new substance.",
    "Chemical properties are observed when a substance changes into a new substance.",
    "Matter exists as solid, liquid and gas, with different particle arrangements and movements.",
    "Diffusion is the movement of particles from a high concentration area to a low concentration area.",
    "Density is mass per unit volume, and less dense objects float while denser objects sink.",
  ],
  sections: [
    {
      title: "5.1 Matter in Nature",
      subsections: [
        {
          title: "Definition of Matter",
          bulletPoints: [
            "Matter is any substance that has mass and occupies space.",
            "Living things and non-living things are matter.",
            "Examples of matter include humans, plants, water, air, rocks and books.",
          ],
        },
        {
          title: "Non-Matter",
          content: "Non-matter does not have mass and does not occupy space.",
          bulletPoints: ["Light", "Sound", "Heat", "Electricity"],
        },
        {
          title: "Physical Properties of Matter",
          content: "Physical properties can be identified without changing the substance into a new substance.",
          bulletPoints: [
            "Melting point",
            "Boiling point",
            "Density",
            "Solubility",
            "Heat conductivity",
          ],
        },
        {
          title: "Chemical Properties of Matter",
          content: "Chemical properties appear when a substance changes into a new substance.",
          bulletPoints: ["Rusting", "Flammability", "Decomposition"],
        },
        {
          title: "Classification of Materials",
          content: "Materials can be classified based on their properties.",
          bulletPoints: ["Density", "Melting point", "Boiling point", "Solubility"],
        },
      ],
    },
    {
      title: "5.2 Three States of Matter",
      subsections: [
        {
          title: "Kinetic Theory of Matter",
          bulletPoints: [
            "Matter consists of tiny particles.",
            "Particles are always moving.",
            "Particles constantly collide with one another.",
          ],
        },
        {
          title: "Solid",
          bulletPoints: [
            "Particles are arranged closely and orderly.",
            "Has a fixed shape.",
            "Has a fixed volume.",
            "Cannot be compressed.",
          ],
        },
        {
          title: "Liquid",
          bulletPoints: [
            "Particles are close together but not arranged orderly.",
            "Takes the shape of its container.",
            "Has a fixed volume.",
            "Difficult to compress.",
          ],
        },
        {
          title: "Gas",
          bulletPoints: [
            "Particles are far apart.",
            "Particles move randomly and rapidly.",
            "Takes the shape and volume of its container.",
            "Easily compressed.",
          ],
        },
        {
          title: "Comparison of States of Matter",
          table: {
            headers: ["State", "Particle Arrangement", "Shape", "Volume", "Compression"],
            rows: [
              ["Solid", "Close and orderly", "Fixed", "Fixed", "Cannot be compressed"],
              ["Liquid", "Close but not orderly", "Follows container", "Fixed", "Difficult to compress"],
              ["Gas", "Far apart", "Follows container", "Follows container", "Easily compressed"],
            ],
          },
        },
      ],
    },
    {
      title: "Diffusion",
      subsections: [
        {
          title: "Definition",
          content:
            "Diffusion is the movement of particles from an area of high concentration to an area of low concentration.",
        },
        {
          title: "Rate of Diffusion",
          table: {
            headers: ["State", "Rate"],
            rows: [
              ["Gas", "Fastest"],
              ["Liquid", "Moderate"],
              ["Solid", "Slowest"],
            ],
          },
        },
        {
          title: "Example",
          content:
            "The smell of perfume spreads through air because perfume particles diffuse from a higher concentration area to a lower concentration area.",
        },
      ],
    },
    {
      title: "Changes in the State of Matter",
      subsections: [
        {
          title: "Heat Absorbed",
          table: {
            headers: ["Process", "Change of State"],
            rows: [
              ["Melting", "Solid -> Liquid"],
              ["Boiling / Evaporation", "Liquid -> Gas"],
              ["Sublimation", "Solid -> Gas"],
            ],
          },
        },
        {
          title: "Heat Released",
          table: {
            headers: ["Process", "Change of State"],
            rows: [
              ["Freezing", "Liquid -> Solid"],
              ["Condensation", "Gas -> Liquid"],
              ["Sublimation", "Gas -> Solid"],
            ],
          },
        },
      ],
    },
    {
      title: "Physical Laws of Matter",
      subsections: [
        {
          title: "Constant Temperature",
          content: "Temperature remains constant during melting, freezing and boiling.",
          bulletPoints: [
            "Heat energy is used to overcome attraction between particles during melting and boiling.",
            "Heat energy is released when particles become closer during freezing.",
          ],
        },
        {
          title: "Conservation of Mass",
          content: "Mass remains unchanged during physical changes because no matter is lost or produced.",
        },
      ],
    },
    {
      title: "Density",
      subsections: [
        {
          title: "Definition",
          content: "Density is the mass per unit volume of a material.",
          formula: "Density = Mass / Volume",
        },
        {
          title: "Principle of Buoyancy",
          bulletPoints: [
            "Less dense objects float.",
            "More dense objects sink.",
            "Ice floats on water because ice is less dense than water.",
          ],
        },
        {
          title: "Water Displacement Method",
          content: "The water displacement method is used to determine the volume of irregular objects.",
          formula: "Volume of object = Final reading - Initial reading",
        },
      ],
    },
  ],
  keyExamFacts: [
    "Matter has mass and occupies space.",
    "Light, sound, heat and electricity are examples of non-matter.",
    "Gas diffuses faster than liquid and solid.",
    "Temperature is constant during melting, freezing and boiling.",
    "Density is calculated using mass divided by volume.",
    "An object floats if it is less dense than the liquid.",
    "Water displacement is used to find the volume of irregular objects.",
  ],
  keyTerms: [
    "Matter",
    "Mass",
    "Volume",
    "Physical property",
    "Chemical property",
    "Kinetic theory",
    "Diffusion",
    "Melting",
    "Freezing",
    "Boiling",
    "Condensation",
    "Sublimation",
    "Density",
    "Buoyancy",
    "Water displacement",
  ],
  chapterSummary:
    "Chapter 5 explains matter, non-matter, physical and chemical properties, the particle model of solids, liquids and gases, diffusion, changes in state, conservation of mass, density and buoyancy.",
};
