import { VideoShowcase } from "./components/VideoShowcase";
import { OpportunitiesPage, OpportunitiesLinks } from "./components/OpportunitiesPage";
import { BranchSelector } from "./components/BranchSelector";
import { activeBranch } from "./data/business";
import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { BrandIntro } from "./components/BrandIntro";
import { ContactDock } from "./components/ContactDock";
import { ShopScenesSection } from "./components/ShopScenesSection";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServiceMenu } from "./components/ServiceMenu";
import { BookingSection, FAQSection, Footer } from "./components/Sections";

function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
export default function App() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "partnerships" || page === "careers") return <OpportunitiesPage page={page} />;
  return (
    <MotionConfig reducedMotion="user">
      <div id="site-content">
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgressIndicator />
        <Navbar />
        <main id="main">
          {!activeBranch && <HeroSection />}
          <BranchSelector />
          {activeBranch ? <ServiceMenu /> : <section id="pricing" className="section"><h2>Services & prices</h2><p>Choose your branch to view its services, prices and booking options.</p></section>}
          <VideoShowcase />
          <ShopScenesSection />
          <FAQSection />
          <OpportunitiesLinks />
          <BookingSection />
        </main>
        <Footer />
        {!activeBranch && <ContactDock />}
      </div>
      {!activeBranch && <BrandIntro />}
    </MotionConfig>
  );
}
