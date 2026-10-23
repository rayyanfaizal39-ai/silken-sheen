// Staff queue for Cosmic Companion portraits. Students do not call an image
// generator. Staff export this list, make the portrait offline, then upload it.
import { useCallback, useEffect, useState } from "react";
import {
  craftQueueToCsv,
  craftQueueToJson,
  type CraftBrief,
  type CraftQueueApi,
} from "@/features/nova-cards/craft-queue";
import { Panel } from "./ui";

export type { CraftQueueApi };

const STATUS_LABEL: Record<CraftBrief["status"], string> = {
  awaiting_art: "Waiting for a portrait",
  pending_review: "Portrait uploaded",
  approved: "On the student's card",
};

function download(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function readPortrait(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 1_000_000) {
      reject(new Error("Choose a portrait under 1 MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("That portrait could not be read."));
    reader.readAsDataURL(file);
  });
}

export function CompanionCraftQueue({ api }: { api: CraftQueueApi }) {
  const [items, setItems] = useState<CraftBrief[]>([]);
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
    <div className="admin-content">
      <Panel
        title="Companion craft queue"
        badge={<span className="chip chip-orange">{items.length} students</span>}
      >
        <p>
          Paid students who have the Cosmic Companion feature appear here after they confirm a
          companion. Premium (RM59) includes that feature. Make each portrait offline, upload it,
          and approve it onto that student's existing card. The card serial stays the same. No image
          generator runs for the student.
        </p>
        <p>
          <button
            type="button"
            className="btn"
            disabled={!items.length}
            onClick={() =>
              download("companion-craft-queue.csv", craftQueueToCsv(items), "text/csv")
            }
          >
            Export CSV
          </button>{" "}
          <button
            type="button"
            className="btn"
            disabled={!items.length}
            onClick={() =>
              download("companion-craft-queue.json", craftQueueToJson(items), "application/json")
            }
          >
            Export JSON
          </button>
        </p>
        {message && <p role="status">{message}</p>}
        {!items.length && <div className="empty">No companion is waiting for a portrait.</div>}
        {items.map((item) => {
          const waiting = item.status === "pending_review" || Boolean(item.artworkId);
          return (
            <article
              key={item.cardId}
              aria-label={`${item.studentName} companion`}
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: "1px solid var(--line, #ffffff14)",
              }}
            >
              {item.previewUrl ? (
                <img
                  src={item.previewUrl}
                  alt={`${item.companionName} portrait preview`}
                  width={160}
                  height={240}
                  style={{ objectFit: "cover", background: "#101828", borderRadius: 12 }}
                />
              ) : (
                <div className="empty" style={{ width: 160, minHeight: 200 }}>
                  No portrait yet
                </div>
              )}
              <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                <p>
                  <strong>{item.studentName}</strong>
                  {item.form ? ` · ${item.form}` : ""} · {item.email}
                </p>
                <p>
                  {item.companionName} the {item.species} · {item.element} · {item.personality} ·
                  slot {item.slot.toUpperCase()}
                </p>
                <p style={{ color: "var(--muted)", overflowWrap: "anywhere" }}>
                  Nickname {item.username} · serial {item.serial} · card {item.publicId}
                </p>
                <p style={{ color: "var(--muted)" }}>Answers {item.answers.join(" ") || "—"}</p>
                <p>{STATUS_LABEL[item.status]}</p>
                <label style={{ display: "block", margin: "8px 0" }}>
                  {item.previewUrl ? "Replace portrait" : "Upload portrait"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    disabled={busy}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (!file) return;
                      void run(async () => {
                        const dataUrl = await readPortrait(file);
                        await api.attach(item.cardId, dataUrl, file.name);
                      }, "Portrait uploaded. Approve it to place it on the card.");
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="btn"
                  disabled={busy || !waiting}
                  onClick={() =>
                    void run(
                      () => api.approve(item.cardId),
                      "Approved. The portrait is now on the student's card.",
                    )
                  }
                >
                  Approve
                </button>
              </div>
            </article>
          );
        })}
      </Panel>
    </div>
  );
}
