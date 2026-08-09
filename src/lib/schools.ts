import { supabase } from "@/lib/supabase";

export const SCHOOL_SEARCH_MIN_CHARACTERS = 3;
export const SCHOOL_SEARCH_LIMIT = 12;
export const SCHOOL_SEARCH_DEBOUNCE_MS = 300;

export interface SchoolSearchResult {
  id: string;
  schoolCode: string | null;
  schoolName: string;
  schoolType: string | null;
  state: string;
  district: string | null;
  postcode: string | null;
}

interface SchoolSearchRow {
  id: string;
  school_code: string | null;
  school_name: string;
  school_type: string | null;
  state: string;
  district: string | null;
  postcode: string | null;
}

export function normalizeSchoolSearchQuery(query: string): string | null {
  const normalized = query.trim().replace(/\s+/g, " ");
  return normalized.length >= SCHOOL_SEARCH_MIN_CHARACTERS ? normalized : null;
}

export function formatSchoolLocation(school: Pick<SchoolSearchResult, "district" | "state">) {
  return [school.district, school.state].filter(Boolean).join(", ");
}

export async function searchSchools(
  query: string,
  signal?: AbortSignal,
): Promise<SchoolSearchResult[]> {
  const normalized = normalizeSchoolSearchQuery(query);
  if (!normalized) return [];

  let request = supabase.rpc("search_schools", {
    search_query: normalized,
    max_results: SCHOOL_SEARCH_LIMIT,
  });
  if (signal) request = request.abortSignal(signal);

  const { data, error } = await request;
  if (error) throw error;

  return ((data ?? []) as SchoolSearchRow[]).map((row) => ({
    id: row.id,
    schoolCode: row.school_code,
    schoolName: row.school_name,
    schoolType: row.school_type,
    state: row.state,
    district: row.district,
    postcode: row.postcode,
  }));
}
