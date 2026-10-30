import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X, Scissors } from "lucide-react";
import { LiquidGlassButton } from "./UI";
export const nav = [
  ["Home", "home"],
  ["Experience", "experience"],
  ["Services", "services"],
  ["Our Barbers", "barbers"],
  ["Gallery", "gallery"],
  ["About", "about"],
  ["Contact", "booking"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 48));
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <motion.header
      className={`header ${scrolled ? "header-scrolled" : ""}`}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="logo" href="#home" aria-label="The Hustle Barber Club home">
        <Scissors size={27} />
        <span>
          THE HUSTLE<small>BARBER CLUB</small>
        </span>
      </a>
      <nav className="desktop-nav liquid-glass" aria-label="Main navigation">
        {nav.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <LiquidGlassButton>BOOK A VISIT</LiquidGlassButton>
        <button
          ref={button}
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
