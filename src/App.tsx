import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { BrandIntro } from "./components/BrandIntro";
import { ShopScenesSection } from "./components/ShopScenesSection";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { VideoShowcase } from "./components/VideoShowcase";
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
import { useEditorialMotion } from "./hooks/useEditorialMotion";
import { bookingHref, whatsappHref } from "./data/business";
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
export default function App() {
  useEditorialMotion();
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
            <span>SPARTANS BARBERSHOP</span>
            <span className="serif">Leave your mark.</span>
          </div>
          <AboutSection />
          <FeaturedVideoSection />
          <PhilosophySection />
          <ShopScenesSection />
          <ServicesSection />
          <GallerySection />
          <VideoShowcase />
          <ExperienceSection />
          <BarbersSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <BookingSection />
        </main>
        <Footer />
        <div className="contact-dock">
        <a
          href={whatsappHref}
          className="floating-whatsapp liquid-glass"
          aria-label="Book via WhatsApp"
        >
          <MessageCircle size={21} aria-hidden="true" />
          <span>WHATSAPP</span>
        </a>
        <a
          href={bookingHref}
          className="floating-booking liquid-glass"
          aria-label="Book an appointment on Setmore"
        >
          <CalendarDays size={21} />
          <span>BOOK NOW</span>
        </a>
        </div>
        <CustomCursor />
      </div>
      <BrandIntro />
    </MotionConfig>
  );
}
