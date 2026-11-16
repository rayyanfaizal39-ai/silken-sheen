import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ user: null as null | { id: string } }));
vi.mock("@/context/auth-context", () => ({ useAuth: () => ({ user: state.user }) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

import { CinematicAuthCta, CinematicLoginAction } from "./CinematicAuthActions";

describe("homepage authentication actions", () => {
  beforeEach(() => {
    state.user = null;
  });

  it.each(["Start Your Journey", "Start Free", "Start Learning", "Sign Up"])(
    "routes %s to the one registration entrance",
    (label) => {
      const markup = renderToStaticMarkup(
        <CinematicAuthCta className="cta">{label}</CinematicAuthCta>,
      );
      expect(markup).toContain('href="/register"');
      expect(markup).toContain(label);
    },
  );

  it("keeps Log In on the returning-user route", () => {
    expect(renderToStaticMarkup(<CinematicLoginAction className="login" />)).toContain(
      'href="/login"',
    );
  });

  it("preserves Continue Learning and the existing dashboard route for authenticated students", () => {
    state.user = { id: "existing-student" };

    const markup = renderToStaticMarkup(
      <CinematicAuthCta
        className="cta"
        authenticatedLabel="Continue Learning"
        authenticatedTo="/dashboard"
      >
        Start Your Journey
      </CinematicAuthCta>,
    );

    expect(markup).toContain('href="/dashboard"');
    expect(markup).toContain("Continue Learning");
    expect(markup).not.toContain("Start Your Journey");
    expect(markup).not.toContain('href="/register"');
  });

  it("does not show registration or Log In actions to an authenticated student", () => {
    state.user = { id: "existing-student" };

    expect(renderToStaticMarkup(<CinematicLoginAction className="login" />)).toBe("");
    expect(
      renderToStaticMarkup(<CinematicAuthCta className="cta">Sign Up</CinematicAuthCta>),
    ).not.toContain("Sign Up");
  });
});
