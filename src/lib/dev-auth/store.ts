import type { ExplorerProfile } from "@/lib/explorer-profile";
import { NOVA_ACCESS_ERRORS } from "@/features/nova-cards/access";
import { novaEntitlement, type NovaEntitlement } from "@/features/nova-cards/entitlement";
import {
  traitsFromAnswers,
  type NovaCard,
  type PublicCompanion,
} from "@/features/nova-cards/model";
import type { StudioDraft, StudioState } from "@/features/nova-cards/studio-model";
import {
  CompanionMatchError,
  matchCompanions,
  type CompanionCandidateSpec,
} from "../../../supabase/functions/_shared/companion-matcher";
import type { CraftBrief } from "@/features/nova-cards/craft-queue";
import { devCompanionArtworkUrl } from "./local-artwork";
import { devStudentById, type DevStudent } from "./students";

export const DEV_AUTH_STORAGE_KEY = "academymy.dev-auth.v1";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface StudentRecord {
  studio: StudioState;
  card: NovaCard | null;
  /** Staff portrait workflow. Absent until the student confirms a companion. */
  craft?: {
    status: CraftBrief["status"];
    pendingUrl?: string;
    fileName?: string;
  };
}

interface PersistedDevAuth {
  activeStudentId: string | null;
  students: Record<string, StudentRecord>;
}

const fallbackMemory = createMemoryStorage();
let override: KeyValueStorage | null = null;

export function createMemoryStorage(): KeyValueStorage {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
    removeItem: (key) => {
      data.delete(key);
    },
  };
}

/** Tests inject a memory store. Pass null to return to localStorage. */
export function useDevAuthStorage(next: KeyValueStorage | null) {
  override = next;
}

function storage(): KeyValueStorage {
  if (override) return override;
  if (typeof localStorage !== "undefined") return localStorage;
  return fallbackMemory;
}

function blankStudio(student: DevStudent): StudioState {
  return {
    active: true,
    enabled: true,
    draft: { answers: [], username: student.name, revision: 0 },
    publicId: null,
    identity: null,
    selected: null,
    origin: null,
    candidates: [],
    account: student.id,
    kind: null,
    companion: null,
  };
}

function emptyState(): PersistedDevAuth {
  return { activeStudentId: null, students: {} };
}

function read(): PersistedDevAuth {
  try {
    const raw = storage().getItem(DEV_AUTH_STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as PersistedDevAuth;
    if (!parsed || typeof parsed !== "object" || typeof parsed.students !== "object")
      return emptyState();
    return {
      activeStudentId: typeof parsed.activeStudentId === "string" ? parsed.activeStudentId : null,
      students: parsed.students,
    };
  } catch {
    return emptyState();
  }
}

const storeListeners = new Set<() => void>();

/** Same-tab updates for the dashboard and companion page. */
export function subscribeDevStore(listener: () => void) {
  storeListeners.add(listener);
  listener();
  return () => {
    storeListeners.delete(listener);
  };
}

function write(state: PersistedDevAuth) {
  storage().setItem(DEV_AUTH_STORAGE_KEY, JSON.stringify(state));
  for (const listener of storeListeners) listener();
}

function ensureStudent(state: PersistedDevAuth, student: DevStudent): StudentRecord {
  const existing = state.students[student.id];
  if (existing?.studio) return existing;
  const created = { studio: blankStudio(student), card: null };
  state.students[student.id] = created;
  return created;
}

export function devAuthActiveStudentId(): string | null {
  const id = read().activeStudentId;
  return id && devStudentById(id) ? id : null;
}

export function signInDevStudentRecord(studentId: string) {
  const student = devStudentById(studentId);
  if (!student) throw new Error("Choose a local demo student.");
  const state = read();
  ensureStudent(state, student);
  state.activeStudentId = student.id;
  write(state);
}

export function signOutDevStudentRecord() {
  const state = read();
  state.activeStudentId = null;
  write(state);
}

export function devExplorerProfile(student: DevStudent): ExplorerProfile {
  return {
    displayName: student.name,
    age: student.age,
    formLevel: student.formLevel,
    recordedForm: student.formLevel,
    schoolId: null,
    onboardingCompleted: true,
    role: student.role ?? "student",
  };
}

function activeRecord(): { student: DevStudent; record: StudentRecord; state: PersistedDevAuth } {
  const state = read();
  const student = state.activeStudentId ? devStudentById(state.activeStudentId) : undefined;
  if (!student) throw new Error(NOVA_ACCESS_ERRORS.signedOut);
  const record = ensureStudent(state, student);
  return { student, record, state };
}

function persist(state: PersistedDevAuth) {
  write(state);
}

function artworkFor(species: string, element: string, variant: "a" | "b") {
  return devCompanionArtworkUrl(species, element, variant);
}

/** Comparison drawings only, before the student confirms a companion. */
function withArtwork(studio: StudioState): StudioState {
  const specs = !studio.selected && studio.companions?.length ? studio.companions : [];
  if (!specs.length) return studio;
  const candidates = specs.map((spec) => {
    const saved = studio.candidates.find((item) => item.candidate === spec.slot && item.url);
    return {
      candidate: spec.slot,
      url: saved?.url || artworkFor(spec.species, spec.element, spec.slot),
    };
  });
  // Comparison drawings only. A confirmed card waits for a staff portrait.
  return { ...studio, candidates };
}

export function devLoadStudio(): Promise<StudioState> {
  const { record } = activeRecord();
  return Promise.resolve(withArtwork(structuredClone(record.studio)));
}

export function devSaveStudio(draft: StudioDraft): Promise<StudioDraft> {
  const { record, state } = activeRecord();
  if (record.studio.publicId) return Promise.resolve(structuredClone(record.studio.draft));
  record.studio = {
    ...record.studio,
    draft: { ...draft, revision: draft.revision + 1 },
  };
  persist(state);
  return Promise.resolve(structuredClone(record.studio.draft));
}

function toPublicCompanion(spec: CompanionCandidateSpec): PublicCompanion {
  return {
    archetypeId: spec.archetypeId,
    name: spec.name,
    species: spec.species,
    element: spec.element,
    personality: spec.personality,
    tagline: spec.tagline,
    description: spec.description,
    traits: [...spec.traits],
    abilities: [...spec.abilities],
  };
}

export function devSubmitStudio(): Promise<StudioState> {
  const { student, record, state } = activeRecord();
  if (record.studio.publicId) return Promise.resolve(structuredClone(record.studio));
  const answers = record.studio.draft.answers;
  let match;
  try {
    match = matchCompanions(answers);
  } catch (error) {
    if (error instanceof CompanionMatchError)
      throw new Error("Answer all twelve questions before summoning your companion.");
    throw error;
  }
  record.studio = {
    ...record.studio,
    publicId: student.id,
    identity: {
      version: "nova-identity-v1",
      answers: [...answers],
      traits: traitsFromAnswers(answers),
    },
    kind: "cosmic-companion",
    companions: match.candidates,
    companion: null,
    selected: null,
    // The paid generator stays off. Local drawings stand in for its approved images.
    origin: {
      status: "ready",
      revealAfter: new Date(0).toISOString(),
      ready: true,
      errorCode: null,
      completed: 2,
      approved: 2,
      inReview: 0,
    },
    candidates: match.candidates.map((spec) => ({
      candidate: spec.slot,
      url: artworkFor(spec.species, spec.element, spec.slot),
    })),
  };
  persist(state);
  return Promise.resolve(structuredClone(record.studio));
}

export function devChooseStudio(candidate: "a" | "b"): Promise<StudioState> {
  const { student, record, state } = activeRecord();
  if (!student.serial) throw new Error("This account does not receive a companion card.");
  if (record.studio.selected) return Promise.resolve(structuredClone(record.studio));
  const spec = record.studio.companions?.find((item) => item.slot === candidate);
  if (!spec || !record.studio.publicId)
    throw new Error("Meet both companions before choosing one.");
  const username = record.studio.draft.username;
  const card: NovaCard = {
    publicId: record.studio.publicId,
    serial: student.serial,
    username,
    traits: null,
    companion: toPublicCompanion(spec),
    variant: candidate,
    rarity: "Rare",
    stage: 1,
    sharing: false,
    crafting: true,
  };
  record.card = card;
  record.craft = { status: "awaiting_art" };
  record.studio = {
    ...record.studio,
    selected: candidate,
    companion: spec,
    companions: undefined,
    companionArtworkUrl: undefined,
    candidates: [],
  };
  persist(state);
  return Promise.resolve(structuredClone(record.studio));
}

export function devDashboardStatus() {
  const { record } = activeRecord();
  const studio = record.studio;
  return {
    active: studio.active,
    selected: !!studio.selected,
    ready: !!studio.origin?.ready,
    pending: !!studio.origin && !studio.selected,
    failed: studio.origin?.status === "failed",
    unfinished: !studio.publicId && studio.draft.answers.length > 0,
  };
}

export type DevDemoCompanion =
  | { discovered: false }
  | {
      discovered: true;
      crafting: boolean;
      name: string;
      species: string;
      element: string;
      artworkUrl?: string;
    };

/** What the dashboard and Cosmic Companion page should show for this browser session. */
export function devDemoCompanion(): DevDemoCompanion {
  try {
    const { record } = activeRecord();
    const companion = record.card?.companion;
    if (!record.card || !companion) return { discovered: false };
    const crafting = Boolean(record.card.crafting) || !record.card.artworkUrl;
    return {
      discovered: true,
      crafting,
      name: companion.name,
      species: companion.species,
      element: companion.element,
      ...(crafting ? {} : { artworkUrl: record.card.artworkUrl }),
    };
  } catch {
    return { discovered: false };
  }
}

export function devOwnerNova(): { card: NovaCard | null; entitlement: NovaEntitlement } {
  const { record } = activeRecord();
  const card = record.card ? structuredClone(record.card) : null;
  return {
    card,
    entitlement: novaEntitlement({
      plan: "explorer",
      status: "active",
      current_period_end: "2099-01-01T00:00:00.000Z",
    }),
  };
}

export function devSetSharing(enabled: boolean): NovaCard {
  const { record, state } = activeRecord();
  if (!record.card) throw new Error("Create your companion first");
  record.card = { ...record.card, sharing: enabled };
  persist(state);
  return structuredClone(record.card);
}

/** Shared local card, or null when it is private or unknown. */
export function readDevPublicCard(publicId: string): NovaCard | null {
  const state = read();
  for (const record of Object.values(state.students)) {
    if (record.card?.publicId === publicId && record.card.sharing)
      return structuredClone(record.card);
  }
  return null;
}

function requireStaff() {
  const id = read().activeStudentId;
  const account = id ? devStudentById(id) : undefined;
  if (account?.role !== "admin") throw new Error("An active administrator account is required");
}

function briefFor(studentId: string, record: StudentRecord): CraftBrief | null {
  const student = devStudentById(studentId);
  const card = record.card;
  const companion = card?.companion;
  if (!student || student.role === "admin" || !card?.serial || !companion) return null;
  const craft = record.craft ?? { status: "awaiting_art" as const };
  return {
    cardId: card.publicId,
    publicId: card.publicId,
    serial: card.serial,
    username: card.username,
    studentName: student.name,
    form: student.formLevel ?? "",
    email: student.email,
    answers: record.studio.identity?.answers ?? record.studio.draft.answers,
    slot: card.variant,
    companionName: companion.name,
    species: companion.species,
    element: companion.element,
    personality: companion.personality,
    status: craft.pendingUrl ? "pending_review" : craft.status,
    artworkId: craft.pendingUrl ? `pending:${card.publicId}` : null,
    previewUrl:
      craft.pendingUrl ?? (craft.status === "approved" ? (card.artworkUrl ?? null) : null),
  };
}

/** Confirmed companions waiting for a staff portrait. Staff only. */
export function devCraftQueue(): CraftBrief[] {
  requireStaff();
  const state = read();
  return Object.entries(state.students)
    .map(([id, record]) => briefFor(id, record))
    .filter((item): item is CraftBrief => item !== null);
}

const MAX_PORTRAIT_CHARS = 1_400_000;

/** Store a staff portrait for preview. The card serial and current approved art stay put. */
export function devAttachCraftPortrait(
  studentId: string,
  dataUrl: string,
  fileName = "portrait.png",
): CraftBrief {
  requireStaff();
  if (!dataUrl.startsWith("data:image/") || dataUrl.length > MAX_PORTRAIT_CHARS)
    throw new Error("Choose a PNG, JPEG or WebP portrait under 1 MB.");
  const state = read();
  const record = state.students[studentId];
  const brief = record ? briefFor(studentId, record) : null;
  if (!record || !brief) throw new Error("That student has not confirmed a companion.");
  const serial = record.card?.serial;
  record.craft = { status: "pending_review", pendingUrl: dataUrl, fileName };
  persist(state);
  if (record.card?.serial !== serial) throw new Error("The card serial must stay the same.");
  return briefFor(studentId, record)!;
}

/** Approve the previewed portrait onto the existing card. */
export function devApproveCraftPortrait(studentId: string): CraftBrief {
  requireStaff();
  const state = read();
  const record = state.students[studentId];
  if (!record?.card || !record.craft?.pendingUrl)
    throw new Error("Upload a portrait before approving it.");
  const serial = record.card.serial;
  record.card = {
    ...record.card,
    artworkUrl: record.craft.pendingUrl,
    crafting: false,
  };
  record.craft = { status: "approved", fileName: record.craft.fileName };
  persist(state);
  if (record.card.serial !== serial) throw new Error("The card serial must stay the same.");
  return briefFor(studentId, record)!;
}
