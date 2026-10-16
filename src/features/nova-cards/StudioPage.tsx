import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { QUESTIONS, STAGES, traitsFromAnswers } from "./model";
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
  requestStudioEvolution,
  saveStudioDraft,
  submitStudioOrigin,
} from "./studio.server";
import "./nova-studio.css";

const CompletedCard = lazy(() => import("./StudioCompletedCard"));
const MockPreview = lazy(() => import("./StudioMockPreview"));
export type StudioApi = {
  load: () => Promise<StudioState>;
  save: (draft: StudioDraft) => Promise<StudioDraft>;
  submit: () => Promise<StudioState>;
  choose: (candidate: "a" | "b") => Promise<StudioState>;
  evolve: (stage: number) => Promise<StudioState>;
};
const liveApi: StudioApi = {
  load: () => getStudioState(),
  save: (d) => saveStudioDraft({ data: d }),
  submit: () => submitStudioOrigin(),
  choose: (c) => chooseStudioOrigin({ data: c }),
  evolve: (s) => requestStudioEvolution({ data: s }),
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
        <main className="ns-page">
          <p role="status">Opening Nova Studio…</p>
        </main>
      }
    >
      {preview === undefined ? (
        <main className="ns-page">
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
}: {
  api: StudioApi;
  fictional?: boolean;
}) {
  const [state, setState] = useState<StudioState | null>(null);
  const [busy, setBusy] = useState(true),
    [notice, setNotice] = useState("");
  const [started, setStarted] = useState(false),
    [confirming, setConfirming] = useState(false);
  const [username, setUsername] = useState(""),
    [choice, setChoice] = useState<"a" | "b" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  async function refresh() {
    setState(await api.load());
  }
  useEffect(() => {
    let active = true;
    api
      .load()
      .then((s) => {
        if (active) {
          setState(s);
          setUsername(s.draft.username);
          setStarted(s.draft.answers.length > 0 || !!s.identity);
        }
      })
      .catch((e) => {
        if (active) setNotice((e as Error).message);
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    const timer = setInterval(() => {
      if (document.visibilityState === "visible")
        api
          .load()
          .then((s) => {
            if (active)
              setState((previous) =>
                previous && previous.draft.revision > s.draft.revision ? previous : s,
              );
          })
          .catch(() => {});
    }, 45000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [api]);
  async function act(work: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setNotice("");
    try {
      await work();
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const answers = state?.identity?.answers ?? state?.draft.answers ?? [];
  const question = QUESTIONS[answers.length];
  const traits =
    state?.identity?.traits ?? (answers.length === 12 ? traitsFromAnswers(answers) : null);
  const waiting = !!state?.origin && !state.selected && !state.origin.ready;
  const revealing = !!state?.origin?.ready && !state.selected && state.active;
  useEffect(() => {
    heading.current?.focus();
  }, [answers.length, started, confirming, waiting, revealing, state?.selected]);
  const date = state?.origin?.revealAfter
    ? new Intl.DateTimeFormat("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(state.origin.revealAfter))
    : "";
  return (
    <main className="ns-page">
      <header className="ns-nav">
        <a href="/nova" aria-label="Nova collection">
          <img src="/branding/academy-icon.png" alt="AcadeMY" width="40" height="40" />
        </a>
        <span>
          NOVA <b>STUDIO</b>
        </span>
        <a href="/dashboard">
          Back to learning <span aria-hidden="true">↗</span>
        </a>
      </header>
      {fictional && (
        <aside className="ns-demo-banner">
          FICTIONAL PREVIEW · Sample SVG artwork · Nothing is saved · No AI charges{" "}
          <a href="/nova/studio">Open my Studio</a>
        </aside>
      )}
      <div className="ns-shell">
        <div className="ns-progress" aria-label="Your Nova journey">
          {["Discover", "Identity", "Awakening", "Your Nova"].map((s, i) => (
            <span
              key={s}
              className={
                (state?.selected ? 3 : state?.origin ? 2 : traits ? 1 : 0) === i ? "ns-current" : ""
              }
            >
              <b>0{i + 1}</b> {s}
            </span>
          ))}
        </div>
        <p className="ns-notice" role="status" aria-live="polite">
          {notice}
        </p>
        {busy && !state ? (
          <section className="ns-panel">
            <div className="ns-orb" aria-hidden="true">
              ✦
            </div>
            <h1 ref={heading} tabIndex={-1}>
              Opening your universe…
            </h1>
          </section>
        ) : !state ? (
          <section className="ns-welcome">
            <div>
              <p className="ns-eyebrow">ONE COMPANION. YOUR JOURNEY.</p>
              <h1 ref={heading} tabIndex={-1}>
                A little magic.
                <br />
                <em>Uniquely yours.</em>
              </h1>
              <p>
                Discover a lifelong companion, shaped by twelve choices and every learning
                milestone.
              </p>
              <a className="ns-primary" href="/login?next=/nova/studio">
                Sign in to begin
              </a>
              <p>Your existing session continues automatically when available.</p>
              <div className="ns-preview-links">
                <a href="/nova/studio?preview=rayyan">Preview Rayyan’s Phoenix ↗</a>
                <a href="/nova/studio?preview=mia">Preview Mia’s Magical Fox ↗</a>
              </div>
            </div>
            <CelestialSeal />
          </section>
        ) : state.selected && state.active ? (
          <section className="ns-panel ns-complete">
            <p className="ns-eyebrow">A LIFELONG BOND</p>
            <h1 ref={heading} tabIndex={-1}>
              Your Nova.
              <br />
              <em>Always yours.</em>
            </h1>
            <p>
              Your Origin choice is permanent. Your card, serial and scannable identity stay with
              you through all five stages.
            </p>
            <Suspense fallback={<p>Opening your collectible…</p>}>
              <CompletedCard
                fictional={fictional}
                publicId={state.publicId!}
                candidate={state.selected}
                traits={fictional ? state.identity?.traits : undefined}
              />
            </Suspense>
            <a className="ns-primary" href="/nova">
              View my collection & sharing settings ↗
            </a>
            {state.active && state.enabled && (
              <div className="ns-evolve">
                {STAGES.slice(1).map((s, i) => {
                  const stage = i + 2,
                    job = state.evolutions.find((j) => j.stage === stage);
                  return (
                    <button
                      key={s.name}
                      disabled={busy || state.earnedStage < stage || !!job}
                      onClick={() => void act(async () => setState(await api.evolve(stage)))}
                    >
                      {s.name} · {s.xp.toLocaleString()} XP{job ? ` · ${job.status}` : ""}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        ) : !state.active ? (
          <section className="ns-panel">
            <CelestialSeal />
            <h1 ref={heading} tabIndex={-1}>
              Your journey is safe.
            </h1>
            <p>
              An active Pro or Premium subscription is required to submit, reveal or evolve your
              Nova. Your saved answers and permanent identity are preserved.
            </p>
            <a className="ns-primary" href="/upgrade">
              Explore Nova plans ↗
            </a>
          </section>
        ) : waiting ? (
          <section className="ns-panel ns-waiting">
            <div className="ns-orb" aria-hidden="true">
              ✦
            </div>
            <p className="ns-eyebrow">A NEW CHAPTER IS TAKING SHAPE</p>
            <h1 ref={heading} tabIndex={-1}>
              {AWAKENING_TITLE}
            </h1>
            <p>{AWAKENING_DESCRIPTION}</p>
            <p className="ns-return">{AWAKENING_RETURN}</p>
            <div className="ns-status-box">
              <b>
                {state.origin?.status === "failed"
                  ? "A little more time, a little more care"
                  : `${state.origin?.completed ?? 0} of 2 artworks prepared`}
              </b>
              <p>
                {state.origin?.status === "failed"
                  ? "Generation needs attention. We’ll check the existing request before any retry. There is no need to submit again."
                  : `Reveal opens from ${date} (Malaysia time), once both artworks have passed validation.`}
              </p>
              <small>
                Batch processing can take up to 24 hours, sometimes longer if a retry is needed.
                Tomorrow morning is not guaranteed.
              </small>
            </div>
            <button disabled={busy} onClick={() => void act(refresh)}>
              Check arrival
            </button>
            <a href="/dashboard">Continue learning ↗</a>
            <p className="ns-fine">
              You can close this page. Return to /nova/studio on any device with this account.
            </p>
          </section>
        ) : revealing ? (
          <section className="ns-panel ns-reveal">
            <p className="ns-eyebrow">TWO POSSIBILITIES. ONE LIFELONG FRIEND.</p>
            <h1 ref={heading} tabIndex={-1}>
              Your Nova
              <br />
              <em>has arrived.</em>
            </h1>
            <p>
              Both share your exact identity. Take your time, then choose the artwork that feels
              like yours.
            </p>
            <div className="ns-candidates">
              {state.candidates.map((c) => (
                <article key={c.candidate} className={choice === c.candidate ? "ns-picked" : ""}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Inspect Origin artwork ${c.candidate.toUpperCase()} at full size`}
                  >
                    <img
                      src={c.url}
                      alt={`${traits?.colours} ${traits?.creature}, Origin artwork ${c.candidate.toUpperCase()}`}
                      width="1024"
                      height="1536"
                    />
                  </a>
                  <p>ORIGIN · ARTWORK {c.candidate.toUpperCase()}</p>
                  <button
                    aria-pressed={choice === c.candidate}
                    disabled={busy}
                    onClick={() => setChoice(c.candidate)}
                  >
                    {choice === c.candidate ? "Selected for confirmation" : "Choose this Nova"}
                  </button>
                </article>
              ))}
            </div>
            {choice && (
              <div className="ns-selection-confirm">
                <h2>Make artwork {choice.toUpperCase()} your permanent Nova?</h2>
                <p>
                  This choice locks your Origin artwork. You cannot switch later. Your identity, QR
                  and serial stay the same.
                </p>
                <button
                  className="ns-primary"
                  disabled={busy}
                  onClick={() => void act(async () => setState(await api.choose(choice)))}
                >
                  {busy ? "Saving your bond…" : "Confirm my permanent Nova"}
                </button>
                <button disabled={busy} onClick={() => setChoice(null)}>
                  Keep looking
                </button>
              </div>
            )}
          </section>
        ) : !started ? (
          <section className="ns-welcome">
            <div>
              <p className="ns-eyebrow">A LITTLE MAGIC. A LIFETIME OF GROWTH.</p>
              <h1 ref={heading} tabIndex={-1}>
                Some bonds
                <br />
                begin with
                <br />
                <em>a little wonder.</em>
              </h1>
              <p>Twelve choices. Two original artworks. One companion that grows alongside you.</p>
              <button className="ns-primary" onClick={() => setStarted(true)}>
                Discover my Nova <span aria-hidden="true">✦</span>
              </button>
              <p className="ns-fine">Your answers save as you go. Return from any device.</p>
            </div>
            <CelestialSeal />
          </section>
        ) : question ? (
          <section className="ns-quiz">
            <div>
              <p className="ns-eyebrow">
                DISCOVER YOUR NOVA · {String(answers.length + 1).padStart(2, "0")} / 12
              </p>
              <h1 ref={heading} tabIndex={-1}>
                {question.label}
              </h1>
              <p>Follow your instinct. Every choice becomes part of your companion.</p>
              <progress value={answers.length} max="12" aria-label="Questions saved" />
            </div>
            <div className="ns-options">
              {question.options.map((option, i) => (
                <button
                  key={`${option}-${i}`}
                  disabled={busy}
                  onClick={() =>
                    void act(async () => {
                      const draft = await api.save({ ...state.draft, answers: [...answers, i] });
                      setState({ ...state, draft });
                    })
                  }
                >
                  <span>0{i + 1}</span>
                  {option}
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
              {answers.length > 0 && (
                <button
                  className="ns-back"
                  disabled={busy}
                  onClick={() =>
                    void act(async () => {
                      const draft = await api.save({
                        ...state.draft,
                        answers: answers.slice(0, -1),
                      });
                      setState({ ...state, draft });
                    })
                  }
                >
                  ← Previous question
                </button>
              )}
            </div>
          </section>
        ) : traits ? (
          <section className="ns-identity">
            <div>
              <p className="ns-eyebrow">
                {confirming ? "READY TO AWAKEN" : "YOUR PERMANENT CHARACTER IDENTITY"}
              </p>
              <h1 ref={heading} tabIndex={-1}>
                {confirming ? "Let the magic" : "Meet your"}
                <br />
                <em>{confirming ? "take shape." : traits.creature + "."}</em>
              </h1>
              <p>
                {confirming
                  ? "We’ll create two distinct Origin artworks from these exact traits. Return the next calendar day to choose your favourite, once both are ready."
                  : "These twelve choices stay with your Nova through every evolution."}
              </p>
              {!state.identity && !confirming && (
                <label className="ns-nickname">
                  Public nickname
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={24}
                    autoComplete="off"
                    placeholder="MoonExplorer"
                  />
                  <small>
                    2–24 letters, numbers or underscores. Use a nickname you are comfortable
                    sharing.
                  </small>
                </label>
              )}
              <button
                className="ns-primary"
                disabled={
                  busy ||
                  (!state.identity && !/^[A-Za-z0-9_]{2,24}$/.test(username)) ||
                  (confirming && !state.enabled)
                }
                onClick={() =>
                  void act(async () => {
                    if (!confirming) {
                      if (!state.identity) {
                        const draft = await api.save({ ...state.draft, username });
                        setState({ ...state, draft });
                      }
                      setConfirming(true);
                    } else setState(await api.submit());
                  })
                }
              >
                {busy ? "Saving…" : confirming ? "Awaken my Nova ✦" : "Confirm my identity →"}
              </button>
              {confirming && !state.enabled && (
                <p className="ns-status-box">
                  Generation is awaiting launch approval. Your answers are saved; no paid request
                  has been made.
                </p>
              )}
              {!state.identity && (
                <button
                  className="ns-back"
                  disabled={busy}
                  onClick={() =>
                    void act(async () => {
                      if (confirming) {
                        setConfirming(false);
                        return;
                      }
                      const draft = await api.save({
                        ...state.draft,
                        answers: answers.slice(0, -1),
                      });
                      setState({ ...state, draft });
                    })
                  }
                >
                  ← {confirming ? "Review identity" : "Review answers"}
                </button>
              )}
              <p className="ns-fine">
                Two Origin artworks · One permanent choice · No unlimited regeneration
              </p>
            </div>
            <dl className="ns-traits">
              {Object.entries(traits).map(([key, value]) => (
                <div key={key}>
                  <dt>{key === "ability" ? "Magical gift" : key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <footer className="ns-footer">
          <span>NOVA COMPANION COLLECTION</span>
          <span>Origin · Awakened · Ascended · Mythic · Legendary</span>
          <a href="/nova/demo">Explore the evolution study ↗</a>
        </footer>
      </div>
    </main>
  );
}
function CelestialSeal() {
  return (
    <div className="ns-seal" aria-hidden="true">
      <div className="ns-seal-ring" />
      <div className="ns-seal-inner" />
      <span>✦</span>
      <i>YOUR UNIVERSE AWAITS</i>
    </div>
  );
}
