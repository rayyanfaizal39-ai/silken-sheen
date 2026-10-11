import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Download,
  Globe2,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
  Rotate3D,
  Share2,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { BUSINESS_CARD_CONTACT, BUSINESS_CARD_VCF_PATH } from "@/features/business-card/contact";
import {
  BUSINESS_CARD_QR_FILENAME,
  BUSINESS_CARD_QR_PATH,
  BUSINESS_CARD_QR_SIZE,
  BUSINESS_CARD_URL,
} from "@/features/business-card/qr-code";
import { seoMeta } from "@/lib/seo";
import "./card.css";

export const Route = createFileRoute("/card")({
  head: () =>
    seoMeta({
      title: "Faizal Zain | Chief Executive Officer",
      description: "Digital business card for Faizal Zain, Chief Executive Officer of AcadeMY.",
      path: "/card/",
      keywords: ["Faizal Zain", "AcadeMY", "digital business card"],
    }),
  component: BusinessCardPage,
});

function BusinessCardPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const cardRef = useRef<HTMLButtonElement>(null);
  const qrDialogRef = useRef<HTMLDivElement>(null);
  const qrTriggerRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isQrOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = qrTriggerRef.current;
    const focusFrame = window.requestAnimationFrame(() => qrDialogRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsQrOpen(false);
        return;
      }

      if (event.key !== "Tab" || !qrDialogRef.current) return;
      const focusable = Array.from(
        qrDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isQrOpen]);

  function showNotice(message: string) {
    setNotice(message);
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(""), 3200);
  }

  function updateCardPosition(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch" || !cardRef.current) return;

    const card = cardRef.current;
    const bounds = card.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - vertical) * 10;
    const rotateY = (horizontal - 0.5) * 12;

    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--card-tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--card-tilt-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--card-shine-x", `${(horizontal * 100).toFixed(1)}%`);
      card.style.setProperty("--card-shine-y", `${(vertical * 100).toFixed(1)}%`);
    });
  }

  function resetCardPosition() {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--card-tilt-x", "0deg");
    cardRef.current.style.setProperty("--card-tilt-y", "0deg");
    cardRef.current.style.setProperty("--card-shine-x", "50%");
    cardRef.current.style.setProperty("--card-shine-y", "50%");
  }

  async function shareCard() {
    const shareData = {
      title: `${BUSINESS_CARD_CONTACT.fullName} — AcadeMY`,
      text: `${BUSINESS_CARD_CONTACT.fullName}, ${BUSINESS_CARD_CONTACT.title} at AcadeMY`,
      url: BUSINESS_CARD_URL,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotice("Business card shared.");
        return;
      }

      await navigator.clipboard.writeText(BUSINESS_CARD_URL);
      showNotice("Card link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      showNotice("Sharing is unavailable on this device.");
    }
  }

  return (
    <main className="business-card-page">
      <div className="business-card-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="business-card-shell">
        <header className="business-card-brand">
          <AcademyLogo className="business-card-logo" />
          <span>Digital Business Card</span>
        </header>

        <section className="business-card-stage" aria-labelledby="business-card-name">
          <button
            ref={cardRef}
            type="button"
            className={`business-card-object${isFlipped ? " is-flipped" : ""}`}
            onClick={() => setIsFlipped((flipped) => !flipped)}
            onPointerMove={updateCardPosition}
            onPointerLeave={resetCardPosition}
            aria-label={isFlipped ? "Show front of business card" : "Show back of business card"}
            aria-pressed={isFlipped}
          >
            <span className="business-card-face business-card-front">
              <span className="business-card-grid" aria-hidden="true" />
              <span className="business-card-hologram" aria-hidden="true" />
              <span className="business-card-orbit" aria-hidden="true">
                <i />
                <i />
              </span>

              <span className="business-card-front-top">
                <AcademyLogo className="business-card-face-logo" />
                <span className="business-card-chip" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </span>

              <span className="business-card-identity">
                <span id="business-card-name" className="business-card-name">
                  {BUSINESS_CARD_CONTACT.fullName}
                </span>
                <span className="business-card-title">{BUSINESS_CARD_CONTACT.title}</span>
              </span>

              <span className="business-card-front-footer">
                <span>{BUSINESS_CARD_CONTACT.email}</span>
                <span>myacademy.my</span>
              </span>
            </span>

            <span className="business-card-face business-card-back">
              <span className="business-card-grid" aria-hidden="true" />
              <span className="business-card-hologram" aria-hidden="true" />

              <span className="business-card-back-heading">
                <span className="business-card-monogram" aria-hidden="true">
                  FZ
                </span>
                <span>
                  <strong>{BUSINESS_CARD_CONTACT.fullName}</strong>
                  <small>{BUSINESS_CARD_CONTACT.organization}</small>
                </span>
              </span>

              <span className="business-card-details">
                <span>
                  <Mail aria-hidden="true" />
                  {BUSINESS_CARD_CONTACT.email}
                </span>
                <span>
                  <Phone aria-hidden="true" />
                  {BUSINESS_CARD_CONTACT.phone}
                </span>
                <span>
                  <Globe2 aria-hidden="true" />
                  www.myacademy.my
                </span>
                <span>
                  <Building2 aria-hidden="true" />
                  {BUSINESS_CARD_CONTACT.title}
                </span>
              </span>

              <span className="business-card-back-mark">
                <AcademyLogo variant="icon" aria-hidden="true" />
              </span>
            </span>
          </button>

          <p className="business-card-flip-hint">
            <Rotate3D aria-hidden="true" />
            Tap or click the card to flip
          </p>
        </section>

        <button
          ref={qrTriggerRef}
          type="button"
          className="business-card-qr-trigger"
          onClick={() => setIsQrOpen(true)}
          aria-haspopup="dialog"
        >
          <QrCode aria-hidden="true" />
          Show QR Code
        </button>

        <nav className="business-card-actions" aria-label="Contact actions">
          <a
            className="business-card-save"
            href={BUSINESS_CARD_VCF_PATH}
            onClick={() => showNotice("Opening contact import. Review and confirm to add it.")}
          >
            <span className="business-card-save-icon" aria-hidden="true">
              <UserPlus />
            </span>
            <span>
              <strong>Add to My Contacts</strong>
              <small>Review and confirm</small>
            </span>
          </a>

          <div className="business-card-secondary-actions">
            <a
              href={`https://wa.me/${BUSINESS_CARD_CONTACT.phone.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              WhatsApp
            </a>
            <a href={`mailto:${BUSINESS_CARD_CONTACT.email}`}>
              <Mail aria-hidden="true" />
              Email
            </a>
            <button type="button" onClick={() => void shareCard()}>
              <Share2 aria-hidden="true" />
              Share
            </button>
          </div>
        </nav>

        <p className="business-card-status" aria-live="polite" aria-atomic="true">
          {notice}
        </p>
      </div>

      {isQrOpen ? (
        <div
          className="business-card-qr-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setIsQrOpen(false);
          }}
        >
          <div
            ref={qrDialogRef}
            className="business-card-qr-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-card-qr-title"
            aria-describedby="business-card-qr-description"
            tabIndex={-1}
          >
            <button
              type="button"
              className="business-card-qr-close"
              onClick={() => setIsQrOpen(false)}
              aria-label="Close QR code"
            >
              <X aria-hidden="true" />
            </button>

            <div className="business-card-qr-heading">
              <span className="business-card-qr-emblem" aria-hidden="true">
                <QrCode />
              </span>
              <div>
                <p>AcadeMY Digital Card</p>
                <h2 id="business-card-qr-title">Scan to connect</h2>
              </div>
            </div>

            <div className="business-card-qr-frame">
              <img
                src={BUSINESS_CARD_QR_PATH}
                alt={`QR code for ${BUSINESS_CARD_URL}`}
                width={BUSINESS_CARD_QR_SIZE}
                height={BUSINESS_CARD_QR_SIZE}
              />
            </div>

            <p id="business-card-qr-description" className="business-card-qr-description">
              Point a phone camera at the code to open Faizal Zain&apos;s digital business card.
            </p>
            <a className="business-card-qr-url" href={BUSINESS_CARD_URL}>
              www.myacademy.my/card/
            </a>

            <a
              className="business-card-qr-save"
              href={BUSINESS_CARD_QR_PATH}
              download={BUSINESS_CARD_QR_FILENAME}
              onClick={() => showNotice("Print-ready QR code download started.")}
            >
              <Download aria-hidden="true" />
              Save QR Code
            </a>
            <p className="business-card-qr-print-note">
              High-resolution {BUSINESS_CARD_QR_SIZE} × {BUSINESS_CARD_QR_SIZE} PNG for print
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
