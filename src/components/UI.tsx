import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { bookingHref } from "../data/business";
export function SectionReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
export function AnimatedHeading({ children }: { children: ReactNode }) {
  return (
    <SectionReveal>
      <h2>{children}</h2>
    </SectionReveal>
  );
}
export function MagneticButton({
  children,
  href = bookingHref,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={`button ${className}`}
      onMouseMove={(e) => {
        if (reduced || !matchMedia("(pointer:fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.transform = `translate(${(e.clientX - r.x - r.width / 2) * 0.08}px,${(e.clientY - r.y - r.height / 2) * 0.08}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <ArrowUpRight size={16} />
    </motion.a>
  );
}
export function LiquidGlassButton({
  children,
  href = bookingHref,
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <MagneticButton href={href} className="liquid-glass">
      {children}
    </MagneticButton>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
