import { DEV_STUDENTS } from "./students";
import { signInDevStudent } from "./session";

/** Localhost-only student picker. Loaded only while the dev bypass is active. */
export function DevSignInPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs leading-5 text-white/60">
        Local dev sign-in. These demo students exist only in this browser. No account is created and
        nothing is sent to a cloud project.
      </p>
      {DEV_STUDENTS.map((student) => (
        <button
          key={student.id}
          type="button"
          onClick={() => signInDevStudent(student.id)}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-left text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] transition hover:scale-[1.01] active:scale-[0.98]"
        >
          <span>{student.name}</span>
          <span className="text-xs font-semibold text-white/80">{student.formLevel}</span>
        </button>
      ))}
    </div>
  );
}
