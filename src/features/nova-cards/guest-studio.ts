import type { StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";

export const GUEST_SIGN_IN_REQUIRED =
  "Sign in with your AcadeMY account to save your answers and meet your companion.";

/**
 * A guest's journey, held only in this object's memory. Nothing is sent to the server or written
 * to browser storage, so refreshing or leaving starts again. Guests can answer the questions but
 * can never submit an identity, start artwork or choose a companion.
 */
export function createGuestStudioApi(): StudioApi {
  let state: StudioState = {
    active: true,
    enabled: false,
    draft: { answers: [], username: "", revision: 0 },
    publicId: null,
    identity: null,
    selected: null,
    origin: null,
    candidates: [],
  };
  return {
    load: async () => structuredClone(state),
    save: async (draft) => {
      state = { ...state, draft: { ...draft, revision: draft.revision + 1 } };
      return structuredClone(state.draft);
    },
    submit: async () => {
      throw new Error(GUEST_SIGN_IN_REQUIRED);
    },
    choose: async () => {
      throw new Error(GUEST_SIGN_IN_REQUIRED);
    },
  };
}
