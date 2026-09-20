import { createContext, useContext } from "react";

export const NotesChapterLoadingContext = createContext({
  loading: false,
  error: false,
  retry: () => {},
});

export function useNotesChapterLoading() {
  return useContext(NotesChapterLoadingContext);
}
