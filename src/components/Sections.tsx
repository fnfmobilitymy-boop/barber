import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Scissors,
  MessageCircle,
} from "lucide-react";
import { business, bookingHref, services, photo } from "../data/business";
import {
  AnimatedHeading,
  Eyebrow,
  LiquidGlassButton,
  MagneticButton,
  SectionReveal,
} from "./UI";
export function AboutSection() {
  return (
    <section id="about" className="section about">
      <SectionReveal>
        <Eyebrow>01 / THE CULTURE</Eyebrow>
      </SectionReveal>
      <div>
        <AnimatedHeading>
          More than a cut.
          <br />
          It's who you <em>become.</em>
        </AnimatedHeading>
        <SectionReveal>
          <p className="body-copy">
            We believe a great haircut is more than appearance. It's confidence,
            identity, and the feeling you carry into the world.
          </p>
          <a className="text-link" href="#craft">
            WELCOME TO THE CLUB <ArrowUpRight size={16} />
          </a>
        </SectionReveal>
      </div>
      <span className="about-mark">H.</span>
    </section>
  );
}
export function FeaturedVideoSection() {
  return (
    <section id="craft" className="section craft">
      <div className="section-top">
        <Eyebrow>02 / THE ART OF THE CRAFT</Eyebrow>
        <span className="micro">PRECISION IN EVERY FRAME</span>
      </div>
      <SectionReveal className="craft-frame">
        <img
          src={photo("craft-study", 1600)}
          alt="Typographic editorial placeholder for the future craft film"
          loading="lazy"
        />
        <span className="media-caption">
          EDITORIAL STILL / CRAFT FILM COMING SOON
        </span>
        <div className="craft-card liquid-glass">
          <Eyebrow>OUR APPROACH</Eyebrow>
          <h3>
            Nothing ordinary.
            <br />
            <em>Every detail intentional.</em>
          </h3>
          <p>
            Every fade is intentional. Every detail matters. Our craft combines
            precision, creativity, and a relentless commitment to personal
            style.
          </p>
          <LiquidGlassButton href="#philosophy">
            DISCOVER OUR CRAFT
          </LiquidGlassButton>
        </div>
      </SectionReveal>
    </section>
  );
}
export function PhilosophySection() {
  return (
    <section id="philosophy" className="section philosophy">
      <AnimatedHeading>
        Precision <em>× personality.</em>
      </AnimatedHeading>
      <div className="split">
        <SectionReveal className="philosophy-image">
          <img
            src={photo("detail-study")}
            alt="Editorial art direction placeholder; barber photography to be supplied"
            loading="lazy"
          />
          <span className="media-caption">THE DETAILS MAKE THE DIFFERENCE</span>
        </SectionReveal>
        <SectionReveal className="philosophy-copy">
          <article>
            <span className="micro">01 — THE ART OF PRECISION</span>
            <h3>
              A considered cut.
              <br />
              <em>A signature finish.</em>
            </h3>
            <p>
              Great grooming is built on patience, skill, and an eye for detail.
              From sharp fades to classic cuts, every movement has a purpose.
            </p>
          </article>
          <article>
            <span className="micro">02 — THE POWER OF CONFIDENCE</span>
            <h3>
              Made to feel <em>like you.</em>
            </h3>
            <p>
              Style is personal. We create looks that complement your
              individuality and give you the confidence to own every moment.
            </p>
          </article>
        </SectionReveal>
      </div>
    </section>
  );
}
export function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="section-top">
        <div>
          <Eyebrow>03 / THE GROOMING EXPERIENCE</Eyebrow>
          <AnimatedHeading>
            What we <em>do.</em>
          </AnimatedHeading>
        </div>
        <p>
          Your style. Our craft.
          <br />A cut above the everyday.
        </p>
      </div>
      <div className="service-grid">
        {services.map((s, i) => (
          <SectionReveal key={s.name} className="service-card">
            <img
              loading="lazy"
              src={photo(s.image)}
              alt={`${s.name} editorial inspiration`}
            />
            <div className="service-top">
              <span className="badge liquid-glass">{s.category}</span>
              <span className="micro">0{i + 1}</span>
            </div>
            <div className="service-content">
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <a
                href={bookingHref}
                className="service-link"
                aria-label={`Enquire about ${s.name}`}
              >
                BOOK THIS EXPERIENCE <ArrowUpRight size={20} />
              </a>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
export function BarbersSection() {
  return (
    <section id="barbers" className="section">
      <div className="section-top">
        <div>
          <Eyebrow>05 / THE PEOPLE</Eyebrow>
          <AnimatedHeading>
            The hands behind
            <br />
            <em>the craft.</em>
          </AnimatedHeading>
        </div>
        <p>
          Individual vision.
          <br />A shared dedication to detail.
        </p>
      </div>
      <div className="barber-grid">
        {["Precision cutting", "Fades & texture", "Beard refinement"].map(
          (s, i) => (
            <SectionReveal className="barber-card" key={s}>
              <div className="portrait-placeholder">
                <Scissors size={42} strokeWidth={0.7} />
                <span>PORTRAIT TO BE SUPPLIED</span>
                <b>0{i + 1}</b>
              </div>
              <p className="micro">BARBER PROFILE — COMING SOON</p>
              <h3>{s}</h3>
              <p>
                Meet the people behind your next look. Team names and
                biographies will be added here.
              </p>
              <MagneticButton className="liquid-glass">
                ENQUIRE ABOUT A BARBER
              </MagneticButton>
            </SectionReveal>
          ),
        )}
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section id="experience" className="experience">
      <div className="experience-lines" />
      <SectionReveal>
        <Eyebrow>MORE THAN THE MIRROR</Eyebrow>
        <h2>
          THE CHAIR.
          <br />
          <em>THE CULTURE.</em>
          <br />
          THE CONFIDENCE.
        </h2>
        <p>
          A moment for yourself.
          <br />A feeling you take with you.
        </p>
        <a className="text-link" href="#services">
          FIND YOUR EXPERIENCE <ArrowUpRight size={16} />
        </a>
      </SectionReveal>
      <span className="experience-number">H / 01</span>
    </section>
  );
}
export function PricingSection() {
  return (
    <section id="pricing" className="section">
      <Eyebrow>06 / THE MENU</Eyebrow>
      <AnimatedHeading>
        The experience,
        <br />
        <em>your way.</em>
      </AnimatedHeading>
      <div className="pricing-grid">
        {services.map((s, i) => (
          <SectionReveal
            className={`price-card ${i === 3 ? "liquid-glass featured" : ""}`}
            key={s.name}
          >
            <span className="micro">
              0{i + 1} / {i === 3 ? "THE FULL RITUAL" : "PERSONAL GROOMING"}
            </span>
            <h3>{i === 3 ? "Complete Grooming" : s.name}</h3>
            <p>{s.description}</p>
            <strong>{s.price ?? "Enquire for Price"}</strong>
            <LiquidGlassButton>BOOK NOW</LiquidGlassButton>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
export function TestimonialsSection() {
  return null; /* Only verified business testimonials may be added. */
}
const faqs = [
  [
    "Do I need an appointment?",
    "Please enquire using the booking contact once available to confirm appointment availability.",
  ],
  [
    "Do you accept walk-ins?",
    "Walk-in availability and policy will be confirmed by the team.",
  ],
  [
    "How long does a haircut take?",
    "Timing depends on the service and style. Please confirm your session length with the team.",
  ],
  [
    "What services do you offer?",
    "Explore signature haircuts, skin fades, beard sculpting, and complete grooming in our service menu. Final availability will be confirmed when booking.",
  ],
  [
    "Can I request a specific barber?",
    "You can mention your preferred barber when enquiring. Requests are subject to team availability.",
  ],
  [
    "Where is the barbershop located?",
    "Our confirmed address and opening hours will be published here before launch.",
  ],
];
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section faq" id="faq">
      <div>
        <Eyebrow>A FEW THINGS TO KNOW</Eyebrow>
        <AnimatedHeading>
          Before you
          <br />
          <em>take a seat.</em>
        </AnimatedHeading>
      </div>
      <div>
        {faqs.map(([q, a], i) => (
          <article className="faq-item" key={q}>
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  id={`answer-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}
export function BookingSection() {
  const configured = !!(business.bookingUrl || business.whatsappNumber);
  return (
    <section id="booking" className="section booking">
      <Eyebrow>YOUR CHAIR IS WAITING</Eyebrow>
      <AnimatedHeading>
        Your next look
        <br />
        starts <em>here.</em>
      </AnimatedHeading>
      <p>Ready for a sharper look? Book your next grooming experience.</p>
      {configured ? (
        <div className="booking-actions">
          <MagneticButton>BOOK AN APPOINTMENT</MagneticButton>
          {business.whatsappNumber && (
            <LiquidGlassButton
              href={`https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to book a haircut. Could you share your available slots?")}`}
            >
              CHAT ON WHATSAPP
            </LiquidGlassButton>
          )}
        </div>
      ) : (
        <div className="booking-notice liquid-glass">
          <MessageCircle size={22} />
          <div>
            <strong>Booking opens soon.</strong>
            <p>
              Our appointment and WhatsApp details are being finalized. Check
              back for availability.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export function Footer() {
  const [privacy, setPrivacy] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="logo" href="#home">
          <Scissors />
          <span>
            THE HUSTLE<small>BARBER CLUB</small>
          </span>
        </a>
        <p>PRECISION. CULTURE. CONFIDENCE.</p>
        <a href="#home" className="text-link">
          BACK TO TOP ↑
        </a>
      </div>
      <div className="footer-columns">
        <div>
          <span className="micro">FIND THE CLUB</span>
          <p>{business.address || "Location to be announced."}</p>
          <p>{business.hours || "Opening hours coming soon."}</p>
        </div>
        <div>
          <span className="micro">EXPLORE</span>
          <a href="#services">Services</a>
          <a href="#gallery">Lookbook</a>
          <a href="#booking">Bookings & contact</a>
        </div>
        <div>
          <span className="micro">FOLLOW THE CULTURE</span>
          {Object.entries(business.socials)
            .filter(([, url]) => url)
            .map(([name, url]) => (
              <a href={url} key={name}>
                {name}
              </a>
            ))}
          {!Object.values(business.socials).some(Boolean) && (
            <p>Social channels coming soon.</p>
          )}
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        THE HUSTLE
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name} · Concept brand
        </span>
        <button onClick={() => setPrivacy(!privacy)} aria-expanded={privacy}>
          Privacy Policy {privacy ? "−" : "+"}
        </button>
        <span>NOT JUST A HAIRCUT. A LIFESTYLE.</span>
      </div>
      {privacy && (
        <div className="privacy">
          <h3>Privacy notice</h3>
          <p>
            This concept website has no booking form, analytics, or customer
            database. Fonts are requested from Google Fonts. Configured external
            booking or social services have their own privacy policies. A
            business-specific privacy policy must be supplied before launch.
          </p>
        </div>
      )}
    </footer>
  );
}
