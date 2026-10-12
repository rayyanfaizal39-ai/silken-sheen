import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { AcademyLogo } from "../AcademyLogo";

interface AdminPrintReportProps {
  title: string;
  description?: string;
  scope?: string;
  disabled?: boolean;
}

function formatPrintedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

/**
 * A screen-only print action paired with a print-only report letterhead.
 * Prints the existing authorised, loaded page data without refetching or
 * exposing additional records. Users may choose Save as PDF in the dialog.
 */
export function AdminPrintReport({
  title,
  description,
  scope,
  disabled = false,
}: AdminPrintReportProps) {
  const [printedAt, setPrintedAt] = useState("");

  useEffect(() => {
    setPrintedAt(formatPrintedAt(new Date()));
  }, []);

  function handlePrint() {
    if (disabled) return;
    setPrintedAt(formatPrintedAt(new Date()));
    window.requestAnimationFrame(() => window.print());
  }

  return (
    <div className="admin-print-report">
      <div className="admin-print-actions">
        <button
          type="button"
          className="admin-print-button"
          onClick={handlePrint}
          disabled={disabled}
          aria-label={"Print or save " + title + " as PDF"}
        >
          <Printer size={16} aria-hidden="true" />
          Print / Save PDF
        </button>
        <span className="admin-print-hint">
          Colour PDF: Save as PDF · Landscape · enable Background graphics
        </span>
      </div>

      <section className="admin-print-letterhead" aria-label="Report heading">
        <div className="admin-print-brandline">
          <span className="admin-print-logo-lockup">
            <AcademyLogo variant="full" className="admin-print-logo" width={170} height={40} alt="AcadeMY" />
          </span>
          <span className="admin-print-confidential">CONFIDENTIAL · ADMIN REPORT</span>
        </div>
        <h1>{title}</h1>
        {description && <p className="admin-print-description">{description}</p>}
        {scope && (
          <p className="admin-print-scope">
            <strong>Report scope:</strong> {scope}
          </p>
        )}
        <p className="admin-print-date">
          Generated {printedAt || "—"} · Malaysia Time (MYT)
        </p>
      </section>
    </div>
  );
}
