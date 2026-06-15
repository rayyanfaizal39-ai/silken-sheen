import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Trophy,
  Crown,
  Medal,
  GraduationCap,
  Download,
  Send,
  Sparkles,
  Star,
  Lock,
  Flame,
} from "lucide-react";
import { useProgress, getRank, getChessRating } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "@/components/Avatar";
import { buildLeaderboard, nomineesToCsv, type RankedStudent } from "@/lib/leaderboard";
import { SCHOLARSHIP_COORDINATOR_EMAIL, SCHOLARSHIP_MIN_XP } from "@/data/leaderboard";
import { analyzeProgress } from "@/lib/tracker";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Hall of Fame — AcadeMY" },
      {
        name: "description",
        content: "Top 100 KSSM students are recognised and the top 5 are put forward for scholarships.",
      },
    ],
  }),
  component: LeaderboardPage,
});

const MEDALS = ["#FBBF24", "#CBD5E1", "#FB923C"]; // gold / silver / bronze

function LeaderboardPage() {
  const { progress, setStudentProfile } = useProgress();
  const { user } = useAuth();
  const board = useMemo(() => buildLeaderboard(progress, user?.name), [progress, user?.name]);
  const me = board.currentUser;
  const insight = useMemo(
    () => analyzeProgress(progress.quizHistory ?? []),
    [progress.quizHistory],
  );

  const [name, setName] = useState(progress.displayName ?? user?.name ?? "");
  const [school, setSchool] = useState(progress.school ?? "");
  const [parentEmail, setParentEmail] = useState(progress.parentEmail ?? "");

  const podium = board.ranked.slice(0, 3);
  // Rest: ranks 4–100
  const rest = board.ranked.slice(3, 100);
  const eligible = me?.scholarshipEligible ?? false;
  const myRank = getRank(progress.xp);

  function saveProfile() {
    setStudentProfile(name.trim() || undefined, school.trim() || undefined);
  }

  function submitNomination() {
    saveProfile();
    const subject = `Scholarship Nomination — ${name || "Student"} (Rank #${me?.rank ?? "-"})`;
    const body = [
      `AcadeMY — Scholarship Nomination`,
      ``,
      `Student: ${name || "—"}`,
      `School: ${school || "—"}`,
      `Hall of Fame rank: #${me?.rank ?? "—"}`,
      `Chess Rating: ${getChessRating(me?.xp ?? 0)} (${myRank.name})`,
      `Total XP: ${(me?.xp ?? 0).toLocaleString()}`,
      `Quiz average: ${insight.overallAvg}%  ·  Pass rate: ${insight.passRate}%`,
      `Study streak: ${progress.streak} day${progress.streak !== 1 ? "s" : ""}`,
      insight.strongest
        ? `Strongest subject: ${insight.strongest.name} (${insight.strongest.avgScore}%)`
        : ``,
      parentEmail ? `Parent contact: ${parentEmail}` : ``,
      ``,
      `Please consider this student for scholarship recognition.`,
    ]
      .filter(Boolean)
      .join("\n");
    const cc = parentEmail ? `&cc=${encodeURIComponent(parentEmail)}` : "";
    window.location.href = `mailto:${SCHOLARSHIP_COORDINATOR_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}${cc}`;
  }

  function exportCsv() {
    const csv = nomineesToCsv(board.ranked);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academy-scholarship-nominees.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      {/* ── Header ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#7C3AED]/30 bg-gradient-to-br from-[#3B0764]/30 via-[#0B1220]/70 to-[#312E81]/30 p-6 backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_60%)] blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] shadow-[0_0_28px_rgba(124,58,237,0.55)]">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C4B5FD]">
              Hall of Fame · Top 100
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              The Pop Mart Grandmasters
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Students are ranked by chess rating (1000–3000). Climb from{" "}
              <span className="font-bold text-[#6B7280]">Pawn</span> all the way to{" "}
              <span className="font-bold text-[#7C3AED]">Queen ♛</span> — and the top{" "}
              {board.topN} are put forward for{" "}
              <span className="font-bold text-[#C4B5FD]">scholarship consideration</span>.
            </p>
          </div>
        </div>
      </header>

      {/* ── My rank chip ── */}
      {me && (
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl"
          style={{
            borderColor: `${myRank.color}44`,
            background: `${myRank.glowColor}`,
          }}
        >
          <span className="text-2xl">{myRank.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white/60">Your chess rating</p>
            <p className="font-display text-xl font-black" style={{ color: myRank.color }}>
              {getChessRating(progress.xp).toLocaleString()}{" "}
              <span className="text-sm font-bold opacity-70">· {myRank.name}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40">Hall of Fame</p>
            <p className="font-display text-lg font-black text-white">#{me.rank}</p>
          </div>
        </div>
      )}

      {/* ── Podium ── */}
      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
        <div className="grid grid-cols-3 items-end gap-3">
          {[1, 0, 2].map((slot) => {
            const s = podium[slot];
            if (!s) return <div key={slot} />;
            const heights = ["h-24", "h-32", "h-20"];
            const hi = slot === 0 ? 1 : slot === 1 ? 0 : 2;
            const studentRank = getRank(s.xp);
            return (
              <div key={s.id} className="flex flex-col items-center">
                <PodiumAvatar
                  student={s}
                  medal={MEDALS[slot]}
                  isMe={s.isCurrentUser}
                  avatarConfig={progress.avatar}
                  rankGlow={studentRank.glowColor}
                />
                <p className="mt-2 max-w-full truncate text-center text-xs font-bold text-white">
                  {s.name}
                </p>
                <p className="max-w-full truncate text-center text-[10px] text-white/40">
                  {s.school}
                </p>
                <ChessRankBadge xp={s.xp} small />
                <div
                  className={`mt-2 flex ${heights[hi]} w-full flex-col items-center justify-start rounded-t-xl border-t-2 pt-2`}
                  style={{
                    borderColor: MEDALS[slot],
                    background: `linear-gradient(180deg, ${MEDALS[slot]}22, transparent)`,
                  }}
                >
                  <span
                    className="font-display text-2xl font-black"
                    style={{ color: MEDALS[slot] }}
                  >
                    #{s.rank}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-white/70">
                    <Sparkles className="h-3 w-3 text-[#FBBF24]" /> {getChessRating(s.xp).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Scholarship recognition ── */}
      <ScholarshipPanel
        eligible={eligible}
        me={me}
        topN={board.topN}
        name={name}
        school={school}
        parentEmail={parentEmail}
        onName={setName}
        onSchool={setSchool}
        onParentEmail={setParentEmail}
        onSave={saveProfile}
        onSubmit={submitNomination}
        onExport={exportCsv}
        myRankColor={myRank.color}
      />

      {/* ── Top 100 ranked list ── */}
      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 backdrop-blur-2xl sm:p-4">
        <h2 className="px-2 py-2 font-display text-lg font-bold text-white">
          Full ranking · Top 100
        </h2>
        <ul className="space-y-1.5">
          {rest.map((s) => (
            <RankRow key={s.id} student={s} avatarConfig={progress.avatar} />
          ))}
        </ul>
        {me && me.rank > 100 && (
          <>
            <p className="px-2 py-1 text-center text-xs text-white/30">· · ·</p>
            <RankRow student={me} avatarConfig={progress.avatar} />
          </>
        )}
      </section>
    </section>
  );
}

// ── Chess rank badge ──────────────────────────────────────────────────────────

function ChessRankBadge({ xp, small = false }: { xp: number; small?: boolean }) {
  const r = getRank(xp);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-black ${small ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"}`}
      style={{
        background: `${r.color}18`,
        border: `1px solid ${r.color}44`,
        color: r.color,
        boxShadow: `0 0 6px ${r.glowColor}`,
      }}
    >
      {r.emoji} {r.name}
    </span>
  );
}

// ── Podium avatar ─────────────────────────────────────────────────────────────

function PodiumAvatar({
  student,
  medal,
  isMe,
  avatarConfig,
  rankGlow,
}: {
  student: RankedStudent;
  medal: string;
  isMe: boolean;
  avatarConfig: Parameters<typeof Avatar>[0]["config"];
  rankGlow: string;
}) {
  return (
    <div className="relative">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2"
        style={{ borderColor: medal, boxShadow: `0 0 22px ${medal}66`, background: `${medal}1a` }}
      >
        {isMe ? (
          <Avatar config={avatarConfig} size={52} glow={false} rankGlow={rankGlow} />
        ) : (
          <span className="font-display text-xl font-black text-white">{student.name[0]}</span>
        )}
      </div>
      <span
        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[#050816]"
        style={{ background: medal }}
      >
        <Crown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

// ── Rank row ─────────────────────────────────────────────────────────────────

function RankRow({
  student,
  avatarConfig,
}: {
  student: RankedStudent;
  avatarConfig: Parameters<typeof Avatar>[0]["config"];
}) {
  const r = getRank(student.xp);
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
        student.isCurrentUser
          ? "border-[#7C3AED]/45 bg-[#7C3AED]/10"
          : "border-white/[0.06] bg-white/[0.02]"
      }`}
    >
      <span className="w-8 shrink-0 text-center font-display text-sm font-black tabular-nums text-white/70">
        {student.rank}
      </span>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
        style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}
      >
        {student.isCurrentUser ? (
          <Avatar config={avatarConfig} size={34} glow={false} rankGlow={r.glowColor} />
        ) : (
          student.name[0]
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">
          {student.name}
          {student.isCurrentUser && (
            <span className="ml-1.5 text-[10px] font-black uppercase text-[#C4B5FD]">You</span>
          )}
        </p>
        <p className="truncate text-[11px] text-white/40">{student.school}</p>
      </div>
      {student.scholarshipEligible && (
        <span className="hidden items-center gap-1 rounded-full bg-[#FBBF24]/15 px-2 py-1 text-[10px] font-black text-[#FCD34D] sm:flex">
          <GraduationCap className="h-3 w-3" /> Nominee
        </span>
      )}
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="flex items-center gap-1 text-xs font-black tabular-nums" style={{ color: r.color }}>
          {r.emoji} {getChessRating(student.xp).toLocaleString()}
        </span>
        <span className="text-[9px] text-white/35 tabular-nums">{student.xp.toLocaleString()} XP</span>
      </div>
    </li>
  );
}

// ── Scholarship panel ────────────────────────────────────────────────────────

function ScholarshipPanel({
  eligible,
  me,
  topN,
  name,
  school,
  parentEmail,
  onName,
  onSchool,
  onParentEmail,
  onSave,
  onSubmit,
  onExport,
  myRankColor,
}: {
  eligible: boolean;
  me: RankedStudent | null;
  topN: number;
  name: string;
  school: string;
  parentEmail: string;
  onName: (v: string) => void;
  onSchool: (v: string) => void;
  onParentEmail: (v: string) => void;
  onSave: () => void;
  onSubmit: () => void;
  onExport: () => void;
  myRankColor: string;
}) {
  const xp = me?.xp ?? 0;
  const xpToGo = Math.max(0, SCHOLARSHIP_MIN_XP - xp);

  return (
    <section
      className="rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-7"
      style={{
        borderColor: eligible ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)",
        background: eligible
          ? "linear-gradient(160deg, rgba(124,58,237,0.14), rgba(11,18,32,0.6))"
          : "rgba(11,18,32,0.62)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: eligible
              ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
              : "rgba(255,255,255,0.06)",
          }}
        >
          <GraduationCap className={`h-6 w-6 ${eligible ? "text-white" : "text-white/50"}`} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">Scholarship recognition</h2>
          <p className="text-sm text-white/50">
            {eligible
              ? `You're ranked #${me?.rank} — eligible to be put forward for a scholarship. 🎓`
              : `Reach the top ${topN} (min ${SCHOLARSHIP_MIN_XP.toLocaleString()} XP) to qualify.`}
          </p>
        </div>
      </div>

      {eligible ? (
        <div className="mt-5 space-y-3">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field
              label="Full name"
              value={name}
              onChange={onName}
              placeholder="As it should appear"
            />
            <Field
              label="School"
              value={school}
              onChange={onSchool}
              placeholder="e.g. SMK Seri Bintang"
            />
          </div>
          <Field
            label="Parent / guardian email (optional)"
            value={parentEmail}
            onChange={onParentEmail}
            placeholder="parent@example.com"
            type="email"
          />
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onSubmit}
              disabled={!name.trim() || !school.trim()}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 text-sm font-black text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" /> Submit nomination
            </button>
            <button
              type="button"
              onClick={() => {
                onSave();
                window.print();
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
            >
              <Star className="h-4 w-4" /> Certificate
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-white/35">
            Submitting opens your email app addressed to the scholarship coordinator with your
            achievements attached.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-white/60">
              <Lock className="h-3.5 w-3.5" /> Progress to eligibility
            </span>
            <span className="font-black tabular-nums text-white">
              {xp.toLocaleString()} / {SCHOLARSHIP_MIN_XP.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, Math.round((xp / SCHOLARSHIP_MIN_XP) * 100))}%`,
                background: `linear-gradient(90deg, ${myRankColor}, #7C3AED)`,
              }}
            />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/55">
            <Flame className="h-4 w-4 text-orange-400" />
            {xpToGo > 0
              ? `${xpToGo.toLocaleString()} XP to go — keep passing quizzes to climb the Hall of Fame.`
              : `You've got the XP — climb into the top ${topN} to unlock nomination.`}
          </p>
          <Link
            to="/quizzes"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            <Trophy className="h-4 w-4" /> Earn more XP
          </Link>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <p className="flex items-center gap-1.5 text-[11px] text-white/40">
          <Medal className="h-3.5 w-3.5" /> For teachers &amp; coordinators
        </p>
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white/[0.12]"
        >
          <Download className="h-3.5 w-3.5" /> Export nominees (CSV)
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[44px] w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
      />
    </label>
  );
}
