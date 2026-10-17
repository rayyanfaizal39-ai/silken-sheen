// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PartnerReferenceCapture } from "./PartnerReferenceCapture";
import { storedPartnerCode } from "@/lib/partner-attribution";

const router = vi.hoisted(() => ({ href: "/?ref=ACA8B69613", replace: vi.fn() }));
const server = vi.hoisted(() => ({ rpc: vi.fn(), createCheckout: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ history: { replace: router.replace } }),
  useRouterState: () => router.href,
}));
// Any accidental claim or server call from the capture component would hit these.
vi.mock("@/lib/supabase", () => ({ isSupabaseConfigured: true, supabase: { rpc: server.rpc } }));
vi.mock("@/routes/-upgrade.server", () => ({ createCheckout: server.createCheckout }));

let root: Root;
let container: HTMLDivElement;
async function visit(href: string) {
  router.href = href;
  window.history.replaceState({}, "", href);
  await act(async () => {
    root.render(<PartnerReferenceCapture />);
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  localStorage.clear();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("private partner reference capture", () => {
  it("shows learners nothing: no dialog, no code, no referral wording", async () => {
    await visit("/upgrade?ref=ACA8B69613");
    expect(container.innerHTML).toBe("");
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.textContent ?? "").not.toMatch(/ACA8B69613|referral|partner|commission/i);
  });
  it("stores the first-touch code and removes it from the address bar", async () => {
    await visit("/upgrade?ref=ACA8B69613&plan=premium");
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
    expect(router.replace).toHaveBeenCalledExactlyOnceWith("/upgrade?plan=premium");
  });
  it("never claims for whichever account is signed in, during navigation or account switches", async () => {
    await visit("/?ref=ACA8B69613");
    for (const path of ["/auth/callback", "/onboarding", "/home", "/upgrade"]) await visit(path);
    expect(server.rpc).not.toHaveBeenCalled();
    expect(server.createCheckout).not.toHaveBeenCalled();
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
  });
  it("keeps the original partner when a later link is opened", async () => {
    await visit("/?ref=ACA8B69613");
    await visit("/?ref=ACALATER01");
    expect(storedPartnerCode(localStorage)).toBe("ACA8B69613");
  });
  it("does nothing on ordinary pages", async () => {
    await visit("/home");
    expect(router.replace).not.toHaveBeenCalled();
    expect(storedPartnerCode(localStorage)).toBeUndefined();
  });
});
