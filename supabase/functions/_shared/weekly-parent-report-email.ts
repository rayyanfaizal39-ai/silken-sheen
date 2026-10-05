import type { EmailContent } from "./email-brand.ts";
import { escapeHtml } from "./email-brand.ts";
import type { WeeklyParentReport } from "./weekly-parent-report.ts";

const DASHBOARD_URL = "https://www.myacademy.my/parent-dashboard";
const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const SUBJECT_NAMES = ["Bahasa Melayu", "English", "Mathematics", "Science", "Sejarah", "Geography"];

const NAVY = "#0B1220";
const INK = "#142033";
const MUTED = "#5E6A78";
const LINE = "#E7E1D6";
const PAPER = "#F7F4EE";
const GOLD = "#8A6A2F";
const GREEN = "#1B7F4E";
const AMBER = "#8A5A12";

export function buildWeeklyParentReportEmail(report: WeeklyParentReport): EmailContent {
  const view = presentWeeklyReportEmail(report);
  const days = WEEKDAY_LABELS.map((label, index) => {
    const active = report.activeDayMarks[index] === true;
    return `<td align="center" width="14%" style="padding:2px"><div style="width:36px;height:36px;line-height:36px;border-radius:18px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;background:${active ? NAVY : "#F3F0E8"};color:${active ? "#F3E6C4" : "#A39B8C"}">${active ? "&#10003;" : "&#8211;"}</div><div style="margin-top:6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.4px;color:${active ? INK : "#A39B8C"}">${label}</div></td>`;
  }).join("");
  const metricCell = (label: string, value: string) => `<td width="50%" valign="top" style="padding:6px"><div style="padding:16px 14px;border:1px solid ${LINE};border-radius:14px;background:#ffffff"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${MUTED}">${escapeHtml(label)}</p><p style="margin:8px 0 0;font-family:Georgia,serif;font-size:28px;line-height:32px;color:${INK}">${escapeHtml(value)}</p></div></td>`;
  const metricRow = (left: [string, string], right: [string, string]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${metricCell(...left)}${metricCell(...right)}</tr></table>`;
  const goals = view.recommendations.map((goal, index) => `<tr><td valign="top" width="28" style="padding:10px 0;font-family:Georgia,serif;font-size:18px;color:${GOLD}">${index + 1}</td><td style="padding:10px 0;font-family:Arial,sans-serif;font-size:15px;line-height:22px;color:${INK}">${escapeHtml(goal)}</td></tr>`).join("");
  const sameChapterNote = view.sameChapterNote
    ? `<p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:${MUTED}">${escapeHtml(view.sameChapterNote)}</p>`
    : "";
  const focusCard = view.hasMeaningfulFocus
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-left:4px solid ${GOLD};border-radius:14px"><tr><td style="padding:16px 18px"><p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${AMBER}">Focus next</p><p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:${INK}">${escapeHtml(report.focusArea)}</p></td></tr></table>`
    : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-left:4px solid ${GREEN};border-radius:14px"><tr><td style="padding:16px 18px"><p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GREEN}">On track</p><p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:${INK}">No major learning concern identified this week.</p></td></tr></table>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(view.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};color:${INK}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all">${escapeHtml(view.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}">
    <tr>
      <td align="center" style="padding:20px 12px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:18px;overflow:hidden">
          <tr>
            <td style="padding:28px 24px 24px;background:${NAVY}">
              <p style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:32px;color:#ffffff">AcadeMY</p>
              <p style="margin:14px 0 0;display:inline-block;border:1px solid ${GOLD};border-radius:20px;padding:4px 10px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.2px;color:#E6D3A1">PARENT REPORT</p>
              <p style="margin:22px 0 0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:#C9C2B2">Student</p>
              <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:32px;line-height:36px;color:#ffffff">${escapeHtml(report.studentName)}</p>
              <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:#C9C2B2">Period</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#ffffff">${escapeHtml(report.reportPeriod)}</p>
              <p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#C9C2B2">Generated Sunday at 6:00 PM</p>
              <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:13px;line-height:20px;color:#E6D3A1">Your weekly Parent Report &#8212; ready to share with your parent or guardian.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px 8px">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:34px;line-height:40px;color:${view.verdictColor}">${escapeHtml(view.headline)}</h1>
              <p style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:${INK}">${escapeHtml(view.heroStats)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 18px 0">
              ${metricRow(["Quizzes", String(report.quizzesCompleted)], ["Average score", view.averageLabel])}
              ${metricRow(["Active days", `${view.activeDays} / 7`], ["Subjects practised", String(report.subjects.length)])}
              <p style="margin:8px 6px 0;font-family:Arial,sans-serif;font-size:14px;color:${MUTED}">+${escapeHtml(view.xpLabel)} XP earned</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 0">
              <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${MUTED}">Quiz activity this week</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${days}</tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-left:4px solid ${GREEN};border-radius:14px">
                <tr><td style="padding:16px 18px">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GREEN}">Strongest this week</p>
                  <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:24px;line-height:28px;color:${INK}">${escapeHtml(view.strongestName)}</p>
                  <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:22px;color:${MUTED}">${escapeHtml(view.strongestDetail)}</p>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 24px 0">
              ${focusCard}
            </td>
          </tr>
          <tr>
            <td style="padding:12px 24px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5EE;border-radius:14px">
                <tr><td style="padding:16px 18px">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GOLD}">&#10022; AcadeMY Insight</p>
                  <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:${INK}">${escapeHtml(view.insight)}</p>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 24px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:14px">
                <tr><td style="padding:16px 18px">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GREEN}">Biggest win</p>
                  <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:32px;line-height:36px;color:${INK}">${escapeHtml(view.winScore)}</p>
                  <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:${INK}">${escapeHtml(view.winLabel)}</p>
                  <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:${MUTED}">${escapeHtml(view.winCaption)}</p>
                  ${sameChapterNote}
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 0">
              <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:24px;color:${INK}">Next week</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${goals}</table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px 8px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td align="center" style="border-radius:12px;background:${NAVY}">
                  <a href="${DASHBOARD_URL}" style="display:block;padding:14px 18px;font-family:Arial,sans-serif;font-size:16px;font-weight:700;line-height:20px;color:#ffffff;text-decoration:none">View Parent Dashboard</a>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px 28px">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:18px;color:${MUTED}">This report is generated from learning activity recorded in AcadeMY.</p>
              <p style="margin:10px 0 0;font-family:Georgia,serif;font-size:14px;color:${INK}">AcadeMY</p>
              <p style="margin:2px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:18px;color:${MUTED}">Malaysia&#8217;s Interstellar Learning Platform</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "AcadeMY Parent Report",
    report.studentName,
    report.reportPeriod,
    "Generated Sunday at 6:00 PM",
    "Your weekly Parent Report — ready to share with your parent or guardian.",
    "",
    view.headline,
    view.heroStats,
    "",
    `Quizzes: ${report.quizzesCompleted}`,
    `Average score: ${view.averageLabel}`,
    `Active days: ${view.activeDays} / 7`,
    `Subjects practised: ${report.subjects.length}`,
    `+${view.xpLabel} XP earned`,
    "",
    `Strongest this week: ${view.strongestName}. ${view.strongestDetail}`,
    view.hasMeaningfulFocus
      ? `Focus next: ${report.focusArea}`
      : "On track: No major learning concern identified this week.",
    `Insight: ${view.insight}`,
    `Biggest win: ${view.winScore} ${view.winLabel}`,
    view.sameChapterNote,
    "",
    "Next week:",
    ...view.recommendations.map((goal, index) => `${index + 1}. ${goal}`),
    "",
    `View Parent Dashboard: ${DASHBOARD_URL}`,
    "",
    "This report is generated from learning activity recorded in AcadeMY.",
  ].filter((line) => line !== "").join("\n");

  return { subject: view.subject, html, text };
}

export function presentWeeklyReportEmail(report: WeeklyParentReport) {
  const activeDays = report.activeDayMarks.filter(Boolean).length;
  const averageLabel = report.averageQuizScore === null ? "—" : `${report.averageQuizScore}%`;
  const strongest = report.subjects[0] ?? null;
  const headline = verdictHeadline(report.overallStatus);
  const win = parseBiggestWin(report.biggestWin);
  const focus = parseRepeatedFocus(report.focusArea);
  const sameChapter = win && focus && win.subject === focus.subject && win.chapter === focus.chapter && focus.attempts > 1 && String(focus.average) !== win.score;
  const firstName = report.studentName.trim().split(/\s+/)[0] || "Student";
  const perfectScore = win?.score === "100";
  const hasMeaningfulFocus = hasMeaningfulWeakness(report.focusArea);
  const quizLabel = report.quizzesCompleted === 1 ? "quiz" : "quizzes";
  return {
    subject: report.averageQuizScore === null
      ? `${report.studentName}'s AcadeMY Parent Report`
      : `${report.studentName}'s week at AcadeMY · ${report.averageQuizScore}% average`,
    preheader: `${report.quizzesCompleted} quizzes · ${activeDays} active days · See ${firstName}'s strongest subject and next focus.`,
    headline: `${headline}, ${firstName}.`,
    heroStats: `${report.quizzesCompleted} ${quizLabel} · ${averageLabel} average · active on ${activeDays} of 7 days`,
    verdictColor: headline === "Needs attention" ? AMBER : headline === "Strong week" ? GREEN : GOLD,
    hasMeaningfulFocus,
    averageLabel,
    activeDays,
    xpLabel: report.weeklyXp.toLocaleString("en-MY"),
    strongestName: strongest?.name ?? "No subject result",
    strongestDetail: strongest ? `${strongest.percentage}% average` : "No subject average is available for this week.",
    insight: insightCopy(report),
    winScore: perfectScore ? "Perfect score — 100%" : win ? `${win.score}%` : "—",
    winLabel: win ? `${win.subject} · ${win.chapter}` : report.biggestWin,
    winCaption: perfectScore
      ? `${firstName}'s highest quiz result this week.`
      : `${firstName}'s highest quiz score this week.`,
    sameChapterNote: sameChapter && win && focus
      ? `${firstName} reached ${win.score}% in one attempt, although the ${win.chapter} average across ${focus.attempts} attempts remains ${focus.average}%.`
      : "",
    recommendations: report.recommendedGoals.slice(0, 3),
  };
}

function verdictHeadline(status: string): string {
  if (status === "Strong progress") return "Strong week";
  if (status === "Steady progress") return "Steady progress";
  if (status === "Needs support") return "Needs attention";
  return status;
}

function hasMeaningfulWeakness(focusArea: string): boolean {
  const focus = focusArea.trim();
  return focus.length > 0 && !/no chapter stood out/i.test(focus);
}

function insightCopy(report: WeeklyParentReport): string {
  const focus = report.focusArea.trim();
  if (!focus || /no chapter stood out/i.test(focus)) return report.brainInsight;
  return `${report.brainInsight} ${focus}`;
}

function parseBiggestWin(value: string): { score: string; subject: string; chapter: string } | null {
  const match = value.match(/^Scored (\d+)% in (.+)\.$/);
  if (!match) return null;
  const subject = SUBJECT_NAMES.find((name) => match[2] === name || match[2].startsWith(`${name} `));
  if (!subject) return null;
  const chapter = match[2].slice(subject.length).trim();
  if (!chapter) return null;
  return { score: match[1], subject, chapter };
}

function parseRepeatedFocus(value: string): { subject: string; chapter: string; average: number; attempts: number } | null {
  const match = value.match(/^(.+?) — (.+?) averaged (\d+)% over (\d+) quizzes\.$/);
  if (!match) return null;
  return {
    subject: match[1],
    chapter: match[2],
    average: Number(match[3]),
    attempts: Number(match[4]),
  };
}
