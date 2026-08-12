import { supabase } from "@/lib/supabase";

export const EXPLORER_FORM_LEVELS = ["Form 1", "Form 2", "Form 3"] as const;

export type ExplorerFormLevel = (typeof EXPLORER_FORM_LEVELS)[number];
export type ProfileRole = "student" | "teacher" | "admin";

export interface ExplorerProfile {
  displayName: string | null;
  age: number | null;
  formLevel: ExplorerFormLevel | null;
  schoolId: string | null;
  onboardingCompleted: boolean;
  role: ProfileRole;
}

export interface ExplorerProfileInput {
  displayName: string;
  age: number;
  formLevel: ExplorerFormLevel;
  schoolId: string;
}

export interface ExplorerProfileEditInput {
  displayName: string;
  age: number | null;
  formLevel: ExplorerFormLevel | null;
  schoolId: string | null;
}

export interface ExplorerProfileEditPatch {
  full_name: string;
  age: number | null;
  form: ExplorerFormLevel | null;
  school_id: string | null;
}

interface ExplorerProfileRow {
  full_name: string | null;
  age: number | null;
  form: string | null;
  school_id: string | null;
  onboarding_completed: boolean;
  role: ProfileRole;
}

function isExplorerFormLevel(value: string | null): value is ExplorerFormLevel {
  return EXPLORER_FORM_LEVELS.some((level) => level === value);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeDisplayName(displayName: string): string {
  const normalized = displayName.trim();
  if (!normalized) throw new Error("Display name is required.");
  if (normalized.length > 80) throw new Error("Display name must be 80 characters or fewer.");
  return normalized;
}

function validateAge(age: number | null): void {
  if (age !== null && (!Number.isInteger(age) || age < 10 || age > 18)) {
    throw new Error("Age must be a whole number between 10 and 18.");
  }
}

function mapExplorerProfile(row: ExplorerProfileRow): ExplorerProfile {
  return {
    displayName: row.full_name,
    age: row.age,
    formLevel: isExplorerFormLevel(row.form) ? row.form : null,
    schoolId: row.school_id,
    onboardingCompleted: row.onboarding_completed,
    role: row.role,
  };
}

export function normalizeExplorerProfileInput(input: ExplorerProfileInput): ExplorerProfileInput {
  const displayName = normalizeDisplayName(input.displayName);
  validateAge(input.age);
  if (!isExplorerFormLevel(input.formLevel)) {
    throw new Error("Choose Form 1, Form 2, or Form 3.");
  }
  if (!isUuid(input.schoolId)) {
    throw new Error("Choose a verified school from the search results.");
  }

  return { ...input, displayName };
}

export function normalizeExplorerProfileEditInput(
  input: ExplorerProfileEditInput,
): ExplorerProfileEditInput {
  const displayName = normalizeDisplayName(input.displayName);
  validateAge(input.age);
  if (input.formLevel !== null && !isExplorerFormLevel(input.formLevel)) {
    throw new Error("Choose Form 1, Form 2, or Form 3.");
  }
  if (input.schoolId !== null && !isUuid(input.schoolId)) {
    throw new Error("Choose a verified school from the search results.");
  }
  return { ...input, displayName };
}

export function buildExplorerProfileEditPatch(
  input: ExplorerProfileEditInput,
): ExplorerProfileEditPatch {
  const normalized = normalizeExplorerProfileEditInput(input);
  return {
    full_name: normalized.displayName,
    age: normalized.age,
    form: normalized.formLevel,
    school_id: normalized.schoolId,
  };
}

export async function getExplorerProfile(userId: string): Promise<ExplorerProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, age, form, school_id, onboarding_completed, role")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapExplorerProfile(data as ExplorerProfileRow) : null;
}

export async function saveCompletedExplorerProfile(
  userId: string,
  input: ExplorerProfileInput,
): Promise<ExplorerProfile> {
  const normalized = normalizeExplorerProfileInput(input);
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        full_name: normalized.displayName,
        age: normalized.age,
        form: normalized.formLevel,
        school_id: normalized.schoolId,
        onboarding_completed: true,
      },
      { onConflict: "id" },
    )
    .select("full_name, age, form, school_id, onboarding_completed, role")
    .single();

  if (error) throw error;
  return mapExplorerProfile(data as ExplorerProfileRow);
}

export async function saveExplorerProfileEdits(
  userId: string,
  input: ExplorerProfileEditInput,
): Promise<ExplorerProfile> {
  const patch = buildExplorerProfileEditPatch(input);
  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId)
    .select("full_name, age, form, school_id, onboarding_completed, role")
    .single();

  if (error) throw error;
  return mapExplorerProfile(data as ExplorerProfileRow);
}

export function needsExplorerOnboarding(profile: ExplorerProfile | null): boolean {
  return profile?.role === "student" && !profile.onboardingCompleted;
}
