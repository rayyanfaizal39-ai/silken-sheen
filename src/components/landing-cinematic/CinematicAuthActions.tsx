import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/context/auth-context";
import { useSignInModal } from "@/context/sign-in-modal";

type AppRoute = "/dashboard" | "/login" | "/notes" | "/parent-dashboard" | "/upgrade";

export function CinematicAuthCta({
  children,
  className,
  authenticatedLabel = "Dashboard",
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
    <button className={className} type="button" onClick={open}>
      {children}
    </button>
  );
}

export function CinematicLoginAction({ className }: { className: string }) {
  const { user } = useAuth();

  return (
    <Link className={className} to={user ? "/dashboard" : "/login"}>
      {user ? "Dashboard" : "Log In"}
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
