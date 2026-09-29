import type { ProfileRole } from "@/lib/explorer-profile";

export const SENIOR_HOME_URL = "https://senior.myacademy.my/home";

export type AcademyTrack = "junior" | "senior";

export function getAcademyForForm(form: string | null | undefined): AcademyTrack | null {
  if (form === "Form 1" || form === "Form 2" || form === "Form 3") return "junior";
  if (form === "Form 4" || form === "Form 5") return "senior";
  return null;
}

function isSeniorRedirectExemptPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/auth" ||
    pathname.startsWith("/auth/")
  );
}

export function getStudentSeniorHomeRedirect(input: {
  role: ProfileRole | null | undefined;
  form: string | null | undefined;
  pathname: string;
}): string | null {
  if (input.role !== "student") return null;
  if (getAcademyForForm(input.form) !== "senior") return null;
  if (isSeniorRedirectExemptPath(input.pathname)) return null;
  return SENIOR_HOME_URL;
}
