# AcadeMY Cards XP authority design

Status: architecture decision required before any broad XP migration.

## Current XP sources

| Source | Current persistence | Trust level | Compatibility constraint |
| --- | --- | --- | --- |
| Quiz completion | `quiz_xp_awards`, written by the server-owned completion transaction | Authoritative and idempotent | Preserve the existing catalog, award amounts, scoring and retake rules. |
| Mission claims | `mission_reward_claims`, written by `claim_mission_reward` | Authoritative and idempotent | Preserve the current daily/weekly objectives, bonuses and claim rules. |
| Flashcard answers | `addXp` followed by a client upsert of `user_progress` | Client-trusted; no durable per-award event | Existing per-card award decisions cannot be reconstructed exactly from `user_progress`. |
| Interactive notes and mini-quizzes | `addXp` followed by a client upsert of `user_progress` | Client-trusted; no durable per-award event | Existing component-local one-time guards do not form a server-verifiable history. |
| Lesson/flashcard mission activity | Mission activity is tracked separately; XP is awarded only when its mission is claimed | Authoritative only at mission claim | Must not double count the underlying activity and its mission reward. |

Repository search found no additional production `addXp` callers outside the flashcard route and the Geography/Science interactive-note components. Chapter completion, badges, companion state, streaks and recent activity are progress fields, not independent XP award sources.

## Recommended target

Create one append-only `learning_xp_events` ledger after the backfill policy is approved. Each row should contain a server-generated ID, `user_id`, an enumerated source, a stable source event key, the server-derived amount, optional subject metadata, and timestamps. A unique constraint on `(user_id, source, source_event_key)` provides idempotency.

Clients must never submit an XP amount. Source-specific server functions should validate the learning event and derive the unchanged award from server-owned rules. Learners should have no insert, update or delete grants on the ledger. `user_progress.xp` should become a projection maintained by trusted database code only after every current award path has moved to the ledger.

Cards should calculate evolution XP from the authoritative ledger, not directly from a client-synchronized aggregate. Quiz and mission tables can either remain source ledgers consumed by a unified view, or be mirrored into the new ledger transactionally with stable idempotency keys.

## Backfill limitation and approval choices

Quiz and mission events can be backfilled exactly. Historical flashcard and interactive-note awards cannot: `user_progress` stores only their aggregate effect mixed with legacy data, and local one-time guards were not persisted as auditable server events.

Choose one policy before implementation:

1. **Grandfather the residual (maximum preservation).** Import quiz and mission events, then create one reviewed `legacy_residual` event equal to `user_progress.xp - authoritative events`, clamped at zero. This preserves displayed XP but also preserves any historical client manipulation.
2. **Grandfather with anomaly review (recommended).** Use the same residual, but quarantine statistical or policy-impossible outliers for manual review before they can unlock Cards evolution.
3. **Auditable-only Cards XP.** Preserve displayed legacy XP in AcadeMY, but allow Cards evolution only from verifiable events. This is strongest against manipulation but can under-credit legitimate historical flashcard/note work.

Approval is also required for stable event identities and server validation rules for flashcards and each interactive-note interaction. These must preserve existing amounts and one-time/retake behavior; the remediation must not infer new reward rules.

## Safe rollout sequence

1. Inventory and freeze the authoritative award contract in tests.
2. Add the ledger and source-specific server award functions with no effect on displayed XP.
3. Backfill quiz and mission events in an isolated environment.
4. Produce a per-user reconciliation report for the legacy residual; do not write production rows.
5. Obtain approval for the residual policy and outlier thresholds.
6. Move flashcard and note awards to server-derived event RPCs while retaining the current amounts and UI behavior.
7. Run both calculations in shadow mode and reconcile them.
8. Only after parity, revoke client authority to write `user_progress.xp` and `subject_xp`, then use the ledger for Cards evolution.

