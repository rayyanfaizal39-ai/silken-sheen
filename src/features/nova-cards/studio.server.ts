import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { getSupabaseAdminClient } from "@/lib/billing.server";
import {
  CompanionMatchError,
  matchCompanions,
  verifyCandidateFingerprint,
} from "../../../supabase/functions/_shared/companion-matcher";
import type { StudioDraft, StudioState } from "./studio-model";
import { validNovaAnswer } from "./model";
import { NOVA_ACCESS_ERRORS } from "./access";
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
async function state(
  db: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
): Promise<StudioState> {
  const { data, error } = await db.rpc("get_my_nova_studio");
  if (error) throw new Error(NOVA_ACCESS_ERRORS.storagePending);
  const raw = data as Omit<StudioState, "candidates"> & {
    candidates: { candidate: "a" | "b"; path: string }[];
  };
  const candidates = await Promise.all(
    raw.candidates.map(async (c) => {
      const { data: signed, error: signError } = await db.storage
        .from("nova-artwork")
        .createSignedUrl(c.path, 60);
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
      const { data: signed } = await db.storage.from("nova-artwork").createSignedUrl(path, 60);
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
    const { data, error } = await db.rpc("save_nova_studio_draft", {
      questionnaire: input.answers,
      display_username: input.username,
      expected_revision: input.revision,
    });
    if (error)
      throw new Error(
        error.message.includes("another device")
          ? "Your answers changed on another device. Refresh to continue."
          : "Your answers could not be saved. Please try again.",
      );
    return data as StudioDraft;
  });
/**
 * Submit the saved answers and store two matched companions. Takes no input: the browser never
 * supplies answers, candidates or identities. The student is verified from their session, the
 * shared matcher runs here on the answers saved in the database, and only the service-role
 * function can store the result. Safe to repeat: an existing card is returned unchanged.
 */
export const submitStudioOrigin = createServerFn({ method: "POST" }).handler(async () => {
  const db = await owner();
  if (!submissionsOpen())
    throw new Error("Cosmic Companion has not opened yet. Your answers are saved.");
  const current = await state(db);
  if (current.publicId) return current;
  // Starting a journey needs the cosmic_companion feature (decided by the feature system);
  // the database re-checks eligibility in the same transaction that stores the match.
  if (!(await resolveNovaEntitlement(db, accountOf.get(db)!)).active)
    throw new Error("An eligible learning plan is required to begin your companion journey.");
  let match;
  try {
    match = matchCompanions(current.draft.answers);
  } catch (error) {
    if (error instanceof CompanionMatchError)
      throw new Error("Answer all twelve questions before summoning your companion.");
    throw error;
  }
  if (!match.candidates.every(verifyCandidateFingerprint))
    throw new Error("Your companions could not be prepared. Please try again.");
  const { error } = await getSupabaseAdminClient().rpc("nova_submit_companions", {
    student: accountOf.get(db),
    questionnaire: current.draft.answers,
    match,
  });
  if (error)
    throw new Error(
      error.message.includes("another device")
        ? "Your answers changed on another device. Refresh to continue."
        : error.message.includes("nickname")
          ? "Complete all twelve questions and choose a nickname."
          : "Your companions could not be prepared. Check your active subscription and try again.",
    );
  return state(db);
});
export const chooseStudioOrigin = createServerFn({ method: "POST" })
  .validator((v: unknown) => z.enum(["a", "b"]).parse(v))
  .handler(async ({ data: candidate }) => {
    const db = await owner();
    const { error } = await db.rpc("select_nova_origin", { chosen_candidate: candidate });
    if (error)
      throw new Error(
        "Your choice could not be saved. Refresh to check readiness and subscription access.",
      );
    return state(db);
  });
// Dashboard does not import a card renderer, artwork engine, QR generator or candidate URLs.
export const getNovaDashboardStatus = createServerFn({ method: "GET" }).handler(async () => {
  const db = await owner();
  const { data, error } = await db.rpc("get_my_nova_studio");
  if (error) throw new Error("Nova status unavailable");
  const s = data as StudioState;
  return {
    active: s.active,
    selected: !!s.selected,
    // A submitted journey can finish without an active subscription.
    ready: !!s.origin?.ready,
    pending: !!s.origin && !s.selected,
    failed: s.origin?.status === "failed",
    // Answers saved but not yet submitted: continue rather than restart.
    unfinished: !s.publicId && s.draft.answers.length > 0,
  };
});
