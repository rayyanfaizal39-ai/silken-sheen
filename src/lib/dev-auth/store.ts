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
    options?: { option: 1 | 2; url: string }[];
    choice?: 1 | 2;
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
    artOptions: undefined,
  };
  record.card = card;
  record.craft = {};
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
      choosing: boolean;
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
    const choosing = (record.card.artOptions?.length ?? 0) === 2 && !record.card.artworkUrl;
    const crafting = !choosing && (Boolean(record.card.crafting) || !record.card.artworkUrl);
    return {
      discovered: true,
      crafting,
      choosing,
      name: companion.name,
      species: companion.species,
      element: companion.element,
      ...(crafting || choosing ? {} : { artworkUrl: record.card.artworkUrl }),
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
    if (record.card?.publicId === publicId && record.card.sharing) {
      const { artOptions: _hidden, ...card } = structuredClone(record.card);
      return card;
    }
  }
  return null;
}

function requireStaff() {
  const id = read().activeStudentId;
  const account = id ? devStudentById(id) : undefined;
  if (account?.role !== "admin") throw new Error("An active administrator account is required");
}

function craftStatus(record: StudentRecord): CraftBrief["status"] {
  if (record.craft?.choice) return "chosen";
  if ((record.craft?.options?.length ?? 0) === 2) return "options_ready";
  return "waiting_for_art";
}

function briefFor(studentId: string, record: StudentRecord): CraftBrief | null {
  const student = devStudentById(studentId);
  const card = record.card;
  const companion = card?.companion;
  if (!student || student.role === "admin" || !card?.serial || !companion) return null;
  const options = record.craft?.options ?? [];
  return {
    publicId: card.publicId,
    serial: card.serial,
    displayName: card.username,
    form: student.formLevel ?? "",
    companionName: companion.name,
    species: companion.species,
    element: companion.element,
    traits: companion.traits,
    personality: companion.personality,
    status: craftStatus(record),
    choice: record.craft?.choice ?? null,
    options: options.map((option) => ({ option: option.option, previewUrl: option.url })),
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

function portraitUrl(dataUrl: string) {
  if (!dataUrl.startsWith("data:image/") || dataUrl.length > MAX_PORTRAIT_CHARS)
    throw new Error("Choose a PNG, JPEG or WebP portrait under 1 MB.");
  return dataUrl;
}

function recordByPublicId(publicId: string) {
  const state = read();
  const found = Object.entries(state.students).find(
    ([, record]) => record.card?.publicId === publicId,
  );
  return found ? { state, studentId: found[0], record: found[1] } : null;
}

/** Store both staff portraits. The card serial stays the same, and neither is chosen yet. */
export function devAttachCraftOptions(
  publicId: string,
  options: [{ option: 1; dataUrl: string }, { option: 2; dataUrl: string }],
): CraftBrief {
  requireStaff();
  const first = portraitUrl(options[0].dataUrl);
  const second = portraitUrl(options[1].dataUrl);
  if (first === second) throw new Error("The two portraits must be different.");
  const found = recordByPublicId(publicId);
  if (!found || !briefFor(found.studentId, found.record))
    throw new Error("That student has not confirmed a companion.");
  if (found.record.craft?.choice)
    throw new Error("Reset the student choice before replacing the portraits.");
  const serial = found.record.card?.serial;
  const stored = [
    { option: 1 as const, url: first },
    { option: 2 as const, url: second },
  ];
  found.record.craft = { options: stored };
  found.record.card = {
    ...found.record.card!,
    artworkUrl: undefined,
    crafting: true,
    artOptions: stored,
  };
  persist(found.state);
  if (found.record.card.serial !== serial) throw new Error("The card serial must stay the same.");
  return briefFor(found.studentId, found.record)!;
}

/** The signed-in student picks one portrait. The choice is kept until staff reset it. */
export function devChooseCraftArt(option: 1 | 2): NovaCard {
  const { record, state } = activeRecord();
  if (!record.card) throw new Error("Your companion is being crafted");
  const options = record.craft?.options ?? [];
  if (options.length !== 2) throw new Error("Your companion is being crafted");
  if (record.craft?.choice) throw new Error("Your art choice is already saved");
  const picked = options.find((item) => item.option === option);
  if (!picked) throw new Error("Choose one of the two portraits");
  const serial = record.card.serial;
  record.craft = { options, choice: option };
  record.card = {
    ...record.card,
    artworkUrl: picked.url,
    crafting: false,
    artOptions: undefined,
  };
  persist(state);
  if (record.card.serial !== serial) throw new Error("The card serial must stay the same.");
  return structuredClone(record.card);
}

/** Staff clear the pick. Both portraits stay, and the student may choose again. */
export function devResetCraftArt(publicId: string): CraftBrief {
  requireStaff();
  const found = recordByPublicId(publicId);
  if (!found?.record.card || !found.record.craft?.choice)
    throw new Error("This student has not chosen a portrait.");
  const serial = found.record.card.serial;
  const options = found.record.craft.options ?? [];
  found.record.craft = { options };
  found.record.card = {
    ...found.record.card,
    artworkUrl: undefined,
    crafting: true,
    artOptions: options,
  };
  persist(found.state);
  if (found.record.card.serial !== serial) throw new Error("The card serial must stay the same.");
  return briefFor(found.studentId, found.record)!;
}
