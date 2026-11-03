import { useEffect, useRef } from "react";

/** Only the selected visible card decodes video; all others remain posters. */
export function ShowcasePreview({ src, poster, enabled }: { src: string; poster: string; enabled: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false, disposed = false, pending = false;
    const shouldPlay = () => enabled && visible && !document.hidden && !disposed;
    const reconcile = () => {
      if (!shouldPlay()) { video.pause(); return; }
      if (pending || !video.paused) return;
      pending = true;
      video.play().then(() => { if (!shouldPlay()) video.pause(); }).catch(() => {}).finally(() => { pending = false; });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); }, { threshold: 0.2 });
    observer.observe(video);
    video.addEventListener("canplay", reconcile);
    document.addEventListener("visibilitychange", reconcile);
    return () => {
      disposed = true;
      observer.disconnect();
      video.removeEventListener("canplay", reconcile);
      document.removeEventListener("visibilitychange", reconcile);
      video.pause();
    };
  }, [src, enabled]);
  return <video ref={ref} className="showcase-card-preview" src={src} poster={poster} muted playsInline loop preload="none" aria-hidden="true" />;
}
