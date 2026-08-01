import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C2InteractiveDLP: ScienceF3InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "Science Gallery — Training Thin Air",
    body: "Athletes train at high altitude or in hypoxic rooms where oxygen is scarcer — this forces the body to release stored red blood cells and produce more of them, boosting oxygen-carrying capacity and respiratory efficiency for competition.",
  },
  keywords: ["Alveolus", "Diaphragm", "Oxyhaemoglobin", "Diffusion", "Cellular respiration", "Emphysema", "Stoma"],
  sections: [
    {
      number: "2.1",
      title: "Human Respiratory System",
      intro:
        "Breathing is the process of inhaling and exhaling air by the lungs. Air travels: nostrils → nasal cavity → pharynx → larynx → trachea → bronchus → bronchiole → alveolus — where the actual gas exchange happens.",
      cards: [
        { title: "I can remember!", body: "The human respiratory system functions to supply oxygen and remove carbon dioxide from the body's cells." },
      ],
      toggles: [
        {
          title: "Inhale or exhale?",
          instruction: "Tap to see exactly what your ribcage, diaphragm and lungs do at each stage.",
          options: [
            { id: "inhale", label: "Inhalation", body: "Intercostal muscles contract, pulling the rib cage up and out. The diaphragm contracts and flattens downward. Together, this enlarges the thoracic cavity, lowering air pressure inside — so higher outside air pressure forces air into the lungs." },
            { id: "exhale", label: "Exhalation", body: "Intercostal muscles relax, and the rib cage moves down and in. The diaphragm relaxes and curves upward. This shrinks the thoracic cavity, raising air pressure inside — pushing air back out of the lungs." },
          ],
        },
      ],
      comparison: {
        title: "What the theory predicts",
        columns: [
          { title: "Inhaled air", body: "Higher oxygen percentage and lower carbon dioxide percentage." },
          { title: "Exhaled air", body: "Lower oxygen percentage and higher carbon dioxide percentage." },
        ],
      },
      checks: [
        { question: "Which structure opens or closes the trachea during swallowing?", hint: "The epiglottis — it drops down to close the trachea while swallowing, and moves up to open it during breathing." },
      ],
    },
    {
      number: "2.2",
      title: "Movement and Exchange of Gases in the Human Body",
      intro:
        "Oxygen diffuses from the alveolus, where concentration is higher, into the blood, where haemoglobin forms an unstable compound called oxyhaemoglobin (haemoglobin + oxygen → oxyhaemoglobin). At the body cells, oxyhaemoglobin decomposes to release oxygen for cellular respiration (glucose + oxygen → carbon dioxide + water + energy), and carbon dioxide diffuses back the other way.",
      cards: [
        { title: "Why the alveolus is built for the job", body: "Tap each adaptation below to see how it speeds up gas exchange." },
      ],
      flipCards: [
        { id: "thin-walls", icon: "🧱", label: "Thin walls", fact: "Alveolus and capillary walls are just one cell thick, speeding up diffusion." },
        { id: "moist", icon: "💧", label: "Moist surface", fact: "Lets respiratory gases dissolve before diffusing across." },
        { id: "surface-area", icon: "📐", label: "Huge surface area", fact: "Millions of alveoli in the lungs provide massive total area for exchange." },
        { id: "capillary", icon: "🕸️", label: "Capillary network", fact: "A dense mesh of capillaries wraps every alveolus, maximising exchange rate." },
      ],
      checks: [
        { question: "What happens to gaseous exchange efficiency at high altitude?", hint: "It decreases — lower oxygen concentration in the air reduces the concentration gradient driving diffusion into the blood." },
      ],
    },
    {
      number: "2.3",
      title: "Health of Human Respiratory System",
      intro: "Cigarette tar, carbon monoxide, sulphur dioxide, nitrogen dioxide, haze, dust and pollen can all damage the respiratory system. Tap each to see how.",
      accordions: [
        { title: "Cigarette tar", body: "Sticks to and kills cells along the air passage, increases mucus production, and is a leading cause of lung cancer." },
        { title: "Carbon monoxide", body: "Combines with haemoglobin to form stable carboxyhaemoglobin — this blocks oxygen transport, starving body cells of the energy they need." },
        { title: "Sulphur & nitrogen dioxide", body: "Released from burning coal and vehicle fuel — irritates the air passage, causing coughing, breathing difficulty, bronchitis and asthma." },
        { title: "Haze, dust & pollen", body: "Fine solid particles suspended in the air that irritate the respiratory system and trigger asthma." },
      ],
      matcher: {
        title: "Match the disease to its cause",
        instruction: "Pick a respiratory disease, then pick what it's caused by.",
        pairs: [
          { id: "asthma", label: "Asthma", match: "Dust, pollen, haze and smoke — wheezing and shortness of breath" },
          { id: "bronchitis", label: "Bronchitis", match: "Cigarette tar irritants inflaming the bronchus" },
          { id: "emphysema", label: "Emphysema", match: "Damaged alveoli from harmful smoke particles" },
          { id: "lungcancer", label: "Lung cancer", match: "Carcinogens like cigarette tar" },
        ],
      },
      checks: [
        { question: "What is a passive smoker?", hint: "Someone who doesn't smoke but inhales cigarette smoke from people around them — they experience the same harmful respiratory effects as the smoker." },
      ],
    },
    {
      number: "2.4",
      title: "Adaptations in Respiratory Systems",
      intro: "Whatever the organism, an efficient respiratory surface needs to be moist, thin, and have a large surface area. Tap each organism to see its unique adaptation.",
      flipCards: [
        { id: "frog", icon: "🐸", label: "Frog — Moist skin", fact: "Thin, permeable, mucus-covered skin over a dense capillary network lets gases dissolve and diffuse easily, on top of using lungs." },
        { id: "fish", icon: "🐟", label: "Fish — Gills", fact: "Fine filaments covered in flat lamellae give huge surface area; constant water flow keeps gases dissolving and diffusing." },
        { id: "insect", icon: "🦗", label: "Insects — Trachea", fact: "Air tubes (trachea) branch into moist tracheoles that deliver oxygen straight to tissues through spiracle openings." },
      ],
      checks: [
        { question: "Why don't insects need their circulatory system to help with respiration?", hint: "Their trachea system delivers oxygen directly to tissues through tracheoles — bypassing the need for blood to carry respiratory gases at all." },
      ],
    },
    {
      number: "2.5",
      title: "Gaseous Exchange in Plants",
      intro:
        "Gas exchange in plants happens mainly through stomata in the leaves, controlled by a pair of guard cells. Whether the stoma is open depends on osmosis. Haze and dust settling on stomata block gaseous exchange and reduce photosynthesis, and acidic gases like sulphur dioxide dissolve in rain to form acid rain — killing plant cells and making soil less fertile.",
      toggles: [
        {
          title: "Plants breathe too — through their stomata",
          instruction: "Tap to compare daytime and night-time stomata.",
          options: [
            { id: "day", label: "☀️ Daytime", body: "Guard cells photosynthesise, raising their glucose concentration. Water diffuses in via osmosis, making guard cells turgid and curved — this opens the stoma." },
            { id: "night", label: "🌙 Night / Hot Day", body: "Water diffuses out of guard cells via osmosis, making them flaccid and straight — this closes the stoma, reducing water loss." },
          ],
        },
      ],
      checks: [
        { question: "Why do stomata close on very hot days, even during daylight?", hint: "To limit water loss through transpiration — excessive heat can cause the plant to lose water faster than its roots can replace it." },
      ],
    },
  ],
  reflectionItems: [
    "I can draw and describe the human respiratory system and breathing mechanism.",
    "I can describe the movement and exchange of oxygen and carbon dioxide in the human body.",
    "I can communicate substances harmful to the respiratory system and their diseases.",
    "I can justify how respiratory systems adapt in different situations, including in plants.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: The percentage of carbon dioxide in exhaled air is less than in inhaled air.", answer: false, explanation: "Exhaled air has MORE carbon dioxide than inhaled air — the opposite of oxygen." },
    { type: "multiple-choice", question: "Which gas combines with haemoglobin to form a stable compound that blocks oxygen transport?", options: ["Carbon monoxide", "Carbon dioxide", "Nitrogen dioxide", "Sulphur dioxide"], answerIndex: 0, explanation: "Carbon monoxide forms stable carboxyhaemoglobin, unlike normal oxyhaemoglobin — permanently blocking that haemoglobin from carrying oxygen." },
  ],
};
