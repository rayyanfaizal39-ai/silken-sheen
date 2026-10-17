// @vitest-environment jsdom
import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PartnerReferralClaim } from "./PartnerReferralClaim";
import {
  confirmedPartnerCode,
  declinedPartnerReferral,
  PARTNER_ATTRIBUTION_KEY,
  storedPartnerCode,
  PARTNER_REVIEW_EVENT,
} from "@/lib/partner-attribution";

const auth = vi.hoisted(() => ({
  user: { id: "account-A", email: "a@example.test" } as { id: string; email: string } | null,
  loading: false,
  href: "/?ref=ACA8B69613",
  confirm: vi.fn(),
  google: vi.fn(),
  logout: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({ useRouterState: () => auth.href }));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({ user: auth.user, loading: auth.loading, signInWithGoogle: auth.google }),
}));
vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: { auth: { signOut: auth.logout } },
}));
vi.mock("@/routes/-upgrade.server", () => ({ confirmPartnerReferral: auth.confirm }));
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    variant: _variant,
    ...props
  }: {
    children: ReactNode;
    variant?: string;
  }) => <button {...props}>{children}</button>,
}));
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: { children: ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

let root: Root;
let container: HTMLDivElement;
async function render() {
  await act(async () => {
    root.render(<PartnerReferralClaim />);
  });
}
async function click(text: string) {
  const button = [...container.querySelectorAll("button")].find(
    (node) => node.textContent === text,
  );
  expect(button, text).toBeTruthy();
  await act(async () => {
    button!.click();
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState({}, "", "/?ref=ACA8B69613");
  auth.user = { id: "account-A", email: "a@example.test" };
  auth.href = "/?ref=ACA8B69613";
  auth.loading = false;
  auth.confirm.mockResolvedValue({ confirmed: true, partnerCode: "ACA8B69613" });
  auth.logout.mockResolvedValue({ error: null });
  auth.google.mockResolvedValue(undefined);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("two Google accounts in the same browser", () => {
  it("shows explicit account choice and never auto-claims for existing signed-in A", async () => {
    await render();
    expect(container.textContent).toContain("a@example.test");
    expect(container.textContent).toContain("Use a different Google account");
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    expect(auth.confirm).not.toHaveBeenCalled();
  });
  it("captures first-touch intent even before auth initialization finishes", async () => {
    auth.loading = true;
    await render();
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    expect(auth.confirm).not.toHaveBeenCalled();
  });
  it("keeps intent through local sign-out, Google selection, registration and explicit B confirmation", async () => {
    await render();
    const originalIntent = localStorage.getItem(PARTNER_ATTRIBUTION_KEY);
    await click("Use a different Google account");
    expect(auth.logout).toHaveBeenCalledWith({ scope: "local" });
    expect(auth.google).toHaveBeenCalledWith("/?ref=ACA8B69613");
    expect(auth.confirm).not.toHaveBeenCalled();
    // OAuth is a full-page navigation: remount the real root component after
    // registration, keeping the same origin's browser storage.
    await act(async () => root.unmount());
    root = createRoot(container);
    auth.user = { id: "account-B", email: "b@example.test" };
    auth.href = "/onboarding";
    window.history.replaceState({}, "", "/onboarding");
    await render();
    expect(container.textContent).toContain("b@example.test");
    expect(auth.confirm).not.toHaveBeenCalled();
    await click("Use this learner account");
    expect(auth.confirm).toHaveBeenCalledExactlyOnceWith({
      data: { accountId: "account-B", partnerCode: "ACA8B69613" },
    });
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-B")).toBe("ACA8B69613");
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-A")).toBeUndefined();
    expect(localStorage.getItem(PARTNER_ATTRIBUTION_KEY)).toBe(originalIntent);
  });
  it("invalidates A's choice when auth changes to B without a page reload", async () => {
    await render();
    await click("Use this learner account");
    auth.user = { id: "account-B", email: "b@example.test" };
    await render();
    expect(container.textContent).toContain("b@example.test");
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-B")).toBeUndefined();
    expect(auth.confirm).toHaveBeenCalledTimes(1);
  });
  it("ignores a late account-A response after B signs in instead of consuming B's intent", async () => {
    let resolve!: (value: unknown) => void;
    auth.confirm.mockImplementation(
      () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    await render();
    await click("Use this learner account");
    auth.user = { id: "account-B", email: "b@example.test" };
    await render();
    await act(async () => {
      resolve({ confirmed: true, partnerCode: "ACA8B69613" });
    });
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-A")).toBeUndefined();
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-B")).toBeUndefined();
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    expect(container.textContent).toContain("b@example.test");
  });
  it("retains intent after a claim failure or deciding later, and reopens on checkout review", async () => {
    auth.confirm.mockResolvedValue({ confirmed: false, message: "Please retry" });
    await render();
    await click("Use this learner account");
    expect(container.textContent).toContain("Please retry");
    await click("Decide later — keep referral");
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    await act(async () => {
      window.dispatchEvent(new Event(PARTNER_REVIEW_EVENT));
    });
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });
  it("offers to continue without the referral only after a definitive ineligible answer", async () => {
    auth.confirm.mockResolvedValue({ confirmed: false, message: "Please retry" });
    await render();
    await click("Use this learner account");
    expect(container.textContent).not.toContain("Continue without a referral");
    auth.confirm.mockResolvedValue({
      confirmed: false,
      ineligible: true,
      message: "This account has already paid",
    });
    await click("Use this learner account");
    await click("Continue without a referral");
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(declinedPartnerReferral(localStorage, sessionStorage, "account-A")).toBe(true);
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-A")).toBeUndefined();
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    // Switching to a fresh account B requires its own explicit choice.
    auth.user = { id: "account-B", email: "b@example.test" };
    await render();
    expect(declinedPartnerReferral(localStorage, sessionStorage, "account-B")).toBe(false);
    expect(container.textContent).toContain("Use this learner account");
  });
  it("shows the immutable original partner and requires explicit reconfirmation", async () => {
    auth.confirm
      .mockResolvedValueOnce({
        confirmed: false,
        partnerCode: "ACAORIGINAL",
        message: "First touch wins",
      })
      .mockResolvedValueOnce({ confirmed: true, partnerCode: "ACAORIGINAL" });
    await render();
    await click("Use this learner account");
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-A")).toBeUndefined();
    await click("Confirm original partner ACAORIGINAL");
    expect(auth.confirm).toHaveBeenLastCalledWith({
      data: { accountId: "account-A", partnerCode: "ACAORIGINAL" },
    });
    expect(confirmedPartnerCode(localStorage, sessionStorage, "account-A")).toBe("ACAORIGINAL");
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
  });
});
