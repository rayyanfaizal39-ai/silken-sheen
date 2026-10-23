import type { ExplorerFormLevel } from "@/lib/explorer-profile";

/** Fixed demo students. Identifiers are local-only and are not accounts in any cloud project. */
export interface DevStudent {
  id: string;
  email: string;
  name: string;
  formLevel: ExplorerFormLevel;
  age: number;
  /** Twelve-digit Code 128 serial reserved for this browser-only card. */
  serial: string;
}

export const DEV_STUDENTS: readonly DevStudent[] = [
  {
    id: "00000000-0000-4000-8000-00000000d101",
    email: "form1.student@dev.local",
    name: "Aisha",
    formLevel: "Form 1",
    age: 13,
    serial: "100000000101",
  },
  {
    id: "00000000-0000-4000-8000-00000000d102",
    email: "form2.student@dev.local",
    name: "Haziq",
    formLevel: "Form 2",
    age: 14,
    serial: "100000000102",
  },
];

export function devStudentById(id: string): DevStudent | undefined {
  return DEV_STUDENTS.find((student) => student.id === id);
}
