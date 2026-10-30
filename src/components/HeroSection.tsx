import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CinematicVideo } from "./CinematicVideo";
import { MagneticButton } from "./UI";
gsap.registerPlugin(ScrollTrigger);
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        y: -90,
        opacity: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom 25%",
          scrub: true,
        },
      });
      gsap.to(".hero-media", {
        scale: 0.94,
        borderRadius: 32,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-display-word", {
        xPercent: -8,
        yPercent: 25,
        opacity: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1,
        },
      });
      gsap.to(".hero-shade", {
        opacity: 0.9,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section
      id="home"
      className="hero"
      ref={ref}
      onMouseMove={(e) => {
        if (reduced || !matchMedia("(pointer:fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--mouse-x",
          `${(e.clientX - r.left - r.width / 2) * 0.008}px`,
        );
        e.currentTarget.style.setProperty(
          "--mouse-y",
          `${(e.clientY - r.top - r.height / 2) * 0.008}px`,
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--mouse-x", "0px");
        e.currentTarget.style.setProperty("--mouse-y", "0px");
      }}
    >
      <div className="hero-media">
        <CinematicVideo />
        <div className="hero-shade" />
      </div>
      <motion.div
        className="hero-display-word"
        aria-hidden="true"
        initial={reduced ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.12 }}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        THE HUSTLE
      </motion.div>
      <div className="hero-content">
        <motion.p
          className="hero-kicker"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <span className="live-dot" /> PRECISION. CULTURE. CONFIDENCE.
        </motion.p>
        <h1>
          {["NOT JUST", "A HAIRCUT.", "A LIFESTYLE."].map((line, i) => (
            <span className="title-line" key={line}>
              <motion.span
                initial={reduced ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={i === 2 ? "serif" : ""}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="hero-description">
            Precision cuts. Sharp fades. Timeless confidence.
            <br />
            Experience grooming beyond the ordinary.
          </p>
          <div className="hero-ctas">
            <MagneticButton>BOOK YOUR CUT</MagneticButton>
            <a className="text-link" href="#experience">
              EXPLORE THE EXPERIENCE <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <span>INDIVIDUAL STYLE. UNCOMPROMISING CRAFT.</span>
        <a href="#about" aria-label="Scroll to the culture section">
          <ArrowDown size={16} /> SCROLL TO DISCOVER
        </a>
        <span>THE HUSTLE / VOL. 01</span>
      </div>
      <span className="hero-side">GOOD HAIR. GREAT ENERGY.</span>
    </section>
  );
}
