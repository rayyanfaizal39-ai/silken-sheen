import type { EmailContent } from "./email-brand.ts";
import { escapeHtml } from "./email-brand.ts";
import type { WeeklyParentReport } from "./weekly-parent-report.ts";

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function buildWeeklyParentReportEmail(report: WeeklyParentReport): EmailContent {
  const average = report.averageQuizScore === null ? "—" : `${report.averageQuizScore}%`;
  const metrics = [
    ["Quizzes Completed", String(report.quizzesCompleted)],
    ["Avg Quiz Score", average],
    ["XP Earned", `${report.weeklyXp.toLocaleString("en-MY")} XP`],
    ["Current Streak", `${report.currentStreak} day${report.currentStreak === 1 ? "" : "s"}`],
  ];
  const activeCount = report.activeDayMarks.filter(Boolean).length;
  const days = WEEKDAY_LABELS.map((label, index) => {
    const active = report.activeDayMarks[index] === true;
    return `<td align="center" style="padding:4px"><div style="width:36px;height:36px;line-height:36px;border-radius:18px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;background:${active ? "#7c3aed" : "#e2e8f0"};color:${active ? "#ffffff" : "#94a3b8"}">${active ? "✓" : "–"}</div><div style="margin-top:6px;font-family:Arial,sans-serif;font-size:11px;color:${active ? "#7c3aed" : "#94a3b8"}">${label}</div></td>`;
  }).join("");
  const subjectRows =
    report.subjects.length === 0
      ? `<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#64748b">No quiz results by subject this week.</p>`
      : report.subjects
          .map((subject) => {
            const color = subject.status === "Needs revision" ? "#d97706" : subject.status === "Strong" ? "#7c3aed" : "#16a34a";
            return `<div style="margin-top:14px"><p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:14px;color:#0f172a"><strong>${escapeHtml(subject.name)}</strong> · ${escapeHtml(subject.status)} · ${subject.percentage}%</p><div style="height:8px;border-radius:8px;background:#e2e8f0"><div style="height:8px;width:${Math.min(subject.percentage, 100)}%;border-radius:8px;background:${color}"></div></div></div>`;
          })
          .join("");
  const goals = report.recommendedGoals
    .map(
      (goal, index) =>
        `<p style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#0f172a"><strong>${index + 1}.</strong> ${escapeHtml(goal)}</p>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html lang="en"><body style="margin:0;background:#e4e8f0">
  <div style="max-width:600px;margin:28px auto;background:#f8f9fc;border-radius:20px;overflow:hidden">
    <div style="background:#050816;padding:28px 36px 24px">
      <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#ffffff">AcadeMY</p>
      <p style="margin:12px 0 0;display:inline-block;border:1px solid #ffc107;border-radius:20px;padding:5px 12px;font-family:Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.6px;color:#ffc107">WEEKLY PARENT REPORT</p>
    </div>
    <div style="padding:28px 36px 32px">
      <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:34px;color:#050816">${escapeHtml(report.studentName)}’s Week at AcadeMY</h1>
      <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#64748b">Report Period: ${escapeHtml(report.reportPeriod)}</p>
      <p style="margin:18px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#334155">Hello,</p>
      <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#334155">Here is a clear summary of ${escapeHtml(report.studentName)}’s recorded quiz progress and recommended focus for next week.</p>
      <div style="margin-top:22px;padding:18px 20px;border-radius:16px;background:#eef2ff">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.8px;color:#6366f1">THIS WEEK’S LEARNING MOMENTUM</p>
        <h2 style="margin:8px 0 0;font-family:Georgia,serif;font-size:22px;color:#050816">Status: ${escapeHtml(report.overallStatus)}</h2>
        <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#334155">${escapeHtml(report.weeklySummary)}</p>
      </div>
      <h2 style="margin:28px 0 12px;font-family:Georgia,serif;font-size:20px;color:#050816">Weekly Key Metrics</h2>
      ${[0, 2]
        .map(
          (index) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${metrics
            .slice(index, index + 2)
            .map(
              ([label, value]) =>
                `<td width="50%" valign="top" style="padding:6px"><div style="padding:14px;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0"><p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#64748b">${escapeHtml(label)}</p><p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#050816">${escapeHtml(value)}</p></div></td>`,
            )
            .join("")}</tr></table>`,
        )
        .join("")}
      <div style="margin-top:22px;padding:18px 20px;border-radius:16px;background:#ffffff;border:1px solid #e2e8f0">
        <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:18px;color:#050816">Learning Consistency <span style="float:right;font-family:Arial,sans-serif;font-size:12px;color:#7c3aed">${activeCount}/7 days with a quiz</span></p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${days}</tr></table>
      </div>
      <h2 style="margin:28px 0 12px;font-family:Georgia,serif;font-size:20px;color:#050816">Subject Progress</h2>
      ${subjectRows}
      <div style="margin-top:22px;padding:18px 20px;border-radius:16px;background:#ffffff;border:1px solid #e2e8f0">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.6px;color:#7c3aed">BIGGEST WIN THIS WEEK</p>
        <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#0f172a">${escapeHtml(report.biggestWin)}</p>
        <p style="margin:18px 0 0;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.6px;color:#d97706">AREA THAT NEEDS SUPPORT</p>
        <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#0f172a">${escapeHtml(report.focusArea)}</p>
      </div>
      <div style="margin-top:22px;padding:18px 20px;border-radius:16px;background:#f5f3ff">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.6px;color:#7c3aed">ACADEMY BRAIN INSIGHT</p>
        <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#312e81">${escapeHtml(report.brainInsight)}</p>
      </div>
      <h2 style="margin:28px 0 4px;font-family:Georgia,serif;font-size:20px;color:#050816">Recommended Plan for Next Week</h2>
      ${goals}
      <p style="margin:22px 0 0;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#64748b">This report uses this week’s recorded quiz results and the current study streak. Study time, notes, and flashcards are not included.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `AcadeMY Weekly Parent Report`,
    `${report.studentName}`,
    `Report period: ${report.reportPeriod}`,
    "",
    `Status: ${report.overallStatus}`,
    report.weeklySummary,
    "",
    `Quizzes completed: ${report.quizzesCompleted}`,
    `Average quiz score: ${average}`,
    `XP earned: ${report.weeklyXp}`,
    `Current streak: ${report.currentStreak}`,
    `Quiz days: ${activeCount} of 7`,
    "",
    report.subjects.length
      ? report.subjects.map((subject) => `${subject.name}: ${subject.percentage}% (${subject.status})`).join("\n")
      : "No quiz results by subject this week.",
    "",
    `Biggest win: ${report.biggestWin}`,
    `Needs support: ${report.focusArea}`,
    `Insight: ${report.brainInsight}`,
    "",
    "Recommended plan for next week:",
    ...report.recommendedGoals.map((goal, index) => `${index + 1}. ${goal}`),
    "",
    "Study time, notes, and flashcards are not included because AcadeMY does not track them for this week yet.",
  ].join("\n");

  return {
    subject: `AcadeMY Weekly Report — ${report.studentName}`,
    html,
    text,
  };
}
