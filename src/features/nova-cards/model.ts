export const STAGES = [
  { name: "Origin", xp: 0 },
  { name: "Awakened", xp: 1600 },
  { name: "Ascended", xp: 9000 },
  { name: "Mythic", xp: 32000 },
  { name: "Legendary", xp: 80000 },
] as const;

export function evolution(xp: number) {
  const safe = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  const index = STAGES.reduce((stage, entry, i) => (safe >= entry.xp ? i : stage), 0);
  const next = STAGES[index + 1];
  return {
    stage: index + 1,
    name: STAGES[index].name,
    level: Math.floor(safe / 400) + 1,
    nextXp: next?.xp ?? null,
    percent: next
      ? Math.min(100, ((safe - STAGES[index].xp) / (next.xp - STAGES[index].xp)) * 100)
      : 100,
  };
}

export const QUESTIONS = [
  {
    label: "What draws you into an adventure?",
    options: ["Discovering something new", "Helping a friend", "Solving a mystery"],
  },
  { label: "Choose your companion's creature.", options: ["Phoenix", "Magical Fox"] },
  { label: "Which element feels like you?", options: ["Fire", "Water", "Starlight"] },
  {
    label: "Choose a silhouette.",
    options: ["Soft and fluffy", "Sleek and swift", "Small and sturdy"],
  },
  {
    label: "Choose your colours.",
    options: ["Obsidian Black / Violet", "Sapphire Blue / Gold", "Pearl / Rose"],
  },
  {
    label: "Which gift would you choose?",
    options: ["Light the way", "Healing currents", "Stellar shield"],
  },
  {
    label: "Where would you explore together?",
    options: ["Floating islands", "Moonlit lagoon", "Crystal forest"],
  },
  {
    label: "How does your companion greet a stranger?",
    options: ["Curious and playful", "Gentle and patient", "Quiet and watchful"],
  },
  {
    label: "Choose your companion's eyes.",
    options: ["Cosmic Galaxy Eyes", "Golden Starlight Eyes", "Ocean Crystal Eyes"],
  },
  {
    label: "Pick a little signature detail.",
    options: ["A glowing forehead star", "Golden ear tips", "A crescent marking"],
  },
  {
    label: "When a challenge appears, you…",
    options: ["Try a new path", "Bring friends together", "Pause and make a plan"],
  },
  {
    label: "Choose your bond.",
    options: ["Explore together", "Grow together", "Protect each other"],
  },
] as const;

export interface NovaTraits {
  personality: string;
  creature: string;
  element: string;
  appearance: string;
  colours: string;
  ability: string;
  habitat: string;
  behaviour: string;
  eyes: string;
  marking: string;
  approach: string;
  bond: string;
}

/** The retired third creature answer is still a valid stored Phoenix identity. Never rewrite it. */
export function answerOptionIndex(question: number, answer: number) {
  return question === 1 && answer === 2 ? 0 : answer;
}
export function validNovaAnswer(question: number, answer: number) {
  const option = answerOptionIndex(question, answer);
  return (
    Number.isInteger(answer) && option >= 0 && option < (QUESTIONS[question]?.options.length ?? 0)
  );
}

export function traitsFromAnswers(answers: number[]): NovaTraits {
  if (answers.length !== 12 || answers.some((a, i) => !validNovaAnswer(i, a)))
    throw new Error("Answer all twelve questions.");
  const values = QUESTIONS.map((question, i) => question.options[answerOptionIndex(i, answers[i])]);
  return {
    personality: ["Explorer", "Nurturer", "Strategist"][answers[0]],
    creature: values[1],
    element: values[2],
    appearance: values[3],
    colours: values[4],
    ability: values[5],
    habitat: values[6],
    behaviour: values[7],
    eyes: values[8],
    marking: values[9],
    approach: values[10],
    bond: values[11],
  };
}

export interface NovaCard {
  publicId: string;
  serial: string;
  username: string;
  traits: NovaTraits;
  variant: "a" | "b";
  rarity: string;
  xp: number;
  /** Approved stage art shown to others; can lag earned XP. */
  stage?: number;
  sharing: boolean;
  demo?: boolean;
  artworkPath?: string | null;
  artworkUrl?: string | null;
}

export const cardPath = (id: string) => `/card/c/${encodeURIComponent(id)}`;
export const cardUrl = (id: string, origin: string) => new URL(cardPath(id), origin).href;
export const validPublicId = (id: string) =>
  /^demo-(rayyan|mia)$/.test(id) ||
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const DEMO_CARDS: NovaCard[] = [
  {
    publicId: "demo-rayyan",
    serial: "000000000001",
    username: "Rayyan",
    traits: traitsFromAnswers(Array(12).fill(0)),
    variant: "a",
    rarity: "Rare",
    xp: 0,
    sharing: true,
    demo: true,
  },
  {
    publicId: "demo-mia",
    serial: "000000000002",
    username: "Mia",
    traits: traitsFromAnswers([0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]),
    variant: "b",
    rarity: "Rare",
    xp: 0,
    sharing: true,
    demo: true,
  },
];

export const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!,
  );
