import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { gallery, photo } from "../data/business";
import { AnimatedHeading, Eyebrow } from "./UI";
export function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const touch = useRef(0);
  const items = gallery.filter(
    (i) => filter === "All" || i.category === filter,
  );
  const step = (dir: number) =>
    setSelected((s) =>
      s === null ? null : (s + dir + items.length) % items.length,
    );
  useEffect(() => {
    if (selected === null) return;
    previousFocus.current = document.activeElement as HTMLElement;
    close.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        e.preventDefault();
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const n = buttons.indexOf(document.activeElement as HTMLButtonElement);
        buttons[
          (n + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length
        ]?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previousFocus.current?.focus();
    };
  }, [selected, items.length]);
  return (
    <section id="gallery" className="section">
      <div className="section-top">
        <div>
          <Eyebrow>SELECTED INSPIRATION</Eyebrow>
          <AnimatedHeading>
            The <em>lookbook.</em>
          </AnimatedHeading>
        </div>
        <p>
          Every cut tells a story.
          <br />
          <span className="muted">
            Editorial references, not client results.
          </span>
        </p>
      </div>
      <div className="filters" role="group" aria-label="Filter lookbook">
        {["All", "Skin Fade", "Classic", "Textured", "Beard"].map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={filter === c ? "active liquid-glass" : ""}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="gallery-grid">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.button
              layout
              key={item.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="gallery-item"
              onClick={() => setSelected(i)}
              aria-label={`View ${item.title}`}
            >
              <img
                loading="lazy"
                src={photo(item.image)}
                alt={`${item.category} editorial grooming inspiration`}
              />
              <span>
                {item.category}
                <Plus size={19} />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Lookbook image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
            onTouchStart={(e) => {
              touch.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const d = touch.current - e.changedTouches[0].clientX;
              if (Math.abs(d) > 45) step(d > 0 ? 1 : -1);
            }}
          >
            <button
              ref={close}
              className="lightbox-close"
              aria-label="Close image"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <button aria-label="Previous image" onClick={() => step(-1)}>
              <ArrowLeft />
            </button>
            <figure>
              <img
                src={photo(items[selected].image)}
                alt={items[selected].title}
              />
              <figcaption>
                {items[selected].title} · {selected + 1} / {items.length}
              </figcaption>
            </figure>
            <button aria-label="Next image" onClick={() => step(1)}>
              <ArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
