import type { MindNode } from "@/components/MindMap";

export const scienceF2C4MindMapDLP: MindNode = {
  id: "root",
  label: "Human Health",
  children: [
    {
      id: "c1",
      label: "4.1 Diseases",
      children: [
        {
          id: "c1-1",
          label: "Infectious Diseases",
          children: [
            { id: "c1-1-1", label: "Caused by pathogens via mediums/vectors; CAN spread" },
            { id: "c1-1-2", label: "Examples: TB, flu, ringworm, tinea, leptospirosis, dengue, malaria, Zika" },
          ],
        },
        {
          id: "c1-2",
          label: "Non-infectious Diseases",
          children: [
            { id: "c1-2-1", label: "Caused by genetics/lifestyle; CANNOT spread" },
            { id: "c1-2-2", label: "Examples: cancer, hypertension, diabetes, asthma, cardiovascular" },
          ],
        },
        {
          id: "c1-3",
          label: "Ways of Spreading",
          children: [
            { id: "c1-3-1", label: "Air: droplet & dust (TB, flu, SARS, H1N1, chicken pox)" },
            { id: "c1-3-2", label: "Water: contaminated food/water (cholera, typhoid, amoebic dysentery)" },
            { id: "c1-3-3", label: "Contact: skin/sexual/blood (ringworm, tinea, syphilis, HIV)" },
            { id: "c1-3-4", label: "Vectors: Aedes→dengue/Zika; Anopheles→malaria; Rat→leptospirosis; Cockroach/Fly→typhoid" },
          ],
        },
        {
          id: "c1-4",
          label: "3 Stages of Prevention",
          children: [
            { id: "c1-4-1", label: "Primary: improve health & body defence" },
            { id: "c1-4-2", label: "Secondary: early detection & treatment, isolate patients" },
            { id: "c1-4-3", label: "Tertiary: control vectors, protect hosts" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "4.2 Body Defence",
      children: [
        {
          id: "c2-1",
          label: "1st Line: Skin & Mucous Membrane",
          children: [
            { id: "c2-1-1", label: "Skin: tough layer, sweat & sebum kill microorganisms" },
            { id: "c2-1-2", label: "Mucous membrane: nasal hairs, mucus, tears, earwax" },
          ],
        },
        { id: "c2-2", label: "2nd Line: Phagocytosis (white blood cells engulf pathogens)" },
        {
          id: "c2-3",
          label: "3rd Line: Immune System",
          children: [
            { id: "c2-3-1", label: "Antigen: foreign substance that triggers antibody production" },
            { id: "c2-3-2", label: "Antibody: protein made by white blood cells in response" },
          ],
        },
        {
          id: "c2-4",
          label: "Immunisation",
          children: [
            { id: "c2-4-1", label: "Vaccine: weakened/dead antigen, builds immunity without disease" },
            { id: "c2-4-2", label: "Malaysia schedule: BCG, DTaP, MMR, IPV, HPV (girls 13), JE (Sarawak)" },
          ],
        },
        {
          id: "c2-5",
          label: "Types of Immunity",
          children: [
            { id: "c2-5-1", label: "Passive Natural: mother→baby, short-lived" },
            { id: "c2-5-2", label: "Passive Artificial: antiserum, fast & temporary" },
            { id: "c2-5-3", label: "Active Natural: recover from infection, long-lasting" },
            { id: "c2-5-4", label: "Active Artificial: vaccination, long-lasting" },
          ],
        },
        {
          id: "c2-6",
          label: "Strong Immune System",
          children: [
            { id: "c2-6-1", label: "Weakens: polluted air, pesticides, stress, excess sugar, smoking" },
            { id: "c2-6-2", label: "Strengthens: enough sleep, exercise, fresh air, no smoking, health checks" },
            { id: "c2-6-3", label: "Allergy: immune response to allergen (dust, pollen, food, medicines)" },
          ],
        },
      ],
    },
  ],
};
