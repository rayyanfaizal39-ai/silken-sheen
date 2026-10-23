export type PollOption = {
  id: string;
  label: string;
  sortOrder: number;
  votes: number;
};

export type PollBallot = {
  announcementId: string;
  pollId: string;
  closesAt: string | null;
  myOptionId: string | null;
  options: PollOption[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asCount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  return null;
}

function asSort(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function isPollOpen(closesAt: string | null, now = Date.now()): boolean {
  if (!closesAt) return true;
  const time = Date.parse(closesAt);
  return !Number.isNaN(time) && time > now;
}

export function pollPercentages(counts: readonly number[]): number[] {
  const total = counts.reduce((sum, count) => sum + count, 0);
  if (total <= 0) return counts.map(() => 0);
  return counts.map((count) => Math.round((count / total) * 100));
}

export function pollVoteTotal(options: readonly PollOption[]): number {
  return options.reduce((sum, option) => sum + option.votes, 0);
}

/** Move this student's vote. Counts stay at zero or above. */
export function withCastVote(ballot: PollBallot, optionId: string): PollBallot {
  if (ballot.myOptionId === optionId) return ballot;
  if (!ballot.options.some((option) => option.id === optionId)) return ballot;
  return {
    ...ballot,
    myOptionId: optionId,
    options: ballot.options.map((option) => {
      let votes = option.votes;
      if (option.id === ballot.myOptionId) votes -= 1;
      if (option.id === optionId) votes += 1;
      return { ...option, votes: Math.max(0, votes) };
    }),
  };
}

export function groupPollBallotRows(rows: readonly unknown[]): Record<string, PollBallot> {
  const polls = new Map<string, PollBallot>();

  for (const row of rows) {
    if (!isRecord(row)) continue;
    const announcementId = asText(row.announcement_id);
    const pollId = asText(row.poll_id);
    const optionId = asText(row.option_id);
    const label = typeof row.label === "string" ? row.label.trim() : "";
    const sortOrder = asSort(row.sort_order);
    const votes = asCount(row.votes);
    if (!announcementId || !pollId || !optionId || !label || sortOrder === null || votes === null) {
      continue;
    }
    const closesAt = row.closes_at == null ? null : asText(row.closes_at);
    if (row.closes_at != null && closesAt === null) continue;
    const myOptionId = row.my_option_id == null ? null : asText(row.my_option_id);

    const option: PollOption = { id: optionId, label, sortOrder, votes };
    const existing = polls.get(pollId);
    if (!existing) {
      polls.set(pollId, {
        announcementId,
        pollId,
        closesAt,
        myOptionId,
        options: [option],
      });
      continue;
    }
    existing.options.push(option);
    if (!existing.myOptionId && myOptionId) existing.myOptionId = myOptionId;
  }

  const byAnnouncement: Record<string, PollBallot> = {};
  for (const poll of polls.values()) {
    poll.options.sort((a, b) => a.sortOrder - b.sortOrder || (a.id < b.id ? -1 : 1));
    byAnnouncement[poll.announcementId] = poll;
  }
  return byAnnouncement;
}
