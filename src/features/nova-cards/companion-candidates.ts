import type { NovaTraits } from "./model";
import type { StudioState } from "./studio-model";

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
  /** Why this companion matches the student. */
  reason?: string;
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
