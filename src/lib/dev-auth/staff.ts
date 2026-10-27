import type { AdminProfile } from "@/lib/admin.types";
import { devStudentById } from "./students";

/** Local staff profile for the admin guard. Students are returned as non-admins. */
export function devStaffAdminProfile(userId: string): AdminProfile | null {
  const account = devStudentById(userId);
  if (!account) return null;
  return {
    id: account.id,
    full_name: account.name,
    email: account.email,
    role: account.role === "admin" ? "admin" : "student",
    plan: "free",
  };
}
