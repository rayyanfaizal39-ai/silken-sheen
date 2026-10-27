import type { NovaTraits } from "./model";
import type { StudioState } from "./studio-model";
import type { CompanionCandidateSpec } from "../../../supabase/functions/_shared/companion-matcher";

/**
 * One companion offered at the reveal. Each candidate carries its own values so the two cards
 * and the comparison never share a traits object. Missing values stay undefined and are shown
 * as "not available yet" — never invented.
 */
export type CompanionCandidate = {
  id: "a" | "b";
  name?: string;
  species?: string;
  /** Only real, existing artwork. Without it the card shows a mystery silhouette. */
  artworkUrl?: string;
  personality?: string;
  element?: string;
  strengths?: string[];
  learningStyle?: string;
  uniqueQuality?: string;
  qualities?: string[];
  abilities?: string[];
  description?: string;
  /** The companion's own story (matched companions); profiles fall back to the description. */
  story?: string;
  /** Why this companion matches the student. */
  reason?: string;
  /** Answer-based reasons behind the match (matched companions only). */
  reasons?: string[];
};

export const CANDIDATE_LABEL = { a: "Companion A", b: "Companion B" } as const;

/** Shown wherever a candidate value does not exist, instead of inventing one. */
export const NOT_AVAILABLE = "Not available yet";
export const candidateTitle = (c: CompanionCandidate) => c.name ?? CANDIDATE_LABEL[c.id];
export const listValues = (values?: string[]) =>
  values && values.length ? values.join(", ") : undefined;

/**
 * Today's saved data: two Origin artworks of ONE identity. Both candidates therefore carry the
 * same identity values and differ only in artwork. Names, strengths, learning styles and match
 * reasons are not stored per candidate, so they are left undefined rather than made up.
 */
export function candidatesFromStudio(
  traits: NovaTraits,
  candidates: StudioState["candidates"],
): CompanionCandidate[] {
  return candidates.map((c) => ({
    id: c.candidate,
    species: traits.creature,
    artworkUrl: c.url,
    personality: traits.personality,
    element: traits.element,
    uniqueQuality: traits.marking,
    qualities: [traits.behaviour, traits.eyes, traits.appearance],
    abilities: [traits.ability],
    description: `A ${traits.behaviour.toLowerCase()} companion from ${traits.habitat.toLowerCase()}.`,
  }));
}

/**
 * A companion stored by the server for this student (cc-matcher-v1). Every value comes from
 * that candidate's own specification; artwork only from its own approved image.
 */
export function companionFromSpec(
  spec: CompanionCandidateSpec,
  artworkUrl?: string,
  { chosen = false }: { chosen?: boolean } = {},
): CompanionCandidate {
  return {
    id: spec.slot,
    name: spec.name,
    species: spec.species,
    artworkUrl,
    personality: spec.personality,
    element: spec.element,
    strengths: [...spec.strengths],
    learningStyle: spec.learningStyle,
    uniqueQuality: spec.tagline,
    qualities: [...spec.traits],
    abilities: [...spec.abilities],
    description: spec.description,
    story: spec.story,
    reason: spec.match.headline,
    // Once chosen, drop the reason that compares it with the other candidate by name.
    reasons: spec.match.reasons
      .filter((r) => !(chosen && r.basis === "difference"))
      .map((r) => r.text),
  };
}

/**
 * The two companions a matched card offers at the reveal, each with its own artwork. Empty
 * until the server says the reveal is ready (it sends no specifications before then).
 */
export function companionsFromState(state: StudioState): CompanionCandidate[] {
  const art = new Map(state.candidates.map((c) => [c.candidate, c.url]));
  return (state.companions ?? []).map((spec) => companionFromSpec(spec, art.get(spec.slot)));
}

/** True when both candidates come from one shared identity (today's real data). */
export const sharesIdentity = (companions: CompanionCandidate[]) =>
  companions.length === 2 &&
  companions[0].personality === companions[1].personality &&
  companions[0].element === companions[1].element &&
  companions[0].species === companions[1].species;

/**
 * Fictional design data for the preview only: two independently matched companions, as the
 * future matching system should provide. No species and no artwork are defined.
 */
export const FICTIONAL_CANDIDATES: CompanionCandidate[] = [
  {
    id: "a",
    name: "Lumi",
    personality: "Explorer",
    element: "Starlight",
    strengths: ["Curiosity", "Creative thinking"],
    learningStyle: "Learns by exploring",
    uniqueQuality: "Lights the way through new ideas",
    qualities: ["Curious", "Gentle", "Bright"],
    abilities: ["Light the way", "Spark of wonder"],
    description: "A gentle, curious companion who loves discovering something new every day.",
    reason: "Your answers show a love of discovery and asking big questions.",
  },
  {
    id: "b",
    name: "Sol",
    personality: "Guardian",
    element: "Wind",
    strengths: ["Courage", "Steady focus"],
    learningStyle: "Learns by practising",
    uniqueQuality: "Stays calm when challenges appear",
    qualities: ["Brave", "Loyal", "Steady"],
    abilities: ["Winds of courage", "Steady shield"],
    description: "A brave, loyal companion who keeps going when things get difficult.",
    reason: "Your answers show patience and care for the people around you.",
  },
];
