// @vitest-environment jsdom
import { act, createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as registry from "@/content/registry";
import * as content from "@/data/content";
import { mathF3C2QuestionBankBM as mathF3C2QuizzesBM } from "@/content/form3/math/chapter-2/quizzes-bm";
import { mathF3C2QuestionBankDLP as mathF3C2QuizzesDLP } from "@/content/form3/math/chapter-2/quizzes-dlp";
import { mathF3C3QuestionBankBM as mathF3C3QuizzesBM } from "@/content/form3/math/chapter-3/quizzes-bm";
import { mathF3C3QuestionBankDLP as mathF3C3QuizzesDLP } from "@/content/form3/math/chapter-3/quizzes-dlp";
import { Route } from "./quizzes";

const state = vi.hoisted(() => ({ lang: "bm" as "bm" | "dlp", recordQuizResult: vi.fn((_input: unknown) => new Promise<never>(() => {})) }));
vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children: import("react").ReactNode }) => createElement("a", { href: "#" }, children) };
});
vi.mock("@/hooks/use-content-registry", () => ({
  useContentRegistry: () => registry,
  useContentRegistryStatus: () => ({ registry, status: "ready", retry: () => {} }),
  useContentDataModule: () => content,
}));
vi.mock("@/hooks/use-progress", () => ({
  useProgress: () => ({
    progress: { xp: 0, quizzesTaken: 0, quizHistory: [], completedChapters: [] },
    awardBadge: () => {}, markChapter: () => {}, recordQuizResult: state.recordQuizResult,
  }),
}));
vi.mock("@/context/auth-context", () => ({ useAuth: () => ({ user: { id: "test-student" } }) }));
vi.mock("@/context/sign-in-modal", () => ({ useSignInModal: () => ({ open: () => {} }) }));
vi.mock("@/context/cikgu-context", () => ({ useCikgu: () => ({ openCikgu: () => {} }) }));
vi.mock("@/hooks/use-science-lang", () => ({ useScienceLang: () => ({ lang: state.lang, setLang: () => {} }) }));
vi.mock("@/lib/sounds", () => ({ sfx: new Proxy({}, { get: () => () => {} }) }));

vi.mock("@/components/quiz/useQuizStageTransition", () => ({ useQuizStageTransition: () => ({ phase: "idle", panelRef: { current: null }, busy: false, cancel: () => {}, advance: (commit: () => void) => commit() }) }));

let root: Root | null = null;
let host: HTMLDivElement | null = null;
afterEach(() => {
  if (root) act(() => root!.unmount());
  host?.remove(); root = null; host = null;
  vi.restoreAllMocks();
});

describe("Regular Form 3 maths visual quiz screen", () => {
  it.each(["bm", "dlp"] as const)("shows the %s diagram and powers before answering, then the worked explanation", (lang) => {
    state.lang = lang;
    window.history.replaceState({}, "", "/quizzes?subject=math&form=3&chapter=Chapter%201");
    vi.spyOn(Route, "useNavigate").mockReturnValue(vi.fn());
    vi.spyOn(Route, "useSearch").mockReturnValue({ subject: "math", form: 3, chapter: "Chapter 1" } as never);
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
    act(() => root!.render(createElement(Route.options.component as ComponentType)));

    const button = (label: string) => [...document.querySelectorAll("button")].find((b) => b.textContent?.includes(label));
    const noTimer = button("No Timer"); expect(noTimer).toBeTruthy();
    act(() => noTimer!.click());
    const start = button("Start Quiz"); expect(start).toBeTruthy();
    act(() => start!.click());

    const visual = document.querySelector('[data-math-visual="index-notation"]');
    expect(visual).toBeTruthy();
    const heading = document.querySelector(".quiz-arena h2");
    expect(heading?.querySelector("sup")).toBeTruthy();
    expect(heading?.textContent).not.toContain("^");
    expect(document.querySelector(".quiz-explain")).toBeNull();
    const correct = button(lang === "bm" ? "Asas" : "Base"); expect(correct).toBeTruthy();
    expect(visual!.compareDocumentPosition(correct!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    act(() => correct!.click());
    expect(document.querySelector('[data-math-visual="index-notation"]')).toBeTruthy();
    expect(document.querySelector(".quiz-explain sup")).toBeTruthy();
    expect(document.querySelector(".quiz-explain")?.textContent).toContain(lang === "bm" ? "a ialah asas" : "a is the base");
  });

  it.each((["bm", "dlp"] as const).flatMap((lang) => [12, 51].map((number) => ({ lang, number }))))("renders $lang Chapter 2 question $number and delays its solution until answering", ({ lang, number }) => {
    state.lang = lang;
    const q = (lang === "bm" ? mathF3C2QuizzesBM : mathF3C2QuizzesDLP)[number - 1];
    vi.spyOn(registry, "getChapterQuizQuestions").mockReturnValue([q]);
    window.history.replaceState({}, "", "/quizzes?subject=math&form=3&chapter=Chapter%202");
    vi.spyOn(Route, "useNavigate").mockReturnValue(vi.fn());
    vi.spyOn(Route, "useSearch").mockReturnValue({ subject: "math", form: 3, chapter: "Chapter 2" } as never);
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
    act(() => root!.render(createElement(Route.options.component as ComponentType)));
    const button = (label: string) => [...document.querySelectorAll("button")].find((b) => b.textContent?.includes(label));
    act(() => button("No Timer")!.click());
    act(() => button("Start Quiz")!.click());
    const visual = document.querySelector(`[data-math-visual="${q.visual!.kind}"]`);
    expect(visual).toBeTruthy();
    expect(visual?.getAttribute("aria-label")).toContain(number === 12 ? "0.03025" : "1.75");
    expect(document.querySelector(".quiz-explain")).toBeNull();
    const correct = [...document.querySelectorAll<HTMLButtonElement>(".quiz-arena button")].find((b) => b.textContent?.includes(number === 12 ? "3.025" : "1.75") && b.querySelector("sup")?.textContent?.endsWith(number === 12 ? "-2" : "2"));
    expect(correct).toBeTruthy();
    expect(visual!.compareDocumentPosition(correct!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    act(() => correct!.click());
    expect(correct!.className).toContain("quiz-answer-sweep");
    expect(document.querySelector(".quiz-answer-nudge")).toBeNull();
    expect(document.querySelector(".quiz-explain sup")).toBeTruthy();
    expect(document.querySelector(".quiz-explain")?.textContent).toContain(number === 51 ? "174.58" : lang === "bm" ? "2 tempat ke kanan" : "2 places right");
  });
  it.each((["bm", "dlp"] as const).flatMap(lang => [34, 46].map(number => ({ lang, number }))))("renders Chapter 3 $lang question $number and reveals working only after submission", ({ lang, number }) => {
    state.lang = lang;
    const q = (lang === "bm" ? mathF3C3QuizzesBM : mathF3C3QuizzesDLP)[number - 1];
    vi.spyOn(registry, "getChapterQuizQuestions").mockReturnValue([q]);
    window.history.replaceState({}, "", "/quizzes?subject=math&form=3&chapter=Chapter%203");
    vi.spyOn(Route, "useNavigate").mockReturnValue(vi.fn());
    vi.spyOn(Route, "useSearch").mockReturnValue({ subject: "math", form: 3, chapter: "Chapter 3" } as never);
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
    act(() => root!.render(createElement(Route.options.component as ComponentType)));
    const button = (label: string) => [...document.querySelectorAll("button")].find(b => b.textContent?.includes(label));
    act(() => button("No Timer")!.click()); act(() => button("Start Quiz")!.click());
    const visual = document.querySelector('[data-math-visual="finance-model"]');
    expect(visual).toBeTruthy();
    expect(document.querySelector(".quiz-explain")).toBeNull();
    expect(visual!.textContent).not.toContain(number === 46 ? "634.13" : "9 900");
    const correct = button(q.options[q.answerIndex]); expect(correct).toBeTruthy();
    expect(visual!.compareDocumentPosition(correct!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    act(() => correct!.click());
    expect(correct!.className).toContain("quiz-answer-sweep");
    expect(document.querySelector(".quiz-answer-nudge")).toBeNull();
    expect(document.querySelector(".quiz-explain")?.textContent).toContain(number === 46 ? "634.13" : "9 900");
    if (number === 46) expect(document.querySelector(".quiz-explain sup")).toBeTruthy();
  });

  it.each((["bm", "dlp"] as const).flatMap(lang => (["A", "B"] as const).map(set => ({ lang, set }))))("chooses $lang Set $set, runs exactly 25 questions and saves its own result", async ({ lang, set }) => {
    state.lang = lang; state.recordQuizResult.mockClear();
    const bank = registry.getChapterQuizQuestions("math", "Form 3", "Chapter 1", lang).filter(q => q.set === set);
    window.history.replaceState({}, "", "/quizzes?subject=math&form=3&chapter=Chapter%201");
    vi.spyOn(Route, "useNavigate").mockReturnValue(vi.fn());
    vi.spyOn(Route, "useSearch").mockReturnValue({ subject: "math", form: 3, chapter: "Chapter 1" } as never);
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    host = document.createElement("div"); document.body.appendChild(host); root = createRoot(host);
    act(() => root!.render(createElement(Route.options.component as ComponentType)));
    const button = (label: string) => [...document.querySelectorAll<HTMLButtonElement>("button")].find(b => b.textContent?.includes(label));
    for (const letter of ["A", "B"]) expect(button(`Set ${letter}`)?.textContent).toContain("25");
    act(() => button(`Set ${set}`)!.click());
    expect(button(`Set ${set}`)?.getAttribute("aria-pressed")).toBe("true");
    act(() => button("No Timer")!.click()); act(() => button("Start Quiz")!.click());
    expect(document.body.textContent).toContain(`Set ${set}`);
    expect(button(lang === "bm" ? "Mudah" : "Easy")).toBeUndefined();
    for (let i = 0; i < 25; i++) {
      const answers = [...document.querySelectorAll<HTMLButtonElement>(".quiz-arena button.group")];
      expect(answers).toHaveLength(4);
      expect(document.querySelector(".quiz-arena h2")).toBeTruthy();
      act(() => answers[bank[i].answerIndex].click());
      const next = document.querySelector<HTMLButtonElement>(".quiz-continue button");
      expect(next).toBeTruthy();
      await act(async () => next!.click());
    }
    expect(state.recordQuizResult).toHaveBeenCalledTimes(1);
    expect(state.recordQuizResult.mock.calls[0][0]).toMatchObject({
      quizKey: `quiz-v2:standard:math:form-3:chapter-1:${lang}:set-${set.toLowerCase()}:difficulty-all`,
      total: 25, correct: { easy: 10, medium: 10, hard: 5 },
    });
    expect(document.querySelector(".quiz-continue")).toBeNull();
    const other = set === "A" ? "B" : "A";
    act(() => button(lang === "bm" ? `Teruskan ke Set ${other}` : `Continue to Set ${other}`)!.click());
    expect(button(`Set ${other}`)?.getAttribute("aria-pressed")).toBe("true");
    expect(button(`Set ${other}`)?.textContent).toContain("25");
  });

});
