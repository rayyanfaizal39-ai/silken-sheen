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
    role: "student",
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

/** Fill the artwork slots the paid generator would have filled, using local stand-ins. */
function withArtwork(studio: StudioState): StudioState {
  const specs = studio.companions?.length
    ? studio.companions
    : studio.companion
      ? [studio.companion]
      : [];
  if (!specs.length) return studio;
  const candidates = specs.map((spec) => {
    const saved = studio.candidates.find((item) => item.candidate === spec.slot && item.url);
    return {
      candidate: spec.slot,
      url: saved?.url || artworkFor(spec.species, spec.element, spec.slot),
    };
  });
  const chosen = studio.companion;
  return {
    ...studio,
    candidates,
    companionArtworkUrl:
      studio.companionArtworkUrl ||
      (chosen ? candidates.find((item) => item.candidate === chosen.slot)?.url : undefined),
  };
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
  if (record.studio.selected) return Promise.resolve(structuredClone(record.studio));
  const spec = record.studio.companions?.find((item) => item.slot === candidate);
  if (!spec || !record.studio.publicId)
    throw new Error("Meet both companions before choosing one.");
  const username = record.studio.draft.username;
  const artworkUrl =
    record.studio.candidates.find((item) => item.candidate === candidate)?.url ||
    artworkFor(spec.species, spec.element, candidate);
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
    artworkUrl,
  };
  record.card = card;
  record.studio = {
    ...record.studio,
    selected: candidate,
    companion: spec,
    companions: undefined,
    companionArtworkUrl: artworkUrl,
    candidates: [{ candidate, url: artworkUrl }],
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
      name: string;
      species: string;
      element: string;
      artworkUrl: string;
    };

/** What the dashboard and Cosmic Companion page should show for this browser session. */
export function devDemoCompanion(): DevDemoCompanion {
  try {
    const { record } = activeRecord();
    const companion = record.card?.companion;
    if (!record.card || !companion) return { discovered: false };
    return {
      discovered: true,
      name: companion.name,
      species: companion.species,
      element: companion.element,
      artworkUrl:
        record.card.artworkUrl ||
        artworkFor(companion.species, companion.element, record.card.variant),
    };
  } catch {
    return { discovered: false };
  }
}

export function devOwnerNova(): { card: NovaCard | null; entitlement: NovaEntitlement } {
  const { record } = activeRecord();
  const card = record.card ? structuredClone(record.card) : null;
  if (card?.companion && !card.artworkUrl) {
    card.artworkUrl = artworkFor(card.companion.species, card.companion.element, card.variant);
  }
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
