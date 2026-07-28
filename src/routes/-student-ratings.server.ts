import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "../lib/supabase.server";

export interface StudentRatingSummary {
  averageRating: number | null;
  totalRatings: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

const ratingSchema = z.object({
  rating: z.number().int().min(1).max(5),
});

async function requireStudent() {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Student ratings are temporarily unavailable.");

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || data.user.is_anonymous) {
    throw new Error("You must be logged in to rate AcadeMY.");
  }

  return { supabase, user: data.user };
}

export const getStudentRatingSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<StudentRatingSummary> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Student ratings are temporarily unavailable.");

    const { data, error } = await supabase.rpc("get_student_rating_summary");
    if (error) {
      if (import.meta.env.DEV) console.error("[student-ratings] summary failed:", error);
      throw new Error("Student ratings could not be loaded.");
    }

    const row = Array.isArray(data) ? data[0] : data;
    return {
      averageRating:
        row?.average_rating === null || row?.average_rating === undefined
          ? null
          : Number(row.average_rating),
      totalRatings: Number(row?.total_ratings ?? 0),
      breakdown: {
        1: Number(row?.one_star_count ?? 0),
        2: Number(row?.two_star_count ?? 0),
        3: Number(row?.three_star_count ?? 0),
        4: Number(row?.four_star_count ?? 0),
        5: Number(row?.five_star_count ?? 0),
      },
    };
  },
);

export const getMyStudentRating = createServerFn({ method: "GET" }).handler(
  async (): Promise<number | null> => {
    const { supabase, user } = await requireStudent();
    const { data, error } = await supabase
      .from("student_ratings")
      .select("rating")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) throw new Error("Your rating could not be loaded.");
    return data?.rating ? Number(data.rating) : null;
  },
);

export const submitStudentRating = createServerFn({ method: "POST" })
  .validator((input: unknown) => ratingSchema.parse(input))
  .handler(async ({ data }): Promise<{ rating: number }> => {
    const { supabase, user } = await requireStudent();
    const result = await supabase
      .from("student_ratings")
      .upsert(
        {
          user_id: user.id,
          rating: data.rating,
        },
        { onConflict: "user_id" },
      )
      .select("rating")
      .single();

    if (result.error) {
      if (import.meta.env.DEV) console.error("[student-ratings] submission failed:", result.error);
      throw new Error("Your rating could not be saved. Please try again.");
    }

    return { rating: Number(result.data.rating) };
  });
