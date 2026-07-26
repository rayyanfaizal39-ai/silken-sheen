import { supabase } from "@/lib/supabase";
import type { AdminProfile } from "@/lib/admin.types";

export async function getProfileForAdminCheck(userId: string): Promise<AdminProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, plan")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return (data as AdminProfile | null) ?? null;
}

export function hasAdministratorRole(profile: Pick<AdminProfile, "role"> | null) {
  return profile?.role?.trim().toLowerCase() === "admin";
}
