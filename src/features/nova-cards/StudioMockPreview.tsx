import { useMemo, useState } from "react";
import { DEMO_CARDS, traitsFromAnswers } from "./model";
import { companionSvg } from "./artwork";
import { svgUrl } from "./codes";
import { StudioExperience, type StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";
import { SOURCE_FOX_ARTWORK } from "./sanctuary/preview-artwork";
const SCENES = [
  "welcome",
  "quiz",
  "creatures",
  "identity",
  "waiting",
  "reveal",
  "selected",
] as const;
export default function StudioMockPreview({ profile }: { profile: "rayyan" | "mia" }) {
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
      xp: 0,
      earnedStage: 1,
      origin: null,
      candidates: [],
      evolutions: [],
    };
    if (scene === "creatures") state.draft.answers = [0];
    if (scene !== "welcome" && scene !== "quiz" && scene !== "creatures")
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
            profile === "mia"
              ? SOURCE_FOX_ARTWORK[candidate === "a" ? 0 : 1]
              : svgUrl(companionSvg(card.traits, candidate, 1)),
        })),
      };
    };
    if (["waiting", "reveal", "selected"].includes(scene)) {
      state = {
        ...state,
        publicId: card.publicId,
        identity: { version: "nova-identity-v1", answers, traits: card.traits },
        origin: {
          status: "running",
          revealAfter: "2026-10-17T16:00:00Z",
          ready: false,
          errorCode: null,
          completed: 1,
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
            revealAfter: "2026-10-17T16:00:00Z",
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
      evolve: async () => state,
    };
  }, [profile, scene]);
  return (
    <>
      <nav className="sanctuary-preview-toolbar" aria-label="Fictional preview scene">
        <span>FICTIONAL PREVIEW</span>
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
            {s}
          </button>
        ))}
        <a href={`/nova/studio?preview=${profile === "mia" ? "rayyan" : "mia"}`}>
          Switch companion ↗
        </a>
      </nav>
      <StudioExperience
        key={`${profile}-${scene}`}
        api={api}
        fictional
        startInDiscovery={scene === "quiz" || scene === "creatures"}
      />
    </>
  );
}
