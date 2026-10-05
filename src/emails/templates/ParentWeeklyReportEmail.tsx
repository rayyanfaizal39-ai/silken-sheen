import {
  Column,
  Container,
  Heading,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

type SubjectProgress = {
  name: string;
  percentage: number;
  status: string;
};

type ParentWeeklyReportEmailProps = {
  studentName: string;
  reportPeriod: string;
  overallStatus: string;
  weeklySummary: string;
  quizzesCompleted: number;
  averageQuizScore: string;
  weeklyXp: string;
  currentStreak: string;
  activeDayMarks: boolean[];
  subjects: SubjectProgress[];
  biggestWin: string;
  focusArea: string;
  brainInsight: string;
  recommendedGoals: string[];
};

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function subjectAccent(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("need")) {
    return { badgeBg: "#fef3c7", badgeText: "#d97706", barColor: "#f59e0b" };
  }
  if (normalized.includes("strong")) {
    return { badgeBg: "#ede9fe", badgeText: "#7c3aed", barColor: "#7c3aed" };
  }
  return { badgeBg: "#dcfce7", badgeText: "#16a34a", barColor: "#22c55e" };
}

export default function ParentWeeklyReportEmail({
  studentName,
  reportPeriod,
  overallStatus,
  weeklySummary,
  quizzesCompleted,
  averageQuizScore,
  weeklyXp,
  currentStreak,
  activeDayMarks,
  subjects,
  biggestWin,
  focusArea,
  brainInsight,
  recommendedGoals,
}: ParentWeeklyReportEmailProps) {
  const activeDayCount = activeDayMarks.filter(Boolean).length;
  const metrics = [
    { label: "Quizzes Completed", value: String(quizzesCompleted), icon: "🎯" },
    { label: "Avg Quiz Score", value: averageQuizScore, icon: "📊" },
    { label: "XP Earned", value: weeklyXp, icon: "⚡" },
    { label: "Current Streak", value: currentStreak, icon: "🔥" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"
      />
      <div style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Row>
              <Column>
                <Img
                  src="https://www.myacademy.my/branding/academy-logo-full.png"
                  alt="AcadeMY"
                  width={150}
                  style={styles.logoImage}
                />
              </Column>
              <Column align="right">
                <div style={styles.badgePill}>
                  <Text style={styles.badgePillText}>WEEKLY PARENT REPORT</Text>
                </div>
              </Column>
            </Row>
            <div style={styles.headerDecor} />
          </Section>

          <Section style={styles.content}>
            {/* Student intro */}
            <Row>
              <Column style={styles.avatarColumn}>
                <div style={styles.avatar} />
              </Column>
              <Column>
                <Heading style={styles.heading}>
                  {studentName}’s Week at AcadeMY
                </Heading>
                <Text style={styles.reportPeriodText}>
                  Report Period: {reportPeriod}
                </Text>
              </Column>
            </Row>

            <Text style={styles.paragraph}>Hello,</Text>
            <Text style={styles.paragraph}>
              Here is a clear summary of {studentName}’s recorded quiz progress
              and recommended focus for next week.
            </Text>

            {/* Momentum hero card */}
            <Section style={styles.momentumCard}>
              <table role="presentation" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td>
                    <span style={styles.momentumDot} />
                  </td>
                  <td style={styles.cardLabelCell}>
                    <Text style={styles.cardLabel}>
                      THIS WEEK’S LEARNING MOMENTUM
                    </Text>
                  </td>
                </tr>
              </table>
              <Heading as="h2" style={styles.cardHeading}>
                Status: {overallStatus}
              </Heading>
              <Text style={styles.paragraph}>{weeklySummary}</Text>
            </Section>

            {/* Weekly Key Metrics */}
            <SectionTitle label="Weekly Key Metrics" />

            {[0, 2].map((i) => (
              <Row key={i} style={styles.metricRow}>
                <Column style={styles.metricColumn}>
                  <Metric {...metrics[i]} />
                </Column>
                <Column style={styles.metricColumnGap} />
                <Column style={styles.metricColumn}>
                  <Metric {...metrics[i + 1]} />
                </Column>
              </Row>
            ))}

            {/* Learning Consistency */}
            <Section style={styles.consistencyCard}>
              <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td>
                    <table role="presentation" cellPadding={0} cellSpacing={0}>
                      <tr>
                        <td>
                          <span style={styles.titleAccent} />
                        </td>
                        <td style={styles.cardLabelCell}>
                          <Heading as="h3" style={styles.smallHeading}>
                            Learning Consistency
                          </Heading>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right">
                    <div style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>
                        {activeDayCount}/7 days with a quiz
                      </Text>
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={styles.weekdayTable}>
                <tr>
                  {WEEKDAY_LABELS.map((label, index) => {
                    const active = activeDayMarks[index] === true;
                    return (
                      <td key={index} align="center" style={styles.weekdayCell}>
                        <div
                          style={{
                            ...styles.dayBubble,
                            ...(active
                              ? styles.dayBubbleActive
                              : styles.dayBubbleInactive),
                          }}
                        >
                          {active ? "✓" : "–"}
                        </div>
                        <Text
                          style={{
                            ...styles.dayLabel,
                            color: active ? "#7c3aed" : "#cbd5e1",
                          }}
                        >
                          {label}
                        </Text>
                      </td>
                    );
                  })}
                </tr>
              </table>

              <Text style={styles.consistencyMessage}>
                {activeDayCount} of 7 days include a completed quiz.
              </Text>
            </Section>

            {/* Subject Progress */}
            <SectionTitle label="Subject Progress" />

            {subjects.length === 0 ? (
              <Text style={styles.paragraph}>No quiz results by subject this week.</Text>
            ) : null}
            {subjects.map((subject) => {
              const accent = subjectAccent(subject.status);
              const width = Math.min(Math.max(subject.percentage, 0), 100);

              return (
                <Section key={subject.name} style={styles.subjectRow}>
                  <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                    <tr>
                      <td>
                        <table role="presentation" cellPadding={0} cellSpacing={0}>
                          <tr>
                            <td style={styles.subjectNameCell}>
                              <Text style={styles.subjectName}>{subject.name}</Text>
                            </td>
                            <td>
                              <div
                                style={{
                                  ...styles.subjectBadge,
                                  backgroundColor: accent.badgeBg,
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.subjectBadgeText,
                                    color: accent.badgeText,
                                  }}
                                >
                                  {subject.status}
                                </Text>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td align="right">
                        <Text style={{ ...styles.subjectChange, color: "#334155" }}>
                          {subject.percentage}%
                        </Text>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={styles.progressTrack}>
                    <tr>
                      <td
                        style={{
                          ...styles.progressFill,
                          width: `${width}%`,
                          backgroundColor: accent.barColor,
                        }}
                      >
                        &nbsp;
                      </td>
                      <td />
                    </tr>
                  </table>
                </Section>
              );
            })}

            {/* Highlights & Focus Areas */}
            <Section style={styles.focusCard}>
              <table role="presentation" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td style={styles.awardIconCell}>🏆</td>
                  <td>
                    <Text style={styles.focusCardLabel}>
                      HIGHLIGHTS &amp; FOCUS AREAS
                    </Text>
                  </td>
                </tr>
              </table>

              <div style={styles.focusBlock}>
                <Text style={styles.focusBlockLabel}>🏆 BIGGEST WIN THIS WEEK</Text>
                <Text style={styles.focusBlockText}>{biggestWin}</Text>
              </div>

              <div style={styles.focusBlock}>
                <Text style={styles.focusBlockLabel}>⚠️ AREA THAT NEEDS SUPPORT</Text>
                <Text style={styles.focusBlockText}>{focusArea}</Text>
              </div>
            </Section>

            {/* AcadeMY Brain Insight */}
            <Section style={styles.brainCard}>
              <div style={styles.brainAccentBar} />
              <div style={styles.brainContent}>
                <div style={styles.brainBadge}>
                  <Text style={styles.brainBadgeText}>
                    ✨ ACADEMY BRAIN INSIGHT
                  </Text>
                </div>
                <Text style={styles.brainKeyFindingLabel}>KEY FINDING</Text>
                <Heading as="h3" style={styles.brainHeadline}>
                  {overallStatus}
                </Heading>
                <div style={styles.brainDivider} />
                <Text style={styles.brainText}>{brainInsight}</Text>
              </div>
            </Section>

            {/* Recommended Plan */}
            <SectionTitle label="Recommended Plan for Next Week" />

            {recommendedGoals.map((goal, index) => (
              <Section key={goal} style={styles.goalRow}>
                <table role="presentation" cellPadding={0} cellSpacing={0}>
                  <tr>
                    <td style={styles.goalNumberCell}>
                      <div style={styles.goalNumber}>
                        <Text style={styles.goalNumberText}>{index + 1}</Text>
                      </div>
                    </td>
                    <td>
                      <Text style={styles.goalText}>{goal}</Text>
                    </td>
                  </tr>
                </table>
              </Section>
            ))}

            <Text style={styles.goalsFooterNote}>
              These goals come from {studentName}’s quiz results this week.
            </Text>

            <Text style={styles.trustMessage}>
              This report uses this week’s recorded quiz results and the current
              study streak. Study time, notes, and flashcards are not included.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <table role="presentation" cellPadding={0} cellSpacing={0} style={styles.footerLinksTable}>
              <tr>
                <td>
                  <Link href="https://www.myacademy.my/support" style={styles.footerLink}>
                    Contact Support
                  </Link>
                </td>
                <td style={styles.footerDot}>•</td>
                <td>
                  <Link href="https://www.myacademy.my/privacy" style={styles.footerLink}>
                    Privacy Policy
                  </Link>
                </td>
                <td style={styles.footerDot}>•</td>
                <td>
                  <Link href="https://www.myacademy.my/terms" style={styles.footerLink}>
                    Terms of Service
                  </Link>
                </td>
              </tr>
            </table>
            <Text style={styles.footerCopyright}>
              © 2026 AcadeMY. All rights reserved.
            </Text>
          </Section>
        </Container>
      </div>
    </>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div style={styles.metricCard}>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tr>
          <td>
            <Text style={styles.metricLabel}>{label}</Text>
          </td>
          <td align="right">
            <div style={styles.metricIconBg}>{icon}</div>
          </td>
        </tr>
      </table>
      <Text style={styles.metricValue}>{value}</Text>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={styles.sectionTitleTable}>
      <tr>
        <td>
          <span style={styles.titleAccent} />
        </td>
        <td style={styles.cardLabelCell}>
          <Heading as="h2" style={styles.sectionHeading}>
            {label}
          </Heading>
        </td>
      </tr>
    </table>
  );
}

const fontStack =
  '"Schibsted Grotesk", Arial, Helvetica, sans-serif';
const headingFontStack = 'Fraunces, Georgia, "Times New Roman", serif';

const styles = {
  body: {
    margin: "0",
    backgroundColor: "#e4e8f0",
    fontFamily: fontStack,
    color: "#050816",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "28px auto",
    backgroundColor: "#f8f9fc",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.12)",
  },
  header: {
    backgroundColor: "#050816",
    padding: "28px 36px 24px",
  },
  logoImage: {
    display: "block",
  },
  badgePill: {
    display: "inline-block",
    backgroundColor: "rgba(255,193,7,0.15)",
    border: "1px solid #ffc107",
    borderRadius: "20px",
    padding: "5px 12px",
  },
  badgePillText: {
    margin: "0",
    color: "#ffc107",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.6px",
  },
  headerDecor: {
    marginTop: "12px",
    width: "72px",
    height: "7px",
    borderRadius: "4px",
    backgroundColor: "#ffc107",
  },
  content: {
    padding: "28px 36px 0",
  },
  avatarColumn: {
    width: "66px",
    verticalAlign: "top",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "26px",
    backgroundColor: "#ede9fe",
    border: "1px solid #ddd6fe",
  },
  heading: {
    margin: "0",
    fontFamily: headingFontStack,
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#050816",
  },
  reportPeriodText: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "500",
  },
  paragraph: {
    margin: "16px 0 0",
    color: "#475569",
    fontSize: "14px",
    lineHeight: "22px",
  },
  momentumCard: {
    margin: "24px 0 0",
    padding: "24px",
    backgroundColor: "#f5f3ff",
    border: "1px solid #7c3aed",
    borderRadius: "20px",
  },
  momentumDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    backgroundColor: "#7c3aed",
  },
  cardLabelCell: {
    paddingLeft: "8px",
  },
  cardLabel: {
    margin: "0",
    color: "#7c3aed",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.6px",
  },
  cardHeading: {
    margin: "10px 0 0",
    fontFamily: headingFontStack,
    fontWeight: "900",
    fontSize: "21px",
    lineHeight: "27px",
    color: "#050816",
  },
  sectionTitleTable: {
    margin: "28px 0 15px",
  },
  titleAccent: {
    display: "inline-block",
    width: "3px",
    height: "20px",
    borderRadius: "2px",
    backgroundColor: "#7c3aed",
  },
  sectionHeading: {
    margin: "0",
    fontFamily: headingFontStack,
    fontWeight: "700",
    fontSize: "19px",
    lineHeight: "24px",
    color: "#050816",
  },
  metricRow: {
    marginBottom: "12px",
  },
  metricColumn: {
    width: "48%",
    verticalAlign: "top",
  },
  metricColumnGap: {
    width: "4%",
  },
  metricCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "18px",
  },
  metricLabel: {
    margin: "0",
    color: "#94a3b8",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
  },
  metricIconBg: {
    display: "inline-block",
    width: "28px",
    height: "28px",
    lineHeight: "28px",
    textAlign: "center" as const,
    borderRadius: "10px",
    backgroundColor: "#f5f3ff",
    fontSize: "14px",
  },
  metricValue: {
    margin: "10px 0 0",
    color: "#050816",
    fontSize: "24px",
    fontWeight: "800",
  },
  consistencyCard: {
    marginTop: "16px",
    padding: "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
  },
  smallHeading: {
    margin: "0",
    fontFamily: headingFontStack,
    fontWeight: "700",
    fontSize: "17px",
    color: "#050816",
  },
  activeBadge: {
    display: "inline-block",
    backgroundColor: "#f5f3ff",
    border: "1px solid #7c3aed",
    borderRadius: "20px",
    padding: "4px 12px",
  },
  activeBadgeText: {
    margin: "0",
    color: "#7c3aed",
    fontSize: "12px",
    fontWeight: "700",
  },
  weekdayTable: {
    marginTop: "18px",
  },
  weekdayCell: {
    padding: "0 4px",
  },
  dayBubble: {
    width: "36px",
    height: "36px",
    lineHeight: "36px",
    borderRadius: "18px",
    textAlign: "center" as const,
    fontSize: "13px",
    margin: "0 auto",
  },
  dayBubbleActive: {
    backgroundColor: "#7c3aed",
    color: "#ffffff",
  },
  dayBubbleInactive: {
    backgroundColor: "#f1f5f9",
    border: "1px solid #e2e8f0",
    color: "#cbd5e1",
  },
  dayLabel: {
    margin: "6px 0 0",
    fontSize: "11px",
    fontWeight: "700",
    textAlign: "center" as const,
  },
  consistencyMessage: {
    margin: "18px 0 0",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "20px",
  },
  subjectRow: {
    marginBottom: "16px",
  },
  subjectNameCell: {
    paddingRight: "8px",
  },
  subjectName: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "700",
    color: "#050816",
  },
  subjectBadge: {
    display: "inline-block",
    borderRadius: "20px",
    padding: "3px 10px",
  },
  subjectBadgeText: {
    margin: "0",
    fontSize: "10px",
    fontWeight: "700",
  },
  subjectChange: {
    margin: "0",
    fontSize: "12px",
    fontWeight: "600",
  },
  progressTrack: {
    marginTop: "8px",
    height: "10px",
    backgroundColor: "#f1f5f9",
    borderRadius: "5px",
  },
  progressFill: {
    height: "10px",
    borderRadius: "5px",
    fontSize: "1px",
    lineHeight: "10px",
  },
  focusCard: {
    marginTop: "24px",
    padding: "24px",
    backgroundColor: "#fffbeb",
    border: "1px solid #f59e0b",
    borderRadius: "20px",
  },
  awardIconCell: {
    fontSize: "16px",
    paddingRight: "8px",
  },
  focusCardLabel: {
    margin: "0",
    color: "#d97706",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.6px",
  },
  focusBlock: {
    marginTop: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #fde68a",
    borderRadius: "12px",
    padding: "12px 14px",
  },
  focusBlockLabel: {
    margin: "0",
    color: "#92400e",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.3px",
  },
  focusBlockTitle: {
    margin: "6px 0 0",
    color: "#050816",
    fontSize: "14px",
    fontWeight: "700",
  },
  focusBlockText: {
    margin: "6px 0 0",
    color: "#44403c",
    fontSize: "13px",
    lineHeight: "20px",
  },
  brainCard: {
    marginTop: "24px",
    backgroundColor: "#050816",
    borderRadius: "20px",
    overflow: "hidden" as const,
    padding: "0",
  },
  brainAccentBar: {
    height: "4px",
    width: "100%",
    backgroundColor: "#7c3aed",
  },
  brainContent: {
    padding: "22px",
  },
  brainBadge: {
    display: "inline-block",
    backgroundColor: "rgba(124,58,237,0.3)",
    border: "1px solid #7c3aed",
    borderRadius: "20px",
    padding: "4px 10px",
  },
  brainBadgeText: {
    margin: "0",
    color: "#a78bfa",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  brainKeyFindingLabel: {
    margin: "14px 0 0",
    color: "#7c3aed",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
  },
  brainHeadline: {
    margin: "4px 0 0",
    fontFamily: headingFontStack,
    fontWeight: "700",
    fontSize: "17px",
    lineHeight: "23px",
    color: "#f8f9fc",
  },
  brainDivider: {
    margin: "14px 0",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  brainText: {
    margin: "0",
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: "21px",
  },
  goalRow: {
    marginBottom: "10px",
  },
  goalNumberCell: {
    paddingRight: "14px",
    verticalAlign: "middle",
  },
  goalNumber: {
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "15px",
    textAlign: "center" as const,
    backgroundColor: "#7c3aed",
  },
  goalNumberText: {
    margin: "0",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "800",
  },
  goalText: {
    margin: "0",
    color: "#1e293b",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
  },
  goalsFooterNote: {
    margin: "6px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },
  valueCard: {
    marginTop: "22px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    overflow: "hidden" as const,
  },
  valueRowTable: {
    padding: "14px 18px",
    borderBottom: "1px solid #e2e8f0",
  },
  valueRowTableLast: {
    padding: "14px 18px",
  },
  valueRowLabel: {
    margin: "0",
    color: "#475569",
    fontSize: "13px",
    fontWeight: "500",
  },
  valuePill: {
    display: "inline-block",
    backgroundColor: "#f5f3ff",
    borderRadius: "100px",
    padding: "4px 12px",
  },
  valuePillText: {
    margin: "0",
    color: "#7c3aed",
    fontSize: "13px",
    fontWeight: "800",
  },
  trustMessage: {
    margin: "22px 0",
    color: "#80808c",
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center" as const,
  },
  ctaSection: {
    textAlign: "center" as const,
    paddingBottom: "32px",
  },
  button: {
    display: "inline-block",
    padding: "16px 40px",
    backgroundColor: "#ffc107",
    borderRadius: "32px",
    color: "#050816",
    fontSize: "15px",
    fontWeight: "800",
    textDecoration: "none",
  },
  ctaSubLink: {
    margin: "14px 0 0",
    textAlign: "center" as const,
  },
  ctaSubLinkAnchor: {
    color: "#7c3aed",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "underline",
  },
  footer: {
    padding: "28px 36px 40px",
    backgroundColor: "#050816",
    textAlign: "center" as const,
  },
  footerLinksTable: {
    margin: "0 auto",
  },
  footerLink: {
    color: "#94a3b8",
    fontSize: "11px",
    textDecoration: "none",
  },
  footerDot: {
    color: "#334155",
    fontSize: "11px",
    padding: "0 8px",
  },
  footerCopyright: {
    margin: "16px 0 0",
    color: "#475569",
    fontSize: "11px",
  },
};
