import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/context/auth-context";
import { useSignInModal } from "@/context/sign-in-modal";

type AppRoute = "/dashboard" | "/login" | "/notes" | "/parent-dashboard" | "/upgrade";

export function CinematicAuthCta({
  children,
  className,
  authenticatedLabel = "Student Dashboard",
  authenticatedTo = "/dashboard",
}: {
  children: ReactNode;
  className: string;
  authenticatedLabel?: ReactNode;
  authenticatedTo?: AppRoute;
}) {
  const { user } = useAuth();
  const { open } = useSignInModal();

  if (user) {
    return (
      <Link className={className} to={authenticatedTo}>
        {authenticatedLabel}
      </Link>
    );
  }

  return (
    <button className={className} type="button" onClick={() => open("signup")}>
      {children}
    </button>
  );
}

export function CinematicLoginAction({ className }: { className: string }) {
  const { user } = useAuth();

  // Signed-in visitors already get the primary Student Dashboard action next
  // to this slot. Rendering a second dashboard link here creates two
  // indistinguishable choices in the navigation.
  if (user) return null;

  return (
    <Link className={className} to="/login">
      Log In
    </Link>
  );
}

export function CinematicUpgradeLink({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <Link className={className} to="/upgrade">
      {children}
    </Link>
  );
}
