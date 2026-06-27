/** Static Phase 1 demo content. Replace with Curiosity/Challenge/Story bank calls in Phase 2. */

export const AMAZING_FACTS = [
  {
    title: "Octopuses have three hearts.",
    body: "One pumps blood around the body. The other two pump blood to the gills.",
  },
  {
    title: "Honey never spoils.",
    body: "Archaeologists have found edible honey in ancient Egyptian tombs over 3000 years old.",
  },
  {
    title: "A bolt of lightning is hotter than the Sun's surface.",
    body: "Lightning can reach 30,000°C — about 5 times hotter than the surface of the Sun.",
  },
  {
    title: "Bananas are berries, but strawberries aren't.",
    body: "Botanically, a berry must grow from a single flower with one ovary — bananas qualify, strawberries don't.",
  },
];

export const CHALLENGE_QUESTION = {
  question: "Which planet is closest to the Sun?",
  options: ["Mercury", "Venus", "Earth", "Mars"],
  correctIndex: 0,
};

export const MISSION_PROGRESS = {
  subject: "Science",
  form: "Form 2",
  chapter: "Chapter 6",
  notesDone: true,
  quizDone: false,
  flashcardsDone: false,
};

export const CHAT_DEMO = [
  { from: "student" as const, text: "I don't understand photosynthesis." },
  { from: "cikgu" as const, text: "No worries, Commander! We'll make this easier together." },
];

export const DISCOVERY_TOPICS = [
  { id: "space", label: "Space", icon: "rocket" as const },
  { id: "history", label: "History", icon: "castle" as const },
  { id: "science", label: "Science", icon: "flask" as const },
  { id: "geography", label: "Geography", icon: "globe" as const },
  { id: "math", label: "Mathematics", icon: "sigma" as const },
];

export const DISCOVERY_CONTENT: Record<string, { title: string; body: string }> = {
  space: {
    title: "The Edge of the Solar System",
    body: "The Voyager 1 probe, launched in 1977, is now over 24 billion km from Earth — the farthest human-made object in space.",
  },
  history: {
    title: "The Library of Alexandria",
    body: "Ancient Alexandria's great library may have held up to 400,000 scrolls, making it one of history's largest knowledge centers.",
  },
  science: {
    title: "Tardigrades Survive Almost Anything",
    body: "These microscopic creatures can survive in the vacuum of space, extreme cold, and radiation that would kill almost any other animal.",
  },
  geography: {
    title: "A River Beneath the Ocean",
    body: "The Black Sea has an underwater 'river' — a fast-moving channel of denser water flowing along the seabed.",
  },
  math: {
    title: "Zero Was Once Controversial",
    body: "The concept of zero as a number wasn't widely accepted until mathematicians in India formalized it around the 5th century.",
  },
};
