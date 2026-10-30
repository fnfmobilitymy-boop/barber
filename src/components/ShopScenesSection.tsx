import { EditorialPhoto } from "./EditorialPhoto";
import { AnimatedHeading, Eyebrow, SectionReveal } from "./UI";

export function ShopScenesSection() {
  return (
    <section id="the-space" className="section shop-scenes">
      <div className="section-top">
        <div>
          <Eyebrow>THE SPACE / THE RITUAL</Eyebrow>
          <AnimatedHeading>
            Step inside
            <br />
            <em>the atmosphere.</em>
          </AnimatedHeading>
        </div>
        <p>
          A place to slow down.
          <br />A moment to sharpen up.
        </p>
      </div>
      <div className="scene-grid">
        <SectionReveal className="scene-card-reveal">
          <div className="scene-card">
            <EditorialPhoto
              image="shop-interior"
              alt="AI-generated barbershop interior inspiration with warm mirrors and leather chairs"
            />
            <div className="scene-caption">
              <span className="micro">01 / THE ATMOSPHERE</span>
              <h3>
                A seat. A moment.
                <br />
                <em>A different pace.</em>
              </h3>
            </div>
          </div>
        </SectionReveal>
        <SectionReveal className="scene-card-reveal" delay={0.15}>
          <div className="scene-card">
            <EditorialPhoto
              image="shop-tools"
              alt="AI-generated barber work station inspiration with scissors, clippers and a towel"
            />
            <div className="scene-caption">
              <span className="micro">02 / THE ESSENTIALS</span>
              <h3>
                Good tools.
                <br />
                <em>Considered details.</em>
              </h3>
            </div>
          </div>
        </SectionReveal>
      </div>
      <p className="media-disclosure">
        AI-generated editorial inspiration. Actual shop photography to follow.
      </p>
    </section>
  );
}
