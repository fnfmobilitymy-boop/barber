import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Automatic brand entrance; no interaction is required to reach the site. */
export function BrandIntro() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const page = document.getElementById("site-content");
    const previousOverflow = document.body.style.overflow;
    const previousInert = page?.inert ?? false;
    if (page) page.inert = true;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setVisible(false);
      if (page) page.inert = previousInert;
      document.body.style.overflow = previousOverflow;
    }, reducedMotion ? 350 : 4600);
    return () => {
      window.clearTimeout(timer);
      if (page) page.inert = previousInert;
      document.body.style.overflow = previousOverflow;
    };
  }, [reducedMotion]);

  if (!visible) return null;
  return (
    <div
      className="brand-intro"
      role="status"
      aria-label="Welcome to Spartans Barbershop"
    >
      <div className="brand-intro-halo" aria-hidden="true" />
      <div className="brand-intro-lockup">
        <BrandLogo className="brand-intro-image" />
      </div>
    </div>
  );
}
