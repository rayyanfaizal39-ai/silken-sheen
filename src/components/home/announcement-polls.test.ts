import { describe, expect, it } from "vitest";
import {
  groupPollBallotRows,
  isPollOpen,
  pollPercentages,
  withCastVote,
  type PollBallot,
} from "./announcement-polls";

const ballot: PollBallot = {
  announcementId: "post",
  pollId: "poll",
  closesAt: null,
  myOptionId: null,
  options: [
    { id: "korea", label: "Korea", sortOrder: 0, votes: 1 },
    { id: "japan", label: "Japan", sortOrder: 1, votes: 1 },
  ],
};

describe("announcement polls", () => {
  it("rounds shares and treats an empty poll as zero", () => {
    expect(pollPercentages([1, 1])).toEqual([50, 50]);
    expect(pollPercentages([0, 0])).toEqual([0, 0]);
    expect(pollPercentages([3, 1])).toEqual([75, 25]);
  });

  it("moves a student's vote between options", () => {
    const voted = withCastVote(ballot, "korea");
    expect(voted.myOptionId).toBe("korea");
    expect(voted.options.map((option) => option.votes)).toEqual([2, 1]);
    const changed = withCastVote(voted, "japan");
    expect(changed.myOptionId).toBe("japan");
    expect(changed.options.map((option) => option.votes)).toEqual([1, 2]);
    expect(withCastVote(changed, "japan")).toBe(changed);
  });

  it("keeps a poll open until closes_at", () => {
    const now = Date.parse("2026-10-23T02:00:00.000Z");
    expect(isPollOpen(null, now)).toBe(true);
    expect(isPollOpen("2026-10-24T00:00:00.000Z", now)).toBe(true);
    expect(isPollOpen("2026-10-23T01:00:00.000Z", now)).toBe(false);
  });

  it("groups ballot rows by announcement and keeps the caller's choice", () => {
    const grouped = groupPollBallotRows([
      {
        announcement_id: "post",
        poll_id: "poll",
        option_id: "japan",
        label: "Japan",
        sort_order: 1,
        votes: "2",
        closes_at: null,
        my_option_id: "korea",
      },
      {
        announcement_id: "post",
        poll_id: "poll",
        option_id: "korea",
        label: "Korea",
        sort_order: 0,
        votes: 1,
        closes_at: null,
        my_option_id: "korea",
      },
      { announcement_id: "post", poll_id: "poll", label: "" },
    ]);
    expect(grouped.post?.options.map((option) => option.label)).toEqual(["Korea", "Japan"]);
    expect(grouped.post?.options.map((option) => option.votes)).toEqual([1, 2]);
    expect(grouped.post?.myOptionId).toBe("korea");
  });
});
