import {
  NOVA_CREATURES,
  answerOptionIndex,
  validNovaAnswer,
} from "../../../supabase/functions/_shared/nova-answers";
import { cardsPaths } from "./paths";
export {
  answerOptionIndex,
  answerValue,
  validNovaAnswer,
} from "../../../supabase/functions/_shared/nova-answers";

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
    options: [
      "Discovering something new",
      "Helping a friend",
      "Solving a mystery",
      "Protecting something precious",
    ],
  },
  { label: "Choose your companion's creature.", options: NOVA_CREATURES },
  { label: "Which element feels like you?", options: ["Fire", "Water", "Starlight", "Wind"] },
  {
    label: "Choose a silhouette.",
    options: ["Soft and fluffy", "Sleek and swift", "Small and sturdy", "Graceful and majestic"],
  },
  {
    label: "Choose your colours.",
    options: [
      "Obsidian Black / Violet",
      "Sapphire Blue / Gold",
      "Pearl / Rose",
      "Emerald Green / Silver",
    ],
  },
  {
    label: "Which gift would you choose?",
    options: ["Light the way", "Healing currents", "Stellar shield", "Winds of courage"],
  },
  {
    label: "Where would you explore together?",
    options: ["Floating islands", "Moonlit lagoon", "Crystal forest", "Ancient sky gardens"],
  },
  {
    label: "How does your companion greet a stranger?",
    options: [
      "Curious and playful",
      "Gentle and patient",
      "Quiet and watchful",
      "Bold and welcoming",
    ],
  },
  {
    label: "Choose your companion's eyes.",
    options: [
      "Cosmic Galaxy Eyes",
      "Golden Starlight Eyes",
      "Ocean Crystal Eyes",
      "Emerald Aurora Eyes",
    ],
  },
  {
    label: "Pick a little signature detail.",
    options: [
      "A glowing forehead star",
      "Golden ear tips",
      "A crescent marking",
      "A shimmering spiral",
    ],
  },
  {
    label: "When a challenge appears, you…",
    options: [
      "Try a new path",
      "Bring friends together",
      "Pause and make a plan",
      "Trust your instincts",
    ],
  },
  {
    label: "Choose your bond.",
    options: ["Explore together", "Grow together", "Protect each other", "Inspire each other"],
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

export function traitsFromAnswers(answers: number[]): NovaTraits {
  if (answers.length !== 12 || answers.some((a, i) => !validNovaAnswer(i, a)))
    throw new Error("Answer all twelve questions.");
  const values = QUESTIONS.map((question, i) => question.options[answerOptionIndex(i, answers[i])]);
  return {
    personality: ["Explorer", "Nurturer", "Strategist", "Guardian"][answers[0]],
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

/** Public summary of a matched card's chosen companion (no answers, no match reasons). */
export interface PublicCompanion {
  archetypeId: string;
  name: string;
  species: string;
  element: string;
  personality: string;
  tagline: string;
  description: string;
  traits: string[];
  abilities: string[];
}

export interface NovaCard {
  publicId: string;
  serial: string;
  username: string;
  /** Answer-derived traits: legacy cards only. Matched cards never share their answers. */
  traits: NovaTraits | null;
  /** Matched cards: the chosen companion, once chosen. */
  companion?: PublicCompanion | null;
  variant: "a" | "b";
  rarity: string;
  /** Fictional design previews may supply XP; Phase 1 saved cards never do. */
  xp?: number;
  /** Phase 1 saved cards remain at the permanent Origin stage. */
  stage?: number;
  sharing: boolean;
  demo?: boolean;
  artworkPath?: string | null;
  artworkUrl?: string | null;
}

/** A card with answer-derived traits: legacy cards and the fictional demo cards. */
export interface LegacyNovaCard extends NovaCard {
  traits: NovaTraits;
}

/** What a card face shows: the chosen companion for matched cards, the saved traits for legacy. */
export function cardFace(card: NovaCard) {
  const c = card.companion;
  if (c)
    return {
      eyebrow: `${c.element} · ${c.personality}`,
      name: c.name,
      species: c.species,
      description: c.description,
      details: [c.tagline, c.traits.join(" · "), c.abilities.join(" · ")],
      alt: `${c.name} the ${c.species}`,
      // Only used if approved artwork cannot load: a neutral drawing of the species.
      fallbackTraits: { ...EMPTY_TRAITS, creature: c.species, element: c.element } as NovaTraits,
    };
  const t = card.traits ?? EMPTY_TRAITS;
  return {
    eyebrow: `${t.element} · ${t.personality}`,
    name: "Nova",
    species: t.creature,
    description: `A ${t.behaviour.toLowerCase()} companion from ${t.habitat.toLowerCase()}. ${t.bond}.`,
    details: [t.colours, t.eyes, t.ability],
    alt: `${t.colours} ${t.creature}, ${t.eyes}`,
    fallbackTraits: t,
  };
}
const EMPTY_TRAITS: NovaTraits = {
  personality: "",
  creature: "",
  element: "",
  appearance: "",
  colours: "",
  ability: "",
  habitat: "",
  behaviour: "",
  eyes: "",
  marking: "",
  approach: "",
  bond: "",
};

export const cardPath = cardsPaths.publicCard;
export const cardUrl = (id: string, origin: string) => new URL(cardPath(id), origin).href;
export const validPublicId = (id: string) =>
  /^demo-(rayyan|mia)$/.test(id) ||
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export { validSerial } from "./serial";

export const DEMO_CARDS: LegacyNovaCard[] = [
  {
    publicId: "demo-rayyan",
    // Fictional stage-1 Origin card (C / Common), birth-year digits 12. Not a student record.
    serial: "C12482915037",
    username: "Rayyan",
    traits: traitsFromAnswers(Array(12).fill(0)),
    variant: "a",
    rarity: "Common",
    xp: 0,
    sharing: true,
    demo: true,
  },
  {
    publicId: "demo-mia",
    // Fictional stage-1 Origin card (C / Common), birth-year digits 11. Not a student record.
    serial: "C11918472650",
    username: "Mia",
    traits: traitsFromAnswers([0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]),
    variant: "b",
    rarity: "Common",
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
