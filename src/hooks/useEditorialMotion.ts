import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scrub timelines follow native scrolling; no scroll interception or long pins. */
export function useEditorialMotion() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let disposed = false;
    const media = gsap.matchMedia();
    media.add(
      { desktop: "(min-width: 851px)", mobile: "(max-width: 850px)" },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        gsap.fromTo(
          ".craft-frame",
          { scale: desktop ? 0.88 : 0.97, "--frame-notch": "0px" },
          {
            scale: 1,
            "--frame-notch": desktop ? "30px" : "15px",
            ease: "none",
            scrollTrigger: {
              trigger: "#craft",
              start: "top 90%",
              end: "center 48%",
              scrub: 0.7,
            },
          },
        );
        gsap.fromTo(
          ".craft-card",
          { y: desktop ? 65 : 22 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#craft",
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          },
        );
        const scenes = gsap.utils.toArray<HTMLElement>(".scene-card");
        scenes.forEach((card, index) => {
          const image = card.querySelector<HTMLElement>(".editorial-photo");
          // Move the square photo wrapper, never the individual atlas image/crop.
          if (image)
            gsap.fromTo(
              image,
              { yPercent: desktop ? 5 : 2, scale: desktop ? 1.2 : 1.1 },
              {
                yPercent: desktop ? -5 : -2,
                scale: desktop ? 1.14 : 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          if (desktop && index === 1)
            gsap.fromTo(
              card,
              { y: 65 },
              {
                y: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: ".shop-scenes",
                  start: "top 85%",
                  end: "bottom 30%",
                  scrub: 0.8,
                },
              },
            );
        });
        gsap.fromTo(
          ".experience-lines",
          { rotation: -40, y: 50 },
          {
            rotation: -17,
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: "#experience",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".experience h2",
          { x: desktop ? -38 : 0 },
          {
            x: desktop ? 28 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#experience",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".footer-wordmark",
          { yPercent: 20, opacity: 0.4 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".footer",
              start: "top 90%",
              end: "bottom bottom",
              scrub: 0.7,
            },
          },
        );
      },
    );
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    window.addEventListener("load", refresh);
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, [reduced]);
}
