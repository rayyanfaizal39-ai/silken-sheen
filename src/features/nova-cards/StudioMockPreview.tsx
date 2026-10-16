import { useMemo, useState } from "react";
import { DEMO_CARDS, traitsFromAnswers } from "./model";
import { companionSvg } from "./artwork";
import { svgUrl } from "./codes";
import { StudioExperience, type StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";
export default function StudioMockPreview({ profile }: { profile: "rayyan" | "mia" }) {
  const [scene, setScene] = useState("welcome");
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
    if (scene !== "welcome" && scene !== "quiz")
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
          url: svgUrl(companionSvg(card.traits, candidate, 1)),
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
      <nav className="ns-preview-toolbar" aria-label="Fictional preview scene">
        <span>Preview scene</span>
        {["welcome", "quiz", "identity", "waiting", "reveal", "selected"].map((s) => (
          <button key={s} aria-pressed={scene === s} onClick={() => setScene(s)}>
            {s}
          </button>
        ))}
        <a href={`/nova/studio?preview=${profile === "mia" ? "rayyan" : "mia"}`}>
          Switch companion ↗
        </a>
      </nav>
      <StudioExperience key={`${profile}-${scene}`} api={api} fictional />
    </>
  );
}
