import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { bookingHref } from "../data/business";
export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 44, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.85,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
const editorialEase = [0.22, 1, 0.36, 1] as const;
function headingText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      if (!isValidElement(child)) return "";
      if (child.type === "br") return " ";
      return headingText(
        (child as ReactElement<{ children?: ReactNode }>).props.children,
      );
    })
    .join("");
}
function headingWords(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .map((word, index) =>
          /\s+/.test(word) ? (
            word
          ) : (
            <span className="heading-word-mask" key={index}>
              <motion.span
                className="heading-word"
                variants={{
                  hidden: { y: "112%", rotateX: -22, opacity: 0 },
                  visible: {
                    y: "0%",
                    rotateX: 0,
                    opacity: 1,
                    transition: { duration: 0.85, ease: editorialEase },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          ),
        );
    }
    if (!isValidElement(child) || child.type === "br") return child;
    const element = child as ReactElement<{ children?: ReactNode }>;
    return cloneElement(
      element,
      undefined,
      headingWords(element.props.children),
    );
  });
}
export function AnimatedHeading({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.h2
      className="editorial-heading"
      aria-label={headingText(children)}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: 0.065 } } }}
    >
      <span aria-hidden="true">{headingWords(children)}</span>
    </motion.h2>
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
