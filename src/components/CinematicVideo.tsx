import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
export function VideoPoster({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" />;
}
export function CinematicVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    let frame = 0,
      active = false,
      disposed = false,
      visible = true;
    const tick = () => {
      if (disposed || !active) return;
      const remaining = v.duration - v.currentTime;
      v.style.opacity = String(
        Math.max(0, Math.min(1, v.currentTime / 0.5, remaining / 0.5)),
      );
      if (remaining < 0.04) {
        v.currentTime = 0;
      }
      frame = requestAnimationFrame(tick);
    };
    const play = () => {
      if (document.hidden || manualPause.current || !visible) return;
      v.play()
        .then(() => {
          if (disposed) return;
          setPlaying(true);
          if (!active) {
            active = true;
            frame = requestAnimationFrame(tick);
          }
        })
        .catch(() => setPlaying(false));
    };
    const visibility = () => {
      if (document.hidden) {
        v.pause();
        active = false;
        cancelAnimationFrame(frame);
      } else play();
    };
    const onPause = () => {
      active = false;
      cancelAnimationFrame(frame);
    };
    const onPlaying = () => {
      if (!active) {
        active = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else v.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(v);
    v.addEventListener("pause", onPause);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", play);
    v.addEventListener("ended", play);
    document.addEventListener("visibilitychange", visibility);
    if (v.readyState >= 3) play();
    return () => {
      observer.disconnect();
      v.removeEventListener("pause", onPause);
      v.removeEventListener("playing", onPlaying);
      disposed = true;
      active = false;
      cancelAnimationFrame(frame);
      v.pause();
      v.removeEventListener("canplay", play);
      v.removeEventListener("ended", play);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reduced]);
  return (
    <div className="cinematic-video">
      <img
        className={playing ? "poster playing" : "poster"}
        src={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
        alt="Cinematic haircut beside a white luxury SUV in a dramatic studio"
      />
      <video
        ref={ref}
        muted
        playsInline
        autoPlay={!reduced}
        loop
        preload="metadata"
        poster={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
        aria-label="The Hustle cinematic campaign"
      >
        <source src={`${import.meta.env.BASE_URL}videos/barbershop-hero.mp4`} type="video/mp4" />
      </video>
      {!reduced && (
        <button
          className="video-control liquid-glass"
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
          aria-pressed={paused}
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            manualPause.current = !paused;
            setPaused(!paused);
            if (!paused) {
              v.pause();
            } else {
              v.play().catch(() => setPlaying(false));
            }
          }}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>{paused ? "PLAY FILM" : "PAUSE FILM"}</span>
        </button>
      )}
    </div>
  );
}
export function VideoReveal({ children }: { children: React.ReactNode }) {
  return <div className="media-reveal">{children}</div>;
}
export function ScrollVideoSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="scroll-video-section">{children}</div>;
}
