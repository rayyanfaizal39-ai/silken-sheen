import { useState } from "react";
import { useSignInModal } from "@/context/sign-in-modal";
import {
  isPollOpen,
  pollPercentages,
  pollVoteTotal,
  type PollBallot,
} from "@/components/home/announcement-polls";

type AnnouncementPollProps = {
  ballot: PollBallot | null;
  ballotsReady: boolean;
  userId: string | null;
  now: number;
  onVote: (announcementId: string, pollId: string, optionId: string) => Promise<void>;
};

export function AnnouncementPoll({
  ballot,
  ballotsReady,
  userId,
  now,
  onVote,
}: AnnouncementPollProps) {
  const { open: openSignIn } = useSignInModal();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ballotsReady) {
    return (
      <p className="home-mission-control__poll-note">Poll results are unavailable right now.</p>
    );
  }
  if (!ballot || ballot.options.length === 0) {
    return <p className="home-mission-control__poll-note">Choices are on the way.</p>;
  }

  const poll = ballot;
  const open = isPollOpen(poll.closesAt, now);
  const signedIn = Boolean(userId);
  const showResults = !signedIn || !open || Boolean(poll.myOptionId);
  const canVote = signedIn && open;
  const total = pollVoteTotal(poll.options);
  const percentages = pollPercentages(poll.options.map((option) => option.votes));

  async function choose(optionId: string) {
    if (!canVote || pending || poll.myOptionId === optionId) return;
    setPending(true);
    setError(null);
    try {
      await onVote(poll.announcementId, poll.pollId, optionId);
    } catch {
      setError("Vote didn't save. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="home-mission-control__poll">
      <ul>
        {poll.options.map((option, index) => {
          const selected = option.id === poll.myOptionId;
          const share = `${percentages[index] ?? 0}%`;
          const content = (
            <>
              {showResults ? (
                <span className="home-mission-control__poll-fill" style={{ width: share }} />
              ) : null}
              <span className="home-mission-control__poll-row">
                <span>
                  {option.label}
                  {selected ? <small>Your vote</small> : null}
                </span>
                {showResults ? <strong>{share}</strong> : null}
              </span>
            </>
          );

          return (
            <li key={option.id}>
              {canVote ? (
                <button
                  type="button"
                  className="home-mission-control__poll-option"
                  aria-pressed={selected}
                  disabled={pending}
                  onClick={() => void choose(option.id)}
                >
                  {content}
                </button>
              ) : (
                <div className="home-mission-control__poll-option">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="home-mission-control__poll-meta" aria-live="polite">
        {total === 1 ? "1 vote" : `${total} votes`}
        {open ? "" : " · Closed"}
      </p>
      {signedIn && open && poll.myOptionId ? (
        <p className="home-mission-control__poll-note">
          You can change your vote until the poll closes.
        </p>
      ) : null}
      {!signedIn ? (
        <button
          type="button"
          className="home-mission-control__poll-signin"
          onClick={() => openSignIn("signin")}
        >
          Sign in to vote
        </button>
      ) : null}
      {error ? <p className="home-mission-control__poll-note">{error}</p> : null}
    </div>
  );
}
