// Why a Nova request could not load the student's account or card. Server functions throw
// these exact messages; pages map them back so students see the real cause, never a guess.
export const NOVA_ACCESS_ERRORS = {
  unconfigured: "AcadeMY Cards is not connected to the AcadeMY database in this environment.",
  signedOut: "Sign in with your AcadeMY account to continue.",
  storagePending: "Nova storage is awaiting its reviewed database setup.",
} as const;

export type NovaAccessProblem = keyof typeof NOVA_ACCESS_ERRORS | "unavailable";

export function novaAccessProblem(error: unknown): NovaAccessProblem {
  const message = error instanceof Error ? error.message : String(error ?? "");
  for (const [problem, text] of Object.entries(NOVA_ACCESS_ERRORS))
    if (message === text) return problem as NovaAccessProblem;
  return "unavailable";
}

export function novaAccessCopy(problem: NovaAccessProblem): {
  title: string;
  body: string;
  signIn: boolean;
} {
  switch (problem) {
    case "signedOut":
      return {
        title: "Sign in to enter your Nova universe",
        body: "Use your existing AcadeMY account. If you are already signed in to AcadeMY on this site, your session continues automatically.",
        signIn: true,
      };
    case "unconfigured":
      return {
        title: "AcadeMY Cards isn't connected here",
        body: "This environment has no AcadeMY database connection, so your account and Nova cannot be loaded. Your subscription and learning progress are not affected.",
        signIn: false,
      };
    case "storagePending":
      return {
        title: "Nova Studio isn't open yet",
        body: "Your AcadeMY account is fine, but Nova storage is still awaiting its reviewed setup. Your learning progress is not affected.",
        signIn: false,
      };
    default:
      return {
        title: "We couldn't verify your Nova access",
        body: "AcadeMY Cards could not reach the server. This does not mean your subscription has expired. Please try again.",
        signIn: false,
      };
  }
}
