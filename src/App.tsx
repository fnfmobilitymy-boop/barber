import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { BrandIntro } from "./components/BrandIntro";
import { ContactDock } from "./components/ContactDock";
import { ShopScenesSection } from "./components/ShopScenesSection";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { VideoShowcase } from "./components/VideoShowcase";
import { ServiceMenu } from "./components/ServiceMenu";
import { BookingSection, FAQSection, Footer } from "./components/Sections";

function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="site-content">
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgressIndicator />
        <Navbar />
        <main id="main">
          <HeroSection />
          <ServiceMenu />
          <VideoShowcase />
          <ShopScenesSection />
          <FAQSection />
          <BookingSection />
        </main>
        <Footer />
        <ContactDock />
      </div>
      <BrandIntro />
    </MotionConfig>
  );
}
