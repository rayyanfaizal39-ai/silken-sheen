import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { QUESTIONS, traitsFromAnswers } from "./model";
import {
  AWAKENING_DESCRIPTION,
  AWAKENING_RETURN,
  AWAKENING_TITLE,
  type StudioDraft,
  type StudioState,
} from "./studio-model";
import {
  chooseStudioOrigin,
  getStudioState,
  saveStudioDraft,
  submitStudioOrigin,
} from "./studio.server";
import { CinematicOpening } from "./sanctuary/CinematicOpening";
import { CinematicFlightWorld } from "./sanctuary/CinematicFlightWorld";
import { CosmicCanvas } from "./sanctuary/CosmicCanvas";
import { SanctuaryHeader } from "./sanctuary/SanctuaryHeader";
import { NovaEgg } from "./sanctuary/NovaEgg";
import { OriginReveal } from "./sanctuary/OriginReveal";
import { ConfettiBurst } from "./sanctuary/ConfettiBurst";
import { useSanctuaryPreferences } from "./sanctuary/useSanctuaryPreferences";
import { soundscape } from "./sanctuary/audio";
import { academyHomeHref, cardsPaths, signInHref, upgradeHref } from "./paths";
import { novaAccessCopy, novaAccessProblem, type NovaAccessProblem } from "./access";
import "./sanctuary/sanctuary.css";

const CompletedCard = lazy(() => import("./StudioCompletedCard"));
const MockPreview = lazy(() => import("./StudioMockPreview"));
export type StudioApi = {
  load: () => Promise<StudioState>;
  save: (draft: StudioDraft) => Promise<StudioDraft>;
  submit: () => Promise<StudioState>;
  choose: (candidate: "a" | "b") => Promise<StudioState>;
};
const liveApi: StudioApi = {
  load: () => getStudioState(),
  save: (d) => saveStudioDraft({ data: d }),
  submit: () => submitStudioOrigin(),
  choose: (c) => chooseStudioOrigin({ data: c }),
};

export default function StudioPage() {
  const [preview, setPreview] = useState<"rayyan" | "mia" | null>();
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("preview");
    setPreview(p === "rayyan" || p === "mia" ? p : null);
  }, []);
  return (
    <Suspense
      fallback={
        <main className="nova-sanctuary sanctuary-loading">
          <p role="status">Opening Nova Studio…</p>
        </main>
      }
    >
      {preview === undefined ? (
        <main className="nova-sanctuary sanctuary-loading">
          <p role="status">Opening Nova Studio…</p>
        </main>
      ) : preview ? (
        <MockPreview profile={preview} />
      ) : (
        <StudioExperience api={liveApi} />
      )}
    </Suspense>
  );
}
export function StudioExperience({
  api,
  fictional = false,
  startInDiscovery = false,
}: {
  api: StudioApi;
  fictional?: boolean;
  startInDiscovery?: boolean;
}) {
  const [state, setState] = useState<StudioState | null>(null),
    [busy, setBusy] = useState(true),
    [notice, setNotice] = useState(""),
    [loadProblem, setLoadProblem] = useState<NovaAccessProblem>("unavailable");
  const [started, setStarted] = useState(startInDiscovery),
    [confirming, setConfirming] = useState(false),
    [username, setUsername] = useState("");
  const [hatch, setHatch] = useState<"sealed" | "hatching" | "revealed">("sealed");
  const pending = useRef(false),
    root = useRef<HTMLElement>(null),
    hatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preferences = useSanctuaryPreferences();
  useEffect(() => {
    let mounted = true;
    api
      .load()
      .then((s) => {
        if (mounted) {
          setState(s);
          setUsername(s.draft.username);
          soundscape.setReturning(s.draft.answers.length > 0 || !!s.identity);
          setStarted(startInDiscovery || s.draft.answers.length > 0 || !!s.identity);
        }
      })
      .catch((e) => {
        if (mounted) setLoadProblem(novaAccessProblem(e));
      })
      .finally(() => {
        if (mounted) setBusy(false);
      });
    const refresh = () => {
      if (document.visibilityState !== "hidden" && !pending.current)
        api
          .load()
          .then((s) => {
            if (mounted && !pending.current)
              setState((previous) =>
                previous && previous.draft.revision > s.draft.revision ? previous : s,
              );
          })
          .catch(() => {});
    };
    const timer = setInterval(refresh, 45000);
    window.addEventListener("focus", refresh);
    return () => {
      mounted = false;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      if (hatchTimer.current) clearTimeout(hatchTimer.current);
    };
  }, [api, startInDiscovery]);
  async function perform(work: () => Promise<void>): Promise<boolean> {
    if (pending.current) return false;
    pending.current = true;
    setBusy(true);
    setNotice("");
    try {
      await work();
      return true;
    } catch (e) {
      setNotice((e as Error).message);
      return false;
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  const answers = state?.identity?.answers ?? state?.draft.answers ?? [];
  const traits =
    state?.identity?.traits ?? (answers.length === 12 ? traitsFromAnswers(answers) : null);
  const selected = !!state?.selected && !!state.active;
  const awakening = !!state?.origin && !state.selected && state.active;
  const quiz =
    !!state?.active && !state.identity && !state.origin && started && answers.length < 12;
  // The opening plays once the account has loaded, so no student finishes it into a dead end.
  const intro = !busy && !started && !!state && !state.origin && !state.selected;
  useEffect(() => {
    root.current?.querySelector<HTMLHeadingElement>("h1")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [answers.length, started, confirming, awakening, selected, hatch]);
  const revealDate = state?.origin?.revealAfter
    ? new Intl.DateTimeFormat("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        day: "numeric",
        month: "long",
      }).format(new Date(state.origin.revealAfter))
    : "";
  const header = (
    <SanctuaryHeader
      calm={preferences.reducedMotion}
      onCalm={preferences.toggleMotion}
      section={selected ? "My Nova" : awakening || traits ? "Awakening" : "Discovery"}
    />
  );
  function reveal() {
    if (!state?.origin?.ready || !state.active || hatch !== "sealed") return;
    setHatch("hatching");
    soundscape.playAwakeningChord();
    hatchTimer.current = setTimeout(
      () => setHatch("revealed"),
      preferences.reducedMotion ? 0 : 1300,
    );
  }
  return (
    <main
      ref={root}
      className="nova-sanctuary"
      data-fictional={fictional}
      data-calm={preferences.reducedMotion}
    >
      {!quiz && !intro && header}
      {!quiz && !intro && (
        <CosmicCanvas
          reducedMotion={preferences.reducedMotion}
          activeElement={
            traits?.element === "Water" ? "Water" : traits?.element === "Fire" ? "Solar" : "Astral"
          }
        />
      )}
      {fictional && (
        <p className="sanctuary-fictional-note">
          Fictional design preview · Nothing is saved · No AI charges
        </p>
      )}
      <div
        className="sanctuary-notice"
        role="status"
        aria-live="polite"
        hidden={!notice && !preferences.audio.message}
      >
        {notice || preferences.audio.message}
      </div>
      {busy && !state ? (
        <section className="sanctuary-loading">
          <span aria-hidden="true">✦</span>
          <h1 tabIndex={-1}>Opening your universe…</h1>
        </section>
      ) : intro ? (
        <>
          <CinematicOpening
            reducedMotion={preferences.reducedMotion}
            onStartJourney={() => setStarted(true)}
            onSkipIntro={() => setStarted(true)}
          />
          <SceneControls calm={preferences.reducedMotion} onCalm={preferences.toggleMotion} />
        </>
      ) : !state ? (
        <section className="sanctuary-content sanctuary-access" data-access-problem={loadProblem}>
          <NovaEgg phase="gathering" />
          <h1 tabIndex={-1}>{novaAccessCopy(loadProblem).title}</h1>
          <p>{novaAccessCopy(loadProblem).body}</p>
          {novaAccessCopy(loadProblem).signIn ? (
            <a className="sanctuary-primary" href={signInHref(cardsPaths.studio)}>
              Sign in to begin
            </a>
          ) : (
            <a className="sanctuary-primary" href={cardsPaths.studio}>
              Try again
            </a>
          )}
          <div className="sanctuary-preview-links">
            <a href={`${cardsPaths.studio}?preview=mia`}>Explore the fictional sanctuary ↗</a>
            <a href={`${cardsPaths.studio}?preview=rayyan`}>Meet Rayyan’s Phoenix ↗</a>
          </div>
        </section>
      ) : !state.active ? (
        <section className="sanctuary-content sanctuary-access">
          <NovaEgg />
          <h1 tabIndex={-1}>Your journey is safe.</h1>
          <p>
            An active Pro or Premium subscription is required to submit, reveal or evolve your Nova.
            Your saved answers and permanent identity are preserved.
          </p>
          <a className="sanctuary-primary" href={upgradeHref}>
            Explore Nova plans ↗
          </a>
        </section>
      ) : selected ? (
        <div className="sanctuary-content sanctuary-owned">
          <p className="sanctuary-permanent-note">
            Your Origin choice is permanent. Your card identity stays with you.
          </p>
          <Suspense fallback={<p role="status">Opening your collectible…</p>}>
            <CompletedCard
              fictional={fictional}
              publicId={state.publicId!}
              candidate={state.selected!}
              traits={fictional ? state.identity?.traits : undefined}
            />
          </Suspense>
        </div>
      ) : awakening && state.origin?.ready && hatch === "revealed" && traits ? (
        <>
          <ConfettiBurst calm={preferences.reducedMotion} />
          <OriginReveal
            fictional={fictional}
            candidates={state.candidates}
            traits={traits}
            busy={busy}
            error={notice}
            onChoose={(candidate) =>
              perform(async () => {
                setState(await api.choose(candidate));
                soundscape.playBondSealedChime();
              })
            }
          />
        </>
      ) : awakening ? (
        <section className="sanctuary-content sanctuary-awakening">
          <NovaEgg
            phase={hatch === "hatching" ? "hatching" : state.origin?.ready ? "ready" : "waiting"}
          />
          {hatch === "hatching" && <ConfettiBurst calm={preferences.reducedMotion} />}
          <p className="sanctuary-eyebrow">THE AWAKENING SANCTUARY</p>
          <h1 tabIndex={-1}>
            {hatch === "hatching"
              ? "The Nova Egg Is Hatching…"
              : state.origin?.ready
                ? "Your Nova has arrived!"
                : AWAKENING_TITLE}
          </h1>
          <p>{AWAKENING_DESCRIPTION}</p>
          {state.origin?.ready ? (
            <button className="sanctuary-primary" disabled={hatch === "hatching"} onClick={reveal}>
              Open next-day reveal · Hatch egg <span aria-hidden="true">✦</span>
            </button>
          ) : (
            <>
              <p className="sanctuary-return">{AWAKENING_RETURN}</p>
              <div className="sanctuary-status-box">
                <b>
                  {state.origin?.status === "failed"
                    ? "Your Nova needs a little more care"
                    : `${state.origin?.completed ?? 0} of 2 artworks prepared`}
                </b>
                <p>
                  {state.origin?.status === "failed"
                    ? "Generation needs attention. We’ll check the existing request before any retry; there is no need to submit again."
                    : `Reveal opens from ${revealDate} (Malaysia time), once both artworks have passed validation.`}
                </p>
                <small>
                  Batch processing can take up to 24 hours, sometimes longer. Tomorrow morning is
                  not guaranteed.
                </small>
              </div>
              <button
                className="sanctuary-primary"
                disabled={busy}
                onClick={() => void perform(async () => setState(await api.load()))}
              >
                Check arrival
              </button>
            </>
          )}
          <a className="sanctuary-subtle-link" href={academyHomeHref}>
            Continue learning ↗
          </a>
          <p className="sanctuary-fine">
            You can close this page. Return to AcadeMY Cards on any device with this account.
          </p>
        </section>
      ) : quiz ? (
        <>
          <CinematicFlightWorld
            currentQuestionIndex={answers.length}
            answers={Object.fromEntries(answers.map((answer, i) => [i + 1, answer]))}
            busy={busy}
            reducedMotion={preferences.reducedMotion}
            onCompleteJourney={() => {}}
            onPrevQuestion={() =>
              void perform(async () => {
                const draft = await api.save({ ...state.draft, answers: answers.slice(0, -1) });
                setState({ ...state, draft });
              })
            }
            onSelectAnswer={(_, answer) =>
              perform(async () => {
                const draft = await api.save({ ...state.draft, answers: [...answers, answer] });
                setState({ ...state, draft });
              })
            }
          />
          <SceneControls calm={preferences.reducedMotion} onCalm={preferences.toggleMotion} />
        </>
      ) : traits ? (
        <section className="sanctuary-content sanctuary-identity">
          <div className="sanctuary-identity-intro">
            <NovaEgg phase="gathering" />
            <p className="sanctuary-eyebrow">YOUR TWELVE CHOICES. ONE LIFELONG BOND.</p>
            <h1 tabIndex={-1}>YOUR NOVA’S DESTINY IS WRITTEN</h1>
            <p>
              {!confirming
                ? "These twelve choices stay with your Nova through every evolution."
                : state.enabled
                  ? "Two unique Origin artworks will take shape from this exact identity. Return tomorrow, once both artworks are ready, to make your permanent choice."
                  : "Your identity is saved. Origin artwork creation has not launched yet, so no artwork will be made and nothing is charged until it opens."}
            </p>
            {!state.identity && !confirming && (
              <label className="sanctuary-nickname">
                Public nickname
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  maxLength={24}
                  autoComplete="off"
                  placeholder="MoonExplorer"
                />
                <small>
                  2–24 letters, numbers or underscores. Use a nickname you are comfortable sharing.
                </small>
              </label>
            )}
            <button
              className="sanctuary-primary"
              disabled={
                busy ||
                (!state.identity && !/^[A-Za-z0-9_]{2,24}$/.test(username)) ||
                (confirming && !state.enabled)
              }
              onClick={() =>
                void perform(async () => {
                  if (!confirming) {
                    if (!state.identity) {
                      const draft = await api.save({ ...state.draft, username });
                      setState({ ...state, draft });
                    }
                    setConfirming(true);
                  } else {
                    void soundscape.play("summon");
                    setState(await api.submit());
                  }
                })
              }
            >
              {busy ? "Saving…" : confirming ? "SUMMON MY NOVA" : "Confirm my identity →"}
            </button>
            {confirming && !state.enabled && (
              <p className="sanctuary-status-box">
                Generation is awaiting launch approval. Your answers are saved; no paid request has
                been made.
              </p>
            )}
            {!state.identity && (
              <button
                className="sanctuary-subtle-button"
                disabled={busy}
                onClick={() =>
                  void perform(async () => {
                    if (confirming) {
                      setConfirming(false);
                      return;
                    }
                    const draft = await api.save({ ...state.draft, answers: answers.slice(0, -1) });
                    setState({ ...state, draft });
                  })
                }
              >
                ← {confirming ? "Review identity" : "Review answers"}
              </button>
            )}
          </div>
          <dl className="sanctuary-traits">
            {Object.entries(traits).map(([key, value]) => (
              <div key={key}>
                <dt>{key === "ability" ? "Magical gift" : key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      {!quiz && !intro && (
        <footer className="sanctuary-footer">
          NOVA STUDIO · DISCOVER · CHOOSE · OWN YOUR NOVA{" "}
          <a href={cardsPaths.demo}>Evolution study ↗</a>
        </footer>
      )}
    </main>
  );
}
function SceneControls({ calm, onCalm }: { calm: boolean; onCalm: () => void }) {
  return (
    <div className="sanctuary-scene-controls">
      <button aria-pressed={calm} onClick={onCalm} aria-label="Toggle calm motion">
        ◌ Calm motion
      </button>
      <a href={academyHomeHref}>Back to learning ↗</a>
    </div>
  );
}
