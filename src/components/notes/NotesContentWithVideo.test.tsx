import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NotesContentWithVideo } from "./NotesContentWithVideo";

const chapterVideo = {
  title: "Chapter 1 video",
  youtubeId: "p6BhanQF6OE",
};

function render(video = chapterVideo) {
  return renderToStaticMarkup(
    <NotesContentWithVideo notesContentRef={createRef()} video={video}>
      <section data-final-notes-section>Final Notes section</section>
    </NotesContentWithVideo>,
  );
}

describe("NotesContentWithVideo", () => {
  it("renders exactly one correctly associated video after the complete Notes container", () => {
    const markup = render();

    expect(markup.indexOf("data-notes-reading-content")).toBeLessThan(
      markup.indexOf("data-final-notes-section"),
    );
    expect(markup.indexOf("data-final-notes-section")).toBeLessThan(markup.indexOf('id="video"'));
    expect(markup.match(/id="video"/g)).toHaveLength(1);
    expect(markup).toContain("p6BhanQF6OE");
  });

  it("keeps the video outside the progress-tracked Notes container", () => {
    const markup = render();
    const notesContainerEnd = markup.indexOf("</div>");

    expect(notesContainerEnd).toBeLessThan(markup.indexOf('id="video"'));
  });

  it("does not render an empty player for a chapter without video metadata", () => {
    const markup = renderToStaticMarkup(
      <NotesContentWithVideo notesContentRef={createRef()}>
        <section>Notes only</section>
      </NotesContentWithVideo>,
    );

    expect(markup).toContain("Notes only");
    expect(markup).not.toContain('id="video"');
    expect(markup).not.toContain("<iframe");
  });
});
