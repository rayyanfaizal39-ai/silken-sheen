import { describe, expect, it } from "vitest";
import { hasFeature } from "@/lib/feature-access";
import { PLANS } from "@/config/features";
import { novaEntitlement } from "./entitlement";
import { companionFromSpec, companionsFromState } from "./companion-candidates";
import { cardFace, DEMO_CARDS, type NovaCard } from "./model";
import type { StudioState } from "./studio-model";
import { matchCompanions } from "../../../supabase/functions/_shared/companion-matcher";

const NOW = Date.parse("2026-10-19T00:00:00Z");
const FUTURE = "2026-11-19T00:00:00Z";
const PAST = "2026-09-19T00:00:00Z";

describe("cosmic_companion entitlement", () => {
  it("is a learning feature on every learning plan, including Explorer, and not on Basic", () => {
    expect(PLANS.filter((plan) => hasFeature(plan, "cosmic_companion"))).toEqual([
      "explorer",
      "captain",
      "teacher",
      "school",
      "enterprise",
    ]);
  });

  it("follows the feature system for stored plan values, never hard-coded plan names", () => {
    const active = (plan: string) =>
      novaEntitlement({ plan, status: "active", current_period_end: FUTURE }, NOW);
    expect(active("pro")).toEqual({ active: true, status: "active" }); // Explorer
    expect(active("premium")).toEqual({ active: true, status: "active" }); // Captain
    expect(active("paid")).toEqual({ active: true, status: "active" }); // legacy paid → Explorer
    expect(active("free").active).toBe(false); // Basic
    expect(active("basic").active).toBe(false);
  });

  it("requires a current subscription to start a journey", () => {
    expect(novaEntitlement(null, NOW)).toEqual({ active: false, status: "free" });
    expect(
      novaEntitlement({ plan: "pro", status: "active", current_period_end: PAST }, NOW),
    ).toEqual({ active: false, status: "expired" });
    expect(
      novaEntitlement({ plan: "pro", status: "pending", current_period_end: FUTURE }, NOW),
    ).toEqual({ active: false, status: "pending" });
    expect(
      novaEntitlement({ plan: "pro", status: "cancelled", current_period_end: FUTURE }, NOW),
    ).toEqual({ active: false, status: "cancelled" });
  });
});

describe("real companion data", () => {
  const [a, b] = matchCompanions([0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0]).candidates;

  it("maps each stored specification to its own companion, with its own artwork", () => {
    const state = {
      candidates: [
        { candidate: "b", url: "https://example.test/b.png" },
        { candidate: "a", url: "https://example.test/a.png" },
      ],
      companions: [a, b],
    } as unknown as StudioState;
    const [first, second] = companionsFromState(state);
    expect(first).toMatchObject({
      id: "a",
      name: a.name,
      species: a.species,
      element: a.element,
      personality: a.personality,
      learningStyle: a.learningStyle,
      uniqueQuality: a.tagline,
      story: a.story,
      reason: a.match.headline,
      artworkUrl: "https://example.test/a.png",
    });
    expect(second.artworkUrl).toBe("https://example.test/b.png");
    expect(second.name).toBe(b.name);
  });

  it("shows no companions until the server sends them", () => {
    expect(
      companionsFromState({ candidates: [], companions: [] } as unknown as StudioState),
    ).toEqual([]);
  });

  it("drops the reason that names the other candidate once a companion is chosen", () => {
    const atReveal = companionFromSpec(b);
    const chosen = companionFromSpec(b, undefined, { chosen: true });
    expect(atReveal.reasons!.some((r) => r.includes(a.name))).toBe(true);
    expect(chosen.reasons!.some((r) => r.includes(a.name))).toBe(false);
    expect(chosen.reasons!.length).toBe(atReveal.reasons!.length - 1);
  });
});

describe("card faces for sharing, QR and export", () => {
  it("keeps the legacy face exactly as before", () => {
    const legacy = DEMO_CARDS[0];
    const t = legacy.traits;
    expect(cardFace(legacy)).toMatchObject({
      eyebrow: `${t.element} · ${t.personality}`,
      name: "Nova",
      species: t.creature,
      details: [t.colours, t.eyes, t.ability],
    });
  });

  it("shows only the chosen companion on a matched card, never answer-derived traits", () => {
    const card: NovaCard = {
      ...DEMO_CARDS[0],
      traits: null,
      companion: {
        archetypeId: "ember",
        name: "Ember",
        species: "Lion",
        element: "Fire",
        personality: "Explorer",
        tagline: "Turns every spark into a new adventure",
        description: "A cheerful lion cub who is always ready to try something new.",
        traits: ["Adventurous", "Cheerful", "Warm"],
        abilities: ["Hearth flame", "Glow trail"],
      },
    };
    const face = cardFace(card);
    expect(face).toMatchObject({
      eyebrow: "Fire · Explorer",
      name: "Ember",
      species: "Lion",
      description: card.companion!.description,
      alt: "Ember the Lion",
    });
    expect(JSON.stringify(face.details)).not.toContain(DEMO_CARDS[0].traits.colours);
  });
});

describe("connected preview fixture", () => {
  it("is exactly the real matcher's output for the preview student's answers", async () => {
    const { CONNECTED_PREVIEW_ANSWERS, CONNECTED_PREVIEW_COMPANIONS } =
      await import("./connected-preview-fixture");
    expect(CONNECTED_PREVIEW_COMPANIONS).toEqual(
      matchCompanions(CONNECTED_PREVIEW_ANSWERS).candidates,
    );
  });
});
