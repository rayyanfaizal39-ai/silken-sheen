import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/start-server-core";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import type { StudioDraft, StudioState } from "./studio-model";
import { validNovaAnswer } from "./model";

async function owner() {
  setResponseHeader("Cache-Control", "private, no-store, max-age=0");
  const db = getSupabaseServerClient();
  if (!db)
    throw new Error("Nova Studio storage is awaiting setup. Explore a fictional preview below.");
  const { data, error } = await db.auth.getUser();
  if (error || !data.user || data.user.is_anonymous)
    throw new Error("Sign in to save your Nova journey.");
  return db;
}
const flags = () =>
  process.env.NOVA_AI_ENABLED === "true" && process.env.NOVA_AI_BATCH_ENABLED === "true";
async function state(
  db: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
): Promise<StudioState> {
  const { data, error } = await db.rpc("get_my_nova_studio");
  if (error)
    throw new Error("Nova Studio storage is awaiting its reviewed migration. Please return later.");
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
  return { ...raw, candidates, enabled: raw.enabled && flags() };
}
export const getStudioState = createServerFn({ method: "GET" }).handler(async () =>
  state(await owner()),
);
export const saveStudioDraft = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        answers: z
          .array(z.number().int().min(0).max(2))
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
export const submitStudioOrigin = createServerFn({ method: "POST" }).handler(async () => {
  const db = await owner();
  if (!flags()) throw new Error("Nova generation is not enabled yet. Your answers are saved.");
  const { error } = await db.rpc("submit_nova_origin");
  if (error)
    throw new Error("Your Nova could not be queued. Check your active subscription and try again.");
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
export const requestStudioEvolution = createServerFn({ method: "POST" })
  .validator((v: unknown) => z.number().int().min(2).max(5).parse(v))
  .handler(async ({ data: stage }) => {
    const db = await owner();
    if (!flags()) throw new Error("Evolution generation is not enabled yet.");
    const { error } = await db.rpc("request_nova_evolution", { target_stage: stage });
    if (error)
      throw new Error(
        "Evolution requires an active subscription, verified XP and the previous approved artwork.",
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
    ready: !!s.origin?.ready && s.active,
    pending: !!s.origin && !s.selected,
    failed: s.origin?.status === "failed",
  };
});
