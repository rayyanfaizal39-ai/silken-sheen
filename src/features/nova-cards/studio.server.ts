import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { getSupabaseAdminClient } from "@/lib/billing.server";
import { CompanionMatchError } from "../../../supabase/functions/_shared/companion-matcher";
import { DnaError } from "../../../supabase/functions/_shared/companion-dna";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import { novaDashboardStatus } from "./dashboard-status";
import type { StudioDraft, StudioState } from "./studio-model";
import { validNovaAnswer } from "./model";
import { NOVA_ACCESS_ERRORS } from "./access";
import { novaJourneyAllowed } from "./entitlement";
import { resolveNovaEntitlement } from "./server";

/** The verified account each request's client belongs to, so state can say whose it is. */
const accountOf = new WeakMap<object, string>();
async function owner() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  const db = getSupabaseServerClient();
  if (!db) throw new Error(NOVA_ACCESS_ERRORS.unconfigured);
  const { data, error } = await db.auth.getUser();
  if (error || !data.user || data.user.is_anonymous) throw new Error(NOVA_ACCESS_ERRORS.signedOut);
  accountOf.set(db, data.user.id);
  return db;
}
/**
 * Launch switch for Cosmic Companion submissions, independent of AI artwork generation (which
 * stays governed by NOVA_AI_* and the database settings). Off unless explicitly enabled.
 */
const submissionsOpen = () => process.env.COSMIC_COMPANION_SUBMISSIONS_ENABLED === "true";

/** Own profile only. A failed read stays closed: the account is not treated as staff. */
async function signedInStaff(
  db: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  userId: string,
): Promise<boolean> {
  const { data, error } = await db
    .from("profiles")
    .select("role, status")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return false;
  const profile = data as { role?: string | null; status?: string | null };
  return profile.role === "admin" && profile.status === "active";
}

async function journeyOpen(db: NonNullable<ReturnType<typeof getSupabaseServerClient>>) {
  const userId = accountOf.get(db)!;
  const [entitlement, staff] = await Promise.all([
    resolveNovaEntitlement(db, userId),
    signedInStaff(db, userId),
  ]);
  return novaJourneyAllowed(entitlement, staff);
}
async function state(
  db: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
): Promise<StudioState> {
  const { data, error } = await db.rpc("get_my_nova_studio");
  if (error) throw new Error(NOVA_ACCESS_ERRORS.storagePending);
  const raw = data as Omit<StudioState, "candidates"> & {
    candidates: { candidate: "a" | "b"; path: string }[];
  };
  const { NOVA_ARTWORK_SIGNED_URL_SECONDS } = await import("./artwork-signing");
  const candidates = await Promise.all(
    raw.candidates.map(async (c) => {
      const { data: signed, error: signError } = await db.storage
        .from("nova-artwork")
        .createSignedUrl(c.path, NOVA_ARTWORK_SIGNED_URL_SECONDS);
      if (signError)
        throw new Error("Your artwork is temporarily unavailable. Refresh to try again.");
      return { candidate: c.candidate, url: signed.signedUrl };
    }),
  );
  // The chosen companion's own approved artwork (selection always requires artwork).
  let companionArtworkUrl: string | undefined;
  if (raw.companion) {
    const { data: card } = await db.rpc("get_my_nova_card");
    const path = (card as { artworkPath?: string | null } | null)?.artworkPath;
    if (path) {
      const { data: signed } = await db.storage
        .from("nova-artwork")
        .createSignedUrl(path, NOVA_ARTWORK_SIGNED_URL_SECONDS);
      companionArtworkUrl = signed?.signedUrl;
    }
  }
  return {
    ...raw,
    candidates,
    companionArtworkUrl,
    enabled: submissionsOpen(),
    account: accountOf.get(db),
  };
}
export const getStudioState = createServerFn({ method: "GET" }).handler(async () =>
  state(await owner()),
);
export const saveStudioDraft = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        answers: z
          .array(z.number().int().min(0).max(5))
          .max(12)
          .refine(
            (answers) => answers.every((answer, i) => validNovaAnswer(i, answer)),
            "Invalid Nova answer.",
          ),
        username: z.union([z.literal(""), z.string().regex(/^[A-Za-z0-9_]{2,24}$/)]),
        revision: z.number().int().nonnegative(),
      })
      .parse(input),
  )
  .handler(async ({ data: input }): Promise<StudioDraft> => {
    const db = await owner();
    const current = await state(db);
    if (current.publicId) throw new Error("Your companion journey is already complete.");
    if (!(await journeyOpen(db)))
      throw new Error("An eligible learning plan is required to begin your companion journey.");
    const { data, error } = await db.rpc("save_nova_studio_draft", {
      questionnaire: input.answers,
      display_username: input.username,
      expected_revision: input.revision,
    });
    if (error)
      throw new Error(
        error.message.includes("another device")
          ? "Your answers changed on another device. Refresh to continue."
          : error.message.includes("already saved") || error.message.includes("already complete")
            ? "Your companion journey is already complete."
            : error.message.includes("learning plan") || error.message.includes("subscription")
              ? "An eligible learning plan is required to begin your companion journey."
              : "Your answers could not be saved. Please try again.",
      );
    return data as StudioDraft;
  });
/**
 * Submit the saved answers and store the preference companion. Takes no input: the browser never
 * supplies answers, candidates or identities. The student is verified from their session, the
 * shared matcher runs here on the answers saved in the database, and only the service-role
 * function can store the result. A second journey is refused. The preference companion enters
 * the staff portrait queue in that same transaction.
 */
export const submitStudioOrigin = createServerFn({ method: "POST" }).handler(async () => {
  const db = await owner();
  if (!submissionsOpen())
    throw new Error("Cosmic Companion has not opened yet. Your answers are saved.");
  const current = await state(db);
  if (current.publicId) throw new Error("Your companion journey is already complete.");
  // Starting a journey needs the cosmic_companion feature (decided by the feature system);
  // the database re-checks eligibility in the same transaction that stores the match.
  if (!(await journeyOpen(db)))
    throw new Error("An eligible learning plan is required to begin your companion journey.");
  // The match and both candidates' Visual DNA are computed here, on the saved answers, with
  // a server-only secret. The browser can supply none of them.
  let submission;
  try {
    submission = prepareCompanionSubmission(
      current.draft.answers,
      accountOf.get(db)!,
      process.env.COSMIC_COMPANION_DNA_SECRET ?? "",
    );
  } catch (error) {
    if (error instanceof CompanionMatchError)
      throw new Error("Answer all twelve questions before summoning your companion.");
    if (error instanceof DnaError)
      throw new Error("Cosmic Companion is not fully configured yet. Your answers are saved.");
    throw new Error("Your companion could not be prepared. Please try again.");
  }
  const { error } = await getSupabaseAdminClient().rpc("nova_submit_companions", {
    student: accountOf.get(db),
    questionnaire: current.draft.answers,
    match: submission.match,
    dna: submission.dna,
  });
  if (error)
    throw new Error(
      error.message.includes("another device")
        ? "Your answers changed on another device. Refresh to continue."
        : error.message.includes("nickname")
          ? "Complete all twelve questions and choose a nickname."
          : "Your companion could not be prepared. Check your active subscription and try again.",
    );
  return state(db);
});
export const chooseStudioOrigin = createServerFn({ method: "POST" })
  .validator((v: unknown) => z.enum(["a", "b"]).parse(v))
  .handler(async ({ data: candidate }) => {
    const db = await owner();
    const { data: current, error: loadError } = await db.rpc("get_my_nova_studio");
    if (loadError)
      throw new Error(
        "Your choice could not be saved. Refresh to check readiness and subscription access.",
      );
    // Approved portraits still use the permanent reveal. Before that, the choice is queued
    // for a staff portrait and the card serial is left untouched.
    const ready = Boolean(
      (current as { origin?: { ready?: boolean } | null } | null)?.origin?.ready,
    );
    const { error } = ready
      ? await db.rpc("select_nova_origin", { chosen_candidate: candidate })
      : await db.rpc("nova_record_craft_choice", { chosen_slot: candidate });
    if (error)
      throw new Error(
        "Your choice could not be saved. Refresh to check readiness and subscription access.",
      );
    return state(db);
  });
// Dashboard does not import a card renderer, artwork engine, QR generator or candidate URLs.
// It also does not sign portrait files. A storage error must not be mistaken for entitlement.
export const getNovaDashboardStatus = createServerFn({ method: "GET" }).handler(async () => {
  const db = await owner();
  const { data, error } = await db.rpc("get_my_nova_studio");
  if (error) throw new Error("Nova status unavailable");
  const s = data as StudioState;
  const staff = await signedInStaff(db, accountOf.get(db)!);
  const { data: card, error: cardError } = await db.rpc("get_my_nova_card");
  return novaDashboardStatus({
    studio: s,
    staff,
    // The card payload says whether a portrait path exists. Signing that path is separate.
    card: cardError
      ? null
      : (card as {
          artworkPath?: string | null;
          crafting?: boolean;
          artOptions?: unknown[];
        } | null),
  });
});
