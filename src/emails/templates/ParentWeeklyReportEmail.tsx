import { buildWeeklyParentReportEmail } from "../../../supabase/functions/_shared/weekly-parent-report-email.ts";
import type { WeeklyParentReport } from "@/features/parent-report/weeklyParentReport";

export default function ParentWeeklyReportEmail({ report }: { report: WeeklyParentReport }) {
  const email = buildWeeklyParentReportEmail(report);
  return (
    <iframe
      title={`${report.studentName} weekly parent report`}
      srcDoc={email.html}
      style={{ display: "block", width: "100%", minHeight: "1600px", border: 0, background: "#F7F4EE" }}
    />
  );
}
