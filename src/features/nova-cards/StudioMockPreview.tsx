import { useMemo, useState } from "react";
import { DEMO_CARDS, traitsFromAnswers } from "./model";
import { companionSvg } from "./artwork";
import { svgUrl } from "./codes";
import { StudioExperience, type StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";
import { SOURCE_FOX_ARTWORK } from "./sanctuary/preview-artwork";
import { cardsPaths } from "./paths";
import { FICTIONAL_CANDIDATES } from "./companion-candidates";
import { CONNECTED_PREVIEW_COMPANIONS } from "./connected-preview-fixture";
const SCENES = [
  "welcome",
  "quiz",
  "resume",
  "creatures",
  "identity",
  "waiting",
  "window",
  "failed",
  "reveal",
  "selected",
] as const;
/** Toolbar names for the simulated waiting states. */
const SCENE_LABELS: Partial<Record<(typeof SCENES)[number], string>> = {
  resume: "Resume",
  waiting: "Waiting",
  window: "Window open",
  failed: "Failed",
};
const HOUR = 3_600_000;
/**
 * Fictional Studio scenes. `connected` drives the REAL account rendering path instead: matched
 * cards (`kind: "cosmic-companion"`) whose two companions come from stored-format specifications
 * (a generated fixture), not the hand-written preview companions.
 */
export default function StudioMockPreview({
  profile,
  connected = false,
}: {
  profile: "rayyan" | "mia";
  connected?: boolean;
}) {
  const [scene, setScene] = useState(() => {
    const value =
      typeof window === "undefined"
        ? null
        : new URLSearchParams(window.location.search).get("scene");
    return value && SCENES.some((s) => s === value) ? value : "welcome";
  });
  const api = useMemo<StudioApi>(() => {
    const card = DEMO_CARDS[profile === "mia" ? 1 : 0];
    const answers = profile === "mia" ? [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0] : Array(12).fill(0);
    let state: StudioState = {
      active: true,
      enabled: true,
      draft: { answers: [], username: card.username, revision: 0 },
      publicId: null,
      identity: null,
      selected: null,
      origin: null,
      candidates: [],
    };
    if (scene === "creatures") state.draft.answers = [0];
    // A returning student who stopped after six questions.
    if (scene === "resume")
      state.draft = { ...state.draft, answers: answers.slice(0, 6), revision: 1 };
    if (!["welcome", "quiz", "resume", "creatures"].includes(scene))
      state = { ...state, draft: { answers, username: card.username, revision: 1 } };
    const reveal = () => {
      state = {
        ...state,
        origin: {
          status: "ready",
          revealAfter: "2026-10-16T16:00:00Z",
          ready: true,
          errorCode: null,
          completed: 2,
        },
        candidates: (["a", "b"] as const).map((candidate) => ({
          candidate,
          url:
            profile === "mia" &&
            JSON.stringify(state.identity?.traits) === JSON.stringify(card.traits)
              ? SOURCE_FOX_ARTWORK[candidate === "a" ? 0 : 1]
              : svgUrl(companionSvg(state.identity?.traits ?? card.traits, candidate, 1)),
        })),
      };
    };
    if (["waiting", "window", "failed", "reveal", "selected"].includes(scene)) {
      // Fictional reveal times relative to now, so each simulated waiting state looks real.
      const revealAfter =
        scene === "waiting" || scene === "failed"
          ? new Date(Date.now() + 12 * HOUR + 36 * 60_000 + 22_000).toISOString()
          : scene === "window"
            ? new Date(Date.now() - 2 * HOUR).toISOString()
            : "2026-10-17T16:00:00Z";
      state = {
        ...state,
        publicId: card.publicId,
        identity: { version: "nova-identity-v1", answers, traits: card.traits },
        origin: {
          status: scene === "failed" ? "failed" : "running",
          revealAfter,
          ready: false,
          errorCode: scene === "failed" ? "preview_failure" : null,
          completed: scene === "failed" ? 0 : 1,
        },
      };
    }
    if (scene === "reveal" || scene === "selected") reveal();
    if (scene === "selected") state.selected = "a";
    return {
      load: async () => structuredClone(state),
      save: async (d) => {
        state = { ...state, draft: { ...d, revision: d.revision + 1 } };
        return state.draft;
      },
      submit: async () => {
        state = {
          ...state,
          publicId: card.publicId,
          identity: {
            version: "nova-identity-v1",
            answers: state.draft.answers,
            traits: traitsFromAnswers(state.draft.answers),
          },
          origin: {
            status: "running",
            // A day from now, so a freshly submitted preview shows the countdown, not an open window.
            revealAfter: new Date(Date.now() + 24 * HOUR).toISOString(),
            ready: false,
            errorCode: null,
            completed: 0,
          },
        };
        return state;
      },
      choose: async (candidate) => {
        state = { ...state, selected: candidate, candidates: [] };
        return state;
      },
    };
  }, [profile, scene]);
  // Shape each state as the server does for a matched card: no companions before the reveal,
  // both at the reveal, only the chosen one afterwards. No fictional SVG artwork: those drawings
  // show the old shared identity, so companions appear as their mystery silhouettes.
  const studioApi = useMemo<StudioApi>(() => {
    if (!connected) return api;
    const shape = (s: StudioState): StudioState => ({
      ...s,
      kind: s.origin ? "cosmic-companion" : null,
      candidates: [],
      companions: s.origin?.ready && !s.selected ? CONNECTED_PREVIEW_COMPANIONS : [],
      companion: s.selected ? CONNECTED_PREVIEW_COMPANIONS[s.selected === "a" ? 0 : 1] : null,
    });
    return {
      load: async () => shape(await api.load()),
      save: api.save,
      submit: async () => shape(await api.submit()),
      choose: async (candidate) => shape(await api.choose(candidate)),
    };
  }, [api, connected]);
  return (
    <>
      <nav className="sanctuary-preview-toolbar" aria-label="Fictional preview scene">
        <span>{connected ? "CONNECTED PREVIEW" : "FICTIONAL PREVIEW"}</span>
        {/* Lives in the reserved toolbar so it never covers the journey's buttons or cards. */}
        <small className="sanctuary-preview-disclosure">Nothing is saved · No AI charges</small>
        {SCENES.map((s) => (
          <button
            key={s}
            aria-pressed={scene === s}
            onClick={() => {
              setScene(s);
              const url = new URL(window.location.href);
              url.searchParams.set("scene", s);
              window.history.replaceState(null, "", url);
            }}
          >
            {SCENE_LABELS[s] ?? s}
          </button>
        ))}
        <a href={`${cardsPaths.studio}?preview=${profile === "mia" ? "rayyan" : "mia"}`}>
          Switch companion ↗
        </a>
      </nav>
      <StudioExperience
        key={`${profile}-${scene}-${connected}`}
        api={studioApi}
        fictional
        previewCompanions={connected ? undefined : FICTIONAL_CANDIDATES}
        startInDiscovery={scene === "quiz" || scene === "creatures"}
      />
    </>
  );
}
