import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CalendarDays,
  Megaphone,
  Pin,
  RadioTower,
  Vote,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnnouncementPoll } from "@/components/home/AnnouncementPoll";
import {
  groupPollBallotRows,
  withCastVote,
  type PollBallot,
} from "@/components/home/announcement-polls";
import {
  ANNOUNCEMENT_COLUMNS,
  announcementLink,
  formatAnnouncementTime,
  liveAnnouncements,
  parseAnnouncement,
  type Announcement,
  type AnnouncementType,
} from "@/components/home/announcements";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AnnouncementPresentation = {
  icon: LucideIcon;
  accent: string;
  label: string;
};

const PRESENTATION: Record<AnnouncementType, AnnouncementPresentation> = {
  news: { icon: Megaphone, accent: "#22d3ee", label: "News" },
  reminder: { icon: Bell, accent: "#fbbf24", label: "Reminder" },
  urgent: { icon: AlertTriangle, accent: "#fb7185", label: "Urgent" },
  event: { icon: CalendarDays, accent: "#a78bfa", label: "Event" },
  poll: { icon: Vote, accent: "#f472b6", label: "Poll" },
};

// Unpublish and expiry are not always delivered to a reader whose new row fails
// the SELECT policy, so the visible tab also refreshes on this interval.
const REFRESH_MS = 30_000;

async function loadPollBallots(): Promise<Record<string, PollBallot>> {
  const { data, error } = await supabase.rpc("announcement_poll_ballots");
  if (error) throw error;
  return groupPollBallotRows(Array.isArray(data) ? data : []);
}

async function loadAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select(ANNOUNCEMENT_COLUMNS)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? [])
    .map((row) => parseAnnouncement(row))
    .filter((row): row is Announcement => row !== null);
}

function useClampedOverflow<T extends HTMLElement>(expanded: boolean, text: string) {
  const ref = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || expanded) return;
    setOverflows(element.scrollHeight > element.clientHeight + 1);
  }, [expanded, text]);

  return { ref, overflows };
}

function AnnouncementCard({
  item,
  now,
  ballot,
  ballotsReady,
  userId,
  onVote,
}: {
  item: Announcement;
  now: number;
  ballot: PollBallot | null;
  ballotsReady: boolean;
  userId: string | null;
  onVote: (announcementId: string, pollId: string, optionId: string) => Promise<void>;
}) {
  const presentation = PRESENTATION[item.type];
  const Icon = presentation.icon;
  const [expanded, setExpanded] = useState(false);
  const title = useClampedOverflow<HTMLHeadingElement>(expanded, item.title);
  const bodyText = item.body?.trim() ?? "";
  const body = useClampedOverflow<HTMLParagraphElement>(expanded, bodyText);
  const link = announcementLink(item.link_url);
  const canToggle = title.overflows || body.overflows || expanded;
  const posted = formatAnnouncementTime(item.created_at, now);

  return (
    <article
      className={
        item.type === "urgent"
          ? "home-mission-control__item home-mission-control__item--urgent"
          : "home-mission-control__item"
      }
      style={{ "--mission-control-accent": presentation.accent } as CSSProperties}
    >
      <span className="home-mission-control__item-icon" aria-hidden="true">
        <Icon />
      </span>

      <div className="home-mission-control__item-body">
        <div className="home-mission-control__item-meta">
          <span
            className={
              item.type === "urgent"
                ? "home-mission-control__badge home-mission-control__badge--urgent"
                : "home-mission-control__badge"
            }
          >
            {presentation.label}
          </span>
          {item.pinned ? (
            <strong>
              <Pin aria-hidden="true" />
              Pinned
            </strong>
          ) : null}
        </div>
        <h3 ref={title.ref} className={expanded ? "is-expanded" : undefined}>
          {item.title}
        </h3>
        {bodyText ? (
          <p
            ref={body.ref}
            className={
              expanded ? "home-mission-control__copy is-expanded" : "home-mission-control__copy"
            }
          >
            {bodyText}
          </p>
        ) : null}

        {canToggle ? (
          <button
            type="button"
            className="home-mission-control__toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        ) : null}

        {item.type === "poll" ? (
          <AnnouncementPoll
            ballot={ballot}
            ballotsReady={ballotsReady}
            userId={userId}
            now={now}
            onVote={onVote}
          />
        ) : null}

        <footer className="home-mission-control__item-footer">
          <span>{posted}</span>
          {link ? (
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Open
              <ArrowRight aria-hidden="true" />
            </a>
          ) : null}
        </footer>
      </div>
    </article>
  );
}

export function HomeMissionControl() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Announcement[]>([]);
  const [ballots, setBallots] = useState<Record<string, PollBallot>>({});
  const [ballotsReady, setBallotsReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [now, setNow] = useState(() => Date.now());
  const [reloadKey, setReloadKey] = useState(0);
  const userId = user?.id ?? null;
  const ballotsRef = useRef(ballots);
  ballotsRef.current = ballots;

  const refreshBallots = useCallback(async () => {
    const next = await loadPollBallots();
    setBallots(next);
    setBallotsReady(true);
  }, []);

  const castVote = useCallback(
    async (announcementId: string, pollId: string, optionId: string) => {
      if (!userId) return;
      const snapshot = ballotsRef.current[announcementId] ?? null;
      if (snapshot) {
        setBallots((current) => ({
          ...current,
          [announcementId]: withCastVote(current[announcementId] ?? snapshot, optionId),
        }));
      }
      const { error } = await supabase
        .from("announcement_poll_votes")
        .upsert(
          { poll_id: pollId, option_id: optionId, user_id: userId },
          { onConflict: "poll_id,user_id" },
        );
      if (error) {
        if (snapshot) setBallots((current) => ({ ...current, [announcementId]: snapshot }));
        throw error;
      }
      try {
        await refreshBallots();
      } catch {
        // The vote is saved. The next refresh replaces the optimistic counts.
      }
    },
    [refreshBallots, userId],
  );

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus("ready");
      return;
    }

    let active = true;
    let request = 0;
    const seen = { current: false };

    const load = async () => {
      const id = ++request;
      try {
        const [next, nextBallots] = await Promise.all([
          loadAnnouncements(),
          loadPollBallots().then(
            (loaded) => ({ ready: true as const, ballots: loaded }),
            () => ({ ready: false as const, ballots: null }),
          ),
        ]);
        if (!active || id !== request) return;
        seen.current = true;
        setRows(next);
        if (nextBallots.ready && nextBallots.ballots) {
          setBallots(nextBallots.ballots);
          setBallotsReady(true);
        }
        setStatus("ready");
        setNow(Date.now());
      } catch {
        if (!active || id !== request || seen.current) return;
        setStatus("error");
      }
    };

    void load();

    const channel = supabase
      .channel("announcements-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        void load();
      })
      .subscribe();

    const refreshIfVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", refreshIfVisible);
    const interval = window.setInterval(refreshIfVisible, REFRESH_MS);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", refreshIfVisible);
      window.clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, [reloadKey]);

  useEffect(() => {
    const upcoming = [
      ...rows.flatMap((row) => [
        Date.parse(row.starts_at),
        row.expires_at ? Date.parse(row.expires_at) : Number.NaN,
      ]),
      ...Object.values(ballots).map((ballot) =>
        ballot.closesAt ? Date.parse(ballot.closesAt) : Number.NaN,
      ),
    ].filter((time) => time > now);
    if (upcoming.length === 0) return;
    const delay = Math.max(250, Math.min(...upcoming) - now + 250);
    const timer = window.setTimeout(() => setNow(Date.now()), delay);
    return () => window.clearTimeout(timer);
  }, [ballots, rows, now]);

  const items = useMemo(() => liveAnnouncements(rows, now), [rows, now]);

  return (
    <section
      className="home-skeleton__card home-mission-control"
      aria-labelledby="mission-control-title"
      aria-busy={status === "loading"}
    >
      <header className="home-mission-control__header">
        <div className="home-mission-control__identity">
          <span className="home-mission-control__station-icon" aria-hidden="true">
            <RadioTower />
          </span>
          <div>
            <p className="home-mission-control__eyebrow">System updates</p>
            <h2 id="mission-control-title">Mission Control</h2>
            <p className="home-mission-control__subtitle">
              Live transmissions from AcadeMY Station
            </p>
          </div>
        </div>
        {status === "ready" ? (
          <span className="home-mission-control__live">
            <span className="home-mission-control__live-dot" aria-hidden="true" />
            Live
          </span>
        ) : null}
      </header>

      <div className="home-mission-control__feed">
        {status === "loading" ? (
          <p className="home-mission-control__status">Loading announcements…</p>
        ) : null}

        {status === "error" ? (
          <div className="home-mission-control__status">
            <p>Announcements are unavailable right now.</p>
            <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
              Try again
            </button>
          </div>
        ) : null}

        {status === "ready" && items.length === 0 ? (
          <p className="home-mission-control__status" role="status">
            No announcements yet
          </p>
        ) : null}

        {status === "ready"
          ? items.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                now={now}
                ballot={ballots[item.id] ?? null}
                ballotsReady={ballotsReady}
                userId={userId}
                onVote={castVote}
              />
            ))
          : null}
      </div>
    </section>
  );
}
