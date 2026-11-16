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

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@tanstack/react-router")>()),
  createFileRoute:
    () =>
    (options: Record<string, unknown>) => ({ options }),
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({
    ...auth,
    user: null,
    loading: false,
    isConfigured: true,
    devAuthBypass: false,
  }),
}));

import { RegistrationPage } from "@/components/auth/RegistrationPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

let host: HTMLDivElement;
let root: Root;

function buttonNamed(name: string) {
  return [...host.querySelectorAll("button")].find((button) =>
    button.textContent?.replace(/\s+/g, " ").trim().includes(name),
  );
}

function setInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function chooseJuniorAndContinue() {
  await act(async () => buttonNamed("Choose Junior")?.click());
  await act(async () => buttonNamed("Continue")?.click());
}

beforeEach(() => {
  auth.signInWithGoogle.mockReset();
  auth.signInWithEmail.mockReset();
  auth.signUpWithEmail.mockReset();
  document.cookie = "academy-registration-intent-v1=; Path=/; Max-Age=0; SameSite=Lax";
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root.render(<RegistrationPage />));
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  document.cookie = "academy-registration-intent-v1=; Path=/; Max-Age=0; SameSite=Lax";
});

describe("registration learning-world navigation", () => {
  it("shows a prominent selected-world panel and returns without creating an account", async () => {
    await chooseJuniorAndContinue();

    expect(host.textContent).toContain("Selected Learning World");
    expect(host.textContent).toContain("AcadeMY Junior");
    expect(host.textContent).toContain("Form 1");

    const changeWorld = buttonNamed("Change Learning World");
    expect(changeWorld).toBeTruthy();
    expect(changeWorld?.className).toContain("min-h-12");

    await act(async () => changeWorld?.click());

    expect(host.textContent).toContain("Choose Your Learning World");
    expect(host.querySelector("#signup-email")).toBeNull();
    expect(auth.signUpWithEmail).not.toHaveBeenCalled();
    expect(auth.signInWithGoogle).not.toHaveBeenCalled();
  });

  it("preserves the email draft but clears the password when revisiting world selection", async () => {
    await chooseJuniorAndContinue();

    act(() => {
      setInput(host.querySelector("#signup-email") as HTMLInputElement, "learner@example.com");
      setInput(host.querySelector("#signup-password") as HTMLInputElement, "temporary-secret");
    });

    await act(async () => buttonNamed("Change Learning World")?.click());
    await chooseJuniorAndContinue();

    expect((host.querySelector("#signup-email") as HTMLInputElement).value).toBe(
      "learner@example.com",
    );
    expect((host.querySelector("#signup-password") as HTMLInputElement).value).toBe("");
    expect(auth.signUpWithEmail).not.toHaveBeenCalled();
  });

  it("keeps unsupported learning worlds unavailable", () => {
    expect(host.querySelectorAll('button[disabled][aria-describedby*="primary"]')).toHaveLength(1);
    expect(host.querySelectorAll('button[disabled][aria-describedby*="senior"]')).toHaveLength(1);
  });
});
