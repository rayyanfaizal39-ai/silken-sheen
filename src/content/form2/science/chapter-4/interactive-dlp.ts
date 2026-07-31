import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch4-kesihatan-manusia.png";

export const scienceF2C4InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 4,
  blogHighlight: { title: "Science Blog — The Zika Virus", body: "Zika is mainly spread by Aedes mosquitoes. Controlling stagnant water breaks the vector's breeding cycle and reduces transmission without waiting for a sick person to appear.", imagePath: chapterImage },
  keywords: ["Pathogen", "Infectious disease", "Non-infectious disease", "Vector", "Antigen", "Antibody", "Immunity", "Vaccine"],
  sections: [
    {
      number: "4.1", title: "Infectious and Non-infectious Diseases", intro: "A disease is an abnormal condition of the body that causes discomfort or difficulty functioning. Infectious diseases are caused by pathogens (bacteria, viruses, fungi or protozoa) transmitted from an infected person to another through mediums and vectors — so they CAN spread between individuals (e.g. dengue, malaria, tuberculosis, flu). Non-infectious diseases are caused by genetic, lifestyle, nutritional or environmental factors — they do NOT spread between individuals (e.g. diabetes, cancer, hypertension).",
      cards: [
        { title: "Aedes mosquito", body: "The Aedes mosquito carries the dengue virus and the Zika virus." },
        { title: "Anopheles mosquito", body: "The female Anopheles mosquito carries Plasmodium malariae, the pathogen that causes malaria." },
        { title: "Rat", body: "Rats carry Leptospira sp. bacteria, which causes leptospirosis, through urine that contaminates water and soil." },
        { title: "Cockroach and fly", body: "Cockroaches and flies carry Salmonella typhi bacteria from waste to food, causing typhoid." },
      ],
      comparison: { title: "Two very different kinds of disease", columns: [
        { title: "Infectious", body: "Caused by pathogens such as bacteria, viruses, fungi and protozoa. Can spread between hosts, directly or indirectly." },
        { title: "Non-infectious", body: "Caused by genetic, lifestyle, nutritional or environmental factors. Examples include diabetes, cancer and hypertension." },
      ]},
      accordions: [
        { title: "Airborne transmission", body: "Droplets carry tuberculosis, influenza and chickenpox. Cover coughs, ventilate rooms and avoid crowded spaces during outbreaks." },
        { title: "Water and food", body: "Contaminated water or food spreads cholera and typhoid. Use clean water, cook food thoroughly and maintain hygiene." },
        { title: "Contact", body: "Skin contact, body fluids or contaminated objects can transfer pathogens. Wash hands and avoid sharing personal items." },
        { title: "Vectors", body: "Mosquitoes, rats, cockroaches and flies carry pathogens between hosts. Remove breeding sites and control vector populations." },
      ],
      matcher: { title: "Match the vector to its pathogen", instruction: "Choose a vector, then the disease or pathogen it transmits.", pairs: [
        { id: "aedes", label: "Aedes mosquito", match: "Dengue and Zika viruses" },
        { id: "anopheles", label: "Anopheles mosquito", match: "Plasmodium malariae that causes malaria" },
        { id: "fly", label: "Cockroach and fly", match: "Salmonella typhi that causes typhoid" },
        { id: "rat", label: "Rat", match: "Leptospira sp. that causes leptospirosis" },
      ]},
      sequence: { title: "Three stages of prevention", instruction: "Prevention acts before, during and after infection.", steps: [
        { title: "Primary", body: "Prevent disease before it occurs through sanitation, healthy habits, vaccination and vector control." },
        { title: "Secondary", body: "Detect disease early through screening, diagnosis, isolation and prompt treatment." },
        { title: "Tertiary", body: "Reduce complications and restore function through long-term care and rehabilitation." },
      ]},
      checks: [{ question: "Why is dengue infectious but diabetes non-infectious?", hint: "Dengue is caused by a transmissible virus; diabetes does not spread between people." }, { question: "How does eliminating stagnant water prevent disease?", hint: "It removes Aedes mosquito breeding sites and interrupts vector transmission." }],
    },
    {
      number: "4.2", title: "Body Defence", intro: "The body uses layered defences: barriers stop entry, general responses attack invaders, and specific immunity targets particular antigens.",
      sequence: { title: "Three lines of defence", instruction: "Follow a pathogen as the body responds.", steps: [
        { title: "First line", body: "Skin, mucus, cilia, tears and stomach acid block or destroy pathogens before they enter tissues." },
        { title: "Second line", body: "Inflammation, fever and phagocytes provide a rapid, non-specific response." },
        { title: "Third line", body: "Lymphocytes recognise antigens, produce specific antibodies and form memory cells." },
      ]},
      tabs: [
        { title: "Active natural", body: "After infection, the body produces its own antibodies and memory cells. Protection is usually long-lasting." },
        { title: "Active artificial", body: "Vaccination exposes the body to safe antigen material so it forms antibodies and memory cells." },
        { title: "Passive natural", body: "Maternal antibodies cross the placenta or enter breast milk. Protection is immediate but temporary." },
        { title: "Passive artificial", body: "An antiserum supplies ready-made antibodies. It acts immediately but creates no memory cells." },
      ],
      comparison: { title: "What weakens vs strengthens immunity", columns: [
        { title: "Weakens it", body: "Smoking, alcohol misuse, chronic stress, sleep deprivation and an unbalanced diet impair body defence." },
        { title: "Strengthens it", body: "Balanced nutrition, sufficient sleep, exercise, hygiene and vaccination support effective immunity." },
      ]},
      checks: [{ question: "What is the difference between an antigen and an antibody?", hint: "An antigen triggers a response; an antibody binds specifically to that antigen." }, { question: "Why is passive immunity temporary?", hint: "Ready-made antibodies are broken down and no memory cells are formed." }],
    },
  ],
  reflectionItems: ["I can compare infectious and non-infectious diseases.", "I can explain four routes of disease transmission.", "I can describe the body's three lines of defence.", "I can compare active and passive immunity."],
  miniQuiz: [
    { type: "true-false", question: "True or false: Antibiotics can cure influenza.", answer: false, explanation: "Influenza is caused by a virus; antibiotics target bacteria." },
    { type: "multiple-choice", question: "Which response provides long-lasting artificial active immunity?", options: ["Antiserum injection", "Vaccination", "Breast milk", "Skin barrier"], answerIndex: 1, explanation: "Vaccination stimulates the person's own lymphocytes and memory cells." },
  ],
};
