import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Scissors, X } from "lucide-react";
import { bookingHref, business } from "../data/business";

const storageKey = "hustle-booking-welcome-dismissed";

export function BookingWelcome() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const configured = Boolean(business.bookingUrl || business.whatsappNumber);
  const dismiss = () => {
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch {
      /* Private browsing may disable storage. */
    }
    setOpen(false);
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      /* The prompt still works without storage. */
    }
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const page = document.getElementById("site-content");
    const wasInert = page?.inert ?? false;
    const overflow = document.body.style.overflow;
    if (page) page.inert = true;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(
        dialog.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? [],
      );
      const index = controls.indexOf(document.activeElement as HTMLElement);
      event.preventDefault();
      controls[
        (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length
      ]?.focus();
    };
    document.addEventListener("keydown", keydown);
    return () => {
      if (page) page.inert = wasInert;
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keydown);
      if (previousFocus && previousFocus !== document.body)
        previousFocus.focus({ preventScroll: true });
      else
        document
          .querySelector<HTMLElement>(".hero-ctas a")
          ?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="welcome-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) dismiss();
          }}
        >
          <motion.div
            ref={dialog}
            className="welcome-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            aria-describedby="welcome-description"
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeButton}
              className="welcome-close"
              aria-label="Close booking invitation"
              onClick={dismiss}
            >
              <X size={19} />
            </button>
            <div className="welcome-emblem" aria-hidden="true">
              <Scissors size={30} strokeWidth={1} />
            </div>
            <p className="eyebrow">WELCOME TO THE CLUB</p>
            <h2 id="welcome-title">
              Good hair.
              <br />
              <em>Great energy.</em>
            </h2>
            <p id="welcome-description">
              {configured
                ? "Your next look starts in the chair. Make time for a little precision, a little culture, and a lot of confidence."
                : "Your next look starts here. Booking details are coming soon — explore the cuts, the craft, and the culture in the meantime."}
            </p>
            <a
              className="button welcome-primary"
              href={bookingHref}
              onClick={dismiss}
            >
              {configured ? "BOOK YOUR CUT" : "VIEW BOOKING INFO"}
              <ArrowUpRight size={17} />
            </a>
            <button className="welcome-explore" onClick={dismiss}>
              KEEP EXPLORING
            </button>
            <span className="welcome-signature">THE HUSTLE BARBER CLUB</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
