import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer:fine)").matches) return;
    const el = ring.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.opacity = "1";
      const target = (e.target as Element).closest("a,button");
      el.classList.toggle("interactive", !!target);
      el.textContent = target?.classList.contains("gallery-item") ? "VIEW" : "";
    };
    const hide = () => {
      el.style.opacity = "0";
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, [reduced]);
  return <div className="cursor-ring" ref={ring} aria-hidden="true" />;
}
