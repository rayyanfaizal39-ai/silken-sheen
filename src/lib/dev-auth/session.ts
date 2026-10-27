import type { AuthUser } from "@/context/auth-context";
import type { ExplorerProfile } from "@/lib/explorer-profile";
import { clearGuestMode } from "@/lib/guest-mode";
import {
  devAuthActiveStudentId,
  devExplorerProfile,
  signInDevStudentRecord,
  signOutDevStudentRecord,
} from "./store";
import { DEV_STUDENTS, devStudentById } from "./students";

export interface DevAuthSnapshot {
  user: AuthUser | null;
  profile: ExplorerProfile | null;
}

const listeners = new Set<(snapshot: DevAuthSnapshot) => void>();

export function devAuthSnapshot(): DevAuthSnapshot {
  const student = devStudentById(devAuthActiveStudentId() ?? "");
  if (!student) return { user: null, profile: null };
  return {
    user: {
      id: student.id,
      email: student.email,
      name: student.name,
      avatarUrl: undefined,
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    profile: devExplorerProfile(student),
  };
}

function emit() {
  const snapshot = devAuthSnapshot();
  for (const listener of listeners) listener(snapshot);
}

export function subscribeDevAuth(listener: (snapshot: DevAuthSnapshot) => void) {
  listeners.add(listener);
  listener(devAuthSnapshot());
  return () => {
    listeners.delete(listener);
  };
}

export function signInDevStudent(studentId = DEV_STUDENTS[0].id) {
  signInDevStudentRecord(studentId);
  clearGuestMode();
  emit();
}

export function signOutDevStudent() {
  signOutDevStudentRecord();
  emit();
}
