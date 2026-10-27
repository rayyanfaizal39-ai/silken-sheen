// What the trusted server stores when a student submits: the cc-matcher-v1 match and each
// candidate's Visual DNA, all verified before they reach the database. Pure, so the server and
// tests share one implementation.
import {
  matchCompanions,
  verifyCandidateFingerprint,
  type CompanionMatch,
} from "./companion-matcher.ts";
import { deriveVisualDna, validateDna, type VisualDna } from "./companion-dna.ts";

export interface CompanionSubmission {
  match: CompanionMatch;
  dna: [VisualDna, VisualDna];
}

/**
 * @param answers the student's SAVED answers (read from the database, never from the browser)
 * @param studentId the verified account
 * @param secret the server-only DNA secret (COSMIC_COMPANION_DNA_SECRET)
 */
export function prepareCompanionSubmission(
  answers: readonly number[],
  studentId: string,
  secret: string,
): CompanionSubmission {
  const match = matchCompanions(answers);
  if (!match.candidates.every(verifyCandidateFingerprint))
    throw new Error("Companion match failed verification");
  const dna = match.candidates.map((spec) => deriveVisualDna(spec, { studentId, secret })) as [
    VisualDna,
    VisualDna,
  ];
  dna.forEach(validateDna);
  return { match, dna };
}
