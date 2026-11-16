// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { NovaCard } from "@/features/nova-cards/model";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
    "aria-label": ariaLabel,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    search?: unknown;
    "aria-label"?: string;
  }) => (
    <a href={to} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

vi.mock("@/context/auth-context", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/features/nova-cards/local-session", () => ({
  loadNovaDashboardStatus: vi.fn(),
  loadOwnerNova: vi.fn(),
}));

import { useAuth } from "@/context/auth-context";
import { loadNovaDashboardStatus, loadOwnerNova } from "@/features/nova-cards/local-session";
import { CosmicPortalWidget } from "./CosmicPortalWidget";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  vi.mocked(loadNovaDashboardStatus).mockReset();
  vi.mocked(loadOwnerNova).mockReset();
  vi.mocked(useAuth).mockReset();
});

async function mount(variant: "hero" | "summary" = "hero") {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<CosmicPortalWidget variant={variant} />));
  for (let i = 0; i < 30; i += 1) {
    if (host.querySelector("[data-state]")?.getAttribute("data-state") !== "loading") break;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  return host;
}

const ownerPortrait = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
  username: "Aisha",
  traits: null,
  companion: {
    archetypeId: "fox",
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Gentle",
    tagline: "A quiet light",
    description: "A starlight fox.",
    traits: ["curious"],
    abilities: ["glow"],
  },
  variant: "b",
  rarity: "Rare",
  stage: 1,
  sharing: false,
  artworkUrl: "https://example.test/owner-portrait.png",
  artworkPath: "owner/path.png",
} as NovaCard;

describe("CosmicPortalWidget", () => {
  it("shows the discovery portal for guests without fictional pet art", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, devAuthBypass: false } as never);
    const host = await mount();
    const widget = host.querySelector("[data-state='new']")!;
    expect(widget.getAttribute("data-mark")).toBe("portal");
    expect(host.textContent).toContain("Discover My");
    expect(host.textContent).toContain("Companion");
    expect(host.textContent).toContain("Start My Journey");
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toContain("academy-cosmic-portal-v1");
    expect(imgs[0].getAttribute("alt")).toBe("");
    expect(host.querySelector(".cosmic-portal-widget__art svg")).toBeNull();
  });

  it("keeps the portal art and continue CTA for a saved unfinished journey", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: false,
      ready: false,
      pending: false,
      failed: false,
      unfinished: true,
    });
    const host = await mount();
    expect(host.querySelector("[data-state='unfinished']")?.getAttribute("data-mark")).toBe(
      "portal",
    );
    expect(host.querySelector("img")?.getAttribute("src")).toContain("academy-cosmic-portal-v1");
    expect(host.textContent).toContain("Continue My Journey");
  });

  it("shows egg waiting art while a portrait is being crafted", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: false,
      ready: false,
      pending: true,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([
      {
        ...ownerPortrait,
        artworkUrl: undefined,
        artworkPath: undefined,
        crafting: true,
        artOptions: [],
      },
      { active: true } as never,
    ]);
    const host = await mount();
    expect(host.querySelector("[data-state='waiting']")?.getAttribute("data-mark")).toBe("egg");
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toContain("academy-cosmic-egg-v2");
    expect(host.querySelector(".cosmic-portal-widget__art svg")).toBeNull();
    expect(host.textContent).toContain("Your Companion Is Being Crafted");
    expect(host.textContent).toContain("Your unique portrait is on its way.");
    expect(host.textContent).toContain("Check My Journey");
  });

  it("renders the owner's real signed portrait after permanent selection", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: true,
      ready: false,
      pending: false,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([ownerPortrait, { active: true } as never]);
    const host = await mount();
    expect(host.querySelector("[data-state='selected']")).toBeTruthy();
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toBe("https://example.test/owner-portrait.png");
    expect(host.innerHTML).not.toContain("academy-cosmic-");
    expect(host.textContent).toContain("Lumi");
    expect(host.textContent).toContain("Rare");
    expect(host.textContent).toContain("Stage 1 · Origin");
    expect(host.textContent).toContain("Magical Fox");
    expect(host.textContent).toContain("View My Card");
    expect(host.textContent).not.toContain("Earn Lifetime XP");
    expect(host.querySelector("a[href='/nova']")?.textContent).toContain("View My Card");
  });

  it("keeps the homepage summary layout while using the authenticated journey state", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: false,
      ready: false,
      pending: true,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([
      {
        ...ownerPortrait,
        artworkUrl: undefined,
        artworkPath: undefined,
        crafting: true,
        artOptions: [],
      },
      { active: true } as never,
    ]);

    const host = await mount("summary");

    expect(host.querySelector(".home-progress-summary--companion")).toBeTruthy();
    expect(host.querySelector(".home-progress-summary__companion-art")).toBeTruthy();
    expect(host.querySelector("[data-state='waiting']")?.getAttribute("data-mark")).toBe("egg");
    expect(host.querySelector("img")?.getAttribute("src")).toContain("academy-cosmic-egg-v2");
    expect(host.textContent).not.toContain("Earn Lifetime XP");
    expect(host.textContent).not.toContain("Nova is ready");
    expect(host.querySelector(".cosmic-companion-preview__card-link")).toBeNull();
    expect(host.querySelector("[data-nova-card-front]")).toBeNull();
  });

  it("keeps the portal artwork and journey action before a card is owned", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, devAuthBypass: false } as never);

    const host = await mount("summary");

    expect(host.querySelector("[data-state='new']")?.getAttribute("data-mark")).toBe("portal");
    expect(host.querySelector("img")?.getAttribute("src")).toContain("academy-cosmic-portal-v1");
    expect(host.querySelector(".cosmic-companion-preview__card-link")).toBeNull();
    expect(host.querySelector("[data-nova-card-front]")).toBeNull();
    expect(host.textContent).toContain("Start My Journey");
  });

  it("presents owner metadata as an identity line and compact official badges", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: true,
      ready: false,
      pending: false,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([ownerPortrait, { active: true } as never]);

    const host = await mount("summary");
    const preview = host.querySelector(".cosmic-companion-preview")!;

    expect(preview.getAttribute("data-element")).toBe("starlight");
    expect(preview.getAttribute("data-rarity")).toBe("rare");
    expect(host.textContent).toContain("Starlight Magical Fox · Gentle");
    expect(host.querySelector(".cosmic-companion-preview__badge--stage")?.textContent).toContain(
      "Origin",
    );
    expect(host.querySelector(".cosmic-companion-preview__badge--rarity")?.textContent).toContain(
      "Rare",
    );
    const cardLink = host.querySelector<HTMLAnchorElement>(".cosmic-companion-preview__card-link");
    expect(cardLink?.getAttribute("href")).toBe("/nova");
    expect(cardLink?.getAttribute("aria-label")).toBe("Open Lumi's collectible card");
    expect(cardLink?.querySelector("[data-nova-card-front]")).toBeTruthy();
    expect(cardLink?.textContent).toContain("Aisha");
    expect(cardLink?.textContent).toContain("Lumi");
    expect(cardLink?.textContent).toContain("Magical Fox");
    expect(cardLink?.textContent).toContain("Rare");
  });

  it("does not expose the previous owner's portrait while accounts switch", async () => {
    let currentUser = { id: "student-1" };
    vi.mocked(useAuth).mockImplementation(
      () => ({ user: currentUser, devAuthBypass: false }) as never,
    );
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: true,
      ready: false,
      pending: false,
      failed: false,
      unfinished: false,
    });

    let releaseSecond!: (value: [NovaCard, { active: true }]) => void;
    vi.mocked(loadOwnerNova)
      .mockResolvedValueOnce([ownerPortrait, { active: true } as never])
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            releaseSecond = resolve as typeof releaseSecond;
          }),
      );

    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    roots.push(root);
    await act(async () => root.render(<CosmicPortalWidget variant="summary" />));
    for (let i = 0; i < 30 && !host.querySelector(".nova-art"); i += 1) {
      await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));
    }
    expect(host.querySelector(".nova-art")?.getAttribute("src")).toBe(
      "https://example.test/owner-portrait.png",
    );

    currentUser = { id: "student-2" };
    await act(async () => root.render(<CosmicPortalWidget variant="summary" />));

    expect(host.querySelector("img[src='https://example.test/owner-portrait.png']")).toBeNull();
    expect(host.querySelector("[data-state='loading']")).toBeTruthy();

    const secondPortrait = {
      ...ownerPortrait,
      username: "Hana",
      companion: { ...ownerPortrait.companion!, name: "Astra" },
      artworkUrl: "https://example.test/second-owner.png",
    };
    await act(async () => {
      releaseSecond([secondPortrait, { active: true }]);
      await Promise.resolve();
    });

    expect(host.querySelector(".nova-art")?.getAttribute("src")).toBe(
      "https://example.test/second-owner.png",
    );
    expect(host.textContent).toContain("Astra");
    expect(host.textContent).not.toContain("Lumi");
  });

  it("refreshes an expired owner artwork URL once before showing an error", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: true,
      ready: false,
      pending: false,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova)
      .mockResolvedValueOnce([ownerPortrait, { active: true } as never])
      .mockResolvedValueOnce([
        { ...ownerPortrait, artworkUrl: "https://example.test/refreshed-owner.png" },
        { active: true } as never,
      ]);

    const host = await mount("summary");
    const expired = host.querySelector(".nova-art")!;
    expect(expired.getAttribute("src")).toBe("https://example.test/owner-portrait.png");

    await act(async () => {
      expired.dispatchEvent(new Event("error"));
      await Promise.resolve();
    });
    for (
      let i = 0;
      i < 30 &&
      host.querySelector(".nova-art")?.getAttribute("src") !==
        "https://example.test/refreshed-owner.png";
      i += 1
    ) {
      await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));
    }

    expect(loadOwnerNova).toHaveBeenCalledTimes(2);
    expect(host.querySelector(".nova-art")?.getAttribute("src")).toBe(
      "https://example.test/refreshed-owner.png",
    );
    expect(host.textContent).not.toContain("Portrait could not load");
  });

  it("uses a neutral summary fallback with retry and navigation when status fails", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockRejectedValue(new Error("Nova status unavailable"));

    const host = await mount("summary");

    expect(host.querySelector("[data-state='error']")).toBeTruthy();
    expect(host.querySelector(".cosmic-companion-preview__placeholder")).toBeTruthy();
    expect(host.querySelector("img")).toBeNull();
    expect(host.querySelector("button")?.textContent).toContain("Retry");
    expect(host.querySelector("a[href='/companion/portal']")?.textContent).toContain(
      "Open Companion",
    );
  });
});
