import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C3InteractiveDLP: ScienceF3InteractiveContent = {
  chapter: 3,
  blogHighlight: {
    title: "Science Gallery — Fantastic Voyage",
    body: "In the 1966 film \"Fantastic Voyage,\" a medical team is shrunk to the size of a red blood cell and injected into a patient's bloodstream to laser away a blood clot in the brain — travelling through the heart and lungs along the way, just like real blood does on every circuit.",
  },
  keywords: ["Artery", "Vein", "Capillary", "Antigen", "Antibody", "Transpiration", "Guttation", "Xylem", "Phloem"],
  sections: [
    {
      number: "3.1",
      title: "Transport System in Organisms",
      intro:
        "Simple, unicellular organisms like Amoeba don't need a transport system — oxygen and nutrients diffuse directly through the cell membrane. But complex organisms like humans and plants are far too large for diffusion alone to reach every cell in time, so they evolved a specialised transport system.",
      comparison: {
        title: "Why size demands a delivery system",
        columns: [
          { title: "Simple organisms", body: "No specialised transport system — substances diffuse directly through the cell membrane." },
          { title: "Complex organisms", body: "A specialised transport system (heart and vessels, or xylem and phloem), because diffusion alone is too slow across their large volume." },
        ],
      },
      checks: [
        { question: "What happens to an organism if its transport system fails?", hint: "Toxic waste products that can't be eliminated from cells will build up and poison the organism — and cells will also be starved of the oxygen and nutrients they need." },
      ],
    },
    {
      number: "3.2",
      title: "Blood Circulatory System",
      intro: "Human blood is pumped by the heart through arteries, capillaries and veins in a continuous circuit. Tap each vessel type.",
      flipCards: [
        { id: "artery", icon: "🔴", label: "Artery", fact: "Thick, muscular, elastic wall; small lumen; no valves; carries oxygenated blood at high pressure from the heart." },
        { id: "capillary", icon: "🕸️", label: "Capillary", fact: "One-cell-thick wall; smallest lumen; no valves; lets gases and nutrients diffuse directly with body cells." },
        { id: "vein", icon: "🔵", label: "Vein", fact: "Thin, less muscular wall; large lumen; has valves; carries deoxygenated blood back to the heart under low pressure." },
      ],
      accordions: [
        { title: "Right atrium", body: "Receives deoxygenated blood from the whole body (except lungs) via the vena cava, then forces it into the right ventricle." },
        { title: "Right ventricle", body: "Pumps deoxygenated blood out through the pulmonary artery to the lungs." },
        { title: "Left atrium", body: "Receives oxygenated blood from the lungs via the pulmonary vein, then forces it into the left ventricle." },
        { title: "Left ventricle", body: "Has the thickest muscular wall — pumps oxygenated blood out through the aorta to the whole body except the lungs." },
      ],
      toggles: [
        {
          title: "The 'lub-dub' sound of your own heartbeat",
          instruction: "Tap to compare systole and diastole.",
          options: [
            { id: "systole", label: "Systole ('Lub')", body: "Ventricles contract, closing the tricuspid and bicuspid valves — producing the 'lub' sound. The pressure reading of blood flowing OUT of the heart is the systolic pressure." },
            { id: "diastole", label: "Diastole ('Dub')", body: "Ventricles relax, closing the semilunar valves at the aorta and pulmonary artery — producing the 'dub' sound. The pressure reading of blood flowing INTO the heart is the diastolic pressure." },
          ],
        },
      ],
      cards: [
        { title: "Physical activity", body: "More vigorous activity raises pulse rate." },
        { title: "Gender", body: "Women average 78–82 bpm; men average 70–72 bpm." },
        { title: "Age", body: "Maximum pulse rate drops as a person gets older." },
        { title: "Body health", body: "Abnormally high or low pulse rates can be dangerous." },
      ],
      checks: [
        { question: "Why is systolic pressure always higher than diastolic pressure?", hint: "Systolic pressure is measured during ventricular contraction, when blood is actively forced out under high pressure — diastolic is measured during relaxation, when pressure naturally drops." },
      ],
    },
    {
      number: "3.3",
      title: "Human Blood",
      intro:
        "Blood is a suspension of red blood cells, white blood cells, platelets and blood plasma (about 90% water, carrying nutrients, hormones, enzymes and waste). Spin it in a centrifuge and it separates into a yellow liquid, plasma, floating over red blood cells.",
      bloodChecker: {
        title: "Check blood type compatibility yourself",
        instruction: "Pick a donor and recipient blood group to see if a transfusion would be safe.",
      },
      cards: [
        { title: "Why compatibility matters", body: "An antibody in the recipient's plasma attacks any matching antigen on the donor's red blood cells, causing blood to coagulate — which can be fatal. That's why O is the universal donor (no antigens to attack) and AB is the universal recipient (no antibodies to react)." },
      ],
      checks: [
        { question: "Why can't someone with type O blood receive any other blood type?", hint: "Type O plasma contains both Anti-A and Anti-B antibodies, which would attack the A or B antigens present in any other blood type." },
      ],
    },
    {
      number: "3.4",
      title: "Transport System in Plants",
      intro: "Transpiration is the loss of water vapour from a plant's surface — mostly through leaf stomata — via evaporation. This pulls water and dissolved minerals up from the roots through the xylem.",
      flipCards: [
        { id: "light", icon: "☀️", label: "Light intensity", fact: "More light means more open stomata, so transpiration is faster." },
        { id: "humidity", icon: "💧", label: "Air humidity", fact: "Higher humidity means a smaller concentration gradient, so transpiration is slower." },
        { id: "wind", icon: "💨", label: "Air movement", fact: "More air movement sweeps away water vapour, speeding up transpiration." },
        { id: "temperature", icon: "🌡️", label: "Temperature", fact: "Higher temperature increases the evaporation rate at the leaf surface." },
      ],
      comparison: {
        title: "Two transport tissues, two jobs",
        columns: [
          { title: "Xylem", body: "Transports water and dissolved mineral salts, in one direction: roots → stem → leaves." },
          { title: "Phloem", body: "Transports sucrose from photosynthesis, from the leaves to all other plant parts." },
        ],
      },
      checks: [
        { question: "Why is red dye (eosin) used to trace water movement in a plant experiment?", hint: "The dye travels along with the water through the xylem, making the normally invisible water pathway visible under a microscope after the stem is sliced." },
      ],
    },
    {
      number: "3.5",
      title: "Blood Circulatory System in Animals and Transport System in Plants",
      intro:
        "Both animal blood circulation and plant transport carry water, nutrients and dissolved substances, and both exist because complex organisms are too large for diffusion alone.",
      comparison: {
        title: "Same purpose, different design",
        columns: [
          { title: "Animals", body: "A tubular system with a pump (the heart) and valves — 3 vessel types (artery, capillary, vein) all connected in one loop." },
          { title: "Plants", body: "A system of vessels with no pump or valve — 2 separate, unconnected vessels: xylem and phloem." },
        ],
      },
      checks: [
        { question: "Give one similarity and one difference between animal blood circulation and plant transport.", hint: "Similarity: both transport water and dissolved substances in complex organisms. Difference: animals use one connected pumped loop; plants use two separate unconnected vessels with no pump." },
      ],
    },
  ],
  reflectionItems: [
    "I can describe the function of transport systems in complex and simple organisms.",
    "I can explain the structure and function of the heart and blood vessels.",
    "I can identify blood groups and the effects of incompatible transfusion.",
    "I can describe transpiration and the factors that affect its rate.",
    "I can compare the blood circulatory system in animals with the transport system in plants.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: A person with blood group AB is known as the universal donor.", answer: false, explanation: "AB is the universal RECIPIENT (can receive any blood type) — O is the universal donor." },
    { type: "multiple-choice", question: "Which plant tissue transports sucrose produced during photosynthesis?", options: ["Xylem", "Phloem", "Cuticle", "Stomata"], answerIndex: 1, explanation: "Phloem carries sucrose from the leaves (where it's made) to every other part of the plant." },
  ],
};
