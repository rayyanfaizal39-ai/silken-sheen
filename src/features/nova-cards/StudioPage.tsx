import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { QUESTIONS, traitsFromAnswers } from "./model";
import { type StudioDraft, type StudioState } from "./studio-model";
import { studioApi } from "./local-session";
import { CinematicOpening } from "./sanctuary/CinematicOpening";
import { CinematicFlightWorld } from "./sanctuary/CinematicFlightWorld";
import { CosmicCanvas } from "./sanctuary/CosmicCanvas";
import { SanctuaryHeader } from "./sanctuary/SanctuaryHeader";
import { NovaEgg } from "./sanctuary/NovaEgg";
import { AwakeningChamber } from "./sanctuary/AwakeningChamber";
import { WaitingSanctuary } from "./sanctuary/WaitingSanctuary";
import { OriginReveal } from "./sanctuary/OriginReveal";
import { CandidateProfile } from "./sanctuary/CandidateProfile";
import { CardSharePanel } from "./CardSharePanel";
import { LiveCraftArtChoice } from "./CraftArtChoice";
import { useSanctuaryPreferences } from "./sanctuary/useSanctuaryPreferences";
import { soundscape } from "./sanctuary/audio";
import { GuestNotice } from "./sanctuary/GuestNotice";
import {
  candidatesFromStudio,
  companionFromSpec,
  companionsFromState,
  type CompanionCandidate,
} from "./companion-candidates";
import { profilePersonality } from "../../../supabase/functions/_shared/companion-profile";
import { createGuestStudioApi } from "./guest-studio";
import { academyHomeHref, cardsPaths, companionUpgradeHref, signInHref } from "./paths";
import { novaAccessCopy, novaAccessProblem, type NovaAccessProblem } from "./access";
import { isDevAuthBypassEnabled } from "@/lib/dev-auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import "./sanctuary/sanctuary.css";

const CompletedCard = lazy(() => import("./StudioCompletedCard"));
const MockPreview = lazy(() => import("./StudioMockPreview"));
const COMPANION_REVEAL_MS = 2500;
const COMPANION_REVEAL_STORAGE_PREFIX = "academymy:companion-reveal:";

function hasSeenCompanionReveal(key: string) {
  try {
    return sessionStorage.getItem(`${COMPANION_REVEAL_STORAGE_PREFIX}${key}`) === "complete";
  } catch {
    return false;
  }
}

function rememberCompanionReveal(key: string) {
  try {
    sessionStorage.setItem(`${COMPANION_REVEAL_STORAGE_PREFIX}${key}`, "complete");
  } catch {
    // The comparison still opens when session storage is unavailable.
  }
}

export type StudioApi = {
  load: () => Promise<StudioState>;
  save: (draft: StudioDraft) => Promise<StudioDraft>;
  submit: () => Promise<StudioState>;
  choose: (candidate: "a" | "b") => Promise<StudioState>;
};
const liveApi: StudioApi = studioApi;

export default function StudioPage() {
  const [preview, setPreview] = useState<"rayyan" | "mia" | "guest" | "connected" | null>();
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("preview");
    setPreview(p === "rayyan" || p === "mia" || p === "guest" || p === "connected" ? p : null);
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
      ) : preview === "connected" ? (
        <MockPreview profile="rayyan" connected />
      ) : preview ? (
        <MockPreview profile={preview} />
      ) : (
        <AccountStudio />
      )}
    </Suspense>
  );
}
/** A student's real, account-linked journey. A signed-out visitor is sent to Upgrade.
 * They do not start the twelve questions. Saved journeys stay on the server. */
function AccountStudio() {
  const [signedOut, setSignedOut] = useState(false);
  if (signedOut) {
    return (
      <main className="nova-sanctuary sanctuary-access">
        <h1 tabIndex={-1}>Your journey is safe.</h1>
        <p>An eligible AcadeMY learning plan is required to begin your companion journey.</p>
        <a className="sanctuary-primary" href={companionUpgradeHref}>
          Explore Nova plans ↗
        </a>
      </main>
    );
  }
  return <StudioExperience api={liveApi} onSignedOut={() => setSignedOut(true)} />;
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
  // A submitted journey can always finish, and a chosen companion is always viewable: only a
  // new journey needs an active entitlement (the server enforces all three).
  const selected = !!state?.selected;
  const awakening = !!state?.origin && !state.selected;
  const matched = state?.kind === "cosmic-companion";
  // New journeys show the same dominant personality the matcher uses; a legacy card keeps the
  // personality saved in its permanent identity.
  const identityTraits =
    traits && state?.kind !== "legacy"
      ? { ...traits, personality: profilePersonality(answers) ?? traits.personality }
      : traits;
  // The two companions on offer: each stored specification for a matched card (sent by the
  // server only once the reveal is ready); the shared identity only for legacy cards.
  const revealCompanions: CompanionCandidate[] =
    fictional && previewCompanions
      ? previewCompanions
      : !state
        ? []
        : matched
          ? companionsFromState(state)
          : traits
            ? candidatesFromStudio(traits, state.candidates)
            : [];
  const quiz =
    !!state?.active && !state.identity && !state.origin && started && answers.length < 12;
  // The opening plays once the account has loaded, so no student finishes it into a dead end.
  const intro = !busy && !started && !!state && !state.origin && !state.selected;
  const chamber = !!state?.active && !selected && !awakening && !quiz && !!traits;
  const revealReady = awakening && !!state?.origin?.ready && revealCompanions.length === 2;
  const revealing = revealReady && hatch !== "sealed";
  const waiting = awakening && !revealing;
  const revealKey = `${fictional ? "preview" : "student"}:${state?.publicId ?? "current"}`;
  // In the fictional preview each candidate carries its own data, so the confirmed companion is
  // the very candidate the student chose. Real accounts load their saved card instead.
  const chosenPreview =
    fictional && state?.selected
      ? previewCompanions?.find((c) => c.id === state.selected)
      : undefined;
  // A real matched card's chosen companion: only its own stored specification and artwork.
  const chosenCompanion =
    chosenPreview ??
    (matched && state?.companion
      ? companionFromSpec(state.companion, state.companionArtworkUrl, { chosen: true })
      : undefined);
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
  useEffect(() => {
    if (revealReady && hatch === "sealed" && hasSeenCompanionReveal(revealKey)) {
      setHatch("revealed");
    }
  }, [hatch, revealKey, revealReady]);
  useEffect(() => {
    if (hatch !== "hatching" || !preferences.reducedMotion) return;
    if (hatchTimer.current) {
      clearTimeout(hatchTimer.current);
      hatchTimer.current = null;
    }
    rememberCompanionReveal(revealKey);
    setHatch("revealed");
  }, [hatch, preferences.reducedMotion, revealKey]);

  function completeReveal() {
    if (hatchTimer.current) {
      clearTimeout(hatchTimer.current);
      hatchTimer.current = null;
    }
    rememberCompanionReveal(revealKey);
    setHatch("revealed");
  }

  function reveal() {
    if (!state?.origin?.ready || hatch !== "sealed") return;
    soundscape.playAwakeningChord();
    if (preferences.reducedMotion) {
      completeReveal();
      return;
    }
    setHatch("hatching");
    hatchTimer.current = setTimeout(completeReveal, COMPANION_REVEAL_MS);
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
      ) : !state.active && !state.origin && !state.selected ? (
        <section className="sanctuary-content sanctuary-access">
          <NovaEgg />
          <h1 tabIndex={-1}>Your journey is safe.</h1>
          <p>
            An eligible AcadeMY learning plan is required to begin your companion journey. Your
            saved answers are preserved.
          </p>
          <a className="sanctuary-primary" href={companionUpgradeHref}>
            Explore Nova plans ↗
          </a>
        </section>
      ) : selected ? (
        <div className={chosenCompanion ? "ccprof-page" : "sanctuary-content sanctuary-owned"}>
          <p className="sanctuary-permanent-note">
            Your companion choice is permanent. Your Cosmic Card stays with you.
          </p>
          <DevGeneratedCardSlot selected={selected} />
          {!fictional ? <LiveCraftArtChoice /> : null}
          {chosenCompanion ? (
            <CandidateProfile
              companion={chosenCompanion}
              username={state.draft.username}
              fictional={fictional}
              collectionHref={chosenPreview ? undefined : cardsPaths.home}
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
          {!fictional && state.publicId ? <CardSharePanel publicId={state.publicId} /> : null}
        </div>
      ) : revealReady ? (
        <div className="companion-reveal-flow" data-reveal={hatch}>
          {hatch !== "revealed" && (
            <div
              className="companion-reveal-flow__waiting"
              aria-hidden={hatch !== "sealed"}
              inert={hatch !== "sealed" ? true : undefined}
            >
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
            </div>
          )}
          {revealing && (
            <div className="companion-reveal-flow__comparison">
              <OriginReveal
                fictional={fictional}
                companions={revealCompanions}
                busy={busy}
                error={notice}
                revealing={hatch === "hatching"}
                onRevealComplete={completeReveal}
                onChoose={(candidate) =>
                  perform(async () => {
                    setState(await api.choose(candidate));
                    soundscape.playBondSealedChime();
                  })
                }
              />
            </div>
          )}
        </div>
      ) : awakening ? (
        <>
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
          traits={identityTraits!}
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
          traits={identityTraits!}
          answers={answers}
          calm={preferences.reducedMotion}
          intro={
            !confirming
              ? "These are the unique traits that make your connection with your companion special."
              : state.enabled
                ? "Your answers will be matched with two different companions. They can be revealed 24 hours after you summon them, once both of their portraits are ready, and then you make your permanent choice."
                : "Your identity is saved. Companion matching has not opened yet, so nothing has been submitted."
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
                Cosmic Companion has not opened yet. Your answers are saved, and you can summon your
                companions as soon as it opens.
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
function DevGeneratedCardSlot({ selected }: { selected: boolean }) {
  const [CardView, setCardView] = useState<ComponentType | null>(null);
  useEffect(() => {
    if (
      import.meta.env.DEV &&
      selected &&
      isDevAuthBypassEnabled(window.location.hostname, isSupabaseConfigured)
    ) {
      let cancelled = false;
      void import("@/lib/dev-auth/DevGeneratedCard").then((mod) => {
        if (!cancelled) setCardView(() => mod.DevGeneratedCard);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [selected]);
  if (!import.meta.env.DEV || !CardView) return null;
  return <CardView />;
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
