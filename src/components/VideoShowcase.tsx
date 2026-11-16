import { Film } from "lucide-react";
import { InstagramWorks } from "./InstagramWorks";
import { AnimatedHeading, Eyebrow } from "./UI";

export function VideoShowcase() {
  return (
    <section id="films" className="section video-showcase" aria-label="Video showcase">
      <div className="section-top">
        <div>
          <Eyebrow><Film size={14} aria-hidden="true" />OUR WORK</Eyebrow>
          <AnimatedHeading>Precision <em>in motion.</em></AnimatedHeading>
        </div>
        <p>See the latest Spartans work on Instagram.</p>
      </div>
      <InstagramWorks />
    </section>
  );
}
