// Admin review of generated Cosmic Companion artwork. Students never see artwork until both of
// their candidates are approved here (and their 24-hour reveal has passed). Authority lives in
// SQL (nova_require_admin); this panel only presents the queue and the decisions.
import { useCallback, useEffect, useState } from "react";
import { Panel, Pill } from "./ui";
import {
  decideCompanionArtwork,
  getCompanionReviewQueue,
  retryCompanionCandidate,
  type ReviewItem,
} from "@/features/nova-cards/review.server";

export interface CompanionReviewApi {
  queue: () => Promise<ReviewItem[]>;
  decide: (input: {
    artworkId: string;
    decision: "approve" | "reject";
    note: string | null;
  }) => Promise<unknown>;
  retry: (input: { cardId: string; slot: "a" | "b"; reason: string }) => Promise<unknown>;
}
const serverApi: CompanionReviewApi = {
  queue: () => getCompanionReviewQueue(),
  decide: (data) => decideCompanionArtwork({ data }),
  retry: (data) => retryCompanionCandidate({ data }),
};

/** Below this many differing hash bits, the sibling candidate may be a near-duplicate. */
const SIMILAR_BITS = 10;

export function CompanionArtworkReview({ api = serverApi }: { api?: CompanionReviewApi }) {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [rejected, setRejected] = useState<{ cardId: string; slot: "a" | "b" }[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems(await api.queue());
      setMessage(null);
    } catch (error) {
      setMessage((error as Error).message);
    }
  }, [api]);
  useEffect(() => {
    void load();
  }, [load]);

  async function run(action: () => Promise<unknown>, done: string) {
    setBusy(true);
    try {
      await action();
      setMessage(done);
      await load();
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel
      title="Cosmic Companion artwork review"
      badge={<span className="chip chip-orange">{items.length} waiting</span>}
    >
      {message && <p role="status">{message}</p>}
      {!items.length && <div className="empty">No artwork is waiting for review.</div>}
      {items.map((item) => {
        const note = notes[item.artworkId] ?? "";
        const similar = item.sibling?.distance != null && item.sibling.distance < SIMILAR_BITS;
        return (
          <article
            key={item.artworkId}
            aria-label={`Candidate ${item.slot.toUpperCase()} artwork`}
            style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}
          >
            {item.url ? (
              <img
                src={item.url}
                alt={`Candidate ${item.slot.toUpperCase()}`}
                width={160}
                height={240}
                style={{
                  background: "repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 0 0/16px 16px",
                }}
              />
            ) : (
              <div className="empty">Preview unavailable</div>
            )}
            <div style={{ flex: "1 1 260px", minWidth: 0 }}>
              <p>
                <strong>{item.candidate?.name ?? "Companion"}</strong> · {item.candidate?.species} ·{" "}
                {item.candidate?.element} · {item.candidate?.personality} · slot{" "}
                {item.slot.toUpperCase()}
              </p>
              <p style={{ color: "var(--muted)", overflowWrap: "anywhere" }}>
                DNA {item.dna?.fingerprint?.slice(0, 12)} · file {item.sha256.slice(0, 12)}
              </p>
              {item.checks?.warnings?.map((w) => (
                <Pill key={w} kind="warning">
                  {w.replace(/_/g, " ")}
                </Pill>
              ))}
              {similar && (
                <Pill kind="warning">
                  looks like the other candidate ({item.sibling?.distance} bits)
                </Pill>
              )}
              <label style={{ display: "block", marginTop: 8 }}>
                Rejection note
                <textarea
                  value={note}
                  maxLength={500}
                  onChange={(e) => setNotes({ ...notes, [item.artworkId]: e.target.value })}
                  style={{ display: "block", width: "100%" }}
                />
              </label>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  run(
                    () =>
                      api.decide({ artworkId: item.artworkId, decision: "approve", note: null }),
                    "Approved.",
                  )
                }
              >
                Approve
              </button>{" "}
              <button
                type="button"
                disabled={busy || note.trim().length < 8}
                onClick={() =>
                  run(async () => {
                    await api.decide({ artworkId: item.artworkId, decision: "reject", note });
                    setRejected((r) => [...r, { cardId: item.cardId, slot: item.slot }]);
                  }, "Rejected. The student keeps waiting; you can request one retry below.")
                }
              >
                Reject
              </button>
            </div>
          </article>
        );
      })}
      {rejected.map((r) => (
        <p key={`${r.cardId}-${r.slot}`}>
          Candidate {r.slot.toUpperCase()} was rejected.{" "}
          <button
            type="button"
            disabled={busy}
            onClick={() =>
              run(async () => {
                await api.retry({ ...r, reason: "Rejected in review; regenerate once." });
                setRejected((list) => list.filter((x) => x !== r));
              }, "Retry queued. It still needs generation to be enabled.")
            }
          >
            Request one retry
          </button>
        </p>
      ))}
    </Panel>
  );
}
