import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { instagramWorks } from "../data/videos";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function InstagramWorks() {
  const [active, setActive] = useState(0);
  const [automatic, setAutomatic] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const viewport = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const change = (index: number) => setActive((index + instagramWorks.length) % instagramWorks.length);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!viewport.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || !pageVisible || !automatic || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % instagramWorks.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [active, visible, pageVisible, automatic, reduced]);
  return <div className="instagram-works" aria-labelledby="instagram-works-heading" aria-roledescription="carousel">
    <div className="instagram-works-heading"><p className="micro">FROM OUR INSTAGRAM</p><h3 id="instagram-works-heading">More from the shop.</h3><p>Spartans works, shared by our team.</p></div>
    <div className="instagram-carousel-viewport" ref={viewport}
      onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }}
      onTouchEnd={event => {
        const start = touch.current; touch.current = null;
        if (!start) return;
        const point = event.changedTouches[0], dx = point.clientX - start.x, dy = point.clientY - start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) change(active + (dx < 0 ? 1 : -1));
      }}>
      <div className="instagram-works-grid" style={{ transform: `translateX(-${active * 100}%)` }}>
        {instagramWorks.map((work, index) => <article className="instagram-work" key={work.id} aria-hidden={index !== active} inert={index !== active}>
          <div className="instagram-work-player">
            {visible && pageVisible && index === active && <iframe src={`${work.url}embed/`} title={`Spartans Instagram work ${index + 1}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
          </div>
          <a className="contact-card-link" href={work.url} target="_blank" rel="noopener noreferrer">WATCH ON INSTAGRAM <ArrowUpRight size={16} aria-hidden="true" /></a>
        </article>)}
      </div>
    </div>
    <div className="instagram-carousel-controls">
      <button className="showcase-icon-button" aria-label="Previous Instagram work" onClick={() => change(active - 1)}><ArrowLeft size={20} /></button>
      <span className="micro" aria-live={automatic && !reduced ? "off" : "polite"}>{String(active + 1).padStart(2, "0")} / {String(instagramWorks.length).padStart(2, "0")}</span>
      <button className="showcase-icon-button" aria-label="Next Instagram work" onClick={() => change(active + 1)}><ArrowRight size={20} /></button>
      <button className="showcase-auto" disabled={!!reduced} aria-pressed={automatic && !reduced} aria-label={automatic ? "Pause Instagram carousel" : "Resume Instagram carousel"} onClick={() => setAutomatic(value => !value)}>
        {automatic && !reduced ? <Pause size={14} /> : <Play size={14} />}{automatic && !reduced ? "PAUSE" : "RESUME"}
      </button>
    </div>
  </div>;
}
