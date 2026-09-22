import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FormComingSoon } from "@/components/ChapterPicker";
import { QuizFormLoadingState, QuizFormErrorState } from "@/routes/quizzes";

const noop = () => undefined;

describe("Quiz form-level loading state", () => {
  it("shows 'Loading quizzes…' with a busy status region", () => {
    const markup = renderToStaticMarkup(<QuizFormLoadingState subjectId="science" form="Form 2" />);
    expect(markup).toContain("Loading quizzes…");
    expect(markup).toMatch(/role="status"/);
    expect(markup).toMatch(/aria-busy="true"/);
  });

  it("never shows the empty-state or error-state copy while loading", () => {
    const markup = renderToStaticMarkup(<QuizFormLoadingState subjectId="science" form="Form 2" />);
    expect(markup).not.toContain("No quizzes available yet");
    expect(markup).not.toContain("Quiz Coming Soon");
    expect(markup).not.toContain("Unable to load quizzes");
  });

  it("keeps the subject/form label visible while loading", () => {
    const markup = renderToStaticMarkup(<QuizFormLoadingState subjectId="sejarah" form="Form 3" />);
    expect(markup).toContain("Form 3");
  });
});

describe("Quiz form-level empty state (genuinely zero quizzes)", () => {
  it("shows the new 'No quizzes available yet' copy instead of the old misleading text", () => {
    const markup = renderToStaticMarkup(
      <FormComingSoon subjectId="science" form="Form 2" mode="quizzes" onBack={noop} />,
    );
    expect(markup).toContain("No quizzes available yet");
    expect(markup).toContain(
      "We’re still preparing quizzes for this chapter. Check back again soon.",
    );
    expect(markup).not.toContain("Quiz Coming Soon");
    expect(markup).not.toContain("Notes are available first");
  });

  it("keeps the subject/form label and premium card styling", () => {
    const markup = renderToStaticMarkup(
      <FormComingSoon subjectId="geography" form="Form 3" mode="quizzes" onBack={noop} />,
    );
    expect(markup).toContain("Form 3");
    // The premium gradient card + glow-orb + floating badge chrome is unchanged.
    expect(markup).toContain("rounded-[2rem]");
    expect(markup).toContain("animate-float-soft");
  });

  it("does not affect the non-quiz 'Coming Soon' copy used by notes/mindmaps/flashcards", () => {
    const markup = renderToStaticMarkup(
      <FormComingSoon subjectId="science" form="Form 2" onBack={noop} />,
    );
    expect(markup).toContain("Coming Soon");
    expect(markup).not.toContain("No quizzes available yet");
  });
});

describe("Quiz form-level error state", () => {
  it("shows 'Unable to load quizzes' and the couldn't-load message", () => {
    const markup = renderToStaticMarkup(
      <QuizFormErrorState subjectId="science" form="Form 2" onRetry={noop} onBack={noop} />,
    );
    expect(markup).toContain("Unable to load quizzes");
    expect(markup).toContain("We couldn’t load the quizzes right now.");
  });

  it("never shows the empty-state copy alongside the error", () => {
    const markup = renderToStaticMarkup(
      <QuizFormErrorState subjectId="science" form="Form 2" onRetry={noop} onBack={noop} />,
    );
    expect(markup).not.toContain("No quizzes available yet");
    expect(markup).not.toContain("Loading quizzes");
  });

  it("renders a real <button> (not a styled div/span) labelled Retry", () => {
    const markup = renderToStaticMarkup(
      <QuizFormErrorState subjectId="science" form="Form 2" onRetry={noop} onBack={noop} />,
    );
    expect(markup).toMatch(/<button[^>]*type="button"[^>]*>Retry<\/button>/);
  });
});
