import { useState } from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { instagramWorks } from "../data/videos";

export function InstagramWorks() {
  const [loaded, setLoaded] = useState<string[]>([]);
  return <div className="instagram-works" aria-labelledby="instagram-works-heading">
    <div className="instagram-works-heading"><p className="micro">FROM OUR INSTAGRAM</p><h3 id="instagram-works-heading">More from the shop.</h3><p>Three more Spartans works, shared by our team.</p></div>
    <div className="instagram-works-grid">
      {instagramWorks.map((work, index) => <article className="instagram-work" key={work.id}>
        <div className="instagram-work-player">
          {loaded.includes(work.id)
            ? <iframe src={`${work.url}embed/`} title={`Spartans Instagram work ${index + 1}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />
            : <button className="instagram-work-load" onClick={() => setLoaded(items => [...items, work.id])} aria-label={`Play Instagram work ${index + 1}`}>
              <Instagram size={36} aria-hidden="true" />
              <span className="micro">SPARTANS WORK · 0{index + 6}</span>
              <span className="instagram-work-play"><Play size={20} aria-hidden="true" />PLAY VIDEO</span>
            </button>}
        </div>
        <a className="contact-card-link" href={work.url} target="_blank" rel="noopener noreferrer">WATCH ON INSTAGRAM <ArrowUpRight size={16} aria-hidden="true" /></a>
      </article>)}
    </div>
  </div>;
}
