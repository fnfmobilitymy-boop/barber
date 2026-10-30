import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function VideoPoster({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" />;
}

export function CinematicVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const manualPause = useRef(false);
  const requestPlayback = useRef<() => void>(() => {});
  const [userPaused, setUserPaused] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    let disposed = false;
    let visible = true;
    let pending: Promise<void> | null = null;
    const shouldPlay = () =>
      !disposed && !document.hidden && visible && !manualPause.current;
    const play = () => {
      if (!shouldPlay() || pending || !video.paused) return;
      pending = video.play();
      pending
        .then(() => {
          // A tab/visibility or user-pause event may arrive while play is pending.
          if (!shouldPlay()) video.pause();
        })
        .catch((error: unknown) => {
          if (disposed || !shouldPlay()) return;
          if (error instanceof DOMException && error.name === "AbortError")
            return;
          setBlocked(true);
        })
        .finally(() => {
          pending = null;
        });
    };
    const reconcile = () => {
      if (shouldPlay()) play();
      else video.pause();
    };
    const onPlaying = () => {
      if (!shouldPlay()) {
        video.pause();
        return;
      }
      setHasPlayed(true);
      setBlocked(false);
    };
    const onError = () => {
      if (disposed) return;
      setHasPlayed(false);
      setBlocked(true);
    };
    // Observe the stable Hero container with a small margin, not a fading video.
    // This avoids stop/start chatter while the scroll animation crosses an edge.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        reconcile();
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
    if (container.current) observer.observe(container.current);
    requestPlayback.current = play;
    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", reconcile);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", reconcile);
    window.addEventListener("pageshow", reconcile);
    // Native loop owns the timeline. No currentTime writes or per-frame JS work.
    if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
      onPlaying();
    else reconcile();
    return () => {
      disposed = true;
      observer.disconnect();
      requestPlayback.current = () => {};
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", reconcile);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", reconcile);
      window.removeEventListener("pageshow", reconcile);
      video.pause();
    };
  }, [reduced]);

  const paused = userPaused || blocked;
  return (
    <div className="cinematic-video" ref={container}>
      <img
        className={hasPlayed ? "poster playing" : "poster"}
        src={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
        alt="Cinematic haircut beside a white luxury SUV in a dramatic studio"
      />
      <video
        ref={ref}
        className={hasPlayed ? "is-ready" : ""}
        muted
        playsInline
        autoPlay={!reduced}
        loop
        preload={reduced ? "none" : "auto"}
        poster={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
        aria-label="The Hustle cinematic campaign"
      >
        <source
          src={`${import.meta.env.BASE_URL}videos/barbershop-hero-web.mp4`}
          type="video/mp4"
        />
      </video>
      {!reduced && (
        <button
          className="video-control liquid-glass"
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
          aria-pressed={paused}
          onClick={() => {
            const shouldPause = !paused;
            manualPause.current = shouldPause;
            setUserPaused(shouldPause);
            if (shouldPause) ref.current?.pause();
            else {
              setBlocked(false);
              requestPlayback.current();
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
