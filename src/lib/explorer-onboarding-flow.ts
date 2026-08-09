import type { ExplorerFormLevel } from "@/lib/explorer-profile";
import type { SchoolSearchResult } from "@/lib/schools";

export type ExplorerOnboardingStep = 1 | 2 | 3 | 4;

export const EXPLORER_SUPPORTED_AGES = Array.from({ length: 9 }, (_, index) => String(index + 10));

interface ExplorerOnboardingDraft {
  displayName: string;
  age: string;
  formLevel: ExplorerFormLevel | "";
  school: SchoolSearchResult | null;
}

export function getExplorerStepError(
  step: ExplorerOnboardingStep,
  draft: ExplorerOnboardingDraft,
): string | null {
  if (step === 1 && !draft.displayName.trim()) return "Add a display name to continue.";
  if (step === 2 && !draft.formLevel) return "Choose your Form level to continue.";
  if (step === 2 && (!draft.age || !EXPLORER_SUPPORTED_AGES.includes(draft.age))) {
    return "Choose your age to continue.";
  }
  if (step === 3 && !draft.school) {
    return "Choose a verified school from the search results.";
  }
  return null;
}

export function nextExplorerStep(step: ExplorerOnboardingStep): ExplorerOnboardingStep {
  return Math.min(step + 1, 4) as ExplorerOnboardingStep;
}

export function previousExplorerStep(step: ExplorerOnboardingStep): ExplorerOnboardingStep {
  return Math.max(step - 1, 1) as ExplorerOnboardingStep;
}
