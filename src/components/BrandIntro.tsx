import { useEffect, useState } from "react";
import { IntroChrome } from "./IntroChrome";
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
    let anchorFrame = 0;
    const timer = window.setTimeout(() => {
      setVisible(false);
      if (page) page.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      // The entrance temporarily blocks scrolling, so restore deep-link navigation.
      anchorFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    }, reducedMotion ? 350 : 4600);
    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(anchorFrame);
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
      <div className="brand-intro-lockup">
        {reducedMotion ? <BrandLogo className="brand-intro-image" /> : <IntroChrome />}
      </div>
    </div>
  );
}
