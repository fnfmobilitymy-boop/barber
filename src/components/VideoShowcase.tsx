import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Film, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { showcaseVideos } from "../data/videos";
import { ShowcasePreview } from "./ShowcasePreview";
import { AnimatedHeading, Eyebrow } from "./UI";

export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [stageVisible, setStageVisible] = useState(false);
  const [railVisible, setRailVisible] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = showcaseVideos[active];
  const goTo = (index: number) => {
    setActive((index + showcaseVideos.length) % showcaseVideos.length);
    setFailed(false);
  };

  useEffect(() => {
    const media = video.current;
    if (!media || !stage.current) return;
    let visible = false;
    let disposed = false;
    let pending = false;
    const shouldPlay = () => !disposed && visible && !document.hidden && !userPaused && (!reduced || userStarted);
    const reconcile = () => {
      if (!shouldPlay()) { media.pause(); return; }
      if (pending || !media.paused) return;
      pending = true;
      media.play().then(() => {
        if (!shouldPlay()) media.pause();
      }).catch(() => {
        // Browsers may require a gesture. Keep the poster and play control.
        if (!disposed) setPlaying(false);
      }).finally(() => { pending = false; });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setStageVisible(visible);
      reconcile();
    }, { threshold: 0.15 });
    observer.observe(stage.current);
    document.addEventListener("visibilitychange", reconcile);
    media.addEventListener("canplay", reconcile);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", reconcile);
      media.removeEventListener("canplay", reconcile);
      media.pause();
    };
  }, [active, reduced, userPaused, userStarted]);

  useEffect(() => {
    const track = rail.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => setRailVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // When visitors scroll to the cards, keep that visible carousel moving.
    // The offscreen main player remains paused instead of driving the timer.
    if (!railVisible || stageVisible || !autoAdvance || userPaused || reduced) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((index) => (index + 1) % showcaseVideos.length);
      setFailed(false);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [active, railVisible, stageVisible, autoAdvance, userPaused, reduced]);

  return (
    <section id="films" className="section video-showcase" aria-label="Video showcase" aria-roledescription="carousel">
      <div className="section-top">
        <div>
          <Eyebrow><Film size={14} aria-hidden="true" />OUR WORK</Eyebrow>
          <AnimatedHeading>Precision <em>in motion.</em></AnimatedHeading>
        </div>
        <p>See the detail. Own the look.</p>
      </div>
      <div
        className="showcase-stage"
        ref={stage}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active - 1); }
          if (event.key === "ArrowRight") { event.preventDefault(); goTo(active + 1); }
        }}
        tabIndex={0}
        aria-label="Video player. Use left and right arrow keys to change video."
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x, dy = touch.clientY - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(active + (dx < 0 ? 1 : -1));
        }}
      >
        <video
          key={current.id}
          ref={video}
          src={`${import.meta.env.BASE_URL}${current.src}`}
          poster={`${import.meta.env.BASE_URL}${current.poster}`}
          muted={muted}
          playsInline
          preload="none"
          aria-label={`Showcase video: ${current.title}`}
          onPlaying={() => { setPlaying(true); setFailed(false); }}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
          onEnded={() => {
            setPlaying(false);
            if (autoAdvance && !reduced) goTo(active + 1);
            else setUserPaused(true);
          }}
        />
        <div className="showcase-shade" aria-hidden="true" />
        <div className="showcase-caption">
          <span className="micro">SPARTANS / THE LOOKS</span>
          <h3>{current.title}</h3>
        </div>
        <div className="showcase-playback">
          <button className="showcase-icon-button liquid-glass" aria-label={playing ? "Pause showcase video" : "Play showcase video"} onClick={() => {
            if (playing) { setUserPaused(true); video.current?.pause(); }
            else { setUserPaused(false); setUserStarted(true); }
          }}>
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="showcase-icon-button liquid-glass" aria-label={muted ? "Unmute showcase video" : "Mute showcase video"} aria-pressed={!muted} onClick={() => setMuted(!muted)}>
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          {failed && <p role="status">Video unavailable. Try another video.</p>}
        </div>
      </div>
      <div className="showcase-toolbar">
        <div className="showcase-navigation">
          <button className="showcase-icon-button" aria-label="Previous video" onClick={() => goTo(active - 1)}><ArrowLeft size={20} /></button>
          <span className="micro" aria-live={autoAdvance && !reduced ? "off" : "polite"}>{String(active + 1).padStart(2, "0")} / {String(showcaseVideos.length).padStart(2, "0")}</span>
          <button className="showcase-icon-button" aria-label="Next video" onClick={() => goTo(active + 1)}><ArrowRight size={20} /></button>
        </div>
        <button className="showcase-auto" aria-pressed={autoAdvance && !reduced} disabled={!!reduced} onClick={() => setAutoAdvance(!autoAdvance)}>
          {autoAdvance && !reduced ? <Pause size={14} /> : <Play size={14} />}
          AUTO {autoAdvance && !reduced ? "ON" : "OFF"}
        </button>
      </div>
      <div
        className="showcase-thumbnails"
        ref={rail}
        role="group"
        aria-label="Choose a showcase video"
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const next = (active + (event.key === "ArrowRight" ? 1 : -1) + showcaseVideos.length) % showcaseVideos.length;
          goTo(next);
          (rail.current?.children[next] as HTMLButtonElement | undefined)?.focus({ preventScroll: true });
        }}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x, dy = touch.clientY - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(active + (dx < 0 ? 1 : -1));
        }}
      >
        {showcaseVideos.map((item, index) => {
          const offset = ((index - active + showcaseVideos.length + 2) % showcaseVideos.length) - 2;
          const distance = Math.abs(offset);
          const style = {
            "--card-offset": offset,
            "--card-depth": `${-135 * distance}px`,
            "--card-turn": `${-30 * offset}deg`,
            "--card-rise": `${14 * distance}px`,
            opacity: 1 - distance * .16,
            zIndex: 5 - distance,
          } as CSSProperties;
          return (
            <button
              key={item.id}
              className={`showcase-thumbnail ${index === active ? "is-active" : ""}`}
              style={style}
              aria-label={`Show video ${index + 1}: ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
              onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) goTo(index); }}
            >
              {index === active ? <ShowcasePreview key={item.id} src={`${import.meta.env.BASE_URL}${item.src}`} poster={`${import.meta.env.BASE_URL}${item.poster}`} enabled={autoAdvance && !userPaused && (!reduced || userStarted)} /> : <img src={`${import.meta.env.BASE_URL}${item.poster}`} alt="" />}
              <span><span className="micro">0{index + 1}</span>{item.title}</span>
              <Play size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
