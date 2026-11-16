import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({
    signInWithGoogle: vi.fn(),
    signInWithEmail: vi.fn(),
    signUpWithEmail: vi.fn(),
    isConfigured: true,
    devAuthBypass: false,
    loading: false,
  }),
}));

import { AuthForm } from "./AuthForm";

describe("AuthForm", () => {
  it("renders the complete returning-user form without a world selector", () => {
    const markup = renderToStaticMarkup(<AuthForm mode="signin" />);
    expect(markup).toContain("Continue with Google");
    expect(markup).toContain("Forgot Password?");
    expect(markup).toContain(">Log In<");
    expect(markup).toContain("Start Your Journey");
    expect(markup).not.toContain("Choose Your Learning World");
  });

  it("renders account creation, password help, and a visibility toggle", () => {
    const markup = renderToStaticMarkup(<AuthForm mode="signup" />);
    expect(markup).toContain(">Create Account<");
    expect(markup).toContain("Use at least 6 characters.");
    expect(markup).toContain('aria-label="Show password"');
    expect(markup).toContain("Already have an account?");
  });
});
