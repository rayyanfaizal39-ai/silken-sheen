/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
  signInWithGoogle: vi.fn(),
  signInWithEmail: vi.fn(),
  signUpWithEmail: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    search: _search,
    ...props
  }: {
    children: ReactNode;
    to: string;
    search?: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({
    ...auth,
    isConfigured: true,
    devAuthBypass: false,
    loading: false,
  }),
}));

import { AuthForm } from "./AuthForm";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

let host: HTMLDivElement;
let root: Root;

function setInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function submitSignup() {
  const inputs = host.querySelectorAll("input");
  act(() => {
    setInput(inputs[0] as HTMLInputElement, "student@example.com");
    setInput(inputs[1] as HTMLInputElement, "secure-password");
  });
  await act(async () => {
    host
      .querySelector("form")
      ?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

beforeEach(() => {
  auth.signInWithGoogle.mockReset().mockResolvedValue(undefined);
  auth.signInWithEmail.mockReset().mockResolvedValue(undefined);
  auth.signUpWithEmail.mockReset();
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("AuthForm existing-account protection", () => {
  it("uses the same neutral recovery message for a confirmation-style signup response", async () => {
    auth.signUpWithEmail.mockResolvedValue({ needsConfirmation: true });
    await act(async () => root.render(<AuthForm mode="signup" />));

    await submitSignup();

    expect(host.textContent).toContain(
      "You may already have an AcadeMY account. Try logging in or resetting your password.",
    );
    expect(host.querySelector('a[href="/login"]')?.textContent).toContain("Log In");
    expect(host.querySelector('a[href="/forgot-password"]')?.textContent).toContain(
      "Forgot Password",
    );
  });

  it("never renders Supabase's account-existence error if it reaches the form", async () => {
    auth.signUpWithEmail.mockRejectedValue({
      code: "user_already_exists",
      message: "User already registered",
    });
    await act(async () => root.render(<AuthForm mode="signup" />));

    await submitSignup();

    expect(host.textContent).toContain("You may already have an AcadeMY account.");
    expect(host.textContent).not.toContain("User already registered");
  });

  it("continues through the existing Google sign-in method without creating an email identity", async () => {
    await act(async () => root.render(<AuthForm mode="signup" returnTo="/home" />));
    const googleButton = [...host.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Continue with Google"),
    );

    await act(async () => googleButton?.click());

    expect(auth.signInWithGoogle).toHaveBeenCalledExactlyOnceWith("/home");
    expect(auth.signUpWithEmail).not.toHaveBeenCalled();
  });
});
