import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CreditCard,
  Edit3,
  Flame,
  GraduationCap,
  Loader2,
  LogOut,
  MapPin,
  Orbit,
  School,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { CompanionImage, getCompanionDisplayName } from "@/companion";
import { RankBadge } from "@/components/RankBadge";
import { useAuth } from "@/context/auth-context";
import { subjects } from "@/data/subjects-meta";
import { getRank } from "@/data/rankAssets";
import {
  EXPLORER_FORM_LEVELS,
  saveExplorerProfileEdits,
  type ExplorerFormLevel,
} from "@/lib/explorer-profile";
import { getCompanionLevelProgress, ALL_BADGES, useProgress } from "@/hooks/use-progress";
import { seoMeta } from "@/lib/seo";
import { formatSchoolLocation, getSchoolById, type SchoolSearchResult } from "@/lib/schools";
import "./profile.css";

const SchoolCombobox = lazy(() =>
  import("@/components/onboarding/SchoolCombobox").then((module) => ({
    default: module.SchoolCombobox,
  })),
);

export const Route = createFileRoute("/profile")({
  component: ExplorerProfilePage,
  head: () =>
    seoMeta({
      title: "Explorer Profile",
      description: "View your AcadeMY Explorer identity and learning progress.",
      path: "/profile",
      noindex: true,
    }),
});

function ExplorerProfilePage() {
  const {
    user,
    explorerProfile,
    explorerProfileLoading,
    explorerProfileError,
    refreshExplorerProfile,
    signOut,
  } = useAuth();
  const { progress } = useProgress();
  const [school, setSchool] = useState<SchoolSearchResult | null>(null);
  const [schoolLoading, setSchoolLoading] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const schoolId = explorerProfile?.schoolId;
    if (!schoolId) {
      setSchool(null);
      setSchoolLoading(false);
      setSchoolError(false);
      return;
    }

    let active = true;
    setSchoolLoading(true);
    setSchoolError(false);
    void getSchoolById(schoolId)
      .then((result) => {
        if (active) {
          setSchool(result);
          setSchoolError(!result);
        }
      })
      .catch((cause: unknown) => {
        console.error("[Explorer Profile] School lookup failed", cause);
        if (active) {
          setSchool(null);
          setSchoolError(true);
        }
      })
      .finally(() => {
        if (active) setSchoolLoading(false);
      });
    return () => {
      active = false;
    };
  }, [explorerProfile?.schoolId]);

  const rank = getRank(progress.xp);
  const companionProgress = getCompanionLevelProgress(progress.xp);
  const unlockedBadges = useMemo(
    () => ALL_BADGES.filter((badge) => progress.badges.includes(badge.id)),
    [progress.badges],
  );
  const displayName = explorerProfile?.displayName || user?.name || "Student Explorer";
  const companion = progress.companion;

  if (explorerProfileLoading) {
    return (
      <main className="explorer-profile-page explorer-profile-loading" aria-busy="true">
        <Loader2 className="h-7 w-7 animate-spin" aria-hidden="true" />
        <p>Preparing your Explorer Profile…</p>
      </main>
    );
  }

  return (
    <main className="explorer-profile-page">
      <ProfileBackdrop />
      <div className="explorer-profile-wrap">
        <header className="explorer-profile-hero">
          <div className="explorer-profile-hero-copy">
            <span className="explorer-profile-kicker">
              <Orbit aria-hidden="true" /> Explorer identity
            </span>
            <div className="explorer-profile-person">
              {user?.avatarUrl ? (
                <img className="explorer-profile-avatar" src={user.avatarUrl} alt="" />
              ) : (
                <span
                  className="explorer-profile-avatar explorer-profile-initial"
                  aria-hidden="true"
                >
                  {displayName[0]?.toUpperCase() ?? "E"}
                </span>
              )}
              <div>
                <h1>{displayName}</h1>
                <div className="explorer-profile-rank-line">
                  <RankBadge rank={rank} size={34} />
                  <span>{rank.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>Level {companionProgress.currentLevel}</span>
                </div>
              </div>
            </div>

            <div className="explorer-profile-identity-chips" aria-label="Student details">
              {explorerProfile?.formLevel ? (
                <span>
                  <GraduationCap aria-hidden="true" />
                  {explorerProfile.formLevel}
                </span>
              ) : (
                <button type="button" onClick={() => setEditing(true)}>
                  <GraduationCap aria-hidden="true" /> Complete profile
                </button>
              )}
              {explorerProfile?.age ? (
                <span>
                  <UserRound aria-hidden="true" />
                  Age {explorerProfile.age}
                </span>
              ) : (
                <button type="button" onClick={() => setEditing(true)}>
                  <UserRound aria-hidden="true" /> Add age
                </button>
              )}
            </div>
          </div>

          <div className="explorer-profile-hero-art" aria-label={`${rank.name} rank`}>
            <div className="explorer-profile-rank-orbit" aria-hidden="true" />
            <RankBadge rank={rank} size="clamp(128px, 19vw, 190px)" />
          </div>

          <button
            className="explorer-profile-edit-button"
            type="button"
            onClick={() => setEditing(true)}
          >
            <Edit3 aria-hidden="true" /> Edit Profile
          </button>
        </header>

        {explorerProfileError && (
          <p className="explorer-profile-alert" role="alert">
            We could not refresh your identity details. Your saved progress is still safe.
          </p>
        )}
        {notice && (
          <p className="explorer-profile-notice" role="status">
            {notice}
          </p>
        )}

        <section
          className="explorer-profile-grid explorer-profile-progress"
          aria-labelledby="progress-title"
        >
          <div className="explorer-profile-section-heading">
            <div>
              <p>Mission telemetry</p>
              <h2 id="progress-title">Progress Summary</h2>
            </div>
            <Sparkles aria-hidden="true" />
          </div>
          <Metric icon={<Zap />} label="Total XP" value={`${progress.xp.toLocaleString()} XP`} />
          <Metric icon={<Award />} label="Current rank" value={rank.name} />
          <Metric
            icon={<Flame />}
            label="Study streak"
            value={`${progress.streak} day${progress.streak === 1 ? "" : "s"}`}
          />
          <Metric
            icon={
              companion ? (
                <CompanionImage
                  speciesId={companion.id}
                  stage={companionProgress.currentStage.id}
                  size={38}
                />
              ) : (
                <Orbit />
              )
            }
            label="Companion"
            value={
              companion
                ? `${getCompanionDisplayName(companion)} · ${companionProgress.currentStage.name}`
                : "Choose your companion"
            }
          />
        </section>

        <section
          className="explorer-profile-panel explorer-profile-school"
          aria-labelledby="school-title"
        >
          <div className="explorer-profile-section-heading">
            <div>
              <p>Verified identity</p>
              <h2 id="school-title">School</h2>
            </div>
            <ShieldCheck aria-hidden="true" />
          </div>
          {schoolLoading ? (
            <div className="explorer-profile-inline-loading" role="status">
              <Loader2 className="animate-spin" aria-hidden="true" /> Loading verified school…
            </div>
          ) : school ? (
            <div className="explorer-profile-school-card">
              <School aria-hidden="true" />
              <div>
                <strong>{school.schoolName}</strong>
                <span>
                  <MapPin aria-hidden="true" />
                  {formatSchoolLocation(school)}
                </span>
              </div>
            </div>
          ) : (
            <div className="explorer-profile-empty-row">
              <div>
                <strong>
                  {schoolError
                    ? "School details are temporarily unavailable"
                    : "Add your verified school"}
                </strong>
                <p>
                  {schoolError
                    ? "Try again later or choose your school in Edit Profile."
                    : "Connect your Explorer identity to a verified Malaysian school."}
                </p>
              </div>
              <button type="button" onClick={() => setEditing(true)}>
                Add school
              </button>
            </div>
          )}
        </section>

        <div className="explorer-profile-columns">
          <section className="explorer-profile-panel" aria-labelledby="subjects-title">
            <div className="explorer-profile-section-heading">
              <div>
                <p>Learning activity</p>
                <h2 id="subjects-title">Subject Progress</h2>
              </div>
              <BookOpen aria-hidden="true" />
            </div>
            <div className="explorer-profile-subjects">
              {subjects.map((subject) => {
                const xp = Math.max(0, progress.subjectXp[subject.id] ?? 0);
                return (
                  <div className="explorer-profile-subject" key={subject.id}>
                    <span className="explorer-profile-subject-icon" aria-hidden="true">
                      {subject.emoji}
                    </span>
                    <div>
                      <strong>{subject.name}</strong>
                      <span>
                        {xp > 0 ? `${xp.toLocaleString()} XP earned` : "No activity recorded yet"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link className="explorer-profile-text-link" to="/notes">
              Explore subjects <span aria-hidden="true">→</span>
            </Link>
          </section>

          <section className="explorer-profile-panel" aria-labelledby="achievements-title">
            <div className="explorer-profile-section-heading">
              <div>
                <p>Milestones</p>
                <h2 id="achievements-title">Achievements</h2>
              </div>
              <Award aria-hidden="true" />
            </div>
            {unlockedBadges.length ? (
              <div className="explorer-profile-badges">
                {unlockedBadges.map((badge) => (
                  <article
                    key={badge.id}
                    style={{ "--badge-color": badge.color } as React.CSSProperties}
                  >
                    <span aria-hidden="true">{badge.emoji}</span>
                    <div>
                      <strong>{badge.name}</strong>
                      <p>{badge.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="explorer-profile-empty-achievements">
                <Award aria-hidden="true" />
                <p>Complete missions and quizzes to unlock achievements.</p>
              </div>
            )}
          </section>
        </div>

        <section
          className="explorer-profile-panel explorer-profile-account"
          aria-labelledby="account-title"
        >
          <div className="explorer-profile-section-heading">
            <div>
              <p>Settings</p>
              <h2 id="account-title">Account</h2>
            </div>
          </div>
          <div className="explorer-profile-account-actions">
            <Link to="/account/billing">
              <CreditCard aria-hidden="true" />
              Account &amp; Billing
            </Link>
            <button
              type="button"
              disabled={signingOut}
              onClick={() => {
                setSigningOut(true);
                void signOut().catch((cause: unknown) => {
                  console.error("[Explorer Profile] Sign out failed", cause);
                  setNotice("Sign out did not complete. Please try again.");
                  setSigningOut(false);
                });
              }}
            >
              {signingOut ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <LogOut aria-hidden="true" />
              )}
              Sign Out
            </button>
          </div>
        </section>
      </div>

      {editing && user && explorerProfile && (
        <EditProfileDialog
          userId={user.id}
          displayName={displayName}
          age={explorerProfile.age}
          formLevel={explorerProfile.formLevel}
          schoolId={explorerProfile.schoolId}
          school={school}
          schoolLoading={schoolLoading}
          onClose={() => setEditing(false)}
          onSaved={async (savedSchool) => {
            setSchool(savedSchool);
            await refreshExplorerProfile();
            setNotice("Explorer Profile updated.");
            setEditing(false);
          }}
        />
      )}
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article className="explorer-profile-metric">
      <span>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function EditProfileDialog({
  userId,
  displayName,
  age,
  formLevel,
  schoolId,
  school,
  schoolLoading,
  onClose,
  onSaved,
}: {
  userId: string;
  displayName: string;
  age: number | null;
  formLevel: ExplorerFormLevel | null;
  schoolId: string | null;
  school: SchoolSearchResult | null;
  schoolLoading: boolean;
  onClose: () => void;
  onSaved: (school: SchoolSearchResult | null) => Promise<void>;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [nameDraft, setNameDraft] = useState(displayName);
  const [ageDraft, setAgeDraft] = useState(age?.toString() ?? "");
  const [formDraft, setFormDraft] = useState<ExplorerFormLevel | "">(formLevel ?? "");
  const [schoolDraft, setSchoolDraft] = useState<SchoolSearchResult | null>(school);
  const [schoolChanged, setSchoolChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) onClose();
      if (event.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, saving]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (schoolId && schoolChanged && !schoolDraft) {
      setError("Choose a verified school from the search results before saving.");
      return;
    }
    const parsedAge = ageDraft.trim() ? Number(ageDraft) : null;
    setSaving(true);
    try {
      await saveExplorerProfileEdits(userId, {
        displayName: nameDraft,
        age: parsedAge,
        formLevel: formDraft || null,
        schoolId: schoolDraft?.id ?? (schoolChanged ? null : schoolId),
      });
      await onSaved(schoolDraft ?? (schoolChanged ? null : school));
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "Profile update failed. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div
      className="explorer-profile-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="explorer-profile-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="explorer-profile-dialog-heading">
          <div>
            <p>Explorer identity</p>
            <h2 id="edit-profile-title">Edit Profile</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close edit profile"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="profile-display-name">Display Name</label>
          <input
            id="profile-display-name"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            maxLength={80}
            autoComplete="name"
            required
          />

          <div className="explorer-profile-form-row">
            <div>
              <label htmlFor="profile-age">Age</label>
              <input
                id="profile-age"
                type="number"
                inputMode="numeric"
                min={10}
                max={18}
                step={1}
                value={ageDraft}
                onChange={(event) => setAgeDraft(event.target.value)}
                placeholder="Add age"
              />
            </div>
            <div>
              <label htmlFor="profile-form">Form</label>
              <select
                id="profile-form"
                value={formDraft}
                onChange={(event) => setFormDraft(event.target.value as ExplorerFormLevel | "")}
              >
                <option value="">Choose form</option>
                {EXPLORER_FORM_LEVELS.map((level) => (
                  <option value={level} key={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label id="profile-school-label">Verified School</label>
          {schoolLoading && schoolId && !schoolDraft ? (
            <div className="explorer-profile-inline-loading" role="status">
              <Loader2 className="animate-spin" aria-hidden="true" />
              Loading current school…
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="explorer-profile-inline-loading" role="status">
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Loading school search…
                </div>
              }
            >
              <div aria-labelledby="profile-school-label">
                <SchoolCombobox
                  value={schoolDraft}
                  invalid={Boolean(error?.includes("verified school"))}
                  onChange={(nextSchool) => {
                    setSchoolDraft(nextSchool);
                    setSchoolChanged(true);
                    setError(null);
                  }}
                />
              </div>
            </Suspense>
          )}
          <p className="explorer-profile-field-help">
            Only schools selected from verified search results can be saved.
          </p>

          {error && (
            <p className="explorer-profile-form-error" role="alert">
              {error}
            </p>
          )}
          <div className="explorer-profile-dialog-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving || schoolLoading}>
              {saving ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <Edit3 aria-hidden="true" />
              )}
              Save Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProfileBackdrop() {
  return (
    <div className="explorer-profile-backdrop" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
