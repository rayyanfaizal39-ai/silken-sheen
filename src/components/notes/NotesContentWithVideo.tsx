import type { ReactNode, RefObject } from "react";

import type { VideoBlock as VideoBlockData } from "@/content/types";
import { useNotesPaginationScroll } from "@/hooks/useNotesPaginationScroll";

import { VideoBlock } from "./VideoBlock";

interface NotesContentWithVideoProps {
  children: ReactNode;
  notesContentRef: RefObject<HTMLDivElement | null>;
  video?: VideoBlockData;
  className?: string;
  header?: ReactNode;
  /** Language for the video block chrome. Defaults to English. */
  videoLang?: "en" | "bm";
}

export function NotesContentWithVideo({
  children,
  notesContentRef,
  video,
  className,
  header,
  videoLang = "en",
}: NotesContentWithVideoProps) {
  const { notePageTopRef, onPaginationClickCapture } = useNotesPaginationScroll();

  return (
    <>
      <div
        ref={notesContentRef}
        data-notes-reading-content
        className={className}
        onClickCapture={onPaginationClickCapture}
      >
        {header}
        <div
          ref={notePageTopRef}
          data-notes-page-top
          className="notes-page-scroll-target"
          aria-hidden="true"
        />
        {children}
      </div>
      {video && <VideoBlock id="video" video={video} lang={videoLang} />}
    </>
  );
}
