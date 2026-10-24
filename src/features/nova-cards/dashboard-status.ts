/**
 * How the Cosmic Companion button reads a saved journey.
 *
 * `studio.enabled` is the paid image-generation switch (`enabled and batch_enabled`
 * on nova_generation_settings). It is intentionally not an input: a summoned
 * companion stays open while image generation is off.
 *
 * A portrait counts as chosen only when the card payload has an artwork path.
 * `get_my_nova_studio` does not return a signed URL, and signing the two staff
 * portraits must not decide this. `craft_slot` (studio.selected) with no artwork
 * path is the crafting / portrait-pick screen.
 */
export type NovaDashboardStudio = {
  active: boolean;
  enabled?: boolean;
  selected: "a" | "b" | null;
  origin: { status?: string } | null;
  publicId: string | null;
  draft?: { answers?: readonly number[] } | null;
};

export type NovaDashboardCard = {
  artworkPath?: string | null;
  crafting?: boolean;
  artOptions?: readonly unknown[] | null;
} | null;

export type NovaDashboardStatus = {
  active: boolean;
  selected: boolean;
  ready: boolean;
  pending: boolean;
  failed: boolean;
  unfinished: boolean;
};

export function novaDashboardStatus(input: {
  studio: NovaDashboardStudio;
  card: NovaDashboardCard;
  /** Active admin on their own account. Forces the journey open. */
  staff?: boolean;
}): NovaDashboardStatus {
  const portraitReady = Boolean(input.card?.artworkPath);
  const queued =
    Boolean(input.studio.selected) ||
    Boolean(input.studio.origin) ||
    Boolean(input.card?.crafting) ||
    (input.card?.artOptions?.length ?? 0) > 0;
  return {
    active: input.staff ? true : input.studio.active,
    selected: portraitReady,
    ready: false,
    pending: queued && !portraitReady,
    failed: input.studio.origin?.status === "failed",
    unfinished: !input.studio.publicId && (input.studio.draft?.answers?.length ?? 0) > 0,
  };
}
