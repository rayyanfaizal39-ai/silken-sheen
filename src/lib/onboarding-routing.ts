const ONBOARDING_EXEMPT_ROUTES = new Set([
  "/",
  "/account/billing",
  "/contact",
  "/command-center-preview",
  "/explore-academy",
  "/forgot-password",
  "/landing",
  "/landing-preview",
  "/login",
  "/onboarding",
  "/parent",
  "/parent-dashboard",
  "/payment-return",
  "/privacy",
  "/terms",
  "/upgrade",
]);

const ONBOARDING_EXEMPT_PREFIXES = ["/academy/", "/admin", "/auth/"];

const STUDENT_PROTECTED_ROUTES = new Set([
  "/companion",
  "/dashboard",
  "/flashcards",
  "/home",
  "/leaderboard",
  "/mindmaps",
  "/notes",
  "/quizzes",
  "/subjects",
  "/tracker",
]);

export function isOnboardingExemptRoute(pathname: string): boolean {
  return (
    ONBOARDING_EXEMPT_ROUTES.has(pathname) ||
    ONBOARDING_EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

export function shouldRedirectToOnboarding(pathname: string, onboardingRequired: boolean): boolean {
  return onboardingRequired && !isOnboardingExemptRoute(pathname);
}

export function shouldRedirectToLogin(
  pathname: string,
  authLoading: boolean,
  hasUser: boolean,
): boolean {
  return !authLoading && !hasUser && STUDENT_PROTECTED_ROUTES.has(pathname);
}
