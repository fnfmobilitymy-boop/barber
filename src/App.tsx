import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { MessageCircle } from "lucide-react";
import { BookingWelcome } from "./components/BookingWelcome";
import { ShopScenesSection } from "./components/ShopScenesSection";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import {
  AboutSection,
  FeaturedVideoSection,
  PhilosophySection,
  ServicesSection,
  BarbersSection,
  ExperienceSection,
  PricingSection,
  TestimonialsSection,
  BookingSection,
  FAQSection,
  Footer,
} from "./components/Sections";
import { CustomCursor } from "./components/CustomCursor";
import { bookingHref } from "./data/business";
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="site-content">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgressIndicator />
        <Navbar />
        <main id="main">
          <HeroSection />
          <div className="brand-strip">
            <span>BUILT ON CRAFT.</span>
            <span className="serif">Defined by character.</span>
            <span>THE HUSTLE BARBER CLUB</span>
            <span className="serif">Leave your mark.</span>
          </div>
          <AboutSection />
          <FeaturedVideoSection />
          <PhilosophySection />
          <ShopScenesSection />
          <ServicesSection />
          <GallerySection />
          <ExperienceSection />
          <BarbersSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <BookingSection />
        </main>
        <Footer />
        <a
          href={bookingHref}
          className="floating-booking liquid-glass"
          aria-label="Booking and WhatsApp information"
        >
          <MessageCircle size={21} />
          <span>LET'S TALK</span>
        </a>
        <CustomCursor />
      </div>
      <BookingWelcome />
    </MotionConfig>
  );
}
