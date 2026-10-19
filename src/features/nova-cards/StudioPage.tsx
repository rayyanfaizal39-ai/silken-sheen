import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { QUESTIONS, traitsFromAnswers } from "./model";
import { type StudioDraft, type StudioState } from "./studio-model";
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
import { AwakeningChamber } from "./sanctuary/AwakeningChamber";
import { WaitingSanctuary } from "./sanctuary/WaitingSanctuary";
import { OriginReveal } from "./sanctuary/OriginReveal";
import { CandidateProfile } from "./sanctuary/CandidateProfile";
import { ConfettiBurst } from "./sanctuary/ConfettiBurst";
import { useSanctuaryPreferences } from "./sanctuary/useSanctuaryPreferences";
import { soundscape } from "./sanctuary/audio";
import { GuestNotice } from "./sanctuary/GuestNotice";
import { candidatesFromStudio, type CompanionCandidate } from "./companion-candidates";
import { createGuestStudioApi } from "./guest-studio";
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
  const [preview, setPreview] = useState<"rayyan" | "mia" | "guest" | null>();
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("preview");
    setPreview(p === "rayyan" || p === "mia" || p === "guest" ? p : null);
  }, []);
  return (
    <Suspense
      fallback={
        <main className="nova-sanctuary sanctuary-loading">
          <p role="status">Opening your Cosmic Companion journey…</p>
        </main>
      }
    >
      {preview === undefined ? (
        <main className="nova-sanctuary sanctuary-loading">
          <p role="status">Opening your Cosmic Companion journey…</p>
        </main>
      ) : preview === "guest" ? (
        <GuestStudio />
      ) : preview ? (
        <MockPreview profile={preview} />
      ) : (
        <AccountStudio />
      )}
    </Suspense>
  );
}
/** A student's real, account-linked journey. The server decides who is signed in: a signed-out
 * or anonymous visitor is moved to the temporary guest journey, never shown saved data. */
function AccountStudio() {
  const [guest, setGuest] = useState(false);
  return guest ? (
    <GuestStudio />
  ) : (
    <StudioExperience api={liveApi} onSignedOut={() => setGuest(true)} />
  );
}

/** The guest journey: in memory only, reset by a refresh, unable to submit or choose. */
function GuestStudio() {
  const api = useMemo(createGuestStudioApi, []);
  return <StudioExperience api={api} guest />;
}

export function StudioExperience({
  api,
  fictional = false,
  startInDiscovery = false,
  guest = false,
  onSignedOut,
  previewCompanions,
}: {
  api: StudioApi;
  fictional?: boolean;
  startInDiscovery?: boolean;
  /** Temporary guest journey: nothing is saved and the questions end in a sign-in prompt. */
  guest?: boolean;
  /** Called when the server reports no signed-in student account. */
  onSignedOut?: () => void;
  /** Fictional preview only: independently matched companions for the reveal design. */
  previewCompanions?: CompanionCandidate[];
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
    account = useRef<string | undefined>(undefined),
    signedOut = useRef(onSignedOut),
    hatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preferences = useSanctuaryPreferences();
  useEffect(() => {
    let mounted = true;
    api
      .load()
      .then((s) => {
        if (mounted) {
          account.current = s.account;
          setState(s);
          setUsername(s.draft.username);
          soundscape.setReturning(s.draft.answers.length > 0 || !!s.identity);
          setStarted(startInDiscovery || s.draft.answers.length > 0 || !!s.identity);
        }
      })
      .catch((e) => {
        if (!mounted) return;
        const problem = novaAccessProblem(e);
        if (problem === "signedOut" && signedOut.current) signedOut.current();
        else setLoadProblem(problem);
      })
      .finally(() => {
        if (mounted) setBusy(false);
      });
    const refresh = () => {
      if (document.visibilityState !== "hidden" && !pending.current)
        api
          .load()
          .then((s) => {
            if (!mounted || pending.current) return;
            // Another student signed in on this browser: start over rather than mix journeys.
            if (account.current && s.account !== account.current) {
              window.location.reload();
              return;
            }
            setState((previous) =>
              previous && previous.draft.revision > s.draft.revision ? previous : s,
            );
          })
          .catch((e) => {
            // Signed out in another tab: drop this student's journey from the screen.
            if (mounted && account.current && novaAccessProblem(e) === "signedOut")
              window.location.reload();
          });
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
  const chamber = !!state?.active && !selected && !awakening && !quiz && !!traits;
  const waiting = awakening && !(state?.origin?.ready && hatch === "revealed" && traits);
  // In the fictional preview each candidate carries its own data, so the confirmed companion is
  // the very candidate the student chose. Real accounts load their saved card instead.
  const chosenPreview =
    fictional && state?.selected
      ? previewCompanions?.find((c) => c.id === state.selected)
      : undefined;
  useEffect(() => {
    root.current?.querySelector<HTMLHeadingElement>("h1")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [answers.length, started, confirming, awakening, selected, hatch]);
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
      {/* The awakening, waiting and profile screens bring their own garden; the starfield would be hidden work. */}
      {!quiz && !intro && !chamber && !waiting && !selected && (
        <CosmicCanvas
          reducedMotion={preferences.reducedMotion}
          activeElement={
            traits?.element === "Water" ? "Water" : traits?.element === "Fire" ? "Solar" : "Astral"
          }
        />
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
            notice={guest ? <GuestNotice /> : undefined}
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
        <div className={chosenPreview ? "ccprof-page" : "sanctuary-content sanctuary-owned"}>
          <p className="sanctuary-permanent-note">
            Your companion choice is permanent. Your Cosmic Card stays with you.
          </p>
          {chosenPreview ? (
            <CandidateProfile
              companion={chosenPreview}
              username={state.draft.username}
              fictional={fictional}
            />
          ) : (
            <Suspense fallback={<p role="status">Opening your collectible…</p>}>
              <CompletedCard
                fictional={fictional}
                publicId={state.publicId!}
                candidate={state.selected!}
                traits={fictional ? state.identity?.traits : undefined}
              />
            </Suspense>
          )}
        </div>
      ) : awakening && state.origin?.ready && hatch === "revealed" && traits ? (
        <>
          <ConfettiBurst calm={preferences.reducedMotion} />
          <OriginReveal
            fictional={fictional}
            companions={
              fictional && previewCompanions
                ? previewCompanions
                : candidatesFromStudio(traits, state.candidates)
            }
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
        <>
          {hatch === "hatching" && <ConfettiBurst calm={preferences.reducedMotion} />}
          <WaitingSanctuary
            origin={state.origin!}
            fictional={fictional}
            calm={preferences.reducedMotion}
            hatching={hatch === "hatching"}
            busy={busy}
            learningHref={academyHomeHref}
            onCheck={() => void perform(async () => setState(await api.load()))}
            onReveal={reveal}
          />
        </>
      ) : quiz ? (
        <>
          <CinematicFlightWorld
            currentQuestionIndex={answers.length}
            answers={Object.fromEntries(answers.map((answer, i) => [i + 1, answer]))}
            busy={busy}
            reducedMotion={preferences.reducedMotion}
            guest={guest}
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
          {guest && <GuestNotice compact />}
          <SceneControls calm={preferences.reducedMotion} onCalm={preferences.toggleMotion} />
        </>
      ) : traits && guest ? (
        <AwakeningChamber
          traits={traits}
          answers={answers}
          calm={preferences.reducedMotion}
          intro="These traits came from your answers. Sign in to save them and begin your lifelong companion journey."
          notice={<GuestNotice />}
          continueLabel="Sign in to save my companion"
          continueDisabled={false}
          onContinue={() => window.location.assign(signInHref(cardsPaths.studio))}
          backLabel="Review answers"
          backDisabled={busy}
          onBack={() =>
            void perform(async () => {
              const draft = await api.save({ ...state.draft, answers: answers.slice(0, -1) });
              setState({ ...state, draft });
            })
          }
        />
      ) : traits ? (
        <AwakeningChamber
          traits={traits}
          answers={answers}
          calm={preferences.reducedMotion}
          intro={
            !confirming
              ? "These are the unique traits that make your connection with your companion special."
              : state.enabled
                ? "Two unique Origin artworks will take shape from this exact identity. Return tomorrow, once both artworks are ready, to make your permanent choice."
                : "Your identity is saved. Origin artwork creation has not launched yet, so no artwork will be made and nothing is charged until it opens."
          }
          nickname={
            !state.identity &&
            !confirming && (
              <label className="sanctuary-nickname cca-nickname">
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
            )
          }
          continueLabel={
            busy ? "Saving…" : confirming ? "Summon my companion" : "Continue my journey"
          }
          continueDisabled={
            busy ||
            (!state.identity && !/^[A-Za-z0-9_]{2,24}$/.test(username)) ||
            (confirming && !state.enabled)
          }
          onContinue={() =>
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
          notice={
            confirming &&
            !state.enabled && (
              <p className="sanctuary-status-box">
                Generation is awaiting launch approval. Your answers are saved; no paid request has
                been made.
              </p>
            )
          }
          backLabel={
            !state.identity ? (confirming ? "Review identity" : "Review answers") : undefined
          }
          backDisabled={busy}
          onBack={
            !state.identity
              ? () =>
                  void perform(async () => {
                    if (confirming) {
                      setConfirming(false);
                      return;
                    }
                    const draft = await api.save({ ...state.draft, answers: answers.slice(0, -1) });
                    setState({ ...state, draft });
                  })
              : undefined
          }
        />
      ) : null}
      {!quiz && !intro && (
        <footer className="sanctuary-footer">
          COSMIC COMPANION · DISCOVER · CHOOSE · KEEP YOUR CARD{" "}
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
