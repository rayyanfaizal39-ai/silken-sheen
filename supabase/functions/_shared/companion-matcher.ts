// Cosmic Companion matching engine: 12 saved answers -> two distinct companion specifications.
//
// Pure and deterministic: integer scoring, stable tie-breaks, no randomness, clock, network or
// AI. The trusted server will run this at submission time and store the result; clients must
// never be the authority for a match. Design notes: docs/cosmic-companion-matching.md.
import { NOVA_CREATURES, answerOptionIndex, validNovaAnswer } from "./nova-answers.ts";
import {
  COMPANION_CATALOGUE,
  validateCatalogue,
  type Build,
  type CanonicalVisual,
  type CompanionArchetype,
  type CompanionCatalogue,
  type Element,
  type Personality,
  type Species,
} from "./companion-catalogue.ts";
import { canonicalJson, fnv1a32, sha256Hex } from "./content-fingerprint.ts";
import {
  PERSONALITY_SIGNALS,
  dominantPersonality,
  personalityScores,
} from "./companion-profile.ts";

export { PERSONALITY_SIGNALS };

export const MATCHER_VERSION = "cc-matcher-v1";
export const CANDIDATE_SCHEMA = "cosmic-companion-candidate/1";

/**
 * Visible option text for each question, in answer order. Must stay identical to QUESTIONS in
 * src/features/nova-cards/model.ts (a test enforces this). Question 2 uses durable creature
 * codes; read it through answerOptionIndex so the retired Phoenix code 2 still resolves.
 */
export const ANSWER_OPTIONS = [
  [
    "Discovering something new",
    "Helping a friend",
    "Solving a mystery",
    "Protecting something precious",
  ],
  NOVA_CREATURES,
  ["Fire", "Water", "Starlight", "Wind"],
  ["Soft and fluffy", "Sleek and swift", "Small and sturdy", "Graceful and majestic"],
  ["Obsidian Black / Violet", "Sapphire Blue / Gold", "Pearl / Rose", "Emerald Green / Silver"],
  ["Light the way", "Healing currents", "Stellar shield", "Winds of courage"],
  ["Floating islands", "Moonlit lagoon", "Crystal forest", "Ancient sky gardens"],
  ["Curious and playful", "Gentle and patient", "Quiet and watchful", "Bold and welcoming"],
  ["Cosmic Galaxy Eyes", "Golden Starlight Eyes", "Ocean Crystal Eyes", "Emerald Aurora Eyes"],
  ["A glowing forehead star", "Golden ear tips", "A crescent marking", "A shimmering spiral"],
  ["Try a new path", "Bring friends together", "Pause and make a plan", "Trust your instincts"],
  ["Explore together", "Grow together", "Protect each other", "Inspire each other"],
] as const;

type Weights<K extends string> = Partial<Record<K, number>>;
/** What each option of an element-bearing question supports. The explicit choice dominates. */
export const ELEMENT_SIGNALS: { question: number; options: readonly Weights<Element>[] }[] = [
  // "Which element feels like you?"
  { question: 2, options: [{ Fire: 6 }, { Water: 6 }, { Starlight: 6 }, { Wind: 6 }] },
  // "Which gift would you choose?" "Light the way" names light, not its source: flame or star.
  {
    question: 5,
    options: [{ Fire: 1, Starlight: 1 }, { Water: 2 }, { Starlight: 2 }, { Wind: 2 }],
  },
  // "Where would you explore together?" Only places whose wording names an element: a lagoon
  // (water) and two places in the open sky (air). "Crystal forest" names no element.
  { question: 6, options: [{ Wind: 1 }, { Water: 1 }, {}, { Wind: 1 }] },
];
const BUILD_BY_SILHOUETTE: readonly Build[] = ["soft", "sleek", "sturdy", "graceful"];
/** Questions that can change which companions are chosen. 4, 8 and 9 only personalise looks. */
export const SELECTION_QUESTIONS = [0, 1, 2, 3, 5, 6, 7, 10, 11] as const;
const STUDENT_PALETTES = [
  { primary: "#2B2140", secondary: "#7C5CFF", accent: "#C9B8FF" },
  { primary: "#1F4FA8", secondary: "#F2C14E", accent: "#A9C6FF" },
  { primary: "#F4EEE8", secondary: "#E89AB0", accent: "#FFD9E2" },
  { primary: "#1F8A5B", secondary: "#C9D1D9", accent: "#9BE3C0" },
] as const;

/**
 * Integer weights. Ordering guarantees (checked by tests):
 * A: species (1000) > every other term combined; the chosen element (>= 6 points) beats any
 *    other element (<= 3 points) by >= 75 > personality (<= 60) + silhouette (10).
 * B: one personality point (100) > dominant bonus (50) + element (<= 36) + silhouette (1),
 *    and the dominant bonus (50) > element (<= 36) + silhouette (1).
 * B must also differ from A in species and element; that is a filter, not a weight.
 */
export const MATCH_WEIGHTS = {
  preference: { species: 1000, element: 25, personality: 6, build: 10 },
  kindred: { personality: 100, dominant: 50, element: 4, build: 1 },
} as const;

export type MatchErrorCode = "invalid_answers" | "catalogue_coverage";
export class CompanionMatchError extends Error {
  constructor(
    readonly code: MatchErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "CompanionMatchError";
  }
}

export interface StudentSignals {
  species: Species;
  element: Element;
  silhouette: string;
  build: Build;
  colours: string;
  palette: (typeof STUDENT_PALETTES)[number];
  gift: string;
  habitat: string;
  eyes: string;
  signatureDetail: string;
  /**
   * Answer-derived support for each companion personality. Maximums differ because only
   * defensible mappings count: Explorer and Nurturer 10, Strategist 8, Guardian 7.
   */
  personality: Record<Personality, number>;
  /**
   * The most supported personality. Ties go to the personality named by the earliest
   * answer in DOMINANCE_ORDER (adventure, challenge, greeting, bond).
   */
  dominantPersonality: Personality;
  /** Answer-derived affinity for each element (0-9). */
  elementAffinity: Record<Element, number>;
}

export interface MatchReason {
  basis: "creature" | "element" | "personality" | "silhouette" | "look" | "difference";
  text: string;
  /** Zero-based indexes of the answers this reason is drawn from. */
  answerIndexes: number[];
}

export interface CompanionCandidateSpec {
  schema: typeof CANDIDATE_SCHEMA;
  matcherVersion: string;
  catalogueVersion: string;
  slot: "a" | "b";
  kind: "preference" | "kindred";
  candidateId: string;
  archetypeId: string;
  name: string;
  species: Species;
  element: Element;
  personality: Personality;
  strengths: string[];
  learningStyle: string;
  tagline: string;
  description: string;
  story: string;
  traits: string[];
  abilities: string[];
  match: { headline: string; reasons: MatchReason[] };
  visual: {
    style: string;
    canonical: CanonicalVisual;
    personalisation: {
      /** "main": the student's colours lead. "accent": the companion keeps its own palette. */
      paletteRole: "main" | "accent";
      palette: { name: string; primary: string; secondary: string; accent: string };
      eyes: string | null;
      /** The chosen silhouette, as a styling preference only: never the companion's anatomy. */
      silhouette: string | null;
      signatureDetail: string | null;
      rule: string;
    };
  };
  /** SHA-256 of the matcher version, catalogue version and answers this was derived from. */
  inputFingerprint: string;
  /** SHA-256 of every other field except candidateId. */
  fingerprint: string;
}

export interface CompanionMatch {
  matcherVersion: string;
  catalogueVersion: string;
  inputFingerprint: string;
  candidates: [CompanionCandidateSpec, CompanionCandidateSpec];
}

function assertAnswers(answers: unknown): asserts answers is readonly number[] {
  if (!Array.isArray(answers) || answers.length !== 12)
    throw new CompanionMatchError("invalid_answers", "Exactly twelve answers are required.");
  for (let i = 0; i < 12; i++)
    if (!validNovaAnswer(i, answers[i]))
      throw new CompanionMatchError("invalid_answers", `Answer ${i + 1} is not a valid choice.`);
}

const option = (answers: readonly number[], question: number) =>
  ANSWER_OPTIONS[question][answerOptionIndex(question, answers[question])];

/** Answer-derived signals. Throws CompanionMatchError for malformed answers. */
export function deriveSignals(answers: readonly number[]): StudentSignals {
  assertAnswers(answers);
  const personality = personalityScores(answers);
  const elementAffinity: Record<Element, number> = { Fire: 0, Water: 0, Starlight: 0, Wind: 0 };
  for (const s of ELEMENT_SIGNALS)
    for (const [e, w] of Object.entries(s.options[answers[s.question]]))
      elementAffinity[e as Element] += w;
  return {
    species: option(answers, 1) as Species,
    element: option(answers, 2) as Element,
    silhouette: option(answers, 3),
    build: BUILD_BY_SILHOUETTE[answers[3]],
    colours: option(answers, 4),
    palette: STUDENT_PALETTES[answers[4]],
    gift: option(answers, 5),
    habitat: option(answers, 6),
    eyes: option(answers, 8),
    signatureDetail: option(answers, 9),
    personality,
    dominantPersonality: dominantPersonality(answers, personality),
    elementAffinity,
  };
}

type Ranked = { archetype: CompanionArchetype; score: number; tie: number };
function best(ranked: Ranked[]): CompanionArchetype {
  ranked.sort(
    (x, y) =>
      y.score - x.score ||
      x.tie - y.tie ||
      (x.archetype.id < y.archetype.id ? -1 : x.archetype.id > y.archetype.id ? 1 : 0),
  );
  return ranked[0].archetype;
}

/**
 * Choose the two archetypes. A: the student's described companion (their creature and
 * element). B: the strongest personality match among companions of another species and
 * another element.
 */
export function selectArchetypes(
  answers: readonly number[],
  catalogue: CompanionCatalogue = COMPANION_CATALOGUE,
): { a: CompanionArchetype; b: CompanionArchetype; signals: StudentSignals } {
  if (catalogue !== COMPANION_CATALOGUE) validateCatalogue(catalogue);
  const signals = deriveSignals(answers);
  // Stable per-student tie-break, so exact ties do not always favour catalogue order. Seeded
  // only by the answers that can affect selection, read as visible choices: colours, eyes,
  // signature detail and the legacy Phoenix code can never change which companions appear.
  const choices = SELECTION_QUESTIONS.map((q) => answerOptionIndex(q, answers[q]));
  const seed = `${MATCHER_VERSION}|${catalogue.version}|${choices.join(",")}|`;
  const tie = (a: CompanionArchetype) => fnv1a32(seed + a.id);
  const p = MATCH_WEIGHTS.preference;
  const a = best(
    catalogue.archetypes.map((archetype) => ({
      archetype,
      tie: tie(archetype),
      score:
        (archetype.species === signals.species ? p.species : 0) +
        signals.elementAffinity[archetype.element] * p.element +
        signals.personality[archetype.personality] * p.personality +
        (archetype.build === signals.build ? p.build : 0),
    })),
  );
  const k = MATCH_WEIGHTS.kindred;
  const otherSpecies = catalogue.archetypes.filter((x) => x.species !== a.species);
  const different = otherSpecies.filter((x) => x.element !== a.element);
  // Documented fallback for future catalogues: keep a different species even if every other
  // species shares A's element. Catalogue v1 always has a fully different companion.
  const others = different.length ? different : otherSpecies;
  if (!others.length)
    throw new CompanionMatchError("catalogue_coverage", "No second companion of another species.");
  const b = best(
    others.map((archetype) => ({
      archetype,
      tie: tie(archetype),
      score:
        signals.personality[archetype.personality] * k.personality +
        (archetype.personality === signals.dominantPersonality ? k.dominant : 0) +
        signals.elementAffinity[archetype.element] * k.element +
        (archetype.build === signals.build ? k.build : 0),
    })),
  );
  return { a, b, signals };
}

// "an Explorer", but "a Unicorn" (a "you" sound).
const article = (word: string) => (/^(?:[AEIO]|U(?!ni))/.test(word) ? "an" : "a");
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const PERSONALITY_EVIDENCE: Record<number, (choice: string) => string> = {
  0: (c) => `You picked “${c}” as what draws you into an adventure.`,
  10: (c) => `You picked “${c}” for when a challenge appears.`,
  7: (c) => `You picked “${c}” for how your companion greets a stranger.`,
  11: (c) => `You picked “${c}” as your bond.`,
};

function personalityReason(archetype: CompanionArchetype, answers: readonly number[]): MatchReason {
  const support = PERSONALITY_SIGNALS.filter(
    (s) => (s.options[answers[s.question]][archetype.personality] ?? 0) > 0,
  ).slice(0, 2);
  const spirit = `${archetype.name} has ${article(archetype.personality)} ${archetype.personality} spirit`;
  return {
    basis: "personality",
    text: support.length
      ? `${spirit}. ${support.map((s) => PERSONALITY_EVIDENCE[s.question](option(answers, s.question))).join(" ")}`
      : `${spirit}, a different strength to bring to your adventures.`,
    answerIndexes: support.map((s) => s.question),
  };
}

/** Why the companion's element fits, citing the first answer that supports it. */
function elementSupport(
  archetype: CompanionArchetype,
  s: StudentSignals,
  answers: readonly number[],
) {
  const n = archetype.name;
  const e = archetype.element;
  if ((ELEMENT_SIGNALS[1].options[answers[5]][e] ?? 0) > 0)
    return { text: `${n}'s ${e} magic suits the gift you picked, “${s.gift}”.`, index: 5 };
  if ((ELEMENT_SIGNALS[2].options[answers[6]][e] ?? 0) > 0)
    return {
      text: `${n}'s ${e} magic suits “${s.habitat}”, where you would explore together.`,
      index: 6,
    };
  return null;
}

function preferenceReasons(
  a: CompanionArchetype,
  s: StudentSignals,
  answers: readonly number[],
  catalogue: CompanionCatalogue,
): MatchReason[] {
  const reasons: MatchReason[] = [];
  reasons.push(
    a.species === s.species
      ? {
          basis: "creature",
          text: `You chose the ${s.species}, and ${a.name} is a ${a.species}.`,
          answerIndexes: [1],
        }
      : {
          basis: "creature",
          text: `You chose the ${s.species}. This collection has no ${s.species} that fits yet, so ${a.name} the ${a.species} is your closest match.`,
          answerIndexes: [1],
        },
  );
  if (a.element === s.element) {
    reasons.push({
      basis: "element",
      text: `${a.name} carries ${a.element} magic, the element you picked.`,
      answerIndexes: [2],
    });
  } else {
    const missing = !catalogue.archetypes.some(
      (x) => x.species === a.species && x.element === s.element,
    );
    const support = elementSupport(a, s, answers);
    reasons.push({
      basis: "element",
      text:
        (missing
          ? `You picked ${s.element}, but no ${a.species} in this collection carries ${s.element} yet, so ${a.name} carries ${a.element} magic instead.`
          : `You picked ${s.element}; ${a.name} carries ${a.element} magic.`) +
        (support ? ` ${support.text}` : ""),
      answerIndexes: support ? [2, support.index] : [2],
    });
  }
  reasons.push(personalityReason(a, answers));
  if (a.build === s.build)
    reasons.push({
      basis: "silhouette",
      text: `${a.name}'s shape matches the silhouette you picked, “${s.silhouette}”.`,
      answerIndexes: [3],
    });
  reasons.push({
    basis: "look",
    text: `${a.name} will wear your colours, ${s.colours}, with ${s.eyes} and ${lowerFirst(s.signatureDetail)}.`,
    answerIndexes: [4, 8, 9],
  });
  return reasons;
}

function kindredReasons(
  b: CompanionArchetype,
  a: CompanionArchetype,
  s: StudentSignals,
  answers: readonly number[],
): MatchReason[] {
  const reasons: MatchReason[] = [personalityReason(b, answers)];
  reasons.push({
    basis: "difference",
    text: `${b.name} is ${article(b.species)} ${b.species} with ${b.element} magic, a different kind of companion from ${a.name}.`,
    answerIndexes: [],
  });
  const support =
    b.element === s.element
      ? { text: `${b.name} also carries ${b.element} magic, the element you picked.`, index: 2 }
      : elementSupport(b, s, answers);
  if (support)
    reasons.push({ basis: "element", text: support.text, answerIndexes: [support.index] });
  reasons.push({
    basis: "look",
    text: `${b.name} keeps its own look, with accents in your colours, ${s.colours}.`,
    answerIndexes: [4],
  });
  return reasons;
}

function buildSpec(
  slot: "a" | "b",
  archetype: CompanionArchetype,
  reasons: MatchReason[],
  s: StudentSignals,
  catalogue: CompanionCatalogue,
  inputFingerprint: string,
): CompanionCandidateSpec {
  const preference = slot === "a";
  const body: Omit<CompanionCandidateSpec, "candidateId" | "fingerprint"> = {
    schema: CANDIDATE_SCHEMA,
    matcherVersion: MATCHER_VERSION,
    catalogueVersion: catalogue.version,
    slot,
    kind: preference ? "preference" : "kindred",
    archetypeId: archetype.id,
    name: archetype.name,
    species: archetype.species,
    element: archetype.element,
    personality: archetype.personality,
    strengths: [...archetype.strengths],
    learningStyle: archetype.learningStyle,
    tagline: archetype.tagline,
    description: archetype.description,
    story: archetype.story,
    traits: [...archetype.traits],
    abilities: [...archetype.abilities],
    match: {
      headline: archetype.explanation[preference ? "preference" : "kindred"].replaceAll(
        "{name}",
        archetype.name,
      ),
      reasons,
    },
    visual: {
      style: catalogue.style,
      canonical: { ...archetype.visual, palette: { ...archetype.visual.palette } },
      personalisation: {
        paletteRole: preference ? "main" : "accent",
        palette: { name: s.colours, ...s.palette },
        eyes: preference ? s.eyes : null,
        silhouette: preference ? s.silhouette : null,
        signatureDetail: preference ? s.signatureDetail : null,
        rule: preference
          ? "Keep the canonical anatomy, proportions, face shape and signature feature. Use the student's colours as the main palette and add their chosen eyes and signature detail. The chosen silhouette may guide pose and fur, feather or scale styling only, never the species anatomy or proportions."
          : "Keep the canonical anatomy, face, eyes, markings and signature feature. Use the student's colours only as accents.",
      },
    },
    inputFingerprint,
  };
  const fingerprint = sha256Hex(canonicalJson(body));
  return { ...body, candidateId: `cc1-${slot}-${fingerprint.slice(0, 20)}`, fingerprint };
}

/**
 * Match a student's 12 saved answers (durable codes, as stored) to two companion candidates.
 * Throws CompanionMatchError for malformed answers or a catalogue that cannot supply two species.
 */
export function matchCompanions(
  answers: readonly number[],
  catalogue: CompanionCatalogue = COMPANION_CATALOGUE,
): CompanionMatch {
  const { a, b, signals } = selectArchetypes(answers, catalogue);
  const input = [...answers];
  const inputFingerprint = sha256Hex(
    canonicalJson({
      matcherVersion: MATCHER_VERSION,
      catalogueVersion: catalogue.version,
      answers: input,
    }),
  );
  return {
    matcherVersion: MATCHER_VERSION,
    catalogueVersion: catalogue.version,
    inputFingerprint,
    candidates: [
      buildSpec(
        "a",
        a,
        preferenceReasons(a, signals, input, catalogue),
        signals,
        catalogue,
        inputFingerprint,
      ),
      buildSpec("b", b, kindredReasons(b, a, signals, input), signals, catalogue, inputFingerprint),
    ],
  };
}

/** Recompute a stored specification's fingerprint, e.g. before trusting it again. */
export function verifyCandidateFingerprint(spec: CompanionCandidateSpec): boolean {
  const { candidateId, fingerprint, ...body } = spec;
  const expected = sha256Hex(canonicalJson(body));
  return fingerprint === expected && candidateId === `cc1-${spec.slot}-${expected.slice(0, 20)}`;
}

validateCatalogue(COMPANION_CATALOGUE);
