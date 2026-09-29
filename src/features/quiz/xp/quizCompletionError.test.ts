import { describe, expect, it } from "vitest";
import {
  QuizCompletionError,
  classifyQuizSaveFailure,
  quizSaveFailureKindOf,
  quizSaveFailureMessage,
} from "./quizCompletionError";

describe("quiz save failure classification", () => {
  it.each([
    ["network failure", { code: "", message: "TypeError: Failed to fetch" }, 0, "offline"],
    ["expired JWT", { code: "PGRST301", message: "JWT expired" }, 401, "session_expired"],
    ["missing auth", { code: "42501", message: "Authentication required" }, 403, "session_expired"],
    [
      "missing function",
      { code: "PGRST202", message: "Could not find the function" },
      404,
      "server",
    ],
    [
      "database error",
      { code: "22P02", message: "invalid input syntax for type integer" },
      400,
      "server",
    ],
  ] as const)("%s -> %s", (_label, error, status, expected) => {
    expect(classifyQuizSaveFailure(error, { status })).toBe(expected);
  });

  it("treats an unknown thrown value as a server failure", () => {
    expect(quizSaveFailureKindOf(new Error("boom"))).toBe("server");
    expect(quizSaveFailureKindOf(new QuizCompletionError("offline", { message: "x" }))).toBe(
      "offline",
    );
  });

  it("only blames the connection for real offline failures", () => {
    expect(quizSaveFailureMessage("server")).toBe("We couldn't save your XP. Please try again.");
    expect(quizSaveFailureMessage("session_expired")).toMatch(/sign in again/);
    expect(quizSaveFailureMessage("offline")).toMatch(/offline/);
    expect(quizSaveFailureMessage("server")).not.toMatch(/connection|offline/i);
    expect(quizSaveFailureMessage("server", true)).toBe(
      "Kami tidak dapat menyimpan XP anda. Sila cuba lagi.",
    );
  });
});
