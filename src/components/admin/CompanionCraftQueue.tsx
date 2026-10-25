// Staff queue for Cosmic Companion portraits. Students do not call an image
// generator. Staff make two portraits of the student's one companion.
import { useCallback, useEffect, useState } from "react";
import {
  craftQueueToCsv,
  craftQueueToJson,
  craftWaitLabel,
  filterCraftQueue,
  nextCraftStudent,
  type CraftBrief,
  type CraftQueueApi,
  type CraftQueueTab,
} from "@/features/nova-cards/craft-queue";
import { Panel } from "./ui";

export type { CraftQueueApi };

const STATUS_LABEL: Record<CraftBrief["status"], string> = {
  waiting_for_art: "Make two portraits of this companion",
  options_ready: "Waiting for the student to choose",
  chosen: "Student chose a portrait",
};

const TABS: { id: CraftQueueTab; label: string }[] = [
  { id: "waiting_for_art", label: "Waiting for art" },
  { id: "options_ready", label: "Options ready" },
  { id: "chosen", label: "Chosen" },
  { id: "all", label: "All" },
];

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

function StudentRow({
  item,
  nextUp,
  busy,
  onUpload,
  onReset,
  onBrief,
}: {
  item: CraftBrief;
  nextUp: boolean;
  busy: boolean;
  onUpload: (publicId: string, files: [File, File]) => Promise<void>;
  onReset: (publicId: string) => Promise<void>;
  onBrief: (publicId: string) => Promise<void>;
}) {
  const [files, setFiles] = useState<{ 1?: File; 2?: File }>({});
  const chosen = item.status === "chosen";
  return (
    <article
      aria-label={`${item.displayName} companion`}
      data-craft-public-id={item.publicId}
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid var(--line, #ffffff14)",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2].map((option) => {
          const preview = item.options.find((entry) => entry.option === option)?.previewUrl;
          return preview ? (
            <img
              key={option}
              src={preview}
              alt={`${item.companionName} option ${option}`}
              width={120}
              height={180}
              style={{ objectFit: "cover", background: "#101828", borderRadius: 12 }}
            />
          ) : (
            <div key={option} className="empty" style={{ width: 120, minHeight: 160 }}>
              Option {option}
            </div>
          );
        })}
      </div>
      <div style={{ flex: "1 1 280px", minWidth: 0 }}>
        <p>
          <strong data-craft-position={item.position}>{item.position}</strong>
          {" · "}
          <strong>{item.displayName}</strong>
          {item.staffTest ? (
            <span className="chip" data-staff-test="true" style={{ marginLeft: 8 }}>
              Staff test
            </span>
          ) : null}
          {item.form ? ` · ${item.form}` : ""}
          {nextUp ? (
            <span className="chip chip-orange" data-next-up="true" style={{ marginLeft: 8 }}>
              Next up
            </span>
          ) : null}
        </p>
        <p>{craftWaitLabel(item.queuedAt)}</p>
        <p>
          {item.companionName} the {item.species} · {item.element} · {item.personality}
        </p>
        <p>{item.traits.length ? item.traits.join(" · ") : "No traits listed"}</p>
        <p style={{ color: "var(--muted)", overflowWrap: "anywhere" }}>Card {item.publicId}</p>
        <p style={{ color: "var(--muted)" }}>Serial {item.serial}</p>
        <p>{STATUS_LABEL[item.status]}</p>
        {item.choice ? <p>Chosen option {item.choice}</p> : null}
        <p>
          <button
            type="button"
            className="btn"
            data-craft-brief={item.publicId}
            disabled={busy}
            onClick={() => void onBrief(item.publicId)}
          >
            Download brief (JSON)
          </button>
        </p>
        {chosen ? (
          <button
            type="button"
            className="btn"
            disabled={busy}
            onClick={() => void onReset(item.publicId)}
          >
            Reset art choice
          </button>
        ) : (
          <>
            {([1, 2] as const).map((option) => (
              <label key={option} style={{ display: "block", margin: "8px 0" }}>
                Option {option}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  data-craft-file={option}
                  disabled={busy}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    setFiles((current) => ({ ...current, [option]: file }));
                  }}
                />
                {files[option] ? <span> {files[option]?.name}</span> : null}
              </label>
            ))}
            <button
              type="button"
              className="btn"
              disabled={busy || !files[1] || !files[2]}
              onClick={() => {
                const one = files[1];
                const two = files[2];
                if (!one || !two) return;
                void onUpload(item.publicId, [one, two])
                  .then(() => setFiles({}))
                  .catch(() => undefined);
              }}
            >
              Upload both options
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export function CompanionCraftQueue({ api }: { api: CraftQueueApi }) {
  const [items, setItems] = useState<CraftBrief[]>([]);
  const [tab, setTab] = useState<CraftQueueTab>("waiting_for_art");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const visible = filterCraftQueue(items, tab);
  const nextUpId = nextCraftStudent(items);

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
      throw error;
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-content">
      <Panel
        title="Companion craft queue"
        badge={<span className="chip chip-orange">{visible.length} students</span>}
      >
        <p>
          Paid students who have the Cosmic Companion feature appear here as soon as they summon
          their companion. Premium (RM59) includes that feature. Make two portraits of that
          companion, then upload both for the card's public id. The student picks one portrait. The
          card serial stays the same. No image generator runs for the student.
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
        <div role="tablist" aria-label="Craft queue status">
          {TABS.map((entry) => {
            const count =
              entry.id === "all"
                ? items.length
                : items.filter((item) => item.status === entry.id).length;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={tab === entry.id}
                className="btn"
                onClick={() => setTab(entry.id)}
              >
                {entry.label} ({count})
              </button>
            );
          })}
        </div>
        {message && <p role="status">{message}</p>}
        {!visible.length && <div className="empty">No companion is in this list.</div>}
        {visible.map((item) => (
          <StudentRow
            key={item.publicId}
            item={item}
            nextUp={item.publicId === nextUpId}
            busy={busy}
            onBrief={async (publicId) => {
              setBusy(true);
              try {
                const brief = await api.brief(publicId);
                download(
                  `companion-brief-${publicId}.json`,
                  JSON.stringify(brief, null, 2),
                  "application/json",
                );
                setMessage("Artist brief downloaded.");
              } catch (error) {
                setMessage((error as Error).message);
              } finally {
                setBusy(false);
              }
            }}
            onUpload={(publicId, [one, two]) =>
              run(async () => {
                const [first, second] = await Promise.all([readPortrait(one), readPortrait(two)]);
                await api.attachOptions(publicId, [
                  { option: 1, dataUrl: first, fileName: one.name },
                  { option: 2, dataUrl: second, fileName: two.name },
                ]);
              }, "Both portraits are ready. The student can choose one.")
            }
            onReset={(publicId) =>
              run(
                () => api.resetChoice(publicId),
                "The art choice was reset. The student can choose again.",
              )
            }
          />
        ))}
      </Panel>
    </div>
  );
}
