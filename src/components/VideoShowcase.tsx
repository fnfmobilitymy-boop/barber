import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Film, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { showcaseVideos } from "../data/videos";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { AnimatedHeading, Eyebrow } from "./UI";

export function VideoShowcase() {
  const [rotation, setRotation] = useState(0);
  const active = ((rotation % showcaseVideos.length) + showcaseVideos.length) % showcaseVideos.length;
  const [automatic, setAutomatic] = useState(true);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const change = (index: number) => {
    const count = showcaseVideos.length;
    const target = ((index % count) + count) % count;
    setRotation(value => {
      const current = ((value % count) + count) % count;
      const delta = ((target - current + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
      return value + delta;
    });
    setFailed(false);
  };

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    let inView = false, disposed = false, pending = false;
    const shouldPlay = () => !disposed && inView && !document.hidden && !paused && (!reduced || started);
    const reconcile = () => {
      if (!shouldPlay()) { media.pause(); return; }
      if (pending || !media.paused) return;
      pending = true;
      media.play().then(() => { if (!shouldPlay()) media.pause(); }).catch(() => {
        if (!disposed) setPlaying(false);
      }).finally(() => { pending = false; });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .15;
      setVisible(inView);
      reconcile();
    }, { threshold: [0, .15] });
    observer.observe(media);
    document.addEventListener("visibilitychange", reconcile);
    media.addEventListener("canplay", reconcile);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", reconcile);
      media.removeEventListener("canplay", reconcile);
      media.pause();
    };
  }, [active, paused, reduced, started]);

  useEffect(() => {
    if (!visible || !automatic || paused || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setRotation(value => value + 1);
        setFailed(false);
      }
    }, 10000);
    return () => window.clearInterval(timer);
  }, [active, visible, automatic, paused, reduced]);

  return <section id="films" className="section video-showcase native-works" aria-label="Video showcase" aria-roledescription="carousel">
    <div className="section-top"><div><Eyebrow><Film size={14} aria-hidden="true" />OUR WORK</Eyebrow><AnimatedHeading>Precision <em>in motion.</em></AnimatedHeading></div><p>Real cuts. Real Spartans.</p></div>
    <div className="showcase-thumbnails" role="group" aria-label="Choose a showcase video"
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          const next = (active + (event.key === "ArrowRight" ? 1 : -1) + showcaseVideos.length) % showcaseVideos.length;
          change(next);
          event.currentTarget.querySelectorAll<HTMLButtonElement>(".showcase-thumbnail")[next].focus({ preventScroll: true });
        }
      }}
      onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }}
      onTouchEnd={event => {
        const start = touch.current; touch.current = null;
        if (!start) return;
        const point = event.changedTouches[0], dx = point.clientX - start.x, dy = point.clientY - start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) change(active + (dx < 0 ? 1 : -1));
      }}>
      <div className="native-works-orbit" style={{ "--orbit-rotation": `${-rotation * 360 / showcaseVideos.length}deg` } as CSSProperties}>
      {showcaseVideos.map((work, index) => {
        const style = { "--orbit-angle": `${index * 360 / showcaseVideos.length}deg` } as CSSProperties;
        return <button key={work.id} className={`showcase-thumbnail ${index === active ? "is-active" : ""}`} style={style}
          aria-label={`Show video ${index + 1}: ${work.title}`} aria-current={index === active ? "true" : undefined}
          tabIndex={index === active ? 0 : -1} onClick={() => change(index)} onFocus={() => change(index)}
          onPointerMove={event => {
            if (event.pointerType !== "mouse" || reduced) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--hover-x", `${Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))}%`);
            event.currentTarget.style.setProperty("--hover-y", `${Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100))}%`);
            event.currentTarget.style.setProperty("--hover-tilt-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 10}deg`);
            event.currentTarget.style.setProperty("--hover-tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}deg`);
          }}>
          {index === active ? <video key={work.id} ref={video} src={`${import.meta.env.BASE_URL}${work.src}`} poster={`${import.meta.env.BASE_URL}${work.poster}`} muted={muted} playsInline preload="none" className="native-work-video" aria-label={work.title}
            onPlaying={() => { setPlaying(true); setFailed(false); }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}
            onEnded={() => { setPlaying(false); if (automatic && !reduced) change(active + 1); else setPaused(true); }} />
            : <img src={`${import.meta.env.BASE_URL}${work.poster}`} alt="" loading="lazy" />}
          <span><span className="micro">SPARTANS / {String(index + 1).padStart(2, "0")}</span>{work.title}</span>
        </button>;
      })}
      </div>
    </div>
    <div className="showcase-toolbar">
      <div className="showcase-navigation">
        <button className="showcase-icon-button" aria-label="Previous video" onClick={() => change(active - 1)}><ArrowLeft size={20} /></button>
        <span className="micro" aria-live={automatic && !reduced ? "off" : "polite"}>{String(active + 1).padStart(2, "0")} / {String(showcaseVideos.length).padStart(2, "0")}</span>
        <button className="showcase-icon-button" aria-label="Next video" onClick={() => change(active + 1)}><ArrowRight size={20} /></button>
      </div>
      <div className="native-works-controls">
        <button className="showcase-icon-button" aria-label={playing ? "Pause showcase video" : "Play showcase video"} onClick={() => { setPaused(playing); if (!playing) setStarted(true); }}>
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className="showcase-icon-button" aria-label={muted ? "Unmute showcase video" : "Mute showcase video"} aria-pressed={!muted} onClick={() => setMuted(value => !value)}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
        <button className="showcase-auto" aria-pressed={automatic && !reduced} disabled={!!reduced} onClick={() => setAutomatic(value => !value)}>{automatic && !reduced ? <Pause size={14} /> : <Play size={14} />}AUTO {automatic && !reduced ? "ON" : "OFF"}</button>
      </div>
    </div>
    {failed && <p role="status">Video unavailable. Try another video.</p>}
  </section>;
}
