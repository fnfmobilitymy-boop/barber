import { ArrowUpRight, Camera } from "lucide-react";
import { shopPhotos } from "../data/shopPhotos";
import { ShopPhoto } from "./ShopPhoto";
import { AnimatedHeading, Eyebrow, SectionReveal } from "./UI";

export function ShopScenesSection() {
  return (
    <section id="the-space" className="section shop-scenes">
      <div className="section-top">
        <div>
          <Eyebrow><Camera size={14} aria-hidden="true" />OUR SPACE</Eyebrow>
          <AnimatedHeading>Inside <em>Spartans.</em></AnimatedHeading>
        </div>
        <p>Home of sharp cuts.</p>
      </div>
      <div className="shop-photo-grid">
        {shopPhotos.filter((photo) => photo.placement === "gallery").map((photo) => (
          <SectionReveal key={photo.id} className="shop-photo-reveal">
            <a className="shop-photo-card" href={`${import.meta.env.BASE_URL}${photo.src}`} target="_blank" rel="noopener noreferrer" aria-label={`View photo: ${photo.title}`}>
              <ShopPhoto id={photo.id} />
              <div className="shop-photo-caption">
                <h3>{photo.title}</h3>
                <ArrowUpRight size={19} aria-hidden="true" />
              </div>
            </a>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
