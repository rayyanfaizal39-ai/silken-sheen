import type { StructuredNotes } from "./types";

export const scienceF1C6NotesDLP: StructuredNotes = {
  quickRevision: [
    "All matter is made of atoms, and atoms contain protons, neutrons and electrons.",
    "The nucleus is at the centre of an atom and contains protons and neutrons.",
    "A neutral atom has the same number of protons and electrons.",
    "The Periodic Table arranges elements according to increasing proton number.",
    "Metals are usually shiny, ductile, malleable and good conductors of heat and electricity.",
    "Mixtures are formed physically and can be separated by physical methods.",
    "Compounds are formed chemically and can only be separated by chemical methods.",
  ],
  sections: [
    {
      title: "6.1 Classification of Elements",
      subsections: [
        {
          title: "Atoms and Subatomic Particles",
          bulletPoints: [
            "All matter is made of atoms.",
            "An atom consists of three subatomic particles: proton, neutron and electron.",
          ],
        },
        {
          title: "Atomic Structure",
          bulletPoints: [
            "The nucleus is located at the centre of the atom.",
            "The nucleus contains protons and neutrons.",
            "Electrons move around the nucleus in shells.",
          ],
        },
        {
          title: "Charges of Subatomic Particles",
          table: {
            headers: ["Particle", "Charge"],
            rows: [
              ["Proton", "Positive"],
              ["Neutron", "Neutral / no charge"],
              ["Electron", "Negative"],
            ],
          },
        },
        {
          title: "Neutral Atom",
          content:
            "An atom is neutral when the number of protons is equal to the number of electrons.",
        },
      ],
    },
    {
      title: "Molecules, Elements and Compounds",
      subsections: [
        {
          title: "Molecule",
          content:
            "A molecule is a neutral particle made up of two or more atoms chemically combined.",
        },
        {
          title: "Element",
          content:
            "An element is the simplest substance made up of only one type of atom. It cannot be broken down into simpler substances chemically.",
        },
        {
          title: "Compound",
          content:
            "A compound is a substance formed when two or more elements combine chemically.",
        },
      ],
    },
    {
      title: "The Periodic Table",
      subsections: [
        {
          title: "Definition",
          content:
            "The Periodic Table arranges all elements systematically according to increasing proton number.",
        },
        {
          title: "Classification of Elements",
          bulletPoints: [
            "Metals are located on the left side of the Periodic Table.",
            "Non-metals are located on the right side of the Periodic Table.",
            "Semi-metals or metalloids are located between metals and non-metals.",
            "Inert gases are located in Group 18.",
          ],
        },
      ],
    },
    {
      title: "Characteristics of Metals and Non-metals",
      subsections: [
        {
          title: "Comparison",
          table: {
            headers: ["Characteristic", "Metals", "Non-metals"],
            rows: [
              ["Surface", "Shiny", "Dull"],
              ["Ductility", "Ductile, can be pulled into wires", "Brittle"],
              ["Malleability", "Malleable, can be shaped", "Not malleable"],
              ["Electrical conductivity", "Good conductor", "Poor conductor"],
              ["Heat conductivity", "Good conductor", "Poor conductor"],
              ["Melting and boiling points", "High", "Low"],
              ["Density", "High", "Low"],
            ],
          },
        },
        {
          title: "Important Exception",
          content: "Graphite is a non-metal that can conduct electricity.",
        },
      ],
    },
    {
      title: "6.2 Mixtures",
      subsections: [
        {
          title: "Definition",
          content:
            "A mixture is a substance made of two or more elements or compounds mixed physically.",
        },
        {
          title: "Characteristics of Mixtures",
          bulletPoints: [
            "No new substance is formed.",
            "The composition is not fixed.",
            "Components can be separated by physical methods.",
          ],
        },
        {
          title: "Methods of Separating Mixtures",
          table: {
            headers: ["Method", "Use", "Example"],
            rows: [
              ["Filtration", "Separates insoluble solids from liquids", "Sand and water"],
              ["Magnetic separation", "Separates magnetic materials", "Iron powder and sulfur"],
              ["Distillation", "Separates liquids with different boiling points", "Alcohol and water"],
              ["Sedimentation", "Allows heavier components to settle at the bottom", "Muddy water"],
              ["Floatation", "Separates substances based on density", "Less dense material floats"],
              ["Chromatography", "Separates small amounts of mixtures based on solubility", "Ink colours"],
            ],
          },
        },
      ],
    },
    {
      title: "6.3 Compounds",
      subsections: [
        {
          title: "Definition",
          content:
            "A compound is a substance formed when two or more elements combine chemically.",
        },
        {
          title: "Formation of Compounds",
          bulletPoints: [
            "Formation of compounds involves a chemical change.",
            "A new substance with different properties is formed.",
            "For example, magnesium and sulfur form magnesium sulfide when heated.",
          ],
        },
        {
          title: "Separation of Compounds",
          content:
            "Compounds can only be separated using chemical methods such as electrolysis.",
        },
      ],
    },
    {
      title: "Difference Between Mixtures and Compounds",
      subsections: [
        {
          title: "Comparison",
          table: {
            headers: ["Feature", "Mixture", "Compound"],
            rows: [
              ["Formation", "Physical change", "Chemical change"],
              ["New substance", "No new substance formed", "New substance formed"],
              ["Chemical bond", "No chemical bond", "Has chemical bonds"],
              ["Separation", "Physical methods", "Chemical methods"],
              ["Properties", "Same as original components", "Different from original elements"],
              ["Composition", "Not fixed", "Fixed"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Protons are positive, neutrons are neutral and electrons are negative.",
    "A neutral atom has equal numbers of protons and electrons.",
    "Elements are arranged in the Periodic Table by increasing proton number.",
    "Metals are generally good conductors of heat and electricity.",
    "Graphite is a non-metal that conducts electricity.",
    "Mixtures can be separated by physical methods.",
    "Compounds can only be separated by chemical methods.",
  ],
  keyTerms: [
    "Atom",
    "Proton",
    "Neutron",
    "Electron",
    "Nucleus",
    "Shell",
    "Molecule",
    "Element",
    "Compound",
    "Periodic Table",
    "Metal",
    "Non-metal",
    "Metalloid",
    "Mixture",
    "Filtration",
    "Distillation",
    "Chromatography",
    "Electrolysis",
  ],
  chapterSummary:
    "Chapter 6 introduces atoms, subatomic particles, molecules, elements, compounds, the Periodic Table, properties of metals and non-metals, mixtures and separation methods, and the differences between mixtures and compounds.",
};
