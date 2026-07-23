import type { ReactNode, RefObject } from "react";

import type { VideoBlock as VideoBlockData } from "@/content/types";

import { VideoBlock } from "./VideoBlock";

interface NotesContentWithVideoProps {
  children: ReactNode;
  notesContentRef: RefObject<HTMLDivElement | null>;
  video?: VideoBlockData;
  className?: string;
}

export function NotesContentWithVideo({
  children,
  notesContentRef,
  video,
  className,
}: NotesContentWithVideoProps) {
  return (
    <>
      <div ref={notesContentRef} data-notes-reading-content className={className}>
        {children}
      </div>
      {video && <VideoBlock id="video" video={video} />}
    </>
  );
}
