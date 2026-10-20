// @vitest-environment jsdom
// Phase 4D: the whole Cosmic Companion journey with MOCKED image generation. Everything else is
// real code on the full migration chain in PGlite: the shared matcher and Visual DNA, the SQL
// functions, the Batch worker (runNovaWorker), the RGBA checks, admin review, the 24-hour
// reveal, the Studio UI and sharing. The provider is MockArtProvider: no network, no spend.
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { PGlite } from "@electric-sql/pglite";
import { Blob as NodeBlob } from "node:buffer";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
}));
vi.mock("./StudioCompletedCard", () => ({ default: () => <p>Saved collectible</p> }));
import { StudioExperience, type StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";
import { runNovaWorker } from "../../../supabase/functions/_shared/nova-worker";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import {
  MockArtProvider,
  PgliteWorkerStore,
  TEST_DNA_SECRET,
  addAccount,
  createCompanionDb,
  enableGeneration,
  roleQuery,
  type MockOutcome,
} from "./test-support/companion-pipeline";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const ADMIN = "00000000-0000-4000-8000-0000000000d0";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
type Row = Record<string, unknown>;
let db: PGlite;
let as: ReturnType<typeof roleQuery>;
let n = 0;
const roots: ReturnType<typeof createRoot>[] = [];

beforeAll(async () => {
  // jsdom's Blob has no stream(); the worker's PNG checks run on Node/Deno's real Blob.
  vi.stubGlobal("Blob", NodeBlob);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  db = await createCompanionDb();
  as = roleQuery(db);
  await addAccount(db, ADMIN, { role: "admin", subscription: false });
}, 60_000);
afterAll(() => db.close());
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

// ── The server, as studio.server.ts does it, over the real SQL ────────────────────────────
/** Storage stand-in: a URL is "signed" only when the student's storage policy allows the read. */
async function sign(user: string, path: string) {
  const allowed = (
    await as("authenticated", user, "select public.can_read_nova_artwork($1) as r", [path])
  ).rows[0].r;
  if (!allowed) throw new Error("Your artwork is temporarily unavailable. Refresh to try again.");
  return `mock-signed://nova-artwork/${path}`;
}
async function studioState(user: string): Promise<StudioState> {
  const raw = (await as("authenticated", user, "select public.get_my_nova_studio() as r")).rows[0]
    .r as Omit<StudioState, "candidates"> & {
    candidates: { candidate: "a" | "b"; path: string }[];
  };
  const candidates = await Promise.all(
    raw.candidates.map(async (c) => ({ candidate: c.candidate, url: await sign(user, c.path) })),
  );
  let companionArtworkUrl: string | undefined;
  if (raw.companion) {
    const card = (await as("authenticated", user, "select public.get_my_nova_card() as r")).rows[0]
      .r as { artworkPath?: string };
    if (card.artworkPath) companionArtworkUrl = await sign(user, card.artworkPath);
  }
  return { ...raw, candidates, companionArtworkUrl, enabled: true, account: user };
}
async function submit(user: string, secret = TEST_DNA_SECRET) {
  const current = await studioState(user);
  if (current.publicId) return current;
  const prepared = prepareCompanionSubmission(current.draft.answers, user, secret);
  await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
    user,
    current.draft.answers,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
  return studioState(user);
}
function studentApi(user: string): StudioApi & { choose: ReturnType<typeof vi.fn> } {
  return {
    load: vi.fn(() => studioState(user)),
    save: vi.fn(),
    submit: vi.fn(() => submit(user)),
    choose: vi.fn(async (slot: "a" | "b") => {
      await as("authenticated", user, "select public.select_nova_origin($1)", [slot]);
      return studioState(user);
    }),
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────────────────
async function newStudent(answers = ANSWERS) {
  const id = `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`;
  await addAccount(db, id);
  const draft = (await studioState(id)).draft;
  await as("authenticated", id, "select public.save_nova_studio_draft($1,'Pilot',$2)", [
    answers,
    draft.revision,
  ]);
  return id;
}
const cardOf = async (user: string) =>
  (await db.query<{ id: string }>("select id from public.nova_cards where owner_id=$1", [user]))
    .rows[0].id;
/** Only one student's candidates are in play per test: park the others' work. */
async function isolate(user: string) {
  await db.query(
    `update public.nova_generation_candidates p set status='failed', error_code='parked'
     from public.nova_generation_jobs j join public.nova_cards c on c.id=j.card_id
     where p.job_id=j.id and c.owner_id<>$1 and p.status in ('pending','assigned')`,
    [user],
  );
  await db.query(
    "update public.nova_generation_batches set status='completed', lease_token=null, lease_until=null where status<>'completed'",
  );
}
const store = () => new PgliteWorkerStore(db);
const tick = (s: PgliteWorkerStore, p: MockArtProvider) =>
  runNovaWorker(s, p, { enabled: true, batchEnabled: true });
/** Outcome per candidate slot, looked up from the request's custom ID. */
const bySlot =
  (a: MockOutcome, b: MockOutcome = a) =>
  async (customId: string): Promise<MockOutcome> => {
    const { rows } = await db.query<{ candidate: string }>(
      `select p.candidate from public.nova_batch_requests r
       join public.nova_generation_candidates p on p.id=r.candidate_id where r.custom_id=$1`,
      [customId],
    );
    return rows[0].candidate === "b" ? b : a;
  };
const queue = async () =>
  (await as("authenticated", ADMIN, "select public.nova_admin_review_queue() as r")).rows[0]
    .r as (Row & { artworkId: string; cardId: string; slot: string })[];
async function reviewAll(
  user: string,
  decide: (slot: string) => "approve" | "reject" = () => "approve",
) {
  const cardId = await cardOf(user);
  for (const item of (await queue()).filter((q) => q.cardId === cardId)) {
    const decision = decide(item.slot);
    await as("authenticated", ADMIN, "select public.nova_admin_review_artwork($1,$2,$3)", [
      item.artworkId,
      decision,
      decision === "reject" ? "Anatomy does not match the archetype." : null,
    ]);
  }
}
const passReveal = async (user: string) =>
  db.query(
    "update public.nova_generation_jobs set reveal_after=now()-interval '1 minute' where card_id=$1",
    [await cardOf(user)],
  );
const candidates = async (user: string) =>
  (
    await db.query<{
      candidate: string;
      status: string;
      attempts: number;
      error_code: string | null;
    }>(
      `select p.candidate, p.status, p.attempts, p.error_code from public.nova_generation_candidates p
       join public.nova_generation_jobs j on j.id=p.job_id where j.card_id=$1 order by p.candidate`,
      [await cardOf(user)],
    )
  ).rows;
const readyAfterRetry = () =>
  db.query("update public.nova_generation_candidates set retry_after=now() where status='pending'");

async function mount(api: StudioApi) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<StudioExperience api={api} />));
  return host;
}
const button = (scope: ParentNode, label: string) =>
  [...scope.querySelectorAll("button")].find((b) => b.textContent?.includes(label));
async function click(scope: ParentNode, label: string) {
  const target = button(scope, label);
  expect(target, `Missing ${label}`).toBeTruthy();
  await act(async () => target!.click());
}
async function hatch(host: HTMLElement) {
  await click(host, "Hatch egg");
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
  });
}

beforeEach(async () => {
  // Every test starts from the shipped defaults: generation off, caps at $0.
  await db.query(
    "update public.nova_generation_settings set enabled=false,batch_enabled=false,companion_enabled=false,monthly_cap_microusd=0,daily_cap_microusd=0,reserve_microusd=5000000,max_batch_requests=2",
  );
});

describe("the complete journey (mock provider)", () => {
  it("submits, generates, reviews, waits 24 hours, reveals, chooses and returns", async () => {
    const student = await newStudent();
    const api = studentApi(student);
    const [A, B] = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET).match.candidates;

    // Submission: both companions and their DNA stored; nothing visible yet.
    const submitted = await api.submit();
    expect(submitted.origin).toMatchObject({ ready: false, completed: 0, approved: 0 });
    await isolate(student);

    // With the shipped defaults the worker does nothing and nothing is sent.
    const provider = new MockArtProvider(bySlot("art"));
    const worker = store();
    expect(await runNovaWorker(worker, provider, { enabled: false, batchEnabled: false })).toEqual({
      disabled: true,
      processed: 0,
    });
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(0);

    // Enabled (in this test only): one batch of exactly two requests, each from its own DNA.
    await enableGeneration(db);
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(1);
    const lines = provider.submitted[0].lines;
    expect(lines).toHaveLength(2);
    for (const line of lines) {
      expect(line.body).toMatchObject({ background: "transparent", size: "1024x1536" });
      expect(String(line.body.prompt)).not.toMatch(/Pilot|00000000-|test-dna-secret/);
    }
    expect(lines[0].body.prompt).not.toBe(lines[1].body.prompt);

    // Collected and validated: pending review, still hidden from the student.
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(1);
    expect(worker.storage.size).toBe(2);
    let state = await studioState(student);
    expect(state.origin).toMatchObject({ ready: false, completed: 2, inReview: 2, approved: 0 });
    expect(state.candidates).toEqual([]);

    // The Waiting Sanctuary says what is really happening.
    let host = await mount(api);
    expect(host.textContent).toContain("being checked by our team");
    expect(button(host, "Hatch egg")).toBeUndefined();
    for (const c of [A, B]) expect(host.textContent).not.toContain(c.name);
    await act(async () => roots.pop()!.unmount());

    // Approved, but the 24 hours from submission have not passed: still waiting.
    await reviewAll(student);
    state = await studioState(student);
    expect(state.origin).toMatchObject({ ready: false, approved: 2, inReview: 0 });
    await expect(api.choose("a")).rejects.toThrow(/not ready/);
    api.choose.mockClear();

    // After 24 hours: the reveal shows both, with their artwork; the student chooses B.
    await passReveal(student);
    host = await mount(api);
    await hatch(host);
    const cards = [...host.querySelectorAll(".occ-card")];
    expect(cards.map((c) => c.querySelector("h2")?.textContent)).toEqual([A.name, B.name]);
    expect(cards.map((c) => c.querySelector("img")?.getAttribute("src"))).toEqual([
      expect.stringMatching(/^mock-signed:\/\/nova-artwork\/.+\/a\/[0-9a-f]{64}\.png$/),
      expect.stringMatching(/^mock-signed:\/\/nova-artwork\/.+\/b\/[0-9a-f]{64}\.png$/),
    ]);
    await click(host, "Choose Companion B");
    await click(host, "Confirm My Companion");
    await click(host.querySelector("dialog")!, "Confirm my companion");
    expect(api.choose).toHaveBeenCalledExactlyOnceWith("b");
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${B.name}`);
    expect(host.querySelector(".ccprof-card img")?.getAttribute("src")).toMatch(
      /\/b\/[0-9a-f]{64}\.png$/,
    );
    expect(host.textContent).not.toContain(A.name);
    await act(async () => roots.pop()!.unmount());

    // Returning student: straight to the permanent companion, from the database alone.
    host = await mount(studentApi(student));
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${B.name}`);
    expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    expect(host.textContent).not.toContain(A.name);

    // The choice is permanent.
    await expect(api.choose("a")).rejects.toThrow(/already selected/);
    expect((await studioState(student)).selected).toBe("b");
  });

  it("keeps the unchosen companion out of sharing, QR, export and storage", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    await tick(worker, provider);
    await tick(worker, provider);
    await reviewAll(student);
    await passReveal(student);
    const [A, B] = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET).match.candidates;
    const { rows: art } = await db.query<{ candidate: string; storage_path: string }>(
      "select candidate, storage_path from public.nova_artwork where card_id=$1 order by candidate",
      [await cardOf(student)],
    );
    const publicId = (await studioState(student)).publicId!;
    await as("authenticated", student, "select public.set_nova_sharing(true)");
    // Before the choice, the public card (shared link and QR target) reveals nothing.
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])).rows[0].r,
    ).toBeNull();
    await as("authenticated", student, "select public.select_nova_origin('a')");

    // Shared link / QR (public payload) and export (the student's own card) carry A only.
    const shared = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])
    ).rows[0].r as Row;
    const own = (await as("authenticated", student, "select public.get_my_nova_card() as r"))
      .rows[0].r as Row;
    for (const payload of [shared, own]) {
      expect(payload).toMatchObject({
        artworkPath: art[0].storage_path,
        companion: { name: A.name },
      });
      expect(JSON.stringify(payload)).not.toContain(B.name);
      expect(JSON.stringify(payload)).not.toContain(art[1].storage_path);
    }
    const state = await studioState(student);
    expect(state.candidates).toEqual([]);
    expect(JSON.stringify(state)).not.toContain(B.name);
    // Storage: the unchosen file is unreadable for the student, the public and other students.
    const other = await newStudent();
    for (const [role, user] of [
      ["authenticated", student],
      ["authenticated", other],
      ["anon", null],
    ] as const)
      expect(
        (
          await as(role, user, "select public.can_read_nova_artwork($1) as r", [
            art[1].storage_path,
          ])
        ).rows[0].r,
      ).toBe(false);
    expect(
      (
        await as("anon", null, "select public.can_read_nova_artwork($1) as r", [
          art[0].storage_path,
        ])
      ).rows[0].r,
    ).toBe(true);
  });
});

describe("recovery (mock provider)", () => {
  it("one image fails its checks: the other waits, one audited retry completes the pair", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    let outcome = bySlot("art", "opaque");
    const provider = new MockArtProvider((id) => outcome(id));
    await tick(worker, provider);
    await tick(worker, provider);
    expect(await candidates(student)).toMatchObject([
      { candidate: "a", status: "ready", attempts: 1 },
      { candidate: "b", status: "failed", attempts: 1, error_code: "background_not_transparent" },
    ]);
    expect(worker.storage.size).toBe(1); // the opaque image is never stored
    await passReveal(student);
    let state = await studioState(student);
    expect(state.origin).toMatchObject({ ready: false, status: "failed" });
    expect(state.candidates).toEqual([]);

    // No automatic retry: further ticks send nothing.
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(1);

    // An administrator requests the one permitted retry; only B is regenerated.
    const card = await cardOf(student);
    await as("authenticated", ADMIN, "select public.nova_admin_retry_companion($1,'b',$2)", [
      card,
      "Opaque background; regenerate once.",
    ]);
    outcome = bySlot("art");
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(2);
    expect(provider.submitted[1].lines).toHaveLength(1);
    await tick(worker, provider);
    await reviewAll(student);
    state = await studioState(student);
    expect(state.origin).toMatchObject({ ready: true, approved: 2 });
    expect(state.candidates.map((c) => c.candidate)).toEqual(["a", "b"]);
    const audit = await db.query(
      "select 1 from public.nova_generation_audit where action='companion_retry'",
    );
    expect(audit.rows.length).toBeGreaterThan(0);
  });

  it("a rejected artwork gets one retry, then the attempt limit holds", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    await tick(worker, provider);
    await tick(worker, provider);
    await reviewAll(student, (slot) => (slot === "a" ? "reject" : "approve"));
    expect(await candidates(student)).toMatchObject([
      { candidate: "a", status: "rejected", attempts: 1 },
      { candidate: "b", status: "ready" },
    ]);
    await passReveal(student);
    expect((await studioState(student)).origin?.ready).toBe(false);
    const card = await cardOf(student);
    const retry = () =>
      as("authenticated", ADMIN, "select public.nova_admin_retry_companion($1,'a',$2)", [
        card,
        "Rejected in review; regenerate once.",
      ]);
    await expect(
      as("authenticated", student, "select public.nova_admin_retry_companion($1,'a',$2)", [
        card,
        "students cannot retry",
      ]),
    ).rejects.toThrow(/administrator/);
    await retry();
    await tick(worker, provider);
    await tick(worker, provider);
    await reviewAll(student, () => "reject");
    expect(await candidates(student)).toMatchObject([
      { candidate: "a", status: "rejected", attempts: 2 },
      {},
    ]);
    await expect(retry()).rejects.toThrow(/Retry limit/);
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(2); // two attempts, never a third
    // Rejected artwork never reaches the student.
    const { rows } = await db.query<{ storage_path: string }>(
      "select storage_path from public.nova_artwork where card_id=$1 and review_status='rejected'",
      [card],
    );
    for (const r of rows)
      expect(
        (
          await as("authenticated", student, "select public.can_read_nova_artwork($1) as r", [
            r.storage_path,
          ])
        ).rows[0].r,
      ).toBe(false);
    expect((await studioState(student)).candidates).toEqual([]);
  });

  it("a delayed batch keeps the student waiting until the provider finishes", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(() => "pending");
    await tick(worker, provider);
    for (let i = 0; i < 3; i++) await tick(worker, provider);
    expect(provider.submitted).toHaveLength(1);
    await passReveal(student);
    expect((await studioState(student)).origin).toMatchObject({ ready: false, completed: 0 });
    provider.complete();
    await tick(worker, provider);
    expect((await studioState(student)).origin).toMatchObject({ completed: 2, inReview: 2 });
  });

  it("the same image twice is caught as a duplicate and never revealed", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    // Both results request the same fixture, independent of the database's request row order.
    const provider = new MockArtProvider(() => "duplicate");
    await tick(worker, provider);
    await tick(worker, provider);
    const pair = await candidates(student);
    expect(pair.filter((candidate) => candidate.status === "ready")).toHaveLength(1);
    expect(
      pair.filter(
        (candidate) => candidate.status === "failed" && candidate.error_code === "duplicate_image",
      ),
    ).toHaveLength(1);
    await reviewAll(student);
    await passReveal(student);
    expect((await studioState(student)).origin?.ready).toBe(false);
  });

  it("repeated submission is idempotent and never generates twice", async () => {
    const student = await newStudent();
    const first = await submit(student);
    const second = await submit(student);
    expect(second.publicId).toBe(first.publicId);
    await expect(
      as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
        student,
        ANSWERS,
        JSON.stringify(prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET).match),
        JSON.stringify(prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET).dna),
      ]),
    ).resolves.toBeTruthy();
    const { rows } = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_generation_jobs where card_id=$1",
      [await cardOf(student)],
    );
    expect(rows[0].n).toBe(1);
  });

  it("refuses to submit without the server DNA secret, keeping the answers", async () => {
    const student = await newStudent();
    expect(() => prepareCompanionSubmission(ANSWERS, student, "")).toThrow();
    await expect(submit(student, "")).rejects.toThrow();
    const state = await studioState(student);
    expect(state.publicId).toBeNull();
    expect(state.draft.answers).toEqual(ANSWERS);
  });

  it("an exhausted or $0 budget sends nothing and the student keeps waiting", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    for (const limits of [
      { monthly: 0 },
      { daily: 0 },
      { monthly: 4_999_999 },
      { daily: 4_999_999 },
      { companion: false },
    ]) {
      await enableGeneration(db, limits);
      await tick(worker, provider);
    }
    expect(provider.submitted).toHaveLength(0);
    // A cap that allows exactly one reservation sends exactly one request.
    await enableGeneration(db, { monthly: 5_000_000 + (await monthSpent()) });
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(1);
    expect(provider.submitted[0].lines).toHaveLength(1);
    await passReveal(student);
    expect((await studioState(student)).origin?.ready).toBe(false);
  });

  it("an expired subscription pauses generation; a finished reveal can still be chosen", async () => {
    const paused = await newStudent();
    await submit(paused);
    await isolate(paused);
    await db.query("update public.subscriptions set status='expired' where user_id=$1", [paused]);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    await tick(worker, provider);
    expect(provider.submitted).toHaveLength(0);

    const ready = await newStudent();
    await submit(ready);
    await isolate(ready);
    await tick(worker, provider);
    await tick(worker, provider);
    await reviewAll(ready);
    await passReveal(ready);
    await db.query("update public.subscriptions set status='expired' where user_id=$1", [ready]);
    const host = await mount(studentApi(ready));
    await hatch(host);
    await click(host, "Choose Companion A");
    await click(host, "Confirm My Companion");
    await click(host.querySelector("dialog")!, "Confirm my companion");
    expect((await studioState(ready)).selected).toBe("a");
  });

  it("an interrupted submission is quarantined for reconciliation, never resent", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    provider.failSubmit = true;
    await tick(worker, provider);
    provider.failSubmit = false;
    for (let i = 0; i < 3; i++) await tick(worker, provider);
    expect(provider.submitted).toHaveLength(0);
    const { rows } = await db.query<{ status: string }>(
      "select status from public.nova_generation_batches order by created_at desc limit 1",
    );
    expect(rows[0]).toMatchObject({ status: "review" });
    expect(await candidates(student)).toMatchObject([
      { status: "review", error_code: "submission_requires_reconciliation" },
      { status: "review", error_code: "submission_requires_reconciliation" },
    ]);
    const audit = await db.query<{ code: string }>(
      `select detail->>'code' as code from public.nova_generation_audit
       where action='batch_needs_review' order by created_at desc limit 1`,
    );
    expect(audit.rows[0]?.code).toBe("submission_requires_reconciliation");
  });

  it("a worker that dies mid-collection is resumed after its lease expires", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    await tick(worker, provider);
    // A worker claims the batch and then crashes before collecting anything.
    const batch = (
      await db.query<{ id: string }>(
        "select id from public.nova_generation_batches where status='submitted'",
      )
    ).rows[0].id;
    expect(await worker.claim(batch)).toBeTruthy();
    await tick(worker, provider); // the lease is still held: nothing happens
    expect((await studioState(student)).origin?.completed).toBe(0);
    await db.query(
      "update public.nova_generation_batches set lease_until=now()-interval '1 second' where id=$1",
      [batch],
    );
    await tick(worker, provider);
    expect(await candidates(student)).toMatchObject([
      { candidate: "a", status: "ready", error_code: null },
      { candidate: "b", status: "ready", error_code: null },
    ]);
    expect((await studioState(student)).origin).toMatchObject({ completed: 2, inReview: 2 });
    expect(provider.submitted).toHaveLength(1);
  });

  it("refuses an early reveal and a choice before both are approved", async () => {
    const student = await newStudent();
    await submit(student);
    await isolate(student);
    await enableGeneration(db);
    const worker = store();
    const provider = new MockArtProvider(bySlot("art"));
    await tick(worker, provider);
    await tick(worker, provider);
    await passReveal(student);
    const api = studentApi(student);
    await expect(api.choose("a")).rejects.toThrow(/not ready/);
    // Even a forged "ready" in the browser cannot open artwork: storage still refuses it.
    const { rows } = await db.query<{ storage_path: string }>(
      "select storage_path from public.nova_artwork where card_id=$1",
      [await cardOf(student)],
    );
    for (const r of rows)
      await expect(sign(student, r.storage_path)).rejects.toThrow(/unavailable/);
  });
});

async function monthSpent() {
  const { rows } = await db.query<{ s: number }>(
    `select coalesce(sum(reserved_microusd),0)::bigint::int as s from public.nova_batch_requests
     where budget_month=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur')::date`,
  );
  return Number(rows[0].s);
}
