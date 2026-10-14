/**
 * Phase 1 companion-card design prototype.
 * Pure/side-effect-free. NOT an issuance, identity, AI or Supabase service.
 * Personality labels describe preferred approaches, not psychological diagnoses.
 */
export const ARCHETYPES = ["explorer", "strategist", "challenger", "creator"] as const;
export type Archetype = (typeof ARCHETYPES)[number];

type Choice = { label: string; archetype: Archetype };
export type ProfileQuestion = { id: string; prompt: string; choices: readonly Choice[] };

export const PROFILE_QUESTIONS: readonly ProfileQuestion[] = [
  { id: "q01", prompt: "You arrive on a mysterious new planet. What do you do first?", choices: [
    { label: "Explore a path nobody has tried.", archetype: "explorer" },
    { label: "Study a map and plan the route.", archetype: "strategist" },
    { label: "Face the toughest obstacle.", archetype: "challenger" },
    { label: "Build a tool to help the team.", archetype: "creator" },
  ] },
  { id: "q02", prompt: "A study problem has no obvious solution. What sounds most fun?", choices: [
    { label: "Search for a new explanation.", archetype: "explorer" },
    { label: "Split it into smaller logical steps.", archetype: "strategist" },
    { label: "Keep trying until it works.", archetype: "challenger" },
    { label: "Draw or model a new approach.", archetype: "creator" },
  ] },
  { id: "q03", prompt: "Your group gets a new mission. Which part would you choose?", choices: [
    { label: "Scout and collect clues.", archetype: "explorer" },
    { label: "Set priorities and timelines.", archetype: "strategist" },
    { label: "Handle a difficult challenge.", archetype: "challenger" },
    { label: "Make something original.", archetype: "creator" },
  ] },
  { id: "q04", prompt: "A science video sparks your interest. What happens next?", choices: [
    { label: "Look up related discoveries.", archetype: "explorer" },
    { label: "Organize what the video explained.", archetype: "strategist" },
    { label: "Try a demanding practice question.", archetype: "challenger" },
    { label: "Create an illustrated explanation.", archetype: "creator" },
  ] },
  { id: "q05", prompt: "You have an hour to learn something unfamiliar. Your first move?", choices: [
    { label: "Browse and see what catches my eye.", archetype: "explorer" },
    { label: "Make a mini learning plan.", archetype: "strategist" },
    { label: "Attempt a hard task immediately.", archetype: "challenger" },
    { label: "Turn the topic into a project.", archetype: "creator" },
  ] },
  { id: "q06", prompt: "Your team discovers an unusual object. How do you help?", choices: [
    { label: "Investigate where it came from.", archetype: "explorer" },
    { label: "Compare the clues carefully.", archetype: "strategist" },
    { label: "Test it in a safe, difficult challenge.", archetype: "challenger" },
    { label: "Imagine what it could become.", archetype: "creator" },
  ] },
  { id: "q07", prompt: "You finish a quiz early. What would you rather do?", choices: [
    { label: "Discover a new subject.", archetype: "explorer" },
    { label: "Review my answers for patterns.", archetype: "strategist" },
    { label: "Try a tougher practice set.", archetype: "challenger" },
    { label: "Make flashcards or a mind map.", archetype: "creator" },
  ] },
  { id: "q08", prompt: "A friend asks for help studying. How do you respond?", choices: [
    { label: "Find a fresh example together.", archetype: "explorer" },
    { label: "Explain the steps in order.", archetype: "strategist" },
    { label: "Practice until we both improve.", archetype: "challenger" },
    { label: "Invent a memorable way to explain it.", archetype: "creator" },
  ] },
  { id: "q09", prompt: "Which mission reward would make you smile most?", choices: [
    { label: "Access to a new mysterious world.", archetype: "explorer" },
    { label: "A detailed star-navigation chart.", archetype: "strategist" },
    { label: "A badge for a difficult quest.", archetype: "challenger" },
    { label: "A kit to customize my spaceship.", archetype: "creator" },
  ] },
  { id: "q10", prompt: "How do you like to mark your progress?", choices: [
    { label: "By new things I discover.", archetype: "explorer" },
    { label: "By milestones on my plan.", archetype: "strategist" },
    { label: "By challenges I overcome.", archetype: "challenger" },
    { label: "By things I make and share.", archetype: "creator" },
  ] },
];

/** One answer per question. Ties: the earliest selected choice among tied types wins. */
export function scoreLearningProfile(answers: readonly Archetype[]) {
  if (answers.length !== PROFILE_QUESTIONS.length) {
    throw new Error("Exactly ten personality answers are required.");
  }
  const scores: Record<Archetype, number> = { explorer: 0, strategist: 0, challenger: 0, creator: 0 };
  answers.forEach((answer, i) => {
    if (!ARCHETYPES.includes(answer)) throw new Error("Invalid personality answer.");
    const valid = PROFILE_QUESTIONS[i].choices.some((option) => option.archetype === answer);
    if (!valid) throw new Error("Answer does not belong to question.");
    scores[answer] += 1;
  });
  const maxScore = Math.max(...Object.values(scores));
  const tied = ARCHETYPES.filter((key) => scores[key] === maxScore);
  const winner = answers.find((answer) => tied.includes(answer)) ?? tied[0];
  return { archetype: winner, scores, quizVersion: "learning-profile-v1" as const };
}

export const PERSONALITY_COLORS: Record<Archetype, string> = {
  explorer: "#69d9e7", strategist: "#8ba8ff", challenger: "#ff9b63", creator: "#eab2fc",
};

/** Zodiac choices are OPTIONAL art/story motifs, never scoring inputs. No date of birth needed. */
export const WESTERN_ZODIAC = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra",
  "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
export const CHINESE_ZODIAC = [
  "rat", "ox", "tiger", "rabbit", "dragon", "snake",
  "horse", "goat", "monkey", "rooster", "dog", "pig",
] as const;

export const PALETTES = [
  { id: "ember", name: "Ember", hex: "#fcb76f" },
  { id: "tidal", name: "Tidal", hex: "#7cdbea" },
  { id: "iris", name: "Iris", hex: "#b6a2ff" },
  { id: "bloom", name: "Bloom", hex: "#ffb0dc" },
  { id: "aurora", name: "Aurora", hex: "#83f4c3" },
  { id: "solar", name: "Solar", hex: "#ffe18c" },
  { id: "glacier", name: "Glacier", hex: "#97c9ff" },
  { id: "coral", name: "Coral", hex: "#ff9a91" },
] as const;
export const MARKINGS = ["nova-star", "crescent", "comet", "orbit", "diamond", "sunburst", "spark", "feather", "rune"] as const;
export const ACCESSORIES = ["compass", "satchel", "crystal", "telescope", "badge", "scroll", "winglet", "mini-planet", "lantern", "star-map"] as const;
export const SCENES = ["sunrise", "moonrise", "nebula", "ice-rings", "floating-isles", "meteor", "starlake", "clouds", "golden-desert", "deep-space", "aurora-field", "blue-moon"] as const;
export const FRAMES = ["orbit-a", "orbit-b", "faceted", "starfall", "crest", "constellation", "chevron", "royal"] as const;

export type CardDesign = {
  masterVersion: "nova-v1";
  archetype: Archetype;
  paletteId: (typeof PALETTES)[number]["id"];
  marking: (typeof MARKINGS)[number];
  accessory: (typeof ACCESSORIES)[number];
  scene: (typeof SCENES)[number];
  frame: (typeof FRAMES)[number];
};

export type PreviewCard = { index: number; nickname: string; design: CardDesign };
const SAMPLE_NAMES = [
  "Pyrix", "Lumina", "Vega", "Mira", "Orion", "Astra", "Solin", "Lyra", "Kiro", "Nix",
  "Ember", "Zuri", "Eiko", "Cielo", "Auri", "Rumi", "Sora", "Tavi", "Elio", "Vesper",
];

/** A stable canonical key for demo uniqueness checks; production will hash this server-side. */
export function designKey(design: CardDesign): string {
  return [
    design.masterVersion, design.archetype, design.paletteId,
    design.marking, design.accessory, design.scene, design.frame,
  ].join("|");
}

/** Prominent design slots: minimum 3 differences for this illustrative gallery. */
export function visualDistance(a: CardDesign, b: CardDesign): number {
  return Number(a.paletteId !== b.paletteId) +
    Number(a.marking !== b.marking) +
    Number(a.accessory !== b.accessory) +
    Number(a.scene !== b.scene) +
    Number(a.frame !== b.frame);
}

/** 20 reproducible sample cards: no identity issuance, uploads, network, randomness or database writes. */
export function generatePhase1Previews(count = 20): PreviewCard[] {
  if (!Number.isInteger(count) || count < 1 || count > SAMPLE_NAMES.length) {
    throw new Error("Phase 1 preview supports between 1 and 20 sample cards.");
  }
  const cards = Array.from({ length: count }, (_, index) => {
    const category = index % ARCHETYPES.length;
    const variant = Math.floor(index / ARCHETYPES.length);
    const design: CardDesign = {
      masterVersion: "nova-v1",
      archetype: ARCHETYPES[category],
      paletteId: PALETTES[(variant * 3 + category) % PALETTES.length].id,
      marking: MARKINGS[(variant * 2 + category) % MARKINGS.length],
      accessory: ACCESSORIES[(variant * 5 + category) % ACCESSORIES.length],
      scene: SCENES[(variant * 7 + category) % SCENES.length],
      frame: FRAMES[(variant * 3 + category) % FRAMES.length],
    };
    return { index, nickname: SAMPLE_NAMES[index], design };
  });
  for (let i = 0; i < cards.length; i += 1) {
    for (let j = i + 1; j < cards.length; j += 1) {
      if (designKey(cards[i].design) === designKey(cards[j].design)) {
        throw new Error("Duplicate preview configuration detected.");
      }
      if (visualDistance(cards[i].design, cards[j].design) < 3) {
        throw new Error("Preview designs are insufficiently distinct.");
      }
    }
  }
  return cards;
}

/** Demonstrates collision handling only. Real claims must use a DB unique index and transaction. */
export function reserveFirstUnusedDesign(candidates: readonly CardDesign[], claimed: Set<string>): CardDesign {
  for (const candidate of candidates) {
    const key = designKey(candidate);
    if (!claimed.has(key)) {
      claimed.add(key);
      return candidate;
    }
  }
  throw new Error("No unused design configuration available.");
}
